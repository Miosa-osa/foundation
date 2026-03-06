<script lang="ts">
	// ── Session History Table ─────────────────────────────────────────
	type SortDir = 'asc' | 'desc' | null;
	let sortCol = $state<string | null>('lastActive');
	let sortDir = $state<SortDir>('desc');

	function setSort(col: string) {
		if (sortCol === col) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortCol = col;
			sortDir = 'asc';
		}
	}

	type Session = {
		id: number;
		name: string;
		lastActive: string;
		lastActiveMs: number;
		credits: number;
		apiCalls: number;
		status: 'active' | 'idle' | 'ended';
	};

	const sessions: Session[] = [
		{ id: 1, name: 'Research — Q1 Market Analysis',     lastActive: '2m ago',   lastActiveMs: 2,     credits: 12.40, apiCalls: 38,  status: 'active' },
		{ id: 2, name: 'Code Review — Auth Refactor',       lastActive: '18m ago',  lastActiveMs: 18,    credits: 4.85,  apiCalls: 14,  status: 'idle'   },
		{ id: 3, name: 'Content Draft — Blog Post Series',  lastActive: '1h ago',   lastActiveMs: 60,    credits: 31.20, apiCalls: 97,  status: 'idle'   },
		{ id: 4, name: 'Support — Customer Ticket #4821',   lastActive: '3h ago',   lastActiveMs: 180,   credits: 6.10,  apiCalls: 19,  status: 'ended'  },
		{ id: 5, name: 'Data Pipeline — CSV Transform',     lastActive: 'Yesterday', lastActiveMs: 1440, credits: 48.75, apiCalls: 152, status: 'ended'  },
		{ id: 6, name: 'Design Review — Figma Export',      lastActive: '2d ago',   lastActiveMs: 2880,  credits: 9.00,  apiCalls: 28,  status: 'ended'  },
	];

	let sortedSessions = $derived.by(() => {
		if (!sortCol || !sortDir) return sessions;
		return [...sessions].sort((a, b) => {
			let av: string | number, bv: string | number;
			if (sortCol === 'lastActive') { av = a.lastActiveMs; bv = b.lastActiveMs; }
			else if (sortCol === 'credits') { av = a.credits; bv = b.credits; }
			else if (sortCol === 'apiCalls') { av = a.apiCalls; bv = b.apiCalls; }
			else { av = a.name; bv = b.name; }
			const cmp = typeof av === 'number' ? (av as number) - (bv as number) : String(av).localeCompare(String(bv));
			return sortDir === 'asc' ? cmp : -cmp;
		});
	});

	// ── Usage Overview Card ───────────────────────────────────────────
	const freeUsed  = 334.6;
	const freeTotal = 1000;
	const freePct   = Math.round((freeUsed / freeTotal) * 100);
	const apiCredits = 4.50;

	// ── Plan comparison ───────────────────────────────────────────────
	const plans = [
		{
			name: 'Free',
			price: '$0',
			period: '/mo',
			desc: 'Personal projects and exploration',
			highlighted: false,
			badge: null,
			cta: 'Current plan',
			ctaDisabled: true,
			credits: '1,000 credits/mo',
			features: [
				{ label: '1,000 free credits/mo', included: true },
				{ label: 'GPT-4o access', included: true },
				{ label: 'Claude 3.5 Sonnet', included: true },
				{ label: 'Session history (7 days)', included: true },
				{ label: 'API access', included: false },
				{ label: 'Priority support', included: false },
				{ label: 'Team workspace', included: false },
				{ label: 'SSO / SAML', included: false },
			],
		},
		{
			name: 'Pro',
			price: '$19',
			period: '/mo',
			desc: 'Power users who need more capacity',
			highlighted: true,
			badge: 'Most popular',
			cta: 'Upgrade to Pro',
			ctaDisabled: false,
			credits: '10,000 credits/mo',
			features: [
				{ label: '10,000 credits/mo', included: true },
				{ label: 'All models including GPT-4.5', included: true },
				{ label: 'Claude 3.7 Sonnet', included: true },
				{ label: 'Unlimited session history', included: true },
				{ label: 'API access (rate limited)', included: true },
				{ label: 'Email support', included: true },
				{ label: 'Team workspace', included: false },
				{ label: 'SSO / SAML', included: false },
			],
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			desc: 'Custom contracts for teams & orgs',
			highlighted: false,
			badge: null,
			cta: 'Contact sales',
			ctaDisabled: false,
			credits: 'Unlimited credits',
			features: [
				{ label: 'Unlimited credits', included: true },
				{ label: 'All models + early access', included: true },
				{ label: 'All Claude models', included: true },
				{ label: 'Unlimited session history', included: true },
				{ label: 'Full API access', included: true },
				{ label: 'Dedicated support + SLA', included: true },
				{ label: 'Team workspace + roles', included: true },
				{ label: 'SSO / SAML', included: true },
			],
		},
	];

	const statusMeta: Record<Session['status'], { color: string; bg: string; dot: string; label: string }> = {
		active: { color: '#4ade80', bg: 'rgba(34,197,94,0.1)',  dot: '#22c55e', label: 'Active'  },
		idle:   { color: '#facc15', bg: 'rgba(234,179,8,0.1)',  dot: '#eab308', label: 'Idle'    },
		ended:  { color: 'var(--dt2)', bg: 'var(--dbg2)',        dot: 'var(--dt3)', label: 'Ended' },
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">Usage &amp; Credits Dashboard</h2>
	<p class="ds-subtitle">
		Usage consumption charts, session history, plan comparison, and API spend tracking.
	</p>

	<!-- ══════════════════════════════════════════════════════════════════
	     1. Usage Overview Card (Free / API split)
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Usage Overview Card</h3>
		<p class="ds-card__sub">Split layout showing free-tier credit consumption and pay-as-you-go API spend</p>

		<div class="ud-overview-card">
			<!-- Card header -->
			<div class="ud-overview-card__head">
				<div>
					<div class="ud-overview-card__title">Usage this month</div>
					<div class="ud-overview-card__sub">Resets March 28, 2026</div>
				</div>
				<button class="ud-btn-upgrade" aria-label="Upgrade plan">Upgrade Plan</button>
			</div>

			<!-- Two-column split -->
			<div class="ud-overview-cols">
				<!-- Free column -->
				<div class="ud-overview-col">
					<div class="ud-overview-col__head">
						<span class="ud-overview-col__label">Free</span>
						<span class="ud-overview-col__badge">1,000 credits/mo</span>
					</div>

					<div class="ud-stat-row">
						<span class="ud-stat-main">{freeUsed.toLocaleString('en-US', { minimumFractionDigits: 1 })}</span>
						<span class="ud-stat-sep">/</span>
						<span class="ud-stat-total">1,000</span>
						<span class="ud-stat-unit">credits used</span>
					</div>

					<!-- Progress bar -->
					<div class="ud-progress-track" role="progressbar" aria-valuenow={freePct} aria-valuemin={0} aria-valuemax={100} aria-label="Free credits used: {freePct}%">
						<div class="ud-progress-fill" style="width: {freePct}%; background: {freePct < 50 ? 'var(--ud-green)' : freePct < 80 ? 'var(--ud-amber)' : 'var(--ud-red)'};"></div>
					</div>
					<div class="ud-progress-meta">
						<span>{freePct}% used</span>
						<span>{(freeTotal - freeUsed).toLocaleString('en-US', { minimumFractionDigits: 1 })} remaining</span>
					</div>
				</div>

				<!-- Divider -->
				<div class="ud-overview-divider" aria-hidden="true"></div>

				<!-- API column -->
				<div class="ud-overview-col">
					<div class="ud-overview-col__head">
						<span class="ud-overview-col__label">API</span>
						<span class="ud-overview-col__badge ud-overview-col__badge--blue">Pay-as-you-go</span>
					</div>

					<div class="ud-stat-row">
						<span class="ud-stat-main ud-stat-main--blue">${apiCredits.toFixed(2)}</span>
						<span class="ud-stat-unit">this month</span>
					</div>

					<!-- Mini breakdown bars -->
					<div class="ud-api-breakdown">
						<div class="ud-api-row">
							<span class="ud-api-row__label">GPT-4o</span>
							<div class="ud-progress-track ud-progress-track--sm">
								<div class="ud-progress-fill" style="width: 52%; background: #3b82f6;"></div>
							</div>
							<span class="ud-api-row__val">$2.34</span>
						</div>
						<div class="ud-api-row">
							<span class="ud-api-row__label">Claude 3.5</span>
							<div class="ud-progress-track ud-progress-track--sm">
								<div class="ud-progress-fill" style="width: 38%; background: #8b5cf6;"></div>
							</div>
							<span class="ud-api-row__val">$1.71</span>
						</div>
						<div class="ud-api-row">
							<span class="ud-api-row__label">Embedding</span>
							<div class="ud-progress-track ud-progress-track--sm">
								<div class="ud-progress-fill" style="width: 10%; background: var(--dt3);"></div>
							</div>
							<span class="ud-api-row__val">$0.45</span>
						</div>
					</div>

					<div class="ud-progress-meta">
						<span>3 models</span>
						<span>142 API calls</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════════
	     2. Session History Table
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Session History Table</h3>
		<p class="ds-card__sub">Sortable table of AI sessions — click headers to sort by any column</p>

		<div class="ud-table-wrap">
			<table class="ud-table">
				<thead>
					<tr class="ud-table__head-row">
						{#each [
							['name',       'Session'],
							['lastActive', 'Last Active'],
							['credits',    'Credits'],
							['apiCalls',   'API Calls'],
						] as [col, label]}
							{@const isActive = sortCol === col}
							<th
								class="ud-th"
								class:ud-th--active={isActive}
								scope="col"
								aria-sort={isActive ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
							>
								<button
									onclick={() => setSort(col)}
									class="ud-th__btn"
								>
									{label}
									<span class="ud-sort-icon" aria-hidden="true">
										<svg width="8" height="5" viewBox="0 0 8 5" fill="none" style="opacity: {isActive && sortDir === 'asc' ? 1 : 0.25};">
											<path d="M4 0l4 5H0L4 0z" fill="currentColor"/>
										</svg>
										<svg width="8" height="5" viewBox="0 0 8 5" fill="none" style="opacity: {isActive && sortDir === 'desc' ? 1 : 0.25};">
											<path d="M4 5L0 0h8L4 5z" fill="currentColor"/>
										</svg>
									</span>
								</button>
							</th>
						{/each}
						<th class="ud-th" scope="col" style="text-align: right;">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each sortedSessions as session, i}
						{@const sm = statusMeta[session.status]}
						<tr
							class="ud-table__row"
							class:ud-table__row--last={i === sortedSessions.length - 1}
							onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--dbg2)'; }}
							onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
						>
							<td class="ud-td">
								<div class="ud-session-name">
									<div class="ud-session-icon" aria-hidden="true">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
									</div>
									<span class="ud-session-name__text">{session.name}</span>
								</div>
							</td>
							<td class="ud-td ud-td--muted">{session.lastActive}</td>
							<td class="ud-td ud-td--num">
								<span class="ud-credit-chip">
									<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
									{session.credits.toFixed(2)}
								</span>
							</td>
							<td class="ud-td ud-td--num">{session.apiCalls}</td>
							<td class="ud-td" style="text-align: right;">
								<span
									class="ud-status-badge"
									style="background: {sm.bg}; color: {sm.color};"
								>
									<span class="ud-status-dot" style="background: {sm.dot};"></span>
									{sm.label}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<!-- Table footer -->
			<div class="ud-table-footer">
				<span>{sessions.length} sessions · this month</span>
				<button class="ud-link-btn">View all sessions →</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════════
	     3. Plan Comparison Cards
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Plan Comparison Cards</h3>
		<p class="ds-card__sub">Side-by-side Free / Pro / Enterprise with feature matrix and highlighted recommended plan</p>

		<div class="ud-plans">
			{#each plans as plan}
				<div
					class="ud-plan"
					class:ud-plan--highlighted={plan.highlighted}
					aria-label="{plan.name} plan"
				>
					{#if plan.badge}
						<div class="ud-plan__badge">{plan.badge}</div>
					{/if}

					<div class="ud-plan__head">
						<div class="ud-plan__name">{plan.name}</div>
						<div class="ud-plan__price">
							{plan.price}<span class="ud-plan__period">{plan.period}</span>
						</div>
						<div class="ud-plan__desc">{plan.desc}</div>
					</div>

					<div class="ud-plan__credits">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="flex-shrink: 0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
						{plan.credits}
					</div>

					<ul class="ud-plan__features" role="list">
						{#each plan.features as feat}
							<li class="ud-plan__feat" class:ud-plan__feat--off={!feat.included}>
								{#if feat.included}
									<svg class="ud-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
								{:else}
									<svg class="ud-dash" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>
								{/if}
								<span>{feat.label}</span>
							</li>
						{/each}
					</ul>

					<button
						class="ud-plan__cta"
						class:ud-plan__cta--primary={plan.highlighted}
						class:ud-plan__cta--disabled={plan.ctaDisabled}
						disabled={plan.ctaDisabled}
						aria-label="{plan.cta} — {plan.name}"
					>
						{plan.cta}
					</button>
				</div>
			{/each}
		</div>
	</div>

</section>

<style>
	/* ── Design tokens ────────────────────────────────────────────── */
	:root {
		--ud-green: #22c55e;
		--ud-amber: #f59e0b;
		--ud-red:   #ef4444;
		--ud-blue:  #3b82f6;
	}

	/* ── Overview card ────────────────────────────────────────────── */
	.ud-overview-card {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
		max-width: 760px;
	}

	.ud-overview-card__head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 16px 20px 14px;
		border-bottom: 1px solid var(--dbd);
	}

	.ud-overview-card__title {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
	}

	.ud-overview-card__sub {
		font-size: 11px;
		color: var(--dt3);
		margin-top: 2px;
	}

	.ud-btn-upgrade {
		flex-shrink: 0;
		padding: 6px 14px;
		border-radius: 9999px;
		border: none;
		background: #2563eb;
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s, opacity 0.15s;
		white-space: nowrap;
	}
	.ud-btn-upgrade:hover { background: #1d4ed8; }

	.ud-overview-cols {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0;
	}

	.ud-overview-col {
		padding: 18px 20px;
	}

	.ud-overview-divider {
		width: 1px;
		background: var(--dbd);
		margin: 14px 0;
	}

	.ud-overview-col__head {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}

	.ud-overview-col__label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt2);
	}

	.ud-overview-col__badge {
		font-size: 10px;
		font-weight: 500;
		padding: 2px 7px;
		border-radius: 9999px;
		background: var(--dbg2);
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.ud-overview-col__badge--blue {
		background: rgba(37, 99, 235, 0.08);
		color: #60a5fa;
		border-color: rgba(37, 99, 235, 0.18);
	}

	/* ── Stat row ─────────────────────────────────────────────────── */
	.ud-stat-row {
		display: flex;
		align-items: baseline;
		gap: 4px;
		margin-bottom: 10px;
		flex-wrap: wrap;
	}

	.ud-stat-main {
		font-size: 24px;
		font-weight: 800;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.ud-stat-main--blue { color: #60a5fa; }

	.ud-stat-sep {
		font-size: 16px;
		color: var(--dt3);
		font-weight: 300;
	}

	.ud-stat-total {
		font-size: 16px;
		font-weight: 500;
		color: var(--dt2);
		font-variant-numeric: tabular-nums;
	}

	.ud-stat-unit {
		font-size: 12px;
		color: var(--dt3);
		margin-left: 2px;
		align-self: center;
	}

	/* ── Progress bar ─────────────────────────────────────────────── */
	.ud-progress-track {
		height: 6px;
		border-radius: 9999px;
		background: var(--dbg2);
		overflow: hidden;
		border: 1px solid var(--dbd);
	}

	.ud-progress-track--sm {
		height: 4px;
		border: none;
		flex: 1;
	}

	.ud-progress-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	.ud-progress-meta {
		display: flex;
		justify-content: space-between;
		margin-top: 6px;
		font-size: 11px;
		color: var(--dt3);
	}

	/* ── API breakdown ────────────────────────────────────────────── */
	.ud-api-breakdown {
		display: flex;
		flex-direction: column;
		gap: 7px;
		margin-bottom: 8px;
	}

	.ud-api-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.ud-api-row__label {
		font-size: 11px;
		color: var(--dt2);
		min-width: 64px;
		white-space: nowrap;
	}

	.ud-api-row__val {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
		min-width: 36px;
		text-align: right;
	}

	/* ── Session table ────────────────────────────────────────────── */
	.ud-table-wrap {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		background: var(--dbg);
	}

	.ud-table {
		width: 100%;
		border-collapse: collapse;
	}

	.ud-table__head-row {
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg);
	}

	.ud-th {
		padding: 10px 14px;
		text-align: left;
		font-size: 11px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt2);
		white-space: nowrap;
	}

	.ud-th--active {
		color: var(--dt);
	}

	.ud-th__btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		cursor: pointer;
		padding: 0;
	}
	.ud-th__btn:hover {
		color: var(--dt);
	}

	.ud-sort-icon {
		display: inline-flex;
		flex-direction: column;
		gap: 1px;
	}

	.ud-table__row {
		border-bottom: 1px solid var(--dbd);
		transition: background 0.1s;
	}

	.ud-table__row--last {
		border-bottom: none;
	}

	.ud-td {
		padding: 11px 14px;
		font-size: 13px;
		color: var(--dt);
	}

	.ud-td--muted {
		color: var(--dt3);
		font-size: 12px;
	}

	.ud-td--num {
		font-variant-numeric: tabular-nums;
	}

	.ud-session-name {
		display: flex;
		align-items: center;
		gap: 9px;
	}

	.ud-session-icon {
		width: 28px;
		height: 28px;
		border-radius: 7px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt3);
		flex-shrink: 0;
	}

	.ud-session-name__text {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 240px;
	}

	.ud-credit-chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 600;
		color: #f59e0b;
		font-variant-numeric: tabular-nums;
	}

	.ud-status-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 9px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 500;
		text-transform: capitalize;
	}

	.ud-status-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ud-table-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg);
		font-size: 11px;
		color: var(--dt3);
	}

	.ud-link-btn {
		background: none;
		border: none;
		font-size: 11px;
		color: var(--dt2);
		cursor: pointer;
		padding: 0;
		transition: color 0.15s;
	}
	.ud-link-btn:hover { color: var(--dt); }

	/* ── Plan cards ───────────────────────────────────────────────── */
	.ud-plans {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
		align-items: start;
	}

	@media (max-width: 720px) {
		.ud-plans {
			grid-template-columns: 1fr;
		}
		.ud-overview-cols {
			grid-template-columns: 1fr;
		}
		.ud-overview-divider {
			width: auto;
			height: 1px;
			margin: 0;
		}
	}

	.ud-plan {
		position: relative;
		border: 1px solid var(--dbd);
		border-radius: 14px;
		padding: 20px;
		background: var(--dbg);
		display: flex;
		flex-direction: column;
		gap: 0;
		transition: border-color 0.2s;
	}

	.ud-plan--highlighted {
		border-color: #2563eb;
		background: rgba(37, 99, 235, 0.03);
		box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.15), 0 4px 20px rgba(37, 99, 235, 0.06);
	}

	.ud-plan__badge {
		position: absolute;
		top: -11px;
		left: 50%;
		transform: translateX(-50%);
		background: #2563eb;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		padding: 3px 10px;
		border-radius: 9999px;
		white-space: nowrap;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.ud-plan__head {
		margin-bottom: 14px;
	}

	.ud-plan__name {
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt2);
		margin-bottom: 8px;
	}

	.ud-plan__price {
		font-size: 32px;
		font-weight: 800;
		color: var(--dt);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.ud-plan__period {
		font-size: 13px;
		font-weight: 400;
		color: var(--dt3);
	}

	.ud-plan__desc {
		font-size: 12px;
		color: var(--dt3);
		margin-top: 6px;
		line-height: 1.5;
	}

	.ud-plan__credits {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		font-weight: 600;
		color: #f59e0b;
		padding: 6px 10px;
		border-radius: 8px;
		background: rgba(245, 158, 11, 0.07);
		border: 1px solid rgba(245, 158, 11, 0.15);
		margin-bottom: 16px;
		width: fit-content;
	}

	.ud-plan__features {
		list-style: none;
		padding: 0;
		margin: 0 0 20px;
		display: flex;
		flex-direction: column;
		gap: 9px;
		flex: 1;
	}

	.ud-plan__feat {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 12px;
		color: var(--dt);
		line-height: 1.45;
	}

	.ud-plan__feat--off {
		color: var(--dt3);
	}

	.ud-check {
		color: #22c55e;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.ud-dash {
		color: var(--dt3);
		flex-shrink: 0;
		margin-top: 1px;
	}

	.ud-plan__cta {
		width: 100%;
		padding: 10px;
		border-radius: 9px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		transition: background 0.15s, border-color 0.15s, color 0.15s, opacity 0.15s;
	}
	.ud-plan__cta:hover:not(:disabled) {
		background: var(--dbg3, var(--dbg2));
		border-color: var(--dbd2, var(--dbd));
	}

	.ud-plan__cta--primary {
		background: #2563eb;
		border-color: #2563eb;
		color: #fff;
	}
	.ud-plan__cta--primary:hover:not(:disabled) {
		background: #1d4ed8;
		border-color: #1d4ed8;
	}

	.ud-plan__cta--disabled {
		opacity: 0.5;
		cursor: default;
	}

</style>
