<script lang="ts">
	// ── Prompt Library ─────────────────────────────────────────────
	const promptCategories = ['General', 'Portrait', 'Fashion', 'Lifestyle', 'Artistic', 'Fantasy', 'Product'];
	let activeCategory = $state('Fashion');
	let promptSearch = $state('');
	let editingPrompt = $state<string | null>(null);

	const allPrompts: {
		id: string; title: string; category: string; preview: string;
		tags: string[]; favorite: boolean; uses: number;
	}[] = [
		{ id: 'p1', title: 'Editorial Fashion Portrait',     category: 'Fashion',   preview: '{character_name} wearing {outfit}, editorial fashion photography, {lighting}, high-end magazine style, {background}', tags: ['portrait', 'editorial', 'magazine'], favorite: true,  uses: 847 },
		{ id: 'p2', title: 'Lifestyle Candid Moment',        category: 'Lifestyle', preview: '{character_name} in a {environment}, natural candid moment, {mood} expression, lifestyle photography, soft natural light', tags: ['lifestyle', 'candid', 'natural'],   favorite: false, uses: 412 },
		{ id: 'p3', title: 'Cinematic Street Portrait',      category: 'Portrait',  preview: '{character_name} on a {city} street, cinematic {time_of_day} light, {style} fashion, bokeh background, 35mm film look', tags: ['cinematic', 'street', 'bokeh'],   favorite: true,  uses: 623 },
		{ id: 'p4', title: 'Luxury Product Showcase',        category: 'Product',   preview: 'Flat lay of {product} surrounded by {props}, luxury aesthetic, {background_color} background, commercial photography', tags: ['product', 'luxury', 'commercial'], favorite: false, uses: 234 },
		{ id: 'p5', title: 'Fantasy Character Concept',      category: 'Fantasy',   preview: '{character_name} as a {fantasy_role}, {fantasy_setting}, dramatic lighting, concept art style, highly detailed', tags: ['fantasy', 'concept', 'dramatic'],   favorite: false, uses: 189 },
		{ id: 'p6', title: 'Studio Fashion Shoot',           category: 'Fashion',   preview: '{character_name} in a professional studio, {pose} pose, wearing {outfit}, seamless {backdrop_color} backdrop, studio lighting', tags: ['studio', 'professional', 'clean'], favorite: true, uses: 991 },
		{ id: 'p7', title: 'Artistic Fine Art Portrait',     category: 'Artistic',  preview: '{character_name} in a fine art portrait, {art_style} inspired, {color_palette} palette, dramatic composition, museum quality', tags: ['fine art', 'artistic', 'composition'], favorite: false, uses: 78 },
		{ id: 'p8', title: 'Golden Hour Outdoor',            category: 'General',   preview: '{character_name} outdoors in golden hour sunlight, {location}, warm tones, cinematic depth, lifestyle aesthetic', tags: ['golden hour', 'outdoor', 'warm'],   favorite: true, uses: 1204 },
	];

	let filteredPrompts = $derived(
		allPrompts.filter(p => {
			const matchCat = p.category === activeCategory;
			const matchSearch = !promptSearch || p.title.toLowerCase().includes(promptSearch.toLowerCase()) || p.tags.some(t => t.includes(promptSearch.toLowerCase()));
			return matchCat && matchSearch;
		})
	);

	let favoriteStates = $state<Record<string, boolean>>(
		Object.fromEntries(allPrompts.map(p => [p.id, p.favorite]))
	);

	// ── Prompt Builder ─────────────────────────────────────────────
	let basePrompt = $state('{character_name} wearing a luxury fashion ensemble, editorial photography, {lighting}, {background}');
	let negativePrompt = $state('blurry, low quality, distorted, watermark, text, oversaturated');

	const variableChips = [
		'{character_name}', '{outfit}', '{pose}', '{lighting}', '{background}', '{style}', '{mood}', '{location}', '{time_of_day}',
	];

	const styleModifiers: { label: string; on: boolean }[] = [
		{ label: 'Cinematic', on: true }, { label: 'Studio Lighting', on: false },
		{ label: 'Golden Hour', on: true }, { label: 'Dramatic Shadows', on: false },
		{ label: 'Soft Focus', on: false }, { label: 'Film Grain', on: true },
		{ label: 'Shallow DoF', on: true }, { label: 'High Contrast', on: false },
		{ label: 'Pastel Tones', on: false }, { label: 'Monochrome', on: false },
	];

	let activeModifiers = $state<Set<string>>(new Set(styleModifiers.filter(m => m.on).map(m => m.label)));

	function toggleModifier(label: string) {
		const next = new Set(activeModifiers);
		if (next.has(label)) next.delete(label); else next.add(label);
		activeModifiers = next;
	}

	function insertVariable(v: string) {
		basePrompt = basePrompt + (basePrompt.endsWith(' ') ? '' : ' ') + v;
	}

	let assembledPrompt = $derived(
		[
			basePrompt,
			[...activeModifiers].join(', '),
		].filter(Boolean).join(', ')
	);

	// ── Pricing & Credits ──────────────────────────────────────────
	let billingInterval = $state<'monthly' | 'yearly'>('monthly');

	const plans = [
		{
			name: 'Starter',
			monthlyPrice: 29,
			yearlyPrice: 23,
			credits: 500,
			features: [
				{ label: '500 credits / month', yes: true },
				{ label: 'Up to 3 characters', yes: true },
				{ label: 'Image generation', yes: true },
				{ label: 'Video generation', yes: false },
				{ label: 'Batch jobs', yes: false },
				{ label: 'Custom prompts', yes: false },
				{ label: 'API access', yes: false },
				{ label: 'Priority support', yes: false },
			],
		},
		{
			name: 'Pro',
			monthlyPrice: 79,
			yearlyPrice: 63,
			credits: 2500,
			featured: true,
			features: [
				{ label: '2,500 credits / month', yes: true },
				{ label: 'Up to 20 characters', yes: true },
				{ label: 'Image generation', yes: true },
				{ label: 'Video generation', yes: true },
				{ label: 'Batch jobs (unlimited)', yes: true },
				{ label: 'Custom prompts', yes: true },
				{ label: 'API access', yes: false },
				{ label: 'Priority support', yes: true },
			],
		},
		{
			name: 'Enterprise',
			monthlyPrice: null,
			yearlyPrice: null,
			credits: null,
			features: [
				{ label: 'Unlimited credits', yes: true },
				{ label: 'Unlimited characters', yes: true },
				{ label: 'Image generation', yes: true },
				{ label: 'Video generation', yes: true },
				{ label: 'Batch jobs (unlimited)', yes: true },
				{ label: 'Custom prompts', yes: true },
				{ label: 'API access', yes: true },
				{ label: 'Dedicated support + SLA', yes: true },
			],
		},
	];

	const creditCosts: { model: string; type: string; credits: number; approxUsd: string }[] = [
		{ model: 'Flux Pro',          type: 'Image', credits: 8,   approxUsd: '$0.08' },
		{ model: 'FLUX 2 Max',        type: 'Image', credits: 12,  approxUsd: '$0.12' },
		{ model: 'FLUX Kontext Pro',  type: 'Image', credits: 15,  approxUsd: '$0.15' },
		{ model: 'Seedream 3',        type: 'Image', credits: 10,  approxUsd: '$0.10' },
		{ model: 'NanoBanana Pro',    type: 'Image', credits: 6,   approxUsd: '$0.06' },
		{ model: 'Veo 3',             type: 'Video', credits: 120, approxUsd: '$1.20' },
		{ model: 'Sora 2 Pro',        type: 'Video', credits: 150, approxUsd: '$1.50' },
		{ model: 'Runway Gen-3',      type: 'Video', credits: 90,  approxUsd: '$0.90' },
		{ model: 'Kling',             type: 'Video', credits: 80,  approxUsd: '$0.80' },
		{ model: 'Luma Dream Machine',type: 'Video', credits: 75,  approxUsd: '$0.75' },
	];

	// Current usage meter
	const usedCredits = 1847;
	const totalCredits = 2500;
	let usagePct = $derived(Math.round((usedCredits / totalCredits) * 100));
</script>

<section class="ds-section">
	<h2 class="ds-title">ContentOS Prompts &amp; Pricing</h2>
	<p class="ds-desc">Prompt template library with variable chips and interactive builder, plus a plan comparison table, model credit costs, and a billing interval toggle.</p>

	<!-- ═══ 1. PROMPT LIBRARY ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Prompt Library</h3>
		<p class="ds-card__sub">Categorized prompt templates with variable placeholders, favorites, usage counts, and copy actions.</p>

		<div class="cop-lib-toolbar">
			<div class="cop-cat-tabs">
				{#each promptCategories as cat}
					<button
						class="cop-cat-tab"
						class:cop-cat-tab--active={activeCategory === cat}
						onclick={() => activeCategory = cat}
						aria-pressed={activeCategory === cat}
					>{cat}</button>
				{/each}
			</div>
			<div class="cop-search-wrap">
				<svg class="cop-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				<input class="cop-search" type="text" placeholder="Search prompts or tags…" bind:value={promptSearch} aria-label="Search prompts" />
			</div>
		</div>

		{#if filteredPrompts.length === 0}
			<div class="cop-lib-empty">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
				<p>No prompts found in {activeCategory}</p>
			</div>
		{:else}
			<div class="cop-prompt-grid">
				{#each filteredPrompts as prompt}
					<div class="cop-prompt-card" class:cop-prompt-card--editing={editingPrompt === prompt.id}>
						<div class="cop-prompt-header">
							<span class="cop-prompt-title">{prompt.title}</span>
							<div class="cop-prompt-header-actions">
								<button
									class="btn-compact btn-compact-ghost btn-compact-icon cop-fav-btn"
									class:cop-fav-btn--on={favoriteStates[prompt.id]}
									onclick={() => favoriteStates = {...favoriteStates, [prompt.id]: !favoriteStates[prompt.id]}}
									aria-label="{favoriteStates[prompt.id] ? 'Remove from' : 'Add to'} favorites"
									aria-pressed={favoriteStates[prompt.id]}
								>
									<svg width="13" height="13" viewBox="0 0 24 24" fill={favoriteStates[prompt.id] ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
								</button>
							</div>
						</div>

						<div class="cop-prompt-tags">
							<span class="cop-cat-badge">{prompt.category}</span>
							{#each prompt.tags as tag}
								<span class="cop-tag">{tag}</span>
							{/each}
						</div>

						<p class="cop-prompt-preview">{prompt.preview}</p>

						<div class="cop-prompt-footer">
							<span class="cop-usage-count">{prompt.uses.toLocaleString()} uses</span>
							<div class="cop-prompt-actions">
								<button
									class="btn-compact btn-compact-ghost"
									onclick={() => editingPrompt = editingPrompt === prompt.id ? null : prompt.id}
									aria-label="Edit prompt {prompt.title}"
								>Edit</button>
								<button class="btn-compact btn-compact-primary" aria-label="Copy prompt {prompt.title}">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
									Copy
								</button>
							</div>
						</div>

						{#if editingPrompt === prompt.id}
							<div class="cop-prompt-edit">
								<textarea class="cop-edit-textarea" rows="4" value={prompt.preview} aria-label="Edit prompt content"></textarea>
								<div class="cop-edit-row">
									<button class="btn-rounded btn-rounded-primary" onclick={() => editingPrompt = null} aria-label="Save prompt">Save</button>
									<button class="btn-rounded btn-rounded-ghost" onclick={() => editingPrompt = null} aria-label="Cancel editing">Cancel</button>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ═══ 2. PROMPT BUILDER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Prompt Builder</h3>
		<p class="ds-card__sub">Interactive constructor — insert variable chips, toggle style modifiers, and compose a negative prompt. See the assembled result live.</p>

		<div class="cop-builder-layout">
			<div class="cop-builder-form">
				<!-- Base prompt -->
				<div class="cop-field">
					<label class="cop-label" for="cop-base-prompt">Base Prompt</label>
					<textarea
						id="cop-base-prompt"
						class="cop-textarea"
						bind:value={basePrompt}
						rows="4"
						placeholder="Start with a base prompt, then use the chips below to insert variables…"
					></textarea>
				</div>

				<!-- Variable chips -->
				<div class="cop-field">
					<label class="cop-label">Insert Variable</label>
					<div class="cop-var-chips">
						{#each variableChips as v}
							<button
								class="cop-var-chip"
								onclick={() => insertVariable(v)}
								aria-label="Insert variable {v}"
							>{v}</button>
						{/each}
					</div>
				</div>

				<!-- Style modifiers -->
				<div class="cop-field">
					<label class="cop-label">Style Modifiers</label>
					<div class="cop-modifier-chips">
						{#each styleModifiers as m}
							<button
								class="cop-modifier-chip"
								class:cop-modifier-chip--on={activeModifiers.has(m.label)}
								onclick={() => toggleModifier(m.label)}
								aria-pressed={activeModifiers.has(m.label)}
							>{m.label}</button>
						{/each}
					</div>
				</div>

				<!-- Negative prompt -->
				<div class="cop-field">
					<label class="cop-label" for="cop-neg-prompt">Negative Prompt</label>
					<textarea
						id="cop-neg-prompt"
						class="cop-textarea cop-textarea--sm"
						bind:value={negativePrompt}
						rows="2"
						placeholder="Things to avoid in the output…"
					></textarea>
				</div>
			</div>

			<!-- Assembled preview -->
			<div class="cop-builder-preview">
				<div class="cop-preview-label">Assembled Prompt</div>
				<div class="cop-assembled-prompt">
					{#each assembledPrompt.split(/(\{[^}]+\})/) as part}
						{#if part.startsWith('{') && part.endsWith('}')}
							<span class="cop-var-highlight">{part}</span>
						{:else}
							{part}
						{/if}
					{/each}
				</div>

				{#if negativePrompt}
					<div class="cop-neg-section">
						<div class="cop-neg-label">Negative</div>
						<p class="cop-neg-text">{negativePrompt}</p>
					</div>
				{/if}

				<div class="cop-builder-actions">
					<button class="btn-pill btn-pill-primary cop-copy-btn" aria-label="Copy assembled prompt">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
						Copy Prompt
					</button>
					<button class="btn-pill btn-pill-outline cop-save-prompt-btn" aria-label="Save prompt to library">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
						Save to Library
					</button>
				</div>

				<!-- Active modifier count -->
				<div class="cop-modifier-summary">
					<span class="cop-mod-count">{activeModifiers.size} modifier{activeModifiers.size !== 1 ? 's' : ''} active</span>
					{#if activeModifiers.size > 0}
						<button class="cop-clear-btn" onclick={() => activeModifiers = new Set()} aria-label="Clear all modifiers">Clear all</button>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. PRICING & CREDITS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pricing &amp; Credits</h3>
		<p class="ds-card__sub">Plan comparison, credit cost breakdown per model, and current usage meter.</p>

		<!-- Billing toggle -->
		<div class="cop-billing-toggle">
			<button
				class="cop-interval-btn"
				class:cop-interval-btn--active={billingInterval === 'monthly'}
				onclick={() => billingInterval = 'monthly'}
				aria-pressed={billingInterval === 'monthly'}
			>Monthly</button>
			<button
				class="cop-interval-btn"
				class:cop-interval-btn--active={billingInterval === 'yearly'}
				onclick={() => billingInterval = 'yearly'}
				aria-pressed={billingInterval === 'yearly'}
			>
				Yearly
				<span class="cop-discount-badge">Save 20%</span>
			</button>
		</div>

		<!-- Plan cards -->
		<div class="cop-plans-grid">
			{#each plans as plan}
				<div class="cop-plan-card" class:cop-plan-card--featured={'featured' in plan}>
					<div class="cop-plan-header">
						<div class="cop-plan-name" class:cop-plan-name--featured={'featured' in plan}>{plan.name}</div>
						{#if 'featured' in plan}<div class="cop-plan-badge">Most Popular</div>{/if}
					</div>
					<div class="cop-plan-price">
						{#if plan.monthlyPrice !== null}
							<span class="cop-price-amount" class:cop-price-amount--featured={'featured' in plan}>
								${billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
							</span>
							<span class="cop-price-period" class:cop-price-period--featured={'featured' in plan}>/mo</span>
						{:else}
							<span class="cop-price-amount" class:cop-price-amount--featured={'featured' in plan}>Custom</span>
						{/if}
					</div>
					{#if plan.credits !== null}
						<div class="cop-plan-credits" class:cop-plan-credits--featured={'featured' in plan}>
							{plan.credits.toLocaleString()} credits / month
						</div>
					{:else}
						<div class="cop-plan-credits" class:cop-plan-credits--featured={'featured' in plan}>Unlimited credits</div>
					{/if}

					<div class="cop-plan-features">
						{#each plan.features as feat}
							<div class="cop-plan-feature">
								{#if feat.yes}
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={'featured' in plan ? 'rgba(255,255,255,0.8)' : '#22c55e'} stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
								{:else}
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={'featured' in plan ? 'rgba(255,255,255,0.3)' : 'var(--dt4)'} stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								{/if}
								<span class:cop-feature-muted={!feat.yes}>{feat.label}</span>
							</div>
						{/each}
					</div>

					<button class="btn-rounded btn-rounded-primary" class:cop-plan-cta--featured={'featured' in plan} aria-label="Get started with {plan.name}">
						{plan.monthlyPrice !== null ? 'Get Started' : 'Contact Sales'}
					</button>
				</div>
			{/each}
		</div>

		<!-- Credit costs table -->
		<div class="cop-credit-section">
			<div class="cop-credit-title">Credit Cost Breakdown</div>
			<div class="cop-credit-grid">
				{#each ['Image', 'Video'] as type}
					<div class="cop-credit-group">
						<div class="cop-credit-group-title">{type} Models</div>
						<table class="cop-credit-table">
							<thead>
								<tr>
									<th>Model</th>
									<th>Credits</th>
									<th>~USD</th>
								</tr>
							</thead>
							<tbody>
								{#each creditCosts.filter(c => c.type === type) as row}
									<tr>
										<td class="cop-model-name">{row.model}</td>
										<td class="cop-credits-col">{row.credits}cr</td>
										<td class="cop-usd-col">{row.approxUsd}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/each}
			</div>
		</div>

		<!-- Current usage meter -->
		<div class="cop-usage-section">
			<div class="cop-usage-header">
				<div>
					<div class="cop-usage-title">Current Usage</div>
					<div class="cop-usage-sub">Pro Plan · Resets in 18 days</div>
				</div>
				<div class="cop-usage-count">
					<span class="cop-usage-used">{usedCredits.toLocaleString()}</span>
					<span class="cop-usage-total"> / {totalCredits.toLocaleString()} credits</span>
				</div>
			</div>
			<div class="cop-usage-track">
				<div
					class="cop-usage-fill"
					style="width:{usagePct}%"
					class:cop-usage-fill--warn={usagePct > 75}
				></div>
			</div>
			<div class="cop-usage-footer">
				<span class="cop-usage-pct">{usagePct}% used</span>
				<span class="cop-usage-remain">{(totalCredits - usedCredits).toLocaleString()} credits remaining</span>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Prompt Library ─────────────────────────────────────────────── */
	.cop-lib-toolbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
	.cop-cat-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
	.cop-cat-tab { padding: 5px 12px; border: 1.5px solid var(--dbd); border-radius: 16px; background: transparent; color: var(--dt3); font-size: 12px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; white-space: nowrap; }
	.cop-cat-tab:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cop-cat-tab--active { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cop-cat-tab--active { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cop-search-wrap { position: relative; display: flex; align-items: center; }
	.cop-search-icon { position: absolute; left: 9px; color: var(--dt4); pointer-events: none; }
	.cop-search { padding: 6px 10px 6px 28px; border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg); color: var(--dt); font-size: 12.5px; font-family: inherit; outline: none; width: 200px; }
	.cop-search:focus { border-color: var(--dt3); }
	.cop-search::placeholder { color: var(--dt4); }
	.cop-lib-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 48px 20px; color: var(--dt4); text-align: center; border: 1.5px dashed var(--dbd); border-radius: 12px; }
	.cop-lib-empty p { font-size: 13px; margin: 0; }
	.cop-prompt-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
	.cop-prompt-card { display: flex; flex-direction: column; gap: 8px; padding: 14px; border: 1.5px solid var(--dbd); border-radius: 11px; background: var(--dbg); transition: border-color 0.15s; }
	.cop-prompt-card:hover { border-color: var(--dbd2); }
	.cop-prompt-card--editing { border-color: var(--dt); }
	.cop-prompt-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
	.cop-prompt-title { font-size: 13.5px; font-weight: 700; color: var(--dt); flex: 1; }
	.cop-prompt-header-actions { display: flex; gap: 4px; }
	.cop-fav-btn--on { color: #f59e0b; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.06); }
	.cop-prompt-tags { display: flex; flex-wrap: wrap; gap: 4px; }
	.cop-cat-badge { display: inline-flex; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 700; background: var(--dt); color: #fff; }
	:global(.dark) .cop-cat-badge { background: #e5e5e5; color: #111; }
	.cop-tag { display: inline-flex; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 500; background: var(--dbg2); color: var(--dt3); border: 1px solid var(--dbd); }
	.cop-prompt-preview { font-size: 12px; color: var(--dt3); line-height: 1.55; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-style: italic; }
	.cop-prompt-footer { display: flex; align-items: center; justify-content: space-between; }
	.cop-usage-count { font-size: 11px; color: var(--dt4); }
	.cop-prompt-actions { display: flex; gap: 5px; }
	.cop-prompt-edit { display: flex; flex-direction: column; gap: 8px; border-top: 1.5px solid var(--dbd); padding-top: 10px; margin-top: 2px; }
	.cop-edit-textarea { border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg2); color: var(--dt); font-size: 12.5px; font-family: inherit; padding: 9px 10px; resize: vertical; outline: none; line-height: 1.55; }
	.cop-edit-textarea:focus { border-color: var(--dt3); }
	.cop-edit-row { display: flex; gap: 6px; }

	/* ── Prompt Builder ─────────────────────────────────────────────── */
	.cop-builder-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
	.cop-builder-form { display: flex; flex-direction: column; gap: 14px; }
	.cop-field { display: flex; flex-direction: column; gap: 6px; }
	.cop-label { font-size: 11px; font-weight: 700; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.07em; }
	.cop-textarea { border: 1.5px solid var(--dbd); border-radius: 10px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 10px 12px; resize: vertical; outline: none; line-height: 1.55; width: 100%; box-sizing: border-box; }
	.cop-textarea:focus { border-color: var(--dt3); }
	.cop-textarea::placeholder { color: var(--dt4); }
	.cop-textarea--sm { rows: 2; }
	.cop-var-chips { display: flex; flex-wrap: wrap; gap: 5px; }
	.cop-var-chip { display: inline-flex; align-items: center; padding: 4px 10px; border: 1.5px solid var(--dbd); border-radius: 6px; background: var(--dbg2); color: var(--dt2); font-size: 11.5px; font-weight: 600; font-family: 'SF Mono', monospace; cursor: pointer; transition: all 0.12s; }
	.cop-var-chip:hover { border-color: #6366f1; color: #6366f1; background: rgba(99,102,241,0.06); }
	.cop-modifier-chips { display: flex; flex-wrap: wrap; gap: 5px; }
	.cop-modifier-chip { display: inline-flex; align-items: center; padding: 4px 11px; border: 1.5px solid var(--dbd); border-radius: 16px; background: transparent; color: var(--dt3); font-size: 12px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.cop-modifier-chip:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cop-modifier-chip--on { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cop-modifier-chip--on { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cop-builder-preview { display: flex; flex-direction: column; gap: 12px; padding: 16px; background: var(--dbg2); border-radius: 12px; border: 1.5px solid var(--dbd); }
	.cop-preview-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--dt3); }
	.cop-assembled-prompt { font-size: 13px; color: var(--dt2); line-height: 1.65; word-break: break-word; }
	.cop-var-highlight { color: #6366f1; font-weight: 600; background: rgba(99,102,241,0.08); padding: 1px 4px; border-radius: 4px; font-family: 'SF Mono', monospace; font-size: 12px; }
	.cop-neg-section { display: flex; flex-direction: column; gap: 4px; padding: 10px; background: rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.15); border-radius: 8px; }
	.cop-neg-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #dc2626; }
	.cop-neg-text { font-size: 11.5px; color: var(--dt3); margin: 0; line-height: 1.5; font-style: italic; }
	.cop-builder-actions { display: flex; gap: 7px; }
	.cop-modifier-summary { display: flex; align-items: center; justify-content: space-between; }
	.cop-mod-count { font-size: 11px; color: var(--dt4); }
	.cop-clear-btn { font-size: 11px; color: var(--dt3); background: none; border: none; cursor: pointer; text-decoration: underline; font-family: inherit; padding: 0; }
	.cop-clear-btn:hover { color: var(--dt2); }

	/* ── Pricing ────────────────────────────────────────────────────── */
	.cop-billing-toggle { display: flex; gap: 4px; margin-bottom: 16px; background: var(--dbg2); border: 1.5px solid var(--dbd); border-radius: 10px; padding: 4px; width: fit-content; }
	.cop-interval-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 7px; border: none; background: transparent; color: var(--dt3); font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.cop-interval-btn:hover { color: var(--dt2); }
	.cop-interval-btn--active { background: var(--dbg); color: var(--dt); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
	.cop-discount-badge { display: inline-flex; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; background: rgba(34,197,94,0.12); color: #16a34a; }
	.cop-plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
	.cop-plan-card { display: flex; flex-direction: column; gap: 12px; padding: 18px; border: 1.5px solid var(--dbd); border-radius: 14px; background: var(--dbg); }
	.cop-plan-card--featured { background: var(--dt); border-color: var(--dt); }
	:global(.dark) .cop-plan-card--featured { background: #e5e5e5; border-color: #e5e5e5; }
	.cop-plan-header { display: flex; align-items: center; justify-content: space-between; }
	.cop-plan-name { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dt3); }
	.cop-plan-name--featured { color: rgba(255,255,255,0.7); }
	:global(.dark) .cop-plan-name--featured { color: rgba(17,17,17,0.6); }
	.cop-plan-badge { display: inline-flex; padding: 2px 8px; border-radius: 5px; font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.2); color: #fff; }
	:global(.dark) .cop-plan-badge { background: rgba(17,17,17,0.15); color: #111; }
	.cop-plan-price { display: flex; align-items: baseline; gap: 3px; }
	.cop-price-amount { font-size: 32px; font-weight: 800; color: var(--dt); letter-spacing: -0.03em; }
	.cop-price-amount--featured { color: #fff; }
	:global(.dark) .cop-price-amount--featured { color: #111; }
	.cop-price-period { font-size: 14px; color: var(--dt3); }
	.cop-price-period--featured { color: rgba(255,255,255,0.6); }
	:global(.dark) .cop-price-period--featured { color: rgba(17,17,17,0.5); }
	.cop-plan-credits { font-size: 12.5px; color: var(--dt3); }
	.cop-plan-credits--featured { color: rgba(255,255,255,0.7); }
	:global(.dark) .cop-plan-credits--featured { color: rgba(17,17,17,0.6); }
	.cop-plan-features { display: flex; flex-direction: column; gap: 7px; flex: 1; }
	.cop-plan-feature { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--dt2); }
	.cop-plan-card--featured .cop-plan-feature { color: rgba(255,255,255,0.9); }
	:global(.dark) .cop-plan-card--featured .cop-plan-feature { color: rgba(17,17,17,0.85); }
	.cop-feature-muted { color: var(--dt4); }
	.cop-plan-card--featured .cop-feature-muted { color: rgba(255,255,255,0.35); }
	:global(.dark) .cop-plan-card--featured .cop-feature-muted { color: rgba(17,17,17,0.3); }

	/* ── Credit table ───────────────────────────────────────────────── */
	.cop-credit-section { display: flex; flex-direction: column; gap: 12px; padding: 16px; background: var(--dbg2); border-radius: 12px; border: 1.5px solid var(--dbd); margin-bottom: 16px; }
	.cop-credit-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dt3); }
	.cop-credit-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
	.cop-credit-group { display: flex; flex-direction: column; gap: 8px; }
	.cop-credit-group-title { font-size: 11.5px; font-weight: 700; color: var(--dt2); }
	.cop-credit-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
	.cop-credit-table th { text-align: left; padding: 5px 8px; border-bottom: 1px solid var(--dbd); font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dt4); }
	.cop-credit-table td { padding: 6px 8px; border-bottom: 1px solid var(--dbd); vertical-align: middle; }
	.cop-credit-table tr:last-child td { border-bottom: none; }
	.cop-model-name { font-weight: 500; color: var(--dt2); }
	.cop-credits-col { font-weight: 700; color: var(--dt); }
	.cop-usd-col { color: var(--dt3); }

	/* ── Usage meter ────────────────────────────────────────────────── */
	.cop-usage-section { display: flex; flex-direction: column; gap: 8px; padding: 16px; background: var(--dbg2); border-radius: 12px; border: 1.5px solid var(--dbd); }
	.cop-usage-header { display: flex; align-items: flex-start; justify-content: space-between; }
	.cop-usage-title { font-size: 13.5px; font-weight: 700; color: var(--dt); }
	.cop-usage-sub { font-size: 11.5px; color: var(--dt3); margin-top: 2px; }
	.cop-usage-count { text-align: right; }
	.cop-usage-used { font-size: 18px; font-weight: 800; color: var(--dt); letter-spacing: -0.02em; }
	.cop-usage-total { font-size: 13px; color: var(--dt3); }
	.cop-usage-track { height: 8px; background: var(--dbg3); border-radius: 4px; overflow: hidden; }
	.cop-usage-fill { height: 100%; background: var(--dt); border-radius: 4px; transition: width 0.3s; }
	.cop-usage-fill--warn { background: #f59e0b; }
	:global(.dark) .cop-usage-fill { background: #e5e5e5; }
	.cop-usage-footer { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--dt4); }
	.cop-usage-pct { font-weight: 600; color: var(--dt3); }

	/* foundation btn overrides */
	.cop-copy-btn { flex: 1; }
	.cop-save-prompt-btn { flex: 1; }
	.cop-plan-cta--featured { background: #fff !important; color: var(--dt) !important; border-color: #fff !important; }
	:global(.dark) .cop-plan-cta--featured { background: #111 !important; color: #fff !important; border-color: #111 !important; }
	.cop-fav-btn--on { color: #f59e0b; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.06); }
</style>
