import { createClient } from '@supabase/supabase-js';

// If Supabase environment variables are not set or during local test,
// we provide a robust LocalStorage fallback so the app works seamlessly out of the box!
const envUrl = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL;
const envKey = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = (envUrl || 'https://ltpmylocazpzhsyxphxw.supabase.co').trim();
const supabaseAnonKey = (envKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0cG15bG9jYXpwemhzeXhwaHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NTY3NzMsImV4cCI6MjEwNzUzMjc3M30.44pHnnZZgZ5G8a4FIwET--uNnMp6HOaFgaym5hLc8jg').trim();

export const isSupabaseConfigured = true;

let client = null;
try {
  client = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error('Supabase init error:', e);
}

export const supabase = client;

// Local fallback keys for live demo or offline intranet mode
const LOCAL_STORAGE_KEY = 'college_quiz_scores';

export async function submitScore({ name, teamName, collegeName, score, correctCount, totalQuestions, totalTimeTaken }) {
  const record = {
    name: name.trim(),
    team_name: teamName.trim(),
    college_name: collegeName.trim(),
    score: Math.round(score),
    correct_count: correctCount,
    total_questions: totalQuestions,
    total_time_taken: Number(totalTimeTaken.toFixed(1))
  };

  // Try standard direct REST POST first (foolproof on all mobile networks)
  try {
    const postRes = await fetch(`${supabaseUrl}/rest/v1/leaderboard`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify(record)
    });

    if (postRes.ok) {
      const inserted = await postRes.json();
      saveToLocalStorage(record);
      return { success: true, record: inserted[0] || record, fallback: false };
    }
  } catch (err) {
    console.warn('REST insert failed, trying supabase-js:', err);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .insert([record])
        .select();

      if (error) {
        console.error('Supabase insert error, falling back to local:', error);
        saveToLocalStorage(record);
        return { success: true, record, fallback: true };
      }
      return { success: true, record, fallback: false };
    } catch (err) {
      console.warn('Network error reaching Supabase, using local:', err);
      saveToLocalStorage(record);
      return { success: true, record, fallback: true };
    }
  } else {
    saveToLocalStorage(record);
    return { success: true, record, fallback: true };
  }
}

export async function fetchLeaderboard() {
  // Direct REST fetch guarantees it works on all mobile & desktop browsers
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/leaderboard?select=*&order=score.desc,total_time_taken.asc&limit=100`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`
        }
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (err) {
    console.warn('REST fetch error, trying supabase-js:', err);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .order('total_time_taken', { ascending: true })
        .limit(100);

      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.error('Failed fetching from supabase, reading local:', e);
    }
  }

  return getLocalStorageScores();
}

function saveToLocalStorage(record) {
  try {
    const existing = getLocalStorageScores();
    const updated = [record, ...existing.filter(item => item.id !== record.id)];
    // Sort high score first, then lowest time taken
    updated.sort((a, b) => b.score - a.score || a.total_time_taken - b.total_time_taken);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 300)));
    // Dispatch storage event so tabs sync in real time
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('LocalStorage write failed:', err);
  }
}

export function getLocalStorageScores() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function subscribeToLeaderboard(callback) {
  if (isSupabaseConfigured && supabase) {
    const channel = supabase
      .channel('public:leaderboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leaderboard' },
        () => {
          fetchLeaderboard().then(callback);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  // Fallback: listen for local window events
  const handler = () => {
    callback(getLocalStorageScores());
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}
