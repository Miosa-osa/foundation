<script lang="ts">
	// Basic accordion — one item open at a time
	let basicOpen = $state(0);
	function basicToggle(i: number) {
		basicOpen = basicOpen === i ? -1 : i;
	}

	// Icon accordion — independent open state per item
	let iconOpen = $state<number[]>([0]);
	function iconToggle(i: number) {
		iconOpen = iconOpen.includes(i) ? iconOpen.filter((x) => x !== i) : [...iconOpen, i];
	}

	// Bordered accordion
	let borderedOpen = $state(0);
	function borderedToggle(i: number) {
		borderedOpen = borderedOpen === i ? -1 : i;
	}

	// Flush accordion
	let flushOpen = $state(-1);
	function flushToggle(i: number) {
		flushOpen = flushOpen === i ? -1 : i;
	}

	// FAQ accordion
	let faqOpen = $state(-1);
	function faqToggle(i: number) {
		faqOpen = faqOpen === i ? -1 : i;
	}

	const basicItems = [
		{ title: 'Getting started', body: 'MIOSA Foundation is a design system and component library built on Svelte 5 and SvelteKit 2. Clone the repo, run pnpm install, and launch the dev server to explore all components.' },
		{ title: 'How does authentication work?', body: 'Authentication is handled server-side via SvelteKit form actions. Sessions are stored in signed httpOnly cookies. JWT tokens are validated on every protected route using middleware.' },
		{ title: 'Theming and customisation', body: 'All design tokens are exposed as CSS custom properties under --ds-* and --bos-* namespaces. Override them in your app.css to instantly retheme every component.' },
		{ title: 'Browser support', body: 'Modern evergreen browsers (Chrome 111+, Firefox 110+, Safari 16.4+). No IE11 support. CSS custom properties, View Transitions, and :has() are used throughout.' },
	];

	const iconItems = [
		{ title: 'Project structure', body: 'Routes live under src/routes/. Shared components are in src/lib/components/. Design system primitives are in src/lib/ui/. Server-only code stays in src/lib/server/.' },
		{ title: 'State management', body: 'Local UI state uses Svelte 5 runes ($state, $derived). Cross-component state uses class-based stores with runes. Server state is loaded via +page.server.ts load functions.' },
		{ title: 'Form handling', body: 'All mutations go through SvelteKit form actions for progressive enhancement. use:enhance intercepts submissions client-side. Validation runs on the server with zod schemas.' },
	];

	const borderedItems = [
		{ title: 'Data persistence', body: 'Primary store is PostgreSQL via Drizzle ORM. Redis handles caching and ephemeral session data. All queries use parameterised statements — no string concatenation.' },
		{ title: 'File uploads', body: 'Uploads stream directly to object storage. MIME type and size are validated server-side before any bytes are written. Signed URLs provide time-limited read access.' },
		{ title: 'Rate limiting', body: 'All endpoints are rate-limited at the edge. Auth routes apply a stricter 5 req/min window. Clients receive standard Retry-After headers when limits are hit.' },
	];

	const flushItems = [
		{ title: 'Component conventions', body: 'All components use Svelte 5 runes exclusively. Props are typed via TypeScript interfaces. Events are replaced by callback props following the Svelte 5 idiom.' },
		{ title: 'Accessibility', body: 'Every interactive element has an accessible label. Keyboard navigation is tested for all compound components. Color contrast meets WCAG 2.1 AA at a minimum.' },
		{ title: 'Performance', body: 'Components are tree-shaken at build time. No runtime CSS-in-JS. Animations use CSS transforms and opacity only, avoiding layout thrash.' },
		{ title: 'Testing', body: 'Unit tests use Vitest + @testing-library/svelte. Component tests follow the Arrange-Act-Assert pattern. Coverage targets: 80% statements, 75% branches.' },
	];

	const faqItems = [
		{ q: 'What is MIOSA Foundation?', a: 'MIOSA Foundation is the official design system and component library for the MIOSA platform. It ships production-ready Svelte 5 components, design tokens, and documentation under a single roof.' },
		{ q: 'Is it open source?', a: 'The component library and design tokens are MIT-licensed. The MIOSA platform application code is proprietary. Check the LICENSE file in each package for specifics.' },
		{ q: 'How do I contribute?', a: 'Fork the repository, create a feature branch, make your changes, and open a pull request. All PRs run the full gate (lint + build + test) via GitHub Actions before review.' },
		{ q: 'Can I use this with React?', a: 'MIOSA Foundation targets Svelte 5 and SvelteKit 2. The design tokens and CSS utilities are framework-agnostic and can be consumed in any project, but the component layer is Svelte-only.' },
		{ q: 'How are breaking changes handled?', a: 'We follow semantic versioning. Breaking changes bump the major version and are documented in CHANGELOG.md with a migration guide. Deprecation notices land at least one minor version before removal.' },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Accordions</h2>
	<p class="ds-desc">Collapsible sections for progressive disclosure. One-open-at-a-time and multi-open variants, with icon, bordered, flush, and FAQ styles.</p>

	<!-- Basic accordion -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Accordion</h3>
		<p class="ds-card__sub">Single item open at a time — click an open item to collapse it</p>
		<div class="ds-demo" style="display: block;">
			<div style="display: flex; flex-direction: column; gap: 4px; max-width: 600px;">
				{#each basicItems as item, i}
					<div style="border: 1px solid var(--dbd); border-radius: 8px; overflow: hidden; background: var(--dbg);">
						<button
							onclick={() => basicToggle(i)}
							aria-expanded={basicOpen === i}
							style="width: 100%; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; background: {basicOpen === i ? 'var(--dbg2)' : 'transparent'}; border: none; color: {basicOpen === i ? 'var(--dt)' : 'var(--dt4)'}; font-size: 14px; font-weight: {basicOpen === i ? '500' : '400'}; cursor: pointer; text-align: left; transition: background 0.15s, color 0.15s;"
						>
							<span>{item.title}</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								style="flex-shrink: 0; transform: rotate({basicOpen === i ? '180deg' : '0deg'}); transition: transform 0.2s ease;"
							>
								<path d="M6 9l6 6 6-6" />
							</svg>
						</button>
						{#if basicOpen === i}
							<div style="padding: 0 16px 14px; font-size: 13px; color: var(--dt3); line-height: 1.6; border-top: 1px solid var(--dbg2);">
								{item.body}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Accordion with icons — multi-open -->
	<div class="ds-card">
		<h3 class="ds-card__title">Accordion with Icons</h3>
		<p class="ds-card__sub">Multiple items can be open simultaneously — chevron rotates on expand</p>
		<div class="ds-demo" style="display: block;">
			<div style="display: flex; flex-direction: column; gap: 4px; max-width: 600px;">
				{#each iconItems as item, i}
					{@const isOpen = iconOpen.includes(i)}
					<div style="border: 1px solid var(--dbd); border-radius: 10px; overflow: hidden; background: var(--dbg);">
						<button
							onclick={() => iconToggle(i)}
							aria-expanded={isOpen}
							style="width: 100%; padding: 14px 16px; display: flex; align-items: center; gap: 12px; background: {isOpen ? 'var(--dbg2)' : 'transparent'}; border: none; color: var(--dt); font-size: 14px; cursor: pointer; text-align: left; transition: background 0.15s;"
						>
							<!-- Leading icon -->
							<div style="flex-shrink: 0; width: 28px; height: 28px; border-radius: 7px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; color: var(--dt3);">
								{#if i === 0}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" stroke-linecap="round" stroke-linejoin="round"/></svg>
								{:else if i === 1}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke-linecap="round"/><path d="M8 12h8M12 8v8" stroke-linecap="round"/></svg>
								{:else}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
								{/if}
							</div>
							<span style="flex: 1; font-weight: {isOpen ? '500' : '400'};">{item.title}</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								style="flex-shrink: 0; color: var(--dt2); transform: rotate({isOpen ? '180deg' : '0deg'}); transition: transform 0.2s ease;"
							>
								<path d="M6 9l6 6 6-6" />
							</svg>
						</button>
						{#if isOpen}
							<div style="padding: 12px 16px 14px 56px; font-size: 13px; color: var(--dt3); line-height: 1.6; border-top: 1px solid var(--dbg2);">
								{item.body}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bordered accordion -->
	<div class="ds-card">
		<h3 class="ds-card__title">Bordered Variant</h3>
		<p class="ds-card__sub">Heavier border treatment — items share a visible outline with separator lines</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 600px; border: 1px solid var(--dbd2); border-radius: 10px; overflow: hidden;">
				{#each borderedItems as item, i}
					<div style="{i > 0 ? 'border-top: 1px solid var(--dbd);' : ''}">
						<button
							onclick={() => borderedToggle(i)}
							aria-expanded={borderedOpen === i}
							style="width: 100%; padding: 15px 18px; display: flex; justify-content: space-between; align-items: center; background: {borderedOpen === i ? 'var(--dbg)' : 'transparent'}; border: none; color: var(--dt4); font-size: 14px; font-weight: 500; cursor: pointer; text-align: left; transition: background 0.15s;"
						>
							<span>{item.title}</span>
							<div style="display: flex; align-items: center; gap: 8px; color: var(--dt2); font-size: 12px;">
								<span>{borderedOpen === i ? 'Collapse' : 'Expand'}</span>
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									style="flex-shrink: 0; transform: rotate({borderedOpen === i ? '180deg' : '0deg'}); transition: transform 0.2s ease;"
								>
									<path d="M6 9l6 6 6-6" />
								</svg>
							</div>
						</button>
						{#if borderedOpen === i}
							<div style="padding: 0 18px 15px; font-size: 13px; color: var(--dt3); line-height: 1.65; border-top: 1px solid var(--dbg3);">
								<div style="padding-top: 12px;">{item.body}</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Flush / borderless accordion -->
	<div class="ds-card">
		<h3 class="ds-card__title">Flush / Borderless Variant</h3>
		<p class="ds-card__sub">No surrounding border — uses only subtle divider lines between items</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 600px;">
				{#each flushItems as item, i}
					<div style="{i > 0 ? 'border-top: 1px solid var(--dbg3);' : ''}">
						<button
							onclick={() => flushToggle(i)}
							aria-expanded={flushOpen === i}
							style="width: 100%; padding: 14px 0; display: flex; justify-content: space-between; align-items: center; background: transparent; border: none; color: {flushOpen === i ? 'var(--dt)' : 'var(--dt4)'}; font-size: 14px; cursor: pointer; text-align: left; transition: color 0.15s;"
						>
							<span>{item.title}</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								style="flex-shrink: 0; color: var(--dt2); transform: rotate({flushOpen === i ? '180deg' : '0deg'}); transition: transform 0.2s ease;"
							>
								<path d="M6 9l6 6 6-6" />
							</svg>
						</button>
						{#if flushOpen === i}
							<div style="padding-bottom: 14px; font-size: 13px; color: var(--dt3); line-height: 1.65;">
								{item.body}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- FAQ-style accordion -->
	<div class="ds-card">
		<h3 class="ds-card__title">FAQ Style</h3>
		<p class="ds-card__sub">Numbered questions with answer-prefix indicator — common in help centres</p>
		<div class="ds-demo" style="display: block;">
			<div style="display: flex; flex-direction: column; gap: 6px; max-width: 640px;">
				{#each faqItems as item, i}
					{@const isOpen = faqOpen === i}
					<div style="border-radius: 10px; overflow: hidden; border: 1px solid {isOpen ? 'var(--dbd2)' : 'var(--dbd)'}; background: {isOpen ? 'var(--dbg)' : 'transparent'}; transition: border-color 0.15s, background 0.15s;">
						<button
							onclick={() => faqToggle(i)}
							aria-expanded={isOpen}
							style="width: 100%; padding: 14px 16px; display: flex; align-items: flex-start; gap: 12px; background: transparent; border: none; color: var(--dt4); font-size: 14px; cursor: pointer; text-align: left;"
						>
							<span style="flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: var(--dbg3); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--dt3); margin-top: 1px;">{i + 1}</span>
							<span style="flex: 1; font-weight: {isOpen ? '500' : '400'}; color: {isOpen ? 'var(--dt)' : 'var(--dt4)'};">{item.q}</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								style="flex-shrink: 0; color: var(--dt2); margin-top: 3px; transform: rotate({isOpen ? '180deg' : '0deg'}); transition: transform 0.2s ease;"
							>
								<path d="M6 9l6 6 6-6" />
							</svg>
						</button>
						{#if isOpen}
							<div style="padding: 0 16px 14px 50px; font-size: 13px; color: var(--dt3); line-height: 1.7; border-top: 1px solid var(--dbg3);">
								<div style="padding-top: 10px;">{item.a}</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Nested / composed example -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Settings Panel</h3>
		<p class="ds-card__sub">Accordion groups composed into a realistic settings sidebar</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 480px; border: 1px solid var(--dbd); border-radius: 12px; overflow: hidden; background: var(--dbg);">
				<!-- Panel header -->
				<div style="padding: 14px 16px; border-bottom: 1px solid var(--dbd); display: flex; align-items: center; justify-content: space-between;">
					<span style="font-size: 13px; font-weight: 600; color: var(--dt);">Settings</span>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--dt2);"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-linecap="round" stroke-linejoin="round"/></svg>
				</div>
				{#each [
					{ label: 'Account', icon: 'user', items: ['Profile information', 'Password & security', 'Connected accounts'] },
					{ label: 'Notifications', icon: 'bell', items: ['Email alerts', 'Push notifications', 'Digest frequency'] },
					{ label: 'Appearance', icon: 'palette', items: ['Theme', 'Font size', 'Density'] },
				] as group, gi}
					{@const isGroupOpen = flushOpen === 10 + gi}
					<div style="{gi > 0 ? 'border-top: 1px solid var(--dbg3);' : ''}">
						<button
							onclick={() => { flushOpen = isGroupOpen ? -1 : 10 + gi; }}
							aria-expanded={isGroupOpen}
							style="width: 100%; padding: 12px 16px; display: flex; align-items: center; gap: 10px; background: {isGroupOpen ? 'var(--dbg)' : 'transparent'}; border: none; color: var(--dt4); font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; transition: background 0.15s;"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--dt2); flex-shrink: 0;">
								{#if group.icon === 'user'}<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4"/>{/if}
								{#if group.icon === 'bell'}<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke-linecap="round" stroke-linejoin="round"/>{/if}
								{#if group.icon === 'palette'}<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" stroke-linecap="round" stroke-linejoin="round"/>{/if}
							</svg>
							<span style="flex: 1;">{group.label}</span>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--dt2); transform: rotate({isGroupOpen ? '180deg' : '0deg'}); transition: transform 0.2s ease;"><path d="M6 9l6 6 6-6"/></svg>
						</button>
						{#if isGroupOpen}
							<div style="border-top: 1px solid var(--dbg2);">
								{#each group.items as subItem}
									<button style="width: 100%; padding: 9px 16px 9px 40px; display: flex; align-items: center; gap: 8px; background: transparent; border: none; color: var(--dt3); font-size: 13px; cursor: pointer; text-align: left; transition: color 0.12s;" onmouseenter={(e) => (e.currentTarget.style.color = 'var(--dt4)')} onmouseleave={(e) => (e.currentTarget.style.color = 'var(--dt3)')}>
										<span style="width: 4px; height: 4px; border-radius: 50%; background: var(--dbd); flex-shrink: 0;"></span>
										{subItem}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
