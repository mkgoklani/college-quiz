import { createClient } from '@supabase/supabase-js';

// If Supabase environment variables are not set or during local test,
// we provide a robust LocalStorage fallback so the app works seamlessly out of the box!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback keys for live demo or offline intranet mode
const LOCAL_STORAGE_KEY = 'college_quiz_scores';

export async function submitScore({ name, teamName, collegeName, score, correctCount, totalQuestions, totalTimeTaken }) {
  const record = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    name: name.trim(),
    team_name: teamName.trim(),
    college_name: collegeName.trim(),
    score: Math.round(score),
    correct_count: correctCount,
    total_questions: totalQuestions,
    total_time_taken: Number(totalTimeTaken.toFixed(1)),
    created_at: new Date().toISOString()
  };

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

  // Fallback to local
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
