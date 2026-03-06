<script lang="ts">
	// --- Social Auth Buttons ---
	// (static demo, no state needed)

	// --- Login Form ---
	let loginEmail = $state('');
	let loginPassword = $state('');
	let loginShowPassword = $state(false);

	// --- Sign Up Form ---
	let signupName = $state('');
	let signupEmail = $state('');
	let signupPassword = $state('');
	let signupTerms = $state(false);
	let passwordStrength = $derived((() => {
		const p = signupPassword;
		if (!p) return 0;
		let score = 0;
		if (p.length >= 8) score++;
		if (/[A-Z]/.test(p)) score++;
		if (/[0-9]/.test(p)) score++;
		if (/[^A-Za-z0-9]/.test(p)) score++;
		return score;
	})());
	let passwordStrengthLabel = $derived(
		passwordStrength === 0 ? '' :
		passwordStrength === 1 ? 'Weak' :
		passwordStrength === 2 ? 'Fair' :
		passwordStrength === 3 ? 'Good' : 'Strong'
	);
	let passwordStrengthColor = $derived(
		passwordStrength === 1 ? 'var(--au-strength-weak)' :
		passwordStrength === 2 ? 'var(--au-strength-fair)' :
		passwordStrength === 3 ? 'var(--au-strength-good)' :
		passwordStrength >= 4  ? 'var(--au-strength-strong)' :
		'var(--dbd)'
	);

	// --- Username Claim ---
	let usernameValue = $state('miosa_user');
	let usernameStatus = $derived((() => {
		if (!usernameValue) return 'empty';
		const taken = ['admin', 'miosa', 'support'];
		return taken.includes(usernameValue.toLowerCase()) ? 'taken' : 'available';
	})());

	// --- Invite Code ---
	let inviteCode = $state('');

	// --- Verification Code ---
	let verifyDigits = $state(['', '', '', '', '', '']);
	let resendSeconds = $state(47);
	let resendActive = $state(false);

	function handleVerifyInput(index: number, e: Event) {
		const input = e.target as HTMLInputElement;
		const val = input.value.replace(/\D/g, '').slice(-1);
		verifyDigits = verifyDigits.map((d, i) => i === index ? val : d);
		if (val && index < 5) {
			const next = document.getElementById(`au-verify-${index + 1}`);
			next?.focus();
		}
	}

	function handleVerifyKeydown(index: number, e: KeyboardEvent) {
		if (e.key === 'Backspace' && !verifyDigits[index] && index > 0) {
			const prev = document.getElementById(`au-verify-${index - 1}`);
			prev?.focus();
		}
	}

	function startResend() {
		resendSeconds = 47;
		resendActive = true;
		const iv = setInterval(() => {
			resendSeconds -= 1;
			if (resendSeconds <= 0) {
				resendActive = false;
				clearInterval(iv);
			}
		}, 1000);
	}

	// --- Password Reset ---
	let resetEmail = $state('');
	let resetSent = $state(false);

	// --- In-Context Auth Page ---
	let authTab = $state<'login' | 'signup'>('login');
	let authLoginEmail = $state('');
	let authLoginPassword = $state('');
	let authLoginShowPw = $state(false);
	let authSignupName = $state('');
	let authSignupEmail = $state('');
	let authSignupPassword = $state('');
	let authSignupShowPw = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Auth Patterns</h2>
	<p class="ds-desc">
		Social auth buttons, login and sign-up forms, username claim, invite codes, OTP verification,
		password reset, and a full in-context auth page — all in the dark monochrome glassmorphic design
		system.
	</p>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 1. Social Auth Buttons                                        -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Social Auth Buttons</h3>
		<p class="ds-card__sub">Full-width pill buttons for OAuth provider entry points. 48px tall, border-radius 9999px.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="au-social-stack">
				<!-- Google -->
				<button class="au-social-btn au-social-btn--google" aria-label="Continue with Google">
					<span class="au-social-btn__icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
					</span>
					<span class="au-social-btn__label">Continue with Google</span>
				</button>

				<!-- Apple -->
				<button class="au-social-btn au-social-btn--apple" aria-label="Continue with Apple">
					<span class="au-social-btn__icon" aria-hidden="true">
						<svg width="17" height="20" viewBox="0 0 814 1000" fill="currentColor">
							<path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-47.4-148.2-108.6C80.3 635.9 47.2 490.1 47.2 348.2c0-196.1 127.3-300.2 255.4-300.2 67.3 0 123.4 44.2 165.7 44.2 40.4 0 103.7-47.1 180.5-47.1 28.3 0 130.7 2.6 198.6 99.8zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
						</svg>
					</span>
					<span class="au-social-btn__label">Continue with Apple</span>
				</button>

				<!-- GitHub -->
				<button class="au-social-btn au-social-btn--github" aria-label="Continue with GitHub">
					<span class="au-social-btn__icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
						</svg>
					</span>
					<span class="au-social-btn__label">Continue with GitHub</span>
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 2. Login Form                                                 -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Login Form</h3>
		<p class="ds-card__sub">Email + password with show/hide toggle, OR divider, and social fallback below.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="au-form-shell">
				<div class="au-form-header">
					<h4 class="au-form-title">Sign in</h4>
					<p class="au-form-subtitle">Welcome back — enter your credentials to continue.</p>
				</div>

				<div class="au-field-group">
					<!-- Email -->
					<div class="au-field">
						<label class="au-label" for="lf-email">Email</label>
						<input
							id="lf-email"
							class="au-input"
							type="email"
							placeholder="you@example.com"
							bind:value={loginEmail}
							autocomplete="email"
						/>
					</div>

					<!-- Password with toggle -->
					<div class="au-field">
						<div class="au-field-row">
							<label class="au-label" for="lf-password">Password</label>
							<a
								href="#forgot"
								class="au-link au-link--sm"
								onclick={(e) => e.preventDefault()}
							>Forgot password?</a>
						</div>
						<div class="au-input-wrap">
							<input
								id="lf-password"
								class="au-input au-input--has-suffix"
								type={loginShowPassword ? 'text' : 'password'}
								placeholder="••••••••"
								bind:value={loginPassword}
								autocomplete="current-password"
							/>
							<button
								class="au-input-suffix-btn"
								type="button"
								onclick={() => loginShowPassword = !loginShowPassword}
								aria-label={loginShowPassword ? 'Hide password' : 'Show password'}
							>
								{#if loginShowPassword}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
										<line x1="1" y1="1" x2="23" y2="23"/>
									</svg>
								{:else}
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
										<circle cx="12" cy="12" r="3"/>
									</svg>
								{/if}
							</button>
						</div>
					</div>
				</div>

				<button class="au-btn-primary" type="button">Sign In</button>

				<div class="au-divider"><span>OR</span></div>

				<div class="au-social-mini-stack">
					<button class="au-social-btn au-social-btn--google au-social-btn--sm" aria-label="Continue with Google">
						<span class="au-social-btn__icon" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24">
								<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
								<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
								<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
								<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
							</svg>
						</span>
						<span class="au-social-btn__label">Continue with Google</span>
					</button>
					<button class="au-social-btn au-social-btn--github au-social-btn--sm" aria-label="Continue with GitHub">
						<span class="au-social-btn__icon" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
							</svg>
						</span>
						<span class="au-social-btn__label">Continue with GitHub</span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 3. Sign Up Form                                               -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sign Up Form</h3>
		<p class="ds-card__sub">Name, email, password with live strength indicator, and terms acceptance.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="au-form-shell">
				<div class="au-form-header">
					<h4 class="au-form-title">Create account</h4>
					<p class="au-form-subtitle">Start your journey with MIOSA — free forever.</p>
				</div>

				<div class="au-field-group">
					<div class="au-field">
						<label class="au-label" for="su-name">Full name</label>
						<input
							id="su-name"
							class="au-input"
							type="text"
							placeholder="Alex Johnson"
							bind:value={signupName}
							autocomplete="name"
						/>
					</div>
					<div class="au-field">
						<label class="au-label" for="su-email">Email</label>
						<input
							id="su-email"
							class="au-input"
							type="email"
							placeholder="you@example.com"
							bind:value={signupEmail}
							autocomplete="email"
						/>
					</div>
					<div class="au-field">
						<label class="au-label" for="su-password">Password</label>
						<input
							id="su-password"
							class="au-input"
							type="password"
							placeholder="Create a strong password"
							bind:value={signupPassword}
							autocomplete="new-password"
						/>
						<!-- Strength bar -->
						<div class="au-strength" aria-label="Password strength: {passwordStrengthLabel || 'none'}">
							<div class="au-strength__track">
								{#each [1, 2, 3, 4] as seg}
									<div
										class="au-strength__seg"
										style="background: {passwordStrength >= seg ? passwordStrengthColor : 'var(--dbd)'};"
									></div>
								{/each}
							</div>
							{#if passwordStrengthLabel}
								<span class="au-strength__label" style="color: {passwordStrengthColor};">{passwordStrengthLabel}</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Terms -->
				<label class="au-checkbox-row" for="su-terms">
					<input
						id="su-terms"
						type="checkbox"
						class="au-checkbox"
						bind:checked={signupTerms}
					/>
					<span class="au-checkbox-label">
						I agree to the <a href="#terms" class="au-link" onclick={(e) => e.preventDefault()}>Terms of Service</a>
						and <a href="#privacy" class="au-link" onclick={(e) => e.preventDefault()}>Privacy Policy</a>
					</span>
				</label>

				<button class="au-btn-primary" type="button" disabled={!signupTerms}>
					Create Account
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 4. Username Claim                                             -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Username Claim</h3>
		<p class="ds-card__sub">Real-time availability check with success/error feedback and character guidance. Try "admin" for taken state.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="au-form-shell au-form-shell--narrow">
				<div class="au-form-header">
					<h4 class="au-form-title">Choose your username</h4>
					<p class="au-form-subtitle">This is how others will find and mention you.</p>
				</div>

				<div class="au-field">
					<label class="au-label" for="uc-username">Username</label>
					<div class="au-input-wrap">
						<span class="au-input-prefix" aria-hidden="true">@</span>
						<input
							id="uc-username"
							class="au-input au-input--has-prefix {usernameValue ? (usernameStatus === 'available' ? 'au-input--valid' : 'au-input--error') : ''}"
							type="text"
							placeholder="yourhandle"
							bind:value={usernameValue}
							maxlength={24}
							autocomplete="username"
						/>
					</div>

					<!-- Status message -->
					{#if usernameValue}
						{#if usernameStatus === 'available'}
							<p class="au-field-msg au-field-msg--success" role="status">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
								Username available
							</p>
						{:else}
							<p class="au-field-msg au-field-msg--error" role="alert">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								Already taken
							</p>
						{/if}
					{/if}

					<p class="au-field-hint">
						{usernameValue.length}/24 characters &mdash; letters, numbers, and underscores only.
					</p>
				</div>

				<button
					class="au-btn-primary"
					type="button"
					disabled={!usernameValue || usernameStatus !== 'available'}
				>
					Next
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 5. Invite Code Input                                          -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Invite Code Input</h3>
		<p class="ds-card__sub">Centered large monospace input for access codes with waitlist fallback link.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="au-form-shell au-form-shell--narrow au-form-shell--center">
				<div class="au-form-header" style="text-align: center;">
					<div class="au-invite-icon" aria-hidden="true">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 2H3v16h5l3 3 3-3h7V2z"/>
							<path d="M7 8h10M7 12h6"/>
						</svg>
					</div>
					<h4 class="au-form-title">You're invited</h4>
					<p class="au-form-subtitle">Enter your invite code to get early access.</p>
				</div>

				<div class="au-field">
					<input
						class="au-input au-input--code"
						type="text"
						placeholder="XXXX-XXXX-XXXX"
						bind:value={inviteCode}
						maxlength={14}
						autocomplete="off"
						spellcheck="false"
						aria-label="Invite code"
					/>
				</div>

				<button class="au-btn-primary" type="button" disabled={!inviteCode}>
					Submit Code
				</button>

				<p class="au-form-footer-note">
					Don't have a code?
					<a href="#waitlist" class="au-link" onclick={(e) => e.preventDefault()}>Join the waitlist</a>
				</p>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 6. Verification Code (OTP)                                    -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Verification Code</h3>
		<p class="ds-card__sub">6-digit OTP entry with individual focus boxes, auto-advance, backspace navigation, and resend countdown.</p>
		<div class="ds-demo" style="justify-content: center;">
			<div class="au-form-shell au-form-shell--narrow au-form-shell--center">
				<div class="au-form-header" style="text-align: center;">
					<div class="au-invite-icon" aria-hidden="true">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<rect x="2" y="5" width="20" height="14" rx="2"/>
							<path d="M2 10h20"/>
						</svg>
					</div>
					<h4 class="au-form-title">Check your inbox</h4>
					<p class="au-form-subtitle">We sent a 6-digit code to <strong>alex@example.com</strong></p>
				</div>

				<!-- OTP boxes -->
				<div class="au-otp-row" role="group" aria-label="One-time verification code">
					{#each verifyDigits as digit, i}
						<input
							id="au-verify-{i}"
							class="au-otp-box"
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							maxlength={1}
							value={digit}
							oninput={(e) => handleVerifyInput(i, e)}
							onkeydown={(e) => handleVerifyKeydown(i, e)}
							aria-label="Digit {i + 1} of 6"
							autocomplete={i === 0 ? 'one-time-code' : 'off'}
						/>
					{/each}
				</div>

				<button class="au-btn-primary" type="button" disabled={verifyDigits.some(d => !d)}>
					Verify
				</button>

				<!-- Resend -->
				<p class="au-form-footer-note">
					{#if resendActive}
						Resend code in <span class="au-countdown">{resendSeconds}s</span>
					{:else}
						Didn't receive it?
						<button class="au-link-btn" type="button" onclick={startResend}>Resend code</button>
					{/if}
				</p>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 7. Password Reset                                             -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Password Reset</h3>
		<p class="ds-card__sub">Email entry with "Send Reset Link" CTA, and the post-submit success state.</p>
		<div class="ds-demo" style="justify-content: center; gap: 24px; flex-wrap: wrap; align-items: flex-start;">

			<!-- Input state -->
			<div class="au-form-shell au-form-shell--narrow">
				<div class="au-form-header">
					<h4 class="au-form-title">Reset password</h4>
					<p class="au-form-subtitle">Enter your email and we'll send a reset link.</p>
				</div>
				<div class="au-field">
					<label class="au-label" for="pr-email">Email address</label>
					<input
						id="pr-email"
						class="au-input"
						type="email"
						placeholder="you@example.com"
						bind:value={resetEmail}
						autocomplete="email"
					/>
				</div>
				<button
					class="au-btn-primary"
					type="button"
					onclick={() => { if (resetEmail) resetSent = true; }}
				>
					Send Reset Link
				</button>
				<p class="au-form-footer-note">
					Remembered it?
					<a href="#login" class="au-link" onclick={(e) => e.preventDefault()}>Back to sign in</a>
				</p>
			</div>

			<!-- Success state -->
			<div class="au-form-shell au-form-shell--narrow au-form-shell--center">
				<div class="au-reset-success">
					<div class="au-reset-success__icon" aria-hidden="true">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<rect x="2" y="5" width="20" height="14" rx="2"/>
							<path d="M2 10h20"/>
						</svg>
					</div>
					<h4 class="au-form-title" style="text-align: center;">Check your email</h4>
					<p class="au-form-subtitle" style="text-align: center;">
						We sent a reset link to <strong>{resetEmail || 'your email'}</strong>. Check your inbox and follow the instructions.
					</p>
					<button class="au-btn-ghost" type="button" onclick={() => { resetSent = false; resetEmail = ''; }}>
						Try a different email
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════ -->
	<!-- 8. In-Context: Full Auth Page                                 -->
	<!-- ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Auth Page</h3>
		<p class="ds-card__sub">Full auth page composition — brand at top, tabbed Login/Sign Up, social auth below with divider. Dark glassmorphic card on dark background.</p>
		<div class="ds-demo" style="padding: 0; background: var(--au-page-bg); border-radius: 12px; overflow: hidden; min-height: 600px; align-items: center; justify-content: center;">
			<div class="au-page-shell">
				<!-- Brand -->
				<div class="au-page-brand" aria-label="MIOSA">
					<div class="au-page-brand__mark" aria-hidden="true">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 2L2 7l10 5 10-5-10-5z"/>
							<path d="M2 17l10 5 10-5"/>
							<path d="M2 12l10 5 10-5"/>
						</svg>
					</div>
					<span class="au-page-brand__name">MIOSA</span>
				</div>

				<h2 class="au-page-heading">Welcome to MIOSA</h2>
				<p class="au-page-sub">Your intelligent workspace — sign in or create an account to continue.</p>

				<!-- Glass card -->
				<div class="au-page-card">
					<!-- Tabs -->
					<div class="au-tabs" role="tablist" aria-label="Authentication mode">
						<button
							role="tab"
							aria-selected={authTab === 'login'}
							class="au-tab {authTab === 'login' ? 'au-tab--active' : ''}"
							onclick={() => authTab = 'login'}
						>Sign In</button>
						<button
							role="tab"
							aria-selected={authTab === 'signup'}
							class="au-tab {authTab === 'signup' ? 'au-tab--active' : ''}"
							onclick={() => authTab = 'signup'}
						>Sign Up</button>
					</div>

					<!-- Tab panels -->
					{#if authTab === 'login'}
						<div class="au-tab-panel" role="tabpanel" aria-label="Sign in form">
							<div class="au-field-group">
								<div class="au-field">
									<label class="au-label au-label--dark" for="ap-email">Email</label>
									<input
										id="ap-email"
										class="au-input au-input--dark"
										type="email"
										placeholder="you@example.com"
										bind:value={authLoginEmail}
										autocomplete="email"
									/>
								</div>
								<div class="au-field">
									<div class="au-field-row">
										<label class="au-label au-label--dark" for="ap-password">Password</label>
										<a href="#forgot" class="au-link au-link--sm au-link--muted" onclick={(e) => e.preventDefault()}>Forgot?</a>
									</div>
									<div class="au-input-wrap">
										<input
											id="ap-password"
											class="au-input au-input--dark au-input--has-suffix"
											type={authLoginShowPw ? 'text' : 'password'}
											placeholder="••••••••"
											bind:value={authLoginPassword}
											autocomplete="current-password"
										/>
										<button
											class="au-input-suffix-btn au-input-suffix-btn--dark"
											type="button"
											onclick={() => authLoginShowPw = !authLoginShowPw}
											aria-label={authLoginShowPw ? 'Hide password' : 'Show password'}
										>
											{#if authLoginShowPw}
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
													<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
													<line x1="1" y1="1" x2="23" y2="23"/>
												</svg>
											{:else}
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
													<circle cx="12" cy="12" r="3"/>
												</svg>
											{/if}
										</button>
									</div>
								</div>
							</div>
							<button class="au-btn-primary au-btn-primary--dark" type="button">Sign In</button>
						</div>
					{:else}
						<div class="au-tab-panel" role="tabpanel" aria-label="Sign up form">
							<div class="au-field-group">
								<div class="au-field">
									<label class="au-label au-label--dark" for="ap-su-name">Full name</label>
									<input
										id="ap-su-name"
										class="au-input au-input--dark"
										type="text"
										placeholder="Alex Johnson"
										bind:value={authSignupName}
										autocomplete="name"
									/>
								</div>
								<div class="au-field">
									<label class="au-label au-label--dark" for="ap-su-email">Email</label>
									<input
										id="ap-su-email"
										class="au-input au-input--dark"
										type="email"
										placeholder="you@example.com"
										bind:value={authSignupEmail}
										autocomplete="email"
									/>
								</div>
								<div class="au-field">
									<label class="au-label au-label--dark" for="ap-su-pw">Password</label>
									<div class="au-input-wrap">
										<input
											id="ap-su-pw"
											class="au-input au-input--dark au-input--has-suffix"
											type={authSignupShowPw ? 'text' : 'password'}
											placeholder="Create a strong password"
											bind:value={authSignupPassword}
											autocomplete="new-password"
										/>
										<button
											class="au-input-suffix-btn au-input-suffix-btn--dark"
											type="button"
											onclick={() => authSignupShowPw = !authSignupShowPw}
											aria-label={authSignupShowPw ? 'Hide password' : 'Show password'}
										>
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
												<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
												<circle cx="12" cy="12" r="3"/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<button class="au-btn-primary au-btn-primary--dark" type="button">Create Account</button>
						</div>
					{/if}

					<!-- Divider -->
					<div class="au-divider au-divider--dark"><span>OR CONTINUE WITH</span></div>

					<!-- Social row -->
					<div class="au-social-icon-row">
						<button class="au-social-icon-btn" aria-label="Continue with Google">
							<svg width="18" height="18" viewBox="0 0 24 24">
								<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
								<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
								<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
								<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
							</svg>
						</button>
						<button class="au-social-icon-btn" aria-label="Continue with Apple">
							<svg width="15" height="18" viewBox="0 0 814 1000" fill="currentColor" style="color: var(--au-dark-text);">
								<path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-47.4-148.2-108.6C80.3 635.9 47.2 490.1 47.2 348.2c0-196.1 127.3-300.2 255.4-300.2 67.3 0 123.4 44.2 165.7 44.2 40.4 0 103.7-47.1 180.5-47.1 28.3 0 130.7 2.6 198.6 99.8zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
							</svg>
						</button>
						<button class="au-social-icon-btn" aria-label="Continue with GitHub">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="color: var(--au-dark-text);">
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
							</svg>
						</button>
					</div>

					<p class="au-page-terms">
						By continuing, you agree to our
						<a href="#terms" class="au-link au-link--muted" onclick={(e) => e.preventDefault()}>Terms</a>
						and
						<a href="#privacy" class="au-link au-link--muted" onclick={(e) => e.preventDefault()}>Privacy Policy</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Token aliases for this section ── */
	.ds-section {
		--au-strength-weak:   #ef4444;
		--au-strength-fair:   #f59e0b;
		--au-strength-good:   #84cc16;
		--au-strength-strong: #22c55e;
		--au-page-bg:         #0a0a0a;
		--au-dark-text:       #f0f0f0;
		--au-dark-text2:      #a0a0a0;
		--au-dark-text3:      #606060;
		--au-dark-input-bg:   rgba(255, 255, 255, 0.06);
		--au-dark-input-border: rgba(255, 255, 255, 0.12);
		--au-dark-input-border-focus: rgba(255, 255, 255, 0.3);
		--au-glass-bg:        rgba(255, 255, 255, 0.04);
		--au-glass-border:    rgba(255, 255, 255, 0.1);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  SOCIAL AUTH BUTTONS                                           */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-social-stack {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 360px;
	}

	.au-social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
		height: 48px;
		border-radius: 9999px;
		border: none;
		font-size: 14px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.15s, transform 0.1s;
		letter-spacing: -0.01em;
	}
	.au-social-btn:hover { opacity: 0.88; transform: translateY(-1px); }
	.au-social-btn:active { transform: translateY(0); }

	.au-social-btn--google {
		background: #fff;
		color: #111;
		border: 1.5px solid var(--dbd);
		box-shadow: 0 1px 3px rgba(0,0,0,0.06);
	}
	.au-social-btn--apple {
		background: #111;
		color: #fff;
		border: 1.5px solid #111;
	}
	.au-social-btn--github {
		background: #24292e;
		color: #fff;
		border: 1.5px solid #24292e;
	}

	.au-social-btn--sm {
		height: 42px;
		font-size: 13px;
	}

	.au-social-btn__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.au-social-btn__label {
		flex: 1;
		text-align: center;
	}

	.au-social-mini-stack {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  FORM SHELL                                                    */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-form-shell {
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 28px 28px 24px;
		background: var(--dbg, #fff);
	}

	.au-form-shell--narrow {
		max-width: 340px;
	}

	.au-form-shell--center {
		align-items: center;
		text-align: center;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  FORM HEADER                                                   */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-form-header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.au-form-title {
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--dt);
		margin: 0;
	}

	.au-form-subtitle {
		font-size: 13px;
		color: var(--dt3);
		margin: 0;
		line-height: 1.5;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  FIELD & LABEL                                                 */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-field-group {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.au-field {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.au-field-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.au-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt2);
	}

	.au-label--dark {
		color: var(--au-dark-text2);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  INPUT                                                         */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-input-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.au-input {
		width: 100%;
		height: 42px;
		padding: 0 14px;
		border: 1.5px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg2, transparent);
		color: var(--dt);
		font-size: 14px;
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}
	.au-input::placeholder { color: var(--dt4); }
	.au-input:focus {
		border-color: var(--dt2);
		box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
	}

	.au-input--has-suffix { padding-right: 42px; }
	.au-input--has-prefix { padding-left: 32px; }

	.au-input--valid { border-color: var(--au-strength-strong); }
	.au-input--error { border-color: var(--au-strength-weak); }

	/* Code input */
	.au-input--code {
		text-align: center;
		font-family: 'SF Mono', 'Fira Mono', 'Roboto Mono', monospace;
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.25em;
		height: 52px;
	}

	/* Dark variant */
	.au-input--dark {
		background: var(--au-dark-input-bg);
		border-color: var(--au-dark-input-border);
		color: var(--au-dark-text);
	}
	.au-input--dark::placeholder { color: var(--au-dark-text3); }
	.au-input--dark:focus {
		border-color: var(--au-dark-input-border-focus);
		box-shadow: 0 0 0 3px rgba(255,255,255,0.06);
	}

	/* Prefix @ */
	.au-input-prefix {
		position: absolute;
		left: 14px;
		color: var(--dt3);
		font-size: 14px;
		font-weight: 500;
		pointer-events: none;
		user-select: none;
	}

	/* Suffix toggle */
	.au-input-suffix-btn {
		position: absolute;
		right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		padding: 0;
		border-radius: 4px;
		transition: color 0.12s;
	}
	.au-input-suffix-btn:hover { color: var(--dt); }
	.au-input-suffix-btn--dark { color: var(--au-dark-text3); }
	.au-input-suffix-btn--dark:hover { color: var(--au-dark-text); }

	/* ═══════════════════════════════════════════════════════════════ */
	/*  PASSWORD STRENGTH                                             */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-strength {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 2px;
	}
	.au-strength__track {
		display: flex;
		gap: 4px;
		flex: 1;
	}
	.au-strength__seg {
		flex: 1;
		height: 3px;
		border-radius: 9999px;
		transition: background 0.2s;
	}
	.au-strength__label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.04em;
		transition: color 0.2s;
		min-width: 40px;
		text-align: right;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  CHECKBOX ROW                                                  */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-checkbox-row {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		cursor: pointer;
	}
	.au-checkbox {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		border: 1.5px solid var(--dbd);
		cursor: pointer;
		flex-shrink: 0;
		margin-top: 1px;
		accent-color: var(--dt);
	}
	.au-checkbox-label {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.5;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  FIELD MESSAGES                                                */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-field-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		font-weight: 500;
		margin: 0;
	}
	.au-field-msg--success { color: var(--au-strength-strong); }
	.au-field-msg--error   { color: var(--au-strength-weak); }

	.au-field-hint {
		font-size: 11px;
		color: var(--dt4);
		margin: 0;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  PRIMARY BUTTON                                                */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-btn-primary {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 44px;
		border-radius: 9999px;
		border: none;
		background: var(--dt);
		color: #fff;
		font-size: 14px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		letter-spacing: -0.01em;
		transition: opacity 0.15s, transform 0.1s;
	}
	.au-btn-primary:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
	.au-btn-primary:active:not(:disabled) { transform: translateY(0); }
	.au-btn-primary:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	/* Dark variant — white pill on dark background */
	.au-btn-primary--dark {
		background: #fff;
		color: #111;
	}

	/* Ghost button */
	.au-btn-ghost {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 40px;
		border-radius: 9999px;
		border: 1.5px solid var(--dbd);
		background: transparent;
		color: var(--dt2);
		font-size: 13px;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: border-color 0.15s, color 0.15s;
	}
	.au-btn-ghost:hover { border-color: var(--dt3); color: var(--dt); }

	/* ═══════════════════════════════════════════════════════════════ */
	/*  OR DIVIDER                                                    */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-divider {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.au-divider::before,
	.au-divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--dbd);
	}
	.au-divider span {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt4);
		white-space: nowrap;
	}

	.au-divider--dark::before,
	.au-divider--dark::after {
		background: rgba(255, 255, 255, 0.1);
	}
	.au-divider--dark span {
		color: var(--au-dark-text3);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  LINKS                                                         */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-link {
		color: var(--dt);
		text-decoration: underline;
		text-underline-offset: 2px;
		font-size: inherit;
	}
	.au-link--sm { font-size: 12px; }
	.au-link--muted { color: var(--au-dark-text3); }
	.au-link--muted:hover { color: var(--au-dark-text2); }

	.au-link-btn {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: var(--dt);
		text-decoration: underline;
		text-underline-offset: 2px;
		cursor: pointer;
		font-size: inherit;
	}

	.au-form-footer-note {
		font-size: 13px;
		color: var(--dt3);
		text-align: center;
		margin: 0;
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  INVITE ICON                                                   */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-invite-icon {
		width: 48px;
		height: 48px;
		border-radius: 14px;
		border: 1.5px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2);
		margin: 0 auto 4px;
		background: var(--dbg2, transparent);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  OTP BOXES                                                     */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-otp-row {
		display: flex;
		gap: 8px;
		justify-content: center;
	}

	.au-otp-box {
		width: 44px;
		height: 52px;
		border: 1.5px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg2, transparent);
		color: var(--dt);
		font-size: 22px;
		font-weight: 700;
		font-family: 'SF Mono', 'Fira Mono', 'Roboto Mono', monospace;
		text-align: center;
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		caret-color: transparent;
	}
	.au-otp-box:focus {
		border-color: var(--dt);
		box-shadow: 0 0 0 3px rgba(0,0,0,0.08);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  COUNTDOWN                                                     */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-countdown {
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		color: var(--dt2);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  PASSWORD RESET SUCCESS                                        */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-reset-success {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.au-reset-success__icon {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		border: 1.5px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2);
		background: var(--dbg2, transparent);
	}

	/* ═══════════════════════════════════════════════════════════════ */
	/*  IN-CONTEXT AUTH PAGE                                          */
	/* ═══════════════════════════════════════════════════════════════ */
	.au-page-shell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 48px 24px;
		width: 100%;
		max-width: 420px;
	}

	.au-page-brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.au-page-brand__mark {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: rgba(255,255,255,0.1);
		border: 1px solid rgba(255,255,255,0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.au-page-brand__name {
		font-size: 16px;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #fff;
	}

	.au-page-heading {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: #fff;
		margin: 0;
		text-align: center;
	}

	.au-page-sub {
		font-size: 13px;
		color: var(--au-dark-text2);
		margin: -8px 0 0;
		text-align: center;
		line-height: 1.5;
	}

	/* Glass card */
	.au-page-card {
		width: 100%;
		background: var(--au-glass-bg);
		border: 1px solid var(--au-glass-border);
		border-radius: 20px;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	/* Tabs */
	.au-tabs {
		display: flex;
		background: rgba(255,255,255,0.06);
		border-radius: 10px;
		padding: 3px;
		gap: 2px;
	}

	.au-tab {
		flex: 1;
		height: 34px;
		border: none;
		border-radius: 8px;
		background: transparent;
		color: var(--au-dark-text3);
		font-size: 13px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
		letter-spacing: -0.01em;
	}
	.au-tab:hover { color: var(--au-dark-text2); }
	.au-tab--active {
		background: rgba(255,255,255,0.12);
		color: var(--au-dark-text);
	}

	.au-tab-panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	/* Social icon row */
	.au-social-icon-row {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	.au-social-icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 44px;
		border-radius: 10px;
		border: 1px solid rgba(255,255,255,0.12);
		background: rgba(255,255,255,0.06);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.au-social-icon-btn:hover {
		background: rgba(255,255,255,0.1);
		border-color: rgba(255,255,255,0.2);
	}

	.au-page-terms {
		font-size: 11px;
		color: var(--au-dark-text3);
		text-align: center;
		margin: 0;
		line-height: 1.5;
	}

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .au-btn-primary {
		background: #e5e5e5;
		color: #111;
	}
</style>
