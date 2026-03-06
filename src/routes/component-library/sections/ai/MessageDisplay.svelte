<script lang="ts">
	let hoveredMsg = $state<string | null>(null);
	let copiedMsg = $state<string | null>(null);
	let editingUser = $state(false);
	let editText = $state('Yes, show me the enterprise breakdown by quarter');
	let thumbFeedback = $state<'up' | 'down' | null>(null);

	let streamState = $state<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
	const fullText = 'Based on the enterprise data, Q3 showed the strongest growth with a 34% increase in new contracts. The key drivers were expanded product offerings and strategic partnerships in the APAC region.';
	let streamedText = $state(fullText);
	let streamInterval: ReturnType<typeof setInterval> | null = null;

	function startStream() {
		streamState = 'submitted';
		streamedText = '';
		setTimeout(() => {
			streamState = 'streaming';
			let i = 0;
			streamInterval = setInterval(() => {
				if (i < fullText.length) {
					streamedText = fullText.slice(0, i + 3);
					i += 3;
				} else {
					streamState = 'ready';
					streamedText = fullText;
					if (streamInterval) clearInterval(streamInterval);
				}
			}, 30);
		}, 1200);
	}

	function showError() {
		streamState = 'error';
		streamedText = '';
	}

	function resetStream() {
		if (streamInterval) clearInterval(streamInterval);
		streamState = 'ready';
		streamedText = fullText;
	}

	function copyMessage(id: string) {
		copiedMsg = id;
		setTimeout(() => copiedMsg = null, 1500);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Message</h2>
	<p class="ds-desc">Chat message components — user and assistant bubbles with actions, streaming states, editing, and mixed content blocks.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">User Message</h3>
		<p class="ds-card__sub">Dark bubble, right-aligned. Hover to reveal action buttons (copy, edit, delete).</p>
		<div class="mg-chat-area">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="mg-row mg-row--user" onmouseenter={() => hoveredMsg = 'user1'} onmouseleave={() => hoveredMsg = null}>
				{#if hoveredMsg === 'user1'}
					<div class="mg-actions mg-actions--left">
						<button class="mg-action-btn" onclick={() => copyMessage('user1')} aria-label="Copy">
							{#if copiedMsg === 'user1'}
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
							{:else}
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke-width="1.75"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke-width="1.75"/></svg>
							{/if}
						</button>
						<button class="mg-action-btn" onclick={() => editingUser = true} aria-label="Edit">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
						</button>
						<button class="mg-action-btn mg-action-btn--danger" aria-label="Delete">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
						</button>
					</div>
				{/if}
				<div class="mg-bubble mg-bubble--user">Can you help me analyze this dataset and find trends?</div>
				<div class="mg-avatar mg-avatar--user">JD</div>
			</div>
			<span class="mg-timestamp mg-timestamp--right">2 min ago</span>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Assistant Message</h3>
		<p class="ds-card__sub">Light/bordered bubble with AI avatar, model badge, markdown content. Hover for actions.</p>
		<div class="mg-chat-area">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="mg-row mg-row--assistant" onmouseenter={() => hoveredMsg = 'asst1'} onmouseleave={() => hoveredMsg = null}>
				<div class="mg-avatar mg-avatar--ai">AI</div>
				<div class="mg-bubble mg-bubble--assistant">
					<p>I'd be happy to help analyze your dataset! Here's what I found:</p>
					<p><strong>Key Trends:</strong></p>
					<ul>
						<li>Revenue increased by <strong>23%</strong> quarter-over-quarter</li>
						<li>User retention improved from <code>72%</code> to <code>85%</code></li>
						<li>The highest growth segment was enterprise clients</li>
					</ul>
					<p>Would you like me to dive deeper into any specific area?</p>
				</div>
				{#if hoveredMsg === 'asst1'}
					<div class="mg-actions mg-actions--right-col">
						<button class="mg-action-btn" onclick={() => copyMessage('asst1')} aria-label="Copy">
							{#if copiedMsg === 'asst1'}
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
							{:else}
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" stroke-width="1.75"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke-width="1.75"/></svg>
							{/if}
						</button>
						<button class="mg-action-btn" aria-label="Regenerate">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
						</button>
						<button class="mg-action-btn" class:mg-action-btn--active-up={thumbFeedback === 'up'} onclick={() => thumbFeedback = thumbFeedback === 'up' ? null : 'up'} aria-label="Thumbs up">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
						</button>
						<button class="mg-action-btn" class:mg-action-btn--active-down={thumbFeedback === 'down'} onclick={() => thumbFeedback = thumbFeedback === 'down' ? null : 'down'} aria-label="Thumbs down">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10zM17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
						</button>
					</div>
				{/if}
			</div>
			<div class="mg-meta">
				<span class="mg-model-badge">claude-3-opus</span>
				<span class="mg-timestamp">1 min ago</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Streaming States</h3>
		<p class="ds-card__sub">Four message states: submitted (thinking), streaming (partial text + cursor), ready (complete), error (retry).</p>
		<div class="mg-state-controls">
			<button class="mg-ctrl-btn" class:mg-ctrl-btn--active={streamState === 'ready'} onclick={resetStream}>Ready</button>
			<button class="mg-ctrl-btn" onclick={startStream}>Start Stream</button>
			<button class="mg-ctrl-btn" class:mg-ctrl-btn--active={streamState === 'error'} onclick={showError}>Error</button>
		</div>
		<div class="mg-stream-demo">
			<div class="mg-row mg-row--assistant">
				<div class="mg-avatar mg-avatar--ai">AI</div>
				{#if streamState === 'submitted'}
					<div class="mg-bubble mg-bubble--assistant mg-bubble--thinking">
						<div class="mg-thinking-dots"><span></span><span></span><span></span></div>
					</div>
				{:else if streamState === 'streaming'}
					<div class="mg-bubble mg-bubble--assistant mg-bubble--streaming">
						<p>{streamedText}<span class="mg-cursor"></span></p>
					</div>
				{:else if streamState === 'error'}
					<div class="mg-bubble mg-bubble--assistant mg-bubble--error">
						<p class="mg-error-text">Connection failed. Unable to generate response.</p>
						<button class="mg-retry-btn" onclick={startStream}>
							<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
							Retry
						</button>
					</div>
				{:else}
					<div class="mg-bubble mg-bubble--assistant"><p>{streamedText}</p></div>
				{/if}
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Message Editing</h3>
		<p class="ds-card__sub">User message in edit mode — bubble becomes textarea with save/cancel.</p>
		<div class="mg-edit-toggle">
			<button class="mg-ctrl-btn" class:mg-ctrl-btn--active={!editingUser} onclick={() => editingUser = false}>Read-only</button>
			<button class="mg-ctrl-btn" class:mg-ctrl-btn--active={editingUser} onclick={() => editingUser = true}>Editing</button>
		</div>
		<div class="mg-chat-area">
			<div class="mg-row mg-row--user">
				{#if editingUser}
					<div class="mg-edit-wrap">
						<textarea class="mg-edit-textarea" bind:value={editText} rows="2"></textarea>
						<div class="mg-edit-actions">
							<button class="mg-edit-btn mg-edit-btn--save" onclick={() => editingUser = false}>Save & Resubmit</button>
							<button class="mg-edit-btn mg-edit-btn--cancel" onclick={() => editingUser = false}>Cancel</button>
						</div>
					</div>
				{:else}
					<div class="mg-bubble mg-bubble--user">{editText}</div>
				{/if}
				<div class="mg-avatar mg-avatar--user">JD</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Message with Mixed Content Blocks</h3>
		<p class="ds-card__sub">Assistant message with text, code block, and data table in one response.</p>
		<div class="mg-chat-area">
			<div class="mg-row mg-row--assistant">
				<div class="mg-avatar mg-avatar--ai">AI</div>
				<div class="mg-bubble mg-bubble--assistant mg-bubble--wide">
					<p>Here's a function to aggregate the data:</p>
					<div class="mg-code-block">
						<div class="mg-code-header">
							<span class="mg-code-lang">TS</span>
							<span class="mg-code-file">aggregate.ts</span>
						</div>
						<pre class="mg-code-body"><span class="mg-kw">async function</span> <span class="mg-fn">aggregate</span>(data: <span class="mg-tp">Record[]</span>) {'{'}
  <span class="mg-kw">const</span> grouped = data.<span class="mg-fn">reduce</span>((acc, r) => {'{'}
    acc[r.category] ??= [];
    acc[r.category].<span class="mg-fn">push</span>(r.value);
    <span class="mg-kw">return</span> acc;
  {'}'}, {'{}' } <span class="mg-kw">as</span> <span class="mg-tp">Record&lt;string, number[]&gt;</span>);
  <span class="mg-kw">return</span> grouped;
{'}'}</pre>
					</div>
					<p>The output would look like:</p>
					<div class="mg-data-table">
						<div class="mg-data-row mg-data-row--header"><span>Category</span><span>Count</span><span>Avg Value</span></div>
						<div class="mg-data-row"><span>Enterprise</span><span>142</span><span style="color: #22c55e;">$4,280</span></div>
						<div class="mg-data-row"><span>SMB</span><span>387</span><span style="color: #22c55e;">$1,120</span></div>
						<div class="mg-data-row"><span>Consumer</span><span>1,204</span><span>$89</span></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Full Conversation Thread</h3>
		<p class="ds-card__sub">Multi-turn conversation with typing indicator at the end.</p>
		<div class="mg-chat-area mg-chat-area--thread">
			<div class="mg-row mg-row--user">
				<div class="mg-bubble mg-bubble--user">What's the best way to handle auth in SvelteKit?</div>
				<div class="mg-avatar mg-avatar--user">JD</div>
			</div>
			<div class="mg-row mg-row--assistant">
				<div class="mg-avatar mg-avatar--ai">AI</div>
				<div class="mg-bubble mg-bubble--assistant">
					<p>For SvelteKit auth, I recommend using <strong>hooks</strong> with <code>handle</code> in <code>hooks.server.ts</code>:</p>
					<ul>
						<li>Session validation in the <code>handle</code> hook</li>
						<li>Protected routes via <code>+layout.server.ts</code></li>
						<li>Form actions for login/logout</li>
					</ul>
				</div>
			</div>
			<div class="mg-row mg-row--user">
				<div class="mg-bubble mg-bubble--user">Can you show me a code example?</div>
				<div class="mg-avatar mg-avatar--user">JD</div>
			</div>
			<div class="mg-row mg-row--assistant">
				<div class="mg-avatar mg-avatar--ai">AI</div>
				<div class="mg-bubble mg-bubble--assistant mg-bubble--thinking">
					<div class="mg-thinking-dots"><span></span><span></span><span></span></div>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Message Patterns Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Pattern</th><th>Variants</th><th>Purpose</th></tr></thead>
			<tbody>
				<tr><td style="font-weight: 600;">User Message</td><td>Default, with hover actions (copy/edit/delete)</td><td>Right-aligned dark bubble for user input</td></tr>
				<tr><td style="font-weight: 600;">Assistant Message</td><td>Default, with model badge + actions</td><td>Left-aligned bordered bubble for AI responses</td></tr>
				<tr><td style="font-weight: 600;">Streaming States</td><td>Submitted, Streaming, Ready, Error</td><td>Real-time response generation display</td></tr>
				<tr><td style="font-weight: 600;">Message Editing</td><td>Read-only → textarea with save/cancel</td><td>Edit and resubmit user messages</td></tr>
				<tr><td style="font-weight: 600;">Mixed Content</td><td>Text + code + data tables</td><td>Rich multi-block assistant responses</td></tr>
				<tr><td style="font-weight: 600;">Conversation</td><td>Multi-turn with typing indicator</td><td>Full chat thread composition</td></tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	.mg-chat-area { display: flex; flex-direction: column; gap: 4px; max-width: 600px; }
	.mg-chat-area--thread { background: var(--dbg); border: 1px solid var(--dbd); border-radius: 14px; padding: 16px; gap: 10px; }
	.mg-row { display: flex; align-items: flex-start; gap: 8px; position: relative; }
	.mg-row--user { justify-content: flex-end; }
	.mg-row--assistant { justify-content: flex-start; }
	.mg-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
	.mg-avatar--user { background: #1a1a2e; color: #f0f0f5; }
	.mg-avatar--ai { background: #7c3aed; color: white; }
	.mg-bubble { padding: 10px 14px; border-radius: 14px; font-size: 13.5px; line-height: 1.55; max-width: 75%; }
	.mg-bubble--user { background: #1a1a2e; color: #f0f0f5; border-bottom-right-radius: 4px; font-weight: 500; }
	:global(.dark) .mg-bubble--user { background: rgba(255,255,255,0.9); color: #111; }
	.mg-bubble--assistant { background: var(--dbg2); border: 1px solid var(--dbd); color: var(--dt2); border-bottom-left-radius: 4px; }
	.mg-bubble--wide { max-width: 90%; }
	.mg-bubble p { margin: 0 0 8px; }
	.mg-bubble p:last-child { margin-bottom: 0; }
	.mg-bubble strong { color: var(--dt); font-weight: 600; }
	.mg-bubble code { font-family: 'SF Mono','Fira Code',monospace; font-size: 11.5px; background: var(--dbg3); padding: 1px 5px; border-radius: 3px; }
	.mg-bubble ul { margin: 4px 0 8px; padding-left: 18px; }
	.mg-bubble li { margin-bottom: 2px; font-size: 13px; }
	.mg-bubble--thinking { padding: 12px 16px; min-width: 60px; }
	.mg-bubble--streaming { border-color: var(--dbd2); }
	.mg-bubble--streaming p { margin: 0; }
	.mg-bubble--error { border-color: rgba(220,38,38,0.3); background: rgba(220,38,38,0.04); }
	.mg-thinking-dots { display: flex; gap: 4px; align-items: center; }
	.mg-thinking-dots span { width: 6px; height: 6px; border-radius: 50%; background: var(--dt3); animation: mg-bounce 1.4s ease-in-out infinite; }
	.mg-thinking-dots span:nth-child(2) { animation-delay: 0.16s; }
	.mg-thinking-dots span:nth-child(3) { animation-delay: 0.32s; }
	.mg-cursor { display: inline-block; width: 2px; height: 14px; background: var(--dt2); margin-left: 1px; vertical-align: text-bottom; animation: mg-blink 0.8s step-end infinite; }
	.mg-error-text { color: rgba(220,38,38,0.8); font-size: 13px; margin: 0 0 8px !important; }
	.mg-retry-btn { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border: 1.5px solid rgba(220,38,38,0.3); border-radius: 8px; background: transparent; color: rgba(220,38,38,0.8); font-size: 12px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.mg-retry-btn:hover { background: rgba(220,38,38,0.06); border-color: rgba(220,38,38,0.5); }
	.mg-actions { display: flex; gap: 2px; flex-shrink: 0; }
	.mg-actions--left { align-self: center; }
	.mg-actions--right-col { flex-direction: column; align-self: flex-start; margin-top: 2px; }
	.mg-action-btn { width: 28px; height: 28px; border-radius: 7px; border: 1px solid var(--dbd); background: var(--dbg); color: var(--dt3); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.12s; }
	.mg-action-btn:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.mg-action-btn--danger:hover { color: #ef4444; border-color: rgba(239,68,68,0.3); }
	.mg-action-btn--active-up { color: #22c55e !important; border-color: rgba(34,197,94,0.3) !important; background: rgba(34,197,94,0.06) !important; }
	.mg-action-btn--active-down { color: #ef4444 !important; border-color: rgba(239,68,68,0.3) !important; background: rgba(239,68,68,0.06) !important; }
	.mg-timestamp { font-size: 11px; color: var(--dt4); padding: 2px 4px; }
	.mg-timestamp--right { text-align: right; }
	.mg-meta { display: flex; align-items: center; gap: 8px; padding: 2px 0 0 36px; }
	.mg-model-badge { font-size: 10px; font-family: 'SF Mono','Fira Code',monospace; padding: 2px 7px; border-radius: 4px; background: var(--dbg2); border: 1px solid var(--dbd); color: var(--dt3); }
	.mg-state-controls, .mg-edit-toggle { display: flex; gap: 4px; margin-bottom: 14px; }
	.mg-ctrl-btn { padding: 5px 14px; border: 1.5px solid var(--dbd); border-radius: 8px; background: transparent; color: var(--dt3); font-size: 12px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.mg-ctrl-btn:hover { border-color: var(--dbd2); color: var(--dt2); }
	.mg-ctrl-btn--active { background: var(--dt); border-color: var(--dt); color: #fff !important; }
	.mg-stream-demo { max-width: 520px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 12px; padding: 14px; }
	.mg-edit-wrap { display: flex; flex-direction: column; gap: 6px; max-width: 75%; }
	.mg-edit-textarea { width: 100%; border: 1.5px solid var(--dbd2); border-radius: 10px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 10px 12px; resize: none; outline: none; box-sizing: border-box; line-height: 1.5; }
	.mg-edit-textarea:focus { border-color: var(--dt3); box-shadow: 0 0 0 3px var(--dbg3); }
	.mg-edit-actions { display: flex; gap: 6px; justify-content: flex-end; }
	.mg-edit-btn { padding: 5px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.12s; border: none; }
	.mg-edit-btn--save { background: var(--dt); color: #fff; }
	.mg-edit-btn--save:hover { opacity: 0.85; }
	.mg-edit-btn--cancel { background: transparent; color: var(--dt3); border: 1.5px solid var(--dbd); }
	.mg-edit-btn--cancel:hover { border-color: var(--dbd2); color: var(--dt2); }
	.mg-code-block { border: 1px solid var(--dbd); border-radius: 8px; overflow: hidden; margin: 8px 0; }
	.mg-code-header { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--dbg3); border-bottom: 1px solid var(--dbd); }
	.mg-code-lang { font-size: 10px; font-weight: 600; padding: 1px 5px; border-radius: 3px; background: rgba(59,130,246,0.1); color: #3b82f6; }
	.mg-code-file { font-size: 11px; color: var(--dt3); font-family: 'SF Mono','Fira Code',monospace; }
	.mg-code-body { margin: 0; padding: 10px 12px; font-size: 12px; line-height: 1.65; font-family: 'SF Mono','Fira Code',monospace; color: var(--dt2); overflow-x: auto; white-space: pre; background: var(--dbg); }
	.mg-kw { color: #c678dd; }
	.mg-fn { color: #61afef; }
	.mg-tp { color: #e5c07b; }
	.mg-data-table { border: 1px solid var(--dbd); border-radius: 8px; overflow: hidden; margin: 8px 0; }
	.mg-data-row { display: grid; grid-template-columns: 1fr 80px 100px; padding: 7px 12px; font-size: 12.5px; border-bottom: 1px solid var(--dbd); }
	.mg-data-row:last-child { border-bottom: none; }
	.mg-data-row--header { background: var(--dbg3); font-weight: 600; color: var(--dt3); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
	@keyframes mg-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
	@keyframes mg-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .mg-ctrl-btn--active { background: #e5e5e5; border-color: #e5e5e5; color: #111 !important; }
	:global(.dark) .mg-edit-btn--save { background: #e5e5e5; color: #111; }
</style>
