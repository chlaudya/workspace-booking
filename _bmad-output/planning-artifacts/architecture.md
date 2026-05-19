---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - prds/prd-workspace-design-tool-2026-05-19/prd.md
  - ux-design-specification.md
  - ux-color-themes.html
  - ux-design-directions.html
workflowType: architecture
project_name: workspace-design-tool
user_name: Clowdy
date: 2026-05-19
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (architectural view)**

Launch MVP centers on a **booking orchestration pipeline** with hard gates before payment:

1. **Catalog & pricing** (FR-1–6) — Preset bundles, compatibility rules, rental-period pricing, inventory reservation. Needs product catalog service + pricing calculator + hold API.
2. **Location & scheduling** (FR-7–13) — Map pin-drop, geo-fence validation, real-time slot listing/locking with TTL. Needs geo service, slot/capacity service, and session-scoped booking draft.
3. **Commerce** (FR-14–17) — Transparent quote assembly (rent + fees + deposit), wallet-first PSP integration, anonymous-to-known customer at payment. Needs quote service and PCI-scoped payment adapter.
4. **Post-commit ops** (FR-18–23) — Confirmation UI, WhatsApp transactional messaging, signed tracking links, fulfillment timeline + proof artifacts. Needs notification service, booking read model, media storage for setup proof.
5. **Exception handling** (FR-24–27) — Proactive exception surfacing (address/delay/stock), user recovery flows, WhatsApp escalation with booking context. Needs workflow/events from ops tools into customer-facing state.
6. **Trust surfaces** (FR-31–32) — Policy content + acknowledgment audit on Booking.

**Post-MVP (v1.1):** Repeat booking (FR-28–30) implies customer account, booking history, and faster re-quote path.

**Non-Functional Requirements**

| Cluster | Drivers |
|---------|---------|
| Performance | <3s landing (NFR-1), <2s price refresh (NFR-2), <5s pin validation p95 (NFR-3), <2min median booking (SM-2) |
| Security | PCI via PSP only (NFR-4), signed expiring tracking tokens (NFR-5), minimal PII + location retention (NFR-6) |
| Reliability | Idempotent payment webhooks (NFR-7), 99.5% booking API (NFR-8) |
| Accessibility | WCAG 2.1 AA on P0 flows; keyboard map alternatives; CI a11y scans (NFR-9–12) |
| Observability | Full conversion funnel + WhatsApp SLA alerting (NFR-13–14) |

**UX-driven technical requirements**

- **Card-stack mobile flow** with persistent sticky quote bar; optimistic/skeleton loading (policy 4B).
- **Embedded map** in checkout cards with validation state machine (7 states on pin card).
- **Realtime UX** for slot availability and price updates — WebSocket or short-polling on lock step.
- **No offline** — all availability/slot data live.
- **Design tokens** — emerald/teal primary `#0F766E`, warm neutrals, semantic colors per `ux-color-themes.html`; Tailwind + shadcn foundation.
- **Breakpoints** — 320/768/1024; same journey, layout adapts.

**Scale & Complexity**

- **Complexity level:** Medium-high (integration-heavy launch MVP, not enterprise scale-out).
- **Primary domain:** Full-stack mobile web — customer Next.js app + API/BFF + background workers for webhooks/notifications.
- **Estimated architectural components:** ~8–10
  - Customer web app (Next.js)
  - API/BFF (booking sessions, quotes, catalog)
  - Booking & inventory service
  - Slot/capacity service
  - Geo/validation service
  - Payment integration (PSP webhooks)
  - Notification service (WhatsApp)
  - Ops admin (timeline/exception v0)
  - Object storage (proof images)
  - Analytics/event pipeline

### Technical Constraints & Dependencies

- **Greenfield pivot (user decision):** New app via **create-t3-app**; existing repo is reference only (shadcn tokens, UX)—3D builder not carried forward as launch funnel.
- **Stack assumption:** Next.js 16, React 19, Tailwind 4, shadcn-style components (per PRD §9).
- **Third parties (decisions pending):** Maps provider, PSP (Apple/Google Pay + deposits), WhatsApp BSP — PRD explicitly defers to architecture.
- **Geography:** Bali service area polygon (OQ-1) gates pin validation.
- **No native apps / no offline** at launch.
- **WhatsApp as primary ops channel** — in-app chat not in scope.
- **Legal/compliance:** Indonesia rental terms, deposit, insurance (OQ-6) — affects data model and payment flows.

### Cross-Cutting Concerns Identified

1. **Booking session state** — Unify bundle, dates, pin, slot lock, quote across steps; survive back-nav and payment retry until TTL expiry.
2. **Inventory + slot atomicity** — Prevent double-book; coordinate holds with payment success/failure.
3. **Idempotency** — Payment webhooks, WhatsApp sends, timeline transitions.
4. **Quote integrity** — Line items shown in UI must match charged amount and WhatsApp summary (SM-3, FR-14).
5. **Security boundary** — PAN never on app servers; PII not in tracking URLs; magic links for guest tracking.
6. **Ops ↔ customer sync** — Timeline and exceptions driven by ops actions, reflected in-app and WhatsApp within 60s.
7. **Accessibility & mobile performance** — Map + wallet + sticky bar on constrained devices/networks.
8. **Eventing/analytics** — Structured funnel for SM-1–4 and counter-metrics.

## Starter Template Evaluation

### Primary Technology Domain

Full-stack **mobile web** — T3 stack (Next.js App Router + tRPC + PostgreSQL + Tailwind) with server-side booking orchestration and webhook workers.

### Starter Options Considered

| Option | Verdict |
|--------|---------|
| Brownfield (existing Next.js 16 repo) | Rejected — user chose greenfield |
| `create-next-app@16.2.6` | Rejected — no DB/API/typesafe layer out of the box |
| **`create-t3-app@7.40.0`** | **Selected** — full-stack typesafe foundation for booking domain |

### Selected Starter: Create T3 App (Greenfield)

**Rationale:** Booking MVP needs PostgreSQL, transactional inventory/slot locks, and end-to-end type safety (quote → pay → webhook). T3 provides Next.js + tRPC + Drizzle/Prisma + Tailwind in one maintained scaffold. Aligns with PRD stack direction while replacing the prototype builder codebase cleanly.

**Initialization command** ([create.t3.gg](https://create.t3.gg/en/installation) — verified 2026-05):

```bash
pnpm create t3-app@latest workspace-rental --CI \
  --trpc --tailwind --drizzle --dbProvider postgres --appRouter \
  --nextAuth false
```

*Interactive alternative:* `pnpm create t3-app@latest` → enable tRPC, Tailwind, Drizzle, PostgreSQL, App Router; skip NextAuth for launch (FR-16 anonymous checkout; add auth v1.1 for rebook).

**Post-scaffold additions (Story 0.1 follow-ups):**

```bash
# shadcn/ui (UX spec foundation — not in T3 default)
pnpm dlx shadcn@latest init

# Vitest + Playwright (NFR-12)
pnpm add -D vitest @playwright/test
```

**Architectural decisions provided by starter:**

| Area | T3 provides |
|------|-------------|
| Language | TypeScript, strict |
| Framework | Next.js App Router |
| API | tRPC (typesafe RPC) |
| ORM | Drizzle + PostgreSQL driver |
| Styling | Tailwind CSS |
| Validation | Zod (tRPC input schemas) |
| Auth | Skipped at scaffold (`--nextAuth false`) — guest checkout + magic links first |
| Dev UX | Turbopack, ESLint |

**Brownfield migration note:** Port from `workspace-design-tool` repo as **reference only**: `ux-color-themes.html` tokens → Tailwind theme; shadcn component patterns; do **not** port 3D builder as primary funnel.

**First implementation story:** Run init command + shadcn init + Drizzle schema stub for `Booking`, `Bundle`, `Slot`, `InventoryHold`.
