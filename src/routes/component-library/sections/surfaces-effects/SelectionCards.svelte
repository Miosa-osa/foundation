<script lang="ts">
	// ── 1. Radio Option Cards ────────────────────────────────────────────
	type RadioOption = { id: string; label: string };
	const radioOptions: RadioOption[] = [
		{ id: 'basic', label: 'Basic' },
		{ id: 'standard', label: 'Standard' },
		{ id: 'professional', label: 'Professional' },
		{ id: 'enterprise', label: 'Enterprise' },
	];
	let radioSelected = $state('standard');

	// ── 2. Radio Cards with Description ──────────────────────────────────
	type RadioDescOption = { id: string; label: string; desc: string; recommended?: boolean };
	const radioDescOptions: RadioDescOption[] = [
		{ id: 'solo', label: 'Solo', desc: 'For individual creators and freelancers.' },
		{ id: 'team', label: 'Team', desc: 'Up to 10 members. Shared workspaces and admin panel.', recommended: true },
		{ id: 'business', label: 'Business', desc: 'Unlimited members, SSO, and priority support.' },
		{ id: 'custom', label: 'Custom', desc: 'Tailored contracts, SLAs, and dedicated account manager.' },
	];
	let radioDescSelected = $state('team');

	// ── 3. Radio Cards with Icons ─────────────────────────────────────────
	type AspectOption = { id: string; label: string; sub: string; w: number; h: number };
	const aspectOptions: AspectOption[] = [
		{ id: 'landscape', label: '16:9 Landscape', sub: 'YouTube, presentations', w: 16, h: 9 },
		{ id: 'portrait', label: '9:16 Portrait', sub: 'Reels, TikTok, Stories', w: 9, h: 16 },
		{ id: 'square', label: '1:1 Square', sub: 'Instagram, profile images', w: 1, h: 1 },
		{ id: 'standard', label: '4:3 Standard', sub: 'Classic displays, slides', w: 4, h: 3 },
	];
	let aspectSelected = $state('landscape');

	// ── 4. Checkbox Selection Cards ───────────────────────────────────────
	type CategoryOption = { id: string; label: string; count: number };
	const categoryOptions: CategoryOption[] = [
		{ id: 'design', label: 'Design', count: 142 },
		{ id: 'development', label: 'Development', count: 389 },
		{ id: 'marketing', label: 'Marketing', count: 97 },
		{ id: 'analytics', label: 'Analytics', count: 211 },
		{ id: 'sales', label: 'Sales', count: 63 },
	];
	let categorySelected = $state(new Set<string>(['design', 'development']));
	function toggleCategory(id: string) {
		const next = new Set(categorySelected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		categorySelected = next;
	}

	// ── 5. Pricing Tier Cards ─────────────────────────────────────────────
	type PricingTier = { id: string; name: string; price: string; desc: string; features: string[]; popular?: boolean };
	const pricingTiers: PricingTier[] = [
		{
			id: 'free',
			name: 'Free',
			price: '$0',
			desc: 'Get started for free, no credit card required.',
			features: ['3 projects', '5 GB storage', 'Community support', 'Basic analytics'],
		},
		{
			id: 'pro',
			name: 'Pro',
			price: '$29',
			desc: 'Everything you need to grow your business.',
			features: ['Unlimited projects', '100 GB storage', 'Priority support', 'Advanced analytics', 'Custom domains', 'Team collaboration'],
			popular: true,
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			price: 'Custom',
			desc: 'Tailored for large teams and compliance needs.',
			features: ['Unlimited everything', 'Dedicated storage', 'SLA & uptime guarantee', 'SSO & SAML', 'Audit logs', 'Dedicated support'],
		},
	];
	let pricingSelected = $state('pro');

	// ── 6. Selection Card with Content ───────────────────────────────────
	type TemplateOption = { id: string; label: string; stat1: string; stat2: string; gradient: string };
	const templateOptions: TemplateOption[] = [
		{ id: 'aurora', label: 'Aurora', stat1: '12 components', stat2: '4 layouts', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' },
		{ id: 'ember', label: 'Ember', stat1: '9 components', stat2: '3 layouts', gradient: 'linear-gradient(135deg, #2d1b0e 0%, #3d2010 60%, #5c2d0a 100%)' },
		{ id: 'slate', label: 'Slate', stat1: '15 components', stat2: '6 layouts', gradient: 'linear-gradient(135deg, #0f1117 0%, #1a1d27 60%, #1e2130 100%)' },
	];
	let templateSelected = $state('aurora');

	// ── 7. In Context: Plan Selection ────────────────────────────────────
	type BillingCycle = 'monthly' | 'yearly';
	type PlanTier = { id: string; name: string; monthly: number; yearly: number; features: string[]; highlight?: boolean };
	const planTiers: PlanTier[] = [
		{
			id: 'starter',
			name: 'Starter',
			monthly: 0,
			yearly: 0,
			features: ['1 workspace', '3 projects', 'Community support', '5 GB storage'],
		},
		{
			id: 'growth',
			name: 'Growth',
			monthly: 29,
			yearly: 19,
			features: ['5 workspaces', 'Unlimited projects', 'Email support', '100 GB storage', 'Custom domains', 'Analytics dashboard'],
			highlight: true,
		},
		{
			id: 'scale',
			name: 'Scale',
			monthly: 79,
			yearly: 59,
			features: ['Unlimited workspaces', 'Unlimited projects', 'Priority support', '1 TB storage', 'SSO & SAML', 'Audit logs', 'API access'],
		},
	];
	let planBilling = $state<BillingCycle>('yearly');
	let planSelected = $state('growth');
	let planConfirmed = $state(false);

	const planSavings = $derived(
		planBilling === 'yearly'
			? planTiers.find((t) => t.id === planSelected)
				? `Save ${Math.round((1 - (planTiers.find((t) => t.id === planSelected)!.yearly / planTiers.find((t) => t.id === planSelected)!.monthly || 1)) * 100)}% vs monthly`
				: ''
			: ''
	);
</script>

<section class="ds-section">
	<h2 class="ds-title">Selection Cards</h2>
	<p class="ds-desc">Rich selection patterns using full-width interactive cards instead of plain radio or checkbox inputs. Provides visual weight, context, and hierarchy to choices.</p>

	<!-- ═══ 1. RADIO OPTION CARDS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Radio Option Cards</h3>
		<p class="ds-card__sub">Full-width cards with a radio indicator on the left. Clean single-select. Selected card gets an active border and filled radio dot.</p>

		<div class="sc-radio-list">
			{#each radioOptions as opt}
				<button
					class="sc-radio-card"
					class:sc-radio-card--selected={radioSelected === opt.id}
					onclick={() => radioSelected = opt.id}
					role="radio"
					aria-checked={radioSelected === opt.id}
				>
					<span class="sc-radio-dot" class:sc-radio-dot--selected={radioSelected === opt.id}></span>
					<span class="sc-radio-label">{opt.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 2. RADIO CARDS WITH DESCRIPTION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Radio Cards with Description</h3>
		<p class="ds-card__sub">Each card has a title and supporting description. One option can carry a "Recommended" badge to guide decision-making.</p>

		<div class="sc-radio-list">
			{#each radioDescOptions as opt}
				<button
					class="sc-radio-card sc-radio-card--desc"
					class:sc-radio-card--selected={radioDescSelected === opt.id}
					onclick={() => radioDescSelected = opt.id}
					role="radio"
					aria-checked={radioDescSelected === opt.id}
				>
					<span class="sc-radio-dot" class:sc-radio-dot--selected={radioDescSelected === opt.id}></span>
					<span class="sc-radio-body">
						<span class="sc-radio-title-row">
							<span class="sc-radio-label">{opt.label}</span>
							{#if opt.recommended}
								<span class="sc-badge-recommended">Recommended</span>
							{/if}
						</span>
						<span class="sc-radio-desc">{opt.desc}</span>
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 3. RADIO CARDS WITH ICONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Radio Cards with Icons</h3>
		<p class="ds-card__sub">Visual ratio preview beside title and description. Good for media format selection, layout choice, or anything spatial.</p>

		<div class="sc-radio-list">
			{#each aspectOptions as opt}
				{@const scale = 28}
				{@const maxDim = Math.max(opt.w, opt.h)}
				{@const iw = Math.round((opt.w / maxDim) * scale)}
				{@const ih = Math.round((opt.h / maxDim) * scale)}
				<button
					class="sc-radio-card sc-radio-card--icon"
					class:sc-radio-card--selected={aspectSelected === opt.id}
					onclick={() => aspectSelected = opt.id}
					role="radio"
					aria-checked={aspectSelected === opt.id}
				>
					<span class="sc-aspect-icon" aria-hidden="true">
						<span class="sc-aspect-rect" style="width:{iw}px; height:{ih}px;"></span>
					</span>
					<span class="sc-radio-body">
						<span class="sc-radio-label">{opt.label}</span>
						<span class="sc-radio-desc">{opt.sub}</span>
					</span>
					<span class="sc-radio-dot sc-radio-dot--right" class:sc-radio-dot--selected={aspectSelected === opt.id}></span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. CHECKBOX SELECTION CARDS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Checkbox Selection Cards</h3>
		<p class="ds-card__sub">Multi-select variant. Toggle cards on and off. Selected cards show a checkmark in the top-right corner and an active border.</p>

		<div class="sc-radio-list">
			{#each categoryOptions as opt}
				<button
					class="sc-check-card"
					class:sc-check-card--selected={categorySelected.has(opt.id)}
					onclick={() => toggleCategory(opt.id)}
					role="checkbox"
					aria-checked={categorySelected.has(opt.id)}
				>
					<span class="sc-check-body">
						<span class="sc-radio-label">{opt.label}</span>
						<span class="sc-radio-desc">{opt.count} items</span>
					</span>
					<span class="sc-check-mark" class:sc-check-mark--visible={categorySelected.has(opt.id)} aria-hidden="true">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
							<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 5. PRICING TIER CARDS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pricing Tier Cards</h3>
		<p class="ds-card__sub">Three cards side by side. The "Popular" tier has a badge. The selected card is elevated with a stronger border and soft shadow.</p>

		<div class="sc-pricing-grid">
			{#each pricingTiers as tier}
				<button
					class="sc-pricing-card"
					class:sc-pricing-card--selected={pricingSelected === tier.id}
					class:sc-pricing-card--popular={tier.popular}
					onclick={() => pricingSelected = tier.id}
					aria-pressed={pricingSelected === tier.id}
				>
					{#if tier.popular}
						<span class="sc-badge-popular">Popular</span>
					{/if}
					<span class="sc-pricing-name">{tier.name}</span>
					<span class="sc-pricing-price">{tier.price}<small>{tier.price !== 'Custom' ? '/mo' : ''}</small></span>
					<span class="sc-pricing-desc">{tier.desc}</span>
					<ul class="sc-pricing-features">
						{#each tier.features as f}
							<li>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
									<path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								{f}
							</li>
						{/each}
					</ul>
					<span class="sc-pricing-select-indicator" class:sc-pricing-select-indicator--on={pricingSelected === tier.id}>
						{pricingSelected === tier.id ? 'Selected' : 'Select'}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 6. SELECTION CARD WITH CONTENT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Selection Card with Content</h3>
		<p class="ds-card__sub">Rich cards with a preview area, label, and stat row. Useful for template, theme, or layout pickers.</p>

		<div class="sc-template-grid">
			{#each templateOptions as tpl}
				<button
					class="sc-template-card"
					class:sc-template-card--selected={templateSelected === tpl.id}
					onclick={() => templateSelected = tpl.id}
					aria-pressed={templateSelected === tpl.id}
				>
					<span class="sc-template-preview" style="background: {tpl.gradient};" aria-hidden="true">
						{#if templateSelected === tpl.id}
							<span class="sc-template-check">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<path d="M3 8l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						{/if}
					</span>
					<span class="sc-template-info">
						<span class="sc-template-name">{tpl.label}</span>
						<span class="sc-template-stats">
							<span>{tpl.stat1}</span>
							<span class="sc-template-dot" aria-hidden="true"></span>
							<span>{tpl.stat2}</span>
						</span>
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 7. IN CONTEXT: PLAN SELECTION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Plan Selection</h3>
		<p class="ds-card__sub">A complete plan picker with billing toggle, full feature lists, current selection badge, and a confirm action.</p>

		<div class="sc-plan-wrapper">
			<!-- Billing toggle -->
			<div class="sc-billing-toggle">
				<button
					class="sc-billing-btn"
					class:sc-billing-btn--active={planBilling === 'monthly'}
					onclick={() => planBilling = 'monthly'}
				>Monthly</button>
				<button
					class="sc-billing-btn"
					class:sc-billing-btn--active={planBilling === 'yearly'}
					onclick={() => planBilling = 'yearly'}
				>
					Yearly
					<span class="sc-billing-badge">Save ~30%</span>
				</button>
			</div>

			<!-- Plan cards -->
			<div class="sc-plan-grid">
				{#each planTiers as tier}
					{@const price = planBilling === 'yearly' ? tier.yearly : tier.monthly}
					<button
						class="sc-plan-card"
						class:sc-plan-card--selected={planSelected === tier.id}
						class:sc-plan-card--highlight={tier.highlight}
						onclick={() => { planSelected = tier.id; planConfirmed = false; }}
						aria-pressed={planSelected === tier.id}
					>
						{#if tier.highlight}
							<span class="sc-plan-popular-badge">Most popular</span>
						{/if}
						{#if planSelected === tier.id}
							<span class="sc-plan-current-badge">Current plan</span>
						{/if}
						<span class="sc-plan-name">{tier.name}</span>
						<span class="sc-plan-price">
							{#if price === 0}
								<span class="sc-plan-amount">Free</span>
							{:else}
								<span class="sc-plan-amount">${price}</span>
								<span class="sc-plan-period">/mo</span>
							{/if}
						</span>
						{#if planBilling === 'yearly' && price > 0}
							<span class="sc-plan-saving">Billed ${price * 12}/yr</span>
						{:else if price === 0}
							<span class="sc-plan-saving">Always free</span>
						{:else}
							<span class="sc-plan-saving">Billed monthly</span>
						{/if}
						<ul class="sc-plan-features">
							{#each tier.features as f}
								<li>
									<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
										<path d="M2 6.5l3 3 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									{f}
								</li>
							{/each}
						</ul>
					</button>
				{/each}
			</div>

			<!-- Confirm row -->
			<div class="sc-plan-footer">
				<span class="sc-plan-footer-info">
					{#if planConfirmed}
						Plan updated to <strong>{planTiers.find((t) => t.id === planSelected)?.name}</strong> ({planBilling}).
					{:else}
						{planTiers.find((t) => t.id === planSelected)?.name} plan selected &mdash; {planBilling} billing.
					{/if}
				</span>
				<button
					class="sc-plan-confirm"
					onclick={() => planConfirmed = true}
					disabled={planConfirmed}
				>
					{planConfirmed ? 'Confirmed' : 'Confirm Plan'}
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	/* ──────────────────────────────────────────────────────────────────────
	   SHARED BASE
	────────────────────────────────────────────────────────────────────── */
	.sc-radio-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 560px;
	}

	/* ──────────────────────────────────────────────────────────────────────
	   1 & 2 & 3 — RADIO CARDS
	────────────────────────────────────────────────────────────────────── */
	.sc-radio-card {
		display: flex;
		align-items: center;
		gap: 14px;
		width: 100%;
		padding: 12px 16px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: transparent;
		color: var(--dt);
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
	}
	.sc-radio-card:hover:not(.sc-radio-card--selected) {
		border-color: var(--dbd2);
		background: var(--dbg2);
	}
	.sc-radio-card--selected {
		border-color: var(--dt);
		background: var(--dbg2);
		box-shadow: 0 0 0 1px var(--dt) inset;
	}

	/* Radio dot */
	.sc-radio-dot {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 1.5px solid var(--dbd2);
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.15s, background 0.15s;
		position: relative;
	}
	.sc-radio-dot--selected {
		border-color: var(--dt);
	}
	.sc-radio-dot--selected::after {
		content: '';
		display: block;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--dt);
	}
	.sc-radio-dot--right {
		margin-left: auto;
	}

	.sc-radio-label {
		font-size: 14px;
		font-weight: 500;
		color: var(--dt);
		line-height: 1.2;
	}

	/* Body layout for desc/icon cards */
	.sc-radio-body {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;
	}
	.sc-radio-title-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.sc-radio-desc {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.4;
	}

	/* Recommended badge */
	.sc-badge-recommended {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 2px 8px;
		border-radius: 999px;
		border: 1px solid var(--dbd2);
		color: var(--dt2);
		background: var(--dbg3);
		white-space: nowrap;
	}

	/* Aspect ratio icon */
	.sc-radio-card--icon {
		gap: 16px;
	}
	.sc-aspect-icon {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
	}
	.sc-aspect-rect {
		display: block;
		border: 1.5px solid var(--dt3);
		border-radius: 2px;
		background: var(--dbg2);
		transition: border-color 0.15s;
	}
	.sc-radio-card--selected .sc-aspect-rect {
		border-color: var(--dt2);
	}

	/* ──────────────────────────────────────────────────────────────────────
	   4 — CHECKBOX CARDS
	────────────────────────────────────────────────────────────────────── */
	.sc-check-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 100%;
		padding: 12px 16px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: transparent;
		color: var(--dt);
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
	}
	.sc-check-card:hover:not(.sc-check-card--selected) {
		border-color: var(--dbd2);
		background: var(--dbg2);
	}
	.sc-check-card--selected {
		border-color: var(--dt);
		background: var(--dbg2);
		box-shadow: 0 0 0 1px var(--dt) inset;
	}
	.sc-check-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.sc-check-mark {
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		border: 1.5px solid var(--dbd2);
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt);
		opacity: 0;
		transition: opacity 0.12s, border-color 0.12s, background 0.12s;
	}
	.sc-check-mark--visible {
		opacity: 1;
		border-color: var(--dt);
		background: var(--dt);
		color: #fff;
	}

	/* ──────────────────────────────────────────────────────────────────────
	   5 — PRICING TIER CARDS
	────────────────────────────────────────────────────────────────────── */
	.sc-pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		max-width: 680px;
	}
	.sc-pricing-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 20px 18px 18px;
		border: 1px solid var(--dbd);
		border-radius: 16px;
		background: transparent;
		color: var(--dt);
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s, background 0.15s;
	}
	.sc-pricing-card:hover:not(.sc-pricing-card--selected) {
		border-color: var(--dbd2);
		background: var(--dbg2);
	}
	.sc-pricing-card--selected {
		border-color: var(--dt);
		background: var(--dbg2);
		box-shadow: 0 0 0 1px var(--dt) inset, 0 8px 32px rgba(0,0,0,0.28);
		transform: translateY(-2px);
	}
	.sc-badge-popular {
		position: absolute;
		top: -11px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 3px 10px;
		border-radius: 999px;
		background: var(--dt);
		color: #fff;
		white-space: nowrap;
	}
	.sc-pricing-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt2);
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.sc-pricing-price {
		font-size: 28px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.03em;
		margin-top: 10px;
		line-height: 1;
	}
	.sc-pricing-price small {
		font-size: 14px;
		font-weight: 400;
		color: var(--dt3);
		letter-spacing: 0;
	}
	.sc-pricing-desc {
		font-size: 12px;
		color: var(--dt3);
		margin-top: 8px;
		line-height: 1.45;
		min-height: 34px;
	}
	.sc-pricing-features {
		list-style: none;
		padding: 0;
		margin: 14px 0 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
	.sc-pricing-features li {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--dt2);
	}
	.sc-pricing-features svg {
		flex-shrink: 0;
		color: var(--dt3);
	}
	.sc-pricing-card--selected .sc-pricing-features svg {
		color: var(--dt2);
	}
	.sc-pricing-select-indicator {
		display: block;
		margin-top: 18px;
		padding: 7px 0;
		text-align: center;
		font-size: 12px;
		font-weight: 600;
		border-radius: 8px;
		border: 1px solid var(--dbd2);
		color: var(--dt3);
		transition: border-color 0.15s, color 0.15s, background 0.15s;
	}
	.sc-pricing-select-indicator--on {
		border-color: var(--dt);
		color: var(--dt);
		background: var(--dbg3);
	}

	/* ──────────────────────────────────────────────────────────────────────
	   6 — SELECTION CARD WITH CONTENT
	────────────────────────────────────────────────────────────────────── */
	.sc-template-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		max-width: 540px;
	}
	.sc-template-card {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
		background: transparent;
		color: var(--dt);
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.sc-template-card:hover:not(.sc-template-card--selected) {
		border-color: var(--dbd2);
	}
	.sc-template-card--selected {
		border-color: var(--dt);
		box-shadow: 0 0 0 1px var(--dt) inset, 0 4px 20px rgba(0,0,0,0.24);
	}
	.sc-template-preview {
		position: relative;
		display: block;
		height: 90px;
		width: 100%;
	}
	.sc-template-check {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: var(--dt);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sc-template-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px 12px 12px;
	}
	.sc-template-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}
	.sc-template-stats {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		color: var(--dt3);
	}
	.sc-template-dot {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--dt4);
	}

	/* ──────────────────────────────────────────────────────────────────────
	   7 — IN CONTEXT: PLAN SELECTION
	────────────────────────────────────────────────────────────────────── */
	.sc-plan-wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 680px;
	}

	/* Billing toggle */
	.sc-billing-toggle {
		display: inline-flex;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		align-self: flex-start;
	}
	.sc-billing-btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 8px 18px;
		background: transparent;
		color: var(--dt3);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		border: none;
		border-radius: 0;
		transition: background 0.13s, color 0.13s;
	}
	.sc-billing-btn--active {
		background: var(--dbg2);
		color: var(--dt);
	}
	.sc-billing-badge {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.03em;
		padding: 1px 7px;
		border-radius: 999px;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		color: var(--dt2);
	}
	.sc-billing-btn--active .sc-billing-badge {
		background: var(--dt);
		border-color: var(--dt);
		color: #fff;
	}

	/* Plan grid */
	.sc-plan-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}
	.sc-plan-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 20px 16px 16px;
		border: 1px solid var(--dbd);
		border-radius: 16px;
		background: transparent;
		color: var(--dt);
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s, background 0.15s;
	}
	.sc-plan-card:hover:not(.sc-plan-card--selected) {
		border-color: var(--dbd2);
		background: var(--dbg2);
	}
	.sc-plan-card--selected {
		border-color: var(--dt);
		background: var(--dbg2);
		box-shadow: 0 0 0 1px var(--dt) inset, 0 8px 28px rgba(0,0,0,0.22);
		transform: translateY(-2px);
	}
	.sc-plan-popular-badge {
		position: absolute;
		top: -11px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 3px 10px;
		border-radius: 999px;
		background: var(--dt);
		color: #fff;
		white-space: nowrap;
	}
	.sc-plan-current-badge {
		position: absolute;
		top: 12px;
		right: 12px;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.03em;
		padding: 2px 8px;
		border-radius: 999px;
		border: 1px solid var(--dbd2);
		color: var(--dt2);
		background: var(--dbg3);
		white-space: nowrap;
	}
	.sc-plan-name {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt3);
	}
	.sc-plan-price {
		display: flex;
		align-items: baseline;
		gap: 3px;
		margin-top: 10px;
	}
	.sc-plan-amount {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--dt);
		line-height: 1;
	}
	.sc-plan-period {
		font-size: 13px;
		color: var(--dt3);
	}
	.sc-plan-saving {
		font-size: 11px;
		color: var(--dt4);
		margin-top: 4px;
		min-height: 16px;
	}
	.sc-plan-features {
		list-style: none;
		padding: 0;
		margin: 14px 0 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
	.sc-plan-features li {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: var(--dt2);
	}
	.sc-plan-features svg {
		flex-shrink: 0;
		color: var(--dt4);
	}
	.sc-plan-card--selected .sc-plan-features svg {
		color: var(--dt2);
	}

	/* Confirm footer */
	.sc-plan-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 18px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
	}
	.sc-plan-footer-info {
		font-size: 13px;
		color: var(--dt3);
	}
	.sc-plan-footer-info strong {
		color: var(--dt);
		font-weight: 600;
	}
	.sc-plan-confirm {
		padding: 8px 22px;
		border-radius: 8px;
		border: 1px solid var(--dbd2);
		background: var(--dt);
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		transition: opacity 0.13s, transform 0.13s;
	}
	.sc-plan-confirm:hover:not(:disabled) {
		opacity: 0.85;
	}
	.sc-plan-confirm:disabled {
		background: var(--dbg3);
		border-color: var(--dbd);
		color: var(--dt3);
		cursor: default;
	}

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .sc-radio-dot--selected::after {
		background: #e5e5e5;
	}
	:global(.dark) .sc-check-mark--visible {
		background: #e5e5e5;
		border-color: #e5e5e5;
		color: #111;
	}
	:global(.dark) .sc-badge-popular {
		background: #e5e5e5;
		color: #111;
	}
	:global(.dark) .sc-template-check {
		background: #e5e5e5;
		color: #111;
	}
	:global(.dark) .sc-billing-btn--active .sc-billing-badge {
		background: #e5e5e5;
		border-color: #e5e5e5;
		color: #111;
	}
	:global(.dark) .sc-plan-popular-badge {
		background: #e5e5e5;
		color: #111;
	}
	:global(.dark) .sc-plan-confirm {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}
</style>
