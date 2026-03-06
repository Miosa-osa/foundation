<script lang="ts">
	// Collapse state for phase progress demo
	let phaseStepsOpen = $state(false);
	let phase2StepsOpen = $state(false);

	// Collapse state for planning card steps
	let planApiOpen = $state(true);
	let planUiOpen = $state(false);
	let planDataOpen = $state(false);

	// Selection state for capability bundle radio cards
	let selectedBundle = $state('full-automation');
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Agent Cards</h2>
	<p class="ds-subtitle">Agent status indicators, task progress, planning cards, and capability selection patterns </p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. Agent Running Card                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Running</h3>
		<p class="ds-card__sub">Active agent with spinning loader, gradient badge, and live status text.</p>
		<div class="ag-demo-area">
			<div class="ag-card ag-card--running" aria-label="Product Agent running">
				<div class="ag-card__header">
					<div class="ag-spinner" aria-label="Running" aria-hidden="true"></div>
					<div class="ag-card__meta">
						<span class="ag-badge ag-badge--product">Product Agent</span>
						<span class="ag-card__status">Task in progress...</span>
					</div>
					<div class="ag-card__pulse" aria-hidden="true"></div>
				</div>
			</div>

			<div class="ag-card ag-card--running" aria-label="Research Agent running">
				<div class="ag-card__header">
					<div class="ag-spinner ag-spinner--research" aria-label="Running" aria-hidden="true"></div>
					<div class="ag-card__meta">
						<span class="ag-badge ag-badge--research">Research Agent</span>
						<span class="ag-card__status">Gathering intelligence...</span>
					</div>
					<div class="ag-card__pulse ag-card__pulse--research" aria-hidden="true"></div>
				</div>
			</div>

			<div class="ag-card ag-card--running" aria-label="Code Agent running">
				<div class="ag-card__header">
					<div class="ag-spinner ag-spinner--code" aria-label="Running" aria-hidden="true"></div>
					<div class="ag-card__meta">
						<span class="ag-badge ag-badge--code">Code Agent</span>
						<span class="ag-card__status">Writing implementation...</span>
					</div>
					<div class="ag-card__pulse ag-card__pulse--code" aria-hidden="true"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. Agent Completed Card                                    -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Completed</h3>
		<p class="ds-card__sub">Finished state with checkmark, elapsed time, and result summary.</p>
		<div class="ag-demo-area">
			<div class="ag-card ag-card--complete" aria-label="Research Agent completed">
				<div class="ag-card__header">
					<span class="ag-icon ag-icon--success" aria-hidden="true">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M5 13l4 4L19 7"/>
						</svg>
					</span>
					<div class="ag-card__meta">
						<span class="ag-badge ag-badge--done">Research Agent</span>
						<span class="ag-card__status ag-card__status--done">Completed · 42s</span>
					</div>
				</div>
				<div class="ag-card__result">
					<p class="ag-card__result-text">Analyzed 14 competitor products across 3 market segments. Identified 2 uncontested opportunity gaps in the mid-market tier. Confidence: 91%.</p>
					<div class="ag-card__result-tags">
						<span class="ag-tag">14 sources</span>
						<span class="ag-tag">3 segments</span>
						<span class="ag-tag">2 gaps found</span>
					</div>
				</div>
			</div>

			<div class="ag-card ag-card--complete" aria-label="Code Agent completed">
				<div class="ag-card__header">
					<span class="ag-icon ag-icon--success" aria-hidden="true">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M5 13l4 4L19 7"/>
						</svg>
					</span>
					<div class="ag-card__meta">
						<span class="ag-badge ag-badge--done">Code Agent</span>
						<span class="ag-card__status ag-card__status--done">Completed · 1m 18s</span>
					</div>
				</div>
				<div class="ag-card__result">
					<p class="ag-card__result-text">Generated REST API with 6 endpoints, validation middleware, and full TypeScript types. All 24 unit tests passing.</p>
					<div class="ag-card__result-tags">
						<span class="ag-tag">6 endpoints</span>
						<span class="ag-tag">24 tests</span>
						<span class="ag-tag">TypeScript</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. Agent Queue                                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Queue</h3>
		<p class="ds-card__sub">Multiple agents stacked showing queued, running, completed, and failed states.</p>
		<div class="ag-demo-area">
			<div class="ag-queue">
				<!-- Completed -->
				<div class="ag-queue-item ag-queue-item--complete">
					<span class="ag-queue-icon ag-queue-icon--success" aria-hidden="true">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
						</svg>
					</span>
					<span class="ag-queue-name">Research Agent</span>
					<span class="ag-queue-state ag-queue-state--complete">Done</span>
					<span class="ag-queue-time">42s</span>
				</div>

				<!-- Running -->
				<div class="ag-queue-item ag-queue-item--running">
					<span class="ag-queue-spinner" aria-label="Running" aria-hidden="true"></span>
					<span class="ag-queue-name">Product Agent</span>
					<span class="ag-queue-state ag-queue-state--running">Running</span>
					<span class="ag-queue-time">1m 04s</span>
				</div>

				<!-- Queued -->
				<div class="ag-queue-item ag-queue-item--queued">
					<span class="ag-queue-icon ag-queue-icon--muted" aria-hidden="true">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="9" stroke-width="1.75"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 7v5l3 3"/>
						</svg>
					</span>
					<span class="ag-queue-name">Design Agent</span>
					<span class="ag-queue-state ag-queue-state--queued">Queued</span>
					<span class="ag-queue-time">—</span>
				</div>

				<!-- Queued -->
				<div class="ag-queue-item ag-queue-item--queued">
					<span class="ag-queue-icon ag-queue-icon--muted" aria-hidden="true">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="9" stroke-width="1.75"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 7v5l3 3"/>
						</svg>
					</span>
					<span class="ag-queue-name">Code Agent</span>
					<span class="ag-queue-state ag-queue-state--queued">Queued</span>
					<span class="ag-queue-time">—</span>
				</div>

				<!-- Failed -->
				<div class="ag-queue-item ag-queue-item--failed">
					<span class="ag-queue-icon ag-queue-icon--error" aria-hidden="true">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</span>
					<span class="ag-queue-name">Deploy Agent</span>
					<span class="ag-queue-state ag-queue-state--failed">Failed</span>
					<span class="ag-queue-time">8s</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. Agent with Phase Progress                               -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Phase Progress</h3>
		<p class="ds-card__sub">Phase badges with step counts, collapsible step lists numbered 1–8.</p>
		<div class="ag-demo-area">
			<div class="ag-phase-card">
				<div class="ag-phase-card__header">
					<div class="ag-spinner ag-spinner--sm" aria-label="Running" aria-hidden="true"></div>
					<span class="ag-badge ag-badge--product">Product Agent</span>
					<span class="ag-phase-card__elapsed">2m 11s</span>
				</div>

				<!-- Phase 1 — complete -->
				<button
					class="ag-phase"
					class:ag-phase--open={phaseStepsOpen}
					onclick={() => phaseStepsOpen = !phaseStepsOpen}
					aria-expanded={phaseStepsOpen}
					aria-label="Toggle Phase 1 steps"
				>
					<span class="ag-phase__label ag-phase__label--done">Phase 1</span>
					<span class="ag-phase__progress ag-phase__progress--done">1/1</span>
					<span class="ag-phase__title">Discovery & Research</span>
					<span class="ag-phase__chevron" class:ag-phase__chevron--open={phaseStepsOpen} aria-hidden="true">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
						</svg>
					</span>
				</button>

				{#if phaseStepsOpen}
					<div class="ag-phase-steps">
						<div class="ag-step ag-step--done">
							<span class="ag-step__num">1</span>
							<span class="ag-step__text">Analyzed 14 competitor products across 3 segments</span>
							<span class="ag-step__check" aria-hidden="true">
								<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
								</svg>
							</span>
						</div>
					</div>
				{/if}

				<!-- Phase 2 — in progress -->
				<button
					class="ag-phase ag-phase--active"
					class:ag-phase--open={phase2StepsOpen}
					onclick={() => phase2StepsOpen = !phase2StepsOpen}
					aria-expanded={phase2StepsOpen}
					aria-label="Toggle Phase 2 steps"
				>
					<span class="ag-phase__label ag-phase__label--active">Phase 2</span>
					<span class="ag-phase__progress ag-phase__progress--active">2/3</span>
					<span class="ag-phase__title">Synthesis & Planning</span>
					<span class="ag-phase__chevron" class:ag-phase__chevron--open={phase2StepsOpen} aria-hidden="true">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
						</svg>
					</span>
				</button>

				{#if phase2StepsOpen}
					<div class="ag-phase-steps">
						<div class="ag-step ag-step--done">
							<span class="ag-step__num">2</span>
							<span class="ag-step__text">Mapped opportunity gaps to product requirements</span>
							<span class="ag-step__check" aria-hidden="true">
								<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
								</svg>
							</span>
						</div>
						<div class="ag-step ag-step--done">
							<span class="ag-step__num">3</span>
							<span class="ag-step__text">Generated prioritized feature backlog with effort estimates</span>
							<span class="ag-step__check" aria-hidden="true">
								<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
								</svg>
							</span>
						</div>
						<div class="ag-step ag-step--running">
							<span class="ag-step__num">4</span>
							<span class="ag-step__text">Drafting go-to-market positioning brief...</span>
							<span class="ag-step__spinner" aria-hidden="true"></span>
						</div>
					</div>
				{/if}

				<!-- Phase 3 — pending -->
				<div class="ag-phase ag-phase--pending" aria-label="Phase 3 pending">
					<span class="ag-phase__label ag-phase__label--pending">Phase 3</span>
					<span class="ag-phase__progress ag-phase__progress--pending">0/4</span>
					<span class="ag-phase__title">Execution Planning</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. Agent Planning Card                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Planning Card</h3>
		<p class="ds-card__sub">Update plan and align requirements actions, numbered step list with collapsible sections.</p>
		<div class="ag-demo-area">
			<div class="ag-plan-card">
				<div class="ag-plan-card__header">
					<div class="ag-plan-card__title-row">
						<span class="ag-plan-card__icon" aria-hidden="true">
							<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
							</svg>
						</span>
						<h4 class="ag-plan-card__title">Implementation Plan</h4>
					</div>
					<div class="ag-plan-card__actions">
						<button class="ag-plan-action" aria-label="Update Plan">
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
							</svg>
							Update Plan
						</button>
						<button class="ag-plan-action" aria-label="Align Requirements">
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
							</svg>
							Align Requirements
						</button>
					</div>
				</div>

				<div class="ag-plan-sections">
					<!-- API Endpoints section -->
					<div class="ag-plan-section">
						<button
							class="ag-plan-section__toggle"
							onclick={() => planApiOpen = !planApiOpen}
							aria-expanded={planApiOpen}
							aria-label="Toggle API Endpoints section"
						>
							<span class="ag-plan-section__num">1</span>
							<span class="ag-plan-section__label">API Endpoints</span>
							<span class="ag-plan-section__chevron" class:ag-plan-section__chevron--open={planApiOpen} aria-hidden="true">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
								</svg>
							</span>
						</button>
						{#if planApiOpen}
							<div class="ag-plan-section__body">
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">1.1</span>
									<span class="ag-plan-step__text"><code>POST /v1/agents/run</code> — trigger agent execution with payload validation</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">1.2</span>
									<span class="ag-plan-step__text"><code>GET /v1/agents/:id/status</code> — poll current phase, step count, elapsed time</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">1.3</span>
									<span class="ag-plan-step__text"><code>GET /v1/agents/:id/result</code> — fetch completed output with metadata</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">1.4</span>
									<span class="ag-plan-step__text"><code>DELETE /v1/agents/:id</code> — cancel running agent, return partial result</span>
								</div>
							</div>
						{/if}
					</div>

					<!-- UI Requirements section -->
					<div class="ag-plan-section">
						<button
							class="ag-plan-section__toggle"
							onclick={() => planUiOpen = !planUiOpen}
							aria-expanded={planUiOpen}
							aria-label="Toggle UI Requirements section"
						>
							<span class="ag-plan-section__num">2</span>
							<span class="ag-plan-section__label">UI Requirements</span>
							<span class="ag-plan-section__chevron" class:ag-plan-section__chevron--open={planUiOpen} aria-hidden="true">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
								</svg>
							</span>
						</button>
						{#if planUiOpen}
							<div class="ag-plan-section__body">
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">2.1</span>
									<span class="ag-plan-step__text">Agent status card with spinning badge and gradient glow during active runs</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">2.2</span>
									<span class="ag-plan-step__text">Phase progress bar with collapsible step list and real-time step completion</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">2.3</span>
									<span class="ag-plan-step__text">Queue view showing all agents with state chips and elapsed timers</span>
								</div>
							</div>
						{/if}
					</div>

					<!-- Data Persistence section -->
					<div class="ag-plan-section">
						<button
							class="ag-plan-section__toggle"
							onclick={() => planDataOpen = !planDataOpen}
							aria-expanded={planDataOpen}
							aria-label="Toggle Data Persistence section"
						>
							<span class="ag-plan-section__num">3</span>
							<span class="ag-plan-section__label">Data Persistence</span>
							<span class="ag-plan-section__chevron" class:ag-plan-section__chevron--open={planDataOpen} aria-hidden="true">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
								</svg>
							</span>
						</button>
						{#if planDataOpen}
							<div class="ag-plan-section__body">
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">3.1</span>
									<span class="ag-plan-step__text">Store agent runs in <code>agent_runs</code> table with status, phase JSON, and result blob</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">3.2</span>
									<span class="ag-plan-step__text">Write step completions to append-only <code>agent_events</code> log for audit trail</span>
								</div>
								<div class="ag-plan-step">
									<span class="ag-plan-step__num">3.3</span>
									<span class="ag-plan-step__text">Expire runs older than 30 days via scheduled cleanup job</span>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 6. Agent Selection Radio Cards                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Selection Radio Cards</h3>
		<p class="ds-card__sub">Radio-button style selection list for choosing capability bundles.</p>
		<div class="ag-demo-area">
			<div class="ag-radio-list" role="radiogroup" aria-label="Choose capability bundle">

				<label class="ag-radio-card" class:ag-radio-card--selected={selectedBundle === 'full-automation'}>
					<input
						type="radio"
						name="bundle"
						value="full-automation"
						bind:group={selectedBundle}
						class="ag-radio-card__input"
						aria-label="Full Automation Bundle"
					/>
					<span class="ag-radio-card__dot" aria-hidden="true"></span>
					<span class="ag-radio-card__body">
						<span class="ag-radio-card__name">Full Automation Bundle</span>
						<span class="ag-radio-card__desc">Research + Product + Code + Deploy agents running end-to-end with no manual steps.</span>
					</span>
					<span class="ag-radio-card__badge ag-radio-card__badge--popular">Popular</span>
				</label>

				<label class="ag-radio-card" class:ag-radio-card--selected={selectedBundle === 'creator-toolkit'}>
					<input
						type="radio"
						name="bundle"
						value="creator-toolkit"
						bind:group={selectedBundle}
						class="ag-radio-card__input"
						aria-label="Creator Toolkit"
					/>
					<span class="ag-radio-card__dot" aria-hidden="true"></span>
					<span class="ag-radio-card__body">
						<span class="ag-radio-card__name">Creator Toolkit</span>
						<span class="ag-radio-card__desc">Content + Design + Social agents optimised for marketing teams and brand content pipelines.</span>
					</span>
				</label>

				<label class="ag-radio-card" class:ag-radio-card--selected={selectedBundle === 'intel-pipeline'}>
					<input
						type="radio"
						name="bundle"
						value="intel-pipeline"
						bind:group={selectedBundle}
						class="ag-radio-card__input"
						aria-label="Intel Pipeline"
					/>
					<span class="ag-radio-card__dot" aria-hidden="true"></span>
					<span class="ag-radio-card__body">
						<span class="ag-radio-card__name">Intel Pipeline</span>
						<span class="ag-radio-card__desc">Research + Analyst agents delivering competitive intelligence, trend reports, and market signals.</span>
					</span>
				</label>

				<label class="ag-radio-card" class:ag-radio-card--selected={selectedBundle === 'lean-starter'}>
					<input
						type="radio"
						name="bundle"
						value="lean-starter"
						bind:group={selectedBundle}
						class="ag-radio-card__input"
						aria-label="Lean Starter"
					/>
					<span class="ag-radio-card__dot" aria-hidden="true"></span>
					<span class="ag-radio-card__body">
						<span class="ag-radio-card__name">Lean Starter</span>
						<span class="ag-radio-card__desc">Single Research agent for teams exploring AI automation before committing to a full pipeline.</span>
					</span>
				</label>

			</div>
		</div>
	</div>

</section>

<style>
/* ── Demo area ────────────────────────────────────────────────── */
.ag-demo-area {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

/* ── Agent Running Card ───────────────────────────────────────── */
.ag-card {
	border: 1px solid var(--dbd);
	border-radius: 12px;
	padding: 14px 16px;
	background: var(--dbg);
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.ag-card--running {
	border-color: var(--dbd2);
}

.ag-card__header {
	display: flex;
	align-items: center;
	gap: 10px;
}

.ag-card__meta {
	display: flex;
	flex-direction: column;
	gap: 2px;
	flex: 1;
}

.ag-card__status {
	font-size: 12px;
	color: var(--dt3);
}

.ag-card__status--done {
	color: var(--dt3);
}

/* Animated glow pulse behind the running card */
.ag-card__pulse {
	position: absolute;
	top: -20px;
	right: -20px;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%);
	animation: ag-pulse 2.4s ease-in-out infinite;
	pointer-events: none;
}
.ag-card__pulse--research {
	background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%);
}
.ag-card__pulse--code {
	background: radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%);
}

@keyframes ag-pulse {
	0%, 100% { opacity: 0.6; transform: scale(1); }
	50%       { opacity: 1;   transform: scale(1.25); }
}

/* ── Spinners ─────────────────────────────────────────────────── */
.ag-spinner {
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	border: 2px solid transparent;
	border-top-color: #6366f1;
	border-right-color: rgba(99, 102, 241, 0.3);
	animation: ag-spin 0.75s linear infinite;
}
.ag-spinner--research {
	border-top-color: #10b981;
	border-right-color: rgba(16, 185, 129, 0.3);
}
.ag-spinner--code {
	border-top-color: #f59e0b;
	border-right-color: rgba(245, 158, 11, 0.3);
}
.ag-spinner--sm {
	width: 14px;
	height: 14px;
}

@keyframes ag-spin {
	to { transform: rotate(360deg); }
}

/* ── Agent Badges ─────────────────────────────────────────────── */
.ag-badge {
	display: inline-flex;
	align-items: center;
	padding: 3px 9px;
	border-radius: 100px;
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.01em;
	width: fit-content;
}
.ag-badge--product {
	background: linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) 100%);
	color: #6366f1;
	border: 1px solid rgba(99,102,241,0.25);
}
.dark .ag-badge--product {
	background: linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%);
	color: #a5b4fc;
	border-color: rgba(99,102,241,0.35);
}
.ag-badge--research {
	background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.12) 100%);
	color: #10b981;
	border: 1px solid rgba(16,185,129,0.25);
}
.dark .ag-badge--research {
	background: linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.18) 100%);
	color: #6ee7b7;
	border-color: rgba(16,185,129,0.35);
}
.ag-badge--code {
	background: linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.12) 100%);
	color: #d97706;
	border: 1px solid rgba(245,158,11,0.25);
}
.dark .ag-badge--code {
	background: linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(217,119,6,0.18) 100%);
	color: #fcd34d;
	border-color: rgba(245,158,11,0.35);
}
.ag-badge--done {
	background: var(--dbg2);
	color: var(--dt3);
	border: 1px solid var(--dbd);
}

/* ── Icon ─────────────────────────────────────────────────────── */
.ag-icon {
	flex-shrink: 0;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ag-icon--success {
	background: rgba(16,185,129,0.12);
	color: #10b981;
}
.dark .ag-icon--success {
	background: rgba(16,185,129,0.2);
	color: #6ee7b7;
}

/* ── Agent Completed Result ───────────────────────────────────── */
.ag-card__result {
	padding-top: 10px;
	border-top: 1px solid var(--dbd);
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.ag-card__result-text {
	font-size: 13px;
	color: var(--dt2);
	line-height: 1.55;
	margin: 0;
}
.ag-card__result-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}
.ag-tag {
	font-size: 11px;
	font-weight: 500;
	padding: 2px 8px;
	border-radius: 100px;
	background: var(--dbg2);
	color: var(--dt3);
	border: 1px solid var(--dbd);
}

/* ── Agent Queue ──────────────────────────────────────────────── */
.ag-queue {
	border: 1px solid var(--dbd);
	border-radius: 12px;
	overflow: hidden;
	background: var(--dbg);
}
.ag-queue-item {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 11px 16px;
	border-bottom: 1px solid var(--dbd);
	font-size: 13px;
}
.ag-queue-item:last-child {
	border-bottom: none;
}
.ag-queue-item--complete { opacity: 0.7; }
.ag-queue-item--queued   { opacity: 0.5; }

.ag-queue-icon {
	flex-shrink: 0;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ag-queue-icon--success {
	background: rgba(16,185,129,0.12);
	color: #10b981;
}
.dark .ag-queue-icon--success {
	background: rgba(16,185,129,0.2);
	color: #6ee7b7;
}
.ag-queue-icon--muted {
	background: var(--dbg2);
	color: var(--dt3);
}
.ag-queue-icon--error {
	background: rgba(239,68,68,0.1);
	color: #ef4444;
}
.dark .ag-queue-icon--error {
	background: rgba(239,68,68,0.18);
	color: #fca5a5;
}

.ag-queue-spinner {
	flex-shrink: 0;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 2px solid transparent;
	border-top-color: #6366f1;
	border-right-color: rgba(99,102,241,0.3);
	animation: ag-spin 0.75s linear infinite;
}

.ag-queue-name {
	flex: 1;
	font-weight: 500;
	color: var(--dt);
}
.ag-queue-item--failed .ag-queue-name {
	color: #ef4444;
}
.dark .ag-queue-item--failed .ag-queue-name {
	color: #fca5a5;
}

.ag-queue-state {
	font-size: 11px;
	font-weight: 600;
	padding: 2px 7px;
	border-radius: 100px;
}
.ag-queue-state--complete {
	background: rgba(16,185,129,0.1);
	color: #10b981;
}
.dark .ag-queue-state--complete {
	background: rgba(16,185,129,0.18);
	color: #6ee7b7;
}
.ag-queue-state--running {
	background: rgba(99,102,241,0.1);
	color: #6366f1;
}
.dark .ag-queue-state--running {
	background: rgba(99,102,241,0.18);
	color: #a5b4fc;
}
.ag-queue-state--queued {
	background: var(--dbg2);
	color: var(--dt3);
}
.ag-queue-state--failed {
	background: rgba(239,68,68,0.1);
	color: #ef4444;
}
.dark .ag-queue-state--failed {
	background: rgba(239,68,68,0.18);
	color: #fca5a5;
}

.ag-queue-time {
	font-size: 12px;
	color: var(--dt3);
	min-width: 36px;
	text-align: right;
	font-variant-numeric: tabular-nums;
}

/* ── Phase Progress Card ──────────────────────────────────────── */
.ag-phase-card {
	border: 1px solid var(--dbd);
	border-radius: 12px;
	overflow: hidden;
	background: var(--dbg);
}

.ag-phase-card__header {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 16px;
	border-bottom: 1px solid var(--dbd);
}

.ag-phase-card__elapsed {
	margin-left: auto;
	font-size: 12px;
	color: var(--dt3);
	font-variant-numeric: tabular-nums;
}

.ag-phase {
	display: flex;
	align-items: center;
	gap: 8px;
	width: 100%;
	padding: 10px 16px;
	border: none;
	background: transparent;
	border-bottom: 1px solid var(--dbd);
	font-family: inherit;
	font-size: 13px;
	cursor: pointer;
	text-align: left;
	color: var(--dt);
	transition: background 0.12s;
}
.ag-phase:last-child {
	border-bottom: none;
}
.ag-phase:not(.ag-phase--pending):hover {
	background: var(--dbg2);
}
.ag-phase--active {
	background: rgba(99,102,241,0.04);
}
.dark .ag-phase--active {
	background: rgba(99,102,241,0.07);
}
.ag-phase--pending {
	cursor: default;
}

.ag-phase__label {
	flex-shrink: 0;
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	padding: 2px 6px;
	border-radius: 4px;
}
.ag-phase__label--done {
	background: rgba(16,185,129,0.1);
	color: #10b981;
}
.dark .ag-phase__label--done {
	background: rgba(16,185,129,0.18);
	color: #6ee7b7;
}
.ag-phase__label--active {
	background: rgba(99,102,241,0.12);
	color: #6366f1;
}
.dark .ag-phase__label--active {
	background: rgba(99,102,241,0.2);
	color: #a5b4fc;
}
.ag-phase__label--pending {
	background: var(--dbg2);
	color: var(--dt4);
}

.ag-phase__progress {
	flex-shrink: 0;
	font-size: 11px;
	font-weight: 600;
	font-variant-numeric: tabular-nums;
}
.ag-phase__progress--done   { color: #10b981; }
.dark .ag-phase__progress--done { color: #6ee7b7; }
.ag-phase__progress--active { color: #6366f1; }
.dark .ag-phase__progress--active { color: #a5b4fc; }
.ag-phase__progress--pending { color: var(--dt4); }

.ag-phase__title {
	flex: 1;
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
}
.ag-phase--pending .ag-phase__title {
	color: var(--dt3);
}

.ag-phase__chevron {
	flex-shrink: 0;
	color: var(--dt3);
	transition: transform 0.2s ease;
}
.ag-phase__chevron--open {
	transform: rotate(180deg);
}

/* Steps inside a phase */
.ag-phase-steps {
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--dbd);
}
.ag-step {
	display: flex;
	align-items: flex-start;
	gap: 10px;
	padding: 8px 16px 8px 36px;
	font-size: 12px;
	color: var(--dt2);
	border-bottom: 1px solid var(--dbg3);
}
.ag-step:last-child {
	border-bottom: none;
}
.ag-step--running {
	background: rgba(99,102,241,0.03);
}
.ag-step__num {
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: var(--dbg2);
	color: var(--dt3);
	font-size: 10px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ag-step--done .ag-step__num {
	background: rgba(16,185,129,0.12);
	color: #10b981;
}
.dark .ag-step--done .ag-step__num {
	background: rgba(16,185,129,0.2);
	color: #6ee7b7;
}
.ag-step__text {
	flex: 1;
	line-height: 1.5;
}
.ag-step__check {
	flex-shrink: 0;
	color: #10b981;
	margin-top: 1px;
}
.dark .ag-step__check { color: #6ee7b7; }

.ag-step__spinner {
	flex-shrink: 0;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	border: 1.75px solid transparent;
	border-top-color: #6366f1;
	border-right-color: rgba(99,102,241,0.3);
	animation: ag-spin 0.75s linear infinite;
	margin-top: 2px;
}

/* ── Planning Card ────────────────────────────────────────────── */
.ag-plan-card {
	border: 1px solid var(--dbd);
	border-radius: 12px;
	overflow: hidden;
	background: var(--dbg);
}

.ag-plan-card__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 14px 16px;
	border-bottom: 1px solid var(--dbd);
	flex-wrap: wrap;
}

.ag-plan-card__title-row {
	display: flex;
	align-items: center;
	gap: 8px;
}

.ag-plan-card__icon {
	color: var(--dt3);
	display: flex;
	align-items: center;
}

.ag-plan-card__title {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt);
	margin: 0;
}

.ag-plan-card__actions {
	display: flex;
	gap: 6px;
}

.ag-plan-action {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 5px 10px;
	border-radius: 8px;
	border: 1px solid var(--dbd);
	background: var(--dbg);
	font-family: inherit;
	font-size: 12px;
	font-weight: 500;
	color: var(--dt2);
	cursor: pointer;
	transition: all 0.12s;
}
.ag-plan-action:hover {
	background: var(--dbg2);
	color: var(--dt);
	border-color: var(--dbd2);
}

.ag-plan-sections {
	display: flex;
	flex-direction: column;
}

.ag-plan-section {
	border-bottom: 1px solid var(--dbd);
}
.ag-plan-section:last-child {
	border-bottom: none;
}

.ag-plan-section__toggle {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding: 10px 16px;
	border: none;
	background: transparent;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
	cursor: pointer;
	text-align: left;
	transition: background 0.12s;
}
.ag-plan-section__toggle:hover {
	background: var(--dbg2);
}

.ag-plan-section__num {
	flex-shrink: 0;
	width: 20px;
	height: 20px;
	border-radius: 6px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	font-size: 11px;
	font-weight: 700;
	color: var(--dt3);
	display: flex;
	align-items: center;
	justify-content: center;
}

.ag-plan-section__label {
	flex: 1;
}

.ag-plan-section__chevron {
	flex-shrink: 0;
	color: var(--dt3);
	transition: transform 0.2s ease;
}
.ag-plan-section__chevron--open {
	transform: rotate(180deg);
}

.ag-plan-section__body {
	display: flex;
	flex-direction: column;
	padding: 0 16px 10px;
	gap: 0;
}

.ag-plan-step {
	display: flex;
	align-items: flex-start;
	gap: 10px;
	padding: 7px 0;
	font-size: 12px;
	color: var(--dt2);
	border-bottom: 1px solid var(--dbg3);
	line-height: 1.5;
}
.ag-plan-step:last-child {
	border-bottom: none;
}
.ag-plan-step__num {
	flex-shrink: 0;
	font-size: 10px;
	font-weight: 700;
	color: var(--dt4);
	min-width: 24px;
	padding-top: 1px;
}
.ag-plan-step__text {
	flex: 1;
}
.ag-plan-step__text code {
	font-family: var(--bos-font-code-family, ui-monospace, 'Cascadia Mono', monospace);
	font-size: 11px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	padding: 1px 5px;
	border-radius: 4px;
	color: var(--dt);
}

/* ── Radio Cards ──────────────────────────────────────────────── */
.ag-radio-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.ag-radio-card {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	padding: 14px 16px;
	border: 1.5px solid var(--dbd);
	border-radius: 12px;
	background: var(--dbg);
	cursor: pointer;
	transition: all 0.15s;
	position: relative;
}
.ag-radio-card:hover {
	border-color: var(--dbd2);
	background: var(--dbg2);
}
.ag-radio-card--selected {
	border-color: #6366f1;
	background: rgba(99,102,241,0.04);
}
.dark .ag-radio-card--selected {
	border-color: #818cf8;
	background: rgba(99,102,241,0.08);
}

.ag-radio-card__input {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
}

.ag-radio-card__dot {
	flex-shrink: 0;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 1.75px solid var(--dbd2);
	background: var(--dbg);
	margin-top: 1px;
	transition: all 0.15s;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ag-radio-card--selected .ag-radio-card__dot {
	border-color: #6366f1;
	background: #6366f1;
	box-shadow: inset 0 0 0 3px var(--dbg);
}
.dark .ag-radio-card--selected .ag-radio-card__dot {
	border-color: #818cf8;
	background: #818cf8;
}

.ag-radio-card__body {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 3px;
}

.ag-radio-card__name {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt);
}

.ag-radio-card__desc {
	font-size: 12px;
	color: var(--dt3);
	line-height: 1.5;
}

.ag-radio-card__badge {
	flex-shrink: 0;
	align-self: flex-start;
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	padding: 2px 7px;
	border-radius: 100px;
}
.ag-radio-card__badge--popular {
	background: rgba(99,102,241,0.12);
	color: #6366f1;
}
.dark .ag-radio-card__badge--popular {
	background: rgba(99,102,241,0.2);
	color: #a5b4fc;
}
</style>
