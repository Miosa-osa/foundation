<script lang="ts">
	type TaskStatus = 'active' | 'paused' | 'error';
	type AgentType = 'reviewer' | 'refactorer' | 'tester' | 'documenter' | 'security-auditor';
	type Frequency = 'hourly' | 'daily' | 'weekly' | 'on-push';

	interface ScheduledTask {
		id: string;
		name: string;
		agentType: AgentType;
		frequency: Frequency;
		status: TaskStatus;
		model: string;
		maxTokens: number;
		timeout: number;
		retries: number;
		prompt: string;
		lastRun: string;
		nextRun: string;
	}

	interface HistoryRow {
		date: string;
		duration: string;
		status: 'success' | 'failed' | 'skipped';
		summary: string;
	}

	const historyByTask: Record<string, HistoryRow[]> = {
		'task-1': [
			{ date: '2026-03-06 02:00', duration: '4m 12s', status: 'success', summary: '3 vulnerabilities found, 2 auto-patched (CVE-2025-1047, CVE-2025-8821)' },
			{ date: '2026-03-05 02:00', duration: '3m 58s', status: 'success', summary: 'Clean — no new vulnerabilities detected in dependencies' },
			{ date: '2026-03-04 02:00', duration: '5m 31s', status: 'failed',  summary: 'Timeout exceeded scanning node_modules/webpack subtree' },
			{ date: '2026-03-03 02:00', duration: '4m 04s', status: 'success', summary: '1 moderate-severity issue flagged in auth middleware' },
		],
		'task-2': [
			{ date: '2026-03-03 08:00', duration: '7m 44s', status: 'success', summary: 'Coverage: 84.2% (+1.3%). 12 uncovered branches highlighted' },
			{ date: '2026-02-24 08:00', duration: '6m 19s', status: 'success', summary: 'Coverage: 82.9% (+0.7%). Report committed to docs/coverage/' },
			{ date: '2026-02-17 08:00', duration: '8m 02s', status: 'success', summary: 'Coverage: 82.2%. 3 critical paths flagged as untested' },
		],
		'task-3': [
			{ date: '2026-03-06 09:14', duration: '2m 07s', status: 'success', summary: 'PR #412 reviewed — 2 suggestions, 0 blocking issues' },
			{ date: '2026-03-06 07:51', duration: '1m 54s', status: 'success', summary: 'PR #411 reviewed — approved with minor naming comments' },
			{ date: '2026-03-05 16:33', duration: '3m 22s', status: 'success', summary: 'PR #409 reviewed — requested changes on error handling' },
			{ date: '2026-03-05 14:10', duration: '2m 48s', status: 'skipped', summary: 'PR #408 already reviewed by human reviewer — skipped' },
		],
		'task-4': [
			{ date: '2026-03-06 01:00', duration: '11m 38s', status: 'success', summary: '14 functions documented, 3 JSDoc blocks updated, README synced' },
			{ date: '2026-03-05 01:00', duration: '9m 55s',  status: 'success', summary: '8 functions documented. 2 deprecated APIs annotated' },
			{ date: '2026-03-04 01:00', duration: '10m 12s', status: 'failed',  summary: 'Git push rejected — branch protection rule (no force push)' },
		],
		'task-5': [
			{ date: '2026-03-06 03:00', duration: '6m 29s', status: 'success', summary: 'Simplified 4 utility functions, extracted 2 shared helpers' },
			{ date: '2026-03-05 03:00', duration: '5m 57s', status: 'success', summary: 'Deduplicated 3 date formatting helpers into lib/dates.ts' },
			{ date: '2026-03-04 03:00', duration: '7m 44s', status: 'success', summary: 'Reduced cyclomatic complexity in router.ts from 18 to 9' },
		],
	};

	let tasks = $state<ScheduledTask[]>([
		{
			id: 'task-1',
			name: 'Nightly Security Scan',
			agentType: 'security-auditor',
			frequency: 'daily',
			status: 'active',
			model: 'claude-opus-4',
			maxTokens: 32000,
			timeout: 300,
			retries: 2,
			lastRun: '6 hours ago',
			nextRun: 'in 18 hours',
			prompt: 'Perform a comprehensive security audit of the repository. Scan all dependencies for known CVEs using the package manifest. Review authentication middleware, input validation layers, and API route handlers for injection vulnerabilities. Flag any hardcoded secrets, insecure defaults, or missing rate limits. Output a structured report grouped by severity (critical / high / medium / low) with remediation steps for each finding.',
		},
		{
			id: 'task-2',
			name: 'Weekly Test Coverage Report',
			agentType: 'tester',
			frequency: 'weekly',
			status: 'active',
			model: 'claude-sonnet-4',
			maxTokens: 16000,
			timeout: 600,
			retries: 1,
			lastRun: '3 days ago',
			nextRun: 'in 4 days',
			prompt: 'Analyze the current test suite coverage. Identify all source files with coverage below 80%. For each under-covered module, generate unit test stubs covering the most critical code paths. Prioritize tests for public API boundaries, error handling branches, and any code modified in the past 7 days. Commit generated test files to tests/generated/ and open a draft PR with a coverage delta summary.',
		},
		{
			id: 'task-3',
			name: 'PR Code Review Bot',
			agentType: 'reviewer',
			frequency: 'on-push',
			status: 'active',
			model: 'claude-sonnet-4',
			maxTokens: 8000,
			timeout: 120,
			retries: 0,
			lastRun: '47 min ago',
			nextRun: 'on next push',
			prompt: 'Review the pull request diff for correctness, readability, and adherence to our team conventions. Check for: missing error handling, N+1 query patterns, hardcoded values that should be config, and TypeScript type safety gaps. Leave inline comments on specific lines where issues are found. Provide an overall summary comment with a verdict: Approved / Changes Requested / Needs Discussion.',
		},
		{
			id: 'task-4',
			name: 'Daily Docs Sync',
			agentType: 'documenter',
			frequency: 'daily',
			status: 'paused',
			model: 'claude-haiku-4',
			maxTokens: 4000,
			timeout: 180,
			retries: 1,
			lastRun: '1 day ago',
			nextRun: 'paused',
			prompt: 'Scan for any exported functions, classes, or types that are missing JSDoc/TSDoc documentation. For each undocumented symbol, generate a doc comment that describes its purpose, parameters, return value, and any thrown errors. Also check if the top-level README reflects the current project structure. Commit changes with message "docs: auto-sync documentation [skip ci]".',
		},
		{
			id: 'task-5',
			name: 'Nightly Refactor Pass',
			agentType: 'refactorer',
			frequency: 'daily',
			status: 'error',
			model: 'claude-sonnet-4',
			maxTokens: 16000,
			timeout: 240,
			retries: 3,
			lastRun: 'failed 2 hours ago',
			nextRun: 'retry in 22 hours',
			prompt: 'Identify code duplication and high-complexity functions in the src/ directory. Focus on functions with cyclomatic complexity above 10 or files exceeding 400 lines. Propose and apply safe, behaviour-preserving refactors: extract shared logic into utility modules, replace repetitive patterns with generic helpers, and simplify nested conditionals. Run the test suite after each change and abort if any tests fail.',
		},
	]);

	let expandedTaskId = $state<string | null>(null);
	let showNewTaskForm = $state(false);

	let newAgentType = $state<AgentType>('reviewer');
	let newFrequency = $state<Frequency>('daily');
	let newModel = $state('claude-sonnet-4');
	let newScope = $state('src/**/*.ts');
	let newPrompt = $state('');
	let formSubmitted = $state(false);

	function toggleExpand(id: string) {
		expandedTaskId = expandedTaskId === id ? null : id;
	}

	function togglePause(id: string) {
		tasks = tasks.map(t => {
			if (t.id !== id) return t;
			return { ...t, status: t.status === 'paused' ? 'active' : 'paused' };
		});
	}

	function submitNewTask() {
		formSubmitted = true;
		setTimeout(() => {
			formSubmitted = false;
			showNewTaskForm = false;
			newPrompt = '';
		}, 1800);
	}

	const agentTypeMeta: Record<AgentType, { label: string; color: string; icon: string }> = {
		reviewer:           { label: 'Reviewer',        color: 'purple', icon: '◎' },
		refactorer:         { label: 'Refactorer',      color: 'blue',   icon: '⟳' },
		tester:             { label: 'Tester',           color: 'green',  icon: '✓' },
		documenter:         { label: 'Documenter',       color: 'amber',  icon: '⊞' },
		'security-auditor': { label: 'Security Auditor', color: 'red',    icon: '⚑' },
	};

	const frequencyLabels: Record<Frequency, string> = {
		hourly:   'Hourly',
		daily:    'Daily',
		weekly:   'Weekly',
		'on-push': 'On Push',
	};

	const modelOptions = [
		{ value: 'claude-opus-4',   label: 'Claude Opus 4' },
		{ value: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
		{ value: 'claude-haiku-4',  label: 'Claude Haiku 4' },
	];

	const agentTypeOptions: Array<{ value: AgentType; label: string }> = [
		{ value: 'reviewer',           label: 'Reviewer' },
		{ value: 'refactorer',         label: 'Refactorer' },
		{ value: 'tester',             label: 'Tester' },
		{ value: 'documenter',         label: 'Documenter' },
		{ value: 'security-auditor',   label: 'Security Auditor' },
	];
</script>

<section class="ds-section">

	<h2 class="ds-title">Dev Agent Scheduler</h2>
	<p class="ds-subtitle">Schedule recurring AI agents to run security audits, test coverage checks, code reviews, documentation passes, and refactor sweeps — automatically, on a cron or event trigger.</p>

	<!-- ═══ 1. SCHEDULED TASK LIST ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Scheduled Task List</h3>
		<p class="ds-card__sub">Active and paused agent schedules with status indicators, pause/resume toggles, and per-task configuration panels. Click the expand arrow on any row to edit its config and view execution history.</p>

		<div class="das-task-list" role="list">
			{#each tasks as task (task.id)}
				{@const meta = agentTypeMeta[task.agentType]}
				{@const isExpanded = expandedTaskId === task.id}
				{@const isPaused = task.status === 'paused'}
				{@const isError = task.status === 'error'}

				<div
					class="das-task-row das-task-row--{task.status}"
					role="listitem"
					aria-label={task.name}
				>
					<!-- Row header -->
					<div class="das-task-header">
						<div class="das-task-left">
							<span class="das-agent-badge das-agent-badge--{meta.color}" aria-label="{meta.label} agent">
								<span class="das-agent-badge__icon" aria-hidden="true">{meta.icon}</span>
								{meta.label}
							</span>
							<div class="das-task-info">
								<span class="das-task-name">{task.name}</span>
								<span class="das-task-timing">
									{#if isError}
										<span class="das-timing-err">{task.lastRun}</span>
									{:else}
										<span class="das-timing-muted">Last: {task.lastRun}</span>
										<span class="das-timing-sep" aria-hidden="true">·</span>
										<span class="das-timing-next">Next: {task.nextRun}</span>
									{/if}
								</span>
							</div>
						</div>

						<div class="das-task-right">
							<span class="das-freq-badge">{frequencyLabels[task.frequency]}</span>
							<span class="das-status-label das-status-label--{task.status}" aria-label="Status: {task.status}">
								{#if task.status === 'active'}Active{:else if task.status === 'paused'}Paused{:else}Error{/if}
							</span>
							<button
								class="das-toggle-btn das-toggle-btn--{isPaused ? 'resume' : isError ? 'error' : 'pause'}"
								onclick={() => { if (!isError) togglePause(task.id); }}
								disabled={isError}
								aria-label="{isPaused ? 'Resume' : 'Pause'} {task.name}"
							>
								{isPaused ? 'Resume' : isError ? 'Retry' : 'Pause'}
							</button>
							<button
								class="das-expand-btn"
								onclick={() => toggleExpand(task.id)}
								aria-expanded={isExpanded}
								aria-label="{isExpanded ? 'Collapse' : 'Expand'} {task.name} details"
							>
								<svg
									class="das-expand-icon das-expand-icon--{isExpanded ? 'open' : 'closed'}"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<polyline points="6 9 12 15 18 9"></polyline>
								</svg>
							</button>
						</div>
					</div>

					<!-- Expanded detail panel -->
					{#if isExpanded}
						<div class="das-task-detail" role="region" aria-label="{task.name} configuration">

							<div class="das-detail-config">
								<div class="das-config-grid">
									<div class="das-config-field">
										<label class="das-config-label" for="das-model-{task.id}">Model</label>
										<div class="das-select-wrap">
											<select id="das-model-{task.id}" class="das-select" aria-label="Model for {task.name}">
												{#each modelOptions as opt}
													<option value={opt.value} selected={opt.value === task.model}>{opt.label}</option>
												{/each}
											</select>
											<span class="das-select-caret" aria-hidden="true">▾</span>
										</div>
									</div>

									<div class="das-config-field">
										<label class="das-config-label" for="das-tokens-{task.id}">Max Tokens</label>
										<input
											id="das-tokens-{task.id}"
											class="das-input das-input--mono"
											type="number"
											value={task.maxTokens}
											min="1000"
											max="200000"
											step="1000"
											aria-label="Max tokens for {task.name}"
										/>
									</div>

									<div class="das-config-field">
										<label class="das-config-label" for="das-timeout-{task.id}">Timeout (s)</label>
										<input
											id="das-timeout-{task.id}"
											class="das-input das-input--mono"
											type="number"
											value={task.timeout}
											min="10"
											max="3600"
											step="10"
											aria-label="Timeout in seconds for {task.name}"
										/>
									</div>

									<div class="das-config-field">
										<label class="das-config-label" for="das-retries-{task.id}">Retry Policy</label>
										<div class="das-select-wrap">
											<select id="das-retries-{task.id}" class="das-select" aria-label="Retry policy for {task.name}">
												<option value="0" selected={task.retries === 0}>0 — No retry</option>
												<option value="1" selected={task.retries === 1}>1 — Retry once</option>
												<option value="2" selected={task.retries === 2}>2 — Retry twice</option>
												<option value="3" selected={task.retries === 3}>3 — Retry thrice</option>
											</select>
											<span class="das-select-caret" aria-hidden="true">▾</span>
										</div>
									</div>
								</div>

								<div class="das-config-field das-config-field--full">
									<label class="das-config-label" for="das-prompt-{task.id}">Agent Instructions</label>
									<textarea
										id="das-prompt-{task.id}"
										class="das-textarea"
										rows="5"
										aria-label="Agent instructions for {task.name}"
									>{task.prompt}</textarea>
								</div>

								<div class="das-config-actions">
									<button class="das-btn das-btn--ghost das-btn--sm">Discard</button>
									<button class="das-btn das-btn--primary das-btn--sm">Save Config</button>
								</div>
							</div>

							<!-- Execution history table -->
							<div class="das-history">
								<h4 class="das-history-title">Execution History</h4>
								<div class="das-history-table-wrap">
									<table class="das-history-table" aria-label="Execution history for {task.name}">
										<thead>
											<tr>
												<th class="das-th">Date &amp; Time</th>
												<th class="das-th">Duration</th>
												<th class="das-th">Status</th>
												<th class="das-th das-th--wide">Output Summary</th>
											</tr>
										</thead>
										<tbody>
											{#each (historyByTask[task.id] ?? []) as row}
												<tr class="das-history-row">
													<td class="das-td das-td--mono">{row.date}</td>
													<td class="das-td das-td--mono">{row.duration}</td>
													<td class="das-td">
														<span class="das-run-status das-run-status--{row.status}">
															{row.status === 'success' ? '✓ Success' : row.status === 'failed' ? '✗ Failed' : '— Skipped'}
														</span>
													</td>
													<td class="das-td das-td--summary">{row.summary}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="das-list-footer">
			<button
				class="das-btn das-btn--primary"
				onclick={() => { showNewTaskForm = !showNewTaskForm; expandedTaskId = null; }}
				aria-expanded={showNewTaskForm}
				aria-controls="das-new-task-form"
			>
				{showNewTaskForm ? '✕ Cancel' : '+ Schedule New Task'}
			</button>
		</div>
	</div>

	<!-- ═══ 2. SCHEDULE NEW TASK FORM ═══ -->
	{#if showNewTaskForm}
		<div class="ds-card" id="das-new-task-form" role="region" aria-label="Schedule new task form">
			<h3 class="ds-card__title">Schedule New Task</h3>
			<p class="ds-card__sub">Configure a new recurring agent run. Pick an agent type, trigger frequency, model, target scope, and the exact instructions the agent will follow on each execution.</p>

			<form
				class="das-new-form"
				onsubmit={(e) => { e.preventDefault(); submitNewTask(); }}
				aria-label="New scheduled task"
			>
				<div class="das-form-grid das-form-grid--3">
					<div class="das-config-field">
						<label class="das-config-label" for="das-new-agent-type">Agent Type</label>
						<div class="das-select-wrap">
							<select id="das-new-agent-type" class="das-select" bind:value={newAgentType}>
								{#each agentTypeOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
							<span class="das-select-caret" aria-hidden="true">▾</span>
						</div>
					</div>

					<div class="das-config-field">
						<label class="das-config-label" for="das-new-frequency">Frequency</label>
						<div class="das-select-wrap">
							<select id="das-new-frequency" class="das-select" bind:value={newFrequency}>
								<option value="hourly">Hourly</option>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="on-push">On Push</option>
							</select>
							<span class="das-select-caret" aria-hidden="true">▾</span>
						</div>
					</div>

					<div class="das-config-field">
						<label class="das-config-label" for="das-new-model">Model</label>
						<div class="das-select-wrap">
							<select id="das-new-model" class="das-select" bind:value={newModel}>
								{#each modelOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
							<span class="das-select-caret" aria-hidden="true">▾</span>
						</div>
					</div>
				</div>

				<div class="das-config-field">
					<label class="das-config-label" for="das-new-scope">Target Scope</label>
					<input
						id="das-new-scope"
						class="das-input das-input--mono"
						type="text"
						placeholder="e.g. src/**/*.ts, src/api/, README.md"
						bind:value={newScope}
						aria-label="Target file or directory scope"
					/>
					<span class="das-field-hint">Glob pattern, directory path, or single file</span>
				</div>

				<div class="das-config-field">
					<label class="das-config-label" for="das-new-prompt">Agent Instructions</label>
					<textarea
						id="das-new-prompt"
						class="das-textarea das-textarea--tall"
						rows="6"
						placeholder="Describe exactly what this agent should do each time it runs. Be specific about what to check, what to output, and what actions to take..."
						bind:value={newPrompt}
						aria-label="Instructions for the new scheduled agent"
					></textarea>
				</div>

				<div class="das-form-preview" aria-label="Task preview">
					<span class="das-preview-label">Preview</span>
					<span class="das-agent-badge das-agent-badge--{agentTypeMeta[newAgentType].color}">
						<span class="das-agent-badge__icon" aria-hidden="true">{agentTypeMeta[newAgentType].icon}</span>
						{agentTypeMeta[newAgentType].label}
					</span>
					<span class="das-freq-badge">{frequencyLabels[newFrequency]}</span>
					<span class="das-preview-model">{modelOptions.find(m => m.value === newModel)?.label ?? newModel}</span>
					{#if newScope}
						<span class="das-preview-scope">{newScope}</span>
					{/if}
				</div>

				<div class="das-form-actions">
					<button
						type="button"
						class="das-btn das-btn--ghost"
						onclick={() => { showNewTaskForm = false; newPrompt = ''; }}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="das-btn das-btn--primary"
						disabled={formSubmitted}
						aria-label="Create scheduled task"
					>
						{#if formSubmitted}
							<span class="das-btn-spinner" aria-hidden="true"></span>
							Creating...
						{:else}
							Create Schedule
						{/if}
					</button>
				</div>
			</form>
		</div>
	{/if}

</section>

<style>
	/* ─────────────────────────────────────────
	   Task List Container
	───────────────────────────────────────── */
	.das-task-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
	}

	/* ─────────────────────────────────────────
	   Task Row
	───────────────────────────────────────── */
	.das-task-row {
		border-left: 3px solid transparent;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.15s;
	}
	.das-task-row:last-child {
		border-bottom: none;
	}
	.das-task-row--active { border-left-color: #22c55e; }
	.das-task-row--paused { border-left-color: var(--dbd); }
	.das-task-row--error  { border-left-color: #ef4444; }

	.das-task-row:hover {
		background: var(--dbg2);
	}

	/* ─────────────────────────────────────────
	   Task Row Header
	───────────────────────────────────────── */
	.das-task-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 13px 16px;
		flex-wrap: wrap;
	}

	.das-task-left {
		display: flex;
		align-items: center;
		gap: 11px;
		flex: 1;
		min-width: 0;
	}

	.das-task-right {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.das-task-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.das-task-name {
		font-size: 13.5px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.das-task-timing {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11.5px;
	}
	.das-timing-muted { color: var(--dt3); }
	.das-timing-sep   { color: var(--dt4); }
	.das-timing-next  { color: var(--dt2); }
	.das-timing-err   { color: #ef4444; font-weight: 500; }

	/* ─────────────────────────────────────────
	   Agent Type Badge
	───────────────────────────────────────── */
	.das-agent-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 9px 3px 7px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.01em;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.das-agent-badge__icon {
		font-size: 12px;
		line-height: 1;
	}

	.das-agent-badge--purple {
		background: color-mix(in srgb, #a855f7 12%, transparent);
		color: #c084fc;
		border: 1px solid color-mix(in srgb, #a855f7 28%, transparent);
	}
	.das-agent-badge--blue {
		background: color-mix(in srgb, #3b82f6 12%, transparent);
		color: #60a5fa;
		border: 1px solid color-mix(in srgb, #3b82f6 28%, transparent);
	}
	.das-agent-badge--green {
		background: color-mix(in srgb, #22c55e 12%, transparent);
		color: #4ade80;
		border: 1px solid color-mix(in srgb, #22c55e 28%, transparent);
	}
	.das-agent-badge--amber {
		background: color-mix(in srgb, #f59e0b 12%, transparent);
		color: #fbbf24;
		border: 1px solid color-mix(in srgb, #f59e0b 28%, transparent);
	}
	.das-agent-badge--red {
		background: color-mix(in srgb, #ef4444 12%, transparent);
		color: #f87171;
		border: 1px solid color-mix(in srgb, #ef4444 28%, transparent);
	}

	/* ─────────────────────────────────────────
	   Frequency Badge
	───────────────────────────────────────── */
	.das-freq-badge {
		display: inline-block;
		padding: 3px 8px;
		border-radius: 6px;
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		white-space: nowrap;
	}

	/* ─────────────────────────────────────────
	   Status Label
	───────────────────────────────────────── */
	.das-status-label {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.das-status-label--active { color: #22c55e; }
	.das-status-label--paused { color: var(--dt3); }
	.das-status-label--error  { color: #ef4444; }

	/* ─────────────────────────────────────────
	   Pause / Resume Toggle Button
	───────────────────────────────────────── */
	.das-toggle-btn {
		padding: 4px 12px;
		border-radius: 9999px;
		font-size: 11.5px;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid var(--dbd);
		background: var(--dbg3);
		color: var(--dt2);
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		white-space: nowrap;
	}
	.das-toggle-btn:hover:not(:disabled) {
		background: var(--dbd);
		color: var(--dt);
	}
	.das-toggle-btn--resume {
		background: color-mix(in srgb, #22c55e 10%, transparent);
		color: #4ade80;
		border-color: color-mix(in srgb, #22c55e 28%, transparent);
	}
	.das-toggle-btn--resume:hover:not(:disabled) {
		background: color-mix(in srgb, #22c55e 20%, transparent);
	}
	.das-toggle-btn--error {
		opacity: 0.45;
		cursor: not-allowed;
	}
	.das-toggle-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	/* ─────────────────────────────────────────
	   Expand / Collapse Button
	───────────────────────────────────────── */
	.das-expand-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg3);
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
		flex-shrink: 0;
	}
	.das-expand-btn:hover {
		background: var(--dbd);
		color: var(--dt);
	}

	.das-expand-icon {
		transition: transform 0.2s ease;
		display: block;
	}
	.das-expand-icon--open   { transform: rotate(180deg); }
	.das-expand-icon--closed { transform: rotate(0deg); }

	/* ─────────────────────────────────────────
	   Expanded Detail Panel
	───────────────────────────────────────── */
	.das-task-detail {
		border-top: 1px solid var(--dbd2);
		background: var(--dbg2);
		padding: 16px 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	/* ─────────────────────────────────────────
	   Config Grid
	───────────────────────────────────────── */
	.das-detail-config {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.das-config-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
		gap: 12px;
	}

	.das-config-field {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.das-config-field--full {
		width: 100%;
	}

	.das-config-label {
		font-size: 10.5px;
		font-weight: 700;
		color: var(--dt3);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	/* ─────────────────────────────────────────
	   Select
	───────────────────────────────────────── */
	.das-select-wrap {
		position: relative;
	}
	.das-select {
		width: 100%;
		appearance: none;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 7px 28px 7px 10px;
		font-size: 12.5px;
		color: var(--dt);
		cursor: pointer;
		outline: none;
		transition: border-color 0.15s;
	}
	.das-select:focus {
		border-color: var(--dt3);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--dt3) 15%, transparent);
	}
	.das-select-caret {
		position: absolute;
		right: 9px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 10px;
		color: var(--dt3);
		pointer-events: none;
	}

	/* ─────────────────────────────────────────
	   Input
	───────────────────────────────────────── */
	.das-input {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 7px 10px;
		font-size: 12.5px;
		color: var(--dt);
		outline: none;
		width: 100%;
		box-sizing: border-box;
		transition: border-color 0.15s;
	}
	.das-input:focus {
		border-color: var(--dt3);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--dt3) 15%, transparent);
	}
	.das-input--mono {
		font-family: ui-monospace, 'Cascadia Code', 'Fira Mono', monospace;
		font-size: 12px;
	}

	/* ─────────────────────────────────────────
	   Textarea
	───────────────────────────────────────── */
	.das-textarea {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 9px 11px;
		font-size: 12.5px;
		color: var(--dt);
		line-height: 1.56;
		resize: vertical;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		font-family: inherit;
		transition: border-color 0.15s;
	}
	.das-textarea:focus {
		border-color: var(--dt3);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--dt3) 15%, transparent);
	}
	.das-textarea--tall {
		min-height: 140px;
	}

	/* ─────────────────────────────────────────
	   Config Actions Row
	───────────────────────────────────────── */
	.das-config-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	/* ─────────────────────────────────────────
	   Execution History
	───────────────────────────────────────── */
	.das-history {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.das-history-title {
		font-size: 10.5px;
		font-weight: 700;
		color: var(--dt3);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin: 0;
	}

	.das-history-table-wrap {
		overflow-x: auto;
		border-radius: 8px;
		border: 1px solid var(--dbd);
	}

	.das-history-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 12px;
		min-width: 540px;
	}

	.das-th {
		text-align: left;
		font-size: 10px;
		font-weight: 700;
		color: var(--dt4);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 7px 12px;
		border-bottom: 1px solid var(--dbd);
		white-space: nowrap;
		background: var(--dbg3);
	}
	.das-th--wide { width: 48%; }

	.das-history-row {
		border-bottom: 1px solid var(--dbd2);
	}
	.das-history-row:last-child {
		border-bottom: none;
	}
	.das-history-row:hover {
		background: var(--dbg3);
	}

	.das-td {
		padding: 8px 12px;
		color: var(--dt2);
		vertical-align: top;
	}
	.das-td--mono {
		font-family: ui-monospace, 'Cascadia Code', 'Fira Mono', monospace;
		font-size: 11.5px;
		white-space: nowrap;
		color: var(--dt3);
	}
	.das-td--summary {
		color: var(--dt2);
		line-height: 1.5;
		font-size: 12px;
	}

	.das-run-status {
		display: inline-block;
		font-size: 11px;
		font-weight: 600;
		white-space: nowrap;
	}
	.das-run-status--success { color: #22c55e; }
	.das-run-status--failed  { color: #ef4444; }
	.das-run-status--skipped { color: var(--dt4); }

	/* ─────────────────────────────────────────
	   Task List Footer
	───────────────────────────────────────── */
	.das-list-footer {
		display: flex;
		justify-content: flex-start;
		padding-top: 14px;
	}

	/* ─────────────────────────────────────────
	   New Task Form
	───────────────────────────────────────── */
	.das-new-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.das-form-grid {
		display: grid;
		gap: 12px;
	}
	.das-form-grid--3 {
		grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
	}

	.das-field-hint {
		font-size: 11px;
		color: var(--dt4);
		margin-top: 1px;
	}

	/* ─────────────────────────────────────────
	   Form Preview Strip
	───────────────────────────────────────── */
	.das-form-preview {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		flex-wrap: wrap;
	}

	.das-preview-label {
		font-size: 10.5px;
		font-weight: 700;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-right: 2px;
	}

	.das-preview-model {
		font-size: 11.5px;
		color: var(--dt3);
		font-family: ui-monospace, 'Cascadia Code', 'Fira Mono', monospace;
	}

	.das-preview-scope {
		font-size: 11px;
		color: var(--dt4);
		font-family: ui-monospace, 'Cascadia Code', 'Fira Mono', monospace;
		padding: 2px 7px;
		background: var(--dbg3);
		border-radius: 5px;
		border: 1px solid var(--dbd2);
	}

	/* ─────────────────────────────────────────
	   Form Actions
	───────────────────────────────────────── */
	.das-form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		padding-top: 2px;
	}

	/* ─────────────────────────────────────────
	   Buttons
	───────────────────────────────────────── */
	.das-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 18px;
		border-radius: 9999px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		border: none;
		transition: background 0.15s, color 0.15s, opacity 0.15s;
		white-space: nowrap;
	}
	.das-btn:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.das-btn--primary {
		background: var(--dt);
		color: var(--dbg);
	}
	.das-btn--primary:hover:not(:disabled) {
		opacity: 0.82;
	}

	.das-btn--ghost {
		background: transparent;
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}
	.das-btn--ghost:hover {
		background: var(--dbg2);
		color: var(--dt);
	}

	.das-btn--sm {
		padding: 4px 13px;
		font-size: 11.5px;
	}

	/* ─────────────────────────────────────────
	   Spinner (submit loading state)
	───────────────────────────────────────── */
	.das-btn-spinner {
		display: inline-block;
		width: 12px;
		height: 12px;
		border: 2px solid color-mix(in srgb, currentColor 30%, transparent);
		border-top-color: currentColor;
		border-radius: 50%;
		animation: das-spin 0.7s linear infinite;
	}

	@keyframes das-spin {
		to { transform: rotate(360deg); }
	}
</style>
