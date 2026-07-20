# Surya Portfolio — Design Specification

**Date:** 2026-07-11  
**Status:** Approved for implementation  
**Stack:** Next.js App Router, Vercel, shadcn/ui, Aceternity UI, Magic UI, GSAP

## Decisions (resolved)

| Decision | Choice |
|---|---|
| Navbar | Aceternity Resizable Navbar (desktop) + shadcn Sheet (mobile) |
| Skiper Pro | Free/open only — patterns referenced, not purchased |
| Case study content | Structured MDX placeholders for Infer360, SkinCare AI, iSpeak AI |
| Hero video | v1 canvas-only background (no video loop) |

## Design system

Dark mode (Santoryu) and light mode (Claude-cream) tokens as defined in the approved plan. Signal-color rule: accent only on CTAs, active nav, stats, cursor glow, focus rings.

## Architecture

Hexagonal: src/domain, src/application, src/adapters/content, src/components, src/content/case-studies.

## Routes

/ (high motion), /work (hover), /work/[slug] (calm), /about (calm).

## Accessibility

prefers-reduced-motion disables GSAP, cursor, canvas. No licensed One Piece IP.
