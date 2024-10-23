# app/models.py

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    goal_minutes = Column(Integer, nullable=False)

    # Relationships
    progress = relationship(
        "HabitProgress",
        back_populates="habit",
        cascade="all, delete-orphan",  # Ensures related HabitProgress records are deleted
    )


class HabitProgress(Base):
    __tablename__ = "habit_progress"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"), nullable=False)
    date = Column(Date, nullable=False)
    minutes = Column(Integer, default=0)

    # Relationships
    habit = relationship("Habit", back_populates="progress")
