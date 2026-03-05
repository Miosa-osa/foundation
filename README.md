# MIOSA Foundation

**Component Library & Design System for MIOSA-powered applications.**

Dark monochrome aesthetic. Glassmorphism surfaces. Pill-first interactions. Built with Svelte 5 + TypeScript.

---

## What's Inside

### Design Tokens
- **Colors** — Monochrome palette, semantic colors, gradients
- **Typography** — Inter for UI, SF Mono for code. Full type scale with weights and spacing
- **Spacing** — 4px base unit, 9-step scale
- **Shadows** — 5-level elevation system
- **Border Radius** — From 4px badges to 9999px pills

### UI Components (`$lib/ui/`)
| Component | Description |
|-----------|-------------|
| **Button** | Primary, secondary, plain, error, success variants with 3 sizes |
| **Input** | Text input with status states, icon slots, prefix/suffix |
| **Modal** | Dialog overlay with 5 sizes (sm, default, lg, xl, full) |
| **Tabs** | Tab navigation with trigger/content pattern |
| **Menu** | Dropdown with items, labels, separators, groups |
| **Tooltip** | Contextual hints with keyboard shortcut support |
| **Popover** | Rich floating content |
| **Loading** | Spinner component |
| **Skeleton** | Content placeholder |
| **Separator** | Visual divider |
| **ScrollArea** | Custom scrollbar container |

### Button Systems (`app.css`)

Three button shape families for different contexts:

| Family | Radius | Use For |
|--------|--------|---------|
| `.btn-pill` | 9999px (full) | Primary CTAs, hero actions, main navigation |
| `.btn-rounded` | 8px | Forms, cards, inline actions, settings |
| `.btn-compact` | 6px | Toolbars, tables, dense UIs |

**Pill variants:** primary, secondary, ghost, outline, soft, danger, success, warning, link, loading
**Pill sizes:** xs, sm, default, lg, xl + icon-only + block (full-width) + groups

### Chat Components (`$lib/components/chat/`)
25 Svelte components for AI conversation interfaces:
- **UserMessage** — Dark gradient bubble, hover action toolbar
- **AssistantMessage** — Light bubble with markdown, copy/regen/feedback actions
- **ThinkingPanel** — Chain-of-thought reasoning display
- **TypingIndicator** — Animated dots
- **EmptyState** — Initial conversation placeholder with quick actions
- **ChatInput** — Message composition
- And 19 more (MemoryPanel, ContextPanel, FocusCard, etc.)

### AI Elements (`$lib/components/ai-elements/`)
8 components for AI-powered interfaces:
- **CodeBlock** — Syntax-highlighted code with filename header and copy
- **Loader** — Three variants (dots, spinner, shimmer) at 3 sizes
- **PromptInput** — Auto-resize textarea with submit/stop controls
- **Suggestion** — Quick-action chip list
- **Artifact** — Rich artifact display

---

## Component Library (Docs Site)

The interactive component library lives at `/component-library` and showcases every component with live demos:

```
src/routes/component-library/
  +page.svelte          # Thin shell (sidebar + dynamic section rendering)
  +page.ts              # SSR disabled
  styles.css            # Shared layout styles
  sections/
    Overview.svelte     # Hero, metrics, architecture overview
    Colors.svelte       # Full color palette with tokens
    Typography.svelte   # Type scale, weights, spacing, code typography
    Icons.svelte        # Icon sizes, common set, avatars
    Spacing.svelte      # Spacing scale, radius, component heights
    Shadows.svelte      # Elevation levels, glassmorphism
    Buttons.svelte      # Pills + rounded + compact + matrix
    Inputs.svelte       # Sizes, icons, status, groups, textarea
    Badges.svelte       # Status badges, tags, counters
    Cards.svelte        # Standard, elevated, glass, artifact, panel
    Navigation.svelte   # Nav pills, sidebar, breadcrumbs, pagination, steps
    TabsSection.svelte  # Standard tabs, pill tabs, icon tabs
    Menus.svelte        # Dropdown menus, popovers
    Dialogs.svelte      # Modal sizes, confirm patterns
    Tooltips.svelte     # Positions, keyboard shortcuts
    Feedback.svelte     # Spinners, skeletons, separators, toasts
    Messages.svelte     # Live chat bubbles, typing indicator
    DataDisplay.svelte  # Tables, lists, key-value, stats
    AiChat.svelte       # Full conversation flow, streaming, thinking panel
    AiElements.svelte   # CodeBlock, Loader variants
    Animations.svelte   # Transition curves, micro-interactions, loading patterns
    Modules.svelte      # Module inventory across the platform
```

---

## Design Principles

**Dark Monochrome** — Black-to-dark gradients as primary. Clean whites, generous whitespace. Contrast through weight, not color.

**Glassmorphism** — Frosted glass surfaces with `backdrop-filter: blur`. Subtle borders and inner glow. Layered depth through transparency.

**Pill-First** — Full-radius pill shapes as the default interaction pattern. Square-rounded and compact variants for contextual use.

---

## Tech Stack

- **Svelte 5** — Runes (`$state`, `$derived`, `$props`, `$bindable`)
- **TypeScript** — Strict mode
- **Bits UI** — Primitives for Dialog, Tooltip, Popover, Menu, Tabs
- **CSS Custom Properties** — `--bos-v2-*` design token system
- **Scoped CSS** — BEM-style naming within components

---

## Quick Start

```bash
# Clone
git clone https://github.com/Miosa-osa/foundation.git
cd foundation

# Install (from the parent SvelteKit project)
npm install

# Run the component library
npm run dev
# Visit http://localhost:5173/component-library
```

### Using Components

```svelte
<!-- UI Primitives -->
<script>
  import { Button, Input, Modal, Tooltip } from '$lib/ui';
  import { Menu, MenuItem, MenuSeparator } from '$lib/ui/menu';
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/ui/tabs';
</script>

<!-- Chat Components -->
<script>
  import AssistantMessage from '$lib/components/chat/AssistantMessage.svelte';
  import UserMessage from '$lib/components/chat/UserMessage.svelte';
</script>

<!-- AI Elements -->
<script>
  import CodeBlock from '$lib/components/ai-elements/CodeBlock.svelte';
  import Loader from '$lib/components/ai-elements/Loader.svelte';
</script>

<!-- CSS Classes (global, no import needed) -->
<button class="btn-pill btn-pill-primary btn-pill-sm">Action</button>
<button class="btn-rounded btn-rounded-secondary">Settings</button>
<button class="btn-compact btn-compact-ghost">Edit</button>
<div class="glass-card">Glass surface</div>
```

---

## CSS Class Reference

### Pill Buttons
```
.btn-pill                    Base (required)
.btn-pill-primary            Dark monochrome gradient
.btn-pill-secondary          White/glass with border
.btn-pill-ghost              Transparent with light border
.btn-pill-outline            Dark border, fills on hover
.btn-pill-soft               Subtle gray tint
.btn-pill-danger             Red gradient
.btn-pill-success            Green gradient
.btn-pill-warning            Yellow gradient
.btn-pill-link               Underlined text only
.btn-pill-xs/sm/lg/xl        Size modifiers
.btn-pill-icon               Icon-only square pill
.btn-pill-loading            Loading spinner state
.btn-pill-block              Full width
.btn-pill-group              Segmented control wrapper
```

### Rounded Buttons
```
.btn-rounded                 Base (8px radius)
.btn-rounded-primary         Dark gradient
.btn-rounded-secondary       Light with border
.btn-rounded-ghost           Transparent
.btn-rounded-danger          Red gradient
.btn-rounded-xs/sm/lg        Size modifiers
.btn-rounded-icon            Icon-only square
```

### Compact Buttons
```
.btn-compact                 Base (6px radius, 12px font)
.btn-compact-primary         Dark solid
.btn-compact-secondary       Light with border
.btn-compact-ghost           Transparent
.btn-compact-danger          Red outline
.btn-compact-icon            Icon-only (24x24)
```

### Glass & Surfaces
```
.glass                       Frosted glass (backdrop-filter: blur)
.glass-card                  Enhanced glass card
```

---

## License

MIT
