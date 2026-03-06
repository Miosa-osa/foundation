<script lang="ts">
	// ── 1. Terminal Emulator ───────────────────────────────────────
	let activeTab = $state(0);
	const tabs = ['bash', 'zsh', 'node'];

	// ── 2. Command Output Patterns ─────────────────────────────────
	// (static demo — no state needed)

	// ── 3. Terminal Tabs & Split ───────────────────────────────────
	let splitMode = $state<'none' | 'horizontal' | 'vertical'>('none');
	let activeSessionTab = $state(0);
	const sessionTabs = ['session-1', 'session-2', 'session-3'];
	let contextMenuVisible = $state(false);
	let contextMenuTab = $state(-1);

	function showContextMenu(index: number) {
		contextMenuTab = index;
		contextMenuVisible = true;
	}

	function hideContextMenu() {
		contextMenuVisible = false;
		contextMenuTab = -1;
	}

	// ── 4. Agent CLI Interface ─────────────────────────────────────
	let copiedBlock = $state(-1);

	function copyBlock(index: number) {
		copiedBlock = index;
		setTimeout(() => { copiedBlock = -1; }, 1500);
	}

	// ── 5. Terminal Settings Panel ─────────────────────────────────
	let fontSize = $state(14);
	let fontFamily = $state('monospace');
	let colorScheme = $state('dracula');
	let termOpacity = $state(95);
	let cursorStyle = $state<'block' | 'line' | 'underline'>('block');
	let bellEnabled = $state(false);
	let scrollbackLines = $state(10000);

	const fontFamilies = ['monospace', 'SF Mono', 'Fira Code', 'JetBrains Mono', 'Cascadia Code'];
	const colorSchemes = [
		{ id: 'dracula',   label: 'Dracula',   bg: '#282a36', fg: '#f8f8f2', accent: '#bd93f9' },
		{ id: 'monokai',   label: 'Monokai',   bg: '#272822', fg: '#f8f8f2', accent: '#a6e22e' },
		{ id: 'solarized', label: 'Solarized', bg: '#002b36', fg: '#839496', accent: '#268bd2' },
		{ id: 'catppuccin',label: 'Catppuccin',bg: '#1e1e2e', fg: '#cdd6f4', accent: '#cba6f7' },
	];
</script>

<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Terminal Interface</h2>
	<p class="ds-desc">
		Full-featured terminal UI components — window chrome, tab bars, split views,
		agent CLI output, command output patterns, and settings panels. Built with pure CSS,
		monospace typography, and animated interaction states.
	</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. Terminal Emulator                                       -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Terminal Emulator</h3>
		<p class="ds-card__sub">macOS-style window with traffic lights, tab bar, monospace body, colored prompt, command history, and cursor blink.</p>

		<div class="tm-window">
			<!-- Title bar -->
			<div class="tm-titlebar">
				<div class="tm-traffic">
					<span class="tm-traffic__dot tm-traffic__dot--red" aria-label="Close"></span>
					<span class="tm-traffic__dot tm-traffic__dot--yellow" aria-label="Minimize"></span>
					<span class="tm-traffic__dot tm-traffic__dot--green" aria-label="Maximize"></span>
				</div>
				<div class="tm-tabs" role="tablist" aria-label="Terminal tabs">
					{#each tabs as tab, i}
						<button
							class="tm-tab"
							class:tm-tab--active={activeTab === i}
							onclick={() => activeTab = i}
							role="tab"
							aria-selected={activeTab === i}
							aria-label="Open {tab} tab"
						>
							<span class="tm-tab__shell-icon" aria-hidden="true">$</span>
							{tab}
							<span class="tm-tab__close" aria-label="Close {tab} tab">
								<svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
									<path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
							</span>
						</button>
					{/each}
					<button class="tm-tab-new" aria-label="Open new terminal tab">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
							<path d="M12 4v16M4 12h16" stroke-width="2" stroke-linecap="round"/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Terminal body -->
			<div class="tm-body" role="tabpanel" aria-label="Terminal output for {tabs[activeTab]}">
				{#if activeTab === 0}
					<!-- bash session -->
					<div class="tm-line">
						<span class="tm-prompt">
							<span class="tm-prompt__user">miosa@macbook</span>
							<span class="tm-prompt__colon">:</span>
							<span class="tm-prompt__path">~/projects/miosa-foundation</span>
							<span class="tm-prompt__symbol">$</span>
						</span>
						<span class="tm-cmd">npm run dev</span>
					</div>
					<div class="tm-output tm-output--info">
						&gt; miosa-foundation@0.1.0 dev<br>
						&gt; vite dev
					</div>
					<div class="tm-output tm-output--success">
						VITE v5.4.0  ready in 342 ms
					</div>
					<div class="tm-output">
						<span style="color:#4ade80;">➜</span>  Local:   <span style="color:#60a5fa; text-decoration: underline;">http://localhost:5173/</span><br>
						<span style="color:#4ade80;">➜</span>  Network: <span style="color:#60a5fa; text-decoration: underline;">http://192.168.1.12:5173/</span>
					</div>
					<div class="tm-line">
						<span class="tm-prompt">
							<span class="tm-prompt__user">miosa@macbook</span>
							<span class="tm-prompt__colon">:</span>
							<span class="tm-prompt__path">~/projects/miosa-foundation</span>
							<span class="tm-prompt__symbol">$</span>
						</span>
						<span class="tm-cmd tm-cmd--active">npx svelte-check<span class="tm-cursor" aria-hidden="true"></span></span>
					</div>
				{:else if activeTab === 1}
					<!-- zsh session -->
					<div class="tm-line">
						<span class="tm-prompt">
							<span class="tm-prompt__user">miosa</span>
							<span class="tm-prompt__colon"> </span>
							<span class="tm-prompt__path">miosa-foundation</span>
							<span class="tm-prompt__symbol" style="color: #a78bfa;">❯</span>
						</span>
						<span class="tm-cmd">git log --oneline -5</span>
					</div>
					<div class="tm-output">
						<span style="color:#fb923c;">a3f9d12</span> feat: add terminal interface section<br>
						<span style="color:#fb923c;">b7e2c08</span> fix: dark mode token for hover states<br>
						<span style="color:#fb923c;">c1d4f91</span> refactor: extract shared animation keyframes<br>
						<span style="color:#fb923c;">d8a0b33</span> chore: update dependencies<br>
						<span style="color:#fb923c;">e9f5a77</span> docs: add agent guide section
					</div>
					<div class="tm-line">
						<span class="tm-prompt">
							<span class="tm-prompt__user">miosa</span>
							<span class="tm-prompt__colon"> </span>
							<span class="tm-prompt__path">miosa-foundation</span>
							<span class="tm-prompt__symbol" style="color: #a78bfa;">❯</span>
						</span>
						<span class="tm-cmd tm-cmd--active"><span class="tm-cursor" aria-hidden="true"></span></span>
					</div>
				{:else}
					<!-- node REPL -->
					<div class="tm-output tm-output--muted">Welcome to Node.js v20.11.0.<br>Type ".help" for more information.</div>
					<div class="tm-line">
						<span class="tm-prompt tm-prompt--node">
							<span class="tm-prompt__symbol" style="color: #4ade80;">&gt;</span>
						</span>
						<span class="tm-cmd">const arr = [1, 2, 3].map(x => x * 2)</span>
					</div>
					<div class="tm-output tm-output--muted">undefined</div>
					<div class="tm-line">
						<span class="tm-prompt tm-prompt--node">
							<span class="tm-prompt__symbol" style="color: #4ade80;">&gt;</span>
						</span>
						<span class="tm-cmd">arr</span>
					</div>
					<div class="tm-output tm-output--success">[ 2, 4, 6 ]</div>
					<div class="tm-line">
						<span class="tm-prompt tm-prompt--node">
							<span class="tm-prompt__symbol" style="color: #4ade80;">&gt;</span>
						</span>
						<span class="tm-cmd tm-cmd--active"><span class="tm-cursor" aria-hidden="true"></span></span>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. Command Output Patterns                                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Command Output Patterns</h3>
		<p class="ds-card__sub">Table output with aligned columns, syntax-highlighted JSON, ASCII spinner, and colored status prefixes for success / error / warning. Git log style.</p>

		<div class="tm-outputs-grid">
			<!-- Table output -->
			<div class="tm-output-block">
				<div class="tm-output-block__label">Table Output</div>
				<div class="tm-shell">
					<div class="tm-line">
						<span class="tm-prompt"><span class="tm-prompt__symbol">$</span></span>
						<span class="tm-cmd">ps aux | head -5</span>
					</div>
					<div class="tm-table-output">
						<div class="tm-table-row tm-table-row--header">
							<span class="tm-table-cell">USER</span>
							<span class="tm-table-cell">PID</span>
							<span class="tm-table-cell">%CPU</span>
							<span class="tm-table-cell">%MEM</span>
							<span class="tm-table-cell tm-table-cell--wide">COMMAND</span>
						</div>
						<div class="tm-table-row">
							<span class="tm-table-cell" style="color:#4ade80;">miosa</span>
							<span class="tm-table-cell">1</span>
							<span class="tm-table-cell">0.0</span>
							<span class="tm-table-cell">0.1</span>
							<span class="tm-table-cell tm-table-cell--wide">/sbin/launchd</span>
						</div>
						<div class="tm-table-row">
							<span class="tm-table-cell" style="color:#4ade80;">miosa</span>
							<span class="tm-table-cell">87</span>
							<span class="tm-table-cell">0.3</span>
							<span class="tm-table-cell">1.4</span>
							<span class="tm-table-cell tm-table-cell--wide">node server.js</span>
						</div>
						<div class="tm-table-row">
							<span class="tm-table-cell" style="color:#4ade80;">root</span>
							<span class="tm-table-cell">142</span>
							<span class="tm-table-cell">1.2</span>
							<span class="tm-table-cell">0.8</span>
							<span class="tm-table-cell tm-table-cell--wide">vite dev</span>
						</div>
					</div>
				</div>
			</div>

			<!-- JSON output -->
			<div class="tm-output-block">
				<div class="tm-output-block__label">JSON Output</div>
				<div class="tm-shell">
					<div class="tm-line">
						<span class="tm-prompt"><span class="tm-prompt__symbol">$</span></span>
						<span class="tm-cmd">curl api/status | jq .</span>
					</div>
					<div class="tm-json">
						<span class="tm-json__brace">&#123;</span><br>
						&nbsp;&nbsp;<span class="tm-json__key">"status"</span>: <span class="tm-json__string">"ok"</span>,<br>
						&nbsp;&nbsp;<span class="tm-json__key">"version"</span>: <span class="tm-json__string">"2.4.1"</span>,<br>
						&nbsp;&nbsp;<span class="tm-json__key">"uptime"</span>: <span class="tm-json__number">86400</span>,<br>
						&nbsp;&nbsp;<span class="tm-json__key">"healthy"</span>: <span class="tm-json__bool">true</span>,<br>
						&nbsp;&nbsp;<span class="tm-json__key">"services"</span>: <span class="tm-json__brace">[</span><br>
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="tm-json__string">"api"</span>, <span class="tm-json__string">"db"</span>, <span class="tm-json__string">"cache"</span><br>
						&nbsp;&nbsp;<span class="tm-json__brace">]</span><br>
						<span class="tm-json__brace">&#125;</span>
					</div>
				</div>
			</div>

			<!-- Status messages -->
			<div class="tm-output-block">
				<div class="tm-output-block__label">Status Messages</div>
				<div class="tm-shell">
					<div class="tm-status-line tm-status-line--success">
						<span class="tm-status-line__prefix">✔</span>
						<span>Build completed in 1.24s</span>
					</div>
					<div class="tm-status-line tm-status-line--error">
						<span class="tm-status-line__prefix">✖</span>
						<span>Port 3000 already in use</span>
					</div>
					<div class="tm-status-line tm-status-line--warn">
						<span class="tm-status-line__prefix">⚠</span>
						<span>Deprecated API: use v2 endpoint</span>
					</div>
					<div class="tm-status-line tm-status-line--info">
						<span class="tm-status-line__prefix">ℹ</span>
						<span>Watching for file changes…</span>
					</div>
					<div class="tm-status-line tm-status-line--spin">
						<span class="tm-ascii-spin" aria-label="Loading">⠋</span>
						<span>Installing dependencies…</span>
					</div>
				</div>
			</div>

			<!-- Git log style -->
			<div class="tm-output-block">
				<div class="tm-output-block__label">Git Log Style</div>
				<div class="tm-shell">
					<div class="tm-line">
						<span class="tm-prompt"><span class="tm-prompt__symbol">$</span></span>
						<span class="tm-cmd">git log --graph --oneline</span>
					</div>
					<div class="tm-gitlog">
						<div class="tm-gitlog__line">
							<span class="tm-gitlog__graph" style="color:#a78bfa;">*</span>
							<span class="tm-gitlog__hash">a3f9d12</span>
							<span class="tm-gitlog__msg">feat: terminal interface</span>
							<span class="tm-gitlog__ref">(HEAD, main)</span>
						</div>
						<div class="tm-gitlog__line">
							<span class="tm-gitlog__graph" style="color:#a78bfa;">*</span>
							<span class="tm-gitlog__hash">b7e2c08</span>
							<span class="tm-gitlog__msg">fix: dark mode tokens</span>
						</div>
						<div class="tm-gitlog__line">
							<span class="tm-gitlog__graph" style="color:#60a5fa;">|\</span>
						</div>
						<div class="tm-gitlog__line">
							<span class="tm-gitlog__graph" style="color:#60a5fa;">|</span>
							<span class="tm-gitlog__hash">c1d4f91</span>
							<span class="tm-gitlog__msg">refactor: keyframes</span>
							<span class="tm-gitlog__ref">(feature)</span>
						</div>
						<div class="tm-gitlog__line">
							<span class="tm-gitlog__graph" style="color:#a78bfa;">*</span>
							<span class="tm-gitlog__hash">d8a0b33</span>
							<span class="tm-gitlog__msg">chore: update deps</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. Terminal Tabs & Split                                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Terminal Tabs &amp; Split View</h3>
		<p class="ds-card__sub">Multi-session tab bar with active indicator, right-click context menu, and split horizontal / vertical toggle with resize handle.</p>

		<!-- Split mode controls -->
		<div class="tm-split-controls">
			<button
				class="btn-pill"
				class:btn-pill-primary={splitMode === 'none'}
				onclick={() => splitMode = 'none'}
				aria-pressed={splitMode === 'none'}
				aria-label="No split view"
			>No Split</button>
			<button
				class="btn-pill"
				class:btn-pill-primary={splitMode === 'horizontal'}
				onclick={() => splitMode = 'horizontal'}
				aria-pressed={splitMode === 'horizontal'}
				aria-label="Horizontal split"
			>Horizontal</button>
			<button
				class="btn-pill"
				class:btn-pill-primary={splitMode === 'vertical'}
				onclick={() => splitMode = 'vertical'}
				aria-pressed={splitMode === 'vertical'}
				aria-label="Vertical split"
			>Vertical</button>
		</div>

		<div class="tm-window">
			<!-- Tab bar -->
			<div class="tm-titlebar">
				<div class="tm-traffic">
					<span class="tm-traffic__dot tm-traffic__dot--red" aria-label="Close"></span>
					<span class="tm-traffic__dot tm-traffic__dot--yellow" aria-label="Minimize"></span>
					<span class="tm-traffic__dot tm-traffic__dot--green" aria-label="Maximize"></span>
				</div>
				<div class="tm-tabs" role="tablist" aria-label="Terminal sessions">
					{#each sessionTabs as stab, i}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="tm-tab"
							class:tm-tab--active={activeSessionTab === i}
							role="tab"
							aria-selected={activeSessionTab === i}
							tabindex={activeSessionTab === i ? 0 : -1}
							onclick={() => { activeSessionTab = i; hideContextMenu(); }}
							onkeydown={(e) => { if (e.key === 'Enter') { activeSessionTab = i; } }}
							oncontextmenu={(e) => { e.preventDefault(); showContextMenu(i); }}
						>
							<span class="tm-tab__shell-icon" aria-hidden="true">$</span>
							{stab}
							<button class="tm-tab__close" aria-label="Close {stab}" onclick={(e) => { e.stopPropagation(); }}>
								<svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
									<path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
							</button>
						</div>
					{/each}
					<button class="tm-tab-new" aria-label="New terminal session">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
							<path d="M12 4v16M4 12h16" stroke-width="2" stroke-linecap="round"/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Context menu -->
			{#if contextMenuVisible}
				<button class="tm-ctx-backdrop" aria-label="Close context menu" onclick={hideContextMenu}></button>
				<div class="tm-ctx-menu" role="menu" aria-label="Tab options">
					<button class="tm-ctx-item" role="menuitem" onclick={hideContextMenu}>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
						Rename Tab
					</button>
					<button class="tm-ctx-item" role="menuitem" onclick={hideContextMenu}>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
						Duplicate Tab
					</button>
					<div class="tm-ctx-sep"></div>
					<button class="tm-ctx-item tm-ctx-item--danger" role="menuitem" onclick={hideContextMenu}>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
						Close Tab
					</button>
				</div>
			{/if}

			<!-- Split body -->
			<div
				class="tm-split-body"
				class:tm-split-body--horizontal={splitMode === 'horizontal'}
				class:tm-split-body--vertical={splitMode === 'vertical'}
			>
				<div class="tm-body tm-body--split">
					<div class="tm-line">
						<span class="tm-prompt">
							<span class="tm-prompt__user">miosa@macbook</span><span class="tm-prompt__colon">:</span><span class="tm-prompt__path">~</span><span class="tm-prompt__symbol">$</span>
						</span>
						<span class="tm-cmd tm-cmd--active">ls -la<span class="tm-cursor" aria-hidden="true"></span></span>
					</div>
				</div>

				{#if splitMode !== 'none'}
					<div class="tm-resize-handle" role="separator" aria-label="Drag to resize panes" aria-orientation={splitMode === 'horizontal' ? 'horizontal' : 'vertical'}>
						<span class="tm-resize-handle__grip" aria-hidden="true"></span>
					</div>
					<div class="tm-body tm-body--split">
						<div class="tm-line">
							<span class="tm-prompt">
								<span class="tm-prompt__user">miosa@macbook</span><span class="tm-prompt__colon">:</span><span class="tm-prompt__path">~/projects</span><span class="tm-prompt__symbol">$</span>
							</span>
							<span class="tm-cmd tm-cmd--active">git status<span class="tm-cursor" aria-hidden="true"></span></span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. Agent CLI Interface                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Agent CLI Interface</h3>
		<p class="ds-card__sub">Agent name badge, streaming text output with typing animation, inline tool call cards, thinking indicator, response timestamps, and per-block copy buttons.</p>

		<div class="tm-agent-cli">
			<!-- Agent header -->
			<div class="tm-agent-header">
				<div class="tm-agent-badge">
					<span class="tm-agent-badge__dot" aria-hidden="true"></span>
					<span class="tm-agent-badge__name">OSA Agent</span>
				</div>
				<span class="tm-agent-header__model">claude-opus-4</span>
				<span class="tm-agent-header__ts">14:32:01</span>
			</div>

			<!-- User prompt -->
			<div class="tm-agent-row tm-agent-row--user">
				<div class="tm-agent-prompt">
					<span class="tm-agent-prompt__icon" aria-hidden="true">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
						</svg>
					</span>
					<span class="tm-agent-prompt__text">Analyze the project dependencies and check for security vulnerabilities in the top 5 packages.</span>
				</div>
			</div>

			<!-- Thinking indicator -->
			<div class="tm-agent-row">
				<div class="tm-thinking">
					<span class="tm-thinking__label">Thinking</span>
					<span class="tm-thinking__dots" aria-label="Processing">
						<span class="tm-thinking__dot"></span>
						<span class="tm-thinking__dot"></span>
						<span class="tm-thinking__dot"></span>
					</span>
				</div>
			</div>

			<!-- Tool call card: read package.json -->
			<div class="tm-agent-row">
				<div class="tm-agent-tool-card">
					<div class="tm-agent-tool-card__header">
						<span class="tm-agent-tool-card__icon" aria-hidden="true">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
							</svg>
						</span>
						<span class="tm-agent-tool-card__name">read_file</span>
						<span class="tm-agent-tool-card__arg">package.json</span>
						<span class="tm-agent-tool-card__status tm-agent-tool-card__status--done">done · 0.1s</span>
					</div>
				</div>
			</div>

			<!-- Tool call card: web search (running) -->
			<div class="tm-agent-row">
				<div class="tm-agent-tool-card tm-agent-tool-card--running">
					<div class="tm-agent-tool-card__header">
						<span class="tm-agent-tool-card__icon" aria-hidden="true">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
							</svg>
						</span>
						<span class="tm-agent-tool-card__name">web_search</span>
						<span class="tm-agent-tool-card__arg">CVE lodash 4.17</span>
						<span class="tm-agent-tool-card__spin" aria-label="Running"></span>
					</div>
				</div>
			</div>

			<!-- Streaming response block -->
			<div class="tm-agent-row tm-agent-row--response">
				<div class="tm-agent-block">
					<div class="tm-agent-block__header">
						<span class="tm-agent-block__label">Response</span>
						<span class="tm-agent-block__ts">14:32:08</span>
						<button
							class="tm-agent-block__copy btn-pill"
							onclick={() => copyBlock(0)}
							aria-label="Copy response"
						>
							{#if copiedBlock === 0}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
								Copied
							{:else}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
								Copy
							{/if}
						</button>
					</div>
					<div class="tm-agent-block__content tm-agent-block__content--streaming">
						<p>Found <strong>3 critical CVEs</strong> across your top 5 dependencies:</p>
						<div class="tm-agent-vuln">
							<span class="tm-agent-vuln__badge tm-agent-vuln__badge--critical">CRITICAL</span>
							<span class="tm-agent-vuln__pkg">lodash@4.17.20</span>
							<span class="tm-agent-vuln__desc">Prototype pollution — CVE-2021-23337</span>
						</div>
						<div class="tm-agent-vuln">
							<span class="tm-agent-vuln__badge tm-agent-vuln__badge--high">HIGH</span>
							<span class="tm-agent-vuln__pkg">axios@0.21.1</span>
							<span class="tm-agent-vuln__desc">SSRF via redirect — CVE-2020-28168</span>
						</div>
						<div class="tm-agent-vuln">
							<span class="tm-agent-vuln__badge tm-agent-vuln__badge--medium">MEDIUM</span>
							<span class="tm-agent-vuln__pkg">minimist@1.2.5</span>
							<span class="tm-agent-vuln__desc">Prototype pollution — CVE-2021-44906</span>
						</div>
						<p class="tm-agent-block__stream-cursor" aria-hidden="true"></p>
					</div>
				</div>
			</div>

			<!-- Code block with copy -->
			<div class="tm-agent-row">
				<div class="tm-agent-block">
					<div class="tm-agent-block__header">
						<span class="tm-agent-block__label">bash</span>
						<button
							class="tm-agent-block__copy btn-pill"
							onclick={() => copyBlock(1)}
							aria-label="Copy code block"
						>
							{#if copiedBlock === 1}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
								Copied
							{:else}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
								Copy
							{/if}
						</button>
					</div>
					<pre class="tm-agent-code">npm update lodash axios minimist
npm audit fix --force</pre>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. Terminal Settings Panel                                 -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Terminal Settings Panel</h3>
		<p class="ds-card__sub">Font size slider, font family selector, color scheme swatches (Dracula / Monokai / Solarized / Catppuccin), opacity slider, cursor style radio, bell toggle, and scrollback input.</p>

		<div class="tm-settings">
			<!-- Preview swatch -->
			<div
				class="tm-settings-preview"
				style="background: {colorSchemes.find(s => s.id === colorScheme)?.bg ?? '#282a36'}; font-family: {fontFamily}, monospace; opacity: {termOpacity / 100};"
			>
				<div class="tm-settings-preview__line">
					<span style="color:#4ade80;">miosa@term</span><span style="color: {colorSchemes.find(s => s.id === colorScheme)?.fg ?? '#f8f8f2'};">:</span><span style="color:#60a5fa;">~</span><span style="color: {colorSchemes.find(s => s.id === colorScheme)?.fg ?? '#f8f8f2'};">$ </span><span style="color: {colorSchemes.find(s => s.id === colorScheme)?.accent ?? '#bd93f9'};">echo</span><span style="color: {colorSchemes.find(s => s.id === colorScheme)?.fg ?? '#f8f8f2'}; font-size: {fontSize}px;"> "Hello, terminal!"</span>
				</div>
				<div class="tm-settings-preview__line" style="color: {colorSchemes.find(s => s.id === colorScheme)?.fg ?? '#f8f8f2'}; font-size: {fontSize}px;">
					Hello, terminal!
				</div>
				<div class="tm-settings-preview__cursor" style="background: {colorSchemes.find(s => s.id === colorScheme)?.fg ?? '#f8f8f2'}; width: {cursorStyle === 'block' ? '10px' : cursorStyle === 'line' ? '2px' : '10px'}; height: {cursorStyle === 'underline' ? '2px' : '16px'}; margin-top: {cursorStyle === 'underline' ? '2px' : '0'};" aria-hidden="true"></div>
			</div>

			<div class="tm-settings-form">
				<!-- Font size -->
				<div class="tm-settings-row">
					<label class="tm-settings-label" for="tm-font-size">Font Size</label>
					<div class="tm-settings-control">
						<input
							id="tm-font-size"
							type="range"
							min="10"
							max="24"
							step="1"
							bind:value={fontSize}
							class="tm-slider"
							aria-label="Font size: {fontSize}px"
						/>
						<span class="tm-settings-value">{fontSize}px</span>
					</div>
				</div>

				<!-- Font family -->
				<div class="tm-settings-row">
					<label class="tm-settings-label" for="tm-font-family">Font Family</label>
					<div class="tm-settings-control">
						<select id="tm-font-family" class="tm-select" bind:value={fontFamily} aria-label="Font family">
							{#each fontFamilies as ff}
								<option value={ff}>{ff}</option>
							{/each}
						</select>
					</div>
				</div>

				<!-- Color scheme -->
				<div class="tm-settings-row tm-settings-row--col">
					<span class="tm-settings-label">Color Scheme</span>
					<div class="tm-scheme-swatches" role="radiogroup" aria-label="Color scheme">
						{#each colorSchemes as scheme}
							<button
								class="tm-scheme-swatch"
								class:tm-scheme-swatch--active={colorScheme === scheme.id}
								onclick={() => colorScheme = scheme.id}
								role="radio"
								aria-checked={colorScheme === scheme.id}
								aria-label="Select {scheme.label} theme"
								style="--swatch-bg: {scheme.bg}; --swatch-fg: {scheme.fg}; --swatch-accent: {scheme.accent};"
							>
								<span class="tm-scheme-swatch__preview" aria-hidden="true">
									<span style="background: {scheme.bg}; width: 100%; height: 100%; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 3px; padding: 4px; box-sizing: border-box;">
										<span style="width:6px; height:6px; border-radius:50%; background:{scheme.accent};"></span>
										<span style="width:6px; height:6px; border-radius:50%; background:{scheme.fg}; opacity:0.5;"></span>
										<span style="width:6px; height:6px; border-radius:50%; background:{scheme.fg}; opacity:0.3;"></span>
									</span>
								</span>
								<span class="tm-scheme-swatch__label">{scheme.label}</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Opacity -->
				<div class="tm-settings-row">
					<label class="tm-settings-label" for="tm-opacity">Opacity</label>
					<div class="tm-settings-control">
						<input
							id="tm-opacity"
							type="range"
							min="40"
							max="100"
							step="1"
							bind:value={termOpacity}
							class="tm-slider"
							aria-label="Terminal opacity: {termOpacity}%"
						/>
						<span class="tm-settings-value">{termOpacity}%</span>
					</div>
				</div>

				<!-- Cursor style -->
				<div class="tm-settings-row tm-settings-row--col">
					<span class="tm-settings-label">Cursor Style</span>
					<div class="tm-cursor-radios" role="radiogroup" aria-label="Cursor style">
						{#each (['block', 'line', 'underline'] as const) as style}
							<label class="tm-cursor-radio" aria-label="{style} cursor">
								<input
									type="radio"
									name="cursor-style"
									value={style}
									bind:group={cursorStyle}
									class="tm-cursor-radio__input"
								/>
								<span class="tm-cursor-radio__box" aria-hidden="true">
									<span
										class="tm-cursor-radio__shape"
										style="
											width: {style === 'block' ? '10px' : style === 'line' ? '2px' : '12px'};
											height: {style === 'underline' ? '2px' : '14px'};
											margin-top: {style === 'underline' ? '12px' : '0'};
										"
									></span>
								</span>
								<span class="tm-cursor-radio__label">{style.charAt(0).toUpperCase() + style.slice(1)}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Bell toggle -->
				<div class="tm-settings-row">
					<label class="tm-settings-label" for="tm-bell">Bell Sound</label>
					<div class="tm-settings-control">
						<button
							id="tm-bell"
							class="tm-toggle"
							class:tm-toggle--on={bellEnabled}
							onclick={() => bellEnabled = !bellEnabled}
							role="switch"
							aria-checked={bellEnabled}
							aria-label="Bell sound {bellEnabled ? 'enabled' : 'disabled'}"
						>
							<span class="tm-toggle__thumb" aria-hidden="true"></span>
						</button>
						<span class="tm-settings-value">{bellEnabled ? 'On' : 'Off'}</span>
					</div>
				</div>

				<!-- Scrollback lines -->
				<div class="tm-settings-row">
					<label class="tm-settings-label" for="tm-scrollback">Scrollback</label>
					<div class="tm-settings-control">
						<input
							id="tm-scrollback"
							type="number"
							min="100"
							max="100000"
							step="1000"
							bind:value={scrollbackLines}
							class="tm-number-input"
							aria-label="Scrollback lines"
						/>
						<span class="tm-settings-value">lines</span>
					</div>
				</div>

				<!-- Save row -->
				<div class="tm-settings-actions">
					<button class="btn-pill" aria-label="Reset to defaults">Reset</button>
					<button class="btn-pill btn-pill-primary" aria-label="Save terminal settings">Save Settings</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  SHARED TERMINAL CHROME                                       */
	/* ══════════════════════════════════════════════════════════════ */
	.tm-window {
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: #1a1a1a;
		box-shadow:
			0 0 0 1px rgba(0,0,0,0.3),
			0 16px 48px rgba(0,0,0,0.5);
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
		font-size: 13px;
		max-width: 700px;
		position: relative;
	}

	/* ── Title bar ───────────────────────────────────────────────── */
	.tm-titlebar {
		display: flex;
		align-items: center;
		gap: 0;
		background: #252525;
		border-bottom: 1px solid rgba(255,255,255,0.06);
		height: 38px;
		padding: 0 12px;
		user-select: none;
	}

	/* ── Traffic lights ──────────────────────────────────────────── */
	.tm-traffic {
		display: flex;
		align-items: center;
		gap: 7px;
		padding-right: 14px;
		flex-shrink: 0;
	}

	.tm-traffic__dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
		cursor: pointer;
		transition: filter 0.15s;
	}

	.tm-traffic__dot:hover {
		filter: brightness(1.15);
	}

	.tm-traffic__dot--red    { background: #ff5f57; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.25); }
	.tm-traffic__dot--yellow { background: #febc2e; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.25); }
	.tm-traffic__dot--green  { background: #28c840; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.25); }

	/* ── Tab bar ─────────────────────────────────────────────────── */
	.tm-tabs {
		display: flex;
		align-items: stretch;
		gap: 1px;
		flex: 1;
		overflow: hidden;
	}

	.tm-tab {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0 12px;
		height: 38px;
		font-size: 12px;
		font-family: inherit;
		color: rgba(255,255,255,0.4);
		background: transparent;
		border: none;
		border-right: 1px solid rgba(255,255,255,0.05);
		cursor: pointer;
		white-space: nowrap;
		transition: color 0.12s, background 0.12s;
		text-align: left;
	}

	.tm-tab:hover {
		color: rgba(255,255,255,0.65);
		background: rgba(255,255,255,0.03);
	}

	.tm-tab--active {
		color: rgba(255,255,255,0.9);
		background: #1a1a1a;
		border-bottom: 2px solid rgba(255,255,255,0.25);
		font-weight: 500;
	}

	.tm-tab__shell-icon {
		font-size: 10px;
		opacity: 0.5;
	}

	.tm-tab__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 3px;
		color: rgba(255,255,255,0.3);
		transition: color 0.1s, background 0.1s;
	}

	.tm-tab__close:hover {
		color: rgba(255,255,255,0.7);
		background: rgba(255,255,255,0.08);
	}

	.tm-tab-new {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 38px;
		background: transparent;
		border: none;
		cursor: pointer;
		color: rgba(255,255,255,0.3);
		transition: color 0.12s;
		margin-left: 2px;
	}

	.tm-tab-new:hover {
		color: rgba(255,255,255,0.6);
	}

	/* ── Terminal body ───────────────────────────────────────────── */
	.tm-body {
		padding: 14px 16px 16px;
		min-height: 140px;
		background: #1a1a1a;
		display: flex;
		flex-direction: column;
		gap: 4px;
		overflow-x: auto;
	}

	.tm-body--split {
		flex: 1;
		min-height: 100px;
	}

	/* ── Prompt ──────────────────────────────────────────────────── */
	.tm-line {
		display: flex;
		align-items: baseline;
		gap: 6px;
		flex-wrap: nowrap;
	}

	.tm-prompt {
		display: inline-flex;
		align-items: baseline;
		gap: 0;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.tm-prompt--node {
		flex-shrink: 0;
	}

	.tm-prompt__user {
		color: #4ade80;
		font-weight: 600;
	}

	.tm-prompt__colon {
		color: rgba(255,255,255,0.5);
	}

	.tm-prompt__path {
		color: #60a5fa;
	}

	.tm-prompt__symbol {
		color: rgba(255,255,255,0.75);
		margin-left: 2px;
		margin-right: 6px;
	}

	/* ── Command ─────────────────────────────────────────────────── */
	.tm-cmd {
		color: rgba(255,255,255,0.9);
		white-space: pre;
		display: inline-flex;
		align-items: baseline;
	}

	.tm-cmd--active {
		letter-spacing: inherit;
	}

	/* ── Cursor blink ────────────────────────────────────────────── */
	.tm-cursor {
		display: inline-block;
		width: 8px;
		height: 15px;
		background: rgba(255,255,255,0.8);
		border-radius: 1px;
		margin-left: 1px;
		vertical-align: text-bottom;
		animation: tm-cursor-blink 1s step-end infinite;
	}

	@keyframes tm-cursor-blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}

	/* ── Output lines ────────────────────────────────────────────── */
	.tm-output {
		color: rgba(255,255,255,0.7);
		line-height: 1.6;
		padding-left: 0;
		white-space: pre-wrap;
	}

	.tm-output--success { color: #4ade80; }
	.tm-output--info    { color: #60a5fa; }
	.tm-output--muted   { color: rgba(255,255,255,0.35); }

	/* ══════════════════════════════════════════════════════════════ */
	/*  COMMAND OUTPUT PATTERNS                                       */
	/* ══════════════════════════════════════════════════════════════ */
	.tm-outputs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 16px;
	}

	.tm-output-block {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.tm-output-block__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
	}

	.tm-shell {
		background: #1a1a1a;
		border-radius: 10px;
		padding: 12px 14px;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		border: 1px solid rgba(255,255,255,0.07);
		display: flex;
		flex-direction: column;
		gap: 4px;
		overflow-x: auto;
	}

	/* ── Table output ────────────────────────────────────────────── */
	.tm-table-output {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.tm-table-row {
		display: flex;
		gap: 0;
		color: rgba(255,255,255,0.7);
	}

	.tm-table-row--header {
		color: rgba(255,255,255,0.35);
		font-weight: 600;
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 3px;
	}

	.tm-table-cell {
		min-width: 56px;
		padding-right: 12px;
		font-variant-numeric: tabular-nums;
	}

	.tm-table-cell--wide {
		min-width: 120px;
	}

	/* ── JSON syntax highlight ───────────────────────────────────── */
	.tm-json {
		color: rgba(255,255,255,0.7);
		line-height: 1.7;
		padding-left: 4px;
	}

	.tm-json__key    { color: #60a5fa; }
	.tm-json__string { color: #86efac; }
	.tm-json__number { color: #fb923c; }
	.tm-json__bool   { color: #f472b6; }
	.tm-json__brace  { color: rgba(255,255,255,0.5); }

	/* ── Status messages ─────────────────────────────────────────── */
	.tm-status-line {
		display: flex;
		align-items: baseline;
		gap: 8px;
		line-height: 1.6;
	}

	.tm-status-line__prefix {
		font-weight: 700;
		flex-shrink: 0;
		width: 14px;
		display: inline-block;
	}

	.tm-status-line--success { color: #4ade80; }
	.tm-status-line--error   { color: #f87171; }
	.tm-status-line--warn    { color: #fbbf24; }
	.tm-status-line--info    { color: #60a5fa; }
	.tm-status-line--spin    { color: rgba(255,255,255,0.6); }

	/* ── ASCII spinner ───────────────────────────────────────────── */
	.tm-ascii-spin {
		display: inline-block;
		animation: tm-ascii-spin 0.7s steps(8) infinite;
		font-style: normal;
		width: 14px;
	}

	@keyframes tm-ascii-spin {
		0%   { content: '⠋'; }
		12%  { content: '⠙'; }
		25%  { content: '⠹'; }
		37%  { content: '⠸'; }
		50%  { content: '⠼'; }
		62%  { content: '⠴'; }
		75%  { content: '⠦'; }
		87%  { content: '⠧'; }
		100% { content: '⠇'; }
	}

	/* ── Git log ─────────────────────────────────────────────────── */
	.tm-gitlog {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.tm-gitlog__line {
		display: flex;
		gap: 8px;
		align-items: baseline;
		line-height: 1.6;
	}

	.tm-gitlog__graph {
		font-family: monospace;
		width: 16px;
		flex-shrink: 0;
	}

	.tm-gitlog__hash {
		color: #fb923c;
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}

	.tm-gitlog__msg {
		color: rgba(255,255,255,0.75);
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tm-gitlog__ref {
		color: #60a5fa;
		flex-shrink: 0;
		font-size: 11px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TERMINAL TABS & SPLIT                                         */
	/* ══════════════════════════════════════════════════════════════ */
	.tm-split-controls {
		display: flex;
		gap: 8px;
		margin-bottom: 16px;
	}

	.tm-split-body {
		display: flex;
		flex-direction: column;
		min-height: 100px;
	}

	.tm-split-body--horizontal {
		flex-direction: row;
	}

	.tm-split-body--vertical {
		flex-direction: column;
	}

	/* ── Resize handle ───────────────────────────────────────────── */
	.tm-resize-handle {
		background: rgba(255,255,255,0.06);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: col-resize;
		transition: background 0.15s;
		flex-shrink: 0;
	}

	.tm-split-body--horizontal .tm-resize-handle {
		width: 5px;
		cursor: col-resize;
		flex-direction: column;
	}

	.tm-split-body--vertical .tm-resize-handle {
		height: 5px;
		cursor: row-resize;
		flex-direction: row;
	}

	.tm-resize-handle:hover {
		background: rgba(255,255,255,0.14);
	}

	.tm-resize-handle__grip {
		background: rgba(255,255,255,0.25);
		border-radius: 2px;
	}

	.tm-split-body--horizontal .tm-resize-handle__grip {
		width: 2px;
		height: 24px;
	}

	.tm-split-body--vertical .tm-resize-handle__grip {
		width: 24px;
		height: 2px;
	}

	/* ── Context menu ────────────────────────────────────────────── */
	.tm-ctx-backdrop {
		position: absolute;
		inset: 0;
		z-index: 10;
		background: transparent;
		border: none;
		cursor: default;
		padding: 0;
	}

	.tm-ctx-menu {
		position: absolute;
		top: 42px;
		left: 100px;
		z-index: 20;
		background: rgba(28, 28, 30, 0.96);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 10px;
		padding: 5px;
		min-width: 160px;
		box-shadow: 0 12px 32px rgba(0,0,0,0.5);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	.tm-ctx-item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 7px 10px;
		border: none;
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		font-size: 13px;
		font-family: inherit;
		color: rgba(255,255,255,0.8);
		text-align: left;
		transition: background 0.1s;
	}

	.tm-ctx-item:hover {
		background: rgba(255,255,255,0.07);
	}

	.tm-ctx-item--danger {
		color: #f87171;
	}

	.tm-ctx-item--danger:hover {
		background: rgba(248, 113, 113, 0.1);
	}

	.tm-ctx-sep {
		height: 1px;
		background: rgba(255,255,255,0.07);
		margin: 4px 0;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  AGENT CLI INTERFACE                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.tm-agent-cli {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 660px;
		font-family: inherit;
	}

	/* ── Agent header ────────────────────────────────────────────── */
	.tm-agent-header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--dbd);
	}

	.tm-agent-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}

	.tm-agent-badge__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		animation: tm-dot-pulse 1.5s ease-in-out infinite;
	}

	@keyframes tm-dot-pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.6; transform: scale(0.8); }
	}

	.tm-agent-badge__name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}

	.tm-agent-header__model {
		font-size: 11px;
		color: var(--dt3);
		font-family: 'SF Mono', monospace;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 5px;
		padding: 2px 7px;
	}

	.tm-agent-header__ts {
		font-size: 11px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
		margin-left: auto;
	}

	/* ── Rows ────────────────────────────────────────────────────── */
	.tm-agent-row {
		display: flex;
	}

	.tm-agent-row--user {
		justify-content: flex-end;
	}

	.tm-agent-row--response {
		flex-direction: column;
	}

	/* ── User prompt bubble ──────────────────────────────────────── */
	.tm-agent-prompt {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		background: var(--dt);
		color: var(--dbg);
		border-radius: 12px;
		border-bottom-right-radius: 4px;
		padding: 10px 14px;
		max-width: 80%;
		font-size: 13.5px;
		line-height: 1.5;
		font-weight: 500;
	}

	:global(.dark) .tm-agent-prompt {
		background: rgba(255,255,255,0.9);
		color: #111;
	}

	.tm-agent-prompt__icon {
		flex-shrink: 0;
		margin-top: 2px;
		opacity: 0.6;
	}

	.tm-agent-prompt__text {
		flex: 1;
	}

	/* ── Thinking indicator ──────────────────────────────────────── */
	.tm-thinking {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		font-size: 12px;
		color: var(--dt3);
	}

	.tm-thinking__label {
		font-weight: 500;
	}

	.tm-thinking__dots {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.tm-thinking__dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--dt3);
		animation: tm-thinking-bounce 1.4s ease-in-out infinite;
	}

	.tm-thinking__dot:nth-child(2) { animation-delay: 0.16s; }
	.tm-thinking__dot:nth-child(3) { animation-delay: 0.32s; }

	@keyframes tm-thinking-bounce {
		0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
		40%            { transform: scale(1);   opacity: 1;   }
	}

	/* ── Tool call card ──────────────────────────────────────────── */
	.tm-agent-tool-card {
		display: flex;
		flex-direction: column;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
		overflow: hidden;
		max-width: 480px;
	}

	.tm-agent-tool-card--running {
		border-color: var(--dbd2);
		animation: tm-tool-pulse 2s ease-in-out infinite;
	}

	@keyframes tm-tool-pulse {
		0%, 100% { border-color: var(--dbd); }
		50%       { border-color: var(--dbd2); }
	}

	.tm-agent-tool-card__header {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 8px 12px;
	}

	.tm-agent-tool-card__icon {
		color: var(--dt3);
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.tm-agent-tool-card__name {
		font-size: 12px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-weight: 600;
		color: var(--dt2);
	}

	.tm-agent-tool-card__arg {
		font-size: 11px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt3);
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 4px;
		padding: 1px 6px;
	}

	.tm-agent-tool-card__status {
		font-size: 11px;
		color: var(--dt4);
		margin-left: auto;
		font-variant-numeric: tabular-nums;
	}

	.tm-agent-tool-card__status--done {
		color: #16a34a;
	}

	:global(.dark) .tm-agent-tool-card__status--done {
		color: #4ade80;
	}

	.tm-agent-tool-card__spin {
		margin-left: auto;
		display: inline-block;
		width: 13px;
		height: 13px;
		border: 1.5px solid var(--dbd2);
		border-top-color: var(--dt3);
		border-radius: 50%;
		animation: tm-rotate 0.7s linear infinite;
		flex-shrink: 0;
	}

	@keyframes tm-rotate {
		to { transform: rotate(360deg); }
	}

	/* ── Response block ──────────────────────────────────────────── */
	.tm-agent-block {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		width: 100%;
	}

	.tm-agent-block__header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg3);
	}

	.tm-agent-block__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
		font-family: 'SF Mono', monospace;
	}

	.tm-agent-block__ts {
		font-size: 11px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
	}

	.tm-agent-block__copy {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		padding: 3px 10px;
	}

	.tm-agent-block__content {
		padding: 14px 16px;
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--dt2);
	}

	.tm-agent-block__content p {
		margin: 0 0 10px;
	}

	.tm-agent-block__content p:last-child {
		margin-bottom: 0;
	}

	.tm-agent-block__content strong {
		color: var(--dt);
		font-weight: 600;
	}

	/* Streaming cursor */
	.tm-agent-block__stream-cursor::after {
		content: '';
		display: inline-block;
		width: 8px;
		height: 14px;
		background: var(--dt3);
		border-radius: 1px;
		margin-left: 2px;
		vertical-align: text-bottom;
		animation: tm-cursor-blink 0.9s step-end infinite;
	}

	/* ── Vulnerability rows ──────────────────────────────────────── */
	.tm-agent-vuln {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}

	.tm-agent-vuln__badge {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		padding: 2px 7px;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.tm-agent-vuln__badge--critical {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.25);
	}

	.tm-agent-vuln__badge--high {
		background: rgba(249, 115, 22, 0.15);
		color: #f97316;
		border: 1px solid rgba(249, 115, 22, 0.25);
	}

	.tm-agent-vuln__badge--medium {
		background: rgba(234, 179, 8, 0.12);
		color: #ca8a04;
		border: 1px solid rgba(234, 179, 8, 0.2);
	}

	:global(.dark) .tm-agent-vuln__badge--medium {
		color: #facc15;
		border-color: rgba(250, 204, 21, 0.25);
		background: rgba(250, 204, 21, 0.1);
	}

	.tm-agent-vuln__pkg {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 12px;
		color: var(--dt2);
		font-weight: 600;
	}

	.tm-agent-vuln__desc {
		font-size: 12px;
		color: var(--dt3);
	}

	/* ── Code block ──────────────────────────────────────────────── */
	.tm-agent-code {
		margin: 0;
		padding: 14px 16px;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12.5px;
		line-height: 1.65;
		color: #e2e8f0;
		background: #0f1117;
		white-space: pre;
		overflow-x: auto;
		border: none;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TERMINAL SETTINGS PANEL                                       */
	/* ══════════════════════════════════════════════════════════════ */
	.tm-settings {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 560px;
	}

	/* ── Preview ─────────────────────────────────────────────────── */
	.tm-settings-preview {
		border-radius: 10px;
		padding: 14px 16px;
		font-size: 13px;
		min-height: 64px;
		border: 1px solid rgba(255,255,255,0.08);
		box-shadow: 0 4px 16px rgba(0,0,0,0.3);
		display: flex;
		flex-direction: column;
		gap: 4px;
		transition: opacity 0.2s, background 0.2s;
	}

	.tm-settings-preview__line {
		font-family: inherit;
		font-size: 13px;
		line-height: 1.6;
		white-space: nowrap;
		overflow: hidden;
	}

	.tm-settings-preview__cursor {
		display: inline-block;
		min-width: 2px;
		min-height: 2px;
		border-radius: 1px;
		animation: tm-cursor-blink 1s step-end infinite;
		transition: width 0.15s, height 0.15s;
	}

	/* ── Settings form ───────────────────────────────────────────── */
	.tm-settings-form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.tm-settings-row {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.tm-settings-row--col {
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}

	.tm-settings-label {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		width: 120px;
		flex-shrink: 0;
	}

	.tm-settings-control {
		display: flex;
		align-items: center;
		gap: 10px;
		flex: 1;
	}

	.tm-settings-value {
		font-size: 12px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		min-width: 40px;
	}

	/* ── Slider ──────────────────────────────────────────────────── */
	.tm-slider {
		flex: 1;
		height: 4px;
		border-radius: 2px;
		background: var(--dbd2);
		outline: none;
		cursor: pointer;
		accent-color: var(--dt);
		appearance: none;
		-webkit-appearance: none;
	}

	.tm-slider::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--dt);
		cursor: pointer;
		box-shadow: 0 1px 4px rgba(0,0,0,0.25);
		border: 2px solid var(--dbg);
	}

	.tm-slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--dt);
		cursor: pointer;
		border: 2px solid var(--dbg);
	}

	/* ── Select ──────────────────────────────────────────────────── */
	.tm-select {
		flex: 1;
		padding: 7px 10px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-family: inherit;
		cursor: pointer;
		outline: none;
		transition: border-color 0.15s;
	}

	.tm-select:focus {
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
	}

	/* ── Color scheme swatches ───────────────────────────────────── */
	.tm-scheme-swatches {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.tm-scheme-swatch {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		background: transparent;
		border: 2px solid var(--dbd);
		border-radius: 10px;
		padding: 6px;
		cursor: pointer;
		transition: border-color 0.15s;
		outline: none;
	}

	.tm-scheme-swatch:hover {
		border-color: var(--dbd2);
	}

	.tm-scheme-swatch--active {
		border-color: var(--dt2);
		box-shadow: 0 0 0 2px var(--dbg), 0 0 0 4px var(--dt2);
	}

	.tm-scheme-swatch__preview {
		width: 56px;
		height: 36px;
		border-radius: 6px;
		display: block;
		overflow: hidden;
	}

	.tm-scheme-swatch__label {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
		white-space: nowrap;
	}

	.tm-scheme-swatch--active .tm-scheme-swatch__label {
		color: var(--dt);
	}

	/* ── Cursor radio ────────────────────────────────────────────── */
	.tm-cursor-radios {
		display: flex;
		gap: 12px;
	}

	.tm-cursor-radio {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		cursor: pointer;
	}

	.tm-cursor-radio__input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.tm-cursor-radio__box {
		width: 40px;
		height: 28px;
		border-radius: 6px;
		background: #1a1a1a;
		border: 1.5px solid rgba(255,255,255,0.12);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.15s;
	}

	.tm-cursor-radio__input:checked + .tm-cursor-radio__box {
		border-color: rgba(255,255,255,0.5);
		box-shadow: 0 0 0 2px rgba(255,255,255,0.08);
	}

	.tm-cursor-radio__shape {
		background: rgba(255,255,255,0.85);
		border-radius: 1px;
		animation: tm-cursor-blink 1s step-end infinite;
	}

	.tm-cursor-radio__label {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* ── Toggle switch ───────────────────────────────────────────── */
	.tm-toggle {
		position: relative;
		width: 40px;
		height: 22px;
		border-radius: 11px;
		background: var(--dbd2);
		border: none;
		cursor: pointer;
		transition: background 0.2s;
		padding: 0;
		flex-shrink: 0;
	}

	.tm-toggle--on {
		background: var(--dt);
	}

	:global(.dark) .tm-toggle--on {
		background: rgba(255,255,255,0.85);
	}

	.tm-toggle__thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--dbg);
		box-shadow: 0 1px 3px rgba(0,0,0,0.2);
		transition: transform 0.2s;
	}

	.tm-toggle--on .tm-toggle__thumb {
		transform: translateX(18px);
		background: var(--dbg);
	}

	/* ── Number input ────────────────────────────────────────────── */
	.tm-number-input {
		width: 100px;
		padding: 7px 10px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-family: 'SF Mono', monospace;
		font-variant-numeric: tabular-nums;
		outline: none;
		transition: border-color 0.15s;
	}

	.tm-number-input:focus {
		border-color: var(--dbd2);
	}

	/* ── Settings actions ────────────────────────────────────────── */
	.tm-settings-actions {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		padding-top: 8px;
		border-top: 1px solid var(--dbd);
	}
</style>
