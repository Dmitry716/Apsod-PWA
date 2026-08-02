const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const original = path.join(root, 'public/devices/samsung-s26.png')
const frameOut = path.join(root, 'public/devices/samsung-s26-frame.png')
const outDir = path.join(root, 'public/devices/mockups')
const screensDir = path.join(root, 'public/devices/app-screens')

fs.mkdirSync(outDir, { recursive: true })

const SCREEN_NAMES = ['home', 'services', 'booking']

function isStudioBg(r, g, b) {
  return r > 245 && g > 245 && b > 245
}

async function prepareScreen(name, holeW, holeH) {
  const src = path.join(screensDir, `${name}-portrait.png`)
  const BLACK = { r: 0, g: 0, b: 0, alpha: 1 }
  const meta = await sharp(src).metadata()
  // Safe pad so titles/nav survive fill into tall glass
  const padY = Math.round(meta.height * (name === 'home' ? 0.02 : 0.055))
  const padX = Math.round(meta.width * 0.035)
  const padded = await sharp(src)
    .extend({ top: padY, bottom: padY, left: padX, right: padX, background: BLACK })
    .png()
    .toBuffer()
  return sharp(padded).resize(holeW * 2, holeH * 2, { fit: 'fill' }).png().toBuffer()
}

async function main() {
  const { data, info } = await sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const px = Buffer.from(data)

  const visited = new Uint8Array(width * height)
  const stack = []
  const tryPush = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const i = y * width + x
    if (visited[i]) return
    const o = i * channels
    if (!isStudioBg(px[o], px[o + 1], px[o + 2])) return
    visited[i] = 1
    stack.push(i)
  }
  for (let x = 0; x < width; x++) {
    tryPush(x, 0)
    tryPush(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    tryPush(0, y)
    tryPush(width - 1, y)
  }
  while (stack.length) {
    const i = stack.pop()
    const o = i * channels
    px[o] = px[o + 1] = px[o + 2] = px[o + 3] = 0
    const x = i % width
    const y = (i / width) | 0
    tryPush(x + 1, y)
    tryPush(x - 1, y)
    tryPush(x, y + 1)
    tryPush(x, y - 1)
  }

  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (px[(y * width + x) * channels + 3] > 40) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  minX = Math.max(0, minX - 2)
  minY = Math.max(0, minY - 2)
  maxX = Math.min(width - 1, maxX + 2)
  maxY = Math.min(height - 1, maxY + 2)
  const cw = maxX - minX + 1
  const ch = maxY - minY + 1

  let sMinX = cw
  let sMinY = ch
  let sMaxX = 0
  let sMaxY = 0
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const o = (y * width + x) * channels
      if (px[o + 3] < 200) continue
      if (px[o] <= 30 && px[o + 1] <= 30 && px[o + 2] <= 30) {
        const lx = x - minX
        const ly = y - minY
        if (lx < sMinX) sMinX = lx
        if (lx > sMaxX) sMaxX = lx
        if (ly < sMinY) sMinY = ly
        if (ly > sMaxY) sMaxY = ly
      }
    }
  }

  const phoneW = cw
  const cx = phoneW / 2
  const camTop = sMinY + (sMaxY - sMinY) * 0.01
  const camBottom = sMinY + (sMaxY - sMinY) * 0.042
  const camLeft = cx - phoneW * 0.028
  const camRight = cx + phoneW * 0.028
  const bezelKeep = Math.max(3, Math.round(phoneW * 0.014))

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const o = (y * width + x) * channels
      if (px[o + 3] < 40) continue
      if (!(px[o] <= 30 && px[o + 1] <= 30 && px[o + 2] <= 30)) continue
      const lx = x - minX
      const ly = y - minY
      if (lx < sMinX + bezelKeep || lx > sMaxX - bezelKeep) continue
      if (ly < sMinY + bezelKeep || ly > sMaxY - bezelKeep) continue
      if (lx >= camLeft && lx <= camRight && ly >= camTop && ly <= camBottom) continue
      px[o + 3] = 0
    }
  }

  const hole = {
    left: sMinX + bezelKeep,
    top: sMinY + bezelKeep,
    width: sMaxX - sMinX + 1 - bezelKeep * 2,
    height: sMaxY - sMinY + 1 - bezelKeep * 2,
  }
  const radius = Math.round(Math.min(hole.width, hole.height) * 0.07)

  await sharp(px, { raw: { width, height, channels } })
    .extract({ left: minX, top: minY, width: cw, height: ch })
    .png()
    .toFile(frameOut)

  console.log({ cw, ch, hole, radius })

  const maskSvg = Buffer.from(
    `<svg width="${hole.width}" height="${hole.height}"><rect width="${hole.width}" height="${hole.height}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  )
  const punchR = Math.max(4, Math.round(hole.width * 0.032))
  const punchCy = Math.round(hole.height * 0.026)
  const punchSvg = Buffer.from(
    `<svg width="${hole.width}" height="${hole.height}"><circle cx="${hole.width / 2}" cy="${punchCy}" r="${punchR}" fill="#050505"/></svg>`
  )

  for (const name of SCREEN_NAMES) {
    const prepared = await prepareScreen(name, hole.width, hole.height)
    const screenOut = path.join(screensDir, `${name}.png`)
    const mockOut = path.join(outDir, `samsung-${name}.png`)

    await sharp(prepared).png().toFile(screenOut)

    const fitted = await sharp(prepared)
      .resize(hole.width, hole.height, { fit: 'cover', position: 'centre' })
      .composite([
        { input: maskSvg, blend: 'dest-in' },
        { input: punchSvg, blend: 'over' },
      ])
      .png()
      .toBuffer()

    await sharp({
      create: { width: cw, height: ch, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([
        { input: fitted, left: hole.left, top: hole.top },
        { input: frameOut, left: 0, top: 0 },
      ])
      .png()
      .toFile(mockOut)

    console.log('wrote', path.basename(mockOut))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
