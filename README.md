# MIOSA Foundation

**Component Library & Design System for MIOSA-powered applications.**

Dark monochrome aesthetic. Glassmorphism surfaces. Four button shape systems. Built with Svelte 5 + TypeScript.

---

## Quick Start

```bash
git clone https://github.com/Miosa-osa/foundation.git
cd foundation
npm install
npm run dev
# Open http://localhost:5173 (auto-redirects to /component-library)
```

### Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build
npm run check     # TypeScript + Svelte type checking
```

---

## What's Inside

### Design Tokens
- **Colors** — Monochrome palette, semantic colors, gradients
- **Typography** — Inter for UI, SF Mono for code. Full type scale with weights and spacing
- **Spacing** — 4px base unit, 9-step scale
- **Shadows** — 5-level elevation system
- **Border Radius** — From 4px badges to 9999px full-radius

### 27 UI Components (`$lib/ui/`)

| Component | Description |
|-----------|-------------|
| **Button** | Primary, secondary, plain, error, success variants with 3 sizes |
| **Input** | Text input with status states, icon slots, prefix/suffix |
| **Textarea** | Multi-line input with resize control, character count |
| **Toggle** | On/off switch with 3 sizes |
| **Checkbox** | Styled checkbox with indeterminate state |
| **RadioGroup / RadioItem** | Radio button group with context |
| **Select** | Dropdown select with Bits UI primitives |
| **Slider** | Range input with custom track and thumb |
| **Avatar / AvatarGroup** | User avatars with fallback initials, stacked groups |
| **Alert** | Dismissible banners with 4 severity levels |
| **Progress** | Linear progress bars |
| **Toast / Toaster** | Notification system with variants |
| **Table / TableHeader / TableRow / TableCell** | Data tables with striped, hoverable, compact options |
| **Accordion / AccordionItem** | Collapsible content sections |
| **Breadcrumb / BreadcrumbItem** | Navigation breadcrumbs |
| **Modal** | Dialog overlay with 5 sizes |
| **Tabs / TabsList / TabsTrigger / TabsContent** | Tab navigation |
| **Menu / MenuItem / MenuSeparator** | Dropdown menus |
| **Tooltip** | Contextual hints with keyboard shortcut support |
| **Popover** | Rich floating content |
| **Loading** | Spinner component |
| **Skeleton** | Content placeholder |
| **Separator** | Visual divider |
| **ScrollArea** | Custom scrollbar container |

### Button Shape Systems

Four shape families for different contexts:

| Shape | Class | Radius | Best For |
|-------|-------|--------|----------|
| **Full Radius** | `.btn-pill` | 9999px | Hero CTAs, primary actions, navigation |
| **Standard Radius** | `.btn-rounded` | 8px | Forms, settings, cards, inline actions |
| **Tight Radius** | `.btn-compact` | 6px | Toolbars, data tables, dense UIs |
| **Glassmorphic** | `.btn-glass` | Inherits | Overlays, dark backgrounds, glass surfaces |

**Full Radius variants:** primary, secondary, ghost, outline, soft, danger, success, warning, link, loading
**Full Radius sizes:** xs, sm, default, lg, xl + icon-only + block (full-width) + groups
**Glass variants:** light, dark, frosted, subtle, accent (combine with any shape)
**Gray spectrum:** `.btn-pill-gray-100` through `.btn-pill-gray-900` — 9 monochrome shades

### Chat Components (`$lib/components/chat/`)
25 Svelte components for AI conversation interfaces including UserMessage, AssistantMessage, ThinkingPanel, TypingIndicator, EmptyState, ChatInput, and more.

### AI Elements (`$lib/components/ai-elements/`)
8 components: CodeBlock, Loader, PromptInput, Suggestion, Artifact.

---

## Component Library (48 Sections)

The interactive component library lives at `/component-library` with live demos for every component:

```
src/routes/component-library/
  +page.svelte          # Shell (sidebar + dynamic section rendering)
  +page.ts              # SSR disabled
  styles.css            # Shared layout styles
  sections/             # 48 section files

Getting Started:
  Overview.svelte

Design Tokens:
  Colors.svelte         Typography.svelte       Icons.svelte
  Spacing.svelte        Shadows.svelte

Actions:
  Buttons.svelte        ToggleGroups.svelte

Inputs & Forms:
  Inputs.svelte         FormControls.svelte     Selects.svelte
  Sliders.svelte        TagInput.svelte         Labels.svelte
  Forms.svelte

Data Display:
  Badges.svelte         Avatars.svelte          Cards.svelte
  Tables.svelte         Accordions.svelte       Collapsibles.svelte
  DataDisplay.svelte    Timeline.svelte         Carousel.svelte
  Keyboard.svelte

Navigation:
  Navigation.svelte     TabsSection.svelte      Menus.svelte
  ContextMenus.svelte   Pagination.svelte       Stepper.svelte
  CommandPalette.svelte

Overlays:
  Dialogs.svelte        Drawers.svelte          Tooltips.svelte
  HoverCards.svelte     Alerts.svelte           Toasts.svelte

Feedback:
  ProgressBars.svelte   Feedback.svelte         Messages.svelte

AI & Chat:
  AiChat.svelte         AiElements.svelte

Patterns:
  Layouts.svelte        Animations.svelte       EmptyStates.svelte
  ErrorStates.svelte    Modules.svelte
```

---

## Design Principles

**Dark Monochrome** — Black-to-dark gradients as primary. Clean whites, generous whitespace. Contrast through weight, not color.

**Glassmorphism** — Frosted glass surfaces with `backdrop-filter: blur`. Subtle borders and inner glow. Layered depth through transparency.

**Shape System** — Four radius families (full, standard, tight, glass) instead of one-size-fits-all. Shape communicates hierarchy and context.

**Simple to Complex** — Every section progresses from basic usage to advanced patterns and real-world compositions.

---

## Tech Stack

- **Svelte 5** — Runes (`$state`, `$derived`, `$props`, `$bindable`)
- **TypeScript** — Strict mode
- **Bits UI** — Primitives for Dialog, Tooltip, Popover, Menu, Tabs, Select
- **CSS Custom Properties** — `--bos-v2-*` design token system
- **Scoped CSS** — BEM-style naming within components

---

## Using Components

```svelte
<!-- UI Primitives -->
<script>
  import { Button, Input, Modal, Tooltip, Toggle, Checkbox, Select, Slider } from '$lib/ui';
  import { Menu, MenuItem, MenuSeparator } from '$lib/ui/menu';
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/ui/tabs';
  import { RadioGroup, RadioItem } from '$lib/ui/radio';
  import { Table, TableHeader, TableRow, TableCell } from '$lib/ui/table';
  import { Accordion, AccordionItem } from '$lib/ui/accordion';
  import { Avatar, AvatarGroup, Alert, Progress, Toast, Toaster } from '$lib/ui';
</script>

<!-- CSS Classes (global, no import needed) -->

<!-- Full Radius (Pill) -->
<button class="btn-pill btn-pill-primary btn-pill-sm">Action</button>

<!-- Standard Radius (Rounded) -->
<button class="btn-rounded btn-rounded-secondary">Settings</button>

<!-- Tight Radius (Compact) -->
<button class="btn-compact btn-compact-ghost">Edit</button>

<!-- Glassmorphic -->
<button class="btn-glass btn-glass-pill btn-glass-frosted">Glass Action</button>

<!-- Gray Spectrum -->
<button class="btn-pill btn-pill-gray-700">Subtle</button>

<!-- Glass Surfaces -->
<div class="glass-card">Glass surface</div>
```

---

## CSS Class Reference

### Full Radius (Pill) Buttons
```
.btn-pill                    Base (required)
.btn-pill-primary            Dark monochrome gradient
.btn-pill-secondary          White/glass with border
.btn-pill-ghost              Transparent with light border
.btn-pill-outline            Dark border, fills on hover
.btn-pill-soft               Subtle gray tint
.btn-pill-danger/success/warning  Semantic colors
.btn-pill-xs/sm/lg/xl        Size modifiers
.btn-pill-icon               Icon-only square
.btn-pill-loading            Loading spinner state
.btn-pill-block              Full width
.btn-pill-group              Segmented control wrapper
.btn-pill-gray-100 to 900    Monochrome spectrum
```

### Standard Radius (Rounded) Buttons
```
.btn-rounded                 Base (8px radius)
.btn-rounded-primary/secondary/ghost/danger  Variants
.btn-rounded-xs/sm/lg        Size modifiers
.btn-rounded-icon            Icon-only square
```

### Tight Radius (Compact) Buttons
```
.btn-compact                 Base (6px radius, 12px font)
.btn-compact-primary/secondary/ghost/danger  Variants
.btn-compact-icon            Icon-only (24x24)
```

### Glassmorphic Buttons
```
.btn-glass                   Base (required, adds backdrop-filter)
.btn-glass-pill              Full radius shape
.btn-glass-rounded           Standard radius shape
.btn-glass-compact           Tight radius shape
.btn-glass-light/dark/frosted/subtle/accent  Surface variants
.btn-glass-xs/sm/lg/xl       Size modifiers
.btn-glass-icon              Icon-only
```

### Glass & Surfaces
```
.glass                       Frosted glass (backdrop-filter: blur)
.glass-card                  Enhanced glass card
```

---

## License

MIT
