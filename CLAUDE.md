# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Birthday Surprise" - an interactive single-page React application designed as a birthday celebration experience. The site features a long-scroll parallax journey with photos, interactive elements, and a playful "Age Up" ceremony with confetti.

**Primary Tech Stack:**
- Vite + React
- Tailwind CSS
- Framer Motion (parallax & transitions)
- canvas-confetti (celebration effects)
- Lucide-react (icons)

**Visual Identity:**
- Primary color: Sunflower Yellow (#FFD700)
- Accent colors: Cream (#FFFBEB), Soft Pink (#F472B6)
- Typography: Rounded, friendly fonts (Quicksand or Gaegu)
- Playful, romantic, and immersive vibe

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint (if configured)
npm run lint
```

## Architecture Overview

### Component Structure

The application is organized into three main interactive components:

1. **PhotoSection.jsx** - Photo wall with staggered entrance animations using Framer Motion variants. Photos should "pop" into view as they enter the viewport.

2. **CakeSection.jsx** - Interactive SVG birthday cake where users can click candles to "blow them out" (disappear with smoke puff animation).

3. **AgeUpModal.jsx** - Multi-step modal interaction:
   - Triggered by "Ready to Age Up?" button
   - Shows "Terms & Conditions" with 5+ silly checkboxes
   - "Confirm Age Up" button is disabled until ALL checkboxes are checked
   - Triggers full-screen confetti blast on confirmation

### Animation System

**Parallax Effects:**
- Use Framer Motion's `useScroll` and `useTransform` hooks
- Images move at different speeds during scroll
- Elements should rotate slightly for playful effect
- Background contains randomly floating SVG hearts and stars

**Photo Animations:**
- Staggered entrance using Framer Motion variants
- Trigger animations on viewport intersection

### Image Placeholders

Images are labeled `photo_1.jpg` through `photo_10.jpg`. During development, use `https://picsum.photos/400/600` as placeholders.

## Deployment Configuration

**Vite Config for GitHub Pages:**
```javascript
// vite.config.js
export default {
  base: '/repo-name/', // Update with actual repo name
  // ... other config
}
```

Build output goes to `dist/` folder for static hosting.

## Key Implementation Details

**Age Up Modal Validation:**
- The confirm button must remain disabled until every checkbox is checked
- Track checkbox states to control button enablement
- Use canvas-confetti for celebration effect after confirmation

**Parallax Implementation:**
- Each photo section should have different scroll speeds
- Combine translateY and rotate transforms for dynamic feel
- Keep performance in mind - use transform instead of top/left

**Interactive Cake:**
- SVG-based candle elements with click handlers
- Animate candle disappearance with opacity + scale
- Optional: Add smoke particle effect on blow
