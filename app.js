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
  route: "list",                // "list" | "detail" — mobile shows one at a time
  selectedEraId: DATA.eras[0].id,
  selectedSubGenreId: DATA.subGenreFamilies[0].subGenres[0].id,
  selectedOffshootId: null      // set when on an offshoot detail page
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
const findOffshoot = id => {
  for (const fam of DATA.subGenreFamilies) {
    for (const sg of fam.subGenres) {
      if (!sg.offshoots) continue;
      const off = sg.offshoots.find(o => o.id === id);
      if (off) return { offshoot: off, subGenre: sg, family: fam };
    }
  }
  return null;
};

// ═══════════════════════════════════════════════════════════
// MUSIC LINK HELPERS
//
// If a band/track has explicit spotify/appleMusic URLs we use them.
// Otherwise we fall back to a Google search restricted to the relevant
// service's domain.
//
// Why Google instead of the services' own /search URLs: on iOS, both
// open.spotify.com and music.apple.com are Universal Link domains, so
// iOS hands those URLs to the apps before the browser can navigate.
// The apps' Universal Link handlers don't parse /search/<query> URLs,
// so they just open to the home screen. Google search isn't a Universal
// Link domain, so the results page renders normally — and the result
// URLs ARE deep links (/track/<id>, /artist/<id>), which the apps DO
// honor correctly when tapped.
// ═══════════════════════════════════════════════════════════

const spotifySearchUrl    = q => `https://www.google.com/search?q=${encodeURIComponent(q + " site:open.spotify.com")}`;
const appleMusicSearchUrl = q => `https://www.google.com/search?q=${encodeURIComponent(q + " site:music.apple.com")}`;

function bandSpotify(band)    { return band.spotify    || spotifySearchUrl(band.name); }
function bandApple(band)      { return band.appleMusic || appleMusicSearchUrl(band.name); }
function trackSpotify(track)  { return track.spotify    || spotifySearchUrl(`${track.artist} ${track.title}`); }
function trackApple(track)    { return track.appleMusic || appleMusicSearchUrl(`${track.artist} ${track.title}`); }

// Inline SVG icons — small, monochrome, recolored via currentColor.
const SPOTIFY_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.7.7 0 0 1-1 .25c-2.6-1.6-5.9-1.95-9.7-1.05a.7.7 0 0 1-.3-1.4c4.2-1 7.85-.6 10.75 1.2a.7.7 0 0 1 .25 1Zm1.25-2.85a.85.85 0 0 1-1.2.3c-3-1.85-7.55-2.4-11.1-1.3a.85.85 0 0 1-.5-1.65c4.05-1.25 9.05-.65 12.5 1.45a.85.85 0 0 1 .3 1.2Zm.1-2.95C14.4 8.5 8.95 8.3 5.7 9.3A1 1 0 1 1 5.1 7.4c3.75-1.15 9.8-.9 13.7 1.4a1 1 0 1 1-1 1.8Z"/></svg>`;
const APPLE_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M16.5 0c.05 1.2-.45 2.4-1.2 3.25-.8.9-2.05 1.6-3.2 1.5-.1-1.15.5-2.35 1.2-3.1C14.15.7 15.4.05 16.5 0Zm3.95 17.4c-.55 1.25-.8 1.8-1.5 2.9-1 1.55-2.4 3.5-4.15 3.5-1.55.05-1.95-1-4.05-1-2.1.05-2.55 1.05-4.1 1-1.75-.05-3.05-1.85-4.05-3.4C-.55 17.05-.85 11.6 1.95 8.65c1.5-1.55 3.6-2.55 5.65-2.55 1.65 0 2.7 1 4.05 1 1.3 0 2.1-1 4-1 1.85-.05 3.8.95 5.05 2.6-4.45 2.4-3.7 8.65.75 8.7Z"/></svg>`;

function renderBandLinks(band) {
  return `
    <span class="music-links">
      <a class="music-link spotify" href="${esc(bandSpotify(band))}" target="_blank" rel="noopener noreferrer" aria-label="Listen to ${esc(band.name)} on Spotify" title="Spotify">${SPOTIFY_ICON}</a>
      <a class="music-link apple" href="${esc(bandApple(band))}" target="_blank" rel="noopener noreferrer" aria-label="Listen to ${esc(band.name)} on Apple Music" title="Apple Music">${APPLE_ICON}</a>
    </span>
  `;
}

function renderSignatureTrack(track) {
  if (!track) return "";
  return `
    <aside class="signature-track">
      <span class="signature-label">Signature track</span>
      <div class="signature-body">
        <span class="signature-title">${esc(track.title)}</span>
        <span class="signature-artist">${esc(track.artist)}</span>
        <span class="music-links">
          <a class="music-link spotify" href="${esc(trackSpotify(track))}" target="_blank" rel="noopener noreferrer" aria-label="Play ${esc(track.title)} on Spotify" title="Spotify">${SPOTIFY_ICON}</a>
          <a class="music-link apple" href="${esc(trackApple(track))}" target="_blank" rel="noopener noreferrer" aria-label="Play ${esc(track.title)} on Apple Music" title="Apple Music">${APPLE_ICON}</a>
        </span>
      </div>
    </aside>
  `;
}

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="app" data-route="${state.route}" data-view="${state.view}">
      ${renderHeader()}
      <main class="main">
        ${renderNav()}
        ${renderDetail()}
      </main>
      ${renderFooter()}
    </div>
  `;
  attachHandlers();
  window.scrollTo(0, 0);
}

// Shown only on mobile when viewing a detail; returns to the appropriate list.
// Native <a href="#..."> — the browser changes location.hash, hashchange
// fires, applyHash re-renders as the list. Offshoot detail goes back to its
// parent sub-genre rather than the sub-genre list.
function renderBackLink() {
  if (state.view === "eras") {
    return `<a class="back-link" href="#era">← All eras</a>`;
  }
  if (state.selectedOffshootId) {
    const hit = findOffshoot(state.selectedOffshootId);
    if (hit) {
      return `<a class="back-link" href="#sg/${encodeURIComponent(hit.subGenre.id)}">← ${esc(hit.subGenre.name)}</a>`;
    }
  }
  return `<a class="back-link" href="#sg">← All sub-genres</a>`;
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
  // When on an offshoot detail page, the parent sub-genre stays "active"
  // in the nav so the user can see where they are in the tree.
  const activeSgId = state.selectedOffshootId
    ? (findOffshoot(state.selectedOffshootId)?.subGenre.id ?? state.selectedSubGenreId)
    : state.selectedSubGenreId;

  return `
    <aside class="nav" role="tablist">
      ${DATA.subGenreFamilies.map(fam => `
        <div class="nav-family-label">${esc(fam.name)} · ${esc(fam.dates)}</div>
        ${fam.subGenres.map(sg => `
          <button class="nav-item ${sg.id === activeSgId ? "active" : ""}"
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
  if (state.selectedOffshootId) return renderOffshootDetail();
  return renderSubGenreDetail();
}

function renderEraDetail() {
  const era = findEra(state.selectedEraId);
  if (!era) return `<section class="detail"></section>`;

  return `
    <section class="detail" role="tabpanel">
      ${renderBackLink()}
      <span class="detail-numeral">${esc(era.number)}</span>
      <header class="detail-header">
        <div class="detail-meta">
          <span class="detail-dates">${esc(era.dates)}</span>
          ${era.isOrigin ? `<span class="badge">${esc(era.originNote || "Origin")}</span>` : ""}
        </div>
        <h2 class="detail-name">${esc(era.name)}</h2>
        <p class="detail-summary">${esc(era.summary)}</p>
        ${renderSignatureTrack(era.signatureTrack)}
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
        ${renderBandLinks(band)}
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
      ${renderBackLink()}
      <span class="detail-numeral">${esc(familyInitial)}</span>
      <header class="detail-header">
        <div class="detail-meta">
          <span class="detail-dates">${esc(sg.origin)}</span>
          <span class="detail-dates" style="color: var(--accent)">${esc(family.name)}</span>
          ${sg.detailed ? `<span class="badge">Deep dive</span>` : ""}
        </div>
        <h2 class="detail-name">${esc(sg.name)}</h2>
        <p class="detail-summary">${esc(sg.summary)}</p>
        ${renderSignatureTrack(sg.signatureTrack)}
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
          <button class="offshoot offshoot-link" data-off-id="${esc(o.id)}">
            <h4 class="offshoot-name">${esc(o.name)}</h4>
            <p class="offshoot-desc">${esc(o.desc)}</p>
            <p class="offshoot-bands">${(o.bands || []).map(esc).join(" · ")}</p>
            <span class="offshoot-cta">Open →</span>
          </button>
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
            ${renderBandLinks(b)}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderOffshootDetail() {
  const hit = findOffshoot(state.selectedOffshootId);
  if (!hit) return `<section class="detail"></section>`;
  const { offshoot: off, subGenre: sg, family } = hit;

  const initial = off.name.charAt(0);

  return `
    <section class="detail" role="tabpanel">
      ${renderBackLink()}
      <span class="detail-numeral">${esc(initial)}</span>
      <header class="detail-header">
        <div class="detail-meta">
          <a class="detail-dates detail-link" href="#sg/${encodeURIComponent(sg.id)}">${esc(sg.name)}</a>
          <span class="detail-dates" style="color: var(--accent)">${esc(family.name)}</span>
          <span class="badge">Offshoot</span>
        </div>
        <h2 class="detail-name">${esc(off.name)}</h2>
        <p class="detail-summary">${esc(off.desc)}</p>
        ${renderSignatureTrack(off.signatureTrack)}
      </header>

      <h3 class="section-label">Defining bands</h3>
      <div class="sg-simple-bands">
        ${(off.bands || []).map(b => `<span class="sg-band-pill">${esc(b)}</span>`).join("")}
      </div>

      <p class="offshoot-back-note">
        Branched off from <a class="detail-link" href="#sg/${encodeURIComponent(sg.id)}">${esc(sg.name)}</a>.
      </p>
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
// ROUTING — the URL hash is the source of truth
//
//   #era          → eras list
//   #era/<id>     → era detail
//   #sg           → sub-genres list
//   #sg/<id>      → sub-genre detail
//   #off/<id>     → offshoot detail (sub-sub-genre)
//
// Clicks don't mutate state directly; they write the hash, and
// the hashchange listener re-reads it into state and renders.
// Browser back/forward and shareable URLs come for free.
// ═══════════════════════════════════════════════════════════

function setHash(view, id) {
  const prefix = view === "eras" ? "era" : view === "offshoot" ? "off" : "sg";
  location.hash = id ? `${prefix}/${encodeURIComponent(id)}` : prefix;
}

function applyHash() {
  const [prefix, ...rest] = location.hash.replace(/^#/, "").split("/");
  const id = decodeURIComponent(rest.join("/"));

  // Offshoot is always a detail view that lives under the sub-genres tab.
  if (prefix === "off" && id) {
    const hit = findOffshoot(id);
    if (hit) {
      state.view = "subgenres";
      state.selectedOffshootId = id;
      state.selectedSubGenreId = hit.subGenre.id;
      state.route = "detail";
      render();
      return;
    }
    // unknown offshoot → fall through to the sub-genres list
    history.replaceState(null, "", location.pathname + location.search + "#sg");
    state.view = "subgenres";
    state.selectedOffshootId = null;
    state.route = "list";
    render();
    return;
  }

  const view = prefix === "era" ? "eras" : prefix === "sg" ? "subgenres" : null;

  if (view) {
    state.view = view;
    state.selectedOffshootId = null;
    if (id) {
      const found = view === "eras" ? findEra(id) : findSubGenre(id);
      if (found) {
        if (view === "eras") state.selectedEraId = id;
        else state.selectedSubGenreId = id;
        state.route = "detail";
      } else {
        state.route = "list";  // id not found — just show the list
      }
    } else {
      state.route = "list";
    }
  } else {
    // empty hash → stay clean; unknown hash → quietly scrub it (no history entry)
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    state.selectedOffshootId = null;
    state.route = "list";
  }
  render();
}

// ═══════════════════════════════════════════════════════════
// EVENT HANDLERS
// ═══════════════════════════════════════════════════════════

function attachHandlers() {
  // View tabs go to the list of that view (not the last-selected detail) —
  // tapping a top-level tab means "take me to that section's index."
  document.querySelectorAll(".view-tab").forEach(el => {
    el.addEventListener("click", () => setHash(el.dataset.view));
  });

  document.querySelectorAll(".nav-item[data-era-id]").forEach(el => {
    el.addEventListener("click", () => setHash("eras", el.dataset.eraId));
  });

  document.querySelectorAll(".nav-item[data-sg-id]").forEach(el => {
    el.addEventListener("click", () => setHash("subgenres", el.dataset.sgId));
  });

  document.querySelectorAll("[data-off-id]").forEach(el => {
    el.addEventListener("click", () => setHash("offshoot", el.dataset.offId));
  });

  // Music links are anchors with target="_blank" — let the browser handle.
  // Stop the click from bubbling to the offshoot button so the link wins.
  document.querySelectorAll(".music-link").forEach(el => {
    el.addEventListener("click", e => e.stopPropagation());
  });
}

// ═══════════════════════════════════════════════════════════
// GO
// ═══════════════════════════════════════════════════════════

window.addEventListener("hashchange", applyHash);
applyHash();
