import React, { useState, useEffect } from 'react';
import { fetchLeaderboard, subscribeToLeaderboard, isSupabaseConfigured } from '../lib/leaderboardClient';

export default function LeaderboardDashboard({ onBackToQuiz, onOpenQRModal }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLeaderboard();
    setScores(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToLeaderboard((updatedScores) => {
      setScores(updatedScores || []);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ maxWidth: '860px', margin: '2.5rem auto', padding: '0 1rem' }}>
      {/* Header bar */}
      <div
        className="clean-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Leaderboard
          </h1>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Innovathon 2026 Rankings ({scores.length} entries)
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onOpenQRModal}
            className="nav-btn"
            style={{ border: '1px solid var(--border-light)' }}
          >
            Show QR Code
          </button>

          <button
            onClick={loadData}
            className="nav-btn"
            style={{ border: '1px solid var(--border-light)' }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>

          <button
            onClick={onBackToQuiz}
            className="btn-primary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', width: 'auto' }}
          >
            Take Quiz
          </button>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}
        >
          Local storage mode active. Connect Supabase keys in .env for cross-device live sync.
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="clean-panel" style={{ padding: '0.5rem', overflowX: 'auto' }}>
        {scores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No submissions recorded yet.
          </div>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>Team</th>
                <th>Participant & College</th>
                <th style={{ textAlign: 'center' }}>Correct</th>
                <th style={{ textAlign: 'center' }}>Time</th>
                <th style={{ textAlign: 'right' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((item, index) => {
                const rank = index + 1;
                return (
                  <tr key={item.id || index}>
                    <td>
                      <span className={`rank-indicator ${rank === 1 ? 'top-1' : ''}`}>
                        {rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.team_name}
                      </div>
                    </td>
                    <td>
                      <div style={{ color: 'var(--text-secondary)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.college_name}</div>
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                      {item.correct_count} / {item.total_questions || 35}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      {item.total_time_taken}s
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
