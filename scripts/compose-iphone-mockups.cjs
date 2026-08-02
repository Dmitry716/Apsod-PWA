const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

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

async function main() {
  // Match screenshot aspect 9:16 exactly — no crop, no letterbox
  const screenW = 1170
  const screenH = 2080
  const bezel = 14
  const outerR = 90
  const innerR = 78
  const totalW = screenW + bezel * 2
  const totalH = screenH + bezel * 2

  const shellSvg = Buffer.from(`
<svg width="${totalW}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ti" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4d4d8"/>
      <stop offset="35%" stop-color="#a1a1aa"/>
      <stop offset="70%" stop-color="#71717a"/>
      <stop offset="100%" stop-color="#3f3f46"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${totalW}" height="${totalH}" rx="${outerR}" ry="${outerR}" fill="url(#ti)"/>
  <rect x="${bezel}" y="${bezel}" width="${screenW}" height="${screenH}" rx="${innerR}" ry="${innerR}" fill="#000"/>
</svg>`)

  const islandW = Math.round(screenW * 0.32)
  const islandH = Math.round(screenH * 0.028)
  const islandX = bezel + Math.round((screenW - islandW) / 2)
  const islandY = bezel + Math.round(screenH * 0.018)
  const islandSvg = Buffer.from(`
<svg width="${totalW}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${islandX}" y="${islandY}" width="${islandW}" height="${islandH}" rx="${islandH / 2}" ry="${islandH / 2}" fill="#000"/>
</svg>`)

  // Side buttons
  const buttonsSvg = Buffer.from(`
<svg width="${totalW}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="${Math.round(totalH * 0.16)}" width="5" height="${Math.round(totalH * 0.035)}" rx="2" fill="#a1a1aa"/>
  <rect x="0" y="${Math.round(totalH * 0.22)}" width="5" height="${Math.round(totalH * 0.06)}" rx="2" fill="#a1a1aa"/>
  <rect x="0" y="${Math.round(totalH * 0.30)}" width="5" height="${Math.round(totalH * 0.06)}" rx="2" fill="#a1a1aa"/>
  <rect x="${totalW - 5}" y="${Math.round(totalH * 0.26)}" width="5" height="${Math.round(totalH * 0.09)}" rx="2" fill="#a1a1aa"/>
</svg>`)

  const maskSvg = Buffer.from(`
<svg width="${screenW}" height="${screenH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${screenW}" height="${screenH}" rx="${innerR}" ry="${innerR}" fill="#fff"/>
</svg>`)

  for (const job of jobs) {
    await sharp(job.src).resize(screenW, screenH, { fit: 'cover', position: 'top' }).png().toFile(job.screenOut)

    const screenLayer = await sharp(job.src)
      .resize(screenW, screenH, { fit: 'cover', position: 'top' })
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer()

    await sharp(shellSvg)
      .composite([
        { input: screenLayer, left: bezel, top: bezel },
        { input: islandSvg, left: 0, top: 0 },
        { input: buttonsSvg, left: 0, top: 0 },
      ])
      .png()
      .toFile(job.mockOut)

    console.log('wrote', path.basename(job.mockOut), `${totalW}x${totalH}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
