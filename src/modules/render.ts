/**
 * 데이터 → DOM.
 *
 * 프레임워크 없이 문서를 조립합니다. 사용자 입력이 없는 페이지라
 * 모든 문자열은 저장소 안의 데이터/번역 파일에서만 옵니다.
 */

import { SIDES, ROLE_ORDER, type Member } from "../data/team";
import { HERO_ITEMS, SUPPORT_ITEMS, type Deliverable } from "../data/deliverables";
import { CODEV, METRICS, RETRAIN, ARCH_NODES } from "../data/evidence";
import { POSTS, HAS_SOCIAL, profileUrl } from "../data/social";
import { t, translate } from "./i18n";

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/** 번역 키를 붙여 두면 언어 전환 때 자동으로 다시 채워집니다. */
function bind(node: HTMLElement, key: string, html = false): HTMLElement {
  if (html) {
    node.dataset.i18nHtml = key;
    node.innerHTML = t(key);
  } else {
    node.dataset.i18n = key;
    node.textContent = t(key);
  }
  return node;
}

/* ---------------------------------------------------------------- 팀 */

function memberCard(m: Member): HTMLElement {
  const card = el("li", "member");

  const avatar = el("div", "member__avatar");
  if (m.photo) {
    const img = el("img");
    img.src = `/photos/${m.photo}`;
    img.alt = m.name;
    img.loading = "lazy";
    img.decoding = "async";
    avatar.append(img);
  } else {
    // 사진이 아직 없습니다. 이름 첫 글자를 픽셀 타일로 세웁니다.
    avatar.classList.add("member__avatar--placeholder");
    avatar.textContent = [...m.name][0] ?? "?";
    avatar.setAttribute("aria-hidden", "true");
  }

  const body = el("div", "member__body");
  const name = el("p", "member__name");
  name.textContent = m.name;

  const role = el("p", "member__role");
  bind(role, `team.role.${m.role}`);

  body.append(name, role);

  if (m.legalName) {
    const legal = el("p", "member__legal");
    legal.textContent = m.legalName;
    body.append(legal);
  }
  if (m.bio) {
    const bio = el("p", "member__bio");
    bio.textContent = m.bio;
    body.append(bio);
  }

  card.append(avatar, body);
  return card;
}

export function renderTeam(mount: HTMLElement): void {
  // 역할 범례 — 대칭 편성이 이 페이지의 논지라 역할을 먼저 세웁니다.
  const legend = el("ul", "rolelegend");
  for (const code of ROLE_ORDER) {
    const li = el("li", "rolelegend__item");
    const tag = el("span", "rolelegend__code");
    tag.textContent = code;
    const label = el("span", "rolelegend__label");
    bind(label, `team.role.${code}`);
    const desc = el("span", "rolelegend__desc");
    bind(desc, `team.role.${code}.desc`);
    li.append(tag, label, desc);
    legend.append(li);
  }

  const grid = el("div", "sides");
  for (const side of SIDES) {
    const col = el("section", "side");
    col.dataset.side = side.id;

    const head = el("h3", "side__head");
    const flag = el("span", "side__flag");
    flag.textContent = side.flag;
    flag.setAttribute("role", "img");
    const label = el("span");
    bind(label, side.labelKey);
    head.append(flag, label);

    const list = el("ul", "side__members");
    for (const m of side.members) list.append(memberCard(m));

    col.append(head, list);
    grid.append(col);
  }

  mount.append(legend, grid);
  translate(mount);
}

/* ---------------------------------------------------- 산출물 카드 */

function deliverableCard(d: Deliverable): HTMLElement {
  const card = el("article", `card card--${d.tier}`);

  const top = el("div", "card__top");
  const glyph = el("span", "card__glyph");
  glyph.textContent = d.glyph;
  glyph.setAttribute("aria-hidden", "true");

  const status = el("span", `card__status card__status--${d.status}`);
  bind(status, `shipped.status.${d.status}`);
  top.append(glyph, status);

  const name = el("h3", "card__name");
  bind(name, `shipped.${d.id}.name`);

  const tagline = el("p", "card__tagline");
  bind(tagline, `shipped.${d.id}.tagline`);

  const body = el("p", "card__body");
  bind(body, `shipped.${d.id}.body`, true);

  card.append(top, name, tagline, body);

  if (d.stack.length) {
    const chips = el("ul", "chips");
    for (const s of d.stack) {
      const chip = el("li", "chips__item");
      chip.textContent = s;
      chips.append(chip);
    }
    card.append(chips);
  }

  if (d.hasNote) {
    const note = el("p", "card__note");
    bind(note, `shipped.${d.id}.note`);
    card.append(note);
  }

  if (d.live || d.source) {
    const actions = el("div", "card__actions");
    if (d.live) {
      const a = el("a", "btn btn--primary");
      a.href = d.live;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      bind(a, "shipped.open");
      actions.append(a);
    }
    if (d.source) {
      const a = el("a", "btn btn--ghost");
      a.href = d.source;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      bind(a, "shipped.source");
      actions.append(a);
    }
    card.append(actions);
  }

  return card;
}

export function renderDeliverables(heroMount: HTMLElement, supportMount: HTMLElement): void {
  for (const d of HERO_ITEMS) heroMount.append(deliverableCard(d));
  for (const d of SUPPORT_ITEMS) supportMount.append(deliverableCard(d));
  translate(heroMount);
  translate(supportMount);
}

/* -------------------------------------------------- 협업 증거 */

export function renderCodev(mount: HTMLElement): void {
  for (const item of CODEV) {
    const row = el("li", `evidence evidence--${item.kind}`);

    const label = el("h3", "evidence__label");
    bind(label, item.labelKey);

    const desc = el("p", "evidence__desc");
    bind(desc, item.descKey, true);

    const proof = el("code", "evidence__proof");
    proof.textContent = item.proof;

    row.append(label, desc, proof);

    if (item.href) {
      const a = el("a", "evidence__link");
      a.href = item.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "↗";
      a.setAttribute("aria-label", item.proof);
      row.append(a);
    }
    mount.append(row);
  }
  translate(mount);
}

/* ------------------------------------------- 재학습 시각화 (시그니처) */

export function renderTensorGrid(mount: HTMLElement): void {
  const changed = new Set<number>(RETRAIN.changedIndices);
  const grid = el("div", "tensors");
  grid.setAttribute("role", "img");
  grid.setAttribute(
    "aria-label",
    `${RETRAIN.totalTensors} weight tensors, ${RETRAIN.changedTensors} changed`,
  );

  for (let i = 0; i < RETRAIN.totalTensors; i++) {
    const cell = el("span", "tensors__cell");
    if (changed.has(i)) {
      cell.classList.add("tensors__cell--changed");
      // 마지막 3개가 순차적으로 켜지도록 지연을 줍니다.
      cell.style.setProperty("--i", String(RETRAIN.changedIndices.indexOf(i)));
    }
    grid.append(cell);
  }

  const key = el("ul", "tensors__key");
  const mk = (cls: string, labelKey: string) => {
    const li = el("li");
    const swatch = el("span", `tensors__swatch ${cls}`);
    swatch.setAttribute("aria-hidden", "true");
    const label = el("span");
    bind(label, labelKey);
    li.append(swatch, label);
    return li;
  };
  key.append(
    mk("tensors__swatch--changed", "retrain.viz.changed"),
    mk("tensors__swatch--same", "retrain.viz.same"),
  );

  mount.append(grid, key);
  translate(mount);
}

/* ---------------------------------------------------- 아키텍처 */

export function renderArchitecture(mount: HTMLElement): void {
  ARCH_NODES.forEach((n, idx) => {
    const step = el("li", "arch__step");

    const name = el("p", "arch__name");
    bind(name, `arch.${n}`);

    const desc = el("p", "arch__desc");
    bind(desc, `arch.${n}d`);

    step.append(name, desc);
    mount.append(step);

    if (idx < ARCH_NODES.length - 1) {
      const arrow = el("li", "arch__arrow");
      arrow.textContent = "→";
      arrow.setAttribute("aria-hidden", "true");
      mount.append(arrow);
    }
  });
  translate(mount);
}

/* ------------------------------------------------- 인스타그램 기록 */

export function renderSocial(section: HTMLElement, mount: HTMLElement): void {
  if (!HAS_SOCIAL) {
    // 아직 게시물이 없습니다. 빈 섹션을 세워두면 심사자에게 미완성으로 보입니다.
    section.remove();
    return;
  }

  for (const post of POSTS) {
    const li = el("li", "post");

    const a = el("a", "post__link");
    a.href = post.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", post.alt);

    const img = el("img", "post__img");
    img.src = `/social/${post.image}`;
    img.alt = post.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 600;
    img.height = 600;

    const cap = el("span", "post__cap");
    bind(cap, "social.open");

    a.append(img, cap);
    li.append(a);
    mount.append(li);
  }

  const follow = section.querySelector<HTMLAnchorElement>(".post__follow");
  if (follow) {
    const url = profileUrl();
    if (url) {
      follow.href = url;
    } else {
      follow.remove();
    }
  }

  translate(mount);
}

/* ------------------------------------------------------- 숫자 */

export function renderMetrics(mount: HTMLElement): void {
  for (const m of METRICS) {
    const li = el("li", "metric");

    const value = el("span", "metric__value");
    value.dataset.count = String(m.value);
    value.textContent = "0";

    const unit = el("span", "metric__unit");
    bind(unit, m.unitKey);

    const sub = el("span", "metric__sub");
    bind(sub, m.subKey);

    li.append(value, unit, sub);
    mount.append(li);
  }
  translate(mount);
}
