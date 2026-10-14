import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

export default function QRModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [quizUrl, setQuizUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.origin;
      setQuizUrl(url);

      if (isOpen && canvasRef.current) {
        QRCode.toCanvas(
          canvasRef.current,
          url,
          {
            width: 220,
            margin: 2,
            color: {
              dark: '#1c1917',
              light: '#ffffff'
            }
          },
          (error) => {
            if (error) console.error('QR code generation error:', error);
          }
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(quizUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(28, 25, 23, 0.4)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="clean-panel"
        style={{
          maxWidth: '380px',
          width: '100%',
          padding: '1.75rem',
          textAlign: 'center',
          position: 'relative',
          background: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            fontSize: '1.1rem',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          &times;
        </button>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem' }}>
          Scan to Enter Quiz
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
          Point camera to join from mobile device
        </p>

        <div
          style={{
            background: '#ffffff',
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            display: 'inline-block',
            marginBottom: '1.25rem'
          }}
        >
          <canvas ref={canvasRef} />
        </div>

        <div
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            fontSize: '0.8rem'
          }}
        >
          <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {quizUrl}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
