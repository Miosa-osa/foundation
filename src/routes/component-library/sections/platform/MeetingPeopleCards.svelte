<script lang="ts">
	// ── Video player state ─────────────────────────────────────
	let videoPlaying = $state(false);
	let videoProgress = $state(27); // percent
	let videoMuted = $state(false);
	let videoSpeed = $state('1×');
	let timestampsOpen = $state(false);

	// ── Reaction state ─────────────────────────────────────────
	type Reaction = { emoji: string; count: number; reacted: boolean };

	let meetingReactions = $state<Reaction[]>([
		{ emoji: '❤️',  count: 8,  reacted: false },
		{ emoji: '🔥',  count: 5,  reacted: false },
		{ emoji: '👍',  count: 12, reacted: false },
		{ emoji: '👏',  count: 4,  reacted: false },
		{ emoji: '💯',  count: 3,  reacted: false },
	]);

	let standaloneReactions = $state<Reaction[]>([
		{ emoji: '❤️',  count: 24, reacted: true  },
		{ emoji: '🔥',  count: 11, reacted: false },
		{ emoji: '👍',  count: 36, reacted: false },
		{ emoji: '😮',  count: 6,  reacted: false },
		{ emoji: '🎉',  count: 9,  reacted: false },
	]);

	let emojiPickerOpen = $state(false);
	const extraEmojis = ['😂', '😢', '🙌', '💪', '✨', '🚀'];

	function toggleReaction(list: Reaction[], idx: number) {
		const r = list[idx];
		r.reacted = !r.reacted;
		r.count += r.reacted ? 1 : -1;
	}

	function addExtraReaction(list: Reaction[], emoji: string) {
		const existing = list.find(r => r.emoji === emoji);
		if (existing) {
			existing.reacted = true;
			existing.count++;
		} else {
			list.push({ emoji, count: 1, reacted: true });
		}
		emojiPickerOpen = false;
	}

	// ── People sidebar state ───────────────────────────────────
	let peopleSearch = $state('');
	let selectedPersonId = $state<string | null>(null);

	const people = [
		{ id: 'p1', initials: 'AM', name: 'Alice Morgan',    title: 'Head of Design',       company: 'Acme Corp',     location: 'San Francisco, CA', email: 'alice@acme.com',   phone: '+1 (415) 555-0142', linkedIn: true, twitter: true, pi: 0,
		  experience: [
			{ company: 'Acme Corp',    role: 'Head of Design',    dates: '2022 – Present' },
			{ company: 'Figma',        role: 'Senior Designer',    dates: '2019 – 2022'   },
		  ] },
		{ id: 'p2', initials: 'BT', name: 'Blake Torres',    title: 'Product Manager',      company: 'Horizon Labs',  location: 'New York, NY',      email: 'blake@horizon.io', phone: '+1 (212) 555-0198', linkedIn: true, twitter: false, pi: 1,
		  experience: [
			{ company: 'Horizon Labs', role: 'Product Manager',    dates: '2021 – Present' },
			{ company: 'Stripe',       role: 'Associate PM',       dates: '2018 – 2021'   },
		  ] },
		{ id: 'p3', initials: 'CN', name: 'Casey Nguyen',    title: 'Engineering Lead',     company: 'DevStream',     location: 'Austin, TX',        email: 'casey@devstream.io', phone: '+1 (512) 555-0177', linkedIn: true, twitter: true, pi: 2,
		  experience: [
			{ company: 'DevStream',    role: 'Engineering Lead',   dates: '2023 – Present' },
			{ company: 'GitHub',       role: 'Senior Engineer',    dates: '2020 – 2023'   },
		  ] },
		{ id: 'p4', initials: 'DO', name: 'Dana Okafor',     title: 'ML Research Scientist',company: 'NeuralPath',    location: 'London, UK',        email: 'dana@neuralpath.ai', phone: '+44 20 7946 0358', linkedIn: true, twitter: true, pi: 3,
		  experience: [
			{ company: 'NeuralPath',   role: 'Research Scientist',  dates: '2022 – Present' },
			{ company: 'DeepMind',     role: 'Research Intern',     dates: '2021 – 2022'   },
		  ] },
		{ id: 'p5', initials: 'EZ', name: 'Elliot Zhang',    title: 'DevOps Engineer',      company: 'CloudBridge',   location: 'Seattle, WA',       email: 'elliot@cloudbridge.dev', phone: '+1 (206) 555-0134', linkedIn: false, twitter: true, pi: 4,
		  experience: [
			{ company: 'CloudBridge',  role: 'DevOps Engineer',     dates: '2023 – Present' },
			{ company: 'AWS',          role: 'Solutions Architect',  dates: '2019 – 2023'   },
		  ] },
	];

	const avatarPalettes = [
		{ bg: 'linear-gradient(135deg, #1a1a2e, #0d0d1a)', color: '#818cf8' },
		{ bg: 'linear-gradient(135deg, #1c1c14, #0f0f09)', color: '#a3e635' },
		{ bg: 'linear-gradient(135deg, #1e1218, #0f090d)', color: '#f472b6' },
		{ bg: 'linear-gradient(135deg, #111827, #060b14)', color: '#38bdf8' },
		{ bg: 'linear-gradient(135deg, #1c1410, #0f0a07)', color: '#fb923c' },
	];

	function palette(i: number) {
		return avatarPalettes[i % avatarPalettes.length];
	}

	let filteredPeople = $derived(
		people.filter(p => p.name.toLowerCase().includes(peopleSearch.toLowerCase()))
	);

	let selectedPerson = $derived(
		selectedPersonId ? people.find(p => p.id === selectedPersonId) ?? null : null
	);

	const peopleAlsoAsk = [
		'Who leads product at Acme Corp?',
		'Where does Blake Torres work?',
		'What is Casey Nguyen\'s background?',
	];

	const timestamps = [
		{ time: '0:00',  label: 'Introductions & agenda' },
		{ time: '3:22',  label: 'Q4 roadmap review'      },
		{ time: '11:08', label: 'Design system updates'   },
		{ time: '18:45', label: 'Action items & close'    },
	];

	const speedOptions = ['0.5×', '0.75×', '1×', '1.25×', '1.5×', '2×'];
	let speedMenuOpen = $state(false);
</script>

<section class="ds-section">
	<h2 class="ds-title">Meeting &amp; People Cards</h2>
	<p class="ds-desc">Meeting recordings, video players, contact profiles, reaction bars, and people browsers.</p>

	<!-- ═══ 1. MEETING RECORDING CARD ══════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Meeting Recording Card</h3>
		<p class="ds-card__sub">Full meeting card — video player, caption bar, reactions, comments, and expandable timestamps.</p>
		<div class="ds-demo" style="align-items: flex-start;">
			<div class="mp-meeting-card">

				<!-- Card header -->
				<div class="mp-meeting-card__header">
					<div class="mp-meeting-card__header-left">
						<div class="mp-meeting-icon" aria-hidden="true">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.677V15.32a1 1 0 01-1.447.894L15 14M4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/>
							</svg>
						</div>
						<div>
							<div class="mp-meeting-card__title">Meeting Recording</div>
							<div class="mp-meeting-card__date">January 30, 2026</div>
						</div>
					</div>
					<button class="mp-icon-btn" aria-label="More options">
						<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
							<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
						</svg>
					</button>
				</div>

				<!-- Video area -->
				<div class="mp-video-wrap">
					<!-- 16:9 placeholder -->
					<div class="mp-video-bg" aria-label="Video player">
						<!-- Gradient scene -->
						<div class="mp-video-scene" aria-hidden="true">
							<div class="mp-video-scene__grid"></div>
						</div>

						<!-- Play/pause overlay -->
						<button
							class="mp-play-btn"
							aria-label="{videoPlaying ? 'Pause' : 'Play'} recording"
							onclick={() => videoPlaying = !videoPlaying}
						>
							{#if videoPlaying}
								<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
									<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
								</svg>
							{:else}
								<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5.14v14l11-7-11-7z"/>
								</svg>
							{/if}
						</button>

						<!-- Caption bar -->
						<div class="mp-caption-bar" aria-live="polite">
							<span class="mp-caption-bar__text">"Right, and then also..."</span>
						</div>
					</div>

					<!-- Controls bar -->
					<div class="mp-controls">
						<!-- Play/pause -->
						<button
							class="mp-ctrl-btn"
							aria-label="{videoPlaying ? 'Pause' : 'Play'}"
							onclick={() => videoPlaying = !videoPlaying}
						>
							{#if videoPlaying}
								<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
									<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
								</svg>
							{:else}
								<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5.14v14l11-7-11-7z"/>
								</svg>
							{/if}
						</button>

						<!-- Progress bar -->
						<div class="mp-progress-wrap">
							<div
								class="mp-progress-track"
								role="slider"
								aria-label="Video progress"
								aria-valuemin={0}
								aria-valuemax={100}
								aria-valuenow={videoProgress}
								tabindex="0"
								onkeydown={(e) => {
									if (e.key === 'ArrowRight') videoProgress = Math.min(100, videoProgress + 5);
									if (e.key === 'ArrowLeft')  videoProgress = Math.max(0, videoProgress - 5);
								}}
							>
								<div class="mp-progress-fill" style="width: {videoProgress}%;"></div>
								<div class="mp-progress-thumb" style="left: {videoProgress}%;"></div>
							</div>
						</div>

						<!-- Time -->
						<span class="mp-ctrl-time">2:18 / 8:34</span>

						<!-- Volume -->
						<button
							class="mp-ctrl-btn"
							aria-label="{videoMuted ? 'Unmute' : 'Mute'}"
							onclick={() => videoMuted = !videoMuted}
						>
							{#if videoMuted}
								<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
									<path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
								</svg>
							{:else}
								<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-5.636-9.536A9 9 0 013 12a9 9 0 013.364-6.964M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
								</svg>
							{/if}
						</button>

						<!-- Speed selector -->
						<div class="mp-speed-wrap">
							<button
								class="mp-ctrl-btn mp-ctrl-btn--text"
								aria-label="Playback speed"
								aria-haspopup="listbox"
								onclick={() => speedMenuOpen = !speedMenuOpen}
							>
								{videoSpeed}
							</button>
							{#if speedMenuOpen}
								<div class="mp-speed-menu" role="listbox" aria-label="Playback speed options">
									{#each speedOptions as spd}
										<button
											class="mp-speed-menu__item {videoSpeed === spd ? 'mp-speed-menu__item--active' : ''}"
											role="option"
											aria-selected={videoSpeed === spd}
											onclick={() => { videoSpeed = spd; speedMenuOpen = false; }}
										>
											{spd}
										</button>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Fullscreen -->
						<button class="mp-ctrl-btn" aria-label="Fullscreen">
							<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
							</svg>
						</button>
					</div>
				</div>

				<!-- Reaction bar -->
				<div class="mp-reaction-bar">
					<div class="mp-reactions">
						{#each meetingReactions as r, i}
							<button
								class="mp-reaction {r.reacted ? 'mp-reaction--active' : ''}"
								aria-label="{r.emoji} reaction, {r.count} {r.count === 1 ? 'person' : 'people'}"
								aria-pressed={r.reacted}
								onclick={() => toggleReaction(meetingReactions, i)}
							>
								<span class="mp-reaction__emoji">{r.emoji}</span>
								<span class="mp-reaction__count">{r.count}</span>
							</button>
						{/each}
					</div>
					<!-- Comment button -->
					<button class="mp-comment-btn" aria-label="4 comments">
						<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
						</svg>
						<span>4</span>
					</button>
				</div>

				<!-- Timestamps collapsible -->
				<div class="mp-timestamps">
					<button
						class="mp-timestamps__toggle"
						aria-expanded={timestampsOpen}
						onclick={() => timestampsOpen = !timestampsOpen}
					>
						<svg
							width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
							class="mp-timestamps__chevron {timestampsOpen ? 'mp-timestamps__chevron--open' : ''}"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
						</svg>
						Timestamps
					</button>

					{#if timestampsOpen}
						<div class="mp-timestamps__list">
							{#each timestamps as ts}
								<button class="mp-timestamp-item">
									<span class="mp-timestamp-item__time">{ts.time}</span>
									<span class="mp-timestamp-item__label">{ts.label}</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>

			</div>
		</div>
	</div>

	<!-- ═══ 2. STANDALONE REACTION BAR ════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Reaction Bar — Standalone</h3>
		<p class="ds-card__sub">Emoji reactions with counts, toggle states, animated add, and emoji picker popover.</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 24px;">

			<!-- Default reaction bar -->
			<div>
				<div class="ds-label-sm" style="margin-bottom: 8px;">Default</div>
				<div class="mp-reaction-bar mp-reaction-bar--standalone">
					<div class="mp-reactions">
						{#each standaloneReactions as r, i}
							<button
								class="mp-reaction {r.reacted ? 'mp-reaction--active' : ''}"
								aria-label="{r.emoji} {r.count}"
								aria-pressed={r.reacted}
								onclick={() => toggleReaction(standaloneReactions, i)}
							>
								<span class="mp-reaction__emoji">{r.emoji}</span>
								<span class="mp-reaction__count">{r.count}</span>
							</button>
						{/each}
					</div>
					<!-- Add reaction -->
					<div class="mp-add-reaction-wrap">
						<button
							class="mp-add-reaction-btn"
							aria-label="Add reaction"
							aria-haspopup="dialog"
							onclick={() => emojiPickerOpen = !emojiPickerOpen}
						>
							<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
							</svg>
							<svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" d="M12 5v14M5 12h14"/>
							</svg>
						</button>
						{#if emojiPickerOpen}
							<div class="mp-emoji-picker" role="dialog" aria-label="Emoji picker">
								{#each extraEmojis as emoji}
									<button
										class="mp-emoji-picker__item"
										aria-label="React with {emoji}"
										onclick={() => addExtraReaction(standaloneReactions, emoji)}
									>
										{emoji}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Compact reaction bar -->
			<div>
				<div class="ds-label-sm" style="margin-bottom: 8px;">Compact / inline</div>
				<div class="mp-reactions">
					{#each [
						{ emoji: '👍', count: 7,  reacted: false },
						{ emoji: '❤️', count: 3,  reacted: true  },
					] as r, i}
						<button class="mp-reaction mp-reaction--sm {r.reacted ? 'mp-reaction--active' : ''}" aria-pressed={r.reacted}>
							<span class="mp-reaction__emoji">{r.emoji}</span>
							<span class="mp-reaction__count">{r.count}</span>
						</button>
					{/each}
				</div>
			</div>

		</div>
	</div>

	<!-- ═══ 3. PEOPLE / CONTACT SIDEBAR ════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">People &amp; Contact Sidebar</h3>
		<p class="ds-card__sub">Searchable list of contacts with avatars, roles, social links. Click a row to see the expanded contact card.</p>
		<div class="ds-demo" style="align-items: flex-start; gap: 16px; flex-wrap: wrap;">

			<!-- Sidebar list -->
			<div class="mp-people-sidebar">
				<!-- Search -->
				<div class="mp-people-search">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="mp-people-search__icon" aria-hidden="true">
						<circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
					</svg>
					<input
						class="mp-people-search__input"
						type="search"
						placeholder="Search people..."
						aria-label="Search people"
						bind:value={peopleSearch}
					/>
				</div>

				<!-- List -->
				<div class="mp-people-list" role="listbox" aria-label="People">
					{#each filteredPeople as person, i}
						<button
							class="mp-person-row {selectedPersonId === person.id ? 'mp-person-row--active' : ''}"
							role="option"
							aria-selected={selectedPersonId === person.id}
							onclick={() => selectedPersonId = selectedPersonId === person.id ? null : person.id}
						>
							<!-- Avatar -->
							<div class="mp-avatar mp-avatar--36" style="background: {palette(person.pi).bg}; color: {palette(person.pi).color};">
								{person.initials}
							</div>
							<!-- Identity -->
							<div class="mp-person-row__info">
								<span class="mp-person-row__name">{person.name}</span>
								<span class="mp-person-row__title">{person.title}</span>
							</div>
							<!-- Social icons -->
							<div class="mp-person-row__socials">
								{#if person.linkedIn}
									<span class="mp-social-dot mp-social-dot--li" aria-label="LinkedIn" title="LinkedIn">in</span>
								{/if}
								{#if person.twitter}
									<span class="mp-social-dot mp-social-dot--x" aria-label="X / Twitter" title="X">𝕏</span>
								{/if}
							</div>
						</button>
					{/each}

					{#if filteredPeople.length === 0}
						<div class="mp-people-empty">No people found</div>
					{/if}
				</div>

				<!-- People also ask -->
				<div class="mp-people-also-ask">
					<div class="mp-people-also-ask__label">People also ask</div>
					{#each peopleAlsoAsk as q}
						<button class="mp-paa-item">{q}</button>
					{/each}
				</div>
			</div>

			<!-- Expanded contact card -->
			{#if selectedPerson}
				<div class="mp-contact-card">
					<!-- Large avatar -->
					<div class="mp-contact-card__avatar-wrap">
						<div
							class="mp-avatar mp-avatar--72"
							style="background: {palette(selectedPerson.pi).bg}; color: {palette(selectedPerson.pi).color}; font-size: 22px;"
						>
							{selectedPerson.initials}
						</div>
					</div>

					<!-- Identity -->
					<div class="mp-contact-card__name">{selectedPerson.name}</div>
					<div class="mp-contact-card__title-line">
						<span class="mp-contact-card__role">{selectedPerson.title}</span>
						<span class="mp-contact-card__sep" aria-hidden="true">·</span>
						<span class="mp-contact-card__company">{selectedPerson.company}</span>
					</div>

					<!-- Location -->
					<div class="mp-contact-card__location">
						<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
						</svg>
						{selectedPerson.location}
					</div>

					<!-- Divider -->
					<div class="mp-contact-card__divider"></div>

					<!-- Contact details -->
					<div class="mp-contact-card__details">
						<a href="mailto:{selectedPerson.email}" class="mp-contact-detail" aria-label="Email {selectedPerson.name}">
							<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
							</svg>
							{selectedPerson.email}
						</a>
						<a href="tel:{selectedPerson.phone}" class="mp-contact-detail" aria-label="Call {selectedPerson.name}">
							<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
							</svg>
							{selectedPerson.phone}
						</a>
					</div>

					<!-- Social profile links -->
					<div class="mp-contact-card__socials">
						{#if selectedPerson.linkedIn}
							<a href="#linkedin" class="mp-contact-social-btn mp-contact-social-btn--li" aria-label="LinkedIn profile">
								<span style="font-size: 11px; font-weight: 700;">in</span>
								LinkedIn
							</a>
						{/if}
						{#if selectedPerson.twitter}
							<a href="#twitter" class="mp-contact-social-btn mp-contact-social-btn--x" aria-label="X / Twitter profile">
								<span style="font-size: 10px; font-weight: 800;">𝕏</span>
								Twitter
							</a>
						{/if}
					</div>

					<!-- Divider -->
					<div class="mp-contact-card__divider"></div>

					<!-- Experience -->
					<div class="mp-experience">
						<div class="mp-experience__label">Experience</div>
						{#each selectedPerson.experience as exp, i}
							<div class="mp-experience-item" class:mp-experience-item--bordered={i > 0}>
								<div class="mp-experience-item__company-dot" aria-hidden="true"></div>
								<div>
									<div class="mp-experience-item__role">{exp.role}</div>
									<div class="mp-experience-item__company">{exp.company}</div>
									<div class="mp-experience-item__dates">{exp.dates}</div>
								</div>
							</div>
						{/each}
					</div>

				</div>
			{:else}
				<div class="mp-contact-card mp-contact-card--empty">
					<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color: var(--dt4); margin-bottom: 10px;" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
					</svg>
					<div style="font-size: 13px; font-weight: 600; color: var(--dt2);">Select a person</div>
					<div style="font-size: 12px; color: var(--dt4); margin-top: 4px; text-align: center; max-width: 140px;">Click any row in the list to see the full contact card.</div>
				</div>
			{/if}

		</div>
	</div>

	<!-- ═══ 4. IN CONTEXT — MEETING WITH PEOPLE PANEL ══════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Meeting + People Panel</h3>
		<p class="ds-card__sub">Side-by-side layout: meeting card left, compact people panel right. Shows how the pieces compose.</p>
		<div class="ds-demo" style="align-items: flex-start; gap: 12px; flex-wrap: wrap;">

			<!-- Mini meeting card -->
			<div class="mp-mini-meeting">
				<div class="mp-mini-meeting__header">
					<div class="mp-meeting-icon" aria-hidden="true" style="width: 26px; height: 26px;">
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.677V15.32a1 1 0 01-1.447.894L15 14M4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/>
						</svg>
					</div>
					<div>
						<div class="mp-meeting-card__title" style="font-size: 12px;">Meeting Recording</div>
						<div class="mp-meeting-card__date" style="font-size: 10px;">Jan 30, 2026 · 8:34</div>
					</div>
					<div class="mp-mini-meeting__live" aria-label="Recording status">REC</div>
				</div>

				<!-- Tiny video -->
				<div class="mp-mini-video">
					<div class="mp-video-scene" style="height: 100%; border-radius: 0;" aria-hidden="true">
						<div class="mp-video-scene__grid"></div>
					</div>
					<div class="mp-mini-video__caption">"…and we can ship that next sprint."</div>
				</div>

				<!-- Compact reactions -->
				<div class="mp-reaction-bar" style="padding: 8px 12px; border-top: 1px solid var(--dbd); gap: 6px;">
					<div class="mp-reactions">
						{#each meetingReactions.slice(0, 3) as r, i}
							<button
								class="mp-reaction mp-reaction--sm {r.reacted ? 'mp-reaction--active' : ''}"
								aria-pressed={r.reacted}
								onclick={() => toggleReaction(meetingReactions, i)}
							>
								<span class="mp-reaction__emoji">{r.emoji}</span>
								<span class="mp-reaction__count">{r.count}</span>
							</button>
						{/each}
					</div>
					<button class="mp-comment-btn mp-comment-btn--sm" aria-label="Comments">
						<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
						</svg>
						<span>4</span>
					</button>
				</div>
			</div>

			<!-- Compact people panel -->
			<div class="mp-people-panel">
				<div class="mp-people-panel__title">Participants</div>
				{#each people.slice(0, 4) as person}
					<div class="mp-person-compact">
						<div class="mp-avatar mp-avatar--32" style="background: {palette(person.pi).bg}; color: {palette(person.pi).color}; font-size: 10px;">
							{person.initials}
						</div>
						<div class="mp-person-compact__info">
							<span class="mp-person-compact__name">{person.name}</span>
							<span class="mp-person-compact__role">{person.title}</span>
						</div>
						{#if person.linkedIn || person.twitter}
							<div style="display: flex; gap: 4px; flex-shrink: 0;">
								{#if person.linkedIn}
									<span class="mp-social-dot mp-social-dot--li mp-social-dot--xs" title="LinkedIn">in</span>
								{/if}
								{#if person.twitter}
									<span class="mp-social-dot mp-social-dot--x mp-social-dot--xs" title="X">𝕏</span>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>

		</div>
	</div>

</section>

<style>
	/* ── Shared helpers ───────────────────────────────────────── */
	.ds-label-sm {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	/* ── Avatar ───────────────────────────────────────────────── */
	.mp-avatar {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		flex-shrink: 0;
		border: 1.5px solid var(--dbd);
		letter-spacing: 0.02em;
	}
	.mp-avatar--32 { width: 32px; height: 32px; font-size: 10px; }
	.mp-avatar--36 { width: 36px; height: 36px; font-size: 11px; }
	.mp-avatar--72 { width: 72px; height: 72px; font-size: 22px; border-width: 2px; }

	/* ── Meeting Card ─────────────────────────────────────────── */
	.mp-meeting-card {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		overflow: hidden;
		width: 100%;
		max-width: 480px;
	}
	.mp-meeting-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
		gap: 12px;
	}
	.mp-meeting-card__header-left {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.mp-meeting-icon {
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt3);
		flex-shrink: 0;
	}
	.mp-meeting-card__title {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.mp-meeting-card__date {
		font-size: 11px;
		color: var(--dt3);
		margin-top: 1px;
	}

	/* ── Icon button ──────────────────────────────────────────── */
	.mp-icon-btn {
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: transparent;
		border: none;
		color: var(--dt3);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.15s, color 0.15s;
	}
	.mp-icon-btn:hover {
		background: var(--dbg2);
		color: var(--dt);
	}

	/* ── Video wrapper ────────────────────────────────────────── */
	.mp-video-wrap {
		position: relative;
	}
	.mp-video-bg {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #0a0a14;
		overflow: hidden;
		cursor: pointer;
	}
	.mp-video-scene {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #0d0d1a 0%, #111827 40%, #0a0f1c 70%, #0d0d1a 100%);
	}
	.mp-video-scene__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px);
		background-size: 40px 40px;
		mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
	}

	/* ── Play button overlay ──────────────────────────────────── */
	.mp-play-btn {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.9);
	}
	.mp-play-btn > svg {
		width: 52px;
		height: 52px;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		padding: 14px;
		box-sizing: border-box;
		backdrop-filter: blur(8px);
		transition: transform 0.15s, background 0.15s;
	}
	.mp-play-btn:hover > svg {
		transform: scale(1.08);
		background: rgba(0, 0, 0, 0.7);
	}

	/* ── Caption bar ──────────────────────────────────────────── */
	.mp-caption-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 6px 12px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
	}
	.mp-caption-bar__text {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.88);
		font-style: italic;
		letter-spacing: 0.01em;
	}

	/* ── Video controls ───────────────────────────────────────── */
	.mp-controls {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}
	.mp-ctrl-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		background: transparent;
		border: none;
		color: var(--dt2);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.12s, color 0.12s;
	}
	.mp-ctrl-btn:hover {
		background: var(--dbd);
		color: var(--dt);
	}
	.mp-ctrl-btn--text {
		width: auto;
		padding: 0 6px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
	}
	.mp-ctrl-time {
		font-size: 10px;
		font-variant-numeric: tabular-nums;
		color: var(--dt3);
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* ── Progress bar ─────────────────────────────────────────── */
	.mp-progress-wrap {
		flex: 1;
		min-width: 0;
		padding: 6px 0;
	}
	.mp-progress-track {
		position: relative;
		height: 3px;
		background: var(--dbd);
		border-radius: 99px;
		cursor: pointer;
		outline: none;
	}
	.mp-progress-track:focus-visible {
		box-shadow: 0 0 0 2px var(--dbd2);
	}
	.mp-progress-fill {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		background: var(--dt);
		border-radius: 99px;
		pointer-events: none;
	}
	.mp-progress-thumb {
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		background: var(--dt);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	/* ── Speed menu ───────────────────────────────────────────── */
	.mp-speed-wrap {
		position: relative;
		flex-shrink: 0;
	}
	.mp-speed-menu {
		position: absolute;
		bottom: calc(100% + 6px);
		right: 0;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
		z-index: 10;
		min-width: 72px;
	}
	.mp-speed-menu__item {
		display: block;
		width: 100%;
		padding: 7px 12px;
		text-align: left;
		font-size: 12px;
		color: var(--dt2);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: background 0.12s;
	}
	.mp-speed-menu__item:hover {
		background: var(--dbg2);
	}
	.mp-speed-menu__item--active {
		color: var(--dt);
		font-weight: 600;
		background: var(--dbg2);
	}

	/* ── Reaction bar ─────────────────────────────────────────── */
	.mp-reaction-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		gap: 8px;
	}
	.mp-reaction-bar--standalone {
		padding: 0;
		background: transparent;
	}
	.mp-reactions {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-wrap: wrap;
	}
	.mp-reaction {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.12s, background 0.12s, transform 0.1s;
		font-size: 0; /* collapse inline whitespace */
	}
	.mp-reaction:hover {
		border-color: var(--dbd2);
		background: var(--dbg);
		transform: scale(1.06);
	}
	.mp-reaction:active {
		transform: scale(0.96);
	}
	.mp-reaction--active {
		border-color: var(--dbd2);
		background: color-mix(in srgb, var(--dbd2) 15%, var(--dbg2));
	}
	.mp-reaction--sm {
		padding: 3px 6px;
	}
	.mp-reaction__emoji {
		font-size: 13px;
		line-height: 1;
		display: inline-block;
	}
	.mp-reaction--sm .mp-reaction__emoji {
		font-size: 11px;
	}
	.mp-reaction__count {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		line-height: 1;
		display: inline-block;
	}
	.mp-reaction--sm .mp-reaction__count {
		font-size: 10px;
	}

	/* ── Comment button ───────────────────────────────────────── */
	.mp-comment-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 10px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: border-color 0.12s, background 0.12s;
		flex-shrink: 0;
	}
	.mp-comment-btn:hover {
		border-color: var(--dbd2);
		color: var(--dt2);
	}
	.mp-comment-btn--sm {
		padding: 3px 7px;
		font-size: 11px;
	}

	/* ── Timestamps ───────────────────────────────────────────── */
	.mp-timestamps {
		border-top: 1px solid var(--dbd);
	}
	.mp-timestamps__toggle {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: 10px 14px;
		background: transparent;
		border: none;
		color: var(--dt3);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: color 0.12s;
		text-align: left;
	}
	.mp-timestamps__toggle:hover {
		color: var(--dt);
	}
	.mp-timestamps__chevron {
		flex-shrink: 0;
		transition: transform 0.18s;
	}
	.mp-timestamps__chevron--open {
		transform: rotate(90deg);
	}
	.mp-timestamps__list {
		border-top: 1px solid var(--dbd);
	}
	.mp-timestamp-item {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		padding: 8px 14px;
		background: transparent;
		border: none;
		border-top: 1px solid transparent;
		cursor: pointer;
		transition: background 0.12s;
		text-align: left;
	}
	.mp-timestamp-item:first-child {
		border-top: none;
	}
	.mp-timestamp-item:hover {
		background: var(--dbg2);
	}
	.mp-timestamp-item__time {
		font-size: 11px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--dt3);
		min-width: 36px;
		flex-shrink: 0;
	}
	.mp-timestamp-item__label {
		font-size: 12px;
		color: var(--dt2);
	}

	/* ── Add reaction button ──────────────────────────────────── */
	.mp-add-reaction-wrap {
		position: relative;
	}
	.mp-add-reaction-btn {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		padding: 4px 8px;
		border-radius: 20px;
		border: 1px dashed var(--dbd);
		background: transparent;
		color: var(--dt3);
		cursor: pointer;
		transition: border-color 0.12s, color 0.12s;
	}
	.mp-add-reaction-btn:hover {
		border-color: var(--dbd2);
		color: var(--dt2);
	}
	.mp-emoji-picker {
		position: absolute;
		bottom: calc(100% + 6px);
		left: 0;
		display: flex;
		gap: 2px;
		padding: 6px 8px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
		z-index: 20;
	}
	.mp-emoji-picker__item {
		width: 30px;
		height: 30px;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: background 0.1s, transform 0.1s;
	}
	.mp-emoji-picker__item:hover {
		background: var(--dbg2);
		transform: scale(1.2);
	}

	/* ── People sidebar ───────────────────────────────────────── */
	.mp-people-sidebar {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
		width: 100%;
		max-width: 280px;
		display: flex;
		flex-direction: column;
	}
	.mp-people-search {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		border-bottom: 1px solid var(--dbd);
	}
	.mp-people-search__icon {
		color: var(--dt4);
		flex-shrink: 0;
	}
	.mp-people-search__input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 13px;
		color: var(--dt);
		min-width: 0;
	}
	.mp-people-search__input::placeholder {
		color: var(--dt4);
	}
	.mp-people-list {
		display: flex;
		flex-direction: column;
	}
	.mp-person-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		border-top: 1px solid var(--dbd);
		background: transparent;
		border-left: none;
		border-right: none;
		border-bottom: none;
		cursor: pointer;
		transition: background 0.12s;
		text-align: left;
		width: 100%;
	}
	.mp-person-row:first-child {
		border-top: none;
	}
	.mp-person-row:hover {
		background: var(--dbg2);
	}
	.mp-person-row--active {
		background: color-mix(in srgb, var(--dbd2) 10%, var(--dbg));
	}
	.mp-person-row__info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.mp-person-row__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.mp-person-row__title {
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.mp-person-row__socials {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
	}

	/* ── Social dots ──────────────────────────────────────────── */
	.mp-social-dot {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		font-size: 9px;
		font-weight: 800;
		cursor: default;
		line-height: 1;
	}
	.mp-social-dot--li {
		background: rgba(10, 102, 194, 0.18);
		color: #4a9fd4;
		border: 1px solid rgba(10, 102, 194, 0.25);
	}
	.mp-social-dot--x {
		background: rgba(255, 255, 255, 0.07);
		color: var(--dt2);
		border: 1px solid var(--dbd);
	}
	.mp-social-dot--xs {
		width: 15px;
		height: 15px;
		font-size: 8px;
	}

	/* ── People "also ask" ────────────────────────────────────── */
	.mp-people-empty {
		padding: 14px 12px;
		font-size: 12px;
		color: var(--dt4);
		text-align: center;
	}
	.mp-people-also-ask {
		border-top: 1px solid var(--dbd);
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.mp-people-also-ask__label {
		font-size: 10px;
		font-weight: 700;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		margin-bottom: 6px;
	}
	.mp-paa-item {
		display: block;
		width: 100%;
		text-align: left;
		padding: 5px 6px;
		font-size: 11px;
		color: var(--dt3);
		background: transparent;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.12s, color 0.12s;
		line-height: 1.4;
	}
	.mp-paa-item:hover {
		background: var(--dbg2);
		color: var(--dt2);
	}

	/* ── Contact card ─────────────────────────────────────────── */
	.mp-contact-card {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		padding: 20px;
		width: 100%;
		max-width: 260px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}
	.mp-contact-card--empty {
		justify-content: center;
		min-height: 200px;
		color: var(--dt3);
		opacity: 0.7;
	}
	.mp-contact-card__avatar-wrap {
		margin-bottom: 8px;
	}
	.mp-contact-card__name {
		font-size: 16px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		text-align: center;
	}
	.mp-contact-card__title-line {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-wrap: wrap;
		justify-content: center;
	}
	.mp-contact-card__role {
		font-size: 12px;
		color: var(--dt2);
		font-weight: 500;
	}
	.mp-contact-card__sep {
		color: var(--dt4);
		font-size: 12px;
	}
	.mp-contact-card__company {
		font-size: 12px;
		color: var(--dt3);
	}
	.mp-contact-card__location {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt4);
		margin-top: 2px;
	}
	.mp-contact-card__divider {
		width: 100%;
		height: 1px;
		background: var(--dbd);
		margin: 6px 0;
	}
	.mp-contact-card__details {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.mp-contact-detail {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: var(--dt3);
		text-decoration: none;
		padding: 4px 6px;
		border-radius: 7px;
		transition: background 0.12s, color 0.12s;
		word-break: break-all;
	}
	.mp-contact-detail:hover {
		background: var(--dbg2);
		color: var(--dt2);
	}
	.mp-contact-detail svg {
		flex-shrink: 0;
		color: var(--dt4);
	}
	.mp-contact-card__socials {
		display: flex;
		gap: 6px;
		width: 100%;
		margin-top: 2px;
	}
	.mp-contact-social-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		flex: 1;
		justify-content: center;
		padding: 6px 10px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 600;
		text-decoration: none;
		transition: background 0.12s;
		border: 1px solid var(--dbd);
	}
	.mp-contact-social-btn--li {
		background: rgba(10, 102, 194, 0.1);
		color: #4a9fd4;
		border-color: rgba(10, 102, 194, 0.2);
	}
	.mp-contact-social-btn--li:hover {
		background: rgba(10, 102, 194, 0.18);
	}
	.mp-contact-social-btn--x {
		background: var(--dbg2);
		color: var(--dt2);
	}
	.mp-contact-social-btn--x:hover {
		background: var(--dbd);
	}

	/* ── Experience section ───────────────────────────────────── */
	.mp-experience {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.mp-experience__label {
		font-size: 10px;
		font-weight: 700;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		margin-bottom: 8px;
	}
	.mp-experience-item {
		display: flex;
		gap: 10px;
		padding: 8px 0;
		align-items: flex-start;
	}
	.mp-experience-item--bordered {
		border-top: 1px solid var(--dbd);
	}
	.mp-experience-item__company-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dbd2);
		border: 1.5px solid var(--dbd);
		margin-top: 4px;
		flex-shrink: 0;
	}
	.mp-experience-item__role {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}
	.mp-experience-item__company {
		font-size: 11px;
		color: var(--dt3);
		margin-top: 1px;
	}
	.mp-experience-item__dates {
		font-size: 10px;
		color: var(--dt4);
		margin-top: 2px;
	}

	/* ── Mini meeting card (in-context) ──────────────────────── */
	.mp-mini-meeting {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
		width: 100%;
		max-width: 300px;
	}
	.mp-mini-meeting__header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		border-bottom: 1px solid var(--dbd);
	}
	.mp-mini-meeting__live {
		margin-left: auto;
		font-size: 9px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #f87171;
		background: rgba(248, 113, 113, 0.12);
		border: 1px solid rgba(248, 113, 113, 0.25);
		border-radius: 4px;
		padding: 2px 6px;
		flex-shrink: 0;
	}
	.mp-mini-video {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #0a0a14;
		overflow: hidden;
	}
	.mp-mini-video__caption {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 5px 10px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
		font-size: 10px;
		color: rgba(255, 255, 255, 0.85);
		font-style: italic;
	}

	/* ── People panel (in-context) ────────────────────────────── */
	.mp-people-panel {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		overflow: hidden;
		width: 100%;
		max-width: 220px;
		display: flex;
		flex-direction: column;
	}
	.mp-people-panel__title {
		padding: 10px 12px;
		font-size: 11px;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		border-bottom: 1px solid var(--dbd);
	}
	.mp-person-compact {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-top: 1px solid var(--dbd);
	}
	.mp-person-compact:first-of-type {
		border-top: none;
	}
	.mp-person-compact__info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.mp-person-compact__name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.mp-person-compact__role {
		font-size: 10px;
		color: var(--dt4);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
