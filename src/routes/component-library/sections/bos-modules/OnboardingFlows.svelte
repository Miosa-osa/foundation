<script lang="ts">
	// Welcome screen state
	let welcomeLoading = $state(false);

	// Step indicator state
	const stepIndicatorSteps = [
		{ label: 'Account' },
		{ label: 'Profile' },
		{ label: 'Settings' },
		{ label: 'Done' },
	];
	let currentStep = $state(2);

	// Permission gate state
	let permissionGranted = $state<null | 'allowed' | 'skipped'>(null);

	// Feature tour state
	const tourSlides = [
		{
			title: 'Smart Workspace',
			desc: 'MIOSA organizes your work automatically — surfacing tasks, threads, and context when you need them.',
		},
		{
			title: 'AI at Your Side',
			desc: 'Ask questions, draft replies, and summarize long threads without leaving your workflow.',
		},
		{
			title: 'Seamless Integrations',
			desc: 'Connect your tools in seconds. GitHub, Slack, Notion, and more sync in real time.',
		},
	];
	let tourSlide = $state(0);
	let tourDone = $state(false);

	// Setup checklist state
	const checklistItems = [
		{ id: 'profile', label: 'Create your profile', desc: 'Add your name and avatar' },
		{ id: 'connect', label: 'Connect an account', desc: 'Link GitHub, Slack, or Notion' },
		{ id: 'prefs', label: 'Set preferences', desc: 'Choose theme, language, and notifications' },
	];
	let checked = $state<Record<string, boolean>>({ profile: true, connect: false, prefs: false });
	let completedCount = $derived(Object.values(checked).filter(Boolean).length);
	let completionPct = $derived(Math.round((completedCount / checklistItems.length) * 100));

	// Onboarding wizard state
	const wizardSteps = ['Welcome', 'Profile', 'Integrations', 'Finish'];
	let wizardStep = $state(1);
	let wizardName = $state('');
	let wizardRole = $state('');

	// Success/completion state — toggled by wizard Finish
	let showSuccess = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Onboarding Flows</h2>
	<p class="ds-desc">
		Welcome screens, step indicators, permission gates, feature tours, setup checklists, wizards,
		and completion cards — full-spectrum first-run patterns in the dark monochrome design system.
	</p>

	<!-- ─────────────────────────────────────────── -->
	<!-- 1. Welcome Screen                          -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Welcome Screen</h3>
		<p class="ds-card__sub">Full-card welcome with app identity, feature highlights, and primary CTA</p>
		<div class="ds-demo">
			<div class="ob-welcome-shell">
				<!-- Logo mark -->
				<div class="ob-logo-mark" aria-hidden="true">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2L2 7l10 5 10-5-10-5z"/>
						<path d="M2 17l10 5 10-5"/>
						<path d="M2 12l10 5 10-5"/>
					</svg>
				</div>
				<p class="ob-welcome-eyebrow">Version 2.0 — Now available</p>
				<h2 class="ob-welcome-title">Welcome to MIOSA</h2>
				<p class="ob-welcome-sub">
					Your AI-powered workspace brings together tasks, conversations, and your favourite tools
					in one focused place.
				</p>
				<div class="ob-welcome-divider" aria-hidden="true"></div>
				<div class="ob-welcome-features" aria-label="Key features">
					{#each [
						['Smart context', 'Surfaces what matters, when it matters.'],
						['AI assistant', 'Draft, summarize, and search in seconds.'],
						['1-click integrations', 'GitHub, Slack, Notion and more.'],
					] as [feat, detail]}
						<div class="ob-welcome-feature">
							<div class="ob-welcome-feature-dot" aria-hidden="true"></div>
							<div>
								<span class="ob-welcome-feature-name">{feat}</span>
								<span class="ob-welcome-feature-detail">{detail}</span>
							</div>
						</div>
					{/each}
				</div>
				<button
					class="btn-pill btn-pill-primary"
					style="width: 100%; justify-content: center; margin-top: 28px;"
					aria-label="Get started with MIOSA"
					onclick={() => {
						welcomeLoading = true;
						setTimeout(() => { welcomeLoading = false; }, 1400);
					}}
					disabled={welcomeLoading}
				>
					{welcomeLoading ? 'Loading…' : 'Get Started'}
				</button>
				<p class="ob-welcome-footer">By continuing you agree to our Terms of Service.</p>
			</div>
		</div>
	</div>

	<!-- ─────────────────────────────────────────── -->
	<!-- 2. Step Indicator                          -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Step Indicator</h3>
		<p class="ds-card__sub">Horizontal progress dots and numbered steps showing Step 2 of 4, with labels and interactive navigation</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 28px;">
			<!-- Pill dot variant -->
			<div style="width: 100%; max-width: 480px;">
				<p style="font-size: 11px; font-weight: 600; color: var(--dt3); letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 14px;">Pill / dot variant</p>
				<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
					{#each stepIndicatorSteps as step, i}
						{@const num = i + 1}
						{@const done = num < currentStep}
						{@const active = num === currentStep}
						<button
							aria-label="Go to step {num}: {step.label}"
							aria-current={active ? 'step' : undefined}
							onclick={() => currentStep = num}
							class="ob-step-dot {done ? 'ob-step-dot--done' : ''} {active ? 'ob-step-dot--active' : ''}"
						></button>
						{#if i < stepIndicatorSteps.length - 1}
							<div class="ob-step-connector {done ? 'ob-step-connector--done' : ''}"></div>
						{/if}
					{/each}
					<span style="font-size: 12px; color: var(--dt3); margin-left: 10px; white-space: nowrap;">Step {currentStep} of {stepIndicatorSteps.length}</span>
				</div>
				<p style="font-size: 13px; font-weight: 600; color: var(--dt); margin: 0;">
					{stepIndicatorSteps[currentStep - 1].label}
				</p>
			</div>

			<!-- Numbered step indicator -->
			<div style="width: 100%; max-width: 520px;">
				<p style="font-size: 11px; font-weight: 600; color: var(--dt3); letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 14px;">Numbered with labels</p>
				<div style="display: flex; align-items: flex-start;">
					{#each stepIndicatorSteps as step, i}
						{@const num = i + 1}
						{@const done = num < currentStep}
						{@const active = num === currentStep}
						<div style="display: flex; flex-direction: column; align-items: center; gap: 7px; flex-shrink: 0;">
							<div class="ob-step-num {done ? 'ob-step-num--done' : ''} {active ? 'ob-step-num--active' : ''}">
								{#if done}
									<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
									</svg>
								{:else}
									{num}
								{/if}
							</div>
							<span class="ob-step-label {active ? 'ob-step-label--active' : ''} {done ? 'ob-step-label--done' : ''}">{step.label}</span>
						</div>
						{#if i < stepIndicatorSteps.length - 1}
							<div class="ob-step-line {done ? 'ob-step-line--done' : ''}"></div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Navigation controls -->
			<div style="display: flex; gap: 8px; align-items: center;">
				<button
					class="btn-pill btn-pill-secondary btn-pill-sm"
					onclick={() => { if (currentStep > 1) currentStep -= 1; }}
					disabled={currentStep === 1}
					style="opacity: {currentStep === 1 ? 0.35 : 1};"
					aria-label="Previous step"
				>Previous</button>
				<button
					class="btn-pill btn-pill-primary btn-pill-sm"
					onclick={() => { if (currentStep < stepIndicatorSteps.length) currentStep += 1; }}
					disabled={currentStep === stepIndicatorSteps.length}
					style="opacity: {currentStep === stepIndicatorSteps.length ? 0.35 : 1};"
					aria-label="Next step"
				>{currentStep === stepIndicatorSteps.length ? 'Finish' : 'Next'}</button>
			</div>
		</div>
	</div>

	<!-- ─────────────────────────────────────────── -->
	<!-- 3. Permission Gate                         -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Permission Gate</h3>
		<p class="ds-card__sub">Request system permissions with context and clear Allow / Skip actions</p>
		<div class="ds-demo">
			{#if permissionGranted === null}
				<div class="ob-permission-card">
					<div class="ob-permission-icon" aria-hidden="true">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
							<path d="M13.73 21a2 2 0 0 1-3.46 0"/>
						</svg>
					</div>
					<h4 class="ob-permission-title">Enable notifications</h4>
					<p class="ob-permission-body">
						Get real-time alerts for mentions, task updates, and important activity — so you never miss
						what matters without constantly refreshing.
					</p>
					<ul class="ob-permission-list" aria-label="What we'll notify you about">
						{#each ['Direct mentions and replies', 'Task assignments and due dates', 'Integration sync alerts'] as item}
							<li class="ob-permission-list-item">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M5 13l4 4L19 7"/>
								</svg>
								{item}
							</li>
						{/each}
					</ul>
					<div class="ob-permission-actions">
						<button
							class="btn-pill btn-pill-secondary btn-pill-sm"
							onclick={() => permissionGranted = 'skipped'}
							aria-label="Skip notification permission"
						>Skip for now</button>
						<button
							class="btn-pill btn-pill-primary btn-pill-sm"
							onclick={() => permissionGranted = 'allowed'}
							aria-label="Allow notifications"
						>Allow notifications</button>
					</div>
				</div>
			{:else if permissionGranted === 'allowed'}
				<div class="ob-permission-result ob-permission-result--success">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<path d="M22 4L12 14.01l-3-3"/>
					</svg>
					<span>Notifications enabled</span>
					<button class="ob-permission-reset" onclick={() => permissionGranted = null} aria-label="Reset permission demo">Reset demo</button>
				</div>
			{:else}
				<div class="ob-permission-result ob-permission-result--skipped">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="10"/>
						<path d="M8 12h8"/>
					</svg>
					<span>Notifications skipped — enable them later in Settings.</span>
					<button class="ob-permission-reset" onclick={() => permissionGranted = null} aria-label="Reset permission demo">Reset demo</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ─────────────────────────────────────────── -->
	<!-- 4. Feature Tour Card                       -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Feature Tour Card</h3>
		<p class="ds-card__sub">Spotlight cards walking users through key capabilities with dot indicators and Next/Skip navigation</p>
		<div class="ds-demo">
			{#if !tourDone}
				<div class="ob-tour-card">
					<!-- Illustration area -->
					<div class="ob-tour-illustration" aria-hidden="true">
						<div class="ob-tour-illustration-inner">
							{#if tourSlide === 0}
								<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
									<rect x="3" y="3" width="7" height="7" rx="1"/>
									<rect x="14" y="3" width="7" height="7" rx="1"/>
									<rect x="3" y="14" width="7" height="7" rx="1"/>
									<rect x="14" y="14" width="7" height="7" rx="1"/>
								</svg>
							{:else if tourSlide === 1}
								<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
									<path d="M8 10h8M8 14h5"/>
								</svg>
							{:else}
								<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
									<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
									<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
								</svg>
							{/if}
						</div>
					</div>

					<!-- Content -->
					<div class="ob-tour-content">
						<h4 class="ob-tour-title">{tourSlides[tourSlide].title}</h4>
						<p class="ob-tour-desc">{tourSlides[tourSlide].desc}</p>
					</div>

					<!-- Dot indicators -->
					<div class="ob-tour-dots" role="tablist" aria-label="Tour slide indicators">
						{#each tourSlides as _, i}
							<button
								role="tab"
								aria-selected={i === tourSlide}
								aria-label="Slide {i + 1} of {tourSlides.length}"
								class="ob-tour-dot {i === tourSlide ? 'ob-tour-dot--active' : ''}"
								onclick={() => tourSlide = i}
							></button>
						{/each}
					</div>

					<!-- Navigation -->
					<div class="ob-tour-nav">
						<button
							class="btn-pill btn-pill-ghost btn-pill-sm"
							onclick={() => tourDone = true}
							aria-label="Skip the feature tour"
						>Skip tour</button>
						<button
							class="btn-pill btn-pill-primary btn-pill-sm"
							onclick={() => {
								if (tourSlide < tourSlides.length - 1) {
									tourSlide += 1;
								} else {
									tourDone = true;
								}
							}}
							aria-label="{tourSlide === tourSlides.length - 1 ? 'Finish tour' : 'Next slide'}"
						>{tourSlide === tourSlides.length - 1 ? 'Finish' : 'Next'}</button>
					</div>
				</div>
			{:else}
				<div class="ob-tour-done">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<path d="M22 4L12 14.01l-3-3"/>
					</svg>
					<span>Tour complete!</span>
					<button
						class="btn-pill btn-pill-secondary btn-pill-sm"
						onclick={() => { tourSlide = 0; tourDone = false; }}
						aria-label="Replay the feature tour"
					>Replay tour</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ─────────────────────────────────────────── -->
	<!-- 5. Setup Checklist                         -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Setup Checklist</h3>
		<p class="ds-card__sub">Onboarding task list with checkboxes, descriptions, and a completion percentage progress bar</p>
		<div class="ds-demo">
			<div class="ob-checklist">
				<!-- Header -->
				<div class="ob-checklist-header">
					<div>
						<h4 class="ob-checklist-heading">Get set up</h4>
						<p class="ob-checklist-sub">{completedCount} of {checklistItems.length} tasks complete</p>
					</div>
					<span class="ob-checklist-pct" aria-label="{completionPct}% complete">{completionPct}%</span>
				</div>
				<!-- Progress bar -->
				<div
					class="ob-checklist-bar"
					role="progressbar"
					aria-valuenow={completionPct}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Setup progress"
				>
					<div class="ob-checklist-bar-fill" style="width: {completionPct}%;"></div>
				</div>
				<!-- Items -->
				<ul class="ob-checklist-list" aria-label="Setup tasks">
					{#each checklistItems as item}
						<li class="ob-checklist-item {checked[item.id] ? 'ob-checklist-item--done' : ''}">
							<label class="ob-checklist-label" for="check-{item.id}">
								<input
									type="checkbox"
									id="check-{item.id}"
									bind:checked={checked[item.id]}
									class="ob-checklist-checkbox"
									aria-describedby="check-desc-{item.id}"
								/>
								<span class="ob-checklist-custom-check" aria-hidden="true">
									{#if checked[item.id]}
										<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
											<path d="M5 13l4 4L19 7"/>
										</svg>
									{/if}
								</span>
								<div class="ob-checklist-text">
									<span class="ob-checklist-item-title">{item.label}</span>
									<span id="check-desc-{item.id}" class="ob-checklist-item-desc">{item.desc}</span>
								</div>
							</label>
						</li>
					{/each}
				</ul>
				{#if completionPct === 100}
					<div class="ob-checklist-complete" aria-live="polite">
						All done — you're ready to go!
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ─────────────────────────────────────────── -->
	<!-- 6. Onboarding Wizard                       -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Onboarding Wizard</h3>
		<p class="ds-card__sub">Multi-step form with step bar at top, contextual form fields per step, and back/next navigation</p>
		<div class="ds-demo">
			<div class="ob-wizard">
				<!-- Step bar -->
				<div class="ob-wizard-stepbar" role="list" aria-label="Wizard steps">
					{#each wizardSteps as label, i}
						{@const num = i + 1}
						{@const done = num < wizardStep}
						{@const active = num === wizardStep}
						<div role="listitem" style="display: flex; align-items: center; flex: {i < wizardSteps.length - 1 ? '1' : '0'};">
							<div style="display: flex; flex-direction: column; align-items: center; gap: 5px; flex-shrink: 0;">
								<div
									class="ob-wizard-step-num {done ? 'ob-wizard-step-num--done' : ''} {active ? 'ob-wizard-step-num--active' : ''}"
									aria-current={active ? 'step' : undefined}
								>
									{#if done}
										<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
										</svg>
									{:else}
										{num}
									{/if}
								</div>
								<span class="ob-wizard-step-label {active ? 'ob-wizard-step-label--active' : ''} {done ? 'ob-wizard-step-label--done' : ''}">{label}</span>
							</div>
							{#if i < wizardSteps.length - 1}
								<div class="ob-wizard-connector {done ? 'ob-wizard-connector--done' : ''}"></div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Step content -->
				<div class="ob-wizard-body">
					{#if wizardStep === 1}
						<div class="ob-wizard-slide">
							<h4 class="ob-wizard-slide-title">Welcome aboard</h4>
							<p class="ob-wizard-slide-desc">Let's take 2 minutes to set up your workspace. We'll walk you through profile, integrations, and preferences.</p>
							<div class="ob-wizard-illustration" aria-hidden="true">
								<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
								</svg>
							</div>
						</div>
					{:else if wizardStep === 2}
						<div class="ob-wizard-slide">
							<h4 class="ob-wizard-slide-title">Your profile</h4>
							<p class="ob-wizard-slide-desc">Tell us a bit about yourself so teammates can recognise you.</p>
							<div class="ob-wizard-fields">
								<div class="ob-wizard-field">
									<label class="ob-wizard-field-label" for="wiz-name">Full name</label>
									<input
										id="wiz-name"
										class="ob-wizard-input"
										type="text"
										placeholder="Alex Morgan"
										bind:value={wizardName}
										autocomplete="name"
									/>
								</div>
								<div class="ob-wizard-field">
									<label class="ob-wizard-field-label" for="wiz-role">Role</label>
									<input
										id="wiz-role"
										class="ob-wizard-input"
										type="text"
										placeholder="Product Designer"
										bind:value={wizardRole}
										autocomplete="organization-title"
									/>
								</div>
							</div>
						</div>
					{:else if wizardStep === 3}
						<div class="ob-wizard-slide">
							<h4 class="ob-wizard-slide-title">Connect integrations</h4>
							<p class="ob-wizard-slide-desc">Link your tools to bring all your work into MIOSA.</p>
							<div class="ob-wizard-integrations">
								{#each [
									{ name: 'GitHub', icon: 'G', connected: true },
									{ name: 'Slack', icon: 'S', connected: false },
									{ name: 'Notion', icon: 'N', connected: false },
								] as int}
									<div class="ob-wizard-integration">
										<div class="ob-wizard-integration-icon" aria-hidden="true">{int.icon}</div>
										<span class="ob-wizard-integration-name">{int.name}</span>
										<span class="ob-wizard-integration-badge {int.connected ? 'ob-wizard-integration-badge--connected' : ''}">
											{int.connected ? 'Connected' : 'Connect'}
										</span>
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<div class="ob-wizard-slide">
							<h4 class="ob-wizard-slide-title">Ready to launch</h4>
							<p class="ob-wizard-slide-desc">Your workspace is configured. Click Finish to enter MIOSA.</p>
							{#if wizardName}
								<p class="ob-wizard-name-confirm">Hey, <strong>{wizardName}</strong> — let's go.</p>
							{/if}
						</div>
					{/if}
				</div>

				<!-- Navigation -->
				<div class="ob-wizard-nav">
					<button
						class="btn-pill btn-pill-secondary btn-pill-sm"
						onclick={() => { if (wizardStep > 1) wizardStep -= 1; }}
						disabled={wizardStep === 1}
						style="opacity: {wizardStep === 1 ? 0.3 : 1};"
						aria-label="Go back"
					>Back</button>
					<span class="ob-wizard-counter" aria-live="polite">{wizardStep} / {wizardSteps.length}</span>
					<button
						class="btn-pill btn-pill-primary btn-pill-sm"
						onclick={() => {
							if (wizardStep < wizardSteps.length) {
								wizardStep += 1;
							} else {
								showSuccess = true;
								wizardStep = 1;
								wizardName = '';
								wizardRole = '';
							}
						}}
						aria-label="{wizardStep === wizardSteps.length ? 'Finish wizard' : 'Continue to next step'}"
					>{wizardStep === wizardSteps.length ? 'Finish' : 'Continue'}</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ─────────────────────────────────────────── -->
	<!-- 7. Success / Completion Card               -->
	<!-- ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Success / Completion Card</h3>
		<p class="ds-card__sub">Celebration moment after finishing onboarding — summary of what was configured and primary CTA</p>
		<div class="ds-demo">
			<div class="ob-success-card">
				<!-- Check icon -->
				<div class="ob-success-icon" aria-hidden="true">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<path d="M22 4L12 14.01l-3-3"/>
					</svg>
				</div>
				<h3 class="ob-success-title">You're all set!</h3>
				<p class="ob-success-sub">Your MIOSA workspace is ready. Here's what we configured:</p>

				<!-- Summary list -->
				<ul class="ob-success-summary" aria-label="Configured items">
					{#each [
						'Profile created and saved',
						'GitHub integration connected',
						'Notifications enabled',
						'Dark mode applied',
					] as item}
						<li class="ob-success-summary-item">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M5 13l4 4L19 7"/>
							</svg>
							{item}
						</li>
					{/each}
				</ul>

				<!-- Divider -->
				<div class="ob-success-divider" aria-hidden="true"></div>

				<!-- CTAs -->
				<button
					class="btn-pill btn-pill-primary"
					style="width: 100%; justify-content: center;"
					aria-label="Go to dashboard"
				>
					Go to Dashboard
				</button>
				<button
					class="btn-pill btn-pill-ghost btn-pill-sm"
					style="margin-top: 10px; width: 100%; justify-content: center;"
					aria-label="Invite teammates"
				>
					Invite teammates
				</button>
			</div>
		</div>
	</div>
</section>

<style>
/* ─────────────────────────────────── */
/* Demo container                      */
/* ─────────────────────────────────── */
.ds-demo {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32px 24px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 12px;
}

/* ─────────────────────────────────── */
/* 1. Welcome Screen                  */
/* ─────────────────────────────────── */
.ob-welcome-shell {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	max-width: 340px;
	width: 100%;
	padding: 32px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 20px;
}

.ob-logo-mark {
	width: 56px;
	height: 56px;
	border-radius: 16px;
	background: var(--dbg);
	border: 1px solid var(--dbd2);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--dt2);
	margin-bottom: 20px;
}

.ob-welcome-eyebrow {
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.07em;
	text-transform: uppercase;
	color: var(--dt3);
	margin: 0 0 10px;
}

.ob-welcome-title {
	font-size: 22px;
	font-weight: 800;
	letter-spacing: -0.025em;
	color: var(--dt);
	margin: 0 0 12px;
	line-height: 1.2;
}

.ob-welcome-sub {
	font-size: 13px;
	color: var(--dt2);
	line-height: 1.65;
	margin: 0 0 20px;
	max-width: 280px;
}

.ob-welcome-divider {
	width: 100%;
	height: 1px;
	background: var(--dbd);
	margin-bottom: 20px;
}

.ob-welcome-features {
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	text-align: left;
}

.ob-welcome-feature {
	display: flex;
	align-items: flex-start;
	gap: 10px;
}

.ob-welcome-feature-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: var(--dt2);
	flex-shrink: 0;
	margin-top: 5px;
}

.ob-welcome-feature-name {
	font-size: 12px;
	font-weight: 600;
	color: var(--dt);
	display: block;
}

.ob-welcome-feature-detail {
	font-size: 11px;
	color: var(--dt3);
	display: block;
	line-height: 1.4;
	margin-top: 1px;
}

.ob-welcome-footer {
	font-size: 11px;
	color: var(--dt3);
	margin: 12px 0 0;
}

/* ─────────────────────────────────── */
/* 2. Step Indicator                  */
/* ─────────────────────────────────── */
.ob-step-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: var(--dbd2);
	border: none;
	cursor: pointer;
	transition: all 0.2s;
	flex-shrink: 0;
	padding: 0;
}

.ob-step-dot--active {
	width: 24px;
	border-radius: 5px;
	background: var(--dt);
}

.ob-step-dot--done {
	background: var(--dt2);
}

.ob-step-connector {
	flex: 1;
	height: 2px;
	background: var(--dbd);
	min-width: 16px;
	max-width: 40px;
	transition: background 0.25s;
}

.ob-step-connector--done {
	background: var(--dt2);
}

.ob-step-num {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 2px solid var(--dbd);
	background: transparent;
	color: var(--dt3);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	font-weight: 600;
	flex-shrink: 0;
	transition: all 0.2s;
}

.ob-step-num--active {
	border-color: var(--dt);
	background: var(--dbg2);
	color: var(--dt);
}

.ob-step-num--done {
	border-color: var(--dt);
	background: var(--dt);
	color: var(--dbg);
}

.ob-step-label {
	font-size: 11px;
	color: var(--dt3);
	white-space: nowrap;
}

.ob-step-label--active {
	font-weight: 600;
	color: var(--dt);
}

.ob-step-label--done {
	color: var(--dt2);
}

.ob-step-line {
	flex: 1;
	height: 2px;
	background: var(--dbd);
	margin: 0 4px;
	margin-bottom: 26px;
	min-width: 20px;
	transition: background 0.25s;
}

.ob-step-line--done {
	background: var(--dt);
}

/* ─────────────────────────────────── */
/* 3. Permission Gate                 */
/* ─────────────────────────────────── */
.ob-permission-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	max-width: 320px;
	width: 100%;
	padding: 28px 24px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 16px;
}

.ob-permission-icon {
	width: 52px;
	height: 52px;
	border-radius: 14px;
	background: var(--dbg);
	border: 1px solid var(--dbd2);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--dt2);
	margin-bottom: 18px;
}

.ob-permission-title {
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.015em;
	color: var(--dt);
	margin: 0 0 10px;
}

.ob-permission-body {
	font-size: 13px;
	color: var(--dt2);
	line-height: 1.6;
	margin: 0 0 18px;
}

.ob-permission-list {
	list-style: none;
	margin: 0 0 22px;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 7px;
}

.ob-permission-list-item {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 12px;
	color: var(--dt2);
	text-align: left;
}

.ob-permission-list-item svg {
	color: var(--dt2);
	flex-shrink: 0;
}

.ob-permission-actions {
	display: flex;
	gap: 8px;
	justify-content: center;
}

.ob-permission-result {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 14px 18px;
	border-radius: 10px;
	font-size: 13px;
	font-weight: 500;
}

.ob-permission-result--success {
	background: rgba(34, 197, 94, 0.08);
	border: 1px solid rgba(34, 197, 94, 0.2);
	color: #4ade80;
}

.ob-permission-result--skipped {
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	color: var(--dt2);
}

.ob-permission-reset {
	margin-left: auto;
	background: none;
	border: none;
	font-size: 11px;
	color: var(--dt3);
	cursor: pointer;
	text-decoration: underline;
	padding: 0;
	white-space: nowrap;
}

/* ─────────────────────────────────── */
/* 4. Feature Tour Card               */
/* ─────────────────────────────────── */
.ob-tour-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 340px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 18px;
	overflow: hidden;
}

.ob-tour-illustration {
	width: 100%;
	height: 140px;
	background: var(--dbg);
	border-bottom: 1px solid var(--dbd);
	display: flex;
	align-items: center;
	justify-content: center;
}

.ob-tour-illustration-inner {
	width: 80px;
	height: 80px;
	border-radius: 20px;
	background: var(--dbg2);
	border: 1px solid var(--dbd2);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--dt2);
}

.ob-tour-content {
	padding: 20px 24px 16px;
	text-align: center;
	width: 100%;
}

.ob-tour-title {
	font-size: 15px;
	font-weight: 700;
	letter-spacing: -0.01em;
	color: var(--dt);
	margin: 0 0 8px;
}

.ob-tour-desc {
	font-size: 13px;
	color: var(--dt2);
	line-height: 1.6;
	margin: 0;
}

.ob-tour-dots {
	display: flex;
	gap: 6px;
	padding: 4px 0 16px;
}

.ob-tour-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	border: none;
	background: var(--dbd2);
	cursor: pointer;
	padding: 0;
	transition: all 0.2s;
}

.ob-tour-dot--active {
	width: 18px;
	border-radius: 3px;
	background: var(--dt);
}

.ob-tour-nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 14px 20px;
	border-top: 1px solid var(--dbd);
}

.ob-tour-done {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 14px 18px;
	border-radius: 10px;
	background: rgba(34, 197, 94, 0.08);
	border: 1px solid rgba(34, 197, 94, 0.2);
	color: #4ade80;
	font-size: 13px;
	font-weight: 500;
}

/* ─────────────────────────────────── */
/* 5. Setup Checklist                 */
/* ─────────────────────────────────── */
.ob-checklist {
	width: 100%;
	max-width: 400px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 14px;
	overflow: hidden;
}

.ob-checklist-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 18px 20px 14px;
}

.ob-checklist-heading {
	font-size: 14px;
	font-weight: 700;
	color: var(--dt);
	margin: 0 0 3px;
}

.ob-checklist-sub {
	font-size: 12px;
	color: var(--dt3);
	margin: 0;
}

.ob-checklist-pct {
	font-size: 20px;
	font-weight: 800;
	letter-spacing: -0.02em;
	color: var(--dt);
}

.ob-checklist-bar {
	height: 3px;
	background: var(--dbd);
	margin: 0 20px 16px;
	border-radius: 2px;
	overflow: hidden;
}

.ob-checklist-bar-fill {
	height: 100%;
	background: var(--dt);
	border-radius: 2px;
	transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.ob-checklist-list {
	list-style: none;
	margin: 0;
	padding: 0 0 4px;
}

.ob-checklist-item {
	border-top: 1px solid var(--dbd);
	transition: opacity 0.2s;
}

.ob-checklist-item--done {
	opacity: 0.6;
}

.ob-checklist-label {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 13px 20px;
	cursor: pointer;
	width: 100%;
}

.ob-checklist-checkbox {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
}

.ob-checklist-custom-check {
	width: 18px;
	height: 18px;
	border-radius: 5px;
	border: 1.5px solid var(--dbd2);
	background: var(--dbg);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: all 0.15s;
	color: var(--dbg);
}

.ob-checklist-item--done .ob-checklist-custom-check {
	background: var(--dt);
	border-color: var(--dt);
}

.ob-checklist-text {
	display: flex;
	flex-direction: column;
	gap: 2px;
}

.ob-checklist-item-title {
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
}

.ob-checklist-item-desc {
	font-size: 11px;
	color: var(--dt3);
}

.ob-checklist-item--done .ob-checklist-item-title {
	text-decoration: line-through;
	color: var(--dt2);
}

.ob-checklist-complete {
	padding: 12px 20px;
	font-size: 12px;
	font-weight: 500;
	color: #4ade80;
	background: rgba(34, 197, 94, 0.06);
	border-top: 1px solid rgba(34, 197, 94, 0.15);
	text-align: center;
}

/* ─────────────────────────────────── */
/* 6. Onboarding Wizard               */
/* ─────────────────────────────────── */
.ob-wizard {
	width: 100%;
	max-width: 480px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 16px;
	overflow: hidden;
}

.ob-wizard-stepbar {
	display: flex;
	align-items: flex-start;
	padding: 18px 24px;
	border-bottom: 1px solid var(--dbd);
	background: var(--dbg);
}

.ob-wizard-step-num {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 1.5px solid var(--dbd);
	background: transparent;
	color: var(--dt3);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;
	font-weight: 700;
	flex-shrink: 0;
	transition: all 0.2s;
}

.ob-wizard-step-num--active {
	border-color: var(--dt);
	background: var(--dbg2);
	color: var(--dt);
}

.ob-wizard-step-num--done {
	border-color: var(--dt);
	background: var(--dt);
	color: var(--dbg);
}

.ob-wizard-step-label {
	font-size: 10px;
	color: var(--dt3);
	white-space: nowrap;
	margin-top: 4px;
}

.ob-wizard-step-label--active {
	font-weight: 600;
	color: var(--dt);
}

.ob-wizard-step-label--done {
	color: var(--dt2);
}

.ob-wizard-connector {
	flex: 1;
	height: 1px;
	background: var(--dbd);
	margin: 12px 8px 0;
	transition: background 0.25s;
}

.ob-wizard-connector--done {
	background: var(--dbd2);
}

.ob-wizard-body {
	padding: 28px 24px 20px;
	min-height: 160px;
}

.ob-wizard-slide {
	display: flex;
	flex-direction: column;
}

.ob-wizard-slide-title {
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.01em;
	color: var(--dt);
	margin: 0 0 8px;
}

.ob-wizard-slide-desc {
	font-size: 13px;
	color: var(--dt2);
	line-height: 1.6;
	margin: 0 0 20px;
}

.ob-wizard-illustration {
	width: 64px;
	height: 64px;
	border-radius: 16px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--dt2);
	align-self: center;
}

.ob-wizard-fields {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.ob-wizard-field {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.ob-wizard-field-label {
	font-size: 12px;
	font-weight: 600;
	color: var(--dt2);
}

.ob-wizard-input {
	height: 38px;
	padding: 0 12px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 8px;
	color: var(--dt);
	font-size: 13px;
	outline: none;
	transition: border-color 0.15s;
	font-family: inherit;
	width: 100%;
}

.ob-wizard-input::placeholder {
	color: var(--dt3);
}

.ob-wizard-input:focus {
	border-color: var(--dbd2);
}

.ob-wizard-integrations {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.ob-wizard-integration {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 14px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 8px;
}

.ob-wizard-integration-icon {
	width: 28px;
	height: 28px;
	border-radius: 7px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	font-weight: 800;
	color: var(--dt2);
	flex-shrink: 0;
}

.ob-wizard-integration-name {
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
	flex: 1;
}

.ob-wizard-integration-badge {
	font-size: 11px;
	font-weight: 600;
	color: var(--dt3);
	padding: 3px 8px;
	border-radius: 20px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
}

.ob-wizard-integration-badge--connected {
	color: #4ade80;
	background: rgba(34, 197, 94, 0.08);
	border-color: rgba(34, 197, 94, 0.2);
}

.ob-wizard-name-confirm {
	font-size: 14px;
	color: var(--dt2);
	margin: 0;
	padding: 12px 16px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 8px;
	align-self: flex-start;
}

.ob-wizard-nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14px 24px;
	border-top: 1px solid var(--dbd);
	background: var(--dbg);
}

.ob-wizard-counter {
	font-size: 12px;
	color: var(--dt3);
}

/* ─────────────────────────────────── */
/* 7. Success / Completion Card       */
/* ─────────────────────────────────── */
.ob-success-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	max-width: 340px;
	width: 100%;
	padding: 32px 28px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 20px;
}

.ob-success-icon {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background: rgba(34, 197, 94, 0.1);
	border: 1.5px solid rgba(34, 197, 94, 0.25);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #4ade80;
	margin-bottom: 20px;
}

.ob-success-title {
	font-size: 20px;
	font-weight: 800;
	letter-spacing: -0.02em;
	color: var(--dt);
	margin: 0 0 10px;
}

.ob-success-sub {
	font-size: 13px;
	color: var(--dt2);
	line-height: 1.6;
	margin: 0 0 20px;
	max-width: 260px;
}

.ob-success-summary {
	list-style: none;
	margin: 0 0 20px;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.ob-success-summary-item {
	display: flex;
	align-items: center;
	gap: 9px;
	font-size: 13px;
	color: var(--dt2);
	text-align: left;
	padding: 8px 12px;
	background: var(--dbg);
	border: 1px solid var(--dbd);
	border-radius: 8px;
}

.ob-success-summary-item svg {
	color: var(--dt2);
	flex-shrink: 0;
}

.ob-success-divider {
	width: 100%;
	height: 1px;
	background: var(--dbd);
	margin-bottom: 20px;
}

/* ─── Dark mode overrides for inverted elements ─────────────── */
:global(.dark) .ob-step-dot--active {
	background: var(--dt);
}
:global(.dark) .ob-step-num--done {
	background: var(--dt);
	border-color: var(--dt);
	color: var(--dbg);
}
:global(.dark) .ob-step-line--done {
	background: var(--dt);
}
:global(.dark) .ob-tour-dot--active {
	background: var(--dt);
}
:global(.dark) .ob-checklist-bar-fill {
	background: var(--dt);
}
:global(.dark) .ob-checklist-item--done .ob-checklist-custom-check {
	background: var(--dt);
	border-color: var(--dt);
	color: var(--dbg);
}
:global(.dark) .ob-wizard-step-num--done {
	background: var(--dt);
	border-color: var(--dt);
	color: var(--dbg);
}
</style>
