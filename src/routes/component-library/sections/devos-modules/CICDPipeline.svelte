<script lang="ts">
	// ── Types ────────────────────────────────────────────────────────────────
	type StageStatus = 'passed' | 'failed' | 'running' | 'pending';

	interface Stage {
		name: string;
		status: StageStatus;
		duration: string;
		logs: string[];
	}

	interface PipelineRun {
		id: string;
		branch: string;
		status: StageStatus;
		commit: string;
		triggeredBy: string;
		totalDuration: string;
		startedAt: string;
		stages: Stage[];
	}

	// ── Pipeline data ────────────────────────────────────────────────────────
	const runs: PipelineRun[] = [
		{
			id: 'run-4821',
			branch: 'main',
			status: 'passed',
			commit: 'a3f8c21',
			triggeredBy: 'kira.osei@miosa.dev',
			totalDuration: '4m 12s',
			startedAt: 'Today, 14:32',
			stages: [
				{
					name: 'Build',
					status: 'passed',
					duration: '48s',
					logs: [
						'[14:32:01] Starting build — node v20.11.0',
						'[14:32:04] Installing dependencies (pnpm install)',
						'[14:32:19] Dependencies resolved (312 packages)',
						'[14:32:21] Running tsc --noEmit',
						'[14:32:34] Type check passed',
						'[14:32:49] Build complete — dist/ 1.2 MB',
					],
				},
				{
					name: 'Test',
					status: 'passed',
					duration: '1m 38s',
					logs: [
						'[14:33:01] Vitest v2.1.4 starting',
						'[14:33:02] Collecting 84 test files',
						'[14:33:07] Running unit tests in parallel (workers: 8)',
						'[14:34:12] 798 tests passed · 0 failed · 12 skipped',
						'[14:34:18] Coverage: 84.2% lines · 79.1% branches',
						'[14:34:39] Test run complete',
					],
				},
				{
					name: 'Lint',
					status: 'passed',
					duration: '22s',
					logs: [
						'[14:34:45] oxlint v0.9.3 starting',
						'[14:34:46] Linting 214 files',
						'[14:34:52] oxfmt formatting check',
						'[14:34:58] No formatting issues found',
						'[14:35:01] 0 errors · 0 warnings',
						'[14:35:07] Lint passed',
					],
				},
				{
					name: 'Security',
					status: 'passed',
					duration: '34s',
					logs: [
						'[14:35:10] Running dependency audit',
						'[14:35:14] Scanning 312 packages for CVEs',
						'[14:35:29] No critical vulnerabilities found',
						'[14:35:31] Checking for hardcoded secrets',
						'[14:35:38] SAST scan: 0 issues',
						'[14:35:44] Security audit passed',
					],
				},
				{
					name: 'Deploy',
					status: 'passed',
					duration: '50s',
					logs: [
						'[14:35:48] Building Docker image (multi-stage)',
						'[14:35:59] Image size: 142 MB (alpine base)',
						'[14:36:04] Pushing to gcr.io/miosa-prod/foundation',
						'[14:36:21] Deploying to Cloud Run (us-central1)',
						'[14:36:34] Health check passed — 200 OK',
						'[14:36:38] Traffic shifted to revision-089',
					],
				},
			],
		},
		{
			id: 'run-4820',
			branch: 'feature/ci-pipeline-section',
			status: 'failed',
			commit: 'b7d2e94',
			triggeredBy: 'tom.bach@miosa.dev',
			totalDuration: '2m 04s',
			startedAt: 'Today, 11:18',
			stages: [
				{
					name: 'Build',
					status: 'passed',
					duration: '51s',
					logs: [
						'[11:18:03] Starting build — node v20.11.0',
						'[11:18:07] Installing dependencies (pnpm install)',
						'[11:18:22] Dependencies resolved (313 packages)',
						'[11:18:25] Running tsc --noEmit',
						'[11:18:39] Type check passed',
						'[11:18:54] Build complete — dist/ 1.2 MB',
					],
				},
				{
					name: 'Test',
					status: 'failed',
					duration: '1m 13s',
					logs: [
						'[11:19:07] Vitest v2.1.4 starting',
						'[11:19:08] Collecting 85 test files',
						'[11:19:13] Running unit tests in parallel (workers: 8)',
						'[11:19:55] FAIL src/lib/pipeline.test.ts',
						'[11:20:04] AssertionError: expected "running" to equal "passed"',
						'[11:20:20] 797 passed · 1 failed · 12 skipped — exiting',
					],
				},
				{
					name: 'Lint',
					status: 'pending',
					duration: '—',
					logs: [
						'[11:20:21] Skipped — upstream stage failed',
					],
				},
				{
					name: 'Security',
					status: 'pending',
					duration: '—',
					logs: [
						'[11:20:21] Skipped — upstream stage failed',
					],
				},
				{
					name: 'Deploy',
					status: 'pending',
					duration: '—',
					logs: [
						'[11:20:21] Skipped — upstream stage failed',
					],
				},
			],
		},
		{
			id: 'run-4819',
			branch: 'fix/auth-token-skew',
			status: 'running',
			commit: 'c1a9f77',
			triggeredBy: 'nadia.r@miosa.dev',
			totalDuration: '—',
			startedAt: 'Today, 09:55',
			stages: [
				{
					name: 'Build',
					status: 'passed',
					duration: '46s',
					logs: [
						'[09:55:02] Starting build — node v20.11.0',
						'[09:55:05] Installing dependencies (pnpm install)',
						'[09:55:19] Dependencies resolved (312 packages)',
						'[09:55:22] Running tsc --noEmit',
						'[09:55:35] Type check passed',
						'[09:55:48] Build complete — dist/ 1.2 MB',
					],
				},
				{
					name: 'Test',
					status: 'running',
					duration: '...',
					logs: [
						'[09:56:01] Vitest v2.1.4 starting',
						'[09:56:02] Collecting 84 test files',
						'[09:56:08] Running unit tests in parallel (workers: 8)',
						'[09:56:44] 612 / 798 tests complete...',
						'[09:56:55] auth.test.ts — running DEVICE_SIGNATURE_SKEW tests',
						'[09:57:01] ...',
					],
				},
				{
					name: 'Lint',
					status: 'pending',
					duration: '—',
					logs: [
						'[—] Waiting for Test stage to complete',
					],
				},
				{
					name: 'Security',
					status: 'pending',
					duration: '—',
					logs: [
						'[—] Waiting for Lint stage to complete',
					],
				},
				{
					name: 'Deploy',
					status: 'pending',
					duration: '—',
					logs: [
						'[—] Waiting for Security stage to complete',
					],
				},
			],
		},
	];

	// ── State ────────────────────────────────────────────────────────────────
	let activeRunId = $state<string>('run-4821');
	let activeStageIndex = $state<number | null>(null);
	let triggered = $state(false);

	let activeRun = $derived(runs.find((r) => r.id === activeRunId) ?? runs[0]);
	let activeStage = $derived(
		activeStageIndex !== null ? activeRun.stages[activeStageIndex] ?? null : null
	);

	function selectRun(id: string) {
		activeRunId = id;
		activeStageIndex = null;
	}

	function toggleStage(index: number) {
		activeStageIndex = activeStageIndex === index ? null : index;
	}

	function triggerPipeline() {
		triggered = true;
		setTimeout(() => {
			triggered = false;
		}, 2500);
	}

	const statusColor: Record<StageStatus, string> = {
		passed: '#22c55e',
		failed: '#ef4444',
		running: '#3b82f6',
		pending: 'var(--dbd)',
	};

	const runStatusColor: Record<StageStatus, string> = {
		passed: '#22c55e',
		failed: '#ef4444',
		running: '#3b82f6',
		pending: 'var(--dt3)',
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">CI/CD Pipeline Monitor</h2>
	<p class="ds-desc">
		Pipeline run selector, stage-by-stage status chain with log preview, run summary, and action
		controls. Covers passed, failed, running, and pending states.
	</p>

	<!-- ═══ 1. PIPELINE RUN SELECTOR ═════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pipeline Runs</h3>
		<p class="ds-card__sub">Click a run to inspect its stages and logs.</p>

		<div class="ci-runs">
			{#each runs as run}
				<button
					class="ci-run-btn"
					class:ci-run-btn--active={activeRunId === run.id}
					onclick={() => selectRun(run.id)}
					aria-label="Select pipeline run {run.id} on branch {run.branch}"
				>
					<span class="ci-run-btn__dot" style="background: {runStatusColor[run.status]};"></span>
					<span class="ci-run-btn__branch">{run.branch}</span>
					<span class="ci-run-btn__id">{run.id}</span>
					<span class="ci-run-btn__time">{run.startedAt}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 2. STAGE CHAIN ════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Stage Chain — {activeRun.id}</h3>
		<p class="ds-card__sub">Click any stage tile to expand its log output.</p>

		<div class="ci-chain">
			{#each activeRun.stages as stage, i}
				<button
					class="ci-stage"
					class:ci-stage--active={activeStageIndex === i}
					style="--stage-color: {statusColor[stage.status]};"
					onclick={() => toggleStage(i)}
					aria-label="Stage {stage.name}: {stage.status}. Click to {activeStageIndex === i ? 'collapse' : 'expand'} logs."
					aria-expanded={activeStageIndex === i}
				>
					<span class="ci-stage__icon">
						{#if stage.status === 'passed'}
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<circle cx="8" cy="8" r="7" stroke="#22c55e" stroke-width="1.5" />
								<path
									d="M4.5 8.5l2.5 2.5 4.5-5"
									stroke="#22c55e"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{:else if stage.status === 'failed'}
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<circle cx="8" cy="8" r="7" stroke="#ef4444" stroke-width="1.5" />
								<path
									d="M5.5 5.5l5 5M10.5 5.5l-5 5"
									stroke="#ef4444"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							</svg>
						{:else if stage.status === 'running'}
							<svg
								class="ci-stage__spinner"
								width="14"
								height="14"
								viewBox="0 0 16 16"
								fill="none"
								aria-hidden="true"
							>
								<circle
									cx="8"
									cy="8"
									r="6"
									stroke="#3b82f6"
									stroke-width="1.5"
									stroke-dasharray="22 16"
									stroke-linecap="round"
								/>
							</svg>
						{:else}
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<circle cx="8" cy="8" r="7" stroke="var(--dbd)" stroke-width="1.5" />
								<path d="M5.5 8h5" stroke="var(--dt3)" stroke-width="1.5" stroke-linecap="round" />
							</svg>
						{/if}
					</span>
					<span class="ci-stage__name">{stage.name}</span>
					<span class="ci-stage__dur">{stage.duration}</span>
				</button>

				{#if i < activeRun.stages.length - 1}
					<span class="ci-chain__arrow" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path
								d="M3 8h10M9 4l4 4-4 4"
								stroke="var(--dbd)"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
				{/if}
			{/each}
		</div>

		{#if activeStage !== null}
			<div class="ci-log">
				<div class="ci-log__header">
					<span class="ci-log__title">{activeStage.name} — log output</span>
					<button
						class="ci-log__close"
						onclick={() => {
							activeStageIndex = null;
						}}
						aria-label="Close log panel"
					>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path
								d="M1 1l10 10M11 1L1 11"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
					</button>
				</div>
				<pre class="ci-log__body"><code>{activeStage.logs.join('\n')}</code></pre>
			</div>
		{/if}
	</div>

	<!-- ═══ 3. PIPELINE SUMMARY ══════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Run Summary</h3>
		<p class="ds-card__sub">Key metadata for the selected pipeline run.</p>

		<div class="ci-summary">
			<div class="ci-summary__row">
				<span class="ci-summary__label">Branch</span>
				<span class="ci-summary__value ci-summary__value--mono">{activeRun.branch}</span>
			</div>
			<div class="ci-summary__row">
				<span class="ci-summary__label">Commit</span>
				<span class="ci-summary__value ci-summary__value--mono ci-summary__value--sha"
					>{activeRun.commit}</span
				>
			</div>
			<div class="ci-summary__row">
				<span class="ci-summary__label">Triggered by</span>
				<span class="ci-summary__value">{activeRun.triggeredBy}</span>
			</div>
			<div class="ci-summary__row">
				<span class="ci-summary__label">Started</span>
				<span class="ci-summary__value">{activeRun.startedAt}</span>
			</div>
			<div class="ci-summary__row">
				<span class="ci-summary__label">Total duration</span>
				<span class="ci-summary__value ci-summary__value--mono">{activeRun.totalDuration}</span>
			</div>
			<div class="ci-summary__row">
				<span class="ci-summary__label">Status</span>
				<span
					class="ci-summary__badge"
					style="color: {runStatusColor[activeRun.status]}; border-color: {runStatusColor[
						activeRun.status
					]}44; background: {runStatusColor[activeRun.status]}14;"
				>
					<span
						class="ci-summary__badge-dot"
						style="background: {runStatusColor[activeRun.status]};"
					></span>
					{activeRun.status}
				</span>
			</div>
		</div>
	</div>

	<!-- ═══ 4. STAGE STATUS LEGEND ═══════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Stage Status Reference</h3>
		<p class="ds-card__sub">Visual language used across stage tiles.</p>

		<div class="ci-legend">
			{#each [
				{ label: 'Passed', desc: 'Stage completed successfully', color: '#22c55e' },
				{ label: 'Failed', desc: 'Stage encountered an error', color: '#ef4444' },
				{ label: 'Running', desc: 'Stage currently in progress', color: '#3b82f6' },
				{ label: 'Pending', desc: 'Waiting for upstream stage', color: 'var(--dt3)' },
			] as item}
				<div class="ci-legend__item">
					<span
						class="ci-legend__swatch"
						style="border-color: {item.color}; background: {item.color}14;"
					></span>
					<div>
						<div class="ci-legend__name" style="color: {item.color};">{item.label}</div>
						<div class="ci-legend__desc">{item.desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 5. ACTIONS ════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pipeline Actions</h3>
		<p class="ds-card__sub">Trigger a new run or jump to full logs in the CI console.</p>

		<div class="ci-actions">
			<button
				class="ci-actions__trigger"
				class:ci-actions__trigger--sent={triggered}
				onclick={triggerPipeline}
				aria-label="Trigger new pipeline run"
			>
				{#if triggered}
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<circle cx="8" cy="8" r="7" stroke="#22c55e" stroke-width="1.5" />
						<path
							d="M4.5 8.5l2.5 2.5 4.5-5"
							stroke="#22c55e"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					Pipeline queued
				{:else}
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path d="M6 3.5L12.5 8 6 12.5V3.5z" fill="currentColor" />
					</svg>
					Trigger Pipeline
				{/if}
			</button>

			<a
				class="ci-actions__logs-link"
				href="/ci/logs/{activeRun.id}"
				aria-label="View full logs for {activeRun.id}"
			>
				<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.5" />
					<path d="M5 7h6M5 10h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
				View Full Logs
			</a>
		</div>
	</div>
</section>

<style>
	/* ── Run selector ──────────────────────────────────────────────────────── */
	.ci-runs {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 560px;
	}

	.ci-run-btn {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		text-align: left;
		transition:
			border-color 0.15s,
			background 0.15s;
		width: 100%;
	}

	.ci-run-btn:hover {
		border-color: var(--dt3);
		background: var(--dbg3);
	}

	.ci-run-btn--active {
		border-color: var(--dt);
		background: var(--dbg3);
	}

	.ci-run-btn__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ci-run-btn__branch {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ci-run-btn__id {
		font-size: 11px;
		font-family: monospace;
		color: var(--dt3);
		flex-shrink: 0;
	}

	.ci-run-btn__time {
		font-size: 11px;
		color: var(--dt3);
		flex-shrink: 0;
	}

	/* ── Stage chain ───────────────────────────────────────────────────────── */
	.ci-chain {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}

	.ci-chain__arrow {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--dt4);
	}

	.ci-stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 12px 16px;
		border-radius: 10px;
		border: 1.5px solid var(--stage-color, var(--dbd));
		background: var(--dbg2);
		cursor: pointer;
		min-width: 90px;
		transition:
			border-color 0.15s,
			background 0.15s,
			box-shadow 0.15s;
	}

	.ci-stage:hover {
		background: var(--dbg3);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--stage-color, var(--dbd)) 15%, transparent);
	}

	.ci-stage--active {
		background: var(--dbg3);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--stage-color, var(--dbd)) 20%, transparent);
	}

	.ci-stage__icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ci-stage__name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}

	.ci-stage__dur {
		font-size: 10px;
		font-family: monospace;
		color: var(--dt3);
	}

	.ci-stage__spinner {
		animation: ci-spin 1s linear infinite;
		transform-origin: center;
	}

	@keyframes ci-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* ── Log panel ─────────────────────────────────────────────────────────── */
	.ci-log {
		margin-top: 16px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		overflow: hidden;
	}

	.ci-log__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 14px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
	}

	.ci-log__title {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		font-family: monospace;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ci-log__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		transition:
			color 0.12s,
			background 0.12s;
	}

	.ci-log__close:hover {
		color: var(--dt);
		background: var(--dbd);
	}

	.ci-log__body {
		margin: 0;
		padding: 14px 16px;
		background: #0d0d0d;
		overflow-x: auto;
		font-size: 11.5px;
		line-height: 1.7;
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
		color: #a8b0b8;
		white-space: pre;
	}

	.ci-log__body code {
		font-family: inherit;
		color: inherit;
		background: none;
	}

	/* ── Summary table ─────────────────────────────────────────────────────── */
	.ci-summary {
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 520px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.ci-summary__row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 9px 14px;
		border-bottom: 1px solid var(--dbd2);
	}

	.ci-summary__row:last-child {
		border-bottom: none;
	}

	.ci-summary__row:nth-child(even) {
		background: var(--dbg2);
	}

	.ci-summary__label {
		font-size: 12px;
		color: var(--dt3);
		width: 120px;
		flex-shrink: 0;
	}

	.ci-summary__value {
		font-size: 13px;
		color: var(--dt);
	}

	.ci-summary__value--mono {
		font-family: monospace;
		font-size: 12px;
	}

	.ci-summary__value--sha {
		color: var(--dt2);
		letter-spacing: 0.03em;
	}

	.ci-summary__badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 10px;
		border-radius: 9999px;
		border: 1px solid;
		font-size: 12px;
		font-weight: 500;
		text-transform: capitalize;
	}

	.ci-summary__badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	/* ── Status legend ─────────────────────────────────────────────────────── */
	.ci-legend {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 10px;
	}

	.ci-legend__item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 10px 12px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
	}

	.ci-legend__swatch {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		border: 1.5px solid;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.ci-legend__name {
		font-size: 12px;
		font-weight: 600;
		margin-bottom: 2px;
	}

	.ci-legend__desc {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
	}

	/* ── Actions row ───────────────────────────────────────────────────────── */
	.ci-actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.ci-actions__trigger {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 9px 18px;
		border-radius: 9999px;
		border: 1.5px solid var(--dt);
		background: var(--dt);
		color: var(--dbg);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}

	.ci-actions__trigger:hover {
		opacity: 0.88;
	}

	.ci-actions__trigger--sent {
		background: #16a34a18;
		border-color: #22c55e;
		color: #22c55e;
	}

	.ci-actions__logs-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 9px 16px;
		border-radius: 9999px;
		border: 1.5px solid var(--dbd);
		background: transparent;
		color: var(--dt2);
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.ci-actions__logs-link:hover {
		border-color: var(--dt3);
		color: var(--dt);
	}
</style>
