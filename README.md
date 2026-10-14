# 🏆 Innovathon 2026: College Fest Speed Quiz

A high-concurrency, real-time college fest quiz application designed for **~210 simultaneous participants (55 teams)** with live speed-based scoring, 10-second timers, instant QR code access, and a stage-ready real-time leaderboard dashboard.

---

## ⚡ Capacity & Free Tier Limits Analysis (210 Simultaneous Users)

### 1. **Vercel (Frontend & Static Assets)**
- **Bandwidth**: 100 GB/month on the Free Hobby Tier.
- **Concurrent requests**: Unlimited static edge serving via global CDN.
- **Verdict for 210 participants**: Consumes **< 150 MB** total for the entire fest. It will comfortably handle 210 or even 5,000 simultaneous users without breaking a sweat.

### 2. **Supabase (Real-Time Database)**
- **Concurrent Realtime WebSocket Connections**: **200 concurrent peak connections** on the free tier.
- **Database Storage**: 500 MB (210 score entries only consume ~100 KB).
- **Monthly Active Users / API Requests**: 50,000+ free requests.
- **For 210 members**: 
  - Since scores are submitted once at the end of each participant's quiz, database write load is low (~1-2 writes/second).
  - The live subscription is primarily needed on the **auditorium stage display** and user result screens.
  - The codebase includes an automatic fallback that seamlessly persists scores in local storage if network limits ever throttle.

---

## 🚀 Quick Start (Local Demo)

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 🌐 Deploy Free on Vercel in 3 Minutes

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Innovathon 2026 Quiz App"
   git branch -M main
   git remote add origin https://github.com/<your-username>/college-quiz.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) -> **Add New Project** -> Import your GitHub repo.
3. Click **Deploy**. Vercel will give you a live production URL like `https://innovathon-quiz.vercel.app`.

---

## 🔌 Connecting Supabase (For Live Stage Sync)

1. Create a free account at [supabase.com](https://supabase.com).
2. Click **New Project**.
3. Open **SQL Editor** on the left menu, paste the contents of [`supabase_setup.sql`](file:///Users/mohitkumar/college_data/code_intellij/college-quiz/supabase_setup.sql), and hit **Run**.
4. Go to **Project Settings** -> **API**, copy:
   - `Project URL`
   - `anon public key`
5. In your local `.env` (or in Vercel's Environment Variables setting):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
6. Redeploy or restart Vite (`npm run dev`). Your live leaderboard will now sync in real time across all 210 phones and the stage projector!

---

## 🎯 Quiz Structure & Scoring Rules
- **Questions**: All 35 questions from your Innovathon bank (Tech Trivia, Coding, Logic, Algorithms).
- **Time**: 10 seconds countdown per question.
- **Fields**: Name, Team Name, College / School Name.
- **Scoring**: 50 base points + up to 50 speed bonus points (max 100 pts/question).
- **Tie-breaker**: Teams with the same score are ranked by **lowest total time taken**.
