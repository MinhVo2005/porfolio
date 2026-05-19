<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project: Terminal Portfolio

An interactive, terminal-style developer portfolio built with Next.js. Users navigate the portfolio by typing commands (e.g. `about`, `projects`, `open <name>`) or clicking the sidebar. All portfolio data comes from a PostgreSQL database via Prisma.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Runtime | React 19 with React Compiler enabled |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` |
| State | Zustand 5 with `persist` middleware |
| Database | PostgreSQL 16 (Docker) |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Package manager | Bun (primary), npm (fallback) |
| Font | IBM Plex Mono (via `next/font/google`) |
| ASCII art | `figlet` (banner generation) |
| Script runner | `tsx` (for seed scripts) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Root client component — layout, keyboard, state
│   ├── layout.tsx        # Font loading, metadata
│   ├── globals.css       # Tailwind import + theme variables + utility classes
│   └── api/route.ts      # GET /api — returns full PortfolioData JSON
│
├── components/
│   ├── cards/            # One card per command output (CardAbout, CardProjects, …)
│   │   ├── CardFor.tsx   # Command dispatcher — maps command strings → card JSX
│   │   └── index.ts      # Barrel export for all cards
│   ├── layout/           # TitleBar, Sidebar, Terminal, Banner
│   └── ui/               # Primitives: Panel, Prompt, SectionLabel
│
├── lib/
│   ├── useCommands.ts    # Hook wrapping CardFor in a useCallback
│   ├── useTerminal.ts    # Terminal history state and logic
│   ├── useKeyboard.ts    # Global keyboard event handler
│   ├── useKeybinds.ts    # Subscribes to keybindStore
│   ├── useTheme.ts       # Applies theme to <html data-theme>
│   ├── keybinds.ts       # Keybind definitions and KEYBIND_ACTIONS constant
│   ├── sections.ts       # SECTIONS array (id, label, icon, number)
│   ├── constants.ts      # CMD_LIST — all valid command strings
│   ├── db.ts             # Prisma singleton client
│   └── utils.ts          # parseText, formatPeriod, deriveHostname, etc.
│
├── store/
│   ├── themeStore.ts     # theme: "default" | "nord" | "classic"
│   ├── keybindStore.ts   # Customizable keybinds with conflict detection
│   └── userStore.ts      # Fetches /api → transforms → stores PortfolioData
│
├── types/index.ts        # PortfolioData, SectionId, HistoryEntry, SkillGroup, …
│
├── repositories/         # One file per domain (user, project, skill, …)
├── service/              # userService.ts — business logic
└── controllers/          # userController.ts — HTTP handler
```

---

## Architecture

Data flows in one direction:

```
PostgreSQL → Prisma → Repository → Service → Controller → GET /api
                                                               ↓
                                                         userStore.fetchUser()
                                                               ↓
                                                         PortfolioData
                                                               ↓
                                              CardFor(cmd, user, …) → ReactNode
```

`CardFor.tsx` is the command router. It is a plain function (not a React component rendered with JSX) that takes a raw command string and returns `{ title, card: ReactNode } | null`. It lives in `components/cards/` because it returns JSX and requires `.tsx`.

`useCommands.ts` is the only hook that calls `CardFor`. It wraps it in `useCallback` and guards against null user state. This file is pure `.ts` with no JSX.

---

## Theming

Three themes defined entirely in CSS custom properties inside `globals.css`:

- `default` — dark background, teal accent
- `nord` — blue-toned dark, cyan accent
- `classic` — pure black terminal

Applied via `data-theme` attribute on `<html>`. Switched at runtime through `themeStore` + `useTheme` hook. Persisted to `localStorage`.

Color token conventions used throughout Tailwind classes:

| Token | Meaning |
|---|---|
| `text-fg` | Primary foreground |
| `text-dim` | Subdued text |
| `text-muted` | Disabled / secondary |
| `text-accent` | Primary accent (teal/cyan) |
| `text-amber` | Links, interactive elements |
| `text-magenta` | Categories, keywords |
| `text-blue` | URLs, external links |
| `text-red` / `text-green` | Error / success states |
| `c-red`, `c-green` | Utility classes for inline terminal coloring |

---

## Code Style

- **Components**: PascalCase filename and export. `"use client"` only when needed.
- **Hooks**: `use` prefix, camelCase, live in `src/lib/`.
- **Stores**: camelCase + `Store` suffix, co-located in `src/store/`.
- **Constants**: `UPPER_SNAKE_CASE` (e.g. `CMD_LIST`, `THEMES`, `KEYBIND_ACTIONS`).
- **Types**: PascalCase, all centralized in `src/types/index.ts`.
- **No comments** unless the *why* is non-obvious.
- **No default exports** on stores or utilities — only on React components.
- Cards receive a `user: PortfolioData` prop. Never fetch data inside a card.
- All card components are in `src/components/cards/` and exported from `index.ts`.
  - Exception: `CardFor.tsx` is **not** exported from `index.ts` to avoid circular imports (it imports from `index.ts` itself).
- `useCommands.ts` must stay JSX-free (`.ts`). All JSX belongs in `CardFor.tsx` or the individual card files.

---

## Database

PostgreSQL 16 running in Docker. Schema managed by Prisma.

Key models: `User`, `Contact` (email/GitHub/LinkedIn), `CV`, `Experience`, `Project`, `Skill`, `Award`, `Education`.

Many-to-many: `Skill ↔ Project`, `Skill ↔ Experience`.

Enums:
- `ContactType`: `GITHUB | EMAIL | LINKEDIN`
- `ProjectStatus`: `RUNNING | SHIPPED | ARCHIVED`
- `Proficiency`: `PRIMARY | PROFICIENT | INTERMEDIATE`

Seed: `bun run seed` (runs `prisma/seed.ts` via `tsx`).

---

## Commands Reference

| Command | Alias | Description |
|---|---|---|
| `help` | `man` | List all commands |
| `about` | — | About section |
| `whoami` | — | Username card |
| `neofetch` | — | System-info style card |
| `projects` | `ls` | List all projects |
| `open <name>` | `cat` | Project detail (`--show` for images) |
| `skills` | — | Skills by category |
| `experience` | — | Work history |
| `education` | — | Education |
| `awards` | — | Awards |
| `contact` | — | Contact icons |
| `cv` | — | Open CV in new tab |
| `theme [name]` | — | Switch or display theme |
| `setup <action> <combo>` | — | Rebind a keybind |
| `clear` | — | Clear terminal |

---

## References

- Next.js App Router docs: `node_modules/next/dist/docs/`
- Prisma CLI reference: https://www.prisma.io/docs/orm/reference/prisma-cli-reference
- Tailwind CSS v4 migration: https://tailwindcss.com/docs/v4-beta
- Zustand docs: https://zustand.docs.pmnd.rs
- React Compiler: https://react.dev/learn/react-compiler
