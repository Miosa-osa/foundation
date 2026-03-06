<script lang="ts">
	let activeFilter = $state('All');
	const filters = ['All', 'Lifestyle', 'Productivity', 'AI', 'Games'];

	const apps = [
		{
			name: 'Lumina',
			description: 'AI-powered image generation and creative studio',
			category: 'AI',
			gradient: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
			icon: '✦',
			downloads: '2.4M',
			rating: 4.8,
			reviews: '18.2K',
			creator: '@luminadev',
		},
		{
			name: 'Foci',
			description: 'Deep work timer with ambient soundscapes',
			category: 'Productivity',
			gradient: 'linear-gradient(135deg, #111 0%, #444 100%)',
			icon: '◉',
			downloads: '890K',
			rating: 4.7,
			reviews: '6.1K',
			creator: '@foci_app',
		},
		{
			name: 'Orb',
			description: 'Conversational AI assistant for daily tasks',
			category: 'AI',
			gradient: 'linear-gradient(135deg, #222 0%, #555 100%)',
			icon: '◎',
			downloads: '5.1M',
			rating: 4.9,
			reviews: '41K',
			creator: '@orb_ai',
		},
		{
			name: 'Bloom',
			description: 'Habit tracking with streaks and gentle nudges',
			category: 'Lifestyle',
			gradient: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
			icon: '❋',
			downloads: '1.2M',
			rating: 4.6,
			reviews: '9.8K',
			creator: '@bloomapp',
		},
		{
			name: 'Cipher',
			description: 'End-to-end encrypted notes and vaults',
			category: 'Productivity',
			gradient: 'linear-gradient(135deg, #181818 0%, #383838 100%)',
			icon: '◈',
			downloads: '670K',
			rating: 4.5,
			reviews: '4.3K',
			creator: '@ciphernotes',
		},
		{
			name: 'Forge',
			description: 'Build and share custom AI workflows visually',
			category: 'AI',
			gradient: 'linear-gradient(135deg, #1f1f1f 0%, #3f3f3f 100%)',
			icon: '⬡',
			downloads: '320K',
			rating: 4.7,
			reviews: '2.1K',
			creator: '@forgeai',
		},
	];

	const topApps = [
		{
			rank: 1,
			name: 'Orb',
			description: 'Conversational AI assistant for daily tasks',
			gradient: 'linear-gradient(135deg, #222 0%, #555 100%)',
			icon: '◎',
			creator: '@orb_ai',
		},
		{
			rank: 2,
			name: 'Lumina',
			description: 'AI image generation and creative studio',
			gradient: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
			icon: '✦',
			creator: '@luminadev',
		},
		{
			rank: 3,
			name: 'Bloom',
			description: 'Habit tracking with streaks and gentle nudges',
			gradient: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
			icon: '❋',
			creator: '@bloomapp',
		},
		{
			rank: 4,
			name: 'Foci',
			description: 'Deep work timer with ambient soundscapes',
			gradient: 'linear-gradient(135deg, #111 0%, #444 100%)',
			icon: '◉',
			creator: '@foci_app',
		},
		{
			rank: 5,
			name: 'Cipher',
			description: 'Encrypted notes and vaults',
			gradient: 'linear-gradient(135deg, #181818 0%, #383838 100%)',
			icon: '◈',
			creator: '@ciphernotes',
		},
	];

	function renderStars(rating: number) {
		const full = Math.floor(rating);
		const hasHalf = rating % 1 >= 0.5;
		return { full, hasHalf, empty: 5 - full - (hasHalf ? 1 : 0) };
	}

	let installed = $state<Set<string>>(new Set());

	function toggleInstall(name: string) {
		const next = new Set(installed);
		if (next.has(name)) {
			next.delete(name);
		} else {
			next.add(name);
		}
		installed = next;
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">App Cards</h2>
	<p class="ds-desc">Cards for app stores, marketplaces, and galleries. Inspired by modern OS app stores and AI tool platforms.</p>

	<!-- ── 1. Basic App Card ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic App Card</h3>
		<p class="ds-card__sub">Square card with circular icon, name, description, and "Get" pill button</p>
		<div class="preview-row">
			<article class="app-card" aria-label="Lumina app">
				<div class="app-card__icon" style="background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%);" aria-hidden="true">
					<span class="app-card__icon-glyph">✦</span>
				</div>
				<div class="app-card__body">
					<h4 class="app-card__name">Lumina</h4>
					<p class="app-card__desc">AI-powered image generation and creative studio</p>
				</div>
				<button
					class="app-card__get-btn"
					aria-label="Get Lumina"
					onclick={() => toggleInstall('lumina-basic')}
				>
					{installed.has('lumina-basic') ? 'Open' : 'Get'}
				</button>
			</article>

			<article class="app-card" aria-label="Foci app">
				<div class="app-card__icon" style="background: linear-gradient(135deg, #111 0%, #444 100%);" aria-hidden="true">
					<span class="app-card__icon-glyph">◉</span>
				</div>
				<div class="app-card__body">
					<h4 class="app-card__name">Foci</h4>
					<p class="app-card__desc">Deep work timer with ambient soundscapes</p>
				</div>
				<button
					class="app-card__get-btn"
					aria-label="Get Foci"
					onclick={() => toggleInstall('foci-basic')}
				>
					{installed.has('foci-basic') ? 'Open' : 'Get'}
				</button>
			</article>

			<article class="app-card" aria-label="Orb app">
				<div class="app-card__icon" style="background: linear-gradient(135deg, #222 0%, #555 100%);" aria-hidden="true">
					<span class="app-card__icon-glyph">◎</span>
				</div>
				<div class="app-card__body">
					<h4 class="app-card__name">Orb</h4>
					<p class="app-card__desc">Conversational AI assistant for daily tasks</p>
				</div>
				<button
					class="app-card__get-btn app-card__get-btn--open"
					aria-label="Open Orb"
					onclick={() => toggleInstall('orb-basic')}
				>
					Open
				</button>
			</article>
		</div>
	</div>

	<!-- ── 2. App Card with Category Badge ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Card with Category Badge</h3>
		<p class="ds-card__sub">Small pill badge beside the description indicating app category</p>
		<div class="preview-row">
			<article class="app-card" aria-label="Lumina AI app">
				<div class="app-card__icon" style="background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%);" aria-hidden="true">
					<span class="app-card__icon-glyph">✦</span>
				</div>
				<div class="app-card__body">
					<div class="app-card__name-row">
						<h4 class="app-card__name">Lumina</h4>
					</div>
					<div class="app-card__desc-row">
						<p class="app-card__desc">AI-powered image generation</p>
						<span class="app-cat-badge">LLM</span>
					</div>
				</div>
				<button class="app-card__get-btn" aria-label="Get Lumina">Get</button>
			</article>

			<article class="app-card" aria-label="Dreamweave Video Generation app">
				<div class="app-card__icon" style="background: linear-gradient(135deg, #1c1c1c 0%, #484848 100%);" aria-hidden="true">
					<span class="app-card__icon-glyph">▶</span>
				</div>
				<div class="app-card__body">
					<div class="app-card__name-row">
						<h4 class="app-card__name">Dreamweave</h4>
					</div>
					<div class="app-card__desc-row">
						<p class="app-card__desc">Text-to-video generation</p>
						<span class="app-cat-badge">Video Generation</span>
					</div>
				</div>
				<button class="app-card__get-btn" aria-label="Get Dreamweave">Get</button>
			</article>

			<article class="app-card" aria-label="Bloom Lifestyle app">
				<div class="app-card__icon" style="background: linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%);" aria-hidden="true">
					<span class="app-card__icon-glyph">❋</span>
				</div>
				<div class="app-card__body">
					<div class="app-card__name-row">
						<h4 class="app-card__name">Bloom</h4>
					</div>
					<div class="app-card__desc-row">
						<p class="app-card__desc">Habit tracking with streaks</p>
						<span class="app-cat-badge">Lifestyle</span>
					</div>
				</div>
				<button class="app-card__get-btn" aria-label="Get Bloom">Get</button>
			</article>
		</div>
	</div>

	<!-- ── 3. App Card Grid ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Card Grid</h3>
		<p class="ds-card__sub">2-column responsive grid showing 6 app cards — the standard gallery layout</p>
		<div class="app-grid" role="list" aria-label="App gallery">
			{#each apps as app (app.name)}
				<article class="app-grid-card" role="listitem" aria-label="{app.name} app">
					<div class="app-grid-card__top">
						<div class="app-grid-card__icon" style="background: {app.gradient};" aria-hidden="true">
							<span class="app-grid-card__glyph">{app.icon}</span>
						</div>
						<button
							class="app-card__get-btn"
							aria-label="Get {app.name}"
							onclick={() => toggleInstall(app.name)}
						>
							{installed.has(app.name) ? 'Open' : 'Get'}
						</button>
					</div>
					<h4 class="app-grid-card__name">{app.name}</h4>
					<p class="app-grid-card__desc">{app.description}</p>
					<span class="app-cat-badge app-cat-badge--sm">{app.category}</span>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 4. Ranked App List ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Ranked App List</h3>
		<p class="ds-card__sub">Top charts list with rank number, icon, name, description, and creator handle</p>
		<ol class="app-rank-list" aria-label="Top apps chart">
			{#each topApps as app (app.rank)}
				<li class="app-rank-item">
					<span class="app-rank-item__number" aria-label="Rank {app.rank}">{app.rank}</span>
					<div class="app-rank-item__icon" style="background: {app.gradient};" aria-hidden="true">
						<span class="app-rank-item__glyph">{app.icon}</span>
					</div>
					<div class="app-rank-item__info">
						<h4 class="app-rank-item__name">{app.name}</h4>
						<p class="app-rank-item__desc">{app.description}</p>
						<span class="app-rank-item__creator">{app.creator}</span>
					</div>
					<button
						class="app-card__get-btn app-card__get-btn--sm"
						aria-label="Get {app.name}"
						onclick={() => toggleInstall('rank-' + app.rank)}
					>
						{installed.has('rank-' + app.rank) ? 'Open' : 'Get'}
					</button>
				</li>
			{/each}
		</ol>
	</div>

	<!-- ── 5. Featured App Card ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Featured App Card</h3>
		<p class="ds-card__sub">Landscape hero card with gradient area, overlapping icon, and creator avatar</p>
		<div style="max-width: 560px;">
			<article class="app-featured" aria-label="Featured app: Orb">
				<div class="app-featured__hero" aria-hidden="true">
					<div class="app-featured__hero-pattern"></div>
					<span class="app-featured__hero-label">Featured</span>
				</div>
				<div class="app-featured__body">
					<div class="app-featured__icon-wrap">
						<div class="app-featured__icon" style="background: linear-gradient(135deg, #222 0%, #555 100%);" aria-hidden="true">
							<span class="app-featured__icon-glyph">◎</span>
						</div>
					</div>
					<div class="app-featured__meta">
						<div class="app-featured__header">
							<div>
								<h3 class="app-featured__name">Orb</h3>
								<p class="app-featured__tagline">Your AI-native productivity layer</p>
							</div>
							<button class="app-card__get-btn app-card__get-btn--lg" aria-label="Get Orb">
								Get
							</button>
						</div>
						<p class="app-featured__desc">
							Orb integrates with your workflow and brings intelligent automation to every task. Trusted by 5M+ users worldwide.
						</p>
						<div class="app-featured__footer">
							<div class="app-featured__creator">
								<div class="app-featured__creator-avatar" aria-hidden="true">O</div>
								<span class="app-featured__creator-name">@orb_ai</span>
							</div>
							<div class="app-featured__stats">
								<span class="app-featured__stat">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
									4.9
								</span>
								<span class="app-featured__stat">5.1M installs</span>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>

	<!-- ── 6. App Card with Stats ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Card with Stats</h3>
		<p class="ds-card__sub">Download count, star rating, and user count as overlay badges on the icon</p>
		<div class="preview-row">
			{#each [
				{
					name: 'Orb',
					desc: 'Conversational AI assistant',
					gradient: 'linear-gradient(135deg, #222 0%, #555 100%)',
					icon: '◎',
					downloads: '5.1M',
					rating: 4.9,
					users: '2.4M',
				},
				{
					name: 'Lumina',
					desc: 'AI image generation studio',
					gradient: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
					icon: '✦',
					downloads: '2.4M',
					rating: 4.8,
					users: '980K',
				},
				{
					name: 'Forge',
					desc: 'Build custom AI workflows',
					gradient: 'linear-gradient(135deg, #1f1f1f 0%, #3f3f3f 100%)',
					icon: '⬡',
					downloads: '320K',
					rating: 4.7,
					users: '124K',
				},
			] as app (app.name)}
				<article class="app-stats-card" aria-label="{app.name} app with stats">
					<div class="app-stats-card__icon-wrap">
						<div class="app-stats-card__icon" style="background: {app.gradient};" aria-hidden="true">
							<span class="app-stats-card__glyph">{app.icon}</span>
						</div>
						<span class="app-stats-card__dl-badge" aria-label="{app.downloads} downloads">{app.downloads}</span>
					</div>
					<div class="app-stats-card__body">
						<h4 class="app-stats-card__name">{app.name}</h4>
						<p class="app-stats-card__desc">{app.desc}</p>
						<div class="app-stats-card__ratings" aria-label="Rating: {app.rating} out of 5">
							{#each Array(5) as _, i}
								<svg
									width="11"
									height="11"
									viewBox="0 0 24 24"
									fill={i < Math.floor(app.rating) ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
									class="app-stats-card__star"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
								</svg>
							{/each}
							<span class="app-stats-card__rating-val">{app.rating}</span>
						</div>
						<div class="app-stats-card__meta">
							<span class="app-stats-card__users">
								<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
								{app.users}
							</span>
						</div>
					</div>
					<button class="app-card__get-btn" aria-label="Get {app.name}" onclick={() => toggleInstall('stats-' + app.name)}>
						{installed.has('stats-' + app.name) ? 'Open' : 'Get'}
					</button>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 7. In Context: App Store Page ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: App Store Page</h3>
		<p class="ds-card__sub">Full composition — section header, category filter chips, ranked 2-col app grid</p>
		<div class="app-store-page" role="region" aria-label="App store page demo">
			<!-- Store header -->
			<div class="app-store-page__header">
				<div class="app-store-page__heading-group">
					<h3 class="app-store-page__heading">Popular this week</h3>
					<p class="app-store-page__sub">Top-rated tools from our community</p>
				</div>
				<button class="app-store-page__see-all" aria-label="See all popular apps">See all</button>
			</div>

			<!-- Filter chips -->
			<nav class="app-store-filters" aria-label="Category filters">
				{#each filters as filter}
					<button
						class="app-filter-chip"
						class:app-filter-chip--active={activeFilter === filter}
						aria-pressed={activeFilter === filter}
						onclick={() => (activeFilter = filter)}
					>
						{filter}
					</button>
				{/each}
			</nav>

			<!-- Ranked app grid -->
			<ol class="app-store-grid" aria-label="Popular apps">
				{#each apps.filter(a => activeFilter === 'All' || a.category === activeFilter).slice(0, 6) as app, i (app.name)}
					<li class="app-store-item" aria-label="#{i + 1} {app.name}">
						<span class="app-store-item__rank" aria-hidden="true">{i + 1}</span>
						<div class="app-store-item__icon" style="background: {app.gradient};" aria-hidden="true">
							<span class="app-store-item__glyph">{app.icon}</span>
						</div>
						<div class="app-store-item__info">
							<div class="app-store-item__top">
								<h4 class="app-store-item__name">{app.name}</h4>
								<span class="app-cat-badge app-cat-badge--sm">{app.category}</span>
							</div>
							<p class="app-store-item__desc">{app.description}</p>
							<div class="app-store-item__bottom">
								<span class="app-store-item__creator">{app.creator}</span>
								<div class="app-store-item__rating" aria-label="Rating {app.rating}">
									<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
									{app.rating}
								</div>
							</div>
						</div>
						<button
							class="app-card__get-btn app-card__get-btn--sm"
							aria-label="Get {app.name}"
							onclick={() => toggleInstall('store-' + app.name)}
						>
							{installed.has('store-' + app.name) ? 'Open' : 'Get'}
						</button>
					</li>
				{/each}
			</ol>

			{#if apps.filter(a => activeFilter === 'All' || a.category === activeFilter).length === 0}
				<div class="app-store-empty" role="status">
					<span class="app-store-empty__icon" aria-hidden="true">◻</span>
					<p class="app-store-empty__msg">No apps in this category yet</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* ─── Shared Get Button ─────────────────────────────────────── */
	:global(.app-card__get-btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 28px;
		min-width: 60px;
		padding: 0 14px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		flex-shrink: 0;
	}
	:global(.app-card__get-btn:hover) {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}
	:global(.app-card__get-btn--open) {
		background: var(--dbg3);
		color: var(--dt2);
	}
	:global(.app-card__get-btn--sm) {
		height: 24px;
		min-width: 52px;
		padding: 0 10px;
		font-size: 11px;
	}
	:global(.app-card__get-btn--lg) {
		height: 34px;
		min-width: 72px;
		padding: 0 18px;
		font-size: 13px;
	}

	/* ─── Category Badge ────────────────────────────────────────── */
	.app-cat-badge {
		display: inline-flex;
		align-items: center;
		height: 20px;
		padding: 0 8px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		color: var(--dt3);
		font-size: 11px;
		font-weight: 500;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.app-cat-badge--sm {
		height: 18px;
		padding: 0 6px;
		font-size: 10px;
	}

	/* ─── Preview Row ───────────────────────────────────────────── */
	.preview-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	/* ─── 1 & 2. Basic App Card ─────────────────────────────────── */
	.app-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 140px;
		padding: 16px 12px;
		border-radius: 16px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		text-align: center;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.app-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
	}
	.app-card__icon {
		width: 64px;
		height: 64px;
		border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.app-card__icon-glyph {
		font-size: 24px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1;
	}
	.app-card__body {
		flex: 1;
		width: 100%;
	}
	.app-card__name {
		margin: 0 0 4px;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.app-card__desc {
		margin: 0;
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
	}
	.app-card__name-row {
		margin-bottom: 4px;
	}
	.app-card__desc-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	/* ─── 3. App Grid Card ──────────────────────────────────────── */
	.app-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		max-width: 480px;
	}
	.app-grid-card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 14px;
		border-radius: 14px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.app-grid-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}
	.app-grid-card__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2px;
	}
	.app-grid-card__icon {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.app-grid-card__glyph {
		font-size: 18px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1;
	}
	.app-grid-card__name {
		margin: 0;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.app-grid-card__desc {
		margin: 0;
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* ─── 4. Ranked App List ────────────────────────────────────── */
	.app-rank-list {
		list-style: none;
		margin: 0;
		padding: 0;
		max-width: 480px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.app-rank-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 12px;
		transition: background 0.12s;
	}
	.app-rank-item:hover {
		background: var(--dbg);
	}
	.app-rank-item__number {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt4);
		width: 20px;
		text-align: center;
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}
	.app-rank-item__icon {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.app-rank-item__glyph {
		font-size: 18px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1;
	}
	.app-rank-item__info {
		flex: 1;
		min-width: 0;
	}
	.app-rank-item__name {
		margin: 0 0 2px;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.app-rank-item__desc {
		margin: 0 0 3px;
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.app-rank-item__creator {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
	}

	/* ─── 5. Featured App Card ──────────────────────────────────── */
	.app-featured {
		border-radius: 20px;
		border: 1px solid var(--dbd);
		overflow: hidden;
		background: var(--dbg);
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.app-featured:hover {
		border-color: var(--dbd2);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
	}
	.app-featured__hero {
		position: relative;
		height: 120px;
		background: linear-gradient(135deg, #111 0%, #1f1f1f 40%, #333 100%);
		overflow: hidden;
	}
	.app-featured__hero-pattern {
		position: absolute;
		inset: 0;
		background-image:
			radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 40%),
			repeating-linear-gradient(
				-45deg,
				transparent,
				transparent 12px,
				rgba(255,255,255,0.015) 12px,
				rgba(255,255,255,0.015) 13px
			);
	}
	.app-featured__hero-label {
		position: absolute;
		top: 12px;
		left: 14px;
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.5);
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		padding: 3px 8px;
		border-radius: 9999px;
	}
	.app-featured__body {
		display: flex;
		gap: 14px;
		padding: 0 18px 18px;
	}
	.app-featured__icon-wrap {
		margin-top: -24px;
		flex-shrink: 0;
	}
	.app-featured__icon {
		width: 64px;
		height: 64px;
		border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid var(--dbg);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}
	.app-featured__icon-glyph {
		font-size: 26px;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1;
	}
	.app-featured__meta {
		flex: 1;
		min-width: 0;
		padding-top: 10px;
	}
	.app-featured__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 8px;
	}
	.app-featured__name {
		margin: 0 0 2px;
		font-size: 17px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: -0.02em;
	}
	.app-featured__tagline {
		margin: 0;
		font-size: 12px;
		color: var(--dt3);
		font-weight: 500;
	}
	.app-featured__desc {
		margin: 0 0 12px;
		font-size: 12px;
		color: var(--dt2);
		line-height: 1.5;
	}
	.app-featured__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.app-featured__creator {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.app-featured__creator-avatar {
		width: 22px;
		height: 22px;
		border-radius: 9999px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		color: var(--dt2);
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.app-featured__creator-name {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}
	.app-featured__stats {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.app-featured__stat {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* ─── 6. App Card with Stats ────────────────────────────────── */
	.app-stats-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px;
		border-radius: 14px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		flex: 1;
		min-width: 180px;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.app-stats-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}
	.app-stats-card__icon-wrap {
		position: relative;
		flex-shrink: 0;
	}
	.app-stats-card__icon {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.app-stats-card__glyph {
		font-size: 22px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1;
	}
	.app-stats-card__dl-badge {
		position: absolute;
		bottom: -4px;
		right: -6px;
		height: 16px;
		padding: 0 5px;
		border-radius: 9999px;
		background: var(--dt);
		color: #fff;
		font-size: 9px;
		font-weight: 700;
		display: flex;
		align-items: center;
		border: 1.5px solid var(--dbg);
		white-space: nowrap;
	}
	.app-stats-card__body {
		flex: 1;
		min-width: 0;
	}
	.app-stats-card__name {
		margin: 0 0 2px;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.app-stats-card__desc {
		margin: 0 0 5px;
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.app-stats-card__ratings {
		display: flex;
		align-items: center;
		gap: 1px;
		margin-bottom: 4px;
	}
	.app-stats-card__star {
		color: var(--dt);
	}
	.app-stats-card__rating-val {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		margin-left: 4px;
	}
	.app-stats-card__meta {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.app-stats-card__users {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
	}

	/* ─── 7. App Store Page ─────────────────────────────────────── */
	.app-store-page {
		max-width: 560px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
	}
	.app-store-page__header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 20px 20px 0;
		gap: 12px;
	}
	.app-store-page__heading-group {
		min-width: 0;
	}
	.app-store-page__heading {
		margin: 0 0 2px;
		font-size: 17px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: -0.02em;
	}
	.app-store-page__sub {
		margin: 0;
		font-size: 12px;
		color: var(--dt3);
	}
	.app-store-page__see-all {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		white-space: nowrap;
		transition: color 0.12s;
		flex-shrink: 0;
	}
	.app-store-page__see-all:hover {
		color: var(--dt);
	}

	/* Filter chips */
	.app-store-filters {
		display: flex;
		gap: 6px;
		padding: 14px 20px 12px;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.app-store-filters::-webkit-scrollbar {
		display: none;
	}
	.app-filter-chip {
		display: inline-flex;
		align-items: center;
		height: 28px;
		padding: 0 12px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.12s, color 0.12s, border-color 0.12s;
		flex-shrink: 0;
	}
	.app-filter-chip:hover {
		border-color: var(--dbd2);
		color: var(--dt);
	}
	.app-filter-chip--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}
	.app-filter-chip--active:hover {
		background: var(--dt);
		color: #fff;
	}

	/* Ranked app grid */
	.app-store-grid {
		list-style: none;
		margin: 0;
		padding: 0 10px 14px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2px;
	}
	.app-store-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px;
		border-radius: 12px;
		transition: background 0.12s;
		cursor: default;
	}
	.app-store-item:hover {
		background: var(--dbg2);
	}
	.app-store-item__rank {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt4);
		width: 16px;
		text-align: center;
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}
	.app-store-item__icon {
		width: 40px;
		height: 40px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.app-store-item__glyph {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1;
	}
	.app-store-item__info {
		flex: 1;
		min-width: 0;
	}
	.app-store-item__top {
		display: flex;
		align-items: center;
		gap: 5px;
		margin-bottom: 2px;
	}
	.app-store-item__name {
		margin: 0;
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.app-store-item__desc {
		margin: 0 0 3px;
		font-size: 10px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.app-store-item__bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.app-store-item__creator {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
	}
	.app-store-item__rating {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 10px;
		color: var(--dt3);
		font-weight: 600;
	}

	/* Empty state */
	.app-store-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 40px 20px;
		text-align: center;
	}
	.app-store-empty__icon {
		font-size: 28px;
		color: var(--dt4);
		line-height: 1;
	}
	.app-store-empty__msg {
		margin: 0;
		font-size: 13px;
		color: var(--dt3);
	}

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) :global(.app-card__get-btn:hover) {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}
	:global(.dark) .app-stats-card__dl-badge {
		background: #e5e5e5;
		color: #111;
	}
	:global(.dark) .app-filter-chip--active,
	:global(.dark) .app-filter-chip--active:hover {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}
</style>
