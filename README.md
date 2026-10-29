# GitHub Editorial Bento Dashboard

A high-contrast, editorial Bento grid dashboard designed to visualize any GitHub developer's profile, contribution metrics, programming languages, and pinned repositories in a single shareable view.

Built with **React 19**, **Tailwind CSS**, and **Framer Motion**, styled according to the official GitHub Green contribution palette and modern Swiss/editorial design principles.

---

## Features

- **Centered Real-Time Profile Search:** Query any public GitHub username instantly with keyboard submission and feedback.
- **Unified Profile Identity Tile:** Merges the developer's avatar, clickable `@username` (opens public GitHub profile), full name, company, member tenure, and a one-click **"Copy Profile Link"** action button.
- **Developer Impact Scorecard:** 2-row editorial feature card computing an impact rating (1.0–5.0) derived from public stars, network forks, community followers, and annual public contributions.
- **Dynamic Overlapping Language Deck:** Visualizes the developer's language distribution across tactile overlapping swatch cards. Automatically scales to the exact number of languages contributed, with smooth hover expansion.
- **Top Pinned Repositories Showcase:** Automatically fetches the user's curated pinned repositories (or falls back to top-starred repositories). Displays the top 3 cards in view, with remaining repositories accessible through smooth horizontal scrolling.
- **Bio & Status Quote Block:** Editorial testimonial-style card featuring a quotation glyph, company status headline, bio, and geographic location tag.
- **Project Source Tile:** Anchored link to the open-source GitHub Bento Box repository for quick starring and exploration.
- **High-Resolution PNG Export:** One-click 2x Retina PNG download of the complete Bento grid via `html-to-image`.
- **Session Caching & Resilient Fallbacks:** In-memory `sessionStorage` cache prevents redundant API calls and shields against rate limits.

---

## 12-Column Bento Grid Architecture

The layout follows a balanced 12-column desktop CSS grid with proportional spacing:

```text
+-------------------+-----------------------------------+-------------------------+
| [1] BIO & QUOTE   | [2] DEVELOPER IDENTITY & AVATAR   | [3] TALL SCORECARD      |
|     Headline, bio |     Avatar, @login, copy button,  |     Header, impact pill |
|     & location    |     company & profile link        |     "OPEN SOURCE        |
|     (col-span-3)  |     (col-span-5)                  |      DIFFERENCE"        |
+-------------------+-----------------------------------+     Repos, Stars,       |
| [4] OVERLAPPING LANGUAGE SWATCH DECK                  |     Followers, Contribs |
|     Overlapping swatch cards showing languages & %    |     (col-span-4,        |
|     (col-span-8)                                      |      row-span-2)        |
+-----------------------------------+-------------------+-------------------------+
| [5] BENTO REPO SOURCE LINK        | [6] TOP PINNED REPOSITORIES & EXPORT        |
|     Project repository card       |     Top 3 visible + horizontal scroll       |
|     with star link button         |     dock + "Export PNG" action trigger  |
|     (col-span-4)                  |     (col-span-8)                                |
+-----------------------------------+---------------------------------------------+
```

---

## Color System (GitHub Palette)

| Token | Name | HEX | Usage |
| :--- | :--- | :--- | :--- |
| `canvas` | Cool Gray 1 | `#F2F5F3` | Page background canvas tint |
| `gh-gray-2` | Cool Gray 2 | `#E4EBE6` | Button hover & soft borders |
| `gh-gray-3` | Cool Gray 3 | `#B6BFB8` | Subtle border hairlines |
| `gh-gray-4` | Cool Gray 4 | `#909692` | Muted labels & placeholders |
| `indigo` | Gray 5 (Charcoal) | `#232925` | Scorecard & project tile fill |
| `prussian` | Gray 6 (Process Black) | `#101411` | Primary text & dark panels |
| `gh-green-1` | Green 1 (Mint) | `#BFFFD1` | Swatch deck highlight |
| `gh-green-2` | Green 2 (Light) | `#8CF2A6` | Swatch deck accent |
| `gh-green-3` | Green 3 (Vibrant) | `#5FED83` | Contributions highlight |
| `teal` | Green 4 (GitHub Green) | `#0FBF3E` | Primary brand accent & star badges |
| `gh-green-5` | Green 5 (Forest) | `#08872B` | Dark swatch card |
| `dusk` | Green 6 (Deep Emerald) | `#0A241B` | Base swatch card fill |

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v3 (custom theme extensions & tokens)
- **Typography:** Antonio (Display Condensed), Plus Jakarta Sans (Brand/UI), JetBrains Mono (Metrics)
- **Motion:** Framer Motion (spring entrance cascade & interactive hover expansion)
- **Image Export:** `html-to-image` (Retina 2x canvas capture)

---

## Getting Started

### Prerequisites

- Node.js `v18+` or `v20+`
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mrBM2049/Github-Bento-Box.git
cd Github-Bento-Box

# Install dependencies
npm install

# Start local development server (with HMR)
npm run dev
```

### Production Build & Linting

```bash
# Check code style with ESLint
npm run lint

# Build production assets (to /dist)
npm run build

# Preview production build locally
npm run preview
```

---

## Repository & Author

- **Repository:** [mrBM2049/Github-Bento-Box](https://github.com/mrBM2049/Github-Bento-Box)
- **Author:** Ved Badarshahi ([@mrBM2049](https://github.com/mrBM2049))
- **License:** MIT
