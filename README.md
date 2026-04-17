# TaskMaster Pro - React Assessment

A fully functional, modern React boilerplate application designed as a technical assessment submission. Built using React fundamentals and bundled with Vite as a lightning-fast Single Page Application.

## Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with `npm`.

### Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the Vite Development Server:
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
An automated headless browser tests the app routing and LocalStorage logic correctly.

*(Note: On a fresh clone, you MUST install Playwright's browser binaries first before running E2E tests)*
```bash
npx playwright install
npm run test:e2e
```

---

## Architectural & Design Decisions

### 1. Function-Based Components & Custom Hooks
Every component leverages modern, function-based architectures. The logic is cleanly abstracted out into custom hooks (`useTasks`, `useTheme`) rather than bleeding directly into the view layer. 

### 2. State Management via Context & LocalStorage Persistence
Instead of imposing heavy external state libraries (e.g., Redux Toolkit), the application relies on deeply built-in Context Providers and `useReducer`. 
The application persists all data instantly and seamlessly into the browser's `localStorage`, providing a snappy client-side experience that maintains state across reloads without requiring a backend server.

### 3. Styled with Encapsulated CSS Modules
The UI components (`Button`, `Card`, `TaskList`) strictly enforce component-level styling encapsulation through CSS Modules (`*.module.css`). This pairs tightly with a single global sheet for pure variable-driven theme toggling (Dark/Light modes).

### 4. Lightning-Fast Vite Build
The project employs **Vite** as its core build tool. This provides nearly instantaneous hot-module replacement (HMR), a significantly smaller initial footprint, and an optimized production bundle without the overhead of heavy full-stack frameworks.
