<script lang="ts">
	// ── Demo 1: Image loading state ─────────────────────────────
	type LoadState = 'loading' | 'loaded' | 'error';
	let imgLoadState = $state<LoadState>('loading');

	function simulateLoad() {
		imgLoadState = 'loading';
		setTimeout(() => { imgLoadState = 'loaded'; }, 1800);
	}
	function simulateError() {
		imgLoadState = 'loading';
		setTimeout(() => { imgLoadState = 'error'; }, 1000);
	}

	// ── Demo 4: Gallery lightbox ─────────────────────────────────
	const galleryItems = [
		{ gradient: 'linear-gradient(135deg, var(--dbg3) 0%, #1a1a2e 100%)', label: 'Aurora' },
		{ gradient: 'linear-gradient(135deg, #1a1a2e 0%, var(--dbg2) 60%, var(--dbd2) 100%)', label: 'Nebula' },
		{ gradient: 'linear-gradient(160deg, var(--dbg2) 0%, var(--dbd) 100%)', label: 'Dusk' },
		{ gradient: 'linear-gradient(135deg, var(--dbd2) 0%, var(--dbg3) 100%)', label: 'Void' },
		{ gradient: 'linear-gradient(110deg, var(--dbg3) 0%, var(--dbd2) 50%, var(--dbg2) 100%)', label: 'Haze' },
		{ gradient: 'linear-gradient(145deg, var(--dbg) 0%, var(--dbd) 40%, var(--dbg3) 100%)', label: 'Drift' },
	];
	let lightboxIndex = $state<number | null>(null);
	let lightboxOpen = $derived(lightboxIndex !== null);
	const lightboxItem = $derived(lightboxIndex !== null ? galleryItems[lightboxIndex] : null);

	// ── Demo 7: Video placeholder ────────────────────────────────
	let videoPlaying = $state(false);
	let videoTime = $state('4:32');
</script>

<section class="ds-section">
	<h2 class="ds-title">Media Display</h2>
	<p class="ds-desc">
		Image loading states, aspect ratios, gallery grids, captions, image cards, video
		placeholders, and responsive media sizing — pure CSS and gradient-based demos.
	</p>

	<!-- ═══ 1. IMAGE WITH LOADING STATE ════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image with Loading State</h3>
		<p class="ds-card__sub">Skeleton shimmer placeholder that transitions to the loaded image. Trigger either state manually.</p>
		<div class="ds-demo" style="flex-direction: column; gap: 20px; align-items: flex-start; max-width: 360px; width: 100%;">
			<div class="img-frame" style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; position: relative; border: 1px solid var(--dbd);">
				{#if imgLoadState === 'loading'}
					<div class="media-shimmer" style="position: absolute; inset: 0;"></div>
					<div class="media-shimmer-bar" style="position: absolute; bottom: 0; left: 0; right: 0; height: 3px;"></div>
				{:else if imgLoadState === 'loaded'}
					<div class="media-img-reveal" style="
						width: 100%;
						height: 100%;
						background: linear-gradient(135deg, #1a1a2e 0%, var(--dbg3) 40%, var(--dbd2) 70%, var(--dbg2) 100%);
						display: flex;
						align-items: center;
						justify-content: center;
					">
						<div style="
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 6px;
							opacity: 0.5;
						">
							<svg width="28" height="28" fill="none" stroke="var(--dt3)" viewBox="0 0 24 24">
								<rect x="3" y="3" width="18" height="18" rx="2" stroke-width="1.5"/>
								<circle cx="8.5" cy="8.5" r="1.5" fill="var(--dt3)" stroke="none"/>
								<path d="M21 15l-5-5L5 21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							<span style="font-size: 10px; color: var(--dt4); letter-spacing: 0.04em;">IMAGE LOADED</span>
						</div>
					</div>
				{:else}
					<div class="media-error-bg" style="
						width: 100%;
						height: 100%;
						background: var(--dbg2);
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						gap: 8px;
					">
						<svg width="24" height="24" fill="none" stroke="var(--dt4)" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
						</svg>
						<span style="font-size: 11px; color: var(--dt4);">Failed to load</span>
					</div>
				{/if}
			</div>
			<div style="display: flex; gap: 8px;">
				<button class="media-btn" onclick={simulateLoad}>
					Simulate Load
				</button>
				<button class="media-btn media-btn--ghost" onclick={simulateError}>
					Simulate Error
				</button>
			</div>
			<div style="font-size: 11px; color: var(--dt4);">
				State: <span style="color: var(--dt3); font-weight: 500;">{imgLoadState}</span>
			</div>
		</div>
	</div>

	<!-- ═══ 2. IMAGE WITH ERROR STATE ══════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image with Error State</h3>
		<p class="ds-card__sub">Broken image fallback with icon and descriptive message on the background surface.</p>
		<div class="ds-demo" style="gap: 16px; flex-wrap: wrap; align-items: flex-start;">
			<!-- Standard error -->
			<div style="display: flex; flex-direction: column; gap: 6px; align-items: center;">
				<div style="
					width: 200px;
					aspect-ratio: 16/9;
					background: var(--dbg2);
					border: 1px solid var(--dbd);
					border-radius: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 8px;
				">
					<div style="
						width: 36px;
						height: 36px;
						border-radius: 50%;
						background: var(--dbg3);
						border: 1px solid var(--dbd);
						display: flex;
						align-items: center;
						justify-content: center;
					">
						<svg width="16" height="16" fill="none" stroke="var(--dt4)" viewBox="0 0 24 24">
							<rect x="3" y="3" width="18" height="18" rx="2" stroke-width="1.5"/>
							<path d="M3 16.5l4.5-4.5 3 3 4-4 6 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
							<line x1="9" y1="9" x2="15" y2="15" stroke-width="1.5" stroke-linecap="round"/>
							<line x1="15" y1="9" x2="9" y2="15" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>
					<span style="font-size: 11px; color: var(--dt4);">Failed to load</span>
				</div>
				<span style="font-size: 10px; color: var(--dt4);">Standard</span>
			</div>

			<!-- With retry action -->
			<div style="display: flex; flex-direction: column; gap: 6px; align-items: center;">
				<div style="
					width: 200px;
					aspect-ratio: 16/9;
					background: var(--dbg2);
					border: 1px dashed var(--dbd2);
					border-radius: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 10px;
				">
					<svg width="20" height="20" fill="none" stroke="var(--dt4)" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"/>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 8h.01"/>
						<rect x="2" y="4" width="20" height="16" rx="3" stroke-width="1.5"/>
					</svg>
					<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
						<span style="font-size: 11px; color: var(--dt3); font-weight: 500;">Image unavailable</span>
						<span style="font-size: 10px; color: var(--dt4);">Unable to load resource</span>
					</div>
					<button style="
						font-size: 10px;
						padding: 3px 10px;
						border-radius: 5px;
						border: 1px solid var(--dbd2);
						background: var(--dbg3);
						color: var(--dt3);
						cursor: pointer;
					">Retry</button>
				</div>
				<span style="font-size: 10px; color: var(--dt4);">With retry</span>
			</div>

			<!-- Avatar-sized error -->
			<div style="display: flex; flex-direction: column; gap: 6px; align-items: center;">
				<div style="
					width: 56px;
					height: 56px;
					border-radius: 12px;
					background: var(--dbg2);
					border: 1px solid var(--dbd);
					display: flex;
					align-items: center;
					justify-content: center;
				">
					<svg width="20" height="20" fill="none" stroke="var(--dt4)" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
					</svg>
				</div>
				<span style="font-size: 10px; color: var(--dt4);">Small</span>
			</div>
		</div>
	</div>

	<!-- ═══ 3. ASPECT RATIOS ════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Aspect Ratios</h3>
		<p class="ds-card__sub">The same gradient rendered in 1:1, 16:9, 4:3, and 9:16 containers using <code>aspect-ratio</code>.</p>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; align-items: flex-end;">
			{#each [
				{ ratio: '1/1', label: '1:1', width: '120px' },
				{ ratio: '16/9', label: '16:9', width: '192px' },
				{ ratio: '4/3', label: '4:3', width: '152px' },
				{ ratio: '9/16', label: '9:16', width: '90px' },
			] as r}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<div style="
						width: {r.width};
						aspect-ratio: {r.ratio};
						border-radius: 10px;
						overflow: hidden;
						border: 1px solid var(--dbd);
						background: linear-gradient(135deg, var(--dbg3) 0%, #1a1a2e 50%, var(--dbd2) 100%);
						display: flex;
						align-items: center;
						justify-content: center;
					">
						<span style="
							font-size: 10px;
							font-weight: 600;
							color: var(--dt4);
							letter-spacing: 0.04em;
							background: var(--dbg);
							padding: 2px 6px;
							border-radius: 4px;
							border: 1px solid var(--dbd);
						">{r.label}</span>
					</div>
					<span style="font-size: 10px; color: var(--dt4);">{r.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. IMAGE GALLERY GRID ═══════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image Gallery Grid</h3>
		<p class="ds-card__sub">3-column thumbnail grid. Click any image to open the in-container lightbox overlay.</p>
		<div class="ds-demo" style="padding: 0;">
			<div class="gallery-container">
				<!-- Grid -->
				<div class="gallery-grid">
					{#each galleryItems as item, i}
						<button
							class="gallery-thumb"
							onclick={() => lightboxIndex = i}
							aria-label="Open {item.label} in lightbox"
							style="background: {item.gradient};"
						>
							<span class="gallery-thumb__label">{item.label}</span>
						</button>
					{/each}
				</div>

				<!-- Lightbox overlay -->
				{#if lightboxOpen && lightboxItem}
					<div
						class="gallery-lightbox"
						role="dialog"
						aria-modal="true"
						aria-label="Lightbox: {lightboxItem.label}"
					>
						<div
						class="gallery-lightbox__backdrop"
						role="button"
						tabindex="-1"
						aria-label="Close lightbox"
						onclick={() => lightboxIndex = null}
						onkeydown={(e) => { if (e.key === 'Escape') lightboxIndex = null; }}
					></div>
						<div class="gallery-lightbox__content">
							<div class="gallery-lightbox__img" style="background: {lightboxItem.gradient};"></div>
							<div class="gallery-lightbox__footer">
								<span style="font-size: 13px; font-weight: 600; color: var(--dt);">{lightboxItem.label}</span>
								<div style="display: flex; gap: 6px; align-items: center;">
									<button
										class="media-btn media-btn--ghost media-btn--sm"
										onclick={() => lightboxIndex = ((lightboxIndex ?? 0) - 1 + galleryItems.length) % galleryItems.length}
										aria-label="Previous image"
									>
										<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
									</button>
									<span style="font-size: 10px; color: var(--dt4);">{(lightboxIndex ?? 0) + 1} / {galleryItems.length}</span>
									<button
										class="media-btn media-btn--ghost media-btn--sm"
										onclick={() => lightboxIndex = ((lightboxIndex ?? 0) + 1) % galleryItems.length}
										aria-label="Next image"
									>
										<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
									</button>
									<button
										class="media-btn media-btn--ghost media-btn--sm"
										onclick={() => lightboxIndex = null}
										aria-label="Close lightbox"
									>
										<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 5. IMAGE WITH CAPTION ═══════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image with Caption</h3>
		<p class="ds-card__sub">Semantic <code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code> with styled caption below the image.</p>
		<div class="ds-demo" style="gap: 24px; flex-wrap: wrap; align-items: flex-start;">
			<!-- Standard caption -->
			<figure class="media-figure">
				<div class="media-figure__img" style="
					aspect-ratio: 16/9;
					background: linear-gradient(135deg, #1a1a2e 0%, var(--dbg3) 50%, var(--dbd2) 100%);
				"></div>
				<figcaption class="media-figure__caption">
					Panoramic view from the summit at dusk, capturing the gradient between day and night.
				</figcaption>
			</figure>

			<!-- Caption with metadata -->
			<figure class="media-figure">
				<div class="media-figure__img" style="
					aspect-ratio: 4/3;
					background: linear-gradient(160deg, var(--dbg2) 0%, var(--dbd2) 60%, var(--dbg3) 100%);
				"></div>
				<figcaption class="media-figure__caption media-figure__caption--meta">
					<span>Architecture study — structural grid patterns</span>
					<span class="media-figure__meta-tag">Series II · 2024</span>
				</figcaption>
			</figure>
		</div>
	</div>

	<!-- ═══ 6. IMAGE CARD ═══════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image Card</h3>
		<p class="ds-card__sub">Card with full-bleed gradient image at the top, title, description, and action row below.</p>
		<div class="ds-demo" style="gap: 16px; flex-wrap: wrap; align-items: flex-start;">
			<!-- Standard image card -->
			<div class="img-card">
				<div class="img-card__media" style="
					background: linear-gradient(135deg, #1a1a2e 0%, var(--dbg3) 60%, var(--dbd2) 100%);
				">
					<span class="img-card__badge">Featured</span>
				</div>
				<div class="img-card__body">
					<h4 class="img-card__title">Monochrome Systems</h4>
					<p class="img-card__desc">Exploring depth through value contrast and tonal shifts in dark environments.</p>
					<div class="img-card__footer">
						<span class="img-card__tag">Design</span>
						<button class="media-btn media-btn--sm" aria-label="View Monochrome Systems">View</button>
					</div>
				</div>
			</div>

			<!-- Compact image card -->
			<div class="img-card img-card--compact">
				<div class="img-card__media img-card__media--compact" style="
					background: linear-gradient(110deg, var(--dbg3) 0%, var(--dbd2) 50%, var(--dbg2) 100%);
				"></div>
				<div class="img-card__body">
					<h4 class="img-card__title">Gradient Studies</h4>
					<p class="img-card__desc">Light diffusion patterns across matte surfaces.</p>
					<div class="img-card__footer">
						<span class="img-card__tag">Research</span>
						<button class="media-btn media-btn--ghost media-btn--sm" aria-label="View Gradient Studies">View</button>
					</div>
				</div>
			</div>

			<!-- Wide image card -->
			<div class="img-card img-card--wide">
				<div class="img-card__media img-card__media--wide" style="
					background: linear-gradient(135deg, var(--dbd2) 0%, var(--dbg3) 40%, #1a1a2e 100%);
				">
					<span class="img-card__badge img-card__badge--dark">New</span>
				</div>
				<div class="img-card__body">
					<h4 class="img-card__title">Surface Texture Atlas</h4>
					<p class="img-card__desc">A reference collection of procedural texture primitives for dark-mode UI work.</p>
					<div class="img-card__footer">
						<span class="img-card__tag">Library</span>
						<button class="media-btn media-btn--sm" aria-label="View Surface Texture Atlas">View</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 7. VIDEO PLACEHOLDER ════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Video Placeholder</h3>
		<p class="ds-card__sub">16:9 dark container with centered play button overlay and duration badge in the corner.</p>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; align-items: flex-start;">
			<!-- Main video player placeholder -->
			<div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 380px;">
				<div class="video-placeholder" onclick={() => { videoPlaying = !videoPlaying; }} role="button" tabindex="0" aria-label="{videoPlaying ? 'Pause' : 'Play'} video" onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); videoPlaying = !videoPlaying; } }}>
					<div class="video-placeholder__gradient" style="
						background: linear-gradient(160deg, var(--dbg) 0%, #0d0d1a 50%, var(--dbg3) 100%);
					"></div>

					<!-- Play/pause button -->
					<button
						class="video-play-btn {videoPlaying ? 'video-play-btn--playing' : ''}"
						aria-label="{videoPlaying ? 'Pause' : 'Play'}"
						onclick={(e) => { e.stopPropagation(); videoPlaying = !videoPlaying; }}
					>
						{#if videoPlaying}
							<!-- Pause icon -->
							<svg width="18" height="18" fill="var(--dt)" viewBox="0 0 24 24">
								<rect x="6" y="4" width="4" height="16" rx="1"/>
								<rect x="14" y="4" width="4" height="16" rx="1"/>
							</svg>
						{:else}
							<!-- Play icon -->
							<svg width="18" height="18" fill="var(--dt)" viewBox="0 0 24 24">
								<path d="M8 5.14v14l11-7-11-7z"/>
							</svg>
						{/if}
					</button>

					<!-- Duration badge -->
					<span class="video-duration">{videoTime}</span>

					<!-- HD badge -->
					<span class="video-quality-badge">HD</span>

					<!-- Playing indicator -->
					{#if videoPlaying}
						<div class="video-playing-bar">
							<div class="video-playing-bar__fill"></div>
						</div>
					{/if}
				</div>

				<!-- Video metadata below -->
				<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
					<div>
						<div style="font-size: 13px; font-weight: 600; color: var(--dt);">Deep Focus — Session 12</div>
						<div style="font-size: 11px; color: var(--dt4); margin-top: 2px;">Ambient focus content · {videoTime}</div>
					</div>
					<button style="
						flex-shrink: 0;
						padding: 4px 10px;
						border-radius: 6px;
						border: 1px solid var(--dbd);
						background: transparent;
						color: var(--dt4);
						font-size: 11px;
						cursor: pointer;
					">Share</button>
				</div>
			</div>

			<!-- Compact video tiles -->
			<div style="display: flex; flex-direction: column; gap: 10px;">
				{#each [
					{ label: 'Intro to Runes', dur: '8:14', gradient: 'linear-gradient(135deg, var(--dbg3) 0%, var(--dbd2) 100%)' },
					{ label: 'Layout Deep Dive', dur: '22:07', gradient: 'linear-gradient(135deg, #1a1a2e 0%, var(--dbg2) 100%)' },
					{ label: 'Motion Principles', dur: '11:45', gradient: 'linear-gradient(135deg, var(--dbd2) 0%, var(--dbg3) 100%)' },
				] as vid}
					<div style="display: flex; gap: 12px; align-items: flex-start;">
						<div style="
							width: 120px;
							flex-shrink: 0;
							aspect-ratio: 16/9;
							border-radius: 7px;
							overflow: hidden;
							position: relative;
							background: {vid.gradient};
							border: 1px solid var(--dbd);
							cursor: pointer;
						">
							<div style="
								position: absolute;
								inset: 0;
								display: flex;
								align-items: center;
								justify-content: center;
							">
								<div style="
									width: 26px;
									height: 26px;
									border-radius: 50%;
									background: rgba(0,0,0,0.55);
									backdrop-filter: blur(4px);
									border: 1px solid rgba(255,255,255,0.12);
									display: flex;
									align-items: center;
									justify-content: center;
								">
									<svg width="10" height="10" fill="var(--dt)" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z"/></svg>
								</div>
							</div>
							<span style="
								position: absolute;
								bottom: 4px;
								right: 5px;
								font-size: 9px;
								font-weight: 600;
								color: var(--dt);
								background: rgba(0,0,0,0.6);
								padding: 1px 4px;
								border-radius: 3px;
								letter-spacing: 0.02em;
							">{vid.dur}</span>
						</div>
						<div>
							<div style="font-size: 12px; font-weight: 500; color: var(--dt); line-height: 1.4;">{vid.label}</div>
							<div style="font-size: 10px; color: var(--dt4); margin-top: 3px;">{vid.dur}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 8. MEDIA GRID SIZES ══════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Media Grid Sizes</h3>
		<p class="ds-card__sub">The same gradient thumbnails displayed in compact (80px), medium (160px), and large (240px) grid sizes.</p>
		<div class="ds-demo" style="flex-direction: column; gap: 28px; align-items: flex-start; width: 100%;">

			<!-- Compact 80px -->
			<div style="width: 100%;">
				<div class="media-size-label">Compact — 80px</div>
				<div class="media-size-grid">
					{#each [
						'linear-gradient(135deg, var(--dbg3) 0%, #1a1a2e 100%)',
						'linear-gradient(135deg, #1a1a2e 0%, var(--dbd2) 100%)',
						'linear-gradient(160deg, var(--dbd2) 0%, var(--dbg3) 100%)',
						'linear-gradient(110deg, var(--dbg2) 0%, var(--dbd) 100%)',
						'linear-gradient(145deg, var(--dbg3) 0%, var(--dbd2) 100%)',
						'linear-gradient(135deg, var(--dbd) 0%, var(--dbg2) 100%)',
					] as g}
						<div class="media-thumb media-thumb--compact" style="background: {g};"></div>
					{/each}
				</div>
			</div>

			<!-- Medium 160px -->
			<div style="width: 100%;">
				<div class="media-size-label">Medium — 160px</div>
				<div class="media-size-grid">
					{#each [
						'linear-gradient(135deg, var(--dbg3) 0%, #1a1a2e 100%)',
						'linear-gradient(135deg, #1a1a2e 0%, var(--dbd2) 100%)',
						'linear-gradient(160deg, var(--dbd2) 0%, var(--dbg3) 100%)',
						'linear-gradient(110deg, var(--dbg2) 0%, var(--dbd) 100%)',
					] as g}
						<div class="media-thumb media-thumb--medium" style="background: {g};"></div>
					{/each}
				</div>
			</div>

			<!-- Large 240px -->
			<div style="width: 100%;">
				<div class="media-size-label">Large — 240px</div>
				<div class="media-size-grid">
					{#each [
						'linear-gradient(135deg, var(--dbg3) 0%, #1a1a2e 100%)',
						'linear-gradient(135deg, #1a1a2e 0%, var(--dbd2) 100%)',
						'linear-gradient(160deg, var(--dbd2) 0%, var(--dbg3) 100%)',
					] as g}
						<div class="media-thumb media-thumb--large" style="background: {g};"></div>
					{/each}
				</div>
			</div>

		</div>
	</div>

</section>

<style>
	/* ── Shimmer animation ─────────────────────────────────────── */
	@keyframes media-shimmer {
		0% { background-position: -800px 0; }
		100% { background-position: 800px 0; }
	}

	/* ── Reveal animation for loaded state ─────────────────────── */
	@keyframes media-reveal {
		from { opacity: 0; transform: scale(1.02); }
		to { opacity: 1; transform: scale(1); }
	}

	/* ── Lightbox fade in ──────────────────────────────────────── */
	@keyframes lightbox-in {
		from { opacity: 0; transform: scale(0.96) translateY(6px); }
		to { opacity: 1; transform: scale(1) translateY(0); }
	}

	/* ── Video progress bar ────────────────────────────────────── */
	@keyframes video-progress {
		from { width: 0%; }
		to { width: 100%; }
	}

	/* ── Skeleton shimmer block ────────────────────────────────── */
	.media-shimmer {
		background: linear-gradient(
			90deg,
			var(--dbg2) 0%,
			var(--dbg3) 35%,
			var(--dbd) 50%,
			var(--dbg3) 65%,
			var(--dbg2) 100%
		);
		background-size: 1600px 100%;
		animation: media-shimmer 1.8s linear infinite;
	}

	.media-shimmer-bar {
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--dbd2) 50%,
			transparent 100%
		);
		background-size: 800px 100%;
		animation: media-shimmer 1.2s linear infinite;
	}

	/* ── Loaded image reveal ───────────────────────────────────── */
	.media-img-reveal {
		animation: media-reveal 0.4s ease forwards;
	}

	/* ── Shared button styles ──────────────────────────────────── */
	.media-btn {
		padding: 6px 14px;
		border-radius: 8px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: border-color 0.15s, color 0.15s;
	}
	.media-btn:hover {
		border-color: var(--dt4);
		color: var(--dt2);
	}
	.media-btn--ghost {
		background: transparent;
		border-color: var(--dbd);
	}
	.media-btn--sm {
		padding: 4px 10px;
		font-size: 11px;
		border-radius: 6px;
	}

	/* ── Gallery container ─────────────────────────────────────── */
	.gallery-container {
		position: relative;
		width: 100%;
		max-width: 480px;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		border-radius: 12px;
		overflow: hidden;
	}

	.gallery-thumb {
		aspect-ratio: 1/1;
		border: none;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: filter 0.15s;
	}
	.gallery-thumb:hover {
		filter: brightness(1.15);
	}
	.gallery-thumb:focus-visible {
		outline: 2px solid var(--dbd2);
		outline-offset: 2px;
	}

	.gallery-thumb__label {
		position: absolute;
		bottom: 6px;
		left: 7px;
		font-size: 10px;
		font-weight: 600;
		color: var(--dt);
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		padding: 2px 6px;
		border-radius: 4px;
		letter-spacing: 0.03em;
		pointer-events: none;
	}

	/* ── Lightbox overlay ──────────────────────────────────────── */
	.gallery-lightbox {
		position: absolute;
		inset: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		overflow: hidden;
	}

	.gallery-lightbox__backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(6px);
	}

	.gallery-lightbox__content {
		position: relative;
		z-index: 1;
		width: 88%;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid var(--dbd2);
		background: var(--dbg);
		animation: lightbox-in 0.22s ease forwards;
	}

	.gallery-lightbox__img {
		width: 100%;
		aspect-ratio: 16/9;
	}

	.gallery-lightbox__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	/* ── Figure / caption ──────────────────────────────────────── */
	.media-figure {
		margin: 0;
		width: 220px;
	}

	.media-figure__img {
		width: 100%;
		border-radius: 10px 10px 0 0;
		border: 1px solid var(--dbd);
		border-bottom: none;
		overflow: hidden;
	}

	.media-figure__caption {
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.55;
		padding: 8px 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-top: none;
		border-radius: 0 0 10px 10px;
	}

	.media-figure__caption--meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.media-figure__meta-tag {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
		letter-spacing: 0.03em;
	}

	/* ── Image card ────────────────────────────────────────────── */
	.img-card {
		width: 200px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
	}

	.img-card--compact {
		width: 180px;
	}

	.img-card--wide {
		width: 100%;
		max-width: 400px;
	}

	.img-card__media {
		width: 100%;
		aspect-ratio: 16/9;
		position: relative;
	}

	.img-card__media--compact {
		aspect-ratio: 2/1;
	}

	.img-card__media--wide {
		aspect-ratio: 21/9;
	}

	.img-card__badge {
		position: absolute;
		top: 8px;
		left: 8px;
		font-size: 9px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt);
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 2px 7px;
		border-radius: 4px;
	}

	.img-card__badge--dark {
		background: var(--dbg);
		border-color: var(--dbd2);
		color: var(--dt2);
	}

	.img-card__body {
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.img-card__title {
		margin: 0;
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.img-card__desc {
		margin: 0;
		font-size: 11px;
		color: var(--dt3);
		line-height: 1.5;
	}

	.img-card__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 4px;
	}

	.img-card__tag {
		font-size: 10px;
		color: var(--dt4);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		padding: 2px 7px;
		border-radius: 4px;
	}

	/* ── Video placeholder ─────────────────────────────────────── */
	.video-placeholder {
		width: 100%;
		aspect-ratio: 16/9;
		border-radius: 12px;
		overflow: hidden;
		position: relative;
		cursor: pointer;
		border: 1px solid var(--dbd);
	}

	.video-placeholder__gradient {
		position: absolute;
		inset: 0;
	}

	.video-play-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 52px;
		height: 52px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.15s, transform 0.15s, border-color 0.15s;
	}
	.video-play-btn:hover {
		background: rgba(0, 0, 0, 0.7);
		border-color: rgba(255, 255, 255, 0.35);
		transform: translate(-50%, -50%) scale(1.06);
	}
	.video-play-btn--playing {
		background: rgba(0, 0, 0, 0.4);
	}

	.video-duration {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt);
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		padding: 2px 7px;
		border-radius: 4px;
		letter-spacing: 0.03em;
		font-variant-numeric: tabular-nums;
	}

	.video-quality-badge {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--dt3);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		padding: 2px 5px;
		border-radius: 3px;
	}

	.video-playing-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--dbg3);
	}

	.video-playing-bar__fill {
		height: 100%;
		background: linear-gradient(90deg, var(--dbd2), var(--dt));
		animation: video-progress 4.32s linear infinite;
		border-radius: 0 2px 2px 0;
	}

	/* ── Media grid sizes ──────────────────────────────────────── */
	.media-size-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		margin-bottom: 10px;
	}

	.media-size-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.media-thumb {
		border-radius: 8px;
		border: 1px solid var(--dbd);
		flex-shrink: 0;
	}

	.media-thumb--compact {
		width: 80px;
		height: 80px;
	}

	.media-thumb--medium {
		width: 160px;
		height: 120px;
	}

	.media-thumb--large {
		width: 240px;
		height: 180px;
	}
</style>
