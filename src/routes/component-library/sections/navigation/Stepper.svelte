<script lang="ts">
	// Horizontal interactive stepper
	let hStep = $state(2);
	const hSteps = [
		{ label: 'Account', desc: 'Email and password' },
		{ label: 'Profile', desc: 'Name and avatar' },
		{ label: 'Plan', desc: 'Choose a tier' },
		{ label: 'Review', desc: 'Confirm details' },
	];

	// Vertical interactive stepper
	let vStep = $state(2);
	const vSteps = [
		{ label: 'Connect repository', desc: 'Authorize GitHub access and select a repo.' },
		{ label: 'Configure pipeline', desc: 'Set build commands, environment variables, and secrets.' },
		{ label: 'Deploy to staging', desc: 'Run the pipeline and verify output on the staging URL.' },
		{ label: 'Promote to production', desc: 'Approve and ship to Cloud Run with zero downtime.' },
	];

	// Full wizard — content per step
	let wizardStep = $state(1);
	const wizardSteps = ['Details', 'Stack', 'Team', 'Ship'];
	const wizardContent: Record<number, { heading: string; body: string }> = {
		1: { heading: 'Project Details', body: 'Give your project a name, description, and primary language so your team knows what it does at a glance.' },
		2: { heading: 'Tech Stack', body: 'Select the frameworks and services your project uses. This helps MIOSA auto-configure templates and CI/CD defaults.' },
		3: { heading: 'Invite Team', body: 'Add collaborators by email. They will receive an invite and can accept within 48 hours.' },
		4: { heading: 'Launch', body: 'Everything is set. Click Ship to create the project, trigger the first pipeline run, and notify your team.' },
	};

	// Stepper with error state
	let errorStep = $state(2);
	const errorSteps = ['Validate', 'Migrate', 'Verify', 'Done'];
	const hasError = 2; // step 2 has an error
</script>

<section class="ds-section">
	<h2 class="ds-title">Stepper</h2>
	<p class="ds-desc">
		Step and wizard patterns for multi-phase flows. Horizontal, vertical, interactive, dot, and
		error-state variants — dark monochrome with clear completed / active / upcoming states.
	</p>

	<!-- Horizontal stepper static showcase -->
	<div class="ds-card">
		<h3 class="ds-card__title">Horizontal Stepper — States</h3>
		<p class="ds-card__sub">Completed, active, and upcoming across a four-step wizard</p>
		<div style="max-width: 560px;">
			<div style="display: flex; align-items: center;">
				{#each hSteps as step, i}
					{@const num = i + 1}
					{@const done = num < hStep}
					{@const active = num === hStep}
					<div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;">
						<!-- Circle -->
						<div style="
							width: 32px; height: 32px; border-radius: 50%;
							background: {done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'transparent'};
							border: 2px solid {done ? 'var(--dt)' : active ? 'var(--dt)' : 'var(--dbd)'};
							color: {done ? '#000' : active ? 'var(--dt)' : 'var(--dt4)'};
							display: flex; align-items: center; justify-content: center;
							font-size: 13px; font-weight: 600; flex-shrink: 0;
						">
							{#if done}
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{:else}
								{num}
							{/if}
						</div>
						<!-- Label -->
						<span style="font-size: 11px; font-weight: {active ? 600 : 400}; color: {done ? 'var(--dt2)' : active ? 'var(--dt)' : 'var(--dt4)'}; white-space: nowrap;">{step.label}</span>
					</div>
					<!-- Connector -->
					{#if i < hSteps.length - 1}
						<div style="flex: 1; height: 2px; background: {done ? 'var(--dt)' : 'var(--dbg3)'}; margin: 0 6px; margin-bottom: 28px; min-width: 24px; transition: background 0.3s;"></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- Interactive horizontal stepper -->
	<div class="ds-card">
		<h3 class="ds-card__title">Interactive Horizontal Stepper</h3>
		<p class="ds-card__sub">Navigate with Previous / Next buttons</p>
		<div style="max-width: 560px;">
			<!-- Steps -->
			<div style="display: flex; align-items: center; margin-bottom: 28px;">
				{#each hSteps as step, i}
					{@const num = i + 1}
					{@const done = num < hStep}
					{@const active = num === hStep}
					<div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;">
						<div style="
							width: 32px; height: 32px; border-radius: 50%;
							background: {done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'transparent'};
							border: 2px solid {done ? 'var(--dt)' : active ? 'var(--dt)' : 'var(--dbd)'};
							color: {done ? '#000' : active ? 'var(--dt)' : 'var(--dt4)'};
							display: flex; align-items: center; justify-content: center;
							font-size: 13px; font-weight: 600; transition: all 0.2s;
						">
							{#if done}
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{:else}
								{num}
							{/if}
						</div>
						<div style="text-align: center;">
							<div style="font-size: 11px; font-weight: {active ? 600 : 400}; color: {done ? 'var(--dt2)' : active ? 'var(--dt)' : 'var(--dt4)'}; white-space: nowrap;">{step.label}</div>
							<div style="font-size: 10px; color: var(--dt4); white-space: nowrap;">{step.desc}</div>
						</div>
					</div>
					{#if i < hSteps.length - 1}
						<div style="flex: 1; height: 2px; background: {done ? 'var(--dt)' : 'var(--dbg3)'}; margin: 0 6px; margin-bottom: 28px; transition: background 0.25s;"></div>
					{/if}
				{/each}
			</div>
			<!-- Controls -->
			<div style="display: flex; align-items: center; gap: 10px;">
				<button
					class="btn-pill btn-pill-secondary btn-pill-sm"
					onclick={() => { if (hStep > 1) hStep -= 1; }}
					disabled={hStep === 1}
					style="opacity: {hStep === 1 ? 0.35 : 1};"
					aria-label="Previous step"
				>
					Previous
				</button>
				<button
					class="btn-pill btn-pill-primary btn-pill-sm"
					onclick={() => { if (hStep < hSteps.length) hStep += 1; }}
					disabled={hStep === hSteps.length}
					style="opacity: {hStep === hSteps.length ? 0.35 : 1};"
					aria-label="Next step"
				>
					{hStep === hSteps.length ? 'Finish' : 'Next'}
				</button>
				<span style="font-size: 12px; color: var(--dt4); margin-left: 4px;">Step {hStep} of {hSteps.length}</span>
			</div>
		</div>
	</div>

	<!-- Vertical stepper -->
	<div class="ds-card">
		<h3 class="ds-card__title">Vertical Stepper</h3>
		<p class="ds-card__sub">Steps stacked vertically with expanded descriptions and navigation</p>
		<div style="max-width: 480px;">
			{#each vSteps as step, i}
				{@const num = i + 1}
				{@const done = num < vStep}
				{@const active = num === vStep}
				<div style="display: flex; gap: 14px; position: relative;">
					<!-- Circle + connector -->
					<div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 32px;">
						<div style="
							width: 32px; height: 32px; border-radius: 50%;
							background: {done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'transparent'};
							border: 2px solid {done ? 'var(--dt)' : active ? 'var(--dt)' : 'var(--dbd)'};
							color: {done ? '#000' : active ? 'var(--dt)' : 'var(--dt4)'};
							display: flex; align-items: center; justify-content: center;
							font-size: 13px; font-weight: 600; flex-shrink: 0; z-index: 1; transition: all 0.2s;
						">
							{#if done}
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{:else}
								{num}
							{/if}
						</div>
						{#if i < vSteps.length - 1}
							<div style="width: 2px; flex: 1; min-height: 12px; background: {done ? 'var(--dbd2)' : 'var(--dbd)'}; margin-top: 4px; transition: background 0.25s;"></div>
						{/if}
					</div>
					<!-- Content -->
					<div style="flex: 1; padding-bottom: 24px; padding-top: 4px;">
						<div style="font-size: 13px; font-weight: 600; color: {done ? 'var(--dt2)' : active ? 'var(--dt)' : 'var(--dt4)'}; margin-bottom: 4px;">{step.label}</div>
						<div style="font-size: 12px; color: {active ? 'var(--dt2)' : 'var(--dt4)'}; line-height: 1.5; max-width: 360px;">{step.desc}</div>
						{#if active}
							<div style="display: flex; gap: 8px; margin-top: 14px;">
								<button
									class="btn-pill btn-pill-secondary btn-pill-sm"
									onclick={() => { if (vStep > 1) vStep -= 1; }}
									disabled={vStep === 1}
									style="opacity: {vStep === 1 ? 0.35 : 1};"
									aria-label="Go to previous step"
								>Back</button>
								<button
									class="btn-pill btn-pill-primary btn-pill-sm"
									onclick={() => { if (vStep < vSteps.length) vStep += 1; }}
									aria-label="Continue to next step"
								>{vStep === vSteps.length ? 'Finish' : 'Continue'}</button>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Full wizard with content per step -->
	<div class="ds-card">
		<h3 class="ds-card__title">Wizard with Step Content</h3>
		<p class="ds-card__sub">Each step renders unique content below the step bar</p>
		<div style="max-width: 520px; border: 1px solid var(--dbd); border-radius: 12px; overflow: hidden;">
			<!-- Step bar -->
			<div style="padding: 20px 24px; border-bottom: 1px solid var(--dbd); display: flex; align-items: center; gap: 0; background: var(--dbg);">
				{#each wizardSteps as label, i}
					{@const num = i + 1}
					{@const done = num < wizardStep}
					{@const active = num === wizardStep}
					<div style="display: flex; align-items: center; flex: {i < wizardSteps.length - 1 ? '1' : '0'};">
						<div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
							<div style="
								width: 24px; height: 24px; border-radius: 50%;
								background: {done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'transparent'};
								border: 1.5px solid {done ? 'var(--dt)' : active ? 'var(--dt)' : 'var(--dbd)'};
								color: {done ? '#000' : active ? 'var(--dt)' : 'var(--dt4)'};
								display: flex; align-items: center; justify-content: center;
								font-size: 11px; font-weight: 700; flex-shrink: 0; transition: all 0.2s;
							">
								{#if done}
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
								{:else}
									{num}
								{/if}
							</div>
							<span style="font-size: 12px; font-weight: {active ? 600 : 400}; color: {done ? 'var(--dt2)' : active ? 'var(--dt)' : 'var(--dt4)'}; white-space: nowrap;">{label}</span>
						</div>
						{#if i < wizardSteps.length - 1}
							<div style="flex: 1; height: 1px; background: {done ? 'var(--dbd2)' : 'var(--dbd)'}; margin: 0 10px; transition: background 0.25s;"></div>
						{/if}
					</div>
				{/each}
			</div>
			<!-- Step content -->
			<div style="padding: 28px 24px;">
				<h4 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: var(--dt);">{wizardContent[wizardStep].heading}</h4>
				<p style="margin: 0 0 24px; font-size: 13px; color: var(--dt2); line-height: 1.6;">{wizardContent[wizardStep].body}</p>
				<div style="display: flex; gap: 10px; justify-content: flex-end;">
					{#if wizardStep > 1}
						<button
							class="btn-pill btn-pill-secondary btn-pill-sm"
							onclick={() => wizardStep -= 1}
							aria-label="Go back"
						>Back</button>
					{/if}
					<button
						class="btn-pill btn-pill-primary btn-pill-sm"
						onclick={() => { if (wizardStep < wizardSteps.length) wizardStep += 1; else wizardStep = 1; }}
						aria-label="{wizardStep === wizardSteps.length ? 'Ship project' : 'Continue'}"
					>
						{wizardStep === wizardSteps.length ? 'Ship it' : 'Continue'}
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Stepper with icons -->
	<div class="ds-card">
		<h3 class="ds-card__title">Stepper with Icons</h3>
		<p class="ds-card__sub">Replace step numbers with domain-specific icons</p>
		<div style="max-width: 480px;">
			{#each [
				{ label: 'Connect', icon: `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`, status: 'complete' },
				{ label: 'Configure', icon: `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`, status: 'active' },
				{ label: 'Deploy', icon: `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/></svg>`, status: 'upcoming' },
				{ label: 'Monitor', icon: `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`, status: 'upcoming' },
			] as step, i}
				{@const done = step.status === 'complete'}
				{@const active = step.status === 'active'}
				<div style="display: flex; gap: 14px; position: relative;">
					<div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 36px;">
						<div style="
							width: 36px; height: 36px; border-radius: 10px;
							background: {done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'transparent'};
							border: 1.5px solid {done ? 'var(--dt)' : active ? 'var(--dbd2)' : 'var(--dbd)'};
							color: {done ? '#000' : active ? 'var(--dt)' : 'var(--dt4)'};
							display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1;
						">
							{@html step.icon}
						</div>
						{#if i < 3}
							<div style="width: 2px; flex: 1; min-height: 12px; background: {done ? 'var(--dbd2)' : 'var(--dbd)'}; margin-top: 4px;"></div>
						{/if}
					</div>
					<div style="flex: 1; padding-bottom: 20px; padding-top: 7px;">
						<span style="font-size: 13px; font-weight: {active ? 600 : 400}; color: {done ? 'var(--dt2)' : active ? 'var(--dt)' : 'var(--dt4)'};">{step.label}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Compact dot stepper -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact Dot Stepper</h3>
		<p class="ds-card__sub">Minimal dots with no labels — progress indicator only</p>
		<div style="display: flex; flex-direction: column; gap: 20px;">
			{#each [2, 3, 4, 1] as active, ri}
				{@const total = 5}
				<div style="display: flex; align-items: center; gap: 0;">
					{#each Array(total) as _, i}
						{@const num = i + 1}
						{@const done = num < active}
						{@const isCurrent = num === active}
						<div style="width: {isCurrent ? '24px' : '8px'}; height: 8px; border-radius: 4px; background: {done ? 'var(--dt)' : isCurrent ? 'var(--dt)' : 'var(--dbg3)'}; transition: all 0.25s; flex-shrink: 0; {i < total - 1 ? 'margin-right: 5px;' : ''}"></div>
					{/each}
					<span style="font-size: 11px; color: var(--dt4); margin-left: 12px;">{active} / {total}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Error state stepper -->
	<div class="ds-card">
		<h3 class="ds-card__title">Error State</h3>
		<p class="ds-card__sub">Step fails validation — error indicator on the offending step</p>
		<div style="max-width: 480px;">
			<div style="display: flex; align-items: center; margin-bottom: 16px;">
				{#each errorSteps as label, i}
					{@const num = i + 1}
					{@const done = num < errorStep && num !== hasError}
					{@const active = num === errorStep}
					{@const isError = num === hasError}
					<div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;">
						<div style="
							width: 32px; height: 32px; border-radius: 50%;
							background: {isError ? 'rgba(239,68,68,0.1)' : done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'transparent'};
							border: 2px solid {isError ? '#ef4444' : done ? 'var(--dt)' : active ? 'var(--dt)' : 'var(--dbd)'};
							color: {isError ? '#ef4444' : done ? '#000' : active ? 'var(--dt)' : 'var(--dt4)'};
							display: flex; align-items: center; justify-content: center;
							font-size: 13px; font-weight: 700;
						">
							{#if isError}
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
							{:else if done}
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{:else}
								{num}
							{/if}
						</div>
						<span style="font-size: 11px; font-weight: {active || isError ? 600 : 400}; color: {isError ? '#ef4444' : done ? 'var(--dt2)' : active ? 'var(--dt)' : 'var(--dt4)'}; white-space: nowrap;">{label}</span>
					</div>
					{#if i < errorSteps.length - 1}
						<div style="flex: 1; height: 2px; background: {done && i + 1 !== hasError - 1 ? 'var(--dt)' : 'var(--dbg3)'}; margin: 0 6px; margin-bottom: 28px;"></div>
					{/if}
				{/each}
			</div>
			<!-- Error message -->
			<div style="padding: 12px 14px; border-radius: 8px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); display: flex; gap: 10px; align-items: flex-start;">
				<svg style="width: 14px; height: 14px; flex-shrink: 0; color: #ef4444; margin-top: 1px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				<div>
					<div style="font-size: 13px; font-weight: 600; color: #ef4444; margin-bottom: 2px;">Migration failed</div>
					<div style="font-size: 12px; color: #994444; line-height: 1.4;">Schema validation error at table <code style="font-family: monospace; background: rgba(239,68,68,0.1); padding: 1px 4px; border-radius: 3px;">users_v2</code>. Fix the error and retry step 2.</div>
				</div>
			</div>
		</div>
	</div>
</section>
