<script lang="ts">
	let showMoreAccount = $state(false);
	let showMoreNotifications = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Dividers & Separators</h2>
	<p class="ds-desc">Horizontal rules, vertical separators, labeled dividers, and full-section breaks. Built entirely from CSS — no wrapper component required.</p>

	<!-- 1. Horizontal Dividers -->
	<div class="ds-card">
		<h3 class="ds-card__title">Horizontal Dividers</h3>
		<p class="ds-card__sub">Three weight variants using <code>var(--dbd)</code></p>

		<div class="divider-weight-demo">
			<div class="divider-weight-row">
				<span class="divider-label-sm">Thin — 1px</span>
				<hr class="div-h div-h--thin" />
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Medium — 2px</span>
				<hr class="div-h div-h--medium" />
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Thick — 4px</span>
				<hr class="div-h div-h--thick" />
			</div>
		</div>
	</div>

	<!-- 2. Divider with Label -->
	<div class="ds-card">
		<h3 class="ds-card__title">Divider with Label</h3>
		<p class="ds-card__sub">Flex + pseudo-element lines flanking centered text</p>

		<div class="divider-labeled-stack">
			<div class="div-labeled">
				<span class="div-labeled__text">OR</span>
			</div>
			<div class="div-labeled">
				<span class="div-labeled__text">Section Title</span>
			</div>
			<div class="div-labeled">
				<span class="div-labeled__text div-labeled__text--muted">Continue with</span>
			</div>
			<div class="div-labeled div-labeled--left">
				<span class="div-labeled__text">Today</span>
			</div>
		</div>
	</div>

	<!-- 3. Vertical Dividers -->
	<div class="ds-card">
		<h3 class="ds-card__title">Vertical Dividers</h3>
		<p class="ds-card__sub">1px vertical separators inside flex rows — 40px tall</p>

		<div class="div-v-row">
			<span class="div-v-item">Dashboard</span>
			<span class="div-v-sep"></span>
			<span class="div-v-item">Projects</span>
			<span class="div-v-sep"></span>
			<span class="div-v-item">Reports</span>
			<span class="div-v-sep"></span>
			<span class="div-v-item">Settings</span>
		</div>

		<div class="div-v-row div-v-row--compact" style="margin-top: 20px;">
			<div class="div-v-stat">
				<span class="div-v-stat__val">1,284</span>
				<span class="div-v-stat__lbl">Tasks</span>
			</div>
			<span class="div-v-sep div-v-sep--tall"></span>
			<div class="div-v-stat">
				<span class="div-v-stat__val">43</span>
				<span class="div-v-stat__lbl">Projects</span>
			</div>
			<span class="div-v-sep div-v-sep--tall"></span>
			<div class="div-v-stat">
				<span class="div-v-stat__val">98%</span>
				<span class="div-v-stat__lbl">Uptime</span>
			</div>
			<span class="div-v-sep div-v-sep--tall"></span>
			<div class="div-v-stat">
				<span class="div-v-stat__val">7</span>
				<span class="div-v-stat__lbl">Active Users</span>
			</div>
		</div>
	</div>

	<!-- 4. Dotted & Dashed -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dotted & Dashed Variants</h3>
		<p class="ds-card__sub">Border-style alternatives for softer visual weight</p>

		<div class="divider-weight-demo">
			<div class="divider-weight-row">
				<span class="divider-label-sm">Dotted</span>
				<hr class="div-h div-h--dotted" />
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Dashed</span>
				<hr class="div-h div-h--dashed" />
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Double</span>
				<hr class="div-h div-h--double" />
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Inset (padded)</span>
				<div class="div-h-inset-wrap">
					<hr class="div-h div-h--thin" />
				</div>
			</div>
		</div>
	</div>

	<!-- 5. Gradient Dividers -->
	<div class="ds-card">
		<h3 class="ds-card__title">Gradient Dividers</h3>
		<p class="ds-card__sub">Lines that fade from transparent through <code>var(--dbd)</code> back to transparent</p>

		<div class="divider-weight-demo">
			<div class="divider-weight-row">
				<span class="divider-label-sm">Center fade</span>
				<div class="div-gradient div-gradient--center"></div>
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Left fade</span>
				<div class="div-gradient div-gradient--left"></div>
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Right fade</span>
				<div class="div-gradient div-gradient--right"></div>
			</div>
			<div class="divider-weight-row">
				<span class="divider-label-sm">Accent glow</span>
				<div class="div-gradient div-gradient--glow"></div>
			</div>
		</div>
	</div>

	<!-- 6. Divider with Icon -->
	<div class="ds-card">
		<h3 class="ds-card__title">Divider with Icon</h3>
		<p class="ds-card__sub">Centered icon chip on a ruled line — useful for visual breaks</p>

		<div class="divider-labeled-stack">
			<!-- Star -->
			<div class="div-icon">
				<span class="div-icon__chip">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
					</svg>
				</span>
			</div>
			<!-- Arrow down -->
			<div class="div-icon">
				<span class="div-icon__chip">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
					</svg>
				</span>
			</div>
			<!-- Sparkle / plus -->
			<div class="div-icon">
				<span class="div-icon__chip">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
					</svg>
				</span>
			</div>
			<!-- Lock -->
			<div class="div-icon div-icon--muted">
				<span class="div-icon__chip div-icon__chip--muted">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
					</svg>
				</span>
			</div>
		</div>
	</div>

	<!-- 7. Section Dividers -->
	<div class="ds-card">
		<h3 class="ds-card__title">Section Dividers</h3>
		<p class="ds-card__sub">Full-width dividers with section title left and optional action right</p>

		<div class="div-section-stack">
			<!-- Plain section divider -->
			<div class="div-section">
				<span class="div-section__title">Recent Activity</span>
				<span class="div-section__line"></span>
			</div>
			<div class="div-section-placeholder">3 activity items here</div>

			<!-- Section divider with action -->
			<div class="div-section">
				<span class="div-section__title">Open Tasks</span>
				<span class="div-section__line"></span>
				<button class="div-section__action">Show more</button>
			</div>
			<div class="div-section-placeholder">Task list here</div>

			<!-- Section divider with count badge -->
			<div class="div-section">
				<span class="div-section__title">
					Notifications
					<span class="div-section__count">4</span>
				</span>
				<span class="div-section__line"></span>
				<button class="div-section__action">Mark all read</button>
			</div>
			<div class="div-section-placeholder">Notification list here</div>

			<!-- Subtle label only -->
			<div class="div-section div-section--subtle">
				<span class="div-section__title div-section__title--subtle">Yesterday</span>
				<span class="div-section__line"></span>
			</div>
			<div class="div-section-placeholder">Older content here</div>
		</div>
	</div>

	<!-- 8. In Context: Settings Page -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Settings Page</h3>
		<p class="ds-card__sub">Dividers separating grouped setting sections</p>

		<div class="settings-mock">
			<header class="settings-mock__header">
				<h4 class="settings-mock__page-title">Settings</h4>
			</header>

			<!-- Account section -->
			<div class="settings-group">
				<div class="div-section div-section--settings">
					<span class="div-section__title">Account</span>
					<span class="div-section__line"></span>
				</div>

				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Display name</span>
						<span class="settings-row__hint">Shown across all projects</span>
					</div>
					<span class="settings-row__value">Alex Chen</span>
				</div>
				<hr class="div-h div-h--thin settings-inner-div" />
				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Email</span>
						<span class="settings-row__hint">Used for notifications and login</span>
					</div>
					<span class="settings-row__value">alex@miosa.dev</span>
				</div>
				<hr class="div-h div-h--thin settings-inner-div" />
				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Timezone</span>
						<span class="settings-row__hint">All dates displayed in this zone</span>
					</div>
					<span class="settings-row__value">UTC−8 (PST)</span>
				</div>

				{#if showMoreAccount}
					<hr class="div-h div-h--thin settings-inner-div" />
					<div class="settings-row">
						<div class="settings-row__info">
							<span class="settings-row__label">Language</span>
							<span class="settings-row__hint">UI language preference</span>
						</div>
						<span class="settings-row__value">English (US)</span>
					</div>
				{/if}

				<div class="div-section div-section--show-more">
					<span class="div-section__line"></span>
					<button class="div-section__action" onclick={() => showMoreAccount = !showMoreAccount}>
						{showMoreAccount ? 'Show less' : 'Show more'}
					</button>
				</div>
			</div>

			<!-- Thick divider between major sections -->
			<hr class="div-h div-h--section-break" />

			<!-- Notifications section -->
			<div class="settings-group">
				<div class="div-section div-section--settings">
					<span class="div-section__title">Notifications</span>
					<span class="div-section__line"></span>
				</div>

				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Email digests</span>
						<span class="settings-row__hint">Daily summary of activity</span>
					</div>
					<span class="settings-toggle settings-toggle--on">On</span>
				</div>
				<hr class="div-h div-h--thin settings-inner-div" />
				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Mentions</span>
						<span class="settings-row__hint">Notify when someone @mentions you</span>
					</div>
					<span class="settings-toggle settings-toggle--on">On</span>
				</div>
				<hr class="div-h div-h--thin settings-inner-div" />
				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Task assignments</span>
						<span class="settings-row__hint">Notify when tasks are assigned</span>
					</div>
					<span class="settings-toggle settings-toggle--off">Off</span>
				</div>

				{#if showMoreNotifications}
					<hr class="div-h div-h--thin settings-inner-div" />
					<div class="settings-row">
						<div class="settings-row__info">
							<span class="settings-row__label">Weekly reports</span>
							<span class="settings-row__hint">Project health summary every Monday</span>
						</div>
						<span class="settings-toggle settings-toggle--off">Off</span>
					</div>
				{/if}

				<div class="div-section div-section--show-more">
					<span class="div-section__line"></span>
					<button class="div-section__action" onclick={() => showMoreNotifications = !showMoreNotifications}>
						{showMoreNotifications ? 'Show less' : 'Show more'}
					</button>
				</div>
			</div>

			<!-- Thick divider -->
			<hr class="div-h div-h--section-break" />

			<!-- Privacy section -->
			<div class="settings-group">
				<div class="div-section div-section--settings">
					<span class="div-section__title">Privacy</span>
					<span class="div-section__line"></span>
				</div>

				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Profile visibility</span>
						<span class="settings-row__hint">Who can see your profile page</span>
					</div>
					<span class="settings-row__value">Team only</span>
				</div>
				<hr class="div-h div-h--thin settings-inner-div" />
				<div class="settings-row">
					<div class="settings-row__info">
						<span class="settings-row__label">Activity status</span>
						<span class="settings-row__hint">Show when you were last active</span>
					</div>
					<span class="settings-toggle settings-toggle--on">On</span>
				</div>
				<hr class="div-h div-h--thin settings-inner-div" />
				<div class="settings-row settings-row--danger">
					<div class="settings-row__info">
						<span class="settings-row__label settings-row__label--danger">Delete account</span>
						<span class="settings-row__hint">Permanently remove all data</span>
					</div>
					<button class="settings-row__danger-btn">Delete</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Base horizontal rule reset ─────────────────────────── */
	.div-h {
		border: none;
		margin: 0;
		width: 100%;
		flex-shrink: 0;
	}

	/* Weight variants */
	.div-h--thin   { border-top: 1px solid var(--dbd); }
	.div-h--medium { border-top: 2px solid var(--dbd); }
	.div-h--thick  { border-top: 4px solid var(--dbd); }

	/* Style variants */
	.div-h--dotted { border-top: 2px dotted var(--dbd); }
	.div-h--dashed { border-top: 2px dashed var(--dbd); }
	.div-h--double { border-top: 4px double var(--dbd); }

	/* Section break (heavy) */
	.div-h--section-break {
		border-top: 2px solid var(--dbd2);
		margin: 4px 0;
	}

	/* ── Weight demo layout ──────────────────────────────────── */
	.divider-weight-demo {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 560px;
	}

	.divider-weight-row {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.divider-label-sm {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* ── Labeled divider ────────────────────────────────────── */
	.divider-labeled-stack {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 400px;
	}

	.div-labeled {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.div-labeled::before,
	.div-labeled::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--dbd);
	}

	.div-labeled--left::before {
		display: none;
	}

	.div-labeled--left::after {
		flex: 1;
	}

	.div-labeled__text {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		white-space: nowrap;
		padding: 0 4px;
	}

	.div-labeled__text--muted {
		font-weight: 400;
		color: var(--dt3);
	}

	/* ── Vertical dividers ───────────────────────────────────── */
	.div-v-row {
		display: flex;
		align-items: center;
		gap: 0;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 0 4px;
		max-width: 480px;
	}

	.div-v-item {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		padding: 10px 16px;
	}

	.div-v-sep {
		display: block;
		width: 1px;
		height: 40px;
		background: var(--dbd);
		flex-shrink: 0;
	}

	.div-v-sep--tall {
		height: 48px;
	}

	/* Stat row variant */
	.div-v-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 12px 20px;
	}

	.div-v-stat__val {
		font-size: 18px;
		font-weight: 700;
		color: var(--dt);
		line-height: 1;
	}

	.div-v-stat__lbl {
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
	}

	/* ── Inset padding wrapper ───────────────────────────────── */
	.div-h-inset-wrap {
		padding: 0 32px;
	}

	/* ── Gradient dividers ───────────────────────────────────── */
	.div-gradient {
		height: 1px;
		border: none;
		width: 100%;
	}

	.div-gradient--center {
		background: linear-gradient(
			to right,
			transparent 0%,
			var(--dbd) 30%,
			var(--dbd) 70%,
			transparent 100%
		);
	}

	.div-gradient--left {
		background: linear-gradient(
			to right,
			var(--dbd) 0%,
			var(--dbd) 50%,
			transparent 100%
		);
	}

	.div-gradient--right {
		background: linear-gradient(
			to right,
			transparent 0%,
			var(--dbd) 50%,
			var(--dbd) 100%
		);
	}

	.div-gradient--glow {
		height: 2px;
		background: linear-gradient(
			to right,
			transparent 0%,
			var(--dbd2) 20%,
			var(--dt4) 50%,
			var(--dbd2) 80%,
			transparent 100%
		);
	}

	/* ── Icon divider ────────────────────────────────────────── */
	.div-icon {
		display: flex;
		align-items: center;
		gap: 0;
		max-width: 400px;
	}

	.div-icon::before,
	.div-icon::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--dbd);
	}

	.div-icon--muted::before,
	.div-icon--muted::after {
		background: var(--dbd);
		opacity: 0.5;
	}

	.div-icon__chip {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		border: 1px solid var(--dbd2);
		background: var(--dbg3);
		color: var(--dt2);
		flex-shrink: 0;
		margin: 0 12px;
	}

	.div-icon__chip--muted {
		background: var(--dbg2);
		color: var(--dt3);
		border-color: var(--dbd);
	}

	/* ── Section dividers ────────────────────────────────────── */
	.div-section-stack {
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 560px;
	}

	.div-section {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
		margin-top: 20px;
	}

	.div-section:first-child {
		margin-top: 0;
	}

	.div-section__title {
		font-size: 11px;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		white-space: nowrap;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.div-section__title--subtle {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt4);
		text-transform: none;
		letter-spacing: 0;
	}

	.div-section__line {
		flex: 1;
		height: 1px;
		background: var(--dbd);
	}

	.div-section__count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9999px;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		font-size: 10px;
		font-weight: 700;
		color: var(--dt2);
	}

	.div-section__action {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		white-space: nowrap;
		transition: color 0.15s;
	}

	.div-section__action:hover {
		color: var(--dt);
	}

	.div-section--subtle .div-section__line {
		opacity: 0.5;
	}

	.div-section-placeholder {
		font-size: 12px;
		color: var(--dt4);
		padding: 10px 12px;
		border-radius: 6px;
		border: 1px dashed var(--dbd);
		background: var(--dbg2);
		text-align: center;
		margin-bottom: 4px;
	}

	/* show-more footer variant */
	.div-section--show-more {
		margin-top: 4px;
		margin-bottom: 0;
	}

	.div-section--show-more .div-section__line {
		opacity: 0.6;
	}

	/* ── Settings mock ───────────────────────────────────────── */
	.settings-mock {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg2);
		overflow: hidden;
		max-width: 560px;
	}

	.settings-mock__header {
		padding: 16px 20px 14px;
		border-bottom: 1px solid var(--dbd2);
		background: var(--dbg3);
	}

	.settings-mock__page-title {
		margin: 0;
		font-size: 15px;
		font-weight: 700;
		color: var(--dt);
	}

	.settings-group {
		padding: 0 20px 4px;
	}

	.div-section--settings {
		margin-top: 18px;
		margin-bottom: 0;
		padding-bottom: 8px;
	}

	.settings-inner-div {
		margin-left: 0;
		opacity: 0.6;
	}

	.settings-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 12px 0;
	}

	.settings-row--danger {
		align-items: flex-start;
	}

	.settings-row__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.settings-row__label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.settings-row__label--danger {
		color: #ef4444;
	}

	.settings-row__hint {
		font-size: 11px;
		color: var(--dt3);
	}

	.settings-row__value {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		flex-shrink: 0;
	}

	.settings-toggle {
		font-size: 11px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 9999px;
		flex-shrink: 0;
	}

	.settings-toggle--on {
		background: rgba(34, 197, 94, 0.1);
		color: #16a34a;
		border: 1px solid rgba(34, 197, 94, 0.25);
	}

	.settings-toggle--off {
		background: var(--dbg3);
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.settings-row__danger-btn {
		font-size: 12px;
		font-weight: 600;
		color: #ef4444;
		background: rgba(239, 68, 68, 0.08);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: 6px;
		padding: 5px 14px;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.15s, border-color 0.15s;
	}

	.settings-row__danger-btn:hover {
		background: rgba(239, 68, 68, 0.15);
		border-color: rgba(239, 68, 68, 0.35);
	}
</style>
