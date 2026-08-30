# clash-optimization

**[ryhub.dev/clash](https://ryhub.dev/clash)**

Paste your Clash of Clans data export. Get back the exact upgrade order that
finishes the game fastest.

No install, no account, no server. The export never leaves your browser.

## What it does

Supercell's export is a flat JSON blob of every building, hero, and lab level in
your village - hundreds of entries, no structure, no advice. The planner resolves
it against a bundled snapshot of the game's real upgrade data, then runs a rules
engine over the result to answer the only question that matters: *what should I
click next?*

The rules encode [CallMeTee's Strategic Rush Bible](https://www.youtube.com/@CallMeTee)
(v1.6.4), which falls out of two axioms:

- Offense beats defense
- A new capability beats a bigger version of one you already have

Output is a ranked builder queue, a Town Hall readiness check, hero and lab
priorities, and flags on anything blocking progress.

## Getting your export

In game: **Settings** → **More Settings** → **Data export** → **Copy**, then paste
it into the page. There's a sample village loaded if you just want to look around.

## Under the hood

| Path | What's in it |
| --- | --- |
| `src/parseExport.js` | Raw export → structured village model |
| `src/rush.js` | The planner - every priority rule lives here |
| `src/gamedata.json` | Generated game-data snapshot - don't hand-edit |
| `scripts/plan-smoke.mjs` | Regression assertions over fixture villages |

Game data is regenerated from the [`clash-of-clans-data`](https://www.npmjs.com/package/clash-of-clans-data)
package (`npm run gamedata`) after each balance patch, and `npm test` replays
fixture villages to catch plans that silently change.

```sh
npm install && npm run dev
```

Not affiliated with Supercell.
