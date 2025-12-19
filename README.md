# SkillSprint Pro (PWA)

**Word elke dag in 2 minuten beter** — met micro-skills, directe AI-coaching (offline heuristiek) en handige tools. Volledig gratis, zonder backend, werkt offline via `service worker` en bewaart data in `localStorage`.

## Wat zit erin?
- 30 professionele micro-skills (AI prompting, e-mail & schrijven, meetings, beslissen, data, focus)
- Core loop: uitleg → input → coach feedback (Goed/Beter/Geniaal) → beloning (+40 XP)
- Tools: Email Fixer, Prompt Generator, Agenda Builder, Summary Maker, Decision Helper
- PWA: manifest + service worker, Add to Home Screen, offline caching
- Privacy: geen tracking, geen PII, geen externe calls

## Snel starten
1. Open `index.html` (lokaal) of deploy naar GitHub Pages/Netlify/Vercel.
2. Werk offline: de app cachet kernbestanden automatisch.
3. Data staat in `localStorage`; export/import beschikbaar via Profiel.

## Deploy (GitHub Pages)
- Nieuwe repo → upload alle bestanden (root).
- **Settings → Pages → Source: main / root**.
- Wacht ±1 minuut → je site staat live.

## Aanpassen
- Skills zitten in `app.js` (const `SKILLS`).
- Scoring logica in `scorePrompt`, `scoreEmail`, `scoreAgenda`, `scoreDecision`, `scorePlain`.
- Badges/XP in `BADGES`.

## Roadmap
- Optionele cloud (Supabase) voor multi‑device sync.
- Echte AI via Azure OpenAI (REST) als vervanging van heuristiek.
- Team leaderboard (anoniem), rol `parent/manager` voor inzichten.
