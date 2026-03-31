// lib/habitService.ts

export interface Habit {
  id: string;
  name: string;
}

export interface ChecklistItem {
  id: string;
  habitId: string;
  completed: boolean;
  date: string; // ISO date string, e.g., '2023-10-01'
}

export interface AppData {
  habits: Habit[];
  checklist: ChecklistItem[];
  coins: number;
  lastUpdated: string; // ISO date string
}

import { defaultStorage } from './storage';

const COINS_PER_HABIT = 10;

// Utility to get today's date as ISO string (YYYY-MM-DD)
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Utility to check if it's a new day
function isNewDay(lastUpdated: string): boolean {
  return lastUpdated !== getTodayDate();
}

// Save data to storage
export function saveData(data: AppData): void {
  defaultStorage.save(data);
}

// Load data from storage
export function loadData(): AppData | null {
  return defaultStorage.load();
}

// Generate daily checklist from habits
export function generateChecklist(habits: Habit[]): ChecklistItem[] {
  const today = getTodayDate();
  return habits.map((habit) => ({
    id: crypto.randomUUID(),
    habitId: habit.id,
    completed: false,
    date: today,
  }));
}

// Init app: load data, create checklist if new day
export function initApp(): AppData {
  let data = loadData();
  const today = getTodayDate();

  if (!data) {
    // First time: initialize empty
    data = {
      habits: [],
      checklist: [],
      coins: 0,
      lastUpdated: today,
    };
  } else if (isNewDay(data.lastUpdated)) {
    // New day: generate new checklist
    data.checklist = generateChecklist(data.habits);
    data.lastUpdated = today;
  }

  // Save the updated data
  saveData(data);
  return data;
}

// Create a new habit
export function createHabit(name: string): Habit[] {
  const data = loadData() || initApp();
  const newHabit: Habit = {
    id: crypto.randomUUID(),
    name: name.trim(),
  };
  data.habits.push(newHabit);
  saveData(data);
  return data.habits;
}

// Toggle habit completion
export function toggleHabit(habitId: string): { checklist: ChecklistItem[]; coins: number } {
  const data = loadData() || initApp();
  const item = data.checklist.find((c) => c.habitId === habitId && c.date === getTodayDate());

  if (!item) {
    throw new Error('Checklist item not found for today');
  }

  if (!item.completed) {
    item.completed = true;
    data.coins += COINS_PER_HABIT;
    saveData(data);
  }
  // If already completed, do nothing

  return { checklist: data.checklist, coins: data.coins };
}