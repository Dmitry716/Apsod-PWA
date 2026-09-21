import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const brand = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/brand')

// 1920x1080 — content only in upper center; bottom 40% empty for WA avatar overlap
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="1920" height="1080" fill="#050505"/>
  <!-- Safe content box: x 20%–80%, y ~22%–42% -->
  <g transform="translate(960 340)">
    <text
      text-anchor="middle"
      font-family="Arial Black, Arial, Helvetica, sans-serif"
      font-size="96"
      font-weight="800"
      letter-spacing="-3"
      fill="#FFFFFF"
    >APSOD</text>
    <text
      text-anchor="middle"
      y="58"
      font-family="Arial, Helvetica, sans-serif"
      font-size="22"
      font-weight="600"
      letter-spacing="5"
      fill="#E5E5E5"
    >WEB &amp; MOBILE DEVELOPMENT</text>
  </g>
</svg>`

fs.writeFileSync(path.join(brand, 'apsod-wa-cover.svg'), svg)

await sharp(Buffer.from(svg)).png().toFile(path.join(brand, 'apsod-wa-cover.png'))
console.log('wrote apsod-wa-cover.png')
