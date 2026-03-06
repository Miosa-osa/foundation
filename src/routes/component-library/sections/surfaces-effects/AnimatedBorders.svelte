<script lang="ts">
	// ── Demo 1: Animated Gradient Border toggle ──────────────────────────
	let gradientBorderActive = $state(true);

	// ── Demo 2: Rainbow Border Pill ──────────────────────────────────────
	type PillState = 'idle' | 'running' | 'complete';
	let pillState = $state<PillState>('idle');
	let pillTimer: ReturnType<typeof setTimeout> | null = null;

	function cyclePill() {
		if (pillTimer) clearTimeout(pillTimer);
		if (pillState === 'idle') {
			pillState = 'running';
			pillTimer = setTimeout(() => { pillState = 'complete'; }, 3500);
		} else {
			pillState = 'idle';
		}
	}

	// ── Demo 8: AI Agent Card ─────────────────────────────────────────────
	type AgentState = 'idle' | 'running' | 'complete';
	let agentState = $state<AgentState>('idle');
	let agentElapsed = $state(0);
	let agentInterval: ReturnType<typeof setInterval> | null = null;
	let agentTimer: ReturnType<typeof setTimeout> | null = null;

	function startAgent() {
		agentState = 'running';
		agentElapsed = 0;
		agentInterval = setInterval(() => { agentElapsed += 1; }, 1000);
		agentTimer = setTimeout(() => {
			stopAgent(true);
		}, 8000);
	}

	function stopAgent(complete = false) {
		if (agentInterval) { clearInterval(agentInterval); agentInterval = null; }
		if (agentTimer) { clearTimeout(agentTimer); agentTimer = null; }
		agentState = complete ? 'complete' : 'idle';
	}

	function resetAgent() {
		stopAgent(false);
		agentElapsed = 0;
		agentState = 'idle';
	}

	let agentElapsedStr = $derived(
		agentElapsed < 60
			? `${agentElapsed}s`
			: `${Math.floor(agentElapsed / 60)}m ${agentElapsed % 60}s`
	);
</script>

<section class="ds-section">
	<h2 class="ds-title">Animated Borders &amp; Glow Effects</h2>
	<p class="ds-desc">
		Holographic rainbow gradient borders, pulse glows, shimmer sweeps, and loading rings — the
		signature animated border patterns used in modern AI interfaces.
	</p>

	<!-- ═══ 1. ANIMATED GRADIENT BORDER ════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Animated Gradient Border</h3>
		<p class="ds-card__sub">
			Rotating conic-gradient border cycling cyan → purple → pink → orange → cyan. Toggle animation
			on/off.
		</p>
		<div class="demo-row">
			<div class="anb-wrapper" class:anb-wrapper--active={gradientBorderActive}>
				<div class="anb-inner">
					<div class="anb-inner__content">
						<div class="anb-inner__icon">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
						<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/>
					</svg>
				</div>
						<div class="anb-inner__label">AI Interface Card</div>
						<div class="anb-inner__sub">Gradient border · {gradientBorderActive ? 'Active' : 'Paused'}</div>
					</div>
				</div>
			</div>
			<button
				class="demo-btn"
				onclick={() => { gradientBorderActive = !gradientBorderActive; }}
			>
				{gradientBorderActive ? 'Stop Animation' : 'Start Animation'}
			</button>
		</div>
	</div>

	<!-- ═══ 2. RAINBOW BORDER PILL ═══════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Rainbow Border Pill</h3>
		<p class="ds-card__sub">
			Status pill with three states: Idle (static border), Running (animated rainbow + spinner),
			Complete (green border). Click to cycle.
		</p>
		<div class="demo-row demo-row--wrap">
			<!-- Idle -->
			<div class="pill-demo">
				<div class="pill-wrap pill-wrap--idle" class:pill-wrap--current={pillState === 'idle'}>
					<div class="pill-inner">
						<span class="pill-dot pill-dot--idle"></span>
						<span class="pill-text">Idle</span>
					</div>
				</div>
				<span class="demo-label">Idle</span>
			</div>
			<!-- Running -->
			<div class="pill-demo">
				<div class="pill-wrap pill-wrap--running" class:pill-wrap--current={pillState === 'running'}>
					<div class="pill-inner">
						<svg class="pill-spinner" class:pill-spinner--active={pillState === 'running'} viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="28 10" />
						</svg>
						<span class="pill-text">Running…</span>
					</div>
				</div>
				<span class="demo-label">Running</span>
			</div>
			<!-- Complete -->
			<div class="pill-demo">
				<div class="pill-wrap pill-wrap--complete" class:pill-wrap--current={pillState === 'complete'}>
					<div class="pill-inner">
						<svg class="pill-check" viewBox="0 0 16 16" fill="none">
							<path d="M3.5 8.5l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<span class="pill-text">Complete</span>
					</div>
				</div>
				<span class="demo-label">Complete</span>
			</div>
			<button class="demo-btn" onclick={cyclePill}>
				{pillState === 'idle' ? 'Start Running' : 'Reset'}
			</button>
		</div>
	</div>

	<!-- ═══ 3. GRADIENT BORDER CARDS ════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Gradient Border Cards</h3>
		<p class="ds-card__sub">Three border animation styles: Rainbow sweep, Pulse glow, Shimmer</p>
		<div class="demo-grid-3">
			<!-- Rainbow sweep -->
			<div class="gbc-wrap gbc-wrap--rainbow">
				<div class="gbc-inner">
					<div class="gbc-label">Rainbow Sweep</div>
					<div class="gbc-sub">Rotating conic-gradient</div>
					<div class="gbc-tag">conic-gradient</div>
				</div>
			</div>
			<!-- Pulse glow -->
			<div class="gbc-wrap gbc-wrap--pulse">
				<div class="gbc-inner">
					<div class="gbc-label">Pulse Glow</div>
					<div class="gbc-sub">Border opacity fade in/out</div>
					<div class="gbc-tag">opacity pulse</div>
				</div>
			</div>
			<!-- Shimmer -->
			<div class="gbc-wrap gbc-wrap--shimmer">
				<div class="gbc-inner">
					<div class="gbc-label">Shimmer</div>
					<div class="gbc-sub">Gradient sweeps left → right</div>
					<div class="gbc-tag">linear sweep</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 4. BOTTOM ACCENT BAR ════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Bottom Accent Bar</h3>
		<p class="ds-card__sub">
			Animated 2–3px gradient line at the bottom — AI processing indicator style
		</p>
		<div class="demo-grid-3">
			<div class="bab-card bab-card--active">
				<div class="bab-card__head">
					<div class="bab-card__icon bab-card__icon--cyan">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
				</svg>
			</div>
					<div>
						<div class="bab-card__title">Analyzing</div>
						<div class="bab-card__status">Processing data…</div>
					</div>
				</div>
				<div class="bab-card__bar bab-card__bar--rainbow"></div>
			</div>
			<div class="bab-card bab-card--active">
				<div class="bab-card__head">
					<div class="bab-card__icon bab-card__icon--purple">⟳</div>
					<div>
						<div class="bab-card__title">Generating</div>
						<div class="bab-card__status">Writing output…</div>
					</div>
				</div>
				<div class="bab-card__bar bab-card__bar--sweep"></div>
			</div>
			<div class="bab-card">
				<div class="bab-card__head">
					<div class="bab-card__icon bab-card__icon--green">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M20 6L9 17l-5-5"/>
				</svg>
			</div>
					<div>
						<div class="bab-card__title">Complete</div>
						<div class="bab-card__status">Task finished</div>
					</div>
				</div>
				<div class="bab-card__bar bab-card__bar--static"></div>
			</div>
		</div>
	</div>

	<!-- ═══ 5. GLOW EFFECTS ═════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glow Effects</h3>
		<p class="ds-card__sub">Outer box-shadow animating through colors. Three intensities: Subtle, Medium, Strong</p>
		<div class="demo-grid-3">
			<div class="glow-card glow-card--subtle">
				<div class="glow-card__label">Subtle</div>
				<div class="glow-card__sub">Low intensity glow</div>
			</div>
			<div class="glow-card glow-card--medium">
				<div class="glow-card__label">Medium</div>
				<div class="glow-card__sub">Mid intensity glow</div>
			</div>
			<div class="glow-card glow-card--strong">
				<div class="glow-card__label">Strong</div>
				<div class="glow-card__sub">High intensity glow</div>
			</div>
		</div>
	</div>

	<!-- ═══ 6. BORDER PULSE ═════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Border Pulse</h3>
		<p class="ds-card__sub">
			Border heartbeat: pulses between transparent and a color. Blue, Purple, Green variants.
		</p>
		<div class="demo-grid-3">
			<div class="bp-card bp-card--blue">
				<div class="bp-card__dot bp-card__dot--blue"></div>
				<div class="bp-card__label">Blue Pulse</div>
				<div class="bp-card__sub">cyan · #0ea5e9</div>
			</div>
			<div class="bp-card bp-card--purple">
				<div class="bp-card__dot bp-card__dot--purple"></div>
				<div class="bp-card__label">Purple Pulse</div>
				<div class="bp-card__sub">violet · #8b5cf6</div>
			</div>
			<div class="bp-card bp-card--green">
				<div class="bp-card__dot bp-card__dot--green"></div>
				<div class="bp-card__label">Green Pulse</div>
				<div class="bp-card__sub">emerald · #10b981</div>
			</div>
		</div>
	</div>

	<!-- ═══ 7. LOADING RING ══════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Loading Ring</h3>
		<p class="ds-card__sub">
			Circular element with animated gradient border rotating around it. Small, Medium, Large sizes.
		</p>
		<div class="demo-row demo-row--center" style="gap: 48px; flex-wrap: wrap;">
			<!-- Small -->
			<div class="lr-group">
				<div class="lr-wrap lr-wrap--sm">
					<div class="lr-inner lr-inner--sm">
						<svg viewBox="0 0 20 20" fill="none" class="lr-icon lr-icon--sm">
							<path d="M10 3v2M10 15v2M3 10H5M15 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>
				</div>
				<span class="demo-label">Small · 40px</span>
			</div>
			<!-- Medium -->
			<div class="lr-group">
				<div class="lr-wrap lr-wrap--md">
					<div class="lr-inner lr-inner--md">
						<svg viewBox="0 0 24 24" fill="none" class="lr-icon lr-icon--md">
							<path d="M12 3v2M12 19v2M3 12H5M19 12h2M5.636 5.636l1.414 1.414M16.95 16.95l1.414 1.414M5.636 18.364l1.414-1.414M16.95 7.05l1.414-1.414" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>
				</div>
				<span class="demo-label">Medium · 64px</span>
			</div>
			<!-- Large -->
			<div class="lr-group">
				<div class="lr-wrap lr-wrap--lg">
					<div class="lr-inner lr-inner--lg">
						<svg viewBox="0 0 32 32" fill="none" class="lr-icon lr-icon--lg">
							<path d="M16 4v3M16 25v3M4 16H7M25 16h3M7.515 7.515l2.121 2.121M22.364 22.364l2.121 2.121M7.515 24.485l2.121-2.121M22.364 9.636l2.121-2.121" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
						</svg>
					</div>
				</div>
				<span class="demo-label">Large · 96px</span>
			</div>
		</div>
	</div>

	<!-- ═══ 8. IN CONTEXT: AI AGENT CARD ════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: AI Agent Card</h3>
		<p class="ds-card__sub">
			Full composition — animated rainbow border while running, static green when complete. Includes
			avatar, status pill, spinner, task text, elapsed timer, and stop/reset controls.
		</p>
		<div class="demo-row demo-row--center">
			<div class="agent-wrap" class:agent-wrap--running={agentState === 'running'} class:agent-wrap--complete={agentState === 'complete'}>
				<div class="agent-card">
					<!-- Header row -->
					<div class="agent-header">
						<div class="agent-avatar" class:agent-avatar--pulse={agentState === 'running'}>
							<svg viewBox="0 0 24 24" fill="none" class="agent-avatar__icon">
								<rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
								<path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								<circle cx="12" cy="16" r="1.5" fill="currentColor"/>
							</svg>
						</div>
						<div class="agent-meta">
							<div class="agent-name">Aria · Research Agent</div>
							<div class="agent-model">claude-opus-4 · GPT-4o fallback</div>
						</div>
						<div class="agent-status-pill" class:agent-status-pill--running={agentState === 'running'} class:agent-status-pill--complete={agentState === 'complete'}>
							{#if agentState === 'idle'}
								<span class="agent-dot agent-dot--idle"></span>
								<span>Idle</span>
							{:else if agentState === 'running'}
								<svg class="agent-spinner" viewBox="0 0 16 16" fill="none">
									<circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="22 12" />
								</svg>
								<span>Running</span>
							{:else}
								<svg class="agent-check-icon" viewBox="0 0 16 16" fill="none">
									<path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								<span>Complete</span>
							{/if}
						</div>
					</div>

					<!-- Task description -->
					<div class="agent-task">
						<div class="agent-task__label">Current Task</div>
						<div class="agent-task__text">
							{#if agentState === 'idle'}
								Waiting for instructions. Click "Run Agent" to start a demonstration task.
							{:else if agentState === 'running'}
								Researching competitive landscape for Q2 product strategy. Analyzing 847 market reports, extracting key trends…
							{:else}
								Task complete. Analyzed 847 reports, extracted 23 key trends, generated executive summary.
							{/if}
						</div>
					</div>

					<!-- Progress / steps (visible when running or complete) -->
					{#if agentState !== 'idle'}
						<div class="agent-steps">
							<div class="agent-step" class:agent-step--done={agentState === 'running' && agentElapsed >= 1 || agentState === 'complete'}>
								<div class="agent-step__dot"></div>
								<span>Fetching data sources</span>
							</div>
							<div class="agent-step" class:agent-step--done={agentState === 'running' && agentElapsed >= 3 || agentState === 'complete'}>
								<div class="agent-step__dot"></div>
								<span>Parsing documents</span>
							</div>
							<div class="agent-step" class:agent-step--done={agentState === 'running' && agentElapsed >= 5 || agentState === 'complete'}>
								<div class="agent-step__dot"></div>
								<span>Generating report</span>
							</div>
						</div>
					{/if}

					<!-- Footer row -->
					<div class="agent-footer">
						<div class="agent-elapsed">
							{#if agentState === 'idle'}
								<span class="agent-elapsed__label">Ready</span>
							{:else}
								<span class="agent-elapsed__icon">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>
						</svg>
					</span>
								<span class="agent-elapsed__label">{agentElapsedStr}</span>
							{/if}
						</div>
						<div class="agent-actions">
							{#if agentState === 'idle'}
								<button class="agent-btn agent-btn--primary" onclick={startAgent}>
									Run Agent
								</button>
							{:else if agentState === 'running'}
								<button class="agent-btn agent-btn--stop" onclick={() => stopAgent(false)}>
									Stop
								</button>
							{:else}
								<button class="agent-btn agent-btn--ghost" onclick={resetAgent}>
									Reset
								</button>
								<button class="agent-btn agent-btn--primary" onclick={startAgent}>
									Run Again
								</button>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ════════════════════════════════════════════════════════════════════
	   KEYFRAMES
	   ════════════════════════════════════════════════════════════════════ */

	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes spin-angle {
		to { --angle: 360deg; }
	}

	@keyframes spin-angle-fast {
		to { --angle: 360deg; }
	}

	@keyframes shimmer-sweep {
		0%   { background-position: -200% center; }
		100% { background-position: 200% center; }
	}

	@keyframes pulse-opacity {
		0%, 100% { opacity: 0.25; }
		50%       { opacity: 1; }
	}

	@keyframes glow-cycle {
		0%   { box-shadow: 0 0 8px 1px rgba(6, 182, 212, 0.4); }
		25%  { box-shadow: 0 0 8px 1px rgba(139, 92, 246, 0.4); }
		50%  { box-shadow: 0 0 8px 1px rgba(236, 72, 153, 0.4); }
		75%  { box-shadow: 0 0 8px 1px rgba(249, 115, 22, 0.4); }
		100% { box-shadow: 0 0 8px 1px rgba(6, 182, 212, 0.4); }
	}

	@keyframes glow-cycle-med {
		0%   { box-shadow: 0 0 16px 4px rgba(6, 182, 212, 0.55); }
		25%  { box-shadow: 0 0 16px 4px rgba(139, 92, 246, 0.55); }
		50%  { box-shadow: 0 0 16px 4px rgba(236, 72, 153, 0.55); }
		75%  { box-shadow: 0 0 16px 4px rgba(249, 115, 22, 0.55); }
		100% { box-shadow: 0 0 16px 4px rgba(6, 182, 212, 0.55); }
	}

	@keyframes glow-cycle-strong {
		0%   { box-shadow: 0 0 28px 8px rgba(6, 182, 212, 0.7), 0 0 60px 12px rgba(6, 182, 212, 0.25); }
		25%  { box-shadow: 0 0 28px 8px rgba(139, 92, 246, 0.7), 0 0 60px 12px rgba(139, 92, 246, 0.25); }
		50%  { box-shadow: 0 0 28px 8px rgba(236, 72, 153, 0.7), 0 0 60px 12px rgba(236, 72, 153, 0.25); }
		75%  { box-shadow: 0 0 28px 8px rgba(249, 115, 22, 0.7), 0 0 60px 12px rgba(249, 115, 22, 0.25); }
		100% { box-shadow: 0 0 28px 8px rgba(6, 182, 212, 0.7), 0 0 60px 12px rgba(6, 182, 212, 0.25); }
	}

	@keyframes border-pulse-blue {
		0%, 100% { border-color: transparent; }
		50%       { border-color: #0ea5e9; }
	}
	@keyframes border-pulse-purple {
		0%, 100% { border-color: transparent; }
		50%       { border-color: #8b5cf6; }
	}
	@keyframes border-pulse-green {
		0%, 100% { border-color: transparent; }
		50%       { border-color: #10b981; }
	}

	@keyframes spinner-rot {
		to { transform: rotate(360deg); }
	}

	@keyframes dot-ping {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.4; transform: scale(0.75); }
	}

	@keyframes bar-sweep {
		0%   { background-position: 0% 50%; }
		100% { background-position: 200% 50%; }
	}

	@keyframes avatar-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.5); }
		50%       { box-shadow: 0 0 0 6px rgba(6, 182, 212, 0); }
	}

	/* ════════════════════════════════════════════════════════════════════
	   LAYOUT HELPERS
	   ════════════════════════════════════════════════════════════════════ */

	.demo-row {
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
	}
	.demo-row--wrap  { flex-wrap: wrap; }
	.demo-row--center { justify-content: center; }

	.demo-grid-3 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		max-width: 720px;
	}

	.demo-btn {
		padding: 7px 16px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 500;
		border: 1px solid var(--dbd, rgba(255,255,255,0.1));
		background: var(--dbg2, rgba(255,255,255,0.04));
		color: var(--dt, #e5e5e5);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.demo-btn:hover {
		background: var(--dbg3, rgba(255,255,255,0.08));
		border-color: var(--dbd2, rgba(255,255,255,0.18));
	}

	.demo-label {
		font-size: 11px;
		color: var(--dt3, #6b7280);
		text-align: center;
		letter-spacing: 0.04em;
		margin-top: 6px;
	}

	/* ════════════════════════════════════════════════════════════════════
	   1. ANIMATED GRADIENT BORDER — core technique
	   ════════════════════════════════════════════════════════════════════ */

	/*
	 * Technique: the wrapper has the animated conic-gradient as its background.
	 * The inner element overlays with a solid bg + 2px inset, exposing only
	 * the gradient strip around the edge.
	 */
	.anb-wrapper {
		position: relative;
		border-radius: 16px;
		padding: 2px;
		background: var(--dbd, rgba(255,255,255,0.1));
		width: 220px;
	}
	.anb-wrapper--active {
		background: conic-gradient(
			from var(--angle),
			#06b6d4,
			#8b5cf6,
			#ec4899,
			#f97316,
			#06b6d4
		);
		animation: spin-angle 3s linear infinite;
	}
	.anb-inner {
		border-radius: 14px;
		background: var(--dbg, #111);
		overflow: hidden;
	}
	.anb-inner__content {
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}
	.anb-inner__icon {
		font-size: 22px;
		color: var(--dt2, #a3a3a3);
	}
	.anb-inner__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt, #e5e5e5);
	}
	.anb-inner__sub {
		font-size: 11px;
		color: var(--dt3, #6b7280);
		letter-spacing: 0.04em;
	}

	/* ════════════════════════════════════════════════════════════════════
	   2. RAINBOW BORDER PILL
	   ════════════════════════════════════════════════════════════════════ */

	.pill-demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.pill-wrap {
		border-radius: 999px;
		padding: 2px;
		background: var(--dbd, rgba(255,255,255,0.1));
	}
	/* Running state: rainbow animation */
	.pill-wrap--running.pill-wrap--current {
		background: conic-gradient(
			from var(--angle),
			#06b6d4,
			#8b5cf6,
			#ec4899,
			#f97316,
			#06b6d4
		);
		animation: spin-angle 2s linear infinite;
	}
	/* Complete: green border */
	.pill-wrap--complete.pill-wrap--current {
		background: #10b981;
	}
	/* Idle: just default border */

	.pill-inner {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 5px 12px;
		border-radius: 999px;
		background: var(--dbg, #111);
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2, #a3a3a3);
		white-space: nowrap;
	}
	.pill-wrap--running.pill-wrap--current .pill-inner { color: #c084fc; }
	.pill-wrap--complete.pill-wrap--current .pill-inner { color: #34d399; }

	.pill-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
	.pill-dot--idle { background: var(--dt3, #6b7280); }

	.pill-spinner {
		width: 13px;
		height: 13px;
		color: currentColor;
	}
	.pill-spinner--active {
		animation: spinner-rot 1s linear infinite;
	}

	.pill-check {
		width: 13px;
		height: 13px;
		color: #34d399;
	}

	/* ════════════════════════════════════════════════════════════════════
	   3. GRADIENT BORDER CARDS
	   ════════════════════════════════════════════════════════════════════ */

	.gbc-wrap {
		border-radius: 14px;
		padding: 2px;
	}

	/* Rainbow sweep */
	.gbc-wrap--rainbow {
		background: conic-gradient(
			from var(--angle),
			#06b6d4,
			#8b5cf6,
			#ec4899,
			#f97316,
			#06b6d4
		);
		animation: spin-angle 3s linear infinite;
	}

	/* Pulse glow — single color border fading */
	.gbc-wrap--pulse {
		background: rgba(139, 92, 246, 0.3);
		animation: pulse-opacity 2s ease-in-out infinite;
		border: 2px solid #8b5cf6;
		padding: 0;
	}
	.gbc-wrap--pulse .gbc-inner {
		border-radius: 12px; /* slightly smaller since no padding wrapper */
	}

	/* Shimmer — gradient sweeps across */
	.gbc-wrap--shimmer {
		background: linear-gradient(
			90deg,
			rgba(255,255,255,0.05) 0%,
			#06b6d4 20%,
			#8b5cf6 40%,
			#ec4899 60%,
			#f97316 80%,
			rgba(255,255,255,0.05) 100%
		);
		background-size: 200% 100%;
		animation: shimmer-sweep 2.5s linear infinite;
	}

	.gbc-inner {
		border-radius: 12px;
		background: var(--dbg, #111);
		padding: 20px 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.gbc-label {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt, #e5e5e5);
	}
	.gbc-sub {
		font-size: 12px;
		color: var(--dt3, #6b7280);
		line-height: 1.4;
	}
	.gbc-tag {
		display: inline-block;
		margin-top: 8px;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.06em;
		padding: 2px 8px;
		border-radius: 999px;
		background: var(--dbg2, rgba(255,255,255,0.04));
		border: 1px solid var(--dbd, rgba(255,255,255,0.08));
		color: var(--dt2, #a3a3a3);
		text-transform: uppercase;
	}

	/* ════════════════════════════════════════════════════════════════════
	   4. BOTTOM ACCENT BAR
	   ════════════════════════════════════════════════════════════════════ */

	.bab-card {
		border-radius: 12px;
		border: 1px solid var(--dbd, rgba(255,255,255,0.08));
		background: var(--dbg2, rgba(255,255,255,0.03));
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.bab-card__head {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 14px 12px;
	}
	.bab-card__icon {
		width: 30px;
		height: 30px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		flex-shrink: 0;
	}
	.bab-card__icon--cyan   { background: rgba(6, 182, 212, 0.12); color: #22d3ee; }
	.bab-card__icon--purple { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }
	.bab-card__icon--green  { background: rgba(16, 185, 129, 0.12); color: #34d399; }

	.bab-card__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #e5e5e5);
	}
	.bab-card__status {
		font-size: 11px;
		color: var(--dt3, #6b7280);
		margin-top: 1px;
	}

	.bab-card__bar {
		height: 3px;
		margin-top: auto;
	}
	/* Animated rainbow — shifts position */
	.bab-card__bar--rainbow {
		background: linear-gradient(
			90deg,
			#06b6d4,
			#8b5cf6,
			#ec4899,
			#f97316,
			#06b6d4
		);
		background-size: 200% 100%;
		animation: bar-sweep 2s linear infinite;
	}
	/* Sweep — single direction wipe */
	.bab-card__bar--sweep {
		background: linear-gradient(
			90deg,
			transparent 0%,
			#8b5cf6 40%,
			#ec4899 70%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: bar-sweep 1.8s ease-in-out infinite;
	}
	.bab-card__bar--static {
		background: #10b981;
		opacity: 0.6;
	}

	/* ════════════════════════════════════════════════════════════════════
	   5. GLOW EFFECTS
	   ════════════════════════════════════════════════════════════════════ */

	.glow-card {
		border-radius: 12px;
		border: 1px solid var(--dbd, rgba(255,255,255,0.08));
		background: var(--dbg2, rgba(255,255,255,0.03));
		padding: 20px 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.glow-card__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt, #e5e5e5);
	}
	.glow-card__sub {
		font-size: 12px;
		color: var(--dt3, #6b7280);
	}
	.glow-card--subtle {
		animation: glow-cycle 4s ease-in-out infinite;
	}
	.glow-card--medium {
		animation: glow-cycle-med 4s ease-in-out infinite;
		animation-delay: -1.3s;
	}
	.glow-card--strong {
		animation: glow-cycle-strong 4s ease-in-out infinite;
		animation-delay: -2.6s;
	}

	/* ════════════════════════════════════════════════════════════════════
	   6. BORDER PULSE
	   ════════════════════════════════════════════════════════════════════ */

	.bp-card {
		border-radius: 12px;
		border: 2px solid transparent;
		background: var(--dbg2, rgba(255,255,255,0.03));
		padding: 20px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.bp-card--blue   { animation: border-pulse-blue   2s ease-in-out infinite; }
	.bp-card--purple { animation: border-pulse-purple 2s ease-in-out infinite; animation-delay: -0.66s; }
	.bp-card--green  { animation: border-pulse-green  2s ease-in-out infinite; animation-delay: -1.33s; }

	.bp-card__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		animation: dot-ping 2s ease-in-out infinite;
	}
	.bp-card__dot--blue   { background: #0ea5e9; animation-delay: 0s; }
	.bp-card__dot--purple { background: #8b5cf6; animation-delay: -0.66s; }
	.bp-card__dot--green  { background: #10b981; animation-delay: -1.33s; }

	.bp-card__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt, #e5e5e5);
	}
	.bp-card__sub {
		font-size: 11px;
		color: var(--dt3, #6b7280);
		font-family: var(--font-mono, 'SF Mono', 'Fira Code', monospace);
	}

	/* ════════════════════════════════════════════════════════════════════
	   7. LOADING RING
	   ════════════════════════════════════════════════════════════════════ */

	.lr-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.lr-wrap {
		border-radius: 50%;
		padding: 3px;
		background: conic-gradient(
			from var(--angle),
			#06b6d4,
			#8b5cf6,
			#ec4899,
			#f97316,
			#06b6d4
		);
		animation: spin-angle 1.6s linear infinite;
		flex-shrink: 0;
	}
	.lr-wrap--sm { width: 40px;  height: 40px;  }
	.lr-wrap--md { width: 64px;  height: 64px;  }
	.lr-wrap--lg { width: 96px;  height: 96px;  }

	.lr-inner {
		border-radius: 50%;
		background: var(--dbg, #111);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* These cancel the 3px padding from the wrapper to keep inner circle flush */
	.lr-inner--sm { width: 34px;  height: 34px;  }
	.lr-inner--md { width: 58px;  height: 58px;  }
	.lr-inner--lg { width: 90px;  height: 90px;  }

	.lr-icon { color: var(--dt2, #a3a3a3); }
	.lr-icon--sm { width: 16px; height: 16px; animation: spinner-rot 2s linear infinite; }
	.lr-icon--md { width: 22px; height: 22px; animation: spinner-rot 2s linear infinite; }
	.lr-icon--lg { width: 32px; height: 32px; animation: spinner-rot 2s linear infinite; }

	/* ════════════════════════════════════════════════════════════════════
	   8. AI AGENT CARD
	   ════════════════════════════════════════════════════════════════════ */

	.agent-wrap {
		border-radius: 18px;
		padding: 2px;
		background: var(--dbd, rgba(255,255,255,0.1));
		width: 100%;
		max-width: 440px;
		transition: background 0.3s;
	}
	/* Running: full rainbow animation */
	.agent-wrap--running {
		background: conic-gradient(
			from var(--angle),
			#06b6d4,
			#8b5cf6,
			#ec4899,
			#f97316,
			#06b6d4
		);
		animation: spin-angle 2.5s linear infinite;
	}
	/* Complete: solid green */
	.agent-wrap--complete {
		background: #10b981;
		animation: none;
	}

	.agent-card {
		border-radius: 16px;
		background: var(--dbg, #111);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* Header */
	.agent-header {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.agent-avatar {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		background: var(--dbg2, rgba(255,255,255,0.06));
		border: 1px solid var(--dbd, rgba(255,255,255,0.08));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: box-shadow 0.3s;
	}
	.agent-avatar--pulse {
		animation: avatar-pulse 1.5s ease-out infinite;
	}
	.agent-avatar__icon {
		width: 20px;
		height: 20px;
		color: var(--dt2, #a3a3a3);
	}
	.agent-meta { flex: 1; min-width: 0; }
	.agent-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt, #e5e5e5);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.agent-model {
		font-size: 11px;
		color: var(--dt3, #6b7280);
		margin-top: 1px;
		font-family: var(--font-mono, 'SF Mono', monospace);
	}

	/* Status pill on the card */
	.agent-status-pill {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 4px 10px;
		border-radius: 999px;
		font-size: 12px;
		font-weight: 500;
		border: 1px solid var(--dbd, rgba(255,255,255,0.1));
		background: var(--dbg2, rgba(255,255,255,0.04));
		color: var(--dt2, #a3a3a3);
		white-space: nowrap;
		flex-shrink: 0;
		transition: background 0.3s, border-color 0.3s, color 0.3s;
	}
	.agent-status-pill--running {
		background: rgba(139, 92, 246, 0.12);
		border-color: rgba(139, 92, 246, 0.3);
		color: #c084fc;
	}
	.agent-status-pill--complete {
		background: rgba(16, 185, 129, 0.12);
		border-color: rgba(16, 185, 129, 0.3);
		color: #34d399;
	}

	.agent-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
	.agent-dot--idle { background: var(--dt3, #6b7280); }

	.agent-spinner {
		width: 13px;
		height: 13px;
		animation: spinner-rot 1s linear infinite;
		color: currentColor;
	}
	.agent-check-icon {
		width: 13px;
		height: 13px;
		color: currentColor;
	}

	/* Task block */
	.agent-task {
		background: var(--dbg2, rgba(255,255,255,0.03));
		border: 1px solid var(--dbd, rgba(255,255,255,0.06));
		border-radius: 10px;
		padding: 12px 14px;
	}
	.agent-task__label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--dt3, #6b7280);
		margin-bottom: 5px;
	}
	.agent-task__text {
		font-size: 13px;
		color: var(--dt2, #a3a3a3);
		line-height: 1.5;
	}

	/* Steps */
	.agent-steps {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.agent-step {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--dt3, #6b7280);
		transition: color 0.3s;
	}
	.agent-step--done { color: var(--dt2, #a3a3a3); }
	.agent-step__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--dbd, rgba(255,255,255,0.15));
		flex-shrink: 0;
		transition: background 0.3s;
	}
	.agent-step--done .agent-step__dot { background: #10b981; }

	/* Footer */
	.agent-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 4px;
		border-top: 1px solid var(--dbd, rgba(255,255,255,0.06));
	}
	.agent-elapsed {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		color: var(--dt3, #6b7280);
	}
	.agent-elapsed__icon { font-size: 12px; }
	.agent-elapsed__label { font-variant-numeric: tabular-nums; }
	.agent-actions { display: flex; gap: 8px; }

	/* Agent buttons */
	.agent-btn {
		padding: 6px 14px;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		border: 1px solid transparent;
		transition: opacity 0.15s, background 0.15s;
	}
	.agent-btn--primary {
		background: var(--dt, #e5e5e5);
		color: #fff;
		border-color: transparent;
	}
	.agent-btn--primary:hover { opacity: 0.85; }
	.agent-btn--stop {
		background: rgba(239, 68, 68, 0.12);
		color: #f87171;
		border-color: rgba(239, 68, 68, 0.25);
	}
	.agent-btn--stop:hover { background: rgba(239, 68, 68, 0.2); }
	.agent-btn--ghost {
		background: transparent;
		color: var(--dt2, #a3a3a3);
		border-color: var(--dbd, rgba(255,255,255,0.1));
	}
	.agent-btn--ghost:hover { background: var(--dbg2, rgba(255,255,255,0.04)); }

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .agent-btn--primary {
		background: #e5e5e5;
		color: #111;
	}
</style>
