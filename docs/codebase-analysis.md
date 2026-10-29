# Codebase analysis

## Purpose

This repository is the UI and backend for an eventual registered investment adviser platform that demonstrates customer portfolio performance.

## Current layout

The frontend is a Next.js App Router application written in TypeScript. The shared root layout renders primary navigation for Home, Accounts, Positions, Orders, and Securities. Each destination is routable; the four portfolio destinations currently show lightweight placeholder content. The navigation indicates the current page accessibly and adapts to narrow screens.

The app, shared navigation, and Playwright navigation test live under `src/` and `tests/`. The repository root contains npm, TypeScript, ESLint, Playwright, and Jaah gate configuration.

## Run and state

Install packages with `npm install`. Run the app with `npm run dev`.

The UI has no backend integration, portfolio data, authentication, container setup, or persistent application state. The FastAPI and PostgreSQL layers remain proposals, not implemented code.

## Checks

`./jaah-gate quick` runs whitespace and shell syntax checks, ESLint, and TypeScript checking. `./jaah-gate full` runs quick checks, installs Playwright Chromium if needed, runs the browser navigation test, and creates a production build.

The frontend uses npm for package management and Playwright Test for end-to-end browser coverage. Run `npm run test:setup` to install Chromium before running `npm test` directly.

## Conventions and limitations

The app uses Next.js App Router file-based pages and the built-in `Link` component for navigation. Shared shell UI belongs in the root layout; current-page state is derived from the route. Follow the installed Next.js guidance in `AGENTS.md` and the local Next.js docs before changing framework APIs.

No backend or database package/test tooling has been selected because those layers are not implemented. Revisit this analysis as those layers are added.
