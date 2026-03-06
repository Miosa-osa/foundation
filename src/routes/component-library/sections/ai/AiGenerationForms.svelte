<script lang="ts">
	// ── Video generation state ─────────────────────────────────────
	let videoPrompt = $state('A cinematic drone shot sweeping over a misty mountain range at golden hour, with sun rays breaking through the clouds');
	let selectedRatio = $state<'16:9' | '9:16' | '1:1'>('9:16');
	let videoDuration = $state(12);

	// ── Image generation state ─────────────────────────────────────
	let imagePrompt = $state('Hyper-realistic portrait of a cyberpunk street musician in neon-lit Tokyo alley');
	let selectedStyle = $state('Photorealistic');
	let selectedSize = $state('1024×1024');
	const imageStyles = ['Photorealistic', 'Anime', 'Oil Painting', 'Watercolor', 'Pixel Art', '3D Render'];
	const imageSizes = ['512×512', '1024×1024', '1024×1792', '1792×1024'];

	// ── Sidebar nav state ──────────────────────────────────────────
	let activeNav = $state('Generate');
	const navItems = [
		{ label: 'Generate', icon: 'M12 4v16m-8-8h16' },
		{ label: 'Research',  icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0' },
		{ label: 'Gallery',   icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
	];

	// ── History grid state ─────────────────────────────────────────
	type HistoryItem = {
		id: string;
		type: 'video' | 'image';
		prompt: string;
		timestamp: string;
		status: 'done' | 'processing' | 'failed';
		gradient: string;
	};

	const historyItems: HistoryItem[] = [
		{ id: 'h1', type: 'video',  prompt: 'Mountain drone shot at golden hour',    timestamp: '2 min ago',  status: 'done',       gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' },
		{ id: 'h2', type: 'image',  prompt: 'Cyberpunk street musician',             timestamp: '8 min ago',  status: 'done',       gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1f5e 50%, #4c1d95 100%)' },
		{ id: 'h3', type: 'video',  prompt: 'Ocean waves crashing on rocky coast',   timestamp: '15 min ago', status: 'processing', gradient: 'linear-gradient(135deg, #0c1a2e 0%, #1e3a5f 50%, #1d4ed8 100%)' },
		{ id: 'h4', type: 'image',  prompt: 'Abstract geometric crystal formation',  timestamp: '1 hr ago',   status: 'done',       gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
		{ id: 'h5', type: 'image',  prompt: 'Bioluminescent forest at midnight',     timestamp: '2 hr ago',   status: 'done',       gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)' },
		{ id: 'h6', type: 'video',  prompt: 'Time-lapse of city skyline at dusk',    timestamp: '3 hr ago',   status: 'failed',     gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)' },
	];

	const statusBadge: Record<HistoryItem['status'], { label: string; color: string }> = {
		done:       { label: 'Done',       color: '#22c55e' },
		processing: { label: 'Processing', color: '#f59e0b' },
		failed:     { label: 'Failed',     color: '#ef4444' },
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">AI Generation Forms</h2>
	<p class="ds-desc">
		Content generation interfaces for video, image, and audio with prompt inputs, parameter
		controls, and output displays.
	</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  1. VIDEO GENERATION FORM                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Video Generation Form</h3>
		<p class="ds-card__sub">Dark-theme card with prompt input, aspect ratio toggles, and duration slider. Powered by Sora 2.</p>

		<div class="gf-video-card">
			<!-- Header -->
			<div class="gf-vc-header">
				<div class="gf-vc-icon-wrap">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="23 7 16 12 23 17 23 7"/>
						<rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
					</svg>
				</div>
				<div>
					<h4 class="gf-vc-title">Generate Video</h4>
					<p class="gf-vc-subtitle">Create stunning AI-generated videos with Sora 2</p>
				</div>
				<div class="gf-vc-model-badge">Sora 2</div>
			</div>

			<!-- Prompt -->
			<div class="gf-field">
				<label class="gf-label" for="video-prompt">Video Prompt</label>
				<textarea
					id="video-prompt"
					class="gf-textarea"
					rows="3"
					placeholder="Describe the video you want to generate..."
					bind:value={videoPrompt}
				></textarea>
				<div class="gf-field-footer">
					<span class="gf-char-count">{videoPrompt.length} / 500</span>
					<button class="gf-enhance-btn" aria-label="Enhance prompt with AI">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
						</svg>
						Enhance
					</button>
				</div>
			</div>

			<!-- Aspect ratio pills -->
			<div class="gf-field">
				<span class="gf-label">Aspect Ratio</span>
				<div class="gf-pills">
					{#each (['16:9', '9:16', '1:1'] as const) as ratio}
						<button
							class="gf-pill"
							class:gf-pill--active={selectedRatio === ratio}
							onclick={() => (selectedRatio = ratio)}
							aria-pressed={selectedRatio === ratio}
						>
							<span class="gf-pill-icon">
								{#if ratio === '16:9'}
									<svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><rect width="14" height="10" rx="2"/></svg>
								{:else if ratio === '9:16'}
									<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor"><rect width="10" height="14" rx="2"/></svg>
								{:else}
									<svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor"><rect width="11" height="11" rx="2"/></svg>
								{/if}
							</span>
							{ratio}
						</button>
					{/each}
				</div>
			</div>

			<!-- Duration slider -->
			<div class="gf-field">
				<div class="gf-slider-header">
					<span class="gf-label">Duration</span>
					<span class="gf-slider-value">{videoDuration}s</span>
				</div>
				<input
					type="range"
					min="4"
					max="60"
					step="1"
					bind:value={videoDuration}
					class="gf-slider"
					style="background: linear-gradient(to right, var(--dt) 0%, var(--dt) {((videoDuration - 4) / 56) * 100}%, var(--dbg3) {((videoDuration - 4) / 56) * 100}%, var(--dbg3) 100%);"
					aria-label="Video duration: {videoDuration} seconds"
				/>
				<div class="gf-slider-ticks">
					<span>4s</span>
					<span>15s</span>
					<span>30s</span>
					<span>60s</span>
				</div>
			</div>

			<!-- CTA -->
			<button class="gf-cta-btn" aria-label="Generate video">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<polygon points="5 3 19 12 5 21 5 3"/>
				</svg>
				Generate Video
			</button>

			<!-- Credits note -->
			<p class="gf-credits-note">Uses ~{Math.ceil(videoDuration / 4)} credits &nbsp;·&nbsp; Estimated {Math.ceil(videoDuration * 2.5)}s generation time</p>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  2. GENERATED OUTPUT CARD                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Generated Output Card</h3>
		<p class="ds-card__sub">Output display with video placeholder, processing state, and metadata.</p>

		<div class="gf-output-grid">
			<!-- Done state -->
			<div class="gf-output-card">
				<div class="gf-output-header">
					<span class="gf-output-title">Generated Video</span>
					<span class="gf-status-badge gf-status-badge--done">Done</span>
				</div>
				<div class="gf-video-placeholder">
					<div class="gf-video-play-btn" aria-label="Play generated video">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
					</div>
					<div class="gf-video-overlay-info">
						<span class="gf-video-duration-tag">9:16 &nbsp;·&nbsp; 12s</span>
					</div>
				</div>
				<div class="gf-output-meta">
					<span class="gf-output-prompt">Mountain drone shot at golden hour</span>
					<span class="gf-output-time">2 min ago</span>
				</div>
				<div class="gf-output-actions">
					<button class="gf-action-btn" aria-label="Download video">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						Download
					</button>
					<button class="gf-action-btn" aria-label="Share video">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
						Share
					</button>
					<button class="gf-action-btn" aria-label="Remix video">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
						Remix
					</button>
				</div>
			</div>

			<!-- Processing state -->
			<div class="gf-output-card">
				<div class="gf-output-header">
					<span class="gf-output-title">Generated Video</span>
					<span class="gf-status-badge gf-status-badge--processing">Processing</span>
				</div>
				<div class="gf-video-placeholder gf-video-placeholder--processing">
					<div class="gf-processing-inner">
						<div class="gf-spinner" aria-label="Processing"></div>
						<span class="gf-processing-text">Processing video...</span>
						<div class="gf-progress-bar-wrap">
							<div class="gf-progress-bar-fill"></div>
						</div>
						<span class="gf-processing-step">Rendering frames 247 / 360</span>
					</div>
				</div>
				<div class="gf-output-meta">
					<span class="gf-output-prompt">Ocean waves crashing on rocky coast</span>
					<span class="gf-output-time">Started 15 min ago</span>
				</div>
				<div class="gf-output-actions">
					<button class="gf-action-btn gf-action-btn--muted" aria-label="Download (not ready)" disabled>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						Download
					</button>
					<button class="gf-action-btn gf-action-btn--cancel" aria-label="Cancel generation">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  3. IMAGE GENERATION FORM                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Image Generation Form</h3>
		<p class="ds-card__sub">Prompt input with style and size selectors. Works with DALL-E 3, Stable Diffusion, and Flux models.</p>

		<div class="gf-image-card">
			<!-- Header -->
			<div class="gf-vc-header">
				<div class="gf-vc-icon-wrap gf-vc-icon-wrap--img">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
						<circle cx="8.5" cy="8.5" r="1.5"/>
						<polyline points="21 15 16 10 5 21"/>
					</svg>
				</div>
				<div>
					<h4 class="gf-vc-title">Generate Image</h4>
					<p class="gf-vc-subtitle">Create AI-generated images with DALL-E 3 &amp; Flux</p>
				</div>
				<div class="gf-vc-model-badge gf-vc-model-badge--img">DALL-E 3</div>
			</div>

			<!-- Prompt -->
			<div class="gf-field">
				<label class="gf-label" for="image-prompt">Image Prompt</label>
				<textarea
					id="image-prompt"
					class="gf-textarea"
					rows="3"
					placeholder="Describe the image you want to create..."
					bind:value={imagePrompt}
				></textarea>
				<div class="gf-field-footer">
					<span class="gf-char-count">{imagePrompt.length} / 1000</span>
					<button class="gf-enhance-btn" aria-label="Enhance prompt with AI">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
						</svg>
						Enhance
					</button>
				</div>
			</div>

			<!-- Style selector -->
			<div class="gf-field">
				<span class="gf-label">Style</span>
				<div class="gf-style-grid">
					{#each imageStyles as style}
						<button
							class="gf-style-chip"
							class:gf-style-chip--active={selectedStyle === style}
							onclick={() => (selectedStyle = style)}
							aria-pressed={selectedStyle === style}
						>
							{style}
						</button>
					{/each}
				</div>
			</div>

			<!-- Size selector -->
			<div class="gf-field">
				<span class="gf-label">Size</span>
				<div class="gf-size-row">
					{#each imageSizes as size}
						<button
							class="gf-size-btn"
							class:gf-size-btn--active={selectedSize === size}
							onclick={() => (selectedSize = size)}
							aria-pressed={selectedSize === size}
						>
							{size}
						</button>
					{/each}
				</div>
			</div>

			<!-- CTA -->
			<button class="gf-cta-btn gf-cta-btn--img" aria-label="Generate image">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
				</svg>
				Generate Image
			</button>

			<p class="gf-credits-note">Uses 1 credit &nbsp;·&nbsp; ~8s generation time</p>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  4. AI APP SIDEBAR NAVIGATION                              -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">AI App Sidebar Navigation</h3>
		<p class="ds-card__sub">Dark sidebar with app identity, nav items, and active state pill. Standard layout for AI generation apps.</p>

		<div class="gf-app-shell">
			<!-- Sidebar -->
			<nav class="gf-sidebar" aria-label="App navigation">
				<!-- App identity -->
				<div class="gf-sidebar-identity">
					<div class="gf-app-icon-lg">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
							<polygon points="23 7 16 12 23 17 23 7"/>
							<rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
						</svg>
					</div>
					<div>
						<div class="gf-app-name">Lumina</div>
						<div class="gf-app-tagline">AI Video Studio</div>
					</div>
				</div>

				<div class="gf-sidebar-divider"></div>

				<!-- Nav items -->
				<div class="gf-sidebar-nav">
					{#each navItems as item}
						<button
							class="gf-nav-item"
							class:gf-nav-item--active={activeNav === item.label}
							onclick={() => (activeNav = item.label)}
							aria-current={activeNav === item.label ? 'page' : undefined}
						>
							<svg class="gf-nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d={item.icon}/>
							</svg>
							{item.label}
						</button>
					{/each}
				</div>

				<div class="gf-sidebar-spacer"></div>

				<!-- User profile -->
				<div class="gf-sidebar-user">
					<div class="gf-user-avatar">T</div>
					<div class="gf-user-info">
						<div class="gf-user-name">MIOSA</div>
						<div class="gf-user-plan">Pro plan</div>
					</div>
					<button class="gf-user-menu-btn" aria-label="Open user menu">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
					</button>
				</div>
			</nav>

			<!-- Main pane placeholder -->
			<div class="gf-app-main">
				<div class="gf-app-main-inner">
					<div class="gf-app-main-icon">
						{#if activeNav === 'Generate'}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
						{:else if activeNav === 'Research'}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
						{:else}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
						{/if}
					</div>
					<span class="gf-app-main-label">{activeNav}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  5. GENERATION HISTORY GRID                                -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Generation History Grid</h3>
		<p class="ds-card__sub">Grid of generated content thumbnails with type indicators, timestamps, and status badges.</p>

		<div class="gf-history-grid">
			{#each historyItems as item (item.id)}
				<div class="gf-history-item">
					<!-- Thumbnail -->
					<div class="gf-history-thumb" style="background: {item.gradient};">
						<span class="gf-history-type-badge" aria-label="{item.type}">
							{#if item.type === 'video'}
								<svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							{:else}
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
							{/if}
						</span>
						{#if item.status === 'processing'}
							<div class="gf-history-processing">
								<div class="gf-spinner gf-spinner--sm"></div>
							</div>
						{/if}
					</div>

					<!-- Meta -->
					<div class="gf-history-meta">
						<p class="gf-history-prompt">{item.prompt}</p>
						<div class="gf-history-footer">
							<span class="gf-history-time">{item.timestamp}</span>
							<span
								class="gf-history-status"
								style="color: {statusBadge[item.status].color};"
							>{statusBadge[item.status].label}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  SHARED DARK CARD BASE                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-video-card,
	.gf-image-card {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 520px;
	}

	.gf-image-card {
		border-color: var(--dbd);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  CARD HEADER                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-vc-header {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.gf-vc-icon-wrap {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: linear-gradient(135deg, var(--dbg3), var(--dbg2));
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--dt2);
	}

	.gf-vc-icon-wrap--img {
		background: linear-gradient(135deg, var(--dbg3), var(--dbg2));
		border-color: var(--dbd);
		color: var(--dt2);
	}

	.gf-vc-title {
		font-size: 15px;
		font-weight: 700;
		color: var(--dt);
		margin: 0;
		letter-spacing: -0.01em;
	}

	.gf-vc-subtitle {
		font-size: 12px;
		color: var(--dt3);
		margin: 2px 0 0;
	}

	.gf-vc-model-badge {
		margin-left: auto;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 3px 8px;
		flex-shrink: 0;
	}

	.gf-vc-model-badge--img {
		color: var(--dt2);
		background: var(--dbg2);
		border-color: var(--dbd);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  FIELD + LABEL                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.gf-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt3);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TEXTAREA                                                     */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-textarea {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		color: var(--dt);
		font-size: 13px;
		font-family: inherit;
		line-height: 1.6;
		padding: 12px 14px;
		resize: vertical;
		transition: border-color 0.15s;
		min-height: 80px;
	}

	.gf-textarea::placeholder {
		color: var(--dt4);
	}

	.gf-textarea:focus {
		outline: none;
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px rgba(128, 128, 128, 0.08);
	}

	.gf-image-card .gf-textarea {
		border-color: var(--dbd);
		background: var(--dbg2);
	}

	.gf-image-card .gf-textarea:focus {
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px rgba(128, 128, 128, 0.08);
	}

	.gf-field-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.gf-char-count {
		font-size: 11px;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
	}

	.gf-enhance-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 4px 10px;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s, border-color 0.15s;
	}

	.gf-enhance-btn:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  ASPECT RATIO PILLS                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-pills {
		display: flex;
		gap: 8px;
	}

	.gf-pill {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.15s;
	}

	.gf-pill:hover {
		border-color: var(--dbd2);
		color: var(--dt2);
	}

	.gf-pill--active {
		background: var(--dbg3);
		border-color: var(--dbd2);
		color: var(--dt);
		font-weight: 600;
	}

	.gf-pill-icon {
		display: flex;
		align-items: center;
		opacity: 0.7;
	}

	.gf-pill--active .gf-pill-icon {
		opacity: 1;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  DURATION SLIDER                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-slider-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.gf-slider-value {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.01em;
	}

	.gf-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 5px;
		border-radius: 3px;
		outline: none;
		cursor: pointer;
	}

	.gf-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--dt);
		border: 2px solid var(--dbd2);
		cursor: pointer;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transition: transform 0.1s ease, box-shadow 0.1s ease;
	}

	.gf-slider::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
	}

	.gf-slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--dt);
		border: 2px solid var(--dbd2);
		cursor: pointer;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}

	.gf-slider-ticks {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		color: var(--dt4);
		padding: 0 2px;
		font-variant-numeric: tabular-nums;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  CTA BUTTON                                                   */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-cta-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 13px 20px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg3);
		color: var(--dt);
		font-size: 14px;
		font-weight: 700;
		font-family: inherit;
		cursor: pointer;
		letter-spacing: -0.01em;
		transition: opacity 0.15s, transform 0.1s;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.gf-cta-btn:hover {
		opacity: 0.92;
		transform: translateY(-1px);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
	}

	.gf-cta-btn:active {
		transform: translateY(0);
	}

	.gf-cta-btn--img {
		background: var(--dbg3);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.gf-cta-btn--img:hover {
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
	}

	.gf-credits-note {
		font-size: 11px;
		color: var(--dt4);
		text-align: center;
		margin: -8px 0 0;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  STYLE / SIZE SELECTORS (IMAGE FORM)                          */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-style-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.gf-style-chip {
		padding: 5px 12px;
		border-radius: 6px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.15s;
	}

	.gf-style-chip:hover {
		border-color: var(--dbd2);
		color: var(--dt2);
	}

	.gf-style-chip--active {
		background: var(--dbg3);
		border-color: var(--dbd2);
		color: var(--dt);
		font-weight: 600;
	}

	.gf-size-row {
		display: flex;
		gap: 6px;
	}

	.gf-size-btn {
		flex: 1;
		padding: 7px 6px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		font-size: 11px;
		font-weight: 500;
		cursor: pointer;
		font-family: inherit;
		text-align: center;
		transition: all 0.15s;
		white-space: nowrap;
	}

	.gf-size-btn:hover {
		border-color: var(--dbd2);
		color: var(--dt2);
	}

	.gf-size-btn--active {
		background: var(--dbg3);
		border-color: var(--dbd2);
		color: var(--dt);
		font-weight: 600;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  OUTPUT CARDS                                                 */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-output-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	@media (max-width: 600px) {
		.gf-output-grid {
			grid-template-columns: 1fr;
		}
	}

	.gf-output-card {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.gf-output-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 14px 0;
	}

	.gf-output-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt2);
	}

	.gf-status-badge {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 3px 8px;
		border-radius: 5px;
	}

	.gf-status-badge--done {
		color: #4ade80;
		background: rgba(34, 197, 94, 0.12);
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.gf-status-badge--processing {
		color: #fbbf24;
		background: rgba(245, 158, 11, 0.12);
		border: 1px solid rgba(245, 158, 11, 0.2);
	}

	/* Video placeholder area */
	.gf-video-placeholder {
		margin: 10px 14px 0;
		height: 160px;
		border-radius: 10px;
		background: linear-gradient(135deg, var(--dbg3), var(--dbg2));
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}

	.gf-video-placeholder::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%);
	}

	.gf-video-play-btn {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		border: 2px solid rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		z-index: 1;
		transition: background 0.15s, transform 0.1s;
	}

	.gf-video-play-btn:hover {
		background: rgba(0, 0, 0, 0.7);
		transform: scale(1.08);
	}

	.gf-video-overlay-info {
		position: absolute;
		bottom: 10px;
		right: 10px;
		z-index: 1;
	}

	.gf-video-duration-tag {
		font-size: 10px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
		border-radius: 5px;
		padding: 3px 7px;
	}

	/* Processing state */
	.gf-video-placeholder--processing {
		background: linear-gradient(135deg, var(--dbg3), var(--dbg2));
		cursor: default;
	}

	.gf-processing-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		z-index: 1;
		position: relative;
	}

	.gf-processing-text {
		font-size: 12px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.75);
	}

	.gf-processing-step {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.4);
		font-variant-numeric: tabular-nums;
	}

	.gf-progress-bar-wrap {
		width: 120px;
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		overflow: hidden;
	}

	.gf-progress-bar-fill {
		height: 100%;
		width: 68%;
		background: var(--dt3);
		border-radius: 2px;
		animation: gf-progress-pulse 2s ease-in-out infinite;
	}

	@keyframes gf-progress-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	/* Output meta + actions */
	.gf-output-meta {
		padding: 10px 14px 2px;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.gf-output-prompt {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.gf-output-time {
		font-size: 11px;
		color: var(--dt4);
	}

	.gf-output-actions {
		display: flex;
		gap: 6px;
		padding: 10px 14px 14px;
	}

	.gf-action-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 6px 10px;
		border-radius: 7px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 11px;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.15s;
	}

	.gf-action-btn:hover {
		background: var(--dbg3);
		border-color: var(--dbd2);
	}

	.gf-action-btn--muted {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.gf-action-btn--cancel {
		color: #f87171;
		background: rgba(239, 68, 68, 0.08);
		border-color: rgba(239, 68, 68, 0.2);
	}

	.gf-action-btn--cancel:hover {
		background: rgba(239, 68, 68, 0.16);
		border-color: rgba(239, 68, 68, 0.4);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  SPINNER                                                      */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-spinner {
		width: 24px;
		height: 24px;
		border: 2px solid var(--dbd);
		border-top-color: var(--dt3);
		border-radius: 50%;
		animation: gf-spin 0.8s linear infinite;
		flex-shrink: 0;
	}

	.gf-spinner--sm {
		width: 16px;
		height: 16px;
		border-width: 1.5px;
	}

	@keyframes gf-spin {
		to { transform: rotate(360deg); }
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  AI APP SIDEBAR NAV                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-app-shell {
		display: flex;
		height: 320px;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.gf-sidebar {
		width: 200px;
		flex-shrink: 0;
		background: var(--dbg);
		border-right: 1px solid var(--dbd);
		display: flex;
		flex-direction: column;
		padding: 16px 10px;
		gap: 4px;
	}

	.gf-sidebar-identity {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 6px 4px;
	}

	.gf-app-icon-lg {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: linear-gradient(135deg, var(--dbg3), var(--dbg2));
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.gf-app-name {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.gf-app-tagline {
		font-size: 10px;
		color: var(--dt4);
		margin-top: 1px;
	}

	.gf-sidebar-divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.05);
		margin: 8px 0;
	}

	.gf-sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.gf-nav-item {
		display: flex;
		align-items: center;
		gap: 9px;
		width: 100%;
		padding: 8px 10px;
		border-radius: 8px;
		border: none;
		background: transparent;
		color: var(--dt4);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: all 0.15s;
	}

	.gf-nav-item:hover {
		background: var(--dbg2);
		color: var(--dt3);
	}

	.gf-nav-item--active {
		background: var(--dbg3);
		color: var(--dt);
		font-weight: 600;
	}

	.gf-nav-item--active:hover {
		background: var(--dbg3);
	}

	.gf-nav-icon {
		flex-shrink: 0;
		opacity: 0.6;
	}

	.gf-nav-item--active .gf-nav-icon {
		opacity: 1;
	}

	.gf-sidebar-spacer {
		flex: 1;
	}

	.gf-sidebar-user {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		background: rgba(255, 255, 255, 0.02);
	}

	.gf-user-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--dbg3);
		color: var(--dt);
		font-size: 12px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.gf-user-info {
		flex: 1;
		min-width: 0;
	}

	.gf-user-name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1;
	}

	.gf-user-plan {
		font-size: 10px;
		color: var(--dt4);
		margin-top: 2px;
	}

	.gf-user-menu-btn {
		background: none;
		border: none;
		color: var(--dt4);
		cursor: pointer;
		display: flex;
		align-items: center;
		padding: 2px;
		border-radius: 4px;
		transition: color 0.15s;
	}

	.gf-user-menu-btn:hover {
		color: var(--dt3);
	}

	/* Main pane placeholder */
	.gf-app-main {
		flex: 1;
		background: var(--dbg2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gf-app-main-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.gf-app-main-icon {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt3);
	}

	.gf-app-main-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  GENERATION HISTORY GRID                                      */
	/* ══════════════════════════════════════════════════════════════ */
	.gf-history-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	@media (max-width: 640px) {
		.gf-history-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.gf-history-item {
		display: flex;
		flex-direction: column;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		transition: border-color 0.15s, box-shadow 0.15s;
		cursor: pointer;
	}

	.gf-history-item:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
	}

	.gf-history-thumb {
		height: 110px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gf-history-type-badge {
		position: absolute;
		top: 8px;
		left: 8px;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gf-history-processing {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
	}

	.gf-history-meta {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.gf-history-prompt {
		font-size: 11px;
		color: var(--dt2);
		line-height: 1.4;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.gf-history-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.gf-history-time {
		font-size: 10px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
	}

	.gf-history-status {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.02em;
	}
</style>
