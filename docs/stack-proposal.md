# Application stack

The operator approved this application stack. The frontend and backend technologies are implemented. AWS infrastructure provisions PostgreSQL, but the backend does not yet connect to it; see [AWS demo deployment](deployment.md).

| Layer | Proposed technology | Intended responsibility |
| --- | --- | --- |
| Frontend | Next.js with TypeScript | Customer-facing portfolio performance UI; currently a left-sidebar shell with placeholder Home, Clients, Positions and Security Master pages and a Settings page with theme choice and backend health check |
| Backend | FastAPI with Python | API; currently provides a health endpoint |
| Database | PostgreSQL | Application and portfolio data |

The backend uses pip requirements in backend/requirements.txt, pytest for API tests, and Uvicorn for local serving. See [Codebase analysis](codebase-analysis.md) for setup, environment variables, and checks.
