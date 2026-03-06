<script lang="ts">
	// ── Comment thread state ───────────────────────────────────
	type Comment = {
		id: string;
		initials: string;
		name: string;
		handle: string;
		time: string;
		body: string;
		likes: number;
		liked: boolean;
		pi: number;
		replies?: Comment[];
	};

	let comments = $state<Comment[]>([
		{
			id: 'c1',
			initials: 'AM',
			name: 'Alice Morgan',
			handle: '@alicemorgan',
			time: '2h ago',
			body: 'This is a great pattern! The nesting structure makes it really easy to follow the conversation thread at a glance.',
			likes: 14,
			liked: false,
			pi: 0,
			replies: [
				{
					id: 'c1r1',
					initials: 'BT',
					name: 'Blake Torres',
					handle: '@blaketorres',
					time: '1h ago',
					body: 'Agreed — especially useful for design review threads. We use this on our internal tool.',
					likes: 5,
					liked: false,
					pi: 1,
				},
				{
					id: 'c1r2',
					initials: 'CN',
					name: 'Casey Nguyen',
					handle: '@caseynguyen',
					time: '45m ago',
					body: 'Could also work nicely with a collapse toggle to hide deep threads.',
					likes: 3,
					liked: false,
					pi: 2,
				},
			],
		},
		{
			id: 'c2',
			initials: 'DO',
			name: 'Dana Okafor',
			handle: '@danaokafor',
			time: '55m ago',
			body: 'One thing to watch: deep nesting beyond 2–3 levels can get hard to scan. Flattening with @mention references tends to work better past that.',
			likes: 9,
			liked: false,
			pi: 3,
		},
	]);

	function toggleCommentLike(commentId: string, parentId?: string) {
		if (parentId) {
			const parent = comments.find((c) => c.id === parentId);
			if (!parent?.replies) return;
			const reply = parent.replies.find((r) => r.id === commentId);
			if (!reply) return;
			reply.liked = !reply.liked;
			reply.likes += reply.liked ? 1 : -1;
		} else {
			const comment = comments.find((c) => c.id === commentId);
			if (!comment) return;
			comment.liked = !comment.liked;
			comment.likes += comment.liked ? 1 : -1;
		}
	}

	// ── Reaction bar state ─────────────────────────────────────
	type Reaction = { emoji: string; label: string; count: number; reacted: boolean };

	let reactions = $state<Reaction[]>([
		{ emoji: '👍', label: 'thumbs up',  count: 42, reacted: false },
		{ emoji: '❤️', label: 'heart',      count: 28, reacted: false },
		{ emoji: '🔥', label: 'fire',       count: 17, reacted: false },
		{ emoji: '🚀', label: 'rocket',     count: 11, reacted: false },
		{ emoji: '😮', label: 'wow',        count: 6,  reacted: false },
		{ emoji: '🎉', label: 'celebrate',  count: 4,  reacted: false },
	]);

	function toggleReaction(index: number) {
		const r = reactions[index];
		r.reacted = !r.reacted;
		r.count += r.reacted ? 1 : -1;
	}

	// ── Activity feed ──────────────────────────────────────────
	type ActivityType = 'post' | 'branch' | 'issue' | 'like' | 'merge';

	const activities: Array<{
		initials: string;
		name: string;
		action: string;
		target: string;
		targetType: ActivityType;
		time: string;
		pi: number;
	}> = [
		{ initials: 'AM', name: 'Alice Morgan',  action: 'commented on', target: 'Design review thread',           targetType: 'post',   time: '2m ago',  pi: 0 },
		{ initials: 'BT', name: 'Blake Torres',  action: 'pushed to',    target: 'feature/social-components',      targetType: 'branch', time: '18m ago', pi: 1 },
		{ initials: 'CN', name: 'Casey Nguyen',  action: 'created',      target: 'Issue #112 — Reaction bar a11y', targetType: 'issue',  time: '34m ago', pi: 2 },
		{ initials: 'DO', name: 'Dana Okafor',   action: 'liked',        target: 'your post',                      targetType: 'like',   time: '1h ago',  pi: 3 },
		{ initials: 'EZ', name: 'Elliot Zhang',  action: 'merged',       target: 'PR #47 — Timeline section',      targetType: 'merge',  time: '2h ago',  pi: 4 },
	];

	function activityIconPath(type: ActivityType): string {
		const paths: Record<ActivityType, string> = {
			post:   'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
			branch: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
			issue:  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
			like:   'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
			merge:  'M13 10V3L4 14h7v7l9-11h-7z',
		};
		return paths[type];
	}

	// ── Share card state ───────────────────────────────────────
	let copyLabel = $state('Copy link');
	let shareCount = $state(38);

	function handleCopyLink() {
		shareCount += 1;
		copyLabel = 'Copied!';
		setTimeout(() => { copyLabel = 'Copy link'; }, 2000);
	}

	// ── Like / upvote button ───────────────────────────────────
	let likeCount = $state(127);
	let liked = $state(false);
	let likeAnimating = $state(false);

	let upvoteCount = $state(84);
	let upvoted = $state(false);

	function handleLike() {
		likeAnimating = true;
		liked = !liked;
		likeCount += liked ? 1 : -1;
		setTimeout(() => { likeAnimating = false; }, 300);
	}

	function handleUpvote() {
		upvoted = !upvoted;
		upvoteCount += upvoted ? 1 : -1;
	}

	// ── Notifications state ────────────────────────────────────
	type NotifType = 'mention' | 'like' | 'follow' | 'comment' | 'system';

	type Notification = {
		id: string;
		type: NotifType;
		message: string;
		detail: string;
		time: string;
		read: boolean;
	};

	let notifications = $state<Notification[]>([
		{ id: 'n1', type: 'mention', message: 'Alice Morgan mentioned you',          detail: '"...great work by @you on the timeline section"',          time: '3m ago',  read: false },
		{ id: 'n2', type: 'like',    message: 'Blake Torres liked your post',        detail: '"Design system component deep-dive"',                     time: '12m ago', read: false },
		{ id: 'n3', type: 'follow',  message: 'Casey Nguyen started following you',  detail: 'You now have 312 followers',                             time: '1h ago',  read: false },
		{ id: 'n4', type: 'comment', message: 'Dana Okafor replied to your comment', detail: '"Totally agree — the flatten-with-mention approach scales better"', time: '2h ago',  read: true  },
		{ id: 'n5', type: 'system',  message: 'Your post reached 1,000 views',       detail: '"Svelte 5 runes in production" · milestone',              time: '5h ago',  read: true  },
	]);

	let unreadCount = $derived(notifications.filter((n) => !n.read).length);

	function markRead(id: string) {
		const n = notifications.find((n) => n.id === id);
		if (n) n.read = true;
	}

	function markAllRead() {
		notifications.forEach((n) => (n.read = true));
	}

	function notifIconPath(type: NotifType): string {
		const paths: Record<NotifType, string> = {
			mention: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
			like:    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
			follow:  'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
			comment: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
			system:  'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		};
		return paths[type];
	}

	function notifIconColor(type: NotifType): string {
		const colors: Record<NotifType, string> = {
			mention: '#818cf8',
			like:    '#f472b6',
			follow:  '#34d399',
			comment: '#38bdf8',
			system:  '#fb923c',
		};
		return colors[type];
	}

	// ── Avatar palette helpers ─────────────────────────────────
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

	// ── User mentions demo data ────────────────────────────────
	type MentionPart =
		| { type: 'text'; value: string }
		| { type: 'mention'; initials: string; name: string; pi: number };

	const mentionParagraph: MentionPart[] = [
		{ type: 'text',    value: 'Hey '                                         },
		{ type: 'mention', initials: 'AM', name: 'Alice Morgan',  pi: 0          },
		{ type: 'text',    value: ' — can you loop in '                           },
		{ type: 'mention', initials: 'BT', name: 'Blake Torres',  pi: 1          },
		{ type: 'text',    value: ' and '                                         },
		{ type: 'mention', initials: 'CN', name: 'Casey Nguyen',  pi: 2          },
		{ type: 'text',    value: ' on the design review? '                       },
		{ type: 'mention', initials: 'DO', name: 'Dana Okafor',   pi: 3          },
		{ type: 'text',    value: ' already commented earlier.'                   },
	];

	const standaloneMentions = [
		{ initials: 'AM', name: 'Alice Morgan',  handle: '@alicemorgan',  pi: 0 },
		{ initials: 'BT', name: 'Blake Torres',  handle: '@blaketorres',  pi: 1 },
		{ initials: 'CN', name: 'Casey Nguyen',  handle: '@caseynguyen',  pi: 2 },
		{ initials: 'DO', name: 'Dana Okafor',   handle: '@danaokafor',   pi: 3 },
	];
</script>

<section class="ds-section">
	<h2 class="ds-title">Social Components</h2>
	<p class="ds-desc">
		Community and social UI patterns: comment threads, reactions, activity feeds, sharing,
		like buttons, @mention chips, and notification items. All interactive elements use
		Svelte 5 runes for live state.
	</p>

	<!-- ═══ 1. COMMENT THREAD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Comment Thread</h3>
		<p class="ds-card__sub">2-level nesting — avatar, username, timestamp, body, reply and like actions. Click the heart to toggle likes.</p>
		<div class="comment-thread" style="max-width: 560px;">
			{#each comments as comment}
				<div class="comment">
					<div
						class="soc-avatar soc-avatar--36"
						style="background: {palette(comment.pi).bg}; color: {palette(comment.pi).color};"
						aria-hidden="true"
					>
						{comment.initials}
					</div>
					<div class="comment__body">
						<div class="comment__meta">
							<span class="comment__name">{comment.name}</span>
							<span class="comment__handle">{comment.handle}</span>
							<span class="comment__dot" aria-hidden="true">·</span>
							<time class="comment__time">{comment.time}</time>
						</div>
						<p class="comment__text">{comment.body}</p>
						<div class="comment__actions">
							<button
								class="btn-compact btn-compact-ghost"
								class:comment__action-btn--liked={comment.liked}
								onclick={() => toggleCommentLike(comment.id)}
								aria-label="{comment.liked ? 'Unlike' : 'Like'} comment by {comment.name}"
								aria-pressed={comment.liked}
							>
								<svg width="13" height="13" viewBox="0 0 24 24" fill={comment.liked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
								</svg>
								<span>{comment.likes}</span>
							</button>
							<button class="btn-compact btn-compact-ghost" aria-label="Reply to {comment.name}">
								<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
								</svg>
								<span>Reply</span>
							</button>
						</div>

						{#if comment.replies && comment.replies.length > 0}
							<div class="comment-replies">
								{#each comment.replies as reply, ri}
									<div
										class="comment comment--reply"
										class:comment--reply-last={ri === (comment.replies?.length ?? 0) - 1}
									>
										<div
											class="soc-avatar soc-avatar--28"
											style="background: {palette(reply.pi).bg}; color: {palette(reply.pi).color};"
											aria-hidden="true"
										>
											{reply.initials}
										</div>
										<div class="comment__body">
											<div class="comment__meta">
												<span class="comment__name">{reply.name}</span>
												<span class="comment__handle">{reply.handle}</span>
												<span class="comment__dot" aria-hidden="true">·</span>
												<time class="comment__time">{reply.time}</time>
											</div>
											<p class="comment__text">{reply.body}</p>
											<div class="comment__actions">
												<button
													class="btn-compact btn-compact-ghost"
													class:comment__action-btn--liked={reply.liked}
													onclick={() => toggleCommentLike(reply.id, comment.id)}
													aria-label="{reply.liked ? 'Unlike' : 'Like'} reply by {reply.name}"
													aria-pressed={reply.liked}
												>
													<svg width="12" height="12" viewBox="0 0 24 24" fill={reply.liked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
														<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
													</svg>
													<span>{reply.likes}</span>
												</button>
												<button class="btn-compact btn-compact-ghost" aria-label="Reply to {reply.name}">
													<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
														<path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
													</svg>
													<span>Reply</span>
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 2. REACTION BAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Reaction Bar</h3>
		<p class="ds-card__sub">Emoji reactions with counts. Click any to toggle your reaction. "+" opens the picker.</p>
		<div style="max-width: 560px;">
			<div class="reaction-bar" role="group" aria-label="Reactions">
				{#each reactions as reaction, i}
					<button
						class="reaction-chip"
						class:reaction-chip--active={reaction.reacted}
						onclick={() => toggleReaction(i)}
						aria-label="{reaction.reacted ? 'Remove' : 'Add'} {reaction.label} reaction. Currently {reaction.count}."
						aria-pressed={reaction.reacted}
					>
						<span class="reaction-chip__emoji" aria-hidden="true">{reaction.emoji}</span>
						<span class="reaction-chip__count">{reaction.count}</span>
					</button>
				{/each}
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Add a reaction">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 4v16m8-8H4"/>
					</svg>
				</button>
			</div>
			<p style="margin-top: 10px; font-size: 12px; color: var(--dt3);">
				{reactions.filter((r) => r.reacted).length} reaction{reactions.filter((r) => r.reacted).length !== 1 ? 's' : ''} from you ·
				{reactions.reduce((sum, r) => sum + r.count, 0)} total
			</p>
		</div>
	</div>

	<!-- ═══ 3. ACTIVITY FEED ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Activity Feed</h3>
		<p class="ds-card__sub">Timeline of social and repository events with actor avatars, action type icons, and timestamps.</p>
		<div class="activity-feed" style="max-width: 540px;" role="feed" aria-label="Recent activity">
			{#each activities as event, i}
				<article class="activity-item" aria-label="{event.name} {event.action} {event.target}">
					<div class="activity-item__left">
						<div
							class="soc-avatar soc-avatar--32"
							style="background: {palette(event.pi).bg}; color: {palette(event.pi).color};"
							aria-hidden="true"
						>
							{event.initials}
						</div>
						{#if i < activities.length - 1}
							<div class="activity-item__line" aria-hidden="true"></div>
						{/if}
					</div>
					<div class="activity-item__content">
						<div class="activity-item__icon" aria-hidden="true">
							<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d={activityIconPath(event.targetType)}/>
							</svg>
						</div>
						<div class="activity-item__text">
							<span class="activity-item__actor">{event.name}</span>
							<span class="activity-item__action"> {event.action} </span>
							<span class="activity-item__target">{event.target}</span>
						</div>
						<time class="activity-item__time">{event.time}</time>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- ═══ 4. SHARE CARD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Share Card</h3>
		<p class="ds-card__sub">Copy link with confirmation flash, social icon row, and shared-with counter. Click "Copy link" to see the state change.</p>
		<div class="share-card" style="max-width: 360px;">
			<div class="share-card__header">
				<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color: var(--dt3);">
					<path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
				</svg>
				<span class="share-card__title">Share this post</span>
			</div>

			<div class="share-card__copy-row">
				<div class="share-card__url-box">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
					</svg>
					<span class="share-card__url-text">miosa.app/posts/social-patterns</span>
				</div>
				<button
					class="btn-rounded btn-rounded-ghost"
					class:share-card__copy-btn--copied={copyLabel === 'Copied!'}
					onclick={handleCopyLink}
					aria-label="Copy post link to clipboard"
				>
					{#if copyLabel === 'Copied!'}
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M5 13l4 4L19 7"/>
						</svg>
					{:else}
						<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
						</svg>
					{/if}
					{copyLabel}
				</button>
			</div>

			<div class="share-card__divider-row" aria-hidden="true">
				<div class="share-card__divider"></div>
				<span class="share-card__divider-label">or share via</span>
				<div class="share-card__divider"></div>
			</div>

			<ul class="share-card__socials" aria-label="Share on social networks">
				{#each [
					{ label: 'X (Twitter)', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.259 5.661 5.905-5.661zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
					{ label: 'LinkedIn',    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
					{ label: 'Email',       path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
					{ label: 'Copy link',   path: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13' },
				] as social}
					<li>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Share on {social.label}">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d={social.path}/>
							</svg>
						</button>
					</li>
				{/each}
			</ul>

			<div class="share-card__footer">
				<div class="share-card__shared-avatars" aria-hidden="true">
					{#each [0, 1, 2] as pi}
						<div
							class="soc-avatar soc-avatar--20 share-card__shared-avatar"
							style="background: {palette(pi).bg}; color: {palette(pi).color};"
						>
							{['AM', 'BT', 'CN'][pi]}
						</div>
					{/each}
				</div>
				<span class="share-card__shared-label">
					Shared with <strong>{shareCount}</strong> {shareCount === 1 ? 'person' : 'people'}
				</span>
			</div>
		</div>
	</div>

	<!-- ═══ 5. LIKE / UPVOTE BUTTON ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Like / Upvote Button</h3>
		<p class="ds-card__sub">Interactive like with scale-pop animation on toggle. Upvote widget and pill variant share the same like state.</p>
		<div class="ds-demo" style="gap: 40px; flex-wrap: wrap; align-items: flex-start;">

			<!-- Heart like -->
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em;">Like</div>
				<button
					class="btn-compact btn-compact-ghost"
					class:like-btn--liked={liked}
					class:like-btn--pop={likeAnimating}
					onclick={handleLike}
					aria-label="{liked ? 'Unlike' : 'Like'} this post"
					aria-pressed={liked}
				>
					<svg
						class="like-btn__icon"
						width="20" height="20"
						viewBox="0 0 24 24"
						fill={liked ? 'currentColor' : 'none'}
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
					</svg>
					<span class="like-btn__count">{likeCount}</span>
				</button>
				<span style="font-size: 11px; color: var(--dt3);">{liked ? 'Liked' : 'Not liked'}</span>
			</div>

			<!-- Upvote widget -->
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em;">Upvote</div>
				<div class="upvote-widget" aria-label="Vote. Current score: {upvoteCount}">
					<button
						class="upvote-btn"
						class:upvote-btn--voted={upvoted}
						onclick={handleUpvote}
						aria-label="{upvoted ? 'Remove upvote' : 'Upvote this post'}"
						aria-pressed={upvoted}
					>
						<svg width="14" height="14" fill={upvoted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M5 15l7-7 7 7"/>
						</svg>
					</button>
					<span class="upvote-count" class:upvote-count--voted={upvoted}>{upvoteCount}</span>
					<button class="upvote-btn upvote-btn--down" aria-label="Downvote this post" aria-disabled="true" tabindex="-1">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M19 9l-7 7-7-7"/>
						</svg>
					</button>
				</div>
				<span style="font-size: 11px; color: var(--dt3);">{upvoted ? 'Upvoted' : 'Not voted'}</span>
			</div>

			<!-- Pill variant -->
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em;">Pill</div>
				<button
					class="btn-pill btn-pill-ghost"
					class:like-pill--liked={liked}
					onclick={handleLike}
					aria-label="{liked ? 'Unlike' : 'Like'} this post"
					aria-pressed={liked}
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
					</svg>
					{liked ? 'Liked' : 'Like'} · {likeCount}
				</button>
				<span style="font-size: 11px; color: var(--dt3);">Shares state with "Like"</span>
			</div>

		</div>
	</div>

	<!-- ═══ 6. USER MENTIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">User Mentions</h3>
		<p class="ds-card__sub">@mention chips with mini-avatar and name embedded in prose, plus standalone chip variants below.</p>
		<div style="max-width: 540px; display: flex; flex-direction: column; gap: 20px;">

			<!-- Inline paragraph -->
			<div class="mention-prose">
				{#each mentionParagraph as part}
					{#if part.type === 'text'}
						<span>{part.value}</span>
					{:else}
						<button
							class="mention-chip"
							aria-label="View profile of {part.name}"
						>
							<span
								class="mention-chip__avatar"
								style="background: {palette(part.pi).bg}; color: {palette(part.pi).color};"
								aria-hidden="true"
							>
								{part.initials}
							</span>
							<span class="mention-chip__name">{part.name}</span>
						</button>
					{/if}
				{/each}
			</div>

			<!-- Standalone chips -->
			<div>
				<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;">Standalone chips</div>
				<div style="display: flex; flex-wrap: wrap; gap: 8px;">
					{#each standaloneMentions as user}
						<button class="mention-chip mention-chip--lg" aria-label="View profile of {user.name}">
							<span
								class="mention-chip__avatar mention-chip__avatar--lg"
								style="background: {palette(user.pi).bg}; color: {palette(user.pi).color};"
								aria-hidden="true"
							>
								{user.initials}
							</span>
							<span class="mention-chip__name">{user.handle}</span>
						</button>
					{/each}
				</div>
			</div>

		</div>
	</div>

	<!-- ═══ 7. NOTIFICATION ITEMS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Items</h3>
		<p class="ds-card__sub">
			Unread dot, type icon, message, detail, and timestamp. Click the checkmark to mark read.
			{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
		</p>
		<div style="max-width: 520px;">

			<div class="notif-header">
				<span class="notif-header__title">
					Notifications
					{#if unreadCount > 0}
						<span class="notif-badge" aria-label="{unreadCount} unread">{unreadCount}</span>
					{/if}
				</span>
				{#if unreadCount > 0}
					<button class="btn-compact btn-compact-ghost" onclick={markAllRead} aria-label="Mark all notifications as read">
						Mark all read
					</button>
				{/if}
			</div>

			<div class="notif-list" role="list" aria-label="Notifications">
				{#each notifications as notif, i}
					{@const iconColor = notifIconColor(notif.type)}
					<div
						class="notif-item"
						class:notif-item--unread={!notif.read}
						class:notif-item--bordered={i > 0}
						role="listitem"
					>
						<div class="notif-item__dot-col" aria-hidden="true">
							{#if !notif.read}
								<div class="notif-item__dot"></div>
							{/if}
						</div>

						<div
							class="notif-item__icon"
							style="color: {iconColor}; background: {iconColor}18; border-color: {iconColor}25;"
							aria-hidden="true"
						>
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d={notifIconPath(notif.type)}/>
							</svg>
						</div>

						<div class="notif-item__content">
							<div class="notif-item__message">{notif.message}</div>
							<div class="notif-item__detail">{notif.detail}</div>
							<time class="notif-item__time">{notif.time}</time>
						</div>

						{#if !notif.read}
							<button
								class="btn-compact btn-compact-ghost btn-compact-icon"
								style="flex-shrink: 0; margin-top: 2px;"
								onclick={() => markRead(notif.id)}
								aria-label="Mark as read: {notif.message}"
							>
								<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M5 13l4 4L19 7"/>
								</svg>
							</button>
						{/if}
					</div>
				{/each}

				{#if notifications.every((n) => n.read)}
					<div class="notif-empty" role="status">
						<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
						</svg>
						<span>You're all caught up</span>
					</div>
				{/if}
			</div>
		</div>
	</div>

</section>

<style>
	/* ── Shared avatar ─────────────────────────────────────────── */
	.soc-avatar {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 12px;
		flex-shrink: 0;
		border: 1.5px solid var(--dbd);
		letter-spacing: 0.02em;
		user-select: none;
	}
	.soc-avatar--20 { width: 20px; height: 20px; font-size: 7px;  border-width: 1px;  }
	.soc-avatar--28 { width: 28px; height: 28px; font-size: 9px;                      }
	.soc-avatar--32 { width: 32px; height: 32px; font-size: 10px;                     }
	.soc-avatar--36 { width: 36px; height: 36px; font-size: 11px;                     }

	/* ── Comment thread ────────────────────────────────────────── */
	.comment-thread {
		display: flex;
		flex-direction: column;
	}
	.comment {
		display: flex;
		gap: 10px;
		padding: 14px 0;
		border-bottom: 1px solid var(--dbd);
	}
	.comment:last-child {
		border-bottom: none;
	}
	.comment__body {
		flex: 1;
		min-width: 0;
	}
	.comment__meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
		margin-bottom: 5px;
	}
	.comment__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}
	.comment__handle {
		font-size: 12px;
		color: var(--dt3);
	}
	.comment__dot {
		font-size: 11px;
		color: var(--dt4);
	}
	.comment__time {
		font-size: 11px;
		color: var(--dt4);
	}
	.comment__text {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.55;
		margin: 0 0 8px;
	}
	.comment__actions {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	/* liked state modifier — base styles handled by btn-compact btn-compact-ghost */
	.comment__action-btn--liked {
		color: #f472b6 !important;
	}

	.comment-replies {
		margin-top: 10px;
		padding-left: 14px;
		border-left: 2px solid var(--dbd);
		display: flex;
		flex-direction: column;
	}
	.comment--reply {
		padding: 10px 0;
		border-bottom: 1px solid var(--dbd);
		gap: 8px;
	}
	.comment--reply-last {
		border-bottom: none;
	}

	/* ── Reaction bar ──────────────────────────────────────────── */
	.reaction-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
	}
	/* reaction-chip is a specialized emoji widget — keep custom */
	.reaction-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 10px;
		border-radius: 20px;
		background: var(--dbg2);
		border: 1.5px solid var(--dbd);
		cursor: pointer;
		transition: background 0.13s, border-color 0.13s, transform 0.1s;
		user-select: none;
	}
	.reaction-chip:hover {
		background: var(--dbg);
		border-color: var(--dbd2);
		transform: scale(1.05);
	}
	.reaction-chip:active {
		transform: scale(0.97);
	}
	.reaction-chip--active {
		background: color-mix(in srgb, #818cf8 12%, var(--dbg2));
		border-color: rgba(129, 140, 248, 0.3);
	}
	.reaction-chip__emoji {
		font-size: 15px;
		line-height: 1;
	}
	.reaction-chip__count {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
	}

	/* ── Activity feed ─────────────────────────────────────────── */
	.activity-feed {
		display: flex;
		flex-direction: column;
	}
	.activity-item {
		display: flex;
		gap: 12px;
	}
	.activity-item__left {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 32px;
	}
	.activity-item__line {
		width: 1px;
		flex: 1;
		min-height: 12px;
		background: var(--dbd);
		margin-top: 3px;
	}
	.activity-item__content {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 4px;
		flex: 1;
		min-width: 0;
		padding: 5px 0 16px;
	}
	.activity-item__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		flex-shrink: 0;
		margin-right: 2px;
		align-self: center;
	}
	.activity-item__text {
		flex: 1;
		min-width: 0;
		font-size: 13px;
		line-height: 1.5;
	}
	.activity-item__actor {
		font-weight: 600;
		color: var(--dt);
	}
	.activity-item__action {
		color: var(--dt3);
	}
	.activity-item__target {
		font-weight: 500;
		color: var(--dt2);
	}
	.activity-item__time {
		font-size: 11px;
		color: var(--dt4);
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* ── Share card ────────────────────────────────────────────── */
	.share-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 18px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.share-card__header {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.share-card__title {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
	}
	.share-card__copy-row {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.share-card__url-box {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 8px 12px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		color: var(--dt3);
	}
	.share-card__url-text {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/* copied state modifier — base styles handled by btn-rounded btn-rounded-ghost */
	.share-card__copy-btn--copied {
		color: #34d399 !important;
		border-color: rgba(52, 211, 153, 0.25) !important;
		background: rgba(52, 211, 153, 0.08) !important;
	}
	.share-card__divider-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.share-card__divider {
		flex: 1;
		height: 1px;
		background: var(--dbd);
	}
	.share-card__divider-label {
		font-size: 11px;
		color: var(--dt4);
		white-space: nowrap;
	}
	.share-card__socials {
		display: flex;
		gap: 8px;
		justify-content: center;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.share-card__footer {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.share-card__shared-avatars {
		display: flex;
	}
	.share-card__shared-avatar {
		margin-left: -5px;
		outline: 2px solid var(--dbg2);
	}
	.share-card__shared-avatar:first-child {
		margin-left: 0;
	}
	.share-card__shared-label {
		font-size: 12px;
		color: var(--dt3);
	}
	.share-card__shared-label strong {
		color: var(--dt2);
		font-weight: 600;
	}

	/* ── Like / upvote ─────────────────────────────────────────── */
	/* liked state modifier — base styles handled by btn-compact btn-compact-ghost */
	.like-btn--liked {
		color: #f472b6 !important;
		border-color: rgba(244, 114, 182, 0.25) !important;
		background: rgba(244, 114, 182, 0.08) !important;
	}
	.like-btn--liked:hover {
		background: rgba(244, 114, 182, 0.12) !important;
		border-color: rgba(244, 114, 182, 0.35) !important;
	}
	.like-btn__icon {
		flex-shrink: 0;
		transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.like-btn--pop .like-btn__icon {
		transform: scale(1.4);
	}
	.like-btn__count {
		font-size: 14px;
		font-weight: 600;
		min-width: 24px;
		text-align: left;
	}

	/* upvote widget is a specialized segmented control — keep custom */
	.upvote-widget {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		border: 1.5px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		background: var(--dbg2);
	}
	.upvote-btn {
		width: 38px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.13s, color 0.13s;
	}
	.upvote-btn:hover {
		background: var(--dbg);
		color: var(--dt);
	}
	.upvote-btn--voted {
		color: #fb923c;
	}
	.upvote-btn--down {
		color: var(--dt4);
		opacity: 0.45;
		cursor: not-allowed;
	}
	.upvote-btn--down:hover {
		background: transparent;
		color: var(--dt4);
	}
	.upvote-count {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt2);
		padding: 4px 0;
		min-width: 38px;
		text-align: center;
		border-top: 1px solid var(--dbd);
		border-bottom: 1px solid var(--dbd);
		transition: color 0.13s;
	}
	.upvote-count--voted {
		color: #fb923c;
	}

	/* liked state modifier for pill — base styles handled by btn-pill btn-pill-ghost */
	.like-pill--liked {
		color: #f472b6 !important;
		border-color: rgba(244, 114, 182, 0.25) !important;
		background: rgba(244, 114, 182, 0.08) !important;
	}

	/* ── User mentions ─────────────────────────────────────────── */
	.mention-prose {
		font-size: 14px;
		color: var(--dt2);
		line-height: 1.75;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 14px 16px;
	}
	/* mention-chip is a specialized inline chip — keep custom */
	.mention-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 2px 8px 2px 3px;
		border-radius: 20px;
		background: rgba(129, 140, 248, 0.10);
		border: 1px solid rgba(129, 140, 248, 0.22);
		color: #818cf8;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		vertical-align: middle;
		transition: background 0.12s, border-color 0.12s;
		line-height: 1.3;
	}
	.mention-chip:hover {
		background: rgba(129, 140, 248, 0.17);
		border-color: rgba(129, 140, 248, 0.35);
	}
	.mention-chip__avatar {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 7px;
		font-weight: 700;
		border: 1px solid var(--dbd);
		flex-shrink: 0;
	}
	.mention-chip__name {
		white-space: nowrap;
	}
	.mention-chip--lg {
		padding: 4px 12px 4px 4px;
		font-size: 13px;
	}
	.mention-chip__avatar--lg {
		width: 22px;
		height: 22px;
		font-size: 8px;
	}

	/* ── Notification items ────────────────────────────────────── */
	.notif-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 10px;
		margin-bottom: 2px;
		border-bottom: 1px solid var(--dbd);
	}
	.notif-header__title {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.notif-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9px;
		background: #818cf8;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		line-height: 1;
	}
	.notif-list {
		display: flex;
		flex-direction: column;
	}
	.notif-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 6px;
		border-radius: 10px;
		transition: background 0.13s;
	}
	.notif-item--bordered {
		border-top: 1px solid var(--dbd);
		border-radius: 0;
	}
	.notif-item--unread {
		background: rgba(129, 140, 248, 0.04);
	}
	.notif-item:hover {
		background: var(--dbg2);
	}
	.notif-item__dot-col {
		width: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding-top: 9px;
	}
	.notif-item__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #818cf8;
		flex-shrink: 0;
	}
	.notif-item__icon {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1.5px solid;
	}
	.notif-item__content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.notif-item__message {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1.4;
	}
	.notif-item__detail {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 340px;
	}
	.notif-item__time {
		font-size: 11px;
		color: var(--dt4);
		margin-top: 2px;
	}
	.notif-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 28px 16px;
		color: var(--dt4);
		font-size: 13px;
	}
</style>
