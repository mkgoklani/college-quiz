import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QUESTIONS } from '../data/questions';

const QUESTION_TIME_SECONDS = 10;

export default function QuizRunner({ participant, onQuizComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const startTimeRef = useRef(Date.now());
  const timerRef = useRef(null);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  useEffect(() => {
    setTimeLeft(QUESTION_TIME_SECONDS);
    setSelectedOption(null);
    setIsAnswered(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedOption(-1);

    setTimeout(() => {
      goToNextQuestion(0, false);
    }, 1000);
  };

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);
    setIsAnswered(true);
    setSelectedOption(idx);

    const isCorrect = idx === currentQuestion.answer;
    let earnedPoints = 0;
    if (isCorrect) {
      earnedPoints = 50 + Math.round((timeLeft / QUESTION_TIME_SECONDS) * 50);
      setTotalScore((prev) => prev + earnedPoints);
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      goToNextQuestion(earnedPoints, isCorrect);
    }, 1100);
  };

  const handleFinishEarly = () => {
    if (window.confirm('Finish and submit your score now?')) {
      clearInterval(timerRef.current);
      const totalTimeSeconds = (Date.now() - startTimeRef.current) / 1000;
      onQuizComplete({
        score: totalScore,
        correctCount: correctCount,
        totalQuestions: QUIZ_QUESTIONS.length,
        totalTimeTaken: totalTimeSeconds
      });
    }
  };

  const goToNextQuestion = (earnedPoints, isCorrect) => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const totalTimeSeconds = (Date.now() - startTimeRef.current) / 1000;
      onQuizComplete({
        score: totalScore + earnedPoints,
        correctCount: correctCount + (isCorrect ? 1 : 0),
        totalQuestions: QUIZ_QUESTIONS.length,
        totalTimeTaken: totalTimeSeconds
      });
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Participant info header */}
      <div
        className="clean-panel"
        style={{
          padding: '0.85rem 1.25rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{participant.teamName}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginLeft: '0.5rem' }}>
            ({participant.name}, {participant.collegeName})
          </span>
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Score: {totalScore}
        </div>
      </div>

      {/* Main Question Box */}
      <div className="clean-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span className="category-badge">
            {currentQuestion.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </span>
        </div>

        {/* Timer Line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span>Timer</span>
          <span>{timeLeft}s</span>
        </div>
        <div className="timer-container" style={{ marginBottom: '1.5rem' }}>
          <div
            className="timer-fill"
            style={{ width: `${(timeLeft / QUESTION_TIME_SECONDS) * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {currentQuestion.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            let optionClass = 'option-btn';

            if (isAnswered) {
              if (idx === currentQuestion.answer) {
                optionClass += ' correct';
              } else if (idx === selectedOption) {
                optionClass += ' wrong';
              }
            } else if (selectedOption === idx) {
              optionClass += ' selected';
            }

            return (
              <button
                key={idx}
                className={optionClass}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
              >
                <span className="option-letter">{letter}</span>
                <span style={{ flex: 1 }}>{option}</span>
              </button>
            );
          })}
        </div>

        {isAnswered && currentQuestion.explanation && (
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'var(--bg-subtle)',
              borderLeft: '3px solid var(--text-primary)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}
          >
            {currentQuestion.explanation}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <button
            onClick={handleFinishEarly}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.825rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Finish & Submit Score Now
          </button>
        </div>
      </div>
    </div>
  );
}
