/**
 * 스크롤 반응. 라이브러리 없이 Intersection Observer만 씁니다.
 *
 * prefers-reduced-motion을 켠 사람에게는 관찰자를 아예 만들지 않고
 * 처음부터 최종 상태로 둡니다 — 움직임을 줄이는 게 아니라 없앱니다.
 */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)");

function settleAll(): void {
  document.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in"));
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
    n.textContent = formatCount(Number(n.dataset.count ?? 0));
  });
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

/** 숫자가 0에서 목표까지 올라갑니다. 한 번만 실행됩니다. */
function countUp(node: HTMLElement, target: number): void {
  const DURATION = 900;
  const start = performance.now();

  function frame(now: number): void {
    const p = Math.min(1, (now - start) / DURATION);
    // ease-out cubic — 끝에서 부드럽게 멈춥니다.
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = formatCount(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export function initMotion(): void {
  if (REDUCED.matches) {
    settleAll();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        node.classList.add("is-in");

        if (node.dataset.count) {
          countUp(node, Number(node.dataset.count));
        }
        io.unobserve(node);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  document.querySelectorAll("[data-count]").forEach((n) => io.observe(n));

  // 도중에 설정을 바꾸는 사람도 있습니다.
  REDUCED.addEventListener("change", (e) => {
    if (e.matches) {
      io.disconnect();
      settleAll();
    }
  });
}
