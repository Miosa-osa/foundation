# MIOSA Foundation — Setup Guide for Coding Agents

How to set up a new codebase using MIOSA Foundation. Follow this step by step.

---

## Step 0: Understand What This Is

MIOSA Foundation is a library of 120+ pure CSS patterns with HTML structure demos. You do NOT install it as an npm package. You **extract CSS and HTML** from the section files and paste them into your app.

The output is framework-agnostic: the CSS works in React, Vue, Svelte, Angular, or plain HTML.

---

## Step 1: Clone the Foundation (Reference Only)

```bash
git clone https://github.com/Miosa-osa/foundation.git miosa-foundation
cd miosa-foundation && npm install
npm run dev   # Browse at http://localhost:5174/component-library
```

Keep this running as your reference. You will copy from it — not import from it.

---

## Step 2: Set Up Design Tokens in Your App

This is **mandatory**. Every component in the library references these CSS custom properties. Paste this into your app's global CSS (e.g., `app.css`, `globals.css`, `index.css`):

```css
:root {
  /* Text hierarchy */
  --dt:   #111;      /* primary text */
  --dt2:  #555;      /* secondary text */
  --dt3:  #888;      /* tertiary text */
  --dt4:  #bbb;      /* quaternary text */

  /* Backgrounds */
  --dbg:  #fff;      /* base background */
  --dbg2: #f5f5f5;   /* surface */
  --dbg3: #eee;      /* elevated surface */

  /* Borders */
  --dbd:  #e0e0e0;   /* primary border */
  --dbd2: #f0f0f0;   /* subtle border */
}

/* Dark mode — add .dark class to <html> or <body> */
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

**Customize these values to match your brand.** The entire library adapts automatically.

---

## Step 3: Copy the Button System

The button system is used by every module. Copy it from `src/lib/styles/app.css` in the foundation repo. You need all four shape families:

| Shape | Class | Radius | Use For |
|-------|-------|--------|---------|
| Pill | `.btn-pill` | 9999px | Primary CTAs, hero actions, onboarding |
| Rounded | `.btn-rounded` | 8px | Forms, settings, cards, dialog footers |
| Compact | `.btn-compact` | 6px | Toolbars, data tables, dense UIs |
| Glass | `.btn-glass` | Inherits | Overlays, dark backgrounds, glass surfaces |

Each shape has variants: `primary`, `secondary`, `ghost`, `outline`, `soft`, `danger`, `success`, `warning`.

Glass has its own variants: `light`, `dark`, `frosted`, `subtle`, `accent`.

Sizes: `xs`, `sm`, (default), `lg`, `xl`.

**Usage:**
```html
<button class="btn-pill btn-pill-primary btn-pill-lg">Get Started</button>
<button class="btn-rounded btn-rounded-primary">Save Changes</button>
<button class="btn-compact btn-compact-ghost btn-compact-icon">+</button>
<button class="btn-glass btn-glass-pill btn-glass-accent">New Project</button>
```

---

## Step 4: Copy Foundation Tier (Required)

Read these 5 section files from `sections/foundation/`:

| Section | File | What You Get |
|---------|------|-------------|
| Colors | `Colors.svelte` | Color palette, semantic colors, opacity system |
| Typography | `Typography.svelte` | Font scale, weights, line heights, text styles |
| Icons | `Icons.svelte` | Icon sizing, containers, badge overlays |
| Spacing | `Spacing.svelte` | Spacing scale, padding/margin patterns |
| Shadows | `Shadows.svelte` | Elevation system, shadow tokens |

Extract the CSS from each `<style>` block. These define the visual language everything else builds on.

---

## Step 5: Copy Primitives Tier (Required)

Read these section files from `sections/actions/`, `sections/inputs-forms/`, and `sections/data-display/`:

| Section | File | What You Get |
|---------|------|-------------|
| Buttons | `actions/Buttons.svelte` | All button shapes, variants, sizes, states |
| Toggle Groups | `actions/ToggleGroups.svelte` | Segmented controls, radio groups |
| Text Inputs | `inputs-forms/Inputs.svelte` | Input fields, textareas, search bars |
| Form Controls | `inputs-forms/FormControls.svelte` | Checkboxes, radios, toggles |
| Selects | `inputs-forms/Selects.svelte` | Dropdowns, multi-select |
| Badges | `data-display/Badges.svelte` | Status badges, counts, dots |
| Avatars | `data-display/Avatars.svelte` | User avatars, groups, status indicators |

These are the building blocks. Every module uses them.

---

## Step 6: Select Your Modules

This is where you choose what your app needs. **Only copy what you actually use.**

### Module Selection Checklist

Check what your app needs, then read the corresponding section file:

**Core Business:**
- [ ] Dashboard → `bos-modules/DashboardWidgets.svelte`
- [ ] Tasks / Kanban → `bos-modules/TaskBoard.svelte`
- [ ] Team / Org Chart → `bos-modules/TeamDirectory.svelte`
- [ ] CRM / Clients → `bos-modules/ClientCRM.svelte`
- [ ] Calendar / Scheduling → `bos-modules/CalendarSchedule.svelte`
- [ ] Knowledge Base / Wiki → `bos-modules/KnowledgeBase.svelte`
- [ ] Data Tables → `bos-modules/DataTables.svelte` (in `data-display/`)
- [ ] Project Management → `bos-modules/ProjectManager.svelte`

**Communication:**
- [ ] Email / Chat / Video → `bos-modules/CommunicationHub.svelte`
- [ ] Notifications → `bos-modules/NotificationCenter.svelte`
- [ ] Voice Notes → `bos-modules/VoiceNotes.svelte`
- [ ] Daily Log / Journal → `bos-modules/DailyLog.svelte`

**Platform & Settings:**
- [ ] User Profile / Account → `bos-modules/ProfileAccount.svelte`
- [ ] System Settings → `bos-modules/SystemSettings.svelte`
- [ ] Workspace / Permissions → `bos-modules/WorkspaceManager.svelte`
- [ ] Onboarding Flow → `bos-modules/OnboardingWizard.svelte`
- [ ] App Marketplace → `bos-modules/AppMarketplace.svelte`
- [ ] Help Center → `bos-modules/HelpCenter.svelte`

**AI Features:**
- [ ] AI Chat / Chatbot → `ai/AiChat.svelte` + `ai/MessageDisplay.svelte` + `ai/ChatInputPatterns.svelte`
- [ ] AI Reasoning Display → `ai/Reasoning.svelte`
- [ ] AI Agent Builder → `bos-modules/AgentBuilder.svelte`
- [ ] AI Agent Cards → `ai/AiAgentCards.svelte`
- [ ] Model Selector → `ai/ModelSelector.svelte`
- [ ] AI Suggestions → `ai/AiSuggestions.svelte`
- [ ] Node Graph / Flow Editor → `bos-modules/NodeGraphEditor.svelte`

**Content (ContentOS):**
- [ ] Content Management → `bos-modules/ContentOS.svelte`
- [ ] AI Generation → `bos-modules/ContentOSGeneration.svelte`
- [ ] Character Studio → `bos-modules/ContentOSStudio.svelte`
- [ ] Batch & Orders → `bos-modules/ContentOSBatch.svelte`
- [ ] Prompts & Pricing → `bos-modules/ContentOSPrompts.svelte`

**SaaS Platform:**
- [ ] API Store → `platform/ApiStoreBrowser.svelte`
- [ ] Usage Dashboard → `platform/UsageDashboard.svelte`
- [ ] Billing / Credits → `platform/BalanceCredits.svelte`
- [ ] Share / Referral → `platform/ShareReferral.svelte`
- [ ] App Publishing → `platform/AppPublishForm.svelte`

**Patterns & Surfaces:**
- [ ] Auth / Login / Signup → `patterns/AuthPatterns.svelte`
- [ ] Settings Layout → `patterns/SettingsPatterns.svelte`
- [ ] Glass Surfaces → `surfaces-effects/GlassSurfaces.svelte`
- [ ] Animations → `surfaces-effects/Animations.svelte`
- [ ] Social Components → `bos-modules/SocialComponents.svelte`
- [ ] Desktop / Dock Shell → `bos-modules/DesktopDock.svelte`

---

## Step 7: Extract Each Module

For each module you selected:

1. **Read the `.svelte` file** from the foundation repo
2. **Find the subsections** you need (each wrapped in `<div class="ds-card">`)
3. **Copy the HTML** (skip the `ds-card` wrapper — that's library chrome)
4. **Copy the CSS** from the `<style>` block (everything with that section's prefix)
5. **Adapt to your framework:**

| From (Svelte) | To React | To Vue | To Plain HTML |
|---|---|---|---|
| `class="x"` | `className="x"` | `class="x"` | `class="x"` |
| `onclick={fn}` | `onClick={fn}` | `@click="fn"` | `onclick="fn()"` |
| `let x = $state(0)` | `const [x, setX] = useState(0)` | `const x = ref(0)` | `let x = 0` |
| `{#if cond}` | `{cond && ...}` | `v-if="cond"` | JS conditional |
| `{#each arr}` | `{arr.map(...)}` | `v-for="item in arr"` | JS loop |

6. **Replace demo data** with your real data bindings

---

## Step 8: Apply Glass Effects (If Using Dark Theme)

If your app uses the dark monochrome aesthetic, add these glass tokens to your global CSS:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  --glass-blur: 20px;
}
```

Glass surfaces use `backdrop-filter: blur(var(--glass-blur))` — this is the signature MIOSA look.

---

## Step 9: Verify Your Setup

Checklist before you ship:

- [ ] Design tokens set in global CSS (9 custom properties + dark mode variants)
- [ ] Button system CSS copied (all 4 shapes + variants)
- [ ] Foundation tier CSS extracted (colors, typography, spacing, shadows)
- [ ] Primitives tier CSS extracted (inputs, badges, avatars)
- [ ] Selected module CSS extracted with prefixes intact
- [ ] Glass tokens added (if using dark theme)
- [ ] All buttons use foundation classes (`btn-pill-*`, `btn-rounded-*`, `btn-compact-*`, `btn-glass-*`) — no custom button CSS
- [ ] All colors reference design tokens (`var(--dt)`, `var(--dbg)`, etc.) — no hardcoded hex values except accent colors
- [ ] Dark mode works by toggling `.dark` class on root element

---

## Apply Order (Summary)

Always extract in this order — later tiers depend on earlier ones:

```
1. Design Tokens     ← MUST do first. Everything references these.
2. Button System     ← MUST do second. Every module uses these.
3. Foundation        ← Colors, Typography, Spacing, Shadows.
4. Primitives        ← Inputs, Badges, Avatars, Form Controls.
5. Patterns          ← Auth, Settings, Glass, Layouts (as needed).
6. Modules           ← Dashboard, Tasks, CRM, Calendar (pick by feature).
7. AI                ← Chat, Reasoning, Agent Cards (if app has AI).
8. Platform          ← API Store, Usage, Billing (if SaaS).
```

---

## CSS Prefix Reference

Every module uses a unique prefix. Keep prefixes when extracting — they guarantee zero CSS collisions when combining multiple modules:

| Prefix | Module | Prefix | Module |
|--------|--------|--------|--------|
| `dk-` | Desktop & Dock | `ch-` | Communication Hub |
| `dw-` | Dashboard Widgets | `wm-` | Workspace Manager |
| `tb-` | Task Board | `ab2-` | Agent Builder |
| `td-` | Team Directory | `ng-` | Node Graph Editor |
| `kb-` | Knowledge Base | `dl-` | Daily Log |
| `dt2-` | Data Tables | `vn-` | Voice Notes |
| `cr-` | Client CRM | `pa-` | Profile & Account |
| `cs-` | Calendar & Schedule | `am-` | App Marketplace |
| `nc-` | Notification Center | `ow-` | Onboarding Wizard |

Check `registry.json` for the full list of prefixes across all 120+ sections.

---

## Quick Start Example: SaaS Dashboard App

If you're building a SaaS dashboard with AI features, here's exactly what to extract:

```
1. Design tokens (Step 2)
2. Button system (Step 3)
3. Foundation: Colors, Typography, Spacing, Shadows (Step 4)
4. Primitives: Buttons, Inputs, FormControls, Selects, Badges, Avatars (Step 5)
5. Patterns: AuthPatterns, SettingsPatterns, GlassSurfaces (Step 6)
6. Modules: DashboardWidgets, TaskBoard, NotificationCenter, ProfileAccount (Step 6)
7. AI: AiChat, MessageDisplay, ChatInputPatterns, ModelSelector (Step 6)
8. Platform: UsageDashboard, BalanceCredits (Step 6)
```

Total CSS footprint: ~15-20KB (minified). Zero runtime. Works in any framework.

---

## Quick Start Example: Internal Tool

For an internal business tool with no AI:

```
1. Design tokens (Step 2)
2. Button system (Step 3)
3. Foundation: Colors, Typography, Spacing (Step 4)
4. Primitives: Buttons, Inputs, FormControls, Selects, Badges (Step 5)
5. Modules: DataTables, TaskBoard, TeamDirectory (Step 6)
6. Patterns: SettingsPatterns (Step 6)
```

Total CSS footprint: ~8-10KB. Done.

---

## Style Intelligence — Where Everything Goes

When a user says "apply the correct styling" or "set up the design system," use this decision framework. Don't guess — match the context to the rule.

---

### Button Shape Decision

| Context | Shape | Why |
|---------|-------|-----|
| Hero section, landing page, onboarding, marketing CTA | `.btn-pill` | Full radius draws the eye. This is your "look at me" button. |
| Form submit, dialog footer, settings save, CRUD actions | `.btn-rounded` | Standard workhorse. Professional, expected, doesn't fight the content. |
| Toolbar, data table row action, sidebar toggle, dense UI | `.btn-compact` | Smaller footprint. Doesn't crowd tight layouts. |
| Floating over dark/blurred surface, overlay, dock, modal on glass | `.btn-glass` | Transparent + blur matches the surface beneath it. |

**Rule of thumb:** If it's on a glass/dark surface, use glass. If it's the main CTA on the page, use pill. If it's inside a form or card, use rounded. If it's in a toolbar or table, use compact.

---

### Button Variant Decision

| Intent | Variant | Example |
|--------|---------|---------|
| Primary action (1 per view) | `primary` | "Save Changes", "Create Project", "Get Started" |
| Secondary/supporting action | `secondary` | "Export", "Duplicate", "Share" |
| Tertiary/cancel/navigation-like | `ghost` | "Cancel", "Back", "Skip", sidebar links |
| Alternative to ghost with more weight | `outline` | "Learn More", "View Details" |
| Gentle emphasis without full primary | `soft` | "Edit Profile", "Add Note" |
| Destructive action | `danger` | "Delete", "Remove", "Disconnect", "Revoke" |
| Confirmation/completion | `success` | "Approve", "Complete", "Mark Done" |
| Caution/irreversible-but-not-destructive | `warning` | "Archive", "Suspend", "Reset" |

**Rule:** Only ONE primary button per visible area. Everything else is secondary, ghost, or outline. If a card has 2 buttons, one is primary and one is ghost/outline.

---

### Glass vs Monochrome Decision

**Use Glass (`btn-glass-*`) when:**
- Button sits on a dark or blurred background
- Inside a glassmorphic card/panel (anything with `backdrop-filter: blur()`)
- Desktop dock, floating toolbar, overlay panels
- Hero sections with background images or gradients
- Modal overlays on dark backdrops
- Any surface where you can see through to content behind it

**Glass variant mapping:**

| Surface | Glass Variant | When |
|---------|--------------|------|
| Dark solid background | `btn-glass-dark` | Dock bars, dark sidebars, dark hero sections |
| Blurred/translucent panel | `btn-glass-frosted` | Glass cards, floating panels, blurred overlays |
| Subtle, barely-there | `btn-glass-subtle` | Secondary actions on glass surfaces |
| Light transparent surface | `btn-glass-light` | Light-mode glass, frosted white panels |
| Accent/CTA on glass | `btn-glass-accent` | Primary action on any glass surface |

**Glass shape mapping:**

| Context on glass surface | Class |
|--------------------------|-------|
| CTA / hero action on glass | `btn-glass btn-glass-pill btn-glass-accent` |
| Form action on glass panel | `btn-glass btn-glass-rounded btn-glass-frosted` |
| Toolbar button on glass bar | `btn-glass btn-glass-compact btn-glass-dark` |

---

**Use Monochrome Grays (`btn-*-gray-100` through `btn-*-gray-900`) when:**
- Button should NOT draw attention (background/utility actions)
- Dense UI with many buttons that would be noisy with color
- Toolbar/sidebar where buttons are more like controls than CTAs
- Pagination, sort toggles, view switchers
- "More", "Options", "Settings" type actions

**Gray scale mapping:**

| Weight | Range | Use For |
|--------|-------|---------|
| Light grays | `gray-100` to `gray-300` | Ghost-like, barely visible. Filter chips, inactive toggles. |
| Mid grays | `gray-400` to `gray-600` | Neutral utility buttons. Pagination, sort, view switches. |
| Dark grays | `gray-700` to `gray-900` | Strong but not colored. Toolbar primaries, section headers. |

---

### Surface Decision — Where to Apply Glassmorphism

**Glass surfaces (use `backdrop-filter: blur(20px)`):**
- App shell / dock / desktop bar
- Floating panels and popovers
- Modal backdrops and overlay content
- Sidebar on top of content (not solid sidebars)
- Notification toasts/cards that float over content
- Command palette overlay
- Profile/account dropdown panels

**Solid surfaces (use `var(--dbg)` / `var(--dbg2)` / `var(--dbg3)`):**
- Main content area
- Cards within the content flow
- Form containers
- Table containers
- Settings panels
- Sidebar (when it's a permanent fixture, not floating)
- Dialog content (the dialog itself — the backdrop behind it can be glass)

**Rule:** Glass is for things that FLOAT. Solid is for things that SIT. If it overlaps other content, glass. If it's part of the document flow, solid.

---

### Color Usage Decision

| What | Token | Never Do |
|------|-------|----------|
| Primary text (headings, body) | `var(--dt)` | Hardcode `#fff` or `#000` |
| Secondary text (labels, meta) | `var(--dt2)` | Hardcode `#aaa` or `#666` |
| Tertiary text (hints, placeholders) | `var(--dt3)` | Hardcode gray values |
| Disabled/muted text | `var(--dt4)` | Use `opacity` on text |
| Page background | `var(--dbg)` | Hardcode `#1a1a1a` |
| Card/section background | `var(--dbg2)` | Hardcode `#242424` |
| Elevated/nested surface | `var(--dbg3)` | Hardcode `#2e2e2e` |
| Primary border | `var(--dbd)` | Hardcode `#333` |
| Subtle/inner border | `var(--dbd2)` | Hardcode `#2a2a2a` |
| Success/positive | Hardcode `#22c55e` or similar green | Use design tokens for semantic colors |
| Error/danger | Hardcode `#ef4444` or similar red | Use design tokens for semantic colors |
| Warning | Hardcode `#f59e0b` or similar amber | Use design tokens for semantic colors |
| Info/accent | Hardcode `#3b82f6` or similar blue | Use design tokens for semantic colors |

**Rule:** Monochrome through tokens. Color only for semantic meaning (status, errors, success, warnings). The gray spectrum gives you hierarchy — you rarely need color for emphasis.

---

### Full Context Map — What Goes Where in a Typical App

```
+------------------------------------------------------------------+
|  DOCK / TOP BAR                                                   |
|  Surface: glass (blur 20px, dark)                                |
|  Buttons: btn-glass btn-glass-compact btn-glass-dark             |
|  Logo, nav items, user avatar, notifications icon                |
+------------------------------------------------------------------+
|        |                                                          |
| SIDEBAR|  MAIN CONTENT                                            |
| solid  |  Surface: var(--dbg)                                     |
| --dbg2 |                                                          |
|        |  PAGE HEADER                                             |
| Nav:   |  Title: var(--dt)                                        |
| ghost  |  Subtitle: var(--dt2)                                    |
| buttons|  CTA: btn-pill btn-pill-primary                          |
| or     |  Secondary: btn-pill btn-pill-ghost                      |
| gray   |                                                          |
| scale  |  CARDS (in content flow)                                 |
|        |  Surface: var(--dbg2), border: var(--dbd)                |
|        |  Card actions: btn-rounded btn-rounded-primary           |
|        |  Card secondary: btn-rounded btn-rounded-ghost           |
|        |  Card danger: btn-rounded btn-rounded-danger             |
|        |                                                          |
|        |  DATA TABLE                                              |
|        |  Surface: var(--dbg2)                                    |
|        |  Row actions: btn-compact btn-compact-ghost              |
|        |  Toolbar: btn-compact btn-compact-outline                |
|        |  Pagination: btn-compact btn-compact-gray-500            |
|        |                                                          |
|        |  FORM (inside card or dialog)                            |
|        |  Submit: btn-rounded btn-rounded-primary                 |
|        |  Cancel: btn-rounded btn-rounded-ghost                   |
|        |  Delete: btn-rounded btn-rounded-danger                  |
|        |                                                          |
+--------+----------------------------------------------------------+

FLOATING ELEMENTS (overlays, popovers, command palette):
  Surface: glass (blur 20px)
  Buttons: btn-glass btn-glass-rounded btn-glass-frosted
  CTA on glass: btn-glass btn-glass-pill btn-glass-accent

MODALS / DIALOGS:
  Backdrop: dark overlay (not glass)
  Dialog surface: var(--dbg2) or var(--dbg3) — SOLID
  Dialog buttons: btn-rounded btn-rounded-primary + btn-rounded-ghost
  Destructive dialog: btn-rounded btn-rounded-danger + btn-rounded-ghost

TOASTS / NOTIFICATIONS:
  Surface: glass (frosted) or solid with shadow
  Action: btn-compact btn-compact-ghost or btn-glass btn-glass-compact btn-glass-subtle
```

---

## Common Mistakes

1. **Skipping design tokens** — Nothing will look right without `--dt`, `--dbg`, `--dbd` set.
2. **Writing custom button CSS** — Always use `btn-pill-*`, `btn-rounded-*`, `btn-compact-*`, or `btn-glass-*`. The system covers every case.
3. **Hardcoding colors** — Use `var(--dt)` family for text, `var(--dbg)` for backgrounds, `var(--dbd)` for borders. Only hardcode accent/semantic colors (green for success, red for error).
4. **Removing CSS prefixes** — Keep them. They prevent collisions when you add more modules later.
5. **Copying the `ds-card` / `ds-section` wrappers** — Those are library chrome. Only copy the content inside.
6. **Importing the whole library** — Only extract what you need. This is a pattern library, not a package.
