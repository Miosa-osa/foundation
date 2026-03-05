<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	import BlockRenderer from './BlockRenderer.svelte';
	import type { Block } from '$lib/api/conversations/types';

	interface Props {
		content: string;
		blocks?: Block[];
		timestamp?: string;
		isStreaming?: boolean;
		model?: string;
		onCopy?: () => void;
		onRegenerate?: () => void;
		onFeedback?: (type: 'good' | 'bad') => void;
	}

	let { content, blocks, timestamp, isStreaming = false, model, onCopy, onRegenerate, onFeedback }: Props = $props();

	let copied = $state(false);
	let showActions = $state(false);

	function formatTime(dateStr: string) {
		return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function handleCopy() {
		navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => copied = false, 2000);
		onCopy?.();
	}

	function renderContent(text: string) {
		return text
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			.replace(/`([^`]+)`/g, '<code class="assistant-msg__inline-code">$1</code>')
			.replace(/^### (.*$)/gm, '<h3 class="assistant-msg__h3">$1</h3>')
			.replace(/^## (.*$)/gm, '<h2 class="assistant-msg__h2">$1</h2>')
			.replace(/^# (.*$)/gm, '<h1 class="assistant-msg__h1">$1</h1>')
			.replace(/^- (.*$)/gm, '<li class="assistant-msg__li">$1</li>')
			.replace(/^\d+\. (.*$)/gm, '<li class="assistant-msg__li assistant-msg__li--ordered">$1</li>');
	}
</script>

<div
	class="assistant-msg"
	onmouseenter={() => showActions = true}
	onmouseleave={() => showActions = false}
	in:fly={{ y: 16, duration: 250 }}
>
	<div class="assistant-msg__container">
		<div class="assistant-msg__header">
			<div class="assistant-msg__avatar">
				<svg class="assistant-msg__avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
				</svg>
			</div>
			<span class="assistant-msg__name">Assistant</span>
			{#if model}
				<span class="assistant-msg__model">{model}</span>
			{/if}
		</div>

		<div class="assistant-msg__bubble">
			<div class="assistant-msg__content">
				{#if blocks && blocks.length > 0}
					<BlockRenderer {blocks} {isStreaming} />
				{:else}
					{@html renderContent(content)}
					{#if isStreaming}
						<span class="assistant-msg__cursor"></span>
					{/if}
				{/if}
			</div>
		</div>

		{#if !isStreaming}
			<div class="assistant-msg__footer" class:is-visible={showActions}>
				{#if timestamp}
					<span class="assistant-msg__time">{formatTime(timestamp)}</span>
				{/if}

				<div class="assistant-msg__actions">
					<button onclick={handleCopy} class="assistant-msg__action-btn" title={copied ? 'Copied' : 'Copy'}>
						{#if copied}
							<svg class="assistant-msg__action-icon assistant-msg__action-icon--success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
							</svg>
						{:else}
							<svg class="assistant-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
						{/if}
					</button>

					{#if onRegenerate}
						<button onclick={onRegenerate} class="assistant-msg__action-btn" title="Regenerate">
							<svg class="assistant-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
						</button>
					{/if}

					{#if onFeedback}
						<div class="assistant-msg__feedback-divider"></div>
						<button onclick={() => onFeedback?.('good')} class="assistant-msg__action-btn" title="Good response">
							<svg class="assistant-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
							</svg>
						</button>
						<button onclick={() => onFeedback?.('bad')} class="assistant-msg__action-btn" title="Bad response">
							<svg class="assistant-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
							</svg>
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.assistant-msg {
		display: flex;
		justify-content: flex-start;
	}

	.assistant-msg__container {
		max-width: 85%;
	}

	.assistant-msg__header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.assistant-msg__avatar {
		width: 28px;
		height: 28px;
		border-radius: 9px;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.02) 100%);
		border: 1px solid rgba(0, 0, 0, 0.06);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.dark) .assistant-msg__avatar {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
		border-color: rgba(255, 255, 255, 0.08);
	}

	.assistant-msg__avatar-icon {
		width: 15px;
		height: 15px;
		color: #555;
	}

	:global(.dark) .assistant-msg__avatar-icon { color: #999; }

	.assistant-msg__name {
		font-size: 13px;
		font-weight: 600;
		color: #444;
	}

	:global(.dark) .assistant-msg__name { color: #ccc; }

	.assistant-msg__model {
		font-size: 11px;
		color: #999;
		background: rgba(0, 0, 0, 0.04);
		padding: 2px 8px;
		border-radius: 6px;
		font-family: var(--bos-font-code-family, monospace);
		font-weight: 500;
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	:global(.dark) .assistant-msg__model {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.06);
		color: #777;
	}

	.assistant-msg__bubble {
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.07);
		border-radius: 4px 20px 20px 20px;
		padding: 16px 20px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
	}

	:global(.dark) .assistant-msg__bubble {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.07);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
	}

	.assistant-msg__content {
		font-size: 15px;
		line-height: 1.65;
		color: #333;
		letter-spacing: -0.01em;
	}

	:global(.dark) .assistant-msg__content { color: #ddd; }

	.assistant-msg__content :global(strong) {
		font-weight: 650;
		color: #111;
	}

	:global(.dark) .assistant-msg__content :global(strong) { color: #f0f0f0; }

	.assistant-msg__content :global(em) {
		font-style: italic;
		color: #555;
	}

	:global(.dark) .assistant-msg__content :global(em) { color: #bbb; }

	.assistant-msg__content :global(.assistant-msg__inline-code) {
		background: rgba(0, 0, 0, 0.05);
		padding: 2px 6px;
		border-radius: 5px;
		font-size: 13px;
		font-family: var(--bos-font-code-family, 'SF Mono', monospace);
		font-weight: 500;
		color: #444;
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	:global(.dark) .assistant-msg__content :global(.assistant-msg__inline-code) {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.06);
		color: #ccc;
	}

	.assistant-msg__content :global(.assistant-msg__h1),
	.assistant-msg__content :global(.assistant-msg__h2),
	.assistant-msg__content :global(.assistant-msg__h3) {
		margin-top: 16px;
		margin-bottom: 8px;
		font-weight: 650;
		color: #111;
		letter-spacing: -0.02em;
	}

	:global(.dark) .assistant-msg__content :global(.assistant-msg__h1),
	:global(.dark) .assistant-msg__content :global(.assistant-msg__h2),
	:global(.dark) .assistant-msg__content :global(.assistant-msg__h3) { color: #f0f0f0; }

	.assistant-msg__content :global(.assistant-msg__h1) { font-size: 18px; }
	.assistant-msg__content :global(.assistant-msg__h2) { font-size: 16px; }
	.assistant-msg__content :global(.assistant-msg__h3) { font-size: 15px; }

	.assistant-msg__content :global(.assistant-msg__li) {
		margin-left: 16px;
		list-style: disc;
		padding-left: 4px;
	}

	.assistant-msg__content :global(.assistant-msg__li--ordered) {
		list-style: decimal;
	}

	.assistant-msg__cursor {
		display: inline-block;
		width: 2px;
		height: 18px;
		background: #666;
		animation: cursor-blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		margin-left: 2px;
		border-radius: 1px;
		vertical-align: middle;
	}

	.assistant-msg__footer {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
		padding: 0 4px;
		opacity: 0;
		transition: opacity 0.15s;
	}

	.assistant-msg__footer.is-visible {
		opacity: 1;
	}

	.assistant-msg__time {
		font-size: 11px;
		color: #bbb;
	}

	.assistant-msg__actions {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.assistant-msg__action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		border-radius: 7px;
		cursor: pointer;
		color: #999;
		transition: all 0.15s;
		padding: 0;
	}

	.assistant-msg__action-btn:hover {
		background: rgba(0, 0, 0, 0.06);
		color: #555;
	}

	:global(.dark) .assistant-msg__action-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		color: #ccc;
	}

	.assistant-msg__action-icon {
		width: 14px;
		height: 14px;
	}

	.assistant-msg__action-icon--success {
		color: #16a34a;
	}

	.assistant-msg__feedback-divider {
		width: 1px;
		height: 16px;
		background: rgba(0, 0, 0, 0.08);
		margin: 0 4px;
	}

	:global(.dark) .assistant-msg__feedback-divider {
		background: rgba(255, 255, 255, 0.08);
	}

	@keyframes cursor-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>
