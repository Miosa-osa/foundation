<script lang="ts">
	// ── Demo 1: Basic File Input ──────────────────────────────────────────────
	let basicFileName = $state('No file chosen');

	function handleBasicInput(e: Event) {
		const input = e.target as HTMLInputElement;
		basicFileName = input.files?.[0]?.name ?? 'No file chosen';
	}

	// ── Demo 2: Drag & Drop Zone ──────────────────────────────────────────────
	let dropOver = $state(false);
	let dropZoneFile = $state<string | null>(null);

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dropOver = false;
		const file = e.dataTransfer?.files?.[0];
		if (file) dropZoneFile = file.name;
	}

	// ── Demo 3: File List ─────────────────────────────────────────────────────
	let fileList = $state([
		{ id: 1, name: 'product-brief.pdf', size: '2.4 MB', type: 'pdf' },
		{ id: 2, name: 'design-tokens.json', size: '18 KB', type: 'json' },
		{ id: 3, name: 'cover-photo.png', size: '1.1 MB', type: 'img' },
	]);

	function removeFile(id: number) {
		fileList = fileList.filter((f) => f.id !== id);
	}

	// ── Demo 4: Upload Progress ───────────────────────────────────────────────
	let progressFiles = $state([
		{ id: 1, name: 'annual-report.pdf', size: '5.8 MB', pct: 72, uploading: true },
		{ id: 2, name: 'assets.zip', size: '14.3 MB', pct: 35, uploading: true },
		{ id: 3, name: 'logo-variants.ai', size: '3.2 MB', pct: 100, uploading: false },
	]);

	function cancelUpload(id: number) {
		progressFiles = progressFiles.filter((f) => f.id !== id);
	}

	// ── Demo 5: Image Preview ─────────────────────────────────────────────────
	let previewImages = $state([
		{ id: 1, label: 'Hero banner', hue: '220deg 18%' },
		{ id: 2, label: 'Product shot', hue: '200deg 20%' },
		{ id: 3, label: 'Team photo', hue: '240deg 15%' },
		{ id: 4, label: 'Office interior', hue: '210deg 22%' },
	]);

	function removePreview(id: number) {
		previewImages = previewImages.filter((p) => p.id !== id);
	}

	// ── Demo 6: File Type Restrictions ───────────────────────────────────────
	let restrictDropOver = $state(false);
	let restrictError = $state(false);
	let restrictSuccess = $state(false);

	const ALLOWED = ['.png', '.jpg', '.pdf'];

	function handleRestrictDrop(e: DragEvent) {
		e.preventDefault();
		restrictDropOver = false;
		const file = e.dataTransfer?.files?.[0];
		if (!file) return;
		const ext = '.' + file.name.split('.').pop()?.toLowerCase();
		if (ALLOWED.includes(ext)) {
			restrictSuccess = true;
			restrictError = false;
		} else {
			restrictError = true;
			restrictSuccess = false;
		}
	}

	// ── Demo 7: Multi-File Upload ─────────────────────────────────────────────
	let multiDropOver = $state(false);
	let multiFiles = $state([
		{ id: 1, name: 'contracts.pdf', size: '812 KB', pct: 100, status: 'done' as 'done' | 'uploading' | 'error' },
		{ id: 2, name: 'invoice-march.xlsx', size: '44 KB', pct: 58, status: 'uploading' as 'done' | 'uploading' | 'error' },
		{ id: 3, name: 'broken-file.tmp', size: '2.1 MB', pct: 20, status: 'error' as 'done' | 'uploading' | 'error' },
	]);

	function removeMulti(id: number) {
		multiFiles = multiFiles.filter((f) => f.id !== id);
	}

	// ── Demo 8: Avatar Upload ─────────────────────────────────────────────────
	let avatarHover = $state(false);
	let avatarFile = $state<string | null>(null);

	function handleAvatarInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) avatarFile = file.name;
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">File Upload</h2>
	<p class="ds-desc">
		Upload primitives and composed patterns — styled inputs, drag-and-drop zones, file lists,
		progress tracking, image previews, type restrictions, and avatar upload.
	</p>

	<!-- ═══ 1. BASIC FILE INPUT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic File Input</h3>
		<p class="ds-card__sub">Styled file input with custom label and selected-filename display</p>
		<div class="ds-demo">
			<div class="fu-basic-wrap">
				<label class="fu-basic-btn" for="fu-basic-input">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
						<polyline points="17 8 12 3 7 8"/>
						<line x1="12" y1="3" x2="12" y2="15"/>
					</svg>
					Choose File
				</label>
				<input
					id="fu-basic-input"
					type="file"
					class="fu-hidden-input"
					oninput={handleBasicInput}
					aria-label="Upload a file"
				/>
				<span class="fu-basic-name">{basicFileName}</span>
			</div>
		</div>
	</div>

	<!-- ═══ 2. DRAG & DROP ZONE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Drag & Drop Zone</h3>
		<p class="ds-card__sub">Dashed border zone with icon. Border highlights on dragover</p>
		<div class="ds-demo">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="fu-dropzone"
				class:fu-dropzone--over={dropOver}
				role="button"
				tabindex="0"
				aria-label="Drop files here or click to browse"
				ondragover={(e) => { e.preventDefault(); dropOver = true; }}
				ondragleave={() => { dropOver = false; }}
				ondrop={handleDrop}
			>
				<div class="fu-dz-icon">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<polyline points="16 16 12 12 8 16"/>
						<line x1="12" y1="12" x2="12" y2="21"/>
						<path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
					</svg>
				</div>
				{#if dropZoneFile}
					<p class="fu-dz-text"><strong>{dropZoneFile}</strong> ready to upload</p>
					<p class="fu-dz-sub">Drop another file to replace</p>
				{:else}
					<p class="fu-dz-text">Drag files here or <span class="fu-dz-link">click to browse</span></p>
					<p class="fu-dz-sub">Supports any file type up to 50 MB</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 3. FILE LIST ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">File List</h3>
		<p class="ds-card__sub">Uploaded files with icon, name, size, and remove action</p>
		<div class="ds-demo">
			<div class="fu-list">
				{#each fileList as file (file.id)}
					<div class="fu-list-item">
						<div class="fu-list-icon fu-list-icon--{file.type}" aria-hidden="true">
							{#if file.type === 'pdf'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
							{:else if file.type === 'json'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
							{:else}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
							{/if}
						</div>
						<div class="fu-list-info">
							<span class="fu-list-name">{file.name}</span>
							<span class="fu-list-size">{file.size}</span>
						</div>
						<button
							class="fu-list-remove"
							onclick={() => removeFile(file.id)}
							aria-label="Remove {file.name}"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
								<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
							</svg>
						</button>
					</div>
				{/each}
				{#if fileList.length === 0}
					<p class="fu-list-empty">All files removed.</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 4. UPLOAD PROGRESS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Upload Progress</h3>
		<p class="ds-card__sub">File items with animated progress bars, percentage readout, and cancel action</p>
		<div class="ds-demo">
			<div class="fu-progress-list">
				{#each progressFiles as file (file.id)}
					<div class="fu-progress-item">
						<div class="fu-progress-header">
							<div class="fu-progress-info">
								<span class="fu-progress-name">{file.name}</span>
								<span class="fu-progress-size">{file.size}</span>
							</div>
							<div class="fu-progress-actions">
								<span class="fu-progress-pct">{file.pct}%</span>
								{#if file.uploading}
									<button
										class="fu-progress-cancel"
										onclick={() => cancelUpload(file.id)}
										aria-label="Cancel upload of {file.name}"
									>
										<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
											<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
										</svg>
									</button>
								{:else}
									<span class="fu-progress-done-icon" aria-label="Upload complete">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
											<polyline points="20 6 9 17 4 12"/>
										</svg>
									</span>
								{/if}
							</div>
						</div>
						<div class="fu-progress-track" role="progressbar" aria-valuenow={file.pct} aria-valuemin={0} aria-valuemax={100}>
							<div
								class="fu-progress-fill"
								class:fu-progress-fill--done={!file.uploading}
								style="width: {file.pct}%"
							></div>
						</div>
					</div>
				{/each}
				{#if progressFiles.length === 0}
					<p class="fu-list-empty">All uploads cancelled.</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 5. IMAGE PREVIEW ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image Preview Grid</h3>
		<p class="ds-card__sub">Thumbnail grid with hover overlay and delete action</p>
		<div class="ds-demo">
			<div class="fu-preview-grid">
				{#each previewImages as img (img.id)}
					<div class="fu-preview-thumb">
						<div
							class="fu-preview-img"
							style="background: hsl({img.hue} 28%);"
							role="img"
							aria-label={img.label}
						></div>
						<div class="fu-preview-overlay" aria-hidden="true">
							<button
								class="fu-preview-del"
								onclick={() => removePreview(img.id)}
								aria-label="Remove {img.label}"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
									<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
								</svg>
							</button>
						</div>
						<span class="fu-preview-label">{img.label}</span>
					</div>
				{/each}
				{#if previewImages.length === 0}
					<p class="fu-list-empty" style="grid-column: 1/-1;">All images removed.</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 6. FILE TYPE RESTRICTIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">File Type Restrictions</h3>
		<p class="ds-card__sub">Accepted types shown as pills; error state on invalid file drop</p>
		<div class="ds-demo">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="fu-dropzone fu-dropzone--restrict"
				class:fu-dropzone--over={restrictDropOver}
				class:fu-dropzone--error={restrictError}
				class:fu-dropzone--success={restrictSuccess}
				role="button"
				tabindex="0"
				aria-label="Drop accepted files here"
				ondragover={(e) => { e.preventDefault(); restrictDropOver = true; }}
				ondragleave={() => { restrictDropOver = false; }}
				ondrop={handleRestrictDrop}
			>
				<div class="fu-dz-icon">
					{#if restrictError}
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
					{:else if restrictSuccess}
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/>
						</svg>
					{:else}
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
						</svg>
					{/if}
				</div>
				{#if restrictError}
					<p class="fu-dz-text fu-dz-text--error">Invalid file type</p>
					<p class="fu-dz-sub">Only .png, .jpg, and .pdf are accepted</p>
				{:else if restrictSuccess}
					<p class="fu-dz-text fu-dz-text--success">File accepted</p>
					<p class="fu-dz-sub">Drop another file to replace</p>
				{:else}
					<p class="fu-dz-text">Drop a file to validate type</p>
					<p class="fu-dz-sub">Accepted formats</p>
				{/if}
				<div class="fu-type-pills" aria-label="Accepted file types">
					{#each ALLOWED as type}
						<span class="fu-type-pill">{type}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 7. MULTI-FILE UPLOAD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Multi-File Upload</h3>
		<p class="ds-card__sub">Drop zone with queued file list — individual progress bars and status icons</p>
		<div class="ds-demo" style="flex-direction: column; gap: 12px; width: 100%; max-width: 520px;">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="fu-dropzone fu-dropzone--compact"
				class:fu-dropzone--over={multiDropOver}
				role="button"
				tabindex="0"
				aria-label="Drop multiple files here"
				ondragover={(e) => { e.preventDefault(); multiDropOver = true; }}
				ondragleave={() => { multiDropOver = false; }}
				ondrop={(e) => { e.preventDefault(); multiDropOver = false; }}
			>
				<div class="fu-dz-icon">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
						<path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
					</svg>
				</div>
				<p class="fu-dz-text">Drop multiple files or <span class="fu-dz-link">browse</span></p>
			</div>
			<div class="fu-multi-list">
				{#each multiFiles as file (file.id)}
					<div class="fu-multi-item">
						<div class="fu-multi-status" aria-label="Status: {file.status}">
							{#if file.status === 'done'}
								<span class="fu-status-icon fu-status-icon--done">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
								</span>
							{:else if file.status === 'error'}
								<span class="fu-status-icon fu-status-icon--error">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								</span>
							{:else}
								<span class="fu-status-icon fu-status-icon--spin" aria-label="Uploading">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
								</span>
							{/if}
						</div>
						<div class="fu-multi-body">
							<div class="fu-multi-header">
								<span class="fu-multi-name">{file.name}</span>
								<span class="fu-multi-size">{file.size}</span>
								<button
									class="fu-list-remove"
									onclick={() => removeMulti(file.id)}
									aria-label="Remove {file.name}"
								>
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
										<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
									</svg>
								</button>
							</div>
							<div class="fu-progress-track" role="progressbar" aria-valuenow={file.pct} aria-valuemin={0} aria-valuemax={100}>
								<div
									class="fu-progress-fill"
									class:fu-progress-fill--done={file.status === 'done'}
									class:fu-progress-fill--error={file.status === 'error'}
									style="width: {file.pct}%"
								></div>
							</div>
						</div>
					</div>
				{/each}
				{#if multiFiles.length === 0}
					<p class="fu-list-empty">Queue is empty.</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 8. AVATAR UPLOAD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Avatar Upload</h3>
		<p class="ds-card__sub">Circular upload zone for profile pictures with camera overlay and "Change Photo" label</p>
		<div class="ds-demo">
			<div class="fu-avatar-wrap">
				<label
					class="fu-avatar-zone"
					for="fu-avatar-input"
					aria-label="Upload profile photo"
					onmouseenter={() => { avatarHover = true; }}
					onmouseleave={() => { avatarHover = false; }}
				>
					<!-- Gradient placeholder face -->
					<div class="fu-avatar-bg" aria-hidden="true">
						<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
							<circle cx="12" cy="7" r="4"/>
						</svg>
					</div>
					<!-- Hover overlay -->
					<div class="fu-avatar-overlay" class:fu-avatar-overlay--visible={avatarHover} aria-hidden="true">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
							<circle cx="12" cy="13" r="4"/>
						</svg>
					</div>
					<input
						id="fu-avatar-input"
						type="file"
						accept="image/*"
						class="fu-hidden-input"
						oninput={handleAvatarInput}
						aria-label="Choose a profile photo"
					/>
				</label>
				<div class="fu-avatar-meta">
					<span class="fu-avatar-label">
						{#if avatarFile}
							{avatarFile}
						{:else}
							Change Photo
						{/if}
					</span>
					<span class="fu-avatar-hint">JPG, PNG or GIF · max 5 MB</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Shared utilities ─────────────────────────────────────────────────── */
	.fu-hidden-input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	.fu-list-empty {
		font-size: 13px;
		color: var(--dt4);
		padding: 8px 0;
		margin: 0;
	}

	/* ── 1. Basic File Input ─────────────────────────────────────────────── */
	.fu-basic-wrap {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.fu-basic-btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 8px 16px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.01em;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
		white-space: nowrap;
	}

	.fu-basic-btn:hover {
		background: var(--dbg3);
		border-color: var(--dbd2);
	}

	.fu-basic-name {
		font-size: 13px;
		color: var(--dt3);
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* ── 2 & 6 & 7. Drop Zones ───────────────────────────────────────────── */
	.fu-dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 100%;
		max-width: 480px;
		min-height: 160px;
		padding: 28px 24px;
		border-radius: 14px;
		border: 2px dashed var(--dbd2);
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.18s, background 0.18s;
		text-align: center;
	}

	.fu-dropzone:focus-visible {
		outline: 2px solid var(--dbd2);
		outline-offset: 2px;
	}

	.fu-dropzone--over {
		border-color: var(--dt2);
		background: var(--dbg3);
	}

	.fu-dropzone--compact {
		min-height: 90px;
		padding: 18px 20px;
		gap: 4px;
	}

	.fu-dropzone--restrict.fu-dropzone--error {
		border-color: hsl(0deg 70% 55%);
		background: hsl(0deg 70% 55% / 0.06);
	}

	.fu-dropzone--restrict.fu-dropzone--success {
		border-color: hsl(145deg 55% 42%);
		background: hsl(145deg 55% 42% / 0.06);
	}

	.fu-dz-icon {
		color: var(--dt3);
		margin-bottom: 2px;
		transition: color 0.18s;
	}

	.fu-dropzone--over .fu-dz-icon {
		color: var(--dt2);
	}

	.fu-dropzone--error .fu-dz-icon {
		color: hsl(0deg 70% 55%);
	}

	.fu-dropzone--success .fu-dz-icon {
		color: hsl(145deg 55% 42%);
	}

	.fu-dz-text {
		margin: 0;
		font-size: 14px;
		font-weight: 500;
		color: var(--dt);
	}

	.fu-dz-text--error {
		color: hsl(0deg 70% 55%);
	}

	.fu-dz-text--success {
		color: hsl(145deg 55% 42%);
	}

	.fu-dz-sub {
		margin: 0;
		font-size: 12px;
		color: var(--dt4);
	}

	.fu-dz-link {
		color: var(--dt2);
		text-decoration: underline;
		text-underline-offset: 2px;
		cursor: pointer;
	}

	/* ── 3. File List ────────────────────────────────────────────────────── */
	.fu-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		max-width: 480px;
	}

	.fu-list-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.fu-list-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		flex-shrink: 0;
		color: var(--dt2);
		background: var(--dbg3);
	}

	.fu-list-icon--pdf { background: hsl(0deg 60% 50% / 0.12); color: hsl(0deg 60% 55%); }
	.fu-list-icon--json { background: hsl(210deg 60% 50% / 0.12); color: hsl(210deg 60% 60%); }
	.fu-list-icon--img { background: hsl(270deg 50% 55% / 0.12); color: hsl(270deg 50% 60%); }

	.fu-list-info {
		display: flex;
		flex-direction: column;
		gap: 1px;
		flex: 1;
		min-width: 0;
	}

	.fu-list-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fu-list-size {
		font-size: 11px;
		color: var(--dt4);
	}

	.fu-list-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--dt4);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.12s, color 0.12s;
	}

	.fu-list-remove:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* ── 4. Upload Progress ──────────────────────────────────────────────── */
	.fu-progress-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 480px;
	}

	.fu-progress-item {
		display: flex;
		flex-direction: column;
		gap: 7px;
		padding: 12px 14px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.fu-progress-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.fu-progress-info {
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
		flex: 1;
	}

	.fu-progress-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fu-progress-size {
		font-size: 11px;
		color: var(--dt4);
	}

	.fu-progress-actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.fu-progress-pct {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		min-width: 30px;
		text-align: right;
	}

	.fu-progress-cancel {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		border: none;
		background: transparent;
		color: var(--dt4);
		cursor: pointer;
		transition: background 0.12s, color 0.12s;
	}

	.fu-progress-cancel:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.fu-progress-done-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: hsl(145deg 55% 42% / 0.15);
		color: hsl(145deg 55% 42%);
	}

	.fu-progress-track {
		width: 100%;
		height: 4px;
		border-radius: 99px;
		background: var(--dbg3);
		overflow: hidden;
	}

	.fu-progress-fill {
		height: 100%;
		border-radius: 99px;
		background: var(--dt2);
		transition: width 0.4s ease;
	}

	.fu-progress-fill--done {
		background: hsl(145deg 55% 42%);
	}

	.fu-progress-fill--error {
		background: hsl(0deg 65% 55%);
	}

	/* ── 5. Image Preview Grid ───────────────────────────────────────────── */
	.fu-preview-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		width: 100%;
		max-width: 480px;
	}

	.fu-preview-thumb {
		display: flex;
		flex-direction: column;
		gap: 5px;
		position: relative;
	}

	.fu-preview-img {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 10px;
		border: 1px solid var(--dbd);
	}

	.fu-preview-overlay {
		position: absolute;
		inset: 0;
		border-radius: 10px;
		background: hsl(0deg 0% 0% / 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.16s;
		pointer-events: none;
	}

	.fu-preview-thumb:hover .fu-preview-overlay,
	.fu-preview-thumb:focus-within .fu-preview-overlay {
		opacity: 1;
		pointer-events: auto;
	}

	.fu-preview-del {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: 1px solid hsl(0deg 0% 100% / 0.2);
		background: hsl(0deg 0% 100% / 0.12);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(4px);
		transition: background 0.12s;
	}

	.fu-preview-del:hover {
		background: hsl(0deg 0% 100% / 0.22);
	}

	.fu-preview-label {
		font-size: 10px;
		color: var(--dt4);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ── 6. Type Pills ───────────────────────────────────────────────────── */
	.fu-type-pills {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 4px;
	}

	.fu-type-pill {
		padding: 3px 9px;
		border-radius: 99px;
		border: 1px solid var(--dbd2);
		background: var(--dbg3);
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		letter-spacing: 0.02em;
	}

	.fu-dropzone--error .fu-type-pill {
		border-color: hsl(0deg 70% 55% / 0.4);
		color: hsl(0deg 70% 55%);
		background: hsl(0deg 70% 55% / 0.08);
	}

	.fu-dropzone--success .fu-type-pill {
		border-color: hsl(145deg 55% 42% / 0.4);
		color: hsl(145deg 55% 42%);
		background: hsl(145deg 55% 42% / 0.08);
	}

	/* ── 7. Multi-File Upload ────────────────────────────────────────────── */
	.fu-multi-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
	}

	.fu-multi-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 10px 12px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.fu-multi-status {
		margin-top: 2px;
		flex-shrink: 0;
	}

	.fu-status-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
	}

	.fu-status-icon--done {
		background: hsl(145deg 55% 42% / 0.15);
		color: hsl(145deg 55% 42%);
	}

	.fu-status-icon--error {
		background: hsl(0deg 65% 55% / 0.12);
		color: hsl(0deg 65% 55%);
	}

	.fu-status-icon--spin {
		background: var(--dbg3);
		color: var(--dt2);
		animation: fu-spin 0.9s linear infinite;
	}

	@keyframes fu-spin {
		to { transform: rotate(360deg); }
	}

	.fu-multi-body {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex: 1;
		min-width: 0;
	}

	.fu-multi-header {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.fu-multi-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fu-multi-size {
		font-size: 11px;
		color: var(--dt4);
		flex-shrink: 0;
	}

	/* ── 8. Avatar Upload ────────────────────────────────────────────────── */
	.fu-avatar-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.fu-avatar-zone {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 2px dashed var(--dbd2);
		background: var(--dbg2);
		cursor: pointer;
		overflow: hidden;
		transition: border-color 0.16s;
	}

	.fu-avatar-zone:hover {
		border-color: var(--dt2);
	}

	.fu-avatar-bg {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: var(--dt3);
		background: linear-gradient(145deg, var(--dbg3) 0%, var(--dbg2) 100%);
	}

	.fu-avatar-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: hsl(0deg 0% 0% / 0.5);
		color: #fff;
		opacity: 0;
		transition: opacity 0.16s;
		pointer-events: none;
		backdrop-filter: blur(2px);
	}

	.fu-avatar-overlay--visible {
		opacity: 1;
	}

	.fu-avatar-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
	}

	.fu-avatar-label {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		max-width: 160px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fu-avatar-hint {
		font-size: 11px;
		color: var(--dt4);
	}
</style>
