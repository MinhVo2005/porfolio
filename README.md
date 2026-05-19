# Terminal Portfolio

An interactive, terminal-style developer portfolio. Navigate by typing commands or using the sidebar.

---

## Prerequisites

- [Bun](https://bun.sh) (primary package manager)
- [Docker](https://www.docker.com/products/docker-desktop) (for the PostgreSQL database)
- Node.js 18+ (if not using Bun)

---

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL 16 instance on `localhost:5432` with:
- Database: `portfolio`
- User: `portfolio`
- Password: `portfolio`

### 3. Generate the Prisma client

```bash
bunx --bun prisma generate
```

### 4. Push the schema to the database

```bash
bunx --bun prisma db push
```

### 5. Seed the database

Edit `prisma/seed.ts` with your own data, then run:

```bash
bun run seed
```

### 6. Start the dev server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env` and adjust if your database credentials differ:

```env
DATABASE_URL=postgresql://portfolio:portfolio@localhost:5432/portfolio
```

---

## Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server with hot reload |
| `bun run build` | Build for production |
| `bun start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run seed` | Seed the database (`prisma/seed.ts`) |

---

## Database Management

| Task | Command |
|---|---|
| Push schema changes (dev) | `bunx --bun prisma db push` |
| Create a migration (prod) | `bunx --bun prisma migrate dev` |
| Open Prisma Studio | `bunx --bun prisma studio` |
| Regenerate client | `bunx --bun prisma generate` |

---

## Commands Available in the Terminal

Once running, type any of these in the terminal:

```
help          — list all commands
about         — about section
projects      — list all projects
open <name>   — view a project (add --show for images)
skills        — skills by category
experience    — work history
education     — education
awards        — awards & achievements
contact       — contact links
cv            — open CV in a new tab
theme [name]  — switch theme (default | nord | classic)
setup <action> <combo>  — rebind a keyboard shortcut
clear         — clear the terminal
```
