/**
 * 보도자료·결재용 문안 복사.
 *
 * 문단은 그대로, 개조식은 공문에 붙여 넣기 좋은 모양(❍ 제목, - 항목)으로 옮깁니다.
 * 클립보드를 쓸 수 없는 환경에서는 문안을 선택해 두어 바로 복사할 수 있게 합니다.
 */

import { t } from "./i18n";

function textFor(kind: string): string {
  const source = document.querySelector<HTMLElement>(`[data-copy-source="${kind}"]`);
  if (!source) return "";
  if (kind === "brief") {
    const items = [...source.querySelectorAll("li")].map((li) => `  - ${li.textContent?.trim() ?? ""}`);
    return [`❍ ${t("summary.title")} (${t("summary.meta")})`, `❍ ${t("summary.list.title")}`, ...items].join("\n");
  }
  return source.textContent?.trim() ?? "";
}

function announce(message: string): void {
  const status = document.querySelector<HTMLElement>("[data-copy-status]");
  if (!status) return;
  status.textContent = message;
  window.setTimeout(() => (status.textContent = ""), 3000);
}

function selectSource(kind: string): void {
  const source = document.querySelector(`[data-copy-source="${kind}"]`);
  const selection = window.getSelection();
  if (!source || !selection) return;
  const range = document.createRange();
  range.selectNodeContents(source);
  selection.removeAllRanges();
  selection.addRange(range);
}

export function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const kind = button.dataset.copy ?? "";
      try {
        await navigator.clipboard.writeText(textFor(kind));
        button.textContent = t("ui.copied");
        button.dataset.state = "done";
        announce(t("ui.copied"));
        window.setTimeout(() => {
          button.textContent = t("ui.copy");
          delete button.dataset.state;
        }, 2000);
      } catch {
        selectSource(kind);
        announce(t("ui.copyFallback"));
      }
    });
  });
}
