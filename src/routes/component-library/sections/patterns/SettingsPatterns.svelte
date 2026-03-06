<script lang="ts">
	// ── 3. Settings with Toggles ──────────────────────────────────
	let pushNotifications = $state(true);
	let soundEffects = $state(true);
	let darkMode = $state(false);
	let analytics = $state(false);

	// ── 7. Settings Search ────────────────────────────────────────
	let searchQuery = $state('');

	const allSettingsItems = [
		{ label: 'Invite Friends',      group: "Let's Connect" },
		{ label: 'Give Feedback',       group: "Let's Connect" },
		{ label: 'Follow us on X',      group: "Let's Connect" },
		{ label: 'Join us on Discord',  group: "Let's Connect" },
		{ label: 'Terms',               group: 'Boring Zone' },
		{ label: 'Privacy',             group: 'Boring Zone' },
		{ label: 'Sign Out',            group: 'Boring Zone' },
		{ label: 'Language',            group: 'Preferences' },
		{ label: 'Region',              group: 'Preferences' },
		{ label: 'Theme',               group: 'Preferences' },
		{ label: 'Font Size',           group: 'Preferences' },
		{ label: 'Push Notifications',  group: 'Notifications' },
		{ label: 'Sound Effects',       group: 'Notifications' },
		{ label: 'Dark Mode',           group: 'Appearance' },
		{ label: 'Analytics',           group: 'Privacy' },
		{ label: 'Delete Account',      group: 'Danger Zone' },
		{ label: 'Clear All Data',      group: 'Danger Zone' },
		{ label: 'Revoke Access',       group: 'Danger Zone' },
	];

	const filteredSettings = $derived(
		searchQuery.trim() === ''
			? allSettingsItems
			: allSettingsItems.filter(item =>
				item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.group.toLowerCase().includes(searchQuery.toLowerCase())
			)
	);

	// ── 8. Full Settings Page toggles ─────────────────────────────
	let fullNotifToggle = $state(true);
	let full2faToggle = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Settings Patterns</h2>
	<p class="ds-desc">
		Apple-style iOS settings patterns — grouped lists, toggles, values, search, and full page compositions.
	</p>

	<!-- ── 1. Grouped Settings List (Light) ─────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Grouped Settings List (Light)</h3>
		<p class="ds-card__sub">Apple-style grouped list on a white card with chevron affordances</p>

		<div class="stp-page stp-page--light">
			<div class="stp-group">
				<div class="stp-group__header">Let's Connect</div>
				<div class="stp-group__body stp-group__body--light">
					{#each ["Invite Friends", "Give Feedback", "Follow us on X", "Join us on Discord"] as item, i}
						<button class="stp-item stp-item--light">
							<span class="stp-item__label">{item}</span>
							<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						{#if i < 3}<div class="stp-sep stp-sep--light"></div>{/if}
					{/each}
				</div>
			</div>

			<div class="stp-group">
				<div class="stp-group__header">Boring Zone</div>
				<div class="stp-group__body stp-group__body--light">
					{#each ["Terms", "Privacy", "Sign Out"] as item, i}
						<button class="stp-item stp-item--light">
							<span class="stp-item__label">{item}</span>
							<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						{#if i < 2}<div class="stp-sep stp-sep--light"></div>{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 2. Grouped Settings List (Glass/Dark) ─────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Grouped Settings List (Glass / Dark)</h3>
		<p class="ds-card__sub">Same structure on a dark glass surface — items glow subtly on hover</p>

		<div class="stp-page stp-page--dark">
			<div class="stp-group">
				<div class="stp-group__header stp-group__header--muted">Let's Connect</div>
				<div class="stp-group__body stp-group__body--glass">
					{#each ["Invite Friends", "Give Feedback", "Follow us on X", "Join us on Discord"] as item, i}
						<button class="stp-item stp-item--glass">
							<span class="stp-item__label stp-item__label--light">{item}</span>
							<svg class="stp-item__chevron stp-item__chevron--muted" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						{#if i < 3}<div class="stp-sep stp-sep--dark"></div>{/if}
					{/each}
				</div>
			</div>

			<div class="stp-group">
				<div class="stp-group__header stp-group__header--muted">Boring Zone</div>
				<div class="stp-group__body stp-group__body--glass">
					{#each ["Terms", "Privacy", "Sign Out"] as item, i}
						<button class="stp-item stp-item--glass">
							<span class="stp-item__label stp-item__label--light">{item}</span>
							<svg class="stp-item__chevron stp-item__chevron--muted" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						{#if i < 2}<div class="stp-sep stp-sep--dark"></div>{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 3. Settings with Toggles ──────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Settings with Toggles</h3>
		<p class="ds-card__sub">Rows where the right control is an accessible <code>role="switch"</code> toggle</p>

		<div class="stp-page stp-page--contained">
			<div class="stp-group">
				<div class="stp-group__header">Preferences</div>
				<div class="stp-group__body stp-group__body--light">
					{#each [
						{ label: 'Push Notifications', get: () => pushNotifications, set: (v: boolean) => { pushNotifications = v; } },
						{ label: 'Sound Effects',       get: () => soundEffects,      set: (v: boolean) => { soundEffects = v; } },
						{ label: 'Dark Mode',           get: () => darkMode,           set: (v: boolean) => { darkMode = v; } },
						{ label: 'Analytics',           get: () => analytics,          set: (v: boolean) => { analytics = v; } },
					] as row, i}
						<div class="stp-item stp-item--light stp-item--static">
							<span class="stp-item__label">{row.label}</span>
							<button
								role="switch"
								aria-checked={row.get()}
								aria-label="Toggle {row.label}"
								class="stp-toggle {row.get() ? 'stp-toggle--on' : 'stp-toggle--off'}"
								onclick={() => row.set(!row.get())}
							>
								<span class="stp-toggle__thumb"></span>
							</button>
						</div>
						{#if i < 3}<div class="stp-sep stp-sep--light"></div>{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 4. Settings with Values ───────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Settings with Values</h3>
		<p class="ds-card__sub">Rows showing a label on the left and a current value on the right — iOS Settings style</p>

		<div class="stp-page stp-page--contained">
			<div class="stp-group">
				<div class="stp-group__header">General</div>
				<div class="stp-group__body stp-group__body--light">
					{#each [
						{ label: 'Language',  value: 'English' },
						{ label: 'Region',    value: 'United States' },
						{ label: 'Theme',     value: 'System' },
						{ label: 'Font Size', value: 'Medium' },
					] as row, i}
						<button class="stp-item stp-item--light">
							<span class="stp-item__label">{row.label}</span>
							<span class="stp-item__value-group">
								<span class="stp-item__value">{row.value}</span>
								<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
									<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						</button>
						{#if i < 3}<div class="stp-sep stp-sep--light"></div>{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 5. Profile Settings Header ───────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Profile Settings Header</h3>
		<p class="ds-card__sub">Avatar, name, email, and edit button above grouped settings rows</p>

		<div class="stp-page stp-page--light">
			<div class="stp-profile-header">
				<div class="stp-avatar" aria-hidden="true">AJ</div>
				<div class="stp-profile-header__info">
					<span class="stp-profile-header__name">Alex Johnson</span>
					<span class="stp-profile-header__email">alex@miosa.dev</span>
				</div>
				<button class="stp-profile-header__edit" aria-label="Edit profile">Edit Profile</button>
			</div>

			<div class="stp-group">
				<div class="stp-group__header">Account</div>
				<div class="stp-group__body stp-group__body--light">
					{#each ["Account", "Security", "Preferences"] as item, i}
						<button class="stp-item stp-item--light">
							<span class="stp-item__label">{item}</span>
							<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						{#if i < 2}<div class="stp-sep stp-sep--light"></div>{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 6. Danger Zone ────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Danger Zone</h3>
		<p class="ds-card__sub">A red-tinted settings group for destructive actions — red text and left border accent</p>

		<div class="stp-page stp-page--contained">
			<div class="stp-group">
				<div class="stp-group__header stp-group__header--red">Danger Zone</div>
				<div class="stp-group__body stp-group__body--danger">
					{#each [
						"Delete Account",
						"Clear All Data",
						"Revoke Access",
					] as item, i}
						<button class="stp-item stp-item--danger">
							<span class="stp-item__label stp-item__label--red">{item}</span>
							<svg class="stp-item__chevron stp-item__chevron--red" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						{#if i < 2}<div class="stp-sep stp-sep--danger"></div>{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 7. Settings Search ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Settings Search</h3>
		<p class="ds-card__sub">
			A search input filters a flat list of settings via <code>$state</code> + <code>$derived</code>
		</p>

		<div class="stp-page stp-page--contained">
			<div class="stp-search-wrap">
				<svg class="stp-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
					<circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.4"/>
					<path d="M9.5 9.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
				</svg>
				<input
					class="stp-search"
					type="search"
					placeholder="Search settings…"
					aria-label="Search settings"
					bind:value={searchQuery}
				/>
			</div>

			{#if filteredSettings.length > 0}
				<div class="stp-group">
					<div class="stp-group__body stp-group__body--light">
						{#each filteredSettings as item, i}
							<button class="stp-item stp-item--light">
								<span class="stp-item__inner">
									<span class="stp-item__label">{item.label}</span>
									<span class="stp-item__group-tag">{item.group}</span>
								</span>
								<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
									<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
							{#if i < filteredSettings.length - 1}
								<div class="stp-sep stp-sep--light"></div>
							{/if}
						{/each}
					</div>
				</div>
			{:else}
				<div class="stp-empty">No settings match "{searchQuery}"</div>
			{/if}
		</div>
	</div>

	<!-- ── 8. In Context: Full Settings Page ─────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Full Settings Page</h3>
		<p class="ds-card__sub">Complete composition — profile header, grouped sections, toggles, and danger zone</p>

		<div class="stp-full-page">
			<!-- Profile -->
			<div class="stp-full-profile">
				<div class="stp-avatar stp-avatar--lg" aria-hidden="true">AJ</div>
				<div class="stp-full-profile__info">
					<span class="stp-full-profile__name">Alex Johnson</span>
					<span class="stp-full-profile__email">alex@miosa.dev</span>
				</div>
				<button class="stp-profile-header__edit" aria-label="Edit profile">Edit Profile</button>
			</div>

			<!-- General group -->
			<div class="stp-group">
				<div class="stp-group__header stp-group__header--page">General</div>
				<div class="stp-group__body stp-group__body--page">
					<button class="stp-item stp-item--page">
						<span class="stp-item__label">Language</span>
						<span class="stp-item__value-group">
							<span class="stp-item__value">English</span>
							<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</button>
					<div class="stp-sep stp-sep--page"></div>
					<button class="stp-item stp-item--page">
						<span class="stp-item__label">Theme</span>
						<span class="stp-item__value-group">
							<span class="stp-item__value">System</span>
							<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</button>
					<div class="stp-sep stp-sep--page"></div>
					<div class="stp-item stp-item--page stp-item--static">
						<span class="stp-item__label">Notifications</span>
						<button
							role="switch"
							aria-checked={fullNotifToggle}
							aria-label="Toggle Notifications"
							class="stp-toggle {fullNotifToggle ? 'stp-toggle--on' : 'stp-toggle--off'}"
							onclick={() => { fullNotifToggle = !fullNotifToggle; }}
						>
							<span class="stp-toggle__thumb"></span>
						</button>
					</div>
				</div>
			</div>

			<!-- Account group -->
			<div class="stp-group">
				<div class="stp-group__header stp-group__header--page">Account</div>
				<div class="stp-group__body stp-group__body--page">
					<button class="stp-item stp-item--page">
						<span class="stp-item__label">Email</span>
						<span class="stp-item__value-group">
							<span class="stp-item__value">alex@miosa.dev</span>
							<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
								<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</button>
					<div class="stp-sep stp-sep--page"></div>
					<button class="stp-item stp-item--page">
						<span class="stp-item__label">Password</span>
						<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
							<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div class="stp-sep stp-sep--page"></div>
					<div class="stp-item stp-item--page stp-item--static">
						<span class="stp-item__label">Two-Factor Auth</span>
						<button
							role="switch"
							aria-checked={full2faToggle}
							aria-label="Toggle Two-Factor Auth"
							class="stp-toggle {full2faToggle ? 'stp-toggle--on' : 'stp-toggle--off'}"
							onclick={() => { full2faToggle = !full2faToggle; }}
						>
							<span class="stp-toggle__thumb"></span>
						</button>
					</div>
				</div>
			</div>

			<!-- About group -->
			<div class="stp-group">
				<div class="stp-group__header stp-group__header--page">About</div>
				<div class="stp-group__body stp-group__body--page">
					<div class="stp-item stp-item--page stp-item--static">
						<span class="stp-item__label">Version</span>
						<span class="stp-item__value">1.4.2</span>
					</div>
					<div class="stp-sep stp-sep--page"></div>
					<button class="stp-item stp-item--page">
						<span class="stp-item__label">Terms</span>
						<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
							<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div class="stp-sep stp-sep--page"></div>
					<button class="stp-item stp-item--page">
						<span class="stp-item__label">Privacy</span>
						<svg class="stp-item__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
							<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Danger Zone group -->
			<div class="stp-group">
				<div class="stp-group__header stp-group__header--red">Danger Zone</div>
				<div class="stp-group__body stp-group__body--danger">
					<button class="stp-item stp-item--danger">
						<span class="stp-item__label stp-item__label--red">Sign Out</span>
						<svg class="stp-item__chevron stp-item__chevron--red" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
							<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div class="stp-sep stp-sep--danger"></div>
					<button class="stp-item stp-item--danger">
						<span class="stp-item__label stp-item__label--red">Delete Account</span>
						<svg class="stp-item__chevron stp-item__chevron--red" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
							<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  PAGE WRAPPERS                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-page {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.stp-page--light {
		background: var(--dbg2);
		border-radius: 14px;
		padding: 16px;
	}
	.stp-page--dark {
		background: var(--dbg);
		border-radius: 14px;
		padding: 16px;
	}
	.stp-page--contained {
		background: var(--dbg2);
		border-radius: 14px;
		padding: 16px;
		max-width: 480px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  GROUP                                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-group {
		display: flex;
		flex-direction: column;
	}
	.stp-group__header {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--dt3);
		padding: 0 16px 6px;
	}
	.stp-group__header--muted {
		color: var(--dt4);
	}
	.stp-group__header--red {
		color: #ef4444;
	}
	.stp-group__header--page {
		color: var(--dt3);
		padding: 0 4px 6px;
	}

	/* ── Group bodies ─────────────────────────────────────────── */
	.stp-group__body {
		display: flex;
		flex-direction: column;
	}
	.stp-group__body--light {
		background: var(--dbg3);
		border-radius: 12px;
		overflow: hidden;
	}
	.stp-group__body--glass {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		overflow: hidden;
		backdrop-filter: blur(12px);
	}
	.stp-group__body--danger {
		background: rgba(239, 68, 68, 0.05);
		border: 1px solid rgba(239, 68, 68, 0.18);
		border-radius: 12px;
		overflow: hidden;
	}
	.stp-group__body--page {
		background: var(--dbg3);
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--dbd2);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  ITEMS                                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 13px 16px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: background 0.12s;
		gap: 12px;
		box-sizing: border-box;
	}
	.stp-item--light:hover:not(.stp-item--static) {
		background: rgba(0, 0, 0, 0.03);
	}
	.stp-item--glass:hover:not(.stp-item--static) {
		background: rgba(255, 255, 255, 0.08);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
	}
	.stp-item--danger {
		background: transparent;
		border-left: 3px solid rgba(239, 68, 68, 0.35);
		padding-left: 13px;
	}
	.stp-item--danger:hover {
		background: rgba(239, 68, 68, 0.06);
	}
	.stp-item--page:hover:not(.stp-item--static) {
		background: rgba(0, 0, 0, 0.02);
	}
	.stp-item--static {
		cursor: default;
	}

	/* ── Inner two-line layout (search results) ───────────────── */
	.stp-item__inner {
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
		flex: 1;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  ITEM PARTS                                                   */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-item__label {
		font-size: 15px;
		font-weight: 400;
		color: var(--dt);
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.stp-item__label--light {
		color: var(--dt2);
	}
	.stp-item__label--red {
		color: #ef4444;
		font-weight: 500;
	}
	.stp-item__chevron {
		color: var(--dt4);
		flex-shrink: 0;
	}
	.stp-item__chevron--muted {
		color: rgba(255, 255, 255, 0.22);
	}
	.stp-item__chevron--red {
		color: rgba(239, 68, 68, 0.45);
	}
	.stp-item__value-group {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}
	.stp-item__value {
		font-size: 14px;
		color: var(--dt3);
		font-weight: 400;
	}
	.stp-item__group-tag {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  SEPARATORS                                                   */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-sep {
		height: 1px;
		margin: 0 16px;
		flex-shrink: 0;
	}
	.stp-sep--light {
		background: rgba(0, 0, 0, 0.07);
	}
	.stp-sep--dark {
		background: rgba(255, 255, 255, 0.1);
	}
	.stp-sep--danger {
		background: rgba(239, 68, 68, 0.15);
		margin: 0 13px;
	}
	.stp-sep--page {
		background: rgba(0, 0, 0, 0.06);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TOGGLE SWITCH                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 50px;
		height: 30px;
		border-radius: 15px;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		padding: 0;
	}
	.stp-toggle--on  { background: #34c759; }
	.stp-toggle--off { background: var(--dbg3); }
	.stp-toggle__thumb {
		position: absolute;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: var(--dbg);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.1);
		transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		left: 2px;
		top: 2px;
	}
	.stp-toggle--on  .stp-toggle__thumb { transform: translateX(20px); }
	.stp-toggle--off .stp-toggle__thumb { transform: translateX(0); }
	.stp-toggle:focus-visible {
		outline: 2px solid var(--dt);
		outline-offset: 2px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  AVATAR                                                       */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-avatar {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--dbg3), var(--dbg2));
		color: var(--dt);
		font-size: 17px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		letter-spacing: -0.02em;
		user-select: none;
	}
	.stp-avatar--lg {
		width: 62px;
		height: 62px;
		font-size: 20px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  PROFILE HEADER                                               */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-profile-header {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 4px 4px 16px;
	}
	.stp-profile-header__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}
	.stp-profile-header__name {
		font-size: 17px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1.2;
	}
	.stp-profile-header__email {
		font-size: 13px;
		color: var(--dt3);
	}
	.stp-profile-header__edit {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		background: transparent;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 6px 14px;
		cursor: pointer;
		flex-shrink: 0;
		font-family: inherit;
		transition: background 0.15s, border-color 0.15s;
	}
	.stp-profile-header__edit:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  SEARCH                                                       */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-search-wrap {
		position: relative;
		margin-bottom: 10px;
	}
	.stp-search-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--dt3);
		pointer-events: none;
	}
	.stp-search {
		width: 100%;
		padding: 10px 12px 10px 34px;
		font-size: 15px;
		font-family: inherit;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		outline: none;
		color: var(--dt);
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}
	.stp-search::placeholder { color: var(--dt4); }
	.stp-search:focus {
		border-color: var(--dbd);
		box-shadow: 0 0 0 3px var(--dbg2);
	}
	.stp-empty {
		text-align: center;
		font-size: 14px;
		color: var(--dt3);
		padding: 24px 16px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  FULL SETTINGS PAGE                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.stp-full-page {
		background: var(--dbg2);
		border-radius: 16px;
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 520px;
	}
	.stp-full-profile {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 4px 4px 20px;
		border-bottom: 1px solid var(--dbd2);
		margin-bottom: 4px;
	}
	.stp-full-profile__info {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;
		min-width: 0;
	}
	.stp-full-profile__name {
		font-size: 18px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1.2;
	}
	.stp-full-profile__email {
		font-size: 13px;
		color: var(--dt3);
	}
</style>
