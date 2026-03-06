<section class="ds-section">
	<h2 class="ds-title">Navigation</h2>
	<p class="ds-desc">Sidebar nav, breadcrumbs, horizontal pills, and tab-like segmented controls. All patterns use the dark monochrome aesthetic and <code>.btn-pill</code> / <code>.nav-pill</code> primitives.</p>

	<!-- ═══ 1. NAV PILLS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Nav Pills</h3>
		<p class="ds-card__sub">Horizontal navigation using <code>.nav-pill</code> — active item gets the dark gradient treatment</p>

		<h4 class="ds-card__h4">Default Horizontal Rail</h4>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 24px;">
			<nav style="display: flex; align-items: center; gap: 4px; padding: 4px; background: var(--dbg2); border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
				{#each [['Overview', true], ['Analytics', false], ['Reports', false], ['Settings', false]] as [label, active]}
					<a
						href="#"
						class="nav-pill"
						style="display: inline-flex; align-items: center; padding: 7px 16px; border-radius: 9px; font-size: 13px; font-weight: {active ? 600 : 500}; text-decoration: none; transition: all 0.15s; {active ? 'background: linear-gradient(180deg, #1a1a1a 0%, #000 100%); color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);' : 'color: var(--dt2); background: transparent;'}"
						onclick={(e) => e.preventDefault()}
					>{label}</a>
				{/each}
			</nav>

			<h4 class="ds-card__h4" style="margin-bottom: 8px;">Underline Style</h4>
			<nav style="display: flex; align-items: center; gap: 2px; border-bottom: 1px solid var(--dbd);">
				{#each [['Dashboard', false], ['Projects', true], ['Team', false], ['Billing', false]] as [label, active]}
					<a
						href="#"
						style="display: inline-flex; align-items: center; padding: 9px 18px; font-size: 13px; font-weight: {active ? 600 : 500}; text-decoration: none; color: {active ? 'var(--dt)' : 'var(--dt3)'}; border-bottom: 2px solid {active ? 'var(--dt)' : 'transparent'}; margin-bottom: -1px; transition: all 0.15s;"
						onclick={(e) => e.preventDefault()}
					>{label}</a>
				{/each}
			</nav>

			<h4 class="ds-card__h4" style="margin-bottom: 8px;">With Icons + Dot Indicator</h4>
			<nav style="display: flex; align-items: center; gap: 4px;">
				{#each [
					['Home', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', true],
					['Messages', 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', false],
					['Tasks', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', false],
				] as [label, path, active]}
					<a
						href="#"
						style="display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 9px; font-size: 13px; font-weight: {active ? 600 : 500}; text-decoration: none; transition: all 0.15s; {active ? 'background: var(--dbg3); color: var(--dt);' : 'color: var(--dt3); background: transparent;'}"
						onclick={(e) => e.preventDefault()}
					>
						<svg style="width: 15px; height: 15px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={String(path)}/></svg>
						{label}
					</a>
				{/each}
			</nav>
		</div>
	</div>

	<!-- ═══ 2. SIDEBAR NAVIGATION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sidebar Navigation</h3>
		<p class="ds-card__sub">Vertical nav list — mirrors the component library sidebar itself. Active item uses the dark monochrome gradient.</p>

		<div style="display: flex; gap: 40px; align-items: flex-start;">
			<div>
				<h4 class="ds-card__h4">Full Sidebar</h4>
				<div style="width: 220px; padding: 8px; background: var(--dbg); border-radius: 14px; border: 1px solid var(--dbd); display: flex; flex-direction: column; gap: 2px;">
					{#each [
						['Dashboard', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', true],
						['Projects', 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', false],
						['Tasks', 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', false],
						['Team', 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', false],
						['Chat', 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', false],
						['Settings', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', false],
					] as [label, path, active]}
						<a
							href="#"
							class="nav-pill"
							style="display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; font-size: 13px; font-weight: {active ? 600 : 500}; text-decoration: none; transition: all 0.15s; {active ? 'background: linear-gradient(180deg, #1a1a1a 0%, #000 100%); color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15);' : 'color: var(--dt2); background: transparent;'}"
							onclick={(e) => e.preventDefault()}
						>
							<svg style="width: 15px; height: 15px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={String(path)}/></svg>
							{label}
						</a>
					{/each}
				</div>
			</div>

			<div>
				<h4 class="ds-card__h4">Grouped with Section Labels</h4>
				<div style="width: 200px; display: flex; flex-direction: column; gap: 2px;">
					<span style="font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dt4); padding: 10px 12px 4px;">Main</span>
					{#each [['Overview', true], ['Activity', false], ['Analytics', false]] as [label, active]}
						<button style="display: flex; align-items: center; width: 100%; text-align: left; padding: 8px 12px; border-radius: 8px; border: none; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: {active ? 600 : 500}; transition: all 0.12s; {active ? 'background: var(--dbg3); color: var(--dt);' : 'background: transparent; color: var(--dt3);'}">
							{label}
						</button>
					{/each}
					<span style="font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dt4); padding: 14px 12px 4px;">Config</span>
					{#each [['Members', false], ['Billing', false], ['Settings', false]] as [label, active]}
						<button style="display: flex; align-items: center; width: 100%; text-align: left; padding: 8px 12px; border-radius: 8px; border: none; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: {active ? 600 : 500}; transition: all 0.12s; {active ? 'background: var(--dbg3); color: var(--dt);' : 'background: transparent; color: var(--dt3);'}">
							{label}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. BREADCRUMBS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Breadcrumbs</h3>
		<p class="ds-card__sub">Path navigation with separators — slash style and chevron style</p>

		<div style="display: flex; flex-direction: column; gap: 20px;">
			<div>
				<h4 class="ds-card__h4">Slash Separator</h4>
				<nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
					<a href="#" style="color: var(--dt3); text-decoration: none;" onclick={(e) => e.preventDefault()}>Home</a>
					<span style="color: var(--dt4); user-select: none;">/</span>
					<a href="#" style="color: var(--dt3); text-decoration: none;" onclick={(e) => e.preventDefault()}>Projects</a>
					<span style="color: var(--dt4); user-select: none;">/</span>
					<a href="#" style="color: var(--dt3); text-decoration: none;" onclick={(e) => e.preventDefault()}>BusinessOS</a>
					<span style="color: var(--dt4); user-select: none;">/</span>
					<span style="font-weight: 600; color: var(--dt);" aria-current="page">Frontend</span>
				</nav>
			</div>

			<div>
				<h4 class="ds-card__h4">Chevron Separator</h4>
				<nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 2px;">
					<a href="#" style="font-size: 13px; color: var(--dt3); text-decoration: none; padding: 3px 6px; border-radius: 6px;" onclick={(e) => e.preventDefault()}>Workspace</a>
					<svg style="width: 14px; height: 14px; flex-shrink: 0; color: var(--dt4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					<a href="#" style="font-size: 13px; color: var(--dt3); text-decoration: none; padding: 3px 6px; border-radius: 6px;" onclick={(e) => e.preventDefault()}>Agents</a>
					<svg style="width: 14px; height: 14px; flex-shrink: 0; color: var(--dt4);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					<span style="font-size: 13px; font-weight: 600; color: var(--dt); padding: 3px 6px;" aria-current="page">OSA-7</span>
				</nav>
			</div>

			<div>
				<h4 class="ds-card__h4">Pill Breadcrumb</h4>
				<nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 4px;">
					<button class="btn-pill btn-pill-ghost btn-pill-xs" onclick={(e) => e.preventDefault()}>Dashboard</button>
					<svg style="width: 12px; height: 12px; color: var(--dt4); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					<button class="btn-pill btn-pill-ghost btn-pill-xs" onclick={(e) => e.preventDefault()}>Team</button>
					<svg style="width: 12px; height: 12px; color: var(--dt4); flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					<button class="btn-pill btn-pill-primary btn-pill-xs" aria-current="page">Members</button>
				</nav>
			</div>
		</div>
	</div>

	<!-- ═══ 4. TAB-LIKE NAVIGATION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tab-like Navigation</h3>
		<p class="ds-card__sub">Horizontal tabs built with <code>.btn-pill-group</code> — filters, view switchers, and segmented controls</p>

		<div style="display: flex; flex-direction: column; gap: 24px;">
			<div>
				<h4 class="ds-card__h4">Segmented Control (Status Filter)</h4>
				<div class="btn-pill-group">
					<button class="btn-pill btn-pill-primary btn-pill-sm">All</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Active</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Paused</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Archived</button>
				</div>
			</div>

			<div>
				<h4 class="ds-card__h4">View Switcher</h4>
				<div class="btn-pill-group">
					<button class="btn-pill btn-pill-ghost btn-pill-sm btn-pill-icon" aria-label="List view">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
					</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm btn-pill-icon" aria-label="Grid view">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
					</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm btn-pill-icon" aria-label="Kanban view">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
					</button>
				</div>
			</div>

			<div>
				<h4 class="ds-card__h4">Date Range</h4>
				<div class="btn-pill-group">
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Today</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">7d</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm">30d</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">90d</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">1y</button>
				</div>
			</div>

			<div>
				<h4 class="ds-card__h4">Inline Toolbar with Tab-like Active State</h4>
				<div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; background: var(--dbg); border-radius: 12px; border: 1px solid var(--dbd); max-width: 480px;">
					<div style="display: flex; gap: 2px;">
						{#each [['Summary', true], ['Details', false], ['History', false]] as [label, active]}
							<button style="padding: 5px 14px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: {active ? 600 : 500}; font-family: inherit; transition: all 0.12s; {active ? 'background: var(--dbg2); color: var(--dt); box-shadow: 0 1px 3px rgba(0,0,0,0.08);' : 'background: transparent; color: var(--dt3);'}">
								{label}
							</button>
						{/each}
					</div>
					<button class="btn-pill btn-pill-ghost btn-pill-xs">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
						Filter
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ REFERENCE TABLE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">CSS Class Reference</h3>
		<p class="ds-card__sub">All navigation-related CSS classes and usage guidelines</p>
		<table class="ds-table">
			<thead>
				<tr>
					<th>Class / Pattern</th>
					<th>Element</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr><td><code>.nav-pill</code></td><td><code>a</code>, <code>button</code></td><td>Base nav item — apply active styles inline (dark gradient or <code>rgba(0,0,0,0.06)</code>)</td></tr>
				<tr><td><code>.btn-pill-group</code></td><td><code>div</code></td><td>Wraps adjacent pill buttons into a segmented control / tab bar</td></tr>
				<tr><td><code>.btn-pill-primary</code></td><td><code>button</code></td><td>Active / selected state in a pill group or standalone nav</td></tr>
				<tr><td><code>.btn-pill-ghost</code></td><td><code>button</code></td><td>Inactive / unselected state in a pill group</td></tr>
				<tr><td><code>.btn-pill-xs</code></td><td><code>button</code></td><td>Compact size — used in breadcrumbs, toolbar labels</td></tr>
				<tr><td><code>.btn-pill-sm</code></td><td><code>button</code></td><td>Small size — default for pagination and tab-like nav</td></tr>
				<tr><td><code>.btn-pill-icon</code></td><td><code>button</code></td><td>Square icon-only pill — used for prev/next pagination arrows</td></tr>
				<tr><td>Inline gradient active</td><td><code>a</code></td><td><code>background: linear-gradient(180deg, #1a1a1a 0%, #000 100%)</code> — the dark monochrome active state</td></tr>
				<tr><td>Inline soft active</td><td><code>button</code></td><td><code>background: rgba(0,0,0,0.06)</code> — lighter active for minimal sidebar variants</td></tr>
				<tr><td>Underline active</td><td><code>a</code></td><td><code>border-bottom: 2px solid #111; margin-bottom: -1px</code> — tab underline convention</td></tr>
				<tr><td><code>aria-current="page"</code></td><td>nav links</td><td>Applied to the active breadcrumb leaf or current nav item</td></tr>
				<tr><td><code>aria-current="step"</code></td><td>step items</td><td>Applied to the current step in a wizard / stepper</td></tr>
			</tbody>
		</table>
	</div>
</section>
