This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

Developed a mobile-first full-stack Pokédex web app that lets users explore and interact with Pokémon data through an AI-powered interface. The frontend, hosted on Vercel and developed with Next.js, TypeScript, and Tailwind CSS, provides a responsive and dynamic Pokédex-like experience.

The backend, built with Flask, integrates OpenAI’s API to generate natural Pokémon responses and uses pandas for structured data handling from a CSV-based Pokédex dataset. Hosted on Render, the backend communicates securely with the Vercel-hosted frontend via configured CORS to handle cross-origin requests.

## Note

The backend is hosted on Render’s free tier, which may go into “sleep mode” when not in use. If the server has been idle, the first request may take 10–30 seconds to wake up before responding. After that, performance is normal.

**Backend Github:** https://github.com/Spruneda134/pokedex-backend

