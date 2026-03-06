<script lang="ts">
	import Toggle from '$lib/ui/toggle/Toggle.svelte';
	import Checkbox from '$lib/ui/checkbox/Checkbox.svelte';
	import { RadioGroup, RadioItem } from '$lib/ui/radio';

	// ── Toggle demo state ──────────────────────────────────────────
	let toggleDefault = $state(false);
	let toggleSm = $state(true);
	let toggleMd = $state(false);
	let toggleLg = $state(true);
	let toggleWithLabel = $state(false);
	let toggleWithLabelOn = $state(true);

	// ── Checkbox demo state ────────────────────────────────────────
	let checkDefault = $state(false);
	let checkChecked = $state(true);
	let checkDisabledOff = $state(false);
	let checkDisabledOn = $state(true);

	// Settings panel checkboxes
	let settingEmail = $state(true);
	let settingPush = $state(true);
	let settingSMS = $state(false);
	let settingMarketing = $state(false);
	let settingWeekly = $state(true);

	const allNotifications = $derived(settingEmail && settingPush && settingSMS);
	const someNotifications = $derived(
		(settingEmail || settingPush || settingSMS) && !allNotifications
	);

	function toggleAllNotifications() {
		const next = !allNotifications;
		settingEmail = next;
		settingPush = next;
		settingSMS = next;
	}

	// ── Radio demo state ───────────────────────────────────────────
	let radioVertical = $state('option-b');
	let radioHorizontal = $state('monthly');
	let radioDesc = $state('standard');

	// ── Form pattern state ─────────────────────────────────────────
	let notifEmail = $state(true);
	let notifPush = $state(false);
	let notifSMS = $state(false);
	let digestFreq = $state('daily');
	let darkMode = $state(false);
	let autoSave = $state(true);
	let betaFeatures = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Form Controls</h2>
	<p class="ds-desc">
		Toggle, Checkbox, and Radio — dark monochrome form controls with smooth transitions,
		full accessibility, and consistent dark mode support.
	</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  TOGGLE                                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Toggle — Default</h3>
		<p class="ds-card__sub">
			OFF = gray track, ON = black track. Thumb slides 0.2s ease.
			Click to interact.
		</p>
		<div class="ds-demo">
			<Toggle bind:checked={toggleDefault} />
			<span style="font-size: 12px; color: var(--dt3);">
				{toggleDefault ? 'On' : 'Off'}
			</span>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Toggle — Sizes</h3>
		<p class="ds-card__sub">Three sizes: <code>sm</code>, <code>default</code>, <code>lg</code></p>
		<div class="ds-demo" style="gap: 24px; align-items: center;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
				<Toggle bind:checked={toggleSm} size="sm" />
				<span style="font-size: 11px; color: var(--dt3);">sm</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
				<Toggle bind:checked={toggleMd} size="default" />
				<span style="font-size: 11px; color: var(--dt3);">default</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
				<Toggle bind:checked={toggleLg} size="lg" />
				<span style="font-size: 11px; color: var(--dt3);">lg</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Toggle — With Labels</h3>
		<div class="ds-demo-col" style="gap: 14px;">
			<Toggle bind:checked={toggleWithLabel} label="Enable notifications" />
			<Toggle bind:checked={toggleWithLabelOn} label="Dark mode" />
			<Toggle checked={false} disabled label="Feature unavailable" />
			<Toggle checked={true} disabled label="Always enabled" />
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Toggle — Props Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td><code>checked</code></td><td>boolean (bindable)</td><td>false</td><td>Current on/off state</td></tr>
				<tr><td><code>size</code></td><td>'sm' | 'default' | 'lg'</td><td>'default'</td><td>Track and thumb dimensions</td></tr>
				<tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Prevents interaction, reduces opacity</td></tr>
				<tr><td><code>label</code></td><td>string</td><td>—</td><td>Optional inline label rendered after the track</td></tr>
				<tr><td><code>onchange</code></td><td>(checked: boolean) => void</td><td>—</td><td>Fires after state change</td></tr>
			</tbody>
		</table>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  CHECKBOX                                                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Checkbox — States</h3>
		<p class="ds-card__sub">
			Unchecked = border only. Checked = black fill + white checkmark.
			Indeterminate = black fill + white dash.
		</p>
		<div class="ds-demo" style="gap: 20px; align-items: center;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<Checkbox bind:checked={checkDefault} />
				<span style="font-size: 11px; color: var(--dt3);">unchecked</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<Checkbox bind:checked={checkChecked} />
				<span style="font-size: 11px; color: var(--dt3);">checked</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<Checkbox checked={false} indeterminate />
				<span style="font-size: 11px; color: var(--dt3);">indeterminate</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<Checkbox bind:checked={checkDisabledOff} disabled />
				<span style="font-size: 11px; color: var(--dt3);">disabled off</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<Checkbox bind:checked={checkDisabledOn} disabled />
				<span style="font-size: 11px; color: var(--dt3);">disabled on</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Checkbox — Settings Panel</h3>
		<p class="ds-card__sub">
			Real-world group pattern with a "select all" indeterminate parent.
		</p>
		<div class="fc-settings-panel">
			<div class="fc-settings-row fc-settings-row--parent">
				<Checkbox
					checked={allNotifications}
					indeterminate={someNotifications}
					onchange={toggleAllNotifications}
					label="Notification channels"
				/>
			</div>
			<div class="fc-settings-children">
				<Checkbox bind:checked={settingEmail} label="Email notifications" />
				<Checkbox bind:checked={settingPush} label="Push notifications" />
				<Checkbox bind:checked={settingSMS} label="SMS alerts" />
			</div>
			<div class="fc-settings-divider"></div>
			<div class="fc-settings-row">
				<Checkbox bind:checked={settingMarketing} label="Marketing updates" />
			</div>
			<div class="fc-settings-row">
				<Checkbox bind:checked={settingWeekly} label="Weekly digest" />
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Checkbox — Props Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td><code>checked</code></td><td>boolean (bindable)</td><td>false</td><td>Whether the box is checked</td></tr>
				<tr><td><code>indeterminate</code></td><td>boolean</td><td>false</td><td>Shows dash; overrides checked visually</td></tr>
				<tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Prevents interaction</td></tr>
				<tr><td><code>label</code></td><td>string</td><td>—</td><td>Optional inline label text</td></tr>
				<tr><td><code>onchange</code></td><td>(checked: boolean) => void</td><td>—</td><td>Fires after state change</td></tr>
			</tbody>
		</table>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  RADIO GROUP                                                -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Radio Group — Vertical</h3>
		<p class="ds-card__sub">
			Selected = black fill with white inner dot. Dark mode inverts.
		</p>
		<div style="display: flex; gap: 48px; flex-wrap: wrap;">
			<div>
				<p style="font-size: 12px; font-weight: 600; color: var(--dt3); margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.04em;">Plan</p>
				<RadioGroup bind:value={radioVertical} name="plan-demo">
					<RadioItem value="option-a" label="Starter" />
					<RadioItem value="option-b" label="Professional" />
					<RadioItem value="option-c" label="Enterprise" />
					<RadioItem value="option-d" label="Custom" disabled />
				</RadioGroup>
				<p style="font-size: 12px; color: var(--dt3); margin: 12px 0 0;">
					Selected: <code style="font-size: 11px; background: var(--dbg2); padding: 1px 5px; border-radius: 4px;">{radioVertical}</code>
				</p>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Radio Group — Horizontal</h3>
		<p class="ds-card__sub">Use <code>orientation="horizontal"</code> for inline options.</p>
		<RadioGroup bind:value={radioHorizontal} name="billing-demo" orientation="horizontal">
			<RadioItem value="monthly" label="Monthly" />
			<RadioItem value="quarterly" label="Quarterly" />
			<RadioItem value="annually" label="Annually" />
		</RadioGroup>
		<p style="font-size: 12px; color: var(--dt3); margin: 12px 0 0;">
			Selected: <code style="font-size: 11px; background: var(--dbg2); padding: 1px 5px; border-radius: 4px;">{radioHorizontal}</code>
		</p>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Radio Group — With Descriptions</h3>
		<p class="ds-card__sub">Each item can have an optional <code>description</code> for added context.</p>
		<RadioGroup bind:value={radioDesc} name="support-demo">
			<RadioItem
				value="basic"
				label="Basic"
				description="Email support, 5-day response time"
			/>
			<RadioItem
				value="standard"
				label="Standard"
				description="Email + chat support, 24-hour response"
			/>
			<RadioItem
				value="priority"
				label="Priority"
				description="Dedicated account manager, 2-hour SLA"
			/>
			<RadioItem
				value="enterprise"
				label="Enterprise"
				description="White-glove onboarding, 24/7 phone support"
				disabled
			/>
		</RadioGroup>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Radio Group — Props Reference</h3>
		<p class="ds-card__sub">RadioGroup props</p>
		<table class="ds-table">
			<thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td><code>value</code></td><td>string (bindable)</td><td>''</td><td>Currently selected item value</td></tr>
				<tr><td><code>name</code></td><td>string</td><td>required</td><td>Shared name for the radio group</td></tr>
				<tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disables all items in the group</td></tr>
				<tr><td><code>orientation</code></td><td>'vertical' | 'horizontal'</td><td>'vertical'</td><td>Layout direction</td></tr>
				<tr><td><code>onchange</code></td><td>(value: string) => void</td><td>—</td><td>Fires when selection changes</td></tr>
			</tbody>
		</table>
		<p class="ds-card__sub" style="margin-top: 20px;">RadioItem props</p>
		<table class="ds-table">
			<thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td><code>value</code></td><td>string</td><td>required</td><td>Value this item represents</td></tr>
				<tr><td><code>label</code></td><td>string</td><td>required</td><td>Visible label text</td></tr>
				<tr><td><code>description</code></td><td>string</td><td>—</td><td>Optional secondary descriptor line</td></tr>
				<tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disables just this item</td></tr>
			</tbody>
		</table>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  FORM PATTERN — NOTIFICATION PREFERENCES                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Form Pattern — Notification Preferences</h3>
		<p class="ds-card__sub">
			A realistic settings panel combining all three controls.
		</p>

		<div class="fc-prefs-panel">
			<!-- Section: Channels -->
			<div class="fc-prefs-section">
				<h4 class="fc-prefs-section__title">Notification Channels</h4>
				<div class="fc-prefs-section__rows">
					<div class="fc-prefs-row">
						<div class="fc-prefs-row__info">
							<span class="fc-prefs-row__label">Email</span>
							<span class="fc-prefs-row__desc">Receive updates to your inbox</span>
						</div>
						<Toggle bind:checked={notifEmail} size="sm" />
					</div>
					<div class="fc-prefs-row">
						<div class="fc-prefs-row__info">
							<span class="fc-prefs-row__label">Push notifications</span>
							<span class="fc-prefs-row__desc">Browser and mobile alerts</span>
						</div>
						<Toggle bind:checked={notifPush} size="sm" />
					</div>
					<div class="fc-prefs-row">
						<div class="fc-prefs-row__info">
							<span class="fc-prefs-row__label">SMS</span>
							<span class="fc-prefs-row__desc">Text message alerts for critical events</span>
						</div>
						<Toggle bind:checked={notifSMS} size="sm" />
					</div>
				</div>
			</div>

			<!-- Section: Digest Frequency -->
			<div class="fc-prefs-section">
				<h4 class="fc-prefs-section__title">Digest Frequency</h4>
				<p class="fc-prefs-section__desc">How often would you like summary emails?</p>
				<RadioGroup bind:value={digestFreq} name="digest-freq">
					<RadioItem value="realtime" label="Real-time" description="Every event as it happens" />
					<RadioItem value="daily" label="Daily digest" description="One summary each morning" />
					<RadioItem value="weekly" label="Weekly roundup" description="Every Monday at 9 AM" />
					<RadioItem value="never" label="Never" description="No summary emails" />
				</RadioGroup>
			</div>

			<!-- Section: Preferences -->
			<div class="fc-prefs-section">
				<h4 class="fc-prefs-section__title">Preferences</h4>
				<div class="fc-prefs-checks">
					<Checkbox bind:checked={darkMode} label="Dark mode" />
					<Checkbox bind:checked={autoSave} label="Auto-save drafts" />
					<Checkbox bind:checked={betaFeatures} label="Early access to beta features" />
				</div>
			</div>

			<!-- Footer -->
			<div class="fc-prefs-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm">Reset to defaults</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Save preferences</button>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Settings panel (checkbox group) ────────────────────── */
	.fc-settings-panel {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 10px;
		overflow: hidden;
		max-width: 420px;
	}

	:global(.dark) .fc-settings-panel {
		border-color: rgba(255, 255, 255, 0.06);
	}

	.fc-settings-row {
		padding: 12px 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	.fc-settings-row:last-child {
		border-bottom: none;
	}

	:global(.dark) .fc-settings-row {
		border-bottom-color: rgba(255, 255, 255, 0.04);
	}

	.fc-settings-row--parent {
		background: rgba(0, 0, 0, 0.02);
	}

	:global(.dark) .fc-settings-row--parent {
		background: rgba(255, 255, 255, 0.02);
	}

	.fc-settings-children {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding-left: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	:global(.dark) .fc-settings-children {
		border-bottom-color: rgba(255, 255, 255, 0.04);
	}

	.fc-settings-children :global(.bos-checkbox-wrapper) {
		padding: 10px 16px 10px 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.03);
		width: 100%;
	}

	.fc-settings-children :global(.bos-checkbox-wrapper:last-child) {
		border-bottom: none;
	}

	:global(.dark) .fc-settings-children :global(.bos-checkbox-wrapper) {
		border-bottom-color: rgba(255, 255, 255, 0.03);
	}

	.fc-settings-divider {
		height: 1px;
		background: rgba(0, 0, 0, 0.06);
	}

	:global(.dark) .fc-settings-divider {
		background: rgba(255, 255, 255, 0.06);
	}

	/* ── Notification preferences panel ─────────────────────── */
	.fc-prefs-panel {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		overflow: hidden;
		max-width: 520px;
	}

	:global(.dark) .fc-prefs-panel {
		border-color: rgba(255, 255, 255, 0.08);
	}

	.fc-prefs-section {
		padding: 20px 24px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.fc-prefs-section:last-of-type {
		border-bottom: none;
	}

	:global(.dark) .fc-prefs-section {
		border-bottom-color: rgba(255, 255, 255, 0.06);
	}

	.fc-prefs-section__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		margin: 0 0 14px;
		letter-spacing: -0.01em;
	}

	.fc-prefs-section__desc {
		font-size: 12px;
		color: var(--dt3);
		margin: -8px 0 14px;
	}

	.fc-prefs-section__rows {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.fc-prefs-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 11px 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	}

	.fc-prefs-row:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	:global(.dark) .fc-prefs-row {
		border-bottom-color: rgba(255, 255, 255, 0.04);
	}

	.fc-prefs-row__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.fc-prefs-row__label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.fc-prefs-row__desc {
		font-size: 12px;
		color: var(--dt3);
	}

	.fc-prefs-checks {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.fc-prefs-footer {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		padding: 16px 24px;
		background: rgba(0, 0, 0, 0.02);
		border-top: 1px solid rgba(0, 0, 0, 0.06);
	}

	:global(.dark) .fc-prefs-footer {
		background: rgba(255, 255, 255, 0.02);
		border-top-color: rgba(255, 255, 255, 0.06);
	}
</style>
