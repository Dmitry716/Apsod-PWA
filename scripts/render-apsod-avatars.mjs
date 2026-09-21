import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const brand = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/brand')

const dark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">
  <rect width="512" height="512" fill="#050505"/>
  <g transform="translate(256 248)">
    <text text-anchor="middle" dominant-baseline="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="58" font-weight="800" letter-spacing="-2" fill="#FFFFFF" y="-8">APSOD</text>
    <text text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="600" letter-spacing="1.8" fill="#E8E8E8" y="32">WEB &amp; MOBILE DEVELOPMENT</text>
  </g>
</svg>`

const light = dark
  .replace('#050505', '#F7F7F5')
  .replace('#FFFFFF', '#050505')
  .replace('#E8E8E8', '#374151')

async function write(svg, name) {
  const out = path.join(brand, name)
  await sharp(Buffer.from(svg)).png().resize(1024, 1024).toFile(out)
  console.log('wrote', name)
}

fs.writeFileSync(path.join(brand, 'apsod-avatar-wa.svg'), dark)
fs.writeFileSync(path.join(brand, 'apsod-avatar-wa-light.svg'), light)

await write(dark, 'apsod-avatar-dark.png')
await write(dark, 'apsod-avatar-premium.png')
await write(light, 'apsod-avatar-light.png')
await write(light, 'apsod-avatar-premium-light.png')
console.log('done')
