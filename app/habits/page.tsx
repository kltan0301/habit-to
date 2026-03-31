'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createHabit, initApp, Habit } from '../../lib/habitService'

export default function HabitsPage() {
  const [showForm, setShowForm] = useState(false)
  const [habit, setHabit] = useState({
    name: '',
  })
  const [habits, setHabits] = useState<Habit[]>(() => initApp().habits)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createHabit(habit.name)
    const data = initApp()
    setHabits(data.habits)

    // reset + close
    setHabit({ name: '' })
    setShowForm(false)
  }

  return (
    <div style={{ padding: '2rem' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1f2937',
            letterSpacing: '-0.5px',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#3b82f6' }}>habit</span>
            <span style={{ color: '#6b7280' }}>-</span>
            <span style={{ color: '#10b981' }}>to</span>
          </div>
          
          {/* Back Button */}
          <Link href="/">
            <button
              style={{
                fontSize: '16px',
                padding: '6px 12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'scale(1)';
                (e.target as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              ← Back
            </button>
          </Link>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            fontSize: '18px',
            padding: '8px 16px',
            backgroundColor: showForm ? '#ef4444' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            (e.target as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            (e.target as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          {showForm ? '✕' : '+'}
          <span style={{ fontSize: '14px' }}>
            {showForm ? 'Close' : 'Add Habit'}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <>
          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animated-form {
              animation: slideIn 0.3s ease-out;
            }
          `}</style>
          <div 
            className="animated-form"
            style={{
              marginTop: '20px',
              padding: '24px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="habit-name" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600', 
                    color: '#374151',
                    fontSize: '14px'
                  }}
                >
                  Habit
                </label>
                <input
                  id="habit-name"
                  type="text"
                  placeholder="e.g., Exercise, Read, Meditate"
                  value={habit.name}
                  onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s, transform 0.1s'
                  }}
                  onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
                  onMouseDown={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(0.98)'}
                  onMouseUp={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
                >
                  Create Habit
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Habits List */}
      <div style={{ marginTop: '40px' }}>
        <h2>Your habit-to Journey</h2>
        {habits.length === 0 ? (
          <p>No habits yet. Create your first habit!</p>
        ) : (
          <div style={{ position: 'relative', maxWidth: '600px', marginLeft: '20px', marginTop: '20px' }}>
            {habits.map((h, index) => (
              <div key={h.id} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
                position: 'relative'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  marginRight: '20px',
                  flexShrink: 0
                }}></div>
                <div style={{
                  flex: 1,
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{h.name}</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Habit #{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}