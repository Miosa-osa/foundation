<script lang="ts">
	// Each hover card is independently tracked via a hovered ID string
	let hovered = $state<string | null>(null);

	// Product rating helper
	function stars(rating: number): string {
		return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
	}

	const profiles = [
		{
			id: 'rmoreau',
			handle: '@rmoreau',
			name: 'R. Moreau',
			bio: 'Design systems lead at MIOSA. Previously @figma, @stripe. Open to consulting.',
			avatar: 'R',
			followers: '2.4k',
			following: '318',
			posts: '142',
		},
		{
			id: 'achen',
			handle: '@achen',
			name: 'A. Chen',
			bio: 'Frontend engineer. Svelte, TypeScript, accessibility. Building in public.',
			avatar: 'A',
			followers: '8.1k',
			following: '522',
			posts: '389',
		},
	];

	const links = [
		{
			id: 'svelte-docs',
			href: 'https://svelte.dev',
			label: 'svelte.dev',
			title: 'Svelte — Cybernetically enhanced web apps',
			description: 'Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks do the bulk of their work in the browser, Svelte shifts that work into a compile step.',
			domain: 'svelte.dev',
			favicon: 'S',
			readTime: '3 min read',
		},
		{
			id: 'kit-docs',
			href: 'https://kit.svelte.dev',
			label: 'kit.svelte.dev',
			title: 'SvelteKit — Web development, streamlined',
			description: 'SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.',
			domain: 'kit.svelte.dev',
			favicon: 'K',
			readTime: '5 min read',
		},
	];

	const products = [
		{
			id: 'pro-plan',
			label: 'MIOSA Pro',
			name: 'MIOSA Pro Plan',
			price: '$29',
			period: '/mo',
			rating: 4.8,
			reviews: 214,
			badge: 'Most popular',
			features: ['Unlimited projects', 'Priority support', 'Custom domains', 'Advanced analytics'],
		},
		{
			id: 'starter-plan',
			label: 'MIOSA Starter',
			name: 'MIOSA Starter',
			price: '$9',
			period: '/mo',
			rating: 4.5,
			reviews: 89,
			badge: 'Free trial',
			features: ['5 projects', 'Community support', '1 custom domain'],
		},
	];
</script>

<style>
	.hc-trigger {
		position: relative;
		display: inline-block;
	}
	.hc-card {
		position: absolute;
		z-index: 50;
		background: rgba(12, 12, 12, 0.97);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 14px;
		backdrop-filter: blur(24px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset;
		pointer-events: auto;
		animation: hcFadeIn 0.15s ease;
	}
	.hc-card--below {
		top: calc(100% + 10px);
		left: 0;
	}
	.hc-card--above {
		bottom: calc(100% + 10px);
		left: 0;
	}
	.hc-card--right {
		top: 50%;
		left: calc(100% + 10px);
		transform: translateY(-50%);
	}

	@keyframes hcFadeIn {
		from { opacity: 0; transform: translateY(4px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.hc-card--above { animation-name: hcFadeInUp; }
	@keyframes hcFadeInUp {
		from { opacity: 0; transform: translateY(-4px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.hc-divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 12px 0;
	}
	.hc-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}
	.hc-stat__value {
		font-size: 14px;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.02em;
	}
	.hc-stat__label {
		font-size: 11px;
		color: #555;
	}
</style>

<section class="ds-section">
	<h2 class="ds-title">Hover Cards</h2>
	<p class="ds-desc">Rich content panels that appear on hover, revealing context without navigation. User profiles, link previews, and product details.</p>

	<!-- User profile hover cards -->
	<div class="ds-card">
		<h3 class="ds-card__title">User Profile</h3>
		<p class="ds-card__sub">Hover over a username to preview their profile — avatar, bio, follower counts, and quick actions</p>
		<div class="ds-demo" style="gap: 24px; flex-wrap: wrap; align-items: flex-start; min-height: 220px;">
			{#each profiles as profile}
				<div
					class="hc-trigger"
					role="group"
					onmouseenter={() => (hovered = profile.id)}
					onmouseleave={() => (hovered = null)}
				>
					<span style="color: #fff; font-size: 14px; font-weight: 500; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,0.25); cursor: pointer; transition: text-decoration-color 0.15s;"
						role="button"
						tabindex="0"
						aria-label="View {profile.name}'s profile"
					>
						{profile.handle}
					</span>
					{#if hovered === profile.id}
						<div class="hc-card hc-card--below" style="width: 300px; padding: 16px;">
							<!-- Avatar + name row -->
							<div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
								<div style="display: flex; align-items: center; gap: 10px;">
									<div style="width: 44px; height: 44px; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 700; color: #fff; flex-shrink: 0;">
										{profile.avatar}
									</div>
									<div>
										<p style="font-size: 14px; font-weight: 600; color: #fff; margin: 0; letter-spacing: -0.01em;">{profile.name}</p>
										<p style="font-size: 12px; color: #555; margin: 2px 0 0;">{profile.handle}</p>
									</div>
								</div>
								<button
									class="btn-pill btn-pill-secondary btn-pill-sm"
									style="font-size: 11px; padding: 4px 10px;"
									aria-label="Follow {profile.name}"
								>Follow</button>
							</div>
							<!-- Bio -->
							<p style="font-size: 13px; color: #999; line-height: 1.6; margin: 0 0 12px;">{profile.bio}</p>
							<div class="hc-divider"></div>
							<!-- Stats -->
							<div style="display: flex; justify-content: space-around;">
								<div class="hc-stat">
									<span class="hc-stat__value">{profile.followers}</span>
									<span class="hc-stat__label">Followers</span>
								</div>
								<div style="width: 1px; background: rgba(255,255,255,0.06);"></div>
								<div class="hc-stat">
									<span class="hc-stat__value">{profile.following}</span>
									<span class="hc-stat__label">Following</span>
								</div>
								<div style="width: 1px; background: rgba(255,255,255,0.06);"></div>
								<div class="hc-stat">
									<span class="hc-stat__value">{profile.posts}</span>
									<span class="hc-stat__label">Posts</span>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Link preview hover cards -->
	<div class="ds-card">
		<h3 class="ds-card__title">Link Preview</h3>
		<p class="ds-card__sub">Hover over a hyperlink to preview its page title, description, and source domain before navigating</p>
		<div class="ds-demo" style="gap: 28px; flex-wrap: wrap; align-items: flex-start; min-height: 200px;">
			{#each links as link}
				<div
					class="hc-trigger"
					role="group"
					onmouseenter={() => (hovered = link.id)}
					onmouseleave={() => (hovered = null)}
				>
					<a
						href={link.href}
						style="display: inline-flex; align-items: center; gap: 5px; color: #7dd3fc; font-size: 14px; text-decoration: none; border-bottom: 1px dashed rgba(125,211,252,0.35); padding-bottom: 1px;"
						aria-label="Visit {link.label}"
					>
						<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink: 0;"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke-linecap="round" stroke-linejoin="round"/><polyline points="15 3 21 3 21 9" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke-linecap="round"/></svg>
						{link.label}
					</a>
					{#if hovered === link.id}
						<div class="hc-card hc-card--below" style="width: 340px; padding: 16px;">
							<!-- Domain row -->
							<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
								<div style="width: 24px; height: 24px; border-radius: 6px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #ccc; flex-shrink: 0;">{link.favicon}</div>
								<span style="font-size: 12px; color: #555;">{link.domain}</span>
								<span style="margin-left: auto; font-size: 11px; color: #444;">{link.readTime}</span>
							</div>
							<!-- Title -->
							<p style="font-size: 14px; font-weight: 600; color: #fff; margin: 0 0 8px; line-height: 1.4; letter-spacing: -0.01em;">{link.title}</p>
							<!-- Description -->
							<p style="font-size: 12px; color: #777; line-height: 1.6; margin: 0 0 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">{link.description}</p>
							<div class="hc-divider" style="margin: 10px 0;"></div>
							<div style="display: flex; justify-content: space-between; align-items: center;">
								<span style="font-size: 12px; color: #555;">Open in new tab</span>
								<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: #444;"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke-linecap="round" stroke-linejoin="round"/><polyline points="15 3 21 3 21 9" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke-linecap="round"/></svg>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Product preview hover cards -->
	<div class="ds-card">
		<h3 class="ds-card__title">Product Preview</h3>
		<p class="ds-card__sub">Hover over a plan name to see pricing, ratings, and key features without opening a detail page</p>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; align-items: flex-start; min-height: 260px;">
			{#each products as product}
				<div
					class="hc-trigger"
					role="group"
					onmouseenter={() => (hovered = product.id)}
					onmouseleave={() => (hovered = null)}
				>
					<span
						style="display: inline-flex; align-items: center; gap: 6px; color: #fff; font-size: 14px; font-weight: 500; cursor: default; padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03);"
						role="button"
						tabindex="0"
						aria-label="Preview {product.label}"
					>
						{product.label}
						<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: #555;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>
					</span>
					{#if hovered === product.id}
						<div class="hc-card hc-card--below" style="width: 280px; padding: 16px;">
							<!-- Badge + name -->
							<div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
								<p style="font-size: 14px; font-weight: 700; color: #fff; margin: 0; letter-spacing: -0.02em;">{product.name}</p>
								<span style="font-size: 10px; font-weight: 600; color: #888; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 9999px; padding: 2px 7px; white-space: nowrap; margin-left: 8px; flex-shrink: 0;">{product.badge}</span>
							</div>
							<!-- Price -->
							<div style="display: flex; align-items: baseline; gap: 3px; margin-bottom: 10px;">
								<span style="font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.04em;">{product.price}</span>
								<span style="font-size: 13px; color: #555;">{product.period}</span>
							</div>
							<!-- Rating -->
							<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px;">
								<span style="font-size: 13px; color: #f59e0b; letter-spacing: -1px;">{stars(product.rating)}</span>
								<span style="font-size: 12px; color: #ddd; font-weight: 600;">{product.rating}</span>
								<span style="font-size: 12px; color: #555;">({product.reviews} reviews)</span>
							</div>
							<div class="hc-divider"></div>
							<!-- Features -->
							<div style="display: flex; flex-direction: column; gap: 7px; margin-bottom: 14px;">
								{#each product.features as feature}
									<div style="display: flex; align-items: center; gap: 8px;">
										<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="color: #22c55e; flex-shrink: 0;"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
										<span style="font-size: 13px; color: #aaa;">{feature}</span>
									</div>
								{/each}
							</div>
							<button class="btn-pill btn-pill-primary btn-pill-sm" style="width: 100%; justify-content: center;" aria-label="Get started with {product.name}">
								Get started
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Hover card with actions -->
	<div class="ds-card">
		<h3 class="ds-card__title">Hover Card with Actions</h3>
		<p class="ds-card__sub">Cards can contain interactive elements — buttons, links, and inputs respond to mouse input inside the card</p>
		<div class="ds-demo" style="align-items: flex-start; min-height: 200px;">
			<div
				class="hc-trigger"
				role="group"
				onmouseenter={() => (hovered = 'task-preview')}
				onmouseleave={() => (hovered = null)}
			>
				<div style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02);">
					<div style="width: 8px; height: 8px; border-radius: 9999px; background: #f59e0b; flex-shrink: 0;"></div>
					<span style="font-size: 13px; color: #ddd;">Design token audit</span>
					<span style="font-size: 11px; color: #555; background: rgba(255,255,255,0.06); border-radius: 4px; padding: 1px 5px;">MF-204</span>
				</div>
				{#if hovered === 'task-preview'}
					<div class="hc-card hc-card--below" style="width: 320px; padding: 16px;">
						<!-- Task header -->
						<div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
							<div style="width: 8px; height: 8px; border-radius: 9999px; background: #f59e0b; flex-shrink: 0; margin-top: 5px;"></div>
							<div style="flex: 1;">
								<p style="font-size: 14px; font-weight: 600; color: #fff; margin: 0 0 4px; letter-spacing: -0.01em;">Design token audit</p>
								<div style="display: flex; align-items: center; gap: 8px;">
									<span style="font-size: 11px; color: #555;">MF-204</span>
									<span style="font-size: 11px; color: #555;">·</span>
									<span style="font-size: 11px; color: #f59e0b; font-weight: 500;">In progress</span>
								</div>
							</div>
						</div>
						<p style="font-size: 13px; color: #888; line-height: 1.6; margin: 0 0 12px;">
							Audit all design tokens across the system. Identify unused variables, inconsistencies, and opportunities to consolidate the --ds-* namespace.
						</p>
						<!-- Meta row -->
						<div style="display: flex; gap: 12px; margin-bottom: 12px;">
							<div style="flex: 1;">
								<p style="font-size: 11px; color: #444; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Assignee</p>
								<div style="display: flex; align-items: center; gap: 6px;">
									<div style="width: 20px; height: 20px; border-radius: 9999px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #aaa;">R</div>
									<span style="font-size: 12px; color: #aaa;">R. Moreau</span>
								</div>
							</div>
							<div style="flex: 1;">
								<p style="font-size: 11px; color: #444; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Due</p>
								<span style="font-size: 12px; color: #f87171;">Mar 10, 2026</span>
							</div>
						</div>
						<div class="hc-divider"></div>
						<!-- Actions -->
						<div style="display: flex; gap: 6px;">
							<button class="btn-pill btn-pill-primary btn-pill-sm" style="flex: 1; justify-content: center; font-size: 12px;" aria-label="Open task">Open task</button>
							<button class="btn-pill btn-pill-secondary btn-pill-sm" style="font-size: 12px;" aria-label="Copy task link">
								<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
							<button class="btn-pill btn-pill-secondary btn-pill-sm" style="font-size: 12px;" aria-label="More options">
								<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Positioning examples -->
	<div class="ds-card">
		<h3 class="ds-card__title">Positioning Variants</h3>
		<p class="ds-card__sub">Cards can open above the trigger (↑) or to the right (→) — choose based on available viewport space</p>
		<div class="ds-demo" style="gap: 40px; flex-wrap: wrap; align-items: center; min-height: 180px; padding-top: 32px;">
			<!-- Above -->
			<div
				class="hc-trigger"
				role="group"
				onmouseenter={() => (hovered = 'pos-above')}
				onmouseleave={() => (hovered = null)}
			>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Hover to show card above">↑ Opens above</button>
				{#if hovered === 'pos-above'}
					<div class="hc-card hc-card--above" style="width: 240px; padding: 14px;">
						<p style="font-size: 13px; font-weight: 600; color: #fff; margin: 0 0 6px;">Positioned above</p>
						<p style="font-size: 12px; color: #777; line-height: 1.5; margin: 0;">Use when the trigger is near the bottom of the viewport. Set <code style="font-size: 11px; color: #aaa; background: rgba(255,255,255,0.06); padding: 1px 4px; border-radius: 4px;">bottom: calc(100% + 10px)</code> instead of <code style="font-size: 11px; color: #aaa; background: rgba(255,255,255,0.06); padding: 1px 4px; border-radius: 4px;">top</code>.</p>
					</div>
				{/if}
			</div>

			<!-- Below (default) -->
			<div
				class="hc-trigger"
				role="group"
				onmouseenter={() => (hovered = 'pos-below')}
				onmouseleave={() => (hovered = null)}
			>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Hover to show card below">↓ Opens below (default)</button>
				{#if hovered === 'pos-below'}
					<div class="hc-card hc-card--below" style="width: 240px; padding: 14px;">
						<p style="font-size: 13px; font-weight: 600; color: #fff; margin: 0 0 6px;">Positioned below</p>
						<p style="font-size: 12px; color: #777; line-height: 1.5; margin: 0;">Default position. The card top edge aligns just below the trigger with an 10px gap.</p>
					</div>
				{/if}
			</div>

			<!-- Right -->
			<div
				class="hc-trigger"
				role="group"
				onmouseenter={() => (hovered = 'pos-right')}
				onmouseleave={() => (hovered = null)}
				style="display: inline-block;"
			>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Hover to show card to the right">→ Opens right</button>
				{#if hovered === 'pos-right'}
					<div class="hc-card hc-card--right" style="width: 220px; padding: 14px;">
						<p style="font-size: 13px; font-weight: 600; color: #fff; margin: 0 0 6px;">Positioned right</p>
						<p style="font-size: 12px; color: #777; line-height: 1.5; margin: 0;">Useful in tables and lists where vertical space is tight. Vertically centred on the trigger.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
