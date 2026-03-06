<script lang="ts">
	import AssistantMessage from '$lib/components/chat/AssistantMessage.svelte';
	import UserMessage from '$lib/components/chat/UserMessage.svelte';
	import TypingIndicator from '$lib/components/chat/TypingIndicator.svelte';
</script>

<section class="ds-section">
	<h2 class="ds-title">Messages</h2>
	<p class="ds-desc">Chat message bubbles using actual Svelte components with hover actions and timestamps.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Live Conversation</h3>
		<p class="ds-card__sub">UserMessage + AssistantMessage — hover for action toolbar</p>
		<div class="ds-chat-preview">
			<UserMessage
				content="Can you help me with this project?"
				timestamp={new Date(Date.now() - 120000).toISOString()}
				onEdit={() => console.log('edit')}
				onCopy={() => console.log('copy')}
				onDelete={() => console.log('delete')}
			/>
			<AssistantMessage
				content="Of course! I'd be happy to help. What would you like to work on today?\n\nI can assist with:\n- **Code reviews** and debugging\n- **Architecture** planning\n- **Writing tests** and documentation"
				timestamp={new Date(Date.now() - 60000).toISOString()}
				model="claude-3-opus"
				onCopy={() => console.log('copy')}
				onRegenerate={() => console.log('regenerate')}
				onFeedback={(type) => console.log('feedback:', type)}
			/>
			<UserMessage
				content="Let's build the notification system"
				timestamp={new Date().toISOString()}
				onCopy={() => console.log('copy')}
			/>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">CSS Message Bubbles</h3>
		<p class="ds-card__sub">Raw <code>.message-bubble</code> CSS classes for lightweight use</p>
		<div style="max-width: 440px; display: flex; flex-direction: column; gap: 10px;">
			<div class="message-bubble message-bubble-user" style="padding: 12px 16px; border-radius: 18px 18px 4px 18px; max-width: 300px; align-self: flex-end; font-size: 14px;">
				Hello, how are you?
			</div>
			<div class="message-bubble message-bubble-assistant" style="padding: 12px 16px; border-radius: 18px 18px 18px 4px; max-width: 340px; font-size: 14px;">
				I'm doing great! How can I help you today?
			</div>
			<div class="message-bubble message-bubble-user" style="padding: 12px 16px; border-radius: 18px 18px 4px 18px; max-width: 300px; align-self: flex-end; font-size: 14px;">
				Can you review my PR?
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Typing Indicator</h3>
		<p class="ds-card__sub">Animated dots shown while AI is generating</p>
		<div style="max-width: 440px;">
			<TypingIndicator />
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Message Anatomy</h3>
		<table class="ds-table">
			<thead><tr><th>Element</th><th>Class / Component</th><th>Details</th></tr></thead>
			<tbody>
				<tr><td>User Bubble</td><td><code>UserMessage</code></td><td>Dark bg, right-aligned, rounded-tr-md. Props: content, timestamp, onEdit?, onCopy?, onDelete?</td></tr>
				<tr><td>Assistant Bubble</td><td><code>AssistantMessage</code></td><td>Light bg, left-aligned. Props: content, blocks?, timestamp?, isStreaming?, model?, onCopy?, onRegenerate?, onFeedback?</td></tr>
				<tr><td>Typing</td><td><code>TypingIndicator</code></td><td>Three animated dots, no props</td></tr>
				<tr><td>CSS User</td><td><code>.message-bubble-user</code></td><td>Gradient bg, white text</td></tr>
				<tr><td>CSS Assistant</td><td><code>.message-bubble-assistant</code></td><td>Light bg, dark text</td></tr>
			</tbody>
		</table>
	</div>
</section>
