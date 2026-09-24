# jamiethompson.design

Personal site for Jamie Thompson.

## Stack

- Next.js (App Router, Turbopack)
- React
- TypeScript 7
- Tailwind CSS
- Biome (lint) + Prettier (format)

## Development

Node 26 is pinned in `.nvmrc`. With nvm's auto-switch hook, `cd` into the repo selects it.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (includes type checking)
- `npm run start` — serve the production build
- `npm run lint` — run Biome
- `npm run format` — format with Prettier
- `npm run format:check` — verify formatting
