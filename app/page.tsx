'use client';

import { useState } from 'react';
import { initApp } from '../lib/habitService';
import Link from 'next/link';

export default function Home() {
  const [appData, setAppData] = useState(() => initApp());

  if (!appData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1f2937',
          letterSpacing: '-0.5px',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          <span style={{ color: '#3b82f6' }}>habit</span>
          <span style={{ color: '#6b7280' }}>-</span>
          <span style={{ color: '#10b981' }}>to</span>
        </div>
        <div style={{
          backgroundColor: '#f59e0b',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          🪙 {appData.coins} Coins
        </div>
      </div>
      <Link href="/habits" className="text-blue-500 underline">
        Manage Habits
      </Link>
      <h2 className="text-xl mt-4">Today&apos;s Checklist</h2>
      <div style={{ marginTop: '20px' }}>
        {appData.checklist.length === 0 ? (
          <p>No habits to check today. Add some habits first!</p>
        ) : (
          <div style={{ maxWidth: '600px' }}>
            {appData.checklist.map((item) => {
              const habit = appData.habits.find(h => h.id === item.habitId);
              return (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: item.completed ? '#f0f9ff' : 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    fontSize: '24px',
                    marginRight: '15px'
                  }}>
                    {item.completed ? '✅' : '❌'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600' }}>
                      {habit?.name || 'Unknown Habit'}
                    </h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                      {item.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
