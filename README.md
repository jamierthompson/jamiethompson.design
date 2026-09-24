# jamiethompson.design

Personal site for Jamie Thompson.

## Stack

- Next.js (App Router, Turbopack)
- React
- TypeScript 7
- Tailwind CSS v4 (CSS-first theme in `app/globals.css`)
- shadcn/ui on Base UI (components in `components/ui/`, config in `components.json`)
- next-themes for class-based dark mode
- Biome (lint) + Prettier (format)
- pnpm

## Development

Node 26 is pinned in `.nvmrc`. With nvm's auto-switch hook, `cd` into the repo selects it.
pnpm is pinned via the `packageManager` field in `package.json`.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Theming

Design tokens live in `app/globals.css`. Raw values are plain CSS variables on
`:root` (light) and `.dark`, and are mapped into Tailwind's namespaces in the
`@theme inline` block, which generates utilities such as `bg-background`,
`text-muted-foreground` and `rounded-lg`. Dark mode is toggled by adding the
`dark` class to `<html>`, which `next-themes` manages. The `SchemeToggle`
component (`components/scheme-toggle.tsx`) offers Light / Dark / Auto, where Auto
follows the OS and is the default. Corner radii all derive from the single
`--radius` token. Fonts (Geist, Geist Mono) are loaded with `next/font` in
`app/layout.tsx` and exposed as `--font-geist-sans` / `--font-geist-mono`.

## shadcn/ui

Components are copied into `components/ui/` and owned by this repo.

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest docs button
```

## Agent tooling

- `AGENTS.md` holds project conventions for coding agents.
- `.mcp.json` registers the shadcn MCP server (browse/add components) and
  `next-devtools` (live errors and routes from the dev server).
- `.claude/skills/` holds the official shadcn skills (`shadcn`,
  `migrate-radix-to-base`), installed with `pnpm dlx skills add shadcn/ui` and
  tracked in `skills-lock.json`. Do not edit them by hand.
- `.claude/launch.json` tells Claude Code how to start the dev server for previews.

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build (includes type checking)
- `pnpm start` — serve the production build
- `pnpm lint` — run Biome
- `pnpm format` — format with Prettier
- `pnpm format:check` — verify formatting
