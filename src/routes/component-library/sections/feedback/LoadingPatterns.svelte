<script lang="ts">
	// Progressive loading demo — three phases
	let progressivePhase = $state(0); // 0 = skeleton, 1 = blurred, 2 = loaded

	function advancePhase() {
		if (progressivePhase < 2) progressivePhase += 1;
		else progressivePhase = 0;
	}

	const phaseLabels = ['Phase 1: Skeleton', 'Phase 2: Blurred Content', 'Phase 3: Loaded'];

	// Inline loading states
	let btnLoading = $state(false);
	let inputLoading = $state(false);
	let badgeSyncing = $state(true);

	function triggerBtnLoad() {
		btnLoading = true;
		setTimeout(() => { btnLoading = false; }, 2200);
	}
	function triggerInputLoad() {
		inputLoading = true;
		setTimeout(() => { inputLoading = false; }, 1800);
	}

	// Processing card
	let processingPct = $state(0);
	let processingRunning = $state(false);
	let processingDone = $state(false);

	function startProcessing() {
		if (processingRunning) return;
		processingRunning = true;
		processingDone = false;
		processingPct = 0;
		const start = performance.now();
		const duration = 3200;
		function step(now: number) {
			const elapsed = now - start;
			processingPct = Math.min(Math.round((elapsed / duration) * 100), 100);
			if (elapsed < duration) {
				requestAnimationFrame(step);
			} else {
				processingRunning = false;
				processingDone = true;
			}
		}
		requestAnimationFrame(step);
	}

	// App gallery — load content transition
	let galleryLoaded = $state(false);

	const galleryItems = [
		{ title: 'Velocity', sub: 'Motion design system', icon: 'zap', tag: 'Design' },
		{ title: 'Compass', sub: 'Navigation & routing', icon: 'compass', tag: 'Platform' },
		{ title: 'Prism', sub: 'Color token library', icon: 'diamond', tag: 'Design' },
		{ title: 'Forge', sub: 'Build pipeline tools', icon: 'hammer', tag: 'DevOps' },
		{ title: 'Warden', sub: 'Access control layer', icon: 'shield', tag: 'Security' },
		{ title: 'Lumen', sub: 'Dark/light theming', icon: 'lightbulb', tag: 'UI' },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Loading Patterns</h2>
	<p class="ds-desc">
		App splash screens, skeleton grids, processing states, content placeholders, and progressive
		loading — inspired by iOS app launches, modern SaaS apps, and AI processing states.
	</p>

	<!-- ═══ 1. SKELETON TEXT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Skeleton Text</h3>
		<p class="ds-card__sub">Animated shimmer placeholder lines for text content — long, medium, and short</p>
		<div class="ds-demo" style="display: flex; flex-direction: column; gap: 10px; max-width: 420px; width: 100%;">
			<div class="skeleton-line" style="width: 90%;"></div>
			<div class="skeleton-line" style="width: 70%;"></div>
			<div class="skeleton-line" style="width: 40%;"></div>
		</div>
	</div>

	<!-- ═══ 2. SKELETON CARD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Skeleton Card</h3>
		<p class="ds-card__sub">Card-shaped skeleton with image area, title, and description lines</p>
		<div class="ds-demo">
			<div class="skel-card" style="max-width: 280px; width: 100%;">
				<!-- 16:9 image area -->
				<div class="skeleton-block" style="width: 100%; aspect-ratio: 16/9; border-radius: 8px; margin-bottom: 14px;"></div>
				<!-- Title -->
				<div class="skeleton-line" style="width: 80%; height: 14px; margin-bottom: 10px;"></div>
				<!-- Description lines -->
				<div class="skeleton-line" style="width: 95%; height: 11px; margin-bottom: 7px;"></div>
				<div class="skeleton-line" style="width: 85%; height: 11px; margin-bottom: 7px;"></div>
				<div class="skeleton-line" style="width: 55%; height: 11px;"></div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. SKELETON GRID ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Skeleton Grid</h3>
		<p class="ds-card__sub">2×2 grid of skeleton cards — common for galleries and app grids</p>
		<div class="ds-demo">
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-width: 480px; width: 100%;">
				{#each Array(4) as _}
					<div class="skel-card">
						<div class="skeleton-block" style="width: 100%; aspect-ratio: 16/9; border-radius: 6px; margin-bottom: 10px;"></div>
						<div class="skeleton-line" style="width: 75%; height: 12px; margin-bottom: 7px;"></div>
						<div class="skeleton-line" style="width: 55%; height: 10px;"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 4. SKELETON LIST ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Skeleton List</h3>
		<p class="ds-card__sub">4 rows of list item skeletons — avatar circle plus two text lines per row</p>
		<div class="ds-demo" style="flex-direction: column; gap: 0; max-width: 400px; width: 100%;">
			{#each Array(4) as _, i}
				<div style="
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 12px 0;
					border-bottom: {i < 3 ? '1px solid var(--dbd)' : 'none'};
				">
					<!-- Avatar circle -->
					<div class="skeleton-block" style="width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;"></div>
					<!-- Text lines -->
					<div style="flex: 1; display: flex; flex-direction: column; gap: 7px;">
						<div class="skeleton-line" style="width: 55%; height: 12px;"></div>
						<div class="skeleton-line" style="width: 80%; height: 10px;"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 5. APP SPLASH LOADING ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">App Splash Loading</h3>
		<p class="ds-card__sub">Centered icon, app name, and animated "Loading..." — iOS-style launch screen</p>
		<div class="ds-demo">
			<div style="
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 48px 24px;
				gap: 0;
			">
				<!-- App icon -->
				<div style="
					width: 80px;
					height: 80px;
					border-radius: 22px;
					background: linear-gradient(135deg, var(--dbg3) 0%, var(--dbg2) 60%, var(--dbd2) 100%);
					border: 1px solid var(--dbd);
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 18px;
					box-shadow: 0 4px 24px rgba(0,0,0,0.12);
				">
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
						<path d="M18 4L32 12V24L18 32L4 24V12L18 4Z" fill="var(--dt3)" opacity="0.7"/>
						<path d="M18 10L26 15V25L18 30L10 25V15L18 10Z" fill="var(--dt2)" opacity="0.9"/>
						<circle cx="18" cy="20" r="4" fill="var(--dt)"/>
					</svg>
				</div>
				<!-- App name -->
				<div style="font-size: 20px; font-weight: 700; color: var(--dt); letter-spacing: -0.03em; margin-bottom: 6px;">
					MIOSA
				</div>
				<!-- Loading text with pulse -->
				<div class="splash-loading-text" style="font-size: 13px; color: var(--dt3); letter-spacing: 0.04em;">
					Loading...
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 6. PROCESSING CARD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Processing Card</h3>
		<p class="ds-card__sub">Dark processing state with CSS spinner, status text, and live progress percentage</p>
		<div class="ds-demo">
			<div style="
				background: var(--dbg);
				border: 1px solid var(--dbd);
				border-radius: 16px;
				padding: 36px 32px;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 16px;
				min-width: 240px;
				max-width: 320px;
				width: 100%;
			">
				{#if processingDone}
					<!-- Done state -->
					<div style="
						width: 52px; height: 52px; border-radius: 50%;
						background: rgba(34,197,94,0.08);
						border: 2px solid rgba(34,197,94,0.3);
						display: flex; align-items: center; justify-content: center;
					">
						<svg width="22" height="22" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
						</svg>
					</div>
					<div style="font-size: 14px; font-weight: 600; color: var(--dt); text-align: center;">Video processed</div>
					<div style="font-size: 12px; color: #22c55e; font-variant-numeric: tabular-nums;">100%</div>
				{:else}
					<!-- Spinner -->
					<div class="css-spinner"></div>
					<!-- Status -->
					<div style="font-size: 14px; font-weight: 600; color: var(--dt); text-align: center;">
						{processingRunning ? 'Processing video...' : 'Ready to process'}
					</div>
					<!-- Progress percentage -->
					<div style="font-size: 28px; font-weight: 700; color: var(--dt); font-variant-numeric: tabular-nums; letter-spacing: -0.03em;">
						{processingPct}%
					</div>
					{#if processingRunning}
						<!-- Progress bar -->
						<div style="width: 100%; height: 3px; background: var(--dbg2); border-radius: 2px; overflow: hidden;">
							<div style="height: 100%; width: {processingPct}%; background: linear-gradient(90deg, var(--dt4), var(--dt)); transition: width 0.1s;"></div>
						</div>
					{/if}
				{/if}
				<button
					onclick={startProcessing}
					disabled={processingRunning}
					style="
						padding: 8px 20px;
						border-radius: 8px;
						border: 1px solid {processingRunning ? 'var(--dbd)' : 'var(--dbd2)'};
						background: {processingRunning ? 'var(--dbg)' : 'var(--dbg2)'};
						color: {processingRunning ? 'var(--dt4)' : 'var(--dt3)'};
						font-size: 12px;
						font-weight: 500;
						cursor: {processingRunning ? 'not-allowed' : 'pointer'};
						transition: all 0.15s;
						margin-top: 4px;
					"
				>
					{processingDone ? 'Process Again' : processingRunning ? 'Processing...' : 'Start Processing'}
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ 7. CONTENT SHIMMER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Content Shimmer</h3>
		<p class="ds-card__sub">Full-width gradient shimmer sliding left-to-right across a placeholder area — pure CSS</p>
		<div class="ds-demo" style="flex-direction: column; gap: 12px; max-width: 480px; width: 100%;">
			<!-- Wide shimmer block -->
			<div class="shimmer-block" style="height: 120px; border-radius: 10px;"></div>
			<!-- Two-column shimmer -->
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
				<div class="shimmer-block" style="height: 72px; border-radius: 8px;"></div>
				<div class="shimmer-block" style="height: 72px; border-radius: 8px;"></div>
			</div>
			<!-- Text row shimmers -->
			<div style="display: flex; flex-direction: column; gap: 8px;">
				<div class="shimmer-block" style="height: 13px; border-radius: 4px; width: 88%;"></div>
				<div class="shimmer-block" style="height: 13px; border-radius: 4px; width: 72%;"></div>
				<div class="shimmer-block" style="height: 13px; border-radius: 4px; width: 50%;"></div>
			</div>
		</div>
	</div>

	<!-- ═══ 8. PROGRESSIVE LOADING ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Progressive Loading</h3>
		<p class="ds-card__sub">Three-phase demo — skeleton → blurred content → fully loaded. Click to step through.</p>
		<div class="ds-demo" style="flex-direction: column; gap: 20px; max-width: 360px; width: 100%;">
			<!-- Phase indicator -->
			<div style="display: flex; gap: 6px; align-items: center;">
				{#each phaseLabels as label, i}
					<div style="
						flex: 1;
						height: 3px;
						border-radius: 2px;
						background: {i <= progressivePhase ? 'var(--dt)' : 'var(--dbg3)'};
						transition: background 0.3s;
					"></div>
				{/each}
			</div>
			<div style="font-size: 11px; color: var(--dt3); margin-top: -12px;">{phaseLabels[progressivePhase]}</div>

			<!-- The card demo area -->
			<div style="
				border: 1px solid var(--dbd);
				border-radius: 12px;
				overflow: hidden;
				position: relative;
			">
				{#if progressivePhase === 0}
					<!-- Phase 1: Skeleton -->
					<div style="padding: 16px; display: flex; flex-direction: column; gap: 10px; animation: fadeIn 0.3s ease;">
						<div class="skeleton-block" style="width: 100%; height: 140px; border-radius: 6px;"></div>
						<div class="skeleton-line" style="width: 70%; height: 13px;"></div>
						<div class="skeleton-line" style="width: 90%; height: 11px;"></div>
						<div class="skeleton-line" style="width: 60%; height: 11px;"></div>
					</div>
				{:else if progressivePhase === 1}
					<!-- Phase 2: Blurred/faded content -->
					<div style="padding: 16px; display: flex; flex-direction: column; gap: 10px; filter: blur(3px); opacity: 0.55; animation: fadeIn 0.3s ease;">
						<div style="width: 100%; height: 140px; border-radius: 6px; background: linear-gradient(135deg, var(--dbg3) 0%, var(--dbg2) 100%); display: flex; align-items: center; justify-content: center;">
							<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--dt3);opacity:0.6;"><path d="M8 3l-6 9h10L8 3z"/><path d="M16 7l-6 10h12L16 7z"/></svg>
						</div>
						<div style="font-size: 14px; font-weight: 600; color: var(--dt);">Mountain Retreat</div>
						<div style="font-size: 12px; color: var(--dt2); line-height: 1.5;">A serene alpine escape nestled in the highlands, offering panoramic views and deep calm.</div>
					</div>
				{:else}
					<!-- Phase 3: Fully loaded -->
					<div style="padding: 16px; display: flex; flex-direction: column; gap: 10px; animation: fadeIn 0.4s ease;">
						<div style="width: 100%; height: 140px; border-radius: 6px; background: linear-gradient(135deg, var(--dbg3) 0%, var(--dbg2) 100%); display: flex; align-items: center; justify-content: center;">
							<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--dt3);opacity:0.6;"><path d="M8 3l-6 9h10L8 3z"/><path d="M16 7l-6 10h12L16 7z"/></svg>
						</div>
						<div style="font-size: 14px; font-weight: 600; color: var(--dt);">Mountain Retreat</div>
						<div style="font-size: 12px; color: var(--dt2); line-height: 1.5;">A serene alpine escape nestled in the highlands, offering panoramic views and deep calm.</div>
						<div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 2px;">
							<span style="font-size: 10px; padding: 3px 8px; border-radius: 20px; background: var(--dbg2); border: 1px solid var(--dbd); color: var(--dt3);">Nature</span>
							<span style="font-size: 10px; padding: 3px 8px; border-radius: 20px; background: var(--dbg2); border: 1px solid var(--dbd); color: var(--dt3);">Retreat</span>
							<span style="font-size: 10px; padding: 3px 8px; border-radius: 20px; background: var(--dbg2); border: 1px solid var(--dbd); color: var(--dt3);">Alpine</span>
						</div>
					</div>
				{/if}
			</div>

			<button
				onclick={advancePhase}
				style="
					padding: 8px 20px;
					border-radius: 8px;
					border: 1px solid var(--dbd2);
					background: var(--dbg2);
					color: var(--dt3);
					font-size: 12px;
					font-weight: 500;
					cursor: pointer;
					align-self: flex-start;
				"
			>
				{progressivePhase < 2 ? 'Next Phase →' : 'Reset ↺'}
			</button>
		</div>
	</div>

	<!-- ═══ 9. INLINE LOADING STATES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Inline Loading States</h3>
		<p class="ds-card__sub">Small indicators for button, input, badge, and list item contexts</p>
		<div style="display: flex; flex-direction: column; gap: 24px; max-width: 420px;">

			<!-- Button with spinner -->
			<div>
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">Button</div>
				<div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
					<button
						onclick={triggerBtnLoad}
						disabled={btnLoading}
						style="
							display: flex;
							align-items: center;
							gap: 7px;
							padding: 8px 16px;
							border-radius: 8px;
							border: 1px solid var(--dbd2);
							background: var(--dbg2);
							color: var(--dt3);
							font-size: 13px;
							font-weight: 500;
							cursor: {btnLoading ? 'not-allowed' : 'pointer'};
							min-width: 120px;
							justify-content: center;
						"
					>
						{#if btnLoading}
							<span class="inline-spinner"></span>
							<span>Saving...</span>
						{:else}
							<span>Save Changes</span>
						{/if}
					</button>
					<span style="font-size: 11px; color: var(--dt4);">← Click to trigger</span>
				</div>
			</div>

			<!-- Input with spinner suffix -->
			<div>
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">Input</div>
				<div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
					<div style="position: relative; width: 220px;">
						<input
							type="text"
							placeholder="Search users..."
							onfocus={triggerInputLoad}
							style="
								width: 100%;
								padding: 8px 36px 8px 12px;
								border-radius: 8px;
								border: 1px solid var(--dbd2);
								background: var(--dbg);
								color: var(--dt);
								font-size: 13px;
								outline: none;
								box-sizing: border-box;
							"
						/>
						{#if inputLoading}
							<span class="inline-spinner" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></span>
						{:else}
							<svg style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: var(--dt4);" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
						{/if}
					</div>
					<span style="font-size: 11px; color: var(--dt4);">← Focus to trigger</span>
				</div>
			</div>

			<!-- Badge syncing -->
			<div>
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">Badge</div>
				<div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
					<div
						style="
							display: inline-flex;
							align-items: center;
							gap: 6px;
							padding: 4px 10px;
							border-radius: 20px;
							background: var(--dbg2);
							border: 1px solid var(--dbd);
							font-size: 12px;
							color: var(--dt3);
						"
					>
						{#if badgeSyncing}
							<span class="badge-pulse-dot"></span>
							<span>Syncing...</span>
						{:else}
							<svg width="10" height="10" fill="none" stroke="#22c55e" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
							<span style="color: #22c55e;">Synced</span>
						{/if}
					</div>
					<button
						onclick={() => { badgeSyncing = !badgeSyncing; }}
						style="font-size: 11px; padding: 4px 10px; border-radius: 6px; border: 1px solid var(--dbd); background: var(--dbg); color: var(--dt4); cursor: pointer;"
					>
						Toggle
					</button>
				</div>
			</div>

			<!-- List item shimmer -->
			<div>
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">List Item</div>
				<div style="border: 1px solid var(--dbd); border-radius: 10px; overflow: hidden;">
					<!-- Real list item above -->
					<div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--dbd);">
						<div style="width: 30px; height: 30px; border-radius: 50%; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
							<span style="font-size: 12px;">JD</span>
						</div>
						<div>
							<div style="font-size: 13px; font-weight: 500; color: var(--dt);">Jordan Davis</div>
							<div style="font-size: 11px; color: var(--dt3);">jordan@example.com</div>
						</div>
					</div>
					<!-- Shimmer row -->
					<div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--dbd);">
						<div class="skeleton-block" style="width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;"></div>
						<div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
							<div class="skeleton-line" style="width: 45%; height: 11px;"></div>
							<div class="skeleton-line" style="width: 65%; height: 10px;"></div>
						</div>
					</div>
					<!-- Real again below -->
					<div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px;">
						<div style="width: 30px; height: 30px; border-radius: 50%; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
							<span style="font-size: 12px;">MK</span>
						</div>
						<div>
							<div style="font-size: 13px; font-weight: 500; color: var(--dt);">Morgan Kim</div>
							<div style="font-size: 11px; color: var(--dt3);">morgan@example.com</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

	<!-- ═══ 10. IN CONTEXT: APP GALLERY LOADING ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: App Gallery Loading</h3>
		<p class="ds-card__sub">Full composition — page header, filter bar, and 2-col grid skeletons that transition to loaded content</p>
		<div class="ds-demo" style="flex-direction: column; gap: 0; max-width: 520px; width: 100%;">

			<!-- Page header -->
			<div style="margin-bottom: 18px;">
				{#if !galleryLoaded}
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<div class="skeleton-line" style="width: 200px; height: 20px;"></div>
						<div class="skeleton-line" style="width: 340px; height: 13px;"></div>
					</div>
				{:else}
					<div style="animation: fadeIn 0.4s ease;">
						<div style="font-size: 18px; font-weight: 700; color: var(--dt); letter-spacing: -0.02em; margin-bottom: 4px;">App Marketplace</div>
						<div style="font-size: 13px; color: var(--dt3);">Discover tools and integrations for your workspace</div>
					</div>
				{/if}
			</div>

			<!-- Filter bar -->
			<div style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto;">
				{#if !galleryLoaded}
					{#each [80, 60, 70, 55, 65] as w}
						<div class="skeleton-block" style="width: {w}px; height: 28px; border-radius: 20px; flex-shrink: 0;"></div>
					{/each}
				{:else}
					{#each ['All', 'Design', 'DevOps', 'Platform', 'Security', 'UI'] as tag, i}
						<div
							style="
								flex-shrink: 0;
								padding: 5px 12px;
								border-radius: 20px;
								font-size: 12px;
								font-weight: 500;
								background: {i === 0 ? 'var(--dbg2)' : 'transparent'};
								border: 1px solid {i === 0 ? 'var(--dbd2)' : 'var(--dbd)'};
								color: {i === 0 ? 'var(--dt)' : 'var(--dt3)'};
								cursor: pointer;
								animation: fadeIn 0.35s ease;
								animation-delay: {i * 0.05}s;
								animation-fill-mode: both;
							"
						>
							{tag}
						</div>
					{/each}
				{/if}
			</div>

			<!-- Grid of cards -->
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
				{#each galleryItems as item, i}
					<div style="
						border: 1px solid var(--dbd);
						border-radius: 12px;
						overflow: hidden;
						{galleryLoaded ? `animation: fadeIn 0.4s ease; animation-delay: ${i * 0.06}s; animation-fill-mode: both;` : ''}
					">
						{#if !galleryLoaded}
							<!-- Skeleton -->
							<div style="padding: 14px; display: flex; flex-direction: column; gap: 10px;">
								<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
									<div class="skeleton-block" style="width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;"></div>
									<div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
										<div class="skeleton-line" style="width: 60%; height: 12px;"></div>
										<div class="skeleton-line" style="width: 45%; height: 10px;"></div>
									</div>
								</div>
								<div class="skeleton-line" style="width: 90%; height: 10px;"></div>
								<div class="skeleton-line" style="width: 70%; height: 10px;"></div>
							</div>
						{:else}
							<!-- Loaded content -->
							<div style="padding: 14px;">
								<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
									<div style="
										width: 36px; height: 36px; border-radius: 9px;
										background: var(--dbg2);
										border: 1px solid var(--dbd);
										display: flex; align-items: center; justify-content: center;
										flex-shrink: 0;
									" aria-hidden="true">
										{#if item.icon === 'zap'}
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
										{:else if item.icon === 'compass'}
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
										{:else if item.icon === 'diamond'}
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
										{:else if item.icon === 'hammer'}
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12l-8.5 8.5a2.121 2.121 0 01-3-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>
										{:else if item.icon === 'shield'}
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
										{:else if item.icon === 'lightbulb'}
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>
										{/if}
									</div>
									<div>
										<div style="font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 1px;">{item.title}</div>
										<div style="font-size: 10px; padding: 1px 6px; border-radius: 4px; background: var(--dbg3); color: var(--dt4); display: inline-block;">{item.tag}</div>
									</div>
								</div>
								<div style="font-size: 11px; color: var(--dt3); line-height: 1.5;">{item.sub}</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Load button -->
			<div style="display: flex; justify-content: center;">
				<button
					onclick={() => { galleryLoaded = !galleryLoaded; }}
					style="
						padding: 9px 24px;
						border-radius: 9px;
						border: 1px solid var(--dbd2);
						background: var(--dbg2);
						color: var(--dt3);
						font-size: 13px;
						font-weight: 500;
						cursor: pointer;
						display: flex;
						align-items: center;
						gap: 8px;
					"
				>
					{#if !galleryLoaded}
						<span class="inline-spinner"></span>
						<span>Load Content</span>
					{:else}
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
						<span>Reset to Skeleton</span>
					{/if}
				</button>
			</div>

		</div>
	</div>

</section>

<style>
	/* ── Skeleton pulse animation ─────────────────────────────── */
	@keyframes skeleton-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.45; }
	}

	/* ── Shimmer slide animation ──────────────────────────────── */
	@keyframes shimmer-slide {
		0% { background-position: -600px 0; }
		100% { background-position: 600px 0; }
	}

	/* ── Spinner rotation ─────────────────────────────────────── */
	@keyframes spinner-rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* ── Splash text opacity pulse ────────────────────────────── */
	@keyframes opacity-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	/* ── Badge dot pulse ──────────────────────────────────────── */
	@keyframes dot-pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(0.6); opacity: 0.4; }
	}

	/* ── Fade in for phase transitions ───────────────────────── */
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* ── Skeleton line: pulse + base style ───────────────────── */
	:global(.skeleton-line) {
		height: 13px;
		border-radius: 5px;
		background: var(--dbg3);
		animation: skeleton-pulse 1.6s ease-in-out infinite;
	}

	/* ── Skeleton block (image/avatar areas): shimmer ─────────── */
	:global(.skeleton-block) {
		background: linear-gradient(
			90deg,
			var(--dbg2) 0%,
			var(--dbg3) 40%,
			var(--dbg2) 60%,
			var(--dbg2) 100%
		);
		background-size: 1200px 100%;
		animation: shimmer-slide 1.8s linear infinite;
	}

	/* ── Shimmer block (full-area shimmer sweep) ──────────────── */
	:global(.shimmer-block) {
		background: linear-gradient(
			90deg,
			var(--dbg) 0%,
			var(--dbg3) 30%,
			var(--dbg2) 50%,
			var(--dbg3) 70%,
			var(--dbg) 100%
		);
		background-size: 1200px 100%;
		animation: shimmer-slide 2.2s ease-in-out infinite;
	}

	/* ── Skeleton card container ──────────────────────────────── */
	:global(.skel-card) {
		padding: 14px;
		border-radius: 12px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
	}

	/* ── CSS spinner ──────────────────────────────────────────── */
	:global(.css-spinner) {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 3px solid var(--dbg3);
		border-top-color: var(--dt);
		animation: spinner-rotate 0.9s linear infinite;
	}

	/* ── Inline spinner (small) ───────────────────────────────── */
	:global(.inline-spinner) {
		display: inline-block;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		border: 2px solid var(--dbd2);
		border-top-color: var(--dt2);
		animation: spinner-rotate 0.75s linear infinite;
		flex-shrink: 0;
	}

	/* ── Splash loading text ──────────────────────────────────── */
	:global(.splash-loading-text) {
		animation: opacity-pulse 1.8s ease-in-out infinite;
	}

	/* ── Badge pulse dot ──────────────────────────────────────── */
	:global(.badge-pulse-dot) {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--dt3);
		animation: dot-pulse 1.2s ease-in-out infinite;
	}
</style>
