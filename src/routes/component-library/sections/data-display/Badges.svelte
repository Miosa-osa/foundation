<section class="ds-section">
	<h2 class="ds-title">Badges & Tags</h2>
	<p class="ds-desc">Status indicators, priority labels, monochrome chips, and semantic tags. Clean, minimal, consistent.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Status Badges</h3>
		<p class="ds-card__sub">Project/task lifecycle states — monochrome with subtle semantic tints</p>
		<div class="ds-demo" style="gap: 10px;">
			<span class="ds-status-badge ds-status-badge--active">
				<span class="ds-status-dot"></span>Active
			</span>
			<span class="ds-status-badge ds-status-badge--paused">
				<span class="ds-status-dot"></span>Paused
			</span>
			<span class="ds-status-badge ds-status-badge--completed">
				<svg style="width: 12px; height: 12px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
				Completed
			</span>
			<span class="ds-status-badge ds-status-badge--archived">Archived</span>
		</div>
		<h4 class="ds-card__h4">Legacy (from app.css)</h4>
		<div class="ds-demo" style="gap: 10px;">
			<span class="badge badge-active">Active</span>
			<span class="badge badge-paused">Paused</span>
			<span class="badge badge-completed">Completed</span>
			<span class="badge badge-archived">Archived</span>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Priority Badges</h3>
		<p class="ds-card__sub">Urgency indicators with color-coded dots</p>
		<div class="ds-demo" style="gap: 10px;">
			<span class="ds-priority-badge">
				<span class="ds-priority-dot" style="background: #ef4444;"></span>Critical
			</span>
			<span class="ds-priority-badge">
				<span class="ds-priority-dot" style="background: #f97316;"></span>High
			</span>
			<span class="ds-priority-badge">
				<span class="ds-priority-dot" style="background: #eab308;"></span>Medium
			</span>
			<span class="ds-priority-badge">
				<span class="ds-priority-dot" style="background: #22c55e;"></span>Low
			</span>
		</div>
		<h4 class="ds-card__h4">Filled Variant</h4>
		<div class="ds-demo" style="gap: 10px;">
			<span class="ds-priority-badge ds-priority-badge--filled" style="background: rgba(239,68,68,0.08); color: #dc2626;">Critical</span>
			<span class="ds-priority-badge ds-priority-badge--filled" style="background: rgba(249,115,22,0.08); color: #ea580c;">High</span>
			<span class="ds-priority-badge ds-priority-badge--filled" style="background: rgba(234,179,8,0.08); color: #ca8a04;">Medium</span>
			<span class="ds-priority-badge ds-priority-badge--filled" style="background: rgba(34,197,94,0.08); color: #16a34a;">Low</span>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Monochrome Tags</h3>
		<p class="ds-card__sub">Clean grayscale chips — the default tag style in MIOSA</p>

		<h4 class="ds-card__h4">Filled (Default)</h4>
		<div class="ds-demo" style="gap: 8px;">
			{#each ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Testing', 'Security', 'Docs'] as label}
				<span class="ds-mono-tag">{label}</span>
			{/each}
		</div>

		<h4 class="ds-card__h4">Outlined</h4>
		<div class="ds-demo" style="gap: 8px;">
			{#each ['React', 'Svelte', 'Go', 'TypeScript', 'PostgreSQL', 'Redis'] as label}
				<span class="ds-mono-tag ds-mono-tag--outline">{label}</span>
			{/each}
		</div>

		<h4 class="ds-card__h4">With Icon</h4>
		<div class="ds-demo" style="gap: 8px;">
			<span class="ds-mono-tag">
				<svg style="width: 12px; height: 12px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
				Feature
			</span>
			<span class="ds-mono-tag">
				<svg style="width: 12px; height: 12px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				Bug
			</span>
			<span class="ds-mono-tag">
				<svg style="width: 12px; height: 12px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
				Improvement
			</span>
		</div>

		<h4 class="ds-card__h4">Dismissible</h4>
		<div class="ds-demo" style="gap: 8px;">
			{#each ['Applied Filter', 'Selected Tag', 'Keyword'] as label}
				<span class="ds-mono-tag ds-mono-tag--dismissible">
					{label}
					<button style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: none; background: var(--dbd); border-radius: 9999px; cursor: pointer; padding: 0; margin-left: 2px;">
						<svg style="width: 8px; height: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				</span>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Semantic Color Tags</h3>
		<p class="ds-card__sub">Color-coded labels from <code>--bos-tag-*</code> tokens</p>
		<div class="ds-demo" style="gap: 8px;">
			{#each [
				['Blue','#e8f4ff','#1a7fd4'],
				['Green','#e6f6eb','#0e8345'],
				['Purple','#f3edff','#7c3aed'],
				['Red','#ffeded','#dc2626'],
				['Yellow','#fefae8','#b45309'],
				['Orange','#fff4e8','#c2410c'],
				['Teal','#e0f5f4','#0d9488'],
				['Pink','#fff0f5','#db2777'],
				['Gray','#f0f0f0','#6b7280'],
			] as [label, bg, text]}
				<span style="display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: {bg}; color: {text}; border: 1px solid {text}15;">{label}</span>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Counter Badges</h3>
		<p class="ds-card__sub">Notification counts and numeric indicators</p>
		<div class="ds-demo" style="gap: 24px;">
			<div style="display: flex; align-items: center; gap: 8px;">
				<span style="font-size: 13px; font-weight: 500; color: var(--dt2);">Notifications</span>
				<span class="ds-counter-badge">3</span>
			</div>
			<div style="display: flex; align-items: center; gap: 8px;">
				<span style="font-size: 13px; font-weight: 500; color: var(--dt2);">Messages</span>
				<span class="ds-counter-badge ds-counter-badge--muted">12</span>
			</div>
			<div style="display: flex; align-items: center; gap: 8px;">
				<span style="font-size: 13px; font-weight: 500; color: var(--dt2);">Alerts</span>
				<span class="ds-counter-badge ds-counter-badge--danger">5</span>
			</div>
			<div style="position: relative; display: inline-flex;">
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
				</button>
				<span style="position: absolute; top: -2px; right: -2px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 9999px; background: #ef4444; color: white; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center;">3</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">In Context</h3>
		<p class="ds-card__sub">How badges, tags, and priorities compose in real cards</p>
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-width: 560px;">
			<div class="ds-context-card">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h4 style="margin: 0; font-size: 14px; font-weight: 600;">API Redesign</h4>
					<span class="ds-status-badge ds-status-badge--active" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-status-dot"></span>Active
					</span>
				</div>
				<p style="margin: 0 0 12px; font-size: 13px; color: var(--dt3); line-height: 1.4;">Modernize REST endpoints to v3 spec</p>
				<div style="display: flex; gap: 6px; flex-wrap: wrap;">
					<span class="ds-priority-badge" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-priority-dot" style="background: #f97316;"></span>High
					</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Backend</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Go</span>
				</div>
			</div>
			<div class="ds-context-card">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h4 style="margin: 0; font-size: 14px; font-weight: 600;">Auth System</h4>
					<span class="ds-status-badge ds-status-badge--completed" style="font-size: 11px; padding: 2px 8px;">
						<svg style="width: 10px; height: 10px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
						Done
					</span>
				</div>
				<p style="margin: 0 0 12px; font-size: 13px; color: var(--dt3); line-height: 1.4;">JWT + refresh tokens with RBAC</p>
				<div style="display: flex; gap: 6px; flex-wrap: wrap;">
					<span class="ds-priority-badge" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-priority-dot" style="background: #ef4444;"></span>Critical
					</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Security</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Auth</span>
				</div>
			</div>
			<div class="ds-context-card">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h4 style="margin: 0; font-size: 14px; font-weight: 600;">Design System</h4>
					<span class="ds-status-badge ds-status-badge--active" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-status-dot"></span>Active
					</span>
				</div>
				<p style="margin: 0 0 12px; font-size: 13px; color: var(--dt3); line-height: 1.4;">MIOSA Foundation component library</p>
				<div style="display: flex; gap: 6px; flex-wrap: wrap;">
					<span class="ds-priority-badge" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-priority-dot" style="background: #eab308;"></span>Medium
					</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Frontend</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Svelte</span>
				</div>
			</div>
			<div class="ds-context-card">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h4 style="margin: 0; font-size: 14px; font-weight: 600;">CI/CD Pipeline</h4>
					<span class="ds-status-badge ds-status-badge--paused" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-status-dot"></span>Paused
					</span>
				</div>
				<p style="margin: 0 0 12px; font-size: 13px; color: var(--dt3); line-height: 1.4;">GCP Cloud Run auto-deploy</p>
				<div style="display: flex; gap: 6px; flex-wrap: wrap;">
					<span class="ds-priority-badge" style="font-size: 11px; padding: 2px 8px;">
						<span class="ds-priority-dot" style="background: #22c55e;"></span>Low
					</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">DevOps</span>
					<span class="ds-mono-tag" style="font-size: 11px; padding: 2px 8px;">Docker</span>
				</div>
			</div>
		</div>
	</div>
</section>
