# RichTextarea — Font Size Buttons

**Date:** 2026-07-22  
**Status:** Approved  
**File:** `src/client/components/campaignSettings/richTextarea.tsx`

## Overview

Add increase/decrease font size buttons to the existing `RichTextarea` toolbar. The buttons apply the new size to the currently selected text only, using the Range API to read the actual computed font size from the DOM and wrap the selection in a `<span style="font-size: Xpx">`.

## Behavior

- **Scope:** applies to selected text only; if no text is selected (collapsed or no selection), the action is a no-op
- **Step:** 2px per click
- **Bounds:** minimum 10px, maximum 36px
- **Size detection:** reads `getComputedStyle(startElement).fontSize` at the selection's start node; falls back to 14px if unreadable
- **No visual size indicator** — just the two icon buttons

## Architecture

No new state is introduced. The font size is always derived from the DOM at click time.

### New function: `applyFontSize(delta: number)`

```
1. Call window.getSelection() — if null, isCollapsed, or rangeCount === 0, return early
2. Get the Range from selection.getRangeAt(0)
3. Resolve the parent Element of range.startContainer (text node → parentElement)
4. Read computed font-size via window.getComputedStyle(el).fontSize → parseInt → fallback 14
5. Compute newSize = Math.min(Math.max(currentSize + delta, 10), 36)
6. Create <span style="font-size: ${newSize}px">
7. Try range.surroundContents(span)
   - Fallback on throw: range.extractContents() → span.appendChild(fragment) → range.insertNode(span)
8. Call syncHidden()
```

### UI changes

- Import `AArrowDown`, `AArrowUp` from `lucide-react`
- Import `Separator` from shadcn/ui (or equivalent in `~/client/components/ui/`)
- In the toolbar `<div>`, after the existing `<ToggleGroup.Root>`, add:
  - `<Separator orientation="vertical" className="h-5" />`
  - Two `<Button variant="ghost" className="size-8 rounded-lg p-0">` buttons (override needed: `size="icon"` built-in is `size-11`; must match the 32×32px toolbar items), with `onMouseDown={(e) => e.preventDefault()}` to preserve the selection before the click is processed

### Toolbar layout

```
[ B ] [ I ] [ U ]  |  [ A↓ ] [ A↑ ]
```

## Key constraint: preserving selection on button click

Clicking outside a `contentEditable` collapses the selection before `onClick` fires. Using `onMouseDown` with `e.preventDefault()` prevents the default focus-shift, keeping the selection intact when the font size is applied.

## Files changed

| File | Change |
|---|---|
| `src/client/components/campaignSettings/richTextarea.tsx` | Add `applyFontSize`, two toolbar buttons, separator |

## Out of scope

- No dropdown / select for arbitrary font sizes
- No font size indicator between buttons
- No applying font size to entire content when nothing is selected
- No persisting "last used font size" across interactions
