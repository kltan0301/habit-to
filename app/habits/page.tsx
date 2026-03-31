'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { createHabit, initApp, Habit } from '../../lib/habitService'

export default function HabitsPage() {
  const [showForm, setShowForm] = useState(false)
  const [habit, setHabit] = useState({
    name: '',
  })
  const [habits, setHabits] = useState<Habit[]>(() => initApp().habits)
  const [petHappiness, setPetHappiness] = useState(3) // Start at neutral (3/5)

  // Update pet happiness based on habits
  React.useEffect(() => {
    const happinessLevel = Math.min(5, Math.max(1, Math.floor(habits.length / 2) + 1))
    setPetHappiness(happinessLevel)
  }, [habits])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createHabit(habit.name)
    const data = initApp()
    setHabits(data.habits)

    // Increase pet happiness when creating habits
    setPetHappiness(prev => Math.min(5, prev + 1))

    // reset + close
    setHabit({ name: '' })
    setShowForm(false)
  }

  // Pet image mappings for each happiness level
  const getPetDisplay = (level: number) => {
    const pets = {
      1: { image: '/leaf-sad.png', color: '#8B5CF6', name: 'Very Sad' },
      2: { image: '/leaf-tired.png', color: '#EF4444', name: 'Sad' },
      3: { image: '/leaf-neutral.png', color: '#F59E0B', name: 'Neutral' },
      4: { image: '/leaf-happy.png', color: '#10B981', name: 'Happy' },
      5: { image: '/leaf-happy.png', color: '#3B82F6', name: 'Very Happy' } // Reusing happy for max level
    }
    return pets[level as keyof typeof pets] || pets[3]
  }

  const currentPet = getPetDisplay(petHappiness)

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

      {/* Cute Pet Display */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '40px',
        backgroundColor: '#fef7ed',
        borderRadius: '20px',
        border: '3px solid #fed7aa',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        maxWidth: '400px',
        margin: '30px auto'
      }}>
        <img
          src={currentPet.image}
          alt={`Pet - ${currentPet.name}`}
          style={{
            width: '160px',
            height: '160px',
            marginBottom: '16px',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}
        />
        <div style={{
          fontSize: '24px',
          fontWeight: '700',
          color: currentPet.color,
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Your Pet
        </div>
        <div style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '12px',
          fontWeight: '500'
        }}>
          Happiness Level: {petHappiness}/5
        </div>
        <div style={{
          display: 'flex',
          gap: '6px'
        }}>
          {[1, 2, 3, 4, 5].map(level => (
            <div
              key={level}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: level <= petHappiness ? currentPet.color : '#e5e7eb',
                border: '2px solid #d1d5db',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#9ca3af',
          marginTop: '12px',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          {currentPet.name} • Create habits to make me happier! 🌱
        </div>
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