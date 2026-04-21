# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

No build step, no package manager. It's four static files.

```bash
# open directly
open index.html

# or serve it (preferred — avoids any fetch/CORS edge cases)
python3 -m http.server 8000
# → http://localhost:8000
```

There are no tests, no linter, no typecheck. "Working" means `index.html` loads and the UI renders.

## Architecture

The app is an interactive field guide to alternative music, rendered entirely from a single data object.

**Data flow — URL hash drives state, state drives a full re-render:**

1. `data.js` defines `window.MUSIC_DATA` — eras (top-level timeline) and `subGenreFamilies` (groups of sub-genres, each tied to a `parentEra`).
2. The **URL hash is the source of truth.** Four shapes:
   - `#era` — eras list
   - `#era/<id>` — era detail
   - `#sg` — sub-genres list
   - `#sg/<id>` — sub-genre detail

   On load and on every `hashchange`, `applyHash()` parses the hash into `state` (including `state.route = "list" | "detail"`) and calls `render()`.
3. **Clicks never mutate state directly** — they call `setHash(view, id?)`, which updates `location.hash`, which fires `hashchange`, which re-enters `applyHash`. Browser back/forward and shareable URLs come for free. Preserve the indirection when adding new interactions.
4. `render()` wipes `#app` and rebuilds its `innerHTML` from `state` + `DATA` using template literals, stamping `data-route` and `data-view` on the `.app` div. `attachHandlers()` re-binds click listeners after every render.

**Mobile list/detail paradigm.** Desktop shows both nav and detail panels side-by-side regardless of route. Below 900px, CSS reads `data-route` and shows only the nav (route=list) or only the detail (route=detail). A `.back-link` (native `<a href="#era">` — no JS handler) appears only on mobile in detail mode. View tabs go to the list of that view, not the last-visited detail — tapping a top-level tab means "take me to that section's index."

There is no diffing, no virtual DOM, no framework — just full re-render per interaction. Keep it that way. The atlas is small enough that this is fine and the zero-dependency property is the point.

**Sub-genre rendering has two modes.** `renderSubGenreDetail` branches on `sg.detailed`:
- Simple mode (`renderSimpleSubGenre`) — just a list of band name pills.
- Detailed mode (`renderDetailedSubGenre`) — sections, first/second waves, offshoots, mainstream/cultural epilogue. See `goth-rock` in `data.js` for the canonical shape; the full schema is documented in the header comment of `data.js` and in the README.

Promoting a sub-genre from simple to detailed is purely a data edit: set `detailed: true` and fill in the optional fields. The renderer picks it up automatically.

## Conventions to preserve

- **No framework, no bundler, no TypeScript, no npm.** The goal is that anyone can open `index.html` and it works. Don't introduce a toolchain unless you truly have to.
- **All HTML comes from template literals in `app.js`.** Always run user-visible strings from data through the `esc()` helper — it's defense-in-depth against anything that ends up in `data.js` later.
- **Typography is fixed:** Instrument Serif (display), Inter Tight (body), JetBrains Mono (metadata). Don't add new fonts without a reason.
- **Dark mode is `prefers-color-scheme` only** — no toggle, no localStorage. If a manual override is needed, do it with a class on `<html>` and keep the palette in CSS variables under `:root` in `styles.css`.
- **Colors live in CSS variables** at the top of `styles.css`. Theme changes should flow through those, not hardcoded values in component rules.
