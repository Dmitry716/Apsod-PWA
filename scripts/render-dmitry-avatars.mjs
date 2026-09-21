import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const brand = path.join(root, 'public/brand')
const src = path.join(brand, 'dmitry-avatar-casual.png')

if (!fs.existsSync(src)) {
  console.error('Source not found:', src)
  process.exit(1)
}

const WA_PAD = 72
const WA_BG = { r: 28, g: 32, b: 42 }

async function writeFaceCrop(input, size, out) {
  const meta = await sharp(input).metadata()
  const w = meta.width ?? 1024
  const h = meta.height ?? 1024
  const side = Math.round(Math.min(w, h) * 0.78)
  const left = Math.round((w - side) / 2)
  const top = Math.round(h * 0.06)
  await sharp(input)
    .extract({ left, top, width: side, height: side })
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png({ quality: 95 })
    .toFile(out)
}

async function waSafe(input, size, out) {
  const inner = Math.round(size - WA_PAD * 2)
  await sharp(input)
    .resize(inner, inner, { fit: 'cover', position: 'centre' })
    .extend({
      top: WA_PAD,
      bottom: WA_PAD,
      left: WA_PAD,
      right: WA_PAD,
      background: WA_BG,
    })
    .png({ quality: 95 })
    .toFile(out)
}

async function exportImage(input, size, out, { jpeg = false, quality = 90 } = {}) {
  let pipe = sharp(input).resize(size, size, { fit: 'cover', position: 'centre' })
  if (jpeg) {
    await pipe.jpeg({ quality, mozjpeg: true }).toFile(out)
  } else {
    await pipe.png({ quality: 95 }).toFile(out)
  }
  console.log('wrote', path.basename(out))
}

const exports = [
  { size: 1080, name: 'dmitry-avatar-instagram.png' },
  { size: 800, name: 'dmitry-avatar-linkedin.png' },
  { size: 640, name: 'dmitry-avatar-whatsapp.png' },
  { size: 640, name: 'dmitry-avatar-casual-wa.png' },
  { size: 512, name: 'dmitry-avatar-telegram.png' },
  { size: 512, name: 'dmitry-avatar-casual-512.png' },
  { size: 400, name: 'dmitry-avatar-vk.png' },
  { size: 320, name: 'dmitry-avatar-preview.png' },
]

console.log('Source:', src)

for (const { size, name } of exports) {
  await exportImage(src, size, path.join(brand, name))
}

await waSafe(src, 1024, path.join(brand, 'dmitry-avatar-wa-safe.png'))
console.log('wrote dmitry-avatar-wa-safe.png')

await waSafe(src, 640, path.join(brand, 'dmitry-avatar-whatsapp-safe.png'))
console.log('wrote dmitry-avatar-whatsapp-safe.png')

await writeFaceCrop(src, 640, path.join(brand, 'dmitry-avatar-messenger.png'))
console.log('wrote dmitry-avatar-messenger.png')

await writeFaceCrop(src, 512, path.join(brand, 'dmitry-avatar-messenger-512.png'))
console.log('wrote dmitry-avatar-messenger-512.png')

await exportImage(src, 640, path.join(brand, 'dmitry-avatar-whatsapp.jpg'), { jpeg: true, quality: 88 })
await exportImage(src, 512, path.join(brand, 'dmitry-avatar-telegram.jpg'), { jpeg: true, quality: 88 })

console.log('done')
