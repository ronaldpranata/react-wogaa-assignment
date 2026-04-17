# TaskMaster Pro - React Assessment

A fully functional, modern React boilerplate application designed as a technical assessment submission. Built organically starting from bare React fundamentals up to a production-ready Full-Stack Next.js iteration.

## Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with `npm`.

### Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Sync the SQLite Database:
   ```bash
   # Generates Prisma client and sets up dev.db
   npx prisma db push
   ```

3. Start the Next.js Development Server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests
The project features a comprehensive functional testing suite.

**1. Unit Tests (Jest)** 
Ensure core DOM and UI components function independently.
```bash
npm run test
```

**2. End-to-End Tests (Playwright)** 
An automated headless browser tests the app routing, Optimistic UI manipulation, and correct Prisma database interactions cleanly.

*(Note: On a fresh clone, you MUST install Playwright's browser binaries first before running E2E tests)*
```bash
npx playwright install
npm run test:e2e
```

---

## Architectural & Design Decisions

### 1. Function-Based Components & Custom Hooks
Every component leverages modern, function-based architectures. The logic is cleanly abstracted out into custom hooks (`useTasks`, `useTheme`) rather than bleeding directly into the view layer. 

### 2. State Management via Context & Optimistic UI
Instead of imposing heavy external state libraries (e.g., Redux Toolkit), the application relies on deeply built-in Context Providers and `useReducer`. 
To ensure a high-quality User Experience without latency, the application implements an **Optimistic UI Data Flow**: the Context updates the UI payload instantly on interaction while communicating asynchronously with the internal Next API to persist data to the Prisma backend.

### 3. Styled with Encapsulated CSS Modules
The UI components (`Button`, `Card`, `TaskList`) strictly enforce component-level styling encapsulation through CSS Modules (`*.module.css`). This pairs tightly with a single global sheet for pure variable-driven theme toggling (Dark/Light modes).

### 4. Fullstack Next.js + Embedded SQLite
The project migrated into the **Next.js App Router** framework allowing native, secure, Server-Side API Handlers (`src/app/api/...`). To provide robust data persistency without requiring cumbersome Docker setups or Cloud Postgres configurations for the grader, an embedded **SQLite Database via Prisma ORM** guarantees clean, type-safe data access directly inside the repository.
