<script lang="ts">
	// Right drawer variants
	let rightOpen = $state(false);
	let rightSize = $state<'narrow' | 'default' | 'wide'>('default');

	// Left drawer
	let leftOpen = $state(false);

	// Bottom sheet
	let bottomOpen = $state(false);

	// Settings panel (real-world example)
	let settingsOpen = $state(false);
	let activeSettingsTab = $state<'general' | 'appearance' | 'notifications'>('general');

	// Filters panel (real-world example)
	let filtersOpen = $state(false);
	let selectedStatuses = $state<string[]>(['active']);
	let selectedPriority = $state('all');

	const drawerWidths: Record<'narrow' | 'default' | 'wide', string> = {
		narrow: '320px',
		default: '400px',
		wide: '600px',
	};

	function openRight(size: 'narrow' | 'default' | 'wide') {
		rightSize = size;
		rightOpen = true;
	}

	function toggleStatus(s: string) {
		selectedStatuses = selectedStatuses.includes(s)
			? selectedStatuses.filter((x) => x !== s)
			: [...selectedStatuses, s];
	}
</script>

<style>
	@keyframes slideInRight {
		from { transform: translateX(100%); }
		to   { transform: translateX(0); }
	}
	@keyframes slideInLeft {
		from { transform: translateX(-100%); }
		to   { transform: translateX(0); }
	}
	@keyframes slideInBottom {
		from { transform: translateY(100%); }
		to   { transform: translateY(0); }
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	.drawer-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
	}
	.drawer-overlay--right  { justify-content: flex-end; }
	.drawer-overlay--left   { justify-content: flex-start; }
	.drawer-overlay--bottom { align-items: flex-end; }

	.drawer-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
		animation: fadeIn 0.2s ease;
	}

	.drawer-panel {
		position: relative;
		background: var(--dbg);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.drawer-panel--right {
		height: 100%;
		border-left: 1px solid var(--dbd);
		animation: slideInRight 0.28s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.drawer-panel--left {
		height: 100%;
		border-right: 1px solid var(--dbd);
		animation: slideInLeft 0.28s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.drawer-panel--bottom {
		width: 100%;
		border-top: 1px solid var(--dbd);
		border-radius: 16px 16px 0 0;
		animation: slideInBottom 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.drawer-header {
		padding: 18px 24px;
		border-bottom: 1px solid var(--dbd2);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}
	.drawer-title {
		font-size: 15px;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
		letter-spacing: -0.01em;
	}
	.drawer-subtitle {
		font-size: 12px;
		color: var(--dt3);
		margin: 2px 0 0;
	}
	.drawer-close {
		width: 28px;
		height: 28px;
		border-radius: 7px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, color 0.15s;
		flex-shrink: 0;
	}
	.drawer-close:hover {
		background: var(--dbg3);
		color: var(--dt2);
	}
	.drawer-body {
		flex: 1;
		overflow-y: auto;
		padding: 24px;
	}
	.drawer-body::-webkit-scrollbar { width: 4px; }
	.drawer-body::-webkit-scrollbar-track { background: transparent; }
	.drawer-body::-webkit-scrollbar-thumb { background: var(--dbd); border-radius: 2px; }
	.drawer-footer {
		padding: 14px 24px;
		border-top: 1px solid var(--dbd2);
		display: flex;
		gap: 8px;
		justify-content: flex-end;
		flex-shrink: 0;
	}
</style>

<section class="ds-section">
	<h2 class="ds-title">Drawers</h2>
	<p class="ds-desc">Slide-in panels for contextual content. Right drawers for detail views and settings, left drawers for navigation, bottom sheets for mobile-style interactions.</p>

	<!-- Right drawer sizes -->
	<div class="ds-card">
		<h3 class="ds-card__title">Right Drawer — Sizes</h3>
		<p class="ds-card__sub">Narrow (320px) for quick actions, Default (400px) for forms, Wide (600px) for detail views</p>
		<div class="ds-demo" style="gap: 10px;">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => openRight('narrow')}>Narrow 320px</button>
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => openRight('default')}>Default 400px</button>
			<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => openRight('wide')}>Wide 600px</button>
		</div>
	</div>

	<!-- Left drawer -->
	<div class="ds-card">
		<h3 class="ds-card__title">Left Drawer — Navigation Sidebar</h3>
		<p class="ds-card__sub">Slides in from the left — suited for navigation trees and sidebar menus</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (leftOpen = true)}>
				<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg>
				Open Navigation
			</button>
		</div>
	</div>

	<!-- Bottom sheet -->
	<div class="ds-card">
		<h3 class="ds-card__title">Bottom Sheet</h3>
		<p class="ds-card__sub">Mobile-style sheet that rises from the bottom — ideal for action menus and quick pickers</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (bottomOpen = true)}>
				<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
				Open Bottom Sheet
			</button>
		</div>
	</div>

	<!-- Real-world: Settings panel -->
	<div class="ds-card">
		<h3 class="ds-card__title">Real-World — Settings Panel</h3>
		<p class="ds-card__sub">Tabbed settings drawer with scrollable content sections and a sticky save footer</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (settingsOpen = true)}>
				<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-linecap="round" stroke-linejoin="round"/></svg>
				Open Settings
			</button>
		</div>
	</div>

	<!-- Real-world: Filters panel -->
	<div class="ds-card">
		<h3 class="ds-card__title">Real-World — Filters Panel</h3>
		<p class="ds-card__sub">Filter drawer with checkbox groups, radio selects, and a clear-all action in the header</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (filtersOpen = true)}>
				<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke-linecap="round" stroke-linejoin="round"/></svg>
				Filters
				{#if selectedStatuses.length < 3 || selectedPriority !== 'all'}
					<span style="background: var(--dbg2); border-radius: 9999px; padding: 1px 6px; font-size: 11px;">
						{(selectedStatuses.length < 3 ? 1 : 0) + (selectedPriority !== 'all' ? 1 : 0)}
					</span>
				{/if}
			</button>
		</div>
	</div>
</section>

<!-- ─── RIGHT DRAWER ─────────────────────────────────────────────────── -->
{#if rightOpen}
	<div class="drawer-overlay drawer-overlay--right" onclick={() => (rightOpen = false)} onkeydown={(e) => e.key === 'Escape' && (rightOpen = false)} role="dialog" aria-modal="true" aria-label="Drawer" tabindex="-1">
		<div class="drawer-backdrop"></div>
		<div
			class="drawer-panel drawer-panel--right"
			style="width: {drawerWidths[rightSize]};"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="drawer-header">
				<div>
					<h3 class="drawer-title">Detail View</h3>
					<p class="drawer-subtitle">{rightSize} · {drawerWidths[rightSize]}</p>
				</div>
				<button class="drawer-close" onclick={() => (rightOpen = false)} aria-label="Close drawer">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="drawer-body">
				<div style="display: flex; flex-direction: column; gap: 20px;">
					<div style="border-radius: 10px; background: var(--dbg2); border: 1px solid var(--dbd2); padding: 16px;">
						<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">Overview</p>
						<div style="display: flex; flex-direction: column; gap: 10px;">
							{#each [['Project', 'MIOSA Platform'], ['Status', 'In progress'], ['Owner', 'R. Moreau'], ['Due date', 'Mar 14, 2026']] as [label, value]}
								<div style="display: flex; justify-content: space-between; align-items: center;">
									<span style="font-size: 13px; color: var(--dt3);">{label}</span>
									<span style="font-size: 13px; color: var(--dt2); font-weight: 500;">{value}</span>
								</div>
							{/each}
						</div>
					</div>
					<div>
						<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">Description</p>
						<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0;">
							A comprehensive design system and component library built on Svelte 5 and SvelteKit 2. Ships production-ready components, design tokens, and full documentation under a single monorepo.
						</p>
					</div>
					<div>
						<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">Activity</p>
						<div style="display: flex; flex-direction: column; gap: 12px;">
							{#each [
								{ avatar: 'R', name: 'R. Moreau', action: 'updated the status', time: '2h ago' },
								{ avatar: 'A', name: 'A. Chen', action: 'left a comment', time: '5h ago' },
								{ avatar: 'M', name: 'M. Osei', action: 'added a file', time: 'Yesterday' },
							] as ev}
								<div style="display: flex; align-items: center; gap: 10px;">
									<div style="width: 28px; height: 28px; border-radius: 9999px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--dt2); flex-shrink: 0;">{ev.avatar}</div>
									<div style="flex: 1; min-width: 0;">
										<span style="font-size: 13px; color: var(--dt2); font-weight: 500;">{ev.name}</span>
										<span style="font-size: 13px; color: var(--dt3);"> {ev.action}</span>
									</div>
									<span style="font-size: 12px; color: var(--dt4); flex-shrink: 0;">{ev.time}</span>
								</div>
							{/each}
						</div>
					</div>
					{#if rightSize === 'wide'}
						<div>
							<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">Attachments</p>
							<div style="display: flex; flex-direction: column; gap: 8px;">
								{#each [['design-v3.fig', '2.4 MB', 'Figma'], ['spec.pdf', '840 KB', 'PDF'], ['api-schema.json', '12 KB', 'JSON']] as [name, size, type]}
									<div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--dbd2); background: var(--dbg2);">
										<div style="width: 32px; height: 32px; border-radius: 7px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: var(--dt3);">{type}</div>
										<div style="flex: 1; min-width: 0;">
											<p style="font-size: 13px; color: var(--dt2); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{name}</p>
											<p style="font-size: 11px; color: var(--dt3); margin: 1px 0 0;">{size}</p>
										</div>
										<button class="btn-pill btn-pill-ghost btn-pill-xs" aria-label="Download {name}">↓</button>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
			<div class="drawer-footer">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (rightOpen = false)}>Cancel</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (rightOpen = false)}>Save changes</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── LEFT DRAWER (NAVIGATION) ─────────────────────────────────────── -->
{#if leftOpen}
	<div class="drawer-overlay drawer-overlay--left" onclick={() => (leftOpen = false)} onkeydown={(e) => e.key === 'Escape' && (leftOpen = false)} role="dialog" aria-modal="true" aria-label="Navigation drawer" tabindex="-1">
		<div class="drawer-backdrop"></div>
		<div class="drawer-panel drawer-panel--left" style="width: 280px;" onclick={(e) => e.stopPropagation()} role="presentation">
			<div class="drawer-header">
				<div style="display: flex; align-items: center; gap: 10px;">
					<div style="width: 28px; height: 28px; border-radius: 7px; background: var(--dt); display: flex; align-items: center; justify-content: center;">
						<span style="font-size: 11px; font-weight: 900; color: var(--dbg);">M</span>
					</div>
					<span style="font-size: 14px; font-weight: 700; color: var(--dt); letter-spacing: -0.02em;">MIOSA</span>
				</div>
				<button class="drawer-close" onclick={() => (leftOpen = false)} aria-label="Close navigation">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="drawer-body" style="padding: 16px 12px;">
				<p style="font-size: 11px; font-weight: 600; color: var(--dt4); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 8px; padding: 0 8px;">Workspace</p>
				{#each [
					{ icon: 'home', label: 'Dashboard', active: true },
					{ icon: 'layers', label: 'Projects' },
					{ icon: 'check', label: 'Tasks' },
					{ icon: 'clock', label: 'Timeline' },
				] as item}
					<button
						style="width: 100%; display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; border: none; background: {item.active ? 'var(--dbg3)' : 'transparent'}; color: {item.active ? 'var(--dt)' : 'var(--dt3)'}; font-size: 13px; font-weight: {item.active ? '500' : '400'}; cursor: pointer; text-align: left; margin-bottom: 2px; transition: background 0.12s, color 0.12s;"
						aria-label={item.label}
					>
						<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="flex-shrink: 0;">
							{#if item.icon === 'home'}<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22V12h6v10" stroke-linecap="round" stroke-linejoin="round"/>{/if}
							{#if item.icon === 'layers'}<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>{/if}
							{#if item.icon === 'check'}<path d="M9 11l3 3L22 4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke-linecap="round" stroke-linejoin="round"/>{/if}
							{#if item.icon === 'clock'}<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/>{/if}
						</svg>
						{item.label}
					</button>
				{/each}
				<div style="margin: 16px 0 8px; border-top: 1px solid var(--dbd2);"></div>
				<p style="font-size: 11px; font-weight: 600; color: var(--dt4); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 8px; padding: 0 8px;">Settings</p>
				{#each [{ label: 'Account' }, { label: 'Billing' }, { label: 'Team' }] as item}
					<button style="width: 100%; display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; border: none; background: transparent; color: var(--dt3); font-size: 13px; cursor: pointer; text-align: left; margin-bottom: 2px; transition: color 0.12s;" aria-label={item.label}>
						{item.label}
					</button>
				{/each}
			</div>
			<div class="drawer-footer" style="justify-content: flex-start;">
				<div style="display: flex; align-items: center; gap: 10px; flex: 1;">
					<div style="width: 30px; height: 30px; border-radius: 9999px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--dt2);">R</div>
					<div>
						<p style="font-size: 13px; color: var(--dt2); font-weight: 500; margin: 0;">R. Moreau</p>
						<p style="font-size: 11px; color: var(--dt3); margin: 0;">Pro plan</p>
					</div>
				</div>
				<button class="drawer-close" onclick={() => (leftOpen = false)} aria-label="Close navigation">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke-linecap="round" stroke-linejoin="round"/></svg>
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── BOTTOM SHEET ───────────────────────────────────────────────────── -->
{#if bottomOpen}
	<div class="drawer-overlay drawer-overlay--bottom" onclick={() => (bottomOpen = false)} onkeydown={(e) => e.key === 'Escape' && (bottomOpen = false)} role="dialog" aria-modal="true" aria-label="Bottom sheet" tabindex="-1">
		<div class="drawer-backdrop"></div>
		<div class="drawer-panel drawer-panel--bottom" style="max-height: 60vh;" onclick={(e) => e.stopPropagation()} role="presentation">
			<!-- Drag handle -->
			<div style="padding: 12px 24px 0; display: flex; justify-content: center;">
				<div style="width: 36px; height: 4px; border-radius: 9999px; background: var(--dbd);"></div>
			</div>
			<div class="drawer-header" style="border-bottom: none; padding-top: 12px;">
				<h3 class="drawer-title">Share document</h3>
				<button class="drawer-close" onclick={() => (bottomOpen = false)} aria-label="Close sheet">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="drawer-body" style="padding: 0 24px 8px;">
				<div style="display: flex; gap: 12px; margin-bottom: 20px;">
					{#each [
						{ icon: 'copy', label: 'Copy link' },
						{ icon: 'mail', label: 'Email' },
						{ icon: 'twitter', label: 'Twitter' },
						{ icon: 'slack', label: 'Slack' },
					] as action}
						<button style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px 8px; border-radius: 10px; border: 1px solid var(--dbd2); background: var(--dbg2); color: var(--dt2); cursor: pointer; font-size: 12px; transition: background 0.15s;" aria-label={action.label}>
							<div style="width: 36px; height: 36px; border-radius: 9px; background: var(--dbg3); display: flex; align-items: center; justify-content: center;">
								<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
									{#if action.icon === 'copy'}<path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" stroke-linecap="round" stroke-linejoin="round"/>{/if}
									{#if action.icon === 'mail'}<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22,6 12,13 2,6" stroke-linecap="round" stroke-linejoin="round"/>{/if}
									{#if action.icon === 'twitter'}<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke-linecap="round" stroke-linejoin="round"/>{/if}
									{#if action.icon === 'slack'}<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" stroke-linecap="round"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" stroke-linecap="round"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" stroke-linecap="round"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" stroke-linecap="round"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" stroke-linecap="round"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" stroke-linecap="round"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" stroke-linecap="round"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" stroke-linecap="round"/>{/if}
								</svg>
							</div>
							{action.label}
						</button>
					{/each}
				</div>
				<div style="border-top: 1px solid var(--dbd2); padding-top: 16px;">
					<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px;">People with access</p>
					{#each [
						{ name: 'R. Moreau', role: 'Owner', avatar: 'R' },
						{ name: 'A. Chen', role: 'Editor', avatar: 'A' },
						{ name: 'M. Osei', role: 'Viewer', avatar: 'M' },
					] as person}
						<div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
							<div style="width: 32px; height: 32px; border-radius: 9999px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--dt2); flex-shrink: 0;">{person.avatar}</div>
							<span style="flex: 1; font-size: 13px; color: var(--dt2);">{person.name}</span>
							<span style="font-size: 12px; color: var(--dt3);">{person.role}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="drawer-footer">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (bottomOpen = false)}>Done</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── SETTINGS PANEL ─────────────────────────────────────────────────── -->
{#if settingsOpen}
	<div class="drawer-overlay drawer-overlay--right" onclick={() => (settingsOpen = false)} onkeydown={(e) => e.key === 'Escape' && (settingsOpen = false)} role="dialog" aria-modal="true" aria-label="Settings panel" tabindex="-1">
		<div class="drawer-backdrop"></div>
		<div class="drawer-panel drawer-panel--right" style="width: 480px;" onclick={(e) => e.stopPropagation()} role="presentation">
			<div class="drawer-header">
				<div>
					<h3 class="drawer-title">Settings</h3>
					<p class="drawer-subtitle">Manage your workspace preferences</p>
				</div>
				<button class="drawer-close" onclick={() => (settingsOpen = false)} aria-label="Close settings">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<!-- Tab bar -->
			<div style="display: flex; padding: 0 24px; border-bottom: 1px solid var(--dbd2); gap: 4px;">
				{#each [['general', 'General'], ['appearance', 'Appearance'], ['notifications', 'Notifications']] as [id, label]}
					<button
						onclick={() => (activeSettingsTab = id as typeof activeSettingsTab)}
						style="padding: 10px 12px; border: none; border-bottom: 2px solid {activeSettingsTab === id ? 'var(--dt)' : 'transparent'}; background: transparent; color: {activeSettingsTab === id ? 'var(--dt)' : 'var(--dt3)'}; font-size: 13px; font-weight: {activeSettingsTab === id ? '500' : '400'}; cursor: pointer; transition: color 0.15s; white-space: nowrap;"
						aria-label={label}
					>
						{label}
					</button>
				{/each}
			</div>
			<div class="drawer-body">
				{#if activeSettingsTab === 'general'}
					<div style="display: flex; flex-direction: column; gap: 20px;">
						{#each [['Display name', 'R. Moreau'], ['Email address', 'r.moreau@miosa.io'], ['Username', '@rmoreau']] as [label, value]}
							<label style="display: flex; flex-direction: column; gap: 6px;">
								<span style="font-size: 12px; font-weight: 500; color: var(--dt3);">{label}</span>
								<input
									type="text"
									defaultValue={value}
									style="width: 100%; padding: 9px 12px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; color: var(--dt2); font-size: 13px; outline: none; box-sizing: border-box;"
								/>
							</label>
						{/each}
						<label style="display: flex; flex-direction: column; gap: 6px;">
							<span style="font-size: 12px; font-weight: 500; color: var(--dt3);">Bio</span>
							<textarea
								style="width: 100%; padding: 9px 12px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; color: var(--dt2); font-size: 13px; outline: none; resize: vertical; min-height: 80px; box-sizing: border-box; font-family: inherit;"
							>Design systems at MIOSA. Previously @figma.</textarea>
						</label>
					</div>
				{:else if activeSettingsTab === 'appearance'}
					<div style="display: flex; flex-direction: column; gap: 20px;">
						<div>
							<p style="font-size: 12px; font-weight: 500; color: var(--dt3); margin: 0 0 10px;">Theme</p>
							<div style="display: flex; gap: 8px;">
								{#each [['dark', 'Dark'], ['light', 'Light'], ['system', 'System']] as [id, label]}
									<button style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid {id === 'dark' ? 'var(--dbd)' : 'var(--dbd2)'}; background: {id === 'dark' ? 'var(--dbg3)' : 'transparent'}; color: {id === 'dark' ? 'var(--dt)' : 'var(--dt3)'}; font-size: 13px; cursor: pointer;" aria-label="Select {label} theme">{label}</button>
								{/each}
							</div>
						</div>
						<div>
							<p style="font-size: 12px; font-weight: 500; color: var(--dt3); margin: 0 0 10px;">Font size</p>
							<div style="display: flex; gap: 8px;">
								{#each [['sm', 'Small'], ['md', 'Medium'], ['lg', 'Large']] as [id, label]}
									<button style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid {id === 'md' ? 'var(--dbd)' : 'var(--dbd2)'}; background: {id === 'md' ? 'var(--dbg3)' : 'transparent'}; color: {id === 'md' ? 'var(--dt)' : 'var(--dt3)'}; font-size: 13px; cursor: pointer;" aria-label="Select {label} font size">{label}</button>
								{/each}
							</div>
						</div>
						<div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-radius: 10px; background: var(--dbg2); border: 1px solid var(--dbd2);">
							<div>
								<p style="font-size: 13px; color: var(--dt2); font-weight: 500; margin: 0;">Reduced motion</p>
								<p style="font-size: 12px; color: var(--dt3); margin: 2px 0 0;">Minimise animations across the UI</p>
							</div>
							<div style="width: 38px; height: 22px; border-radius: 11px; background: var(--dbg3); border: 1px solid var(--dbd); cursor: pointer; position: relative;">
								<div style="position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 9999px; background: var(--dt3);"></div>
							</div>
						</div>
					</div>
				{:else}
					<div style="display: flex; flex-direction: column; gap: 12px;">
						{#each [
							{ label: 'Email digest', sub: 'Daily summary of your activity', on: true },
							{ label: 'Mention alerts', sub: 'When someone @mentions you', on: true },
							{ label: 'Task reminders', sub: '15 minutes before due time', on: false },
							{ label: 'Weekly report', sub: 'Every Monday at 9 AM', on: false },
						] as item}
							<div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-radius: 10px; background: var(--dbg2); border: 1px solid var(--dbd2);">
								<div>
									<p style="font-size: 13px; color: var(--dt2); font-weight: 500; margin: 0;">{item.label}</p>
									<p style="font-size: 12px; color: var(--dt3); margin: 2px 0 0;">{item.sub}</p>
								</div>
								<div style="width: 38px; height: 22px; border-radius: 11px; background: {item.on ? 'var(--dt2)' : 'var(--dbg3)'}; border: 1px solid var(--dbd); cursor: pointer; position: relative; transition: background 0.2s;">
									<div style="position: absolute; top: 2px; {item.on ? 'right: 2px;' : 'left: 2px;'} width: 16px; height: 16px; border-radius: 9999px; background: {item.on ? 'var(--dbg)' : 'var(--dt3)'}; transition: right 0.2s, left 0.2s;"></div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div class="drawer-footer">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (settingsOpen = false)}>Discard</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (settingsOpen = false)}>Save settings</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── FILTERS PANEL ──────────────────────────────────────────────────── -->
{#if filtersOpen}
	<div class="drawer-overlay drawer-overlay--right" onclick={() => (filtersOpen = false)} onkeydown={(e) => e.key === 'Escape' && (filtersOpen = false)} role="dialog" aria-modal="true" aria-label="Filters panel" tabindex="-1">
		<div class="drawer-backdrop"></div>
		<div class="drawer-panel drawer-panel--right" style="width: 360px;" onclick={(e) => e.stopPropagation()} role="presentation">
			<div class="drawer-header">
				<h3 class="drawer-title">Filters</h3>
				<div style="display: flex; align-items: center; gap: 8px;">
					<button
						onclick={() => { selectedStatuses = ['active', 'pending', 'done']; selectedPriority = 'all'; }}
						class="btn-pill btn-pill-ghost btn-pill-xs"
						aria-label="Clear all filters"
					>Clear all</button>
					<button class="drawer-close" onclick={() => (filtersOpen = false)} aria-label="Close filters">
						<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
					</button>
				</div>
			</div>
			<div class="drawer-body">
				<div style="display: flex; flex-direction: column; gap: 24px;">
					<div>
						<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 12px;">Status</p>
						<div style="display: flex; flex-direction: column; gap: 8px;">
							{#each [['active', 'Active', '#22c55e'], ['pending', 'Pending', '#f59e0b'], ['done', 'Done', '#6366f1']] as [id, label, color]}
								<label style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 8px 10px; border-radius: 8px; border: 1px solid {selectedStatuses.includes(id) ? 'var(--dbd)' : 'var(--dbd2)'}; background: {selectedStatuses.includes(id) ? 'var(--dbg2)' : 'transparent'}; transition: all 0.15s;">
									<input
										type="checkbox"
										checked={selectedStatuses.includes(id)}
										onchange={() => toggleStatus(id)}
										style="accent-color: var(--dt);"
										aria-label="Filter by {label}"
									/>
									<span style="width: 8px; height: 8px; border-radius: 9999px; background: {color}; flex-shrink: 0;"></span>
									<span style="font-size: 13px; color: {selectedStatuses.includes(id) ? 'var(--dt2)' : 'var(--dt3)'};">{label}</span>
								</label>
							{/each}
						</div>
					</div>
					<div>
						<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 12px;">Priority</p>
						<div style="display: flex; flex-direction: column; gap: 6px;">
							{#each [['all', 'All priorities'], ['high', 'High'], ['medium', 'Medium'], ['low', 'Low']] as [id, label]}
								<label style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 8px 10px; border-radius: 8px; border: 1px solid {selectedPriority === id ? 'var(--dbd)' : 'transparent'}; background: {selectedPriority === id ? 'var(--dbg2)' : 'transparent'}; transition: all 0.15s;">
									<input type="radio" name="priority" value={id} checked={selectedPriority === id} onchange={() => (selectedPriority = id)} style="accent-color: var(--dt);" aria-label={label} />
									<span style="font-size: 13px; color: {selectedPriority === id ? 'var(--dt2)' : 'var(--dt3)'};">{label}</span>
								</label>
							{/each}
						</div>
					</div>
					<div>
						<p style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 12px;">Date range</p>
						<div style="display: flex; gap: 8px;">
							<label style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
								<span style="font-size: 12px; color: var(--dt3);">From</span>
								<input type="date" style="width: 100%; padding: 8px 10px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; color: var(--dt2); font-size: 13px; outline: none; box-sizing: border-box;" />
							</label>
							<label style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
								<span style="font-size: 12px; color: var(--dt3);">To</span>
								<input type="date" style="width: 100%; padding: 8px 10px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; color: var(--dt2); font-size: 13px; outline: none; box-sizing: border-box;" />
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="drawer-footer">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (filtersOpen = false)}>Cancel</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (filtersOpen = false)}>Apply filters</button>
			</div>
		</div>
	</div>
{/if}
