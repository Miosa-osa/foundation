<script lang="ts">
	// ── 1. Task Master Panel ──────────────────────────────────────
	let tmActiveProject = $state('AI Video Studio');

	const tmFolders = [
		{ label: 'Doc', icon: 'file', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', count: 0 },
		{ label: 'Assets', icon: 'folder', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', count: 0 },
		{ label: 'Chat History', icon: 'message', color: '#f97316', bg: 'rgba(249,115,22,0.12)', count: 0 },
		{ label: 'Misc.', icon: 'box', color: '#eab308', bg: 'rgba(234,179,8,0.12)', count: 0 },
	];

	// ── 2. App Search Modal ───────────────────────────────────────
	let searchQuery = $state('');

	const recentThumbs = [
		{ label: 'Flux Ultra', grad: 'linear-gradient(135deg, #6366f1, #4f46e5)', icon: '⚡' },
		{ label: 'Video Gen', grad: 'linear-gradient(135deg, #0ea5e9, #0284c7)', icon: '▶' },
		{ label: 'Canvas AI', grad: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', icon: '✦' },
		{ label: 'Doc Writer', grad: 'linear-gradient(135deg, #22c55e, #16a34a)', icon: 'edit' },
		{ label: 'Data Lens', grad: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: '◎' },
		{ label: 'CodeBot', grad: 'linear-gradient(135deg, #ec4899, #db2777)', icon: '◈' },
	];

	const appList = [
		{ label: 'Flux Ultra',   grad: 'linear-gradient(135deg, #6366f1, #4f46e5)', icon: '⚡', cat: 'AI' },
		{ label: 'Video Gen',    grad: 'linear-gradient(135deg, #0ea5e9, #0284c7)', icon: '▶', cat: 'Video' },
		{ label: 'Canvas AI',    grad: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', icon: '✦', cat: 'Design' },
		{ label: 'Doc Writer',   grad: 'linear-gradient(135deg, #22c55e, #16a34a)', icon: 'edit', cat: 'Writing' },
		{ label: 'Data Lens',    grad: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: '◎', cat: 'Analytics' },
		{ label: 'CodeBot',      grad: 'linear-gradient(135deg, #ec4899, #db2777)', icon: '◈', cat: 'Dev' },
		{ label: 'AudioCraft',   grad: 'linear-gradient(135deg, #14b8a6, #0d9488)', icon: '♫', cat: 'Audio' },
		{ label: 'Summarizer',   grad: 'linear-gradient(135deg, #a78bfa, #7c3aed)', icon: '◉', cat: 'AI' },
	];

	const filteredApps = $derived(
		searchQuery.trim() === ''
			? appList
			: appList.filter(a => a.label.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	// ── 3. Project Card Grid ──────────────────────────────────────
	type ProjectStatus = 'Draft' | 'Published' | 'Running';

	const projects: {
		name: string;
		grad: string;
		icon: string;
		status: ProjectStatus;
		modified: string;
	}[] = [
		{ name: 'AI Video Studio',    grad: 'linear-gradient(135deg, #6366f1, #4f46e5)', icon: '▶', status: 'Running',   modified: '2 hours ago' },
		{ name: 'Brand Kit 2025',     grad: 'linear-gradient(135deg, #ec4899, #db2777)', icon: '✦', status: 'Published', modified: 'Yesterday' },
		{ name: 'Onboarding Flow',    grad: 'linear-gradient(135deg, #0ea5e9, #0284c7)', icon: '◎', status: 'Draft',     modified: '3 days ago' },
		{ name: 'Data Pipeline',      grad: 'linear-gradient(135deg, #22c55e, #16a34a)', icon: '⬡', status: 'Running',   modified: '5 hours ago' },
		{ name: 'Content Calendar',   grad: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: '◉', status: 'Draft',     modified: '1 week ago' },
		{ name: 'API Docs Site',      grad: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', icon: '◈', status: 'Published', modified: '2 days ago' },
	];

	let openProjectMenu = $state<string | null>(null);

	function toggleProjectMenu(name: string) {
		openProjectMenu = openProjectMenu === name ? null : name;
	}

	// ── 4. Folder Card Expandable ────────────────────────────────
	const folderItems = [
		{
			label: 'Documents',
			icon: 'file',
			color: '#3b82f6',
			bg: 'rgba(59,130,246,0.12)',
			count: 12,
			files: ['Q4 Report.pdf', 'Brand Guidelines.doc', 'Product Roadmap.pdf'],
		},
		{
			label: 'Assets',
			icon: 'folder',
			color: '#ef4444',
			bg: 'rgba(239,68,68,0.12)',
			count: 8,
			files: ['hero-banner.png', 'logo-dark.svg', 'icon-set.zip'],
		},
		{
			label: 'Chat History',
			icon: 'message',
			color: '#f97316',
			bg: 'rgba(249,115,22,0.12)',
			count: 24,
			files: ['Session Apr 14.json', 'Session Apr 12.json', 'Session Apr 10.json'],
		},
		{
			label: 'Misc.',
			icon: 'box',
			color: '#eab308',
			bg: 'rgba(234,179,8,0.12)',
			count: 5,
			files: ['scratch-notes.txt', 'ideas.md', 'temp-export.csv'],
		},
	];

	let expandedFolder = $state<string | null>(null);

	function toggleFolder(label: string) {
		expandedFolder = expandedFolder === label ? null : label;
	}

	// ── 5. Action Bar ─────────────────────────────────────────────
	// No state needed — purely visual
</script>

<section class="ds-section">
	<h2 class="ds-title">Task &amp; Project Cards</h2>
	<p class="ds-desc">Project management panels, folder cards, app search, and task organization patterns.</p>

	<!-- ── 1. Task Master Panel ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Task Master Panel</h3>
		<p class="ds-card__sub">Project header with action buttons and a 2×2 folder card grid.</p>
		<div class="tp-panel" role="dialog" aria-label="Task Master panel">
			<!-- Panel header bar -->
			<div class="tp-panel__bar">
				<span class="tp-panel__bar-title">Task Master</span>
			</div>

			<!-- Project header -->
			<div class="tp-panel__project-header">
				<div class="tp-panel__project-left">
					<div class="tp-panel__project-icon" aria-hidden="true">
						<span class="tp-panel__project-icon-glyph">▶</span>
					</div>
					<span class="tp-panel__project-name">{tmActiveProject}</span>
				</div>
				<div class="tp-panel__project-actions">
					<button class="tp-btn tp-btn--icon" aria-label="Delete project">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
					</button>
					<button class="tp-btn tp-btn--outline" aria-label="Continue project">Continue</button>
					<button class="tp-btn tp-btn--filled" aria-label="Open project">Open</button>
				</div>
			</div>

			<!-- Folder grid -->
			<div class="tp-panel__folder-grid" role="list" aria-label="Project folders">
				{#each tmFolders as folder (folder.label)}
					<div class="tp-folder-card" role="listitem" aria-label="{folder.label} folder">
						<div class="tp-folder-card__icon-wrap" style="background:{folder.bg};" aria-hidden="true">
							<span class="tp-folder-card__icon-emoji">
								{#if folder.icon === 'file'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
								{:else if folder.icon === 'folder'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
								{:else if folder.icon === 'message'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
								{:else if folder.icon === 'box'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
								{/if}
							</span>
							<div class="tp-folder-card__icon-color-tab" style="background:{folder.color};"></div>
						</div>
						<span class="tp-folder-card__label">{folder.label}</span>
						<span class="tp-folder-card__count">{folder.count} items</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 2. App Search Modal ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Search Modal</h3>
		<p class="ds-card__sub">Search input, recent thumbnail grid, and app list with create/filter/sort actions.</p>
		<div class="tp-search-modal" role="dialog" aria-label="App search">
			<!-- Search input -->
			<div class="tp-search-modal__input-row">
				<svg class="tp-search-modal__input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
				<input
					class="tp-search-modal__input"
					type="search"
					placeholder="Search apps..."
					bind:value={searchQuery}
					aria-label="Search apps"
				/>
				{#if searchQuery}
					<button
						class="tp-search-modal__clear"
						onclick={() => (searchQuery = '')}
						aria-label="Clear search"
					>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					</button>
				{/if}
			</div>

			{#if !searchQuery}
				<!-- Recent section -->
				<div class="tp-search-modal__section">
					<div class="tp-search-modal__section-header">
						<span class="tp-search-modal__section-label">Recent</span>
					</div>
					<ul class="tp-search-modal__recent-grid" aria-label="Recent apps" style="list-style:none;margin:0;padding:0;">
						{#each recentThumbs as app (app.label)}
							<li>
								<button class="tp-recent-thumb" aria-label="Open {app.label}">
									<div class="tp-recent-thumb__icon" style="background:{app.grad};" aria-hidden="true">
										<span class="tp-recent-thumb__glyph">{#if app.icon === 'edit'}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>{:else}{app.icon}{/if}</span>
									</div>
									<span class="tp-recent-thumb__label">{app.label}</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Apps section -->
			<div class="tp-search-modal__section">
				<div class="tp-search-modal__section-header">
					<span class="tp-search-modal__section-label">
						{searchQuery ? `Results (${filteredApps.length})` : 'Apps'}
					</span>
					<div class="tp-search-modal__actions" aria-label="App actions">
						<button class="tp-icon-action" aria-label="Create new app">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
						</button>
						<button class="tp-icon-action" aria-label="Filter apps">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
						</button>
						<button class="tp-icon-action" aria-label="Sort apps">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M11 18h2"/></svg>
						</button>
					</div>
				</div>
				<ul class="tp-search-modal__app-grid" aria-label="Apps" style="list-style:none;margin:0;padding:0;">
					{#each filteredApps as app (app.label)}
						<li>
							<button class="tp-app-item" aria-label="Open {app.label}">
								<div class="tp-app-item__icon" style="background:{app.grad};" aria-hidden="true">
									<span class="tp-app-item__glyph">{#if app.icon === 'edit'}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>{:else}{app.icon}{/if}</span>
								</div>
								<span class="tp-app-item__label">{app.label}</span>
								<span class="tp-app-item__cat">{app.cat}</span>
							</button>
						</li>
					{/each}
					{#if filteredApps.length === 0}
						<li class="tp-search-modal__empty" role="status" style="list-style:none;">No apps found</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>

	<!-- ── 3. Project Card Grid ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Project Card Grid</h3>
		<p class="ds-card__sub">Project cards with status badges, last modified metadata, and overflow action menus.</p>
		<div class="tp-project-grid" role="list" aria-label="Projects">
			{#each projects as project (project.name)}
				<article class="tp-project-card" role="listitem" aria-label="{project.name} project">
					<!-- Thumbnail -->
					<div class="tp-project-card__thumb" style="background:{project.grad};" aria-hidden="true">
						<span class="tp-project-card__thumb-glyph">{project.icon}</span>
					</div>
					<!-- Info -->
					<div class="tp-project-card__info">
						<div class="tp-project-card__name-row">
							<h4 class="tp-project-card__name">{project.name}</h4>
							<div class="tp-project-card__menu-wrap">
								<button
									class="tp-icon-action tp-icon-action--sm"
									aria-label="Actions for {project.name}"
									aria-expanded={openProjectMenu === project.name}
									onclick={() => toggleProjectMenu(project.name)}
								>
									<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
								</button>
								{#if openProjectMenu === project.name}
									<div class="tp-dropdown" role="menu" aria-label="Project actions">
										<button class="tp-dropdown__item" role="menuitem">Open</button>
										<button class="tp-dropdown__item" role="menuitem">Rename</button>
										<button class="tp-dropdown__item" role="menuitem">Duplicate</button>
										<div class="tp-dropdown__divider" aria-hidden="true"></div>
										<button class="tp-dropdown__item tp-dropdown__item--danger" role="menuitem">Delete</button>
									</div>
								{/if}
							</div>
						</div>
						<div class="tp-project-card__meta">
							<span
								class="tp-status-badge tp-status-badge--{project.status.toLowerCase()}"
								aria-label="Status: {project.status}"
							>{project.status}</span>
							<span class="tp-project-card__modified" aria-label="Last modified {project.modified}">{project.modified}</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 4. Expandable Folder Cards ──────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Expandable Folder Cards</h3>
		<p class="ds-card__sub">Click a folder to reveal its file list. Colored icon with accent tab, item count badge.</p>
		<div class="tp-folder-list" role="list" aria-label="Folders">
			{#each folderItems as folder (folder.label)}
				<div class="tp-folder-row" role="listitem">
					<button
						class="tp-folder-row__trigger"
						aria-expanded={expandedFolder === folder.label}
						aria-controls="folder-{folder.label}"
						onclick={() => toggleFolder(folder.label)}
					>
						<div class="tp-folder-row__icon-wrap" style="background:{folder.bg};" aria-hidden="true">
							<span class="tp-folder-row__emoji">
								{#if folder.icon === 'file'}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
								{:else if folder.icon === 'folder'}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
								{:else if folder.icon === 'message'}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
								{:else if folder.icon === 'box'}
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
								{/if}
							</span>
							<div class="tp-folder-row__tab" style="background:{folder.color};"></div>
						</div>
						<span class="tp-folder-row__label">{folder.label}</span>
						<span class="tp-folder-row__count" aria-label="{folder.count} items">{folder.count}</span>
						<svg
							class="tp-folder-row__chevron"
							class:tp-folder-row__chevron--open={expandedFolder === folder.label}
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>
					{#if expandedFolder === folder.label}
						<ul
							class="tp-folder-row__files"
							id="folder-{folder.label}"
							role="list"
							aria-label="{folder.label} files"
						>
							{#each folder.files as file (file)}
								<li class="tp-folder-row__file">
									<svg class="tp-folder-row__file-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
									<span class="tp-folder-row__file-name">{file}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 5. Continue / Open Action Bar ───────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Continue / Open Action Bar</h3>
		<p class="ds-card__sub">Inline action row with Continue (outline), Open (filled blue), and Delete (icon) buttons. Used in project headers and cards.</p>
		<div class="tp-action-bars">
			<!-- Variant A: compact inline bar -->
			<div class="tp-action-bar" role="toolbar" aria-label="Project actions">
				<div class="tp-action-bar__label">
					<div class="tp-action-bar__proj-icon" style="background:linear-gradient(135deg,#6366f1,#4f46e5);" aria-hidden="true">
						<span style="font-size:13px;color:rgba(255,255,255,0.9);line-height:1;">▶</span>
					</div>
					<span class="tp-action-bar__proj-name">AI Video Studio</span>
				</div>
				<div class="tp-action-bar__buttons">
					<button class="tp-btn tp-btn--icon" aria-label="Delete AI Video Studio">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
					</button>
					<button class="tp-btn tp-btn--outline" aria-label="Continue AI Video Studio">Continue</button>
					<button class="tp-btn tp-btn--filled" aria-label="Open AI Video Studio">Open</button>
				</div>
			</div>

			<!-- Variant B: card-level action bar -->
			<div class="tp-action-bar tp-action-bar--card" role="toolbar" aria-label="Card project actions">
				<div class="tp-action-bar__label">
					<div class="tp-action-bar__proj-icon" style="background:linear-gradient(135deg,#ec4899,#db2777);" aria-hidden="true">
						<span style="font-size:13px;color:rgba(255,255,255,0.9);line-height:1;">✦</span>
					</div>
					<div>
						<div class="tp-action-bar__proj-name">Brand Kit 2025</div>
						<div class="tp-action-bar__proj-sub">Published · 2 days ago</div>
					</div>
				</div>
				<div class="tp-action-bar__buttons">
					<button class="tp-btn tp-btn--icon tp-btn--sm" aria-label="Delete Brand Kit 2025">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
					</button>
					<button class="tp-btn tp-btn--outline tp-btn--sm" aria-label="Continue Brand Kit 2025">Continue</button>
					<button class="tp-btn tp-btn--filled tp-btn--sm" aria-label="Open Brand Kit 2025">Open</button>
				</div>
			</div>

			<!-- Variant C: icon-only strip -->
			<div class="tp-action-bar tp-action-bar--strip" role="toolbar" aria-label="Quick actions">
				<button class="tp-btn tp-btn--icon" aria-label="Delete">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
				</button>
				<button class="tp-btn tp-btn--icon" aria-label="Duplicate">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
				</button>
				<button class="tp-btn tp-btn--icon" aria-label="Share">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
				</button>
				<div class="tp-action-bar__sep" aria-hidden="true"></div>
				<button class="tp-btn tp-btn--outline" aria-label="Continue">Continue</button>
				<button class="tp-btn tp-btn--filled" aria-label="Open">Open</button>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Shared Buttons ─────────────────────────────────────────── */
	.tp-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		border-radius: 8px;
		border: 1px solid transparent;
		cursor: pointer;
		font-size: 12px;
		font-weight: 600;
		height: 30px;
		padding: 0 12px;
		transition: background 0.13s, border-color 0.13s, color 0.13s, opacity 0.13s;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.tp-btn--outline {
		background: transparent;
		border-color: var(--dbd2);
		color: var(--dt);
	}
	.tp-btn--outline:hover {
		background: var(--dbg2);
		border-color: var(--dt3);
	}
	.tp-btn--filled {
		background: #2563eb;
		border-color: #2563eb;
		color: #fff;
	}
	.tp-btn--filled:hover {
		background: #1d4ed8;
		border-color: #1d4ed8;
	}
	.tp-btn--icon {
		width: 30px;
		padding: 0;
		background: transparent;
		border-color: var(--dbd);
		color: var(--dt3);
	}
	.tp-btn--icon:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
		color: var(--dt);
	}
	.tp-btn--sm {
		height: 26px;
		font-size: 11px;
		padding: 0 10px;
	}
	.tp-btn--sm.tp-btn--icon {
		width: 26px;
		padding: 0;
	}

	/* ─── Shared Icon Action ─────────────────────────────────────── */
	.tp-icon-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 7px;
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.12s, color 0.12s;
		flex-shrink: 0;
	}
	.tp-icon-action:hover {
		background: var(--dbg2);
		color: var(--dt);
	}
	.tp-icon-action--sm {
		width: 24px;
		height: 24px;
		border-radius: 6px;
	}

	/* ─── 1. Task Master Panel ───────────────────────────────────── */
	.tp-panel {
		max-width: 480px;
		border-radius: 16px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
	}
	.tp-panel__bar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 16px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}
	.tp-panel__bar-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.tp-panel__project-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.tp-panel__project-left {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}
	.tp-panel__project-icon {
		width: 32px;
		height: 32px;
		border-radius: 9px;
		background: linear-gradient(135deg, #6366f1, #4f46e5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.tp-panel__project-icon-glyph {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1;
	}
	.tp-panel__project-name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tp-panel__project-actions {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}
	.tp-panel__folder-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		padding: 16px;
	}

	/* Folder card inside panel */
	.tp-folder-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 7px;
		padding: 14px 10px 12px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.13s, box-shadow 0.13s;
		text-align: center;
	}
	.tp-folder-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	}
	.tp-folder-card__icon-wrap {
		position: relative;
		width: 44px;
		height: 40px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.tp-folder-card__icon-emoji {
		font-size: 20px;
		line-height: 1;
		position: relative;
		z-index: 1;
	}
	.tp-folder-card__icon-color-tab {
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 100%;
		border-radius: 3px 0 0 3px;
	}
	.tp-folder-card__label {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.tp-folder-card__count {
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* ─── 2. App Search Modal ────────────────────────────────────── */
	.tp-search-modal {
		max-width: 440px;
		border-radius: 16px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
	}
	.tp-search-modal__input-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd);
	}
	.tp-search-modal__input-icon {
		color: var(--dt3);
		flex-shrink: 0;
	}
	.tp-search-modal__input {
		flex: 1;
		border: none;
		background: transparent;
		outline: none;
		font-size: 13px;
		color: var(--dt);
		font-family: inherit;
	}
	.tp-search-modal__input::placeholder {
		color: var(--dt4);
	}
	.tp-search-modal__clear {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 9999px;
		border: none;
		background: var(--dbg2);
		color: var(--dt3);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.12s, color 0.12s;
	}
	.tp-search-modal__clear:hover {
		background: var(--dbd2);
		color: var(--dt);
	}
	.tp-search-modal__section {
		padding: 10px 14px 4px;
	}
	.tp-search-modal__section + .tp-search-modal__section {
		border-top: 1px solid var(--dbd);
	}
	.tp-search-modal__section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.tp-search-modal__section-label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
	}
	.tp-search-modal__actions {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.tp-search-modal__recent-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 8px;
		margin-bottom: 10px;
	}
	.tp-recent-thumb {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: opacity 0.12s;
	}
	.tp-recent-thumb:hover {
		opacity: 0.8;
	}
	.tp-recent-thumb__icon {
		width: 40px;
		height: 40px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.tp-recent-thumb__glyph {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1;
	}
	.tp-recent-thumb__label {
		font-size: 9px;
		font-weight: 600;
		color: var(--dt3);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 48px;
	}
	.tp-search-modal__app-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2px;
		margin-bottom: 10px;
	}
	.tp-app-item {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 8px 10px;
		border-radius: 10px;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: background 0.12s;
		text-align: left;
	}
	.tp-app-item:hover {
		background: var(--dbg2);
	}
	.tp-app-item__icon {
		width: 34px;
		height: 34px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.tp-app-item__glyph {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1;
	}
	.tp-app-item__label {
		flex: 1;
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tp-app-item__cat {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
		flex-shrink: 0;
	}
	.tp-search-modal__empty {
		grid-column: 1 / -1;
		padding: 20px;
		text-align: center;
		font-size: 12px;
		color: var(--dt3);
	}

	/* ─── 3. Project Card Grid ───────────────────────────────────── */
	.tp-project-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		max-width: 600px;
	}
	.tp-project-card {
		display: flex;
		flex-direction: column;
		border-radius: 14px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
		transition: border-color 0.13s, box-shadow 0.13s;
	}
	.tp-project-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 3px 14px rgba(0, 0, 0, 0.07);
	}
	.tp-project-card__thumb {
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.tp-project-card__thumb-glyph {
		font-size: 28px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1;
	}
	.tp-project-card__info {
		padding: 10px 10px 10px;
	}
	.tp-project-card__name-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 4px;
		margin-bottom: 7px;
		position: relative;
	}
	.tp-project-card__name {
		margin: 0;
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		line-height: 1.3;
		flex: 1;
		min-width: 0;
	}
	.tp-project-card__menu-wrap {
		position: relative;
		flex-shrink: 0;
	}
	.tp-project-card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}
	.tp-project-card__modified {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* Status badges */
	.tp-status-badge {
		display: inline-flex;
		align-items: center;
		height: 18px;
		padding: 0 7px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.01em;
		flex-shrink: 0;
	}
	.tp-status-badge--draft {
		background: rgba(107, 114, 128, 0.12);
		color: #6b7280;
	}
	.tp-status-badge--published {
		background: rgba(34, 197, 94, 0.12);
		color: #16a34a;
	}
	.tp-status-badge--running {
		background: rgba(59, 130, 246, 0.12);
		color: #2563eb;
	}

	/* Dropdown */
	.tp-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		z-index: 10;
		min-width: 130px;
		border-radius: 10px;
		border: 1px solid var(--dbd2);
		background: var(--dbg);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
		overflow: hidden;
		padding: 4px;
	}
	.tp-dropdown__item {
		display: block;
		width: 100%;
		padding: 7px 10px;
		border: none;
		background: transparent;
		color: var(--dt);
		font-size: 12px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		border-radius: 7px;
		transition: background 0.1s;
	}
	.tp-dropdown__item:hover {
		background: var(--dbg2);
	}
	.tp-dropdown__item--danger {
		color: #ef4444;
	}
	.tp-dropdown__item--danger:hover {
		background: rgba(239, 68, 68, 0.08);
	}
	.tp-dropdown__divider {
		height: 1px;
		background: var(--dbd);
		margin: 3px 0;
	}

	/* ─── 4. Expandable Folder List ──────────────────────────────── */
	.tp-folder-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-width: 440px;
	}
	.tp-folder-row {
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
	}
	.tp-folder-row__trigger {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 10px 12px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s;
	}
	.tp-folder-row__trigger:hover {
		background: var(--dbg2);
	}
	.tp-folder-row__icon-wrap {
		position: relative;
		width: 36px;
		height: 34px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		overflow: hidden;
	}
	.tp-folder-row__emoji {
		font-size: 17px;
		line-height: 1;
		position: relative;
		z-index: 1;
	}
	.tp-folder-row__tab {
		position: absolute;
		top: 0;
		left: 0;
		width: 3px;
		height: 100%;
		border-radius: 3px 0 0 3px;
	}
	.tp-folder-row__label {
		flex: 1;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.tp-folder-row__count {
		display: inline-flex;
		align-items: center;
		height: 20px;
		min-width: 20px;
		padding: 0 6px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 10px;
		font-weight: 700;
		color: var(--dt3);
		flex-shrink: 0;
	}
	.tp-folder-row__chevron {
		color: var(--dt3);
		flex-shrink: 0;
		transition: transform 0.18s ease;
	}
	.tp-folder-row__chevron--open {
		transform: rotate(180deg);
	}
	.tp-folder-row__files {
		list-style: none;
		margin: 0;
		padding: 2px 12px 10px 58px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		border-top: 1px solid var(--dbd);
	}
	.tp-folder-row__file {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 6px 0;
	}
	.tp-folder-row__file-icon {
		color: var(--dt4);
		flex-shrink: 0;
	}
	.tp-folder-row__file-name {
		font-size: 12px;
		color: var(--dt2);
		font-weight: 500;
	}

	/* ─── 5. Action Bars ─────────────────────────────────────────── */
	.tp-action-bars {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 560px;
	}
	.tp-action-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 10px 14px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
	}
	.tp-action-bar--card {
		border-radius: 14px;
		padding: 12px 14px;
	}
	.tp-action-bar--strip {
		background: var(--dbg2);
	}
	.tp-action-bar__label {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
		flex: 1;
	}
	.tp-action-bar__proj-icon {
		width: 32px;
		height: 32px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.tp-action-bar__proj-name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tp-action-bar__proj-sub {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
		margin-top: 1px;
	}
	.tp-action-bar__buttons {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}
	.tp-action-bar__sep {
		width: 1px;
		height: 20px;
		background: var(--dbd2);
		margin: 0 2px;
		flex-shrink: 0;
	}

	/* ─── Dark mode status badge overrides ──────────────────────── */
	:global(.dark) .tp-status-badge--published {
		background: rgba(34, 197, 94, 0.15);
		color: #4ade80;
	}
	:global(.dark) .tp-status-badge--running {
		background: rgba(59, 130, 246, 0.15);
		color: #60a5fa;
	}
	:global(.dark) .tp-status-badge--draft {
		background: rgba(107, 114, 128, 0.15);
		color: #9ca3af;
	}
</style>
