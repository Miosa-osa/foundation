<script lang="ts">
	let selectedPill = $state<string | null>(null);
	let selectedCard = $state<string | null>(null);
	let selectedCategory = $state('all');

	const iconSvgs: Record<string, string> = {
		chart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>',
		pen: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
		bug: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2l1.88 1.88M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 116 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 014-4h4a4 4 0 014 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 4-4"/><path d="M17.47 9c1.93-.2 3.53-1.9 3.53-4"/><path d="M18 13h4"/><path d="M21 21c0-2.1-1.7-3.9-4-4"/></svg>',
		clipboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
		lightbulb: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>',
		wrench: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
		edit: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
		target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
	};

	const pills = ['Write a proposal', 'Analyze data', 'Plan my week', 'Debug this code', 'Brainstorm ideas', 'Explain concept'];

	const cards = [
		{ icon: 'chart', title: 'Data Analysis', desc: 'Explore trends and patterns in your dataset', category: 'analyze' },
		{ icon: 'pen', title: 'Content Writing', desc: 'Draft emails, docs, or marketing copy', category: 'create' },
		{ icon: 'bug', title: 'Debug Code', desc: 'Find and fix bugs in your codebase', category: 'code' },
		{ icon: 'clipboard', title: 'Summarize', desc: 'Condense long documents into key points', category: 'analyze' },
		{ icon: 'lightbulb', title: 'Brainstorm', desc: 'Generate creative ideas and solutions', category: 'create' },
		{ icon: 'wrench', title: 'Refactor', desc: 'Improve code structure and readability', category: 'code' },
		{ icon: 'edit', title: 'Write Tests', desc: 'Generate unit and integration tests', category: 'code' },
		{ icon: 'target', title: 'Action Plan', desc: 'Break goals into actionable steps', category: 'create' },
	];

	const categories = [
		{ id: 'all', label: 'All' },
		{ id: 'create', label: 'Create' },
		{ id: 'analyze', label: 'Analyze' },
		{ id: 'code', label: 'Code' },
	];

	let filteredCards = $derived(
		selectedCategory === 'all' ? cards : cards.filter(c => c.category === selectedCategory)
	);

	// Contextual suggestions
	let contextMode = $state<'empty' | 'code' | 'writing'>('empty');
	const contextSuggestions: Record<string, string[]> = {
		empty: ['What can you help me with?', 'Show me examples', 'Getting started guide'],
		code: ['Explain this function', 'Add error handling', 'Write tests for this', 'Optimize performance'],
		writing: ['Make it more concise', 'Add more detail', 'Change the tone', 'Fix grammar'],
	};

	// Follow-up suggestions
	const followUps = [
		'Tell me more about this',
		'Can you provide an example?',
		'What are the alternatives?',
		'How does this compare to...',
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Suggestions</h2>
	<p class="ds-desc">Prompt suggestion components — pill chips, card grids, contextual suggestions, and follow-up actions for guiding AI conversations.</p>

	<!-- 1. Pill Chips -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pill Suggestions</h3>
		<p class="ds-card__sub">Horizontal scrollable row of quick-action chips. Click to select — active state highlights.</p>
		<div class="sg-pills">
			{#each pills as pill}
				<button
					class="sg-pill"
					class:sg-pill--selected={selectedPill === pill}
					onclick={() => selectedPill = selectedPill === pill ? null : pill}
				>{pill}</button>
			{/each}
		</div>
		{#if selectedPill}
			<p class="sg-selected-hint">Selected: <code>{selectedPill}</code></p>
		{/if}
	</div>

	<!-- 2. Card Grid with Categories -->
	<div class="ds-card">
		<h3 class="ds-card__title">Card Suggestions with Categories</h3>
		<p class="ds-card__sub">Filterable grid of suggestion cards with icon, title, and description. Category tabs filter the grid.</p>

		<div class="sg-category-tabs">
			{#each categories as cat}
				<button
					class="sg-cat-tab"
					class:sg-cat-tab--active={selectedCategory === cat.id}
					onclick={() => selectedCategory = cat.id}
				>{cat.label}</button>
			{/each}
		</div>

		<div class="sg-card-grid">
			{#each filteredCards as card}
				<button
					class="sg-card"
					class:sg-card--selected={selectedCard === card.title}
					onclick={() => selectedCard = selectedCard === card.title ? null : card.title}
				>
					<span class="sg-card__icon">{@html iconSvgs[card.icon] ?? ''}</span>
					<span class="sg-card__title">{card.title}</span>
					<span class="sg-card__desc">{card.desc}</span>
				</button>
			{/each}
		</div>
		{#if selectedCard}
			<p class="sg-selected-hint">Selected: <code>{selectedCard}</code></p>
		{/if}
	</div>

	<!-- 3. Contextual Suggestions -->
	<div class="ds-card">
		<h3 class="ds-card__title">Contextual Suggestions</h3>
		<p class="ds-card__sub">Suggestions change based on context — empty state, code context, or writing context. Toggle below to see different sets.</p>

		<div class="sg-context-toggle">
			{#each [{ id: 'empty', label: 'Empty Chat' }, { id: 'code', label: 'Code Context' }, { id: 'writing', label: 'Writing Context' }] as mode}
				<button
					class="sg-context-btn"
					class:sg-context-btn--active={contextMode === mode.id}
					onclick={() => contextMode = mode.id as 'empty' | 'code' | 'writing'}
				>{mode.label}</button>
			{/each}
		</div>

		<div class="sg-context-chips">
			{#each contextSuggestions[contextMode] as suggestion}
				<button class="sg-context-chip">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
					{suggestion}
				</button>
			{/each}
		</div>
	</div>

	<!-- 4. Follow-up Suggestions -->
	<div class="ds-card">
		<h3 class="ds-card__title">Follow-up Suggestions</h3>
		<p class="ds-card__sub">Appear after an AI response to guide the conversation forward. Bordered pills with arrow icon.</p>

		<div class="sg-followup-area">
			<!-- Mock AI message -->
			<div class="sg-mock-msg">
				<div class="sg-mock-avatar">AI</div>
				<div class="sg-mock-bubble">
					<p>SvelteKit uses file-based routing where each <code>+page.svelte</code> becomes a route. Server load functions run only on the server.</p>
				</div>
			</div>
			<!-- Follow-ups -->
			<div class="sg-followups">
				{#each followUps as fu}
					<button class="sg-followup">
						<span>{fu}</span>
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- 5. Welcome Screen Suggestions -->
	<div class="ds-card">
		<h3 class="ds-card__title">Welcome Screen Layout</h3>
		<p class="ds-card__sub">Centered welcome state with greeting, animated subtitle, and suggestion grid below.</p>

		<div class="sg-welcome">
			<div class="sg-welcome__logo">M</div>
			<h3 class="sg-welcome__title">How can I help you today?</h3>
			<p class="sg-welcome__sub">Ask me anything about your project, data, or ideas.</p>
			<div class="sg-welcome__grid">
				{#each cards.slice(0, 4) as card}
					<button class="sg-welcome__card">
						<span class="sg-welcome__card-icon">{@html iconSvgs[card.icon] ?? ''}</span>
						<span class="sg-welcome__card-title">{card.title}</span>
						<span class="sg-welcome__card-desc">{card.desc}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- 6. Props Reference -->
	<div class="ds-card">
		<h3 class="ds-card__title">Suggestion Patterns Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Pattern</th><th>Variants</th><th>Purpose</th></tr></thead>
			<tbody>
				<tr><td style="font-weight: 600;">Pill Chips</td><td>Default, selected, scrollable row</td><td>Quick-action prompts in compact form</td></tr>
				<tr><td style="font-weight: 600;">Card Grid</td><td>Icon + title + desc, filterable by category</td><td>Rich suggestion cards with context</td></tr>
				<tr><td style="font-weight: 600;">Contextual</td><td>Empty, code, writing contexts</td><td>Dynamic suggestions based on conversation state</td></tr>
				<tr><td style="font-weight: 600;">Follow-ups</td><td>Arrow-icon pills after AI responses</td><td>Guide conversation flow forward</td></tr>
				<tr><td style="font-weight: 600;">Welcome Screen</td><td>Logo + greeting + suggestion grid</td><td>Empty state with quick-start options</td></tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	/* ═══════════════════════════════════════════════════════════ */
	/*  PILL SUGGESTIONS                                           */
	/* ═══════════════════════════════════════════════════════════ */
	.sg-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.sg-pill {
		display: inline-flex;
		align-items: center;
		padding: 7px 16px;
		border: 1.5px solid var(--dbd);
		border-radius: 100px;
		background: transparent;
		color: var(--dt2);
		font-size: 13px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.12s;
	}
	.sg-pill:hover {
		border-color: var(--dbd2);
		background: var(--dbg2);
	}
	.sg-pill--selected {
		background: var(--dt);
		border-color: var(--dt);
		color: #fff !important;
	}
	.sg-selected-hint {
		font-size: 12px;
		color: var(--dt3);
		margin-top: 10px;
	}
	.sg-selected-hint code {
		font-size: 11px;
		background: var(--dbg2);
		padding: 1px 5px;
		border-radius: 4px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  CATEGORY TABS                                              */
	/* ═══════════════════════════════════════════════════════════ */
	.sg-category-tabs {
		display: flex;
		gap: 4px;
		margin-bottom: 14px;
	}
	.sg-cat-tab {
		padding: 5px 14px;
		border: 1.5px solid var(--dbd);
		border-radius: 8px;
		background: transparent;
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.12s;
	}
	.sg-cat-tab:hover {
		border-color: var(--dbd2);
		color: var(--dt2);
	}
	.sg-cat-tab--active {
		background: var(--dt);
		border-color: var(--dt);
		color: #fff !important;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  CARD GRID                                                  */
	/* ═══════════════════════════════════════════════════════════ */
	.sg-card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;
	}
	.sg-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px;
		border: 1.5px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: all 0.12s;
	}
	.sg-card:hover {
		border-color: var(--dbd2);
		background: var(--dbg2);
	}
	.sg-card--selected {
		border-color: var(--dt);
		background: var(--dbg2);
	}
	.sg-card__icon { font-size: 20px; }
	.sg-card__title { font-size: 13px; font-weight: 600; color: var(--dt); }
	.sg-card__desc { font-size: 12px; color: var(--dt3); line-height: 1.4; }

	/* ═══════════════════════════════════════════════════════════ */
	/*  CONTEXTUAL SUGGESTIONS                                     */
	/* ═══════════════════════════════════════════════════════════ */
	.sg-context-toggle {
		display: flex;
		gap: 4px;
		margin-bottom: 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 3px;
		width: fit-content;
	}
	.sg-context-btn {
		padding: 5px 14px;
		border: none;
		border-radius: 7px;
		background: transparent;
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.12s;
	}
	.sg-context-btn--active {
		background: var(--dbg);
		color: var(--dt);
		box-shadow: 0 1px 3px rgba(0,0,0,0.06);
	}
	.sg-context-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.sg-context-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 14px;
		border: 1.5px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg);
		color: var(--dt2);
		font-size: 12.5px;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.12s;
	}
	.sg-context-chip:hover {
		border-color: var(--dbd2);
		background: var(--dbg2);
		color: var(--dt);
	}
	.sg-context-chip svg {
		color: var(--dt4);
		flex-shrink: 0;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  FOLLOW-UP SUGGESTIONS                                      */
	/* ═══════════════════════════════════════════════════════════ */
	.sg-followup-area {
		max-width: 520px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.sg-mock-msg {
		display: flex;
		gap: 10px;
		align-items: flex-start;
	}
	.sg-mock-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #7c3aed;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: 700;
		flex-shrink: 0;
	}
	.sg-mock-bubble {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 10px 14px;
		font-size: 13px;
		line-height: 1.55;
		color: var(--dt2);
	}
	.sg-mock-bubble p { margin: 0; }
	.sg-mock-bubble code {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 11.5px;
		background: var(--dbg3);
		padding: 1px 5px;
		border-radius: 3px;
	}
	.sg-followups {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-left: 38px;
	}
	.sg-followup {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 8px 12px;
		border: 1.5px solid var(--dbd);
		border-radius: 10px;
		background: transparent;
		color: var(--dt2);
		font-size: 13px;
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: all 0.12s;
	}
	.sg-followup:hover {
		border-color: var(--dbd2);
		background: var(--dbg2);
		color: var(--dt);
	}
	.sg-followup svg {
		color: var(--dt4);
		flex-shrink: 0;
		transition: transform 0.12s;
	}
	.sg-followup:hover svg {
		transform: translateX(2px);
		color: var(--dt3);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  WELCOME SCREEN                                             */
	/* ═══════════════════════════════════════════════════════════ */
	.sg-welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 32px 20px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 16px;
	}
	.sg-welcome__logo {
		width: 48px;
		height: 48px;
		border-radius: 14px;
		background: var(--dt);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: 800;
		margin-bottom: 16px;
	}
	.sg-welcome__title {
		font-size: 20px;
		font-weight: 700;
		color: var(--dt);
		margin: 0 0 6px;
	}
	.sg-welcome__sub {
		font-size: 13px;
		color: var(--dt3);
		margin: 0 0 24px;
	}
	.sg-welcome__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		max-width: 440px;
		width: 100%;
	}
	.sg-welcome__card {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 14px;
		border: 1.5px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: all 0.12s;
	}
	.sg-welcome__card:hover {
		border-color: var(--dbd2);
		background: var(--dbg2);
		transform: translateY(-1px);
	}
	.sg-welcome__card-icon { font-size: 18px; }
	.sg-welcome__card-title { font-size: 13px; font-weight: 600; color: var(--dt); }
	.sg-welcome__card-desc { font-size: 11.5px; color: var(--dt3); line-height: 1.4; }

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .sg-pill--selected {
		background: #e5e5e5;
		color: #111 !important;
		border-color: #e5e5e5;
	}
	:global(.dark) .sg-cat-tab--active {
		background: #e5e5e5;
		color: #111 !important;
		border-color: #e5e5e5;
	}
	:global(.dark) .sg-welcome__logo {
		background: #e5e5e5;
		color: #111;
	}
</style>
