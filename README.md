# AI Event Concierge

A full-stack AI-powered platform that helps users plan corporate offsites. Describe your event in plain English and get a structured venue proposal — instantly.

Built as a take-home assignment for a Full Stack Engineer Intern role.

---

## Live Demo

> Deployed on Vercel: `https://ai-event-concierge.vercel.app`

---

## What It Does

- Takes a natural language event description (e.g. *"10-person leadership retreat in the mountains, 3 days, $4k budget"*)
- Sends it to an LLM which returns a structured venue proposal with Venue Name, Location, Estimated Cost, and a "Why it fits" justification
- Saves every request and response to a PostgreSQL database
- Displays the latest proposal and full search history — history persists on page refresh

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 14 (App Router) + TypeScript | Full-stack in one repo, no separate backend needed |
| Styling | Tailwind CSS | Utility-first, fast to build production UI |
| Animations | Framer Motion | Loading states, card transitions, staggered history list |
| AI | Groq API (`llama-3.3-70b-versatile`) | Free tier, faster than OpenAI/Gemini, reliable JSON output |
| Database | Supabase (PostgreSQL) | Managed Postgres with a clean JS client, free tier |
| Deployment | Vercel | Zero-config Next.js deployment |

### Why No Separate Backend?

Next.js API Routes (`/app/api/...`) act as the backend. For a project of this scope — two endpoints, one developer, 48 hours — a separate Express or FastAPI server would add CORS configuration, two deployments, and two repos with no real benefit. The API routes run as serverless functions on Vercel and behave identically to a dedicated backend.

### Why Groq over OpenAI/Gemini?

- Completely free, no credit card required
- `llama-3.3-70b` supports `response_format: { type: "json_object" }` — guarantees valid JSON from the model with zero parsing hacks
- Response times are faster than both OpenAI and Gemini on the free tier, which makes the demo feel snappier

---

## Project Structure

```
ai-event-concierge/
├── app/
│   ├── page.tsx                  # Main UI — composes all components
│   ├── layout.tsx
│   └── api/
│       ├── concierge/
│       │   └── route.ts          # POST — calls Groq, saves to Supabase
│       └── history/
│           └── route.ts          # GET — fetches all past searches
├── components/
│   ├── SearchBox.tsx             # Input textarea + Plan it button + loading bar
│   ├── ProposalCard.tsx          # Animated venue proposal card
│   └── HistoryList.tsx           # Previous searches list with timeAgo
├── lib/
│   ├── groq.ts                   # Groq client singleton
│   └── supabase.ts               # Supabase client singleton
└── .env.local                    # Environment variables (never commit this)
```

---

## Database Schema

Run this in your Supabase project under **SQL Editor**:

```sql
create table searches (
  id uuid default gen_random_uuid() primary key,
  user_query text not null,
  venue_name text,
  location text,
  estimated_cost text,
  why_it_fits text,
  created_at timestamptz default now()
);
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-event-concierge.git
cd ai-event-concierge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```bash
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

| Variable | Where to get it |
|----------|----------------|
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → API Keys |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API → anon public key |

### 4. Set up the database

Go to your Supabase project → SQL Editor → paste and run the schema from above.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Reference

### `POST /api/concierge`

Takes a natural language event description and returns an AI-generated venue proposal.

**Request body:**
```json
{
  "query": "10-person leadership retreat in the mountains for 3 days with a $4k budget"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_query": "10-person leadership retreat...",
    "venue_name": "The Pine Ridge Lodge",
    "location": "Blue Ridge Mountains, Virginia",
    "estimated_cost": "~$3,800",
    "why_it_fits": "A secluded 12-room mountain lodge with dedicated conference space...",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

### `GET /api/history`

Returns the last 20 searches ordered by most recent.

**Response:**
```json
{
  "success": true,
  "data": [ ...array of search records ]
}
```

---

## How the AI Works

The Groq API call uses `response_format: { type: "json_object" }` which forces the model to return valid JSON — no regex parsing, no error-prone string manipulation. The system prompt instructs the model to return exactly four keys: `venue_name`, `location`, `estimated_cost`, and `why_it_fits`. The response is parsed with `JSON.parse()` and saved directly to Supabase.

```
User query → Groq (llama-3.3-70b) → Structured JSON → Supabase → Frontend
```

---

## Deployment

This project is deployed on Vercel. To deploy your own copy:

```bash
npm install -g vercel
vercel
```

Add the same three environment variables in your Vercel project settings under **Settings → Environment Variables**.

---

## Author

**Arpit Yadav**  
B.Sc. Computer Science (Final Year)  
[Portfolio](https://qzseeker.vercel.app) · [GitHub](https://github.com/your-username)