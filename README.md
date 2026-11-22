# College Lost & Found Portal

A modern, responsive full-stack web application designed for college campuses to streamline reporting, searching, claiming, and returning lost belongings.

## Technology Stack

- **Frontend:** React 18 + Vite 5 + Tailwind CSS + Lucide Icons
- **Backend:** Python + FastAPI + Uvicorn + Pydantic v2
- **Database:** PostgreSQL 16 + SQLAlchemy 2.x + Alembic
- **Containerization:** Docker & Docker Compose

---

## Architecture Overview

The system consists of three Dockerized services:
1. `lostfound_frontend`: React/Vite development server exposed on port `5173`.
2. `lostfound_backend`: FastAPI API server exposed on port `8000`.
3. `lostfound_db`: PostgreSQL 16 database exposed on port `5432` with a persistent volume.

---

## Quick Start with Docker Compose

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 2. Environment Setup
The project includes a pre-configured `.env` file for local development. You can customize variables if needed:
```bash
cp .env.example .env
```

### 3. Build and Start Services
```bash
docker compose up --build
```
Or run in detached mode:
```bash
docker compose up -d --build
```

### 4. Verify Services
Check running containers:
```bash
docker compose ps
```

View live logs:
```bash
docker compose logs -f
```

---

## Service URLs

| Service | URL | Description |
|---|---|---|
| **Frontend Web App** | [http://localhost:5173](http://localhost:5173) | Interactive React Portal |
| **Backend API** | [http://localhost:8000](http://localhost:8000) | Root service endpoint |
| **Interactive API Docs (Swagger UI)** | [http://localhost:8000/docs](http://localhost:8000/docs) | OpenAPI documentation |
| **API Health Check** | [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health) | API v1 status endpoint |

---

## Project Structure

```
college-lost-found/
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── docker-compose.yml        # Docker Compose configuration (db, backend, frontend)
├── backend/                  # FastAPI Application
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py           # FastAPI entrypoint, CORS & static file mount
│       ├── core/
│       │   └── config.py     # Pydantic Settings
│       └── api/
│           └── router.py     # API v1 routes & health checks
└── frontend/                 # React Application
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx           # App shell & health status verification
        ├── main.jsx
        └── index.css         # Tailwind styles
```

---

## Shutting Down
To stop running containers:
```bash
docker compose down
```
To stop and remove database persistent volumes:
```bash
docker compose down -v
```
