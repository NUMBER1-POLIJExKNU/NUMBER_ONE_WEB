/**
 * 검증된 사실만 모아 두는 단일 출처.
 *
 * 여기 없는 수치는 페이지에 쓰지 마세요. 디스크·git 로그·라이브 API와
 * 활동결과보고서로 직접 확인한 값입니다. 새 수치를 넣을 때도 먼저 여기에 근거와 함께 추가하세요.
 */

export const VERIFIED_ON = "2026-09-11";

export const LINKS = {
  web: "https://main-plant-moji.vercel.app/",
  mobile: "https://mobile-plantemoji.vercel.app/",
  org: "https://github.com/NUMBER1-POLIJExKNU",
  repoWeb: "https://github.com/NUMBER1-POLIJExKNU/Main-PlantMoji",
  repoMobile: "https://github.com/NUMBER1-POLIJExKNU/Mobile-PlantEmoji",
  repoDesign: "https://github.com/NUMBER1-POLIJExKNU/Web-PlantEmoji",
  kjtv: "https://www.youtube.com/watch?v=G2zWa1sDu_Y",
  kbsVod: "https://vod.kbs.co.kr/index.html?broadcast_complete_yn=N&local_station_code=00&program_code=T2020-0388&program_id=PS-2026147543-01-000&section_code=05&section_id=11203&section_sub_code=08&sname=vod&source=episode&stype=vod",
} as const;

/** Hero의 카운터. value는 숫자, suffix는 i18n 키. */
export interface Metric {
  value: number;
  unitKey: string;
  subKey: string;
}

/**
 * 수혜 인원 — 활동결과보고서 Ⅰ 결과 종합.
 * NUMBER ONE은 경북대 파견단의 공연·교육·문화교류 전 일정에 참여했습니다.
 */
export const BENEFICIARIES = {
  total: 4440,
  youth: 1000,
  university: 3240,
  teachers: 100,
  professors: 50,
  public: 50,
} as const;

/** 봉사활동 시간 — 활동결과보고서. */
export const SERVICE_HOURS = {
  total: 111,
  itEducation: 18.5,
  itProject: 66,
  culture: 26.5,
} as const;

/** SMK Negeri 4 Jember 스마트팜 수업 (2026-08-13)과 사후 설문(구글 폼). */
export const SMK_CLASS = {
  students: 44,
  surveyResponses: 19,
  smartFarmInterest: 18,
  gameLearningFun: 18,
  growTogether: 19,
} as const;

/**
 * 인스타그램 @no.1_wfk 게시물 수. 번역 문장 속 {igPosts}에 들어갑니다.
 *
 * 팀이 계속 올리므로 손으로 고치지 않습니다. `npm run insta`(scripts/update-insta-count.mjs)가
 * 프로필에서 불러와 아래 두 값을 고칩니다. verifiedOn은 값이 마지막으로 바뀐 날입니다.
 */
export const INSTAGRAM_POSTS = {
  value: 81,
  verifiedOn: "2026-09-29",
} as const;

/** 요약면 숫자 — 팀이 이룬 것을 셉니다. */
export const METRICS: Metric[] = [
  { value: BENEFICIARIES.total, unitKey: "numbers.people", subKey: "numbers.people.sub" },
  { value: SERVICE_HOURS.total, unitKey: "numbers.hours", subKey: "numbers.hours.sub" },
  { value: 1, unitKey: "numbers.first", subKey: "numbers.first.sub" },
  { value: SMK_CLASS.students, unitKey: "numbers.students", subKey: "numbers.students.sub" },
  { value: 9, unitKey: "numbers.team", subKey: "numbers.team.sub" },
  { value: 22, unitKey: "numbers.days", subKey: "numbers.days.sub" },
  { value: INSTAGRAM_POSTS.value, unitKey: "numbers.posts", subKey: "numbers.posts.sub" },
  { value: 3, unitKey: "numbers.deploys", subKey: "numbers.deploys.sub" },
  { value: 280, unitKey: "numbers.commits", subKey: "numbers.commits.sub" },
  { value: 300, unitKey: "numbers.sprites", subKey: "numbers.sprites.sub" },
];

/** 협업 증거. 커밋 해시는 실제 저장소의 것. */
export interface CoDevItem {
  kind: "org" | "in-to-kr" | "kr-to-in" | "shared";
  labelKey: string;
  descKey: string;
  /** 화면에 코드체로 보여줄 증거 문자열 */
  proof: string;
  href?: string;
}

export const CODEV: CoDevItem[] = [
  {
    kind: "org",
    labelKey: "codev.org.label",
    descKey: "codev.org.desc",
    proof: "github.com/NUMBER1-POLIJExKNU",
    href: LINKS.org,
  },
  {
    kind: "in-to-kr",
    labelKey: "codev.dir1.label",
    descKey: "codev.dir1.desc",
    proof: "53b706d  feat(camera): integrate Teachable Machine model into Camera AI",
  },
  {
    kind: "kr-to-in",
    labelKey: "codev.dir2.label",
    descKey: "codev.dir2.desc",
    proof: "5b79564  feat: connect mobile web to PlantMoji APIs",
  },
  {
    kind: "shared",
    labelKey: "codev.shared.label",
    descKey: "codev.shared.desc",
    proof: 'GET /api/collection-unlocked → {"level":30,"totalXp":450,"currentStreak":4}',
  },
];

/** Camera AI 재학습 — 페이지의 시그니처 시각화에 쓰입니다. */
export const RETRAIN = {
  totalTensors: 263,
  changedTensors: 3,
  /** 263개 격자에서 강조할 인덱스. 분류기 헤드는 그래프 마지막에 위치합니다. */
  changedIndices: [260, 261, 262] as number[],
  frozenParams: 410_208,
  trainedParams: 128_300,
  layers: 158,
  inputSize: 224,
  confidenceFloor: 0.7,
  reclassifySeconds: 2.5,
} as const;


export const DEPLOYMENT = {
  startISO: "2026-07-27",
  endISO: "2026-08-17",
  days: 22,
  sensorLastReadingISO: "2026-08-20",
} as const;
