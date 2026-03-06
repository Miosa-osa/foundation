<script lang="ts">
	// ── Interactive state ──────────────────────────────────────────
	let activePopularTab = $state('Top');
	let profileTab = $state('Public');
	let activeInfoCategory = $state('Explore');
	let selectedCardId = $state<number | null>(null);
	let appDetailFollowing = $state(false);

	const popularTabs = ['Top', 'Lifestyle', 'Health & Fitness', 'Productivity'];
	const profileTabs = ['Public', 'Private'];
	const infoCategoryTabs = ['Explore', 'Creation', 'Work', 'Game', 'Development'];

	// ── App Grid data ──────────────────────────────────────────────
	const appGridItems = [
		{ id: 1, name: 'Canvas', subtitle: 'Visual workspace', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', username: null },
		{ id: 2, name: 'Scribe', subtitle: 'AI note taker', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', username: '@mika' },
		{ id: 3, name: 'Pulse', subtitle: 'Team analytics', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', username: null },
		{ id: 4, name: 'Forge', subtitle: 'Build automations', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', username: '@dev_ryo' },
		{ id: 5, name: 'Prism', subtitle: 'Data visualizer', gradient: 'linear-gradient(135deg, #fa709a, #fee140)', username: null },
		{ id: 6, name: 'Loop', subtitle: 'Feedback cycles', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', username: '@loop_ai' },
	];

	// ── Featured/Explore cards ─────────────────────────────────────
	const featuredCards = [
		{
			title: 'No-Code Book Finds',
			subtitle: 'Because you follow Bubble, Framer, and Synthflow.',
			gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			author: 'mika',
			initials: 'MK',
		},
		{
			title: 'AI Tooling Picks',
			subtitle: 'Curated for builders exploring LLM integrations.',
			gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
			author: 'dev_ryo',
			initials: 'DR',
		},
		{
			title: 'Design Systems',
			subtitle: 'Based on your Figma and component library activity.',
			gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
			author: 'loop_ai',
			initials: 'LA',
		},
	];

	// ── Popular list cards ─────────────────────────────────────────
	const popularItems = [
		{ rank: 1, name: 'Mindful', desc: 'Daily meditation & breathwork companion', author: '@serene_app', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)', hearts: '2.4k', downloads: '18k' },
		{ rank: 2, name: 'FitFlow', desc: 'Smart workout planner and tracker', author: '@fitflow', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)', hearts: '1.9k', downloads: '14k' },
		{ rank: 3, name: 'Nourish', desc: 'Macro tracking meets meal discovery', author: '@nourish_ai', gradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', hearts: '1.5k', downloads: '11k' },
		{ rank: 4, name: 'Clarity', desc: 'Focus timer with deep work sessions', author: '@clarity_dev', gradient: 'linear-gradient(135deg, #fddb92, #d1fdff)', hearts: '980', downloads: '8.2k' },
	];

	// ── Glass/Dark analytics stats ─────────────────────────────────
	const analyticsStats = [
		{ label: 'Total Revenue', value: '$48,290', delta: '+12.4%', positive: true, icon: 'revenue' },
		{ label: 'Active Users', value: '3,847', delta: '+8.1%', positive: true, icon: 'users' },
		{ label: 'App Installs', value: '12,091', delta: '+24.7%', positive: true, icon: '⬇' },
		{ label: 'Churn Rate', value: '2.3%', delta: '-0.4%', positive: true, icon: 'churn' },
	];

	// ── Profile mini apps ──────────────────────────────────────────
	const profileApps = [
		{ name: 'Canvas', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
		{ name: 'Scribe', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
		{ name: 'Pulse', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
		{ name: 'Forge', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
		{ name: 'Prism', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
		{ name: 'Loop', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
	];

	// ── Pricing plans ──────────────────────────────────────────────
	const pricingPlans = [
		{
			name: 'Free',
			price: '$0',
			period: '/mo',
			features: ['5 apps', '1 workspace', 'Community support', '1 GB storage', 'Basic analytics'],
			cta: 'Get started',
			popular: false,
		},
		{
			name: 'Pro',
			price: '$29',
			period: '/mo',
			features: ['Unlimited apps', '10 workspaces', 'Priority support', '100 GB storage', 'Advanced analytics', 'Custom domains'],
			cta: 'Start free trial',
			popular: true,
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			features: ['Unlimited everything', 'Unlimited workspaces', 'Dedicated support', 'Unlimited storage', 'Custom analytics', 'SSO + SAML', 'SLA guarantee'],
			cta: 'Contact sales',
			popular: false,
		},
	];

	// ── Standard/Elevated cards ────────────────────────────────────
	const projectCards = [
		{ name: 'Platform Rebuild', status: 'Active', progress: 68, tag: 'Backend' },
		{ name: 'Design System', status: 'Active', progress: 42, tag: 'Frontend' },
		{ name: 'API Gateway', status: 'Review', progress: 91, tag: 'Infrastructure' },
	];

	const artifacts = [
		{ type: 'doc', filename: 'project-spec.md', title: 'Project Specification', desc: 'Technical requirements and architecture overview including API contracts.', tags: ['Markdown', '2.4K words'], color: '#6366f1' },
		{ type: 'code', filename: 'auth-middleware.ts', title: 'Auth Middleware', desc: 'JWT validation middleware with refresh logic and rate limiting.', tags: ['TypeScript', '142 lines'], color: '#10b981' },
		{ type: 'image', filename: 'dashboard-mockup.png', title: 'Dashboard Mockup', desc: 'High-fidelity wireframe for the main dashboard view.', tags: ['PNG', '2048×1536'], color: '#f59e0b' },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Cards</h2>
	<p class="ds-desc">Comprehensive card system covering app grids, explore feeds, detail views, profiles, glass analytics, settings panels, pricing tiers, and standard content cards.</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. APP GRID CARDS                                          -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Grid Cards</h3>
		<p class="ds-card__sub">2-column square cards used on the TheOSApp Home screen. Circular avatar icon (48px), bold title, lighter subtitle, optional username badge overlay. 16px radius, subtle shadow.</p>

		<div class="cd-app-grid">
			{#each appGridItems as app}
				<button
					class="cd-app-grid__item"
					class:cd-app-grid__item--selected={selectedCardId === app.id}
					onclick={() => selectedCardId = selectedCardId === app.id ? null : app.id}
				>
					<div class="cd-app-grid__icon" style="background: {app.gradient};">
						<span class="cd-app-grid__icon-letter">{app.name[0]}</span>
					</div>
					<span class="cd-app-grid__name">{app.name}</span>
					<span class="cd-app-grid__sub">{app.subtitle}</span>
					{#if app.username}
						<span class="cd-app-grid__badge">{app.username}</span>
					{/if}
				</button>
			{/each}
		</div>

		<p class="cd-note">Click to select. Username badge overlays on cards from community authors.</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. FEATURED / EXPLORE CARDS                                -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Featured / Explore Cards</h3>
		<p class="ds-card__sub">Wider horizontal cards from the TheOSApp Explore page. Full-bleed gradient preview, title + description overlay, author avatar and username at the bottom. "Featured today" header label.</p>

		<div class="cd-explore-header">
			<span class="cd-explore-header__label">Featured today</span>
			<button class="btn-pill btn-pill-ghost btn-pill-xs">See all</button>
		</div>

		<div class="cd-explore-grid">
			{#each featuredCards as card}
				<div class="cd-explore-card">
					<div class="cd-explore-card__preview" style="background: {card.gradient};">
						<div class="cd-explore-card__overlay">
							<h4 class="cd-explore-card__title">{card.title}</h4>
							<p class="cd-explore-card__desc">{card.subtitle}</p>
						</div>
					</div>
					<div class="cd-explore-card__footer">
						<div class="cd-explore-card__author-avatar">{card.initials}</div>
						<span class="cd-explore-card__author">@{card.author}</span>
						<button class="btn-pill btn-pill-primary btn-pill-xs" style="margin-left: auto;">Get</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. APP DETAIL CARD                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Detail Card</h3>
		<p class="ds-card__sub">Full-width card from TheOSApp PublicAppView. Centered avatar (56px), username with @ handle, large app name, description, a stats row with pill-shaped badges, and primary action buttons.</p>

		<div class="cd-detail-card">
			<div class="cd-detail-card__avatar-wrap">
				<div class="cd-detail-card__avatar" style="background: linear-gradient(135deg, #667eea, #764ba2);">
					<span class="cd-detail-card__avatar-letter">C</span>
				</div>
				<span class="cd-detail-card__author-handle">@mika</span>
			</div>

			<h3 class="cd-detail-card__name">Canvas</h3>
			<p class="cd-detail-card__desc">A beautiful visual workspace for building mood boards, mind maps, and creative layouts — powered by AI.</p>

			<div class="cd-detail-card__stats">
				<span class="cd-detail-card__stat">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
					2.4k
				</span>
				<span class="cd-detail-card__stat">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
					348
				</span>
				<span class="cd-detail-card__stat">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.25"/></svg>
					1.2k
				</span>
				<span class="cd-detail-card__stat">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
					18k
				</span>
			</div>

			<div class="cd-detail-card__actions">
				<button class="btn-pill btn-pill-secondary" style="flex: 1;">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.25"/></svg>
					Remix
				</button>
				<button class="btn-pill btn-pill-primary" style="flex: 1;">Get</button>
				<button
					class="btn-pill btn-pill-ghost"
					onclick={() => appDetailFollowing = !appDetailFollowing}
					style="min-width: 100px;"
				>
					{appDetailFollowing ? 'Following' : 'Follow'}
				</button>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. POPULAR LIST CARDS                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Popular List Cards</h3>
		<p class="ds-card__sub">List-style cards from the Popular section. Category pill tabs at the top, then avatar + title + description + author + stats in a horizontal row layout.</p>

		<div class="cd-popular-tabs">
			{#each popularTabs as tab}
				<button
					class="cd-popular-tab"
					class:cd-popular-tab--active={activePopularTab === tab}
					onclick={() => activePopularTab = tab}
				>{tab}</button>
			{/each}
		</div>

		<div class="cd-popular-list">
			{#each popularItems as item}
				<div class="cd-popular-item">
					<span class="cd-popular-item__rank">{item.rank}</span>
					<div class="cd-popular-item__icon" style="background: {item.gradient};">
						<span style="font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.9);">{item.name[0]}</span>
					</div>
					<div class="cd-popular-item__body">
						<span class="cd-popular-item__name">{item.name}</span>
						<span class="cd-popular-item__desc">{item.desc}</span>
						<span class="cd-popular-item__author">{item.author}</span>
					</div>
					<div class="cd-popular-item__stats">
						<span class="cd-popular-item__stat">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
							{item.hearts}
						</span>
						<span class="cd-popular-item__stat">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
							{item.downloads}
						</span>
					</div>
					<button class="btn-pill btn-pill-secondary btn-pill-xs">Get</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. PROFILE CARD                                            -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Profile Card</h3>
		<p class="ds-card__sub">User profile card from TheOSApp. Avatar + name + @handle, follower/following counts, Public/Private tab toggle, and a grid of mini app cards below.</p>

		<div class="cd-profile-card">
			<div class="cd-profile-card__top">
				<div class="cd-profile-card__avatar" style="background: linear-gradient(135deg, #667eea, #764ba2);">
					<span class="cd-profile-card__avatar-letter">M</span>
				</div>
				<div class="cd-profile-card__identity">
					<span class="cd-profile-card__name">Mika Tanaka</span>
					<span class="cd-profile-card__handle">@mika</span>
				</div>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" style="margin-left: auto;">Edit profile</button>
			</div>

			<div class="cd-profile-card__stats">
				<div class="cd-profile-card__stat-group">
					<span class="cd-profile-card__stat-value">128</span>
					<span class="cd-profile-card__stat-label">Apps</span>
				</div>
				<div class="cd-profile-card__divider"></div>
				<div class="cd-profile-card__stat-group">
					<span class="cd-profile-card__stat-value">4,291</span>
					<span class="cd-profile-card__stat-label">Followers</span>
				</div>
				<div class="cd-profile-card__divider"></div>
				<div class="cd-profile-card__stat-group">
					<span class="cd-profile-card__stat-value">312</span>
					<span class="cd-profile-card__stat-label">Following</span>
				</div>
			</div>

			<div class="cd-profile-card__tabs">
				{#each profileTabs as tab}
					<button
						class="cd-profile-card__tab"
						class:cd-profile-card__tab--active={profileTab === tab}
						onclick={() => profileTab = tab}
					>{tab}</button>
				{/each}
			</div>

			<div class="cd-profile-mini-grid">
				{#each profileApps as app}
					<div class="cd-profile-mini-card">
						<div class="cd-profile-mini-card__icon" style="background: {app.gradient};">
							<span style="font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.9);">{app.name[0]}</span>
						</div>
						<span class="cd-profile-mini-card__name">{app.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 6. GLASS / DARK ANALYTICS CARDS                            -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass / Dark Analytics Cards</h3>
		<p class="ds-card__sub">Analytics stat cards on dark gradient backgrounds using glass-card classes. Icon + label + big number + delta subtext. Used for revenue, growth, and platform metric dashboards.</p>

		<div class="cd-glass-scene">
			<div class="cd-glass-stats-grid">
				{#each analyticsStats as stat}
					<div class="glass-card cd-glass-stat">
						<div class="cd-glass-stat__icon">
						{#if stat.icon === 'revenue'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
							</svg>
						{:else if stat.icon === 'users'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
							</svg>
						{:else if stat.icon === 'churn'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<polyline points="8 17 12 21 16 17"/><line x1="12" y1="3" x2="12" y2="21"/>
							</svg>
						{/if}
					</div>
						<span class="cd-glass-stat__label">{stat.label}</span>
						<span class="cd-glass-stat__value">{stat.value}</span>
						<span class="cd-glass-stat__delta" class:cd-glass-stat__delta--pos={stat.positive}>{stat.delta}</span>
					</div>
				{/each}
			</div>

			<!-- Wide glass card — monthly revenue chart placeholder -->
			<div class="glass-card-frosted cd-glass-wide">
				<div class="cd-glass-wide__header">
					<div>
						<span class="cd-glass-wide__label">Monthly Revenue</span>
						<span class="cd-glass-wide__value">$48,290</span>
					</div>
					<span class="cd-glass-wide__badge">+12.4% this month</span>
				</div>
				<div class="cd-glass-wide__chart">
					{#each [40, 55, 48, 70, 62, 80, 74, 90, 86, 95, 88, 100] as h, i}
						<div class="cd-glass-wide__bar" style="height: {h}%; opacity: {0.4 + i * 0.05};"></div>
					{/each}
				</div>
			</div>
		</div>

		<p class="cd-note">Rendered on a dark gradient background to demonstrate glass effect. Uses <code class="ds-mono-tag">.glass-card</code> and <code class="ds-mono-tag">.glass-card-frosted</code> from app.css.</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 7. BUILD / SETTINGS CARDS                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Build / Settings Cards</h3>
		<p class="ds-card__sub">Form-like cards from the TheOSApp Build views. Title field with chevron, description field, settings groups, toggle switch, and destructive action buttons.</p>

		<!-- App settings group card -->
		<div class="cd-settings-card">
			<div class="cd-settings-row cd-settings-row--chevron">
				<div class="cd-settings-row__body">
					<span class="cd-settings-row__label">App Title</span>
					<span class="cd-settings-row__value">Canvas — Visual Workspace</span>
				</div>
				<svg class="cd-settings-row__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			</div>

			<div class="cd-settings-divider"></div>

			<div class="cd-settings-row cd-settings-row--chevron">
				<div class="cd-settings-row__body">
					<span class="cd-settings-row__label">Short Description</span>
					<span class="cd-settings-row__value">A visual workspace for mood boards and creative layouts.</span>
				</div>
				<svg class="cd-settings-row__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			</div>

			<div class="cd-settings-divider"></div>

			<div class="cd-settings-row cd-settings-row--chevron">
				<div class="cd-settings-row__body">
					<span class="cd-settings-row__label">Category</span>
					<span class="cd-settings-row__value">Creation</span>
				</div>
				<svg class="cd-settings-row__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			</div>

			<div class="cd-settings-divider"></div>

			<div class="cd-settings-row">
				<div class="cd-settings-row__body">
					<span class="cd-settings-row__label">Auto-use</span>
					<span class="cd-settings-row__sub">Automatically launch on open</span>
				</div>
				<div class="cd-settings-toggle" role="switch" aria-checked="true" tabindex="0">
					<div class="cd-settings-toggle__knob"></div>
				</div>
			</div>
		</div>

		<!-- Danger zone card -->
		<div class="cd-settings-card cd-settings-card--danger-zone">
			<span class="cd-settings-danger-label">Danger Zone</span>
			<button class="btn-pill btn-pill-danger btn-pill-sm" style="width: 100%;">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
				Clear all app data
			</button>
			<button class="btn-pill btn-pill-danger btn-pill-sm" style="width: 100%; background: transparent; color: #ef4444; border: 1px solid rgba(239,68,68,0.3);">
				Delete this app
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 8. PRICING / PLAN CARDS                                    -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pricing / Plan Cards</h3>
		<p class="ds-card__sub">AI app pricing tiers — Free, Pro (highlighted), and Enterprise. Tier name, price, feature list with checkmarks, and CTA button.</p>

		<div class="cd-pricing-grid">
			{#each pricingPlans as plan}
				<div class="cd-pricing-card" class:cd-pricing-card--popular={plan.popular}>
					{#if plan.popular}
						<span class="cd-pricing-card__badge">Most Popular</span>
					{/if}
					<div class="cd-pricing-card__tier">{plan.name}</div>
					<div class="cd-pricing-card__price-row">
						<span class="cd-pricing-card__price">{plan.price}</span>
						{#if plan.period}
							<span class="cd-pricing-card__period">{plan.period}</span>
						{/if}
					</div>
					<ul class="cd-pricing-card__features">
						{#each plan.features as feature}
							<li class="cd-pricing-card__feature">
								<svg class="cd-pricing-card__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								{feature}
							</li>
						{/each}
					</ul>
					<button
						class="btn-pill {plan.popular ? 'btn-pill-primary' : 'btn-pill-secondary'}"
						style="width: 100%; margin-top: auto;"
					>
						{plan.cta}
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 9. APPLICATION INFO CARD                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Application Info Card</h3>
		<p class="ds-card__sub">Modal-like card App icon with auto-use badge, Name / Author / Short Description fields, detailed Description textarea, category pill selector, and action buttons row.</p>

		<div class="cd-info-card">
			<div class="cd-info-card__icon-row">
				<div class="cd-info-card__icon-wrap">
					<div class="cd-info-card__icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
						<span style="font-size: 22px; font-weight: 700; color: #fff;">C</span>
					</div>
					<span class="cd-info-card__auto-badge">
						<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						Auto-use
					</span>
				</div>
				<div class="cd-info-card__id-fields">
					<div class="cd-info-field">
						<label class="cd-info-field__label" for="info-app-name">App Name</label>
						<input id="info-app-name" class="cd-info-field__input" type="text" value="Canvas" readonly />
					</div>
					<div class="cd-info-field">
						<label class="cd-info-field__label" for="info-author">Author</label>
						<input id="info-author" class="cd-info-field__input" type="text" value="@mika" readonly />
					</div>
				</div>
			</div>

			<div class="cd-info-field">
				<label class="cd-info-field__label" for="info-short-desc">Short Description</label>
				<input id="info-short-desc" class="cd-info-field__input" type="text" value="A visual workspace for mood boards and creative layouts." readonly />
			</div>

			<div class="cd-info-field">
				<label class="cd-info-field__label" for="info-detail-desc">Detailed Description</label>
				<textarea id="info-detail-desc" class="cd-info-field__textarea" rows="3" readonly>Canvas is a beautiful drag-and-drop workspace for designers, creators, and visual thinkers. Build mood boards, mind maps, and creative layouts powered by an AI assistant that understands visual intent.</textarea>
			</div>

			<div class="cd-info-field">
				<span class="cd-info-field__label">Category</span>
				<div class="cd-info-categories">
					{#each infoCategoryTabs as cat}
						<button
							class="cd-info-category"
							class:cd-info-category--active={activeInfoCategory === cat}
							onclick={() => activeInfoCategory = cat}
						>{cat}</button>
					{/each}
				</div>
			</div>

			<div class="cd-info-card__actions">
				<button class="btn-pill btn-pill-ghost btn-pill-sm">Cancel</button>
				<button class="btn-pill btn-pill-secondary btn-pill-sm">Save Draft</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Publish</button>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 10. STANDARD PROJECT CARDS                                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Standard Cards</h3>
		<p class="ds-card__sub">Basic project cards with status badges, progress indicators, and tag labels. The default card pattern for dashboard and list views.</p>

		<div class="cd-standard-grid">
			{#each projectCards as project}
				<div class="cd-standard-card">
					<div class="cd-standard-card__header">
						<span class="cd-standard-card__name">{project.name}</span>
						<span class="badge {project.status === 'Active' ? 'badge-active' : ''}">{project.status}</span>
					</div>
					<div class="cd-standard-card__progress-wrap">
						<div class="cd-standard-card__progress">
							<div class="cd-standard-card__progress-fill" style="width: {project.progress}%;"></div>
						</div>
						<span class="cd-standard-card__progress-label">{project.progress}%</span>
					</div>
					<div class="cd-standard-card__footer">
						<span class="ds-mono-tag">{project.tag}</span>
						<button class="btn-pill btn-pill-ghost btn-pill-xs">Open</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 11. ELEVATED CARDS — SHADOW DEPTH VARIANTS                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Elevated Cards — Shadow Depth</h3>
		<p class="ds-card__sub">Three shadow levels: flat (border only), raised (subtle shadow), and floating (prominent shadow). Use depth to communicate hierarchy and interactivity.</p>

		<div class="cd-elevated-row">
			<div class="cd-elevated cd-elevated--flat">
				<span class="cd-elevated__tag">Flat</span>
				<span class="cd-elevated__label">Border only</span>
				<span class="cd-elevated__sub">No shadow, 1px border</span>
			</div>
			<div class="cd-elevated cd-elevated--raised">
				<span class="cd-elevated__tag">Raised</span>
				<span class="cd-elevated__label">Subtle shadow</span>
				<span class="cd-elevated__sub">sm shadow, no border</span>
			</div>
			<div class="cd-elevated cd-elevated--floating">
				<span class="cd-elevated__tag">Floating</span>
				<span class="cd-elevated__label">Prominent shadow</span>
				<span class="cd-elevated__sub">lg shadow, lift effect</span>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 12. ARTIFACT CARDS                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Artifact Cards</h3>
		<p class="ds-card__sub">AI-generated content cards. Colored icon dot, filename, title, description, and tag pills. Used for documents, code files, and images produced by an AI agent.</p>

		<div class="cd-artifact-list">
			{#each artifacts as artifact}
				<div class="cd-artifact">
					<div class="cd-artifact__icon" style="background: {artifact.color}15; color: {artifact.color};">
						{#if artifact.type === 'doc'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
						{:else if artifact.type === 'code'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
						{/if}
					</div>
					<div class="cd-artifact__body">
						<span class="cd-artifact__filename">{artifact.filename}</span>
						<span class="cd-artifact__title">{artifact.title}</span>
						<span class="cd-artifact__desc">{artifact.desc}</span>
						<div class="cd-artifact__tags">
							{#each artifact.tags as tag}
								<span class="ds-mono-tag">{tag}</span>
							{/each}
						</div>
					</div>
					<button class="btn-pill btn-pill-ghost btn-pill-xs cd-artifact__action" aria-label="Download {artifact.filename}">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 13. PANEL CARD                                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Panel Card</h3>
		<p class="ds-card__sub">Sidebar-style card with a sticky header, icon, title, subtitle, and scrollable body. Used for contextual detail panels and inspector views.</p>

		<div class="cd-panel">
			<div class="cd-panel__header">
				<div class="cd-panel__icon" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
				</div>
				<div>
					<span class="cd-panel__title">Inspector</span>
					<span class="cd-panel__subtitle">Canvas · selected layer</span>
				</div>
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-xs" style="margin-left: auto;" aria-label="Close panel">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				</button>
			</div>
			<div class="cd-panel__body">
				<div class="cd-panel__group">
					<span class="cd-panel__group-label">Position</span>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">X</span>
						<span class="cd-panel__row-val cd-panel__row-val--mono">240</span>
					</div>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">Y</span>
						<span class="cd-panel__row-val cd-panel__row-val--mono">180</span>
					</div>
				</div>
				<div class="cd-panel__group">
					<span class="cd-panel__group-label">Size</span>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">W</span>
						<span class="cd-panel__row-val cd-panel__row-val--mono">320</span>
					</div>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">H</span>
						<span class="cd-panel__row-val cd-panel__row-val--mono">240</span>
					</div>
				</div>
				<div class="cd-panel__group">
					<span class="cd-panel__group-label">Appearance</span>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">Opacity</span>
						<span class="cd-panel__row-val cd-panel__row-val--mono">100%</span>
					</div>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">Radius</span>
						<span class="cd-panel__row-val cd-panel__row-val--mono">16px</span>
					</div>
					<div class="cd-panel__row">
						<span class="cd-panel__row-key">Fill</span>
						<span class="cd-panel__row-val" style="display: flex; align-items: center; gap: 6px;">
							<span style="width: 14px; height: 14px; border-radius: 3px; background: linear-gradient(135deg, #667eea, #764ba2); display: inline-block;"></span>
							Gradient
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>

</section>

<style>
/* ═══════════════════════════════════════════════════════════════ */
/*  CARDS DEMO — All styles scoped with cd- prefix               */
/* ═══════════════════════════════════════════════════════════════ */

/* ── Utility note ──────────────────────────────────────────── */
.cd-note {
	font-size: 12px;
	color: var(--dt3, #999);
	margin-top: 8px;
}

/* ── 1. APP GRID ───────────────────────────────────────────── */
.cd-app-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
	max-width: 480px;
}

.cd-app-grid__item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px 10px 14px;
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 16px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
	cursor: pointer;
	transition: box-shadow 0.15s, transform 0.15s, border-color 0.15s;
	font-family: inherit;
	text-align: center;
	gap: 4px;
}
.cd-app-grid__item:hover {
	box-shadow: 0 4px 16px rgba(0,0,0,0.10);
	transform: translateY(-1px);
}
.cd-app-grid__item--selected {
	border-color: rgba(99,102,241,0.5);
	box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.10);
}

.cd-app-grid__icon {
	width: 48px;
	height: 48px;
	border-radius: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 4px;
	flex-shrink: 0;
}
.cd-app-grid__icon-letter {
	font-size: 20px;
	font-weight: 700;
	color: rgba(255,255,255,0.95);
}
.cd-app-grid__name {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt, #111);
	line-height: 1.2;
}
.cd-app-grid__sub {
	font-size: 11px;
	color: var(--dt3, #999);
	line-height: 1.3;
}
.cd-app-grid__badge {
	position: absolute;
	top: 6px;
	right: 6px;
	font-size: 10px;
	font-weight: 600;
	padding: 2px 6px;
	border-radius: 999px;
	background: rgba(0,0,0,0.08);
	color: var(--dt2, #555);
	backdrop-filter: blur(4px);
}
:global(.dark) .cd-app-grid__badge {
	background: rgba(255,255,255,0.12);
	color: rgba(255,255,255,0.7);
}

/* ── 2. EXPLORE / FEATURED ─────────────────────────────────── */
.cd-explore-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2px;
}
.cd-explore-header__label {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt, #111);
}

.cd-explore-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
}

.cd-explore-card {
	border-radius: 14px;
	overflow: hidden;
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	box-shadow: 0 2px 10px rgba(0,0,0,0.06);
	background: var(--ds, #fff);
	transition: box-shadow 0.15s, transform 0.15s;
}
.cd-explore-card:hover {
	box-shadow: 0 6px 20px rgba(0,0,0,0.10);
	transform: translateY(-2px);
}
.cd-explore-card__preview {
	height: 120px;
	position: relative;
	display: flex;
	align-items: flex-end;
}
.cd-explore-card__overlay {
	padding: 10px 12px;
	background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
	width: 100%;
}
.cd-explore-card__title {
	font-size: 13px;
	font-weight: 600;
	color: #fff;
	margin: 0 0 2px;
	line-height: 1.3;
}
.cd-explore-card__desc {
	font-size: 11px;
	color: rgba(255,255,255,0.8);
	margin: 0;
	line-height: 1.3;
}
.cd-explore-card__footer {
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 10px 12px;
}
.cd-explore-card__author-avatar {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: linear-gradient(135deg, #667eea, #764ba2);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
	flex-shrink: 0;
}
.cd-explore-card__author {
	font-size: 12px;
	color: var(--dt2, #666);
	font-weight: 500;
}

/* ── 3. APP DETAIL ─────────────────────────────────────────── */
.cd-detail-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 24px;
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 20px;
	box-shadow: 0 2px 12px rgba(0,0,0,0.06);
	gap: 12px;
	max-width: 380px;
}

.cd-detail-card__avatar-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}
.cd-detail-card__avatar {
	width: 56px;
	height: 56px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.cd-detail-card__avatar-letter {
	font-size: 24px;
	font-weight: 700;
	color: rgba(255,255,255,0.95);
}
.cd-detail-card__author-handle {
	font-size: 12px;
	color: var(--dt3, #999);
}
.cd-detail-card__name {
	font-size: 22px;
	font-weight: 700;
	color: var(--dt, #111);
	margin: 0;
	line-height: 1.2;
}
.cd-detail-card__desc {
	font-size: 13px;
	color: var(--dt2, #666);
	line-height: 1.5;
	margin: 0;
	max-width: 280px;
}

.cd-detail-card__stats {
	display: flex;
	align-items: center;
	gap: 8px;
}
.cd-detail-card__stat {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	font-weight: 600;
	color: var(--dt2, #555);
	padding: 4px 10px;
	background: var(--dbg, rgba(0,0,0,0.04));
	border-radius: 999px;
}
:global(.dark) .cd-detail-card__stat {
	background: rgba(255,255,255,0.07);
}

.cd-detail-card__actions {
	display: flex;
	align-items: center;
	gap: 8px;
	width: 100%;
}

/* ── 4. POPULAR LIST ───────────────────────────────────────── */
.cd-popular-tabs {
	display: flex;
	gap: 6px;
	margin-bottom: 4px;
	flex-wrap: wrap;
}
.cd-popular-tab {
	padding: 5px 12px;
	border-radius: 999px;
	border: 1px solid var(--dbd, rgba(0,0,0,0.08));
	background: transparent;
	font-size: 12px;
	font-weight: 500;
	color: var(--dt2, #666);
	cursor: pointer;
	transition: all 0.15s;
	font-family: inherit;
}
.cd-popular-tab:hover {
	background: var(--dbg, rgba(0,0,0,0.04));
}
.cd-popular-tab--active {
	background: var(--dt, #111);
	color: #fff;
	border-color: transparent;
}
:global(.dark) .cd-popular-tab--active {
	background: #fff;
	color: #111;
}

.cd-popular-list {
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.cd-popular-item {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 12px;
	border-radius: 12px;
	transition: background 0.12s;
}
.cd-popular-item:hover {
	background: var(--dbg, rgba(0,0,0,0.03));
}
:global(.dark) .cd-popular-item:hover {
	background: rgba(255,255,255,0.04);
}
.cd-popular-item__rank {
	font-size: 13px;
	font-weight: 700;
	color: var(--dt3, #bbb);
	width: 16px;
	text-align: center;
	flex-shrink: 0;
}
.cd-popular-item__icon {
	width: 40px;
	height: 40px;
	border-radius: 11px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.cd-popular-item__body {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1px;
	min-width: 0;
}
.cd-popular-item__name {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt, #111);
}
.cd-popular-item__desc {
	font-size: 11px;
	color: var(--dt3, #999);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.cd-popular-item__author {
	font-size: 11px;
	color: var(--dt3, #bbb);
}
.cd-popular-item__stats {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 3px;
	flex-shrink: 0;
}
.cd-popular-item__stat {
	display: flex;
	align-items: center;
	gap: 3px;
	font-size: 11px;
	color: var(--dt3, #999);
}

/* ── 5. PROFILE ────────────────────────────────────────────── */
.cd-profile-card {
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 20px;
	padding: 20px;
	box-shadow: 0 2px 12px rgba(0,0,0,0.05);
	display: flex;
	flex-direction: column;
	gap: 16px;
	max-width: 480px;
}
.cd-profile-card__top {
	display: flex;
	align-items: center;
	gap: 12px;
}
.cd-profile-card__avatar {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.cd-profile-card__avatar-letter {
	font-size: 20px;
	font-weight: 700;
	color: rgba(255,255,255,0.95);
}
.cd-profile-card__identity {
	display: flex;
	flex-direction: column;
	gap: 1px;
}
.cd-profile-card__name {
	font-size: 15px;
	font-weight: 600;
	color: var(--dt, #111);
}
.cd-profile-card__handle {
	font-size: 12px;
	color: var(--dt3, #999);
}
.cd-profile-card__stats {
	display: flex;
	align-items: center;
}
.cd-profile-card__stat-group {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1px;
}
.cd-profile-card__stat-value {
	font-size: 18px;
	font-weight: 700;
	color: var(--dt, #111);
}
.cd-profile-card__stat-label {
	font-size: 11px;
	color: var(--dt3, #999);
}
.cd-profile-card__divider {
	width: 1px;
	height: 32px;
	background: var(--dbd, rgba(0,0,0,0.08));
}

.cd-profile-card__tabs {
	display: flex;
	background: var(--dbg, rgba(0,0,0,0.04));
	border-radius: 10px;
	padding: 3px;
}
:global(.dark) .cd-profile-card__tabs {
	background: rgba(255,255,255,0.06);
}
.cd-profile-card__tab {
	flex: 1;
	padding: 6px 12px;
	border-radius: 8px;
	border: none;
	background: transparent;
	font-size: 13px;
	font-weight: 500;
	color: var(--dt2, #666);
	cursor: pointer;
	transition: all 0.15s;
	font-family: inherit;
}
.cd-profile-card__tab--active {
	background: var(--ds, #fff);
	color: var(--dt, #111);
	font-weight: 600;
	box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
:global(.dark) .cd-profile-card__tab--active {
	background: rgba(255,255,255,0.12);
	color: #fff;
}

.cd-profile-mini-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
}
.cd-profile-mini-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding: 10px 8px;
	border-radius: 12px;
	background: var(--dbg, rgba(0,0,0,0.03));
	transition: background 0.12s;
}
.cd-profile-mini-card:hover {
	background: rgba(0,0,0,0.06);
}
:global(.dark) .cd-profile-mini-card {
	background: rgba(255,255,255,0.05);
}
:global(.dark) .cd-profile-mini-card:hover {
	background: rgba(255,255,255,0.09);
}
.cd-profile-mini-card__icon {
	width: 36px;
	height: 36px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.cd-profile-mini-card__name {
	font-size: 11px;
	font-weight: 500;
	color: var(--dt2, #666);
	text-align: center;
}

/* ── 6. GLASS / DARK ───────────────────────────────────────── */
.cd-glass-scene {
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	border-radius: 16px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 14px;
}
.cd-glass-stats-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
}
.cd-glass-stat {
	display: flex !important;
	flex-direction: column;
	gap: 4px;
	padding: 14px !important;
}
.cd-glass-stat__icon {
	font-size: 20px;
	line-height: 1;
}
.cd-glass-stat__label {
	font-size: 11px;
	color: rgba(255,255,255,0.55);
	margin-top: 4px;
}
.cd-glass-stat__value {
	font-size: 20px;
	font-weight: 700;
	color: rgba(255,255,255,0.95);
	line-height: 1.2;
}
.cd-glass-stat__delta {
	font-size: 11px;
	color: rgba(255,255,255,0.4);
}
.cd-glass-stat__delta--pos {
	color: #4ade80;
}

.cd-glass-wide {
	padding: 16px 20px !important;
	display: flex !important;
	flex-direction: column;
	gap: 14px;
}
.cd-glass-wide__header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}
.cd-glass-wide__label {
	display: block;
	font-size: 12px;
	color: rgba(255,255,255,0.5);
	margin-bottom: 2px;
}
.cd-glass-wide__value {
	display: block;
	font-size: 26px;
	font-weight: 700;
	color: rgba(255,255,255,0.95);
	line-height: 1.2;
}
.cd-glass-wide__badge {
	font-size: 11px;
	color: #4ade80;
	background: rgba(74,222,128,0.15);
	padding: 3px 10px;
	border-radius: 999px;
}
.cd-glass-wide__chart {
	display: flex;
	align-items: flex-end;
	gap: 4px;
	height: 60px;
}
.cd-glass-wide__bar {
	flex: 1;
	background: rgba(255,255,255,0.35);
	border-radius: 3px 3px 0 0;
	min-height: 4px;
}

/* ── 7. SETTINGS ───────────────────────────────────────────── */
.cd-settings-card {
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 16px;
	overflow: hidden;
}
.cd-settings-card--danger-zone {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px;
	border-color: rgba(239,68,68,0.2);
	background: rgba(239,68,68,0.02);
}
.cd-settings-danger-label {
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: #ef4444;
	margin-bottom: 2px;
}
.cd-settings-row {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 14px 16px;
	transition: background 0.12s;
}
.cd-settings-row--chevron { cursor: pointer; }
.cd-settings-row--chevron:hover {
	background: var(--dbg, rgba(0,0,0,0.025));
}
.cd-settings-row__body {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1px;
	min-width: 0;
}
.cd-settings-row__label {
	font-size: 13px;
	font-weight: 500;
	color: var(--dt, #111);
}
.cd-settings-row__value {
	font-size: 12px;
	color: var(--dt3, #999);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.cd-settings-row__sub {
	font-size: 12px;
	color: var(--dt3, #bbb);
}
.cd-settings-row__chevron {
	color: var(--dt3, #ccc);
	flex-shrink: 0;
}
.cd-settings-divider {
	height: 1px;
	background: var(--dbd, rgba(0,0,0,0.05));
	margin: 0 16px;
}

.cd-settings-toggle {
	width: 40px;
	height: 24px;
	border-radius: 999px;
	background: #22c55e;
	position: relative;
	cursor: pointer;
	flex-shrink: 0;
	transition: background 0.2s;
}
.cd-settings-toggle__knob {
	position: absolute;
	top: 3px;
	right: 3px;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 1px 3px rgba(0,0,0,0.2);
	transition: transform 0.2s;
}

/* ── 8. PRICING ─────────────────────────────────────────────── */
.cd-pricing-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
	align-items: start;
}
.cd-pricing-card {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 14px;
	padding: 20px;
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.08));
	border-radius: 18px;
	transition: box-shadow 0.15s;
}
.cd-pricing-card:hover {
	box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.cd-pricing-card--popular {
	border-color: #6366f1;
	box-shadow: 0 0 0 1px #6366f1, 0 4px 20px rgba(99,102,241,0.15);
}
.cd-pricing-card__badge {
	position: absolute;
	top: -10px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	background: #6366f1;
	color: #fff;
	padding: 3px 10px;
	border-radius: 999px;
	white-space: nowrap;
}
.cd-pricing-card__tier {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt2, #555);
	text-transform: uppercase;
	letter-spacing: 0.05em;
}
.cd-pricing-card__price-row {
	display: flex;
	align-items: baseline;
	gap: 3px;
}
.cd-pricing-card__price {
	font-size: 28px;
	font-weight: 700;
	color: var(--dt, #111);
	line-height: 1;
}
.cd-pricing-card__period {
	font-size: 13px;
	color: var(--dt3, #999);
}
.cd-pricing-card__features {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
}
.cd-pricing-card__feature {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 13px;
	color: var(--dt2, #555);
}
.cd-pricing-card__check {
	color: #22c55e;
	flex-shrink: 0;
}

/* ── 9. APPLICATION INFO CARD ────────────────────────────────── */
.cd-info-card {
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.08));
	border-radius: 18px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 14px;
	max-width: 520px;
	box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}
.cd-info-card__icon-row {
	display: flex;
	align-items: flex-start;
	gap: 16px;
}
.cd-info-card__icon-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	flex-shrink: 0;
}
.cd-info-card__icon {
	width: 64px;
	height: 64px;
	border-radius: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.cd-info-card__auto-badge {
	display: flex;
	align-items: center;
	gap: 3px;
	font-size: 10px;
	font-weight: 600;
	color: #22c55e;
	background: rgba(34,197,94,0.1);
	padding: 2px 8px;
	border-radius: 999px;
}
.cd-info-card__id-fields {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.cd-info-field {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.cd-info-field__label {
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--dt3, #bbb);
}
.cd-info-field__input {
	padding: 8px 12px;
	font-size: 13px;
	color: var(--dt, #111);
	background: var(--dbg, rgba(0,0,0,0.03));
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 10px;
	outline: none;
	font-family: inherit;
	transition: border-color 0.15s;
	width: 100%;
	box-sizing: border-box;
}
.cd-info-field__input:focus {
	border-color: rgba(99,102,241,0.5);
	background: var(--ds, #fff);
}
:global(.dark) .cd-info-field__input {
	background: rgba(255,255,255,0.05);
	border-color: rgba(255,255,255,0.08);
	color: rgba(255,255,255,0.9);
}
.cd-info-field__textarea {
	padding: 8px 12px;
	font-size: 13px;
	color: var(--dt, #111);
	background: var(--dbg, rgba(0,0,0,0.03));
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 10px;
	outline: none;
	font-family: inherit;
	resize: vertical;
	line-height: 1.5;
	transition: border-color 0.15s;
	width: 100%;
	box-sizing: border-box;
}
.cd-info-field__textarea:focus {
	border-color: rgba(99,102,241,0.5);
	background: var(--ds, #fff);
}
:global(.dark) .cd-info-field__textarea {
	background: rgba(255,255,255,0.05);
	border-color: rgba(255,255,255,0.08);
	color: rgba(255,255,255,0.9);
}
.cd-info-categories {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}
.cd-info-category {
	padding: 5px 14px;
	border-radius: 999px;
	border: 1px solid var(--dbd, rgba(0,0,0,0.1));
	background: transparent;
	font-size: 12px;
	font-weight: 500;
	color: var(--dt2, #666);
	cursor: pointer;
	transition: all 0.15s;
	font-family: inherit;
}
.cd-info-category:hover {
	background: var(--dbg, rgba(0,0,0,0.04));
}
.cd-info-category--active {
	background: var(--dt, #111);
	color: #fff;
	border-color: transparent;
}
:global(.dark) .cd-info-category--active {
	background: #fff;
	color: #111;
}
.cd-info-card__actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8px;
	padding-top: 4px;
	border-top: 1px solid var(--dbd, rgba(0,0,0,0.06));
}

/* ── 10. STANDARD CARDS ────────────────────────────────────── */
.cd-standard-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
}
.cd-standard-card {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 16px;
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 14px;
	box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.cd-standard-card__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}
.cd-standard-card__name {
	font-size: 14px;
	font-weight: 600;
	color: var(--dt, #111);
}
.cd-standard-card__progress-wrap {
	display: flex;
	align-items: center;
	gap: 8px;
}
.cd-standard-card__progress {
	flex: 1;
	height: 5px;
	background: var(--dbg, rgba(0,0,0,0.06));
	border-radius: 999px;
	overflow: hidden;
}
:global(.dark) .cd-standard-card__progress {
	background: rgba(255,255,255,0.08);
}
.cd-standard-card__progress-fill {
	height: 100%;
	background: linear-gradient(90deg, #6366f1, #8b5cf6);
	border-radius: 999px;
	transition: width 0.4s ease;
}
.cd-standard-card__progress-label {
	font-size: 11px;
	font-weight: 600;
	color: var(--dt3, #999);
	min-width: 28px;
	text-align: right;
}
.cd-standard-card__footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/* ── 11. ELEVATED ───────────────────────────────────────────── */
.cd-elevated-row {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
}
.cd-elevated {
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 16px;
	border-radius: 14px;
	background: var(--ds, #fff);
}
.cd-elevated--flat {
	border: 1px solid var(--dbd, rgba(0,0,0,0.1));
}
.cd-elevated--raised {
	border: none;
	box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
}
.cd-elevated--floating {
	border: none;
	box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
}
.cd-elevated__tag {
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--dt3, #bbb);
}
.cd-elevated__label {
	font-size: 14px;
	font-weight: 600;
	color: var(--dt, #111);
}
.cd-elevated__sub {
	font-size: 12px;
	color: var(--dt3, #999);
}

/* ── 12. ARTIFACT ───────────────────────────────────────────── */
.cd-artifact-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.cd-artifact {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	padding: 14px 16px;
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.07));
	border-radius: 14px;
	transition: box-shadow 0.15s;
}
.cd-artifact:hover {
	box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.cd-artifact__icon {
	width: 36px;
	height: 36px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.cd-artifact__body {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 2px;
	min-width: 0;
}
.cd-artifact__filename {
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--dt3, #bbb);
}
.cd-artifact__title {
	font-size: 14px;
	font-weight: 600;
	color: var(--dt, #111);
}
.cd-artifact__desc {
	font-size: 12px;
	color: var(--dt3, #999);
	line-height: 1.4;
}
.cd-artifact__tags {
	display: flex;
	gap: 6px;
	margin-top: 4px;
	flex-wrap: wrap;
}
.cd-artifact__action {
	flex-shrink: 0;
	align-self: center;
}

/* ── 13. PANEL ──────────────────────────────────────────────── */
.cd-panel {
	background: var(--ds, #fff);
	border: 1px solid var(--dbd, rgba(0,0,0,0.08));
	border-radius: 16px;
	overflow: hidden;
	max-width: 280px;
	box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.cd-panel__header {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 14px 16px;
	border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
	background: var(--dbg, rgba(0,0,0,0.015));
}
:global(.dark) .cd-panel__header {
	background: rgba(255,255,255,0.03);
}
.cd-panel__icon {
	width: 32px;
	height: 32px;
	border-radius: 9px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.cd-panel__title {
	display: block;
	font-size: 13px;
	font-weight: 600;
	color: var(--dt, #111);
}
.cd-panel__subtitle {
	display: block;
	font-size: 11px;
	color: var(--dt3, #999);
}
.cd-panel__body {
	display: flex;
	flex-direction: column;
	padding: 4px 0;
}
.cd-panel__group {
	padding: 8px 16px;
}
.cd-panel__group + .cd-panel__group {
	border-top: 1px solid var(--dbd, rgba(0,0,0,0.05));
}
.cd-panel__group-label {
	display: block;
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--dt3, #bbb);
	margin-bottom: 6px;
}
.cd-panel__row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 0;
}
.cd-panel__row-key {
	font-size: 12px;
	color: var(--dt2, #666);
}
.cd-panel__row-val {
	font-size: 12px;
	color: var(--dt, #111);
	font-weight: 500;
}
.cd-panel__row-val--mono {
	font-family: 'SF Mono', 'Fira Code', monospace;
	font-size: 12px;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 600px) {
	.cd-app-grid { grid-template-columns: repeat(2, 1fr); }
	.cd-explore-grid { grid-template-columns: 1fr; }
	.cd-glass-stats-grid { grid-template-columns: repeat(2, 1fr); }
	.cd-pricing-grid { grid-template-columns: 1fr; }
	.cd-standard-grid { grid-template-columns: repeat(2, 1fr); }
	.cd-elevated-row { grid-template-columns: 1fr; }
}
</style>
