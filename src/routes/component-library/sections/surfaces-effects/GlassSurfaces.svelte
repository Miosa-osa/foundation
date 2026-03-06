<script lang="ts">
	// ── Demo 3: Glass Toolbar ─────────────────────────────────────────────
	let searchQuery  = $state('');
	let boldActive   = $state(false);
	let italicActive = $state(false);

	// ── Demo 7: Profile Card ──────────────────────────────────────────────
	let isFollowing = $state(false);

	// ── Demo 12: Glass Settings Panel ─────────────────────────────────────
	let settingNotifications = $state(true);
	let settingDarkMode      = $state(false);
	let settingAnalytics     = $state(true);
	let settingAutoSave      = $state(true);
	let settingBiometric     = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Glass Surfaces</h2>
	<p class="ds-desc">
		Glassmorphism surface components — translucent cards, panels, toolbars, navbars, inputs, and
		badges built on backdrop-blur. All demos sit on dark gradient backgrounds so the glass effect
		is properly visible.
	</p>

	<!-- ═══ 1. GLASS CARD VARIANTS ═══════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Card Variants</h3>
		<p class="ds-card__sub">
			Three frosting levels: <code>.glass-card</code>, <code>.glass-card-frosted</code>,
			<code>.glass-card-subtle</code>. Each renders a different backdrop-blur intensity against
			the same dark gradient.
		</p>
		<div class="dark-stage dark-stage--gradient">
			<div class="gcv-grid">
				<!-- Standard -->
				<div class="glass-card gcv-card">
					<div class="gcv-icon-row">
						<div class="gcv-icon">
							<svg viewBox="0 0 20 20" fill="none">
								<rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
								<rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
								<rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
								<rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
							</svg>
						</div>
						<span class="glass-badge gcv-badge">Standard</span>
					</div>
					<h4 class="gcv-title">Standard Glass</h4>
					<p class="gcv-body">
						Subtle frosted surface with moderate blur. Ideal for content cards over
						colourful or photographic backgrounds.
					</p>
					<div class="gcv-meta">backdrop-blur: 12px</div>
				</div>

				<!-- Frosted -->
				<div class="glass-card-frosted gcv-card">
					<div class="gcv-icon-row">
						<div class="gcv-icon">
							<svg viewBox="0 0 20 20" fill="none">
								<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
								<path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</div>
						<span class="glass-badge gcv-badge">Frosted</span>
					</div>
					<h4 class="gcv-title">Frosted Glass</h4>
					<p class="gcv-body">
						Stronger blur and higher white-alpha fill. Creates a milky, opaque surface
						— ideal for overlays and side drawers.
					</p>
					<div class="gcv-meta">backdrop-blur: 24px</div>
				</div>

				<!-- Subtle -->
				<div class="glass-card-subtle gcv-card">
					<div class="gcv-icon-row">
						<div class="gcv-icon">
							<svg viewBox="0 0 20 20" fill="none">
								<circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.5"/>
								<circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5"/>
							</svg>
						</div>
						<span class="glass-badge gcv-badge">Subtle</span>
					</div>
					<h4 class="gcv-title">Subtle Glass</h4>
					<p class="gcv-body">
						Barely-there transparency with minimal blur. Blends into dark backgrounds
						while still adding depth via a fine border.
					</p>
					<div class="gcv-meta">backdrop-blur: 6px</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 2. GLASS PANELS ══════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Panels</h3>
		<p class="ds-card__sub">
			<code>.glass-panel</code> (lighter) and <code>.glass-panel-dark</code> (deeper tint) each
			containing a header, a <code>.glass-divider</code>, and a list of items.
		</p>
		<div class="dark-stage dark-stage--radial">
			<div class="gp-grid">
				<!-- Light panel -->
				<div class="glass-panel gp-panel">
					<div class="gp-header">
						<svg class="gp-header__icon" viewBox="0 0 20 20" fill="none">
							<path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
						<span class="gp-header__title">Activity Feed</span>
						<span class="gp-header__count">4 new</span>
					</div>
					<div class="glass-divider gp-divider"></div>
					<ul class="gp-list">
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--blue"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">Deploy completed</span>
								<span class="gp-item__time">2 min ago</span>
							</div>
						</li>
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--green"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">Tests passed · 98%</span>
								<span class="gp-item__time">5 min ago</span>
							</div>
						</li>
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--purple"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">PR #241 merged</span>
								<span class="gp-item__time">12 min ago</span>
							</div>
						</li>
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--amber"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">Build queued</span>
								<span class="gp-item__time">18 min ago</span>
							</div>
						</li>
					</ul>
				</div>

				<!-- Dark panel -->
				<div class="glass-panel-dark gp-panel">
					<div class="gp-header">
						<svg class="gp-header__icon" viewBox="0 0 20 20" fill="none">
							<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
							<path d="M10 7v4l2.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<span class="gp-header__title">System Status</span>
						<span class="gp-header__count gp-header__count--green">All OK</span>
					</div>
					<div class="glass-divider gp-divider"></div>
					<ul class="gp-list">
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--green"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">API Gateway</span>
								<span class="gp-item__time">99.9% uptime</span>
							</div>
						</li>
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--green"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">Database</span>
								<span class="gp-item__time">4.2ms avg</span>
							</div>
						</li>
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--green"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">CDN</span>
								<span class="gp-item__time">12ms p99</span>
							</div>
						</li>
						<li class="gp-item">
							<div class="gp-item__dot gp-item__dot--amber"></div>
							<div class="gp-item__content">
								<span class="gp-item__label">Background jobs</span>
								<span class="gp-item__time">Degraded</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 3. GLASS TOOLBAR ════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Toolbar</h3>
		<p class="ds-card__sub">
			A floating <code>.glass-toolbar</code> with icon buttons (Bold and Italic toggle on
			click) and a <code>.glass-input</code> search field.
		</p>
		<div class="dark-stage dark-stage--deep" style="display: flex; align-items: center; justify-content: center; min-height: 120px;">
			<div class="glass-toolbar gt-bar">
				<!-- Bold -->
				<button
					class="gt-btn"
					class:gt-btn--active={boldActive}
					onclick={() => { boldActive = !boldActive; }}
					aria-label="Toggle bold"
					aria-pressed={boldActive}
				>
					<svg viewBox="0 0 20 20" fill="none" class="gt-btn__icon">
						<path d="M6 4h5.5a3.5 3.5 0 010 7H6V4zM6 11h6a3.5 3.5 0 010 7H6V11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
					</svg>
				</button>

				<!-- Italic -->
				<button
					class="gt-btn"
					class:gt-btn--active={italicActive}
					onclick={() => { italicActive = !italicActive; }}
					aria-label="Toggle italic"
					aria-pressed={italicActive}
				>
					<svg viewBox="0 0 20 20" fill="none" class="gt-btn__icon">
						<path d="M8 4h8M4 16h8M12 4l-4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>

				<!-- Link -->
				<button class="gt-btn" aria-label="Insert link">
					<svg viewBox="0 0 20 20" fill="none" class="gt-btn__icon">
						<path d="M8.5 11.5a4.5 4.5 0 006.364 0l1.768-1.768a4.5 4.5 0 10-6.364-6.364L9.5 4.636" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						<path d="M11.5 8.5a4.5 4.5 0 00-6.364 0L3.368 10.268a4.5 4.5 0 106.364 6.364l.768-.768" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>

				<div class="gt-sep"></div>

				<!-- Search -->
				<div class="gt-search-wrap">
					<svg viewBox="0 0 20 20" fill="none" class="gt-search-icon">
						<circle cx="8.5" cy="8.5" r="5" stroke="currentColor" stroke-width="1.5"/>
						<path d="M15 15l-3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
					<input
						class="glass-input gt-search-input"
						type="search"
						placeholder="Search…"
						bind:value={searchQuery}
						aria-label="Search"
					/>
				</div>

				<div class="gt-sep"></div>

				<!-- More -->
				<button class="gt-btn" aria-label="More options">
					<svg viewBox="0 0 20 20" fill="none" class="gt-btn__icon">
						<circle cx="5"  cy="10" r="1" fill="currentColor"/>
						<circle cx="10" cy="10" r="1" fill="currentColor"/>
						<circle cx="15" cy="10" r="1" fill="currentColor"/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ 4. GLASS NAVIGATION BAR ════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Navigation Bar</h3>
		<p class="ds-card__sub">
			A full-width <code>.glass-nav</code> with brand logo, centred nav links, and a CTA
			button. Floats above page content with backdrop-blur.
		</p>
		<div class="dark-stage dark-stage--gradient" style="padding: 0; border-radius: 16px; overflow: hidden;">
			<div class="gnav-scene">
				<nav class="glass-nav gnav-bar" aria-label="Primary navigation">
					<!-- Brand -->
					<div class="gnav-brand">
						<div class="gnav-logo">
							<svg viewBox="0 0 24 24" fill="none">
								<path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
									fill="rgba(139,92,246,0.75)" stroke="rgba(167,139,250,1)" stroke-width="1"/>
							</svg>
						</div>
						<span class="gnav-brand-name">Miosa</span>
					</div>

					<!-- Links -->
					<ul class="gnav-links" role="list">
						<li><a href="#home"     class="gnav-link gnav-link--active" aria-current="page">Home</a></li>
						<li><a href="#projects" class="gnav-link">Projects</a></li>
						<li><a href="#settings" class="gnav-link">Settings</a></li>
					</ul>

					<!-- CTA -->
					<div class="gnav-cta-wrap">
						<button class="gnav-cta" aria-label="Get started">Get Started</button>
					</div>
				</nav>

				<!-- Page content placeholder -->
				<div class="gnav-body">
					<div class="gnav-body__headline">Glass nav in context</div>
					<div class="gnav-body__sub">Content scrolls beneath the blurred nav</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 5. GLASS INPUT FIELDS ═══════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Input Fields</h3>
		<p class="ds-card__sub">
			<code>.glass-input</code> fields in a form layout on a dark background. The Email field
			is pre-rendered in focus state.
		</p>
		<div class="dark-stage dark-stage--radial">
			<form class="gif-form" onsubmit={(e) => e.preventDefault()} novalidate>
				<div class="gif-field">
					<label class="gif-label" for="gi-name">Name</label>
					<input
						id="gi-name"
						class="glass-input gif-input"
						type="text"
						placeholder="Your full name"
					/>
				</div>

				<div class="gif-field">
					<label class="gif-label" for="gi-email">
						Email
						<span class="gif-label__hint">— focus state shown</span>
					</label>
					<input
						id="gi-email"
						class="glass-input gif-input gif-input--demo-focus"
						type="email"
						placeholder="you@example.com"
					/>
				</div>

				<div class="gif-field">
					<label class="gif-label" for="gi-message">Message</label>
					<textarea
						id="gi-message"
						class="glass-input gif-input gif-textarea"
						placeholder="Write your message…"
						rows="3"
					></textarea>
				</div>

				<button type="submit" class="gif-submit">Send Message</button>
			</form>
		</div>
	</div>

	<!-- ═══ 6. GLASS BADGES ══════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Badges</h3>
		<p class="ds-card__sub">
			<code>.glass-badge</code> used as status pills, tag labels, and notification counts.
		</p>
		<div class="dark-stage dark-stage--deep">
			<!-- Status pills -->
			<div class="gb-group">
				<div class="gb-group__label">Status Pills</div>
				<div class="gb-row">
					<span class="glass-badge gb-pill gb-pill--green">
						<span class="gb-dot gb-dot--green"></span>Online
					</span>
					<span class="glass-badge gb-pill gb-pill--amber">
						<span class="gb-dot gb-dot--amber"></span>Away
					</span>
					<span class="glass-badge gb-pill gb-pill--red">
						<span class="gb-dot gb-dot--red"></span>Offline
					</span>
					<span class="glass-badge gb-pill gb-pill--blue">
						<span class="gb-dot gb-dot--blue"></span>Syncing
					</span>
				</div>
			</div>

			<!-- Tag labels -->
			<div class="gb-group">
				<div class="gb-group__label">Tag Labels</div>
				<div class="gb-row">
					<span class="glass-badge gb-tag">Frontend</span>
					<span class="glass-badge gb-tag">TypeScript</span>
					<span class="glass-badge gb-tag">SvelteKit</span>
					<span class="glass-badge gb-tag">Tailwind</span>
					<span class="glass-badge gb-tag">Vitest</span>
				</div>
			</div>

			<!-- Notification counts -->
			<div class="gb-group">
				<div class="gb-group__label">Notification Counts</div>
				<div class="gb-row gb-row--counts">
					<div class="gb-notif">
						<svg viewBox="0 0 20 20" fill="none" class="gb-notif__icon">
							<path d="M10 2a6 6 0 00-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 00-6-6zM8 17a2 2 0 004 0H8z"
								stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
						</svg>
						<span class="glass-badge gb-count">3</span>
					</div>
					<div class="gb-notif">
						<svg viewBox="0 0 20 20" fill="none" class="gb-notif__icon">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor" opacity="0.4"/>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor" opacity="0.4"/>
						</svg>
						<span class="glass-badge gb-count">12</span>
					</div>
					<div class="gb-notif">
						<svg viewBox="0 0 20 20" fill="none" class="gb-notif__icon">
							<path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
								stroke="currentColor" stroke-width="1.5"/>
							<path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
						<span class="glass-badge gb-count">99+</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 7. GLASS COMPOSITION — PROFILE CARD ═════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Composition — Profile Card</h3>
		<p class="ds-card__sub">
			A complete glass card: avatar circle, name, glass divider, stats row, Pro badge, and
			two glass action buttons. Click Follow to toggle.
		</p>
		<div class="dark-stage dark-stage--gradient" style="display: flex; align-items: center; justify-content: center; min-height: 360px;">
			<div class="glass-card gpc-card">
				<!-- Avatar -->
				<div class="gpc-avatar-wrap">
					<div class="gpc-avatar">
						<span class="gpc-avatar__initials">AK</span>
					</div>
					<span class="glass-badge gpc-pro">Pro</span>
				</div>

				<!-- Identity -->
				<div class="gpc-identity">
					<div class="gpc-name">Alex Kim</div>
					<div class="gpc-handle">@alexkim · San Francisco</div>
				</div>

				<!-- Divider -->
				<div class="glass-divider gpc-divider"></div>

				<!-- Stats -->
				<div class="gpc-stats">
					<div class="gpc-stat">
						<div class="gpc-stat__val">142</div>
						<div class="gpc-stat__lbl">Posts</div>
					</div>
					<div class="gpc-stat-sep"></div>
					<div class="gpc-stat">
						<div class="gpc-stat__val">2.4K</div>
						<div class="gpc-stat__lbl">Followers</div>
					</div>
					<div class="gpc-stat-sep"></div>
					<div class="gpc-stat">
						<div class="gpc-stat__val">891</div>
						<div class="gpc-stat__lbl">Following</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="gpc-actions">
					<button
						class="gpc-btn gpc-btn--follow"
						class:gpc-btn--following={isFollowing}
						onclick={() => { isFollowing = !isFollowing; }}
						aria-label={isFollowing ? 'Unfollow Alex Kim' : 'Follow Alex Kim'}
					>
						{isFollowing ? 'Following' : 'Follow'}
					</button>
					<button class="gpc-btn gpc-btn--msg" aria-label="Message Alex Kim">
						Message
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 8. GLASS COMPOSITION — APP DASHBOARD ════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Composition — App Dashboard</h3>
		<p class="ds-card__sub">
			Layered glass surfaces: a <code>.glass-nav</code> at the top, two <code>.glass-card</code>
			panels in a 2-column grid, and a floating <code>.glass-toolbar</code> at the bottom. Shows
			how glass surfaces layer and compose.
		</p>
		<div class="dark-stage dark-stage--dashboard">
			<!-- Nav -->
			<nav class="glass-nav gd-nav" aria-label="Dashboard navigation">
				<div class="gd-nav__brand">
					<div class="gd-nav__dot"></div>
					<span class="gd-nav__name">Dashboard</span>
				</div>
				<div class="gd-nav__links">
					<span class="gd-navlink gd-navlink--active">Overview</span>
					<span class="gd-navlink">Analytics</span>
					<span class="gd-navlink">Reports</span>
				</div>
				<span class="glass-badge gd-live-badge">Live</span>
			</nav>

			<!-- Grid -->
			<div class="gd-grid">
				<!-- Usage stats -->
				<div class="glass-card gd-card">
					<div class="gd-card__hd">
						<span class="gd-card__title">Usage Stats</span>
						<span class="glass-badge gd-card__badge">This week</span>
					</div>
					<div class="glass-surface gd-surface">
						<div class="gd-stat-row">
							<div class="gd-stat">
								<div class="gd-stat__val">48.2K</div>
								<div class="gd-stat__lbl">API calls</div>
							</div>
							<div class="gd-stat">
								<div class="gd-stat__val">2.1s</div>
								<div class="gd-stat__lbl">Avg latency</div>
							</div>
						</div>
						<!-- Mini bar chart -->
						<div class="gd-bars" aria-label="Weekly usage chart, Mon–Sun">
							{#each [40, 65, 50, 80, 70, 90, 75] as pct, i}
								<div
									class="gd-bar"
									class:gd-bar--highlight={i === 5}
									style="height: {pct}%;"
									title="Day {i + 1}: {pct}%"
								></div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Recent activity -->
				<div class="glass-card gd-card">
					<div class="gd-card__hd">
						<span class="gd-card__title">Recent Activity</span>
						<span class="glass-badge gd-card__badge gd-card__badge--green">3 new</span>
					</div>
					<ul class="gd-activity" role="list">
						<li class="gd-act-item">
							<div class="gd-act-dot gd-act-dot--blue"></div>
							<div class="gd-act-text">
								<span class="gd-act-label">Model deployed</span>
								<span class="gd-act-time">Just now</span>
							</div>
						</li>
						<li class="gd-act-item">
							<div class="gd-act-dot gd-act-dot--green"></div>
							<div class="gd-act-text">
								<span class="gd-act-label">Pipeline passed</span>
								<span class="gd-act-time">4m ago</span>
							</div>
						</li>
						<li class="gd-act-item">
							<div class="gd-act-dot gd-act-dot--purple"></div>
							<div class="gd-act-text">
								<span class="gd-act-label">New integration</span>
								<span class="gd-act-time">1h ago</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- Toolbar -->
			<div class="glass-toolbar gd-toolbar">
				<button class="gd-tool" aria-label="Add item">
					<svg viewBox="0 0 20 20" fill="none" class="gd-tool__icon">
						<path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
				<button class="gd-tool" aria-label="Refresh data">
					<svg viewBox="0 0 20 20" fill="none" class="gd-tool__icon">
						<path d="M4 4v5h5M16 16v-5h-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M4.93 9A8 8 0 1115.07 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
				<div class="gd-tsep"></div>
				<button class="gd-tool" aria-label="Filter results">
					<svg viewBox="0 0 20 20" fill="none" class="gd-tool__icon">
						<path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
				<button class="gd-tool" aria-label="Export data">
					<svg viewBox="0 0 20 20" fill="none" class="gd-tool__icon">
						<path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M4 16h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
				<div class="gd-tspacer"></div>
				<span class="glass-badge gd-ver-badge">v2.4.1</span>
			</div>
		</div>
	</div>

	<!-- ═══ 9. DARK GLASS vs LIGHT GLASS ════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dark Glass vs Light Glass</h3>
		<p class="ds-card__sub">
			The same card layout rendered over a dark gradient and a light gradient side by side.
			Glass auto-adapts — on dark backgrounds it reads white/translucent; on light it shifts to
			a cool white frosted tint.
		</p>
		<div class="dgl-split">
			<!-- Dark side -->
			<div class="dgl-half dgl-half--dark">
				<div class="dgl-label">Dark Gradient</div>
				<div class="glass-card dgl-card">
					<div class="dgl-card-head">
						<div class="dgl-avatar dgl-avatar--dark">
							<svg viewBox="0 0 20 20" fill="none" class="dgl-avatar-icon">
								<path d="M10 2a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" stroke-width="1.5"/>
								<path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</div>
						<div>
							<div class="dgl-name">Jordan Lee</div>
							<div class="dgl-role">Product Designer</div>
						</div>
					</div>
					<div class="glass-divider" style="margin: 12px 0;"></div>
					<div class="dgl-stats">
						<div class="dgl-stat">
							<div class="dgl-stat-val">312</div>
							<div class="dgl-stat-key">Projects</div>
						</div>
						<div class="dgl-stat">
							<div class="dgl-stat-val">8.9K</div>
							<div class="dgl-stat-key">Views</div>
						</div>
						<div class="dgl-stat">
							<div class="dgl-stat-val">4.2</div>
							<div class="dgl-stat-key">Rating</div>
						</div>
					</div>
					<span class="glass-badge dgl-badge">Designer</span>
				</div>
			</div>
			<!-- Light side -->
			<div class="dgl-half dgl-half--light">
				<div class="dgl-label dgl-label--light">Light Gradient</div>
				<div class="glass-card dgl-card dgl-card--light">
					<div class="dgl-card-head">
						<div class="dgl-avatar dgl-avatar--light">
							<svg viewBox="0 0 20 20" fill="none" class="dgl-avatar-icon dgl-avatar-icon--light">
								<path d="M10 2a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" stroke-width="1.5"/>
								<path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</div>
						<div>
							<div class="dgl-name dgl-name--light">Jordan Lee</div>
							<div class="dgl-role dgl-role--light">Product Designer</div>
						</div>
					</div>
					<div class="glass-divider dgl-divider--light" style="margin: 12px 0;"></div>
					<div class="dgl-stats">
						<div class="dgl-stat">
							<div class="dgl-stat-val dgl-stat-val--light">312</div>
							<div class="dgl-stat-key dgl-stat-key--light">Projects</div>
						</div>
						<div class="dgl-stat">
							<div class="dgl-stat-val dgl-stat-val--light">8.9K</div>
							<div class="dgl-stat-key dgl-stat-key--light">Views</div>
						</div>
						<div class="dgl-stat">
							<div class="dgl-stat-val dgl-stat-val--light">4.2</div>
							<div class="dgl-stat-key dgl-stat-key--light">Rating</div>
						</div>
					</div>
					<span class="glass-badge dgl-badge dgl-badge--light">Designer</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 10. GLASS DEPTH LAYERS ══════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Depth Layers</h3>
		<p class="ds-card__sub">
			Nested glass surfaces at increasing blur and opacity levels. The outer container uses
			minimal blur; inner cards step up through moderate and heavy frosting to create convincing
			z-axis depth.
		</p>
		<div class="dark-stage dark-stage--gradient" style="min-height: 380px;">
			<div class="gdl-outer glass-card-subtle">
				<div class="gdl-outer-label">Depth 0 — <code style="font-size:10px;opacity:.6;">.glass-card-subtle</code></div>
				<div class="gdl-mid-row">
					<div class="glass-card gdl-mid">
						<div class="gdl-mid-label">Depth 1 — <code style="font-size:10px;opacity:.6;">.glass-card</code></div>
						<div class="glass-card-frosted gdl-inner">
							<div class="gdl-inner-label">Depth 2 — <code style="font-size:10px;opacity:.6;">.glass-card-frosted</code></div>
							<div class="gdl-content">
								<div class="gdl-icon">
									<svg viewBox="0 0 20 20" fill="none">
										<polygon points="10,2 18,16 2,16" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
										<line x1="10" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
										<circle cx="10" cy="14" r="0.75" fill="currentColor"/>
									</svg>
								</div>
								<div class="gdl-text">
									<div class="gdl-text-title">Deepest Layer</div>
									<div class="gdl-text-body">Maximum blur, highest opacity — anchors the visual stack</div>
								</div>
							</div>
						</div>
					</div>
					<div class="glass-card gdl-mid">
						<div class="gdl-mid-label">Depth 1 — sibling card</div>
						<div class="gdl-info-list">
							<div class="gdl-info-item">
								<span class="gdl-info-dot gdl-dot--blue"></span>
								<span class="gdl-info-txt">backdrop-blur: 6px</span>
							</div>
							<div class="gdl-info-item">
								<span class="gdl-info-dot gdl-dot--purple"></span>
								<span class="gdl-info-txt">backdrop-blur: 12px</span>
							</div>
							<div class="gdl-info-item">
								<span class="gdl-info-dot gdl-dot--cyan"></span>
								<span class="gdl-info-txt">backdrop-blur: 24px</span>
							</div>
						</div>
						<div class="gdl-depth-bar-wrap">
							<div class="gdl-depth-bar gdl-db-0"></div>
							<div class="gdl-depth-bar gdl-db-1"></div>
							<div class="gdl-depth-bar gdl-db-2"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 11. GLASS WITH ANIMATED BORDER ══════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass with Animated Border</h3>
		<p class="ds-card__sub">
			A rotating conic-gradient sits behind a glass card, visible only through the 1 px border
			gap. Produces a premium "holo" border feel without JavaScript — pure CSS animation on a
			<code>::before</code> pseudo-element.
		</p>
		<div class="dark-stage dark-stage--dashboard" style="display:flex; align-items:center; justify-content:center; min-height: 360px; gap: 28px; flex-wrap: wrap;">
			<!-- Standard animated border card -->
			<div class="gab-wrap">
				<div class="glass-card gab-card">
					<div class="gab-icon">
						<svg viewBox="0 0 20 20" fill="none">
							<path d="M10 2l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 14.27l-4.78 2.44.91-5.32L2.26 7.62l5.35-.78L10 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="gab-title">Premium Card</div>
					<div class="gab-body">Gradient border animation using a conic-gradient pseudo-element rotated via CSS keyframes.</div>
					<div class="gab-meta">border: animated glow</div>
				</div>
			</div>
			<!-- Slow rainbow variant -->
			<div class="gab-wrap gab-wrap--rainbow">
				<div class="glass-card gab-card">
					<div class="gab-icon gab-icon--rainbow">
						<svg viewBox="0 0 20 20" fill="none">
							<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/>
							<path d="M7 10a3 3 0 006 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
							<circle cx="8" cy="8" r="0.75" fill="currentColor"/>
							<circle cx="12" cy="8" r="0.75" fill="currentColor"/>
						</svg>
					</div>
					<div class="gab-title">Holo Rainbow</div>
					<div class="gab-body">Full-spectrum rainbow cycle — slower rotation for a premium holographic shimmer.</div>
					<div class="gab-meta">border: rainbow cycle</div>
				</div>
			</div>
			<!-- Pulse glow variant -->
			<div class="gab-wrap gab-wrap--pulse">
				<div class="glass-card gab-card">
					<div class="gab-icon gab-icon--pulse">
						<svg viewBox="0 0 20 20" fill="none">
							<path d="M3 10h2l2-5 2 10 2-7 2 4 1-2h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="gab-title">Pulse Glow</div>
					<div class="gab-body">A pulsing box-shadow creates a breathing glow effect — great for live or alert states.</div>
					<div class="gab-meta">border: pulse glow</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 12. GLASS SETTINGS PANEL ════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Settings Panel</h3>
		<p class="ds-card__sub">
			Apple-style iOS settings on a glass surface. Grouped rows with toggle switches, disclosure
			chevrons, and descriptive subtitles. All toggles are interactive — click to flip.
		</p>
		<div class="dark-stage dark-stage--gradient" style="display:flex; align-items:flex-start; justify-content:center; min-height: 500px; padding: 40px 24px;">
			<div class="gsp-panel glass-card">
				<!-- Header -->
				<div class="gsp-header">
					<div class="gsp-header-icon">
						<svg viewBox="0 0 20 20" fill="none">
							<circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.4"/>
							<path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
						</svg>
					</div>
					<div class="gsp-header-text">
						<div class="gsp-header-title">Preferences</div>
						<div class="gsp-header-sub">App settings &amp; account</div>
					</div>
				</div>

				<!-- Group 1: Notifications & Appearance -->
				<div class="gsp-group-label">General</div>
				<div class="glass-surface gsp-group">
					<!-- Notifications toggle -->
					<div class="gsp-row">
						<div class="gsp-row-icon gsp-icon--blue">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M10 2a6 6 0 016 6v3l1.5 2.5h-15L4 11V8a6 6 0 016-6z" stroke="currentColor" stroke-width="1.4"/>
								<path d="M8 16a2 2 0 004 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Notifications</div>
							<div class="gsp-row-sub">Push alerts and reminders</div>
						</div>
						<button
							class="gsp-toggle"
							class:gsp-toggle--on={settingNotifications}
							onclick={() => { settingNotifications = !settingNotifications; }}
							aria-label="Toggle notifications"
							aria-pressed={settingNotifications}
						>
							<div class="gsp-toggle-thumb"></div>
						</button>
					</div>
					<div class="gsp-sep"></div>
					<!-- Dark Mode toggle -->
					<div class="gsp-row">
						<div class="gsp-row-icon gsp-icon--purple">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Dark Mode</div>
							<div class="gsp-row-sub">Override system appearance</div>
						</div>
						<button
							class="gsp-toggle"
							class:gsp-toggle--on={settingDarkMode}
							onclick={() => { settingDarkMode = !settingDarkMode; }}
							aria-label="Toggle dark mode"
							aria-pressed={settingDarkMode}
						>
							<div class="gsp-toggle-thumb"></div>
						</button>
					</div>
					<div class="gsp-sep"></div>
					<!-- Auto-Save toggle -->
					<div class="gsp-row">
						<div class="gsp-row-icon gsp-icon--green">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M5 4h8l3 3v9a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4"/>
								<rect x="7" y="12" width="6" height="4" rx="0.5" stroke="currentColor" stroke-width="1.2"/>
								<rect x="8" y="4" width="4" height="3" rx="0.5" stroke="currentColor" stroke-width="1.2"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Auto-Save</div>
							<div class="gsp-row-sub">Save changes automatically</div>
						</div>
						<button
							class="gsp-toggle"
							class:gsp-toggle--on={settingAutoSave}
							onclick={() => { settingAutoSave = !settingAutoSave; }}
							aria-label="Toggle auto-save"
							aria-pressed={settingAutoSave}
						>
							<div class="gsp-toggle-thumb"></div>
						</button>
					</div>
				</div>

				<!-- Group 2: Privacy -->
				<div class="gsp-group-label">Privacy &amp; Security</div>
				<div class="glass-surface gsp-group">
					<!-- Analytics toggle -->
					<div class="gsp-row">
						<div class="gsp-row-icon gsp-icon--orange">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M3 17V10M7 17V7M11 17V4M15 17v-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Analytics</div>
							<div class="gsp-row-sub">Share anonymous usage data</div>
						</div>
						<button
							class="gsp-toggle"
							class:gsp-toggle--on={settingAnalytics}
							onclick={() => { settingAnalytics = !settingAnalytics; }}
							aria-label="Toggle analytics"
							aria-pressed={settingAnalytics}
						>
							<div class="gsp-toggle-thumb"></div>
						</button>
					</div>
					<div class="gsp-sep"></div>
					<!-- Biometric toggle -->
					<div class="gsp-row">
						<div class="gsp-row-icon gsp-icon--pink">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M10 3a5 5 0 015 5v1a5 5 0 01-10 0V8a5 5 0 015-5z" stroke="currentColor" stroke-width="1.4"/>
								<path d="M10 10v3M8 17h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Face ID / Touch ID</div>
							<div class="gsp-row-sub">Biometric authentication</div>
						</div>
						<button
							class="gsp-toggle"
							class:gsp-toggle--on={settingBiometric}
							onclick={() => { settingBiometric = !settingBiometric; }}
							aria-label="Toggle biometric authentication"
							aria-pressed={settingBiometric}
						>
							<div class="gsp-toggle-thumb"></div>
						</button>
					</div>
				</div>

				<!-- Group 3: Disclosure rows -->
				<div class="gsp-group-label">Account</div>
				<div class="glass-surface gsp-group">
					<button class="gsp-row gsp-row--btn" aria-label="Open account details">
						<div class="gsp-row-icon gsp-icon--gray">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M10 2a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" stroke-width="1.4"/>
								<path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Account Details</div>
							<div class="gsp-row-sub">Name, email, subscription</div>
						</div>
						<svg viewBox="0 0 20 20" fill="none" class="gsp-chevron">
							<path d="M8 5l4 5-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div class="gsp-sep"></div>
					<button class="gsp-row gsp-row--btn" aria-label="Manage connected apps">
						<div class="gsp-row-icon gsp-icon--indigo">
							<svg viewBox="0 0 20 20" fill="none">
								<rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
								<rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
								<rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
								<rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title">Connected Apps</div>
							<div class="gsp-row-sub">Manage integrations</div>
						</div>
						<svg viewBox="0 0 20 20" fill="none" class="gsp-chevron">
							<path d="M8 5l4 5-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					<div class="gsp-sep"></div>
					<button class="gsp-row gsp-row--btn gsp-row--danger" aria-label="Sign out">
						<div class="gsp-row-icon gsp-icon--red">
							<svg viewBox="0 0 20 20" fill="none">
								<path d="M8 4H5a1 1 0 00-1 1v10a1 1 0 001 1h3M13 14l3-4-3-4M16 10H8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="gsp-row-body">
							<div class="gsp-row-title gsp-row-title--danger">Sign Out</div>
							<div class="gsp-row-sub">Log out of this device</div>
						</div>
						<svg viewBox="0 0 20 20" fill="none" class="gsp-chevron">
							<path d="M8 5l4 5-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ════════════════════════════════════════════════════════════════════
	   DARK STAGE WRAPPERS
	   ════════════════════════════════════════════════════════════════════ */

	.dark-stage {
		padding: 32px;
		border-radius: 16px;
	}
	.dark-stage--gradient {
		background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #0a0a0a);
	}
	.dark-stage--radial {
		background: radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0a0a12 60%, #000 100%);
	}
	.dark-stage--deep {
		background: linear-gradient(160deg, #050510, #0e0e1a, #050510);
	}
	.dark-stage--dashboard {
		background: linear-gradient(135deg, #060614, #0d0d22, #060614);
		padding: 0;
		border-radius: 16px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* ════════════════════════════════════════════════════════════════════
	   1. GLASS CARD VARIANTS
	   ════════════════════════════════════════════════════════════════════ */

	.gcv-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.gcv-card {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: rgba(255, 255, 255, 0.9);
	}

	.gcv-icon-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.gcv-icon {
		width: 32px;
		height: 32px;
		border-radius: 9px;
		background: rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.gcv-icon svg {
		width: 16px;
		height: 16px;
		color: rgba(255, 255, 255, 0.65);
	}

	.gcv-badge { font-size: 10px; padding: 2px 8px; }

	.gcv-title {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.95);
	}

	.gcv-body {
		margin: 0;
		font-size: 12px;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.5);
	}

	.gcv-meta {
		font-size: 10px;
		font-family: var(--font-mono, 'SF Mono', 'Fira Code', monospace);
		color: rgba(255, 255, 255, 0.28);
		letter-spacing: 0.04em;
	}

	/* ════════════════════════════════════════════════════════════════════
	   2. GLASS PANELS
	   ════════════════════════════════════════════════════════════════════ */

	.gp-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.gp-panel {
		padding: 0;
		overflow: hidden;
		border-radius: 14px;
	}

	.gp-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 14px 16px;
	}

	.gp-header__icon {
		width: 15px;
		height: 15px;
		color: rgba(255, 255, 255, 0.45);
		flex-shrink: 0;
	}

	.gp-header__title {
		flex: 1;
		font-size: 13px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.85);
	}

	.gp-header__count {
		font-size: 11px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 1px 7px;
		border-radius: 999px;
	}
	.gp-header__count--green {
		color: #34d399;
		background: rgba(52, 211, 153, 0.1);
		border-color: rgba(52, 211, 153, 0.25);
	}

	.gp-divider { margin: 0; }

	.gp-list {
		list-style: none;
		margin: 0;
		padding: 6px 0 12px;
		display: flex;
		flex-direction: column;
	}

	.gp-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 16px;
	}

	.gp-item__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.gp-item__dot--blue   { background: #38bdf8; }
	.gp-item__dot--green  { background: #34d399; }
	.gp-item__dot--purple { background: #a78bfa; }
	.gp-item__dot--amber  { background: #fbbf24; }

	.gp-item__content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 0;
	}

	.gp-item__label {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.72);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gp-item__time {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.28);
		flex-shrink: 0;
		margin-left: 8px;
	}

	/* ════════════════════════════════════════════════════════════════════
	   3. GLASS TOOLBAR
	   ════════════════════════════════════════════════════════════════════ */

	.gt-bar {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		padding: 6px 8px;
		border-radius: 14px;
	}

	.gt-btn {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		border: 1px solid transparent;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.5);
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		flex-shrink: 0;
	}
	.gt-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.85);
	}
	.gt-btn--active {
		background: rgba(139, 92, 246, 0.18);
		border-color: rgba(139, 92, 246, 0.38);
		color: #c084fc;
	}
	.gt-btn--active:hover {
		background: rgba(139, 92, 246, 0.26);
	}

	.gt-btn__icon { width: 16px; height: 16px; }

	.gt-sep {
		width: 1px;
		height: 20px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0 4px;
		flex-shrink: 0;
	}

	.gt-search-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.gt-search-icon {
		position: absolute;
		left: 9px;
		width: 13px;
		height: 13px;
		color: rgba(255, 255, 255, 0.32);
		pointer-events: none;
	}

	.gt-search-input {
		width: 140px;
		padding: 7px 10px 7px 28px;
		font-size: 13px;
		border-radius: 8px;
		border: none;
		outline: none;
		background: transparent;
		color: rgba(255, 255, 255, 0.8);
	}
	.gt-search-input::placeholder { color: rgba(255, 255, 255, 0.28); }

	/* ════════════════════════════════════════════════════════════════════
	   4. GLASS NAVIGATION BAR
	   ════════════════════════════════════════════════════════════════════ */

	.gnav-scene {
		display: flex;
		flex-direction: column;
		min-height: 220px;
	}

	.gnav-bar {
		display: flex;
		align-items: center;
		padding: 0 20px;
		height: 56px;
		/* Remove side/top radius — fits edge to edge */
		border-radius: 0;
		border-left: none;
		border-right: none;
		border-top: none;
	}

	.gnav-brand {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.gnav-logo {
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.gnav-logo svg { width: 22px; height: 22px; }

	.gnav-brand-name {
		font-size: 15px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.92);
		letter-spacing: -0.02em;
	}

	.gnav-links {
		display: flex;
		align-items: center;
		gap: 2px;
		list-style: none;
		margin: 0 auto;
		padding: 0;
	}

	.gnav-link {
		padding: 5px 12px;
		border-radius: 7px;
		font-size: 13px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.45);
		text-decoration: none;
		transition: background 0.15s, color 0.15s;
	}
	.gnav-link:hover {
		background: rgba(255, 255, 255, 0.07);
		color: rgba(255, 255, 255, 0.8);
	}
	.gnav-link--active {
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.95);
	}

	.gnav-cta-wrap { flex-shrink: 0; }

	.gnav-cta {
		padding: 7px 16px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		background: rgba(139, 92, 246, 0.72);
		border: 1px solid rgba(167, 139, 250, 0.6);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(4px);
		transition: background 0.15s;
	}
	.gnav-cta:hover { background: rgba(139, 92, 246, 0.9); }

	.gnav-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 32px;
	}

	.gnav-body__headline {
		font-size: 20px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.75);
		letter-spacing: -0.02em;
	}

	.gnav-body__sub {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.28);
	}

	/* ════════════════════════════════════════════════════════════════════
	   5. GLASS INPUT FIELDS
	   ════════════════════════════════════════════════════════════════════ */

	.gif-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 480px;
		margin: 0 auto;
	}

	.gif-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.gif-label {
		font-size: 12px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.45);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.gif-label__hint {
		font-size: 10px;
		font-weight: 400;
		color: rgba(139, 92, 246, 0.65);
		text-transform: none;
		letter-spacing: 0;
		margin-left: 4px;
	}

	.gif-input {
		width: 100%;
		padding: 10px 14px;
		font-size: 14px;
		border-radius: 10px;
		border: none;
		outline: none;
		background: transparent;
		color: rgba(255, 255, 255, 0.85);
		box-sizing: border-box;
		font-family: inherit;
	}
	.gif-input::placeholder { color: rgba(255, 255, 255, 0.22); }

	/* Demonstrate focus ring inline without JS */
	.gif-input--demo-focus {
		box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.55);
		border-color: rgba(139, 92, 246, 0.5) !important;
	}

	.gif-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.gif-submit {
		align-self: flex-start;
		padding: 9px 22px;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		background: rgba(139, 92, 246, 0.7);
		border: 1px solid rgba(167, 139, 250, 0.55);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(8px);
		transition: background 0.15s;
	}
	.gif-submit:hover { background: rgba(139, 92, 246, 0.88); }

	/* ════════════════════════════════════════════════════════════════════
	   6. GLASS BADGES
	   ════════════════════════════════════════════════════════════════════ */

	.gb-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 24px;
	}
	.gb-group:last-child { margin-bottom: 0; }

	.gb-group__label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.28);
	}

	.gb-row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.gb-row--counts { gap: 24px; }

	.gb-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		padding: 4px 10px;
	}
	.gb-pill--green { color: #34d399 !important; }
	.gb-pill--amber { color: #fbbf24 !important; }
	.gb-pill--red   { color: #f87171 !important; }
	.gb-pill--blue  { color: #38bdf8 !important; }

	.gb-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.gb-dot--green  { background: #34d399; box-shadow: 0 0 5px rgba(52, 211, 153, 0.8); }
	.gb-dot--amber  { background: #fbbf24; box-shadow: 0 0 5px rgba(251, 191, 36, 0.8); }
	.gb-dot--red    { background: #f87171; box-shadow: 0 0 5px rgba(248, 113, 113, 0.8); }
	.gb-dot--blue   { background: #38bdf8; box-shadow: 0 0 5px rgba(56, 189, 248, 0.8); }

	.gb-tag {
		font-size: 12px;
		padding: 3px 9px;
		color: rgba(255, 255, 255, 0.6);
	}

	.gb-notif {
		position: relative;
		display: inline-flex;
	}

	.gb-notif__icon {
		width: 22px;
		height: 22px;
		color: rgba(255, 255, 255, 0.4);
	}

	.gb-count {
		position: absolute;
		top: -8px;
		right: -12px;
		font-size: 9px;
		font-weight: 700;
		padding: 1px 5px;
		min-width: 18px;
		text-align: center;
		color: rgba(255, 255, 255, 0.85);
	}

	/* ════════════════════════════════════════════════════════════════════
	   7. PROFILE CARD
	   ════════════════════════════════════════════════════════════════════ */

	.gpc-card {
		width: 280px;
		padding: 24px 20px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}

	.gpc-avatar-wrap {
		position: relative;
		display: inline-flex;
	}

	.gpc-avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid rgba(255, 255, 255, 0.14);
	}

	.gpc-avatar__initials {
		font-size: 22px;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.02em;
	}

	.gpc-pro {
		position: absolute;
		bottom: -4px;
		right: -6px;
		font-size: 9px;
		font-weight: 700;
		padding: 2px 6px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #c084fc !important;
	}

	.gpc-identity {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.gpc-name {
		font-size: 17px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
		letter-spacing: -0.02em;
	}

	.gpc-handle {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.38);
	}

	.gpc-divider { width: 100%; }

	.gpc-stats {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.gpc-stat {
		flex: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.gpc-stat__val {
		font-size: 18px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.02em;
	}

	.gpc-stat__lbl {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.32);
	}

	.gpc-stat-sep {
		width: 1px;
		height: 30px;
		background: rgba(255, 255, 255, 0.1);
		flex-shrink: 0;
	}

	.gpc-actions {
		display: flex;
		gap: 8px;
		width: 100%;
	}

	.gpc-btn {
		flex: 1;
		padding: 9px 0;
		border-radius: 10px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid transparent;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
	}

	.gpc-btn--follow {
		background: rgba(139, 92, 246, 0.7);
		border-color: rgba(167, 139, 250, 0.55);
		color: #fff;
		backdrop-filter: blur(6px);
	}
	.gpc-btn--follow:hover    { background: rgba(139, 92, 246, 0.88); }
	.gpc-btn--following {
		background: rgba(255, 255, 255, 0.07);
		border-color: rgba(255, 255, 255, 0.14);
		color: rgba(255, 255, 255, 0.65);
	}
	.gpc-btn--following:hover { background: rgba(255, 255, 255, 0.11); }

	.gpc-btn--msg {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(6px);
	}
	.gpc-btn--msg:hover {
		background: rgba(255, 255, 255, 0.11);
		border-color: rgba(255, 255, 255, 0.2);
	}

	/* ════════════════════════════════════════════════════════════════════
	   8. APP DASHBOARD
	   ════════════════════════════════════════════════════════════════════ */

	.gd-nav {
		display: flex;
		align-items: center;
		gap: 0;
		padding: 0 20px;
		height: 52px;
		border-radius: 0;
		border-left: none;
		border-right: none;
		border-top: none;
	}

	.gd-nav__brand {
		display: flex;
		align-items: center;
		gap: 7px;
		flex-shrink: 0;
	}

	.gd-nav__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: linear-gradient(135deg, #7c3aed, #06b6d4);
	}

	.gd-nav__name {
		font-size: 13px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: -0.01em;
	}

	.gd-nav__links {
		display: flex;
		align-items: center;
		gap: 4px;
		margin: 0 auto;
	}

	.gd-navlink {
		padding: 4px 10px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.38);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.gd-navlink:hover {
		background: rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.7);
	}
	.gd-navlink--active {
		background: rgba(255, 255, 255, 0.09);
		color: rgba(255, 255, 255, 0.9);
	}

	.gd-live-badge {
		font-size: 10px;
		padding: 2px 8px;
		color: #34d399 !important;
	}

	.gd-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		padding: 16px;
	}

	.gd-card {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.gd-card__hd {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.gd-card__title {
		font-size: 11px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.gd-card__badge {
		font-size: 10px;
		padding: 2px 7px;
		color: rgba(255, 255, 255, 0.5);
	}
	.gd-card__badge--green { color: #34d399 !important; }

	.gd-surface {
		border-radius: 10px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.gd-stat-row {
		display: flex;
		gap: 16px;
	}

	.gd-stat { flex: 1; }

	.gd-stat__val {
		font-size: 20px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.02em;
	}

	.gd-stat__lbl {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.32);
		margin-top: 1px;
	}

	.gd-bars {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		height: 40px;
	}

	.gd-bar {
		flex: 1;
		border-radius: 3px 3px 0 0;
		background: linear-gradient(to top, rgba(124, 58, 237, 0.5), rgba(6, 182, 212, 0.5));
		min-height: 4px;
		transition: opacity 0.2s;
	}
	.gd-bar--highlight {
		background: linear-gradient(to top, #7c3aed, #06b6d4);
	}

	.gd-activity {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.gd-act-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.gd-act-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.gd-act-dot--blue   { background: #38bdf8; }
	.gd-act-dot--green  { background: #34d399; }
	.gd-act-dot--purple { background: #a78bfa; }

	.gd-act-text {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.gd-act-label {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.68);
	}

	.gd-act-time {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.28);
	}

	.gd-toolbar {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 8px 14px;
		margin: 0 16px 16px;
		border-radius: 12px;
	}

	.gd-tool {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: 1px solid transparent;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.42);
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		flex-shrink: 0;
	}
	.gd-tool:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.8);
	}

	.gd-tool__icon { width: 15px; height: 15px; }

	.gd-tsep {
		width: 1px;
		height: 18px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0 4px;
		flex-shrink: 0;
	}

	.gd-tspacer { flex: 1; }

	.gd-ver-badge {
		font-size: 10px;
		padding: 2px 7px;
		color: rgba(255, 255, 255, 0.45);
	}

	/* ════════════════════════════════════════════════════════════════════
	   RESPONSIVE
	   ════════════════════════════════════════════════════════════════════ */

	@media (max-width: 720px) {
		.gcv-grid,
		.gp-grid,
		.gd-grid {
			grid-template-columns: 1fr;
		}
		.gnav-links,
		.gd-nav__links {
			display: none;
		}
		.gt-search-input {
			width: 100px;
		}
		.gpc-card {
			width: 100%;
			max-width: 280px;
		}
		.dgl-split { flex-direction: column; }
		.dgl-half  { width: 100%; min-width: 0; }
		.gdl-mid-row { flex-direction: column; }
		.gab-wrap  { width: 100%; }
		.gsp-panel { width: 100%; max-width: 100%; }
	}

	/* ════════════════════════════════════════════════════════════════════
	   9. DARK GLASS vs LIGHT GLASS
	   ════════════════════════════════════════════════════════════════════ */

	.dgl-split {
		display: flex;
		border-radius: 14px;
		overflow: hidden;
	}

	.dgl-half {
		flex: 1;
		padding: 36px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.dgl-half--dark {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	}

	.dgl-half--light {
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	.dgl-label {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.38);
	}

	.dgl-label--light {
		color: rgba(0, 0, 0, 0.32);
	}

	.dgl-card {
		width: 100%;
		max-width: 260px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.dgl-card--light {
		background: rgba(255, 255, 255, 0.55) !important;
		border-color: rgba(255, 255, 255, 0.8) !important;
	}

	.dgl-card-head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 4px;
	}

	.dgl-avatar {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.dgl-avatar--dark {
		background: rgba(124, 58, 237, 0.25);
		border: 1px solid rgba(124, 58, 237, 0.35);
		color: rgba(167, 139, 250, 0.9);
	}

	.dgl-avatar--light {
		background: rgba(99, 102, 241, 0.12);
		border: 1px solid rgba(99, 102, 241, 0.25);
		color: rgba(79, 70, 229, 0.9);
	}

	.dgl-avatar-icon { width: 18px; height: 18px; }

	.dgl-name {
		font-size: 15px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.92);
		letter-spacing: -0.01em;
	}

	.dgl-name--light { color: rgba(15, 23, 42, 0.88); }

	.dgl-role {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.38);
		margin-top: 1px;
	}

	.dgl-role--light { color: rgba(15, 23, 42, 0.42); }

	.dgl-divider--light {
		background: rgba(0, 0, 0, 0.08) !important;
	}

	.dgl-stats {
		display: flex;
		justify-content: space-around;
		margin-bottom: 14px;
	}

	.dgl-stat { text-align: center; }

	.dgl-stat-val {
		font-size: 18px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.02em;
	}

	.dgl-stat-val--light { color: rgba(15, 23, 42, 0.88); }

	.dgl-stat-key {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.32);
		margin-top: 2px;
	}

	.dgl-stat-key--light { color: rgba(15, 23, 42, 0.38); }

	.dgl-badge { font-size: 10px; padding: 2px 9px; }

	.dgl-badge--light {
		background: rgba(99, 102, 241, 0.1) !important;
		border-color: rgba(99, 102, 241, 0.2) !important;
		color: rgba(79, 70, 229, 0.85) !important;
	}

	/* ════════════════════════════════════════════════════════════════════
	   10. GLASS DEPTH LAYERS
	   ════════════════════════════════════════════════════════════════════ */

	.gdl-outer {
		width: 100%;
		max-width: 680px;
		margin: 0 auto;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		border-radius: 18px;
	}

	.gdl-outer-label,
	.gdl-mid-label,
	.gdl-inner-label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.3);
		margin-bottom: 10px;
	}

	.gdl-mid-row {
		display: flex;
		gap: 12px;
	}

	.gdl-mid {
		flex: 1;
		padding: 16px;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.gdl-inner {
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-radius: 12px;
	}

	.gdl-content {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.gdl-icon {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: rgba(239, 68, 68, 0.18);
		border: 1px solid rgba(239, 68, 68, 0.28);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: rgba(252, 165, 165, 0.9);
	}

	.gdl-icon svg { width: 16px; height: 16px; }

	.gdl-text-title {
		font-size: 13px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.88);
	}

	.gdl-text-body {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.44);
		margin-top: 3px;
		line-height: 1.5;
	}

	.gdl-info-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 14px;
	}

	.gdl-info-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.gdl-info-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.gdl-dot--blue   { background: rgba(56, 189, 248, 0.8); }
	.gdl-dot--purple { background: rgba(167, 139, 250, 0.8); }
	.gdl-dot--cyan   { background: rgba(34, 211, 238, 0.8); }

	.gdl-info-txt {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.5);
		font-family: monospace;
	}

	.gdl-depth-bar-wrap {
		display: flex;
		gap: 6px;
		margin-top: auto;
	}

	.gdl-depth-bar {
		flex: 1;
		height: 6px;
		border-radius: 99px;
	}

	.gdl-db-0 { background: rgba(56, 189, 248, 0.45); }
	.gdl-db-1 { background: rgba(167, 139, 250, 0.65); }
	.gdl-db-2 { background: rgba(34, 211, 238, 0.85); }

	/* ════════════════════════════════════════════════════════════════════
	   11. GLASS WITH ANIMATED BORDER
	   ════════════════════════════════════════════════════════════════════ */

	@keyframes gab-spin {
		from { --gab-angle: 0deg; }
		to   { --gab-angle: 360deg; }
	}

	@keyframes gab-rainbow-spin {
		from { --gab-angle: 0deg; }
		to   { --gab-angle: 360deg; }
	}

	@keyframes gab-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
		50%       { box-shadow: 0 0 20px 4px rgba(124, 58, 237, 0.55), 0 0 40px 8px rgba(6, 182, 212, 0.3); }
	}

	@property --gab-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	.gab-wrap {
		position: relative;
		width: 200px;
		border-radius: 18px;
	}

	/* Animated gradient border via pseudo-element */
	.gab-wrap::before {
		content: '';
		position: absolute;
		inset: -1.5px;
		border-radius: 19.5px;
		background: conic-gradient(
			from var(--gab-angle),
			#7c3aed,
			#06b6d4,
			#10b981,
			#7c3aed
		);
		animation: gab-spin 3s linear infinite;
		z-index: 0;
	}

	.gab-wrap--rainbow::before {
		background: conic-gradient(
			from var(--gab-angle),
			#f43f5e, #f97316, #eab308, #22c55e,
			#06b6d4, #6366f1, #a855f7, #f43f5e
		);
		animation: gab-rainbow-spin 6s linear infinite;
	}

	.gab-wrap--pulse::before { display: none; }

	.gab-card {
		position: relative;
		z-index: 1;
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: flex-start;
		border-radius: 17px;
	}

	.gab-wrap--pulse .gab-card {
		animation: gab-pulse 2.4s ease-in-out infinite;
		border-color: rgba(124, 58, 237, 0.35) !important;
	}

	.gab-icon {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: rgba(124, 58, 237, 0.22);
		border: 1px solid rgba(124, 58, 237, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(167, 139, 250, 0.9);
		margin-bottom: 4px;
	}

	.gab-icon svg { width: 18px; height: 18px; }

	.gab-icon--rainbow {
		background: rgba(244, 63, 94, 0.18);
		border-color: rgba(244, 63, 94, 0.28);
		color: rgba(252, 165, 165, 0.9);
	}

	.gab-icon--pulse {
		background: rgba(6, 182, 212, 0.18);
		border-color: rgba(6, 182, 212, 0.28);
		color: rgba(103, 232, 249, 0.9);
	}

	.gab-title {
		font-size: 14px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.01em;
	}

	.gab-body {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.44);
		line-height: 1.55;
	}

	.gab-meta {
		font-size: 10px;
		font-family: monospace;
		color: rgba(167, 139, 250, 0.55);
		margin-top: 4px;
	}

	/* ════════════════════════════════════════════════════════════════════
	   12. GLASS SETTINGS PANEL
	   ════════════════════════════════════════════════════════════════════ */

	.gsp-panel {
		width: 100%;
		max-width: 380px;
		padding: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.gsp-header {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 20px 20px 18px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}

	.gsp-header-icon {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: rgba(124, 58, 237, 0.2);
		border: 1px solid rgba(124, 58, 237, 0.28);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: rgba(167, 139, 250, 0.9);
	}

	.gsp-header-icon svg { width: 20px; height: 20px; }

	.gsp-header-title {
		font-size: 17px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.92);
		letter-spacing: -0.015em;
	}

	.gsp-header-sub {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.36);
		margin-top: 1px;
	}

	.gsp-group-label {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.28);
		padding: 14px 20px 6px;
	}

	.gsp-group {
		margin: 0 12px 4px;
		border-radius: 14px;
		padding: 0;
		overflow: hidden;
	}

	.gsp-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 13px 14px;
		background: transparent;
		border: none;
		width: 100%;
		cursor: default;
		text-align: left;
	}

	.gsp-row--btn {
		cursor: pointer;
		transition: background 0.15s;
	}

	.gsp-row--btn:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.gsp-row--danger:hover {
		background: rgba(239, 68, 68, 0.07);
	}

	.gsp-sep {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin: 0 14px;
	}

	.gsp-row-icon {
		width: 30px;
		height: 30px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.gsp-row-icon svg { width: 15px; height: 15px; }

	.gsp-icon--blue   { background: rgba(59, 130, 246, 0.25); color: rgba(147, 197, 253, 0.9); }
	.gsp-icon--purple { background: rgba(139, 92, 246, 0.25); color: rgba(196, 181, 253, 0.9); }
	.gsp-icon--green  { background: rgba(34, 197, 94, 0.22);  color: rgba(134, 239, 172, 0.9); }
	.gsp-icon--orange { background: rgba(249, 115, 22, 0.22); color: rgba(253, 186, 116, 0.9); }
	.gsp-icon--pink   { background: rgba(236, 72, 153, 0.22); color: rgba(249, 168, 212, 0.9); }
	.gsp-icon--gray   { background: rgba(148, 163, 184, 0.18); color: rgba(203, 213, 225, 0.7); }
	.gsp-icon--indigo { background: rgba(99, 102, 241, 0.22); color: rgba(165, 180, 252, 0.9); }
	.gsp-icon--red    { background: rgba(239, 68, 68, 0.2);   color: rgba(252, 165, 165, 0.9); }

	.gsp-row-body { flex: 1; min-width: 0; }

	.gsp-row-title {
		font-size: 13px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.82);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gsp-row-title--danger { color: rgba(252, 165, 165, 0.9); }

	.gsp-row-sub {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.3);
		margin-top: 1px;
	}

	/* Toggle switch */
	.gsp-toggle {
		width: 42px;
		height: 24px;
		border-radius: 99px;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.12);
		flex-shrink: 0;
		cursor: pointer;
		position: relative;
		transition: background 0.22s, border-color 0.22s;
		padding: 0;
	}

	.gsp-toggle--on {
		background: rgba(99, 102, 241, 0.7);
		border-color: rgba(99, 102, 241, 0.5);
	}

	.gsp-toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.gsp-toggle--on .gsp-toggle-thumb {
		transform: translateX(18px);
	}

	.gsp-chevron {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		color: rgba(255, 255, 255, 0.2);
	}
</style>
