# clash-optimization

An upgrade planner for Clash of Clans. Paste your in-game village export, get the
upgrade order a strategic rush actually calls for.

Everything runs in the browser. The export JSON is kept in `localStorage` on your
device and is never uploaded - there is no server and no API key.

Extracted from the `/clash` route of [ryhub.dev](https://ryhub.dev) so it can live
on its own domain (`clash.ryhub.dev`).

## How it works

Supercell's data export is a flat JSON blob of building/hero/lab levels.
`parseExport.js` matches it against a bundled game-data snapshot, and `rush.js`
encodes [CallMeTee's Strategic Rush Bible](https://www.youtube.com/@CallMeTee)
(v1.6.4, June 2026) as rules over that parsed village.

The two axioms everything else falls out of:

- Offense > Defense
- New building / new capability > upgrading an existing one

The output is a builder queue, a Town Hall readiness check, hero and lab
priorities, and flags for anything blocking progress.

## Getting your export

In game: **Settings** (gear) → **More Settings** → under **Data export**, tap
**Copy**. Paste it into the page. There's a sample village if you just want to
look around.

## Development

```sh
npm install
npm run dev       # vite dev server
npm run build     # production build to dist/
npm run lint
npm test          # plan regression smoke test over scripts/fixtures/
```

### Refreshing game data

`src/gamedata.json` is a trimmed snapshot of the
[`clash-of-clans-data`](https://www.npmjs.com/package/clash-of-clans-data) npm
package - only the fields the planner needs. After a game update:

```sh
npm run gamedata
npm test
```

## Layout

| Path | What's in it |
| --- | --- |
| `src/parseExport.js` | Turns the raw export into a village model |
| `src/rush.js` | The planner - all the priority rules |
| `src/Clash.jsx` | Page shell, paste flow, localStorage |
| `src/Sections.jsx` | The result sections (queue, heroes, lab, defenses, …) |
| `src/gamedata.json` | Generated game-data snapshot - don't hand-edit |
| `scripts/plan-smoke.mjs` | Regression assertions over fixture villages |

Not affiliated with Supercell.
