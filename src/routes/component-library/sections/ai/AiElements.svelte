<script lang="ts">
	// ── State ─────────────────────────────────────────────────────────────────
	let copiedIdx = $state<number | null>(null);
	let showLineNumbers = $state(true);
	let activeLang = $state<'typescript' | 'python' | 'sql' | 'json'>('typescript');
	let showDiff = $state(false);

	let rating = $state<number | null>(null);
	let helpfulVote = $state<'yes' | 'no' | null>(null);
	let thumbVote = $state<'up' | 'down' | null>(null);
	let feedbackExpanded = $state(false);
	let feedbackText = $state('');

	let sourcesExpanded = $state(false);
	let promptMulti = $state('');
	let activeChip = $state<string | null>(null);
	let titleEditing = $state(false);
	let convTitle = $state('Market Analysis Deep-Dive');

	// ── Code samples ──────────────────────────────────────────────────────────
	const CODE: Record<string, { filename: string; icon: string; raw: string }> = {
		typescript: {
			filename: 'analysis.ts',
			icon: 'TS',
			raw: `async function analyzeData(dataset: Dataset) {
  // Extract high-confidence trends
  const trends = await findTrends(dataset);
  const insights = trends.filter(t => t.confidence > 0.85);
  return {
    summary: generateSummary(insights),
    recommendations: insights.map(i => i.action),
    confidence: avgConfidence(insights)
  };
}`,
		},
		python: {
			filename: 'pipeline.py',
			icon: 'PY',
			raw: `def analyze_sentiment(texts: list[str]) -> dict:
    """Analyze sentiment across a batch of texts."""
    results = []
    for text in texts:
        score = model.predict(text)
        results.append({
            "text": text,
            "score": score,
            "label": "positive" if score > 0.5 else "negative"
        })
    return {"results": results, "avg": sum(r["score"] for r in results) / len(results)}`,
		},
		sql: {
			filename: 'top-users.sql',
			icon: 'SQL',
			raw: `SELECT u.name, COUNT(o.id) AS total_orders,
       SUM(o.amount) AS revenue
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.name
ORDER BY revenue DESC
LIMIT 10;`,
		},
		json: {
			filename: 'config.json',
			icon: '{}',
			raw: `{
  "model": "gpt-4o",
  "temperature": 0.7,
  "max_tokens": 4096,
  "stream": true,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "search_web",
        "description": "Search the web for current info"
      }
    }
  ]
}`,
		},
	};

	const DIFF = [
		{ type: 'ctx', text: '  const model = new ChatModel({' },
		{ type: 'del', text: '    temperature: 1.0,' },
		{ type: 'add', text: '    temperature: 0.7,' },
		{ type: 'ctx', text: '    maxTokens: 4096,' },
		{ type: 'del', text: '    stream: false,' },
		{ type: 'add', text: '    stream: true,' },
		{ type: 'ctx', text: '  });' },
	];

	const SUGGESTIONS = [
		{ icon: 'sparkle', label: 'Summarize this document', category: 'Analysis' },
		{ icon: '⌥', label: 'Write unit tests', category: 'Code' },
		{ icon: '◈', label: 'Brainstorm 10 ideas', category: 'Creative' },
		{ icon: '⊞', label: 'Create a project plan', category: 'Planning' },
		{ icon: '⟳', label: 'Explain this error', category: 'Code' },
		{ icon: '◉', label: 'Translate to Spanish', category: 'Creative' },
	];

	const SOURCES = [
		{ num: 1, title: 'Attention Is All You Need', url: 'arxiv.org/abs/1706.03762', snippet: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...' },
		{ num: 2, title: 'GPT-4 Technical Report', url: 'openai.com/research/gpt-4', snippet: 'We report the development of GPT-4, a large multimodal model capable of processing image and text inputs...' },
		{ num: 3, title: 'Constitutional AI', url: 'anthropic.com/research/constitutional-ai', snippet: 'We propose Constitutional AI, a method for training AI systems to be helpful, harmless, and honest...' },
		{ num: 4, title: 'Scaling Laws for Neural LMs', url: 'arxiv.org/abs/2001.08361', snippet: 'We study empirical scaling laws for language model performance on the cross-entropy loss...' },
	];

	function doCopy(idx: number, text: string) {
		navigator.clipboard.writeText(text).catch(() => {});
		copiedIdx = idx;
		setTimeout(() => { copiedIdx = null; }, 2000);
	}

	// Simple syntax colorizers (no external deps)
	function esc(s: string) {
		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	function hlTS(line: string) {
		return esc(line)
			.replace(/\b(async|function|const|let|var|return|await|if|else|for|of|in|new|typeof|void|export|default|import|from|type|interface)\b/g, '<b class="ae-kw">$1</b>')
			.replace(/(\/\/.*$)/g, '<i class="ae-cm">$1</i>')
			.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<b class="ae-str">$1</b>')
			.replace(/\b(\d+\.?\d*)\b/g, '<b class="ae-num">$1</b>');
	}
	function hlPY(line: string) {
		return esc(line)
			.replace(/\b(def|return|for|in|if|else|class|import|from|as|not|and|or|None|True|False|self|async|await)\b/g, '<b class="ae-kw">$1</b>')
			.replace(/(#.*$)/g, '<i class="ae-cm">$1</i>')
			.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<b class="ae-str">$1</b>')
			.replace(/\b(\d+\.?\d*)\b/g, '<b class="ae-num">$1</b>');
	}
	function hlSQL(line: string) {
		return esc(line)
			.replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|INNER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|INSERT|UPDATE|DELETE|AS|COUNT|SUM|AVG|MAX|MIN|NOW|INTERVAL|DESC|ASC|AND|OR|NOT)\b/gi, '<b class="ae-kw">$1</b>')
			.replace(/('(?:[^'\\]|\\.)*')/g, '<b class="ae-str">$1</b>')
			.replace(/\b(\d+)\b/g, '<b class="ae-num">$1</b>');
	}
	function hlJSON(line: string) {
		return esc(line)
			.replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<b class="ae-key">$1</b>:')
			.replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <b class="ae-str">$1</b>')
			.replace(/\b(true|false|null)\b/g, '<b class="ae-bool">$1</b>')
			.replace(/:\s*(\d+\.?\d*)/g, ': <b class="ae-num">$1</b>');
	}
	function hlLine(lang: string, line: string) {
		if (lang === 'typescript') return hlTS(line);
		if (lang === 'python') return hlPY(line);
		if (lang === 'sql') return hlSQL(line);
		return hlJSON(line);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Elements</h2>
	<p class="ds-desc">Production-grade primitives for AI interfaces — rebuilt as pure CSS/Svelte. Patterns drawn from Vercel AI SDK, shadcn/ui, and modern chat applications.</p>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     1. CODE BLOCK
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Code Block</h3>
		<p class="ds-card__sub">Syntax-highlighted code with filename header, line numbers toggle, copy feedback, and diff view</p>

		<div class="ae-code-controls">
			{#each (['typescript', 'python', 'sql', 'json'] as const) as lang}
				<button class="ae-tab {activeLang === lang && !showDiff ? 'ae-tab--on' : ''}" onclick={() => { activeLang = lang; showDiff = false; }}>{lang}</button>
			{/each}
			<button class="ae-tab {showDiff ? 'ae-tab--on' : ''}" onclick={() => showDiff = !showDiff}>diff</button>
			<label class="ae-lnum-toggle">
				<input type="checkbox" bind:checked={showLineNumbers} />
				<span>Line numbers</span>
			</label>
		</div>

		{#if showDiff}
			<div class="ae-cb">
				<div class="ae-cb__header">
					<span class="ae-cb__badge ae-cb__badge--diff">DIFF</span>
					<span class="ae-cb__file">model-config.ts</span>
					<button class="ae-cb__copy" onclick={() => doCopy(99, DIFF.map(l => l.text).join('\n'))}>
						{#if copiedIdx === 99}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!
						{:else}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy
						{/if}
					</button>
				</div>
				<div class="ae-cb__body">
					{#each DIFF as dl, i}
						<div class="ae-diff ae-diff--{dl.type}">
							{#if showLineNumbers}<span class="ae-cb__ln">{i + 1}</span>{/if}
							<span class="ae-diff__pfx">{dl.type === 'add' ? '+' : dl.type === 'del' ? '-' : ' '}</span>
							<span>{dl.text}</span>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="ae-cb">
				<div class="ae-cb__header">
					<span class="ae-cb__badge">{CODE[activeLang].icon}</span>
					<span class="ae-cb__file">{CODE[activeLang].filename}</span>
					<button class="ae-cb__copy" onclick={() => doCopy(0, CODE[activeLang].raw)}>
						{#if copiedIdx === 0}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!
						{:else}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy
						{/if}
					</button>
				</div>
				<div class="ae-cb__body">
					{#each CODE[activeLang].raw.split('\n') as line, i}
						<div class="ae-cb__line">
							{#if showLineNumbers}<span class="ae-cb__ln">{i + 1}</span>{/if}
							<span class="ae-cb__code">{@html hlLine(activeLang, line)}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     2. MARKDOWN RENDERER
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Markdown Renderer</h3>
		<p class="ds-card__sub">Rich text from AI responses — headings, lists, tables, code, blockquotes, links</p>
		<div class="ae-md">
			<h1>Analysis Report</h1>
			<p>This document summarizes findings from the <strong>Q4 dataset review</strong>. Results are <em>preliminary</em> and subject to revision.</p>
			<h2>Key Findings</h2>
			<ul>
				<li>Revenue increased by <strong>23%</strong> year-over-year</li>
				<li>Customer retention improved to <em>87.4%</em></li>
				<li>Average order value: <code>$142.50</code></li>
				<li><s>Legacy pipeline decommissioned</s> (still in progress)</li>
			</ul>
			<h3>Recommendations</h3>
			<ol>
				<li>Invest in customer success tooling</li>
				<li>Expand to two new markets by Q2</li>
				<li>Migrate remaining services to <code>v2</code> API</li>
			</ol>
			<blockquote>
				<p>"The data strongly suggests a positive trend, but we recommend waiting for the full quarter." — Data Team</p>
			</blockquote>
			<h4>Performance Table</h4>
			<table>
				<thead><tr><th>Metric</th><th>Q3</th><th>Q4</th><th>Change</th></tr></thead>
				<tbody>
					<tr><td>Revenue</td><td>$1.2M</td><td>$1.48M</td><td style="color:#22c55e">+23%</td></tr>
					<tr><td>Orders</td><td>8,420</td><td>10,391</td><td style="color:#22c55e">+23.4%</td></tr>
					<tr><td>Churn</td><td>14.2%</td><td>12.6%</td><td style="color:#22c55e">-1.6pp</td></tr>
					<tr><td>NPS</td><td>42</td><td>51</td><td style="color:#22c55e">+9</td></tr>
				</tbody>
			</table>
			<hr />
			<p>Full data at <span class="ae-md-link">docs.internal/q4-report</span>.</p>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     3. AI LOADER VARIANTS
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">AI Loader Variants</h3>
		<p class="ds-card__sub">Six animation patterns for thinking, generating, and processing states — each with sm/md/lg sizes</p>

		<div class="ae-loader-showcase">
			<div class="ae-lsc">
				<div class="ae-lsc__demo"><div class="ae-dots"><span></span><span></span><span></span></div></div>
				<span class="ae-lsc__name">Bouncing dots</span>
				<span class="ae-lsc__sub">Conversation</span>
			</div>
			<div class="ae-lsc">
				<div class="ae-lsc__demo"><div class="ae-orb"></div></div>
				<span class="ae-lsc__name">Pulsing orb</span>
				<span class="ae-lsc__sub">Idle / standby</span>
			</div>
			<div class="ae-lsc">
				<div class="ae-lsc__demo"><span class="ae-shimmer-txt">Thinking...</span></div>
				<span class="ae-lsc__name">Shimmer text</span>
				<span class="ae-lsc__sub">Generating</span>
			</div>
			<div class="ae-lsc">
				<div class="ae-lsc__demo ae-lsc__demo--tall">
					<div class="ae-skel-wrap">
						<div class="ae-skel" style="width:100%"></div>
						<div class="ae-skel" style="width:82%"></div>
						<div class="ae-skel" style="width:60%"></div>
					</div>
				</div>
				<span class="ae-lsc__name">Skeleton lines</span>
				<span class="ae-lsc__sub">Content loading</span>
			</div>
			<div class="ae-lsc">
				<div class="ae-lsc__demo"><div class="ae-ring"></div></div>
				<span class="ae-lsc__name">Spinning ring</span>
				<span class="ae-lsc__sub">Processing</span>
			</div>
			<div class="ae-lsc">
				<div class="ae-lsc__demo ae-lsc__demo--wide">
					<div class="ae-progress-row">
						<div class="ae-ring ae-ring--sm"></div>
						<span>Analyzing 2,847 records...</span>
					</div>
				</div>
				<span class="ae-lsc__name">Progress text</span>
				<span class="ae-lsc__sub">Long tasks</span>
			</div>
		</div>

		<h4 class="ds-card__h4" style="margin-top:24px">Size matrix</h4>
		<div class="ae-size-mx">
			<div></div>
			<div class="ae-size-mx__h">sm</div>
			<div class="ae-size-mx__h">md</div>
			<div class="ae-size-mx__h">lg</div>

			<div class="ae-size-mx__l">dots</div>
			<div class="ae-size-mx__c"><div class="ae-dots ae-dots--sm"><span></span><span></span><span></span></div></div>
			<div class="ae-size-mx__c"><div class="ae-dots"><span></span><span></span><span></span></div></div>
			<div class="ae-size-mx__c"><div class="ae-dots ae-dots--lg"><span></span><span></span><span></span></div></div>

			<div class="ae-size-mx__l">ring</div>
			<div class="ae-size-mx__c"><div class="ae-ring ae-ring--sm"></div></div>
			<div class="ae-size-mx__c"><div class="ae-ring"></div></div>
			<div class="ae-size-mx__c"><div class="ae-ring ae-ring--lg"></div></div>

			<div class="ae-size-mx__l">orb</div>
			<div class="ae-size-mx__c"><div class="ae-orb ae-orb--sm"></div></div>
			<div class="ae-size-mx__c"><div class="ae-orb"></div></div>
			<div class="ae-size-mx__c"><div class="ae-orb ae-orb--lg"></div></div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     4. AI AVATAR
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">AI Avatar</h3>
		<p class="ds-card__sub">Assistant identity indicators — sparkle, robot, brain — with status dots and streaming ring</p>

		<h4 class="ds-card__h4">Icon types</h4>
		<div class="ds-demo" style="gap:24px;flex-wrap:wrap;align-items:flex-end">
			<div class="ae-avgrp">
				<div class="ae-av ae-av--sparkle ae-av--lg">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
				</div>
				<span class="ae-avlabel">Sparkle</span>
			</div>
			<div class="ae-avgrp">
				<div class="ae-av ae-av--robot ae-av--lg">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="13" rx="2"/><circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none"/><path d="M9 18h6M12 8V5M9 5h6" stroke-linecap="round"/></svg>
				</div>
				<span class="ae-avlabel">Robot</span>
			</div>
			<div class="ae-avgrp">
				<div class="ae-av ae-av--brain ae-av--lg">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9.5 2C7 2 5 4 5 6.5c0 .7.2 1.4.5 2C3.6 9.4 2 11.3 2 13.5 2 16 4 18 6.5 18c.7 0 1.3-.1 1.9-.4.4 1.4 1.7 2.4 3.1 2.4h1c1.4 0 2.7-1 3.1-2.4.6.3 1.2.4 1.9.4C20 18 22 16 22 13.5c0-2.2-1.6-4.1-3.5-5 .3-.6.5-1.3.5-2C19 4 17 2 14.5 2c-1.2 0-2.3.5-3.1 1.3C10.8 2.5 10.2 2 9.5 2z" stroke-linejoin="round"/></svg>
				</div>
				<span class="ae-avlabel">Brain</span>
			</div>
		</div>

		<h4 class="ds-card__h4">Sizes</h4>
		<div class="ds-demo" style="gap:20px;align-items:flex-end">
			<div class="ae-avgrp"><div class="ae-av ae-av--sparkle ae-av--sm"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div><span class="ae-avlabel">sm 24px</span></div>
			<div class="ae-avgrp"><div class="ae-av ae-av--sparkle"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div><span class="ae-avlabel">md 32px</span></div>
			<div class="ae-avgrp"><div class="ae-av ae-av--sparkle ae-av--lg"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div><span class="ae-avlabel">lg 40px</span></div>
		</div>

		<h4 class="ds-card__h4">Status dots</h4>
		<div class="ds-demo" style="gap:24px;align-items:flex-end">
			<div class="ae-avgrp">
				<div class="ae-avwrap">
					<div class="ae-av ae-av--sparkle"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div>
					<span class="ae-dot ae-dot--online"></span>
				</div>
				<span class="ae-avlabel">Online</span>
			</div>
			<div class="ae-avgrp">
				<div class="ae-avwrap">
					<div class="ae-av ae-av--sparkle ae-av--streaming"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div>
					<span class="ae-dot ae-dot--thinking"></span>
				</div>
				<span class="ae-avlabel">Streaming</span>
			</div>
			<div class="ae-avgrp">
				<div class="ae-avwrap">
					<div class="ae-av ae-av--robot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="13" rx="2"/><circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none"/><path d="M9 18h6M12 8V5M9 5h6" stroke-linecap="round"/></svg></div>
					<span class="ae-dot ae-dot--offline"></span>
				</div>
				<span class="ae-avlabel">Offline</span>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     5. PROMPT INPUT VARIANTS
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Prompt Input Variants</h3>
		<p class="ds-card__sub">Input patterns for different AI interaction modes</p>

		<h4 class="ds-card__h4">Simple search-style</h4>
		<div class="ae-pi-simple">
			<svg class="ae-pi-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
			<input class="ae-pi-input" placeholder="Ask anything..." />
			<button class="ae-pi-send" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
		</div>

		<h4 class="ds-card__h4">Multi-line with attachments</h4>
		<div class="ae-pi-multi">
			<textarea class="ae-pi-ta" placeholder="Describe your task in detail..." bind:value={promptMulti} rows="3"></textarea>
			<div class="ae-pi-toolbar">
				<div class="ae-pi-tools">
					<button class="ae-pi-tool" title="Attach file" aria-label="Attach file"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg></button>
					<button class="ae-pi-tool" title="Web search" aria-label="Search web"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></button>
					<span class="ae-pi-count">{promptMulti.length}/4000</span>
				</div>
				<button class="ae-pi-send2" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
			</div>
		</div>

		<h4 class="ds-card__h4">With model selector + context chips</h4>
		<div class="ae-pi-rich">
			<div class="ae-pi-chips">
				<button class="ae-model-sel"><span class="ae-ms-dot"></span>GPT-4o<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><polyline points="6 9 12 15 18 9"/></svg></button>
				<button class="ae-ctx-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> @report.pdf</button>
				<button class="ae-ctx-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg> @web</button>
			</div>
			<div style="display:flex;gap:8px;align-items:center">
				<input class="ae-pi-input ae-pi-input--rich" placeholder="Message GPT-4o..." style="flex:1;border-radius:8px;padding:8px 12px;border:1.5px solid var(--border,#e5e7eb);outline:none;font-size:14px;font-family:inherit;background:transparent;color:var(--dt1,#111827)" />
				<button class="ae-pi-send2" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
			</div>
		</div>

		<h4 class="ds-card__h4">Disabled / loading state</h4>
		<div class="ae-pi-simple ae-pi-simple--dis">
			<div class="ae-dots ae-dots--sm" style="margin:0 6px"><span></span><span></span><span></span></div>
			<input class="ae-pi-input" placeholder="Generating response..." disabled />
			<button class="ae-stop" aria-label="Stop"><svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><rect x="4" y="4" width="16" height="16" rx="2"/></svg></button>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     6. SUGGESTION CHIPS
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Suggestion Chips</h3>
		<p class="ds-card__sub">Quick action prompts — scrollable row, grid with descriptions, category grouped</p>

		<h4 class="ds-card__h4">Horizontal scrollable row</h4>
		<div class="ae-chips-row">
			{#each SUGGESTIONS as s}
				<button class="ae-chip {activeChip === s.label ? 'ae-chip--on' : ''}" onclick={() => activeChip = activeChip === s.label ? null : s.label}>
					<span class="ae-chip-ico">{#if s.icon === 'sparkle'}<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/></svg>{:else}{s.icon}{/if}</span>{s.label}
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4">Two-column grid with descriptions</h4>
		<div class="ae-chips-grid">
			{#each SUGGESTIONS as s}
				<button class="ae-chip-card">
					<span class="ae-chip-card-ico">{#if s.icon === 'sparkle'}<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/></svg>{:else}{s.icon}{/if}</span>
					<div><div class="ae-chip-card-title">{s.label}</div><div class="ae-chip-card-sub">{s.category}</div></div>
				</button>
			{/each}
		</div>

		<h4 class="ds-card__h4">Category grouped</h4>
		{#each ['Analysis', 'Code', 'Creative', 'Planning'] as cat}
			<div class="ae-chip-cat">
				<span class="ae-chip-cat-lbl">{cat}</span>
				<div class="ae-chips-inline">
					{#each SUGGESTIONS.filter(s => s.category === cat) as s}
						<button class="ae-chip"><span class="ae-chip-ico">{#if s.icon === 'sparkle'}<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/></svg>{:else}{s.icon}{/if}</span>{s.label}</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     7. CITATION / SOURCE CARDS
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Citation &amp; Source Cards</h3>
		<p class="ds-card__sub">Inline numbered citations and expandable source list</p>

		<h4 class="ds-card__h4">Inline citations</h4>
		<p class="ae-cite-para">
			Transformer models <span class="ae-cit">[1]</span> have fundamentally changed NLP.
			Scaling laws <span class="ae-cit">[4]</span> show predictable performance gains with compute.
			Constitutional AI <span class="ae-cit">[3]</span> addresses alignment through self-critique.
		</p>

		<button class="ae-src-toggle" onclick={() => sourcesExpanded = !sourcesExpanded}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
			<span>Based on {SOURCES.length} sources</span>
			<svg class="ae-chevron {sourcesExpanded ? 'ae-chevron--open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="6 9 12 15 18 9"/></svg>
		</button>

		{#if sourcesExpanded}
			<div class="ae-src-list">
				{#each SOURCES as src}
					<div class="ae-src-card">
						<div class="ae-src-num">{src.num}</div>
						<div class="ae-src-body">
							<div class="ae-src-title">{src.title}</div>
							<div class="ae-src-url">{src.url}</div>
							<div class="ae-src-snippet">{src.snippet}</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     8. ARTIFACT CARD
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Artifact Card</h3>
		<p class="ds-card__sub">Generated content display — document, code, image, chart — with action buttons and version info</p>
		<div class="ae-art-grid">
			<!-- Document -->
			<div class="ae-art">
				<div class="ae-art-ico ae-art-ico--doc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
				<div class="ae-art-info"><div class="ae-art-title">Market Analysis Q4</div><div class="ae-art-meta">Document · 1,240 words</div></div>
				<div class="ae-art-acts"><button class="ae-art-btn">Open</button><button class="ae-art-btn">Copy</button></div>
				<div class="ae-art-ver">v2 — edited 2 min ago</div>
			</div>
			<!-- Code -->
			<div class="ae-art">
				<div class="ae-art-ico ae-art-ico--code"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
				<div class="ae-art-info"><div class="ae-art-title">data-pipeline.ts</div><div class="ae-art-meta"><span class="ae-lang-b">TypeScript</span> · 87 lines</div></div>
				<div class="ae-art-acts"><button class="ae-art-btn">Open</button><button class="ae-art-btn">Download</button></div>
				<div class="ae-art-ver">v1 — just now</div>
			</div>
			<!-- Image -->
			<div class="ae-art">
				<div class="ae-art-ico ae-art-ico--img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
				<div class="ae-art-info"><div class="ae-art-title">dashboard-mockup.png</div><div class="ae-art-meta">Image · 1920×1080 · PNG</div></div>
				<div class="ae-art-acts"><button class="ae-art-btn">View</button><button class="ae-art-btn">Share</button></div>
				<div class="ae-art-ver">v1 — generated</div>
			</div>
			<!-- Chart -->
			<div class="ae-art">
				<div class="ae-art-ico ae-art-ico--chart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg></div>
				<div class="ae-art-info"><div class="ae-art-title">Revenue by Quarter</div><div class="ae-art-meta">Chart · 4 series · 16 data points</div></div>
				<div class="ae-art-acts"><button class="ae-art-btn">Open</button><button class="ae-art-btn">Export</button></div>
				<div class="ae-art-ver">v3 — updated 5 min ago</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     9. FEEDBACK CONTROLS
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Feedback Controls</h3>
		<p class="ds-card__sub">Response quality indicators — thumbs, stars, helpful toggle, detailed form</p>

		<h4 class="ds-card__h4">Thumbs up / down</h4>
		<div class="ds-demo" style="gap:8px">
			<button class="ae-thumb {thumbVote === 'up' ? 'ae-thumb--up' : ''}" onclick={() => thumbVote = thumbVote === 'up' ? null : 'up'} aria-label="Thumbs up">
				<svg viewBox="0 0 24 24" fill={thumbVote === 'up' ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" width="17" height="17"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
			</button>
			<button class="ae-thumb {thumbVote === 'down' ? 'ae-thumb--dn' : ''}" onclick={() => thumbVote = thumbVote === 'down' ? null : 'down'} aria-label="Thumbs down">
				<svg viewBox="0 0 24 24" fill={thumbVote === 'down' ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" width="17" height="17"><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
			</button>
			{#if thumbVote}<span style="font-size:12px;color:var(--dt3)">Feedback recorded</span>{/if}
		</div>

		<h4 class="ds-card__h4">Star rating</h4>
		<div class="ds-demo" style="gap:3px">
			{#each [1,2,3,4,5] as star}
				<button class="ae-star {rating !== null && star <= rating ? 'ae-star--on' : ''}" onclick={() => rating = rating === star ? null : star} aria-label="Rate {star} stars">
					<svg viewBox="0 0 24 24" fill={rating !== null && star <= rating ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" width="22" height="22"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
				</button>
			{/each}
			{#if rating}<span style="font-size:12px;color:var(--dt3);margin-left:8px">{rating}/5</span>{/if}
		</div>

		<h4 class="ds-card__h4">Was this helpful?</h4>
		<div class="ae-helpful">
			<span style="font-size:13px;color:var(--dt2)">Was this helpful?</span>
			<button class="ae-helpful-btn {helpfulVote === 'yes' ? 'ae-helpful-btn--yes' : ''}" onclick={() => helpfulVote = helpfulVote === 'yes' ? null : 'yes'}>Yes</button>
			<button class="ae-helpful-btn {helpfulVote === 'no' ? 'ae-helpful-btn--no' : ''}" onclick={() => helpfulVote = helpfulVote === 'no' ? null : 'no'}>No</button>
		</div>

		<h4 class="ds-card__h4">Detailed feedback</h4>
		<div class="ae-fb-block">
			<button class="ae-fb-toggle" onclick={() => feedbackExpanded = !feedbackExpanded}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
				Report an issue
				<svg class="ae-chevron {feedbackExpanded ? 'ae-chevron--open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if feedbackExpanded}
				<div class="ae-fb-form">
					<textarea class="ae-fb-ta" placeholder="Describe the issue..." bind:value={feedbackText} rows="3"></textarea>
					<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
						<button class="ae-fb-cancel" onclick={() => feedbackExpanded = false}>Cancel</button>
						<button class="ae-fb-submit">Submit</button>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     10. TOKEN / COST DISPLAY
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Token &amp; Cost Display</h3>
		<p class="ds-card__sub">Usage metrics — inline compact badges and detailed usage card</p>

		<h4 class="ds-card__h4">Inline badges</h4>
		<div class="ds-demo" style="gap:6px;flex-wrap:wrap">
			<span class="ae-tbadge">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
				1,240 in
			</span>
			<span class="ae-tbadge ae-tbadge--out">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
				847 out
			</span>
			<span class="ae-tbadge ae-tbadge--total">2,087 total</span>
			<span class="ae-tbadge ae-tbadge--cost">$0.0042</span>
			<span class="ae-tbadge ae-tbadge--speed"><span class="ae-spd-dot"></span>42 tok/s</span>
		</div>

		<h4 class="ds-card__h4">Model badge with tokens</h4>
		<div class="ds-demo" style="gap:8px;flex-wrap:wrap">
			<div class="ae-model-badge"><span class="ae-mb-dot ae-mb-dot--g"></span><span class="ae-mb-name">gpt-4o</span><span class="ae-mb-div"></span><span class="ae-mb-tok">2,087 tokens</span><span class="ae-mb-div"></span><span class="ae-mb-cost">$0.0042</span></div>
			<div class="ae-model-badge"><span class="ae-mb-dot ae-mb-dot--p"></span><span class="ae-mb-name">claude-3-5-sonnet</span><span class="ae-mb-div"></span><span class="ae-mb-tok">1,904 tokens</span><span class="ae-mb-div"></span><span class="ae-mb-cost">$0.0029</span></div>
		</div>

		<h4 class="ds-card__h4">Usage breakdown card</h4>
		<div class="ae-usage">
			<div class="ae-usage__hd"><span class="ae-usage__title">Session Usage</span><span class="ae-usage__model">gpt-4o</span></div>
			<div class="ae-usage__rows">
				<div class="ae-usage__row"><span class="ae-usage__lbl">Input tokens</span><div class="ae-usage__bw"><div class="ae-usage__bar" style="width:59%;background:#8b5cf6"></div></div><span class="ae-usage__val">1,240</span></div>
				<div class="ae-usage__row"><span class="ae-usage__lbl">Output tokens</span><div class="ae-usage__bw"><div class="ae-usage__bar" style="width:40%;background:#3b82f6"></div></div><span class="ae-usage__val">847</span></div>
				<div class="ae-usage__row"><span class="ae-usage__lbl">Cache read</span><div class="ae-usage__bw"><div class="ae-usage__bar" style="width:18%;background:#22c55e"></div></div><span class="ae-usage__val">380</span></div>
			</div>
			<div class="ae-usage__ft"><span>Total: 2,087 tokens</span><span style="color:#16a34a;font-weight:600">$0.0042</span></div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════════
	     11. CONVERSATION HEADER
	════════════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Conversation Header</h3>
		<p class="ds-card__sub">Chat session info bar — editable title, model badge, share/export/settings actions</p>

		<div class="ae-conv">
			<div class="ae-conv__left">
				<div class="ae-conv__avs">
					<div class="ae-av ae-av--sparkle ae-av--sm"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div>
					<div class="ae-conv__uav">M</div>
				</div>
				<div class="ae-conv__tg">
					{#if titleEditing}
						<input class="ae-conv__ti" bind:value={convTitle} onblur={() => titleEditing = false} onkeydown={(e) => e.key === 'Enter' && (titleEditing = false)} />
					{:else}
						<span class="ae-conv__title">{convTitle}</span>
						<button class="ae-conv__edit" onclick={() => titleEditing = true} aria-label="Edit title">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
						</button>
					{/if}
					<div class="ae-conv__meta">
						<span class="ae-conv__model">gpt-4o</span>
						<span class="ae-conv__date">Today, 2:34 PM</span>
					</div>
				</div>
			</div>
			<div class="ae-conv__acts">
				<button class="ae-conv__btn">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
					Share
				</button>
				<button class="ae-conv__btn ae-conv__btn--icon" aria-label="Export">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
				</button>
				<button class="ae-conv__btn ae-conv__btn--icon" aria-label="Settings">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
				</button>
			</div>
		</div>

		<h4 class="ds-card__h4" style="margin-top:20px">Compact variant</h4>
		<div class="ae-conv ae-conv--sm">
			<div class="ae-conv__left">
				<div class="ae-av ae-av--sparkle ae-av--sm"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg></div>
				<span class="ae-conv__title" style="font-size:13px">Code Review Session</span>
				<span class="ae-conv__model">claude-3-5-sonnet</span>
			</div>
			<div class="ae-conv__acts">
				<span class="ae-tbadge" style="font-size:11px">3,421 tokens</span>
				<button class="ae-conv__btn ae-conv__btn--icon" aria-label="Settings">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
/* ─── Tabs ────────────────────────────────────────────────────────────────── */
.ae-code-controls { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 12px; }
.ae-tab { padding: 4px 11px; border-radius: 6px; border: 1px solid var(--border,#e5e7eb); background: transparent; font-size: 12px; font-family: var(--font-mono,monospace); cursor: pointer; color: var(--dt2,#6b7280); transition: all .15s; }
.ae-tab:hover { background: var(--surface-2,#f3f4f6); }
.ae-tab--on { background: var(--dt1,#111827); color: #fff; border-color: var(--dt1,#111827); }
.ae-lnum-toggle { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--dt2,#6b7280); cursor: pointer; user-select: none; margin-left: 4px; }

/* ─── Code Block ──────────────────────────────────────────────────────────── */
.ae-cb { background: #0d1117; border-radius: 12px; overflow: hidden; border: 1px solid #30363d; font-family: var(--font-mono,'Fira Code','Cascadia Code',monospace); font-size: 12.5px; line-height: 1.65; }
.ae-cb__header { display: flex; align-items: center; gap: 8px; padding: 9px 14px; background: #161b22; border-bottom: 1px solid #30363d; }
.ae-cb__badge { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #1f6feb33; color: #79c0ff; letter-spacing: .04em; }
.ae-cb__badge--diff { background: #3d2b1f; color: #ffa657; }
.ae-cb__file { font-size: 12px; color: #8b949e; flex: 1; }
.ae-cb__copy { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #8b949e; background: transparent; border: 1px solid #30363d; border-radius: 5px; padding: 3px 8px; cursor: pointer; transition: all .15s; white-space: nowrap; }
.ae-cb__copy:hover { color: #e6edf3; border-color: #6e7681; }
.ae-cb__body { padding: 12px 0; overflow-x: auto; }
.ae-cb__line { display: flex; align-items: baseline; padding: 0 16px; min-height: 21px; }
.ae-cb__line:hover { background: #ffffff07; }
.ae-cb__ln { width: 28px; text-align: right; color: #3d4450; font-size: 11px; margin-right: 14px; flex-shrink: 0; user-select: none; }
.ae-cb__code { color: #e6edf3; white-space: pre; }
/* diff */
.ae-diff { display: flex; align-items: baseline; padding: 1px 16px; gap: 5px; }
.ae-diff--add { background: #23863633; color: #56d364; }
.ae-diff--del { background: #da363333; color: #ff7b72; }
.ae-diff--ctx { color: #8b949e; }
.ae-diff__pfx { width: 10px; flex-shrink: 0; font-weight: 600; }
/* syntax tokens */
:global(.ae-kw) { color: #ff7b72; font-style: normal; font-weight: normal; }
:global(.ae-fn) { color: #79c0ff; font-weight: normal; }
:global(.ae-str) { color: #a5d6ff; font-weight: normal; }
:global(.ae-num) { color: #f2cc60; font-weight: normal; }
:global(.ae-cm) { color: #8b949e; font-style: italic; }
:global(.ae-key) { color: #7ee787; font-weight: normal; }
:global(.ae-bool) { color: #ff7b72; font-weight: normal; }

/* ─── Markdown ────────────────────────────────────────────────────────────── */
.ae-md { font-size: 14px; line-height: 1.7; color: var(--dt1,#111827); }
.ae-md h1 { font-size: 21px; font-weight: 700; margin: 0 0 12px; }
.ae-md h2 { font-size: 17px; font-weight: 600; margin: 20px 0 8px; padding-bottom: 6px; border-bottom: 1px solid var(--border,#e5e7eb); }
.ae-md h3 { font-size: 15px; font-weight: 600; margin: 16px 0 6px; }
.ae-md h4 { font-size: 12px; font-weight: 600; margin: 14px 0 5px; text-transform: uppercase; letter-spacing: .06em; color: var(--dt2,#374151); }
.ae-md p { margin: 0 0 10px; }
.ae-md ul,.ae-md ol { margin: 0 0 10px; padding-left: 20px; }
.ae-md li { margin-bottom: 4px; }
.ae-md code { font-family: var(--font-mono,monospace); font-size: 12px; background: var(--surface-2,#f3f4f6); border: 1px solid var(--border,#e5e7eb); padding: 1px 5px; border-radius: 4px; color: #dc2626; }
.ae-md blockquote { margin: 10px 0; padding: 8px 14px; border-left: 3px solid var(--dt3,#9ca3af); background: var(--surface-2,#f9fafb); border-radius: 0 6px 6px 0; }
.ae-md blockquote p { margin: 0; color: var(--dt2,#6b7280); font-style: italic; }
.ae-md table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 10px 0; }
.ae-md th { text-align: left; padding: 7px 10px; background: var(--surface-2,#f3f4f6); border: 1px solid var(--border,#e5e7eb); font-weight: 600; font-size: 12px; }
.ae-md td { padding: 6px 10px; border: 1px solid var(--border,#e5e7eb); }
.ae-md tr:nth-child(even) td { background: var(--surface-2,#f9fafb); }
.ae-md hr { border: none; border-top: 1px solid var(--border,#e5e7eb); margin: 16px 0; }
.ae-md-link { color: #2563eb; cursor: pointer; }
.ae-md-link:hover { text-decoration: underline; }

/* ─── Loaders ─────────────────────────────────────────────────────────────── */
.ae-loader-showcase { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
@media(max-width:600px) { .ae-loader-showcase { grid-template-columns: repeat(2,1fr); } }
.ae-lsc { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 12px; border: 1px solid var(--border,#e5e7eb); border-radius: 10px; }
.ae-lsc__demo { height: 40px; display: flex; align-items: center; justify-content: center; }
.ae-lsc__demo--tall { height: 56px; }
.ae-lsc__demo--wide { width: 180px; }
.ae-lsc__name { font-size: 12px; font-weight: 600; color: var(--dt1,#111827); }
.ae-lsc__sub { font-size: 11px; color: var(--dt3,#9ca3af); }

.ae-dots { display: flex; gap: 4px; align-items: center; }
.ae-dots span { width: 7px; height: 7px; border-radius: 50%; background: var(--dt2,#6b7280); animation: ae-bounce 1.2s ease-in-out infinite; }
.ae-dots span:nth-child(2) { animation-delay: .2s; }
.ae-dots span:nth-child(3) { animation-delay: .4s; }
.ae-dots--sm span { width: 5px; height: 5px; }
.ae-dots--lg span { width: 10px; height: 10px; }
@keyframes ae-bounce { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-7px); opacity: 1; } }

.ae-orb { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg,#8b5cf6,#3b82f6); animation: ae-pulse 2s ease-in-out infinite; }
.ae-orb--sm { width: 18px; height: 18px; }
.ae-orb--lg { width: 40px; height: 40px; }
@keyframes ae-pulse { 0%,100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.1); opacity: 1; } }

.ae-shimmer-txt { font-size: 14px; font-weight: 500; background: linear-gradient(90deg,#9ca3af 25%,#e5e7eb 50%,#9ca3af 75%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: ae-shim 1.8s linear infinite; }
@keyframes ae-shim { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }

.ae-skel-wrap { display: flex; flex-direction: column; gap: 7px; width: 160px; }
.ae-skel { height: 10px; border-radius: 5px; background: linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%); background-size: 200% auto; animation: ae-shim 1.8s linear infinite; }
.ae-skel:nth-child(2) { animation-delay: .15s; }
.ae-skel:nth-child(3) { animation-delay: .3s; }

.ae-ring { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #e5e7eb; border-top-color: #6b7280; animation: ae-spin .8s linear infinite; }
.ae-ring--sm { width: 14px; height: 14px; border-width: 1.5px; }
.ae-ring--lg { width: 36px; height: 36px; border-width: 3px; }
@keyframes ae-spin { to { transform: rotate(360deg); } }

.ae-progress-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--dt2,#6b7280); white-space: nowrap; }

.ae-size-mx { display: grid; grid-template-columns: 56px repeat(3,1fr); gap: 10px; align-items: center; }
.ae-size-mx__h { font-size: 11px; font-weight: 600; color: var(--dt3,#9ca3af); text-align: center; text-transform: uppercase; letter-spacing: .05em; }
.ae-size-mx__l { font-size: 12px; color: var(--dt2,#6b7280); font-family: var(--font-mono,monospace); }
.ae-size-mx__c { display: flex; align-items: center; justify-content: center; height: 36px; }

/* ─── Avatar ──────────────────────────────────────────────────────────────── */
.ae-av { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ae-av svg { width: 52%; height: 52%; }
.ae-av--sm { width: 24px; height: 24px; border-radius: 7px; }
.ae-av--lg { width: 40px; height: 40px; border-radius: 11px; }
.ae-av--sparkle { background: linear-gradient(135deg,#7c3aed,#2563eb); color: #fff; }
.ae-av--robot { background: linear-gradient(135deg,#0f766e,#0284c7); color: #fff; }
.ae-av--brain { background: linear-gradient(135deg,#db2777,#9333ea); color: #fff; }
.ae-av--streaming { animation: ae-pulse 1.5s ease-in-out infinite; }
.ae-avgrp { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.ae-avlabel { font-size: 11px; color: var(--dt3,#9ca3af); }
.ae-avwrap { position: relative; display: inline-flex; }
.ae-dot { width: 9px; height: 9px; border-radius: 50%; position: absolute; bottom: -1px; right: -1px; border: 2px solid #fff; }
.ae-dot--online { background: #22c55e; }
.ae-dot--thinking { background: #f59e0b; animation: ae-pulse 1.2s ease-in-out infinite; }
.ae-dot--offline { background: #9ca3af; }

/* ─── Prompt Input ────────────────────────────────────────────────────────── */
.ae-pi-simple { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1.5px solid var(--border,#e5e7eb); border-radius: 999px; background: var(--surface,#fff); transition: border-color .15s; max-width: 480px; }
.ae-pi-simple:focus-within { border-color: #6b7280; }
.ae-pi-simple--dis { opacity: .65; pointer-events: none; }
.ae-pi-ico { width: 15px; height: 15px; color: var(--dt3,#9ca3af); flex-shrink: 0; }
.ae-pi-input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; color: var(--dt1,#111827); font-family: inherit; }
.ae-pi-input::placeholder { color: var(--dt3,#9ca3af); }
.ae-pi-send { width: 29px; height: 29px; border-radius: 50%; background: var(--dt1,#111827); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
.ae-pi-send svg { width: 12px; height: 12px; }
.ae-stop { width: 27px; height: 27px; border-radius: 50%; background: #ef4444; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }

.ae-pi-multi { border: 1.5px solid var(--border,#e5e7eb); border-radius: 12px; background: var(--surface,#fff); max-width: 520px; transition: border-color .15s; }
.ae-pi-multi:focus-within { border-color: #6b7280; }
.ae-pi-ta { width: 100%; padding: 12px 14px; border: none; outline: none; background: transparent; font-size: 14px; color: var(--dt1,#111827); resize: none; font-family: inherit; box-sizing: border-box; }
.ae-pi-ta::placeholder { color: var(--dt3,#9ca3af); }
.ae-pi-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; border-top: 1px solid var(--border,#f3f4f6); }
.ae-pi-tools { display: flex; align-items: center; gap: 3px; }
.ae-pi-tool { width: 28px; height: 28px; border-radius: 6px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--dt3,#9ca3af); transition: all .15s; }
.ae-pi-tool:hover { background: var(--surface-2,#f3f4f6); color: var(--dt2,#6b7280); }
.ae-pi-tool svg { width: 15px; height: 15px; }
.ae-pi-count { font-size: 11px; color: var(--dt3,#d1d5db); margin-left: 4px; }
.ae-pi-send2 { width: 32px; height: 32px; border-radius: 8px; background: var(--dt1,#111827); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
.ae-pi-send2 svg { width: 12px; height: 12px; }

.ae-pi-rich { display: flex; flex-direction: column; gap: 8px; max-width: 480px; }
.ae-pi-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.ae-model-sel { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; border: 1.5px solid var(--border,#e5e7eb); background: var(--surface,#fff); font-size: 12px; font-weight: 500; color: var(--dt1,#111827); cursor: pointer; transition: all .15s; font-family: inherit; }
.ae-model-sel:hover { background: var(--surface-2,#f3f4f6); }
.ae-ms-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
.ae-ctx-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; border: 1.5px solid #dbeafe; background: #eff6ff; font-size: 12px; color: #2563eb; cursor: pointer; font-family: inherit; transition: all .15s; }
.ae-ctx-chip:hover { background: #dbeafe; }

/* ─── Suggestion Chips ────────────────────────────────────────────────────── */
.ae-chips-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin; }
.ae-chip { display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px; border-radius: 999px; border: 1.5px solid var(--border,#e5e7eb); background: var(--surface,#fff); font-size: 13px; color: var(--dt1,#111827); cursor: pointer; white-space: nowrap; transition: all .15s; flex-shrink: 0; font-family: inherit; }
.ae-chip:hover { background: var(--surface-2,#f3f4f6); border-color: #9ca3af; }
.ae-chip--on { background: var(--dt1,#111827); color: #fff; border-color: var(--dt1,#111827); }
.ae-chip-ico { font-size: 13px; }

.ae-chips-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-top: 0; }
.ae-chip-card { display: flex; align-items: center; gap: 10px; padding: 10px 13px; border: 1.5px solid var(--border,#e5e7eb); border-radius: 10px; background: var(--surface,#fff); cursor: pointer; text-align: left; transition: all .15s; font-family: inherit; }
.ae-chip-card:hover { background: var(--surface-2,#f3f4f6); border-color: #9ca3af; }
.ae-chip-card-ico { font-size: 18px; flex-shrink: 0; }
.ae-chip-card-title { font-size: 13px; font-weight: 500; color: var(--dt1,#111827); display: block; }
.ae-chip-card-sub { font-size: 11px; color: var(--dt3,#9ca3af); display: block; }

.ae-chip-cat { margin-bottom: 12px; }
.ae-chip-cat-lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--dt3,#9ca3af); margin-bottom: 6px; display: block; }
.ae-chips-inline { display: flex; gap: 6px; flex-wrap: wrap; }

/* ─── Citations ───────────────────────────────────────────────────────────── */
.ae-cite-para { font-size: 14px; line-height: 1.7; color: var(--dt1,#111827); }
.ae-cit { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 4px; background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; font-size: 10px; font-weight: 600; cursor: pointer; vertical-align: middle; margin: 0 1px; transition: background .15s; }
.ae-cit:hover { background: #dbeafe; }

.ae-src-toggle { display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; border: 1.5px solid var(--border,#e5e7eb); border-radius: 8px; font-size: 13px; font-weight: 500; color: var(--dt1,#111827); cursor: pointer; user-select: none; background: var(--surface,#fff); font-family: inherit; transition: background .15s; margin-top: 10px; }
.ae-src-toggle:hover { background: var(--surface-2,#f3f4f6); }
.ae-chevron { transition: transform .2s; color: var(--dt3,#9ca3af); }
.ae-chevron--open { transform: rotate(180deg); }

.ae-src-list { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.ae-src-card { display: flex; gap: 12px; padding: 12px; border: 1px solid var(--border,#e5e7eb); border-radius: 10px; background: var(--surface,#fff); }
.ae-src-num { width: 22px; height: 22px; border-radius: 6px; background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.ae-src-body { display: flex; flex-direction: column; gap: 2px; }
.ae-src-title { font-size: 13px; font-weight: 600; color: var(--dt1,#111827); }
.ae-src-url { font-size: 11px; color: #2563eb; }
.ae-src-snippet { font-size: 12px; color: var(--dt2,#6b7280); line-height: 1.5; margin-top: 3px; }

/* ─── Artifact ────────────────────────────────────────────────────────────── */
.ae-art-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
@media(max-width:600px) { .ae-art-grid { grid-template-columns: 1fr; } }
.ae-art { display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto auto; gap: 0 12px; padding: 14px; border: 1.5px solid var(--border,#e5e7eb); border-radius: 12px; background: var(--surface,#fff); transition: border-color .15s,box-shadow .15s; }
.ae-art:hover { border-color: #9ca3af; box-shadow: 0 2px 8px #0000000a; }
.ae-art-ico { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; grid-row: 1/3; flex-shrink: 0; }
.ae-art-ico svg { width: 17px; height: 17px; }
.ae-art-ico--doc { background: #eff6ff; color: #2563eb; }
.ae-art-ico--code { background: #f0fdf4; color: #16a34a; }
.ae-art-ico--img { background: #fdf4ff; color: #9333ea; }
.ae-art-ico--chart { background: #fff7ed; color: #ea580c; }
.ae-art-info { display: flex; flex-direction: column; gap: 3px; }
.ae-art-title { font-size: 13px; font-weight: 600; color: var(--dt1,#111827); }
.ae-art-meta { font-size: 11px; color: var(--dt3,#9ca3af); display: flex; align-items: center; gap: 5px; }
.ae-lang-b { padding: 1px 5px; border-radius: 3px; background: #dbeafe; color: #1d4ed8; font-size: 10px; font-weight: 600; }
.ae-art-acts { grid-column: 2; display: flex; gap: 6px; margin-top: 9px; }
.ae-art-btn { padding: 4px 9px; border-radius: 6px; border: 1px solid var(--border,#e5e7eb); background: var(--surface,#fff); font-size: 12px; font-weight: 500; color: var(--dt1,#111827); cursor: pointer; transition: all .15s; font-family: inherit; }
.ae-art-btn:hover { background: var(--surface-2,#f3f4f6); }
.ae-art-ver { grid-column: 1/3; font-size: 10px; color: var(--dt3,#d1d5db); margin-top: 6px; }

/* ─── Feedback ────────────────────────────────────────────────────────────── */
.ae-thumb { width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid var(--border,#e5e7eb); background: var(--surface,#fff); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--dt2,#6b7280); transition: all .15s; }
.ae-thumb:hover { background: var(--surface-2,#f3f4f6); }
.ae-thumb--up { background: #f0fdf4; border-color: #86efac; color: #16a34a; }
.ae-thumb--dn { background: #fff1f2; border-color: #fecdd3; color: #dc2626; }

.ae-star { background: transparent; border: none; cursor: pointer; color: var(--dt3,#d1d5db); padding: 2px; transition: color .1s,transform .1s; }
.ae-star:hover { transform: scale(1.1); }
.ae-star--on { color: #f59e0b; }

.ae-helpful { display: flex; align-items: center; gap: 10px; }
.ae-helpful-btn { padding: 5px 13px; border-radius: 999px; border: 1.5px solid var(--border,#e5e7eb); background: var(--surface,#fff); font-size: 13px; cursor: pointer; transition: all .15s; color: var(--dt1,#111827); font-family: inherit; }
.ae-helpful-btn:hover { background: var(--surface-2,#f3f4f6); }
.ae-helpful-btn--yes { background: #f0fdf4; border-color: #86efac; color: #16a34a; }
.ae-helpful-btn--no { background: #fff1f2; border-color: #fecdd3; color: #dc2626; }

.ae-fb-block { display: flex; flex-direction: column; max-width: 400px; }
.ae-fb-toggle { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--dt2,#6b7280); background: transparent; border: none; cursor: pointer; padding: 6px 0; transition: color .15s; font-family: inherit; }
.ae-fb-toggle:hover { color: var(--dt1,#111827); }
.ae-fb-form { margin-top: 8px; }
.ae-fb-ta { width: 100%; padding: 10px 12px; border: 1.5px solid var(--border,#e5e7eb); border-radius: 8px; font-size: 13px; font-family: inherit; color: var(--dt1,#111827); resize: none; outline: none; box-sizing: border-box; transition: border-color .15s; }
.ae-fb-ta:focus { border-color: #6b7280; }
.ae-fb-cancel { padding: 5px 11px; border-radius: 6px; border: 1px solid var(--border,#e5e7eb); background: transparent; font-size: 12px; cursor: pointer; color: var(--dt2,#6b7280); font-family: inherit; }
.ae-fb-submit { padding: 5px 11px; border-radius: 6px; border: none; background: var(--dt1,#111827); color: #fff; font-size: 12px; cursor: pointer; font-weight: 500; font-family: inherit; }

/* ─── Token / Cost ────────────────────────────────────────────────────────── */
.ae-tbadge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 999px; background: var(--surface-2,#f3f4f6); border: 1px solid var(--border,#e5e7eb); font-size: 12px; color: var(--dt2,#6b7280); font-family: var(--font-mono,monospace); }
.ae-tbadge--out { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
.ae-tbadge--total { background: #fdf4ff; border-color: #e9d5ff; color: #7c3aed; }
.ae-tbadge--cost { background: #f0fdf4; border-color: #86efac; color: #16a34a; font-weight: 600; }
.ae-tbadge--speed { font-family: var(--font-mono,monospace); }
.ae-spd-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: ae-pulse 1.5s ease-in-out infinite; }

.ae-model-badge { display: inline-flex; align-items: center; gap: 7px; padding: 5px 11px; border: 1px solid var(--border,#e5e7eb); border-radius: 8px; background: var(--surface,#fff); font-size: 12px; }
.ae-mb-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.ae-mb-dot--g { background: #22c55e; }
.ae-mb-dot--p { background: #7c3aed; }
.ae-mb-name { font-weight: 600; color: var(--dt1,#111827); font-family: var(--font-mono,monospace); }
.ae-mb-div { width: 1px; height: 12px; background: var(--border,#e5e7eb); }
.ae-mb-tok { color: var(--dt2,#6b7280); }
.ae-mb-cost { color: #16a34a; font-weight: 600; }

.ae-usage { border: 1.5px solid var(--border,#e5e7eb); border-radius: 12px; overflow: hidden; max-width: 380px; }
.ae-usage__hd { display: flex; align-items: center; justify-content: space-between; padding: 9px 14px; background: var(--surface-2,#f9fafb); border-bottom: 1px solid var(--border,#e5e7eb); }
.ae-usage__title { font-size: 13px; font-weight: 600; color: var(--dt1,#111827); }
.ae-usage__model { font-size: 11px; color: var(--dt3,#9ca3af); font-family: var(--font-mono,monospace); }
.ae-usage__rows { padding: 12px 14px; display: flex; flex-direction: column; gap: 9px; }
.ae-usage__row { display: flex; align-items: center; gap: 9px; }
.ae-usage__lbl { font-size: 12px; color: var(--dt2,#6b7280); width: 88px; flex-shrink: 0; }
.ae-usage__bw { flex: 1; height: 6px; background: var(--surface-2,#f3f4f6); border-radius: 999px; overflow: hidden; }
.ae-usage__bar { height: 100%; border-radius: 999px; }
.ae-usage__val { font-size: 12px; color: var(--dt1,#111827); font-family: var(--font-mono,monospace); width: 34px; text-align: right; flex-shrink: 0; }
.ae-usage__ft { display: flex; justify-content: space-between; padding: 7px 14px; border-top: 1px solid var(--border,#e5e7eb); font-size: 12px; color: var(--dt2,#6b7280); }

/* ─── Conversation Header ─────────────────────────────────────────────────── */
.ae-conv { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1.5px solid var(--border,#e5e7eb); border-radius: 12px; background: var(--surface,#fff); gap: 12px; }
.ae-conv--sm { padding: 8px 12px; border-radius: 8px; }
.ae-conv__left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.ae-conv__avs { display: flex; align-items: center; flex-shrink: 0; }
.ae-conv__uav { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg,#f59e0b,#ef4444); color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-left: -5px; border: 2px solid #fff; }
.ae-conv__tg { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ae-conv__title { font-size: 14px; font-weight: 600; color: var(--dt1,#111827); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ae-conv__ti { font-size: 14px; font-weight: 600; color: var(--dt1,#111827); border: 1.5px solid #6b7280; border-radius: 5px; padding: 1px 6px; outline: none; font-family: inherit; background: transparent; }
.ae-conv__edit { background: transparent; border: none; cursor: pointer; color: var(--dt3,#9ca3af); padding: 2px; display: inline-flex; align-items: center; margin-left: 3px; transition: color .15s; }
.ae-conv__edit:hover { color: var(--dt1,#111827); }
.ae-conv__meta { display: flex; align-items: center; gap: 8px; }
.ae-conv__model { display: inline-flex; padding: 1px 6px; border-radius: 4px; background: #f3f4f6; font-size: 11px; font-weight: 500; color: var(--dt2,#6b7280); font-family: var(--font-mono,monospace); }
.ae-conv__date { font-size: 11px; color: var(--dt3,#9ca3af); }
.ae-conv__acts { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.ae-conv__btn { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 7px; border: 1px solid var(--border,#e5e7eb); background: transparent; font-size: 12px; color: var(--dt2,#6b7280); cursor: pointer; transition: all .15s; font-family: inherit; }
.ae-conv__btn:hover { background: var(--surface-2,#f3f4f6); color: var(--dt1,#111827); }
.ae-conv__btn--icon { padding: 5px 7px; }

/* ─── Dark mode overrides for inverted elements ─────────────── */
:global(.dark) .ae-tab--on { background: #e5e5e5; color: #111; border-color: #e5e5e5; }
:global(.dark) .ae-pi-send { background: #e5e5e5; color: #111; }
:global(.dark) .ae-pi-send2 { background: #e5e5e5; color: #111; }
:global(.dark) .ae-chip--on { background: #e5e5e5; color: #111; border-color: #e5e5e5; }
:global(.dark) .ae-fb-submit { background: #e5e5e5; color: #111; }

/* ─── Dark mode: full token remap ──────────────────────────── */
:global(.dark) .ae-md { color: var(--dt, #fff); }
:global(.dark) .ae-md h4 { color: var(--dt2, #aaa); }
:global(.dark) .ae-md code { background: var(--dbg3, #2e2e2e); border-color: var(--dbd, #333); color: #f87171; }
:global(.dark) .ae-md blockquote { background: var(--dbg2, #242424); border-left-color: var(--dt3, #777); }
:global(.dark) .ae-md blockquote p { color: var(--dt2, #aaa); }
:global(.dark) .ae-md th { background: var(--dbg2, #242424); border-color: var(--dbd, #333); color: var(--dt, #fff); }
:global(.dark) .ae-md td { border-color: var(--dbd, #333); color: var(--dt, #fff); }
:global(.dark) .ae-md tr:nth-child(even) td { background: var(--dbg2, #242424); }
:global(.dark) .ae-md h2 { border-bottom-color: var(--dbd, #333); }
:global(.dark) .ae-md hr { border-top-color: var(--dbd, #333); }
:global(.dark) .ae-md-link { color: #60a5fa; }
:global(.dark) .ae-tab { border-color: var(--dbd, #333); color: var(--dt3, #777); }
:global(.dark) .ae-tab:hover { background: var(--dbg3, #2e2e2e); color: var(--dt, #fff); }
:global(.dark) .ae-lnum-toggle { color: var(--dt3, #777); }
:global(.dark) .ae-lsc { border-color: var(--dbd, #333); }
:global(.dark) .ae-lsc__name { color: var(--dt, #fff); }
:global(.dark) .ae-pi-input { color: var(--dt, #fff); }
:global(.dark) .ae-pi-simple { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-pi-multi { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-pi-ta { color: var(--dt, #fff); }
:global(.dark) .ae-pi-toolbar { border-top-color: var(--dbd, #333); }
:global(.dark) .ae-pi-tool:hover { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-chip { border-color: var(--dbd, #333); background: var(--dbg2, #242424); color: var(--dt, #fff); }
:global(.dark) .ae-chip:hover { background: var(--dbg3, #2e2e2e); border-color: #555; }
:global(.dark) .ae-chip-card { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-chip-card:hover { background: var(--dbg3, #2e2e2e); border-color: #555; }
:global(.dark) .ae-chip-card-title { color: var(--dt, #fff); }
:global(.dark) .ae-cite-para { color: var(--dt, #fff); }
:global(.dark) .ae-cit { background: rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.3); color: #60a5fa; }
:global(.dark) .ae-cit:hover { background: rgba(59, 130, 246, 0.25); }
:global(.dark) .ae-src-toggle { border-color: var(--dbd, #333); background: var(--dbg2, #242424); color: var(--dt, #fff); }
:global(.dark) .ae-src-toggle:hover { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-src-card { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-src-title { color: var(--dt, #fff); }
:global(.dark) .ae-src-num { background: rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.3); color: #60a5fa; }
:global(.dark) .ae-art { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-art:hover { border-color: #555; }
:global(.dark) .ae-art-title { color: var(--dt, #fff); }
:global(.dark) .ae-art-btn { border-color: var(--dbd, #333); background: var(--dbg2, #242424); color: var(--dt, #fff); }
:global(.dark) .ae-art-btn:hover { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-art-ico--doc { background: rgba(37, 99, 235, 0.15); }
:global(.dark) .ae-art-ico--code { background: rgba(22, 163, 74, 0.15); }
:global(.dark) .ae-art-ico--img { background: rgba(147, 51, 234, 0.15); }
:global(.dark) .ae-art-ico--chart { background: rgba(234, 88, 12, 0.15); }
:global(.dark) .ae-lang-b { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
:global(.dark) .ae-thumb { border-color: var(--dbd, #333); background: var(--dbg2, #242424); color: var(--dt2, #aaa); }
:global(.dark) .ae-thumb:hover { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-thumb--up { background: rgba(22, 163, 74, 0.15); border-color: rgba(34, 197, 94, 0.3); }
:global(.dark) .ae-thumb--dn { background: rgba(220, 38, 38, 0.15); border-color: rgba(248, 113, 113, 0.3); }
:global(.dark) .ae-helpful-btn { border-color: var(--dbd, #333); background: var(--dbg2, #242424); color: var(--dt, #fff); }
:global(.dark) .ae-helpful-btn:hover { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-helpful-btn--yes { background: rgba(22, 163, 74, 0.15); border-color: rgba(34, 197, 94, 0.3); color: #4ade80; }
:global(.dark) .ae-helpful-btn--no { background: rgba(220, 38, 38, 0.15); border-color: rgba(248, 113, 113, 0.3); color: #f87171; }
:global(.dark) .ae-fb-ta { border-color: var(--dbd, #333); color: var(--dt, #fff); background: var(--dbg2, #242424); }
:global(.dark) .ae-fb-cancel { border-color: var(--dbd, #333); color: var(--dt2, #aaa); }
:global(.dark) .ae-fb-toggle:hover { color: var(--dt, #fff); }
:global(.dark) .ae-tbadge { background: var(--dbg3, #2e2e2e); border-color: var(--dbd, #333); color: var(--dt2, #aaa); }
:global(.dark) .ae-tbadge--out { background: rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.25); color: #60a5fa; }
:global(.dark) .ae-tbadge--total { background: rgba(124, 58, 237, 0.15); border-color: rgba(124, 58, 237, 0.25); color: #a78bfa; }
:global(.dark) .ae-tbadge--cost { background: rgba(22, 163, 74, 0.15); border-color: rgba(34, 197, 94, 0.25); color: #4ade80; }
:global(.dark) .ae-model-badge { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-mb-name { color: var(--dt, #fff); }
:global(.dark) .ae-mb-div { background: var(--dbd, #333); }
:global(.dark) .ae-usage { border-color: var(--dbd, #333); }
:global(.dark) .ae-usage__hd { background: var(--dbg2, #242424); border-bottom-color: var(--dbd, #333); }
:global(.dark) .ae-usage__title { color: var(--dt, #fff); }
:global(.dark) .ae-usage__bw { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-usage__val { color: var(--dt, #fff); }
:global(.dark) .ae-usage__ft { border-top-color: var(--dbd, #333); }
:global(.dark) .ae-conv { border-color: var(--dbd, #333); background: var(--dbg2, #242424); }
:global(.dark) .ae-conv__title { color: var(--dt, #fff); }
:global(.dark) .ae-conv__btn { border-color: var(--dbd, #333); color: var(--dt2, #aaa); }
:global(.dark) .ae-conv__btn:hover { background: var(--dbg3, #2e2e2e); color: var(--dt, #fff); }
:global(.dark) .ae-conv__uav { border-color: var(--dbg, #1a1a1a); }
:global(.dark) .ae-model-sel { border-color: var(--dbd, #333); background: var(--dbg2, #242424); color: var(--dt, #fff); }
:global(.dark) .ae-model-sel:hover { background: var(--dbg3, #2e2e2e); }
:global(.dark) .ae-ctx-chip { background: rgba(59, 130, 246, 0.12); border-color: rgba(59, 130, 246, 0.25); }
:global(.dark) .ae-ctx-chip:hover { background: rgba(59, 130, 246, 0.2); }
:global(.dark) .ae-skel { background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%); background-size: 200% auto; }
:global(.dark) .ae-ring { border-color: #444; border-top-color: #999; }
:global(.dark) .ae-dot { border-color: var(--dbg, #1a1a1a); }
:global(.dark) .ae-shimmer-txt { background: linear-gradient(90deg, #666 25%, #999 50%, #666 75%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; }
</style>

