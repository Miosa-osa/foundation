<script lang="ts">
	// ── Types ─────────────────────────────────────────────────────
	type PlayState = 'idle' | 'playing' | 'paused';
	type RecordState = 'idle' | 'recording' | 'paused';

	interface VoiceNote {
		id: number;
		title: string;
		duration: string;
		durationSec: number;
		date: string;
		transcript: string;
		tags: string[];
		waveform: number[];
	}

	interface TranscriptSegment {
		id: number;
		speaker: string;
		start: string;
		end: string;
		text: string;
	}

	interface VoiceCommand {
		id: number;
		phrase: string;
		description: string;
		icon: string;
		confidence: number;
		recognized: boolean;
	}

	interface NoteFolder {
		id: number;
		name: string;
		count: number;
		expanded: boolean;
		children?: NoteFolder[];
	}

	// ── Demo 1: Voice Recorder ────────────────────────────────────
	let recordState = $state<RecordState>('idle');
	let recordSeconds = $state(0);
	let recordInterval = $state<ReturnType<typeof setInterval> | null>(null);

	const recordBars = [40,55,70,45,80,60,35,75,50,65,42,78,55,68,48,82,62,38,72,58,44,76,52,66,41];

	function toggleRecord() {
		if (recordState === 'idle') {
			recordState = 'recording';
			recordInterval = setInterval(() => { recordSeconds += 1; }, 1000);
		} else if (recordState === 'recording') {
			recordState = 'paused';
			if (recordInterval) { clearInterval(recordInterval); recordInterval = null; }
		} else {
			recordState = 'recording';
			recordInterval = setInterval(() => { recordSeconds += 1; }, 1000);
		}
	}

	function stopRecord() {
		recordState = 'idle';
		recordSeconds = 0;
		if (recordInterval) { clearInterval(recordInterval); recordInterval = null; }
	}

	function formatRecordTime(sec: number): string {
		const m = Math.floor(sec / 60).toString().padStart(2, '0');
		const s = (sec % 60).toString().padStart(2, '0');
		return `${m}:${s}`;
	}

	// ── Demo 2: Note Cards ────────────────────────────────────────
	let notes: VoiceNote[] = $state([
		{
			id: 1,
			title: 'Product Roadmap Ideas',
			duration: '3:42',
			durationSec: 222,
			date: 'Today, 2:15 PM',
			transcript: 'We should focus on the onboarding experience first. The main friction points are the initial setup wizard and the API key configuration step...',
			tags: ['product', 'roadmap'],
			waveform: [30,55,70,40,80,60,45,75,50,65,35,78,55,68,48,82,40,55,72,58,44,76,30,66,41],
		},
		{
			id: 2,
			title: 'Client Call — Acme Corp',
			duration: '12:08',
			durationSec: 728,
			date: 'Yesterday, 4:30 PM',
			transcript: 'They are interested in the enterprise tier but need custom SSO integration. Follow up with pricing by end of week and loop in the solutions team...',
			tags: ['client', 'sales'],
			waveform: [45,60,35,75,50,80,40,65,55,70,42,78,48,68,38,82,52,62,44,76,36,72,58,66,41],
		},
		{
			id: 3,
			title: 'Design Review Notes',
			duration: '7:21',
			durationSec: 441,
			date: 'Dec 2, 2024',
			transcript: 'The new color system looks great. Need to revisit the dark mode contrast ratios on secondary buttons and update the spacing tokens throughout...',
			tags: ['design', 'review'],
			waveform: [55,40,75,45,85,35,70,50,65,80,42,55,68,38,78,48,62,82,44,72,36,76,58,42,66],
		},
		{
			id: 4,
			title: 'Weekly Standup — Eng Team',
			duration: '18:55',
			durationSec: 1135,
			date: 'Dec 1, 2024',
			transcript: 'Blocking issue with the database migrations in staging. Alex is looking into it. Expected resolution by tomorrow morning before the release window...',
			tags: ['engineering', 'standup'],
			waveform: [35,65,50,80,40,70,55,45,75,60,38,82,48,68,42,78,52,62,36,72,44,76,58,30,66],
		},
	]);

	let openMenuId = $state<number | null>(null);
	let playingNoteId = $state<number | null>(null);

	function toggleNotePlay(id: number) {
		playingNoteId = playingNoteId === id ? null : id;
	}

	function toggleMenu(id: number) {
		openMenuId = openMenuId === id ? null : id;
	}

	function deleteNote(id: number) {
		notes = notes.filter(n => n.id !== id);
		openMenuId = null;
	}

	// ── Demo 3: Audio Player ──────────────────────────────────────
	let playerState = $state<PlayState>('paused');
	let playerProgress = $state(34);
	let playerSpeed = $state('1x');
	let playerVolume = $state(75);
	const playerSpeeds = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];
	const playerDuration = '12:08';
	const playerCurrentRaw = $derived(Math.round((playerProgress / 100) * 728));
	const playerCurrent = $derived(
		`${Math.floor(playerCurrentRaw / 60).toString().padStart(2,'0')}:${(playerCurrentRaw % 60).toString().padStart(2,'0')}`
	);

	function togglePlayer() {
		playerState = playerState === 'playing' ? 'paused' : 'playing';
	}

	// ── Demo 4: Transcription View ────────────────────────────────
	let transcriptSegments: TranscriptSegment[] = $state([
		{ id: 1, speaker: 'You',    start: '0:00', end: '0:22', text: "Alright, let's kick things off. I wanted to talk through the roadmap for Q1 and get everyone aligned on priorities before the planning meeting." },
		{ id: 2, speaker: 'Sarah',  start: '0:23', end: '0:48', text: "Sounds good. I think we should lead with the new onboarding flow — we have strong signals from user research that it's the biggest friction point right now." },
		{ id: 3, speaker: 'You',    start: '0:49', end: '1:15', text: "Agreed. The data shows a 40% drop-off at the API key step. If we can cut that to under 20% we're in a much better position for our Q1 growth targets." },
		{ id: 4, speaker: 'Marcus', start: '1:16', end: '1:44', text: "From an engineering side, we could simplify key creation to a single click during setup and defer the permissions config to a later step in the flow." },
		{ id: 5, speaker: 'Sarah',  start: '1:45', end: '2:10', text: "That would also help with mobile — right now the permissions screen is really hard to navigate on smaller screens. Two birds, one stone." },
		{ id: 6, speaker: 'You',    start: '2:11', end: '2:35', text: "Perfect. Let's scope that as the first sprint. Marcus can you put together a rough estimate by Thursday so we can plan resourcing accordingly?" },
	]);

	let transcriptPlayState = $state<PlayState>('paused');
	let activeSegmentId = $state(3);

	function toggleTranscriptPlay() {
		transcriptPlayState = transcriptPlayState === 'playing' ? 'paused' : 'playing';
	}

	function setActiveSegment(id: number) {
		activeSegmentId = id;
	}

	// ── Demo 5: Voice Commands ────────────────────────────────────
	let voiceCommands: VoiceCommand[] = $state([
		{ id: 1, phrase: 'Create note',          description: 'Start a new voice note recording',      icon: 'mic',    confidence: 97, recognized: true  },
		{ id: 2, phrase: 'Search notes',          description: 'Open the search and filter panel',      icon: 'search', confidence: 89, recognized: true  },
		{ id: 3, phrase: 'Play last recording',   description: 'Resume the most recent voice note',     icon: '▶',      confidence: 94, recognized: true  },
		{ id: 4, phrase: 'Transcribe recording',  description: 'Run AI transcription on selected note', icon: 'edit',   confidence: 78, recognized: false },
		{ id: 5, phrase: 'Share with team',       description: 'Share selected note to workspace',      icon: '↗',      confidence: 85, recognized: true  },
		{ id: 6, phrase: 'Delete note',           description: 'Delete the currently selected note',    icon: 'trash',  confidence: 91, recognized: true  },
	]);

	let cmdListening = $state(false);
	let cmdProcessing = $state(false);
	let cmdRecognized = $state('');

	function toggleCmdListening() {
		if (cmdProcessing) return;
		cmdListening = !cmdListening;
		if (cmdListening) {
			cmdRecognized = '';
			setTimeout(() => {
				cmdRecognized = 'Create note';
				cmdProcessing = true;
				cmdListening = false;
				setTimeout(() => { cmdProcessing = false; }, 1200);
			}, 1800);
		}
	}

	// ── Demo 6: Note Organization ─────────────────────────────────
	let folders: NoteFolder[] = $state([
		{
			id: 1, name: 'Work', count: 24, expanded: true,
			children: [
				{ id: 11, name: 'Client Calls',   count: 8,  expanded: false },
				{ id: 12, name: 'Team Meetings',  count: 11, expanded: false },
				{ id: 13, name: 'Product Notes',  count: 5,  expanded: false },
			],
		},
		{
			id: 2, name: 'Personal', count: 12, expanded: false,
			children: [
				{ id: 21, name: 'Ideas',   count: 6, expanded: false },
				{ id: 22, name: 'Journal', count: 6, expanded: false },
			],
		},
		{ id: 3, name: 'Projects', count: 9,  expanded: false },
		{ id: 4, name: 'Archive',  count: 31, expanded: false },
	]);

	const tags = [
		{ label: 'product',     count: 14 },
		{ label: 'design',      count: 9  },
		{ label: 'engineering', count: 11 },
		{ label: 'client',      count: 8  },
		{ label: 'sales',       count: 6  },
		{ label: 'standup',     count: 15 },
		{ label: 'review',      count: 7  },
		{ label: 'roadmap',     count: 5  },
		{ label: 'ideas',       count: 10 },
		{ label: 'personal',    count: 4  },
	];

	let orgSearch = $state('');
	let orgSort = $state('date');
	const orgSorts = ['date', 'duration', 'title'];
	let orgSelectedTag = $state<string | null>(null);
	let orgActiveFiltter = $state('All time');
	const orgFilters = ['All time', 'Today', 'This week', 'This month', '< 5 min', '5–15 min', '> 15 min'];

	const recentRecordings = [
		{ id: 1, title: 'Product Roadmap Ideas',      duration: '3:42',  date: 'Today 2:15 PM',     active: true  },
		{ id: 2, title: 'Client Call — Acme Corp',    duration: '12:08', date: 'Yesterday 4:30 PM', active: false },
		{ id: 3, title: 'Design Review Notes',        duration: '7:21',  date: 'Dec 2',             active: false },
		{ id: 4, title: 'Weekly Standup — Eng Team',  duration: '18:55', date: 'Dec 1',             active: false },
		{ id: 5, title: 'Q4 Planning Session',        duration: '25:14', date: 'Nov 28',            active: false },
	];

	function toggleFolder(id: number) {
		folders = folders.map(f => {
			if (f.id === id) return { ...f, expanded: !f.expanded };
			if (f.children) return { ...f, children: f.children.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c) };
			return f;
		});
	}
</script>

<section class="ds-section">
	<h2 class="ds-section-title">Voice Notes</h2>
	<p class="ds-section-desc">Audio recording, playback, transcription, and voice command UI patterns.</p>

	<!-- ── 1. Voice Recorder ─────────────────────────────────────── -->
	<h3 class="ds-sub-title">Voice Recorder</h3>
	<div class="vn-recorder-shell">
		<div class="vn-recorder-card">
			<div class="vn-quality-badge">
				<span class="vn-quality-dot"></span>
				<span>High Quality · 44.1 kHz · Stereo</span>
			</div>

			<div class="vn-rec-waveform" class:vn-rec-waveform--active={recordState === 'recording'}>
				{#each recordBars as h, i}
					<span
						class="vn-rec-bar"
						class:vn-rec-bar--active={recordState === 'recording'}
						style="height:{h}%; animation-delay:{i * 58}ms"
					></span>
				{/each}
			</div>

			<div class="vn-rec-timer" class:vn-rec-timer--live={recordState === 'recording'}>
				{formatRecordTime(recordSeconds)}
			</div>

			{#if recordState !== 'idle'}
				<div class="vn-rec-status-label" class:vn-rec-status-label--paused={recordState === 'paused'}>
					{recordState === 'recording' ? 'Recording…' : 'Paused'}
				</div>
			{:else}
				<div class="vn-rec-hint">Press the mic button to begin recording</div>
			{/if}

			<div class="vn-rec-controls">
				{#if recordState !== 'idle'}
					<button class="btn-compact btn-compact-ghost vn-rec-secondary-btn" onclick={stopRecord} aria-label="Stop recording">
						<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>
						<span>Stop</span>
					</button>
				{/if}

				<button
					class="btn-pill btn-pill-primary btn-pill-icon vn-rec-main-btn"
					class:vn-rec-main-btn--recording={recordState === 'recording'}
					class:vn-rec-main-btn--paused={recordState === 'paused'}
					onclick={toggleRecord}
					aria-label={recordState === 'idle' ? 'Start recording' : recordState === 'recording' ? 'Pause recording' : 'Resume recording'}
				>
					{#if recordState === 'idle'}
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm-1 18.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93z"/></svg>
					{:else if recordState === 'recording'}
						<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm-1 18.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93z"/></svg>
					{/if}
				</button>

				{#if recordState !== 'idle'}
					<button class="btn-compact btn-compact-ghost vn-rec-secondary-btn" aria-label="Save recording">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10H5V5h10v4z"/></svg>
						<span>Save</span>
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 2. Note Cards ──────────────────────────────────────────── -->
	<h3 class="ds-sub-title">Note Cards</h3>
	<div class="vn-cards-grid">
		{#each notes as note (note.id)}
			<div class="vn-note-card" class:vn-note-card--playing={playingNoteId === note.id}>
				<!-- Waveform thumbnail -->
				<div class="vn-thumb-wave">
					{#each note.waveform as h}
						<span
							class="vn-thumb-bar"
							class:vn-thumb-bar--playing={playingNoteId === note.id}
							style="height:{h}%"
						></span>
					{/each}
					<button
						class="vn-thumb-play-overlay"
						onclick={() => toggleNotePlay(note.id)}
						aria-label={playingNoteId === note.id ? 'Pause' : 'Play'}
					>
						{#if playingNoteId === note.id}
							<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
						{:else}
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
						{/if}
					</button>
				</div>

				<div class="vn-note-meta-row">
					<span class="vn-note-duration">{note.duration}</span>
					<span class="vn-note-date">{note.date}</span>
				</div>

				<h4 class="vn-note-title">{note.title}</h4>
				<p class="vn-note-snippet">{note.transcript}</p>

				<div class="vn-note-tags">
					{#each note.tags as tag}
						<span class="vn-tag">{tag}</span>
					{/each}
				</div>

				<div class="vn-note-footer">
					<div class="vn-menu-wrap">
						<button class="vn-menu-trigger" onclick={() => toggleMenu(note.id)} aria-label="Note options">
							<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
						</button>
						{#if openMenuId === note.id}
							<div class="vn-dropdown">
								<button class="vn-dropdown-item">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
									Rename
								</button>
								<button class="vn-dropdown-item">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
									Share
								</button>
								<div class="vn-dropdown-sep"></div>
								<button class="vn-dropdown-item vn-dropdown-item--danger" onclick={() => deleteNote(note.id)}>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
									Delete
								</button>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- ── 3. Audio Player ────────────────────────────────────────── -->
	<h3 class="ds-sub-title">Audio Player</h3>
	<div class="vn-player-shell">
		<div class="vn-player">
			<div class="vn-player-info">
				<div class="vn-player-icon-wrap">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 12a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V22h2v-1.06A9 9 0 0 0 21 12h-2z"/></svg>
				</div>
				<div class="vn-player-track">
					<span class="vn-player-title">Client Call — Acme Corp</span>
					<span class="vn-player-sub">Yesterday, 4:30 PM</span>
				</div>
			</div>

			<div class="vn-player-center">
				<button class="btn-compact btn-compact-ghost btn-compact-icon vn-ctrl-btn" aria-label="Skip back 15 seconds">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
					<span class="vn-ctrl-label">15</span>
				</button>

				<button class="btn-pill btn-pill-primary btn-pill-icon vn-ctrl-play-btn" onclick={togglePlayer} aria-label={playerState === 'playing' ? 'Pause' : 'Play'}>
					{#if playerState === 'playing'}
						<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
					{/if}
				</button>

				<button class="btn-compact btn-compact-ghost btn-compact-icon vn-ctrl-btn" aria-label="Skip forward 15 seconds">
					<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/></svg>
					<span class="vn-ctrl-label">15</span>
				</button>
			</div>

			<div class="vn-player-right">
				<div class="vn-speed-group">
					{#each playerSpeeds as spd}
						<button
							class="vn-speed-btn"
							class:vn-speed-btn--active={playerSpeed === spd}
							onclick={() => playerSpeed = spd}
						>{spd}</button>
					{/each}
				</div>

				<div class="vn-vol-group">
					<svg class="vn-vol-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
					<input type="range" class="vn-vol-slider" min="0" max="100" bind:value={playerVolume} aria-label="Volume"/>
				</div>

				<button class="btn-compact btn-compact-ghost vn-dl-btn" aria-label="Download recording">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
				</button>
			</div>

			<div class="vn-seek-row">
				<span class="vn-seek-time">{playerCurrent}</span>
				<div class="vn-seek-track">
					<div class="vn-seek-fill" style="width:{playerProgress}%"></div>
					<input type="range" class="vn-seek-input" min="0" max="100" bind:value={playerProgress} aria-label="Seek through recording"/>
				</div>
				<span class="vn-seek-time vn-seek-time--right">{playerDuration}</span>
			</div>
		</div>
	</div>

	<!-- ── 4. Transcription View ──────────────────────────────────── -->
	<h3 class="ds-sub-title">Transcription View</h3>
	<div class="vn-transcript-layout">
		<div class="vn-transcript-player">
			<div class="vn-tp-header">
				<span class="vn-tp-title">Product Roadmap Ideas</span>
				<span class="vn-tp-dur">3:42</span>
			</div>

			<div class="vn-tp-wave">
				{#each recordBars as h, i}
					<span
						class="vn-tp-wave-bar"
						class:vn-tp-wave-bar--played={i < 12}
						style="height:{h}%"
					></span>
				{/each}
			</div>

			<div class="vn-tp-seek">
				<span class="vn-tp-seek-t">1:48</span>
				<div class="vn-tp-seek-track">
					<div class="vn-tp-seek-fill" style="width:48%"></div>
				</div>
				<span class="vn-tp-seek-t">3:42</span>
			</div>

			<div class="vn-tp-controls">
				<button class="btn-pill btn-pill-primary btn-pill-icon vn-tp-play-btn" onclick={toggleTranscriptPlay} aria-label={transcriptPlayState === 'playing' ? 'Pause' : 'Play'}>
					{#if transcriptPlayState === 'playing'}
						<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
					{/if}
				</button>
				<span class="vn-tp-speed-badge">1x</span>
				<span class="vn-tp-spacer"></span>
				<button class="btn-compact btn-compact-ghost vn-tp-action-btn" aria-label="Export transcript">Export</button>
			</div>

			<div class="vn-tp-ai-badge">
				<span class="vn-tp-ai-dot"></span>
				AI Transcribed · 98.4% accuracy
			</div>
		</div>

		<div class="vn-transcript-segments-panel">
			<div class="vn-segments-scroll">
				{#each transcriptSegments as seg (seg.id)}
					<div
						class="vn-seg"
						class:vn-seg--active={seg.id === activeSegmentId}
						role="button"
						tabindex="0"
						onclick={() => setActiveSegment(seg.id)}
						onkeydown={(e) => e.key === 'Enter' && setActiveSegment(seg.id)}
					>
						<div class="vn-seg-header">
							<span
								class="vn-seg-speaker"
								class:vn-seg-speaker--you={seg.speaker === 'You'}
								class:vn-seg-speaker--sarah={seg.speaker === 'Sarah'}
								class:vn-seg-speaker--marcus={seg.speaker === 'Marcus'}
							>{seg.speaker}</span>
							<span class="vn-seg-time">{seg.start} – {seg.end}</span>
							<button class="vn-seg-edit-btn" aria-label="Edit segment">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
							</button>
						</div>
						<p class="vn-seg-text">{seg.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 5. Voice Commands ──────────────────────────────────────── -->
	<h3 class="ds-sub-title">Voice Commands</h3>
	<div class="vn-cmds-panel">
		<div class="vn-cmds-header-row">
			<button
				class="vn-listen-btn"
				class:vn-listen-btn--active={cmdListening}
				class:vn-listen-btn--processing={cmdProcessing}
				onclick={toggleCmdListening}
				aria-label={cmdListening ? 'Stop listening' : 'Start voice command'}
			>
				<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 12a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V22h2v-1.06A9 9 0 0 0 21 12h-2z"/></svg>
				{#if cmdListening}
					Listening…
				{:else if cmdProcessing}
					Processing…
				{:else}
					Say a command
				{/if}
			</button>

			{#if cmdListening}
				<div class="vn-listening-indicator">
					<span class="vn-listening-bar"></span>
					<span class="vn-listening-bar"></span>
					<span class="vn-listening-bar"></span>
					<span class="vn-listening-bar"></span>
					<span class="vn-listening-bar"></span>
				</div>
			{/if}

			{#if cmdRecognized}
				<div class="vn-recognized-row">
					<span class="vn-recognized-label">Heard:</span>
					<span class="vn-recognized-text">"{cmdRecognized}"</span>
					<span class="vn-recognized-badge">matched</span>
				</div>
			{/if}
		</div>

		<div class="vn-cmd-list">
			{#each voiceCommands as cmd (cmd.id)}
				<div class="vn-cmd-item" class:vn-cmd-item--dim={!cmd.recognized}>
					<span class="vn-cmd-icon" aria-hidden="true">
				{#if cmd.icon === 'mic'}
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
				{:else if cmd.icon === 'search'}
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
				{:else if cmd.icon === 'edit'}
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
				{:else if cmd.icon === 'trash'}
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
				{:else}
					{cmd.icon}
				{/if}
			</span>
					<div class="vn-cmd-info">
						<span class="vn-cmd-phrase">"{cmd.phrase}"</span>
						<span class="vn-cmd-desc">{cmd.description}</span>
					</div>
					<div class="vn-cmd-conf-block">
						<div class="vn-conf-track">
							<div
								class="vn-conf-fill"
								class:vn-conf-fill--low={cmd.confidence < 80}
								style="width:{cmd.confidence}%"
							></div>
						</div>
						<span class="vn-conf-pct">{cmd.confidence}%</span>
					</div>
					{#if !cmd.recognized}
						<span class="vn-cmd-status vn-cmd-status--unrecognized">unrecognized</span>
					{:else}
						<span class="vn-cmd-status vn-cmd-status--ok">✓</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 6. Note Organization ───────────────────────────────────── -->
	<h3 class="ds-sub-title">Note Organization</h3>
	<div class="vn-org-layout">
		<aside class="vn-org-sidebar">
			<p class="vn-org-label">Folders</p>
			<ul class="vn-folder-tree">
				{#each folders as folder (folder.id)}
					<li class="vn-folder-item">
						<button class="btn-compact btn-compact-ghost vn-folder-btn" onclick={() => toggleFolder(folder.id)}>
							<svg class="vn-folder-chevron" class:vn-folder-chevron--open={folder.expanded} viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
							<svg class="vn-folder-ico" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z"/></svg>
							<span class="vn-folder-name">{folder.name}</span>
							<span class="vn-folder-count">{folder.count}</span>
						</button>
						{#if folder.expanded && folder.children}
							<ul class="vn-folder-children">
								{#each folder.children as child (child.id)}
									<li>
										<button class="btn-compact btn-compact-ghost vn-folder-btn vn-folder-btn--child">
											<svg class="vn-folder-ico vn-folder-ico--sm" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z"/></svg>
											<span class="vn-folder-name">{child.name}</span>
											<span class="vn-folder-count">{child.count}</span>
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>

			<p class="vn-org-label vn-org-label--mt">Tags</p>
			<div class="vn-tag-cloud">
				{#each tags as tag}
					<button
						class="vn-tag-cloud-btn"
						class:vn-tag-cloud-btn--active={orgSelectedTag === tag.label}
						onclick={() => orgSelectedTag = orgSelectedTag === tag.label ? null : tag.label}
					>
						{tag.label}
						<span class="vn-tag-cloud-count">{tag.count}</span>
					</button>
				{/each}
			</div>
		</aside>

		<div class="vn-org-main">
			<div class="vn-org-search-row">
				<div class="vn-org-search-wrap">
					<svg class="vn-org-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
					<input
						class="vn-org-search"
						type="text"
						placeholder="Search recordings…"
						bind:value={orgSearch}
						aria-label="Search recordings"
					/>
				</div>
				<div class="vn-sort-row">
					<span class="vn-sort-label">Sort:</span>
					{#each orgSorts as s}
						<button
							class="vn-sort-btn"
							class:vn-sort-btn--active={orgSort === s}
							onclick={() => orgSort = s}
						>{s}</button>
					{/each}
				</div>
			</div>

			<div class="vn-filter-row">
				{#each orgFilters as f}
					<button
						class="vn-filter-chip"
						class:vn-filter-chip--active={orgActiveFiltter === f}
						onclick={() => orgActiveFiltter = f}
					>{f}</button>
				{/each}
			</div>

			<ul class="vn-rec-list">
				{#each recentRecordings as rec (rec.id)}
					<li class="vn-rec-list-item" class:vn-rec-list-item--active={rec.active}>
						<div class="vn-rec-list-icon">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 12a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V22h2v-1.06A9 9 0 0 0 21 12h-2z"/></svg>
						</div>
						<div class="vn-rec-list-info">
							<span class="vn-rec-list-title">{rec.title}</span>
							<span class="vn-rec-list-meta">{rec.date} · {rec.duration}</span>
						</div>
						<button class="vn-rec-list-play" aria-label="Play {rec.title}">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	/* ── Section scaffold ────────────────────────────────────────── */
	.ds-section      { padding: 2.5rem 0 3rem; }
	.ds-section-title { font-size: 1.5rem; font-weight: 700; color: var(--dt); margin: 0 0 .4rem; }
	.ds-section-desc  { color: var(--dt3); font-size: .9rem; margin: 0 0 2.5rem; }
	.ds-sub-title     { font-size: .75rem; font-weight: 700; color: var(--dt2); margin: 2.5rem 0 1rem; letter-spacing: .06em; text-transform: uppercase; }

	/* ── 1. Voice Recorder ───────────────────────────────────────── */
	.vn-recorder-shell {
		display: flex;
		justify-content: center;
	}

	.vn-recorder-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1.25rem;
		padding: 2rem 2.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		width: 100%;
		max-width: 480px;
	}

	.vn-quality-badge {
		display: flex;
		align-items: center;
		gap: .45rem;
		font-size: .72rem;
		color: var(--dt3);
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 999px;
		padding: .28rem .8rem;
	}

	.vn-quality-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #4ade80;
		box-shadow: 0 0 6px #4ade8099;
		flex-shrink: 0;
	}

	.vn-rec-waveform {
		display: flex;
		align-items: center;
		gap: 3px;
		height: 56px;
	}

	.vn-rec-bar {
		width: 3px;
		border-radius: 99px;
		background: var(--dbd);
		flex-shrink: 0;
		transition: background .2s;
	}

	.vn-rec-bar--active {
		background: #ef4444;
		animation: vn-wave-bounce .8s ease-in-out infinite alternate;
	}

	@keyframes vn-wave-bounce {
		from { transform: scaleY(.35); }
		to   { transform: scaleY(1);   }
	}

	.vn-rec-timer {
		font-size: 2.5rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--dt);
		letter-spacing: .04em;
		line-height: 1;
	}

	.vn-rec-timer--live { color: #ef4444; }

	.vn-rec-status-label {
		font-size: .78rem;
		font-weight: 600;
		letter-spacing: .06em;
		text-transform: uppercase;
		color: #ef4444;
	}

	.vn-rec-status-label--paused { color: var(--dt3); }

	.vn-rec-hint {
		font-size: .78rem;
		color: var(--dt4);
	}

	.vn-rec-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	/* Size override: main record button is 72px circle */
	.vn-rec-main-btn {
		width: 72px !important;
		height: 72px !important;
		border-radius: 50% !important;
		padding: 0 !important;
	}

	.vn-rec-main-btn svg { width: 28px; height: 28px; }

	.vn-rec-main-btn--recording {
		background: #ef4444 !important;
		animation: vn-pulse-glow 1.4s ease-out infinite;
	}

	.vn-rec-main-btn--paused { background: var(--dt2) !important; }

	/* Secondary rec buttons: column layout with icon+label */
	.vn-rec-secondary-btn {
		flex-direction: column !important;
		gap: .25rem !important;
		padding: .55rem .85rem !important;
	}

	.vn-rec-secondary-btn svg { width: 18px; height: 18px; }

	/* Ctrl buttons: keep relative positioning for the "15" label overlay */
	.vn-ctrl-btn { position: relative; }

	.vn-ctrl-label {
		position: absolute;
		font-size: .52rem;
		font-weight: 700;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: var(--dbg);
		pointer-events: none;
		line-height: 1;
		margin-top: 1px;
	}

	/* Play button in player: 42px circle override */
	.vn-ctrl-play-btn {
		width: 42px !important;
		height: 42px !important;
		border-radius: 50% !important;
		padding: 0 !important;
	}

	.vn-ctrl-play-btn svg { width: 20px; height: 20px; }

	/* Transcript play button: 36px circle */
	.vn-tp-play-btn {
		width: 36px !important;
		height: 36px !important;
		border-radius: 50% !important;
		padding: 0 !important;
		flex-shrink: 0;
	}

	.vn-tp-play-btn svg { width: 15px; height: 15px; }

	/* Download button: 32px square */
	.vn-dl-btn {
		width: 32px !important;
		height: 32px !important;
		padding: 0 !important;
	}

	.vn-dl-btn svg { width: 14px; height: 14px; }

	@keyframes vn-pulse-glow {
		0%   { box-shadow: 0 0 0 0 #ef444455; }
		70%  { box-shadow: 0 0 0 14px #ef444400; }
		100% { box-shadow: 0 0 0 0  #ef444400; }
	}

	/* ── 2. Note Cards ───────────────────────────────────────────── */
	.vn-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
	}

	.vn-note-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: .875rem;
		padding: 1rem 1.1rem;
		display: flex;
		flex-direction: column;
		gap: .65rem;
		transition: border-color .15s;
	}

	.vn-note-card--playing {
		border-color: var(--dbd);
	}

	.vn-thumb-wave {
		position: relative;
		display: flex;
		align-items: center;
		gap: 2px;
		height: 40px;
		background: var(--dbg3);
		border-radius: .5rem;
		padding: 0 .7rem;
		overflow: hidden;
	}

	.vn-thumb-bar {
		width: 2.5px;
		border-radius: 99px;
		background: var(--dbd);
		flex-shrink: 0;
		transition: background .2s;
	}

	.vn-thumb-bar--playing { background: var(--dt2); }

	.vn-thumb-play-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,.5);
		border: none;
		cursor: pointer;
		opacity: 0;
		transition: opacity .15s;
		border-radius: .5rem;
	}

	.vn-thumb-wave:hover .vn-thumb-play-overlay { opacity: 1; }

	.vn-thumb-play-overlay svg { width: 18px; height: 18px; color: #fff; }

	.vn-note-meta-row {
		display: flex;
		justify-content: space-between;
		font-size: .72rem;
		color: var(--dt3);
	}

	.vn-note-duration { font-weight: 600; color: var(--dt2); }

	.vn-note-title {
		font-size: .88rem;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
		line-height: 1.3;
	}

	.vn-note-snippet {
		font-size: .77rem;
		color: var(--dt3);
		margin: 0;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.vn-note-tags { display: flex; flex-wrap: wrap; gap: .3rem; }

	.vn-tag {
		font-size: .68rem;
		padding: .18rem .52rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 999px;
		color: var(--dt3);
	}

	.vn-note-footer { display: flex; justify-content: flex-end; }

	.vn-menu-wrap { position: relative; }

	.vn-menu-trigger {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: .375rem;
		color: var(--dt3);
		transition: background .12s;
	}

	.vn-menu-trigger:hover { background: var(--dbg3); color: var(--dt2); }
	.vn-menu-trigger svg { width: 16px; height: 16px; }

	.vn-dropdown {
		position: absolute;
		bottom: calc(100% + 4px);
		right: 0;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		border-radius: .625rem;
		padding: .3rem;
		min-width: 140px;
		z-index: 20;
		box-shadow: 0 8px 24px rgba(0,0,0,.45);
	}

	.vn-dropdown-item {
		display: flex;
		align-items: center;
		gap: .5rem;
		width: 100%;
		padding: .42rem .6rem;
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: .8rem;
		color: var(--dt2);
		border-radius: .375rem;
		transition: background .12s;
		text-align: left;
		font-family: inherit;
	}

	.vn-dropdown-item svg { width: 13px; height: 13px; flex-shrink: 0; }
	.vn-dropdown-item:hover { background: var(--dbd2); }
	.vn-dropdown-item--danger { color: #f87171; }

	.vn-dropdown-sep {
		height: 1px;
		background: var(--dbd2);
		margin: .25rem 0;
	}

	/* ── 3. Audio Player ─────────────────────────────────────────── */
	.vn-player-shell {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1rem;
		overflow: hidden;
	}

	.vn-player {
		display: grid;
		grid-template-areas: "info center right" "seek seek seek";
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: .9rem .5rem;
		padding: 1.1rem 1.4rem 1.2rem;
	}

	.vn-player-info {
		grid-area: info;
		display: flex;
		align-items: center;
		gap: .65rem;
		min-width: 0;
	}

	.vn-player-icon-wrap {
		width: 36px;
		height: 36px;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: .5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.vn-player-icon-wrap svg { width: 16px; height: 16px; color: var(--dt2); }

	.vn-player-track { display: flex; flex-direction: column; gap: .1rem; min-width: 0; }

	.vn-player-title {
		font-size: .84rem;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.vn-player-sub { font-size: .72rem; color: var(--dt3); }

	.vn-player-center {
		grid-area: center;
		display: flex;
		align-items: center;
		gap: .5rem;
	}

	.vn-player-right {
		grid-area: right;
		display: flex;
		align-items: center;
		gap: .65rem;
		justify-content: flex-end;
	}

	.vn-speed-group {
		display: flex;
		gap: 1px;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: .4rem;
		padding: 2px;
	}

	.vn-speed-btn {
		font-size: .68rem;
		font-weight: 600;
		padding: .18rem .38rem;
		border: none;
		background: transparent;
		cursor: pointer;
		color: var(--dt3);
		border-radius: .25rem;
		transition: background .12s, color .12s;
		font-family: inherit;
	}

	.vn-speed-btn--active { background: var(--dt); color: var(--dbg); }

	.vn-vol-group {
		display: flex;
		align-items: center;
		gap: .35rem;
	}

	.vn-vol-icon { width: 15px; height: 15px; color: var(--dt3); flex-shrink: 0; }

	.vn-vol-slider {
		width: 72px;
		height: 4px;
		appearance: none;
		background: var(--dbd2);
		border-radius: 99px;
		cursor: pointer;
		outline: none;
	}

	.vn-vol-slider::-webkit-slider-thumb {
		appearance: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--dt);
		cursor: pointer;
	}

	.vn-seek-row {
		grid-area: seek;
		display: flex;
		align-items: center;
		gap: .55rem;
	}

	.vn-seek-time {
		font-size: .72rem;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
		min-width: 32px;
	}

	.vn-seek-time--right { text-align: right; }

	.vn-seek-track {
		flex: 1;
		height: 4px;
		background: var(--dbd2);
		border-radius: 99px;
		position: relative;
	}

	.vn-seek-fill {
		height: 100%;
		background: var(--dt);
		border-radius: 99px;
		pointer-events: none;
	}

	.vn-seek-input {
		position: absolute;
		inset: -8px 0;
		width: 100%;
		height: calc(100% + 16px);
		opacity: 0;
		cursor: pointer;
		appearance: none;
	}

	/* ── 4. Transcription View ───────────────────────────────────── */
	.vn-transcript-layout {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	.vn-transcript-player {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1rem;
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: .85rem;
	}

	.vn-tp-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: .5rem;
	}

	.vn-tp-title { font-size: .84rem; font-weight: 600; color: var(--dt); }
	.vn-tp-dur   { font-size: .72rem; color: var(--dt3); flex-shrink: 0; }

	.vn-tp-wave {
		display: flex;
		align-items: center;
		gap: 2px;
		height: 36px;
	}

	.vn-tp-wave-bar {
		flex: 1;
		min-width: 2px;
		border-radius: 99px;
		background: var(--dbd2);
	}

	.vn-tp-wave-bar--played { background: var(--dt2); }

	.vn-tp-seek {
		display: flex;
		align-items: center;
		gap: .45rem;
	}

	.vn-tp-seek-t { font-size: .68rem; color: var(--dt3); font-variant-numeric: tabular-nums; }

	.vn-tp-seek-track {
		flex: 1;
		height: 3px;
		background: var(--dbd2);
		border-radius: 99px;
		overflow: hidden;
	}

	.vn-tp-seek-fill { height: 100%; background: var(--dt); border-radius: 99px; }

	.vn-tp-controls {
		display: flex;
		align-items: center;
		gap: .65rem;
	}

	.vn-tp-speed-badge {
		font-size: .72rem;
		font-weight: 700;
		color: var(--dt3);
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: .375rem;
		padding: .22rem .48rem;
	}

	.vn-tp-spacer { flex: 1; }

	.vn-tp-ai-badge {
		display: flex;
		align-items: center;
		gap: .4rem;
		font-size: .7rem;
		color: var(--dt3);
		border-top: 1px solid var(--dbd2);
		padding-top: .75rem;
	}

	.vn-tp-ai-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #a78bfa;
		box-shadow: 0 0 6px #a78bfa88;
		flex-shrink: 0;
	}

	.vn-transcript-segments-panel {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1rem;
		overflow: hidden;
	}

	.vn-segments-scroll {
		max-height: 400px;
		overflow-y: auto;
		padding: .65rem;
		display: flex;
		flex-direction: column;
		gap: .2rem;
	}

	.vn-segments-scroll::-webkit-scrollbar { width: 4px; }
	.vn-segments-scroll::-webkit-scrollbar-track { background: transparent; }
	.vn-segments-scroll::-webkit-scrollbar-thumb { background: var(--dbd2); border-radius: 99px; }

	.vn-seg {
		padding: .6rem .7rem;
		border-radius: .55rem;
		border: 1px solid transparent;
		cursor: pointer;
		transition: background .12s, border-color .12s;
	}

	.vn-seg:hover { background: var(--dbg3); }

	.vn-seg--active {
		background: var(--dbg3);
		border-color: var(--dbd);
	}

	.vn-seg-header {
		display: flex;
		align-items: center;
		gap: .45rem;
		margin-bottom: .28rem;
	}

	.vn-seg-speaker {
		font-size: .68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: .06em;
		padding: .12rem .45rem;
		border-radius: 999px;
		background: var(--dbg);
		color: var(--dt3);
	}

	.vn-seg-speaker--you    { background: rgba(255,255,255,.06); color: var(--dt2); }
	.vn-seg-speaker--sarah  { background: rgba(168,85,247,.1);   color: #c084fc;    }
	.vn-seg-speaker--marcus { background: rgba(34,197,94,.08);   color: #4ade80;    }

	.vn-seg-time {
		font-size: .66rem;
		color: var(--dt4);
		font-variant-numeric: tabular-nums;
		margin-left: auto;
	}

	.vn-seg-edit-btn {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		cursor: pointer;
		color: var(--dt4);
		border-radius: .25rem;
		opacity: 0;
		transition: opacity .12s, color .12s;
	}

	.vn-seg:hover .vn-seg-edit-btn,
	.vn-seg--active .vn-seg-edit-btn { opacity: 1; }

	.vn-seg-edit-btn:hover { color: var(--dt2); }
	.vn-seg-edit-btn svg   { width: 11px; height: 11px; }

	.vn-seg-text {
		font-size: .8rem;
		color: var(--dt2);
		line-height: 1.55;
		margin: 0;
	}

	.vn-seg--active .vn-seg-text { color: var(--dt); }

	/* ── 5. Voice Commands ───────────────────────────────────────── */
	.vn-cmds-panel {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1rem;
		padding: 1.35rem;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.vn-cmds-header-row {
		display: flex;
		align-items: center;
		gap: .85rem;
		flex-wrap: wrap;
	}

	.vn-listen-btn {
		display: flex;
		align-items: center;
		gap: .5rem;
		padding: .55rem 1.15rem;
		border-radius: 999px;
		border: 1px solid var(--dbd);
		background: var(--dbg3);
		cursor: pointer;
		font-size: .82rem;
		font-weight: 600;
		color: var(--dt2);
		transition: all .15s;
		font-family: inherit;
	}

	.vn-listen-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
	.vn-listen-btn:hover { background: var(--dbd2); }

	.vn-listen-btn--active {
		background: #ef4444;
		border-color: #ef4444;
		color: #fff;
		animation: vn-pulse-glow 1.4s ease-out infinite;
	}

	.vn-listen-btn--processing {
		background: #7c3aed;
		border-color: #7c3aed;
		color: #fff;
	}

	.vn-listening-indicator {
		display: flex;
		align-items: center;
		gap: 3px;
		height: 24px;
	}

	.vn-listening-bar {
		width: 3px;
		border-radius: 99px;
		background: #ef4444;
		animation: vn-wave-bounce .6s ease-in-out infinite alternate;
	}

	.vn-listening-bar:nth-child(1) { height: 40%; animation-delay: 0ms; }
	.vn-listening-bar:nth-child(2) { height: 70%; animation-delay: 80ms; }
	.vn-listening-bar:nth-child(3) { height: 100%; animation-delay: 160ms; }
	.vn-listening-bar:nth-child(4) { height: 70%; animation-delay: 240ms; }
	.vn-listening-bar:nth-child(5) { height: 40%; animation-delay: 320ms; }

	.vn-recognized-row {
		display: flex;
		align-items: center;
		gap: .45rem;
		font-size: .8rem;
	}

	.vn-recognized-label { color: var(--dt3); }
	.vn-recognized-text  { color: var(--dt); font-style: italic; }

	.vn-recognized-badge {
		font-size: .64rem;
		font-weight: 700;
		padding: .14rem .42rem;
		background: rgba(74,222,128,.1);
		color: #4ade80;
		border: 1px solid rgba(74,222,128,.3);
		border-radius: 999px;
	}

	.vn-cmd-list { display: flex; flex-direction: column; gap: .4rem; }

	.vn-cmd-item {
		display: flex;
		align-items: center;
		gap: .8rem;
		padding: .6rem .8rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: .625rem;
		transition: border-color .12s;
	}

	.vn-cmd-item:hover { border-color: var(--dbd); }
	.vn-cmd-item--dim  { opacity: .5; }

	.vn-cmd-icon { font-size: 1.1rem; width: 26px; text-align: center; flex-shrink: 0; }

	.vn-cmd-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: .12rem;
		min-width: 0;
	}

	.vn-cmd-phrase { font-size: .82rem; font-weight: 600; color: var(--dt); }
	.vn-cmd-desc   { font-size: .72rem; color: var(--dt3); }

	.vn-cmd-conf-block {
		display: flex;
		align-items: center;
		gap: .4rem;
		flex-shrink: 0;
	}

	.vn-conf-track {
		width: 80px;
		height: 4px;
		background: var(--dbd2);
		border-radius: 99px;
		overflow: hidden;
	}

	.vn-conf-fill { height: 100%; background: var(--dt2); border-radius: 99px; }
	.vn-conf-fill--low { background: #f59e0b; }

	.vn-conf-pct {
		font-size: .7rem;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		min-width: 32px;
		text-align: right;
		flex-shrink: 0;
	}

	.vn-cmd-status { font-size: .72rem; flex-shrink: 0; }
	.vn-cmd-status--ok           { color: #4ade80; }
	.vn-cmd-status--unrecognized { color: var(--dt4); font-size: .66rem; }

	/* ── 6. Note Organization ────────────────────────────────────── */
	.vn-org-layout {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	.vn-org-sidebar {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1rem;
		padding: 1rem;
	}

	.vn-org-label {
		font-size: .67rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: .08em;
		color: var(--dt4);
		margin: 0 0 .55rem;
	}

	.vn-org-label--mt { margin-top: 1.2rem; }

	.vn-folder-tree {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: .1rem;
	}

	.vn-folder-item { display: flex; flex-direction: column; }

	.vn-folder-chevron {
		width: 13px;
		height: 13px;
		color: var(--dt4);
		flex-shrink: 0;
		transition: transform .15s;
	}

	.vn-folder-chevron--open { transform: rotate(90deg); }

	.vn-folder-ico { width: 14px; height: 14px; color: var(--dt3); flex-shrink: 0; }
	.vn-folder-ico--sm { width: 12px; height: 12px; }
	.vn-folder-name { flex: 1; }

	.vn-folder-count {
		font-size: .65rem;
		color: var(--dt4);
		background: var(--dbg3);
		border-radius: 999px;
		padding: .08rem .38rem;
		flex-shrink: 0;
	}

	.vn-folder-children {
		list-style: none;
		margin: .05rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: .05rem;
	}

	.vn-tag-cloud { display: flex; flex-wrap: wrap; gap: .3rem; }

	.vn-tag-cloud-btn {
		display: flex;
		align-items: center;
		gap: .28rem;
		font-size: .7rem;
		padding: .18rem .5rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 999px;
		cursor: pointer;
		color: var(--dt3);
		transition: all .12s;
		font-family: inherit;
	}

	.vn-tag-cloud-btn:hover { border-color: var(--dbd); color: var(--dt2); }
	.vn-tag-cloud-btn--active { border-color: var(--dbd); color: var(--dt); background: var(--dbd2); }

	.vn-tag-cloud-count { font-size: .6rem; color: var(--dt4); }

	.vn-org-main {
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 1rem;
		padding: 1.1rem 1.2rem;
		display: flex;
		flex-direction: column;
		gap: .8rem;
	}

	.vn-org-search-row {
		display: flex;
		align-items: center;
		gap: .65rem;
		flex-wrap: wrap;
	}

	.vn-org-search-wrap {
		flex: 1;
		min-width: 150px;
		position: relative;
	}

	.vn-org-search-ico {
		position: absolute;
		left: .6rem;
		top: 50%;
		transform: translateY(-50%);
		width: 14px;
		height: 14px;
		color: var(--dt3);
		pointer-events: none;
	}

	.vn-org-search {
		width: 100%;
		padding: .48rem .75rem .48rem 2rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: .5rem;
		font-size: .82rem;
		color: var(--dt);
		outline: none;
		transition: border-color .15s;
		box-sizing: border-box;
		font-family: inherit;
	}

	.vn-org-search:focus { border-color: var(--dbd); }
	.vn-org-search::placeholder { color: var(--dt4); }

	.vn-sort-row { display: flex; align-items: center; gap: .28rem; flex-shrink: 0; }
	.vn-sort-label { font-size: .7rem; color: var(--dt4); }

	.vn-sort-btn {
		font-size: .7rem;
		padding: .22rem .5rem;
		border: 1px solid var(--dbd2);
		background: var(--dbg3);
		color: var(--dt3);
		border-radius: .35rem;
		cursor: pointer;
		text-transform: capitalize;
		transition: all .12s;
		font-family: inherit;
	}

	.vn-sort-btn--active { background: var(--dt); color: var(--dbg); border-color: var(--dt); }

	.vn-filter-row { display: flex; flex-wrap: wrap; gap: .35rem; }

	.vn-filter-chip {
		font-size: .7rem;
		padding: .2rem .55rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 999px;
		color: var(--dt3);
		cursor: pointer;
		transition: all .12s;
	}

	.vn-filter-chip:hover { border-color: var(--dbd); color: var(--dt2); }
	.vn-filter-chip--active { background: var(--dbd2); border-color: var(--dbd); color: var(--dt); }

	.vn-rec-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .25rem; }

	.vn-rec-list-item {
		display: flex;
		align-items: center;
		gap: .7rem;
		padding: .55rem .65rem;
		border-radius: .55rem;
		border: 1px solid transparent;
		transition: background .12s, border-color .12s;
		cursor: pointer;
	}

	.vn-rec-list-item:hover { background: var(--dbg3); }

	.vn-rec-list-item--active {
		background: var(--dbg3);
		border-color: var(--dbd2);
	}

	.vn-rec-list-icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--dbg);
		border: 1px solid var(--dbd2);
		border-radius: .45rem;
		flex-shrink: 0;
	}

	.vn-rec-list-icon svg { width: 14px; height: 14px; color: var(--dt3); }

	.vn-rec-list-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: .08rem;
		min-width: 0;
	}

	.vn-rec-list-title {
		font-size: .82rem;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.vn-rec-list-meta { font-size: .7rem; color: var(--dt3); }

	.vn-rec-list-play {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--dbd2);
		background: var(--dbg);
		border-radius: 50%;
		cursor: pointer;
		color: var(--dt3);
		flex-shrink: 0;
		transition: color .12s, border-color .12s;
	}

	.vn-rec-list-play:hover { color: var(--dt); border-color: var(--dbd); }
	.vn-rec-list-play svg   { width: 11px; height: 11px; }
</style>
