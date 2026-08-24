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

export const POSTS: InstaPost[] = [
  // 예시 — 실제 값으로 바꾸고 주석을 푸세요.
  // { url: "https://www.instagram.com/p/XXXXXXXXXXX/", image: "post-01.jpg", alt: "POLIJE에서 진행한 첫 스마트팜 수업" },
];

export const HAS_SOCIAL = POSTS.length > 0 || INSTAGRAM_HANDLE.length > 0;

export const profileUrl = (): string =>
  INSTAGRAM_HANDLE ? `https://www.instagram.com/${INSTAGRAM_HANDLE}/` : "";
