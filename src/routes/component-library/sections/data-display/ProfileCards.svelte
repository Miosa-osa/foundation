<script lang="ts">
	// Follow state for each demo user — keyed by unique id
	let followStates = $state<Record<string, boolean>>({
		// User Row demos
		'row-alice': false,
		'row-blake': false,
		'row-casey': false,
		// Size variants
		'size-sm': false,
		'size-md': false,
		'size-lg': false,
		// Profile header
		'header-main': false,
		// Vertical cards
		'card-0': false,
		'card-1': false,
		'card-2': false,
		'card-3': false,
		'card-4': false,
		// List rows
		'list-0': false,
		'list-1': false,
		'list-2': false,
		'list-3': false,
		// In-context suggested page
		'suggested-0': false,
		'suggested-1': false,
		'suggested-2': false,
		'suggested-3': false,
		'suggested-4': false,
	});

	// Active tab for the profile page in-context demo
	let profileTab = $state<'public' | 'private'>('public');

	function toggle(id: string) {
		followStates[id] = !followStates[id];
	}

	// Avatar gradient palettes — deterministic by index
	const avatarPalettes = [
		{ bg: 'linear-gradient(135deg, #1a1a2e, #0d0d1a)', color: '#818cf8' },
		{ bg: 'linear-gradient(135deg, #1c1c14, #0f0f09)', color: '#a3e635' },
		{ bg: 'linear-gradient(135deg, #1e1218, #0f090d)', color: '#f472b6' },
		{ bg: 'linear-gradient(135deg, #111827, #060b14)', color: '#38bdf8' },
		{ bg: 'linear-gradient(135deg, #1c1410, #0f0a07)', color: '#fb923c' },
		{ bg: 'linear-gradient(135deg, #151c17, #0a0f0c)', color: '#34d399' },
	];

	function palette(i: number) {
		return avatarPalettes[i % avatarPalettes.length];
	}

	const users = [
		{ id: 'card-0', initials: 'AM', name: 'Alice Morgan',  handle: '@alicemorgan',  bio: 'Design systems & UI engineering.' },
		{ id: 'card-1', initials: 'BT', name: 'Blake Torres',  handle: '@blaketorres',  bio: 'Product at the intersection of code and craft.' },
		{ id: 'card-2', initials: 'CN', name: 'Casey Nguyen',  handle: '@caseynguyen',  bio: 'Full-stack developer & open source contributor.' },
		{ id: 'card-3', initials: 'DO', name: 'Dana Okafor',   handle: '@danaokafor',   bio: 'ML research — making models human-friendly.' },
		{ id: 'card-4', initials: 'EZ', name: 'Elliot Zhang',  handle: '@elliotzhang',  bio: 'DevOps & infrastructure automation nerd.' },
	];

	const listUsers = [
		{ id: 'list-0', initials: 'FP', name: 'Fiona Park',    handle: '@fionapark'    },
		{ id: 'list-1', initials: 'GR', name: 'Grant Rivera',  handle: '@grantrivera'  },
		{ id: 'list-2', initials: 'HL', name: 'Hana Lim',      handle: '@hanalim'      },
		{ id: 'list-3', initials: 'IS', name: 'Ivan Sokolov',  handle: '@ivansokolov'  },
	];

	const suggestedUsers = [
		{ id: 'suggested-0', initials: 'JD', name: 'Jordan Davis',  handle: '@jordandavis',  reason: 'Followed by Alice Morgan' },
		{ id: 'suggested-1', initials: 'KW', name: 'Kai Watanabe',  handle: '@kaiwatanabe',  reason: 'Popular in your network' },
		{ id: 'suggested-2', initials: 'LM', name: 'Luna Martínez', handle: '@lunamartinez', reason: 'Followed by Blake Torres' },
		{ id: 'suggested-3', initials: 'MN', name: 'Marco Nieto',   handle: '@marconieto',   reason: 'Similar interests' },
		{ id: 'suggested-4', initials: 'NP', name: 'Nia Patel',     handle: '@niapatel',     reason: 'Popular in your network' },
	];

	const appCards = [
		{ icon: 'bolt', label: 'Blitz',    desc: 'Speed tools' },
		{ icon: 'search', label: 'Explore',  desc: 'Discover content' },
		{ icon: 'edit', label: 'Notebook', desc: 'Notes & drafts' },
		{ icon: 'chart', label: 'Dash',     desc: 'Analytics' },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Profile Cards</h2>
	<p class="ds-desc">Profile headers, user rows, follow patterns, and social layouts. Inspired by modern social apps and OS user profiles. All follow/unfollow actions are interactive.</p>

	<!-- ═══ 1. USER ROW ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">User Row</h3>
		<p class="ds-card__sub">Avatar + name + handle + follow action. Click Follow to toggle.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: stretch; gap: 0; max-width: 420px; border: 1px solid var(--dbd); border-radius: 14px; overflow: hidden;">
			{#each [
				{ id: 'row-alice', initials: 'AM', name: 'Alice Morgan',  handle: '@alicemorgan',  pi: 0 },
				{ id: 'row-blake', initials: 'BT', name: 'Blake Torres',  handle: '@blaketorres',  pi: 1 },
				{ id: 'row-casey', initials: 'CN', name: 'Casey Nguyen',  handle: '@caseynguyen',  pi: 2 },
			] as user, i}
				<div class="user-row" class:user-row--bordered={i > 0}>
					<!-- Avatar -->
					<div class="avatar avatar--40" style="background: {palette(user.pi).bg}; color: {palette(user.pi).color};">
						{user.initials}
					</div>
					<!-- Identity -->
					<div class="user-row__identity">
						<span class="user-row__name">{user.name}</span>
						<span class="user-row__handle">{user.handle}</span>
					</div>
					<!-- Follow button -->
					<button
						class="btn-pill btn-pill-sm {followStates[user.id] ? 'btn-pill-outline' : 'btn-pill-primary'}"
						onclick={() => toggle(user.id)}
					>
						{followStates[user.id] ? 'Following' : 'Follow'}
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 2. USER ROW SIZES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">User Row Sizes</h3>
		<p class="ds-card__sub">Small (32px), Default (40px), and Large (48px) avatar variants.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: stretch; gap: 20px; max-width: 420px;">
			{#each [
				{ id: 'size-sm', size: 32, fontSize: 11, label: 'Small',   sizeKey: 'sm' as const,  name: 'Alice Morgan',  handle: '@alicemorgan',  initials: 'AM', pi: 0 },
				{ id: 'size-md', size: 40, fontSize: 13, label: 'Default', sizeKey: 'md' as const,  name: 'Blake Torres',  handle: '@blaketorres',  initials: 'BT', pi: 1 },
				{ id: 'size-lg', size: 48, fontSize: 15, label: 'Large',   sizeKey: 'lg' as const,  name: 'Casey Nguyen',  handle: '@caseynguyen',  initials: 'CN', pi: 2 },
			] as row}
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em;">{row.label} — {row.size}px</div>
					<div class="user-row">
						<div
							class="avatar"
							style="width: {row.size}px; height: {row.size}px; font-size: {row.fontSize}px; background: {palette(row.pi).bg}; color: {palette(row.pi).color};"
						>
							{row.initials}
						</div>
						<div class="user-row__identity">
							<span class="user-row__name">{row.name}</span>
							<span class="user-row__handle">{row.handle}</span>
						</div>
						<button
							class="btn-pill btn-pill-sm {followStates[row.id] ? 'btn-pill-outline' : 'btn-pill-primary'}"
							onclick={() => toggle(row.id)}
						>
							{followStates[row.id] ? 'Following' : 'Follow'}
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 3. PROFILE HEADER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Profile Header</h3>
		<p class="ds-card__sub">Large avatar with edit badge, display name, handle, bio, and follower stats.</p>
		<div class="profile-header" style="max-width: 400px;">
			<!-- Avatar with edit overlay -->
			<div class="profile-header__avatar-wrap">
				<div class="avatar avatar--72" style="background: {palette(0).bg}; color: {palette(0).color}; font-size: 22px;">
					AM
				</div>
				<button class="profile-header__edit-badge" aria-label="Edit profile photo">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
					</svg>
				</button>
			</div>
			<!-- Identity -->
			<div class="profile-header__name">Alice Morgan</div>
			<div class="profile-header__handle">@alicemorgan</div>
			<p class="profile-header__bio">Design systems engineer. Building tools that help teams ship better products faster.</p>
			<!-- Stats row -->
			<div class="profile-stats-row">
				<div class="profile-stats-row__item">
					<span class="profile-stats-row__num">124</span>
					<span class="profile-stats-row__label">Posts</span>
				</div>
				<div class="profile-stats-row__divider"></div>
				<div class="profile-stats-row__item">
					<span class="profile-stats-row__num">1.3k</span>
					<span class="profile-stats-row__label">Followers</span>
				</div>
				<div class="profile-stats-row__divider"></div>
				<div class="profile-stats-row__item">
					<span class="profile-stats-row__num">238</span>
					<span class="profile-stats-row__label">Following</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 4. PROFILE HEADER WITH ACTIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Profile Header with Actions</h3>
		<p class="ds-card__sub">Profile header + Share and Follow action buttons. Follow toggles state.</p>
		<div class="profile-header" style="max-width: 400px;">
			<div class="profile-header__avatar-wrap">
				<div class="avatar avatar--72" style="background: {palette(1).bg}; color: {palette(1).color}; font-size: 22px;">
					BT
				</div>
			</div>
			<div class="profile-header__name">Blake Torres</div>
			<div class="profile-header__handle">@blaketorres</div>
			<p class="profile-header__bio">Product manager. I write about building software that people actually want to use.</p>
			<div class="profile-stats-row">
				<div class="profile-stats-row__item">
					<span class="profile-stats-row__num">89</span>
					<span class="profile-stats-row__label">Posts</span>
				</div>
				<div class="profile-stats-row__divider"></div>
				<div class="profile-stats-row__item">
					<span class="profile-stats-row__num">4.1k</span>
					<span class="profile-stats-row__label">Followers</span>
				</div>
				<div class="profile-stats-row__divider"></div>
				<div class="profile-stats-row__item">
					<span class="profile-stats-row__num">193</span>
					<span class="profile-stats-row__label">Following</span>
				</div>
			</div>
			<!-- Action buttons row -->
			<div class="profile-header__actions">
				<button class="btn-pill btn-pill-outline" style="flex: 1;">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 6px; flex-shrink: 0;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
					</svg>
					Share Profile
				</button>
				<button
					class="btn-pill {followStates['header-main'] ? 'btn-pill-outline' : 'btn-pill-primary'}"
					style="flex: 1;"
					onclick={() => toggle('header-main')}
				>
					{followStates['header-main'] ? 'Following' : '+ Follow'}
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ 5. USER CARD (VERTICAL) ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">User Card — Vertical</h3>
		<p class="ds-card__sub">Portrait card for suggested follows grids. Avatar top-center, name, handle, follow button.</p>
		<div class="ds-demo" style="gap: 12px; flex-wrap: wrap; align-items: flex-start;">
			{#each users.slice(0, 3) as user, i}
				<div class="user-card-vertical">
					<div class="avatar avatar--56" style="background: {palette(i).bg}; color: {palette(i).color}; font-size: 17px;">
						{user.initials}
					</div>
					<div class="user-card-vertical__name">{user.name}</div>
					<div class="user-card-vertical__handle">{user.handle}</div>
					<button
						class="btn-pill btn-pill-sm {followStates[user.id] ? 'btn-pill-outline' : 'btn-pill-primary'}"
						style="width: 100%;"
						onclick={() => toggle(user.id)}
					>
						{followStates[user.id] ? 'Following' : '+ Follow'}
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 6. SUGGESTED FOLLOWS STRIP ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Suggested Follows Strip</h3>
		<p class="ds-card__sub">Horizontally scrollable strip of vertical user cards. 5 cards, scroll to see all.</p>
		<div class="suggested-strip">
			{#each users as user, i}
				<div class="user-card-vertical user-card-vertical--fixed">
					<div class="avatar avatar--56" style="background: {palette(i).bg}; color: {palette(i).color}; font-size: 17px;">
						{user.initials}
					</div>
					<div class="user-card-vertical__name">{user.name}</div>
					<div class="user-card-vertical__handle">{user.handle}</div>
					<button
						class="btn-pill btn-pill-sm {followStates[user.id] ? 'btn-pill-outline' : 'btn-pill-primary'}"
						style="width: 100%;"
						onclick={() => toggle(user.id)}
					>
						{followStates[user.id] ? 'Following' : '+ Follow'}
					</button>
				</div>
			{/each}
		</div>
		<p style="font-size: 12px; color: var(--dt4); margin-top: 8px;">Scroll horizontally to see all cards →</p>
	</div>

	<!-- ═══ 7. USER LIST WITH ACTIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">User List with Actions</h3>
		<p class="ds-card__sub">Full-width list rows with avatar, identity, and right-aligned follow button. Dividers between rows.</p>
		<div style="max-width: 460px; border: 1px solid var(--dbd); border-radius: 14px; overflow: hidden;">
			{#each listUsers as user, i}
				<div class="user-list-row" class:user-list-row--bordered={i > 0}>
					<div class="avatar avatar--40" style="background: {palette(i + 5).bg}; color: {palette(i + 5).color};">
						{user.initials}
					</div>
					<div class="user-row__identity" style="flex: 1; min-width: 0;">
						<span class="user-row__name">{user.name}</span>
						<span class="user-row__handle">{user.handle}</span>
					</div>
					<div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
						<button
							class="btn-pill btn-pill-sm {followStates[user.id] ? 'btn-pill-outline' : 'btn-pill-primary'}"
							onclick={() => toggle(user.id)}
						>
							{followStates[user.id] ? 'Following' : 'Follow'}
						</button>
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--dt4); flex-shrink: 0;">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 8. PROFILE STATS BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Profile Stats Bar</h3>
		<p class="ds-card__sub">Horizontal stat blocks — Posts, Followers, Following, Apps. Numbers bold, labels muted.</p>
		<div style="max-width: 460px;">
			<div class="stats-bar">
				{#each [
					{ label: 'Posts',     value: '124'  },
					{ label: 'Followers', value: '1.3k' },
					{ label: 'Following', value: '238'  },
					{ label: 'Apps',      value: '12'   },
				] as stat, i}
					{#if i > 0}
						<div class="stats-bar__divider"></div>
					{/if}
					<div class="stats-bar__item">
						<span class="stats-bar__num">{stat.value}</span>
						<span class="stats-bar__label">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<h4 class="ds-card__h4">Variant — Bordered Card</h4>
		<div style="max-width: 460px;">
			<div class="stats-bar stats-bar--card">
				{#each [
					{ label: 'Posts',     value: '124'  },
					{ label: 'Followers', value: '1.3k' },
					{ label: 'Following', value: '238'  },
					{ label: 'Apps',      value: '12'   },
				] as stat, i}
					{#if i > 0}
						<div class="stats-bar__divider"></div>
					{/if}
					<div class="stats-bar__item">
						<span class="stats-bar__num">{stat.value}</span>
						<span class="stats-bar__label">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 9. IN CONTEXT: PROFILE PAGE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Profile Page</h3>
		<p class="ds-card__sub">Full composition: profile header with actions, tab switcher with globe/lock tabs, and app grid.</p>
		<div class="mockup-frame" style="max-width: 400px;">
			<!-- Profile header block -->
			<div class="profile-header profile-header--compact">
				<div class="profile-header__avatar-wrap">
					<div class="avatar avatar--72" style="background: {palette(2).bg}; color: {palette(2).color}; font-size: 22px;">
						CN
					</div>
				</div>
				<div class="profile-header__name">Casey Nguyen</div>
				<div class="profile-header__handle">@caseynguyen</div>
				<p class="profile-header__bio">Full-stack developer & open source contributor. I build in public.</p>
				<!-- Inline stats -->
				<div class="profile-stats-row">
					<div class="profile-stats-row__item">
						<span class="profile-stats-row__num">312</span>
						<span class="profile-stats-row__label">Posts</span>
					</div>
					<div class="profile-stats-row__divider"></div>
					<div class="profile-stats-row__item">
						<span class="profile-stats-row__num">2.8k</span>
						<span class="profile-stats-row__label">Followers</span>
					</div>
					<div class="profile-stats-row__divider"></div>
					<div class="profile-stats-row__item">
						<span class="profile-stats-row__num">411</span>
						<span class="profile-stats-row__label">Following</span>
					</div>
				</div>
				<!-- Action buttons -->
				<div class="profile-header__actions">
					<button class="btn-pill btn-pill-outline btn-pill-sm" style="flex: 1;">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 5px; flex-shrink: 0;">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
						</svg>
						Share
					</button>
					<button
						class="btn-pill btn-pill-sm {followStates['header-main'] ? 'btn-pill-outline' : 'btn-pill-primary'}"
						style="flex: 1;"
						onclick={() => toggle('header-main')}
					>
						{followStates['header-main'] ? 'Following' : '+ Follow'}
					</button>
				</div>
			</div>

			<!-- Tab switcher -->
			<div class="profile-tabs">
				<button
					class="profile-tabs__tab {profileTab === 'public' ? 'profile-tabs__tab--active' : ''}"
					onclick={() => profileTab = 'public'}
				>
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink: 0;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					Public
				</button>
				<button
					class="profile-tabs__tab {profileTab === 'private' ? 'profile-tabs__tab--active' : ''}"
					onclick={() => profileTab = 'private'}
				>
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink: 0;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
					</svg>
					Private
				</button>
			</div>

			<!-- App grid below tabs -->
			{#if profileTab === 'public'}
				<div class="app-grid">
					{#each appCards as app}
						<div class="prc-card">
							<div class="prc-card__icon">
						{#if app.icon === 'bolt'}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
							</svg>
						{:else if app.icon === 'search'}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
							</svg>
						{:else if app.icon === 'edit'}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
							</svg>
						{:else}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
							</svg>
						{/if}
					</div>
							<div class="prc-card__label">{app.label}</div>
							<div class="prc-card__desc">{app.desc}</div>
						</div>
					{/each}
				</div>
			{:else}
				<div style="padding: 24px 16px; text-align: center;">
					<div style="width: 36px; height: 36px; border-radius: 50%; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--dt3);">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
						</svg>
					</div>
					<div style="font-size: 13px; font-weight: 600; color: var(--dt2);">Private content</div>
					<div style="font-size: 12px; color: var(--dt4); margin-top: 4px;">Only visible to followers</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══ 10. IN CONTEXT: SUGGESTED FOLLOWS PAGE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Suggested Follows Page</h3>
		<p class="ds-card__sub">Back button + page title + vertical list of user rows with follow buttons and suggested reason.</p>
		<div class="mockup-frame" style="max-width: 400px;">
			<!-- Page header -->
			<div class="mockup-page-header">
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm" aria-label="Go back">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
					</svg>
				</button>
				<span class="mockup-page-header__title">Suggested follows</span>
				<div style="width: 32px;"></div>
			</div>

			<!-- Suggested user list -->
			<div style="display: flex; flex-direction: column; gap: 0;">
				{#each suggestedUsers as user, i}
					<div class="suggested-row" class:suggested-row--bordered={i > 0}>
						<div class="avatar avatar--44" style="background: {palette(i).bg}; color: {palette(i).color};">
							{user.initials}
						</div>
						<div style="flex: 1; min-width: 0;">
							<div class="user-row__name">{user.name}</div>
							<div class="user-row__handle">{user.handle}</div>
							<div class="suggested-row__reason">{user.reason}</div>
						</div>
						<button
							class="btn-pill btn-pill-sm {followStates[user.id] ? 'btn-pill-outline' : 'btn-pill-primary'}"
							onclick={() => toggle(user.id)}
						>
							{followStates[user.id] ? 'Following' : 'Follow'}
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Avatar base ──────────────────────────────────────────── */
	.avatar {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 13px;
		flex-shrink: 0;
		border: 1.5px solid var(--dbd);
		letter-spacing: 0.02em;
	}
	.avatar--40 { width: 40px; height: 40px; font-size: 13px; }
	.avatar--44 { width: 44px; height: 44px; font-size: 14px; }
	.avatar--56 { width: 56px; height: 56px; font-size: 17px; }
	.avatar--72 { width: 72px; height: 72px; font-size: 22px; border-width: 2px; }

	/* ── User Row ─────────────────────────────────────────────── */
	.user-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: var(--dbg);
	}
	.user-row--bordered {
		border-top: 1px solid var(--dbd);
	}
	.user-row__identity {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.user-row__name {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.user-row__handle {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ── User List Row ────────────────────────────────────────── */
	.user-list-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		background: var(--dbg);
	}
	.user-list-row--bordered {
		border-top: 1px solid var(--dbd);
	}

	/* ── User Card Vertical ───────────────────────────────────── */
	.user-card-vertical {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 20px 16px 16px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		min-width: 140px;
	}
	.user-card-vertical--fixed {
		flex-shrink: 0;
		width: 148px;
	}
	.user-card-vertical__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}
	.user-card-vertical__handle {
		font-size: 11px;
		color: var(--dt3);
		text-align: center;
		margin-bottom: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	/* ── Suggested Strip ──────────────────────────────────────── */
	.suggested-strip {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		padding-bottom: 8px;
		scrollbar-width: thin;
		scrollbar-color: var(--dbd) transparent;
	}
	.suggested-strip::-webkit-scrollbar {
		height: 4px;
	}
	.suggested-strip::-webkit-scrollbar-track {
		background: transparent;
	}
	.suggested-strip::-webkit-scrollbar-thumb {
		background: var(--dbd);
		border-radius: 4px;
	}

	/* ── Profile Header ───────────────────────────────────────── */
	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 24px 20px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 18px;
	}
	.profile-header--compact {
		border: none;
		border-radius: 0;
		padding: 20px 16px 0;
		background: transparent;
	}
	.profile-header__avatar-wrap {
		position: relative;
		display: inline-flex;
		margin-bottom: 6px;
	}
	.profile-header__edit-badge {
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--dbg3);
		border: 2px solid var(--dbg);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.15s;
	}
	.profile-header__edit-badge:hover {
		background: var(--dbg2);
	}
	.profile-header__name {
		font-size: 18px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.profile-header__handle {
		font-size: 13px;
		color: var(--dt3);
	}
	.profile-header__bio {
		font-size: 13px;
		color: var(--dt2);
		text-align: center;
		line-height: 1.55;
		margin: 4px 0 8px;
		max-width: 300px;
	}
	.profile-header__actions {
		display: flex;
		gap: 8px;
		width: 100%;
		margin-top: 8px;
	}

	/* ── Profile Stats Row ────────────────────────────────────── */
	.profile-stats-row {
		display: flex;
		align-items: center;
		gap: 0;
		margin-top: 4px;
	}
	.profile-stats-row__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 18px;
		gap: 2px;
	}
	.profile-stats-row__num {
		font-size: 16px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.profile-stats-row__label {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}
	.profile-stats-row__divider {
		width: 1px;
		height: 28px;
		background: var(--dbd);
		flex-shrink: 0;
	}

	/* ── Stats Bar ────────────────────────────────────────────── */
	.stats-bar {
		display: flex;
		align-items: center;
	}
	.stats-bar--card {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		padding: 4px 0;
	}
	.stats-bar__item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 12px 8px;
		gap: 3px;
	}
	.stats-bar__num {
		font-size: 20px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.02em;
	}
	.stats-bar__label {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}
	.stats-bar__divider {
		width: 1px;
		height: 32px;
		background: var(--dbd);
		flex-shrink: 0;
	}

	/* ── Profile Tabs ─────────────────────────────────────────── */
	.profile-tabs {
		display: flex;
		border-bottom: 1px solid var(--dbd);
		margin-top: 16px;
	}
	.profile-tabs__tab {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 10px 16px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		cursor: pointer;
		transition: color 0.15s, border-color 0.15s;
	}
	.profile-tabs__tab:hover {
		color: var(--dt2);
	}
	.profile-tabs__tab--active {
		color: var(--dt);
		font-weight: 600;
		border-bottom-color: var(--dt);
	}

	/* ── App Grid ─────────────────────────────────────────────── */
	.app-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		padding: 14px 16px;
	}
	.prc-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
	}
	.prc-card__icon {
		font-size: 20px;
		line-height: 1;
		margin-bottom: 2px;
	}
	.prc-card__label {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}
	.prc-card__desc {
		font-size: 11px;
		color: var(--dt3);
	}

	/* ── Mockup Frame ─────────────────────────────────────────── */
	.mockup-frame {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 18px;
		overflow: hidden;
	}
	.mockup-page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 14px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg);
	}
	.mockup-page-header__title {
		font-size: 15px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	/* ── Suggested Row ────────────────────────────────────────── */
	.suggested-row {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		background: var(--dbg);
	}
	.suggested-row--bordered {
		border-top: 1px solid var(--dbd);
	}
	.suggested-row__reason {
		font-size: 11px;
		color: var(--dt4);
		margin-top: 2px;
	}
</style>
