/**
 * 검증된 사실만 모아 두는 단일 출처.
 *
 * 여기 없는 수치는 페이지에 쓰지 마세요. 전부 2026-08-25에 디스크·git 로그·
 * 라이브 API로 직접 확인한 값입니다. 새 수치를 넣을 때도 먼저 여기에 근거와 함께 추가하세요.
 *
 * 쓰지 않는 값: 수혜자 4,440명(KNU 파견단 전체 수치라 9명 팀에 귀속 불가),
 * 모델 정확도(평가셋이 없습니다), "실시간 센서 연동 중"(2026-08-20 이후 하드웨어 정지).
 */

export const VERIFIED_ON = "2026-08-25";

export const LINKS = {
  web: "https://main-plant-moji.vercel.app/",
  mobile: "https://mobile-plantemoji.vercel.app/",
  org: "https://github.com/NUMBER1-POLIJExKNU",
  repoWeb: "https://github.com/NUMBER1-POLIJExKNU/Main-PlantMoji",
  repoMobile: "https://github.com/NUMBER1-POLIJExKNU/Mobile-PlantEmoji",
  repoDesign: "https://github.com/NUMBER1-POLIJExKNU/Web-PlantEmoji",
} as const;

/** Hero의 카운터. value는 숫자, suffix는 i18n 키. */
export interface Metric {
  value: number;
  unitKey: string;
  subKey: string;
}

export const METRICS: Metric[] = [
  { value: 280, unitKey: "numbers.commits", subKey: "numbers.commits.sub" },
  { value: 22527, unitKey: "numbers.lines", subKey: "numbers.lines.sub" },
  { value: 131, unitKey: "numbers.tests", subKey: "numbers.tests.sub" },
  { value: 20, unitKey: "numbers.api", subKey: "numbers.api.sub" },
  { value: 300, unitKey: "numbers.sprites", subKey: "numbers.sprites.sub" },
  { value: 3, unitKey: "numbers.langs", subKey: "numbers.langs.sub" },
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

export const ARCH_NODES = ["n1", "n2", "n3", "n4", "n5"] as const;

export const DEPLOYMENT = {
  startISO: "2026-07-27",
  endISO: "2026-08-17",
  days: 22,
  sensorLastReadingISO: "2026-08-20",
} as const;
