/**
 * Generates APSOD favicon + PWA icons from public/icons/icon.svg
 * Usage: node scripts/generate-favicon.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const iconsDir = path.join(root, 'public', 'icons')
const publicDir = path.join(root, 'public')
const svgPath = path.join(iconsDir, 'icon.svg')

const PNG_SIZES = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512]

/** Minimal multi-size ICO from PNG buffers (BITMAPINFOHEADER + PNG payload style is not used; classic XOR PNG-in-ICO) */
function createIco(pngBuffersWithSizes) {
  // Use PNG-compressed images inside ICO (supported by modern browsers/Windows)
  const count = pngBuffersWithSizes.length
  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = headerSize + dirEntrySize * count

  let offset = dirSize
  const entries = []
  for (const { size, buffer } of pngBuffersWithSizes) {
    entries.push({ size, buffer, offset })
    offset += buffer.length
  }

  const out = Buffer.alloc(offset)
  // ICONDIR
  out.writeUInt16LE(0, 0) // reserved
  out.writeUInt16LE(1, 2) // type icon
  out.writeUInt16LE(count, 4)

  let entryOffset = 6
  for (const e of entries) {
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset) // width
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset + 1) // height
    out.writeUInt8(0, entryOffset + 2) // color palette
    out.writeUInt8(0, entryOffset + 3) // reserved
    out.writeUInt16LE(1, entryOffset + 4) // planes
    out.writeUInt16LE(32, entryOffset + 6) // bit count
    out.writeUInt32LE(e.buffer.length, entryOffset + 8)
    out.writeUInt32LE(e.offset, entryOffset + 12)
    e.buffer.copy(out, e.offset)
    entryOffset += 16
  }
  return out
}

async function renderPng(size) {
  // Padding for maskable: keep ~10% margin by compositing onto slightly larger canvas? 
  // SVG already has rounded tile; render square.
  return sharp(svgPath)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer()
}

async function main() {
  if (!fs.existsSync(svgPath)) {
    throw new Error(`Missing ${svgPath}`)
  }
  fs.mkdirSync(iconsDir, { recursive: true })

  console.log('Rendering PNG sizes…')
  const buffers = {}
  for (const size of PNG_SIZES) {
    const buf = await renderPng(size)
    buffers[size] = buf
    const name =
      size === 180
        ? 'apple-touch-icon.png'
        : `icon-${size}x${size}.png`
    const dest =
      size === 180
        ? path.join(iconsDir, name)
        : size === 16 || size === 32
          ? path.join(publicDir, `favicon-${size}x${size}.png`)
          : path.join(iconsDir, name)

    // Also write standard icon-* for 16/32 into icons/
    await sharp(buf).toFile(dest)
    if (size === 16 || size === 32) {
      await sharp(buf).toFile(path.join(iconsDir, `icon-${size}x${size}.png`))
    }
    if (size === 180) {
      await sharp(buf).toFile(path.join(publicDir, 'apple-touch-icon.png'))
    }
    console.log(`  ✓ ${path.relative(root, dest)}`)
  }

  // Master 512 also as icon.png
  await sharp(buffers[512]).toFile(path.join(iconsDir, 'icon.png'))
  await sharp(buffers[512]).toFile(path.join(publicDir, 'icon-512.png'))

  // favicon.ico — 16 + 32 + 48
  const ico = createIco([
    { size: 16, buffer: buffers[16] },
    { size: 32, buffer: buffers[32] },
    { size: 48, buffer: buffers[48] },
  ])
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico)
  console.log('  ✓ public/favicon.ico')

  // Copy SVG to public root for modern browsers
  fs.copyFileSync(svgPath, path.join(publicDir, 'favicon.svg'))
  console.log('  ✓ public/favicon.svg')

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
