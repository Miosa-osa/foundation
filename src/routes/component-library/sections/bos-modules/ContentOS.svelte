<script lang="ts">
	let activeTab = $state('all');
	let editorTab = $state('content');
	let mediaView = $state<'grid' | 'list'>('grid');
	let calendarWeek = $state(0);
	let selectedContent = $state('');
	let seoScore = $state(82);

	const contentStats = [
		{ label: 'Published', value: 47, change: '+3' },
		{ label: 'Drafts', value: 12, change: '+1' },
		{ label: 'Scheduled', value: 8, change: '0' },
		{ label: 'Archived', value: 156, change: '+5' },
	];

	const recentContent = [
		{ id: '1', title: 'Getting Started with MIOSA Platform', type: 'blog', status: 'published', author: 'Sarah Chen', date: 'Mar 5', views: 2340 },
		{ id: '2', title: 'Q1 Product Roadmap Update', type: 'page', status: 'draft', author: 'Alex Rivera', date: 'Mar 4', views: 0 },
		{ id: '3', title: 'New Feature: AI Agent Builder', type: 'blog', status: 'scheduled', author: 'Sarah Chen', date: 'Mar 8', views: 0 },
		{ id: '4', title: 'API Documentation v2.0', type: 'docs', status: 'published', author: 'Jordan Lee', date: 'Mar 3', views: 1856 },
		{ id: '5', title: 'Weekly Newsletter #24', type: 'email', status: 'draft', author: 'Maria Santos', date: 'Mar 6', views: 0 },
	];

	const editorBlocks = [
		{ type: 'heading', content: 'Building AI-Powered Workflows' },
		{ type: 'paragraph', content: 'Modern business platforms need intelligent automation that adapts to how teams actually work. In this guide, we explore three patterns for integrating AI agents into your existing workflows without disrupting productivity.' },
		{ type: 'image', alt: 'Workflow diagram showing AI integration points', dimensions: '1200 x 640' },
		{ type: 'heading-2', content: '1. Event-Driven Agent Triggers' },
		{ type: 'paragraph', content: 'Rather than requiring manual invocation, agents can listen for specific events in your workspace and respond automatically. This reduces friction and ensures consistent handling of routine tasks.' },
		{ type: 'code', language: 'typescript', content: 'agent.on("task.created", async (task) => {\n  const analysis = await agent.analyze(task);\n  await task.update({ priority: analysis.priority });\n});' },
		{ type: 'callout', content: 'Tip: Start with low-stakes automations like tagging and categorization before moving to actions that modify data.' },
	];

	const mediaFiles = [
		{ id: 'm1', name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', dimensions: '2400x1200', date: 'Mar 5' },
		{ id: 'm2', name: 'product-demo.mp4', type: 'video', size: '48 MB', dimensions: '1920x1080', date: 'Mar 4' },
		{ id: 'm3', name: 'brand-guide.pdf', type: 'document', size: '1.1 MB', dimensions: '', date: 'Mar 3' },
		{ id: 'm4', name: 'team-photo.png', type: 'image', size: '3.8 MB', dimensions: '3200x2400', date: 'Mar 2' },
		{ id: 'm5', name: 'icon-set.svg', type: 'image', size: '24 KB', dimensions: '512x512', date: 'Mar 1' },
		{ id: 'm6', name: 'podcast-ep12.mp3', type: 'audio', size: '32 MB', dimensions: '', date: 'Feb 28' },
		{ id: 'm7', name: 'feature-preview.gif', type: 'image', size: '5.2 MB', dimensions: '800x600', date: 'Feb 27' },
		{ id: 'm8', name: 'release-notes.md', type: 'document', size: '8 KB', dimensions: '', date: 'Feb 26' },
	];

	const calendarItems = [
		{ day: 0, items: [{ title: 'Weekly Newsletter', type: 'email', status: 'scheduled' }] },
		{ day: 1, items: [{ title: 'Platform Update Blog', type: 'blog', status: 'draft' }, { title: 'Social: Feature Launch', type: 'social', status: 'scheduled' }] },
		{ day: 2, items: [] },
		{ day: 3, items: [{ title: 'Case Study: Acme Corp', type: 'page', status: 'draft' }] },
		{ day: 4, items: [{ title: 'API Docs v2.1', type: 'docs', status: 'scheduled' }, { title: 'Social: Tips Thread', type: 'social', status: 'draft' }] },
		{ day: 5, items: [] },
		{ day: 6, items: [{ title: 'Monthly Recap', type: 'blog', status: 'scheduled' }] },
	];

	const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const topContent = [
		{ title: 'Getting Started Guide', views: 12480, engagement: 87, timeOnPage: '4:23', trend: 'up' },
		{ title: 'API Reference', views: 8920, engagement: 72, timeOnPage: '6:45', trend: 'up' },
		{ title: 'Pricing Page', views: 6340, engagement: 64, timeOnPage: '2:18', trend: 'down' },
		{ title: 'Blog: AI Workflows', views: 4210, engagement: 91, timeOnPage: '5:12', trend: 'up' },
		{ title: 'Changelog', views: 3890, engagement: 58, timeOnPage: '1:45', trend: 'stable' },
	];

	function getTypeColor(type: string) {
		const colors: Record<string, string> = {
			blog: '#3b82f6', page: '#8b5cf6', docs: '#06b6d4', email: '#f59e0b', social: '#ec4899'
		};
		return colors[type] || '#6b7280';
	}

	function getStatusColor(status: string) {
		const colors: Record<string, string> = {
			published: '#22c55e', draft: '#6b7280', scheduled: '#f59e0b', archived: '#9ca3af'
		};
		return colors[status] || '#6b7280';
	}

	function getMediaIcon(type: string) {
		const icons: Record<string, string> = {
			image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
			video: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
			audio: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
			document: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
		};
		return icons[type] || icons.document;
	}
</script>

<section class="ds-section">

	<!-- ═══ 1. CONTENT DASHBOARD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Content Dashboard</h3>
		<p class="ds-card__sub">CMS overview with content stats, recent activity, and quick actions for content teams.</p>

		<div class="co-dashboard">
			<!-- Stats Row -->
			<div class="co-stats">
				{#each contentStats as stat}
					<div class="co-stat-card">
						<div class="co-stat-card__value">{stat.value}</div>
						<div class="co-stat-card__label">{stat.label}</div>
						<div class="co-stat-card__change" class:co-stat-card__change--up={stat.change.startsWith('+')} class:co-stat-card__change--zero={stat.change === '0'}>
							{stat.change === '0' ? '--' : stat.change}
						</div>
					</div>
				{/each}
			</div>

			<!-- Quick Actions -->
			<div class="co-actions">
				<button class="btn-pill btn-pill-primary btn-pill-sm">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					New Post
				</button>
				<button class="btn-pill btn-pill-secondary btn-pill-sm">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
					New Page
				</button>
				<button class="btn-pill btn-pill-ghost btn-pill-sm">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
					Upload Media
				</button>
			</div>

			<!-- Filter Tabs -->
			<div class="co-tabs">
				{#each ['all', 'blog', 'page', 'docs', 'email'] as tab}
					<button class="co-tab" class:co-tab--active={activeTab === tab} onclick={() => activeTab = tab}>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				{/each}
			</div>

			<!-- Content List -->
			<div class="co-list">
				{#each recentContent.filter(c => activeTab === 'all' || c.type === activeTab) as item}
					<div class="co-list-item" class:co-list-item--selected={selectedContent === item.id} onclick={() => selectedContent = item.id}>
						<div class="co-list-item__type" style="background: {getTypeColor(item.type)}">{item.type.slice(0, 2).toUpperCase()}</div>
						<div class="co-list-item__info">
							<div class="co-list-item__title">{item.title}</div>
							<div class="co-list-item__meta">{item.author} · {item.date}</div>
						</div>
						<div class="co-list-item__status" style="color: {getStatusColor(item.status)}">{item.status}</div>
						{#if item.views > 0}
							<div class="co-list-item__views">{item.views.toLocaleString()} views</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 2. CONTENT EDITOR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Content Editor</h3>
		<p class="ds-card__sub">Block-based content editor with metadata sidebar, SEO preview, and publishing controls.</p>

		<div class="co-editor">
			<!-- Editor Toolbar -->
			<div class="co-editor__toolbar">
				<div class="co-editor__toolbar-left">
					<button class="co-editor__tool-btn" class:co-editor__tool-btn--active={editorTab === 'content'} onclick={() => editorTab = 'content'}>Content</button>
					<button class="co-editor__tool-btn" class:co-editor__tool-btn--active={editorTab === 'seo'} onclick={() => editorTab = 'seo'}>SEO</button>
					<button class="co-editor__tool-btn" class:co-editor__tool-btn--active={editorTab === 'settings'} onclick={() => editorTab = 'settings'}>Settings</button>
				</div>
				<div class="co-editor__toolbar-right">
					<span class="co-editor__word-count">847 words · 4 min read</span>
					<span class="co-editor__status-badge co-editor__status-badge--draft">Draft</span>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Save Draft</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm">Publish</button>
				</div>
			</div>

			<div class="co-editor__body">
				<!-- Main Content Area -->
				<div class="co-editor__content">
					<input class="co-editor__title-input" value="Building AI-Powered Workflows" readonly />
					<div class="co-editor__slug">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/><path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"/></svg>
						<span>/blog/building-ai-powered-workflows</span>
					</div>

					<!-- Blocks -->
					<div class="co-blocks">
						{#each editorBlocks as block}
							<div class="co-block co-block--{block.type}">
								{#if block.type === 'heading'}
									<h2 class="co-block__heading">{block.content}</h2>
								{:else if block.type === 'heading-2'}
									<h3 class="co-block__heading2">{block.content}</h3>
								{:else if block.type === 'paragraph'}
									<p class="co-block__text">{block.content}</p>
								{:else if block.type === 'image'}
									<div class="co-block__image">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
										<span>{block.alt}</span>
										<span class="co-block__image-size">{block.dimensions}</span>
									</div>
								{:else if block.type === 'code'}
									<div class="co-block__code">
										<div class="co-block__code-header">
											<span class="co-block__code-lang">{block.language}</span>
										</div>
										<pre class="co-block__code-body">{block.content}</pre>
									</div>
								{:else if block.type === 'callout'}
									<div class="co-block__callout">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
										<span>{block.content}</span>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Sidebar -->
				<div class="co-editor__sidebar">
					<div class="co-editor__sidebar-section">
						<div class="co-editor__sidebar-label">Author</div>
						<div class="co-editor__sidebar-value co-editor__author">
							<div class="co-editor__author-avatar">SC</div>
							Sarah Chen
						</div>
					</div>
					<div class="co-editor__sidebar-section">
						<div class="co-editor__sidebar-label">Category</div>
						<div class="co-editor__sidebar-value">Engineering</div>
					</div>
					<div class="co-editor__sidebar-section">
						<div class="co-editor__sidebar-label">Tags</div>
						<div class="co-editor__tags">
							<span class="co-tag">AI</span>
							<span class="co-tag">Workflows</span>
							<span class="co-tag">Automation</span>
							<span class="co-tag co-tag--add">+</span>
						</div>
					</div>
					<div class="co-editor__sidebar-section">
						<div class="co-editor__sidebar-label">Publish Date</div>
						<div class="co-editor__sidebar-value">Mar 8, 2026 · 9:00 AM</div>
					</div>
					<div class="co-editor__sidebar-section">
						<div class="co-editor__sidebar-label">SEO Score</div>
						<div class="co-editor__seo-score">
							<div class="co-editor__seo-bar">
								<div class="co-editor__seo-fill" style="width: {seoScore}%; background: {seoScore >= 80 ? '#22c55e' : seoScore >= 60 ? '#f59e0b' : '#ef4444'}"></div>
							</div>
							<span style="color: {seoScore >= 80 ? '#22c55e' : seoScore >= 60 ? '#f59e0b' : '#ef4444'}">{seoScore}/100</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. MEDIA LIBRARY ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Media Library</h3>
		<p class="ds-card__sub">File management with grid/list views, upload dropzone, and type-based filtering.</p>

		<div class="co-media">
			<!-- Media Toolbar -->
			<div class="co-media__toolbar">
				<div class="co-media__search">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
					<input class="co-media__search-input" placeholder="Search files..." />
				</div>
				<div class="co-media__filters">
					<button class="co-media__filter-btn co-media__filter-btn--active">All</button>
					<button class="co-media__filter-btn">Images</button>
					<button class="co-media__filter-btn">Video</button>
					<button class="co-media__filter-btn">Docs</button>
				</div>
				<div class="co-media__view-toggle">
					<button class="co-media__view-btn" class:co-media__view-btn--active={mediaView === 'grid'} onclick={() => mediaView = 'grid'}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
					</button>
					<button class="co-media__view-btn" class:co-media__view-btn--active={mediaView === 'list'} onclick={() => mediaView = 'list'}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
					</button>
				</div>
			</div>

			<!-- Upload Dropzone -->
			<div class="co-media__dropzone">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
				<span>Drop files here or click to upload</span>
				<span class="co-media__dropzone-hint">JPG, PNG, SVG, MP4, PDF up to 50MB</span>
			</div>

			<!-- Grid View -->
			{#if mediaView === 'grid'}
				<div class="co-media__grid">
					{#each mediaFiles as file}
						<div class="co-media__card">
							<div class="co-media__card-preview">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d={getMediaIcon(file.type)}/></svg>
							</div>
							<div class="co-media__card-info">
								<div class="co-media__card-name">{file.name}</div>
								<div class="co-media__card-meta">{file.size}{file.dimensions ? ` · ${file.dimensions}` : ''}</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="co-media__list-view">
					{#each mediaFiles as file}
						<div class="co-media__list-row">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d={getMediaIcon(file.type)}/></svg>
							<span class="co-media__list-name">{file.name}</span>
							<span class="co-media__list-type">{file.type}</span>
							<span class="co-media__list-size">{file.size}</span>
							<span class="co-media__list-date">{file.date}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══ 4. CONTENT CALENDAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Content Calendar</h3>
		<p class="ds-card__sub">Editorial calendar with weekly view, content type coding, and scheduling controls.</p>

		<div class="co-calendar">
			<div class="co-calendar__header">
				<h4 class="co-calendar__title">Week of Mar 3 - 9, 2026</h4>
				<div class="co-calendar__nav">
					<button class="co-calendar__nav-btn" onclick={() => calendarWeek--}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7"/></svg>
					</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => calendarWeek = 0}>Today</button>
					<button class="co-calendar__nav-btn" onclick={() => calendarWeek++}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg>
					</button>
				</div>
			</div>

			<div class="co-calendar__grid">
				{#each calendarItems as day, i}
					<div class="co-calendar__day" class:co-calendar__day--today={i === 2 && calendarWeek === 0}>
						<div class="co-calendar__day-header">
							<span class="co-calendar__day-name">{dayNames[i]}</span>
							<span class="co-calendar__day-num">{3 + i + calendarWeek * 7}</span>
						</div>
						<div class="co-calendar__day-items">
							{#each day.items as item}
								<div class="co-calendar__item" style="border-left: 3px solid {getTypeColor(item.type)}">
									<div class="co-calendar__item-title">{item.title}</div>
									<div class="co-calendar__item-meta">
										<span class="co-calendar__item-type" style="color: {getTypeColor(item.type)}">{item.type}</span>
										<span class="co-calendar__item-status" style="color: {getStatusColor(item.status)}">{item.status}</span>
									</div>
								</div>
							{/each}
							{#if day.items.length === 0}
								<div class="co-calendar__empty">No content</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Legend -->
			<div class="co-calendar__legend">
				{#each [['Blog', '#3b82f6'], ['Page', '#8b5cf6'], ['Docs', '#06b6d4'], ['Email', '#f59e0b'], ['Social', '#ec4899']] as [label, color]}
					<div class="co-calendar__legend-item">
						<div class="co-calendar__legend-dot" style="background: {color}"></div>
						<span>{label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 5. SEO & ANALYTICS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">SEO &amp; Analytics</h3>
		<p class="ds-card__sub">Content performance metrics, SEO scoring, and top-performing content insights.</p>

		<div class="co-analytics">
			<!-- SEO Preview -->
			<div class="co-seo-preview">
				<div class="co-seo-preview__header">
					<span class="co-seo-preview__label">Search Preview</span>
					<div class="co-seo-preview__score-circle">
						<svg width="40" height="40" viewBox="0 0 40 40">
							<circle cx="20" cy="20" r="16" fill="none" stroke="var(--dbd)" stroke-width="3"/>
							<circle cx="20" cy="20" r="16" fill="none" stroke="#22c55e" stroke-width="3" stroke-dasharray="{82 * 1.005}" stroke-dashoffset="{100.5 - 82 * 1.005}" transform="rotate(-90 20 20)" stroke-linecap="round"/>
						</svg>
						<span class="co-seo-preview__score-num">82</span>
					</div>
				</div>
				<div class="co-seo-preview__result">
					<div class="co-seo-preview__url">miosa.app/blog/building-ai-powered-workflows</div>
					<div class="co-seo-preview__title">Building AI-Powered Workflows | MIOSA Blog</div>
					<div class="co-seo-preview__desc">Modern business platforms need intelligent automation that adapts to how teams actually work. Learn three proven patterns for AI agent integration.</div>
				</div>
				<div class="co-seo-preview__meta-counts">
					<div class="co-seo-meta-item">
						<span class="co-seo-meta-item__label">Title</span>
						<span class="co-seo-meta-item__count" style="color: #22c55e">48 / 60</span>
					</div>
					<div class="co-seo-meta-item">
						<span class="co-seo-meta-item__label">Description</span>
						<span class="co-seo-meta-item__count" style="color: #22c55e">142 / 160</span>
					</div>
					<div class="co-seo-meta-item">
						<span class="co-seo-meta-item__label">Keywords</span>
						<span class="co-seo-meta-item__count" style="color: #f59e0b">3 found</span>
					</div>
				</div>
			</div>

			<!-- Top Content Table -->
			<div class="co-analytics__table">
				<div class="co-analytics__table-header">
					<span class="co-analytics__col co-analytics__col--title">Content</span>
					<span class="co-analytics__col co-analytics__col--views">Views</span>
					<span class="co-analytics__col co-analytics__col--eng">Engagement</span>
					<span class="co-analytics__col co-analytics__col--time">Avg. Time</span>
					<span class="co-analytics__col co-analytics__col--trend">Trend</span>
				</div>
				{#each topContent as item}
					<div class="co-analytics__table-row">
						<span class="co-analytics__col co-analytics__col--title">{item.title}</span>
						<span class="co-analytics__col co-analytics__col--views">{item.views.toLocaleString()}</span>
						<span class="co-analytics__col co-analytics__col--eng">
							<div class="co-analytics__eng-bar">
								<div class="co-analytics__eng-fill" style="width: {item.engagement}%; background: {item.engagement >= 80 ? '#22c55e' : item.engagement >= 60 ? '#f59e0b' : '#ef4444'}"></div>
							</div>
							{item.engagement}%
						</span>
						<span class="co-analytics__col co-analytics__col--time">{item.timeOnPage}</span>
						<span class="co-analytics__col co-analytics__col--trend">
							{#if item.trend === 'up'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M7 17l5-5 5 5M7 7l5 5 5-5"/></svg>
							{:else if item.trend === 'down'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M7 7l5 5 5-5M7 17l5-5 5 5"/></svg>
							{:else}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dt3)" stroke-width="2"><path d="M5 12h14"/></svg>
							{/if}
						</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

</section>

<style>
	/* ═══ CONTENT DASHBOARD ═══ */
	.co-dashboard { display: flex; flex-direction: column; gap: 20px; }

	.co-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
	}
	.co-stat-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 12px;
		padding: 16px;
		text-align: center;
	}
	.co-stat-card__value {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}
	.co-stat-card__label {
		font-size: 0.75rem;
		color: var(--dt3);
		margin-top: 2px;
	}
	.co-stat-card__change {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--dt3);
		margin-top: 6px;
	}
	.co-stat-card__change--up { color: #22c55e; }
	.co-stat-card__change--zero { color: var(--dt4); }

	.co-actions {
		display: flex;
		gap: 8px;
	}
	.co-actions .btn-pill { display: inline-flex; align-items: center; gap: 6px; }

	.co-tabs {
		display: flex;
		gap: 4px;
		border-bottom: 1px solid var(--dbd2);
		padding-bottom: 0;
	}
	.co-tab {
		padding: 8px 16px;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--dt3);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	.co-tab:hover { color: var(--dt); }
	.co-tab--active { color: var(--dt); border-bottom-color: var(--dt); }

	.co-list { display: flex; flex-direction: column; gap: 2px; }
	.co-list-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.15s ease;
	}
	.co-list-item:hover { background: var(--dbg2); }
	.co-list-item--selected { background: var(--dbg2); }
	.co-list-item__type {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.5625rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}
	.co-list-item__info { flex: 1; min-width: 0; }
	.co-list-item__title { font-size: 0.8125rem; font-weight: 500; color: var(--dt); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.co-list-item__meta { font-size: 0.6875rem; color: var(--dt3); margin-top: 2px; }
	.co-list-item__status { font-size: 0.6875rem; font-weight: 600; text-transform: capitalize; }
	.co-list-item__views { font-size: 0.6875rem; color: var(--dt3); font-variant-numeric: tabular-nums; white-space: nowrap; }

	/* ═══ CONTENT EDITOR ═══ */
	.co-editor {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
	}
	.co-editor__toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 16px;
		border-bottom: 1px solid var(--dbd2);
		gap: 12px;
		flex-wrap: wrap;
	}
	.co-editor__toolbar-left,
	.co-editor__toolbar-right {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.co-editor__tool-btn {
		padding: 4px 12px;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--dt3);
		background: none;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
	.co-editor__tool-btn:hover { color: var(--dt); background: var(--dbg2); }
	.co-editor__tool-btn--active { color: var(--dt); background: var(--dbg2); }
	.co-editor__word-count { font-size: 0.6875rem; color: var(--dt4); }
	.co-editor__status-badge {
		font-size: 0.625rem;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.co-editor__status-badge--draft { background: rgba(107, 114, 128, 0.15); color: #6b7280; }
	.co-editor__status-badge--published { background: rgba(34, 197, 94, 0.15); color: #22c55e; }

	.co-editor__body {
		display: grid;
		grid-template-columns: 1fr 240px;
		min-height: 400px;
	}
	.co-editor__content {
		padding: 24px;
		border-right: 1px solid var(--dbd2);
	}
	.co-editor__title-input {
		display: block;
		width: 100%;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--dt);
		background: none;
		border: none;
		outline: none;
		padding: 0;
		margin-bottom: 8px;
	}
	.co-editor__slug {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.75rem;
		color: var(--dt3);
		margin-bottom: 24px;
	}

	.co-blocks { display: flex; flex-direction: column; gap: 16px; }
	.co-block { position: relative; }
	.co-block__heading { font-size: 1.25rem; font-weight: 700; color: var(--dt); margin: 0; }
	.co-block__heading2 { font-size: 1rem; font-weight: 600; color: var(--dt); margin: 0; }
	.co-block__text { font-size: 0.875rem; color: var(--dt2); line-height: 1.7; margin: 0; }
	.co-block__image {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 20px;
		background: var(--dbg2);
		border: 1px dashed var(--dbd);
		border-radius: 8px;
		color: var(--dt3);
		font-size: 0.8125rem;
	}
	.co-block__image-size { font-size: 0.6875rem; color: var(--dt4); margin-left: auto; }
	.co-block__code {
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--dbd);
	}
	.co-block__code-header {
		display: flex;
		align-items: center;
		padding: 6px 12px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd2);
	}
	.co-block__code-lang { font-size: 0.6875rem; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em; }
	.co-block__code-body {
		padding: 12px 16px;
		font-size: 0.75rem;
		line-height: 1.6;
		color: var(--dt2);
		background: var(--dbg2);
		margin: 0;
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		overflow-x: auto;
	}
	.co-block__callout {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 16px;
		background: rgba(59, 130, 246, 0.06);
		border-left: 3px solid #3b82f6;
		border-radius: 0 8px 8px 0;
		font-size: 0.8125rem;
		color: var(--dt2);
		line-height: 1.6;
	}
	.co-block__callout svg { flex-shrink: 0; margin-top: 2px; color: #3b82f6; }

	/* Editor Sidebar */
	.co-editor__sidebar {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.co-editor__sidebar-section { }
	.co-editor__sidebar-label { font-size: 0.6875rem; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
	.co-editor__sidebar-value { font-size: 0.8125rem; color: var(--dt); }
	.co-editor__author { display: flex; align-items: center; gap: 8px; }
	.co-editor__author-avatar {
		width: 24px;
		height: 24px;
		border-radius: 9999px;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: #fff;
		font-size: 0.5625rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.co-editor__tags { display: flex; flex-wrap: wrap; gap: 4px; }
	.co-tag {
		padding: 2px 8px;
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--dt2);
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 9999px;
	}
	.co-tag--add { cursor: pointer; color: var(--dt3); }
	.co-tag--add:hover { background: var(--dbg3); }
	.co-editor__seo-score { display: flex; align-items: center; gap: 8px; }
	.co-editor__seo-bar { flex: 1; height: 4px; background: var(--dbd2); border-radius: 9999px; overflow: hidden; }
	.co-editor__seo-fill { height: 100%; border-radius: 9999px; transition: width 0.3s ease; }

	/* ═══ MEDIA LIBRARY ═══ */
	.co-media { display: flex; flex-direction: column; gap: 16px; }
	.co-media__toolbar {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.co-media__search {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 8px;
		flex: 1;
		min-width: 160px;
	}
	.co-media__search svg { color: var(--dt3); flex-shrink: 0; }
	.co-media__search-input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-size: 0.8125rem;
		color: var(--dt);
	}
	.co-media__filters { display: flex; gap: 4px; }
	.co-media__filter-btn {
		padding: 4px 10px;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--dt3);
		background: none;
		border: 1px solid transparent;
		border-radius: 6px;
		cursor: pointer;
	}
	.co-media__filter-btn:hover { color: var(--dt); background: var(--dbg2); }
	.co-media__filter-btn--active { color: var(--dt); background: var(--dbg2); border-color: var(--dbd2); }
	.co-media__view-toggle { display: flex; gap: 2px; }
	.co-media__view-btn {
		padding: 6px;
		background: none;
		border: 1px solid transparent;
		border-radius: 6px;
		cursor: pointer;
		color: var(--dt3);
		display: flex;
	}
	.co-media__view-btn:hover { color: var(--dt); }
	.co-media__view-btn--active { color: var(--dt); background: var(--dbg2); border-color: var(--dbd2); }

	.co-media__dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 32px;
		border: 2px dashed var(--dbd);
		border-radius: 12px;
		color: var(--dt3);
		font-size: 0.8125rem;
		cursor: pointer;
		transition: border-color 0.15s ease, background 0.15s ease;
	}
	.co-media__dropzone:hover { border-color: var(--dt3); background: var(--dbg2); }
	.co-media__dropzone-hint { font-size: 0.6875rem; color: var(--dt4); }

	.co-media__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}
	.co-media__card {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}
	.co-media__card:hover { border-color: var(--dbd); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06); }
	.co-media__card-preview {
		height: 140px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--dbg3);
		color: var(--dt3);
	}
	.co-media__card-info { padding: 10px 12px; }
	.co-media__card-name { font-size: 0.75rem; font-weight: 500; color: var(--dt); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.co-media__card-meta { font-size: 0.6875rem; color: var(--dt4); margin-top: 2px; }

	.co-media__list-view { display: flex; flex-direction: column; gap: 2px; }
	.co-media__list-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		border-radius: 6px;
		cursor: pointer;
		color: var(--dt3);
	}
	.co-media__list-row:hover { background: var(--dbg2); }
	.co-media__list-name { flex: 1; font-size: 0.8125rem; font-weight: 500; color: var(--dt); }
	.co-media__list-type { font-size: 0.6875rem; color: var(--dt3); text-transform: capitalize; width: 60px; }
	.co-media__list-size { font-size: 0.6875rem; color: var(--dt3); width: 60px; text-align: right; font-variant-numeric: tabular-nums; }
	.co-media__list-date { font-size: 0.6875rem; color: var(--dt4); width: 50px; text-align: right; }

	/* ═══ CONTENT CALENDAR ═══ */
	.co-calendar { display: flex; flex-direction: column; gap: 16px; }
	.co-calendar__header { display: flex; align-items: center; justify-content: space-between; }
	.co-calendar__title { font-size: 0.875rem; font-weight: 600; color: var(--dt); margin: 0; }
	.co-calendar__nav { display: flex; align-items: center; gap: 8px; }
	.co-calendar__nav-btn {
		padding: 6px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 6px;
		cursor: pointer;
		color: var(--dt2);
		display: flex;
	}
	.co-calendar__nav-btn:hover { background: var(--dbg3); }

	.co-calendar__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
	}
	.co-calendar__day {
		min-height: 120px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 8px;
		padding: 8px;
	}
	.co-calendar__day--today { border-color: var(--dt); }
	.co-calendar__day-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
	.co-calendar__day-name { font-size: 0.6875rem; font-weight: 600; color: var(--dt3); }
	.co-calendar__day-num { font-size: 0.6875rem; color: var(--dt2); font-variant-numeric: tabular-nums; }
	.co-calendar__day-items { display: flex; flex-direction: column; gap: 4px; }
	.co-calendar__item {
		padding: 6px 8px;
		background: var(--dbg);
		border-radius: 4px;
	}
	.co-calendar__item-title { font-size: 0.6875rem; font-weight: 500; color: var(--dt); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.co-calendar__item-meta { display: flex; gap: 8px; margin-top: 2px; }
	.co-calendar__item-type { font-size: 0.5625rem; font-weight: 600; text-transform: uppercase; }
	.co-calendar__item-status { font-size: 0.5625rem; text-transform: capitalize; }
	.co-calendar__empty { font-size: 0.6875rem; color: var(--dt4); text-align: center; padding: 8px 0; }

	.co-calendar__legend { display: flex; gap: 16px; justify-content: center; }
	.co-calendar__legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.6875rem; color: var(--dt3); }
	.co-calendar__legend-dot { width: 8px; height: 8px; border-radius: 9999px; }

	/* ═══ SEO & ANALYTICS ═══ */
	.co-analytics { display: flex; flex-direction: column; gap: 20px; }

	.co-seo-preview {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 12px;
		padding: 20px;
	}
	.co-seo-preview__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
	.co-seo-preview__label { font-size: 0.75rem; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em; }
	.co-seo-preview__score-circle { position: relative; display: flex; align-items: center; justify-content: center; }
	.co-seo-preview__score-num { position: absolute; font-size: 0.6875rem; font-weight: 700; color: #22c55e; }

	.co-seo-preview__result { margin-bottom: 16px; }
	.co-seo-preview__url { font-size: 0.75rem; color: #22c55e; margin-bottom: 4px; }
	.co-seo-preview__title { font-size: 1rem; font-weight: 600; color: #3b82f6; margin-bottom: 4px; }
	.co-seo-preview__desc { font-size: 0.8125rem; color: var(--dt2); line-height: 1.5; }

	.co-seo-preview__meta-counts { display: flex; gap: 24px; }
	.co-seo-meta-item { display: flex; flex-direction: column; gap: 2px; }
	.co-seo-meta-item__label { font-size: 0.6875rem; color: var(--dt3); }
	.co-seo-meta-item__count { font-size: 0.75rem; font-weight: 600; font-variant-numeric: tabular-nums; }

	.co-analytics__table {
		border: 1px solid var(--dbd2);
		border-radius: 10px;
		overflow: hidden;
	}
	.co-analytics__table-header {
		display: flex;
		align-items: center;
		padding: 10px 16px;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd2);
	}
	.co-analytics__table-header .co-analytics__col {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.co-analytics__table-row {
		display: flex;
		align-items: center;
		padding: 10px 16px;
		border-bottom: 1px solid var(--dbd2);
		transition: background 0.1s ease;
	}
	.co-analytics__table-row:last-child { border-bottom: none; }
	.co-analytics__table-row:hover { background: var(--dbg2); }
	.co-analytics__col { font-size: 0.8125rem; color: var(--dt2); }
	.co-analytics__col--title { flex: 1; font-weight: 500; color: var(--dt); }
	.co-analytics__col--views { width: 80px; text-align: right; font-variant-numeric: tabular-nums; }
	.co-analytics__col--eng { width: 120px; display: flex; align-items: center; gap: 8px; }
	.co-analytics__col--time { width: 70px; text-align: right; font-variant-numeric: tabular-nums; }
	.co-analytics__col--trend { width: 40px; display: flex; justify-content: center; }
	.co-analytics__eng-bar { width: 48px; height: 4px; background: var(--dbd2); border-radius: 9999px; overflow: hidden; }
	.co-analytics__eng-fill { height: 100%; border-radius: 9999px; }
</style>
