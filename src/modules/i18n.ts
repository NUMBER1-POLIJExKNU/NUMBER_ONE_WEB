/**
 * 3개국어 전환.
 *
 * 번역 파일은 동적 import라 선택된 언어 하나만 네트워크를 탑니다.
 * 한국어 픽셀 폰트(Galmuri)는 무겁기 때문에 `lang` 속성으로만 걸고,
 * CSS의 :lang(ko) 규칙이 알아서 적용합니다.
 */

export const LOCALES = ["ko", "en", "id"] as const;
export type Locale = (typeof LOCALES)[number];

const STORAGE_KEY = "numberone.lang";
const DEFAULT: Locale = "ko";

type Dict = Record<string, string>;

const loaders: Record<Locale, () => Promise<{ default: Dict }>> = {
  ko: () => import("../i18n/ko.json"),
  en: () => import("../i18n/en.json"),
  id: () => import("../i18n/id.json"),
};

let dict: Dict = {};
let current: Locale = DEFAULT;

function isLocale(v: string | null | undefined): v is Locale {
  return v != null && (LOCALES as readonly string[]).includes(v);
}

/** 저장값 → URL 파라미터 → 브라우저 언어 → 기본값 순으로 결정 */
export function detectLocale(): Locale {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (isLocale(fromUrl)) return fromUrl;

  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // 사생활 보호 모드 등에서 접근이 막힐 수 있습니다. 무시하고 진행합니다.
  }
  if (isLocale(stored)) return stored;

  const nav = navigator.language.slice(0, 2).toLowerCase();
  if (isLocale(nav)) return nav;
  return DEFAULT;
}

export function t(key: string): string {
  return dict[key] ?? key;
}

export function getLocale(): Locale {
  return current;
}

function applyTo(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  // 강조(<strong>, <code>)가 들어가는 문장만 HTML로 주입합니다.
  // 값은 전부 저장소 안의 번역 파일에서 오므로 외부 입력이 섞이지 않습니다.
  root.querySelectorAll<HTMLElement>("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (key) el.innerHTML = t(key);
  });

  root.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((el) => {
    // 형식: "attr:key, attr:key"
    for (const pair of (el.dataset.i18nAttr ?? "").split(",")) {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    }
  });
}

export async function setLocale(next: Locale): Promise<void> {
  const mod = await loaders[next]();
  dict = mod.default;
  current = next;

  document.documentElement.lang = next;
  document.title = t("meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", t("meta.description"));

  applyTo(document);

  document.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
    const on = btn.dataset.lang === next;
    btn.setAttribute("aria-pressed", String(on));
  });

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // 저장 실패는 치명적이지 않습니다. 이번 방문에만 적용됩니다.
  }
}

/** 동적으로 만든 노드에 현재 번역을 입힐 때 사용 */
export function translate(root: ParentNode): void {
  applyTo(root);
}

export function initLangSwitcher(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.lang;
      if (isLocale(next)) void setLocale(next);
    });
  });
}
