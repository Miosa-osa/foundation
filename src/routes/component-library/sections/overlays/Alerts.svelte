<script lang="ts">
	let dismissedIds = $state<Set<string>>(new Set());

	function dismiss(id: string) {
		dismissedIds = new Set([...dismissedIds, id]);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Alerts</h2>
	<p class="ds-desc">Contextual feedback messages — info, success, warning, and error variants. Support icons, titles, actions, and dismissal.</p>

	<!-- ═══ VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Variants</h3>
		<p class="ds-card__sub">Four semantic states, each with a colored left-border accent on a dark glass surface</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 520px;">

			<!-- Info -->
			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(59,130,246,0.05);
				border: 1px solid rgba(59,130,246,0.15);
				border-left: 3px solid #3b82f6;
			">
				<svg width="18" height="18" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div>
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">Your session expires in 30 minutes</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5;">Save your work or extend the session to avoid losing unsaved changes.</div>
				</div>
			</div>

			<!-- Success -->
			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(34,197,94,0.05);
				border: 1px solid rgba(34,197,94,0.15);
				border-left: 3px solid #22c55e;
			">
				<svg width="18" height="18" fill="none" stroke="#22c55e" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div>
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">Deployment complete</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5;">Your changes are live. Build took 1m 24s with zero errors.</div>
				</div>
			</div>

			<!-- Warning -->
			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(245,158,11,0.05);
				border: 1px solid rgba(245,158,11,0.15);
				border-left: 3px solid #f59e0b;
			">
				<svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
				</svg>
				<div>
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">API rate limit at 80%</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5;">You've used 8,000 of 10,000 daily requests. Upgrade your plan to avoid service interruption.</div>
				</div>
			</div>

			<!-- Error -->
			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(239,68,68,0.05);
				border: 1px solid rgba(239,68,68,0.15);
				border-left: 3px solid #ef4444;
			">
				<svg width="18" height="18" fill="none" stroke="#ef4444" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div>
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">Connection failed</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5;">Unable to reach the database. Check your network connection and try again.</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ WITH DISMISS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dismissible Alerts</h3>
		<p class="ds-card__sub">Alerts with an X button — dismissed state managed with Svelte 5 <code>$state</code></p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 520px;">
			{#each [
				{ id: 'dismiss-info',    color: '#3b82f6', bg: 'rgba(59,130,246,0.05)',   border: 'rgba(59,130,246,0.15)',  label: 'info',    title: 'New feature available',       desc: 'Try the redesigned project dashboard now live in your account.', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
				{ id: 'dismiss-success', color: '#22c55e', bg: 'rgba(34,197,94,0.05)',    border: 'rgba(34,197,94,0.15)',   label: 'success', title: 'Profile updated',             desc: 'Your account information has been saved successfully.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
				{ id: 'dismiss-warning', color: '#f59e0b', bg: 'rgba(245,158,11,0.05)',   border: 'rgba(245,158,11,0.15)',  label: 'warning', title: 'Unsaved changes',             desc: 'You have unsaved edits. Navigate away and they will be lost.', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
				{ id: 'dismiss-error',   color: '#ef4444', bg: 'rgba(239,68,68,0.05)',    border: 'rgba(239,68,68,0.15)',   label: 'error',   title: 'Payment declined',            desc: 'Your card ending in 4242 was declined. Update your billing info.', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
			] as item}
				{#if !dismissedIds.has(item.id)}
					<div style="
						display: flex; gap: 12px; padding: 14px 16px;
						border-radius: 10px;
						background: {item.bg};
						border: 1px solid {item.border};
						border-left: 3px solid {item.color};
						align-items: flex-start;
					">
						<svg width="18" height="18" fill="none" stroke="{item.color}" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{item.icon}"/>
						</svg>
						<div style="flex: 1; min-width: 0;">
							<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">{item.title}</div>
							<div style="font-size: 13px; color: var(--dt2); line-height: 1.5;">{item.desc}</div>
						</div>
						<button
							onclick={() => dismiss(item.id)}
							aria-label="Dismiss alert"
							style="
								display: flex; align-items: center; justify-content: center;
								width: 20px; height: 20px; flex-shrink: 0;
								border: none; background: transparent; cursor: pointer;
								color: var(--dt4); border-radius: 4px; padding: 0;
								transition: color 0.15s;
							"
						>
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
							</svg>
						</button>
					</div>
				{:else}
					<div style="
						padding: 10px 16px;
						border-radius: 10px;
						border: 1px dashed rgba(0,0,0,0.1);
						font-size: 12px; color: var(--dt4);
						text-align: center;
					">{item.label} alert dismissed</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- ═══ WITH ACTION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Alert with Action</h3>
		<p class="ds-card__sub">Primary CTA or link appended after the description</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 520px;">

			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(59,130,246,0.05);
				border: 1px solid rgba(59,130,246,0.15);
				border-left: 3px solid #3b82f6;
			">
				<svg width="18" height="18" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">Two-factor authentication not enabled</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5; margin-bottom: 10px;">Protect your account with an additional verification step.</div>
					<button class="btn-pill btn-pill-primary btn-pill-xs">Enable 2FA</button>
				</div>
			</div>

			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(245,158,11,0.05);
				border: 1px solid rgba(245,158,11,0.15);
				border-left: 3px solid #f59e0b;
			">
				<svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">Scheduled maintenance this Sunday</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5; margin-bottom: 10px;">Services may be briefly unavailable between 02:00–04:00 UTC on March 9.</div>
					<div style="display: flex; gap: 8px;">
						<button class="btn-pill btn-pill-warning btn-pill-xs">View details</button>
						<button class="btn-pill btn-pill-ghost btn-pill-xs">Remind me</button>
					</div>
				</div>
			</div>

			<div style="
				display: flex; gap: 12px; padding: 14px 16px;
				border-radius: 10px;
				background: rgba(239,68,68,0.05);
				border: 1px solid rgba(239,68,68,0.15);
				border-left: 3px solid #ef4444;
				align-items: flex-start;
			">
				<svg width="18" height="18" fill="none" stroke="#ef4444" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 3px;">Build failed</div>
					<div style="font-size: 13px; color: var(--dt2); line-height: 1.5; margin-bottom: 10px;">3 type errors in <code style="font-size: 12px; background: rgba(0,0,0,0.06); padding: 1px 5px; border-radius: 4px;">src/lib/auth.ts</code>. Fix them to resume deployment.</div>
					<button class="btn-pill btn-pill-danger btn-pill-xs">View errors</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ INLINE / COMPACT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Inline Alerts</h3>
		<p class="ds-card__sub">Compact single-line variants for form validation, tooltips, and tight layouts</p>
		<div style="display: flex; flex-direction: column; gap: 8px; max-width: 480px;">

			{#each [
				{ color: '#3b82f6', bg: 'rgba(59,130,246,0.06)',  border: 'rgba(59,130,246,0.15)',  text: 'Your email address will not be shared.',          icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
				{ color: '#22c55e', bg: 'rgba(34,197,94,0.06)',   border: 'rgba(34,197,94,0.15)',   text: 'Username available.',                              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
				{ color: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.15)',  text: 'Password strength: medium. Consider adding symbols.', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
				{ color: '#ef4444', bg: 'rgba(239,68,68,0.06)',   border: 'rgba(239,68,68,0.15)',   text: 'Email address is required.',                       icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
			] as item}
				<div style="
					display: flex; align-items: center; gap: 8px;
					padding: 8px 12px;
					border-radius: 8px;
					background: {item.bg};
					border: 1px solid {item.border};
					border-left: 2.5px solid {item.color};
				">
					<svg width="14" height="14" fill="none" stroke="{item.color}" viewBox="0 0 24 24" style="flex-shrink: 0;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{item.icon}"/>
					</svg>
					<span style="font-size: 12px; color: var(--dt); line-height: 1.4;">{item.text}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ FILLED VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Filled Variants</h3>
		<p class="ds-card__sub">Higher-contrast filled backgrounds for prominent notices and banners</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 520px;">

			{#each [
				{ color: '#fff', bg: '#2563eb', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'System update scheduled',    desc: 'Maintenance window starts in 2 hours.' },
				{ color: '#fff', bg: '#16a34a', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',              title: 'All systems operational',    desc: 'No incidents reported in the past 24 hours.' },
				{ color: '#fff', bg: '#d97706', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', title: 'Action required',            desc: 'Verify your email to unlock all features.' },
				{ color: '#fff', bg: '#dc2626', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Account suspended',         desc: 'Contact support to restore access.' },
			] as item}
				<div style="
					display: flex; gap: 12px; padding: 14px 16px;
					border-radius: 10px;
					background: {item.bg};
					align-items: flex-start;
				">
					<svg width="18" height="18" fill="none" stroke="{item.color}" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px; opacity: 0.9;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{item.icon}"/>
					</svg>
					<div>
						<div style="font-size: 13px; font-weight: 600; color: {item.color}; margin-bottom: 3px;">{item.title}</div>
						<div style="font-size: 13px; color: {item.color}; opacity: 0.8; line-height: 1.5;">{item.desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ IN CONTEXT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context</h3>
		<p class="ds-card__sub">Alerts composing inside form and settings panels</p>
		<div style="max-width: 480px; display: flex; flex-direction: column; gap: 16px;">

			<!-- Form with inline error -->
			<div style="
				padding: 20px;
				border-radius: 12px;
				border: 1px solid rgba(0,0,0,0.08);
				background: var(--dbg);
				display: flex; flex-direction: column; gap: 14px;
			">
				<div style="font-size: 14px; font-weight: 600; color: var(--dt);">Change password</div>

				<div style="
					display: flex; align-items: center; gap: 8px;
					padding: 8px 12px;
					border-radius: 8px;
					background: rgba(239,68,68,0.05);
					border: 1px solid rgba(239,68,68,0.15);
					border-left: 2.5px solid #ef4444;
				">
					<svg width="14" height="14" fill="none" stroke="#ef4444" viewBox="0 0 24 24" style="flex-shrink: 0;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span style="font-size: 12px; color: var(--dt);">New password must be at least 8 characters.</span>
				</div>

				<div style="display: flex; flex-direction: column; gap: 6px;">
					<label style="font-size: 12px; font-weight: 500; color: var(--dt2);">New password</label>
					<input
						type="password"
						value="pass"
						style="
							padding: 8px 12px; border-radius: 8px;
							border: 1px solid #ef4444;
							background: rgba(239,68,68,0.03);
							font-size: 13px; color: var(--dt);
							outline: none;
						"
					/>
				</div>

				<div style="display: flex; gap: 8px;">
					<button class="btn-pill btn-pill-primary btn-pill-sm">Update password</button>
					<button class="btn-pill btn-pill-ghost btn-pill-sm">Cancel</button>
				</div>
			</div>

			<!-- Settings panel with info notice -->
			<div style="
				padding: 20px;
				border-radius: 12px;
				border: 1px solid rgba(0,0,0,0.08);
				background: var(--dbg);
				display: flex; flex-direction: column; gap: 14px;
			">
				<div style="font-size: 14px; font-weight: 600; color: var(--dt);">Export data</div>
				<div style="font-size: 13px; color: var(--dt2);">Download a copy of all your projects, tasks, and account information.</div>

				<div style="
					display: flex; gap: 10px; padding: 12px 14px;
					border-radius: 8px;
					background: rgba(59,130,246,0.05);
					border: 1px solid rgba(59,130,246,0.15);
					border-left: 3px solid #3b82f6;
				">
					<svg width="16" height="16" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span style="font-size: 12px; color: var(--dt); line-height: 1.5;">Export files are prepared within 24 hours and sent to your registered email address.</span>
				</div>

				<button class="btn-pill btn-pill-outline btn-pill-sm">Request export</button>
			</div>
		</div>
	</div>
</section>
