<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		loading?: boolean;
		leftSlot?: Snippet;
		rightSlot?: Snippet;
		onSubmit?: (value: string) => void;
		onStop?: () => void;
		class?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Send a message...',
		disabled = false,
		loading = false,
		leftSlot,
		rightSlot,
		onSubmit,
		onStop,
		class: className = ''
	}: Props = $props();

	let textareaRef: HTMLTextAreaElement | undefined = $state(undefined);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleSubmit() {
		if (!value.trim() || disabled || loading) return;
		onSubmit?.(value);
		value = '';
		resetHeight();
	}

	function handleInput() {
		if (textareaRef) {
			textareaRef.style.height = 'auto';
			textareaRef.style.height = Math.min(textareaRef.scrollHeight, 200) + 'px';
		}
	}

	function resetHeight() {
		if (textareaRef) {
			textareaRef.style.height = 'auto';
		}
	}

	export function focus() {
		textareaRef?.focus();
	}
</script>

<div class="ai-prompt-input {className}">
	<div class="ai-prompt-input__container">
		{#if leftSlot}
			<div class="ai-prompt-input__left">
				{@render leftSlot()}
			</div>
		{/if}

		<div class="ai-prompt-input__field">
			<textarea
				bind:this={textareaRef}
				bind:value
				{placeholder}
				disabled={disabled || loading}
				rows={1}
				class="ai-prompt-input__textarea"
				onkeydown={handleKeydown}
				oninput={handleInput}
			></textarea>
		</div>

		<div class="ai-prompt-input__right">
			{#if rightSlot}
				{@render rightSlot()}
			{/if}

			{#if loading}
				<button
					type="button"
					onclick={onStop}
					class="ai-prompt-input__button ai-prompt-input__button--stop"
					aria-label="Stop generating"
				>
					<svg class="ai-prompt-input__icon" fill="currentColor" viewBox="0 0 24 24">
						<rect x="6" y="6" width="12" height="12" rx="2" />
					</svg>
				</button>
			{:else}
				<button
					type="button"
					onclick={handleSubmit}
					disabled={!value.trim() || disabled}
					class="ai-prompt-input__button ai-prompt-input__button--send"
					aria-label="Send message"
				>
					<svg class="ai-prompt-input__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
					</svg>
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.ai-prompt-input {
		width: 100%;
	}

	.ai-prompt-input__container {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		padding: 0.625rem 0.75rem;
		background-color: var(--card);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.04);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.ai-prompt-input__container:focus-within {
		border-color: rgba(0, 0, 0, 0.2);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.04);
	}

	.ai-prompt-input__left {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.ai-prompt-input__field {
		flex: 1;
		min-width: 0;
	}

	.ai-prompt-input__textarea {
		width: 100%;
		min-height: 2.75rem;
		max-height: 200px;
		padding: 0.5rem 0.75rem;
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--foreground);
		background-color: transparent;
		border: none;
		resize: none;
		outline: none;
	}

	.ai-prompt-input__textarea::placeholder {
		color: var(--muted-foreground);
	}

	.ai-prompt-input__textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.ai-prompt-input__right {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.ai-prompt-input__button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 9999px;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.ai-prompt-input__button--send {
		background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
		color: white;
		border-radius: 9999px;
	}

	.ai-prompt-input__button--send:hover:not(:disabled) {
		background: linear-gradient(180deg, #333 0%, #111 100%);
	}

	.ai-prompt-input__button--send:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.ai-prompt-input__button--stop {
		background: linear-gradient(180deg, #444 0%, #222 100%);
		color: white;
		border-radius: 9999px;
	}

	.ai-prompt-input__button--stop:hover {
		background: linear-gradient(180deg, #555 0%, #333 100%);
	}

	.ai-prompt-input__icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* Dark mode */
	:global(.dark) .ai-prompt-input__container {
		background-color: var(--card);
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .ai-prompt-input__container:focus-within {
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 0 0 3px rgb(255 255 255 / 0.05);
	}

	:global(.dark) .ai-prompt-input__button--send {
		background: linear-gradient(180deg, #f5f5f7 0%, #e5e5ea 100%);
		color: #111;
	}

	:global(.dark) .ai-prompt-input__button--send:hover:not(:disabled) {
		background: linear-gradient(180deg, #fff 0%, #f5f5f7 100%);
	}

	:global(.dark) .ai-prompt-input__button--stop {
		background: linear-gradient(180deg, #666 0%, #444 100%);
		color: #fff;
	}
</style>
