<script lang="ts">
	// ── Card 1: Basic Thinking Panel ──────────────────────────────
	let basicExpanded = $state(false);

	// ── Card 2: Thinking Steps Timeline ──────────────────────────
	let activeStep = $state(1); // 0=done, 1=active, 2=pending, 3=pending

	const steps = [
		{ label: 'Understanding the question', duration: '0.4s', status: 'done' as const },
		{ label: 'Analyzing context', duration: '1.1s', status: 'active' as const },
		{ label: 'Formulating response', duration: null, status: 'pending' as const },
		{ label: 'Reviewing output', duration: null, status: 'pending' as const },
	];

	function advanceStep() {
		activeStep = Math.min(activeStep + 1, steps.length - 1);
	}
	function resetSteps() {
		activeStep = 1;
	}

	let computedSteps = $derived(
		steps.map((s, i) => ({
			...s,
			status: i < activeStep ? ('done' as const) : i === activeStep ? ('active' as const) : ('pending' as const),
		}))
	);

	// ── Card 3: Streaming Reasoning ───────────────────────────────
	let streamingActive = $state(true);
	let streamingText = $state(
		'The user is asking about the difference between SSR and SSG in SvelteKit. Let me break this down carefully.\n\nSSR (Server-Side Rendering) renders pages on each request, giving fresh data but adding latency. SSG (Static Site Generation) pre-renders at build time for maximum performance, but content may be stale.\n\nFor this use case, SSR makes sense because the data changes'
	);

	// ── Card 4: Reasoning Summary ─────────────────────────────────
	let summaryExpanded = $state(false);
	const summaryText = `First, I need to understand what the user is asking. They want to know how to implement authentication in SvelteKit 2 using JWT tokens stored in httpOnly cookies.

Let me think through the architecture. We need a login endpoint that validates credentials, issues a JWT, and sets it as an httpOnly cookie. The SvelteKit hooks.server.ts file should read this cookie on every request and populate locals.user.

For logout, we simply clear the cookie. The form action pattern works well here since it degrades gracefully without JavaScript.

I should also mention token refresh strategy — short-lived access tokens with a separate refresh token flow adds security but complexity. For most apps, a 24-hour JWT is a reasonable tradeoff.`;

	// ── Card 5: Deep Thought / Extended Reasoning ─────────────────
	let deepExpanded = $state(false);
	let deepShowMore = $state(false);

	const deepShort = `The question asks for an optimal sorting algorithm for nearly-sorted arrays with n ≈ 10,000 elements. Let me reason through the candidates.`;

	const deepFull = `The question asks for an optimal sorting algorithm for nearly-sorted arrays with n ≈ 10,000 elements. Let me reason through the candidates.

For nearly-sorted data, insertion sort runs in O(n·k) where k is the maximum displacement of any element from its sorted position. If k is small (say, < 20), insertion sort can outperform even Timsort in practice due to cache locality and zero overhead.

Timsort — used in Python and Java — is specifically designed for real-world data including nearly-sorted sequences. It detects natural runs and merges them efficiently. For n=10,000 with typical real-world data, Timsort is usually the pragmatic choice. Implemented via \`Array.prototype.sort()\` in V8 since 2019.

Consider: if we know the maximum displacement \`k\` statically, we can use a min-heap of size \`k+1\` for an O(n log k) solution. This is optimal when \`k << n\`.

Shell sort with Ciura's gap sequence \`[1, 4, 10, 23, 57, 132, 301, 701]\` is simple to implement and performs well on nearly-sorted data in practice, though its worst-case is harder to analyze.

My recommendation: use the built-in sort (Timsort) unless profiling shows it as a bottleneck. If \`k\` is known and small, a heap-based k-sort beats everything else asymptotically.`;
</script>

<section class="ds-section">
	<h2 class="ds-title">Reasoning</h2>
	<p class="ds-desc">Chain-of-thought and thinking display components. Show AI reasoning process with expandable panels, step timelines, and streaming indicators.</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. Basic Thinking Panel                                    -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Thinking Panel</h3>
		<p class="ds-card__sub">Indigo/purple accented card with brain icon and "Thinking" label. Click to expand or collapse the chain-of-thought content.</p>
		<div class="rs-demo-area">
			<button
				class="rs-panel"
				class:rs-panel--open={basicExpanded}
				onclick={() => (basicExpanded = !basicExpanded)}
				aria-expanded={basicExpanded}
				aria-label="Toggle thinking panel"
			>
				<div class="rs-panel__header">
					<span class="rs-panel__icon-wrap">
						<!-- Brain icon -->
						<svg class="rs-panel__icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9.75 3A6.25 6.25 0 003.5 9.25c0 1.81.77 3.44 2 4.59V17a1 1 0 001 1h3v2h5v-2h1a1 1 0 001-1v-3.16a6.25 6.25 0 00-6.75-9.84z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9.5 10h.01M14.5 10h.01M9.5 14h5" />
						</svg>
					</span>
					<span class="rs-panel__label">Thinking</span>
					<span class="rs-panel__meta">chain-of-thought</span>
					<span class="rs-panel__chevron" class:rs-panel__chevron--open={basicExpanded} aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6" />
						</svg>
					</span>
				</div>
				{#if basicExpanded}
					<div class="rs-panel__body">
						<p class="rs-panel__text">
							The user is asking how to optimally structure a SvelteKit application for a multi-tenant SaaS product. Let me think through the key concerns here.
						</p>
						<p class="rs-panel__text">
							Multi-tenancy in SvelteKit typically means tenant resolution happens at the server level — either via subdomain routing or a path prefix. The cleanest approach is to resolve the tenant in <code class="rs-inline-code">hooks.server.ts</code> and attach it to <code class="rs-inline-code">locals</code> so every load function and action has access without duplication.
						</p>
						<p class="rs-panel__text">
							For data isolation, row-level security in PostgreSQL is the gold standard. Each query should include a <code class="rs-inline-code">WHERE tenant_id = $1</code> clause enforced at the database layer, not just the application layer.
						</p>
						<p class="rs-panel__text">
							I should recommend a clear folder structure: group tenant-scoped routes under <code class="rs-inline-code">(tenant)/</code> layout and put shared/public routes outside. This makes it easy to apply consistent middleware.
						</p>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. Thinking Steps Timeline                                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Thinking Steps Timeline</h3>
		<p class="ds-card__sub">Vertical timeline with numbered steps showing done / active / pending states. Use the controls to advance or reset.</p>
		<div class="rs-demo-area">
			<div class="rs-timeline" role="list" aria-label="Reasoning steps">
				{#each computedSteps as step, i}
					<div class="rs-timeline__step" class:rs-timeline__step--done={step.status === 'done'} class:rs-timeline__step--active={step.status === 'active'} class:rs-timeline__step--pending={step.status === 'pending'} role="listitem">
						<div class="rs-timeline__connector-wrap">
							<div class="rs-timeline__node" aria-label={step.status === 'done' ? 'Completed' : step.status === 'active' ? 'In progress' : 'Pending'}>
								{#if step.status === 'done'}
									<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
									</svg>
								{:else if step.status === 'active'}
									<span class="rs-timeline__spinner" aria-hidden="true"></span>
								{:else}
									<span class="rs-timeline__circle" aria-hidden="true">{i + 1}</span>
								{/if}
							</div>
							{#if i < computedSteps.length - 1}
								<div class="rs-timeline__line" class:rs-timeline__line--filled={step.status === 'done'}></div>
							{/if}
						</div>
						<div class="rs-timeline__content">
							<span class="rs-timeline__label">{step.label}</span>
							{#if step.status === 'done' && step.duration}
								<span class="rs-timeline__duration">{step.duration}</span>
							{:else if step.status === 'active'}
								<span class="rs-timeline__active-label">In progress…</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			<div class="rs-controls">
				<button class="rs-btn rs-btn--primary" onclick={advanceStep} disabled={activeStep >= steps.length - 1}>
					Advance step
				</button>
				<button class="rs-btn rs-btn--ghost" onclick={resetSteps}>Reset</button>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. Streaming Reasoning                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Streaming Reasoning</h3>
		<p class="ds-card__sub">Thinking panel that appears to be typing — animated blinking cursor and "Reasoning…" label with pulsing dots.</p>
		<div class="rs-demo-area">
			<div class="rs-stream" class:rs-stream--active={streamingActive} aria-live="polite" aria-label="Streaming reasoning output">
				<div class="rs-stream__header">
					<span class="rs-stream__icon-wrap" aria-hidden="true">
						<!-- Sparkles icon -->
						<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3zM19 9l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
						</svg>
					</span>
					{#if streamingActive}
						<span class="rs-stream__label">Reasoning</span>
						<span class="rs-stream__dots" aria-hidden="true">
							<span class="rs-stream__dot"></span>
							<span class="rs-stream__dot"></span>
							<span class="rs-stream__dot"></span>
						</span>
					{:else}
						<span class="rs-stream__label rs-stream__label--done">Reasoned</span>
						<span class="rs-stream__done-badge" aria-label="Completed">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
							</svg>
						</span>
					{/if}
				</div>
				<div class="rs-stream__body">
					<p class="rs-stream__text">
						{streamingText}{#if streamingActive}<span class="rs-cursor" aria-hidden="true"></span>{/if}
					</p>
				</div>
			</div>
			<div class="rs-controls">
				<button class="rs-btn rs-btn--primary" onclick={() => (streamingActive = !streamingActive)}>
					{streamingActive ? 'Stop streaming' : 'Resume streaming'}
				</button>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. Reasoning Summary                                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Reasoning Summary</h3>
		<p class="ds-card__sub">Collapsed "Thought for 3.2s" badge that expands to reveal the full reasoning trace. Includes token and step count badges.</p>
		<div class="rs-demo-area">
			<button
				class="rs-summary"
				class:rs-summary--open={summaryExpanded}
				onclick={() => (summaryExpanded = !summaryExpanded)}
				aria-expanded={summaryExpanded}
				aria-label="Toggle reasoning summary"
			>
				<div class="rs-summary__header">
					<span class="rs-summary__icon-wrap" aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<circle cx="12" cy="12" r="10" stroke-width="1.75" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 6v6l4 2" />
						</svg>
					</span>
					<span class="rs-summary__label">Thought for <strong>3.2s</strong></span>
					<span class="rs-summary__badges">
						<span class="rs-badge rs-badge--tokens" aria-label="Token count">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10M7 17h6" />
							</svg>
							412 tokens
						</span>
						<span class="rs-badge rs-badge--steps" aria-label="Step count">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
							</svg>
							4 steps
						</span>
					</span>
					<span class="rs-summary__chevron" class:rs-summary__chevron--open={summaryExpanded} aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</span>
				</div>
				{#if summaryExpanded}
					<div class="rs-summary__body">
						{#each summaryText.split('\n\n') as para}
							<p class="rs-panel__text">{para}</p>
						{/each}
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. Deep Thought / Extended Reasoning                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Deep Thought / Extended Reasoning</h3>
		<p class="ds-card__sub">Long reasoning with multiple paragraphs, inline code references, and a "Show more / Show less" toggle for lengthy content.</p>
		<div class="rs-demo-area">
			<button
				class="rs-panel rs-panel--deep"
				class:rs-panel--open={deepExpanded}
				onclick={() => (deepExpanded = !deepExpanded)}
				aria-expanded={deepExpanded}
				aria-label="Toggle extended reasoning"
			>
				<div class="rs-panel__header">
					<span class="rs-panel__icon-wrap rs-panel__icon-wrap--deep">
						<!-- Lightning bolt / deep thought icon -->
						<svg class="rs-panel__icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</span>
					<span class="rs-panel__label rs-panel__label--deep">Extended Reasoning</span>
					<span class="rs-panel__meta">deep thought · 8.7s</span>
					<span class="rs-panel__chevron rs-panel__chevron--deep" class:rs-panel__chevron--open={deepExpanded} aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6" />
						</svg>
					</span>
				</div>
				{#if deepExpanded}
					<div class="rs-panel__body">
						{#if deepShowMore}
							{#each deepFull.split('\n\n') as para}
								<p class="rs-panel__text">{@html para.replace(/`([^`]+)`/g, '<code class="rs-inline-code">$1</code>')}</p>
							{/each}
						{:else}
							{#each deepShort.split('\n\n') as para}
								<p class="rs-panel__text">{para}</p>
							{/each}
						{/if}
						<!-- Show more / show less — must not be inside the outer button, so use a div + role trick -->
					</div>
					<!-- Toggle below the panel body as a sibling row, outside the collapsing area -->
				{/if}
			</button>
			{#if deepExpanded}
				<div class="rs-show-more-wrap">
					<button
						class="rs-show-more"
						onclick={(e) => { e.stopPropagation(); deepShowMore = !deepShowMore; }}
						aria-label={deepShowMore ? 'Show less reasoning' : 'Show more reasoning'}
					>
						{#if deepShowMore}
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
							</svg>
							Show less
						{:else}
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
							Show more
						{/if}
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 6. Props Reference                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Props Reference</h3>
		<p class="ds-card__sub">Pattern documentation for all reasoning display variants.</p>
		<div class="rs-demo-area rs-demo-area--table">
			<table class="rs-table" aria-label="Reasoning component props reference">
				<thead>
					<tr>
						<th class="rs-table__th">Pattern</th>
						<th class="rs-table__th">Key Props / State</th>
						<th class="rs-table__th">Accent</th>
						<th class="rs-table__th">Use When</th>
					</tr>
				</thead>
				<tbody>
					<tr class="rs-table__row">
						<td class="rs-table__td"><code class="rs-inline-code">BasicPanel</code></td>
						<td class="rs-table__td"><code class="rs-inline-code">expanded: boolean</code></td>
						<td class="rs-table__td"><span class="rs-chip rs-chip--indigo">indigo</span></td>
						<td class="rs-table__td">Simple reasoning toggle, short content</td>
					</tr>
					<tr class="rs-table__row">
						<td class="rs-table__td"><code class="rs-inline-code">StepTimeline</code></td>
						<td class="rs-table__td"><code class="rs-inline-code">steps: Step[], activeIndex: number</code></td>
						<td class="rs-table__td"><span class="rs-chip rs-chip--indigo">indigo</span></td>
						<td class="rs-table__td">Multi-step reasoning with status progression</td>
					</tr>
					<tr class="rs-table__row">
						<td class="rs-table__td"><code class="rs-inline-code">StreamPanel</code></td>
						<td class="rs-table__td"><code class="rs-inline-code">streaming: boolean, text: string</code></td>
						<td class="rs-table__td"><span class="rs-chip rs-chip--purple">purple</span></td>
						<td class="rs-table__td">Live token-by-token reasoning output</td>
					</tr>
					<tr class="rs-table__row">
						<td class="rs-table__td"><code class="rs-inline-code">SummaryPanel</code></td>
						<td class="rs-table__td"><code class="rs-inline-code">duration: string, tokens: number, steps: number</code></td>
						<td class="rs-table__td"><span class="rs-chip rs-chip--indigo">indigo</span></td>
						<td class="rs-table__td">Compact "Thought for Xs" badge with expand</td>
					</tr>
					<tr class="rs-table__row">
						<td class="rs-table__td"><code class="rs-inline-code">DeepPanel</code></td>
						<td class="rs-table__td"><code class="rs-inline-code">content: string, showMore: boolean</code></td>
						<td class="rs-table__td"><span class="rs-chip rs-chip--violet">violet</span></td>
						<td class="rs-table__td">Extended reasoning with truncation toggle</td>
					</tr>
					<tr class="rs-table__row rs-table__row--last">
						<td class="rs-table__td"><code class="rs-inline-code">StepStatus</code></td>
						<td class="rs-table__td"><code class="rs-inline-code">"done" | "active" | "pending"</code></td>
						<td class="rs-table__td"><span class="rs-chip rs-chip--neutral">neutral</span></td>
						<td class="rs-table__td">Step node state: checkmark / spinner / number</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<style>
	/* ── Layout helpers ──────────────────────────────────────────── */
	.rs-demo-area {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.25rem;
		background: var(--dbg2, #f8f9fb);
		border-radius: 0.625rem;
		border: 1px solid var(--dbd, #e5e7eb);
	}

	.rs-demo-area--table {
		padding: 0;
		overflow: hidden;
		background: transparent;
		border: none;
	}

	:global(.dark) .rs-demo-area {
		background: var(--dbg2, rgba(255, 255, 255, 0.03));
		border-color: var(--dbd, rgba(255, 255, 255, 0.08));
	}

	.rs-controls {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	/* ── Buttons ─────────────────────────────────────────────────── */
	.rs-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.875rem;
		border-radius: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, opacity 0.15s, box-shadow 0.15s;
		border: 1px solid transparent;
	}

	.rs-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.rs-btn--primary {
		background: rgba(99, 102, 241, 0.9);
		color: #fff;
		border-color: rgba(99, 102, 241, 1);
	}

	.rs-btn--primary:not(:disabled):hover {
		background: rgba(79, 82, 221, 1);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
	}

	.rs-btn--ghost {
		background: transparent;
		color: var(--dt2, #374151);
		border-color: var(--dbd, #e5e7eb);
	}

	.rs-btn--ghost:hover {
		background: var(--dbg3, rgba(0, 0, 0, 0.04));
	}

	:global(.dark) .rs-btn--ghost {
		color: var(--dt2, rgba(255, 255, 255, 0.75));
		border-color: var(--dbd, rgba(255, 255, 255, 0.1));
	}

	:global(.dark) .rs-btn--ghost:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	/* ── Inline code ─────────────────────────────────────────────── */
	.rs-inline-code {
		display: inline;
		font-family: 'JetBrains Mono', 'Fira Code', 'Menlo', monospace;
		font-size: 0.78em;
		padding: 0.1em 0.35em;
		border-radius: 0.25rem;
		background: rgba(99, 102, 241, 0.1);
		color: rgba(99, 102, 241, 1);
		border: 1px solid rgba(99, 102, 241, 0.2);
	}

	:global(.dark) .rs-inline-code {
		background: rgba(99, 102, 241, 0.15);
		color: rgba(165, 167, 255, 1);
		border-color: rgba(99, 102, 241, 0.3);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Card 1 + 5: Basic Panel & Deep Panel                         */
	/* ══════════════════════════════════════════════════════════════ */
	.rs-panel {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: var(--dbg, #fff);
		border: 1px solid rgba(99, 102, 241, 0.25);
		border-radius: 0.625rem;
		overflow: hidden;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.18s, box-shadow 0.18s;
	}

	.rs-panel:hover {
		border-color: rgba(99, 102, 241, 0.5);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
	}

	.rs-panel--open {
		border-color: rgba(99, 102, 241, 0.45);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}

	.rs-panel--deep {
		border-color: rgba(139, 92, 246, 0.3);
	}

	.rs-panel--deep:hover,
	.rs-panel--deep.rs-panel--open {
		border-color: rgba(139, 92, 246, 0.55);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	:global(.dark) .rs-panel {
		background: var(--dbg, rgba(255, 255, 255, 0.04));
		border-color: rgba(99, 102, 241, 0.2);
	}

	:global(.dark) .rs-panel:hover,
	:global(.dark) .rs-panel--open {
		border-color: rgba(99, 102, 241, 0.45);
	}

	.rs-panel__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 0.875rem;
		background: rgba(99, 102, 241, 0.06);
		border-bottom: 1px solid transparent;
	}

	.rs-panel--open .rs-panel__header {
		border-bottom-color: rgba(99, 102, 241, 0.15);
	}

	.rs-panel--deep .rs-panel__header {
		background: rgba(139, 92, 246, 0.07);
	}

	:global(.dark) .rs-panel__header {
		background: rgba(99, 102, 241, 0.08);
	}

	:global(.dark) .rs-panel--deep .rs-panel__header {
		background: rgba(139, 92, 246, 0.1);
	}

	.rs-panel__icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.375rem;
		background: rgba(99, 102, 241, 0.15);
		color: rgba(99, 102, 241, 1);
		flex-shrink: 0;
	}

	.rs-panel__icon-wrap--deep {
		background: rgba(139, 92, 246, 0.15);
		color: rgba(139, 92, 246, 1);
	}

	:global(.dark) .rs-panel__icon-wrap {
		background: rgba(99, 102, 241, 0.2);
		color: rgba(165, 167, 255, 1);
	}

	:global(.dark) .rs-panel__icon-wrap--deep {
		background: rgba(139, 92, 246, 0.2);
		color: rgba(196, 181, 253, 1);
	}

	.rs-panel__label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: rgba(99, 102, 241, 1);
		letter-spacing: 0.01em;
	}

	.rs-panel__label--deep {
		color: rgba(139, 92, 246, 1);
	}

	:global(.dark) .rs-panel__label {
		color: rgba(165, 167, 255, 1);
	}

	:global(.dark) .rs-panel__label--deep {
		color: rgba(196, 181, 253, 1);
	}

	.rs-panel__meta {
		font-size: 0.75rem;
		color: var(--dt3, #9ca3af);
		margin-left: 0.125rem;
	}

	.rs-panel__chevron {
		margin-left: auto;
		color: rgba(99, 102, 241, 0.6);
		transition: transform 0.2s;
		display: flex;
		align-items: center;
	}

	.rs-panel__chevron--deep {
		color: rgba(139, 92, 246, 0.7);
	}

	.rs-panel__chevron--open {
		transform: rotate(90deg);
	}

	.rs-panel__body {
		padding: 0.875rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.rs-panel__text {
		font-size: 0.8125rem;
		line-height: 1.65;
		color: var(--dt2, #374151);
		margin: 0;
	}

	:global(.dark) .rs-panel__text {
		color: var(--dt2, rgba(255, 255, 255, 0.7));
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Card 2: Timeline                                             */
	/* ══════════════════════════════════════════════════════════════ */
	.rs-timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0.25rem 0;
	}

	.rs-timeline__step {
		display: flex;
		gap: 0.875rem;
		align-items: flex-start;
	}

	.rs-timeline__connector-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 0.15rem;
	}

	.rs-timeline__node {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.375rem;
		height: 1.375rem;
		border-radius: 9999px;
		border: 2px solid var(--dbd, #e5e7eb);
		background: var(--dbg, #fff);
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--dt3, #9ca3af);
		transition: background 0.2s, border-color 0.2s, color 0.2s;
		flex-shrink: 0;
	}

	:global(.dark) .rs-timeline__node {
		background: var(--dbg, rgba(255, 255, 255, 0.05));
		border-color: var(--dbd, rgba(255, 255, 255, 0.12));
	}

	.rs-timeline__step--done .rs-timeline__node {
		background: rgba(99, 102, 241, 1);
		border-color: rgba(99, 102, 241, 1);
		color: #fff;
	}

	.rs-timeline__step--active .rs-timeline__node {
		background: var(--dbg, #fff);
		border-color: rgba(99, 102, 241, 1);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
	}

	:global(.dark) .rs-timeline__step--active .rs-timeline__node {
		background: rgba(99, 102, 241, 0.12);
	}

	.rs-timeline__line {
		width: 2px;
		flex: 1;
		min-height: 1.5rem;
		background: var(--dbd, #e5e7eb);
		margin: 0.25rem 0;
		border-radius: 1px;
		transition: background 0.3s;
	}

	.rs-timeline__line--filled {
		background: rgba(99, 102, 241, 0.6);
	}

	:global(.dark) .rs-timeline__line {
		background: var(--dbd, rgba(255, 255, 255, 0.1));
	}

	:global(.dark) .rs-timeline__line--filled {
		background: rgba(99, 102, 241, 0.5);
	}

	.rs-timeline__content {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding-bottom: 1rem;
		flex: 1;
		min-width: 0;
	}

	.rs-timeline__step:last-child .rs-timeline__content {
		padding-bottom: 0;
	}

	.rs-timeline__label {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--dt, #111827);
		transition: color 0.2s;
	}

	.rs-timeline__step--pending .rs-timeline__label {
		color: var(--dt3, #9ca3af);
	}

	:global(.dark) .rs-timeline__label {
		color: var(--dt, rgba(255, 255, 255, 0.9));
	}

	:global(.dark) .rs-timeline__step--pending .rs-timeline__label {
		color: var(--dt3, rgba(255, 255, 255, 0.35));
	}

	.rs-timeline__duration {
		font-size: 0.7rem;
		color: rgba(99, 102, 241, 0.8);
		font-weight: 500;
		background: rgba(99, 102, 241, 0.08);
		padding: 0.05rem 0.35rem;
		border-radius: 0.25rem;
		border: 1px solid rgba(99, 102, 241, 0.15);
	}

	.rs-timeline__active-label {
		font-size: 0.7rem;
		color: rgba(99, 102, 241, 0.9);
		font-style: italic;
		animation: rs-pulse 1.4s ease-in-out infinite;
	}

	.rs-timeline__circle {
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--dt3, #9ca3af);
	}

	/* Spinner for active timeline step */
	.rs-timeline__spinner {
		display: block;
		width: 10px;
		height: 10px;
		border: 2px solid rgba(99, 102, 241, 0.25);
		border-top-color: rgba(99, 102, 241, 1);
		border-radius: 50%;
		animation: rs-spin 0.75s linear infinite;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Card 3: Streaming Panel                                      */
	/* ══════════════════════════════════════════════════════════════ */
	.rs-stream {
		background: var(--dbg, #fff);
		border: 1px solid rgba(139, 92, 246, 0.25);
		border-radius: 0.625rem;
		overflow: hidden;
		transition: border-color 0.2s;
	}

	.rs-stream--active {
		border-color: rgba(139, 92, 246, 0.5);
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
	}

	:global(.dark) .rs-stream {
		background: rgba(139, 92, 246, 0.04);
		border-color: rgba(139, 92, 246, 0.2);
	}

	:global(.dark) .rs-stream--active {
		border-color: rgba(139, 92, 246, 0.45);
	}

	.rs-stream__header {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.5rem 0.875rem;
		background: rgba(139, 92, 246, 0.07);
		border-bottom: 1px solid rgba(139, 92, 246, 0.12);
	}

	:global(.dark) .rs-stream__header {
		background: rgba(139, 92, 246, 0.1);
	}

	.rs-stream__icon-wrap {
		display: flex;
		align-items: center;
		color: rgba(139, 92, 246, 1);
	}

	:global(.dark) .rs-stream__icon-wrap {
		color: rgba(196, 181, 253, 1);
	}

	.rs-stream__label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: rgba(139, 92, 246, 1);
		letter-spacing: 0.01em;
	}

	.rs-stream__label--done {
		color: rgba(99, 102, 241, 0.85);
	}

	:global(.dark) .rs-stream__label {
		color: rgba(196, 181, 253, 1);
	}

	.rs-stream__dots {
		display: flex;
		align-items: center;
		gap: 3px;
		margin-left: 0.125rem;
	}

	.rs-stream__dot {
		display: block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(139, 92, 246, 0.7);
		animation: rs-bounce 1.2s ease-in-out infinite;
	}

	.rs-stream__dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.rs-stream__dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	.rs-stream__done-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.125rem;
		height: 1.125rem;
		border-radius: 50%;
		background: rgba(99, 102, 241, 0.15);
		color: rgba(99, 102, 241, 1);
	}

	.rs-stream__body {
		padding: 0.875rem 1rem;
	}

	.rs-stream__text {
		font-size: 0.8125rem;
		line-height: 1.7;
		color: var(--dt2, #374151);
		margin: 0;
		white-space: pre-wrap;
	}

	:global(.dark) .rs-stream__text {
		color: var(--dt2, rgba(255, 255, 255, 0.7));
	}

	/* Blinking cursor */
	.rs-cursor {
		display: inline-block;
		width: 2px;
		height: 1em;
		background: rgba(139, 92, 246, 0.9);
		margin-left: 1px;
		vertical-align: text-bottom;
		border-radius: 1px;
		animation: rs-blink 1s step-end infinite;
	}

	:global(.dark) .rs-cursor {
		background: rgba(196, 181, 253, 0.9);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Card 4: Summary Panel                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.rs-summary {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: var(--dbg, #fff);
		border: 1px solid rgba(99, 102, 241, 0.2);
		border-radius: 0.625rem;
		overflow: hidden;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.18s, box-shadow 0.18s;
	}

	.rs-summary:hover {
		border-color: rgba(99, 102, 241, 0.45);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
	}

	.rs-summary--open {
		border-color: rgba(99, 102, 241, 0.4);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.09);
	}

	:global(.dark) .rs-summary {
		background: rgba(255, 255, 255, 0.03);
		border-color: rgba(99, 102, 241, 0.18);
	}

	.rs-summary__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
	}

	.rs-summary__icon-wrap {
		display: flex;
		align-items: center;
		color: rgba(99, 102, 241, 0.75);
	}

	.rs-summary__label {
		font-size: 0.8125rem;
		color: var(--dt2, #374151);
		font-weight: 400;
	}

	.rs-summary__label strong {
		font-weight: 600;
		color: rgba(99, 102, 241, 1);
	}

	:global(.dark) .rs-summary__label {
		color: var(--dt2, rgba(255, 255, 255, 0.7));
	}

	:global(.dark) .rs-summary__label strong {
		color: rgba(165, 167, 255, 1);
	}

	.rs-summary__badges {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		margin-left: 0.25rem;
	}

	.rs-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.1rem 0.45rem;
		border-radius: 9999px;
		font-size: 0.7rem;
		font-weight: 500;
	}

	.rs-badge--tokens {
		background: rgba(99, 102, 241, 0.08);
		color: rgba(99, 102, 241, 0.9);
		border: 1px solid rgba(99, 102, 241, 0.18);
	}

	.rs-badge--steps {
		background: rgba(139, 92, 246, 0.08);
		color: rgba(139, 92, 246, 0.9);
		border: 1px solid rgba(139, 92, 246, 0.18);
	}

	:global(.dark) .rs-badge--tokens {
		background: rgba(99, 102, 241, 0.15);
		color: rgba(165, 167, 255, 1);
		border-color: rgba(99, 102, 241, 0.25);
	}

	:global(.dark) .rs-badge--steps {
		background: rgba(139, 92, 246, 0.15);
		color: rgba(196, 181, 253, 1);
		border-color: rgba(139, 92, 246, 0.25);
	}

	.rs-summary__chevron {
		margin-left: auto;
		color: var(--dt3, #9ca3af);
		display: flex;
		align-items: center;
		transition: transform 0.2s;
	}

	.rs-summary__chevron--open {
		transform: rotate(180deg);
	}

	.rs-summary__body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem 1rem 0.875rem;
		border-top: 1px solid rgba(99, 102, 241, 0.12);
		background: rgba(99, 102, 241, 0.02);
	}

	:global(.dark) .rs-summary__body {
		background: rgba(99, 102, 241, 0.04);
		border-top-color: rgba(99, 102, 241, 0.15);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Card 5: Show more / less wrapper                             */
	/* ══════════════════════════════════════════════════════════════ */
	.rs-show-more-wrap {
		display: flex;
		justify-content: center;
		margin-top: -0.125rem;
	}

	.rs-show-more {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(139, 92, 246, 0.9);
		background: rgba(139, 92, 246, 0.07);
		border: 1px solid rgba(139, 92, 246, 0.18);
		border-top: none;
		border-radius: 0 0 0.5rem 0.5rem;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.rs-show-more:hover {
		background: rgba(139, 92, 246, 0.13);
		color: rgba(139, 92, 246, 1);
	}

	:global(.dark) .rs-show-more {
		color: rgba(196, 181, 253, 0.9);
		background: rgba(139, 92, 246, 0.1);
		border-color: rgba(139, 92, 246, 0.22);
	}

	:global(.dark) .rs-show-more:hover {
		background: rgba(139, 92, 246, 0.18);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Card 6: Table                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.rs-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8rem;
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, #e5e7eb);
		border-radius: 0.625rem;
		overflow: hidden;
	}

	:global(.dark) .rs-table {
		background: rgba(255, 255, 255, 0.03);
		border-color: rgba(255, 255, 255, 0.08);
	}

	.rs-table__th {
		padding: 0.625rem 0.875rem;
		text-align: left;
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3, #9ca3af);
		background: var(--dbg2, #f8f9fb);
		border-bottom: 1px solid var(--dbd, #e5e7eb);
	}

	:global(.dark) .rs-table__th {
		background: rgba(255, 255, 255, 0.04);
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.rs-table__row {
		border-bottom: 1px solid var(--dbd, #e5e7eb);
		transition: background 0.12s;
	}

	.rs-table__row--last {
		border-bottom: none;
	}

	.rs-table__row:hover {
		background: rgba(99, 102, 241, 0.03);
	}

	:global(.dark) .rs-table__row {
		border-bottom-color: rgba(255, 255, 255, 0.06);
	}

	:global(.dark) .rs-table__row:hover {
		background: rgba(99, 102, 241, 0.05);
	}

	.rs-table__td {
		padding: 0.625rem 0.875rem;
		color: var(--dt2, #374151);
		vertical-align: middle;
		line-height: 1.5;
	}

	:global(.dark) .rs-table__td {
		color: var(--dt2, rgba(255, 255, 255, 0.7));
	}

	/* Chips in table */
	.rs-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.1rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.rs-chip--indigo {
		background: rgba(99, 102, 241, 0.1);
		color: rgba(99, 102, 241, 1);
		border: 1px solid rgba(99, 102, 241, 0.2);
	}

	.rs-chip--purple {
		background: rgba(168, 85, 247, 0.1);
		color: rgba(168, 85, 247, 1);
		border: 1px solid rgba(168, 85, 247, 0.2);
	}

	.rs-chip--violet {
		background: rgba(139, 92, 246, 0.1);
		color: rgba(139, 92, 246, 1);
		border: 1px solid rgba(139, 92, 246, 0.2);
	}

	.rs-chip--neutral {
		background: var(--dbg2, rgba(0, 0, 0, 0.05));
		color: var(--dt3, #6b7280);
		border: 1px solid var(--dbd, #e5e7eb);
	}

	:global(.dark) .rs-chip--indigo {
		background: rgba(99, 102, 241, 0.18);
		color: rgba(165, 167, 255, 1);
		border-color: rgba(99, 102, 241, 0.3);
	}

	:global(.dark) .rs-chip--purple {
		background: rgba(168, 85, 247, 0.18);
		color: rgba(216, 180, 254, 1);
		border-color: rgba(168, 85, 247, 0.3);
	}

	:global(.dark) .rs-chip--violet {
		background: rgba(139, 92, 246, 0.18);
		color: rgba(196, 181, 253, 1);
		border-color: rgba(139, 92, 246, 0.3);
	}

	:global(.dark) .rs-chip--neutral {
		background: rgba(255, 255, 255, 0.07);
		color: rgba(255, 255, 255, 0.45);
		border-color: rgba(255, 255, 255, 0.1);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/* Animations                                                   */
	/* ══════════════════════════════════════════════════════════════ */
	@keyframes rs-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@keyframes rs-spin {
		to { transform: rotate(360deg); }
	}

	@keyframes rs-bounce {
		0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
		40% { transform: scale(1); opacity: 1; }
	}

	@keyframes rs-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}
</style>
