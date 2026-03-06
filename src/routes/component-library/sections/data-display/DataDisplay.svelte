<section class="ds-section">
	<h2 class="ds-title">Data Display</h2>
	<p class="ds-desc">Tables, lists, key-value pairs, and data presentation patterns following the monochrome aesthetic.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Data Table</h3>
		<p class="ds-card__sub">Clean table with hover rows, status badges, and action buttons</p>
		<div style="border: 1px solid var(--dbd); border-radius: 12px; overflow: hidden;">
			<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
				<thead>
					<tr style="background: var(--dbg); border-bottom: 1px solid var(--dbd);">
						<th style="text-align: left; padding: 10px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dt3);">Name</th>
						<th style="text-align: left; padding: 10px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dt3);">Status</th>
						<th style="text-align: left; padding: 10px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dt3);">Priority</th>
						<th style="text-align: left; padding: 10px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dt3);">Updated</th>
						<th style="width: 50px;"></th>
					</tr>
				</thead>
				<tbody>
					{#each [
						['Auth System', 'active', '#22c55e', 'Critical', '#ef4444', '2 hours ago'],
						['API v3 Migration', 'active', '#22c55e', 'High', '#f97316', '4 hours ago'],
						['Dashboard Redesign', 'paused', '#eab308', 'Medium', '#eab308', '1 day ago'],
						['CI Pipeline', 'completed', '#6366f1', 'Low', '#22c55e', '3 days ago'],
						['Documentation', 'archived', 'var(--dt3)', 'Low', '#22c55e', '1 week ago'],
					] as [name, status, statusColor, priority, prioColor, updated]}
						<tr style="border-bottom: 1px solid var(--dbg); transition: background 0.1s;" class="ds-table-row">
							<td style="padding: 12px 16px; font-weight: 500;">{name}</td>
							<td style="padding: 12px 16px;">
								<span class="ds-status-badge ds-status-badge--{status}" style="font-size: 11px; padding: 2px 8px;">
									{#if status !== 'completed' && status !== 'archived'}<span class="ds-status-dot"></span>{/if}
									{#if status === 'completed'}<svg style="width: 10px; height: 10px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>{/if}
									{status.charAt(0).toUpperCase() + status.slice(1)}
								</span>
							</td>
							<td style="padding: 12px 16px;">
								<span class="ds-priority-badge" style="font-size: 11px; padding: 2px 8px;">
									<span class="ds-priority-dot" style="background: {prioColor};"></span>{priority}
								</span>
							</td>
							<td style="padding: 12px 16px; color: var(--dt3);">{updated}</td>
							<td style="padding: 12px 8px;">
								<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-xs">
									<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Key-Value List</h3>
		<p class="ds-card__sub">Detail panels and settings displays</p>
		<div style="max-width: 480px;">
			<div class="ds-kv-list">
				{#each [
					['Project', 'BusinessOS Platform'],
					['Version', 'v2.4.1'],
					['Framework', 'SvelteKit + Svelte 5'],
					['Runtime', 'Node.js 20 LTS'],
					['Database', 'PostgreSQL 16 + pgvector'],
					['Cache', 'Redis 7'],
					['Deploy', 'GCP Cloud Run'],
				] as [key, value]}
					<div class="ds-kv-list__row">
						<span class="ds-kv-list__key">{key}</span>
						<span class="ds-kv-list__value">{value}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Stat Cards</h3>
		<p class="ds-card__sub">Metric displays with change indicators</p>
		<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
			{#each [
				['Revenue', '$45,231', '+12.5%', true],
				['Users', '2,847', '+8.2%', true],
				['Uptime', '99.98%', '-0.01%', false],
				['Latency', '142ms', '-23ms', true],
			] as [label, value, change, positive]}
				<div class="ds-stat-card">
					<div style="font-size: 12px; color: var(--dt3); margin-bottom: 6px;">{label}</div>
					<div style="font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">{value}</div>
					<div style="font-size: 12px; margin-top: 4px; font-weight: 600; color: {positive ? '#16a34a' : '#dc2626'};">
						{change}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Activity List</h3>
		<p class="ds-card__sub">Timeline-style activity feed</p>
		<div style="max-width: 520px;">
			{#each [
				['RB', '#667eea', 'Roberto', 'deployed v2.4.1 to production', '5 min ago'],
				['PD', '#10b981', 'Pedro', 'merged PR #423 — auth refactor', '1 hour ago'],
				['NK', '#f59e0b', 'Nick', 'commented on CI pipeline config', '3 hours ago'],
				['AH', '#ec4899', 'Abdul', 'created issue — E2B timeout on large files', '6 hours ago'],
			] as [initials, color, name, action, time]}
				<div class="ds-activity-item">
					<div style="width: 32px; height: 32px; border-radius: 9999px; background: {color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: 700; flex-shrink: 0;">{initials}</div>
					<div style="flex: 1; min-width: 0;">
						<div style="font-size: 13px;"><strong>{name}</strong> {action}</div>
						<div style="font-size: 11px; color: var(--dt4); margin-top: 2px;">{time}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Empty States</h3>
		<p class="ds-card__sub">Placeholder for lists/tables with no data</p>
		<div style="display: flex; gap: 16px;">
			<div style="flex: 1; padding: 40px 20px; text-align: center; border: 1px dashed var(--dbd2); border-radius: 12px;">
				<svg style="width: 32px; height: 32px; color: var(--dt4); margin: 0 auto 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
				<div style="font-size: 14px; font-weight: 600; color: var(--dt2); margin-bottom: 4px;">No tasks yet</div>
				<div style="font-size: 12px; color: var(--dt3); margin-bottom: 12px;">Create your first task to get started</div>
				<button class="btn-pill btn-pill-primary btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
					New Task
				</button>
			</div>
			<div style="flex: 1; padding: 40px 20px; text-align: center; border: 1px dashed var(--dbd2); border-radius: 12px;">
				<svg style="width: 32px; height: 32px; color: var(--dt4); margin: 0 auto 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				<div style="font-size: 14px; font-weight: 600; color: var(--dt2); margin-bottom: 4px;">No results</div>
				<div style="font-size: 12px; color: var(--dt3);">Try adjusting your search or filters</div>
			</div>
		</div>
	</div>
</section>
