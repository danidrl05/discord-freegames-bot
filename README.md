# 🎮 Discord Free Games Bot

A Discord bot that automatically notifies your server when games are available for free on platforms like Steam, Epic Games, GOG, itch.io and more — powered by the [GamerPower API](https://www.gamerpower.com/api-read).

---

## ✨ Features

- 🎮 Browse all current free game giveaways
- 🔍 Filter games by platform and genre
- 🔔 Daily automatic notifications to a configured channel
- ⚙️ Per-server configuration (channel, filters, language)
- 🌐 Multilingual support — English, Català, Español
- 🐳 Docker-ready for easy deployment

---

## 🤖 Commands

| Command | Description |
|---|---|
| `/games` | Shows free games using your server's configured filters |
| `/allgames` | Shows all free games available right now (no filters) |
| `/setup` | Configure the bot for your server (requires Manage Server) |
| `/settings` | Shows the current configuration for your server |
| `/help` | Lists all commands |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 22 + TypeScript
- **Bot:** discord.js v14
- **Database:** better-sqlite3 (raw SQL, no ORM)
- **API:** GamerPower API (free, no auth required)
- **Scheduler:** node-cron
- **Linting:** ESLint v10 (flat config) + Prettier
- **Testing:** Vitest
- **CI/CD:** GitHub Actions
- **Container:** Docker (multi-stage build)

---

## 🚀 Local Setup

### Prerequisites

- Node.js >= 22
- A Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

```bash
git clone https://github.com/danidrl05/discord-freegames-bot.git
cd discord-freegames-bot
npm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DISCORD_TOKEN=your-bot-token
DISCORD_CLIENT_ID=your-client-id
```

### Register slash commands

```bash
npm run deploy
```

### Run the bot

```bash
npm run dev
```

---

## 🐳 Docker

```bash
docker build -t discord-freegames-bot .
docker run --env-file .env discord-freegames-bot
```

---

## 📁 Project Structure

```
src/
├── api/               → GamerPower API client
│   └── *.test.ts      → Unit tests
├── commands/          → Slash command handlers
├── cron/              → Daily notification scheduler
├── db/                → SQLite connection and schema
├── events/            → Discord.js event handlers
├── i18n/              → Translations (en, ca, es)
│   └── *.test.ts      → Unit tests
└── index.ts           → Entry point
```

---

## 📄 License

MIT
