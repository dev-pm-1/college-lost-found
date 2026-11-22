from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/health", tags=["Health"])
async def api_health_check():
    """Health check endpoint for API v1."""
    return {
        "status": "healthy",
        "service": "College Lost & Found API v1",
    }
