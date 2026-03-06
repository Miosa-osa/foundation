<script lang="ts">
	// ── Types ──────────────────────────────────────────────────────
	type ModelType = 'LLM' | 'Vision' | 'Code';
	type Speed = 'fast' | 'medium' | 'slow';
	type Cost = '$' | '$$' | '$$$';

	interface Model {
		id: string;
		name: string;
		provider: string;
		type: ModelType;
		capabilities: string[];
		speed: Speed;
		cost: Cost;
		group?: string;
	}

	// ── Model data ─────────────────────────────────────────────────
	const models: Model[] = [
		{ id: 'claude-3-opus',    name: 'Claude 3 Opus',    provider: 'Anthropic', type: 'LLM',    capabilities: ['Vision', 'Code', 'Long Context'], speed: 'slow',   cost: '$$$', group: 'Anthropic' },
		{ id: 'claude-3-sonnet',  name: 'Claude 3 Sonnet',  provider: 'Anthropic', type: 'LLM',    capabilities: ['Vision', 'Code'],                  speed: 'medium', cost: '$$',  group: 'Anthropic' },
		{ id: 'gpt-4o',           name: 'GPT-4o',           provider: 'OpenAI',    type: 'Vision',  capabilities: ['Vision', 'Code', 'Long Context'], speed: 'fast',   cost: '$$',  group: 'OpenAI'    },
		{ id: 'gpt-4-turbo',      name: 'GPT-4 Turbo',      provider: 'OpenAI',    type: 'Code',    capabilities: ['Code', 'Long Context'],            speed: 'medium', cost: '$$',  group: 'OpenAI'    },
		{ id: 'gemini-pro',       name: 'Gemini Pro',       provider: 'Google',    type: 'Vision',  capabilities: ['Vision', 'Long Context'],          speed: 'fast',   cost: '$',   group: 'Google'    },
		{ id: 'llama-3',          name: 'Llama 3',          provider: 'Meta',      type: 'LLM',    capabilities: ['Code'],                            speed: 'fast',   cost: '$',   group: 'Other'     },
	];

	const groupedModels: Record<string, Model[]> = {
		Recommended: models.filter((m) => ['gpt-4o', 'claude-3-sonnet'].includes(m.id)),
		Anthropic:   models.filter((m) => m.group === 'Anthropic'),
		OpenAI:      models.filter((m) => m.group === 'OpenAI'),
		Google:      models.filter((m) => m.group === 'Google'),
	};

	// ── Demo 1: Basic dropdown ──────────────────────────────────────
	let basicOpen       = $state(false);
	let basicSelected   = $state(models[1]); // Claude 3 Sonnet

	// ── Demo 2: Categorised dropdown ───────────────────────────────
	let catOpen         = $state(false);
	let catSelected     = $state(models[0]); // Claude 3 Opus

	// ── Demo 3: Compact pill ───────────────────────────────────────
	let pillOpen        = $state(false);
	let pillSelected    = $state(models[2]); // GPT-4o

	// ── Demo 4: Comparison cards ───────────────────────────────────
	let cardSelected    = $state(models[0].id);

	// ── Demo 5: States ─────────────────────────────────────────────
	let statesOpen      = $state(false);

	// ── Helpers ────────────────────────────────────────────────────
	function providerColor(provider: string): string {
		const map: Record<string, string> = {
			Anthropic: '#d97706',
			OpenAI:    '#10b981',
			Google:    '#3b82f6',
			Meta:      '#6366f1',
		};
		return map[provider] ?? '#6b7280';
	}

	function speedLabel(speed: Speed): string {
		return { fast: 'Fast', medium: 'Medium', slow: 'Slow' }[speed];
	}

	function speedColor(speed: Speed): string {
		return { fast: '#10b981', medium: '#f59e0b', slow: '#ef4444' }[speed];
	}

	function typeColor(type: ModelType): string {
		return { LLM: '#6366f1', Vision: '#8b5cf6', Code: '#0ea5e9' }[type];
	}

	function closeAll() {
		basicOpen  = false;
		catOpen    = false;
		pillOpen   = false;
		statesOpen = false;
	}
</script>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  SECTION                                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Model Selector</h2>
	<p class="ds-desc">Model picker components for AI chat interfaces — dropdown selectors, comparison cards, and compact variants for choosing AI models.</p>

	<!-- ── 1. Basic Model Selector Dropdown ──────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Model Selector Dropdown</h3>
		<p class="ds-card__sub">Trigger button with icon, name, and chevron. Radio selection with provider subtitle and type badge.</p>
		<div class="ds-demo" style="align-items: flex-start; min-height: 340px;">
			<div class="ms-wrapper">
				<!-- Trigger -->
				<button
					class="ms-trigger"
					class:ms-trigger--open={basicOpen}
					onclick={() => { closeAll(); basicOpen = !basicOpen; }}
					aria-haspopup="listbox"
					aria-expanded={basicOpen}
					aria-label="Select AI model"
				>
					<span class="ms-trigger__dot" style="background: {providerColor(basicSelected.provider)};"></span>
					<span class="ms-trigger__name">{basicSelected.name}</span>
					<span class="ms-trigger__provider">{basicSelected.provider}</span>
					<svg class="ms-trigger__chevron" class:ms-trigger__chevron--up={basicOpen} width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				<!-- Dropdown -->
				{#if basicOpen}
					<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
					<div class="ms-backdrop" onclick={closeAll}></div>
					<div class="ms-dropdown" role="listbox" aria-label="Available models">
						{#each models as model}
							<button
								class="ms-option"
								class:ms-option--selected={basicSelected.id === model.id}
								role="option"
								aria-selected={basicSelected.id === model.id}
								onclick={() => { basicSelected = model; basicOpen = false; }}
							>
								<!-- Checkmark -->
								<span class="ms-option__check" aria-hidden="true">
									{#if basicSelected.id === model.id}
										<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
										</svg>
									{/if}
								</span>
								<!-- Info -->
								<span class="ms-option__info">
									<span class="ms-option__name">{model.name}</span>
									<span class="ms-option__provider">{model.provider}</span>
								</span>
								<!-- Type badge -->
								<span class="ms-badge" style="--badge-color: {typeColor(model.type)};">{model.type}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 2. Model Selector with Categories ─────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Model Selector with Categories</h3>
		<p class="ds-card__sub">Grouped dropdown — Recommended section, then per-provider groups with accent colors.</p>
		<div class="ds-demo" style="align-items: flex-start; min-height: 420px;">
			<div class="ms-wrapper">
				<!-- Trigger -->
				<button
					class="ms-trigger"
					class:ms-trigger--open={catOpen}
					onclick={() => { closeAll(); catOpen = !catOpen; }}
					aria-haspopup="listbox"
					aria-expanded={catOpen}
					aria-label="Select AI model by category"
				>
					<span class="ms-trigger__dot" style="background: {providerColor(catSelected.provider)};"></span>
					<span class="ms-trigger__name">{catSelected.name}</span>
					<span class="ms-trigger__provider">{catSelected.provider}</span>
					<svg class="ms-trigger__chevron" class:ms-trigger__chevron--up={catOpen} width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				<!-- Grouped Dropdown -->
				{#if catOpen}
					<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
					<div class="ms-backdrop" onclick={closeAll}></div>
					<div class="ms-dropdown ms-dropdown--grouped" role="listbox" aria-label="Models by provider">
						{#each Object.entries(groupedModels) as [group, groupModels]}
							<div class="ms-group-label">{group}</div>
							{#each groupModels as model}
								<button
									class="ms-option ms-option--grouped"
									class:ms-option--selected={catSelected.id === model.id}
									role="option"
									aria-selected={catSelected.id === model.id}
									onclick={() => { catSelected = model; catOpen = false; }}
								>
									<span
										class="ms-provider-dot"
										style="background: {providerColor(model.provider)};"
										aria-hidden="true"
									></span>
									<span class="ms-option__info">
										<span class="ms-option__name">{model.name}</span>
										<span class="ms-option__provider" style="color: {providerColor(model.provider)}; opacity: 0.8;">{model.provider}</span>
									</span>
									<span class="ms-badge" style="--badge-color: {typeColor(model.type)};">{model.type}</span>
									{#if catSelected.id === model.id}
										<span class="ms-check-inline" aria-hidden="true">
											<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
											</svg>
										</span>
									{/if}
								</button>
							{/each}
							<div class="ms-group-divider"></div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 3. Compact Model Pill ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact Model Pill</h3>
		<p class="ds-card__sub">Small pill trigger for inline use in chat input bars. Minimal footprint, fast selection.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 16px; min-height: 260px;">
			<!-- Simulated chat input bar context -->
			<div class="ms-chat-bar">
				<div class="ms-chat-bar__input">Type a message…</div>
				<div class="ms-chat-bar__actions">
					<!-- Pill trigger -->
					<div class="ms-pill-wrapper">
						<button
							class="ms-pill"
							onclick={() => { closeAll(); pillOpen = !pillOpen; }}
							aria-haspopup="listbox"
							aria-expanded={pillOpen}
							aria-label="Change model"
						>
							<span class="ms-pill__dot" style="background: {providerColor(pillSelected.provider)};"></span>
							<span class="ms-pill__name">{pillSelected.name}</span>
							<svg class="ms-pill__chevron" width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
							</svg>
						</button>

						<!-- Minimal dropdown (pops upward) -->
						{#if pillOpen}
							<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
							<div class="ms-backdrop" onclick={closeAll}></div>
							<div class="ms-pill-dropdown" role="listbox" aria-label="Quick model select">
								{#each models as model}
									<button
										class="ms-pill-option"
										class:ms-pill-option--active={pillSelected.id === model.id}
										role="option"
										aria-selected={pillSelected.id === model.id}
										onclick={() => { pillSelected = model; pillOpen = false; }}
									>
										<span class="ms-pill__dot" style="background: {providerColor(model.provider)};"></span>
										<span class="ms-pill-option__name">{model.name}</span>
										<span class="ms-pill-option__sub">{model.provider}</span>
										{#if pillSelected.id === model.id}
											<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="color: #6366f1; margin-left: auto; flex-shrink: 0;">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
											</svg>
										{/if}
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<button class="ms-send-btn" aria-label="Send message">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m-7 7l7-7 7 7"/>
						</svg>
					</button>
				</div>
			</div>
			<p style="font-size: 12px; color: var(--dt3, #888); margin: 0;">The pill sits inside the chat input bar and opens a concise model list above it.</p>
		</div>
	</div>

	<!-- ── 4. Model Comparison Cards ─────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Model Comparison Cards</h3>
		<p class="ds-card__sub">Scannable grid — capabilities, speed, and cost at a glance. Click any card to select.</p>
		<div class="ms-card-grid">
			{#each models as model}
				<button
					class="ms-model-card"
					class:ms-model-card--selected={cardSelected === model.id}
					onclick={() => cardSelected = model.id}
					aria-pressed={cardSelected === model.id}
					aria-label="Select {model.name}"
				>
					<!-- Header -->
					<div class="ms-model-card__header">
						<span class="ms-model-card__provider-dot" style="background: {providerColor(model.provider)};"></span>
						<span class="ms-model-card__name">{model.name}</span>
						{#if cardSelected === model.id}
							<span class="ms-model-card__check" aria-hidden="true">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
								</svg>
							</span>
						{/if}
					</div>
					<div class="ms-model-card__provider" style="color: {providerColor(model.provider)};">{model.provider}</div>

					<!-- Capabilities -->
					<div class="ms-model-card__caps">
						{#each model.capabilities as cap}
							<span class="ms-cap-tag">{cap}</span>
						{/each}
					</div>

					<!-- Metrics row -->
					<div class="ms-model-card__metrics">
						<span class="ms-metric">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
							</svg>
							<span class="ms-metric__label" style="color: {speedColor(model.speed)};">{speedLabel(model.speed)}</span>
						</span>
						<span class="ms-metric">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
							</svg>
							<span class="ms-metric__label">{model.cost}</span>
						</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- ── 5. Model Selector States ──────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Model Selector States</h3>
		<p class="ds-card__sub">Default, open, loading (shimmer), disabled, and error badge variants.</p>
		<div class="ms-states-grid">

			<!-- Default -->
			<div class="ms-state-item">
				<span class="ms-state-label">Default</span>
				<button class="ms-trigger" aria-label="Default model selector state">
					<span class="ms-trigger__dot" style="background: #d97706;"></span>
					<span class="ms-trigger__name">Claude 3 Sonnet</span>
					<span class="ms-trigger__provider">Anthropic</span>
					<svg class="ms-trigger__chevron" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>
			</div>

			<!-- Open (simulated with forced open appearance) -->
			<div class="ms-state-item">
				<span class="ms-state-label">Open</span>
				<div class="ms-wrapper ms-wrapper--static">
					<button
						class="ms-trigger ms-trigger--open"
						onclick={() => { closeAll(); statesOpen = !statesOpen; }}
						aria-haspopup="listbox"
						aria-expanded={statesOpen}
						aria-label="Open model selector"
					>
						<span class="ms-trigger__dot" style="background: #10b981;"></span>
						<span class="ms-trigger__name">GPT-4o</span>
						<span class="ms-trigger__provider">OpenAI</span>
						<svg class="ms-trigger__chevron ms-trigger__chevron--up" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
						</svg>
					</button>
					{#if statesOpen}
						<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
						<div class="ms-backdrop" onclick={closeAll}></div>
						<div class="ms-dropdown" role="listbox" aria-label="State demo models">
							{#each models.slice(0, 3) as model}
								<button class="ms-option" class:ms-option--selected={model.id === 'gpt-4o'} role="option" aria-selected={model.id === 'gpt-4o'} onclick={() => statesOpen = false}>
									<span class="ms-option__check">
										{#if model.id === 'gpt-4o'}
											<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
											</svg>
										{/if}
									</span>
									<span class="ms-option__info">
										<span class="ms-option__name">{model.name}</span>
										<span class="ms-option__provider">{model.provider}</span>
									</span>
									<span class="ms-badge" style="--badge-color: {typeColor(model.type)};">{model.type}</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Loading -->
			<div class="ms-state-item">
				<span class="ms-state-label">Loading</span>
				<div class="ms-trigger ms-trigger--loading" aria-busy="true" aria-label="Loading model list">
					<span class="ms-shimmer ms-shimmer--dot"></span>
					<span class="ms-shimmer ms-shimmer--name"></span>
					<span class="ms-shimmer ms-shimmer--sub"></span>
					<svg class="ms-trigger__chevron" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="opacity: 0.3;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</div>
			</div>

			<!-- Disabled -->
			<div class="ms-state-item">
				<span class="ms-state-label">Disabled</span>
				<button class="ms-trigger ms-trigger--disabled" disabled aria-label="Disabled model selector" aria-disabled="true">
					<span class="ms-trigger__dot" style="background: #6b7280;"></span>
					<span class="ms-trigger__name">Claude 3 Opus</span>
					<span class="ms-trigger__provider">Anthropic</span>
					<svg class="ms-trigger__chevron" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>
			</div>

			<!-- Error badge -->
			<div class="ms-state-item">
				<span class="ms-state-label">Error</span>
				<div class="ms-trigger-error-wrap">
					<button class="ms-trigger ms-trigger--error" aria-label="Model unavailable" aria-invalid="true">
						<span class="ms-trigger__dot" style="background: #ef4444;"></span>
						<span class="ms-trigger__name">Llama 3</span>
						<span class="ms-trigger__provider">Meta</span>
						<span class="ms-error-badge" aria-label="Unavailable">Unavailable</span>
					</button>
					<span class="ms-error-hint">This model is currently unavailable</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 6. Props Reference ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Props Reference</h3>
		<p class="ds-card__sub">API surface for the model selector pattern family.</p>
		<table class="ds-table">
			<thead>
				<tr>
					<th>Prop / Pattern</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>models</code></td>
					<td>Model[]</td>
					<td>required</td>
					<td>Array of model objects with id, name, provider, type, capabilities, speed, cost</td>
				</tr>
				<tr>
					<td><code>selected</code></td>
					<td>string (id, bindable)</td>
					<td>models[0].id</td>
					<td>Currently selected model ID — bind for two-way sync</td>
				</tr>
				<tr>
					<td><code>grouped</code></td>
					<td>boolean</td>
					<td>false</td>
					<td>Renders provider group headers (Recommended, Anthropic, OpenAI…)</td>
				</tr>
				<tr>
					<td><code>variant</code></td>
					<td>'default' | 'pill' | 'cards'</td>
					<td>'default'</td>
					<td>Trigger appearance — full button, compact pill, or comparison card grid</td>
				</tr>
				<tr>
					<td><code>disabled</code></td>
					<td>boolean</td>
					<td>false</td>
					<td>Prevents interaction; renders the trigger in muted disabled style</td>
				</tr>
				<tr>
					<td><code>loading</code></td>
					<td>boolean</td>
					<td>false</td>
					<td>Shows skeleton shimmer while model list is fetching</td>
				</tr>
				<tr>
					<td><code>error</code></td>
					<td>string | null</td>
					<td>null</td>
					<td>When set, renders an error badge on the trigger and hint text below</td>
				</tr>
				<tr>
					<td><code>onSelect</code></td>
					<td>(model: Model) => void</td>
					<td>—</td>
					<td>Callback fired when the user picks a different model</td>
				</tr>
				<tr>
					<td><code>Model.type</code></td>
					<td>'LLM' | 'Vision' | 'Code'</td>
					<td>—</td>
					<td>Category badge shown on each option — drives badge color</td>
				</tr>
				<tr>
					<td><code>Model.speed</code></td>
					<td>'fast' | 'medium' | 'slow'</td>
					<td>—</td>
					<td>Speed indicator rendered in comparison card grid</td>
				</tr>
				<tr>
					<td><code>Model.cost</code></td>
					<td>'$' | '$$' | '$$$'</td>
					<td>—</td>
					<td>Cost tier displayed next to speed in comparison cards</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	/* ── Wrapper ─────────────────────────────────────────────────── */
	.ms-wrapper {
		position: relative;
		display: inline-flex;
		flex-direction: column;
	}

	.ms-wrapper--static {
		/* no extra rules needed; used as selector hook */
	}

	/* ── Trigger button ──────────────────────────────────────────── */
	.ms-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 12px;
		height: 36px;
		border-radius: 8px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.12));
		background: var(--dt4, #fff);
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		color: var(--dt, #111);
		transition: border-color 0.14s, box-shadow 0.14s, background 0.14s;
		white-space: nowrap;
		min-width: 220px;
	}

	.ms-trigger:hover:not(.ms-trigger--disabled):not(.ms-trigger--loading) {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px color-mix(in srgb, #6366f1 12%, transparent);
	}

	.ms-trigger:focus-visible {
		outline: 2px solid #6366f1;
		outline-offset: 2px;
	}

	.ms-trigger--open {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px color-mix(in srgb, #6366f1 12%, transparent);
	}

	.ms-trigger--disabled {
		opacity: 0.45;
		cursor: not-allowed;
		background: var(--dt4, #f4f4f5);
	}

	.ms-trigger--loading {
		cursor: default;
		pointer-events: none;
	}

	.ms-trigger--error {
		border-color: #ef4444;
	}

	.ms-trigger__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ms-trigger__name {
		font-weight: 500;
		color: var(--dt, #111);
		flex: 1;
	}

	.ms-trigger__provider {
		font-size: 11px;
		color: var(--dt2, #555);
		font-weight: 400;
	}

	.ms-trigger__chevron {
		color: var(--dt3, #888);
		transition: transform 0.18s;
		flex-shrink: 0;
	}

	.ms-trigger__chevron--up {
		transform: rotate(180deg);
	}

	/* Dark mode: trigger */
	:global(.dark) .ms-trigger {
		background: var(--dt4, rgba(255,255,255,0.05));
		border-color: var(--dbd, rgba(255,255,255,0.1));
		color: var(--dt, rgba(255,255,255,0.9));
	}

	:global(.dark) .ms-trigger:hover:not(.ms-trigger--disabled):not(.ms-trigger--loading) {
		border-color: #818cf8;
		box-shadow: 0 0 0 3px rgba(129,140,248,0.15);
	}

	:global(.dark) .ms-trigger--open {
		border-color: #818cf8;
		box-shadow: 0 0 0 3px rgba(129,140,248,0.15);
	}

	:global(.dark) .ms-trigger__name {
		color: rgba(255,255,255,0.9);
	}

	:global(.dark) .ms-trigger__provider {
		color: rgba(255,255,255,0.45);
	}

	:global(.dark) .ms-trigger__chevron {
		color: rgba(255,255,255,0.35);
	}

	/* ── Backdrop (click-outside to close) ───────────────────────── */
	.ms-backdrop {
		position: fixed;
		inset: 0;
		z-index: 49;
	}

	/* ── Dropdown ────────────────────────────────────────────────── */
	.ms-dropdown {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		min-width: 100%;
		width: max-content;
		max-width: 320px;
		z-index: 50;
		border-radius: 10px;
		background: var(--dt4, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		box-shadow:
			0 4px 6px -1px rgba(0,0,0,0.07),
			0 10px 28px -4px rgba(0,0,0,0.12);
		padding: 4px;
		overflow: hidden;
	}

	.ms-dropdown--grouped {
		max-width: 340px;
	}

	:global(.dark) .ms-dropdown {
		background: rgba(22,22,28,0.98);
		border-color: rgba(255,255,255,0.08);
		box-shadow:
			0 4px 6px rgba(0,0,0,0.3),
			0 12px 32px rgba(0,0,0,0.45);
	}

	/* ── Option ──────────────────────────────────────────────────── */
	.ms-option {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 7px 9px;
		border: none;
		border-radius: 7px;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background 0.1s;
	}

	.ms-option:hover {
		background: var(--dbd, rgba(0,0,0,0.04));
	}

	.ms-option--selected {
		background: color-mix(in srgb, #6366f1 8%, transparent);
	}

	.ms-option--grouped {
		padding-left: 10px;
	}

	:global(.dark) .ms-option:hover {
		background: rgba(255,255,255,0.06);
	}

	:global(.dark) .ms-option--selected {
		background: rgba(99,102,241,0.12);
	}

	.ms-option__check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		color: #6366f1;
	}

	:global(.dark) .ms-option__check {
		color: #818cf8;
	}

	.ms-option__info {
		display: flex;
		flex-direction: column;
		gap: 1px;
		flex: 1;
		min-width: 0;
	}

	.ms-option__name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #111);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ms-option__provider {
		font-size: 11px;
		color: var(--dt2, #666);
		font-weight: 400;
	}

	:global(.dark) .ms-option__name {
		color: rgba(255,255,255,0.88);
	}

	:global(.dark) .ms-option__provider {
		color: rgba(255,255,255,0.4);
	}

	/* ── Type badge ──────────────────────────────────────────────── */
	.ms-badge {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.04em;
		padding: 2px 6px;
		border-radius: 4px;
		background: color-mix(in srgb, var(--badge-color, #6366f1) 12%, transparent);
		color: var(--badge-color, #6366f1);
		flex-shrink: 0;
	}

	:global(.dark) .ms-badge {
		background: color-mix(in srgb, var(--badge-color, #818cf8) 18%, transparent);
	}

	/* ── Group labels & dividers ─────────────────────────────────── */
	.ms-group-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt3, #999);
		padding: 8px 10px 3px;
	}

	.ms-group-divider {
		height: 1px;
		background: var(--dbd, rgba(0,0,0,0.07));
		margin: 4px 6px;
	}

	:global(.dark) .ms-group-label {
		color: rgba(255,255,255,0.3);
	}

	:global(.dark) .ms-group-divider {
		background: rgba(255,255,255,0.06);
	}

	.ms-provider-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ms-check-inline {
		display: flex;
		align-items: center;
		color: #6366f1;
		flex-shrink: 0;
	}

	:global(.dark) .ms-check-inline {
		color: #818cf8;
	}

	/* ── Compact pill ────────────────────────────────────────────── */
	.ms-chat-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		max-width: 520px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 12px;
		background: var(--dt4, #fafafa);
		padding: 6px 6px 6px 14px;
	}

	:global(.dark) .ms-chat-bar {
		background: rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.08);
	}

	.ms-chat-bar__input {
		flex: 1;
		font-size: 13px;
		color: var(--dt3, #aaa);
	}

	.ms-chat-bar__actions {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ms-pill-wrapper {
		position: relative;
	}

	.ms-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 8px 3px 6px;
		border-radius: 20px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		background: var(--dt4, #fff);
		cursor: pointer;
		font-family: inherit;
		font-size: 11.5px;
		font-weight: 500;
		color: var(--dt, #111);
		transition: border-color 0.12s, background 0.12s;
		white-space: nowrap;
	}

	.ms-pill:hover {
		border-color: #6366f1;
		background: color-mix(in srgb, #6366f1 5%, var(--dt4, #fff));
	}

	:global(.dark) .ms-pill {
		background: rgba(255,255,255,0.07);
		border-color: rgba(255,255,255,0.1);
		color: rgba(255,255,255,0.85);
	}

	:global(.dark) .ms-pill:hover {
		border-color: #818cf8;
		background: rgba(129,140,248,0.1);
	}

	.ms-pill__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ms-pill__name {
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ms-pill__chevron {
		color: var(--dt3, #aaa);
		flex-shrink: 0;
		transition: transform 0.15s;
	}

	.ms-send-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 8px;
		border: none;
		background: #6366f1;
		color: #fff;
		cursor: pointer;
		transition: background 0.12s;
		flex-shrink: 0;
	}

	.ms-send-btn:hover {
		background: #4f46e5;
	}

	/* Pill dropdown (pops above the trigger) */
	.ms-pill-dropdown {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		width: 240px;
		z-index: 50;
		border-radius: 10px;
		background: var(--dt4, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		box-shadow:
			0 -4px 12px rgba(0,0,0,0.08),
			0 -1px 3px rgba(0,0,0,0.04);
		padding: 4px;
	}

	:global(.dark) .ms-pill-dropdown {
		background: rgba(22,22,28,0.98);
		border-color: rgba(255,255,255,0.08);
		box-shadow: 0 -8px 24px rgba(0,0,0,0.4);
	}

	.ms-pill-option {
		display: flex;
		align-items: center;
		gap: 7px;
		width: 100%;
		padding: 6px 9px;
		border: none;
		border-radius: 6px;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background 0.1s;
	}

	.ms-pill-option:hover {
		background: var(--dbd, rgba(0,0,0,0.04));
	}

	.ms-pill-option--active {
		background: color-mix(in srgb, #6366f1 8%, transparent);
	}

	:global(.dark) .ms-pill-option:hover {
		background: rgba(255,255,255,0.06);
	}

	:global(.dark) .ms-pill-option--active {
		background: rgba(99,102,241,0.13);
	}

	.ms-pill-option__name {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--dt, #111);
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ms-pill-option__sub {
		font-size: 10.5px;
		color: var(--dt3, #999);
	}

	:global(.dark) .ms-pill-option__name {
		color: rgba(255,255,255,0.88);
	}

	:global(.dark) .ms-pill-option__sub {
		color: rgba(255,255,255,0.35);
	}

	/* ── Comparison card grid ────────────────────────────────────── */
	.ms-card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		gap: 10px;
	}

	.ms-model-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
		border-radius: 10px;
		border: 1.5px solid var(--dbd, rgba(0,0,0,0.1));
		background: var(--dt4, #fafafa);
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: border-color 0.14s, box-shadow 0.14s, background 0.14s;
	}

	.ms-model-card:hover {
		border-color: #6366f1;
		background: color-mix(in srgb, #6366f1 4%, var(--dt4, #fafafa));
	}

	.ms-model-card--selected {
		border-color: #6366f1;
		background: color-mix(in srgb, #6366f1 6%, var(--dt4, #fafafa));
		box-shadow: 0 0 0 3px color-mix(in srgb, #6366f1 15%, transparent);
	}

	:global(.dark) .ms-model-card {
		background: rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.09);
	}

	:global(.dark) .ms-model-card:hover {
		border-color: #818cf8;
		background: rgba(129,140,248,0.07);
	}

	:global(.dark) .ms-model-card--selected {
		border-color: #818cf8;
		background: rgba(129,140,248,0.1);
		box-shadow: 0 0 0 3px rgba(129,140,248,0.18);
	}

	.ms-model-card__header {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ms-model-card__provider-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ms-model-card__name {
		font-size: 12.5px;
		font-weight: 600;
		color: var(--dt, #111);
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .ms-model-card__name {
		color: rgba(255,255,255,0.9);
	}

	.ms-model-card__check {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #6366f1;
		color: #fff;
		flex-shrink: 0;
	}

	.ms-model-card__provider {
		font-size: 11px;
		font-weight: 500;
		margin-top: -4px;
	}

	.ms-model-card__caps {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.ms-cap-tag {
		font-size: 10px;
		font-weight: 500;
		padding: 2px 6px;
		border-radius: 4px;
		background: var(--dbd, rgba(0,0,0,0.06));
		color: var(--dt2, #555);
	}

	:global(.dark) .ms-cap-tag {
		background: rgba(255,255,255,0.07);
		color: rgba(255,255,255,0.5);
	}

	.ms-model-card__metrics {
		display: flex;
		gap: 10px;
		margin-top: 2px;
	}

	.ms-metric {
		display: flex;
		align-items: center;
		gap: 3px;
		color: var(--dt3, #999);
	}

	.ms-metric__label {
		font-size: 11px;
		font-weight: 500;
	}

	/* ── States grid ─────────────────────────────────────────────── */
	.ms-states-grid {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.ms-state-item {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.ms-state-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3, #999);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-width: 64px;
	}

	/* ── Shimmer skeleton ────────────────────────────────────────── */
	@keyframes ms-shimmer {
		0%   { background-position: -200% center; }
		100% { background-position:  200% center; }
	}

	.ms-shimmer {
		border-radius: 4px;
		background: linear-gradient(
			90deg,
			var(--dbd, rgba(0,0,0,0.07)) 25%,
			var(--dbd2, rgba(0,0,0,0.12)) 50%,
			var(--dbd, rgba(0,0,0,0.07)) 75%
		);
		background-size: 200% 100%;
		animation: ms-shimmer 1.4s ease-in-out infinite;
	}

	:global(.dark) .ms-shimmer {
		background: linear-gradient(
			90deg,
			rgba(255,255,255,0.06) 25%,
			rgba(255,255,255,0.12) 50%,
			rgba(255,255,255,0.06) 75%
		);
		background-size: 200% 100%;
	}

	.ms-shimmer--dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.ms-shimmer--name {
		width: 100px;
		height: 12px;
		flex-shrink: 0;
	}

	.ms-shimmer--sub {
		width: 54px;
		height: 10px;
		flex-shrink: 0;
	}

	/* ── Error state ─────────────────────────────────────────────── */
	.ms-trigger-error-wrap {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ms-error-badge {
		display: inline-flex;
		align-items: center;
		padding: 1px 7px;
		border-radius: 20px;
		background: rgba(239,68,68,0.12);
		color: #ef4444;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.03em;
		flex-shrink: 0;
	}

	.ms-error-hint {
		font-size: 11px;
		color: #ef4444;
		margin-left: 2px;
	}
</style>
