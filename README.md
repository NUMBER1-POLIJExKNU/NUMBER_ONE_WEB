# NUMBER ONE 포트폴리오 랜딩페이지

2026 월드프렌즈코리아(WFK) IT 봉사단 경북대학교 01팀 NUMBER ONE의 활동 기록 페이지입니다.
한국어·영어·인도네시아어로 읽을 수 있습니다.

페이지에 쓰인 모든 수치와 링크의 단일 출처는 [`src/data/evidence.ts`](./src/data/evidence.ts)입니다.
새 수치를 넣을 일이 생기면 먼저 그 파일에 근거와 함께 추가하세요.

---

## 실행

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 폰트 서브셋 + OG 생성 + 타입체크 + 빌드
npm run preview    # 빌드 결과 확인
```

`public/fonts/`와 `public/og.png`는 **빌드가 생성**합니다. 저장소에 커밋하지 마세요.

---

## 고치는 법

### 팀원 소개와 사진

[`src/data/team.ts`](./src/data/team.ts)의 각 팀원 `bio`와 `photo`를 채웁니다.

- `photo`는 `public/photos/` 기준 파일명입니다. 정사각형에 가깝게 잘라서 넣으세요.
- `bio`나 `photo`가 `null`이면 카드에서 **자동으로 생략**됩니다.
- `legalName`은 **본인에게 확인받고 공개 동의를 받은 뒤에만** 채웁니다.

### 문구

[`src/i18n/`](./src/i18n)의 `ko.json` / `en.json` / `id.json` 셋을 **같이** 고쳐야 합니다.
키가 없으면 화면에 키 이름이 그대로 나옵니다.

한국어 문구에 **새로운 글자**를 쓴 경우 반드시 `npm run build`(또는 `npm run fonts`)를
다시 돌리세요. 폰트가 실제 쓰는 글자로만 서브셋되어 있어서, 서브셋에 없는 글자는
픽셀 폰트가 아닌 시스템 폰트로 떨어집니다.

`{igPosts}` 자리는 지우지 마세요. 인스타그램 게시물 수가 들어갑니다.

### 인스타그램 게시물 수

`{igPosts}`에는 `src/data/evidence.ts`의 `INSTAGRAM_POSTS.value`가 들어갑니다. 손으로 고치지 않습니다.

```bash
npm run insta              # 프로필에서 현재 게시물 수를 불러와 evidence.ts에 넣기
npm run insta -- --push    # 바뀌었으면 evidence.ts만 커밋해 main에 푸시 (Vercel 재배포)
```

팀 PC의 작업 스케줄러가 별도 클론에서 `--push` 모드를 4시간마다 돌립니다.

---

## 배포

`main`에 푸시하면 Vercel이 자동으로 배포합니다 (`vercel.json`).
마크업의 HTML 주석은 빌드할 때 지워집니다.
