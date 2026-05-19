# monis.rent — Workspace Design Tool

Mobile-first prototype for designing and requesting a Bali workspace rental setup. Landing, nomad presets, a drag-and-drop catalog, and a live 3D preview ship in one page; checkout and booking status are simulated client-side.

## Approach

Preset bundles (Deep Work, Creator Studio, Minimal Travel) seed the canvas so users start from a credible setup instead of an empty room. **Zustand** holds placement state: desk/chair stay single-instance; monitors, accessories, lighting, plants, and coffee use fixed category grids with per-placement cart rows. **@dnd-kit** handles catalog → canvas drops; **@react-three/fiber** + **drei** render an orthographic 3D scene with pre-authored positions from `lib/workspace-layout.ts` (no free-form drag in 3D). The main flow lives in `components/workspace/workspace-builder.tsx`—catalog, canvas, pricing, mock “request to book,” trust timeline, and mobile cart in one surface.

## Tech choices

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 16** (App Router), React 19 |
| Styling | **Tailwind CSS 4**, Radix + shadcn-style `components/ui` |
| State | **Zustand** (`lib/workspace-store.ts`) |
| 3D | **Three.js** via R3F; dynamic import (no SSR on canvas) |
| Motion | **Framer Motion** with `prefers-reduced-motion` |
| DnD | **@dnd-kit** |

`npm run dev` → [http://localhost:3000](http://localhost:3000). `npm run build` passes.

## Project layout (no `src/`)

```
app/           # layout, page, globals
components/    # landing, workspace builder, 3D, UI kit
lib/           # catalog data, store, layout grids, motion tokens
hooks/         # shared hooks (see dead code below)
public/        # product images
```

## Implementation status

Checked against the app source tree (`app/`, `components/`, `lib/`, `hooks/`). There is **no `src/` directory** in this repo.

### Done

- [x] Landing hero + how-it-works (`components/landing/`)
- [x] Three nomad presets → populate store
- [x] Categorized product catalog + quick add / toggle remove
- [x] Multi-instance grid placements + 3D preview + slot hotspots
- [x] Drag-and-drop from catalog onto canvas
- [x] Weekly pricing, deposit line, order/cart (desktop + mobile drawer)
- [x] Mock checkout: terms → authorize hold → contract sign → trust timeline UI
- [x] Host reliability + proof-center copy (marketing/trust surfaces only)
- [x] Production build

### Not in this prototype (PRD launch funnel)

- [ ] Maps / GPS pin-drop and Bali service-area validation
- [ ] Rental dates and inventory availability
- [ ] Guaranteed delivery slot lock before pay
- [ ] Wallet checkout (Apple Pay / Google Pay) and real payments
- [ ] Backend booking API, WhatsApp webhooks, live tracking
- [ ] Mac vs PC bundle compatibility toggle
- [ ] Auth, saved setups, one-tap rebook

### Dead code (safe to delete later)

Legacy pieces superseded by `useWorkspaceStore` + inline UI in `workspace-builder.tsx`:

- `hooks/use-workspace-builder.ts`
- `components/workspace/product-catalog.tsx`
- `components/workspace/order-summary.tsx`
- `components/workspace/workspace-preview.tsx`

## With more time

1. **Split the monolith** — Extract checkout, cart, and catalog from `workspace-builder.tsx`; wire or remove the unused components above.
2. **Real booking path** — Slot lock + pin validation + Stripe/Apple Pay + server actions or API routes; drop the mock timeout-based checkout.
3. **Preset-first funnel** — Align UX with PRD: presets → dates → pin → slot → pay, with 3D as optional edit—not the primary conversion path.
4. **Tests & a11y** — Playwright on preset → add item → checkout modal; axe on critical routes; fix ESLint in CI (`eslint` not on PATH locally without `npx`).
5. **3D polish** — Instanced meshes, loading skeleton tied to layout, optional 2D fallback for low-end devices.

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
```
