/**
 * 옆쪽 섹션 내비게이션.
 *
 * 페이지가 길어서, 어디까지 읽었는지와 어디로 건너뛸지를 한곳에 둡니다.
 * 넓은 화면에서는 오른쪽 가장자리의 점 레일, 좁은 화면에서는 오른쪽 아래 '목차' 버튼입니다.
 * 히어로를 지나면 나타납니다.
 */

export function initRail(): void {
  const rail = document.querySelector<HTMLElement>("#rail");
  if (!rail) return;
  const toggle = rail.querySelector<HTMLButtonElement>(".rail__toggle");
  const links = [...rail.querySelectorAll<HTMLAnchorElement>(".rail__link:not(.rail__link--top)")];

  const setOpen = (open: boolean): void => {
    rail.classList.toggle("rail--open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    // 목록을 열면 지금 읽는 섹션이 보이는 자리로 맞춥니다.
    if (open) rail.querySelector('.rail__link[aria-current="true"]')?.scrollIntoView({ block: "nearest" });
  };

  toggle?.addEventListener("click", () => setOpen(!rail.classList.contains("rail--open")));
  rail.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest(".rail__link")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && rail.classList.contains("rail--open")) {
      setOpen(false);
      toggle?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!rail.contains(e.target as Node)) setOpen(false);
  });

  const hero = document.querySelector(".hero");
  if (hero) {
    new IntersectionObserver(([e]) => rail.classList.toggle("rail--on", !e.isIntersecting), {
      threshold: 0,
    }).observe(hero);
  } else {
    rail.classList.add("rail--on");
  }

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = `#${entry.target.id}`;
        for (const link of links) {
          if (link.getAttribute("href") === id) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  for (const link of links) {
    const section = document.querySelector(link.getAttribute("href") ?? "");
    if (section) spy.observe(section);
  }
}
