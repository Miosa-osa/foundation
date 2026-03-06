<script lang="ts">
	// ── Context menu state ─────────────────────────────────────────
	interface MenuItem {
		type: 'item' | 'separator' | 'label';
		label?: string;
		icon?: string;
		shortcut?: string;
		submenu?: boolean;
		disabled?: boolean;
		checked?: boolean;
		danger?: boolean;
	}

	interface MenuState {
		open: boolean;
		x: number;
		y: number;
		items: MenuItem[];
	}

	let menu = $state<MenuState>({ open: false, x: 0, y: 0, items: [] });

	// ── Checkbox item state ────────────────────────────────────────
	let checkGrid   = $state(true);
	let checkLabels = $state(false);
	let checkSnap   = $state(true);

	// ── Menus ──────────────────────────────────────────────────────
	const basicMenu: MenuItem[] = [
		{ type: 'item', label: 'Open',         icon: 'external' },
		{ type: 'item', label: 'Open in Tab',  icon: 'tab' },
		{ type: 'separator' },
		{ type: 'item', label: 'Copy Link',    icon: 'copy',   shortcut: '⌘C' },
		{ type: 'item', label: 'Share…',       icon: 'share' },
		{ type: 'separator' },
		{ type: 'item', label: 'Delete',       icon: 'trash',  danger: true },
	];

	const submenuItems: MenuItem[] = [
		{ type: 'item', label: 'Cut',      icon: 'scissors', shortcut: '⌘X' },
		{ type: 'item', label: 'Copy',     icon: 'copy',     shortcut: '⌘C' },
		{ type: 'item', label: 'Paste',    icon: 'paste',    shortcut: '⌘V' },
		{ type: 'separator' },
		{ type: 'label', label: 'View' },
		{ type: 'item', label: 'Zoom In',  icon: 'zoom-in',  shortcut: '⌘+', submenu: false },
		{ type: 'item', label: 'Zoom Out', icon: 'zoom-out', shortcut: '⌘-', submenu: false },
		{ type: 'item', label: 'Export as…', icon: 'export', submenu: true },
		{ type: 'separator' },
		{ type: 'item', label: 'Disabled Action', icon: 'lock', disabled: true },
		{ type: 'separator' },
		{ type: 'item', label: 'Remove Item',  icon: 'trash', danger: true },
		{ type: 'item', label: 'Delete File',  icon: 'trash', danger: true, shortcut: '⌫' },
	];

	const checkboxMenu: MenuItem[] = [
		{ type: 'label', label: 'View Options' },
		{ type: 'item', label: 'Show Grid',   icon: 'grid',   checked: true },
		{ type: 'item', label: 'Show Labels', icon: 'tag',    checked: false },
		{ type: 'item', label: 'Snap to Grid',icon: 'magnet', checked: true },
		{ type: 'separator' },
		{ type: 'item', label: 'Reset View',  icon: 'refresh' },
	];

	function openMenu(e: MouseEvent, items: MenuItem[]) {
		e.preventDefault();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const menuW = 220;
		const menuH = items.length * 34 + 16;
		menu = {
			open: true,
			x: Math.min(e.clientX, vw - menuW - 8),
			y: Math.min(e.clientY, vh - menuH - 8),
			items,
		};
	}

	function closeMenu() {
		menu = { ...menu, open: false };
	}

	function handleCheckboxToggle(label: string | undefined) {
		if (label === 'Show Grid')    checkGrid   = !checkGrid;
		if (label === 'Show Labels')  checkLabels = !checkLabels;
		if (label === 'Snap to Grid') checkSnap   = !checkSnap;
		closeMenu();
	}

	function isChecked(label: string | undefined): boolean {
		if (label === 'Show Grid')    return checkGrid;
		if (label === 'Show Labels')  return checkLabels;
		if (label === 'Snap to Grid') return checkSnap;
		return false;
	}

	// Close on outside click
	function handleWindowClick() {
		if (menu.open) closeMenu();
	}
</script>

<svelte:window onclick={handleWindowClick} />

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  FLOATING CONTEXT MENU (real, positioned)                      -->
<!-- ═══════════════════════════════════════════════════════════════ -->
{#if menu.open}
	<div
		class="ctx-float"
		role="menu"
		aria-label="Context menu"
		tabindex="-1"
		style="left: {menu.x}px; top: {menu.y}px;"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => { if (e.key === 'Escape') closeMenu(); e.stopPropagation(); }}
	>
		{#each menu.items as item}
			{#if item.type === 'separator'}
				<div class="ctx-sep" role="separator"></div>
			{:else if item.type === 'label'}
				<div class="ctx-label">{item.label}</div>
			{:else}
				<button
					class="ctx-item"
					class:ctx-item--danger={item.danger}
					class:ctx-item--disabled={item.disabled}
					role="menuitem"
					disabled={item.disabled}
					onclick={() => {
						if (menu.items === checkboxMenu) {
							handleCheckboxToggle(item.label);
						} else {
							closeMenu();
						}
					}}
				>
					{#if menu.items === checkboxMenu}
						<span class="ctx-check" class:ctx-check--on={isChecked(item.label)} aria-hidden="true">
							{#if isChecked(item.label)}
								<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{/if}
						</span>
					{:else}
						<span class="ctx-icon" aria-hidden="true">
							{@render CtxIcon({ name: item.icon })}
						</span>
					{/if}
					<span class="ctx-item__label">{item.label}</span>
					{#if item.submenu}
						<svg class="ctx-chevron" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					{:else if item.shortcut}
						<kbd class="ctx-shortcut">{item.shortcut}</kbd>
					{/if}
				</button>
			{/if}
		{/each}
	</div>
{/if}

<!-- ─── Icon helper ────────────────────────────────────────────── -->
{#snippet CtxIcon({ name }: { name: string | undefined })}
	{#if name === 'external'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
	{:else if name === 'tab'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
	{:else if name === 'copy' || name === 'paste'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
	{:else if name === 'scissors'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7M7.5 4.5a3 3 0 113 3L12 12l-1.5 1.5a3 3 0 11-3-3L12 12l-1.5-1.5a3 3 0 01-3-3z"/></svg>
	{:else if name === 'share'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
	{:else if name === 'trash'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
	{:else if name === 'zoom-in'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
	{:else if name === 'zoom-out'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"/></svg>
	{:else if name === 'export'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
	{:else if name === 'lock'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
	{:else if name === 'grid'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
	{:else if name === 'tag'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"/></svg>
	{:else if name === 'magnet'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
	{:else if name === 'refresh'}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
	{:else}
		<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/></svg>
	{/if}
{/snippet}

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  SECTION                                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Context Menus</h2>
	<p class="ds-desc">
		Right-click menus — icons, shortcuts, submenus, checkbox items, separators,
		disabled states, and danger zones. Click "Right-click here" zones to interact.
	</p>

	<!-- ── Basic context menu ────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Context Menu</h3>
		<p class="ds-card__sub">Right-click the zone — icons, separators, and a destructive item.</p>
		<div class="ds-preview-dark">
		<button
			class="ctx-zone"
			oncontextmenu={(e) => openMenu(e, basicMenu)}
			onclick={(e) => { e.preventDefault(); openMenu(e, basicMenu); }}
			aria-label="Right-click zone for basic context menu demo"
		>
			<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
			Right-click or click here
		</button>
		</div>
	</div>

	<!-- ── Full-feature menu ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Full-Featured Menu</h3>
		<p class="ds-card__sub">Shortcuts, labels, submenus (arrow), disabled items, and danger zone.</p>
		<div class="ds-preview-dark">
		<button
			class="ctx-zone"
			oncontextmenu={(e) => openMenu(e, submenuItems)}
			onclick={(e) => { e.preventDefault(); openMenu(e, submenuItems); }}
			aria-label="Right-click zone for full-featured context menu demo"
		>
			<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h7"/></svg>
			Right-click or click here
		</button>
		</div>
	</div>

	<!-- ── Checkbox menu ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Checkbox Items</h3>
		<p class="ds-card__sub">Toggle state inline — checkmarks reflect live state. Try toggling.</p>
		<div class="ds-preview-dark">
		<button
			class="ctx-zone"
			oncontextmenu={(e) => openMenu(e, checkboxMenu)}
			onclick={(e) => { e.preventDefault(); openMenu(e, checkboxMenu); }}
			aria-label="Right-click zone for checkbox context menu demo"
		>
			<div class="ctx-zone__state">
				<span class:ctx-chip--on={checkGrid}>Grid: {checkGrid ? 'On' : 'Off'}</span>
				<span class:ctx-chip--on={checkLabels}>Labels: {checkLabels ? 'On' : 'Off'}</span>
				<span class:ctx-chip--on={checkSnap}>Snap: {checkSnap ? 'On' : 'Off'}</span>
			</div>
			<span style="font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 6px;">Right-click to toggle options</span>
		</button>
		</div>
	</div>

	<!-- ── Static mockup: anatomy ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Anatomy Mockup</h3>
		<p class="ds-card__sub">Static render showing all anatomy: label group, icon items, shortcuts, submenu arrow, disabled, danger.</p>
		<div class="ds-demo" style="padding: 16px 0; justify-content: center;">
			<div class="ds-preview-dark">
			<div class="ctx-static">
				<div class="ctx-static__label">Edit</div>
				<div class="ctx-static__item">
					<span class="ctx-icon"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg></span>
					<span class="ctx-static__item-label">Cut</span>
					<kbd class="ctx-shortcut">⌘X</kbd>
				</div>
				<div class="ctx-static__item ctx-static__item--active">
					<span class="ctx-icon"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg></span>
					<span class="ctx-static__item-label">Copy</span>
					<kbd class="ctx-shortcut">⌘C</kbd>
				</div>
				<div class="ctx-static__item">
					<span class="ctx-icon"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></span>
					<span class="ctx-static__item-label">Export as…</span>
					<svg class="ctx-chevron" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</div>
				<div class="ctx-static__sep"></div>
				<div class="ctx-static__item ctx-static__item--disabled">
					<span class="ctx-icon"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg></span>
					<span class="ctx-static__item-label">Locked Action</span>
				</div>
				<div class="ctx-static__sep"></div>
				<div class="ctx-static__label">Danger Zone</div>
				<div class="ctx-static__item ctx-static__item--danger">
					<span class="ctx-icon"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></span>
					<span class="ctx-static__item-label">Delete</span>
					<kbd class="ctx-shortcut ctx-shortcut--danger">⌫</kbd>
				</div>
			</div>
			</div>
		</div>
	</div>

	<!-- ── Checkbox mockup ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Checkbox Items Mockup</h3>
		<p class="ds-card__sub">Toggle rows with checkmark glyphs. On/off state is visually distinct.</p>
		<div class="ds-demo" style="padding: 16px 0; justify-content: center;">
			<div class="ds-preview-dark">
			<div class="ctx-static">
				<div class="ctx-static__label">View Options</div>
				<div class="ctx-static__item">
					<span class="ctx-check ctx-check--on"><svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></span>
					<span class="ctx-static__item-label">Show Grid</span>
				</div>
				<div class="ctx-static__item">
					<span class="ctx-check"></span>
					<span class="ctx-static__item-label" style="color: rgba(255,255,255,0.4);">Show Labels</span>
				</div>
				<div class="ctx-static__item">
					<span class="ctx-check ctx-check--on"><svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></span>
					<span class="ctx-static__item-label">Snap to Grid</span>
				</div>
				<div class="ctx-static__sep"></div>
				<div class="ctx-static__item">
					<span class="ctx-icon"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></span>
					<span class="ctx-static__item-label">Reset View</span>
				</div>
			</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Floating context menu ───────────────────────────────────── */
	.ctx-float {
		position: fixed;
		z-index: 9500;
		min-width: 200px;
		padding: 4px;
		border-radius: 10px;
		background: rgba(14, 14, 14, 0.97);
		border: 1px solid rgba(255, 255, 255, 0.09);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.04),
			0 16px 48px rgba(0, 0, 0, 0.55),
			0 4px 12px rgba(0, 0, 0, 0.3);
	}

	/* ── Shared item base ────────────────────────────────────────── */
	.ctx-item {
		display: flex;
		align-items: center;
		gap: 9px;
		width: 100%;
		padding: 6px 8px;
		border-radius: 6px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.8);
		transition: background 0.1s;
	}

	.ctx-item:hover {
		background: rgba(255, 255, 255, 0.07);
	}

	.ctx-item--danger {
		color: #f87171;
	}

	.ctx-item--danger:hover {
		background: rgba(248, 113, 113, 0.1);
	}

	.ctx-item--disabled {
		opacity: 0.35;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* ── Icon ────────────────────────────────────────────────────── */
	.ctx-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		color: rgba(255, 255, 255, 0.4);
		flex-shrink: 0;
	}

	.ctx-item--danger .ctx-icon {
		color: rgba(248, 113, 113, 0.7);
	}

	/* ── Label group header ──────────────────────────────────────── */
	.ctx-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.28);
		padding: 6px 8px 3px;
	}

	/* ── Separator ───────────────────────────────────────────────── */
	.ctx-sep {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 3px 0;
	}

	/* ── Item label ──────────────────────────────────────────────── */
	.ctx-item__label {
		flex: 1;
		font-size: 13px;
		font-weight: 440;
	}

	/* ── Keyboard shortcut badge ─────────────────────────────────── */
	.ctx-shortcut {
		font-size: 11px;
		font-family: inherit;
		color: rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 4px;
		padding: 1px 5px;
		flex-shrink: 0;
	}

	.ctx-shortcut--danger {
		color: rgba(248, 113, 113, 0.6);
		background: rgba(248, 113, 113, 0.06);
		border-color: rgba(248, 113, 113, 0.12);
	}

	/* ── Chevron for submenu arrow ───────────────────────────────── */
	.ctx-chevron {
		color: rgba(255, 255, 255, 0.25);
		flex-shrink: 0;
	}

	/* ── Checkbox indicator ──────────────────────────────────────── */
	.ctx-check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.04);
		flex-shrink: 0;
		color: rgba(255, 255, 255, 0.9);
	}

	.ctx-check--on {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.25);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  INTERACTIVE ZONES                                           */
	/* ═══════════════════════════════════════════════════════════ */
	.ctx-zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		min-height: 100px;
		border-radius: 10px;
		border: 1px dashed rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.02);
		cursor: context-menu;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.35);
		font-family: inherit;
		transition: border-color 0.15s, background 0.15s;
	}

	.ctx-zone:hover {
		border-color: rgba(255, 255, 255, 0.18);
		background: rgba(255, 255, 255, 0.03);
		color: rgba(255, 255, 255, 0.5);
	}

	.ctx-zone__state {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.ctx-zone__state span {
		font-size: 12px;
		padding: 3px 10px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.35);
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}

	.ctx-chip--on {
		background: rgba(255, 255, 255, 0.1) !important;
		border-color: rgba(255, 255, 255, 0.2) !important;
		color: rgba(255, 255, 255, 0.8) !important;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  STATIC MOCKUP                                               */
	/* ═══════════════════════════════════════════════════════════ */
	.ctx-static {
		min-width: 220px;
		padding: 4px;
		border-radius: 10px;
		background: rgba(14, 14, 14, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.09);
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
	}

	.ctx-static__label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.28);
		padding: 6px 8px 3px;
	}

	.ctx-static__sep {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 3px 0;
	}

	.ctx-static__item {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 6px 8px;
		border-radius: 6px;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.8);
	}

	.ctx-static__item--active {
		background: rgba(255, 255, 255, 0.07);
	}

	.ctx-static__item--disabled {
		opacity: 0.3;
	}

	.ctx-static__item--danger {
		color: #f87171;
	}

	.ctx-static__item--danger .ctx-icon {
		color: rgba(248, 113, 113, 0.7);
	}

	.ctx-static__item-label {
		flex: 1;
		font-weight: 440;
	}
</style>
