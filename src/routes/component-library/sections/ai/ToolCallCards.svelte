<script lang="ts">
	// Expand/collapse state for each demo card
	let basicExpanded = $state(false);

	let stateCards = $state({
		pending: false,
		running: false,
		complete: false,
	});

	let resultExpanded = $state(true);
	let thinkingExpanded = $state(false);
	let phaseExpanded = $state(false);

	// Tool call sequence states
	let sequenceExpanded = $state({ 0: false, 1: false, 2: false, 3: false } as Record<number, boolean>);

	// Chat with tool calls inline state
	let chatToolExpanded = $state({ 0: true, 1: false, 2: false } as Record<number, boolean>);

	// ── NEW: Compact Tool Call ──────────────────────────────────
	let compactExpanded = $state({ 0: false, 1: false, 2: false } as Record<number, boolean>);

	// ── NEW: Expanded Tool Call (full signature) ────────────────
	let sigExpanded = $state({ 0: true, 1: false } as Record<number, boolean>);

	// ── NEW: Tool Call Chain ────────────────────────────────────
	let chainExpanded = $state({ 0: false, 1: false, 2: false } as Record<number, boolean>);

	// ── NEW: Parallel Tool Calls ────────────────────────────────
	// Demo toggle: cycle through running → done states
	type ParallelStatus = 'running' | 'done' | 'failed';
	let parallelStatus = $state<ParallelStatus[]>(['done', 'done', 'running', 'done']);

	function cycleParallelStatus(i: number) {
		const order: ParallelStatus[] = ['running', 'done', 'failed'];
		const cur = parallelStatus[i];
		const next = order[(order.indexOf(cur) + 1) % order.length];
		parallelStatus = parallelStatus.map((s, idx) => idx === i ? next : s);
	}

	let parallelAllDone = $derived(parallelStatus.every(s => s === 'done'));
</script>

<section class="ds-section">
	<h2 class="ds-title">Tool Call Cards</h2>
	<p class="ds-desc">Inline cards that appear within AI chat conversations to surface tool executions, function calls, reasoning steps, and agent actions. Inspired by modern AI assistants that show their work in real time.</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. Basic Tool Card                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Tool Card</h3>
		<p class="ds-card__sub">Bordered card with wrench icon + tool name + chevron. Click to expand/collapse.</p>
		<div class="tc-demo-area">
			<button
				class="tc-card"
				class:tc-card--expanded={basicExpanded}
				onclick={() => basicExpanded = !basicExpanded}
				aria-expanded={basicExpanded}
				aria-label="Toggle Web Search tool card"
			>
				<div class="tc-card__header">
					<span class="tc-card__icon tc-card__icon--muted">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
						</svg>
					</span>
					<span class="tc-card__name">Web Search</span>
					<span class="tc-card__chevron" class:tc-card__chevron--open={basicExpanded}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
						</svg>
					</span>
				</div>
				{#if basicExpanded}
					<div class="tc-card__body">
						<p class="tc-card__result-text">Searching for "latest SvelteKit 2 release notes and breaking changes"...</p>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. Tool Card States                                        -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tool Card States</h3>
		<p class="ds-card__sub">Pending (clock), Running (animated spinner + pulsing border), Complete (green checkmark, expandable).</p>
		<div class="tc-demo-area">
			<!-- Pending -->
			<div class="tc-card tc-card--pending" aria-label="Pending tool call">
				<div class="tc-card__header">
					<span class="tc-card__icon tc-card__icon--muted">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<circle cx="12" cy="12" r="10" stroke-width="1.75"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 6v6l4 2"/>
						</svg>
					</span>
					<span class="tc-card__name">Read File</span>
					<span class="tc-card__status-label tc-card__status-label--pending">Pending</span>
				</div>
			</div>

			<!-- Running -->
			<div class="tc-card tc-card--running" aria-label="Running tool call">
				<div class="tc-card__header">
					<span class="tc-card__icon tc-card__icon--muted">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
						</svg>
					</span>
					<span class="tc-card__name">Web Search</span>
					<span class="tc-spinner" aria-label="Running"></span>
				</div>
			</div>

			<!-- Complete -->
			<button
				class="tc-card tc-card--complete"
				class:tc-card--expanded={stateCards.complete}
				onclick={() => stateCards.complete = !stateCards.complete}
				aria-expanded={stateCards.complete}
				aria-label="Toggle completed tool call"
			>
				<div class="tc-card__header">
					<span class="tc-card__icon tc-card__icon--success">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
					</span>
					<span class="tc-card__name">Analyze Data</span>
					<span class="tc-card__chevron" class:tc-card__chevron--open={stateCards.complete}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
						</svg>
					</span>
				</div>
				{#if stateCards.complete}
					<div class="tc-card__body">
						<p class="tc-card__result-text">Found 3 anomalies in the dataset. Peak values occurred at index 142, 287, and 391. Confidence: 94.2%.</p>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. Tool Card with Result                                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tool Card with Result</h3>
		<p class="ds-card__sub">Expanded card showing header (icon + name + duration) and monospace result body.</p>
		<div class="tc-demo-area">
			<button
				class="tc-card tc-card--complete tc-card--expanded"
				class:tc-card--expanded={resultExpanded}
				onclick={() => resultExpanded = !resultExpanded}
				aria-expanded={resultExpanded}
				aria-label="Toggle tool result"
			>
				<div class="tc-card__header">
					<span class="tc-card__icon tc-card__icon--success">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
						</svg>
					</span>
					<span class="tc-card__name">Web Search</span>
					<span class="tc-card__duration">1.2s</span>
					<span class="tc-card__chevron" class:tc-card__chevron--open={resultExpanded}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
						</svg>
					</span>
				</div>
				{#if resultExpanded}
					<div class="tc-card__body">
						<pre class="tc-card__mono">{`{
  "query": "SvelteKit 2 breaking changes",
  "results": [
    {
      "title": "SvelteKit 2 Migration Guide",
      "url": "https://kit.svelte.dev/docs/migrating-to-sveltekit-2",
      "snippet": "SvelteKit 2 introduces several..."
    }
  ],
  "total": 847,
  "duration_ms": 1183
}`}</pre>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. Thinking / Reasoning Card                              -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Thinking / Reasoning Card</h3>
		<p class="ds-card__sub">Blue accent sparkle icon + "Thinking" label. Expanded shows chain-of-thought text. Visually distinct from tool cards.</p>
		<div class="tc-demo-area">
			<button
				class="tc-card tc-card--thinking"
				class:tc-card--expanded={thinkingExpanded}
				onclick={() => thinkingExpanded = !thinkingExpanded}
				aria-expanded={thinkingExpanded}
				aria-label="Toggle thinking panel"
			>
				<div class="tc-card__header">
					<span class="tc-card__icon tc-card__icon--accent">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
						</svg>
					</span>
					<span class="tc-card__name tc-card__name--accent">Thinking</span>
					<span class="tc-card__chevron tc-card__chevron--accent" class:tc-card__chevron--open={thinkingExpanded}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
						</svg>
					</span>
				</div>
				{#if thinkingExpanded}
					<div class="tc-card__body tc-card__body--thinking">
						<p class="tc-card__cot">The user is asking about SvelteKit routing conventions. Let me think through this carefully.</p>
						<p class="tc-card__cot">First, I should distinguish between <code>+page.svelte</code> (the page component), <code>+page.ts</code> (universal load), and <code>+page.server.ts</code> (server-only load and form actions).</p>
						<p class="tc-card__cot">The key constraint is that <code>+page.server.ts</code> runs only on the server — it can access databases, secrets, and perform form action mutations. The universal <code>+page.ts</code> runs on both server and client, which is ideal for fetching public APIs.</p>
						<p class="tc-card__cot">I'll recommend <code>+page.server.ts</code> with a <code>load</code> function plus a <code>create</code> action since they need auth-gated data and a form mutation.</p>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. Phase / Plan Card                                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Phase / Plan Card</h3>
		<p class="ds-card__sub">Blue phase pill badge, plan title, progress indicator, expand chevron. Expanded shows numbered task list.</p>
		<div class="tc-demo-area">
			<button
				class="tc-card tc-card--phase"
				class:tc-card--expanded={phaseExpanded}
				onclick={() => phaseExpanded = !phaseExpanded}
				aria-expanded={phaseExpanded}
				aria-label="Toggle phase plan"
			>
				<div class="tc-card__header">
					<span class="tc-phase-badge">Phase 1</span>
					<span class="tc-card__name">Analyze codebase & plan migration</span>
					<span class="tc-card__progress">2/4 complete</span>
					<span class="tc-card__chevron" class:tc-card__chevron--open={phaseExpanded}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
						</svg>
					</span>
				</div>
				{#if phaseExpanded}
					<div class="tc-card__body">
						<ol class="tc-task-list">
							<li class="tc-task tc-task--done">
								<span class="tc-task__icon">
									<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
								</span>
								<span class="tc-task__text">Scan all <code>.svelte</code> files for legacy patterns</span>
							</li>
							<li class="tc-task tc-task--done">
								<span class="tc-task__icon">
									<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
								</span>
								<span class="tc-task__text">Identify <code>export let</code> and <code>$:</code> usage counts</span>
							</li>
							<li class="tc-task tc-task--pending">
								<span class="tc-task__icon tc-task__icon--pending">
									<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke-width="1.75"/></svg>
								</span>
								<span class="tc-task__text">Migrate components in dependency order</span>
							</li>
							<li class="tc-task tc-task--pending">
								<span class="tc-task__icon tc-task__icon--pending">
									<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke-width="1.75"/></svg>
								</span>
								<span class="tc-task__text">Run <code>npx svelte-check</code> and fix remaining errors</span>
							</li>
						</ol>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 6. Agent Status Card                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Status Card</h3>
		<p class="ds-card__sub">Animated spinner + agent name pill + status text + rainbow gradient bottom border (pure CSS <code>@keyframes</code>).</p>
		<div class="tc-demo-area">
			<div class="tc-agent-card" role="status" aria-label="Agent task in progress">
				<div class="tc-agent-card__inner">
					<span class="tc-spinner tc-spinner--lg" aria-hidden="true"></span>
					<span class="tc-agent-badge">
						<span class="tc-agent-badge__dot" aria-hidden="true"></span>
						Research Agent
					</span>
					<span class="tc-agent-card__label">Task in progress...</span>
				</div>
				<div class="tc-agent-card__rainbow" aria-hidden="true"></div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 7. Tool Call Sequence                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tool Call Sequence</h3>
		<p class="ds-card__sub">Vertical stack connected by a thin left rail. Realistic 4-step pipeline — complete, complete, running, pending.</p>
		<div class="tc-demo-area">
			<div class="tc-sequence">
				<!-- Step 1: Complete -->
				<div class="tc-sequence__item">
					<div class="tc-sequence__rail">
						<span class="tc-sequence__dot tc-sequence__dot--done"></span>
						<span class="tc-sequence__line"></span>
					</div>
					<button
						class="tc-card tc-card--complete tc-sequence__card"
						class:tc-card--expanded={sequenceExpanded[0]}
						onclick={() => sequenceExpanded[0] = !sequenceExpanded[0]}
						aria-expanded={sequenceExpanded[0]}
						aria-label="Toggle Searching documents step"
					>
						<div class="tc-card__header">
							<span class="tc-card__icon tc-card__icon--success">
								<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							</span>
							<span class="tc-card__name">Searching documents</span>
							<span class="tc-card__duration">0.8s</span>
							<span class="tc-card__chevron" class:tc-card__chevron--open={sequenceExpanded[0]}>
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
							</span>
						</div>
						{#if sequenceExpanded[0]}
							<div class="tc-card__body">
								<p class="tc-card__result-text">Found 14 relevant documents matching "quarterly report Q3 2024".</p>
							</div>
						{/if}
					</button>
				</div>

				<!-- Step 2: Complete -->
				<div class="tc-sequence__item">
					<div class="tc-sequence__rail">
						<span class="tc-sequence__dot tc-sequence__dot--done"></span>
						<span class="tc-sequence__line"></span>
					</div>
					<button
						class="tc-card tc-card--complete tc-sequence__card"
						class:tc-card--expanded={sequenceExpanded[1]}
						onclick={() => sequenceExpanded[1] = !sequenceExpanded[1]}
						aria-expanded={sequenceExpanded[1]}
						aria-label="Toggle Analyzing results step"
					>
						<div class="tc-card__header">
							<span class="tc-card__icon tc-card__icon--success">
								<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							</span>
							<span class="tc-card__name">Analyzing results</span>
							<span class="tc-card__duration">2.1s</span>
							<span class="tc-card__chevron" class:tc-card__chevron--open={sequenceExpanded[1]}>
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
							</span>
						</div>
						{#if sequenceExpanded[1]}
							<div class="tc-card__body">
								<p class="tc-card__result-text">Identified 3 key themes: revenue growth (+18%), margin compression (-4pp), and geographic expansion into APAC markets.</p>
							</div>
						{/if}
					</button>
				</div>

				<!-- Step 3: Running -->
				<div class="tc-sequence__item">
					<div class="tc-sequence__rail">
						<span class="tc-sequence__dot tc-sequence__dot--running">
							<span class="tc-sequence__dot-pulse"></span>
						</span>
						<span class="tc-sequence__line tc-sequence__line--faint"></span>
					</div>
					<div class="tc-card tc-card--running tc-sequence__card" role="status" aria-label="Generating response — running">
						<div class="tc-card__header">
							<span class="tc-card__icon tc-card__icon--muted">
								<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
							</span>
							<span class="tc-card__name">Generating response</span>
							<span class="tc-spinner" aria-label="Running"></span>
						</div>
					</div>
				</div>

				<!-- Step 4: Pending -->
				<div class="tc-sequence__item tc-sequence__item--last">
					<div class="tc-sequence__rail">
						<span class="tc-sequence__dot tc-sequence__dot--pending"></span>
					</div>
					<div class="tc-card tc-card--pending tc-sequence__card" role="status" aria-label="Formatting output — pending">
						<div class="tc-card__header">
							<span class="tc-card__icon tc-card__icon--muted">
								<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h7"/></svg>
							</span>
							<span class="tc-card__name">Formatting output</span>
							<span class="tc-card__status-label tc-card__status-label--pending">Pending</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- NEW A. Compact Tool Call                                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact Tool Call</h3>
		<p class="ds-card__sub">Single-line: icon + bold monospace function name + status badge + duration. Click to expand full parameter values. Three states shown side-by-side.</p>
		<div class="tc-demo-area">

			<!-- Running compact -->
			<div class="tc-compact tc-compact--running" role="status" aria-label="createVideo — running">
				<span class="tc-compact__icon tc-compact__icon--fn" aria-hidden="true">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
				</span>
				<span class="tc-compact__fn">createVideo</span>
				<span class="tc-compact__badge tc-compact__badge--running">
					<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
					Running
				</span>
				<span class="tc-compact__dur">1.3s</span>
			</div>

			<!-- Failed compact (expandable) -->
			<button
				class="tc-compact tc-compact--failed"
				class:tc-compact--open={compactExpanded[1]}
				onclick={() => compactExpanded[1] = !compactExpanded[1]}
				aria-expanded={compactExpanded[1]}
				aria-label="Toggle analyzeCompetitor failed tool call"
			>
				<span class="tc-compact__icon tc-compact__icon--fail" aria-hidden="true">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				</span>
				<span class="tc-compact__fn">analyzeCompetitor</span>
				<span class="tc-compact__badge tc-compact__badge--failed">Failed</span>
				<span class="tc-compact__dur">0.4s</span>
				<span class="tc-compact__chevron" class:tc-compact__chevron--open={compactExpanded[1]}>
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
				</span>
			</button>
			{#if compactExpanded[1]}
				<div class="tc-compact__body">
					<div class="tc-sig__params">
						<div class="tc-sig__param-row">
							<span class="tc-sig__param-name">competitor_url</span>
							<span class="tc-sig__param-sep">:</span>
							<span class="tc-sig__param-val tc-sig__param-val--str">"https://competitor.com"</span>
						</div>
						<div class="tc-sig__param-row">
							<span class="tc-sig__param-name">depth</span>
							<span class="tc-sig__param-sep">:</span>
							<span class="tc-sig__param-val tc-sig__param-val--num">3</span>
						</div>
					</div>
					<div class="tc-compact__error">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						Rate limit exceeded — retry in 30s
					</div>
				</div>
			{/if}

			<!-- Done compact (expandable) -->
			<button
				class="tc-compact tc-compact--done"
				class:tc-compact--open={compactExpanded[2]}
				onclick={() => compactExpanded[2] = !compactExpanded[2]}
				aria-expanded={compactExpanded[2]}
				aria-label="Toggle remixVideo completed tool call"
			>
				<span class="tc-compact__icon tc-compact__icon--done" aria-hidden="true">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
				</span>
				<span class="tc-compact__fn">remixVideo</span>
				<span class="tc-compact__badge tc-compact__badge--done">Done</span>
				<span class="tc-compact__dur">4.7s</span>
				<span class="tc-compact__chevron" class:tc-compact__chevron--open={compactExpanded[2]}>
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
				</span>
			</button>
			{#if compactExpanded[2]}
				<div class="tc-compact__body">
					<div class="tc-sig__params">
						<div class="tc-sig__param-row">
							<span class="tc-sig__param-name">source_id</span>
							<span class="tc-sig__param-sep">:</span>
							<span class="tc-sig__param-val tc-sig__param-val--str">"vid_8xKp2mN"</span>
						</div>
						<div class="tc-sig__param-row">
							<span class="tc-sig__param-name">style</span>
							<span class="tc-sig__param-sep">:</span>
							<span class="tc-sig__param-val tc-sig__param-val--str">"cinematic"</span>
						</div>
						<div class="tc-sig__param-row">
							<span class="tc-sig__param-name">duration_s</span>
							<span class="tc-sig__param-sep">:</span>
							<span class="tc-sig__param-val tc-sig__param-val--num">30</span>
						</div>
					</div>
					<div class="tc-sig__return-row">
						<span class="tc-sig__arrow">→</span>
						<span class="tc-sig__return-label">returns</span>
						<span class="tc-sig__return-val"><span class="tc-sig__brace">{"{"}</span>url, duration_s, thumbnail_url<span class="tc-sig__brace">{"}"}</span></span>
					</div>
				</div>
			{/if}

		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- NEW B. Expanded Tool Call (Full Function Signature)        -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Expanded Tool Call — Full Signature</h3>
		<p class="ds-card__sub">Shows full function signature: <code>fnName(param: type, …) → returns &#123;field1, field2&#125;</code>. Param values listed below with type-coloured values (string, number, boolean, object). Click header to collapse.</p>
		<div class="tc-demo-area">

			<!-- Signature card: createVideo -->
			<div class="tc-sig" class:tc-sig--collapsed={!sigExpanded[0]}>
				<button
					class="tc-sig__header"
					onclick={() => sigExpanded[0] = !sigExpanded[0]}
					aria-expanded={sigExpanded[0]}
					aria-label="Toggle createVideo signature"
				>
					<span class="tc-sig__icon tc-sig__icon--done" aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					</span>
					<span class="tc-sig__title">
						<span class="tc-sig__fn-name">createVideo</span><span class="tc-sig__paren">(</span><span class="tc-sig__inline-params">prompt: string, style: string, duration_s: number</span><span class="tc-sig__paren">)</span>
						<span class="tc-sig__arrow-inline">→</span>
						<span class="tc-sig__return-inline"><span class="tc-sig__brace">{"{"}</span>url, thumbnail_url, duration_s<span class="tc-sig__brace">{"}"}</span></span>
					</span>
					<span class="tc-card__duration">3.2s</span>
					<span class="tc-card__chevron" class:tc-card__chevron--open={sigExpanded[0]}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
					</span>
				</button>

				{#if sigExpanded[0]}
					<div class="tc-sig__body">
						<div class="tc-sig__section-label">Parameters</div>
						<div class="tc-sig__params">
							<div class="tc-sig__param-row">
								<span class="tc-sig__param-name">prompt</span>
								<span class="tc-sig__param-type">string</span>
								<span class="tc-sig__param-sep">:</span>
								<span class="tc-sig__param-val tc-sig__param-val--str">"A golden hour timelapse of the San Francisco skyline, cinematic wide shot"</span>
							</div>
							<div class="tc-sig__param-row">
								<span class="tc-sig__param-name">style</span>
								<span class="tc-sig__param-type">string</span>
								<span class="tc-sig__param-sep">:</span>
								<span class="tc-sig__param-val tc-sig__param-val--str">"cinematic"</span>
							</div>
							<div class="tc-sig__param-row">
								<span class="tc-sig__param-name">duration_s</span>
								<span class="tc-sig__param-type">number</span>
								<span class="tc-sig__param-sep">:</span>
								<span class="tc-sig__param-val tc-sig__param-val--num">15</span>
							</div>
							<div class="tc-sig__param-row">
								<span class="tc-sig__param-name">hd</span>
								<span class="tc-sig__param-type">boolean</span>
								<span class="tc-sig__param-sep">:</span>
								<span class="tc-sig__param-val tc-sig__param-val--bool">true</span>
							</div>
						</div>
						<div class="tc-sig__section-label tc-sig__section-label--return">Return</div>
						<div class="tc-sig__return-block">
							<div class="tc-sig__return-row">
								<span class="tc-sig__arrow">→</span>
								<span class="tc-sig__return-label">returns</span>
								<span class="tc-sig__return-val"><span class="tc-sig__brace">{"{"}</span>url, thumbnail_url, duration_s<span class="tc-sig__brace">{"}"}</span></span>
							</div>
							<div class="tc-sig__params tc-sig__params--return">
								<div class="tc-sig__param-row">
									<span class="tc-sig__param-name">url</span>
									<span class="tc-sig__param-type">string</span>
									<span class="tc-sig__param-sep">:</span>
									<span class="tc-sig__param-val tc-sig__param-val--str">"https://cdn.taku.ai/v/xK9mPq2.mp4"</span>
								</div>
								<div class="tc-sig__param-row">
									<span class="tc-sig__param-name">thumbnail_url</span>
									<span class="tc-sig__param-type">string</span>
									<span class="tc-sig__param-sep">:</span>
									<span class="tc-sig__param-val tc-sig__param-val--str">"https://cdn.taku.ai/t/xK9mPq2.jpg"</span>
								</div>
								<div class="tc-sig__param-row">
									<span class="tc-sig__param-name">duration_s</span>
									<span class="tc-sig__param-type">number</span>
									<span class="tc-sig__param-sep">:</span>
									<span class="tc-sig__param-val tc-sig__param-val--num">15</span>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Signature card: analyzeCompetitor (collapsed, failed) -->
			<div class="tc-sig tc-sig--failed">
				<button
					class="tc-sig__header"
					onclick={() => sigExpanded[1] = !sigExpanded[1]}
					aria-expanded={sigExpanded[1]}
					aria-label="Toggle analyzeCompetitor signature"
				>
					<span class="tc-sig__icon tc-sig__icon--fail" aria-hidden="true">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
					</span>
					<span class="tc-sig__title">
						<span class="tc-sig__fn-name">analyzeCompetitor</span><span class="tc-sig__paren">(</span><span class="tc-sig__inline-params">url: string, depth: number</span><span class="tc-sig__paren">)</span>
						<span class="tc-sig__arrow-inline">→</span>
						<span class="tc-sig__return-inline"><span class="tc-sig__brace">{"{"}</span>score, summary, gaps<span class="tc-sig__brace">{"}"}</span></span>
					</span>
					<span class="tc-card__duration">0.4s</span>
					<span class="tc-card__chevron" class:tc-card__chevron--open={sigExpanded[1]}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
					</span>
				</button>
				{#if sigExpanded[1]}
					<div class="tc-sig__body">
						<div class="tc-sig__section-label">Parameters</div>
						<div class="tc-sig__params">
							<div class="tc-sig__param-row">
								<span class="tc-sig__param-name">url</span>
								<span class="tc-sig__param-type">string</span>
								<span class="tc-sig__param-sep">:</span>
								<span class="tc-sig__param-val tc-sig__param-val--str">"https://competitor.io"</span>
							</div>
							<div class="tc-sig__param-row">
								<span class="tc-sig__param-name">depth</span>
								<span class="tc-sig__param-type">number</span>
								<span class="tc-sig__param-sep">:</span>
								<span class="tc-sig__param-val tc-sig__param-val--num">3</span>
							</div>
						</div>
						<div class="tc-compact__error">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							Rate limit exceeded — retry in 30s
						</div>
					</div>
				{/if}
			</div>

		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- NEW C. Tool Call Chain                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tool Call Chain</h3>
		<p class="ds-card__sub">Multiple sequential tool calls connected by a vertical timeline rail. Each step is expandable. Total duration shown in a summary footer.</p>
		<div class="tc-demo-area">
			<div class="tc-chain">

				<!-- Step 1: done -->
				<div class="tc-chain__item">
					<div class="tc-chain__rail">
						<span class="tc-chain__node tc-chain__node--done">
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
						</span>
						<span class="tc-chain__line"></span>
					</div>
					<div class="tc-chain__content">
						<button
							class="tc-compact tc-compact--done tc-chain__card"
							class:tc-compact--open={chainExpanded[0]}
							onclick={() => chainExpanded[0] = !chainExpanded[0]}
							aria-expanded={chainExpanded[0]}
							aria-label="Toggle fetchTrendingTopics step"
						>
							<span class="tc-compact__fn">fetchTrendingTopics</span>
							<span class="tc-compact__badge tc-compact__badge--done">Done</span>
							<span class="tc-compact__dur">0.9s</span>
							<span class="tc-compact__chevron" class:tc-compact__chevron--open={chainExpanded[0]}>
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
							</span>
						</button>
						{#if chainExpanded[0]}
							<div class="tc-compact__body">
								<div class="tc-sig__params">
									<div class="tc-sig__param-row">
										<span class="tc-sig__param-name">category</span>
										<span class="tc-sig__param-sep">:</span>
										<span class="tc-sig__param-val tc-sig__param-val--str">"technology"</span>
									</div>
									<div class="tc-sig__param-row">
										<span class="tc-sig__param-name">limit</span>
										<span class="tc-sig__param-sep">:</span>
										<span class="tc-sig__param-val tc-sig__param-val--num">10</span>
									</div>
								</div>
								<div class="tc-sig__return-row">
									<span class="tc-sig__arrow">→</span>
									<span class="tc-sig__return-label">returns</span>
									<span class="tc-sig__return-val"><span class="tc-sig__brace">{"{"}</span>topics: string[], updated_at<span class="tc-sig__brace">{"}"}</span></span>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Step 2: done -->
				<div class="tc-chain__item">
					<div class="tc-chain__rail">
						<span class="tc-chain__node tc-chain__node--done">
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
						</span>
						<span class="tc-chain__line"></span>
					</div>
					<div class="tc-chain__content">
						<button
							class="tc-compact tc-compact--done tc-chain__card"
							class:tc-compact--open={chainExpanded[1]}
							onclick={() => chainExpanded[1] = !chainExpanded[1]}
							aria-expanded={chainExpanded[1]}
							aria-label="Toggle generateScript step"
						>
							<span class="tc-compact__fn">generateScript</span>
							<span class="tc-compact__badge tc-compact__badge--done">Done</span>
							<span class="tc-compact__dur">2.4s</span>
							<span class="tc-compact__chevron" class:tc-compact__chevron--open={chainExpanded[1]}>
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
							</span>
						</button>
						{#if chainExpanded[1]}
							<div class="tc-compact__body">
								<div class="tc-sig__params">
									<div class="tc-sig__param-row">
										<span class="tc-sig__param-name">topic</span>
										<span class="tc-sig__param-sep">:</span>
										<span class="tc-sig__param-val tc-sig__param-val--str">"AI in healthcare"</span>
									</div>
									<div class="tc-sig__param-row">
										<span class="tc-sig__param-name">tone</span>
										<span class="tc-sig__param-sep">:</span>
										<span class="tc-sig__param-val tc-sig__param-val--str">"authoritative"</span>
									</div>
									<div class="tc-sig__param-row">
										<span class="tc-sig__param-name">word_count</span>
										<span class="tc-sig__param-sep">:</span>
										<span class="tc-sig__param-val tc-sig__param-val--num">280</span>
									</div>
								</div>
								<div class="tc-sig__return-row">
									<span class="tc-sig__arrow">→</span>
									<span class="tc-sig__return-label">returns</span>
									<span class="tc-sig__return-val"><span class="tc-sig__brace">{"{"}</span>script, word_count, hooks<span class="tc-sig__brace">{"}"}</span></span>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Step 3: running -->
				<div class="tc-chain__item">
					<div class="tc-chain__rail">
						<span class="tc-chain__node tc-chain__node--running">
							<span class="tc-chain__node-pulse" aria-hidden="true"></span>
						</span>
						<span class="tc-chain__line tc-chain__line--faint"></span>
					</div>
					<div class="tc-chain__content">
						<div class="tc-compact tc-compact--running tc-chain__card" role="status" aria-label="createVideo — running">
							<span class="tc-compact__fn">createVideo</span>
							<span class="tc-compact__badge tc-compact__badge--running">
								<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
								Running
							</span>
							<span class="tc-compact__dur">3.1s</span>
						</div>
					</div>
				</div>

				<!-- Step 4: pending -->
				<div class="tc-chain__item tc-chain__item--last">
					<div class="tc-chain__rail">
						<span class="tc-chain__node tc-chain__node--pending"></span>
					</div>
					<div class="tc-chain__content">
						<div class="tc-compact tc-compact--pending tc-chain__card" role="status" aria-label="publishToChannels — pending">
							<span class="tc-compact__fn">publishToChannels</span>
							<span class="tc-compact__badge tc-compact__badge--pending">Pending</span>
						</div>
					</div>
				</div>

				<!-- Chain summary footer -->
				<div class="tc-chain__footer">
					<span class="tc-chain__footer-icon" aria-hidden="true">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="1.75"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 6v6l4 2"/></svg>
					</span>
					<span class="tc-chain__footer-text">4 calls &mdash; 6.4s elapsed</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- NEW D. Parallel Tool Calls                                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Parallel Tool Calls</h3>
		<p class="ds-card__sub">2–4 tool calls running simultaneously shown in a responsive grid. Individual status per card. "All complete" summary banner when every call finishes. Click any card to cycle its status (demo).</p>
		<div class="tc-demo-area tc-demo-area--wide">
			<div class="tc-parallel">
				<div class="tc-parallel__grid">

					<!-- Card 0: fetchUserProfile -->
					<button
						class="tc-parallel__card"
						class:tc-parallel__card--done={parallelStatus[0] === 'done'}
						class:tc-parallel__card--running={parallelStatus[0] === 'running'}
						class:tc-parallel__card--failed={parallelStatus[0] === 'failed'}
						onclick={() => cycleParallelStatus(0)}
						aria-label="Toggle fetchUserProfile status (demo)"
					>
						<div class="tc-parallel__card-header">
							{#if parallelStatus[0] === 'running'}
								<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
							{:else if parallelStatus[0] === 'done'}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--done" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
								</span>
							{:else}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--failed" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
								</span>
							{/if}
							<span class="tc-parallel__badge tc-parallel__badge--{parallelStatus[0]}">
								{parallelStatus[0] === 'running' ? 'Running' : parallelStatus[0] === 'done' ? 'Done' : 'Failed'}
							</span>
						</div>
						<span class="tc-parallel__fn">fetchUserProfile</span>
						<div class="tc-parallel__meta">
							<span class="tc-parallel__type">string → object</span>
							<span class="tc-parallel__dur">0.6s</span>
						</div>
					</button>

					<!-- Card 1: getRecentActivity -->
					<button
						class="tc-parallel__card"
						class:tc-parallel__card--done={parallelStatus[1] === 'done'}
						class:tc-parallel__card--running={parallelStatus[1] === 'running'}
						class:tc-parallel__card--failed={parallelStatus[1] === 'failed'}
						onclick={() => cycleParallelStatus(1)}
						aria-label="Toggle getRecentActivity status (demo)"
					>
						<div class="tc-parallel__card-header">
							{#if parallelStatus[1] === 'running'}
								<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
							{:else if parallelStatus[1] === 'done'}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--done" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
								</span>
							{:else}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--failed" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
								</span>
							{/if}
							<span class="tc-parallel__badge tc-parallel__badge--{parallelStatus[1]}">
								{parallelStatus[1] === 'running' ? 'Running' : parallelStatus[1] === 'done' ? 'Done' : 'Failed'}
							</span>
						</div>
						<span class="tc-parallel__fn">getRecentActivity</span>
						<div class="tc-parallel__meta">
							<span class="tc-parallel__type">userId: string</span>
							<span class="tc-parallel__dur">1.1s</span>
						</div>
					</button>

					<!-- Card 2: loadPreferences -->
					<button
						class="tc-parallel__card"
						class:tc-parallel__card--done={parallelStatus[2] === 'done'}
						class:tc-parallel__card--running={parallelStatus[2] === 'running'}
						class:tc-parallel__card--failed={parallelStatus[2] === 'failed'}
						onclick={() => cycleParallelStatus(2)}
						aria-label="Toggle loadPreferences status (demo)"
					>
						<div class="tc-parallel__card-header">
							{#if parallelStatus[2] === 'running'}
								<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
							{:else if parallelStatus[2] === 'done'}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--done" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
								</span>
							{:else}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--failed" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
								</span>
							{/if}
							<span class="tc-parallel__badge tc-parallel__badge--{parallelStatus[2]}">
								{parallelStatus[2] === 'running' ? 'Running' : parallelStatus[2] === 'done' ? 'Done' : 'Failed'}
							</span>
						</div>
						<span class="tc-parallel__fn">loadPreferences</span>
						<div class="tc-parallel__meta">
							<span class="tc-parallel__type">userId: string</span>
							<span class="tc-parallel__dur">0.8s</span>
						</div>
					</button>

					<!-- Card 3: checkPermissions -->
					<button
						class="tc-parallel__card"
						class:tc-parallel__card--done={parallelStatus[3] === 'done'}
						class:tc-parallel__card--running={parallelStatus[3] === 'running'}
						class:tc-parallel__card--failed={parallelStatus[3] === 'failed'}
						onclick={() => cycleParallelStatus(3)}
						aria-label="Toggle checkPermissions status (demo)"
					>
						<div class="tc-parallel__card-header">
							{#if parallelStatus[3] === 'running'}
								<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
							{:else if parallelStatus[3] === 'done'}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--done" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
								</span>
							{:else}
								<span class="tc-parallel__status-icon tc-parallel__status-icon--failed" aria-hidden="true">
									<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
								</span>
							{/if}
							<span class="tc-parallel__badge tc-parallel__badge--{parallelStatus[3]}">
								{parallelStatus[3] === 'running' ? 'Running' : parallelStatus[3] === 'done' ? 'Done' : 'Failed'}
							</span>
						</div>
						<span class="tc-parallel__fn">checkPermissions</span>
						<div class="tc-parallel__meta">
							<span class="tc-parallel__type">scope: string[]</span>
							<span class="tc-parallel__dur">0.3s</span>
						</div>
					</button>
				</div>

				<!-- All complete banner -->
				{#if parallelAllDone}
					<div class="tc-parallel__summary" role="status" aria-live="polite">
						<span class="tc-parallel__summary-icon" aria-hidden="true">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
						</span>
						<span class="tc-parallel__summary-text">All 4 calls complete &mdash; 1.1s total</span>
					</div>
				{:else}
					<div class="tc-parallel__summary tc-parallel__summary--pending" role="status" aria-live="polite">
						<span class="tc-spinner tc-spinner--xs" aria-hidden="true"></span>
						<span class="tc-parallel__summary-text">
							{parallelStatus.filter(s => s === 'done').length} of 4 calls complete&hellip;
						</span>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 8. In Context: Chat with Tool Calls                        -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Chat with Tool Calls</h3>
		<p class="ds-card__sub">Full composition — user message, 3 sequential tool cards, then AI response. Shows how tool cards integrate into chat flow.</p>
		<div class="tc-chat-frame">
			<!-- User message -->
			<div class="tc-chat-row tc-chat-row--user">
				<div class="tc-chat-bubble tc-chat-bubble--user">
					What were our top performing products last quarter? Give me a breakdown with numbers.
				</div>
			</div>

			<!-- Tool calls inline -->
			<div class="tc-chat-row tc-chat-row--tools">
				<!-- Tool 1: Search -->
				<button
					class="tc-card tc-card--complete tc-chat-tool"
					class:tc-card--expanded={chatToolExpanded[0]}
					onclick={() => chatToolExpanded[0] = !chatToolExpanded[0]}
					aria-expanded={chatToolExpanded[0]}
					aria-label="Toggle search tool call"
				>
					<div class="tc-card__header">
						<span class="tc-card__icon tc-card__icon--success">
							<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						</span>
						<span class="tc-card__name">search_database</span>
						<span class="tc-card__duration">0.6s</span>
						<span class="tc-card__chevron" class:tc-card__chevron--open={chatToolExpanded[0]}>
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
						</span>
					</div>
					{#if chatToolExpanded[0]}
						<div class="tc-card__body">
							<pre class="tc-card__mono">{`query: "product sales Q3 2024"
table: "orders"
date_range: "2024-07-01..2024-09-30"
→ 1,247 rows returned`}</pre>
						</div>
					{/if}
				</button>

				<!-- Tool 2: Analyze -->
				<button
					class="tc-card tc-card--complete tc-chat-tool"
					class:tc-card--expanded={chatToolExpanded[1]}
					onclick={() => chatToolExpanded[1] = !chatToolExpanded[1]}
					aria-expanded={chatToolExpanded[1]}
					aria-label="Toggle analyze tool call"
				>
					<div class="tc-card__header">
						<span class="tc-card__icon tc-card__icon--success">
							<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						</span>
						<span class="tc-card__name">analyze_data</span>
						<span class="tc-card__duration">1.4s</span>
						<span class="tc-card__chevron" class:tc-card__chevron--open={chatToolExpanded[1]}>
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
						</span>
					</div>
					{#if chatToolExpanded[1]}
						<div class="tc-card__body">
							<p class="tc-card__result-text">Ranked top 5 by revenue, computed YoY delta, filtered to products with &gt;$10K revenue.</p>
						</div>
					{/if}
				</button>

				<!-- Tool 3: Synthesize -->
				<button
					class="tc-card tc-card--complete tc-chat-tool"
					class:tc-card--expanded={chatToolExpanded[2]}
					onclick={() => chatToolExpanded[2] = !chatToolExpanded[2]}
					aria-expanded={chatToolExpanded[2]}
					aria-label="Toggle synthesize tool call"
				>
					<div class="tc-card__header">
						<span class="tc-card__icon tc-card__icon--success">
							<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						</span>
						<span class="tc-card__name">synthesize_insights</span>
						<span class="tc-card__duration">0.9s</span>
						<span class="tc-card__chevron" class:tc-card__chevron--open={chatToolExpanded[2]}>
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
						</span>
					</div>
					{#if chatToolExpanded[2]}
						<div class="tc-card__body">
							<p class="tc-card__result-text">Narrative summary generated. All figures validated against source data.</p>
						</div>
					{/if}
				</button>
			</div>

			<!-- AI response -->
			<div class="tc-chat-row tc-chat-row--assistant">
				<div class="tc-chat-bubble tc-chat-bubble--assistant">
					<p style="margin: 0 0 10px; font-weight: 600; color: var(--dt);">Here's your Q3 2024 product breakdown:</p>
					<ol style="margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; color: var(--dt2); font-size: 13px; line-height: 1.5;">
						<li><strong style="color: var(--dt);">Pro Plan</strong> — $248K revenue, +34% YoY</li>
						<li><strong style="color: var(--dt);">Enterprise Suite</strong> — $193K revenue, +21% YoY</li>
						<li><strong style="color: var(--dt);">Add-on Storage</strong> — $87K revenue, +58% YoY</li>
						<li><strong style="color: var(--dt);">Starter Plan</strong> — $54K revenue, +8% YoY</li>
						<li><strong style="color: var(--dt);">API Access</strong> — $41K revenue, +112% YoY</li>
					</ol>
					<p style="margin: 10px 0 0; font-size: 13px; color: var(--dt3);">API Access is the standout growth story — up 112% from a small base. Would you like a deeper dive into that segment?</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ═══════════════════════════════════════════════════════════ */
	/*  DEMO AREA                                                  */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-demo-area {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 560px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  BASE TOOL CARD                                             */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-card {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 11px;
		overflow: hidden;
		text-align: left;
		font-family: inherit;
		font-size: 13px;
		color: var(--dt2);
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		padding: 0;
	}
	.tc-card:hover {
		border-color: var(--dbd2);
		background: var(--dbg3);
	}

	/* State variants */
	.tc-card--pending {
		cursor: default;
		opacity: 0.7;
	}
	.tc-card--pending:hover {
		border-color: var(--dbd);
		background: var(--dbg2);
	}

	.tc-card--running {
		cursor: default;
		border-color: var(--dbd2);
		animation: tc-pulse-border 2s ease-in-out infinite;
	}
	.tc-card--running:hover {
		background: var(--dbg2);
	}

	.tc-card--complete {
		/* green tint on the border */
		border-color: rgba(34, 197, 94, 0.2);
	}
	.tc-card--complete:hover {
		border-color: rgba(34, 197, 94, 0.35);
	}
	:global(.dark) .tc-card--complete {
		border-color: rgba(34, 197, 94, 0.18);
	}
	:global(.dark) .tc-card--complete:hover {
		border-color: rgba(34, 197, 94, 0.3);
	}

	.tc-card--thinking {
		border-color: rgba(99, 102, 241, 0.25);
		background: rgba(99, 102, 241, 0.03);
	}
	.tc-card--thinking:hover {
		border-color: rgba(99, 102, 241, 0.4);
		background: rgba(99, 102, 241, 0.05);
	}
	:global(.dark) .tc-card--thinking {
		border-color: rgba(129, 140, 248, 0.2);
		background: rgba(129, 140, 248, 0.04);
	}
	:global(.dark) .tc-card--thinking:hover {
		border-color: rgba(129, 140, 248, 0.35);
		background: rgba(129, 140, 248, 0.07);
	}

	.tc-card--phase {
		border-color: rgba(59, 130, 246, 0.25);
	}
	.tc-card--phase:hover {
		border-color: rgba(59, 130, 246, 0.4);
	}
	:global(.dark) .tc-card--phase {
		border-color: rgba(96, 165, 250, 0.2);
	}
	:global(.dark) .tc-card--phase:hover {
		border-color: rgba(96, 165, 250, 0.35);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  CARD HEADER                                                */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-card__header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		min-height: 40px;
	}

	.tc-card__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		flex-shrink: 0;
		border-radius: 6px;
	}
	.tc-card__icon--muted {
		color: var(--dt3);
	}
	.tc-card__icon--success {
		color: #16a34a;
	}
	:global(.dark) .tc-card__icon--success {
		color: #4ade80;
	}
	.tc-card__icon--accent {
		color: #6366f1;
	}
	:global(.dark) .tc-card__icon--accent {
		color: #818cf8;
	}

	.tc-card__name {
		flex: 1;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tc-card__name--accent {
		font-family: inherit;
		color: #6366f1;
		font-weight: 600;
	}
	:global(.dark) .tc-card__name--accent {
		color: #818cf8;
	}

	.tc-card__duration {
		font-size: 11px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
		padding: 1px 6px;
		background: var(--dbg2);
		border-radius: 4px;
		border: 1px solid var(--dbd);
	}

	.tc-card__progress {
		font-size: 11px;
		color: var(--dt3);
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}

	.tc-card__status-label {
		font-size: 11px;
		font-weight: 600;
		flex-shrink: 0;
		padding: 2px 7px;
		border-radius: 5px;
	}
	.tc-card__status-label--pending {
		background: var(--dbg2);
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.tc-card__chevron {
		display: flex;
		align-items: center;
		color: var(--dt4);
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}
	.tc-card__chevron--open {
		transform: rotate(90deg);
	}
	.tc-card__chevron--accent {
		color: rgba(99, 102, 241, 0.5);
	}
	:global(.dark) .tc-card__chevron--accent {
		color: rgba(129, 140, 248, 0.4);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  CARD BODY                                                  */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-card__body {
		padding: 0 12px 12px;
		border-top: 1px solid var(--dbd);
		padding-top: 10px;
	}
	.tc-card__body--thinking {
		border-top-color: rgba(99, 102, 241, 0.15);
	}

	.tc-card__result-text {
		margin: 0;
		font-size: 12px;
		line-height: 1.6;
		color: var(--dt3);
	}

	.tc-card__mono {
		margin: 0;
		font-size: 11.5px;
		line-height: 1.65;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		color: var(--dt2);
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 10px 12px;
		overflow-x: auto;
		white-space: pre;
	}

	.tc-card__cot {
		margin: 0 0 8px;
		font-size: 12.5px;
		line-height: 1.65;
		color: var(--dt3);
	}
	.tc-card__cot:last-child {
		margin-bottom: 0;
	}
	.tc-card__cot code {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 11px;
		background: rgba(99, 102, 241, 0.08);
		color: #6366f1;
		padding: 1px 5px;
		border-radius: 4px;
	}
	:global(.dark) .tc-card__cot code {
		background: rgba(129, 140, 248, 0.12);
		color: #818cf8;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  SPINNER                                                    */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-spinner {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 2px solid var(--dbd2);
		border-top-color: var(--dt2);
		border-radius: 50%;
		animation: tc-rotate 0.7s linear infinite;
		flex-shrink: 0;
	}
	.tc-spinner--lg {
		width: 18px;
		height: 18px;
		border-width: 2.5px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  PHASE BADGE                                               */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-phase-badge {
		display: inline-flex;
		align-items: center;
		padding: 2px 8px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: rgba(59, 130, 246, 0.1);
		color: #2563eb;
		border: 1px solid rgba(59, 130, 246, 0.2);
		flex-shrink: 0;
	}
	:global(.dark) .tc-phase-badge {
		background: rgba(96, 165, 250, 0.12);
		color: #60a5fa;
		border-color: rgba(96, 165, 250, 0.2);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  TASK LIST                                                  */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-task-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.tc-task {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 12.5px;
		line-height: 1.5;
	}
	.tc-task__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		margin-top: 1px;
		border-radius: 50%;
		background: rgba(34, 197, 94, 0.1);
		color: #16a34a;
	}
	:global(.dark) .tc-task__icon {
		background: rgba(74, 222, 128, 0.1);
		color: #4ade80;
	}
	.tc-task__icon--pending {
		background: var(--dbg2);
		color: var(--dt4);
	}
	.tc-task--done .tc-task__text {
		color: var(--dt2);
	}
	.tc-task--pending .tc-task__text {
		color: var(--dt3);
	}
	.tc-task__text code {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 11px;
		background: var(--dbg2);
		color: var(--dt2);
		padding: 1px 5px;
		border-radius: 4px;
		border: 1px solid var(--dbd);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  AGENT STATUS CARD                                          */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-agent-card {
		position: relative;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 11px;
		overflow: hidden;
	}
	.tc-agent-card__inner {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 14px;
		padding-bottom: 16px;
	}
	.tc-agent-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 9px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		background: var(--dbg3);
		color: var(--dt2);
		border: 1px solid var(--dbd);
	}
	.tc-agent-badge__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		animation: tc-dot-pulse 1.5s ease-in-out infinite;
	}
	.tc-agent-card__label {
		font-size: 13px;
		color: var(--dt3);
		flex: 1;
	}
	.tc-agent-card__rainbow {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			#ff0080, #ff4040, #ff8000, #ffcc00,
			#40ff00, #00ffcc, #0080ff, #8000ff, #ff0080
		);
		background-size: 200% 100%;
		animation: tc-rainbow 3s linear infinite;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  SEQUENCE RAIL                                              */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-sequence {
		display: flex;
		flex-direction: column;
		max-width: 560px;
	}
	.tc-sequence__item {
		display: flex;
		gap: 0;
	}
	.tc-sequence__rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 28px;
		flex-shrink: 0;
		padding-top: 12px;
	}
	.tc-sequence__dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
	}
	.tc-sequence__dot--done {
		background: #22c55e;
		border: 2px solid #16a34a;
	}
	:global(.dark) .tc-sequence__dot--done {
		background: #4ade80;
		border-color: #22c55e;
	}
	.tc-sequence__dot--running {
		background: var(--dt3);
		border: 2px solid var(--dt4);
	}
	.tc-sequence__dot-pulse {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		background: var(--dt3);
		opacity: 0.3;
		animation: tc-dot-pulse 1.5s ease-in-out infinite;
	}
	.tc-sequence__dot--pending {
		background: var(--dbg3);
		border: 2px solid var(--dbd2);
	}
	.tc-sequence__line {
		width: 1px;
		flex: 1;
		background: var(--dbd2);
		margin: 3px 0;
		min-height: 8px;
	}
	.tc-sequence__line--faint {
		opacity: 0.4;
	}
	.tc-sequence__card {
		flex: 1;
		margin-bottom: 8px;
		margin-left: 0;
	}
	.tc-sequence__item--last .tc-sequence__card {
		margin-bottom: 0;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  CHAT FRAME                                                 */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-chat-frame {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 600px;
	}
	.tc-chat-row {
		display: flex;
	}
	.tc-chat-row--user {
		justify-content: flex-end;
	}
	.tc-chat-row--assistant {
		justify-content: flex-start;
	}
	.tc-chat-row--tools {
		flex-direction: column;
		gap: 6px;
		padding: 0 0 0 4px;
	}
	.tc-chat-bubble {
		max-width: 80%;
		padding: 11px 14px;
		border-radius: 12px;
		font-size: 13.5px;
		line-height: 1.55;
	}
	.tc-chat-bubble--user {
		background: var(--dt);
		color: #fff;
		border-bottom-right-radius: 4px;
		font-weight: 500;
	}
	:global(.dark) .tc-chat-bubble--user {
		background: rgba(255, 255, 255, 0.9);
		color: #111;
	}
	.tc-chat-bubble--assistant {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-bottom-left-radius: 4px;
		color: var(--dt2);
		max-width: 90%;
	}
	.tc-chat-tool {
		/* tool cards inside chat are slightly more compact */
		font-size: 12.5px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  KEYFRAMES                                                  */
	/* ═══════════════════════════════════════════════════════════ */
	@keyframes tc-rotate {
		to { transform: rotate(360deg); }
	}

	@keyframes tc-pulse-border {
		0%, 100% { border-color: var(--dbd); }
		50%       { border-color: var(--dbd2); }
	}

	@keyframes tc-rainbow {
		0%   { background-position: 0% 50%; }
		100% { background-position: 200% 50%; }
	}

	@keyframes tc-dot-pulse {
		0%, 100% { opacity: 0.3; transform: scale(1); }
		50%       { opacity: 0.6; transform: scale(1.2); }
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  EXTRA SPINNER SIZE                                         */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-spinner--xs {
		width: 10px;
		height: 10px;
		border-width: 1.5px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  WIDE DEMO AREA                                             */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-demo-area--wide {
		max-width: 720px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  COMPACT TOOL CALL                                          */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-compact {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 9px 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
		font-family: inherit;
		font-size: 13px;
		text-align: left;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
	}
	/* div.tc-compact is non-interactive, don't add hover effect */
	button.tc-compact:hover {
		background: var(--dbg3);
		border-color: var(--dbd2);
	}

	.tc-compact--running {
		border-color: var(--dbd2);
		animation: tc-pulse-border 2s ease-in-out infinite;
		cursor: default;
	}
	/* running cards are divs — prevent hover tint from base rule */
	div.tc-compact--running {
		pointer-events: none;
	}
	.tc-compact--done {
		border-color: rgba(34, 197, 94, 0.2);
	}
	button.tc-compact--done:hover {
		border-color: rgba(34, 197, 94, 0.35);
	}
	:global(.dark) .tc-compact--done {
		border-color: rgba(34, 197, 94, 0.18);
	}
	:global(.dark) button.tc-compact--done:hover {
		border-color: rgba(34, 197, 94, 0.3);
	}
	.tc-compact--failed {
		border-color: rgba(239, 68, 68, 0.2);
	}
	button.tc-compact--failed:hover {
		border-color: rgba(239, 68, 68, 0.35);
	}
	:global(.dark) .tc-compact--failed {
		border-color: rgba(248, 113, 113, 0.18);
	}
	:global(.dark) button.tc-compact--failed:hover {
		border-color: rgba(248, 113, 113, 0.3);
	}
	.tc-compact--pending {
		opacity: 0.6;
		cursor: default;
	}

	.tc-compact__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 5px;
		flex-shrink: 0;
	}
	.tc-compact__icon--fn   { color: var(--dt3); }
	.tc-compact__icon--done { color: #16a34a; }
	.tc-compact__icon--fail { color: #dc2626; }
	:global(.dark) .tc-compact__icon--done { color: #4ade80; }
	:global(.dark) .tc-compact__icon--fail { color: #f87171; }

	.tc-compact__fn {
		flex: 1;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		letter-spacing: -0.01em;
	}

	.tc-compact__badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		flex-shrink: 0;
		padding: 2px 7px;
		border-radius: 5px;
		font-size: 11px;
		font-weight: 600;
		border: 1px solid transparent;
	}
	.tc-compact__badge--running {
		background: rgba(234, 179, 8, 0.1);
		color: #a16207;
		border-color: rgba(234, 179, 8, 0.2);
	}
	:global(.dark) .tc-compact__badge--running {
		background: rgba(250, 204, 21, 0.1);
		color: #fbbf24;
		border-color: rgba(250, 204, 21, 0.2);
	}
	.tc-compact__badge--done {
		background: rgba(34, 197, 94, 0.1);
		color: #15803d;
		border-color: rgba(34, 197, 94, 0.2);
	}
	:global(.dark) .tc-compact__badge--done {
		background: rgba(34, 197, 94, 0.1);
		color: #4ade80;
		border-color: rgba(34, 197, 94, 0.2);
	}
	.tc-compact__badge--failed {
		background: rgba(239, 68, 68, 0.08);
		color: #b91c1c;
		border-color: rgba(239, 68, 68, 0.18);
	}
	:global(.dark) .tc-compact__badge--failed {
		background: rgba(239, 68, 68, 0.1);
		color: #f87171;
		border-color: rgba(239, 68, 68, 0.2);
	}
	.tc-compact__badge--pending {
		background: var(--dbg2);
		color: var(--dt3);
		border-color: var(--dbd);
	}

	.tc-compact__dur {
		font-size: 11px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}

	.tc-compact__chevron {
		display: flex;
		align-items: center;
		color: var(--dt4);
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}
	.tc-compact__chevron--open {
		transform: rotate(90deg);
	}

	/* expanded body */
	.tc-compact__body {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px 12px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-top: none;
		border-radius: 0 0 9px 9px;
		margin-top: -1px;
	}
	.tc-compact--open {
		border-radius: 9px 9px 0 0;
	}

	.tc-compact__error {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11.5px;
		color: #dc2626;
		background: rgba(239, 68, 68, 0.06);
		border: 1px solid rgba(239, 68, 68, 0.15);
		border-radius: 6px;
		padding: 6px 10px;
	}
	:global(.dark) .tc-compact__error {
		color: #f87171;
		background: rgba(239, 68, 68, 0.08);
		border-color: rgba(239, 68, 68, 0.2);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  FULL SIGNATURE CARD                                        */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-sig {
		background: var(--dbg2);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 11px;
		overflow: hidden;
	}
	.tc-sig--failed {
		border-color: rgba(239, 68, 68, 0.2);
	}
	.tc-sig--collapsed {
		border-color: var(--dbd);
	}
	:global(.dark) .tc-sig {
		border-color: rgba(34, 197, 94, 0.18);
	}
	:global(.dark) .tc-sig--failed {
		border-color: rgba(248, 113, 113, 0.18);
	}

	.tc-sig__header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		width: 100%;
		background: transparent;
		border: none;
		text-align: left;
		font-family: inherit;
		font-size: 13px;
		cursor: pointer;
		transition: background 0.15s;
	}
	.tc-sig__header:hover {
		background: var(--dbg3);
	}

	.tc-sig__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		flex-shrink: 0;
	}
	.tc-sig__icon--done { color: #16a34a; }
	.tc-sig__icon--fail { color: #dc2626; }
	:global(.dark) .tc-sig__icon--done { color: #4ade80; }
	:global(.dark) .tc-sig__icon--fail { color: #f87171; }

	.tc-sig__title {
		flex: 1;
		display: flex;
		align-items: baseline;
		flex-wrap: nowrap;
		gap: 0;
		min-width: 0;
		overflow: hidden;
	}
	.tc-sig__fn-name {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		flex-shrink: 0;
	}
	.tc-sig__paren {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 13px;
		color: var(--dt3);
		flex-shrink: 0;
	}
	.tc-sig__inline-params {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 11.5px;
		color: var(--dt3);
		letter-spacing: -0.01em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tc-sig__arrow-inline {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		color: var(--dt4);
		margin: 0 5px;
		flex-shrink: 0;
	}
	.tc-sig__return-inline {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 11.5px;
		color: var(--dt3);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tc-sig__brace {
		color: var(--dt4);
	}

	.tc-sig__body {
		padding: 10px 12px 12px;
		border-top: 1px solid var(--dbd);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tc-sig__section-label {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt4);
	}
	.tc-sig__section-label--return {
		margin-top: 4px;
	}

	.tc-sig__params {
		display: flex;
		flex-direction: column;
		gap: 5px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 8px 10px;
	}
	.tc-sig__params--return {
		margin-top: 4px;
	}
	.tc-sig__param-row {
		display: flex;
		align-items: baseline;
		gap: 6px;
		flex-wrap: wrap;
	}
	.tc-sig__param-name {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.tc-sig__param-type {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 10.5px;
		color: #7c3aed;
		background: rgba(124, 58, 237, 0.07);
		border: 1px solid rgba(124, 58, 237, 0.15);
		border-radius: 4px;
		padding: 0 5px;
		flex-shrink: 0;
	}
	:global(.dark) .tc-sig__param-type {
		color: #a78bfa;
		background: rgba(167, 139, 250, 0.08);
		border-color: rgba(167, 139, 250, 0.18);
	}
	.tc-sig__param-sep {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		color: var(--dt4);
		flex-shrink: 0;
	}
	.tc-sig__param-val {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 11.5px;
		word-break: break-all;
	}
	.tc-sig__param-val--str  { color: #16a34a; }
	.tc-sig__param-val--num  { color: #2563eb; }
	.tc-sig__param-val--bool { color: #ea580c; }
	.tc-sig__param-val--obj  { color: var(--dt3); }
	:global(.dark) .tc-sig__param-val--str  { color: #4ade80; }
	:global(.dark) .tc-sig__param-val--num  { color: #60a5fa; }
	:global(.dark) .tc-sig__param-val--bool { color: #fb923c; }

	.tc-sig__return-block {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.tc-sig__return-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.tc-sig__arrow {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		color: var(--dt4);
	}
	.tc-sig__return-label {
		font-size: 10.5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt4);
	}
	.tc-sig__return-val {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		color: var(--dt2);
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  TOOL CALL CHAIN                                            */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-chain {
		display: flex;
		flex-direction: column;
		max-width: 560px;
	}
	.tc-chain__item {
		display: flex;
		gap: 0;
	}
	.tc-chain__rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 28px;
		flex-shrink: 0;
		padding-top: 10px;
	}
	.tc-chain__node {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
	}
	.tc-chain__node--done {
		background: #22c55e;
		border: 2px solid #16a34a;
		color: #fff;
	}
	:global(.dark) .tc-chain__node--done {
		background: #4ade80;
		border-color: #22c55e;
		color: #14532d;
	}
	.tc-chain__node--running {
		background: var(--dbg3);
		border: 2px solid var(--dbd2);
	}
	.tc-chain__node--pending {
		background: var(--dbg2);
		border: 2px solid var(--dbd);
	}
	.tc-chain__node-pulse {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		background: var(--dt3);
		opacity: 0.25;
		animation: tc-dot-pulse 1.5s ease-in-out infinite;
	}
	.tc-chain__line {
		width: 2px;
		flex: 1;
		background: var(--dbd2);
		margin: 3px 0;
		min-height: 10px;
		border-radius: 1px;
	}
	.tc-chain__line--faint {
		opacity: 0.35;
	}
	.tc-chain__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
		min-width: 0;
	}
	.tc-chain__item--last .tc-chain__content {
		padding-bottom: 0;
	}
	.tc-chain__card {
		flex: 1;
	}
	.tc-chain__footer {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 12px;
		padding: 8px 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
	}
	.tc-chain__footer-icon {
		display: flex;
		align-items: center;
		color: var(--dt4);
	}
	.tc-chain__footer-text {
		font-size: 12px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  PARALLEL TOOL CALLS                                        */
	/* ═══════════════════════════════════════════════════════════ */
	.tc-parallel {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 680px;
	}
	.tc-parallel__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}
	@media (min-width: 580px) {
		.tc-parallel__grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.tc-parallel__card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 11px;
		text-align: left;
		font-family: inherit;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		min-width: 0;
	}
	.tc-parallel__card:hover {
		background: var(--dbg3);
	}
	.tc-parallel__card--running {
		border-color: rgba(234, 179, 8, 0.3);
		animation: tc-pulse-border-yellow 2s ease-in-out infinite;
	}
	.tc-parallel__card--done {
		border-color: rgba(34, 197, 94, 0.25);
	}
	.tc-parallel__card--done:hover {
		border-color: rgba(34, 197, 94, 0.4);
	}
	.tc-parallel__card--failed {
		border-color: rgba(239, 68, 68, 0.25);
	}
	.tc-parallel__card--failed:hover {
		border-color: rgba(239, 68, 68, 0.4);
	}
	:global(.dark) .tc-parallel__card--running { border-color: rgba(250, 204, 21, 0.2); }
	:global(.dark) .tc-parallel__card--done    { border-color: rgba(34, 197, 94, 0.18); }
	:global(.dark) .tc-parallel__card--failed  { border-color: rgba(248, 113, 113, 0.2); }

	.tc-parallel__card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tc-parallel__status-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.tc-parallel__status-icon--done {
		background: rgba(34, 197, 94, 0.12);
		color: #16a34a;
	}
	.tc-parallel__status-icon--failed {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
	}
	:global(.dark) .tc-parallel__status-icon--done   { color: #4ade80; }
	:global(.dark) .tc-parallel__status-icon--failed { color: #f87171; }

	.tc-parallel__badge {
		display: inline-flex;
		align-items: center;
		padding: 1px 6px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: 700;
		border: 1px solid transparent;
	}
	.tc-parallel__badge--running {
		background: rgba(234, 179, 8, 0.1);
		color: #a16207;
		border-color: rgba(234, 179, 8, 0.2);
	}
	.tc-parallel__badge--done {
		background: rgba(34, 197, 94, 0.1);
		color: #15803d;
		border-color: rgba(34, 197, 94, 0.2);
	}
	.tc-parallel__badge--failed {
		background: rgba(239, 68, 68, 0.08);
		color: #b91c1c;
		border-color: rgba(239, 68, 68, 0.18);
	}
	:global(.dark) .tc-parallel__badge--running { color: #fbbf24; border-color: rgba(250, 204, 21, 0.2); }
	:global(.dark) .tc-parallel__badge--done    { color: #4ade80; border-color: rgba(34, 197, 94, 0.2); }
	:global(.dark) .tc-parallel__badge--failed  { color: #f87171; border-color: rgba(239, 68, 68, 0.2); }

	.tc-parallel__fn {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tc-parallel__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}
	.tc-parallel__type {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 10.5px;
		color: var(--dt4);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tc-parallel__dur {
		font-size: 10.5px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}

	.tc-parallel__summary {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 9px 14px;
		background: rgba(34, 197, 94, 0.07);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 9px;
	}
	.tc-parallel__summary--pending {
		background: var(--dbg2);
		border-color: var(--dbd);
	}
	:global(.dark) .tc-parallel__summary {
		background: rgba(34, 197, 94, 0.06);
		border-color: rgba(34, 197, 94, 0.18);
	}
	.tc-parallel__summary-icon {
		display: flex;
		align-items: center;
		color: #16a34a;
		flex-shrink: 0;
	}
	:global(.dark) .tc-parallel__summary-icon { color: #4ade80; }
	.tc-parallel__summary-text {
		font-size: 12.5px;
		font-weight: 600;
		color: var(--dt2);
	}
	.tc-parallel__summary--pending .tc-parallel__summary-text {
		font-weight: 400;
		color: var(--dt3);
	}

	@keyframes tc-pulse-border-yellow {
		0%, 100% { border-color: rgba(234, 179, 8, 0.2); }
		50%       { border-color: rgba(234, 179, 8, 0.45); }
	}
</style>
