<script lang="ts">
	// ── Demo 1: Conversational Onboarding ────────────────────────────
	type ChatMsg = {
		id: string;
		role: 'ai' | 'user';
		text: string;
	};

	const chatScript: ChatMsg[] = [
		{ id: 'a1', role: 'ai',   text: "Hi there! I'm OSA, your setup guide. What's your name?" },
		{ id: 'u1', role: 'user', text: 'Maya Kim' },
		{ id: 'a2', role: 'ai',   text: "Nice to meet you, Maya! What best describes your role?" },
		{ id: 'u2', role: 'user', text: 'Product Designer' },
		{ id: 'a3', role: 'ai',   text: "Perfect. What kind of work will you do in MIOSA?" },
	];

	let visibleMsgs = $state(chatScript.slice(0, 3));
	let showTyping = $state(false);
	let chatStep = $state(3);

	const rolePills = ['Designer', 'Engineer', 'PM', 'Marketing', 'Operations', 'Other'];
	let selectedPill = $state('Designer');

	function continueChat() {
		if (chatStep >= chatScript.length) return;
		showTyping = true;
		setTimeout(() => {
			showTyping = false;
			visibleMsgs = [...visibleMsgs, chatScript[chatStep]];
			chatStep++;
		}, 1200);
	}

	function resetChat() {
		visibleMsgs = chatScript.slice(0, 3);
		chatStep = 3;
		showTyping = false;
	}

	// ── Demo 2: Selection Cards ──────────────────────────────────────
	type PathCard = { id: string; icon: string; title: string; desc: string };
	const pathCards: PathCard[] = [
		{ id: 'tasks',    icon: '&#10003;', title: 'Task Management',  desc: 'Track to-dos, sprints, and project progress' },
		{ id: 'docs',     icon: '&#9636;',  title: 'Documentation',    desc: 'Write and organize team knowledge' },
		{ id: 'projects', icon: '&#9672;',  title: 'Projects',         desc: 'Plan, execute, and ship work together' },
	];

	let singleSelected = $state('tasks');
	let multiSelected = $state<Set<string>>(new Set(['tasks', 'projects']));

	function toggleMulti(id: string) {
		const next = new Set(multiSelected);
		if (next.has(id)) next.delete(id); else next.add(id);
		multiSelected = next;
	}

	// ── Demo 3: Progress Steps ───────────────────────────────────────
	const wizardSteps = ['Account', 'Profile', 'Workspace', 'Integrations', 'Complete'];
	let activeStep = $state(2);

	// ── Demo 4: Typewriter Text ──────────────────────────────────────
	const typeLines = [
		'Welcome to MIOSA.',
		'Your AI-powered workspace.',
		"Let's get you set up in 2 minutes.",
	];
	let typeLineIdx = $state(0);
	let typeCharIdx = $state(0);
	let typeVisible = $state('');
	let typeDone = $state(false);
	let typeCursor = $state(true);

	$effect(() => {
		if (typeDone) return;
		const line = typeLines[typeLineIdx];
		if (typeCharIdx < line.length) {
			const t = setTimeout(() => {
				typeCharIdx++;
				typeVisible = line.slice(0, typeCharIdx);
			}, 42);
			return () => clearTimeout(t);
		} else {
			const t = setTimeout(() => {
				if (typeLineIdx < typeLines.length - 1) {
					typeLineIdx++;
					typeCharIdx = 0;
					typeVisible = '';
				} else {
					typeDone = true;
				}
			}, 900);
			return () => clearTimeout(t);
		}
	});

	$effect(() => {
		const t = setInterval(() => { typeCursor = !typeCursor; }, 530);
		return () => clearInterval(t);
	});

	function resetTypewriter() {
		typeLineIdx = 0;
		typeCharIdx = 0;
		typeVisible = '';
		typeDone = false;
	}

	// ── Demo 6: Feature Tour ─────────────────────────────────────────
	let tourStep = $state(0);
	const tourTotal = 5;

	// ── Demo 7: Setup Checklist ──────────────────────────────────────
	const checklistItems = [
		{ id: 'profile',   label: 'Complete your profile',  btn: 'Set up' },
		{ id: 'workspace', label: 'Create a workspace',     btn: 'Set up' },
		{ id: 'team',      label: 'Invite team members',    btn: 'Invite' },
		{ id: 'connect',   label: 'Connect integrations',   btn: 'Connect' },
		{ id: 'explore',   label: 'Explore templates',      btn: 'Browse' },
	];
	let checkedItems = $state<Set<string>>(new Set(['profile', 'workspace']));
	let checklistDismissed = $state(false);

	function toggleChecklist(id: string) {
		const next = new Set(checkedItems);
		if (next.has(id)) next.delete(id); else next.add(id);
		checkedItems = next;
	}

	let checkPct = $derived(Math.round((checkedItems.size / checklistItems.length) * 100));
	let allChecked = $derived(checkedItems.size === checklistItems.length);
</script>

<section class="ds-section">
	<h2 class="ds-title">Onboarding Wizard</h2>
	<p class="ds-desc">Onboarding and wizard patterns — conversational AI flow, selection cards, step progress, typewriter animation, welcome screen, feature tour spotlight, and setup checklist.</p>

	<!-- 1. CONVERSATIONAL ONBOARDING -->
	<div class="ds-card">
		<h3 class="ds-card__title">Conversational Onboarding</h3>
		<p class="ds-card__sub">Chat-style setup flow with AI message bubbles, user response pills, typing indicator, and animated orb avatar.</p>

		<div class="ow-chat-shell">
			{#each visibleMsgs as msg (msg.id)}
				<div class="ow-chat-row" class:ow-chat-row--user={msg.role === 'user'}>
					{#if msg.role === 'ai'}
						<div class="ow-chat-avatar">
							<div class="ow-chat-orb"></div>
						</div>
					{/if}
					<div class="ow-chat-bubble" class:ow-chat-bubble--user={msg.role === 'user'}>
						{msg.text}
					</div>
				</div>
			{/each}

			{#if showTyping}
				<div class="ow-chat-row">
					<div class="ow-chat-avatar">
						<div class="ow-chat-orb"></div>
					</div>
					<div class="ow-chat-bubble">
						<div class="ow-typing">
							<span class="ow-typing-dot" style="--d: 0s"></span>
							<span class="ow-typing-dot" style="--d: 0.16s"></span>
							<span class="ow-typing-dot" style="--d: 0.32s"></span>
						</div>
					</div>
				</div>
			{/if}

			{#if chatStep >= chatScript.length && !showTyping}
				<div class="ow-pills-row">
					{#each rolePills as pill}
						<button
							class="ow-pill"
							class:ow-pill--active={selectedPill === pill}
							onclick={() => selectedPill = pill}
						>{pill}</button>
					{/each}
				</div>
			{/if}

			<div class="ow-chat-actions">
				{#if chatStep < chatScript.length && !showTyping}
					<button class="btn-pill btn-pill-primary" onclick={continueChat}>Continue</button>
				{:else if chatStep >= chatScript.length && !showTyping}
					<button class="btn-pill btn-pill-ghost" onclick={resetChat}>Reset</button>
					<button class="btn-pill btn-pill-primary">Next step</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- 2. SELECTION CARDS -->
	<div class="ds-card">
		<h3 class="ds-card__title">Selection Cards</h3>
		<p class="ds-card__sub">Choose-your-path cards. Single select (radio) and multi-select (checkbox) variants with active border glow.</p>

		<div class="ow-sel-group">
			<div class="ow-sel-label">Choose your primary workflow <span class="ow-sel-hint">(single select)</span></div>
			<div class="ow-sel-grid">
				{#each pathCards as card}
					<button
						class="ow-sel-card"
						class:ow-sel-card--active={singleSelected === card.id}
						onclick={() => singleSelected = card.id}
					>
						<div class="ow-sel-radio" class:ow-sel-radio--on={singleSelected === card.id}></div>
						<div class="ow-sel-icon">{@html card.icon}</div>
						<div class="ow-sel-title">{card.title}</div>
						<div class="ow-sel-desc">{card.desc}</div>
					</button>
				{/each}
			</div>
		</div>

		<div class="ow-sel-group" style="margin-top: 24px;">
			<div class="ow-sel-label">Add more modules <span class="ow-sel-hint">(multi-select)</span></div>
			<div class="ow-sel-grid">
				{#each pathCards as card}
					<button
						class="ow-sel-card"
						class:ow-sel-card--active={multiSelected.has(card.id)}
						onclick={() => toggleMulti(card.id)}
					>
						<div class="ow-sel-check" class:ow-sel-check--on={multiSelected.has(card.id)}>
							{#if multiSelected.has(card.id)}
								<svg width="10" height="10" fill="none" stroke="#fff" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
								</svg>
							{/if}
						</div>
						<div class="ow-sel-icon">{@html card.icon}</div>
						<div class="ow-sel-title">{card.title}</div>
						<div class="ow-sel-desc">{card.desc}</div>
					</button>
				{/each}
			</div>
			<div class="ow-sel-footer">
				<span class="ow-sel-count">{multiSelected.size} selected</span>
				<button class="btn-pill btn-pill-primary" disabled={multiSelected.size === 0}>Continue</button>
			</div>
		</div>
	</div>

	<!-- 3. PROGRESS STEPS -->
	<div class="ds-card">
		<h3 class="ds-card__title">Progress Steps</h3>
		<p class="ds-card__sub">Horizontal wizard stepper with completed (green check), active (accent), and upcoming (gray) states. Click circles or use buttons.</p>

		<div class="ow-steps-wrap">
			<div class="ow-steps-row">
				{#each wizardSteps as step, i}
					{#if i > 0}
						<div class="ow-steps-line" class:ow-steps-line--done={i <= activeStep}></div>
					{/if}
					<button
						class="ow-step-item"
						onclick={() => activeStep = i}
						aria-label="Go to step {i + 1}: {step}"
						aria-current={activeStep === i ? 'step' : undefined}
					>
						<div
							class="ow-step-circle"
							class:ow-step-circle--done={i < activeStep}
							class:ow-step-circle--active={i === activeStep}
						>
							{#if i < activeStep}
								<svg width="14" height="14" fill="none" stroke="#fff" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
								</svg>
							{:else}
								{i + 1}
							{/if}
						</div>
						<div
							class="ow-step-label"
							class:ow-step-label--active={i === activeStep}
							class:ow-step-label--done={i < activeStep}
						>{step}</div>
					</button>
				{/each}
			</div>

			<div class="ow-steps-content">
				{#if activeStep === 0}
					<div class="ow-steps-title">Create your account</div>
					<div class="ow-steps-sub">Set up your email, password, and workspace name.</div>
				{:else if activeStep === 1}
					<div class="ow-steps-title">Complete your profile</div>
					<div class="ow-steps-sub">Add your name, role, and a profile photo.</div>
				{:else if activeStep === 2}
					<div class="ow-steps-title">Configure your workspace</div>
					<div class="ow-steps-sub">Set timezone, theme, and notification preferences.</div>
				{:else if activeStep === 3}
					<div class="ow-steps-title">Connect integrations</div>
					<div class="ow-steps-sub">Link GitHub, Slack, Notion, and more.</div>
				{:else}
					<div class="ow-steps-title" style="color: #22c55e;">You're all set!</div>
					<div class="ow-steps-sub">Welcome to MIOSA. Your workspace is ready.</div>
				{/if}
			</div>

			<div class="ow-steps-nav">
				<button
					class="btn-pill btn-pill-ghost"
					onclick={() => activeStep = Math.max(0, activeStep - 1)}
					disabled={activeStep === 0}
				>Previous</button>
				<button
					class="btn-pill btn-pill-primary"
					onclick={() => activeStep = Math.min(wizardSteps.length - 1, activeStep + 1)}
					disabled={activeStep === wizardSteps.length - 1}
				>{activeStep === wizardSteps.length - 1 ? 'Done' : 'Next'}</button>
			</div>
		</div>
	</div>

	<!-- 4. TYPEWRITER TEXT -->
	<div class="ds-card">
		<h3 class="ds-card__title">Typewriter Text</h3>
		<p class="ds-card__sub">CSS-powered text reveal with blinking cursor. Multiple lines appear with staggered delays.</p>

		<div class="ow-typewriter-dark">
			{#each typeLines.slice(0, typeLineIdx) as line, i}
				<div class="ow-type-line ow-type-line--done" style="font-size: {22 - i * 2}px;">{line}</div>
			{/each}

			{#if !typeDone || typeLineIdx < typeLines.length}
				<div class="ow-type-line ow-type-line--current" style="font-size: {22 - typeLineIdx * 2}px;">
					{typeVisible}<span class="ow-type-cursor" class:ow-type-cursor--on={typeCursor}></span>
				</div>
			{/if}

			{#if typeDone}
				<div class="ow-type-actions">
					<button class="btn-pill btn-pill-primary">Get started</button>
					<button class="btn-pill btn-pill-ghost" onclick={resetTypewriter}>Replay</button>
				</div>
			{/if}
		</div>

		<div class="ow-typewriter-css">
			<div class="ow-css-type-line ow-css-type-line--1">Welcome to MIOSA.</div>
			<div class="ow-css-type-line ow-css-type-line--2">Your AI-powered workspace.</div>
			<div class="ow-css-type-line ow-css-type-line--3">Let's build something great.<span class="ow-css-cursor"></span></div>
		</div>
		<p class="ds-card__sub" style="margin-top: 8px;">Pure CSS variant above (no JS) using overflow + width animation.</p>
	</div>

	<!-- 5. WELCOME SCREEN -->
	<div class="ds-card">
		<h3 class="ds-card__title">Welcome Screen</h3>
		<p class="ds-card__sub">First-time landing with animated purple orb, title, subtitle, and primary CTA.</p>

		<div class="ow-welcome">
			<div class="ow-welcome-orb-wrap">
				<div class="ow-welcome-orb"></div>
			</div>
			<h2 class="ow-welcome-title">Welcome to MIOSA</h2>
			<p class="ow-welcome-sub">Your intelligent workspace for teams. Manage projects, collaborate with AI, and ship faster.</p>
			<div class="ow-welcome-actions">
				<button class="btn-pill btn-pill-primary btn-pill-lg">Get Started</button>
				<button class="btn-pill btn-pill-ghost">Skip Setup</button>
			</div>
		</div>
	</div>

	<!-- 6. FEATURE TOUR -->
	<div class="ds-card">
		<h3 class="ds-card__title">Feature Tour</h3>
		<p class="ds-card__sub">Spotlight-based walkthrough with tooltip, step counter, and progress dots.</p>

		<div class="ow-tour-demo">
			<!-- Simulated UI behind the spotlight -->
			<div class="ow-tour-fake-ui">
				<div class="ow-tour-fake-sidebar">
					<div class="ow-tour-fake-logo"></div>
					<div class="ow-tour-fake-nav-item"></div>
					<div class="ow-tour-fake-nav-item ow-tour-fake-nav-item--active"></div>
					<div class="ow-tour-fake-nav-item"></div>
					<div class="ow-tour-fake-nav-item"></div>
				</div>
				<div class="ow-tour-fake-main">
					<div class="ow-tour-fake-header"></div>
					<div class="ow-tour-fake-content">
						<div class="ow-tour-fake-block"></div>
						<div class="ow-tour-fake-block ow-tour-fake-block--short"></div>
					</div>
				</div>
			</div>

			<!-- Dark overlay with cutout -->
			<div class="ow-tour-overlay">
				<div class="ow-tour-spotlight"></div>
			</div>

			<!-- Tooltip -->
			<div class="ow-tour-tooltip">
				<div class="ow-tour-tooltip-arrow"></div>
				<div class="ow-tour-step-badge">Step {tourStep + 1} of {tourTotal}</div>
				<div class="ow-tour-tooltip-title">
					{#if tourStep === 0}Navigation Sidebar
					{:else if tourStep === 1}Quick Search
					{:else if tourStep === 2}AI Assistant
					{:else if tourStep === 3}Project Board
					{:else}Settings Panel
					{/if}
				</div>
				<div class="ow-tour-tooltip-desc">
					{#if tourStep === 0}Access all your workspaces, projects, and tools from the sidebar.
					{:else if tourStep === 1}Press Cmd+K to search across everything instantly.
					{:else if tourStep === 2}Click the orb to ask AI for help with any task.
					{:else if tourStep === 3}Drag and drop cards to organize your workflow.
					{:else}Customize your workspace, integrations, and team settings.
					{/if}
				</div>
				<div class="ow-tour-tooltip-actions">
					{#if tourStep > 0}
						<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => tourStep--}>Previous</button>
					{/if}
					<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => tourStep = 0} style="margin-left: auto;">Skip</button>
					<button
						class="btn-pill btn-pill-primary btn-pill-sm"
						onclick={() => { if (tourStep < tourTotal - 1) tourStep++; else tourStep = 0; }}
					>{tourStep < tourTotal - 1 ? 'Next' : 'Finish'}</button>
				</div>
				<div class="ow-tour-dots">
					{#each Array(tourTotal) as _, i}
						<div class="ow-tour-dot" class:ow-tour-dot--active={i === tourStep} class:ow-tour-dot--done={i < tourStep}></div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- 7. SETUP CHECKLIST -->
	<div class="ds-card">
		<h3 class="ds-card__title">Setup Checklist</h3>
		<p class="ds-card__sub">Post-onboarding task list with progress bar, action buttons, and celebration state when all complete.</p>

		{#if !checklistDismissed}
			<div class="ow-checklist-shell">
				<div class="ow-checklist-header">
					<div class="ow-checklist-header-text">
						<div class="ow-checklist-header-title">
							{#if allChecked}
								All done!
							{:else}
								Get started with MIOSA
							{/if}
						</div>
						<div class="ow-checklist-header-sub">{checkedItems.size} of {checklistItems.length} tasks complete</div>
					</div>
					<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => checklistDismissed = true}>
						{allChecked ? 'Dismiss' : 'Remind later'}
					</button>
				</div>

				<!-- Progress bar -->
				<div class="ow-checklist-bar-track">
					<div class="ow-checklist-bar-fill" style="width: {checkPct}%;"></div>
				</div>
				<div class="ow-checklist-pct">{checkPct}% complete</div>

				{#if allChecked}
					<!-- Celebration state -->
					<div class="ow-checklist-celebrate">
						<div class="ow-confetti-wrap">
							<span class="ow-confetti ow-confetti--1"></span>
							<span class="ow-confetti ow-confetti--2"></span>
							<span class="ow-confetti ow-confetti--3"></span>
							<span class="ow-confetti ow-confetti--4"></span>
							<span class="ow-confetti ow-confetti--5"></span>
							<span class="ow-confetti ow-confetti--6"></span>
						</div>
						<div class="ow-celebrate-icon">&#10003;</div>
						<div class="ow-celebrate-title">Setup complete!</div>
						<div class="ow-celebrate-sub">You're ready to start using MIOSA.</div>
						<button class="btn-pill btn-pill-primary" style="margin-top: 12px;">Go to Dashboard</button>
					</div>
				{:else}
					<!-- Checklist items -->
					<div class="ow-checklist-items">
						{#each checklistItems as item}
							<div class="ow-checklist-item" class:ow-checklist-item--done={checkedItems.has(item.id)}>
								<button
									class="ow-checklist-checkbox"
									class:ow-checklist-checkbox--on={checkedItems.has(item.id)}
									onclick={() => toggleChecklist(item.id)}
									aria-label="Toggle {item.label}"
								>
									{#if checkedItems.has(item.id)}
										<svg width="10" height="10" fill="none" stroke="#fff" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
										</svg>
									{/if}
								</button>
								<span class="ow-checklist-label" class:ow-checklist-label--done={checkedItems.has(item.id)}>{item.label}</span>
								{#if !checkedItems.has(item.id)}
									<button class="btn-pill btn-pill-ghost btn-pill-sm" style="margin-left: auto;" onclick={() => toggleChecklist(item.id)}>{item.btn}</button>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<div style="text-align: center; padding: 32px;">
				<div style="font-size: 13px; color: var(--dt3);">Checklist dismissed.</div>
				<button class="btn-pill btn-pill-ghost btn-pill-sm" style="margin-top: 8px;" onclick={() => checklistDismissed = false}>Show again</button>
			</div>
		{/if}
	</div>
</section>

<style>
	/* ── 1. Conversational Onboarding ── */
	.ow-chat-shell {
		max-width: 500px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 20px;
		display: flex; flex-direction: column; gap: 12px;
		min-height: 320px;
	}
	.ow-chat-row {
		display: flex; align-items: flex-end; gap: 8px;
	}
	.ow-chat-row--user {
		flex-direction: row-reverse;
	}
	.ow-chat-avatar {
		width: 28px; height: 28px; flex-shrink: 0;
	}
	.ow-chat-orb {
		width: 28px; height: 28px; border-radius: 9999px;
		background: linear-gradient(135deg, #7c3aed, #4f46e5);
		box-shadow: 0 0 12px rgba(124, 58, 237, 0.3);
		animation: ow-orb-glow 2s ease-in-out infinite;
	}
	@keyframes ow-orb-glow {
		0%, 100% { box-shadow: 0 0 12px rgba(124, 58, 237, 0.3); }
		50%      { box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
	}
	.ow-chat-bubble {
		max-width: 78%;
		padding: 10px 14px;
		border-radius: 4px 14px 14px 14px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		color: var(--dt);
		font-size: 13px; line-height: 1.5;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
	}
	.ow-chat-bubble--user {
		border-radius: 14px 4px 14px 14px;
		background: linear-gradient(135deg, #7c3aed, #4f46e5);
		border: none;
		color: #fff;
	}
	.ow-typing {
		display: flex; gap: 4px; align-items: center;
		padding: 2px 0;
	}
	.ow-typing-dot {
		display: block;
		width: 6px; height: 6px;
		border-radius: 9999px;
		background: var(--dt3, #999);
		animation: ow-bounce 1.1s ease-in-out infinite;
		animation-delay: var(--d, 0s);
	}
	@keyframes ow-bounce {
		0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
		40%            { transform: translateY(-5px); opacity: 1; }
	}
	.ow-pills-row {
		display: flex; flex-wrap: wrap; gap: 8px;
		margin-top: 4px; padding-left: 36px;
	}
	.ow-pill {
		padding: 6px 16px; border-radius: 9999px;
		font-size: 12px; font-weight: 500;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		color: var(--dt2);
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s, color 0.15s;
	}
	.ow-pill--active {
		border-color: #7c3aed;
		background: rgba(124, 58, 237, 0.08);
		color: #a78bfa;
	}
	.ow-chat-actions {
		margin-top: auto;
		display: flex; justify-content: flex-end; gap: 8px;
	}

	/* ── 2. Selection Cards ── */
	.ow-sel-group {
		max-width: 580px;
	}
	.ow-sel-label {
		font-size: 14px; font-weight: 600; color: var(--dt);
		margin-bottom: 4px;
	}
	.ow-sel-hint {
		font-weight: 400; color: var(--dt3); font-size: 12px;
	}
	.ow-sel-grid {
		display: grid; grid-template-columns: repeat(3, 1fr);
		gap: 10px; margin-top: 12px;
	}
	.ow-sel-card {
		position: relative;
		padding: 18px 14px; border-radius: 12px;
		text-align: left; cursor: pointer;
		border: 1.5px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
	}
	.ow-sel-card--active {
		border-color: #7c3aed;
		background: rgba(124, 58, 237, 0.05);
		box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
	}
	.ow-sel-radio {
		position: absolute; top: 10px; right: 10px;
		width: 16px; height: 16px; border-radius: 9999px;
		border: 2px solid var(--dbd);
		transition: border-color 0.15s;
	}
	.ow-sel-radio--on {
		border-color: #7c3aed;
		background: #7c3aed;
		box-shadow: inset 0 0 0 3px var(--dbg);
	}
	.ow-sel-check {
		position: absolute; top: 10px; right: 10px;
		width: 18px; height: 18px; border-radius: 4px;
		border: 2px solid var(--dbd);
		display: flex; align-items: center; justify-content: center;
		transition: border-color 0.15s, background 0.15s;
	}
	.ow-sel-check--on {
		border-color: #7c3aed;
		background: #7c3aed;
	}
	.ow-sel-icon {
		font-size: 20px; color: var(--dt2); margin-bottom: 8px;
		transition: color 0.15s;
	}
	.ow-sel-card--active .ow-sel-icon {
		color: #7c3aed;
	}
	.ow-sel-title {
		font-size: 13px; font-weight: 600; color: var(--dt);
		margin-bottom: 2px;
	}
	.ow-sel-desc {
		font-size: 12px; color: var(--dt2); line-height: 1.4;
	}
	.ow-sel-footer {
		margin-top: 14px;
		display: flex; justify-content: space-between; align-items: center;
	}
	.ow-sel-count {
		font-size: 12px; color: var(--dt3);
	}

	/* ── 3. Progress Steps ── */
	.ow-steps-wrap {
		max-width: 580px;
	}
	.ow-steps-row {
		display: flex; align-items: center;
	}
	.ow-steps-line {
		flex: 1; height: 2px;
		background: var(--dbd);
		transition: background 0.3s;
	}
	.ow-steps-line--done {
		background: #7c3aed;
	}
	.ow-step-item {
		display: flex; flex-direction: column; align-items: center; gap: 8px;
		background: none; border: none; cursor: pointer; padding: 0;
		position: relative; z-index: 1;
	}
	.ow-step-circle {
		width: 32px; height: 32px; border-radius: 9999px;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 700;
		background: var(--dbg);
		border: 2px solid var(--dbd);
		color: var(--dt3);
		transition: background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
	}
	.ow-step-circle--done {
		background: #22c55e;
		border-color: #22c55e;
		color: #fff;
	}
	.ow-step-circle--active {
		background: linear-gradient(135deg, #7c3aed, #4f46e5);
		border-color: #7c3aed;
		color: #fff;
		box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.15);
	}
	.ow-step-label {
		font-size: 11px; font-weight: 500;
		color: var(--dt3);
		white-space: nowrap;
		transition: color 0.3s, font-weight 0.3s;
	}
	.ow-step-label--active {
		color: #7c3aed; font-weight: 600;
	}
	.ow-step-label--done {
		color: var(--dt2);
	}
	.ow-steps-content {
		margin-top: 24px; padding: 20px; border-radius: 12px;
		background: var(--dbg2); border: 1px solid var(--dbd);
		min-height: 80px;
	}
	.ow-steps-title {
		font-size: 14px; font-weight: 600; color: var(--dt);
		margin-bottom: 4px;
	}
	.ow-steps-sub {
		font-size: 13px; color: var(--dt2);
	}
	.ow-steps-nav {
		margin-top: 12px;
		display: flex; justify-content: space-between;
	}

	/* ── 4. Typewriter Text ── */
	.ow-typewriter-dark {
		padding: 32px 28px;
		background: #0d0d14;
		border-radius: 16px;
		min-height: 160px;
		display: flex; flex-direction: column; justify-content: center;
		position: relative;
	}
	.ow-type-line {
		font-weight: 700; letter-spacing: -0.02em; line-height: 1.35;
		margin-bottom: 4px;
	}
	.ow-type-line--done {
		color: rgba(255, 255, 255, 0.6);
	}
	.ow-type-line--current {
		color: #fff;
		display: flex; align-items: center;
	}
	.ow-type-cursor {
		display: inline-block;
		width: 2px; height: 1em;
		background: #a78bfa;
		margin-left: 2px; border-radius: 1px;
		opacity: 0;
		transition: opacity 0.1s;
	}
	.ow-type-cursor--on {
		opacity: 1;
	}
	.ow-type-actions {
		margin-top: 20px;
		display: flex; gap: 12px; align-items: center;
	}
	/* Pure CSS typewriter variant */
	.ow-typewriter-css {
		margin-top: 16px; padding: 28px;
		border: 1px solid var(--dbd); border-radius: 16px;
		background: var(--dbg);
		overflow: hidden;
	}
	.ow-css-type-line {
		font-size: 18px; font-weight: 700; color: var(--dt);
		letter-spacing: -0.02em; line-height: 1.4;
		overflow: hidden; white-space: nowrap;
		width: 0;
		border-right: 2px solid transparent;
	}
	.ow-css-type-line--1 {
		animation: ow-typewrite 1.2s steps(18) 0.5s forwards;
	}
	.ow-css-type-line--2 {
		animation: ow-typewrite 1.6s steps(26) 2.2s forwards;
		font-size: 16px; color: var(--dt2);
	}
	.ow-css-type-line--3 {
		animation: ow-typewrite 1.8s steps(28) 4.3s forwards;
		font-size: 15px; color: var(--dt2);
	}
	.ow-css-cursor {
		display: inline-block;
		border-right: 2px solid #7c3aed;
		margin-left: 2px;
		animation: ow-blink-cursor 0.7s step-end infinite;
	}
	@keyframes ow-typewrite {
		from { width: 0; }
		to   { width: 100%; }
	}
	@keyframes ow-blink-cursor {
		0%, 100% { border-color: #7c3aed; }
		50%      { border-color: transparent; }
	}

	/* ── 5. Welcome Screen ── */
	.ow-welcome {
		display: flex; flex-direction: column; align-items: center;
		text-align: center;
		padding: 48px 24px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 20px;
		max-width: 480px;
	}
	.ow-welcome-orb-wrap {
		width: 96px; height: 96px;
		display: flex; align-items: center; justify-content: center;
		margin-bottom: 24px;
		position: relative;
	}
	.ow-welcome-orb-wrap::before {
		content: '';
		position: absolute; inset: -12px;
		border-radius: 9999px;
		background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
		animation: ow-orb-pulse 2.4s ease-in-out infinite;
	}
	.ow-welcome-orb {
		width: 80px; height: 80px; border-radius: 9999px;
		background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 40%, #6d28d9 100%);
		box-shadow: 0 0 40px rgba(124, 58, 237, 0.35), 0 0 80px rgba(124, 58, 237, 0.15);
		animation: ow-orb-breathe 3s ease-in-out infinite;
		position: relative; z-index: 1;
	}
	@keyframes ow-orb-pulse {
		0%, 100% { transform: scale(1); opacity: 0.7; }
		50%      { transform: scale(1.3); opacity: 0.3; }
	}
	@keyframes ow-orb-breathe {
		0%, 100% { transform: scale(1); }
		50%      { transform: scale(1.05); }
	}
	.ow-welcome-title {
		font-size: 26px; font-weight: 800; color: var(--dt);
		letter-spacing: -0.03em; margin: 0 0 8px;
	}
	.ow-welcome-sub {
		font-size: 14px; color: var(--dt2); line-height: 1.5;
		max-width: 340px; margin: 0 0 24px;
	}
	.ow-welcome-actions {
		display: flex; flex-direction: column; align-items: center; gap: 12px;
	}

	/* ── 6. Feature Tour ── */
	.ow-tour-demo {
		position: relative;
		width: 100%; max-width: 560px;
		height: 320px;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--dbd);
	}
	.ow-tour-fake-ui {
		position: absolute; inset: 0;
		display: flex;
		background: var(--dbg);
	}
	.ow-tour-fake-sidebar {
		width: 52px; background: var(--dbg2);
		border-right: 1px solid var(--dbd);
		padding: 12px 8px;
		display: flex; flex-direction: column; gap: 8px; align-items: center;
	}
	.ow-tour-fake-logo {
		width: 28px; height: 28px; border-radius: 8px;
		background: linear-gradient(135deg, #7c3aed, #4f46e5);
		margin-bottom: 8px;
	}
	.ow-tour-fake-nav-item {
		width: 32px; height: 32px; border-radius: 8px;
		background: var(--dbg3, var(--dbg));
		border: 1px solid var(--dbd);
	}
	.ow-tour-fake-nav-item--active {
		border-color: rgba(124, 58, 237, 0.3);
		background: rgba(124, 58, 237, 0.08);
	}
	.ow-tour-fake-main {
		flex: 1; padding: 16px;
	}
	.ow-tour-fake-header {
		height: 24px; width: 50%;
		background: var(--dbd); border-radius: 6px;
		margin-bottom: 16px;
	}
	.ow-tour-fake-content {
		display: flex; flex-direction: column; gap: 10px;
	}
	.ow-tour-fake-block {
		height: 48px; width: 100%;
		background: var(--dbg2); border-radius: 8px;
		border: 1px solid var(--dbd);
	}
	.ow-tour-fake-block--short {
		width: 70%;
	}
	.ow-tour-overlay {
		position: absolute; inset: 0;
		background: rgba(0, 0, 0, 0.55);
		z-index: 2;
	}
	.ow-tour-spotlight {
		position: absolute;
		top: 48px; left: 4px;
		width: 44px; height: 36px;
		border-radius: 8px;
		box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.55);
		background: transparent;
		border: 2px solid rgba(124, 58, 237, 0.6);
		animation: ow-spotlight-pulse 1.8s ease-in-out infinite;
	}
	@keyframes ow-spotlight-pulse {
		0%, 100% { border-color: rgba(124, 58, 237, 0.6); }
		50%      { border-color: rgba(124, 58, 237, 1); }
	}
	.ow-tour-tooltip {
		position: absolute;
		top: 44px; left: 60px;
		width: 240px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 14px;
		z-index: 3;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}
	.ow-tour-tooltip-arrow {
		position: absolute;
		top: 14px; left: -6px;
		width: 10px; height: 10px;
		background: var(--dbg);
		border-left: 1px solid var(--dbd);
		border-bottom: 1px solid var(--dbd);
		transform: rotate(45deg);
	}
	.ow-tour-step-badge {
		font-size: 10px; font-weight: 600;
		color: #a78bfa;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 6px;
	}
	.ow-tour-tooltip-title {
		font-size: 14px; font-weight: 700; color: var(--dt);
		margin-bottom: 4px;
	}
	.ow-tour-tooltip-desc {
		font-size: 12px; color: var(--dt2); line-height: 1.45;
		margin-bottom: 12px;
	}
	.ow-tour-tooltip-actions {
		display: flex; align-items: center; gap: 6px;
	}
	.ow-tour-dots {
		display: flex; gap: 5px; justify-content: center;
		margin-top: 10px;
	}
	.ow-tour-dot {
		width: 6px; height: 6px; border-radius: 9999px;
		background: var(--dbd);
		transition: background 0.2s, transform 0.2s;
	}
	.ow-tour-dot--active {
		background: #7c3aed;
		transform: scale(1.3);
	}
	.ow-tour-dot--done {
		background: #a78bfa;
	}

	/* ── 7. Setup Checklist ── */
	.ow-checklist-shell {
		max-width: 480px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 20px;
	}
	.ow-checklist-header {
		display: flex; justify-content: space-between; align-items: flex-start;
		margin-bottom: 14px;
	}
	.ow-checklist-header-text {
		display: flex; flex-direction: column; gap: 2px;
	}
	.ow-checklist-header-title {
		font-size: 15px; font-weight: 700; color: var(--dt);
	}
	.ow-checklist-header-sub {
		font-size: 12px; color: var(--dt3);
	}
	.ow-checklist-bar-track {
		width: 100%; height: 6px;
		background: var(--dbd);
		border-radius: 9999px;
		overflow: hidden;
	}
	.ow-checklist-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, #7c3aed, #4f46e5);
		border-radius: 9999px;
		transition: width 0.4s ease;
	}
	.ow-checklist-pct {
		font-size: 11px; color: var(--dt3);
		margin-top: 4px; margin-bottom: 16px;
	}
	.ow-checklist-items {
		display: flex; flex-direction: column; gap: 2px;
	}
	.ow-checklist-item {
		display: flex; align-items: center; gap: 10px;
		padding: 10px 12px;
		border-radius: 10px;
		transition: background 0.15s;
	}
	.ow-checklist-item:hover {
		background: var(--dbg);
	}
	.ow-checklist-checkbox {
		width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0;
		border: 2px solid var(--dbd);
		background: transparent;
		display: flex; align-items: center; justify-content: center;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
	}
	.ow-checklist-checkbox--on {
		border-color: #7c3aed;
		background: #7c3aed;
	}
	.ow-checklist-label {
		font-size: 13px; font-weight: 500; color: var(--dt);
	}
	.ow-checklist-label--done {
		color: var(--dt3);
		text-decoration: line-through;
	}

	/* Celebration state */
	.ow-checklist-celebrate {
		display: flex; flex-direction: column; align-items: center;
		text-align: center; padding: 24px 0 8px;
		position: relative;
	}
	.ow-confetti-wrap {
		position: absolute; top: 0; left: 50%;
		transform: translateX(-50%);
		width: 200px; height: 60px;
		pointer-events: none;
	}
	.ow-confetti {
		position: absolute;
		width: 8px; height: 8px;
		border-radius: 2px;
		animation: ow-confetti-fall 1.5s ease-out forwards;
	}
	.ow-confetti--1 { left: 20%; background: #7c3aed; animation-delay: 0s; }
	.ow-confetti--2 { left: 40%; background: #f59e0b; animation-delay: 0.1s; }
	.ow-confetti--3 { left: 60%; background: #22c55e; animation-delay: 0.15s; }
	.ow-confetti--4 { left: 80%; background: #3b82f6; animation-delay: 0.2s; }
	.ow-confetti--5 { left: 30%; background: #ef4444; animation-delay: 0.08s; width: 6px; height: 10px; }
	.ow-confetti--6 { left: 70%; background: #a78bfa; animation-delay: 0.12s; width: 10px; height: 6px; }
	@keyframes ow-confetti-fall {
		0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
		100% { transform: translateY(50px) rotate(360deg); opacity: 0; }
	}
	.ow-celebrate-icon {
		width: 48px; height: 48px; border-radius: 9999px;
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		font-size: 22px; font-weight: 700;
		display: flex; align-items: center; justify-content: center;
		margin-bottom: 12px;
	}
	.ow-celebrate-title {
		font-size: 16px; font-weight: 700; color: var(--dt);
		margin-bottom: 4px;
	}
	.ow-celebrate-sub {
		font-size: 13px; color: var(--dt2);
	}
</style>
