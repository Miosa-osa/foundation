<script lang="ts">
	// ── Overall Score Ring ─────────────────────────────────────────
	const score = $state(78);
	const grade = $derived(score >= 90 ? 'A' : score >= 80 ? 'B+' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D');
	const ringColor = $derived(score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444');

	// SVG ring: circumference of circle r=54 → 2πr ≈ 339.3
	const CIRC = 339.3;
	const ringDash = $derived(`${(score / 100) * CIRC} ${CIRC}`);

	// ── Metric Cards ──────────────────────────────────────────────
	type Trend = 'up' | 'down';
	type MetricCard = {
		label: string;
		value: string;
		unit: string;
		trend: Trend;
		trendGood: boolean;
		trendVal: string;
		sparkPoints: string;
	};

	const metrics: MetricCard[] = [
		{
			label: 'Test Coverage',
			value: '84',
			unit: '%',
			trend: 'up',
			trendGood: true,
			trendVal: '+2.3%',
			// x: 0–60, y: 0–30 (lower y = higher value in SVG coords)
			sparkPoints: '0,22 10,18 20,20 30,14 40,16 50,10 60,8',
		},
		{
			label: 'Code Complexity',
			value: '12.4',
			unit: '',
			trend: 'up',
			trendGood: false,
			trendVal: '+1.8',
			sparkPoints: '0,24 10,22 20,20 30,18 40,16 50,14 60,10',
		},
		{
			label: 'Duplication',
			value: '3.2',
			unit: '%',
			trend: 'down',
			trendGood: true,
			trendVal: '−0.8%',
			sparkPoints: '0,8 10,10 20,12 30,16 40,18 50,22 60,24',
		},
		{
			label: 'Security Score',
			value: '92',
			unit: '/100',
			trend: 'up',
			trendGood: true,
			trendVal: '+4',
			sparkPoints: '0,20 10,18 20,22 30,16 40,14 50,10 60,8',
		},
	];

	// ── Top Issues ────────────────────────────────────────────────
	type IssueType = 'complexity' | 'duplication' | 'coverage' | 'security';
	type Issue = {
		file: string;
		type: IssueType;
		description: string;
	};

	const issues: Issue[] = [
		{
			file: 'src/services/auth/tokenManager.ts',
			type: 'complexity',
			description: 'Function refreshTokenChain has cyclomatic complexity of 24 (threshold: 10)',
		},
		{
			file: 'src/components/DataGrid/DataGrid.tsx',
			type: 'duplication',
			description: '47-line block duplicated in 3 files — extract to shared utility',
		},
		{
			file: 'src/api/billing/invoiceService.ts',
			type: 'coverage',
			description: 'Only 31% branch coverage — critical payment path lacks test assertions',
		},
		{
			file: 'src/utils/crypto/hashHelper.ts',
			type: 'security',
			description: 'MD5 used for data integrity check — replace with SHA-256 or stronger',
		},
		{
			file: 'src/hooks/useWebSocket.ts',
			type: 'complexity',
			description: 'Nested callbacks exceed depth 5 — refactor with async/await or state machine',
		},
		{
			file: 'src/pages/reports/ReportBuilder.tsx',
			type: 'coverage',
			description: 'Edge-case rendering paths untested — 12 uncovered branches detected',
		},
	];

	let fixedIssues = $state<Set<number>>(new Set());

	function toggleFix(index: number) {
		const next = new Set(fixedIssues);
		if (next.has(index)) {
			next.delete(index);
		} else {
			next.add(index);
		}
		fixedIssues = next;
	}

	// ── Quality Trend Chart ───────────────────────────────────────
	// 7-day scores: chart SVG 280×68, x: 10–270, y: 4–60
	const trendDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const trendScores = [71, 73, 72, 75, 74, 77, 78];
	const TREND_MIN = 65;
	const TREND_MAX = 85;
	const CHART_TOP = 4;
	const CHART_BOTTOM = 60;

	function scoreToY(s: number): number {
		return CHART_BOTTOM - ((s - TREND_MIN) / (TREND_MAX - TREND_MIN)) * (CHART_BOTTOM - CHART_TOP);
	}

	const trendPoints = $derived(
		trendScores
			.map((s, i) => `${(i / 6) * 260 + 10},${scoreToY(s)}`)
			.join(' ')
	);

	const trendArea = $derived(
		`M ${trendScores
			.map((s, i) => `${(i / 6) * 260 + 10},${scoreToY(s)}`)
			.join(' L ')} L ${(6 / 6) * 260 + 10},68 L 10,68 Z`
	);

	let hoveredDay = $state<number | null>(null);
</script>

<section class="ds-section">
	<h2 class="ds-title">Code Quality Metrics</h2>
	<p class="ds-desc">
		Visualisations for code health: composite quality gauge, per-metric sparklines, issue triage
		list, and a 7-day trend chart.
	</p>

	<!-- ═══ 1. OVERALL SCORE GAUGE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Overall Quality Score</h3>
		<p class="ds-card__sub">
			Composite score derived from coverage, complexity, duplication, and security sub-metrics.
		</p>

		<div class="cq-gauge-panel">
			<!-- Large SVG ring gauge -->
			<div class="cq-gauge-wrap">
				<svg
					class="cq-gauge-svg"
					viewBox="0 0 140 140"
					aria-label="Quality score {score} out of 100"
				>
					<!-- Background track -->
					<circle
						class="cq-gauge-track"
						cx="70"
						cy="70"
						r="54"
						fill="none"
						stroke-width="10"
						stroke-linecap="round"
					/>
					<!-- Progress arc — rotated so it starts at top -->
					<circle
						class="cq-gauge-arc"
						cx="70"
						cy="70"
						r="54"
						fill="none"
						stroke-width="10"
						stroke-linecap="round"
						stroke-dasharray={ringDash}
						style="stroke: {ringColor};"
					/>
					<!-- Score numeral (counter-rotated from svg transform) -->
					<text
						class="cq-gauge-score"
						x="70"
						y="63"
						text-anchor="middle"
						dominant-baseline="middle"
					>{score}</text>
					<text
						class="cq-gauge-sublabel"
						x="70"
						y="81"
						text-anchor="middle"
						dominant-baseline="middle"
					>out of 100</text>
				</svg>
				<div class="cq-gauge-grade" style="color: {ringColor};">{grade}</div>
			</div>

			<!-- Sub-metric summary bars -->
			<div class="cq-gauge-summary">
				<div class="cq-summary-row">
					<span class="cq-summary-name">Test Coverage</span>
					<div class="cq-summary-bar-wrap">
						<div class="cq-summary-bar cq-summary-bar--green" style="width: 84%;"></div>
					</div>
					<span class="cq-summary-val">84%</span>
				</div>
				<div class="cq-summary-row">
					<span class="cq-summary-name">Complexity</span>
					<div class="cq-summary-bar-wrap">
						<div class="cq-summary-bar cq-summary-bar--amber" style="width: 56%;"></div>
					</div>
					<span class="cq-summary-val">56%</span>
				</div>
				<div class="cq-summary-row">
					<span class="cq-summary-name">Duplication</span>
					<div class="cq-summary-bar-wrap">
						<div class="cq-summary-bar cq-summary-bar--green" style="width: 72%;"></div>
					</div>
					<span class="cq-summary-val">72%</span>
				</div>
				<div class="cq-summary-row">
					<span class="cq-summary-name">Security</span>
					<div class="cq-summary-bar-wrap">
						<div class="cq-summary-bar cq-summary-bar--green" style="width: 92%;"></div>
					</div>
					<span class="cq-summary-val">92%</span>
				</div>

				<div class="cq-gauge-badges">
					<span class="cq-badge cq-badge--green">Passing</span>
					<span class="cq-badge cq-badge--amber">6 Issues</span>
					<span class="cq-badge cq-badge--neutral">Last scan: 4m ago</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 2. METRIC CARDS WITH SPARKLINES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Key Metrics</h3>
		<p class="ds-card__sub">Per-category breakdowns with 7-day sparkline trends.</p>

		<div class="cq-metrics-grid">
			{#each metrics as m}
				<div class="cq-metric-card">
					<div class="cq-metric-header">
						<span class="cq-metric-label">{m.label}</span>
						<span
							class="cq-metric-trend"
							class:cq-metric-trend--good={m.trendGood}
							class:cq-metric-trend--bad={!m.trendGood}
						>
							{#if m.trend === 'up'}
								<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
									<polyline
										points="1,8 5,2 9,8"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linejoin="round"
										stroke-linecap="round"
									/>
								</svg>
							{:else}
								<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
									<polyline
										points="1,2 5,8 9,2"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linejoin="round"
										stroke-linecap="round"
									/>
								</svg>
							{/if}
							{m.trendVal}
						</span>
					</div>

					<div class="cq-metric-value">
						{m.value}<span class="cq-metric-unit">{m.unit}</span>
					</div>

					<!-- SVG sparkline polyline -->
					<svg
						class="cq-sparkline"
						viewBox="0 0 60 30"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<polyline
							class="cq-sparkline-line"
							class:cq-sparkline-line--good={m.trendGood}
							class:cq-sparkline-line--bad={!m.trendGood}
							points={m.sparkPoints}
							fill="none"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<!-- Terminal dot at last data point -->
						{#each m.sparkPoints.split(' ') as pt, pi}
							{#if pi === 6}
								{@const coords = pt.split(',').map(Number)}
								<circle
									cx={coords[0]}
									cy={coords[1]}
									r="2.5"
									class="cq-sparkline-dot"
									class:cq-sparkline-dot--good={m.trendGood}
									class:cq-sparkline-dot--bad={!m.trendGood}
								/>
							{/if}
						{/each}
					</svg>

					<div class="cq-metric-footer">
						<span class="cq-metric-period">7-day trend</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 3. TOP ISSUES LIST ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Top Issues</h3>
		<p class="ds-card__sub">
			Highest-priority findings from the latest analysis run. Click Fix to mark resolved.
		</p>

		<div class="cq-issues-list">
			{#each issues as issue, idx}
				<div class="cq-issue-row" class:cq-issue-row--fixed={fixedIssues.has(idx)}>
					<div class="cq-issue-main">
						<div class="cq-issue-top">
							<code class="cq-issue-file">{issue.file}</code>
							<span
								class="cq-issue-badge"
								class:cq-issue-badge--complexity={issue.type === 'complexity'}
								class:cq-issue-badge--duplication={issue.type === 'duplication'}
								class:cq-issue-badge--coverage={issue.type === 'coverage'}
								class:cq-issue-badge--security={issue.type === 'security'}
							>
								{issue.type}
							</span>
						</div>
						<p class="cq-issue-desc">{issue.description}</p>
					</div>
					<button
						class="cq-issue-fix"
						class:cq-issue-fix--done={fixedIssues.has(idx)}
						onclick={() => toggleFix(idx)}
						aria-label="{fixedIssues.has(idx) ? 'Unmark' : 'Mark as'} fixed: {issue.file}"
					>
						{#if fixedIssues.has(idx)}
							<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
								<polyline
									points="1,6 4,9 11,2"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							Fixed
						{:else}
							Fix
						{/if}
					</button>
				</div>
			{/each}
		</div>

		<div class="cq-issues-footer">
			<span class="cq-issues-count">
				{fixedIssues.size} of {issues.length} resolved
			</span>
			<button
				class="cq-issues-clear"
				onclick={() => { fixedIssues = new Set(); }}
				aria-label="Clear all fixed markers"
			>
				Clear all
			</button>
		</div>
	</div>

	<!-- ═══ 4. QUALITY TREND CHART ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Quality Trend — Last 7 Days</h3>
		<p class="ds-card__sub">
			Overall composite score over the past week. Hover data points for exact values.
		</p>

		<div class="cq-trend-wrap">
			<!-- Y-axis labels -->
			<div class="cq-trend-yaxis">
				<span>85</span>
				<span>80</span>
				<span>75</span>
				<span>70</span>
				<span>65</span>
			</div>

			<div class="cq-trend-chart-col">
				<svg
					class="cq-trend-svg"
					viewBox="0 0 280 68"
					preserveAspectRatio="none"
					aria-label="Quality score trend over 7 days"
					role="img"
				>
					<!-- Horizontal grid lines at each y-axis tick -->
					{#each [4, 17, 30, 43, 56] as gy}
						<line x1="10" y1={gy} x2="270" y2={gy} class="cq-trend-grid" />
					{/each}

					<!-- Gradient area fill -->
					<defs>
						<linearGradient id="cq-area-grad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="#22c55e" stop-opacity="0.18" />
							<stop offset="100%" stop-color="#22c55e" stop-opacity="0.02" />
						</linearGradient>
					</defs>
					<path class="cq-trend-area" d={trendArea} />

					<!-- Score line -->
					<polyline
						class="cq-trend-line"
						points={trendPoints}
						fill="none"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Interactive data point circles -->
					{#each trendScores as s, i}
						{@const cx = (i / 6) * 260 + 10}
						{@const cy = scoreToY(s)}
						<circle
							class="cq-trend-dot"
							class:cq-trend-dot--active={hoveredDay === i}
							cx={cx}
							cy={cy}
							r={hoveredDay === i ? 5 : 3.5}
							onmouseenter={() => { hoveredDay = i; }}
							onmouseleave={() => { hoveredDay = null; }}
							role="img"
							aria-label="{trendDays[i]}: score {s}"
						/>
						{#if hoveredDay === i}
							<!-- Tooltip bubble -->
							<rect
								x={cx - 22}
								y={cy - 28}
								width="44"
								height="20"
								rx="4"
								class="cq-trend-tip-bg"
							/>
							<text
								x={cx}
								y={cy - 14}
								text-anchor="middle"
								class="cq-trend-tip-text"
							>{s}</text>
						{/if}
					{/each}
				</svg>

				<!-- X-axis day labels -->
				<div class="cq-trend-xaxis">
					{#each trendDays as day}
						<span>{day}</span>
					{/each}
				</div>
			</div>
		</div>

		<div class="cq-trend-stats">
			<div class="cq-trend-stat">
				<span class="cq-trend-stat__label">7d low</span>
				<span class="cq-trend-stat__val">71</span>
			</div>
			<div class="cq-trend-stat">
				<span class="cq-trend-stat__label">7d high</span>
				<span class="cq-trend-stat__val">78</span>
			</div>
			<div class="cq-trend-stat">
				<span class="cq-trend-stat__label">7d change</span>
				<span class="cq-trend-stat__val cq-trend-stat__val--up">+7</span>
			</div>
			<div class="cq-trend-stat">
				<span class="cq-trend-stat__label">Average</span>
				<span class="cq-trend-stat__val">74.3</span>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Gauge Panel ─────────────────────────────────────────────── */
	.cq-gauge-panel {
		display: flex;
		align-items: center;
		gap: 40px;
		flex-wrap: wrap;
	}

	.cq-gauge-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	/* Rotate SVG so arc starts at 12 o'clock */
	.cq-gauge-svg {
		width: 164px;
		height: 164px;
		transform: rotate(-90deg);
	}

	.cq-gauge-track {
		stroke: var(--dbg3);
	}

	.cq-gauge-arc {
		transition: stroke-dasharray 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s ease;
	}

	/* Counter-rotate text so it reads normally */
	.cq-gauge-score {
		font-size: 28px;
		font-weight: 700;
		fill: var(--dt);
		transform: rotate(90deg);
		transform-origin: 70px 70px;
		letter-spacing: -0.04em;
	}

	.cq-gauge-sublabel {
		font-size: 9px;
		fill: var(--dt3);
		transform: rotate(90deg);
		transform-origin: 70px 70px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.cq-gauge-grade {
		margin-top: 8px;
		font-size: 24px;
		font-weight: 800;
		letter-spacing: -0.03em;
		transition: color 0.4s ease;
	}

	/* Summary bars */
	.cq-gauge-summary {
		flex: 1;
		min-width: 220px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.cq-summary-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.cq-summary-name {
		font-size: 12px;
		color: var(--dt2);
		width: 112px;
		flex-shrink: 0;
	}

	.cq-summary-bar-wrap {
		flex: 1;
		height: 6px;
		background: var(--dbg3);
		border-radius: 9999px;
		overflow: hidden;
	}

	.cq-summary-bar {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.5s ease;
	}

	.cq-summary-bar--green { background: #22c55e; }
	.cq-summary-bar--amber { background: #f59e0b; }

	.cq-summary-val {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		width: 34px;
		text-align: right;
		flex-shrink: 0;
	}

	.cq-gauge-badges {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		margin-top: 6px;
	}

	.cq-badge {
		display: inline-flex;
		align-items: center;
		padding: 3px 9px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 500;
	}

	.cq-badge--green  { background: #dcfce7; color: #15803d; }
	.cq-badge--amber  { background: #fef3c7; color: #92400e; }
	.cq-badge--neutral { background: var(--dbg3); color: var(--dt3); }

	:global(.dark) .cq-badge--green  { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
	:global(.dark) .cq-badge--amber  { background: rgba(245, 158, 11, 0.15); color: #fcd34d; }

	/* ── Metric Cards ─────────────────────────────────────────────── */
	.cq-metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		gap: 12px;
	}

	.cq-metric-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		transition: box-shadow 0.2s;
	}

	.cq-metric-card:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.cq-metric-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cq-metric-label {
		font-size: 12px;
		color: var(--dt2);
		font-weight: 500;
	}

	.cq-metric-trend {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 9999px;
	}

	.cq-metric-trend--good { color: #16a34a; background: #dcfce7; }
	.cq-metric-trend--bad  { color: #b45309; background: #fef3c7; }

	:global(.dark) .cq-metric-trend--good { color: #4ade80; background: rgba(34, 197, 94, 0.15); }
	:global(.dark) .cq-metric-trend--bad  { color: #fcd34d; background: rgba(245, 158, 11, 0.15); }

	.cq-metric-value {
		font-size: 30px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.04em;
		line-height: 1;
	}

	.cq-metric-unit {
		font-size: 14px;
		font-weight: 500;
		color: var(--dt3);
		margin-left: 2px;
	}

	.cq-sparkline {
		width: 100%;
		height: 30px;
		display: block;
		margin-top: 4px;
	}

	.cq-sparkline-line--good { stroke: #22c55e; }
	.cq-sparkline-line--bad  { stroke: #f59e0b; }

	.cq-sparkline-dot--good { fill: #22c55e; }
	.cq-sparkline-dot--bad  { fill: #f59e0b; }

	.cq-metric-footer { margin-top: 2px; }

	.cq-metric-period {
		font-size: 10px;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* ── Top Issues ───────────────────────────────────────────────── */
	.cq-issues-list {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.cq-issue-row {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd2);
		transition: background 0.15s, opacity 0.25s;
	}

	.cq-issue-row:last-child { border-bottom: none; }
	.cq-issue-row:hover      { background: var(--dbg2); }
	.cq-issue-row--fixed     { opacity: 0.42; }

	.cq-issue-main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.cq-issue-top {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.cq-issue-file {
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
		font-size: 12px;
		color: var(--dt);
		background: var(--dbg3);
		padding: 1px 6px;
		border-radius: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 340px;
	}

	.cq-issue-badge {
		display: inline-flex;
		align-items: center;
		padding: 1px 7px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		flex-shrink: 0;
	}

	.cq-issue-badge--complexity  { background: #ede9fe; color: #6d28d9; }
	.cq-issue-badge--duplication { background: #dbeafe; color: #1d4ed8; }
	.cq-issue-badge--coverage    { background: #fef3c7; color: #92400e; }
	.cq-issue-badge--security    { background: #fee2e2; color: #b91c1c; }

	:global(.dark) .cq-issue-badge--complexity  { background: rgba(109, 40, 217, 0.2); color: #c4b5fd; }
	:global(.dark) .cq-issue-badge--duplication { background: rgba(29, 78, 216, 0.2);  color: #93c5fd; }
	:global(.dark) .cq-issue-badge--coverage    { background: rgba(146, 64, 14, 0.2);  color: #fcd34d; }
	:global(.dark) .cq-issue-badge--security    { background: rgba(185, 28, 28, 0.2);  color: #fca5a5; }

	.cq-issue-desc {
		font-size: 12px;
		color: var(--dt2);
		line-height: 1.5;
		margin: 0;
	}

	.cq-issue-fix {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 5px 12px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		color: var(--dt);
		flex-shrink: 0;
		align-self: flex-start;
		margin-top: 2px;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
	}

	.cq-issue-fix:hover {
		background: var(--dbg3);
	}

	.cq-issue-fix--done {
		background: #dcfce7;
		border-color: #86efac;
		color: #15803d;
	}

	:global(.dark) .cq-issue-fix--done {
		background: rgba(34, 197, 94, 0.15);
		border-color: rgba(34, 197, 94, 0.3);
		color: #4ade80;
	}

	.cq-issues-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid var(--dbd2);
	}

	.cq-issues-count {
		font-size: 12px;
		color: var(--dt3);
	}

	.cq-issues-clear {
		font-size: 12px;
		color: var(--dt3);
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px 6px;
		border-radius: 4px;
		transition: background 0.15s, color 0.15s;
	}

	.cq-issues-clear:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* ── Trend Chart ──────────────────────────────────────────────── */
	.cq-trend-wrap {
		display: flex;
		align-items: stretch;
		gap: 10px;
	}

	.cq-trend-yaxis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 22px;
		flex-shrink: 0;
	}

	.cq-trend-yaxis span {
		font-size: 10px;
		color: var(--dt4);
		text-align: right;
		line-height: 1;
	}

	.cq-trend-chart-col {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.cq-trend-svg {
		width: 100%;
		height: 90px;
		display: block;
		overflow: visible;
	}

	.cq-trend-grid {
		stroke: var(--dbd2);
		stroke-width: 1;
		stroke-dasharray: 3 3;
	}

	.cq-trend-area {
		fill: url(#cq-area-grad);
	}

	.cq-trend-line {
		stroke: #22c55e;
	}

	.cq-trend-dot {
		fill: #22c55e;
		cursor: pointer;
		transition: r 0.12s ease;
	}

	.cq-trend-dot--active {
		fill: #16a34a;
	}

	.cq-trend-tip-bg {
		fill: var(--dbg3);
		stroke: var(--dbd);
		stroke-width: 1;
	}

	.cq-trend-tip-text {
		font-size: 9px;
		font-weight: 700;
		fill: var(--dt);
	}

	.cq-trend-xaxis {
		display: flex;
		justify-content: space-between;
		padding: 0 2px;
	}

	.cq-trend-xaxis span {
		font-size: 10px;
		color: var(--dt4);
		text-align: center;
		flex: 1;
	}

	.cq-trend-stats {
		display: flex;
		gap: 28px;
		flex-wrap: wrap;
		margin-top: 16px;
		padding-top: 14px;
		border-top: 1px solid var(--dbd2);
	}

	.cq-trend-stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.cq-trend-stat__label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt4);
	}

	.cq-trend-stat__val {
		font-size: 20px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.03em;
	}

	.cq-trend-stat__val--up { color: #22c55e; }
</style>
