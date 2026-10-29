# Application stack

The operator approved this stack for the platform. The frontend and backend technologies are implemented; PostgreSQL remains a proposal.

| Layer | Proposed technology | Intended responsibility |
| --- | --- | --- |
| Frontend | Next.js with TypeScript | Customer-facing portfolio performance UI; currently includes portfolio navigation and Settings health check |
| Backend | FastAPI with Python | API; currently provides a health endpoint |
| Database | PostgreSQL | Application and portfolio data |

The backend uses pip requirements in backend/requirements.txt, pytest for API tests, and Uvicorn for local serving. See [Codebase analysis](codebase-analysis.md) for setup, environment variables, and checks.
