<script lang="ts">
	import { Separator } from '$lib/ui';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/ui/tabs';

	// ── 1. Standard Tabs ────────────────────────────────────────────
	// (Uses Bits UI Tabs component directly in markup)

	// ── 2. Icon + Label Tabs (App Builder style) ────────────────────
	let builderActive = $state('Chat');
	const builderTabs = [
		{
			label: 'Chat',
			svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
		},
		{
			label: 'General',
			svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>',
		},
		{
			label: 'Icon',
			svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
		},
		{
			label: 'Prompts',
			svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
		},
	];

	const iconGlyphs = ['◉', '✦', '◎', '❋', '◈', '⊕', '◆', '⬡', '✿', '⬟', '◑', '⊞'];

	const prompts = [
		{
			title: 'Daily Stand-up',
			body: 'Summarize my activity from the past 24 hours and format it for a team stand-up.',
		},
		{
			title: 'Code Review',
			body: 'Review this code for bugs, performance issues, and style improvements.',
		},
		{
			title: 'Meeting Notes',
			body: 'Convert this transcript into clean action items and a summary.',
		},
	];

	// ── 3. Category Pill Tabs ────────────────────────────────────────
	let categoryActive = $state('Top');
	const categoryTabs = [
		{
			label: 'Top',
			svg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>',
		},
		{
			label: 'Lifestyle',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
		},
		{
			label: 'Health & Fitness',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
		},
		{
			label: 'Mindfulness',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg>',
		},
		{
			label: 'Productivity',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
		},
		{
			label: 'Finance',
			svg: '<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
		},
	];

	// ── 4. Public/Private Toggle Tabs ────────────────────────────────
	let profileTab = $state<'public' | 'private'>('public');

	// ── 5. Bottom Navigation Tabs ────────────────────────────────────
	let bottomTab = $state<'home' | 'explore'>('home');

	// ── 6. Pill Group Tabs ───────────────────────────────────────────
	let pillActive = $state('All');
	const pillItems: Record<string, { count: number; label: string }[]> = {
		All: [
			{ count: 1, label: 'Deployed landing page to production' },
			{ count: 2, label: 'Updated onboarding flow copy' },
			{ count: 3, label: 'Fixed mobile nav regression' },
			{ count: 4, label: 'Added dark mode toggle to settings' },
			{ count: 5, label: 'Migrated Redis session store' },
		],
		Active: [
			{ count: 1, label: 'Deployed landing page to production' },
			{ count: 3, label: 'Fixed mobile nav regression' },
		],
		Archived: [
			{ count: 2, label: 'Updated onboarding flow copy' },
			{ count: 4, label: 'Added dark mode toggle to settings' },
			{ count: 5, label: 'Migrated Redis session store' },
		],
	};

	// ── 7. Tabs with Icons (Code/Preview/Changes) ────────────────────
	// (Built inline with Bits UI Tabs in markup)

	// ── 8. Sidebar Navigation Tabs (Vertical List) ─────────────────────
	let sidebarActive = $state('All');
	const sidebarTabs = [
		{
			label: 'All',
			svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>',
		},
		{
			label: 'Explore',
			svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
		},
		{
			label: 'Creation',
			svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>',
		},
		{
			label: 'Work',
			svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
		},
		{
			label: 'Game',
			svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>',
		},
		{
			label: 'Development',
			svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
		},
	];

	const sidebarContent: Record<string, { title: string; items: string[] }> = {
		All: {
			title: 'All agents',
			items: ['AI Assistant', 'Code Helper', 'Daily Planner', 'Fitness Coach', 'Finance Bot'],
		},
		Explore: {
			title: 'Explore agents',
			items: ['Trending: Research Agent', 'New: Legal Assistant', 'Popular: Chef AI'],
		},
		Creation: {
			title: 'Creative tools',
			items: ['Copywriter', 'Image Describer', 'Story Generator', 'Social Media'],
		},
		Work: {
			title: 'Work agents',
			items: ['Meeting Summarizer', 'Email Drafter', 'Spreadsheet AI', 'Project Manager'],
		},
		Game: {
			title: 'Game agents',
			items: ['DnD Game Master', 'Chess Tutor', 'Trivia Host'],
		},
		Development: {
			title: 'Dev tools',
			items: ['Code Reviewer', 'Debugger', 'SQL Assistant', 'API Designer'],
		},
	};

	// ── 9. Underline Tabs ────────────────────────────────────────────
	let underlineActive = $state('Posts');
	const underlineTabs = ['Posts', 'Replies', 'Media', 'Likes'];
	const underlineContent: Record<string, string> = {
		Posts: '128 posts — essays, threads, and short updates',
		Replies: '342 replies to other people across the network',
		Media: '47 images and videos shared publicly',
		Likes: '1,204 posts liked in the past year',
	};

	// ── 10. Badge Tabs ───────────────────────────────────────────────
	let badgeActive = $state('Inbox');
	const badgeTabs = [
		{ label: 'Inbox', count: 3 },
		{ label: 'Sent', count: 0 },
		{ label: 'Drafts', count: 12 },
		{ label: 'Spam', count: 1 },
	];

	const badgeContent: Record<string, { from: string; subject: string; time: string; unread?: boolean }[]> = {
		Inbox: [
			{ from: 'Jordan Lee', subject: 'Re: Design system review', time: '2m', unread: true },
			{ from: 'Alex Kim', subject: 'Feature request — dark mode', time: '14m', unread: true },
			{ from: 'Sam Torres', subject: 'Onboarding call notes', time: '1h', unread: true },
			{ from: 'GitHub', subject: 'PR #248 approved', time: '3h' },
		],
		Sent: [
			{ from: 'To: Jordan Lee', subject: 'Updated mockups attached', time: 'Yesterday' },
			{ from: 'To: Team', subject: 'Sprint planning recap', time: '2d' },
		],
		Drafts: [
			{ from: 'Draft', subject: 'Q1 roadmap proposal', time: 'Unsaved' },
			{ from: 'Draft', subject: 'Investor update template', time: '3d' },
		],
		Spam: [
			{ from: 'no-reply@promo.io', subject: 'You have been selected!', time: '5d' },
		],
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">Tabs</h2>
	<p class="ds-desc">
		Ten tab patterns — from Bits UI primitives and icon bars to pill filters, profile toggles,
		bottom navigation, sidebar lists, underline indicators, and badge counts.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════
	     1. STANDARD TABS
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">1. Standard Tabs</h3>
		<p class="ds-card__sub">Bits UI Tabs primitive — pill-styled triggers, full panel content</p>

		<Tabs value="overview">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>

			<TabsContent value="overview">
				<div style="padding: 20px 0; display: flex; flex-direction: column; gap: 12px;">
					<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
						{#each [['2,847', 'Active Users', '+12% this week'], ['94.2%', 'Uptime', 'Last 30 days'], ['1.2s', 'Avg Response', 'p99 latency']] as [val, label, sub]}
							<div style="padding: 16px; background: var(--dbg); border-radius: 10px; border: 1px solid var(--dbd);">
								<div style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">{val}</div>
								<div style="font-size: 12px; font-weight: 600; margin-top: 2px;">{label}</div>
								<div style="font-size: 11px; color: var(--dt3); margin-top: 2px;">{sub}</div>
							</div>
						{/each}
					</div>
					<div style="padding: 14px 16px; background: var(--dbg); border-radius: 10px; border: 1px solid var(--dbd); font-size: 13px; color: var(--dt2);">
						System is healthy. Last incident resolved 14 days ago.
					</div>
				</div>
			</TabsContent>

			<TabsContent value="activity">
				<div style="padding: 20px 0; display: flex; flex-direction: column; gap: 6px;">
					{#each [
						['Deploy v2.4.1', 'Production', '2 min ago', '#22c55e'],
						['Database migration', 'Staging', '15 min ago', '#3b82f6'],
						['Config update', 'All envs', '1 hr ago', '#f59e0b'],
						['SSL cert renewal', 'Production', '3 hrs ago', '#22c55e'],
						['Rollback v2.3.9', 'Production', 'Yesterday', '#ef4444'],
					] as [action, env, time, color]}
						<div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--dbg); border-radius: 8px; border: 1px solid var(--dbd);">
							<div style="width: 7px; height: 7px; border-radius: 50%; background: {color}; flex-shrink: 0;"></div>
							<span style="font-size: 13px; font-weight: 500; flex: 1;">{action}</span>
							<span style="font-size: 11px; color: var(--dt3); background: var(--dbg2); padding: 2px 8px; border-radius: 4px;">{env}</span>
							<span style="font-size: 12px; color: var(--dt3); min-width: 72px; text-align: right;">{time}</span>
						</div>
					{/each}
				</div>
			</TabsContent>

			<TabsContent value="settings">
				<div style="padding: 20px 0; display: flex; flex-direction: column; gap: 0;">
					{#each [
						['Email notifications', 'Receive deploy alerts via email', true],
						['Two-factor authentication', 'Require 2FA for all team members', true],
						['Audit logging', 'Log all admin actions for compliance', false],
						['Automatic rollbacks', 'Roll back failed deploys automatically', false],
					] as [label, desc, enabled], i}
						{#if i > 0}<Separator />{/if}
						<div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0;">
							<div>
								<div style="font-size: 13px; font-weight: 500;">{label}</div>
								<div style="font-size: 12px; color: var(--dt3); margin-top: 2px;">{desc}</div>
							</div>
							<button class="btn-pill btn-pill-xs {enabled ? 'btn-pill-primary' : 'btn-pill-outline'}">{enabled ? 'Enabled' : 'Disabled'}</button>
						</div>
					{/each}
				</div>
			</TabsContent>
		</Tabs>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     2. ICON + LABEL TABS — App Builder Style
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">2. Icon + Label Tabs — App Builder Style</h3>
		<p class="ds-card__sub">
			Tab bar from TheOSApp Build view — icon on left, label, active underline indicator with full
			panel content for Chat, General, Icon picker, and Prompts
		</p>

		<div class="tbs-builder">
			<div class="tbs-builder__tabs">
				{#each builderTabs as tab}
					<button
						class="tbs-builder__tab {builderActive === tab.label ? 'tbs-builder__tab--active' : ''}"
						onclick={() => (builderActive = tab.label)}
					>
						{@html tab.svg}
						{tab.label}
					</button>
				{/each}
			</div>

			<div class="tbs-builder__panel">
				{#if builderActive === 'Chat'}
					<div style="display: flex; flex-direction: column; gap: 10px;">
						{#each [
							['user', 'Can you help me rewrite my landing page headline?'],
							['ai', 'Sure! Here are three options:\n1. "Build faster, ship smarter"\n2. "The AI-native workspace"\n3. "From idea to production in minutes"'],
							['user', 'I like option 2. Can you make it punchier?'],
							['ai', '"The workspace AI actually built for you."'],
						] as [role, msg]}
							<div style="display: flex; gap: 8px; {role === 'user' ? 'flex-direction: row-reverse;' : ''}">
								<div style="width: 26px; height: 26px; border-radius: 50%; background: {role === 'user' ? 'linear-gradient(135deg, #1a1a1a, #000)' : 'var(--dbg2)'}; border: 1px solid var(--dbd); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; color: {role === 'user' ? '#fff' : 'var(--dt2)'};">
									{role === 'user' ? 'U' : 'AI'}
								</div>
								<div style="max-width: 75%; padding: 9px 12px; border-radius: {role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px'}; background: {role === 'user' ? 'linear-gradient(135deg, #1a1a1a, #000)' : 'var(--dbg)'}; color: {role === 'user' ? '#fff' : 'var(--dt)'}; font-size: 13px; line-height: 1.5; border: 1px solid {role === 'user' ? 'transparent' : 'var(--dbd)'}; white-space: pre-line;">
									{msg}
								</div>
							</div>
						{/each}
					</div>

				{:else if builderActive === 'General'}
					<div style="display: flex; flex-direction: column; gap: 14px;">
						{#each [['App Name', 'MIOSA'], ['Tagline', 'The AI-native workspace'], ['Category', 'Productivity'], ['Version', '2.4.1']] as [label, val]}
							<div>
								<div style="font-size: 12px; font-weight: 500; color: var(--dt3); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.04em;">{label}</div>
								<div style="padding: 9px 12px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; font-size: 13px;">{val}</div>
							</div>
						{/each}
						<div>
							<div style="font-size: 12px; font-weight: 500; color: var(--dt3); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.04em;">Description</div>
							<div style="padding: 9px 12px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; font-size: 13px; line-height: 1.5; color: var(--dt2);">A fully autonomous workspace where AI agents handle planning, coding, and deployment end-to-end.</div>
						</div>
					</div>

				{:else if builderActive === 'Icon'}
					<div>
						<div style="font-size: 12px; font-weight: 500; color: var(--dt3); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.04em;">Choose an icon</div>
						<div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;">
							{#each iconGlyphs as glyph, i}
								<div style="aspect-ratio: 1; background: {i === 0 ? 'linear-gradient(135deg, #1a1a1a, #000)' : 'var(--dbg)'}; border: 2px solid {i === 0 ? 'var(--dt)' : 'var(--dbd)'}; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; color: {i === 0 ? '#fff' : 'var(--dt)'}; transition: all 0.12s;">
									{glyph}
								</div>
							{/each}
						</div>
						<div style="margin-top: 12px; font-size: 12px; color: var(--dt3);">Current: <strong style="color: var(--dt);">◉</strong> — tap to change</div>
					</div>

				{:else if builderActive === 'Prompts'}
					<div style="display: flex; flex-direction: column; gap: 10px;">
						<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
							<span style="font-size: 12px; font-weight: 500; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.04em;">System Prompts</span>
							<button class="btn-pill btn-pill-xs btn-pill-outline">+ Add</button>
						</div>
						{#each prompts as prompt}
							<div style="padding: 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 10px; display: flex; flex-direction: column; gap: 6px;">
								<div style="display: flex; align-items: center; justify-content: space-between;">
									<span style="font-size: 13px; font-weight: 600;">{prompt.title}</span>
									<button class="btn-pill btn-pill-xs btn-pill-ghost">Edit</button>
								</div>
								<p style="font-size: 12px; color: var(--dt3); line-height: 1.5; margin: 0;">{prompt.body}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     3. CATEGORY PILL TABS — Scrollable filter row
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">3. Category Pill Tabs — Scrollable Filter Row</h3>
		<p class="ds-card__sub">
			From TheOSApp Popular section — active pill is dark/filled, inactive pills are outlined.
			Icons lead each label. Horizontally scrollable on overflow.
		</p>

		<div class="tbs-pill-scroll">
			{#each categoryTabs as cat}
				<button
					class="tbs-cat-pill {categoryActive === cat.label ? 'tbs-cat-pill--active' : ''}"
					onclick={() => (categoryActive = cat.label)}
				>
					{@html cat.svg}
					{cat.label}
				</button>
			{/each}
		</div>

		<div style="margin-top: 16px; padding: 14px 16px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 10px; font-size: 13px; color: var(--dt2);">
			{#if categoryActive === 'Top'}
				Top apps of the week ranked by downloads and ratings
			{:else}
				Browsing <strong style="color: var(--dt);">{categoryActive}</strong> — curated picks for you
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     4. PUBLIC / PRIVATE TOGGLE TABS — Profile segmented control
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">4. Public / Private Toggle Tabs</h3>
		<p class="ds-card__sub">
			From TheOSApp Profile view — two-tab segmented control with globe and lock icons,
			underline-style active indicator
		</p>

		<div class="tbs-toggle">
			<button
				class="tbs-toggle__tab {profileTab === 'public' ? 'tbs-toggle__tab--active' : ''}"
				onclick={() => (profileTab = 'public')}
			>
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				Public
			</button>
			<button
				class="tbs-toggle__tab {profileTab === 'private' ? 'tbs-toggle__tab--active' : ''}"
				onclick={() => (profileTab = 'private')}
			>
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
				</svg>
				Private
			</button>
		</div>

		<div style="padding: 20px 0;">
			{#if profileTab === 'public'}
				<div style="display: flex; flex-direction: column; gap: 10px;">
					<div style="font-size: 13px; color: var(--dt3); margin-bottom: 4px;">Visible to everyone</div>
					{#each ['Building in public since 2021', 'The future of AI tooling', 'Weekend project: new CLI tool'] as post}
						<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 9px;">
							<div style="width: 6px; height: 6px; border-radius: 50%; background: #22c55e; margin-top: 5px; flex-shrink: 0;"></div>
							<span style="font-size: 13px;">{post}</span>
							<span style="margin-left: auto; font-size: 11px; color: var(--dt3); white-space: nowrap;">Public</span>
						</div>
					{/each}
				</div>
			{:else}
				<div style="display: flex; flex-direction: column; gap: 10px;">
					<div style="font-size: 13px; color: var(--dt3); margin-bottom: 4px;">Only visible to you</div>
					{#each ['Draft: Annual performance review', 'Personal journal — Jan 2025', 'Financial goals spreadsheet notes'] as post}
						<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 9px;">
							<div style="width: 6px; height: 6px; border-radius: 50%; background: var(--dt3); margin-top: 5px; flex-shrink: 0;"></div>
							<span style="font-size: 13px; color: var(--dt2);">{post}</span>
							<span style="margin-left: auto; font-size: 11px; color: var(--dt3); white-space: nowrap; padding: 1px 7px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 4px;">Private</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     5. BOTTOM NAVIGATION TABS — Home / Explore
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">5. Bottom Navigation Tabs</h3>
		<p class="ds-card__sub">
			From TheOSApp — Home and Explore as primary tabs with active filled state, plus action
			button on the side. Mobile bottom-bar layout.
		</p>

		<div class="tbs-bottom-demo">
			<!-- Content area -->
			<div class="tbs-bottom-content">
				{#if bottomTab === 'home'}
					<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
						<div style="font-size: 14px; font-weight: 600;">Good morning</div>
						<div style="font-size: 13px; color: var(--dt3);">Here's what's happening today</div>
						{#each [['AI Assistant', 'Ready for your daily briefing', '#3b82f6'], ['Code Helper', 'PR #248 needs review', '#22c55e'], ['Daily Planner', '3 tasks due today', '#f59e0b']] as [name, status, color]}
							<div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 9px;">
								<div style="width: 30px; height: 30px; border-radius: 8px; background: {color}20; border: 1px solid {color}40; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">
									{name[0]}
								</div>
								<div>
									<div style="font-size: 13px; font-weight: 500;">{name}</div>
									<div style="font-size: 12px; color: var(--dt3);">{status}</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
						<div style="font-size: 14px; font-weight: 600;">Explore</div>
						<div style="font-size: 13px; color: var(--dt3);">Discover new agents and tools</div>
						<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
							{#each [['Research AI', 'Find answers fast', '#8b5cf6'], ['Legal Bot', 'Contract drafting', '#06b6d4'], ['Chef AI', 'Recipes & meal plans', '#f97316'], ['Study Buddy', 'Learn anything', '#ec4899']] as [name, desc, color]}
								<div style="padding: 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 9px;">
									<div style="width: 28px; height: 28px; border-radius: 7px; background: {color}20; border: 1px solid {color}40; display: flex; align-items: center; justify-content: center; font-size: 13px; margin-bottom: 8px;">
										{name[0]}
									</div>
									<div style="font-size: 12px; font-weight: 600;">{name}</div>
									<div style="font-size: 11px; color: var(--dt3); margin-top: 2px;">{desc}</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Bottom bar -->
			<div class="tbs-bottom-bar">
				<button
					class="tbs-bottom-tab {bottomTab === 'home' ? 'tbs-bottom-tab--active' : ''}"
					onclick={() => (bottomTab = 'home')}
				>
					<svg width="18" height="18" fill={bottomTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
					</svg>
					<span>Home</span>
				</button>

				<button class="tbs-bottom-plus" aria-label="Create new">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
					</svg>
				</button>

				<button
					class="tbs-bottom-tab {bottomTab === 'explore' ? 'tbs-bottom-tab--active' : ''}"
					onclick={() => (bottomTab = 'explore')}
				>
					<svg width="18" height="18" fill={bottomTab === 'explore' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					<span>Explore</span>
				</button>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     6. PILL BUTTON GROUP AS TABS
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">6. Pill Button Group as Tabs</h3>
		<p class="ds-card__sub">
			Using <code>.btn-pill-group</code> as tab controls with reactive content below — All / Active
			/ Archived with item counts
		</p>

		<div class="btn-pill-group" style="margin-bottom: 16px;">
			{#each ['All', 'Active', 'Archived'] as tab}
				<button
					class="btn-pill btn-pill-sm {pillActive === tab ? 'btn-pill-primary' : 'btn-pill-ghost'}"
					onclick={() => (pillActive = tab)}
				>
					{tab}
					<span style="margin-left: 5px; font-size: 11px; opacity: 0.7;">({pillItems[tab].length})</span>
				</button>
			{/each}
		</div>

		<div style="display: flex; flex-direction: column; gap: 6px;">
			{#each pillItems[pillActive] as item (item.count)}
				<div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--dbg); border-radius: 8px; border: 1px solid var(--dbd);">
					<span style="width: 20px; height: 20px; border-radius: 5px; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: var(--dt3); flex-shrink: 0;">{item.count}</span>
					<span style="font-size: 13px; flex: 1;">{item.label}</span>
					<span style="font-size: 11px; color: var(--dt3); padding: 2px 8px; background: var(--dbg2); border-radius: 4px; border: 1px solid var(--dbd);">{pillActive === 'Active' ? 'in progress' : pillActive === 'Archived' ? 'done' : 'open'}</span>
				</div>
			{/each}
		</div>

		<div style="margin-top: 10px; font-size: 12px; color: var(--dt3);">
			Showing <strong style="color: var(--dt2);">{pillItems[pillActive].length} items</strong> in
			<strong style="color: var(--dt2);">{pillActive}</strong>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     7. TABS WITH SVG ICONS — Code / Preview / Changes
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">7. Tabs with Icons — Code / Preview / Changes</h3>
		<p class="ds-card__sub">
			Bits UI Tabs with SVG icons inline in each trigger — developer tool style
		</p>

		<Tabs value="code">
			<TabsList>
				<TabsTrigger value="code">
					<span style="display: flex; align-items: center; gap: 6px;">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
						Code
					</span>
				</TabsTrigger>
				<TabsTrigger value="preview">
					<span style="display: flex; align-items: center; gap: 6px;">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
						Preview
					</span>
				</TabsTrigger>
				<TabsTrigger value="changes">
					<span style="display: flex; align-items: center; gap: 6px;">
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
						Changes
					</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="code">
				<div style="padding: 16px 0;">
					<div class="tbs-code-block">
						<span class="tbs-code-kw">function</span> <span class="tbs-code-fn">greet</span>(<span class="tbs-code-param">name</span>: <span class="tbs-code-type">string</span>) &#123;<br/>
						&nbsp;&nbsp;<span class="tbs-code-kw">return</span> <span class="tbs-code-str">`Hello, $&#123;name&#125;!`</span>;<br/>
						&#125;
					</div>
				</div>
			</TabsContent>

			<TabsContent value="preview">
				<div style="padding: 24px 0; text-align: center;">
					<div style="display: inline-block; padding: 16px 32px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 12px; font-size: 15px;">
						Hello, World!
					</div>
				</div>
			</TabsContent>

			<TabsContent value="changes">
				<div style="padding: 16px 0; display: flex; flex-direction: column; gap: 4px;">
					{#each [
						['+', 'function greet(name: string) {', '#22c55e', '#14532d15'],
						['+', '  return `Hello, ${name}!`;', '#22c55e', '#14532d15'],
						['+', '}', '#22c55e', '#14532d15'],
						['-', 'const greet = (n) => "Hi " + n', '#ef4444', '#7f1d1d15'],
					] as [op, line, color, bg]}
						<div style="display: flex; gap: 8px; padding: 4px 10px; border-radius: 4px; background: {bg}; font-family: monospace; font-size: 12px;">
							<span style="color: {color}; font-weight: 700; min-width: 12px;">{op}</span>
							<span style="color: var(--dt2);">{line}</span>
						</div>
					{/each}
				</div>
			</TabsContent>
		</Tabs>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     8. SIDEBAR NAVIGATION TABS — Vertical list
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">8. Sidebar Navigation Tabs — Vertical List</h3>
		<p class="ds-card__sub">
			Vertical tab list — icons + labels, active item has blue/accent background
			highlight. Left sidebar with content panel to the right.
		</p>

		<div class="tbs-sidebar-layout">
			<!-- Left nav -->
			<div class="tbs-sidebar-nav">
				{#each sidebarTabs as tab}
					<button
						class="tbs-sidebar-item {sidebarActive === tab.label ? 'tbs-sidebar-item--active' : ''}"
						onclick={() => (sidebarActive = tab.label)}
					>
						{@html tab.svg}
						<span>{tab.label}</span>
					</button>
				{/each}
			</div>

			<!-- Right content -->
			<div class="tbs-sidebar-content">
				<div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--dt);">
					{sidebarContent[sidebarActive].title}
				</div>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					{#each sidebarContent[sidebarActive].items as item}
						<div style="display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 8px; font-size: 13px; cursor: pointer; transition: border-color 0.12s;">
							<div style="width: 7px; height: 7px; border-radius: 50%; background: #3b82f6; flex-shrink: 0;"></div>
							{item}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     9. UNDERLINE TABS — Clean minimal profile style
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">9. Underline Tabs — Clean Minimal</h3>
		<p class="ds-card__sub">
			No background on triggers — active has a bottom border accent. Content-focused, minimal
			profile or thread view style.
		</p>

		<div class="tbs-underline">
			{#each underlineTabs as tab}
				<button
					class="tbs-underline__tab {underlineActive === tab ? 'tbs-underline__tab--active' : ''}"
					onclick={() => (underlineActive = tab)}
				>
					{tab}
				</button>
			{/each}
		</div>

		<div style="padding: 20px 0; font-size: 13px; color: var(--dt2); display: flex; flex-direction: column; gap: 12px;">
			<p style="margin: 0;">{underlineContent[underlineActive]}</p>
			<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
				{#if underlineActive === 'Posts'}
					{#each ['Building in public', 'The future of AI tooling', 'Weekend project: new CLI'] as post}
						<div style="padding: 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 8px; font-size: 12px; font-weight: 500;">
							{post}
						</div>
					{/each}
				{:else if underlineActive === 'Media'}
					{#each [1, 2, 3] as _}
						<div style="aspect-ratio: 1; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 8px;"></div>
					{/each}
				{:else}
					<div style="grid-column: 1 / -1; padding: 24px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 8px; text-align: center; color: var(--dt3); font-size: 13px;">
						No {underlineActive.toLowerCase()} to show yet
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════
	     10. BADGE TABS — Notification counts
	════════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">10. Badge Tabs — Notification Counts</h3>
		<p class="ds-card__sub">
			Tabs with inline badge counts — Inbox, Sent, Drafts, Spam. Badges only render when
			count is greater than zero.
		</p>

		<div class="tbs-badge-list">
			{#each badgeTabs as tab}
				<button
					class="tbs-badge-tab {badgeActive === tab.label ? 'tbs-badge-tab--active' : ''}"
					onclick={() => (badgeActive = tab.label)}
				>
					{tab.label}
					{#if tab.count > 0}
						<span class="tbs-badge {badgeActive === tab.label ? 'tbs-badge--active' : ''}">{tab.count}</span>
					{/if}
				</button>
			{/each}
		</div>

		<div style="display: flex; flex-direction: column; gap: 0; margin-top: 0;">
			{#each badgeContent[badgeActive] as msg, i}
				{#if i > 0}<Separator />{/if}
				<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 0;">
					{#if msg.unread}
						<div style="width: 7px; height: 7px; border-radius: 50%; background: #3b82f6; flex-shrink: 0; margin-top: 5px;"></div>
					{:else}
						<div style="width: 7px; height: 7px; flex-shrink: 0;"></div>
					{/if}
					<div style="flex: 1; min-width: 0;">
						<div style="font-size: 13px; font-weight: {msg.unread ? '600' : '400'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
							{msg.from}
						</div>
						<div style="font-size: 12px; color: var(--dt3); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
							{msg.subject}
						</div>
					</div>
					<span style="font-size: 11px; color: var(--dt3); flex-shrink: 0; padding-top: 1px;">{msg.time}</span>
				</div>
			{/each}
		</div>

		{#if badgeContent[badgeActive].length === 0}
			<div style="padding: 32px; text-align: center; color: var(--dt3); font-size: 13px;">
				{badgeActive} is empty
			</div>
		{/if}
	</div>
</section>

<style>
	/* ── 2. App Builder Tabs ─────────────────────────────────────── */
	.tbs-builder {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
	}

	.tbs-builder__tabs {
		display: flex;
		gap: 0;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tbs-builder__tabs::-webkit-scrollbar {
		display: none;
	}

	.tbs-builder__tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 16px;
		border: none;
		border-bottom: 2px solid transparent;
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		white-space: nowrap;
		transition: all 0.13s;
		margin-bottom: -1px;
	}

	.tbs-builder__tab:hover {
		color: var(--dt2);
	}

	.tbs-builder__tab--active {
		color: var(--dt);
		font-weight: 600;
		border-bottom-color: var(--dt);
	}

	.tbs-builder__panel {
		padding: 20px;
		min-height: 220px;
	}

	/* ── 3. Category Pill Tabs ───────────────────────────────────── */
	.tbs-pill-scroll {
		display: flex;
		gap: 7px;
		overflow-x: auto;
		scrollbar-width: none;
		padding-bottom: 2px;
	}

	.tbs-pill-scroll::-webkit-scrollbar {
		display: none;
	}

	.tbs-cat-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 9999px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s;
		border: 1px solid var(--dbd);
		background: transparent;
		color: var(--dt2);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.tbs-cat-pill:hover {
		border-color: var(--dt3);
		color: var(--dt);
	}

	.tbs-cat-pill--active {
		background: linear-gradient(180deg, #1a1a1a 0%, #000 100%);
		color: #fff;
		border-color: transparent;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	/* ── 4. Public/Private Toggle ────────────────────────────────── */
	.tbs-toggle {
		display: flex;
		border-bottom: 1px solid var(--dbd);
	}

	.tbs-toggle__tab {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 10px 20px;
		border: none;
		border-bottom: 2px solid transparent;
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		margin-bottom: -1px;
		transition: all 0.15s;
	}

	.tbs-toggle__tab:hover {
		color: var(--dt2);
	}

	.tbs-toggle__tab--active {
		color: var(--dt);
		font-weight: 600;
		border-bottom-color: var(--dt);
	}

	/* ── 5. Bottom Navigation Tabs ───────────────────────────────── */
	.tbs-bottom-demo {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
		max-width: 380px;
		margin: 0 auto;
	}

	.tbs-bottom-content {
		min-height: 260px;
		overflow-y: auto;
	}

	.tbs-bottom-bar {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 10px 16px 14px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg2);
		gap: 8px;
	}

	.tbs-bottom-tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
		padding: 6px 20px;
		border: none;
		background: transparent;
		cursor: pointer;
		color: var(--dt3);
		font-size: 11px;
		font-weight: 500;
		border-radius: 10px;
		transition: all 0.13s;
	}

	.tbs-bottom-tab:hover {
		color: var(--dt2);
	}

	.tbs-bottom-tab--active {
		color: var(--dt);
	}

	.tbs-bottom-plus {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: linear-gradient(135deg, #1a1a1a, #000);
		color: #fff;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
		transition: transform 0.13s;
	}

	.tbs-bottom-plus:hover {
		transform: scale(1.07);
	}

	/* ── 7. Code block ───────────────────────────────────────────── */
	.tbs-code-block {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 9px;
		padding: 14px 16px;
		font-family: 'Fira Code', 'JetBrains Mono', monospace;
		font-size: 13px;
		line-height: 1.7;
		color: var(--dt2);
	}

	.tbs-code-kw {
		color: #c084fc;
	}

	.tbs-code-fn {
		color: #60a5fa;
	}

	.tbs-code-param {
		color: #f9a8d4;
	}

	.tbs-code-type {
		color: #34d399;
	}

	.tbs-code-str {
		color: #fbbf24;
	}

	/* ── 8. Sidebar Navigation ───────────────────────────────────── */
	.tbs-sidebar-layout {
		display: flex;
		gap: 0;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 13px;
		overflow: hidden;
		min-height: 280px;
	}

	.tbs-sidebar-nav {
		width: 160px;
		flex-shrink: 0;
		border-right: 1px solid var(--dbd);
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		background: var(--dbg2);
	}

	.tbs-sidebar-item {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 9px 11px;
		border-radius: 9px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		width: 100%;
		text-align: left;
		transition: all 0.12s;
	}

	.tbs-sidebar-item:hover {
		background: var(--dbg);
		color: var(--dt);
	}

	.tbs-sidebar-item--active {
		background: #3b82f620;
		color: #3b82f6;
		border: 1px solid #3b82f630;
	}

	.tbs-sidebar-item--active :global(svg) {
		stroke: #3b82f6;
	}

	.tbs-sidebar-content {
		flex: 1;
		padding: 18px;
	}

	/* ── 9. Underline Tabs ───────────────────────────────────────── */
	.tbs-underline {
		display: flex;
		border-bottom: 1px solid var(--dbd);
	}

	.tbs-underline__tab {
		padding: 10px 20px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		border: none;
		background: transparent;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition: all 0.15s;
	}

	.tbs-underline__tab:hover {
		color: var(--dt2);
	}

	.tbs-underline__tab--active {
		color: var(--dt);
		font-weight: 600;
		border-bottom-color: var(--dt);
	}

	/* ── 10. Badge Tabs ──────────────────────────────────────────── */
	.tbs-badge-list {
		display: flex;
		border-bottom: 1px solid var(--dbd);
		margin-bottom: 0;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.tbs-badge-list::-webkit-scrollbar {
		display: none;
	}

	.tbs-badge-tab {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 10px 18px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		border: none;
		background: transparent;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition: all 0.15s;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.tbs-badge-tab:hover {
		color: var(--dt2);
	}

	.tbs-badge-tab--active {
		color: var(--dt);
		font-weight: 600;
		border-bottom-color: var(--dt);
	}

	.tbs-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		background: var(--dbg2);
		color: var(--dt3);
		border: 1px solid var(--dbd);
		line-height: 1;
	}

	.tbs-badge--active {
		background: linear-gradient(135deg, #1a1a1a, #000);
		color: #fff;
		border-color: transparent;
	}
</style>
