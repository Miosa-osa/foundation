<script lang="ts">
	let activeApp = $state('dashboard');
	let hoveredApp = $state('');
	let windowMinimized = $state(false);
	let spotlightOpen = $state(false);
	let spotlightQuery = $state('');
	const dockApps = [
		{ id: 'dashboard', label: 'Dashboard', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',
		  path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'chat', label: 'Chat', color: '#22c55e', bg: 'rgba(34,197,94,0.15)',
		  path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
		{ id: 'tasks', label: 'Tasks', color: '#f97316', bg: 'rgba(249,115,22,0.15)',
		  path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
		{ id: 'projects', label: 'Projects', color: '#a855f7', bg: 'rgba(168,85,247,0.15)',
		  path: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
		{ id: 'team', label: 'Team', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)',
		  path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
		{ id: 'settings', label: 'Settings', color: '#6b7280', bg: 'rgba(107,114,128,0.15)',
		  path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
		{ id: 'terminal', label: 'Terminal', color: '#10b981', bg: 'rgba(16,185,129,0.12)',
		  path: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
	];

	const desktopIcons = [
		{ id: 'dashboard', label: 'Dashboard', color: '#3b82f6', textColor: '#fff',
		  path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'chat', label: 'Chat', color: '#22c55e', textColor: '#fff',
		  path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
		{ id: 'tasks', label: 'Tasks', color: '#f97316', textColor: '#fff',
		  path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
		{ id: 'projects', label: 'Projects', color: '#a855f7', textColor: '#fff',
		  path: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
		{ id: 'team', label: 'Team', color: '#06b6d4', textColor: '#fff',
		  path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
		{ id: 'settings', label: 'Settings', color: '#6b7280', textColor: '#fff',
		  path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
	];

	const spotlightResults = [
		{ category: 'Apps', items: ['Dashboard', 'Chat', 'Tasks', 'Projects', 'Team'] },
		{ category: 'Recent Files', items: ['Q3 Report.pdf', 'Sprint Planning.md', 'Design Tokens.figma'] },
		{ category: 'Settings', items: ['Appearance', 'Notifications', 'Account & Billing'] },
	];

	const filteredResults = $derived(
		spotlightQuery.trim()
			? spotlightResults.map(g => ({
				...g,
				items: g.items.filter(i => i.toLowerCase().includes(spotlightQuery.toLowerCase()))
			  })).filter(g => g.items.length > 0)
			: spotlightResults
	);

	const dashIcon = {
		label: 'Dashboard',
		color: '#3b82f6',
		path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
	};

	// ── Dock Icon Style Variants ──────────────────────────────────
	let activeDockStyle = $state<'macos' | 'windows' | 'ios' | 'mono'>('macos');
	let activeWinApp = $state('dash');

	const dockStyleApps = [
		{ id: 'dash', label: 'Dash', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',
		  path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'chat', label: 'Chat', color: '#22c55e', bg: 'rgba(34,197,94,0.15)',
		  path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
		{ id: 'tasks', label: 'Tasks', color: '#f97316', bg: 'rgba(249,115,22,0.15)',
		  path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
		{ id: 'files', label: 'Files', color: '#a855f7', bg: 'rgba(168,85,247,0.15)',
		  path: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
		{ id: 'settings', label: 'Config', color: '#6b7280', bg: 'rgba(107,114,128,0.15)',
		  path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
	];

	// ── Window Management Scene ───────────────────────────────────
	let wmWindows = $state([
		{ id: 'dash', label: 'Dashboard', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', z: 3, minimized: false,
		  path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'chat', label: 'Chat', color: '#22c55e', bg: 'rgba(34,197,94,0.15)', z: 2, minimized: false,
		  path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
		{ id: 'tasks', label: 'Tasks', color: '#f97316', bg: 'rgba(249,115,22,0.15)', z: 1, minimized: true,
		  path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
	]);

	function wmFocus(id: string) {
		const maxZ = Math.max(...wmWindows.map(w => w.z));
		wmWindows = wmWindows.map(w => w.id === id ? { ...w, z: maxZ + 1, minimized: false } : w);
	}
	function wmMinimize(id: string) {
		wmWindows = wmWindows.map(w => w.id === id ? { ...w, minimized: true } : w);
	}

	// ── Notification Badges ───────────────────────────────────────
	const badgeApps = [
		{ id: 'chat', label: 'Chat', color: '#22c55e', bg: 'rgba(34,197,94,0.15)', count: 12, status: 'online' as const, progress: 0.72,
		  path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
		{ id: 'tasks', label: 'Tasks', color: '#f97316', bg: 'rgba(249,115,22,0.15)', count: 3, status: 'warning' as const, progress: 0.38,
		  path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
		{ id: 'dash', label: 'Dash', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', count: 0, status: 'offline' as const, progress: 0.55,
		  path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'team', label: 'Team', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)', count: 99, status: 'online' as const, progress: 0.9,
		  path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Desktop &amp; Dock</h2>
	<p class="ds-desc">Desktop environment components -- dock bar, app icons with 15 style variants, dock icon style variants (macOS / Windows / iOS / Minimal), interactive window management scene, notification badge types, and spotlight search.</p>

	<!-- ═══ 1. DESKTOP DOCK BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Desktop Dock Bar</h3>
		<p class="ds-card__sub">macOS-style dock with glass background, magnification on hover, active indicator dots, separator dividers, and an integrated chat input variant.</p>

		<h4 class="ds-card__h4">Standard Dock</h4>
		<div class="dk-desktop-bg">
			<div class="dk-dock-wrap" role="navigation" aria-label="Application dock">
				<div class="dk-dock">
					{#each dockApps.slice(0, 5) as app}
						<div class="dk-dock-item-wrap" role="none">
							<div class="dk-dock-tooltip" role="tooltip" id="tooltip-{app.id}" aria-hidden={hoveredApp !== app.id}>{app.label}</div>
							<button
								class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item"
								class:dk-dock-item--active={activeApp === app.id}
								class:dk-dock-item--hovered={hoveredApp === app.id}
								style="background: {app.bg}; border-color: {activeApp === app.id ? app.color + '40' : 'transparent'};"
								aria-label="Open {app.label}"
								aria-describedby="tooltip-{app.id}"
								onmouseenter={() => hoveredApp = app.id}
								onmouseleave={() => hoveredApp = ''}
								onclick={() => activeApp = app.id}
							>
								<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
								</svg>
								{#if activeApp === app.id}
									<span class="dk-dock-dot" style="background: {app.color};" aria-hidden="true"></span>
								{/if}
							</button>
						</div>
					{/each}

					<div class="dk-dock-sep" role="separator" aria-orientation="vertical"></div>

					{#each dockApps.slice(5) as app}
						<div class="dk-dock-item-wrap" role="none">
							<div class="dk-dock-tooltip" role="tooltip" id="tooltip-{app.id}" aria-hidden={hoveredApp !== app.id}>{app.label}</div>
							<button
								class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item"
								class:dk-dock-item--active={activeApp === app.id}
								class:dk-dock-item--hovered={hoveredApp === app.id}
								style="background: {app.bg};"
								aria-label="Open {app.label}"
								aria-describedby="tooltip-{app.id}"
								onmouseenter={() => hoveredApp = app.id}
								onmouseleave={() => hoveredApp = ''}
								onclick={() => activeApp = app.id}
							>
								<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
								</svg>
								{#if activeApp === app.id}
									<span class="dk-dock-dot" style="background: {app.color};" aria-hidden="true"></span>
								{/if}
							</button>
						</div>
					{/each}
				</div>
			</div>
			<p style="text-align:center; font-size:12px; color:rgba(255,255,255,0.4); margin-top:12px;">
				Active: <strong style="color:rgba(255,255,255,0.7);">{dockApps.find(a => a.id === activeApp)?.label}</strong> -- hover icons to magnify, click to switch
			</p>
		</div>

		<h4 class="ds-card__h4">Dock with Integrated Chat Input</h4>
		<div class="dk-desktop-bg">
			<div class="dk-dock-wrap">
				<div class="dk-dock dk-dock--with-input">
					{#each dockApps.slice(0, 4) as app}
						<button
							class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item dk-dock-item--compact"
							style="background: {app.bg};"
							aria-label="Open {app.label}"
						>
							<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
							</svg>
						</button>
					{/each}
					<div class="dk-dock-sep" role="separator"></div>
					<div class="dk-dock-input-wrap">
						<svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
						<input class="dk-dock-input" type="text" placeholder="Ask anything..." aria-label="Dock search and chat" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. DESKTOP ICONS GRID — 15 STYLE VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Desktop Icons Grid -- 15 Style Variants</h3>
		<p class="ds-card__sub">App icons rendered in 15 distinct visual styles. Each variant shows 6 icons plus a labeled card for reference.</p>

		<!-- 1. Default -->
		<h4 class="ds-card__h4">1. Default -- Rounded Square, Dark BG</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--default" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg" style="background: {icon.color};">
						<svg class="dk-icon__svg" fill="none" stroke="{icon.textColor}" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 2. macOS -->
		<h4 class="ds-card__h4">2. macOS -- Squircle (22% radius), Shadow, Gradient</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--macos" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--macos" style="background: linear-gradient(145deg, {icon.color}ee, {icon.color}aa);">
						<svg class="dk-icon__svg" fill="none" stroke="rgba(255,255,255,0.95)" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 3. Minimal -->
		<h4 class="ds-card__h4">3. Minimal -- No Background, Just Icon + Label</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--minimal" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--minimal">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 4. Glassmorphism -->
		<h4 class="ds-card__h4">4. Glassmorphism -- Frosted Glass BG</h4>
		<div class="dk-glass-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:12px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--glass" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--glass">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: rgba(255,255,255,0.85);">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 5. Neon -->
		<h4 class="ds-card__h4">5. Neon -- Colored Glow Border</h4>
		<div class="dk-dark-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:12px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--neon" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--neon" style="border-color: {icon.color}44; box-shadow: 0 0 12px {icon.color}33, inset 0 0 12px {icon.color}11;">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} style="filter: drop-shadow(0 0 4px {icon.color}99);" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: {icon.color}; text-shadow: 0 0 8px {icon.color}66;">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 6. Terminal -->
		<h4 class="ds-card__h4">6. Terminal -- Green on Black, Monospace</h4>
		<div class="dk-terminal-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:12px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--terminal" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--terminal">
						<svg class="dk-icon__svg" fill="none" stroke="#00ff41" style="filter: drop-shadow(0 0 3px #00ff4166);" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label dk-icon__label--terminal">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 7. Retro / 8-bit -->
		<h4 class="ds-card__h4">7. Retro -- Pixelated Border, 8-bit Feel</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; background: #2d1b69; padding: 20px; border-radius: 8px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--retro" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--retro8bit" style="background: {icon.color}33; border-color: {icon.color}88;">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: {icon.color}; font-family: 'Courier New', monospace; font-size:10px; image-rendering: pixelated;">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 8. Win95 -->
		<h4 class="ds-card__h4">8. Win95 -- Raised 3D Border, Gray</h4>
		<div class="dk-retro-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:4px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--win95" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--win95" style="background: {icon.color}22;">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label dk-icon__label--win95">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 9. Brutalist -->
		<h4 class="ds-card__h4">9. Brutalist -- Thick Black Border, Raw</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; background: #fffbe6; padding: 20px; border-radius: 4px; border: 3px solid #111;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--brutalist" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--brutalist" style="border-color: #111; background: {icon.color}18;">
						<svg class="dk-icon__svg" fill="none" stroke="#111" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label dk-icon__label--brutalist">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 10. Neumorphism -->
		<h4 class="ds-card__h4">10. Neumorphism -- Soft Shadow Inset/Outset</h4>
		<div class="dk-neumorphism-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:16px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--neumorphism" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--neumorphism">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: #5a5f7a;">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 11. Material -->
		<h4 class="ds-card__h4">11. Material -- Elevation Shadow, Ripple</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; background: #fafafa; padding:20px; border-radius:12px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--material" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--material" style="background: {icon.color};">
						<svg class="dk-icon__svg" fill="none" stroke="#fff" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: #424242; font-weight:500;">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 12. Fluent -->
		<h4 class="ds-card__h4">12. Fluent -- Acrylic Blur Background</h4>
		<div class="dk-fluent-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:12px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--fluent" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--fluent">
						<svg class="dk-icon__svg" fill="none" stroke={icon.color} viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: rgba(255,255,255,0.9);">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 13. iOS -->
		<h4 class="ds-card__h4">13. iOS -- Superellipse Shape</h4>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--ios" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--ios" style="background: linear-gradient(180deg, {icon.color}dd, {icon.color});">
						<svg class="dk-icon__svg" fill="none" stroke="rgba(255,255,255,0.95)" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 14. Aurora -->
		<h4 class="ds-card__h4">14. Aurora -- Animated Gradient Background</h4>
		<div class="dk-dark-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:12px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--aurora" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--aurora">
						<svg class="dk-icon__svg" fill="none" stroke="rgba(255,255,255,0.9)" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label" style="color: rgba(255,255,255,0.75);">{icon.label}</span>
				</div>
			{/each}
		</div>

		<!-- 15. Cyberpunk -->
		<h4 class="ds-card__h4">15. Cyberpunk -- Neon Yellow/Pink, Glitch</h4>
		<div class="dk-cyberpunk-bg" style="display:flex; gap:20px; flex-wrap:wrap; padding:20px; border-radius:4px;">
			{#each desktopIcons as icon}
				<div class="dk-icon dk-icon--cyberpunk" role="button" tabindex="0" aria-label="Open {icon.label}">
					<div class="dk-icon__bg dk-icon__bg--cyberpunk">
						<svg class="dk-icon__svg" fill="none" stroke="#faff00" style="filter: drop-shadow(0 0 3px #ff2d9b88);" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon.path}/>
						</svg>
					</div>
					<span class="dk-icon__label dk-icon__label--cyberpunk">{icon.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 3b. ICON STYLE SHOWCASE — SAME ICON, ALL 15 STYLES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Icon Style Showcase</h3>
		<p class="ds-card__sub">Same Dashboard icon rendered in all fifteen style variants side by side for direct comparison.</p>

		<div class="dk-showcase-grid">
			<!-- 1. Default -->
			<div class="dk-showcase-item">
				<div style="width:56px;height:56px;border-radius:14px;background:#3b82f6;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#fff" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label">Default</span>
			</div>
			<!-- 2. macOS -->
			<div class="dk-showcase-item">
				<div style="width:56px;height:56px;border-radius:22%;background:linear-gradient(145deg,#3b82f6ee,#3b82f6aa);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(59,130,246,0.4);">
					<svg width="26" height="26" fill="none" stroke="rgba(255,255,255,0.95)" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label">macOS</span>
			</div>
			<!-- 3. Minimal -->
			<div class="dk-showcase-item">
				<div style="width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label">Minimal</span>
			</div>
			<!-- 4. Glass -->
			<div class="dk-showcase-item" style="background: linear-gradient(135deg,#6366f1,#8b5cf6); border-radius:10px; padding:10px;">
				<div style="width:56px;height:56px;border-radius:14px;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#60a5fa" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:rgba(255,255,255,0.85);">Glass</span>
			</div>
			<!-- 5. Neon -->
			<div class="dk-showcase-item" style="background:#0a0a0f; border-radius:10px; padding:10px;">
				<div style="width:56px;height:56px;border-radius:14px;background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.3);box-shadow:0 0 12px rgba(59,130,246,0.2),inset 0 0 12px rgba(59,130,246,0.08);display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#3b82f6" style="filter:drop-shadow(0 0 4px rgba(59,130,246,0.7));" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:#3b82f6; text-shadow: 0 0 8px rgba(59,130,246,0.5);">Neon</span>
			</div>
			<!-- 6. Terminal -->
			<div class="dk-showcase-item" style="background:#0d1117; border-radius:10px; padding:10px;">
				<div style="width:56px;height:56px;border-radius:4px;background:#0a1a0a;border:1px solid #00ff4133;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#00ff41" style="filter:drop-shadow(0 0 3px rgba(0,255,65,0.5));" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:#00ff41; font-family:monospace; font-size:11px;">Terminal</span>
			</div>
			<!-- 7. Retro 8-bit -->
			<div class="dk-showcase-item" style="background:#2d1b69; border-radius:6px; padding:10px;">
				<div style="width:56px;height:56px;border:3px solid #ff6b9d88;background:#ff6b9d22;box-shadow:0 0 0 2px #2d1b69, 3px 3px 0 #ff6b9d44;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#ff6b9d" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:#ff6b9d; font-family:monospace;">Retro</span>
			</div>
			<!-- 8. Win95 -->
			<div class="dk-showcase-item" style="background:#c0c0c0; border-radius:0; padding:10px;">
				<div style="width:56px;height:56px;background:#d4dae0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #5a5a5a;border-bottom:2px solid #5a5a5a;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="font-family:'Arial',sans-serif; font-size:11px; color:#000;">Win95</span>
			</div>
			<!-- 9. Brutalist -->
			<div class="dk-showcase-item" style="background:#fffbe6; border-radius:0; padding:10px; border:3px solid #111;">
				<div style="width:56px;height:56px;border:3px solid #111;background:rgba(59,130,246,0.1);box-shadow:4px 4px 0 #111;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#111" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="font-weight:900; letter-spacing:0.05em; text-transform:uppercase; font-size:10px;">Brutal</span>
			</div>
			<!-- 10. Neumorphism -->
			<div class="dk-showcase-item" style="background:#e0e5ec; border-radius:14px; padding:10px;">
				<div style="width:56px;height:56px;border-radius:16px;background:#e0e5ec;box-shadow:6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:#5a5f7a;">Neumorph</span>
			</div>
			<!-- 11. Material -->
			<div class="dk-showcase-item" style="background:#fafafa; border-radius:10px; padding:10px;">
				<div style="width:56px;height:56px;border-radius:12px;background:#3b82f6;box-shadow:0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
					<svg width="26" height="26" fill="none" stroke="#fff" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:#424242;">Material</span>
			</div>
			<!-- 12. Fluent -->
			<div class="dk-showcase-item" style="background: linear-gradient(135deg, #0078d4 0%, #106ebe 100%); border-radius:10px; padding:10px;">
				<div style="width:56px;height:56px;border-radius:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="rgba(255,255,255,0.95)" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:rgba(255,255,255,0.9);">Fluent</span>
			</div>
			<!-- 13. iOS -->
			<div class="dk-showcase-item">
				<div style="width:56px;height:56px;border-radius:13px;background:linear-gradient(180deg,#3b82f6dd,#3b82f6);box-shadow:0 2px 8px rgba(59,130,246,0.35);display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="rgba(255,255,255,0.95)" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label">iOS</span>
			</div>
			<!-- 14. Aurora -->
			<div class="dk-showcase-item" style="background:#0a0a0f; border-radius:10px; padding:10px;">
				<div class="dk-aurora-preview" style="width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="rgba(255,255,255,0.9)" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:rgba(255,255,255,0.75);">Aurora</span>
			</div>
			<!-- 15. Cyberpunk -->
			<div class="dk-showcase-item" style="background:#0a0a12; border-radius:4px; padding:10px; border:1px solid #faff0033;">
				<div style="width:56px;height:56px;border-radius:2px;background:rgba(250,255,0,0.05);border:2px solid #faff0066;box-shadow:0 0 8px #ff2d9b44, inset 0 0 8px #faff0011;display:flex;align-items:center;justify-content:center;">
					<svg width="26" height="26" fill="none" stroke="#faff00" style="filter:drop-shadow(0 0 3px #ff2d9b88);" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={dashIcon.path}/></svg>
				</div>
				<span class="dk-showcase-label" style="color:#faff00; font-family:monospace; text-shadow:0 0 6px #ff2d9b88;">Cyber</span>
			</div>
		</div>
	</div>

	<!-- ═══ 4. WINDOW CHROME ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Window Chrome</h3>
		<p class="ds-card__sub">Desktop window decorations -- macOS traffic lights, Windows-style controls, custom glass window, floating window with shadow, and minimized window pill.</p>

		<h4 class="ds-card__h4">macOS Style Window</h4>
		<div class="ds-demo" style="flex-direction:column; align-items:stretch; gap:16px;">
			<div class="dk-window" role="dialog" aria-label="Dashboard window">
				<div class="dk-window__bar" role="toolbar" aria-label="Window controls">
					<div class="dk-window__traffic" role="group" aria-label="macOS window controls">
						<button class="dk-traffic dk-traffic--close" aria-label="Close window" title="Close">
							<svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" stroke-linecap="round"/></svg>
						</button>
						<button class="dk-traffic dk-traffic--minimize" aria-label="Minimize window" title="Minimize" onclick={() => windowMinimized = true}>
							<svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 5h7" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" stroke-linecap="round"/></svg>
						</button>
						<button class="dk-traffic dk-traffic--maximize" aria-label="Maximize window" title="Maximize">
							<svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2h6v6H2z" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/></svg>
						</button>
					</div>
					<div class="dk-window__title-wrap">
						<div class="dk-window__title-icon" style="background: rgba(59,130,246,0.15);">
							<svg width="12" height="12" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
						</div>
						<span class="dk-window__title">Dashboard</span>
					</div>
					<div style="width:66px;"></div>
				</div>

				{#if !windowMinimized}
					<div class="dk-window__content" aria-live="polite">
						<div class="dk-window__toolbar">
							<div class="dk-window__tabs">
								{#each ['Overview', 'Analytics', 'Reports'] as tab, i}
									<button class="dk-window__tab" class:dk-window__tab--active={i === 0} aria-pressed={i === 0}>{tab}</button>
								{/each}
							</div>
							<button class="btn-glass btn-glass-pill btn-glass-accent btn-glass-sm" style="margin-left:auto;">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
								New
							</button>
						</div>
						<div class="dk-window__body">
							<div class="dk-window__stats">
								{#each [['Total Apps', '24'], ['Active Users', '1,284'], ['Revenue', '$48.2k']] as [label, val]}
									<div class="dk-stat">
										<span class="dk-stat__val">{val}</span>
										<span class="dk-stat__label">{label}</span>
									</div>
								{/each}
							</div>
							<div class="dk-window__placeholder">
								<div class="dk-chart-bar-group" aria-label="Activity chart (demo)">
									{#each [40, 65, 55, 80, 70, 90, 75] as h, i}
										<div class="dk-chart-bar" style="height:{h}%; background: {i === 5 ? '#3b82f6' : 'var(--dbd)'};" aria-hidden="true"></div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div class="dk-window__minimized-hint" role="status" aria-live="polite">
						<span>Window minimized</span>
						<button class="btn-glass btn-glass-pill btn-glass-subtle btn-glass-sm" onclick={() => windowMinimized = false} aria-label="Restore Dashboard window">Restore</button>
					</div>
				{/if}
			</div>
		</div>

		<h4 class="ds-card__h4">Windows Style Controls</h4>
		<div class="ds-demo" style="flex-direction:column; align-items:stretch;">
			<div class="dk-window dk-window--windows">
				<div class="dk-window__bar dk-window__bar--windows">
					<div style="display:flex; align-items:center; gap:8px;">
						<div class="dk-window__title-icon" style="background: rgba(168,85,247,0.15);">
							<svg width="12" height="12" fill="none" stroke="#a855f7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
						</div>
						<span class="dk-window__title">Projects</span>
					</div>
					<div class="dk-win-controls" role="group" aria-label="Windows controls">
						<button class="btn-compact btn-compact-ghost btn-compact-icon dk-win-btn dk-win-btn--minimize" aria-label="Minimize">
							<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M0 5h10" stroke="currentColor" stroke-width="1.2"/></svg>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon dk-win-btn dk-win-btn--maximize" aria-label="Maximize">
							<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon dk-win-btn dk-win-btn--close" aria-label="Close">
							<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.2"/></svg>
						</button>
					</div>
				</div>
				<div class="dk-window__body" style="padding:20px; min-height:60px;">
					<p style="font-size:13px; color:var(--dt3); margin:0;">Windows-style window with minimize, maximize, and close buttons on the right.</p>
				</div>
			</div>
		</div>

		<h4 class="ds-card__h4">Custom Glass Window</h4>
		<div class="dk-desktop-bg" style="padding:32px 24px;">
			<div class="dk-glass-window">
				<div class="dk-glass-window__bar">
					<div class="dk-window__traffic" role="group" aria-label="Window controls">
						<span class="dk-traffic dk-traffic--close"></span>
						<span class="dk-traffic dk-traffic--minimize"></span>
						<span class="dk-traffic dk-traffic--maximize"></span>
					</div>
					<span class="dk-glass-window__title">Settings</span>
					<div style="width:48px;"></div>
				</div>
				<div class="dk-glass-window__body">
					<p style="font-size:13px; color:rgba(255,255,255,0.7); margin:0;">Frosted glass window with backdrop blur over the desktop background.</p>
				</div>
			</div>
		</div>

		<h4 class="ds-card__h4">Floating Window with Deep Shadow</h4>
		<div class="ds-demo" style="flex-direction:column; align-items:center; padding:32px;">
			<div class="dk-floating-window">
				<div class="dk-window__bar">
					<div class="dk-window__traffic" role="group" aria-label="Window controls">
						<span class="dk-traffic dk-traffic--close"></span>
						<span class="dk-traffic dk-traffic--minimize"></span>
						<span class="dk-traffic dk-traffic--maximize"></span>
					</div>
					<span class="dk-window__title" style="font-size:12px;">Quick Note</span>
					<div style="width:48px;"></div>
				</div>
				<div style="padding:12px 16px; font-size:13px; color:var(--dt2);">
					Floating window with elevated shadow for focus.
				</div>
			</div>
		</div>

		<h4 class="ds-card__h4">Minimized Window Pills (in Dock)</h4>
		<div class="dk-desktop-bg" style="padding:24px;">
			<div class="dk-dock-wrap">
				<div class="dk-dock">
					<div class="dk-minimized-pill" role="button" tabindex="0" aria-label="Restore Dashboard">
						<div class="dk-minimized-pill__icon" style="background:rgba(59,130,246,0.2);">
							<svg width="10" height="10" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={dashIcon.path}/></svg>
						</div>
						<span class="dk-minimized-pill__label">Dashboard</span>
					</div>
					<div class="dk-minimized-pill" role="button" tabindex="0" aria-label="Restore Projects">
						<div class="dk-minimized-pill__icon" style="background:rgba(168,85,247,0.2);">
							<svg width="10" height="10" fill="none" stroke="#a855f7" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
						</div>
						<span class="dk-minimized-pill__label">Projects</span>
					</div>
					<div class="dk-minimized-pill" role="button" tabindex="0" aria-label="Restore Chat">
						<div class="dk-minimized-pill__icon" style="background:rgba(34,197,94,0.2);">
							<svg width="10" height="10" fill="none" stroke="#22c55e" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
						</div>
						<span class="dk-minimized-pill__label">Chat</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 5. DOCK ICON STYLE VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dock Icon Style Variants</h3>
		<p class="ds-card__sub">Four complete dock bars, each showcasing a distinct OS-inspired icon rendering system. Toggle between variants using the tabs.</p>

		<div class="dk-style-picker" role="tablist" aria-label="Dock icon style variants">
			{#each ([['macos','macOS'],['windows','Windows'],['ios','iOS'],['mono','Minimal']] as const) as [key, label]}
				<button
					class="dk-style-tab"
					class:dk-style-tab--active={activeDockStyle === key}
					role="tab"
					aria-selected={activeDockStyle === key}
					onclick={() => activeDockStyle = key}
				>{label}</button>
			{/each}
		</div>

		{#if activeDockStyle === 'macos'}
		<div class="dk-sv-scene dk-sv-scene--dark">
			<p class="dk-sv-label">macOS -- rounded-rect (12px radius), gradient fill, colored ambient shadow per icon</p>
			<div class="dk-sv-dock">
				{#each dockStyleApps as app}
					<div class="dk-sv-item-wrap">
						<button
							class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-sv-btn dk-sv-btn--macos"
							class:dk-sv-btn--active-macos={activeWinApp === app.id}
							style="background: linear-gradient(145deg, {app.color}ee, {app.color}aa); box-shadow: 0 4px 14px {app.color}44, 0 1px 0 rgba(255,255,255,0.2) inset;"
							aria-label="Open {app.label}"
							aria-pressed={activeWinApp === app.id}
							onclick={() => activeWinApp = app.id}
						>
							<svg class="dk-sv-icon" fill="none" stroke="rgba(255,255,255,0.95)" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
							</svg>
							{#if activeWinApp === app.id}
								<span class="dk-sv-dot" style="background: {app.color};" aria-hidden="true"></span>
							{/if}
						</button>
						<span class="dk-sv-app-label" style="color:rgba(255,255,255,0.5);">{app.label}</span>
					</div>
				{/each}
			</div>
			<p class="dk-sv-hint">Rounded square, gradient fill, shadow tinted per icon color; active shows dot indicator below</p>
		</div>
		{/if}

		{#if activeDockStyle === 'windows'}
		<div class="dk-sv-scene dk-sv-scene--mid">
			<p class="dk-sv-label">Windows 11 -- square flat icons, accent color underline marks the active app</p>
			<div class="dk-sv-dock dk-sv-dock--windows">
				{#each dockStyleApps as app}
					<div class="dk-sv-item-wrap">
						<button
							class="btn-compact btn-compact-ghost btn-compact-icon dk-sv-btn dk-sv-btn--windows"
							class:dk-sv-btn--active-windows={activeWinApp === app.id}
							aria-label="Open {app.label}"
							aria-pressed={activeWinApp === app.id}
							onclick={() => activeWinApp = app.id}
						>
							<svg class="dk-sv-icon" fill="none" stroke={app.color} viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
							</svg>
							{#if activeWinApp === app.id}
								<span class="dk-sv-underline" style="background: {app.color};" aria-hidden="true"></span>
							{/if}
						</button>
						<span class="dk-sv-app-label">{app.label}</span>
					</div>
				{/each}
			</div>
			<p class="dk-sv-hint">Flat icons with zero border-radius; active app gets a 3px accent bar underneath in the icon's color</p>
		</div>
		{/if}

		{#if activeDockStyle === 'ios'}
		<div class="dk-sv-scene dk-sv-scene--light">
			<p class="dk-sv-label">iOS -- large rounded-square (22% radius), vertical gradient fill, top-lit shine highlight</p>
			<div class="dk-sv-dock dk-sv-dock--ios">
				{#each dockStyleApps as app}
					<div class="dk-sv-item-wrap">
						<button
							class="dk-sv-btn dk-sv-btn--ios"
							class:dk-sv-btn--active-ios={activeWinApp === app.id}
							style="background: linear-gradient(175deg, {app.color}ff 0%, {app.color}cc 55%, {app.color}99 100%);"
							aria-label="Open {app.label}"
							aria-pressed={activeWinApp === app.id}
							onclick={() => activeWinApp = app.id}
						>
							<div class="dk-sv-ios-shine" aria-hidden="true"></div>
							<svg class="dk-sv-icon dk-sv-icon--lg" fill="none" stroke="rgba(255,255,255,0.97)" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={app.path}/>
							</svg>
							{#if activeWinApp === app.id}
								<span class="dk-sv-dot-ios" aria-hidden="true"></span>
							{/if}
						</button>
						<span class="dk-sv-app-label" style="color: #1a1a2e;">{app.label}</span>
					</div>
				{/each}
			</div>
			<p class="dk-sv-hint">Superellipse shape (22% radius), gradient fill, top-shine layer adds depth; larger icon size than macOS</p>
		</div>
		{/if}

		{#if activeDockStyle === 'mono'}
		<div class="dk-sv-scene dk-sv-scene--dark2">
			<p class="dk-sv-label">Minimal -- outline icons on transparent BG; active icon fills solid</p>
			<div class="dk-sv-dock">
				{#each dockStyleApps as app}
					<div class="dk-sv-item-wrap">
						<button
							class="btn-glass btn-glass-compact btn-glass-dark btn-glass-icon dk-sv-btn dk-sv-btn--mono"
							class:dk-sv-btn--active-mono={activeWinApp === app.id}
							aria-label="Open {app.label}"
							aria-pressed={activeWinApp === app.id}
							onclick={() => activeWinApp = app.id}
						>
							<svg
								class="dk-sv-icon"
								fill={activeWinApp === app.id ? 'rgba(255,255,255,0.9)' : 'none'}
								stroke={activeWinApp === app.id ? 'none' : 'rgba(255,255,255,0.38)'}
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={app.path}/>
							</svg>
						</button>
						<span class="dk-sv-app-label" style="color: rgba(255,255,255,{activeWinApp === app.id ? '0.85' : '0.38'});">{app.label}</span>
					</div>
				{/each}
			</div>
			<p class="dk-sv-hint">No background per icon -- dock bar itself is the container; outline at rest, filled solid when active</p>
		</div>
		{/if}
	</div>

	<!-- ═══ 6. WINDOW MANAGEMENT SCENE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Window Management</h3>
		<p class="ds-card__sub">Mini desktop scene with three overlapping windows at different z-levels. Click a window to bring it to front. Use the yellow traffic-light button to minimize a window to the tray below.</p>

		<div class="dk-wm-desktop" aria-label="Window management demo">
			{#each wmWindows.filter(w => !w.minimized).sort((a, b) => a.z - b.z) as win (win.id)}
				{@const isTop = win.z === Math.max(...wmWindows.filter(w => !w.minimized).map(w => w.z))}
				{@const offX = win.id === 'dash' ? '0px' : win.id === 'chat' ? '44px' : '88px'}
				{@const offY = win.id === 'dash' ? '0px' : win.id === 'chat' ? '32px' : '64px'}
				<div
					class="dk-wm-window"
					class:dk-wm-window--active={isTop}
					style="z-index: {win.z}; left: {offX}; top: {offY};"
					role="button"
					tabindex="0"
					aria-label="Focus {win.label} window"
					onclick={() => wmFocus(win.id)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') wmFocus(win.id); }}
				>
					<div class="dk-wm-bar" style="background: {isTop ? win.color + '1a' : 'var(--dbg2)'};">
						<div class="dk-window__traffic" role="group" aria-label="Window controls">
							<button
								class="dk-traffic dk-traffic--close"
								aria-label="Close {win.label}"
								onclick={(e) => { e.stopPropagation(); wmMinimize(win.id); }}
							>
								<svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" stroke-linecap="round"/></svg>
							</button>
							<button
								class="dk-traffic dk-traffic--minimize"
								aria-label="Minimize {win.label}"
								onclick={(e) => { e.stopPropagation(); wmMinimize(win.id); }}
							>
								<svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 5h7" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" stroke-linecap="round"/></svg>
							</button>
							<button class="dk-traffic dk-traffic--maximize" aria-label="Maximize {win.label}" onclick={(e) => e.stopPropagation()}>
								<svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2h6v6H2z" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/></svg>
							</button>
						</div>
						<div class="dk-wm-title-row">
							<div class="dk-window__title-icon" style="background: {win.bg};">
								<svg width="11" height="11" fill="none" stroke={win.color} viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={win.path}/>
								</svg>
							</div>
							<span class="dk-wm-title">{win.label}</span>
							{#if isTop}<span class="dk-wm-active-pill" style="background: {win.color}22; color: {win.color};">Active</span>{/if}
						</div>
						<div style="width: 66px;"></div>
					</div>
					<div class="dk-wm-body">
						<div class="dk-wm-lines">
							<div class="dk-wm-line" style="width:70%; background: {win.color}2a;"></div>
							<div class="dk-wm-line" style="width:90%; background: {win.color}18;"></div>
							<div class="dk-wm-line" style="width:50%; background: {win.color}18;"></div>
						</div>
					</div>
				</div>
			{/each}

			<div class="dk-wm-tray" aria-label="Minimized windows tray" aria-live="polite">
				{#each wmWindows.filter(w => w.minimized) as win (win.id)}
					<button
						class="btn-glass btn-glass-compact btn-glass-subtle dk-wm-thumb"
						style="border-color: {win.color}44;"
						aria-label="Restore {win.label}"
						onclick={() => wmFocus(win.id)}
					>
						<div class="dk-wm-thumb__bar" style="background: {win.color}18;">
							<div role="presentation" aria-hidden="true" style="display:flex; gap:4px; align-items:center;">
								<span class="dk-traffic dk-traffic--close" style="pointer-events:none;"></span>
								<span class="dk-traffic dk-traffic--minimize" style="pointer-events:none;"></span>
								<span class="dk-traffic dk-traffic--maximize" style="pointer-events:none;"></span>
							</div>
						</div>
						<div class="dk-wm-thumb__body">
							<svg width="14" height="14" fill="none" stroke={win.color} viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={win.path}/>
							</svg>
							<span class="dk-wm-thumb__label" style="color: {win.color};">{win.label}</span>
						</div>
					</button>
				{:else}
					<span class="dk-wm-tray-empty">Minimize a window to see its preview here</span>
				{/each}
			</div>

			<p style="text-align:center; font-size:11px; color:var(--dt4); margin-top:8px;">
				Click any window to focus it -- use yellow dot to minimize to tray
			</p>
		</div>
	</div>

	<!-- ═══ 7. NOTIFICATION BADGES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Badges</h3>
		<p class="ds-card__sub">Four distinct badge patterns shown on dock icons: numeric count, presence dot, ring progress indicator, and service status dot.</p>

		<div class="dk-badge-grid">
			<!-- Numeric badges -->
			<div class="dk-badge-col">
				<h4 class="dk-badge-col__title">Numeric</h4>
				<p class="dk-badge-col__sub">Red circle with count; "99+" for large values</p>
				<div class="dk-desktop-bg" style="padding: 20px; display: flex; gap: 20px; justify-content: center; border-radius: 12px;">
					{#each badgeApps as app}
						<div class="dk-badge-wrap">
							<button class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item" style="background: {app.bg};" aria-label="Open {app.label}">
								<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
								</svg>
							</button>
							{#if app.count > 0}
								<span class="dk-badge dk-badge--numeric" aria-label="{app.count} notifications">{app.count > 99 ? '99+' : app.count}</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Dot badges -->
			<div class="dk-badge-col">
				<h4 class="dk-badge-col__title">Dot</h4>
				<p class="dk-badge-col__sub">Small colored dot -- unread indicator without count</p>
				<div class="dk-desktop-bg" style="padding: 20px; display: flex; gap: 20px; justify-content: center; border-radius: 12px;">
					{#each badgeApps as app}
						<div class="dk-badge-wrap">
							<button class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item" style="background: {app.bg};" aria-label="Open {app.label}">
								<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
								</svg>
							</button>
							{#if app.count > 0}
								<span class="dk-badge dk-badge--dot" style="background: {app.color};" aria-label="Unread" aria-hidden="true"></span>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Progress ring badges -->
			<div class="dk-badge-col">
				<h4 class="dk-badge-col__title">Progress Ring</h4>
				<p class="dk-badge-col__sub">Tiny SVG ring showing task completion</p>
				<div class="dk-desktop-bg" style="padding: 20px; display: flex; gap: 20px; justify-content: center; border-radius: 12px;">
					{#each badgeApps as app}
						{@const r = 7}
						{@const circ = 2 * Math.PI * r}
						{@const filled = app.progress * circ}
						{@const empty = circ - filled}
						<div class="dk-badge-wrap">
							<button class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item" style="background: {app.bg};" aria-label="Open {app.label}">
								<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
								</svg>
							</button>
							<svg class="dk-badge dk-badge--ring" viewBox="0 0 18 18" aria-label="{Math.round(app.progress * 100)}% complete" role="img">
								<circle cx="9" cy="9" r={r} fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2.5"/>
								<circle cx="9" cy="9" r={r} fill="none" stroke={app.color} stroke-width="2.5"
									stroke-dasharray="{filled} {empty}" stroke-linecap="round" transform="rotate(-90 9 9)"/>
							</svg>
						</div>
					{/each}
				</div>
			</div>

			<!-- Status badges -->
			<div class="dk-badge-col">
				<h4 class="dk-badge-col__title">Status</h4>
				<p class="dk-badge-col__sub">Green / yellow / grey dot for service health</p>
				<div class="dk-desktop-bg" style="padding: 20px; display: flex; gap: 20px; justify-content: center; border-radius: 12px;">
					{#each badgeApps as app}
						{@const statusColor = app.status === 'online' ? '#22c55e' : app.status === 'warning' ? '#f59e0b' : '#6b7280'}
						<div class="dk-badge-wrap">
							<button class="btn-glass btn-glass-rounded btn-glass-frosted btn-glass-icon dk-dock-item" style="background: {app.bg};" aria-label="Open {app.label}">
								<svg class="dk-dock-icon" style="color: {app.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={app.path}/>
								</svg>
							</button>
							<span
								class="dk-badge dk-badge--status"
								style="background: {statusColor}; box-shadow: 0 0 0 2px #1a1a2e, 0 0 5px {statusColor}88;"
								aria-label="{app.status}"
								aria-hidden="true"
							></span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 8. SPOTLIGHT SEARCH ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Spotlight Search</h3>
		<p class="ds-card__sub">Desktop search overlay with large centered input, grouped results, category headers, and keyboard shortcut hints.</p>

		<div class="ds-demo" style="justify-content: center;">
			<button
				class="dk-spotlight-trigger btn-glass btn-glass-pill btn-glass-frosted"
				onclick={() => spotlightOpen = !spotlightOpen}
				aria-expanded={spotlightOpen}
				aria-haspopup="dialog"
			>
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				Search everything
				<kbd class="dk-kbd" aria-label="Keyboard shortcut Command K">&#8984;K</kbd>
			</button>
		</div>

		{#if spotlightOpen}
			<div class="dk-spotlight" role="dialog" aria-modal="true" aria-label="Spotlight search">
				<div class="dk-spotlight__input-wrap">
					<svg class="dk-spotlight__icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					<input
						class="dk-spotlight__input"
						type="search"
						placeholder="Search apps, files, settings..."
						bind:value={spotlightQuery}
						aria-label="Spotlight search"
						aria-autocomplete="list"
						aria-controls="spotlight-results"
						autofocus
					/>
					{#if spotlightQuery}
						<button class="dk-spotlight__clear" onclick={() => spotlightQuery = ''} aria-label="Clear search">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					{:else}
						<kbd class="dk-kbd" aria-label="Press Escape to close">Esc</kbd>
					{/if}
				</div>

				<div class="dk-spotlight__results" id="spotlight-results" role="listbox" aria-label="Search results">
					{#if filteredResults.length === 0}
						<div class="dk-spotlight__empty" role="status">No results for "<strong>{spotlightQuery}</strong>"</div>
					{:else}
						{#each filteredResults as group}
							<div class="dk-spotlight__group">
								<div class="dk-spotlight__group-label" role="presentation">{group.category}</div>
								{#each group.items as item}
									<button class="dk-spotlight__item" role="option" aria-selected="false">
										<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
										{item}
									</button>
								{/each}
							</div>
						{/each}
					{/if}
				</div>

				<div class="dk-spotlight__footer" role="complementary" aria-label="Keyboard navigation hints">
					<span><kbd class="dk-kbd--sm" aria-label="Arrow up">&#8593;</kbd><kbd class="dk-kbd--sm" aria-label="Arrow down">&#8595;</kbd> Navigate</span>
					<span><kbd class="dk-kbd--sm" aria-label="Enter">&#8629;</kbd> Open</span>
					<span><kbd class="dk-kbd--sm" aria-label="Escape">Esc</kbd> Close</span>
					<button
						class="dk-spotlight__close"
						onclick={() => { spotlightOpen = false; spotlightQuery = ''; }}
						aria-label="Close spotlight search"
					>Close</button>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
/* ══════════════════════════════════════════════════════════════ */
/*  DOCK                                                         */
/* ══════════════════════════════════════════════════════════════ */
.dk-desktop-bg {
	background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
	border-radius: 16px;
	padding: 32px 24px 20px;
	position: relative;
}
.dk-dock-wrap {
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.dk-dock {
	display: flex;
	align-items: flex-end;
	gap: 8px;
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 20px;
	padding: 10px 14px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255,255,255,0.08) inset;
}
.dk-dock--with-input {
	align-items: center;
	gap: 6px;
	padding: 8px 10px;
}
.dk-dock-item-wrap {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.dk-dock-tooltip {
	position: absolute;
	bottom: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);
	background: rgba(20, 20, 30, 0.92);
	color: rgba(255,255,255,0.92);
	font-size: 11px;
	font-weight: 500;
	padding: 4px 10px;
	border-radius: 8px;
	white-space: nowrap;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.12s, transform 0.12s;
	border: 1px solid rgba(255,255,255,0.1);
	transform: translateX(-50%) translateY(4px);
	z-index: 10;
}
.dk-dock-item-wrap:hover .dk-dock-tooltip {
	opacity: 1;
	transform: translateX(-50%) translateY(0);
}
.dk-dock-item {
	width: 48px;
	height: 48px;
	border-radius: 12px;
	position: relative;
	transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s;
}
.dk-dock-item:hover, .dk-dock-item--hovered {
	transform: translateY(-6px) scale(1.18) !important;
	box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;
}
.dk-dock-item--active {
	box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
.dk-dock-item--compact {
	width: 40px;
	height: 40px;
	border-radius: 10px;
}
.dk-dock-item--compact:hover {
	transform: translateY(-3px) scale(1.1) !important;
}
.dk-dock-icon {
	width: 24px;
	height: 24px;
}
.dk-dock-dot {
	position: absolute;
	bottom: -7px;
	left: 50%;
	transform: translateX(-50%);
	width: 4px;
	height: 4px;
	border-radius: 50%;
}
.dk-dock-sep {
	width: 1px;
	height: 32px;
	background: rgba(255, 255, 255, 0.15);
	margin: 0 4px;
	align-self: center;
}

/* Dock integrated chat input */
.dk-dock-input-wrap {
	display: flex;
	align-items: center;
	gap: 6px;
	background: rgba(255,255,255,0.06);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 12px;
	padding: 6px 12px;
	min-width: 180px;
}
.dk-dock-input {
	background: transparent;
	border: none;
	outline: none;
	font-size: 12px;
	font-family: inherit;
	color: rgba(255,255,255,0.8);
	width: 100%;
}
.dk-dock-input::placeholder {
	color: rgba(255,255,255,0.35);
}

/* ══════════════════════════════════════════════════════════════ */
/*  DESKTOP ICONS — BASE                                         */
/* ══════════════════════════════════════════════════════════════ */
.dk-icon {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	cursor: pointer;
	user-select: none;
	transition: transform 0.12s;
	outline: none;
}
.dk-icon:focus-visible {
	outline: 2px solid #3b82f6;
	outline-offset: 4px;
	border-radius: 4px;
}
.dk-icon:hover { transform: scale(1.06); }
.dk-icon:active { transform: scale(0.97); }
.dk-icon__svg {
	width: 26px;
	height: 26px;
	flex-shrink: 0;
}
.dk-icon__label {
	font-size: 11px;
	font-weight: 500;
	color: var(--dt2);
	text-align: center;
	line-height: 1.2;
	max-width: 64px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* Default */
.dk-icon--default .dk-icon__bg,
.dk-icon__bg {
	width: 52px;
	height: 52px;
	border-radius: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* macOS squircle */
.dk-icon__bg--macos {
	border-radius: 22%;
	box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}

/* Minimal */
.dk-icon__bg--minimal {
	background: transparent;
}

/* Glass */
.dk-glass-bg {
	background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
}
.dk-icon__bg--glass {
	background: rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.25);
	box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

/* Neon */
.dk-dark-bg {
	background: #0a0a0f;
}
.dk-icon__bg--neon {
	background: rgba(0,0,0,0.4);
	border: 1px solid;
	border-radius: 14px;
}

/* Terminal */
.dk-terminal-bg {
	background: #0d1117;
}
.dk-icon__bg--terminal {
	background: #0a1a0a;
	border: 1px solid #00ff4133;
	border-radius: 4px;
}
.dk-icon__label--terminal {
	color: #00ff41;
	font-family: 'Courier New', Courier, monospace;
	font-size: 10px;
	text-shadow: 0 0 6px rgba(0, 255, 65, 0.5);
}

/* Retro 8-bit */
.dk-icon__bg--retro8bit {
	border: 3px solid;
	border-radius: 0;
	box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
	image-rendering: pixelated;
}

/* Win95 */
.dk-retro-bg {
	background: #c0c0c0;
}
.dk-icon__bg--win95 {
	border-top: 2px solid #ffffff;
	border-left: 2px solid #ffffff;
	border-right: 2px solid #5a5a5a;
	border-bottom: 2px solid #5a5a5a;
	border-radius: 0;
	background: #d4dae0;
}
.dk-icon__label--win95 {
	font-family: 'Arial', sans-serif;
	font-size: 11px;
	color: #000;
}

/* Brutalist */
.dk-icon__bg--brutalist {
	border: 3px solid;
	border-radius: 0;
	box-shadow: 4px 4px 0 #111;
}
.dk-icon--brutalist:hover .dk-icon__bg--brutalist {
	box-shadow: 2px 2px 0 #111;
	transform: translate(2px, 2px);
}
.dk-icon__label--brutalist {
	font-weight: 900;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	font-size: 10px;
	color: #111;
}

/* Neumorphism */
.dk-neumorphism-bg {
	background: #e0e5ec;
}
.dk-icon__bg--neumorphism {
	background: #e0e5ec;
	border-radius: 16px;
	box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;
}
.dk-icon--neumorphism:active .dk-icon__bg--neumorphism {
	box-shadow: inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff;
}

/* Material */
.dk-icon__bg--material {
	border-radius: 12px;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	position: relative;
	overflow: hidden;
}
.dk-icon--material:hover .dk-icon__bg--material {
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.dk-icon__bg--material::after {
	content: '';
	position: absolute;
	inset: 0;
	background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
	opacity: 0;
	transition: opacity 0.3s;
}
.dk-icon--material:hover .dk-icon__bg--material::after {
	opacity: 1;
}

/* Fluent */
.dk-fluent-bg {
	background: linear-gradient(135deg, #0078d4 0%, #106ebe 100%);
}
.dk-icon__bg--fluent {
	background: rgba(255,255,255,0.1);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 1px solid rgba(255,255,255,0.2);
	border-radius: 8px;
}
.dk-icon--fluent:hover .dk-icon__bg--fluent {
	background: rgba(255,255,255,0.18);
}

/* iOS superellipse */
.dk-icon__bg--ios {
	border-radius: 22.37%;
	box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* Aurora */
.dk-icon__bg--aurora {
	border-radius: 14px;
	background: linear-gradient(135deg, #6366f1, #ec4899, #06b6d4, #6366f1);
	background-size: 300% 300%;
	animation: dk-aurora 4s ease infinite;
}
@keyframes dk-aurora {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}

/* Cyberpunk */
.dk-cyberpunk-bg {
	background: #0a0a12;
	border: 1px solid #faff0022;
}
.dk-icon__bg--cyberpunk {
	border-radius: 2px;
	background: rgba(250,255,0,0.05);
	border: 2px solid #faff0066;
	box-shadow: 0 0 8px #ff2d9b44, inset 0 0 8px #faff0011;
}
.dk-icon--cyberpunk:hover .dk-icon__bg--cyberpunk {
	box-shadow: 0 0 16px #ff2d9b66, inset 0 0 12px #faff0022;
	animation: dk-glitch 0.3s ease;
}
@keyframes dk-glitch {
	0% { transform: translate(0); }
	20% { transform: translate(-2px, 1px); }
	40% { transform: translate(2px, -1px); }
	60% { transform: translate(-1px, 2px); }
	80% { transform: translate(1px, -2px); }
	100% { transform: translate(0); }
}
.dk-icon__label--cyberpunk {
	color: #faff00;
	font-family: 'Courier New', monospace;
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	text-shadow: 0 0 6px #ff2d9b88;
}

/* Aurora preview for showcase */
.dk-aurora-preview {
	background: linear-gradient(135deg, #6366f1, #ec4899, #06b6d4, #6366f1);
	background-size: 300% 300%;
	animation: dk-aurora 4s ease infinite;
}

/* ══════════════════════════════════════════════════════════════ */
/*  ICON STYLE SHOWCASE GRID                                     */
/* ══════════════════════════════════════════════════════════════ */
.dk-showcase-grid {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 12px;
}
@media (max-width: 768px) {
	.dk-showcase-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 480px) {
	.dk-showcase-grid { grid-template-columns: repeat(2, 1fr); }
}
.dk-showcase-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 16px 12px;
	border-radius: 10px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
}
.dk-showcase-label {
	font-size: 11px;
	font-weight: 600;
	color: var(--dt3);
	text-align: center;
}

/* ══════════════════════════════════════════════════════════════ */
/*  WINDOW CHROME                                                */
/* ══════════════════════════════════════════════════════════════ */
.dk-window {
	border-radius: 12px;
	border: 1px solid var(--dbd);
	overflow: hidden;
	box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
	background: var(--dbg);
}
.dk-window--windows {
	border-radius: 8px;
}
.dk-window__bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	padding: 0 12px;
	background: var(--dbg2);
	border-bottom: 1px solid var(--dbd);
	cursor: default;
	user-select: none;
	position: relative;
}
.dk-window__bar--windows {
	justify-content: space-between;
	padding: 0 8px 0 12px;
}
.dk-window__traffic {
	display: flex;
	align-items: center;
	gap: 7px;
}
.dk-traffic {
	width: 13px;
	height: 13px;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	transition: opacity 0.1s;
	opacity: 0.85;
}
.dk-traffic:hover { opacity: 1; }
.dk-traffic--close { background: #ff5f57; }
.dk-traffic--minimize { background: #ffbd2e; }
.dk-traffic--maximize { background: #28c840; }
.dk-traffic svg {
	opacity: 0;
	transition: opacity 0.1s;
}
.dk-window__bar:hover .dk-traffic svg { opacity: 1; }
.dk-window__title-wrap {
	display: flex;
	align-items: center;
	gap: 7px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.dk-window__title-icon {
	width: 20px;
	height: 20px;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.dk-window__title {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt2);
}
.dk-window__content {
	display: flex;
	flex-direction: column;
}
.dk-window__toolbar {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 10px 16px;
	border-bottom: 1px solid var(--dbd);
}
.dk-window__tabs {
	display: flex;
	gap: 2px;
}
.dk-window__tab {
	font-size: 12px;
	font-weight: 500;
	padding: 5px 14px;
	border-radius: 8px;
	border: none;
	background: transparent;
	color: var(--dt3);
	cursor: pointer;
	transition: all 0.12s;
	font-family: inherit;
}
.dk-window__tab:hover { background: var(--dbg2); color: var(--dt); }
.dk-window__tab--active {
	background: var(--dbg3);
	color: var(--dt);
	font-weight: 600;
}
.dk-window__body {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.dk-window__stats {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
}
.dk-stat {
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 10px;
	padding: 12px 16px;
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.dk-stat__val {
	font-size: 20px;
	font-weight: 700;
	letter-spacing: -0.02em;
	color: var(--dt);
}
.dk-stat__label {
	font-size: 11px;
	color: var(--dt3);
}
.dk-window__placeholder {
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 10px;
	padding: 16px;
	height: 80px;
}
.dk-chart-bar-group {
	display: flex;
	align-items: flex-end;
	gap: 6px;
	height: 100%;
}
.dk-chart-bar {
	flex: 1;
	border-radius: 3px 3px 0 0;
	min-height: 4px;
}
.dk-window__minimized-hint {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 16px;
	font-size: 12px;
	color: var(--dt3);
}

/* Windows-style controls */
.dk-win-controls {
	display: flex;
	align-items: center;
	gap: 0;
}
.dk-win-btn {
	width: 36px;
	height: 32px;
	padding: 0;
}
.dk-win-btn--close:hover { background: #e81123 !important; color: #fff !important; }

/* Glass window */
.dk-glass-window {
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(24px);
	-webkit-backdrop-filter: blur(24px);
	border: 1px solid rgba(255,255,255,0.15);
	border-radius: 14px;
	overflow: hidden;
	box-shadow: 0 8px 32px rgba(0,0,0,0.3);
	max-width: 400px;
	margin: 0 auto;
}
.dk-glass-window__bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 38px;
	padding: 0 14px;
	border-bottom: 1px solid rgba(255,255,255,0.1);
}
.dk-glass-window__title {
	font-size: 12px;
	font-weight: 600;
	color: rgba(255,255,255,0.7);
}
.dk-glass-window__body {
	padding: 16px;
}

/* Floating window */
.dk-floating-window {
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 14px;
	overflow: hidden;
	box-shadow: 0 20px 60px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.12);
	max-width: 320px;
	width: 100%;
}

/* Minimized window pills */
.dk-minimized-pill {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 5px 12px 5px 6px;
	background: rgba(255,255,255,0.06);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 10px;
	cursor: pointer;
	transition: background 0.12s;
}
.dk-minimized-pill:hover {
	background: rgba(255,255,255,0.12);
}
.dk-minimized-pill__icon {
	width: 24px;
	height: 24px;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.dk-minimized-pill__label {
	font-size: 11px;
	font-weight: 500;
	color: rgba(255,255,255,0.7);
	white-space: nowrap;
}

/* ══════════════════════════════════════════════════════════════ */
/*  SPOTLIGHT SEARCH                                             */
/* ══════════════════════════════════════════════════════════════ */
.dk-spotlight-trigger {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}
.dk-kbd {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 5px;
	font-size: 11px;
	font-family: inherit;
	padding: 1px 6px;
	color: var(--dt3);
	font-weight: 500;
}
.dk-kbd--sm {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 4px;
	font-size: 10px;
	font-family: inherit;
	padding: 1px 5px;
	color: var(--dt3);
	margin-right: 2px;
}
.dk-spotlight {
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 14px;
	overflow: hidden;
	box-shadow: 0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06);
	margin-top: 8px;
}
.dk-spotlight__input-wrap {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 16px;
	border-bottom: 1px solid var(--dbd);
}
.dk-spotlight__icon {
	color: var(--dt3);
	flex-shrink: 0;
}
.dk-spotlight__input {
	flex: 1;
	border: none;
	background: transparent;
	font-size: 15px;
	font-weight: 400;
	color: var(--dt);
	outline: none;
	font-family: inherit;
}
.dk-spotlight__input::placeholder {
	color: var(--dt3);
}
.dk-spotlight__clear {
	background: var(--dbg2);
	border: none;
	border-radius: 6px;
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: var(--dt3);
	transition: background 0.12s;
	padding: 0;
}
.dk-spotlight__clear:hover { background: var(--dbg3); color: var(--dt); }
.dk-spotlight__results {
	max-height: 280px;
	overflow-y: auto;
	padding: 8px 0;
}
.dk-spotlight__group {
	padding-bottom: 4px;
}
.dk-spotlight__group-label {
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.07em;
	color: var(--dt3);
	padding: 6px 16px 4px;
}
.dk-spotlight__item {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding: 8px 16px;
	border: none;
	background: transparent;
	text-align: left;
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
	cursor: pointer;
	font-family: inherit;
	transition: background 0.1s;
}
.dk-spotlight__item:hover, .dk-spotlight__item:focus-visible {
	background: var(--dbg2);
	outline: none;
}
.dk-spotlight__item svg { color: var(--dt3); flex-shrink: 0; }
.dk-spotlight__empty {
	text-align: center;
	padding: 24px 16px;
	font-size: 13px;
	color: var(--dt3);
}
.dk-spotlight__footer {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 8px 16px;
	border-top: 1px solid var(--dbd);
	font-size: 11px;
	color: var(--dt3);
	background: var(--dbg2);
}
.dk-spotlight__close {
	margin-left: auto;
	font-size: 11px;
	font-weight: 500;
	color: var(--dt3);
	background: transparent;
	border: none;
	cursor: pointer;
	font-family: inherit;
	padding: 2px 8px;
	border-radius: 5px;
	transition: background 0.12s, color 0.12s;
}
.dk-spotlight__close:hover { background: var(--dbd); color: var(--dt); }

/* ══════════════════════════════════════════════════════════════ */
/*  DOCK ICON STYLE VARIANTS                                     */
/* ══════════════════════════════════════════════════════════════ */
.dk-style-picker {
	display: flex;
	gap: 4px;
	margin-bottom: 20px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 10px;
	padding: 4px;
	width: fit-content;
}
.dk-style-tab {
	padding: 6px 18px;
	border: none;
	border-radius: 7px;
	font-size: 13px;
	font-weight: 500;
	font-family: inherit;
	cursor: pointer;
	background: transparent;
	color: var(--dt3);
	transition: all 0.15s;
}
.dk-style-tab:hover { color: var(--dt); background: var(--dbg3); }
.dk-style-tab--active {
	background: var(--dbg);
	color: var(--dt);
	font-weight: 600;
	box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.dk-sv-scene {
	border-radius: 16px;
	padding: 28px 24px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}
.dk-sv-scene--dark {
	background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
}
.dk-sv-scene--mid {
	background: linear-gradient(135deg, #1a1a2e, #16213e);
}
.dk-sv-scene--light {
	background: linear-gradient(135deg, #e8eaf6, #f3e5f5);
}
.dk-sv-scene--dark2 {
	background: #111118;
}
.dk-sv-label {
	font-size: 12px;
	font-weight: 600;
	color: rgba(255,255,255,0.45);
	text-align: center;
	margin: 0;
}
.dk-sv-scene--light .dk-sv-label { color: rgba(30,30,60,0.55); }
.dk-sv-hint {
	font-size: 11px;
	color: rgba(255,255,255,0.3);
	text-align: center;
	margin: 0;
}
.dk-sv-scene--light .dk-sv-hint { color: rgba(30,30,60,0.4); }

/* Dock bar shared */
.dk-sv-dock {
	display: flex;
	align-items: flex-end;
	gap: 10px;
	background: rgba(255,255,255,0.07);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 20px;
	padding: 10px 16px;
	box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}
.dk-sv-dock--windows {
	background: rgba(0,0,0,0.25);
	border-radius: 0;
	border: none;
	border-top: 1px solid rgba(255,255,255,0.08);
	gap: 2px;
	padding: 8px 16px;
	align-items: center;
}
.dk-sv-dock--ios {
	background: rgba(255,255,255,0.35);
	backdrop-filter: blur(24px);
	-webkit-backdrop-filter: blur(24px);
	border: 1px solid rgba(255,255,255,0.6);
	border-radius: 22px;
	gap: 14px;
	padding: 12px 20px;
	box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.dk-sv-item-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
}
.dk-sv-app-label {
	font-size: 10px;
	font-weight: 500;
	color: rgba(255,255,255,0.45);
	white-space: nowrap;
}

/* macOS variant */
.dk-sv-btn--macos {
	width: 48px;
	height: 48px;
	border-radius: 12px;
	transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s;
	position: relative;
}
.dk-sv-btn--macos:hover { transform: translateY(-6px) scale(1.15) !important; }
.dk-sv-btn--active-macos { transform: translateY(-2px); }

/* Windows variant */
.dk-sv-btn--windows {
	width: 44px;
	height: 44px;
	border-radius: 4px;
	position: relative;
}
.dk-sv-btn--windows:hover { background: rgba(255,255,255,0.08) !important; }
.dk-sv-btn--active-windows { background: rgba(255,255,255,0.1) !important; }
.dk-sv-underline {
	position: absolute;
	bottom: -2px;
	left: 50%;
	transform: translateX(-50%);
	width: 18px;
	height: 3px;
	border-radius: 2px;
}

/* iOS variant */
.dk-sv-btn--ios {
	width: 58px;
	height: 58px;
	border-radius: 22%;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
	position: relative;
	overflow: hidden;
	padding: 0;
	box-shadow: 0 3px 10px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.3) inset;
}
.dk-sv-btn--ios:hover { transform: scale(1.1); }
.dk-sv-btn--active-ios { box-shadow: 0 6px 18px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.3) inset; }
.dk-sv-ios-shine {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 50%;
	background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 100%);
	border-radius: 22% 22% 0 0;
	pointer-events: none;
}
.dk-sv-icon--lg {
	width: 28px;
	height: 28px;
	position: relative;
	z-index: 1;
}
.dk-sv-dot-ios {
	position: absolute;
	bottom: -6px;
	left: 50%;
	transform: translateX(-50%);
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #1a1a2e;
}

/* Minimal / mono variant */
.dk-sv-btn--mono {
	width: 48px;
	height: 48px;
	border-radius: 12px;
}
.dk-sv-btn--mono:hover { background: rgba(255,255,255,0.06) !important; }
.dk-sv-btn--active-mono { background: rgba(255,255,255,0.1) !important; }

/* Shared icon + dot */
.dk-sv-icon { width: 24px; height: 24px; }
.dk-sv-dot {
	position: absolute;
	bottom: -7px;
	left: 50%;
	transform: translateX(-50%);
	width: 4px;
	height: 4px;
	border-radius: 50%;
}

/* ══════════════════════════════════════════════════════════════ */
/*  WINDOW MANAGEMENT SCENE                                      */
/* ══════════════════════════════════════════════════════════════ */
.dk-wm-desktop {
	background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%);
	border-radius: 16px;
	padding: 24px;
	position: relative;
	min-height: 320px;
	display: flex;
	flex-direction: column;
}
.dk-wm-window {
	position: absolute;
	width: calc(100% - 120px);
	max-width: 460px;
	border-radius: 12px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	overflow: hidden;
	cursor: pointer;
	transition: box-shadow 0.2s;
	box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.1);
}
.dk-wm-window--active {
	box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 6px 20px rgba(0,0,0,0.25);
}
.dk-wm-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 38px;
	padding: 0 10px;
	border-bottom: 1px solid var(--dbd);
	cursor: default;
	user-select: none;
}
.dk-wm-title-row {
	display: flex;
	align-items: center;
	gap: 6px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.dk-wm-title {
	font-size: 12px;
	font-weight: 600;
	color: var(--dt2);
}
.dk-wm-active-pill {
	font-size: 10px;
	font-weight: 600;
	padding: 1px 7px;
	border-radius: 9999px;
}
.dk-wm-body {
	padding: 14px 16px;
	min-height: 72px;
}
.dk-wm-lines {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.dk-wm-line {
	height: 10px;
	border-radius: 5px;
}

/* Minimized tray */
.dk-wm-tray {
	margin-top: auto;
	padding-top: 180px;
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
}
.dk-wm-tray-empty {
	font-size: 11px;
	color: rgba(255,255,255,0.3);
	padding-top: 180px;
	display: block;
	text-align: center;
}
.dk-wm-thumb {
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	overflow: hidden;
	width: 80px;
	transition: transform 0.12s;
	padding: 0;
}
.dk-wm-thumb:hover { transform: translateY(-2px) !important; }
.dk-wm-thumb__bar {
	padding: 4px 6px;
	display: flex;
	align-items: center;
	gap: 3px;
	border-bottom: 1px solid rgba(255,255,255,0.06);
}
.dk-wm-thumb__body {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
	padding: 8px 4px;
}
.dk-wm-thumb__label {
	font-size: 9px;
	font-weight: 600;
	text-align: center;
	white-space: nowrap;
}

/* ══════════════════════════════════════════════════════════════ */
/*  NOTIFICATION BADGES                                          */
/* ══════════════════════════════════════════════════════════════ */
.dk-badge-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
}
@media (max-width: 640px) {
	.dk-badge-grid { grid-template-columns: 1fr; }
}
.dk-badge-col {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.dk-badge-col__title {
	font-size: 13px;
	font-weight: 700;
	color: var(--dt);
	margin: 0;
}
.dk-badge-col__sub {
	font-size: 11px;
	color: var(--dt3);
	margin: 0;
	line-height: 1.5;
}

/* Badge host: icon + badge overlay */
.dk-badge-wrap {
	position: relative;
	display: inline-flex;
	flex-direction: column;
	align-items: center;
}

/* Numeric badge */
.dk-badge--numeric {
	position: absolute;
	top: -5px;
	right: -5px;
	min-width: 18px;
	height: 18px;
	border-radius: 9px;
	background: #ef4444;
	color: #fff;
	font-size: 10px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 4px;
	box-shadow: 0 0 0 2px #1a1a2e;
	white-space: nowrap;
	line-height: 1;
}

/* Dot badge */
.dk-badge--dot {
	position: absolute;
	top: -2px;
	right: -2px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	box-shadow: 0 0 0 2px #1a1a2e;
}

/* Ring progress badge */
.dk-badge--ring {
	position: absolute;
	top: -6px;
	right: -6px;
	width: 18px;
	height: 18px;
	pointer-events: none;
}

/* Status badge */
.dk-badge--status {
	position: absolute;
	bottom: 2px;
	right: 2px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
}
</style>
