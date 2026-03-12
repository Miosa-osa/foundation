<script lang="ts">
	// ── 1. Basic Search Input ─────────────────────────────────────
	let basicQuery = $state('');

	// ── 2. Search with Recent ─────────────────────────────────────
	let recentQuery = $state('');
	let recents = $state(['Design system tokens', 'API rate limits', 'Authentication flow', 'Svelte 5 runes']);

	function removeRecent(i: number) {
		recents = recents.filter((_, idx) => idx !== i);
	}
	function clearAllRecents() {
		recents = [];
	}

	// ── 3. Search Results List ────────────────────────────────────
	let resultsQuery = $state('pro');
	const allDocs = [
		{ icon: 'page',   title: 'Project Setup Guide',      desc: 'Initialize a new workspace with all required dependencies.',    cat: 'Docs' },
		{ icon: 'page',   title: 'API Endpoints Reference',   desc: 'Complete list of REST endpoints with request/response examples.', cat: 'Docs' },
		{ icon: 'folder', title: 'Product Requirements',      desc: 'Feature specifications and acceptance criteria.',                cat: 'Files' },
		{ icon: 'code',   title: 'Provisioning Scripts',      desc: 'Terraform modules for cloud infrastructure.',                   cat: 'Code' },
		{ icon: 'user',   title: 'Priya Anand',               desc: 'Product Designer · MIOSA Team',                                 cat: 'People' },
		{ icon: 'page',   title: 'Progress Tracking',         desc: 'Sprint board and milestone overview.',                          cat: 'Docs' },
	];
	const filteredDocs = $derived(
		resultsQuery.trim() === ''
			? allDocs
			: allDocs.filter(d =>
				d.title.toLowerCase().includes(resultsQuery.toLowerCase()) ||
				d.desc.toLowerCase().includes(resultsQuery.toLowerCase())
			)
	);
	function escapeHtml(str: string): string {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function highlightMatch(text: string, query: string): string {
		const escapedText = escapeHtml(text);
		if (!query.trim()) return escapedText;
		const escapedQuery = escapeHtml(query);
		const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		return escapedText.replace(regex, '<mark>$1</mark>');
	}

	// ── 4. Search with Filters ────────────────────────────────────
	let filterQuery = $state('');
	let activeFilter = $state('All');
	const filterTabs = ['All', 'People', 'Apps', 'Files', 'Messages'];
	const filterData: Record<string, { icon: string; title: string; meta: string }[]> = {
		All: [
			{ icon: 'user',    title: 'Jordan Lee',            meta: 'Person · Engineering' },
			{ icon: 'app',     title: 'Linear',                meta: 'App · Issue tracking' },
			{ icon: 'file',    title: 'Q4 Roadmap.pdf',        meta: 'File · 2.1 MB · Updated 2h ago' },
			{ icon: 'msg',     title: '#design-system',        meta: 'Message · 3 unread' },
			{ icon: 'user',    title: 'Sam Rivera',            meta: 'Person · Product' },
			{ icon: 'app',     title: 'Figma',                 meta: 'App · Design tool' },
		],
		People: [
			{ icon: 'user', title: 'Jordan Lee',    meta: 'Engineering · Online' },
			{ icon: 'user', title: 'Sam Rivera',    meta: 'Product · Away' },
			{ icon: 'user', title: 'Priya Anand',   meta: 'Design · Online' },
			{ icon: 'user', title: 'Alex Morgan',   meta: 'Backend · Offline' },
		],
		Apps: [
			{ icon: 'app', title: 'Linear',     meta: 'Issue tracking' },
			{ icon: 'app', title: 'Figma',      meta: 'Design tool' },
			{ icon: 'app', title: 'Notion',     meta: 'Docs & wiki' },
			{ icon: 'app', title: 'GitHub',     meta: 'Code hosting' },
		],
		Files: [
			{ icon: 'file', title: 'Q4 Roadmap.pdf',      meta: '2.1 MB · 2h ago' },
			{ icon: 'file', title: 'Design tokens.fig',   meta: '8.4 MB · yesterday' },
			{ icon: 'file', title: 'Meeting Notes.md',    meta: '12 KB · 3d ago' },
			{ icon: 'file', title: 'Budget 2025.xlsx',    meta: '540 KB · 1w ago' },
		],
		Messages: [
			{ icon: 'msg', title: '#design-system',   meta: '3 unread · Sam Rivera' },
			{ icon: 'msg', title: '#engineering',      meta: '12 unread · Jordan Lee' },
			{ icon: 'msg', title: 'Alex Morgan',       meta: 'DM · 1 unread' },
			{ icon: 'msg', title: '#general',          meta: '0 unread' },
		],
	};
	const filteredByTab = $derived(
		filterQuery.trim() === ''
			? filterData[activeFilter]
			: filterData[activeFilter].filter(item =>
				item.title.toLowerCase().includes(filterQuery.toLowerCase())
			)
	);

	// ── 5. Search Empty State ─────────────────────────────────────
	let emptyQuery = $state('xyznotfound');

	// ── 6. Search with Suggestions ────────────────────────────────
	let suggestQuery = $state('');
	let suggestFocused = $state(false);
	const allSuggestions = [
		'Design tokens documentation',
		'Deploy to production',
		'Dashboard analytics',
		'Data export settings',
		'Database migrations',
		'Dark mode toggle',
		'Developer API keys',
		'Default workspace settings',
	];
	const suggestions = $derived(
		suggestQuery.trim().length < 1
			? []
			: allSuggestions.filter(s =>
				s.toLowerCase().includes(suggestQuery.toLowerCase())
			).slice(0, 6)
	);
	const showSuggestDropdown = $derived(suggestFocused && suggestions.length > 0);

	// ── 8. In Context: Search Page ────────────────────────────────
	let pageQuery = $state('');
	let pageTab = $state('All');
	const pageTabs = ['All', 'Docs', 'People', 'Files'];
	const trending = ['Design system', 'API reference', 'Onboarding guide', 'Billing', 'Webhooks'];
	const pageResults: { icon: string; title: string; desc: string; cat: string; time: string }[] = [
		{ icon: 'page',   title: 'Getting Started with MIOSA',    desc: 'Step-by-step setup for new workspaces.',     cat: 'Docs',    time: '2d ago' },
		{ icon: 'user',   title: 'Jordan Lee',                    desc: 'Engineering Lead · jordan@miosa.io',         cat: 'People',  time: 'Online' },
		{ icon: 'file',   title: 'Design System v3.pdf',          desc: '3.2 MB · Updated yesterday',                cat: 'Files',   time: 'yesterday' },
		{ icon: 'page',   title: 'API Authentication Guide',      desc: 'OAuth2 flows and token management.',         cat: 'Docs',    time: '5d ago' },
		{ icon: 'user',   title: 'Priya Anand',                   desc: 'Product Designer · priya@miosa.io',          cat: 'People',  time: 'Away' },
		{ icon: 'file',   title: 'Q4 Roadmap.fig',                desc: '8.4 MB · Figma source',                     cat: 'Files',   time: '3d ago' },
		{ icon: 'page',   title: 'Billing & Subscriptions',       desc: 'Manage plans, invoices and payments.',       cat: 'Docs',    time: '1w ago' },
		{ icon: 'user',   title: 'Sam Rivera',                    desc: 'Product Manager · sam@miosa.io',             cat: 'People',  time: 'Offline' },
	];
	const filteredPageResults = $derived(
		pageQuery.trim() === ''
			? []
			: pageResults.filter(r => {
				const matchesQuery =
					r.title.toLowerCase().includes(pageQuery.toLowerCase()) ||
					r.desc.toLowerCase().includes(pageQuery.toLowerCase());
				const matchesTab = pageTab === 'All' || r.cat === pageTab;
				return matchesQuery && matchesTab;
			})
	);
</script>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  SECTION                                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Search Patterns</h2>
	<p class="ds-desc">
		Search UI components for every context — from simple input fields to global Spotlight overlays.
		All live-reactive with Svelte 5 runes. Dark monochrome aesthetic throughout.
	</p>

	<!-- ── 1. Basic Search Input ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Search Input</h3>
		<p class="ds-card__sub">Pill-style search with leading magnifying glass and trailing clear button. Appears when text is typed.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: stretch; gap: 16px;">
			<!-- Light variant -->
			<div class="srch-wrap srch-wrap--light">
				<svg class="srch-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				<input
					class="srch-input srch-input--light"
					type="text"
					placeholder="Search…"
					bind:value={basicQuery}
					aria-label="Search"
				/>
				{#if basicQuery}
					<button class="srch-clear srch-clear--light" onclick={() => basicQuery = ''} aria-label="Clear search">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				{/if}
			</div>
			<!-- Dark variant -->
			<div class="ds-preview-dark" style="padding: 16px;">
				<div class="srch-wrap srch-wrap--dark">
					<svg class="srch-icon srch-icon--dark" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<input
						class="srch-input srch-input--dark"
						type="text"
						placeholder="Search…"
						bind:value={basicQuery}
						aria-label="Search dark"
					/>
					{#if basicQuery}
						<button class="srch-clear srch-clear--dark" onclick={() => basicQuery = ''} aria-label="Clear search">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 2. Search with Recent ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Search with Recent Searches</h3>
		<p class="ds-card__sub">Input at top, recent queries below with clock icons and per-item remove buttons. Fully reactive list.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="recnt-panel">
				<div class="recnt-search-row">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: var(--dt3); flex-shrink: 0;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<input
						class="recnt-input"
						type="text"
						placeholder="Search…"
						bind:value={recentQuery}
						aria-label="Search with recents"
					/>
					{#if recentQuery}
						<button class="recnt-clear" onclick={() => recentQuery = ''} aria-label="Clear">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					{/if}
				</div>
				{#if recents.length > 0}
					<div class="recnt-section">
						<div class="recnt-header">
							<span class="recnt-label">Recent Searches</span>
							<button class="recnt-clear-all" onclick={clearAllRecents}>Clear All</button>
						</div>
						{#each recents as item, i}
							<div class="recnt-item">
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: var(--dt4); flex-shrink: 0;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span class="recnt-item-text">{item}</span>
								<button class="recnt-remove" onclick={() => removeRecent(i)} aria-label="Remove {item}">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
								</button>
							</div>
						{/each}
					</div>
				{:else}
					<div class="recnt-empty-recents">No recent searches</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 3. Search Results List ─────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Search Results List</h3>
		<p class="ds-card__sub">Live filtering with icon, title (match highlighted), description, and category badge. Try editing the query.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: stretch; gap: 12px;">
			<div class="srch-wrap srch-wrap--light" style="max-width: 520px;">
				<svg class="srch-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				<input
					class="srch-input srch-input--light"
					type="text"
					placeholder="Search docs, files, people…"
					bind:value={resultsQuery}
					aria-label="Search results demo"
				/>
				{#if resultsQuery}
					<button class="srch-clear srch-clear--light" onclick={() => resultsQuery = ''} aria-label="Clear">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				{/if}
			</div>
			{#if filteredDocs.length > 0}
				<div class="res-list">
					{#each filteredDocs as doc}
						<div class="res-item">
							<span class="res-item-icon">
								{#if doc.icon === 'page'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
								{:else if doc.icon === 'folder'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>
								{:else if doc.icon === 'code'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
								{:else if doc.icon === 'user'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
								{/if}
							</span>
							<div class="res-item-body">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								<span class="res-item-title">{@html highlightMatch(doc.title, resultsQuery)}</span>
								<span class="res-item-desc">{doc.desc}</span>
							</div>
							<span class="res-item-cat">{doc.cat}</span>
						</div>
					{/each}
				</div>
			{:else if resultsQuery}
				<p class="res-no-results">No results for "{resultsQuery}"</p>
			{/if}
		</div>
	</div>

	<!-- ── 4. Search with Filters ─────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Search with Filter Pills</h3>
		<p class="ds-card__sub">Horizontally scrollable category pills below the search bar. Results update by active filter.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: stretch; gap: 12px;">
			<div class="srch-wrap srch-wrap--light" style="max-width: 520px;">
				<svg class="srch-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				<input
					class="srch-input srch-input--light"
					type="text"
					placeholder="Search…"
					bind:value={filterQuery}
					aria-label="Filtered search"
				/>
				{#if filterQuery}
					<button class="srch-clear srch-clear--light" onclick={() => filterQuery = ''} aria-label="Clear">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				{/if}
			</div>
			<!-- Filter pills -->
			<div class="flt-pills" role="tablist" aria-label="Search filters">
				{#each filterTabs as tab}
					<button
						class="flt-pill"
						class:flt-pill--active={activeFilter === tab}
						role="tab"
						aria-selected={activeFilter === tab}
						onclick={() => { activeFilter = tab; filterQuery = ''; }}
					>
						{tab}
					</button>
				{/each}
			</div>
			<!-- Results -->
			<div class="flt-results" role="tabpanel">
				{#if filteredByTab.length > 0}
					{#each filteredByTab as item}
						<div class="flt-result-item">
							<span class="flt-result-icon">
								{#if item.icon === 'user'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
								{:else if item.icon === 'app'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>
								{:else if item.icon === 'file'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
								{:else if item.icon === 'msg'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
								{/if}
							</span>
							<div class="flt-result-body">
								<span class="flt-result-title">{item.title}</span>
								<span class="flt-result-meta">{item.meta}</span>
							</div>
						</div>
					{/each}
				{:else}
					<p style="font-size: 13px; color: var(--dt3); padding: 8px 0; margin: 0;">No results in {activeFilter}</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 5. Search Empty State ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Search Empty State</h3>
		<p class="ds-card__sub">Shown when the query returns zero matches. Icon illustration, message, and suggestion.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: stretch; gap: 12px;">
			<div class="srch-wrap srch-wrap--light" style="max-width: 480px;">
				<svg class="srch-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				<input
					class="srch-input srch-input--light"
					type="text"
					placeholder="Try something not found…"
					bind:value={emptyQuery}
					aria-label="Empty state demo"
				/>
				{#if emptyQuery}
					<button class="srch-clear srch-clear--light" onclick={() => emptyQuery = ''} aria-label="Clear">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				{/if}
			</div>
			<div class="empty-state-panel">
				<div class="empty-state-illus" aria-hidden="true">
					<svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<div class="empty-state-x" aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
					</div>
				</div>
				<p class="empty-state-title">No results for <span class="empty-state-query">"{emptyQuery || 'your search'}"</span></p>
				<p class="empty-state-sub">Try different keywords or check your spelling</p>
				<div class="empty-state-suggestions">
					<span class="empty-state-tip-label">Try:</span>
					{#each ['Dashboard', 'API reference', 'Team members'] as suggestion}
						<button class="empty-state-tag" onclick={() => emptyQuery = suggestion}>{suggestion}</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 6. Search with Suggestions ────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Search with Typeahead Suggestions</h3>
		<p class="ds-card__sub">Dropdown appears as you type. Matching text is highlighted in each suggestion. Try typing "d".</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start;">
			<div class="suggest-wrap" style="max-width: 480px; width: 100%;">
				<div class="srch-wrap srch-wrap--light" style="border-radius: {showSuggestDropdown ? '10px 10px 0 0' : '999px'}; border-bottom-color: {showSuggestDropdown ? 'transparent' : 'var(--dbd)'};">
					<svg class="srch-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<input
						class="srch-input srch-input--light"
						type="text"
						placeholder="Start typing…"
						bind:value={suggestQuery}
						onfocus={() => suggestFocused = true}
						onblur={() => setTimeout(() => suggestFocused = false, 150)}
						aria-label="Typeahead search"
						aria-autocomplete="list"
					/>
					{#if suggestQuery}
						<button class="srch-clear srch-clear--light" onclick={() => { suggestQuery = ''; suggestFocused = false; }} aria-label="Clear">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					{/if}
				</div>
				{#if showSuggestDropdown}
					<div class="suggest-dropdown" role="listbox">
						{#each suggestions as s}
							<button
								class="suggest-item"
								role="option"
								aria-selected="false"
								onclick={() => { suggestQuery = s; suggestFocused = false; }}
							>
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: var(--dt4); flex-shrink: 0;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
								</svg>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								<span class="suggest-item-text">{@html highlightMatch(s, suggestQuery)}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 8. In Context: Search Page ────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Search Page</h3>
		<p class="ds-card__sub">Full search page with sticky bar, trending topics when empty, live filtered results, and category tabs.</p>
		<div class="ds-demo" style="padding: 0;">
			<div class="pg-search-page">
				<!-- Sticky bar -->
				<div class="pg-topbar">
					<div class="pg-srch-row">
						<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: var(--dt3); flex-shrink: 0;">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
						</svg>
						<input
							class="pg-srch-input"
							type="text"
							placeholder="Search your workspace…"
							bind:value={pageQuery}
							aria-label="Workspace search"
						/>
						{#if pageQuery}
							<button class="pg-srch-clear" onclick={() => pageQuery = ''} aria-label="Clear">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
							</button>
						{/if}
					</div>
					<!-- Category tabs (shown when query active) -->
					{#if pageQuery}
						<div class="pg-tabs" role="tablist">
							{#each pageTabs as tab}
								<button
									class="pg-tab"
									class:pg-tab--active={pageTab === tab}
									role="tab"
									aria-selected={pageTab === tab}
									onclick={() => pageTab = tab}
								>
									{tab}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Body -->
				<div class="pg-body">
					{#if !pageQuery}
						<!-- Trending section -->
						<div class="pg-trending">
							<p class="pg-trending-label">Trending in your workspace</p>
							<div class="pg-trending-list">
								{#each trending as t, i}
									<button class="pg-trending-item" onclick={() => pageQuery = t}>
										<span class="pg-trending-rank">{i + 1}</span>
										<span class="pg-trending-text">{t}</span>
										<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: var(--dt4); flex-shrink: 0;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
									</button>
								{/each}
							</div>
						</div>
					{:else if filteredPageResults.length > 0}
						<!-- Results -->
						<div class="pg-results" role="tabpanel">
							{#each filteredPageResults as r}
								<div class="pg-result-card">
									<span class="pg-result-icon">
										{#if r.icon === 'page'}
											<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
										{:else if r.icon === 'user'}
											<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
										{:else}
											<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
										{/if}
									</span>
									<div class="pg-result-body">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										<span class="pg-result-title">{@html highlightMatch(r.title, pageQuery)}</span>
										<span class="pg-result-desc">{r.desc}</span>
									</div>
									<div class="pg-result-right">
										<span class="pg-result-cat">{r.cat}</span>
										<span class="pg-result-time">{r.time}</span>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<!-- Empty state within page -->
						<div class="pg-empty">
							<svg width="36" height="36" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: var(--dt4);">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
							</svg>
							<p class="pg-empty-title">No results for "{pageQuery}"</p>
							<p class="pg-empty-sub">Try different keywords or broaden your search</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  SHARED: pill button                                          */
	/* ══════════════════════════════════════════════════════════════ */
	.btn-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 999px;
		border: none;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		font-family: inherit;
		transition: opacity 0.12s, transform 0.12s;
	}
	.btn-pill:active { transform: scale(0.97); }
	.btn-pill-primary {
		background: var(--dt);
		color: #fff;
	}
	:global(.dark) .btn-pill-primary {
		background: #fff;
		color: #111;
	}
	.btn-pill-primary:hover { opacity: 0.88; }

	/* ══════════════════════════════════════════════════════════════ */
	/*  1. BASIC SEARCH INPUT                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.srch-wrap {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 14px;
		height: 40px;
		border-radius: 999px;
		width: 100%;
		max-width: 380px;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.srch-wrap--light {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
	}
	.srch-wrap--light:focus-within {
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px var(--dbg3);
	}
	.srch-wrap--dark {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.09);
	}
	.srch-wrap--dark:focus-within {
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
	}
	.srch-icon {
		flex-shrink: 0;
		color: var(--dt3);
	}
	.srch-icon--dark {
		color: rgba(255, 255, 255, 0.3);
	}
	.srch-input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 13px;
		font-family: inherit;
		min-width: 0;
	}
	.srch-input--light {
		color: var(--dt);
	}
	.srch-input--light::placeholder { color: var(--dt3); }
	.srch-input--dark {
		color: rgba(255, 255, 255, 0.85);
		caret-color: rgba(255, 255, 255, 0.7);
	}
	.srch-input--dark::placeholder { color: rgba(255, 255, 255, 0.25); }
	.srch-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.1s;
	}
	.srch-clear--light {
		background: var(--dbd);
		color: var(--dt2);
	}
	.srch-clear--light:hover {
		background: var(--dbd2);
		color: var(--dt);
	}
	.srch-clear--dark {
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.4);
	}
	.srch-clear--dark:hover {
		background: rgba(255, 255, 255, 0.18);
		color: rgba(255, 255, 255, 0.7);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  2. RECENT SEARCHES                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.recnt-panel {
		width: 100%;
		max-width: 420px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
	}
	.recnt-search-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 14px;
		height: 44px;
		border-bottom: 1px solid var(--dbd);
	}
	.recnt-input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 13px;
		color: var(--dt);
		font-family: inherit;
		min-width: 0;
	}
	.recnt-input::placeholder { color: var(--dt3); }
	.recnt-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: none;
		background: var(--dbd);
		color: var(--dt2);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.1s;
	}
	.recnt-clear:hover { background: var(--dbd2); }
	.recnt-section { padding: 8px; }
	.recnt-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 8px 4px;
	}
	.recnt-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt4);
	}
	.recnt-clear-all {
		font-size: 11px;
		color: var(--dt3);
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		padding: 0;
		transition: color 0.12s;
	}
	.recnt-clear-all:hover { color: var(--dt); }
	.recnt-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 8px;
		border-radius: 7px;
		transition: background 0.1s;
	}
	.recnt-item:hover { background: var(--dbg2); }
	.recnt-item-text {
		flex: 1;
		font-size: 13px;
		color: var(--dt2);
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.recnt-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: none;
		background: transparent;
		color: var(--dt4);
		cursor: pointer;
		flex-shrink: 0;
		opacity: 0;
		transition: background 0.1s, opacity 0.1s, color 0.1s;
	}
	.recnt-item:hover .recnt-remove { opacity: 1; }
	.recnt-remove:hover {
		background: var(--dbd);
		color: var(--dt2);
	}
	.recnt-empty-recents {
		padding: 16px 8px;
		font-size: 13px;
		color: var(--dt3);
		text-align: center;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  3. RESULTS LIST                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.res-list {
		width: 100%;
		max-width: 520px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}
	.res-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.1s;
		cursor: pointer;
	}
	.res-item:last-child { border-bottom: none; }
	.res-item:hover { background: var(--dbg2); }
	.res-item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		flex-shrink: 0;
	}
	.res-item-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}
	.res-item-title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/* Highlight matched text */
	.res-item-title :global(mark) {
		background: transparent;
		font-weight: 700;
		color: var(--dt);
	}
	.suggest-item-text :global(mark) {
		background: transparent;
		font-weight: 700;
		color: var(--dt);
	}
	.pg-result-title :global(mark) {
		background: transparent;
		font-weight: 700;
		color: var(--dt);
	}
	.res-item-desc {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.res-item-cat {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 4px;
		padding: 2px 6px;
		flex-shrink: 0;
	}
	.res-no-results {
		font-size: 13px;
		color: var(--dt3);
		padding: 4px 0;
		margin: 0;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  4. FILTER PILLS                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.flt-pills {
		display: flex;
		gap: 6px;
		overflow-x: auto;
		padding-bottom: 2px;
		max-width: 520px;
		scrollbar-width: none;
	}
	.flt-pills::-webkit-scrollbar { display: none; }
	.flt-pill {
		display: inline-flex;
		align-items: center;
		padding: 5px 14px;
		border-radius: 999px;
		border: 1px solid var(--dbd);
		background: transparent;
		color: var(--dt2);
		font-size: 12px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		white-space: nowrap;
		flex-shrink: 0;
		transition: all 0.12s;
	}
	.flt-pill:hover {
		background: var(--dbg2);
		color: var(--dt);
	}
	.flt-pill--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}
	:global(.dark) .flt-pill--active {
		background: #fff;
		color: #111;
		border-color: #fff;
	}
	.flt-results {
		width: 100%;
		max-width: 520px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}
	.flt-result-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd);
		cursor: pointer;
		transition: background 0.1s;
	}
	.flt-result-item:last-child { border-bottom: none; }
	.flt-result-item:hover { background: var(--dbg2); }
	.flt-result-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		flex-shrink: 0;
	}
	.flt-result-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}
	.flt-result-title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}
	.flt-result-meta {
		font-size: 12px;
		color: var(--dt3);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  5. EMPTY STATE                                               */
	/* ══════════════════════════════════════════════════════════════ */
	.empty-state-panel {
		width: 100%;
		max-width: 480px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 32px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		text-align: center;
		background: var(--dbg);
	}
	.empty-state-illus {
		position: relative;
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		color: var(--dt4);
		margin-bottom: 4px;
	}
	.empty-state-x {
		position: absolute;
		bottom: -4px;
		right: -4px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt3);
	}
	.empty-state-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
	}
	.empty-state-query { color: var(--dt2); }
	.empty-state-sub {
		font-size: 12px;
		color: var(--dt3);
		margin: 0;
	}
	.empty-state-suggestions {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 4px;
	}
	.empty-state-tip-label {
		font-size: 12px;
		color: var(--dt4);
	}
	.empty-state-tag {
		font-size: 12px;
		color: var(--dt2);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 999px;
		padding: 3px 10px;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.12s;
	}
	.empty-state-tag:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  6. TYPEAHEAD SUGGESTIONS                                     */
	/* ══════════════════════════════════════════════════════════════ */
	.suggest-wrap {
		position: relative;
	}
	.suggest-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 100;
		background: var(--dbg);
		border: 1px solid var(--dbd2);
		border-top: none;
		border-radius: 0 0 10px 10px;
		overflow: hidden;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}
	:global(.dark) .suggest-dropdown {
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
	}
	.suggest-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 9px 14px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.1s;
	}
	.suggest-item:last-child { border-bottom: none; }
	.suggest-item:hover { background: var(--dbg2); }
	.suggest-item-text {
		font-size: 13px;
		color: var(--dt2);
		flex: 1;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  8. IN-CONTEXT SEARCH PAGE                                    */
	/* ══════════════════════════════════════════════════════════════ */
	.pg-search-page {
		width: 100%;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
		min-height: 320px;
	}
	.pg-topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--dbg);
		border-bottom: 1px solid var(--dbd);
	}
	.pg-srch-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
	}
	.pg-srch-input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 14px;
		color: var(--dt);
		font-family: inherit;
		min-width: 0;
	}
	.pg-srch-input::placeholder { color: var(--dt3); }
	.pg-srch-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: none;
		background: var(--dbg3);
		color: var(--dt3);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.1s, color 0.1s;
	}
	.pg-srch-clear:hover { background: var(--dbd); color: var(--dt); }
	.pg-tabs {
		display: flex;
		gap: 0;
		padding: 0 12px;
		border-top: 1px solid var(--dbd);
	}
	.pg-tab {
		padding: 8px 14px;
		border: none;
		background: transparent;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		cursor: pointer;
		font-family: inherit;
		position: relative;
		transition: color 0.12s;
	}
	.pg-tab:hover { color: var(--dt2); }
	.pg-tab--active {
		color: var(--dt);
	}
	.pg-tab--active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 14px;
		right: 14px;
		height: 2px;
		background: var(--dt);
		border-radius: 1px 1px 0 0;
	}
	.pg-body { padding: 16px; }
	/* Trending */
	.pg-trending-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt4);
		margin: 0 0 10px;
	}
	.pg-trending-list {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.pg-trending-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 9px 10px;
		border-radius: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background 0.1s;
	}
	.pg-trending-item:hover { background: var(--dbg2); }
	.pg-trending-rank {
		font-size: 11px;
		font-weight: 700;
		color: var(--dt4);
		width: 16px;
		text-align: center;
		flex-shrink: 0;
	}
	.pg-trending-text {
		flex: 1;
		font-size: 13px;
		color: var(--dt2);
	}
	/* Results */
	.pg-results {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.pg-result-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.1s;
	}
	.pg-result-card:hover { background: var(--dbg2); }
	.pg-result-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		flex-shrink: 0;
	}
	.pg-result-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}
	.pg-result-title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pg-result-desc {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pg-result-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 3px;
		flex-shrink: 0;
	}
	.pg-result-cat {
		font-size: 10px;
		font-weight: 600;
		color: var(--dt4);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 3px;
		padding: 1px 5px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.pg-result-time {
		font-size: 11px;
		color: var(--dt4);
	}
	/* Empty within page */
	.pg-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 40px 24px;
		text-align: center;
	}
	.pg-empty-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt2);
		margin: 0;
	}
	.pg-empty-sub {
		font-size: 12px;
		color: var(--dt3);
		margin: 0;
	}
</style>
