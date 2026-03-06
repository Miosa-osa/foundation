<script lang="ts">
	// ── Demo 1: Full Conversation Flow ─────────────────────────────
	// (static, no interactive state needed)

	// ── Demo 2: Message Actions Bar ────────────────────────────────
	let hoveredMsg = $state(false);
	let feedbackState = $state<'none' | 'up' | 'down'>('none');
	let copiedMsg = $state(false);

	function handleCopy() {
		copiedMsg = true;
		setTimeout(() => { copiedMsg = false; }, 1800);
	}

	// ── Demo 3: Reasoning / Thinking Panel ─────────────────────────
	let reasoningExpanded = $state(false);
	const reasoningSteps = [
		'Parse the user query and identify key constraints',
		'Search internal knowledge base for relevant patterns',
		'Consider edge cases: empty state, error boundaries, SSR',
		'Draft response structure: explanation → code → examples',
		'Verify TypeScript types are accurate and up to date',
	];

	// ── Demo 4: Multimodal Input Preview ───────────────────────────
	type AttachedImage = { id: string; label: string; bg: string };
	let attachedImages = $state<AttachedImage[]>([
		{ id: 'img1', label: 'screenshot.png', bg: 'rgba(209,233,255,0.7)' },
		{ id: 'img2', label: 'diagram.jpg',    bg: 'rgba(253,232,208,0.7)' },
	]);
	let multiInput = $state('Explain what you see in these images');

	function removeImage(id: string) {
		attachedImages = attachedImages.filter(img => img.id !== id);
	}

	// ── Demo 5: Suggested Actions / Quick Prompts ──────────────────
	type Suggestion = { id: string; icon: string; title: string; desc: string };
	const suggestions: Suggestion[] = [
		{ id: 's1', icon: 'zap', title: 'Explain this code', desc: 'Get a detailed breakdown' },
		{ id: 's2', icon: 'search', title: 'Find bugs',         desc: 'Review for common issues' },
		{ id: 's3', icon: 'sparkle', title: 'Refactor',          desc: 'Improve code quality'     },
		{ id: 's4', icon: 'edit', title: 'Write tests',       desc: 'Generate unit tests'      },
	];
	const suggestionIconSvgs: Record<string, string> = {
		zap: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
		search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
		sparkle: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"/></svg>',
		edit: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
	};
	const pillSuggestions = ['Summarize', 'Translate', 'Simplify', 'Expand', 'Fix grammar'];
	let quickInput = $state('');
	let activeSuggestion = $state('');

	function pickSuggestion(title: string) {
		quickInput = title;
		activeSuggestion = title;
		setTimeout(() => { activeSuggestion = ''; }, 1200);
	}

	// ── Demo 6: Empty State / Welcome Screen ───────────────────────
	const welcomePhrases = [
		'What can I help you with?',
		'Ask me anything.',
		"Let's build something.",
		'What are you curious about?',
	];
	let phraseIndex = $state(0);
	let welcomeInput = $state('');

	$effect(() => {
		const id = setInterval(() => {
			phraseIndex = (phraseIndex + 1) % welcomePhrases.length;
		}, 2800);
		return () => clearInterval(id);
	});

	const welcomeChips = ['Help me debug', 'Explain a concept', 'Write code', 'Review my PR', 'Draft an email', 'Brainstorm ideas'];

	// ── Demo 7: Chat with Tool Calls Inline ────────────────────────
	let toolExpanded = $state<Record<string, boolean>>({ tc1: false, tc2: false, tc3: true });

	function toggleTool(id: string) {
		toolExpanded = { ...toolExpanded, [id]: !toolExpanded[id] };
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Chat</h2>
	<p class="ds-desc">Production patterns for AI chat interfaces built with the Vercel AI SDK. Covers full conversation flows, message actions, reasoning panels, multimodal input, quick prompts, tool calls, and empty states.</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. Full Conversation Flow                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Full Conversation Flow</h3>
		<p class="ds-card__sub">User messages right-aligned with dark bubble. Assistant messages left-aligned with border. Markdown-like formatting, timestamps, and model indicator.</p>
		<div class="ac-thread">
			<div class="ac-row ac-row--user">
				<div class="ac-bubble ac-bubble--user">
					How do I implement optimistic updates with the Vercel AI SDK and SvelteKit?
				</div>
			</div>
			<div class="ac-row ac-row--assistant">
				<div class="ac-avatar" aria-hidden="true"><span class="ac-avatar__glyph">◆</span></div>
				<div class="ac-bubble-wrap">
					<div class="ac-bubble ac-bubble--assistant">
						<p>Optimistic updates with the AI SDK follow this pattern:</p>
						<p>First, append the user message to your local state <strong>before</strong> the request resolves. This makes the UI feel instant.</p>
						<pre class="ac-code"><code>const &#123; messages, append &#125; = useChat();

// Optimistically push the message
append(&#123; role: 'user', content: input &#125;);</code></pre>
						<p>The SDK handles streaming the assistant response automatically. Use <code class="ac-inline-code">onFinish</code> to sync with your database.</p>
						<ul class="ac-list">
							<li>Keep a local <code class="ac-inline-code">pendingMessages</code> array</li>
							<li>Merge with <code class="ac-inline-code">messages</code> from the hook</li>
							<li>Roll back on error with <code class="ac-inline-code">onError</code></li>
						</ul>
					</div>
					<div class="ac-meta">
						<span class="ac-meta__model">◆ Claude Opus 4</span>
						<span class="ac-meta__sep">·</span>
						<span class="ac-meta__time">2:14 PM</span>
					</div>
				</div>
			</div>
			<div class="ac-row ac-row--user">
				<div class="ac-bubble ac-bubble--user">
					What about error handling when the stream fails halfway?
				</div>
			</div>
			<div class="ac-row ac-row--assistant">
				<div class="ac-avatar" aria-hidden="true"><span class="ac-avatar__glyph">◆</span></div>
				<div class="ac-bubble-wrap">
					<div class="ac-bubble ac-bubble--assistant">
						<p>When a stream fails mid-response, the SDK exposes an <code class="ac-inline-code">error</code> state. You can show a partial message with a retry option:</p>
						<pre class="ac-code"><code>const &#123; error, reload &#125; = useChat();

if (error) return &lt;RetryButton onclick=&#123;reload&#125; /&gt;;</code></pre>
					</div>
					<div class="ac-meta">
						<span class="ac-meta__model">◆ Claude Opus 4</span>
						<span class="ac-meta__sep">·</span>
						<span class="ac-meta__time">2:15 PM</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. Message Actions Bar                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Message Actions Bar</h3>
		<p class="ds-card__sub">Hover the message to reveal a hover-reveal action bar with Copy, Regenerate, thumbs up/down, and View source.</p>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="ac-actions-demo"
			onmouseenter={() => { hoveredMsg = true; }}
			onmouseleave={() => { hoveredMsg = false; }}
		>
			<div class="ac-row ac-row--assistant">
				<div class="ac-avatar" aria-hidden="true"><span class="ac-avatar__glyph">◆</span></div>
				<div class="ac-bubble-wrap">
					<div class="ac-bubble ac-bubble--assistant">
						<p>The <code class="ac-inline-code">streamText</code> function from the AI SDK returns an async iterable. In SvelteKit, pipe it through a <code class="ac-inline-code">ReadableStream</code> in your <code class="ac-inline-code">+server.ts</code> route and the client picks it up automatically.</p>
					</div>
					<div class="ac-actions-bar" class:ac-actions-bar--visible={hoveredMsg} role="toolbar" aria-label="Message actions">
						<button
							class="ac-action-btn"
							onclick={handleCopy}
							aria-label="Copy message"
							title="Copy"
						>
							{#if copiedMsg}
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
								Copied
							{:else}
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" stroke-width="1.75"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
								Copy
							{/if}
						</button>
						<button class="ac-action-btn" aria-label="Regenerate response" title="Regenerate">
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
							Regenerate
						</button>
						<span class="ac-actions-divider" aria-hidden="true"></span>
						<button
							class="ac-action-btn ac-action-btn--icon"
							class:ac-action-btn--thumbs-up={feedbackState === 'up'}
							onclick={() => { feedbackState = feedbackState === 'up' ? 'none' : 'up'; }}
							aria-label="Thumbs up"
							aria-pressed={feedbackState === 'up'}
						>
							<svg width="13" height="13" fill={feedbackState === 'up' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
						</button>
						<button
							class="ac-action-btn ac-action-btn--icon"
							class:ac-action-btn--thumbs-down={feedbackState === 'down'}
							onclick={() => { feedbackState = feedbackState === 'down' ? 'none' : 'down'; }}
							aria-label="Thumbs down"
							aria-pressed={feedbackState === 'down'}
						>
							<svg width="13" height="13" fill={feedbackState === 'down' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
						</button>
						<span class="ac-actions-divider" aria-hidden="true"></span>
						<button class="ac-action-btn" aria-label="View message source">
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
							Source
						</button>
					</div>
				</div>
			</div>
		</div>
		<p class="ac-hint">Hover over the message to reveal actions</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. Reasoning / Thinking Panel                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Reasoning / Thinking Panel</h3>
		<p class="ds-card__sub">Expandable chain-of-thought panel with indigo accent, animated thinking dots, step count, and duration. Click to toggle.</p>
		<div class="ac-thread">
			<div class="ac-row ac-row--user">
				<div class="ac-bubble ac-bubble--user">
					Design a rate limiting strategy for a multi-tenant SaaS API
				</div>
			</div>
			<div class="ac-row ac-row--assistant">
				<div class="ac-avatar" aria-hidden="true"><span class="ac-avatar__glyph">◆</span></div>
				<div class="ac-bubble-wrap">
					<button
						class="ac-thinking"
						class:ac-thinking--expanded={reasoningExpanded}
						onclick={() => { reasoningExpanded = !reasoningExpanded; }}
						aria-expanded={reasoningExpanded}
						aria-label="Toggle reasoning steps"
					>
						<div class="ac-thinking__header">
							<span class="ac-thinking__dots-wrap" aria-hidden="true">
								{#if !reasoningExpanded}
									<span class="ac-thinking-dot"></span>
									<span class="ac-thinking-dot"></span>
									<span class="ac-thinking-dot"></span>
								{:else}
									<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
								{/if}
							</span>
							<span class="ac-thinking__label">{reasoningExpanded ? 'Reasoning' : 'Thinking'}</span>
							<span class="ac-thinking__meta">{reasoningSteps.length} steps · 1.4s</span>
							<span class="ac-thinking__chevron" class:ac-thinking__chevron--open={reasoningExpanded} aria-hidden="true">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
							</span>
						</div>
						{#if reasoningExpanded}
							<ol class="ac-thinking__steps">
								{#each reasoningSteps as step, i}
									<li class="ac-thinking__step">
										<span class="ac-thinking__step-num">{i + 1}</span>
										<span class="ac-thinking__step-text">{step}</span>
									</li>
								{/each}
							</ol>
						{/if}
					</button>
					<div class="ac-bubble ac-bubble--assistant" style="margin-top: 8px;">
						<p>A robust multi-tenant rate limiting strategy operates at three layers: <strong>per-tenant global limits</strong>, <strong>per-endpoint limits</strong>, and <strong>burst protection</strong>.</p>
						<p>Use a sliding window algorithm in Redis with the tenant ID as the key prefix. This gives you sub-millisecond checks and automatic TTL cleanup.</p>
					</div>
					<div class="ac-meta">
						<span class="ac-meta__model">◆ Claude Opus 4</span>
						<span class="ac-meta__sep">·</span>
						<span class="ac-meta__time">2.8s total</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. Multimodal Input Preview                                -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Multimodal Input Preview</h3>
		<p class="ds-card__sub">Chat input with image thumbnails, a file attachment chip, and the text area. Click × to remove attachments.</p>
		<div class="ac-composer">
			<div class="ac-composer__attachments">
				{#each attachedImages as img (img.id)}
					<div class="ac-thumb" style="--thumb-bg: {img.bg};">
						<span class="ac-thumb__icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
						<span class="ac-thumb__name">{img.label}</span>
						<button
							class="ac-thumb__remove"
							onclick={() => removeImage(img.id)}
							aria-label="Remove {img.label}"
						>
							<svg width="9" height="9" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M18 6L6 18M6 6l12 12"/></svg>
						</button>
					</div>
				{/each}
				<div class="ac-file-chip">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
					<span>report.pdf</span>
					<button class="ac-file-chip__remove" aria-label="Remove report.pdf">
						<svg width="9" height="9" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M18 6L6 18M6 6l12 12"/></svg>
					</button>
				</div>
			</div>
			<div class="ac-composer__input-row">
				<textarea
					class="ac-composer__textarea"
					bind:value={multiInput}
					rows="2"
					placeholder="Ask about your files…"
					aria-label="Chat message input"
				></textarea>
				<div class="ac-composer__btns">
					<button class="ac-composer__attach" aria-label="Attach files">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
					</button>
					<button class="ac-composer__send" aria-label="Send message" disabled={!multiInput.trim()}>
						<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
					</button>
				</div>
			</div>
		</div>
		{#if attachedImages.length === 0}
			<p class="ac-hint" style="margin-top: 8px;">All images removed — click the paperclip to attach more</p>
		{/if}
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. Suggested Actions / Quick Prompts                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Suggested Actions / Quick Prompts</h3>
		<p class="ds-card__sub">Card-style suggestions with icons, and pill-style quick prompts. Both populate the input on click.</p>
		<div class="ac-suggestions-grid">
			{#each suggestions as s}
				<button
					class="ac-suggestion-card"
					class:ac-suggestion-card--active={activeSuggestion === s.title}
					onclick={() => pickSuggestion(s.title)}
					aria-label="{s.title}: {s.desc}"
				>
					<span class="ac-suggestion-card__icon" aria-hidden="true">{@html suggestionIconSvgs[s.icon] ?? ""}</span>
					<span class="ac-suggestion-card__title">{s.title}</span>
					<span class="ac-suggestion-card__desc">{s.desc}</span>
				</button>
			{/each}
		</div>
		<div class="ac-pills-row">
			{#each pillSuggestions as pill}
				<button
					class="ac-pill"
					class:ac-pill--active={quickInput === pill}
					onclick={() => pickSuggestion(pill)}
					aria-label="Quick prompt: {pill}"
				>
					{pill}
				</button>
			{/each}
		</div>
		{#if quickInput}
			<div class="ac-quick-preview" aria-live="polite">
				<span class="ac-quick-preview__label">Input:</span>
				<span class="ac-quick-preview__value">{quickInput}</span>
				<button class="ac-quick-preview__clear" onclick={() => { quickInput = ''; }} aria-label="Clear input">×</button>
			</div>
		{/if}
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 6. Empty State / Welcome Screen                            -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Empty State / Welcome Screen</h3>
		<p class="ds-card__sub">Centered welcome with auto-rotating phrases and a grid of quick-start chips below the input.</p>
		<div class="ac-welcome">
			<div class="ac-welcome__logo" aria-hidden="true">
				<span class="ac-welcome__mark">◆</span>
			</div>
			<h3 class="ac-welcome__heading" aria-live="polite">
				{welcomePhrases[phraseIndex]}
			</h3>
			<p class="ac-welcome__sub">Powered by Claude Opus 4 · Your context is private</p>
			<input
				class="ac-welcome__input"
				type="text"
				placeholder="Type a message or choose a suggestion below…"
				bind:value={welcomeInput}
				aria-label="Welcome screen chat input"
			/>
			<ul class="ac-welcome__chips" aria-label="Quick start suggestions">
				{#each welcomeChips as chip}
					<li>
						<button
							class="ac-welcome__chip"
							onclick={() => { welcomeInput = chip; }}
							aria-label="Start with: {chip}"
						>
							{chip}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 7. Chat with Tool Calls Inline                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Chat with Tool Calls Inline</h3>
		<p class="ds-card__sub">Full chat thread with user message, three expandable tool call cards (search, analyze, synthesize), and the final assistant response. Click to expand.</p>
		<div class="ac-thread">
			<div class="ac-row ac-row--user">
				<div class="ac-bubble ac-bubble--user">
					Research the top three vector database options and compare their performance benchmarks
				</div>
			</div>
			<div class="ac-row ac-row--tools">
				<ul class="ac-tools-list" aria-label="Tool calls">
					<!-- Tool 1: Web Search -->
					<li>
					<button
						class="ac-tool-card"
						class:ac-tool-card--expanded={toolExpanded['tc1']}
						onclick={() => toggleTool('tc1')}
						aria-expanded={toolExpanded['tc1']}
						aria-label="Toggle web_search tool details"
					>
						<div class="ac-tool-card__header">
							<span class="ac-tool-card__ok" aria-hidden="true">
								<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							</span>
							<span class="ac-tool-card__icon" aria-hidden="true">
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke-width="1.75"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 21l-4.35-4.35"/></svg>
							</span>
							<span class="ac-tool-card__name">web_search</span>
							<span class="ac-tool-card__query">"vector database benchmarks 2024"</span>
							<span class="ac-tool-card__chev" class:ac-tool-card__chev--open={toolExpanded['tc1']} aria-hidden="true">
								<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
							</span>
						</div>
						{#if toolExpanded['tc1']}
							<div class="ac-tool-card__body">
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">query</span><span class="ac-tool-kv__v">"vector database benchmarks 2024"</span></div>
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">results</span><span class="ac-tool-kv__v">12 results found</span></div>
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">duration</span><span class="ac-tool-kv__v">341ms</span></div>
							</div>
						{/if}
					</button>
					</li>
					<!-- Tool 2: Analyze -->
					<li>
					<button
						class="ac-tool-card"
						class:ac-tool-card--expanded={toolExpanded['tc2']}
						onclick={() => toggleTool('tc2')}
						aria-expanded={toolExpanded['tc2']}
						aria-label="Toggle analyze_results tool details"
					>
						<div class="ac-tool-card__header">
							<span class="ac-tool-card__ok" aria-hidden="true">
								<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							</span>
							<span class="ac-tool-card__icon" aria-hidden="true">
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
							</span>
							<span class="ac-tool-card__name">analyze_results</span>
							<span class="ac-tool-card__query">Pinecone, Weaviate, Qdrant</span>
							<span class="ac-tool-card__chev" class:ac-tool-card__chev--open={toolExpanded['tc2']} aria-hidden="true">
								<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
							</span>
						</div>
						{#if toolExpanded['tc2']}
							<div class="ac-tool-card__body">
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">sources</span><span class="ac-tool-kv__v">3 databases compared</span></div>
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">metrics</span><span class="ac-tool-kv__v">QPS, latency p99, recall@10</span></div>
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">duration</span><span class="ac-tool-kv__v">89ms</span></div>
							</div>
						{/if}
					</button>
					</li>
					<!-- Tool 3: Synthesize (pre-expanded) -->
					<li>
					<button
						class="ac-tool-card"
						class:ac-tool-card--expanded={toolExpanded['tc3']}
						onclick={() => toggleTool('tc3')}
						aria-expanded={toolExpanded['tc3']}
						aria-label="Toggle synthesize tool details"
					>
						<div class="ac-tool-card__header">
							<span class="ac-tool-card__ok" aria-hidden="true">
								<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							</span>
							<span class="ac-tool-card__icon" aria-hidden="true">
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
							</span>
							<span class="ac-tool-card__name">synthesize</span>
							<span class="ac-tool-card__query">Comparison table generated</span>
							<span class="ac-tool-card__chev" class:ac-tool-card__chev--open={toolExpanded['tc3']} aria-hidden="true">
								<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
							</span>
						</div>
						{#if toolExpanded['tc3']}
							<div class="ac-tool-card__body">
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">output</span><span class="ac-tool-kv__v">Markdown comparison table</span></div>
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">rows</span><span class="ac-tool-kv__v">3 databases × 5 metrics</span></div>
								<div class="ac-tool-kv"><span class="ac-tool-kv__k">duration</span><span class="ac-tool-kv__v">56ms</span></div>
							</div>
						{/if}
					</button>
					</li>
				</ul>
			</div>
			<div class="ac-row ac-row--assistant">
				<div class="ac-avatar" aria-hidden="true"><span class="ac-avatar__glyph">◆</span></div>
				<div class="ac-bubble-wrap">
					<div class="ac-bubble ac-bubble--assistant">
						<p>Here is a comparison of the top three vector databases based on current benchmarks:</p>
						<p><strong>Pinecone</strong> leads in managed scalability with p99 latency around 12ms at 1M vectors. <strong>Qdrant</strong> offers the best recall@10 at 0.998 with its HNSW implementation. <strong>Weaviate</strong> excels at hybrid search combining vector and BM25.</p>
						<p>For most production workloads, Qdrant's self-hosted option provides the best price-performance ratio.</p>
					</div>
					<div class="ac-meta">
						<span class="ac-meta__model">◆ Claude Opus 4</span>
						<span class="ac-meta__sep">·</span>
						<span class="ac-meta__time">3 tools · 4.2s total</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 8. Pattern Reference Table                                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Pattern Reference</h3>
		<p class="ds-card__sub">AI SDK concepts and the UI patterns used to surface them in a chat interface.</p>
		<table class="ac-table" aria-label="AI chat pattern reference">
			<thead>
				<tr>
					<th class="ac-table__th">SDK Concept</th>
					<th class="ac-table__th">UI Pattern</th>
					<th class="ac-table__th">Key Detail</th>
				</tr>
			</thead>
			<tbody>
				<tr class="ac-table__row">
					<td class="ac-table__td"><code class="ac-inline-code">useChat()</code></td>
					<td class="ac-table__td">Full conversation thread</td>
					<td class="ac-table__td">User right-aligned, assistant left-aligned</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td"><code class="ac-inline-code">reload()</code></td>
					<td class="ac-table__td">Regenerate / retry button</td>
					<td class="ac-table__td">Appears in actions bar or error state</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td"><code class="ac-inline-code">experimental_attachments</code></td>
					<td class="ac-table__td">Multimodal input preview</td>
					<td class="ac-table__td">Image thumbnails with remove, file chips</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td"><code class="ac-inline-code">reasoning</code> part</td>
					<td class="ac-table__td">Thinking / reasoning panel</td>
					<td class="ac-table__td">Expandable, indigo accent, step count</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td"><code class="ac-inline-code">toolInvocations</code></td>
					<td class="ac-table__td">Inline tool call cards</td>
					<td class="ac-table__td">Expandable, status icon, key-value body</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td"><code class="ac-inline-code">append()</code></td>
					<td class="ac-table__td">Quick prompts / suggestions</td>
					<td class="ac-table__td">Cards and pills populate input on click</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td">Empty <code class="ac-inline-code">messages</code></td>
					<td class="ac-table__td">Welcome / empty state screen</td>
					<td class="ac-table__td">Rotating phrases, quick-start chip grid</td>
				</tr>
				<tr class="ac-table__row">
					<td class="ac-table__td">Feedback callback</td>
					<td class="ac-table__td">Message actions bar</td>
					<td class="ac-table__td">Hover-reveal, thumbs up/down, copy</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	/* ── Thread & rows ───────────────────────────────────────────── */
	.ac-thread {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 640px;
	}

	.ac-row {
		display: flex;
		gap: 10px;
	}

	.ac-row--user {
		justify-content: flex-end;
	}

	.ac-row--assistant {
		justify-content: flex-start;
		align-items: flex-start;
	}

	.ac-row--tools {
		padding-left: 38px;
	}

	/* ── Avatar ──────────────────────────────────────────────────── */
	.ac-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.ac-avatar--error {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
	}

	.ac-avatar__glyph {
		font-size: 11px;
		color: var(--dt3);
	}

	.ac-avatar--error .ac-avatar__glyph {
		color: #ef4444;
		font-weight: 700;
		font-size: 12px;
	}

	/* ── Bubble wrap ─────────────────────────────────────────────── */
	.ac-bubble-wrap {
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-width: 520px;
		min-width: 0;
	}

	/* ── Bubbles ─────────────────────────────────────────────────── */
	.ac-bubble {
		padding: 12px 16px;
		border-radius: 14px;
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--dt);
	}

	.ac-bubble p {
		margin: 0 0 8px;
	}

	.ac-bubble p:last-child {
		margin-bottom: 0;
	}

	.ac-bubble--user {
		background: var(--dt);
		color: #fff;
		border-radius: 14px 14px 4px 14px;
		max-width: 400px;
	}

	:global(.dark) .ac-bubble--user {
		background: #e5e5e5;
		color: #111;
	}

	.ac-bubble--assistant {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 4px 14px 14px 14px;
	}

	.ac-bubble--min {
		padding: 14px 20px;
		display: flex;
		align-items: center;
	}

	.ac-bubble--streaming {
		border-color: var(--dbd2);
	}

	.ac-bubble--error {
		border-color: rgba(239, 68, 68, 0.35);
		background: rgba(239, 68, 68, 0.04);
	}

	:global(.dark) .ac-bubble--error {
		border-color: rgba(239, 68, 68, 0.4);
		background: rgba(239, 68, 68, 0.08);
	}

	/* ── Inline code & pre ───────────────────────────────────────── */
	.ac-code {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 10px 12px;
		font-size: 12px;
		font-family: var(--bos-font-code-family, 'JetBrains Mono', monospace);
		line-height: 1.6;
		color: var(--dt2);
		overflow-x: auto;
		white-space: pre;
		margin: 8px 0;
	}

	.ac-inline-code {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 4px;
		padding: 1px 5px;
		font-size: 12px;
		font-family: var(--bos-font-code-family, monospace);
		color: var(--dt2);
	}

	.ac-list {
		margin: 6px 0 0;
		padding-left: 18px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ac-list li {
		font-size: 13.5px;
		line-height: 1.6;
	}

	/* ── Meta row ────────────────────────────────────────────────── */
	.ac-meta {
		display: flex;
		align-items: center;
		gap: 5px;
		padding-left: 4px;
	}

	.ac-meta__model {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
	}

	.ac-meta__sep {
		font-size: 11px;
		color: var(--dt4);
	}

	.ac-meta__time {
		font-size: 11px;
		color: var(--dt4);
	}

	.ac-meta__time--error {
		color: rgba(239, 68, 68, 0.65);
	}

	/* ── Pulse dot (submitted state) ─────────────────────────────── */
	.ac-pulse-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dt3);
		animation: ac-pulse 1.4s ease-in-out infinite;
	}

	@keyframes ac-pulse {
		0%, 100% { opacity: 0.3; transform: scale(0.85); }
		50%       { opacity: 1;   transform: scale(1);    }
	}

	/* ── Blinking cursor (streaming state) ───────────────────────── */
	.ac-cursor {
		display: inline-block;
		width: 2px;
		height: 14px;
		background: var(--dt2);
		border-radius: 1px;
		margin-left: 1px;
		vertical-align: text-bottom;
		animation: ac-blink 1s step-end infinite;
	}

	@keyframes ac-blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}

	/* ── Retry button ────────────────────────────────────────────── */
	.ac-retry-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 8px;
		padding: 6px 12px;
		border-radius: 8px;
		border: 1px solid rgba(239, 68, 68, 0.3);
		background: rgba(239, 68, 68, 0.06);
		color: #ef4444;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s;
		font-family: inherit;
	}

	.ac-retry-btn:hover {
		background: rgba(239, 68, 68, 0.12);
	}

	/* ── Actions bar ─────────────────────────────────────────────── */
	.ac-actions-demo {
		max-width: 640px;
	}

	.ac-actions-bar {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 2px 0;
		opacity: 0;
		transform: translateY(4px);
		transition: opacity 0.15s, transform 0.15s;
		pointer-events: none;
		flex-wrap: wrap;
	}

	.ac-actions-bar--visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.ac-action-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 9px;
		border-radius: 7px;
		border: 1px solid transparent;
		background: transparent;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		cursor: pointer;
		transition: all 0.1s;
		font-family: inherit;
	}

	.ac-action-btn:hover {
		background: var(--dbg2);
		border-color: var(--dbd);
		color: var(--dt2);
	}

	.ac-action-btn--icon {
		padding: 5px 7px;
	}

	.ac-action-btn--thumbs-up {
		color: #2563eb;
	}

	.ac-action-btn--thumbs-down {
		color: #ef4444;
	}

	.ac-actions-divider {
		display: inline-block;
		width: 1px;
		height: 16px;
		background: var(--dbd);
		margin: 0 3px;
		flex-shrink: 0;
	}

	.ac-hint {
		font-size: 11.5px;
		color: var(--dt4);
		margin: 8px 0 0;
		font-style: italic;
	}

	/* ── Thinking panel ──────────────────────────────────────────── */
	.ac-thinking {
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(124, 58, 237, 0.2);
		border-radius: 10px;
		background: rgba(124, 58, 237, 0.04);
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background 0.15s, border-color 0.15s;
		overflow: hidden;
		width: 100%;
	}

	.ac-thinking:hover {
		background: rgba(124, 58, 237, 0.07);
		border-color: rgba(124, 58, 237, 0.3);
	}

	:global(.dark) .ac-thinking {
		border-color: rgba(167, 139, 250, 0.2);
		background: rgba(167, 139, 250, 0.05);
	}

	:global(.dark) .ac-thinking:hover {
		background: rgba(167, 139, 250, 0.09);
		border-color: rgba(167, 139, 250, 0.3);
	}

	.ac-thinking__header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
	}

	.ac-thinking__dots-wrap {
		display: flex;
		align-items: center;
		gap: 3px;
		min-width: 28px;
		color: #7c3aed;
	}

	:global(.dark) .ac-thinking__dots-wrap {
		color: #a78bfa;
	}

	.ac-thinking__label {
		font-size: 12.5px;
		font-weight: 600;
		color: #7c3aed;
		flex: 1;
	}

	:global(.dark) .ac-thinking__label {
		color: #a78bfa;
	}

	.ac-thinking__meta {
		font-size: 11px;
		color: rgba(124, 58, 237, 0.55);
	}

	:global(.dark) .ac-thinking__meta {
		color: rgba(167, 139, 250, 0.55);
	}

	.ac-thinking__chevron {
		color: rgba(124, 58, 237, 0.5);
		transition: transform 0.2s;
		display: flex;
		flex-shrink: 0;
	}

	.ac-thinking__chevron--open {
		transform: rotate(180deg);
	}

	.ac-thinking__steps {
		padding: 0 14px 12px;
		margin: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 7px;
		border-top: 1px solid rgba(124, 58, 237, 0.12);
	}

	:global(.dark) .ac-thinking__steps {
		border-top-color: rgba(167, 139, 250, 0.12);
	}

	.ac-thinking__step {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding-top: 7px;
	}

	.ac-thinking__step-num {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgba(124, 58, 237, 0.1);
		color: #7c3aed;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 1px;
	}

	:global(.dark) .ac-thinking__step-num {
		background: rgba(167, 139, 250, 0.15);
		color: #a78bfa;
	}

	.ac-thinking__step-text {
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--dt2);
	}

	/* Animated thinking dots */
	.ac-thinking-dot {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		animation: ac-bounce 1.2s ease-in-out infinite;
	}

	.ac-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
	.ac-thinking-dot:nth-child(3) { animation-delay: 0.4s; }

	@keyframes ac-bounce {
		0%, 80%, 100% { transform: translateY(0);    opacity: 0.5; }
		40%           { transform: translateY(-4px); opacity: 1;   }
	}

	/* ── Composer (multimodal) ───────────────────────────────────── */
	.ac-composer {
		max-width: 560px;
		border: 1.5px solid var(--dbd2);
		border-radius: 12px;
		background: var(--dbg);
		overflow: hidden;
		transition: border-color 0.15s;
	}

	.ac-composer:focus-within {
		border-color: var(--dt3);
	}

	.ac-composer__attachments {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px 0;
		flex-wrap: wrap;
	}

	.ac-thumb {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 5px 8px 5px 7px;
		border-radius: 8px;
		background: var(--thumb-bg, var(--dbg2));
		border: 1px solid var(--dbd);
		font-size: 12px;
		color: var(--dt2);
	}

	.ac-thumb__icon {
		font-size: 13px;
		line-height: 1;
	}

	.ac-thumb__name {
		font-size: 11.5px;
		font-weight: 500;
		color: var(--dt2);
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ac-thumb__remove {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: none;
		background: rgba(0, 0, 0, 0.12);
		color: var(--dt2);
		cursor: pointer;
		padding: 0;
		transition: background 0.1s;
		flex-shrink: 0;
	}

	:global(.dark) .ac-thumb__remove {
		background: rgba(255, 255, 255, 0.14);
	}

	.ac-thumb__remove:hover {
		background: rgba(0, 0, 0, 0.22);
	}

	:global(.dark) .ac-thumb__remove:hover {
		background: rgba(255, 255, 255, 0.24);
	}

	.ac-file-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 8px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 11.5px;
		color: var(--dt2);
	}

	.ac-file-chip__remove {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		padding: 0;
		transition: color 0.1s;
	}

	.ac-file-chip__remove:hover {
		color: var(--dt);
	}

	.ac-composer__input-row {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		padding: 10px 12px;
	}

	.ac-composer__textarea {
		flex: 1;
		border: none;
		background: transparent;
		resize: none;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--dt);
		font-family: inherit;
		outline: none;
		min-height: 44px;
	}

	.ac-composer__textarea::placeholder {
		color: var(--dt4);
	}

	.ac-composer__btns {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.ac-composer__attach {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		transition: all 0.12s;
	}

	.ac-composer__attach:hover {
		background: var(--dbg2);
		color: var(--dt2);
	}

	.ac-composer__send {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: none;
		background: var(--dt);
		color: #fff;
		cursor: pointer;
		transition: opacity 0.12s;
	}

	.ac-composer__send:disabled {
		opacity: 0.28;
		cursor: default;
	}

	:global(.dark) .ac-composer__send {
		background: #e5e5e5;
		color: #111;
	}

	/* ── Suggestions ─────────────────────────────────────────────── */
	.ac-suggestions-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		max-width: 520px;
		margin-bottom: 14px;
	}

	.ac-suggestion-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
		padding: 14px 16px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: all 0.12s;
	}

	.ac-suggestion-card:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
		transform: translateY(-1px);
	}

	.ac-suggestion-card--active {
		border-color: var(--dt3);
		background: var(--dbg3);
	}

	.ac-suggestion-card__icon {
		font-size: 18px;
		line-height: 1;
	}

	.ac-suggestion-card__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		margin-top: 2px;
	}

	.ac-suggestion-card__desc {
		font-size: 12px;
		color: var(--dt3);
	}

	.ac-pills-row {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}

	.ac-pill {
		display: inline-flex;
		align-items: center;
		padding: 6px 14px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		font-size: 12.5px;
		font-weight: 500;
		color: var(--dt2);
		cursor: pointer;
		font-family: inherit;
		transition: all 0.12s;
	}

	.ac-pill:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
		color: var(--dt);
	}

	.ac-pill--active {
		background: var(--dt);
		color: #fff;
		border-color: var(--dt);
	}

	:global(.dark) .ac-pill--active {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}

	.ac-quick-preview {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 12px;
		padding: 6px 12px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 12.5px;
	}

	.ac-quick-preview__label {
		color: var(--dt3);
		font-weight: 500;
	}

	.ac-quick-preview__value {
		color: var(--dt);
		font-weight: 500;
	}

	.ac-quick-preview__clear {
		border: none;
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		font-size: 16px;
		line-height: 1;
		padding: 0 0 0 4px;
		font-family: inherit;
	}

	.ac-quick-preview__clear:hover {
		color: var(--dt);
	}

	/* ── Welcome screen ──────────────────────────────────────────── */
	.ac-welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 32px 24px 20px;
		text-align: center;
	}

	.ac-welcome__logo {
		width: 52px;
		height: 52px;
		border-radius: 16px;
		background: var(--dt);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	:global(.dark) .ac-welcome__logo {
		background: #e5e5e5;
	}

	.ac-welcome__mark {
		font-size: 22px;
		color: #fff;
	}

	:global(.dark) .ac-welcome__mark {
		color: #111;
	}

	.ac-welcome__heading {
		font-size: 22px;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0;
		color: var(--dt);
		min-height: 32px;
	}

	.ac-welcome__sub {
		font-size: 13px;
		color: var(--dt3);
		margin: -8px 0 0;
	}

	.ac-welcome__input {
		width: 100%;
		max-width: 440px;
		padding: 12px 16px;
		border-radius: 12px;
		border: 1.5px solid var(--dbd2);
		background: var(--dbg);
		font-size: 14px;
		color: var(--dt);
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s;
		box-sizing: border-box;
	}

	.ac-welcome__input:focus {
		border-color: var(--dt3);
	}

	.ac-welcome__input::placeholder {
		color: var(--dt4);
	}

	.ac-welcome__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
		max-width: 500px;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.ac-welcome__chip {
		display: inline-flex;
		align-items: center;
		padding: 7px 16px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		font-size: 12.5px;
		font-weight: 500;
		color: var(--dt2);
		cursor: pointer;
		font-family: inherit;
		transition: all 0.12s;
	}

	.ac-welcome__chip:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
		color: var(--dt);
		transform: translateY(-1px);
	}

	/* ── Tool cards (inline) ─────────────────────────────────────── */
	.ac-tools-list {
		display: flex;
		flex-direction: column;
		gap: 5px;
		max-width: 520px;
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.ac-tools-list li {
		display: contents;
	}

	.ac-tool-card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dbd);
		border-radius: 9px;
		background: var(--dbg);
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: border-color 0.12s, background 0.12s;
		overflow: hidden;
		width: 100%;
	}

	.ac-tool-card:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
	}

	.ac-tool-card__header {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 8px 12px;
	}

	.ac-tool-card__ok {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		color: #16a34a;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	:global(.dark) .ac-tool-card__ok {
		background: rgba(34, 197, 94, 0.08);
		color: #4ade80;
	}

	.ac-tool-card__icon {
		color: var(--dt3);
		display: flex;
		flex-shrink: 0;
	}

	.ac-tool-card__name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		font-family: var(--bos-font-code-family, monospace);
		flex-shrink: 0;
	}

	.ac-tool-card__query {
		font-size: 12px;
		color: var(--dt3);
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	.ac-tool-card__chev {
		color: var(--dt4);
		transition: transform 0.2s;
		flex-shrink: 0;
		display: flex;
	}

	.ac-tool-card__chev--open {
		transform: rotate(180deg);
	}

	.ac-tool-card__body {
		padding: 6px 12px 10px;
		border-top: 1px solid var(--dbd);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.ac-tool-kv {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.ac-tool-kv__k {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		font-family: var(--bos-font-code-family, monospace);
		min-width: 64px;
		flex-shrink: 0;
	}

	.ac-tool-kv__v {
		font-size: 12px;
		color: var(--dt2);
		font-family: var(--bos-font-code-family, monospace);
	}

	/* ── Reference table ─────────────────────────────────────────── */
	.ac-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}

	.ac-table__th {
		text-align: left;
		padding: 8px 12px;
		font-size: 11.5px;
		font-weight: 600;
		color: var(--dt3);
		border-bottom: 1px solid var(--dbd);
		white-space: nowrap;
	}

	.ac-table__row {
		border-bottom: 1px solid var(--dbd);
		transition: background 0.1s;
	}

	.ac-table__row:last-child {
		border-bottom: none;
	}

	.ac-table__row:hover {
		background: var(--dbg);
	}

	.ac-table__td {
		padding: 9px 12px;
		color: var(--dt2);
		vertical-align: top;
		line-height: 1.55;
	}

	.ac-table__td:first-child {
		white-space: nowrap;
	}
</style>
