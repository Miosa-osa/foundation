<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	interface Props {
		content: string;
		timestamp: string;
		onEdit?: () => void;
		onCopy?: () => void;
		onDelete?: () => void;
	}

	let { content, timestamp, onEdit, onCopy, onDelete }: Props = $props();

	let showActions = $state(false);

	function formatTime(dateStr: string) {
		return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function handleCopy() {
		navigator.clipboard.writeText(content);
		onCopy?.();
	}
</script>

<div
	class="user-msg"
	onmouseenter={() => showActions = true}
	onmouseleave={() => showActions = false}
	in:fly={{ y: 16, duration: 250 }}
>
	<div class="user-msg__container">
		{#if showActions && (onEdit || onCopy || onDelete)}
			<div class="user-msg__actions" in:fade={{ duration: 120 }}>
				{#if onEdit}
					<button onclick={onEdit} class="user-msg__action-btn" title="Edit">
						<svg class="user-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
					</button>
				{/if}
				<button onclick={handleCopy} class="user-msg__action-btn" title="Copy">
					<svg class="user-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				</button>
				{#if onDelete}
					<button onclick={onDelete} class="user-msg__action-btn user-msg__action-btn--danger" title="Delete">
						<svg class="user-msg__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				{/if}
			</div>
		{/if}

		<div class="user-msg__bubble">
			<p class="user-msg__text">{content}</p>
		</div>
		<div class="user-msg__meta">
			<span class="user-msg__time">{formatTime(timestamp)}</span>
			<svg class="user-msg__check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
			</svg>
		</div>
	</div>
</div>

<style>
	.user-msg {
		display: flex;
		justify-content: flex-end;
	}

	.user-msg__container {
		max-width: 75%;
		position: relative;
	}

	.user-msg__bubble {
		background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
		color: #fff;
		padding: 14px 18px;
		border-radius: 20px 20px 6px 20px;
		box-shadow:
			0 2px 12px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	:global(.dark) .user-msg__bubble {
		background: linear-gradient(180deg, #f5f5f7 0%, #e5e5ea 100%);
		color: #111;
		box-shadow:
			0 2px 12px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	.user-msg__text {
		font-size: 15px;
		line-height: 1.55;
		margin: 0;
		white-space: pre-wrap;
		letter-spacing: -0.01em;
	}

	.user-msg__meta {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 4px;
		margin-top: 6px;
		padding-right: 4px;
	}

	.user-msg__time {
		font-size: 11px;
		color: #aaa;
	}

	.user-msg__check {
		width: 13px;
		height: 13px;
		color: #888;
	}

	.user-msg__actions {
		position: absolute;
		top: -34px;
		right: 0;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 10px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	:global(.dark) .user-msg__actions {
		background: rgba(40, 40, 40, 0.95);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}

	.user-msg__action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		border-radius: 7px;
		cursor: pointer;
		color: #666;
		transition: all 0.15s;
	}

	.user-msg__action-btn:hover {
		background: rgba(0, 0, 0, 0.06);
		color: #111;
	}

	:global(.dark) .user-msg__action-btn { color: #999; }
	:global(.dark) .user-msg__action-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		color: #fff;
	}

	.user-msg__action-btn--danger:hover {
		background: rgba(220, 38, 38, 0.08);
		color: #dc2626;
	}

	.user-msg__action-icon {
		width: 14px;
		height: 14px;
	}
</style>
