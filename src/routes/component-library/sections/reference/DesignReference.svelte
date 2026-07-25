<script lang="ts">
	type TopTab = 'design' | 'tailwind' | 'css' | 'tokens';
	type DetailMode = 'compact' | 'extended';

	let activeTab = $state<TopTab>('design');
	let detailMode = $state<DetailMode>('extended');
	let copied = $state(false);

	const designTokens = {
		color: {
			ink: {
				$value: '#0a0a0a',
				$type: 'color',
				$description: 'Primary text, icon strokes, and the single filled primary action.'
			},
			black: {
				$value: '#000000',
				$type: 'color',
				$description: 'Maximum contrast ink. Use rarely when #0a0a0a is not strong enough.'
			},
			carbon: {
				$value: '#171717',
				$type: 'color',
				$description: 'Inverted cards, terminal previews, and dark surface examples.'
			},
			muted: {
				$value: '#737373',
				$type: 'color',
				$description: 'Secondary copy, placeholders, muted labels, and quiet icons.'
			},
			ash: {
				$value: '#a1a1a1',
				$type: 'color',
				$description: 'Disabled text, low emphasis marks, and extremely subtle UI details.'
			},
			smoke: {
				$value: '#b9b9b9',
				$type: 'color',
				$description: 'Soft border states and disabled borders.'
			},
			hairline: {
				$value: '#e5e5e5',
				$type: 'color',
				$description: 'Default 1px structural border for cards, inputs, tables, and dividers.'
			},
			mist: {
				$value: '#f2f2f2',
				$type: 'color',
				$description: 'Ghost hovers, badges, chips, and subtle surface fill.'
			},
			canvas: {
				$value: '#ffffff',
				$type: 'color',
				$description: 'Page background, card background, input background, and light surface.'
			}
		},
		font: {
			sans: {
				$value: 'Geist',
				$type: 'fontFamily',
				$fallback: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				$description: 'Default typeface for headings, body, controls, nav, cards, and labels.'
			},
			mono: {
				$value: 'Geist Mono',
				$type: 'fontFamily',
				$fallback: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
				$description: 'Code snippets, token output, technical values, and fixed-width metadata.'
			}
		},
		typography: {
			caption: { $value: { fontSize: '12px', fontWeight: 500, lineHeight: 1.5 }, $type: 'typography' },
			ui: { $value: { fontSize: '13px', fontWeight: 500, lineHeight: 1.5 }, $type: 'typography' },
			body: { $value: { fontSize: '14px', fontWeight: 400, lineHeight: 1.43 }, $type: 'typography' },
			base: { $value: { fontSize: '16px', fontWeight: 400, lineHeight: 1.5 }, $type: 'typography' },
			subheading: { $value: { fontSize: '18px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '-0.45px' }, $type: 'typography' },
			display: { $value: { fontSize: '48px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-2.4px' }, $type: 'typography' }
		},
		spacing: {
			'4': { $value: '4px', $type: 'dimension' },
			'8': { $value: '8px', $type: 'dimension' },
			'12': { $value: '12px', $type: 'dimension' },
			'16': { $value: '16px', $type: 'dimension' },
			'20': { $value: '20px', $type: 'dimension' },
			'24': { $value: '24px', $type: 'dimension' },
			'32': { $value: '32px', $type: 'dimension' },
			'48': { $value: '48px', $type: 'dimension' }
		},
		radius: {
			sm: { $value: '4px', $type: 'dimension', $description: 'Tiny inner affordances.' },
			control: { $value: '10px', $type: 'dimension', $description: 'Buttons, inputs, nav items.' },
			card: { $value: '14px', $type: 'dimension', $description: 'Cards and preview containers.' },
			badge: { $value: '26px', $type: 'dimension', $description: 'Tags, chips, and badges.' },
			pill: { $value: '9999px', $type: 'dimension', $description: 'True pill controls only.' }
		},
		surface: {
			canvas: { $value: '#ffffff', $type: 'color' },
			card: { $value: '#ffffff', $type: 'color' },
			muted: { $value: '#f2f2f2', $type: 'color' },
			inverted: { $value: '#171717', $type: 'color' }
		}
	};

	const compactMarkdown = `# MIOSA Foundation

Theme: light-first, monochrome, compact, border-first.

MIOSA Foundation uses a white canvas, graphite text, 1px #e5e5e5 borders, compact controls, and one filled black primary action per visual region. It should feel like a precise technical workbench, not a marketing page.

## Tokens

- Text: #0a0a0a primary, #737373 secondary, #a1a1a1 disabled.
- Background: #ffffff canvas/card, #f2f2f2 muted, #171717 inverted.
- Border: #e5e5e5 default hairline.
- Radius: 10px controls, 14px cards, 26px badges, 9999px true pills.
- Type: Geist, 14px body, 13px UI, 48px display.

## Rules

- No chromatic brand color by default.
- No gradients as foundation styling.
- No shadows for normal elevation.
- Merge duplicate button families into one primitive API.
- Product modules are examples, not primitives.`;

	const extendedMarkdown = `# MIOSA Foundation Design Reference

> A monochrome technical workbench for building MIOSA interfaces: white canvas, graphite text, compact controls, and hairline borders doing the structural work.

## Theme

Light-first. Dark mode is supported, but the foundation identity is the white drafting table: every surface is readable, every boundary is a 1px line, and the only strong fill is a deliberate black primary action.

## Visual Language

MIOSA Foundation should be close enough to shadcn/ui that builders understand it immediately, but specific enough for MIOSA: operational, AI-native, precise, and quiet. The current library has several conflicting visual languages. The cleanup target is a single default language:

- White canvas and white cards.
- 1px #e5e5e5 borders for structure.
- #0a0a0a primary text and primary fill.
- #737373 secondary text.
- Geist or Inter typography.
- Compact spacing and 10px controls.
- No decorative gradients.
- No default glassmorphism.
- Color only for explicit semantic state or product examples.

## Color Tokens

| Name | Value | Role |
| --- | --- | --- |
| Ink | #0a0a0a | Primary text, icons, filled primary button |
| Black | #000000 | Maximum contrast ink, rare |
| Carbon | #171717 | Inverted card, terminal, dark preview |
| Muted | #737373 | Secondary text, placeholders, quiet icons |
| Ash | #a1a1a1 | Disabled text and subtle marks |
| Smoke | #b9b9b9 | Soft borders and disabled borders |
| Hairline | #e5e5e5 | Default 1px structural border |
| Mist | #f2f2f2 | Ghost hover, badges, subtle fills |
| Canvas | #ffffff | Page, cards, inputs |

## Typography

Use Geist when available. Inter/system is the fallback.

| Role | Size | Weight | Line height | Notes |
| --- | ---: | ---: | ---: | --- |
| Caption | 12px | 500 | 1.5 | Metadata and hints |
| UI | 13px | 500 | 1.5 | Nav, labels, dense controls |
| Body | 14px | 400 | 1.43 | Default component and docs text |
| Base | 16px | 400 | 1.5 | Longer body copy |
| Subheading | 18px | 400-500 | 1.5 | Section intros |
| Display | 48px | 600 | 1.1 | True page headers only |

Display may use -2.4px tracking. UI text should not use positive tracking.

## Shape And Spacing

Controls use 10px radius. Cards use 14px. Badges use 26px. True pills use 9999px only when the shape is intentionally pill-like. Default internal card padding is 16px. Default element gap is 8px. Section gap is about 48px.

## Components

### Primary Button

Black #0a0a0a fill, white text, 10px radius, 13-14px Geist medium. Only one filled primary action per visual region.

### Secondary Button

Ghost or bordered. White background or transparent background, #0a0a0a text, #e5e5e5 border when framed. Never place two filled buttons side by side.

### Input

White background, 1px #e5e5e5 border, 10px radius, 10px vertical and 12px horizontal padding. Placeholder in #737373.

### Card

White background, 1px #e5e5e5 border, 14px radius, 16px padding. No shadow by default.

### Tag Or Chip

#f2f2f2 fill or white with #e5e5e5 border, 26px radius, 12-13px medium text.

### Table

White surface, #e5e5e5 row separators, 13-14px text, compact cell padding.

### Dialog And Popover

White surface, 1px #e5e5e5 border, 14px radius, minimal shadow only when needed for stacking.

## Cleanup Problems In Current Library

- The overview still advertises 4 button systems, but the target is one primitive button API.
- The overview still advertises glassmorphism and pill-first styling, which conflicts with the monochrome border-first target.
- BOS, DevOS, ContentOS, platform, and AI modules are mixed into the same library surface as primitives.
- Chat components import or simulate app APIs; they should be example-only or moved behind adapters.
- Many demos have accessibility warnings: labels not associated with controls, icon buttons without labels, invalid href="#" links.
- There are too many component styles that differ only by vibe, not by actual product need.

## Decisions

Keep primitives. Merge duplicate controls. Quarantine app-specific modules. Preserve a small number of excellent examples. Remove visual languages that do not match this document.`;

	const tailwindCompact = `@theme {
  --color-miosa-ink: #0a0a0a;
  --color-miosa-muted: #737373;
  --color-miosa-border: #e5e5e5;
  --color-miosa-mist: #f2f2f2;
  --color-miosa-canvas: #ffffff;
  --font-miosa-sans: 'Geist', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-miosa-mono: 'Geist Mono', ui-monospace, monospace;
  --radius-miosa-control: 10px;
  --radius-miosa-card: 14px;
  --radius-miosa-badge: 26px;
}`;

	const tailwindExtended = `@theme {
  /* Colors */
  --color-miosa-ink: #0a0a0a;
  --color-miosa-black: #000000;
  --color-miosa-carbon: #171717;
  --color-miosa-muted: #737373;
  --color-miosa-ash: #a1a1a1;
  --color-miosa-smoke: #b9b9b9;
  --color-miosa-border: #e5e5e5;
  --color-miosa-mist: #f2f2f2;
  --color-miosa-canvas: #ffffff;

  /* Typography */
  --font-miosa-sans: 'Geist', 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-miosa-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --text-miosa-caption: 12px;
  --text-miosa-ui: 13px;
  --text-miosa-body: 14px;
  --text-miosa-base: 16px;
  --text-miosa-subheading: 18px;
  --text-miosa-display: 48px;

  /* Spacing */
  --spacing-miosa-1: 4px;
  --spacing-miosa-2: 8px;
  --spacing-miosa-3: 12px;
  --spacing-miosa-4: 16px;
  --spacing-miosa-5: 20px;
  --spacing-miosa-6: 24px;
  --spacing-miosa-section: 48px;

  /* Radius */
  --radius-miosa-sm: 4px;
  --radius-miosa-control: 10px;
  --radius-miosa-card: 14px;
  --radius-miosa-badge: 26px;
  --radius-miosa-pill: 9999px;

  /* Ring */
  --shadow-miosa-ring: oklab(0.145 0 0 / 0.1) 0 0 0 1px;
}`;

	const cssCompact = `:root {
  --miosa-ink: #0a0a0a;
  --miosa-muted: #737373;
  --miosa-border: #e5e5e5;
  --miosa-mist: #f2f2f2;
  --miosa-canvas: #ffffff;
  --miosa-font-sans: 'Geist', 'Inter', system-ui, sans-serif;
  --miosa-radius-control: 10px;
  --miosa-radius-card: 14px;
}`;

	const cssExtended = `:root {
  /* Colors */
  --miosa-ink: #0a0a0a;
  --miosa-black: #000000;
  --miosa-carbon: #171717;
  --miosa-muted: #737373;
  --miosa-ash: #a1a1a1;
  --miosa-smoke: #b9b9b9;
  --miosa-border: #e5e5e5;
  --miosa-mist: #f2f2f2;
  --miosa-canvas: #ffffff;

  /* Typography */
  --miosa-font-sans: 'Geist', 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --miosa-font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --miosa-text-caption: 12px;
  --miosa-text-ui: 13px;
  --miosa-text-body: 14px;
  --miosa-text-base: 16px;
  --miosa-text-subheading: 18px;
  --miosa-text-display: 48px;
  --miosa-leading-body: 1.43;
  --miosa-leading-ui: 1.5;
  --miosa-leading-display: 1.1;
  --miosa-tracking-subheading: -0.45px;
  --miosa-tracking-display: -2.4px;

  /* Spacing */
  --miosa-space-1: 4px;
  --miosa-space-2: 8px;
  --miosa-space-3: 12px;
  --miosa-space-4: 16px;
  --miosa-space-5: 20px;
  --miosa-space-6: 24px;
  --miosa-section-gap: 48px;
  --miosa-page-max: 1200px;

  /* Radius */
  --miosa-radius-sm: 4px;
  --miosa-radius-control: 10px;
  --miosa-radius-card: 14px;
  --miosa-radius-badge: 26px;
  --miosa-radius-pill: 9999px;

  /* Surfaces */
  --miosa-surface-canvas: #ffffff;
  --miosa-surface-card: #ffffff;
  --miosa-surface-muted: #f2f2f2;
  --miosa-surface-inverted: #171717;
}`;

	const compactTokens = JSON.stringify({
		color: {
			ink: designTokens.color.ink,
			muted: designTokens.color.muted,
			hairline: designTokens.color.hairline,
			mist: designTokens.color.mist,
			canvas: designTokens.color.canvas
		},
		font: designTokens.font,
		radius: {
			control: designTokens.radius.control,
			card: designTokens.radius.card,
			badge: designTokens.radius.badge
		}
	}, null, 2);

	const extendedTokens = JSON.stringify(designTokens, null, 2);

	const content = $derived(() => {
		if (activeTab === 'design') return detailMode === 'compact' ? compactMarkdown : extendedMarkdown;
		if (activeTab === 'tailwind') return detailMode === 'compact' ? tailwindCompact : tailwindExtended;
		if (activeTab === 'css') return detailMode === 'compact' ? cssCompact : cssExtended;
		return detailMode === 'compact' ? compactTokens : extendedTokens;
	});

	const copyLabel = $derived(activeTab === 'tokens' ? '.json' : activeTab === 'design' ? '.md' : '.css');

	async function copyActiveContent() {
		await navigator.clipboard.writeText(content());
		copied = true;
		setTimeout(() => copied = false, 1400);
	}
</script>

<section class="ds-section">
	<div class="ref-shell">
		<div class="ref-preview">
			<div class="ref-mini-nav">
				<div class="ref-logo">M</div>
				<a>Docs</a>
				<a>Components</a>
				<a>Tokens</a>
				<a>Patterns</a>
				<button>New</button>
			</div>
			<div class="ref-hero">
				<div class="ref-pill">MIOSA Foundation</div>
				<h1>The Foundation for your Operating System</h1>
				<p>A precise component system for AI-native product surfaces. White canvas, graphite text, hairline structure.</p>
				<div class="ref-actions">
					<button class="ref-primary">New Project</button>
					<button class="ref-ghost">View Components</button>
				</div>
			</div>
			<div class="ref-grid">
				<div class="ref-card">
					<div class="ref-card-title">Payment Method</div>
					<div class="ref-card-sub">All transactions are secure.</div>
					<div class="ref-input">John Doe</div>
					<div class="ref-row">
						<div class="ref-input">1234 5678</div>
						<div class="ref-input small">123</div>
					</div>
				</div>
				<div class="ref-card">
					<div class="ref-card-title">Team Members</div>
					<div class="ref-empty">No team members</div>
					<button class="ref-primary small">Invite Member</button>
				</div>
				<div class="ref-card">
					<div class="ref-card-title">Compute Environment</div>
					<label class="ref-option"><span></span>Kubernetes</label>
					<label class="ref-option muted"><span></span>Virtual Machine</label>
				</div>
				<div class="ref-card">
					<div class="ref-card-title">Agent Input</div>
					<div class="ref-input tall">Ask, search, or make anything...</div>
					<div class="ref-chip-row">
						<span>Auto</span>
						<span>All Sources</span>
					</div>
				</div>
			</div>
			<div class="ref-summary">
				<h2>MIOSA UI</h2>
				<p>Brutalist Swiss grid in graphite and chalk. Every line is a 1px border, every surface is white, and the single black button is deliberate.</p>
			</div>
		</div>

		<div class="ref-docs">
			<div class="ref-tabs">
				<button class:active={activeTab === 'design'} onclick={() => activeTab = 'design'}>DESIGN.md</button>
				<button class:active={activeTab === 'tailwind'} onclick={() => activeTab = 'tailwind'}>Tailwind v4</button>
				<button class:active={activeTab === 'css'} onclick={() => activeTab = 'css'}>CSS Variables</button>
				<button class:active={activeTab === 'tokens'} onclick={() => activeTab = 'tokens'}>Design Tokens</button>
			</div>
			<div class="ref-tools">
				<div class="ref-mode">
					<button class:active={detailMode === 'compact'} onclick={() => detailMode = 'compact'}>Compact</button>
					<button class:active={detailMode === 'extended'} onclick={() => detailMode = 'extended'}>Extended</button>
				</div>
				<div class="ref-copy">
					<button onclick={copyActiveContent}>{copied ? 'Copied' : 'Copy'}</button>
					<span>{copyLabel}</span>
				</div>
			</div>
			<pre class="ref-code">{content()}</pre>
		</div>
	</div>
</section>

<style>
	.ref-shell {
		display: grid;
		grid-template-columns: minmax(420px, 1fr) minmax(420px, 1fr);
		min-height: calc(100vh - 116px);
		background: #ffffff;
		border: 1px solid #e5e5e5;
		border-radius: 14px;
		overflow: hidden;
		color: #0a0a0a;
		font-family: var(--miosa-font-sans);
	}

	.ref-preview {
		padding: 28px;
		border-right: 1px solid #e5e5e5;
		overflow: auto;
		background: #ffffff;
	}

	.ref-mini-nav {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 42px;
		font-size: 12px;
		font-weight: 500;
		border-bottom: 1px solid #e5e5e5;
	}

	.ref-logo {
		width: 28px;
		height: 28px;
		border: 2px solid #0a0a0a;
		border-radius: 9999px;
		display: grid;
		place-items: center;
		font-weight: 700;
	}

	.ref-mini-nav button,
	.ref-primary {
		margin-left: auto;
		background: #0a0a0a;
		color: #ffffff;
		border: 1px solid #0a0a0a;
		border-radius: 10px;
		font-size: 12px;
		font-weight: 500;
		padding: 6px 12px;
	}

	.ref-hero {
		text-align: center;
		padding: 64px 24px 48px;
	}

	.ref-pill {
		display: inline-flex;
		padding: 3px 10px;
		border-radius: 26px;
		background: #f2f2f2;
		font-size: 12px;
		font-weight: 500;
		margin-bottom: 14px;
	}

	.ref-hero h1 {
		margin: 0;
		font-size: clamp(28px, 5vw, 48px);
		line-height: 1.1;
		letter-spacing: -2.4px;
		font-weight: 600;
	}

	.ref-hero p,
	.ref-summary p,
	.ref-card-sub {
		color: #737373;
		font-size: 14px;
		line-height: 1.43;
	}

	.ref-actions,
	.ref-row,
	.ref-chip-row {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
		margin-top: 16px;
	}

	.ref-ghost {
		border: 0;
		background: transparent;
		color: #0a0a0a;
		font-size: 12px;
		font-weight: 500;
		padding: 6px 10px;
	}

	.ref-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	.ref-card {
		border: 1px solid #e5e5e5;
		border-radius: 14px;
		padding: 16px;
		min-height: 150px;
		background: #ffffff;
	}

	.ref-card-title {
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 4px;
	}

	.ref-input {
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		padding: 9px 10px;
		color: #737373;
		font-size: 13px;
		margin-top: 10px;
	}

	.ref-input.small {
		width: 64px;
	}

	.ref-input.tall {
		min-height: 58px;
	}

	.ref-empty {
		display: grid;
		place-items: center;
		height: 70px;
		color: #737373;
		font-size: 13px;
	}

	.ref-primary.small {
		margin-left: 0;
		padding: 5px 10px;
	}

	.ref-option {
		display: flex;
		gap: 8px;
		align-items: center;
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		padding: 10px;
		font-size: 13px;
		margin-top: 10px;
	}

	.ref-option span {
		width: 12px;
		height: 12px;
		border-radius: 9999px;
		border: 3px solid #0a0a0a;
	}

	.ref-option.muted span {
		border: 1px solid #b9b9b9;
	}

	.ref-chip-row {
		justify-content: flex-start;
	}

	.ref-chip-row span {
		border-radius: 26px;
		background: #f2f2f2;
		font-size: 12px;
		padding: 3px 8px;
	}

	.ref-summary {
		margin-top: 32px;
	}

	.ref-summary h2 {
		font-size: 48px;
		line-height: 1.1;
		letter-spacing: -2.4px;
		margin: 0 0 12px;
		font-weight: 500;
	}

	.ref-docs {
		display: grid;
		grid-template-rows: auto auto minmax(0, 1fr);
		background: #fbfbfb;
		min-width: 0;
	}

	.ref-tabs,
	.ref-tools {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e5e5e5;
		background: #ffffff;
	}

	.ref-tabs {
		gap: 22px;
		padding: 0 24px;
		height: 50px;
	}

	.ref-tabs button,
	.ref-mode button,
	.ref-copy button {
		border: 0;
		background: transparent;
		color: #737373;
		font: inherit;
		font-size: 13px;
		font-weight: 500;
		height: 100%;
		padding: 0;
	}

	.ref-tabs button.active,
	.ref-mode button.active {
		color: #0a0a0a;
		box-shadow: inset 0 -1px #0a0a0a;
	}

	.ref-tools {
		justify-content: space-between;
		height: 44px;
		padding: 0 24px;
	}

	.ref-mode {
		display: flex;
		gap: 24px;
		height: 100%;
	}

	.ref-copy {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.ref-copy button {
		height: 28px;
		padding: 0 10px;
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		color: #0a0a0a;
		background: #ffffff;
	}

	.ref-copy span {
		font-size: 12px;
		color: #737373;
	}

	.ref-code {
		margin: 0;
		padding: 24px;
		overflow: auto;
		background: #fbfbfb;
		color: #0a0a0a;
		font-family: var(--miosa-font-mono);
		font-size: 13px;
		line-height: 1.6;
		white-space: pre;
	}

	@media (max-width: 1100px) {
		.ref-shell {
			grid-template-columns: 1fr;
		}

		.ref-preview {
			border-right: 0;
			border-bottom: 1px solid #e5e5e5;
		}
	}

	@media (max-width: 680px) {
		.ref-preview {
			padding: 18px;
		}

		.ref-grid {
			grid-template-columns: 1fr;
		}

		.ref-tabs {
			gap: 14px;
			overflow-x: auto;
		}
	}
</style>
