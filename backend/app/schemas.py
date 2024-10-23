# app/schemas.py

from pydantic import BaseModel
from datetime import date
from typing import List


class HabitProgressBase(BaseModel):
    date: date
    minutes: int


class HabitProgressCreate(HabitProgressBase):
    pass


class HabitProgress(HabitProgressBase):
    id: int

    class Config:
        from_attributes = True  # Updated for Pydantic v2


class HabitBase(BaseModel):
    name: str
    goal_minutes: int


class HabitCreate(HabitBase):
    pass


class Habit(HabitBase):
    id: int
    progress: List[HabitProgress] = []

    class Config:
        from_attributes = True  # Updated for Pydantic v2
