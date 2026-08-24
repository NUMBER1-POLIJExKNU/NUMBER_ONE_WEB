/**
 * 산출물 카드. 메인 3개 + 보조 2개.
 *
 * 칸 수를 억지로 늘리지 마세요. 실제로 내세울 수 있는 건 이 다섯 개이고,
 * 더 채우려면 오래된 클론이나 내부 작업 폴더를 산출물로 올려야 합니다.
 */

import { LINKS } from "./evidence";

export type Tier = "hero" | "support";
export type Status = "live" | "proto" | "shipped";

export interface Deliverable {
  id: string;
  tier: Tier;
  status: Status;
  /** 카드 상단 픽셀 아이콘 (이모지 1자) */
  glyph: string;
  /** 기술 스택 칩. 검증된 것만. */
  stack: string[];
  /** 열어볼 수 있는 라이브 URL */
  live?: string;
  /** 소스 저장소 */
  source?: string;
  /** 솔직하게 붙여야 하는 단서. 없으면 생략 */
  hasNote: boolean;
}

export const DELIVERABLES: Deliverable[] = [
  {
    id: "web",
    tier: "hero",
    status: "live",
    glyph: "🌱",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "TensorFlow.js", "Tailwind 4"],
    live: LINKS.web,
    source: LINKS.repoWeb,
    hasNote: true,
  },
  {
    id: "mobile",
    tier: "hero",
    status: "live",
    glyph: "📱",
    stack: ["Flutter", "Dart 3.11", "REST polling"],
    live: LINKS.mobile,
    source: LINKS.repoMobile,
    hasNote: true,
  },
  {
    id: "design",
    tier: "hero",
    status: "shipped",
    glyph: "🎨",
    stack: ["Press Start 2P", "VT323", "300 sprites", "1x–8x export"],
    source: LINKS.repoDesign,
    hasNote: true,
  },
  {
    id: "camera",
    tier: "support",
    status: "shipped",
    glyph: "📷",
    stack: ["MobileNetV2", "TensorFlow.js", "in-browser"],
    hasNote: true,
  },
  {
    id: "nodered",
    tier: "support",
    status: "proto",
    glyph: "🔀",
    stack: ["Node-RED", "hysteresis", "watchdog"],
    hasNote: true,
  },
];

export const HERO_ITEMS = DELIVERABLES.filter((d) => d.tier === "hero");
export const SUPPORT_ITEMS = DELIVERABLES.filter((d) => d.tier === "support");

/** 현장 활동. 사진이 들어오면 photo 필드를 추가하세요. */
export const GROUND_BLOCKS = ["edu", "culture", "school"] as const;
