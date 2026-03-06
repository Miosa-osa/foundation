<script lang="ts">
	type CIStatus = 'passing' | 'failing' | 'pending';
	type Language = 'TypeScript' | 'Svelte' | 'Go' | 'Python' | 'Rust';

	interface Repo {
		id: string;
		owner: string;
		name: string;
		ciStatus: CIStatus;
		language: Language;
		lastCommit: string;
		commitTime: string;
		branches: number;
		size: string;
	}

	const allRepos: Repo[] = [
		{
			id: 'r1',
			owner: 'miosa',
			name: 'foundation',
			ciStatus: 'passing',
			language: 'Svelte',
			lastCommit: 'feat: add RepoManager component to devos section',
			commitTime: '8m ago',
			branches: 4,
			size: '12.4 MB',
		},
		{
			id: 'r2',
			owner: 'miosa',
			name: 'backend-api',
			ciStatus: 'passing',
			language: 'Go',
			lastCommit: 'fix: correct rate-limit header parsing on /v2/ingest',
			commitTime: '34m ago',
			branches: 7,
			size: '3.1 MB',
		},
		{
			id: 'r3',
			owner: 'miosa',
			name: 'agent-runtime',
			ciStatus: 'failing',
			language: 'TypeScript',
			lastCommit: 'chore: bump openai sdk to 4.47.1',
			commitTime: '1h ago',
			branches: 3,
			size: '28.7 MB',
		},
		{
			id: 'r4',
			owner: 'miosa',
			name: 'data-pipeline',
			ciStatus: 'pending',
			language: 'Python',
			lastCommit: 'refactor: extract embedding batch worker to own module',
			commitTime: '2h ago',
			branches: 2,
			size: '6.8 MB',
		},
		{
			id: 'r5',
			owner: 'miosa',
			name: 'core-engine',
			ciStatus: 'passing',
			language: 'Rust',
			lastCommit: 'perf: zero-copy deserialization for event stream payloads',
			commitTime: '4h ago',
			branches: 5,
			size: '9.2 MB',
		},
		{
			id: 'r6',
			owner: 'miosa',
			name: 'dashboard',
			ciStatus: 'passing',
			language: 'TypeScript',
			lastCommit: 'feat: workspace switcher now persists last selection',
			commitTime: '6h ago',
			branches: 6,
			size: '41.3 MB',
		},
	];

	const langFilters: Array<Language | 'All'> = ['All', 'TypeScript', 'Svelte', 'Go', 'Python', 'Rust'];

	let activeFilter = $state<Language | 'All'>('All');

	let filteredRepos = $derived(
		activeFilter === 'All' ? allRepos : allRepos.filter((r) => r.language === activeFilter)
	);

	const langColors: Record<Language, string> = {
		TypeScript: '#3178c6',
		Svelte: '#ff3e00',
		Go: '#00add8',
		Python: '#ffd43b',
		Rust: '#dea584',
	};

	const langBg: Record<Language, string> = {
		TypeScript: 'rgba(49,120,198,0.12)',
		Svelte: 'rgba(255,62,0,0.12)',
		Go: 'rgba(0,173,216,0.12)',
		Python: 'rgba(255,212,59,0.12)',
		Rust: 'rgba(222,165,132,0.12)',
	};

	function ciColor(s: CIStatus): string {
		if (s === 'passing') return '#22c55e';
		if (s === 'failing') return '#ef4444';
		return '#f59e0b';
	}

	function ciLabel(s: CIStatus): string {
		if (s === 'passing') return 'passing';
		if (s === 'failing') return 'failing';
		return 'pending';
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Repository Manager</h2>
	<p class="ds-desc">
		GitHub-connected repository cards with CI status, language badges, commit info, and branch
		metadata for DevOS — full repo visibility at a glance.
	</p>

	<!-- ── Language Filter Pills ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Language Filter</h3>
		<p class="ds-card__sub">
			Filter connected repositories by primary language. Active selection drives the repo grid below.
		</p>
		<div class="rm-filters">
			{#each langFilters as lang}
				<button
					class="rm-filter-pill"
					class:rm-filter-pill--active={activeFilter === lang}
					onclick={() => (activeFilter = lang)}
					aria-pressed={activeFilter === lang}
					aria-label="Filter by {lang}"
				>
					{#if lang !== 'All'}
						<span
							class="rm-filter-dot"
							style="background: {langColors[lang]}"
							aria-hidden="true"
						></span>
					{/if}
					{lang}
				</button>
			{/each}
		</div>
	</div>

	<!-- ── Repository Cards Grid ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Connected Repositories</h3>
		<p class="ds-card__sub">
			{filteredRepos.length} of {allRepos.length} repositories shown — filtered by language.
		</p>

		<div class="rm-grid">
			{#each filteredRepos as repo (repo.id)}
				<article class="rm-card">
					<!-- Header: icon + owner/name + CI status -->
					<div class="rm-card__header">
						<div class="rm-card__identity">
							<svg
								class="rm-repo-icon"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path
									d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
								/>
							</svg>
							<span class="rm-card__slug">
								<span class="rm-card__owner">{repo.owner}</span><span class="rm-card__sep">/</span><span
									class="rm-card__name">{repo.name}</span
								>
							</span>
						</div>
						<span
							class="rm-ci-pill"
							style="--rm-ci: {ciColor(repo.ciStatus)}"
							aria-label="CI status: {ciLabel(repo.ciStatus)}"
						>
							<span
								class="rm-ci-dot"
								class:rm-ci-dot--pulse={repo.ciStatus === 'pending'}
								aria-hidden="true"
							></span>
							{ciLabel(repo.ciStatus)}
						</span>
					</div>

					<!-- Language badge -->
					<div class="rm-card__lang-row">
						<span
							class="rm-lang-badge"
							style="color: {langColors[repo.language]}; background: {langBg[repo.language]};"
						>
							<span
								class="rm-lang-dot"
								style="background: {langColors[repo.language]}"
								aria-hidden="true"
							></span>
							{repo.language}
						</span>
					</div>

					<!-- Last commit info -->
					<div class="rm-card__commit">
						<svg
							class="rm-commit-icon"
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="4" />
							<line x1="1.05" y1="12" x2="7" y2="12" />
							<line x1="17.01" y1="12" x2="22.96" y2="12" />
						</svg>
						<span class="rm-commit-msg">{repo.lastCommit}</span>
						<span class="rm-commit-time">{repo.commitTime}</span>
					</div>

					<!-- Branch count + size -->
					<div class="rm-card__meta">
						<span class="rm-meta-item" title="Branches">
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<line x1="6" y1="3" x2="6" y2="15" />
								<circle cx="18" cy="6" r="3" />
								<circle cx="6" cy="18" r="3" />
								<path d="M18 9a9 9 0 0 1-9 9" />
							</svg>
							{repo.branches} branches
						</span>
						<span class="rm-meta-sep" aria-hidden="true"></span>
						<span class="rm-meta-item" title="Repository size">
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="17 8 12 3 7 8" />
								<line x1="12" y1="3" x2="12" y2="15" />
							</svg>
							{repo.size}
						</span>
					</div>

					<!-- Action row -->
					<div class="rm-card__actions">
						<button
							class="rm-action-btn rm-action-btn--primary"
							aria-label="Open {repo.owner}/{repo.name} in GitHub"
						>
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1="10" y1="14" x2="21" y2="3" />
							</svg>
							Open
						</button>
						<button
							class="rm-action-btn"
							aria-label="Settings for {repo.owner}/{repo.name}"
						>
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<circle cx="12" cy="12" r="3" />
								<path
									d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
								/>
							</svg>
							Settings
						</button>
						<button
							class="rm-action-btn rm-action-btn--danger"
							aria-label="Disconnect {repo.owner}/{repo.name}"
						>
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
								<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
								<line x1="2" y1="2" x2="22" y2="22" />
							</svg>
							Disconnect
						</button>
					</div>
				</article>
			{/each}

			<!-- Connect Repository card -->
			<button class="rm-connect-card" aria-label="Connect a new repository">
				<span class="rm-connect-icon" aria-hidden="true">
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
				</span>
				<span class="rm-connect-label">Connect Repository</span>
				<span class="rm-connect-sub">Link a GitHub repo to your workspace</span>
			</button>
		</div>
	</div>

	<!-- ── CI Status & Language Reference ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">CI Status &amp; Language Tokens</h3>
		<p class="ds-card__sub">
			Status pill variants and per-language accent colors used across repository cards.
		</p>

		<div class="rm-ref-grid">
			<div class="rm-ref-group">
				<p class="rm-ref-label">CI Status Pills</p>
				<div class="rm-ref-row">
					<span class="rm-ci-pill" style="--rm-ci: #22c55e">
						<span class="rm-ci-dot" aria-hidden="true"></span>passing
					</span>
					<span class="rm-ci-pill" style="--rm-ci: #ef4444">
						<span class="rm-ci-dot" aria-hidden="true"></span>failing
					</span>
					<span class="rm-ci-pill" style="--rm-ci: #f59e0b">
						<span class="rm-ci-dot rm-ci-dot--pulse" aria-hidden="true"></span>pending
					</span>
				</div>
			</div>

			<div class="rm-ref-group">
				<p class="rm-ref-label">Language Badges</p>
				<div class="rm-ref-row rm-ref-row--wrap">
					{#each Object.entries(langColors) as [lang, color]}
						<span
							class="rm-lang-badge"
							style="color: {color}; background: {langBg[lang as Language]};"
						>
							<span class="rm-lang-dot" style="background: {color}" aria-hidden="true"></span>
							{lang}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ── Patterns Reference ─────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Repository Manager Patterns</h3>
		<table class="ds-table">
			<thead>
				<tr><th>Pattern</th><th>Purpose</th></tr>
			</thead>
			<tbody>
				<tr
					><td style="font-weight:600;">Language Filter Pills</td><td
						>Filter repo grid by primary language; <code>$derived</code> drives the filtered list</td
					></tr
				>
				<tr
					><td style="font-weight:600;">Repo Card</td><td
						>Owner/name slug, CI status pill, language badge, last commit, branch count, size</td
					></tr
				>
				<tr
					><td style="font-weight:600;">CI Status Pill</td><td
						>Colored animated dot for passing / failing / pending pipeline states</td
					></tr
				>
				<tr
					><td style="font-weight:600;">Language Badge</td><td
						>Per-language accent color with matching dot and transparent tinted background</td
					></tr
				>
				<tr
					><td style="font-weight:600;">Connect Card</td><td
						>Dashed-border call-to-action to link a new GitHub repository to the workspace</td
					></tr
				>
			</tbody>
		</table>
	</div>
</section>

<style>
	/* ── Filter Pills ──────────────────────────────────────────────────────── */
	.rm-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.rm-filter-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 14px;
		border-radius: 9999px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
		white-space: nowrap;
	}

	.rm-filter-pill:hover {
		background: var(--dbg3);
		color: var(--dt);
		border-color: var(--dbd);
	}

	.rm-filter-pill--active {
		background: var(--dt);
		color: var(--dbg);
		border-color: var(--dt);
	}

	.rm-filter-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	/* ── Repo Grid ─────────────────────────────────────────────────────────── */
	.rm-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 14px;
	}

	@media (max-width: 640px) {
		.rm-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ── Repo Card ─────────────────────────────────────────────────────────── */
	.rm-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.rm-card:hover {
		border-color: var(--dt4);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
	}

	.rm-card__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 8px;
	}

	.rm-card__identity {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}

	.rm-repo-icon {
		color: var(--dt3);
		flex-shrink: 0;
	}

	.rm-card__slug {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rm-card__owner {
		color: var(--dt2);
		font-weight: 400;
	}

	.rm-card__sep {
		color: var(--dt3);
		margin: 0 1px;
	}

	.rm-card__name {
		color: var(--dt);
	}

	/* CI pill */
	.rm-ci-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 9px;
		border-radius: 9999px;
		border: 1px solid color-mix(in srgb, var(--rm-ci, #888) 30%, transparent);
		background: color-mix(in srgb, var(--rm-ci, #888) 10%, transparent);
		color: var(--rm-ci, #888);
		font-size: 11.5px;
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
		text-transform: capitalize;
	}

	.rm-ci-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--rm-ci, #888);
		flex-shrink: 0;
	}

	.rm-ci-dot--pulse {
		animation: rm-pulse 1.6s ease-in-out infinite;
	}

	/* Language badge */
	.rm-card__lang-row {
		display: flex;
		align-items: center;
	}

	.rm-lang-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 3px 10px;
		border-radius: 9999px;
		font-size: 11.5px;
		font-weight: 600;
		white-space: nowrap;
	}

	.rm-lang-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	/* Commit row */
	.rm-card__commit {
		display: flex;
		align-items: baseline;
		gap: 6px;
		min-width: 0;
	}

	.rm-commit-icon {
		color: var(--dt4);
		flex-shrink: 0;
		position: relative;
		top: 1px;
	}

	.rm-commit-msg {
		font-size: 12.5px;
		color: var(--dt2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		min-width: 0;
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	.rm-commit-time {
		font-size: 11px;
		color: var(--dt4);
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* Meta row */
	.rm-card__meta {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.rm-meta-item {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		color: var(--dt3);
	}

	.rm-meta-item svg {
		color: var(--dt4);
		flex-shrink: 0;
	}

	.rm-meta-sep {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--dbd);
		flex-shrink: 0;
	}

	/* Action row */
	.rm-card__actions {
		display: flex;
		gap: 6px;
		padding-top: 4px;
		border-top: 1px solid var(--dbd2);
	}

	.rm-action-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 11px;
		border-radius: 7px;
		border: 1px solid var(--dbd);
		background: var(--dbg3);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.13s,
			color 0.13s,
			border-color 0.13s;
		white-space: nowrap;
	}

	.rm-action-btn:hover {
		background: var(--dbg);
		color: var(--dt);
		border-color: var(--dbd);
	}

	.rm-action-btn--primary {
		background: var(--dt);
		color: var(--dbg);
		border-color: var(--dt);
	}

	.rm-action-btn--primary:hover {
		opacity: 0.85;
		background: var(--dt);
		color: var(--dbg);
	}

	.rm-action-btn--danger {
		color: #ef4444;
		border-color: rgba(239, 68, 68, 0.2);
		background: rgba(239, 68, 68, 0.05);
	}

	.rm-action-btn--danger:hover {
		background: rgba(239, 68, 68, 0.12);
		border-color: rgba(239, 68, 68, 0.35);
		color: #ef4444;
	}

	/* ── Connect Card ──────────────────────────────────────────────────────── */
	.rm-connect-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		border: 1.5px dashed var(--dbd);
		border-radius: 12px;
		padding: 32px 20px;
		background: transparent;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background 0.15s;
		min-height: 180px;
	}

	.rm-connect-card:hover {
		border-color: var(--dt3);
		background: var(--dbg2);
	}

	.rm-connect-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: 1.5px solid var(--dbd);
		color: var(--dt3);
		background: var(--dbg2);
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.rm-connect-card:hover .rm-connect-icon {
		border-color: var(--dt2);
		color: var(--dt2);
	}

	.rm-connect-label {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt2);
	}

	.rm-connect-sub {
		font-size: 12px;
		color: var(--dt4);
		text-align: center;
	}

	/* ── Reference ─────────────────────────────────────────────────────────── */
	.rm-ref-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	@media (max-width: 560px) {
		.rm-ref-grid {
			grid-template-columns: 1fr;
		}
	}

	.rm-ref-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.rm-ref-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin: 0;
	}

	.rm-ref-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.rm-ref-row--wrap {
		flex-wrap: wrap;
	}

	/* ── Animation ─────────────────────────────────────────────────────────── */
	@keyframes rm-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}
</style>
