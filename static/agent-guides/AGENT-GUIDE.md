# Agent Guide: Working with MIOSA Foundation

This file tells AI agents exactly how to use, extract from, and extend this component library.

---

## 1. FINDING COMPONENTS

### Step 1: Read the registry
```
Read: src/routes/component-library/registry.json
```

### Step 2: Match features to sections
The `moduleMap` object maps feature names to section IDs:
```json
"dashboard": { "sections": ["dashboard-widgets"] }
"tasks": { "sections": ["task-board"] }
"crm": { "sections": ["client-crm"] }
```

### Step 3: Read the section file
Sections are organized into category subdirectories. Match the section to its category, then read:
```
Read: src/routes/component-library/sections/{category}/{SectionName}.svelte
```

Categories: `getting-started`, `foundation`, `actions`, `inputs-forms`, `data-display`, `navigation`, `overlays`, `feedback`, `ai`, `surfaces-effects`, `patterns`, `bos-modules`, `platform`, `reference`

Each file contains 4-6 subsections. Each subsection is wrapped in `<div class="ds-card">` with an `<h3>` title.

---

## 2. EXTRACTING PATTERNS TO A NEW CODEBASE

### What you ALWAYS need (copy these first):

**Design tokens** — paste into the target app's global CSS:
```css
:root {
  --dt: #111; --dt2: #555; --dt3: #888; --dt4: #bbb;
  --dbg: #fff; --dbg2: #f5f5f5; --dbg3: #eee;
  --dbd: #e0e0e0; --dbd2: #f0f0f0;
}
.dark {
  --dt: #fff; --dt2: #aaa; --dt3: #777; --dt4: #555;
  --dbg: #1a1a1a; --dbg2: #242424; --dbg3: #2e2e2e;
  --dbd: #333; --dbd2: #2a2a2a;
}
```

### Extraction steps:

1. **Identify the subsection** you need (look for the `<h3>` title)
2. **Copy the HTML** inside the `<div class="ds-card">` (skip the ds-card wrapper itself)
3. **Copy the CSS** — search the `<style>` block for the section's CSS prefix
4. **Adapt framework syntax:**
   - Svelte → keep as-is
   - React → change `class=` to `className=`, `onclick=` to `onClick=`, etc.
   - Vue → change `onclick=` to `@click=`, keep `class=`
   - Plain HTML → remove `$state` reactivity, use vanilla JS
5. **Replace demo data** with real data bindings

### Example: Extracting a Kanban board from TaskBoard.svelte

```
Source: sections/bos-modules/TaskBoard.svelte → subsection "Kanban Board"
CSS prefix: tb-
```

Extract the HTML:
```html
<div class="tb-kanban">
  <div class="tb-kanban__col">
    <div class="tb-kanban__col-header">
      <span class="tb-kanban__col-title">To Do</span>
      <span class="tb-kanban__col-count">3</span>
    </div>
    <div class="tb-kanban__card">...</div>
  </div>
</div>
```

Extract matching CSS (everything starting with `tb-kanban`):
```css
.tb-kanban { display: flex; gap: 16px; ... }
.tb-kanban__col { ... }
.tb-kanban__card { ... }
```

---

## 3. ADDING A NEW SECTION

### File template

```svelte
<script lang="ts">
  // Use $state for interactive demo state
  let exampleState = $state('default');
</script>

<section class="ds-section">
  <!-- ═══ 1. SUBSECTION NAME ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Subsection Title</h3>
    <p class="ds-card__sub">Brief description of this pattern.</p>

    <!-- Demo content with prefixed CSS classes -->
    <div class="xx-component">
      <div class="xx-component__header">...</div>
      <div class="xx-component__body">...</div>
    </div>
  </div>

  <!-- ═══ 2. NEXT SUBSECTION ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Next Pattern</h3>
    <!-- ... -->
  </div>
</section>

<style>
  /* All classes MUST use the section prefix */
  .xx-component {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 12px;
    padding: 16px;
  }
  .xx-component__header {
    font-size: 14px;
    font-weight: 600;
    color: var(--dt);
  }
</style>
```

### Rules:
1. **Category directory** — place the file in the correct subdirectory under `sections/`:
   - `getting-started/` — introductory/overview content
   - `foundation/` — Colors, Typography, Icons, Spacing, Shadows
   - `actions/` — Buttons, ToggleGroups, and interactive action primitives
   - `inputs-forms/` — form controls, pickers, file inputs, labels
   - `data-display/` — badges, cards, tables, accordions, media, timelines
   - `navigation/` — tabs, menus, pagination, command palette, stepper
   - `overlays/` — dialogs, drawers, tooltips, hover cards, toasts, alerts
   - `feedback/` — progress, empty states, error states, loading, messages
   - `ai/` — AI chat, message display, reasoning, agent cards, generation
   - `surfaces-effects/` — glass surfaces, animations, floating elements, borders
   - `patterns/` — layouts, auth, settings, search, app cards, filter chips
   - `bos-modules/` — full BOS feature modules (dashboard, CRM, calendar, etc.)
   - `platform/` — SaaS platform features (usage, billing, API store, publish)
   - `reference/` — reference documentation sections
2. **CSS prefix** — pick a unique 2-3 char prefix (check registry.json for existing ones)
3. **Design tokens** — use `var(--dt)`, `var(--dbg)`, `var(--dbd)` family for ALL colors
4. **No imports** — sections must be self-contained pure CSS demos
5. **Realistic content** — use fake but realistic demo data (names, emails, dates)
6. **4-6 subsections** — each in its own `ds-card` wrapper
7. **Interactive demos** — use `$state` for toggles, selections, hover states
8. **Target 800-2000 lines** — enough for rich demos without bloat

### Wiring steps:

**`+page.svelte`** — add 3 things:

```svelte
// 1. Import (in the imports section — use the correct category subdirectory)
import NewSection from './sections/{category}/NewSection.svelte';

// 2. Sidebar item (in sectionGroups, under the right group)
{ id: 'new-section', label: 'New Section' },

// 3. sectionMap entry
'new-section': NewSection,
```

**`registry.json`** — add to `sections` array:
```json
{
  "id": "new-section",
  "name": "New Section",
  "file": "sections/{category}/NewSection.svelte",
  "group": "GroupName",
  "tier": "modules",
  "cssPrefix": "xx-",
  "description": "What this section demonstrates",
  "tags": ["tag1", "tag2"],
  "appliesWhen": "when the platform has feature X",
  "provides": ["component-name", "pattern-name"]
}
```

If it maps to a feature, add/update `moduleMap`:
```json
"featureKey": {
  "description": "What this feature is",
  "sections": ["new-section"],
  "cssTokens": ["xx-"]
}
```

### Verify:
```bash
npx vite build
```

---

## 4. MODIFYING EXISTING SECTIONS

1. Read the section file first
2. Find the subsection by `<h3>` title
3. Edit within the `ds-card` wrapper
4. Keep the CSS prefix consistent
5. Build to verify

---

## 5. UNDERSTANDING THE TIER SYSTEM

| Tier | Required? | What's in it |
|------|-----------|-------------|
| `foundation` | YES | Colors, Typography, Icons, Spacing, Shadows |
| `primitives` | YES | Buttons, Inputs, Selects, Badges, Avatars, Tables, etc. |
| `patterns` | As needed | Layouts, Glass, Animations, Auth, Settings, Social |
| `modules` | Pick by feature | Dashboard, Tasks, CRM, Calendar, Communication, etc. |
| `ai` | If has AI | Chat, Messages, Reasoning, Agent Cards, Generation |
| `platform` | If SaaS | API Store, Usage, Share, App Publish, Meetings |

**Foundation + Primitives are always applied.** Everything else is conditional.

---

## 6. DESIGN PRINCIPLES (follow these when adding/extracting)

- **Dark Monochrome** — Black-to-dark gradients as primary surfaces. Contrast through weight, not color.
- **Glassmorphism** — `backdrop-filter: blur()` surfaces. Subtle borders and inner glow.
- **Pill-First** — Full-radius pill shapes (9999px) as the default button/interaction style.
- **Token-Driven** — Every color through CSS custom properties. Never hardcode #hex except for accent colors (status green, error red, etc.).
- **Prefix-Scoped** — Every CSS class uses the section's unique prefix. Zero global pollution.
