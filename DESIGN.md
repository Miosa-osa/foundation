# MIOSA Foundation Design Direction

Status: working target for component-library cleanup

MIOSA Foundation should feel like a technical design-system workbench: white canvas, graphite text, compact controls, and 1px borders doing most of the layout work. It should be close enough to shadcn/ui that builders understand it immediately, but it should still read as MIOSA: operational, AI-native, precise, and quiet.

The current library has too many visual languages at once: blue BusinessOS tokens, glass cards, gradients, pill-first buttons, app-specific chat/memory/RAG components, and duplicated button/control variants. This file is the taste target for the cleanup.

## Core Rule

One system, not many themes.

Use the monochrome system as the default. Color is reserved for product state only, not brand decoration. No gradients, no purple/blue brand accents, no decorative glass unless a component is explicitly an overlay or OS-shell preview.

## Visual Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--miosa-ink` | `#0a0a0a` | Primary text, icons, filled primary button |
| `--miosa-black` | `#000000` | Maximum contrast ink, rare |
| `--miosa-carbon` | `#171717` | Inverted card or terminal surface |
| `--miosa-muted` | `#737373` | Secondary text, placeholders, quiet icons |
| `--miosa-ash` | `#a1a1a1` | Disabled text and subtle marks |
| `--miosa-smoke` | `#b9b9b9` | Soft border or disabled border |
| `--miosa-border` | `#e5e5e5` | Default 1px structural border |
| `--miosa-mist` | `#f2f2f2` | Ghost hover, badges, subtle fill |
| `--miosa-canvas` | `#ffffff` | Page and card surface |

## Typography

Use Geist when available, with Inter/system as fallback.

| Role | Size | Weight | Line height | Notes |
| --- | ---: | ---: | ---: | --- |
| Display | 48px | 600 | 1.1 | Tight, architectural, only for true page headers |
| Subheading | 18px | 400-500 | 1.5 | Section intros |
| Body | 14px | 400 | 1.43 | Default documentation and component text |
| UI | 13px | 500 | 1.5 | Nav, labels, dense controls |
| Caption | 12px | 500 | 1.5 | Metadata and hints |

Display tracking may be negative. UI text should not use positive letter spacing.

## Shape And Spacing

| Element | Radius |
| --- | ---: |
| Controls, nav items | 10px |
| Cards | 14px |
| Badges/chips | 26px |
| True pills | 9999px |
| Tiny inner affordances | 4px |

Default gaps are 8px inside controls and 16px inside cards. Section gaps should be about 48px. Keep the system compact; avoid oversized marketing whitespace inside the component browser.

## Component Rules

- Primary button: one filled `#0a0a0a` button per visual region.
- Secondary button: ghost or bordered, never a second filled button beside primary.
- Inputs/selects/textareas: white surface, 1px `#e5e5e5` border, 10px radius.
- Cards: white surface, 1px `#e5e5e5` border, 14px radius, no shadow by default.
- Tags: `#f2f2f2` fill or white with `#e5e5e5` border, 26px radius.
- Tabs: compact text controls, minimal active state, no heavy container unless needed.
- Icons: line icons at 16px, graphite or muted gray.

## Cleanup Decisions

Keep:

- One primitive button API.
- One input API.
- One checkbox/switch/radio family.
- One select/dropdown family.
- One card/surface family.
- One table/data-display family.
- One dialog/popover/tooltip family.
- One AI chat presentation set, separated from app API calls.

Cut or quarantine:

- Duplicate button families that only differ by vibe.
- Product-specific modules inside the core library unless they are examples.
- Components that import production app APIs/stores directly.
- Gradients and glass as defaults.
- Chromatic semantic styling as the main brand language.

## File Pointers

- Token bridge: `src/lib/styles/theme/miosa-foundation.css`
- Current component browser: `src/routes/component-library/+page.svelte`
- Current sections: `src/routes/component-library/sections/`
- Exported primitives: `src/lib/ui/index.ts`

## Review Workflow

Run:

```bash
npm run dev -- --host 127.0.0.1 --port 5174
```

Open:

```text
http://127.0.0.1:5174/component-library
```

During review, mark each section as keep, merge, example-only, or delete. Do not delete first; make a visible inventory and then prune in small commits.
