<script lang="ts">
	/**
	 * ThinkingPanel Component
	 *
	 * Displays extended thinking traces with collapsible UI.
	 * Shows detailed reasoning steps, metadata, and streaming status.
	 */
	import type { ThinkingTrace as APIThinkingTrace, ThinkingStep as APIThinkingStep } from '$lib/api/thinking/types';

	// Local simplified interface for component usage
	export interface ThinkingStep {
		type: 'explore' | 'analyze' | 'synthesize' | 'conclude' | 'verify' | 'fallback' | 'understand' | 'plan' | 'reason' | 'evaluate';
		content: string;
		duration?: number;
	}

	export interface ThinkingTrace {
		id?: string;
		content?: string;
		thinking_content?: string; // API field
		steps?: ThinkingStep[];
		metadata?: {
			tokenCount?: number;
			duration?: number;
			model?: string;
		};
		thinking_tokens?: number; // API field
		model_used?: string; // API field
		duration_ms?: number; // API field
		timestamp?: number;
	}

	interface Props {
		trace: ThinkingTrace | APIThinkingTrace;
		isStreaming?: boolean;
		isExpanded?: boolean;
	}

	let { trace, isStreaming = false, isExpanded = $bindable(false) }: Props = $props();

	// Helper to get content from either format
	const getContent = $derived(() => {
		if ('content' in trace && trace.content) return trace.content;
		if ('thinking_content' in trace && trace.thinking_content) return trace.thinking_content;
		return null;
	});

	// Helper to get steps from trace
	const getSteps = $derived(() => {
		if ('steps' in trace && trace.steps) return trace.steps;
		return null;
	});

	// Toggle expanded state
	function toggle() {
		isExpanded = !isExpanded;
	}

	// Format duration for display
	function formatDuration(ms: number | undefined): string {
		if (!ms) return '';
		if (ms < 1000) return `${ms}ms`;
		return `${(ms / 1000).toFixed(1)}s`;
	}

	// Get badge color for step type — monochrome palette
	function getStepBadgeColor(type: string): string {
		const colors: Record<string, string> = {
			explore: 'bg-gray-100 text-gray-700 border-gray-200',
			analyze: 'bg-gray-100 text-gray-700 border-gray-200',
			synthesize: 'bg-gray-100 text-gray-700 border-gray-200',
			conclude: 'bg-gray-100 text-gray-700 border-gray-200',
			verify: 'bg-gray-100 text-gray-700 border-gray-200',
			understand: 'bg-gray-100 text-gray-700 border-gray-200',
			plan: 'bg-gray-100 text-gray-700 border-gray-200',
			reason: 'bg-gray-100 text-gray-700 border-gray-200',
			evaluate: 'bg-gray-100 text-gray-700 border-gray-200',
			fallback: 'bg-gray-100 text-gray-700 border-gray-200'
		};
		return colors[type] || colors.fallback;
	}

	// Estimate token count (rough approximation: 4 chars per token)
	$effect(() => {
		const content = getContent();
		if (!trace.metadata?.tokenCount && content) {
			const estimated = Math.ceil(content.length / 4);
			if (!trace.metadata) {
				(trace as any).metadata = {};
			}
			trace.metadata!.tokenCount = estimated;
		}
	});
</script>

<div class="thinking-panel">
	<!-- Header Button -->
	<button
		onclick={toggle}
		class="thinking-panel__header"
		aria-expanded={isExpanded}
		aria-label={isExpanded ? 'Collapse thinking' : 'Expand thinking'}
	>
		<!-- Chevron Icon -->
		<svg
			class="thinking-panel__chevron"
			class:is-expanded={isExpanded}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>

		<!-- Brain Icon -->
		<svg
			class="thinking-panel__icon"
			class:is-streaming={isStreaming}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
			/>
		</svg>

		<!-- Label -->
		<span class="thinking-panel__label">Thinking</span>

		<!-- Streaming Indicator -->
		{#if isStreaming}
			<span class="thinking-panel__pulse"></span>
		{/if}

		<!-- Metadata -->
		<div class="thinking-panel__meta">
			{#if trace.metadata?.tokenCount}
				<span>{trace.metadata.tokenCount} tokens</span>
			{/if}
			{#if trace.metadata?.duration && typeof trace.metadata.duration === 'number'}
				<span>{formatDuration(trace.metadata.duration)}</span>
			{/if}
			{#if trace.metadata?.model}
				<span class="thinking-panel__model">{trace.metadata.model}</span>
			{/if}
		</div>
	</button>

	<!-- Expanded Content -->
	{#if isExpanded}
		<div class="thinking-panel__content">
			<!-- Steps Display -->
			{#if getSteps() && getSteps()!.length > 0}
				<div class="thinking-panel__steps">
					{#each getSteps()! as step, index}
						<div class="thinking-panel__step">
							<div class="thinking-panel__step-header">
								<span class="thinking-panel__step-badge">
									{step.type}
								</span>
								{#if step.duration}
									<span class="thinking-panel__step-duration">
										{formatDuration(step.duration)}
									</span>
								{/if}
							</div>
							<div class="thinking-panel__step-content">
								{step.content}
							</div>
						</div>
					{/each}

					{#if isStreaming}
						<span class="thinking-panel__cursor"></span>
					{/if}
				</div>
			{:else}
				<div class="thinking-panel__raw">
					{getContent() || ''}
					{#if isStreaming}
						<span class="thinking-panel__cursor"></span>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.thinking-panel {
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.02);
	}
	:global(.dark) .thinking-panel {
		border-color: rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.03);
	}

	.thinking-panel__header {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		text-align: left;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: background-color 150ms ease;
	}
	.thinking-panel__header:hover {
		background: rgba(0, 0, 0, 0.03);
	}
	:global(.dark) .thinking-panel__header:hover {
		background: rgba(255, 255, 255, 0.04);
	}

	.thinking-panel__chevron {
		width: 14px;
		height: 14px;
		color: #888;
		transition: transform 200ms ease;
		flex-shrink: 0;
	}
	.thinking-panel__chevron.is-expanded {
		transform: rotate(90deg);
	}

	.thinking-panel__icon {
		width: 16px;
		height: 16px;
		color: #666;
		flex-shrink: 0;
	}
	.thinking-panel__icon.is-streaming {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	:global(.dark) .thinking-panel__icon { color: #999; }

	.thinking-panel__label {
		font-size: 13px;
		font-weight: 600;
		color: #444;
	}
	:global(.dark) .thinking-panel__label { color: #ccc; }

	.thinking-panel__pulse {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: #666;
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		margin-left: 2px;
	}

	.thinking-panel__meta {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 11px;
		color: #999;
	}
	.thinking-panel__model {
		font-family: var(--bos-font-code-family, monospace);
	}

	.thinking-panel__content {
		border-top: 1px solid rgba(0, 0, 0, 0.06);
		background: rgba(0, 0, 0, 0.01);
	}
	:global(.dark) .thinking-panel__content {
		border-top-color: rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
	}

	.thinking-panel__steps {
		padding: 12px 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-height: 280px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
	}
	.thinking-panel__steps::-webkit-scrollbar { width: 6px; }
	.thinking-panel__steps::-webkit-scrollbar-track { background: transparent; }
	.thinking-panel__steps::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.15);
		border-radius: 3px;
	}

	.thinking-panel__step {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.thinking-panel__step-header {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.thinking-panel__step-badge {
		display: inline-flex;
		align-items: center;
		padding: 2px 8px;
		font-size: 11px;
		font-weight: 600;
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.06);
		color: #555;
		text-transform: capitalize;
	}
	:global(.dark) .thinking-panel__step-badge {
		background: rgba(255, 255, 255, 0.08);
		color: #aaa;
	}

	.thinking-panel__step-duration {
		font-size: 11px;
		color: #999;
	}

	.thinking-panel__step-content {
		font-size: 12px;
		color: #666;
		white-space: pre-wrap;
		font-family: var(--bos-font-code-family, monospace);
		line-height: 1.6;
		padding-left: 10px;
		border-left: 2px solid rgba(0, 0, 0, 0.08);
	}
	:global(.dark) .thinking-panel__step-content {
		color: #aaa;
		border-left-color: rgba(255, 255, 255, 0.08);
	}

	.thinking-panel__raw {
		padding: 12px 16px;
		font-size: 12px;
		color: #666;
		white-space: pre-wrap;
		font-family: var(--bos-font-code-family, monospace);
		line-height: 1.6;
		max-height: 280px;
		overflow-y: auto;
	}
	:global(.dark) .thinking-panel__raw { color: #aaa; }

	.thinking-panel__cursor {
		display: inline-block;
		width: 6px;
		height: 14px;
		background: #666;
		animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		margin-left: 2px;
		border-radius: 1px;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}
</style>
