# ProfileRank AI (MVP Scaffold)

## When can I see the frontend?
You can already see the visual frontend **now**.

### Fastest visual preview (no login needed)
- Open `/` (landing page)
- Open `/pricing`
- Open `/demo` for a static report walkthrough

### Full app preview (with auth + data)
1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL`, `NEXTAUTH_SECRET`
3. Run Prisma migration
4. Start dev server

## Local run
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Then open `http://localhost:3000`.

## Current state
- Auth, onboarding, audit route, results view, refine controls
- Pricing/account and mock billing flow
- CI + screenshots workflow scaffolding

## Next implementation focus
- Paddle checkout and webhook verification
- Export (text/PDF)
- Unit/integration tests
- UX polish and loading/error states
