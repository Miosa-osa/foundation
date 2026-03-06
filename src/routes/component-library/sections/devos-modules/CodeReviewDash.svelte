<script lang="ts">
	// ── Types ─────────────────────────────────────────────────────
	type Severity = 'critical' | 'major' | 'minor' | 'auto-fixed';
	type FilterOption = 'all' | Severity;

	interface DiffLine {
		type: 'removed' | 'added' | 'context';
		content: string;
	}

	interface Issue {
		id: number;
		severity: Severity;
		file: string;
		line: number;
		description: string;
		suggestion: string;
		diff: DiffLine[];
		resolved: boolean;
	}

	// ── 1. Top Bar State ──────────────────────────────────────────
	let selectedRepo = $state('miosa-foundation/api-core');

	const repos = [
		'miosa-foundation/api-core',
		'miosa-foundation/web-app',
		'miosa-foundation/auth-service',
		'miosa-foundation/data-pipeline',
	];

	// ── 2. Filter State ──────────────────────────────────────────
	let activeFilter = $state<FilterOption>('all');

	// ── 3. Issues Data ───────────────────────────────────────────
	let issues = $state<Issue[]>([
		{
			id: 1,
			severity: 'critical',
			file: 'src/api/auth.ts',
			line: 142,
			description: 'SQL query built via string concatenation — vulnerable to injection attack.',
			suggestion: 'Use parameterized queries or an ORM to safely pass user input.',
			diff: [
				{ type: 'context',  content: '  const userId = req.params.id;' },
				{ type: 'removed',  content: '  const user = db.query(`SELECT * FROM users WHERE id = ${userId}`);' },
				{ type: 'added',    content: '  const user = db.query("SELECT * FROM users WHERE id = $1", [userId]);' },
			],
			resolved: false,
		},
		{
			id: 2,
			severity: 'critical',
			file: 'src/middleware/session.ts',
			line: 38,
			description: 'JWT secret falls back to the string "secret" when the environment variable is unset.',
			suggestion: 'Throw an error on startup if JWT_SECRET is not defined. Never use a hardcoded fallback.',
			diff: [
				{ type: 'context',  content: '  const payload = req.body;' },
				{ type: 'removed',  content: '  const secret = process.env.JWT_SECRET || "secret";' },
				{ type: 'added',    content: '  const secret = process.env.JWT_SECRET;' },
				{ type: 'added',    content: '  if (!secret) throw new Error("JWT_SECRET env var is required");' },
			],
			resolved: false,
		},
		{
			id: 3,
			severity: 'critical',
			file: 'src/routes/upload.ts',
			line: 89,
			description: 'File upload accepts any MIME type without validation, enabling arbitrary file execution.',
			suggestion: 'Validate MIME type and file extension against an allowlist before saving to disk.',
			diff: [
				{ type: 'removed',  content: '  await fs.writeFile(dest, file.buffer);' },
				{ type: 'added',    content: '  const ALLOWED = ["image/png", "image/jpeg", "application/pdf"];' },
				{ type: 'added',    content: '  if (!ALLOWED.includes(file.mimetype)) throw new Error("Unsupported file type");' },
				{ type: 'added',    content: '  await fs.writeFile(dest, file.buffer);' },
			],
			resolved: false,
		},
		{
			id: 4,
			severity: 'major',
			file: 'src/services/userService.ts',
			line: 204,
			description: 'N+1 query pattern — a separate DB call is made for each user in the list.',
			suggestion: 'Batch the lookup with a single WHERE id = ANY($1) query and merge results in memory.',
			diff: [
				{ type: 'removed',  content: '  const enriched = await Promise.all(users.map(u => db.getRoles(u.id)));' },
				{ type: 'added',    content: '  const ids = users.map(u => u.id);' },
				{ type: 'added',    content: '  const roles = await db.getRolesByUserIds(ids);' },
				{ type: 'added',    content: '  const roleMap = Object.fromEntries(roles.map(r => [r.userId, r]));' },
			],
			resolved: false,
		},
		{
			id: 5,
			severity: 'major',
			file: 'src/api/payments.ts',
			line: 67,
			description: 'Missing error boundary — a payment gateway timeout crashes the entire request handler.',
			suggestion: 'Wrap gateway calls in try/catch and return a structured error response to the client.',
			diff: [
				{ type: 'context',  content: '  const charge = await gateway.charge(amount, token);' },
				{ type: 'removed',  content: '  return res.json({ success: true, chargeId: charge.id });' },
				{ type: 'added',    content: '  if (!charge.ok) return res.status(402).json({ error: charge.message });' },
				{ type: 'added',    content: '  return res.json({ success: true, chargeId: charge.id });' },
			],
			resolved: false,
		},
		{
			id: 6,
			severity: 'minor',
			file: 'src/utils/format.ts',
			line: 12,
			description: 'formatDate uses deprecated Date constructor pattern that silently returns Invalid Date in Safari.',
			suggestion: 'Replace with a library like date-fns or parse the ISO string explicitly.',
			diff: [
				{ type: 'removed',  content: '  return new Date(dateStr).toLocaleDateString();' },
				{ type: 'added',    content: '  return parseISO(dateStr).toLocaleDateString("en-US", { dateStyle: "medium" });' },
			],
			resolved: false,
		},
		{
			id: 7,
			severity: 'minor',
			file: 'src/lib/logger.ts',
			line: 55,
			description: 'Console.log left in production path — leaks internal stack traces to stdout.',
			suggestion: 'Replace with the structured logger. Pass the error object as a second argument.',
			diff: [
				{ type: 'removed',  content: '  console.log("Unhandled error:", err.stack);' },
				{ type: 'added',    content: '  logger.error("Unhandled error", { err });' },
			],
			resolved: false,
		},
		{
			id: 8,
			severity: 'auto-fixed',
			file: 'src/api/health.ts',
			line: 3,
			description: 'Unused import "express" removed automatically.',
			suggestion: 'No action needed — the import was a leftover from a prior refactor.',
			diff: [
				{ type: 'removed',  content: '  import express from "express";' },
				{ type: 'context',  content: '  import { Router } from "express";' },
			],
			resolved: false,
		},
		{
			id: 9,
			severity: 'auto-fixed',
			file: 'src/types/index.ts',
			line: 77,
			description: 'Trailing whitespace and missing semicolon corrected automatically by the formatter.',
			suggestion: 'Run the formatter as a pre-commit hook to catch these automatically.',
			diff: [
				{ type: 'removed',  content: '  export type UserId = string  ' },
				{ type: 'added',    content: '  export type UserId = string;' },
			],
			resolved: false,
		},
	]);

	// ── Derived: filtered visible issues ─────────────────────────
	let visibleIssues = $derived(
		issues.filter(i => !i.resolved && (activeFilter === 'all' || i.severity === activeFilter))
	);

	// ── Derived: summary counts ───────────────────────────────────
	let counts = $derived({
		critical:   issues.filter(i => !i.resolved && i.severity === 'critical').length,
		major:      issues.filter(i => !i.resolved && i.severity === 'major').length,
		minor:      issues.filter(i => !i.resolved && i.severity === 'minor').length,
		'auto-fixed': issues.filter(i => !i.resolved && i.severity === 'auto-fixed').length,
		total:      issues.filter(i => !i.resolved).length,
	});

	// ── Actions ──────────────────────────────────────────────────
	function acceptIssue(id: number) {
		issues = issues.map(i => i.id === id ? { ...i, resolved: true } : i);
	}

	function dismissIssue(id: number) {
		issues = issues.map(i => i.id === id ? { ...i, resolved: true } : i);
	}

	// ── Helpers ──────────────────────────────────────────────────
	const severityLabel: Record<Severity, string> = {
		critical:     'Critical',
		major:        'Major',
		minor:        'Minor',
		'auto-fixed': 'Auto-fixed',
	};

	const filterOptions: { value: FilterOption; label: string }[] = [
		{ value: 'all',        label: 'All' },
		{ value: 'critical',   label: 'Critical' },
		{ value: 'major',      label: 'Major' },
		{ value: 'minor',      label: 'Minor' },
		{ value: 'auto-fixed', label: 'Auto-fixed' },
	];
</script>

<section class="ds-section">

	<!-- ═══ 1. TOP BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Top Bar — Repo Selector &amp; Actions</h3>
		<p class="ds-card__sub">Repository context switcher and the primary action to trigger a full review run.</p>

		<div class="crd-topbar">
			<div class="crd-topbar__left">
				<div class="crd-topbar__brand">
					<svg class="crd-topbar__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 4h8M6 8h8M6 12h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						<circle cx="15" cy="13" r="3.5" stroke="currentColor" stroke-width="1.5"/>
						<path d="M17.5 15.5l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
					<span class="crd-topbar__product">Code Review</span>
				</div>

				<div class="crd-topbar__sep"></div>

				<div class="crd-repo-select">
					<svg class="crd-repo-select__icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5 2.5 0 0114 2.5v11a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 012 13.5v-11zm2.5-1a1 1 0 00-1 1v11a1 1 0 001 1h7a1 1 0 001-1v-11a1 1 0 00-1-1h-7z" clip-rule="evenodd"/>
					</svg>
					<select class="crd-repo-select__select" bind:value={selectedRepo}>
						{#each repos as repo}
							<option value={repo}>{repo}</option>
						{/each}
					</select>
					<svg class="crd-repo-select__chevron" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</div>

			<div class="crd-topbar__right">
				<div class="crd-topbar__meta">
					<span class="crd-topbar__branch">
						<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 019 8.5H7A1 1 0 006 9.5v1.378a2.251 2.251 0 11-1.5 0V9.5A2.5 2.5 0 017 7h2A1 1 0 0010 6V5.372A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5z" clip-rule="evenodd"/>
						</svg>
						main
					</span>
					<span class="crd-topbar__commit">a3f9d12</span>
				</div>
				<button class="crd-topbar__btn">
					<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM2.5 8a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z" clip-rule="evenodd"/>
						<path d="M8 4.5a.75.75 0 01.75.75v2.69l1.28 1.28a.75.75 0 01-1.06 1.06l-1.5-1.5A.75.75 0 017.5 8.25v-3A.75.75 0 018 4.5z"/>
					</svg>
					Review Codebase
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ 2. SUMMARY BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Summary Bar — Issue Counts by Severity</h3>
		<p class="ds-card__sub">Four stat boxes summarising the current review pass at a glance. Counts update as issues are accepted or dismissed.</p>

		<div class="crd-summary">
			<div class="crd-summary__stat crd-summary__stat--critical">
				<span class="crd-summary__count">{counts.critical}</span>
				<span class="crd-summary__label">Critical</span>
				<div class="crd-summary__bar">
					<div class="crd-summary__bar-fill" style="width: {Math.min(counts.critical / 5 * 100, 100)}%"></div>
				</div>
			</div>
			<div class="crd-summary__stat crd-summary__stat--major">
				<span class="crd-summary__count">{counts.major}</span>
				<span class="crd-summary__label">Major</span>
				<div class="crd-summary__bar">
					<div class="crd-summary__bar-fill" style="width: {Math.min(counts.major / 10 * 100, 100)}%"></div>
				</div>
			</div>
			<div class="crd-summary__stat crd-summary__stat--minor">
				<span class="crd-summary__count">{counts.minor}</span>
				<span class="crd-summary__label">Minor</span>
				<div class="crd-summary__bar">
					<div class="crd-summary__bar-fill" style="width: {Math.min(counts.minor / 20 * 100, 100)}%"></div>
				</div>
			</div>
			<div class="crd-summary__stat crd-summary__stat--auto">
				<span class="crd-summary__count">{counts['auto-fixed']}</span>
				<span class="crd-summary__label">Auto-fixed</span>
				<div class="crd-summary__bar">
					<div class="crd-summary__bar-fill" style="width: {Math.min(counts['auto-fixed'] / 10 * 100, 100)}%"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. FILTER PILLS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Filter Pills — Severity Filter</h3>
		<p class="ds-card__sub">Clicking a pill filters the issue list below using <code>$derived</code>. The active pill is highlighted.</p>

		<div class="crd-filters">
			{#each filterOptions as opt}
				<button
					class="crd-filters__pill {activeFilter === opt.value ? 'crd-filters__pill--active' : ''} {opt.value !== 'all' ? 'crd-filters__pill--' + opt.value : ''}"
					onclick={() => activeFilter = opt.value}
				>
					{opt.label}
					{#if opt.value !== 'all'}
						<span class="crd-filters__badge">
							{opt.value === 'critical' ? counts.critical : opt.value === 'major' ? counts.major : opt.value === 'minor' ? counts.minor : counts['auto-fixed']}
						</span>
					{:else}
						<span class="crd-filters__badge">{counts.total}</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. ISSUE CARDS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Issue Cards — Filterable &amp; Actionable</h3>
		<p class="ds-card__sub">Each card shows file path, severity, description, suggested fix, a two-tone diff block, and Accept / Dismiss actions. Resolved issues disappear from the list.</p>

		{#if visibleIssues.length === 0}
			<div class="crd-empty">
				<svg class="crd-empty__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<p class="crd-empty__title">All clear</p>
				<p class="crd-empty__sub">No issues match the current filter.</p>
			</div>
		{:else}
			<div class="crd-issue-list">
				{#each visibleIssues as issue (issue.id)}
					<div class="crd-issue crd-issue--{issue.severity}">
						<!-- Issue header -->
						<div class="crd-issue__header">
							<div class="crd-issue__meta">
								<code class="crd-issue__path">{issue.file}<span class="crd-issue__line">:{issue.line}</span></code>
								<span class="crd-issue__badge crd-issue__badge--{issue.severity}">
									{severityLabel[issue.severity]}
								</span>
							</div>
							<div class="crd-issue__actions">
								<button
									class="crd-issue__btn crd-issue__btn--accept"
									onclick={() => acceptIssue(issue.id)}
									aria-label="Accept fix for issue in {issue.file}"
								>
									<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									Accept
								</button>
								<button
									class="crd-issue__btn crd-issue__btn--dismiss"
									onclick={() => dismissIssue(issue.id)}
									aria-label="Dismiss issue in {issue.file}"
								>
									<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									</svg>
									Dismiss
								</button>
							</div>
						</div>

						<!-- Description -->
						<p class="crd-issue__desc">{issue.description}</p>

						<!-- Suggested fix -->
						<div class="crd-issue__suggestion">
							<span class="crd-issue__suggestion-label">Suggested fix</span>
							<p class="crd-issue__suggestion-text">{issue.suggestion}</p>
						</div>

						<!-- Diff block -->
						<div class="crd-diff">
							<div class="crd-diff__header">
								<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M2.75 3.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H2.75zm0 4a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 4a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clip-rule="evenodd"/>
								</svg>
								<span>{issue.file}:{issue.line}</span>
							</div>
							<div class="crd-diff__body">
								{#each issue.diff as diffLine}
									<div class="crd-diff__line crd-diff__line--{diffLine.type}">
										<span class="crd-diff__gutter">
											{#if diffLine.type === 'removed'}−{:else if diffLine.type === 'added'}+{:else}&nbsp;{/if}
										</span>
										<code class="crd-diff__code">{diffLine.content}</code>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

</section>

<style>
	/* ── Top Bar ──────────────────────────────────────────────── */
	.crd-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 10px 16px;
	}

	.crd-topbar__left {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.crd-topbar__right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.crd-topbar__brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.crd-topbar__icon {
		width: 20px;
		height: 20px;
		color: var(--dt2);
		flex-shrink: 0;
	}

	.crd-topbar__product {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
	}

	.crd-topbar__sep {
		width: 1px;
		height: 20px;
		background: var(--dbd);
	}

	.crd-topbar__meta {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.crd-topbar__branch {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: var(--dt3);
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 3px 8px;
	}

	.crd-topbar__branch svg {
		width: 12px;
		height: 12px;
	}

	.crd-topbar__commit {
		font-size: 11px;
		font-family: 'Courier New', Courier, monospace;
		color: var(--dt4);
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 4px;
		padding: 2px 6px;
	}

	.crd-topbar__btn {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--dt);
		color: var(--dbg);
		border: none;
		border-radius: 8px;
		padding: 7px 14px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		transition: opacity 0.15s;
	}

	.crd-topbar__btn:hover {
		opacity: 0.85;
	}

	.crd-topbar__btn svg {
		width: 14px;
		height: 14px;
	}

	/* ── Repo Select ──────────────────────────────────────────── */
	.crd-repo-select {
		position: relative;
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 5px 10px;
	}

	.crd-repo-select__icon {
		width: 13px;
		height: 13px;
		color: var(--dt3);
		flex-shrink: 0;
	}

	.crd-repo-select__select {
		background: transparent;
		border: none;
		outline: none;
		font-size: 13px;
		color: var(--dt);
		cursor: pointer;
		padding-right: 18px;
		appearance: none;
		-webkit-appearance: none;
	}

	.crd-repo-select__chevron {
		position: absolute;
		right: 10px;
		width: 10px;
		height: 6px;
		color: var(--dt3);
		pointer-events: none;
	}

	/* ── Summary Bar ──────────────────────────────────────────── */
	.crd-summary {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
	}

	.crd-summary__stat {
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		border-left: 3px solid transparent;
	}

	.crd-summary__stat--critical { border-left-color: #ef4444; }
	.crd-summary__stat--major    { border-left-color: #f97316; }
	.crd-summary__stat--minor    { border-left-color: #eab308; }
	.crd-summary__stat--auto     { border-left-color: #22c55e; }

	.crd-summary__count {
		font-size: 28px;
		font-weight: 700;
		line-height: 1;
		color: var(--dt);
	}

	.crd-summary__stat--critical .crd-summary__count { color: #ef4444; }
	.crd-summary__stat--major    .crd-summary__count { color: #f97316; }
	.crd-summary__stat--minor    .crd-summary__count { color: #eab308; }
	.crd-summary__stat--auto     .crd-summary__count { color: #22c55e; }

	.crd-summary__label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.crd-summary__bar {
		height: 3px;
		background: var(--dbg3);
		border-radius: 9999px;
		overflow: hidden;
		margin-top: 4px;
	}

	.crd-summary__bar-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	.crd-summary__stat--critical .crd-summary__bar-fill { background: #ef4444; }
	.crd-summary__stat--major    .crd-summary__bar-fill { background: #f97316; }
	.crd-summary__stat--minor    .crd-summary__bar-fill { background: #eab308; }
	.crd-summary__stat--auto     .crd-summary__bar-fill { background: #22c55e; }

	/* ── Filters ──────────────────────────────────────────────── */
	.crd-filters {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.crd-filters__pill {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		padding: 6px 14px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
	}

	.crd-filters__pill:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.crd-filters__pill--active {
		background: var(--dt);
		border-color: var(--dt);
		color: var(--dbg);
	}

	.crd-filters__pill--active .crd-filters__badge {
		background: rgba(255, 255, 255, 0.2);
		color: var(--dbg);
	}

	.crd-filters__badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		background: var(--dbg3);
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		line-height: 1;
	}

	/* ── Issue List ───────────────────────────────────────────── */
	.crd-issue-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.crd-issue {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		border-left: 4px solid transparent;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.crd-issue--critical  { border-left-color: #ef4444; }
	.crd-issue--major     { border-left-color: #f97316; }
	.crd-issue--minor     { border-left-color: #eab308; }
	.crd-issue--auto-fixed { border-left-color: #22c55e; }

	/* Issue header */
	.crd-issue__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	.crd-issue__meta {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.crd-issue__path {
		font-family: 'Courier New', Courier, monospace;
		font-size: 13px;
		color: var(--dt);
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 5px;
		padding: 2px 8px;
	}

	.crd-issue__line {
		color: var(--dt3);
	}

	.crd-issue__badge {
		display: inline-flex;
		align-items: center;
		padding: 2px 8px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.crd-issue__badge--critical  { background: rgba(239,68,68,0.12);  color: #ef4444; }
	.crd-issue__badge--major     { background: rgba(249,115,22,0.12); color: #f97316; }
	.crd-issue__badge--minor     { background: rgba(234,179,8,0.12);  color: #ca8a04; }
	.crd-issue__badge--auto-fixed { background: rgba(34,197,94,0.12); color: #16a34a; }

	/* Actions */
	.crd-issue__actions {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.crd-issue__btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 12px;
		border-radius: 7px;
		font-size: 12px;
		font-weight: 600;
		border: 1px solid transparent;
		cursor: pointer;
		transition: opacity 0.15s, background 0.15s;
	}

	.crd-issue__btn svg {
		width: 13px;
		height: 13px;
	}

	.crd-issue__btn--accept {
		background: rgba(34,197,94,0.12);
		color: #16a34a;
		border-color: rgba(34,197,94,0.25);
	}

	.crd-issue__btn--accept:hover {
		background: rgba(34,197,94,0.2);
	}

	.crd-issue__btn--dismiss {
		background: var(--dbg3);
		color: var(--dt3);
		border-color: var(--dbd);
	}

	.crd-issue__btn--dismiss:hover {
		background: var(--dbd);
		color: var(--dt2);
	}

	/* Description */
	.crd-issue__desc {
		font-size: 14px;
		color: var(--dt);
		line-height: 1.55;
		margin: 0;
	}

	/* Suggestion */
	.crd-issue__suggestion {
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 8px;
		padding: 10px 14px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.crd-issue__suggestion-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt4);
	}

	.crd-issue__suggestion-text {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.5;
		margin: 0;
	}

	/* Diff block */
	.crd-diff {
		border: 1px solid var(--dbd);
		border-radius: 8px;
		overflow: hidden;
	}

	.crd-diff__header {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
		font-size: 11px;
		color: var(--dt3);
		font-family: 'Courier New', Courier, monospace;
	}

	.crd-diff__header svg {
		width: 12px;
		height: 12px;
		color: var(--dt4);
		flex-shrink: 0;
	}

	.crd-diff__body {
		background: var(--dbg);
	}

	.crd-diff__line {
		display: flex;
		align-items: stretch;
		font-family: 'Courier New', Courier, monospace;
		font-size: 12px;
		line-height: 1.6;
	}

	.crd-diff__line--removed { background: rgba(239,68,68,0.08); }
	.crd-diff__line--added   { background: rgba(34,197,94,0.08); }
	.crd-diff__line--context { background: transparent; }

	.crd-diff__gutter {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		flex-shrink: 0;
		font-weight: 700;
		font-size: 13px;
		user-select: none;
	}

	.crd-diff__line--removed .crd-diff__gutter { color: #ef4444; }
	.crd-diff__line--added   .crd-diff__gutter { color: #22c55e; }
	.crd-diff__line--context .crd-diff__gutter { color: var(--dt4); }

	.crd-diff__code {
		flex: 1;
		padding: 2px 12px 2px 4px;
		white-space: pre;
		overflow-x: auto;
		color: var(--dt);
		font-family: inherit;
	}

	.crd-diff__line--removed .crd-diff__code { color: #ef4444; }
	.crd-diff__line--added   .crd-diff__code { color: #22c55e; }
	.crd-diff__line--context .crd-diff__code { color: var(--dt3); }

	/* ── Empty State ──────────────────────────────────────────── */
	.crd-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 48px 24px;
		text-align: center;
	}

	.crd-empty__icon {
		width: 40px;
		height: 40px;
		color: #22c55e;
		opacity: 0.7;
	}

	.crd-empty__title {
		font-size: 15px;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
	}

	.crd-empty__sub {
		font-size: 13px;
		color: var(--dt3);
		margin: 0;
	}

	/* ── Responsive ───────────────────────────────────────────── */
	@media (max-width: 640px) {
		.crd-summary {
			grid-template-columns: repeat(2, 1fr);
		}

		.crd-topbar {
			flex-direction: column;
			align-items: flex-start;
		}

		.crd-topbar__right {
			width: 100%;
			justify-content: space-between;
		}

		.crd-issue__header {
			flex-direction: column;
		}

		.crd-issue__actions {
			width: 100%;
		}

		.crd-issue__btn {
			flex: 1;
			justify-content: center;
		}
	}
</style>
