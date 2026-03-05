<script lang="ts">
	import UserMessage from '$lib/components/chat/UserMessage.svelte';
	import CodeBlock from '$lib/components/ai-elements/CodeBlock.svelte';
	import Loader from '$lib/components/ai-elements/Loader.svelte';
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Elements</h2>
	<p class="ds-desc">Reusable primitives for AI interactions. Live demos from <code>$lib/components/ai-elements/</code>.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Code Block</h3>
		<p class="ds-card__sub">Syntax-highlighted code with filename header and copy button</p>
		<div style="max-width: 600px; display: flex; flex-direction: column; gap: 16px;">
			<CodeBlock
				code={`async function analyzeData(dataset: Dataset) {\n  const trends = await findTrends(dataset);\n  const insights = trends.filter(t => t.confidence > 0.85);\n  \n  return {\n    summary: generateSummary(insights),\n    recommendations: insights.map(i => i.action),\n    confidence: avgConfidence(insights)\n  };\n}`}
				language="typescript"
				filename="analysis.ts"
			/>
			<CodeBlock
				code={`SELECT u.name, COUNT(o.id) as total_orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE u.created_at > NOW() - INTERVAL '30 days'\nGROUP BY u.name\nORDER BY total_orders DESC\nLIMIT 10;`}
				language="sql"
				filename="top-users.sql"
			/>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">AI Loader Variants</h3>
		<p class="ds-card__sub">Three animation styles: dots, spinner, shimmer</p>
		<div class="ds-demo" style="gap: 48px;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="height: 40px; display: flex; align-items: center; justify-content: center;">
					<Loader variant="dots" size="md" />
				</div>
				<span style="font-size: 12px; color: #888; text-align: center;">Dots — Conversation</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="height: 40px; display: flex; align-items: center; justify-content: center;">
					<Loader variant="spinner" size="md" />
				</div>
				<span style="font-size: 12px; color: #888; text-align: center;">Spinner — Processing</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="width: 140px; height: 40px; display: flex; align-items: center; justify-content: center;">
					<Loader variant="shimmer" size="md" />
				</div>
				<span style="font-size: 12px; color: #888; text-align: center;">Shimmer — Generating</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Loader Size Matrix</h3>
		<p class="ds-card__sub">All combinations of variant x size</p>
		<div class="ds-matrix" style="grid-template-columns: 80px repeat(3, 1fr); gap: 16px;">
			<div></div>
			{#each ['sm', 'md', 'lg'] as size}
				<div class="ds-matrix__h" style="text-align: center;">{size}</div>
			{/each}
			{#each [{ v: 'dots' as const }, { v: 'spinner' as const }, { v: 'shimmer' as const }] as { v: variant }}
				<div class="ds-matrix__label">{variant}</div>
				{#each [{ s: 'sm' as const }, { s: 'md' as const }, { s: 'lg' as const }] as { s: size }}
					<div style="display: flex; align-items: center; justify-content: center; height: 40px;">
						{#if variant === 'shimmer'}
							<div style="width: 80px;"><Loader {variant} {size} /></div>
						{:else}
							<Loader {variant} {size} />
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Loader in Context</h3>
		<p class="ds-card__sub">How loaders appear within conversation flow</p>
		<div class="ds-chat-preview" style="max-width: 480px;">
			<UserMessage
				content="Generate a summary report"
				timestamp={new Date().toISOString()}
			/>
			<div style="display: flex; align-items: center; gap: 10px; padding: 12px 0;">
				<Loader variant="dots" size="sm" />
				<span style="font-size: 13px; color: #999;">Analyzing 2,847 records...</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Svelte Component Inventory</h3>
		<p class="ds-card__sub">8 components at <code>$lib/components/ai-elements/</code></p>
		<table class="ds-table">
			<thead><tr><th>Component</th><th>Key Props</th><th>Purpose</th></tr></thead>
			<tbody>
				<tr><td style="font-weight: 600;">Artifact</td><td>—</td><td>Rich artifact display (documents, charts)</td></tr>
				<tr><td style="font-weight: 600;">CodeBlock</td><td><code>code</code>, <code>language?</code>, <code>filename?</code>, <code>showLineNumbers?</code></td><td>Syntax-highlighted code with copy</td></tr>
				<tr><td style="font-weight: 600;">Conversation</td><td>—</td><td>Full conversation container</td></tr>
				<tr><td style="font-weight: 600;">Loader</td><td><code>variant?</code> (dots|spinner|shimmer), <code>size?</code> (sm|md|lg)</td><td>AI-specific loading animations</td></tr>
				<tr><td style="font-weight: 600;">Message</td><td>—</td><td>Generic message wrapper</td></tr>
				<tr><td style="font-weight: 600;">MessageActions</td><td>—</td><td>Copy/regenerate/feedback actions</td></tr>
				<tr><td style="font-weight: 600;">PromptInput</td><td><code>value?</code>, <code>placeholder?</code>, <code>onSubmit?</code>, <code>onStop?</code></td><td>Message composition field</td></tr>
				<tr><td style="font-weight: 600;">Suggestion</td><td><code>suggestions</code> (string[]), <code>onSelect?</code></td><td>Quick action suggestion chips</td></tr>
			</tbody>
		</table>
	</div>
</section>
