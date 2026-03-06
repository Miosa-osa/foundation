<script lang="ts">
	// ── State for Demo 1: Basic Chat Input ─────────────────────────
	let basicInput = $state('');
	let basicFocused = $state(false);

	// ── State for Demo 2: Agent Indicator ──────────────────────────
	let agentInput = $state('');

	// ── State for Demo 3: Chat Input with Actions ──────────────────
	let actionsInput = $state('');
	let isGenerating3 = $state(false);
	let actionsFocused = $state(false);

	function toggleGenerating3() {
		isGenerating3 = !isGenerating3;
	}

	// ── State for Demo 4: Model Selector ───────────────────────────
	type Model = { id: string; name: string; badge: string; icon: string };
	const models: Model[] = [
		{ id: 'claude-3-opus',   name: 'Claude 3 Opus',   badge: 'LLM',    icon: '◆' },
		{ id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', badge: 'LLM',    icon: '◇' },
		{ id: 'claude-3-haiku',  name: 'Claude 3 Haiku',  badge: 'Code',   icon: '⬡' },
		{ id: 'gpt-4o',          name: 'GPT-4o',          badge: 'Vision',  icon: '○' },
		{ id: 'gpt-4-turbo',     name: 'GPT-4 Turbo',     badge: 'LLM',    icon: '◉' },
		{ id: 'gemini-pro',      name: 'Gemini Pro',      badge: 'Vision',  icon: '◈' },
	];
	let selectedModelId = $state('claude-3-opus');
	let modelDropdownOpen = $state(false);
	let selectedModel = $derived(models.find(m => m.id === selectedModelId) ?? models[0]);

	function selectModel(id: string) {
		selectedModelId = id;
		modelDropdownOpen = false;
	}

	// ── State for Demo 5: Floating Chat Bar ────────────────────────
	let floatInput = $state('');
	let isGenerating5 = $state(false);
	let floatFocused = $state(false);

	// ── State for Demo 6: Chat Input with Tools ────────────────────
	let toolsInput = $state('');
	let toolsExpanded = $state(false);
	type Tool = { id: string; label: string; active: boolean };
	let tools: Tool[] = $state([
		{ id: 'web',   label: 'Web Search', active: true  },
		{ id: 'code',  label: 'Code',       active: false },
		{ id: 'files', label: 'Files',      active: false },
		{ id: 'image', label: 'Image Gen',  active: false },
	]);

	function toggleTool(id: string) {
		tools = tools.map(t => t.id === id ? { ...t, active: !t.active } : t);
	}

	// ── State for Demo 7: Input States ─────────────────────────────
	let typingInput = $state('Tell me about Svelte 5 runes');
	let errorInput = $state('Analyze this document and...');
	let isGeneratingState = $state(true);

	// ── State for Demo 8: Full Composer ────────────────────────────
	let composerInput = $state('');
	let composerFocused = $state(false);
	let composerModel = $state('claude-3-opus');
	let composerDropdownOpen = $state(false);
	let isGeneratingComposer = $state(false);
	let composerTools: Tool[] = $state([
		{ id: 'web',   label: 'Web Search', active: true  },
		{ id: 'code',  label: 'Code',       active: true  },
		{ id: 'files', label: 'Files',      active: false },
		{ id: 'image', label: 'Image Gen',  active: false },
	]);
	let composerToolsExpanded = $state(false);
	let composerSelectedModel = $derived(models.find(m => m.id === composerModel) ?? models[0]);

	function composerSelectModel(id: string) {
		composerModel = id;
		composerDropdownOpen = false;
	}
	function toggleComposerTool(id: string) {
		composerTools = composerTools.map(t => t.id === id ? { ...t, active: !t.active } : t);
	}
	function handleComposerSubmit() {
		if (!composerInput.trim()) return;
		isGeneratingComposer = true;
		setTimeout(() => { isGeneratingComposer = false; }, 2800);
	}

	// ── Utilities ──────────────────────────────────────────────────
	const badgeColor: Record<string, string> = {
		LLM:    'badge-llm',
		Vision: 'badge-vision',
		Code:   'badge-code',
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">Chat Input Patterns</h2>
	<p class="ds-desc">
		Floating bars, message composers, model selectors, and input variations for AI chat interfaces.
		All demos are fully interactive. These are the INPUT side — see <code>AI Chat</code> for message display.
	</p>

	<!-- ── 1. Basic Chat Input ─────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Chat Input</h3>
		<p class="ds-card__sub">Pill-shaped input bar with placeholder and send button. Type text to activate the send button.</p>
		<div class="demo-input-wrap">
			<div class="chat-bar" class:chat-bar--focused={basicFocused}>
				<input
					class="chat-bar__input"
					type="text"
					placeholder="Ask anything..."
					bind:value={basicInput}
					onfocus={() => basicFocused = true}
					onblur={() => basicFocused = false}
				/>
				<button
					class="chat-bar__send"
					class:chat-bar__send--active={basicInput.trim().length > 0}
					disabled={!basicInput.trim()}
					onclick={() => basicInput = ''}
					aria-label="Send message"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 19V5M5 12l7-7 7 7"/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ── 2. Chat Input with Agent Indicator ─────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat Input with Agent Indicator</h3>
		<p class="ds-card__sub">Top row shows the active agent — avatar, name, and status badge. Below sits the input field.</p>
		<div class="demo-input-wrap">
			<div class="agent-composer">
				<div class="agent-row">
					<div class="agent-avatar">C</div>
					<span class="agent-name">@Claude</span>
					<span class="agent-status">
						<span class="agent-status__dot"></span>
						Ready
					</span>
				</div>
				<div class="chat-bar">
					<input
						class="chat-bar__input"
						type="text"
						placeholder="Message Claude..."
						bind:value={agentInput}
					/>
					<button
						class="chat-bar__send"
						class:chat-bar__send--active={agentInput.trim().length > 0}
						disabled={!agentInput.trim()}
						onclick={() => agentInput = ''}
						aria-label="Send message"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 3. Chat Input with Actions ─────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat Input with Actions</h3>
		<p class="ds-card__sub">
			Left: <code>@</code> mention + paperclip attachment. Right: send/stop toggle based on generating state.
			Click the button to toggle states.
		</p>
		<div class="demo-input-wrap">
			<div class="chat-bar chat-bar--actions" class:chat-bar--focused={actionsFocused} class:chat-bar--generating={isGenerating3}>
				<div class="chat-bar__left-actions">
					<button class="chat-icon-btn" aria-label="Mention">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/>
						</svg>
					</button>
					<button class="chat-icon-btn" aria-label="Attach file">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
						</svg>
					</button>
				</div>
				<input
					class="chat-bar__input"
					type="text"
					placeholder="Message..."
					bind:value={actionsInput}
					onfocus={() => actionsFocused = true}
					onblur={() => actionsFocused = false}
					disabled={isGenerating3}
				/>
				<button
					class="chat-bar__send chat-bar__send--active"
					onclick={toggleGenerating3}
					aria-label={isGenerating3 ? 'Stop generation' : 'Send message'}
				>
					{#if isGenerating3}
						<!-- Stop icon -->
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<rect x="4" y="4" width="16" height="16" rx="2"/>
						</svg>
					{:else}
						<!-- Send icon -->
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7"/>
						</svg>
					{/if}
				</button>
			</div>
			<p class="demo-hint">State: <code>{isGenerating3 ? 'Generating' : 'Idle'}</code> — click the button to toggle</p>
		</div>
	</div>

	<!-- ── 4. Model Selector Dropdown ─────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Model Selector Dropdown</h3>
		<p class="ds-card__sub">Click the trigger to open a dropdown list of models with icons, names, and type badges.</p>
		<div class="demo-input-wrap" style="position: relative;">
			<div class="model-selector-wrap" style="position: relative; display: inline-block;">
				<button
					class="model-trigger"
					class:model-trigger--open={modelDropdownOpen}
					onclick={() => modelDropdownOpen = !modelDropdownOpen}
					aria-haspopup="listbox"
					aria-expanded={modelDropdownOpen}
				>
					<span class="model-trigger__icon">{selectedModel.icon}</span>
					<span class="model-trigger__name">{selectedModel.name}</span>
					<svg
						class="model-trigger__chevron"
						class:model-trigger__chevron--up={modelDropdownOpen}
						width="14" height="14" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					>
						<path d="M6 9l6 6 6-6"/>
					</svg>
				</button>

				{#if modelDropdownOpen}
					<div class="model-dropdown" role="listbox" aria-label="Select model">
						{#each models as model}
							<button
								class="model-option"
								class:model-option--selected={model.id === selectedModelId}
								onclick={() => selectModel(model.id)}
								role="option"
								aria-selected={model.id === selectedModelId}
							>
								<span class="model-option__icon">{model.icon}</span>
								<span class="model-option__name">{model.name}</span>
								<span class="model-option__badge {badgeColor[model.badge]}">{model.badge}</span>
								{#if model.id === selectedModelId}
									<svg class="model-option__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M20 6L9 17l-5-5"/>
									</svg>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 5. Floating Chat Bar ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Floating Chat Bar</h3>
		<p class="ds-card__sub">Full floating input — pill container with shadow, agent indicator row, and input + actions. The "floating over content" pattern.</p>
		<div class="demo-float-bg">
			<div class="float-bar" class:float-bar--focused={floatFocused} class:float-bar--generating={isGenerating5}>
				<div class="float-bar__agent-row">
					<div class="agent-avatar agent-avatar--sm">C</div>
					<span class="agent-name agent-name--sm">@Claude</span>
					<span class="agent-status">
						<span class="agent-status__dot"></span>
						Ready
					</span>
					<span class="float-bar__model-hint">claude-3-opus</span>
				</div>
				<div class="float-bar__input-row">
					<input
						class="float-bar__input"
						type="text"
						placeholder="Ask anything..."
						bind:value={floatInput}
						onfocus={() => floatFocused = true}
						onblur={() => floatFocused = false}
						disabled={isGenerating5}
					/>
					<button
						class="float-bar__send"
						class:float-bar__send--active={floatInput.trim().length > 0 || isGenerating5}
						onclick={() => { if (isGenerating5) { isGenerating5 = false; } else if (floatInput.trim()) { isGenerating5 = true; floatInput = ''; setTimeout(() => isGenerating5 = false, 2800); } }}
						aria-label={isGenerating5 ? 'Stop generation' : 'Send message'}
					>
						{#if isGenerating5}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<rect x="4" y="4" width="16" height="16" rx="2"/>
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 19V5M5 12l7-7 7 7"/>
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 6. Chat Input with Tools ───────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat Input with Tools</h3>
		<p class="ds-card__sub">Click <code>+ Tools</code> to expand a row of toggleable tool chips. Active tools are highlighted.</p>
		<div class="demo-input-wrap">
			<div class="tools-composer">
				{#if toolsExpanded}
					<div class="tools-row">
						{#each tools as tool}
							<button
								class="tool-chip"
								class:tool-chip--active={tool.active}
								onclick={() => toggleTool(tool.id)}
								aria-pressed={tool.active}
							>{tool.label}</button>
						{/each}
					</div>
				{/if}
				<div class="chat-bar">
					<button
						class="chat-icon-btn chat-icon-btn--tools"
						class:chat-icon-btn--tools-open={toolsExpanded}
						onclick={() => toolsExpanded = !toolsExpanded}
						aria-label="Toggle tools"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 5v14M5 12h14"/>
						</svg>
						<span>Tools</span>
					</button>
					<input
						class="chat-bar__input"
						type="text"
						placeholder="Ask anything..."
						bind:value={toolsInput}
					/>
					<button
						class="chat-bar__send"
						class:chat-bar__send--active={toolsInput.trim().length > 0}
						disabled={!toolsInput.trim()}
						onclick={() => toolsInput = ''}
						aria-label="Send message"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 7. Chat Input States ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat Input States</h3>
		<p class="ds-card__sub">All possible input states: Empty, Typing, Generating (pulsing border), Error, and Disabled.</p>
		<div class="states-grid">
			<!-- Empty -->
			<div class="state-item">
				<span class="state-label">Empty</span>
				<div class="chat-bar">
					<input class="chat-bar__input" type="text" placeholder="Ask anything..." />
					<button class="chat-bar__send" disabled aria-label="Send message">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7"/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Typing -->
			<div class="state-item">
				<span class="state-label">Typing</span>
				<div class="chat-bar chat-bar--focused">
					<input class="chat-bar__input" type="text" bind:value={typingInput} />
					<button class="chat-bar__send chat-bar__send--active" aria-label="Send message">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7"/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Generating -->
			<div class="state-item">
				<span class="state-label">Generating</span>
				<div class="chat-bar chat-bar--generating">
					<input class="chat-bar__input" type="text" placeholder="Generating response..." disabled />
					<button class="chat-bar__send chat-bar__send--active" aria-label="Stop generation">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<rect x="4" y="4" width="16" height="16" rx="2"/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Error -->
			<div class="state-item">
				<span class="state-label">Error</span>
				<div class="chat-bar chat-bar--error">
					<input class="chat-bar__input" type="text" bind:value={errorInput} />
					<button class="chat-bar__send chat-bar__send--retry" aria-label="Retry">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
						</svg>
					</button>
				</div>
				<span class="state-error-msg">Connection failed — click to retry</span>
			</div>

			<!-- Disabled -->
			<div class="state-item">
				<span class="state-label">Disabled</span>
				<div class="chat-bar chat-bar--disabled">
					<input class="chat-bar__input" type="text" placeholder="Input disabled" disabled />
					<button class="chat-bar__send" disabled aria-label="Send message">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 8. Full Chat Composer ───────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Full Chat Composer</h3>
		<p class="ds-card__sub">
			Complete composition: model selector, agent indicator, textarea with markdown hint,
			tools bar, and send/stop. The professional AI chat input pattern.
		</p>
		<div class="demo-composer-wrap">
			<div
				class="composer"
				class:composer--focused={composerFocused}
				class:composer--generating={isGeneratingComposer}
			>
				<!-- Header row: model selector + agent -->
				<div class="composer__header">
					<div class="composer-model-wrap" style="position: relative;">
						<button
							class="composer-model-trigger"
							onclick={() => composerDropdownOpen = !composerDropdownOpen}
							aria-haspopup="listbox"
							aria-expanded={composerDropdownOpen}
						>
							<span class="composer-model-trigger__icon">{composerSelectedModel.icon}</span>
							<span class="composer-model-trigger__name">{composerSelectedModel.name}</span>
							<svg
								class="composer-model-trigger__chevron"
								class:composer-model-trigger__chevron--up={composerDropdownOpen}
								width="12" height="12" viewBox="0 0 24 24" fill="none"
								stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							>
								<path d="M6 9l6 6 6-6"/>
							</svg>
						</button>

						{#if composerDropdownOpen}
							<div class="model-dropdown model-dropdown--up" role="listbox" aria-label="Select model">
								{#each models as model}
									<button
										class="model-option"
										class:model-option--selected={model.id === composerModel}
										onclick={() => composerSelectModel(model.id)}
										role="option"
										aria-selected={model.id === composerModel}
									>
										<span class="model-option__icon">{model.icon}</span>
										<span class="model-option__name">{model.name}</span>
										<span class="model-option__badge {badgeColor[model.badge]}">{model.badge}</span>
										{#if model.id === composerModel}
											<svg class="model-option__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
												<path d="M20 6L9 17l-5-5"/>
											</svg>
										{/if}
									</button>
								{/each}
							</div>
						{/if}
					</div>

					<div class="composer__header-sep"></div>

					<div class="agent-avatar agent-avatar--xs">C</div>
					<span class="agent-name agent-name--sm">@Claude</span>
					<span class="agent-status">
						<span class="agent-status__dot"></span>
						{isGeneratingComposer ? 'Generating…' : 'Ready'}
					</span>
				</div>

				<!-- Textarea -->
				<div class="composer__body">
					<textarea
						class="composer__textarea"
						placeholder="Type a message… Markdown supported"
						bind:value={composerInput}
						onfocus={() => composerFocused = true}
						onblur={() => composerFocused = false}
						disabled={isGeneratingComposer}
						rows="3"
					></textarea>
					{#if composerInput.length > 0}
						<span class="composer__md-hint">Markdown supported</span>
					{/if}
				</div>

				<!-- Tools row -->
				<div class="composer__tools-row">
					<button
						class="chat-icon-btn chat-icon-btn--tools"
						class:chat-icon-btn--tools-open={composerToolsExpanded}
						onclick={() => composerToolsExpanded = !composerToolsExpanded}
						aria-label="Toggle tools"
					>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 5v14M5 12h14"/>
						</svg>
						<span>Tools</span>
					</button>

					{#if composerToolsExpanded}
						{#each composerTools as tool}
							<button
								class="tool-chip tool-chip--sm"
								class:tool-chip--active={tool.active}
								onclick={() => toggleComposerTool(tool.id)}
								aria-pressed={tool.active}
							>{tool.label}</button>
						{/each}
					{:else}
						{#each composerTools.filter(t => t.active) as tool}
							<button
								class="tool-chip tool-chip--sm tool-chip--active"
								onclick={() => toggleComposerTool(tool.id)}
								aria-pressed={true}
							>{tool.label}</button>
						{/each}
					{/if}

					<div class="composer__tools-spacer"></div>

					<!-- Attachment button -->
					<button class="chat-icon-btn" aria-label="Attach file">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
						</svg>
					</button>

					<!-- Send / Stop -->
					<button
						class="composer__send"
						class:composer__send--active={composerInput.trim().length > 0 || isGeneratingComposer}
						onclick={isGeneratingComposer ? () => isGeneratingComposer = false : handleComposerSubmit}
						aria-label={isGeneratingComposer ? 'Stop generation' : 'Send message'}
					>
						{#if isGeneratingComposer}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
								<rect x="4" y="4" width="16" height="16" rx="2"/>
							</svg>
						{:else}
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 19V5M5 12l7-7 7 7"/>
							</svg>
						{/if}
					</button>
				</div>
			</div>

			<!-- New Chat button below -->
			<div class="composer-footer">
				<button class="new-chat-btn" onclick={() => { composerInput = ''; isGeneratingComposer = false; }}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 5v14M5 12h14"/>
					</svg>
					New Chat
				</button>
				<span class="composer-footer__hint">Type a message to start — {isGeneratingComposer ? 'generating…' : 'ready'}</span>
			</div>
		</div>
	</div>
</section>

<style>
/* ── Shared layout helpers ──────────────────────────────────── */
.demo-input-wrap {
	max-width: 560px;
}
.demo-hint {
	font-size: 12px;
	color: var(--dt3);
	margin: 8px 0 0;
}
.demo-hint code {
	font-size: 11px;
	background: var(--dbg2);
	padding: 1px 5px;
	border-radius: 4px;
	font-family: monospace;
}

/* ── Base Chat Bar ──────────────────────────────────────────── */
.chat-bar {
	display: flex;
	align-items: center;
	gap: 6px;
	background: var(--dbg);
	border: 1.5px solid var(--dbd);
	border-radius: 100px;
	padding: 6px 6px 6px 16px;
	transition: border-color 0.15s, box-shadow 0.15s;
}
.chat-bar--focused {
	border-color: var(--dbd2);
	box-shadow: 0 0 0 3px var(--dbg3);
}
.chat-bar--actions {
	padding-left: 8px;
}
.chat-bar--generating {
	border-color: var(--dbd2);
	animation: pulse-border 1.8s ease-in-out infinite;
}
.chat-bar--error {
	border-color: rgba(220, 38, 38, 0.4);
	box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.06);
}
.chat-bar--disabled {
	opacity: 0.45;
	cursor: not-allowed;
}

.chat-bar__input {
	flex: 1;
	border: none;
	background: transparent;
	outline: none;
	font-size: 14px;
	color: var(--dt);
	font-family: inherit;
	min-width: 0;
}
.chat-bar__input::placeholder {
	color: var(--dt4);
}
.chat-bar__input:disabled {
	cursor: not-allowed;
}

.chat-bar__send {
	flex-shrink: 0;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: none;
	background: var(--dbg3);
	color: var(--dt4);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.15s, color 0.15s, transform 0.1s;
}
.chat-bar__send:disabled {
	cursor: not-allowed;
}
.chat-bar__send--active {
	background: var(--dt);
	color: var(--dbg);
}
.chat-bar__send--active:hover {
	opacity: 0.85;
	transform: scale(1.04);
}
.chat-bar__send--retry {
	background: rgba(220, 38, 38, 0.12);
	color: rgba(220, 38, 38, 0.85) !important;
}
.chat-bar__send--retry:hover {
	background: rgba(220, 38, 38, 0.2);
}

/* ── Left action buttons inside bar ────────────────────────── */
.chat-bar__left-actions {
	display: flex;
	align-items: center;
	gap: 2px;
	flex-shrink: 0;
}

/* ── Generic icon button ────────────────────────────────────── */
.chat-icon-btn {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 6px 8px;
	border: none;
	background: transparent;
	color: var(--dt3);
	border-radius: 8px;
	cursor: pointer;
	font-size: 12px;
	font-family: inherit;
	font-weight: 500;
	transition: color 0.12s, background 0.12s;
	flex-shrink: 0;
}
.chat-icon-btn:hover {
	color: var(--dt2);
	background: var(--dbg2);
}
.chat-icon-btn--tools {
	border: 1.5px solid var(--dbd);
	border-radius: 20px;
	padding: 4px 10px 4px 8px;
	font-size: 12px;
}
.chat-icon-btn--tools-open {
	border-color: var(--dbd2);
	color: var(--dt);
	background: var(--dbg2);
}

/* ── Agent indicator ─────────────────────────────────────────── */
.agent-composer {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.agent-row {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 0 4px;
}
.agent-avatar {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: var(--dt);
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;
	font-weight: 700;
	flex-shrink: 0;
}
.agent-avatar--sm {
	width: 20px;
	height: 20px;
	font-size: 9px;
}
.agent-avatar--xs {
	width: 18px;
	height: 18px;
	font-size: 9px;
}
.agent-name {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt);
}
.agent-name--sm {
	font-size: 12px;
}
.agent-status {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	color: var(--dt3);
}
.agent-status__dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #22c55e;
	box-shadow: 0 0 0 2px rgba(34,197,94,0.2);
	animation: pulse-dot 2s ease-in-out infinite;
}

/* ── Model Selector ──────────────────────────────────────────── */
.model-trigger {
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 7px 12px;
	border: 1.5px solid var(--dbd);
	border-radius: 10px;
	background: var(--dbg);
	color: var(--dt);
	cursor: pointer;
	font-size: 13px;
	font-family: inherit;
	font-weight: 500;
	transition: border-color 0.15s, background 0.15s;
}
.model-trigger:hover {
	border-color: var(--dbd2);
	background: var(--dbg2);
}
.model-trigger--open {
	border-color: var(--dbd2);
	background: var(--dbg2);
}
.model-trigger__icon {
	font-size: 15px;
	color: var(--dt2);
	line-height: 1;
}
.model-trigger__name {
	font-weight: 600;
}
.model-trigger__chevron {
	color: var(--dt3);
	transition: transform 0.15s;
	flex-shrink: 0;
}
.model-trigger__chevron--up {
	transform: rotate(180deg);
}

.model-dropdown {
	position: absolute;
	top: calc(100% + 6px);
	left: 0;
	min-width: 240px;
	background: var(--dbg);
	border: 1.5px solid var(--dbd2);
	border-radius: 12px;
	padding: 5px;
	z-index: 50;
	box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
	display: flex;
	flex-direction: column;
	gap: 1px;
}
.model-dropdown--up {
	top: auto;
	bottom: calc(100% + 6px);
}
.model-option {
	display: flex;
	align-items: center;
	gap: 9px;
	padding: 8px 10px;
	border-radius: 8px;
	border: none;
	background: transparent;
	color: var(--dt2);
	cursor: pointer;
	font-size: 13px;
	font-family: inherit;
	text-align: left;
	transition: background 0.1s, color 0.1s;
}
.model-option:hover {
	background: var(--dbg3);
	color: var(--dt);
}
.model-option--selected {
	color: var(--dt);
	font-weight: 500;
}
.model-option__icon {
	font-size: 16px;
	width: 24px;
	text-align: center;
	color: var(--dt3);
	flex-shrink: 0;
}
.model-option__name {
	flex: 1;
}
.model-option__badge {
	font-size: 10px;
	font-weight: 600;
	padding: 2px 7px;
	border-radius: 20px;
	letter-spacing: 0.03em;
}
.badge-llm {
	background: var(--dbg3);
	color: var(--dt3);
}
.badge-vision {
	background: rgba(124,58,237,0.1);
	color: rgba(124,58,237,0.9);
}
.badge-code {
	background: rgba(20,184,166,0.1);
	color: rgba(20,184,166,0.9);
}
.model-option__check {
	color: var(--dt);
	flex-shrink: 0;
}

/* ── Floating Bar ─────────────────────────────────────────────── */
.demo-float-bg {
	background: var(--dbg2);
	border-radius: 16px;
	padding: 32px 24px;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	min-height: 140px;
	position: relative;
}
.float-bar {
	width: 100%;
	max-width: 520px;
	background: var(--dbg);
	border: 1.5px solid var(--dbd);
	border-radius: 20px;
	padding: 10px 10px 8px 14px;
	box-shadow:
		0 4px 16px rgba(0,0,0,0.1),
		0 1px 4px rgba(0,0,0,0.06),
		0 0 0 1px rgba(0,0,0,0.03);
	transition: border-color 0.15s, box-shadow 0.2s;
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.float-bar--focused {
	border-color: var(--dbd2);
	box-shadow:
		0 6px 24px rgba(0,0,0,0.14),
		0 2px 6px rgba(0,0,0,0.08),
		0 0 0 3px var(--dbg3);
}
.float-bar--generating {
	border-color: var(--dbd2);
	animation: pulse-border 1.8s ease-in-out infinite;
}
.float-bar__agent-row {
	display: flex;
	align-items: center;
	gap: 7px;
}
.float-bar__model-hint {
	margin-left: auto;
	font-size: 11px;
	color: var(--dt4);
	font-family: monospace;
}
.float-bar__input-row {
	display: flex;
	align-items: center;
	gap: 6px;
}
.float-bar__input {
	flex: 1;
	border: none;
	background: transparent;
	outline: none;
	font-size: 14px;
	color: var(--dt);
	font-family: inherit;
	min-width: 0;
}
.float-bar__input::placeholder {
	color: var(--dt4);
}
.float-bar__send {
	flex-shrink: 0;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: none;
	background: var(--dbg3);
	color: var(--dt4);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.15s, color 0.15s, transform 0.1s;
}
.float-bar__send--active {
	background: var(--dt);
	color: var(--dbg);
}
.float-bar__send--active:hover {
	opacity: 0.85;
	transform: scale(1.04);
}

/* ── Tools Composer ──────────────────────────────────────────── */
.tools-composer {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.tools-row {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 0 6px;
}
.tool-chip {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 4px 12px;
	border: 1.5px solid var(--dbd);
	border-radius: 20px;
	background: transparent;
	color: var(--dt3);
	font-size: 12px;
	font-family: inherit;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.12s;
}
.tool-chip:hover {
	border-color: var(--dbd2);
	color: var(--dt2);
	background: var(--dbg2);
}
.tool-chip--active {
	background: var(--dt);
	border-color: var(--dt);
	color: var(--dbg);
}
.tool-chip--active:hover {
	opacity: 0.85;
}
.tool-chip--sm {
	padding: 3px 9px;
	font-size: 11px;
}

/* ── Input States Grid ────────────────────────────────────────── */
.states-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 16px;
}
.state-item {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.state-label {
	font-size: 11px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.07em;
	color: var(--dt3);
}
.state-error-msg {
	font-size: 11px;
	color: rgba(220, 38, 38, 0.75);
}

/* ── Full Composer ────────────────────────────────────────────── */
.demo-composer-wrap {
	max-width: 580px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.composer {
	border: 1.5px solid var(--dbd);
	border-radius: 16px;
	background: var(--dbg);
	overflow: visible;
	transition: border-color 0.15s, box-shadow 0.15s;
}
.composer--focused {
	border-color: var(--dbd2);
	box-shadow: 0 0 0 3px var(--dbg3);
}
.composer--generating {
	border-color: var(--dbd2);
	animation: pulse-border 1.8s ease-in-out infinite;
}
.composer__header {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 12px 8px;
	border-bottom: 1px solid var(--dbd);
	position: relative;
}
.composer__header-sep {
	width: 1px;
	height: 14px;
	background: var(--dbd2);
	margin: 0 2px;
}
.composer__body {
	padding: 10px 14px 6px;
	position: relative;
}
.composer__textarea {
	width: 100%;
	border: none;
	background: transparent;
	outline: none;
	font-size: 14px;
	color: var(--dt);
	font-family: inherit;
	line-height: 1.6;
	resize: none;
	box-sizing: border-box;
}
.composer__textarea::placeholder {
	color: var(--dt4);
}
.composer__textarea:disabled {
	cursor: not-allowed;
	opacity: 0.6;
}
.composer__md-hint {
	display: block;
	font-size: 10px;
	color: var(--dt4);
	margin-top: 4px;
	padding-bottom: 4px;
	font-style: italic;
}
.composer__tools-row {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 10px 10px;
	border-top: 1px solid var(--dbd);
	flex-wrap: wrap;
}
.composer__tools-spacer {
	flex: 1;
}
.composer__send {
	flex-shrink: 0;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: none;
	background: var(--dbg3);
	color: var(--dt4);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.15s, color 0.15s, transform 0.1s;
}
.composer__send--active {
	background: var(--dt);
	color: var(--dbg);
}
.composer__send--active:hover {
	opacity: 0.85;
	transform: scale(1.06);
}

/* ── Composer model trigger (smaller variant) ────────────────── */
.composer-model-wrap {
	position: relative;
}
.composer-model-trigger {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 4px 9px;
	border: 1.5px solid var(--dbd);
	border-radius: 8px;
	background: transparent;
	color: var(--dt);
	cursor: pointer;
	font-size: 12px;
	font-family: inherit;
	font-weight: 500;
	transition: border-color 0.15s, background 0.15s;
}
.composer-model-trigger:hover {
	border-color: var(--dbd2);
	background: var(--dbg2);
}
.composer-model-trigger__icon {
	font-size: 13px;
	color: var(--dt3);
}
.composer-model-trigger__name {
	font-weight: 600;
	font-size: 12px;
}
.composer-model-trigger__chevron {
	color: var(--dt3);
	transition: transform 0.15s;
	flex-shrink: 0;
}
.composer-model-trigger__chevron--up {
	transform: rotate(180deg);
}

/* ── Footer below composer ───────────────────────────────────── */
.composer-footer {
	display: flex;
	align-items: center;
	gap: 12px;
}
.new-chat-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 7px 14px;
	border: 1.5px solid var(--dbd);
	border-radius: 10px;
	background: transparent;
	color: var(--dt2);
	font-size: 13px;
	font-family: inherit;
	font-weight: 500;
	cursor: pointer;
	transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.new-chat-btn:hover {
	border-color: var(--dbd2);
	background: var(--dbg2);
	color: var(--dt);
}
.composer-footer__hint {
	font-size: 12px;
	color: var(--dt4);
}

/* ── Animations ──────────────────────────────────────────────── */
@keyframes pulse-border {
	0%, 100% { box-shadow: 0 0 0 0px var(--dbg3); }
	50%       { box-shadow: 0 0 0 4px var(--dbg3); }
}

@keyframes pulse-dot {
	0%, 100% { opacity: 1; transform: scale(1); }
	50%       { opacity: 0.6; transform: scale(0.85); }
}

/* Send/active elements use var(--dt)/var(--dbg) tokens which auto-flip in dark mode */
</style>
