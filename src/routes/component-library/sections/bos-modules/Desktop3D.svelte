<script lang="ts">
	// ── 3D Orb View ───────────────────────────────────────────────
	let orbRotating = $state(true);
	let hoveredOrb = $state('');

	// ── Window Chrome Variants ────────────────────────────────────
	let focusedVariant = $state('default');

	// ── Focus Mode Flow ───────────────────────────────────────────
	let focusIndex = $state(1);

	const focusWindows = [
		{ id: 'tasks', label: 'Tasks', color: '#FB8C00', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', content: 'Sprint backlog · 14 items' },
		{ id: 'dashboard', label: 'Dashboard', color: '#1E88E5', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', content: 'Revenue · $48,290' },
		{ id: 'projects', label: 'Projects', color: '#8E24AA', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', content: 'Active · 7 projects' },
	];

	function focusPrev() {
		focusIndex = (focusIndex - 1 + focusWindows.length) % focusWindows.length;
	}
	function focusNext() {
		focusIndex = (focusIndex + 1) % focusWindows.length;
	}

	// ── Dock Bar ──────────────────────────────────────────────────
	let hoveredDock = $state('');
	let activeDock = $state('dashboard');
	let dockStyle = $state<'default' | 'macos' | 'minimal' | 'glass'>('default');

	const dockModules = [
		{ id: 'dashboard', label: 'Dashboard', color: '#1E88E5', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'chat', label: 'Chat', color: '#43A047', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
		{ id: 'tasks', label: 'Tasks', color: '#FB8C00', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
		{ id: 'projects', label: 'Projects', color: '#8E24AA', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
		{ id: 'team', label: 'Team', color: '#00ACC1', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
		{ id: 'knowledge', label: 'Knowledge', color: '#E53935', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
		{ id: 'calendar', label: 'Calendar', color: '#F4511E', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
		{ id: 'settings', label: 'Settings', color: '#546E7A', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
	];

	// ── Controls Overlay ──────────────────────────────────────────
	let autoRotateActive = $state(true);
	let viewMode = $state<'orb' | 'grid'>('orb');
	let helpExpanded = $state(false);
	let controlsExitHovered = $state(false);

	// ── Module data for orb windows ───────────────────────────────
	const orbWindows = [
		{ id: 'dashboard', label: 'Dashboard', color: '#1E88E5', angle: 0 },
		{ id: 'chat', label: 'Chat', color: '#43A047', angle: 60 },
		{ id: 'tasks', label: 'Tasks', color: '#FB8C00', angle: 120 },
		{ id: 'projects', label: 'Projects', color: '#8E24AA', angle: 180 },
		{ id: 'team', label: 'Team', color: '#00ACC1', angle: 240 },
		{ id: 'settings', label: 'Settings', color: '#546E7A', angle: 300 },
	];

	const moduleColors = [
		{ name: 'Dashboard', color: '#1E88E5' },
		{ name: 'Chat', color: '#43A047' },
		{ name: 'Tasks', color: '#FB8C00' },
		{ name: 'Projects', color: '#8E24AA' },
		{ name: 'Team', color: '#00ACC1' },
		{ name: 'Knowledge', color: '#E53935' },
		{ name: 'Calendar', color: '#F4511E' },
		{ name: 'Settings', color: '#546E7A' },
	];

	const prevIdx = $derived((focusIndex - 1 + focusWindows.length) % focusWindows.length);
	const nextIdx = $derived((focusIndex + 1) % focusWindows.length);
</script>

<section class="ds-section">

	<!-- ═══ 1. 3D ORB VIEW (HERO DEMO) ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">3D Orb View</h3>
		<p class="ds-card__sub">CSS <code>perspective</code> + <code>transform: rotateY() translateZ()</code> sphere arrangement. Six app windows orbit a central axis with auto-rotation.</p>

		<div class="d3-orb-controls">
			<button
				class="d3-btn {orbRotating ? 'd3-btn--active' : ''}"
				onclick={() => orbRotating = !orbRotating}
			>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
				{orbRotating ? 'Pause Rotation' : 'Resume Rotation'}
			</button>
		</div>

		<div class="d3-orb-stage">
			<div class="d3-orb-scene">
				<div class="d3-orb {orbRotating ? 'd3-orb--rotating' : ''}">
					{#each orbWindows as win}
						<div
							class="d3-win d3-win--orb {hoveredOrb === win.id ? 'd3-win--orb-hover' : ''}"
							style="--orb-angle: {win.angle}deg; --win-color: {win.color};"
							onmouseenter={() => hoveredOrb = win.id}
							onmouseleave={() => hoveredOrb = ''}
							role="button"
							tabindex="0"
						>
							<div class="d3-win__titlebar">
								<div class="d3-win__accent" style="background: {win.color};"></div>
								<span class="d3-win__name">{win.label}</span>
								<div class="d3-win__dots">
									<span class="d3-dot d3-dot--yellow"></span>
									<span class="d3-dot d3-dot--green"></span>
									<span class="d3-dot d3-dot--red"></span>
								</div>
							</div>
							<div class="d3-win__body">
								<div class="d3-win__placeholder" style="background: linear-gradient(135deg, {win.color}22 0%, {win.color}08 100%);"></div>
								<div class="d3-win__lines">
									<div class="d3-win__line" style="width: 80%; background: {win.color}44;"></div>
									<div class="d3-win__line" style="width: 60%; background: {win.color}33;"></div>
									<div class="d3-win__line" style="width: 72%; background: {win.color}22;"></div>
								</div>
							</div>
							<div class="d3-win__label" style="background: {win.color}22; color: {win.color};">{win.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 2. WINDOW CHROME VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Window Chrome Variants</h3>
		<p class="ds-card__sub">The 3D window component in every visual state — from unfocused background to fully focused foreground.</p>

		<div class="d3-tab-row">
			{#each ['default', 'focused', 'hovered', 'dimmed', 'adjacent'] as v}
				<button
					class="d3-tab {focusedVariant === v ? 'd3-tab--active' : ''}"
					onclick={() => focusedVariant = v}
				>{v}</button>
			{/each}
		</div>

		<div class="d3-variants-stage">
			{#if focusedVariant === 'default'}
				<div class="d3-chrome-wrap">
					<div class="d3-chrome d3-chrome--default">
						<div class="d3-chrome__titlebar">
							<div class="d3-chrome__accent" style="background: #1E88E5;"></div>
							<span class="d3-chrome__name">Dashboard</span>
							<div class="d3-win__dots">
								<span class="d3-dot d3-dot--yellow"></span>
								<span class="d3-dot d3-dot--green"></span>
								<span class="d3-dot d3-dot--red"></span>
							</div>
						</div>
						<div class="d3-chrome__body">
							<div class="d3-chrome__grad" style="background: linear-gradient(135deg, #1E88E522 0%, #1E88E508 100%);"></div>
							<div class="d3-chrome__lines">
								<div class="d3-chrome__line" style="width:75%; background:#1E88E544;"></div>
								<div class="d3-chrome__line" style="width:55%; background:#1E88E533;"></div>
								<div class="d3-chrome__line" style="width:65%; background:#1E88E522;"></div>
							</div>
						</div>
						<div class="d3-chrome__label" style="background:#1E88E514; color:#1E88E5;">Dashboard</div>
					</div>
					<p class="d3-chrome-desc">Default — scale 1.0, standard shadow, label visible</p>
				</div>
			{/if}

			{#if focusedVariant === 'focused'}
				<div class="d3-chrome-wrap">
					<div class="d3-chrome d3-chrome--focused">
						<div class="d3-chrome__titlebar">
							<div class="d3-chrome__accent" style="background: #1E88E5;"></div>
							<span class="d3-chrome__name">Dashboard</span>
							<div class="d3-size-controls">
								<button class="d3-size-btn">−</button>
								<span class="d3-size-label">480 × 320</span>
								<button class="d3-size-btn">+</button>
							</div>
							<div class="d3-win__dots">
								<span class="d3-dot d3-dot--yellow"></span>
								<span class="d3-dot d3-dot--green"></span>
								<span class="d3-dot d3-dot--red"></span>
							</div>
						</div>
						<div class="d3-chrome__body d3-chrome__body--tall">
							<div class="d3-chrome__grad" style="background: linear-gradient(135deg, #1E88E525 0%, #1E88E50a 100%);"></div>
							<div class="d3-chrome__lines">
								<div class="d3-chrome__line" style="width:80%; background:#1E88E555;"></div>
								<div class="d3-chrome__line" style="width:60%; background:#1E88E544;"></div>
								<div class="d3-chrome__line" style="width:70%; background:#1E88E533;"></div>
								<div class="d3-chrome__line" style="width:50%; background:#1E88E522;"></div>
							</div>
						</div>
					</div>
					<p class="d3-chrome-desc">Focused — scale 2.2×, strong shadow, size controls in titlebar, no label</p>
				</div>
			{/if}

			{#if focusedVariant === 'hovered'}
				<div class="d3-chrome-wrap">
					<div class="d3-chrome d3-chrome--hovered">
						<div class="d3-chrome__titlebar">
							<div class="d3-chrome__accent" style="background: #43A047;"></div>
							<span class="d3-chrome__name">Chat</span>
							<div class="d3-win__dots">
								<span class="d3-dot d3-dot--yellow"></span>
								<span class="d3-dot d3-dot--green"></span>
								<span class="d3-dot d3-dot--red"></span>
							</div>
						</div>
						<div class="d3-chrome__body">
							<div class="d3-chrome__grad" style="background: linear-gradient(135deg, #43A04722 0%, #43A04708 100%);"></div>
							<div class="d3-chrome__lines">
								<div class="d3-chrome__line" style="width:70%; background:#43A04744;"></div>
								<div class="d3-chrome__line" style="width:50%; background:#43A04733;"></div>
							</div>
						</div>
						<div class="d3-chrome__label" style="background:#43A04714; color:#43A047;">Chat</div>
					</div>
					<p class="d3-chrome-desc">Hovered — scale 1.08×, blue glow border <code>0 0 0 4px rgba(74,158,255,0.6)</code></p>
				</div>
			{/if}

			{#if focusedVariant === 'dimmed'}
				<div class="d3-chrome-wrap d3-chrome-wrap--dark">
					<div class="d3-chrome d3-chrome--dimmed">
						<div class="d3-chrome__titlebar d3-chrome__titlebar--dark">
							<div class="d3-chrome__accent" style="background: #FB8C00;"></div>
							<span class="d3-chrome__name" style="color:#e0e0e0;">Tasks</span>
							<div class="d3-win__dots">
								<span class="d3-dot d3-dot--yellow"></span>
								<span class="d3-dot d3-dot--green"></span>
								<span class="d3-dot d3-dot--red"></span>
							</div>
						</div>
						<div class="d3-chrome__body">
							<div class="d3-chrome__grad" style="background: linear-gradient(135deg, #FB8C0022 0%, #FB8C0008 100%);"></div>
						</div>
						<div class="d3-chrome__label" style="background:#FB8C0014; color:#FB8C00;">Tasks</div>
					</div>
					<p class="d3-chrome-desc" style="color:#666;">Dimmed — opacity 0.15, scale 0.5×, used for background windows in focus mode</p>
				</div>
			{/if}

			{#if focusedVariant === 'adjacent'}
				<div class="d3-chrome-wrap">
					<div class="d3-chrome d3-chrome--adjacent">
						<div class="d3-chrome__titlebar">
							<div class="d3-chrome__accent" style="background: #8E24AA;"></div>
							<span class="d3-chrome__name">Projects</span>
							<div class="d3-win__dots">
								<span class="d3-dot d3-dot--yellow"></span>
								<span class="d3-dot d3-dot--green"></span>
								<span class="d3-dot d3-dot--red"></span>
							</div>
						</div>
						<div class="d3-chrome__body">
							<div class="d3-chrome__grad" style="background: linear-gradient(135deg, #8E24AA22 0%, #8E24AA08 100%);"></div>
							<div class="d3-chrome__lines">
								<div class="d3-chrome__line" style="width:65%; background:#8E24AA44;"></div>
								<div class="d3-chrome__line" style="width:48%; background:#8E24AA33;"></div>
							</div>
						</div>
						<div class="d3-chrome__label" style="background:#8E24AA14; color:#8E24AA;">Projects</div>
					</div>
					<p class="d3-chrome-desc">Adjacent (Prev/Next) — opacity 0.85, scale 0.9×, rotated ±30° on Y axis</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══ 3. FOCUS MODE FLOW ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Focus Mode Flow</h3>
		<p class="ds-card__sub">Navigate between windows in focus mode. Click the arrows or dots to swap focus.</p>

		<div class="d3-focus-scene">
			<!-- Prev window -->
			<div class="d3-focus-slot d3-focus-slot--side">
				<div class="d3-focus-win d3-focus-win--prev" style="--win-color: {focusWindows[prevIdx].color};">
					<div class="d3-focus-win__titlebar">
						<div class="d3-focus-win__accent" style="background: {focusWindows[prevIdx].color};"></div>
						<span class="d3-focus-win__name">{focusWindows[prevIdx].label}</span>
					</div>
					<div class="d3-focus-win__body">
						<div class="d3-focus-win__content" style="background: linear-gradient(135deg, {focusWindows[prevIdx].color}18 0%, {focusWindows[prevIdx].color}06 100%);"></div>
					</div>
				</div>
			</div>

			<button class="d3-focus-arrow" onclick={focusPrev} aria-label="Previous window">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg>
			</button>

			<!-- Focused center window -->
			<div class="d3-focus-slot d3-focus-slot--center">
				<div class="d3-focus-win d3-focus-win--focused" style="--win-color: {focusWindows[focusIndex].color};">
					<div class="d3-focus-win__titlebar d3-focus-win__titlebar--focused">
						<div class="d3-focus-win__accent" style="background: {focusWindows[focusIndex].color};"></div>
						<span class="d3-focus-win__name">{focusWindows[focusIndex].label}</span>
						<div class="d3-size-controls">
							<button class="d3-size-btn d3-size-btn--dark">−</button>
							<span class="d3-size-label d3-size-label--dark">480 × 320</span>
							<button class="d3-size-btn d3-size-btn--dark">+</button>
						</div>
						<div class="d3-win__dots">
							<span class="d3-dot d3-dot--yellow"></span>
							<span class="d3-dot d3-dot--green"></span>
							<span class="d3-dot d3-dot--red"></span>
						</div>
					</div>
					<div class="d3-focus-win__body d3-focus-win__body--tall">
						<div class="d3-focus-win__content" style="background: linear-gradient(135deg, {focusWindows[focusIndex].color}22 0%, {focusWindows[focusIndex].color}08 100%);"></div>
						<div class="d3-focus-win__meta">
							<div class="d3-focus-win__meta-icon" style="background: {focusWindows[focusIndex].color}22; color: {focusWindows[focusIndex].color};">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d={focusWindows[focusIndex].icon}/></svg>
							</div>
							<div>
								<div class="d3-focus-win__meta-title">{focusWindows[focusIndex].label}</div>
								<div class="d3-focus-win__meta-sub">{focusWindows[focusIndex].content}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<button class="d3-focus-arrow" onclick={focusNext} aria-label="Next window">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
			</button>

			<!-- Next window -->
			<div class="d3-focus-slot d3-focus-slot--side">
				<div class="d3-focus-win d3-focus-win--next" style="--win-color: {focusWindows[nextIdx].color};">
					<div class="d3-focus-win__titlebar">
						<div class="d3-focus-win__accent" style="background: {focusWindows[nextIdx].color};"></div>
						<span class="d3-focus-win__name">{focusWindows[nextIdx].label}</span>
					</div>
					<div class="d3-focus-win__body">
						<div class="d3-focus-win__content" style="background: linear-gradient(135deg, {focusWindows[nextIdx].color}18 0%, {focusWindows[nextIdx].color}06 100%);"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="d3-focus-indicators">
			{#each focusWindows as _, i}
				<button
					class="d3-focus-dot {i === focusIndex ? 'd3-focus-dot--active' : ''}"
					onclick={() => focusIndex = i}
					aria-label="Go to window {i + 1}"
				></button>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. 3D DOCK BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">3D Dock Bar</h3>
		<p class="ds-card__sub">Glass dock — <code>backdrop-filter: blur(20px)</code>, hover lift, active indicator dot, tooltip, 4 style variants + light theme.</p>

		<div class="d3-tab-row d3-tab-row--mb">
			{#each (['default', 'macos', 'minimal', 'glass'] as const) as s}
				<button
					class="d3-tab {dockStyle === s ? 'd3-tab--active' : ''}"
					onclick={() => dockStyle = s}
				>{s}</button>
			{/each}
		</div>

		<!-- Dark preview matching 3D desktop background -->
		<div class="ds-preview-dark d3-dock-preview">
			<div class="d3-dock d3-dock--{dockStyle}">
				{#each dockModules as mod}
					<div
						class="d3-dock-item {activeDock === mod.id ? 'd3-dock-item--active' : ''}"
						onmouseenter={() => hoveredDock = mod.id}
						onmouseleave={() => hoveredDock = ''}
						onclick={() => activeDock = mod.id}
						role="button"
						tabindex="0"
					>
						{#if hoveredDock === mod.id}
							<div class="d3-dock-tooltip">{mod.label}</div>
						{/if}
						<div
							class="d3-dock-icon d3-dock-icon--{dockStyle} {hoveredDock === mod.id ? 'd3-dock-icon--hovered' : ''}"
							style="--mod-color: {mod.color};"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d={mod.icon}/></svg>
						</div>
						{#if activeDock === mod.id}
							<div class="d3-dock-dot"></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Light dock variant -->
		<div class="d3-dock-light-wrap">
			<p class="d3-dock-variant-label">Light / system theme</p>
			<div class="d3-dock d3-dock--light">
				{#each dockModules.slice(0, 6) as mod}
					<div
						class="d3-dock-item {activeDock === mod.id ? 'd3-dock-item--active' : ''}"
						onclick={() => activeDock = mod.id}
						role="button"
						tabindex="0"
					>
						<div class="d3-dock-icon d3-dock-icon--light" style="--mod-color: {mod.color};">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d={mod.icon}/></svg>
						</div>
						{#if activeDock === mod.id}
							<div class="d3-dock-dot d3-dock-dot--light"></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 5. CONTROLS OVERLAY ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Controls Overlay</h3>
		<p class="ds-card__sub">From <code>Desktop3DControls.svelte</code> — glass pill buttons for exit, auto-rotate, view mode toggle, and expandable help shortcuts.</p>

		<div class="ds-preview-dark d3-controls-preview">
			<div class="d3-controls">
				<!-- Exit -->
				<button
					class="d3-ctrl-btn d3-ctrl-btn--exit {controlsExitHovered ? 'd3-ctrl-btn--exit-hover' : ''}"
					onmouseenter={() => controlsExitHovered = true}
					onmouseleave={() => controlsExitHovered = false}
					aria-label="Exit 3D Desktop"
				>
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg>
					Exit
				</button>

				<!-- Auto-rotate toggle -->
				<button
					class="d3-ctrl-btn {autoRotateActive ? 'd3-ctrl-btn--active' : ''}"
					onclick={() => autoRotateActive = !autoRotateActive}
					aria-label="Toggle auto-rotate"
				>
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
					{autoRotateActive ? 'Rotating' : 'Paused'}
				</button>

				<!-- View mode toggle -->
				<button
					class="d3-ctrl-btn"
					onclick={() => viewMode = viewMode === 'orb' ? 'grid' : 'orb'}
					aria-label="Toggle view mode"
				>
					{#if viewMode === 'orb'}
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="10" ry="4"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
						Orb Mode
					{:else}
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
						Grid Mode
					{/if}
				</button>

				<!-- Help toggle -->
				<div class="d3-ctrl-help-wrap">
					<button
						class="d3-ctrl-btn {helpExpanded ? 'd3-ctrl-btn--active' : ''}"
						onclick={() => helpExpanded = !helpExpanded}
						aria-label="Toggle keyboard shortcuts"
					>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
						Help
					</button>
					{#if helpExpanded}
						<div class="d3-ctrl-shortcuts">
							<div class="d3-shortcut-title">Keyboard Shortcuts</div>
							<div class="d3-shortcut-row"><kbd class="d3-kbd">←</kbd><kbd class="d3-kbd">→</kbd><span>Navigate windows</span></div>
							<div class="d3-shortcut-row"><kbd class="d3-kbd">Enter</kbd><span>Focus window</span></div>
							<div class="d3-shortcut-row"><kbd class="d3-kbd">Esc</kbd><span>Exit focus mode</span></div>
							<div class="d3-shortcut-row"><kbd class="d3-kbd">Space</kbd><span>Toggle rotation</span></div>
							<div class="d3-shortcut-row"><kbd class="d3-kbd">G</kbd><span>Switch to Grid</span></div>
							<div class="d3-shortcut-row"><kbd class="d3-kbd">O</kbd><span>Switch to Orb</span></div>
						</div>
					{/if}
				</div>
			</div>

			<p class="d3-controls-hint">3D Desktop · 6 windows · {viewMode === 'orb' ? 'Orb' : 'Grid'} Mode</p>
		</div>
	</div>

	<!-- ═══ 6. VIEW MODE REFERENCE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">View Mode Reference</h3>
		<p class="ds-card__sub">Three layout modes illustrated, module color palette, CSS perspective constants, and Threlte spring parameters.</p>

		<!-- View mode diagrams -->
		<div class="d3-modes-grid">
			<div class="d3-mode-card">
				<div class="d3-mode-diagram d3-mode-diagram--orb">
					<div class="d3-diag-orb">
						{#each [0, 60, 120, 180, 240, 300] as angle}
							<div class="d3-diag-win" style="--d-angle: {angle}deg;"></div>
						{/each}
						<div class="d3-diag-center"></div>
					</div>
				</div>
				<div class="d3-mode-name">Orb Mode</div>
				<div class="d3-mode-desc">Windows on a sphere — auto-rotating with orbit controls</div>
			</div>

			<div class="d3-mode-card">
				<div class="d3-mode-diagram d3-mode-diagram--grid">
					{#each Array(6) as _}
						<div class="d3-diag-cell"></div>
					{/each}
				</div>
				<div class="d3-mode-name">Grid Mode</div>
				<div class="d3-mode-desc">Flat 3×2 grid — easier scanning, lower cognitive load</div>
			</div>

			<div class="d3-mode-card">
				<div class="d3-mode-diagram d3-mode-diagram--focus">
					<div class="d3-diag-side"></div>
					<div class="d3-diag-main"></div>
					<div class="d3-diag-side d3-diag-side--right"></div>
				</div>
				<div class="d3-mode-name">Focus Mode</div>
				<div class="d3-mode-desc">One window large and bright — adjacent windows dimmed</div>
			</div>
		</div>

		<!-- Module color reference -->
		<h4 class="ds-card__h4">Module Color Palette</h4>
		<div class="d3-color-table">
			{#each moduleColors as mod}
				<div class="d3-color-row">
					<div class="d3-color-swatch" style="background: {mod.color};"></div>
					<span class="d3-color-name">{mod.name}</span>
					<code class="d3-color-hex">{mod.color}</code>
				</div>
			{/each}
		</div>

		<!-- CSS perspective values -->
		<h4 class="ds-card__h4">CSS 3D Parameters</h4>
		<div class="d3-ref-table">
			<div class="d3-ref-row">
				<code class="d3-ref-token">perspective</code>
				<span class="d3-ref-value">800px</span>
				<span class="d3-ref-desc">Orb scene container depth</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">translateZ</code>
				<span class="d3-ref-value">160px</span>
				<span class="d3-ref-desc">Window orbital radius</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">rotateY(N)</code>
				<span class="d3-ref-value">N × 60°</span>
				<span class="d3-ref-desc">Per-window angle (6 windows, 360° ÷ 6)</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">transform-style</code>
				<span class="d3-ref-value">preserve-3d</span>
				<span class="d3-ref-desc">Scene and orb container</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">rotateX</code>
				<span class="d3-ref-value">−15°</span>
				<span class="d3-ref-desc">Slight downward tilt on the whole scene</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">backface-visibility</code>
				<span class="d3-ref-value">hidden</span>
				<span class="d3-ref-desc">Hides windows facing away from viewer</span>
			</div>
		</div>

		<!-- Spring params -->
		<h4 class="ds-card__h4">Threlte Spring Animation Parameters</h4>
		<div class="d3-ref-table">
			<div class="d3-ref-row">
				<code class="d3-ref-token">stiffness</code>
				<span class="d3-ref-value">0.08</span>
				<span class="d3-ref-desc">Low value — smooth, elastic feel on transitions</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">damping</code>
				<span class="d3-ref-value">0.7</span>
				<span class="d3-ref-desc">High value — prevents oscillation overshoot</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">precision</code>
				<span class="d3-ref-value">0.01</span>
				<span class="d3-ref-desc">Animation stop threshold for negligible motion</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">focus scale</code>
				<span class="d3-ref-value">2.2×</span>
				<span class="d3-ref-desc">Focused window size target (spring target value)</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">dimmed scale</code>
				<span class="d3-ref-value">0.5×</span>
				<span class="d3-ref-desc">Background window scale in focus mode</span>
			</div>
			<div class="d3-ref-row">
				<code class="d3-ref-token">adj. scale</code>
				<span class="d3-ref-value">0.9×</span>
				<span class="d3-ref-desc">Adjacent prev/next window scale target</span>
			</div>
		</div>
	</div>

</section>

<style>
/* ═══════════════════════════════════════════════════════════════ */
/*  3D DESKTOP — CSS prefix: d3-                                  */
/* ═══════════════════════════════════════════════════════════════ */

/* ─── Shared: Button ─────────────────────────────────────────── */
.d3-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 7px 14px;
	border-radius: 9999px;
	border: 1px solid var(--dbd);
	background: var(--dbg2);
	color: var(--dt2);
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.15s, color 0.15s, border-color 0.15s;
	font-family: inherit;
}
.d3-btn:hover {
	background: var(--dbg3);
	color: var(--dt);
}
.d3-btn--active {
	background: rgba(74, 158, 255, 0.12);
	color: #4a9eff;
	border-color: rgba(74, 158, 255, 0.3);
}

/* ─── Shared: Tabs ───────────────────────────────────────────── */
.d3-tab-row {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-bottom: 16px;
}
.d3-tab-row--mb {
	margin-bottom: 16px;
}
.d3-tab {
	padding: 5px 14px;
	border-radius: 9999px;
	border: 1px solid var(--dbd);
	background: var(--dbg2);
	color: var(--dt3);
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.15s;
	font-family: inherit;
}
.d3-tab:hover {
	color: var(--dt);
	background: var(--dbg3);
}
.d3-tab--active {
	background: var(--dt);
	color: var(--dbg);
	border-color: var(--dt);
}

/* ─── Shared: Traffic light dots ────────────────────────────── */
.d3-win__dots {
	display: flex;
	gap: 4px;
	align-items: center;
	margin-left: auto;
}
.d3-dot {
	width: 9px;
	height: 9px;
	border-radius: 50%;
	display: block;
	flex-shrink: 0;
}
.d3-dot--yellow { background: #f5a623; }
.d3-dot--green  { background: #27c840; }
.d3-dot--red    { background: #ff5f57; }

/* ─── Shared: Size controls ──────────────────────────────────── */
.d3-size-controls {
	display: flex;
	align-items: center;
	gap: 5px;
	flex: 1;
	justify-content: center;
}
.d3-size-btn {
	width: 20px;
	height: 20px;
	border-radius: 5px;
	border: 1px solid var(--dbd);
	background: var(--dbg3);
	color: var(--dt2);
	font-size: 13px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	font-family: inherit;
	line-height: 1;
}
.d3-size-btn--dark {
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.15);
	color: rgba(255, 255, 255, 0.7);
}
.d3-size-label {
	font-size: 10px;
	color: var(--dt3);
	font-family: monospace;
	white-space: nowrap;
}
.d3-size-label--dark {
	color: rgba(255, 255, 255, 0.4);
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SECTION 1 — 3D ORB VIEW                                       */
/* ═══════════════════════════════════════════════════════════════ */

.d3-orb-controls {
	display: flex;
	gap: 8px;
	margin-bottom: 20px;
}

.d3-orb-stage {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 360px;
	background: #080812;
	border-radius: 16px;
	overflow: hidden;
	padding: 40px 20px;
	position: relative;
}

.d3-orb-scene {
	perspective: 800px;
	perspective-origin: 50% 46%;
	width: 380px;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.d3-orb {
	position: relative;
	width: 0;
	height: 0;
	transform-style: preserve-3d;
	transform: rotateX(-15deg);
}

@keyframes d3-orb-spin {
	from { transform: rotateX(-15deg) rotateY(0deg); }
	to   { transform: rotateX(-15deg) rotateY(360deg); }
}

.d3-orb--rotating {
	animation: d3-orb-spin 20s linear infinite;
}

/* Individual windows on the orb */
.d3-win--orb {
	position: absolute;
	width: 124px;
	top: -60px;
	left: -62px;
	transform-style: preserve-3d;
	transform: rotateY(var(--orb-angle)) translateZ(162px);
	border-radius: 10px;
	overflow: hidden;
	background: rgba(16, 16, 30, 0.94);
	border: 1px solid rgba(255, 255, 255, 0.11);
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
	transition: box-shadow 0.2s;
	cursor: pointer;
	backface-visibility: hidden;
}

.d3-win--orb-hover {
	box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.7), 0 8px 32px rgba(0, 0, 0, 0.7);
}

.d3-win__titlebar {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 8px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.d3-win__accent {
	width: 3px;
	height: 14px;
	border-radius: 2px;
	flex-shrink: 0;
}

.d3-win__name {
	font-size: 10px;
	font-weight: 600;
	color: #dde0e8;
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.d3-win__body {
	padding: 8px;
}

.d3-win__placeholder {
	height: 38px;
	border-radius: 6px;
	margin-bottom: 7px;
}

.d3-win__lines {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.d3-win__line {
	height: 4px;
	border-radius: 2px;
}

.d3-win__label {
	padding: 3px 8px;
	font-size: 9px;
	font-weight: 700;
	text-align: center;
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SECTION 2 — WINDOW CHROME VARIANTS                            */
/* ═══════════════════════════════════════════════════════════════ */

.d3-variants-stage {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 230px;
	background: var(--dbg2);
	border-radius: 14px;
	padding: 32px 24px;
}

.d3-chrome-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}

.d3-chrome-wrap--dark {
	background: #111;
	padding: 24px 28px;
	border-radius: 12px;
}

.d3-chrome {
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid var(--dbd);
	background: var(--dbg);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
	width: 240px;
	transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
}

.d3-chrome--focused {
	width: 320px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.1);
}

.d3-chrome--hovered {
	box-shadow: 0 0 0 4px rgba(74, 158, 255, 0.6), 0 4px 16px rgba(0, 0, 0, 0.1);
	transform: scale(1.08);
}

.d3-chrome--dimmed {
	opacity: 0.15;
	transform: scale(0.5);
	background: #1a1a2e;
	border-color: rgba(255, 255, 255, 0.08);
}

.d3-chrome--adjacent {
	opacity: 0.85;
	transform: scale(0.9) rotateY(-30deg);
}

.d3-chrome__titlebar {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 10px;
	border-bottom: 1px solid var(--dbd);
	background: var(--dbg2);
}

.d3-chrome__titlebar--dark {
	background: rgba(255, 255, 255, 0.04);
	border-bottom-color: rgba(255, 255, 255, 0.06);
}

.d3-chrome__accent {
	width: 3px;
	height: 14px;
	border-radius: 2px;
	flex-shrink: 0;
}

.d3-chrome__name {
	font-size: 12px;
	font-weight: 600;
	color: var(--dt);
	flex: 1;
}

.d3-chrome__body {
	padding: 12px;
}

.d3-chrome__body--tall {
	padding: 14px;
}

.d3-chrome__grad {
	height: 56px;
	border-radius: 8px;
	margin-bottom: 10px;
}

.d3-chrome__lines {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.d3-chrome__line {
	height: 5px;
	border-radius: 3px;
}

.d3-chrome__label {
	padding: 4px 10px;
	font-size: 10px;
	font-weight: 700;
	text-align: center;
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.d3-chrome-desc {
	font-size: 12px;
	color: var(--dt3);
	text-align: center;
	max-width: 340px;
	line-height: 1.6;
	margin: 0;
}

.d3-chrome-desc code {
	background: var(--dbg3);
	padding: 1px 5px;
	border-radius: 4px;
	font-size: 11px;
	font-family: monospace;
	color: #4a9eff;
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SECTION 3 — FOCUS MODE FLOW                                   */
/* ═══════════════════════════════════════════════════════════════ */

.d3-focus-scene {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 28px 16px;
	background: #080812;
	border-radius: 16px;
	margin-bottom: 16px;
	min-height: 220px;
}

.d3-focus-slot {
	display: flex;
	align-items: center;
	justify-content: center;
}

.d3-focus-slot--side {
	flex: 0 0 auto;
}

.d3-focus-slot--center {
	flex: 0 0 auto;
}

/* Focus windows */
.d3-focus-win {
	border-radius: 10px;
	overflow: hidden;
	background: rgba(16, 16, 30, 0.95);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.d3-focus-win--prev {
	width: 110px;
	opacity: 0.55;
	transform: scale(0.85) rotateY(22deg) translateX(-6px);
	transform-origin: right center;
}

.d3-focus-win--next {
	width: 110px;
	opacity: 0.55;
	transform: scale(0.85) rotateY(-22deg) translateX(6px);
	transform-origin: left center;
}

.d3-focus-win--focused {
	width: 200px;
	border-color: rgba(255, 255, 255, 0.15);
	box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), 0 16px 48px rgba(0, 0, 0, 0.7);
}

.d3-focus-win__titlebar {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 6px 8px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.d3-focus-win__titlebar--focused {
	padding: 7px 10px;
	gap: 4px;
}

.d3-focus-win__accent {
	width: 3px;
	height: 13px;
	border-radius: 2px;
	flex-shrink: 0;
}

.d3-focus-win__name {
	font-size: 10px;
	font-weight: 600;
	color: #dde0e8;
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.d3-focus-win__body {
	padding: 8px;
}

.d3-focus-win__body--tall {
	padding: 10px;
}

.d3-focus-win__content {
	height: 52px;
	border-radius: 6px;
	margin-bottom: 8px;
}

.d3-focus-win__meta {
	display: flex;
	align-items: center;
	gap: 8px;
}

.d3-focus-win__meta-icon {
	width: 30px;
	height: 30px;
	border-radius: 7px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.d3-focus-win__meta-title {
	font-size: 11px;
	font-weight: 600;
	color: #e0e4f0;
}

.d3-focus-win__meta-sub {
	font-size: 10px;
	color: rgba(255, 255, 255, 0.38);
	margin-top: 2px;
}

/* Arrow buttons */
.d3-focus-arrow {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 1px solid rgba(255, 255, 255, 0.13);
	background: rgba(255, 255, 255, 0.06);
	color: rgba(255, 255, 255, 0.55);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.15s;
	flex-shrink: 0;
}

.d3-focus-arrow:hover {
	background: rgba(255, 255, 255, 0.13);
	color: #fff;
	border-color: rgba(255, 255, 255, 0.28);
}

/* Dot row */
.d3-focus-indicators {
	display: flex;
	justify-content: center;
	gap: 6px;
}

.d3-focus-dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	border: none;
	background: var(--dbd2);
	cursor: pointer;
	padding: 0;
	transition: background 0.15s, transform 0.15s;
}

.d3-focus-dot--active {
	background: var(--dt);
	transform: scale(1.3);
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SECTION 4 — 3D DOCK BAR                                       */
/* ═══════════════════════════════════════════════════════════════ */

.d3-dock-preview {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding: 36px 24px;
}

/* Dock container variants */
.d3-dock {
	display: flex;
	align-items: flex-end;
	gap: 6px;
	padding: 10px 14px;
	border-radius: 20px;
	position: relative;
}

.d3-dock--default {
	background: rgba(255, 255, 255, 0.08);
	border: 1px solid rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(20px);
}

.d3-dock--macos {
	background: rgba(255, 255, 255, 0.12);
	border: 1px solid rgba(255, 255, 255, 0.18);
	backdrop-filter: blur(30px);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
	border-radius: 26px;
	padding: 10px 18px;
}

.d3-dock--minimal {
	background: transparent;
	border: none;
	gap: 8px;
}

.d3-dock--glass {
	background: rgba(80, 80, 120, 0.15);
	border: 1px solid rgba(180, 180, 255, 0.14);
	backdrop-filter: blur(24px) saturate(180%);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 12px 40px rgba(0, 0, 0, 0.5);
}

.d3-dock--light {
	background: rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Dock items */
.d3-dock-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	cursor: pointer;
	transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	padding-bottom: 4px;
}

.d3-dock-item:hover {
	transform: translateY(-8px) scale(1.1);
}

/* Dock icons */
.d3-dock-icon {
	width: 44px;
	height: 44px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(255, 255, 255, 0.85);
	transition: box-shadow 0.2s;
}

.d3-dock-icon--default {
	background: color-mix(in srgb, var(--mod-color) 28%, rgba(40, 40, 60, 0.7));
}

.d3-dock-icon--macos {
	border-radius: 14px;
	background: color-mix(in srgb, var(--mod-color) 30%, rgba(20, 20, 40, 0.6));
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}

.d3-dock-icon--minimal {
	background: rgba(255, 255, 255, 0.06);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.09);
}

.d3-dock-icon--glass {
	background: color-mix(in srgb, var(--mod-color) 22%, rgba(255, 255, 255, 0.07));
	border-radius: 13px;
	border: 1px solid rgba(255, 255, 255, 0.12);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.d3-dock-icon--light {
	background: color-mix(in srgb, var(--mod-color) 16%, rgba(255, 255, 255, 0.7));
	border-radius: 12px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	color: var(--mod-color);
}

.d3-dock-icon--hovered {
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.14);
}

/* Active indicator dot */
.d3-dock-dot {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.65);
	position: absolute;
	bottom: -2px;
}

.d3-dock-dot--light {
	background: rgba(0, 0, 0, 0.4);
}

/* Tooltip */
.d3-dock-tooltip {
	position: absolute;
	bottom: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);
	background: rgba(15, 15, 26, 0.94);
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: #e0e0e8;
	font-size: 11px;
	font-weight: 600;
	padding: 4px 10px;
	border-radius: 7px;
	white-space: nowrap;
	pointer-events: none;
	backdrop-filter: blur(8px);
	animation: d3-fade-up 0.15s ease;
	z-index: 10;
}

@keyframes d3-fade-up {
	from { opacity: 0; transform: translateX(-50%) translateY(4px); }
	to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.d3-dock-light-wrap {
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: flex-start;
}

.d3-dock-variant-label {
	font-size: 11px;
	font-weight: 700;
	color: var(--dt3);
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 0.07em;
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SECTION 5 — CONTROLS OVERLAY                                  */
/* ═══════════════════════════════════════════════════════════════ */

.d3-controls-preview {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 28px;
	min-height: 200px;
	padding: 32px;
	border-radius: 16px;
}

.d3-controls {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: wrap;
	justify-content: center;
}

.d3-ctrl-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 7px 14px;
	border-radius: 9999px;
	border: 1px solid rgba(255, 255, 255, 0.13);
	background: rgba(255, 255, 255, 0.07);
	color: rgba(255, 255, 255, 0.65);
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.15s;
	backdrop-filter: blur(12px);
	font-family: inherit;
}

.d3-ctrl-btn:hover {
	background: rgba(255, 255, 255, 0.13);
	color: #fff;
	border-color: rgba(255, 255, 255, 0.22);
}

.d3-ctrl-btn--exit {
	border-color: rgba(255, 80, 80, 0.2);
	color: rgba(255, 140, 140, 0.8);
}

.d3-ctrl-btn--exit-hover {
	background: rgba(255, 60, 60, 0.2) !important;
	border-color: rgba(255, 80, 80, 0.4) !important;
	color: #ff9090 !important;
}

.d3-ctrl-btn--active {
	background: rgba(74, 158, 255, 0.18);
	border-color: rgba(74, 158, 255, 0.35);
	color: #5aaeff;
}

.d3-ctrl-help-wrap {
	position: relative;
}

.d3-ctrl-shortcuts {
	position: absolute;
	bottom: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);
	background: rgba(12, 12, 22, 0.97);
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 12px;
	padding: 14px 16px;
	min-width: 224px;
	backdrop-filter: blur(20px);
	z-index: 20;
	animation: d3-fade-up 0.15s ease;
}

.d3-shortcut-title {
	font-size: 10px;
	font-weight: 700;
	color: rgba(255, 255, 255, 0.35);
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-bottom: 10px;
}

.d3-shortcut-row {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 5px 0;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.6);
	border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.d3-shortcut-row:last-child {
	border-bottom: none;
}

.d3-shortcut-row span {
	margin-left: 2px;
}

.d3-kbd {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 2px 6px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.16);
	font-size: 11px;
	font-family: monospace;
	color: rgba(255, 255, 255, 0.8);
	min-width: 24px;
}

.d3-controls-hint {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.18);
	margin: 0;
	letter-spacing: 0.03em;
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SECTION 6 — VIEW MODE REFERENCE                               */
/* ═══════════════════════════════════════════════════════════════ */

.d3-modes-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 14px;
	margin-bottom: 28px;
}

@media (max-width: 640px) {
	.d3-modes-grid { grid-template-columns: 1fr; }
}

.d3-mode-card {
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 12px;
	overflow: hidden;
	padding: 0 0 14px;
}

.d3-mode-diagram {
	height: 112px;
	background: #0a0a16;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 12px;
}

/* Orb mini diagram */
.d3-mode-diagram--orb {
	perspective: 280px;
}

.d3-diag-orb {
	position: relative;
	width: 0;
	height: 0;
	transform-style: preserve-3d;
	transform: rotateX(-15deg);
	animation: d3-orb-spin 10s linear infinite;
}

.d3-diag-win {
	position: absolute;
	width: 38px;
	height: 28px;
	top: -14px;
	left: -19px;
	border-radius: 4px;
	background: rgba(74, 158, 255, 0.28);
	border: 1px solid rgba(74, 158, 255, 0.5);
	transform: rotateY(var(--d-angle)) translateZ(52px);
	backface-visibility: hidden;
}

.d3-diag-center {
	position: absolute;
	width: 8px;
	height: 8px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	top: -4px;
	left: -4px;
}

/* Grid mini diagram */
.d3-mode-diagram--grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 7px;
	padding: 16px;
}

.d3-diag-cell {
	height: 24px;
	border-radius: 5px;
	background: rgba(74, 158, 255, 0.22);
	border: 1px solid rgba(74, 158, 255, 0.38);
}

/* Focus mini diagram */
.d3-mode-diagram--focus {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 18px;
}

.d3-diag-main {
	flex: 1;
	height: 70px;
	border-radius: 7px;
	background: rgba(74, 158, 255, 0.4);
	border: 1px solid rgba(74, 158, 255, 0.65);
	box-shadow: 0 0 18px rgba(74, 158, 255, 0.28);
}

.d3-diag-side {
	flex: 0 0 38px;
	height: 50px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	opacity: 0.5;
	transform: rotateY(10deg);
}

.d3-diag-side--right {
	transform: rotateY(-10deg);
}

.d3-mode-name {
	font-size: 13px;
	font-weight: 700;
	color: var(--dt);
	padding: 0 14px;
	margin-bottom: 4px;
}

.d3-mode-desc {
	font-size: 12px;
	color: var(--dt3);
	padding: 0 14px;
	line-height: 1.5;
}

/* Module color table */
.d3-color-table {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 5px;
	margin-bottom: 24px;
}

@media (max-width: 500px) {
	.d3-color-table { grid-template-columns: 1fr; }
}

.d3-color-row {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 7px 10px;
	border-radius: 8px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
}

.d3-color-swatch {
	width: 20px;
	height: 20px;
	border-radius: 6px;
	flex-shrink: 0;
}

.d3-color-name {
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
	flex: 1;
}

.d3-color-hex {
	font-size: 11px;
	font-family: monospace;
	color: var(--dt3);
	background: var(--dbg3);
	padding: 2px 6px;
	border-radius: 4px;
}

/* Reference table */
.d3-ref-table {
	display: flex;
	flex-direction: column;
	border: 1px solid var(--dbd);
	border-radius: 10px;
	overflow: hidden;
	margin-bottom: 24px;
}

.d3-ref-row {
	display: grid;
	grid-template-columns: 160px 90px 1fr;
	gap: 12px;
	align-items: center;
	padding: 9px 14px;
	border-bottom: 1px solid var(--dbd);
}

.d3-ref-row:last-child {
	border-bottom: none;
}

.d3-ref-token {
	font-size: 12px;
	font-family: monospace;
	color: #4a9eff;
	background: rgba(74, 158, 255, 0.08);
	padding: 2px 7px;
	border-radius: 5px;
	white-space: nowrap;
}

.d3-ref-value {
	font-size: 12px;
	font-weight: 700;
	color: var(--dt);
	font-family: monospace;
}

.d3-ref-desc {
	font-size: 12px;
	color: var(--dt3);
	line-height: 1.5;
}
</style>
