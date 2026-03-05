<script lang="ts">
	import { fly, fade, slide, scale } from 'svelte/transition';

	// Transition curves demo
	let curvesPlaying = $state(false);
	let curvesKey = $state(0);

	function playCurves() {
		curvesPlaying = false;
		// Re-trigger on next tick by bumping the key
		setTimeout(() => {
			curvesKey += 1;
			curvesPlaying = true;
		}, 20);
	}

	// Fade in/out toggle
	let fadeVisible = $state(true);

	// Slide up entrance toggle
	let slideVisible = $state(false);

	// Svelte transition toggles
	let flyVisible = $state(true);
	let svelteFadeVisible = $state(true);
	let svelteSlideVisible = $state(true);
	let scaleVisible = $state(true);

	// Progress bar
	let progressRunning = $state(false);
	let progressWidth = $state(0);

	function runProgress() {
		progressRunning = true;
		progressWidth = 0;
		const start = performance.now();
		const duration = 2000;
		function step(now: number) {
			const elapsed = now - start;
			progressWidth = Math.min((elapsed / duration) * 100, 100);
			if (elapsed < duration) {
				requestAnimationFrame(step);
			} else {
				progressRunning = false;
			}
		}
		requestAnimationFrame(step);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Animations</h2>
	<p class="ds-desc">Motion patterns, transitions, and micro-interactions used across the platform.</p>

	<!-- ═══ TRANSITION CURVES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Transition Curves</h3>
		<p class="ds-card__sub">The three easing curves in the system — click Play to compare them simultaneously</p>

		<div class="curves-demo">
			{#each [
				{ label: 'ease', value: 'ease', desc: 'CSS default — smooth in/out' },
				{ label: 'standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Material standard — used on buttons' },
				{ label: 'emphasized', value: 'cubic-bezier(0.4, 0, 0.6, 1)', desc: 'Emphasized entrance — used on modals' },
			] as curve}
				<div class="curve-row">
					<div class="curve-track">
						{#key curvesKey}
							<div
								class="curve-box"
								class:curve-box--playing={curvesPlaying}
								style="transition-timing-function: {curve.value};"
							></div>
						{/key}
					</div>
					<div class="curve-meta">
						<span class="curve-label">{curve.label}</span>
						<code class="curve-value">{curve.value}</code>
						<span class="curve-desc">{curve.desc}</span>
					</div>
				</div>
			{/each}
		</div>

		<div class="ds-demo" style="margin-top: 16px;">
			<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={playCurves} aria-label="Play all three transition curves">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				Play
			</button>
		</div>
	</div>

	<!-- ═══ MICRO-INTERACTIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Micro-interactions</h3>
		<p class="ds-card__sub">Hover, press, and entrance patterns — interact with each demo</p>

		<div class="ds-demo" style="flex-wrap: wrap; gap: 20px; align-items: flex-start;">
			<!-- Hover lift -->
			<div class="micro-item">
				<div class="hover-lift-card" aria-label="Hover to lift">
					<span class="micro-label-inner">Hover lift</span>
				</div>
				<span class="micro-caption">Shadow increases on hover</span>
			</div>

			<!-- Press scale -->
			<div class="micro-item">
				<button class="press-scale-btn" aria-label="Click for press scale effect">Press me</button>
				<span class="micro-caption">Scales down on click</span>
			</div>

			<!-- Fade toggle -->
			<div class="micro-item">
				<div class="fade-demo-wrap" aria-live="polite">
					{#if fadeVisible}
						<div class="fade-demo-box" style="animation: fadeInOut 0.2s ease;">Visible</div>
					{:else}
						<div class="fade-demo-placeholder">Hidden</div>
					{/if}
				</div>
				<button
					class="btn-pill btn-pill-secondary btn-pill-xs"
					onclick={() => fadeVisible = !fadeVisible}
					aria-label="Toggle fade"
				>
					{fadeVisible ? 'Fade out' : 'Fade in'}
				</button>
				<span class="micro-caption">Opacity toggle</span>
			</div>

			<!-- Slide up entrance -->
			<div class="micro-item">
				<div class="slide-demo-wrap" aria-live="polite">
					{#if slideVisible}
						<div class="slide-up-box">Appeared</div>
					{:else}
						<div class="fade-demo-placeholder">Hidden</div>
					{/if}
				</div>
				<button
					class="btn-pill btn-pill-secondary btn-pill-xs"
					onclick={() => slideVisible = !slideVisible}
					aria-label="Toggle slide-up entrance"
				>
					{slideVisible ? 'Hide' : 'Slide up'}
				</button>
				<span class="micro-caption">Slide-up entrance</span>
			</div>
		</div>
	</div>

	<!-- ═══ LOADING PATTERNS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Loading Patterns</h3>
		<p class="ds-card__sub">Skeleton, spinners, progress, and typing animations</p>

		<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px;">
			<!-- Pulse skeleton -->
			<div>
				<div class="loading-label">Pulse skeleton</div>
				<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
					<div class="skeleton skeleton--title"></div>
					<div class="skeleton skeleton--line"></div>
					<div class="skeleton skeleton--line skeleton--short"></div>
				</div>
			</div>

			<!-- Spinning dots -->
			<div>
				<div class="loading-label">Spinning dots</div>
				<div class="spinning-dots" role="status" aria-label="Loading" style="margin-top: 12px;">
					<div class="spinning-dot"></div>
					<div class="spinning-dot"></div>
					<div class="spinning-dot"></div>
				</div>
			</div>

			<!-- Progress bar -->
			<div>
				<div class="loading-label">Progress bar</div>
				<div style="margin-top: 12px;">
					<div class="progress-track" role="progressbar" aria-valuenow={Math.round(progressWidth)} aria-valuemin={0} aria-valuemax={100}>
						<div class="progress-fill" style="width: {progressWidth}%;"></div>
					</div>
					<button
						class="btn-pill btn-pill-secondary btn-pill-xs"
						style="margin-top: 10px;"
						onclick={runProgress}
						disabled={progressRunning}
						aria-label="Run progress bar animation"
					>
						{progressRunning ? 'Running…' : 'Run'}
					</button>
				</div>
			</div>

			<!-- Typing dots -->
			<div>
				<div class="loading-label">Typing indicator</div>
				<div style="margin-top: 12px;">
					<div class="typing-bubble" role="status" aria-label="Typing indicator">
						<span class="typing-dot"></span>
						<span class="typing-dot"></span>
						<span class="typing-dot"></span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ SVELTE TRANSITIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Svelte Transitions</h3>
		<p class="ds-card__sub">Built-in transitions from <code>svelte/transition</code> — toggle each to preview</p>

		<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
			<!-- fly -->
			<div class="svelte-transition-demo">
				<div class="svelte-transition-preview" aria-live="polite">
					{#if flyVisible}
						<div class="transition-box" transition:fly={{ y: 20, duration: 300 }}>fly</div>
					{/if}
				</div>
				<div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
					<button
						class="btn-pill btn-pill-secondary btn-pill-xs"
						onclick={() => flyVisible = !flyVisible}
						aria-label="Toggle fly transition"
					>
						{flyVisible ? 'Hide' : 'Show'}
					</button>
					<code style="font-size: 11px; color: #999;">fly(y: 20)</code>
				</div>
			</div>

			<!-- fade -->
			<div class="svelte-transition-demo">
				<div class="svelte-transition-preview" aria-live="polite">
					{#if svelteFadeVisible}
						<div class="transition-box" transition:fade={{ duration: 200 }}>fade</div>
					{/if}
				</div>
				<div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
					<button
						class="btn-pill btn-pill-secondary btn-pill-xs"
						onclick={() => svelteFadeVisible = !svelteFadeVisible}
						aria-label="Toggle fade transition"
					>
						{svelteFadeVisible ? 'Hide' : 'Show'}
					</button>
					<code style="font-size: 11px; color: #999;">fade(200ms)</code>
				</div>
			</div>

			<!-- slide -->
			<div class="svelte-transition-demo">
				<div class="svelte-transition-preview" aria-live="polite">
					{#if svelteSlideVisible}
						<div class="transition-box" transition:slide={{ duration: 250 }}>slide</div>
					{/if}
				</div>
				<div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
					<button
						class="btn-pill btn-pill-secondary btn-pill-xs"
						onclick={() => svelteSlideVisible = !svelteSlideVisible}
						aria-label="Toggle slide transition"
					>
						{svelteSlideVisible ? 'Hide' : 'Show'}
					</button>
					<code style="font-size: 11px; color: #999;">slide(250ms)</code>
				</div>
			</div>

			<!-- scale -->
			<div class="svelte-transition-demo">
				<div class="svelte-transition-preview" aria-live="polite">
					{#if scaleVisible}
						<div class="transition-box" transition:scale={{ duration: 200, start: 0.85 }}>scale</div>
					{/if}
				</div>
				<div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
					<button
						class="btn-pill btn-pill-secondary btn-pill-xs"
						onclick={() => scaleVisible = !scaleVisible}
						aria-label="Toggle scale transition"
					>
						{scaleVisible ? 'Hide' : 'Show'}
					</button>
					<code style="font-size: 11px; color: #999;">scale(0.85)</code>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ CSS ANIMATION TOKENS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">CSS Animation Tokens</h3>
		<p class="ds-card__sub">Duration and easing reference for consistent motion across the system</p>

		<table class="ds-table">
			<thead>
				<tr>
					<th>Token</th>
					<th>Value</th>
					<th>Usage</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Duration fast</td>
					<td><code>0.15s</code></td>
					<td>Hover states, active/pressed feedback</td>
				</tr>
				<tr>
					<td>Duration normal</td>
					<td><code>0.2s</code></td>
					<td>Transitions, toggles, fade in/out</td>
				</tr>
				<tr>
					<td>Duration slow</td>
					<td><code>0.3s</code></td>
					<td>Modals, panels, entrances</td>
				</tr>
				<tr>
					<td>Easing standard</td>
					<td><code>cubic-bezier(0.4, 0, 0.2, 1)</code></td>
					<td>Most transitions — buttons, hovers</td>
				</tr>
				<tr>
					<td>Easing emphasized</td>
					<td><code>cubic-bezier(0.4, 0, 0.6, 1)</code></td>
					<td>Entrances and exits — modals, drawers</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	/* ═══ TRANSITION CURVES ═══ */

	.curves-demo {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 8px 0;
	}

	.curve-row {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.curve-track {
		flex: 0 0 280px;
		height: 40px;
		background: rgba(0, 0, 0, 0.03);
		border-radius: 8px;
		border: 1px solid rgba(0, 0, 0, 0.06);
		position: relative;
		overflow: hidden;
	}

	.curve-box {
		position: absolute;
		left: 6px;
		top: 50%;
		transform: translateY(-50%);
		width: 28px;
		height: 28px;
		background: linear-gradient(135deg, #1a1a1a 0%, #444 100%);
		border-radius: 6px;
		transition: left 0.6s ease;
	}

	.curve-box--playing {
		left: calc(280px - 34px);
	}

	.curve-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.curve-label {
		font-size: 13px;
		font-weight: 600;
		color: #222;
		text-transform: capitalize;
	}

	.curve-value {
		font-size: 11px;
		color: #888;
		font-family: 'SF Mono', 'Fira Code', monospace;
		white-space: nowrap;
	}

	.curve-desc {
		font-size: 11px;
		color: #bbb;
	}

	/* ═══ MICRO-INTERACTIONS ═══ */

	.micro-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.micro-caption {
		font-size: 11px;
		color: #999;
		text-align: center;
	}

	.micro-label-inner {
		font-size: 12px;
		font-weight: 500;
		color: #444;
	}

	/* Hover lift card */
	.hover-lift-card {
		width: 120px;
		height: 72px;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		transition:
			transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hover-lift-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	/* Press scale button */
	.press-scale-btn {
		padding: 10px 20px;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		color: #fff;
		border: none;
		border-radius: 9999px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		user-select: none;
	}

	.press-scale-btn:active {
		transform: scale(0.94);
	}

	/* Fade demo */
	.fade-demo-wrap {
		width: 100px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fade-demo-box {
		padding: 8px 16px;
		background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
		color: #fff;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 600;
		animation: animFadeIn 0.2s ease;
	}

	.fade-demo-placeholder {
		padding: 8px 16px;
		background: rgba(0, 0, 0, 0.04);
		color: #ccc;
		border-radius: 8px;
		font-size: 12px;
		border: 1px dashed rgba(0, 0, 0, 0.1);
	}

	@keyframes animFadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Slide up demo */
	.slide-demo-wrap {
		width: 100px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.slide-up-box {
		padding: 8px 16px;
		background: linear-gradient(135deg, #1e96eb, #1680c4);
		color: #fff;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 600;
		animation: animSlideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes animSlideUp {
		from { opacity: 0; transform: translateY(12px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* ═══ LOADING PATTERNS ═══ */

	.loading-label {
		font-size: 12px;
		font-weight: 600;
		color: #555;
		margin-bottom: 2px;
	}

	/* Pulse skeleton */
	.skeleton {
		background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
		background-size: 200% 100%;
		border-radius: 6px;
		animation: skeletonPulse 1.4s ease infinite;
	}

	.skeleton--title {
		height: 16px;
		width: 60%;
	}

	.skeleton--line {
		height: 12px;
		width: 100%;
	}

	.skeleton--short {
		width: 70%;
	}

	@keyframes skeletonPulse {
		0%   { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	/* Spinning dots */
	.spinning-dots {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.spinning-dot {
		width: 8px;
		height: 8px;
		background: #1a1a1a;
		border-radius: 50%;
		animation: spinningDotBounce 1.0s ease-in-out infinite;
	}

	.spinning-dot:nth-child(2) { animation-delay: 0.16s; }
	.spinning-dot:nth-child(3) { animation-delay: 0.32s; }

	@keyframes spinningDotBounce {
		0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
		40%           { transform: scale(1.0); opacity: 1; }
	}

	/* Progress bar */
	.progress-track {
		width: 100%;
		height: 6px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 9999px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #1a1a1a 0%, #444 100%);
		border-radius: 9999px;
		transition: width 0.05s linear;
	}

	/* Typing indicator */
	.typing-bubble {
		display: inline-flex;
		gap: 4px;
		align-items: center;
		padding: 8px 12px;
		background: #f4f4f5;
		border-radius: 14px;
		border-bottom-left-radius: 4px;
	}

	.typing-dot {
		width: 6px;
		height: 6px;
		background: #999;
		border-radius: 50%;
		animation: typingBounce 1.2s ease-in-out infinite;
	}

	.typing-dot:nth-child(2) { animation-delay: 0.2s; }
	.typing-dot:nth-child(3) { animation-delay: 0.4s; }

	@keyframes typingBounce {
		0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
		30%            { transform: translateY(-4px); opacity: 1; }
	}

	/* ═══ SVELTE TRANSITIONS ═══ */

	.svelte-transition-demo {
		display: flex;
		flex-direction: column;
	}

	.svelte-transition-preview {
		height: 64px;
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.transition-box {
		padding: 8px 18px;
		background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
		color: #fff;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.02em;
	}
</style>
