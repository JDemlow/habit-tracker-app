# app/schemas.py

from pydantic import BaseModel, field_serializer
from datetime import date
from typing import List, Optional


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
    today_minutes: Optional[int] = 0  # Add this field if expected by frontend

    class Config:
        from_attributes = True  # Updated for Pydantic v2

    @field_serializer("today_minutes")
    def compute_today_minutes(self, habit: "Habit", **kwargs):
        today = date.today()
        for p in habit.progress:
            if p.date == today:
                return p.minutes
        return 0
