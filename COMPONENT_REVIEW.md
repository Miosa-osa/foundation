# Component Review Sheet

Use this while reviewing `http://127.0.0.1:5174/component-library`.

Legend:

- Keep: belongs in core MIOSA Foundation.
- Merge: useful, but duplicated by another section/component.
- Example-only: can stay as a demo pattern, but should not be exported as a primitive.
- Quarantine: product-specific code that should not depend on app APIs inside the library.

## Initial Read

| Area | Initial status | Reason |
| --- | --- | --- |
| Foundation: colors, type, spacing, shadows | Keep | Needed, but update to `DESIGN.md` tokens. |
| Actions: buttons, toggles, chips, selection cards | Merge | Too many button/control styles. Collapse to one control language. |
| Inputs/forms | Keep | Core library surface. Needs label/accessibility cleanup. |
| Data display | Keep | Core library surface. Normalize card/table radius and borders. |
| Navigation | Keep | Core surface. Remove invalid `href="#"` patterns in demos. |
| Overlays | Keep | Core surface. Make light monochrome default. |
| Feedback/states | Keep | Core surface. Remove chromatic styling except explicit states. |
| AI sections | Example-only | Useful for MIOSA, but should be demos built on primitives. |
| BOS modules | Example-only | Product patterns, not primitives. Keep only best examples. |
| DevOS modules | Example-only | Product patterns, not primitives. |
| Platform modules | Example-only | Product patterns, not primitives. |
| `src/lib/components/chat/*` | Quarantine | Imports memory/RAG/workspace APIs and stores. |
| `src/lib/ui/osa/*` | Merge | Older glass/pill language conflicts with the monochrome target. |

## Keep Candidates

- `src/lib/ui/button/Button.svelte`
- `src/lib/ui/input/Input.svelte`
- `src/lib/ui/checkbox/Checkbox.svelte`
- `src/lib/ui/radio/*`
- `src/lib/ui/select/Select.svelte`
- `src/lib/ui/tabs/*`
- `src/lib/ui/menu/*`
- `src/lib/ui/modal/Modal.svelte`
- `src/lib/ui/tooltip/Tooltip.svelte`
- `src/lib/ui/popover/Popover.svelte`
- `src/lib/ui/table/*`
- `src/lib/ui/accordion/*`
- `src/lib/ui/toast/*`

## Likely Duplicate Or Conflicting Surfaces

- Multiple button classes: `btn-pill`, `btn-rounded`, `btn-compact`, `btn-glass`.
- OSA glass components versus the new monochrome foundation.
- BOS module-specific cards versus primitive `Card` patterns.
- Chat components that mix presentation with platform API calls.

## Decisions To Make In UI Review

| Section | Keep | Merge | Example-only | Delete | Notes |
| --- | --- | --- | --- | --- | --- |
| Buttons |  |  |  |  |  |
| Toggle Groups |  |  |  |  |  |
| Text Inputs |  |  |  |  |  |
| Select & Dropdown |  |  |  |  |  |
| Cards & Panels |  |  |  |  |  |
| App Cards |  |  |  |  |  |
| Tables |  |  |  |  |  |
| Navigation |  |  |  |  |  |
| Dialogs & Modals |  |  |  |  |  |
| Tooltips & Popovers |  |  |  |  |  |
| Toast Notifications |  |  |  |  |  |
| AI Chat |  |  |  |  |  |
| Desktop & Dock |  |  |  |  |  |
| BusinessOS modules |  |  |  |  |  |
| DevOS modules |  |  |  |  |  |
| Platform modules |  |  |  |  |  |
