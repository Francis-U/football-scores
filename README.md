# Football Scores
JavaScript-only Next.js App Router + Tailwind CSS project, organised into reusable components.

## Run
Requires Node.js 20.9+.
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Structure
- `src/app/page.js`: dashboard composition only
- `src/components/layout`: site header and fixtures/tables panel
- `src/components/matches`: fixture row and match centre
- `src/components/standings`: group table
- `src/components/leaderboards`: goals and assists
- `src/components/ads`: rotating banner and sticky advert rail
- `src/lib/data.js`: demo teams, fixtures, events, adverts
- `src/lib/football.js`: match sorting and group standings calculations

Each group has four teams and six round-robin matches. Knockout format: Group A 1st vs Group B 2nd, Group B 1st vs Group A 2nd, then winners meet in the final. Sample data only; live clock derives from `startedAt`, while real score/event updates require a backend feed.
