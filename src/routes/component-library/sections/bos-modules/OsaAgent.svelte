<script lang="ts">
	// ── OSA Modes (production) ────────────────────────────────────────────────
	type OsaMode = {
		id: string;
		label: string;
		accent: string;
		description: string;
		icon: string; // SVG path
	};

	const osaModes: OsaMode[] = [
		{
			id: 'build',
			label: 'BUILD',
			accent: '#3b82f6',
			description: 'Create modules & features',
			icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
		},
		{
			id: 'assist',
			label: 'ASSIST',
			accent: '#22c55e',
			description: 'Help with tasks',
			icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
		},
		{
			id: 'analyze',
			label: 'ANALYZE',
			accent: '#a855f7',
			description: 'Surface insights',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
		},
		{
			id: 'execute',
			label: 'EXECUTE',
			accent: '#f59e0b',
			description: 'Run actions & workflows',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
		},
		{
			id: 'maintain',
			label: 'MAINTAIN',
			accent: '#6b7280',
			description: 'Monitor systems',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
		},
	];

	// ── Section 1: OSA Pill ───────────────────────────────────────────────────
	let pillExpanded = $state(false);
	let pillInput = $state('');
	let activePillMode = $state('build');
	let activePillModeData = $derived(osaModes.find(m => m.id === activePillMode) ?? osaModes[0]);

	// ── Section 2: Mode Selector Dropdown ────────────────────────────────────
	let dropdownOpen = $state(false);
	let dropdownMode = $state('assist');
	let dropdownModeData = $derived(osaModes.find(m => m.id === dropdownMode) ?? osaModes[1]);

	function selectMode(id: string) {
		dropdownMode = id;
		dropdownOpen = false;
	}

	// ── Section 4: Response Stream ───────────────────────────────────────────
	type Message = {
		role: 'user' | 'osa';
		content: string;
		mode?: string;
		confidence?: number;
		streaming?: boolean;
	};

	const streamMessages: Message[] = [
		{ role: 'user', content: 'Create a revenue analytics module for the dashboard.' },
		{
			role: 'osa',
			content: 'I\'ll scaffold a **RevenueAnalytics** module with three sections: **Overview**, **Trends**, and **Breakdown**. The module will include:\n\n- MRR / ARR widgets with sparklines\n- Cohort retention heatmap\n- Revenue by segment bar chart\n\nShall I proceed with the default color scheme?',
			mode: 'build',
			confidence: 94,
		},
		{ role: 'user', content: 'Yes, use the ocean theme.' },
		{
			role: 'osa',
			content: 'Generating module with ocean theme...',
			mode: 'build',
			confidence: 91,
			streaming: true,
		},
	];

	// ── Section 5: Skill Decision Card ───────────────────────────────────────
	type SkillStatus = 'proposed' | 'running' | 'completed' | 'failed';
	let skillStatus = $state<SkillStatus>('proposed');

	function runSkill() {
		skillStatus = 'running';
		setTimeout(() => { skillStatus = 'completed'; }, 1800);
	}

	function resetSkill() {
		skillStatus = 'proposed';
	}

	// ── Section 6: System Hierarchy ──────────────────────────────────────────
	const moduleCategories = [
		'productivity', 'communication', 'finance', 'analytics',
		'automation', 'integration', 'utilities', 'custom',
	];
	const visibilityLevels = ['private', 'workspace', 'public'];
	const actionTypes = ['function', 'api', 'workflow'];
</script>

<section class="ds-section">
	<h2 class="ds-title">OSA Agent</h2>
	<p class="ds-desc">The Operating System Agent — a floating glass intelligence layer built on five production modes. Each component below demonstrates a distinct surface from the real BOS implementation.</p>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     1. OSA PILL — COLLAPSED & EXPANDED
	═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">OSA Pill — Collapsed & Expanded</h3>
		<p class="ds-card__sub">The glass pill lives above the dock. Click to expand, press Escape to collapse. Both states use the same glass token stack: rgba white 0.7, blur 28px, saturate 1.5.</p>

		<div class="oa-pill-stage">
			<!-- Collapsed pill -->
			{#if !pillExpanded}
				<button
					class="oa-pill oa-pill--collapsed"
					onclick={() => pillExpanded = true}
					aria-label="Open OSA Agent"
					aria-expanded={pillExpanded}
				>
					<span class="oa-pill__mode-dot" style="background: {activePillModeData.accent};"></span>
					<span class="oa-pill__placeholder">Ask OSA…</span>
					<svg class="oa-pill__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</button>
			{:else}
				<!-- Expanded pill -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="oa-pill oa-pill--expanded"
					onkeydown={(e) => { if (e.key === 'Escape') { pillExpanded = false; pillInput = ''; } }}
				>
					<!-- Response stream area -->
					<div class="oa-pill__stream">
						<div class="oa-pill__stream-indicator">
							<span class="oa-mode-dot" style="background: {activePillModeData.accent};"></span>
							<span class="oa-pill__stream-label" style="color: {activePillModeData.accent};">{activePillModeData.label}</span>
							<span class="oa-pill__stream-text">{activePillModeData.description}</span>
						</div>
						<p class="oa-pill__stream-preview">Ready to help. What would you like to build?</p>
					</div>

					<!-- Input row -->
					<div class="oa-pill__input-row">
						<!-- Mode selector inline -->
						<button
							class="oa-pill__mode-btn"
							style="--m-accent: {activePillModeData.accent};"
							onclick={() => {
								const idx = osaModes.findIndex(m => m.id === activePillMode);
								activePillMode = osaModes[(idx + 1) % osaModes.length].id;
							}}
							aria-label="Cycle mode"
						>
							<span class="oa-mode-dot" style="background: {activePillModeData.accent};"></span>
							<span class="oa-pill__mode-label" style="color: {activePillModeData.accent};">{activePillModeData.label}</span>
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
								<path d="M19 9l-7 7-7-7"/>
							</svg>
						</button>

						<input
							class="oa-pill__input"
							type="text"
							placeholder="Ask OSA anything…"
							bind:value={pillInput}
							aria-label="OSA prompt input"
						/>

						<button
							class="oa-pill__send"
							style="background: {activePillModeData.accent};"
							aria-label="Send message"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M5 12h14M12 5l7 7-7 7"/>
							</svg>
						</button>
					</div>

					<button class="oa-pill__collapse" onclick={() => { pillExpanded = false; pillInput = ''; }} aria-label="Collapse OSA">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
							<path d="M18 15l-6-6-6 6"/>
						</svg>
						<span>Close (Esc)</span>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     2. MODE SELECTOR DROPDOWN
	═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Mode Selector Dropdown</h3>
		<p class="ds-card__sub">The mode picker surfaces from within the pill. Glass card with backdrop-blur 32px, 5 clickable options, checkmark for active state, dropdownIn animation.</p>

		<div class="oa-dropdown-stage">
			<!-- Trigger -->
			<div class="oa-dropdown-wrap" style="position: relative;">
				<button
					class="oa-mode-trigger"
					style="--m-accent: {dropdownModeData.accent};"
					onclick={() => dropdownOpen = !dropdownOpen}
					aria-haspopup="listbox"
					aria-expanded={dropdownOpen}
				>
					<span class="oa-mode-dot" style="background: {dropdownModeData.accent};"></span>
					<svg class="oa-mode-trigger__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dropdownModeData.accent} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d={dropdownModeData.icon}/>
					</svg>
					<span class="oa-mode-trigger__label" style="color: {dropdownModeData.accent};">{dropdownModeData.label}</span>
					<svg class="oa-mode-trigger__chevron" class:oa-mode-trigger__chevron--open={dropdownOpen} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				{#if dropdownOpen}
					<div class="oa-mode-dropdown" role="listbox" aria-label="Select OSA mode">
						{#each osaModes as mode}
							<button
								class="oa-mode-option"
								class:oa-mode-option--active={dropdownMode === mode.id}
								onclick={() => selectMode(mode.id)}
								role="option"
								aria-selected={dropdownMode === mode.id}
							>
								<span class="oa-mode-dot oa-mode-dot--sm" style="background: {mode.accent};"></span>
								<svg class="oa-mode-option__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mode.accent} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d={mode.icon}/>
								</svg>
								<div class="oa-mode-option__body">
									<span class="oa-mode-option__label" style="color: {mode.accent};">{mode.label}</span>
									<span class="oa-mode-option__desc">{mode.description}</span>
								</div>
								{#if dropdownMode === mode.id}
									<svg class="oa-mode-option__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mode.accent} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M20 6L9 17l-5-5"/>
									</svg>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<p class="oa-dropdown-hint">Active mode: <strong style="color: {dropdownModeData.accent};">{dropdownModeData.label}</strong> — {dropdownModeData.description}</p>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     3. MODE INDICATOR BADGE
	═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Mode Indicator Badge</h3>
		<p class="ds-card__sub">Minimal inline badge shown on each OSA response. Colored dot + mode name, uppercase, 600 weight, 0.04em letter-spacing. Optionally shows confidence score.</p>

		<div class="oa-badges-row">
			{#each osaModes as mode}
				<div class="oa-mode-badge" style="--b-accent: {mode.accent};">
					<span class="oa-mode-badge__dot" style="background: {mode.accent};"></span>
					<span class="oa-mode-badge__label" style="color: {mode.accent};">{mode.label}</span>
				</div>
			{/each}
		</div>

		<div class="oa-badges-row oa-badges-row--mt">
			{#each [{ mode: osaModes[0], conf: 94 }, { mode: osaModes[2], conf: 87 }, { mode: osaModes[3], conf: 91 }] as item}
				<div class="oa-mode-badge oa-mode-badge--conf" style="--b-accent: {item.mode.accent};">
					<span class="oa-mode-badge__dot" style="background: {item.mode.accent};"></span>
					<span class="oa-mode-badge__label" style="color: {item.mode.accent};">{item.mode.label}</span>
					<span class="oa-mode-badge__conf" style="color: {item.mode.accent};">{item.conf}%</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     4. RESPONSE STREAM
	═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Response Stream</h3>
		<p class="ds-card__sub">Alternating user / OSA messages. OSA messages lead with the ModeIndicator badge. Streaming state shows a blinking cursor. Dark glass backgrounds for OSA bubbles.</p>

		<div class="oa-stream">
			{#each streamMessages as msg}
				{#if msg.role === 'user'}
					<div class="oa-stream__row oa-stream__row--user">
						<div class="oa-stream__bubble oa-stream__bubble--user">
							{msg.content}
						</div>
					</div>
				{:else}
					{@const modeData = osaModes.find(m => m.id === msg.mode) ?? osaModes[0]}
					<div class="oa-stream__row oa-stream__row--osa">
						<div class="oa-stream__avatar" style="background: color-mix(in srgb, {modeData.accent} 15%, transparent); border-color: color-mix(in srgb, {modeData.accent} 30%, transparent);">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={modeData.accent} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d={modeData.icon}/>
							</svg>
						</div>
						<div class="oa-stream__osa-body">
							<div class="oa-mode-badge oa-stream__badge" style="--b-accent: {modeData.accent};">
								<span class="oa-mode-badge__dot" style="background: {modeData.accent};"></span>
								<span class="oa-mode-badge__label" style="color: {modeData.accent};">{modeData.label}</span>
								{#if msg.confidence}
									<span class="oa-mode-badge__conf" style="color: {modeData.accent};">{msg.confidence}%</span>
								{/if}
							</div>
							<div class="oa-stream__bubble oa-stream__bubble--osa">
								{#if msg.streaming}
									<span class="oa-stream__text">{msg.content}</span>
									<span class="oa-stream__cursor" aria-hidden="true"></span>
								{:else}
									{@html msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     5. SKILL DECISION CARD
	═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Skill Decision Card</h3>
		<p class="ds-card__sub">When OSA is in EXECUTE mode, it proposes a skill before running. States: proposed → running → completed / failed. Click Execute to see the transition.</p>

		<div class="oa-skill-stage">
			<div class="oa-skill" class:oa-skill--running={skillStatus === 'running'} class:oa-skill--completed={skillStatus === 'completed'} class:oa-skill--failed={skillStatus === 'failed'}>
				<!-- Status chip -->
				<div class="oa-skill__status-row">
					{#if skillStatus === 'proposed'}
						<span class="oa-skill__chip oa-skill__chip--proposed">Proposed</span>
					{:else if skillStatus === 'running'}
						<span class="oa-skill__chip oa-skill__chip--running">
							<span class="oa-skill__spinner" aria-hidden="true"></span>
							Running
						</span>
					{:else if skillStatus === 'completed'}
						<span class="oa-skill__chip oa-skill__chip--completed">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
							Completed
						</span>
					{:else}
						<span class="oa-skill__chip oa-skill__chip--failed">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
							Failed
						</span>
					{/if}
					<span class="oa-skill__mode-ref">
						<span class="oa-mode-dot oa-mode-dot--sm" style="background: #f59e0b;"></span>
						EXECUTE
					</span>
				</div>

				<!-- Skill info -->
				<div class="oa-skill__body">
					<svg class="oa-skill__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M13 10V3L4 14h7v7l9-11h-7z"/>
					</svg>
					<div class="oa-skill__info">
						<div class="oa-skill__name">deploy_module</div>
						<div class="oa-skill__desc">Deploy the RevenueAnalytics module to the staging environment and run smoke tests.</div>
					</div>
				</div>

				<!-- Parameters -->
				<div class="oa-skill__params">
					<div class="oa-skill__param">
						<span class="oa-skill__param-key">target</span>
						<span class="oa-skill__param-val">"staging"</span>
					</div>
					<div class="oa-skill__param">
						<span class="oa-skill__param-key">module</span>
						<span class="oa-skill__param-val">"RevenueAnalytics"</span>
					</div>
					<div class="oa-skill__param">
						<span class="oa-skill__param-key">smoke_tests</span>
						<span class="oa-skill__param-val">true</span>
					</div>
				</div>

				<!-- Actions -->
				{#if skillStatus === 'proposed'}
					<div class="oa-skill__actions">
						<button class="oa-skill__btn oa-skill__btn--execute" onclick={runSkill} aria-label="Execute skill">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
								<path d="M13 10V3L4 14h7v7l9-11h-7z"/>
							</svg>
							Execute
						</button>
						<button class="oa-skill__btn oa-skill__btn--skip" aria-label="Skip skill">Skip</button>
					</div>
				{:else if skillStatus === 'completed' || skillStatus === 'failed'}
					<div class="oa-skill__actions">
						<button class="oa-skill__btn oa-skill__btn--reset" onclick={resetSkill} aria-label="Reset demo">Reset demo</button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     6. SYSTEM HIERARCHY REFERENCE
	═══════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">System Hierarchy Reference</h3>
		<p class="ds-card__sub">MIOSA architecture as a visual tree. From the OS shell down to individual components — with module categories, visibility levels, and action types.</p>

		<div class="oa-hier">
			<!-- Tree -->
			<div class="oa-tree-card">
				<div class="oa-tree-node oa-tree-node--os">
					<div class="oa-tree-node__pill oa-tree-node__pill--os">OS</div>
					<span class="oa-tree-node__label">BusinessOS · ContentOS · DevOS · CustomOS</span>
				</div>

				<div class="oa-tree-branch">
					<div class="oa-tree-connector" aria-hidden="true"></div>
					<div class="oa-tree-node oa-tree-node--app">
						<div class="oa-tree-node__pill oa-tree-node__pill--app">Apps</div>
						<span class="oa-tree-node__label">Full platforms — CRM Suite, Content Studio, Dev Hub…</span>
					</div>
				</div>

				<div class="oa-tree-branch oa-tree-branch--l2">
					<div class="oa-tree-connector" aria-hidden="true"></div>
					<div class="oa-tree-node oa-tree-node--module">
						<div class="oa-tree-node__pill oa-tree-node__pill--module">Modules</div>
						<span class="oa-tree-node__label">Installable features — productivity, analytics…</span>
					</div>
				</div>

				<div class="oa-tree-branch oa-tree-branch--l3">
					<div class="oa-tree-connector" aria-hidden="true"></div>
					<div class="oa-tree-node oa-tree-node--section">
						<div class="oa-tree-node__pill oa-tree-node__pill--section">Sections</div>
						<span class="oa-tree-node__label">UI views — Pipeline, Contacts, Reports…</span>
					</div>
				</div>

				<div class="oa-tree-branch oa-tree-branch--l4">
					<div class="oa-tree-connector" aria-hidden="true"></div>
					<div class="oa-tree-node oa-tree-node--component">
						<div class="oa-tree-node__pill oa-tree-node__pill--component">Components</div>
						<span class="oa-tree-node__label">Reusable UI — buttons, cards, tables…</span>
					</div>
				</div>
			</div>

			<!-- Module metadata -->
			<div class="oa-hier-meta">
				<div class="oa-hier-group">
					<div class="oa-hier-group__title">Categories</div>
					<div class="oa-hier-chips">
						{#each moduleCategories as cat}
							<span class="oa-hier-chip oa-hier-chip--cat">{cat}</span>
						{/each}
					</div>
				</div>

				<div class="oa-hier-group">
					<div class="oa-hier-group__title">Visibility</div>
					<div class="oa-hier-chips">
						{#each visibilityLevels as vis}
							<span class="oa-hier-chip oa-hier-chip--vis">{vis}</span>
						{/each}
					</div>
				</div>

				<div class="oa-hier-group">
					<div class="oa-hier-group__title">Actions</div>
					<div class="oa-hier-chips">
						{#each actionTypes as act}
							<span class="oa-hier-chip oa-hier-chip--act">{act}</span>
						{/each}
					</div>
				</div>

				<div class="oa-hier-flow">
					<span class="oa-hier-flow__step">Install</span>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
					<span class="oa-hier-flow__step">Configure</span>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
					<span class="oa-hier-flow__step">Share</span>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
					<span class="oa-hier-flow__step">Version</span>
				</div>
			</div>
		</div>
	</div>

</section>

<style>
	/* ═══════════════════════════════════════════════════════════════════════
	   SHARED TOKENS
	═══════════════════════════════════════════════════════════════════════ */

	/* Glass surface mixin values — referenced by oa-* components */
	/* Light: rgba(255,255,255,0.72) bg, rgba(255,255,255,0.6) border */
	/* Dark:  rgba(28,28,30,0.82) bg, rgba(255,255,255,0.08) border */

	/* ── Shared mode dot ───────────────────────────────────────────────── */
	.oa-mode-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
		display: inline-block;
	}

	.oa-mode-dot--sm {
		width: 6px;
		height: 6px;
	}

	/* ═══════════════════════════════════════════════════════════════════════
	   1. OSA PILL
	═══════════════════════════════════════════════════════════════════════ */
	.oa-pill-stage {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		background: linear-gradient(135deg, #1c1c2e 0%, #16213e 50%, #0f3460 100%);
		border-radius: 16px;
		padding: 40px 24px;
		min-height: 160px;
		justify-content: center;
	}

	/* Collapsed pill */
	.oa-pill--collapsed {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 20px;
		background: rgba(255, 255, 255, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 999px;
		backdrop-filter: blur(28px) saturate(1.5);
		-webkit-backdrop-filter: blur(28px) saturate(1.5);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.18),
			0 2px 8px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
		cursor: pointer;
		transition:
			transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
	}

	.oa-pill--collapsed:hover {
		transform: translateY(-1px);
		box-shadow:
			0 12px 48px rgba(0, 0, 0, 0.22),
			0 4px 12px rgba(0, 0, 0, 0.14),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	.oa-pill--collapsed:active {
		transform: scale(0.98);
	}

	.oa-pill__placeholder {
		font-size: 14px;
		font-weight: 500;
		color: rgba(28, 28, 30, 0.5);
		letter-spacing: 0.01em;
	}

	.oa-pill__chevron {
		color: rgba(28, 28, 30, 0.35);
	}

	/* Expanded pill */
	.oa-pill--expanded {
		width: 100%;
		max-width: 480px;
		background: rgba(255, 255, 255, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 20px;
		backdrop-filter: blur(28px) saturate(1.5);
		-webkit-backdrop-filter: blur(28px) saturate(1.5);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.18),
			0 2px 8px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
		overflow: hidden;
		animation: oa-expand-in 0.22s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes oa-expand-in {
		from { opacity: 0; transform: scale(0.97) translateY(4px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.oa-pill__stream {
		padding: 16px 16px 12px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.oa-pill__stream-indicator {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 8px;
	}

	.oa-pill__stream-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.oa-pill__stream-text {
		font-size: 11px;
		color: rgba(28, 28, 30, 0.45);
	}

	.oa-pill__stream-preview {
		font-size: 13px;
		color: rgba(28, 28, 30, 0.7);
		line-height: 1.5;
		margin: 0;
	}

	.oa-pill__input-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
	}

	.oa-pill__mode-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 5px 10px;
		background: color-mix(in srgb, var(--m-accent, #3b82f6) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--m-accent, #3b82f6) 25%, transparent);
		border-radius: 999px;
		cursor: pointer;
		transition: background 0.15s ease;
		flex-shrink: 0;
	}

	.oa-pill__mode-btn:hover {
		background: color-mix(in srgb, var(--m-accent, #3b82f6) 16%, transparent);
	}

	.oa-pill__mode-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.oa-pill__input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 14px;
		color: #1c1c1e;
	}

	.oa-pill__input::placeholder {
		color: rgba(28, 28, 30, 0.4);
	}

	.oa-pill__send {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
		transition: transform 0.15s ease, opacity 0.15s ease;
	}

	.oa-pill__send:hover {
		opacity: 0.85;
		transform: scale(1.05);
	}

	.oa-pill__collapse {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		width: 100%;
		padding: 7px;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		background: transparent;
		cursor: pointer;
		font-size: 11px;
		color: rgba(28, 28, 30, 0.35);
		transition: color 0.15s ease;
	}

	.oa-pill__collapse:hover {
		color: rgba(28, 28, 30, 0.6);
	}

	/* ═══════════════════════════════════════════════════════════════════════
	   2. MODE SELECTOR DROPDOWN
	═══════════════════════════════════════════════════════════════════════ */
	.oa-dropdown-stage {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
	}

	.oa-dropdown-wrap {
		min-width: 200px;
	}

	.oa-mode-trigger {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 8px 14px;
		background: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 999px;
		cursor: pointer;
		transition:
			background 0.15s ease,
			box-shadow 0.15s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	.oa-mode-trigger:hover {
		background: rgba(255, 255, 255, 0.85);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	.oa-mode-trigger__icon {
		flex-shrink: 0;
	}

	.oa-mode-trigger__label {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.oa-mode-trigger__chevron {
		color: var(--dt3);
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		margin-left: 2px;
	}

	.oa-mode-trigger__chevron--open {
		transform: rotate(180deg);
	}

	/* Dropdown */
	.oa-mode-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		min-width: 280px;
		background: rgba(255, 255, 255, 0.88);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 16px;
		backdrop-filter: blur(32px) saturate(1.6);
		-webkit-backdrop-filter: blur(32px) saturate(1.6);
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.16),
			0 4px 16px rgba(0, 0, 0, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.9);
		padding: 6px;
		z-index: 50;
		animation: oa-dropdown-in 0.18s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes oa-dropdown-in {
		from { opacity: 0; transform: translateY(-6px) scale(0.97); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	.oa-mode-option {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 9px 12px;
		border: none;
		border-radius: 10px;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s ease;
	}

	.oa-mode-option:hover {
		background: rgba(0, 0, 0, 0.04);
	}

	.oa-mode-option--active {
		background: rgba(0, 0, 0, 0.04);
	}

	.oa-mode-option__icon {
		flex-shrink: 0;
	}

	.oa-mode-option__body {
		flex: 1;
		min-width: 0;
	}

	.oa-mode-option__label {
		display: block;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		line-height: 1.3;
	}

	.oa-mode-option__desc {
		display: block;
		font-size: 12px;
		color: #8e8e93;
		line-height: 1.3;
	}

	.oa-mode-option__check {
		flex-shrink: 0;
		margin-left: auto;
	}

	.oa-dropdown-hint {
		font-size: 13px;
		color: var(--dt3);
		margin: 0;
	}

	/* Dark mode overrides — dropdown */
	:global(.dark) .oa-mode-dropdown {
		background: rgba(28, 28, 30, 0.92);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.5),
			0 4px 16px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	:global(.dark) .oa-mode-option:hover {
		background: rgba(255, 255, 255, 0.07);
	}

	:global(.dark) .oa-mode-option--active {
		background: rgba(255, 255, 255, 0.07);
	}

	:global(.dark) .oa-mode-trigger {
		background: rgba(44, 44, 46, 0.9);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	:global(.dark) .oa-mode-trigger:hover {
		background: rgba(58, 58, 60, 0.95);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	/* ═══════════════════════════════════════════════════════════════════════
	   3. MODE INDICATOR BADGE
	═══════════════════════════════════════════════════════════════════════ */
	.oa-badges-row {
		margin-top: 16px;
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.oa-badges-row--mt {
		margin-top: 10px;
	}

	.oa-mode-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 9px 3px 6px;
		background: color-mix(in srgb, var(--b-accent, #3b82f6) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--b-accent, #3b82f6) 22%, transparent);
		border-radius: 999px;
	}

	.oa-mode-badge__label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.oa-mode-badge--conf .oa-mode-badge__conf {
		font-size: 10px;
		font-weight: 600;
		opacity: 0.7;
		margin-left: 2px;
	}

	/* ═══════════════════════════════════════════════════════════════════════
	   4. RESPONSE STREAM
	═══════════════════════════════════════════════════════════════════════ */
	.oa-stream {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.oa-stream__row {
		display: flex;
		gap: 10px;
	}

	.oa-stream__row--user {
		justify-content: flex-end;
	}

	.oa-stream__row--osa {
		justify-content: flex-start;
	}

	.oa-stream__avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1px solid transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 20px;
	}

	.oa-stream__osa-body {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: calc(100% - 44px);
	}

	.oa-stream__badge {
		align-self: flex-start;
	}

	.oa-stream__bubble {
		padding: 12px 14px;
		border-radius: 16px;
		font-size: 13.5px;
		line-height: 1.6;
	}

	.oa-stream__bubble--user {
		background: #007aff;
		color: #fff;
		border-radius: 16px 16px 4px 16px;
		max-width: 320px;
	}

	.oa-stream__bubble--osa {
		background: rgba(255, 255, 255, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(20px) saturate(1.4);
		-webkit-backdrop-filter: blur(20px) saturate(1.4);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.8);
		color: #1c1c1e;
		border-radius: 4px 16px 16px 16px;
	}

	.oa-stream__text {
		color: #1c1c1e;
	}

	/* streaming cursor */
	.oa-stream__cursor {
		display: inline-block;
		width: 7px;
		height: 14px;
		background: #1c1c1e;
		vertical-align: text-bottom;
		margin-left: 2px;
		border-radius: 1px;
		animation: oa-cursor-blink 1s step-end infinite;
	}

	@keyframes oa-cursor-blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}

	/* Dark mode — stream bubbles */
	:global(.dark) .oa-stream__bubble--osa {
		background: rgba(28, 28, 30, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
		color: #f5f5f7;
	}

	:global(.dark) .oa-stream__text {
		color: #f5f5f7;
	}

	:global(.dark) .oa-stream__cursor {
		background: #f5f5f7;
	}

	/* ═══════════════════════════════════════════════════════════════════════
	   5. SKILL DECISION CARD
	═══════════════════════════════════════════════════════════════════════ */
	.oa-skill-stage {
		margin-top: 20px;
	}

	.oa-skill {
		background: rgba(255, 255, 255, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.55);
		border-radius: 20px;
		backdrop-filter: blur(28px) saturate(1.5);
		-webkit-backdrop-filter: blur(28px) saturate(1.5);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.08),
			0 2px 8px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 480px;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.oa-skill--running {
		border-color: rgba(245, 158, 11, 0.35);
		box-shadow:
			0 8px 40px rgba(245, 158, 11, 0.12),
			0 2px 8px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
	}

	.oa-skill--completed {
		border-color: rgba(34, 197, 94, 0.35);
		box-shadow:
			0 8px 40px rgba(34, 197, 94, 0.1),
			0 2px 8px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
	}

	.oa-skill--failed {
		border-color: rgba(239, 68, 68, 0.35);
	}

	.oa-skill__status-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.oa-skill__mode-ref {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 10px;
		font-weight: 600;
		color: #f59e0b;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-left: auto;
	}

	/* Status chips */
	.oa-skill__chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 10px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.oa-skill__chip--proposed {
		background: rgba(107, 114, 128, 0.12);
		color: #6b7280;
		border: 1px solid rgba(107, 114, 128, 0.2);
	}

	.oa-skill__chip--running {
		background: rgba(245, 158, 11, 0.12);
		color: #f59e0b;
		border: 1px solid rgba(245, 158, 11, 0.25);
	}

	.oa-skill__chip--completed {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.25);
	}

	.oa-skill__chip--failed {
		background: rgba(239, 68, 68, 0.12);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.25);
	}

	.oa-skill__spinner {
		width: 10px;
		height: 10px;
		border: 1.5px solid rgba(245, 158, 11, 0.3);
		border-top-color: #f59e0b;
		border-radius: 50%;
		animation: oa-spin 0.7s linear infinite;
		display: inline-block;
	}

	@keyframes oa-spin {
		to { transform: rotate(360deg); }
	}

	/* Skill body */
	.oa-skill__body {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.oa-skill__icon {
		flex-shrink: 0;
		margin-top: 1px;
	}

	.oa-skill__info {
		flex: 1;
	}

	.oa-skill__name {
		font-size: 14px;
		font-weight: 700;
		color: #1c1c1e;
		font-family: 'SF Mono', 'Fira Code', monospace;
		margin-bottom: 4px;
	}

	.oa-skill__desc {
		font-size: 13px;
		color: #636366;
		line-height: 1.5;
	}

	/* Parameters */
	.oa-skill__params {
		background: rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 10px;
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.oa-skill__param {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	.oa-skill__param-key {
		color: #8e8e93;
		min-width: 80px;
	}

	.oa-skill__param-val {
		color: #1c1c1e;
		font-weight: 500;
	}

	/* Actions */
	.oa-skill__actions {
		display: flex;
		gap: 8px;
	}

	.oa-skill__btn {
		padding: 8px 18px;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.15s ease, transform 0.15s ease;
		border: none;
	}

	.oa-skill__btn:hover {
		opacity: 0.88;
	}

	.oa-skill__btn:active {
		transform: scale(0.97);
	}

	.oa-skill__btn--execute {
		background: #f59e0b;
		color: #fff;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.oa-skill__btn--skip {
		background: transparent;
		color: #8e8e93;
		border: 1px solid rgba(0, 0, 0, 0.1) !important;
	}

	.oa-skill__btn--reset {
		background: transparent;
		color: #636366;
		border: 1px solid rgba(0, 0, 0, 0.1) !important;
	}

	/* Dark mode — skill */
	:global(.dark) .oa-skill {
		background: rgba(28, 28, 30, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.35),
			0 2px 8px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	:global(.dark) .oa-skill__name {
		color: #f5f5f7;
	}

	:global(.dark) .oa-skill__desc {
		color: #8e8e93;
	}

	:global(.dark) .oa-skill__params {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.08);
	}

	:global(.dark) .oa-skill__param-val {
		color: #f5f5f7;
	}

	:global(.dark) .oa-skill__btn--skip,
	:global(.dark) .oa-skill__btn--reset {
		border-color: rgba(255, 255, 255, 0.12) !important;
		color: #8e8e93;
	}

	/* ═══════════════════════════════════════════════════════════════════════
	   6. SYSTEM HIERARCHY
	═══════════════════════════════════════════════════════════════════════ */
	.oa-hier {
		margin-top: 20px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	@media (max-width: 700px) {
		.oa-hier {
			grid-template-columns: 1fr;
		}
	}

	/* Tree card */
	.oa-tree-card {
		background: rgba(255, 255, 255, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 20px;
		backdrop-filter: blur(24px) saturate(1.4);
		-webkit-backdrop-filter: blur(24px) saturate(1.4);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.07),
			0 2px 8px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.oa-tree-node {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.oa-tree-node__pill {
		padding: 3px 10px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 700;
		flex-shrink: 0;
		letter-spacing: 0.02em;
	}

	.oa-tree-node__pill--os {
		background: rgba(0, 122, 255, 0.12);
		color: #007aff;
		border: 1px solid rgba(0, 122, 255, 0.22);
	}

	.oa-tree-node__pill--app {
		background: rgba(168, 85, 247, 0.12);
		color: #a855f7;
		border: 1px solid rgba(168, 85, 247, 0.22);
	}

	.oa-tree-node__pill--module {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.22);
	}

	.oa-tree-node__pill--section {
		background: rgba(245, 158, 11, 0.12);
		color: #f59e0b;
		border: 1px solid rgba(245, 158, 11, 0.22);
	}

	.oa-tree-node__pill--component {
		background: rgba(107, 114, 128, 0.12);
		color: #6b7280;
		border: 1px solid rgba(107, 114, 128, 0.22);
	}

	.oa-tree-node__label {
		font-size: 12px;
		color: #636366;
		line-height: 1.4;
	}

	.oa-tree-branch {
		display: flex;
		align-items: flex-start;
		margin-top: 0;
	}

	.oa-tree-connector {
		width: 20px;
		min-width: 20px;
		height: 32px;
		border-left: 1.5px solid rgba(0, 0, 0, 0.12);
		border-bottom: 1.5px solid rgba(0, 0, 0, 0.12);
		border-radius: 0 0 0 6px;
		margin-top: 0;
		margin-right: 6px;
		flex-shrink: 0;
		align-self: stretch;
	}

	.oa-tree-branch--l2 .oa-tree-connector { margin-left: 14px; }
	.oa-tree-branch--l3 .oa-tree-connector { margin-left: 28px; }
	.oa-tree-branch--l4 .oa-tree-connector { margin-left: 42px; }

	.oa-tree-branch {
		padding: 4px 0;
	}

	/* Dark mode — tree */
	:global(.dark) .oa-tree-card {
		background: rgba(28, 28, 30, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.35),
			0 2px 8px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	:global(.dark) .oa-tree-connector {
		border-color: rgba(255, 255, 255, 0.14);
	}

	:global(.dark) .oa-tree-node__label {
		color: #8e8e93;
	}

	/* Meta panel */
	.oa-hier-meta {
		background: rgba(255, 255, 255, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 20px;
		backdrop-filter: blur(24px) saturate(1.4);
		-webkit-backdrop-filter: blur(24px) saturate(1.4);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.07),
			0 2px 8px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	:global(.dark) .oa-hier-meta {
		background: rgba(28, 28, 30, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.35),
			0 2px 8px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.oa-hier-group__title {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #8e8e93;
		margin-bottom: 8px;
	}

	.oa-hier-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.oa-hier-chip {
		padding: 3px 9px;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 500;
	}

	.oa-hier-chip--cat {
		background: rgba(0, 122, 255, 0.09);
		color: #007aff;
		border: 1px solid rgba(0, 122, 255, 0.18);
	}

	.oa-hier-chip--vis {
		background: rgba(168, 85, 247, 0.09);
		color: #a855f7;
		border: 1px solid rgba(168, 85, 247, 0.18);
	}

	.oa-hier-chip--act {
		background: rgba(245, 158, 11, 0.09);
		color: #f59e0b;
		border: 1px solid rgba(245, 158, 11, 0.18);
	}

	.oa-hier-flow {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
		padding-top: 4px;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
	}

	:global(.dark) .oa-hier-flow {
		border-top-color: rgba(255, 255, 255, 0.08);
	}

	.oa-hier-flow svg {
		color: #c7c7cc;
		flex-shrink: 0;
	}

	.oa-hier-flow__step {
		font-size: 12px;
		font-weight: 600;
		color: #636366;
		padding: 3px 10px;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 999px;
	}

	:global(.dark) .oa-hier-flow__step {
		color: #8e8e93;
		background: rgba(255, 255, 255, 0.08);
	}

	/* Pill stage dark */
	:global(.dark) .oa-pill--collapsed {
		background: rgba(44, 44, 46, 0.9);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.5),
			0 2px 8px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	:global(.dark) .oa-pill--collapsed .oa-pill__placeholder {
		color: rgba(245, 245, 247, 0.45);
	}

	:global(.dark) .oa-pill--collapsed .oa-pill__chevron {
		color: rgba(245, 245, 247, 0.3);
	}

	:global(.dark) .oa-pill--expanded {
		background: rgba(28, 28, 30, 0.88);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.5),
			0 2px 8px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	:global(.dark) .oa-pill__stream {
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	:global(.dark) .oa-pill__stream-text {
		color: rgba(245, 245, 247, 0.4);
	}

	:global(.dark) .oa-pill__stream-preview {
		color: rgba(245, 245, 247, 0.65);
	}

	:global(.dark) .oa-pill__input {
		color: #f5f5f7;
	}

	:global(.dark) .oa-pill__input::placeholder {
		color: rgba(245, 245, 247, 0.35);
	}

	:global(.dark) .oa-pill__collapse {
		border-top-color: rgba(255, 255, 255, 0.07);
		color: rgba(245, 245, 247, 0.3);
	}

	:global(.dark) .oa-pill__collapse:hover {
		color: rgba(245, 245, 247, 0.55);
	}
</style>
