import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Apple Investments API")

origins = os.getenv(
    "BACKEND_CORS_ORIGINS",
    "http://127.0.0.1:3000,http://localhost:3000,http://127.0.0.1:3100,http://localhost:3100",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins.split(",") if origin.strip()],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
