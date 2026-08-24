/**
 * 팀 로스터.
 * 출처: NUMBERONE_SWOT_PRESENTATION.pdf 조직도 + 2026-08-25 팀 확인.
 *
 * 표기 원칙
 * - 인니측은 팀에서 확인해 준 표기(Rama · Dhede · Marquez · Reno · Kiki)를 씁니다.
 *   회의록의 "Rema"는 Rama의 오기이며 별도 인물이 아닙니다.
 * - git 실명(Revi Ardiano 등)과 닉네임의 대응은 아직 미확인이라 병기하지 않습니다.
 *   본인 확인 + 공개 동의가 끝나면 `legalName`을 채우세요.
 * - `bio`에는 팀 각오 포스터(20260731 PROJECT START)의 각자 모토가 들어 있습니다.
 */

export type RoleCode = "PL" | "TL" | "KL" | "ML";

export interface Member {
  /** 페이지에 표시할 이름 */
  name: string;
  /** 본인 동의 후 병기할 실명. 미확인이면 null */
  legalName: string | null;
  role: RoleCode;
  /** 본인에게 받은 한 줄 소개. 없으면 null */
  bio: string | null;
  /** public/photos/ 기준 파일명. 없으면 null → 픽셀 플레이스홀더 */
  photo: string | null;
}

export interface Side {
  id: "polije" | "knu";
  flag: string;
  labelKey: string;
  members: Member[];
}

export const ROLE_ORDER: RoleCode[] = ["PL", "TL", "KL", "ML"];

export const SIDES: Side[] = [
  {
    id: "polije",
    flag: "🇮🇩",
    labelKey: "team.polije",
    members: [
      { name: "Rama", legalName: null, role: "PL", bio: "Don't believe in the you that believes in me. Believe in the you that believes in yourself.", photo: null },
      { name: "Dhede", legalName: null, role: "TL", bio: "Every failure is a step closer to success.", photo: null },
      { name: "Marquez", legalName: null, role: "TL", bio: "Let's go! New project, new goal!", photo: null },
      { name: "Reno", legalName: null, role: "KL", bio: "It doesn't matter how slowly you go as long as you do not stop.", photo: null },
      { name: "Kiki", legalName: null, role: "ML", bio: "We're young, let's live in the moment!", photo: null },
    ],
  },
  {
    id: "knu",
    flag: "🇰🇷",
    labelKey: "team.knu",
    members: [
      { name: "오윤성", legalName: null, role: "PL", bio: "We are No.1, we will be the No.1!", photo: null },
      { name: "서진석", legalName: null, role: "TL", bio: "Let's light it up!", photo: null },
      { name: "이지미", legalName: null, role: "KL", bio: "Let's go towards one goal!", photo: null },
      { name: "박수현", legalName: null, role: "ML", bio: "I'm excited to learn, grow and make meaningful memories together!", photo: null },
    ],
  },
];

export const TEAM_SIZE = SIDES.reduce((n, s) => n + s.members.length, 0);
