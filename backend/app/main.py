# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, get_db
from app import models
from app.routers import habits

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Habit Tracker API")

# Configure CORS
origins = [
    "http://localhost:5173",  # React frontend
    "http://127.0.0.1:5173",
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allowed HTTP methods
    allow_headers=["*"],  # Allowed headers
)

# Include routers
app.include_router(habits.router, prefix="/api", tags=["Habits"])
