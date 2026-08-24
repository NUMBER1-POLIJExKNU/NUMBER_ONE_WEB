/**
 * 스티키 네비 + 현재 섹션 표시.
 *
 * QR로 들어온 사람은 폰 한 손으로 훑습니다. 햄버거 메뉴를 열게 만들지 않고
 * 가로 스크롤되는 칩 줄로 두는 편이 탭 수가 적습니다.
 */

export function initNavigation(): void {
  const nav = document.querySelector<HTMLElement>(".nav");
  const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav__link")];
  if (!nav || links.length === 0) return;

  const sections = links
    .map((a) => document.querySelector<HTMLElement>(a.getAttribute("href") ?? ""))
    .filter((s): s is HTMLElement => s !== null);

  // 히어로를 벗어나면 네비에 배경을 깔아 본문 위에서 읽히게 합니다.
  const sentinel = document.querySelector(".hero");
  if (sentinel) {
    new IntersectionObserver(
      ([e]) => nav.classList.toggle("nav--solid", !e.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" },
    ).observe(sentinel);
  }

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = `#${entry.target.id}`;
        for (const link of links) {
          const on = link.getAttribute("href") === id;
          link.classList.toggle("is-current", on);
          if (on) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  for (const s of sections) spy.observe(s);
}
