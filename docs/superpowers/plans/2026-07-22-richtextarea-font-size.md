# RichTextarea Font Size Buttons — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add increase/decrease font size buttons to the `RichTextarea` toolbar that apply to the selected text only via the Range API.

**Architecture:** Single file change in `richTextarea.tsx`. A new `applyFontSize(delta)` function reads the computed font-size from the selection's start element, clamps the new value between 10–36px, and wraps the selection in a `<span style="font-size: Xpx">` using the Range API. Two icon buttons are added to the toolbar to the right of a separator.

**Tech Stack:** React 19, lucide-react ^1.18, `Button` + `Separator` from `~/client/components/ui/`

## Global Constraints

- No new state variables — font size is always read from the DOM at click time
- `onMouseDown` with `e.preventDefault()` on each button — prevents the click from collapsing the `contentEditable` selection before the format is applied
- Step: 2px. Bounds: min 10px, max 36px
- Button size must visually match existing toolbar items: `size-8 rounded-lg p-0` (32×32px) — `size="icon"` built-in is 44px and must NOT be used
- No testing framework in this project — verification is manual in the browser

---

### Task 1: Add `applyFontSize` function and toolbar buttons

**Files:**
- Modify: `src/client/components/campaignSettings/richTextarea.tsx`

**Interfaces:**
- Produces: `applyFontSize(delta: number) => void` — called with `+2` or `-2`

- [ ] **Step 1: Add new imports**

  In `src/client/components/campaignSettings/richTextarea.tsx`, replace the existing import block:

  ```tsx
  import { AArrowDown, AArrowUp, Bold, Italic, Underline } from "lucide-react";
  import { useEffect, useRef, useState } from "react";
  import { Button } from "~/client/components/ui/button";
  import { Separator } from "~/client/components/ui/separator";
  import { ToggleGroup } from "~/client/components/ui/toggle-group";
  import { cn } from "~/lib/utils";
  ```

- [ ] **Step 2: Add `applyFontSize` function inside the component**

  Add this function after `applyFormat`, still inside the `RichTextarea` function body:

  ```tsx
  function applyFontSize(delta: number) {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const startNode = range.startContainer;
    const el =
      startNode.nodeType === Node.TEXT_NODE
        ? startNode.parentElement
        : (startNode as HTMLElement);
    const currentSize =
      parseInt(window.getComputedStyle(el ?? document.body).fontSize) || 14;
    const newSize = Math.min(Math.max(currentSize + delta, 10), 36);

    const span = document.createElement("span");
    span.style.fontSize = `${newSize}px`;

    try {
      range.surroundContents(span);
    } catch {
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
    }

    syncHidden();
  }
  ```

- [ ] **Step 3: Add separator and font size buttons to the toolbar**

  Replace the toolbar `<div>` content (currently just the `ToggleGroup.Root`) with:

  ```tsx
  <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
    <ToggleGroup.Root
      type="multiple"
      value={activeFormats}
      onValueChange={applyFormat}
      className="gap-0.5"
    >
      <ToggleGroup.Item value="bold" variant="icon" aria-label="Negrito">
        <Bold size={15} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" variant="icon" aria-label="Itálico">
        <Italic size={15} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" variant="icon" aria-label="Sublinhado">
        <Underline size={15} />
      </ToggleGroup.Item>
    </ToggleGroup.Root>

    <Separator orientation="vertical" className="h-5" />

    <Button
      type="button"
      variant="ghost"
      className="size-8 rounded-lg p-0"
      aria-label="Diminuir fonte"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => applyFontSize(-2)}
    >
      <AArrowDown size={15} />
    </Button>
    <Button
      type="button"
      variant="ghost"
      className="size-8 rounded-lg p-0"
      aria-label="Aumentar fonte"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => applyFontSize(2)}
    >
      <AArrowUp size={15} />
    </Button>
  </div>
  ```

- [ ] **Step 4: Verify TypeScript compiles without errors**

  ```bash
  cd /var/www/testes/donation-react-router-v7
  npx tsc --noEmit
  ```

  Expected: no errors.

- [ ] **Step 5: Test manually in the browser**

  Start the dev server and open the page that renders `RichTextarea`. Verify:

  1. The toolbar shows the separator and two new icon buttons (A↓ and A↑)
  2. Type some text, select part of it, click A↑ — the selected text grows
  3. Click A↓ — the selected text shrinks
  4. Click A↑ repeatedly until capped — text stops growing at 36px
  5. Click A↓ repeatedly until capped — text stops shrinking at 10px
  6. Apply Bold to text, then select it and apply font size — bold is preserved
  7. Submit a form containing the `RichTextarea` — the hidden input carries the HTML with inline `style="font-size: Xpx"` spans
  8. With no text selected (collapsed cursor), clicking either button does nothing

- [ ] **Step 6: Verify final file looks correct**

  Final `richTextarea.tsx` should be ~95 lines. Check that:
  - No `import * as React` (use named imports only)
  - No native `<button>` elements (use `<Button>` from design system)
  - `type="button"` is set on both buttons (prevents accidental form submit)
