<script lang="ts">
	// ══════════════════════════════════════════════════════════════
	//  BASIC CAROUSEL
	// ══════════════════════════════════════════════════════════════
	const heroSlides = [
		{ title: 'Build Faster',     sub: 'Ship in days, not months', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
		{ title: 'Scale Infinitely', sub: 'From prototype to production', bg: 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)' },
		{ title: 'Stay in Control',  sub: 'Full ownership of your stack', bg: 'linear-gradient(135deg, #533483 0%, #0f3460 100%)' },
	];

	let heroIndex = $state(0);

	function heroNext() { heroIndex = (heroIndex + 1) % heroSlides.length; }
	function heroPrev() { heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length; }
	function heroGo(i: number) { heroIndex = i; }

	// ══════════════════════════════════════════════════════════════
	//  CARD CAROUSEL (multi-visible)
	// ══════════════════════════════════════════════════════════════
	const cardItems = [
		{ label: 'Analytics',    icon: 'chart',    color: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.3)' },
		{ label: 'Automation',   icon: 'lightning',color: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)' },
		{ label: 'Integrations', icon: 'plug',     color: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.3)' },
		{ label: 'Security',     icon: 'shield',   color: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.3)' },
		{ label: 'Reporting',    icon: 'doc',      color: 'rgba(14,165,233,0.15)',  border: 'rgba(14,165,233,0.3)' },
		{ label: 'API Access',   icon: 'code',     color: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)' },
	];

	let cardOffset = $state(0);
	const cardVisible = 3;
	const cardMax = $derived(cardItems.length - cardVisible);

	function cardNext() { cardOffset = Math.min(cardOffset + 1, cardMax); }
	function cardPrev() { cardOffset = Math.max(cardOffset - 1, 0); }

	// ══════════════════════════════════════════════════════════════
	//  TESTIMONIAL CAROUSEL
	// ══════════════════════════════════════════════════════════════
	const testimonials = [
		{
			quote: 'MIOSA Foundation cut our design iteration time in half. The component library is the best I\'ve used in years.',
			author: 'Aria Chen',
			role: 'Head of Design, Veritas',
			avatar: 'AC',
		},
		{
			quote: 'Finally, a design system that feels opinionated without being restrictive. The dark aesthetic is exactly what we needed.',
			author: 'Marcus Okafor',
			role: 'CTO, Pinnacle Labs',
			avatar: 'MO',
		},
		{
			quote: 'We shipped our entire dashboard in 3 weeks using these components. Accessibility is baked in from the start.',
			author: 'Lena Vogel',
			role: 'Engineering Lead, Atlas',
			avatar: 'LV',
		},
	];

	let testimonialIndex = $state(0);

	function testimonialNext() { testimonialIndex = (testimonialIndex + 1) % testimonials.length; }
	function testimonialPrev() { testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length; }

	// ══════════════════════════════════════════════════════════════
	//  AUTO-PLAY WITH PROGRESS BAR
	// ══════════════════════════════════════════════════════════════
	let autoIndex = $state(0);
	let autoProgress = $state(0);
	let autoPlaying = $state(true);
	let autoInterval: ReturnType<typeof setInterval> | null = null;
	let progressInterval: ReturnType<typeof setInterval> | null = null;

	const autoSlides = [
		{ label: 'Onboarding',  color: '#6366f1' },
		{ label: 'Dashboard',   color: '#f59e0b' },
		{ label: 'Analytics',   color: '#22c55e' },
		{ label: 'Settings',    color: '#ec4899' },
	];

	const AUTO_DURATION = 3000;
	const TICK = 50;

	function startAuto() {
		stopAuto();
		autoProgress = 0;
		progressInterval = setInterval(() => {
			autoProgress += (TICK / AUTO_DURATION) * 100;
			if (autoProgress >= 100) {
				autoProgress = 0;
				autoIndex = (autoIndex + 1) % autoSlides.length;
			}
		}, TICK);
		autoPlaying = true;
	}

	function stopAuto() {
		if (progressInterval) clearInterval(progressInterval);
		if (autoInterval) clearInterval(autoInterval);
		progressInterval = null;
		autoInterval = null;
		autoPlaying = false;
	}

	function toggleAuto() {
		if (autoPlaying) stopAuto();
		else startAuto();
	}

	$effect(() => {
		startAuto();
		return () => stopAuto();
	});
</script>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--  SECTION                                                        -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<section class="ds-section">
	<h2 class="ds-title">Carousel</h2>
	<p class="ds-desc">
		Slide and card carousels — hero, multi-card, testimonials, dot indicators, and
		an auto-play variant with progress bar. CSS <code>translateX</code> transforms,
		no external dependencies.
	</p>

	<!-- ══════════════════════════════════════════════════════════ -->
	<!--  HERO CAROUSEL                                             -->
	<!-- ══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Hero Carousel</h3>
		<p class="ds-card__sub">Full-width slide with arrows, dot indicators, and smooth CSS transition.</p>
		<div class="car-hero-wrap" aria-label="Hero carousel" aria-roledescription="carousel">
			<div class="car-hero-track" style="transform: translateX(-{heroIndex * 100}%);">
				{#each heroSlides as slide, i}
					<div
						class="car-hero-slide"
						style="background: {slide.bg};"
						aria-hidden={i !== heroIndex}
						role="group"
						aria-roledescription="slide"
						aria-label="Slide {i + 1} of {heroSlides.length}: {slide.title}"
					>
						<div class="car-hero-content">
							<h3 class="car-hero-title">{slide.title}</h3>
							<p class="car-hero-sub">{slide.sub}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Prev / Next -->
			<button class="car-arrow car-arrow--left" onclick={heroPrev} aria-label="Previous slide">
				<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
			</button>
			<button class="car-arrow car-arrow--right" onclick={heroNext} aria-label="Next slide">
				<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
				</svg>
			</button>

			<!-- Dots -->
			<div class="car-dots" role="tablist" aria-label="Slide indicators">
				{#each heroSlides as _, i}
					<button
						class="car-dot"
						class:car-dot--active={heroIndex === i}
						onclick={() => heroGo(i)}
						role="tab"
						aria-selected={heroIndex === i}
						aria-label="Go to slide {i + 1}"
					></button>
				{/each}
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════ -->
	<!--  CARD CAROUSEL (multi-visible)                             -->
	<!-- ══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Card Carousel</h3>
		<p class="ds-card__sub">Multiple cards visible at once — scroll through with arrows.</p>
		<div class="car-cards-outer" aria-label="Card carousel" aria-roledescription="carousel">
			<div class="car-cards-track" style="transform: translateX(calc(-{cardOffset} * (33.333% + 12px)));">
				{#each cardItems as card, i}
					<div
						class="car-card-item"
						role="group"
						aria-roledescription="slide"
						aria-label="{card.label}, {i + 1} of {cardItems.length}"
						style="border-color: {card.border};"
					>
						<div class="car-card-icon" style="background: {card.color}; border-color: {card.border};">
							{#if card.icon === 'chart'}
								<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
							{:else if card.icon === 'lightning'}
								<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
							{:else if card.icon === 'plug'}
								<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
							{:else if card.icon === 'shield'}
								<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
							{:else if card.icon === 'doc'}
								<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
							{:else}
								<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
							{/if}
						</div>
						<span class="car-card-label">{card.label}</span>
					</div>
				{/each}
			</div>

			<!-- Controls row -->
			<div class="car-cards-controls">
				<button
					class="car-arrow-sm"
					onclick={cardPrev}
					disabled={cardOffset === 0}
					aria-label="Previous cards"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>
				<span class="car-cards-count" aria-live="polite">{cardOffset + 1} – {Math.min(cardOffset + cardVisible, cardItems.length)} of {cardItems.length}</span>
				<button
					class="car-arrow-sm"
					onclick={cardNext}
					disabled={cardOffset >= cardMax}
					aria-label="Next cards"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════ -->
	<!--  AUTO-PLAY WITH PROGRESS BAR                               -->
	<!-- ══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Auto-Play with Progress Bar</h3>
		<p class="ds-card__sub">Advances every 3 seconds. The progress bar fills between transitions.</p>
		<div class="car-auto-wrap">
			<!-- Slides -->
			<div class="car-auto-inner" aria-live="polite" aria-atomic="true">
				{#each autoSlides as slide, i}
					<div
						class="car-auto-slide"
						class:car-auto-slide--visible={i === autoIndex}
						aria-hidden={i !== autoIndex}
					>
						<div class="car-auto-dot" style="background: {slide.color};"></div>
						<span class="car-auto-label">{slide.label}</span>
						<span class="car-auto-num">{i + 1} / {autoSlides.length}</span>
					</div>
				{/each}
			</div>

			<!-- Progress bar -->
			<div class="car-progress-track" aria-hidden="true">
				<div
					class="car-progress-fill"
					style="width: {autoProgress}%; background: {autoSlides[autoIndex].color};"
				></div>
			</div>

			<!-- Controls -->
			<div class="car-auto-controls">
				<!-- Dot indicators -->
				<div class="car-dots" role="tablist" aria-label="Slide indicators" style="position: static;">
					{#each autoSlides as _, i}
						<button
							class="car-dot"
							class:car-dot--active={autoIndex === i}
							onclick={() => { autoIndex = i; autoProgress = 0; }}
							role="tab"
							aria-selected={autoIndex === i}
							aria-label="Go to slide {i + 1}"
						></button>
					{/each}
				</div>

				<!-- Play/pause -->
				<button class="car-playpause" onclick={toggleAuto} aria-label={autoPlaying ? 'Pause auto-play' : 'Start auto-play'}>
					{#if autoPlaying}
						<svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
						Pause
					{:else}
						<svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
						Play
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════ -->
	<!--  TESTIMONIAL CAROUSEL                                      -->
	<!-- ══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Testimonial Carousel</h3>
		<p class="ds-card__sub">Quote + author with fade crossfade. Use arrows or dots to advance.</p>
		<div class="car-testi-wrap" aria-label="Testimonials" aria-roledescription="carousel">
			<!-- Quote mark -->
			<div class="car-testi-quote-mark" aria-hidden="true">"</div>

			<div class="car-testi-inner">
				{#each testimonials as testi, i}
					<div
						class="car-testi-slide"
						class:car-testi-slide--visible={i === testimonialIndex}
						aria-hidden={i !== testimonialIndex}
						role="group"
						aria-roledescription="slide"
					>
						<blockquote class="car-testi-text">
							{testi.quote}
						</blockquote>
						<div class="car-testi-author">
							<div class="car-testi-avatar" aria-hidden="true">{testi.avatar}</div>
							<div class="car-testi-meta">
								<strong class="car-testi-name">{testi.author}</strong>
								<span class="car-testi-role">{testi.role}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Nav row -->
			<div class="car-testi-nav">
				<button class="car-arrow-sm" onclick={testimonialPrev} aria-label="Previous testimonial">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>
				<div class="car-dots" role="tablist" aria-label="Testimonial indicators" style="position: static; bottom: auto;">
					{#each testimonials as _, i}
						<button
							class="car-dot"
							class:car-dot--active={testimonialIndex === i}
							onclick={() => (testimonialIndex = i)}
							role="tab"
							aria-selected={testimonialIndex === i}
							aria-label="Go to testimonial {i + 1}"
						></button>
					{/each}
				</div>
				<button class="car-arrow-sm" onclick={testimonialNext} aria-label="Next testimonial">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════ -->
	<!--  THUMBNAIL STRIP                                           -->
	<!-- ══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Thumbnail Strip Navigation</h3>
		<p class="ds-card__sub">Click a thumbnail below the main view to jump to that slide.</p>
		<div class="car-thumb-wrap">
			<!-- Main view -->
			<div class="car-thumb-main" aria-live="polite" aria-atomic="true">
				<div class="car-thumb-panel" style="background: {heroSlides[heroIndex].bg};">
					<h3 class="car-hero-title">{heroSlides[heroIndex].title}</h3>
					<p class="car-hero-sub">{heroSlides[heroIndex].sub}</p>
				</div>
			</div>
			<!-- Thumbnail strip -->
			<div class="car-thumb-strip" role="tablist" aria-label="Slide thumbnails">
				{#each heroSlides as slide, i}
					<button
						class="car-thumb-item"
						class:car-thumb-item--active={heroIndex === i}
						onclick={() => heroGo(i)}
						role="tab"
						aria-selected={heroIndex === i}
						aria-label="Slide {i + 1}: {slide.title}"
						style="background: {slide.bg};"
					>
						<span class="car-thumb-label">{slide.title}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  HERO CAROUSEL                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.car-hero-wrap {
		position: relative;
		overflow: hidden;
		border-radius: 10px;
		height: 220px;
	}

	.car-hero-track {
		display: flex;
		height: 100%;
		transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.car-hero-slide {
		min-width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.car-hero-content {
		text-align: center;
		padding: 24px;
	}

	.car-hero-title {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: rgba(255, 255, 255, 0.92);
		margin: 0 0 6px;
	}

	.car-hero-sub {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.45);
		margin: 0;
	}

	/* Arrows */
	.car-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		cursor: pointer;
		color: rgba(255, 255, 255, 0.75);
		transition: background 0.15s, border-color 0.15s;
		z-index: 2;
	}

	.car-arrow:hover {
		background: rgba(0, 0, 0, 0.6);
		border-color: rgba(255, 255, 255, 0.22);
		color: #fff;
	}

	.car-arrow--left  { left: 12px; }
	.car-arrow--right { right: 12px; }

	/* Dots */
	.car-dots {
		position: absolute;
		bottom: 14px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.car-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.3);
		cursor: pointer;
		padding: 0;
		transition: background 0.2s, width 0.2s, border-radius 0.2s;
	}

	.car-dot--active {
		width: 20px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.85);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  CARD CAROUSEL                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.car-cards-outer {
		overflow: hidden;
	}

	.car-cards-track {
		display: flex;
		gap: 12px;
		transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.car-card-item {
		min-width: calc(33.333% - 8px);
		flex-shrink: 0;
		padding: 20px 16px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.02);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.car-card-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.8);
	}

	.car-card-label {
		font-size: 13px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.65);
		text-align: center;
	}

	.car-cards-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		margin-top: 14px;
	}

	.car-cards-count {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.35);
		font-variant-numeric: tabular-nums;
		min-width: 80px;
		text-align: center;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  SMALL ARROW BUTTON (shared)                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.car-arrow-sm {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.09);
		background: rgba(255, 255, 255, 0.03);
		cursor: pointer;
		color: rgba(255, 255, 255, 0.5);
		transition: background 0.15s, border-color 0.15s, color 0.15s;
	}

	.car-arrow-sm:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.07);
		border-color: rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.85);
	}

	.car-arrow-sm:disabled {
		opacity: 0.25;
		cursor: not-allowed;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  AUTO-PLAY CAROUSEL                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.car-auto-wrap {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.car-auto-inner {
		position: relative;
		height: 80px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		overflow: hidden;
	}

	.car-auto-slide {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.car-auto-slide--visible {
		opacity: 1;
		pointer-events: auto;
	}

	.car-auto-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.car-auto-label {
		font-size: 15px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
		letter-spacing: -0.01em;
	}

	.car-auto-num {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.25);
		font-variant-numeric: tabular-nums;
	}

	/* Progress bar */
	.car-progress-track {
		height: 3px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.06);
		overflow: hidden;
	}

	.car-progress-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 50ms linear;
	}

	/* Controls row */
	.car-auto-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.car-playpause {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-family: inherit;
		color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 6px;
		padding: 5px 10px;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.car-playpause:hover {
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.75);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TESTIMONIAL CAROUSEL                                         */
	/* ══════════════════════════════════════════════════════════════ */
	.car-testi-wrap {
		padding: 8px 0;
	}

	.car-testi-quote-mark {
		font-size: 56px;
		line-height: 1;
		color: rgba(255, 255, 255, 0.08);
		font-family: Georgia, serif;
		margin-bottom: -12px;
		user-select: none;
	}

	.car-testi-inner {
		position: relative;
		min-height: 130px;
	}

	.car-testi-slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.car-testi-slide--visible {
		opacity: 1;
		pointer-events: auto;
		position: relative;
	}

	.car-testi-text {
		font-size: 15px;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.75);
		margin: 0;
		font-style: normal;
		font-weight: 400;
	}

	.car-testi-author {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.car-testi-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.5);
		flex-shrink: 0;
		letter-spacing: 0.03em;
	}

	.car-testi-meta {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.car-testi-name {
		font-size: 13px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
	}

	.car-testi-role {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.35);
	}

	.car-testi-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  THUMBNAIL STRIP                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.car-thumb-wrap {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.car-thumb-main {
		border-radius: 10px;
		overflow: hidden;
		height: 160px;
	}

	.car-thumb-panel {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}

	.car-thumb-strip {
		display: flex;
		gap: 8px;
	}

	.car-thumb-item {
		flex: 1;
		height: 56px;
		border-radius: 8px;
		border: 2px solid transparent;
		cursor: pointer;
		display: flex;
		align-items: flex-end;
		padding: 6px 8px;
		overflow: hidden;
		transition: border-color 0.15s, opacity 0.15s;
		opacity: 0.5;
	}

	.car-thumb-item:hover {
		opacity: 0.75;
	}

	.car-thumb-item--active {
		border-color: rgba(255, 255, 255, 0.5);
		opacity: 1;
	}

	.car-thumb-label {
		font-size: 11px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
	}
</style>
