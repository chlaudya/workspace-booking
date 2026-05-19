---
title: 'Multi-instance items for accessories, monitors, lamps, plants, coffee'
type: 'feature'
created: '2026-05-19'
status: 'in-progress'
baseline_commit: 'NO_VCS'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The workspace store enforces one item per slot for every category. A user cannot place two monitors, three plants, or both a keyboard and mouse pad without one replacing the other.

**Approach:** Replace the slot-id model with per-category position grids. Desk and chair stay single-instance. Accessory, monitor, lighting, plant, and coffee become multi-instance: each new placement fills the next free grid position, hidden when the grid is full. Catalog `✓` removes the most-recent instance.

## Boundaries & Constraints

**Always:**
- Single-instance: desk, chair. Multi-instance: accessory, monitor, lighting, plant, coffee.
- Position assignment is deterministic per `(category, indexInCategory)`.
- Each multi-instance category has a hard cap (its grid length). At cap, hide the `+ Add` hotspot; catalog `+` becomes a no-op for that category.
- Cart rows are per-placement. The row X removes that specific placement (by placement id).
- Catalog `+` adds another instance. Catalog `✓` removes the most-recent placement of that product.

**Ask First:**
- If a grid cap feels too tight in real use, surface the new cap before raising it.

**Never:**
- No free-form drag-to-position in 3D.
- No quantity steppers on catalog cards.
- No collision detection — positions are pre-authored to not clash.
- Do not break catalog drag-and-drop onto canvas.

## I/O & Edge-Case Matrix

| Scenario | State / Input | Expected Behavior |
|----------|---------------|-------------------|
| Add first monitor | empty; click `+` on `monitor-27` | placed at `monitor[0]`; ✓ on card; hotspot shifts to `monitor[1]` |
| Add second instance | 1× monitor placed; click `+` on same or different monitor product | placed at `monitor[1]`; cart shows 2 rows |
| Fill monitor grid | 3 monitors placed; click any monitor `+` | no-op; `+ Add Monitor` hidden |
| Click `✓` on placed product | 2× of product placed; click `✓` | most-recent placement removed; ✓ still shown |
| Remove via cart X | mixed placements; click X on a specific row | that placement removed; other items keep positions |
| Replace desk | desk placed; click `+` on different desk | new desk replaces old (single slot) |
| Clear all | any state | every category empty; hotspots return to index 0 |

</frozen-after-approval>

## Code Map

- `lib/workspace-layout.ts` -- defines `CATEGORY_GRIDS` and helpers. Replaces single-slot model.
- `lib/workspace-store.ts` -- zustand store. `PlacedItem` loses `slotId`. Add/remove uses category index.
- `components/workspace/workspace-canvas-3d.tsx` -- `PlacedFurniture` resolves 3D position via `getPositionFor(category, indexInCategory)`.
- `components/workspace/workspace-slot-overlay.tsx` -- one hotspot per category, positioned at the next free grid index in screen space.
- `components/workspace/workspace-builder.tsx` -- `handleQuickAdd` and cart X handlers updated; drop slot-highlight state.
- `lib/workspace-data.ts` -- unchanged.

## Tasks & Acceptance

**Execution:**
- [x] `lib/workspace-layout.ts` -- export `CATEGORY_GRIDS: Record<Category, [number,number,number][]>`, `getPositionFor(category, index)`, `getGridCapacity(category)`, `isUnlimited(category)`. Remove `SlotId` and slot-id helpers.
- [x] `lib/workspace-store.ts` -- drop `slotId` from `PlacedItem`. `addItem`: desk/chair → set `selected*`; multi-instance → append if under capacity. `removeItem(id)` removes by placement id. Add `removeMostRecentByProduct(productId)`. Add `getCategoryItems(category)` returning insertion order. Drop `highlightedSlot`.
- [x] `components/workspace/workspace-canvas-3d.tsx` -- precompute `Map<placementId, indexInCategory>` from items; `PlacedFurniture` looks up its index and resolves position from the grid.
- [x] `components/workspace/workspace-slot-overlay.tsx` -- compute next free index per category; render one hotspot per category at that index's screen position; hide if at capacity. Replace `SLOT_UI_POSITION` with `CATEGORY_UI_POSITIONS: Record<Category, {left,top}[]>`.
- [x] `components/workspace/workspace-builder.tsx` -- `handleQuickAdd`: for desk/chair keep replace/toggle; for multi-instance, ✓ → `removeMostRecentByProduct`, `+` → `addItem` (no-op if at capacity). Cart X buttons (desktop ~L312, mobile ~L444) call `removeItem(item.id)`. Drop `handleSlotClick`'s slot-highlight call; keep `setActiveCategory`.
- [x] `components/workspace/droppable-canvas.tsx` -- pass occupancy `{counts, hasDesk, hasChair}` to overlay; drop `SlotId` import and `highlightedSlot`.

**Acceptance Criteria:**
- Given an empty workspace, when the user clicks `+` on a monitor product twice, then two monitors render at distinct grid positions and the cart shows two rows.
- Given two monitors placed (different products), when the user clicks the cart X on the first row, then only that monitor disappears; the second stays put.
- Given the monitor grid at capacity (3), when the user clicks `+` on any monitor, then nothing happens and `+ Add Monitor` is hidden.
- Given one chair placed, when the user clicks `+` on a different chair, then it's replaced (still one chair).
- Given any state, when the user clicks `Clear all`, then all categories return to empty.

## Design Notes

Category grid positions (3D world coords, pre-authored to not visually clash):

```ts
const DESK_Y = 0.72;
const CATEGORY_GRIDS = {
  desk:      [[0, 0, 0]],
  chair:     [[0, 0, 1.4]],
  monitor:   [[0, DESK_Y, -0.4], [-0.8, DESK_Y, -0.4], [0.8, DESK_Y, -0.4]],
  accessory: [[0, DESK_Y, 0.2], [0.6, DESK_Y, 0.25], [-0.9, DESK_Y, 0.15], [-0.4, DESK_Y, 0.4], [0.4, DESK_Y, 0.4]],
  lighting:  [[1.15, DESK_Y, -0.3], [-1.15, DESK_Y, -0.3], [1.5, 0, -1.4]],
  plant:     [[-2.2, 0, 0.4], [2.2, 0, -0.4], [-2.5, 0, -0.8], [2.5, 0, 0.6]],
  coffee:    [[2.2, 0, 0.4], [-2.4, 0, 0.7]],
};
```

2D overlay positions mirror this — one screen-space `{left,top}` per grid index. Keep current index-0 positions; pick visually adjacent positions for higher indices (slight offset along the same arc).

## Verification

**Commands:**
- `npm run build` -- expected: clean compile.
- `npm run lint` -- expected: no new warnings.

**Manual checks:**
- Click `+` on `monitor-27` three times → 3 monitors in a row on the desk; hotspot disappears.
- Click `✓` on `monitor-27` once → one removed; hotspot reappears.
- Add 2 plants and 2 coffee items → 4 floor-level rows around the platform; cart shows 4 rows.
- Place a desk, click `+` on another desk → swap (no duplicate).
