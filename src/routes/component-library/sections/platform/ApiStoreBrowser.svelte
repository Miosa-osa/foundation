<script lang="ts">
	// ── Types ──────────────────────────────────────────────────────
	type ApiCategory =
		| 'LLM'
		| 'Video Generation'
		| 'Image'
		| 'Audio'
		| 'Food & Beverage'
		| 'Music'
		| 'Entertainment'
		| 'Lifestyle'
		| 'Data';

	interface ApiService {
		id: string;
		icon: string;
		iconBg: string;
		name: string;
		description: string;
		category: ApiCategory;
	}

	// ── API list data ───────────────────────────────────────────────
	const apiServices: ApiService[] = [
		{
			id: 'sora',
			icon: '▶',
			iconBg: '#1a1a2e',
			name: 'Sora',
			description: 'OpenAI text-to-video generation with cinematic quality output',
			category: 'Video Generation',
		},
		{
			id: 'gpt4o',
			icon: 'sparkle',
			iconBg: '#10a37f',
			name: 'GPT-4o',
			description: 'Multimodal large language model with vision, text and audio',
			category: 'LLM',
		},
		{
			id: 'claude',
			icon: '◆',
			iconBg: '#d97706',
			name: 'Claude 3.5',
			description: 'Anthropic intelligent assistant for analysis, writing and code',
			category: 'LLM',
		},
		{
			id: 'gemini',
			icon: '◉',
			iconBg: '#4285f4',
			name: 'Gemini Pro',
			description: 'Google multimodal model with long context and reasoning',
			category: 'LLM',
		},
		{
			id: 'udio',
			icon: 'music',
			iconBg: '#7c3aed',
			name: 'Udio',
			description: 'AI music generation from text prompts with genre control',
			category: 'Music',
		},
		{
			id: 'dalle',
			icon: '◈',
			iconBg: '#ec4899',
			name: 'DALL·E 3',
			description: 'High-fidelity image generation and editing from natural language',
			category: 'Image',
		},
		{
			id: 'elevenlabs',
			icon: '◎',
			iconBg: '#f59e0b',
			name: 'ElevenLabs',
			description: 'Realistic text-to-speech and voice cloning with emotion',
			category: 'Audio',
		},
		{
			id: 'yelp',
			icon: 'utensils',
			iconBg: '#ef4444',
			name: 'Yelp Fusion',
			description: 'Local business search, restaurant data and reviews API',
			category: 'Food & Beverage',
		},
		{
			id: 'ticketmaster',
			icon: 'ticket',
			iconBg: '#0ea5e9',
			name: 'Ticketmaster',
			description: 'Event discovery, venue data and ticket availability lookup',
			category: 'Entertainment',
		},
		{
			id: 'strava',
			icon: '◑',
			iconBg: '#f97316',
			name: 'Strava',
			description: 'Fitness activity tracking, routes and athlete performance data',
			category: 'Lifestyle',
		},
		{
			id: 'serpapi',
			icon: '⊕',
			iconBg: '#22c55e',
			name: 'SerpAPI',
			description: 'Real-time search engine results parsing and structured data',
			category: 'Data',
		},
		{
			id: 'midjourney',
			icon: '◧',
			iconBg: '#8b5cf6',
			name: 'Midjourney',
			description: 'Artistic image generation with unique stylistic aesthetic output',
			category: 'Image',
		},
	];

	// ── Category filter ─────────────────────────────────────────────
	const filterTabs: (ApiCategory | 'All')[] = [
		'All',
		'LLM',
		'Video Generation',
		'Image',
		'Audio',
		'Music',
		'Data',
		'Food & Beverage',
		'Entertainment',
		'Lifestyle',
	];

	let activeFilter = $state<ApiCategory | 'All'>('All');

	let filteredServices = $derived(
		activeFilter === 'All'
			? apiServices
			: apiServices.filter((s) => s.category === activeFilter)
	);

	// ── Detail panel ────────────────────────────────────────────────
	let selectedApi = $state<ApiService | null>(null);

	function selectApi(service: ApiService) {
		selectedApi = selectedApi?.id === service.id ? null : service;
	}

	// ── Mention picker ──────────────────────────────────────────────
	let mentionOpen = $state(false);
	let mentionQuery = $state('');

	function toggleMention() {
		mentionOpen = !mentionOpen;
		if (mentionOpen) mentionQuery = '';
	}

	// ── Category badge colors ───────────────────────────────────────
	const categoryColors: Record<ApiCategory, { bg: string; text: string }> = {
		LLM:               { bg: 'rgba(99,102,241,0.15)',  text: '#818cf8' },
		'Video Generation': { bg: 'rgba(236,72,153,0.15)', text: '#f472b6' },
		Image:             { bg: 'rgba(139,92,246,0.15)',  text: '#a78bfa' },
		Audio:             { bg: 'rgba(245,158,11,0.15)',  text: '#fbbf24' },
		'Food & Beverage': { bg: 'rgba(239,68,68,0.15)',   text: '#f87171' },
		Music:             { bg: 'rgba(124,58,237,0.15)',  text: '#c084fc' },
		Entertainment:     { bg: 'rgba(14,165,233,0.15)',  text: '#38bdf8' },
		Lifestyle:         { bg: 'rgba(249,115,22,0.15)',  text: '#fb923c' },
		Data:              { bg: 'rgba(34,197,94,0.15)',   text: '#4ade80' },
	};

	function catStyle(cat: ApiCategory): string {
		const c = categoryColors[cat];
		return `background:${c.bg};color:${c.text};`;
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">API Store &amp; Service Browser</h2>
	<p class="ds-subtitle">
		Service catalogs, API lists with category tags, mention pickers, and endpoint documentation cards.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 1. Category Filter Bar                                                  -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Category Filter Bar</h3>
		<p class="ds-card__sub">Horizontally scrollable filter chips for narrowing service categories.</p>

		<div class="ab-filter-bar" role="tablist" aria-label="Filter by category">
			{#each filterTabs as tab}
				<button
					class="ab-filter-chip"
					class:ab-filter-chip--active={activeFilter === tab}
					role="tab"
					aria-selected={activeFilter === tab}
					onclick={() => (activeFilter = tab as ApiCategory | 'All')}
				>
					{tab}
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 2. API List + Detail Panel                                              -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">API List</h3>
		<p class="ds-card__sub">Scrollable service catalog with icon, name, description, and category badge. Click an item to expand its endpoint detail card.</p>

		<div class="ab-browser">
			<!-- List column -->
			<div class="ab-list-col">
				<div class="ab-list-header">
					<span class="ab-list-header__label">Services</span>
					<span class="ab-list-header__count">{filteredServices.length}</span>
				</div>

				<div class="ab-list-scroll" role="listbox" aria-label="API services">
					{#each filteredServices as service (service.id)}
						<button
							class="ab-list-item"
							class:ab-list-item--selected={selectedApi?.id === service.id}
							role="option"
							aria-selected={selectedApi?.id === service.id}
							onclick={() => selectApi(service)}
						>
							<span
								class="ab-list-item__icon"
								style="background:{service.iconBg};"
								aria-hidden="true"
							>
									{#if service.icon === 'music'}
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
									{:else if service.icon === 'utensils'}
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>
									{:else if service.icon === 'ticket'}
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 12h20"/></svg>
																										{:else if service.icon === 'sparkle'}
																											<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/></svg>
{:else}
										{service.icon}
									{/if}
								</span>

							<span class="ab-list-item__body">
								<span class="ab-list-item__name">{service.name}</span>
								<span class="ab-list-item__desc">{service.description}</span>
							</span>

							<span
								class="ab-badge"
								style={catStyle(service.category)}
								aria-label="Category: {service.category}"
							>{service.category}</span>
						</button>
					{:else}
						<div class="ab-list-empty">No services match this filter.</div>
					{/each}
				</div>

				<!-- API Store link button -->
				<div class="ab-list-footer">
					<a class="ab-store-btn" href="#api-store" role="button" aria-label="Open APIs Store">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
						</svg>
						APIs Store
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
							<path d="M7 17L17 7M17 7H7M17 7v10"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Detail panel column -->
			<div class="ab-detail-col">
				{#if selectedApi}
					<div class="ab-detail-card">
						<div class="ab-detail-header">
							<span
								class="ab-detail-icon"
								style="background:{selectedApi.iconBg};"
								aria-hidden="true"
							>
									{#if selectedApi.icon === 'music'}
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
									{:else if selectedApi.icon === 'utensils'}
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>
									{:else if selectedApi.icon === 'ticket'}
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 12h20"/></svg>
																										{:else if selectedApi.icon === 'sparkle'}
																											<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/></svg>
{:else}
										{selectedApi.icon}
									{/if}
								</span>
							<div class="ab-detail-title-group">
								<h4 class="ab-detail-name">{selectedApi.name}</h4>
								<span
									class="ab-badge"
									style={catStyle(selectedApi.category)}
								>{selectedApi.category}</span>
							</div>
						</div>

						<p class="ab-detail-desc">{selectedApi.description}</p>

						<div class="ab-endpoint-block">
							<div class="ab-endpoint-label">Endpoint</div>
							<div class="ab-endpoint-row">
								<span class="ab-method ab-method--post">POST</span>
								<code class="ab-endpoint-path">/service/{selectedApi.id}/generate</code>
							</div>
						</div>

						<div class="ab-params-block">
							<div class="ab-params-label">Parameters</div>
							<div class="ab-param-row">
								<span class="ab-param-name">prompt</span>
								<span class="ab-param-type">string</span>
								<span class="ab-param-req">required</span>
							</div>
							<div class="ab-param-row">
								<span class="ab-param-name">aspect_ratio</span>
								<span class="ab-param-type">string</span>
								<span class="ab-param-opt">optional</span>
							</div>
							<div class="ab-param-row">
								<span class="ab-param-name">duration</span>
								<span class="ab-param-type">number</span>
								<span class="ab-param-opt">optional</span>
							</div>
							<div class="ab-param-row">
								<span class="ab-param-name">quality</span>
								<span class="ab-param-type">enum</span>
								<span class="ab-param-opt">optional</span>
							</div>
						</div>

						<div class="ab-returns-block">
							<div class="ab-returns-label">Returns</div>
							<div class="ab-returns-row">
								<span class="ab-param-name">result_url</span>
								<span class="ab-param-type">string</span>
							</div>
							<div class="ab-returns-row">
								<span class="ab-param-name">job_id</span>
								<span class="ab-param-type">string</span>
							</div>
							<div class="ab-returns-row">
								<span class="ab-param-name">status</span>
								<span class="ab-param-type">enum</span>
							</div>
						</div>

						<div class="ab-detail-actions">
							<button class="ab-action-btn ab-action-btn--primary" aria-label="Add {selectedApi.name} to workspace">
								Add to workspace
							</button>
							<button class="ab-action-btn ab-action-btn--ghost" aria-label="View {selectedApi.name} documentation">
								View docs
							</button>
						</div>
					</div>
				{:else}
					<div class="ab-detail-empty">
						<div class="ab-detail-empty__icon" aria-hidden="true">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
						</div>
						<p class="ab-detail-empty__text">Select a service to view endpoint details</p>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 3. Mention Picker Dropdown                                              -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Mention Picker</h3>
		<p class="ds-card__sub">Dropdown triggered by typing @ in a chat input. Allows referencing files, APIs, and apps inline.</p>

		<div class="ab-mention-demo">
			<div class="ab-mention-input-wrap">
				<div class="ab-mention-input" role="textbox" aria-label="Chat input" aria-multiline="true">
					<span class="ab-mention-text">Ask anything</span>
					<button
						class="ab-mention-trigger"
						class:ab-mention-trigger--active={mentionOpen}
						onclick={toggleMention}
						aria-label="Open mention picker"
						aria-expanded={mentionOpen}
						aria-haspopup="listbox"
					>@</button>
				</div>

				{#if mentionOpen}
					<div class="ab-mention-dropdown" role="listbox" aria-label="Mention options">
						<div class="ab-mention-search-row">
							<svg class="ab-mention-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
								<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
							</svg>
							<input
								class="ab-mention-search"
								type="text"
								placeholder="Search..."
								bind:value={mentionQuery}
								aria-label="Search mentions"
							/>
						</div>

						<div class="ab-mention-section-label">Attach</div>

						<button class="ab-mention-item" role="option" aria-selected="false">
							<span class="ab-mention-item__icon ab-mention-item__icon--folder" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
								</svg>
							</span>
							<span class="ab-mention-item__body">
								<span class="ab-mention-item__name">Files &amp; Folders</span>
								<span class="ab-mention-item__sub">Attach documents from your workspace</span>
							</span>
							<svg class="ab-mention-item__chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
								<path d="M9 18l6-6-6-6"/>
							</svg>
						</button>

						<button class="ab-mention-item" role="option" aria-selected="false">
							<span class="ab-mention-item__icon ab-mention-item__icon--api" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
								</svg>
							</span>
							<span class="ab-mention-item__body">
								<span class="ab-mention-item__name">APIs</span>
								<span class="ab-mention-item__sub">Connect to external service endpoints</span>
							</span>
							<svg class="ab-mention-item__chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
								<path d="M9 18l6-6-6-6"/>
							</svg>
						</button>

						<button class="ab-mention-item" role="option" aria-selected="false">
							<span class="ab-mention-item__icon ab-mention-item__icon--app" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
								</svg>
							</span>
							<span class="ab-mention-item__body">
								<span class="ab-mention-item__name">App</span>
								<span class="ab-mention-item__sub">Reference your integrated applications</span>
							</span>
							<svg class="ab-mention-item__chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
								<path d="M9 18l6-6-6-6"/>
							</svg>
						</button>

						<div class="ab-mention-divider" role="separator"></div>

						<div class="ab-mention-section-label">Recent APIs</div>

						{#each apiServices.slice(0, 3) as svc}
							<button class="ab-mention-item ab-mention-item--compact" role="option" aria-selected="false">
								<span
									class="ab-mention-item__svc-icon"
									style="background:{svc.iconBg};"
									aria-hidden="true"
								>
										{#if svc.icon === 'music'}
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
										{:else if svc.icon === 'utensils'}
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>
										{:else if svc.icon === 'ticket'}
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 12h20"/></svg>
																													{:else if svc.icon === 'sparkle'}
																														<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/></svg>
{:else}
											{svc.icon}
										{/if}
									</span>
								<span class="ab-mention-item__name">{svc.name}</span>
								<span class="ab-badge ab-badge--xs" style={catStyle(svc.category)}>{svc.category}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 4. Standalone Service Detail Card                                       -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Service Detail Card</h3>
		<p class="ds-card__sub">Full endpoint documentation card showing method, path, parameters, and return types.</p>

		<div class="ab-standalone-detail">
			<div class="ab-detail-card">
				<div class="ab-detail-header">
					<span class="ab-detail-icon" style="background:#1a1a2e;" aria-hidden="true">▶</span>
					<div class="ab-detail-title-group">
						<h4 class="ab-detail-name">Sora</h4>
						<span class="ab-badge" style={catStyle('Video Generation')}>Video Generation</span>
					</div>
				</div>

				<p class="ab-detail-desc">
					OpenAI's state-of-the-art text-to-video model. Generate cinematic-quality videos up to
					60 seconds from natural language descriptions with precise camera control.
				</p>

				<div class="ab-endpoint-block">
					<div class="ab-endpoint-label">Endpoint</div>
					<div class="ab-endpoint-row">
						<span class="ab-method ab-method--post">POST</span>
						<code class="ab-endpoint-path">/service/sora_2_text_to_video/generate</code>
					</div>
				</div>

				<div class="ab-params-block">
					<div class="ab-params-label">Parameters</div>
					<div class="ab-param-row">
						<span class="ab-param-name">prompt</span>
						<span class="ab-param-type">string</span>
						<span class="ab-param-req">required</span>
						<span class="ab-param-hint">Text description of the video to generate</span>
					</div>
					<div class="ab-param-row">
						<span class="ab-param-name">aspect_ratio</span>
						<span class="ab-param-type">enum</span>
						<span class="ab-param-opt">optional</span>
						<span class="ab-param-hint">16:9, 9:16, 1:1 — defaults to 16:9</span>
					</div>
					<div class="ab-param-row">
						<span class="ab-param-name">duration</span>
						<span class="ab-param-type">number</span>
						<span class="ab-param-opt">optional</span>
						<span class="ab-param-hint">Video length in seconds (5–60)</span>
					</div>
					<div class="ab-param-row">
						<span class="ab-param-name">resolution</span>
						<span class="ab-param-type">string</span>
						<span class="ab-param-opt">optional</span>
						<span class="ab-param-hint">480p, 720p, 1080p — defaults to 720p</span>
					</div>
				</div>

				<div class="ab-returns-block">
					<div class="ab-returns-label">Returns</div>
					<div class="ab-returns-row">
						<span class="ab-param-name">video_url</span>
						<span class="ab-param-type">string</span>
						<span class="ab-param-hint">Signed URL to the generated video asset</span>
					</div>
					<div class="ab-returns-row">
						<span class="ab-param-name">job_id</span>
						<span class="ab-param-type">string</span>
						<span class="ab-param-hint">Unique identifier for polling job status</span>
					</div>
					<div class="ab-returns-row">
						<span class="ab-param-name">status</span>
						<span class="ab-param-type">enum</span>
						<span class="ab-param-hint">pending, processing, complete, failed</span>
					</div>
				</div>

				<div class="ab-detail-actions">
					<button class="ab-action-btn ab-action-btn--primary" aria-label="Add Sora to workspace">
						Add to workspace
					</button>
					<button class="ab-action-btn ab-action-btn--ghost" aria-label="View Sora documentation">
						View docs
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Layout tokens ─────────────────────────────────────────── */
	/* --dt  : primary text       --dbg : primary background       */
	/* --dt3 : tertiary text      --dbd : border/divider           */
	/* --dbg2: secondary bg       --dbd2: hover border             */

	/* ── Filter bar ───────────────────────────────────────────── */
	.ab-filter-bar {
		display: flex;
		gap: 6px;
		overflow-x: auto;
		padding-bottom: 2px;
		scrollbar-width: none;
	}
	.ab-filter-bar::-webkit-scrollbar { display: none; }

	.ab-filter-chip {
		flex-shrink: 0;
		padding: 5px 14px;
		border-radius: 999px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		background: var(--dbg, #fff);
		color: var(--dt3, #666);
		font-size: 12px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: background 0.12s, color 0.12s, border-color 0.12s;
		white-space: nowrap;
	}
	.ab-filter-chip:hover {
		border-color: var(--dbd2, rgba(0,0,0,0.2));
		color: var(--dt, #111);
		background: var(--dbg2, rgba(0,0,0,0.03));
	}
	.ab-filter-chip--active {
		background: var(--dt, #111);
		color: var(--dbg, #fff);
		border-color: var(--dt, #111);
	}
	:global(.dark) .ab-filter-chip--active {
		background: #fff;
		color: #111;
		border-color: #fff;
	}

	/* ── Browser layout ───────────────────────────────────────── */
	.ab-browser {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: start;
	}
	@media (max-width: 720px) {
		.ab-browser { grid-template-columns: 1fr; }
	}

	/* ── List column ──────────────────────────────────────────── */
	.ab-list-col {
		border: 1px solid var(--dbd, rgba(0,0,0,0.08));
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg, #fff);
	}
	:global(.dark) .ab-list-col {
		background: rgba(255,255,255,0.03);
		border-color: rgba(255,255,255,0.08);
	}

	.ab-list-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}
	:global(.dark) .ab-list-header {
		border-bottom-color: rgba(255,255,255,0.06);
	}
	.ab-list-header__label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt3, #888);
	}
	.ab-list-header__count {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3, #aaa);
		background: var(--dbg2, rgba(0,0,0,0.05));
		padding: 1px 7px;
		border-radius: 999px;
	}
	:global(.dark) .ab-list-header__count {
		background: rgba(255,255,255,0.07);
	}

	.ab-list-scroll {
		max-height: 340px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(0,0,0,0.12) transparent;
	}
	:global(.dark) .ab-list-scroll {
		scrollbar-color: rgba(255,255,255,0.1) transparent;
	}

	.ab-list-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 10px 14px;
		border: none;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.04));
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: background 0.1s;
		font-family: inherit;
	}
	.ab-list-item:last-child { border-bottom: none; }
	.ab-list-item:hover {
		background: var(--dbg2, rgba(0,0,0,0.03));
	}
	.ab-list-item--selected {
		background: rgba(59,130,246,0.07);
	}
	:global(.dark) .ab-list-item--selected {
		background: rgba(59,130,246,0.12);
	}
	:global(.dark) .ab-list-item:hover {
		background: rgba(255,255,255,0.04);
	}
	:global(.dark) .ab-list-item {
		border-bottom-color: rgba(255,255,255,0.04);
	}

	.ab-list-item__icon {
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #fff;
	}

	.ab-list-item__body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.ab-list-item__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #111);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	:global(.dark) .ab-list-item__name { color: #e5e5e5; }

	.ab-list-item__desc {
		font-size: 11.5px;
		color: var(--dt3, #888);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ab-list-empty {
		padding: 28px 14px;
		text-align: center;
		font-size: 13px;
		color: var(--dt3, #aaa);
	}

	/* ── API Store button ─────────────────────────────────────── */
	.ab-list-footer {
		padding: 10px 14px;
		border-top: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}
	:global(.dark) .ab-list-footer {
		border-top-color: rgba(255,255,255,0.06);
	}

	.ab-store-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		width: 100%;
		padding: 8px 14px;
		border-radius: 8px;
		background: #3b82f6;
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		font-family: inherit;
		text-decoration: none;
		transition: background 0.12s, transform 0.1s;
		cursor: pointer;
	}
	.ab-store-btn:hover {
		background: #2563eb;
		transform: translateY(-1px);
	}
	.ab-store-btn:active { transform: translateY(0); }

	/* ── Detail column ────────────────────────────────────────── */
	.ab-detail-col {
		min-height: 200px;
	}

	.ab-detail-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 48px 24px;
		border: 1px dashed var(--dbd, rgba(0,0,0,0.12));
		border-radius: 12px;
		height: 100%;
	}
	:global(.dark) .ab-detail-empty {
		border-color: rgba(255,255,255,0.1);
	}
	.ab-detail-empty__icon {
		color: var(--dt3, #ccc);
		opacity: 0.5;
	}
	.ab-detail-empty__text {
		font-size: 13px;
		color: var(--dt3, #aaa);
		text-align: center;
	}

	/* ── Detail card ──────────────────────────────────────────── */
	.ab-detail-card {
		border: 1px solid var(--dbd, rgba(0,0,0,0.08));
		border-radius: 12px;
		background: var(--dbg, #fff);
		overflow: hidden;
	}
	:global(.dark) .ab-detail-card {
		background: rgba(255,255,255,0.03);
		border-color: rgba(255,255,255,0.08);
	}

	.ab-detail-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 16px 12px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}
	:global(.dark) .ab-detail-header {
		border-bottom-color: rgba(255,255,255,0.06);
	}

	.ab-detail-icon {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: #fff;
	}

	.ab-detail-title-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.ab-detail-name {
		font-size: 15px;
		font-weight: 700;
		color: var(--dt, #111);
		margin: 0;
	}
	:global(.dark) .ab-detail-name { color: #e5e5e5; }

	.ab-detail-desc {
		margin: 0;
		padding: 12px 16px;
		font-size: 12.5px;
		line-height: 1.6;
		color: var(--dt3, #666);
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}
	:global(.dark) .ab-detail-desc {
		color: #999;
		border-bottom-color: rgba(255,255,255,0.06);
	}

	/* ── Endpoint block ───────────────────────────────────────── */
	.ab-endpoint-block,
	.ab-params-block,
	.ab-returns-block {
		padding: 12px 16px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}
	:global(.dark) .ab-endpoint-block,
	:global(.dark) .ab-params-block,
	:global(.dark) .ab-returns-block {
		border-bottom-color: rgba(255,255,255,0.06);
	}

	.ab-endpoint-label,
	.ab-params-label,
	.ab-returns-label {
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt3, #aaa);
		margin-bottom: 8px;
	}

	.ab-endpoint-row {
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--dbg2, rgba(0,0,0,0.03));
		border: 1px solid var(--dbd, rgba(0,0,0,0.07));
		border-radius: 7px;
		padding: 7px 10px;
		overflow: hidden;
	}
	:global(.dark) .ab-endpoint-row {
		background: rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.07);
	}

	.ab-method {
		flex-shrink: 0;
		padding: 2px 7px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.04em;
	}
	.ab-method--post {
		background: rgba(16,185,129,0.15);
		color: #10b981;
	}
	/* .ab-method--get used for GET endpoints — kept for future use */
	/* background: rgba(59,130,246,0.15); color: #3b82f6; */

	.ab-endpoint-path {
		font-family: 'JetBrains Mono', 'Fira Code', 'Menlo', monospace;
		font-size: 11px;
		color: var(--dt, #333);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	:global(.dark) .ab-endpoint-path { color: #ccc; }

	/* ── Params / returns rows ────────────────────────────────── */
	.ab-param-row,
	.ab-returns-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 5px 0;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.04));
		flex-wrap: wrap;
	}
	.ab-param-row:last-child,
	.ab-returns-row:last-child { border-bottom: none; }
	:global(.dark) .ab-param-row,
	:global(.dark) .ab-returns-row {
		border-bottom-color: rgba(255,255,255,0.04);
	}

	.ab-param-name {
		font-family: 'JetBrains Mono', 'Fira Code', 'Menlo', monospace;
		font-size: 11.5px;
		font-weight: 600;
		color: var(--dt, #222);
		min-width: 100px;
	}
	:global(.dark) .ab-param-name { color: #ddd; }

	.ab-param-type {
		font-family: 'JetBrains Mono', 'Fira Code', 'Menlo', monospace;
		font-size: 10.5px;
		color: #8b5cf6;
		background: rgba(139,92,246,0.1);
		padding: 1px 6px;
		border-radius: 4px;
	}

	.ab-param-req {
		font-size: 10px;
		font-weight: 700;
		color: #ef4444;
		background: rgba(239,68,68,0.1);
		padding: 1px 6px;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.ab-param-opt {
		font-size: 10px;
		font-weight: 600;
		color: var(--dt3, #aaa);
		background: var(--dbg2, rgba(0,0,0,0.05));
		padding: 1px 6px;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	:global(.dark) .ab-param-opt {
		background: rgba(255,255,255,0.07);
		color: #888;
	}

	.ab-param-hint {
		font-size: 11px;
		color: var(--dt3, #aaa);
		margin-left: auto;
	}

	/* ── Detail actions ───────────────────────────────────────── */
	.ab-detail-actions {
		display: flex;
		gap: 8px;
		padding: 12px 16px;
	}

	.ab-action-btn {
		flex: 1;
		padding: 8px 14px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: background 0.12s, transform 0.1s;
		border: 1px solid transparent;
	}
	.ab-action-btn:active { transform: scale(0.98); }

	.ab-action-btn--primary {
		background: #3b82f6;
		color: #fff;
		border-color: #3b82f6;
	}
	.ab-action-btn--primary:hover { background: #2563eb; border-color: #2563eb; }

	.ab-action-btn--ghost {
		background: transparent;
		color: var(--dt, #333);
		border-color: var(--dbd, rgba(0,0,0,0.12));
	}
	.ab-action-btn--ghost:hover {
		background: var(--dbg2, rgba(0,0,0,0.04));
	}
	:global(.dark) .ab-action-btn--ghost {
		color: #ccc;
		border-color: rgba(255,255,255,0.12);
	}
	:global(.dark) .ab-action-btn--ghost:hover {
		background: rgba(255,255,255,0.06);
	}

	/* ── Badges ───────────────────────────────────────────────── */
	.ab-badge {
		flex-shrink: 0;
		display: inline-block;
		padding: 2px 8px;
		border-radius: 999px;
		font-size: 10.5px;
		font-weight: 600;
		white-space: nowrap;
		letter-spacing: 0.01em;
	}
	.ab-badge--xs {
		padding: 1px 6px;
		font-size: 9.5px;
	}

	/* ── Mention picker ───────────────────────────────────────── */
	.ab-mention-demo {
		max-width: 480px;
	}

	.ab-mention-input-wrap {
		position: relative;
	}

	.ab-mention-input {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.12));
		border-radius: 10px;
		background: var(--dbg, #fff);
		cursor: text;
	}
	:global(.dark) .ab-mention-input {
		background: rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.1);
	}

	.ab-mention-text {
		flex: 1;
		font-size: 13.5px;
		color: var(--dt3, #aaa);
		user-select: none;
	}

	.ab-mention-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: 6px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		background: transparent;
		color: var(--dt3, #888);
		font-size: 14px;
		font-weight: 700;
		font-family: inherit;
		cursor: pointer;
		transition: background 0.1s, color 0.1s, border-color 0.1s;
	}
	.ab-mention-trigger:hover,
	.ab-mention-trigger--active {
		background: #3b82f6;
		color: #fff;
		border-color: #3b82f6;
	}

	.ab-mention-dropdown {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 0;
		right: 0;
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
		overflow: hidden;
		z-index: 20;
	}
	:global(.dark) .ab-mention-dropdown {
		background: #1e1e1e;
		border-color: rgba(255,255,255,0.1);
		box-shadow: 0 8px 32px rgba(0,0,0,0.4);
	}

	.ab-mention-search-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px 8px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}
	:global(.dark) .ab-mention-search-row {
		border-bottom-color: rgba(255,255,255,0.06);
	}

	.ab-mention-search-icon {
		flex-shrink: 0;
		color: var(--dt3, #aaa);
	}

	.ab-mention-search {
		flex: 1;
		border: none;
		background: transparent;
		font-size: 13px;
		font-family: inherit;
		color: var(--dt, #111);
		outline: none;
	}
	:global(.dark) .ab-mention-search { color: #e5e5e5; }
	.ab-mention-search::placeholder { color: var(--dt3, #bbb); }

	.ab-mention-section-label {
		padding: 8px 12px 4px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt3, #aaa);
	}

	.ab-mention-divider {
		height: 1px;
		background: var(--dbd, rgba(0,0,0,0.06));
		margin: 4px 0;
	}
	:global(.dark) .ab-mention-divider { background: rgba(255,255,255,0.06); }

	.ab-mention-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 9px 12px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: background 0.1s;
	}
	.ab-mention-item:hover {
		background: var(--dbg2, rgba(0,0,0,0.04));
	}
	:global(.dark) .ab-mention-item:hover {
		background: rgba(255,255,255,0.05);
	}
	.ab-mention-item--compact {
		padding: 7px 12px;
	}

	.ab-mention-item__icon {
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ab-mention-item__icon--folder { background: rgba(59,130,246,0.12); color: #3b82f6; }
	.ab-mention-item__icon--api    { background: rgba(16,185,129,0.12); color: #10b981; }
	.ab-mention-item__icon--app    { background: rgba(139,92,246,0.12); color: #8b5cf6; }

	.ab-mention-item__svc-icon {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		color: #fff;
	}

	.ab-mention-item__body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.ab-mention-item__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #111);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	:global(.dark) .ab-mention-item__name { color: #e5e5e5; }

	.ab-mention-item__sub {
		font-size: 11.5px;
		color: var(--dt3, #aaa);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ab-mention-item__chevron {
		flex-shrink: 0;
		color: var(--dt3, #ccc);
	}

	/* ── Standalone detail wrapper ────────────────────────────── */
	.ab-standalone-detail {
		max-width: 560px;
	}
</style>
