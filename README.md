# Mini Sentiment Widget — Full-Stack Application

A comprehensive sentiment feedback system built with a **NestJS** backend and **React 19** frontend.

---

## Project Structure

```
react-wogaa-assignment/
├── backend/                    # NestJS REST API
│   ├── src/
│   │   ├── main.ts            # Application entry point
│   │   ├── app.module.ts       # Root module
│   │   ├── config/            # Configuration files
│   │   ├── common/            # Shared filters, interceptors
│   │   └── sentiments/        # Sentiments CRUD module
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── frontend/                   # React 19 + Vite
    ├── src/
    │   ├── main.tsx           # React entry point
    │   ├── App.tsx            # Root component
    │   ├── api/               # API client
    │   ├── context/           # React Context (Sentiment, Theme)
    │   ├── hooks/             # Custom hooks
    │   ├── types/             # TypeScript types
    │   └── components/        # React components
    ├── tests/                 # End-to-end tests (Playwright)
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- `npm` (bundled with Node.js)

### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend API starts on **http://localhost:3000**

See [backend/README.md](backend/README.md) for detailed backend documentation.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

See [frontend/README.md](frontend/README.md) for detailed frontend documentation.

---

## Tech Stack

### Backend

- **NestJS** — Modern Node.js framework
- **TypeORM** — SQL database ORM
- **SQLite** — Lightweight database
- **Helmet** — Security headers
- **Throttler** — Rate limiting
- **Swagger** — API documentation
- **Validation** — Class-validator & class-transformer

### Frontend

- **React 19** — Latest React with server components support
- **TypeScript** — Type-safe development
- **Vite** — Lightning-fast build tool
- **CSS Modules** — Component-scoped styling
- **TanStack Query** — Data synchronization
- **Jest + React Testing Library** — Unit testing
- **Playwright** — End-to-end testing
- **ESLint** — Code linting

---

## Features

✅ **Sentiment Feedback Widget** — Collect ratings and comments from users  
✅ **Dark/Light Theme** — Theme toggle with persistent storage  
✅ **Summary Statistics** — Display total sentiments and average rating  
✅ **Full-Stack Validation** — Frontend + backend data validation  
✅ **REST API** — Clean, documented endpoints  
✅ **Comprehensive Tests** — Unit tests (Jest) and E2E tests (Playwright)  
✅ **Security Hardening** — Rate limiting, security headers, input validation

---

## Development

### Running Both Services

**Terminal 1 — Backend:**

```bash
cd backend
npm run start:dev
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

### Testing

**Backend:**

```bash
cd backend
npm run lint
```

**Frontend:**

```bash
cd frontend
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run lint        # Linting
```

---

## API Documentation

For detailed API endpoint documentation, see [backend/README.md](backend/README.md).

The backend provides Swagger API docs at: **http://localhost:3000/api/docs**

---

## License

MIT
