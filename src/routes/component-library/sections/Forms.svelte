<script lang="ts">
	import { Button, Input } from '$lib/ui';

	let inlineEditActive = $state(false);
	let inlineEditValue = $state('Pedro Alvarez');
	let activeFilter = $state('All');
	let activeTheme = $state('System');

	const filters = ['All', 'Active', 'Archived'];
	const themes = ['Light', 'Dark', 'System'];
</script>

<section class="ds-section">
	<h2 class="ds-title">Forms</h2>
	<p class="ds-desc">Real-world form patterns that combine inputs, buttons, and layout to create complete UI flows.</p>

	<!-- ═══ LOGIN FORM ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Login Form</h3>
		<p class="ds-card__sub">Standard sign-in with email/password and social auth fallback</p>
		<div class="ds-demo" style="justify-content: center;">
			<div style="width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 32px; background: #fff;">
				<div style="margin-bottom: 24px;">
					<h4 style="margin: 0 0 4px; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Sign in</h4>
					<p style="margin: 0; font-size: 13px; color: #888;">Enter your credentials to continue</p>
				</div>

				<div style="display: flex; flex-direction: column; gap: 12px;">
					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">EMAIL</label>
						<Input placeholder="you@example.com" type="email" />
					</div>
					<div style="display: flex; flex-direction: column; gap: 5px;">
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">PASSWORD</label>
							<a href="#" style="font-size: 12px; color: #666; text-decoration: none;" onclick={(e) => e.preventDefault()}>Forgot password?</a>
						</div>
						<Input placeholder="••••••••" type="password" />
					</div>
				</div>

				<button class="btn-pill btn-pill-primary btn-pill-block" style="margin-top: 20px;">
					Sign in
				</button>

				<div style="display: flex; align-items: center; gap: 12px; margin: 16px 0;">
					<div style="flex: 1; height: 1px; background: rgba(0,0,0,0.08);"></div>
					<span style="font-size: 11px; color: #bbb; letter-spacing: 0.04em; text-transform: uppercase;">or</span>
					<div style="flex: 1; height: 1px; background: rgba(0,0,0,0.08);"></div>
				</div>

				<button class="btn-pill btn-pill-outline btn-pill-block" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
					<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
					</svg>
					Sign in with Google
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ REGISTRATION FORM ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Registration Form</h3>
		<p class="ds-card__sub">Account creation with validation states visible</p>
		<div class="ds-demo" style="justify-content: center;">
			<div style="width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 32px; background: #fff;">
				<div style="margin-bottom: 24px;">
					<h4 style="margin: 0 0 4px; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Create account</h4>
					<p style="margin: 0; font-size: 13px; color: #888;">Get started with BusinessOS today</p>
				</div>

				<div style="display: flex; flex-direction: column; gap: 12px;">
					<!-- Name — valid -->
					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">FULL NAME</label>
						<div style="position: relative;">
							<Input placeholder="Jane Smith" value="Jane Smith" />
							<svg style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #22c55e;" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
						</div>
					</div>

					<!-- Email — valid -->
					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">EMAIL</label>
						<div style="position: relative;">
							<Input placeholder="you@example.com" value="jane@example.com" />
							<svg style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #22c55e;" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
						</div>
					</div>

					<!-- Password — invalid -->
					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">PASSWORD</label>
						<div style="position: relative;">
							<div style="border: 1px solid #ef4444; border-radius: 8px; overflow: hidden;">
								<Input placeholder="Min. 8 characters" value="abc" type="password" />
							</div>
							<svg style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #ef4444;" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						</div>
						<p style="margin: 0; font-size: 12px; color: #ef4444;">Password must be at least 8 characters</p>
					</div>

					<!-- Confirm password — empty -->
					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">CONFIRM PASSWORD</label>
						<Input placeholder="Repeat password" type="password" />
					</div>

					<!-- Terms checkbox -->
					<label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 2px 0;">
						<input type="checkbox" checked style="margin-top: 2px; width: 15px; height: 15px; cursor: pointer; accent-color: #111;" />
						<span style="font-size: 13px; color: #555; line-height: 1.5;">
							I agree to the <a href="#" style="color: #111; font-weight: 600; text-decoration: underline;" onclick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#" style="color: #111; font-weight: 600; text-decoration: underline;" onclick={(e) => e.preventDefault()}>Privacy Policy</a>
						</span>
					</label>
				</div>

				<button class="btn-pill btn-pill-primary btn-pill-block btn-pill-lg" style="margin-top: 20px;">
					Create Account
				</button>

				<p style="margin: 16px 0 0; text-align: center; font-size: 13px; color: #888;">
					Already have an account? <a href="#" style="color: #111; font-weight: 600; text-decoration: none;" onclick={(e) => e.preventDefault()}>Sign in</a>
				</p>
			</div>
		</div>
	</div>

	<!-- ═══ SETTINGS FORM ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Settings Form</h3>
		<p class="ds-card__sub">Profile settings panel with text inputs, textarea, and segmented controls</p>
		<div class="ds-demo" style="justify-content: center;">
			<div style="width: 100%; max-width: 540px; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; background: #fff; overflow: hidden;">
				<!-- Panel header -->
				<div style="padding: 20px 24px; border-bottom: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: space-between;">
					<div>
						<h4 style="margin: 0; font-size: 15px; font-weight: 700;">Profile Settings</h4>
						<p style="margin: 2px 0 0; font-size: 12px; color: #888;">Update your personal information</p>
					</div>
					<span style="font-size: 11px; padding: 3px 8px; background: rgba(0,0,0,0.04); border-radius: 9999px; color: #888; border: 1px solid rgba(0,0,0,0.06);">Unsaved changes</span>
				</div>

				<!-- Fields -->
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
					<div style="display: flex; gap: 12px;">
						<div style="flex: 1; display: flex; flex-direction: column; gap: 5px;">
							<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">DISPLAY NAME</label>
							<Input placeholder="Your name" value="Pedro Alvarez" />
						</div>
						<div style="flex: 1; display: flex; flex-direction: column; gap: 5px;">
							<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">EMAIL</label>
							<Input placeholder="you@example.com" value="pedro@businessos.io" type="email" />
						</div>
					</div>

					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">BIO</label>
						<textarea
							style="width: 100%; min-height: 80px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; padding: 10px 12px; font-size: 13px; font-family: inherit; color: #111; resize: vertical; outline: none; background: #fff; box-sizing: border-box; line-height: 1.5;"
							placeholder="Tell us a little about yourself..."
						>Building AI-powered operating systems. Platform architect at MIOSA.</textarea>
					</div>

					<div style="display: flex; flex-direction: column; gap: 5px;">
						<label style="font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.02em;">THEME</label>
						<div class="btn-pill-group" style="width: fit-content;">
							{#each themes as theme}
								<button
									class="btn-pill {activeTheme === theme ? 'btn-pill-primary' : 'btn-pill-ghost'} btn-pill-sm"
									onclick={() => activeTheme = theme}
								>
									{theme}
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- Footer actions -->
				<div style="padding: 16px 24px; border-top: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: flex-end; gap: 8px; background: rgba(0,0,0,0.015);">
					<button class="btn-rounded btn-rounded-ghost btn-rounded-sm">Cancel</button>
					<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Save Changes</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ SEARCH + FILTER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Search + Filter</h3>
		<p class="ds-card__sub">Search input with filter pill group and sort control</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 12px; max-width: 560px;">
			<!-- Search row -->
			<div style="display: flex; gap: 8px; width: 100%;">
				<div style="flex: 1; position: relative;">
					<svg style="position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #aaa;" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					<div style="padding-left: 24px;">
						<Input placeholder="Search projects..." />
					</div>
				</div>
				<!-- Sort dropdown -->
				<div style="position: relative;">
					<select style="appearance: none; padding: 0 32px 0 12px; height: 100%; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; font-size: 13px; font-family: inherit; background: #fff; color: #333; cursor: pointer; outline: none;">
						<option>Newest first</option>
						<option>Oldest first</option>
						<option>Alphabetical</option>
					</select>
					<svg style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #999;" width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
				</div>
			</div>

			<!-- Filter pills -->
			<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
				<span style="font-size: 12px; color: #999; font-weight: 500;">Filter:</span>
				<div class="btn-pill-group">
					{#each filters as f}
						<button
							class="btn-pill {activeFilter === f ? 'btn-pill-primary' : 'btn-pill-ghost'} btn-pill-xs"
							onclick={() => activeFilter = f}
						>
							{f}
							{#if f === 'Active'}
								<span style="margin-left: 4px; background: {activeFilter === f ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)'}; border-radius: 9999px; padding: 0 5px; font-size: 10px; font-weight: 700;">12</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Mock results -->
			<div style="width: 100%; border: 1px solid rgba(0,0,0,0.07); border-radius: 10px; overflow: hidden;">
				{#each [['Project Alpha', 'Active', '3 members'], ['Design System v2', 'Active', '5 members'], ['Migration Plan', 'Archived', '2 members']] as [name, status, meta]}
					{#if activeFilter === 'All' || activeFilter === status}
						<div style="display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; border-bottom: 1px solid rgba(0,0,0,0.04); font-size: 13px;">
							<div style="display: flex; align-items: center; gap: 10px;">
								<div style="width: 8px; height: 8px; border-radius: 50%; background: {status === 'Active' ? '#22c55e' : '#d1d5db'};"></div>
								<span style="font-weight: 500;">{name}</span>
							</div>
							<span style="color: #aaa;">{meta}</span>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ INLINE EDIT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Inline Edit</h3>
		<p class="ds-card__sub">Edit-in-place pattern — click the field to activate editing</p>
		<div class="ds-demo">
			<div style="border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; background: #fff; min-width: 320px;">
				<p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #aaa; letter-spacing: 0.06em; text-transform: uppercase;">Team Member</p>

				{#if inlineEditActive}
					<div style="display: flex; align-items: center; gap: 8px;">
						<Input value={inlineEditValue} oninput={(e) => inlineEditValue = (e.target as HTMLInputElement).value} autofocus />
						<button
							class="btn-compact btn-compact-primary"
							onclick={() => inlineEditActive = false}
						>Save</button>
						<button
							class="btn-compact btn-compact-ghost"
							onclick={() => { inlineEditValue = 'Pedro Alvarez'; inlineEditActive = false; }}
						>Cancel</button>
					</div>
				{:else}
					<button
						style="display: flex; align-items: center; gap: 8px; background: transparent; border: none; padding: 0; cursor: pointer; font-family: inherit; width: 100%; text-align: left; border-radius: 6px; group: true;"
						onclick={() => inlineEditActive = true}
						aria-label="Edit name"
					>
						<span style="font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #111;">{inlineEditValue}</span>
						<svg style="color: #ccc; opacity: 0; transition: opacity 0.15s;" class="inline-edit-icon" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
					</button>
					<p style="margin: 6px 0 0; font-size: 12px; color: #aaa;">Click the name above to edit</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	button:hover .inline-edit-icon {
		opacity: 1 !important;
	}
</style>
