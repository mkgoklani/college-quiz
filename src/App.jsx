import React, { useState } from 'react';
import RegisterScreen from './components/RegisterScreen';
import QuizRunner from './components/QuizRunner';
import ResultScreen from './components/ResultScreen';
import LeaderboardDashboard from './components/LeaderboardDashboard';
import QRModal from './components/QRModal';
import { submitScore } from './lib/leaderboardClient';

export default function App() {
  const [view, setView] = useState('register'); // 'register' | 'quiz' | 'result' | 'leaderboard'
  const [participant, setParticipant] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleStartQuiz = (data) => {
    setParticipant(data);
    setView('quiz');
  };

  const handleQuizComplete = async (resultData) => {
    setQuizResult(resultData);
    setView('result');

    await submitScore({
      name: participant.name,
      teamName: participant.teamName,
      collegeName: participant.collegeName,
      score: resultData.score,
      correctCount: resultData.correctCount,
      totalQuestions: resultData.totalQuestions,
      totalTimeTaken: resultData.totalTimeTaken
    });
  };

  const handleRetake = () => {
    setView('register');
  };

  return (
    <div className="app-container">
      {/* Clean Header */}
      <header className="app-header">
        <div
          className="brand-badge"
          onClick={() => setView('register')}
        >
          <div>
            <div className="brand-title">Innovathon 2026</div>
            <div className="brand-sub">College Quiz</div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${view === 'register' || view === 'quiz' ? 'active' : ''}`}
            onClick={() => setView('register')}
          >
            Quiz
          </button>
          <button
            className={`nav-btn ${view === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setView('leaderboard')}
          >
            Leaderboard
          </button>
          <button
            className="nav-btn"
            onClick={() => setIsQRModalOpen(true)}
          >
            QR Code
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
        {view === 'register' && (
          <RegisterScreen
            onStartQuiz={handleStartQuiz}
            onNavigateToLeaderboard={() => setView('leaderboard')}
          />
        )}

        {view === 'quiz' && participant && (
          <QuizRunner
            participant={participant}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {view === 'result' && quizResult && participant && (
          <ResultScreen
            result={quizResult}
            participant={participant}
            onRetake={handleRetake}
            onViewLeaderboard={() => setView('leaderboard')}
          />
        )}

        {view === 'leaderboard' && (
          <LeaderboardDashboard
            onBackToQuiz={() => setView('register')}
            onOpenQRModal={() => setIsQRModalOpen(true)}
          />
        )}
      </main>

      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
}
