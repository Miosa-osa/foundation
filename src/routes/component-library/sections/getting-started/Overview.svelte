<script lang="ts">
	// Quick-nav handler — dispatches section change to parent
	function goTo(sectionId: string) {
		const event = new CustomEvent('navigate', { detail: sectionId, bubbles: true });
		document.dispatchEvent(event);
	}

	// Agent guide state
	let showGuide = $state<'setup' | 'agent' | 'claude' | null>(null);
	let guideContent = $state('');
	let copyLabel = $state('Copy for LLM');
	let loading = $state(false);

	const guidePaths: Record<string, string> = {
		setup: '/agent-guides/SETUP-GUIDE.md',
		agent: '/agent-guides/AGENT-GUIDE.md',
		claude: '/agent-guides/CLAUDE.md',
	};

	function getGuideTitle(type: 'setup' | 'agent' | 'claude'): string {
		if (type === 'setup') return 'Setup Guide';
		if (type === 'agent') return 'Agent Guide';
		return 'CLAUDE.md';
	}

	async function toggleGuide(type: 'setup' | 'agent' | 'claude') {
		if (showGuide === type) {
			showGuide = null;
			return;
		}
		showGuide = type;
		loading = true;
		try {
			const res = await fetch(guidePaths[type]);
			guideContent = await res.text();
		} catch {
			guideContent = 'Failed to load guide content.';
		}
		loading = false;
	}

	async function copyGuideToClipboard() {
		if (!guideContent) return;
		try {
			await navigator.clipboard.writeText(guideContent);
			copyLabel = 'Copied!';
			setTimeout(() => copyLabel = 'Copy for LLM', 2000);
		} catch {
			const ta = document.createElement('textarea');
			ta.value = guideContent;
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			document.body.removeChild(ta);
			copyLabel = 'Copied!';
			setTimeout(() => copyLabel = 'Copy for LLM', 2000);
		}
	}
</script>

<section class="ds-section">
	<div class="ov-hero">
		<div class="ov-hero__badge">Open Source Design System</div>
		<h1 class="ov-hero__title">MIOSA Foundation</h1>
		<p class="ov-hero__sub">The component library for building your Optimal System.</p>
		<p class="ov-hero__desc">
			120+ production-ready components. Pure CSS. Zero cognitive load.
			Built to get out of your way so you can focus on what matters — shipping.
		</p>
		<div class="ov-hero__actions">
			<button class="btn-pill btn-pill-primary btn-pill-lg" onclick={() => goTo('buttons')}>Explore Components</button>
			<button class="btn-pill btn-pill-ghost btn-pill-lg" onclick={() => goTo('colors')}>Start with Foundation</button>
		</div>
	</div>

	<!-- Stats -->
	<div class="ds-grid ds-grid--4">
		<div class="ds-metric">
			<span class="ds-metric__value">120+</span>
			<span class="ds-metric__label">Components</span>
		</div>
		<div class="ds-metric">
			<span class="ds-metric__value">4</span>
			<span class="ds-metric__label">Button Systems</span>
		</div>
		<div class="ds-metric">
			<span class="ds-metric__value">30+</span>
			<span class="ds-metric__label">BOS Modules</span>
		</div>
		<div class="ds-metric">
			<span class="ds-metric__value">0</span>
			<span class="ds-metric__label">Runtime Dependencies</span>
		</div>
	</div>

	<!-- What is this -->
	<div class="ds-card">
		<h3 class="ds-card__title">What is this?</h3>
		<p class="ds-card__sub" style="max-width: 680px; line-height: 1.7;">
			MIOSA Foundation is the design system behind every product in the MIOSA ecosystem — BusinessOS, ContentOS, DevOS, OSA Terminal, and whatever you build next. It is a collection of every UI pattern you need, designed once, correctly, so you never have to think about it again.
		</p>
		<p class="ds-card__sub" style="max-width: 680px; line-height: 1.7; margin-top: 8px;">
			Every component follows the same styling language: dark monochrome gradients, glassmorphic surfaces with real backdrop-blur, pill-shaped interactions, and a gray spectrum that gives you hierarchy without reaching for color. The goal is to reduce cognitive load — for you as the developer and for the people using what you build.
		</p>
		<p class="ds-card__sub" style="max-width: 680px; line-height: 1.7; margin-top: 8px;">
			Everything here is pure CSS with HTML structure. No proprietary runtime. No vendor lock-in. Copy the classes, paste them into your app, set the design tokens, and it works.
		</p>
	</div>

	<!-- Quick Tour -->
	<div class="ds-card">
		<h3 class="ds-card__title">Quick Tour</h3>
		<p class="ds-card__sub">Use the sidebar to navigate, or jump directly to a section.</p>
		<div class="ov-tour">
			<button class="ov-tour__card" onclick={() => goTo('buttons')}>
				<div class="ov-tour__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4" stroke-width="1.5"/></svg>
				</div>
				<div class="ov-tour__label">Buttons</div>
				<div class="ov-tour__hint">4 shape systems, glass variants, monochrome scale</div>
			</button>
			<button class="ov-tour__card" onclick={() => goTo('glass-surfaces')}>
				<div class="ov-tour__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
				</div>
				<div class="ov-tour__label">Glass Surfaces</div>
				<div class="ov-tour__hint">Frosted glass cards, panels, overlays</div>
			</button>
			<button class="ov-tour__card" onclick={() => goTo('desktop-dock')}>
				<div class="ov-tour__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
				</div>
				<div class="ov-tour__label">Desktop & Dock</div>
				<div class="ov-tour__hint">OS shell, window chrome, spotlight, dock bar</div>
			</button>
			<button class="ov-tour__card" onclick={() => goTo('ai-conversation')}>
				<div class="ov-tour__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
				</div>
				<div class="ov-tour__label">AI Chat</div>
				<div class="ov-tour__hint">Conversations, reasoning, tool calls, sources</div>
			</button>
			<button class="ov-tour__card" onclick={() => goTo('dashboard-widgets')}>
				<div class="ov-tour__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
				</div>
				<div class="ov-tour__label">BOS Modules</div>
				<div class="ov-tour__hint">Dashboard, CRM, Tasks, Calendar, 25+ modules</div>
			</button>
			<button class="ov-tour__card" onclick={() => goTo('colors')}>
				<div class="ov-tour__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
				</div>
				<div class="ov-tour__label">Foundation</div>
				<div class="ov-tour__hint">Colors, typography, spacing, shadows, tokens</div>
			</button>
		</div>
	</div>

	<!-- Why Svelte -->
	<div class="ds-card">
		<h3 class="ds-card__title">Why Svelte, not React?</h3>
		<p class="ds-card__sub" style="max-width: 680px; line-height: 1.7;">
			This is a design system, not an application framework. The job is to define CSS patterns and HTML structures that any team can extract and use. Svelte is the right tool for this because:
		</p>
		<div class="ov-reasons">
			<div class="ov-reason">
				<div class="ov-reason__title">No runtime overhead</div>
				<div class="ov-reason__text">Svelte compiles to vanilla JS. There is no virtual DOM, no reconciler, no 40KB runtime sitting between your CSS and the browser. The components in this library are thin wrappers around CSS — that is what a design system should be.</div>
			</div>
			<div class="ov-reason">
				<div class="ov-reason__title">CSS stays CSS</div>
				<div class="ov-reason__text">React pushes you toward CSS-in-JS, styled-components, or Tailwind-only approaches because scoping is hard without a compiler. Svelte gives you real scoped <code>&lt;style&gt;</code> blocks that compile to plain CSS. Every pattern in this library is extractable as raw CSS — no JSX translation needed.</div>
			</div>
			<div class="ov-reason">
				<div class="ov-reason__title">Simpler state for demos</div>
				<div class="ov-reason__text">Interactive demos need local state. In Svelte that is <code>let count = $state(0)</code>. In React that is <code>const [count, setCount] = useState(0)</code> plus hook rules, dependency arrays, and re-render gotchas. For a library of 120+ interactive demos, the simpler model matters.</div>
			</div>
			<div class="ov-reason">
				<div class="ov-reason__title">Framework-agnostic output</div>
				<div class="ov-reason__text">The output of this library is CSS classes and HTML structure — not React components. You can use these patterns in React, Vue, Angular, plain HTML, or anything else. Building the demos in React would tempt people to import React components directly. Building in Svelte makes it clear: copy the CSS, adapt the markup, use it anywhere.</div>
			</div>
			<div class="ov-reason">
				<div class="ov-reason__title">Build speed</div>
				<div class="ov-reason__text">The full library builds in under 2 seconds. SvelteKit's Vite integration means HMR is instant. When you are iterating on 120+ component demos, build speed is not a nice-to-have — it is the difference between flow state and frustration.</div>
			</div>
		</div>
	</div>

	<!-- Design Principles -->
	<div class="ds-card">
		<h3 class="ds-card__title">Design Principles</h3>
		<div class="ov-principles">
			<div class="ov-principle">
				<div class="ov-principle__title">Dark Monochrome</div>
				<div class="ov-principle__text">Black-to-dark gradients as the primary action color. Clean whites, generous whitespace. Hierarchy through weight and opacity, not color.</div>
			</div>
			<div class="ov-principle">
				<div class="ov-principle__title">Glassmorphism</div>
				<div class="ov-principle__text">Frosted glass surfaces with real <code>backdrop-filter: blur(20px)</code>. Subtle borders and inner glow. Depth through transparency. Five glass variants from subtle to accent.</div>
			</div>
			<div class="ov-principle">
				<div class="ov-principle__title">Pill-First</div>
				<div class="ov-principle__text">Full-radius pill shapes for primary CTAs. Four shape systems total — pill (hero), rounded (forms), compact (toolbars), and glass (overlays). Each with its own size and variant scale.</div>
			</div>
			<div class="ov-principle">
				<div class="ov-principle__title">Reduce Cognitive Load</div>
				<div class="ov-principle__text">Every decision already made. Color? Use the gray spectrum. Button shape? Match the context. Spacing? Follow the token scale. The system decides so you do not have to.</div>
			</div>
			<div class="ov-principle">
				<div class="ov-principle__title">Easily Customizable</div>
				<div class="ov-principle__text">Set 9 CSS custom properties and the entire library adapts. Light mode, dark mode, custom brand colors — it is all token-driven. No build step required to re-theme.</div>
			</div>
			<div class="ov-principle">
				<div class="ov-principle__title">Zero Collisions</div>
				<div class="ov-principle__text">Every module uses a unique 2-3 character CSS prefix. Combine any number of sections in a single app with guaranteed zero class name conflicts.</div>
			</div>
		</div>
	</div>

	<!-- Button System Quick Reference -->
	<div class="ds-card">
		<h3 class="ds-card__title">Button System</h3>
		<p class="ds-card__sub">Four shape families, each for a different context. Every BOS module uses these — no custom button CSS.</p>
		<div class="ov-btn-grid">
			<div class="ov-btn-demo" role="button" tabindex="0" onclick={() => goTo('buttons')} onkeydown={(e) => e.key === 'Enter' && goTo('buttons')}>
				<div class="ov-btn-demo__row">
					<button class="btn-pill btn-pill-primary btn-pill-sm">Primary</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Ghost</button>
				</div>
				<div class="ov-btn-demo__label"><code>.btn-pill</code> — Hero CTAs, 9999px radius</div>
			</div>
			<div class="ov-btn-demo" role="button" tabindex="0" onclick={() => goTo('buttons')} onkeydown={(e) => e.key === 'Enter' && goTo('buttons')}>
				<div class="ov-btn-demo__row">
					<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Save</button>
					<button class="btn-rounded btn-rounded-ghost btn-rounded-sm">Cancel</button>
				</div>
				<div class="ov-btn-demo__label"><code>.btn-rounded</code> — Forms, 8px radius</div>
			</div>
			<div class="ov-btn-demo" role="button" tabindex="0" onclick={() => goTo('buttons')} onkeydown={(e) => e.key === 'Enter' && goTo('buttons')}>
				<div class="ov-btn-demo__row">
					<button class="btn-compact btn-compact-primary">Save</button>
					<button class="btn-compact btn-compact-ghost">Cancel</button>
				</div>
				<div class="ov-btn-demo__label"><code>.btn-compact</code> — Toolbars, 6px radius</div>
			</div>
			<div class="ov-btn-demo ov-btn-demo--dark" onclick={() => goTo('buttons')}>
				<div class="ov-btn-demo__row">
					<button class="btn-glass btn-glass-pill btn-glass-accent btn-glass-sm">Accent</button>
					<button class="btn-glass btn-glass-pill btn-glass-frosted btn-glass-sm">Frosted</button>
				</div>
				<div class="ov-btn-demo__label" style="color: #888;"><code>.btn-glass</code> — Overlays, backdrop-blur</div>
			</div>
		</div>
	</div>

	<!-- How to use -->
	<div class="ds-card">
		<h3 class="ds-card__title">How to Use</h3>
		<div class="ov-steps">
			<div class="ov-step">
				<div class="ov-step__num">1</div>
				<div class="ov-step__content">
					<div class="ov-step__title">Browse the sidebar</div>
					<div class="ov-step__text">Navigate through 16 groups. Every section is interactive — click, toggle, type to see how things behave.</div>
				</div>
			</div>
			<div class="ov-step">
				<div class="ov-step__num">2</div>
				<div class="ov-step__content">
					<div class="ov-step__title">Find your pattern</div>
					<div class="ov-step__text">Each section shows the HTML structure and the CSS classes. The class names are the API.</div>
				</div>
			</div>
			<div class="ov-step">
				<div class="ov-step__num">3</div>
				<div class="ov-step__content">
					<div class="ov-step__title">Copy the CSS</div>
					<div class="ov-step__text">Grab the prefixed CSS from the section's <code>&lt;style&gt;</code> block. Paste into your stylesheet. Set the design tokens.</div>
				</div>
			</div>
			<div class="ov-step">
				<div class="ov-step__num">4</div>
				<div class="ov-step__content">
					<div class="ov-step__title">Adapt the markup</div>
					<div class="ov-step__text">Use the HTML structure in React JSX, Vue templates, plain HTML, or any framework. The patterns are framework-agnostic.</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Agent Setup Guide -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Setup Guides</h3>
		<p class="ds-card__sub">Give these to your coding agent so it knows how to set up your codebase with MIOSA Foundation.</p>
		<div class="ov-agent-cards">
			<button class="ov-agent-card" onclick={() => toggleGuide('setup')}>
				<div class="ov-agent-card__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
				</div>
				<div class="ov-agent-card__content">
					<div class="ov-agent-card__title">Setup Guide</div>
					<div class="ov-agent-card__desc">Step-by-step bootstrap for new codebases. Module selection checklist, design tokens, button system, style intelligence.</div>
				</div>
				<div class="ov-agent-card__badge">SETUP-GUIDE.md</div>
			</button>
			<button class="ov-agent-card" onclick={() => toggleGuide('agent')}>
				<div class="ov-agent-card__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
				</div>
				<div class="ov-agent-card__content">
					<div class="ov-agent-card__title">Agent Guide</div>
					<div class="ov-agent-card__desc">How to find, extract, and add components. Extraction steps, file templates, wiring instructions.</div>
				</div>
				<div class="ov-agent-card__badge">AGENT-GUIDE.md</div>
			</button>
			<button class="ov-agent-card" onclick={() => toggleGuide('claude')}>
				<div class="ov-agent-card__icon">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
				</div>
				<div class="ov-agent-card__content">
					<div class="ov-agent-card__title">CLAUDE.md</div>
					<div class="ov-agent-card__desc">Full agent instructions. Module mapping, apply order, design tokens, CSS prefixes, project structure.</div>
				</div>
				<div class="ov-agent-card__badge">CLAUDE.md</div>
			</button>
		</div>

		{#if showGuide}
			<div class="ov-guide-viewer">
				<div class="ov-guide-viewer__header">
					<div class="ov-guide-viewer__title">{getGuideTitle(showGuide)}</div>
					<div class="ov-guide-viewer__actions">
						<button
							class="btn-compact btn-compact-primary"
							onclick={copyGuideToClipboard}
						>
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
							{copyLabel}
						</button>
						<button class="btn-compact btn-compact-ghost" onclick={() => showGuide = null}>Close</button>
					</div>
				</div>
				{#if loading}
					<div class="ov-guide-viewer__loading">Loading...</div>
				{:else}
					<pre class="ov-guide-viewer__content">{guideContent}</pre>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Apply Order -->
	<div class="ds-card">
		<h3 class="ds-card__title">Apply Order</h3>
		<p class="ds-card__sub">When building a new app, apply tiers in this order — each one builds on the last.</p>
		<div class="ov-tiers">
			<div class="ov-tier">
				<div class="ov-tier__num">1</div>
				<div class="ov-tier__name">Foundation</div>
				<div class="ov-tier__desc">Colors, Typography, Spacing, Shadows — always required</div>
			</div>
			<div class="ov-tier">
				<div class="ov-tier__num">2</div>
				<div class="ov-tier__name">Primitives</div>
				<div class="ov-tier__desc">Buttons, Inputs, Badges, Avatars, Form Controls — always required</div>
			</div>
			<div class="ov-tier">
				<div class="ov-tier__num">3</div>
				<div class="ov-tier__name">Patterns</div>
				<div class="ov-tier__desc">Layouts, Glass Surfaces, Auth, Settings — as needed</div>
			</div>
			<div class="ov-tier">
				<div class="ov-tier__num">4</div>
				<div class="ov-tier__name">Modules</div>
				<div class="ov-tier__desc">Dashboard, Tasks, CRM, Calendar — pick by feature</div>
			</div>
			<div class="ov-tier">
				<div class="ov-tier__num">5</div>
				<div class="ov-tier__name">AI</div>
				<div class="ov-tier__desc">Chat, Reasoning, Agent Cards — if the platform has AI</div>
			</div>
			<div class="ov-tier">
				<div class="ov-tier__num">6</div>
				<div class="ov-tier__name">Platform</div>
				<div class="ov-tier__desc">API Store, Usage, Billing — if SaaS</div>
			</div>
		</div>
	</div>

	<!-- Tech Stack -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tech Stack</h3>
		<div class="ov-stack-grid">
			<div class="ov-stack-item">
				<div class="ov-stack-item__name">Svelte 5</div>
				<div class="ov-stack-item__role">Component framework with runes</div>
			</div>
			<div class="ov-stack-item">
				<div class="ov-stack-item__name">SvelteKit</div>
				<div class="ov-stack-item__role">Routing and dev server</div>
			</div>
			<div class="ov-stack-item">
				<div class="ov-stack-item__name">TypeScript</div>
				<div class="ov-stack-item__role">Strict type checking</div>
			</div>
			<div class="ov-stack-item">
				<div class="ov-stack-item__name">CSS Custom Properties</div>
				<div class="ov-stack-item__role">Token system and theming</div>
			</div>
			<div class="ov-stack-item">
				<div class="ov-stack-item__name">Bits UI</div>
				<div class="ov-stack-item__role">Accessible primitives</div>
			</div>
			<div class="ov-stack-item">
				<div class="ov-stack-item__name">Vite</div>
				<div class="ov-stack-item__role">Instant HMR, sub-2s builds</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Hero ── */
	.ov-hero {
		text-align: center;
		padding: 48px 24px 40px;
	}
	.ov-hero__badge {
		display: inline-block;
		padding: 4px 14px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 16px;
	}
	.ov-hero__title {
		font-size: 42px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: -0.03em;
		margin: 0 0 8px;
	}
	.ov-hero__sub {
		font-size: 18px;
		font-weight: 500;
		color: var(--dt2);
		margin: 0 0 12px;
	}
	.ov-hero__desc {
		font-size: 14px;
		color: var(--dt3);
		line-height: 1.6;
		max-width: 520px;
		margin: 0 auto 24px;
	}
	.ov-hero__actions {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	/* ── Tour grid ── */
	.ov-tour {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-top: 12px;
	}
	.ov-tour__card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		padding: 14px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		text-align: left;
	}
	.ov-tour__card:hover {
		border-color: var(--dt4);
		background: var(--dbg2);
	}
	.ov-tour__icon {
		color: var(--dt3);
	}
	.ov-tour__label {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
	}
	.ov-tour__hint {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
	}

	/* ── Reasons (Why Svelte) ── */
	.ov-reasons {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-top: 12px;
	}
	.ov-reason {
		padding: 14px 16px;
		background: var(--dbg);
		border-radius: 10px;
		border: 1px solid var(--dbd);
	}
	.ov-reason__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 4px;
	}
	.ov-reason__text {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.65;
	}
	.ov-reason__text code {
		background: var(--dbg2);
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 11px;
	}

	/* ── Principles ── */
	.ov-principles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-top: 8px;
	}
	.ov-principle {
		padding: 16px;
		background: var(--dbg);
		border-radius: 10px;
	}
	.ov-principle__title {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 4px;
	}
	.ov-principle__text {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.55;
	}
	.ov-principle__text code {
		background: var(--dbg2);
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 11px;
	}

	/* ── Button demo grid ── */
	.ov-btn-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		margin-top: 8px;
	}
	.ov-btn-demo {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 18px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		cursor: pointer;
		transition: border-color 0.15s;
	}
	.ov-btn-demo:hover {
		border-color: var(--dt4);
	}
	.ov-btn-demo--dark {
		background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #0a0a0a);
		border-color: rgba(255,255,255,0.08);
	}
	.ov-btn-demo__row {
		display: flex;
		gap: 8px;
		align-items: center;
		pointer-events: none;
	}
	.ov-btn-demo__label {
		font-size: 11px;
		color: var(--dt3);
	}
	.ov-btn-demo__label code {
		background: var(--dbg2);
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: 600;
	}

	/* ── Steps ── */
	.ov-steps {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin-top: 8px;
	}
	.ov-step {
		display: flex;
		gap: 14px;
		padding: 14px 0;
		border-bottom: 1px solid var(--dbd);
	}
	.ov-step:last-child {
		border-bottom: none;
	}
	.ov-step__num {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--dt);
		color: var(--dbg);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		flex-shrink: 0;
	}
	.ov-step__content {
		flex: 1;
	}
	.ov-step__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 2px;
	}
	.ov-step__text {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.55;
	}
	.ov-step__text code {
		background: var(--dbg2);
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 11px;
	}

	/* ── Tiers ── */
	.ov-tiers {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin-top: 8px;
	}
	.ov-tier {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 0;
		border-bottom: 1px solid var(--dbd);
	}
	.ov-tier:last-child {
		border-bottom: none;
	}
	.ov-tier__num {
		width: 24px;
		height: 24px;
		border-radius: 6px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.ov-tier__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		min-width: 90px;
	}
	.ov-tier__desc {
		font-size: 12px;
		color: var(--dt3);
	}

	/* ── Agent guide cards ── */
	.ov-agent-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-top: 4px;
	}
	.ov-agent-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		padding: 16px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		text-align: left;
	}
	.ov-agent-card:hover {
		border-color: var(--dt4);
		background: var(--dbg2);
	}
	.ov-agent-card__icon {
		color: var(--dt3);
	}
	.ov-agent-card__content {
		flex: 1;
	}
	.ov-agent-card__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 4px;
	}
	.ov-agent-card__desc {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.5;
	}
	.ov-agent-card__badge {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 4px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 10px;
		font-weight: 600;
		color: var(--dt3);
		font-family: 'SF Mono', monospace;
	}

	/* ── Guide viewer ── */
	.ov-guide-viewer {
		margin-top: 14px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		background: var(--dbg);
	}
	.ov-guide-viewer__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 16px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}
	.ov-guide-viewer__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
	}
	.ov-guide-viewer__actions {
		display: flex;
		gap: 6px;
		align-items: center;
	}
	.ov-guide-viewer__content {
		padding: 16px;
		margin: 0;
		font-size: 12px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		line-height: 1.65;
		color: var(--dt2);
		max-height: 500px;
		overflow-y: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
		scrollbar-width: thin;
		scrollbar-color: var(--dbd) transparent;
	}
	.ov-guide-viewer__content::-webkit-scrollbar { width: 6px; }
	.ov-guide-viewer__content::-webkit-scrollbar-thumb {
		background: var(--dbd);
		border-radius: 3px;
	}

	.ov-guide-viewer__loading {
		padding: 32px;
		text-align: center;
		font-size: 13px;
		color: var(--dt3);
	}

	/* ── Stack grid ── */
	.ov-stack-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-top: 8px;
	}
	.ov-stack-item {
		padding: 14px;
		background: var(--dbg);
		border-radius: 10px;
		border: 1px solid var(--dbd);
	}
	.ov-stack-item__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 2px;
	}
	.ov-stack-item__role {
		font-size: 11px;
		color: var(--dt3);
	}
</style>
