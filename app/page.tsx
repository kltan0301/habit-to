'use client';

import { useState } from 'react';
import { initApp } from '../lib/habitService';

export default function Home() {
  const [appData, setAppData] = useState(() => initApp());

  if (!appData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <p>Coins: {appData.coins}</p>
      <h2 className="text-xl mt-4">Habits</h2>
      <ul>
        {appData.habits.map((habit) => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
      <h2 className="text-xl mt-4">Today&apos;s Checklist</h2>
      <ul>
        {appData.checklist.map((item) => (
          <li key={item.id}>
            {item.completed ? '✅' : '❌'} {appData.habits.find(h => h.id === item.habitId)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
