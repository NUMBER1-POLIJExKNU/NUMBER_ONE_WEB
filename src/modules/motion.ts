/**
 * 스크롤 반응. 라이브러리 없이 Intersection Observer만 씁니다.
 *
 * prefers-reduced-motion을 켠 사람에게는 관찰자를 아예 만들지 않고
 * 처음부터 최종 상태로 둡니다 — 움직임을 줄이는 게 아니라 없앱니다.
 */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)");

function stopAmbientVideo(): void {
  document.querySelectorAll<HTMLVideoElement>("video[data-ambient-video]").forEach((v) => {
    v.pause();
  });
}

function initAmbientVideos(): void {
  const videos = [...document.querySelectorAll<HTMLVideoElement>("video[data-ambient-video]")];
  if (videos.length === 0) return;

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;

  // 데이터 절약 모드와 감속 설정에서는 포스터만 보여 줍니다.
  if (REDUCED.matches || connection?.saveData) {
    stopAmbientVideo();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && !REDUCED.matches) {
          void video.play().catch(() => {
            // 브라우저가 자동 재생을 막으면 포스터를 그대로 유지합니다.
          });
        } else {
          video.pause();
        }
      }
    },
    { rootMargin: "160px 0px", threshold: 0.1 },
  );

  videos.forEach((video) => observer.observe(video));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAmbientVideo();
      return;
    }

    videos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const isNearViewport = rect.bottom >= -160 && rect.top <= window.innerHeight + 160;
      if (isNearViewport && !REDUCED.matches) {
        void video.play().catch(() => {});
      }
    });
  });
}

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

/** 히어로 배경 슬라이드쇼 — 6초 간격 크로스페이드, 일시정지 버튼, 감속 설정 시 정지 */
function initHeroSlides(): void {
  const slides = [...document.querySelectorAll<HTMLImageElement>(".hero__slides img")];
  const counter = document.querySelector<HTMLElement>("#slide-now");
  const toggle = document.querySelector<HTMLButtonElement>("#slide-toggle");
  if (slides.length < 2 || !counter || !toggle) return;

  let idx = 0;
  let timer: number | null = null;

  const show = (next: number): void => {
    slides[idx].classList.remove("is-active");
    idx = (next + slides.length) % slides.length;
    slides[idx].classList.add("is-active");
    counter.textContent = String(idx + 1).padStart(2, "0");
  };
  const start = (): void => {
    if (timer !== null) return;
    timer = window.setInterval(() => show(idx + 1), 6000);
    toggle.textContent = "⏸";
  };
  const stop = (): void => {
    if (timer !== null) { clearInterval(timer); timer = null; }
    toggle.textContent = "▶";
  };

  toggle.addEventListener("click", () => (timer === null ? start() : stop()));

  if (REDUCED.matches) {
    stop();
    return;
  }
  start();
  REDUCED.addEventListener("change", (e) => { if (e.matches) stop(); });
}

/** 모바일 가로 갤러리는 화면에 들어올 때만 안내 동작을 시작하고, 사용 후에는 숨깁니다. */
function initSwipeGuides(): void {
  if (!window.matchMedia("(max-width: 40rem)").matches) return;

  const hints = [...document.querySelectorAll<HTMLElement>("[data-swipe-hint]")];
  if (hints.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const hint = entry.target as HTMLElement;
        hint.classList.add("is-active");
        observer.unobserve(hint);
      }
    },
    { threshold: 0.8 },
  );

  for (const hint of hints) {
    const track = hint.nextElementSibling;
    if (!(track instanceof HTMLElement) || !track.matches("[data-swipe-track]")) continue;

    observer.observe(hint);
    const dismiss = (): void => {
      if (Math.abs(track.scrollLeft) < 12) return;
      hint.classList.add("is-dismissed");
      track.removeEventListener("scroll", dismiss);
    };
    track.addEventListener("scroll", dismiss, { passive: true });
  }
}

export function initMotion(): void {
  initAmbientVideos();
  initHeroSlides();
  initSwipeGuides();
  if (REDUCED.matches) {
    stopAmbientVideo();
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
