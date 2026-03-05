<section class="ds-section">
	<h2 class="ds-title">Timeline</h2>
	<p class="ds-desc">
		Vertical and horizontal timeline patterns, activity feeds, and event logs.
		Dark monochrome with subtle connecting lines and status-coded dots.
	</p>

	<!-- Basic vertical timeline -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Vertical Timeline</h3>
		<p class="ds-card__sub">Date, title, and description connected by a vertical rule</p>
		<div style="max-width: 520px;">
			{#each [
				{ date: 'March 5, 2026', title: 'Project Created', desc: 'Initial repository setup, README scaffolded, and base configuration committed.' },
				{ date: 'March 6, 2026', title: 'Design System Bootstrapped', desc: 'MIOSA Foundation component library initiated with Svelte 5 and Tailwind.' },
				{ date: 'March 7, 2026', title: 'Core Components Merged', desc: 'Buttons, inputs, badges, and form controls landed in main.' },
				{ date: 'March 8, 2026', title: 'API Integration', desc: 'Connected the Go backend to the SvelteKit frontend via typed load functions.' },
				{ date: 'March 9, 2026', title: 'First Deploy', desc: 'Shipped to production on GCP Cloud Run with automated CI/CD pipeline.' },
			] as event, i}
				<div style="display: flex; gap: 16px; position: relative;">
					<!-- Line + Dot -->
					<div style="display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0;">
						<div style="width: 10px; height: 10px; border-radius: 50%; background: #fff; border: 2px solid rgba(255,255,255,0.2); z-index: 1; flex-shrink: 0; margin-top: 2px;"></div>
						{#if i < 4}
							<div style="width: 1px; flex: 1; min-height: 20px; background: rgba(255,255,255,0.08); margin-top: 2px;"></div>
						{/if}
					</div>
					<!-- Content -->
					<div style="flex: 1; padding-bottom: 28px;">
						<div style="font-size: 11px; color: #555; margin-bottom: 4px; font-variant-numeric: tabular-nums;">{event.date}</div>
						<div style="font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 4px;">{event.title}</div>
						<div style="font-size: 13px; color: #777; line-height: 1.5;">{event.desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Timeline with icons -->
	<div class="ds-card">
		<h3 class="ds-card__title">Timeline with Icons</h3>
		<p class="ds-card__sub">Icon-decorated dots keyed to event type</p>
		<div style="max-width: 520px;">
			{#each [
				{
					date: 'Mar 5, 2026 · 09:14',
					title: 'Repository created',
					desc: 'Initialized with MIT license and .gitignore.',
					type: 'created',
					icon: `<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>`,
				},
				{
					date: 'Mar 6, 2026 · 14:02',
					title: 'Dependencies updated',
					desc: 'Bumped SvelteKit to 2.21 and Tailwind to 4.1.',
					type: 'updated',
					icon: `<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
				},
				{
					date: 'Mar 7, 2026 · 11:30',
					title: 'Branch merged',
					desc: 'feature/tag-input squash-merged into main.',
					type: 'merged',
					icon: `<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`,
				},
				{
					date: 'Mar 8, 2026 · 17:55',
					title: 'Deployed to staging',
					desc: 'Cloud Run revision deployed, smoke tests passed.',
					type: 'deployed',
					icon: `<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M12 5l7 7-7 7"/></svg>`,
				},
				{
					date: 'Mar 9, 2026 · 08:00',
					title: 'Released v1.0.0',
					desc: 'First stable release tagged and published.',
					type: 'released',
					icon: `<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>`,
				},
			] as event, i}
				<div style="display: flex; gap: 16px; position: relative;">
					<div style="display: flex; flex-direction: column; align-items: center; width: 24px; flex-shrink: 0;">
						<div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1; color: #aaa;">
							{@html event.icon}
						</div>
						{#if i < 4}
							<div style="width: 1px; flex: 1; min-height: 16px; background: rgba(255,255,255,0.08); margin-top: 2px;"></div>
						{/if}
					</div>
					<div style="flex: 1; padding-bottom: 24px;">
						<div style="font-size: 11px; color: #555; margin-bottom: 3px;">{event.date}</div>
						<div style="font-size: 13px; font-weight: 500; color: #ddd; margin-bottom: 3px;">{event.title}</div>
						<div style="font-size: 12px; color: #666; line-height: 1.5;">{event.desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Timeline with status colors -->
	<div class="ds-card">
		<h3 class="ds-card__title">Status-Coded Timeline</h3>
		<p class="ds-card__sub">Green = complete, blue = current, gray = upcoming</p>
		<div style="max-width: 520px;">
			{#each [
				{ date: 'Mar 5', title: 'Discovery & Planning', desc: 'Requirements gathered, ADRs written, scope finalized.', status: 'complete' },
				{ date: 'Mar 7', title: 'Design Phase', desc: 'Wireframes approved, design tokens established.', status: 'complete' },
				{ date: 'Mar 9', title: 'Implementation', desc: 'Core components and routes in progress.', status: 'current' },
				{ date: 'Mar 12', title: 'QA & Review', desc: 'Cross-browser testing and peer review.', status: 'upcoming' },
				{ date: 'Mar 15', title: 'Production Release', desc: 'Staged rollout with monitoring.', status: 'upcoming' },
			] as event, i}
				{@const dotColor = event.status === 'complete' ? '#22c55e' : event.status === 'current' ? '#3b82f6' : 'rgba(255,255,255,0.12)'}
				{@const dotBorder = event.status === 'complete' ? 'rgba(34,197,94,0.3)' : event.status === 'current' ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}
				{@const titleColor = event.status === 'complete' ? '#aaa' : event.status === 'current' ? '#fff' : '#555'}
				{@const lineColor = event.status === 'complete' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}
				<div style="display: flex; gap: 16px; position: relative;">
					<div style="display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0;">
						<div style="width: 12px; height: 12px; border-radius: 50%; background: {dotColor}; border: 2px solid {dotBorder}; z-index: 1; flex-shrink: 0; margin-top: 2px; {event.status === 'current' ? 'box-shadow: 0 0 0 3px rgba(59,130,246,0.12);' : ''}"></div>
						{#if i < 4}
							<div style="width: 1px; flex: 1; min-height: 16px; background: {lineColor}; margin-top: 3px;"></div>
						{/if}
					</div>
					<div style="flex: 1; padding-bottom: 24px;">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
							<span style="font-size: 11px; color: #444;">{event.date}</span>
							{#if event.status === 'complete'}
								<span style="font-size: 10px; font-weight: 600; color: #22c55e; text-transform: uppercase; letter-spacing: 0.05em;">Done</span>
							{:else if event.status === 'current'}
								<span style="font-size: 10px; font-weight: 600; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.05em;">In Progress</span>
							{/if}
						</div>
						<div style="font-size: 13px; font-weight: 500; color: {titleColor}; margin-bottom: 3px;">{event.title}</div>
						<div style="font-size: 12px; color: {event.status === 'upcoming' ? '#444' : '#666'}; line-height: 1.5;">{event.desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Compact timeline -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact Timeline</h3>
		<p class="ds-card__sub">Reduced spacing, smaller dots — for dense audit logs or changelogs</p>
		<div style="max-width: 480px;">
			{#each [
				{ time: '09:01', msg: 'Build triggered by push to main' },
				{ time: '09:01', msg: 'Installing dependencies (pnpm install)' },
				{ time: '09:03', msg: 'Lint passed — 0 errors, 0 warnings' },
				{ time: '09:04', msg: 'Type check passed (svelte-check)' },
				{ time: '09:06', msg: 'Test suite passed — 798 tests in 42s' },
				{ time: '09:07', msg: 'Build artifact uploaded to registry' },
				{ time: '09:08', msg: 'Cloud Run revision deployed successfully' },
			] as entry, i}
				<div style="display: flex; gap: 12px; position: relative;">
					<div style="display: flex; flex-direction: column; align-items: center; width: 16px; flex-shrink: 0;">
						<div style="width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; margin-top: 5px; z-index: 1;"></div>
						{#if i < 6}
							<div style="width: 1px; flex: 1; min-height: 8px; background: rgba(255,255,255,0.06); margin-top: 2px;"></div>
						{/if}
					</div>
					<div style="flex: 1; padding-bottom: 10px; display: flex; gap: 12px; align-items: baseline;">
						<span style="font-size: 11px; color: #444; flex-shrink: 0; font-variant-numeric: tabular-nums; min-width: 36px;">{entry.time}</span>
						<span style="font-size: 12px; color: #888; line-height: 1.4;">{entry.msg}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Horizontal timeline -->
	<div class="ds-card">
		<h3 class="ds-card__title">Horizontal Timeline</h3>
		<p class="ds-card__sub">Process flow — phases laid out left to right</p>
		<div style="overflow-x: auto; padding-bottom: 8px;">
			<div style="display: flex; align-items: flex-start; min-width: 560px; padding: 8px 0;">
				{#each [
					{ label: 'Discovery', date: 'Mar 1', status: 'complete' },
					{ label: 'Design', date: 'Mar 5', status: 'complete' },
					{ label: 'Build', date: 'Mar 9', status: 'current' },
					{ label: 'Review', date: 'Mar 12', status: 'upcoming' },
					{ label: 'Ship', date: 'Mar 15', status: 'upcoming' },
				] as phase, i}
					{@const dotBg = phase.status === 'complete' ? '#fff' : phase.status === 'current' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)'}
					{@const dotBorder = phase.status === 'complete' ? '#fff' : phase.status === 'current' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.1)'}
					{@const labelColor = phase.status === 'upcoming' ? '#444' : phase.status === 'current' ? '#fff' : '#888'}
					<!-- Phase node -->
					<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
						<div style="width: 32px; height: 32px; border-radius: 50%; background: {dotBg}; border: 2px solid {dotBorder}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
							{#if phase.status === 'complete'}
								<svg width="12" height="12" fill="none" stroke="#000" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{:else}
								<div style="width: 6px; height: 6px; border-radius: 50%; background: {phase.status === 'current' ? '#fff' : 'rgba(255,255,255,0.15)'};"></div>
							{/if}
						</div>
						<div style="text-align: center;">
							<div style="font-size: 12px; font-weight: 500; color: {labelColor}; white-space: nowrap;">{phase.label}</div>
							<div style="font-size: 10px; color: #444; margin-top: 2px;">{phase.date}</div>
						</div>
					</div>
					<!-- Connector (not after last) -->
					{#if i < 4}
						<div style="flex: 1; height: 2px; background: {phase.status === 'complete' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}; margin-top: 15px; min-width: 40px;"></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- Activity feed -->
	<div class="ds-card">
		<h3 class="ds-card__title">Activity Feed</h3>
		<p class="ds-card__sub">GitHub-style event stream with avatars, actions, and timestamps</p>
		<div style="max-width: 520px; display: flex; flex-direction: column; gap: 0;">
			{#each [
				{ user: 'MA', name: 'Marcus A.', action: 'pushed 3 commits to', target: 'main', time: '2m ago', color: '#6366f1' },
				{ user: 'JL', name: 'Jess L.', action: 'opened pull request', target: '#47 — Add Timeline section', time: '14m ago', color: '#0891b2' },
				{ user: 'MA', name: 'Marcus A.', action: 'closed issue', target: '#44 — Stepper not rendering in Safari', time: '1h ago', color: '#6366f1' },
				{ user: 'SR', name: 'Sam R.', action: 'commented on', target: '#47', time: '2h ago', color: '#16a34a' },
				{ user: 'JL', name: 'Jess L.', action: 'approved', target: '#45 — TagInput interactive demo', time: '3h ago', color: '#0891b2' },
				{ user: 'MA', name: 'Marcus A.', action: 'released', target: 'v1.3.0', time: '5h ago', color: '#6366f1' },
			] as event, i}
				<div style="display: flex; gap: 12px; position: relative;">
					<!-- Avatar column -->
					<div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 32px;">
						<div style="width: 32px; height: 32px; border-radius: 50%; background: {event.color}22; border: 1.5px solid {event.color}44; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1;">
							<span style="font-size: 11px; font-weight: 700; color: {event.color};">{event.user}</span>
						</div>
						{#if i < 5}
							<div style="width: 1px; flex: 1; min-height: 8px; background: rgba(255,255,255,0.05); margin-top: 3px;"></div>
						{/if}
					</div>
					<!-- Event row -->
					<div style="flex: 1; padding-bottom: 16px; padding-top: 5px;">
						<span style="font-size: 13px; font-weight: 500; color: #ccc;">{event.name}</span>
						<span style="font-size: 13px; color: #555;"> {event.action} </span>
						<span style="font-size: 13px; font-weight: 500; color: #aaa;">{event.target}</span>
						<span style="font-size: 11px; color: #3d3d3d; margin-left: 8px; white-space: nowrap;">{event.time}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
