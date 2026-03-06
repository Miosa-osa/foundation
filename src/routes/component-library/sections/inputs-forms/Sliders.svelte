<script lang="ts">
	// ── Basic slider ──────────────────────────────────────────────
	let basicValue = $state(50);

	// ── Min/max labels ────────────────────────────────────────────
	let rangeValue = $state(30);

	// ── Step markers ─────────────────────────────────────────────
	let stepValue = $state(3);

	// ── Color variants ────────────────────────────────────────────
	let colorDefault = $state(65);
	let colorSuccess = $state(80);
	let colorWarning = $state(40);

	// ── Volume slider ─────────────────────────────────────────────
	let volume = $state(72);

	// ── Dual-thumb range (concept) ────────────────────────────────
	let rangeMin = $state(20);
	let rangeMax = $state(75);

	// ── Size demos ────────────────────────────────────────────────
	let sizeSm = $state(60);
	let sizeMd = $state(60);
	let sizeLg = $state(60);

	// ── Derived helpers ───────────────────────────────────────────
	const stepLabels = [0, 1, 2, 3, 4, 5];
	const stepNames = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

	function volumeIcon(v: number) {
		if (v === 0) return 'muted';
		if (v < 40) return 'low';
		if (v < 75) return 'mid';
		return 'high';
	}

	function clampRangeMin(v: number) {
		if (v >= rangeMax - 5) rangeMin = rangeMax - 5;
		else rangeMin = v;
	}

	function clampRangeMax(v: number) {
		if (v <= rangeMin + 5) rangeMax = rangeMin + 5;
		else rangeMax = v;
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Sliders</h2>
	<p class="ds-desc">
		Range input patterns — from basic value pickers to dual-thumb ranges. Built on
		<code>input[type=range]</code> with custom track and thumb styling for the dark
		monochrome aesthetic.
	</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  BASIC SLIDER                                               -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Basic Slider</h3>
		<p class="ds-card__sub">Single-value picker with live readout. Drag to interact.</p>
		<div class="ds-demo-col" style="max-width: 480px;">
			<div class="sl-row">
				<input
					type="range"
					min="0"
					max="100"
					bind:value={basicValue}
					class="sl-track"
					style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {basicValue}%, var(--sl-empty) {basicValue}%, var(--sl-empty) 100%);"
				/>
				<span class="sl-value">{basicValue}</span>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  MIN / MAX LABELS                                           -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Slider with Min / Max Labels</h3>
		<p class="ds-card__sub">Boundary labels give the range immediate context.</p>
		<div class="ds-demo-col" style="max-width: 480px;">
			<div>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={rangeValue}
						class="sl-track"
						style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {rangeValue}%, var(--sl-empty) {rangeValue}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value">{rangeValue}%</span>
				</div>
				<div class="sl-minmax">
					<span>0%</span>
					<span>50%</span>
					<span>100%</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  SIZES                                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Slider Sizes</h3>
		<p class="ds-card__sub">
			Track height variants: <code>sm</code> (2px), <code>md</code> (6px, default),
			<code>lg</code> (12px).
		</p>
		<div class="ds-demo-col" style="max-width: 480px; gap: 24px;">
			<div>
				<p class="sl-size-label">sm — 2px track</p>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={sizeSm}
						class="sl-track sl-track--sm"
						style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {sizeSm}%, var(--sl-empty) {sizeSm}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value">{sizeSm}</span>
				</div>
			</div>
			<div>
				<p class="sl-size-label">md — 6px track (default)</p>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={sizeMd}
						class="sl-track sl-track--md"
						style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {sizeMd}%, var(--sl-empty) {sizeMd}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value">{sizeMd}</span>
				</div>
			</div>
			<div>
				<p class="sl-size-label">lg — 12px track</p>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={sizeLg}
						class="sl-track sl-track--lg"
						style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {sizeLg}%, var(--sl-empty) {sizeLg}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value">{sizeLg}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  STEP MARKERS                                               -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Slider with Step Markers</h3>
		<p class="ds-card__sub">Snaps to discrete values with tick labels below the track.</p>
		<div class="ds-demo-col" style="max-width: 480px;">
			<div>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="5"
						step="1"
						bind:value={stepValue}
						class="sl-track"
						style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {(stepValue / 5) * 100}%, var(--sl-empty) {(stepValue / 5) * 100}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value">{stepNames[stepValue]}</span>
				</div>
				<div class="sl-steps">
					{#each stepLabels as step}
						<button
							class="sl-step-tick"
							class:sl-step-tick--active={stepValue === step}
							onclick={() => (stepValue = step)}
						>
							{stepNames[step]}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  DUAL-THUMB RANGE                                           -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Range Slider (Dual Thumb)</h3>
		<p class="ds-card__sub">
			Two overlapping inputs create a min/max range picker. The filled segment spans between
			the two thumb positions.
		</p>
		<div class="ds-demo-col" style="max-width: 480px;">
			<div class="sl-dual-wrap">
				<!-- Decorative filled track between thumbs -->
				<div
					class="sl-dual-fill"
					style="left: {rangeMin}%; width: {rangeMax - rangeMin}%;"
				></div>
				<input
					type="range"
					min="0"
					max="100"
					value={rangeMin}
					oninput={(e) => clampRangeMin(Number((e.target as HTMLInputElement).value))}
					class="sl-track sl-dual-thumb sl-dual-thumb--lower"
				/>
				<input
					type="range"
					min="0"
					max="100"
					value={rangeMax}
					oninput={(e) => clampRangeMax(Number((e.target as HTMLInputElement).value))}
					class="sl-track sl-dual-thumb sl-dual-thumb--upper"
				/>
			</div>
			<div class="sl-dual-readout">
				<span class="sl-dual-pill">{rangeMin}</span>
				<span class="sl-dual-sep">–</span>
				<span class="sl-dual-pill">{rangeMax}</span>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  COLOR VARIANTS                                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Color Variants</h3>
		<p class="ds-card__sub">
			Default (white), success (green), and warning (amber) fills for semantic contexts.
		</p>
		<div class="ds-demo-col" style="max-width: 480px; gap: 24px;">
			<div>
				<p class="sl-size-label">Default</p>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={colorDefault}
						class="sl-track"
						style="background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {colorDefault}%, var(--sl-empty) {colorDefault}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value">{colorDefault}%</span>
				</div>
			</div>
			<div>
				<p class="sl-size-label">Success</p>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={colorSuccess}
						class="sl-track sl-track--success"
						style="background: linear-gradient(to right, #22c55e 0%, #22c55e {colorSuccess}%, var(--sl-empty) {colorSuccess}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value" style="color: #22c55e;">{colorSuccess}%</span>
				</div>
			</div>
			<div>
				<p class="sl-size-label">Warning</p>
				<div class="sl-row">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={colorWarning}
						class="sl-track sl-track--warning"
						style="background: linear-gradient(to right, #f59e0b 0%, #f59e0b {colorWarning}%, var(--sl-empty) {colorWarning}%, var(--sl-empty) 100%);"
					/>
					<span class="sl-value" style="color: #f59e0b;">{colorWarning}%</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  VOLUME SLIDER                                              -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Volume-Style Slider</h3>
		<p class="ds-card__sub">Icon prefix changes with value. A common media-player pattern.</p>
		<div class="ds-demo" style="max-width: 480px;">
			<div class="sl-volume">
				<!-- Volume icon -->
				<span class="sl-volume-icon" aria-label="Volume: {volume}">
					{#if volumeIcon(volume) === 'muted'}
						<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
						</svg>
					{:else if volumeIcon(volume) === 'low'}
						<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072"/>
						</svg>
					{:else if volumeIcon(volume) === 'mid'}
						<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a9 9 0 010 11.9"/>
						</svg>
					{:else}
						<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a9 9 0 010 11.9"/>
						</svg>
					{/if}
				</span>
				<input
					type="range"
					min="0"
					max="100"
					bind:value={volume}
					class="sl-track"
					style="flex: 1; background: linear-gradient(to right, var(--sl-fill) 0%, var(--sl-fill) {volume}%, var(--sl-empty) {volume}%, var(--sl-empty) 100%);"
				/>
				<span class="sl-value" style="min-width: 36px;">{volume}%</span>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── CSS custom properties ───────────────────────────────── */
	.ds-section {
		--sl-fill: var(--dt);
		--sl-empty: var(--dbg3);
		--sl-thumb-bg: var(--dt);
		--sl-thumb-border: rgba(0, 0, 0, 0.25);
	}

	/* ── Base track ──────────────────────────────────────────── */
	.sl-track {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		outline: none;
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.sl-track:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* Track size variants */
	.sl-track--sm {
		height: 2px;
	}

	.sl-track--md {
		height: 6px;
	}

	.sl-track--lg {
		height: 12px;
		border-radius: 6px;
	}

	/* ── Thumb — WebKit ──────────────────────────────────────── */
	.sl-track::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--sl-thumb-bg);
		border: 2px solid var(--sl-thumb-border);
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
	}

	.sl-track::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.45);
	}

	.sl-track:active::-webkit-slider-thumb {
		transform: scale(1.05);
	}

	/* Smaller thumb for sm track */
	.sl-track--sm::-webkit-slider-thumb {
		width: 14px;
		height: 14px;
	}

	/* Larger thumb for lg track */
	.sl-track--lg::-webkit-slider-thumb {
		width: 22px;
		height: 22px;
	}

	/* ── Thumb — Firefox ─────────────────────────────────────── */
	.sl-track::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--sl-thumb-bg);
		border: 2px solid var(--sl-thumb-border);
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
	}

	.sl-track::-moz-range-thumb:hover {
		transform: scale(1.15);
	}

	/* ── Row layout ──────────────────────────────────────────── */
	.sl-row {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.sl-value {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		min-width: 36px;
		text-align: right;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.01em;
	}

	/* ── Min/max labels ──────────────────────────────────────── */
	.sl-minmax {
		display: flex;
		justify-content: space-between;
		margin-top: 6px;
		padding: 0 2px;
		font-size: 11px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
	}

	/* ── Size labels ─────────────────────────────────────────── */
	.sl-size-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin: 0 0 8px;
	}

	/* ── Step markers ────────────────────────────────────────── */
	.sl-steps {
		display: flex;
		justify-content: space-between;
		margin-top: 8px;
		padding: 0 2px;
	}

	.sl-step-tick {
		font-size: 11px;
		color: var(--dt4);
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px 4px;
		border-radius: 4px;
		transition:
			color 0.15s,
			background 0.15s;
		font-family: inherit;
	}

	.sl-step-tick:hover {
		color: var(--dt2);
		background: var(--dbg3);
	}

	.sl-step-tick--active {
		color: var(--dt);
		font-weight: 600;
	}

	/* ── Dual-thumb range ────────────────────────────────────── */
	.sl-dual-wrap {
		position: relative;
		height: 24px;
		display: flex;
		align-items: center;
	}

	.sl-dual-fill {
		position: absolute;
		height: 6px;
		border-radius: 3px;
		background: var(--dt);
		pointer-events: none;
		top: 50%;
		transform: translateY(-50%);
	}

	.sl-dual-thumb {
		position: absolute;
		width: 100%;
		background: transparent !important;
		pointer-events: none;
	}

	.sl-dual-thumb::-webkit-slider-thumb {
		pointer-events: all;
	}

	.sl-dual-thumb::-moz-range-thumb {
		pointer-events: all;
	}

	/* Ensure lower thumb is below upper when they overlap */
	.sl-dual-thumb--lower {
		z-index: 1;
	}

	.sl-dual-thumb--upper {
		z-index: 2;
	}

	/* The base rail under both thumbs */
	.sl-dual-wrap::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 6px;
		border-radius: 3px;
		background: var(--dbg3);
		top: 50%;
		transform: translateY(-50%);
	}

	.sl-dual-readout {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
	}

	.sl-dual-pill {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 3px 10px;
		font-variant-numeric: tabular-nums;
		min-width: 40px;
		text-align: center;
	}

	.sl-dual-sep {
		font-size: 13px;
		color: var(--dt4);
	}

	/* ── Volume slider ───────────────────────────────────────── */
	.sl-volume {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	.sl-volume-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--dt2);
		width: 22px;
	}

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .sl-dual-fill {
		background: #e5e5e5;
	}
</style>
