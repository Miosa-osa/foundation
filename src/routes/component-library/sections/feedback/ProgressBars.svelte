<script lang="ts">
	// Interactive demo: slider controls a progress percentage
	let sliderValue = $state(65);

	// Circular progress demo
	const circleRadius = 36;
	const circleCircumference = 2 * Math.PI * circleRadius;
	let circularPct = $derived(sliderValue);
	let circleDashoffset = $derived(circleCircumference - (circularPct / 100) * circleCircumference);

	// Step demo
	let currentStep = $state(2);
	const totalSteps = 4;
	const stepLabels = ['Setup', 'Profile', 'Plan', 'Done'];

	function prevStep() {
		if (currentStep > 1) currentStep -= 1;
	}
	function nextStep() {
		if (currentStep < totalSteps) currentStep += 1;
	}

	// Color variants for the bars
	const colorBars = [
		{ label: 'Default', pct: 60, track: 'var(--dbg3)', fill: 'linear-gradient(90deg, var(--dt4), var(--dt))' },
		{ label: 'Success', pct: 82, track: 'rgba(34,197,94,0.08)', fill: 'linear-gradient(90deg, #15803d, #22c55e)' },
		{ label: 'Warning', pct: 47, track: 'rgba(234,179,8,0.08)', fill: 'linear-gradient(90deg, #a16207, #eab308)' },
		{ label: 'Error', pct: 28, track: 'rgba(239,68,68,0.08)', fill: 'linear-gradient(90deg, #991b1b, #ef4444)' },
	];

	// Size variants
	const sizeBars = [
		{ label: 'xs (2px)', height: '2px', radius: '1px' },
		{ label: 'sm (4px)', height: '4px', radius: '2px' },
		{ label: 'md (8px)', height: '8px', radius: '4px' },
		{ label: 'lg (12px)', height: '12px', radius: '6px' },
		{ label: 'xl (16px)', height: '16px', radius: '8px' },
	];

	// Fixed-percentage showcase
	const fixedPcts = [0, 25, 50, 75, 100];
</script>

<section class="ds-section">
	<h2 class="ds-title">Progress Bars</h2>
	<p class="ds-desc">
		Linear, circular, indeterminate, labelled, and step variants — dark monochrome with gradient fills.
		Use the slider to drive live demos.
	</p>

	<!-- Interactive slider control -->
	<div class="ds-card">
		<h3 class="ds-card__title">Interactive Demo</h3>
		<p class="ds-card__sub">Drag the slider to control progress across the live examples below</p>
		<div style="display: flex; align-items: center; gap: 16px; max-width: 480px;">
			<input
				type="range"
				min="0"
				max="100"
				bind:value={sliderValue}
				style="flex: 1; accent-color: var(--dt); cursor: pointer;"
				aria-label="Progress percentage"
			/>
			<span style="font-size: 22px; font-weight: 700; color: var(--dt); min-width: 48px; text-align: right; font-variant-numeric: tabular-nums;">{sliderValue}%</span>
		</div>

		<!-- Live bar responding to slider -->
		<div style="margin-top: 20px; max-width: 480px;">
			<div style="height: 8px; border-radius: 4px; background: var(--dbg3); overflow: hidden;">
				<div style="height: 100%; width: {sliderValue}%; border-radius: 4px; background: linear-gradient(90deg, var(--dt4), var(--dt)); transition: width 0.1s;"></div>
			</div>
		</div>
	</div>

	<!-- Fixed percentage bars -->
	<div class="ds-card">
		<h3 class="ds-card__title">Progress Values</h3>
		<p class="ds-card__sub">0%, 25%, 50%, 75%, and 100% — standard monochrome gradient fill</p>
		<div style="display: flex; flex-direction: column; gap: 14px; max-width: 480px;">
			{#each fixedPcts as pct}
				<div style="display: flex; align-items: center; gap: 14px;">
					<span style="font-size: 12px; color: var(--dt2); min-width: 36px; font-variant-numeric: tabular-nums;">{pct}%</span>
					<div style="flex: 1; height: 8px; border-radius: 4px; background: var(--dbg3); overflow: hidden;">
						<div style="height: 100%; width: {pct}%; border-radius: 4px; background: {pct === 100 ? 'var(--dt)' : 'linear-gradient(90deg, var(--dt4), var(--dt3))'}; transition: width 0.3s;"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Size variants -->
	<div class="ds-card">
		<h3 class="ds-card__title">Size Variants</h3>
		<p class="ds-card__sub">xs through xl — same 65% fill across all heights</p>
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
			{#each sizeBars as bar}
				<div style="display: flex; align-items: center; gap: 14px;">
					<span style="font-size: 11px; color: var(--dt3); min-width: 68px;">{bar.label}</span>
					<div style="flex: 1; height: {bar.height}; border-radius: {bar.radius}; background: var(--dbg3); overflow: hidden;">
						<div style="height: 100%; width: 65%; border-radius: {bar.radius}; background: linear-gradient(90deg, var(--dt4), var(--dt3));"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Color variants -->
	<div class="ds-card">
		<h3 class="ds-card__title">Color Variants</h3>
		<p class="ds-card__sub">Default, success, warning, and error — semantic gradient fills</p>
		<div style="display: flex; flex-direction: column; gap: 14px; max-width: 480px;">
			{#each colorBars as bar}
				<div style="display: flex; align-items: center; gap: 14px;">
					<span style="font-size: 12px; color: var(--dt2); min-width: 60px;">{bar.label}</span>
					<div style="flex: 1; height: 8px; border-radius: 4px; background: {bar.track}; overflow: hidden;">
						<div style="height: 100%; width: {bar.pct}%; border-radius: 4px; background: {bar.fill}; transition: width 0.3s;"></div>
					</div>
					<span style="font-size: 11px; color: var(--dt3); min-width: 32px; text-align: right; font-variant-numeric: tabular-nums;">{bar.pct}%</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Progress with label -->
	<div class="ds-card">
		<h3 class="ds-card__title">Progress with Labels</h3>
		<p class="ds-card__sub">Labelled bars — header label + percentage, and task-name variants</p>
		<div style="display: flex; flex-direction: column; gap: 20px; max-width: 480px;">

			<!-- Labeled with percentage text above -->
			<div>
				<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
					<span style="font-size: 13px; font-weight: 500; color: var(--dt3);">Storage used</span>
					<span style="font-size: 13px; font-weight: 700; color: var(--dt); font-variant-numeric: tabular-nums;">{sliderValue}%</span>
				</div>
				<div style="height: 8px; border-radius: 4px; background: var(--dbg3); overflow: hidden;">
					<div style="height: 100%; width: {sliderValue}%; border-radius: 4px; background: linear-gradient(90deg, #333, #fff); transition: width 0.1s;"></div>
				</div>
				<div style="display: flex; justify-content: space-between; margin-top: 4px;">
					<span style="font-size: 11px; color: var(--dt4);">{Math.round(sliderValue * 0.85)} GB used</span>
					<span style="font-size: 11px; color: var(--dt4);">85 GB total</span>
				</div>
			</div>

			<!-- Task progress list -->
			{#each [
				{ name: 'Database migration', pct: 100, color: '#22c55e' },
				{ name: 'API endpoints', pct: 78, color: 'var(--dt)' },
				{ name: 'Frontend components', pct: 45, color: 'var(--dt)' },
				{ name: 'Documentation', pct: 12, color: '#eab308' },
			] as task}
				<div>
					<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
						<span style="font-size: 12px; color: var(--dt3);">{task.name}</span>
						<span style="font-size: 12px; font-weight: 600; color: {task.color}; font-variant-numeric: tabular-nums;">{task.pct}%</span>
					</div>
					<div style="height: 4px; border-radius: 2px; background: var(--dbg2); overflow: hidden;">
						<div style="height: 100%; width: {task.pct}%; border-radius: 2px; background: {task.color}; opacity: {task.pct === 100 ? 1 : 0.85};"></div>
					</div>
				</div>
			{/each}

		</div>
	</div>

	<!-- Indeterminate -->
	<div class="ds-card">
		<h3 class="ds-card__title">Indeterminate</h3>
		<p class="ds-card__sub">Animated shimmer for unknown-duration operations</p>
		<div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px;">
			<div style="height: 4px; border-radius: 2px; background: var(--dbg3); overflow: hidden;">
				<div class="progress-indeterminate" style="height: 100%; width: 40%; border-radius: 2px; background: linear-gradient(90deg, transparent, var(--dt), transparent);"></div>
			</div>
			<div style="height: 8px; border-radius: 4px; background: var(--dbg3); overflow: hidden;">
				<div class="progress-indeterminate progress-indeterminate--slow" style="height: 100%; width: 40%; border-radius: 4px; background: linear-gradient(90deg, transparent, var(--dt2), transparent);"></div>
			</div>
			<div style="height: 3px; border-radius: 0; background: var(--dbg); overflow: hidden;">
				<div class="progress-indeterminate" style="height: 100%; width: 30%; background: linear-gradient(90deg, transparent, #22c55e, transparent);"></div>
			</div>
		</div>
	</div>

	<!-- Circular progress -->
	<div class="ds-card">
		<h3 class="ds-card__title">Circular / Ring Progress</h3>
		<p class="ds-card__sub">SVG stroke-dashoffset rings — driven by the slider above</p>
		<div class="ds-demo" style="gap: 32px; flex-wrap: wrap;">

			<!-- Main interactive ring -->
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="position: relative; width: 96px; height: 96px;">
					<svg width="96" height="96" viewBox="0 0 96 96" style="transform: rotate(-90deg);">
						<!-- Track -->
						<circle cx="48" cy="48" r="{circleRadius}" fill="none" stroke="var(--dbg3)" stroke-width="6"/>
						<!-- Fill -->
						<circle
							cx="48" cy="48" r="{circleRadius}"
							fill="none"
							stroke="var(--dt)"
							stroke-width="6"
							stroke-linecap="round"
							stroke-dasharray="{circleCircumference}"
							stroke-dashoffset="{circleDashoffset}"
							style="transition: stroke-dashoffset 0.2s ease;"
						/>
					</svg>
					<div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
						<span style="font-size: 18px; font-weight: 700; color: var(--dt); font-variant-numeric: tabular-nums;">{circularPct}%</span>
					</div>
				</div>
				<span style="font-size: 11px; color: var(--dt3);">Interactive</span>
			</div>

			<!-- Fixed size rings -->
			{#each [
				{ pct: 25, size: 72, r: 28, sw: 5, color: '#eab308', label: '25%' },
				{ pct: 60, size: 72, r: 28, sw: 5, color: '#22c55e', label: '60%' },
				{ pct: 100, size: 72, r: 28, sw: 5, color: '#3b82f6', label: '100%' },
			] as ring}
				{@const circ = 2 * Math.PI * ring.r}
				{@const offset = circ - (ring.pct / 100) * circ}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
					<div style="position: relative; width: {ring.size}px; height: {ring.size}px;">
						<svg width="{ring.size}" height="{ring.size}" viewBox="0 0 {ring.size} {ring.size}" style="transform: rotate(-90deg);">
							<circle cx="{ring.size / 2}" cy="{ring.size / 2}" r="{ring.r}" fill="none" stroke="var(--dbg3)" stroke-width="{ring.sw}"/>
							<circle
								cx="{ring.size / 2}" cy="{ring.size / 2}" r="{ring.r}"
								fill="none"
								stroke="{ring.color}"
								stroke-width="{ring.sw}"
								stroke-linecap="round"
								stroke-dasharray="{circ}"
								stroke-dashoffset="{offset}"
							/>
						</svg>
						<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
							<span style="font-size: 13px; font-weight: 700; color: var(--dt);">{ring.pct}%</span>
						</div>
					</div>
					<span style="font-size: 11px; color: var(--dt3);">{ring.label}</span>
				</div>
			{/each}

			<!-- Small ring variant -->
			{#each [48, 60, 82, 95] as pct}
				{@const r = 14}
				{@const circ = 2 * Math.PI * r}
				{@const offset = circ - (pct / 100) * circ}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<svg width="36" height="36" viewBox="0 0 36 36" style="transform: rotate(-90deg);">
						<circle cx="18" cy="18" r="{r}" fill="none" stroke="var(--dbg3)" stroke-width="3"/>
						<circle cx="18" cy="18" r="{r}" fill="none" stroke="var(--dt2)" stroke-width="3" stroke-linecap="round" stroke-dasharray="{circ}" stroke-dashoffset="{offset}"/>
					</svg>
					<span style="font-size: 10px; color: var(--dt3);">{pct}%</span>
				</div>
			{/each}

		</div>
	</div>

	<!-- Step progress -->
	<div class="ds-card">
		<h3 class="ds-card__title">Step Progress</h3>
		<p class="ds-card__sub">Multi-step wizard indicator — dots, connector lines, and step labels</p>

		<!-- Dot variant -->
		<div>
			<h4 class="ds-card__h4">Dot Variant</h4>
			<div style="display: flex; align-items: center; gap: 0; max-width: 360px; margin-bottom: 12px;">
				{#each Array(totalSteps) as _, i}
					{@const stepNum = i + 1}
					{@const done = stepNum < currentStep}
					{@const active = stepNum === currentStep}
					<!-- Dot -->
					<div style="position: relative; display: flex; flex-direction: column; align-items: center; flex: 1;">
						<div style="
							width: {active ? '28px' : '20px'};
							height: {active ? '28px' : '20px'};
							border-radius: 50%;
							background: {done ? 'var(--dt)' : active ? 'var(--dbg2)' : 'var(--dbg)'};
							border: 2px solid {done ? 'var(--dt)' : active ? 'var(--dbd2)' : 'var(--dbd)'};
							display: flex; align-items: center; justify-content: center;
							transition: all 0.2s;
							z-index: 1;
						">
							{#if done}
								<svg width="11" height="11" fill="none" stroke="#000" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							{:else}
								<span style="font-size: {active ? '12px' : '10px'}; font-weight: 700; color: {active ? 'var(--dt)' : 'var(--dt3)'};">{stepNum}</span>
							{/if}
						</div>
						<span style="font-size: 10px; color: {active ? 'var(--dt3)' : done ? 'var(--dt2)' : 'var(--dt4)'}; margin-top: 6px; white-space: nowrap;">{stepLabels[i]}</span>
					</div>
					<!-- Connector (not after last dot) -->
					{#if i < totalSteps - 1}
						<div style="flex: 1; height: 2px; background: {stepNum < currentStep ? 'var(--dt)' : 'var(--dbg3)'}; margin-bottom: 16px; transition: background 0.3s;"></div>
					{/if}
				{/each}
			</div>

			<!-- Controls -->
			<div style="display: flex; gap: 8px; margin-top: 8px;">
				<button
					onclick={prevStep}
					disabled={currentStep === 1}
					style="padding: 7px 16px; border-radius: 7px; border: 1px solid var(--dbd); background: var(--dbg); color: {currentStep === 1 ? 'var(--dt4)' : 'var(--dt3)'}; font-size: 12px; font-weight: 500; cursor: {currentStep === 1 ? 'not-allowed' : 'pointer'};"
				>
					Back
				</button>
				<button
					onclick={nextStep}
					disabled={currentStep === totalSteps}
					style="padding: 7px 16px; border-radius: 7px; border: 1px solid {currentStep === totalSteps ? 'var(--dbg)' : 'var(--dbd2)'}; background: {currentStep === totalSteps ? 'var(--dbg)' : 'var(--dbg2)'}; color: {currentStep === totalSteps ? 'var(--dt4)' : 'var(--dt3)'}; font-size: 12px; font-weight: 500; cursor: {currentStep === totalSteps ? 'not-allowed' : 'pointer'};"
				>
					{currentStep === totalSteps ? 'Done' : 'Next'}
				</button>
				<span style="font-size: 12px; color: var(--dt3); display: flex; align-items: center; margin-left: 4px;">
					Step {currentStep} of {totalSteps}
				</span>
			</div>
		</div>

		<!-- Segmented bar variant -->
		<div style="margin-top: 24px;">
			<h4 class="ds-card__h4">Segmented Bar</h4>
			<div style="display: flex; gap: 4px; max-width: 360px;">
				{#each Array(totalSteps) as _, i}
					<div style="
						flex: 1; height: 4px; border-radius: 2px;
						background: {i + 1 <= currentStep ? 'var(--dt)' : 'var(--dbg3)'};
						transition: background 0.3s;
					"></div>
				{/each}
			</div>
			<div style="font-size: 11px; color: var(--dt3); margin-top: 6px;">{currentStep} / {totalSteps} steps complete</div>
		</div>

		<!-- Inline "1 of 4" text style -->
		<div style="margin-top: 24px;">
			<h4 class="ds-card__h4">Inline Text</h4>
			<div style="display: flex; align-items: center; gap: 12px;">
				<div style="display: flex; gap: 3px;">
					{#each Array(totalSteps) as _, i}
						<div style="width: {i + 1 === currentStep ? '20px' : '6px'}; height: 6px; border-radius: 3px; background: {i + 1 <= currentStep ? 'var(--dt)' : 'var(--dbg3)'}; transition: all 0.25s;"></div>
					{/each}
				</div>
				<span style="font-size: 12px; color: var(--dt2);">Step {currentStep} of {totalSteps} — {stepLabels[currentStep - 1]}</span>
			</div>
		</div>
	</div>

	<!-- In context: upload / task cards -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context</h3>
		<p class="ds-card__sub">Progress bars composing inside real-world cards</p>
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-width: 560px;">

			<!-- Upload card -->
			<div style="padding: 16px; border-radius: 12px; background: var(--dbg); border: 1px solid var(--dbd);">
				<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
					<div style="width: 34px; height: 34px; border-radius: 8px; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
						<svg width="16" height="16" fill="none" stroke="var(--dt2)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
					</div>
					<div style="flex: 1; min-width: 0;">
						<div style="font-size: 13px; font-weight: 600; color: var(--dt3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">report-q4.pdf</div>
						<div style="font-size: 11px; color: var(--dt3);">2.4 MB · Uploading</div>
					</div>
				</div>
				<div style="height: 4px; border-radius: 2px; background: var(--dbg3); overflow: hidden;">
					<div style="height: 100%; width: {sliderValue}%; border-radius: 2px; background: linear-gradient(90deg, var(--dt4), var(--dt3)); transition: width 0.1s;"></div>
				</div>
				<div style="font-size: 11px; color: var(--dt3); margin-top: 5px; text-align: right; font-variant-numeric: tabular-nums;">{sliderValue}%</div>
			</div>

			<!-- Storage card -->
			<div style="padding: 16px; border-radius: 12px; background: var(--dbg); border: 1px solid var(--dbd);">
				<div style="font-size: 12px; font-weight: 600; color: var(--dt3); margin-bottom: 12px;">Storage</div>
				{#each [
					{ label: 'Documents', pct: 38, color: 'var(--dt)' },
					{ label: 'Media', pct: 61, color: 'var(--dt2)' },
					{ label: 'Backups', pct: 15, color: 'var(--dt3)' },
				] as item}
					<div style="margin-bottom: 10px;">
						<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
							<span style="font-size: 11px; color: var(--dt2);">{item.label}</span>
							<span style="font-size: 11px; color: var(--dt3); font-variant-numeric: tabular-nums;">{item.pct}%</span>
						</div>
						<div style="height: 3px; border-radius: 2px; background: var(--dbg2); overflow: hidden;">
							<div style="height: 100%; width: {item.pct}%; background: {item.color};"></div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Onboarding checklist -->
			<div style="padding: 16px; border-radius: 12px; background: var(--dbg); border: 1px solid var(--dbd); grid-column: span 2;">
				<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
					<span style="font-size: 13px; font-weight: 600; color: var(--dt3);">Onboarding</span>
					<span style="font-size: 12px; color: var(--dt3);">3 / 5 complete</span>
				</div>
				<div style="height: 6px; border-radius: 3px; background: var(--dbg2); overflow: hidden; margin-bottom: 14px;">
					<div style="height: 100%; width: 60%; border-radius: 3px; background: linear-gradient(90deg, #1d4ed8, #3b82f6);"></div>
				</div>
				<div style="display: flex; gap: 3px;">
					{#each [true, true, true, false, false] as done}
						<div style="flex: 1; height: 3px; border-radius: 2px; background: {done ? '#3b82f6' : 'var(--dbg3)'};"></div>
					{/each}
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	@keyframes progress-slide {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(350%); }
	}

	.progress-indeterminate {
		animation: progress-slide 1.4s ease-in-out infinite;
	}

	.progress-indeterminate--slow {
		animation-duration: 2s;
		animation-timing-function: linear;
	}
</style>
