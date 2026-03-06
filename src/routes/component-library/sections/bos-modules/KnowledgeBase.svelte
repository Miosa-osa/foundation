<script lang="ts">
	// ── KB Sidebar state ───────────────────────────────────────────
	let kbSearch = $state('');
	let activePage = $state('getting-started');

	type KBPage = { id: string; label: string; icon: 'doc' | 'star' | 'lock' | 'code' | 'chart' | 'settings' | 'users' | 'book' | 'link' };
	type KBSection = { id: string; label: string; expanded: boolean; pages: KBPage[] };

	let kbSections = $state<KBSection[]>([
		{
			id: 'start',
			label: 'Getting Started',
			expanded: true,
			pages: [
				{ id: 'getting-started', label: 'Introduction',       icon: 'star'  },
				{ id: 'installation',    label: 'Installation',        icon: 'code'  },
				{ id: 'quick-start',     label: 'Quick Start',         icon: 'doc'   },
			],
		},
		{
			id: 'guides',
			label: 'Guides',
			expanded: true,
			pages: [
				{ id: 'auth',            label: 'Authentication',      icon: 'lock'  },
				{ id: 'data-models',     label: 'Data Models',         icon: 'chart' },
				{ id: 'permissions',     label: 'Permissions',         icon: 'users' },
				{ id: 'api-reference',   label: 'API Reference',       icon: 'book'  },
			],
		},
		{
			id: 'advanced',
			label: 'Advanced',
			expanded: false,
			pages: [
				{ id: 'webhooks',        label: 'Webhooks',            icon: 'code'  },
				{ id: 'config',          label: 'Configuration',       icon: 'settings' },
				{ id: 'external-docs',   label: 'External Docs',       icon: 'link'  },
			],
		},
	]);

	function toggleSection(id: string) {
		kbSections = kbSections.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s);
	}

	// ── Document Editor state ──────────────────────────────────────
	type BlockType = 'paragraph' | 'h1' | 'h2' | 'h3' | 'bullet' | 'code' | 'callout' | 'quote' | 'image' | 'table' | 'checklist' | 'divider';

	type Block = { id: string; type: BlockType; content: string };

	const editorBlocks: Block[] = [
		{ id: 'b1',  type: 'h1',        content: 'Getting Started with MIOSA' },
		{ id: 'b2',  type: 'paragraph',  content: 'Welcome to the MIOSA knowledge base. This guide walks you through the core concepts and helps you get up and running in minutes.' },
		{ id: 'b3',  type: 'h2',        content: 'Prerequisites' },
		{ id: 'b4',  type: 'checklist',  content: 'Node.js 18+ installed on your system' },
		{ id: 'b5',  type: 'checklist',  content: 'A MIOSA account with an active workspace' },
		{ id: 'b6',  type: 'checklist',  content: 'Basic familiarity with REST APIs' },
		{ id: 'b7',  type: 'callout',    content: 'Make sure your Node.js version is 18 or above. Older versions are not supported and will fail during initialization.' },
		{ id: 'b8',  type: 'h2',        content: 'Installation' },
		{ id: 'b9',  type: 'code',      content: 'npm install @miosa/sdk\nnpx miosa init' },
		{ id: 'b10', type: 'paragraph',  content: 'After initializing, you will find a miosa.config.ts file in your project root. Adjust the region and apiKey fields to match your workspace.' },
		{ id: 'b11', type: 'quote',      content: 'The best documentation is the one that answers your question before you ask it. -- MIOSA Team' },
		{ id: 'b12', type: 'divider',    content: '' },
		{ id: 'b13', type: 'h3',        content: 'Configuration Reference' },
		{ id: 'b14', type: 'table',      content: '' },
		{ id: 'b15', type: 'image',      content: '' },
	];

	let focusedBlock = $state<string | null>(null);

	// ── Slash command menu ─────────────────────────────────────────
	let slashOpen = $state(true);
	let slashQuery = $state('');

	type SlashCmd = { icon: string; label: string; desc: string; category: 'Basic' | 'Media' | 'Advanced' };

	const slashCommands: SlashCmd[] = [
		{ icon: 'text',    label: 'Text',           desc: 'Just start writing plain text',       category: 'Basic' },
		{ icon: 'h1',      label: 'Heading 1',       desc: 'Big section heading',                 category: 'Basic' },
		{ icon: 'h2',      label: 'Heading 2',       desc: 'Medium section heading',              category: 'Basic' },
		{ icon: 'h3',      label: 'Heading 3',       desc: 'Small section heading',               category: 'Basic' },
		{ icon: 'list',    label: 'Bullet List',     desc: 'Create a simple bulleted list',       category: 'Basic' },
		{ icon: 'ol',      label: 'Numbered List',   desc: 'Create a numbered list',              category: 'Basic' },
		{ icon: 'check',   label: 'Checklist',       desc: 'Track tasks with checkboxes',         category: 'Basic' },
		{ icon: 'quote',   label: 'Quote',           desc: 'Capture a quote or citation',         category: 'Basic' },
		{ icon: 'divider', label: 'Divider',         desc: 'Visually divide blocks',              category: 'Basic' },
		{ icon: 'image',   label: 'Image',           desc: 'Upload or embed an image',            category: 'Media' },
		{ icon: 'code',    label: 'Code Block',      desc: 'Capture a code snippet',              category: 'Media' },
		{ icon: 'table',   label: 'Table',           desc: 'Add a simple table',                  category: 'Media' },
		{ icon: 'callout', label: 'Callout',         desc: 'Highlight important information',     category: 'Advanced' },
		{ icon: 'toggle',  label: 'Toggle List',     desc: 'Collapsible content sections',        category: 'Advanced' },
		{ icon: 'embed',   label: 'Embed',           desc: 'Embed external content',              category: 'Advanced' },
	];

	const filteredCmds = $derived(
		slashQuery.trim() === ''
			? slashCommands
			: slashCommands.filter(c => c.label.toLowerCase().includes(slashQuery.toLowerCase()))
	);

	let slashActive = $state(0);

	// ── Knowledge graph ────────────────────────────────────────────
	let hoveredNode = $state<string | null>(null);

	// ── Document properties ────────────────────────────────────────
	const docTags = ['onboarding', 'guide', 'v2', 'public'];
</script>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  SECTION                                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Knowledge Base</h2>
	<p class="ds-desc">
		Wiki and document editor patterns -- sidebar navigation, block-based editing,
		slash command menus, knowledge graph visualization, and document metadata panels.
	</p>

	<!-- ── 1. KB Sidebar ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">KB Sidebar</h3>
		<p class="ds-card__sub">Tree navigation with collapsible sections, search, document icons, and nested page items.</p>
		<div class="ds-demo" style="display: block; max-width: 260px;">
			<div class="kb-sidebar">
				<!-- Search -->
				<div class="kb-sidebar__search">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<input
						class="kb-sidebar__input"
						type="text"
						placeholder="Search pages..."
						bind:value={kbSearch}
						aria-label="Search knowledge base"
					/>
				</div>

				<!-- Sections -->
				<nav class="kb-sidebar__nav" aria-label="Knowledge base navigation">
					{#each kbSections as section}
						<div class="kb-sidebar__section">
							<button
								class="btn-compact btn-compact-ghost kb-sidebar__section-btn"
								onclick={() => toggleSection(section.id)}
								aria-expanded={section.expanded}
							>
								<svg
									width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									aria-hidden="true"
									style="transition: transform 0.15s; transform: rotate({section.expanded ? 90 : 0}deg); flex-shrink: 0;"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
								</svg>
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style="flex-shrink:0;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
								</svg>
								{section.label}
							</button>

							{#if section.expanded}
								<ul class="kb-sidebar__pages" role="list">
									{#each section.pages.filter(p => kbSearch === '' || p.label.toLowerCase().includes(kbSearch.toLowerCase())) as page}
										<li>
											<button
												class="btn-compact btn-compact-ghost kb-sidebar__page"
												class:btn-compact-primary={activePage === page.id} class:kb-sidebar__page--active={activePage === page.id}
												onclick={() => activePage = page.id}
												aria-current={activePage === page.id ? 'page' : undefined}
											>
												<!-- Page icon -->
												<span class="kb-sidebar__page-icon" aria-hidden="true">
													{#if page.icon === 'star'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
													{:else if page.icon === 'code'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
													{:else if page.icon === 'lock'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11V7a5 5 0 0110 0v4"/></svg>
													{:else if page.icon === 'chart'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
													{:else if page.icon === 'settings'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" stroke-width="2"/></svg>
													{:else if page.icon === 'users'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
													{:else if page.icon === 'book'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
													{:else if page.icon === 'link'}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
													{:else}
														<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
													{/if}
												</span>
												{page.label}
											</button>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				</nav>

				<!-- New Document button -->
				<div class="kb-sidebar__footer">
					<button class="btn-pill btn-pill-primary btn-pill-sm kb-sidebar__new-page" aria-label="Create new document">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
						</svg>
						New Document
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 2. Document Editor Blocks ────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Document Editor Blocks</h3>
		<p class="ds-card__sub">Block-based editor with headings, paragraph, code, callout, quote, image placeholder, table, checklist, and divider blocks.</p>
		<div class="ds-demo" style="display: block;">
			<div class="kb-editor">
				<div class="kb-editor__toolbar" aria-label="Editor toolbar">
					<button class="btn-compact btn-compact-ghost btn-compact-icon kb-editor__tool" aria-label="Bold"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 4h8a4 4 0 010 8H6zm0 8h9a4 4 0 010 8H6z"/></svg></button>
					<button class="btn-compact btn-compact-ghost btn-compact-icon kb-editor__tool" aria-label="Italic"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 4h-9M14 20H5M15 4L9 20"/></svg></button>
					<button class="btn-compact btn-compact-ghost btn-compact-icon kb-editor__tool" aria-label="Underline"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3v7a6 6 0 0012 0V3M4 21h16"/></svg></button>
					<span class="kb-editor__tool-divider" aria-hidden="true"></span>
					<button class="btn-compact btn-compact-ghost btn-compact-icon kb-editor__tool" aria-label="Link"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button>
					<button class="btn-compact btn-compact-ghost btn-compact-icon kb-editor__tool" aria-label="Insert mention"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/></svg></button>
					<span class="kb-editor__tool-divider" aria-hidden="true"></span>
					<button class="btn-compact btn-compact-ghost btn-compact-icon kb-editor__tool" aria-label="Turn into"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg></button>
					<button class="btn-compact btn-compact-soft btn-compact-icon kb-editor__tool kb-editor__tool--muted" aria-label="More options">...</button>
				</div>

				<div class="kb-editor__body">
					<!-- Slash command hint -->
					<div class="kb-editor__slash-hint" aria-hidden="true">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
						Type <kbd class="kb-editor__kbd">/</kbd> for commands
					</div>

					{#each editorBlocks as block}
						<div
							class="kb-block"
							class:kb-block--focused={focusedBlock === block.id}
							onclick={() => focusedBlock = block.id}
							role="button"
							tabindex="0"
							onkeydown={(e) => e.key === 'Enter' && (focusedBlock = block.id)}
							aria-label="Edit block"
						>
							<!-- Block type handle -->
							<span class="kb-block__handle" aria-hidden="true">
								<svg width="10" height="10" fill="currentColor" viewBox="0 0 20 20"><circle cx="7" cy="5" r="1.5"/><circle cx="7" cy="10" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="13" cy="5" r="1.5"/><circle cx="13" cy="10" r="1.5"/><circle cx="13" cy="15" r="1.5"/></svg>
							</span>

							{#if block.type === 'h1'}
								<h1 class="kb-block__h1">{block.content}</h1>
							{:else if block.type === 'h2'}
								<h2 class="kb-block__h2">{block.content}</h2>
							{:else if block.type === 'h3'}
								<h3 class="kb-block__h3">{block.content}</h3>
							{:else if block.type === 'paragraph'}
								<p class="kb-block__p">{block.content}</p>
							{:else if block.type === 'bullet'}
								<div class="kb-block__bullet">
									<span class="kb-block__bullet-dot" aria-hidden="true"></span>
									<span class="kb-block__bullet-text">{block.content}</span>
								</div>
							{:else if block.type === 'checklist'}
								<div class="kb-block__checklist">
									<span class="kb-block__checkbox" aria-hidden="true"></span>
									<span class="kb-block__checklist-text">{block.content}</span>
								</div>
							{:else if block.type === 'code'}
								<div class="kb-block__code" role="region" aria-label="Code block">
									<div class="kb-block__code-header">
										<span class="kb-block__code-lang">bash</span>
										<button class="btn-compact btn-compact-ghost btn-compact-icon kb-block__code-copy" aria-label="Copy code">
											<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
											Copy
										</button>
									</div>
									<pre class="kb-block__code-pre"><code>{block.content}</code></pre>
								</div>
							{:else if block.type === 'callout'}
								<div class="kb-block__callout">
									<span class="kb-block__callout-icon" aria-hidden="true">
										<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
									</span>
									<span class="kb-block__callout-text">{block.content}</span>
								</div>
							{:else if block.type === 'quote'}
								<blockquote class="kb-block__quote">
									<span class="kb-block__quote-text">{block.content}</span>
								</blockquote>
							{:else if block.type === 'divider'}
								<hr class="kb-block__divider" />
							{:else if block.type === 'table'}
								<div class="kb-block__table-wrap">
									<table class="kb-block__table">
										<thead>
											<tr>
												<th>Property</th>
												<th>Type</th>
												<th>Default</th>
												<th>Description</th>
											</tr>
										</thead>
										<tbody>
											<tr><td>region</td><td><code>string</code></td><td>us-east-1</td><td>Deployment region</td></tr>
											<tr><td>apiKey</td><td><code>string</code></td><td>--</td><td>Workspace API key</td></tr>
											<tr><td>debug</td><td><code>boolean</code></td><td>false</td><td>Enable verbose logs</td></tr>
										</tbody>
									</table>
								</div>
							{:else if block.type === 'image'}
								<div class="kb-block__image-placeholder">
									<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="1.5"/>
										<circle cx="8.5" cy="8.5" r="1.5" stroke-width="1.5"/>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 15l-5-5L5 21"/>
									</svg>
									<span class="kb-block__image-label">Click to add image or drag and drop</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 3. Slash Command Menu ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Slash Command Menu</h3>
		<p class="ds-card__sub">Floating dropdown triggered by "/" with grouped block types, icons, descriptions, and keyboard navigation hints.</p>
		<div class="ds-demo" style="display: block; max-width: 320px;">
			<div class="kb-slash">
				<div class="kb-slash__trigger" aria-hidden="true">
					<span class="kb-slash__cursor"></span>
					<span class="kb-slash__typed">/</span>
					<input
						class="kb-slash__input"
						type="text"
						placeholder="Filter..."
						bind:value={slashQuery}
						aria-label="Filter slash commands"
					/>
				</div>

				{#if slashOpen}
					<div class="kb-slash__menu" role="listbox" aria-label="Block type menu">
						<div class="kb-slash__hint" aria-hidden="true">
							<kbd class="kb-slash__kbd">Up</kbd><kbd class="kb-slash__kbd">Down</kbd> to navigate
							<kbd class="kb-slash__kbd">Enter</kbd> to select
							<kbd class="kb-slash__kbd">Esc</kbd> to close
						</div>

						{#each ['Basic', 'Media', 'Advanced'] as category}
							{@const items = filteredCmds.filter(c => c.category === category)}
							{#if items.length > 0}
								<div class="kb-slash__category">{category}</div>
								{#each items as cmd, i}
									<button
										class="kb-slash__item"
										class:kb-slash__item--active={slashActive === slashCommands.indexOf(cmd)}
										onclick={() => slashActive = slashCommands.indexOf(cmd)}
										role="option"
										aria-selected={slashActive === slashCommands.indexOf(cmd)}
									>
										<span class="kb-slash__icon" aria-hidden="true">
											{#if cmd.icon === 'text'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
											{:else if cmd.icon === 'h1'}
												<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><text x="3" y="18" fill="currentColor" font-size="16" font-weight="700">H1</text></svg>
											{:else if cmd.icon === 'h2'}
												<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><text x="3" y="18" fill="currentColor" font-size="16" font-weight="700">H2</text></svg>
											{:else if cmd.icon === 'h3'}
												<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><text x="3" y="18" fill="currentColor" font-size="16" font-weight="700">H3</text></svg>
											{:else if cmd.icon === 'list'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
											{:else if cmd.icon === 'ol'}
												<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><text x="2" y="8" fill="currentColor" font-size="7" font-weight="600">1.</text><text x="2" y="15" fill="currentColor" font-size="7" font-weight="600">2.</text><text x="2" y="22" fill="currentColor" font-size="7" font-weight="600">3.</text><line x1="10" y1="6" x2="22" y2="6" stroke="currentColor" stroke-width="2"/><line x1="10" y1="13" x2="22" y2="13" stroke="currentColor" stroke-width="2"/><line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" stroke-width="2"/></svg>
											{:else if cmd.icon === 'check'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="5" width="14" height="14" rx="2" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3 3 5-5"/></svg>
											{:else if cmd.icon === 'quote'}
												<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
											{:else if cmd.icon === 'divider'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/></svg>
											{:else if cmd.icon === 'code'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
											{:else if cmd.icon === 'image'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15l-5-5L5 21"/></svg>
											{:else if cmd.icon === 'table'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><line x1="3" y1="9" x2="21" y2="9" stroke-width="2"/><line x1="3" y1="15" x2="21" y2="15" stroke-width="2"/><line x1="9" y1="3" x2="9" y2="21" stroke-width="2"/><line x1="15" y1="3" x2="15" y2="21" stroke-width="2"/></svg>
											{:else if cmd.icon === 'callout'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
											{:else if cmd.icon === 'toggle'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
											{:else if cmd.icon === 'embed'}
												<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8M12 17v4"/></svg>
											{/if}
										</span>
										<span class="kb-slash__label">{cmd.label}</span>
										<span class="kb-slash__desc">{cmd.desc}</span>
									</button>
								{/each}
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 4. Knowledge Graph ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Knowledge Graph</h3>
		<p class="ds-card__sub">Visual node connections showing document relationships. CSS-only positioned nodes with connection lines.</p>
		<div class="ds-demo" style="display: block;">
			<div class="kb-graph">
				<!-- Connection lines (CSS-only using positioned divs) -->
				<div class="kb-graph__lines">
					<div class="kb-graph__line kb-graph__line--1"></div>
					<div class="kb-graph__line kb-graph__line--2"></div>
					<div class="kb-graph__line kb-graph__line--3"></div>
					<div class="kb-graph__line kb-graph__line--4"></div>
					<div class="kb-graph__line kb-graph__line--5"></div>
					<div class="kb-graph__line kb-graph__line--6"></div>
					<div class="kb-graph__line kb-graph__line--7"></div>
					<div class="kb-graph__line kb-graph__line--8"></div>
				</div>

				<!-- Nodes -->
				<button
					class="kb-graph__node kb-graph__node--core kb-graph__node--center"
					class:kb-graph__node--hovered={hoveredNode === 'core'}
					onmouseenter={() => hoveredNode = 'core'}
					onmouseleave={() => hoveredNode = null}
					aria-label="MIOSA Core"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">MIOSA Core</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--guide kb-graph__node--tl"
					class:kb-graph__node--hovered={hoveredNode === 'auth'}
					onmouseenter={() => hoveredNode = 'auth'}
					onmouseleave={() => hoveredNode = null}
					aria-label="Auth"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">Auth</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--guide kb-graph__node--tr"
					class:kb-graph__node--hovered={hoveredNode === 'data'}
					onmouseenter={() => hoveredNode = 'data'}
					onmouseleave={() => hoveredNode = null}
					aria-label="Data Models"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">Data Models</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--guide kb-graph__node--bl"
					class:kb-graph__node--hovered={hoveredNode === 'perms'}
					onmouseenter={() => hoveredNode = 'perms'}
					onmouseleave={() => hoveredNode = null}
					aria-label="Permissions"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">Permissions</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--api kb-graph__node--br"
					class:kb-graph__node--hovered={hoveredNode === 'webhooks'}
					onmouseenter={() => hoveredNode = 'webhooks'}
					onmouseleave={() => hoveredNode = null}
					aria-label="Webhooks"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">Webhooks</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--api kb-graph__node--bottom"
					class:kb-graph__node--hovered={hoveredNode === 'rest'}
					onmouseenter={() => hoveredNode = 'rest'}
					onmouseleave={() => hoveredNode = null}
					aria-label="REST API"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">REST API</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--ref kb-graph__node--right"
					class:kb-graph__node--hovered={hoveredNode === 'sdk'}
					onmouseenter={() => hoveredNode = 'sdk'}
					onmouseleave={() => hoveredNode = null}
					aria-label="SDK"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">SDK</span>
				</button>

				<button
					class="kb-graph__node kb-graph__node--ref kb-graph__node--left"
					class:kb-graph__node--hovered={hoveredNode === 'quickstart'}
					onmouseenter={() => hoveredNode = 'quickstart'}
					onmouseleave={() => hoveredNode = null}
					aria-label="Quick Start"
				>
					<span class="kb-graph__node-ring"></span>
					<span class="kb-graph__node-label">Quick Start</span>
				</button>

				<!-- Legend -->
				<div class="kb-graph__legend">
					<span class="kb-graph__legend-item"><span class="kb-graph__legend-dot kb-graph__legend-dot--core"></span>Core</span>
					<span class="kb-graph__legend-item"><span class="kb-graph__legend-dot kb-graph__legend-dot--guide"></span>Guide</span>
					<span class="kb-graph__legend-item"><span class="kb-graph__legend-dot kb-graph__legend-dot--api"></span>API</span>
					<span class="kb-graph__legend-item"><span class="kb-graph__legend-dot kb-graph__legend-dot--ref"></span>Reference</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 5. Document Properties ──────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Document Properties</h3>
		<p class="ds-card__sub">Metadata panel with property rows, editable tags, status, and related documents.</p>
		<div class="ds-demo" style="display: block; max-width: 340px;">
			<div class="kb-props">
				<div class="kb-props__header">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span class="kb-props__header-text">Properties</span>
				</div>

				<div class="kb-props__rows">
					<!-- Created -->
					<div class="kb-props__row">
						<span class="kb-props__label">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
							Created
						</span>
						<span class="kb-props__val kb-props__val--muted">Jan 15, 2026</span>
					</div>

					<!-- Updated -->
					<div class="kb-props__row">
						<span class="kb-props__label">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							Updated
						</span>
						<span class="kb-props__val kb-props__val--muted">Mar 4, 2026</span>
					</div>

					<!-- Author -->
					<div class="kb-props__row">
						<span class="kb-props__label">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
							Author
						</span>
						<span class="kb-props__val">
							<span class="kb-props__avatar">MK</span>
							Maya Kapoor
						</span>
					</div>

					<div class="kb-props__divider"></div>

					<!-- Status -->
					<div class="kb-props__row">
						<span class="kb-props__label">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							Status
						</span>
						<span class="kb-props__val">
							<span class="kb-props__status kb-props__status--published">
								<span class="kb-props__status-dot"></span>
								Published
							</span>
						</span>
					</div>

					<!-- Tags -->
					<div class="kb-props__row kb-props__row--tags">
						<span class="kb-props__label">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
							Tags
						</span>
						<span class="kb-props__val">
							<span class="kb-props__tags">
								{#each docTags as tag}
									<span class="kb-props__tag">{tag}</span>
								{/each}
								<button class="btn-compact btn-compact-ghost btn-compact-icon kb-props__tag-add" aria-label="Add tag">+</button>
							</span>
						</span>
					</div>

					<div class="kb-props__divider"></div>

					<!-- Related Documents -->
					<div class="kb-props__section-title">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
						</svg>
						Related Documents
					</div>

					<div class="kb-props__related">
						<button class="btn-compact btn-compact-ghost kb-props__related-item">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
							Authentication Guide
						</button>
						<button class="btn-compact btn-compact-ghost kb-props__related-item">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
							API Reference
						</button>
						<button class="btn-compact btn-compact-ghost kb-props__related-item">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
							Permissions Model
						</button>
					</div>

					<div class="kb-props__divider"></div>

					<!-- Status variants -->
					<div class="kb-props__section-title">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
						</svg>
						Status Variants
					</div>
					<div class="kb-props__status-list">
						<span class="kb-props__status kb-props__status--draft">
							<span class="kb-props__status-dot"></span>
							Draft
						</span>
						<span class="kb-props__status kb-props__status--published">
							<span class="kb-props__status-dot"></span>
							Published
						</span>
						<span class="kb-props__status kb-props__status--archived">
							<span class="kb-props__status-dot"></span>
							Archived
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── KB Sidebar ──────────────────────────────────────────────── */
	.kb-sidebar {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 12px 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
		overflow: hidden;
	}

	.kb-sidebar__search {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 12px;
		margin-bottom: 8px;
		color: var(--dt3);
	}

	.kb-sidebar__input {
		flex: 1;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 5px;
		padding: 5px 8px;
		font-size: 12px;
		color: var(--dt);
		outline: none;
		transition: border-color 0.15s;
	}

	.kb-sidebar__input:focus { border-color: var(--dbd2); }
	.kb-sidebar__input::placeholder { color: var(--dt3); }

	.kb-sidebar__nav {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0 6px;
	}

	.kb-sidebar__section { margin-bottom: 2px; }

	/* .kb-sidebar__section-btn — shape/color handled by btn-compact-ghost */
	.kb-sidebar__section-btn {
		width: 100%;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		justify-content: flex-start;
		gap: 5px;
	}

	.kb-sidebar__pages {
		list-style: none;
		margin: 0;
		padding: 0 0 0 18px;
	}

	/* .kb-sidebar__page — shape/color handled by btn-compact-ghost / btn-compact-primary */
	.kb-sidebar__page {
		width: 100%;
		font-size: 12px;
		justify-content: flex-start;
		gap: 6px;
	}

	.kb-sidebar__page-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		color: var(--dt3);
	}

	.kb-sidebar__page--active .kb-sidebar__page-icon { color: #6366f1; }

	.kb-sidebar__footer {
		padding: 8px 12px 0;
		margin-top: 4px;
		border-top: 1px solid var(--dbd);
	}

	/* .kb-sidebar__new-page — shape/color handled by btn-pill-primary btn-pill-sm */
	.kb-sidebar__new-page { width: 100%; justify-content: center; gap: 6px; }

	/* ── Document Editor ─────────────────────────────────────────── */
	.kb-editor {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.kb-editor__toolbar {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 8px 12px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		flex-wrap: wrap;
	}

	/* .kb-editor__tool — shape/color handled by btn-compact-ghost btn-compact-icon */
	.kb-editor__tool--muted { font-weight: 700; letter-spacing: 1px; }

	.kb-editor__tool-divider {
		display: inline-block;
		width: 1px;
		height: 16px;
		background: var(--dbd);
		margin: 0 4px;
		flex-shrink: 0;
	}

	.kb-editor__body {
		padding: 24px 32px 32px;
	}

	.kb-editor__slash-hint {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		color: var(--dt3);
		margin-bottom: 16px;
		padding: 4px 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 5px;
	}

	.kb-editor__kbd {
		font-family: inherit;
		font-size: 10px;
		font-weight: 600;
		color: var(--dt2);
		background: var(--dbg);
		border: 1px solid var(--dbd2);
		border-radius: 3px;
		padding: 0 4px;
	}

	/* ── Blocks ──────────────────────────────────────────────────── */
	.kb-block {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 0;
		border-radius: 4px;
		cursor: text;
		transition: background 0.1s;
		margin: 0 -8px;
		padding: 2px 8px;
	}

	.kb-block:hover { background: var(--dbg2); }
	.kb-block--focused { background: var(--dbg2); }

	.kb-block__handle {
		opacity: 0;
		position: absolute;
		left: -18px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--dt3);
		cursor: grab;
		width: 14px;
		height: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.1s;
	}

	.kb-block:hover .kb-block__handle { opacity: 1; }

	.kb-block__h1 {
		font-size: 26px;
		font-weight: 700;
		color: var(--dt);
		margin: 0 0 6px;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.kb-block__h2 {
		font-size: 19px;
		font-weight: 600;
		color: var(--dt);
		margin: 14px 0 4px;
		line-height: 1.3;
		letter-spacing: -0.01em;
	}

	.kb-block__h3 {
		font-size: 15px;
		font-weight: 600;
		color: var(--dt);
		margin: 10px 0 4px;
		line-height: 1.3;
	}

	.kb-block__p {
		font-size: 13px;
		color: var(--dt2);
		margin: 2px 0;
		line-height: 1.6;
	}

	.kb-block__bullet {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		padding: 1px 0;
	}

	.kb-block__bullet-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--dt3);
		margin-top: 6px;
		flex-shrink: 0;
	}

	.kb-block__bullet-text {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.6;
	}

	/* Checklist block */
	.kb-block__checklist {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		padding: 1px 0;
	}

	.kb-block__checkbox {
		width: 14px;
		height: 14px;
		border: 1.5px solid var(--dbd2);
		border-radius: 3px;
		margin-top: 2px;
		flex-shrink: 0;
		background: transparent;
		transition: border-color 0.15s;
	}

	.kb-block:hover .kb-block__checkbox { border-color: var(--dt3); }

	.kb-block__checklist-text {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.6;
	}

	/* Code block */
	.kb-block__code {
		width: 100%;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		overflow: hidden;
		margin: 4px 0;
	}

	.kb-block__code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 4px 10px;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}

	.kb-block__code-lang {
		font-size: 10px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* .kb-block__code-copy — shape/color handled by btn-compact-ghost btn-compact-icon */
	.kb-block__code-copy { font-size: 10px; gap: 4px; }

	.kb-block__code-pre {
		margin: 0;
		padding: 12px 14px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 12px;
		line-height: 1.6;
		color: var(--dt);
		overflow-x: auto;
		white-space: pre;
	}

	/* Callout block */
	.kb-block__callout {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 10px 14px;
		background: rgba(99, 102, 241, 0.06);
		border-left: 3px solid #6366f1;
		border-radius: 0 6px 6px 0;
		margin: 6px 0;
		width: 100%;
	}

	.kb-block__callout-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: #6366f1;
		margin-top: 1px;
	}

	.kb-block__callout-text {
		font-size: 12.5px;
		color: var(--dt2);
		line-height: 1.6;
	}

	/* Quote block */
	.kb-block__quote {
		border-left: 3px solid var(--dbd2);
		padding: 8px 16px;
		margin: 6px 0;
		width: 100%;
	}

	.kb-block__quote-text {
		font-size: 13px;
		color: var(--dt2);
		font-style: italic;
		line-height: 1.6;
	}

	/* Divider block */
	.kb-block__divider {
		width: 100%;
		border: none;
		border-top: 1px solid var(--dbd);
		margin: 12px 0;
	}

	/* Table block */
	.kb-block__table-wrap {
		width: 100%;
		overflow-x: auto;
		margin: 6px 0;
	}

	.kb-block__table {
		width: 100%;
		border-collapse: collapse;
		font-size: 12px;
		color: var(--dt2);
	}

	.kb-block__table th {
		text-align: left;
		padding: 6px 10px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}

	.kb-block__table td {
		padding: 6px 10px;
		border-bottom: 1px solid var(--dbd);
	}

	.kb-block__table code {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 11px;
		padding: 1px 5px;
		background: var(--dbg2);
		border-radius: 3px;
		color: #6366f1;
	}

	/* Image placeholder block */
	.kb-block__image-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 32px 20px;
		background: var(--dbg2);
		border: 2px dashed var(--dbd2);
		border-radius: 8px;
		margin: 6px 0;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		color: var(--dt3);
	}

	.kb-block__image-placeholder:hover {
		border-color: var(--dt3);
		background: var(--dbg3);
	}

	.kb-block__image-label {
		font-size: 12px;
		color: var(--dt3);
	}

	/* ── Slash Command Menu ──────────────────────────────────────── */
	.kb-slash {
		position: relative;
	}

	.kb-slash__trigger {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 8px 12px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		margin-bottom: 6px;
	}

	.kb-slash__cursor {
		display: inline-block;
		width: 2px;
		height: 16px;
		background: #6366f1;
		border-radius: 1px;
		animation: kb-blink 1s steps(2) infinite;
	}

	@keyframes kb-blink {
		0% { opacity: 1; }
		50% { opacity: 0; }
	}

	.kb-slash__typed {
		font-size: 14px;
		color: var(--dt);
		font-weight: 500;
	}

	.kb-slash__input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-size: 14px;
		color: var(--dt);
		padding: 0;
	}

	.kb-slash__input::placeholder { color: var(--dt3); }

	.kb-slash__menu {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 6px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.3);
		max-height: 340px;
		overflow-y: auto;
	}

	.kb-slash__hint {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-wrap: wrap;
		padding: 4px 8px 8px;
		font-size: 10px;
		color: var(--dt3);
		border-bottom: 1px solid var(--dbd);
		margin-bottom: 4px;
	}

	.kb-slash__kbd {
		display: inline-block;
		font-family: inherit;
		font-size: 9px;
		font-weight: 600;
		color: var(--dt2);
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 3px;
		padding: 0 4px;
		line-height: 1.6;
	}

	.kb-slash__category {
		font-size: 10px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 8px 8px 4px;
	}

	.kb-slash__item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 6px 8px;
		background: none;
		border: none;
		color: var(--dt2);
		cursor: pointer;
		border-radius: 5px;
		transition: background 0.1s;
		text-align: left;
	}

	.kb-slash__item:hover,
	.kb-slash__item--active {
		background: var(--dbg2);
		color: var(--dt);
	}

	.kb-slash__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 5px;
		flex-shrink: 0;
		color: var(--dt2);
	}

	.kb-slash__item--active .kb-slash__icon,
	.kb-slash__item:hover .kb-slash__icon {
		border-color: var(--dbd2);
		color: var(--dt);
	}

	.kb-slash__label {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
	}

	.kb-slash__desc {
		font-size: 11px;
		color: var(--dt3);
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* ── Knowledge Graph ─────────────────────────────────────────── */
	.kb-graph {
		position: relative;
		width: 100%;
		height: 300px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	/* Connection lines layer */
	.kb-graph__lines {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.kb-graph__line {
		position: absolute;
		background: var(--dbd);
		transform-origin: 0 0;
	}

	/* Lines from center (50%, 43%) to each node */
	/* center -> top-left (Auth: 15%, 17%) */
	.kb-graph__line--1 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 140px;
		transform: rotate(-143deg);
	}

	/* center -> top-right (Data Models: 78%, 17%) */
	.kb-graph__line--2 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 140px;
		transform: rotate(-37deg);
	}

	/* center -> bottom-left (Permissions: 15%, 68%) */
	.kb-graph__line--3 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 130px;
		transform: rotate(143deg);
	}

	/* center -> bottom-right (Webhooks: 80%, 68%) */
	.kb-graph__line--4 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 130px;
		transform: rotate(37deg);
	}

	/* center -> bottom (REST API: 50%, 85%) */
	.kb-graph__line--5 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 125px;
		transform: rotate(180deg);
	}

	/* center -> right (SDK: 90%, 43%) */
	.kb-graph__line--6 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 120px;
		transform: rotate(90deg);
	}

	/* center -> left (Quick Start: 8%, 43%) */
	.kb-graph__line--7 {
		left: 50%;
		top: 43%;
		width: 1px;
		height: 120px;
		transform: rotate(-90deg);
	}

	/* Auth -> Permissions */
	.kb-graph__line--8 {
		left: 15%;
		top: 23%;
		width: 1px;
		height: 130px;
		transform: rotate(180deg);
	}

	/* Nodes */
	.kb-graph__node {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		z-index: 2;
		transition: transform 0.2s;
		transform: translate(-50%, -50%);
	}

	.kb-graph__node:hover,
	.kb-graph__node--hovered { transform: translate(-50%, -50%) scale(1.12); }

	.kb-graph__node-ring {
		display: block;
		border-radius: 50%;
		border: 2px solid currentColor;
		background: var(--dbg);
		transition: box-shadow 0.2s;
	}

	.kb-graph__node:hover .kb-graph__node-ring,
	.kb-graph__node--hovered .kb-graph__node-ring {
		box-shadow: 0 0 12px currentColor;
	}

	.kb-graph__node-label {
		font-size: 10px;
		font-weight: 500;
		color: var(--dt2);
		white-space: nowrap;
	}

	.kb-graph__node:hover .kb-graph__node-label,
	.kb-graph__node--hovered .kb-graph__node-label { color: var(--dt); }

	/* Node positions */
	.kb-graph__node--center { left: 50%; top: 43%; color: #6366f1; }
	.kb-graph__node--center .kb-graph__node-ring { width: 48px; height: 48px; }

	.kb-graph__node--tl { left: 15%; top: 17%; color: #8b5cf6; }
	.kb-graph__node--tl .kb-graph__node-ring { width: 32px; height: 32px; }

	.kb-graph__node--tr { left: 78%; top: 17%; color: #8b5cf6; }
	.kb-graph__node--tr .kb-graph__node-ring { width: 36px; height: 36px; }

	.kb-graph__node--bl { left: 15%; top: 68%; color: #8b5cf6; }
	.kb-graph__node--bl .kb-graph__node-ring { width: 28px; height: 28px; }

	.kb-graph__node--br { left: 80%; top: 68%; color: #8b5cf6; }
	.kb-graph__node--br .kb-graph__node-ring { width: 28px; height: 28px; }

	.kb-graph__node--bottom { left: 50%; top: 85%; color: #0ea5e9; }
	.kb-graph__node--bottom .kb-graph__node-ring { width: 36px; height: 36px; }

	.kb-graph__node--right { left: 90%; top: 43%; color: #0ea5e9; }
	.kb-graph__node--right .kb-graph__node-ring { width: 26px; height: 26px; }

	.kb-graph__node--left { left: 8%; top: 43%; color: #22c55e; }
	.kb-graph__node--left .kb-graph__node-ring { width: 24px; height: 24px; }

	/* Node type colors */
	.kb-graph__node--core { color: #6366f1; }
	.kb-graph__node--guide { color: #8b5cf6; }
	.kb-graph__node--api { color: #0ea5e9; }
	.kb-graph__node--ref { color: #22c55e; }

	/* Legend */
	.kb-graph__legend {
		position: absolute;
		bottom: 10px;
		right: 12px;
		display: flex;
		gap: 12px;
		z-index: 3;
	}

	.kb-graph__legend-item {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 10px;
		color: var(--dt3);
	}

	.kb-graph__legend-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.kb-graph__legend-dot--core { background: #6366f1; }
	.kb-graph__legend-dot--guide { background: #8b5cf6; }
	.kb-graph__legend-dot--api { background: #0ea5e9; }
	.kb-graph__legend-dot--ref { background: #22c55e; }

	/* ── Document Properties ─────────────────────────────────────── */
	.kb-props {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.kb-props__header {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd);
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}

	.kb-props__header-text { font-size: 12px; }

	.kb-props__rows {
		padding: 8px 14px 14px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.kb-props__row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 5px 0;
		min-height: 28px;
	}

	.kb-props__row--tags { align-items: flex-start; }

	.kb-props__label {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		color: var(--dt3);
		width: 80px;
		flex-shrink: 0;
	}

	.kb-props__val {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: var(--dt);
		flex: 1;
		margin: 0;
	}

	.kb-props__val--muted { color: var(--dt2); }

	.kb-props__avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		color: var(--dt2);
		font-size: 9px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.kb-props__status {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 2px 8px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 500;
	}

	.kb-props__status--published {
		background: rgba(34,197,94,0.1);
		color: #4ade80;
	}

	.kb-props__status--draft {
		background: rgba(234,179,8,0.1);
		color: #facc15;
	}

	.kb-props__status--archived {
		background: rgba(107,114,128,0.12);
		color: #9ca3af;
	}

	.kb-props__status-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		flex-shrink: 0;
	}

	.kb-props__divider {
		height: 1px;
		background: var(--dbd);
		margin: 4px 0;
	}

	.kb-props__section-title {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		padding: 6px 0 4px;
	}

	.kb-props__tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
	}

	.kb-props__tag {
		display: inline-flex;
		align-items: center;
		padding: 1px 7px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 500;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
	}

	/* .kb-props__tag-add — shape/color handled by btn-compact-ghost btn-compact-icon */
	.kb-props__tag-add { width: 20px; height: 18px; font-size: 13px; }

	.kb-props__related {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	/* .kb-props__related-item — shape/color handled by btn-compact-ghost */
	.kb-props__related-item { width: 100%; font-size: 12px; justify-content: flex-start; gap: 6px; }

	.kb-props__status-list {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 0;
	}
</style>
