# XpertAuth - Landing Page

## Overview
XpertAuth is a non-profit association landing page that combines human expertise with AI. Founded by José Luis Echezarreta (30 years in special transport). Three pillars: Special Transport Consulting, AI Implementation for SMEs, and Digital Literacy for seniors (free).

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js
- **Routing**: wouter (frontend), Express (API)
- **State Management**: TanStack React Query
- **Animations**: Framer Motion
- **Language**: TypeScript
- **All text**: Spanish (es-ES)

## Architecture
Single-page landing site with 11 sections:
1. Navbar (fixed, Obsidian background)
2. Hero (particle effect background)
3. Problem/Solution (3 cards)
4. Services (bento grid with glow effect)
5. How It Works (4 steps)
6. Pricing / Membership tiers (3 plans)
7. Social Proof / Authority
8. Senior Training (Ember accent)
9. Blog + Newsletter
10. Final CTA
11. Footer

## Color Palette
- Obsidian: #0A0E1A (dark backgrounds)
- XpertBlue: #1B4FD8 (CTAs, primary actions)
- Arctic: #4D9FEC (accents, hover)
- Mist: #F4F6FA (light section backgrounds)
- Ember: #E8620A (senior section, badges)
- Pure: #FFFFFF (text on dark)

## Typography
- Sora: headings (`font-heading`)
- Inter: body text (`font-sans`)
- JetBrains Mono: code/data (`font-mono`)

## API Endpoints
- `POST /api/waitlist` - Join waitlist (name, email, type)
- `POST /api/newsletter` - Newsletter signup (email)

## Key Components
- `client/src/components/navbar.tsx` - Fixed navigation
- `client/src/components/hero.tsx` - Hero with particle canvas
- `client/src/components/problem-solution.tsx` - Problem/Solution cards
- `client/src/components/services.tsx` - Bento grid with glow
- `client/src/components/how-it-works.tsx` - Process steps
- `client/src/components/pricing.tsx` - Membership plans
- `client/src/components/waitlist-modal.tsx` - Waitlist form modal
- `client/src/components/social-proof.tsx` - Stats + testimonials
- `client/src/components/senior-training.tsx` - Senior program section
- `client/src/components/blog-newsletter.tsx` - Blog + newsletter
- `client/src/components/cta-final.tsx` - Final CTA
- `client/src/components/footer.tsx` - Footer

## Storage
Currently using in-memory storage (MemStorage). Future plan: Supabase integration.

## Contact Info
- Web: www.xpertauth.com
- Email: info@xpertauth.com
- Phone: +34 625 897 546
