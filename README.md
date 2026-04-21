# Alternative Music Atlas

An interactive, data-driven field guide to alternative music — from the Velvet Underground's proto-alt roots through punk, post-punk, college rock, the 1991 breakthrough, and the branching sub-genres of today.

## Run it

It's four static files. No build step, no npm install.

```bash
# just open it
open index.html

# or serve it (avoids any future fetch() edge cases)
python3 -m http.server 8000
# → http://localhost:8000
```

## Project structure

```
alternative-music-atlas/
├── index.html      ← entry point, loads everything
├── styles.css      ← all styles (cream paper, oxblood accent, dark mode)
├── data.js         ← the music data (JSON-shaped, edit this to extend)
└── app.js          ← rendering and state (vanilla JS, no framework)
```

Everything is driven by `data.js`. Change the data, reload the page, the UI updates.

## Data schema

### Eras

The main timeline — seven entries today (proto-alt through present).

```js
{
  id: "college-rock",
  number: "04",
  name: "College rock",
  dates: "1980–1989",
  summary: "One-sentence tagline shown under the title.",
  narrative: "Paragraph of body copy.",
  isOrigin: true,                    // optional: shows the red badge
  originNote: "First alt scene",     // text for the badge
  keyBands: [ /* see below */ ]
}
```

### Bands (inside eras)

```js
{
  name: "R.E.M.",
  years: "1980–2011",
  location: "Athens, GA",
  isTouchstone: true,                // optional: red ★ prefix
  note: "One or two sentences."
}
```

### Sub-genre families

Groups of related sub-genres tied to a parent era.

```js
{
  id: "post-punk-family",
  name: "Post-punk family",
  dates: "1978–1985",
  parentEra: "post-punk",            // id of a parent era
  summary: "Tagline.",
  subGenres: [ /* see below */ ]
}
```

### Sub-genres (simple)

```js
{
  id: "new-wave",
  name: "New wave",
  origin: "UK / US, 1978–1984",
  summary: "One-sentence description.",
  bands: ["Talking Heads", "Blondie", "Devo"]
}
```

### Sub-genres (detailed)

Set `detailed: true` to unlock the deep-dive layout with sections, waves, offshoots, and an epilogue. See `goth-rock` in `data.js` for the full example.

```js
{
  id: "goth-rock",
  name: "Goth rock",
  origin: "UK, 1979–",
  summary: "...",
  detailed: true,
  sections: [
    { heading: "The origin moment", text: "..." },
    { heading: "The sound", text: "..." }
  ],
  firstWave: {
    title: "First wave",
    bands: [{ name: "Bauhaus", note: "The ignition point." }]
  },
  secondWave: {
    title: "Second wave — the Batcave era",
    context: "Italicized intro paragraph under the title.",
    bands: [/* ... */]
  },
  offshoots: [
    { name: "Deathrock", desc: "...", bands: ["Christian Death", "45 Grave"] }
  ],
  mainstream: "Paragraph about crossover.",
  culturalNote: "Paragraph about longevity/legacy."
}
```

## Continuing with Claude Code

Common next steps you might want to ask Claude Code to do:

- **Promote more sub-genres to detailed.** Pick any sub-genre with `detailed: false` (or missing) and have Claude Code expand it in the same shape as goth rock. The renderer will automatically show the full layout.
- **Add a band-detail view.** Right now clicking a band just shows its inline note. You could lift bands into their own top-level array with their own detail pages, and wire up a third view tab.
- **Add filtering or search.** A small input above the nav that filters by name or by decade.
- **Add a genealogy view.** Reuse the SVG tree structure from the original conversation as a third view mode — pan/zoom, click a node to jump to its detail.
- **Persist selection in the URL.** Read/write `location.hash` so the view and selected item can be linked.
- **Swap paper cream for something different.** All colors live in `:root` in `styles.css` — change the four or five CSS variables and the whole aesthetic shifts.

### Style / convention notes for Claude Code

- The app deliberately uses no framework, no bundler, no TypeScript — keep it that way unless you really need otherwise. The goal is that anyone can open `index.html` and have it work.
- All HTML is rendered via template literals in `app.js`. The `esc()` helper exists for defense-in-depth; keep using it on any string that originates from data.
- Typography: Instrument Serif (display), Inter Tight (body), JetBrains Mono (metadata). Don't mix in other fonts without a reason.
- Dark mode is handled purely via `prefers-color-scheme`. No toggle, no localStorage — if you add a manual override, do it with a class on `<html>` and keep the palette in CSS variables.

## License

MIT — do whatever you want with it.
