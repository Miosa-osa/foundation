<script lang="ts">
	// ── helpers ──────────────────────────────────────────────────────────────────

	const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const MONTHS = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December',
	];
	const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	function daysInMonth(year: number, month: number): number {
		return new Date(year, month + 1, 0).getDate();
	}

	function firstWeekday(year: number, month: number): number {
		return new Date(year, month, 1).getDay();
	}

	function sameDay(a: Date | null, b: Date | null): boolean {
		if (!a || !b) return false;
		return a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate();
	}

	function isBetween(d: Date, start: Date | null, end: Date | null): boolean {
		if (!start || !end) return false;
		const t = d.getTime();
		return t > start.getTime() && t < end.getTime();
	}

	function formatDisplay(d: Date | null): string {
		if (!d) return '';
		return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
	}

	function formatShort(d: Date | null): string {
		if (!d) return '';
		const m = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${m}/${day}/${d.getFullYear()}`;
	}

	function pad2(n: number): string {
		return String(n).padStart(2, '0');
	}

	function buildGrid(year: number, month: number): (number | null)[] {
		const cells: (number | null)[] = [];
		const offset = firstWeekday(year, month);
		const total = daysInMonth(year, month);
		for (let i = 0; i < offset; i++) cells.push(null);
		for (let d = 1; d <= total; d++) cells.push(d);
		// pad to full rows
		while (cells.length % 7 !== 0) cells.push(null);
		return cells;
	}

	// ── 1: Date Input ────────────────────────────────────────────────────────────

	const TODAY = new Date(2026, 2, 6); // Mar 6, 2026
	let dateInputVal = $state(formatDisplay(TODAY));
	let dateInputFocused = $state(false);

	// ── 2: Calendar Grid ─────────────────────────────────────────────────────────

	let calYear = $state(2026);
	let calMonth = $state(2); // March
	let calSelected = $state<Date | null>(new Date(2026, 2, 6));

	const calGrid = $derived(buildGrid(calYear, calMonth));

	function calPrev() {
		if (calMonth === 0) { calMonth = 11; calYear--; }
		else calMonth--;
	}
	function calNext() {
		if (calMonth === 11) { calMonth = 0; calYear++; }
		else calMonth++;
	}
	function calSelect(day: number) {
		calSelected = new Date(calYear, calMonth, day);
	}

	// ── 3: Date Range ────────────────────────────────────────────────────────────

	let rangeYear = $state(2026);
	let rangeMonth = $state(2);
	let rangeStart = $state<Date | null>(null);
	let rangeEnd = $state<Date | null>(null);
	let rangeHover = $state<Date | null>(null);

	const rangeGrid1 = $derived(buildGrid(rangeYear, rangeMonth));
	const rangeGrid2 = $derived(
		rangeMonth === 11
			? buildGrid(rangeYear + 1, 0)
			: buildGrid(rangeYear, rangeMonth + 1)
	);
	const rangeMonth2 = $derived(rangeMonth === 11 ? 0 : rangeMonth + 1);
	const rangeYear2 = $derived(rangeMonth === 11 ? rangeYear + 1 : rangeYear);

	function rangePrev() {
		if (rangeMonth === 0) { rangeMonth = 11; rangeYear--; }
		else rangeMonth--;
	}
	function rangeNextMonth() {
		if (rangeMonth === 11) { rangeMonth = 0; rangeYear++; }
		else rangeMonth++;
	}
	function rangeClick(year: number, month: number, day: number) {
		const d = new Date(year, month, day);
		if (!rangeStart || (rangeStart && rangeEnd)) {
			rangeStart = d;
			rangeEnd = null;
			rangeHover = null;
		} else {
			if (d < rangeStart) {
				rangeEnd = rangeStart;
				rangeStart = d;
			} else {
				rangeEnd = d;
			}
			rangeHover = null;
		}
	}
	function rangeIsStart(year: number, month: number, day: number): boolean {
		return sameDay(rangeStart, new Date(year, month, day));
	}
	function rangeIsEnd(year: number, month: number, day: number): boolean {
		return sameDay(rangeEnd, new Date(year, month, day));
	}
	function rangeInRange(year: number, month: number, day: number): boolean {
		const d = new Date(year, month, day);
		const effectiveEnd = rangeEnd ?? rangeHover;
		if (rangeStart && effectiveEnd) {
			const lo = rangeStart < effectiveEnd ? rangeStart : effectiveEnd;
			const hi = rangeStart < effectiveEnd ? effectiveEnd : rangeStart;
			return isBetween(d, lo, hi);
		}
		return false;
	}
	function rangeTailClass(year: number, month: number, day: number): string {
		if (rangeIsStart(year, month, day)) return 'range-start';
		if (rangeIsEnd(year, month, day)) return 'range-end';
		if (rangeInRange(year, month, day)) return 'range-mid';
		return '';
	}

	// ── 4: Time Picker ───────────────────────────────────────────────────────────

	let timeHour = $state(2);
	let timeMinute = $state(30);
	let timeAm = $state(true);

	function timeHourUp() { timeHour = timeHour === 12 ? 1 : timeHour + 1; }
	function timeHourDown() { timeHour = timeHour === 1 ? 12 : timeHour - 1; }
	function timeMinUp() { timeMinute = (timeMinute + 1) % 60; }
	function timeMinDown() { timeMinute = (timeMinute - 1 + 60) % 60; }

	const timeDisplay = $derived(`${pad2(timeHour)}:${pad2(timeMinute)} ${timeAm ? 'AM' : 'PM'}`);

	// ── 5: Date + Time Combined ───────────────────────────────────────────────────

	let dtYear = $state(2026);
	let dtMonth = $state(2);
	let dtSelected = $state<Date | null>(new Date(2026, 2, 6));
	let dtOpen = $state(false);
	let dtHour = $state(10);
	let dtMinute = $state(0);
	let dtAm = $state(true);

	const dtGrid = $derived(buildGrid(dtYear, dtMonth));

	function dtPrev() {
		if (dtMonth === 0) { dtMonth = 11; dtYear--; } else dtMonth--;
	}
	function dtNextMonth() {
		if (dtMonth === 11) { dtMonth = 0; dtYear++; } else dtMonth++;
	}
	function dtSelectDay(day: number) {
		dtSelected = new Date(dtYear, dtMonth, day);
		// keep open for time selection
	}

	const dtDisplayDate = $derived(
		dtSelected
			? `${MONTHS_SHORT[dtSelected.getMonth()]} ${dtSelected.getDate()}, ${dtSelected.getFullYear()}`
			: 'Select date'
	);
	const dtDisplayTime = $derived(`${pad2(dtHour)}:${pad2(dtMinute)} ${dtAm ? 'AM' : 'PM'}`);

	// ── 6: Preset Ranges ─────────────────────────────────────────────────────────

	let presetStart = $state<Date | null>(TODAY);
	let presetEnd = $state<Date | null>(TODAY);
	let presetActive = $state('today');

	const presets = [
		{ key: 'today', label: 'Today' },
		{ key: 'yesterday', label: 'Yesterday' },
		{ key: 'last7', label: 'Last 7 days' },
		{ key: 'last30', label: 'Last 30 days' },
		{ key: 'thismonth', label: 'This month' },
		{ key: 'custom', label: 'Custom' },
	];

	function applyPreset(key: string) {
		presetActive = key;
		const t = new Date(TODAY);
		if (key === 'today') {
			presetStart = new Date(t);
			presetEnd = new Date(t);
		} else if (key === 'yesterday') {
			const y = new Date(t);
			y.setDate(t.getDate() - 1);
			presetStart = y;
			presetEnd = new Date(y);
		} else if (key === 'last7') {
			const s = new Date(t);
			s.setDate(t.getDate() - 6);
			presetStart = s;
			presetEnd = new Date(t);
		} else if (key === 'last30') {
			const s = new Date(t);
			s.setDate(t.getDate() - 29);
			presetStart = s;
			presetEnd = new Date(t);
		} else if (key === 'thismonth') {
			presetStart = new Date(t.getFullYear(), t.getMonth(), 1);
			presetEnd = new Date(t);
		} else {
			// custom — leave unchanged, just mark label
		}
	}

	const presetLabel = $derived(
		presetStart && presetEnd
			? presetStart.getTime() === presetEnd.getTime()
				? formatDisplay(presetStart)
				: `${formatDisplay(presetStart)} — ${formatDisplay(presetEnd)}`
			: 'No range selected'
	);

	// ── 7: Mini Calendar ─────────────────────────────────────────────────────────

	let miniYear = $state(2026);
	let miniMonth = $state(2);
	let miniSelected = $state<Date | null>(new Date(2026, 2, 6));

	const miniGrid = $derived(buildGrid(miniYear, miniMonth));

	function miniPrev() {
		if (miniMonth === 0) { miniMonth = 11; miniYear--; } else miniMonth--;
	}
	function miniNext() {
		if (miniMonth === 11) { miniMonth = 0; miniYear++; } else miniMonth++;
	}

	// ── 8: Event Scheduler ───────────────────────────────────────────────────────

	let evtName = $state('');
	let evtYear = $state(2026);
	let evtMonth = $state(2);
	let evtSelected = $state<Date | null>(new Date(2026, 2, 6));
	let evtCalOpen = $state(false);
	let evtHour = $state(9);
	let evtMinute = $state(0);
	let evtAm = $state(true);
	let evtScheduled = $state(false);

	const evtGrid = $derived(buildGrid(evtYear, evtMonth));

	function evtPrev() {
		if (evtMonth === 0) { evtMonth = 11; evtYear--; } else evtMonth--;
	}
	function evtNextMonth() {
		if (evtMonth === 11) { evtMonth = 0; evtYear++; } else evtMonth++;
	}
	function evtSelectDay(day: number) {
		evtSelected = new Date(evtYear, evtMonth, day);
		evtCalOpen = false;
	}

	const evtDisplayDate = $derived(
		evtSelected ? `${MONTHS_SHORT[evtSelected.getMonth()]} ${evtSelected.getDate()}, ${evtSelected.getFullYear()}` : 'Select date'
	);
	const evtDisplayTime = $derived(`${pad2(evtHour)}:${pad2(evtMinute)} ${evtAm ? 'AM' : 'PM'}`);

	function scheduleEvent() {
		if (!evtName.trim() || !evtSelected) return;
		evtScheduled = true;
		setTimeout(() => { evtScheduled = false; }, 3000);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Date Picker</h2>
	<p class="ds-desc">Date and time selection patterns — from simple inputs to full range pickers and calendar compositions. All built with pure HTML, CSS, and Svelte 5 runes.</p>

	<!-- ═══ 1: DATE INPUT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Date Input</h3>
		<p class="ds-card__sub">Styled text input with calendar icon and formatted date display.</p>
		<div class="dp-field-row">
			<div class="dp-field" class:dp-field--focused={dateInputFocused}>
				<svg class="dp-field__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor">
					<rect x="3" y="4" width="14" height="13" rx="2" stroke-width="1.5"/>
					<path d="M3 8h14" stroke-width="1.5"/>
					<path d="M7 2v3M13 2v3" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<input
					class="dp-field__input"
					type="text"
					value={dateInputVal}
					placeholder="MMM D, YYYY"
					onfocus={() => dateInputFocused = true}
					onblur={() => dateInputFocused = false}
					oninput={(e) => dateInputVal = (e.target as HTMLInputElement).value}
				/>
			</div>
			<div class="dp-field dp-field--disabled">
				<svg class="dp-field__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor">
					<rect x="3" y="4" width="14" height="13" rx="2" stroke-width="1.5"/>
					<path d="M3 8h14" stroke-width="1.5"/>
					<path d="M7 2v3M13 2v3" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<input class="dp-field__input" type="text" value="Mar 6, 2026" disabled />
			</div>
		</div>
	</div>

	<!-- ═══ 2: CALENDAR GRID ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Calendar Grid</h3>
		<p class="ds-card__sub">Full month grid with weekday headers, today highlight, and month navigation.</p>
		<div class="dp-cal">
			<div class="dp-cal__header">
				<button class="dp-cal__nav" onclick={calPrev} aria-label="Previous month">
					<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
				</button>
				<span class="dp-cal__title">{MONTHS[calMonth]} {calYear}</span>
				<button class="dp-cal__nav" onclick={calNext} aria-label="Next month">
					<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
				</button>
			</div>
			<div class="dp-cal__grid">
				{#each DAYS as d}
					<span class="dp-cal__dow">{d}</span>
				{/each}
				{#each calGrid as cell}
					{#if cell === null}
						<span></span>
					{:else}
						<button
							class="dp-cal__day"
							class:dp-cal__day--today={sameDay(new Date(calYear, calMonth, cell), TODAY)}
							class:dp-cal__day--selected={sameDay(calSelected, new Date(calYear, calMonth, cell))}
							onclick={() => calSelect(cell)}
							aria-label="{MONTHS[calMonth]} {cell}, {calYear}"
							aria-pressed={sameDay(calSelected, new Date(calYear, calMonth, cell))}
						>{cell}</button>
					{/if}
				{/each}
			</div>
			{#if calSelected}
				<div class="dp-cal__footer">
					Selected: <strong>{formatDisplay(calSelected)}</strong>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══ 3: DATE RANGE PICKER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Date Range Picker</h3>
		<p class="ds-card__sub">Two-column layout. Click a start date then an end date — range highlights between them.</p>
		<div class="dp-range-header">
			<button class="dp-cal__nav" onclick={rangePrev} aria-label="Previous month">
				<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</button>
			<div class="dp-range-months">
				<span class="dp-cal__title">{MONTHS[rangeMonth]} {rangeYear}</span>
				<span class="dp-cal__title">{MONTHS[rangeMonth2]} {rangeYear2}</span>
			</div>
			<button class="dp-cal__nav" onclick={rangeNextMonth} aria-label="Next month">
				<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</button>
		</div>
		<div class="dp-range-wrap">
			<!-- Month 1 -->
			<div class="dp-cal dp-cal--range">
				<div class="dp-cal__grid">
					{#each DAYS as d}
						<span class="dp-cal__dow">{d}</span>
					{/each}
					{#each rangeGrid1 as cell}
						{#if cell === null}
							<span></span>
						{:else}
							<button
								class="dp-cal__day {rangeTailClass(rangeYear, rangeMonth, cell)}"
								class:dp-cal__day--today={sameDay(new Date(rangeYear, rangeMonth, cell), TODAY)}
								onclick={() => rangeClick(rangeYear, rangeMonth, cell)}
								onmouseenter={() => { if (rangeStart && !rangeEnd) rangeHover = new Date(rangeYear, rangeMonth, cell); }}
								onmouseleave={() => { rangeHover = null; }}
								aria-label="{MONTHS[rangeMonth]} {cell}, {rangeYear}"
							>{cell}</button>
						{/if}
					{/each}
				</div>
			</div>
			<!-- Month 2 -->
			<div class="dp-cal dp-cal--range">
				<div class="dp-cal__grid">
					{#each DAYS as d}
						<span class="dp-cal__dow">{d}</span>
					{/each}
					{#each rangeGrid2 as cell}
						{#if cell === null}
							<span></span>
						{:else}
							<button
								class="dp-cal__day {rangeTailClass(rangeYear2, rangeMonth2, cell)}"
								class:dp-cal__day--today={sameDay(new Date(rangeYear2, rangeMonth2, cell), TODAY)}
								onclick={() => rangeClick(rangeYear2, rangeMonth2, cell)}
								onmouseenter={() => { if (rangeStart && !rangeEnd) rangeHover = new Date(rangeYear2, rangeMonth2, cell); }}
								onmouseleave={() => { rangeHover = null; }}
								aria-label="{MONTHS[rangeMonth2]} {cell}, {rangeYear2}"
							>{cell}</button>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<div class="dp-range-summary">
			{#if rangeStart && rangeEnd}
				<span class="dp-range-chip">{formatDisplay(rangeStart)}</span>
				<svg class="dp-range-arrow" viewBox="0 0 16 8" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M0 4h13M10 1l3 3-3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
				<span class="dp-range-chip">{formatDisplay(rangeEnd)}</span>
			{:else if rangeStart}
				<span class="dp-range-chip">{formatDisplay(rangeStart)}</span>
				<span class="dp-range-hint">— click an end date</span>
			{:else}
				<span class="dp-range-hint">Click to set start date</span>
			{/if}
		</div>
	</div>

	<!-- ═══ 4: TIME PICKER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Time Picker</h3>
		<p class="ds-card__sub">Hour and minute selectors with up/down arrows, AM/PM toggle.</p>
		<div class="dp-time-wrap">
			<div class="dp-time">
				<!-- Hour -->
				<div class="dp-time__col">
					<button class="dp-time__arrow" onclick={timeHourUp} aria-label="Increase hour">
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
					<span class="dp-time__val">{pad2(timeHour)}</span>
					<button class="dp-time__arrow" onclick={timeHourDown} aria-label="Decrease hour">
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
				</div>
				<span class="dp-time__sep">:</span>
				<!-- Minute -->
				<div class="dp-time__col">
					<button class="dp-time__arrow" onclick={timeMinUp} aria-label="Increase minute">
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
					<span class="dp-time__val">{pad2(timeMinute)}</span>
					<button class="dp-time__arrow" onclick={timeMinDown} aria-label="Decrease minute">
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
				</div>
				<!-- AM/PM -->
				<div class="dp-time__ampm">
					<button
						class="dp-time__period"
						class:dp-time__period--active={timeAm}
						onclick={() => timeAm = true}
					>AM</button>
					<button
						class="dp-time__period"
						class:dp-time__period--active={!timeAm}
						onclick={() => timeAm = false}
					>PM</button>
				</div>
			</div>
			<div class="dp-time-display">
				<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="dp-time-display__icon">
					<circle cx="10" cy="10" r="7.5" stroke-width="1.5"/>
					<path d="M10 6v4.5l3 1.5" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<span class="dp-time-display__val">{timeDisplay}</span>
			</div>
		</div>
	</div>

	<!-- ═══ 5: DATE + TIME COMBINED ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Date + Time Combined</h3>
		<p class="ds-card__sub">Date input that toggles a calendar dropdown, with an inline time selector below.</p>
		<div class="dp-combined-wrap">
			<div class="dp-combined-trigger-row">
				<!-- Date trigger -->
				<button
					class="dp-field dp-field--btn"
					class:dp-field--active={dtOpen}
					onclick={() => dtOpen = !dtOpen}
					aria-expanded={dtOpen}
					aria-label="Select date"
				>
					<svg class="dp-field__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor">
						<rect x="3" y="4" width="14" height="13" rx="2" stroke-width="1.5"/>
						<path d="M3 8h14" stroke-width="1.5"/>
						<path d="M7 2v3M13 2v3" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
					<span class="dp-field__text" class:dp-field__text--placeholder={!dtSelected}>
						{dtDisplayDate}
					</span>
					<svg class="dp-field__chevron" class:dp-field__chevron--open={dtOpen} viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8">
						<path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<!-- Time display (always visible) -->
				<div class="dp-combined-time-pill">
					<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" class="dp-combined-time-pill__icon">
						<circle cx="8" cy="8" r="6" stroke-width="1.5"/>
						<path d="M8 5v3.5l2 1" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
					{dtDisplayTime}
				</div>
			</div>

			{#if dtOpen}
				<div class="dp-combined-popup">
					<!-- Calendar -->
					<div class="dp-cal">
						<div class="dp-cal__header">
							<button class="dp-cal__nav" onclick={dtPrev} aria-label="Previous month">
								<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
							<span class="dp-cal__title">{MONTHS[dtMonth]} {dtYear}</span>
							<button class="dp-cal__nav" onclick={dtNextMonth} aria-label="Next month">
								<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
						</div>
						<div class="dp-cal__grid">
							{#each DAYS as d}
								<span class="dp-cal__dow">{d}</span>
							{/each}
							{#each dtGrid as cell}
								{#if cell === null}
									<span></span>
								{:else}
									<button
										class="dp-cal__day"
										class:dp-cal__day--today={sameDay(new Date(dtYear, dtMonth, cell), TODAY)}
										class:dp-cal__day--selected={sameDay(dtSelected, new Date(dtYear, dtMonth, cell))}
										onclick={() => dtSelectDay(cell)}
										aria-label="{MONTHS[dtMonth]} {cell}, {dtYear}"
									>{cell}</button>
								{/if}
							{/each}
						</div>
					</div>
					<!-- Divider -->
					<div class="dp-combined-divider"></div>
					<!-- Time -->
					<div class="dp-time dp-time--compact">
						<div class="dp-time__col">
							<button class="dp-time__arrow" onclick={() => dtHour = dtHour === 12 ? 1 : dtHour + 1} aria-label="Increase hour">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
							<span class="dp-time__val">{pad2(dtHour)}</span>
							<button class="dp-time__arrow" onclick={() => dtHour = dtHour === 1 ? 12 : dtHour - 1} aria-label="Decrease hour">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
						</div>
						<span class="dp-time__sep">:</span>
						<div class="dp-time__col">
							<button class="dp-time__arrow" onclick={() => dtMinute = (dtMinute + 1) % 60} aria-label="Increase minute">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
							<span class="dp-time__val">{pad2(dtMinute)}</span>
							<button class="dp-time__arrow" onclick={() => dtMinute = (dtMinute - 1 + 60) % 60} aria-label="Decrease minute">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
						</div>
						<div class="dp-time__ampm">
							<button class="dp-time__period" class:dp-time__period--active={dtAm} onclick={() => dtAm = true}>AM</button>
							<button class="dp-time__period" class:dp-time__period--active={!dtAm} onclick={() => dtAm = false}>PM</button>
						</div>
					</div>
					<button class="dp-combined-confirm" onclick={() => dtOpen = false}>
						Confirm — {dtDisplayDate}, {dtDisplayTime}
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ═══ 6: PRESET RANGES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Preset Ranges</h3>
		<p class="ds-card__sub">Quick-select buttons that fill the date range. Click "Custom" to mark a custom selection.</p>
		<div class="dp-preset-wrap">
			<div class="dp-preset-pills">
				{#each presets as p}
					<button
						class="dp-preset-pill"
						class:dp-preset-pill--active={presetActive === p.key}
						onclick={() => applyPreset(p.key)}
					>{p.label}</button>
				{/each}
			</div>
			<div class="dp-preset-result">
				<svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
					<rect x="3" y="4" width="14" height="13" rx="2" stroke-width="1.5"/>
					<path d="M3 8h14" stroke-width="1.5"/>
					<path d="M7 2v3M13 2v3" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<span>{presetLabel}</span>
			</div>
		</div>
	</div>

	<!-- ═══ 7: MINI CALENDAR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Mini Calendar</h3>
		<p class="ds-card__sub">Compact inline calendar — always visible, ideal for sidebars and dashboards.</p>
		<div class="dp-mini-wrap">
			<div class="dp-mini">
				<div class="dp-mini__header">
					<button class="dp-mini__nav" onclick={miniPrev} aria-label="Previous month">
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 2L4 6l4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
					<span class="dp-mini__title">{MONTHS_SHORT[miniMonth]} {miniYear}</span>
					<button class="dp-mini__nav" onclick={miniNext} aria-label="Next month">
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 2l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
				</div>
				<div class="dp-mini__grid">
					{#each DAYS as d}
						<span class="dp-mini__dow">{d}</span>
					{/each}
					{#each miniGrid as cell}
						{#if cell === null}
							<span></span>
						{:else}
							<button
								class="dp-mini__day"
								class:dp-mini__day--today={sameDay(new Date(miniYear, miniMonth, cell), TODAY)}
								class:dp-mini__day--selected={sameDay(miniSelected, new Date(miniYear, miniMonth, cell))}
								onclick={() => miniSelected = new Date(miniYear, miniMonth, cell)}
								aria-label="{MONTHS[miniMonth]} {cell}"
								aria-pressed={sameDay(miniSelected, new Date(miniYear, miniMonth, cell))}
							>{cell}</button>
						{/if}
					{/each}
				</div>
				{#if miniSelected}
					<div class="dp-mini__selected">
						{formatDisplay(miniSelected)}
					</div>
				{/if}
			</div>
			<div class="dp-mini-sidebar">
				<p class="dp-mini-sidebar__label">Upcoming</p>
				{#each [
					{ label: 'Design review', time: 'Mar 6 · 2:00 PM' },
					{ label: 'Sprint planning', time: 'Mar 9 · 10:00 AM' },
					{ label: 'Quarterly review', time: 'Mar 14 · 9:00 AM' },
					{ label: 'Team offsite', time: 'Mar 20 · 8:00 AM' },
				] as evt}
					<div class="dp-mini-event">
						<div class="dp-mini-event__dot"></div>
						<div>
							<div class="dp-mini-event__name">{evt.label}</div>
							<div class="dp-mini-event__time">{evt.time}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ 8: EVENT SCHEDULER ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Event Scheduler</h3>
		<p class="ds-card__sub">Full composition — event name, date picker with calendar popover, time selector, and schedule action.</p>
		<div class="dp-evt-wrap">
			<!-- Event name -->
			<div class="dp-evt-field-group">
				<label class="dp-evt-label" for="evt-name">Event name</label>
				<input
					id="evt-name"
					class="dp-evt-input"
					type="text"
					placeholder="e.g. Team standup"
					bind:value={evtName}
				/>
			</div>

			<!-- Date + Time row -->
			<div class="dp-evt-row">
				<div class="dp-evt-field-group" style="flex: 1;">
					<span class="dp-evt-label">Date</span>
					<div class="dp-evt-trigger-wrap">
						<button
							class="dp-field dp-field--btn dp-field--evt"
							class:dp-field--active={evtCalOpen}
							onclick={() => evtCalOpen = !evtCalOpen}
							aria-expanded={evtCalOpen}
							aria-label="Select event date"
						>
							<svg class="dp-field__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor">
								<rect x="3" y="4" width="14" height="13" rx="2" stroke-width="1.5"/>
								<path d="M3 8h14" stroke-width="1.5"/>
								<path d="M7 2v3M13 2v3" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
							<span class="dp-field__text" class:dp-field__text--placeholder={!evtSelected}>
								{evtDisplayDate}
							</span>
						</button>
						{#if evtCalOpen}
							<div class="dp-evt-popover">
								<div class="dp-cal">
									<div class="dp-cal__header">
										<button class="dp-cal__nav" onclick={evtPrev} aria-label="Previous month">
											<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
										</button>
										<span class="dp-cal__title">{MONTHS[evtMonth]} {evtYear}</span>
										<button class="dp-cal__nav" onclick={evtNextMonth} aria-label="Next month">
											<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
										</button>
									</div>
									<div class="dp-cal__grid">
										{#each DAYS as d}
											<span class="dp-cal__dow">{d}</span>
										{/each}
										{#each evtGrid as cell}
											{#if cell === null}
												<span></span>
											{:else}
												<button
													class="dp-cal__day"
													class:dp-cal__day--today={sameDay(new Date(evtYear, evtMonth, cell), TODAY)}
													class:dp-cal__day--selected={sameDay(evtSelected, new Date(evtYear, evtMonth, cell))}
													onclick={() => evtSelectDay(cell)}
													aria-label="{MONTHS[evtMonth]} {cell}, {evtYear}"
												>{cell}</button>
											{/if}
										{/each}
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="dp-evt-field-group">
					<span class="dp-evt-label">Time</span>
					<div class="dp-time dp-time--compact dp-time--evt">
						<div class="dp-time__col">
							<button class="dp-time__arrow" onclick={() => evtHour = evtHour === 12 ? 1 : evtHour + 1} aria-label="Increase hour">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
							<span class="dp-time__val">{pad2(evtHour)}</span>
							<button class="dp-time__arrow" onclick={() => evtHour = evtHour === 1 ? 12 : evtHour - 1} aria-label="Decrease hour">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
						</div>
						<span class="dp-time__sep">:</span>
						<div class="dp-time__col">
							<button class="dp-time__arrow" onclick={() => evtMinute = (evtMinute + 1) % 60} aria-label="Increase minute">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
							<span class="dp-time__val">{pad2(evtMinute)}</span>
							<button class="dp-time__arrow" onclick={() => evtMinute = (evtMinute - 1 + 60) % 60} aria-label="Decrease minute">
								<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</button>
						</div>
						<div class="dp-time__ampm">
							<button class="dp-time__period" class:dp-time__period--active={evtAm} onclick={() => evtAm = true}>AM</button>
							<button class="dp-time__period" class:dp-time__period--active={!evtAm} onclick={() => evtAm = false}>PM</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Schedule button -->
			<button
				class="dp-evt-submit"
				class:dp-evt-submit--done={evtScheduled}
				onclick={scheduleEvent}
				disabled={!evtName.trim() || !evtSelected}
			>
				{#if evtScheduled}
					<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
					Scheduled for {evtDisplayDate} at {evtDisplayTime}
				{:else}
					<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M2 7h12M5 1v3M11 1v3" stroke-linecap="round"/></svg>
					Schedule Event
				{/if}
			</button>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  DATE FIELD INPUT                                             */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-field-row {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.dp-field {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 38px;
		padding: 0 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		transition: border-color 0.15s, box-shadow 0.15s;
		min-width: 180px;
	}

	.dp-field--focused,
	.dp-field:focus-within {
		border-color: var(--dt);
		box-shadow: 0 0 0 2px var(--dbg3);
	}

	.dp-field--active {
		border-color: var(--dt);
		box-shadow: 0 0 0 2px var(--dbg3);
	}

	.dp-field--disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.dp-field--btn {
		cursor: pointer;
		user-select: none;
		min-width: 180px;
	}

	.dp-field--btn:hover:not(.dp-field--active) {
		border-color: var(--dbd2);
		background: var(--dbg3);
	}

	.dp-field--evt {
		width: 100%;
		min-width: 0;
	}

	.dp-field__icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		color: var(--dt3);
	}

	.dp-field__input {
		flex: 1;
		border: none;
		background: transparent;
		font-size: 13px;
		font-family: inherit;
		color: var(--dt);
		outline: none;
		min-width: 0;
	}

	.dp-field__input::placeholder { color: var(--dt4); }
	.dp-field__input:disabled { cursor: not-allowed; }

	.dp-field__text {
		flex: 1;
		font-size: 13px;
		color: var(--dt);
		text-align: left;
	}

	.dp-field__text--placeholder { color: var(--dt4); }

	.dp-field__chevron {
		width: 14px;
		height: 14px;
		color: var(--dt3);
		transition: transform 0.15s;
		flex-shrink: 0;
	}

	.dp-field__chevron--open {
		transform: rotate(180deg);
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  CALENDAR BASE                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-cal {
		display: inline-flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		max-width: 260px;
	}

	.dp-cal--range {
		max-width: 260px;
		width: 260px;
	}

	.dp-cal__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 4px;
	}

	.dp-cal__nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: 1px solid var(--dbd);
		border-radius: 6px;
		background: var(--dbg2);
		cursor: pointer;
		color: var(--dt2);
		transition: background 0.12s, color 0.12s;
		flex-shrink: 0;
	}

	.dp-cal__nav:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.dp-cal__nav svg {
		width: 14px;
		height: 14px;
	}

	.dp-cal__title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.dp-cal__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
	}

	.dp-cal__dow {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 28px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		letter-spacing: 0.03em;
	}

	.dp-cal__day {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 32px;
		width: 100%;
		border: none;
		border-radius: 6px;
		background: transparent;
		font-size: 13px;
		font-family: inherit;
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
		position: relative;
		z-index: 1;
	}

	.dp-cal__day:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.dp-cal__day--today {
		color: var(--dt);
		font-weight: 700;
	}

	.dp-cal__day--today::after {
		content: '';
		position: absolute;
		bottom: 4px;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--dt);
	}

	.dp-cal__day--selected {
		background: var(--dt) !important;
		color: #fff !important;
		font-weight: 600;
	}

	/* light mode: invert for selected */
	:global(:not(.dark)) .dp-cal__day--selected {
		background: #111 !important;
		color: #fff !important;
	}

	:global(.dark) .dp-cal__day--selected {
		background: #fff !important;
		color: #111 !important;
	}

	.dp-cal__footer {
		margin-top: 4px;
		font-size: 12px;
		color: var(--dt3);
		padding: 8px 4px 0;
		border-top: 1px solid var(--dbd);
	}

	.dp-cal__footer strong {
		color: var(--dt);
		font-weight: 600;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  DATE RANGE                                                   */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-range-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.dp-range-months {
		display: flex;
		gap: 80px;
	}

	.dp-range-wrap {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
	}

	/* Range highlight states on day cells */
	.dp-cal__day.range-start {
		border-radius: 6px 0 0 6px;
		background: var(--dt) !important;
		color: #fff !important;
	}

	:global(:not(.dark)) .dp-cal__day.range-start {
		background: #111 !important;
		color: #fff !important;
	}

	:global(.dark) .dp-cal__day.range-start {
		background: #fff !important;
		color: #111 !important;
	}

	.dp-cal__day.range-end {
		border-radius: 0 6px 6px 0;
		background: var(--dt) !important;
		color: #fff !important;
	}

	:global(:not(.dark)) .dp-cal__day.range-end {
		background: #111 !important;
		color: #fff !important;
	}

	:global(.dark) .dp-cal__day.range-end {
		background: #fff !important;
		color: #111 !important;
	}

	.dp-cal__day.range-mid {
		border-radius: 0;
		background: var(--dbg3) !important;
		color: var(--dt) !important;
	}

	.dp-range-summary {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 16px;
		padding-top: 14px;
		border-top: 1px solid var(--dbd);
		flex-wrap: wrap;
	}

	.dp-range-chip {
		display: inline-flex;
		align-items: center;
		height: 28px;
		padding: 0 10px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt);
	}

	.dp-range-arrow {
		width: 20px;
		height: 10px;
		color: var(--dt3);
	}

	.dp-range-hint {
		font-size: 12px;
		color: var(--dt3);
		font-style: italic;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  TIME PICKER                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-time-wrap {
		display: flex;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}

	.dp-time {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
	}

	.dp-time--compact {
		padding: 8px 10px;
		gap: 6px;
	}

	.dp-time--evt {
		background: var(--dbg2);
	}

	.dp-time__col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
	}

	.dp-time__arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: 1px solid var(--dbd);
		border-radius: 5px;
		background: var(--dbg);
		cursor: pointer;
		color: var(--dt3);
		transition: background 0.1s, color 0.1s;
	}

	.dp-time__arrow:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.dp-time__arrow svg {
		width: 10px;
		height: 10px;
	}

	.dp-time__val {
		font-size: 22px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--dt);
		min-width: 36px;
		text-align: center;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.dp-time--compact .dp-time__val {
		font-size: 18px;
		min-width: 28px;
	}

	.dp-time__sep {
		font-size: 22px;
		font-weight: 700;
		color: var(--dt3);
		margin-top: -4px;
		line-height: 1;
	}

	.dp-time--compact .dp-time__sep {
		font-size: 18px;
	}

	.dp-time__ampm {
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-left: 4px;
	}

	.dp-time__period {
		height: 28px;
		padding: 0 9px;
		border: 1px solid var(--dbd);
		border-radius: 5px;
		background: var(--dbg);
		font-size: 11px;
		font-weight: 600;
		font-family: inherit;
		color: var(--dt3);
		cursor: pointer;
		letter-spacing: 0.03em;
		transition: background 0.1s, color 0.1s, border-color 0.1s;
	}

	.dp-time__period:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.dp-time__period--active {
		background: var(--dt) !important;
		color: #fff !important;
		border-color: var(--dt) !important;
	}

	:global(:not(.dark)) .dp-time__period--active {
		background: #111 !important;
		color: #fff !important;
		border-color: #111 !important;
	}

	:global(.dark) .dp-time__period--active {
		background: #fff !important;
		color: #111 !important;
		border-color: #fff !important;
	}

	.dp-time-display {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 18px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
	}

	.dp-time-display__icon {
		width: 20px;
		height: 20px;
		color: var(--dt3);
	}

	.dp-time-display__val {
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  DATE + TIME COMBINED                                         */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-combined-wrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 380px;
	}

	.dp-combined-trigger-row {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.dp-combined-time-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 38px;
		padding: 0 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt2);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.dp-combined-time-pill__icon {
		width: 14px;
		height: 14px;
		color: var(--dt3);
	}

	.dp-combined-popup {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.08);
	}

	.dp-combined-divider {
		height: 1px;
		background: var(--dbd);
	}

	.dp-combined-confirm {
		height: 36px;
		padding: 0 14px;
		background: var(--dt);
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.15s;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(:not(.dark)) .dp-combined-confirm {
		background: #111;
		color: #fff;
	}

	:global(.dark) .dp-combined-confirm {
		background: #fff;
		color: #111;
	}

	.dp-combined-confirm:hover { opacity: 0.85; }

	/* ══════════════════════════════════════════════════════════════ */
	/*  PRESET RANGES                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-preset-wrap {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.dp-preset-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.dp-preset-pill {
		height: 32px;
		padding: 0 14px;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg2);
		font-size: 12px;
		font-weight: 500;
		font-family: inherit;
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.12s, color 0.12s, border-color 0.12s;
	}

	.dp-preset-pill:hover {
		background: var(--dbg3);
		color: var(--dt);
		border-color: var(--dbd2);
	}

	.dp-preset-pill--active {
		background: var(--dt) !important;
		color: #fff !important;
		border-color: var(--dt) !important;
	}

	:global(:not(.dark)) .dp-preset-pill--active {
		background: #111 !important;
		color: #fff !important;
		border-color: #111 !important;
	}

	:global(.dark) .dp-preset-pill--active {
		background: #fff !important;
		color: #111 !important;
		border-color: #fff !important;
	}

	.dp-preset-result {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 36px;
		padding: 0 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		font-size: 13px;
		color: var(--dt);
		font-weight: 500;
		max-width: 380px;
	}

	.dp-preset-result svg {
		width: 15px;
		height: 15px;
		color: var(--dt3);
		flex-shrink: 0;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  MINI CALENDAR                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-mini-wrap {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.dp-mini {
		display: flex;
		flex-direction: column;
		gap: 4px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 14px;
		width: 196px;
	}

	.dp-mini__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.dp-mini__nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border: none;
		border-radius: 4px;
		background: transparent;
		cursor: pointer;
		color: var(--dt3);
		transition: background 0.1s, color 0.1s;
	}

	.dp-mini__nav:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.dp-mini__nav svg {
		width: 10px;
		height: 10px;
	}

	.dp-mini__title {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		letter-spacing: -0.01em;
	}

	.dp-mini__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
	}

	.dp-mini__dow {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 22px;
		font-size: 10px;
		font-weight: 600;
		color: var(--dt4);
	}

	.dp-mini__day {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		width: 100%;
		border: none;
		border-radius: 4px;
		background: transparent;
		font-size: 11px;
		font-family: inherit;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
		position: relative;
	}

	.dp-mini__day:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.dp-mini__day--today {
		color: var(--dt);
		font-weight: 700;
	}

	.dp-mini__day--today::after {
		content: '';
		position: absolute;
		bottom: 2px;
		left: 50%;
		transform: translateX(-50%);
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--dt);
	}

	.dp-mini__day--selected {
		background: var(--dt) !important;
		color: #fff !important;
	}

	:global(:not(.dark)) .dp-mini__day--selected {
		background: #111 !important;
		color: #fff !important;
	}

	:global(.dark) .dp-mini__day--selected {
		background: #fff !important;
		color: #111 !important;
	}

	.dp-mini__selected {
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px solid var(--dbd);
		font-size: 11px;
		font-weight: 500;
		color: var(--dt2);
		text-align: center;
	}

	.dp-mini-sidebar {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 2px;
	}

	.dp-mini-sidebar__label {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
		margin: 0 0 2px;
	}

	.dp-mini-event {
		display: flex;
		align-items: flex-start;
		gap: 8px;
	}

	.dp-mini-event__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--dt);
		margin-top: 4px;
		flex-shrink: 0;
		opacity: 0.5;
	}

	.dp-mini-event__name {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt);
		line-height: 1.3;
	}

	.dp-mini-event__time {
		font-size: 11px;
		color: var(--dt3);
		margin-top: 1px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  EVENT SCHEDULER                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.dp-evt-wrap {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 500px;
	}

	.dp-evt-field-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.dp-evt-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		letter-spacing: 0.01em;
	}

	.dp-evt-input {
		height: 38px;
		padding: 0 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		font-size: 13px;
		font-family: inherit;
		color: var(--dt);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.dp-evt-input::placeholder { color: var(--dt4); }

	.dp-evt-input:focus {
		border-color: var(--dt);
		box-shadow: 0 0 0 2px var(--dbg3);
	}

	.dp-evt-row {
		display: flex;
		gap: 12px;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	.dp-evt-trigger-wrap {
		position: relative;
	}

	.dp-evt-popover {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 20;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 14px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.12);
	}

	:global(:not(.dark)) .dp-evt-popover {
		background: #fff;
	}

	:global(.dark) .dp-evt-popover {
		background: #1a1a1a;
	}

	.dp-evt-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		height: 40px;
		padding: 0 18px;
		border: none;
		border-radius: 9px;
		font-size: 13px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.15s, background 0.2s;
		background: var(--dt);
		color: #fff;
	}

	:global(:not(.dark)) .dp-evt-submit {
		background: #111;
		color: #fff;
	}

	:global(.dark) .dp-evt-submit {
		background: #fff;
		color: #111;
	}

	.dp-evt-submit:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.dp-evt-submit:not(:disabled):hover { opacity: 0.85; }

	.dp-evt-submit--done {
		background: #16a34a !important;
		color: #fff !important;
		opacity: 1 !important;
	}

	.dp-evt-submit svg {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}
</style>
