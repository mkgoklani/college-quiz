import React, { useState } from 'react';

export default function RegisterScreen({ onStartQuiz, onNavigateToLeaderboard }) {
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !teamName.trim() || !collegeName.trim()) {
      setError('Please fill in all fields to continue.');
      return;
    }
    setError('');
    onStartQuiz({
      name: name.trim(),
      teamName: teamName.trim(),
      collegeName: collegeName.trim()
    });
  };

  return (
    <div style={{ maxWidth: '460px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="clean-panel" style={{ padding: '2rem 1.75rem' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '0.35rem' }}>
            Innovathon 2026 Quiz
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            35 questions, 10 seconds per question.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: 'var(--accent-wrong-bg)',
              border: '1px solid var(--accent-wrong-border)',
              color: 'var(--accent-wrong)',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.25rem',
              fontSize: '0.85rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              Team Name
            </label>
            <input
              type="text"
              placeholder="e.g. Byte Busters"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              College or School Name
            </label>
            <input
              type="text"
              placeholder="e.g. BIT Durg"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="form-input"
            />
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.75rem',
              marginTop: '0.25rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45
            }}
          >
            Each question has a 10-second timer. Points are awarded based on speed and correctness.
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            Start Quiz
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <button
            onClick={onNavigateToLeaderboard}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.825rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            View Live Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
