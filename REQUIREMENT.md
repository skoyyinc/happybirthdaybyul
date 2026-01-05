This design document is optimized for **Claude 4.5 Sonnet**, utilizing modern 2026 web standards and lightweight libraries to ensure the site is "extra" without being bloated.

---

## 🎂 Project Overview: "The Birthday Surprise"

**Objective:** A high-energy, interactive single-page application (SPA) to celebrate a birthday.
**Vibe:** Primarly **Sunflower Yellow (#FFD700)**, playful, romantic, and immersive.
**Tech Stack:** * **Framework:** Vite + React (Lightweight, fast HMR).

* **Styling:** Tailwind CSS (for rapid UI).
* **Animations:** Framer Motion (Parallax & transitions).
* **Effects:** `canvas-confetti` for the "Age Up" celebration.

---

## 🎨 Visual Identity & Assets

| Element | Specification |
| --- | --- |
| **Primary Palette** | Yellow (#FFD700), Cream (#FFFBEB), Soft Pink (#F472B6). |
| **Typography** | Rounded, friendly fonts (e.g., 'Quicksand' or 'Gaegu'). |
| **Imagery** | 10+ Photo Placeholders labeled `photo_1.jpg` through `photo_10.jpg`. |
| **Icons** | Lucide-react (Hearts, Cakes, Stars, Candles). |

---

## 🛠 Functional Requirements for Coding Agent

### 1. The Scroll/Parallax Journey

The page should be a long-scroll experience where photos don't just sit there—they float.

* **Implementation:** Use `useScroll` and `useTransform` from Framer Motion.
* **Effect:** As she scrolls, images should move at different speeds (parallax) and rotate slightly (playful).
* **Floating Elements:** Randomly floating SVG hearts and stars in the background.

### 2. Interactive Components

* **Birthday Cake Section:** A central SVG cake. Clicking the candles "blows them out" (they disappear with a smoke puff animation).
* **Photo Wall:** A CSS Grid with staggered entrance animations (`framer-motion` variants) so photos "pop" into view as they enter the viewport.

### 3. The "Age Up" Logic (The Grand Finale)

This is a multi-step modal interaction located at the bottom of the page.

1. **Trigger:** A big, bouncy button labeled **"Ready to Age Up?"**
2. **The Modal:** Opens a "Terms & Conditions" screen.
* **The List:** Must include 5+ silly checkboxes (e.g., "I agree to receive 365 days of forehead kisses," "I promise to stay this cute forever").
* **Validation:** The "Confirm Age Up" button remains **disabled** until every single checkbox is ticked.


3. **The Celebration:** Upon clicking "Confirm," trigger a full-screen confetti blast using `canvas-confetti`.

### 4. Deployment Readiness

* **Structure:** Create a clean `dist` folder output.
* **Config:** Set up `vite.config.js` for base paths compatible with GitHub Pages (`base: '/repo-name/'`).

---

## 📝 Prompt for Claude 4.5 Sonnet

> "Claude, please build a React application based on this design document. Use **Tailwind CSS** for styling and **Framer Motion** for animations. The site should be a single-page parallax experience in vibrant yellow. Please include a `components/` folder with `PhotoSection.jsx`, `CakeSection.jsx`, and `AgeUpModal.jsx`. Ensure the 'Age Up' logic requires all checkboxes to be checked before the confetti triggers. Use `https://picsum.photos/400/600` as placeholders for the images."

