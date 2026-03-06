<script lang="ts">
	type TriggerType = 'cron' | 'webhook' | 'manual' | 'pr';
	type RunStatus = 'success' | 'running' | 'failed';

	interface Workflow {
		id: string;
		trigger: TriggerType;
		name: string;
		schedule: string;
		lastStatus: RunStatus;
		nextRun: string;
		cronExpr: string;
		agent: string;
		prompt: string;
		repos: string[];
		output: string;
		enabled: boolean;
	}

	const workflows: Workflow[] = [
		{
			id: 'w1',
			trigger: 'cron',
			name: 'Nightly Code Review',
			schedule: 'Every day at 2:00 AM',
			lastStatus: 'success',
			nextRun: 'in 6h 42m',
			cronExpr: '0 2 * * *',
			agent: 'claude-3-5-sonnet',
			prompt: 'Review all commits merged today. Flag security issues, anti-patterns, and missed edge cases. Group findings by severity.',
			repos: ['miosa/core', 'miosa/api'],
			output: 'pr',
			enabled: true,
		},
		{
			id: 'w2',
			trigger: 'pr',
			name: 'PR Auto-Review',
			schedule: 'On every pull request',
			lastStatus: 'running',
			nextRun: 'running now',
			cronExpr: '',
			agent: 'claude-3-5-sonnet',
			prompt: 'Review this PR for correctness, naming conventions, test coverage, and potential regressions. Leave inline comments.',
			repos: ['miosa/core'],
			output: 'pr',
			enabled: true,
		},
		{
			id: 'w3',
			trigger: 'cron',
			name: 'Weekly Dependency Audit',
			schedule: 'Every Monday at 9:00 AM',
			lastStatus: 'failed',
			nextRun: 'in 3d 14h',
			cronExpr: '0 9 * * 1',
			agent: 'gpt-4o',
			prompt: 'Audit all npm and Go module dependencies. Flag CVEs, outdated majors, and unused packages. Suggest safe update paths.',
			repos: ['miosa/core', 'miosa/api', 'miosa/frontend'],
			output: 'slack',
			enabled: false,
		},
		{
			id: 'w4',
			trigger: 'manual',
			name: 'Manual Refactor Sweep',
			schedule: 'Run on demand',
			lastStatus: 'success',
			nextRun: 'manual',
			cronExpr: '',
			agent: 'claude-3-opus',
			prompt: 'Identify and propose refactoring opportunities: duplicate code, oversized functions, unclear naming, and missing abstractions.',
			repos: ['miosa/core'],
			output: 'email',
			enabled: true,
		},
	];

	const agents = [
		{ value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
		{ value: 'claude-3-opus', label: 'Claude 3 Opus' },
		{ value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
		{ value: 'gpt-4o', label: 'GPT-4o' },
		{ value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
		{ value: 'gemini-1-5-pro', label: 'Gemini 1.5 Pro' },
	];

	const outputs = [
		{ value: 'pr', label: 'GitHub PR Comment' },
		{ value: 'slack', label: 'Slack Notification' },
		{ value: 'email', label: 'Email Digest' },
		{ value: 'dashboard', label: 'Dashboard Only' },
	];

	let expandedId = $state<string | null>(null);

	// Per-card mutable config state mirroring initial workflow data
	let cardStates = $state(
		workflows.map((w) => ({
			id: w.id,
			cronExpr: w.cronExpr,
			agent: w.agent,
			prompt: w.prompt,
			reposRaw: w.repos.join(', '),
			output: w.output,
			enabled: w.enabled,
			runLoading: false,
		}))
	);

	function getCardState(id: string) {
		return cardStates.find((s) => s.id === id)!;
	}

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function triggerRun(id: string) {
		const s = getCardState(id);
		s.runLoading = true;
		setTimeout(() => {
			s.runLoading = false;
		}, 2000);
	}

	function triggerLabel(t: TriggerType): string {
		if (t === 'cron') return 'Cron';
		if (t === 'webhook') return 'Webhook';
		if (t === 'pr') return 'PR Event';
		return 'Manual';
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Dev Workflows & Automation</h2>
	<p class="ds-desc">Scheduled and event-driven AI agent workflows for automated code review, dependency audits, and codebase maintenance. Click any card to configure.</p>

	<!-- ══════════════════════════════════════════════════════════════
	     1. Workflow Grid
	══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Workflow Scheduler</h3>
		<p class="ds-card__sub">Click a workflow card to expand its configuration panel. Each workflow runs an AI agent on a trigger schedule.</p>

		<div class="dwf-grid">
			{#each workflows as wf}
				{@const cs = getCardState(wf.id)}
				{@const isOpen = expandedId === wf.id}

				<div
					class="dwf-card {isOpen ? 'dwf-card--open' : ''} {!cs.enabled ? 'dwf-card--disabled' : ''}"
					role="button"
					tabindex="0"
					aria-expanded={isOpen}
					aria-label="Configure {wf.name}"
					onclick={() => toggleExpand(wf.id)}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleExpand(wf.id)}
				>
					<!-- Summary row -->
					<div class="dwf-card__summary">
						<div class="dwf-card__top">
							<span class="dwf-trigger dwf-trigger--{wf.trigger}">{triggerLabel(wf.trigger)}</span>
							<div class="dwf-card__indicators">
								<span
									class="dwf-status-dot dwf-status-dot--{wf.lastStatus}"
									title="Last run: {wf.lastStatus}"
									aria-label="Last run {wf.lastStatus}"
								></span>
								<span class="dwf-chevron {isOpen ? 'dwf-chevron--open' : ''}" aria-hidden="true">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
										<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
							</div>
						</div>

						<div class="dwf-card__body">
							<p class="dwf-card__name">{wf.name}</p>
							<p class="dwf-card__schedule">{wf.schedule}</p>
						</div>

						<div class="dwf-card__footer">
							<span class="dwf-next-pill">
								{#if wf.lastStatus === 'running'}
									<span class="dwf-next-pulse" aria-hidden="true"></span>
								{/if}
								{wf.nextRun}
							</span>
						</div>
					</div>

					<!-- Expanded config panel -->
					{#if isOpen}
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							class="dwf-panel"
							role="region"
							aria-label="{wf.name} configuration"
							onclick={(e) => e.stopPropagation()}
						>
							<div class="dwf-panel__divider" aria-hidden="true"></div>

							<!-- Trigger input -->
							{#if wf.trigger === 'cron'}
								<div class="dwf-field">
									<label class="dwf-label" for="dwf-cron-{wf.id}">Cron Expression</label>
									<div class="dwf-input-row">
										<input
											id="dwf-cron-{wf.id}"
											class="dwf-input dwf-input--mono"
											type="text"
											bind:value={cs.cronExpr}
											placeholder="0 2 * * *"
											aria-label="Cron schedule expression"
										/>
										<span class="dwf-cron-hint">{cs.cronExpr ? wf.schedule : 'Enter a cron expression'}</span>
									</div>
								</div>
							{:else if wf.trigger === 'pr'}
								<div class="dwf-field">
									<label class="dwf-label" for="dwf-event-{wf.id}">Event Trigger</label>
									<div class="dwf-select-wrap">
										<select id="dwf-event-{wf.id}" class="dwf-select" aria-label="PR event selector">
											<option>pull_request.opened</option>
											<option>pull_request.synchronize</option>
											<option>pull_request.ready_for_review</option>
										</select>
										<span class="dwf-select-caret" aria-hidden="true">▾</span>
									</div>
								</div>
							{:else if wf.trigger === 'webhook'}
								<div class="dwf-field">
									<label class="dwf-label" for="dwf-webhook-{wf.id}">Webhook URL</label>
									<input
										id="dwf-webhook-{wf.id}"
										class="dwf-input dwf-input--mono"
										type="text"
										value="https://hooks.miosa.io/wf/{wf.id}"
										readonly
										aria-label="Webhook endpoint URL"
									/>
								</div>
							{:else}
								<div class="dwf-field">
									<p class="dwf-manual-note">This workflow runs manually only. Use the "Run Now" button below.</p>
								</div>
							{/if}

							<!-- Agent / model -->
							<div class="dwf-field">
								<label class="dwf-label" for="dwf-agent-{wf.id}">Agent / Model</label>
								<div class="dwf-select-wrap">
									<select id="dwf-agent-{wf.id}" class="dwf-select" bind:value={cs.agent} aria-label="Select AI agent or model">
										{#each agents as ag}
											<option value={ag.value}>{ag.label}</option>
										{/each}
									</select>
									<span class="dwf-select-caret" aria-hidden="true">▾</span>
								</div>
							</div>

							<!-- Prompt -->
							<div class="dwf-field">
								<label class="dwf-label" for="dwf-prompt-{wf.id}">System Prompt</label>
								<textarea
									id="dwf-prompt-{wf.id}"
									class="dwf-textarea"
									rows="3"
									bind:value={cs.prompt}
									placeholder="Describe what the agent should do..."
									aria-label="Agent system prompt"
								></textarea>
							</div>

							<!-- Target repos -->
							<div class="dwf-field">
								<label class="dwf-label" for="dwf-repos-{wf.id}">Target Repositories</label>
								<input
									id="dwf-repos-{wf.id}"
									class="dwf-input"
									type="text"
									bind:value={cs.reposRaw}
									placeholder="org/repo1, org/repo2"
									aria-label="Comma-separated target repositories"
								/>
								<p class="dwf-field-hint">Comma-separated. Wildcards supported: <code class="dwf-code">org/*</code></p>
							</div>

							<!-- Output destination -->
							<div class="dwf-field">
								<label class="dwf-label" for="dwf-output-{wf.id}">Output Destination</label>
								<div class="dwf-select-wrap">
									<select id="dwf-output-{wf.id}" class="dwf-select" bind:value={cs.output} aria-label="Select output destination">
										{#each outputs as op}
											<option value={op.value}>{op.label}</option>
										{/each}
									</select>
									<span class="dwf-select-caret" aria-hidden="true">▾</span>
								</div>
							</div>

							<!-- Footer: toggle + run -->
							<div class="dwf-panel__footer">
								<label class="dwf-toggle-wrap" aria-label="Enable or disable workflow">
									<span class="dwf-toggle-label">{cs.enabled ? 'Enabled' : 'Disabled'}</span>
									<button
										class="dwf-toggle {cs.enabled ? 'dwf-toggle--on' : ''}"
										role="switch"
										aria-checked={cs.enabled}
										onclick={(e) => { e.stopPropagation(); cs.enabled = !cs.enabled; }}
										aria-label="Toggle workflow {cs.enabled ? 'off' : 'on'}"
									>
										<span class="dwf-toggle__thumb"></span>
									</button>
								</label>

								<button
									class="dwf-btn-run {cs.runLoading ? 'dwf-btn-run--loading' : ''}"
									disabled={cs.runLoading}
									onclick={(e) => { e.stopPropagation(); triggerRun(wf.id); }}
									aria-label="Run {wf.name} now"
									aria-busy={cs.runLoading}
								>
									{#if cs.runLoading}
										<span class="dwf-btn-spinner" aria-hidden="true"></span>
										Running…
									{:else}
										<svg class="dwf-btn-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M8 5v14l11-7z"/>
										</svg>
										Run Now
									{/if}
								</button>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     2. Trigger Type Reference
	══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Trigger Types</h3>
		<p class="ds-card__sub">Four trigger modes for AI dev workflows. Each maps to a distinct scheduling primitive.</p>

		<div class="dwf-triggers-grid">
			<div class="dwf-tref">
				<span class="dwf-trigger dwf-trigger--cron">Cron</span>
				<p class="dwf-tref__desc">Time-based scheduling using standard cron expressions. Runs at fixed intervals regardless of repository activity.</p>
				<code class="dwf-tref__example">0 2 * * *  →  daily at 2:00 AM</code>
			</div>
			<div class="dwf-tref">
				<span class="dwf-trigger dwf-trigger--pr">PR Event</span>
				<p class="dwf-tref__desc">Fires when a pull request is opened, updated, or marked ready for review. Ideal for automated inline code review.</p>
				<code class="dwf-tref__example">pull_request.opened</code>
			</div>
			<div class="dwf-tref">
				<span class="dwf-trigger dwf-trigger--webhook">Webhook</span>
				<p class="dwf-tref__desc">Triggered by an HTTP POST to a unique workflow URL. Integrates with any external system or CI pipeline step.</p>
				<code class="dwf-tref__example">POST /hooks/wf/w3</code>
			</div>
			<div class="dwf-tref">
				<span class="dwf-trigger dwf-trigger--manual">Manual</span>
				<p class="dwf-tref__desc">Runs only when explicitly invoked. Used for on-demand audits and one-off sweeps that should not auto-execute.</p>
				<code class="dwf-tref__example">workflows.run('manual-sweep')</code>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     3. Run History Feed
	══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Run History</h3>
		<p class="ds-card__sub">Recent workflow execution log with trigger type, status, duration, and output destination.</p>

		<div class="dwf-history">
			{#each [
				{ wf: 'Nightly Code Review',     trigger: 'cron',   status: 'success', time: '2h ago',   duration: '48s',   output: 'PR comment',   note: '3 issues found' },
				{ wf: 'PR Auto-Review',          trigger: 'pr',     status: 'running', time: 'just now', duration: '—',     output: 'PR comment',   note: 'In progress…' },
				{ wf: 'Weekly Dependency Audit', trigger: 'cron',   status: 'failed',  time: '3d ago',   duration: '12s',   output: 'Slack',        note: 'Rate limit exceeded' },
				{ wf: 'Nightly Code Review',     trigger: 'cron',   status: 'success', time: '1d ago',   duration: '52s',   output: 'PR comment',   note: '0 issues found' },
				{ wf: 'Manual Refactor Sweep',   trigger: 'manual', status: 'success', time: '5d ago',   duration: '1m 4s', output: 'Email digest', note: '7 proposals generated' },
			] as run}
				<div class="dwf-history-row">
					<span
						class="dwf-status-dot dwf-status-dot--{run.status}"
						title={run.status}
						aria-label={run.status}
					></span>
					<div class="dwf-history-meta">
						<span class="dwf-history-name">{run.wf}</span>
						<span class="dwf-history-sub">{run.note}</span>
					</div>
					<div class="dwf-history-right">
						<span class="dwf-trigger dwf-trigger--{run.trigger} dwf-trigger--sm">{triggerLabel(run.trigger as TriggerType)}</span>
						<span class="dwf-history-time">{run.time}</span>
						<span class="dwf-history-dur">{run.duration}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     4. Status & Next-Run Indicators
	══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Status & Next-Run Indicators</h3>
		<p class="ds-card__sub">Dot indicators and countdown pills used across workflow cards. Includes the animated pulsing "running" state.</p>

		<div class="dwf-indicators-demo">
			<div class="dwf-ind-row">
				<span class="dwf-status-dot dwf-status-dot--success" aria-label="Success"></span>
				<span class="dwf-ind-label">Success</span>
				<span class="dwf-next-pill">in 6h 42m</span>
			</div>
			<div class="dwf-ind-row">
				<span class="dwf-status-dot dwf-status-dot--running" aria-label="Running"></span>
				<span class="dwf-ind-label">Running</span>
				<span class="dwf-next-pill">
					<span class="dwf-next-pulse" aria-hidden="true"></span>
					running now
				</span>
			</div>
			<div class="dwf-ind-row">
				<span class="dwf-status-dot dwf-status-dot--failed" aria-label="Failed"></span>
				<span class="dwf-ind-label">Failed</span>
				<span class="dwf-next-pill dwf-next-pill--disabled">disabled</span>
			</div>
		</div>
	</div>
</section>

<style>
	/* ════════════════════════════════════════════════════════════════
	   WORKFLOW GRID
	════════════════════════════════════════════════════════════════ */
	.dwf-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	@media (max-width: 720px) {
		.dwf-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ════════════════════════════════════════════════════════════════
	   WORKFLOW CARD
	════════════════════════════════════════════════════════════════ */
	.dwf-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		padding: 18px 20px;
		cursor: pointer;
		transition:
			border-color 0.18s ease,
			box-shadow 0.18s ease,
			background 0.18s ease;
		outline: none;
		user-select: none;
	}

	.dwf-card:hover {
		border-color: var(--dbd);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
	}

	.dwf-card:focus-visible {
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
		border-color: #3b82f6;
	}

	.dwf-card--open {
		border-color: #3b82f6;
		background: var(--dbg);
		box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
		cursor: default;
	}

	.dwf-card--disabled {
		opacity: 0.55;
	}

	.dwf-card__summary {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.dwf-card__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dwf-card__indicators {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.dwf-card__body {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.dwf-card__name {
		font-size: 15px;
		font-weight: 650;
		color: var(--dt);
		margin: 0;
		line-height: 1.3;
		letter-spacing: -0.01em;
	}

	.dwf-card__schedule {
		font-size: 12.5px;
		color: var(--dt3);
		margin: 0;
	}

	.dwf-card__footer {
		display: flex;
		align-items: center;
	}

	/* Chevron */
	.dwf-chevron {
		display: flex;
		align-items: center;
		color: var(--dt4);
		transition: transform 0.2s ease;
	}

	.dwf-chevron--open {
		transform: rotate(180deg);
	}

	/* ════════════════════════════════════════════════════════════════
	   TRIGGER BADGE
	════════════════════════════════════════════════════════════════ */
	.dwf-trigger {
		display: inline-flex;
		align-items: center;
		padding: 3px 9px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.dwf-trigger--cron {
		background: rgba(139, 92, 246, 0.12);
		color: #8b5cf6;
	}

	.dwf-trigger--pr {
		background: rgba(59, 130, 246, 0.12);
		color: #3b82f6;
	}

	.dwf-trigger--webhook {
		background: rgba(245, 158, 11, 0.12);
		color: #d97706;
	}

	.dwf-trigger--manual {
		background: rgba(107, 114, 128, 0.12);
		color: #6b7280;
	}

	.dwf-trigger--sm {
		font-size: 10px;
		padding: 2px 7px;
	}

	/* ════════════════════════════════════════════════════════════════
	   STATUS DOT
	════════════════════════════════════════════════════════════════ */
	.dwf-status-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.dwf-status-dot--success {
		background: #22c55e;
	}

	.dwf-status-dot--running {
		background: #3b82f6;
		animation: dwf-pulse-dot 1.4s ease-in-out infinite;
	}

	.dwf-status-dot--failed {
		background: #ef4444;
	}

	@keyframes dwf-pulse-dot {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.5; transform: scale(0.75); }
	}

	/* ════════════════════════════════════════════════════════════════
	   NEXT-RUN PILL
	════════════════════════════════════════════════════════════════ */
	.dwf-next-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 10px;
		border-radius: 9999px;
		font-size: 11.5px;
		font-weight: 500;
		color: var(--dt2);
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
	}

	.dwf-next-pill--disabled {
		color: var(--dt4);
		background: transparent;
	}

	.dwf-next-pulse {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #3b82f6;
		flex-shrink: 0;
		animation: dwf-pulse-dot 1.4s ease-in-out infinite;
	}

	/* ════════════════════════════════════════════════════════════════
	   EXPANDED CONFIG PANEL
	════════════════════════════════════════════════════════════════ */
	.dwf-panel {
		margin-top: 4px;
		animation: dwf-slide-in 0.2s ease forwards;
	}

	@keyframes dwf-slide-in {
		from { opacity: 0; transform: translateY(-6px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.dwf-panel__divider {
		height: 1px;
		background: var(--dbd);
		margin: 14px 0;
	}

	/* Fields */
	.dwf-field {
		margin-bottom: 14px;
	}

	.dwf-label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		margin-bottom: 6px;
		letter-spacing: 0.01em;
	}

	.dwf-input {
		width: 100%;
		padding: 8px 11px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-family: inherit;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.dwf-input:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.dwf-input--mono {
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
		font-size: 12.5px;
	}

	.dwf-input-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.dwf-input-row .dwf-input {
		flex: 1;
	}

	.dwf-cron-hint {
		font-size: 11.5px;
		color: var(--dt3);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.dwf-textarea {
		width: 100%;
		padding: 9px 11px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-family: inherit;
		line-height: 1.55;
		resize: vertical;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.dwf-textarea:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.dwf-select-wrap {
		position: relative;
	}

	.dwf-select {
		width: 100%;
		padding: 8px 32px 8px 11px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-family: inherit;
		appearance: none;
		outline: none;
		cursor: pointer;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.dwf-select:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.dwf-select-caret {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--dt3);
		font-size: 11px;
		pointer-events: none;
	}

	.dwf-field-hint {
		font-size: 11.5px;
		color: var(--dt3);
		margin: 5px 0 0;
	}

	.dwf-code {
		font-family: ui-monospace, monospace;
		background: var(--dbg3);
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 11px;
	}

	.dwf-manual-note {
		font-size: 12.5px;
		color: var(--dt3);
		margin: 0;
		font-style: italic;
	}

	/* Panel footer */
	.dwf-panel__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 16px;
		padding-top: 14px;
		border-top: 1px solid var(--dbd2);
		gap: 12px;
	}

	/* Toggle switch */
	.dwf-toggle-wrap {
		display: flex;
		align-items: center;
		gap: 9px;
		cursor: pointer;
	}

	.dwf-toggle-label {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--dt2);
		user-select: none;
	}

	.dwf-toggle {
		position: relative;
		width: 36px;
		height: 20px;
		border-radius: 9999px;
		border: none;
		background: var(--dbg3);
		cursor: pointer;
		transition: background 0.2s ease;
		outline: none;
		flex-shrink: 0;
		padding: 0;
	}

	.dwf-toggle:focus-visible {
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
	}

	.dwf-toggle--on {
		background: #22c55e;
	}

	.dwf-toggle__thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s ease;
	}

	.dwf-toggle--on .dwf-toggle__thumb {
		transform: translateX(16px);
	}

	/* Run Now button */
	.dwf-btn-run {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 18px;
		border-radius: 9999px;
		border: none;
		background: var(--dt);
		color: var(--dbg);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.15s ease, transform 0.12s ease;
		white-space: nowrap;
		outline: none;
		line-height: 1;
	}

	.dwf-btn-run:hover:not(:disabled) {
		opacity: 0.85;
		transform: translateY(-1px);
	}

	.dwf-btn-run:active:not(:disabled) {
		transform: translateY(0);
	}

	.dwf-btn-run:disabled,
	.dwf-btn-run--loading {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.dwf-btn-run:focus-visible {
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
	}

	.dwf-btn-icon {
		width: 13px;
		height: 13px;
		flex-shrink: 0;
	}

	.dwf-btn-spinner {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: #fff;
		animation: dwf-spin 0.6s linear infinite;
		flex-shrink: 0;
	}

	@keyframes dwf-spin {
		to { transform: rotate(360deg); }
	}

	/* ════════════════════════════════════════════════════════════════
	   TRIGGER TYPE REFERENCE GRID
	════════════════════════════════════════════════════════════════ */
	.dwf-triggers-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 14px;
	}

	@media (max-width: 640px) {
		.dwf-triggers-grid {
			grid-template-columns: 1fr;
		}
	}

	.dwf-tref {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 12px;
		padding: 16px 18px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.dwf-tref__desc {
		font-size: 12.5px;
		color: var(--dt2);
		margin: 0;
		line-height: 1.55;
	}

	.dwf-tref__example {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 11.5px;
		color: var(--dt3);
		background: var(--dbg3);
		padding: 5px 9px;
		border-radius: 6px;
		display: block;
		width: fit-content;
	}

	/* ════════════════════════════════════════════════════════════════
	   RUN HISTORY FEED
	════════════════════════════════════════════════════════════════ */
	.dwf-history {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dbd2);
		border-radius: 12px;
		overflow: hidden;
	}

	.dwf-history-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--dbd2);
		transition: background 0.12s ease;
	}

	.dwf-history-row:last-child {
		border-bottom: none;
	}

	.dwf-history-row:hover {
		background: var(--dbg2);
	}

	.dwf-history-meta {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.dwf-history-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dwf-history-sub {
		font-size: 11.5px;
		color: var(--dt3);
	}

	.dwf-history-right {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.dwf-history-time {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
	}

	.dwf-history-dur {
		font-size: 12px;
		color: var(--dt4);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
		min-width: 36px;
		text-align: right;
	}

	/* ════════════════════════════════════════════════════════════════
	   STATUS INDICATORS DEMO
	════════════════════════════════════════════════════════════════ */
	.dwf-indicators-demo {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 4px 0;
	}

	.dwf-ind-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.dwf-ind-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		min-width: 72px;
	}
</style>
