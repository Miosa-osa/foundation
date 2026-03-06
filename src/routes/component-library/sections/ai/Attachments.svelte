<script lang="ts">
	// ── Types ─────────────────────────────────────────────────────
	type FileKind = 'image' | 'doc' | 'video' | 'pdf' | 'spreadsheet' | 'code';
	type UploadStatus = 'uploading' | 'complete' | 'failed';

	interface AttachFile {
		id: number;
		name: string;
		size: string;
		kind: FileKind;
		ext: string;
		hue?: string; // gradient hue for image placeholders
	}

	interface UploadFile {
		id: number;
		name: string;
		size: string;
		kind: FileKind;
		ext: string;
		status: UploadStatus;
		progress: number; // 0–100
	}

	interface SourceDoc {
		id: number;
		title: string;
		url: string;
		snippet: string;
		relevance: number; // 0–100
		domain: string;
	}

	// ── Demo 1: Grid Variant ──────────────────────────────────────
	let gridFiles: AttachFile[] = $state([
		{ id: 1, name: 'hero-banner.png',     size: '1.2 MB', kind: 'image',       ext: 'PNG',  hue: '210deg 60%' },
		{ id: 2, name: 'product-brief.pdf',   size: '840 KB', kind: 'pdf',         ext: 'PDF'  },
		{ id: 3, name: 'team-photo.jpg',      size: '2.4 MB', kind: 'image',       ext: 'JPG',  hue: '160deg 40%' },
		{ id: 4, name: 'demo-clip.mp4',       size: '18 MB',  kind: 'video',       ext: 'MP4'  },
		{ id: 5, name: 'design-tokens.json',  size: '22 KB',  kind: 'code',        ext: 'JSON' },
		{ id: 6, name: 'analytics-q4.xlsx',   size: '560 KB', kind: 'spreadsheet', ext: 'XLSX' },
	]);

	function removeGridFile(id: number) {
		gridFiles = gridFiles.filter(f => f.id !== id);
	}

	// ── Demo 2: Inline Chip Variant ───────────────────────────────
	let inlineFiles: AttachFile[] = $state([
		{ id: 1, name: 'proposal.pdf',       size: '1.1 MB', kind: 'pdf',   ext: 'PDF'  },
		{ id: 2, name: 'screenshot.png',     size: '320 KB', kind: 'image', ext: 'PNG',  hue: '280deg 50%' },
		{ id: 3, name: 'notes.md',           size: '4 KB',   kind: 'code',  ext: 'MD'   },
		{ id: 4, name: 'budget.xlsx',        size: '88 KB',  kind: 'spreadsheet', ext: 'XLSX' },
	]);

	function removeInlineFile(id: number) {
		inlineFiles = inlineFiles.filter(f => f.id !== id);
	}

	// ── Demo 3: List Variant ──────────────────────────────────────
	let listFiles: AttachFile[] = $state([
		{ id: 1, name: 'annual-report-2024.pdf',   size: '4.8 MB', kind: 'pdf',         ext: 'PDF'  },
		{ id: 2, name: 'brand-assets.zip',         size: '38 MB',  kind: 'doc',         ext: 'ZIP'  },
		{ id: 3, name: 'team-offsite.mp4',         size: '220 MB', kind: 'video',       ext: 'MP4'  },
		{ id: 4, name: 'revenue-model.xlsx',       size: '1.4 MB', kind: 'spreadsheet', ext: 'XLSX' },
		{ id: 5, name: 'api-schema.json',          size: '74 KB',  kind: 'code',        ext: 'JSON' },
	]);

	let listPreviewId = $state<number | null>(null);

	function removeListFile(id: number) {
		listFiles = listFiles.filter(f => f.id !== id);
	}

	// ── Demo 4: Upload Progress ───────────────────────────────────
	let uploadFiles: UploadFile[] = $state([
		{ id: 1, name: 'product-deck.pdf',     size: '3.2 MB', kind: 'pdf',         ext: 'PDF',  status: 'uploading', progress: 68 },
		{ id: 2, name: 'hero-video.mp4',       size: '42 MB',  kind: 'video',       ext: 'MP4',  status: 'uploading', progress: 23 },
		{ id: 3, name: 'final-logo.png',       size: '510 KB', kind: 'image',       ext: 'PNG',  status: 'complete',  progress: 100 },
		{ id: 4, name: 'data-export.csv',      size: '7.9 MB', kind: 'spreadsheet', ext: 'CSV',  status: 'failed',    progress: 45 },
		{ id: 5, name: 'contract-draft.docx',  size: '228 KB', kind: 'doc',         ext: 'DOCX', status: 'complete',  progress: 100 },
	]);

	function retryUpload(id: number) {
		uploadFiles = uploadFiles.map(f =>
			f.id === id ? { ...f, status: 'uploading', progress: 0 } : f
		);
		// Simulate progress after retry
		const interval = setInterval(() => {
			uploadFiles = uploadFiles.map(f => {
				if (f.id !== id) return f;
				const next = Math.min(f.progress + 12, 100);
				return { ...f, progress: next, status: next === 100 ? 'complete' : 'uploading' };
			});
			const done = uploadFiles.find(f => f.id === id)?.status === 'complete';
			if (done) clearInterval(interval);
		}, 200);
	}

	function dismissUpload(id: number) {
		uploadFiles = uploadFiles.filter(f => f.id !== id);
	}

	// ── Demo 5: Source Documents ──────────────────────────────────
	let sourceDocs: SourceDoc[] = $state([
		{
			id: 1,
			title: 'SvelteKit — File-based Routing',
			url: 'kit.svelte.dev/docs/routing',
			domain: 'kit.svelte.dev',
			snippet: 'The file structure inside src/routes determines the URL structure of your application. Each +page.svelte file becomes a navigable route.',
			relevance: 97,
		},
		{
			id: 2,
			title: 'Svelte 5 Runes — $state and $derived',
			url: 'svelte.dev/docs/svelte/runes',
			domain: 'svelte.dev',
			snippet: 'Runes are compiler-level primitives that signal reactive state to the Svelte compiler. Use $state for mutable variables and $derived for computed values.',
			relevance: 91,
		},
		{
			id: 3,
			title: 'MDN — CSS Custom Properties',
			url: 'developer.mozilla.org/en-US/docs/Web/CSS/--*',
			domain: 'developer.mozilla.org',
			snippet: 'Custom properties (sometimes called CSS variables) are entities defined by CSS authors that contain specific values to be reused throughout a document.',
			relevance: 78,
		},
	]);

	let expandedSourceId = $state<number | null>(1);

	function toggleSource(id: number) {
		expandedSourceId = expandedSourceId === id ? null : id;
	}

	// ── Demo 6: Attachment in Chat Context ───────────────────────
	let chatInput = $state('');
	let chatFocused = $state(false);
	let chatAttachments: AttachFile[] = $state([
		{ id: 1, name: 'wireframes.png',    size: '880 KB', kind: 'image', ext: 'PNG', hue: '200deg 55%' },
		{ id: 2, name: 'spec-v2.pdf',       size: '1.8 MB', kind: 'pdf',   ext: 'PDF' },
		{ id: 3, name: 'palette.png',       size: '44 KB',  kind: 'image', ext: 'PNG', hue: '340deg 50%' },
	]);
	let isGeneratingChat = $state(false);

	function removeChatAttachment(id: number) {
		chatAttachments = chatAttachments.filter(f => f.id !== id);
	}

	function handleChatSend() {
		if (!chatInput.trim() && chatAttachments.length === 0) return;
		isGeneratingChat = true;
		chatInput = '';
		setTimeout(() => { isGeneratingChat = false; }, 2400);
	}

	// ── Helpers ───────────────────────────────────────────────────
	function kindColor(kind: FileKind): string {
		const map: Record<FileKind, string> = {
			image:       '#7c3aed',
			video:       '#db2777',
			pdf:         '#dc2626',
			doc:         '#2563eb',
			spreadsheet: '#16a34a',
			code:        '#d97706',
		};
		return map[kind] ?? '#6b7280';
	}

	function kindBg(kind: FileKind): string {
		const map: Record<FileKind, string> = {
			image:       'rgba(124,58,237,0.1)',
			video:       'rgba(219,39,119,0.1)',
			pdf:         'rgba(220,38,38,0.1)',
			doc:         'rgba(37,99,235,0.1)',
			spreadsheet: 'rgba(22,163,74,0.1)',
			code:        'rgba(217,119,6,0.1)',
		};
		return map[kind] ?? 'rgba(107,114,128,0.1)';
	}

	function kindLabel(kind: FileKind): string {
		const map: Record<FileKind, string> = {
			image:       'Image',
			video:       'Video',
			pdf:         'PDF',
			doc:         'Document',
			spreadsheet: 'Spreadsheet',
			code:        'Code',
		};
		return map[kind] ?? 'File';
	}

	function relevanceColor(r: number): string {
		if (r >= 90) return '#16a34a';
		if (r >= 75) return '#d97706';
		return '#6b7280';
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Attachments</h2>
	<p class="ds-desc">
		File attachment components for AI chat — display uploaded files, images, documents, and source
		references with multiple layout variants and upload state handling.
	</p>

	<!-- ── 1. Grid Variant ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Grid Variant</h3>
		<p class="ds-card__sub">
			Thumbnail grid for mixed file types. Images show gradient previews, videos show a play
			overlay, documents show an icon with extension badge. Hover to reveal the remove button.
		</p>
		{#if gridFiles.length > 0}
			<div class="at-grid">
				{#each gridFiles as file (file.id)}
					<div class="at-grid__item">
						<!-- Thumbnail area -->
						{#if file.kind === 'image'}
							<div
								class="at-grid__thumb"
								style="background: radial-gradient(ellipse at 30% 30%, hsl({file.hue ?? '220deg 50%'} / 0.9) 0%, hsl({file.hue ?? '220deg 50%'} / 0.4) 100%);"
							>
								<svg class="at-grid__thumb-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
								</svg>
							</div>
						{:else if file.kind === 'video'}
							<div class="at-grid__thumb at-grid__thumb--video">
								<div class="at-grid__play">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
										<polygon points="5 3 19 12 5 21 5 3"/>
									</svg>
								</div>
							</div>
						{:else}
							<div class="at-grid__thumb at-grid__thumb--doc" style="--kind-color: {kindColor(file.kind)}; --kind-bg: {kindBg(file.kind)};">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: {kindColor(file.kind)};">
									<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
								</svg>
								<span class="at-grid__ext-badge" style="background: {kindBg(file.kind)}; color: {kindColor(file.kind)};">{file.ext}</span>
							</div>
						{/if}
						<!-- Remove button -->
						<button
							class="at-grid__remove"
							onclick={() => removeGridFile(file.id)}
							aria-label="Remove {file.name}"
						>
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
						</button>
						<!-- Filename -->
						<p class="at-grid__name" title={file.name}>{file.name}</p>
						<p class="at-grid__size">{file.size}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="at-empty">All files removed — refresh the demo to reset.</p>
		{/if}
	</div>

	<!-- ── 2. Inline Chip Variant ────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Inline Chip Variant</h3>
		<p class="ds-card__sub">
			Compact horizontal chips for a single-line attachment row. Images get a color swatch,
			documents get a file icon. Ideal for minimalist chat inputs.
		</p>
		{#if inlineFiles.length > 0}
			<div class="at-chips">
				{#each inlineFiles as file (file.id)}
					<div class="at-chip">
						<!-- Icon / thumbnail -->
						{#if file.kind === 'image'}
							<span
								class="at-chip__thumb"
								style="background: radial-gradient(circle, hsl({file.hue ?? '200deg 50%'} / 0.8) 0%, hsl({file.hue ?? '200deg 50%'} / 0.4) 100%);"
								aria-hidden="true"
							></span>
						{:else}
							<span class="at-chip__icon" style="color: {kindColor(file.kind)};" aria-hidden="true">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
								</svg>
							</span>
						{/if}
						<span class="at-chip__name">{file.name}</span>
						<span class="at-chip__size">{file.size}</span>
						<button
							class="at-chip__remove"
							onclick={() => removeInlineFile(file.id)}
							aria-label="Remove {file.name}"
						>
							<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<p class="at-empty">All chips removed.</p>
		{/if}
	</div>

	<!-- ── 3. List Variant ───────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">List Variant</h3>
		<p class="ds-card__sub">
			Full-width rows with file icon, name, size, type badge, and action buttons. Best for
			reviewing multiple attachments before sending, or a file manager sidebar.
		</p>
		{#if listFiles.length > 0}
			<div class="at-list">
				{#each listFiles as file (file.id)}
					<div class="at-list__row">
						<!-- File icon -->
						<div class="at-list__icon" style="background: {kindBg(file.kind)};">
							{#if file.kind === 'image'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color: {kindColor(file.kind)};">
									<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
								</svg>
							{:else if file.kind === 'video'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color: {kindColor(file.kind)};">
									<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color: {kindColor(file.kind)};">
									<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
								</svg>
							{/if}
						</div>
						<!-- Info -->
						<div class="at-list__info">
							<span class="at-list__name">{file.name}</span>
							<span class="at-list__meta">{file.size}</span>
						</div>
						<!-- Type badge -->
						<span class="at-list__badge" style="background: {kindBg(file.kind)}; color: {kindColor(file.kind)};">
							{kindLabel(file.kind)}
						</span>
						<!-- Actions -->
						<div class="at-list__actions">
							<button
								class="at-list__action-btn"
								onclick={() => listPreviewId = listPreviewId === file.id ? null : file.id}
								aria-label="Preview {file.name}"
								title="Preview"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
								</svg>
							</button>
							<button
								class="at-list__action-btn"
								aria-label="Download {file.name}"
								title="Download"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
								</svg>
							</button>
							<button
								class="at-list__action-btn at-list__action-btn--danger"
								onclick={() => removeListFile(file.id)}
								aria-label="Remove {file.name}"
								title="Remove"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
								</svg>
							</button>
						</div>
					</div>
					{#if listPreviewId === file.id}
						<div class="at-list__preview-row">
							<p class="at-list__preview-placeholder">Preview of <strong>{file.name}</strong> ({file.size}) would render here.</p>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<p class="at-empty">All files removed.</p>
		{/if}
	</div>

	<!-- ── 4. Upload Progress ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Upload Progress</h3>
		<p class="ds-card__sub">
			Files in various upload states: animated progress bar while uploading, green checkmark on
			success, red failure state with a retry action. Click Retry to simulate re-upload.
		</p>
		{#if uploadFiles.length > 0}
			<div class="at-upload-list">
				{#each uploadFiles as file (file.id)}
					<div
						class="at-upload-row"
						class:at-upload-row--complete={file.status === 'complete'}
						class:at-upload-row--failed={file.status === 'failed'}
					>
						<!-- Icon -->
						<div class="at-upload-icon" style="background: {kindBg(file.kind)};">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color: {kindColor(file.kind)};">
								<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
							</svg>
						</div>
						<!-- Info + progress -->
						<div class="at-upload-body">
							<div class="at-upload-header">
								<span class="at-upload-name">{file.name}</span>
								<span class="at-upload-size">{file.size}</span>
								<!-- Status indicator -->
								{#if file.status === 'complete'}
									<span class="at-upload-status at-upload-status--ok">
										<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
											<polyline points="20 6 9 17 4 12"/>
										</svg>
										Done
									</span>
								{:else if file.status === 'failed'}
									<span class="at-upload-status at-upload-status--err">
										<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
											<path d="M18 6L6 18M6 6l12 12"/>
										</svg>
										Failed
									</span>
								{:else}
									<span class="at-upload-status at-upload-status--uploading">
										{file.progress}%
									</span>
								{/if}
							</div>
							<!-- Progress bar -->
							<div class="at-upload-track">
								<div
									class="at-upload-bar"
									class:at-upload-bar--ok={file.status === 'complete'}
									class:at-upload-bar--err={file.status === 'failed'}
									class:at-upload-bar--anim={file.status === 'uploading'}
									style="width: {file.progress}%;"
								></div>
							</div>
						</div>
						<!-- Actions -->
						<div class="at-upload-actions">
							{#if file.status === 'failed'}
								<button
									class="at-upload-btn at-upload-btn--retry"
									onclick={() => retryUpload(file.id)}
									aria-label="Retry uploading {file.name}"
								>
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
									</svg>
									Retry
								</button>
							{/if}
							<button
								class="at-upload-btn at-upload-btn--dismiss"
								onclick={() => dismissUpload(file.id)}
								aria-label="Dismiss {file.name}"
							>
								<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
									<path d="M18 6L6 18M6 6l12 12"/>
								</svg>
							</button>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="at-empty">All upload items dismissed.</p>
		{/if}
	</div>

	<!-- ── 5. Source Documents ───────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Source Documents</h3>
		<p class="ds-card__sub">
			Reference cards showing what documents the AI used to generate its response — title,
			source URL, relevance score, and a collapsible snippet. Click a card to expand it.
		</p>
		<div class="at-sources">
			<p class="at-sources__label">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
				</svg>
				{sourceDocs.length} sources referenced
			</p>
			<div class="at-sources__list">
				{#each sourceDocs as doc (doc.id)}
					<div class="at-source-card" class:at-source-card--expanded={expandedSourceId === doc.id}>
						<button
							class="at-source-card__header"
							onclick={() => toggleSource(doc.id)}
							aria-expanded={expandedSourceId === doc.id}
						>
							<!-- Index badge -->
							<span class="at-source-card__num">{doc.id}</span>
							<!-- Title + domain -->
							<div class="at-source-card__title-wrap">
								<span class="at-source-card__title">{doc.title}</span>
								<span class="at-source-card__domain">{doc.domain}</span>
							</div>
							<!-- Relevance pill -->
							<span
								class="at-source-card__relevance"
								style="color: {relevanceColor(doc.relevance)}; background: {relevanceColor(doc.relevance)}1a;"
							>
								{doc.relevance}%
							</span>
							<!-- Chevron -->
							<svg
								class="at-source-card__chevron"
								class:at-source-card__chevron--up={expandedSourceId === doc.id}
								width="13" height="13" viewBox="0 0 24 24" fill="none"
								stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							>
								<path d="M6 9l6 6 6-6"/>
							</svg>
						</button>
						{#if expandedSourceId === doc.id}
							<div class="at-source-card__body">
								<p class="at-source-card__snippet">"{doc.snippet}"</p>
								<a
									class="at-source-card__link"
									href="https://{doc.url}"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Open source: {doc.title}"
								>
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
									</svg>
									{doc.url}
								</a>
								<!-- Relevance bar -->
								<div class="at-source-card__rel-bar-wrap">
									<span class="at-source-card__rel-label">Relevance</span>
									<div class="at-source-card__rel-track">
										<div
											class="at-source-card__rel-fill"
											style="width: {doc.relevance}%; background: {relevanceColor(doc.relevance)};"
										></div>
									</div>
									<span class="at-source-card__rel-pct" style="color: {relevanceColor(doc.relevance)};">{doc.relevance}%</span>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 6. Attachment in Chat Context ────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Attachment in Chat Context</h3>
		<p class="ds-card__sub">
			Full chat input with attached files shown as compact thumbnails above the text field.
			The natural integration point — attachments visible before sending, each removable.
		</p>
		<div class="at-chat-wrap">
			<div
				class="at-chat-composer"
				class:at-chat-composer--focused={chatFocused}
				class:at-chat-composer--generating={isGeneratingChat}
			>
				<!-- Attached files row -->
				{#if chatAttachments.length > 0}
					<div class="at-chat-files">
						{#each chatAttachments as file (file.id)}
							<div class="at-chat-file">
								{#if file.kind === 'image'}
									<div
										class="at-chat-file__preview"
										style="background: radial-gradient(ellipse at 25% 25%, hsl({file.hue ?? '200deg 50%'} / 0.85) 0%, hsl({file.hue ?? '200deg 50%'} / 0.4) 100%);"
									>
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: white; opacity: 0.8;">
											<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
										</svg>
									</div>
								{:else}
									<div class="at-chat-file__preview at-chat-file__preview--doc" style="background: {kindBg(file.kind)};">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color: {kindColor(file.kind)};">
											<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
										</svg>
									</div>
								{/if}
								<div class="at-chat-file__info">
									<span class="at-chat-file__name">{file.name}</span>
									<span class="at-chat-file__size">{file.size}</span>
								</div>
								<button
									class="at-chat-file__remove"
									onclick={() => removeChatAttachment(file.id)}
									aria-label="Remove {file.name}"
								>
									<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
										<path d="M18 6L6 18M6 6l12 12"/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}
				<!-- Divider when files present -->
				{#if chatAttachments.length > 0}
					<div class="at-chat-divider"></div>
				{/if}
				<!-- Input row -->
				<div class="at-chat-input-row">
					<!-- Attach button -->
					<button
						class="at-chat-icon-btn"
						aria-label="Attach file"
						title="Attach a file"
					>
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
						</svg>
					</button>
					<input
						class="at-chat-input"
						type="text"
						placeholder={isGeneratingChat ? 'Generating response…' : 'Ask about the attached files…'}
						bind:value={chatInput}
						onfocus={() => chatFocused = true}
						onblur={() => chatFocused = false}
						disabled={isGeneratingChat}
						onkeydown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
					/>
					<!-- Send / Stop -->
					<button
						class="at-chat-send"
						class:at-chat-send--active={chatInput.trim().length > 0 || chatAttachments.length > 0 || isGeneratingChat}
						onclick={isGeneratingChat ? () => { isGeneratingChat = false; } : handleChatSend}
						aria-label={isGeneratingChat ? 'Stop generation' : 'Send message'}
					>
						{#if isGeneratingChat}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
								<rect x="4" y="4" width="16" height="16" rx="2"/>
							</svg>
						{:else}
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 19V5M5 12l7-7 7 7"/>
							</svg>
						{/if}
					</button>
				</div>
			</div>
			<p class="at-chat-hint">
				{#if isGeneratingChat}
					Generating… click the stop button to cancel.
				{:else if chatAttachments.length > 0}
					{chatAttachments.length} file{chatAttachments.length !== 1 ? 's' : ''} attached — type a message and press Send or Enter.
				{:else}
					All attachments removed. Click the paperclip to attach files.
				{/if}
			</p>
		</div>
	</div>
</section>

<style>
/* ────────────────────────────────────────────────────────────
   Shared helpers
──────────────────────────────────────────────────────────── */
.at-empty {
	font-size: 13px;
	color: var(--dt3);
	padding: 16px 0;
	font-style: italic;
}

/* ────────────────────────────────────────────────────────────
   Demo 1 — Grid
──────────────────────────────────────────────────────────── */
.at-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
	gap: 12px;
}

.at-grid__item {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.at-grid__item:hover .at-grid__remove {
	opacity: 1;
	transform: scale(1);
}

.at-grid__thumb {
	width: 100%;
	aspect-ratio: 1;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
	border: 1px solid var(--dbd);
}

.at-grid__thumb-icon {
	color: rgba(255, 255, 255, 0.7);
}

.at-grid__thumb--video {
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
}

.at-grid__thumb--doc {
	background: var(--dbg2);
	flex-direction: column;
	gap: 6px;
}

.at-grid__ext-badge {
	font-size: 9px;
	font-weight: 700;
	letter-spacing: 0.06em;
	padding: 2px 6px;
	border-radius: 4px;
	text-transform: uppercase;
}

.at-grid__play {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.at-grid__remove {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: none;
	background: var(--dbg);
	color: var(--dt2);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0;
	transform: scale(0.8);
	transition: opacity 0.15s, transform 0.15s, background 0.1s;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	z-index: 2;
}

.at-grid__remove:hover {
	background: var(--dbg3);
	color: var(--dt);
}

.at-grid__name {
	font-size: 11px;
	font-weight: 500;
	color: var(--dt2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin: 0;
	line-height: 1.3;
}

.at-grid__size {
	font-size: 10px;
	color: var(--dt4);
	margin: 0;
}

/* ────────────────────────────────────────────────────────────
   Demo 2 — Inline chips
──────────────────────────────────────────────────────────── */
.at-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.at-chip {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 5px 8px 5px 6px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 8px;
	max-width: 220px;
	transition: border-color 0.12s, background 0.12s;
}

.at-chip:hover {
	border-color: var(--dbd2);
	background: var(--dbg3);
}

.at-chip__thumb {
	width: 22px;
	height: 22px;
	border-radius: 4px;
	flex-shrink: 0;
	display: block;
}

.at-chip__icon {
	width: 22px;
	height: 22px;
	border-radius: 4px;
	background: var(--dbg3);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.at-chip__name {
	font-size: 12px;
	font-weight: 500;
	color: var(--dt2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 110px;
}

.at-chip__size {
	font-size: 11px;
	color: var(--dt4);
	white-space: nowrap;
	flex-shrink: 0;
}

.at-chip__remove {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: none;
	background: transparent;
	color: var(--dt4);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0;
	flex-shrink: 0;
	transition: background 0.1s, color 0.1s;
}

.at-chip__remove:hover {
	background: var(--dbg);
	color: var(--dt);
}

/* ────────────────────────────────────────────────────────────
   Demo 3 — List
──────────────────────────────────────────────────────────── */
.at-list {
	display: flex;
	flex-direction: column;
	border: 1px solid var(--dbd);
	border-radius: 12px;
	overflow: hidden;
}

.at-list__row {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 14px;
	border-bottom: 1px solid var(--dbd);
	transition: background 0.1s;
}

.at-list__row:last-child {
	border-bottom: none;
}

.at-list__row:hover {
	background: var(--dbg2);
}

.at-list__icon {
	width: 36px;
	height: 36px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.at-list__info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 2px;
	min-width: 0;
}

.at-list__name {
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.at-list__meta {
	font-size: 11px;
	color: var(--dt4);
}

.at-list__badge {
	font-size: 11px;
	font-weight: 600;
	padding: 3px 9px;
	border-radius: 20px;
	white-space: nowrap;
	flex-shrink: 0;
}

.at-list__actions {
	display: flex;
	align-items: center;
	gap: 2px;
	flex-shrink: 0;
}

.at-list__action-btn {
	width: 30px;
	height: 30px;
	border-radius: 7px;
	border: none;
	background: transparent;
	color: var(--dt3);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.1s, color 0.1s;
}

.at-list__action-btn:hover {
	background: var(--dbg3);
	color: var(--dt);
}

.at-list__action-btn--danger:hover {
	background: rgba(220, 38, 38, 0.1);
	color: rgba(220, 38, 38, 0.85);
}

.at-list__preview-row {
	padding: 10px 14px 12px 62px;
	background: var(--dbg2);
	border-bottom: 1px solid var(--dbd);
}

.at-list__preview-row:last-child {
	border-bottom: none;
}

.at-list__preview-placeholder {
	font-size: 12px;
	color: var(--dt3);
	font-style: italic;
	margin: 0;
}

/* ────────────────────────────────────────────────────────────
   Demo 4 — Upload progress
──────────────────────────────────────────────────────────── */
.at-upload-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.at-upload-row {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 12px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 10px;
	transition: border-color 0.15s;
}

.at-upload-row--complete {
	border-color: rgba(22, 163, 74, 0.25);
}

.at-upload-row--failed {
	border-color: rgba(220, 38, 38, 0.25);
}

.at-upload-icon {
	width: 34px;
	height: 34px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.at-upload-body {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 5px;
	min-width: 0;
}

.at-upload-header {
	display: flex;
	align-items: center;
	gap: 8px;
}

.at-upload-name {
	font-size: 13px;
	font-weight: 500;
	color: var(--dt);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
	min-width: 0;
}

.at-upload-size {
	font-size: 11px;
	color: var(--dt4);
	flex-shrink: 0;
}

.at-upload-status {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	font-size: 11px;
	font-weight: 600;
	flex-shrink: 0;
}

.at-upload-status--ok {
	color: #16a34a;
}

.at-upload-status--err {
	color: rgba(220, 38, 38, 0.85);
}

.at-upload-status--uploading {
	color: var(--dt3);
	font-variant-numeric: tabular-nums;
}

.at-upload-track {
	height: 4px;
	background: var(--dbg3);
	border-radius: 2px;
	overflow: hidden;
}

.at-upload-bar {
	height: 100%;
	border-radius: 2px;
	background: var(--dt3);
	transition: width 0.3s ease;
}

.at-upload-bar--ok {
	background: #16a34a;
}

.at-upload-bar--err {
	background: rgba(220, 38, 38, 0.7);
}

.at-upload-bar--anim {
	background: linear-gradient(90deg, var(--dt3) 0%, var(--dt2) 60%, var(--dt3) 100%);
	background-size: 200% 100%;
	animation: at-shimmer 1.6s linear infinite;
}

@keyframes at-shimmer {
	0%   { background-position: 200% center; }
	100% { background-position: -200% center; }
}

.at-upload-actions {
	display: flex;
	align-items: center;
	gap: 4px;
	flex-shrink: 0;
}

.at-upload-btn {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 4px 10px;
	border-radius: 7px;
	border: 1px solid var(--dbd);
	background: transparent;
	font-size: 11px;
	font-family: inherit;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.1s, border-color 0.1s, color 0.1s;
}

.at-upload-btn--retry {
	color: rgba(220, 38, 38, 0.85);
	border-color: rgba(220, 38, 38, 0.25);
}

.at-upload-btn--retry:hover {
	background: rgba(220, 38, 38, 0.08);
	border-color: rgba(220, 38, 38, 0.4);
}

.at-upload-btn--dismiss {
	width: 26px;
	height: 26px;
	padding: 0;
	justify-content: center;
	color: var(--dt4);
	border-color: transparent;
}

.at-upload-btn--dismiss:hover {
	background: var(--dbg3);
	color: var(--dt);
	border-color: var(--dbd);
}

/* ────────────────────────────────────────────────────────────
   Demo 5 — Source documents
──────────────────────────────────────────────────────────── */
.at-sources {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.at-sources__label {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
	font-weight: 600;
	color: var(--dt3);
	text-transform: uppercase;
	letter-spacing: 0.06em;
	margin: 0;
}

.at-sources__list {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.at-source-card {
	border: 1px solid var(--dbd);
	border-radius: 10px;
	overflow: hidden;
	background: var(--dbg2);
	transition: border-color 0.15s;
}

.at-source-card:hover {
	border-color: var(--dbd2);
}

.at-source-card--expanded {
	border-color: var(--dbd2);
}

.at-source-card__header {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px 12px;
	background: transparent;
	border: none;
	cursor: pointer;
	text-align: left;
	transition: background 0.1s;
}

.at-source-card__header:hover {
	background: var(--dbg3);
}

.at-source-card__num {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: var(--dbg3);
	border: 1px solid var(--dbd2);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	font-weight: 700;
	color: var(--dt2);
	flex-shrink: 0;
}

.at-source-card__title-wrap {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1px;
	min-width: 0;
}

.at-source-card__title {
	font-size: 13px;
	font-weight: 600;
	color: var(--dt);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.at-source-card__domain {
	font-size: 11px;
	color: var(--dt4);
	font-family: monospace;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.at-source-card__relevance {
	font-size: 11px;
	font-weight: 700;
	padding: 2px 8px;
	border-radius: 20px;
	flex-shrink: 0;
}

.at-source-card__chevron {
	color: var(--dt3);
	flex-shrink: 0;
	transition: transform 0.2s;
}

.at-source-card__chevron--up {
	transform: rotate(180deg);
}

.at-source-card__body {
	padding: 0 12px 12px 42px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.at-source-card__snippet {
	font-size: 12px;
	color: var(--dt3);
	font-style: italic;
	line-height: 1.6;
	margin: 0;
	border-left: 2px solid var(--dbd2);
	padding-left: 10px;
}

.at-source-card__link {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	font-size: 11px;
	color: var(--dt3);
	text-decoration: none;
	font-family: monospace;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	transition: color 0.1s;
}

.at-source-card__link:hover {
	color: var(--dt);
	text-decoration: underline;
}

.at-source-card__rel-bar-wrap {
	display: flex;
	align-items: center;
	gap: 8px;
}

.at-source-card__rel-label {
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--dt4);
	white-space: nowrap;
}

.at-source-card__rel-track {
	flex: 1;
	height: 4px;
	background: var(--dbg3);
	border-radius: 2px;
	overflow: hidden;
}

.at-source-card__rel-fill {
	height: 100%;
	border-radius: 2px;
	transition: width 0.4s ease;
}

.at-source-card__rel-pct {
	font-size: 11px;
	font-weight: 700;
	white-space: nowrap;
	font-variant-numeric: tabular-nums;
}

/* ────────────────────────────────────────────────────────────
   Demo 6 — Chat context
──────────────────────────────────────────────────────────── */
.at-chat-wrap {
	max-width: 560px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.at-chat-composer {
	border: 1.5px solid var(--dbd);
	border-radius: 16px;
	background: var(--dbg);
	overflow: hidden;
	transition: border-color 0.15s, box-shadow 0.15s;
}

.at-chat-composer--focused {
	border-color: var(--dbd2);
	box-shadow: 0 0 0 3px var(--dbg3);
}

.at-chat-composer--generating {
	border-color: var(--dbd2);
	animation: at-pulse-border 1.8s ease-in-out infinite;
}

@keyframes at-pulse-border {
	0%, 100% { box-shadow: 0 0 0 0px var(--dbg3); }
	50%       { box-shadow: 0 0 0 4px var(--dbg3); }
}

.at-chat-files {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	padding: 10px 12px 8px;
}

.at-chat-file {
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 5px 7px;
	background: var(--dbg2);
	border: 1px solid var(--dbd);
	border-radius: 8px;
	max-width: 180px;
	transition: border-color 0.12s;
}

.at-chat-file:hover {
	border-color: var(--dbd2);
}

.at-chat-file__preview {
	width: 28px;
	height: 28px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.at-chat-file__preview--doc {
	/* background set inline */
}

.at-chat-file__info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1px;
	min-width: 0;
}

.at-chat-file__name {
	font-size: 11px;
	font-weight: 500;
	color: var(--dt2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.at-chat-file__size {
	font-size: 10px;
	color: var(--dt4);
}

.at-chat-file__remove {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: none;
	background: transparent;
	color: var(--dt4);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0;
	flex-shrink: 0;
	transition: background 0.1s, color 0.1s;
}

.at-chat-file__remove:hover {
	background: var(--dbg3);
	color: var(--dt);
}

.at-chat-divider {
	height: 1px;
	background: var(--dbd);
	margin: 0;
}

.at-chat-input-row {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 8px 8px 12px;
}

.at-chat-icon-btn {
	width: 30px;
	height: 30px;
	border-radius: 8px;
	border: none;
	background: transparent;
	color: var(--dt3);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 0;
	transition: background 0.1s, color 0.1s;
}

.at-chat-icon-btn:hover {
	background: var(--dbg2);
	color: var(--dt2);
}

.at-chat-input {
	flex: 1;
	border: none;
	background: transparent;
	outline: none;
	font-size: 14px;
	color: var(--dt);
	font-family: inherit;
	min-width: 0;
}

.at-chat-input::placeholder {
	color: var(--dt4);
}

.at-chat-input:disabled {
	cursor: not-allowed;
	opacity: 0.6;
}

.at-chat-send {
	flex-shrink: 0;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: none;
	background: var(--dbg3);
	color: var(--dt4);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.15s, color 0.15s, transform 0.1s;
}

.at-chat-send--active {
	background: var(--dt);
	color: #fff !important;
}

.at-chat-send--active:hover {
	opacity: 0.85;
	transform: scale(1.05);
}

.at-chat-hint {
	font-size: 12px;
	color: var(--dt4);
	margin: 0;
	padding: 0 2px;
}

/* ────────────────────────────────────────────────────────────
   Dark mode overrides (via :global body class)
──────────────────────────────────────────────────────────── */
:global(.dark) .at-grid__thumb--video {
	background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%);
}

:global(.dark) .at-upload-bar--anim {
	background: linear-gradient(90deg, var(--dt4) 0%, var(--dt3) 60%, var(--dt4) 100%);
	background-size: 200% 100%;
	animation: at-shimmer 1.6s linear infinite;
}

:global(.dark) .at-chat-send--active {
	background: #e5e5e5;
	color: #111 !important;
}
</style>
