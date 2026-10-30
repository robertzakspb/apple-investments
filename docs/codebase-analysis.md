# Codebase analysis

## Purpose

This repository is the UI and backend for an eventual registered investment adviser platform that demonstrates customer portfolio performance.

## Current layout

The frontend is a Next.js App Router application written in TypeScript. A left sidebar (a menu-button drawer below 768px wide) is headed by the Ascent A logo (linking Home; also in the mobile top bar) and links Home, Clients, Positions, Security Master and Settings. The same mark is the favicon, src/app/icon.svg; the sidebar copy lives in src/components/logo.tsx and takes its colors from the --logo-* tokens in src/app/globals.css. Home shows empty firm-metric tiles; Clients, Positions and Security Master are placeholder pages with no data. Settings offers a System/Light/Dark appearance choice, stored in browser localStorage and defaulting to the device theme, and a button that calls the backend /health endpoint at NEXT_PUBLIC_BACKEND_URL (default http://127.0.0.1:8000). The sidebar destinations and their descriptions are defined once in src/lib/pages.ts.

The FastAPI backend exposes GET /health, returning a healthy status, and allows browser requests from the local frontend origins. Its source and API test live under backend. The frontend and its Playwright navigation and Settings tests live under src and tests. The repository root contains npm, TypeScript, ESLint, Playwright, and Jaah gate configuration.

## Run and state

Install frontend packages with `npm install`, then run the UI with `npm run dev`. The FastAPI service runs separately: install backend/requirements.txt in a Python 3.10+ environment and start it with `uvicorn backend.main:app --reload --port 8000`. For a frontend origin outside the local defaults, set BACKEND_CORS_ORIGINS to a comma-separated list of allowed origins before starting the backend.

The app has no portfolio data, authentication, container setup, or persistent application state. The AWS stack provisions an isolated PostgreSQL database, but the backend does not connect to it; the health endpoint checks backend reachability only and does not check dependencies. See [AWS demo deployment](deployment.md) for infrastructure and deployment details.

## Checks

`./jaah-gate quick` runs whitespace and shell syntax checks, ESLint, and TypeScript checking. `./jaah-gate full` runs quick checks, installs Playwright Chromium if needed, runs frontend and backend tests, and creates a production build.

The frontend uses npm for package management and Playwright Test for end-to-end browser coverage. The backend uses pip requirements and pytest. Run `npm run test:setup` to install Chromium before running `npm test` directly.

## Conventions and limitations

The app uses Next.js App Router file-based pages. Shared shell UI belongs in the root layout. Follow the installed Next.js guidance in `AGENTS.md` and the local Next.js docs before changing framework APIs.

The backend currently serves only the health check and does not use the provisioned AWS database. Revisit this analysis as portfolio APIs or persistence are added.
