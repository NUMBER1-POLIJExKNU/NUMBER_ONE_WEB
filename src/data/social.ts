/**
 * 인스타그램 게시물.
 *
 * 공식 임베드(embed.js)를 쓰지 않습니다. 100KB가 넘는 외부 스크립트라
 * 이 페이지의 로딩 예산을 통째로 넘기고, 발표장 회선에서 인스타 서버가 느리면
 * QR로 들어온 사람이 같이 기다리게 됩니다. 로그인 월이 뜨는 경우도 있습니다.
 *
 * 대신 정적 썸네일 + 링크아웃으로 둡니다. SNS홍보 부문은 조회수와 좋아요로
 * 심사하므로, 페이지 안에 가두는 것보다 인스타로 보내는 편이 유리합니다.
 *
 * ── 채우는 법 ──
 * 1. 인스타 게시물을 열고 URL을 복사합니다 (https://www.instagram.com/p/XXXXXXXXXXX/)
 * 2. 게시물 대표 이미지를 정사각형으로 저장해 public/social/에 넣습니다
 * 3. 아래 POSTS 배열에 한 줄씩 추가합니다
 *
 * POSTS가 비어 있으면 섹션 전체가 자동으로 숨겨집니다.
 */

export interface InstaPost {
  /** 게시물 URL */
  url: string;
  /** public/social/ 기준 파일명. 정사각형 권장 (1080×1080 → 저장은 600px면 충분) */
  image: string;
  /** 스크린리더와 이미지 실패 시 쓸 설명. 게시물 내용을 한 줄로. */
  alt: string;
}

/** 팀 공식 계정 핸들. @는 빼고 적습니다. 비우면 팔로우 버튼이 숨겨집니다. */
export const INSTAGRAM_HANDLE = "no.1_wfk";

/* 2026-08-25, @no.1_wfk 프로필에서 전체 25개.
   썸네일은 public/social/에 로컬 저장 — 인스타 CDN 링크는 서명이 만료되면 깨집니다. */
export const POSTS: InstaPost[] = [
  { url: "https://www.instagram.com/no.1_wfk/p/DbZ8X6FEVPI/", image: "DbZ8X6FEVPI.jpg", alt: "7/29 활동일지 — 현지 친구에게 배우는 인도네시아 여행 회화" },
  { url: "https://www.instagram.com/no.1_wfk/p/Dbh3c1aEU71/", image: "Dbh3c1aEU71.jpg", alt: "7/30 활동일지 — 인도네시아 호텔에서는 이것을 하면 안 된다?" },
  { url: "https://www.instagram.com/no.1_wfk/p/DbccSrNkfdE/", image: "DbccSrNkfdE.jpg", alt: "7/31 활동일지 — 이슬람에서는 고양이가?" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DcbUuQhP4Hr/", image: "DcbUuQhP4Hr.jpg", alt: "학급 단체 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/p/DcQ9MmfDzNt/", image: "DcQ9MmfDzNt.jpg", alt: "8/6 활동일지 — 지치지 않는 No.1의 여름, 3주간 우리들의 각오" },
  { url: "https://www.instagram.com/no.1_wfk/p/Db6C-pimEfD/", image: "Db6C-pimEfD.jpg", alt: "8/6 활동일지 — 인도네시아 바틱 체험" },
  { url: "https://www.instagram.com/no.1_wfk/p/Dbw4qB8Ee9w/", image: "Dbw4qB8Ee9w.jpg", alt: "8/4 활동일지 — K-Food Day 기록: 화채 & 에스부아 만들기" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbvFEECxBGp/", image: "DbvFEECxBGp.jpg", alt: "바틱 의상 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbuY_hrRJi-/", image: "DbuY_hrRJi-.jpg", alt: "오락실 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/p/Dbr8ROEkb8f/", image: "Dbr8ROEkb8f.jpg", alt: "8/3 활동일지 — 진정한 해외봉사의 시작! Opening Ceremony" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbrpYQMx6b0/", image: "DbrpYQMx6b0.jpg", alt: "해외봉사 선발 릴스" },
  { url: "https://www.instagram.com/wfk_knupolije/reel/DbnosYFSib4/", image: "DbnosYFSib4.jpg", alt: "KNU × POLIJE 문화교류 릴스" },
  { url: "https://www.instagram.com/wfk_knupolije/reel/DbngGkaOFk6/", image: "DbngGkaOFk6.jpg", alt: "레트로 필터 단체 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbmwH19R6Yk/", image: "DbmwH19R6Yk.jpg", alt: "수박 화채 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/p/Dbke-y1EXQR/", image: "Dbke-y1EXQR.jpg", alt: "No.1 팀이 궁금해?! 인도네시아 멤버 소개" },
  { url: "https://www.instagram.com/no.1_wfk/p/DbkNi2ekVOi/", image: "DbkNi2ekVOi.jpg", alt: "8/1 활동일지 — 카카오농장 어디까지 가봤니" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbhqHAHxgDm/", image: "DbhqHAHxgDm.jpg", alt: "인도네시아 친구들과 함께 하는 No.1 팀송 챌린지" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbaTS1ExPHa/", image: "DbaTS1ExPHa.jpg", alt: "인도네시아에서 닮은꼴 찾기" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbX1FsKRfUN/", image: "DbX1FsKRfUN.jpg", alt: "Where are you guys going 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbV--V6vEDe/", image: "DbV--V6vEDe.jpg", alt: "여행 갈 때 친구 유형" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbU9HPPxREg/", image: "DbU9HPPxREg.jpg", alt: "KIV 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbRuwKrv7Mk/", image: "DbRuwKrv7Mk.jpg", alt: "출국 준비 릴스" },
  { url: "https://www.instagram.com/no.1_wfk/p/DbPZ8w0Rrsa/", image: "DbPZ8w0Rrsa.jpg", alt: "인도네시아 입국 D-1" },
  { url: "https://www.instagram.com/no.1_wfk/reel/DbKv4Yox1yZ/", image: "DbKv4Yox1yZ.jpg", alt: "Pov: 해외 봉사 가기 전 우리들" },
  { url: "https://www.instagram.com/no.1_wfk/p/DbF7fLJEWYj/", image: "DbF7fLJEWYj.jpg", alt: "2026 WFK IT 봉사단 발대식" },
];
export const HAS_SOCIAL = POSTS.length > 0 || INSTAGRAM_HANDLE.length > 0;

export const profileUrl = (): string =>
  INSTAGRAM_HANDLE ? `https://www.instagram.com/${INSTAGRAM_HANDLE}/` : "";
