/**
 * SNS 공유용 OG 이미지(1200×630)를 만듭니다.
 *
 * 카피를 바꿨으면 이 파일의 문구도 같이 바꾸고 `npm run og`로 다시 뽑으세요.
 * 한글은 넣지 않습니다 — 이미지 렌더러가 Galmuri를 알지 못해서,
 * 한글을 쓰면 시스템 고딕으로 떨어져 픽셀 정체성이 깨집니다.
 */

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

const soil = Array.from(
  { length: Math.ceil(W / 16) },
  (_, i) =>
    `<rect x='${i * 16}' y='${H - 56}' width='8' height='24' fill='#AA7E55'/>` +
    `<rect x='${i * 16 + 8}' y='${H - 56}' width='8' height='24' fill='#825C37'/>`,
).join("");

const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' shape-rendering='crispEdges'>
  <defs>
    <linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#A3E4FF'/>
      <stop offset='0.62' stop-color='#D4F0FF'/>
      <stop offset='1' stop-color='#FFFDF7'/>
    </linearGradient>
  </defs>
  <rect width='${W}' height='${H}' fill='url(#sky)'/>
  <g fill='#FFFFFF' opacity='0.55'>
    <rect x='120' y='70' width='64' height='20'/>
    <rect x='136' y='60' width='64' height='20'/>
    <rect x='154' y='64' width='64' height='20'/>
    <rect x='880' y='120' width='48' height='16'/>
    <rect x='892' y='112' width='48' height='16'/>
  </g>
  <text x='80' y='250' font-family='Consolas, monospace' font-size='34' fill='#397A2B' letter-spacing='2'>2026 WFK IT · TEAM NUMBER ONE · JEMBER</text>
  <text x='80' y='340' font-family='Segoe UI, Arial, sans-serif' font-weight='700' font-size='72' fill='#2B3A27'>From wisdom to data,</text>
  <text x='80' y='424' font-family='Segoe UI, Arial, sans-serif' font-weight='700' font-size='72' fill='#397A2B'>to the next generation.</text>
  <text x='80' y='494' font-family='Segoe UI, Arial, sans-serif' font-size='32' fill='#5B6B56'>POLIJE x Kyungpook National University</text>
  <g>${soil}</g>
  <rect x='0' y='${H - 32}' width='${W}' height='32' fill='#2B3A27'/>
</svg>`;

const info = await sharp(Buffer.from(svg))
  .png({ palette: true, effort: 10 })
  .toFile(join(root, "public", "og.png"));

console.log(`  og.png  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
