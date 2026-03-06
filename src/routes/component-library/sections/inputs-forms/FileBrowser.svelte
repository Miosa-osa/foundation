<script lang="ts">
	// ── Demo 1: Folder Cards Grid ──────────────────────────────────────────────
	const folders = [
		{ label: 'Documents', count: 142, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', tab: '#2563eb' },
		{ label: 'Assets', count: 87, color: '#ec4899', bg: 'rgba(236,72,153,0.12)', tab: '#db2777' },
		{ label: 'Chat History', count: 34, color: '#f97316', bg: 'rgba(249,115,22,0.12)', tab: '#ea580c' },
		{ label: 'Misc', count: 21, color: '#6b7280', bg: 'rgba(107,114,128,0.12)', tab: '#4b5563' },
	];

	// ── Demo 2 & 3: File List / Grid ──────────────────────────────────────────
	type FileType = 'doc' | 'img' | 'code' | 'pdf';
	const files: { name: string; ext: string; size: string; modified: string; type: FileType; grad: string }[] = [
		{ name: 'Q4 Report', ext: 'pdf', size: '2.4 MB', modified: 'Nov 12', type: 'pdf', grad: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' },
		{ name: 'hero-banner', ext: 'png', size: '1.1 MB', modified: 'Nov 10', type: 'img', grad: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)' },
		{ name: 'api-service', ext: 'ts', size: '18 KB', modified: 'Nov 9', type: 'code', grad: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
		{ name: 'Product Brief', ext: 'doc', size: '340 KB', modified: 'Nov 7', type: 'doc', grad: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' },
		{ name: 'config', ext: 'json', size: '4 KB', modified: 'Nov 5', type: 'code', grad: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' },
		{ name: 'team-photo', ext: 'jpg', size: '3.7 MB', modified: 'Oct 28', type: 'img', grad: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)' },
	];

	let hoveredFile = $state<string | null>(null);
	let openMenu = $state<string | null>(null);

	// ── Demo 4: Breadcrumb ─────────────────────────────────────────────────────
	let breadcrumbs = $state(['Home', 'Documents', 'Projects', 'Design Files']);
	let activeCrumb = $state(3);

	function navigateTo(i: number) {
		activeCrumb = i;
		breadcrumbs = breadcrumbs.slice(0, i + 1);
	}

	// ── Demo 6: Storage Usage ──────────────────────────────────────────────────
	const storageCategories = [
		{ label: 'Documents', gb: 3.1, color: '#3b82f6' },
		{ label: 'Images', gb: 2.8, color: '#22c55e' },
		{ label: 'Videos', gb: 1.5, color: '#f97316' },
		{ label: 'Other', gb: 0.8, color: '#8b5cf6' },
	];
	const totalStorage = 15;
	const usedStorage = 8.2;
	const usedPct = $derived((usedStorage / totalStorage) * 100);

	// ── Demo 7: Recent Files ───────────────────────────────────────────────────
	const recentFiles = [
		{ name: 'Q4 Report.pdf', time: '2 hours ago', grad: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' },
		{ name: 'hero-banner.png', time: '5 hours ago', grad: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)' },
		{ name: 'api-service.ts', time: 'Yesterday', grad: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
		{ name: 'Product Brief.doc', time: '2 days ago', grad: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' },
		{ name: 'config.json', time: '3 days ago', grad: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' },
		{ name: 'team-photo.jpg', time: '1 week ago', grad: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)' },
	];

	// ── Demo 8: Full File Manager ──────────────────────────────────────────────
	let fmView = $state<'grid' | 'list'>('grid');
	let fmSort = $state('name');
	let fmSearch = $state('');
	let fmCrumbs = $state(['Home', 'Documents', 'Projects']);

	const fmFolders = [
		{ label: 'Design Files', count: 14, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', tab: '#2563eb' },
		{ label: 'Assets', count: 87, color: '#ec4899', bg: 'rgba(236,72,153,0.12)', tab: '#db2777' },
	];

	const fmFiles = [
		{ name: 'Q4 Report', ext: 'pdf', size: '2.4 MB', modified: 'Nov 12', type: 'pdf' as FileType, grad: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' },
		{ name: 'hero-banner', ext: 'png', size: '1.1 MB', modified: 'Nov 10', type: 'img' as FileType, grad: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)' },
		{ name: 'api-service', ext: 'ts', size: '18 KB', modified: 'Nov 9', type: 'code' as FileType, grad: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
	];

	const fmFiltered = $derived(
		fmFiles.filter(f =>
			fmSearch === '' || f.name.toLowerCase().includes(fmSearch.toLowerCase())
		)
	);

	function fmNavigate(i: number) {
		fmCrumbs = fmCrumbs.slice(0, i + 1);
	}

	// ── Shared helpers ─────────────────────────────────────────────────────────
	function fileTypeColor(type: FileType): string {
		const map: Record<FileType, string> = {
			pdf: '#ef4444',
			img: '#22c55e',
			code: '#3b82f6',
			doc: '#6366f1',
		};
		return map[type];
	}

	function fileTypeLabel(type: FileType): string {
		const map: Record<FileType, string> = {
			pdf: 'PDF',
			img: 'IMG',
			code: 'CODE',
			doc: 'DOC',
		};
		return map[type];
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">File Browser</h2>
	<p class="ds-desc">Folder cards, file lists, grids, breadcrumbs, file-type indicators, storage meters, and full file manager compositions.</p>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 1. Folder Cards Grid                                           -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Folder Cards Grid</h3>
		<p class="ds-card__sub">CSS-drawn folder shapes with category labels and item counts</p>
		<div class="fb-folder-grid">
			{#each folders as folder}
				<button class="fb-folder-card" style="--folder-color:{folder.color};--folder-bg:{folder.bg};--folder-tab:{folder.tab};">
					<div class="fb-folder-icon">
						<div class="fb-folder-body">
							<div class="fb-folder-tab"></div>
							<div class="fb-folder-face">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:{folder.color}; opacity:0.7;">
									<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
								</svg>
							</div>
						</div>
					</div>
					<div class="fb-folder-meta">
						<span class="fb-folder-name">{folder.label}</span>
						<span class="fb-folder-count">{folder.count} items</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 2. File List View                                              -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">File List View</h3>
		<p class="ds-card__sub">Rows with type icon, metadata, and action menu — hover to highlight</p>
		<div class="fb-file-list">
			{#each files as file}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="fb-file-row"
					class:fb-file-row--hovered={hoveredFile === file.name}
					onmouseenter={() => hoveredFile = file.name}
					onmouseleave={() => hoveredFile = null}
				>
					<div class="fb-file-icon-sm" style="background:{fileTypeColor(file.type)}1a; color:{fileTypeColor(file.type)};">
						<span class="fb-file-icon-label">{fileTypeLabel(file.type)}</span>
					</div>
					<div class="fb-file-info">
						<span class="fb-file-name">{file.name}.{file.ext}</span>
						<span class="fb-file-meta">{file.size} · Modified {file.modified}</span>
					</div>
					<div class="fb-file-actions">
						<button
							class="fb-menu-btn"
							aria-label="File options for {file.name}"
							onclick={() => openMenu = openMenu === file.name ? null : file.name}
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
							</svg>
						</button>
						{#if openMenu === file.name}
							<div class="fb-dropdown" role="menu">
								<button class="fb-dropdown-item" role="menuitem">Open</button>
								<button class="fb-dropdown-item" role="menuitem">Rename</button>
								<button class="fb-dropdown-item" role="menuitem">Download</button>
								<div class="fb-dropdown-sep"></div>
								<button class="fb-dropdown-item fb-dropdown-item--danger" role="menuitem">Delete</button>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 3. File Grid View                                              -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">File Grid View</h3>
		<p class="ds-card__sub">Thumbnail cards with gradient preview, filename, and file size</p>
		<div class="fb-file-grid">
			{#each files as file}
				<button class="fb-grid-card" aria-label="Open {file.name}">
					<div class="fb-grid-preview" style="background:{file.grad};">
						<div class="fb-grid-ext">.{file.ext}</div>
					</div>
					<div class="fb-grid-meta">
						<span class="fb-grid-name">{file.name}</span>
						<span class="fb-grid-size">{file.size}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 4. Breadcrumb Path                                             -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Breadcrumb Path</h3>
		<p class="ds-card__sub">Clickable file path segments — click a crumb to navigate up</p>
		<nav class="fb-breadcrumb" aria-label="File path">
			{#each breadcrumbs as crumb, i}
				{#if i > 0}
					<span class="fb-breadcrumb-sep" aria-hidden="true">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M9 18l6-6-6-6"/>
						</svg>
					</span>
				{/if}
				<button
					class="fb-breadcrumb-item"
					class:fb-breadcrumb-item--active={i === activeCrumb}
					onclick={() => navigateTo(i)}
					aria-current={i === activeCrumb ? 'page' : undefined}
				>
					{#if i === 0}
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
							<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
						</svg>
					{/if}
					{crumb}
				</button>
			{/each}
		</nav>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 5. File Type Icons                                             -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">File Type Icons</h3>
		<p class="ds-card__sub">Rounded rectangle icon shapes by extension with accent colours</p>
		<div class="fb-type-grid">
			{#each [
				{ ext: '.pdf', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
				{ ext: '.doc', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
				{ ext: '.png', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
				{ ext: '.js',  color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
				{ ext: '.json',color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
				{ ext: '.csv', color: '#14b8a6', bg: 'rgba(20,184,166,0.12)' },
			] as t}
				<div class="fb-type-item">
					<div class="fb-type-icon" style="background:{t.bg}; color:{t.color}; border-color:{t.color}33;">
						<span class="fb-type-corner" style="background:{t.color};"></span>
						<span class="fb-type-ext">{t.ext.replace('.','')}</span>
					</div>
					<span class="fb-type-label">{t.ext}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 6. Storage Usage                                               -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Storage Usage</h3>
		<p class="ds-card__sub">Segmented bar with category breakdown</p>
		<div class="fb-storage" style="max-width:520px;">
			<div class="fb-storage-header">
				<span class="fb-storage-used">{usedStorage} GB</span>
				<span class="fb-storage-total">of {totalStorage} GB used</span>
			</div>
			<div class="fb-storage-bar" role="meter" aria-valuenow={usedStorage} aria-valuemin={0} aria-valuemax={totalStorage} aria-label="Storage usage">
				{#each storageCategories as cat}
					<div
						class="fb-storage-segment"
						style="width:{(cat.gb / totalStorage) * 100}%; background:{cat.color};"
						title="{cat.label}: {cat.gb} GB"
					></div>
				{/each}
			</div>
			<div class="fb-storage-legend">
				{#each storageCategories as cat}
					<div class="fb-storage-legend-item">
						<span class="fb-storage-dot" style="background:{cat.color};"></span>
						<span class="fb-storage-legend-label">{cat.label}</span>
						<span class="fb-storage-legend-val">{cat.gb} GB</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 7. Recent Files                                                -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Recent Files</h3>
		<p class="ds-card__sub">Horizontally scrollable row of recently opened file cards</p>
		<div class="fb-recent-row" role="list">
			{#each recentFiles as rf}
				<button class="fb-recent-card" aria-label="Open {rf.name}">
					<div class="fb-recent-preview" style="background:{rf.grad};"></div>
					<div class="fb-recent-info">
						<span class="fb-recent-name">{rf.name}</span>
						<span class="fb-recent-time">Opened {rf.time}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════ -->
	<!-- 8. In Context: File Manager                                    -->
	<!-- ═══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: File Manager</h3>
		<p class="ds-card__sub">Full composition — search, breadcrumb, view toggle, sort, mixed grid, storage bar</p>
		<div class="fb-manager">
			<!-- Toolbar -->
			<div class="fb-manager-toolbar">
				<div class="fb-manager-search-wrap">
					<svg class="fb-manager-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
					</svg>
					<input
						class="fb-manager-search"
						type="search"
						placeholder="Search files…"
						bind:value={fmSearch}
						aria-label="Search files"
					/>
				</div>
				<div class="fb-manager-controls">
					<!-- View toggle -->
					<div class="fb-view-toggle" role="group" aria-label="View mode">
						<button
							class="fb-view-btn"
							class:fb-view-btn--active={fmView === 'grid'}
							onclick={() => fmView = 'grid'}
							aria-label="Grid view"
							aria-pressed={fmView === 'grid'}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
								<rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
							</svg>
						</button>
						<button
							class="fb-view-btn"
							class:fb-view-btn--active={fmView === 'list'}
							onclick={() => fmView = 'list'}
							aria-label="List view"
							aria-pressed={fmView === 'list'}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
								<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
							</svg>
						</button>
					</div>
					<!-- Sort -->
					<select class="fb-sort-select" bind:value={fmSort} aria-label="Sort files">
						<option value="name">Name</option>
						<option value="size">Size</option>
						<option value="modified">Modified</option>
					</select>
				</div>
			</div>

			<!-- Breadcrumb -->
			<nav class="fb-manager-breadcrumb" aria-label="Current path">
				{#each fmCrumbs as crumb, i}
					{#if i > 0}
						<span class="fb-breadcrumb-sep" aria-hidden="true">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M9 18l6-6-6-6"/>
							</svg>
						</span>
					{/if}
					<button
						class="fb-breadcrumb-item"
						class:fb-breadcrumb-item--active={i === fmCrumbs.length - 1}
						onclick={() => fmNavigate(i)}
						aria-current={i === fmCrumbs.length - 1 ? 'page' : undefined}
					>
						{#if i === 0}
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
								<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
							</svg>
						{/if}
						{crumb}
					</button>
				{/each}
			</nav>

			<!-- File area -->
			{#if fmView === 'grid'}
				<div class="fb-manager-grid">
					<!-- Folders first -->
					{#each fmFolders as folder}
						<button class="fb-folder-card fb-folder-card--sm" style="--folder-color:{folder.color};--folder-bg:{folder.bg};--folder-tab:{folder.tab};" aria-label="Open {folder.label} folder">
							<div class="fb-folder-icon fb-folder-icon--sm">
								<div class="fb-folder-body">
									<div class="fb-folder-tab"></div>
									<div class="fb-folder-face">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:{folder.color}; opacity:0.7;">
											<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
										</svg>
									</div>
								</div>
							</div>
							<div class="fb-folder-meta">
								<span class="fb-folder-name">{folder.label}</span>
								<span class="fb-folder-count">{folder.count} items</span>
							</div>
						</button>
					{/each}
					<!-- Files -->
					{#each fmFiltered as file}
						<button class="fb-grid-card fb-grid-card--sm" aria-label="Open {file.name}">
							<div class="fb-grid-preview fb-grid-preview--sm" style="background:{file.grad};">
								<div class="fb-grid-ext">.{file.ext}</div>
							</div>
							<div class="fb-grid-meta">
								<span class="fb-grid-name">{file.name}</span>
								<span class="fb-grid-size">{file.size}</span>
							</div>
						</button>
					{/each}
					{#if fmFiltered.length === 0}
						<div class="fb-empty" style="grid-column:1/-1;">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--dt4); margin-bottom:8px;">
								<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
							</svg>
							<span>No files match your search</span>
						</div>
					{/if}
				</div>
			{:else}
				<div class="fb-manager-list">
					{#each fmFolders as folder}
						<button class="fb-file-row fb-file-row--folder" aria-label="Open {folder.label} folder">
							<div class="fb-file-icon-sm" style="background:{folder.bg}; color:{folder.color};">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
								</svg>
							</div>
							<div class="fb-file-info">
								<span class="fb-file-name">{folder.label}</span>
								<span class="fb-file-meta">{folder.count} items</span>
							</div>
						</button>
					{/each}
					{#each fmFiltered as file}
						<div class="fb-file-row" role="row">
							<div class="fb-file-icon-sm" style="background:{fileTypeColor(file.type)}1a; color:{fileTypeColor(file.type)};">
								<span class="fb-file-icon-label">{fileTypeLabel(file.type)}</span>
							</div>
							<div class="fb-file-info">
								<span class="fb-file-name">{file.name}.{file.ext}</span>
								<span class="fb-file-meta">{file.size} · Modified {file.modified}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Storage footer -->
			<div class="fb-manager-footer">
				<div class="fb-manager-footer-bar">
					{#each storageCategories as cat}
						<div
							class="fb-storage-segment"
							style="width:{(cat.gb / totalStorage) * 100}%; background:{cat.color};"
							title="{cat.label}: {cat.gb} GB"
						></div>
					{/each}
				</div>
				<div class="fb-manager-footer-label">
					<span style="color:var(--dt);">{usedStorage} GB</span>
					<span style="color:var(--dt3);"> of {totalStorage} GB used</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Folder Grid ──────────────────────────────────────────────────────── */
	.fb-folder-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		max-width: 480px;
	}

	.fb-folder-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		padding: 16px;
		border-radius: 14px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s, transform 0.1s;
		text-align: left;
	}

	.fb-folder-card:hover {
		background: var(--dbg3);
		border-color: var(--folder-color);
		transform: translateY(-1px);
	}

	.fb-folder-card--sm {
		padding: 12px;
		gap: 8px;
	}

	.fb-folder-icon {
		width: 52px;
		height: 44px;
		position: relative;
	}

	.fb-folder-icon--sm {
		width: 44px;
		height: 36px;
	}

	.fb-folder-body {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.fb-folder-tab {
		position: absolute;
		top: 0;
		left: 0;
		width: 40%;
		height: 6px;
		border-radius: 3px 3px 0 0;
		background: var(--folder-tab);
	}

	.fb-folder-face {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 5px;
		border-radius: 3px 8px 8px 8px;
		background: var(--folder-bg);
		border: 1px solid var(--folder-color);
		border-top-left-radius: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fb-folder-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.fb-folder-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.fb-folder-count {
		font-size: 11px;
		color: var(--dt3);
	}

	/* ─── File List ────────────────────────────────────────────────────────── */
	.fb-file-list {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
	}

	.fb-file-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 11px 14px;
		border-bottom: 1px solid var(--dbd);
		background: transparent;
		transition: background 0.1s;
		position: relative;
		cursor: default;
	}

	.fb-file-row:last-child {
		border-bottom: none;
	}

	.fb-file-row--hovered,
	.fb-file-row:hover {
		background: var(--dbg2);
	}

	.fb-file-row--folder {
		cursor: pointer;
		border: none;
		width: 100%;
		text-align: left;
		border-bottom: 1px solid var(--dbd);
	}

	.fb-file-row--folder:last-child {
		border-bottom: none;
	}

	.fb-file-icon-sm {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.fb-file-icon-label {
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.04em;
	}

	.fb-file-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.fb-file-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fb-file-meta {
		font-size: 11px;
		color: var(--dt3);
	}

	.fb-file-actions {
		position: relative;
		flex-shrink: 0;
	}

	.fb-menu-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
	}

	.fb-menu-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.fb-dropdown {
		position: absolute;
		right: 0;
		top: calc(100% + 4px);
		min-width: 120px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.18);
		z-index: 20;
		overflow: hidden;
		padding: 4px;
	}

	.fb-dropdown-item {
		display: block;
		width: 100%;
		padding: 7px 10px;
		font-size: 12px;
		color: var(--dt);
		background: transparent;
		border: none;
		border-radius: 6px;
		text-align: left;
		cursor: pointer;
		transition: background 0.1s;
	}

	.fb-dropdown-item:hover {
		background: var(--dbg2);
	}

	.fb-dropdown-item--danger {
		color: #ef4444;
	}

	.fb-dropdown-sep {
		height: 1px;
		background: var(--dbd);
		margin: 4px 0;
	}

	/* ─── File Grid ────────────────────────────────────────────────────────── */
	.fb-file-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		max-width: 560px;
	}

	.fb-grid-card {
		display: flex;
		flex-direction: column;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		overflow: hidden;
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.15s, transform 0.1s;
		text-align: left;
	}

	.fb-grid-card:hover {
		border-color: var(--dbd2);
		transform: translateY(-2px);
	}

	.fb-grid-preview {
		height: 80px;
		position: relative;
		display: flex;
		align-items: flex-end;
		padding: 8px;
	}

	.fb-grid-preview--sm {
		height: 60px;
	}

	.fb-grid-ext {
		font-size: 10px;
		font-weight: 700;
		color: rgba(255,255,255,0.85);
		background: rgba(0,0,0,0.25);
		padding: 2px 6px;
		border-radius: 4px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.fb-grid-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 10px 10px 10px;
	}

	.fb-grid-name {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fb-grid-size {
		font-size: 11px;
		color: var(--dt3);
	}

	/* ─── Breadcrumb ───────────────────────────────────────────────────────── */
	.fb-breadcrumb {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-wrap: wrap;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		max-width: 520px;
	}

	.fb-breadcrumb-sep {
		color: var(--dt4);
		display: flex;
		align-items: center;
		padding: 0 1px;
	}

	.fb-breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 3px 8px;
		border-radius: 6px;
		border: none;
		background: transparent;
		font-size: 13px;
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
	}

	.fb-breadcrumb-item:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.fb-breadcrumb-item--active {
		color: var(--dt);
		font-weight: 600;
		cursor: default;
		background: var(--dbg3);
	}

	.fb-breadcrumb-item--active:hover {
		background: var(--dbg3);
	}

	/* ─── File Type Icons ──────────────────────────────────────────────────── */
	.fb-type-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.fb-type-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.fb-type-icon {
		position: relative;
		width: 52px;
		height: 64px;
		border-radius: 8px;
		border: 1.5px solid;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 8px;
		overflow: hidden;
	}

	.fb-type-corner {
		position: absolute;
		top: 0;
		right: 0;
		width: 16px;
		height: 16px;
		clip-path: polygon(0 0, 100% 0, 100% 100%);
		opacity: 0.9;
	}

	.fb-type-ext {
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.fb-type-label {
		font-size: 11px;
		color: var(--dt3);
		font-family: monospace;
	}

	/* ─── Storage Usage ────────────────────────────────────────────────────── */
	.fb-storage {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.fb-storage-header {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.fb-storage-used {
		font-size: 22px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.02em;
	}

	.fb-storage-total {
		font-size: 13px;
		color: var(--dt3);
	}

	.fb-storage-bar {
		display: flex;
		height: 10px;
		border-radius: 6px;
		overflow: hidden;
		background: var(--dbg3);
		gap: 2px;
	}

	.fb-storage-segment {
		height: 100%;
		border-radius: 3px;
		transition: width 0.4s ease;
	}

	.fb-storage-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 20px;
	}

	.fb-storage-legend-item {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.fb-storage-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.fb-storage-legend-label {
		font-size: 12px;
		color: var(--dt2);
	}

	.fb-storage-legend-val {
		font-size: 12px;
		color: var(--dt3);
	}

	/* ─── Recent Files ─────────────────────────────────────────────────────── */
	.fb-recent-row {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding-bottom: 8px;
		scrollbar-width: thin;
		scrollbar-color: var(--dbd) transparent;
	}

	.fb-recent-row::-webkit-scrollbar {
		height: 4px;
	}

	.fb-recent-row::-webkit-scrollbar-track {
		background: transparent;
	}

	.fb-recent-row::-webkit-scrollbar-thumb {
		background: var(--dbd);
		border-radius: 2px;
	}

	.fb-recent-card {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 140px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		overflow: hidden;
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.15s, transform 0.1s;
		text-align: left;
	}

	.fb-recent-card:hover {
		border-color: var(--dbd2);
		transform: translateY(-2px);
	}

	.fb-recent-preview {
		height: 72px;
	}

	.fb-recent-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 9px 10px;
	}

	.fb-recent-name {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fb-recent-time {
		font-size: 10px;
		color: var(--dt3);
	}

	/* ─── File Manager (full composition) ─────────────────────────────────── */
	.fb-manager {
		border: 1px solid var(--dbd);
		border-radius: 16px;
		overflow: hidden;
		background: var(--dbg);
		display: flex;
		flex-direction: column;
	}

	.fb-manager-toolbar {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		flex-wrap: wrap;
	}

	.fb-manager-search-wrap {
		position: relative;
		flex: 1;
		min-width: 160px;
	}

	.fb-manager-search-icon {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--dt3);
		pointer-events: none;
	}

	.fb-manager-search {
		width: 100%;
		padding: 7px 12px 7px 32px;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		color: var(--dt);
		font-size: 13px;
		outline: none;
		transition: border-color 0.15s;
		box-sizing: border-box;
	}

	.fb-manager-search:focus {
		border-color: var(--dbd2);
	}

	.fb-manager-search::placeholder {
		color: var(--dt4);
	}

	.fb-manager-controls {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.fb-view-toggle {
		display: flex;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		overflow: hidden;
	}

	.fb-view-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
	}

	.fb-view-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.fb-view-btn--active {
		background: var(--dbg3);
		color: var(--dt);
	}

	.fb-sort-select {
		height: 32px;
		padding: 0 10px;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		color: var(--dt);
		font-size: 12px;
		cursor: pointer;
		outline: none;
		transition: border-color 0.15s;
	}

	.fb-sort-select:focus {
		border-color: var(--dbd2);
	}

	.fb-manager-breadcrumb {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 8px 14px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.fb-manager-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 10px;
		padding: 16px;
		min-height: 200px;
	}

	.fb-manager-list {
		display: flex;
		flex-direction: column;
		min-height: 200px;
	}

	.fb-manager-list .fb-file-row {
		border-bottom: 1px solid var(--dbd);
		cursor: pointer;
	}

	.fb-manager-list .fb-file-row:hover {
		background: var(--dbg2);
	}

	.fb-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 0;
		font-size: 13px;
		color: var(--dt3);
	}

	.fb-manager-footer {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 12px 16px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.fb-manager-footer-bar {
		display: flex;
		height: 6px;
		border-radius: 4px;
		overflow: hidden;
		background: var(--dbg3);
		gap: 2px;
	}

	.fb-manager-footer-label {
		font-size: 11px;
	}
</style>
