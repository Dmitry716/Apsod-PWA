const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const framePath = 'c:/Users/karel/apsod-pwa/public/devices/iphone-17-pro-max-frame.png'
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
  const frameMeta = await sharp(framePath).metadata()
  const fw = frameMeta.width
  const fh = frameMeta.height
  const left = Math.round(fw * 0.0285)
  const top = Math.round(fh * 0.014)
  const sw = Math.round(fw * 0.9429)
  const sh = Math.round(fh * 0.972)
  const radius = Math.round(Math.min(sw, sh) * 0.12)

  const maskSvg = Buffer.from(
    `<svg width="${sw}" height="${sh}"><rect x="0" y="0" width="${sw}" height="${sh}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  )

  for (const job of jobs) {
    await sharp(job.src).png().toFile(job.screenOut)

    const fitted = await sharp(job.src)
      .resize(sw, sh, { fit: 'cover', position: 'top' })
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer()

    await sharp({
      create: {
        width: fw,
        height: fh,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: fitted, left, top },
        { input: framePath, left: 0, top: 0 },
      ])
      .png()
      .toFile(job.mockOut)

    console.log('wrote', path.basename(job.mockOut), fw + 'x' + fh)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
