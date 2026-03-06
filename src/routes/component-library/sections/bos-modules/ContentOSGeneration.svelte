<script lang="ts">
	// ── Video generation state ─────────────────────────────────────
	let videoPrompt = $state('A cinematic slow push-in on a rain-soaked Tokyo alley at night, neon reflections on wet pavement, woman with umbrella walking away');
	let videoModel = $state<'veo' | 'sora' | 'runway' | 'kling' | 'luma'>('veo');
	let videoRatio = $state<'16:9' | '9:16' | '1:1' | '4:3'>('16:9');
	let videoDuration = $state(15);
	let videoCharacter = $state('');
	let videoAudioScript = $state('');
	let videoRefImage = $state(false);
	let videoGenerating = $state(false);
	let videoProgress = $state(0);
	let videoComplete = $state(false);
	let videoGenInterval: ReturnType<typeof setInterval> | null = null;

	const videoModels: { id: 'veo' | 'sora' | 'runway' | 'kling' | 'luma'; label: string; accent: string; provider: string }[] = [
		{ id: 'veo',    label: 'Veo 3',              accent: '#4285f4', provider: 'Google' },
		{ id: 'sora',   label: 'Sora 2 Pro',         accent: '#10a37f', provider: 'OpenAI' },
		{ id: 'runway', label: 'Runway Gen-3',        accent: '#7c3aed', provider: 'Runway' },
		{ id: 'kling',  label: 'Kling',               accent: '#f59e0b', provider: 'KieAI' },
		{ id: 'luma',   label: 'Luma Dream Machine',  accent: '#ec4899', provider: 'Luma' },
	];

	const videoRatios: { id: '16:9' | '9:16' | '1:1' | '4:3'; w: number; h: number }[] = [
		{ id: '16:9', w: 32, h: 18 },
		{ id: '9:16', w: 18, h: 32 },
		{ id: '1:1',  w: 24, h: 24 },
		{ id: '4:3',  w: 28, h: 21 },
	];

	const providerBadges = ['BFL', 'KieAI', 'Hedra', 'ElevenLabs', 'Fal.ai'];

	const characters = ['', 'Aria', 'Nova', 'Zara', 'Luna'];

	let videoModelInfo = $derived(videoModels.find(m => m.id === videoModel)!);

	function handleVideoGenerate() {
		if (videoGenInterval) clearInterval(videoGenInterval);
		videoGenerating = true;
		videoComplete = false;
		videoProgress = 0;
		videoGenInterval = setInterval(() => {
			videoProgress += 3;
			if (videoProgress >= 100) {
				videoProgress = 100;
				clearInterval(videoGenInterval!);
				videoGenerating = false;
				videoComplete = true;
			}
		}, 60);
	}

	// ── Image generation state ─────────────────────────────────────
	let imagePrompt = $state('A portrait of a woman in golden hour sunlight, cinematic film grain, 35mm photography, shallow depth of field');
	let imageModel = $state<'flux-pro' | 'flux-max' | 'flux-kontext' | 'seedream' | 'nanobanana'>('flux-pro');
	let imageRatio = $state<'1:1' | '4:3' | '3:4' | '16:9' | '9:16'>('1:1');
	let imageCharacter = $state('');
	let imageRefToggle = $state(false);
	let imageBatch = $state<1 | 2 | 4>(1);
	let imageGenerating = $state(false);
	let imageProgress = $state(0);
	let imageComplete = $state(false);
	let imageGenInterval: ReturnType<typeof setInterval> | null = null;

	const imageModels: { id: 'flux-pro' | 'flux-max' | 'flux-kontext' | 'seedream' | 'nanobanana'; label: string; accent: string }[] = [
		{ id: 'flux-pro',    label: 'Flux Pro',         accent: '#6366f1' },
		{ id: 'flux-max',    label: 'FLUX 2 Max',        accent: '#8b5cf6' },
		{ id: 'flux-kontext', label: 'FLUX Kontext Pro', accent: '#a855f7' },
		{ id: 'seedream',    label: 'Seedream 3',        accent: '#ec4899' },
		{ id: 'nanobanana',  label: 'NanoBanana Pro',    accent: '#f97316' },
	];

	const imageRatios: { id: '1:1' | '4:3' | '3:4' | '16:9' | '9:16'; label: string }[] = [
		{ id: '1:1',  label: '1:1' },
		{ id: '4:3',  label: '4:3' },
		{ id: '3:4',  label: '3:4' },
		{ id: '16:9', label: '16:9' },
		{ id: '9:16', label: '9:16' },
	];

	function handleImageGenerate() {
		if (imageGenInterval) clearInterval(imageGenInterval);
		imageGenerating = true;
		imageComplete = false;
		imageProgress = 0;
		imageGenInterval = setInterval(() => {
			imageProgress += 4;
			if (imageProgress >= 100) {
				imageProgress = 100;
				clearInterval(imageGenInterval!);
				imageGenerating = false;
				imageComplete = true;
			}
		}, 50);
	}

	// ── Inpaint & Edit state ───────────────────────────────────────
	let brushSize = $state(24);
	let brushHardness = $state(80);
	let maskMode = $state<'paint' | 'erase' | 'auto'>('paint');
	let inpaintPrompt = $state('Replace with lush tropical foliage and vibrant flowers');
	let inpaintStrength = $state(75);
	let inpaintModel = $state('flux-kontext');
	let activeEditTool = $state('enhance');

	const editTools = [
		{ id: 'enhance',    label: 'Enhance',    icon: 'M5 3l14 9-14 9V3z' },
		{ id: 'crop',       label: 'Crop',       icon: 'M6 2v14h14M2 6h14' },
		{ id: 'filters',    label: 'Filters',    icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM3.6 9h16.8M3.6 15h16.8' },
		{ id: 'bg-remove',  label: 'Remove BG',  icon: 'M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z' },
		{ id: 'upscale-2x', label: 'Upscale 2x', icon: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7' },
		{ id: 'upscale-4x', label: 'Upscale 4x', icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' },
		{ id: 'face-fix',   label: 'Face Fix',   icon: 'M12 2a5 5 0 100 10 5 5 0 000-10zM2 20a10 10 0 0120 0' },
		{ id: 'color',      label: 'Color Adj',  icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z' },
	];

	// ── Gallery state ──────────────────────────────────────────────
	let galleryFilter = $state<'all' | 'characters' | 'images' | 'videos'>('all');
	let gallerySearch = $state('');
	let gallerySort = $state<'recent' | 'popular'>('recent');

	const galleryItems = [
		{ id: 'g1', type: 'image', model: 'Flux Pro', prompt: 'Portrait of Aria in golden sunset, editorial fashion photography, cinematic', character: 'Aria', time: '2m ago', ratio: '3:4' },
		{ id: 'g2', type: 'video', model: 'Veo 3',    prompt: 'Cinematic drone flyover of neon-lit city at midnight, rain reflections',      character: '',      time: '8m ago', ratio: '16:9' },
		{ id: 'g3', type: 'image', model: 'FLUX 2 Max', prompt: 'Zara in luxury apartment, natural window light, lifestyle photography',     character: 'Zara',  time: '15m ago', ratio: '4:3' },
		{ id: 'g4', type: 'video', model: 'Runway Gen-3', prompt: 'Slow motion coffee pour from above, golden morning light, steam rising', character: '',      time: '32m ago', ratio: '1:1' },
		{ id: 'g5', type: 'image', model: 'Seedream 3', prompt: 'Nova in futuristic Tokyo streetwear, bokeh background, vivid colors',      character: 'Nova',  time: '1h ago',  ratio: '9:16' },
		{ id: 'g6', type: 'image', model: 'Flux Pro',   prompt: 'Minimalist flat lay of luxury fashion accessories on white marble',        character: '',      time: '2h ago',  ratio: '1:1' },
	];

	let filteredGallery = $derived(
		galleryItems.filter(item => {
			if (galleryFilter === 'characters' && !item.character) return false;
			if (galleryFilter === 'images' && item.type !== 'image') return false;
			if (galleryFilter === 'videos' && item.type !== 'video') return false;
			if (gallerySearch && !item.prompt.toLowerCase().includes(gallerySearch.toLowerCase())) return false;
			return true;
		})
	);
</script>

<section class="ds-section">
	<h2 class="ds-title">ContentOS Generation</h2>
	<p class="ds-desc">AI generation interfaces for video, image, and inpaint/edit workflows — real ContentOS models, provider badges, character selectors, and interactive output states.</p>

	<!-- ═══ 1. VIDEO GENERATION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Video Generation</h3>
		<p class="ds-card__sub">Veo, Sora 2 Pro, Runway Gen-3, Kling, and Luma Dream Machine with aspect ratios, duration, character, and audio script.</p>

		<div class="cog-gen-layout">
			<div class="cog-gen-form">
				<!-- Prompt -->
				<div class="cog-field">
					<label class="cog-label">Video Prompt</label>
					<textarea class="cog-textarea" bind:value={videoPrompt} rows="3" placeholder="Describe your video scene in detail..."></textarea>
				</div>

				<!-- Model pills -->
				<div class="cog-field">
					<label class="cog-label">Model</label>
					<div class="cog-pills">
						{#each videoModels as m}
							<button
								class="cog-pill"
								class:cog-pill--active={videoModel === m.id}
								style={videoModel === m.id ? `--pill-accent: ${m.accent}` : ''}
								onclick={() => videoModel = m.id}
							>{m.label}</button>
						{/each}
					</div>
				</div>

				<!-- Aspect ratio cards -->
				<div class="cog-field">
					<label class="cog-label">Aspect Ratio</label>
					<div class="cog-ratio-row">
						{#each videoRatios as r}
							<button
								class="cog-ratio-card"
								class:cog-ratio-card--active={videoRatio === r.id}
								onclick={() => videoRatio = r.id}
								aria-label="Select {r.id} aspect ratio"
							>
								<div class="cog-ratio-rect" style="width:{r.w}px;height:{r.h}px;"></div>
								<span class="cog-ratio-label">{r.id}</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Duration slider -->
				<div class="cog-field">
					<div class="cog-field-row">
						<label class="cog-label">Duration</label>
						<span class="cog-value-badge">{videoDuration}s</span>
					</div>
					<input type="range" class="cog-slider" min="5" max="60" step="5" bind:value={videoDuration} aria-label="Video duration" />
					<div class="cog-slider-ticks">
						<span>5s</span><span>30s</span><span>60s</span>
					</div>
				</div>

				<!-- Character + Audio -->
				<div class="cog-row">
					<div class="cog-field">
						<label class="cog-label">Character</label>
						<select class="cog-select" bind:value={videoCharacter} aria-label="Select character">
							<option value="">No character</option>
							{#each characters.filter(c => c) as c}
								<option value={c}>{c}</option>
							{/each}
						</select>
					</div>
					<div class="cog-field">
						<label class="cog-label">Reference Image</label>
						<button
							class="cog-toggle"
							class:cog-toggle--on={videoRefImage}
							onclick={() => videoRefImage = !videoRefImage}
							aria-pressed={videoRefImage}
						>
							<span class="cog-toggle-knob"></span>
							<span class="cog-toggle-label">{videoRefImage ? 'On' : 'Off'}</span>
						</button>
					</div>
				</div>

				<!-- Audio Script -->
				<div class="cog-field">
					<label class="cog-label">Audio Script <span class="cog-label-opt">(optional)</span></label>
					<textarea class="cog-textarea cog-textarea--sm" bind:value={videoAudioScript} rows="2" placeholder="Voiceover or dialogue script..."></textarea>
				</div>

				<!-- Provider badges -->
				<div class="cog-field">
					<label class="cog-label">Providers</label>
					<div class="cog-provider-row">
						{#each providerBadges as p}
							<span class="cog-provider-badge">{p}</span>
						{/each}
					</div>
				</div>

				<!-- Generate -->
				<button class="btn-pill btn-pill-primary cog-generate-btn" onclick={handleVideoGenerate} disabled={videoGenerating} aria-label="Generate video">
					{#if videoGenerating}
						<span class="cog-spinner" aria-hidden="true"></span> Generating…
					{:else}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
						Generate Video
					{/if}
				</button>
			</div>

			<!-- Output -->
			<div class="cog-gen-output">
				{#if !videoGenerating && !videoComplete}
					<div class="cog-output-empty">
						<div class="cog-output-empty-icon" aria-hidden="true">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="4"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
						</div>
						<p>Configure and generate to see your video here</p>
					</div>
				{:else if videoGenerating}
					<div class="cog-output-generating">
						<div class="cog-gen-model-badge" style="background: {videoModelInfo.accent}20; color: {videoModelInfo.accent}; border-color: {videoModelInfo.accent}40">
							{videoModelInfo.label}
						</div>
						<div class="cog-progress-track">
							<div class="cog-progress-fill" style="width:{videoProgress}%"></div>
						</div>
						<p class="cog-gen-hint">Generating {videoDuration}s · {videoRatio} · {videoModelInfo.provider}</p>
						<span class="cog-gen-pct">{videoProgress}%</span>
					</div>
				{:else}
					<div class="cog-video-card">
						<div class="cog-video-thumb" aria-label="Generated video thumbnail">
							<div class="cog-video-play-icon" aria-hidden="true">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							</div>
							<div class="cog-video-badge cog-video-badge--type">VIDEO</div>
							<div class="cog-video-badge cog-video-badge--ratio">{videoRatio}</div>
						</div>
						<div class="cog-video-meta">
							<div class="cog-meta-row">
								<span class="cog-meta-model" style="color:{videoModelInfo.accent}">{videoModelInfo.label}</span>
								<span class="cog-meta-dur">{videoDuration}s</span>
							</div>
							<p class="cog-meta-prompt">{videoPrompt.slice(0, 80)}…</p>
							<div class="cog-meta-actions">
								<button class="btn-compact btn-compact-ghost btn-compact-icon cog-icon-btn" aria-label="Download">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
								</button>
								<button class="btn-compact btn-compact-ghost btn-compact-icon cog-icon-btn" aria-label="Share">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
								</button>
								<button class="btn-compact btn-compact-ghost" onclick={() => { videoComplete = false; videoProgress = 0; }} aria-label="Remix video">Remix</button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 2. IMAGE GENERATION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image Generation</h3>
		<p class="ds-card__sub">Flux Pro, FLUX 2 Max, FLUX Kontext Pro, Seedream 3, NanoBanana Pro — with batch count, aspect ratios, and output grid.</p>

		<div class="cog-gen-layout">
			<div class="cog-gen-form">
				<!-- Prompt + Enhance -->
				<div class="cog-field">
					<div class="cog-field-row">
						<label class="cog-label">Image Prompt</label>
						<button class="btn-compact btn-compact-ghost cog-enhance-btn" aria-label="Enhance prompt">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
							Enhance
						</button>
					</div>
					<textarea class="cog-textarea" bind:value={imagePrompt} rows="3" placeholder="Describe your image in detail..."></textarea>
				</div>

				<!-- Model pills -->
				<div class="cog-field">
					<label class="cog-label">Model</label>
					<div class="cog-pills cog-pills--wrap">
						{#each imageModels as m}
							<button
								class="cog-pill"
								class:cog-pill--active={imageModel === m.id}
								style={imageModel === m.id ? `--pill-accent: ${m.accent}` : ''}
								onclick={() => imageModel = m.id}
							>{m.label}</button>
						{/each}
					</div>
				</div>

				<!-- Aspect ratios -->
				<div class="cog-field">
					<label class="cog-label">Aspect Ratio</label>
					<div class="cog-pills">
						{#each imageRatios as r}
							<button
								class="cog-pill cog-pill--sm"
								class:cog-pill--active={imageRatio === r.id}
								onclick={() => imageRatio = r.id}
							>{r.label}</button>
						{/each}
					</div>
				</div>

				<!-- Character + Ref -->
				<div class="cog-row">
					<div class="cog-field">
						<label class="cog-label">Character</label>
						<select class="cog-select" bind:value={imageCharacter} aria-label="Select character">
							<option value="">None</option>
							{#each characters.filter(c => c) as c}
								<option value={c}>{c}</option>
							{/each}
						</select>
					</div>
					<div class="cog-field">
						<label class="cog-label">Reference</label>
						<button
							class="cog-toggle"
							class:cog-toggle--on={imageRefToggle}
							onclick={() => imageRefToggle = !imageRefToggle}
							aria-pressed={imageRefToggle}
						>
							<span class="cog-toggle-knob"></span>
							<span class="cog-toggle-label">{imageRefToggle ? 'On' : 'Off'}</span>
						</button>
					</div>
				</div>

				<!-- Batch count -->
				<div class="cog-field">
					<label class="cog-label">Batch Count</label>
					<div class="cog-pills">
						{#each [1, 2, 4] as n}
							<button
								class="cog-pill cog-pill--sm"
								class:cog-pill--active={imageBatch === n}
								onclick={() => imageBatch = n as 1 | 2 | 4}
							>{n} image{n > 1 ? 's' : ''}</button>
						{/each}
					</div>
				</div>

				<button class="btn-pill btn-pill-primary cog-generate-btn" onclick={handleImageGenerate} disabled={imageGenerating} aria-label="Generate image">
					{#if imageGenerating}
						<span class="cog-spinner" aria-hidden="true"></span> Generating…
					{:else}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
						Generate {imageBatch > 1 ? `${imageBatch} Images` : 'Image'}
					{/if}
				</button>
			</div>

			<!-- Image output grid -->
			<div class="cog-gen-output">
				{#if imageGenerating}
					<div class="cog-output-generating">
						<div class="cog-progress-track">
							<div class="cog-progress-fill" style="width:{imageProgress}%"></div>
						</div>
						<p class="cog-gen-hint">Generating {imageBatch} image{imageBatch > 1 ? 's' : ''} · {imageRatio}</p>
						<span class="cog-gen-pct">{imageProgress}%</span>
					</div>
				{:else}
					<div class="cog-img-grid cog-img-grid--{imageBatch === 1 ? 'solo' : imageBatch === 2 ? 'duo' : 'quad'}">
						{#each Array(imageComplete ? imageBatch : 4) as _, i}
							<div class="cog-img-card" class:cog-img-card--done={imageComplete}>
								{#if imageComplete}
									<div class="cog-img-actions">
										<button class="btn-glass btn-glass-compact btn-glass-dark" aria-label="Download image">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
										</button>
										<button class="btn-glass btn-glass-compact btn-glass-dark" aria-label="Upscale image">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
										</button>
										<button class="btn-glass btn-glass-compact btn-glass-dark" aria-label="Generate variations">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
										</button>
										<button class="btn-glass btn-glass-compact btn-glass-dark" aria-label="Edit image">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
									</div>
									<div class="cog-img-placeholder cog-img-placeholder--hue-{(i % 4) + 1}">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
									</div>
								{:else}
									<div class="cog-img-placeholder cog-img-placeholder--empty">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 3. INPAINT & EDIT TOOLS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Inpaint &amp; Edit Tools</h3>
		<p class="ds-card__sub">Brush-based inpainting with mask modes, replacement prompt, strength control, and a full image editor tools strip.</p>

		<div class="cog-inpaint-layout">
			<!-- Left: Controls -->
			<div class="cog-inpaint-controls">
				<!-- Source upload -->
				<div class="cog-upload-zone" aria-label="Upload source image">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4-4-4 4M12 3v13"/></svg>
					<span>Upload source image</span>
					<span class="cog-upload-hint">PNG, JPG, WEBP up to 20MB</span>
				</div>

				<!-- Brush size -->
				<div class="cog-field">
					<div class="cog-field-row">
						<label class="cog-label">Brush Size</label>
						<span class="cog-value-badge">{brushSize}px</span>
					</div>
					<input type="range" class="cog-slider" min="1" max="100" bind:value={brushSize} aria-label="Brush size" />
				</div>

				<!-- Brush hardness -->
				<div class="cog-field">
					<div class="cog-field-row">
						<label class="cog-label">Brush Hardness</label>
						<span class="cog-value-badge">{brushHardness}%</span>
					</div>
					<input type="range" class="cog-slider" min="0" max="100" bind:value={brushHardness} aria-label="Brush hardness" />
				</div>

				<!-- Mask mode -->
				<div class="cog-field">
					<label class="cog-label">Mask Mode</label>
					<div class="cog-seg">
						{#each ['paint', 'erase', 'auto'] as m}
							<button
								class="cog-seg-btn"
								class:cog-seg-btn--active={maskMode === m}
								onclick={() => maskMode = m as 'paint' | 'erase' | 'auto'}
							>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
						{/each}
					</div>
				</div>

				<!-- Replacement prompt -->
				<div class="cog-field">
					<label class="cog-label">Replacement Prompt</label>
					<textarea class="cog-textarea cog-textarea--sm" bind:value={inpaintPrompt} rows="2" placeholder="Describe what to paint in the masked area..."></textarea>
				</div>

				<!-- Strength -->
				<div class="cog-field">
					<div class="cog-field-row">
						<label class="cog-label">Strength</label>
						<span class="cog-value-badge">{inpaintStrength}%</span>
					</div>
					<input type="range" class="cog-slider" min="0" max="100" bind:value={inpaintStrength} aria-label="Inpaint strength" />
				</div>

				<!-- Model -->
				<div class="cog-field">
					<label class="cog-label">Model</label>
					<select class="cog-select" bind:value={inpaintModel} aria-label="Inpaint model">
						<option value="flux-kontext">FLUX Kontext Pro</option>
						<option value="flux-pro">Flux Pro</option>
						<option value="flux-max">FLUX 2 Max</option>
					</select>
				</div>

				<div class="cog-row">
					<button class="btn-pill btn-pill-primary btn-pill-sm cog-generate-btn" aria-label="Run inpaint">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
						Inpaint
					</button>
					<button class="btn-rounded btn-rounded-ghost" aria-label="Reset canvas">Reset</button>
				</div>
			</div>

			<!-- Right: Canvas -->
			<div class="cog-canvas-area">
				<div class="cog-canvas-inner">
					<div class="cog-canvas-crosshair" aria-hidden="true">
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><circle cx="16" cy="16" r="12"/><line x1="16" y1="4" x2="16" y2="12"/><line x1="16" y1="20" x2="16" y2="28"/><line x1="4" y1="16" x2="12" y2="16"/><line x1="20" y1="16" x2="28" y2="16"/></svg>
					</div>
					<div class="cog-canvas-mask-overlay" aria-hidden="true"></div>
					<span class="cog-canvas-hint">Draw mask on image to inpaint</span>
				</div>
				<div class="cog-canvas-info">
					<span>Mode: <strong>{maskMode.charAt(0).toUpperCase() + maskMode.slice(1)}</strong></span>
					<span>Brush: <strong>{brushSize}px · {brushHardness}% hard</strong></span>
					<span>Strength: <strong>{inpaintStrength}%</strong></span>
				</div>
			</div>
		</div>

		<!-- Edit tools strip -->
		<div class="cog-edit-strip">
			{#each editTools as tool}
				<button
					class="btn-compact btn-compact-ghost cog-edit-tool"
					class:cog-edit-tool--active={activeEditTool === tool.id}
					onclick={() => activeEditTool = tool.id}
					aria-label="{tool.label}"
					aria-pressed={activeEditTool === tool.id}
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d={tool.icon}/></svg>
					<span>{tool.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. GENERATION GALLERY ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Generation Gallery</h3>
		<p class="ds-card__sub">Explore and manage all generated content with type filters, search, model badges, and quick actions.</p>

		<!-- Toolbar -->
		<div class="cog-gallery-toolbar">
			<div class="cog-pills">
				{#each ['all', 'characters', 'images', 'videos'] as f}
					<button
						class="cog-pill cog-pill--sm"
						class:cog-pill--active={galleryFilter === f}
						onclick={() => galleryFilter = f as typeof galleryFilter}
					>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
				{/each}
			</div>

			<div class="cog-gallery-right">
				<div class="cog-search-wrap">
					<svg class="cog-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
					<input class="cog-search" type="text" placeholder="Search prompts…" bind:value={gallerySearch} aria-label="Search generations" />
				</div>
				<select class="cog-select cog-select--sm" bind:value={gallerySort} aria-label="Sort by">
					<option value="recent">Recent</option>
					<option value="popular">Popular</option>
				</select>
			</div>
		</div>

		{#if filteredGallery.length === 0}
			<div class="cog-gallery-empty">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
				<p>No generations match your filters</p>
			</div>
		{:else}
			<div class="cog-gallery-grid">
				{#each filteredGallery as item}
					<div class="cog-gallery-card">
						<div class="cog-gallery-thumb cog-gallery-thumb--{item.ratio.replace(':','-')}">
							<div class="cog-gallery-badges">
								<span class="cog-gallery-type-badge cog-gallery-type-badge--{item.type}">{item.type}</span>
								{#if item.character}
									<span class="cog-gallery-char-badge">{item.character}</span>
								{/if}
							</div>
							<div class="cog-gallery-overlay">
								<button class="btn-glass btn-glass-compact btn-glass-light" aria-label="Remix {item.type}">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
								</button>
								<button class="btn-glass btn-glass-compact btn-glass-light" aria-label="Download {item.type}">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
								</button>
								<button class="btn-glass btn-glass-compact btn-glass-light cog-gallery-action--danger" aria-label="Delete {item.type}">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
								</button>
							</div>
						</div>
						<div class="cog-gallery-info">
							<div class="cog-gallery-meta-row">
								<span class="cog-gallery-model">{item.model}</span>
								<span class="cog-gallery-time">{item.time}</span>
							</div>
							<p class="cog-gallery-prompt">{item.prompt}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	/* ── Layout ─────────────────────────────────────────────────────── */
	.cog-gen-layout { display: grid; grid-template-columns: 340px 1fr; gap: 20px; }
	.cog-gen-form { display: flex; flex-direction: column; gap: 14px; }
	.cog-gen-output { display: flex; flex-direction: column; }

	/* ── Fields ─────────────────────────────────────────────────────── */
	.cog-field { display: flex; flex-direction: column; gap: 6px; }
	.cog-field-row { display: flex; align-items: center; justify-content: space-between; }
	.cog-row { display: flex; gap: 10px; }
	.cog-row .cog-field { flex: 1; }
	.cog-label { font-size: 11px; font-weight: 700; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.07em; }
	.cog-label-opt { font-weight: 400; text-transform: none; letter-spacing: 0; color: var(--dt4); font-size: 11px; }
	.cog-value-badge { font-size: 11px; font-weight: 600; color: var(--dt2); background: var(--dbg2); padding: 2px 7px; border-radius: 5px; border: 1px solid var(--dbd); }

	/* ── Textarea ───────────────────────────────────────────────────── */
	.cog-textarea { border: 1.5px solid var(--dbd); border-radius: 10px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 10px 12px; resize: vertical; outline: none; line-height: 1.55; width: 100%; box-sizing: border-box; }
	.cog-textarea:focus { border-color: var(--dt3); }
	.cog-textarea::placeholder { color: var(--dt4); }
	.cog-textarea--sm { rows: 2; }

	/* ── Pills / Segment ────────────────────────────────────────────── */
	.cog-pills { display: flex; gap: 5px; flex-wrap: nowrap; }
	.cog-pills--wrap { flex-wrap: wrap; }
	.cog-pill { display: inline-flex; align-items: center; padding: 5px 12px; border: 1.5px solid var(--dbd); border-radius: 20px; background: transparent; color: var(--dt3); font-size: 12px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; white-space: nowrap; }
	.cog-pill:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cog-pill--active { background: var(--pill-accent, var(--dt)); border-color: var(--pill-accent, var(--dt)); color: #fff; }
	.cog-pill--sm { padding: 4px 10px; font-size: 11.5px; }
	.cog-seg { display: flex; border: 1.5px solid var(--dbd); border-radius: 8px; overflow: hidden; }
	.cog-seg-btn { flex: 1; padding: 6px 10px; border: none; border-right: 1.5px solid var(--dbd); background: transparent; color: var(--dt3); font-size: 12px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.1s; }
	.cog-seg-btn:last-child { border-right: none; }
	.cog-seg-btn:hover { background: var(--dbg2); color: var(--dt2); }
	.cog-seg-btn--active { background: var(--dt); color: #fff; }
	:global(.dark) .cog-seg-btn--active { background: #e5e5e5; color: #111; }

	/* ── Aspect Ratio Cards ─────────────────────────────────────────── */
	.cog-ratio-row { display: flex; gap: 8px; align-items: flex-end; }
	.cog-ratio-card { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 8px 10px; border: 1.5px solid var(--dbd); border-radius: 8px; background: transparent; cursor: pointer; transition: all 0.12s; }
	.cog-ratio-card:hover { border-color: var(--dbd2); background: var(--dbg2); }
	.cog-ratio-card--active { border-color: var(--dt); background: var(--dbg2); }
	.cog-ratio-rect { border-radius: 3px; background: var(--dbd2); border: 1.5px solid var(--dbd); transition: background 0.12s; }
	.cog-ratio-card--active .cog-ratio-rect { background: var(--dt); border-color: var(--dt); }
	:global(.dark) .cog-ratio-card--active .cog-ratio-rect { background: #e5e5e5; border-color: #e5e5e5; }
	.cog-ratio-label { font-size: 10.5px; font-weight: 600; color: var(--dt3); white-space: nowrap; }
	.cog-ratio-card--active .cog-ratio-label { color: var(--dt); }

	/* ── Slider ─────────────────────────────────────────────────────── */
	.cog-slider { width: 100%; accent-color: var(--dt); cursor: pointer; }
	.cog-slider-ticks { display: flex; justify-content: space-between; font-size: 10px; color: var(--dt4); margin-top: -2px; }

	/* ── Select ─────────────────────────────────────────────────────── */
	.cog-select { border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 7px 10px; outline: none; cursor: pointer; width: 100%; }
	.cog-select:focus { border-color: var(--dt3); }
	.cog-select--sm { font-size: 12px; padding: 5px 8px; width: auto; }

	/* ── Toggle ─────────────────────────────────────────────────────── */
	.cog-toggle { display: inline-flex; align-items: center; gap: 7px; padding: 6px 10px; border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg); cursor: pointer; transition: all 0.15s; }
	.cog-toggle:hover { border-color: var(--dbd2); background: var(--dbg2); }
	.cog-toggle--on { border-color: #22c55e; background: rgba(34,197,94,0.06); }
	.cog-toggle-knob { width: 14px; height: 14px; border-radius: 50%; background: var(--dbd2); transition: background 0.15s; border: 1.5px solid var(--dbd); }
	.cog-toggle--on .cog-toggle-knob { background: #22c55e; border-color: #22c55e; }
	.cog-toggle-label { font-size: 12px; font-weight: 600; color: var(--dt3); }
	.cog-toggle--on .cog-toggle-label { color: #16a34a; }

	/* ── Provider badges ────────────────────────────────────────────── */
	.cog-provider-row { display: flex; gap: 5px; flex-wrap: wrap; }
	.cog-provider-badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: 600; background: var(--dbg2); color: var(--dt3); border: 1px solid var(--dbd); letter-spacing: 0.02em; }



	/* ── Spinner ────────────────────────────────────────────────────── */
	.cog-spinner { display: inline-block; width: 13px; height: 13px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: cog-spin 0.7s linear infinite; }
	:global(.dark) .cog-spinner { border-color: rgba(0,0,0,0.2); border-top-color: #111; }
	@keyframes cog-spin { to { transform: rotate(360deg); } }

	/* ── Output states ──────────────────────────────────────────────── */
	.cog-output-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; min-height: 200px; gap: 10px; color: var(--dt4); text-align: center; border: 1.5px dashed var(--dbd); border-radius: 12px; }
	.cog-output-empty-icon { opacity: 0.4; }
	.cog-output-empty p { font-size: 13px; margin: 0; }
	.cog-output-generating { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; min-height: 200px; gap: 12px; border: 1.5px solid var(--dbd); border-radius: 12px; padding: 24px; }
	.cog-gen-model-badge { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700; border: 1.5px solid; }
	.cog-progress-track { width: 100%; max-width: 280px; height: 5px; background: var(--dbg3); border-radius: 3px; overflow: hidden; }
	.cog-progress-fill { height: 100%; background: var(--dt); border-radius: 3px; transition: width 0.12s linear; }
	:global(.dark) .cog-progress-fill { background: #e5e5e5; }
	.cog-gen-hint { font-size: 12px; color: var(--dt4); margin: 0; text-align: center; }
	.cog-gen-pct { font-size: 12px; font-weight: 600; color: var(--dt3); }

	/* ── Video card ─────────────────────────────────────────────────── */
	.cog-video-card { border: 1.5px solid var(--dbd); border-radius: 12px; overflow: hidden; }
	.cog-video-thumb { position: relative; background: var(--dbg3); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
	.cog-video-play-icon { width: 44px; height: 44px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.8); backdrop-filter: blur(4px); }
	.cog-video-badge { position: absolute; padding: 2px 7px; border-radius: 5px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; }
	.cog-video-badge--type { top: 8px; left: 8px; background: rgba(0,0,0,0.5); color: #fff; }
	.cog-video-badge--ratio { top: 8px; right: 8px; background: rgba(0,0,0,0.4); color: rgba(255,255,255,0.9); }
	.cog-video-meta { padding: 12px; display: flex; flex-direction: column; gap: 5px; background: var(--dbg); }
	.cog-meta-row { display: flex; align-items: center; justify-content: space-between; }
	.cog-meta-model { font-size: 12px; font-weight: 700; }
	.cog-meta-dur { font-size: 11px; color: var(--dt3); background: var(--dbg2); padding: 1px 6px; border-radius: 4px; }
	.cog-meta-prompt { font-size: 12px; color: var(--dt3); margin: 0; line-height: 1.5; }
	.cog-meta-actions { display: flex; gap: 6px; align-items: center; margin-top: 4px; }

	/* ── Image grid ─────────────────────────────────────────────────── */
	.cog-img-grid { display: grid; gap: 8px; }
	.cog-img-grid--solo { grid-template-columns: 1fr; }
	.cog-img-grid--duo { grid-template-columns: repeat(2, 1fr); }
	.cog-img-grid--quad { grid-template-columns: repeat(2, 1fr); }
	.cog-img-card { position: relative; border-radius: 10px; overflow: hidden; border: 1.5px solid var(--dbd); }
	.cog-img-placeholder { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
	.cog-img-placeholder--empty { background: var(--dbg3); color: var(--dt4); }
	.cog-img-placeholder--hue-1 { background: rgba(99,102,241,0.08); color: rgba(99,102,241,0.4); }
	.cog-img-placeholder--hue-2 { background: rgba(236,72,153,0.08); color: rgba(236,72,153,0.4); }
	.cog-img-placeholder--hue-3 { background: rgba(245,158,11,0.08); color: rgba(245,158,11,0.4); }
	.cog-img-placeholder--hue-4 { background: rgba(34,197,94,0.08); color: rgba(34,197,94,0.4); }
	.cog-img-actions { position: absolute; top: 6px; right: 6px; display: flex; gap: 4px; z-index: 2; }

	/* ── Inpaint layout ─────────────────────────────────────────────── */
	.cog-inpaint-layout { display: grid; grid-template-columns: 280px 1fr; gap: 16px; margin-bottom: 16px; }
	.cog-inpaint-controls { display: flex; flex-direction: column; gap: 12px; }
	.cog-upload-zone { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 16px; border: 1.5px dashed var(--dbd); border-radius: 10px; background: var(--dbg2); color: var(--dt3); text-align: center; cursor: pointer; font-size: 12.5px; font-weight: 500; transition: all 0.12s; }
	.cog-upload-zone:hover { border-color: var(--dbd2); background: var(--dbg3); }
	.cog-upload-hint { font-size: 10.5px; color: var(--dt4); font-weight: 400; }
	.cog-canvas-area { display: flex; flex-direction: column; gap: 8px; }
	.cog-canvas-inner { position: relative; flex: 1; min-height: 260px; background: var(--dbg3); border: 1.5px dashed var(--dbd); border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: crosshair; }
	.cog-canvas-crosshair { position: relative; z-index: 2; }
	.cog-canvas-mask-overlay { position: absolute; inset: 0; background: rgba(99,102,241,0.04); pointer-events: none; }
	.cog-canvas-hint { position: absolute; bottom: 10px; font-size: 11.5px; color: var(--dt4); }
	.cog-canvas-info { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11.5px; color: var(--dt3); }
	.cog-canvas-info strong { color: var(--dt2); }

	/* ── Edit strip ─────────────────────────────────────────────────── */
	.cog-edit-strip { display: flex; gap: 4px; flex-wrap: wrap; padding: 12px 0 0; border-top: 1px solid var(--dbd); margin-top: 4px; }
	.cog-edit-tool { flex-direction: column; min-width: 60px; font-size: 11px; }
	.cog-edit-tool--active { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cog-edit-tool--active { border-color: #e5e5e5; background: #e5e5e5; color: #111; }

	/* ── Gallery ────────────────────────────────────────────────────── */
	.cog-gallery-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
	.cog-gallery-right { display: flex; align-items: center; gap: 8px; }
	.cog-search-wrap { position: relative; display: flex; align-items: center; }
	.cog-search-icon { position: absolute; left: 9px; color: var(--dt4); pointer-events: none; }
	.cog-search { padding: 6px 10px 6px 28px; border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg); color: var(--dt); font-size: 12.5px; font-family: inherit; outline: none; width: 180px; }
	.cog-search:focus { border-color: var(--dt3); }
	.cog-search::placeholder { color: var(--dt4); }
	.cog-gallery-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 48px 20px; color: var(--dt4); text-align: center; border: 1.5px dashed var(--dbd); border-radius: 12px; }
	.cog-gallery-empty p { font-size: 13px; margin: 0; }
	.cog-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
	.cog-gallery-card { display: flex; flex-direction: column; border: 1.5px solid var(--dbd); border-radius: 10px; overflow: hidden; transition: border-color 0.15s; }
	.cog-gallery-card:hover { border-color: var(--dbd2); }
	.cog-gallery-thumb { position: relative; background: var(--dbg3); }
	.cog-gallery-thumb--16-9 { aspect-ratio: 16/9; }
	.cog-gallery-thumb--9-16 { aspect-ratio: 9/16; }
	.cog-gallery-thumb--1-1 { aspect-ratio: 1; }
	.cog-gallery-thumb--4-3 { aspect-ratio: 4/3; }
	.cog-gallery-thumb--3-4 { aspect-ratio: 3/4; }
	.cog-gallery-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end; gap: 4px; padding: 8px; opacity: 0; transition: opacity 0.15s; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%); }
	.cog-gallery-card:hover .cog-gallery-overlay { opacity: 1; }
	.cog-gallery-badges { position: absolute; top: 6px; left: 6px; display: flex; flex-direction: column; gap: 3px; }
	.cog-gallery-type-badge { display: inline-flex; padding: 2px 6px; border-radius: 4px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
	.cog-gallery-type-badge--image { background: rgba(99,102,241,0.85); color: #fff; }
	.cog-gallery-type-badge--video { background: rgba(239,68,68,0.85); color: #fff; }
	.cog-gallery-char-badge { display: inline-flex; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.9); backdrop-filter: blur(4px); }
	.cog-gallery-info { padding: 9px 10px; background: var(--dbg); display: flex; flex-direction: column; gap: 3px; }
	.cog-gallery-meta-row { display: flex; align-items: center; justify-content: space-between; }
	.cog-gallery-model { font-size: 11px; font-weight: 700; color: var(--dt2); }
	.cog-gallery-time { font-size: 10.5px; color: var(--dt4); }
	.cog-gallery-prompt { font-size: 11.5px; color: var(--dt3); margin: 0; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
