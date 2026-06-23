# StellarPay — Stellar dApp

## Level 1 — Basic Stellar dApp

Multi-wallet Stellar application with Clerk authentication.

### Features (Level 1)

- **Clerk Authentication**: Sign up/in with email, Google, GitHub, etc.
- **Multi-Wallet Support**: Connect via Freighter, Albedo, Lobstr, xBull, Rabet, or Hana using StellarWalletsKit
- **Transaction Status Tracking**: Pending → Success/Fail with explorer links
- **Error Handling**: 3 error types — wallet not found, connection rejected, insufficient balance

### Screenshot (Level 1)

![dapp-success2](frontend/screenshots/dapp-success2.jpg)

---

## Level 2 — Soroban Contract + Real-Time Events

Extends Level 1 with a deployed Soroban smart contract and real-time event integration.

### Screenshots (Level 2)

![level2](frontend/screenshots/leev2.jpg)
![pay2level2](frontend/screenshots/pay2level2.jpg)

### Features (Level 2)

- **Multi-Wallet Support**: Connect via Freighter, Albedo, Lobstr, xBull, Rabet, or Hana using StellarWalletsKit
- **Soroban Smart Contract**: Live Poll voting contract deployed on Stellar testnet
- **Real-Time Events**: SSE-powered live activity feed showing votes as they happen
- **Transaction Status Tracking**: Pending → Success/Fail with explorer links
- **Error Handling**: 3 error types — wallet not found, connection rejected, insufficient balance
- **Clerk Authentication**: Sign up/in with email, Google, GitHub, etc.

### Prerequisites

- A Stellar wallet (Freighter, Albedo, Lobstr, etc.)
- A Clerk account at [clerk.com](https://clerk.com)
- Rust toolchain (for building the contract)
- Node.js 18+

### Setup

```bash
cd frontend
npm install
npm run dev
```

**Netlify:** `netlify.toml` is in `frontend/` — set **Base directory** to `frontend` in Netlify dashboard.

## Smart Contract

The poll contract is in `contracts/poll/`. Build and deploy:

```bash
cd contracts/poll
cargo build --target wasm32-unknown-unknown --release
```

### Deployed Contract (Testnet)

**Contract ID**: `CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID`

View on Stellar Expert: [CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID](https://stellar.expert/explorer/testnet/contract/CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID)

## Rust Backend

The SSE event server is in `backend/`:

```bash
cd backend
cargo run
```

Runs on `http://localhost:3001`. Provides:
- `GET /health` — Health check
- `GET /api/events` — SSE stream for real-time events
- `GET /api/publish` — Publish events (used by frontend)

### Deploy to Render

1. Push the repo to GitHub
2. In [Render Dashboard](https://dashboard.render.com), create a **New Web Service**
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `cargo build --release`
   - **Start Command**: `./target/release/stellerpay-backend`
5. Add env var: `PORT = 10000`
6. Deploy

After deployment, copy the Render URL (e.g. `https://stellerpay-backend.onrender.com`)
and set it as `VITE_BACKEND_URL` in your Netlify environment variables, then redeploy.

## Project Structure

```
src/
├── main.tsx                    # Entry point with ClerkProvider
├── App.tsx                     # Auth router
├── Dashboard.tsx               # Main dashboard (redesigned)
├── LandingPage.tsx             # Landing page
├── types.ts                    # Shared type definitions
├── index.css                   # Tailwind + theme tokens
├── services/
│   ├── wallets.ts              # StellarWalletsKit multi-wallet integration
│   ├── contract.ts             # Soroban contract interaction
│   └── backend.ts              # SSE event streaming client
contracts/
└── poll/                       # Soroban poll contract (Rust)
    ├── Cargo.toml
    └── src/
        └── lib.rs
backend/                        # Rust Axum SSE server
├── Cargo.toml
└── src/
    └── main.rs
```

## Error Handling

Three error types handled:
1. **Wallet Not Found** — No wallet extension detected or not connected
2. **Connection Rejected** — User declined the wallet connection request
3. **Insufficient Balance** — Not enough XLM for transaction fees

## Deliverables

- **Live Demo**: https://stellerpay.netlify.app
- **Contract Address**: `CDROSAGWRIQG5TSRF2FFFFXZD3RGPWDS6I3IWUTC67MELRRLZHNOE6ID`
- **Init TX Hash**: `1cc3507973ab0f7a5b2aa1e8f0bc772f1efa9a3697eb600d170f927129fd7a70`
- **Deployer Account**: `GCZVEJZJNMPHXP3GKCHI33YUSN7BJTU3OWNDLSDEUQOO4UGRIQWHBEHK`
- **Screenshots**: See `frontend/screenshots/` folder

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Clerk (authentication)
- StellarWalletsKit (multi-wallet)
- @stellar/stellar-sdk v16 (Soroban)
- Rust + Axum (backend)
- Soroban SDK (smart contract)
