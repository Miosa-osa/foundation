<script lang="ts">
	// ── Mood Tracker State ────────────────────────────────────────────
	type Mood = 'terrible' | 'bad' | 'okay' | 'good' | 'great';
	let selectedMood = $state<Mood>('good');

	const moods: { id: Mood; svgPath: string; label: string }[] = [
		{ id: 'terrible', svgPath: 'M8 14s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01M12 2a10 10 0 100 20A10 10 0 0012 2z', label: 'Terrible' },
		{ id: 'bad',      svgPath: 'M8 15s1.5-1.5 4-1.5 4 1.5 4 1.5M9 9h.01M15 9h.01M12 2a10 10 0 100 20A10 10 0 0012 2z', label: 'Bad' },
		{ id: 'okay',     svgPath: 'M8 15h8M9 9h.01M15 9h.01M12 2a10 10 0 100 20A10 10 0 0012 2z', label: 'Okay' },
		{ id: 'good',     svgPath: 'M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M12 2a10 10 0 100 20A10 10 0 0012 2z', label: 'Good' },
		{ id: 'great',    svgPath: 'M8 13s1.5 3 4 3 4-3 4-3M9 9h.01M15 9h.01M12 2a10 10 0 100 20A10 10 0 0012 2z', label: 'Great' },
	];

	// Mood heatmap: 0 = none, 1 = terrible, 2 = bad, 3 = okay, 4 = good, 5 = great
	const moodCalendar: (0 | 1 | 2 | 3 | 4 | 5)[] = [
		0, 0, 4, 5, 3, 4, 2,
		5, 4, 4, 3, 5, 5, 4,
		3, 2, 5, 4, 4, 5, 3,
		4, 5, 3, 4, 5, 4, 0,
		4, 5, 0, 0, 0, 0, 0,
	];

	// ── Entry Editor State ────────────────────────────────────────────
	let entryTitle    = $state('API redesign session');
	let entryTimeFrom = $state('09:00');
	let entryTimeTo   = $state('11:30');
	let entryCategory = $state('Work');
	let entryNotes    = $state('## Session Notes\n\nRefactored endpoint structure for v3.\n- Moved auth to middleware\n- Simplified pagination interface');
	let entrySaved    = $state(false);

	function saveEntry() {
		entrySaved = true;
		setTimeout(() => (entrySaved = false), 2000);
	}

	const categories = ['Work', 'Personal', 'Health', 'Learning', 'Creative', 'Admin'];

	// ── Daily Review State ────────────────────────────────────────────
	let reviewRating  = $state(4);
	let reviewWent    = $state('Finished the API redesign ahead of schedule. Deep work session was highly productive. Team standup was efficient and energizing.');
	let reviewImprove = $state('Got pulled into too many Slack threads mid-morning. Could batch async comms better.');
	let reviewTomorrow = $state('1. Review PR from Kai\n2. Write tests for auth middleware\n3. Draft Q2 roadmap outline');
	let gratitudeList = $state('Good coffee this morning, productive pair programming with Mia, clear head after the walk');

	// ── Habits State ─────────────────────────────────────────────────
	const habits = [
		{
			name: 'Exercise',
			icon: 'exercise',
			streak: 12,
			done: [true, true, false, true, true, false, false],
			pct: 71,
		},
		{
			name: 'Read',
			icon: 'read',
			streak: 21,
			done: [true, true, true, true, true, true, false],
			pct: 86,
		},
		{
			name: 'Meditate',
			icon: 'meditate',
			streak: 5,
			done: [false, true, true, true, true, false, false],
			pct: 57,
		},
		{
			name: 'Journal',
			icon: 'journal',
			streak: 34,
			done: [true, true, true, true, true, false, false],
			pct: 93,
		},
		{
			name: 'No Sugar',
			icon: 'leaf',
			streak: 3,
			done: [true, false, false, true, true, false, false],
			pct: 43,
		},
	];

	let habitDone = $state(habits.map(h => [...h.done]));

	function toggleHabit(hi: number, di: number) {
		habitDone[hi][di] = !habitDone[hi][di];
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Daily Log &amp; Journal</h2>
	<p class="ds-desc">
		Day view timeline, weekly overview, mood tracking, entry editor, end-of-day review,
		and habit streaks. Pure CSS patterns for personal productivity interfaces.
	</p>

	<!-- ── 1. Day View ──────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Day View</h3>
		<p class="ds-card__sub">Full-day timeline with time-blocked entries, categories, tags, and duration chips</p>

		<div class="dl-day">
			<!-- Date Header -->
			<div class="dl-day__header">
				<div class="dl-day__header-left">
					<button class="btn-compact btn-compact-ghost btn-compact-icon dl-day__nav-btn" aria-label="Previous day">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
						</svg>
					</button>
					<div class="dl-day__date-block">
						<span class="dl-day__weekday">Friday</span>
						<span class="dl-day__date">March 6, 2026</span>
					</div>
					<button class="btn-compact btn-compact-ghost btn-compact-icon dl-day__nav-btn" aria-label="Next day">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</button>
				</div>
				<div class="dl-day__header-right">
					<span class="dl-day__stat">8 entries</span>
					<span class="dl-day__stat dl-day__stat--focus">5h 40m focus</span>
					<div class="dl-day__weather">
						<span class="dl-day__weather-icon">
							<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1M18.36 5.64l-.7.7M21 12h-1M18.36 18.36l-.7-.7M12 21v-1M5.64 18.36l.7-.7M3 12h1M5.64 5.64l.7.7M12 8a4 4 0 110 8 4 4 0 010-8z"/>
							</svg>
						</span>
						<span class="dl-day__weather-temp">12°C</span>
					</div>
				</div>
			</div>

			<!-- Timeline -->
			<div class="dl-day__timeline">
				<!-- 9:00 -->
				<div class="dl-entry dl-entry--meeting">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time">9:00</span>
						<div class="dl-entry__spine"></div>
					</div>
					<div class="dl-entry__card">
						<div class="dl-entry__card-header">
							<span class="dl-entry__title">Team Standup</span>
							<span class="dl-entry__duration">30m</span>
						</div>
						<div class="dl-entry__meta">
							<span class="dl-entry__tag dl-entry__tag--meeting">Meeting</span>
							<span class="dl-entry__tag">Engineering</span>
							<span class="dl-entry__tag">Daily</span>
						</div>
						<p class="dl-entry__notes">Sprint progress review. Blocked on staging env — Liam to fix by noon.</p>
					</div>
				</div>

				<!-- 9:30 -->
				<div class="dl-entry dl-entry--focus">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time">9:30</span>
						<div class="dl-entry__spine dl-entry__spine--tall"></div>
					</div>
					<div class="dl-entry__card">
						<div class="dl-entry__card-header">
							<span class="dl-entry__title">Deep Work — API Redesign</span>
							<span class="dl-entry__duration">2h</span>
						</div>
						<div class="dl-entry__meta">
							<span class="dl-entry__tag dl-entry__tag--focus">Focus</span>
							<span class="dl-entry__tag">Work</span>
							<span class="dl-entry__tag">v3</span>
						</div>
						<p class="dl-entry__notes">Refactored auth middleware and pagination. Shipped 3 endpoints.</p>
					</div>
				</div>

				<!-- 11:30 -->
				<div class="dl-entry dl-entry--note">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time">11:30</span>
						<div class="dl-entry__spine"></div>
					</div>
					<div class="dl-entry__card">
						<div class="dl-entry__card-header">
							<span class="dl-entry__title">Idea: event sourcing for audit trail</span>
							<span class="dl-entry__duration">note</span>
						</div>
						<div class="dl-entry__meta">
							<span class="dl-entry__tag dl-entry__tag--note">Insight</span>
							<span class="dl-entry__tag">Architecture</span>
						</div>
					</div>
				</div>

				<!-- 12:00 -->
				<div class="dl-entry dl-entry--break">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time">12:00</span>
						<div class="dl-entry__spine"></div>
					</div>
					<div class="dl-entry__card">
						<div class="dl-entry__card-header">
							<span class="dl-entry__title">Lunch + walk outside</span>
							<span class="dl-entry__duration">45m</span>
						</div>
						<div class="dl-entry__meta">
							<span class="dl-entry__tag dl-entry__tag--break">Break</span>
							<span class="dl-entry__tag">Health</span>
						</div>
					</div>
				</div>

				<!-- 14:00 -->
				<div class="dl-entry dl-entry--task">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time">14:00</span>
						<div class="dl-entry__spine dl-entry__spine--tall"></div>
					</div>
					<div class="dl-entry__card">
						<div class="dl-entry__card-header">
							<span class="dl-entry__title">Code review — auth PR #248</span>
							<span class="dl-entry__duration">1h 30m</span>
						</div>
						<div class="dl-entry__meta">
							<span class="dl-entry__tag dl-entry__tag--task">Task</span>
							<span class="dl-entry__tag">Review</span>
						</div>
						<p class="dl-entry__notes">Approved with 3 comments. Merged after Kai addressed feedback.</p>
					</div>
				</div>

				<!-- 17:00 -->
				<div class="dl-entry dl-entry--task">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time">17:00</span>
						<div class="dl-entry__spine"></div>
					</div>
					<div class="dl-entry__card">
						<div class="dl-entry__card-header">
							<span class="dl-entry__title">Write payment service tests</span>
							<span class="dl-entry__duration">45m</span>
						</div>
						<div class="dl-entry__meta">
							<span class="dl-entry__tag dl-entry__tag--task">Task</span>
							<span class="dl-entry__tag">Testing</span>
							<span class="dl-entry__tag dl-entry__tag--done">Done</span>
						</div>
					</div>
				</div>

				<!-- Quick add -->
				<div class="dl-entry dl-entry--add">
					<div class="dl-entry__time-col">
						<span class="dl-entry__time dl-entry__time--muted">17:45</span>
					</div>
					<div class="dl-entry__quick-add">
						<span class="dl-entry__quick-plus">+</span>
						<input class="dl-entry__quick-input" type="text" placeholder="Add entry for today…" aria-label="Add log entry" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 2. Weekly Overview ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Weekly Overview</h3>
		<p class="ds-card__sub">7-column summary grid with mood indicators, entry counts, highlights, and completion bars</p>

		<div class="dl-week">
			<div class="dl-week__streak-bar">
				<span class="dl-week__streak-label">Current streak</span>
				<span class="dl-week__streak-val">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display:inline;vertical-align:-2px;color:#f97316;">
						<path d="M12 2C9.5 6 7 8.5 7 12a5 5 0 0010 0c0-2-1-3.5-2-5-1 2-2 3-2 4a2 2 0 01-2-2c0-2 1-4 1-4S9 10 9 13a3 3 0 006 0c0-3-3-11-3-11z"/>
					</svg>
					12 days
				</span>
				<span class="dl-week__streak-divider"></span>
				<span class="dl-week__streak-label">Total logged this week</span>
				<span class="dl-week__streak-val">43 entries · 26.5h tracked</span>
			</div>

			<div class="dl-week__grid">
				{#each [
					{ day: 'Mon', date: 2,  mood: 'good',     count: 8,  hrs: '6.5h', highlight: 'Shipped auth v2',   pct: 70 },
					{ day: 'Tue', date: 3,  mood: 'great',    count: 12, hrs: '7.0h', highlight: 'Deep work day',     pct: 92 },
					{ day: 'Wed', date: 4,  mood: 'okay',     count: 6,  hrs: '4.0h', highlight: 'Meeting heavy',     pct: 45 },
					{ day: 'Thu', date: 5,  mood: 'good',     count: 10, hrs: '6.0h', highlight: 'Bug fix sprint',    pct: 78 },
					{ day: 'Fri', date: 6,  mood: 'great',    count: 7,  hrs: '5.5h', highlight: 'API redesign',      pct: 85, today: true },
					{ day: 'Sat', date: 7,  mood: 'none',     count: 0,  hrs: '--',   highlight: '--',                pct: 0,  future: true },
					{ day: 'Sun', date: 8,  mood: 'none',     count: 0,  hrs: '--',   highlight: '--',                pct: 0,  future: true },
				] as col}
					<div
						class="dl-week__col"
						class:dl-week__col--today={col.today}
						class:dl-week__col--future={col.future}
					>
						<span class="dl-week__day">{col.day}</span>
						<span class="dl-week__date">{col.date}</span>
						<span
							class="dl-week__mood"
							class:dl-week__mood--great={col.mood === 'great'}
							class:dl-week__mood--good={col.mood === 'good'}
							class:dl-week__mood--okay={col.mood === 'okay'}
							class:dl-week__mood--bad={col.mood === 'bad'}
							class:dl-week__mood--none={col.mood === 'none'}
						></span>
						<span class="dl-week__count">{col.count > 0 ? col.count + ' entries' : '--'}</span>
						<span class="dl-week__hrs">{col.hrs}</span>
						<span class="dl-week__highlight">{col.highlight}</span>
						<div class="dl-week__bar-track">
							<div
								class="dl-week__bar-fill"
								class:dl-week__bar-fill--today={col.today}
								style="width: {col.pct}%"
							></div>
						</div>
						<span class="dl-week__pct">{col.pct > 0 ? col.pct + '%' : '--'}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 3. Mood Tracker ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Mood Tracker</h3>
		<p class="ds-card__sub">Emoji mood selector, monthly heatmap calendar, and trend summary</p>

		<div class="dl-mood">
			<!-- Mood selector row -->
			<div class="dl-mood__picker">
				<span class="dl-mood__picker-label">How are you feeling today?</span>
				<div class="dl-mood__emoji-row">
					{#each moods as m}
						<button
							class="dl-mood__emoji-btn"
							class:dl-mood__emoji-btn--active={selectedMood === m.id}
							onclick={() => selectedMood = m.id}
							aria-label={m.label}
							aria-pressed={selectedMood === m.id}
						>
							<svg class="dl-mood__emoji" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d={m.svgPath}/>
							</svg>
							<span class="dl-mood__emoji-label">{m.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Heatmap -->
			<div class="dl-mood__heatmap">
				<div class="dl-mood__heatmap-header">
					<span class="dl-mood__heatmap-title">March 2026 — Mood Calendar</span>
					<div class="dl-mood__legend">
						{#each [
							{ level: 1, label: 'Terrible' },
							{ level: 2, label: 'Bad' },
							{ level: 3, label: 'Okay' },
							{ level: 4, label: 'Good' },
							{ level: 5, label: 'Great' },
						] as leg}
							<span class="dl-mood__legend-item">
								<span class="dl-mood__legend-dot dl-mood__legend-dot--{leg.level}"></span>
								<span class="dl-mood__legend-label">{leg.label}</span>
							</span>
						{/each}
					</div>
				</div>

				<div class="dl-mood__day-labels">
					{#each ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] as d}
						<span class="dl-mood__day-label">{d}</span>
					{/each}
				</div>

				<div class="dl-mood__grid">
					<!-- 2 leading empties (March 2026 starts Tuesday) -->
					<div class="dl-mood__cell dl-mood__cell--empty"></div>
					<div class="dl-mood__cell dl-mood__cell--empty"></div>
					{#each moodCalendar as level, i}
						<div
							class="dl-mood__cell"
							class:dl-mood__cell--0={level === 0}
							class:dl-mood__cell--1={level === 1}
							class:dl-mood__cell--2={level === 2}
							class:dl-mood__cell--3={level === 3}
							class:dl-mood__cell--4={level === 4}
							class:dl-mood__cell--5={level === 5}
							class:dl-mood__cell--today={i === 5}
							title="March {i + 1}"
						>
							<span class="dl-mood__cell-num">{i + 1}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Trend summary -->
			<div class="dl-mood__trend">
				<div class="dl-mood__trend-stat">
					<span class="dl-mood__trend-val">4.1</span>
					<span class="dl-mood__trend-lbl">Avg mood (March)</span>
				</div>
				<div class="dl-mood__trend-stat">
					<span class="dl-mood__trend-val" style="display:flex;align-items:center;gap:4px;">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M8 13s1.5 3 4 3 4-3 4-3M9 9h.01M15 9h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
						</svg>
						18
					</span>
					<span class="dl-mood__trend-lbl">Great days</span>
				</div>
				<div class="dl-mood__trend-stat">
					<span class="dl-mood__trend-val">2</span>
					<span class="dl-mood__trend-lbl">Tough days</span>
				</div>
				<div class="dl-mood__trend-stat">
					<span class="dl-mood__trend-val">↑ 12%</span>
					<span class="dl-mood__trend-lbl">vs last month</span>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 4. Entry Editor ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Entry Editor</h3>
		<p class="ds-card__sub">Rich form for logging time blocks: title, time range, category, tags, and markdown notes</p>

		<div class="dl-editor">
			<div class="dl-editor__row">
				<div class="dl-editor__field dl-editor__field--grow">
					<label class="dl-editor__label" for="dl-title">Title</label>
					<input
						id="dl-title"
						class="dl-editor__input"
						type="text"
						bind:value={entryTitle}
						placeholder="What did you work on?"
					/>
				</div>
			</div>

			<div class="dl-editor__row dl-editor__row--cols">
				<div class="dl-editor__field">
					<label class="dl-editor__label" for="dl-from">From</label>
					<input
						id="dl-from"
						class="dl-editor__input dl-editor__input--time"
						type="time"
						bind:value={entryTimeFrom}
					/>
				</div>
				<span class="dl-editor__time-sep">→</span>
				<div class="dl-editor__field">
					<label class="dl-editor__label" for="dl-to">To</label>
					<input
						id="dl-to"
						class="dl-editor__input dl-editor__input--time"
						type="time"
						bind:value={entryTimeTo}
					/>
				</div>
				<div class="dl-editor__field dl-editor__field--grow">
					<label class="dl-editor__label" for="dl-category">Category</label>
					<select id="dl-category" class="dl-editor__select" bind:value={entryCategory}>
						{#each categories as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="dl-editor__row">
				<div class="dl-editor__field dl-editor__field--grow">
					<label class="dl-editor__label">Tags</label>
					<div class="dl-editor__tag-row">
						{#each ['API', 'Deep Work', 'v3', 'Backend'] as tag}
							<span class="dl-editor__tag">{tag} <button class="dl-editor__tag-remove" aria-label="Remove tag">×</button></span>
						{/each}
						<input class="dl-editor__tag-input" type="text" placeholder="Add tag…" aria-label="Add tag" />
					</div>
				</div>
			</div>

			<div class="dl-editor__row">
				<div class="dl-editor__field dl-editor__field--grow">
					<label class="dl-editor__label" for="dl-notes">Notes <span class="dl-editor__md-hint">Markdown supported</span></label>
					<textarea
						id="dl-notes"
						class="dl-editor__textarea"
						rows="6"
						bind:value={entryNotes}
						placeholder="Add notes, links, or reflections…"
					></textarea>
				</div>
			</div>

			<div class="dl-editor__footer">
				<div class="dl-editor__footer-left">
					<button class="btn-compact btn-compact-ghost dl-editor__action-btn" aria-label="Attach file">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
						</svg>
						Attach
					</button>
					<button class="btn-compact btn-compact-ghost dl-editor__action-btn" aria-label="Set reminder">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17H20L18.595 15.595A1.98 1.98 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
						</svg>
						Remind
					</button>
				</div>
				<div class="dl-editor__footer-right">
					<button class="btn-compact btn-compact-ghost" aria-label="Discard draft">Discard</button>
					<button
						class="btn-pill btn-pill-primary btn-pill-sm dl-editor__primary-btn"
						class:dl-editor__primary-btn--saved={entrySaved}
						onclick={saveEntry}
						aria-label="Save entry"
					>
						{#if entrySaved}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline;vertical-align:-2px;">
								<path d="M20 6L9 17l-5-5"/>
							</svg>
							Saved
						{:else}
							Save Entry
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 5. Daily Review ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Daily Review</h3>
		<p class="ds-card__sub">End-of-day reflection card: wins, improvements, tomorrow's priorities, star rating, and gratitude</p>

		<div class="dl-review">
			<!-- Stats strip -->
			<div class="dl-review__stats">
				{#each [
					{ value: '7', label: 'Tasks Done', color: '#22c55e', svgPath: 'M20 6L9 17l-5-5' },
					{ value: '5h 40m', label: 'Focus Time', color: '#f59e0b', svgPath: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2' },
					{ value: '3', label: 'Meetings', color: '#a855f7', svgPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
					{ value: '8', label: 'Notes', color: '#3b82f6', svgPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
				] as s}
					<div class="dl-review__stat">
						<span class="dl-review__stat-icon" style="background: {s.color}22; color: {s.color}">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d={s.svgPath}/>
							</svg>
						</span>
						<span class="dl-review__stat-val">{s.value}</span>
						<span class="dl-review__stat-lbl">{s.label}</span>
					</div>
				{/each}
			</div>

			<!-- Rating -->
			<div class="dl-review__rating-row">
				<span class="dl-review__rating-label">Overall day rating</span>
				<div class="dl-review__stars">
					{#each [1, 2, 3, 4, 5] as star}
						<button
							class="dl-review__star"
							class:dl-review__star--filled={star <= reviewRating}
							onclick={() => reviewRating = star}
							aria-label="Rate {star} star{star > 1 ? 's' : ''}"
						>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
						</svg>
					</button>
					{/each}
				</div>
				<span class="dl-review__rating-val">{reviewRating}/5</span>
			</div>

			<!-- Reflection fields -->
			<div class="dl-review__fields">
				<div class="dl-review__field">
					<label class="dl-review__field-label dl-review__field-label--green">
						<span class="dl-review__field-icon">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
								<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.9 2.4-7.4L2 9.4h7.6z"/>
							</svg>
						</span> What went well?
					</label>
					<textarea class="dl-review__textarea" rows="3" bind:value={reviewWent}></textarea>
				</div>

				<div class="dl-review__field">
					<label class="dl-review__field-label dl-review__field-label--amber">
						<span class="dl-review__field-icon">↻</span> What could improve?
					</label>
					<textarea class="dl-review__textarea" rows="3" bind:value={reviewImprove}></textarea>
				</div>

				<div class="dl-review__field">
					<label class="dl-review__field-label dl-review__field-label--blue">
						<span class="dl-review__field-icon">→</span> Tomorrow's priorities
					</label>
					<textarea class="dl-review__textarea dl-review__textarea--mono" rows="4" bind:value={reviewTomorrow}></textarea>
				</div>

				<div class="dl-review__field">
					<label class="dl-review__field-label dl-review__field-label--purple">
						<span class="dl-review__field-icon">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
							</svg>
						</span> Gratitude list
					</label>
					<textarea class="dl-review__textarea" rows="2" bind:value={gratitudeList}></textarea>
				</div>
			</div>

			<!-- AI insight strip -->
			<div class="dl-review__ai">
				<div class="dl-review__ai-avatar"></div>
				<div class="dl-review__ai-body">
					<span class="dl-review__ai-label">Daily Insight</span>
					<p class="dl-review__ai-text">
						Your focus time was 30% above your weekly average. Morning deep work sessions remain your peak productivity window — consider protecting that block tomorrow.
					</p>
				</div>
			</div>

			<div class="dl-review__actions">
				<button class="btn-compact btn-compact-ghost">View Full Report</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Save &amp; Plan Tomorrow</button>
			</div>
		</div>
	</div>

	<!-- ── 6. Habits & Streaks ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Habits &amp; Streaks</h3>
		<p class="ds-card__sub">Weekly habit grid with filled/empty circles, streak badges, and completion bars</p>

		<div class="dl-habits">
			<!-- Column headers -->
			<div class="dl-habits__header">
				<div class="dl-habits__habit-col"></div>
				{#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as d, i}
					<div class="dl-habits__day-col" class:dl-habits__day-col--today={i === 4}>
						<span class="dl-habits__day-label">{d}</span>
						<span class="dl-habits__day-date">{2 + i}</span>
					</div>
				{/each}
				<div class="dl-habits__streak-col">Streak</div>
				<div class="dl-habits__pct-col">Week</div>
			</div>

			<!-- Habit rows -->
			{#each habits as habit, hi}
				<div class="dl-habits__row">
					<div class="dl-habits__habit-info">
						<span class="dl-habits__habit-icon">
							{#if habit.icon === 'exercise'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M6 9l6 6 6-6"/><path d="M6 3l6 6 6-6"/>
								</svg>
							{:else if habit.icon === 'read'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
								</svg>
							{:else if habit.icon === 'meditate'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<circle cx="12" cy="7" r="3"/><path d="M6 21c0-3.31 2.69-6 6-6s6 2.69 6 6"/>
								</svg>
							{:else if habit.icon === 'journal'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
								</svg>
							{:else}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M17 8C8 10 5.9 16.17 3.82 19.43A10 10 0 0021 12c0-.47-.04-.94-.1-1.4C20.25 9 18.76 7.5 17 8z"/>
								</svg>
							{/if}
						</span>
						<span class="dl-habits__habit-name">{habit.name}</span>
					</div>
					{#each [0,1,2,3,4,5,6] as di}
						<button
							class="dl-habits__dot-btn"
							class:dl-habits__dot-btn--today={di === 4}
							class:dl-habits__dot-btn--future={di > 4}
							onclick={() => toggleHabit(hi, di)}
							aria-label="{habit.name} on day {di + 1}: {habitDone[hi][di] ? 'done' : 'not done'}"
							aria-pressed={habitDone[hi][di]}
						>
							<span
								class="dl-habits__dot"
								class:dl-habits__dot--done={habitDone[hi][di]}
								class:dl-habits__dot--future={di > 4}
							></span>
						</button>
					{/each}
					<div class="dl-habits__streak-badge">
						<span class="dl-habits__streak-num">{habit.streak}</span>
						<span class="dl-habits__streak-unit">d</span>
						{#if habit.streak >= 20}
							<span class="dl-habits__streak-fire">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
								<path d="M12 2C9.5 6 7 8.5 7 12a5 5 0 0010 0c0-2-1-3.5-2-5-1 2-2 3-2 4a2 2 0 01-2-2c0-2 1-4 1-4S9 10 9 13a3 3 0 006 0c0-3-3-11-3-11z"/>
							</svg>
						</span>
						{/if}
					</div>
					<div class="dl-habits__pct-bar">
						<div class="dl-habits__pct-fill" style="width: {habit.pct}%"></div>
						<span class="dl-habits__pct-val">{habit.pct}%</span>
					</div>
				</div>
			{/each}

			<!-- Summary footer -->
			<div class="dl-habits__footer">
				<div class="dl-habits__footer-stat">
					<span class="dl-habits__footer-val">70%</span>
					<span class="dl-habits__footer-lbl">Avg completion</span>
				</div>
				<div class="dl-habits__footer-stat">
					<span class="dl-habits__footer-val">34 days</span>
					<span class="dl-habits__footer-lbl">Longest streak</span>
				</div>
				<div class="dl-habits__footer-stat">
					<span class="dl-habits__footer-val">3/5</span>
					<span class="dl-habits__footer-lbl">Today's habits</span>
				</div>
				<button class="btn-compact btn-compact-ghost dl-habits__add-btn">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
					</svg>
					Add Habit
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	/* ================================================================
	   Day View
	   ================================================================ */
	.dl-day {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.dl-day__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.875rem 1rem;
		background: var(--dbg2);
		border-radius: 10px;
		border: 1px solid var(--dbd);
	}

	.dl-day__header-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.dl-day__date-block {
		display: flex;
		flex-direction: column;
	}

	.dl-day__weekday {
		font-size: 1rem;
		font-weight: 700;
		color: var(--dt);
		line-height: 1.2;
	}

	.dl-day__date {
		font-size: 0.78rem;
		color: var(--dt3);
	}

	.dl-day__header-right {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.dl-day__stat {
		font-size: 0.78rem;
		color: var(--dt3);
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
		background: var(--dbg3);
	}

	.dl-day__stat--focus {
		color: #f59e0b;
		background: rgba(245, 158, 11, 0.1);
	}

	.dl-day__weather {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.dl-day__weather-icon {
		font-size: 1rem;
	}

	.dl-day__weather-temp {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--dt2);
	}

	/* Timeline */
	.dl-day__timeline {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.dl-entry {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}

	.dl-entry__time-col {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0;
		min-width: 42px;
		padding-top: 0.65rem;
	}

	.dl-entry__time {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.dl-entry__time--muted {
		opacity: 0.45;
	}

	.dl-entry__spine {
		width: 2px;
		height: 28px;
		background: var(--dbd);
		margin-top: 4px;
		margin-right: 1px;
		border-radius: 1px;
	}

	.dl-entry__spine--tall {
		height: 52px;
	}

	.dl-entry__card {
		flex: 1;
		padding: 0.65rem 0.85rem;
		border-radius: 9px;
		border-left-width: 3px;
		border-left-style: solid;
		background: var(--dbg2);
		border-top: 1px solid transparent;
		border-right: 1px solid transparent;
		border-bottom: 1px solid transparent;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		transition: border-color 0.15s;
	}

	.dl-entry__card:hover {
		border-color: var(--dbd) !important;
	}

	.dl-entry--meeting .dl-entry__card { border-left-color: #a855f7; }
	.dl-entry--focus .dl-entry__card   { border-left-color: #f59e0b; }
	.dl-entry--task .dl-entry__card    { border-left-color: #22c55e; }
	.dl-entry--note .dl-entry__card    { border-left-color: #3b82f6; }
	.dl-entry--break .dl-entry__card   { border-left-color: #6b7280; }

	.dl-entry__card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.dl-entry__title {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--dt);
	}

	.dl-entry__duration {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--dt4);
		background: var(--dbg3);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		white-space: nowrap;
	}

	.dl-entry__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.dl-entry__tag {
		font-size: 0.68rem;
		font-weight: 600;
		padding: 0.1rem 0.45rem;
		border-radius: 999px;
		background: var(--dbg3);
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.dl-entry__tag--meeting { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
	.dl-entry__tag--focus   { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
	.dl-entry__tag--task    { background: rgba(34, 197, 94, 0.15);  color: #4ade80; }
	.dl-entry__tag--note    { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
	.dl-entry__tag--break   { background: rgba(107, 114, 128, 0.15); color: #9ca3af; }
	.dl-entry__tag--done    { background: rgba(34, 197, 94, 0.12);  color: #4ade80; }

	.dl-entry__notes {
		font-size: 0.8rem;
		color: var(--dt3);
		margin: 0;
		line-height: 1.5;
	}

	/* Quick add row */
	.dl-entry--add {
		align-items: center;
	}

	.dl-entry__quick-add {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.75rem;
		border-radius: 8px;
		border: 1px dashed var(--dbd);
		background: transparent;
		transition: border-color 0.15s;
	}

	.dl-entry__quick-add:focus-within {
		border-color: #3b82f6;
	}

	.dl-entry__quick-plus {
		font-size: 1rem;
		color: var(--dt4);
		line-height: 1;
	}

	.dl-entry__quick-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.85rem;
		color: var(--dt2);
		font-family: inherit;
	}

	.dl-entry__quick-input::placeholder {
		color: var(--dt4);
	}

	/* ================================================================
	   Weekly Overview
	   ================================================================ */
	.dl-week {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.dl-week__streak-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 1rem;
		background: var(--dbg2);
		border-radius: 9px;
		border: 1px solid var(--dbd);
		flex-wrap: wrap;
	}

	.dl-week__streak-label {
		font-size: 0.75rem;
		color: var(--dt3);
	}

	.dl-week__streak-val {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--dt);
	}

	.dl-week__streak-divider {
		width: 1px;
		height: 16px;
		background: var(--dbd);
	}

	.dl-week__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.5rem;
	}

	.dl-week__col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		padding: 0.85rem 0.35rem;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid transparent;
		cursor: pointer;
		transition: border-color 0.15s;
	}

	.dl-week__col:hover:not(.dl-week__col--future) {
		border-color: var(--dbd);
	}

	.dl-week__col--today {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.07);
	}

	.dl-week__col--future {
		opacity: 0.35;
		pointer-events: none;
	}

	.dl-week__day {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
	}

	.dl-week__date {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--dt);
	}

	.dl-week__mood {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.dl-week__mood--great { background: #22c55e; }
	.dl-week__mood--good  { background: #3b82f6; }
	.dl-week__mood--okay  { background: #f59e0b; }
	.dl-week__mood--bad   { background: #ef4444; }
	.dl-week__mood--none  { background: transparent; border: 2px dashed var(--dbd2); }

	.dl-week__count,
	.dl-week__hrs {
		font-size: 0.68rem;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
	}

	.dl-week__highlight {
		font-size: 0.68rem;
		color: var(--dt2);
		text-align: center;
		min-height: 1.6em;
		line-height: 1.3;
	}

	.dl-week__bar-track {
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background: var(--dbg3);
		overflow: hidden;
	}

	.dl-week__bar-fill {
		height: 100%;
		border-radius: 2px;
		background: var(--dt3);
		transition: width 0.4s ease;
	}

	.dl-week__bar-fill--today {
		background: #3b82f6;
	}

	.dl-week__pct {
		font-size: 0.66rem;
		font-weight: 600;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
	}

	/* ================================================================
	   Mood Tracker
	   ================================================================ */
	.dl-mood {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Picker */
	.dl-mood__picker {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.dl-mood__picker-label {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--dt2);
	}

	.dl-mood__emoji-row {
		display: flex;
		gap: 0.5rem;
	}

	.dl-mood__emoji-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		padding: 0.65rem 0.85rem;
		border-radius: 10px;
		border: 2px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s, transform 0.15s;
	}

	.dl-mood__emoji-btn:hover {
		border-color: var(--dbd2);
		transform: translateY(-2px);
	}

	.dl-mood__emoji-btn--active {
		border-color: #3b82f6;
		background: rgba(59, 130, 246, 0.1);
	}

	.dl-mood__emoji {
		font-size: 1.5rem;
		line-height: 1;
	}

	.dl-mood__emoji-label {
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	/* Heatmap */
	.dl-mood__heatmap {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.dl-mood__heatmap-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.dl-mood__heatmap-title {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--dt2);
	}

	.dl-mood__legend {
		display: flex;
		gap: 0.65rem;
		flex-wrap: wrap;
	}

	.dl-mood__legend-item {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.dl-mood__legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 3px;
	}

	.dl-mood__legend-dot--1 { background: #ef4444; }
	.dl-mood__legend-dot--2 { background: #f97316; }
	.dl-mood__legend-dot--3 { background: #eab308; }
	.dl-mood__legend-dot--4 { background: #3b82f6; }
	.dl-mood__legend-dot--5 { background: #22c55e; }

	.dl-mood__legend-label {
		font-size: 0.65rem;
		color: var(--dt4);
	}

	.dl-mood__day-labels {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
	}

	.dl-mood__day-label {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--dt4);
		text-align: center;
	}

	.dl-mood__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
	}

	.dl-mood__cell {
		aspect-ratio: 1;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		transition: transform 0.1s;
		position: relative;
	}

	.dl-mood__cell:hover:not(.dl-mood__cell--empty):not(.dl-mood__cell--0) {
		transform: scale(1.1);
	}

	.dl-mood__cell--empty { background: transparent; }
	.dl-mood__cell--0  { background: var(--dbg3); }
	.dl-mood__cell--1  { background: rgba(239, 68, 68, 0.6); }
	.dl-mood__cell--2  { background: rgba(249, 115, 22, 0.6); }
	.dl-mood__cell--3  { background: rgba(234, 179, 8, 0.55); }
	.dl-mood__cell--4  { background: rgba(59, 130, 246, 0.6); }
	.dl-mood__cell--5  { background: rgba(34, 197, 94, 0.65); }

	.dl-mood__cell--today {
		outline: 2px solid var(--dt);
		outline-offset: 1px;
	}

	.dl-mood__cell-num {
		font-size: 0.6rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.65);
	}

	/* Trend */
	.dl-mood__trend {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
	}

	.dl-mood__trend-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.85rem 0.5rem;
		border-radius: 9px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
	}

	.dl-mood__trend-val {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--dt);
	}

	.dl-mood__trend-lbl {
		font-size: 0.68rem;
		color: var(--dt4);
		text-align: center;
	}

	/* ================================================================
	   Entry Editor
	   ================================================================ */
	.dl-editor {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.dl-editor__row {
		display: flex;
		gap: 0.75rem;
	}

	.dl-editor__row--cols {
		align-items: flex-end;
	}

	.dl-editor__field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.dl-editor__field--grow {
		flex: 1;
	}

	.dl-editor__label {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.dl-editor__md-hint {
		font-size: 0.65rem;
		font-weight: 400;
		text-transform: none;
		letter-spacing: 0;
		color: var(--dt4);
		background: var(--dbg3);
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
	}

	.dl-editor__input {
		padding: 0.55rem 0.75rem;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 0.88rem;
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s;
	}

	.dl-editor__input:focus {
		border-color: #3b82f6;
	}

	.dl-editor__input--time {
		width: 100px;
		font-variant-numeric: tabular-nums;
	}

	.dl-editor__time-sep {
		font-size: 0.85rem;
		color: var(--dt4);
		padding-bottom: 0.55rem;
		align-self: flex-end;
	}

	.dl-editor__select {
		padding: 0.55rem 0.75rem;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 0.88rem;
		font-family: inherit;
		outline: none;
		cursor: pointer;
		transition: border-color 0.15s;
	}

	.dl-editor__select:focus {
		border-color: #3b82f6;
	}

	.dl-editor__tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		align-items: center;
		padding: 0.45rem 0.65rem;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		min-height: 38px;
		transition: border-color 0.15s;
	}

	.dl-editor__tag-row:focus-within {
		border-color: #3b82f6;
	}

	.dl-editor__tag {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: rgba(59, 130, 246, 0.15);
		color: #60a5fa;
	}

	.dl-editor__tag-remove {
		background: none;
		border: none;
		color: #60a5fa;
		cursor: pointer;
		padding: 0;
		line-height: 1;
		font-size: 0.9rem;
		opacity: 0.7;
	}

	.dl-editor__tag-remove:hover {
		opacity: 1;
	}

	.dl-editor__tag-input {
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.82rem;
		color: var(--dt2);
		font-family: inherit;
		min-width: 80px;
	}

	.dl-editor__tag-input::placeholder {
		color: var(--dt4);
	}

	.dl-editor__textarea {
		padding: 0.65rem 0.85rem;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 0.85rem;
		font-family: inherit;
		line-height: 1.6;
		resize: vertical;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		transition: border-color 0.15s;
	}

	.dl-editor__textarea:focus {
		border-color: #3b82f6;
	}

	.dl-editor__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.25rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.dl-editor__footer-left,
	.dl-editor__footer-right {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	/* Nav button: 28px square override */
	.dl-day__nav-btn {
		width: 28px !important;
		height: 28px !important;
		padding: 0 !important;
	}

	/* Editor action buttons: align icon+label inline */
	.dl-editor__action-btn {
		gap: 0.35rem !important;
	}

	/* Primary save button: saved state turns green */
	.dl-editor__primary-btn--saved {
		background: #22c55e !important;
	}

	/* Habits add button: margin-left auto to push right */
	.dl-habits__add-btn {
		margin-left: auto;
	}

	/* ================================================================
	   Daily Review
	   ================================================================ */
	.dl-review {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.dl-review__stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
	}

	.dl-review__stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		padding: 1rem 0.5rem;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
	}

	.dl-review__stat-icon {
		width: 36px;
		height: 36px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
	}

	.dl-review__stat-val {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}

	.dl-review__stat-lbl {
		font-size: 0.68rem;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		text-align: center;
	}

	/* Rating */
	.dl-review__rating-row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.75rem 1rem;
		background: var(--dbg2);
		border-radius: 9px;
		border: 1px solid var(--dbd);
	}

	.dl-review__rating-label {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--dt2);
		flex: 1;
	}

	.dl-review__stars {
		display: flex;
		gap: 0.25rem;
	}

	.dl-review__star {
		font-size: 1.35rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--dbd2);
		line-height: 1;
		transition: color 0.1s, transform 0.1s;
		padding: 0;
	}

	.dl-review__star--filled {
		color: #f59e0b;
	}

	.dl-review__star:hover {
		transform: scale(1.15);
	}

	.dl-review__rating-val {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--dt3);
		min-width: 28px;
		text-align: right;
	}

	/* Reflection fields */
	.dl-review__fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.85rem;
	}

	.dl-review__field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.dl-review__field-label {
		font-size: 0.75rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.dl-review__field-label--green  { color: #4ade80; }
	.dl-review__field-label--amber  { color: #fbbf24; }
	.dl-review__field-label--blue   { color: #60a5fa; }
	.dl-review__field-label--purple { color: #c084fc; }

	.dl-review__field-icon {
		font-size: 0.85rem;
	}

	.dl-review__textarea {
		padding: 0.6rem 0.8rem;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 0.83rem;
		font-family: inherit;
		line-height: 1.55;
		resize: vertical;
		outline: none;
		box-sizing: border-box;
		width: 100%;
		transition: border-color 0.15s;
	}

	.dl-review__textarea:focus {
		border-color: #3b82f6;
	}

	.dl-review__textarea--mono {
		font-family: ui-monospace, 'Cascadia Code', Menlo, monospace;
		font-size: 0.8rem;
	}

	/* AI insight */
	.dl-review__ai {
		display: flex;
		gap: 0.85rem;
		padding: 1rem;
		border-radius: 10px;
		background: rgba(59, 130, 246, 0.05);
		border: 1px solid rgba(59, 130, 246, 0.2);
	}

	.dl-review__ai-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
		flex-shrink: 0;
	}

	.dl-review__ai-body {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.dl-review__ai-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #60a5fa;
	}

	.dl-review__ai-text {
		font-size: 0.83rem;
		color: var(--dt2);
		line-height: 1.55;
		margin: 0;
	}

	.dl-review__actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.65rem;
	}

	/* ================================================================
	   Habits & Streaks
	   ================================================================ */
	.dl-habits {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.dl-habits__header {
		display: grid;
		grid-template-columns: 160px repeat(7, 1fr) 70px 90px;
		gap: 0;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
		padding: 0.5rem 0.75rem;
		align-items: center;
	}

	.dl-habits__habit-col {
		/* spacer */
	}

	.dl-habits__day-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1rem;
	}

	.dl-habits__day-col--today .dl-habits__day-label,
	.dl-habits__day-col--today .dl-habits__day-date {
		color: #60a5fa;
	}

	.dl-habits__day-label {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt4);
	}

	.dl-habits__day-date {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--dt3);
	}

	.dl-habits__streak-col,
	.dl-habits__pct-col {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt4);
		text-align: center;
	}

	.dl-habits__row {
		display: grid;
		grid-template-columns: 160px repeat(7, 1fr) 70px 90px;
		align-items: center;
		gap: 0;
		padding: 0.6rem 0.75rem;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.12s;
	}

	.dl-habits__row:last-of-type {
		border-bottom: none;
	}

	.dl-habits__row:hover {
		background: var(--dbg2);
	}

	.dl-habits__habit-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.dl-habits__habit-icon {
		font-size: 1rem;
	}

	.dl-habits__habit-name {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--dt);
	}

	.dl-habits__dot-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}

	.dl-habits__dot-btn--future {
		cursor: default;
	}

	.dl-habits__dot {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 2px solid var(--dbd);
		background: transparent;
		transition: background 0.15s, border-color 0.15s, transform 0.1s;
	}

	.dl-habits__dot-btn:hover:not(.dl-habits__dot-btn--future) .dl-habits__dot {
		border-color: #3b82f6;
		transform: scale(1.1);
	}

	.dl-habits__dot--done {
		background: #22c55e;
		border-color: #22c55e;
	}

	.dl-habits__dot-btn--today .dl-habits__dot:not(.dl-habits__dot--done) {
		border-color: #3b82f6;
	}

	.dl-habits__dot--future {
		opacity: 0.3;
	}

	.dl-habits__streak-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
	}

	.dl-habits__streak-num {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}

	.dl-habits__streak-unit {
		font-size: 0.68rem;
		color: var(--dt4);
	}

	.dl-habits__streak-fire {
		font-size: 0.75rem;
	}

	.dl-habits__pct-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.dl-habits__pct-fill {
		height: 5px;
		border-radius: 3px;
		background: #3b82f6;
		flex: 1;
		transition: width 0.35s ease;
	}

	.dl-habits__pct-val {
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--dt3);
		min-width: 30px;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	/* Footer */
	.dl-habits__footer {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 0.75rem 0.85rem;
		background: var(--dbg2);
		border-top: 1px solid var(--dbd);
		flex-wrap: wrap;
	}

	.dl-habits__footer-stat {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.dl-habits__footer-val {
		font-size: 0.88rem;
		font-weight: 700;
		color: var(--dt);
	}

	.dl-habits__footer-lbl {
		font-size: 0.65rem;
		color: var(--dt4);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

</style>
