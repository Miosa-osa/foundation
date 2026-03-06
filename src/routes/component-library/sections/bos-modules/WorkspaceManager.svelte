<script lang="ts">
	// ── Workspace Switcher ───────────────────────────────────────
	let switcherOpen = $state(false);
	let activeWorkspace = $state(0);

	// ── Role Permissions Matrix ──────────────────────────────────
	let activeRole = $state(0);
	let permissions = $state<Record<string, Record<string, boolean>>>({
		Chat:     { Read: true,  Write: true,  Delete: false, Invite: false, Billing: false },
		Tasks:    { Read: true,  Write: true,  Delete: true,  Invite: false, Billing: false },
		Projects: { Read: true,  Write: true,  Delete: false, Invite: true,  Billing: false },
		Files:    { Read: true,  Write: false, Delete: false, Invite: false, Billing: false },
		Settings: { Read: false, Write: false, Delete: false, Invite: false, Billing: false },
	});

	// ── Workspace Settings ───────────────────────────────────────
	let wsName = $state('Acme Corp');
	let wsDescription = $state('Our main workspace for the engineering team.');
	let wsVisibility = $state<'private' | 'public'>('private');
	let wsDefaultRole = $state('Member');
	let notifInvites = $state(true);
	let notifActivity = $state(true);
	let notifDigest = $state(false);
	let notifSecurity = $state(true);

	// ── Activity Log ─────────────────────────────────────────────
	type ActivityType = 'invite' | 'settings' | 'project' | 'role' | 'remove' | 'billing';

	// ── Billing ──────────────────────────────────────────────────
	let billingTab = $state<'overview' | 'history'>('overview');

	// ── Helpers ──────────────────────────────────────────────────
	function togglePermission(feature: string, action: string) {
		permissions[feature][action] = !permissions[feature][action];
	}

	const roles = ['Owner', 'Admin', 'Member', 'Guest'];
	const permCols = ['Read', 'Write', 'Delete', 'Invite', 'Billing'];

	const roleDefaults: Record<string, Record<string, boolean>> = {
		Owner:  { Read: true,  Write: true,  Delete: true,  Invite: true,  Billing: true  },
		Admin:  { Read: true,  Write: true,  Delete: true,  Invite: true,  Billing: false },
		Member: { Read: true,  Write: true,  Delete: false, Invite: false, Billing: false },
		Guest:  { Read: true,  Write: false, Delete: false, Invite: false, Billing: false },
	};

	const activityLog: { type: ActivityType; actor: string; initials: string; gradient: string; action: string; target: string; time: string; relTime: string }[] = [
		{ type: 'invite',   actor: 'Jane Cooper',  initials: 'JC', gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', action: 'invited',         target: 'sarah@acme.co',        time: '2026-03-06T09:42:00', relTime: '4 minutes ago' },
		{ type: 'settings', actor: 'Jane Cooper',  initials: 'JC', gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', action: 'updated settings', target: 'Workspace visibility',  time: '2026-03-06T09:15:00', relTime: '31 minutes ago' },
		{ type: 'project',  actor: 'Alex Rivera',  initials: 'AR', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)', action: 'created project',  target: 'Q2 Roadmap',           time: '2026-03-06T08:50:00', relTime: '56 minutes ago' },
		{ type: 'role',     actor: 'Jane Cooper',  initials: 'JC', gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', action: 'changed role of',  target: 'Sam Chen → Admin',     time: '2026-03-05T17:30:00', relTime: 'Yesterday, 5:30 PM' },
		{ type: 'project',  actor: 'Sam Chen',     initials: 'SC', gradient: 'linear-gradient(135deg,#10b981,#34d399)', action: 'archived project', target: 'Legacy API Cleanup',    time: '2026-03-05T14:10:00', relTime: 'Yesterday, 2:10 PM' },
		{ type: 'invite',   actor: 'Alex Rivera',  initials: 'AR', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)', action: 'invited',          target: 'kim@acme.co',          time: '2026-03-05T11:05:00', relTime: 'Yesterday, 11:05 AM' },
		{ type: 'billing',  actor: 'Jane Cooper',  initials: 'JC', gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', action: 'upgraded plan to', target: 'Pro',                  time: '2026-03-04T09:00:00', relTime: '2 days ago' },
		{ type: 'remove',   actor: 'Jane Cooper',  initials: 'JC', gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', action: 'removed member',   target: 'former@contractor.io', time: '2026-03-03T16:20:00', relTime: '3 days ago' },
	];

	const activityIcons: Record<ActivityType, string> = {
		invite:   '#6366f1',
		settings: '#6b7280',
		project:  '#10b981',
		role:     '#f59e0b',
		remove:   '#ef4444',
		billing:  '#8b5cf6',
	};

	const billingHistory = [
		{ date: 'Mar 1, 2026',  description: 'Pro Plan — Monthly',   amount: '$49.00',  status: 'Paid' },
		{ date: 'Feb 1, 2026',  description: 'Pro Plan — Monthly',   amount: '$49.00',  status: 'Paid' },
		{ date: 'Jan 1, 2026',  description: 'Pro Plan — Monthly',   amount: '$49.00',  status: 'Paid' },
		{ date: 'Dec 1, 2025',  description: 'Starter Plan — Monthly', amount: '$19.00', status: 'Paid' },
		{ date: 'Nov 1, 2025',  description: 'Starter Plan — Monthly', amount: '$19.00', status: 'Paid' },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Workspace Manager</h2>
	<p class="ds-desc">
		Workspace switching, member management, RBAC permissions, settings, activity logs, and billing for a multi-tenant app.
	</p>

	<!-- ── 1. Workspace Switcher ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Workspace Switcher</h3>
		<p class="ds-card__sub">Dropdown showing workspaces with icons, names, member counts, current indicator, and create action</p>

		<div class="wm-switcher">
			<button class="wm-switcher__trigger" onclick={() => switcherOpen = !switcherOpen}>
				<span class="wm-switcher__avatar" style="background: linear-gradient(135deg, #6366f1, #818cf8);">A</span>
				<span class="wm-switcher__info">
					<span class="wm-switcher__name">Acme Corp</span>
					<span class="wm-switcher__plan">Pro Plan · 24 members</span>
				</span>
				<svg class="wm-switcher__chevron" class:wm-switcher__chevron--open={switcherOpen} width="10" height="6" viewBox="0 0 10 6" fill="none">
					<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>

			{#if switcherOpen}
				<div class="wm-switcher__dropdown">
					<div class="wm-switcher__section-label">Your workspaces</div>
					{#each [
						{ initial: 'A', name: 'Acme Corp',     members: 24, plan: 'Pro',     gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
						{ initial: 'S', name: 'Side Project',  members: 3,  plan: 'Starter', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
						{ initial: 'F', name: 'Freelance Hub', members: 1,  plan: 'Free',    gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
					] as ws, i}
						<button
							class="wm-switcher__item"
							class:wm-switcher__item--active={activeWorkspace === i}
							onclick={() => { activeWorkspace = i; switcherOpen = false; }}
						>
							<span class="wm-switcher__avatar wm-switcher__avatar--sm" style="background: {ws.gradient};">{ws.initial}</span>
							<span class="wm-switcher__item-info">
								<span class="wm-switcher__item-name">{ws.name}</span>
								<span class="wm-switcher__item-meta">{ws.members} member{ws.members > 1 ? 's' : ''} · {ws.plan}</span>
							</span>
							{#if activeWorkspace === i}
								<span class="wm-switcher__active-dot"></span>
								<svg class="wm-switcher__check" width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							{/if}
						</button>
					{/each}
					<div class="wm-switcher__sep"></div>
					<button class="wm-switcher__create">
						<span class="wm-switcher__create-icon">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
								<path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</span>
						Create Workspace
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ── 2. Member Management ───────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Member Management</h3>
		<p class="ds-card__sub">Member table with avatar, name, email, role badge, status indicator, and pending invites section</p>

		<div class="wm-members">
			<div class="wm-members__header">
				<div class="wm-members__header-left">
					<span class="wm-members__count">5 Members</span>
					<div class="wm-members__search">
						<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
							<circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.2"/>
							<path d="M8.5 8.5l3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
						</svg>
						<input class="wm-members__search-input" type="text" placeholder="Search members…" />
					</div>
				</div>
				<button class="btn-pill btn-pill-primary btn-pill-sm">
					<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
						<path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
					Invite Members
				</button>
			</div>

			<div class="wm-members__table-head">
				<div class="wm-members__th wm-members__th--member">Member</div>
				<div class="wm-members__th">Role</div>
				<div class="wm-members__th">Status</div>
				<div class="wm-members__th">Joined</div>
				<div class="wm-members__th wm-members__th--actions">Actions</div>
			</div>

			<div class="wm-members__list">
				{#each [
					{ name: 'Jane Cooper',  email: 'jane@acme.co',  role: 'Owner',  initials: 'JC', gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', status: 'active',  joined: 'Jan 4, 2025'  },
					{ name: 'Alex Rivera',  email: 'alex@acme.co',  role: 'Admin',  initials: 'AR', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)', status: 'active',  joined: 'Jan 12, 2025' },
					{ name: 'Sam Chen',     email: 'sam@acme.co',   role: 'Member', initials: 'SC', gradient: 'linear-gradient(135deg,#10b981,#34d399)', status: 'active',  joined: 'Feb 2, 2025'  },
					{ name: 'Kim Patel',    email: 'kim@acme.co',   role: 'Member', initials: 'KP', gradient: 'linear-gradient(135deg,#ec4899,#f472b6)', status: 'away',    joined: 'Feb 18, 2025' },
					{ name: 'Pat Gomez',    email: 'pat@acme.co',   role: 'Guest',  initials: 'PG', gradient: 'linear-gradient(135deg,#8b5cf6,#a78bfa)', status: 'offline', joined: 'Mar 1, 2025'  },
				] as member}
					<div class="wm-member-row">
						<div class="wm-member-row__member">
							<span class="wm-member-row__avatar" style="background: {member.gradient};">
								{member.initials}
								<span class="wm-member-row__status-dot wm-member-row__status-dot--{member.status}"></span>
							</span>
							<div class="wm-member-row__info">
								<span class="wm-member-row__name">{member.name}</span>
								<span class="wm-member-row__email">{member.email}</span>
							</div>
						</div>
						<div class="wm-member-row__cell">
							<span class="wm-member-row__role wm-member-row__role--{member.role.toLowerCase()}">{member.role}</span>
						</div>
						<div class="wm-member-row__cell">
							<span class="wm-member-row__status-label wm-member-row__status-label--{member.status}">{member.status}</span>
						</div>
						<div class="wm-member-row__cell wm-member-row__cell--muted">{member.joined}</div>
						<div class="wm-member-row__actions">
							{#if member.role !== 'Owner'}
								<select class="wm-member-row__role-select" aria-label="Change role for {member.name}">
									{#each ['Admin', 'Member', 'Guest'] as r}
										<option selected={r === member.role}>{r}</option>
									{/each}
								</select>
								<button class="btn-compact btn-compact-danger btn-compact-icon" aria-label="Remove {member.name}">
									<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
										<path d="M3 3l7 7M10 3l-7 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
									</svg>
								</button>
							{:else}
								<span class="wm-member-row__owner-lock">
									<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
										<rect x="2" y="5.5" width="9" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
										<path d="M4 5.5V4a2.5 2.5 0 015 0v1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
									</svg>
								</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<div class="wm-pending">
				<div class="wm-pending__title">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
						<circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
						<path d="M6 3.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
					</svg>
					Pending Invites
					<span class="wm-pending__badge">2</span>
				</div>
				{#each [
					{ email: 'taylor@acme.co', role: 'Member', sent: '2 hours ago' },
					{ email: 'morgan@acme.co', role: 'Guest',  sent: '1 day ago'   },
				] as invite}
					<div class="wm-pending__item">
						<div class="wm-pending__icon">
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
								<rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/>
								<path d="M1 5l6.5 4L14 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
							</svg>
						</div>
						<div class="wm-pending__info">
							<span class="wm-pending__email">{invite.email}</span>
							<span class="wm-pending__meta">{invite.role} &middot; Sent {invite.sent}</span>
						</div>
						<div class="wm-pending__actions">
							<button class="btn-compact btn-compact-ghost">Resend</button>
							<button class="btn-compact btn-compact-danger">Revoke</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 3. Role & Permissions (RBAC) ───────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Role &amp; Permissions (RBAC)</h3>
		<p class="ds-card__sub">Permissions matrix grid: roles as rows, permissions as columns, with toggleable cells</p>

		<div class="wm-rbac">
			<div class="wm-rbac__header-row">
				<div class="wm-rbac__corner"></div>
				{#each permCols as col}
					<div class="wm-rbac__col-head">{col}</div>
				{/each}
			</div>

			{#each roles as role}
				<div class="wm-rbac__role-row">
					<div class="wm-rbac__role-label">
						<span class="wm-rbac__role-name">{role}</span>
						<span class="wm-rbac__role-desc">
							{#if role === 'Owner'}Full control, billing access
							{:else if role === 'Admin'}Manage members and settings
							{:else if role === 'Member'}Create and edit content
							{:else}Read-only access{/if}
						</span>
					</div>
					{#each permCols as col}
						{@const checked = roleDefaults[role][col]}
						<div class="wm-rbac__perm-cell">
							{#if checked}
								<span class="wm-rbac__check">
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
										<path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
							{:else}
								<span class="wm-rbac__cross">
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
										<path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									</svg>
								</span>
							{/if}
						</div>
					{/each}
				</div>
			{/each}

			<div class="wm-rbac__custom-section">
				<div class="wm-rbac__custom-header">Custom Role Editor</div>
				<div class="wm-rbac__matrix">
					<div class="wm-rbac__matrix-head">
						<div class="wm-rbac__feature-label">Feature</div>
						{#each permCols as col}
							<div class="wm-rbac__action-label">{col}</div>
						{/each}
					</div>
					{#each Object.keys(permissions) as feature}
						<div class="wm-rbac__matrix-row">
							<div class="wm-rbac__feature">{feature}</div>
							{#each permCols as action}
								<div class="wm-rbac__cell">
									<button
										class="wm-rbac__checkbox"
										class:wm-rbac__checkbox--checked={permissions[feature][action]}
										onclick={() => togglePermission(feature, action)}
										aria-label="{feature} {action}"
									>
										{#if permissions[feature][action]}
											<svg width="11" height="11" viewBox="0 0 11 11" fill="none">
												<path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										{/if}
									</button>
								</div>
							{/each}
						</div>
					{/each}
				</div>
				<div class="wm-rbac__custom-footer">
					<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Save Custom Role</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 4. Workspace Settings ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Workspace Settings</h3>
		<p class="ds-card__sub">Settings form with name, description, logo upload, notification preferences, and danger zone</p>

		<div class="wm-settings">
			<div class="wm-settings__section">
				<div class="wm-settings__section-title">General</div>

				<div class="wm-settings__group">
					<label for="ws-name" class="wm-settings__label">Workspace Logo &amp; Name</label>
					<div class="wm-settings__avatar-row">
						<div class="wm-settings__logo-upload">
							<span class="wm-settings__avatar-preview" style="background: linear-gradient(135deg, #6366f1, #818cf8);">A</span>
							<div class="wm-settings__logo-actions">
								<button class="btn-rounded btn-rounded-ghost btn-rounded-xs">Upload logo</button>
								<button class="btn-rounded btn-rounded-ghost btn-rounded-xs">Remove</button>
							</div>
						</div>
						<input id="ws-name" class="wm-settings__input" type="text" bind:value={wsName} />
					</div>
					<p class="wm-settings__hint">JPG, PNG, or SVG. Max 2MB. Recommended 256×256px.</p>
				</div>

				<div class="wm-settings__group">
					<label for="ws-description" class="wm-settings__label">Description</label>
					<textarea id="ws-description" class="wm-settings__textarea" bind:value={wsDescription} rows="3"></textarea>
				</div>

				<div class="wm-settings__group">
					<span class="wm-settings__label">Visibility</span>
					<div class="wm-settings__toggle-row">
						<button
							class="wm-settings__toggle-opt"
							class:wm-settings__toggle-opt--active={wsVisibility === 'private'}
							onclick={() => wsVisibility = 'private'}
						>
							<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
								<rect x="2" y="5.5" width="9" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
								<path d="M4 5.5V4a2.5 2.5 0 015 0v1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
							</svg>
							Private
						</button>
						<button
							class="wm-settings__toggle-opt"
							class:wm-settings__toggle-opt--active={wsVisibility === 'public'}
							onclick={() => wsVisibility = 'public'}
						>
							<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
								<circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.2"/>
								<path d="M1.5 6.5h10M6.5 1.5c-1.5 1.5-2 3-2 5s.5 3.5 2 5c1.5-1.5 2-3 2-5s-.5-3.5-2-5z" stroke="currentColor" stroke-width="1.2"/>
							</svg>
							Public
						</button>
					</div>
				</div>

				<div class="wm-settings__group">
					<label for="ws-default-role" class="wm-settings__label">Default Role for New Members</label>
					<select id="ws-default-role" class="wm-settings__select" bind:value={wsDefaultRole}>
						{#each ['Admin', 'Member', 'Guest'] as role}
							<option>{role}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="wm-settings__section">
				<div class="wm-settings__section-title">Notification Preferences</div>
				{#each [
					{ key: 'notifInvites',   label: 'New member invites',        desc: 'Get notified when someone is invited',     bound: notifInvites,  setter: (v: boolean) => notifInvites = v  },
					{ key: 'notifActivity',  label: 'Workspace activity',        desc: 'Changes to projects and settings',          bound: notifActivity, setter: (v: boolean) => notifActivity = v },
					{ key: 'notifDigest',    label: 'Weekly digest',             desc: 'Summary of workspace activity each Monday', bound: notifDigest,   setter: (v: boolean) => notifDigest = v   },
					{ key: 'notifSecurity',  label: 'Security alerts',           desc: 'Login anomalies and permission changes',    bound: notifSecurity, setter: (v: boolean) => notifSecurity = v },
				] as pref}
					<div class="wm-settings__notif-row">
						<div class="wm-settings__notif-info">
							<span class="wm-settings__notif-label">{pref.label}</span>
							<span class="wm-settings__notif-desc">{pref.desc}</span>
						</div>
						<button
							class="wm-settings__toggle"
							class:wm-settings__toggle--on={pref.bound}
							onclick={() => pref.setter(!pref.bound)}
							aria-label="Toggle {pref.label}"
						>
							<span class="wm-settings__toggle-thumb"></span>
						</button>
					</div>
				{/each}
			</div>

			<div class="wm-settings__save-row">
				<button class="btn-rounded btn-rounded-primary">Save Changes</button>
			</div>

			<div class="wm-settings__danger">
				<div class="wm-settings__danger-header">
					<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
						<path d="M7.5 1.5l6 11H1.5l6-11z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
						<path d="M7.5 6v3M7.5 11v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
					</svg>
					Danger Zone
				</div>
				<div class="wm-settings__danger-items">
					<div class="wm-settings__danger-item">
						<div>
							<div class="wm-settings__danger-item-title">Transfer ownership</div>
							<div class="wm-settings__danger-item-desc">Transfer this workspace to another member.</div>
						</div>
						<button class="btn-rounded btn-rounded-outline btn-rounded-sm">Transfer</button>
					</div>
					<div class="wm-settings__danger-item">
						<div>
							<div class="wm-settings__danger-item-title">Delete workspace</div>
							<div class="wm-settings__danger-item-desc">Permanently delete all data. This cannot be undone.</div>
						</div>
						<button class="btn-rounded btn-rounded-danger btn-rounded-sm">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 5. Activity Log ────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Activity Log</h3>
		<p class="ds-card__sub">Timeline of workspace events with timestamps, user avatars, and action type icons</p>

		<div class="wm-activity">
			<div class="wm-activity__toolbar">
				<div class="wm-activity__filters">
					{#each ['All', 'Invites', 'Settings', 'Projects', 'Billing'] as f}
						<button class="wm-activity__filter" class:wm-activity__filter--active={f === 'All'}>{f}</button>
					{/each}
				</div>
				<button class="wm-activity__export">
					<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
						<path d="M6.5 1v8M3.5 6l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M1.5 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
					</svg>
					Export
				</button>
			</div>

			<div class="wm-activity__list">
				{#each activityLog as entry, i}
					<div class="wm-activity__entry">
						<div class="wm-activity__timeline">
							<div class="wm-activity__type-dot" style="background: {activityIcons[entry.type]}; box-shadow: 0 0 0 3px {activityIcons[entry.type]}22;">
								{#if entry.type === 'invite'}
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
										<path d="M1 2.5l3 2 3-2" stroke="white" stroke-width="1" stroke-linecap="round"/>
									</svg>
								{:else if entry.type === 'settings'}
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
										<circle cx="4" cy="4" r="1.5" stroke="white" stroke-width="1"/>
									</svg>
								{:else if entry.type === 'project'}
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
										<path d="M1 2h6v4.5a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5V2z" stroke="white" stroke-width="1"/>
									</svg>
								{:else if entry.type === 'role'}
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
										<path d="M1.5 7c0-1.4 1-2.5 2.5-2.5S6.5 5.6 6.5 7M4 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="white" stroke-width="1" stroke-linecap="round"/>
									</svg>
								{:else if entry.type === 'billing'}
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
										<rect x="1" y="2" width="6" height="4.5" rx="0.5" stroke="white" stroke-width="1"/>
										<path d="M1 3.5h6" stroke="white" stroke-width="1"/>
									</svg>
								{:else}
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
										<path d="M2.5 2.5l3 3M5.5 2.5l-3 3" stroke="white" stroke-width="1" stroke-linecap="round"/>
									</svg>
								{/if}
							</div>
							{#if i < activityLog.length - 1}
								<div class="wm-activity__line"></div>
							{/if}
						</div>

						<div class="wm-activity__content">
							<div class="wm-activity__actor">
								<span class="wm-activity__actor-avatar" style="background: {entry.gradient};">{entry.initials}</span>
								<span class="wm-activity__actor-name">{entry.actor}</span>
							</div>
							<div class="wm-activity__desc">
								<span class="wm-activity__action">{entry.action}</span>
								<span class="wm-activity__target">{entry.target}</span>
							</div>
							<div class="wm-activity__time">{entry.relTime}</div>
						</div>
					</div>
				{/each}
			</div>

			<button class="wm-activity__load-more">Load more events</button>
		</div>
	</div>

	<!-- ── 6. Billing & Plan ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Billing &amp; Plan</h3>
		<p class="ds-card__sub">Current plan card, usage meters, upgrade CTA, and billing history table</p>

		<div class="wm-billing">
			<div class="wm-billing__tabs">
				<button class="wm-billing__tab" class:wm-billing__tab--active={billingTab === 'overview'} onclick={() => billingTab = 'overview'}>Overview</button>
				<button class="wm-billing__tab" class:wm-billing__tab--active={billingTab === 'history'}  onclick={() => billingTab = 'history'}>Billing History</button>
			</div>

			{#if billingTab === 'overview'}
				<div class="wm-billing__overview">
					<div class="wm-billing__plan-card">
						<div class="wm-billing__plan-badge">Current Plan</div>
						<div class="wm-billing__plan-name">Pro</div>
						<div class="wm-billing__plan-price">$49 <span class="wm-billing__plan-period">/ month</span></div>
						<ul class="wm-billing__plan-features">
							<li>
								<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#34d399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
								Unlimited projects
							</li>
							<li>
								<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#34d399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
								Up to 50 members
							</li>
							<li>
								<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#34d399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
								100 GB storage
							</li>
							<li>
								<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#34d399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
								Priority support
							</li>
						</ul>
						<div class="wm-billing__plan-renewal">Renews April 1, 2026</div>
						<button class="btn-rounded btn-rounded-ghost">Manage Subscription</button>
					</div>

					<div class="wm-billing__usage-section">
						<div class="wm-billing__usage-title">Usage This Month</div>

						{#each [
							{ label: 'Storage',   used: 38,  max: 100, unit: 'GB',   color: '#6366f1' },
							{ label: 'Members',   used: 24,  max: 50,  unit: '',      color: '#10b981' },
							{ label: 'Projects',  used: 12,  max: 999, unit: '',      color: '#f59e0b' },
							{ label: 'API calls', used: 8400, max: 10000, unit: '',   color: '#8b5cf6' },
						] as meter}
							{@const pct = Math.round((meter.used / meter.max) * 100)}
							<div class="wm-billing__meter">
								<div class="wm-billing__meter-header">
									<span class="wm-billing__meter-label">{meter.label}</span>
									<span class="wm-billing__meter-value">
										{meter.used}{meter.unit}
										{#if meter.max < 999}<span class="wm-billing__meter-max"> / {meter.max}{meter.unit}</span>{/if}
									</span>
								</div>
								<div class="wm-billing__meter-track">
									<div class="wm-billing__meter-fill" style="width: {Math.min(pct, 100)}%; background: {meter.color};"></div>
								</div>
								<div class="wm-billing__meter-pct">{pct}% used</div>
							</div>
						{/each}

						<div class="wm-billing__upgrade-cta">
							<div class="wm-billing__upgrade-info">
								<span class="wm-billing__upgrade-badge">Enterprise</span>
								<span class="wm-billing__upgrade-text">Unlimited members, 1 TB storage, SSO, and dedicated support.</span>
							</div>
							<button class="btn-rounded btn-rounded-primary">
								Upgrade to Enterprise
								<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
									<path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			{:else}
				<div class="wm-billing__history">
					<div class="wm-billing__history-head">
						<div class="wm-billing__hth wm-billing__hth--date">Date</div>
						<div class="wm-billing__hth wm-billing__hth--desc">Description</div>
						<div class="wm-billing__hth wm-billing__hth--amount">Amount</div>
						<div class="wm-billing__hth wm-billing__hth--status">Status</div>
						<div class="wm-billing__hth wm-billing__hth--action"></div>
					</div>
					{#each billingHistory as row}
						<div class="wm-billing__history-row">
							<div class="wm-billing__hcell wm-billing__hcell--date">{row.date}</div>
							<div class="wm-billing__hcell wm-billing__hcell--desc">{row.description}</div>
							<div class="wm-billing__hcell wm-billing__hcell--amount">{row.amount}</div>
							<div class="wm-billing__hcell">
								<span class="wm-billing__status-badge">{row.status}</span>
							</div>
							<div class="wm-billing__hcell wm-billing__hcell--action">
								<button class="btn-compact btn-compact-ghost" aria-label="Download invoice">
									<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
										<path d="M6.5 1v8M3.5 6l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M1.5 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
									</svg>
									PDF
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* ── Workspace Switcher ───────────────────────────────────────── */
	.wm-switcher {
		position: relative;
		max-width: 340px;
	}

	.wm-switcher__trigger {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		cursor: pointer;
		color: var(--dt);
		text-align: left;
		transition: border-color 0.15s;
	}

	.wm-switcher__trigger:hover {
		border-color: var(--dbd2);
	}

	.wm-switcher__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 8px;
		font-weight: 700;
		font-size: 15px;
		color: #fff;
		flex-shrink: 0;
	}

	.wm-switcher__avatar--sm {
		width: 28px;
		height: 28px;
		font-size: 11px;
		border-radius: 6px;
	}

	.wm-switcher__info {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.wm-switcher__name {
		font-weight: 600;
		font-size: 14px;
		color: var(--dt);
		line-height: 1.3;
	}

	.wm-switcher__plan {
		font-size: 11px;
		color: var(--dt3);
	}

	.wm-switcher__chevron {
		color: var(--dt3);
		transition: transform 0.2s ease;
		flex-shrink: 0;
	}

	.wm-switcher__chevron--open {
		transform: rotate(180deg);
	}

	.wm-switcher__dropdown {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 6px 4px 4px;
		z-index: 10;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.wm-switcher__section-label {
		padding: 2px 10px 6px;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt4);
	}

	.wm-switcher__item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border: none;
		background: none;
		border-radius: 8px;
		cursor: pointer;
		color: var(--dt);
		text-align: left;
		transition: background 0.1s;
	}

	.wm-switcher__item:hover {
		background: var(--dbg3);
	}

	.wm-switcher__item--active {
		background: var(--dbg3);
	}

	.wm-switcher__item-info {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.wm-switcher__item-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.wm-switcher__item-meta {
		font-size: 11px;
		color: var(--dt3);
	}

	.wm-switcher__active-dot {
		display: none;
	}

	.wm-switcher__check {
		color: #6366f1;
		flex-shrink: 0;
	}

	.wm-switcher__sep {
		height: 1px;
		background: var(--dbd);
		margin: 4px 6px;
	}

	.wm-switcher__create {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 10px;
		border: none;
		background: none;
		border-radius: 8px;
		cursor: pointer;
		color: var(--dt2);
		font-size: 13px;
		font-weight: 500;
	}

	.wm-switcher__create-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 5px;
		color: var(--dt3);
	}

	.wm-switcher__create:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* ── Member Management ────────────────────────────────────────── */
	.wm-members {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.wm-members__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
	}

	.wm-members__header-left {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		min-width: 0;
	}

	.wm-members__count {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
	}

	.wm-members__search {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		flex: 1;
		max-width: 240px;
		color: var(--dt3);
	}

	.wm-members__search-input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-size: 12px;
		color: var(--dt);
	}

	.wm-members__search-input::placeholder {
		color: var(--dt4);
	}



	.wm-members__table-head {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
		padding: 8px 16px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg3);
	}

	.wm-members__th {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.wm-members__th--actions {
		text-align: right;
	}

	.wm-members__list {
		display: flex;
		flex-direction: column;
	}

	.wm-member-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
		align-items: center;
		padding: 10px 16px;
		border-bottom: 1px solid var(--dbd);
		gap: 4px;
	}

	.wm-member-row:last-child {
		border-bottom: none;
	}

	.wm-member-row:hover {
		background: rgba(255, 255, 255, 0.02);
	}

	.wm-member-row__member {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.wm-member-row__avatar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		font-weight: 600;
		font-size: 11px;
		color: #fff;
		flex-shrink: 0;
	}

	.wm-member-row__status-dot {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		border: 2px solid var(--dbg2);
	}

	.wm-member-row__status-dot--active  { background: #22c55e; }
	.wm-member-row__status-dot--away    { background: #f59e0b; }
	.wm-member-row__status-dot--offline { background: var(--dbd2); }

	.wm-member-row__info {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.wm-member-row__name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.wm-member-row__email {
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.wm-member-row__cell {
		font-size: 12px;
		color: var(--dt2);
	}

	.wm-member-row__cell--muted {
		color: var(--dt3);
		font-size: 11px;
	}

	.wm-member-row__role {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 20px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.wm-member-row__role--owner  { background: rgba(99,102,241,0.15); color: #818cf8; }
	.wm-member-row__role--admin  { background: rgba(245,158,11,0.15);  color: #fbbf24; }
	.wm-member-row__role--member { background: rgba(16,185,129,0.15);  color: #34d399; }
	.wm-member-row__role--guest  { background: rgba(139,92,246,0.15);  color: #a78bfa; }

	.wm-member-row__status-label {
		font-size: 11px;
		font-weight: 500;
		text-transform: capitalize;
	}

	.wm-member-row__status-label--active  { color: #22c55e; }
	.wm-member-row__status-label--away    { color: #f59e0b; }
	.wm-member-row__status-label--offline { color: var(--dt4); }

	.wm-member-row__actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 6px;
	}

	.wm-member-row__role-select {
		padding: 4px 8px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		color: var(--dt2);
		font-size: 11px;
		cursor: pointer;
	}



	.wm-member-row__owner-lock {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: var(--dt4);
		padding-right: 4px;
	}

	/* Pending Invites */
	.wm-pending {
		border-top: 1px solid var(--dbd);
		padding: 14px 16px;
	}

	.wm-pending__title {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 10px;
	}

	.wm-pending__badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background: rgba(245,158,11,0.2);
		color: #fbbf24;
		border-radius: 50%;
		font-size: 10px;
		font-weight: 700;
	}

	.wm-pending__item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 0;
	}

	.wm-pending__item + .wm-pending__item {
		border-top: 1px solid var(--dbd);
	}

	.wm-pending__icon {
		color: var(--dt3);
		flex-shrink: 0;
	}

	.wm-pending__info {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.wm-pending__email {
		font-size: 13px;
		color: var(--dt);
	}

	.wm-pending__meta {
		font-size: 11px;
		color: var(--dt3);
	}

	.wm-pending__actions {
		display: flex;
		gap: 6px;
		flex-shrink: 0;
	}



	/* ── RBAC ─────────────────────────────────────────────────────── */
	.wm-rbac {
		display: flex;
		flex-direction: column;
		gap: 0;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.wm-rbac__header-row {
		display: grid;
		grid-template-columns: 2fr repeat(5, 1fr);
		padding: 10px 16px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
	}

	.wm-rbac__corner {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.wm-rbac__col-head {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: center;
	}

	.wm-rbac__role-row {
		display: grid;
		grid-template-columns: 2fr repeat(5, 1fr);
		padding: 12px 16px;
		align-items: center;
		border-bottom: 1px solid var(--dbd);
	}

	.wm-rbac__role-label {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.wm-rbac__role-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.wm-rbac__role-desc {
		font-size: 11px;
		color: var(--dt4);
	}

	.wm-rbac__perm-cell {
		display: flex;
		justify-content: center;
	}

	.wm-rbac__check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: rgba(16,185,129,0.12);
		border-radius: 50%;
		color: #34d399;
	}

	.wm-rbac__cross {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: rgba(107,114,128,0.1);
		border-radius: 50%;
		color: var(--dt4);
	}

	.wm-rbac__custom-section {
		padding: 16px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg);
	}

	.wm-rbac__custom-header {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 12px;
	}

	.wm-rbac__matrix {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 12px;
	}

	.wm-rbac__matrix-head {
		display: grid;
		grid-template-columns: 1.5fr repeat(5, 1fr);
		padding: 8px 14px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
	}

	.wm-rbac__feature-label,
	.wm-rbac__action-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.wm-rbac__action-label {
		text-align: center;
	}

	.wm-rbac__matrix-row {
		display: grid;
		grid-template-columns: 1.5fr repeat(5, 1fr);
		padding: 9px 14px;
		align-items: center;
		border-bottom: 1px solid var(--dbd);
	}

	.wm-rbac__matrix-row:last-child {
		border-bottom: none;
	}

	.wm-rbac__feature {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.wm-rbac__cell {
		display: flex;
		justify-content: center;
	}

	.wm-rbac__checkbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border: 1.5px solid var(--dbd2);
		border-radius: 4px;
		background: none;
		cursor: pointer;
		color: transparent;
		transition: all 0.15s;
	}

	.wm-rbac__checkbox:hover {
		border-color: #6366f1;
	}

	.wm-rbac__checkbox--checked {
		background: #6366f1;
		border-color: #6366f1;
		color: #fff;
	}

	.wm-rbac__custom-footer {
		display: flex;
		justify-content: flex-end;
	}



	/* ── Workspace Settings ───────────────────────────────────────── */
	.wm-settings {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 520px;
	}

	.wm-settings__section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.wm-settings__section-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--dbd);
	}

	.wm-settings__group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.wm-settings__label {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt2);
	}

	.wm-settings__hint {
		font-size: 11px;
		color: var(--dt4);
		margin: 0;
	}

	.wm-settings__avatar-row {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.wm-settings__logo-upload {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.wm-settings__avatar-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 12px;
		font-weight: 700;
		font-size: 22px;
		color: #fff;
	}

	.wm-settings__logo-actions {
		display: flex;
		gap: 4px;
	}



	.wm-settings__input {
		flex: 1;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		color: var(--dt);
		font-size: 14px;
		transition: border-color 0.15s;
	}

	.wm-settings__input:focus {
		outline: none;
		border-color: #6366f1;
	}

	.wm-settings__textarea {
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		color: var(--dt);
		font-size: 13px;
		resize: vertical;
		font-family: inherit;
		transition: border-color 0.15s;
	}

	.wm-settings__textarea:focus {
		outline: none;
		border-color: #6366f1;
	}

	.wm-settings__toggle-row {
		display: flex;
		gap: 4px;
		padding: 3px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		width: fit-content;
	}

	.wm-settings__toggle-opt {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 7px 16px;
		border: none;
		background: none;
		border-radius: 6px;
		font-size: 13px;
		color: var(--dt3);
		cursor: pointer;
		transition: all 0.15s;
	}

	.wm-settings__toggle-opt--active {
		background: var(--dbg3);
		color: var(--dt);
		font-weight: 500;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	}

	.wm-settings__select {
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		color: var(--dt);
		font-size: 13px;
		cursor: pointer;
		width: fit-content;
		min-width: 160px;
	}

	/* Notification toggles */
	.wm-settings__notif-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
	}

	.wm-settings__notif-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.wm-settings__notif-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.wm-settings__notif-desc {
		font-size: 11px;
		color: var(--dt4);
	}

	.wm-settings__toggle {
		position: relative;
		width: 36px;
		height: 20px;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 10px;
		cursor: pointer;
		flex-shrink: 0;
		transition: all 0.2s;
	}

	.wm-settings__toggle--on {
		background: #6366f1;
		border-color: #6366f1;
	}

	.wm-settings__toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 14px;
		height: 14px;
		background: #fff;
		border-radius: 50%;
		transition: transform 0.2s;
		box-shadow: 0 1px 3px rgba(0,0,0,0.2);
	}

	.wm-settings__toggle--on .wm-settings__toggle-thumb {
		transform: translateX(16px);
	}

	.wm-settings__save-row {
		display: flex;
	}



	/* Danger zone */
	.wm-settings__danger {
		border: 1.5px solid rgba(239,68,68,0.25);
		border-radius: 10px;
		background: rgba(239,68,68,0.03);
		overflow: hidden;
	}

	.wm-settings__danger-header {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 12px 16px;
		font-size: 13px;
		font-weight: 700;
		color: #f87171;
		border-bottom: 1px solid rgba(239,68,68,0.15);
	}

	.wm-settings__danger-items {
		display: flex;
		flex-direction: column;
	}

	.wm-settings__danger-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 16px;
	}

	.wm-settings__danger-item + .wm-settings__danger-item {
		border-top: 1px solid rgba(239,68,68,0.1);
	}

	.wm-settings__danger-item-title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		margin-bottom: 2px;
	}

	.wm-settings__danger-item-desc {
		font-size: 12px;
		color: var(--dt3);
	}



	/* ── Activity Log ─────────────────────────────────────────────── */
	.wm-activity {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.wm-activity__toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		gap: 12px;
	}

	.wm-activity__filters {
		display: flex;
		gap: 4px;
		padding: 3px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		overflow-x: auto;
	}

	.wm-activity__filter {
		padding: 6px 14px;
		border: none;
		background: none;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		cursor: pointer;
		white-space: nowrap;
		transition: all 0.15s;
	}

	.wm-activity__filter:hover {
		color: var(--dt);
		background: var(--dbg3);
	}

	.wm-activity__filter--active {
		background: var(--dbg3);
		color: var(--dt);
		box-shadow: 0 1px 3px rgba(0,0,0,0.12);
	}

	.wm-activity__export {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 12px;
		background: none;
		border: 1px solid var(--dbd);
		border-radius: 7px;
		color: var(--dt3);
		font-size: 12px;
		cursor: pointer;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.wm-activity__export:hover {
		border-color: var(--dbd2);
		color: var(--dt);
	}

	.wm-activity__list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.wm-activity__entry {
		display: flex;
		gap: 14px;
	}

	.wm-activity__timeline {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 2px;
	}

	.wm-activity__type-dot {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		flex-shrink: 0;
		z-index: 1;
	}

	.wm-activity__line {
		width: 1.5px;
		flex: 1;
		background: var(--dbd);
		min-height: 20px;
		margin: 4px 0;
	}

	.wm-activity__content {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding-bottom: 18px;
		flex: 1;
		min-width: 0;
	}

	.wm-activity__entry:last-child .wm-activity__content {
		padding-bottom: 0;
	}

	.wm-activity__actor {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.wm-activity__actor-avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		font-size: 8px;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.wm-activity__actor-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.wm-activity__desc {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.4;
	}

	.wm-activity__action {
		margin-right: 4px;
	}

	.wm-activity__target {
		font-weight: 500;
		color: var(--dt);
	}

	.wm-activity__time {
		font-size: 11px;
		color: var(--dt4);
		margin-top: 1px;
	}

	.wm-activity__load-more {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 16px;
		padding: 10px;
		background: none;
		border: 1px dashed var(--dbd2);
		border-radius: 8px;
		color: var(--dt3);
		font-size: 13px;
		cursor: pointer;
		transition: all 0.15s;
	}

	.wm-activity__load-more:hover {
		border-color: var(--dbd2);
		color: var(--dt);
		background: var(--dbg2);
	}

	/* ── Billing & Plan ───────────────────────────────────────────── */
	.wm-billing {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.wm-billing__tabs {
		display: flex;
		gap: 0;
		border-bottom: 1px solid var(--dbd);
	}

	.wm-billing__tab {
		padding: 10px 20px;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		cursor: pointer;
		transition: all 0.15s;
	}

	.wm-billing__tab:hover {
		color: var(--dt);
	}

	.wm-billing__tab--active {
		color: var(--dt);
		border-bottom-color: #6366f1;
		font-weight: 600;
	}

	.wm-billing__overview {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 20px;
		align-items: start;
	}

	.wm-billing__plan-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		position: relative;
		overflow: hidden;
	}

	.wm-billing__plan-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #6366f1, #818cf8);
	}

	.wm-billing__plan-badge {
		display: inline-flex;
		align-items: center;
		padding: 3px 10px;
		background: rgba(99,102,241,0.15);
		border-radius: 20px;
		font-size: 11px;
		font-weight: 600;
		color: #818cf8;
		width: fit-content;
	}

	.wm-billing__plan-name {
		font-size: 28px;
		font-weight: 800;
		color: var(--dt);
		line-height: 1;
	}

	.wm-billing__plan-price {
		font-size: 22px;
		font-weight: 700;
		color: var(--dt);
	}

	.wm-billing__plan-period {
		font-size: 14px;
		font-weight: 400;
		color: var(--dt3);
	}

	.wm-billing__plan-features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.wm-billing__plan-features li {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: var(--dt2);
	}

	.wm-billing__plan-renewal {
		font-size: 11px;
		color: var(--dt4);
		padding-top: 4px;
		border-top: 1px solid var(--dbd);
	}



	.wm-billing__usage-section {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.wm-billing__usage-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.wm-billing__meter {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.wm-billing__meter-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.wm-billing__meter-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.wm-billing__meter-value {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.wm-billing__meter-max {
		font-weight: 400;
		color: var(--dt3);
	}

	.wm-billing__meter-track {
		height: 6px;
		background: var(--dbg3);
		border-radius: 10px;
		overflow: hidden;
	}

	.wm-billing__meter-fill {
		height: 100%;
		border-radius: 10px;
		transition: width 0.3s ease;
	}

	.wm-billing__meter-pct {
		font-size: 11px;
		color: var(--dt4);
	}

	.wm-billing__upgrade-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 16px;
		background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08));
		border: 1px solid rgba(99,102,241,0.2);
		border-radius: 10px;
		margin-top: 4px;
	}

	.wm-billing__upgrade-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.wm-billing__upgrade-badge {
		display: inline-block;
		padding: 2px 8px;
		background: linear-gradient(90deg, #6366f1, #8b5cf6);
		border-radius: 20px;
		font-size: 10px;
		font-weight: 700;
		color: #fff;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		width: fit-content;
	}

	.wm-billing__upgrade-text {
		font-size: 12px;
		color: var(--dt2);
	}



	/* Billing History */
	.wm-billing__history {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.wm-billing__history-head {
		display: grid;
		grid-template-columns: 140px 1fr 100px 90px 80px;
		padding: 10px 16px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
	}

	.wm-billing__hth {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.wm-billing__hth--amount,
	.wm-billing__hth--status,
	.wm-billing__hth--action {
		text-align: right;
	}

	.wm-billing__history-row {
		display: grid;
		grid-template-columns: 140px 1fr 100px 90px 80px;
		padding: 12px 16px;
		align-items: center;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.1s;
	}

	.wm-billing__history-row:last-child {
		border-bottom: none;
	}

	.wm-billing__history-row:hover {
		background: rgba(255,255,255,0.02);
	}

	.wm-billing__hcell {
		font-size: 13px;
		color: var(--dt2);
	}

	.wm-billing__hcell--date {
		color: var(--dt3);
		font-size: 12px;
	}

	.wm-billing__hcell--desc {
		color: var(--dt);
		font-weight: 500;
	}

	.wm-billing__hcell--amount {
		text-align: right;
		font-weight: 600;
		color: var(--dt);
	}

	.wm-billing__hcell--action {
		text-align: right;
	}

	.wm-billing__status-badge {
		display: inline-flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		font-size: 12px;
		font-weight: 600;
		color: #34d399;
	}


</style>
