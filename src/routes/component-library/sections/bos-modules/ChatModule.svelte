<script lang="ts">
	// ── Section 1: Dynamic Greeting & Empty State ─────────────────────
	type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'late';

	let timeOfDay = $state<TimeOfDay>('morning');

	const greetingMap: Record<TimeOfDay, string> = {
		morning:   'Good morning',
		afternoon: 'Good afternoon',
		evening:   'Good evening',
		late:      'Working late',
	};

	const userName = 'Alex';

	const greeting = $derived(greetingMap[timeOfDay]);

	const quickActions = [
		'Write a proposal',
		'Analyze data',
		'Plan my week',
		'Debug code',
		'Brainstorm ideas',
		'Summarize notes',
	];

	// ── Section 2: Chat Input Bar ─────────────────────────────────────
	let inputText = $state('');
	let isStreaming = $state(false);
	let attachMenuOpen = $state(false);
	let mentionOpen = $state(false);

	const mentionAgents = [
		{ id: 'researcher', name: 'Researcher', desc: 'Deep web research & synthesis', avatar: 'R' },
		{ id: 'coder',      name: 'Coder',      desc: 'Code generation & debugging',   avatar: 'C' },
		{ id: 'writer',     name: 'Writer',     desc: 'Business writing & editing',    avatar: 'W' },
		{ id: 'analyst',    name: 'Analyst',    desc: 'Data analysis & insights',      avatar: 'A' },
	];

	const selectedContext = 'Project Alpha';
	const selectedModel   = 'Claude 3.7 Sonnet';

	function toggleStream() {
		isStreaming = !isStreaming;
		attachMenuOpen = false;
	}

	function toggleAttach() {
		attachMenuOpen = !attachMenuOpen;
		mentionOpen = false;
	}

	function toggleMention() {
		mentionOpen = !mentionOpen;
		attachMenuOpen = false;
	}

	// ── Section 3: Message Bubbles ────────────────────────────────────
	let thinkingExpanded = $state(true);
	let toolCallExpanded = $state(false);
	let hoveredBubble    = $state<string | null>(null);

	// ── Section 4: Conversation Sidebar ──────────────────────────────
	type SidebarTab = 'all' | 'pinned' | 'recent';
	let sidebarTab       = $state<SidebarTab>('all');
	let sidebarSearch    = $state('');
	let selectedConvId   = $state('conv-2');

	type Conversation = {
		id: string;
		title: string;
		preview: string;
		time: string;
		pinned: boolean;
		unread?: number;
	};

	const conversations: Conversation[] = [
		{ id: 'conv-1', title: 'Q4 Business Plan',       preview: 'The revenue targets look solid…',          time: 'Just now',  pinned: true,  unread: 2 },
		{ id: 'conv-2', title: 'Website Redesign Brief',  preview: 'Here is the updated sitemap draft…',       time: '2m ago',    pinned: true               },
		{ id: 'conv-3', title: 'API Debug Session',       preview: 'The 401 is caused by a missing header…',   time: '1h ago',    pinned: false, unread: 1 },
		{ id: 'conv-4', title: 'Weekly Report Draft',     preview: 'I have incorporated all the feedback…',    time: 'Yesterday', pinned: false              },
		{ id: 'conv-5', title: 'Competitor Analysis',     preview: 'Based on the data, there are three…',      time: 'Mon',       pinned: false              },
		{ id: 'conv-6', title: 'Marketing Copy Review',   preview: 'The headline is strong. Consider…',        time: 'Sun',       pinned: false              },
	];

	const filteredConvs = $derived(
		conversations.filter(c => {
			if (sidebarTab === 'pinned') return c.pinned;
			if (sidebarTab === 'recent') return !c.pinned;
			return true;
		}).filter(c =>
			!sidebarSearch || c.title.toLowerCase().includes(sidebarSearch.toLowerCase())
		)
	);

	// ── Section 5: Focus Mode Cards ───────────────────────────────────
	type FocusMode = {
		id: string;
		icon: string;
		title: string;
		desc: string;
		color: string;
	};

	const focusModes: FocusMode[] = [
		{ id: 'writing',  icon: '✍️', title: 'Writing',  desc: 'Drafts, emails, proposals',  color: '#3b82f6' },
		{ id: 'coding',   icon: '⚙️', title: 'Coding',   desc: 'Code, debug, review',        color: '#8b5cf6' },
		{ id: 'research', icon: '🔍', title: 'Research', desc: 'Deep dives, synthesis',       color: '#06b6d4' },
		{ id: 'analysis', icon: '📊', title: 'Analysis', desc: 'Data, charts, insights',      color: '#f59e0b' },
		{ id: 'creative', icon: '🎨', title: 'Creative', desc: 'Ideas, brainstorms, concepts',color: '#ec4899' },
		{ id: 'general',  icon: '💬', title: 'General',  desc: 'Open-ended conversation',     color: '#22c55e' },
	];

	let selectedFocus = $state('writing');

	const focusToneOptions  = ['Professional', 'Friendly', 'Concise', 'Detailed'];
	const focusFormatOptions = ['Markdown', 'Plain text', 'Bullet points', 'Numbered list'];

	let selectedTone   = $state('Professional');
	let selectedFormat = $state('Markdown');

	// ── Section 6: Features Overview ─────────────────────────────────
	const featurePills = [
		'Voice Input',
		'@Agent Mentions',
		'/Slash Commands',
		'Artifacts',
		'File Attachments',
		'Focus Modes',
		'Chain of Thought',
		'SSE Streaming',
	];

	const archSteps = [
		{ label: 'Input',      icon: '⌨️', color: '#3b82f6' },
		{ label: 'Focus Mode', icon: '🎯', color: '#8b5cf6' },
		{ label: 'Agent',      icon: '🤖', color: '#06b6d4' },
		{ label: 'Model',      icon: '◆',  color: '#f59e0b' },
		{ label: 'SSE Stream', icon: '⚡', color: '#22c55e' },
		{ label: 'Render',     icon: '🖥️', color: '#ec4899' },
	];
</script>

<section class="ds-section">

	<!-- ═══ 1. DYNAMIC GREETING & EMPTY STATE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dynamic Greeting & Empty State</h3>
		<p class="ds-card__sub">
			Time-aware greeting, animated rotating subtitle, and quick-action pills — the chat module's empty canvas.
		</p>

		<!-- Time-of-day switcher -->
		<div class="cm-tod-tabs">
			{#each (['morning', 'afternoon', 'evening', 'late'] as TimeOfDay[]) as tod}
				<button
					class="cm-tod-tab"
					class:cm-tod-tab--active={timeOfDay === tod}
					onclick={() => timeOfDay = tod}
				>{tod}</button>
			{/each}
		</div>

		<!-- Empty state canvas -->
		<div class="cm-empty">
			<div class="cm-empty__greeting">
				{greeting}, {userName}.
			</div>
			<div class="cm-empty__subtitle-wrap" aria-label="Rotating suggestions">
				<div class="cm-empty__subtitle-track">
					<span class="cm-empty__subtitle">Draft a business proposal</span>
					<span class="cm-empty__subtitle">Analyze your project data</span>
					<span class="cm-empty__subtitle">Plan your weekly tasks</span>
					<span class="cm-empty__subtitle">Debug that tricky bug</span>
					<span class="cm-empty__subtitle">Brainstorm fresh ideas</span>
				</div>
			</div>
			<div class="cm-empty__pills">
				{#each quickActions as action}
					<button class="cm-empty__pill">{action}</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 2. CHAT INPUT BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat Input Bar</h3>
		<p class="ds-card__sub">
			Bottom-docked input with attachment dropdown, auto-resize textarea, send/stop button, @agent autocomplete, and status bar.
		</p>

		<div class="cm-input-shell">

			<!-- @mention autocomplete (above input) -->
			{#if mentionOpen}
				<div class="cm-mention-menu" role="listbox" aria-label="Agent mentions">
					<div class="cm-mention-menu__header">Agents</div>
					{#each mentionAgents as agent}
						<button class="cm-mention-item" role="option" aria-selected="false" onclick={() => mentionOpen = false}>
							<span class="cm-mention-avatar">{agent.avatar}</span>
							<span class="cm-mention-info">
								<span class="cm-mention-name">@{agent.name}</span>
								<span class="cm-mention-desc">{agent.desc}</span>
							</span>
						</button>
					{/each}
				</div>
			{/if}

			<!-- Attachment dropdown -->
			{#if attachMenuOpen}
				<div class="cm-attach-menu" role="menu" aria-label="Attach options">
					<button class="cm-attach-item" role="menuitem" onclick={() => attachMenuOpen = false}>
						<span class="cm-attach-icon">📎</span> Upload file
					</button>
					<button class="cm-attach-item" role="menuitem" onclick={() => attachMenuOpen = false}>
						<span class="cm-attach-icon">🖼️</span> Upload image
					</button>
					<button class="cm-attach-item" role="menuitem" onclick={() => attachMenuOpen = false}>
						<span class="cm-attach-icon">📋</span> Paste from clipboard
					</button>
				</div>
			{/if}

			<!-- Input row -->
			<div class="cm-input-row">
				<!-- Attach button -->
				<button
					class="cm-input-attach"
					aria-label="Add attachment"
					onclick={toggleAttach}
					class:cm-input-attach--active={attachMenuOpen}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
					</svg>
				</button>

				<!-- Textarea -->
				<div class="cm-input-textarea-wrap">
					<textarea
						class="cm-input-textarea"
						placeholder="Message… (@ to mention an agent, / for commands)"
						bind:value={inputText}
						rows="1"
						aria-label="Chat message"
					></textarea>
				</div>

				<!-- Send / Stop button -->
				{#if isStreaming}
					<button class="cm-input-stop" aria-label="Stop generation" onclick={toggleStream}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<rect x="4" y="4" width="16" height="16" rx="2"/>
						</svg>
					</button>
				{:else}
					<button
						class="cm-input-send"
						aria-label="Send message"
						disabled={!inputText.trim()}
						onclick={toggleStream}
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
						</svg>
					</button>
				{/if}
			</div>

			<!-- Status bar -->
			<div class="cm-input-status">
				<button class="cm-input-status-ctx" aria-label="Switch context">{selectedContext}</button>
				<span class="cm-input-status-sep">·</span>
				<button class="cm-input-status-model" aria-label="Switch model">{selectedModel}</button>
				<span class="cm-input-status-grow"></span>
				<button class="cm-input-status-mention" aria-label="Mention agent" onclick={toggleMention}>@</button>
				<span class="cm-input-status-hint">Enter to send</span>
			</div>
		</div>
	</div>

	<!-- ═══ 3. MESSAGE BUBBLES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Message Bubbles</h3>
		<p class="ds-card__sub">
			User bubbles (dark, right-aligned), assistant messages (clean left), thinking panel, tool-call card, and loading indicator.
		</p>

		<div class="cm-chat-area">

			<!-- User message -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="cm-msg-row cm-msg-row--user"
				onmouseenter={() => hoveredBubble = 'user1'}
				onmouseleave={() => hoveredBubble = null}
			>
				{#if hoveredBubble === 'user1'}
					<div class="cm-msg-actions cm-msg-actions--left">
						<button class="cm-msg-action-btn" aria-label="Copy">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
						</button>
						<button class="cm-msg-action-btn" aria-label="Edit">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
						</button>
					</div>
				{/if}
				<div class="cm-msg-bubble cm-msg-bubble--user">
					Can you write a one-page executive summary for the Q4 business plan? Focus on revenue growth and key initiatives.
				</div>
			</div>

			<!-- Thinking panel -->
			<div class="cm-msg-row cm-msg-row--assistant">
				<div class="cm-thinking" class:cm-thinking--collapsed={!thinkingExpanded}>
					<button
						class="cm-thinking__header"
						onclick={() => thinkingExpanded = !thinkingExpanded}
						aria-expanded={thinkingExpanded}
						aria-label="Toggle thinking panel"
					>
						<span class="cm-thinking__pulse" aria-hidden="true"></span>
						<span class="cm-thinking__label">Thinking</span>
						<span class="cm-thinking__tokens">~340 tokens</span>
						<svg
							class="cm-thinking__chevron"
							class:cm-thinking__chevron--open={thinkingExpanded}
							width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							aria-hidden="true"
						>
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>
					{#if thinkingExpanded}
						<div class="cm-thinking__body">
							The user wants an executive summary for a Q4 business plan. I should focus on: revenue growth metrics, key strategic initiatives, and keep it tight to one page. Let me structure it with a clear hook, three to four bullet initiatives, and a forward-looking close…
						</div>
					{/if}
				</div>
			</div>

			<!-- Tool call card -->
			<div class="cm-msg-row cm-msg-row--assistant">
				<button
					class="cm-tool-card"
					onclick={() => toolCallExpanded = !toolCallExpanded}
					aria-expanded={toolCallExpanded}
					aria-label="Toggle tool call details"
				>
					<span class="cm-tool-card__icon" aria-hidden="true">⚙️</span>
					<span class="cm-tool-card__name">search_knowledge_base</span>
					<span class="cm-tool-card__status cm-tool-card__status--done">Done</span>
					<svg
						class="cm-tool-card__chevron"
						class:cm-tool-card__chevron--open={toolCallExpanded}
						width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						aria-hidden="true"
					>
						<polyline points="6 9 12 15 18 9"/>
					</svg>
				</button>
				{#if toolCallExpanded}
					<div class="cm-tool-result">
						<span class="cm-tool-result__label">Result:</span>
						Found 4 documents matching "Q4 business plan revenue". Top match: <em>Q4_Plan_v3_Final.pdf</em> (94% relevance).
					</div>
				{/if}
			</div>

			<!-- Assistant message -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="cm-msg-row cm-msg-row--assistant"
				onmouseenter={() => hoveredBubble = 'asst1'}
				onmouseleave={() => hoveredBubble = null}
			>
				<div class="cm-msg-content">
					<div class="cm-msg-content__header">
						<span class="cm-msg-content__agent">BusinessOS AI</span>
					</div>
					<div class="cm-msg-content__body">
						<p><strong>Q4 Executive Summary</strong></p>
						<p>
							This quarter we are targeting <strong>$4.2M ARR</strong>, a 34% increase over Q3, driven by three strategic initiatives: enterprise expansion, the launch of the Analytics Pro tier, and deeper API integrations with Salesforce and HubSpot.
						</p>
						<p>
							Key milestones include onboarding 12 new enterprise accounts (≥ 500 seats), reducing churn from 4.1% to under 3%, and releasing the v2 data-export pipeline that unlocks the BI partner program.
						</p>
					</div>
					{#if hoveredBubble === 'asst1'}
						<div class="cm-msg-actions cm-msg-actions--right">
							<button class="cm-msg-action-btn" aria-label="Copy">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
							</button>
							<button class="cm-msg-action-btn" aria-label="Thumbs up">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
							</button>
							<button class="cm-msg-action-btn" aria-label="Thumbs down">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
							</button>
						</div>
					{/if}
				</div>
			</div>

			<!-- Loading indicator -->
			<div class="cm-msg-row cm-msg-row--assistant">
				<div class="cm-loading-indicator" aria-label="Generating response">
					<span class="cm-loading-dot"></span>
					<span class="cm-loading-dot"></span>
					<span class="cm-loading-dot"></span>
				</div>
			</div>

		</div>
	</div>

	<!-- ═══ 4. CONVERSATION SIDEBAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Conversation Sidebar</h3>
		<p class="ds-card__sub">
			Left panel with filter tabs (All / Pinned / Recent), search, conversation list, pinned state, and new-conversation button.
		</p>

		<div class="cm-sidebar-frame">
			<!-- Header -->
			<div class="cm-sidebar__header">
				<span class="cm-sidebar__title">Conversations</span>
				<button class="cm-sidebar__new-btn" aria-label="New conversation">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
					</svg>
					New
				</button>
			</div>

			<!-- Search -->
			<div class="cm-sidebar__search-wrap">
				<svg class="cm-sidebar__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
				</svg>
				<input
					class="cm-sidebar__search"
					type="search"
					placeholder="Search conversations…"
					bind:value={sidebarSearch}
					aria-label="Search conversations"
				/>
			</div>

			<!-- Filter tabs -->
			<div class="cm-sidebar__tabs" role="tablist" aria-label="Filter conversations">
				{#each (['all', 'pinned', 'recent'] as SidebarTab[]) as tab}
					<button
						class="cm-sidebar__tab"
						class:cm-sidebar__tab--active={sidebarTab === tab}
						role="tab"
						aria-selected={sidebarTab === tab}
						onclick={() => sidebarTab = tab}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				{/each}
			</div>

			<!-- Conversation list -->
			<div class="cm-sidebar__list" role="list">
				{#each filteredConvs as conv (conv.id)}
					<button
						class="cm-conv-item"
						class:cm-conv-item--selected={selectedConvId === conv.id}
						onclick={() => selectedConvId = conv.id}
						aria-current={selectedConvId === conv.id ? 'true' : undefined}
					>
						<div class="cm-conv-item__top">
							<span class="cm-conv-item__title">{conv.title}</span>
							<span class="cm-conv-item__right">
								{#if conv.pinned}
									<svg class="cm-conv-item__pin" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-label="Pinned"><path d="M12 2L9 9H2l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7z"/></svg>
								{/if}
								{#if conv.unread}
									<span class="cm-conv-item__badge" aria-label="{conv.unread} unread">{conv.unread}</span>
								{/if}
								<span class="cm-conv-item__time">{conv.time}</span>
							</span>
						</div>
						<div class="cm-conv-item__preview">{conv.preview}</div>
					</button>
				{/each}
				{#if filteredConvs.length === 0}
					<div class="cm-sidebar__empty">No conversations found.</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 5. FOCUS MODE CARDS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Focus Mode Cards</h3>
		<p class="ds-card__sub">
			Grid of context cards with icon, title, and description. Selected card gets a colored border. Below: focus-specific tone and format options.
		</p>

		<div class="cm-focus-grid">
			{#each focusModes as mode}
				<button
					class="cm-focus-card"
					class:cm-focus-card--selected={selectedFocus === mode.id}
					style="--cm-focus-color: {mode.color}"
					onclick={() => selectedFocus = mode.id}
					aria-pressed={selectedFocus === mode.id}
					aria-label="Select {mode.title} focus mode"
				>
					<span class="cm-focus-card__icon" aria-hidden="true">{mode.icon}</span>
					<span class="cm-focus-card__title">{mode.title}</span>
					<span class="cm-focus-card__desc">{mode.desc}</span>
				</button>
			{/each}
		</div>

		<!-- Focus options -->
		<div class="cm-focus-opts">
			<div class="cm-focus-opt-group">
				<label class="cm-focus-opt-label" for="cm-tone-select">Tone</label>
				<div class="cm-focus-opt-pills" role="group" aria-label="Tone options">
					{#each focusToneOptions as tone}
						<button
							class="cm-focus-opt-pill"
							class:cm-focus-opt-pill--active={selectedTone === tone}
							onclick={() => selectedTone = tone}
							aria-pressed={selectedTone === tone}
						>{tone}</button>
					{/each}
				</div>
			</div>
			<div class="cm-focus-opt-group">
				<label class="cm-focus-opt-label" for="cm-format-select">Format</label>
				<div class="cm-focus-opt-pills" role="group" aria-label="Format options">
					{#each focusFormatOptions as fmt}
						<button
							class="cm-focus-opt-pill"
							class:cm-focus-opt-pill--active={selectedFormat === fmt}
							onclick={() => selectedFormat = fmt}
							aria-pressed={selectedFormat === fmt}
						>{fmt}</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 6. CHAT FEATURES OVERVIEW ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat Features Overview</h3>
		<p class="ds-card__sub">
			Quick-reference feature pills and an architecture flow diagram showing the message pipeline from input to rendered output.
		</p>

		<!-- Feature pills -->
		<div class="cm-feat-section">
			<div class="cm-feat-label">Features</div>
			<div class="cm-feat-pills">
				{#each featurePills as feat}
					<span class="cm-feat-pill">{feat}</span>
				{/each}
			</div>
		</div>

		<!-- Architecture flow -->
		<div class="cm-arch-section">
			<div class="cm-arch-label">Message Pipeline</div>
			<div class="cm-arch-flow">
				{#each archSteps as step, i}
					<div class="cm-arch-step" style="--cm-arch-color: {step.color}">
						<span class="cm-arch-step__icon" aria-hidden="true">{step.icon}</span>
						<span class="cm-arch-step__label">{step.label}</span>
					</div>
					{#if i < archSteps.length - 1}
						<svg class="cm-arch-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<polyline points="9 18 15 12 9 6"/>
						</svg>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Key capabilities grid -->
		<div class="cm-caps-grid">
			<div class="cm-cap-item">
				<span class="cm-cap-item__icon" aria-hidden="true">🔄</span>
				<div>
					<div class="cm-cap-item__title">SSE Streaming</div>
					<div class="cm-cap-item__desc">Token-by-token responses via Server-Sent Events. Supports incremental UI updates.</div>
				</div>
			</div>
			<div class="cm-cap-item">
				<span class="cm-cap-item__icon" aria-hidden="true">🧠</span>
				<div>
					<div class="cm-cap-item__title">Chain of Thought</div>
					<div class="cm-cap-item__desc">Collapsible reasoning panel with token count. Amber-themed pulse while thinking.</div>
				</div>
			</div>
			<div class="cm-cap-item">
				<span class="cm-cap-item__icon" aria-hidden="true">🤖</span>
				<div>
					<div class="cm-cap-item__title">@Agent Mentions</div>
					<div class="cm-cap-item__desc">Type @ to route messages to specialized agents with autocomplete popup.</div>
				</div>
			</div>
			<div class="cm-cap-item">
				<span class="cm-cap-item__icon" aria-hidden="true">📎</span>
				<div>
					<div class="cm-cap-item__title">File Attachments</div>
					<div class="cm-cap-item__desc">Upload files, images, or paste from clipboard via the + attachment button.</div>
				</div>
			</div>
		</div>
	</div>

</section>

<style>
	/* ─── Design tokens are defined globally, used via var() ─────────── */

	/* ════════════════════════════════════════════════════════
	   SECTION 1 — DYNAMIC GREETING & EMPTY STATE
	   Prefix: cm-tod-*, cm-empty-*
	════════════════════════════════════════════════════════ */

	.cm-tod-tabs {
		display: flex;
		gap: 6px;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}

	.cm-tod-tab {
		padding: 5px 14px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}

	.cm-tod-tab:hover {
		background: var(--dbg3);
		color: var(--dt2);
	}

	.cm-tod-tab--active {
		background: var(--dt);
		color: var(--dbg);
		border-color: var(--dt);
	}

	.cm-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 48px 24px 40px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 20px;
		text-align: center;
		overflow: hidden;
	}

	.cm-empty__greeting {
		font-size: clamp(24px, 4vw, 36px);
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	/* Rotating subtitle — pure CSS animation */
	.cm-empty__subtitle-wrap {
		height: 24px;
		overflow: hidden;
		position: relative;
		width: 100%;
		max-width: 420px;
	}

	.cm-empty__subtitle-track {
		display: flex;
		flex-direction: column;
		animation: cm-rotate-subtitle 10s steps(1, end) infinite;
	}

	.cm-empty__subtitle {
		height: 24px;
		line-height: 24px;
		font-size: 15px;
		color: var(--dt3);
		flex-shrink: 0;
		white-space: nowrap;
	}

	@keyframes cm-rotate-subtitle {
		0%   { transform: translateY(0);    }
		20%  { transform: translateY(-24px);  }
		40%  { transform: translateY(-48px);  }
		60%  { transform: translateY(-72px);  }
		80%  { transform: translateY(-96px);  }
		100% { transform: translateY(0);    }
	}

	.cm-empty__pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
		max-width: 480px;
	}

	.cm-empty__pill {
		padding: 8px 16px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		color: var(--dt2);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		white-space: nowrap;
	}

	.cm-empty__pill:hover {
		background: var(--dbg3);
		border-color: var(--dbd);
		color: var(--dt);
	}

	/* ════════════════════════════════════════════════════════
	   SECTION 2 — CHAT INPUT BAR
	   Prefix: cm-input-*, cm-mention-*, cm-attach-*
	════════════════════════════════════════════════════════ */

	.cm-input-shell {
		position: relative;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 20px;
		overflow: visible;
	}

	/* Mention autocomplete */
	.cm-mention-menu {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 0;
		right: 0;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 6px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.12);
		z-index: 20;
	}

	.cm-mention-menu__header {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 4px 8px 6px;
	}

	.cm-mention-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border-radius: 12px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background 0.1s;
	}

	.cm-mention-item:hover {
		background: var(--dbg2);
	}

	.cm-mention-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--dbg3);
		color: var(--dt);
		font-size: 13px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.cm-mention-info {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.cm-mention-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}

	.cm-mention-desc {
		font-size: 12px;
		color: var(--dt3);
	}

	/* Attachment dropdown */
	.cm-attach-menu {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 8px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		padding: 6px;
		min-width: 200px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.12);
		z-index: 20;
	}

	.cm-attach-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 12px;
		border-radius: 10px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 13px;
		color: var(--dt);
		text-align: left;
		transition: background 0.1s;
	}

	.cm-attach-item:hover {
		background: var(--dbg2);
	}

	.cm-attach-icon {
		font-size: 16px;
		line-height: 1;
	}

	/* Input row */
	.cm-input-row {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		padding: 12px 12px 8px;
	}

	.cm-input-attach {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt2);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.cm-input-attach:hover,
	.cm-input-attach--active {
		background: var(--dbg3);
		color: var(--dt);
	}

	.cm-input-textarea-wrap {
		flex: 1;
		min-width: 0;
	}

	.cm-input-textarea {
		width: 100%;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 12px;
		padding: 8px 12px;
		font-size: 14px;
		color: var(--dt);
		resize: none;
		outline: none;
		min-height: 38px;
		max-height: 160px;
		line-height: 1.5;
		font-family: inherit;
		transition: border-color 0.15s;
		box-sizing: border-box;
	}

	.cm-input-textarea:focus {
		border-color: var(--dbd);
	}

	.cm-input-textarea::placeholder {
		color: var(--dt4);
	}

	.cm-input-send {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 12px;
		border: none;
		background: var(--dt);
		color: var(--dbg);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: opacity 0.15s, background 0.15s;
	}

	.cm-input-send:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.cm-input-send:not(:disabled):hover {
		opacity: 0.85;
	}

	.cm-input-stop {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 12px;
		border: none;
		background: #ef4444;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.cm-input-stop:hover {
		opacity: 0.85;
	}

	/* Status bar */
	.cm-input-status {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 16px 10px;
		font-size: 12px;
	}

	.cm-input-status-ctx,
	.cm-input-status-model {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		transition: color 0.15s;
	}

	.cm-input-status-ctx:hover,
	.cm-input-status-model:hover {
		color: var(--dt);
	}

	.cm-input-status-sep {
		color: var(--dt4);
	}

	.cm-input-status-grow {
		flex: 1;
	}

	.cm-input-status-mention {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 6px;
		padding: 2px 7px;
		font-size: 12px;
		font-weight: 700;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
	}

	.cm-input-status-mention:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.cm-input-status-hint {
		color: var(--dt4);
		font-size: 11px;
	}

	/* ════════════════════════════════════════════════════════
	   SECTION 3 — MESSAGE BUBBLES
	   Prefix: cm-chat-*, cm-msg-*, cm-thinking-*, cm-tool-*, cm-loading-*
	════════════════════════════════════════════════════════ */

	.cm-chat-area {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 20px;
	}

	.cm-msg-row {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.cm-msg-row--user {
		align-items: flex-end;
		flex-direction: row;
		justify-content: flex-end;
		gap: 6px;
	}

	.cm-msg-row--assistant {
		align-items: flex-start;
	}

	/* User bubble */
	.cm-msg-bubble--user {
		background: var(--dt);
		color: var(--dbg);
		border-radius: 20px 20px 4px 20px;
		padding: 12px 16px;
		font-size: 14px;
		line-height: 1.55;
		max-width: 75%;
	}

	/* Assistant message (no bubble) */
	.cm-msg-content {
		max-width: 85%;
	}

	.cm-msg-content__header {
		margin-bottom: 4px;
	}

	.cm-msg-content__agent {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt3);
	}

	.cm-msg-content__body {
		font-size: 14px;
		line-height: 1.65;
		color: var(--dt);
	}

	.cm-msg-content__body p {
		margin: 0 0 10px;
	}

	.cm-msg-content__body p:last-child {
		margin-bottom: 0;
	}

	/* Message actions */
	.cm-msg-actions {
		display: flex;
		gap: 4px;
		align-items: center;
	}

	.cm-msg-actions--left {
		margin-right: 4px;
		flex-shrink: 0;
	}

	.cm-msg-actions--right {
		margin-top: 8px;
	}

	.cm-msg-action-btn {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		color: var(--dt3);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
	}

	.cm-msg-action-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* Thinking panel */
	.cm-thinking {
		background: rgba(245, 158, 11, 0.06);
		border: 1px solid rgba(245, 158, 11, 0.2);
		border-radius: 14px;
		overflow: hidden;
		max-width: 85%;
	}

	.cm-thinking__header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	.cm-thinking__pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #f59e0b;
		animation: cm-pulse 1.5s ease-in-out infinite;
		flex-shrink: 0;
	}

	@keyframes cm-pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.4; transform: scale(0.8); }
	}

	.cm-thinking__label {
		font-size: 13px;
		font-weight: 600;
		color: #f59e0b;
	}

	.cm-thinking__tokens {
		font-size: 11px;
		color: var(--dt3);
		flex: 1;
	}

	.cm-thinking__chevron {
		color: var(--dt3);
		transition: transform 0.2s;
		flex-shrink: 0;
	}

	.cm-thinking__chevron--open {
		transform: rotate(180deg);
	}

	.cm-thinking__body {
		padding: 0 14px 12px;
		font-size: 13px;
		line-height: 1.6;
		color: var(--dt2);
		font-style: italic;
	}

	/* Tool call card */
	.cm-tool-card {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		cursor: pointer;
		text-align: left;
		transition: background 0.1s;
		max-width: 85%;
	}

	.cm-tool-card:hover {
		background: var(--dbg2);
	}

	.cm-tool-card__icon {
		font-size: 14px;
		flex-shrink: 0;
	}

	.cm-tool-card__name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		font-family: monospace;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cm-tool-card__status {
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		flex-shrink: 0;
	}

	.cm-tool-card__status--done {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
	}

	.cm-tool-card__chevron {
		color: var(--dt3);
		flex-shrink: 0;
		transition: transform 0.2s;
	}

	.cm-tool-card__chevron--open {
		transform: rotate(180deg);
	}

	.cm-tool-result {
		margin-top: 6px;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 10px;
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.5;
		max-width: 85%;
	}

	.cm-tool-result__label {
		font-weight: 600;
		color: var(--dt);
		margin-right: 4px;
	}

	/* Loading indicator */
	.cm-loading-indicator {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 10px 14px;
		background: var(--dbg2);
		border-radius: 14px;
		width: fit-content;
	}

	.cm-loading-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--dt3);
		animation: cm-bounce 1.2s ease-in-out infinite;
	}

	.cm-loading-dot:nth-child(2) { animation-delay: 0.2s; }
	.cm-loading-dot:nth-child(3) { animation-delay: 0.4s; }

	@keyframes cm-bounce {
		0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
		30%            { transform: translateY(-6px); opacity: 1;   }
	}

	/* ════════════════════════════════════════════════════════
	   SECTION 4 — CONVERSATION SIDEBAR
	   Prefix: cm-sidebar-*, cm-conv-*
	════════════════════════════════════════════════════════ */

	.cm-sidebar-frame {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 20px;
		overflow: hidden;
		max-width: 340px;
	}

	.cm-sidebar__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 16px 12px;
		border-bottom: 1px solid var(--dbd2);
	}

	.cm-sidebar__title {
		font-size: 15px;
		font-weight: 700;
		color: var(--dt);
	}

	.cm-sidebar__new-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 5px 12px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.cm-sidebar__new-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* Search */
	.cm-sidebar__search-wrap {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 12px 12px 0;
		padding: 8px 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 12px;
	}

	.cm-sidebar__search-icon {
		color: var(--dt3);
		flex-shrink: 0;
	}

	.cm-sidebar__search {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-size: 13px;
		color: var(--dt);
		min-width: 0;
	}

	.cm-sidebar__search::placeholder {
		color: var(--dt4);
	}

	/* Filter tabs */
	.cm-sidebar__tabs {
		display: flex;
		gap: 4px;
		padding: 10px 12px 8px;
	}

	.cm-sidebar__tab {
		padding: 4px 12px;
		border-radius: 9999px;
		border: 1px solid transparent;
		background: none;
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.cm-sidebar__tab:hover {
		background: var(--dbg2);
		color: var(--dt2);
	}

	.cm-sidebar__tab--active {
		background: var(--dbg2);
		border-color: var(--dbd);
		color: var(--dt);
	}

	/* Conversation list */
	.cm-sidebar__list {
		padding: 4px 8px 12px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		max-height: 360px;
		overflow-y: auto;
	}

	.cm-sidebar__empty {
		padding: 24px 12px;
		text-align: center;
		font-size: 13px;
		color: var(--dt4);
	}

	.cm-conv-item {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 10px 10px;
		border-radius: 12px;
		border: 1px solid transparent;
		background: none;
		text-align: left;
		cursor: pointer;
		width: 100%;
		transition: background 0.1s, border-color 0.1s;
	}

	.cm-conv-item:hover {
		background: var(--dbg2);
	}

	.cm-conv-item--selected {
		background: var(--dbg2);
		border-color: var(--dbd);
	}

	.cm-conv-item__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}

	.cm-conv-item__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
		min-width: 0;
	}

	.cm-conv-item__right {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-shrink: 0;
	}

	.cm-conv-item__pin {
		color: var(--dt3);
	}

	.cm-conv-item__badge {
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9999px;
		background: #3b82f6;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cm-conv-item__time {
		font-size: 11px;
		color: var(--dt4);
		white-space: nowrap;
	}

	.cm-conv-item__preview {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ════════════════════════════════════════════════════════
	   SECTION 5 — FOCUS MODE CARDS
	   Prefix: cm-focus-*
	════════════════════════════════════════════════════════ */

	.cm-focus-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 10px;
		margin-bottom: 20px;
	}

	.cm-focus-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		padding: 16px;
		background: var(--dbg2);
		border: 1.5px solid var(--dbd2);
		border-radius: 16px;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
	}

	.cm-focus-card:hover {
		border-color: var(--dbd);
		background: var(--dbg3);
	}

	.cm-focus-card--selected {
		border-color: var(--cm-focus-color, #3b82f6);
		background: var(--dbg2);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--cm-focus-color, #3b82f6) 15%, transparent);
	}

	.cm-focus-card__icon {
		font-size: 22px;
		line-height: 1;
	}

	.cm-focus-card__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
	}

	.cm-focus-card__desc {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.4;
	}

	/* Focus options */
	.cm-focus-opts {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 16px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 16px;
	}

	.cm-focus-opt-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.cm-focus-opt-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.cm-focus-opt-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.cm-focus-opt-pill {
		padding: 5px 12px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}

	.cm-focus-opt-pill:hover {
		background: var(--dbg3);
		color: var(--dt2);
	}

	.cm-focus-opt-pill--active {
		background: var(--dt);
		color: var(--dbg);
		border-color: var(--dt);
	}

	/* ════════════════════════════════════════════════════════
	   SECTION 6 — FEATURES OVERVIEW
	   Prefix: cm-feat-*, cm-arch-*, cm-caps-*
	════════════════════════════════════════════════════════ */

	.cm-feat-section {
		margin-bottom: 24px;
	}

	.cm-feat-label,
	.cm-arch-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
		margin-bottom: 10px;
	}

	.cm-feat-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.cm-feat-pill {
		padding: 5px 12px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 500;
	}

	/* Architecture flow */
	.cm-arch-section {
		margin-bottom: 24px;
	}

	.cm-arch-flow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
	}

	.cm-arch-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1.5px solid var(--cm-arch-color, var(--dbd));
		border-radius: 12px;
		min-width: 72px;
	}

	.cm-arch-step__icon {
		font-size: 18px;
		line-height: 1;
	}

	.cm-arch-step__label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		white-space: nowrap;
	}

	.cm-arch-arrow {
		color: var(--dt4);
		flex-shrink: 0;
	}

	/* Capabilities grid */
	.cm-caps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 12px;
	}

	.cm-cap-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 14px;
	}

	.cm-cap-item__icon {
		font-size: 20px;
		line-height: 1;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.cm-cap-item__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 4px;
	}

	.cm-cap-item__desc {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.5;
	}
</style>
