<script lang="ts">
	// ── Demo 2: Usage Meter ──────────────────────────────────────────
	const usageTotal = 100;
	let usageUsed = $state(75);

	const usageR = 38;
	const usageCircumference = $derived(2 * Math.PI * usageR);
	const usageDashoffset = $derived(
		usageCircumference - (usageUsed / usageTotal) * usageCircumference
	);
	const usageColor = $derived(
		usageUsed / usageTotal < 0.5
			? '#22c55e'
			: usageUsed / usageTotal < 0.8
				? '#f59e0b'
				: '#ef4444'
	);

	// ── Demo 4: Token Counter ────────────────────────────────────────
	let inputTokens = $state(0);
	let outputTokens = $state(0);
	const totalTokens = $derived(inputTokens + outputTokens);
	const totalCost = $derived(((totalTokens / 1000) * 0.015).toFixed(4));

	const COST_PER_1K = 0.015;
	const INPUT_COST_PER_1K = 0.005;
	const OUTPUT_COST_PER_1K = 0.010;
	const inputCost = $derived(((inputTokens / 1000) * INPUT_COST_PER_1K).toFixed(4));
	const outputCost = $derived(((outputTokens / 1000) * OUTPUT_COST_PER_1K).toFixed(4));

	let isSimulating = $state(false);

	function simulateRequest() {
		if (isSimulating) return;
		isSimulating = true;
		const newInput = Math.floor(Math.random() * 800) + 200;
		const newOutput = Math.floor(Math.random() * 400) + 100;
		let step = 0;
		const totalSteps = 30;
		const inputPerStep = newInput / totalSteps;
		const outputPerStep = newOutput / totalSteps;
		const startInput = inputTokens;
		const startOutput = outputTokens;

		const interval = setInterval(() => {
			step++;
			inputTokens = Math.round(startInput + inputPerStep * step);
			outputTokens = Math.round(startOutput + outputPerStep * step);
			if (step >= totalSteps) {
				clearInterval(interval);
				isSimulating = false;
			}
		}, 20);
	}

	function resetTokens() {
		inputTokens = 0;
		outputTokens = 0;
	}

	// ── Demo 7: Low Balance Warning ──────────────────────────────────
	let creditBalance = $state(47.50);
	const isLowBalance = $derived(creditBalance < 100);
	const isCriticalBalance = $derived(creditBalance < 25);
	const warningColor = $derived(isCriticalBalance ? '#ef4444' : '#f59e0b');
	const warningBg = $derived(
		isCriticalBalance ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)'
	);
	const warningBorder = $derived(
		isCriticalBalance ? 'rgba(239,68,68,0.18)' : 'rgba(245,158,11,0.18)'
	);

	// ── Demo 8: Usage Dashboard (full composition) ────────────────────
	const dashUsed = 6_520;
	const dashTotal = 10_000;
	const dashPct = $derived(Math.round((dashUsed / dashTotal) * 100));
	const dashR = 32;
	const dashCirc = $derived(2 * Math.PI * dashR);
	const dashOffset = $derived(dashCirc - (dashPct / 100) * dashCirc);
	const dashColor = $derived(
		dashPct < 50 ? '#22c55e' : dashPct < 80 ? '#f59e0b' : '#ef4444'
	);

	// ── Shared helpers ───────────────────────────────────────────────
	function fmt(n: number): string {
		return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}
	function fmtInt(n: number): string {
		return n.toLocaleString('en-US');
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Balance, Credits & Usage</h2>
	<p class="ds-desc">
		Credit balance pills, usage meters, plan cards, token counters, transaction histories, and
		low-balance warnings — patterns for billing and consumption UIs.
	</p>

	<!-- ════════════════════════════════════════════════════════════════
	     1. Credit Balance Pill
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Credit Balance Pill</h3>
		<p class="ds-card__sub">Compact pill showing a sparkle icon and balance — three surface variants</p>
		<div class="bc-pill-row">

			<!-- Dark fill -->
			<div class="bc-pill bc-pill--dark" aria-label="Balance: 1,250.00 credits">
				<span class="bc-pill__icon" aria-hidden="true">✦</span>
				<span class="bc-pill__amount">1,250.00</span>
				<span class="bc-pill__label">credits</span>
			</div>

			<!-- Outline -->
			<div class="bc-pill bc-pill--outline" aria-label="Balance: 1,250.00 credits">
				<span class="bc-pill__icon" aria-hidden="true">✦</span>
				<span class="bc-pill__amount">1,250.00</span>
				<span class="bc-pill__label">credits</span>
			</div>

			<!-- Glass / frosted -->
			<div class="bc-pill bc-pill--glass" aria-label="Balance: 1,250.00 credits">
				<span class="bc-pill__icon" aria-hidden="true">✦</span>
				<span class="bc-pill__amount">1,250.00</span>
				<span class="bc-pill__label">credits</span>
			</div>

		</div>

		<!-- Size variants -->
		<div style="margin-top: 20px;">
			<p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dt4); margin-bottom: 10px;">Size variants</p>
			<div class="bc-pill-row">
				<div class="bc-pill bc-pill--dark bc-pill--sm">
					<span class="bc-pill__icon" aria-hidden="true">✦</span>
					<span class="bc-pill__amount">1,250.00</span>
				</div>
				<div class="bc-pill bc-pill--dark bc-pill--md">
					<span class="bc-pill__icon" aria-hidden="true">✦</span>
					<span class="bc-pill__amount">1,250.00</span>
					<span class="bc-pill__label">credits</span>
				</div>
				<div class="bc-pill bc-pill--dark bc-pill--lg">
					<span class="bc-pill__icon" aria-hidden="true">✦</span>
					<span class="bc-pill__amount">1,250.00</span>
					<span class="bc-pill__label">credits</span>
				</div>
			</div>
		</div>

		<!-- With trend -->
		<div style="margin-top: 20px;">
			<p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dt4); margin-bottom: 10px;">With balance delta</p>
			<div class="bc-pill-row">
				<div class="bc-pill bc-pill--outline">
					<span class="bc-pill__icon" aria-hidden="true">✦</span>
					<span class="bc-pill__amount">1,250.00</span>
					<span style="font-size: 10px; color: #22c55e; font-weight: 600; margin-left: 2px;">+250</span>
				</div>
				<div class="bc-pill bc-pill--outline">
					<span class="bc-pill__icon" aria-hidden="true">✦</span>
					<span class="bc-pill__amount">47.50</span>
					<span style="font-size: 10px; color: #ef4444; font-weight: 600; margin-left: 2px;">−12.5</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     2. Usage Meter
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Usage Meter</h3>
		<p class="ds-card__sub">Circular progress ring — color shifts green → amber → red as usage climbs</p>
		<div style="display: flex; align-items: flex-start; gap: 40px; flex-wrap: wrap;">

			<!-- Interactive ring -->
			<div style="display: flex; flex-direction: column; align-items: center; gap: 14px;">
				<div class="bc-ring-wrap" style="--ring-size: 100px;">
					<svg width="100" height="100" viewBox="0 0 100 100" style="transform: rotate(-90deg);">
						<circle cx="50" cy="50" r="{usageR}" fill="none" stroke="var(--dbg3)" stroke-width="7"/>
						<circle
							cx="50" cy="50" r="{usageR}"
							fill="none"
							stroke="{usageColor}"
							stroke-width="7"
							stroke-linecap="round"
							stroke-dasharray="{usageCircumference}"
							stroke-dashoffset="{usageDashoffset}"
							style="transition: stroke-dashoffset 0.25s ease, stroke 0.25s ease;"
						/>
					</svg>
					<div class="bc-ring-inner">
						<span style="font-size: 20px; font-weight: 800; color: var(--dt); font-variant-numeric: tabular-nums; line-height: 1;">{usageUsed}</span>
						<span style="font-size: 10px; color: var(--dt3); margin-top: 2px;">/ {usageTotal}</span>
					</div>
				</div>
				<div style="text-align: center;">
					<div style="font-size: 12px; font-weight: 600; color: var(--dt2);">Credits Used</div>
					<div style="font-size: 11px; color: var(--dt3); margin-top: 2px;">{usageUsed / usageTotal < 0.5 ? 'Healthy' : usageUsed / usageTotal < 0.8 ? 'Moderate' : 'Critical'}</div>
				</div>
				<div style="display: flex; gap: 6px; align-items: center;">
					<input
						type="range"
						min="0"
						max="100"
						bind:value={usageUsed}
						style="width: 100px; accent-color: {usageColor}; cursor: pointer;"
						aria-label="Usage percentage"
					/>
					<span style="font-size: 12px; font-weight: 700; color: var(--dt); min-width: 36px; font-variant-numeric: tabular-nums;">{usageUsed}%</span>
				</div>
			</div>

			<!-- Fixed threshold examples -->
			<div style="display: flex; gap: 20px; align-items: flex-end; flex-wrap: wrap;">
				{#each [
					{ pct: 35, used: 35, label: 'Healthy', color: '#22c55e' },
					{ pct: 68, used: 68, label: 'Moderate', color: '#f59e0b' },
					{ pct: 91, used: 91, label: 'Critical', color: '#ef4444' },
				] as ex}
					{@const r2 = 28}
					{@const circ2 = 2 * Math.PI * r2}
					{@const offset2 = circ2 - (ex.pct / 100) * circ2}
					<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
						<div class="bc-ring-wrap" style="--ring-size: 72px;">
							<svg width="72" height="72" viewBox="0 0 72 72" style="transform: rotate(-90deg);">
								<circle cx="36" cy="36" r="{r2}" fill="none" stroke="var(--dbg3)" stroke-width="5"/>
								<circle
									cx="36" cy="36" r="{r2}"
									fill="none"
									stroke="{ex.color}"
									stroke-width="5"
									stroke-linecap="round"
									stroke-dasharray="{circ2}"
									stroke-dashoffset="{offset2}"
								/>
							</svg>
							<div class="bc-ring-inner">
								<span style="font-size: 14px; font-weight: 800; color: var(--dt); line-height: 1;">{ex.pct}%</span>
							</div>
						</div>
						<span style="font-size: 11px; color: var(--dt3);">{ex.label}</span>
					</div>
				{/each}
			</div>

		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     3. Plan Card
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Plan Card</h3>
		<p class="ds-card__sub">Current plan display with pricing, features, API usage bar, and renewal info</p>
		<div style="max-width: 400px;">
			<div class="bc-plan-card">

				<!-- Header -->
				<div class="bc-plan-card__header">
					<div>
						<div class="bc-plan-card__badge">Current Plan</div>
						<div class="bc-plan-card__name">Pro</div>
					</div>
					<div class="bc-plan-card__price">
						<span class="bc-plan-card__price-amount">$29</span>
						<span class="bc-plan-card__price-period">/ mo</span>
					</div>
				</div>

				<!-- Features -->
				<ul class="bc-plan-features" aria-label="Plan features">
					{#each [
						'10,000 API calls / month',
						'5 team members',
						'Priority support',
						'Advanced analytics',
						'Custom integrations',
					] as feature}
						<li class="bc-plan-features__item">
							<svg width="14" height="14" fill="none" stroke="#22c55e" viewBox="0 0 24 24" aria-hidden="true" style="flex-shrink: 0;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
							</svg>
							<span>{feature}</span>
						</li>
					{/each}
				</ul>

				<!-- API Usage bar -->
				<div class="bc-plan-usage">
					<div class="bc-plan-usage__header">
						<span style="font-size: 12px; color: var(--dt2);">API Calls</span>
						<span style="font-size: 12px; font-weight: 600; color: var(--dt); font-variant-numeric: tabular-nums;">6,500 / 10,000</span>
					</div>
					<div class="bc-plan-usage__track" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} aria-label="API calls usage: 65%">
						<div class="bc-plan-usage__fill" style="width: 65%;"></div>
					</div>
					<div style="font-size: 11px; color: var(--dt3); margin-top: 4px;">65% used · resets in 12 days</div>
				</div>

				<!-- Footer -->
				<div class="bc-plan-card__footer">
					<span style="font-size: 12px; color: var(--dt3);">Renews Mar 28, 2026</span>
					<button
						class="bc-plan-card__upgrade"
						aria-label="Upgrade plan"
					>
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
						</svg>
						Upgrade
					</button>
				</div>

			</div>
		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     4. Token Counter
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Token Counter</h3>
		<p class="ds-card__sub">Animated token counts for input, output, and total — with live cost breakdown. Click "Simulate Request" to run.</p>
		<div style="max-width: 440px;">
			<div class="bc-token-card">

				<!-- Counts row -->
				<div class="bc-token-row">
					<div class="bc-token-cell">
						<div class="bc-token-cell__label">Input</div>
						<div class="bc-token-cell__value" aria-live="polite" aria-label="{fmtInt(inputTokens)} input tokens">{fmtInt(inputTokens)}</div>
						<div class="bc-token-cell__sub">tokens</div>
					</div>
					<div class="bc-token-divider" aria-hidden="true"></div>
					<div class="bc-token-cell">
						<div class="bc-token-cell__label">Output</div>
						<div class="bc-token-cell__value" aria-live="polite" aria-label="{fmtInt(outputTokens)} output tokens">{fmtInt(outputTokens)}</div>
						<div class="bc-token-cell__sub">tokens</div>
					</div>
					<div class="bc-token-divider" aria-hidden="true"></div>
					<div class="bc-token-cell bc-token-cell--total">
						<div class="bc-token-cell__label">Total</div>
						<div class="bc-token-cell__value bc-token-cell__value--accent" aria-live="polite" aria-label="{fmtInt(totalTokens)} total tokens">{fmtInt(totalTokens)}</div>
						<div class="bc-token-cell__sub">tokens</div>
					</div>
				</div>

				<!-- Cost breakdown -->
				<div class="bc-token-cost">
					<div class="bc-token-cost__row">
						<span style="color: var(--dt3);">Input cost</span>
						<span style="font-variant-numeric: tabular-nums;">${inputCost}</span>
					</div>
					<div class="bc-token-cost__row">
						<span style="color: var(--dt3);">Output cost</span>
						<span style="font-variant-numeric: tabular-nums;">${outputCost}</span>
					</div>
					<div class="bc-token-cost__row bc-token-cost__row--total">
						<span>Total cost</span>
						<span style="font-variant-numeric: tabular-nums; color: var(--dt);">${totalCost}</span>
					</div>
					<div class="bc-token-cost__note">Rates: $0.005 / 1K input · $0.010 / 1K output</div>
				</div>

				<!-- Controls -->
				<div style="display: flex; gap: 8px; margin-top: 16px;">
					<button
						class="bc-btn-primary"
						onclick={simulateRequest}
						disabled={isSimulating}
						aria-label="Simulate a token request"
					>
						{#if isSimulating}
							<span class="bc-spinner" aria-hidden="true"></span>
							Simulating…
						{:else}
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
							</svg>
							Simulate Request
						{/if}
					</button>
					<button
						class="bc-btn-ghost"
						onclick={resetTokens}
						aria-label="Reset token counts"
					>
						Reset
					</button>
				</div>

			</div>
		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     5. Usage History Table
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Usage History Table</h3>
		<p class="ds-card__sub">Date-sorted usage log with type badges, token counts, and cost — compact table layout</p>
		<div style="border: 1px solid var(--dbd); border-radius: 12px; overflow: hidden; max-width: 600px;">
			<table class="bc-table">
				<thead>
					<tr class="bc-table__head-row">
						<th class="bc-table__th">Date</th>
						<th class="bc-table__th">Type</th>
						<th class="bc-table__th bc-table__th--right">Tokens Used</th>
						<th class="bc-table__th bc-table__th--right">Cost</th>
					</tr>
				</thead>
				<tbody>
					{#each [
						{ date: 'Mar 06, 2026', type: 'Generation', typeColor: '#8b5cf6', tokens: 3_420, cost: 0.0273 },
						{ date: 'Mar 05, 2026', type: 'API',        typeColor: '#3b82f6', tokens: 1_880, cost: 0.0141 },
						{ date: 'Mar 05, 2026', type: 'Chat',       typeColor: '#22c55e', tokens: 642,   cost: 0.0051 },
						{ date: 'Mar 04, 2026', type: 'API',        typeColor: '#3b82f6', tokens: 5_100, cost: 0.0408 },
						{ date: 'Mar 03, 2026', type: 'Generation', typeColor: '#8b5cf6', tokens: 2_250, cost: 0.0180 },
					] as row, i}
						<tr class="bc-table__row" class:bc-table__row--alt={i % 2 === 1}>
							<td class="bc-table__td" style="color: var(--dt2); font-variant-numeric: tabular-nums;">{row.date}</td>
							<td class="bc-table__td">
								<span class="bc-type-badge" style="color: {row.typeColor}; background: {row.typeColor}18; border-color: {row.typeColor}30;">
									{row.type}
								</span>
							</td>
							<td class="bc-table__td bc-table__td--right" style="font-variant-numeric: tabular-nums;">{fmtInt(row.tokens)}</td>
							<td class="bc-table__td bc-table__td--right" style="font-variant-numeric: tabular-nums; color: var(--dt2);">${row.cost.toFixed(4)}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr style="border-top: 1px solid var(--dbd); background: var(--dbg);">
						<td class="bc-table__td" colspan="2" style="font-size: 11px; color: var(--dt3);">5 records · sorted by date desc</td>
						<td class="bc-table__td bc-table__td--right" style="font-size: 12px; font-weight: 700; color: var(--dt); font-variant-numeric: tabular-nums;">{fmtInt(3_420 + 1_880 + 642 + 5_100 + 2_250)}</td>
						<td class="bc-table__td bc-table__td--right" style="font-size: 12px; font-weight: 700; color: var(--dt); font-variant-numeric: tabular-nums;">$0.1053</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     6. Credit Transaction List
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Credit Transaction List</h3>
		<p class="ds-card__sub">Timeline of credit events — purchases, usage debits, and bonuses with running balance</p>
		<div style="max-width: 440px;">
			<div class="bc-txn-list">
				{#each [
					{
						icon: '✦',
						iconBg: 'rgba(139,92,246,0.12)',
						iconColor: '#8b5cf6',
						label: 'Credits purchased',
						sub: 'Stripe · Visa ···4242',
						amount: '+500',
						amountColor: '#22c55e',
						balance: '1,500.00',
						time: 'Mar 6, 2026 · 14:32',
					},
					{
						icon: '↓',
						iconBg: 'rgba(239,68,68,0.10)',
						iconColor: '#ef4444',
						label: 'API usage debit',
						sub: 'Generation · 3,420 tokens',
						amount: '−12.50',
						amountColor: '#ef4444',
						balance: '1,000.00',
						time: 'Mar 6, 2026 · 11:14',
					},
					{
						icon: '★',
						iconBg: 'rgba(34,197,94,0.10)',
						iconColor: '#22c55e',
						label: 'Referral bonus',
						sub: 'Referred: @miosa_user',
						amount: '+250',
						amountColor: '#22c55e',
						balance: '1,012.50',
						time: 'Mar 5, 2026 · 09:07',
					},
					{
						icon: '↓',
						iconBg: 'rgba(239,68,68,0.10)',
						iconColor: '#ef4444',
						label: 'Chat usage debit',
						sub: 'Chat session · 642 tokens',
						amount: '−5.00',
						amountColor: '#ef4444',
						balance: '762.50',
						time: 'Mar 5, 2026 · 08:55',
					},
					{
						icon: '✦',
						iconBg: 'rgba(139,92,246,0.12)',
						iconColor: '#8b5cf6',
						label: 'Credits purchased',
						sub: 'Stripe · Visa ···4242',
						amount: '+250',
						amountColor: '#22c55e',
						balance: '767.50',
						time: 'Mar 3, 2026 · 16:20',
					},
				] as txn, i}
					<div class="bc-txn-item" class:bc-txn-item--last={i === 4}>
						<!-- Timeline line -->
						<div class="bc-txn-line" aria-hidden="true">
							<div class="bc-txn-dot" style="background: {txn.iconBg}; border-color: {txn.iconColor}30;">
								<span style="font-size: 10px; color: {txn.iconColor}; line-height: 1;">{txn.icon}</span>
							</div>
							{#if i < 4}
								<div class="bc-txn-connector"></div>
							{/if}
						</div>
						<!-- Content -->
						<div class="bc-txn-content">
							<div class="bc-txn-content__top">
								<div>
									<div style="font-size: 13px; font-weight: 600; color: var(--dt);">{txn.label}</div>
									<div style="font-size: 11px; color: var(--dt3); margin-top: 1px;">{txn.sub}</div>
								</div>
								<div style="text-align: right;">
									<div style="font-size: 13px; font-weight: 700; color: {txn.amountColor}; font-variant-numeric: tabular-nums;">{txn.amount}</div>
									<div style="font-size: 11px; color: var(--dt4); font-variant-numeric: tabular-nums; margin-top: 1px;">bal: {txn.balance}</div>
								</div>
							</div>
							<div style="font-size: 11px; color: var(--dt4); margin-top: 5px;">{txn.time}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     7. Low Balance Warning
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Low Balance Warning</h3>
		<p class="ds-card__sub">Amber/red alert card when credit balance falls below threshold. Drag the slider to see state transitions.</p>
		<div style="max-width: 420px; display: flex; flex-direction: column; gap: 20px;">

			<!-- Slider control -->
			<div style="display: flex; align-items: center; gap: 12px;">
				<label for="balance-slider" style="font-size: 12px; color: var(--dt3); white-space: nowrap;">Balance: ✦ {fmt(creditBalance)}</label>
				<input
					id="balance-slider"
					type="range"
					min="0"
					max="500"
					step="0.5"
					bind:value={creditBalance}
					style="flex: 1; accent-color: {warningColor}; cursor: pointer;"
					aria-label="Credit balance amount"
				/>
			</div>

			<!-- Warning card (only shows when low) -->
			{#if isLowBalance}
				<div
					class="bc-warning-card"
					style="background: {warningBg}; border-color: {warningBorder}; border-left-color: {warningColor};"
					role="alert"
				>
					<div class="bc-warning-card__icon" style="background: {warningBg}; border-color: {warningBorder};">
						<svg width="18" height="18" fill="none" stroke="{warningColor}" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
						</svg>
					</div>
					<div class="bc-warning-card__body">
						<div style="font-size: 13px; font-weight: 700; color: var(--dt); margin-bottom: 3px;">
							{isCriticalBalance ? 'Critical: Very Low Balance' : 'Low Balance Warning'}
						</div>
						<div style="font-size: 13px; color: var(--dt2); line-height: 1.5; margin-bottom: 12px;">
							{#if isCriticalBalance}
								Your balance of <strong style="color: {warningColor}; font-variant-numeric: tabular-nums;">✦ {fmt(creditBalance)}</strong> is critically low. Add credits now to avoid service interruption.
							{:else}
								Your balance of <strong style="color: {warningColor}; font-variant-numeric: tabular-nums;">✦ {fmt(creditBalance)}</strong> is running low. Add credits to keep things running smoothly.
							{/if}
						</div>
						<button
							class="bc-btn-warning"
							style="border-color: {warningColor}40; color: {warningColor}; background: {warningBg};"
							aria-label="Add credits to your account"
						>
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
							</svg>
							Add Credits
						</button>
					</div>
				</div>
			{:else}
				<div style="padding: 14px 16px; border-radius: 10px; border: 1px dashed var(--dbd2); text-align: center; font-size: 12px; color: var(--dt4);">
					Balance is healthy — no warning shown above $100
				</div>
			{/if}

			<!-- Static examples: both states side by side -->
			<div style="margin-top: 4px;">
				<p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dt4); margin-bottom: 10px;">Static examples</p>
				<div style="display: flex; flex-direction: column; gap: 10px;">

					<!-- Amber -->
					<div
						class="bc-warning-card"
						style="background: rgba(245,158,11,0.06); border-color: rgba(245,158,11,0.18); border-left-color: #f59e0b;"
						role="status"
					>
						<div class="bc-warning-card__icon" style="background: rgba(245,158,11,0.10); border-color: rgba(245,158,11,0.20);">
							<svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
							</svg>
						</div>
						<div class="bc-warning-card__body">
							<div style="font-size: 13px; font-weight: 700; color: var(--dt); margin-bottom: 3px;">Low Balance Warning</div>
							<div style="font-size: 12px; color: var(--dt2); line-height: 1.5; margin-bottom: 10px;">✦ 47.50 remaining · consider topping up</div>
							<button class="bc-btn-warning" style="border-color: rgba(245,158,11,0.40); color: #f59e0b; background: rgba(245,158,11,0.06);" aria-label="Add credits">Add Credits</button>
						</div>
					</div>

					<!-- Red -->
					<div
						class="bc-warning-card"
						style="background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.18); border-left-color: #ef4444;"
						role="alert"
					>
						<div class="bc-warning-card__icon" style="background: rgba(239,68,68,0.10); border-color: rgba(239,68,68,0.20);">
							<svg width="18" height="18" fill="none" stroke="#ef4444" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
							</svg>
						</div>
						<div class="bc-warning-card__body">
							<div style="font-size: 13px; font-weight: 700; color: var(--dt); margin-bottom: 3px;">Critical: Very Low Balance</div>
							<div style="font-size: 12px; color: var(--dt2); line-height: 1.5; margin-bottom: 10px;">✦ 8.00 remaining · service may be interrupted</div>
							<button class="bc-btn-warning" style="border-color: rgba(239,68,68,0.40); color: #ef4444; background: rgba(239,68,68,0.06);" aria-label="Add credits now">Add Credits Now</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- ════════════════════════════════════════════════════════════════
	     8. In Context: Usage Dashboard
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Usage Dashboard</h3>
		<p class="ds-card__sub">Full composition — balance pill, circular usage meter, plan summary, mini transaction history, and an upgrade CTA</p>

		<div class="bc-dashboard">

			<!-- Top bar: balance + pill -->
			<div class="bc-dashboard__topbar">
				<div>
					<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--dt4); margin-bottom: 4px;">Available Balance</div>
					<div class="bc-pill bc-pill--dark bc-pill--lg">
						<span class="bc-pill__icon" aria-hidden="true">✦</span>
						<span class="bc-pill__amount">1,250.00</span>
						<span class="bc-pill__label">credits</span>
					</div>
				</div>
				<button class="bc-btn-primary" aria-label="Add credits to your account">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
					</svg>
					Add Credits
				</button>
			</div>

			<!-- Middle: usage meter + plan summary -->
			<div class="bc-dashboard__mid">

				<!-- Circular usage meter -->
				<div class="bc-dashboard__meter">
					<div class="bc-ring-wrap" style="--ring-size: 88px;">
						<svg width="88" height="88" viewBox="0 0 88 88" style="transform: rotate(-90deg);">
							<circle cx="44" cy="44" r="{dashR}" fill="none" stroke="var(--dbg3)" stroke-width="6"/>
							<circle
								cx="44" cy="44" r="{dashR}"
								fill="none"
								stroke="{dashColor}"
								stroke-width="6"
								stroke-linecap="round"
								stroke-dasharray="{dashCirc}"
								stroke-dashoffset="{dashOffset}"
								style="transition: stroke-dashoffset 0.3s ease;"
							/>
						</svg>
						<div class="bc-ring-inner">
							<span style="font-size: 16px; font-weight: 800; color: var(--dt); line-height: 1;">{dashPct}%</span>
							<span style="font-size: 9px; color: var(--dt4); margin-top: 2px;">used</span>
						</div>
					</div>
					<div style="margin-top: 10px; text-align: center;">
						<div style="font-size: 12px; font-weight: 600; color: var(--dt2);">{fmtInt(dashUsed)} / {fmtInt(dashTotal)}</div>
						<div style="font-size: 10px; color: var(--dt4); margin-top: 2px;">API calls this cycle</div>
					</div>
				</div>

				<!-- Plan summary -->
				<div class="bc-dashboard__plan">
					<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
						<div>
							<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dt4);">Current Plan</div>
							<div style="font-size: 18px; font-weight: 800; color: var(--dt); letter-spacing: -0.02em; line-height: 1.2; margin-top: 2px;">Pro</div>
						</div>
						<div style="text-align: right;">
							<div style="font-size: 22px; font-weight: 800; color: var(--dt); letter-spacing: -0.03em;">$29</div>
							<div style="font-size: 11px; color: var(--dt4);">per month</div>
						</div>
					</div>

					<!-- Mini usage bar -->
					<div style="margin-bottom: 12px;">
						<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
							<span style="font-size: 11px; color: var(--dt3);">API Calls</span>
							<span style="font-size: 11px; color: var(--dt2); font-variant-numeric: tabular-nums;">{fmtInt(dashUsed)} / {fmtInt(dashTotal)}</span>
						</div>
						<div style="height: 4px; border-radius: 2px; background: var(--dbg3); overflow: hidden;" role="progressbar" aria-valuenow={dashPct} aria-valuemin={0} aria-valuemax={100} aria-label="API usage">
							<div style="height: 100%; width: {dashPct}%; border-radius: 2px; background: {dashColor}; transition: width 0.3s;"></div>
						</div>
					</div>

					<div style="font-size: 11px; color: var(--dt4); margin-bottom: 14px;">Renews Mar 28, 2026</div>

					<button class="bc-dashboard__upgrade" aria-label="Upgrade to a higher plan">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
						</svg>
						Upgrade Plan
					</button>
				</div>

			</div>

			<!-- Mini transaction history -->
			<div class="bc-dashboard__history">
				<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dt4); margin-bottom: 10px;">Recent Transactions</div>
				{#each [
					{ icon: '✦', iconColor: '#8b5cf6', label: 'Credits purchased', amount: '+500', amountColor: '#22c55e', time: 'Mar 6' },
					{ icon: '↓', iconColor: '#ef4444', label: 'API usage debit',   amount: '−12.50', amountColor: '#ef4444', time: 'Mar 6' },
					{ icon: '★', iconColor: '#22c55e', label: 'Referral bonus',    amount: '+250', amountColor: '#22c55e', time: 'Mar 5' },
				] as txn}
					<div class="bc-dashboard__txn-row">
						<div class="bc-dashboard__txn-icon" style="color: {txn.iconColor}; background: {txn.iconColor}15;">{txn.icon}</div>
						<div style="flex: 1; min-width: 0;">
							<div style="font-size: 12px; color: var(--dt2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{txn.label}</div>
						</div>
						<div style="text-align: right; flex-shrink: 0;">
							<div style="font-size: 12px; font-weight: 700; color: {txn.amountColor}; font-variant-numeric: tabular-nums;">{txn.amount}</div>
							<div style="font-size: 10px; color: var(--dt4);">{txn.time}</div>
						</div>
					</div>
				{/each}
				<div style="text-align: center; margin-top: 8px;">
					<button class="bc-btn-ghost" style="font-size: 11px; padding: 5px 12px;" aria-label="View all transactions">View all</button>
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	/* ── Credit Balance Pill ──────────────────────────────────────── */
	.bc-pill-row {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.bc-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		border-radius: 9999px;
		font-weight: 600;
		white-space: nowrap;
		user-select: none;
	}

	/* Sizes */
	.bc-pill--sm {
		padding: 3px 10px;
		font-size: 11px;
	}
	.bc-pill--md,
	.bc-pill:not(.bc-pill--sm):not(.bc-pill--lg) {
		padding: 5px 13px;
		font-size: 13px;
	}
	.bc-pill--lg {
		padding: 7px 16px;
		font-size: 15px;
	}

	/* Variants */
	.bc-pill--dark {
		background: var(--dt);
		color: #fff;
		border: 1px solid transparent;
	}
	.bc-pill--outline {
		background: transparent;
		color: var(--dt);
		border: 1px solid var(--dbd2);
	}
	.bc-pill--glass {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: var(--dt);
		border: 1px solid var(--dbd);
	}

	.bc-pill__icon {
		font-size: 0.85em;
		opacity: 0.75;
	}
	.bc-pill__amount {
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.01em;
	}
	.bc-pill__label {
		font-size: 0.75em;
		opacity: 0.65;
		font-weight: 500;
	}

	/* ── Usage Ring ──────────────────────────────────────────────── */
	.bc-ring-wrap {
		position: relative;
		width: var(--ring-size);
		height: var(--ring-size);
		flex-shrink: 0;
	}
	.bc-ring-inner {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* ── Plan Card ───────────────────────────────────────────────── */
	.bc-plan-card {
		border: 1px solid var(--dbd);
		border-radius: 14px;
		background: var(--dbg);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.bc-plan-card__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.bc-plan-card__badge {
		display: inline-block;
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		padding: 2px 8px;
		margin-bottom: 6px;
	}
	.bc-plan-card__name {
		font-size: 24px;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--dt);
		line-height: 1;
	}
	.bc-plan-card__price {
		text-align: right;
	}
	.bc-plan-card__price-amount {
		font-size: 26px;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--dt);
	}
	.bc-plan-card__price-period {
		font-size: 13px;
		color: var(--dt3);
		margin-left: 2px;
	}

	.bc-plan-features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.bc-plan-features__item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: var(--dt2);
	}

	.bc-plan-usage {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 12px 14px;
	}
	.bc-plan-usage__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	.bc-plan-usage__track {
		height: 5px;
		border-radius: 3px;
		background: var(--dbg3);
		overflow: hidden;
	}
	.bc-plan-usage__fill {
		height: 100%;
		border-radius: 3px;
		background: linear-gradient(90deg, var(--dt4), var(--dt));
		transition: width 0.3s;
	}

	.bc-plan-card__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 12px;
		border-top: 1px solid var(--dbd);
	}
	.bc-plan-card__upgrade {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 14px;
		border-radius: 8px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.bc-plan-card__upgrade:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* ── Token Counter ───────────────────────────────────────────── */
	.bc-token-card {
		border: 1px solid var(--dbd);
		border-radius: 14px;
		background: var(--dbg);
		padding: 20px;
	}
	.bc-token-row {
		display: flex;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 16px;
	}
	.bc-token-cell {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 14px 12px;
		text-align: center;
	}
	.bc-token-cell--total {
		background: var(--dbg2);
	}
	.bc-token-divider {
		width: 1px;
		background: var(--dbd);
		flex-shrink: 0;
	}
	.bc-token-cell__label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt4);
		font-weight: 600;
		margin-bottom: 6px;
	}
	.bc-token-cell__value {
		font-size: 20px;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--dt2);
		font-variant-numeric: tabular-nums;
		line-height: 1;
		transition: color 0.2s;
	}
	.bc-token-cell__value--accent {
		color: var(--dt);
	}
	.bc-token-cell__sub {
		font-size: 10px;
		color: var(--dt4);
		margin-top: 4px;
	}

	.bc-token-cost {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 10px 14px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.bc-token-cost__row {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: var(--dt2);
		font-variant-numeric: tabular-nums;
	}
	.bc-token-cost__row--total {
		font-weight: 700;
		border-top: 1px solid var(--dbd);
		padding-top: 5px;
		margin-top: 3px;
	}
	.bc-token-cost__note {
		font-size: 10px;
		color: var(--dt4);
		margin-top: 4px;
	}

	/* ── Shared Buttons ─────────────────────────────────────────── */
	.bc-btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 8px;
		border: none;
		background: var(--dt);
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.15s;
		white-space: nowrap;
	}
	.bc-btn-primary:hover {
		opacity: 0.85;
	}
	.bc-btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.bc-btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: transparent;
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.bc-btn-ghost:hover {
		background: var(--dbg2);
		color: var(--dt2);
	}
	.bc-btn-warning {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 8px;
		border: 1px solid;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.15s;
	}
	.bc-btn-warning:hover {
		opacity: 0.80;
	}

	/* ── Spinner ────────────────────────────────────────────────── */
	.bc-spinner {
		display: inline-block;
		width: 11px;
		height: 11px;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 50%;
		animation: bc-spin 0.6s linear infinite;
		flex-shrink: 0;
	}
	@keyframes bc-spin {
		to { transform: rotate(360deg); }
	}

	/* ── Usage History Table ─────────────────────────────────────── */
	.bc-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}
	.bc-table__head-row {
		background: var(--dbg);
		border-bottom: 1px solid var(--dbd);
	}
	.bc-table__th {
		text-align: left;
		padding: 9px 14px;
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt4);
	}
	.bc-table__th--right {
		text-align: right;
	}
	.bc-table__row {
		border-bottom: 1px solid var(--dbg);
		transition: background 0.1s;
	}
	.bc-table__row:hover {
		background: var(--dbg2);
	}
	.bc-table__row--alt {
		background: var(--dbg);
	}
	.bc-table__row--alt:hover {
		background: var(--dbg2);
	}
	.bc-table__td {
		padding: 10px 14px;
		color: var(--dt);
	}
	.bc-table__td--right {
		text-align: right;
	}

	.bc-type-badge {
		display: inline-block;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		border: 1px solid;
	}

	/* ── Transaction List ───────────────────────────────────────── */
	.bc-txn-list {
		display: flex;
		flex-direction: column;
	}
	.bc-txn-item {
		display: flex;
		gap: 12px;
	}
	.bc-txn-line {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 28px;
	}
	.bc-txn-dot {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.bc-txn-connector {
		width: 1px;
		flex: 1;
		min-height: 12px;
		background: var(--dbd);
		margin: 4px 0;
	}
	.bc-txn-content {
		flex: 1;
		min-width: 0;
		padding-bottom: 16px;
	}
	.bc-txn-item--last .bc-txn-content {
		padding-bottom: 0;
	}
	.bc-txn-content__top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
	}

	/* ── Low Balance Warning Card ───────────────────────────────── */
	.bc-warning-card {
		display: flex;
		gap: 14px;
		padding: 16px;
		border-radius: 12px;
		border: 1px solid;
		border-left-width: 3px;
		align-items: flex-start;
	}
	.bc-warning-card__icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.bc-warning-card__body {
		flex: 1;
		min-width: 0;
	}

	/* ── Usage Dashboard ────────────────────────────────────────── */
	.bc-dashboard {
		border: 1px solid var(--dbd);
		border-radius: 16px;
		background: var(--dbg);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 560px;
	}
	.bc-dashboard__topbar {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding-bottom: 18px;
		border-bottom: 1px solid var(--dbd);
	}
	.bc-dashboard__mid {
		display: flex;
		gap: 20px;
		align-items: flex-start;
	}
	.bc-dashboard__meter {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}
	.bc-dashboard__plan {
		flex: 1;
		min-width: 0;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
	}
	.bc-dashboard__upgrade {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		justify-content: center;
		padding: 8px 14px;
		border-radius: 8px;
		border: 1px solid var(--dbd2);
		background: var(--dt);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		cursor: pointer;
		transition: opacity 0.15s;
	}
	.bc-dashboard__upgrade:hover {
		opacity: 0.85;
	}
	.bc-dashboard__history {
		border-top: 1px solid var(--dbd);
		padding-top: 16px;
		display: flex;
		flex-direction: column;
	}
	.bc-dashboard__txn-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 0;
		border-bottom: 1px solid var(--dbg2);
	}
	.bc-dashboard__txn-row:last-of-type {
		border-bottom: none;
	}
	.bc-dashboard__txn-icon {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		flex-shrink: 0;
	}

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .bc-pill--dark {
		background: #e5e5e5;
		color: #111;
	}
	:global(.dark) .bc-btn-primary {
		background: #e5e5e5;
		color: #111;
	}
	:global(.dark) .bc-dashboard__upgrade {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}
</style>
