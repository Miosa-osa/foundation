<script lang="ts">
	import AssistantMessage from '$lib/components/chat/AssistantMessage.svelte';
	import UserMessage from '$lib/components/chat/UserMessage.svelte';
	import TypingIndicator from '$lib/components/chat/TypingIndicator.svelte';
	import ThinkingPanel from '$lib/components/chat/ThinkingPanel.svelte';
	import EmptyState from '$lib/components/chat/EmptyState.svelte';
	import Suggestion from '$lib/components/ai-elements/Suggestion.svelte';
	import PromptInput from '$lib/components/ai-elements/PromptInput.svelte';

	let thinkingExpanded = $state(true);
	let promptValue = $state('');

	const mockThinkingTrace = {
		id: 'trace-demo',
		content: 'Let me analyze this problem step by step...',
		steps: [
			{ type: 'understand' as const, content: 'Understanding the user\'s request for data analysis', duration: 800 },
			{ type: 'analyze' as const, content: 'Examining the dataset structure and relationships', duration: 1500 },
			{ type: 'synthesize' as const, content: 'Combining findings into actionable insights', duration: 1200 },
		],
		metadata: { tokenCount: 450, duration: 3500, model: 'claude-3-opus' }
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Chat</h2>
	<p class="ds-desc">Live interactive chat components. These are the actual Svelte components from <code>$lib/components/chat/</code> rendered with mock data.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Full Conversation Flow</h3>
		<p class="ds-card__sub">UserMessage + AssistantMessage + TypingIndicator — interactive, hover for actions</p>
		<div class="ds-chat-preview">
			<UserMessage
				content="Can you help me analyze this dataset and find trends?"
				timestamp={new Date(Date.now() - 300000).toISOString()}
				onEdit={() => console.log('edit')}
				onCopy={() => console.log('copy')}
				onDelete={() => console.log('delete')}
			/>
			<AssistantMessage
				content="I'd be happy to help analyze your dataset! Here's what I found:\n\n**Key Trends:**\n- Revenue increased by *23%* quarter-over-quarter\n- User retention improved from `72%` to `85%`\n- The highest growth segment was enterprise clients\n\nWould you like me to dive deeper into any specific area?"
				timestamp={new Date(Date.now() - 240000).toISOString()}
				model="claude-3-opus"
				onCopy={() => console.log('copy')}
				onRegenerate={() => console.log('regenerate')}
				onFeedback={(type) => console.log('feedback:', type)}
			/>
			<UserMessage
				content="Yes, show me the enterprise breakdown by quarter"
				timestamp={new Date(Date.now() - 60000).toISOString()}
				onCopy={() => console.log('copy')}
			/>
			<TypingIndicator />
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Streaming Message</h3>
		<p class="ds-card__sub">AssistantMessage with <code>isStreaming</code> prop active</p>
		<div class="ds-chat-preview">
			<AssistantMessage
				content="Based on the enterprise data, Q3 showed the strongest growth with a 34% increase in new contracts. The key drivers were..."
				timestamp={new Date().toISOString()}
				model="claude-3-opus"
				isStreaming={true}
			/>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Thinking Panel</h3>
		<p class="ds-card__sub">Chain-of-thought reasoning display — expandable/collapsible</p>
		<div style="max-width: 600px;">
			<ThinkingPanel
				trace={mockThinkingTrace}
				isStreaming={false}
				bind:isExpanded={thinkingExpanded}
			/>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Empty State</h3>
		<p class="ds-card__sub">Initial conversation placeholder with quick action chips and animated subtitles</p>
		<div class="ds-chat-empty-preview">
			<EmptyState onQuickAction={(prompt) => console.log('Quick action:', prompt)} />
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Prompt Input</h3>
		<p class="ds-card__sub">Message composition with submit/stop controls — bindable value</p>
		<div style="max-width: 600px;">
			<PromptInput
				bind:value={promptValue}
				placeholder="Ask anything..."
				onSubmit={(v) => console.log('Submit:', v)}
			/>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Suggestion Chips</h3>
		<p class="ds-card__sub">Quick-action prompts shown in empty or contextual states</p>
		<Suggestion
			suggestions={['Write a proposal', 'Analyze data', 'Plan my week', 'Debug this code', 'Brainstorm ideas']}
			onSelect={(s) => { promptValue = s; console.log('Selected:', s); }}
		/>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Component Props Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Component</th><th>Key Props</th><th>Notes</th></tr></thead>
			<tbody>
				<tr><td style="font-weight: 600;">UserMessage</td><td><code>content</code>, <code>timestamp</code>, <code>onEdit?</code>, <code>onCopy?</code>, <code>onDelete?</code></td><td>Dark bubble, right-aligned, hover actions toolbar</td></tr>
				<tr><td style="font-weight: 600;">AssistantMessage</td><td><code>content</code>, <code>blocks?</code>, <code>timestamp?</code>, <code>isStreaming?</code>, <code>model?</code>, <code>onCopy?</code>, <code>onRegenerate?</code>, <code>onFeedback?</code></td><td>Markdown rendering, copy/regen/feedback actions</td></tr>
				<tr><td style="font-weight: 600;">ThinkingPanel</td><td><code>trace</code>, <code>isStreaming?</code>, <code>isExpanded?</code> (bindable)</td><td>Expandable COT reasoning steps with metadata</td></tr>
				<tr><td style="font-weight: 600;">TypingIndicator</td><td><em>none</em></td><td>Three animated dots</td></tr>
				<tr><td style="font-weight: 600;">EmptyState</td><td><code>onQuickAction?</code></td><td>Animated subtitle rotation, quick action chips</td></tr>
				<tr><td style="font-weight: 600;">PromptInput</td><td><code>value?</code> (bindable), <code>placeholder?</code>, <code>disabled?</code>, <code>loading?</code>, <code>onSubmit?</code>, <code>onStop?</code></td><td>Auto-resize textarea, submit/stop controls</td></tr>
				<tr><td style="font-weight: 600;">Suggestion</td><td><code>suggestions</code> (string[]), <code>onSelect?</code></td><td>Horizontal chip list</td></tr>
			</tbody>
		</table>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Full Chat Component Inventory</h3>
		<p class="ds-card__sub">25 components at <code>$lib/components/chat/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['AssistantMessage','BlockRenderer','ChatInput','ContextPanel','ConversationListItem','ConversationListPanel','DocumentPreview','DocumentUploadModal','EmptyState','FeedbackPanel','FocusCard','FocusModeSelector','HybridSearchPanel','MemoryCard','MemoryDetailModal','MemoryFilters','MemoryPanel','MemoryStats','PermissionGate','ProgressPanel','RoleContextBadge','SearchResultCard','ThinkingPanel','TypingIndicator','UserMessage'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>
</section>
