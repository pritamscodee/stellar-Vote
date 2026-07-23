
<div align="center">

# ⚡ StellarVote

<img width="1901" height="868" alt="lanidng page1" src="https://github.com/user-attachments/assets/a5d7ff3e-ff4e-4a31-8d40-d64b9f310b48" />

---

<img width="1892" height="881" alt="testimonisal animted" src="https://github.com/user-attachments/assets/b2898ff7-9e19-41a0-8731-ddb5ae16f12f" />

### Multi-Wallet Stellar dApp × Soroban Smart Contract × Real-Time SSE Events

---

[![CI](https://github.com/pritamscodee/stellar-Vote/actions/workflows/ci.yml/badge.svg)](https://github.com/pritamscodee/stellar-Vote/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=fff)](https://www.rust-lang.org)
[![Stellar](https://img.shields.io/badge/Stellar-7B00FF?style=for-the-badge&logo=stellar&logoColor=fff)](https://stellar.org)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=fff)](https://clerk.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=fff)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=fff)](https://render.com)
[![Tests](https://img.shields.io/badge/Tests-14_Frontend_%7C_7_Contract-0?style=for-the-badge&logo=vitest&logoColor=fff)]()

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-7B00FF?style=for-the-badge&logo=vercel&logoColor=fff)](https://frontend-one-rose-14.vercel.app)
[![Contract on Stellar Expert](https://img.shields.io/badge/Stellar_Expert-000000?style=for-the-badge&logo=stellar&logoColor=fff)](https://stellar.expert/explorer/testnet/contract/CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID)

---

</div>

<img width="1712" height="870" alt="S3" src="https://github.com/user-attachments/assets/1ae8ad62-473d-4ac7-9cbe-b1c947defcb0" />

<img width="1880" height="900" alt="S1" src="https://github.com/user-attachments/assets/a6e83df7-3b7c-4da1-bda9-e6c2719ce029" />

## 🌐 Overview

**StellarVote** is a full-stack Web3 dApp on the **Stellar network** featuring:

- **Soroban Smart Contract** — Decentralized poll creation & voting on Stellar testnet
- **Multi-Wallet Support** — Connect via Freighter, Albedo, Lobstr, xBull, Rabet, or Hana
- **Real-Time SSE Events** — Live activity feed powered by a Rust/Axum event server
- **Clerk Authentication** — Secure sign-up/sign-in with email, Google, GitHub, and more
- **Dark Mode UI** — Sleek, responsive interface built with Tailwind CSS v4
- **Leaderboard System** — Track top voters and community engagement
- **Poll Templates** — Quick-start templates for common poll types
- **Category Filtering** — Organize polls by governance, community, technical, and fun

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication
- Clerk-powered sign-up/sign-in
- Email, Google, GitHub providers
- Protected dashboard routes

### 👛 Multi-Wallet
- Freighter, Albedo, Lobstr, xBull, Rabet, Hana
- StellarWalletsKit integration
- One-click connect & switch

### 📊 Live Polling
- Create polls with custom options
- Set deadline (hours/days)
- Real-time vote updates via SSE
- Quick-start poll templates

### 🏆 Leaderboard
- Track top voters by vote count
- Gold/Silver/Bronze badge system
- Personal performance stats
- Community engagement metrics

### 🏷️ Poll Categories
- Governance, Community, Technical, Fun
- Visual category filtering
- Category-aware poll creation

</td>
<td width="50%">

### 🚀 User Onboarding
- First-time welcome modal with step-by-step guide
- 4-step interactive walkthrough
- Persists completion in localStorage

### 🔗 Poll Sharing
- Share poll links via native Web Share API
- Copy-to-clipboard support
- Shareable URL with contract reference

### ⏱️ Live Countdown Timer
- Real-time countdown to poll deadline
- Animated digit transitions
- Auto-detects expired polls

### 📜 Vote History
- Local voting history with tx hash links
- Expandable history panel
- Clear history option

### ⚡ Real-Time Events
- Server-Sent Events (SSE) stream
- Live vote notifications
- Instant poll creation alerts

### 🤖 AI Chat Assistant
- Mistral AI-powered chat widget
- Web3 & Stellar knowledge base
- In-chat feedback collection

</td>
</tr>
</table>

---

## 📱 Mobile Responsive Design

The dashboard and landing page are fully responsive across all device sizes:

<div align="center">
<img width="602" height="1000" alt="mb4" src="https://github.com/user-attachments/assets/b1d07006-cbc8-4415-bed3-e712c89b2e19" />

<div>
<img width="602" height="1000" alt="mb3" src="https://github.com/user-attachments/assets/bcf41c8b-7793-42e9-94b7-654913250a9f" />

</div>

  
</div>

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Rust | latest stable |
| Stellar Wallet | Freighter / Albedo / Lobstr |
| Clerk Account | [clerk.com](https://clerk.com) |

### Frontend

```bash
# Install dependencies
cd frontend
npm install

# Set up environment
cp .env.example .env
# Edit .env with your Clerk key & backend URL

# Start dev server
npm run dev
```

### Smart Contract (Poll)

```bash
cd contracts/poll
cargo build --target wasm32v1-none --release
```

### Smart Contract (Reward — Inter-Contract)

```bash
cd contracts/reward
cargo build --target wasm32v1-none --release
```

### Backend (SSE Server)

```bash
cd backend
cargo run
# Runs on http://localhost:3001
```

---

## 🧱 Architecture

```
stellar-vote/
├── frontend/                    # React + Vite SPA
│   ├── src/
│   │   ├── main.tsx            # Entry point
│   │   ├── App.tsx             # Auth router + ErrorBoundary
│   │   ├── Dashboard.tsx       # Main dashboard with tabs
│   │   ├── LandingPage.tsx     # Marketing page with stats
│   │   ├── OnboardingModal.tsx # First-time user onboarding
│   │   ├── PollShareButton.tsx # Share poll via URL/clipboard
│   │   ├── CountdownTimer.tsx  # Live poll deadline countdown
│   │   ├── VoteHistory.tsx     # Persistent vote history panel
│   │   ├── Leaderboard.tsx     # NEW — Top voters leaderboard
│   │   ├── PollCategories.tsx  # NEW — Category filter for polls
│   │   ├── PollTemplates.tsx   # NEW — Quick poll templates
│   │   ├── StatsCounter.tsx    # NEW — Animated stats counter
│   │   ├── HowItWorks.tsx      # NEW — Step-by-step guide
│   │   ├── CommunitySection.tsx # NEW — Open source community
│   │   ├── ErrorBoundary.tsx   # React error boundary
│   │   ├── LoadingSkeleton.tsx # Loading skeletons
│   │   ├── FeedbackWidget.tsx  # Floating feedback button
│   │   ├── FeedbackView.tsx    # Admin feedback viewer
│   │   ├── ThemeProvider.tsx   # Dark/light theme
│   │   ├── types.ts            # Shared types
│   │   ├── index.css           # Tailwind + theme + animations
│   │   ├── test/               # Frontend tests
│   │   └── services/
│   │       ├── wallets.ts      # Multi-wallet kit
│   │       ├── contract.ts     # Soroban interactions
│   │       ├── backend.ts      # SSE client
│   │       ├── analytics.ts    # PostHog analytics
│   │       └── voteHistory.ts  # Vote history persistence
│   ├── screenshots/            # App screenshots
│   └── vercel.json             # Vercel SPA config
├── contracts/
│   ├── poll/                   # Soroban poll contract
│   │   └── src/lib.rs          # + 4 unit tests
│   └── reward/                 # Inter-contract reward contract
│       └── src/lib.rs
├── backend/                    # Rust Axum SSE server
│   └── src/main.rs
├── scripts/
│   ├── deploy.sh               # Unix contract deploy
│   └── deploy.ps1              # Windows contract deploy
├── .github/workflows/
│   └── ci.yml                  # CI/CD pipeline
└── README.md
```

---

## 🤖 CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration. On every push to `main` and every pull request, the pipeline runs:

| Job | What it does |
|-----|-------------|
| **Frontend** | `npm ci`, `npm run lint`, `npm run build`, `npm test` (14 tests) |
| **Contract** | `cargo build` (poll + reward), `cargo test` (4 tests) |
| **Backend** | `cargo build` (Rust Axum server) |

### Run Tests Locally

```bash
# Frontend tests (Vitest)
cd frontend && npm test

# Contract tests (Rust)
cd contracts/poll && cargo test
```

| Test Suite | Tests | Status |
|-----------|-------|--------|
| Frontend types | 4 | ✅ |
| Frontend backend service | 3 | ✅ |
| Frontend helpers | 7 | ✅ |
| Poll contract | 4 | ✅ |
| Reward contract | 3 | ✅ |
| **Total** | **21** | ✅ |

---

## 🔗 Inter-Contract Communication

The `contracts/reward` contract demonstrates cross-contract calls by importing the compiled poll contract WASM via `contractimport`.

```rust
// contracts/reward/src/lib.rs
contractimport!("../poll/target/wasm32v1-none/release/stellar_poll.wasm");
```

---

## 🚢 Deployment Scripts

| Script | Platform |
|--------|----------|
| `scripts/deploy.sh` | Unix (Linux/macOS) |
| `scripts/deploy.ps1` | Windows PowerShell |

---

## 🔗 Deployed Contracts

| Contract | ID | Explorer |
|----------|----|----------|
| **Poll Contract** | `CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID` | [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID) |

---

## 📡 API — Rust Backend

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/events` | GET | SSE stream for live events |
| `/api/publish` | GET | Publish vote/poll events |

---

## 📜 On-Chain Transactions

| # | Type | Tx Hash | Explorer | Date |
|---|------|---------|----------|------|
| 1 | **Contract Deploy** | `d36f72ac…` | [View ↗](https://stellar.expert/explorer/testnet/tx/d36f72acf0b6a347c2ad68fc5d95f0b3196b95faf4ff2ff84f47ebaeee6ba2a8) | 2026-06-23 |
| 2 | **Init Poll** | `1cc35079…` | [View ↗](https://stellar.expert/explorer/testnet/tx/1cc3507973ab0f7a5b2aa1e8f0bc772f1efa9a3697eb600d170f927129fd7a70) | 2026-06-23 |
| 3 | **Cast Vote** | `60b5477f…` | [View ↗](https://stellar.expert/explorer/testnet/tx/60b5477f6a1e167b79bdd90bdcaa5512607a150e33387fd07f2be1c0579f174b) | 2026-06-23 |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4 |
| **Authentication** | Clerk |
| **Blockchain** | Stellar, Soroban SDK, @stellar/stellar-sdk v16 |
| **Wallet** | StellarWalletsKit (Freighter, Albedo, Lobstr, xBull, Rabet, Hana) |
| **Backend** | Rust, Axum, tokio, SSE |
| **Contract** | Soroban SDK (Rust), WASM |
| **Hosting** | Vercel (frontend), Render (backend) |

</div>

---

## 📬 Deliverables

- **Live Demo**: [https://frontend-one-rose-14.vercel.app](https://frontend-one-rose-14.vercel.app)
- **Contract ID**: `CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID`
- **GitHub Repo**: [pritamscodee/stellar-Vote](https://github.com/pritamscodee/stellar-Vote)
- **CI Pipeline**: [GitHub Actions](https://github.com/pritamscodee/stellar-Vote/actions)

---

## 🔵 Level 5 — Blue Belt Submission

### Submission Checklist

| Requirement | Status | Details |
|------------|--------|---------|
| **Public GitHub Repository** | ✅ | [pritamscodee/stellar-Vote](https://github.com/pritamscodee/stellar-Vote) |
| **20+ Meaningful Commits** | ✅ | 90+ commits on master |
| **Live Deployed Application** | ✅ | [steller-vote.vercel.app](https://steller-vote.vercel.app) |
| **PPT / Pitch Deck** | ✅ | [StellarVote Pitch Deck (PPT)](https://1drv.ms/p/c/8eda55c121781703/IQBCLbmqwhTCQZnnniaE4t4IAVqJofMURvQS_lyGxigabU4?e=eonsXe) |
| **Demo Video** | ✅ | [Watch Video](https://github.com/user-attachments/assets/d522ae39-22ff-4349-8101-aef049919440) |
| **50+ Testnet Users** | 🔄 | 10+ verified users onboarded (growing) · [See Proof Below](#-user-onboarding-data) |
| **Analytics / Transaction Proof** | ✅ | PostHog + on-chain explorer links |
| **Updated README & Docs** | ✅ | This document |
| **User Feedback Iteration** | ✅ | See below |

### 📝 User Onboarding — Google Form

📋 **Google Form**: [StellarVote User Onboarding Form](https://forms.gle/m8N7faRey2ds9ALe7)

📊 **Exported Responses (Excel)**: [View User Data](https://pritamscodee.github.io/stellar-Vote/) · [Direct Spreadsheet](https://docs.google.com/spreadsheets/d/1mKsiBzWjnCzrdzQ5QXeF96TjoleYPkWrJaA9Mw7Phww/edit?usp=sharing)

<div align="center">
  <a href="https://docs.google.com/spreadsheets/d/1mKsiBzWjnCzrdzQ5QXeF96TjoleYPkWrJaA9Mw7Phww/edit?usp=sharing">
    <img src="https://img.shields.io/badge/VIEW_USER_DATA-22c55e?style=for-the-badge&logo=tableau&logoColor=fff" alt="View User Data" />
  </a>
</div>

### 📊 User Onboarding Data

<div align="center">

| 1 | **Aditya Jha** | jha073803@gmail.com | `GDFKLTB5WKKDDJ2NRU2V5OG476HYEGWT4UFV7BID7BNGWZGRZYL3LL6Z` | [View Tx](https://stellar.expert/explorer/testnet/tx/1aa3a9c4dc115f1d6e6e4d520621c6685a0fe1a8b22dc9bf3f36004c9fde5559) | ⭐⭐⭐⭐⭐ 5/5 | Great Product! Liked the UI |
| 2 | **Souvik Mandal** | souvikmandals10@gmail.com | `GAG3SUKHIF7VAWGTDRH52XETMLZXXNXBAZLLXHSLXAQPOBBCN43YLKR4` | [View Tx](https://stellar.expert/explorer/testnet/tx/cce1e122b157105e820d48a8f8bd3a303167832e8a0252f1796af71ff8e30145) | ⭐⭐⭐⭐ 4/5 | Polling on blockchain that's nice idea!!! |
| 3 | **Ankita Barman** | poulumidui@gmail.com | `GCV5X5CKYUAPQLE3OYQS3PDXKX4TRV767YUCJ66PWWGZD2BXE744T276` | [View Tx](https://stellar.expert/explorer/testnet/tx/0d6532879d8b30c2ac2188a3ee1db35f281545c152c4a994b079f66de25fc944) | ⭐⭐⭐⭐⭐ 5/5 | Great product, helpful for polling in medical schools |
| 4 | **Debansh Tiwari** | debanshtiwari712@gmail.com | `GA4SXARZZ4RPF6N7VOAH3B5OKMFAP3FGY6M6TO3DZJL4TMU2KOVBHCIY` | [View Tx](https://stellar.expert/explorer/testnet/tx/99a45df5df39cff2610c4df35fd77b00ce1317ea75c1e13579c15c8ed3bae500) | ⭐⭐⭐⭐⭐ 5/5 | Great UI. Very user-friendly product. No issues |
| 5 | **Priyasha Debnath** | popololo229099@gmail.com | `GCKMODNZEAI4X6AL6SL77PNJLUUJAQAWECXDTXJZGXBOSSSF7THC3XH6` | [View Tx](https://stellar.expert/explorer/testnet/tx/0abd550962b9b495868dbb9a3cc3f6c8d34bd8d162db5b8ba647cfed63cb341a) | ⭐⭐⭐ 3/5 | Overall good, keep improving, add realtime microservices |
| 6 | **Papita Kumari** | poppritu@gmail.com | `GACMLTEWZ23NGJ5WZ2THYGLODFYTEKECB7J2U33H3DCSW2PEAQUEIZED` | [View Tx](https://stellar.expert/explorer/testnet/tx/7e5250798af445a729d711e2732be1584c3c0dc5bea58369c1a6ec8f9e8e0afc) | ⭐⭐⭐⭐⭐ 5/5 | Best design and well application |
| 7 | **Probir Sha** | proumg2@gmail.com | `GAEAB4UWRUODGUKBYGDXBZULSOI3HJ6HQKJNNLTY66IF3ATXMRYUCSNX` | [View Tx](https://stellar.expert/explorer/testnet/tx/13d07f5cb35bfb1f83340af3c3d9789e34e34af61765608c86918ec9ad13f51d) | ⭐⭐⭐⭐ 4/5 | Dashboard and analytics is awesome, really better than any other |
| 8 | **Abhishek Kumar** | ak0001736@gmail.com | `GBENUMINONHMCBALY7UMD4JQV7XXOQHAO4KNVV4UJC5ZTGHNE7PWQ7HR` | [View Tx](https://stellar.expert/explorer/testnet/tx/104f599bfdaeeffee79f44d4941cb8f08879defc1a76045fbe9a84187e2b3f2e) | ⭐⭐⭐⭐⭐ 5/5 | Good |
| 9 | **Pritam Dev** | pritamsdev2@gmail.com | `GATJMD6BGNK4FQYNFWB354N7RP4XHA2R74GNSYM472ALNLJFX7NXBS3X` | [View Tx](https://stellar.expert/explorer/testnet/tx/039fd6abf1303e7208e11daf02abab5e71fb890530d15a221bd5a3beaf8b6b49) | ⭐⭐⭐⭐ 4/5 | Good UI/UX, perfect suitable and clean design |
| 10 | **Sayan Sadhukhan** | sayansadhukhan544@gmail.com | `GCVT3KDQT3Z2JPWODBMHLX4ODSIKDZ7CTZYZTKHXIQLTWLF5TBRNXJHC` | [View Tx](https://stellar.expert/explorer/testnet/tx/95cade7d376b8247bf373f3f0ca41a810e698684cc090942c05e3887851592ab) | ⭐⭐⭐⭐⭐ 5/5 | StellarVote makes on-chain voting simple and transparent |
</div>

<div align="center">

| Metric | Value |
|--------|-------|
| **Total Users** | 10+ |
| **Average Rating** | 4.5 / 5 |
| **5-Star Reviews** | 6 (60%) |
| **4-Star Reviews** | 3 (30%) |
| **3-Star Reviews** | 1 (10%) |
| **On-Chain Verified** | ✅ All wallet addresses are real Stellar testnet accounts |

</div>

### 🔄 User Feedback Iteration (Level 5)

Based on user feedback collected through the in-app feedback widget and Google Form:

| Feedback Area | What Users Said | Iteration Made | Commit |
|--------------|-----------------|----------------|--------|
| **Leaderboard** | "Want to see top voters" | Added Leaderboard tab with gold/silver/bronze badges | Level 5 redesign |
| **Poll Templates** | "Creating polls takes too long" | Added quick-start poll templates (Yes/No, 4 Options, Community, Quick) | Level 5 redesign |
| **Categories** | "Hard to find specific polls" | Added PollCategories filter (Governance, Community, Technical, Fun) | Level 5 redesign |
| **Stats** | "Want to see platform growth" | Added animated StatsCounter on landing page (Users, Votes, Polls, Uptime) | Level 5 redesign |
| **How It Works** | "Didn't know where to start" | Added HowItWorks 4-step guide section on landing page | Level 5 redesign |
| **Community** | "Want to contribute" | Added CommunitySection with GitHub, Issues, and PRs links | Level 5 redesign |
| **Onboarding** | "Didn't know where to start" | Added 4-step OnboardingModal walkthrough | `d4519f3` |
| **Sharing** | "How do I share a poll?" | Added PollShareButton with Web Share API + copy-to-clipboard | `d4519f3` |
| **Poll Deadline** | "When does this poll end?" | Added CountdownTimer with animated digits | `d4519f3` |
| **Vote Tracking** | "What did I vote on?" | Added VoteHistory panel with tx hash explorer links | `d4519f3` |
| **Mobile UX** | "Hard to use on phone" | Responsive redesign with mobile-first Tailwind layout | `1207046` |
| **Dark Mode** | "Text invisible in dark mode" | Fixed all contrast issues across glass cards | `252b17b` |

### 🎯 Growth Strategy

| Phase | Action | Target |
|-------|--------|--------|
| **Phase 1** | Share on Stellar Discord, Reddit r/Stellar | 50 users |
| **Phase 2** | Tweet demo with #Stellar hashtag, Dev.to blog post | 100 users |
| **Phase 3** | Partner with Stellar ecosystem projects for cross-promotion | 200+ users |

### 🗺️ Future Roadmap

| Feature | Description | Priority |
|---------|-------------|----------|
| **On-Chain Poll Results** | Store vote tallies directly in the Soroban contract | High |
| **Multi-Choice Voting** | Support ranked-choice and yes/no/abstain polls | High |
| **Poll Categories** | Organize polls by topic (governance, community, dev) | Medium |
| **Notifications** | Push notifications when polls you voted on close | Medium |
| **Poll Embeds** | Embeddable poll widgets for websites and docs | Low |
| **Gas Sponsorship** | Backend sponsors XLM for new user transactions | Low |

### 📦 Architecture Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4 | SPA with dark/light theme |
| **Auth** | Clerk | Email, Google, GitHub sign-in |
| **Wallet** | StellarWalletsKit | Freighter, Albedo, Lobstr, xBull, Rabet, Hana |
| **Smart Contract** | Soroban SDK (Rust) → WASM | On-chain poll creation & voting |
| **Backend** | Rust, Axum, tokio | SSE event streaming |
| **Analytics** | PostHog | User behavior tracking |
| **Hosting** | Vercel (frontend), Render (backend) | Production deployment |

### 📊 Analytics & Monitoring

[PostHog](https://posthog.com) is integrated for product analytics:

- **Page views** tracked automatically via route changes
- **Wallet connections** captured with wallet name
- **Vote casting** tracked with option index
- **Poll creation** tracked with question preview
- **User identification** via Clerk user ID (when available)

<div align="center">

<img width="1645" height="752" alt="analytics1" src="https://github.com/user-attachments/assets/1d351c4c-09fa-41c5-bac4-56ef7a4785bd" />

<img width="1637" height="847" alt="analytics 2" src="https://github.com/user-attachments/assets/82db2ed3-cdd2-4846-9417-ed2418283887" />

</div>

| Metric | Value |
|--------|-------|
| **Unique Visitors** | 23+ |
| **Page Views** | 53+ |
| **Sessions** | 28+ |
| **Avg. Session Duration** | 2m 57s |
| **Bounce Rate** | 14% |

### 👥 50+ User Onboarding Proof

| Proof Source | Status | Link |
|-------------|--------|------|
| **PostHog Unique Visitors** | 23+ | [Public Dashboard](https://us.posthog.com/shared/HJMsE-sycnJBYDOtng-c5Xs4I4VhMA) |
| **Google Form Responses** | 10+ | [User Onboarding Data](https://docs.google.com/spreadsheets/d/1mKsiBzWjnCzrdzQ5QXeF96TjoleYPkWrJaA9Mw7Phww/edit?usp=sharing) |
| **On-Chain Transactions** | 10+ votes cast | [Stellar Expert](https://stellar.expert/explorer/testnet/contract/CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID) |
| **Total Users Onboarded** | 10+ (growing) | — |

### 📋 Final Deliverables (Level 5)

| Item | Link |
|------|------|
| **Live Demo** | [steller-vote.vercel.app](https://steller-vote.vercel.app) |
| **GitHub Repo** | [pritamscodee/stellar-Vote](https://github.com/pritamscodee/stellar-Vote) |
| **CI Pipeline** | [GitHub Actions](https://github.com/pritamscodee/stellar-Vote/actions) |
| **Smart Contract** | [Stellar Expert](https://stellar.expert/explorer/testnet/contract/CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID) |
| **Demo Video** | [Watch on GitHub](https://github.com/user-attachments/assets/d522ae39-22ff-4349-8101-aef049919440) |
| **Pitch Deck** | [StellarVote Pitch Deck (PPT)](https://1drv.ms/p/c/8eda55c121781703/IQBCLbmqwhTCQZnnniaE4t4IAVqJofMURvQS_lyGxigabU4?e=eonsXe) |
| **Google Form** | [StellarVote User Onboarding Form](https://forms.gle/m8N7faRey2ds9ALe7) |
| **User Data (Excel)** | [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1mKsiBzWjnCzrdzQ5QXeF96TjoleYPkWrJaA9Mw7Phww/edit?usp=sharing) |
| **PostHog Analytics** | [Public Dashboard](https://us.posthog.com/shared/HJMsE-sycnJBYDOtng-c5Xs4I4VhMA) |

---

<div align="center">

**Built with ❤️ on Stellar** · [Report Issue](https://github.com/pritamscodee/stellar-Vote/issues)

[![Stellar](https://img.shields.io/badge/Powered_by_Stellar-7B00FF?style=flat-square&logo=stellar&logoColor=fff)](https://stellar.org)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

</div>
