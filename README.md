# MIOSA Foundation

**The component library for building your Optimal System.**

120+ production-ready components. Pure CSS. Zero cognitive load. Built in Svelte for speed and simplicity — designed to get out of your way so you can ship.

---

## What is this?

MIOSA Foundation is the design system behind every product in the MIOSA ecosystem — BusinessOS, ContentOS, DevOS, OSA Terminal, and whatever you build next.

It is a collection of every UI pattern you need, designed once, correctly, so you never have to think about it again. Every component follows the same styling language: dark monochrome gradients, glassmorphic surfaces with real `backdrop-filter: blur(20px)`, pill-shaped interactions, and a gray spectrum that gives you hierarchy without reaching for color.

The goal is to reduce cognitive load — for you as the developer and for the people using what you build.

Everything here is pure CSS with HTML structure. No proprietary runtime. No vendor lock-in. Copy the classes, paste them into your app, set the design tokens, and it works.

---

## Why Svelte, not React?

This is a design system, not an application framework. The job is to define CSS patterns and HTML structures that any team can extract and use.

**No runtime overhead.** Svelte compiles to vanilla JS. There is no virtual DOM, no reconciler, no 40KB runtime sitting between your CSS and the browser. The components in this library are thin wrappers around CSS — that is what a design system should be.

**CSS stays CSS.** React pushes you toward CSS-in-JS, styled-components, or Tailwind-only approaches because scoping is hard without a compiler. Svelte gives you real scoped `<style>` blocks that compile to plain CSS. Every pattern in this library is extractable as raw CSS — no JSX translation needed.

**Simpler state for demos.** Interactive demos need local state. In Svelte that is `let count = $state(0)`. In React that is `const [count, setCount] = useState(0)` plus hook rules, dependency arrays, and re-render gotchas. For a library of 120+ interactive demos, the simpler model matters.

**Framework-agnostic output.** The output of this library is CSS classes and HTML structure — not React components. You can use these patterns in React, Vue, Angular, plain HTML, or anything else. Building the demos in React would tempt people to import React components directly. Building in Svelte makes it clear: copy the CSS, adapt the markup, use it anywhere.

**Build speed.** The full library builds in under 2 seconds. SvelteKit's Vite integration means HMR is instant. When you are iterating on 120+ component demos, build speed is not a nice-to-have — it is the difference between flow state and frustration.

---

## Quick Start

```bash
git clone https://github.com/Miosa-osa/foundation.git
cd foundation
npm install
npm run dev
```

Open `http://localhost:5174` — the dev server redirects automatically to `/component-library`.

```bash
npm run dev       # Development server with HMR
npm run build     # Production build
npm run preview   # Preview production build
npm run check     # TypeScript + Svelte type checking
```

---

## Button System

Four shape families, each for a different context. Every BOS module uses these — no custom button CSS.

| Shape | Class | Radius | Best For |
|-------|-------|--------|----------|
| **Full Radius** | `.btn-pill` | 9999px | Primary CTAs, hero actions, onboarding |
| **Standard** | `.btn-rounded` | 8px | Forms, settings, cards, dialog footers |
| **Compact** | `.btn-compact` | 6px | Toolbars, data tables, dense UIs |
| **Glass** | `.btn-glass` | Inherits | Overlays, dark backgrounds, glass surfaces |

Each shape has the same variant scale:

- **Solid**: `primary`, `secondary`, `ghost`, `outline`, `soft`
- **Semantic**: `danger`, `success`, `warning`
- **Glass**: `light`, `dark`, `frosted`, `subtle`, `accent`
- **Monochrome**: `gray-100` through `gray-900`
- **Sizes**: `xs`, `sm`, (default), `lg`, `xl`
- **Modifiers**: `icon`, `loading`, `block`

```html
<!-- Hero CTA -->
<button class="btn-pill btn-pill-primary btn-pill-lg">Get Started</button>

<!-- Form save -->
<button class="btn-rounded btn-rounded-primary">Save Changes</button>

<!-- Toolbar action -->
<button class="btn-compact btn-compact-ghost btn-compact-icon">...</button>

<!-- Glass on dark surface -->
<button class="btn-glass btn-glass-pill btn-glass-accent">New Project</button>
```

---

## Design Tokens

Set 9 CSS custom properties and the entire library adapts:

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

---

## Component Groups

### Foundation (5)
Colors, Typography, Icons, Spacing, Shadows

### Actions (4)
Buttons, Toggle Groups, Chips & Filters, Selection Cards

### Inputs & Forms (10)
Text Inputs, Toggle/Check/Radio, Select, Combobox, Sliders, Tag Input, Date Picker, File Upload, Labels, Forms

### Data Display (14)
Badges, Avatars, Cards, Profile Cards, App Cards, Tables, Lists & Stats, Accordions, Collapsibles, Dividers, Timeline, Carousel, Media, File Browser

### Navigation (9)
Nav, Tabs, Menus, Context Menus, Pagination, Stepper, Command Palette, Search, Keyboard

### Overlays (6)
Dialogs, Drawers, Tooltips, Hover Cards, Alerts, Toasts

### Feedback & States (6)
Progress, Loading, Spinners, Messages, Empty States, Error States

### BOS Modules (25+)
Desktop Dock, Dashboard, Tasks, Team, Knowledge Base, Data Tables, CRM, Calendar, Notifications, Onboarding, Communication Hub, Workspace Manager, Agent Builder, Node Graph, Daily Log, Voice Notes, Profile & Account, App Marketplace, OSA Agent, System Settings, Integration Hub, Terminal, Project Manager, Help Center, and more.

### ContentOS Modules (5)
Content Management, AI Generation, Character Studio, Batch & Orders, Prompts & Pricing

### DevOS Modules (6)
AI Dev Workflows, Code Review, Repository Manager, CI/CD Pipeline, Code Quality, Agent Scheduler

### Surfaces & Effects (5)
Glass Surfaces, Animations, Floating Elements, Animated Borders

### Patterns (6)
Settings, Auth, Onboarding Flows, Social, Integration Cards, Balance & Credits

### AI (12)
Conversation, Message, Prompt Input, Model Selector, Reasoning, Suggestions, Attachments, Sources, Tool Calls, Agent Cards, Generation Forms

### Platform (7)
API Store, Usage Dashboard, Task/Project Cards, Share & Referral, App Publish, Meeting & People, Compute

---

## How to Extract Patterns

Each section file follows this structure:

```svelte
<section class="ds-section">
  <div class="ds-card">
    <h3 class="ds-card__title">Pattern Name</h3>
    <!-- Demo HTML with prefixed CSS classes -->
  </div>
</section>

<style>
  .prefix-component { ... }
  .prefix-component__element { ... }
  .prefix-component--modifier { ... }
</style>
```

**To use a pattern:**

1. Find the section in the sidebar
2. Copy the HTML structure (skip the `ds-card` wrapper — that is library chrome)
3. Copy the corresponding CSS from the `<style>` block
4. Paste into your app, set the design tokens, adapt the markup to your framework

**Apply order when building a new app:**

| Order | Tier | What |
|-------|------|------|
| 1 | Foundation | Colors, Typography, Spacing, Shadows — always required |
| 2 | Primitives | Buttons, Inputs, Badges, Avatars — always required |
| 3 | Patterns | Layouts, Glass, Auth, Settings — as needed |
| 4 | Modules | Dashboard, Tasks, CRM, Calendar — pick by feature |
| 5 | AI | Chat, Reasoning, Agent Cards — if the platform has AI |
| 6 | Platform | API Store, Usage, Billing — if SaaS |

---

## CSS Prefix System

Every section uses a unique 2-3 character CSS prefix. Combine any number of sections in a single app with zero collisions.

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

---

## Tech Stack

| Technology | Role |
|------------|------|
| Svelte 5 | Component framework with runes (`$state`, `$derived`, `$effect`) |
| SvelteKit | Application shell, routing, SSR |
| TypeScript | Strict type checking |
| CSS Custom Properties | Token system, theming, dark mode |
| Bits UI | Accessible primitives (Dialog, Tooltip, Menu, Tabs, Select) |
| Vite | Instant HMR, sub-2s production builds |
| Tailwind CSS | Utility classes for library chrome |

---

## Project Structure

```
miosa-foundation/
├── src/
│   ├── routes/component-library/
│   │   ├── +page.svelte          # Shell: sidebar + section rendering
│   │   ├── registry.json         # Machine-readable component index
│   │   ├── AGENT-GUIDE.md        # Protocol for adding new sections
│   │   └── sections/             # 120+ section files in 15 subdirectories
│   │
│   └── lib/
│       ├── ui/                   # 27 Svelte 5 UI primitives
│       ├── components/chat/      # Chat interface components
│       ├── components/ai-elements/ # AI display components
│       └── styles/app.css        # Global styles, buttons, glass, tokens
│
├── app.css                       # Design token root + resets
├── svelte.config.js
├── vite.config.ts
└── package.json
```

---

## License

MIT
