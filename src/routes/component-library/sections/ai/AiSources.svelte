<script lang="ts">
	// ── Inline Citations ──────────────────────────────────────────────────────
	let hoveredCitation = $state<number | null>(null);
	let activeCitation = $state<number | null>(null);

	const citationSources = [
		{ id: 1, title: 'IPCC Sixth Assessment Report', domain: 'ipcc.ch', snippet: 'Human influence has warmed the atmosphere, ocean and land at an unprecedented rate.' },
		{ id: 2, title: 'NASA Global Climate Change — Vital Signs', domain: 'climate.nasa.gov', snippet: 'The planet\'s average surface temperature has risen about 1.1°C since the late 19th century.' },
		{ id: 3, title: 'NOAA Annual Greenhouse Gas Index', domain: 'noaa.gov', snippet: 'CO₂ levels reached 421 ppm in 2023, the highest in over 800,000 years of ice-core records.' },
	];

	// ── Source Cards ──────────────────────────────────────────────────────────
	let sourcesExpanded = $state(true);

	const sourceDocs = [
		{ id: 1, title: 'SvelteKit Documentation — Routing', url: 'kit.svelte.dev/docs/routing', domain: 'kit.svelte.dev', relevance: 98, favicon: 'S' },
		{ id: 2, title: 'Svelte 5 Runes RFC — Reactivity Overhaul', url: 'github.com/sveltejs/rfcs/pull/31', domain: 'github.com', relevance: 94, favicon: 'G' },
		{ id: 3, title: 'MDN Web Docs — Web Components Guide', url: 'developer.mozilla.org/en-US/docs/Web', domain: 'developer.mozilla.org', relevance: 87, favicon: 'M' },
		{ id: 4, title: 'CSS Tricks — Modern Layout Techniques', url: 'css-tricks.com/snippets/css/complete-guide-grid', domain: 'css-tricks.com', relevance: 71, favicon: 'C' },
	];

	// ── Source in Context ─────────────────────────────────────────────────────
	let linkedCitation = $state<number | null>(null);

	const contextSources = [
		{ id: 1, title: 'Attention Is All You Need', domain: 'arxiv.org', url: 'arxiv.org/abs/1706.03762', snippet: 'The original transformer architecture paper introducing self-attention mechanisms.', relevance: 99 },
		{ id: 2, title: 'BERT: Pre-training of Deep Bidirectional Transformers', domain: 'arxiv.org', url: 'arxiv.org/abs/1810.04805', snippet: 'Bidirectional encoder representations from transformers for NLP pre-training.', relevance: 96 },
		{ id: 3, title: 'Language Models are Few-Shot Learners', domain: 'arxiv.org', url: 'arxiv.org/abs/2005.14165', snippet: 'GPT-3 paper demonstrating in-context learning capabilities at scale.', relevance: 91 },
	];

	function highlightLinked(id: number | null) {
		linkedCitation = id;
	}

	// ── Source Variants ───────────────────────────────────────────────────────
	const variantSources = [
		{
			id: 1,
			title: 'OpenAI — GPT-4 Technical Report',
			url: 'openai.com/research/gpt-4',
			domain: 'openai.com',
			snippet: 'GPT-4 is a large multimodal model that accepts image and text inputs and produces text outputs. It exhibits human-level performance on various professional and academic benchmarks.',
			relevance: 97,
			favicon: 'O',
		},
		{
			id: 2,
			title: 'Anthropic — Claude Model Card',
			url: 'anthropic.com/model-card',
			domain: 'anthropic.com',
			snippet: 'Claude is trained by Anthropic, and our mission is the responsible development and maintenance of advanced AI for the long-term benefit of humanity.',
			relevance: 93,
			favicon: 'A',
		},
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Sources & Citations</h2>
	<p class="ds-desc">Inline citation badges and source reference cards for grounding AI responses with verifiable references.</p>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 1. Inline Citations                                                     -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Inline Citations</h3>
		<p class="ds-card__sub">Superscript citation badges embedded within AI-generated prose. Hover for a tooltip, click to highlight the source.</p>

		<div class="sr-prose-wrap">
			<p class="sr-prose">
				Global average temperatures have risen by approximately 1.1°C above pre-industrial levels,
				primarily driven by anthropogenic greenhouse gas emissions.<button
					class="sr-cite"
					class:sr-cite--active={activeCitation === 1}
					onmouseenter={() => hoveredCitation = 1}
					onmouseleave={() => hoveredCitation = null}
					onclick={() => activeCitation = activeCitation === 1 ? null : 1}
					aria-label="Citation 1: {citationSources[0].title}"
				>1{#if hoveredCitation === 1 || activeCitation === 1}<span class="sr-cite__tooltip" role="tooltip">{citationSources[0].title}<span class="sr-cite__tooltip-domain">{citationSources[0].domain}</span></span>{/if}</button>
				Carbon dioxide concentrations have reached 421&nbsp;ppm — the highest in 800,000 years of
				ice-core records.<button
					class="sr-cite"
					class:sr-cite--active={activeCitation === 3}
					onmouseenter={() => hoveredCitation = 3}
					onmouseleave={() => hoveredCitation = null}
					onclick={() => activeCitation = activeCitation === 3 ? null : 3}
					aria-label="Citation 3: {citationSources[2].title}"
				>3{#if hoveredCitation === 3 || activeCitation === 3}<span class="sr-cite__tooltip" role="tooltip">{citationSources[2].title}<span class="sr-cite__tooltip-domain">{citationSources[2].domain}</span></span>{/if}</button>
				Without significant mitigation, models project warming of 2–4°C by 2100,
				with severe consequences for ecosystems and human societies.<button
					class="sr-cite"
					class:sr-cite--active={activeCitation === 2}
					onmouseenter={() => hoveredCitation = 2}
					onmouseleave={() => hoveredCitation = null}
					onclick={() => activeCitation = activeCitation === 2 ? null : 2}
					aria-label="Citation 2: {citationSources[1].title}"
				>2{#if hoveredCitation === 2 || activeCitation === 2}<span class="sr-cite__tooltip" role="tooltip">{citationSources[1].title}<span class="sr-cite__tooltip-domain">{citationSources[1].domain}</span></span>{/if}</button>
			</p>

			{#if activeCitation !== null}
				{@const src = citationSources.find(s => s.id === activeCitation)}
				{#if src}
					<div class="sr-cite-detail" role="region" aria-label="Citation detail">
						<div class="sr-cite-detail__badge">{src.id}</div>
						<div class="sr-cite-detail__body">
							<p class="sr-cite-detail__title">{src.title}</p>
							<p class="sr-cite-detail__domain">{src.domain}</p>
							<p class="sr-cite-detail__snippet">"{src.snippet}"</p>
						</div>
						<button class="sr-cite-detail__close" onclick={() => activeCitation = null} aria-label="Close citation">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</div>
				{/if}
			{/if}

			<div class="sr-cite-legend">
				{#each citationSources as src}
					<button
						class="sr-cite-legend__item"
						class:sr-cite-legend__item--active={activeCitation === src.id}
						onclick={() => activeCitation = activeCitation === src.id ? null : src.id}
					>
						<span class="sr-cite-legend__num">{src.id}</span>
						<span class="sr-cite-legend__title">{src.title}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 2. Source Cards                                                         -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Source Cards</h3>
		<p class="ds-card__sub">Expandable reference list with favicon placeholder, domain, title, and relevance score bar. Click the chevron to collapse.</p>

		<div class="sr-sources-block">
			<button
				class="sr-sources-header"
				onclick={() => sourcesExpanded = !sourcesExpanded}
				aria-expanded={sourcesExpanded}
				aria-controls="sr-sources-list"
			>
				<span class="sr-sources-header__icon">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
				</span>
				<span class="sr-sources-header__label">Sources</span>
				<span class="sr-sources-header__count">{sourceDocs.length}</span>
				<span class="sr-sources-header__chevron" class:sr-sources-header__chevron--open={sourcesExpanded}>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
				</span>
			</button>

			{#if sourcesExpanded}
				<ul class="sr-sources-list" id="sr-sources-list" role="list">
					{#each sourceDocs as doc}
						<li class="sr-source-card">
							<span class="sr-source-card__num">{doc.id}</span>
							<span class="sr-source-card__favicon" aria-hidden="true">{doc.favicon}</span>
							<div class="sr-source-card__body">
								<p class="sr-source-card__title">{doc.title}</p>
								<p class="sr-source-card__url">{doc.url}</p>
								<div class="sr-source-card__bar-row" aria-label="Relevance {doc.relevance}%">
									<div class="sr-source-card__bar">
										<div class="sr-source-card__bar-fill" style="width: {doc.relevance}%"></div>
									</div>
									<span class="sr-source-card__bar-pct">{doc.relevance}%</span>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 3. Source in Context                                                    -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Source in Context</h3>
		<p class="ds-card__sub">Full AI response bubble with linked citations. Click a badge to highlight the corresponding source in the panel below.</p>

		<div class="sr-context-wrap">
			<!-- AI response bubble -->
			<div class="sr-bubble" role="article" aria-label="AI response">
				<div class="sr-bubble__avatar" aria-hidden="true">AI</div>
				<div class="sr-bubble__content">
					<p class="sr-bubble__text">
						The transformer architecture<button
							class="sr-cite sr-cite--sm"
							class:sr-cite--active={linkedCitation === 1}
							onmouseenter={() => highlightLinked(1)}
							onmouseleave={() => highlightLinked(null)}
							onclick={() => linkedCitation = linkedCitation === 1 ? null : 1}
							aria-label="Citation 1"
						>1</button>
						revolutionized natural language processing by replacing recurrent networks with
						self-attention mechanisms, enabling massively parallel training. Building on this,
						BERT<button
							class="sr-cite sr-cite--sm"
							class:sr-cite--active={linkedCitation === 2}
							onmouseenter={() => highlightLinked(2)}
							onmouseleave={() => highlightLinked(null)}
							onclick={() => linkedCitation = linkedCitation === 2 ? null : 2}
							aria-label="Citation 2"
						>2</button>
						introduced bidirectional pre-training that significantly improved downstream task
						performance. Scaling these ideas further, GPT-3<button
							class="sr-cite sr-cite--sm"
							class:sr-cite--active={linkedCitation === 3}
							onmouseenter={() => highlightLinked(3)}
							onmouseleave={() => highlightLinked(null)}
							onclick={() => linkedCitation = linkedCitation === 3 ? null : 3}
							aria-label="Citation 3"
						>3</button>
						demonstrated emergent few-shot learning capabilities at 175 billion parameters.
					</p>
				</div>
			</div>

			<!-- Sources panel -->
			<div class="sr-context-panel" role="complementary" aria-label="Referenced sources">
				<p class="sr-context-panel__label">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
					Referenced sources
				</p>
				{#each contextSources as src}
					<div
						class="sr-ctx-source"
						class:sr-ctx-source--linked={linkedCitation === src.id}
						onmouseenter={() => highlightLinked(src.id)}
						onmouseleave={() => highlightLinked(null)}
						role="listitem"
					>
						<span class="sr-ctx-source__num" class:sr-ctx-source__num--active={linkedCitation === src.id}>{src.id}</span>
						<div class="sr-ctx-source__body">
							<p class="sr-ctx-source__title">{src.title}</p>
							<p class="sr-ctx-source__domain">{src.domain}</p>
						</div>
						<span class="sr-ctx-source__score">{src.relevance}%</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 4. Source Variants                                                      -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Source Variants</h3>
		<p class="ds-card__sub">Three display densities for source references: compact, medium, and detailed — shown side by side for comparison.</p>

		<div class="sr-variants-grid">
			<!-- Compact -->
			<div class="sr-variant-col">
				<p class="sr-variant-col__label">Compact</p>
				<div class="sr-variant-list">
					{#each variantSources as src}
						<div class="sr-variant sr-variant--compact">
							<span class="sr-variant__num">{src.id}</span>
							<span class="sr-variant__title">{src.title}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Medium -->
			<div class="sr-variant-col">
				<p class="sr-variant-col__label">Medium</p>
				<div class="sr-variant-list">
					{#each variantSources as src}
						<div class="sr-variant sr-variant--medium">
							<div class="sr-variant__top">
								<span class="sr-variant__num">{src.id}</span>
								<span class="sr-variant__favicon" aria-hidden="true">{src.favicon}</span>
								<span class="sr-variant__title">{src.title}</span>
							</div>
							<p class="sr-variant__url">{src.url}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Detailed -->
			<div class="sr-variant-col">
				<p class="sr-variant-col__label">Detailed</p>
				<div class="sr-variant-list">
					{#each variantSources as src}
						<div class="sr-variant sr-variant--detailed">
							<div class="sr-variant__top">
								<span class="sr-variant__num">{src.id}</span>
								<span class="sr-variant__favicon" aria-hidden="true">{src.favicon}</span>
								<div>
									<p class="sr-variant__title">{src.title}</p>
									<p class="sr-variant__url">{src.url}</p>
								</div>
							</div>
							<p class="sr-variant__snippet">"{src.snippet}"</p>
							<div class="sr-variant__bar-row" aria-label="Relevance {src.relevance}%">
								<div class="sr-variant__bar">
									<div class="sr-variant__bar-fill" style="width: {src.relevance}%"></div>
								</div>
								<span class="sr-variant__bar-pct">{src.relevance}%</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<!-- 5. Props Reference                                                      -->
	<!-- ═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Props Reference</h3>
		<p class="ds-card__sub">Data shape and configuration options for citation and source components.</p>

		<p class="sr-table-heading">Citation Badge</p>
		<div class="sr-table-wrap">
			<table class="sr-table">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code class="sr-code">id</code></td>
						<td><span class="sr-type">number</span></td>
						<td>—</td>
						<td>Unique citation number displayed in the badge</td>
					</tr>
					<tr>
						<td><code class="sr-code">active</code></td>
						<td><span class="sr-type">boolean</span></td>
						<td><code class="sr-code">false</code></td>
						<td>Whether the citation is currently highlighted</td>
					</tr>
					<tr>
						<td><code class="sr-code">tooltip</code></td>
						<td><span class="sr-type">string</span></td>
						<td><code class="sr-code">undefined</code></td>
						<td>Short source title shown on hover</td>
					</tr>
					<tr>
						<td><code class="sr-code">onclick</code></td>
						<td><span class="sr-type">() => void</span></td>
						<td><code class="sr-code">undefined</code></td>
						<td>Handler called when the badge is clicked</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="sr-table-heading" style="margin-top: 20px;">Source Item</p>
		<div class="sr-table-wrap">
			<table class="sr-table">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code class="sr-code">id</code></td>
						<td><span class="sr-type">number</span></td>
						<td>—</td>
						<td>Sequential reference number matching citation badges</td>
					</tr>
					<tr>
						<td><code class="sr-code">title</code></td>
						<td><span class="sr-type">string</span></td>
						<td>—</td>
						<td>Document or page title</td>
					</tr>
					<tr>
						<td><code class="sr-code">url</code></td>
						<td><span class="sr-type">string</span></td>
						<td>—</td>
						<td>Full URL or display path to the source</td>
					</tr>
					<tr>
						<td><code class="sr-code">domain</code></td>
						<td><span class="sr-type">string</span></td>
						<td>—</td>
						<td>Hostname shown as secondary label</td>
					</tr>
					<tr>
						<td><code class="sr-code">snippet</code></td>
						<td><span class="sr-type">string</span></td>
						<td><code class="sr-code">undefined</code></td>
						<td>Short excerpt from the source document (detailed variant)</td>
					</tr>
					<tr>
						<td><code class="sr-code">relevance</code></td>
						<td><span class="sr-type">number</span></td>
						<td><code class="sr-code">undefined</code></td>
						<td>0–100 relevance score rendered as a progress bar</td>
					</tr>
					<tr>
						<td><code class="sr-code">favicon</code></td>
						<td><span class="sr-type">string</span></td>
						<td><code class="sr-code">undefined</code></td>
						<td>Single-character fallback when favicon image unavailable</td>
					</tr>
					<tr>
						<td><code class="sr-code">variant</code></td>
						<td><span class="sr-type">'compact' | 'medium' | 'detailed'</span></td>
						<td><code class="sr-code">'medium'</code></td>
						<td>Display density controlling visible fields</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="sr-table-heading" style="margin-top: 20px;">Sources Block</p>
		<div class="sr-table-wrap">
			<table class="sr-table">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code class="sr-code">sources</code></td>
						<td><span class="sr-type">SourceItem[]</span></td>
						<td>—</td>
						<td>Array of source items to display</td>
					</tr>
					<tr>
						<td><code class="sr-code">expanded</code></td>
						<td><span class="sr-type">boolean</span></td>
						<td><code class="sr-code">true</code></td>
						<td>Whether the sources list is initially open</td>
					</tr>
					<tr>
						<td><code class="sr-code">variant</code></td>
						<td><span class="sr-type">'compact' | 'medium' | 'detailed'</span></td>
						<td><code class="sr-code">'medium'</code></td>
						<td>Passed to each child SourceItem</td>
					</tr>
					<tr>
						<td><code class="sr-code">linkedId</code></td>
						<td><span class="sr-type">number | null</span></td>
						<td><code class="sr-code">null</code></td>
						<td>ID of the source currently linked/highlighted from inline citation</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<style>
	/* ── Inline Citations ───────────────────────────────────────────────────── */
	.sr-prose-wrap {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.sr-prose {
		font-size: 14px;
		line-height: 1.75;
		color: var(--dt, #111);
		margin: 0;
	}

	:global(.dark) .sr-prose {
		color: var(--dt, #e5e5e5);
	}

	.sr-cite {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		vertical-align: super;
		font-size: 10px;
		font-weight: 700;
		line-height: 1;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		margin-left: 2px;
		border-radius: 4px;
		background: rgba(99, 102, 241, 0.12);
		color: #6366f1;
		border: 1px solid rgba(99, 102, 241, 0.25);
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		font-family: inherit;
	}

	.sr-cite:hover,
	.sr-cite--active {
		background: #6366f1;
		color: #fff;
		border-color: #6366f1;
	}

	.sr-cite--sm {
		font-size: 9px;
		min-width: 14px;
		height: 14px;
	}

	:global(.dark) .sr-cite {
		background: rgba(129, 140, 248, 0.15);
		color: #a5b4fc;
		border-color: rgba(129, 140, 248, 0.3);
	}

	:global(.dark) .sr-cite:hover,
	:global(.dark) .sr-cite--active {
		background: #6366f1;
		color: #fff;
		border-color: #6366f1;
	}

	.sr-cite__tooltip {
		position: absolute;
		bottom: calc(100% + 6px);
		left: 50%;
		transform: translateX(-50%);
		background: #1e1e2e;
		color: #e5e5e5;
		font-size: 11px;
		font-weight: 400;
		line-height: 1.4;
		padding: 6px 10px;
		border-radius: 6px;
		white-space: nowrap;
		max-width: 240px;
		white-space: normal;
		text-align: left;
		pointer-events: none;
		z-index: 10;
		box-shadow: 0 4px 12px rgba(0,0,0,0.25);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.sr-cite__tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: #1e1e2e;
	}

	.sr-cite__tooltip-domain {
		font-size: 10px;
		color: #a5b4fc;
		margin-top: 2px;
		display: block;
	}

	.sr-cite-detail {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 14px;
		background: rgba(99, 102, 241, 0.06);
		border: 1px solid rgba(99, 102, 241, 0.2);
		border-radius: 8px;
		animation: sr-fadein 0.15s ease;
	}

	:global(.dark) .sr-cite-detail {
		background: rgba(99, 102, 241, 0.1);
		border-color: rgba(99, 102, 241, 0.25);
	}

	@keyframes sr-fadein {
		from { opacity: 0; transform: translateY(-4px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.sr-cite-detail__badge {
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		background: #6366f1;
		color: #fff;
		font-size: 11px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sr-cite-detail__body {
		flex: 1;
		min-width: 0;
	}

	.sr-cite-detail__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #111);
		margin: 0 0 2px;
	}

	:global(.dark) .sr-cite-detail__title {
		color: #e5e5e5;
	}

	.sr-cite-detail__domain {
		font-size: 11px;
		color: #6366f1;
		margin: 0 0 4px;
	}

	.sr-cite-detail__snippet {
		font-size: 12px;
		color: var(--dt3, #666);
		margin: 0;
		font-style: italic;
		line-height: 1.5;
	}

	:global(.dark) .sr-cite-detail__snippet {
		color: var(--dt3, #999);
	}

	.sr-cite-detail__close {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		color: var(--dt3, #888);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
	}

	.sr-cite-detail__close:hover {
		background: rgba(0,0,0,0.06);
		color: var(--dt, #111);
	}

	:global(.dark) .sr-cite-detail__close:hover {
		background: rgba(255,255,255,0.08);
		color: #e5e5e5;
	}

	.sr-cite-legend {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-top: 4px;
		border-top: 1px solid var(--dbd, rgba(0,0,0,0.07));
	}

	:global(.dark) .sr-cite-legend {
		border-top-color: var(--dbd, rgba(255,255,255,0.07));
	}

	.sr-cite-legend__item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 5px 8px;
		border-radius: 6px;
		background: transparent;
		border: 1px solid transparent;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s, border-color 0.12s;
	}

	.sr-cite-legend__item:hover {
		background: var(--dbg2, rgba(0,0,0,0.04));
	}

	.sr-cite-legend__item--active {
		background: rgba(99, 102, 241, 0.07);
		border-color: rgba(99, 102, 241, 0.2);
	}

	:global(.dark) .sr-cite-legend__item--active {
		background: rgba(99, 102, 241, 0.12);
	}

	.sr-cite-legend__num {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		background: rgba(99, 102, 241, 0.12);
		color: #6366f1;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sr-cite-legend__item--active .sr-cite-legend__num {
		background: #6366f1;
		color: #fff;
	}

	.sr-cite-legend__title {
		font-size: 12px;
		color: var(--dt2, #444);
		line-height: 1.3;
	}

	:global(.dark) .sr-cite-legend__title {
		color: var(--dt2, #bbb);
	}

	/* ── Source Cards ───────────────────────────────────────────────────────── */
	.sr-sources-block {
		border: 1px solid var(--dbd, rgba(0,0,0,0.08));
		border-radius: 10px;
		overflow: hidden;
	}

	:global(.dark) .sr-sources-block {
		border-color: var(--dbd, rgba(255,255,255,0.08));
	}

	.sr-sources-header {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 10px 14px;
		background: var(--dbg, #fafafa);
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s;
	}

	.sr-sources-header:hover {
		background: var(--dbg2, #f0f0f0);
	}

	:global(.dark) .sr-sources-header {
		background: var(--dbg, rgba(255,255,255,0.03));
	}

	:global(.dark) .sr-sources-header:hover {
		background: var(--dbg2, rgba(255,255,255,0.06));
	}

	.sr-sources-header__icon {
		color: var(--dt3, #888);
		display: flex;
	}

	.sr-sources-header__label {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2, #555);
		letter-spacing: 0.01em;
	}

	:global(.dark) .sr-sources-header__label {
		color: var(--dt2, #aaa);
	}

	.sr-sources-header__count {
		font-size: 11px;
		font-weight: 600;
		padding: 1px 6px;
		background: var(--dbg2, rgba(0,0,0,0.06));
		color: var(--dt3, #888);
		border-radius: 10px;
	}

	:global(.dark) .sr-sources-header__count {
		background: rgba(255,255,255,0.08);
		color: #999;
	}

	.sr-sources-header__chevron {
		margin-left: auto;
		color: var(--dt3, #aaa);
		display: flex;
		transition: transform 0.2s;
	}

	.sr-sources-header__chevron--open {
		transform: rotate(180deg);
	}

	.sr-sources-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--dbd, rgba(0,0,0,0.06));
	}

	:global(.dark) .sr-sources-list {
		border-top-color: rgba(255,255,255,0.06);
	}

	.sr-source-card {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 11px 14px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.05));
		transition: background 0.1s;
	}

	.sr-source-card:last-child {
		border-bottom: none;
	}

	.sr-source-card:hover {
		background: var(--dbg, rgba(0,0,0,0.02));
	}

	:global(.dark) .sr-source-card:hover {
		background: rgba(255,255,255,0.03);
	}

	.sr-source-card__num {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border-radius: 5px;
		background: rgba(99, 102, 241, 0.1);
		color: #6366f1;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
	}

	.sr-source-card__favicon {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		background: var(--dbg2, #e8e8e8);
		color: var(--dt3, #888);
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
	}

	:global(.dark) .sr-source-card__favicon {
		background: rgba(255,255,255,0.08);
	}

	.sr-source-card__body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.sr-source-card__title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #111);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .sr-source-card__title {
		color: #e5e5e5;
	}

	.sr-source-card__url {
		font-size: 11px;
		color: var(--dt3, #888);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sr-source-card__bar-row {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 2px;
	}

	.sr-source-card__bar {
		flex: 1;
		height: 4px;
		background: var(--dbd2, rgba(0,0,0,0.07));
		border-radius: 2px;
		overflow: hidden;
	}

	:global(.dark) .sr-source-card__bar {
		background: rgba(255,255,255,0.08);
	}

	.sr-source-card__bar-fill {
		height: 100%;
		background: #6366f1;
		border-radius: 2px;
		transition: width 0.4s ease;
	}

	.sr-source-card__bar-pct {
		font-size: 10px;
		font-weight: 600;
		color: var(--dt3, #999);
		min-width: 28px;
		text-align: right;
	}

	/* ── Source in Context ─────────────────────────────────────────────────── */
	.sr-context-wrap {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.sr-bubble {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 14px 16px;
		background: var(--dbg, #f8f8f8);
		border: 1px solid var(--dbd, rgba(0,0,0,0.07));
		border-radius: 12px;
	}

	:global(.dark) .sr-bubble {
		background: rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.07);
	}

	.sr-bubble__avatar {
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		letter-spacing: 0.02em;
	}

	.sr-bubble__content {
		flex: 1;
		min-width: 0;
	}

	.sr-bubble__text {
		font-size: 13.5px;
		line-height: 1.7;
		color: var(--dt, #111);
		margin: 0;
	}

	:global(.dark) .sr-bubble__text {
		color: #e5e5e5;
	}

	.sr-context-panel {
		border: 1px solid var(--dbd, rgba(0,0,0,0.07));
		border-radius: 10px;
		overflow: hidden;
	}

	:global(.dark) .sr-context-panel {
		border-color: rgba(255,255,255,0.07);
	}

	.sr-context-panel__label {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 8px 14px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3, #888);
		letter-spacing: 0.03em;
		text-transform: uppercase;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.06));
		margin: 0;
		background: var(--dbg, #fafafa);
	}

	:global(.dark) .sr-context-panel__label {
		background: rgba(255,255,255,0.03);
		border-bottom-color: rgba(255,255,255,0.06);
	}

	.sr-ctx-source {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.05));
		cursor: pointer;
		transition: background 0.1s;
	}

	.sr-ctx-source:last-child {
		border-bottom: none;
	}

	.sr-ctx-source:hover,
	.sr-ctx-source--linked {
		background: rgba(99, 102, 241, 0.05);
	}

	:global(.dark) .sr-ctx-source:hover,
	:global(.dark) .sr-ctx-source--linked {
		background: rgba(99, 102, 241, 0.09);
	}

	.sr-ctx-source__num {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border-radius: 5px;
		background: rgba(99, 102, 241, 0.1);
		color: #6366f1;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, color 0.15s;
	}

	.sr-ctx-source__num--active {
		background: #6366f1;
		color: #fff;
	}

	.sr-ctx-source__body {
		flex: 1;
		min-width: 0;
	}

	.sr-ctx-source__title {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--dt, #111);
		margin: 0 0 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .sr-ctx-source__title {
		color: #e0e0e0;
	}

	.sr-ctx-source__domain {
		font-size: 11px;
		color: var(--dt3, #999);
		margin: 0;
	}

	.sr-ctx-source__score {
		flex-shrink: 0;
		font-size: 11px;
		font-weight: 600;
		color: #6366f1;
		padding: 2px 6px;
		background: rgba(99, 102, 241, 0.08);
		border-radius: 4px;
	}

	/* ── Source Variants ────────────────────────────────────────────────────── */
	.sr-variants-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	@media (max-width: 700px) {
		.sr-variants-grid {
			grid-template-columns: 1fr;
		}
	}

	.sr-variant-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.sr-variant-col__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3, #888);
		margin: 0 0 2px;
	}

	.sr-variant-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.sr-variant {
		border: 1px solid var(--dbd, rgba(0,0,0,0.08));
		border-radius: 8px;
		transition: border-color 0.15s;
	}

	:global(.dark) .sr-variant {
		border-color: rgba(255,255,255,0.08);
	}

	.sr-variant:hover {
		border-color: rgba(99, 102, 241, 0.35);
	}

	/* Compact */
	.sr-variant--compact {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
	}

	.sr-variant__num {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		background: rgba(99, 102, 241, 0.1);
		color: #6366f1;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sr-variant--compact .sr-variant__title {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt, #111);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .sr-variant--compact .sr-variant__title {
		color: #e0e0e0;
	}

	/* Medium */
	.sr-variant--medium {
		padding: 9px 11px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.sr-variant__top {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.sr-variant__favicon {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		background: var(--dbg2, #e8e8e8);
		color: var(--dt3, #888);
		font-size: 9px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.dark) .sr-variant__favicon {
		background: rgba(255,255,255,0.08);
	}

	.sr-variant--medium .sr-variant__title {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt, #111);
		margin: 0;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .sr-variant--medium .sr-variant__title {
		color: #e0e0e0;
	}

	.sr-variant__url {
		font-size: 10.5px;
		color: var(--dt3, #999);
		margin: 0;
		padding-left: 25px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Detailed */
	.sr-variant--detailed {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.sr-variant--detailed .sr-variant__top {
		align-items: flex-start;
	}

	.sr-variant--detailed .sr-variant__title {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt, #111);
		margin: 0 0 1px;
		line-height: 1.3;
	}

	:global(.dark) .sr-variant--detailed .sr-variant__title {
		color: #e0e0e0;
	}

	.sr-variant--detailed .sr-variant__url {
		font-size: 10px;
		color: var(--dt3, #999);
		margin: 0;
	}

	.sr-variant__snippet {
		font-size: 11px;
		line-height: 1.5;
		color: var(--dt3, #777);
		margin: 0;
		font-style: italic;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(.dark) .sr-variant__snippet {
		color: #888;
	}

	.sr-variant__bar-row {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.sr-variant__bar {
		flex: 1;
		height: 3px;
		background: var(--dbd2, rgba(0,0,0,0.07));
		border-radius: 2px;
		overflow: hidden;
	}

	:global(.dark) .sr-variant__bar {
		background: rgba(255,255,255,0.07);
	}

	.sr-variant__bar-fill {
		height: 100%;
		background: #6366f1;
		border-radius: 2px;
	}

	.sr-variant__bar-pct {
		font-size: 10px;
		font-weight: 600;
		color: #6366f1;
		min-width: 26px;
		text-align: right;
	}

	/* ── Props Reference ────────────────────────────────────────────────────── */
	.sr-table-heading {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2, #555);
		margin: 0 0 8px;
		letter-spacing: 0.01em;
	}

	:global(.dark) .sr-table-heading {
		color: var(--dt2, #aaa);
	}

	.sr-table-wrap {
		overflow-x: auto;
		border: 1px solid var(--dbd, rgba(0,0,0,0.07));
		border-radius: 8px;
	}

	:global(.dark) .sr-table-wrap {
		border-color: rgba(255,255,255,0.07);
	}

	.sr-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 12.5px;
	}

	.sr-table thead {
		background: var(--dbg, #fafafa);
	}

	:global(.dark) .sr-table thead {
		background: rgba(255,255,255,0.03);
	}

	.sr-table th {
		padding: 8px 14px;
		text-align: left;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3, #888);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.07));
	}

	:global(.dark) .sr-table th {
		border-bottom-color: rgba(255,255,255,0.07);
	}

	.sr-table td {
		padding: 8px 14px;
		border-bottom: 1px solid var(--dbd, rgba(0,0,0,0.05));
		color: var(--dt, #333);
		vertical-align: middle;
	}

	:global(.dark) .sr-table td {
		color: #ccc;
		border-bottom-color: rgba(255,255,255,0.05);
	}

	.sr-table tr:last-child td {
		border-bottom: none;
	}

	.sr-table tbody tr:hover {
		background: var(--dbg, rgba(0,0,0,0.02));
	}

	:global(.dark) .sr-table tbody tr:hover {
		background: rgba(255,255,255,0.02);
	}

	.sr-code {
		font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
		font-size: 11.5px;
		padding: 1px 5px;
		background: var(--dbg2, rgba(0,0,0,0.06));
		border-radius: 4px;
		color: var(--dt, #333);
	}

	:global(.dark) .sr-code {
		background: rgba(255,255,255,0.09);
		color: #e0e0e0;
	}

	.sr-type {
		font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
		font-size: 11.5px;
		color: #6366f1;
	}
</style>
