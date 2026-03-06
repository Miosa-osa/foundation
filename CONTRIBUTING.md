# Contributing to MIOSA Foundation

MIOSA Foundation is a design system with 120+ component demo sections built in Svelte 5. This guide covers everything you need to add a new section, follow project conventions, and get your changes merged.

---

## 1. Getting Started

### Setup

```bash
git clone https://github.com/Miosa-osa/foundation.git
cd foundation
npm install
npm run dev
```

Open `http://localhost:5174` — the dev server redirects automatically to `/component-library`.

### Commands

```bash
npm run dev       # Development server with HMR
npm run build     # Production build
npm run preview   # Preview production build
npm run check     # TypeScript + Svelte type checking
npx vite build    # Verify your section compiles
```

### Project Structure

```
miosa-foundation/
├── src/
│   ├── routes/component-library/
│   │   ├── +page.svelte          # Shell — sidebar navigation + dynamic section rendering
│   │   ├── styles.css            # Library chrome styles (ds-section, ds-card, etc.)
│   │   ├── registry.json         # Machine-readable index of all sections
│   │   ├── AGENT-GUIDE.md        # Protocol for AI agents
│   │   └── sections/             # 120+ section files in 14 category subdirectories
│   │
│   └── lib/
│       ├── ui/                   # 27 Svelte 5 UI primitives (Button, Input, Modal, etc.)
│       ├── components/chat/      # Chat interface components
│       ├── components/ai-elements/ # AI display components
│       └── styles/app.css        # Global styles — pill buttons, glass surfaces, tokens
│
├── app.css                       # Design token root + global resets
├── svelte.config.js
├── vite.config.ts
└── package.json
```

**Where things live:**

| What | Where |
|------|-------|
| Section demos | `src/routes/component-library/sections/<category>/` |
| Sidebar wiring | `src/routes/component-library/+page.svelte` |
| Section registry | `src/routes/component-library/registry.json` |
| Shared UI primitives | `src/lib/ui/` |
| Library chrome CSS | `src/routes/component-library/styles.css` |
| Design tokens | `app.css` (root tokens) and `src/lib/styles/app.css` |

---

## 2. Adding a New Section

### Step 1 — Choose the right category

Place your file in the correct subdirectory under `sections/`. See [Section Categories](#7-section-categories) below for what belongs where.

### Step 2 — Create the section file

Create `sections/<category>/YourSection.svelte` using this template:

```svelte
<script lang="ts">
  // Svelte 5 runes only
  let activeTab = $state('overview');
  let isOpen = $state(false);
</script>

<section class="ds-section">
  <h2 class="ds-title">Section Name</h2>
  <p class="ds-desc">One sentence describing what this section demonstrates.</p>

  <!-- ═══ 1. FIRST SUBSECTION ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Subsection Title</h3>
    <p class="ds-card__sub">Brief description of this pattern.</p>

    <div class="xx-component">
      <div class="xx-component__header">Header content</div>
      <div class="xx-component__body">Body content</div>
    </div>
  </div>

  <!-- ═══ 2. SECOND SUBSECTION ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Another Pattern</h3>
    <p class="ds-card__sub">What this variant demonstrates.</p>

    <div class="xx-variant">
      <span class="xx-variant__label">Label</span>
      <button class="xx-variant__btn xx-variant__btn--primary" onclick={() => isOpen = !isOpen}>
        Toggle
      </button>
    </div>
  </div>
</section>

<style>
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
    margin-bottom: 8px;
  }

  .xx-component__body {
    font-size: 13px;
    color: var(--dt2);
  }

  .xx-variant {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .xx-variant__label {
    font-size: 13px;
    color: var(--dt3);
  }

  .xx-variant__btn {
    padding: 6px 14px;
    border-radius: 9999px;
    border: 1px solid var(--dbd);
    background: var(--dbg3);
    color: var(--dt);
    cursor: pointer;
    font-size: 13px;
  }

  .xx-variant__btn--primary {
    background: var(--dt);
    color: var(--dbg);
    border-color: var(--dt);
  }

  :global(.dark) .xx-component {
    /* Dark mode overrides if the token defaults are not sufficient */
  }
</style>
```

**Key rules for the file:**

- Include 4-6 subsections minimum, each in its own `<div class="ds-card">`
- Use realistic fake demo data (names, emails, dates, metrics)
- Add interactive demos using `$state` — toggles, tabs, selections, filters
- Target 800-2000 lines — rich demos, not toy examples
- Sections must be self-contained — no imports from outside `$lib`

### Step 3 — Pick a unique CSS prefix

Every section uses a 2-3 character prefix. Check `registry.json` for the full list of existing prefixes and pick one that does not conflict. Replace `xx-` in the template with your chosen prefix.

To scan existing prefixes quickly:

```bash
grep '"cssPrefix"' src/routes/component-library/registry.json
```

### Step 4 — Wire it up in `+page.svelte`

Open `src/routes/component-library/+page.svelte` and add three things:

**1. Dynamic import** (in the `importMap` object):

```svelte
'your-section': () => import('./sections/<category>/YourSection.svelte'),
```

**2. Sidebar entry** (in `sectionGroups`, under the correct group):

```svelte
{ id: 'your-section', label: 'Your Section' },
```

**3. Section map entry** (in `sectionMap`):

```svelte
'your-section': YourSection,
```

### Step 5 — Add to `registry.json`

Add an entry to the `sections` array:

```json
{
  "id": "your-section",
  "name": "Your Section",
  "file": "sections/<category>/YourSection.svelte",
  "group": "GroupName",
  "tier": "modules",
  "cssPrefix": "xx-",
  "description": "What this section demonstrates.",
  "tags": ["tag1", "tag2"],
  "appliesWhen": "when the platform has feature X",
  "provides": ["component-name", "pattern-name"]
}
```

If your section maps to a named feature, add or extend `moduleMap`:

```json
"featureKey": {
  "description": "What this feature covers",
  "sections": ["your-section"],
  "cssTokens": ["xx-"]
}
```

### Step 6 — Verify

```bash
npx vite build
```

The build must pass with zero errors before submitting.

---

## 3. Design Token System

All colors in section CSS must come from these tokens. Never hardcode hex values except for semantic accents (success green, error red, warning amber).

```css
:root {
  --dt:   #111;      /* primary text */
  --dt2:  #555;      /* secondary text */
  --dt3:  #888;      /* tertiary text */
  --dt4:  #bbb;      /* quaternary text */
  --dbg:  #fff;      /* base background */
  --dbg2: #f5f5f5;   /* surface */
  --dbg3: #eee;      /* elevated surface */
  --dbd:  #e0e0e0;   /* primary border */
  --dbd2: #f0f0f0;   /* subtle border */
}

.dark {
  --dt:   #fff;
  --dt2:  #aaa;
  --dt3:  #777;
  --dt4:  #555;
  --dbg:  #1a1a1a;
  --dbg2: #242424;
  --dbg3: #2e2e2e;
  --dbd:  #333;
  --dbd2: #2a2a2a;
}
```

| Token group | Use for |
|-------------|---------|
| `--dt` through `--dt4` | Text hierarchy — primary, secondary, tertiary, quaternary |
| `--dbg` through `--dbg3` | Surface hierarchy — base, card, elevated |
| `--dbd`, `--dbd2` | Border hierarchy — primary, subtle |

Dark mode is handled automatically through the `.dark` class toggle on the root element. Section CSS rarely needs explicit `:global(.dark)` overrides — if your section uses only tokens, it adapts for free.

---

## 4. CSS Conventions

### Prefix system

Every section uses a unique 2-3 character prefix on all its CSS classes. This guarantees zero collisions when multiple sections are combined in a single application.

```css
/* Good — all classes scoped by prefix */
.tb-kanban { ... }
.tb-kanban__col { ... }
.tb-kanban__card--overdue { ... }

/* Bad — unprefixed class, will collide */
.kanban { ... }
.card { ... }
```

### Naming convention

Follow BEM-like structure within the prefix:

```
.prefix-component                   block
.prefix-component__element          element
.prefix-component--modifier         modifier
.prefix-component__element--state   element modifier
```

### Rules

- No Tailwind utility classes in section `<style>` blocks — pure CSS custom properties only
- All styles go in the `<style>` block of the section file (scoped by Svelte's compiler)
- The `ds-*` classes (`ds-section`, `ds-card`, `ds-card__title`, etc.) are library chrome — do not modify them from section files
- Semantic accent colors are the only exception to the no-hardcoding rule:

```css
/* Allowed semantic accents */
color: #22c55e;   /* success green */
color: #ef4444;   /* error red */
color: #f59e0b;   /* warning amber */
color: #3b82f6;   /* info blue */
```

---

## 5. Svelte 5 Conventions

This project uses Svelte 5 with runes. Do not use legacy Svelte 3/4 syntax.

### Use runes

```svelte
<script lang="ts">
  // State
  let count = $state(0);
  let isOpen = $state(false);

  // Derived
  let doubled = $derived(count * 2);

  // Effect
  $effect(() => {
    console.log('count changed:', count);
  });

  // Props (for lib/ui/ components)
  let { label, variant = 'default' } = $props<{
    label: string;
    variant?: 'default' | 'primary';
  }>();
</script>
```

### Do not use legacy syntax

```svelte
<!-- Bad — legacy reactive declaration -->
$: doubled = count * 2;

<!-- Bad — legacy prop export -->
export let label: string;

<!-- Bad — legacy event directive -->
<button on:click={handleClick}>

<!-- Good — runes + event attribute -->
let doubled = $derived(count * 2);
let { label } = $props();
<button onclick={handleClick}>
```

### Summary

| Do | Do not |
|----|--------|
| `$state()` | `$:` reactive declarations |
| `$derived()` | `export let` for props |
| `$effect()` | `on:click`, `on:change` directives |
| `$props()` | `createEventDispatcher` |
| `onclick={...}` | `on:click={...}` |

---

## 6. Quality Checklist

Run through this before submitting:

- [ ] **Build passes** — `npx vite build` completes with zero errors
- [ ] **Section renders** — open the section in the browser, verify layout and content
- [ ] **Dark mode works** — toggle dark mode in the top bar, check all colors adapt
- [ ] **CSS prefix is unique** — no collisions with existing prefixes in `registry.json`
- [ ] **Design tokens used** — no hardcoded colors except semantic accents
- [ ] **Interactive demos work** — all toggles, filters, tabs, and buttons function correctly
- [ ] **Minimum 3 subsections** — each in its own `ds-card` wrapper (4-6 is ideal)
- [ ] **Realistic demo data** — names, emails, dates, metrics look real
- [ ] **registry.json updated** — section entry added with correct id, group, tier, prefix, tags
- [ ] **+page.svelte updated** — import, sidebar entry, and sectionMap entry all present
- [ ] **TypeScript clean** — `npm run check` passes with no type errors

---

## 7. Section Categories

Place new sections in the subdirectory that matches their purpose:

| Directory | What belongs here |
|-----------|-------------------|
| `getting-started/` | Overview, orientation, how-to-use introductions |
| `foundation/` | Colors, Typography, Icons, Spacing, Shadows — base visual language |
| `actions/` | Buttons, toggle groups, chips, filters, selection cards — interactive action primitives |
| `inputs-forms/` | Text inputs, selects, comboboxes, sliders, date pickers, file upload, tag input, form layouts |
| `data-display/` | Cards, badges, avatars, tables, accordions, timelines, carousels, media, file browsers |
| `navigation/` | Nav bars, tab bars, menus, context menus, pagination, steppers, command palettes, search |
| `overlays/` | Dialogs, drawers, tooltips, hover cards, alerts, toasts |
| `feedback/` | Progress bars, loading states, spinners, empty states, error states, status messages |
| `ai/` | Chat interfaces, message display, prompt input, model selector, reasoning, suggestions, attachments, tool call cards, agent cards, generation forms |
| `surfaces-effects/` | Glass surfaces, animations, floating elements, animated borders, layout patterns |
| `patterns/` | Auth flows, settings panels, onboarding flows, integration cards, balance/credits, social components |
| `bos-modules/` | Full BOS platform feature modules — Dashboard, Tasks, Team, Knowledge Base, CRM, Calendar, Notifications, Communication, Workspace, Agent Builder, Node Graph, Daily Log, Voice Notes, Profile, App Marketplace, and others |
| `devos-modules/` | DevOS platform modules — Dev Workflows, Code Review, Repo Manager, CI/CD Pipeline, Code Quality, Agent Scheduler |
| `platform/` | SaaS platform features — API Store, Usage Dashboard, Compute, Share/Referral, App Publish, Meetings |
| `reference/` | Reference documentation and module inventory |

If a section genuinely spans two categories, pick the one closest to its primary use case. When in doubt, `patterns/` is a reasonable fallback for cross-cutting layouts.

---

## 8. For AI Agents

If you are an AI agent working in this repository:

- Read `CLAUDE.md` in the project root for the full agent protocol
- Read `src/routes/component-library/AGENT-GUIDE.md` for section extraction and addition protocol
- Use `src/routes/component-library/registry.json` for programmatic section discovery — it contains the full index with tier system, module mapping, CSS prefixes, and apply-order
- Follow the same conventions as human contributors — the template, prefix system, token rules, and wiring steps are identical
- Always run `npx vite build` as the final verification step before reporting completion

The `moduleMap` in `registry.json` maps feature names to section IDs. Use it to find the right section files for a given user request before reading any `.svelte` files.

---

## See Also

- `README.md` — Project overview, design token reference, full prefix table, extraction guide
- `src/routes/component-library/AGENT-GUIDE.md` — Machine-readable agent protocol
- `src/routes/component-library/registry.json` — Structured index of all sections
- `src/lib/ui/` — Shared Svelte 5 UI primitives available for use in sections
