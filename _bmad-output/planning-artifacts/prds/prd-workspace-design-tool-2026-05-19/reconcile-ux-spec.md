# Input Reconciliation — ux-design-specification.md

**Input:** `_bmad-output/planning-artifacts/ux-design-specification.md` (780 lines, steps 1–14 complete)  
**Compared against:** `prd.md` + (no addendum)

## Summary

PRD captures launch-critical behavioral requirements from the UX spec. Gaps are mostly **qualitative UX policies** (voice, visual tokens, breakpoints) correctly left in the UX artifact. One **scope alignment** fix applied (rebook / UJ-3). One **functional gap** patched (stock exception).

## Captured in PRD

| UX area | PRD coverage |
|---------|----------------|
| Preset-first, no forced signup | FR-1, FR-2, FR-16 |
| Pin → slot → pay signature | FR-7–13, FR-15, Vision |
| Sticky bar + pricing transparency | FR-14, Glossary |
| Wallet checkout | FR-15 |
| WhatsApp 60s confirmation + tracking | FR-19, FR-20 |
| Trust timeline states | FR-21–22 |
| Exception journeys (address, delay) | FR-24–27, UJ-2 |
| P0 components (pin, slot, sticky bar, pricing) | §6.1 references UX Phase 1 |
| WCAG AA, 44px targets, CI a11y | NFR-9–12 |
| Anti-patterns (hidden fees, forced auth, vague windows) | FR-14, FR-16, FR-11 |
| Design direction 2+6 hybrid | Referenced via UX paths in §0 |

## Gaps (acceptable — stay in UX spec)

- Color/typography/spacing tokens (Visual Design Foundation)
- Locked pattern policy IDs (1B, 2C, 3B, 4B) — implementation conformance to UX doc
- Component anatomy/state matrices (GPS Pin-Drop Card, etc.)
- Breakpoint pixel ranges — responsive behavior owned by UX §Responsive
- Emotional journey copy tone ("warm concierge") — UX voice, not PRD FRs

## Gaps (patched in PRD at finalize)

| Gap | Action |
|-----|--------|
| Stock issue in Delivery Exception | FR-24 consequences extended |
| UJ-3 rebook vs MVP exclusion | §2.4, §4.9 labeled v1.1; §6.2 unchanged |
| Same-day / cable-managed setup promise | FR-23 consequence strengthened |

## Qualitative ideas at risk of silent drop

- **"So easy" referral emotion** — partially in §2.2 JTBD; no SM; defer to marketing brief
- **Airport/arrival mode** — correctly in §6.2 out of scope
- **Proof Center / Host Reliability Panel** — deferred v1.1 per both docs
