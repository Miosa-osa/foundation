<script lang="ts">
	// ── 1. Basic chips (single-select) ─────────────────────────────
	let basicActive = $state('All');
	const basicChips = ['All', 'Design', 'Engineering', 'Marketing', 'Research', 'Product'];

	// ── 2. Chips with icons (single-select) ────────────────────────
	let iconActive = $state('Photos');
	const iconChips = [
		{
			label: 'Photos',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>'
		},
		{
			label: 'Videos',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>'
		},
		{
			label: 'Audio',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>'
		},
		{
			label: 'Documents',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
		},
		{
			label: 'Links',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>'
		},
	];

	// ── 3. Chip sizes (single-select per row) ──────────────────────
	let sizeSmActive = $state('All');
	let sizeDefActive = $state('All');
	let sizeLgActive = $state('All');
	const sizeChips = ['All', 'Active', 'Paused', 'Done'];

	// ── 4. Multi-select chips ──────────────────────────────────────
	let multiActive = $state(new Set<string>(['TypeScript', 'Go']));
	const multiChips = ['TypeScript', 'Go', 'Rust', 'Python', 'Svelte', 'React', 'Node', 'PostgreSQL'];

	function toggleMulti(chip: string) {
		const next = new Set(multiActive);
		next.has(chip) ? next.delete(chip) : next.add(chip);
		multiActive = next;
	}

	// ── 5. Chip variants (single-select per variant) ───────────────
	let variantOutlineActive = $state('Week');
	let variantFilledActive = $state('Week');
	let variantSoftActive = $state('Week');
	let variantGhostActive = $state('Week');
	const variantChips = ['Day', 'Week', 'Month', 'Year'];

	// ── 6. Scrollable chip bar ─────────────────────────────────────
	let scrollActive = $state('All');
	const scrollChips = [
		'All', 'Productivity', 'Finance', 'Health & Fitness', 'Social', 'Entertainment',
		'Education', 'Travel', 'News', 'Shopping', 'Utilities', 'Games', 'Developer Tools',
		'Photography', 'Music', 'Sports',
	];

	// ── 7. Chips with count ────────────────────────────────────────
	let countActive = $state('All');
	const countChips = [
		{ label: 'All', count: 84 },
		{ label: 'AI', count: 12 },
		{ label: 'Design', count: 5 },
		{ label: 'Frontend', count: 23 },
		{ label: 'Backend', count: 19 },
		{ label: 'DevOps', count: 7 },
		{ label: 'Security', count: 4 },
		{ label: 'Database', count: 14 },
	];

	// ── 8. Chips with close (removable active filters) ─────────────
	let activeFilters = $state(['Dark Mode', 'TypeScript', 'Svelte 5', 'Open Source']);

	function removeFilter(label: string) {
		activeFilters = activeFilters.filter((f) => f !== label);
	}

	function resetFilters() {
		activeFilters = ['Dark Mode', 'TypeScript', 'Svelte 5', 'Open Source'];
	}

	// ── 9. In context: content feed ───────────────────────────────
	let feedActive = $state('Top');
	const feedChips = [
		{
			label: 'Top',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>'
		},
		{
			label: 'Lifestyle',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
		},
		{
			label: 'Health',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'
		},
		{
			label: 'AI',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
		},
		{
			label: 'Design',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>'
		},
		{
			label: 'Development',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>'
		},
		{
			label: 'Gaming',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>'
		},
	];

	type FeedCard = {
		title: string;
		excerpt: string;
		meta: string;
		tag: string;
	};

	const feedContent: Record<string, FeedCard[]> = {
		Top: [
			{ title: 'Why dark mode is the future of UI', excerpt: 'Exploring the science behind why developers and designers prefer dark interfaces after hours.', meta: '4.2k views · 8 min read', tag: 'Popular' },
			{ title: 'Building a $10k/mo SaaS in 90 days', excerpt: 'A founder\'s honest breakdown of the growth playbook, stack choices, and what failed spectacularly.', meta: '9.1k views · 12 min read', tag: 'Trending' },
			{ title: 'The 2025 state of frontend tooling', excerpt: 'Vite won. But what comes next? A survey of 3,400 developers reveals the emerging consensus.', meta: '6.7k views · 6 min read', tag: 'Hot' },
		],
		Lifestyle: [
			{ title: 'How I reclaimed 2 hours of focus daily', excerpt: 'Single-tasking, notification audits, and the one app I deleted that changed everything.', meta: '2.1k views · 5 min read', tag: 'Focus' },
			{ title: 'The remote work setup that actually works', excerpt: 'After 4 years fully remote, these are the ergonomic and workflow principles I never compromise on.', meta: '3.4k views · 7 min read', tag: 'Remote' },
		],
		Health: [
			{ title: 'Sitting 8 hours a day is costing you more than you think', excerpt: 'Spinal health, metabolic impact, and the surprisingly simple 90-second fix.', meta: '5.5k views · 9 min read', tag: 'Wellness' },
			{ title: 'The developer\'s guide to preventing RSI', excerpt: 'Keyboard angles, stretching routines, and the mice that actually help.', meta: '4.0k views · 6 min read', tag: 'Health' },
		],
		AI: [
			{ title: 'Claude 4 vs GPT-5: A developer\'s honest review', excerpt: 'After 200 hours of agentic coding tasks, here\'s where each model excels and fails.', meta: '11.2k views · 14 min read', tag: 'AI' },
			{ title: 'The prompt engineering patterns that actually scale', excerpt: 'Beyond few-shot: chain-of-thought, self-consistency, and tool-use patterns for production.', meta: '7.8k views · 10 min read', tag: 'Prompting' },
			{ title: 'Fine-tuning vs RAG: when each wins', excerpt: 'A decision framework based on data freshness, domain specificity, and inference cost.', meta: '6.3k views · 8 min read', tag: 'LLMs' },
		],
		Design: [
			{ title: 'The typography choices that make or break a UI', excerpt: 'Variable fonts, line height, and the one pairing principle the best design systems share.', meta: '3.2k views · 7 min read', tag: 'Typography' },
			{ title: 'Dark mode done right: contrast, not just inversion', excerpt: 'How to build a dark palette that feels considered, not just toggled.', meta: '4.9k views · 5 min read', tag: 'Color' },
		],
		Development: [
			{ title: 'Svelte 5 runes changed how I think about reactivity', excerpt: 'A deep dive into $state, $derived, and $effect — and why they solve a decade-old problem.', meta: '8.1k views · 11 min read', tag: 'Svelte' },
			{ title: 'Why I stopped using ORMs for complex queries', excerpt: 'Raw SQL with typed results: the approach that cut our query latency by 60%.', meta: '5.6k views · 9 min read', tag: 'Backend' },
		],
		Gaming: [
			{ title: 'Why retro gaming is booming in 2025', excerpt: 'Nostalgia economics, indie preservation efforts, and the Steam Deck effect on back-catalog sales.', meta: '2.7k views · 6 min read', tag: 'Gaming' },
			{ title: 'Building a game in 72 hours: lessons from a game jam', excerpt: 'Scope creep kills. Here\'s the constrained design process that actually ships.', meta: '1.9k views · 8 min read', tag: 'Indie' },
		],
	};

	let feedCards = $derived(feedContent[feedActive] ?? feedContent['Top']);

	// ── 10. In context: model selector ────────────────────────────
	let modelActive = $state('claude-4');
	const models = [
		{ id: 'claude-4', name: 'Claude 4', type: 'LLM', typeColor: '#a855f7', desc: 'Best reasoning', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>' },
		{ id: 'gpt-4o', name: 'GPT-4o', type: 'LLM', typeColor: '#22c55e', desc: 'Fast + capable', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
		{ id: 'gemini-pro', name: 'Gemini Pro', type: 'Vision', typeColor: '#60a5fa', desc: 'Multimodal', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>' },
		{ id: 'codestral', name: 'Codestral', type: 'Code', typeColor: '#f97316', desc: 'Code expert', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>' },
		{ id: 'llava', name: 'LLaVA', type: 'Vision', typeColor: '#60a5fa', desc: 'Open vision', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' },
		{ id: 'deepseek-r2', name: 'DeepSeek R2', type: 'LLM', typeColor: '#a855f7', desc: 'Deep think', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8 17.926 17.926 0 00-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"/></svg>' },
		{ id: 'qwen-coder', name: 'Qwen Coder', type: 'Code', typeColor: '#f97316', desc: 'Open source', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' },
	];

	let selectedModel = $derived(models.find((m) => m.id === modelActive) ?? models[0]);
</script>

<section class="ds-section">
	<h2 class="ds-title">Filter Chips / Chip Bars</h2>
	<p class="ds-desc">
		Horizontal scrollable category selectors for filtering, categorizing, and mode switching.
		Inspired by app stores, content feeds, and AI model selectors. Single-select and multi-select,
		five visual variants, removable filter tags, and fully functional context demos.
	</p>

	<!-- ═══ 1. BASIC CHIPS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Chips</h3>
		<p class="ds-card__sub">Single-select row of text-only pills. Active = filled dark background + inverted text. Inactive = transparent + border.</p>
		<div class="chip-row" role="group" aria-label="Basic filter chips">
			{#each basicChips as chip}
				<button
					onclick={() => (basicActive = chip)}
					aria-pressed={basicActive === chip}
					class="chip chip-basic"
					class:chip--active={basicActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>
		<p class="chip-state-readout">Selected: <strong>{basicActive}</strong></p>
	</div>

	<!-- ═══ 2. CHIPS WITH ICONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chips with Icons</h3>
		<p class="ds-card__sub">Each chip pairs an SVG icon with a label. Active filled, inactive outline style.</p>
		<div class="chip-row" role="group" aria-label="Media type filter chips">
			{#each iconChips as chip}
				<button
					onclick={() => (iconActive = chip.label)}
					aria-pressed={iconActive === chip.label}
					class="chip chip-icon-chip"
					class:chip--active={iconActive === chip.label}
				>
					<span class="chip-icon">{@html chip.svg}</span>
					{chip.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 3. CHIP SIZES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chip Sizes</h3>
		<p class="ds-card__sub">Three height tiers: small (24px), default (32px), large (40px).</p>

		<h4 class="ds-card__h4">Small — 24px</h4>
		<div class="chip-row" role="group" aria-label="Small chips">
			{#each sizeChips as chip}
				<button
					onclick={() => (sizeSmActive = chip)}
					aria-pressed={sizeSmActive === chip}
					class="chip chip-sm"
					class:chip--active={sizeSmActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Default — 32px</h4>
		<div class="chip-row" role="group" aria-label="Default chips">
			{#each sizeChips as chip}
				<button
					onclick={() => (sizeDefActive = chip)}
					aria-pressed={sizeDefActive === chip}
					class="chip chip-def"
					class:chip--active={sizeDefActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Large — 40px</h4>
		<div class="chip-row" role="group" aria-label="Large chips">
			{#each sizeChips as chip}
				<button
					onclick={() => (sizeLgActive = chip)}
					aria-pressed={sizeLgActive === chip}
					class="chip chip-lg"
					class:chip--active={sizeLgActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. MULTI-SELECT CHIPS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Multi-Select Chips</h3>
		<p class="ds-card__sub">Multiple chips can be active simultaneously — toggle on/off like tag filters. Uses a Set for O(1) lookups.</p>
		<div class="chip-row" role="group" aria-label="Multi-select language filter chips">
			{#each multiChips as chip}
				<button
					onclick={() => toggleMulti(chip)}
					aria-pressed={multiActive.has(chip)}
					class="chip chip-multi"
					class:chip--active={multiActive.has(chip)}
				>
					{#if multiActive.has(chip)}
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
						</svg>
					{/if}
					{chip}
				</button>
			{/each}
		</div>
		{#if multiActive.size > 0}
			<p class="chip-state-readout">
				{multiActive.size} selected: <strong>{[...multiActive].join(', ')}</strong>
			</p>
		{:else}
			<p class="chip-state-readout" style="color: var(--dt4);">No filters active — showing all</p>
		{/if}
	</div>

	<!-- ═══ 5. CHIP VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chip Variants</h3>
		<p class="ds-card__sub">Four visual treatments: Outline, Filled, Soft, Ghost.</p>

		<h4 class="ds-card__h4">Outline — border only, filled on active</h4>
		<div class="chip-row" role="group" aria-label="Outline chip variant">
			{#each variantChips as chip}
				<button
					onclick={() => (variantOutlineActive = chip)}
					aria-pressed={variantOutlineActive === chip}
					class="chip chip-variant-outline"
					class:chip-variant-outline--active={variantOutlineActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Filled — solid background, inverted active</h4>
		<div class="chip-row" role="group" aria-label="Filled chip variant">
			{#each variantChips as chip}
				<button
					onclick={() => (variantFilledActive = chip)}
					aria-pressed={variantFilledActive === chip}
					class="chip chip-variant-filled"
					class:chip-variant-filled--active={variantFilledActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Soft — subtle background tint, stronger on active</h4>
		<div class="chip-row" role="group" aria-label="Soft chip variant">
			{#each variantChips as chip}
				<button
					onclick={() => (variantSoftActive = chip)}
					aria-pressed={variantSoftActive === chip}
					class="chip chip-variant-soft"
					class:chip-variant-soft--active={variantSoftActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Ghost — no border, text weight change on active</h4>
		<div class="chip-row" role="group" aria-label="Ghost chip variant">
			{#each variantChips as chip}
				<button
					onclick={() => (variantGhostActive = chip)}
					aria-pressed={variantGhostActive === chip}
					class="chip chip-variant-ghost"
					class:chip-variant-ghost--active={variantGhostActive === chip}
				>
					{chip}
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 6. SCROLLABLE CHIP BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Scrollable Chip Bar</h3>
		<p class="ds-card__sub">Overflow container with <code>overflow-x: auto; scrollbar-width: none</code>. 16 chips, only 6–7 visible — scroll to reveal the rest.</p>
		<div class="chip-scroll-bar" role="group" aria-label="App category chips">
			{#each scrollChips as chip}
				<button
					onclick={() => (scrollActive = chip)}
					aria-pressed={scrollActive === chip}
					class="chip chip-def chip-scroll-item"
					class:chip--active={scrollActive === chip}
					style="white-space: nowrap; flex-shrink: 0;"
				>
					{chip}
				</button>
			{/each}
		</div>
		<p class="chip-state-readout" style="margin-top: 10px;">Category: <strong>{scrollActive}</strong> — scroll the bar to see more chips</p>
	</div>

	<!-- ═══ 7. CHIPS WITH COUNT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chips with Count</h3>
		<p class="ds-card__sub">Count badge inside the chip, showing item volume per category. Common in content feeds and dashboards.</p>
		<div class="chip-row" role="group" aria-label="Category chips with counts">
			{#each countChips as chip}
				<button
					onclick={() => (countActive = chip.label)}
					aria-pressed={countActive === chip.label}
					class="chip chip-count"
					class:chip-count--active={countActive === chip.label}
				>
					{chip.label}
					<span class="chip-count-badge" class:chip-count-badge--active={countActive === chip.label}>
						{chip.count}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 8. CHIPS WITH CLOSE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chips with Close (Removable Filters)</h3>
		<p class="ds-card__sub">Active filter tags with an X button to dismiss. Used for applied filter states in search and list views.</p>
		<div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
			<span style="font-size: 12px; color: var(--dt3); font-weight: 500; flex-shrink: 0;">Active filters:</span>
			{#if activeFilters.length > 0}
				{#each activeFilters as filter}
					<span class="chip-removable">
						{filter}
						<button
							onclick={() => removeFilter(filter)}
							class="chip-remove-btn"
							aria-label="Remove filter: {filter}"
						>
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
							</svg>
						</button>
					</span>
				{/each}
				<button onclick={resetFilters} class="chip-clear-all" aria-label="Clear all filters">
					Clear all
				</button>
			{:else}
				<span style="font-size: 13px; color: var(--dt4); font-style: italic;">All filters cleared</span>
				<button onclick={resetFilters} class="chip-clear-all">Reset</button>
			{/if}
		</div>
	</div>

	<!-- ═══ 9. IN CONTEXT: CONTENT FEED FILTER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Content Feed Filter</h3>
		<p class="ds-card__sub">A section header + scrollable icon chip bar above live-filtered mock content cards. Select a category to change the feed.</p>

		<div class="feed-panel">
			<!-- Feed header -->
			<div class="feed-header">
				<h4 class="feed-heading">Trending</h4>
				<span class="feed-subcount">{feedCards.length} article{feedCards.length !== 1 ? 's' : ''}</span>
			</div>

			<!-- Scrollable icon chip bar -->
			<div class="chip-scroll-bar feed-chips" role="group" aria-label="Content category filter">
				{#each feedChips as chip}
					<button
						onclick={() => (feedActive = chip.label)}
						aria-pressed={feedActive === chip.label}
						class="chip chip-icon-chip chip-scroll-item"
						class:chip--active={feedActive === chip.label}
						style="flex-shrink: 0;"
					>
						<span class="chip-icon">{@html chip.svg}</span>
						{chip.label}
					</button>
				{/each}
			</div>

			<!-- Feed content cards -->
			<div class="feed-cards">
				{#each feedCards as card}
					<div class="feed-card">
						<div class="feed-card-top">
							<span class="feed-card-tag">{card.tag}</span>
						</div>
						<h5 class="feed-card-title">{card.title}</h5>
						<p class="feed-card-excerpt">{card.excerpt}</p>
						<span class="feed-card-meta">{card.meta}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 10. IN CONTEXT: AI MODEL SELECTOR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: AI Model Selector</h3>
		<p class="ds-card__sub">Horizontal chip bar for selecting AI models. Each chip shows model icon + name + type badge. Active chip has a glow ring effect.</p>

		<div class="model-panel">
			<!-- Scrollable model chips -->
			<div class="chip-scroll-bar model-chip-bar" role="group" aria-label="AI model selector">
				{#each models as model}
					<button
						onclick={() => (modelActive = model.id)}
						aria-pressed={modelActive === model.id}
						class="model-chip"
						class:model-chip--active={modelActive === model.id}
						style={modelActive === model.id ? `--glow: ${model.typeColor}33; --ring: ${model.typeColor};` : ''}
					>
						<span class="model-chip-icon">{@html model.svg}</span>
						<span class="model-chip-name">{model.name}</span>
						<span
							class="model-chip-type"
							style="color: {model.typeColor}; background: {model.typeColor}18; border-color: {model.typeColor}30;"
						>
							{model.type}
						</span>
					</button>
				{/each}
			</div>

			<!-- Selected model detail panel -->
			<div class="model-detail">
				<div class="model-detail-icon">{@html selectedModel.svg}</div>
				<div class="model-detail-info">
					<div class="model-detail-name">{selectedModel.name}</div>
					<div class="model-detail-desc">{selectedModel.desc}</div>
				</div>
				<span
					class="model-detail-type"
					style="color: {selectedModel.typeColor}; background: {selectedModel.typeColor}18; border-color: {selectedModel.typeColor}30;"
				>
					{selectedModel.type}
				</span>
				<div class="model-detail-active-dot"></div>
			</div>

			<!-- Mock prompt area -->
			<div class="model-prompt-area">
				<div class="model-prompt-inner">
					<span class="model-prompt-placeholder">Ask {selectedModel.name} anything…</span>
					<button class="model-prompt-send" aria-label="Send message">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Shared chip base ─────────────────────────────────────────── */
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		border-radius: 9999px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.13s, color 0.13s, border-color 0.13s, box-shadow 0.13s;
		white-space: nowrap;
		line-height: 1;
		user-select: none;
		-webkit-user-select: none;
	}

	.chip:focus-visible {
		outline: 2px solid var(--dt3);
		outline-offset: 2px;
	}

	/* ─── Basic chips (default style) ─────────────────────────────── */
	.chip-basic {
		padding: 6px 14px;
		height: 32px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-basic:hover:not(.chip--active) {
		background: var(--dbg2);
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	.chip-basic.chip--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	/* ─── Icon chip ────────────────────────────────────────────────── */
	.chip-icon-chip {
		padding: 6px 14px;
		height: 32px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-icon-chip:hover:not(.chip--active) {
		background: var(--dbg2);
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	.chip-icon-chip.chip--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	.chip-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	/* ─── Size variants ────────────────────────────────────────────── */
	.chip-sm {
		padding: 0 10px;
		height: 24px;
		font-size: 11px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-sm:hover:not(.chip--active) {
		background: var(--dbg2);
		color: var(--dt2);
	}

	.chip-sm.chip--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	.chip-def {
		padding: 0 14px;
		height: 32px;
		font-size: 13px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-def:hover:not(.chip--active) {
		background: var(--dbg2);
		color: var(--dt2);
	}

	.chip-def.chip--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	.chip-lg {
		padding: 0 18px;
		height: 40px;
		font-size: 14px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-lg:hover:not(.chip--active) {
		background: var(--dbg2);
		color: var(--dt2);
	}

	.chip-lg.chip--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	/* ─── Multi-select chip ────────────────────────────────────────── */
	.chip-multi {
		padding: 6px 12px;
		height: 32px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-multi:hover:not(.chip--active) {
		background: var(--dbg2);
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	.chip-multi.chip--active {
		background: var(--dbg2);
		color: var(--dt);
		border-color: var(--dbd2);
		font-weight: 600;
	}

	/* ─── Variant: Outline ─────────────────────────────────────────── */
	.chip-variant-outline {
		padding: 6px 14px;
		height: 32px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.chip-variant-outline:hover:not(.chip-variant-outline--active) {
		border-color: var(--dbd2);
		color: var(--dt2);
	}

	.chip-variant-outline.chip-variant-outline--active {
		background: var(--dbg2);
		color: var(--dt);
		border-color: var(--dbd2);
		box-shadow: 0 0 0 1px var(--dbd2);
	}

	/* ─── Variant: Filled ──────────────────────────────────────────── */
	.chip-variant-filled {
		padding: 6px 14px;
		height: 32px;
		background: var(--dbg2);
		color: var(--dt2);
		border: 1px solid transparent;
	}

	.chip-variant-filled:hover:not(.chip-variant-filled--active) {
		background: var(--dbg3);
		color: var(--dt);
	}

	.chip-variant-filled.chip-variant-filled--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	/* ─── Variant: Soft ────────────────────────────────────────────── */
	.chip-variant-soft {
		padding: 6px 14px;
		height: 32px;
		background: rgba(255, 255, 255, 0.04);
		color: var(--dt3);
		border: 1px solid transparent;
	}

	.chip-variant-soft:hover:not(.chip-variant-soft--active) {
		background: rgba(255, 255, 255, 0.07);
		color: var(--dt2);
	}

	.chip-variant-soft.chip-variant-soft--active {
		background: rgba(255, 255, 255, 0.12);
		color: var(--dt);
		border-color: rgba(255, 255, 255, 0.12);
	}

	/* ─── Variant: Ghost ───────────────────────────────────────────── */
	.chip-variant-ghost {
		padding: 6px 14px;
		height: 32px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid transparent;
		font-weight: 400;
	}

	.chip-variant-ghost:hover:not(.chip-variant-ghost--active) {
		color: var(--dt2);
		background: transparent;
	}

	.chip-variant-ghost.chip-variant-ghost--active {
		color: var(--dt);
		font-weight: 700;
		background: transparent;
		border-color: transparent;
	}

	/* ─── Chip row ─────────────────────────────────────────────────── */
	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
	}

	/* ─── Scrollable chip bar ──────────────────────────────────────── */
	.chip-scroll-bar {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
		padding-bottom: 2px;
	}

	.chip-scroll-bar::-webkit-scrollbar {
		display: none;
	}

	.chip-scroll-item {
		flex-shrink: 0;
	}

	/* ─── Chips with count ─────────────────────────────────────────── */
	.chip-count {
		padding: 5px 10px 5px 14px;
		height: 32px;
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
		gap: 6px;
	}

	.chip-count:hover:not(.chip-count--active) {
		background: var(--dbg2);
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	.chip-count.chip-count--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	.chip-count-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 700;
		background: var(--dbg2);
		color: var(--dt3);
		border: 1px solid var(--dbd);
		transition: background 0.13s, color 0.13s;
	}

	.chip-count-badge--active {
		background: rgba(255, 255, 255, 0.18);
		color: #fff;
		border-color: transparent;
	}

	/* ─── Removable chips ──────────────────────────────────────────── */
	.chip-removable {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 6px 5px 12px;
		height: 30px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 500;
	}

	.chip-remove-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 9999px;
		background: var(--dbd);
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--dt3);
		transition: background 0.12s, color 0.12s;
		flex-shrink: 0;
	}

	.chip-remove-btn:hover {
		background: var(--dbd2);
		color: var(--dt);
	}

	.chip-clear-all {
		font-size: 12px;
		color: var(--dt4);
		background: transparent;
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		padding: 4px 10px;
		cursor: pointer;
		transition: color 0.12s, border-color 0.12s;
	}

	.chip-clear-all:hover {
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	/* ─── State readout ────────────────────────────────────────────── */
	.chip-state-readout {
		margin: 10px 0 0;
		font-size: 12px;
		color: var(--dt3);
	}

	.chip-state-readout strong {
		color: var(--dt2);
	}

	/* ─── Content feed panel ───────────────────────────────────────── */
	.feed-panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 18px;
		max-width: 640px;
	}

	.feed-header {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	.feed-heading {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
		color: var(--dt);
	}

	.feed-subcount {
		font-size: 12px;
		color: var(--dt4);
	}

	.feed-chips {
		border-bottom: 1px solid var(--dbd);
		padding-bottom: 14px;
	}

	.feed-cards {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.feed-card {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 13px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
		transition: border-color 0.15s;
	}

	.feed-card:hover {
		border-color: var(--dbd2);
	}

	.feed-card-top {
		display: flex;
		align-items: center;
	}

	.feed-card-tag {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt4);
	}

	.feed-card-title {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1.3;
	}

	.feed-card-excerpt {
		margin: 0;
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.5;
	}

	.feed-card-meta {
		font-size: 11px;
		color: var(--dt4);
		margin-top: 2px;
	}

	/* ─── Model selector panel ─────────────────────────────────────── */
	.model-panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 18px;
		max-width: 680px;
	}

	.model-chip-bar {
		padding-bottom: 4px;
	}

	.model-chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 7px 12px;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.13s, color 0.13s, border-color 0.13s, box-shadow 0.18s;
		white-space: nowrap;
		flex-shrink: 0;
		line-height: 1;
	}

	.model-chip:hover:not(.model-chip--active) {
		background: var(--dbg3);
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	.model-chip:focus-visible {
		outline: 2px solid var(--dt3);
		outline-offset: 2px;
	}

	.model-chip--active {
		background: var(--dbg3);
		color: var(--dt);
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px var(--glow, rgba(255,255,255,0.08)), 0 0 0 1px var(--ring, var(--dbd2));
	}

	.model-chip-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--dt3);
	}

	.model-chip--active .model-chip-icon {
		color: var(--dt);
	}

	.model-chip-name {
		font-size: 13px;
		font-weight: 600;
	}

	.model-chip-type {
		display: inline-flex;
		align-items: center;
		padding: 1px 6px;
		border-radius: 4px;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		border: 1px solid;
	}

	/* ─── Model detail panel ───────────────────────────────────────── */
	.model-detail {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
	}

	.model-detail-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 8px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		color: var(--dt2);
		flex-shrink: 0;
	}

	.model-detail-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}

	.model-detail-name {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
	}

	.model-detail-desc {
		font-size: 12px;
		color: var(--dt3);
	}

	.model-detail-type {
		display: inline-flex;
		align-items: center;
		padding: 3px 8px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		border: 1px solid;
		flex-shrink: 0;
	}

	.model-detail-active-dot {
		width: 7px;
		height: 7px;
		border-radius: 9999px;
		background: #22c55e;
		flex-shrink: 0;
		box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
	}

	/* ─── Mock prompt area ─────────────────────────────────────────── */
	.model-prompt-area {
		padding: 12px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
	}

	.model-prompt-inner {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.model-prompt-placeholder {
		flex: 1;
		font-size: 13px;
		color: var(--dt4);
		font-style: italic;
	}

	.model-prompt-send {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 7px;
		background: var(--dt);
		border: none;
		cursor: pointer;
		color: #fff;
		transition: opacity 0.12s;
		flex-shrink: 0;
	}

	.model-prompt-send:hover {
		opacity: 0.85;
	}

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .chip-basic.chip--active,
	:global(.dark) .chip-icon-chip.chip--active,
	:global(.dark) .chip-sm.chip--active,
	:global(.dark) .chip-def.chip--active,
	:global(.dark) .chip-lg.chip--active,
	:global(.dark) .chip-variant-filled.chip-variant-filled--active,
	:global(.dark) .chip-count.chip-count--active {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}
	:global(.dark) .chip-count-badge--active {
		background: rgba(0, 0, 0, 0.15);
		color: #111;
	}
	:global(.dark) .model-prompt-send {
		background: #e5e5e5;
		color: #111;
	}
</style>
