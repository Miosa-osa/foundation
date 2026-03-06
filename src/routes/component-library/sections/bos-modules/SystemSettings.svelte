<script lang="ts">
	// ── General Settings ──────────────────────────────────────────────
	let workspaceName = $state('MIOSA Workspace');
	let language = $state('en');
	let timezone = $state('America/New_York');
	let theme = $state<'dark' | 'light' | 'system'>('system');
	let emailNotifs = $state(true);
	let pushNotifs = $state(true);
	let inAppNotifs = $state(true);

	// ── Security Settings ─────────────────────────────────────────────
	let twoFactorEnabled = $state(false);
	let showQr = $state(false);

	type DeviceSession = {
		id: string;
		device: string;
		browser: string;
		ip: string;
		lastActive: string;
		current: boolean;
	};

	const sessions: DeviceSession[] = [
		{ id: 's1', device: 'MacBook Pro 16"',   browser: 'Chrome 122',  ip: '192.168.1.42',  lastActive: 'Now',      current: true  },
		{ id: 's2', device: 'iPhone 15 Pro',      browser: 'Safari 17',   ip: '192.168.1.58',  lastActive: '2h ago',   current: false },
		{ id: 's3', device: 'Windows 11 Desktop', browser: 'Edge 121',    ip: '10.0.0.7',      lastActive: 'Yesterday', current: false },
		{ id: 's4', device: 'iPad Pro',           browser: 'Chrome 121',  ip: '192.168.1.71',  lastActive: '3d ago',   current: false },
	];

	let revokedSessions = $state<string[]>([]);
	function revokeSession(id: string) {
		revokedSessions = [...revokedSessions, id];
	}

	type LoginRecord = { date: string; device: string; ip: string; status: 'success' | 'failed' };
	const loginHistory: LoginRecord[] = [
		{ date: 'Mar 6, 2026 · 09:14',  device: 'MacBook Pro 16"',   ip: '192.168.1.42', status: 'success' },
		{ date: 'Mar 5, 2026 · 22:08',  device: 'iPhone 15 Pro',     ip: '192.168.1.58', status: 'success' },
		{ date: 'Mar 5, 2026 · 18:31',  device: 'Unknown Device',    ip: '85.14.21.9',   status: 'failed'  },
		{ date: 'Mar 4, 2026 · 10:55',  device: 'iPad Pro',          ip: '192.168.1.71', status: 'success' },
		{ date: 'Mar 3, 2026 · 14:22',  device: 'MacBook Pro 16"',   ip: '192.168.1.42', status: 'success' },
	];

	let showPasswordForm = $state(false);
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');

	// ── Billing & Plan ────────────────────────────────────────────────
	type UsageStat = { label: string; used: number; total: number; unit: string; color: string };
	const usageStats: UsageStat[] = [
		{ label: 'Storage',      used: 4.2,  total: 10,    unit: 'GB',   color: '#3b82f6' },
		{ label: 'API Calls',    used: 8340, total: 10000, unit: '',     color: '#8b5cf6' },
		{ label: 'Team Members', used: 6,    total: 10,    unit: '',     color: '#06b6d4' },
	];

	// ── Danger Zone ───────────────────────────────────────────────────
	let deleteConfirm = $state(false);
	let exportConfirm = $state(false);
	let transferConfirm = $state(false);
	let transferEmail = $state('');
	let transferSent = $state(false);

	function submitTransfer() {
		if (transferEmail.trim()) {
			transferSent = true;
			transferEmail = '';
		}
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">System Settings</h2>
	<p class="ds-desc">
		Workspace configuration, security controls, billing plan, and destructive-action patterns.
	</p>

	<!-- ══════════════════════════════════════════════════════════════
	     1. General Settings
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">General Settings</h3>
		<p class="ds-card__sub">Workspace identity, locale, theme preference, and notification toggles</p>

		<div class="st-page">
			<!-- Workspace Name -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Workspace</span>
				</div>
				<div class="st-section__body">
					<div class="st-field">
						<label class="st-label" for="ws-name">Workspace Name</label>
						<input
							id="ws-name"
							class="st-input"
							type="text"
							bind:value={workspaceName}
							aria-label="Workspace name"
						/>
					</div>
					<div class="st-sep"></div>
					<div class="st-field">
						<label class="st-label" for="ws-lang">Language</label>
						<select id="ws-lang" class="st-select" bind:value={language} aria-label="Language">
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
							<option value="de">German</option>
							<option value="ja">Japanese</option>
						</select>
					</div>
					<div class="st-sep"></div>
					<div class="st-field">
						<label class="st-label" for="ws-tz">Timezone</label>
						<select id="ws-tz" class="st-select" bind:value={timezone} aria-label="Timezone">
							<option value="America/New_York">Eastern Time (ET)</option>
							<option value="America/Chicago">Central Time (CT)</option>
							<option value="America/Denver">Mountain Time (MT)</option>
							<option value="America/Los_Angeles">Pacific Time (PT)</option>
							<option value="Europe/London">London (GMT)</option>
							<option value="Europe/Paris">Paris (CET)</option>
							<option value="Asia/Tokyo">Tokyo (JST)</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Theme -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Appearance</span>
				</div>
				<div class="st-section__body">
					<div class="st-theme-row">
						{#each (['light', 'dark', 'system'] as const) as opt}
							<button
								class="st-theme-btn {theme === opt ? 'st-theme-btn--active' : ''}"
								onclick={() => { theme = opt; }}
								aria-pressed={theme === opt}
								aria-label="Theme: {opt}"
							>
								<span class="st-theme-btn__icon" aria-hidden="true">
									{#if opt === 'light'}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
									{:else if opt === 'dark'}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
									{:else}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
									{/if}
								</span>
								<span class="st-theme-btn__label">{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Notifications -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Notifications</span>
				</div>
				<div class="st-section__body">
					{#each [
						{ label: 'Email Notifications',   desc: 'Receive updates and alerts via email',     get: () => emailNotifs,  set: (v: boolean) => { emailNotifs = v; } },
						{ label: 'Push Notifications',    desc: 'Browser and mobile push alerts',           get: () => pushNotifs,   set: (v: boolean) => { pushNotifs = v; } },
						{ label: 'In-App Notifications',  desc: 'Show notification bell in the interface',  get: () => inAppNotifs,  set: (v: boolean) => { inAppNotifs = v; } },
					] as row, i}
						<div class="st-toggle-row">
							<div class="st-toggle-row__info">
								<span class="st-toggle-row__label">{row.label}</span>
								<span class="st-toggle-row__desc">{row.desc}</span>
							</div>
							<button
								role="switch"
								aria-checked={row.get()}
								aria-label="Toggle {row.label}"
								class="st-toggle {row.get() ? 'st-toggle--on' : 'st-toggle--off'}"
								onclick={() => row.set(!row.get())}
							>
								<span class="st-toggle__thumb"></span>
							</button>
						</div>
						{#if i < 2}<div class="st-sep"></div>{/if}
					{/each}
				</div>
			</div>

			<div class="st-form-actions">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" aria-label="Discard changes">Discard</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" aria-label="Save general settings">Save Changes</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     2. Security Settings
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Security Settings</h3>
		<p class="ds-card__sub">Two-factor auth, active sessions, password management, and login history</p>

		<div class="st-page">
			<!-- 2FA -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Two-Factor Authentication</span>
					<span class="st-section__badge {twoFactorEnabled ? 'st-section__badge--green' : 'st-section__badge--muted'}">
						{twoFactorEnabled ? 'Enabled' : 'Disabled'}
					</span>
				</div>
				<div class="st-section__body">
					<div class="st-toggle-row">
						<div class="st-toggle-row__info">
							<span class="st-toggle-row__label">Authenticator App (TOTP)</span>
							<span class="st-toggle-row__desc">Use Google Authenticator, Authy, or 1Password</span>
						</div>
						<button
							role="switch"
							aria-checked={twoFactorEnabled}
							aria-label="Toggle two-factor authentication"
							class="st-toggle {twoFactorEnabled ? 'st-toggle--on' : 'st-toggle--off'}"
							onclick={() => { twoFactorEnabled = !twoFactorEnabled; showQr = twoFactorEnabled; }}
						>
							<span class="st-toggle__thumb"></span>
						</button>
					</div>

					{#if showQr}
						<div class="st-qr-block">
							<div class="st-qr-placeholder" aria-label="QR code placeholder" role="img">
								<div class="st-qr-grid" aria-hidden="true">
									{#each Array(81) as _, i}
										<div class="st-qr-cell {Math.random() > 0.5 ? 'st-qr-cell--filled' : ''}"></div>
									{/each}
								</div>
							</div>
							<div class="st-qr-info">
								<p class="st-qr-info__title">Scan with your authenticator app</p>
								<p class="st-qr-info__sub">Or enter the setup key manually:</p>
								<code class="st-qr-code">JBSW Y3DP EHPK 3PXP</code>
								<div class="st-qr-actions">
									<button class="btn-pill btn-pill-secondary btn-pill-xs" aria-label="Copy setup key">Copy Key</button>
									<button class="btn-pill btn-pill-ghost btn-pill-xs" onclick={() => { showQr = false; }} aria-label="Cancel 2FA setup">Cancel</button>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Active Sessions -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Active Sessions</span>
					<button class="btn-pill btn-pill-danger btn-pill-xs" aria-label="Revoke all other sessions">Revoke All Others</button>
				</div>
				<div class="st-section__body st-section__body--flush">
					{#each sessions as session, i}
						{#if !revokedSessions.includes(session.id)}
							<div class="st-session-row">
								<div class="st-session-icon" aria-hidden="true">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
								</div>
								<div class="st-session-info">
									<div class="st-session-info__top">
										<span class="st-session-info__device">{session.device}</span>
										{#if session.current}
											<span class="st-session-info__current">Current</span>
										{/if}
									</div>
									<div class="st-session-info__meta">{session.browser} · {session.ip} · {session.lastActive}</div>
								</div>
								{#if !session.current}
									<button
										class="btn-pill btn-pill-ghost btn-pill-xs"
										onclick={() => revokeSession(session.id)}
										aria-label="Revoke session on {session.device}"
									>Revoke</button>
								{/if}
							</div>
							{#if i < sessions.length - 1}<div class="st-sep st-sep--inset"></div>{/if}
						{/if}
					{/each}
				</div>
			</div>

			<!-- Password Change -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Password</span>
					<button
						class="btn-pill btn-pill-ghost btn-pill-xs"
						onclick={() => { showPasswordForm = !showPasswordForm; }}
						aria-expanded={showPasswordForm}
						aria-label="Toggle password change form"
					>
						{showPasswordForm ? 'Cancel' : 'Change Password'}
					</button>
				</div>
				{#if showPasswordForm}
					<div class="st-section__body">
						<div class="st-field">
							<label class="st-label" for="cur-pw">Current Password</label>
							<input id="cur-pw" class="st-input" type="password" bind:value={currentPassword} placeholder="••••••••" aria-label="Current password" />
						</div>
						<div class="st-sep"></div>
						<div class="st-field">
							<label class="st-label" for="new-pw">New Password</label>
							<input id="new-pw" class="st-input" type="password" bind:value={newPassword} placeholder="Min 12 characters" aria-label="New password" />
						</div>
						<div class="st-sep"></div>
						<div class="st-field">
							<label class="st-label" for="conf-pw">Confirm Password</label>
							<input id="conf-pw" class="st-input" type="password" bind:value={confirmPassword} placeholder="Repeat new password" aria-label="Confirm new password" />
						</div>
						<div class="st-form-actions">
							<button class="btn-pill btn-pill-primary btn-pill-sm" aria-label="Update password">Update Password</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Login History -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Login History</span>
				</div>
				<div class="st-section__body st-section__body--flush">
					<table class="st-table" aria-label="Login history">
						<thead>
							<tr class="st-table__head-row">
								<th class="st-th" scope="col">Date</th>
								<th class="st-th" scope="col">Device</th>
								<th class="st-th" scope="col">IP Address</th>
								<th class="st-th" scope="col" style="text-align:right">Status</th>
							</tr>
						</thead>
						<tbody>
							{#each loginHistory as record, i}
								<tr class="st-table__row {i === loginHistory.length - 1 ? 'st-table__row--last' : ''}">
									<td class="st-td st-td--muted">{record.date}</td>
									<td class="st-td">{record.device}</td>
									<td class="st-td st-td--mono">{record.ip}</td>
									<td class="st-td" style="text-align:right">
										<span class="st-status-badge {record.status === 'success' ? 'st-status-badge--green' : 'st-status-badge--red'}">
											{record.status === 'success' ? 'Success' : 'Failed'}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     3. Billing & Plan
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Billing &amp; Plan</h3>
		<p class="ds-card__sub">Current plan overview, usage meters, upgrade CTA, and payment method</p>

		<div class="st-page">
			<!-- Current Plan Card -->
			<div class="st-plan-card">
				<div class="st-plan-card__head">
					<div>
						<div class="st-plan-card__name">Pro Plan</div>
						<div class="st-plan-card__price">$19<span class="st-plan-card__period">/month</span></div>
					</div>
					<span class="st-plan-card__badge">Current Plan</span>
				</div>
				<ul class="st-plan-card__features" role="list">
					{#each ['10,000 API calls / month', '10 GB storage', 'Up to 10 team members', 'Priority support', 'Unlimited session history', 'API access (rate limited)'] as feat}
						<li class="st-plan-card__feat">
							<svg class="st-plan-card__check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
							{feat}
						</li>
					{/each}
				</ul>
				<div class="st-plan-card__footer">
					<span class="st-plan-card__renew">Renews April 6, 2026</span>
					<button class="btn-pill btn-pill-primary btn-pill-sm" aria-label="Upgrade to Enterprise plan">Upgrade Plan</button>
				</div>
			</div>

			<!-- Usage Bars -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Usage This Month</span>
				</div>
				<div class="st-section__body">
					{#each usageStats as stat, i}
						{@const pct = Math.round((stat.used / stat.total) * 100)}
						<div class="st-usage-row">
							<div class="st-usage-row__head">
								<span class="st-usage-row__label">{stat.label}</span>
								<span class="st-usage-row__val">
									{stat.used.toLocaleString()}{stat.unit ? ' ' + stat.unit : ''} / {stat.total.toLocaleString()}{stat.unit ? ' ' + stat.unit : ''}
								</span>
							</div>
							<div class="st-usage-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="{stat.label}: {pct}% used">
								<div class="st-usage-fill" style="width:{pct}%; background:{pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : stat.color};"></div>
							</div>
							<div class="st-usage-row__meta">
								<span>{pct}% used</span>
								<span>{stat.total - stat.used} {stat.unit} remaining</span>
							</div>
						</div>
						{#if i < usageStats.length - 1}<div class="st-sep"></div>{/if}
					{/each}
				</div>
			</div>

			<!-- Payment Method -->
			<div class="st-section">
				<div class="st-section__header">
					<span class="st-section__title">Payment Method</span>
					<button class="btn-pill btn-pill-ghost btn-pill-xs" aria-label="Update payment method">Update</button>
				</div>
				<div class="st-section__body">
					<div class="st-payment-card">
						<div class="st-payment-card__brand" aria-hidden="true">
							<svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-label="Visa"><rect width="32" height="20" rx="4" fill="#1a1f71"/><text x="5" y="15" fill="#fff" font-size="11" font-weight="800" font-family="sans-serif">VISA</text></svg>
						</div>
						<div class="st-payment-card__info">
							<span class="st-payment-card__number">•••• •••• •••• 4242</span>
							<span class="st-payment-card__expiry">Expires 09/28</span>
						</div>
						<span class="st-payment-card__tag">Default</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     4. Danger Zone
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Danger Zone</h3>
		<p class="ds-card__sub">Destructive and irreversible workspace actions with confirmation states</p>

		<div class="st-danger-zone">
			<!-- Delete Workspace -->
			<div class="st-danger-row">
				<div class="st-danger-row__info">
					<span class="st-danger-row__title">Delete Workspace</span>
					<span class="st-danger-row__desc">Permanently delete this workspace and all its data. This action cannot be undone.</span>
				</div>
				<div class="st-danger-row__action">
					{#if !deleteConfirm}
						<button
							class="btn-pill btn-pill-danger btn-pill-sm"
							onclick={() => { deleteConfirm = true; }}
							aria-label="Delete workspace — requires confirmation"
						>Delete Workspace</button>
					{:else}
						<div class="st-confirm-inline">
							<span class="st-confirm-inline__label">Are you sure?</span>
							<button class="btn-pill btn-pill-danger btn-pill-sm" aria-label="Confirm delete workspace">Yes, Delete</button>
							<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => { deleteConfirm = false; }} aria-label="Cancel delete">Cancel</button>
						</div>
					{/if}
				</div>
			</div>

			<div class="st-danger-sep"></div>

			<!-- Export Data -->
			<div class="st-danger-row">
				<div class="st-danger-row__info">
					<span class="st-danger-row__title">Export Workspace Data</span>
					<span class="st-danger-row__desc">Download a full export of all workspace data including messages, files, and settings.</span>
				</div>
				<div class="st-danger-row__action">
					{#if !exportConfirm}
						<button
							class="btn-pill btn-pill-outline btn-pill-sm"
							onclick={() => { exportConfirm = true; }}
							aria-label="Export workspace data"
						>Export Data</button>
					{:else}
						<div class="st-confirm-inline">
							<span class="st-confirm-inline__label">Export will be emailed to you.</span>
							<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => { exportConfirm = false; }} aria-label="Confirm export">Confirm Export</button>
							<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => { exportConfirm = false; }} aria-label="Cancel export">Cancel</button>
						</div>
					{/if}
				</div>
			</div>

			<div class="st-danger-sep"></div>

			<!-- Transfer Ownership -->
			<div class="st-danger-row st-danger-row--col">
				<div class="st-danger-row__info">
					<span class="st-danger-row__title">Transfer Ownership</span>
					<span class="st-danger-row__desc">Transfer this workspace to another member. You will lose admin access after transfer.</span>
				</div>
				{#if !transferSent}
					<div class="st-transfer-form">
						<input
							class="st-input st-input--sm"
							type="email"
							placeholder="New owner email address"
							bind:value={transferEmail}
							aria-label="New owner email address"
						/>
						<button
							class="btn-pill btn-pill-danger btn-pill-sm"
							onclick={submitTransfer}
							disabled={!transferEmail.trim() || !transferConfirm}
							aria-label="Transfer workspace ownership"
						>Transfer</button>
					</div>
					<label class="st-checkbox-row">
						<input type="checkbox" bind:checked={transferConfirm} aria-label="I understand this action is irreversible" />
						<span>I understand this action is irreversible</span>
					</label>
				{:else}
					<div class="st-transfer-sent">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
						Transfer request sent. Check the new owner's inbox for confirmation.
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  PAGE LAYOUT                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.st-page {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 640px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  SECTION BLOCK                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.st-section {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
	}

	.st-section__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 13px 16px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.st-section__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.st-section__badge {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		border: 1px solid transparent;
	}
	.st-section__badge--green {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border-color: rgba(34, 197, 94, 0.2);
	}
	.st-section__badge--muted {
		background: var(--dbg3);
		color: var(--dt3);
		border-color: var(--dbd);
	}

	.st-section__body {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.st-section__body--flush {
		padding: 0;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  FORM FIELDS                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.st-field {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 0;
	}

	.st-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		min-width: 140px;
		flex-shrink: 0;
	}

	.st-input {
		flex: 1;
		padding: 8px 11px;
		font-size: 13px;
		font-family: inherit;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg2);
		color: var(--dt);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}
	.st-input:focus {
		border-color: rgba(59, 130, 246, 0.5);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}
	.st-input--sm {
		flex: 1;
		padding: 7px 10px;
		font-size: 12px;
	}

	.st-select {
		flex: 1;
		padding: 8px 11px;
		font-size: 13px;
		font-family: inherit;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg2);
		color: var(--dt);
		outline: none;
		cursor: pointer;
		transition: border-color 0.15s;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 10px center;
		padding-right: 28px;
	}
	.st-select:focus {
		border-color: rgba(59, 130, 246, 0.5);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.st-sep {
		height: 1px;
		background: var(--dbd);
		margin: 2px 0;
	}
	.st-sep--inset {
		margin-left: 48px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  THEME PICKER                                                 */
	/* ══════════════════════════════════════════════════════════════ */
	.st-theme-row {
		display: flex;
		gap: 8px;
		padding: 8px 0;
	}

	.st-theme-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 12px 20px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg2);
		color: var(--dt2);
		cursor: pointer;
		font-size: 12px;
		font-family: inherit;
		transition: border-color 0.15s, background 0.15s, color 0.15s;
		min-width: 72px;
	}
	.st-theme-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
	}
	.st-theme-btn--active {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.06);
		color: #3b82f6;
	}

	.st-theme-btn__icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.st-theme-btn__label {
		font-weight: 500;
		text-transform: capitalize;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TOGGLE ROWS                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.st-toggle-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 10px 0;
	}

	.st-toggle-row__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.st-toggle-row__label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.st-toggle-row__desc {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
	}

	.st-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 44px;
		height: 26px;
		border-radius: 13px;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		padding: 0;
	}
	.st-toggle--on  { background: #22c55e; }
	.st-toggle--off { background: var(--dbg3); border: 1px solid var(--dbd); }
	.st-toggle__thumb {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0,0,0,0.2);
		transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		left: 3px;
	}
	.st-toggle--on  .st-toggle__thumb { transform: translateX(18px); }
	.st-toggle--off .st-toggle__thumb { transform: translateX(0); }
	.st-toggle:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  FORM ACTIONS                                                 */
	/* ══════════════════════════════════════════════════════════════ */
	.st-form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 16px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  2FA QR BLOCK                                                 */
	/* ══════════════════════════════════════════════════════════════ */
	.st-qr-block {
		display: flex;
		align-items: flex-start;
		gap: 20px;
		margin-top: 16px;
		padding: 16px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg2);
		flex-wrap: wrap;
	}

	.st-qr-placeholder {
		width: 100px;
		height: 100px;
		border-radius: 8px;
		overflow: hidden;
		flex-shrink: 0;
		background: var(--dbg);
		padding: 6px;
		border: 1px solid var(--dbd);
	}

	.st-qr-grid {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		gap: 1px;
		width: 100%;
		height: 100%;
	}

	.st-qr-cell {
		background: var(--dbg3);
		border-radius: 1px;
	}
	.st-qr-cell--filled {
		background: var(--dt);
	}

	.st-qr-info {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex: 1;
		min-width: 0;
	}

	.st-qr-info__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
	}

	.st-qr-info__sub {
		font-size: 11px;
		color: var(--dt3);
		margin: 0;
	}

	.st-qr-code {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--dt);
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 5px 10px;
		display: inline-block;
		width: fit-content;
	}

	.st-qr-actions {
		display: flex;
		gap: 6px;
		margin-top: 4px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  SESSION ROWS                                                 */
	/* ══════════════════════════════════════════════════════════════ */
	.st-session-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
	}

	.st-session-icon {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt3);
		flex-shrink: 0;
	}

	.st-session-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.st-session-info__top {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.st-session-info__device {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.st-session-info__current {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 7px;
		border-radius: 9999px;
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.st-session-info__meta {
		font-size: 11px;
		color: var(--dt3);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TABLE                                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.st-table {
		width: 100%;
		border-collapse: collapse;
	}

	.st-table__head-row {
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.st-th {
		padding: 9px 14px;
		text-align: left;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
		white-space: nowrap;
	}

	.st-table__row {
		border-bottom: 1px solid var(--dbd);
	}
	.st-table__row--last {
		border-bottom: none;
	}

	.st-td {
		padding: 10px 14px;
		font-size: 12px;
		color: var(--dt);
	}
	.st-td--muted {
		color: var(--dt3);
		font-size: 11px;
		white-space: nowrap;
	}
	.st-td--mono {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 11px;
		color: var(--dt2);
	}

	.st-status-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
	}
	.st-status-badge--green {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}
	.st-status-badge--red {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  PLAN CARD                                                    */
	/* ══════════════════════════════════════════════════════════════ */
	.st-plan-card {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 18px 20px;
		background: var(--dbg);
	}

	.st-plan-card__head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 14px;
	}

	.st-plan-card__name {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
		margin-bottom: 4px;
	}

	.st-plan-card__price {
		font-size: 28px;
		font-weight: 800;
		color: var(--dt);
		line-height: 1;
	}

	.st-plan-card__period {
		font-size: 13px;
		font-weight: 400;
		color: var(--dt3);
	}

	.st-plan-card__badge {
		font-size: 10px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: 9999px;
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
		border: 1px solid rgba(59, 130, 246, 0.2);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.st-plan-card__features {
		list-style: none;
		padding: 0;
		margin: 0 0 16px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 7px;
	}

	.st-plan-card__feat {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: var(--dt2);
	}

	.st-plan-card__check {
		color: #22c55e;
		flex-shrink: 0;
	}

	.st-plan-card__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-top: 14px;
		border-top: 1px solid var(--dbd);
	}

	.st-plan-card__renew {
		font-size: 11px;
		color: var(--dt3);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  USAGE BARS                                                   */
	/* ══════════════════════════════════════════════════════════════ */
	.st-usage-row {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 0;
	}

	.st-usage-row__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.st-usage-row__label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt);
	}

	.st-usage-row__val {
		font-size: 11px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
	}

	.st-usage-track {
		height: 6px;
		border-radius: 9999px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		overflow: hidden;
	}

	.st-usage-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	.st-usage-row__meta {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		color: var(--dt4);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  PAYMENT CARD                                                 */
	/* ══════════════════════════════════════════════════════════════ */
	.st-payment-card {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 14px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg2);
	}

	.st-payment-card__brand {
		flex-shrink: 0;
	}

	.st-payment-card__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}

	.st-payment-card__number {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		font-family: 'SF Mono', 'Fira Code', monospace;
		letter-spacing: 0.08em;
	}

	.st-payment-card__expiry {
		font-size: 11px;
		color: var(--dt3);
	}

	.st-payment-card__tag {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		background: var(--dbg3);
		color: var(--dt3);
		border: 1px solid var(--dbd);
		white-space: nowrap;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  DANGER ZONE                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.st-danger-zone {
		border: 1px solid rgba(239, 68, 68, 0.25);
		border-radius: 12px;
		background: rgba(239, 68, 68, 0.02);
		overflow: hidden;
	}

	.st-danger-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 20px;
		flex-wrap: wrap;
	}
	.st-danger-row--col {
		flex-direction: column;
		align-items: flex-start;
	}

	.st-danger-row__info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		min-width: 0;
	}

	.st-danger-row__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.st-danger-row__desc {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.5;
	}

	.st-danger-row__action {
		flex-shrink: 0;
	}

	.st-danger-sep {
		height: 1px;
		background: rgba(239, 68, 68, 0.12);
		margin: 0 20px;
	}

	.st-confirm-inline {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.st-confirm-inline__label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2);
		white-space: nowrap;
	}

	.st-transfer-form {
		display: flex;
		gap: 8px;
		width: 100%;
		max-width: 460px;
	}

	.st-checkbox-row {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--dt3);
		cursor: pointer;
		margin-top: 6px;
	}
	.st-checkbox-row input {
		cursor: pointer;
		accent-color: #3b82f6;
	}

	.st-transfer-sent {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: #22c55e;
		padding: 10px 14px;
		border-radius: 8px;
		background: rgba(34, 197, 94, 0.08);
		border: 1px solid rgba(34, 197, 94, 0.18);
	}
</style>
