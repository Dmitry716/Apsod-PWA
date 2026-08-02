const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const original = 'c:/Users/karel/apsod-pwa/public/devices/iphone-17-pro-max.png'
const frameOut = 'c:/Users/karel/apsod-pwa/public/devices/iphone-17-pro-max-frame.png'
const outDir = 'c:/Users/karel/apsod-pwa/public/devices/mockups'
const screensDir = 'c:/Users/karel/apsod-pwa/public/devices/app-screens'
const assets = 'C:/Users/karel/.cursor/projects/c-Users-karel-apsod-pwa/assets'

fs.mkdirSync(outDir, { recursive: true })

const jobs = [
  {
    src: path.join(assets, 'screen-home-916.png'),
    screenOut: path.join(screensDir, 'home.png'),
    mockOut: path.join(outDir, 'iphone-home.png'),
  },
  {
    src: path.join(assets, 'screen-services-916.png'),
    screenOut: path.join(screensDir, 'services.png'),
    mockOut: path.join(outDir, 'iphone-services.png'),
  },
  {
    src: path.join(assets, 'screen-booking-916.png'),
    screenOut: path.join(screensDir, 'booking.png'),
    mockOut: path.join(outDir, 'iphone-booking.png'),
  },
]

function isStudioBg(r, g, b) {
  const nearGray = Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && Math.abs(r - b) < 18
  const lum = (r + g + b) / 3
  return nearGray && lum >= 85 && lum <= 252
}

async function main() {
  const { data, info } = await sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const px = Buffer.from(data)

  // 1) Remove studio background
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

  // 2) Crop to phone
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

  // 3) Find black display + island region
  let sMinX = cw
  let sMinY = ch
  let sMaxX = 0
  let sMaxY = 0
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const o = (y * width + x) * channels
      if (px[o + 3] < 200) continue
      if (px[o] <= 28 && px[o + 1] <= 28 && px[o + 2] <= 28) {
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
  const phoneH = ch
  const cx = phoneW / 2
  const islandTop = sMinY + (sMaxY - sMinY) * 0.012
  const islandBottom = sMinY + (sMaxY - sMinY) * 0.055
  const islandLeft = cx - phoneW * 0.155
  const islandRight = cx + phoneW * 0.155
  const bezelKeep = Math.max(5, Math.round(phoneW * 0.022))

  // 4) Punch screen hole but keep bezel ring + Dynamic Island
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const o = (y * width + x) * channels
      if (px[o + 3] < 40) continue
      if (!(px[o] <= 28 && px[o + 1] <= 28 && px[o + 2] <= 28)) continue
      const lx = x - minX
      const ly = y - minY
      if (lx < sMinX + bezelKeep || lx > sMaxX - bezelKeep) continue
      if (ly < sMinY + bezelKeep || ly > sMaxY - bezelKeep) continue
      if (lx >= islandLeft && lx <= islandRight && ly >= islandTop && ly <= islandBottom) continue
      px[o + 3] = 0
    }
  }

  const hole = {
    left: sMinX + bezelKeep,
    top: sMinY + bezelKeep,
    width: sMaxX - sMinX + 1 - bezelKeep * 2,
    height: sMaxY - sMinY + 1 - bezelKeep * 2,
  }
  const radius = Math.round(Math.min(hole.width, hole.height) * 0.11)

  await sharp(px, { raw: { width, height, channels } })
    .extract({ left: minX, top: minY, width: cw, height: ch })
    .png()
    .toFile(frameOut)

  console.log({ cw, ch, hole, radius })

  const maskSvg = Buffer.from(
    `<svg width="${hole.width}" height="${hole.height}"><rect width="${hole.width}" height="${hole.height}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  )

  for (const job of jobs) {
    // Keep source screens as 9:16 assets
    await sharp(job.src).png().toFile(job.screenOut)

    // contain = no text crop; black fills unused phone height
    const fitted = await sharp(job.src)
      .resize(hole.width, hole.height, {
        fit: 'contain',
        position: 'centre',
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      })
      .composite([{ input: maskSvg, blend: 'dest-in' }])
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
      .toFile(job.mockOut)

    console.log('wrote', path.basename(job.mockOut))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
