// ─────────────────────────────────────────────────────────────
// app.js — rendering and state for the Alternative Music Atlas
//
// Architecture:
//   - Single state object (view + selected IDs)
//   - render() rebuilds the DOM from state on every change
//   - All content comes from window.MUSIC_DATA (see data.js)
//
// No framework, no build step. Open index.html and it runs.
// ─────────────────────────────────────────────────────────────

const DATA = window.MUSIC_DATA;

const state = {
  view: "eras",                 // "eras" | "subgenres"
  selectedEraId: DATA.eras[0].id,
  selectedSubGenreId: DATA.subGenreFamilies[0].subGenres[0].id
};

// ─── tiny helper: escape user-facing strings just in case ───
const esc = s => String(s ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

// ─── lookups ───
const findEra       = id => DATA.eras.find(e => e.id === id);
const findSubGenre  = id => {
  for (const fam of DATA.subGenreFamilies) {
    const sg = fam.subGenres.find(s => s.id === id);
    if (sg) return { subGenre: sg, family: fam };
  }
  return null;
};

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="app">
      ${renderHeader()}
      <main class="main">
        ${renderNav()}
        ${renderDetail()}
      </main>
      ${renderFooter()}
    </div>
  `;
  attachHandlers();
}

// ─── header ───

// italicize the "native" half of "Alternative" for the display title.
// kept as a separate helper so it's obvious this one returns HTML intentionally.
function renderHeaderTitle() {
  const t = DATA.meta.title;
  if (t === "Alternative") return `Alter<em>native</em>`;
  return esc(t);
}

function renderHeader() {
  return `
    <header class="header">
      <div class="brand">
        <h1 class="title">${renderHeaderTitle()}</h1>
        <p class="subtitle">${esc(DATA.meta.subtitle)}</p>
      </div>
      <nav class="view-tabs" role="tablist">
        <button class="view-tab ${state.view === "eras" ? "active" : ""}"
                data-view="eras" role="tab">Eras</button>
        <button class="view-tab ${state.view === "subgenres" ? "active" : ""}"
                data-view="subgenres" role="tab">Sub-genres</button>
      </nav>
    </header>
  `;
}

// ─── navigation sidebar ───

function renderNav() {
  if (state.view === "eras") return renderEraNav();
  return renderSubGenreNav();
}

function renderEraNav() {
  return `
    <aside class="nav" role="tablist">
      ${DATA.eras.map(era => `
        <button class="nav-item ${era.id === state.selectedEraId ? "active" : ""}"
                data-era-id="${esc(era.id)}">
          <div class="nav-item-number">${esc(era.number)} · Era</div>
          <div class="nav-item-name">${esc(era.name)}</div>
          <div class="nav-item-dates">${esc(era.dates)}</div>
        </button>
      `).join("")}
    </aside>
  `;
}

function renderSubGenreNav() {
  return `
    <aside class="nav" role="tablist">
      ${DATA.subGenreFamilies.map(fam => `
        <div class="nav-family-label">${esc(fam.name)} · ${esc(fam.dates)}</div>
        ${fam.subGenres.map(sg => `
          <button class="nav-item ${sg.id === state.selectedSubGenreId ? "active" : ""}"
                  data-sg-id="${esc(sg.id)}">
            <div class="nav-item-name">${esc(sg.name)}</div>
            <div class="nav-item-dates">${esc(sg.origin)}</div>
          </button>
        `).join("")}
      `).join("")}
    </aside>
  `;
}

// ─── detail panel ───

function renderDetail() {
  if (state.view === "eras") return renderEraDetail();
  return renderSubGenreDetail();
}

function renderEraDetail() {
  const era = findEra(state.selectedEraId);
  if (!era) return `<section class="detail"></section>`;

  return `
    <section class="detail" role="tabpanel">
      <span class="detail-numeral">${esc(era.number)}</span>
      <header class="detail-header">
        <div class="detail-meta">
          <span class="detail-dates">${esc(era.dates)}</span>
          ${era.isOrigin ? `<span class="badge">${esc(era.originNote || "Origin")}</span>` : ""}
        </div>
        <h2 class="detail-name">${esc(era.name)}</h2>
        <p class="detail-summary">${esc(era.summary)}</p>
      </header>

      <p class="detail-narrative">${esc(era.narrative)}</p>

      <h3 class="section-label">Key bands</h3>
      <div class="bands">
        ${era.keyBands.map(band => renderBand(band)).join("")}
      </div>
    </section>
  `;
}

function renderBand(band) {
  return `
    <article class="band">
      <header class="band-header">
        <h4 class="band-name ${band.isTouchstone ? "touchstone" : ""}">${esc(band.name)}</h4>
        ${band.years ? `<span class="band-years">${esc(band.years)}</span>` : ""}
        ${band.location ? `<span class="band-location">${esc(band.location)}</span>` : ""}
      </header>
      ${band.note ? `<p class="band-note">${esc(band.note)}</p>` : ""}
    </article>
  `;
}

function renderSubGenreDetail() {
  const hit = findSubGenre(state.selectedSubGenreId);
  if (!hit) return `<section class="detail"></section>`;
  const { subGenre: sg, family } = hit;

  const familyInitial = family.name.charAt(0);

  return `
    <section class="detail" role="tabpanel">
      <span class="detail-numeral">${esc(familyInitial)}</span>
      <header class="detail-header">
        <div class="detail-meta">
          <span class="detail-dates">${esc(sg.origin)}</span>
          <span class="detail-dates" style="color: var(--accent)">${esc(family.name)}</span>
          ${sg.detailed ? `<span class="badge">Deep dive</span>` : ""}
        </div>
        <h2 class="detail-name">${esc(sg.name)}</h2>
        <p class="detail-summary">${esc(sg.summary)}</p>
      </header>

      ${sg.detailed ? renderDetailedSubGenre(sg) : renderSimpleSubGenre(sg)}
    </section>
  `;
}

function renderSimpleSubGenre(sg) {
  return `
    <h3 class="section-label">Key bands</h3>
    <div class="sg-simple-bands">
      ${(sg.bands || []).map(b => `<span class="sg-band-pill">${esc(b)}</span>`).join("")}
    </div>
  `;
}

function renderDetailedSubGenre(sg) {
  return `
    ${(sg.sections || []).map(s => `
      <section class="sg-section">
        <h3 class="sg-section-heading">${esc(s.heading)}</h3>
        <p class="sg-section-text">${esc(s.text)}</p>
      </section>
    `).join("")}

    ${sg.firstWave ? renderWave(sg.firstWave) : ""}
    ${sg.secondWave ? renderWave(sg.secondWave) : ""}

    ${sg.offshoots ? `
      <h3 class="section-label">Offshoots</h3>
      <div class="offshoots">
        ${sg.offshoots.map(o => `
          <div class="offshoot">
            <h4 class="offshoot-name">${esc(o.name)}</h4>
            <p class="offshoot-desc">${esc(o.desc)}</p>
            <p class="offshoot-bands">${(o.bands || []).map(esc).join(" · ")}</p>
          </div>
        `).join("")}
      </div>
    ` : ""}

    ${(sg.mainstream || sg.culturalNote) ? `
      <div class="epilogue">
        ${sg.mainstream ? `
          <span class="epilogue-label">Mainstream crossover</span>
          <p class="epilogue-text">${esc(sg.mainstream)}</p>
        ` : ""}
        ${sg.culturalNote ? `
          <span class="epilogue-label" style="margin-top: 1.25rem">Why it lasted</span>
          <p class="epilogue-text">${esc(sg.culturalNote)}</p>
        ` : ""}
      </div>
    ` : ""}
  `;
}

function renderWave(wave) {
  return `
    <section class="wave">
      <h3 class="wave-title">${esc(wave.title)}</h3>
      ${wave.context ? `<p class="wave-context">${esc(wave.context)}</p>` : ""}
      <div class="wave-bands">
        ${(wave.bands || []).map(b => `
          <div class="wave-band">
            <span class="wave-band-name">${esc(b.name)}</span>
            <span class="wave-band-note">${esc(b.note || "")}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

// ─── footer ───

function renderFooter() {
  return `
    <footer class="footer">
      <span>${esc(DATA.meta.credit)}</span>
      <span>Atlas · v0.1</span>
    </footer>
  `;
}

// ═══════════════════════════════════════════════════════════
// EVENT HANDLERS
// ═══════════════════════════════════════════════════════════

function attachHandlers() {
  document.querySelectorAll(".view-tab").forEach(el => {
    el.addEventListener("click", () => {
      state.view = el.dataset.view;
      render();
    });
  });

  document.querySelectorAll(".nav-item[data-era-id]").forEach(el => {
    el.addEventListener("click", () => {
      state.selectedEraId = el.dataset.eraId;
      render();
    });
  });

  document.querySelectorAll(".nav-item[data-sg-id]").forEach(el => {
    el.addEventListener("click", () => {
      state.selectedSubGenreId = el.dataset.sgId;
      render();
    });
  });
}

// ═══════════════════════════════════════════════════════════
// GO
// ═══════════════════════════════════════════════════════════

render();
