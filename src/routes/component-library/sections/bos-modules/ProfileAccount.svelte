<script lang="ts">
	// ── Profile Header ───────────────────────────────────────────────
	let editingProfile = $state(false);

	// ── Account Settings ─────────────────────────────────────────────
	let firstName = $state('Jane');
	let lastName = $state('Doe');
	let email = $state('jane.doe@company.com');
	let phone = $state('+1 (555) 012-3456');
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let showCurrentPw = $state(false);
	let showNewPw = $state(false);
	let showConfirmPw = $state(false);
	let twoFactorEnabled = $state(true);
	let showQR = $state(false);

	const passwordStrength = $derived((() => {
		const p = newPassword;
		if (!p) return 0;
		let s = 0;
		if (p.length >= 8) s++;
		if (/[A-Z]/.test(p)) s++;
		if (/[0-9]/.test(p)) s++;
		if (/[^A-Za-z0-9]/.test(p)) s++;
		return s;
	})());
	const passwordStrengthLabel = $derived(
		passwordStrength === 0 ? '' :
		passwordStrength === 1 ? 'Weak' :
		passwordStrength === 2 ? 'Fair' :
		passwordStrength === 3 ? 'Good' : 'Strong'
	);
	const passwordStrengthColor = $derived(
		passwordStrength === 1 ? '#ef4444' :
		passwordStrength === 2 ? '#f59e0b' :
		passwordStrength === 3 ? '#84cc16' :
		passwordStrength >= 4  ? '#22c55e' :
		'var(--dbd)'
	);
	const passwordsMatch = $derived(confirmPassword.length > 0 && newPassword === confirmPassword);

	// ── Notification Preferences ─────────────────────────────────────
	let notifEmailMentions    = $state(true);
	let notifEmailUpdates     = $state(true);
	let notifEmailDigest      = $state(false);
	let notifPushMessages     = $state(true);
	let notifPushReminders    = $state(true);
	let notifPushMarketing    = $state(false);
	let notifInAppAll         = $state(true);
	let notifInAppSound       = $state(false);
	let dndEnabled            = $state(false);
	let dndFrom               = $state('22:00');
	let dndUntil              = $state('08:00');

	// ── Activity History ─────────────────────────────────────────────
	let activityFilter = $state<'all' | 'login' | 'change' | 'action'>('all');

	const allActivity = [
		{ type: 'login',  label: 'Signed in',                       detail: 'Chrome on macOS',      ip: '192.168.1.42',  time: '2 hours ago'   },
		{ type: 'action', label: 'Edited document "Q1 Roadmap"',     detail: 'Chrome on macOS',      ip: '192.168.1.42',  time: '5 hours ago'   },
		{ type: 'action', label: 'Completed task "API integration"', detail: 'Chrome on macOS',      ip: '192.168.1.42',  time: 'Yesterday'     },
		{ type: 'change', label: 'Updated profile picture',          detail: 'Safari on iPhone',     ip: '10.0.0.15',     time: 'Yesterday 3:45 PM' },
		{ type: 'action', label: 'Joined workspace "Miosa Core"',    detail: 'Firefox on Windows',   ip: '172.16.0.88',   time: '3 days ago'    },
		{ type: 'change', label: 'Enabled two-factor authentication',detail: 'Chrome on macOS',      ip: '192.168.1.42',  time: '3 days ago'    },
		{ type: 'login',  label: 'Signed in from new device',        detail: 'Firefox on Windows',   ip: '172.16.0.88',   time: '4 days ago'    },
		{ type: 'change', label: 'Changed password',                 detail: 'Chrome on macOS',      ip: '192.168.1.42',  time: '1 week ago'    },
		{ type: 'action', label: 'Connected Google account',         detail: 'Chrome on macOS',      ip: '192.168.1.42',  time: '2 weeks ago'   },
	];

	const filteredActivity = $derived(
		activityFilter === 'all' ? allActivity : allActivity.filter(a => a.type === activityFilter)
	);

	// ── Billing ──────────────────────────────────────────────────────
	const apiCallsUsed  = 84200;
	const apiCallsTotal = 100000;
	const storageUsed   = 38.4;
	const storageTotal  = 50;
	const membersUsed   = 7;
	const membersTotal  = 10;

	// ── Sessions & Security ──────────────────────────────────────────
	let sessions = $state([
		{ id: 1, device: 'MacBook Pro 16"',  browser: 'Chrome 122',   ip: '192.168.1.42', location: 'San Francisco, CA', lastActive: 'Active now',    current: true  },
		{ id: 2, device: 'iPhone 15 Pro',     browser: 'Safari 17',    ip: '10.0.0.15',    location: 'San Francisco, CA', lastActive: '2 hours ago',   current: false },
		{ id: 3, device: 'Windows Desktop',   browser: 'Firefox 123',  ip: '172.16.0.88',  location: 'New York, NY',      lastActive: '4 days ago',    current: false },
	]);

	function revokeSession(id: number) {
		sessions = sessions.filter(s => s.id !== id);
	}

	let apiKeys = $state([
		{ id: 1, name: 'Production API Key',    key: 'sk_live_9x8y7z...mQ4r', created: 'Jan 12, 2026', lastUsed: '2 hours ago'  },
		{ id: 2, name: 'Staging API Key',       key: 'sk_test_3a2b1c...nW7p', created: 'Feb 3, 2026',  lastUsed: '5 days ago'   },
		{ id: 3, name: 'CI/CD Pipeline Key',    key: 'sk_live_7k6j5i...vT9s', created: 'Mar 1, 2026',  lastUsed: '1 day ago'    },
	]);

	function revokeKey(id: number) {
		apiKeys = apiKeys.filter(k => k.id !== id);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Profile & Account</h2>
	<p class="ds-desc">
		Profile headers, account settings forms, notification preferences, activity history,
		billing management, and session security — a full account management surface.
	</p>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 1. Profile Header                                             -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Profile Header</h3>
		<p class="ds-card__sub">Cover photo area, avatar with edit overlay, bio, social links, and edit action</p>
		<div class="ds-demo" style="padding: 0; display: block;">
			<div class="pa-profile-shell">
				<!-- Cover photo -->
				<div class="pa-cover">
					<div class="pa-cover__gradient"></div>
					<button class="btn-glass btn-glass-rounded btn-glass-frosted pa-cover__edit-btn" aria-label="Change cover photo">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
						Change Cover
					</button>
				</div>

				<!-- Avatar + actions row -->
				<div class="pa-profile-top">
					<div class="pa-avatar-wrap">
						<div class="pa-avatar pa-avatar--xl">
							<span class="pa-avatar__initials">JD</span>
						</div>
						<button class="btn-pill btn-pill-primary btn-pill-icon btn-pill-xs pa-avatar__cam-btn" aria-label="Change avatar">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
						</button>
					</div>
					<div class="pa-profile-top__actions">
						<button class="btn-glass btn-glass-rounded btn-glass-light" onclick={() => editingProfile = !editingProfile}>
							{editingProfile ? 'Cancel' : 'Edit Profile'}
						</button>
						{#if editingProfile}
							<button class="btn-glass btn-glass-rounded btn-glass-accent" onclick={() => editingProfile = false}>Save Changes</button>
						{/if}
					</div>
				</div>

				<!-- Profile info -->
				<div class="pa-profile-body">
					<div class="pa-profile-name-row">
						<h4 class="pa-profile-name">Jane Doe</h4>
						<span class="pa-online-badge">Online</span>
					</div>
					<span class="pa-profile-username">@janedoe</span>
					<div class="pa-profile-meta">
						<span class="pa-profile-meta__item">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8L2 7h20z"/></svg>
							Senior Engineer
						</span>
						<span class="pa-profile-meta__dot">&middot;</span>
						<span class="pa-profile-meta__item">Platform Team</span>
						<span class="pa-profile-meta__dot">&middot;</span>
						<span class="pa-profile-meta__item">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
							San Francisco, CA
						</span>
					</div>
					<p class="pa-profile-bio">
						Building developer tools and infrastructure. Passionate about performance optimization
						and clean architecture. Open source contributor &mdash; maintainer of 3 OSS libraries.
					</p>

					<!-- Social links -->
					<div class="pa-social-links">
						<a href="https://github.com/janedoe" class="pa-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
							github.com/janedoe
						</a>
						<a href="https://x.com/janedoe" class="pa-social-link" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
							@janedoe
						</a>
						<a href="https://janedoe.dev" class="pa-social-link" aria-label="Website" target="_blank" rel="noopener noreferrer">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
							janedoe.dev
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 2. Account Settings                                           -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Account Settings</h3>
		<p class="ds-card__sub">Personal info form, password change, two-factor auth, and connected accounts</p>

		<!-- Personal Info -->
		<div class="pa-settings-section">
			<h4 class="pa-settings-section__title">Personal Information</h4>
			<div class="pa-form-row pa-form-row--two">
				<div class="pa-field">
					<label class="pa-field__label" for="pa-firstname">First Name</label>
					<input id="pa-firstname" class="pa-input" type="text" bind:value={firstName} />
				</div>
				<div class="pa-field">
					<label class="pa-field__label" for="pa-lastname">Last Name</label>
					<input id="pa-lastname" class="pa-input" type="text" bind:value={lastName} />
				</div>
			</div>
			<div class="pa-form-row">
				<div class="pa-field">
					<label class="pa-field__label" for="pa-email">Email Address</label>
					<div class="pa-input-wrap">
						<svg class="pa-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
						<input id="pa-email" class="pa-input pa-input--icon" type="email" bind:value={email} />
						<span class="pa-input-badge">Verified</span>
					</div>
				</div>
			</div>
			<div class="pa-form-row">
				<div class="pa-field">
					<label class="pa-field__label" for="pa-phone">Phone Number</label>
					<div class="pa-input-wrap">
						<svg class="pa-input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.83a16 16 0 006.29 6.29l1.25-1.25a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
						<input id="pa-phone" class="pa-input pa-input--icon" type="tel" bind:value={phone} />
					</div>
				</div>
			</div>
			<div class="pa-form-actions">
				<button class="btn-rounded btn-rounded-primary">Save Personal Info</button>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- Password Change -->
		<div class="pa-settings-section">
			<h4 class="pa-settings-section__title">Change Password</h4>
			<div class="pa-form-row">
				<div class="pa-field">
					<label class="pa-field__label" for="pa-cur-pw">Current Password</label>
					<div class="pa-input-wrap">
						<input id="pa-cur-pw" class="pa-input pa-input--pw" type={showCurrentPw ? 'text' : 'password'} bind:value={currentPassword} placeholder="Enter current password" />
						<button class="pa-pw-toggle" onclick={() => showCurrentPw = !showCurrentPw} aria-label="Toggle password visibility" type="button">
							{#if showCurrentPw}
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
							{:else}
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
							{/if}
						</button>
					</div>
				</div>
			</div>
			<div class="pa-form-row pa-form-row--two">
				<div class="pa-field">
					<label class="pa-field__label" for="pa-new-pw">New Password</label>
					<div class="pa-input-wrap">
						<input id="pa-new-pw" class="pa-input pa-input--pw" type={showNewPw ? 'text' : 'password'} bind:value={newPassword} placeholder="8+ characters" />
						<button class="pa-pw-toggle" onclick={() => showNewPw = !showNewPw} aria-label="Toggle new password" type="button">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
						</button>
					</div>
					{#if newPassword.length > 0}
						<div class="pa-strength-bar">
							{#each [1,2,3,4] as seg}
								<div class="pa-strength-bar__seg" style="background: {seg <= passwordStrength ? passwordStrengthColor : 'var(--dbd)'}"></div>
							{/each}
							<span class="pa-strength-bar__label" style="color: {passwordStrengthColor}">{passwordStrengthLabel}</span>
						</div>
					{/if}
				</div>
				<div class="pa-field">
					<label class="pa-field__label" for="pa-confirm-pw">Confirm New Password</label>
					<div class="pa-input-wrap">
						<input id="pa-confirm-pw" class="pa-input pa-input--pw" class:pa-input--valid={passwordsMatch} type={showConfirmPw ? 'text' : 'password'} bind:value={confirmPassword} placeholder="Repeat new password" />
						<button class="pa-pw-toggle" onclick={() => showConfirmPw = !showConfirmPw} aria-label="Toggle confirm password" type="button">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
						</button>
						{#if passwordsMatch}
							<svg class="pa-input-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						{/if}
					</div>
				</div>
			</div>
			<div class="pa-form-actions">
				<button class="btn-rounded btn-rounded-primary" disabled={!currentPassword || !passwordsMatch}>Update Password</button>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- Two-Factor Auth -->
		<div class="pa-settings-section">
			<div class="pa-tfa-header">
				<div>
					<h4 class="pa-settings-section__title" style="margin-bottom: 0.25rem;">Two-Factor Authentication</h4>
					<p class="pa-settings-section__desc">Add an extra layer of security. Requires an authenticator app.</p>
				</div>
				<label class="pa-toggle" aria-label="Toggle two-factor authentication">
					<input type="checkbox" class="pa-toggle__input" bind:checked={twoFactorEnabled} onchange={() => { if (twoFactorEnabled) showQR = true; else showQR = false; }} />
					<span class="pa-toggle__track">
						<span class="pa-toggle__thumb"></span>
					</span>
				</label>
			</div>
			{#if twoFactorEnabled}
				<div class="pa-tfa-status">
					<div class="pa-tfa-status__icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					</div>
					<span class="pa-tfa-status__text">2FA is active &mdash; authenticator app configured</span>
					<button class="btn-compact btn-compact-ghost" onclick={() => showQR = !showQR}>
						{showQR ? 'Hide QR' : 'View Setup'}
					</button>
				</div>
				{#if showQR}
					<div class="pa-qr-section">
						<div class="pa-qr-code" aria-label="QR code placeholder">
							<div class="pa-qr-code__inner">
								{#each Array(25) as _, i}
									<div class="pa-qr-cell" style="background: {Math.random() > 0.45 ? 'var(--dt)' : 'transparent'}"></div>
								{/each}
							</div>
						</div>
						<div class="pa-qr-instructions">
							<p class="pa-qr-instructions__title">Scan with your authenticator app</p>
							<p class="pa-qr-instructions__sub">Or enter this code manually:</p>
							<code class="pa-qr-code-text">JBSW Y3DP EHPK 3PXP</code>
							<p class="pa-qr-instructions__sub" style="margin-top: 0.75rem;">Backup codes:</p>
							<div class="pa-backup-codes">
								{#each ['8f3a-2b1c', 'x7d9-4e5f', '1k2j-9m8n', 'p5q4-r3s2'] as code}
									<code class="pa-backup-code">{code}</code>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>

		<div class="pa-section-divider"></div>

		<!-- Connected Accounts -->
		<div class="pa-settings-section">
			<h4 class="pa-settings-section__title">Connected Accounts</h4>
			<div class="pa-connected-list">
				<div class="pa-connected-item">
					<div class="pa-connected-item__icon pa-connected-item__icon--google">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
					</div>
					<div class="pa-connected-item__info">
						<span class="pa-connected-item__name">Google</span>
						<span class="pa-connected-item__detail">jane.doe@gmail.com</span>
					</div>
					<button class="btn-rounded btn-rounded-danger btn-rounded-sm">Disconnect</button>
				</div>
				<div class="pa-connected-item">
					<div class="pa-connected-item__icon pa-connected-item__icon--github">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
					</div>
					<div class="pa-connected-item__info">
						<span class="pa-connected-item__name">GitHub</span>
						<span class="pa-connected-item__detail">janedoe &mdash; 42 repos</span>
					</div>
					<button class="btn-rounded btn-rounded-danger btn-rounded-sm">Disconnect</button>
				</div>
				<div class="pa-connected-item pa-connected-item--inactive">
					<div class="pa-connected-item__icon pa-connected-item__icon--slack">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" fill="#4A154B"/></svg>
					</div>
					<div class="pa-connected-item__info">
						<span class="pa-connected-item__name">Slack</span>
						<span class="pa-connected-item__detail--muted">Not connected</span>
					</div>
					<button class="btn-rounded btn-rounded-ghost btn-rounded-sm">Connect</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 3. Notification Preferences                                   -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Preferences</h3>
		<p class="ds-card__sub">Grouped toggle matrix for email, push, and in-app notifications with DND schedule</p>

		<!-- Email -->
		<div class="pa-notif-group">
			<div class="pa-notif-group__header">
				<div class="pa-notif-group__icon pa-notif-group__icon--email">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
				</div>
				<div>
					<span class="pa-notif-group__title">Email Notifications</span>
					<span class="pa-notif-group__sub">Delivered to jane.doe@company.com</span>
				</div>
			</div>
			<div class="pa-notif-rows">
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">@Mentions &amp; replies</span>
						<span class="pa-notif-row__desc">When someone mentions you or replies to your comment</span>
					</div>
					<label class="pa-toggle" aria-label="Email mentions">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifEmailMentions} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">Project updates</span>
						<span class="pa-notif-row__desc">Status changes, assignments, and milestones</span>
					</div>
					<label class="pa-toggle" aria-label="Email updates">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifEmailUpdates} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">Weekly digest</span>
						<span class="pa-notif-row__desc">Summary of activity across all your workspaces</span>
					</div>
					<label class="pa-toggle" aria-label="Email digest">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifEmailDigest} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- Push -->
		<div class="pa-notif-group">
			<div class="pa-notif-group__header">
				<div class="pa-notif-group__icon pa-notif-group__icon--push">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
				</div>
				<div>
					<span class="pa-notif-group__title">Push Notifications</span>
					<span class="pa-notif-group__sub">Browser &amp; mobile alerts</span>
				</div>
			</div>
			<div class="pa-notif-rows">
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">Direct messages</span>
						<span class="pa-notif-row__desc">Instant alerts for new messages sent to you</span>
					</div>
					<label class="pa-toggle" aria-label="Push messages">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifPushMessages} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">Reminders &amp; deadlines</span>
						<span class="pa-notif-row__desc">Task due dates and calendar reminders</span>
					</div>
					<label class="pa-toggle" aria-label="Push reminders">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifPushReminders} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">Product announcements</span>
						<span class="pa-notif-row__desc">New features, updates, and tips</span>
					</div>
					<label class="pa-toggle" aria-label="Push marketing">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifPushMarketing} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- In-app -->
		<div class="pa-notif-group">
			<div class="pa-notif-group__header">
				<div class="pa-notif-group__icon pa-notif-group__icon--inapp">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
				</div>
				<div>
					<span class="pa-notif-group__title">In-App Notifications</span>
					<span class="pa-notif-group__sub">Shown in the notification center</span>
				</div>
			</div>
			<div class="pa-notif-rows">
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">All activity</span>
						<span class="pa-notif-row__desc">Every update, comment, and system event</span>
					</div>
					<label class="pa-toggle" aria-label="In-app all">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifInAppAll} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
				<div class="pa-notif-row">
					<div class="pa-notif-row__text">
						<span class="pa-notif-row__label">Notification sounds</span>
						<span class="pa-notif-row__desc">Play audio cue when a notification arrives</span>
					</div>
					<label class="pa-toggle" aria-label="In-app sound">
						<input type="checkbox" class="pa-toggle__input" bind:checked={notifInAppSound} />
						<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
					</label>
				</div>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- DND -->
		<div class="pa-dnd-section">
			<div class="pa-dnd-header">
				<div class="pa-notif-group__icon pa-notif-group__icon--dnd">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
				</div>
				<div>
					<span class="pa-notif-group__title">Do Not Disturb</span>
					<span class="pa-notif-group__sub">Mute all notifications during set hours</span>
				</div>
				<label class="pa-toggle" style="margin-left: auto;" aria-label="Do not disturb">
					<input type="checkbox" class="pa-toggle__input" bind:checked={dndEnabled} />
					<span class="pa-toggle__track"><span class="pa-toggle__thumb"></span></span>
				</label>
			</div>
			{#if dndEnabled}
				<div class="pa-dnd-schedule">
					<div class="pa-dnd-schedule__row">
						<label class="pa-field__label" for="pa-dnd-from">From</label>
						<input id="pa-dnd-from" class="pa-input pa-input--time" type="time" bind:value={dndFrom} />
					</div>
					<span class="pa-dnd-schedule__sep">to</span>
					<div class="pa-dnd-schedule__row">
						<label class="pa-field__label" for="pa-dnd-until">Until</label>
						<input id="pa-dnd-until" class="pa-input pa-input--time" type="time" bind:value={dndUntil} />
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 4. Activity History                                           -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Activity History</h3>
		<p class="ds-card__sub">Timeline of user actions with type icons and filterable view</p>

		<div class="pa-activity-filters">
			{#each [
				{ key: 'all',    label: 'All',     count: allActivity.length },
				{ key: 'login',  label: 'Logins',  count: allActivity.filter(a => a.type === 'login').length },
				{ key: 'change', label: 'Changes', count: allActivity.filter(a => a.type === 'change').length },
				{ key: 'action', label: 'Actions', count: allActivity.filter(a => a.type === 'action').length },
			] as f}
				<button
					class="btn-pill"
					class:btn-pill-primary={activityFilter === f.key}
					class:btn-pill-ghost={activityFilter !== f.key}
					onclick={() => activityFilter = f.key as typeof activityFilter}
				>
					{f.label}
					<span class="pa-filter-btn__count">{f.count}</span>
				</button>
			{/each}
		</div>

		<div class="pa-timeline">
			{#each filteredActivity as item, i}
				<div class="pa-timeline-item">
					<div class="pa-timeline-track">
						<div class="pa-timeline-dot pa-timeline-dot--{item.type}">
							{#if item.type === 'login'}
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
							{:else if item.type === 'change'}
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
							{:else}
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							{/if}
						</div>
						{#if i < filteredActivity.length - 1}
							<div class="pa-timeline-line"></div>
						{/if}
					</div>
					<div class="pa-timeline-content">
						<div class="pa-timeline-content__header">
							<span class="pa-timeline-content__action">{item.label}</span>
							<span class="pa-timeline-content__time">{item.time}</span>
						</div>
						<div class="pa-timeline-content__detail">
							<span>{item.detail}</span>
							<span class="pa-timeline-content__dot">&middot;</span>
							<span class="pa-timeline-content__ip">{item.ip}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="pa-activity-footer">
			<button class="btn-rounded btn-rounded-ghost">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
				Export Activity Log
			</button>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 5. Billing & Subscription                                     -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Billing &amp; Subscription</h3>
		<p class="ds-card__sub">Current plan, usage meters, payment method, and billing history</p>

		<!-- Current plan banner -->
		<div class="pa-plan-banner">
			<div class="pa-plan-banner__left">
				<span class="pa-plan-banner__badge">Current Plan</span>
				<div class="pa-plan-banner__name-row">
					<h4 class="pa-plan-banner__name">Pro</h4>
					<span class="pa-plan-banner__chip">Monthly</span>
				</div>
				<span class="pa-plan-banner__renewal">Renews April 15, 2026</span>
			</div>
			<div class="pa-plan-banner__right">
				<div class="pa-plan-banner__price">
					<span class="pa-plan-banner__amount">$29</span>
					<span class="pa-plan-banner__period">/mo</span>
				</div>
				<div class="pa-plan-banner__actions">
					<button class="btn-glass btn-glass-rounded btn-glass-accent">Change Plan</button>
					<button class="btn-glass btn-glass-rounded btn-glass-light">Cancel</button>
				</div>
			</div>
		</div>

		<!-- Usage meters -->
		<h4 class="pa-settings-section__title" style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Usage This Period</h4>
		<div class="pa-usage-grid">
			<div class="pa-usage-meter">
				<div class="pa-usage-meter__header">
					<span class="pa-usage-meter__label">API Calls</span>
					<span class="pa-usage-meter__values">{apiCallsUsed.toLocaleString()} <span class="pa-usage-meter__total">/ {apiCallsTotal.toLocaleString()}</span></span>
				</div>
				<div class="pa-usage-bar">
					<div class="pa-usage-bar__fill pa-usage-bar__fill--warn" style="width: {(apiCallsUsed/apiCallsTotal)*100}%"></div>
				</div>
				<span class="pa-usage-meter__pct">{Math.round((apiCallsUsed/apiCallsTotal)*100)}% used</span>
			</div>
			<div class="pa-usage-meter">
				<div class="pa-usage-meter__header">
					<span class="pa-usage-meter__label">Storage</span>
					<span class="pa-usage-meter__values">{storageUsed} GB <span class="pa-usage-meter__total">/ {storageTotal} GB</span></span>
				</div>
				<div class="pa-usage-bar">
					<div class="pa-usage-bar__fill pa-usage-bar__fill--ok" style="width: {(storageUsed/storageTotal)*100}%"></div>
				</div>
				<span class="pa-usage-meter__pct">{Math.round((storageUsed/storageTotal)*100)}% used</span>
			</div>
			<div class="pa-usage-meter">
				<div class="pa-usage-meter__header">
					<span class="pa-usage-meter__label">Team Members</span>
					<span class="pa-usage-meter__values">{membersUsed} <span class="pa-usage-meter__total">/ {membersTotal}</span></span>
				</div>
				<div class="pa-usage-bar">
					<div class="pa-usage-bar__fill pa-usage-bar__fill--ok" style="width: {(membersUsed/membersTotal)*100}%"></div>
				</div>
				<span class="pa-usage-meter__pct">{membersTotal - membersUsed} seats remaining</span>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- Payment method -->
		<h4 class="pa-settings-section__title" style="margin-bottom: 0.75rem;">Payment Method</h4>
		<div class="pa-payment-method">
			<div class="pa-payment-method__card">
				<div class="pa-payment-method__card-art">
					<div class="pa-payment-method__card-chip"></div>
					<div class="pa-payment-method__card-number">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</div>
					<div class="pa-payment-method__card-bottom">
						<div>
							<div class="pa-payment-method__card-label">Card Holder</div>
							<div class="pa-payment-method__card-value">Jane Doe</div>
						</div>
						<div>
							<div class="pa-payment-method__card-label">Expires</div>
							<div class="pa-payment-method__card-value">08/27</div>
						</div>
						<div class="pa-payment-method__visa">VISA</div>
					</div>
				</div>
			</div>
			<div class="pa-payment-method__actions">
				<button class="btn-rounded btn-rounded-ghost">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
					Edit
				</button>
				<button class="btn-rounded btn-rounded-ghost">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
					Add Method
				</button>
			</div>
		</div>

		<div class="pa-section-divider"></div>

		<!-- Invoice history -->
		<h4 class="pa-settings-section__title" style="margin-bottom: 0.75rem;">Invoice History</h4>
		<div class="pa-table-wrap">
			<table class="pa-table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Amount</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each [
						{ date: 'Mar 1, 2026', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'paid' },
						{ date: 'Feb 1, 2026', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'paid' },
						{ date: 'Jan 1, 2026', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'paid' },
						{ date: 'Dec 1, 2025', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'paid' },
						{ date: 'Nov 1, 2025', desc: 'Pro Plan — Monthly', amount: '$29.00', status: 'refunded' },
					] as inv}
						<tr>
							<td class="pa-table__date">{inv.date}</td>
							<td>{inv.desc}</td>
							<td class="pa-table__mono">{inv.amount}</td>
							<td>
								<span class="pa-badge pa-badge--{inv.status}">{inv.status === 'paid' ? 'Paid' : 'Refunded'}</span>
							</td>
							<td>
								<button class="btn-compact btn-compact-ghost">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
									PDF
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 6. Sessions & Security                                        -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sessions &amp; Security</h3>
		<p class="ds-card__sub">Active sessions with device info, login history, and API key management</p>

		<!-- Active sessions -->
		<h4 class="pa-settings-section__title" style="margin-bottom: 0.75rem;">Active Sessions</h4>
		<div class="pa-sessions-list">
			{#each sessions as session (session.id)}
				<div class="pa-session-item" class:pa-session-item--current={session.current}>
					<div class="pa-session-item__icon">
						{#if session.device.includes('iPhone') || session.device.includes('Android')}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
						{:else if session.device.includes('Windows')}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
						{:else}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8M12 18v2"/></svg>
						{/if}
					</div>
					<div class="pa-session-item__info">
						<div class="pa-session-item__name-row">
							<span class="pa-session-item__device">{session.device}</span>
							{#if session.current}
								<span class="pa-session-item__current-chip">This device</span>
							{/if}
						</div>
						<div class="pa-session-item__meta">
							<span>{session.browser}</span>
							<span class="pa-timeline-content__dot">&middot;</span>
							<span>{session.location}</span>
							<span class="pa-timeline-content__dot">&middot;</span>
							<span class="pa-session-item__ip">{session.ip}</span>
						</div>
						<div class="pa-session-item__last">
							<span class="pa-session-item__last-dot" class:pa-session-item__last-dot--active={session.current}></span>
							{session.lastActive}
						</div>
					</div>
					{#if !session.current}
						<button class="btn-rounded btn-rounded-danger btn-rounded-sm" onclick={() => revokeSession(session.id)}>
							Revoke
						</button>
					{/if}
				</div>
			{/each}
		</div>

		<div class="pa-sessions-footer">
			<button class="btn-rounded btn-rounded-danger">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
				Revoke All Other Sessions
			</button>
		</div>

		<div class="pa-section-divider"></div>

		<!-- Login history -->
		<h4 class="pa-settings-section__title" style="margin-bottom: 0.75rem;">Login History</h4>
		<div class="pa-table-wrap">
			<table class="pa-table">
				<thead>
					<tr>
						<th>Date &amp; Time</th>
						<th>Device / Browser</th>
						<th>Location</th>
						<th>IP Address</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>
					{#each [
						{ datetime: 'Mar 6, 2026 09:14',  device: 'Chrome / macOS',   location: 'San Francisco, CA', ip: '192.168.1.42', ok: true  },
						{ datetime: 'Mar 4, 2026 18:32',  device: 'Safari / iPhone',   location: 'San Francisco, CA', ip: '10.0.0.15',    ok: true  },
						{ datetime: 'Mar 2, 2026 11:05',  device: 'Firefox / Windows', location: 'New York, NY',      ip: '172.16.0.88',  ok: true  },
						{ datetime: 'Feb 28, 2026 23:48', device: 'Chrome / macOS',   location: 'Unknown',           ip: '45.33.21.17',  ok: false },
						{ datetime: 'Feb 25, 2026 08:01', device: 'Chrome / macOS',   location: 'San Francisco, CA', ip: '192.168.1.42', ok: true  },
					] as row}
						<tr>
							<td class="pa-table__date">{row.datetime}</td>
							<td>{row.device}</td>
							<td>{row.location}</td>
							<td class="pa-table__mono">{row.ip}</td>
							<td>
								<span class="pa-badge" class:pa-badge--ok={row.ok} class:pa-badge--fail={!row.ok}>
									{row.ok ? 'Success' : 'Failed'}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="pa-section-divider"></div>

		<!-- API Keys -->
		<div class="pa-apikeys-header">
			<h4 class="pa-settings-section__title" style="margin-bottom: 0;">API Keys</h4>
			<button class="btn-rounded btn-rounded-primary btn-rounded-sm">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
				Generate Key
			</button>
		</div>
		<div class="pa-apikeys-list">
			{#each apiKeys as key (key.id)}
				<div class="pa-apikey-item">
					<div class="pa-apikey-item__icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
					</div>
					<div class="pa-apikey-item__info">
						<span class="pa-apikey-item__name">{key.name}</span>
						<code class="pa-apikey-item__key">{key.key}</code>
						<div class="pa-apikey-item__meta">
							Created {key.created} &middot; Last used {key.lastUsed}
						</div>
					</div>
					<div class="pa-apikey-item__actions">
						<button class="btn-compact btn-compact-ghost">Copy</button>
						<button class="btn-rounded btn-rounded-danger btn-rounded-sm" onclick={() => revokeKey(key.id)}>Revoke</button>
					</div>
				</div>
			{/each}
			{#if apiKeys.length === 0}
				<div class="pa-apikeys-empty">All API keys have been revoked.</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* ════════════════════════════════════════════════════════════════
	   PROFILE HEADER
	════════════════════════════════════════════════════════════════ */
	.pa-profile-shell {
		background: var(--dbg2);
		border-radius: 0.75rem;
		overflow: hidden;
		border: 1px solid var(--dbd);
	}

	.pa-cover {
		position: relative;
		height: 128px;
		background: linear-gradient(135deg, #1e1b3a 0%, #0f172a 40%, #1a1a2e 70%, #16213e 100%);
		overflow: hidden;
	}

	.pa-cover__gradient {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 60% 80% at 20% 50%, rgba(99, 102, 241, 0.25) 0%, transparent 70%),
			radial-gradient(ellipse 40% 60% at 75% 30%, rgba(139, 92, 246, 0.18) 0%, transparent 60%);
	}

	.pa-cover__edit-btn {
		position: absolute;
		bottom: 10px;
		right: 12px;
	}

	.pa-profile-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0 1.5rem 0;
		margin-top: -40px;
	}

	.pa-avatar-wrap {
		position: relative;
		flex-shrink: 0;
	}

	.pa-avatar {
		border-radius: 50%;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid var(--dbg2);
	}

	.pa-avatar--xl {
		width: 88px;
		height: 88px;
	}

	.pa-avatar__initials {
		color: #fff;
		font-size: 1.75rem;
		font-weight: 700;
		letter-spacing: 0.03em;
	}

	.pa-avatar__cam-btn {
		position: absolute;
		bottom: 2px;
		right: 2px;
	}

	.pa-profile-top__actions {
		display: flex;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
	}

	.pa-profile-body {
		padding: 0.75rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.pa-profile-name-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-top: 0.25rem;
	}

	.pa-profile-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--dt);
		margin: 0;
	}

	.pa-online-badge {
		font-size: 0.6875rem;
		font-weight: 700;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		background: rgba(34, 197, 94, 0.15);
		color: #22c55e;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pa-profile-username {
		font-size: 0.875rem;
		color: var(--dt3);
	}

	.pa-profile-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--dt2);
		flex-wrap: wrap;
	}

	.pa-profile-meta__item {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	.pa-profile-meta__dot {
		color: var(--dt4);
	}

	.pa-profile-bio {
		font-size: 0.875rem;
		color: var(--dt2);
		line-height: 1.6;
		max-width: 520px;
		margin-top: 0.25rem;
	}

	.pa-social-links {
		display: flex;
		gap: 1rem;
		margin-top: 0.375rem;
		flex-wrap: wrap;
	}

	.pa-social-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--dt3);
		text-decoration: none;
		transition: color 0.15s;
	}

	.pa-social-link:hover {
		color: #6366f1;
	}

	/* ════════════════════════════════════════════════════════════════
	   SETTINGS SECTIONS
	════════════════════════════════════════════════════════════════ */
	.pa-settings-section {
		padding: 1.25rem 0 0.25rem;
	}

	.pa-settings-section__title {
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		margin: 0 0 1rem;
	}

	.pa-settings-section__desc {
		font-size: 0.8125rem;
		color: var(--dt3);
		display: block;
		margin-top: 0.125rem;
	}

	.pa-section-divider {
		height: 1px;
		background: var(--dbd);
		margin: 1.25rem 0 0;
	}

	/* ════════════════════════════════════════════════════════════════
	   FORM FIELDS
	════════════════════════════════════════════════════════════════ */
	.pa-form-row {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.pa-form-row--two {
		flex-direction: row;
	}

	.pa-form-row--two .pa-field {
		flex: 1;
	}

	.pa-field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.pa-field__label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--dt2);
	}

	.pa-input-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.pa-input {
		width: 100%;
		padding: 0.5625rem 0.875rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		color: var(--dt);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}

	.pa-input:focus {
		border-color: #6366f1;
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
	}

	.pa-input--icon {
		padding-left: 2.25rem;
	}

	.pa-input--pw {
		padding-right: 2.5rem;
	}

	.pa-input--valid {
		border-color: #22c55e;
	}

	.pa-input--time {
		width: 120px;
		padding: 0.4rem 0.75rem;
	}

	.pa-input-icon {
		position: absolute;
		left: 0.75rem;
		color: var(--dt3);
		pointer-events: none;
	}

	.pa-input-badge {
		position: absolute;
		right: 0.625rem;
		font-size: 0.6875rem;
		font-weight: 700;
		color: #22c55e;
		background: rgba(34, 197, 94, 0.12);
		padding: 0.15rem 0.45rem;
		border-radius: 9999px;
	}

	.pa-pw-toggle {
		position: absolute;
		right: 0.625rem;
		background: none;
		border: none;
		color: var(--dt3);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
	}

	.pa-pw-toggle:hover {
		color: var(--dt);
	}

	.pa-input-check {
		position: absolute;
		right: 2.25rem;
		pointer-events: none;
	}

	.pa-strength-bar {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		margin-top: 0.375rem;
	}

	.pa-strength-bar__seg {
		height: 3px;
		flex: 1;
		border-radius: 9999px;
		transition: background 0.2s;
	}

	.pa-strength-bar__label {
		font-size: 0.7rem;
		font-weight: 700;
		width: 42px;
		text-align: right;
		flex-shrink: 0;
	}

	.pa-form-actions {
		margin-top: 0.75rem;
		padding-bottom: 0.5rem;
	}

	/* ════════════════════════════════════════════════════════════════
	   TOGGLE
	════════════════════════════════════════════════════════════════ */
	.pa-toggle {
		position: relative;
		display: inline-block;
		flex-shrink: 0;
		cursor: pointer;
	}

	.pa-toggle__input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.pa-toggle__track {
		display: block;
		width: 40px;
		height: 22px;
		background: var(--dbg3);
		border-radius: 22px;
		border: 1px solid var(--dbd);
		position: relative;
		transition: background 0.2s, border-color 0.2s;
	}

	.pa-toggle__thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 16px;
		height: 16px;
		background: var(--dt3);
		border-radius: 50%;
		transition: transform 0.2s, background 0.2s;
	}

	.pa-toggle__input:checked + .pa-toggle__track {
		background: #6366f1;
		border-color: #6366f1;
	}

	.pa-toggle__input:checked + .pa-toggle__track .pa-toggle__thumb {
		transform: translateX(18px);
		background: #fff;
	}

	/* ════════════════════════════════════════════════════════════════
	   2FA
	════════════════════════════════════════════════════════════════ */
	.pa-tfa-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pa-tfa-status {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: rgba(34, 197, 94, 0.07);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 0.625rem;
		margin-bottom: 0.75rem;
	}

	.pa-tfa-status__icon {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: rgba(34, 197, 94, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.pa-tfa-status__text {
		font-size: 0.875rem;
		color: var(--dt2);
		flex: 1;
	}

	.pa-qr-section {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
		padding: 1rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 0.75rem;
	}

	.pa-qr-code {
		flex-shrink: 0;
		width: 110px;
		height: 110px;
		background: #fff;
		border-radius: 0.5rem;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pa-qr-code__inner {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 2px;
		width: 100%;
		height: 100%;
	}

	.pa-qr-cell {
		border-radius: 1px;
	}

	.pa-qr-instructions {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.pa-qr-instructions__title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
	}

	.pa-qr-instructions__sub {
		font-size: 0.75rem;
		color: var(--dt3);
		margin: 0;
	}

	.pa-qr-code-text {
		font-size: 0.875rem;
		font-family: monospace;
		color: #6366f1;
		background: rgba(99, 102, 241, 0.1);
		padding: 0.25rem 0.625rem;
		border-radius: 0.375rem;
		letter-spacing: 0.1em;
		display: inline-block;
		margin-top: 0.125rem;
	}

	.pa-backup-codes {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 0.25rem;
	}

	.pa-backup-code {
		font-size: 0.75rem;
		font-family: monospace;
		color: var(--dt2);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		padding: 0.2rem 0.5rem;
		border-radius: 0.375rem;
	}

	/* ════════════════════════════════════════════════════════════════
	   CONNECTED ACCOUNTS
	════════════════════════════════════════════════════════════════ */
	.pa-connected-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.pa-connected-item {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 0.875rem 0;
		border-bottom: 1px solid var(--dbd);
	}

	.pa-connected-item:last-child {
		border-bottom: none;
	}

	.pa-connected-item--inactive {
		opacity: 0.65;
	}

	.pa-connected-item__icon {
		width: 36px;
		height: 36px;
		border-radius: 0.5rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.pa-connected-item__icon--google,
	.pa-connected-item__icon--github,
	.pa-connected-item__icon--slack {
		background: var(--dbg3);
	}

	.pa-connected-item__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.pa-connected-item__name {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--dt);
	}

	.pa-connected-item__detail {
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-connected-item__detail--muted {
		font-size: 0.75rem;
		color: var(--dt4);
	}

	/* ════════════════════════════════════════════════════════════════
	   NOTIFICATIONS
	════════════════════════════════════════════════════════════════ */
	.pa-notif-group {
		padding: 0.5rem 0;
	}

	.pa-notif-group__header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.pa-notif-group__icon {
		width: 32px;
		height: 32px;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.pa-notif-group__icon--email  { background: rgba(99, 102, 241, 0.12); color: #6366f1; }
	.pa-notif-group__icon--push   { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
	.pa-notif-group__icon--inapp  { background: rgba(16, 185, 129, 0.12); color: #10b981; }
	.pa-notif-group__icon--dnd    { background: rgba(239, 68, 68, 0.12);  color: #ef4444; }

	.pa-notif-group__title {
		display: block;
		font-size: 0.9375rem;
		font-weight: 700;
		color: var(--dt);
	}

	.pa-notif-group__sub {
		display: block;
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-notif-rows {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding-left: 2.5rem;
	}

	.pa-notif-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--dbd2);
	}

	.pa-notif-row:last-child {
		border-bottom: none;
	}

	.pa-notif-row__text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.pa-notif-row__label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--dt);
	}

	.pa-notif-row__desc {
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-dnd-section {
		padding: 0.5rem 0;
	}

	.pa-dnd-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.pa-dnd-schedule {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1rem;
		padding-left: 2.5rem;
	}

	.pa-dnd-schedule__row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pa-dnd-schedule__sep {
		font-size: 0.8125rem;
		color: var(--dt3);
	}

	/* ════════════════════════════════════════════════════════════════
	   ACTIVITY TIMELINE
	════════════════════════════════════════════════════════════════ */
	.pa-activity-filters {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}

	.pa-filter-btn__count {
		font-size: 0.6875rem;
		background: rgba(255, 255, 255, 0.18);
		border-radius: 9999px;
		padding: 0.05rem 0.4rem;
	}

	.pa-timeline {
		display: flex;
		flex-direction: column;
	}

	.pa-timeline-item {
		display: flex;
		gap: 1rem;
	}

	.pa-timeline-track {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 24px;
		flex-shrink: 0;
	}

	.pa-timeline-dot {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.pa-timeline-dot--login  { background: rgba(59, 130, 246, 0.15);  color: #3b82f6; }
	.pa-timeline-dot--change { background: rgba(245, 158, 11, 0.15);  color: #f59e0b; }
	.pa-timeline-dot--action { background: rgba(34, 197, 94, 0.15);   color: #22c55e; }

	.pa-timeline-line {
		width: 1px;
		flex: 1;
		min-height: 12px;
		background: var(--dbd);
		margin: 2px 0;
	}

	.pa-timeline-content {
		padding: 0.125rem 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}

	.pa-timeline-content__header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.pa-timeline-content__action {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--dt);
	}

	.pa-timeline-content__time {
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-timeline-content__detail {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-timeline-content__dot {
		color: var(--dbd2);
	}

	.pa-timeline-content__ip {
		font-family: monospace;
		font-size: 0.7rem;
	}

	.pa-activity-footer {
		margin-top: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--dbd);
		display: flex;
		justify-content: center;
	}

	/* ════════════════════════════════════════════════════════════════
	   BILLING
	════════════════════════════════════════════════════════════════ */
	.pa-plan-banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 0.875rem;
		padding: 1.25rem 1.5rem;
	}

	.pa-plan-banner__badge {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #6366f1;
	}

	.pa-plan-banner__name-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-top: 0.25rem;
	}

	.pa-plan-banner__name {
		font-size: 1.375rem;
		font-weight: 800;
		color: var(--dt);
		margin: 0;
	}

	.pa-plan-banner__chip {
		font-size: 0.6875rem;
		font-weight: 700;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
	}

	.pa-plan-banner__renewal {
		font-size: 0.75rem;
		color: var(--dt3);
		display: block;
		margin-top: 0.25rem;
	}

	.pa-plan-banner__right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.pa-plan-banner__price {
		text-align: right;
	}

	.pa-plan-banner__amount {
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--dt);
	}

	.pa-plan-banner__period {
		font-size: 0.875rem;
		color: var(--dt3);
	}

	.pa-plan-banner__actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Usage meters */
	.pa-usage-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.pa-usage-meter {
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 0.75rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.pa-usage-meter__header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.pa-usage-meter__label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--dt2);
	}

	.pa-usage-meter__values {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--dt);
	}

	.pa-usage-meter__total {
		font-weight: 400;
		color: var(--dt3);
	}

	.pa-usage-bar {
		height: 6px;
		background: var(--dbg2);
		border-radius: 9999px;
		overflow: hidden;
	}

	.pa-usage-bar__fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	.pa-usage-bar__fill--ok   { background: linear-gradient(90deg, #10b981, #22c55e); }
	.pa-usage-bar__fill--warn { background: linear-gradient(90deg, #f59e0b, #f97316); }
	.pa-usage-bar__fill--crit { background: linear-gradient(90deg, #ef4444, #dc2626); }

	.pa-usage-meter__pct {
		font-size: 0.75rem;
		color: var(--dt3);
	}

	/* Payment method card */
	.pa-payment-method {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		flex-wrap: wrap;
	}

	.pa-payment-method__card {
		width: 220px;
		flex-shrink: 0;
	}

	.pa-payment-method__card-art {
		background: linear-gradient(135deg, #1e2340 0%, #2d3261 50%, #1a1f3a 100%);
		border-radius: 0.875rem;
		padding: 1rem 1.125rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.pa-payment-method__card-chip {
		width: 28px;
		height: 20px;
		background: linear-gradient(135deg, #d4b96a, #c9a84c);
		border-radius: 3px;
	}

	.pa-payment-method__card-number {
		font-size: 0.875rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: 0.12em;
		font-family: monospace;
	}

	.pa-payment-method__card-bottom {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.pa-payment-method__card-label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.45);
		margin-bottom: 0.15rem;
	}

	.pa-payment-method__card-value {
		font-size: 0.75rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
	}

	.pa-payment-method__visa {
		font-size: 1rem;
		font-weight: 900;
		font-style: italic;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.02em;
	}

	.pa-payment-method__actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Table */
	.pa-table-wrap {
		overflow-x: auto;
		margin-top: 0.5rem;
		border: 1px solid var(--dbd);
		border-radius: 0.75rem;
	}

	.pa-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}

	.pa-table th {
		text-align: left;
		padding: 0.625rem 0.875rem;
		font-weight: 700;
		color: var(--dt3);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg3);
	}

	.pa-table th:first-child { border-radius: 0.75rem 0 0 0; }
	.pa-table th:last-child  { border-radius: 0 0.75rem 0 0; }

	.pa-table td {
		padding: 0.75rem 0.875rem;
		color: var(--dt2);
		border-bottom: 1px solid var(--dbd);
	}

	.pa-table tbody tr:last-child td {
		border-bottom: none;
	}

	.pa-table tbody tr:hover td {
		background: var(--dbg3);
	}

	.pa-table__date {
		color: var(--dt3);
		white-space: nowrap;
		font-size: 0.75rem;
	}

	.pa-table__mono {
		font-family: monospace;
		font-size: 0.8125rem;
		color: var(--dt);
	}

	/* Badges */
	.pa-badge {
		display: inline-block;
		font-size: 0.6875rem;
		font-weight: 700;
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.pa-badge--paid     { background: rgba(34, 197, 94, 0.12);   color: #22c55e; }
	.pa-badge--refunded { background: rgba(245, 158, 11, 0.12);  color: #f59e0b; }
	.pa-badge--ok       { background: rgba(34, 197, 94, 0.12);   color: #22c55e; }
	.pa-badge--fail     { background: rgba(239, 68, 68, 0.12);   color: #ef4444; }

	/* ════════════════════════════════════════════════════════════════
	   SESSIONS & SECURITY
	════════════════════════════════════════════════════════════════ */
	.pa-sessions-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.pa-session-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.125rem;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.15s;
	}

	.pa-session-item:last-child {
		border-bottom: none;
	}

	.pa-session-item:hover {
		background: var(--dbg3);
	}

	.pa-session-item--current {
		background: rgba(99, 102, 241, 0.04);
	}

	.pa-session-item__icon {
		width: 38px;
		height: 38px;
		border-radius: 0.625rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2);
		flex-shrink: 0;
	}

	.pa-session-item__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.pa-session-item__name-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.pa-session-item__device {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--dt);
	}

	.pa-session-item__current-chip {
		font-size: 0.65rem;
		font-weight: 700;
		background: rgba(99, 102, 241, 0.15);
		color: #6366f1;
		padding: 0.1rem 0.45rem;
		border-radius: 9999px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pa-session-item__meta {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-session-item__ip {
		font-family: monospace;
		font-size: 0.7rem;
	}

	.pa-session-item__last {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.pa-session-item__last-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--dt4);
	}

	.pa-session-item__last-dot--active {
		background: #22c55e;
		box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
	}

	.pa-sessions-footer {
		margin-top: 0.875rem;
		display: flex;
		justify-content: flex-end;
	}

	/* API Keys */
	.pa-apikeys-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.875rem;
	}

	.pa-apikeys-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.pa-apikey-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.125rem;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.15s;
	}

	.pa-apikey-item:last-child {
		border-bottom: none;
	}

	.pa-apikey-item:hover {
		background: var(--dbg3);
	}

	.pa-apikey-item__icon {
		width: 36px;
		height: 36px;
		border-radius: 0.625rem;
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6366f1;
		flex-shrink: 0;
	}

	.pa-apikey-item__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.pa-apikey-item__name {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--dt);
	}

	.pa-apikey-item__key {
		font-family: monospace;
		font-size: 0.8125rem;
		color: var(--dt3);
		background: var(--dbg3);
		padding: 0.15rem 0.5rem;
		border-radius: 0.375rem;
		display: inline-block;
		width: fit-content;
	}

	.pa-apikey-item__meta {
		font-size: 0.75rem;
		color: var(--dt4);
	}

	.pa-apikey-item__actions {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.pa-apikeys-empty {
		padding: 1.5rem;
		text-align: center;
		font-size: 0.875rem;
		color: var(--dt3);
	}
</style>
