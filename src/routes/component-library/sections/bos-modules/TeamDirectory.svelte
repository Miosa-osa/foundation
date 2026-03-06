<script lang="ts">
	// ── 1. Team Directory Grid ────────────────────────────────────
	type MemberStatus = 'online' | 'away' | 'offline' | 'busy' | 'meeting';

	type Member = {
		id: string;
		name: string;
		role: string;
		department: string;
		deptColor: string;
		initials: string;
		avatarColor: string;
		status: MemberStatus;
		email: string;
	};

	const members: Member[] = [
		{ id: 'm1', name: 'Maya Chen',    role: 'Lead Designer',      department: 'Design',          deptColor: '#8b5cf6', initials: 'MC', avatarColor: '#8b5cf6', status: 'online',   email: 'maya@miosa.ai' },
		{ id: 'm2', name: 'Alex Kim',     role: 'Backend Engineer',   department: 'Engineering',     deptColor: '#3b82f6', initials: 'AK', avatarColor: '#ef4444', status: 'meeting',  email: 'alex@miosa.ai' },
		{ id: 'm3', name: 'Tom Rivera',   role: 'DevOps Engineer',    department: 'Infrastructure',  deptColor: '#0ea5e9', initials: 'TR', avatarColor: '#0ea5e9', status: 'away',     email: 'tom@miosa.ai' },
		{ id: 'm4', name: 'Sam Park',     role: 'Product Manager',    department: 'Product',         deptColor: '#22c55e', initials: 'SP', avatarColor: '#22c55e', status: 'online',   email: 'sam@miosa.ai' },
		{ id: 'm5', name: 'Nia Johnson',  role: 'Frontend Engineer',  department: 'Engineering',     deptColor: '#3b82f6', initials: 'NJ', avatarColor: '#f59e0b', status: 'busy',     email: 'nia@miosa.ai' },
		{ id: 'm6', name: 'Riku Tanaka',  role: 'Data Scientist',     department: 'Analytics',       deptColor: '#ec4899', initials: 'RT', avatarColor: '#ec4899', status: 'offline',  email: 'riku@miosa.ai' },
	];

	// ── 2. Org Chart ──────────────────────────────────────────────
	type OrgNode = {
		name: string;
		role: string;
		initials: string;
		avatarColor: string;
		children?: OrgNode[];
	};

	const orgTree: OrgNode = {
		name: 'Sarah Wolfe',
		role: 'CEO',
		initials: 'SW',
		avatarColor: '#6366f1',
		children: [
			{
				name: 'Marcus Lee',
				role: 'VP Engineering',
				initials: 'ML',
				avatarColor: '#3b82f6',
				children: [
					{ name: 'Alex Kim',    role: 'Backend',  initials: 'AK', avatarColor: '#ef4444' },
					{ name: 'Nia Johnson', role: 'Frontend', initials: 'NJ', avatarColor: '#f59e0b' },
					{ name: 'Tom Rivera',  role: 'DevOps',   initials: 'TR', avatarColor: '#0ea5e9' },
				],
			},
			{
				name: 'Priya Nair',
				role: 'VP Design',
				initials: 'PN',
				avatarColor: '#8b5cf6',
				children: [
					{ name: 'Maya Chen', role: 'UI/UX',  initials: 'MC', avatarColor: '#a78bfa' },
					{ name: 'Kai Sato',  role: 'Brand',  initials: 'KS', avatarColor: '#ec4899' },
				],
			},
			{
				name: 'Sam Park',
				role: 'VP Product',
				initials: 'SP',
				avatarColor: '#22c55e',
				children: [
					{ name: 'Riku Tanaka', role: 'Analytics', initials: 'RT', avatarColor: '#14b8a6' },
				],
			},
		],
	};

	// ── 3. Member Profile Slide-Over ─────────────────────────────
	let slideOverOpen = $state(false);
	let slideOverMember = $state<Member>(members[0]);

	const skills = ['Figma', 'Svelte', 'Design Systems', 'Prototyping', 'Accessibility', 'Motion Design'];

	const recentActivity = [
		{ text: 'Completed Kanban board mockups',   time: '2 hours ago' },
		{ text: 'Reviewed PR #142 — Auth redesign', time: 'Yesterday' },
		{ text: 'Updated design token system',      time: '2 days ago' },
		{ text: 'Joined sprint planning meeting',   time: 'Mar 5' },
	];

	function openSlideOver(member: Member) {
		slideOverMember = member;
		slideOverOpen = true;
	}

	// ── 4. Capacity Bars ─────────────────────────────────────────
	type Capacity = { name: string; role: string; tasks: number; pct: number; initials: string; avatarColor: string };

	const capacities: Capacity[] = [
		{ name: 'Maya Chen',   role: 'Lead Designer',     tasks: 8,  pct: 85,  initials: 'MC', avatarColor: '#8b5cf6' },
		{ name: 'Alex Kim',    role: 'Backend Engineer',  tasks: 5,  pct: 55,  initials: 'AK', avatarColor: '#ef4444' },
		{ name: 'Tom Rivera',  role: 'DevOps Engineer',   tasks: 11, pct: 100, initials: 'TR', avatarColor: '#0ea5e9' },
		{ name: 'Sam Park',    role: 'Product Manager',   tasks: 3,  pct: 30,  initials: 'SP', avatarColor: '#22c55e' },
		{ name: 'Nia Johnson', role: 'Frontend Engineer', tasks: 7,  pct: 70,  initials: 'NJ', avatarColor: '#f59e0b' },
	];

	function capacityColor(pct: number): string {
		if (pct >= 90) return '#ef4444';
		if (pct >= 65) return '#f59e0b';
		return '#22c55e';
	}

	// ── 5. Status Badges — no state needed ───────────────────────
	const statusDefs: { key: MemberStatus; label: string; color: string; bg: string }[] = [
		{ key: 'online',  label: 'Online',     color: '#16a34a', bg: 'rgba(22,163,74,0.12)' },
		{ key: 'away',    label: 'Away',        color: '#d97706', bg: 'rgba(217,119,6,0.12)' },
		{ key: 'offline', label: 'Offline',     color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
		{ key: 'busy',    label: 'Busy',        color: '#dc2626', bg: 'rgba(220,38,38,0.12)' },
		{ key: 'meeting', label: 'In Meeting',  color: '#2563eb', bg: 'rgba(37,99,235,0.12)' },
	];

	const statusColorMap: Record<MemberStatus, string> = {
		online:  '#22c55e',
		away:    '#f59e0b',
		offline: '#9ca3af',
		busy:    '#ef4444',
		meeting: '#3b82f6',
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">Team Directory</h2>
	<p class="ds-desc">Member directory grid, org chart, profile slide-over, capacity bars, and status badge system — team management pattern library.</p>

	<!-- ── 1. Team Directory Grid ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Team Directory Grid</h3>
		<p class="ds-card__sub">Member cards with avatar, status indicator, department badge, and quick action buttons.</p>
		<div class="td-member-grid" role="list" aria-label="Team members">
			{#each members as member (member.id)}
				<article class="td-member-card" role="listitem" aria-label="{member.name}, {member.role}">
					<!-- Avatar with status dot -->
					<div class="td-member-card__avatar-wrap">
						<div
							class="td-avatar td-avatar--lg"
							style="background:{member.avatarColor};"
							aria-hidden="true"
						>{member.initials}</div>
						<span
							class="td-status-dot td-status-dot--{member.status}"
							aria-label="Status: {member.status}"
							title="{member.status}"
						></span>
					</div>

					<!-- Info -->
					<div class="td-member-card__info">
						<span class="td-member-card__name">{member.name}</span>
						<span class="td-member-card__role">{member.role}</span>
						<span
							class="td-dept-badge"
							style="background:color-mix(in srgb, {member.deptColor} 12%, transparent);color:{member.deptColor};"
							aria-label="Department: {member.department}"
						>{member.department}</span>
					</div>

					<!-- Actions -->
					<div class="td-member-card__actions">
						<button
							class="btn-compact btn-compact-ghost btn-compact-icon"
							aria-label="Email {member.name}"
							onclick={() => openSlideOver(member)}
						>
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
						</button>
						<button
							class="btn-compact btn-compact-ghost btn-compact-icon"
							aria-label="Message {member.name}"
							onclick={() => openSlideOver(member)}
						>
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						</button>
						<button
							class="btn-rounded btn-rounded-primary btn-rounded-sm"
							aria-label="View {member.name} profile"
							onclick={() => openSlideOver(member)}
						>View</button>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 2. Org Chart ───────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Org Chart</h3>
		<p class="ds-card__sub">Hierarchical tree with connecting lines. CEO at top, VP layer, then individual contributors.</p>
		<div class="td-org" role="tree" aria-label="Organization chart">
			<!-- Root: CEO -->
			<div class="td-org__level td-org__level--root">
				<div class="td-org-node td-org-node--root" role="treeitem" aria-selected="false" aria-label="{orgTree.name}, {orgTree.role}">
					<div class="td-avatar td-avatar--md" style="background:{orgTree.avatarColor};" aria-hidden="true">{orgTree.initials}</div>
					<div class="td-org-node__info">
						<span class="td-org-node__name">{orgTree.name}</span>
						<span class="td-org-node__role">{orgTree.role}</span>
					</div>
				</div>
			</div>

			<!-- Root → VP connector -->
			<div class="td-org__v-line" aria-hidden="true"></div>
			<div class="td-org__h-line" aria-hidden="true"></div>

			<!-- VP layer -->
			<div class="td-org__level td-org__level--vp" role="group" aria-label="VP layer">
				{#each (orgTree.children ?? []) as vp (vp.name)}
					<div class="td-org__branch">
						<div class="td-org-node" role="treeitem" aria-selected="false" aria-label="{vp.name}, {vp.role}" aria-expanded="true">
							<div class="td-avatar td-avatar--sm" style="background:{vp.avatarColor};" aria-hidden="true">{vp.initials}</div>
							<div class="td-org-node__info">
								<span class="td-org-node__name">{vp.name}</span>
								<span class="td-org-node__role">{vp.role}</span>
							</div>
						</div>

						<!-- VP → IC connector -->
						{#if vp.children && vp.children.length > 0}
							<div class="td-org__v-line" aria-hidden="true"></div>
							<div class="td-org__branch-h-line" aria-hidden="true"></div>

							<!-- ICs -->
							<div class="td-org__ics" role="group" aria-label="Reports to {vp.name}">
								{#each vp.children as ic (ic.name)}
									<div class="td-org-node td-org-node--ic" role="treeitem" aria-selected="false" aria-label="{ic.name}, {ic.role}">
										<div class="td-avatar td-avatar--xs" style="background:{ic.avatarColor};" aria-hidden="true">{ic.initials}</div>
										<div class="td-org-node__info">
											<span class="td-org-node__name td-org-node__name--sm">{ic.name}</span>
											<span class="td-org-node__role">{ic.role}</span>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 3. Member Profile Slide-Over ─────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Member Profile Slide-Over</h3>
		<p class="ds-card__sub">Side panel with large avatar, contact info, skills tags, capacity bar, and recent activity list. Click any member card above or use the button below.</p>

		<button
			class="btn-pill btn-pill-primary btn-pill-sm"
			onclick={() => { slideOverMember = members[0]; slideOverOpen = true; }}
			aria-label="Open Maya Chen profile slide-over"
		>Open Profile Slide-Over</button>

		{#if slideOverOpen}
			<div
				class="td-slideover-backdrop"
				role="presentation"
				onclick={() => slideOverOpen = false}
				aria-hidden="true"
			></div>
			<div class="td-slideover" role="dialog" aria-label="{slideOverMember.name} profile" aria-modal="true">
				<!-- Header -->
				<div class="td-slideover__header">
					<span class="td-slideover__title">Member Profile</span>
					<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={() => slideOverOpen = false} aria-label="Close profile panel">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					</button>
				</div>

				<!-- Identity -->
				<div class="td-slideover__identity">
					<div class="td-slideover__avatar-wrap">
						<div
							class="td-avatar td-avatar--xl"
							style="background:{slideOverMember.avatarColor};"
							aria-hidden="true"
						>{slideOverMember.initials}</div>
						<span
							class="td-status-dot td-status-dot--{slideOverMember.status} td-status-dot--lg"
							aria-label="Status: {slideOverMember.status}"
						></span>
					</div>
					<div class="td-slideover__identity-info">
						<span class="td-slideover__name">{slideOverMember.name}</span>
						<span class="td-slideover__role">{slideOverMember.role}</span>
						<span
							class="td-dept-badge"
							style="background:color-mix(in srgb, {slideOverMember.deptColor} 12%, transparent);color:{slideOverMember.deptColor};"
						>{slideOverMember.department}</span>
					</div>
				</div>

				<!-- Contact info -->
				<div class="td-slideover__section">
					<span class="td-slideover__section-label">Contact</span>
					<div class="td-slideover__contact-list">
						<div class="td-slideover__contact-item">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
							<span>{slideOverMember.email}</span>
						</div>
						<div class="td-slideover__contact-item">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
							<span>San Francisco, CA</span>
						</div>
					</div>
				</div>

				<!-- Skills -->
				<div class="td-slideover__section">
					<span class="td-slideover__section-label">Skills</span>
					<div class="td-slideover__skills">
						{#each skills as skill (skill)}
							<span class="td-skill-tag">{skill}</span>
						{/each}
					</div>
				</div>

				<!-- Capacity -->
				<div class="td-slideover__section">
					<span class="td-slideover__section-label">Capacity</span>
					<div class="td-cap-row">
						<div
							class="td-cap-track"
							role="progressbar"
							aria-valuenow={75}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label="Capacity 75%"
						>
							<div class="td-cap-fill" style="width:75%;background:#f59e0b;"></div>
						</div>
						<span class="td-cap-label">75% · 6 tasks</span>
					</div>
				</div>

				<!-- Recent activity -->
				<div class="td-slideover__section td-slideover__section--grow">
					<span class="td-slideover__section-label">Recent Activity</span>
					<ul class="td-slideover__activity" aria-label="Recent activity" style="list-style:none;margin:0;padding:0;">
						{#each recentActivity as item (item.text)}
							<li class="td-slideover__activity-item">
								<span class="td-slideover__activity-dot" aria-hidden="true"></span>
								<div class="td-slideover__activity-body">
									<span class="td-slideover__activity-text">{item.text}</span>
									<span class="td-slideover__activity-time">{item.time}</span>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>

	<!-- ── 4. Capacity Bars ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Capacity Bars</h3>
		<p class="ds-card__sub">Team member workload — green under 65%, yellow 65–90%, red 90%+.</p>
		<div class="td-capacity-list" role="list" aria-label="Team capacity">
			{#each capacities as cap (cap.name)}
				<div class="td-capacity-item" role="listitem" aria-label="{cap.name}: {cap.pct}% capacity, {cap.tasks} tasks">
					<div class="td-capacity-item__meta">
						<div class="td-avatar td-avatar--xs" style="background:{cap.avatarColor};" aria-hidden="true">{cap.initials}</div>
						<div class="td-capacity-item__info">
							<span class="td-capacity-item__name">{cap.name}</span>
							<span class="td-capacity-item__role">{cap.role}</span>
						</div>
						<span class="td-capacity-item__tasks" aria-label="{cap.tasks} tasks">{cap.tasks} tasks</span>
					</div>
					<div
						class="td-cap-track"
						role="progressbar"
						aria-valuenow={cap.pct}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label="{cap.pct}% capacity"
					>
						<div class="td-cap-fill" style="width:{cap.pct}%;background:{capacityColor(cap.pct)};"></div>
					</div>
					<div class="td-capacity-item__footer">
						<span class="td-capacity-item__pct" style="color:{capacityColor(cap.pct)};">{cap.pct}%</span>
						{#if cap.pct >= 90}
							<span class="td-capacity-item__label td-capacity-item__label--overloaded">Overloaded</span>
						{:else if cap.pct >= 65}
							<span class="td-capacity-item__label td-capacity-item__label--caution">Near capacity</span>
						{:else}
							<span class="td-capacity-item__label td-capacity-item__label--ok">Available</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 5. Status Badges ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Status Badges</h3>
		<p class="ds-card__sub">Online, Away, Offline, Busy, and In Meeting — in badge pill, dot-on-avatar, and inline member row variants.</p>
		<div class="td-status-demo">
			<!-- Dot + Label badges -->
			<div class="td-status-demo__group">
				<span class="td-status-demo__label">Dot + Label Badges</span>
				<div class="td-status-demo__row">
					{#each statusDefs as s (s.key)}
						<span
							class="td-status-badge"
							style="background:{s.bg};color:{s.color};"
							aria-label="Status: {s.label}"
						>
							<span class="td-status-badge__dot" style="background:{s.color};" aria-hidden="true"></span>
							{s.label}
						</span>
					{/each}
				</div>
			</div>

			<!-- Dot on avatar -->
			<div class="td-status-demo__group">
				<span class="td-status-demo__label">Dot on Avatar</span>
				<div class="td-status-demo__row">
					{#each statusDefs as s, i (s.key)}
						<div class="td-status-demo__avatar-wrap" aria-label="{s.label}">
							<div
								class="td-avatar td-avatar--sm"
								style="background:linear-gradient(135deg,#6366f1,#4f46e5);"
								aria-hidden="true"
							>{String.fromCharCode(65 + i)}</div>
							<span
								class="td-status-dot td-status-dot--{s.key}"
								aria-label="Status: {s.label}"
								title="{s.label}"
							></span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Inline member row -->
			<div class="td-status-demo__group">
				<span class="td-status-demo__label">Inline Member Rows</span>
				<div class="td-status-demo__member-list" role="list">
					{#each members.slice(0, 4) as m (m.id)}
						{@const def = statusDefs.find(s => s.key === m.status)}
						<div class="td-status-row" role="listitem" aria-label="{m.name}: {m.status}">
							<div class="td-status-row__left">
								<div class="td-status-row__avatar-wrap">
									<div class="td-avatar td-avatar--sm" style="background:{m.avatarColor};" aria-hidden="true">{m.initials}</div>
									<span class="td-status-dot td-status-dot--{m.status}" aria-label="Status: {m.status}" title="{m.status}"></span>
								</div>
								<div>
									<span class="td-status-row__name">{m.name}</span>
									<span class="td-status-row__role">{m.role}</span>
								</div>
							</div>
							{#if def}
								<span
									class="td-status-badge"
									style="background:{def.bg};color:{def.color};"
									aria-label="Status: {def.label}"
								>
									<span class="td-status-badge__dot" style="background:{statusColorMap[m.status]};" aria-hidden="true"></span>
									{def.label}
								</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Shared utilities ───────────────────────────────────────── */
	.td-avatar {
		border-radius: 9999px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		color: #fff;
		flex-shrink: 0;
		letter-spacing: -0.02em;
	}
	.td-avatar--xl { width: 52px; height: 52px; font-size: 18px; }
	.td-avatar--lg { width: 44px; height: 44px; font-size: 15px; }
	.td-avatar--md { width: 36px; height: 36px; font-size: 13px; }
	.td-avatar--sm { width: 28px; height: 28px; font-size: 10px; }
	.td-avatar--xs { width: 22px; height: 22px; font-size: 8px; }

	/* Department badge */
	.td-dept-badge {
		display: inline-flex;
		align-items: center;
		height: 19px;
		padding: 0 8px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.01em;
		white-space: nowrap;
	}

	/* Status dot */
	.td-status-dot {
		width: 9px;
		height: 9px;
		border-radius: 9999px;
		border: 2px solid var(--dbg);
		display: block;
		flex-shrink: 0;
	}
	.td-status-dot--lg { width: 12px; height: 12px; }

	.td-status-dot--online  { background: #22c55e; }
	.td-status-dot--away    { background: #f59e0b; }
	.td-status-dot--offline { background: #9ca3af; }
	.td-status-dot--busy    { background: #ef4444; }
	.td-status-dot--meeting { background: #3b82f6; }

	/* Status badge pill */
	.td-status-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		height: 22px;
		padding: 0 9px 0 7px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		white-space: nowrap;
	}
	.td-status-badge__dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		flex-shrink: 0;
	}

	/* Capacity track + fill */
	.td-cap-track {
		height: 6px;
		border-radius: 9999px;
		background: var(--dbg2);
		overflow: hidden;
		flex: 1;
	}
	.td-cap-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.3s ease;
	}
	.td-cap-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.td-cap-label {
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		font-weight: 500;
	}

	/* ─── 1. Team Directory Grid ─────────────────────────────────── */
	.td-member-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}

	.td-member-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 18px 14px 14px;
		border-radius: 14px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		text-align: center;
		transition: border-color 0.13s, box-shadow 0.13s;
	}
	.td-member-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 4px 16px rgba(0,0,0,0.07);
	}

	.td-member-card__avatar-wrap {
		position: relative;
		display: inline-block;
	}
	.td-member-card__avatar-wrap .td-status-dot {
		position: absolute;
		bottom: 1px;
		right: 1px;
	}

	.td-member-card__info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.td-member-card__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.td-member-card__role {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}

	.td-member-card__actions {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	/* ─── 2. Org Chart ───────────────────────────────────────────── */
	.td-org {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: auto;
		padding-bottom: 8px;
	}

	.td-org__level {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 12px;
		width: 100%;
	}

	.td-org__level--vp { align-items: flex-start; }

	.td-org__v-line {
		width: 2px;
		height: 18px;
		background: var(--dbd2);
		margin: 0 auto;
	}

	.td-org__h-line {
		width: 65%;
		height: 2px;
		background: var(--dbd2);
		margin: 0 auto;
	}

	.td-org__branch {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		min-width: 150px;
	}

	.td-org__branch-h-line {
		height: 2px;
		background: var(--dbd2);
		align-self: stretch;
		margin: 0 16px;
	}

	.td-org__ics {
		display: flex;
		gap: 6px;
		justify-content: center;
		flex-wrap: wrap;
		padding-top: 18px;
		position: relative;
		width: 100%;
	}
	.td-org__ics::before {
		content: '';
		position: absolute;
		top: 0;
		left: 20%;
		right: 20%;
		height: 2px;
		background: var(--dbd2);
	}

	.td-org-node {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		padding: 9px 12px;
		border-radius: 11px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		white-space: nowrap;
		transition: border-color 0.13s, box-shadow 0.13s;
	}
	.td-org-node:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 10px rgba(0,0,0,0.06);
	}

	.td-org-node--root {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
	}

	.td-org-node--ic {
		padding: 7px 10px;
		border-radius: 9px;
	}

	.td-org-node__info {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.td-org-node__name {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.td-org-node__name--sm { font-size: 11px; }

	.td-org-node__role {
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* ─── 3. Member Profile Slide-Over ──────────────────────────── */

	.td-slideover-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.3);
		z-index: 40;
		cursor: pointer;
	}
	:global(.dark) .td-slideover-backdrop { background: rgba(0,0,0,0.5); }

	.td-slideover {
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		width: 340px;
		max-width: 95vw;
		z-index: 50;
		background: var(--dbg);
		border-left: 1px solid var(--dbd2);
		box-shadow: -8px 0 40px rgba(0,0,0,0.12);
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}
	:global(.dark) .td-slideover { background: #1a1a1a; }

	.td-slideover__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
		position: sticky;
		top: 0;
		background: var(--dbg);
		z-index: 1;
	}
	:global(.dark) .td-slideover__header { background: #1a1a1a; }

	.td-slideover__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.td-slideover__identity {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 20px 16px 16px;
		border-bottom: 1px solid var(--dbd);
	}

	.td-slideover__avatar-wrap {
		position: relative;
		flex-shrink: 0;
	}
	.td-slideover__avatar-wrap .td-status-dot {
		position: absolute;
		bottom: 2px;
		right: 2px;
	}

	.td-slideover__identity-info {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.td-slideover__name {
		font-size: 16px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.td-slideover__role {
		font-size: 12px;
		color: var(--dt3);
		font-weight: 500;
	}

	.td-slideover__section {
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.td-slideover__section--grow { flex: 1; border-bottom: none; }

	.td-slideover__section-label {
		font-size: 10px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--dt3);
		display: block;
		margin-bottom: 10px;
	}

	.td-slideover__contact-list {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.td-slideover__contact-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--dt2);
	}
	.td-slideover__contact-item svg { color: var(--dt3); flex-shrink: 0; }

	.td-slideover__skills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.td-skill-tag {
		display: inline-flex;
		align-items: center;
		height: 22px;
		padding: 0 10px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
	}

	.td-slideover__activity {
		display: flex;
		flex-direction: column;
	}

	.td-slideover__activity-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 8px 0;
		border-bottom: 1px solid var(--dbd);
	}
	.td-slideover__activity-item:last-child { border-bottom: none; }

	.td-slideover__activity-dot {
		width: 7px;
		height: 7px;
		border-radius: 9999px;
		background: var(--dbd2);
		flex-shrink: 0;
		margin-top: 4px;
	}

	.td-slideover__activity-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}

	.td-slideover__activity-text {
		font-size: 12px;
		color: var(--dt);
		font-weight: 500;
		line-height: 1.4;
	}

	.td-slideover__activity-time {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
	}

	/* ─── 4. Capacity Bars ───────────────────────────────────────── */
	.td-capacity-list {
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 560px;
	}

	.td-capacity-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.td-capacity-item__meta {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.td-capacity-item__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
	}

	.td-capacity-item__name {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.td-capacity-item__role {
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
	}

	.td-capacity-item__tasks {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.td-capacity-item__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.td-capacity-item__pct {
		font-size: 11px;
		font-weight: 700;
	}

	.td-capacity-item__label {
		font-size: 10px;
		font-weight: 600;
	}
	.td-capacity-item__label--overloaded { color: #ef4444; }
	.td-capacity-item__label--caution    { color: #f59e0b; }
	.td-capacity-item__label--ok         { color: #22c55e; }

	/* ─── 5. Status Badge System ─────────────────────────────────── */
	.td-status-demo {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.td-status-demo__group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.td-status-demo__label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
	}

	.td-status-demo__row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.td-status-demo__avatar-wrap {
		position: relative;
		display: inline-block;
	}
	.td-status-demo__avatar-wrap .td-status-dot {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.td-status-demo__member-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-width: 480px;
	}

	.td-status-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 8px 12px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: background 0.12s;
	}
	.td-status-row:hover { background: var(--dbg2); }

	.td-status-row__left {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.td-status-row__avatar-wrap {
		position: relative;
	}
	.td-status-row__avatar-wrap .td-status-dot {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.td-status-row__name {
		display: block;
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.td-status-row__role {
		display: block;
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* Dark mode: status dots need correct border color */
	:global(.dark) .td-status-dot { border-color: #1a1a1a; }
	.td-member-card .td-status-dot { border-color: var(--dbg); }
</style>
