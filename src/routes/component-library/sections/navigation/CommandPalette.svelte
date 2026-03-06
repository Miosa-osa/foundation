<script lang="ts">
	// ── Overlay state ──────────────────────────────────────────────
	let overlayOpen = $state(false);
	let overlayQuery = $state('');

	// ── Recent searches ────────────────────────────────────────────
	const recents = ['Dashboard', 'New project', 'Settings'];

	// ── Result data ────────────────────────────────────────────────
	const allResults = [
		{ category: 'Pages',    icon: 'home',     label: 'Dashboard',        shortcut: '⌘D' },
		{ category: 'Pages',    icon: 'folder',   label: 'Projects',         shortcut: '⌘P' },
		{ category: 'Pages',    icon: 'users',    label: 'Team Members',     shortcut: '' },
		{ category: 'Actions',  icon: 'plus',     label: 'New Project',      shortcut: '⌘N' },
		{ category: 'Actions',  icon: 'upload',   label: 'Import Data',      shortcut: '' },
		{ category: 'Actions',  icon: 'share',    label: 'Share Workspace',  shortcut: '⌘S' },
		{ category: 'Settings', icon: 'sliders',  label: 'Preferences',      shortcut: '⌘,' },
		{ category: 'Settings', icon: 'key',      label: 'API Keys',         shortcut: '' },
		{ category: 'Settings', icon: 'bell',     label: 'Notifications',    shortcut: '' },
	];

	// ── Active index for overlay keyboard hint demo ────────────────
	let activeIndex = $state(0);

	// ── Filtered results ───────────────────────────────────────────
	const filteredResults = $derived(
		overlayQuery.trim() === ''
			? allResults
			: allResults.filter((r) =>
					r.label.toLowerCase().includes(overlayQuery.toLowerCase()) ||
					r.category.toLowerCase().includes(overlayQuery.toLowerCase())
			  )
	);

	const grouped = $derived(() => {
		const map = new Map<string, typeof allResults>();
		for (const r of filteredResults) {
			if (!map.has(r.category)) map.set(r.category, []);
			map.get(r.category)!.push(r);
		}
		return [...map.entries()];
	});

	function openOverlay() {
		overlayOpen = true;
		overlayQuery = '';
		activeIndex = 0;
	}

	function closeOverlay() {
		overlayOpen = false;
	}

	function handleOverlayKey(e: KeyboardEvent) {
		if (e.key === 'Escape') closeOverlay();
		if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, filteredResults.length - 1); }
		if (e.key === 'ArrowUp')   { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); }
	}
</script>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  REAL OVERLAY (portal-style, fixed)                            -->
<!-- ═══════════════════════════════════════════════════════════════ -->
{#if overlayOpen}
	<!-- Backdrop -->
	<button
		class="cp-backdrop"
		aria-label="Close command palette"
		onclick={closeOverlay}
		onkeydown={handleOverlayKey}
	></button>

	<!-- Dialog -->
	<div
		class="cp-dialog"
		role="dialog"
		aria-label="Command palette"
		aria-modal="true"
	>
		<!-- Search input -->
		<div class="cp-search">
			<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
			</svg>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				class="cp-input"
				type="text"
				placeholder="Search commands, pages, actions…"
				bind:value={overlayQuery}
				autofocus
				onkeydown={handleOverlayKey}
				aria-label="Search commands"
			/>
			{#if overlayQuery}
				<button class="cp-clear" onclick={() => overlayQuery = ''} aria-label="Clear search">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			{/if}
		</div>

		<!-- Results / empty state -->
		<div class="cp-results">
			{#if overlayQuery === '' }
				<!-- Recent searches -->
				<div class="cp-group-label">Recent</div>
				{#each recents as recent, i}
					<button
						class="cp-item"
						class:cp-item--active={i === activeIndex}
						onclick={closeOverlay}
					>
						<span class="cp-item__icon cp-item__icon--recent">
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
						</span>
						<span class="cp-item__label">{recent}</span>
					</button>
				{/each}
				<div class="cp-divider"></div>
			{/if}

			{#if filteredResults.length === 0}
				<div class="cp-empty">
					<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<p>No results for <strong>"{overlayQuery}"</strong></p>
					<span>Try a different search term</span>
				</div>
			{:else}
				{#each grouped() as [category, items]}
					<div class="cp-group-label">{category}</div>
					{#each items as item}
						{@const globalIdx = filteredResults.indexOf(item)}
						<button
							class="cp-item"
							class:cp-item--active={globalIdx === activeIndex}
							onclick={closeOverlay}
						>
							<span class="cp-item__icon">
								{#if item.icon === 'home'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
								{:else if item.icon === 'folder'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>
								{:else if item.icon === 'users'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
								{:else if item.icon === 'plus'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
								{:else if item.icon === 'upload'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
								{:else if item.icon === 'share'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
								{:else if item.icon === 'sliders'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
								{:else if item.icon === 'key'}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
								{:else}
									<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
								{/if}
							</span>
							<span class="cp-item__label">{item.label}</span>
							{#if item.shortcut}
								<kbd class="cp-kbd">{item.shortcut}</kbd>
							{/if}
						</button>
					{/each}
				{/each}
			{/if}
		</div>

		<!-- Footer -->
		<div class="cp-footer">
			<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">↑</kbd><kbd class="cp-kbd cp-kbd--xs">↓</kbd> Navigate</span>
			<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">↵</kbd> Open</span>
			<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">esc</kbd> Close</span>
		</div>
	</div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  SECTION                                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Command Palette</h2>
	<p class="ds-desc">
		Spotlight-style Cmd+K overlays — global search with grouped results, keyboard navigation,
		recent history, and an empty state. Built with glassmorphic layering.
	</p>

	<!-- ── Trigger card ──────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Live Demo</h3>
		<p class="ds-card__sub">Click the button to open the real overlay. Arrow keys and Esc are wired.</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary" onclick={openOverlay} aria-label="Open command palette">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				Open Palette
			</button>
			<div class="cp-trigger-hint">
				<kbd class="cp-kbd cp-kbd--hint">⌘</kbd>
				<kbd class="cp-kbd cp-kbd--hint">K</kbd>
				<span style="font-size: 12px; color: var(--dt2); margin-left: 4px;">to open</span>
			</div>
		</div>
	</div>

	<!-- ── Static mockup: default (with recents) ─────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Anatomy — Default State</h3>
		<p class="ds-card__sub">Search input, recent searches, grouped results, and footer hints.</p>
		<div class="ds-demo" style="justify-content: center; padding: 24px 0;">
			<div class="ds-preview-dark">
			<div class="cp-mock">
				<!-- Search -->
				<div class="cp-mock__search">
					<svg width="15" height="15" fill="none" stroke="#555" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<span style="font-size: 13px; color: #555;">Search commands…</span>
				</div>
				<!-- Recent -->
				<div style="padding: 8px;">
					<div class="cp-mock__label">Recent</div>
					{#each recents as r}
						<div class="cp-mock__item">
							<span class="cp-mock__icon">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							</span>
							<span style="font-size: 13px; color: rgba(255,255,255,0.75);">{r}</span>
						</div>
					{/each}
					<div class="cp-mock__divider"></div>
					<!-- Pages group -->
					<div class="cp-mock__label">Pages</div>
					<div class="cp-mock__item cp-mock__item--active">
						<span class="cp-mock__icon">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
						</span>
						<span style="font-size: 13px; color: #fff; flex: 1;">Dashboard</span>
						<kbd class="cp-kbd" style="font-size: 10px;">⌘D</kbd>
					</div>
					<div class="cp-mock__item">
						<span class="cp-mock__icon">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>
						</span>
						<span style="font-size: 13px; color: rgba(255,255,255,0.75); flex: 1;">Projects</span>
						<kbd class="cp-kbd" style="font-size: 10px;">⌘P</kbd>
					</div>
					<!-- Actions group -->
					<div class="cp-mock__label">Actions</div>
					<div class="cp-mock__item">
						<span class="cp-mock__icon">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
						</span>
						<span style="font-size: 13px; color: rgba(255,255,255,0.75); flex: 1;">New Project</span>
						<kbd class="cp-kbd" style="font-size: 10px;">⌘N</kbd>
					</div>
				</div>
				<!-- Footer -->
				<div class="cp-mock__footer">
					<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">↑</kbd><kbd class="cp-kbd cp-kbd--xs">↓</kbd> Navigate</span>
					<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">↵</kbd> Open</span>
					<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">esc</kbd> Close</span>
				</div>
			</div>
			</div>
		</div>
	</div>

	<!-- ── Static mockup: empty state ────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Empty Search State</h3>
		<p class="ds-card__sub">Shown when the query matches nothing — friendly icon and message.</p>
		<div class="ds-demo" style="justify-content: center; padding: 24px 0;">
			<div class="ds-preview-dark">
			<div class="cp-mock">
				<div class="cp-mock__search">
					<svg width="15" height="15" fill="none" stroke="#555" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<span style="font-size: 13px; color: rgba(255,255,255,0.6);">zxqwerty…</span>
				</div>
				<div style="padding: 40px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<svg width="36" height="36" fill="none" stroke="rgba(255,255,255,0.15)" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">No results for <strong style="color: rgba(255,255,255,0.75);">"zxqwerty"</strong></p>
					<span style="font-size: 12px; color: rgba(255,255,255,0.3);">Try a different search term</span>
				</div>
				<div class="cp-mock__footer">
					<span class="cp-hint"><kbd class="cp-kbd cp-kbd--xs">esc</kbd> Close</span>
				</div>
			</div>
			</div>
		</div>
	</div>

	<!-- ── Compact / narrow variant ──────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact Inline Variant</h3>
		<p class="ds-card__sub">Inline search bar that expands — suitable for sidebar or toolbar placement.</p>
		<div class="ds-demo" style="align-items: flex-start; gap: 16px; flex-direction: column;">
			<div class="ds-preview-dark">
			<div class="cp-inline">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
				<span style="font-size: 13px; color: rgba(255,255,255,0.35);">Jump to…</span>
				<kbd class="cp-kbd cp-kbd--xs" style="margin-left: auto;">⌘K</kbd>
			</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Overlay backdrop ────────────────────────────────────────── */
	.cp-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: 9000;
		border: none;
		cursor: default;
		width: 100%;
		height: 100%;
		padding: 0;
	}

	/* ── Overlay dialog ──────────────────────────────────────────── */
	.cp-dialog {
		position: fixed;
		top: 18%;
		left: 50%;
		transform: translateX(-50%);
		width: min(560px, calc(100vw - 32px));
		z-index: 9001;
		border-radius: 14px;
		background: rgba(12, 12, 12, 0.96);
		border: 1px solid rgba(255, 255, 255, 0.09);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04),
			0 24px 72px rgba(0, 0, 0, 0.6),
			0 8px 24px rgba(0, 0, 0, 0.4);
		overflow: hidden;
	}

	/* ── Search row ──────────────────────────────────────────────── */
	.cp-search {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.cp-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.9);
		font-family: inherit;
		caret-color: rgba(255, 255, 255, 0.7);
	}

	.cp-input::placeholder {
		color: rgba(255, 255, 255, 0.25);
	}

	.cp-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.07);
		border: none;
		border-radius: 4px;
		cursor: pointer;
		padding: 3px;
		color: rgba(255, 255, 255, 0.4);
		transition: background 0.12s;
	}

	.cp-clear:hover {
		background: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.7);
	}

	/* ── Results list ────────────────────────────────────────────── */
	.cp-results {
		max-height: 360px;
		overflow-y: auto;
		padding: 6px;
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
	}

	.cp-results::-webkit-scrollbar {
		width: 4px;
	}

	.cp-results::-webkit-scrollbar-track {
		background: transparent;
	}

	.cp-results::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}

	/* ── Group label ─────────────────────────────────────────────── */
	.cp-group-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.3);
		padding: 8px 10px 4px;
	}

	/* ── Result item ─────────────────────────────────────────────── */
	.cp-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border-radius: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: background 0.1s;
	}

	.cp-item:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	.cp-item--active {
		background: rgba(255, 255, 255, 0.08);
	}

	.cp-item__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.5);
		flex-shrink: 0;
	}

	.cp-item__icon--recent {
		background: transparent;
		border-color: transparent;
		color: rgba(255, 255, 255, 0.25);
	}

	.cp-item__label {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.8);
		flex: 1;
		font-weight: 450;
	}

	/* ── Divider ─────────────────────────────────────────────────── */
	.cp-divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 6px 0;
	}

	/* ── Empty state ─────────────────────────────────────────────── */
	.cp-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 40px 24px;
		text-align: center;
	}

	.cp-empty svg {
		color: rgba(255, 255, 255, 0.15);
	}

	.cp-empty p {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
	}

	.cp-empty strong {
		color: rgba(255, 255, 255, 0.75);
	}

	.cp-empty span {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.3);
	}

	/* ── Footer ──────────────────────────────────────────────────── */
	.cp-footer {
		display: flex;
		gap: 16px;
		padding: 8px 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.cp-hint {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 11px;
		color: rgba(255, 255, 255, 0.3);
	}

	/* ── kbd chip ────────────────────────────────────────────────── */
	.cp-kbd {
		font-size: 11px;
		font-family: inherit;
		color: rgba(255, 255, 255, 0.45);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 4px;
		padding: 1px 5px;
	}

	.cp-kbd--xs {
		font-size: 10px;
		padding: 1px 4px;
	}

	.cp-kbd--hint {
		font-size: 13px;
		padding: 2px 7px;
		color: rgba(255, 255, 255, 0.55);
		border-color: rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.04);
	}

	/* ── Trigger hint ────────────────────────────────────────────── */
	.cp-trigger-hint {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  STATIC MOCKUPS                                               */
	/* ══════════════════════════════════════════════════════════════ */
	.cp-mock {
		width: 100%;
		max-width: 520px;
		border-radius: 12px;
		background: rgba(12, 12, 12, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow:
			0 20px 56px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.03);
		overflow: hidden;
	}

	.cp-mock__search {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.cp-mock__label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.28);
		padding: 6px 10px 4px;
	}

	.cp-mock__item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 7px 10px;
		border-radius: 7px;
		margin-bottom: 1px;
	}

	.cp-mock__item--active {
		background: rgba(255, 255, 255, 0.07);
	}

	.cp-mock__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.4);
		flex-shrink: 0;
	}

	.cp-mock__divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 6px 0;
	}

	.cp-mock__footer {
		display: flex;
		gap: 16px;
		padding: 8px 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	/* ── Compact inline ──────────────────────────────────────────── */
	.cp-inline {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.07);
		width: 220px;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.3);
		transition: border-color 0.15s, background 0.15s;
	}

	.cp-inline:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.12);
	}
</style>
