import React from 'react';

export default function ResultScreen({ result, participant, onRetake, onViewLeaderboard }) {
  const percentage = Math.round((result.correctCount / result.totalQuestions) * 100);

  return (
    <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="clean-panel" style={{ padding: '2.25rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem' }}>
          Quiz Complete
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          {participant.teamName} ({participant.name}, {participant.collegeName})
        </p>

        {/* Minimal metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem 0.5rem', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{result.score}</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem 0.5rem', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Correct</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{result.correctCount} / {result.totalQuestions}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{percentage}%</div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem 0.5rem', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Time Taken</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{result.totalTimeTaken}s</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button className="btn-primary" onClick={onViewLeaderboard}>
            View Leaderboard
          </button>
          <button className="btn-secondary" onClick={onRetake}>
            Submit Another Entry
          </button>
        </div>
      </div>
    </div>
  );
}
