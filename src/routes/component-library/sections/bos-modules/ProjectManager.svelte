<script lang="ts">
	// ── 1. Project Overview Board ────────────────────────────────
	type ProjectStatus = 'active' | 'paused' | 'completed';

	type Project = {
		id: string;
		name: string;
		description: string;
		status: ProjectStatus;
		progress: number;
		deadline: string;
		daysLeft: number;
		team: { initials: string; color: string }[];
		tasksTotal: number;
		tasksDone: number;
		color: string;
	};

	const projects: Project[] = [
		{
			id: 'p1',
			name: 'Website Redesign',
			description: 'Full rebrand of the marketing site with new design system.',
			status: 'active',
			progress: 68,
			deadline: 'Mar 28',
			daysLeft: 22,
			team: [
				{ initials: 'MC', color: '#8b5cf6' },
				{ initials: 'TR', color: '#0ea5e9' },
				{ initials: 'SP', color: '#22c55e' },
			],
			tasksTotal: 34,
			tasksDone: 23,
			color: '#6366f1',
		},
		{
			id: 'p2',
			name: 'Mobile App v2',
			description: 'React Native rewrite with offline support and push notifications.',
			status: 'active',
			progress: 41,
			deadline: 'Apr 15',
			daysLeft: 40,
			team: [
				{ initials: 'AK', color: '#ef4444' },
				{ initials: 'MC', color: '#8b5cf6' },
			],
			tasksTotal: 52,
			tasksDone: 21,
			color: '#0ea5e9',
		},
		{
			id: 'p3',
			name: 'API Migration v3',
			description: 'Migrate legacy REST endpoints to GraphQL with rate limiting.',
			status: 'paused',
			progress: 27,
			deadline: 'May 1',
			daysLeft: 56,
			team: [
				{ initials: 'TR', color: '#0ea5e9' },
				{ initials: 'AK', color: '#ef4444' },
				{ initials: 'SP', color: '#22c55e' },
				{ initials: 'LH', color: '#f59e0b' },
			],
			tasksTotal: 28,
			tasksDone: 8,
			color: '#f59e0b',
		},
		{
			id: 'p4',
			name: 'Analytics Dashboard',
			description: 'Real-time business intelligence dashboard with custom widgets.',
			status: 'completed',
			progress: 100,
			deadline: 'Mar 1',
			daysLeft: 0,
			team: [
				{ initials: 'SP', color: '#22c55e' },
				{ initials: 'LH', color: '#f59e0b' },
			],
			tasksTotal: 19,
			tasksDone: 19,
			color: '#22c55e',
		},
		{
			id: 'p5',
			name: 'Auth & SSO',
			description: 'OAuth2, SAML 2.0, and SSO integration for enterprise clients.',
			status: 'active',
			progress: 55,
			deadline: 'Apr 3',
			daysLeft: 28,
			team: [
				{ initials: 'AK', color: '#ef4444' },
				{ initials: 'TR', color: '#0ea5e9' },
			],
			tasksTotal: 22,
			tasksDone: 12,
			color: '#ec4899',
		},
		{
			id: 'p6',
			name: 'DevOps Automation',
			description: 'CI/CD pipeline improvements, infrastructure as code, monitoring.',
			status: 'active',
			progress: 80,
			deadline: 'Mar 20',
			daysLeft: 14,
			team: [
				{ initials: 'LH', color: '#f59e0b' },
				{ initials: 'MC', color: '#8b5cf6' },
				{ initials: 'SP', color: '#22c55e' },
			],
			tasksTotal: 15,
			tasksDone: 12,
			color: '#14b8a6',
		},
	];

	let activeProjectId = $state<string | null>('p1');

	const kanbanCounts = { planning: 4, 'in-progress': 7, review: 3, done: 12 };

	// ── 2. Project Timeline (Gantt-style) ────────────────────────
	type TaskBar = {
		id: string;
		label: string;
		start: number;
		duration: number;
		color: string;
		status: 'done' | 'active' | 'upcoming';
		milestone?: boolean;
	};

	const timelineDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const timelineRows: { group: string; tasks: TaskBar[] }[] = [
		{
			group: 'Design',
			tasks: [
				{ id: 'td1', label: 'Wireframes', start: 0, duration: 3, color: '#6366f1', status: 'done' },
				{ id: 'td2', label: 'Mockups', start: 2, duration: 4, color: '#6366f1', status: 'active' },
			],
		},
		{
			group: 'Frontend',
			tasks: [
				{ id: 'td3', label: 'Component Lib', start: 1, duration: 5, color: '#0ea5e9', status: 'active' },
				{ id: 'td4', label: 'Page Build', start: 4, duration: 3, color: '#0ea5e9', status: 'upcoming' },
			],
		},
		{
			group: 'Backend',
			tasks: [
				{ id: 'td5', label: 'API Design', start: 0, duration: 2, color: '#22c55e', status: 'done' },
				{ id: 'td6', label: 'Endpoints', start: 2, duration: 4, color: '#22c55e', status: 'active' },
			],
		},
		{
			group: 'QA',
			tasks: [
				{ id: 'td7', label: 'Test Plan', start: 1, duration: 2, color: '#f59e0b', status: 'done' },
				{ id: 'td8', label: 'Review', start: 5, duration: 2, color: '#f59e0b', status: 'upcoming', milestone: true },
			],
		},
		{
			group: 'Deploy',
			tasks: [
				{ id: 'td9', label: 'Release', start: 6, duration: 1, color: '#ec4899', status: 'upcoming', milestone: true },
			],
		},
	];

	// Today marker is at column index 3 (Thursday)
	const todayCol = 3;

	// ── 3. Sprint / Iteration Planning ───────────────────────────
	type BacklogItem = {
		id: string;
		title: string;
		type: 'story' | 'task' | 'bug' | 'chore';
		points: number;
		assignee: string;
		initials: string;
		color: string;
	};

	const sprints = [
		{ id: 'sp1', name: 'Sprint 12', start: 'Mar 4', end: 'Mar 17', velocity: 42, committed: 38 },
		{ id: 'sp2', name: 'Sprint 13', start: 'Mar 18', end: 'Mar 31', velocity: 0, committed: 34 },
	];

	let activeSprint = $state('sp1');

	const backlogItems: BacklogItem[] = [
		{ id: 'bi1', title: 'User profile page redesign', type: 'story', points: 8, assignee: 'Maya Chen', initials: 'MC', color: '#8b5cf6' },
		{ id: 'bi2', title: 'Fix login redirect loop', type: 'bug', points: 3, assignee: 'Alex Kim', initials: 'AK', color: '#ef4444' },
		{ id: 'bi3', title: 'Add CSV export to reports', type: 'task', points: 5, assignee: 'Tom Rivera', initials: 'TR', color: '#0ea5e9' },
		{ id: 'bi4', title: 'Update dependencies', type: 'chore', points: 2, assignee: 'Sam Park', initials: 'SP', color: '#22c55e' },
		{ id: 'bi5', title: 'Notification preferences UI', type: 'story', points: 5, assignee: 'Maya Chen', initials: 'MC', color: '#8b5cf6' },
		{ id: 'bi6', title: 'Performance profiling', type: 'task', points: 8, assignee: 'Alex Kim', initials: 'AK', color: '#ef4444' },
		{ id: 'bi7', title: 'Write migration guide', type: 'chore', points: 3, assignee: 'Tom Rivera', initials: 'TR', color: '#0ea5e9' },
		{ id: 'bi8', title: 'Dashboard loading skeleton', type: 'story', points: 4, assignee: 'Sam Park', initials: 'SP', color: '#22c55e' },
	];

	const velocityBars = [28, 35, 31, 42, 38, 44, 40, 42];
	const velocityLabels = ['S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'];

	// ── 4. Project Metrics Dashboard ─────────────────────────────
	const burndownPoints = [
		{ x: 0,  remaining: 100 },
		{ x: 14, remaining: 86 },
		{ x: 28, remaining: 70 },
		{ x: 42, remaining: 52 },
		{ x: 56, remaining: 41 },
		{ x: 70, remaining: 28 },
		{ x: 84, remaining: 14 },
		{ x: 100, remaining: 0 },
	];

	const completionRing = 68;
	const teamUtilization = [
		{ name: 'Maya Chen', initials: 'MC', color: '#8b5cf6', pct: 87 },
		{ name: 'Alex Kim',  initials: 'AK', color: '#ef4444', pct: 72 },
		{ name: 'Tom Rivera', initials: 'TR', color: '#0ea5e9', pct: 95 },
		{ name: 'Sam Park',  initials: 'SP', color: '#22c55e', pct: 61 },
		{ name: 'Lisa Huang', initials: 'LH', color: '#f59e0b', pct: 54 },
	];

	const velocityTrend = [32, 28, 35, 31, 42, 38, 44, 40, 42, 45];

	// ── 5. Project Settings & Members ────────────────────────────
	type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';

	type Member = {
		name: string;
		email: string;
		initials: string;
		color: string;
		role: MemberRole;
		joinedAt: string;
	};

	const members: Member[] = [
		{ name: 'Jane Cooper', email: 'jane@acme.co', initials: 'JC', color: '#6366f1', role: 'owner', joinedAt: 'Jan 2026' },
		{ name: 'Maya Chen', email: 'maya@acme.co', initials: 'MC', color: '#8b5cf6', role: 'admin', joinedAt: 'Jan 2026' },
		{ name: 'Alex Kim', email: 'alex@acme.co', initials: 'AK', color: '#ef4444', role: 'member', joinedAt: 'Feb 2026' },
		{ name: 'Tom Rivera', email: 'tom@acme.co', initials: 'TR', color: '#0ea5e9', role: 'member', joinedAt: 'Feb 2026' },
		{ name: 'Sam Park', email: 'sam@acme.co', initials: 'SP', color: '#22c55e', role: 'viewer', joinedAt: 'Mar 2026' },
	];

	let projectName = $state('Website Redesign');
	let projectDesc = $state('Full rebrand of the marketing site with new design system and component library.');
	let projectVisibility = $state<'private' | 'internal' | 'public'>('internal');
	let inviteEmail = $state('');
	let inviteRole = $state<MemberRole>('member');
	let settingsTab = $state<'general' | 'members' | 'danger'>('general');

	// ── Helpers ──────────────────────────────────────────────────
	function statusColor(s: ProjectStatus): string {
		if (s === 'active') return '#22c55e';
		if (s === 'paused') return '#f59e0b';
		return '#6b7280';
	}

	function progressColor(pct: number): string {
		if (pct >= 80) return '#22c55e';
		if (pct >= 40) return '#3b82f6';
		return '#f59e0b';
	}

	function typeColor(t: BacklogItem['type']): string {
		if (t === 'bug') return '#ef4444';
		if (t === 'story') return '#6366f1';
		if (t === 'chore') return '#6b7280';
		return '#0ea5e9';
	}

	function roleColor(r: MemberRole): string {
		if (r === 'owner') return '#f59e0b';
		if (r === 'admin') return '#6366f1';
		if (r === 'member') return '#0ea5e9';
		return '#6b7280';
	}

	// Burndown polygon points from left=0% to right=100%, top=0%, bottom=100%
	// Approximation: connect data points + close back along bottom
	function burndownPath(): string {
		const pts = burndownPoints.map(p => `${p.x},${100 - p.remaining}`);
		const right = `100,100`;
		const left = `0,100`;
		return pts.join(' ') + ` ${right} ${left}`;
	}

	function velocityTrendPath(): string {
		const maxV = Math.max(...velocityTrend);
		return velocityTrend
			.map((v, i) => {
				const x = (i / (velocityTrend.length - 1)) * 100;
				const y = 100 - (v / maxV) * 100;
				return `${x},${y}`;
			})
			.join(' ');
	}
</script>

<section class="ds-section">

	<!-- ═══ 1. Project Overview Board ═══════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Project Overview Board</h3>
		<p class="ds-card__sub">Grid of project cards with progress, team avatars, status badges, deadline countdowns, and a kanban status header.</p>

		<!-- Kanban status header -->
		<div class="prm-kanban-header">
			{#each [
				{ key: 'planning',    label: 'Planning',    color: '#6b7280', count: kanbanCounts.planning },
				{ key: 'in-progress', label: 'In Progress', color: '#3b82f6', count: kanbanCounts['in-progress'] },
				{ key: 'review',      label: 'Review',      color: '#f59e0b', count: kanbanCounts.review },
				{ key: 'done',        label: 'Done',        color: '#22c55e', count: kanbanCounts.done },
			] as col}
				<div class="prm-kanban-col" style="--col-color: {col.color}">
					<span class="prm-kanban-col__dot"></span>
					<span class="prm-kanban-col__label">{col.label}</span>
					<span class="prm-kanban-col__count">{col.count}</span>
					<div class="prm-kanban-col__bar"></div>
				</div>
			{/each}
		</div>

		<!-- Project grid -->
		<div class="prm-grid">
			{#each projects as project}
				<button
					class="prm-project-card"
					class:prm-project-card--active={activeProjectId === project.id}
					style="--proj-color: {project.color}"
					onclick={() => activeProjectId = project.id}
					aria-label="Select project {project.name}"
				>
					<div class="prm-project-card__top">
						<div class="prm-project-card__title-row">
							<span class="prm-project-card__name">{project.name}</span>
							<span class="prm-status-badge" style="--status-color: {statusColor(project.status)}">
								<span class="prm-status-badge__dot"></span>
								{project.status.charAt(0).toUpperCase() + project.status.slice(1)}
							</span>
						</div>
						<p class="prm-project-card__desc">{project.description}</p>
					</div>

					<div class="prm-project-card__progress">
						<div class="prm-progress-row">
							<span class="prm-progress-label">{project.tasksDone}/{project.tasksTotal} tasks</span>
							<span class="prm-progress-pct" style="color: {progressColor(project.progress)}">{project.progress}%</span>
						</div>
						<div class="prm-progress-track">
							<div
								class="prm-progress-fill"
								style="width: {project.progress}%; background: {progressColor(project.progress)}"
							></div>
						</div>
					</div>

					<div class="prm-project-card__footer">
						<div class="prm-avatar-stack">
							{#each project.team.slice(0, 4) as member}
								<span class="prm-avatar" style="background: {member.color}">{member.initials}</span>
							{/each}
							{#if project.team.length > 4}
								<span class="prm-avatar prm-avatar--more">+{project.team.length - 4}</span>
							{/if}
						</div>
						<div class="prm-deadline">
							{#if project.status === 'completed'}
								<span class="prm-deadline__label prm-deadline__label--done">Completed</span>
							{:else if project.daysLeft <= 14}
								<span class="prm-deadline__label prm-deadline__label--urgent">{project.daysLeft}d left</span>
							{:else}
								<span class="prm-deadline__label">{project.deadline}</span>
							{/if}
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ 2. Project Timeline (Gantt-style) ═══════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Project Timeline</h3>
		<p class="ds-card__sub">Gantt-style horizontal timeline with task bars, dependency indicators, milestone diamonds, and a today marker.</p>

		<div class="prm-gantt">
			<!-- Date header row -->
			<div class="prm-gantt__header">
				<div class="prm-gantt__row-label prm-gantt__row-label--head">Group</div>
				<div class="prm-gantt__days">
					{#each timelineDays as day, i}
						<div class="prm-gantt__day-cell" class:prm-gantt__day-cell--today={i === todayCol}>
							{day}
						</div>
					{/each}
					<!-- Today marker overlay -->
					<div class="prm-gantt__today-line" style="left: calc({todayCol} * (100% / 7) + 50% / 7)"></div>
				</div>
			</div>

			<!-- Task rows -->
			{#each timelineRows as row}
				<div class="prm-gantt__row">
					<div class="prm-gantt__row-label">{row.group}</div>
					<div class="prm-gantt__track">
						<!-- Grid lines -->
						{#each timelineDays as _, i}
							<div class="prm-gantt__grid-line" style="left: calc({i} * (100% / 7))"></div>
						{/each}
						<!-- Today highlight column -->
						<div class="prm-gantt__today-col" style="left: calc({todayCol} * (100% / 7)); width: calc(100% / 7)"></div>

						{#each row.tasks as task}
							{#if task.milestone}
								<div
									class="prm-gantt__milestone"
									style="left: calc(({task.start} + {task.duration} - 0.5) * (100% / 7))"
									title="{task.label}"
								>
									<span class="prm-gantt__milestone-diamond" style="background: {task.color}"></span>
									<span class="prm-gantt__milestone-label">{task.label}</span>
								</div>
							{:else}
								<div
									class="prm-gantt__bar"
									class:prm-gantt__bar--done={task.status === 'done'}
									class:prm-gantt__bar--upcoming={task.status === 'upcoming'}
									style="
										left: calc({task.start} * (100% / 7));
										width: calc({task.duration} * (100% / 7) - 4px);
										background: {task.color};
									"
									title="{task.label}"
								>
									<span class="prm-gantt__bar-label">{task.label}</span>
								</div>
							{/if}
						{/each}

						<!-- Dependency arrow between first two tasks if both exist -->
						{#if row.tasks.length >= 2 && !row.tasks[0].milestone}
							<div
								class="prm-gantt__dep-arrow"
								style="
									left: calc(({row.tasks[0].start} + {row.tasks[0].duration}) * (100% / 7) - 4px);
									width: calc(({row.tasks[1].start} - {row.tasks[0].start} - {row.tasks[0].duration} + 0.1) * (100% / 7));
								"
							></div>
						{/if}
					</div>
				</div>
			{/each}

			<!-- Legend -->
			<div class="prm-gantt__legend">
				<span class="prm-gantt__legend-item prm-gantt__legend-item--done">Done</span>
				<span class="prm-gantt__legend-item prm-gantt__legend-item--active">In Progress</span>
				<span class="prm-gantt__legend-item prm-gantt__legend-item--upcoming">Upcoming</span>
				<span class="prm-gantt__legend-item prm-gantt__legend-item--milestone">Milestone</span>
				<span class="prm-gantt__legend-item prm-gantt__legend-item--today">Today</span>
			</div>
		</div>
	</div>

	<!-- ═══ 3. Sprint / Iteration Planning ══════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sprint / Iteration Planning</h3>
		<p class="ds-card__sub">Sprint card with date range, velocity chart, story point summary, and backlog items with drag handles.</p>

		<!-- Sprint selector tabs -->
		<div class="prm-sprint-tabs">
			{#each sprints as sprint}
				<button
					class="prm-sprint-tab"
					class:prm-sprint-tab--active={activeSprint === sprint.id}
					onclick={() => activeSprint = sprint.id}
					aria-label="Select {sprint.name}"
				>
					{sprint.name}
				</button>
			{/each}
			<button class="btn-pill btn-pill-ghost btn-pill-sm prm-sprint-new" aria-label="New sprint">+ New Sprint</button>
		</div>

		{#each sprints.filter(s => s.id === activeSprint) as sprint}
			<div class="prm-sprint-card">
				<!-- Sprint header -->
				<div class="prm-sprint-card__head">
					<div class="prm-sprint-card__meta">
						<span class="prm-sprint-card__name">{sprint.name}</span>
						<span class="prm-sprint-card__dates">{sprint.start} – {sprint.end}</span>
					</div>
					<div class="prm-sprint-card__stats">
						<div class="prm-sprint-stat">
							<span class="prm-sprint-stat__val">{sprint.committed}</span>
							<span class="prm-sprint-stat__label">Committed</span>
						</div>
						<div class="prm-sprint-stat">
							<span class="prm-sprint-stat__val">{sprint.velocity || '—'}</span>
							<span class="prm-sprint-stat__label">Velocity</span>
						</div>
						<div class="prm-sprint-stat">
							<span class="prm-sprint-stat__val">{backlogItems.length}</span>
							<span class="prm-sprint-stat__label">Items</span>
						</div>
					</div>
				</div>

				<!-- Velocity chart -->
				<div class="prm-velocity">
					<span class="prm-velocity__title">Team Velocity (last 8 sprints)</span>
					<div class="prm-velocity__chart">
						{#each velocityBars as bar, i}
							<div class="prm-velocity__col">
								<div
									class="prm-velocity__bar"
									class:prm-velocity__bar--current={i === velocityBars.length - 1}
									style="height: {(bar / Math.max(...velocityBars)) * 100}%"
								>
									<span class="prm-velocity__tooltip">{bar} pts</span>
								</div>
								<span class="prm-velocity__label">{velocityLabels[i]}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Backlog items -->
				<div class="prm-backlog">
					<div class="prm-backlog__header">
						<span class="prm-backlog__title">Backlog Items</span>
						<button class="btn-pill btn-pill-ghost btn-pill-sm" aria-label="Add item">+ Add Item</button>
					</div>
					<ul class="prm-backlog__list">
						{#each backlogItems as item}
							<li class="prm-backlog__item">
								<span class="prm-backlog__drag" aria-hidden="true">⠿</span>
								<span class="prm-backlog__type-badge" style="--type-color: {typeColor(item.type)}">{item.type}</span>
								<span class="prm-backlog__item-title">{item.title}</span>
								<span class="prm-backlog__assignee" style="background: {item.color}">{item.initials}</span>
								<span class="prm-backlog__points">{item.points} pts</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<!-- ═══ 4. Project Metrics Dashboard ════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Project Metrics Dashboard</h3>
		<p class="ds-card__sub">Burn-down chart, velocity trend line, completion rate ring, and team utilization bars with trend arrows.</p>

		<div class="prm-metrics-grid">
			<!-- Burn-down chart -->
			<div class="prm-metric-card prm-metric-card--wide">
				<div class="prm-metric-card__head">
					<span class="prm-metric-card__title">Burn-Down Chart</span>
					<span class="prm-metric-trend prm-metric-trend--down">
						<span class="prm-trend-arrow">&#9660;</span> On track
					</span>
				</div>
				<div class="prm-burndown">
					<div class="prm-burndown__y-axis">
						<span>100</span>
						<span>75</span>
						<span>50</span>
						<span>25</span>
						<span>0</span>
					</div>
					<div class="prm-burndown__chart">
						<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="prm-burndown__svg">
							<!-- ideal line -->
							<line x1="0" y1="0" x2="100" y2="100" class="prm-burndown__ideal" />
							<!-- remaining area fill -->
							<polygon points="{burndownPath()}" class="prm-burndown__area" />
							<!-- remaining line -->
							<polyline
								points="{burndownPoints.map(p => `${p.x},${100 - p.remaining}`).join(' ')}"
								class="prm-burndown__line"
							/>
							<!-- current progress dot -->
							<circle cx="56" cy="59" r="2.5" class="prm-burndown__dot" />
						</svg>
						<div class="prm-burndown__x-axis">
							<span>W1</span><span>W2</span><span>W3</span><span>W4</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Velocity trend -->
			<div class="prm-metric-card">
				<div class="prm-metric-card__head">
					<span class="prm-metric-card__title">Velocity Trend</span>
					<span class="prm-metric-trend prm-metric-trend--up">
						<span class="prm-trend-arrow">&#9650;</span> +7%
					</span>
				</div>
				<div class="prm-spark-wrap">
					<svg viewBox="0 0 100 60" preserveAspectRatio="none" class="prm-spark-svg">
						<polyline
							points="{velocityTrendPath()}"
							class="prm-spark-line"
						/>
					</svg>
				</div>
				<div class="prm-metric-card__value">42 <span class="prm-metric-card__unit">pts/sprint</span></div>
			</div>

			<!-- Completion ring -->
			<div class="prm-metric-card">
				<div class="prm-metric-card__head">
					<span class="prm-metric-card__title">Completion Rate</span>
					<span class="prm-metric-trend prm-metric-trend--up">
						<span class="prm-trend-arrow">&#9650;</span> +3%
					</span>
				</div>
				<div class="prm-ring-wrap">
					<svg viewBox="0 0 36 36" class="prm-ring-svg">
						<path
							class="prm-ring-bg"
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						/>
						<path
							class="prm-ring-fill"
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
							stroke-dasharray="{completionRing}, 100"
						/>
					</svg>
					<span class="prm-ring-text">{completionRing}%</span>
				</div>
				<span class="prm-metric-card__sub">of tasks completed</span>
			</div>

			<!-- Team utilization -->
			<div class="prm-metric-card prm-metric-card--wide">
				<div class="prm-metric-card__head">
					<span class="prm-metric-card__title">Team Utilization</span>
					<span class="prm-metric-trend prm-metric-trend--up">
						<span class="prm-trend-arrow">&#9650;</span> +5% avg
					</span>
				</div>
				<div class="prm-utilization">
					{#each teamUtilization as member}
						<div class="prm-util-row">
							<span class="prm-util-avatar" style="background: {member.color}">{member.initials}</span>
							<span class="prm-util-name">{member.name}</span>
							<div class="prm-util-track">
								<div
									class="prm-util-fill"
									class:prm-util-fill--danger={member.pct > 90}
									style="width: {member.pct}%; background: {member.pct > 90 ? '#ef4444' : member.color}"
								></div>
							</div>
							<span class="prm-util-pct" class:prm-util-pct--danger={member.pct > 90}>{member.pct}%</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 5. Project Settings & Members ═══════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Project Settings & Members</h3>
		<p class="ds-card__sub">Settings form with project name, description, visibility toggle, member list with role badges, and invite form.</p>

		<!-- Settings tab bar -->
		<div class="prm-settings-tabs">
			{#each [
				{ key: 'general', label: 'General' },
				{ key: 'members', label: 'Members' },
				{ key: 'danger',  label: 'Danger Zone' },
			] as tab}
				<button
					class="prm-settings-tab"
					class:prm-settings-tab--active={settingsTab === tab.key}
					class:prm-settings-tab--danger={tab.key === 'danger'}
					onclick={() => settingsTab = tab.key as typeof settingsTab}
					aria-label="Settings tab {tab.label}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		{#if settingsTab === 'general'}
			<div class="prm-settings-form">
				<div class="prm-form-row">
					<label class="prm-form-label" for="prm-proj-name">Project Name</label>
					<input
						id="prm-proj-name"
						type="text"
						class="prm-form-input"
						bind:value={projectName}
						placeholder="Project name"
					/>
				</div>

				<div class="prm-form-row">
					<label class="prm-form-label" for="prm-proj-desc">Description</label>
					<textarea
						id="prm-proj-desc"
						class="prm-form-input prm-form-textarea"
						bind:value={projectDesc}
						rows="3"
						placeholder="Brief description of this project"
					></textarea>
				</div>

				<div class="prm-form-row">
					<span class="prm-form-label">Visibility</span>
					<div class="prm-visibility-row" role="group" aria-label="Project visibility">
						{#each (['private', 'internal', 'public'] as const) as vis}
							<button
								class="prm-visibility-btn"
								class:prm-visibility-btn--active={projectVisibility === vis}
								onclick={() => projectVisibility = vis}
								aria-label="Set visibility to {vis}"
							>
								{vis.charAt(0).toUpperCase() + vis.slice(1)}
							</button>
						{/each}
					</div>
					<p class="prm-form-hint">
						{#if projectVisibility === 'private'}Only project members can see this project.
						{:else if projectVisibility === 'internal'}All workspace members can view but not edit.
						{:else}Anyone with the link can view this project.{/if}
					</p>
				</div>

				<div class="prm-settings-actions">
					<button class="btn-pill btn-pill-ghost" aria-label="Discard changes">Discard</button>
					<button class="btn-pill btn-pill-primary" aria-label="Save changes">Save Changes</button>
				</div>
			</div>

		{:else if settingsTab === 'members'}
			<div class="prm-members">
				<!-- Invite form -->
				<div class="prm-invite-form">
					<input
						type="email"
						class="prm-form-input prm-invite-form__email"
						bind:value={inviteEmail}
						placeholder="Invite by email…"
					/>
					<select class="prm-form-select" bind:value={inviteRole} aria-label="Invite role">
						<option value="viewer">Viewer</option>
						<option value="member">Member</option>
						<option value="admin">Admin</option>
					</select>
					<button class="btn-pill btn-pill-primary btn-pill-sm" aria-label="Send invite">Invite</button>
				</div>

				<!-- Member list -->
				<ul class="prm-member-list">
					{#each members as member}
						<li class="prm-member-item">
							<span class="prm-member-avatar" style="background: {member.color}">{member.initials}</span>
							<div class="prm-member-info">
								<span class="prm-member-name">{member.name}</span>
								<span class="prm-member-email">{member.email}</span>
							</div>
							<span class="prm-member-since">Since {member.joinedAt}</span>
							<span class="prm-role-badge" style="--role-color: {roleColor(member.role)}">{member.role}</span>
							{#if member.role !== 'owner'}
								<button class="prm-member-remove" aria-label="Remove {member.name}">&#x2715;</button>
							{:else}
								<span class="prm-member-remove prm-member-remove--placeholder"></span>
							{/if}
						</li>
					{/each}
				</ul>
			</div>

		{:else if settingsTab === 'danger'}
			<div class="prm-danger-zone">
				<div class="prm-danger-item">
					<div class="prm-danger-item__info">
						<span class="prm-danger-item__title">Archive Project</span>
						<span class="prm-danger-item__desc">Hide this project from active views. All data is preserved.</span>
					</div>
					<button class="btn-pill btn-pill-outline btn-pill-sm prm-danger-item__btn" aria-label="Archive project">Archive</button>
				</div>
				<div class="prm-danger-item">
					<div class="prm-danger-item__info">
						<span class="prm-danger-item__title">Transfer Ownership</span>
						<span class="prm-danger-item__desc">Transfer this project to another workspace member.</span>
					</div>
					<button class="btn-pill btn-pill-outline btn-pill-sm prm-danger-item__btn" aria-label="Transfer ownership">Transfer</button>
				</div>
				<div class="prm-danger-item prm-danger-item--red">
					<div class="prm-danger-item__info">
						<span class="prm-danger-item__title">Delete Project</span>
						<span class="prm-danger-item__desc">Permanently delete this project and all its tasks, files, and history. This cannot be undone.</span>
					</div>
					<button class="btn-pill btn-pill-danger btn-pill-sm" aria-label="Delete project">Delete</button>
				</div>
			</div>
		{/if}
	</div>

</section>

<style>
	/* ── Shared ─────────────────────────────────────────────────── */
	.ds-card__sub {
		font-size: 0.83rem;
		color: var(--dt2);
		margin-bottom: 1.25rem;
		line-height: 1.5;
	}

	/* ═══ 1. Project Overview Board ════════════════════════════════ */

	/* Kanban status header */
	.prm-kanban-header {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.prm-kanban-col {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.75rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		position: relative;
		overflow: hidden;
	}

	.prm-kanban-col__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--col-color);
		flex-shrink: 0;
	}

	.prm-kanban-col__label {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--dt);
		flex: 1;
	}

	.prm-kanban-col__count {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--col-color);
		background: color-mix(in srgb, var(--col-color) 14%, transparent);
		padding: 0.1rem 0.45rem;
		border-radius: 9999px;
	}

	.prm-kanban-col__bar {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2px;
		width: 100%;
		background: var(--col-color);
		opacity: 0.6;
	}

	/* Project grid */
	.prm-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.75rem;
	}

	.prm-project-card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		border-top: 3px solid var(--proj-color);
		cursor: pointer;
		text-align: left;
		transition: box-shadow 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
		font-family: inherit;
		color: inherit;
	}

	.prm-project-card:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		transform: translateY(-1px);
	}

	.prm-project-card--active {
		border-color: var(--proj-color);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--proj-color) 30%, transparent);
	}

	.prm-project-card__top {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.prm-project-card__title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.prm-project-card__name {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--dt);
	}

	.prm-project-card__desc {
		font-size: 0.78rem;
		color: var(--dt2);
		line-height: 1.45;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Status badge */
	.prm-status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--status-color);
		background: color-mix(in srgb, var(--status-color) 14%, transparent);
		white-space: nowrap;
	}

	.prm-status-badge__dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--status-color);
	}

	/* Progress */
	.prm-project-card__progress {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.prm-progress-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.prm-progress-label {
		font-size: 0.72rem;
		color: var(--dt3);
	}

	.prm-progress-pct {
		font-size: 0.75rem;
		font-weight: 700;
	}

	.prm-progress-track {
		height: 5px;
		background: var(--dbg3);
		border-radius: 9999px;
		overflow: hidden;
	}

	.prm-progress-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	/* Footer */
	.prm-project-card__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* Avatar stack */
	.prm-avatar-stack {
		display: flex;
		flex-direction: row-reverse;
	}

	.prm-avatar {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.6rem;
		font-weight: 700;
		color: #fff;
		border: 2px solid var(--dbg2);
		margin-left: -6px;
		flex-shrink: 0;
	}

	.prm-avatar:last-child {
		margin-left: 0;
	}

	.prm-avatar--more {
		background: var(--dbg3);
		color: var(--dt2);
		font-size: 0.58rem;
	}

	/* Deadline */
	.prm-deadline__label {
		font-size: 0.72rem;
		color: var(--dt3);
		font-weight: 500;
	}

	.prm-deadline__label--urgent {
		color: #f97316;
		font-weight: 700;
	}

	.prm-deadline__label--done {
		color: #22c55e;
		font-weight: 600;
	}

	/* ═══ 2. Project Timeline (Gantt) ══════════════════════════════ */

	.prm-gantt {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.prm-gantt__header {
		display: flex;
		align-items: stretch;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}

	.prm-gantt__row {
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid var(--dbd);
	}

	.prm-gantt__row:last-of-type {
		border-bottom: none;
	}

	.prm-gantt__row-label {
		width: 80px;
		flex-shrink: 0;
		padding: 0.55rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--dt2);
		border-right: 1px solid var(--dbd);
		display: flex;
		align-items: center;
	}

	.prm-gantt__row-label--head {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.prm-gantt__days {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		position: relative;
	}

	.prm-gantt__day-cell {
		padding: 0.55rem 0;
		text-align: center;
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--dt3);
		border-right: 1px solid var(--dbd);
	}

	.prm-gantt__day-cell:last-child {
		border-right: none;
	}

	.prm-gantt__day-cell--today {
		color: #3b82f6;
		background: rgba(59, 130, 246, 0.07);
	}

	.prm-gantt__track {
		flex: 1;
		position: relative;
		height: 44px;
		display: flex;
		align-items: center;
	}

	.prm-gantt__grid-line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--dbd);
		pointer-events: none;
	}

	.prm-gantt__today-col {
		position: absolute;
		top: 0;
		bottom: 0;
		background: rgba(59, 130, 246, 0.05);
		pointer-events: none;
	}

	.prm-gantt__today-line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background: #3b82f6;
		pointer-events: none;
		z-index: 5;
	}

	.prm-gantt__today-line::before {
		content: 'Today';
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.62rem;
		font-weight: 700;
		color: #3b82f6;
		white-space: nowrap;
	}

	.prm-gantt__bar {
		position: absolute;
		height: 22px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		z-index: 2;
		opacity: 0.9;
		transition: opacity 0.15s ease;
		overflow: hidden;
	}

	.prm-gantt__bar:hover {
		opacity: 1;
		z-index: 10;
	}

	.prm-gantt__bar--done {
		opacity: 0.45;
	}

	.prm-gantt__bar--upcoming {
		opacity: 0.55;
		border: 2px dashed currentColor;
		background: transparent !important;
	}

	.prm-gantt__bar-label {
		font-size: 0.65rem;
		font-weight: 600;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		pointer-events: none;
	}

	.prm-gantt__bar--upcoming .prm-gantt__bar-label {
		color: var(--dt2);
	}

	/* Milestone diamond */
	.prm-gantt__milestone {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		z-index: 3;
		transform: translateX(-50%);
	}

	.prm-gantt__milestone-diamond {
		width: 14px;
		height: 14px;
		transform: rotate(45deg);
		border-radius: 2px;
		display: block;
	}

	.prm-gantt__milestone-label {
		font-size: 0.6rem;
		font-weight: 600;
		color: var(--dt2);
		white-space: nowrap;
	}

	/* Dependency arrow */
	.prm-gantt__dep-arrow {
		position: absolute;
		height: 2px;
		background: transparent;
		border-top: 2px dashed var(--dbd2);
		z-index: 1;
		top: 50%;
		transform: translateY(-50%);
	}

	.prm-gantt__dep-arrow::after {
		content: '';
		position: absolute;
		right: -1px;
		top: -4px;
		width: 0;
		height: 0;
		border-top: 4px solid transparent;
		border-bottom: 4px solid transparent;
		border-left: 5px solid var(--dbd2);
	}

	/* Gantt legend */
	.prm-gantt__legend {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		padding: 0.6rem 0.75rem;
		border-top: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.prm-gantt__legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--dt3);
	}

	.prm-gantt__legend-item::before {
		content: '';
		display: inline-block;
		width: 14px;
		height: 6px;
		border-radius: 3px;
	}

	.prm-gantt__legend-item--done::before {
		background: #6b7280;
		opacity: 0.45;
	}

	.prm-gantt__legend-item--active::before {
		background: #6366f1;
	}

	.prm-gantt__legend-item--upcoming::before {
		background: transparent;
		border: 2px dashed #6366f1;
	}

	.prm-gantt__legend-item--milestone::before {
		width: 8px;
		height: 8px;
		background: #f59e0b;
		border-radius: 2px;
		transform: rotate(45deg);
	}

	.prm-gantt__legend-item--today::before {
		background: #3b82f6;
		width: 2px;
		height: 14px;
		border-radius: 1px;
	}

	/* ═══ 3. Sprint / Iteration Planning ════════════════════════════ */

	.prm-sprint-tabs {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--dbd);
		padding-bottom: 0.5rem;
	}

	.prm-sprint-tab {
		padding: 0.4rem 0.85rem;
		border: none;
		border-radius: 7px;
		background: transparent;
		color: var(--dt2);
		font-size: 0.82rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s ease, color 0.15s ease;
		font-family: inherit;
	}

	.prm-sprint-tab:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.prm-sprint-tab--active {
		background: var(--dbg3);
		color: var(--dt);
		font-weight: 600;
	}

	.prm-sprint-new {
		margin-left: auto;
	}

	.prm-sprint-card {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.prm-sprint-card__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}

	.prm-sprint-card__meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.prm-sprint-card__name {
		font-size: 1rem;
		font-weight: 700;
		color: var(--dt);
	}

	.prm-sprint-card__dates {
		font-size: 0.78rem;
		color: var(--dt3);
	}

	.prm-sprint-card__stats {
		display: flex;
		gap: 1.5rem;
	}

	.prm-sprint-stat {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.1rem;
	}

	.prm-sprint-stat__val {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--dt);
		line-height: 1;
	}

	.prm-sprint-stat__label {
		font-size: 0.68rem;
		font-weight: 500;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	/* Velocity chart */
	.prm-velocity {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--dbd);
	}

	.prm-velocity__title {
		display: block;
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.75rem;
	}

	.prm-velocity__chart {
		display: flex;
		align-items: flex-end;
		gap: 0.35rem;
		height: 80px;
	}

	.prm-velocity__col {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: flex-end;
		gap: 0.25rem;
		position: relative;
	}

	.prm-velocity__bar {
		width: 100%;
		background: var(--dbg3);
		border-radius: 4px 4px 0 0;
		position: relative;
		transition: background 0.15s ease;
		min-height: 4px;
	}

	.prm-velocity__bar:hover {
		background: color-mix(in srgb, #6366f1 50%, var(--dbg3));
	}

	.prm-velocity__bar--current {
		background: #6366f1;
	}

	.prm-velocity__bar--current:hover {
		background: #818cf8;
	}

	.prm-velocity__tooltip {
		display: none;
		position: absolute;
		bottom: calc(100% + 4px);
		left: 50%;
		transform: translateX(-50%);
		background: var(--dt);
		color: var(--dbg);
		font-size: 0.65rem;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 4px;
		white-space: nowrap;
		z-index: 10;
		pointer-events: none;
	}

	.prm-velocity__bar:hover .prm-velocity__tooltip {
		display: block;
	}

	.prm-velocity__label {
		font-size: 0.62rem;
		color: var(--dt4);
		font-weight: 500;
	}

	/* Backlog */
	.prm-backlog {
		padding: 1rem 1.25rem;
	}

	.prm-backlog__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.prm-backlog__title {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--dt);
	}

	.prm-backlog__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.prm-backlog__item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.55rem 0.6rem;
		border-radius: 7px;
		transition: background 0.12s ease;
		cursor: grab;
	}

	.prm-backlog__item:hover {
		background: var(--dbg2);
	}

	.prm-backlog__drag {
		color: var(--dt4);
		font-size: 0.85rem;
		cursor: grab;
		user-select: none;
		flex-shrink: 0;
	}

	.prm-backlog__type-badge {
		font-size: 0.62rem;
		font-weight: 700;
		color: var(--type-color);
		background: color-mix(in srgb, var(--type-color) 14%, transparent);
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.prm-backlog__item-title {
		flex: 1;
		font-size: 0.82rem;
		color: var(--dt);
		font-weight: 500;
	}

	.prm-backlog__assignee {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.58rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.prm-backlog__points {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--dt2);
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		padding: 0.1rem 0.4rem;
		border-radius: 5px;
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* ═══ 4. Project Metrics Dashboard ═════════════════════════════ */

	.prm-metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.75rem;
	}

	.prm-metric-card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prm-metric-card--wide {
		grid-column: span 2;
	}

	.prm-metric-card__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.prm-metric-card__title {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.prm-metric-trend {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		font-size: 0.72rem;
		font-weight: 600;
	}

	.prm-metric-trend--up {
		color: #22c55e;
	}

	.prm-metric-trend--down {
		color: #3b82f6;
	}

	.prm-trend-arrow {
		font-size: 0.58rem;
	}

	.prm-metric-card__value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--dt);
		line-height: 1;
	}

	.prm-metric-card__unit {
		font-size: 0.78rem;
		font-weight: 500;
		color: var(--dt3);
	}

	.prm-metric-card__sub {
		font-size: 0.72rem;
		color: var(--dt3);
	}

	/* Burn-down chart */
	.prm-burndown {
		display: flex;
		gap: 0.35rem;
		height: 120px;
	}

	.prm-burndown__y-axis {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 0.62rem;
		color: var(--dt4);
		padding-bottom: 16px;
		text-align: right;
		min-width: 24px;
	}

	.prm-burndown__chart {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.prm-burndown__svg {
		flex: 1;
		width: 100%;
		overflow: visible;
	}

	.prm-burndown__ideal {
		stroke: var(--dbd2);
		stroke-width: 1;
		stroke-dasharray: 3 2;
		fill: none;
	}

	.prm-burndown__area {
		fill: color-mix(in srgb, #3b82f6 15%, transparent);
	}

	.prm-burndown__line {
		fill: none;
		stroke: #3b82f6;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.prm-burndown__dot {
		fill: #3b82f6;
		stroke: var(--dbg2);
		stroke-width: 1.5;
	}

	.prm-burndown__x-axis {
		display: flex;
		justify-content: space-between;
		font-size: 0.62rem;
		color: var(--dt4);
		padding-top: 2px;
	}

	/* Velocity trend sparkline */
	.prm-spark-wrap {
		height: 56px;
		width: 100%;
	}

	.prm-spark-svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.prm-spark-line {
		fill: none;
		stroke: #6366f1;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}

	/* Completion ring */
	.prm-ring-wrap {
		position: relative;
		width: 72px;
		height: 72px;
		margin: 0 auto;
	}

	.prm-ring-svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	.prm-ring-bg {
		fill: none;
		stroke: var(--dbd);
		stroke-width: 3;
	}

	.prm-ring-fill {
		fill: none;
		stroke: #6366f1;
		stroke-width: 3;
		stroke-linecap: round;
	}

	.prm-ring-text {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--dt);
	}

	/* Team utilization bars */
	.prm-utilization {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.prm-util-row {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}

	.prm-util-avatar {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.58rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.prm-util-name {
		font-size: 0.78rem;
		color: var(--dt2);
		font-weight: 500;
		width: 90px;
		flex-shrink: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.prm-util-track {
		flex: 1;
		height: 6px;
		background: var(--dbg3);
		border-radius: 9999px;
		overflow: hidden;
	}

	.prm-util-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	.prm-util-fill--danger {
		animation: prm-util-pulse 1.5s ease-in-out infinite;
	}

	@keyframes prm-util-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.65; }
	}

	.prm-util-pct {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--dt3);
		min-width: 32px;
		text-align: right;
		flex-shrink: 0;
	}

	.prm-util-pct--danger {
		color: #ef4444;
	}

	/* ═══ 5. Project Settings & Members ════════════════════════════ */

	/* Settings tab bar */
	.prm-settings-tabs {
		display: flex;
		gap: 0.1rem;
		border-bottom: 1px solid var(--dbd);
		margin-bottom: 1.25rem;
	}

	.prm-settings-tab {
		padding: 0.5rem 1rem;
		border: none;
		background: transparent;
		color: var(--dt2);
		font-size: 0.82rem;
		font-weight: 500;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition: color 0.15s ease, border-color 0.15s ease;
		font-family: inherit;
	}

	.prm-settings-tab:hover {
		color: var(--dt);
	}

	.prm-settings-tab--active {
		color: var(--dt);
		font-weight: 600;
		border-bottom-color: #6366f1;
	}

	.prm-settings-tab--danger {
		color: var(--dt3);
	}

	.prm-settings-tab--danger:hover {
		color: #ef4444;
	}

	.prm-settings-tab--danger.prm-settings-tab--active {
		color: #ef4444;
		border-bottom-color: #ef4444;
	}

	/* Settings form */
	.prm-settings-form {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		max-width: 520px;
	}

	.prm-form-row {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.prm-form-label {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--dt2);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.prm-form-input {
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		color: var(--dt);
		font-size: 0.85rem;
		outline: none;
		transition: border-color 0.15s ease;
		font-family: inherit;
	}

	.prm-form-input:focus {
		border-color: #6366f1;
	}

	.prm-form-input::placeholder {
		color: var(--dt4);
	}

	.prm-form-textarea {
		resize: vertical;
		min-height: 72px;
	}

	.prm-form-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		color: var(--dt);
		font-size: 0.82rem;
		outline: none;
		cursor: pointer;
		transition: border-color 0.15s ease;
		font-family: inherit;
		appearance: none;
	}

	.prm-form-select:focus {
		border-color: #6366f1;
	}

	/* Visibility buttons */
	.prm-visibility-row {
		display: flex;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 9px;
		overflow: hidden;
		width: fit-content;
	}

	.prm-visibility-btn {
		padding: 0.45rem 1rem;
		border: none;
		background: var(--dbg);
		color: var(--dt2);
		font-size: 0.8rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s ease, color 0.15s ease;
		font-family: inherit;
	}

	.prm-visibility-btn:not(:last-child) {
		border-right: 1px solid var(--dbd);
	}

	.prm-visibility-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
	}

	.prm-visibility-btn--active {
		background: #6366f1;
		color: #fff;
	}

	.prm-visibility-btn--active:hover {
		background: #4f46e5;
		color: #fff;
	}

	.prm-form-hint {
		font-size: 0.73rem;
		color: var(--dt3);
		margin: 0;
		line-height: 1.4;
	}

	.prm-settings-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--dbd);
	}

	/* Members tab */
	.prm-members {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.prm-invite-form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.prm-invite-form__email {
		flex: 1;
		min-width: 180px;
	}

	.prm-member-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.prm-member-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.12s ease;
	}

	.prm-member-item:last-child {
		border-bottom: none;
	}

	.prm-member-item:hover {
		background: var(--dbg2);
	}

	.prm-member-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.65rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.prm-member-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
	}

	.prm-member-name {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.prm-member-email {
		font-size: 0.72rem;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.prm-member-since {
		font-size: 0.7rem;
		color: var(--dt4);
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* Role badge */
	.prm-role-badge {
		display: inline-block;
		padding: 0.15rem 0.55rem;
		border-radius: 9999px;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--role-color);
		background: color-mix(in srgb, var(--role-color) 14%, transparent);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.prm-member-remove {
		width: 24px;
		height: 24px;
		border: none;
		border-radius: 50%;
		background: transparent;
		color: var(--dt3);
		font-size: 0.72rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: background 0.12s ease, color 0.12s ease;
	}

	.prm-member-remove:hover:not(.prm-member-remove--placeholder) {
		background: rgba(239, 68, 68, 0.14);
		color: #ef4444;
	}

	.prm-member-remove--placeholder {
		visibility: hidden;
		cursor: default;
	}

	/* Danger zone */
	.prm-danger-zone {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid rgba(239, 68, 68, 0.25);
		border-radius: 10px;
		overflow: hidden;
	}

	.prm-danger-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.9rem 1rem;
		border-bottom: 1px solid var(--dbd);
	}

	.prm-danger-item:last-child {
		border-bottom: none;
	}

	.prm-danger-item--red {
		background: rgba(239, 68, 68, 0.04);
	}

	.prm-danger-item__info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		flex: 1;
		min-width: 0;
	}

	.prm-danger-item__title {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--dt);
	}

	.prm-danger-item__desc {
		font-size: 0.75rem;
		color: var(--dt3);
		line-height: 1.45;
	}

	.prm-danger-item__btn {
		flex-shrink: 0;
	}

	/* ═══ Responsive ════════════════════════════════════════════════ */
	@media (max-width: 768px) {
		.prm-kanban-header {
			grid-template-columns: repeat(2, 1fr);
		}

		.prm-grid {
			grid-template-columns: 1fr;
		}

		.prm-metric-card--wide {
			grid-column: span 1;
		}

		.prm-metrics-grid {
			grid-template-columns: 1fr;
		}

		.prm-gantt__row-label {
			width: 60px;
		}

		.prm-sprint-card__head {
			flex-direction: column;
			align-items: flex-start;
		}

		.prm-sprint-card__stats {
			gap: 1rem;
		}

		.prm-member-since {
			display: none;
		}

		.prm-util-name {
			width: 70px;
		}
	}
</style>
