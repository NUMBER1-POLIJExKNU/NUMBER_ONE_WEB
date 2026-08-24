/**
 * Galmuri 한글 픽셀 폰트를 이 페이지가 실제로 쓰는 글자로만 잘라냅니다.
 *
 * 원본 Galmuri11.woff2는 493KB입니다. QR로 들어온 사람이 발표장 회선에서
 * 그걸 통째로 받게 둘 수 없어서, 번역 파일과 마크업에 등장하는 글자만 남깁니다.
 * 보통 40KB 아래로 떨어집니다.
 *
 * 실행: npm run fonts  (build 앞단에서 자동 실행됩니다)
 */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { basename, dirname, join } from "node:path";
import subsetFont from "subset-font";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "fonts");

/** 서브셋에 항상 포함할 글자 — 숫자, 라틴, 문장부호, 화살표 */
const ALWAYS =
  "0123456789" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz" +
  " .,:;!?·—–-_/\\|()[]{}<>\"'`@#$%^&*+=~" +
  "→←↑↓↗×✓" +
  " ";

async function collectText() {
  const chunks = [ALWAYS];

  // 번역 파일 전부 — 언어를 바꿔도 글자가 깨지지 않도록 셋 다 넣습니다.
  const i18nDir = join(root, "src", "i18n");
  for (const file of await readdir(i18nDir)) {
    if (!file.endsWith(".json")) continue;
    const raw = await readFile(join(i18nDir, file), "utf8");
    chunks.push(Object.values(JSON.parse(raw)).join(""));
  }

  // 마크업의 기본 텍스트(자바스크립트가 뜨기 전에 보이는 글자)
  chunks.push(await readFile(join(root, "index.html"), "utf8"));

  // 데이터 모듈의 이름·라벨
  const dataDir = join(root, "src", "data");
  for (const file of await readdir(dataDir)) {
    chunks.push(await readFile(join(dataDir, file), "utf8"));
  }

  // 중복 제거 — 서브셋 도구에는 유니크한 글자만 주면 충분합니다.
  return [...new Set(chunks.join(""))].join("");
}

async function run() {
  const text = await collectText();
  await mkdir(outDir, { recursive: true });

  const faces = [
    [join("galmuri", "dist", "Galmuri11.woff2"), "Galmuri11.subset.woff2"],
    [join("galmuri", "dist", "Galmuri11-Bold.woff2"), "Galmuri11-Bold.subset.woff2"],
    // 라틴 픽셀 폰트도 자체 호스팅합니다. 발표장 회선에서 Google Fonts가
    // 느리거나 막히면 페이지의 픽셀 정체성이 통째로 무너지기 때문입니다.
    [
      join("@fontsource", "press-start-2p", "files", "press-start-2p-latin-400-normal.woff2"),
      "PressStart2P.subset.woff2",
    ],
    [join("@fontsource", "vt323", "files", "vt323-latin-400-normal.woff2"), "VT323.subset.woff2"],
  ];

  let totalBefore = 0;
  let totalAfter = 0;

  for (const [src, dest] of faces) {
    const buf = await readFile(join(root, "node_modules", src));
    const out = await subsetFont(buf, text, { targetFormat: "woff2" });
    await writeFile(join(outDir, dest), out);

    totalBefore += buf.length;
    totalAfter += out.length;
    console.log(
      `  ${basename(src).padEnd(38)} ${(buf.length / 1024).toFixed(0).padStart(4)} KB  →  ${(
        out.length / 1024
      )
        .toFixed(0)
        .padStart(3)} KB   ${dest}`,
    );
  }

  console.log(
    `\n  글자 ${text.length}자 · 합계 ${(totalBefore / 1024).toFixed(0)} KB → ${(
      totalAfter / 1024
    ).toFixed(0)} KB (${Math.round((1 - totalAfter / totalBefore) * 100)}% 감소)\n`,
  );
}

run().catch((err) => {
  console.error("폰트 서브셋 실패:", err);
  process.exit(1);
});
