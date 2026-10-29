# Codebase analysis

## Purpose

This repository is the UI and backend for an eventual registered investment adviser platform that demonstrates customer portfolio performance.

## Current layout

The frontend is a Next.js App Router application written in TypeScript. The shared root layout renders primary navigation for Home, Accounts, Positions, Orders, Securities, and Settings. The portfolio destinations show lightweight placeholder content. Settings provides a backend health check. Navigation indicates the current page accessibly and adapts to narrow screens.

The FastAPI backend exposes GET /health, returning a healthy status, and allows browser requests from the local frontend origins. Its source and API test live under backend. The frontend, shared navigation, and Playwright navigation test live under src and tests. The repository root contains npm, TypeScript, ESLint, Playwright, and Jaah gate configuration.

## Run and state

Install frontend packages with `npm install`, then run the UI with `npm run dev`. The FastAPI service runs separately: install backend/requirements.txt in a Python 3.10+ environment and start it with `uvicorn backend.main:app --reload --port 8000`. Set NEXT_PUBLIC_BACKEND_URL in the frontend environment to the backend origin when it differs from http://127.0.0.1:8000. For a frontend origin outside the local defaults, set BACKEND_CORS_ORIGINS to a comma-separated list of allowed origins before starting the backend. NEXT_PUBLIC_BACKEND_URL is inlined into the browser bundle at build time.

The UI health check calls the backend directly from the browser. The app has no portfolio data, authentication, container setup, or persistent application state. PostgreSQL remains a proposal; the health endpoint checks backend reachability only and does not check dependencies.

## Checks

`./jaah-gate quick` runs whitespace and shell syntax checks, ESLint, and TypeScript checking. `./jaah-gate full` runs quick checks, installs Playwright Chromium if needed, runs frontend and backend tests, and creates a production build.

The frontend uses npm for package management and Playwright Test for end-to-end browser coverage. The backend uses pip requirements and pytest. Run `npm run test:setup` to install Chromium before running `npm test` directly.

## Conventions and limitations

The app uses Next.js App Router file-based pages and the built-in `Link` component for navigation. Shared shell UI belongs in the root layout; current-page state is derived from the route. Follow the installed Next.js guidance in `AGENTS.md` and the local Next.js docs before changing framework APIs.

No database is configured, and the backend currently serves only the health check. Revisit this analysis as portfolio APIs or persistence are added.
