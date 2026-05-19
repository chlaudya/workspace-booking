---
title: workspace-design-tool
status: final
created: 2026-05-19
updated: 2026-05-19
---

# PRD: Premium Workspace Rental — Bali Nomad Launch

*Customer-facing brand TBD (codename: workspace-design-tool). See OQ-7.*

## 0. Document Purpose

This PRD defines **what** the product must do for a public launch of a premium, mobile-first workspace equipment rental service for temporary residents (initial geography: Bali). It is written for product, engineering, operations, and downstream workflow owners (UX refinement, architecture, epics).

**Structure:** Glossary-anchored vocabulary; features grouped with globally numbered functional requirements (FR-N); success metrics (SM-N) cross-reference FRs; assumptions tagged `[ASSUMPTION]` and indexed in §15.

**Upstream inputs (do not duplicate here):**

| Artifact | Path | Role |
|----------|------|------|
| UX Design Specification | `_bmad-output/planning-artifacts/ux-design-specification.md` | Journeys, components, visual foundation, pattern policies, accessibility |
| UX Color Themes | `_bmad-output/planning-artifacts/ux-color-themes.html` | Token exploration |
| UX Design Directions | `_bmad-output/planning-artifacts/ux-design-directions.html` | Direction 2+6 hybrid rationale |

Technical implementation choices (payment provider, maps API, WhatsApp BSP, inventory backend) belong in architecture / `addendum.md` unless they affect observable product behavior.

---

## 1. Vision

Temporary professionals arriving in Bali with no desk setup today coordinate equipment through fragmented DMs, opaque pricing, and unreliable last-mile delivery. The product turns **"arriving with nothing"** into **"production-ready workspace in hours"** via curated ergonomic **Preset Bundles**, transparent all-in pricing before payment, **guaranteed Delivery Slots** locked before commit, and white-glove delivery plus cable-managed setup.

The signature interaction users should describe to peers: **drop a GPS pin → lock a guaranteed setup window → pay with wallet → receive WhatsApp confirmation with live tracking in under 60 seconds.** Premium trust (Airbnb-like booking confidence + Apple-like checkout clarity) is delivered through operational legibility in the UI—not marketing copy alone.

Launch positions the brand as a **land-and-work concierge**: speed and certainty for high-intent mobile users booking from airport, café, or villa check-in—not a showroom configurator.

---

## 2. Target User

### 2.1 Primary Persona

**Maya — remote developer, 32, 3-month Bali stay**

Digitally fluent, outcome-driven, low tolerance for friction. Books from phone while in transit or immediately after landing. Needs a reliable dual-monitor + ergonomic chair setup without negotiating with local vendors. Success = paid booking with confirmed narrow delivery window and proactive status, not "request sent."

### 2.2 Jobs To Be Done

- **Functional:** Secure a complete workstation (desk, chair, monitors, accessories) delivered and set up at a villa address I may not fully know yet.
- **Emotional:** Feel **control + certainty** amid travel chaos; relief after checkout that the problem is solved.
- **Social:** Recommend a service that feels "so easy" to nomad/coworking peers.
- **Contextual:** Complete first booking in under 2 minutes on mobile; rebook in one tap on return visits.

### 2.3 Non-Users (v1)

- Long-term residents furnishing a home (buy vs rent economics).
- Corporate procurement / bulk office fit-out buyers.
- Users outside initial service geography `[ASSUMPTION: Bali service area only at launch]`.
- Offline-only or desktop-primary users (supported but not optimized).

### 2.4 Key User Journeys

*IDs mirror UX spec journey numbering for traceability.*

**UJ-1. Maya lands and books her Developer Bundle in one flow**

- **Persona + context:** Maya, day-one in Canggu, needs to work tomorrow; on mobile Safari at villa check-in.
- **Entry state:** Anonymous or returning session; lands on preset bundle cards (no forced signup before exploring price).
- **Path:** Selects Developer Preset Bundle → reviews included items and **Pricing Breakdown** on sticky bar → drops **Delivery Pin** on map → selects **Guaranteed Delivery Slot** → wallet checkout (Apple Pay) → sees confirmation screen.
- **Climax:** Payment succeeds; **Booking** status = confirmed; WhatsApp message with delivery window + tracking link arrives within 60s.
- **Resolution:** **Trust Timeline** shows confirmed → dispatched → setup in progress → setup complete; Maya starts work.
- **Edge case:** Pin fails validation → inline map correction; if still ambiguous, **WhatsApp Escalation** without losing cart state.

**UJ-2. Maya's delivery hits an address ambiguity**

- **Persona + context:** Ops detects route risk; Maya is in a meeting.
- **Entry state:** Active **Booking** with timeline in "dispatched" or pre-dispatch.
- **Path:** Proactive alert (in-app **Delivery Exception Card** + WhatsApp) → Maya provides live pin/landmark photo or accepts revised **Delivery Slot** → ops confirms new window → timeline updates.
- **Climax:** Revised ETA/slot acknowledged in UI and WhatsApp; no silent delay.
- **Resolution:** Setup completes; exception logged in proof/timeline.
- **Edge case:** Maya dissatisfied → human escalation path with priority handling `[ASSUMPTION: SLA for human response not yet defined]`.

**UJ-3. Maya rebooks the same setup next month** *(v1.1 target — out of launch MVP; see §4.9, §6.2)*

- **Persona + context:** Returning user, new dates, possibly new villa pin.
- **Entry state:** Authenticated or device-recognized; home shows **Rebook Previous Setup**.
- **Path:** One tap loads prior **Preset Bundle** + accessories → system shows price/availability delta → confirm dates + pin → slot lock → one-tap wallet pay.
- **Climax:** Faster than UJ-1; no full bundle re-decision.
- **Resolution:** Same WhatsApp + timeline pattern as UJ-1.
- **Edge case:** Saved pin stale or slot unavailable → inline fix without forced full catalog rebuild.

---

## 3. Glossary

- **Booking** — A paid reservation tying a **Preset Bundle**, **Rental Period**, **Delivery Pin**, and locked **Delivery Slot** to a customer. Lifecycle states include draft (pre-pay), confirmed, in-fulfillment, completed, cancelled, exception.
- **Preset Bundle** — Curated SKU set (e.g., Developer Bundle, Creator Bundle) with fixed included items and compatibility defaults (e.g., Mac vs PC dongles). Primary conversion path; not a custom 3D builder at launch.
- **Rental Period** — Start/end dates (or week-based term) determining price and inventory hold. `[ASSUMPTION: weekly billing primary; daily extension rules TBD]`
- **Delivery Pin** — GPS coordinates (+ optional landmark note) representing the setup location; validated before slot selection.
- **Delivery Slot** — A narrow, named time window (not all-day) offered from real-time capacity; **locked** before payment and shown as guaranteed in UI.
- **Pricing Breakdown** — Itemized rent, service fee, refundable **Security Deposit**, delivery/setup fees, and total—visible before authentication and before payment.
- **Security Deposit** — Refundable hold separate from rental charge; policy surfaced in **Pricing Breakdown**.
- **Trust Timeline** — Post-booking operational states: confirmed → dispatched → setup in progress → setup complete (with timestamps).
- **Delivery Exception** — Ops- or system-detected deviation (delay, address ambiguity, stock issue) triggering proactive user communication.
- **Proof Center** — Post-booking evidence of service quality (setup photos, checklist) `[ASSUMPTION: v1.1 unless launch marketing requires]`.
- **WhatsApp Confirmation** — Automated transactional message with booking summary, **Delivery Slot**, and tracking deep link.
- **Sticky Booking Bar** — Persistent mobile UI showing live total + primary CTA through booking cards.
- **Wallet Checkout** — Apple Pay / Google Pay as default payment path on supported devices.

---

## 4. Features

### 4.1 Preset Bundle Discovery & Selection

**Description:** Landing and catalog surfaces prioritize **Preset Bundles** over granular search. Each card shows bundle identity, included items summary, compatibility hint (Mac/PC), and entry into the card-stack booking flow. Users may explore bundles, dates, and indicative pricing without account creation. Realizes UJ-1, UJ-3.

**Functional Requirements:**

#### FR-1: Preset bundle catalog

A visitor can view all launch **Preset Bundles** with included-item summary and starting price indicator on mobile and desktop. Realizes UJ-1.

**Consequences (testable):**
- At least two launch bundles (e.g., Developer, Creator) are selectable from landing within 2 taps on 375px viewport.
- Bundle detail shows "what's included" without requiring login.

#### FR-2: Preset-initiated booking path

A user selecting a **Preset Bundle** enters the guided card-stack flow with bundle locked as the line-item basis unless explicitly edited. Realizes UJ-1.

**Consequences (testable):**
- Selection sets bundle context on **Sticky Booking Bar** within 500ms (skeleton acceptable).
- Back navigation preserves bundle selection and prior pin/slot inputs.

#### FR-3: Compatibility auto-resolution

A user can answer a lightweight platform question (e.g., Mac vs PC) and the system adjusts included accessories in the bundle preview without a separate SKU hunt. Realizes UJ-1.

**Consequences (testable):**
- Changing platform updates **Pricing Breakdown** and included-items list before payment.
- No orphaned accessory SKUs shown as "not included" after auto-resolution.

#### FR-4: Optional bundle edit

A user can depart from the preset via a quick edit path before payment without restarting the flow. Realizes UJ-3.

**Consequences (testable):**
- Edit changes total on **Sticky Booking Bar** within one interaction cycle.
- Edited bundle still satisfies minimum viable setup rules `[ASSUMPTION: ops-defined minimum bundle rules]`.

**Out of Scope:**
- Free-form 3D workspace builder as primary booking path (existing prototype capability is not launch MVP—see §5).

**Notes:** `[ASSUMPTION: Search/filter is secondary; presets outperform search for first-time conversion per UX spec.]`

---

### 4.2 Rental Period & Availability

**Description:** User selects **Rental Period** dates; system checks inventory and influences price. Calendar freshness rules prevent booking on stale availability. Realizes UJ-1, UJ-3.

**Functional Requirements:**

#### FR-5: Date selection with live pricing

A user can select rental start (and end or duration) and see **Pricing Breakdown** update on the **Sticky Booking Bar** without navigating away. Realizes UJ-1.

**Consequences (testable):**
- Changing dates updates total within 2s under normal network conditions.
- Unavailable date ranges are disabled or clearly marked unavailable.

#### FR-6: Inventory-backed availability

The system prevents confirmation of **Bookings** when bundle SKUs are unavailable for the selected **Rental Period**. Realizes UJ-1.

**Consequences (testable):**
- Attempting to pay with insufficient inventory returns a blocking error with alternate bundle or date suggestion.
- No successful payment without inventory reservation hold `[ASSUMPTION: hold duration and race strategy defined in architecture]`.

---

### 4.3 Delivery Location (GPS Pin-Drop)

**Description:** Map-first **Delivery Pin** capture embedded in the final booking card sequence (not a detached flow). Validation states drive progression to slot selection. Realizes UJ-1, UJ-2.

**Functional Requirements:**

#### FR-7: Map pin-drop primary address

A user can set **Delivery Pin** by placing a pin on a map as the primary address method; optional text landmark supplements the pin. Realizes UJ-1.

**Consequences (testable):**
- Pin placement triggers validation request and status chip (validating → valid / invalid).
- Flow cannot advance to slot lock while pin status is invalid.

#### FR-8: Location assist

A user can use device location autofill to center the map `[ASSUMPTION: requires browser permission; graceful deny path]`. Realizes UJ-1.

**Consequences (testable):**
- Denied permission still allows manual pin placement.
- Autofill does not skip validation step.

#### FR-9: Address validation feedback

The system returns validation outcome with inline correction guidance (move pin, add landmark, contact support). Realizes UJ-1, UJ-2.

**Consequences (testable):**
- Invalid pin shows specific next action (not generic error).
- Valid pin enables **Guaranteed Delivery Slot** picker.

#### FR-10: Service area enforcement

The system rejects pins outside the launch **service geography** with clear messaging. Realizes UJ-1.

**Consequences (testable):**
- Out-of-area pin cannot reach payment step.
- Message states supported area `[ASSUMPTION: polygon or radius defined by ops]`.

**Feature-specific NFRs:**
- Map interactions have keyboard/alternative input per WCAG AA (UX §Accessibility).

---

### 4.4 Guaranteed Delivery Slot

**Description:** After valid pin, user selects a narrow **Delivery Slot** from real-time capacity; selection is **locked** before payment and displayed as guaranteed. Realizes UJ-1, UJ-2, UJ-3.

**Functional Requirements:**

#### FR-11: Slot listing

A user with a valid pin sees available **Delivery Slots** as discrete narrow windows (not "all day"). Realizes UJ-1.

**Consequences (testable):**
- Slots display local timezone label consistent with Bali service area.
- Expired or just-taken slots removed or marked unavailable on refresh.

#### FR-12: Slot lock before payment

A user must have a locked **Delivery Slot** before the checkout card enables payment. Realizes UJ-1.

**Consequences (testable):**
- Pay CTA disabled until slot status = locked.
- Slot lock expires after `[ASSUMPTION: 10–15 min]` with user-visible countdown and refresh path.

#### FR-13: Slot contention handling

If a slot becomes unavailable between lock and payment, the user is returned to slot selection with cart preserved. Realizes UJ-1.

**Consequences (testable):**
- Payment attempt on expired slot does not charge; user sees recoverable error.

---

### 4.5 Transparent Pricing & Checkout

**Description:** **Pricing Breakdown** is visible from bundle selection through payment—rent, fees, **Security Deposit**, total. Wallet-first checkout on mobile. No new fees at payment that were not shown earlier. Realizes UJ-1, UJ-3.

**Functional Requirements:**

#### FR-14: Persistent pricing transparency

A user always sees itemized **Pricing Breakdown** on **Sticky Booking Bar** and expanded detail before pay. Realizes UJ-1.

**Consequences (testable):**
- Line items include rental, service fee, deposit, delivery/setup fees as applicable.
- Total on pay button matches breakdown sum to the cent.

#### FR-15: Wallet-first checkout

A user on a supported device can complete payment via Apple Pay or Google Pay as the default path. Realizes UJ-1, UJ-3.

**Consequences (testable):**
- Wallet button visible on supported browsers/devices; card fallback available `[ASSUMPTION: card fallback required for conversion]`.
- Successful payment creates **Booking** in confirmed state.

#### FR-16: Pre-payment authentication policy

A user can reach payment without prior account creation; account/linking may occur post-payment `[ASSUMPTION: email/phone captured at payment per PSP]`. Realizes UJ-1.

**Consequences (testable):**
- No full registration wall before bundle or total exploration.
- Post-payment account creation optional for rebook benefits (UJ-3).

#### FR-17: Payment failure recovery

A user with failed payment sees inline retry and **WhatsApp Escalation** without losing bundle, pin, or slot context (until lock expiry). Realizes UJ-1.

**Consequences (testable):**
- Failed payment does not release inventory hold until lock TTL `[ASSUMPTION: aligned with FR-12]`.

---

### 4.6 Booking Confirmation & WhatsApp Operations Comms

**Description:** Immediate confirmation UX plus automated **WhatsApp Confirmation** with tracking link. Realizes UJ-1, UJ-3.

**Functional Requirements:**

#### FR-18: On-screen confirmation

After successful payment, a user sees confirmation with **Delivery Slot**, bundle summary, and link to **Trust Timeline**. Realizes UJ-1.

**Consequences (testable):**
- Confirmation renders within 3s of payment success under normal conditions.

#### FR-19: WhatsApp transactional message

The system sends **WhatsApp Confirmation** within 60 seconds of payment with delivery window and live tracking URL. Realizes UJ-1.

**Consequences (testable):**
- 95th percentile delivery of WhatsApp message ≤ 60s from payment webhook `[ASSUMPTION: monitored in ops]`.
- Message content matches locked slot and pin summary.

#### FR-20: Tracking deep link

A user can open tracking from WhatsApp or in-app and land on **Trust Timeline** for that **Booking**. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- Deep link resolves to correct booking without login when token valid `[ASSUMPTION: magic link token security model in architecture]`.

---

### 4.7 Fulfillment Timeline & Proof

**Description:** Post-booking **Trust Timeline** communicates operational progress with timestamped milestones. Realizes UJ-1, UJ-2.

**Functional Requirements:**

#### FR-21: Trust timeline states

A user with a confirmed **Booking** sees timeline nodes: confirmed → dispatched → setup in progress → setup complete. Realizes UJ-1.

**Consequences (testable):**
- State transitions driven by ops/system events, not client-only simulation.
- Each node shows timestamp when entered.

#### FR-22: Proactive milestone notifications

A user receives WhatsApp (or push, if enabled later) on major timeline transitions `[ASSUMPTION: WhatsApp-only at launch]`. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- Dispatched and setup-complete transitions trigger outbound message within 60s of ops update.

#### FR-23: Setup-complete proof

Upon setup complete, a user can view proof that white-glove setup finished (photo/checklist showing cable-managed workstation) in the **Trust Timeline**. Realizes UJ-1.

**Consequences (testable):**
- At least one proof artifact attached before marking setup complete.
- Fulfillment confirms physical setup (not drop-off only) before timeline reaches setup complete.
- Full **Proof Center** panel is out of MVP scope—timeline attachment is the launch minimum (see §6).

---

### 4.8 Delivery Exception Recovery

**Description:** When **Delivery Exception** occurs, proactive in-app and WhatsApp communication with inline recovery paths. Realizes UJ-2.

**Functional Requirements:**

#### FR-24: Exception detection surfacing

When ops/system flags an exception, the user sees a **Delivery Exception Card** on timeline and receives WhatsApp alert. Realizes UJ-2.

**Consequences (testable):**
- Exception visible within 60s of ops flag under normal conditions.
- Card states: issue-detected → user-action-needed → resolving → resolved / escalated.
- Supports at minimum: address ambiguity, delay, and stock unavailability (alternate bundle/slot or refund path per policy).

#### FR-25: Address ambiguity recovery

For address issues, a user can submit revised pin, photo, or landmark without rebooking. Realizes UJ-2.

**Consequences (testable):**
- Revised pin re-triggers validation (FR-9).
- Timeline shows audit entry for user-supplied update.

#### FR-26: Delay recovery

For delays, a user can select a revised **Delivery Slot** from offered alternatives. Realizes UJ-2.

**Consequences (testable):**
- Accepting revised slot updates confirmation and WhatsApp summary.

#### FR-27: Human escalation

A user can escalate to human support via **WhatsApp Escalation** from exception or payment error states. Realizes UJ-2.

**Consequences (testable):**
- Escalation pre-fills booking ID and issue context for ops.

---

### 4.9 Repeat Booking *(Post-MVP — v1.1)*

**Description:** Returning users rebook prior **Preset Bundle** and setup profile in minimal taps. Realizes UJ-3. **Not in launch MVP** (§6.2); FRs retained for epic planning.

**Functional Requirements:**

#### FR-28: Rebook entry point

An authenticated or recognized returning user sees **Rebook Previous Setup** on home. Realizes UJ-3.

**Consequences (testable):**
- Entry visible when user has ≥1 completed **Booking**.
- Tap loads prior bundle configuration.

#### FR-29: Price and availability delta

Before pay, a user sees changes vs prior booking (price, unavailable SKUs, slot options). Realizes UJ-3.

**Consequences (testable):**
- Delta copy explicit when weekly rate or fees changed.
- Unavailable components force quick edit (FR-4) or alternate bundle.

#### FR-30: One-tap checkout path

A returning user with valid pin and slot can complete wallet payment in fewer steps than UJ-1. Realizes UJ-3.

**Consequences (testable):**
- Median rebook session time < 50% of first-time median `[ASSUMPTION: measured post-launch]`.

**Out of Scope for MVP:** Marketing automation for post-rental reminders (defer v1.1).

---

### 4.10 Trust & Pre-Booking Confidence (Launch Minimum)

**Description:** Pre-book surfaces establish trust without blocking speed—reliability signals, policy clarity, fee transparency. Deeper **Proof Center** / host panels phased. Realizes UJ-1.

**Functional Requirements:**

#### FR-31: Pre-book trust signals

A user sees verification/trust markers (identity, quality, policy summaries) on landing or bundle cards before payment. Realizes UJ-1.

**Consequences (testable):**
- Policies (cancellation, deposit, damage) reachable within 2 taps from checkout path.
- No trust content behind login wall.

#### FR-32: Policy acknowledgment at commit

A user must acknowledge rental terms before payment. Realizes UJ-1.

**Consequences (testable):**
- Pay disabled until acknowledgment recorded with timestamp on **Booking**.

---

## 5. Non-Goals (Explicit)

- **3D workspace configurator as primary acquisition path** — Launch optimizes preset-to-booked; builder-style customization is not the v1 conversion funnel.
- **Offline booking or offline inventory** — Real-time slots and inventory required.
- **Global/multi-city launch** — Bali service area only until ops playbook proven.
- **Native iOS/Android apps** — Mobile web + PWA enhancements acceptable; native apps v2+.
- **Host marketplace / peer-to-peer inventory** — v1 is operator-curated fleet `[ASSUMPTION]`.
- **Subscription memberships** — Transactional rental per **Booking** only at launch.
- **In-app chat replacement for WhatsApp** — WhatsApp is the operational comms channel at launch.
- **Broad all-day delivery windows** — Explicitly rejected; narrow slots only.

---

## 6. MVP Scope

### 6.1 In Scope (Launch / Phase 1)

Aligned with UX component roadmap Phase 1 + journeys UJ-1 (complete) and minimum UJ-2 path:

| Capability | FRs |
|------------|-----|
| Preset bundles + compatibility | FR-1–4 |
| Rental dates + inventory | FR-5–6 |
| GPS pin-drop + validation + service area | FR-7–10 |
| Guaranteed slot lock | FR-11–13 |
| Pricing transparency + wallet checkout | FR-14–17 |
| Confirmation + WhatsApp + tracking link | FR-18–20 |
| Trust timeline (core states) | FR-21–22 |
| Setup proof on timeline (minimum) | FR-23 |
| Basic exception card + WhatsApp escalation | FR-24–27 (MVP: delay + address paths) |
| Pre-book trust + terms | FR-31–32 |
| Design system tokens + P0 components per UX | UX §Component Strategy Phase 1 |
| WCAG AA on critical paths | §8 (NFR-9–12) |

**Explicit launch experience target:** First **Booking** completable in **< 2 minutes** median on mobile (UJ-1 success criteria from UX).

### 6.2 Out of Scope for MVP

| Item | Reason | Target |
|------|--------|--------|
| Full **Proof Center** panel | Trust depth; timeline proof sufficient for launch | v1.1 |
| **Host Reliability Panel** (expanded) | P2 UX component | v1.1 |
| **Repeat booking** one-tap (FR-28–30) | Retention; requires account/history | v1.1 `[NOTE FOR PM: high ROI soon after launch]` |
| Advanced search/filter catalog | Preset-first conversion strategy | v1.1 |
| Push notifications | WhatsApp covers ops comms | v2 |
| Multi-language UI | English-first nomad audience `[ASSUMPTION]` | v1.2 |
| Airport mode / arrival mode contextual UX | Differentiation post-core funnel | v1.2 |

---

## 7. Success Metrics

**Primary**

- **SM-1: Booking conversion rate** — % of sessions reaching bundle selection that complete paid **Booking** within 7 days. Target: `[ASSUMPTION: 8–12% launch baseline; validate with ops]`. Validates FR-1, FR-2, FR-14, FR-15.
- **SM-2: Median time-to-book** — Median seconds from bundle tap to payment success on mobile. Target: **< 120s** (p50). Validates FR-2, FR-7, FR-11, FR-15.
- **SM-3: Slot-before-pay compliance** — % of paid **Bookings** with locked **Delivery Slot** recorded before charge. Target: **100%**. Validates FR-12, FR-15.
- **SM-4: WhatsApp confirmation SLA** — % of confirmations sent within 60s of payment. Target: **≥ 95%** (p95). Validates FR-19.

**Secondary**

- **SM-5: Pin validation first-attempt success** — % of bookings where pin valid without escalation. Target: `[ASSUMPTION: ≥ 85%]`. Validates FR-9, FR-10.
- **SM-6: Exception recovery satisfaction** — % of UJ-2 sessions resolved without 1-star support survey. Target: `[ASSUMPTION: ≥ 80%]`. Validates FR-24–27.
- **SM-7: Setup-complete on-time rate** — % of **Bookings** where setup complete occurs within promised **Delivery Slot** window. Target: `[ASSUMPTION: ≥ 92%]`. Validates FR-21, FR-22.

**Counter-metrics (do not optimize)**

- **SM-C1: Checkout abandonment after slot lock** — High lock-then-abandon may indicate payment friction; do not "fix" by removing slot lock (optimizes wrong trust model). Counterbalances SM-1.
- **SM-C2: Support WhatsApp volume** — Rising human chats may signal product gaps; do not treat as success. Counterbalances SM-4.
- **SM-C3: Average order value** — Do not maximize AOV at expense of preset speed and trust (no dark-pattern upsells). Counterbalances revenue-only goals.

---

## 8. Cross-Cutting Non-Functional Requirements

### Performance

- **NFR-1:** Above-the-fold landing interactive < 3s on 4G median device.
- **NFR-2:** **Sticky Booking Bar** price updates < 2s after date/bundle change (FR-5, FR-14).
- **NFR-3:** Map pin validation round-trip < 5s p95 under normal load.

### Security & Privacy

- **NFR-4:** Payment card/wallet data handled only via PCI-compliant PSP; no PAN storage on application servers.
- **NFR-5:** Booking tracking links use signed, expiring tokens; no PII in URL query strings.
- **NFR-6:** Location data used for delivery only; retention policy `[ASSUMPTION: 90 days post-rental]` documented in privacy policy.

### Reliability

- **NFR-7:** Booking payment webhook processing idempotent; duplicate webhooks do not double-charge or double-book.
- **NFR-8:** Core booking API availability **99.5%** monthly during launch window `[ASSUMPTION]`.

### Accessibility (WCAG 2.1 AA)

- **NFR-9:** All P0 custom components (pin card, slot picker, sticky bar, pricing block) keyboard-operable with ARIA per UX spec.
- **NFR-10:** Status never conveyed by color alone; icon + text on all booking states.
- **NFR-11:** Minimum 44×44px touch targets on mobile booking CTAs.
- **NFR-12:** Automated a11y scan in CI on critical routes; manual screen reader pass before launch (UX §Testing).

### Observability

- **NFR-13:** Funnel events: bundle_view, pin_valid, slot_locked, payment_started, payment_succeeded, whatsapp_sent, timeline_state_change.
- **NFR-14:** Alert on SM-4 breach (>5% confirmations late in 1h rolling window).

---

## 9. Platform

- **v1:** Responsive mobile web (320px+), Next.js stack `[ASSUMPTION: aligns with repo]`.
- **Breakpoints:** Mobile 320–767px, tablet 768–1023px, desktop 1024px+ (per UX spec; layout adapts, journey logic unchanged).
- **UX conformance:** Interaction, visual, and accessibility implementation must follow `_bmad-output/planning-artifacts/ux-design-specification.md` (pattern policies, P0 component specs, WCAG AA).
- **Desktop:** Enhanced layout (side-by-side trust/pricing); same journey logic (UX responsive strategy).
- **Payments:** Apple Pay, Google Pay primary; card fallback.
- **Maps:** Interactive map for **Delivery Pin** with device geolocation assist.
- **Comms:** WhatsApp Business API for transactional + exception messages.
- **No offline mode.**

---

## 10. Monetization

- **Model:** Transactional rental—weekly (or defined period) bundle price + service fee + refundable **Security Deposit** + delivery/setup fees.
- **Pricing display:** All material charges in **Pricing Breakdown** before pay (anti-pattern: hidden late fees prohibited).
- **Deposit:** Collected at booking; return conditions in policy (FR-31).
- `[ASSUMPTION: Dynamic pricing / surge not in v1]`

---

## 11. Operational Requirements

- Ops console or integrated tool to advance **Trust Timeline** states and flag **Delivery Exception** `[ASSUMPTION: may be lightweight admin v0]`.
- Inventory master and slot capacity fed in real time to FR-6, FR-11.
- Human support queue for WhatsApp escalations with booking context (FR-27).
- Launch staffing plan for same-day / next-day slots `[ASSUMPTION: ops-owned SLA doc]`.

---

## 12. Constraints and Guardrails

### Privacy

- Collect minimum PII for fulfillment; WhatsApp phone number requires explicit opt-in at payment or confirmation.

### Safety / Trust

- Equipment safety and electrical standards met for delivered gear `[ASSUMPTION: ops checklist]`.
- Damage billing only per published policy after **Security Deposit** rules.

### Cost

- `[ASSUMPTION: WhatsApp + maps + PSP fees modeled in unit economics before scale marketing]`

---

## 13. Why Now

- Bali nomad inflow and villa-density create demand for turnkey workspace setup.
- Wallet-native mobile payments and maps APIs make sub-2-minute booking technically feasible.
- Fragmented local vendors lack transparent pricing and guaranteed slots—product wedge is **certainty**, not catalog breadth.

---

## 14. Open Questions

*Deferred at finalize — not phase-blockers for UX/architecture/epics; owners and revisit conditions in `.decision-log.md`.*

1. Exact **service geography** polygon and edge-case handling (e.g., Nusa Penida). *Owner: ops — before geo-fence implementation.*
2. **Rental Period** model: weekly only vs daily minimum; extension and early return policy. *Owner: PM + finance.*
3. **Security Deposit** capture/hold/release mechanics with PSP. *Owner: PM + architecture — before payment integration.*
4. Slot lock TTL and inventory hold coordination under concurrent demand. *Owner: architecture — before slot service design.*
5. Minimum viable ops admin for timeline/exception updates at launch. *Owner: ops + engineering.*
6. Legal entity, rental contract terms, and insurance for equipment damage in Indonesia. *Owner: legal/business — before public launch.*
7. Brand name and domain for customer-facing surfaces (codename: workspace-design-tool). *Owner: marketing.*
8. ~~Whether MVP includes partial UJ-3 (rebook)~~ — **Resolved:** rebook deferred to v1.1 (A-10).

---

## 15. Assumptions Index

| ID | Assumption | Section |
|----|------------|---------|
| A-1 | Bali-only service geography at launch | §2.3, FR-10 |
| A-2 | Weekly rental billing primary | Glossary |
| A-3 | 10–15 min delivery slot lock TTL | FR-12 |
| A-4 | Card fallback required alongside wallets | FR-15 |
| A-5 | Post-payment optional account for rebook | FR-16 |
| A-6 | WhatsApp-only milestone notifications at launch | FR-22 |
| A-7 | Magic-link tracking token security in architecture | FR-20 |
| A-8 | Operator-owned inventory (not P2P) | §5 |
| A-9 | English UI first | §6.2 |
| A-10 | Rebook (FR-28–30) deferred to v1.1 (confirmed at finalize) | §6.2, §4.9, UJ-3 |
| A-11 | 3D builder not launch funnel | §5 |
| A-12 | Conversion targets (SM-1) need baseline validation | SM-1 |
| A-13 | Ops-defined minimum bundle composition rules | FR-4 |
| A-14 | Launch ops SLA for human WhatsApp response undefined | UJ-2 |
