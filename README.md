# ArgueArena

A debate-based web game where players sharpen their argumentation skills through two distinct game modes: a structured Story Mode with chapter-based NPC debates, and a real-time Daily Feed forum for discussing daily rotating topics.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Services](#services)
  - [Auth Service](#auth-service)
  - [Story Service](#story-service)
  - [Daily Feed Service](#daily-feed-service)
- [Frontend (Client)](#frontend-client)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

---

## Overview

ArgueArena is a full-stack microservices application built around the concept of debate as gameplay. Players register, log in, and engage in two core experiences:

- **Story Mode** — A single-player RPG-style campaign where players debate against NPCs across 10 chapters, each with 10 rounds. Players choose argument options, earn scores, unlock achievements, and track their progress.
- **Daily Mode** — A real-time community forum powered by Socket.IO where a new debate topic (drawn from a Nepal-focused topic pool) is served every day and users discuss it live.

---

## Project Structure

```
ArgueArena/
├── backend/
│   ├── config/
│   │   └── db.js                  # Shared database connection (Sequelize/PostgreSQL)
│   ├── Models/
│   │   └── user.model.js          # Shared User model
│   └── Services/
│       ├── AuthService/           # JWT-based authentication microservice
│       ├── StoryService/          # Story mode game engine microservice
│       └── DailyFeedService/      # Real-time daily topic forum microservice
└── client/                        # React + Vite frontend
    └── src/
        ├── features/
        │   ├── StoryMode/         # Battle screens, round/chapter UI
        │   └── Daily_Mode/        # Live forum feed UI
        ├── pages/                 # Login, Register
        ├── lobby/                 # Lobby scene with 3D ember particles
        ├── context/               # Auth context
        ├── hooks/                 # useAuthCanvas, useToast
        └── serviceClient/         # Axios clients for each backend service
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router v7, Three.js / React Three Fiber, Socket.IO Client, Axios |
| Auth Service | Node.js, Express 5, JWT, bcrypt, dotenv |
| Story Service | Node.js, Express 5, Sequelize 6, PostgreSQL |
| Daily Feed Service | Node.js, Express 5, Socket.IO 4, Firebase Admin |
| Database | PostgreSQL (Story/Auth), Firebase Firestore (Daily Feed) |

---

## Services

### Auth Service

**Port:** configurable via `.env`

Handles user registration, login, and JWT-based authentication.

**Endpoints:**

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in and receive a JWT |
| GET | `/me` | Get the currently authenticated user (requires token) |

**Key dependencies:** `express`, `bcrypt`, `jsonwebtoken`, `dotenv`, `cors`

---

### Story Service

**Port:** `3002` (default, overridable via `STORY_SERVICE_PORT`)

The core game engine for Story Mode. Manages chapters, debate rounds, argument turns, player progress, achievements, and rewards.

**Game structure:**
- 10 Chapters, each with 10 Rounds
- Each round is a `Debate` with multiple `DebateTurn`s
- Each turn presents `ArgumentOption`s with varying quality ratings
- An NPC responds with expressions (`idle`, `neutral`, `panic`, `smirk`) based on the player's choice
- Scores are calculated per round; boss rounds gate chapter completion
- Achievements are tracked and unlocked via `achievementEngine`

**Key endpoints (under `/api/story`):**
- Get chapter list for a player
- Load a specific round and turn
- Submit a turn choice
- Finish a round / finish a chapter
- Get player profile and achievements

**Key dependencies:** `express`, `sequelize`, `pg`, `dotenv`, `cors`

---

### Daily Feed Service

**Port:** `5000`

A real-time forum where a new debate topic is selected daily from a curated pool of Nepal-focused topics. Users can post and receive messages live via WebSockets.

**Topic examples:**
- "Should Nepal lower the voting age to 16?"
- "Should social media be more strictly regulated in Nepal?"
- "Should Nepal invest more in hydropower than tourism?"

**Key features:**
- Daily topic rotation with automatic scheduling (`dailyTopicSelector.js`)
- Real-time messaging via Socket.IO
- Topic and message persistence via Firebase Firestore
- Forum routes under `/api/forums`

**Key dependencies:** `express`, `socket.io`, `firebase-admin`, `cors`

---

## Frontend (Client)

**Dev server:** `http://localhost:5173`

Built with React 19 + Vite. Features include:

- **Lobby** — An animated 3D lobby scene with ember particle effects (Three.js / React Three Fiber)
- **Auth pages** — Login and Register with an arcade-themed CSS style
- **Story Mode** — Battle screen, round selector, round results, chapter completion, and player profile views with NPC sprite expressions
- **Daily Mode** — Live feed UI connected to the Daily Feed Service via Socket.IO
- **Protected routes** — Auth-gated navigation using JWT stored via auth context

**Scripts:**
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL (for Auth and Story services)
- Firebase project with Firestore (for Daily Feed service)

### Installation

**1. Clone the repository and install dependencies for each service:**

```bash
# Auth Service
cd backend/Services/AuthService
npm install

# Story Service
cd ../StoryService
npm install

# Daily Feed Service
cd ../DailyFeedService
npm install

# Frontend
cd ../../../client
npm install
```

**2. Configure environment variables** (see [Environment Variables](#environment-variables) below).

**3. Start each service in a separate terminal:**

```bash
# Auth Service
cd backend/Services/AuthService && npm run dev

# Story Service
cd backend/Services/StoryService && npm run dev

# Daily Feed Service
cd backend/Services/DailyFeedService && npm run dev

# Frontend
cd client && npm run dev
```

**4. Open** `http://localhost:5173` in your browser.

---

## Environment Variables

### Auth Service (`backend/Services/AuthService/.env`)

```env
JWT_SECRET=your_jwt_secret
DB_URI=your_postgresql_connection_string
PORT=3001
```

### Story Service

```env
STORY_SERVICE_PORT=3002
DB_URI=your_postgresql_connection_string
```

### Daily Feed Service

Place your Firebase service account key at:
```
backend/Services/DailyFeedService/serviceAccountKey.json
```

> **Note:** Never commit `.env` files or `serviceAccountKey.json` to version control. These are listed in `.gitignore`.
