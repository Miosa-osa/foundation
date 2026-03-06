<script lang="ts">
	// ── Helpers ───────────────────────────────────────────────────
	const DAYS_ABBR = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const DAYS_FULL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const MONTHS = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December',
	];

	function daysInMonth(year: number, month: number): number {
		return new Date(year, month + 1, 0).getDate();
	}
	function firstWeekday(year: number, month: number): number {
		return new Date(year, month, 1).getDay();
	}
	function buildGrid(year: number, month: number): (number | null)[] {
		const cells: (number | null)[] = [];
		const offset = firstWeekday(year, month);
		for (let i = 0; i < offset; i++) cells.push(null);
		for (let d = 1; d <= daysInMonth(year, month); d++) cells.push(d);
		while (cells.length % 7 !== 0) cells.push(null);
		return cells;
	}

	// ── 1. Calendar Grid (Month View) ────────────────────────────
	let calYear = $state(2026);
	let calMonth = $state(2); // March
	let selectedDay = $state<number | null>(6);

	const calGrid = $derived(buildGrid(calYear, calMonth));

	function prevMonth() {
		if (calMonth === 0) { calMonth = 11; calYear--; }
		else calMonth--;
		selectedDay = null;
	}
	function nextMonth() {
		if (calMonth === 11) { calMonth = 0; calYear++; }
		else calMonth++;
		selectedDay = null;
	}

	// Event days for month view dots + colored bars
	const monthEvents: Record<number, { label: string; color: string }[]> = {
		3:  [{ label: 'Sprint Plan', color: '#3b82f6' }],
		5:  [{ label: 'Design Review', color: '#8b5cf6' }],
		6:  [{ label: 'Team Standup', color: '#10b981' }, { label: '1:1 with Maya', color: '#f59e0b' }],
		9:  [{ label: 'Retrospective', color: '#ef4444' }],
		11: [{ label: 'Deploy v2.1', color: '#3b82f6' }],
		13: [{ label: 'Demo Day', color: '#8b5cf6' }],
		17: [{ label: 'Sprint Start', color: '#10b981' }],
		20: [{ label: 'QA Review', color: '#f59e0b' }],
		24: [{ label: 'Roadmap Sync', color: '#3b82f6' }],
		27: [{ label: 'Sprint End', color: '#ef4444' }],
	};

	// ── 6. Schedule Sidebar (Mini Calendar) ──────────────────────
	let sideYear = $state(2026);
	let sideMonth = $state(2);
	const sideGrid = $derived(buildGrid(sideYear, sideMonth));
	const sideEventDays = new Set([3, 5, 6, 9, 11, 13, 17, 20, 24, 27]);

	function sidePrev() {
		if (sideMonth === 0) { sideMonth = 11; sideYear--; }
		else sideMonth--;
	}
	function sideNext() {
		if (sideMonth === 11) { sideMonth = 0; sideYear++; }
		else sideMonth++;
	}

	// Daily log input
	let logInput = $state('');
</script>

<section class="ds-section">
	<h2 class="ds-title">Calendar &amp; Scheduling</h2>
	<p class="ds-desc">
		Month views, week grids, event cards, agenda sidebars, and daily logs.
		Pure CSS calendar patterns with scheduling-oriented layouts.
	</p>

	<!-- ── 1. Calendar Grid — Month View ─────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Calendar Grid — Month View</h3>
		<p class="ds-card__sub">7-column day grid with event bars, today highlight, weekend shading, and month navigation</p>
		<div class="cs-month-wrap">
			<div class="cs-month-header">
				<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={prevMonth} aria-label="Previous month">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>
				<span class="cs-month-label">{MONTHS[calMonth]} {calYear}</span>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={nextMonth} aria-label="Next month">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</div>
			<div class="cs-day-headers">
				{#each DAYS_FULL as d, i}
					<div class="cs-day-header" class:cs-weekend-header={i === 0 || i === 6}>{d}</div>
				{/each}
			</div>
			<div class="cs-month-grid">
				{#each calGrid as cell, i}
					{@const col = i % 7}
					{@const isWeekend = col === 0 || col === 6}
					{@const isToday = calYear === 2026 && calMonth === 2 && cell === 6}
					{@const events = cell !== null ? (monthEvents[cell] ?? []) : []}
					<div
						class="cs-day-cell"
						class:cs-weekend={isWeekend}
						class:cs-today-cell={isToday}
						class:cs-empty-cell={cell === null}
						class:cs-selected-cell={cell === selectedDay && !isToday}
					>
						{#if cell !== null}
							<button class="cs-day-num" class:cs-today-num={isToday} onclick={() => (selectedDay = cell)}>
								{cell}
							</button>
							{#each events as ev}
								<div class="cs-day-event" style="background: {ev.color}18; color: {ev.color}; border-left: 2px solid {ev.color};">
									{ev.label}
								</div>
							{/each}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 2. Week View — Hourly Time Slots ──────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Week View — Hourly Slots</h3>
		<p class="ds-card__sub">7-column day layout with time rows 9 AM - 5 PM, positioned event blocks, and current time indicator</p>
		<div class="cs-week-wrap">
			<div class="cs-week-header">
				<div class="cs-time-gutter-hdr"></div>
				{#each ['Sun 1', 'Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6', 'Sat 7'] as dh, i}
					<div class="cs-week-day-hdr" class:cs-week-today-hdr={i === 5}>{dh}</div>
				{/each}
			</div>
			<div class="cs-week-body">
				{#each ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'] as hour, hi}
					<div class="cs-week-row">
						<div class="cs-time-gutter">{hour}</div>
						{#each Array(7) as _, di}
							<div class="cs-week-cell">
								{#if di === 1 && hi === 0}
									<div class="cs-week-event" style="background: #3b82f618; border-left: 3px solid #3b82f6; color: #3b82f6; height: 80px;">
										<span class="cs-week-ev-title">Sprint Planning</span>
										<span class="cs-week-ev-time">9 - 10:30 AM</span>
									</div>
								{/if}
								{#if di === 3 && hi === 2}
									<div class="cs-week-event" style="background: #8b5cf618; border-left: 3px solid #8b5cf6; color: #8b5cf6; height: 44px;">
										<span class="cs-week-ev-title">Design Sync</span>
										<span class="cs-week-ev-time">11 AM</span>
									</div>
								{/if}
								{#if di === 5 && hi === 1}
									<div class="cs-week-event" style="background: #10b98118; border-left: 3px solid #10b981; color: #10b981; height: 64px;">
										<span class="cs-week-ev-title">1:1 Review</span>
										<span class="cs-week-ev-time">10 - 11 AM</span>
									</div>
								{/if}
								{#if di === 2 && hi === 4}
									<div class="cs-week-event" style="background: #f59e0b18; border-left: 3px solid #f59e0b; color: #f59e0b; height: 44px;">
										<span class="cs-week-ev-title">QA Check-in</span>
										<span class="cs-week-ev-time">1 PM</span>
									</div>
								{/if}
								{#if di === 4 && hi === 6}
									<div class="cs-week-event" style="background: #ef444418; border-left: 3px solid #ef4444; color: #ef4444; height: 80px;">
										<span class="cs-week-ev-title">Demo Prep</span>
										<span class="cs-week-ev-time">3 - 4:30 PM</span>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
				<!-- Current time indicator (positioned at ~10:20 AM) -->
				<div class="cs-now-indicator" aria-label="Current time: 10:20 AM"></div>
			</div>
		</div>
	</div>

	<!-- ── 3. Event Cards — Compact, Standard, Expanded ──────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Event Cards</h3>
		<p class="ds-card__sub">Compact (single line), standard, and expanded event card variants with category color, attendees, and badges</p>
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">

			<!-- Compact variants -->
			<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em;">Compact</div>
			<div class="cs-ev-card cs-ev-compact" style="--cs-cat: #3b82f6;">
				<span class="cs-ev-dot"></span>
				<span class="cs-ev-title">Sprint Planning</span>
				<span class="cs-ev-time-inline">9:00 - 10:30 AM</span>
				<span class="cs-ev-badge cs-badge-virtual">Virtual</span>
			</div>
			<div class="cs-ev-card cs-ev-compact" style="--cs-cat: #10b981;">
				<span class="cs-ev-dot"></span>
				<span class="cs-ev-title">Team Standup</span>
				<span class="cs-ev-time-inline">10:00 AM</span>
				<span class="cs-ev-badge cs-badge-person">In-Person</span>
			</div>
			<div class="cs-ev-card cs-ev-compact" style="--cs-cat: #f59e0b;">
				<span class="cs-ev-dot"></span>
				<span class="cs-ev-title">1:1 with Maya</span>
				<span class="cs-ev-time-inline">2:00 PM</span>
				<span class="cs-ev-badge cs-badge-virtual">Virtual</span>
			</div>

			<!-- Standard variants -->
			<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 8px;">Standard</div>
			<div class="cs-ev-card cs-ev-standard" style="--cs-cat: #8b5cf6;">
				<div class="cs-ev-body">
					<div class="cs-ev-title">Design Review</div>
					<div class="cs-ev-time">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/></svg>
						11:00 AM - 12:00 PM
					</div>
					<div class="cs-ev-location">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3" stroke-width="2"/></svg>
						Conference Room B
					</div>
				</div>
				<div class="cs-ev-meta">
					<div class="cs-ev-avatars">
						<div class="cs-ev-avatar" style="background: #8b5cf6;">MC</div>
						<div class="cs-ev-avatar" style="background: #3b82f6;">TR</div>
						<div class="cs-ev-avatar" style="background: #10b981;">JL</div>
					</div>
					<span class="cs-ev-badge cs-badge-person">In-Person</span>
				</div>
			</div>
			<div class="cs-ev-card cs-ev-standard" style="--cs-cat: #f59e0b;">
				<div class="cs-ev-body">
					<div class="cs-ev-title">1:1 with Maya</div>
					<div class="cs-ev-time">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/></svg>
						2:00 - 2:30 PM
					</div>
					<div class="cs-ev-location">
						<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
						Google Meet
					</div>
				</div>
				<div class="cs-ev-meta">
					<div class="cs-ev-avatars">
						<div class="cs-ev-avatar" style="background: #8b5cf6;">MC</div>
						<div class="cs-ev-avatar" style="background: #f59e0b;">YO</div>
					</div>
					<span class="cs-ev-badge cs-badge-virtual">Virtual</span>
				</div>
			</div>

			<!-- Expanded variant -->
			<div style="font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 8px;">Expanded</div>
			<div class="cs-ev-card cs-ev-expanded" style="--cs-cat: #ef4444;">
				<div class="cs-ev-expanded-hdr">
					<div class="cs-ev-title">Quarterly Review</div>
					<span class="cs-ev-badge cs-badge-person">In-Person</span>
				</div>
				<div class="cs-ev-time">
					<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/></svg>
					3:00 - 5:00 PM
				</div>
				<div class="cs-ev-location">
					<svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3" stroke-width="2"/></svg>
					Main Conference Hall, 4th Floor
				</div>
				<div class="cs-ev-desc">
					End-of-quarter product review with engineering, design, and product leads.
					Bring your sprint metrics and demo materials.
				</div>
				<div class="cs-ev-meta">
					<div class="cs-ev-avatars">
						<div class="cs-ev-avatar" style="background: #8b5cf6;">MC</div>
						<div class="cs-ev-avatar" style="background: #3b82f6;">TR</div>
						<div class="cs-ev-avatar" style="background: #10b981;">JL</div>
						<div class="cs-ev-avatar" style="background: #f59e0b;">YO</div>
						<div class="cs-ev-avatar cs-ev-avatar-more">+3</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ── 4. Upcoming Events — Sidebar List ─────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Upcoming Events</h3>
		<p class="ds-card__sub">Sidebar-style event list grouped by day with colored dots, titles, and times</p>
		<div class="cs-upcoming-wrap">
			<div class="cs-upcoming-group">
				<div class="cs-upcoming-label">Today &middot; March 6</div>
				{#each [
					{ time: '9:00 AM', title: 'Team Standup', color: '#10b981' },
					{ time: '11:00 AM', title: 'Design Review', color: '#8b5cf6' },
					{ time: '2:00 PM', title: '1:1 with Maya', color: '#f59e0b' },
					{ time: '4:00 PM', title: 'Code Review', color: '#3b82f6' },
				] as ev}
					<div class="cs-upcoming-item">
						<span class="cs-upcoming-dot" style="background: {ev.color};"></span>
						<span class="cs-upcoming-title">{ev.title}</span>
						<span class="cs-upcoming-time">{ev.time}</span>
					</div>
				{/each}
			</div>
			<div class="cs-upcoming-group">
				<div class="cs-upcoming-label">Tomorrow &middot; March 7</div>
				{#each [
					{ time: '10:00 AM', title: 'Sprint Grooming', color: '#3b82f6' },
					{ time: '1:00 PM', title: 'QA Handoff', color: '#ef4444' },
				] as ev}
					<div class="cs-upcoming-item">
						<span class="cs-upcoming-dot" style="background: {ev.color};"></span>
						<span class="cs-upcoming-title">{ev.title}</span>
						<span class="cs-upcoming-time">{ev.time}</span>
					</div>
				{/each}
			</div>
			<div class="cs-upcoming-group">
				<div class="cs-upcoming-label">This Week</div>
				{#each [
					{ time: 'Wed 9 AM', title: 'Retrospective', color: '#ef4444' },
					{ time: 'Thu 11 AM', title: 'Deploy v2.1', color: '#3b82f6' },
					{ time: 'Fri 2 PM', title: 'Demo Day', color: '#8b5cf6' },
				] as ev}
					<div class="cs-upcoming-item">
						<span class="cs-upcoming-dot" style="background: {ev.color};"></span>
						<span class="cs-upcoming-title">{ev.title}</span>
						<span class="cs-upcoming-time">{ev.time}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 5. Daily Log — Time-based Activity Log ────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Daily Log</h3>
		<p class="ds-card__sub">Hour slots with typed entries (meeting, task, note, break), duration bars, and add-entry buttons</p>
		<div class="cs-log-wrap">
			{#each [
				{ hour: '9:00 AM', entries: [
					{ type: 'meeting', title: 'Team Standup', duration: '30 min', color: '#3b82f6', pct: 50 },
				]},
				{ hour: '10:00 AM', entries: [
					{ type: 'task', title: 'Implement auth flow', duration: '1 hr', color: '#10b981', pct: 100 },
				]},
				{ hour: '11:00 AM', entries: [
					{ type: 'meeting', title: 'Design Review', duration: '1 hr', color: '#8b5cf6', pct: 100 },
				]},
				{ hour: '12:00 PM', entries: [
					{ type: 'break', title: 'Lunch Break', duration: '45 min', color: '#6b7280', pct: 75 },
				]},
				{ hour: '1:00 PM', entries: [
					{ type: 'task', title: 'Fix pagination bug', duration: '45 min', color: '#10b981', pct: 75 },
					{ type: 'note', title: 'Needs DB index on user_id', duration: '', color: '#f59e0b', pct: 0 },
				]},
				{ hour: '2:00 PM', entries: [
					{ type: 'meeting', title: '1:1 with Maya', duration: '30 min', color: '#f59e0b', pct: 50 },
				]},
				{ hour: '3:00 PM', entries: [] },
				{ hour: '4:00 PM', entries: [
					{ type: 'task', title: 'PR review: auth module', duration: '1 hr', color: '#10b981', pct: 100 },
				]},
			] as slot}
				<div class="cs-log-slot">
					<div class="cs-log-hour">{slot.hour}</div>
					<div class="cs-log-content">
						{#if slot.entries.length > 0}
							{#each slot.entries as entry}
								<div class="cs-log-entry">
									<div class="cs-log-entry-hdr">
										<span class="cs-log-type cs-log-type--{entry.type}">
											{#if entry.type === 'meeting'}
												<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
											{:else if entry.type === 'task'}
												<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
											{:else if entry.type === 'note'}
												<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
											{:else}
												<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
											{/if}
										</span>
										<span class="cs-log-title">{entry.title}</span>
										{#if entry.duration}
											<span class="cs-log-dur">{entry.duration}</span>
										{/if}
									</div>
									{#if entry.pct > 0}
										<div class="cs-log-bar">
											<div class="cs-log-bar-fill" style="width: {entry.pct}%; background: {entry.color};"></div>
										</div>
									{/if}
								</div>
							{/each}
						{:else}
							<button class="btn-compact btn-compact-primary btn-compact-icon">
								<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
								Add entry
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 6. Schedule Sidebar — Mini Calendar + Agenda ───────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Schedule Sidebar</h3>
		<p class="ds-card__sub">Mini month picker at top with agenda list below, grouped by day. Includes empty state variant.</p>
		<div style="display: flex; gap: 24px; flex-wrap: wrap;">
			<!-- Sidebar with events -->
			<div class="cs-sidebar">
				<div class="cs-mini-cal">
					<div class="cs-mini-hdr">
						<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={sidePrev} aria-label="Previous month">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
						</button>
						<span class="cs-mini-month">{MONTHS[sideMonth]} {sideYear}</span>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={sideNext} aria-label="Next month">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
						</button>
					</div>
					<div class="cs-mini-grid">
						{#each DAYS_ABBR as d}
							<span class="cs-mini-day-lbl">{d}</span>
						{/each}
						{#each sideGrid as cell}
							{#if cell !== null}
								<span
									class="cs-mini-day"
									class:cs-mini-today={sideYear === 2026 && sideMonth === 2 && cell === 6}
									class:cs-mini-has-ev={sideYear === 2026 && sideMonth === 2 && sideEventDays.has(cell)}
								>{cell}</span>
							{:else}
								<span class="cs-mini-day cs-mini-day-empty"></span>
							{/if}
						{/each}
					</div>
				</div>
				<div class="cs-agenda">
					<div class="cs-agenda-day">
						<div class="cs-agenda-day-lbl">Today, Mar 6</div>
						{#each [
							{ time: '9:00 AM', title: 'Team Standup', color: '#10b981' },
							{ time: '11:00 AM', title: 'Design Review', color: '#8b5cf6' },
							{ time: '2:00 PM', title: '1:1 with Maya', color: '#f59e0b' },
						] as ev}
							<div class="cs-agenda-item">
								<div class="cs-agenda-bar" style="background: {ev.color};"></div>
								<div class="cs-agenda-info">
									<span class="cs-agenda-title">{ev.title}</span>
									<span class="cs-agenda-time">{ev.time}</span>
								</div>
							</div>
						{/each}
					</div>
					<div class="cs-agenda-day">
						<div class="cs-agenda-day-lbl">Tomorrow, Mar 7</div>
						{#each [
							{ time: '10:00 AM', title: 'Sprint Grooming', color: '#3b82f6' },
							{ time: '1:00 PM', title: 'QA Handoff', color: '#ef4444' },
						] as ev}
							<div class="cs-agenda-item">
								<div class="cs-agenda-bar" style="background: {ev.color};"></div>
								<div class="cs-agenda-info">
									<span class="cs-agenda-title">{ev.title}</span>
									<span class="cs-agenda-time">{ev.time}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Sidebar — empty state -->
			<div class="cs-sidebar">
				<div class="cs-mini-cal">
					<div class="cs-mini-hdr">
						<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Previous month">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
						</button>
						<span class="cs-mini-month">April 2026</span>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Next month">
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
						</button>
					</div>
					<div class="cs-mini-grid">
						{#each DAYS_ABBR as d}
							<span class="cs-mini-day-lbl">{d}</span>
						{/each}
						{#each Array(3) as _}
							<span class="cs-mini-day cs-mini-day-empty"></span>
						{/each}
						{#each Array(30) as _, i}
							<span class="cs-mini-day">{i + 1}</span>
						{/each}
						{#each Array(2) as _}
							<span class="cs-mini-day cs-mini-day-empty"></span>
						{/each}
					</div>
				</div>
				<div class="cs-agenda">
					<div class="cs-agenda-empty">
						<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity: 0.3;">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
						</svg>
						<span class="cs-agenda-empty-text">No events scheduled</span>
						<span class="cs-agenda-empty-sub">Select a date to add events</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── 1. Calendar Grid — Month View ───────────────────────────────── */
	.cs-month-wrap {
		max-width: 640px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
	}
	.cs-month-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}
	.cs-month-label {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.cs-day-headers {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		border-bottom: 1px solid var(--dbd);
	}
	.cs-day-header {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-align: center;
		padding: 8px 0;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.cs-weekend-header {
		opacity: 0.55;
	}
	.cs-month-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
	.cs-day-cell {
		min-height: 74px;
		padding: 4px 6px;
		border-right: 1px solid var(--dbd);
		border-bottom: 1px solid var(--dbd);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.cs-day-cell:nth-child(7n) {
		border-right: none;
	}
	.cs-weekend {
		background: var(--dbg2);
	}
	.cs-empty-cell {
		opacity: 0.35;
	}
	.cs-today-cell {
		background: color-mix(in srgb, #3b82f6 5%, var(--dbg));
	}
	.cs-selected-cell {
		background: color-mix(in srgb, #8b5cf6 5%, var(--dbg));
	}
	.cs-day-num {
		font-size: 12px;
		color: var(--dt2);
		font-weight: 500;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		margin-bottom: 2px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: fit-content;
		transition: color 0.12s;
	}
	.cs-day-num:hover {
		color: var(--dt);
	}
	.cs-today-num {
		background: #3b82f6;
		color: #fff !important;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
	}
	.cs-day-event {
		font-size: 10px;
		font-weight: 500;
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.6;
	}

	/* ── 2. Week View ────────────────────────────────────────────────── */
	.cs-week-wrap {
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		background: var(--dbg);
	}
	.cs-week-header {
		display: grid;
		grid-template-columns: 60px repeat(7, 1fr);
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}
	.cs-time-gutter-hdr {
		border-right: 1px solid var(--dbd);
	}
	.cs-week-day-hdr {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		text-align: center;
		padding: 10px 0;
		border-right: 1px solid var(--dbd);
	}
	.cs-week-day-hdr:last-child {
		border-right: none;
	}
	.cs-week-today-hdr {
		color: #3b82f6;
		font-weight: 700;
	}
	.cs-week-body {
		position: relative;
		max-height: 400px;
		overflow-y: auto;
	}
	.cs-week-row {
		display: grid;
		grid-template-columns: 60px repeat(7, 1fr);
		min-height: 48px;
		border-bottom: 1px solid var(--dbd);
	}
	.cs-week-row:last-child {
		border-bottom: none;
	}
	.cs-time-gutter {
		font-size: 10px;
		color: var(--dt3);
		padding: 4px 8px 0 0;
		text-align: right;
		border-right: 1px solid var(--dbd);
		font-variant-numeric: tabular-nums;
	}
	.cs-week-cell {
		border-right: 1px solid var(--dbd);
		position: relative;
		padding: 2px;
	}
	.cs-week-cell:last-child {
		border-right: none;
	}
	.cs-week-event {
		border-radius: 4px;
		padding: 3px 6px;
		font-size: 10px;
		display: flex;
		flex-direction: column;
		gap: 1px;
		overflow: hidden;
	}
	.cs-week-ev-title {
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cs-week-ev-time {
		opacity: 0.7;
		font-size: 9px;
	}
	.cs-now-indicator {
		position: absolute;
		top: calc(1 * 48px + 20px);
		left: 60px;
		right: 0;
		height: 2px;
		background: #ef4444;
		z-index: 3;
		pointer-events: none;
	}
	.cs-now-indicator::before {
		content: '';
		position: absolute;
		left: -4px;
		top: -3px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ef4444;
	}

	/* ── 3. Event Cards ──────────────────────────────────────────────── */
	.cs-ev-card {
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		border-left: 3px solid var(--cs-cat, var(--dbd));
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.cs-ev-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	/* Compact */
	.cs-ev-compact {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
	}
	.cs-ev-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--cs-cat);
		flex-shrink: 0;
	}
	.cs-ev-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}
	.cs-ev-time-inline {
		font-size: 11px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		margin-left: auto;
	}
	.cs-ev-badge {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 7px;
		border-radius: 4px;
		flex-shrink: 0;
	}
	.cs-badge-virtual {
		background: #3b82f618;
		color: #3b82f6;
	}
	.cs-badge-person {
		background: #10b98118;
		color: #10b981;
	}

	/* Standard */
	.cs-ev-standard {
		padding: 12px 14px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
	}
	.cs-ev-body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.cs-ev-time {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}
	.cs-ev-time svg {
		flex-shrink: 0;
		color: var(--dt3);
	}
	.cs-ev-location {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
	}
	.cs-ev-location svg {
		flex-shrink: 0;
	}
	.cs-ev-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}
	.cs-ev-avatars {
		display: flex;
	}
	.cs-ev-avatar {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		border: 2px solid var(--dbg);
		margin-left: -6px;
	}
	.cs-ev-avatar:first-child {
		margin-left: 0;
	}
	.cs-ev-avatar-more {
		background: var(--dbg3);
		color: var(--dt2);
		font-size: 8px;
	}

	/* Expanded */
	.cs-ev-expanded {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cs-ev-expanded-hdr {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.cs-ev-desc {
		font-size: 12px;
		color: var(--dt2);
		line-height: 1.5;
		margin-top: 2px;
	}

	/* ── 4. Upcoming Events ──────────────────────────────────────────── */
	.cs-upcoming-wrap {
		max-width: 320px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.cs-upcoming-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cs-upcoming-label {
		font-size: 11px;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.cs-upcoming-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 0;
	}
	.cs-upcoming-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.cs-upcoming-title {
		font-size: 13px;
		color: var(--dt);
		font-weight: 500;
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cs-upcoming-time {
		font-size: 11px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}

	/* ── 5. Daily Log ────────────────────────────────────────────────── */
	.cs-log-wrap {
		max-width: 520px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		overflow: hidden;
	}
	.cs-log-slot {
		display: flex;
		border-bottom: 1px solid var(--dbd);
		min-height: 52px;
	}
	.cs-log-slot:last-child {
		border-bottom: none;
	}
	.cs-log-hour {
		width: 72px;
		padding: 10px 10px 10px 12px;
		font-size: 11px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		border-right: 1px solid var(--dbd);
		flex-shrink: 0;
		text-align: right;
	}
	.cs-log-content {
		flex: 1;
		padding: 8px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		justify-content: center;
	}
	.cs-log-entry {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.cs-log-entry-hdr {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.cs-log-type {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		flex-shrink: 0;
	}
	.cs-log-type--meeting {
		background: #3b82f618;
		color: #3b82f6;
	}
	.cs-log-type--task {
		background: #10b98118;
		color: #10b981;
	}
	.cs-log-type--note {
		background: #f59e0b18;
		color: #f59e0b;
	}
	.cs-log-type--break {
		background: #6b728018;
		color: #6b7280;
	}
	.cs-log-title {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt);
	}
	.cs-log-dur {
		font-size: 10px;
		color: var(--dt3);
		margin-left: auto;
		font-variant-numeric: tabular-nums;
	}
	.cs-log-bar {
		height: 3px;
		background: var(--dbg2);
		border-radius: 2px;
		overflow: hidden;
		margin-left: 26px;
	}
	.cs-log-bar-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.3s;
	}

	/* ── 6. Schedule Sidebar ─────────────────────────────────────────── */
	.cs-sidebar {
		width: 260px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		overflow: hidden;
		flex-shrink: 0;
	}
	.cs-mini-cal {
		padding: 12px;
		border-bottom: 1px solid var(--dbd);
	}
	.cs-mini-hdr {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.cs-mini-month {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
	}
	.cs-mini-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
		text-align: center;
	}
	.cs-mini-day-lbl {
		font-size: 9px;
		font-weight: 600;
		color: var(--dt3);
		padding: 4px 0;
		text-transform: uppercase;
	}
	.cs-mini-day {
		font-size: 11px;
		color: var(--dt2);
		padding: 4px 0;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.15s;
		font-variant-numeric: tabular-nums;
		position: relative;
	}
	.cs-mini-day:hover {
		background: var(--dbg2);
	}
	.cs-mini-day-empty {
		cursor: default;
	}
	.cs-mini-day-empty:hover {
		background: transparent;
	}
	.cs-mini-today {
		background: #3b82f6;
		color: #fff;
		font-weight: 700;
	}
	.cs-mini-today:hover {
		background: #2563eb;
	}
	.cs-mini-has-ev::after {
		content: '';
		position: absolute;
		bottom: 1px;
		left: 50%;
		transform: translateX(-50%);
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: #3b82f6;
	}
	.cs-mini-today.cs-mini-has-ev::after {
		background: #fff;
	}

	/* Agenda */
	.cs-agenda {
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.cs-agenda-day {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cs-agenda-day-lbl {
		font-size: 11px;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.cs-agenda-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 8px;
		border-radius: 6px;
		transition: background 0.15s;
		cursor: pointer;
	}
	.cs-agenda-item:hover {
		background: var(--dbg2);
	}
	.cs-agenda-bar {
		width: 3px;
		height: 24px;
		border-radius: 2px;
		flex-shrink: 0;
	}
	.cs-agenda-info {
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
	}
	.cs-agenda-title {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cs-agenda-time {
		font-size: 10px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
	}
	.cs-agenda-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 28px 16px;
		color: var(--dt3);
	}
	.cs-agenda-empty-text {
		font-size: 12px;
		font-weight: 500;
	}
	.cs-agenda-empty-sub {
		font-size: 11px;
		opacity: 0.55;
	}
</style>
