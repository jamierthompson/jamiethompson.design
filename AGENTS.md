<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 7 · Tailwind CSS v4 ·
shadcn/ui (Base UI) · Biome (lint) · Prettier (format) · pnpm

Use `pnpm` for everything (`pnpm add`, `pnpm dlx shadcn@latest ...`). Never run
`npm install` or `npx` directly in this repo.

## Tailwind CSS v4

- There is NO `tailwind.config.js`. Do not create one. Configuration lives in
  `app/globals.css` via `@theme inline`.
- The stylesheet starts with `@import "tailwindcss"`, not `@tailwind base/...`.
- There is no `content` array. To safelist a class use `@source inline("...")`.
- Color values MUST be wrapped in `oklch()`. Bare triplets are v3
  syntax and silently fail.
- Adding a color token: define `--name` and `--name-foreground` under BOTH
  `:root` and `.dark`, then map them in `@theme inline` as
  `--color-name: var(--name)`. Use `@theme inline` (not plain `@theme`) for any
  value that is a `var()` differing between light and dark.
- Dark mode is class-based (`.dark` on `<html>`, set by next-themes). The
  `@custom-variant dark` line in `globals.css` makes `dark:` utilities follow it.
- Fonts are loaded with `next/font` in `app/layout.tsx` and exposed as
  `--font-geist-sans` / `--font-geist-mono`; `--font-sans` / `--font-mono` in
  `@theme inline` reference them.

## shadcn/ui

- Components are OURS, in `components/ui/`. Edit them directly. `shadcn` is a
  dev dependency for the CLI and `shadcn/tailwind.css` only.
- This project uses **Base UI**, not Radix. The composition prop is `render`,
  NOT `asChild`.
- Before writing or using a component, run `pnpm dlx shadcn@latest docs <name>`
  or use the shadcn MCP tools. Do not recall APIs from memory.
- Check whether a component exists before hand-rolling one:
  `pnpm dlx shadcn@latest search @shadcn -q "<thing>"`.
- Add components with `pnpm dlx shadcn@latest add <name>`.
- Import `cn` from `@/lib/utils` (which re-exports the `cn` package).
- Use semantic tokens (`bg-primary`, `text-muted-foreground`), never literal
  palette utilities like `bg-zinc-950 dark:bg-white`. Pair every color with
  its `-foreground` partner.
- Forms use `Field` / `FieldGroup`. Option sets use `ToggleGroup`.
  Destructive confirmations use `AlertDialog`, not `Dialog`.

## Next.js 16

- Turbopack is the default bundler. Do NOT add a custom webpack config and do
  NOT use `@tailwindcss/webpack`; this project uses `@tailwindcss/postcss`.
- `middleware.ts` is deprecated; use `app/proxy.ts`.
- `params` and `searchParams` are async; always `await` them.
- `next lint` does not exist and `next build` does not lint. Run `pnpm lint`.
- Read the version-exact docs at `node_modules/next/dist/docs/` rather than
  recalling from training data. The `next-devtools` MCP server (see
  `.mcp.json`) exposes live build/runtime errors from the dev server.

## Testing

There is no test framework yet. Do not add one without being asked.

## Before you finish

Run: `pnpm lint && pnpm format:check && pnpm build`
