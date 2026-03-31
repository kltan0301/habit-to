'use client'

import { useState } from 'react'

export default function HabitsPage() {
  const [showForm, setShowForm] = useState(false)
  const [habit, setHabit] = useState({
    name: '',
    target: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New habit:', habit)

    // reset + close
    setHabit({ name: '', target: '' })
    setShowForm(false)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>habbit - to</h1>

      {/* + Button */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          fontSize: '24px',
          padding: '10px 16px',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        +
      </button>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div>
            <input
              type="text"
              placeholder="Habit name (e.g. Exercise)"
              value={habit.name}
              onChange={(e) =>
                setHabit({ ...habit, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Target (e.g. 30 mins)"
              value={habit.target}
              onChange={(e) =>
                setHabit({ ...habit, target: e.target.value })
              }
              required
            />
          </div>
          
          <div>
            <button type="submit">Create Habit</button>
          </div>

          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
          

        </form>
      )}
    </div>
  )
}