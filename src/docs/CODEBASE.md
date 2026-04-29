# Codebase Documentation

## Architecture Overview

The app is a single-page terminal-style portfolio. The layout has two panes — a collapsible **Sidebar** (panel 1) and a **Terminal** (panel 2) — wired together in `page.tsx`. All UI state lives in `page.tsx` and flows down as props.

```
page.tsx
├── useUserStore        ← global data (Zustand)
├── useCommands         ← maps typed strings → card components
├── useTerminal         ← all terminal state (history, input, scroll)
└── useKeyboard         ← global keyboard shortcuts
    ├── Sidebar [panel 1]
    └── Terminal [panel 2]
        ├── Banner
        ├── HistoryItem[] → Panel → <Card*>
        └── <input> (the live prompt)
```

---

## State in `page.tsx`

| State | Type | Purpose |
|---|---|---|
| `user` | `PortfolioData \| null` | Portfolio data from Zustand store |
| `collapsed` | `boolean` | Whether the sidebar is collapsed to icon-only mode |
| `activeTab` | `SectionId \| null` | Which section is currently "active" (highlighted in sidebar) |
| `activePanel` | `1 \| 2` | Which pane has focus — `1` = sidebar, `2` = terminal |
| `sidebarFocus` | `number` | Which sidebar row has the keyboard cursor (0-indexed) |
| `submitRef` | `MutableRefObject<fn>` | Stable ref to `submit()` so keyboard handler can call it without re-registering listeners |

---

## `useTerminal` — terminal state hook

**File:** `src/lib/useTerminal.ts`

Core hook. Manages everything the terminal box needs to render and behave.

### State

| State | Type | Purpose |
|---|---|---|
| `history` | `HistoryEntry[]` | All past command entries (input + rendered card). Appended on every submit. |
| `value` | `string` | Controlled value of the live `<input>` at the bottom. |
| `cmdHist` | `string[]` | Previously typed commands, newest-first. Capped at 50. |
| `hIdx` | `number` | Index into `cmdHist` for up/down arrow navigation. `-1` means not navigating history. |

### Refs

| Ref | Purpose |
|---|---|
| `scrollerRef` | Points to the scrollable `<div>` wrapping terminal output. Used to auto-scroll to bottom after each command. |
| `inputRef` | Points to the `<input>` element. Used to programmatically `.focus()` it. |

### Key behaviors

- **Auto-scroll** — `useEffect` on `history` fires `scrollerRef.current.scrollTop = scrollHeight` after every new entry.
- **`submit(raw)`** — trims input, clears it, handles `clear` (wipes history), pushes to `cmdHist`, calls `cardFor(raw)` to get a card, appends to `history`.
- **`submitRef` sync** — `useEffect` keeps `submitRef.current = submit` so `useKeyboard` always has the latest version without needing it in its dependency array.
- **`onKey(e)`** — handles four keys on the input:

| Key | Behavior |
|---|---|
| `Enter` | Calls `submit(value)` |
| `Tab` | Autocomplete: finds first `CMD_LIST` entry that starts with current input, sets it + trailing space |
| `ArrowUp` | Walk backwards through `cmdHist`, stops at index 0 |
| `ArrowDown` | Walk forwards through `cmdHist`; past the end resets to empty string and `hIdx = -1` |

---

## `useCommands` — command → card mapping

**File:** `src/lib/useCommands.tsx`

Takes a raw string, splits on whitespace to get `cmd` and `arg`, and `switch`es over `cmd.toLowerCase()`. Returns `{ title, card }` or `null` for empty input.

**Side effect:** any command that maps to a sidebar section also calls `setActiveTab(sectionId)` to sync the sidebar highlight.

The `onOpen` callback passed to `CardProjects` calls `submitRef.current("open " + name)`, which re-enters the submit pipeline programmatically when a project name is clicked.

### Command table

| Command(s) | Card rendered | Sets `activeTab` |
|---|---|---|
| `help`, `man` | `CardHelp` — two-column commands + keybindings reference | — |
| `about` | `CardAbout` — name, role, bio, links | `about` |
| `whoami` | `CardWhoami` — one-liner identity | — |
| `neofetch` | `CardNeofetch` — ASCII face + stats grid | — |
| `projects`, `ls` | `CardProjects` — list with clickable names | `projects` |
| `open <n>`, `cat <n>` | `CardOpen` — single project detail | — |
| `skills` | `CardSkills` — skills grouped by category | `skills` |
| `experience` | `CardExperience` — work history | `experience` |
| `education` | `CardEducation` — academic background | `education` |
| `awards` | `CardAwards` — recognitions | `awards` |
| `contact` | `CardContact` — contact links | `contact` |
| `cv` | `CardCV` — view/download CV | `cv` |
| `pwd` | Inline `/home/<username>/portfolio` | — |
| `echo <text>` | Inline echo of the argument | — |
| `vim`, `nvim` | Joke card about being trapped in vim | — |
| `:q`, `:wq`, `:x`, `:qa`, `:qa!` | "Successfully exited vim" | — |
| `sudo` | "Permission denied. nice try." | — |
| `exit` | "You can't exit a portfolio" | — |
| `clear` | Handled in `useTerminal` — wipes `history` array | — |
| anything else | `CardError` — "command not found" | — |

---

## `useKeyboard` — global keyboard shortcuts

**File:** `src/lib/useKeyboard.ts`

Registers a single `window.addEventListener("keydown", handler)` listener, torn down and re-registered on dependency changes.

### Shortcut table

| Key | Condition | Action |
|---|---|---|
| `Ctrl/Cmd + B` | anywhere | Toggle sidebar collapsed |
| `Ctrl/Cmd + M` | anywhere | Switch active pane (1 ↔ 2) |
| `Ctrl + U` | anywhere | Scroll terminal up 180px |
| `Ctrl + D` | anywhere | Scroll terminal down 180px |
| `j` / `ArrowDown` | panel 1, not in input | Move `sidebarFocus` down |
| `k` / `ArrowUp` | panel 1, not in input | Move `sidebarFocus` up |
| `Enter` / `l` | panel 1, not in input | Submit focused section's command, switch to terminal |
| `i` / `Escape` | panel 1, not in input | Switch to terminal |
| `1`–`8` | not in input, no modifier | Jump directly to that sidebar section (submits command + switches to terminal) |

The `isInput` guard prevents all non-ctrl shortcuts from firing while the `<input>` is focused.

---

## Data layer

### `userStore` — `src/store/userStore.ts`

Zustand store with two fields:

- `user: PortfolioData | null` — starts `null`, populated after `fetchUser()`.
- `fetchUser()` — `GET /api`, deserializes the raw DB shape, and runs `mapToPortfolio()` to normalize into `PortfolioData`.

`mapToPortfolio` does:
- Extracts email/github/linkedin from the flat `contacts` array by `type`
- Derives `username` from first name, `hostname` from the email domain
- Groups skills by `category` into a `Map` then flattens to `{ category, items[] }`
- Formats all date ranges into `"YYYY – YYYY"` or `"YYYY – present"` strings

### API route — `src/app/api/route.ts`

Single `GET` handler. Calls `userService.getUser()` and returns JSON.

### Repository / Service layers

Prisma repositories in `src/repositories/` — one file per domain entity. A thin `userService` in `src/service/userService.ts` aggregates user + contacts + projects + skills + experience + education + awards + CV into a single query response.

---

## Components

### Layout

| Component | File | Purpose |
|---|---|---|
| `TitleBar` | `src/components/layout/TitleBar.tsx` | Top bar with user name and window chrome |
| `Sidebar` | `src/components/layout/Sidebar.tsx` | Panel 1 — collapsible section nav with stats and macros |
| `Terminal` | `src/components/layout/Terminal.tsx` | Panel 2 — scrollable history + live input |
| `Banner` | `src/components/layout/Banner.tsx` | Welcome header shown at the top of the terminal output |

### UI primitives

| Component | File | Purpose |
|---|---|---|
| `Panel` | `src/components/ui/Panel.tsx` | Bordered card with a title bar. Wraps every history entry. |
| `Prompt` | `src/components/ui/Prompt.tsx` | Renders `username@hostname:~/portfolio$`. Appears in the live row and before each history entry. |

### Cards — `src/components/cards/`

Each card is a pure display component that receives `user: PortfolioData` (and occasionally extra props).

| Card | Rendered by |
|---|---|
| `CardHelp` | `help`, `man` |
| `CardAbout` | `about` |
| `CardWhoami` | `whoami` |
| `CardNeofetch` | `neofetch` |
| `CardProjects` | `projects`, `ls` |
| `CardOpen` | `open <n>`, `cat <n>` |
| `CardSkills` | `skills` |
| `CardExperience` | `experience` |
| `CardEducation` | `education` |
| `CardAwards` | `awards` |
| `CardContact` | `contact` |
| `CardCV` | `cv` |
| `CardError` | any unrecognized command |

---

## Types — `src/types/index.ts`

| Type | Shape |
|---|---|
| `HistoryEntry` | `{ input: string; title: string; card: ReactNode }` |
| `SectionId` | `"about" \| "projects" \| "skills" \| "experience" \| "education" \| "awards" \| "contact" \| "cv"` |
| `PortfolioData` | Flat normalized object: name, banner, role, location, about, email, github, linkedin, cvUrl, username, hostname, stats, projects[], skills[], experience[], education[], awards[] |
| `Section` | `{ key: SectionId; label: string; icon: string; cmd: string }` |

---

## Constants — `src/lib/`

| File | Export | Purpose |
|---|---|---|
| `constants.ts` | `CMD_LIST` | Array of all valid command name strings. Used by `Tab` autocomplete in `useTerminal`. |
| `sections.ts` | `SECTIONS` | Ordered array of 8 `Section` objects. Drives sidebar rendering and keyboard shortcuts `1`–`8`. |
