import "./style.css";

import { detectLocale, setLocale, initLangSwitcher } from "./modules/i18n";
import { initNavigation } from "./modules/navigation";
import { initMotion } from "./modules/motion";
import {
  renderTeam,
  renderDeliverables,
  renderCodev,
  renderTensorGrid,
  renderSocial,
  renderMetrics,
} from "./modules/render";

function mount(selector: string): HTMLElement {
  const node = document.querySelector<HTMLElement>(selector);
  if (!node) throw new Error(`마운트 지점을 찾지 못했습니다: ${selector}`);
  return node;
}

async function main(): Promise<void> {
  // 번역을 먼저 올려야 조립하면서 바로 올바른 언어로 채워집니다.
  await setLocale(detectLocale());

  renderTeam(mount("#team-mount"));
  renderDeliverables(mount("#shipped-hero"), mount("#shipped-support"));
  renderCodev(mount("#codev-mount"));
  renderTensorGrid(mount("#tensor-mount"));
  renderSocial(mount("#social"), mount("#social-mount"));
  renderMetrics(mount("#metrics-mount"));


  initLangSwitcher();
  initNavigation();
  initMotion();
}

void main();
