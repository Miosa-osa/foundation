<script lang="ts">
	// ── Demo 1: Bell Dropdown ────────────────────────────────────────
	let bellOpen = $state(false);
	let activeTab = $state<'all' | 'unread' | 'mentions'>('all');
	let badgeCount = $state(5);

	// ── Demo 2: Notification Items ──────────────────────────────────
	let hoveredNotif = $state('');

	// ── Demo 4: Empty State ─────────────────────────────────────────
	let emptyDismissed = $state(false);

	// ── Demo 5: Settings Toggles ────────────────────────────────────
	let prefToggles = $state<Record<string, Record<string, boolean>>>({
		tasks:    { inapp: true,  email: true,  push: true  },
		mentions: { inapp: true,  email: true,  push: true  },
		messages: { inapp: true,  email: false, push: true  },
		projects: { inapp: true,  email: true,  push: false },
		system:   { inapp: true,  email: true,  push: true  },
	});
</script>

<section class="ds-section">
	<h2 class="ds-title">Notification Center</h2>
	<p class="ds-desc">Notification patterns — bell dropdown, item anatomy, type variants, empty states, and preference toggles. All demos are interactive with live Svelte 5 state.</p>

	<!-- ═══ 1. BELL DROPDOWN ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Bell Dropdown</h3>
		<p class="ds-card__sub">Click the bell to open the notification panel. Tabs filter content; "Mark all read" clears the badge count.</p>

		<div class="nc-bell-row">
			<!-- Interactive bell -->
			<div class="nc-bell-wrap">
				<button
					class="btn-pill btn-pill-ghost btn-pill-icon nc-bell-btn"
					onclick={() => bellOpen = !bellOpen}
					aria-label="Open notifications"
					aria-expanded={bellOpen}
				>
					<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
					</svg>
					{#if badgeCount > 0}
						<span class="nc-badge">{badgeCount > 9 ? '9+' : badgeCount}</span>
					{/if}
				</button>

				{#if bellOpen}
					<div class="nc-dropdown">
						<div class="nc-dropdown__header">
							<span class="nc-dropdown__title">Notifications</span>
							<button class="nc-link" onclick={() => { badgeCount = 0; }}>Mark all read</button>
						</div>
						<div class="nc-tabs">
							{#each (['all', 'unread', 'mentions'] as const) as tab}
								<button
									class="nc-tabs__tab"
									class:nc-tabs__tab--active={activeTab === tab}
									onclick={() => activeTab = tab}
								>{tab}</button>
							{/each}
						</div>
						<div class="nc-dropdown__list">
							<div class="nc-item nc-item--unread">
								<span class="nc-item__dot"></span>
								<div class="nc-avatar" style="background:#7c3aed;">MK</div>
								<div class="nc-item__body">
									<div class="nc-item__text"><strong>Maya Kim</strong> <span class="nc-item__action">assigned you to</span> Redesign onboarding flow</div>
									<div class="nc-item__time">2m ago</div>
								</div>
							</div>
							<div class="nc-item nc-item--unread">
								<span class="nc-item__dot"></span>
								<div class="nc-avatar" style="background:#2563eb;">JS</div>
								<div class="nc-item__body">
									<div class="nc-item__text"><strong>Jake Santos</strong> <span class="nc-item__action">mentioned you in</span> #product-feedback</div>
									<div class="nc-item__time">18m ago</div>
								</div>
							</div>
							<div class="nc-item">
								<span class="nc-item__dot nc-item__dot--hidden"></span>
								<div class="nc-avatar" style="background:#059669;">AL</div>
								<div class="nc-item__body">
									<div class="nc-item__text"><strong>Ava Lee</strong> <span class="nc-item__action">commented on</span> Q1 Roadmap Planning</div>
									<div class="nc-item__time">1h ago</div>
								</div>
							</div>
							<div class="nc-item nc-item--unread">
								<span class="nc-item__dot"></span>
								<div class="nc-avatar" style="background:#d97706;">RP</div>
								<div class="nc-item__body">
									<div class="nc-item__text"><strong>Ryan Park</strong> <span class="nc-item__action">completed task</span> API rate-limit documentation</div>
									<div class="nc-item__time">3h ago</div>
								</div>
							</div>
						</div>
						<div class="nc-dropdown__footer">
							<button class="nc-link" onclick={() => bellOpen = false}>View all notifications</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Static preview panel -->
			<div class="nc-panel-preview">
				<div class="nc-dropdown__header">
					<span class="nc-dropdown__title">Notifications</span>
					<span class="nc-link">Mark all read</span>
				</div>
				<div class="nc-tabs">
					<div class="nc-tabs__tab nc-tabs__tab--active">All</div>
					<div class="nc-tabs__tab">Unread</div>
					<div class="nc-tabs__tab">Mentions</div>
				</div>
				<div class="nc-item nc-item--unread">
					<span class="nc-item__dot"></span>
					<div class="nc-avatar" style="background:#7c3aed;">MK</div>
					<div class="nc-item__body">
						<div class="nc-item__text"><strong>Maya Kim</strong> <span class="nc-item__action">assigned you to</span> Redesign onboarding</div>
						<div class="nc-item__time">2m ago</div>
					</div>
				</div>
				<div class="nc-item nc-item--unread">
					<span class="nc-item__dot"></span>
					<div class="nc-avatar" style="background:#2563eb;">JS</div>
					<div class="nc-item__body">
						<div class="nc-item__text"><strong>Jake Santos</strong> <span class="nc-item__action">mentioned you in</span> #product-feedback</div>
						<div class="nc-item__time">18m ago</div>
					</div>
				</div>
				<div class="nc-item">
					<span class="nc-item__dot nc-item__dot--hidden"></span>
					<div class="nc-avatar" style="background:#059669;">AL</div>
					<div class="nc-item__body">
						<div class="nc-item__text"><strong>Ava Lee</strong> <span class="nc-item__action">commented on</span> Q1 Roadmap Planning</div>
						<div class="nc-item__time">1h ago</div>
					</div>
				</div>
				<div class="nc-dropdown__footer">
					<span class="nc-link">View all notifications</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 2. NOTIFICATION ITEMS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Items</h3>
		<p class="ds-card__sub">Hover any row to reveal action buttons. Unread items show a blue dot indicator. Shown at narrow (sidebar) and wide (full page) widths.</p>

		<div class="nc-items-demo">
			<!-- Narrow width -->
			<div class="nc-items-list nc-items-list--narrow">
				{#each [
					{ id: 'n1', unread: true,  avatar: 'MK', bg: '#7c3aed', name: 'Maya Kim',    act: 'assigned you to',  target: 'Redesign onboarding flow',    time: '2m ago' },
					{ id: 'n2', unread: true,  avatar: 'JS', bg: '#2563eb', name: 'Jake Santos',  act: 'mentioned you in', target: '#product-feedback',            time: '18m ago' },
					{ id: 'n3', unread: false, avatar: 'AL', bg: '#059669', name: 'Ava Lee',      act: 'commented on',     target: 'Q1 Roadmap Planning',         time: '1h ago' },
				] as notif}
					<div
						class="nc-item"
						class:nc-item--unread={notif.unread}
						onmouseenter={() => hoveredNotif = notif.id}
						onmouseleave={() => hoveredNotif = ''}
						role="button"
						tabindex="0"
					>
						{#if notif.unread}
							<span class="nc-item__dot"></span>
						{:else}
							<span class="nc-item__dot nc-item__dot--hidden"></span>
						{/if}
						<div class="nc-avatar" style="background:{notif.bg};">{notif.avatar}</div>
						<div class="nc-item__body">
							<div class="nc-item__text"><strong>{notif.name}</strong> <span class="nc-item__action">{notif.act}</span> {notif.target}</div>
							<div class="nc-item__time">{notif.time}</div>
						</div>
						<div class="nc-item__actions" class:nc-item__actions--visible={hoveredNotif === notif.id}>
							<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Mark as read">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
							</button>
							<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
							</button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Wide width -->
			<div class="nc-items-list nc-items-list--wide">
				{#each [
					{ id: 'w1', unread: true,  avatar: 'RP', bg: '#d97706', name: 'Ryan Park',    act: 'completed task',  target: 'API rate-limit documentation',  time: '3h ago' },
					{ id: 'w2', unread: false, avatar: 'SN', bg: '#db2777', name: 'Sara Nakano',  act: 'shared a file in', target: 'Design assets',               time: 'Yesterday' },
					{ id: 'w3', unread: true,  avatar: 'TW', bg: '#0891b2', name: 'Tom Wright',   act: 'invited you to',   target: 'Sprint 12 retro',             time: '5h ago' },
				] as notif}
					<div
						class="nc-item"
						class:nc-item--unread={notif.unread}
						onmouseenter={() => hoveredNotif = notif.id}
						onmouseleave={() => hoveredNotif = ''}
						role="button"
						tabindex="0"
					>
						{#if notif.unread}
							<span class="nc-item__dot"></span>
						{:else}
							<span class="nc-item__dot nc-item__dot--hidden"></span>
						{/if}
						<div class="nc-avatar" style="background:{notif.bg};">{notif.avatar}</div>
						<div class="nc-item__body">
							<div class="nc-item__text"><strong>{notif.name}</strong> <span class="nc-item__action">{notif.act}</span> {notif.target}</div>
							<div class="nc-item__time">{notif.time}</div>
						</div>
						<div class="nc-item__actions" class:nc-item__actions--visible={hoveredNotif === notif.id}>
							<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Mark as read">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
							</button>
							<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 3. NOTIFICATION TYPES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Types</h3>
		<p class="ds-card__sub">Five semantic categories: task assigned (blue), comment mention (green), deadline (yellow), system alert (red), team update (purple).</p>

		<div class="nc-types-grid">
			<!-- Task Assigned -->
			<div class="nc-type-card">
				<div class="nc-type-icon" style="background:rgba(59,130,246,0.1);">
					<svg width="16" height="16" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
					</svg>
				</div>
				<div class="nc-type-body">
					<div class="nc-type-meta">
						<span class="nc-type-label" style="color:#3b82f6; background:rgba(59,130,246,0.1);">Task Assigned</span>
						<span class="nc-type-time">5m ago</span>
					</div>
					<div class="nc-type-title">New task assigned to you</div>
					<div class="nc-type-desc">Ryan Park assigned "Finalize API docs" to you in Sprint 12.</div>
				</div>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Comment Mention -->
			<div class="nc-type-card">
				<div class="nc-type-icon" style="background:rgba(34,197,94,0.1);">
					<svg width="16" height="16" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
					</svg>
				</div>
				<div class="nc-type-body">
					<div class="nc-type-meta">
						<span class="nc-type-label" style="color:#22c55e; background:rgba(34,197,94,0.1);">Comment Mention</span>
						<span class="nc-type-time">12m ago</span>
					</div>
					<div class="nc-type-title">Ava Lee mentioned you</div>
					<div class="nc-type-desc">"@you can you review the latest mockups before standup?"</div>
				</div>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Deadline Approaching -->
			<div class="nc-type-card">
				<div class="nc-type-icon" style="background:rgba(234,179,8,0.1);">
					<svg width="16" height="16" fill="none" stroke="#eab308" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</div>
				<div class="nc-type-body">
					<div class="nc-type-meta">
						<span class="nc-type-label" style="color:#eab308; background:rgba(234,179,8,0.1);">Deadline</span>
						<span class="nc-type-time">1h ago</span>
					</div>
					<div class="nc-type-title">Deadline approaching</div>
					<div class="nc-type-desc">"Website Redesign" is due in 2 days. 3 tasks still pending.</div>
				</div>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- System Alert -->
			<div class="nc-type-card">
				<div class="nc-type-icon" style="background:rgba(239,68,68,0.1);">
					<svg width="16" height="16" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
					</svg>
				</div>
				<div class="nc-type-body">
					<div class="nc-type-meta">
						<span class="nc-type-label" style="color:#ef4444; background:rgba(239,68,68,0.1);">System Alert</span>
						<span class="nc-type-time">2h ago</span>
					</div>
					<div class="nc-type-title">Storage limit at 90%</div>
					<div class="nc-type-desc">Your workspace is nearly full. Upgrade your plan to continue uploading.</div>
				</div>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Team Update -->
			<div class="nc-type-card">
				<div class="nc-type-icon" style="background:rgba(168,85,247,0.1);">
					<svg width="16" height="16" fill="none" stroke="#a855f7" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
					</svg>
				</div>
				<div class="nc-type-body">
					<div class="nc-type-meta">
						<span class="nc-type-label" style="color:#a855f7; background:rgba(168,85,247,0.1);">Team Update</span>
						<span class="nc-type-time">4h ago</span>
					</div>
					<div class="nc-type-title">Sara Nakano joined the team</div>
					<div class="nc-type-desc">Sara has been added to the Design team. Say hello!</div>
				</div>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Dismiss">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ 4. EMPTY STATE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Empty State</h3>
		<p class="ds-card__sub">When there are no notifications. Click "Mark all read" to toggle the empty state.</p>

		<div class="nc-empty-demo">
			{#if !emptyDismissed}
				<div class="nc-panel-preview">
					<div class="nc-dropdown__header">
						<span class="nc-dropdown__title">Notifications</span>
						<button class="nc-link" onclick={() => emptyDismissed = true}>Mark all read</button>
					</div>
					<div class="nc-item nc-item--unread">
						<span class="nc-item__dot"></span>
						<div class="nc-avatar" style="background:#7c3aed;">MK</div>
						<div class="nc-item__body">
							<div class="nc-item__text"><strong>Maya Kim</strong> <span class="nc-item__action">assigned you to</span> Redesign onboarding</div>
							<div class="nc-item__time">2m ago</div>
						</div>
					</div>
					<div class="nc-item nc-item--unread">
						<span class="nc-item__dot"></span>
						<div class="nc-avatar" style="background:#2563eb;">JS</div>
						<div class="nc-item__body">
							<div class="nc-item__text"><strong>Jake Santos</strong> <span class="nc-item__action">mentioned you</span></div>
							<div class="nc-item__time">18m ago</div>
						</div>
					</div>
					<div class="nc-dropdown__footer">
						<span class="nc-item__time">Click "Mark all read" to see empty state</span>
					</div>
				</div>
			{:else}
				<div class="nc-panel-preview">
					<div class="nc-dropdown__header">
						<span class="nc-dropdown__title">Notifications</span>
						<button class="nc-link" onclick={() => emptyDismissed = false}>Reset</button>
					</div>
					<div class="nc-empty">
						<div class="nc-empty__icon">
							<svg width="28" height="28" fill="none" stroke="var(--dt3)" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
							</svg>
						</div>
						<div class="nc-empty__title">All caught up!</div>
						<div class="nc-empty__sub">No new notifications right now. We'll let you know when something happens.</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══ 5. NOTIFICATION SETTINGS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Settings</h3>
		<p class="ds-card__sub">Matrix-style preference grid. Toggle delivery methods per category. Includes quiet hours time range.</p>

		<div class="nc-settings">
			<!-- Column headers -->
			<div class="nc-settings__header">
				<div class="nc-settings__label-col"></div>
				<div class="nc-settings__col">In-app</div>
				<div class="nc-settings__col">Email</div>
				<div class="nc-settings__col">Push</div>
			</div>

			<!-- Preference rows -->
			<div class="nc-settings__rows">
				{#each [
					{ id: 'tasks',    label: 'Task updates',    desc: 'Assignments, completions, due dates' },
					{ id: 'mentions', label: 'Mentions',         desc: 'When someone @mentions you' },
					{ id: 'messages', label: 'Direct messages',  desc: 'New DMs and channel messages' },
					{ id: 'projects', label: 'Project activity', desc: 'Status changes and milestones' },
					{ id: 'system',   label: 'System alerts',    desc: 'Billing, usage, and security' },
				] as pref}
					<div class="nc-settings__row">
						<div class="nc-settings__label-col">
							<div class="nc-settings__name">{pref.label}</div>
							<div class="nc-settings__desc">{pref.desc}</div>
						</div>
						{#each (['inapp', 'email', 'push'] as const) as channel}
							<div class="nc-settings__col">
								<button
									class="nc-toggle"
									class:nc-toggle--on={prefToggles[pref.id][channel]}
									onclick={() => { prefToggles[pref.id][channel] = !prefToggles[pref.id][channel]; }}
									aria-label="Toggle {channel} for {pref.label}"
									aria-pressed={prefToggles[pref.id][channel]}
								>
									<span class="nc-toggle__thumb"></span>
								</button>
							</div>
						{/each}
					</div>
				{/each}
			</div>

			<!-- Quiet hours -->
			<div class="nc-quiet">
				<div class="nc-quiet__header">
					<svg width="14" height="14" fill="none" stroke="var(--dt2)" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
					</svg>
					<span class="nc-quiet__label">Quiet Hours</span>
				</div>
				<div class="nc-quiet__range">
					<div class="nc-time-input">
						<span class="nc-time-input__label">From</span>
						<span class="nc-time-input__value">10:00 PM</span>
					</div>
					<span class="nc-quiet__separator">-</span>
					<div class="nc-time-input">
						<span class="nc-time-input__label">To</span>
						<span class="nc-time-input__value">7:00 AM</span>
					</div>
				</div>
			</div>

			<!-- Action buttons -->
			<div class="nc-settings__actions">
				<button class="btn-rounded btn-rounded-ghost btn-rounded-sm">Reset to defaults</button>
				<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Save preferences</button>
			</div>
		</div>
	</div>

</section>

<style>
	/* ── Bell Dropdown ────────────────────────────────────────────── */
	.nc-bell-row {
		display: flex;
		align-items: flex-start;
		gap: 48px;
		flex-wrap: wrap;
	}

	.nc-bell-wrap {
		position: relative;
		display: inline-block;
	}

	.nc-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 4px;
		border-radius: 9999px;
		background: #ef4444;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		border: 2px solid var(--dbg);
		line-height: 1;
	}

	/* ── Dropdown Panel ───────────────────────────────────────────── */
	.nc-dropdown {
		position: absolute;
		top: 48px;
		left: 0;
		width: 360px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
		z-index: 100;
		overflow: hidden;
	}

	.nc-dropdown__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px 10px;
	}

	.nc-dropdown__title {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
	}

	.nc-dropdown__list {
		max-height: 320px;
		overflow-y: auto;
	}

	.nc-dropdown__footer {
		padding: 12px 16px;
		text-align: center;
		border-top: 1px solid var(--dbd);
	}

	/* ── Link Button ──────────────────────────────────────────────── */
	.nc-link {
		font-size: 12px;
		color: #3b82f6;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 500;
		padding: 0;
	}

	.nc-link:hover {
		color: #2563eb;
	}

	/* ── Tabs ─────────────────────────────────────────────────────── */
	.nc-tabs {
		display: flex;
		gap: 4px;
		padding: 0 16px;
		border-bottom: 1px solid var(--dbd);
	}

	.nc-tabs__tab {
		padding: 6px 12px 8px;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition: color 0.15s;
		text-transform: capitalize;
	}

	.nc-tabs__tab--active {
		color: #3b82f6;
		border-bottom-color: #3b82f6;
	}

	.nc-tabs__tab:hover:not(.nc-tabs__tab--active) {
		color: var(--dt2);
	}

	/* ── Panel Preview (static) ───────────────────────────────────── */
	.nc-panel-preview {
		width: 340px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		box-shadow: 0 4px 16px rgba(0,0,0,0.08);
		overflow: hidden;
		flex-shrink: 0;
	}

	/* ── Notification Item ────────────────────────────────────────── */
	.nc-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--dbd);
		background: transparent;
		transition: background 0.12s;
		cursor: pointer;
		position: relative;
	}

	.nc-item:last-child {
		border-bottom: none;
	}

	.nc-item--unread {
		background: rgba(59,130,246,0.03);
	}

	.nc-item:hover {
		background: var(--dbg2);
	}

	.nc-item__dot {
		display: block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #3b82f6;
		flex-shrink: 0;
		margin-top: 8px;
	}

	.nc-item__dot--hidden {
		visibility: hidden;
	}

	/* ── Avatar ───────────────────────────────────────────────────── */
	.nc-avatar {
		width: 34px;
		height: 34px;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	/* ── Item Body ────────────────────────────────────────────────── */
	.nc-item__body {
		flex: 1;
		min-width: 0;
	}

	.nc-item__text {
		font-size: 13px;
		color: var(--dt);
		line-height: 1.45;
	}

	.nc-item__action {
		color: var(--dt2);
	}

	.nc-item__time {
		font-size: 11px;
		color: var(--dt3);
		margin-top: 3px;
	}

	/* ── Item Hover Actions ───────────────────────────────────────── */
	.nc-item__actions {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
		opacity: 0;
		transition: opacity 0.15s;
	}

	.nc-item__actions--visible {
		opacity: 1;
	}

	/* ── Items Demo Layout ────────────────────────────────────────── */
	.nc-items-demo {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
	}

	.nc-items-list {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
	}

	.nc-items-list--narrow {
		width: 320px;
	}

	.nc-items-list--wide {
		width: 520px;
	}

	/* ── Notification Types ───────────────────────────────────────── */
	.nc-types-grid {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 520px;
	}

	.nc-type-card {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		transition: box-shadow 0.15s;
	}

	.nc-type-card:hover {
		box-shadow: 0 2px 12px rgba(0,0,0,0.06);
	}

	.nc-type-icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.nc-type-body {
		flex: 1;
		min-width: 0;
	}

	.nc-type-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 3px;
	}

	.nc-type-label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 7px;
		border-radius: 9999px;
	}

	.nc-type-time {
		font-size: 11px;
		color: var(--dt3);
	}

	.nc-type-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		margin-bottom: 2px;
	}

	.nc-type-desc {
		font-size: 12px;
		color: var(--dt2);
		line-height: 1.5;
	}

	/* ── Empty State ──────────────────────────────────────────────── */
	.nc-empty-demo {
		max-width: 360px;
	}

	.nc-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 48px 24px;
		gap: 12px;
		text-align: center;
	}

	.nc-empty__icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--dbg2);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 4px;
	}

	.nc-empty__title {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
	}

	.nc-empty__sub {
		font-size: 13px;
		color: var(--dt2);
		max-width: 220px;
		line-height: 1.5;
	}

	/* ── Settings Panel ───────────────────────────────────────────── */
	.nc-settings {
		max-width: 560px;
	}

	.nc-settings__header {
		display: grid;
		grid-template-columns: 1fr 72px 72px 72px;
		gap: 8px;
		padding: 0 16px 8px;
		align-items: center;
	}

	.nc-settings__col {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.nc-settings__rows {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
	}

	.nc-settings__row {
		display: grid;
		grid-template-columns: 1fr 72px 72px 72px;
		gap: 8px;
		padding: 14px 16px;
		align-items: center;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg);
	}

	.nc-settings__row:last-child {
		border-bottom: none;
	}

	.nc-settings__label-col {
		min-width: 0;
	}

	.nc-settings__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.nc-settings__desc {
		font-size: 12px;
		color: var(--dt2);
		margin-top: 1px;
	}

	/* ── Toggle Switch ────────────────────────────────────────────── */
	.nc-toggle {
		position: relative;
		width: 38px;
		height: 22px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s;
		flex-shrink: 0;
		padding: 0;
	}

	.nc-toggle--on {
		background: #3b82f6;
		border-color: #3b82f6;
	}

	.nc-toggle__thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 14px;
		height: 14px;
		border-radius: 9999px;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0,0,0,0.2);
		transition: left 0.2s;
	}

	.nc-toggle--on .nc-toggle__thumb {
		left: 19px;
	}

	/* ── Quiet Hours ──────────────────────────────────────────────── */
	.nc-quiet {
		margin-top: 16px;
		padding: 14px 16px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
	}

	.nc-quiet__header {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 10px;
	}

	.nc-quiet__label {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.nc-quiet__range {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.nc-quiet__separator {
		font-size: 14px;
		color: var(--dt3);
		font-weight: 500;
	}

	.nc-time-input {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nc-time-input__label {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}

	.nc-time-input__value {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		padding: 5px 10px;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg2);
	}

	/* ── Settings Action Buttons ──────────────────────────────────── */
	.nc-settings__actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 12px;
	}


</style>
