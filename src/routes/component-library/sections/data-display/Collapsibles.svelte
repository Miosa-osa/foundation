<script lang="ts">
	// Basic collapsible
	let basicOpen = $state(false);

	// Custom trigger collapsible
	let customOpen = $state(false);

	// Collapsible card
	let cardOpen = $state(false);

	// Code reveal — truncated vs full view
	let codeOpen = $state(false);

	// Nested / tree-like collapsibles
	let treeState = $state<Record<string, boolean>>({
		'src': true,
		'src/lib': false,
		'src/routes': true,
		'src/routes/api': false,
	});

	function treeToggle(key: string) {
		treeState = { ...treeState, [key]: !treeState[key] };
	}

	// Multi-collapsible list (each independent)
	let listOpen = $state<Record<number, boolean>>({});

	function listToggle(i: number) {
		listOpen = { ...listOpen, [i]: !listOpen[i] };
	}

	const changelogItems = [
		{
			version: 'v2.4.0',
			date: 'Mar 5, 2026',
			tag: 'Latest',
			changes: [
				'Added Drawers, HoverCards, and Collapsibles components',
				'Improved glassmorphism token consistency across dark mode',
				'Fixed Accordion chevron transition on rapid toggling',
				'Bumped SvelteKit to 2.18.0',
			],
		},
		{
			version: 'v2.3.1',
			date: 'Feb 20, 2026',
			tag: 'Patch',
			changes: [
				'Fixed Toast dismissal race condition on mobile',
				'Corrected WCAG contrast ratio on ds-card__sub',
				'Removed unused --bos-radius-xs token',
			],
		},
		{
			version: 'v2.3.0',
			date: 'Feb 8, 2026',
			tag: 'Minor',
			changes: [
				'New EmptyStates component with 6 illustration variants',
				'DataDisplay table now supports column pinning',
				'Slider component rewritten with Svelte 5 runes',
				'Added btn-glass-pill and btn-glass-light button variants',
			],
		},
	];

	const codeSnippet = `import { writable } from 'svelte/store';

export function createTheme(initial = 'dark') {
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    setDark:  () => set('dark'),
    setLight: () => set('light'),
    toggle:   () => update(t => t === 'dark' ? 'light' : 'dark'),
  };
}

export const theme = createTheme();`;

	const codePreview = codeSnippet.split('\n').slice(0, 3).join('\n') + '\n  // ...';
</script>

<style>
	/* Animated height via CSS grid trick — 0fr → 1fr */
	.collapsible-body {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.collapsible-body.is-open {
		grid-template-rows: 1fr;
	}
	.collapsible-body > .collapsible-inner {
		overflow: hidden;
	}

	/* Chevron rotation */
	.chevron {
		flex-shrink: 0;
		transition: transform 0.22s ease;
		color: var(--dt3);
	}
	.chevron.is-open {
		transform: rotate(180deg);
	}

	/* Tree node indent lines */
	.tree-node {
		position: relative;
	}
	.tree-children {
		padding-left: 20px;
		border-left: 1px solid var(--dbd);
		margin-left: 12px;
	}

	/* Code block styling */
	.code-block {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}
	.code-block pre {
		margin: 0;
		padding: 16px;
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
		font-size: 12.5px;
		line-height: 1.65;
		color: var(--dt3);
		overflow-x: auto;
	}
</style>

<section class="ds-section">
	<h2 class="ds-title">Collapsibles</h2>
	<p class="ds-desc">Simple expand/collapse controls for progressive disclosure — lighter than an accordion, ideal for single standalone sections, file trees, and inline code reveals.</p>

	<!-- Basic collapsible with chevron -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Collapsible</h3>
		<p class="ds-card__sub">Single section toggle with animated height transition and rotating chevron</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 560px; border: 1px solid var(--dbd); border-radius: 10px; overflow: hidden;">
				<button
					onclick={() => (basicOpen = !basicOpen)}
					aria-expanded={basicOpen}
					style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: {basicOpen ? 'var(--dbg)' : 'transparent'}; border: none; cursor: pointer; transition: background 0.15s; color: var(--dt);"
				>
					<div style="display: flex; align-items: center; gap: 10px;">
						<div style="width: 28px; height: 28px; border-radius: 7px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
							<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--dt2);"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke-linecap="round"/><path d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</div>
						<div style="text-align: left;">
							<p style="font-size: 14px; font-weight: 500; color: var(--dt); margin: 0;">Release schedule</p>
							<p style="font-size: 12px; color: var(--dt3); margin: 2px 0 0;">Next release: Mar 14, 2026</p>
						</div>
					</div>
					<svg class="chevron" class:is-open={basicOpen} width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
				</button>
				<div class="collapsible-body" class:is-open={basicOpen}>
					<div class="collapsible-inner">
						<div style="padding: 16px; border-top: 1px solid var(--dbd); display: flex; flex-direction: column; gap: 10px;">
							{#each [
								['Mar 14', 'v2.5.0 — New components: Combobox, DatePicker, ColorPicker'],
								['Mar 28', 'v2.5.1 — Bug fix patch based on beta feedback'],
								['Apr 11', 'v2.6.0 — Motion library integration, View Transitions'],
							] as [date, note]}
								<div style="display: flex; gap: 14px; align-items: flex-start;">
									<span style="font-size: 12px; color: var(--dt3); min-width: 44px; padding-top: 1px; font-weight: 500;">{date}</span>
									<div style="width: 1px; background: var(--dbd); align-self: stretch; margin-top: 4px; flex-shrink: 0;"></div>
									<span style="font-size: 13px; color: var(--dt3); line-height: 1.5;">{note}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Custom trigger collapsible -->
	<div class="ds-card">
		<h3 class="ds-card__title">Custom Trigger</h3>
		<p class="ds-card__sub">The trigger doesn't have to be a row header — any element can control the collapse state</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 560px; display: flex; flex-direction: column; gap: 12px;">
				<div style="display: flex; align-items: center; gap: 10px;">
					<p style="font-size: 14px; color: var(--dt3); margin: 0;">Advanced configuration</p>
					<button
						onclick={() => (customOpen = !customOpen)}
						aria-expanded={customOpen}
						style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 9999px; border: 1px solid var(--dbd); background: var(--dbg); color: var(--dt2); font-size: 12px; cursor: pointer; transition: all 0.15s; white-space: nowrap;"
					>
						{#if customOpen}
							<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14" stroke-linecap="round"/></svg>
							Hide options
						{:else}
							<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
							Show options
						{/if}
					</button>
				</div>
				<div class="collapsible-body" class:is-open={customOpen}>
					<div class="collapsible-inner">
						<div style="display: flex; flex-direction: column; gap: 10px; padding-top: 4px;">
							{#each [
								['Timeout (ms)', '5000', 'number'],
								['Max retries', '3', 'number'],
								['Base URL', 'https://api.miosa.io', 'text'],
							] as [label, defaultVal, type]}
								<label style="display: flex; flex-direction: column; gap: 5px;">
									<span style="font-size: 12px; color: var(--dt2); font-weight: 500;">{label}</span>
									<input
										type={type}
										defaultValue={defaultVal}
										style="width: 100%; padding: 8px 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 8px; color: var(--dt3); font-size: 13px; outline: none; box-sizing: border-box;"
									/>
								</label>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Collapsible card — whole card expands -->
	<div class="ds-card">
		<h3 class="ds-card__title">Collapsible Card</h3>
		<p class="ds-card__sub">The entire card surface acts as a container that expands — the card header always visible, body reveals on click</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 520px; border-radius: 12px; border: 1px solid {cardOpen ? 'var(--dbd2)' : 'var(--dbd)'}; background: var(--dbg); transition: border-color 0.2s;">
				<!-- Always-visible header -->
				<button
					onclick={() => (cardOpen = !cardOpen)}
					aria-expanded={cardOpen}
					style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; background: transparent; border: none; cursor: pointer; border-radius: 12px;"
				>
					<div style="display: flex; align-items: center; gap: 12px;">
						<div style="width: 36px; height: 36px; border-radius: 9px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
							<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: var(--dt3);"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9" stroke-linecap="round"/></svg>
						</div>
						<div style="text-align: left;">
							<p style="font-size: 14px; font-weight: 600; color: var(--dt); margin: 0; letter-spacing: -0.01em;">Usage summary</p>
							<p style="font-size: 12px; color: var(--dt3); margin: 3px 0 0;">Billing period: Feb 1 – Mar 1, 2026</p>
						</div>
					</div>
					<div style="display: flex; align-items: center; gap: 10px;">
						<span style="font-size: 15px; font-weight: 700; color: var(--dt); letter-spacing: -0.03em;">$24.80</span>
						<svg class="chevron" class:is-open={cardOpen} width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
					</div>
				</button>
				<!-- Expandable body -->
				<div class="collapsible-body" class:is-open={cardOpen}>
					<div class="collapsible-inner">
						<div style="border-top: 1px solid var(--dbd);">
							<div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 10px;">
								{#each [
									['Compute', '48 vCPU-hours', '$14.40'],
									['Storage', '220 GB-days', '$6.60'],
									['Egress', '12.4 GB', '$2.48'],
									['API calls', '84,200 requests', '$1.26'],
								] as [item, usage, cost]}
									<div style="display: flex; justify-content: space-between; align-items: center;">
										<div>
											<span style="font-size: 13px; color: var(--dt3);">{item}</span>
											<span style="font-size: 12px; color: var(--dt3); margin-left: 8px;">{usage}</span>
										</div>
										<span style="font-size: 13px; color: var(--dt3); font-weight: 500;">{cost}</span>
									</div>
								{/each}
							</div>
							<div style="border-top: 1px solid var(--dbd); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center;">
								<span style="font-size: 13px; color: var(--dt2);">Total</span>
								<span style="font-size: 15px; font-weight: 700; color: var(--dt); letter-spacing: -0.02em;">$24.80</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Changelog multi-collapsible list -->
	<div class="ds-card">
		<h3 class="ds-card__title">Independent List Items</h3>
		<p class="ds-card__sub">Each item manages its own open/closed state — unlike an accordion, multiple items can be open simultaneously</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 580px; display: flex; flex-direction: column; gap: 6px;">
				{#each changelogItems as item, i}
					{@const isOpen = !!listOpen[i]}
					<div style="border: 1px solid {isOpen ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 10px; overflow: hidden; background: {isOpen ? 'var(--dbg2)' : 'var(--dbg)'}; transition: border-color 0.15s, background 0.15s;">
						<button
							onclick={() => listToggle(i)}
							aria-expanded={isOpen}
							style="width: 100%; display: flex; align-items: center; gap: 12px; padding: 13px 16px; background: transparent; border: none; cursor: pointer;"
						>
							<span style="font-size: 13px; font-weight: 700; color: var(--dt); font-family: ui-monospace, monospace; letter-spacing: -0.02em;">{item.version}</span>
							<span style="flex: 1; font-size: 12px; color: var(--dt3); text-align: left;">{item.date}</span>
							<span style="font-size: 10px; font-weight: 600; color: {item.tag === 'Latest' ? '#22c55e' : item.tag === 'Patch' ? '#f59e0b' : '#6366f1'}; background: {item.tag === 'Latest' ? 'rgba(34,197,94,0.12)' : item.tag === 'Patch' ? 'rgba(245,158,11,0.12)' : 'rgba(99,102,241,0.12)'}; border-radius: 9999px; padding: 2px 8px; text-transform: uppercase; letter-spacing: 0.04em;">{item.tag}</span>
							<svg class="chevron" class:is-open={isOpen} width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
						</button>
						<div class="collapsible-body" class:is-open={isOpen}>
							<div class="collapsible-inner">
								<div style="border-top: 1px solid var(--dbd); padding: 12px 16px; display: flex; flex-direction: column; gap: 7px;">
									{#each item.changes as change}
										<div style="display: flex; align-items: flex-start; gap: 8px;">
											<span style="color: var(--dt3); font-size: 14px; flex-shrink: 0; margin-top: -1px;">–</span>
											<span style="font-size: 13px; color: var(--dt3); line-height: 1.5;">{change}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Nested / file-tree collapsibles -->
	<div class="ds-card">
		<h3 class="ds-card__title">Nested Collapsibles — File Tree</h3>
		<p class="ds-card__sub">Collapsibles can nest arbitrarily deep to represent hierarchical structures like file trees and menu groups</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 400px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 10px; padding: 12px;">
				<!-- Root: src/ -->
				<div class="tree-node">
					<button
						onclick={() => treeToggle('src')}
						aria-expanded={treeState['src']}
						style="display: flex; align-items: center; gap: 7px; width: 100%; background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 7px; color: var(--dt3); font-size: 13px; text-align: left; transition: background 0.12s;"
					>
						<svg class="chevron" class:is-open={treeState['src']} width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
						<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: #6366f1;"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
						<span style="font-weight: 500;">src</span>
					</button>
					<div class="collapsible-body" class:is-open={treeState['src']}>
						<div class="collapsible-inner">
							<div class="tree-children">
								<!-- src/app.css -->
								{#each ['app.css', 'app.d.ts', 'app.html'] as file}
									<div style="display: flex; align-items: center; gap: 7px; padding: 5px 6px; border-radius: 7px; color: var(--dt2); font-size: 13px;">
										<span style="width: 13px;"></span>
										<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: var(--dt3); flex-shrink: 0;"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="13 2 13 9 20 9" stroke-linecap="round" stroke-linejoin="round"/></svg>
										{file}
									</div>
								{/each}

								<!-- src/lib/ (nested folder) -->
								<div class="tree-node">
									<button
										onclick={() => treeToggle('src/lib')}
										aria-expanded={treeState['src/lib']}
										style="display: flex; align-items: center; gap: 7px; width: 100%; background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 7px; color: var(--dt3); font-size: 13px; text-align: left; transition: background 0.12s;"
									>
										<svg class="chevron" class:is-open={treeState['src/lib']} width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
										<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: #6366f1;"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
										lib
									</button>
									<div class="collapsible-body" class:is-open={treeState['src/lib']}>
										<div class="collapsible-inner">
											<div class="tree-children">
												{#each ['components/', 'server/', 'stores/', 'ui/'] as sub}
													<div style="display: flex; align-items: center; gap: 7px; padding: 5px 6px; border-radius: 7px; color: var(--dt2); font-size: 13px;">
														<span style="width: 13px;"></span>
														<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: #6366f1; flex-shrink: 0;"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
														{sub}
													</div>
												{/each}
											</div>
										</div>
									</div>
								</div>

								<!-- src/routes/ (nested folder) -->
								<div class="tree-node">
									<button
										onclick={() => treeToggle('src/routes')}
										aria-expanded={treeState['src/routes']}
										style="display: flex; align-items: center; gap: 7px; width: 100%; background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 7px; color: var(--dt3); font-size: 13px; text-align: left; transition: background 0.12s;"
									>
										<svg class="chevron" class:is-open={treeState['src/routes']} width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
										<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: #6366f1;"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
										routes
									</button>
									<div class="collapsible-body" class:is-open={treeState['src/routes']}>
										<div class="collapsible-inner">
											<div class="tree-children">
												{#each ['+layout.svelte', '+layout.server.ts', '+page.svelte'] as file}
													<div style="display: flex; align-items: center; gap: 7px; padding: 5px 6px; border-radius: 7px; color: var(--dt2); font-size: 13px;">
														<span style="width: 13px;"></span>
														<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: var(--dt3); flex-shrink: 0;"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="13 2 13 9 20 9" stroke-linecap="round" stroke-linejoin="round"/></svg>
														{file}
													</div>
												{/each}
												<div class="tree-node">
													<button
														onclick={() => treeToggle('src/routes/api')}
														aria-expanded={treeState['src/routes/api']}
														style="display: flex; align-items: center; gap: 7px; width: 100%; background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 7px; color: var(--dt3); font-size: 13px; text-align: left;"
													>
														<svg class="chevron" class:is-open={treeState['src/routes/api']} width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
														<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: #6366f1;"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
														api
													</button>
													<div class="collapsible-body" class:is-open={treeState['src/routes/api']}>
														<div class="collapsible-inner">
															<div class="tree-children">
																{#each ['+server.ts', 'health/+server.ts'] as file}
																	<div style="display: flex; align-items: center; gap: 7px; padding: 5px 6px; border-radius: 7px; color: var(--dt2); font-size: 13px;">
																		<span style="width: 13px;"></span>
																		<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: var(--dt3); flex-shrink: 0;"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="13 2 13 9 20 9" stroke-linecap="round" stroke-linejoin="round"/></svg>
																		{file}
																	</div>
																{/each}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Code reveal pattern -->
	<div class="ds-card">
		<h3 class="ds-card__title">Code Reveal</h3>
		<p class="ds-card__sub">Show the first few lines of a code block — click to reveal the full snippet without leaving the page</p>
		<div class="ds-demo" style="display: block;">
			<div style="max-width: 560px;">
				<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
					<div style="display: flex; align-items: center; gap: 8px;">
						<span style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em;">theme.ts</span>
						<span style="font-size: 10px; color: var(--dt4); background: var(--dbg); border: 1px solid var(--dbd); border-radius: 4px; padding: 1px 5px;">TypeScript</span>
					</div>
					<button
						onclick={() => (codeOpen = !codeOpen)}
						aria-expanded={codeOpen}
						style="display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: var(--dt2); background: none; border: none; cursor: pointer; padding: 3px 6px; border-radius: 6px; transition: color 0.12s;"
					>
						{#if codeOpen}
							<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14" stroke-linecap="round"/></svg>
							Collapse
						{:else}
							<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
							Show full ({codeSnippet.split('\n').length} lines)
						{/if}
					</button>
				</div>
				<div class="code-block">
					<pre>{#if codeOpen}{codeSnippet}{:else}{codePreview}{/if}</pre>
					{#if !codeOpen}
						<div style="border-top: 1px solid var(--dbd); padding: 8px 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(to bottom, rgba(10,10,10,0), rgba(10,10,10,0.8));">
							<button
								onclick={() => (codeOpen = true)}
								aria-label="Show full code snippet"
								style="font-size: 12px; color: var(--dt2); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 6px; padding: 5px 12px; cursor: pointer; transition: color 0.12s, background 0.12s; display: flex; align-items: center; gap: 6px;"
							>
								<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
								Show {codeSnippet.split('\n').length - 4} more lines
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
