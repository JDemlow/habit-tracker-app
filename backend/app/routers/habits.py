# app/routers/habits.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()


# Create a new habit
@router.post("/habits/", response_model=schemas.Habit)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    db_habit = crud.create_habit(db, habit)
    return db_habit


# Get all habits
@router.get("/habits/", response_model=List[schemas.Habit])
def read_habits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    habits = crud.get_habits(db, skip=skip, limit=limit)
    return habits


# Get a specific habit
@router.get("/habits/{habit_id}", response_model=schemas.Habit)
def read_habit(habit_id: int, db: Session = Depends(get_db)):
    db_habit = crud.get_habit(db, habit_id)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return db_habit


# Update a habit
@router.put("/habits/{habit_id}", response_model=schemas.Habit)
def update_habit(
    habit_id: int, habit: schemas.HabitCreate, db: Session = Depends(get_db)
):
    db_habit = crud.update_habit(db, habit_id, habit)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return db_habit


# Delete a habit
@router.delete("/habits/{habit_id}", response_model=schemas.Habit)
def delete_habit_route(habit_id: int, db: Session = Depends(get_db)):
    """
    Delete a habit by its ID.

    Args:
        habit_id (int): The ID of the habit to delete.
        db (Session): The database session.

    Returns:
        Habit: The deleted habit object.

    Raises:
        HTTPException: If the habit with the given ID does not exist.
    """
    db_habit = crud.delete_habit(db, habit_id)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return db_habit


# Increment habit time
@router.post("/habits/{habit_id}/increment/", response_model=schemas.HabitProgress)
def increment_habit(habit_id: int, minutes: int = 5, db: Session = Depends(get_db)):
    db_habit = crud.get_habit(db, habit_id)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    progress = crud.increment_habit_time(db, habit_id, minutes)
    return progress


# Get habit progress for a specific date
@router.get("/habits/{habit_id}/progress/{date_}", response_model=schemas.HabitProgress)
def get_progress(habit_id: int, date_: date, db: Session = Depends(get_db)):
    progress = crud.get_habit_progress(db, habit_id, date_)
    if progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    return progress
