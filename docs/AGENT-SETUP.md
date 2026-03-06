# AGENT-SETUP.md — AI Agent Setup Guide for MIOSA Foundation

This guide tells any AI agent (Claude Code, Cursor, Windsurf, GitHub Copilot, etc.) how to orient, navigate, extract from, and extend the MIOSA Foundation component library effectively.

---

## 1. Overview

MIOSA Foundation is a design system with 120+ component demo sections organized into 18 navigable groups. Every section is a self-contained Svelte 5 file containing interactive HTML demos, scoped CSS (no runtime dependencies), and design-token-driven theming. The library serves two purposes simultaneously:

- **Live reference environment** — browse and interact with every component in the browser
- **Machine-readable source of truth** — agents read section files to extract CSS + HTML patterns for target codebases

The library is framework-agnostic at the extraction level. Patterns are authored in Svelte 5 but extract cleanly to React, Vue, plain HTML, or any other target.

---

## 2. Quick Agent Setup

### Claude Code

The project root contains `CLAUDE.md` with the full agent protocol. Claude Code reads this automatically on project load. No additional setup required.

Key files to prime context:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Root agent instructions — module map, token reference, prefix registry, extraction steps |
| `src/routes/component-library/registry.json` | Machine-readable index of all sections, tiers, prefixes, module map, and token defaults |
| `src/routes/component-library/AGENT-GUIDE.md` | Detailed protocol for adding new sections |

### Cursor / Windsurf / Copilot

Index these files at session start:

1. `src/routes/component-library/registry.json` — section index and module map
2. `src/routes/component-library/AGENT-GUIDE.md` — section creation protocol
3. `CLAUDE.md` — agent instructions (works as a prompt context file for any agent)

### All Agents: The One File That Matters Most

`registry.json` is the single source of truth for navigation. It contains:

- Every section ID, name, file path, group, and CSS prefix
- The `moduleMap` — maps feature names to section IDs
- The `tokens` object — CSS custom property defaults for light and dark
- The `tiers` object — apply-order and required/optional classification

Read `registry.json` before any task involving this library.

---

## 3. Understanding the Codebase

### Key Files

| File | Role |
|------|------|
| `src/routes/component-library/+page.svelte` | The shell. Contains `importMap` (dynamic imports keyed by section ID), `sectionGroups` (sidebar structure), and `groupIcons`. This is where new sections get wired. |
| `src/routes/component-library/styles.css` | Library chrome styles — sidebar, cards, section layout. These are `ds-*` classes, not section CSS. |
| `src/routes/component-library/registry.json` | Structured index — tiers, module mapping, token defaults, CSS prefixes, section metadata. |
| `src/routes/component-library/sections/` | All section files organized into 14 category subdirectories. Each file is one section. |
| `src/lib/ui/` | 27 Svelte 5 UI primitives (Button, Input, Dialog, etc.) used by the library shell. |
| `app.css` | Global token root, pill button styles, glass surface utilities. |

### Section File Anatomy

Every section file follows this structure:

```svelte
<script lang="ts">
  // Svelte 5 runes only — $state, $derived, $effect
  let activeTab = $state('first');
</script>

<section class="ds-section">
  <!-- Library chrome title — not part of extractable pattern -->
  <h2 class="ds-title">Section Name</h2>
  <p class="ds-desc">What patterns this section demonstrates.</p>

  <!-- ═══ 1. SUBSECTION ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Pattern Name</h3>
    <p class="ds-card__sub">Brief description.</p>
    <!-- Demo HTML — extractable. Uses prefixed CSS classes. -->
    <div class="xx-component">
      <div class="xx-component__header">...</div>
      <div class="xx-component__body">...</div>
    </div>
  </div>

  <!-- ═══ 2. NEXT SUBSECTION ═══ -->
  <div class="ds-card">...</div>
</section>

<style>
  /* All classes MUST use the section's unique CSS prefix */
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
  /* Dark mode: .dark class on <html>, tokens update automatically */
</style>
```

The `ds-*` classes (`ds-section`, `ds-card`, `ds-title`) are library chrome. Do not extract them. Extract only the prefixed inner HTML and CSS.

### How `+page.svelte` Works

The shell uses dynamic imports for code splitting. Three data structures control behavior:

- **`importMap`** — `Record<string, () => Promise<{ default: Component }>>` — maps section IDs to lazy import functions. Every section must have an entry here.
- **`sectionGroups`** — array of `{ label: string, items: { id: string, label: string }[] }` — drives the sidebar. Section IDs here must match `importMap` keys.
- **`groupIcons`** — `Record<string, string>` — SVG path strings keyed by group label. Add a new entry when creating a new group.

---

## 4. How to Add a Section (Agent Protocol)

Follow these steps exactly. Do not skip the build verification.

### Step 1: Read registry.json

Identify existing section IDs, CSS prefixes, and which `moduleMap` key (if any) is relevant to the new section.

```
Read: src/routes/component-library/registry.json
```

### Step 2: Choose the right category directory

| Category | Contents |
|----------|----------|
| `getting-started/` | Introductory / orientation content |
| `foundation/` | Colors, Typography, Icons, Spacing, Shadows |
| `actions/` | Buttons, Toggle Groups, interactive action primitives |
| `inputs-forms/` | Form controls, pickers, file inputs, labels |
| `data-display/` | Badges, cards, tables, accordions, media, timelines |
| `navigation/` | Tabs, menus, pagination, command palette, stepper |
| `overlays/` | Dialogs, drawers, tooltips, hover cards, toasts, alerts |
| `feedback/` | Progress, loading, empty states, error states, messages |
| `ai/` | AI chat, message display, reasoning, agent cards, generation |
| `surfaces-effects/` | Glass surfaces, animations, floating elements, borders |
| `patterns/` | Layouts, auth, settings, search, app cards, filter chips |
| `bos-modules/` | Full BOS feature modules (dashboard, CRM, calendar, etc.) |
| `devos-modules/` | DevOS modules (dev workflows, CI/CD, code review, etc.) |
| `platform/` | SaaS platform features (usage, billing, API store, publish) |
| `reference/` | Reference documentation sections |

### Step 3: Create the .svelte file

Requirements:

1. Pick a unique 2-3 character CSS prefix — check the prefix registry in Section 6 of this document and in `registry.json`. The prefix must not already be in use.
2. Use Svelte 5 runes only (`$state`, `$derived`, `$effect`). No `$:` reactive statements.
3. Include 4-6 `ds-card` subsections with realistic demo data.
4. Use design tokens (`var(--dt)`, `var(--dbg)`, `var(--dbd)` families) for ALL colors. Never hardcode `#hex` values except for semantic status colors (e.g., `#22c55e` for success, `#ef4444` for error).
5. Make demos interactive with `$state` — toggles, selections, active states.
6. Target 800-2000 lines. Enough for rich demos; avoid bloat.
7. No imports inside the section file. Sections must be self-contained.

### Step 4: Wire into +page.svelte

Three additions required:

```svelte
// 1. Add to importMap (alphabetical order by key preferred)
'your-section-id': () => import('./sections/{category}/YourSection.svelte'),

// 2. Add to sectionGroups under the correct group label
{ id: 'your-section-id', label: 'Your Section Label' },

// 3. (No separate sectionMap needed — importMap drives rendering directly)
```

### Step 5: Add to registry.json

Add to the `sections` array:

```json
{
  "id": "your-section-id",
  "name": "Your Section Name",
  "file": "sections/{category}/YourSection.svelte",
  "group": "Group Name",
  "tier": "modules",
  "cssPrefix": "xx-",
  "description": "What patterns this section demonstrates.",
  "tags": ["tag1", "tag2"],
  "appliesWhen": "When the target platform has feature X",
  "provides": ["component-name", "pattern-name"]
}
```

If the section maps to a user-facing feature, add or update `moduleMap`:

```json
"featureKey": {
  "description": "What this feature is",
  "sections": ["your-section-id"],
  "cssTokens": ["xx-"]
}
```

### Step 6: Build verify

```bash
npx vite build
```

The build must pass with zero errors before claiming done.

---

## 5. Design Token Reference

All components use CSS custom properties. Set these in your application's root stylesheet. Dark mode activates by adding the `.dark` class to `<html>`.

| Token | Light value | Dark value | Semantic role |
|-------|------------|------------|---------------|
| `--dt` | `#111` | `#fff` | Primary text |
| `--dt2` | `#555` | `#aaa` | Secondary text |
| `--dt3` | `#888` | `#777` | Tertiary text (labels, captions) |
| `--dt4` | `#bbb` | `#555` | Quaternary text (placeholders, disabled) |
| `--dbg` | `#fff` | `#1a1a1a` | Base background |
| `--dbg2` | `#f5f5f5` | `#242424` | Surface background (cards, panels) |
| `--dbg3` | `#eee` | `#2e2e2e` | Elevated surface (hover states, raised cards) |
| `--dbd` | `#e0e0e0` | `#333` | Primary border |
| `--dbd2` | `#f0f0f0` | `#2a2a2a` | Subtle border (dividers, insets) |

Full CSS block to paste into any target application:

```css
:root {
  --dt:   #111;
  --dt2:  #555;
  --dt3:  #888;
  --dt4:  #bbb;
  --dbg:  #fff;
  --dbg2: #f5f5f5;
  --dbg3: #eee;
  --dbd:  #e0e0e0;
  --dbd2: #f0f0f0;
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

---

## 6. CSS Prefix Registry

When creating a new section, pick a prefix that does not appear in this table. Check `registry.json` for the definitive live list — this table covers the known registered prefixes as of the initial library release.

| Prefix | Section |
|--------|---------|
| `dk-` | Desktop Dock |
| `dw-` | Dashboard Widgets |
| `tb-` | Task Board |
| `td-` | Team Directory |
| `kb-` | Knowledge Base |
| `dt2-` | Data Tables |
| `cr-` | Client CRM |
| `cs-` | Calendar & Schedule |
| `nc-` | Notification Center |
| `ch-` | Communication Hub |
| `wm-` | Workspace Manager |
| `ab2-` | Agent Builder |
| `ng-` | Node Graph Editor |
| `dl-` | Daily Log |
| `vn-` | Voice Notes |
| `pa-` | Profile & Account |
| `am-` | App Marketplace |
| `ow-` | Onboarding Wizard |

For sections in foundation, primitives, patterns, and effects groups — check `registry.json` directly, as those sections also define prefixes that are not all listed here.

**Rule:** A prefix is 2-3 lowercase characters followed by a hyphen (`xx-`). It must be unique across the entire library. When in doubt, pick something with 3 characters and verify against the registry.

---

## 7. Section Template

Copy this starter template when creating a new section. Replace `xx-` with your chosen prefix and fill in realistic demo content.

```svelte
<script lang="ts">
  let activeTab = $state('first');
  let isActive = $state(false);
  let selectedItem = $state<string | null>(null);
</script>

<section class="ds-section">
  <h2 class="ds-title">Section Name</h2>
  <p class="ds-desc">
    Description of what patterns this section demonstrates and when to use them.
  </p>

  <!-- ═══ 1. FIRST PATTERN ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Pattern One</h3>
    <p class="ds-card__sub">Brief description of this specific pattern.</p>

    <div class="xx-container">
      <div class="xx-container__header">
        <span class="xx-container__title">Example Title</span>
        <span class="xx-container__badge">Live</span>
      </div>
      <div class="xx-container__body">
        <button
          class="xx-btn"
          class:xx-btn--active={isActive}
          onclick={() => isActive = !isActive}
        >
          Toggle State
        </button>
      </div>
    </div>
  </div>

  <!-- ═══ 2. SECOND PATTERN ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Pattern Two</h3>
    <p class="ds-card__sub">Brief description.</p>

    <div class="xx-list">
      {#each ['Item A', 'Item B', 'Item C'] as item}
        <div
          class="xx-list__item"
          class:xx-list__item--selected={selectedItem === item}
          onclick={() => selectedItem = item}
          role="button"
          tabindex="0"
        >
          <span class="xx-list__label">{item}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- ═══ 3. THIRD PATTERN ═══ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Pattern Three</h3>
    <p class="ds-card__sub">Brief description.</p>

    <!-- demo content -->
  </div>
</section>

<style>
  /* ── Container ───────────────────────────── */
  .xx-container {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 12px;
    overflow: hidden;
  }
  .xx-container__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--dbd);
  }
  .xx-container__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--dt);
  }
  .xx-container__badge {
    font-size: 11px;
    font-weight: 500;
    color: var(--dt3);
    background: var(--dbg3);
    border: 1px solid var(--dbd);
    border-radius: 9999px;
    padding: 2px 8px;
  }
  .xx-container__body {
    padding: 16px;
  }

  /* ── Button ──────────────────────────────── */
  .xx-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    color: var(--dt);
    background: var(--dbg3);
    border: 1px solid var(--dbd);
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .xx-btn:hover {
    background: var(--dbg2);
  }
  .xx-btn--active {
    background: var(--dt);
    color: var(--dbg);
    border-color: var(--dt);
  }

  /* ── List ────────────────────────────────── */
  .xx-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .xx-list__item {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.12s;
  }
  .xx-list__item:hover {
    background: var(--dbg3);
  }
  .xx-list__item--selected {
    background: var(--dt);
    border-color: var(--dt);
  }
  .xx-list__item--selected .xx-list__label {
    color: var(--dbg);
  }
  .xx-list__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--dt);
  }
</style>
```

---

## 8. Module Mapping

When a user asks for a feature, use this table to find the right section(s) to read. The `moduleMap` key in `registry.json` is the canonical lookup.

| User asks for... | moduleMap key | Section file(s) |
|------------------|---------------|-----------------|
| dashboard, metrics, analytics overview | `dashboard` | `bos-modules/DashboardWidgets.svelte` |
| tasks, kanban, to-do | `tasks` | `bos-modules/TaskBoard.svelte` |
| team, org chart, directory | `team` | `bos-modules/TeamDirectory.svelte` |
| knowledge base, docs, wiki | `knowledgeBase` | `bos-modules/KnowledgeBase.svelte` |
| data tables, spreadsheet, grid | `dataTables` | `bos-modules/DataTables.svelte` |
| CRM, clients, pipeline, deals | `crm` | `bos-modules/ClientCRM.svelte` |
| calendar, schedule, events | `calendar` | `bos-modules/CalendarSchedule.svelte` |
| notifications, alerts inbox | `notifications` | `bos-modules/NotificationCenter.svelte` |
| onboarding, setup wizard | `onboarding` | `bos-modules/OnboardingWizard.svelte`, `bos-modules/OnboardingFlows.svelte` |
| email, chat, messaging, video call | `communication` | `bos-modules/CommunicationHub.svelte` |
| workspace, permissions, RBAC | `workspace` | `bos-modules/WorkspaceManager.svelte` |
| agent builder, AI agent config | `agents` | `bos-modules/AgentBuilder.svelte`, `ai/AiAgentCards.svelte` |
| node graph, flow editor, canvas | `nodes` | `bos-modules/NodeGraphEditor.svelte` |
| daily log, journal, mood tracker | `dailyLog` | `bos-modules/DailyLog.svelte` |
| voice notes, audio, recording | `voice` | `bos-modules/VoiceNotes.svelte` |
| profile, account settings | `profile` | `bos-modules/ProfileAccount.svelte` |
| app store, marketplace | `appStore` | `bos-modules/AppMarketplace.svelte`, `platform/AppPublishForm.svelte` |
| AI chat, chatbot | `aiChat` | `ai/AiChat.svelte` + 8 other `ai/` sections |
| dock, desktop shell, OS | `desktopShell` | `bos-modules/DesktopDock.svelte` |
| auth, login, signup | `auth` | `patterns/AuthPatterns.svelte` |
| billing, credits, pricing | `billing` | `platform/UsageDashboard.svelte`, `platform/BalanceCredits.svelte` |
| settings | `settings` | `patterns/SettingsPatterns.svelte` |
| content creation, publishing | — | `bos-modules/ContentOS.svelte`, `bos-modules/ContentOSGeneration.svelte` |
| dev workflows, CI/CD, code review | — | `devos-modules/` directory |

### Apply-Order Rule (Narrow to Wide)

Always apply tiers in this order when building a target application. Later tiers depend on earlier ones being present:

1. **Foundation** (required) — `foundation/` sections. Tokens + typography + spacing.
2. **Primitives** (required) — `actions/`, `inputs-forms/`, `data-display/`, `navigation/`, `overlays/`, `feedback/` sections.
3. **Patterns** (as needed) — `patterns/`, `surfaces-effects/` sections.
4. **Modules** (pick by feature) — `bos-modules/`, `devos-modules/` sections.
5. **AI** (if platform has AI) — `ai/` sections.
6. **Platform** (if SaaS) — `platform/` sections.

---

## 9. Common Mistakes

These are the errors agents and developers make most often. Check against this list before committing.

### Svelte 5 Syntax

| Wrong | Correct |
|-------|---------|
| `$: derived = value * 2` | `let derived = $derived(value * 2)` |
| `$: { sideEffect() }` | `$effect(() => { sideEffect() })` |
| `export let prop` | `let { prop } = $props()` |
| `on:click={handler}` | `onclick={handler}` |

### Design Tokens

- **Wrong:** `color: #111;` or `background: white;`
- **Correct:** `color: var(--dt);` or `background: var(--dbg);`
- **Exception:** Semantic status colors (green for success, red for error, amber for warning) may be hardcoded hex values.

### Dark Mode

- Dark mode is not a separate CSS block per component. It works automatically because all colors use tokens and the tokens change when `.dark` is on `<html>`.
- If a component looks wrong in dark mode, you likely hardcoded a color value instead of using a token.

### CSS Prefix Collisions

- Before picking a prefix, search `registry.json` for the candidate string.
- `dt-` is reserved by the browser (data-* attributes context). Use `dt2-` (already taken) or another prefix.
- Never use a single character prefix.

### Wiring Omissions

- Forgot to add the entry to `importMap` in `+page.svelte` — section silently fails to load.
- Forgot to add the item to `sectionGroups` — section is unreachable from the sidebar.
- Forgot to add to `registry.json` — section is invisible to agents and the module map.
- All three wiring steps are required. Missing any one breaks the section.

### File Location

- Sections placed directly under `sections/` (not in a subdirectory) will not match the expected import path pattern.
- Always place new files inside the correct category subdirectory.

### Self-Containment

- Section files must not import other components or utilities. They are pure CSS + HTML demos.
- Exception: Svelte 5 built-ins (`$state`, `$derived`, `$effect`, `$props`) are always available and do not require imports.

---

## 10. Verification Checklist

Run through this checklist before claiming a section is complete.

### Build

```bash
npx vite build
```

The build must produce zero errors and zero TypeScript diagnostics.

### Functional verification

- [ ] Section ID exists in `importMap` in `+page.svelte`
- [ ] Section label exists in `sectionGroups` under the correct group in `+page.svelte`
- [ ] Section entry exists in `registry.json` with correct ID, file path, group, tier, and prefix
- [ ] CSS prefix is unique (verified against registry)
- [ ] Section contains 4-6 `ds-card` subsections
- [ ] No hardcoded hex colors (except semantic status colors)
- [ ] All interactive elements use `$state` (no `$:` reactive statements)

### Runtime verification (dev server)

```bash
npm run dev
```

Open `http://localhost:5174` and verify:

- [ ] Section appears in the sidebar under the correct group
- [ ] Clicking the sidebar item renders the section (no blank page, no console errors)
- [ ] Dark mode toggle (top-right button) switches correctly — all colors update, nothing stays hardcoded
- [ ] Interactive demos respond — buttons toggle, selections highlight, states change
- [ ] No layout overflow or broken spacing at default viewport width

---

## See Also

- `CLAUDE.md` — Root agent protocol with quick-reference module map and token table
- `src/routes/component-library/AGENT-GUIDE.md` — Detailed section creation protocol with extraction examples
- `src/routes/component-library/registry.json` — Machine-readable index (canonical source of truth)
- `README.md` — Project overview, tech stack, and component group listing
