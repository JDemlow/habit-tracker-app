# app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date


def get_habits(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Habit).offset(skip).limit(limit).all()


def get_habit(db: Session, habit_id: int):
    return db.query(models.Habit).filter(models.Habit.id == habit_id).first()


def create_habit(db: Session, habit: schemas.HabitCreate):
    db_habit = models.Habit(name=habit.name, goal_minutes=habit.goal_minutes)
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    # Create initial progress entry for today
    today = date.today()
    db_progress = models.HabitProgress(habit_id=db_habit.id, date=today, minutes=0)
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_habit


def delete_habit(db: Session, habit_id: int):
    """
    Delete a habit by its ID.

    Args:
        db (Session): The database session.
        habit_id (int): The ID of the habit to delete.

    Returns:
        Habit | None: The deleted habit object if found, else None.
    """
    # Retrieve the habit by ID
    db_habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()

    if db_habit:
        # Delete the habit
        db.delete(db_habit)
        db.commit()
        # Optionally, refresh to get the latest state
        db.refresh(db_habit)
        return db_habit
    else:
        # Habit not found
        return None


def update_habit(db: Session, habit_id: int, habit: schemas.HabitCreate):
    db_habit = get_habit(db, habit_id)
    if db_habit:
        db_habit.name = habit.name
        db_habit.goal_minutes = habit.goal_minutes
        db.commit()
        db.refresh(db_habit)
    return db_habit


def get_habit_progress(db: Session, habit_id: int, date_: date):
    return (
        db.query(models.HabitProgress)
        .filter(
            models.HabitProgress.habit_id == habit_id,
            models.HabitProgress.date == date_,
        )
        .first()
    )


def increment_habit_time(db: Session, habit_id: int, minutes: int):
    today = date.today()
    progress = get_habit_progress(db, habit_id, today)
    if progress:
        progress.minutes += minutes
    else:
        progress = models.HabitProgress(habit_id=habit_id, date=today, minutes=minutes)
        db.add(progress)
    db.commit()
    db.refresh(progress)
    return progress
