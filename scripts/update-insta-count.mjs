/**
 * 인스타그램 @no.1_wfk 게시물 수를 불러와 src/data/evidence.ts의 INSTAGRAM_POSTS에 넣습니다.
 *
 * 프로필의 og:description("631 Followers, 841 Following, 77 Posts - …")에서 읽습니다.
 * 인스타그램은 클라우드 서버(Vercel, GitHub Actions)의 요청을 로그인 페이지로 돌려보내므로
 * 이 스크립트는 팀원 PC에서 돌립니다.
 *
 *   npm run insta             불러와서 evidence.ts만 고칩니다
 *   npm run insta -- --push   바뀌었으면 evidence.ts만 커밋해 main에 푸시합니다 → Vercel 재배포
 *
 * --push는 작업 스케줄러가 4시간마다 부르는 모드입니다. 작업 중인 폴더와 섞이지 않도록
 * 별도 클론에서 돌리고, 변경 사항이 있는 트리나 main이 아닌 브랜치에서는 멈춥니다.
 */

import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const EVIDENCE = join(root, "src", "data", "evidence.ts");
const HANDLE = "no.1_wfk";
const push = process.argv.includes("--push");

/** value와 verifiedOn 두 줄을 함께 잡습니다. evidence.ts의 모양을 바꾸면 여기도 맞추세요. */
const ENTRY = /(export const INSTAGRAM_POSTS = \{\s*value: )(\d+)(,\s*verifiedOn: ")([\d-]+)(")/;

function git(...args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function log(message) {
  const at = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });
  console.log(`[${at}] ${message}`);
}

async function fetchPostCount() {
  const res = await fetch(`https://www.instagram.com/${HANDLE}/`, {
    headers: {
      // 링크 미리보기 크롤러에게는 로그인 벽 대신 og 태그가 담긴 문서를 줍니다.
      "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      // og:description이 요청 언어로 번역됩니다. 영어로 고정해야 "N Posts"로 읽힙니다.
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
  });
  if (res.status !== 200) {
    const to = res.headers.get("location");
    throw new Error(`instagram.com 응답 ${res.status}${to ? ` → ${new URL(to, res.url).pathname}` : ""}`);
  }

  const description = readOgDescription(await res.text());
  if (description == null) throw new Error("og:description이 없습니다");

  const match = description.match(/([\d,]+)\s+Posts?\b/i);
  if (!match) throw new Error(`게시물 수를 찾지 못했습니다: ${description.slice(0, 80)}`);

  const posts = Number(match[1].replace(/,/g, ""));
  if (!Number.isSafeInteger(posts) || posts <= 0) throw new Error(`게시물 수가 올바르지 않습니다: ${match[1]}`);
  return posts;
}

/** 속성 순서나 따옴표 종류가 바뀌어도 읽히도록 meta 태그를 하나씩 봅니다. */
function readOgDescription(html) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (!/\bproperty=["']og:description["']/i.test(tag)) continue;
    const content = tag.match(/\bcontent=(?:"([^"]*)"|'([^']*)')/i);
    return content ? (content[1] ?? content[2]) : null;
  }
  return null;
}

async function main() {
  if (push) {
    if (git("rev-parse", "--abbrev-ref", "HEAD") !== "main") throw new Error("--push는 main 브랜치에서만 씁니다");
    if (git("status", "--porcelain")) throw new Error("--push는 변경 사항이 없는 트리에서만 씁니다");
    git("pull", "--ff-only", "--quiet");
  }

  const posts = await fetchPostCount();
  const source = await readFile(EVIDENCE, "utf8");
  const entry = source.match(ENTRY);
  if (!entry) throw new Error("evidence.ts에서 INSTAGRAM_POSTS를 찾지 못했습니다");

  const before = Number(entry[2]);
  if (before === posts) {
    log(`변화 없음 (${posts})`);
    return;
  }

  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
  await writeFile(EVIDENCE, source.replace(ENTRY, `$1${posts}$3${today}$5`));
  log(`${before} → ${posts}`);

  if (push) {
    git("commit", "--quiet", "-m", `인스타그램 게시물 수 ${before} → ${posts}`, "--", "src/data/evidence.ts");
    try {
      git("push", "--quiet", "origin", "main");
    } catch (err) {
      // 트리가 깨끗한 상태에서 시작했으므로 방금 만든 커밋만 되돌립니다. 다음 실행에서 다시 시도합니다.
      git("reset", "--hard", "--quiet", "HEAD~1");
      throw err;
    }
    log("main에 푸시했습니다");
  }
}

main().catch((err) => {
  log(`실패: ${err instanceof Error ? err.message : err}`);
  process.exitCode = 1;
});
