<script lang="ts">
	let temperature = $state(0.7);
	let maxTokens = $state(4096);
	let selectedModel = $state('claude-3-5-sonnet');

	let sandboxInput = $state('');
	let debugPanelOpen = $state(true);

	let webSearchEnabled = $state(true);
	let codeExecEnabled = $state(true);
	let fileAccessEnabled = $state(false);
	let imgGenEnabled = $state(false);
	let dataAnalysisEnabled = $state(true);

	let githubExpanded = $state(false);
	let slackExpanded = $state(false);
	let postgresExpanded = $state(false);

	let deployEnv = $state('staging');
	let deployLoading = $state(false);

	function triggerDeploy() {
		deployLoading = true;
		setTimeout(() => { deployLoading = false; }, 2000);
	}
</script>

<section class="ds-section">

	<h2 class="ds-title">Agent Builder</h2>
	<p class="ds-subtitle">AI agent configuration, preset templates, prompt editing, test sandbox, tool management, and deployment controls.</p>

	<!-- 1. Agent Config Form -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Config Form</h3>
		<p class="ds-card__sub">Full agent configuration with model selection, temperature, token budget, system prompt, and tool checkboxes.</p>

		<div class="ab2-config-form">
			<div class="ab2-form-row ab2-form-row--2">
				<div class="ab2-field">
					<label class="ab2-label" for="ab2-agent-name">Agent Name</label>
					<input id="ab2-agent-name" class="ab2-input" type="text" value="Research Analyst v2" placeholder="e.g. Research Analyst" />
				</div>
				<div class="ab2-field">
					<label class="ab2-label" for="ab2-agent-desc">Description</label>
					<input id="ab2-agent-desc" class="ab2-input" type="text" value="Deep research with citation verification" placeholder="Short description" />
				</div>
			</div>

			<div class="ab2-field">
				<label class="ab2-label" for="ab2-model">Model</label>
				<div class="ab2-select-wrap">
					<select id="ab2-model" class="ab2-select" bind:value={selectedModel}>
						<option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
						<option value="claude-3-opus">Claude 3 Opus</option>
						<option value="gpt-4o">GPT-4o</option>
						<option value="gpt-4-turbo">GPT-4 Turbo</option>
						<option value="gemini-1-5-pro">Gemini 1.5 Pro</option>
						<option value="llama-3-405b">Llama 3.1 405B</option>
					</select>
					<span class="ab2-select-caret">▾</span>
				</div>
			</div>

			<div class="ab2-field">
				<label class="ab2-label" for="ab2-temperature">
					Temperature
					<span class="ab2-label-badge">{temperature.toFixed(1)}</span>
					<span class="ab2-label-hint">{temperature < 0.4 ? 'Precise' : temperature < 0.7 ? 'Balanced' : 'Creative'}</span>
				</label>
				<div class="ab2-slider-wrap">
					<input
						id="ab2-temperature"
						class="ab2-slider"
						type="range"
						min="0"
						max="1"
						step="0.1"
						bind:value={temperature}
						aria-label="Temperature"
					/>
					<div class="ab2-slider-ticks">
						<span>0</span><span>0.5</span><span>1</span>
					</div>
				</div>
			</div>

			<div class="ab2-form-row ab2-form-row--2">
				<div class="ab2-field">
					<label class="ab2-label" for="ab2-max-tokens">Max Tokens</label>
					<input id="ab2-max-tokens" class="ab2-input ab2-input--mono" type="number" bind:value={maxTokens} min="256" max="200000" step="256" />
				</div>
				<div class="ab2-field">
					<label class="ab2-label" for="ab2-timeout">Timeout (seconds)</label>
					<input id="ab2-timeout" class="ab2-input ab2-input--mono" type="number" value="30" min="5" max="300" />
				</div>
			</div>

			<div class="ab2-field">
				<label class="ab2-label" for="ab2-sysprompt">System Prompt</label>
				<textarea
					id="ab2-sysprompt"
					class="ab2-textarea"
					rows="6"
					placeholder="You are a helpful assistant that..."
				>You are an expert research analyst with deep expertise in cross-referencing sources. Your primary directive is to provide thorough, well-sourced answers with inline citations. Always verify claims against at least two independent sources before presenting them as fact. Structure responses with clear headings and concise bullet points.</textarea>
			</div>

			<div class="ab2-field">
				<span class="ab2-label" role="group" aria-label="Tools and Capabilities">Tools &amp; Capabilities</span>
				<div class="ab2-checkboxes">
					<label class="ab2-checkbox-row">
						<input class="ab2-checkbox" type="checkbox" bind:checked={webSearchEnabled} />
						<span class="ab2-checkbox-icon" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>
						<span class="ab2-checkbox-label">Web Search</span>
						<span class="ab2-checkbox-desc">Search the internet for up-to-date information</span>
					</label>
					<label class="ab2-checkbox-row">
						<input class="ab2-checkbox" type="checkbox" bind:checked={codeExecEnabled} />
						<span class="ab2-checkbox-icon" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
						<span class="ab2-checkbox-label">Code Execution</span>
						<span class="ab2-checkbox-desc">Run Python, JavaScript, and shell scripts in sandbox</span>
					</label>
					<label class="ab2-checkbox-row">
						<input class="ab2-checkbox" type="checkbox" bind:checked={fileAccessEnabled} />
						<span class="ab2-checkbox-icon" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></span>
						<span class="ab2-checkbox-label">File Access</span>
						<span class="ab2-checkbox-desc">Read and write files in the workspace</span>
					</label>
					<label class="ab2-checkbox-row">
						<input class="ab2-checkbox" type="checkbox" bind:checked={imgGenEnabled} />
						<span class="ab2-checkbox-icon" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg></span>
						<span class="ab2-checkbox-label">Image Generation</span>
						<span class="ab2-checkbox-desc">Generate images via DALL-E or Stable Diffusion</span>
					</label>
					<label class="ab2-checkbox-row">
						<input class="ab2-checkbox" type="checkbox" bind:checked={dataAnalysisEnabled} />
						<span class="ab2-checkbox-icon" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg></span>
						<span class="ab2-checkbox-label">Data Analysis</span>
						<span class="ab2-checkbox-desc">Parse CSVs, run statistical computations, chart generation</span>
					</label>
				</div>
			</div>

			<div class="ab2-form-actions">
				<button class="btn-rounded btn-rounded-ghost">Discard Changes</button>
				<button class="btn-rounded btn-rounded-secondary">Save Draft</button>
				<button class="btn-rounded btn-rounded-primary">Save Agent</button>
			</div>
		</div>
	</div>

	<!-- 2. Agent Presets -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Presets</h3>
		<p class="ds-card__sub">Ready-made agent templates for common use cases. Select a preset to populate the config form.</p>

		<div class="ab2-presets-grid">
			<div class="ab2-preset-card ab2-preset-card--selected">
				<div class="ab2-preset-head">
					<div class="ab2-preset-icon ab2-preset-icon--support">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
					</div>
					<span class="ab2-preset-check" aria-label="Selected">✓</span>
				</div>
				<h4 class="ab2-preset-name">Customer Support</h4>
				<p class="ab2-preset-desc">Handles inbound support queries with empathy, escalation logic, and knowledge base lookup.</p>
				<div class="ab2-preset-tags">
					<span class="ab2-tag">GPT-4o</span>
					<span class="ab2-tag">temp 0.4</span>
					<span class="ab2-tag">Web Search</span>
				</div>
				<button class="btn-rounded btn-rounded-primary btn-rounded-sm" style="width:100%" aria-label="Use Customer Support preset">Use Preset</button>
			</div>

			<div class="ab2-preset-card">
				<div class="ab2-preset-head">
					<div class="ab2-preset-icon ab2-preset-icon--code">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
					</div>
				</div>
				<h4 class="ab2-preset-name">Code Assistant</h4>
				<p class="ab2-preset-desc">Full-stack coding partner with code execution, debugging, and pull request review capabilities.</p>
				<div class="ab2-preset-tags">
					<span class="ab2-tag">Claude 3.5 Sonnet</span>
					<span class="ab2-tag">temp 0.3</span>
					<span class="ab2-tag">Code Exec</span>
				</div>
				<button class="btn-rounded btn-rounded-secondary btn-rounded-sm" style="width:100%" aria-label="Use Code Assistant preset">Use Preset</button>
			</div>

			<div class="ab2-preset-card">
				<div class="ab2-preset-head">
					<div class="ab2-preset-icon ab2-preset-icon--data">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
					</div>
				</div>
				<h4 class="ab2-preset-name">Data Analyst</h4>
				<p class="ab2-preset-desc">Statistical analysis, CSV parsing, and chart generation. Outputs structured insights and visualisations.</p>
				<div class="ab2-preset-tags">
					<span class="ab2-tag">Claude 3 Opus</span>
					<span class="ab2-tag">temp 0.2</span>
					<span class="ab2-tag">Data Analysis</span>
				</div>
				<button class="btn-rounded btn-rounded-secondary btn-rounded-sm" style="width:100%" aria-label="Use Data Analyst preset">Use Preset</button>
			</div>

			<div class="ab2-preset-card">
				<div class="ab2-preset-head">
					<div class="ab2-preset-icon ab2-preset-icon--content">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
					</div>
				</div>
				<h4 class="ab2-preset-name">Content Writer</h4>
				<p class="ab2-preset-desc">SEO-optimised long-form content with structured headings, meta descriptions, and brand tone adherence.</p>
				<div class="ab2-preset-tags">
					<span class="ab2-tag">GPT-4 Turbo</span>
					<span class="ab2-tag">temp 0.8</span>
					<span class="ab2-tag">Web Search</span>
				</div>
				<button class="btn-rounded btn-rounded-secondary btn-rounded-sm" style="width:100%" aria-label="Use Content Writer preset">Use Preset</button>
			</div>
		</div>
	</div>

	<!-- 3. Test Sandbox -->
	<div class="ds-card">
		<h3 class="ds-card__title">Test Sandbox</h3>
		<p class="ds-card__sub">Split-pane sandbox: left shows the live chat conversation, right shows the debug panel with tool calls, token usage, and timing.</p>

		<div class="ab2-sandbox">
			<div class="ab2-sandbox-chat">
				<div class="ab2-pane-header">
					<span class="ab2-pane-title">Conversation</span>
					<span class="ab2-pane-badge ab2-pane-badge--live">● Live</span>
				</div>

				<div class="ab2-messages" role="log" aria-label="Test conversation">
					<div class="ab2-msg ab2-msg--user">
						<div class="ab2-msg-avatar ab2-msg-avatar--user" aria-hidden="true">U</div>
						<div class="ab2-msg-bubble ab2-msg-bubble--user">What are the latest advancements in vector database technology?</div>
					</div>

					<div class="ab2-tool-call" role="status" aria-label="Tool call: web_search">
						<span class="ab2-tool-icon" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>
						<span class="ab2-tool-name">web_search</span>
						<code class="ab2-tool-args">"vector database 2024 advancements"</code>
						<span class="ab2-tool-dur">340ms</span>
					</div>

					<div class="ab2-msg ab2-msg--agent">
						<div class="ab2-msg-avatar ab2-msg-avatar--agent" aria-hidden="true">A</div>
						<div class="ab2-msg-bubble ab2-msg-bubble--agent">
							<strong>Recent Vector DB Advancements (2024)</strong><br /><br />
							Several notable developments have emerged: <strong>pgvector 0.7</strong> added HNSW indexing with 10x query speed improvements. <strong>Pinecone Serverless</strong> launched pay-per-query billing. <strong>Weaviate 1.24</strong> introduced multi-tenancy at scale. <strong>Qdrant</strong> added sparse vector support for hybrid search workflows.
						</div>
					</div>

					<div class="ab2-msg ab2-msg--user">
						<div class="ab2-msg-avatar ab2-msg-avatar--user" aria-hidden="true">U</div>
						<div class="ab2-msg-bubble ab2-msg-bubble--user">How does HNSW compare to IVF indexing for high-dimensional data?</div>
					</div>

					<div class="ab2-msg ab2-msg--agent">
						<div class="ab2-msg-avatar ab2-msg-avatar--agent" aria-hidden="true">A</div>
						<div class="ab2-msg-bubble ab2-msg-bubble--agent">
							<strong>HNSW vs IVF:</strong> HNSW (Hierarchical Navigable Small World) provides better recall at similar query speeds for high-dimensional data (&gt;256 dims). IVF (Inverted File Index) is more memory-efficient and better for batch inserts, but requires an initial training phase on your dataset.
						</div>
					</div>
				</div>

				<div class="ab2-sandbox-input-row">
					<input
						class="ab2-sandbox-input"
						type="text"
						placeholder="Send a test message..."
						bind:value={sandboxInput}
						aria-label="Test message input"
					/>
					<button class="btn-rounded btn-rounded-primary btn-rounded-sm" aria-label="Send message">Send</button>
				</div>
			</div>

			<div class="ab2-sandbox-debug">
				<div class="ab2-pane-header">
					<span class="ab2-pane-title">Debug Panel</span>
					<button
						class="btn-compact btn-compact-ghost btn-compact-icon"
						onclick={() => debugPanelOpen = !debugPanelOpen}
						aria-expanded={debugPanelOpen}
						aria-label="Toggle debug panel"
					>{debugPanelOpen ? '−' : '+'}</button>
				</div>

				{#if debugPanelOpen}
					<div class="ab2-debug-section">
						<span class="ab2-debug-heading">Token Usage</span>
						<div class="ab2-token-bars">
							<div class="ab2-token-row">
								<span class="ab2-token-label">Input</span>
								<div class="ab2-token-bar-wrap"><div class="ab2-token-bar" style="width: 18%;" aria-label="Input tokens 847 of 4096"></div></div>
								<span class="ab2-token-count">847</span>
							</div>
							<div class="ab2-token-row">
								<span class="ab2-token-label">Output</span>
								<div class="ab2-token-bar-wrap"><div class="ab2-token-bar ab2-token-bar--output" style="width: 9%;" aria-label="Output tokens 394 of 4096"></div></div>
								<span class="ab2-token-count">394</span>
							</div>
							<div class="ab2-token-row">
								<span class="ab2-token-label">Limit</span>
								<div class="ab2-token-bar-wrap"><div class="ab2-token-bar ab2-token-bar--limit" style="width: 100%;"></div></div>
								<span class="ab2-token-count">4096</span>
							</div>
						</div>
					</div>

					<div class="ab2-debug-section">
						<span class="ab2-debug-heading">Tool Calls</span>
						<div class="ab2-debug-calls">
							<div class="ab2-debug-call">
								<span class="ab2-dc-name">web_search</span>
								<span class="ab2-dc-status ab2-dc-status--ok">200</span>
								<span class="ab2-dc-time">340ms</span>
							</div>
						</div>
					</div>

					<div class="ab2-debug-section">
						<span class="ab2-debug-heading">Timing</span>
						<div class="ab2-debug-timing">
							<div class="ab2-timing-row"><span class="ab2-timing-label">Tool calls</span><span class="ab2-timing-val">340ms</span></div>
							<div class="ab2-timing-row"><span class="ab2-timing-label">LLM inference</span><span class="ab2-timing-val">1,210ms</span></div>
							<div class="ab2-timing-row ab2-timing-row--total"><span class="ab2-timing-label">Total</span><span class="ab2-timing-val">1,550ms</span></div>
						</div>
					</div>

					<div class="ab2-debug-section">
						<span class="ab2-debug-heading">Model</span>
						<div class="ab2-debug-meta">
							<div class="ab2-dm-row"><span>Model</span><span>Claude 3.5 Sonnet</span></div>
							<div class="ab2-dm-row"><span>Temperature</span><span>{temperature.toFixed(1)}</span></div>
							<div class="ab2-dm-row"><span>Max tokens</span><span>{maxTokens}</span></div>
							<div class="ab2-dm-row"><span>Stop reason</span><span class="ab2-dm-val--ok">end_turn</span></div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- 4. Prompt Editor -->
	<div class="ds-card">
		<h3 class="ds-card__title">Prompt Editor</h3>
		<p class="ds-card__sub">Code-editor-style prompt editor with line numbers, variable highlighting, a template variable sidebar, and test action.</p>

		<div class="ab2-prompt-editor-wrap">
			<div class="ab2-pe-toolbar">
				<div class="ab2-pe-tabs" role="tablist">
					<button class="btn-compact btn-compact-primary" role="tab" aria-current="true">system_prompt.txt</button>
					<button class="btn-compact btn-compact-ghost" role="tab">user_template.txt</button>
				</div>
				<div class="ab2-pe-meta">
					<span class="ab2-pe-stat">612 chars</span>
					<span class="ab2-pe-stat">~153 tokens</span>
					<div class="ab2-pe-versions">
						<button class="btn-compact btn-compact-ghost">v1</button>
						<button class="btn-compact btn-compact-ghost">v2</button>
						<button class="btn-compact btn-compact-soft ab2-pe-ver--active">v3</button>
					</div>
				</div>
			</div>

			<div class="ab2-pe-body">
				<div class="ab2-pe-editor" role="textbox" aria-label="Prompt editor" aria-multiline="true">
					<div class="ab2-pe-gutter" aria-hidden="true">
						{#each Array(14) as _, i}
							<span class="ab2-pe-ln">{i + 1}</span>
						{/each}
					</div>
					<div class="ab2-pe-code">
						<div class="ab2-pe-line"><span class="ab2-pe-kw">You are</span> a research analyst for <span class="ab2-pe-var">&#123;&#123;company_name&#125;&#125;</span>.</div>
						<div class="ab2-pe-line ab2-pe-line--empty">&nbsp;</div>
						<div class="ab2-pe-line"><span class="ab2-pe-sec">## Identity</span></div>
						<div class="ab2-pe-line">Your role is to provide thorough, well-sourced answers</div>
						<div class="ab2-pe-line">with inline citations. You represent <span class="ab2-pe-var">&#123;&#123;company_name&#125;&#125;</span> values.</div>
						<div class="ab2-pe-line ab2-pe-line--empty">&nbsp;</div>
						<div class="ab2-pe-line"><span class="ab2-pe-sec">## Context</span></div>
						<div class="ab2-pe-line">- Current date: <span class="ab2-pe-var">&#123;&#123;current_date&#125;&#125;</span></div>
						<div class="ab2-pe-line">- User: <span class="ab2-pe-var">&#123;&#123;user_name&#125;&#125;</span> (<span class="ab2-pe-var">&#123;&#123;user_role&#125;&#125;</span>)</div>
						<div class="ab2-pe-line">- Language preference: <span class="ab2-pe-var">&#123;&#123;language&#125;&#125;</span></div>
						<div class="ab2-pe-line ab2-pe-line--empty">&nbsp;</div>
						<div class="ab2-pe-line"><span class="ab2-pe-sec">## Guidelines</span></div>
						<div class="ab2-pe-line"><span class="ab2-pe-str">- Always cite at least 2 independent sources</span></div>
						<div class="ab2-pe-line"><span class="ab2-pe-str">- Flag uncertain information with [UNVERIFIED]</span></div>
					</div>
				</div>

				<div class="ab2-pe-sidebar">
					<span class="ab2-pe-sidebar-title">Template Variables</span>
					<div class="ab2-pe-vars">
						<button class="ab2-pe-var-btn" aria-label="Insert company_name variable">
							<span class="ab2-pe-vname">&#123;&#123;company_name&#125;&#125;</span>
							<span class="ab2-pe-vval">Acme Corp</span>
						</button>
						<button class="ab2-pe-var-btn" aria-label="Insert current_date variable">
							<span class="ab2-pe-vname">&#123;&#123;current_date&#125;&#125;</span>
							<span class="ab2-pe-vval">2026-03-06</span>
						</button>
						<button class="ab2-pe-var-btn" aria-label="Insert user_name variable">
							<span class="ab2-pe-vname">&#123;&#123;user_name&#125;&#125;</span>
							<span class="ab2-pe-vval">Jordan Lee</span>
						</button>
						<button class="ab2-pe-var-btn" aria-label="Insert user_role variable">
							<span class="ab2-pe-vname">&#123;&#123;user_role&#125;&#125;</span>
							<span class="ab2-pe-vval">analyst</span>
						</button>
						<button class="ab2-pe-var-btn" aria-label="Insert language variable">
							<span class="ab2-pe-vname">&#123;&#123;language&#125;&#125;</span>
							<span class="ab2-pe-vval">English</span>
						</button>
						<button class="btn-compact btn-compact-ghost" aria-label="Add new variable">+ Add variable</button>
					</div>
				</div>
			</div>

			<div class="ab2-pe-actions">
				<button class="btn-rounded btn-rounded-ghost">Revert to v2</button>
				<button class="btn-rounded btn-rounded-secondary">Save Draft</button>
				<button class="btn-rounded btn-rounded-primary">Test Prompt</button>
			</div>
		</div>
	</div>

	<!-- 5. Tool Configuration -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tool Configuration</h3>
		<p class="ds-card__sub">Individual tool cards with enable toggles, expandable configuration, API key inputs, and connection testing.</p>

		<div class="ab2-tools">
			<!-- GitHub -->
			<div class="ab2-tool-card">
				<div class="ab2-tool-header">
					<div class="ab2-tool-left">
						<div class="ab2-tool-logo ab2-tool-logo--github" aria-hidden="true">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
						</div>
						<div class="ab2-tool-info">
							<span class="ab2-tool-name">GitHub Integration</span>
							<span class="ab2-tool-desc">Read repos, create PRs, manage issues and code reviews</span>
						</div>
					</div>
					<div class="ab2-tool-right">
						<span class="ab2-conn-badge ab2-conn-badge--ok">Connected</span>
						<button class="ab2-toggle-pill ab2-toggle-pill--on" role="switch" aria-checked="true" aria-label="GitHub Integration enabled">
							<span class="ab2-toggle-pill-knob"></span>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={() => githubExpanded = !githubExpanded} aria-expanded={githubExpanded} aria-label="Expand GitHub settings">{githubExpanded ? '▲' : '▼'}</button>
					</div>
				</div>
				{#if githubExpanded}
					<div class="ab2-tool-config">
						<div class="ab2-field">
							<label class="ab2-label" for="ab2-gh-token">Personal Access Token</label>
							<div class="ab2-secret-row">
								<input id="ab2-gh-token" class="ab2-input ab2-input--mono ab2-input--secret" type="password" value="ghp_xxxxxxxxxxxxxxxxxxxx" autocomplete="off" />
								<button class="btn-compact btn-compact-ghost" aria-label="Reveal token">Show</button>
							</div>
						</div>
						<div class="ab2-field">
							<label class="ab2-label" for="ab2-gh-org">Default Organisation</label>
							<input id="ab2-gh-org" class="ab2-input" type="text" value="acme-corp" />
						</div>
						<div class="ab2-tool-config-actions">
							<button class="btn-rounded btn-rounded-secondary btn-rounded-sm">Test Connection</button>
							<span class="ab2-test-result ab2-test-result--ok">✓ Last tested 4 min ago</span>
						</div>
					</div>
				{/if}
			</div>

			<!-- Slack -->
			<div class="ab2-tool-card">
				<div class="ab2-tool-header">
					<div class="ab2-tool-left">
						<div class="ab2-tool-logo ab2-tool-logo--slack" aria-hidden="true">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>
						</div>
						<div class="ab2-tool-info">
							<span class="ab2-tool-name">Slack Messaging</span>
							<span class="ab2-tool-desc">Send messages, read channels, react to threads</span>
						</div>
					</div>
					<div class="ab2-tool-right">
						<span class="ab2-conn-badge ab2-conn-badge--ok">Connected</span>
						<button class="ab2-toggle-pill ab2-toggle-pill--on" role="switch" aria-checked="true" aria-label="Slack Messaging enabled">
							<span class="ab2-toggle-pill-knob"></span>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={() => slackExpanded = !slackExpanded} aria-expanded={slackExpanded} aria-label="Expand Slack settings">{slackExpanded ? '▲' : '▼'}</button>
					</div>
				</div>
				{#if slackExpanded}
					<div class="ab2-tool-config">
						<div class="ab2-field">
							<label class="ab2-label" for="ab2-slack-token">Bot Token</label>
							<div class="ab2-secret-row">
								<input id="ab2-slack-token" class="ab2-input ab2-input--mono ab2-input--secret" type="password" value="xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx" autocomplete="off" />
								<button class="btn-compact btn-compact-ghost" aria-label="Reveal token">Show</button>
							</div>
						</div>
						<div class="ab2-field">
							<label class="ab2-label" for="ab2-slack-channel">Default Channel</label>
							<input id="ab2-slack-channel" class="ab2-input" type="text" value="#ai-agents" />
						</div>
						<div class="ab2-tool-config-actions">
							<button class="btn-rounded btn-rounded-secondary btn-rounded-sm">Test Connection</button>
							<span class="ab2-test-result ab2-test-result--ok">✓ Last tested 12 min ago</span>
						</div>
					</div>
				{/if}
			</div>

			<!-- PostgreSQL (disconnected) -->
			<div class="ab2-tool-card ab2-tool-card--disabled">
				<div class="ab2-tool-header">
					<div class="ab2-tool-left">
						<div class="ab2-tool-logo ab2-tool-logo--postgres" aria-hidden="true">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.258 10.31.443 9.366.79c-.018-.012-.045-.026-.06-.036C7.776.26 6.09.29 4.7.518 3.51.72 2.45 1.07 1.76 1.5 1.075 1.925.63 2.39.32 3.1.015 3.8.006 4.7.004 5.6c-.001.9.005 2.12.085 3.4a39.87 39.87 0 0 0 .69 5.4c.37 1.8 1.047 3.6 2.138 4.69a3.94 3.94 0 0 0 2.87 1.21c.64 0 1.22-.16 1.784-.42 0 .02-.007.04-.007.06 0 .7.042 1.38.388 1.87.345.5.97.78 1.993.78.97 0 1.75-.29 2.245-.86.49-.57.678-1.36.678-2.22v-.31c.36.06.733.1 1.123.1.68 0 1.28-.1 1.79-.27v.1c0 .88.293 1.7.898 2.28.606.58 1.47.87 2.573.87 1.038 0 1.9-.31 2.484-.87.36-.34.614-.77.752-1.24a10.268 10.268 0 0 0 2.394-3.32c.537-1.18.87-2.5 1.02-3.85.27-2.64.01-5.36-.75-7.3-.76-1.94-2.07-3.15-3.87-3.38a7.21 7.21 0 0 0-.88-.055z"/></svg>
						</div>
						<div class="ab2-tool-info">
							<span class="ab2-tool-name">PostgreSQL Query</span>
							<span class="ab2-tool-desc">Execute read-only SQL queries against connected databases</span>
						</div>
					</div>
					<div class="ab2-tool-right">
						<span class="ab2-conn-badge ab2-conn-badge--err">Disconnected</span>
						<button class="ab2-toggle-pill" role="switch" aria-checked="false" aria-label="PostgreSQL Query disabled">
							<span class="ab2-toggle-pill-knob"></span>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={() => postgresExpanded = !postgresExpanded} aria-expanded={postgresExpanded} aria-label="Expand PostgreSQL settings">{postgresExpanded ? '▲' : '▼'}</button>
					</div>
				</div>
				{#if postgresExpanded}
					<div class="ab2-tool-config">
						<div class="ab2-field">
							<label class="ab2-label" for="ab2-pg-url">Connection URL</label>
							<div class="ab2-secret-row">
								<input id="ab2-pg-url" class="ab2-input ab2-input--mono ab2-input--secret" type="password" placeholder="postgresql://user:pass@host:5432/db" autocomplete="off" />
								<button class="btn-compact btn-compact-ghost" aria-label="Reveal connection URL">Show</button>
							</div>
						</div>
						<div class="ab2-tool-config-actions">
							<button class="btn-rounded btn-rounded-secondary btn-rounded-sm">Test Connection</button>
							<span class="ab2-test-result ab2-test-result--err">✗ Connection refused</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- 6. Agent Deployment -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent Deployment</h3>
		<p class="ds-card__sub">Deployment status card with versioning, environment selector, deploy/rollback controls, and health indicators.</p>

		<div class="ab2-deploy-wrap">
			<div class="ab2-deploy-status">
				<div class="ab2-deploy-ident">
					<div class="ab2-deploy-avatar" aria-hidden="true">R</div>
					<div class="ab2-deploy-meta">
						<span class="ab2-deploy-name">Research Analyst v2</span>
						<span class="ab2-deploy-version">
							<span class="ab2-version-chip">v2.4.1</span>
							<span class="ab2-deploy-since">deployed 3 hours ago</span>
						</span>
					</div>
				</div>
				<div class="ab2-health-indicators" role="status" aria-label="Health status">
					<div class="ab2-health-pill ab2-health-pill--ok">
						<span class="ab2-health-dot" aria-hidden="true"></span>
						Healthy
					</div>
					<div class="ab2-health-pill ab2-health-pill--ok">
						<span class="ab2-health-dot" aria-hidden="true"></span>
						0 Errors
					</div>
					<div class="ab2-health-pill ab2-health-pill--warn">
						<span class="ab2-health-dot" aria-hidden="true"></span>
						Latency ↑
					</div>
				</div>
			</div>

			<div class="ab2-deploy-metrics">
				<div class="ab2-deploy-metric">
					<span class="ab2-dm-value">2,847</span>
					<span class="ab2-dm-label">Requests today</span>
					<span class="ab2-dm-delta ab2-dm-delta--up">+12%</span>
				</div>
				<div class="ab2-deploy-metric">
					<span class="ab2-dm-value">1.4s</span>
					<span class="ab2-dm-label">Avg response</span>
					<span class="ab2-dm-delta ab2-dm-delta--down">+0.3s vs prev</span>
				</div>
				<div class="ab2-deploy-metric">
					<span class="ab2-dm-value">99.6%</span>
					<span class="ab2-dm-label">Uptime (30d)</span>
					<span class="ab2-dm-delta ab2-dm-delta--up">stable</span>
				</div>
				<div class="ab2-deploy-metric">
					<span class="ab2-dm-value">$4.12</span>
					<span class="ab2-dm-label">Cost today</span>
					<span class="ab2-dm-delta ab2-dm-delta--up">+8%</span>
				</div>
			</div>

			<div class="ab2-deploy-controls">
				<div class="ab2-deploy-env-group">
					<span class="ab2-label" id="ab2-env-label">Environment</span>
					<div class="ab2-env-tabs" role="radiogroup" aria-labelledby="ab2-env-label">
						<button class="btn-compact {deployEnv === 'dev' ? 'btn-compact-primary' : 'btn-compact-ghost'}" role="radio" aria-checked={deployEnv === 'dev'} onclick={() => deployEnv = 'dev'}>Dev</button>
						<button class="btn-compact {deployEnv === 'staging' ? 'btn-compact-primary' : 'btn-compact-ghost'}" role="radio" aria-checked={deployEnv === 'staging'} onclick={() => deployEnv = 'staging'}>Staging</button>
						<button class="btn-compact {deployEnv === 'prod' ? 'btn-compact-primary' : 'btn-compact-ghost'}" role="radio" aria-checked={deployEnv === 'prod'} onclick={() => deployEnv = 'prod'}>Production</button>
					</div>
				</div>
				<div class="ab2-deploy-btn-group">
					<button class="btn-rounded btn-rounded-ghost btn-rounded-sm" aria-label="Rollback to v2.4.0">↩ Rollback to v2.4.0</button>
					<button
						class="btn-pill btn-pill-primary {deployLoading ? 'btn-pill-loading' : ''}"
						onclick={triggerDeploy}
						disabled={deployLoading}
						aria-label="Deploy to {deployEnv}"
						aria-busy={deployLoading}
					>
						{#if deployLoading}
							Deploying...
						{:else}
							Deploy to {deployEnv.charAt(0).toUpperCase() + deployEnv.slice(1)}
						{/if}
					</button>
				</div>
			</div>

			<div class="ab2-version-history">
				<span class="ab2-debug-heading">Version History</span>
				<div class="ab2-versions">
					<div class="ab2-version-row ab2-version-row--current">
						<div class="ab2-vr-left">
							<span class="ab2-vr-dot ab2-vr-dot--current" aria-hidden="true"></span>
							<span class="ab2-vr-ver">v2.4.1</span>
							<span class="ab2-vr-msg">Update system prompt with citation guidelines</span>
						</div>
						<div class="ab2-vr-right">
							<span class="ab2-vr-env">staging</span>
							<span class="ab2-vr-time">3h ago</span>
						</div>
					</div>
					<div class="ab2-version-row">
						<div class="ab2-vr-left">
							<span class="ab2-vr-dot" aria-hidden="true"></span>
							<span class="ab2-vr-ver">v2.4.0</span>
							<span class="ab2-vr-msg">Add PostgreSQL tool support</span>
						</div>
						<div class="ab2-vr-right">
							<span class="ab2-vr-env">prod</span>
							<span class="ab2-vr-time">2d ago</span>
						</div>
					</div>
					<div class="ab2-version-row">
						<div class="ab2-vr-left">
							<span class="ab2-vr-dot" aria-hidden="true"></span>
							<span class="ab2-vr-ver">v2.3.2</span>
							<span class="ab2-vr-msg">Fix temperature rounding bug</span>
						</div>
						<div class="ab2-vr-right">
							<span class="ab2-vr-env">prod</span>
							<span class="ab2-vr-time">5d ago</span>
						</div>
					</div>
					<div class="ab2-version-row">
						<div class="ab2-vr-left">
							<span class="ab2-vr-dot" aria-hidden="true"></span>
							<span class="ab2-vr-ver">v2.3.0</span>
							<span class="ab2-vr-msg">Initial web search integration</span>
						</div>
						<div class="ab2-vr-right">
							<span class="ab2-vr-env">prod</span>
							<span class="ab2-vr-time">12d ago</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</section>

<style>
	/* ─── Layout primitives ─── */
	.ab2-form-row--2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.ab2-field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.ab2-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--dt2);
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.ab2-label-badge {
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 4px;
		padding: 0.1rem 0.4rem;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--dt);
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	.ab2-label-hint {
		color: var(--dt3);
		font-weight: 400;
		font-size: 0.72rem;
	}

	/* ─── Inputs ─── */
	.ab2-input,
	.ab2-select {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 0.55rem 0.75rem;
		color: var(--dt);
		font-size: 0.875rem;
		outline: none;
		transition: border-color 0.15s;
		width: 100%;
		box-sizing: border-box;
	}

	.ab2-input:focus,
	.ab2-select:focus {
		border-color: var(--dt2);
	}

	.ab2-input--mono {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.82rem;
	}

	.ab2-input--secret {
		letter-spacing: 0.12em;
	}

	.ab2-select-wrap {
		position: relative;
	}

	.ab2-select {
		appearance: none;
		padding-right: 2rem;
	}

	.ab2-select-caret {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--dt3);
		pointer-events: none;
		font-size: 0.75rem;
	}

	.ab2-textarea {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 0.65rem 0.75rem;
		color: var(--dt);
		font-size: 0.82rem;
		font-family: 'SF Mono', 'Fira Code', monospace;
		line-height: 1.6;
		resize: vertical;
		outline: none;
		transition: border-color 0.15s;
		width: 100%;
		box-sizing: border-box;
	}

	.ab2-textarea:focus {
		border-color: var(--dt2);
	}

	/* ─── Slider ─── */
	.ab2-slider-wrap {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.ab2-slider {
		width: 100%;
		accent-color: var(--dt);
		cursor: pointer;
	}

	.ab2-slider-ticks {
		display: flex;
		justify-content: space-between;
		font-size: 0.7rem;
		color: var(--dt3);
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	/* ─── Checkboxes ─── */
	.ab2-checkboxes {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.ab2-checkbox-row {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.55rem 0.75rem;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		cursor: pointer;
		transition: border-color 0.15s;
	}

	.ab2-checkbox-row:hover {
		border-color: var(--dbd2);
	}

	.ab2-checkbox {
		width: 15px;
		height: 15px;
		accent-color: var(--dt);
		cursor: pointer;
		flex-shrink: 0;
	}

	.ab2-checkbox-icon {
		font-size: 1rem;
		flex-shrink: 0;
	}

	.ab2-checkbox-label {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--dt2);
		flex-shrink: 0;
	}

	.ab2-checkbox-desc {
		font-size: 0.76rem;
		color: var(--dt3);
		margin-left: auto;
		text-align: right;
	}

	/* ─── Config form ─── */
	.ab2-config-form {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.ab2-form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--dbd);
	}

	/* ─── Presets ─── */
	.ab2-presets-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
	}

	.ab2-preset-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		transition: border-color 0.15s;
	}

	.ab2-preset-card:hover {
		border-color: var(--dbd2);
	}

	.ab2-preset-card--selected {
		border-color: rgba(99, 102, 241, 0.5);
		background: rgba(99, 102, 241, 0.04);
	}

	.ab2-preset-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.ab2-preset-icon {
		width: 38px;
		height: 38px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ab2-preset-icon--support { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
	.ab2-preset-icon--code    { background: rgba(249, 115, 22, 0.15);  color: #f97316; }
	.ab2-preset-icon--data    { background: rgba(16, 185, 129, 0.15);  color: #10b981; }
	.ab2-preset-icon--content { background: rgba(236, 72, 153, 0.15);  color: #ec4899; }

	.ab2-preset-check {
		font-size: 0.8rem;
		color: #818cf8;
		font-weight: 700;
		background: rgba(99, 102, 241, 0.15);
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
	}

	.ab2-preset-name {
		font-weight: 700;
		color: var(--dt);
		font-size: 0.92rem;
		margin: 0;
	}

	.ab2-preset-desc {
		font-size: 0.78rem;
		color: var(--dt3);
		line-height: 1.45;
		margin: 0;
		flex: 1;
	}

	.ab2-preset-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.ab2-tag {
		font-size: 0.68rem;
		font-weight: 500;
		padding: 0.18rem 0.5rem;
		border-radius: 4px;
		background: var(--dbg3);
		color: var(--dt3);
		border: 1px solid var(--dbd);
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	/* ─── Sandbox ─── */
	.ab2-sandbox {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 1rem;
		min-height: 420px;
	}

	.ab2-sandbox-chat,
	.ab2-sandbox-debug {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.ab2-pane-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.65rem 1rem;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		flex-shrink: 0;
	}

	.ab2-pane-title {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--dt2);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.ab2-pane-badge {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}

	.ab2-pane-badge--live {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
	}

		.ab2-messages {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		overflow-y: auto;
	}

	.ab2-msg {
		display: flex;
		gap: 0.6rem;
		align-items: flex-start;
	}

	.ab2-msg-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.ab2-msg-avatar--user  { background: var(--dbg3); color: var(--dt2); }
	.ab2-msg-avatar--agent { background: #6366f1; color: #fff; }

	.ab2-msg-bubble {
		border-radius: 8px;
		padding: 0.55rem 0.8rem;
		font-size: 0.82rem;
		line-height: 1.55;
		max-width: 92%;
	}

	.ab2-msg-bubble--user {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt2);
	}

	.ab2-msg-bubble--agent {
		background: rgba(99, 102, 241, 0.06);
		border: 1px solid rgba(99, 102, 241, 0.18);
		color: var(--dt2);
	}

	.ab2-tool-call {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.32rem 0.7rem;
		margin-left: 2.2rem;
		background: rgba(250, 204, 21, 0.04);
		border: 1px solid rgba(250, 204, 21, 0.16);
		border-radius: 6px;
		font-size: 0.74rem;
	}

	.ab2-tool-name {
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: #facc15;
		font-weight: 600;
		flex-shrink: 0;
	}

	.ab2-tool-args {
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt3);
		font-size: 0.7rem;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ab2-tool-dur {
		color: var(--dt3);
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.7rem;
		flex-shrink: 0;
	}

	.ab2-sandbox-input-row {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--dbd);
		flex-shrink: 0;
	}

	.ab2-sandbox-input {
		flex: 1;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 0.5rem 0.75rem;
		color: var(--dt);
		font-size: 0.84rem;
		outline: none;
		transition: border-color 0.15s;
	}

	.ab2-sandbox-input:focus {
		border-color: var(--dt2);
	}

	/* ─── Debug panel ─── */
	.ab2-debug-section {
		padding: 0.7rem 0.9rem;
		border-bottom: 1px solid var(--dbd);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.ab2-debug-heading {
		font-size: 0.68rem;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.ab2-token-bars {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.ab2-token-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.72rem;
	}

	.ab2-token-label {
		color: var(--dt3);
		width: 38px;
		flex-shrink: 0;
	}

	.ab2-token-bar-wrap {
		flex: 1;
		height: 5px;
		background: var(--dbg3);
		border-radius: 3px;
		overflow: hidden;
	}

	.ab2-token-bar         { height: 100%; background: #818cf8; border-radius: 3px; }
	.ab2-token-bar--output { background: #34d399; }
	.ab2-token-bar--limit  { background: var(--dbd2); opacity: 0.4; }

	.ab2-token-count {
		color: var(--dt2);
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.7rem;
		width: 32px;
		text-align: right;
		flex-shrink: 0;
	}

	.ab2-debug-calls {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.ab2-debug-call {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.72rem;
	}

	.ab2-dc-name {
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt2);
		flex: 1;
	}

	.ab2-dc-status {
		font-size: 0.68rem;
		font-weight: 700;
		padding: 0.1rem 0.35rem;
		border-radius: 3px;
	}

	.ab2-dc-status--ok {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
	}

	.ab2-dc-time {
		color: var(--dt3);
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.7rem;
	}

	.ab2-debug-timing {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.ab2-timing-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.72rem;
	}

	.ab2-timing-label { color: var(--dt3); }
	.ab2-timing-val   { font-family: 'SF Mono', 'Fira Code', monospace; color: var(--dt2); }

	.ab2-timing-row--total {
		padding-top: 0.3rem;
		border-top: 1px solid var(--dbd);
		margin-top: 0.1rem;
	}

	.ab2-timing-row--total .ab2-timing-label,
	.ab2-timing-row--total .ab2-timing-val {
		color: var(--dt);
		font-weight: 700;
	}

	.ab2-debug-meta {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.ab2-dm-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.72rem;
	}

	.ab2-dm-row > span:first-child { color: var(--dt3); }
	.ab2-dm-row > span:last-child  { color: var(--dt2); font-family: 'SF Mono', 'Fira Code', monospace; }
	.ab2-dm-val--ok                { color: #22c55e !important; }

	/* ─── Prompt Editor ─── */
	.ab2-prompt-editor-wrap {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.ab2-pe-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}

	.ab2-pe-tabs {
		display: flex;
		gap: 0.2rem;
	}


	.ab2-pe-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.ab2-pe-stat {
		font-size: 0.7rem;
		color: var(--dt3);
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	.ab2-pe-versions {
		display: flex;
		gap: 0.2rem;
	}

		.ab2-pe-ver--active {
		background: rgba(99, 102, 241, 0.15);
		color: #818cf8;
		border-color: rgba(99, 102, 241, 0.3);
	}

	.ab2-pe-body {
		display: grid;
		grid-template-columns: 1fr 200px;
		min-height: 260px;
	}

	.ab2-pe-editor {
		display: flex;
		background: #0d1117;
		border-right: 1px solid var(--dbd);
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.8rem;
		line-height: 1.75;
		overflow-x: auto;
	}

	.ab2-pe-gutter {
		display: flex;
		flex-direction: column;
		padding: 0.75rem 0.75rem 0.75rem 0.5rem;
		background: rgba(255, 255, 255, 0.02);
		color: #484f58;
		text-align: right;
		user-select: none;
		border-right: 1px solid rgba(255, 255, 255, 0.05);
		font-size: 0.72rem;
		min-width: 34px;
	}

	.ab2-pe-ln { display: block; }

	.ab2-pe-code {
		flex: 1;
		padding: 0.75rem 1rem;
		color: #c9d1d9;
	}

	.ab2-pe-line {
		white-space: pre;
		min-height: 1.75em;
	}

	.ab2-pe-line--empty { min-height: 1.75em; }

	.ab2-pe-kw  { color: #ff7b72; }
	.ab2-pe-sec { color: #7ee787; }
	.ab2-pe-var { color: #79c0ff; }
	.ab2-pe-str { color: #a5d6ff; }

	.ab2-pe-sidebar {
		background: var(--dbg2);
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.ab2-pe-sidebar-title {
		font-size: 0.68rem;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.ab2-pe-vars {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.ab2-pe-var-btn {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 0.4rem 0.6rem;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.ab2-pe-var-btn:hover { border-color: #79c0ff; }

	.ab2-pe-vname { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.72rem; color: #79c0ff; display: block; }
	.ab2-pe-vval  { font-size: 0.68rem; color: var(--dt3); display: block; }

	.ab2-pe-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5rem;
		padding: 0.65rem 0.75rem;
		background: var(--dbg2);
		border-top: 1px solid var(--dbd);
	}

	/* ─── Tool cards ─── */
	.ab2-tools {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.ab2-tool-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.ab2-tool-card--disabled { opacity: 0.75; }

	.ab2-tool-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 1rem;
	}

	.ab2-tool-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.ab2-tool-logo {
		width: 36px;
		height: 36px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.ab2-tool-logo--github   { background: rgba(255, 255, 255, 0.06); color: #c9d1d9; }
	.ab2-tool-logo--slack    { background: rgba(74, 21, 75, 0.3);     color: #e879f9; }
	.ab2-tool-logo--postgres { background: rgba(51, 103, 145, 0.2);   color: #60a5fa; }

	.ab2-tool-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.ab2-tool-name { font-size: 0.88rem; font-weight: 700; color: var(--dt); }
	.ab2-tool-desc { font-size: 0.76rem; color: var(--dt3); }

	.ab2-tool-right {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.ab2-conn-badge {
		font-size: 0.68rem;
		font-weight: 600;
		padding: 0.18rem 0.55rem;
		border-radius: 4px;
	}

	.ab2-conn-badge--ok  { background: rgba(34, 197, 94, 0.12);  color: #22c55e; }
	.ab2-conn-badge--err { background: rgba(239, 68, 68, 0.12);  color: #f87171; }

	.ab2-toggle-pill {
		width: 40px;
		height: 22px;
		background: var(--dbg3);
		border-radius: 11px;
		position: relative;
		cursor: pointer;
		border: none;
		transition: background 0.2s;
		flex-shrink: 0;
	}

	.ab2-toggle-pill--on { background: #22c55e; }

	.ab2-toggle-pill-knob {
		width: 16px;
		height: 16px;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		top: 3px;
		left: 3px;
		transition: left 0.2s;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.ab2-toggle-pill--on .ab2-toggle-pill-knob { left: 21px; }

		.ab2-tool-config {
		padding: 1rem;
		border-top: 1px solid var(--dbd);
		background: var(--dbg);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.ab2-secret-row {
		display: flex;
		gap: 0.5rem;
	}

	.ab2-secret-row .ab2-input { flex: 1; }

	.ab2-tool-config-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.ab2-test-result          { font-size: 0.75rem; font-weight: 500; }
	.ab2-test-result--ok      { color: #22c55e; }
	.ab2-test-result--err     { color: #f87171; }

	/* ─── Deployment ─── */
	.ab2-deploy-wrap {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.ab2-deploy-status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
	}

	.ab2-deploy-ident {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.ab2-deploy-avatar {
		width: 42px;
		height: 42px;
		border-radius: 10px;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 700;
		font-size: 1rem;
		flex-shrink: 0;
	}

	.ab2-deploy-meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.ab2-deploy-name {
		font-weight: 700;
		color: var(--dt);
		font-size: 0.95rem;
	}

	.ab2-deploy-version {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.ab2-version-chip {
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 4px;
		padding: 0.12rem 0.45rem;
		font-size: 0.72rem;
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt2);
		font-weight: 600;
	}

	.ab2-deploy-since {
		font-size: 0.72rem;
		color: var(--dt3);
	}

	.ab2-health-indicators {
		display: flex;
		gap: 0.5rem;
	}

	.ab2-health-pill {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0.25rem 0.65rem;
		border-radius: 999px;
	}

	.ab2-health-pill--ok {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.ab2-health-pill--warn {
		background: rgba(250, 204, 21, 0.1);
		color: #facc15;
		border: 1px solid rgba(250, 204, 21, 0.2);
	}

	.ab2-health-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		display: inline-block;
	}

	.ab2-health-pill--ok .ab2-health-dot {
		animation: ab2-pulse 2s infinite;
	}

	@keyframes ab2-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.ab2-deploy-metrics {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
	}

	.ab2-deploy-metric {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.ab2-dm-value {
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--dt);
		font-family: 'SF Mono', 'Fira Code', monospace;
		line-height: 1;
	}

	.ab2-dm-label {
		font-size: 0.72rem;
		color: var(--dt3);
		margin-top: 0.15rem;
	}

	.ab2-dm-delta {
		font-size: 0.7rem;
		font-weight: 600;
		margin-top: 0.2rem;
	}

	.ab2-dm-delta--up   { color: #22c55e; }
	.ab2-dm-delta--down { color: #f87171; }

	.ab2-deploy-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 1rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
	}

	.ab2-deploy-env-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.ab2-env-tabs {
		display: flex;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 0.2rem;
		gap: 0.1rem;
	}

	.ab2-deploy-btn-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.ab2-version-history {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.ab2-versions {
		display: flex;
		flex-direction: column;
	}

	.ab2-version-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.55rem 0;
		border-bottom: 1px solid var(--dbd);
	}

	.ab2-version-row:last-child { border-bottom: none; }

	.ab2-vr-left {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.ab2-vr-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dbd2);
		flex-shrink: 0;
	}

	.ab2-vr-dot--current {
		background: #22c55e;
		box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
	}

	.ab2-vr-ver {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--dt2);
		flex-shrink: 0;
		width: 42px;
	}

	.ab2-version-row--current .ab2-vr-ver { color: var(--dt); }

	.ab2-vr-msg { font-size: 0.78rem; color: var(--dt3); }

	.ab2-version-row--current .ab2-vr-msg { color: var(--dt2); }

	.ab2-vr-right {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		flex-shrink: 0;
	}

	.ab2-vr-env {
		font-size: 0.68rem;
		font-weight: 600;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
		background: var(--dbg3);
		color: var(--dt3);
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	.ab2-vr-time {
		font-size: 0.72rem;
		color: var(--dt3);
		width: 52px;
		text-align: right;
	}

	/* ─── Responsive ─── */
	@media (max-width: 900px) {
		.ab2-sandbox {
			grid-template-columns: 1fr;
		}

		.ab2-deploy-metrics {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.ab2-form-row--2 {
			grid-template-columns: 1fr;
		}

		.ab2-presets-grid {
			grid-template-columns: 1fr;
		}

		.ab2-pe-body {
			grid-template-columns: 1fr;
		}

		.ab2-pe-sidebar {
			border-top: 1px solid var(--dbd);
		}

		.ab2-deploy-status {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.ab2-deploy-controls {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.ab2-health-indicators {
			flex-wrap: wrap;
		}

		.ab2-checkbox-desc {
			display: none;
		}
	}
</style>
