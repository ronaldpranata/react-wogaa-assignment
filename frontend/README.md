# Mini Sentiment Widget — React Assessment


Built with **React 19**, **TypeScript**, **Vite**, **CSS Modules**, **Jest + React Testing Library**, and **Playwright**.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- `npm` (bundled with Node.js)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```

---

## Running Tests

### Unit Tests (Jest + React Testing Library)
```bash
npm run test
```
Runs all `*.test.tsx` / `*.test.ts` files using Jest with a jsdom environment.

### End-to-End Tests (Playwright)
> **First-time setup:** Install Playwright's browser binaries before running E2E tests.
```bash
npx playwright install --with-deps
npm run test:e2e
```
Playwright automatically starts the Vite dev server, runs all specs in `tests/`, and generates an HTML report at `playwright-report/index.html`.

### All scripts
| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint across all `.ts` / `.tsx` files |
| `npm run test` | Run all Jest unit tests |
| `npm run test:e2e` | Run all Playwright E2E tests |

---

## Component Organization

```
src/
├── main.tsx                        # App entry — mounts providers + App
├── App.tsx                         # Root layout (Header + main content)
├── index.css                       # Global CSS variables (light/dark themes)
│
├── types/
│   └── sentiment.ts                # Shared TypeScript interfaces & types
│
├── context/
│   ├── ThemeContext.tsx             # ThemeProvider + ThemeContext (light/dark)
│   └── SentimentContext.tsx        # SentimentProvider + reducer + localStorage
│
├── hooks/
│   ├── useTheme.ts                 # Typed accessor for ThemeContext
│   └── useSentiments.ts            # Typed accessor for SentimentContext
│
└── components/
    ├── layout/
    │   └── Header/
    │       ├── Header.tsx          # App title + theme toggle button
    │       └── Header.module.css
    │
    ├── ui/                         # Reusable, context-agnostic UI primitives
    │   ├── Button/
    │   │   ├── Button.tsx          # Generic button (primary / secondary / danger)
    │   │   └── Button.module.css
    │   ├── Card/
    │   │   ├── Card.tsx            # Content container with rounded shadow
    │   │   └── Card.module.css
    │   └── Chip/
    │       ├── Chip.tsx            # Selectable/toggleable button chip
    │       └── Chip.module.css
    │
    └── features/
        └── SentimentWidget/        # Self-contained feature module
            ├── SentimentWidget.tsx # Orchestrates form + conditional summary
            ├── SentimentWidget.module.css
            │
            ├── SentimentForm/      # Feedback entry form
            │   ├── SentimentForm.tsx
            │   ├── SentimentForm.module.css
            │   ├── RatingChips/
            │   │   ├── RatingChips.tsx   # Row of selectable Chip buttons (1–5)
            │   │   └── RatingChips.module.css
            │   ├── CommentBox/
            │   │   ├── CommentBox.tsx    # Controlled <textarea>
            │   │   └── CommentBox.module.css
            │   └── SubmitButton/
            │       ├── SubmitButton.tsx  # Form submit wrapper
            │       └── SubmitButton.module.css
            │
            └── SummaryPanel/       # Rendered once sentiments > 0
                ├── SummaryPanel.tsx # Totals, average, last-3 comments
                └── SummaryPanel.module.css
```

### Layer descriptions

| Layer | Purpose |
|---|---|
| `types/` | Shared TypeScript interfaces used across contexts and components |
| `context/` | Global application state (theme, sentiments) using `useReducer` + `createContext` |
| `hooks/` | Thin custom hooks that enforce context usage with typed error guards |
| `components/layout/` | Structural page layout components (e.g., `Header`) |
| `components/ui/` | Presentational, reusable primitives — no business logic, no context access |
| `components/features/` | Feature-specific component trees — may access context via hooks |

---

## Test Coverage

### Unit Tests

| File | What is tested |
|---|---|
| `Button.test.tsx` | Render, onClick, disabled state, variants, className merging |
| `Card.test.tsx` | Render, custom className, multiple children |
| `Chip.test.tsx` | Render, chipValue display, active/disabled class, onClick guard |
| `CommentBox.test.tsx` | Textarea value, placeholder, onChange, disabled state |
| `RatingChips.test.tsx` | Default 5 chips, custom array, select, deselect (toggle), disabled |
| `SubmitButton.test.tsx` | Render, submit type, enabled/disabled states |
| `SentimentForm.test.tsx` | Validation logic, submit call, reset, locked state (timeout) |
| `SummaryPanel.test.tsx` | Total/average display, last-3-sorted comments |
| `SentimentWidget.test.tsx` | Conditional rendering of SummaryPanel |
| `Header.test.tsx` | Title, theme button labels, toggleTheme callback |
| `ThemeContext.test.tsx` | Initial state, toggle, `data-theme` DOM attribute |
| `SentimentContext.test.tsx` | Initial state, addSentiment, stats computation, localStorage |
| `useTheme.test.tsx` | Error guard, returned shape |
| `useSentiments.test.tsx` | Error guard, returned shape |

### End-to-End Tests (`tests/sentiment-widget.spec.ts`)

| Test | Scenario |
|---|---|
| Page load | Title visible, submit disabled |
| Validation | Disabled with rating only; disabled with comment only |
| Interaction | Chip select/deselect, enabled when both provided |
| Submission | Alert message, SummaryPanel appears with correct stats |
| Comment list | Submitted comment visible in summary |
| Theme toggle | Button label flips between Dark Mode / Light Mode |

---

## Architectural & Design Decisions

### 1. Function-Based Components & Custom Hooks
Every component uses modern function-based architecture. Context access is abstracted into typed custom hooks (`useTheme`, `useSentiments`) with explicit error guardsso misuse is caught immediately at runtime.

### 2. State Management via Context + `useReducer`
Rather than adding a heavy external state library, the app uses React's built-in `useReducer` inside a `SentimentProvider`. The `useMemo` hook derives `summaryStats` reactively from the sentiments array, keeping the reducer pure and side-effect-free.

### 3. localStorage Persistence
All sentiment submissions are persisted to `localStorage` via a single `useEffect` in `SentimentContext`. On mount, an `init` function passed to `useReducer` hydrates state from storage — meaning the summary survives page reloads without a backend.

### 4. Encapsulated CSS Modules
Every component owns its styles through a co-located `*.module.css` file. A single global `index.css` defines CSS custom properties for the light and dark themes, toggled via `data-theme` on `<html>`.

### 5. Lightning-Fast Vite Build
Vite provides near-instant HMR, native ESM, and an optimized production bundle — with zero configuration overhead compared to webpack-based alternatives.
