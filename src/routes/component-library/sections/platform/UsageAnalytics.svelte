<script lang="ts">
	// ── Usage Overview ────────────────────────────────────────────────
	type Period = '24h' | '7d' | '30d' | '90d';
	let activePeriod = $state<Period>('7d');

	type MetricCard = { label: string; value: string; unit: string; delta: number; sparkline: number[]; color: string };

	const metricsByPeriod: Record<Period, MetricCard[]> = {
		'24h': [
			{ label: 'API Calls',     value: '1,284',  unit: 'calls',  delta: 8.2,  sparkline: [40, 55, 48, 62, 58, 72, 80, 68, 75, 84, 78, 92],  color: '#3b82f6' },
			{ label: 'Storage Used',  value: '4.2',    unit: 'GB',     delta: 0.4,  sparkline: [40, 41, 41, 42, 42, 42, 43, 43, 43, 42, 42, 42],   color: '#8b5cf6' },
			{ label: 'Compute Hours', value: '3.7',    unit: 'hrs',    delta: -5.1, sparkline: [55, 62, 48, 70, 44, 58, 38, 65, 42, 56, 40, 50],   color: '#06b6d4' },
			{ label: 'Active Users',  value: '24',     unit: 'users',  delta: 12.5, sparkline: [12, 16, 14, 18, 20, 17, 22, 19, 21, 23, 20, 24],   color: '#22c55e' },
		],
		'7d': [
			{ label: 'API Calls',     value: '48,310', unit: 'calls',  delta: 14.7, sparkline: [60, 72, 55, 80, 68, 92, 76, 88, 70, 95, 82, 100], color: '#3b82f6' },
			{ label: 'Storage Used',  value: '4.2',    unit: 'GB',     delta: 2.1,  sparkline: [38, 39, 40, 40, 41, 41, 41, 42, 42, 42, 42, 42],  color: '#8b5cf6' },
			{ label: 'Compute Hours', value: '29.4',   unit: 'hrs',    delta: -3.8, sparkline: [75, 62, 88, 54, 78, 65, 92, 58, 84, 70, 78, 82],  color: '#06b6d4' },
			{ label: 'Active Users',  value: '142',    unit: 'users',  delta: 6.3,  sparkline: [88, 92, 85, 98, 90, 102, 95, 108, 100, 112, 108, 115], color: '#22c55e' },
		],
		'30d': [
			{ label: 'API Calls',     value: '184,220', unit: 'calls', delta: 22.1, sparkline: [45, 52, 60, 58, 70, 65, 78, 72, 85, 80, 92, 100], color: '#3b82f6' },
			{ label: 'Storage Used',  value: '4.2',     unit: 'GB',    delta: 8.4,  sparkline: [30, 32, 35, 37, 38, 39, 40, 40, 41, 41, 42, 42],  color: '#8b5cf6' },
			{ label: 'Compute Hours', value: '118.5',   unit: 'hrs',   delta: 11.2, sparkline: [50, 55, 60, 58, 65, 68, 72, 70, 75, 78, 80, 82],  color: '#06b6d4' },
			{ label: 'Active Users',  value: '618',     unit: 'users', delta: 18.9, sparkline: [55, 60, 65, 68, 72, 75, 80, 82, 85, 88, 92, 95],  color: '#22c55e' },
		],
		'90d': [
			{ label: 'API Calls',     value: '521,840', unit: 'calls', delta: 38.4, sparkline: [30, 38, 45, 52, 58, 64, 70, 74, 80, 86, 92, 100], color: '#3b82f6' },
			{ label: 'Storage Used',  value: '4.2',     unit: 'GB',    delta: 31.2, sparkline: [18, 21, 25, 28, 30, 33, 35, 37, 39, 40, 41, 42],  color: '#8b5cf6' },
			{ label: 'Compute Hours', value: '342.8',   unit: 'hrs',   delta: 29.7, sparkline: [25, 30, 36, 40, 45, 50, 56, 62, 68, 74, 80, 85],  color: '#06b6d4' },
			{ label: 'Active Users',  value: '1,840',   unit: 'users', delta: 44.2, sparkline: [20, 28, 35, 42, 50, 56, 62, 68, 74, 80, 86, 95],  color: '#22c55e' },
		],
	};

	const activeMetrics = $derived(metricsByPeriod[activePeriod]);

	// ── Usage Charts ──────────────────────────────────────────────────
	const barData = [
		{ day: 'Mon', calls: 6200 },
		{ day: 'Tue', calls: 8450 },
		{ day: 'Wed', calls: 7100 },
		{ day: 'Thu', calls: 9800 },
		{ day: 'Fri', calls: 11200 },
		{ day: 'Sat', calls: 4300 },
		{ day: 'Sun', calls: 3860 },
	];
	const barMax = Math.max(...barData.map(d => d.calls));

	const linePoints = [42, 55, 48, 62, 58, 72, 67, 80, 74, 88, 82, 94];
	const lineMax = Math.max(...linePoints);
	const lineMin = Math.min(...linePoints);

	function toSvgPath(points: number[], width: number, height: number): string {
		const range = lineMax - lineMin || 1;
		const step = width / (points.length - 1);
		return points.map((p, i) => {
			const x = i * step;
			const y = height - ((p - lineMin) / range) * (height - 8) - 4;
			return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
		}).join(' ');
	}

	const pieSlices = [
		{ label: 'AI Inference',  pct: 48, color: '#3b82f6' },
		{ label: 'Storage I/O',   pct: 22, color: '#8b5cf6' },
		{ label: 'Compute',       pct: 18, color: '#06b6d4' },
		{ label: 'Networking',    pct: 12, color: '#f59e0b' },
	];

	function buildConic(slices: typeof pieSlices): string {
		let angle = 0;
		return slices.map(s => {
			const start = angle;
			angle += (s.pct / 100) * 360;
			return `${s.color} ${start}deg ${angle}deg`;
		}).join(', ');
	}

	const conicGradient = $derived(buildConic(pieSlices));

	// ── Cost Breakdown ────────────────────────────────────────────────
	type CostRow = { service: string; usage: string; unitPrice: string; total: number; pct: number };
	const costRows: CostRow[] = [
		{ service: 'AI Inference (GPT-4o)',   usage: '2,840 calls',  unitPrice: '$0.003/call', total: 8.52,  pct: 48 },
		{ service: 'AI Inference (Claude 3)', usage: '1,200 calls',  unitPrice: '$0.002/call', total: 2.40,  pct: 14 },
		{ service: 'Storage',                 usage: '4.2 GB',       unitPrice: '$0.80/GB',    total: 3.36,  pct: 19 },
		{ service: 'Compute',                 usage: '29.4 hrs',     unitPrice: '$0.08/hr',    total: 2.35,  pct: 13 },
		{ service: 'Bandwidth',               usage: '120 GB',       unitPrice: '$0.005/GB',   total: 0.60,  pct: 3  },
		{ service: 'Embeddings',              usage: '48,000 tokens',unitPrice: '$0.0001/1k',  total: 0.48,  pct: 3  },
	];
	const totalCost = costRows.reduce((acc, r) => acc + r.total, 0);
	const budgetLimit = 25;
	const budgetPct = Math.round((totalCost / budgetLimit) * 100);

	// ── Alerts & Limits ───────────────────────────────────────────────
	type AlertLevel = 'warning' | 'critical' | 'exceeded';
	type UsageAlert = { label: string; used: number; limit: number; unit: string; level: AlertLevel };

	const usageAlerts: UsageAlert[] = [
		{ label: 'API Calls',      used: 8340,  limit: 10000, unit: 'calls', level: 'warning'  },
		{ label: 'Storage',        used: 9.1,   limit: 10,    unit: 'GB',    level: 'critical' },
		{ label: 'Team Members',   used: 10,    limit: 10,    unit: '',      level: 'exceeded' },
	];

	const alertMeta: Record<AlertLevel, { color: string; bg: string; border: string; icon: string; label: string }> = {
		warning:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.2)',  icon: '⚠', label: '80% threshold' },
		critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.2)',   icon: '!', label: '90% threshold' },
		exceeded: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)',  icon: '✕', label: 'Limit reached' },
	};

	let autoScale = $state(false);
	let quotaResetHours = $state(16);
	let quotaResetMinutes = $state(42);
</script>

<section class="ds-section">
	<h2 class="ds-title">Usage Analytics</h2>
	<p class="ds-desc">
		Usage metrics, chart visualizations, cost breakdown tables, and alert threshold patterns.
	</p>

	<!-- ══════════════════════════════════════════════════════════════
	     1. Usage Overview
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Usage Overview</h3>
		<p class="ds-card__sub">Metric cards with sparklines and an interactive period selector</p>

		<div class="ua-overview">
			<!-- Period pills -->
			<div class="ua-period-row" role="group" aria-label="Time period selector">
				{#each (['24h', '7d', '30d', '90d'] as Period[]) as p}
					<button
						class="btn-pill btn-pill-sm {activePeriod === p ? 'btn-pill-primary' : 'btn-pill-ghost'}"
						onclick={() => { activePeriod = p; }}
						aria-pressed={activePeriod === p}
						aria-label="Period: {p}"
					>{p}</button>
				{/each}
			</div>

			<!-- Metric cards -->
			<div class="ua-metrics-grid">
				{#each activeMetrics as metric}
					{@const spPts = metric.sparkline}
					{@const spMax2 = Math.max(...spPts)}
					{@const spMin2 = Math.min(...spPts)}
					{@const spRange2 = spMax2 - spMin2 || 1}
					{@const spStep = 120 / (spPts.length - 1)}
					{@const spPath = spPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * spStep).toFixed(1)} ${(28 - ((p - spMin2) / spRange2) * 24).toFixed(1)}`).join(' ')}
					{@const spGradId = 'spark-' + metric.label.replace(/\s/g, '')}
					<div class="ua-metric-card">
						<div class="ua-metric-card__head">
							<span class="ua-metric-card__label">{metric.label}</span>
							<span class="ua-metric-card__delta {metric.delta >= 0 ? 'ua-metric-card__delta--up' : 'ua-metric-card__delta--down'}">
								{metric.delta >= 0 ? '↑' : '↓'}{Math.abs(metric.delta)}%
							</span>
						</div>
						<div class="ua-metric-card__value">
							{metric.value}
							<span class="ua-metric-card__unit">{metric.unit}</span>
						</div>
						<!-- Sparkline -->
						<div class="ua-sparkline" aria-hidden="true">
							<svg width="100%" height="32" viewBox="0 0 120 32" preserveAspectRatio="none">
								<defs>
									<linearGradient id="{spGradId}" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stop-color="{metric.color}" stop-opacity="0.25"/>
										<stop offset="100%" stop-color="{metric.color}" stop-opacity="0"/>
									</linearGradient>
								</defs>
								<path
									d="{spPath} L {((spPts.length - 1) * spStep).toFixed(1)} 32 L 0 32 Z"
									fill="url(#{spGradId})"
								/>
								<path d="{spPath}" fill="none" stroke="{metric.color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     2. Usage Charts
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Usage Charts</h3>
		<p class="ds-card__sub">Bar chart, line trend, and pie resource allocation — all pure CSS/SVG</p>

		<div class="ua-charts-grid">
			<!-- Bar chart: daily API calls -->
			<div class="ua-chart-panel">
				<div class="ua-chart-panel__head">
					<span class="ua-chart-panel__title">Daily API Calls</span>
					<span class="ua-chart-panel__sub">Last 7 days</span>
				</div>
				<div class="ua-bar-chart" role="img" aria-label="Daily API calls bar chart">
					<div class="ua-bar-chart__bars">
						{#each barData as bar}
							{@const pct = Math.round((bar.calls / barMax) * 100)}
							<div class="ua-bar-group">
								<div class="ua-bar-group__val">{(bar.calls / 1000).toFixed(1)}k</div>
								<div class="ua-bar-track">
									<div class="ua-bar-fill" style="height:{pct}%" title="{bar.day}: {bar.calls.toLocaleString()} calls"></div>
								</div>
								<div class="ua-bar-group__day">{bar.day}</div>
							</div>
						{/each}
					</div>
					<div class="ua-bar-chart__yaxis" aria-hidden="true">
						{#each [barMax, Math.round(barMax * 0.5), 0] as y}
							<span>{y >= 1000 ? (y/1000).toFixed(0) + 'k' : y}</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Line chart: monthly trend -->
			<div class="ua-chart-panel">
				<div class="ua-chart-panel__head">
					<span class="ua-chart-panel__title">Monthly Trend</span>
					<span class="ua-chart-panel__sub">Compute hours</span>
				</div>
				<div class="ua-line-chart" role="img" aria-label="Monthly compute hours trend">
					<svg class="ua-line-svg" viewBox="0 0 280 80" preserveAspectRatio="none">
						<defs>
							<linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2"/>
								<stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
							</linearGradient>
						</defs>
						<!-- Grid lines -->
						{#each [20, 40, 60] as y}
							<line x1="0" y1={y} x2="280" y2={y} stroke="var(--dbd)" stroke-width="0.5" stroke-dasharray="3 3"/>
						{/each}
						<!-- Area fill -->
						<path
							d="{toSvgPath(linePoints, 280, 80)} L 280 80 L 0 80 Z"
							fill="url(#line-grad)"
						/>
						<!-- Line -->
						<path
							d={toSvgPath(linePoints, 280, 80)}
							fill="none"
							stroke="#06b6d4"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<!-- Dots -->
						{#each linePoints as p, i}
							{@const range = lineMax - lineMin || 1}
							{@const step = 280 / (linePoints.length - 1)}
							{@const x = i * step}
							{@const y = 80 - ((p - lineMin) / range) * (80 - 8) - 4}
							<circle cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.5" fill="#06b6d4"/>
						{/each}
					</svg>
					<div class="ua-line-months" aria-hidden="true">
						{#each ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] as m}
							<span>{m}</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Pie chart: resource allocation -->
			<div class="ua-chart-panel">
				<div class="ua-chart-panel__head">
					<span class="ua-chart-panel__title">Resource Allocation</span>
					<span class="ua-chart-panel__sub">By module</span>
				</div>
				<div class="ua-pie-wrap">
					<div
						class="ua-pie"
						style="background: conic-gradient({conicGradient})"
						role="img"
						aria-label="Resource allocation pie chart"
					>
						<div class="ua-pie__hole">
							<span class="ua-pie__total">100%</span>
							<span class="ua-pie__label">total</span>
						</div>
					</div>
					<ul class="ua-pie-legend" role="list">
						{#each pieSlices as slice}
							<li class="ua-pie-legend__item">
								<span class="ua-pie-legend__dot" style="background:{slice.color}"></span>
								<span class="ua-pie-legend__name">{slice.label}</span>
								<span class="ua-pie-legend__pct">{slice.pct}%</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     3. Cost Breakdown
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Cost Breakdown</h3>
		<p class="ds-card__sub">Itemized service costs with budget bar and threshold markers</p>

		<div class="ua-cost-wrap">
			<!-- Budget bar -->
			<div class="ua-budget-bar-section">
				<div class="ua-budget-bar-head">
					<span class="ua-budget-bar-head__label">Monthly Budget</span>
					<span class="ua-budget-bar-head__val">
						<span class="ua-budget-bar-head__spent">${totalCost.toFixed(2)}</span>
						<span class="ua-budget-bar-head__limit"> / $25.00</span>
					</span>
				</div>
				<div class="ua-budget-track" role="progressbar" aria-valuenow={budgetPct} aria-valuemin={0} aria-valuemax={100} aria-label="Budget used: {budgetPct}%">
					<div
						class="ua-budget-fill"
						style="width:{Math.min(budgetPct, 100)}%; background:{budgetPct >= 90 ? '#ef4444' : budgetPct >= 70 ? '#f59e0b' : '#22c55e'};"
					></div>
					<!-- Threshold markers -->
					<div class="ua-budget-marker ua-budget-marker--70" title="70% threshold" aria-hidden="true"></div>
					<div class="ua-budget-marker ua-budget-marker--90" title="90% threshold" aria-hidden="true"></div>
				</div>
				<div class="ua-budget-labels" aria-hidden="true">
					<span></span>
					<span class="ua-budget-labels__70">70%</span>
					<span class="ua-budget-labels__90">90%</span>
					<span>100%</span>
				</div>
			</div>

			<!-- Cost table -->
			<div class="ua-table-wrap">
				<table class="ua-table" aria-label="Cost breakdown by service">
					<thead>
						<tr class="ua-table__head-row">
							<th class="ua-th" scope="col">Service</th>
							<th class="ua-th" scope="col">Usage</th>
							<th class="ua-th" scope="col">Unit Price</th>
							<th class="ua-th ua-th--right" scope="col">Total</th>
							<th class="ua-th ua-th--right" scope="col">% of Total</th>
						</tr>
					</thead>
					<tbody>
						{#each costRows as row, i}
							<tr class="ua-table__row {i === costRows.length - 1 ? 'ua-table__row--last' : ''}">
								<td class="ua-td ua-td--service">{row.service}</td>
								<td class="ua-td ua-td--muted">{row.usage}</td>
								<td class="ua-td ua-td--mono">{row.unitPrice}</td>
								<td class="ua-td ua-td--right ua-td--bold">${row.total.toFixed(2)}</td>
								<td class="ua-td ua-td--right">
									<div class="ua-pct-cell">
										<div class="ua-pct-bar">
											<div class="ua-pct-fill" style="width:{row.pct}%"></div>
										</div>
										<span class="ua-pct-label">{row.pct}%</span>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr class="ua-table__total-row">
							<td class="ua-td ua-td--total" colspan="3">Total</td>
							<td class="ua-td ua-td--right ua-td--total">${totalCost.toFixed(2)}</td>
							<td class="ua-td ua-td--right ua-td--total">100%</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     4. Alerts & Limits
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Alerts &amp; Limits</h3>
		<p class="ds-card__sub">Threshold alert cards, rate limit status, quota reset countdown, and auto-scaling toggle</p>

		<div class="ua-alerts-layout">
			<!-- Alert cards -->
			<div class="ua-alerts-list">
				{#each usageAlerts as alert}
					{@const meta = alertMeta[alert.level]}
					{@const pct = Math.min(Math.round((alert.used / alert.limit) * 100), 100)}
					<div class="ua-alert-card" style="background:{meta.bg}; border-color:{meta.border};">
						<div class="ua-alert-card__head">
							<div class="ua-alert-card__icon" style="color:{meta.color}; background:{meta.bg};" aria-hidden="true">{meta.icon}</div>
							<div class="ua-alert-card__info">
								<span class="ua-alert-card__title" style="color:{meta.color};">{alert.label}</span>
								<span class="ua-alert-card__badge" style="color:{meta.color}; border-color:{meta.border};">{meta.label}</span>
							</div>
						</div>
						<div class="ua-alert-card__body">
							<div class="ua-alert-card__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="{alert.label}: {pct}%">
								<div class="ua-alert-card__fill" style="width:{pct}%; background:{meta.color};"></div>
							</div>
							<div class="ua-alert-card__meta">
								<span>{alert.used.toLocaleString()}{alert.unit ? ' ' + alert.unit : ''} used</span>
								<span>{alert.limit.toLocaleString()}{alert.unit ? ' ' + alert.unit : ''} limit</span>
							</div>
						</div>
						<button class="btn-pill btn-pill-xs btn-pill-outline" aria-label="Upgrade {alert.label} limit">Upgrade Limit</button>
					</div>
				{/each}
			</div>

			<!-- Sidebar: rate limit + countdown + autoscale -->
			<div class="ua-alerts-sidebar">
				<!-- Rate Limit Status -->
				<div class="ua-info-panel">
					<div class="ua-info-panel__title">Rate Limit Status</div>
					<div class="ua-rate-rows">
						{#each [
							{ label: 'Requests / min',   used: 42,  limit: 60,  color: '#22c55e' },
							{ label: 'Requests / hour',  used: 834, limit: 1000, color: '#f59e0b' },
							{ label: 'Tokens / min',     used: 180, limit: 200,  color: '#ef4444' },
						] as rate}
							{@const pct = Math.round((rate.used / rate.limit) * 100)}
							<div class="ua-rate-row">
								<div class="ua-rate-row__head">
									<span class="ua-rate-row__label">{rate.label}</span>
									<span class="ua-rate-row__val" style="color:{rate.color}">{rate.used}/{rate.limit}</span>
								</div>
								<div class="ua-rate-track">
									<div class="ua-rate-fill" style="width:{pct}%; background:{rate.color};"></div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Quota Reset Countdown -->
				<div class="ua-info-panel">
					<div class="ua-info-panel__title">Quota Resets In</div>
					<div class="ua-countdown" role="timer" aria-live="polite" aria-label="Quota resets in {quotaResetHours} hours {quotaResetMinutes} minutes">
						<div class="ua-countdown__unit">
							<span class="ua-countdown__num">{String(quotaResetHours).padStart(2, '0')}</span>
							<span class="ua-countdown__label">hours</span>
						</div>
						<span class="ua-countdown__sep" aria-hidden="true">:</span>
						<div class="ua-countdown__unit">
							<span class="ua-countdown__num">{String(quotaResetMinutes).padStart(2, '0')}</span>
							<span class="ua-countdown__label">min</span>
						</div>
					</div>
					<p class="ua-countdown__note">Resets April 7, 2026 at 00:00 UTC</p>
				</div>

				<!-- Auto-Scaling Toggle -->
				<div class="ua-info-panel">
					<div class="ua-autoscale">
						<div class="ua-autoscale__info">
							<span class="ua-info-panel__title">Auto-Scaling</span>
							<span class="ua-autoscale__desc">Automatically increase limits when approaching threshold</span>
						</div>
						<button
							role="switch"
							aria-checked={autoScale}
							aria-label="Toggle auto-scaling"
							class="ua-toggle {autoScale ? 'ua-toggle--on' : 'ua-toggle--off'}"
							onclick={() => { autoScale = !autoScale; }}
						>
							<span class="ua-toggle__thumb"></span>
						</button>
					</div>
					{#if autoScale}
						<p class="ua-autoscale__active">Auto-scaling is active. Costs may increase when limits are exceeded.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  OVERVIEW                                                     */
	/* ══════════════════════════════════════════════════════════════ */
	.ua-overview {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.ua-period-row {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.ua-metrics-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
	}

	@media (max-width: 860px) {
		.ua-metrics-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.ua-metric-card {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 14px;
		background: var(--dbg);
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.ua-metric-card__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}

	.ua-metric-card__label {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ua-metric-card__delta {
		font-size: 10px;
		font-weight: 700;
		padding: 1px 6px;
		border-radius: 9999px;
	}
	.ua-metric-card__delta--up   { color: #22c55e; background: rgba(34,197,94,0.1); }
	.ua-metric-card__delta--down { color: #ef4444; background: rgba(239,68,68,0.1); }

	.ua-metric-card__value {
		font-size: 22px;
		font-weight: 800;
		color: var(--dt);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.ua-metric-card__unit {
		font-size: 12px;
		font-weight: 400;
		color: var(--dt3);
		margin-left: 3px;
	}

	.ua-sparkline {
		margin-top: 4px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  CHARTS GRID                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.ua-charts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 220px;
		gap: 14px;
		align-items: start;
	}

	@media (max-width: 900px) {
		.ua-charts-grid {
			grid-template-columns: 1fr;
		}
	}

	.ua-chart-panel {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		overflow: hidden;
	}

	.ua-chart-panel__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: 12px 14px 8px;
		border-bottom: 1px solid var(--dbd);
	}

	.ua-chart-panel__title {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}

	.ua-chart-panel__sub {
		font-size: 10px;
		color: var(--dt4);
	}

	/* Bar chart */
	.ua-bar-chart {
		display: flex;
		gap: 0;
		padding: 12px 12px 8px;
	}

	.ua-bar-chart__bars {
		display: flex;
		align-items: flex-end;
		gap: 6px;
		flex: 1;
		height: 120px;
	}

	.ua-bar-chart__yaxis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 22px;
		width: 28px;
		text-align: right;
		font-size: 9px;
		color: var(--dt4);
	}

	.ua-bar-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		height: 100%;
	}

	.ua-bar-group__val {
		font-size: 8px;
		color: var(--dt4);
		margin-bottom: 3px;
		font-variant-numeric: tabular-nums;
	}

	.ua-bar-track {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: flex-end;
		background: var(--dbg2);
		border-radius: 4px 4px 0 0;
		overflow: hidden;
	}

	.ua-bar-fill {
		width: 100%;
		background: #3b82f6;
		border-radius: 4px 4px 0 0;
		transition: height 0.3s ease;
	}

	.ua-bar-group__day {
		font-size: 9px;
		color: var(--dt3);
		margin-top: 4px;
		font-weight: 500;
	}

	/* Line chart */
	.ua-line-chart {
		padding: 12px 12px 0;
	}

	.ua-line-svg {
		width: 100%;
		height: 80px;
		display: block;
	}

	.ua-line-months {
		display: flex;
		justify-content: space-between;
		padding: 4px 0 8px;
		font-size: 8px;
		color: var(--dt4);
	}

	/* Pie chart */
	.ua-pie-wrap {
		padding: 14px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}

	.ua-pie {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.ua-pie__hole {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: var(--dbg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1px;
	}

	.ua-pie__total {
		font-size: 14px;
		font-weight: 800;
		color: var(--dt);
		line-height: 1;
	}

	.ua-pie__label {
		font-size: 9px;
		color: var(--dt4);
	}

	.ua-pie-legend {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 7px;
		width: 100%;
	}

	.ua-pie-legend__item {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 11px;
	}

	.ua-pie-legend__dot {
		width: 8px;
		height: 8px;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.ua-pie-legend__name {
		flex: 1;
		color: var(--dt2);
		min-width: 0;
	}

	.ua-pie-legend__pct {
		font-weight: 600;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  COST BREAKDOWN                                               */
	/* ══════════════════════════════════════════════════════════════ */
	.ua-cost-wrap {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* Budget bar */
	.ua-budget-bar-section {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.ua-budget-bar-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ua-budget-bar-head__label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2);
	}

	.ua-budget-bar-head__spent {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}

	.ua-budget-bar-head__limit {
		font-size: 12px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
	}

	.ua-budget-track {
		position: relative;
		height: 10px;
		border-radius: 9999px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		overflow: visible;
	}

	.ua-budget-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	.ua-budget-marker {
		position: absolute;
		top: -3px;
		width: 2px;
		height: 16px;
		background: var(--dt3);
		border-radius: 1px;
		opacity: 0.4;
	}
	.ua-budget-marker--70 { left: 70%; }
	.ua-budget-marker--90 { left: 90%; }

	.ua-budget-labels {
		display: flex;
		justify-content: space-between;
		font-size: 9px;
		color: var(--dt4);
		padding: 0 2px;
	}

	.ua-budget-labels__70 { margin-left: calc(70% - 14px); }
	.ua-budget-labels__90 { margin-left: calc(20% - 14px); }

	/* Cost table */
	.ua-table-wrap {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		background: var(--dbg);
	}

	.ua-table {
		width: 100%;
		border-collapse: collapse;
	}

	.ua-table__head-row {
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.ua-th {
		padding: 9px 14px;
		text-align: left;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
		white-space: nowrap;
	}
	.ua-th--right { text-align: right; }

	.ua-table__row {
		border-bottom: 1px solid var(--dbd);
	}
	.ua-table__row--last {
		border-bottom: none;
	}

	.ua-td {
		padding: 10px 14px;
		font-size: 12px;
		color: var(--dt);
		vertical-align: middle;
	}
	.ua-td--service { font-weight: 500; }
	.ua-td--muted   { color: var(--dt3); font-size: 11px; }
	.ua-td--mono    { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px; color: var(--dt2); }
	.ua-td--right   { text-align: right; }
	.ua-td--bold    { font-weight: 700; font-variant-numeric: tabular-nums; }
	.ua-td--total   { font-weight: 700; font-size: 13px; }

	.ua-table__total-row {
		border-top: 2px solid var(--dbd);
		background: var(--dbg2);
	}

	.ua-pct-cell {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: flex-end;
	}

	.ua-pct-bar {
		width: 50px;
		height: 4px;
		border-radius: 9999px;
		background: var(--dbg3);
		overflow: hidden;
	}

	.ua-pct-fill {
		height: 100%;
		background: #3b82f6;
		border-radius: 9999px;
	}

	.ua-pct-label {
		font-size: 11px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		min-width: 28px;
		text-align: right;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  ALERTS & LIMITS                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.ua-alerts-layout {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 14px;
		align-items: start;
	}

	@media (max-width: 800px) {
		.ua-alerts-layout {
			grid-template-columns: 1fr;
		}
	}

	.ua-alerts-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.ua-alert-card {
		border: 1px solid;
		border-radius: 12px;
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.ua-alert-card__head {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.ua-alert-card__icon {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 800;
		flex-shrink: 0;
	}

	.ua-alert-card__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.ua-alert-card__title {
		font-size: 13px;
		font-weight: 600;
	}

	.ua-alert-card__badge {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		border: 1px solid;
		width: fit-content;
		background: transparent;
	}

	.ua-alert-card__body {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ua-alert-card__track {
		height: 5px;
		border-radius: 9999px;
		background: rgba(0,0,0,0.1);
		overflow: hidden;
	}

	.ua-alert-card__fill {
		height: 100%;
		border-radius: 9999px;
	}

	.ua-alert-card__meta {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		color: var(--dt3);
	}

	/* Sidebar panels */
	.ua-alerts-sidebar {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.ua-info-panel {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 14px;
		background: var(--dbg);
	}

	.ua-info-panel__title {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
		margin-bottom: 10px;
		display: block;
	}

	.ua-rate-rows {
		display: flex;
		flex-direction: column;
		gap: 9px;
	}

	.ua-rate-row {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ua-rate-row__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ua-rate-row__label {
		font-size: 11px;
		color: var(--dt2);
	}

	.ua-rate-row__val {
		font-size: 11px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.ua-rate-track {
		height: 4px;
		border-radius: 9999px;
		background: var(--dbg3);
		overflow: hidden;
	}

	.ua-rate-fill {
		height: 100%;
		border-radius: 9999px;
	}

	/* Countdown */
	.ua-countdown {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
		margin-bottom: 8px;
	}

	.ua-countdown__unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.ua-countdown__num {
		font-size: 28px;
		font-weight: 800;
		color: var(--dt);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.ua-countdown__label {
		font-size: 9px;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ua-countdown__sep {
		font-size: 24px;
		font-weight: 800;
		color: var(--dt3);
		margin-bottom: 12px;
	}

	.ua-countdown__note {
		font-size: 10px;
		color: var(--dt4);
		text-align: center;
		margin: 0;
	}

	/* Auto-scale */
	.ua-autoscale {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 10px;
	}

	.ua-autoscale__info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ua-autoscale__desc {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
	}

	.ua-autoscale__active {
		font-size: 11px;
		color: #22c55e;
		background: rgba(34,197,94,0.08);
		border: 1px solid rgba(34,197,94,0.18);
		border-radius: 6px;
		padding: 6px 10px;
		margin: 8px 0 0;
	}

	.ua-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 38px;
		height: 22px;
		border-radius: 11px;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		padding: 0;
		margin-top: 14px;
	}
	.ua-toggle--on  { background: #22c55e; }
	.ua-toggle--off { background: var(--dbg3); border: 1px solid var(--dbd); }
	.ua-toggle__thumb {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0,0,0,0.2);
		transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		left: 3px;
	}
	.ua-toggle--on  .ua-toggle__thumb { transform: translateX(16px); }
	.ua-toggle--off .ua-toggle__thumb { transform: translateX(0); }
	.ua-toggle:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}
</style>
