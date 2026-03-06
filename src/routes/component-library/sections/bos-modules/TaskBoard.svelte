<script lang="ts">
	// ── 1. Kanban Board ───────────────────────────────────────────
	type Priority = 'critical' | 'high' | 'medium' | 'low' | 'none';

	type KanbanTask = {
		id: string;
		title: string;
		priority: Priority;
		assignee: string;
		initials: string;
		avatarColor: string;
		due: string;
		tags: string[];
	};

	type KanbanColumn = {
		id: string;
		label: string;
		color: string;
		tasks: KanbanTask[];
	};

	let kanbanColumns = $state<KanbanColumn[]>([
		{
			id: 'todo',
			label: 'To Do',
			color: '#6b7280',
			tasks: [
				{ id: 't1', title: 'Design onboarding flow mockups', priority: 'high', assignee: 'Maya Chen', initials: 'MC', avatarColor: '#8b5cf6', due: 'Mar 12', tags: ['Design', 'UX'] },
				{ id: 't2', title: 'Set up CI/CD pipeline', priority: 'medium', assignee: 'Tom Rivera', initials: 'TR', avatarColor: '#0ea5e9', due: 'Mar 15', tags: ['DevOps'] },
				{ id: 't3', title: 'Write Q1 retrospective doc', priority: 'low', assignee: 'Sam Park', initials: 'SP', avatarColor: '#22c55e', due: 'Mar 18', tags: ['Docs'] },
			],
		},
		{
			id: 'inprogress',
			label: 'In Progress',
			color: '#3b82f6',
			tasks: [
				{ id: 't4', title: 'Implement auth token refresh', priority: 'critical', assignee: 'Alex Kim', initials: 'AK', avatarColor: '#ef4444', due: 'Mar 10', tags: ['Backend', 'Auth'] },
				{ id: 't5', title: 'Build notification center UI', priority: 'high', assignee: 'Maya Chen', initials: 'MC', avatarColor: '#8b5cf6', due: 'Mar 14', tags: ['Frontend'] },
			],
		},
		{
			id: 'review',
			label: 'Review',
			color: '#f59e0b',
			tasks: [
				{ id: 't6', title: 'API rate limiting middleware', priority: 'high', assignee: 'Tom Rivera', initials: 'TR', avatarColor: '#0ea5e9', due: 'Mar 11', tags: ['Backend', 'Security'] },
			],
		},
		{
			id: 'done',
			label: 'Done',
			color: '#22c55e',
			tasks: [
				{ id: 't7', title: 'Set up error tracking with Sentry', priority: 'medium', assignee: 'Alex Kim', initials: 'AK', avatarColor: '#ef4444', due: 'Mar 8', tags: ['Infra'] },
				{ id: 't8', title: 'Dark mode color tokens', priority: 'low', assignee: 'Sam Park', initials: 'SP', avatarColor: '#22c55e', due: 'Mar 7', tags: ['Design'] },
			],
		},
	]);

	// ── 2. Task List View ─────────────────────────────────────────
	type SortKey = 'task' | 'priority' | 'assignee' | 'due' | 'status';

	const listTasks: { id: string; task: string; priority: Priority; assignee: string; due: string; status: string; checked: boolean }[] = [
		{ id: 'l1', task: 'Design onboarding flow mockups', priority: 'high', assignee: 'Maya Chen', due: 'Mar 12', status: 'To Do', checked: false },
		{ id: 'l2', task: 'Implement auth token refresh', priority: 'critical', assignee: 'Alex Kim', due: 'Mar 10', status: 'In Progress', checked: false },
		{ id: 'l3', task: 'API rate limiting middleware', priority: 'high', assignee: 'Tom Rivera', due: 'Mar 11', status: 'Review', checked: false },
		{ id: 'l4', task: 'Set up CI/CD pipeline', priority: 'medium', assignee: 'Tom Rivera', due: 'Mar 15', status: 'To Do', checked: false },
		{ id: 'l5', task: 'Build notification center UI', priority: 'high', assignee: 'Maya Chen', due: 'Mar 14', status: 'In Progress', checked: false },
		{ id: 'l6', task: 'Set up error tracking with Sentry', priority: 'medium', assignee: 'Alex Kim', due: 'Mar 8', status: 'Done', checked: true },
		{ id: 'l7', task: 'Dark mode color tokens', priority: 'low', assignee: 'Sam Park', due: 'Mar 7', status: 'Done', checked: true },
		{ id: 'l8', task: 'Write Q1 retrospective doc', priority: 'low', assignee: 'Sam Park', due: 'Mar 18', status: 'To Do', checked: false },
	];

	let sortKey = $state<SortKey>('due');
	let sortAsc = $state(true);

	// ── 3. Task Card Detail ───────────────────────────────────────
	const subtasks = [
		{ label: 'Research competitor onboarding flows', done: true },
		{ label: 'Sketch wireframes for step 1-3', done: true },
		{ label: 'Create high-fidelity mockup in Figma', done: false },
		{ label: 'Add micro-interactions & transitions', done: false },
		{ label: 'Internal review with product team', done: false },
	];

	const comments = [
		{ author: 'Tom Rivera', initials: 'TR', color: '#0ea5e9', time: '2h ago', text: 'Looking great so far! Can we add a progress indicator between steps?' },
		{ author: 'Maya Chen', initials: 'MC', color: '#8b5cf6', time: '45m ago', text: 'Good idea, I\'ll add a stepper component at the top. Should match our existing design tokens.' },
	];

	const activityLog = [
		{ action: 'Maya Chen moved task to In Progress', time: 'Mar 9, 10:30 AM' },
		{ action: 'Tom Rivera added a comment', time: 'Mar 9, 2:15 PM' },
		{ action: 'Maya Chen updated subtask progress', time: 'Mar 9, 4:00 PM' },
		{ action: 'Maya Chen added a comment', time: 'Mar 9, 4:45 PM' },
	];

	// ── 4. Priority Badges ────────────────────────────────────────
	const priorities: { level: Priority; label: string; color: string }[] = [
		{ level: 'critical', label: 'Critical', color: '#ef4444' },
		{ level: 'high',     label: 'High',     color: '#f97316' },
		{ level: 'medium',   label: 'Medium',   color: '#eab308' },
		{ level: 'low',      label: 'Low',      color: '#3b82f6' },
		{ level: 'none',     label: 'None',     color: '#6b7280' },
	];

	// ── 5. Quick Filters ──────────────────────────────────────────
	let activeFilter = $state('all');
	let activeView = $state<'board' | 'list' | 'calendar'>('board');

	function priorityColor(p: Priority): string {
		switch (p) {
			case 'critical': return '#ef4444';
			case 'high': return '#f97316';
			case 'medium': return '#eab308';
			case 'low': return '#3b82f6';
			case 'none': return '#6b7280';
		}
	}
</script>

<section class="ds-section">

	<!-- ── 1. Kanban Board ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Kanban Board</h3>
		<p class="tb-desc">Columnar task management with draggable cards, priority indicators, and assignee avatars.</p>
		<div class="tb-kanban">
			{#each kanbanColumns as col}
				<div class="tb-kanban__col" style="--col-accent: {col.color}">
					<div class="tb-kanban__col-header">
						<span class="tb-kanban__col-label">{col.label}</span>
						<span class="tb-kanban__col-count">{col.tasks.length}</span>
					</div>
					<div class="tb-kanban__col-body">
						{#each col.tasks as task}
							<div class="tb-kanban__card" style="--priority-color: {priorityColor(task.priority)}">
								<div class="tb-kanban__card-tags">
									{#each task.tags as tag}
										<span class="tb-kanban__tag">{tag}</span>
									{/each}
								</div>
								<div class="tb-kanban__card-title">{task.title}</div>
								<div class="tb-kanban__card-footer">
									<div class="tb-kanban__card-assignee">
										<span class="tb-kanban__avatar" style="background: {task.avatarColor}">{task.initials}</span>
										<span class="tb-kanban__card-name">{task.assignee}</span>
									</div>
									<div class="tb-kanban__card-meta">
										<span class="tb-kanban__priority-dot" style="background: {priorityColor(task.priority)}"></span>
										<span class="tb-kanban__card-due">{task.due}</span>
									</div>
								</div>
							</div>
						{/each}
						<button class="btn-compact btn-compact-ghost" style="width:100%;justify-content:center;">+ Add task</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 2. Task List View ────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Task List View</h3>
		<p class="tb-desc">Flat list alternative with sortable columns, checkboxes, and bulk actions.</p>

		<!-- Bulk action bar -->
		<div class="tb-list__bulk-bar">
			<label class="tb-list__select-all">
				<input type="checkbox" class="tb-list__checkbox" />
				<span>Select All</span>
			</label>
			<div class="tb-list__bulk-actions">
				<button class="btn-compact btn-compact-ghost">Delete</button>
				<button class="btn-compact btn-compact-ghost">Move</button>
				<button class="btn-compact btn-compact-ghost">Assign</button>
			</div>
		</div>

		<div class="tb-list__table-wrap">
			<table class="tb-list__table">
				<thead>
					<tr>
						<th class="tb-list__th tb-list__th--check"></th>
						{#each (['task', 'priority', 'assignee', 'due', 'status'] as const) as key}
							<th
								class="tb-list__th"
								class:tb-list__th--active={sortKey === key}
								onclick={() => { if (sortKey === key) sortAsc = !sortAsc; else { sortKey = key; sortAsc = true; } }}
							>
								{key.charAt(0).toUpperCase() + key.slice(1)}
								{#if sortKey === key}
									<span class="tb-list__sort-arrow">{sortAsc ? '\u2191' : '\u2193'}</span>
								{/if}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each listTasks as task, i}
						<tr class="tb-list__row" class:tb-list__row--alt={i % 2 === 1} class:tb-list__row--done={task.checked}>
							<td class="tb-list__td tb-list__td--check">
								<input type="checkbox" class="tb-list__checkbox" checked={task.checked} />
							</td>
							<td class="tb-list__td tb-list__td--task">{task.task}</td>
							<td class="tb-list__td">
								<span class="tb-priority-badge" style="--badge-color: {priorityColor(task.priority as Priority)}">
									<span class="tb-priority-badge__dot"></span>
									{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
								</span>
							</td>
							<td class="tb-list__td">{task.assignee}</td>
							<td class="tb-list__td">{task.due}</td>
							<td class="tb-list__td">
								<span class="tb-status-pill" class:tb-status-pill--done={task.status === 'Done'} class:tb-status-pill--progress={task.status === 'In Progress'} class:tb-status-pill--review={task.status === 'Review'}>
									{task.status}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ── 3. Task Card Detail ──────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Task Card Detail</h3>
		<p class="tb-desc">Expanded view with subtasks, comments, activity log, and metadata.</p>

		<div class="tb-detail">
			<!-- Header -->
			<div class="tb-detail__header">
				<div class="tb-detail__title-row">
					<h4 class="tb-detail__title">Design onboarding flow mockups</h4>
					<span class="tb-priority-badge" style="--badge-color: #f97316">
						<span class="tb-priority-badge__dot"></span>
						High
					</span>
				</div>
				<p class="tb-detail__description">Create high-fidelity mockups for the new user onboarding experience. Should cover first-run wizard, progressive disclosure pattern, and contextual tooltips. Reference the existing design system tokens for consistency.</p>
			</div>

			<!-- Meta row -->
			<div class="tb-detail__meta">
				<div class="tb-detail__meta-item">
					<span class="tb-detail__meta-label">Assignee</span>
					<div class="tb-detail__meta-value">
						<span class="tb-kanban__avatar" style="background: #8b5cf6">MC</span>
						Maya Chen
					</div>
				</div>
				<div class="tb-detail__meta-item">
					<span class="tb-detail__meta-label">Status</span>
					<span class="tb-detail__meta-value">
						<span class="tb-status-pill tb-status-pill--progress">In Progress</span>
					</span>
				</div>
				<div class="tb-detail__meta-item">
					<span class="tb-detail__meta-label">Due Date</span>
					<span class="tb-detail__meta-value">Mar 12, 2026</span>
				</div>
				<div class="tb-detail__meta-item">
					<span class="tb-detail__meta-label">Priority</span>
					<span class="tb-detail__meta-value">
						<span class="tb-priority-badge" style="--badge-color: #f97316">
							<span class="tb-priority-badge__dot"></span>
							High
						</span>
					</span>
				</div>
			</div>

			<!-- Labels/Tags -->
			<div class="tb-detail__labels">
				<span class="tb-detail__label-title">Labels</span>
				<div class="tb-detail__label-row">
					<span class="tb-detail__label" style="--label-color: #8b5cf6">Design</span>
					<span class="tb-detail__label" style="--label-color: #ec4899">UX</span>
					<span class="tb-detail__label" style="--label-color: #0ea5e9">Onboarding</span>
				</div>
			</div>

			<!-- Subtasks -->
			<div class="tb-detail__subtasks">
				<div class="tb-detail__subtasks-header">
					<span class="tb-detail__subtask-title">Subtasks</span>
					<span class="tb-detail__subtask-progress">{subtasks.filter(s => s.done).length}/{subtasks.length}</span>
				</div>
				<div class="tb-detail__progress-bar">
					<div class="tb-detail__progress-fill" style="width: {(subtasks.filter(s => s.done).length / subtasks.length) * 100}%"></div>
				</div>
				<ul class="tb-detail__subtask-list">
					{#each subtasks as st}
						<li class="tb-detail__subtask-item" class:tb-detail__subtask-item--done={st.done}>
							<input type="checkbox" class="tb-list__checkbox" checked={st.done} />
							<span>{st.label}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Comments -->
			<div class="tb-detail__comments">
				<span class="tb-detail__section-title">Comments</span>
				{#each comments as c}
					<div class="tb-detail__comment">
						<span class="tb-kanban__avatar" style="background: {c.color}">{c.initials}</span>
						<div class="tb-detail__comment-body">
							<div class="tb-detail__comment-head">
								<span class="tb-detail__comment-author">{c.author}</span>
								<span class="tb-detail__comment-time">{c.time}</span>
							</div>
							<p class="tb-detail__comment-text">{c.text}</p>
						</div>
					</div>
				{/each}
				<div class="tb-detail__comment-input">
					<input type="text" placeholder="Write a comment..." class="tb-detail__comment-field" />
					<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Send</button>
				</div>
			</div>

			<!-- Activity Log -->
			<div class="tb-detail__activity">
				<span class="tb-detail__section-title">Activity</span>
				<ul class="tb-detail__activity-list">
					{#each activityLog as entry}
						<li class="tb-detail__activity-item">
							<span class="tb-detail__activity-dot"></span>
							<span class="tb-detail__activity-action">{entry.action}</span>
							<span class="tb-detail__activity-time">{entry.time}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- ── 4. Priority Badges ───────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Priority Badges</h3>
		<p class="tb-desc">Pill-shaped indicators with colored dots. Also shown as left-border accents on cards.</p>

		<div class="tb-priority-row">
			{#each priorities as p}
				<span class="tb-priority-badge" style="--badge-color: {p.color}">
					<span class="tb-priority-badge__dot"></span>
					{p.label}
				</span>
			{/each}
		</div>

		<div class="tb-priority-cards">
			{#each priorities as p}
				<div class="tb-priority-card" style="--priority-color: {p.color}">
					<span class="tb-priority-card__label">{p.label} Priority Task</span>
					<span class="tb-priority-card__sub">Colored left border indicates severity</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 5. Quick Filters ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Quick Filters</h3>
		<p class="tb-desc">Filter bar with pill toggles, search, sort, and view mode switching.</p>

		<div class="tb-filters">
			<div class="tb-filters__pills">
				{#each ['all', 'my-tasks', 'due-today', 'overdue'] as f}
					<button
						class="tb-filters__pill"
						class:tb-filters__pill--active={activeFilter === f}
						onclick={() => activeFilter = f}
					>
						{f === 'all' ? 'All' : f === 'my-tasks' ? 'My Tasks' : f === 'due-today' ? 'Due Today' : 'Overdue'}
					</button>
				{/each}
			</div>

			<div class="tb-filters__right">
				<div class="tb-filters__search">
					<svg class="tb-filters__search-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
						<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
					</svg>
					<input type="text" placeholder="Search tasks..." class="tb-filters__search-input" />
				</div>

				<button class="btn-compact btn-compact-ghost">
					Sort
					<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
						<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
					</svg>
				</button>

				<div class="tb-filters__view-toggle">
					<!-- List icon -->
					<button
						class="btn-compact btn-compact-icon"
						class:btn-compact-primary={activeView === 'list'}
						class:btn-compact-ghost={activeView !== 'list'}
						onclick={() => activeView = 'list'}
						aria-label="List view"
					>
						<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
							<path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"/>
						</svg>
					</button>
					<!-- Board icon -->
					<button
						class="btn-compact btn-compact-icon"
						class:btn-compact-primary={activeView === 'board'}
						class:btn-compact-ghost={activeView !== 'board'}
						onclick={() => activeView = 'board'}
						aria-label="Board view"
					>
						<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
							<path d="M2 4.5A2.5 2.5 0 014.5 2h2A2.5 2.5 0 019 4.5v2A2.5 2.5 0 016.5 9h-2A2.5 2.5 0 012 6.5v-2zm0 9A2.5 2.5 0 014.5 11h2A2.5 2.5 0 019 13.5v2A2.5 2.5 0 016.5 18h-2A2.5 2.5 0 012 15.5v-2zm9-9A2.5 2.5 0 0113.5 2h2A2.5 2.5 0 0118 4.5v2A2.5 2.5 0 0115.5 9h-2A2.5 2.5 0 0111 6.5v-2zm0 9A2.5 2.5 0 0113.5 11h2a2.5 2.5 0 012.5 2.5v2a2.5 2.5 0 01-2.5 2.5h-2A2.5 2.5 0 0111 15.5v-2z"/>
						</svg>
					</button>
					<!-- Calendar icon -->
					<button
						class="btn-compact btn-compact-icon"
						class:btn-compact-primary={activeView === 'calendar'}
						class:btn-compact-ghost={activeView !== 'calendar'}
						onclick={() => activeView = 'calendar'}
						aria-label="Calendar view"
					>
						<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
							<path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

</section>

<style>
	/* ── Shared ───────────────────────────────────────────────── */
	.tb-desc {
		color: var(--dt2);
		font-size: 0.85rem;
		margin-bottom: 1.25rem;
		line-height: 1.5;
	}

	/* ── 1. Kanban Board ─────────────────────────────────────── */
	.tb-kanban {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
		overflow-x: auto;
	}

	.tb-kanban__col {
		background: var(--dbg2);
		border-radius: 10px;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		min-width: 220px;
	}

	.tb-kanban__col-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
		padding-bottom: 0.6rem;
		border-bottom: 2px solid var(--col-accent, var(--dbd));
	}

	.tb-kanban__col-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--dt);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.tb-kanban__col-count {
		background: var(--dbg3);
		color: var(--dt2);
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
	}

	.tb-kanban__col-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.tb-kanban__card {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-left: 3px solid var(--priority-color, var(--dbd));
		border-radius: 8px;
		padding: 0.75rem;
		cursor: grab;
		transition: box-shadow 0.15s ease, transform 0.15s ease;
	}

	.tb-kanban__card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		transform: translateY(-1px);
	}

	.tb-kanban__card-tags {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
		margin-bottom: 0.4rem;
	}

	.tb-kanban__tag {
		font-size: 0.65rem;
		font-weight: 500;
		color: var(--dt2);
		background: var(--dbg2);
		padding: 0.1rem 0.45rem;
		border-radius: 4px;
	}

	.tb-kanban__card-title {
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--dt);
		line-height: 1.4;
		margin-bottom: 0.5rem;
	}

	.tb-kanban__card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tb-kanban__card-assignee {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.tb-kanban__avatar {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.6rem;
		font-weight: 600;
		color: #fff;
		flex-shrink: 0;
	}

	.tb-kanban__card-name {
		font-size: 0.72rem;
		color: var(--dt2);
	}

	.tb-kanban__card-meta {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.tb-kanban__priority-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.tb-kanban__card-due {
		font-size: 0.7rem;
		color: var(--dt3);
	}

	/* ── 2. Task List View ───────────────────────────────────── */
	.tb-list__bulk-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 0.75rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		margin-bottom: 0.5rem;
	}

	.tb-list__select-all {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: var(--dt2);
		cursor: pointer;
	}

	.tb-list__bulk-actions {
		display: flex;
		gap: 0.35rem;
	}

	.tb-list__table-wrap {
		overflow-x: auto;
		border: 1px solid var(--dbd);
		border-radius: 8px;
	}

	.tb-list__table {
		width: 100%;
		border-collapse: collapse;
	}

	.tb-list__th {
		text-align: left;
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		cursor: pointer;
		user-select: none;
		white-space: nowrap;
	}

	.tb-list__th--check {
		width: 36px;
		cursor: default;
	}

	.tb-list__th--active {
		color: var(--dt);
	}

	.tb-list__sort-arrow {
		margin-left: 0.25rem;
		font-size: 0.7rem;
	}

	.tb-list__checkbox {
		width: 15px;
		height: 15px;
		accent-color: #3b82f6;
		cursor: pointer;
	}

	.tb-list__row {
		transition: background 0.1s ease;
	}

	.tb-list__row:hover {
		background: var(--dbg2);
	}

	.tb-list__row--alt {
		background: var(--dbg2);
	}

	.tb-list__row--alt:hover {
		background: var(--dbg3);
	}

	.tb-list__row--done {
		opacity: 0.55;
	}

	.tb-list__td {
		padding: 0.6rem 0.75rem;
		font-size: 0.82rem;
		color: var(--dt);
		border-bottom: 1px solid var(--dbd);
		white-space: nowrap;
	}

	.tb-list__td--check {
		width: 36px;
	}

	.tb-list__td--task {
		font-weight: 500;
		white-space: normal;
		min-width: 200px;
	}

	/* ── Priority Badge (shared) ─────────────────────────────── */
	.tb-priority-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		font-size: 0.72rem;
		font-weight: 500;
		color: var(--badge-color);
		background: color-mix(in srgb, var(--badge-color) 12%, transparent);
		white-space: nowrap;
	}

	.tb-priority-badge__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--badge-color);
	}

	/* ── Status Pills ────────────────────────────────────────── */
	.tb-status-pill {
		display: inline-block;
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		font-size: 0.72rem;
		font-weight: 500;
		color: var(--dt2);
		background: var(--dbg3);
	}

	.tb-status-pill--done {
		color: #22c55e;
		background: rgba(34, 197, 94, 0.12);
	}

	.tb-status-pill--progress {
		color: #3b82f6;
		background: rgba(59, 130, 246, 0.12);
	}

	.tb-status-pill--review {
		color: #f59e0b;
		background: rgba(245, 158, 11, 0.12);
	}

	/* ── 3. Task Card Detail ─────────────────────────────────── */
	.tb-detail {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.tb-detail__header {
		padding: 1.25rem;
		border-bottom: 1px solid var(--dbd);
	}

	.tb-detail__title-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.6rem;
		flex-wrap: wrap;
	}

	.tb-detail__title {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
	}

	.tb-detail__description {
		font-size: 0.82rem;
		color: var(--dt2);
		line-height: 1.6;
		margin: 0;
	}

	.tb-detail__meta {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1rem;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
	}

	.tb-detail__meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.tb-detail__meta-label {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.tb-detail__meta-value {
		font-size: 0.82rem;
		color: var(--dt);
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	/* Labels/Tags */
	.tb-detail__labels {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--dbd);
	}

	.tb-detail__label-title {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		display: block;
		margin-bottom: 0.5rem;
	}

	.tb-detail__label-row {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.tb-detail__label {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
		font-size: 0.72rem;
		font-weight: 500;
		color: var(--label-color);
		background: color-mix(in srgb, var(--label-color) 14%, transparent);
	}

	/* Subtasks */
	.tb-detail__subtasks {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--dbd);
	}

	.tb-detail__subtasks-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.tb-detail__subtask-title {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--dt);
	}

	.tb-detail__subtask-progress {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--dt2);
	}

	.tb-detail__progress-bar {
		height: 5px;
		background: var(--dbg3);
		border-radius: 9999px;
		overflow: hidden;
		margin-bottom: 0.75rem;
	}

	.tb-detail__progress-fill {
		height: 100%;
		background: #3b82f6;
		border-radius: 9999px;
		transition: width 0.3s ease;
	}

	.tb-detail__subtask-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.tb-detail__subtask-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.82rem;
		color: var(--dt);
		padding: 0.35rem 0;
	}

	.tb-detail__subtask-item--done {
		text-decoration: line-through;
		color: var(--dt3);
	}

	/* Comments */
	.tb-detail__comments {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--dbd);
	}

	.tb-detail__section-title {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--dt);
		display: block;
		margin-bottom: 0.75rem;
	}

	.tb-detail__comment {
		display: flex;
		gap: 0.6rem;
		margin-bottom: 0.75rem;
	}

	.tb-detail__comment-body {
		flex: 1;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 0.6rem 0.75rem;
	}

	.tb-detail__comment-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.3rem;
	}

	.tb-detail__comment-author {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--dt);
	}

	.tb-detail__comment-time {
		font-size: 0.68rem;
		color: var(--dt3);
	}

	.tb-detail__comment-text {
		font-size: 0.8rem;
		color: var(--dt2);
		line-height: 1.5;
		margin: 0;
	}

	.tb-detail__comment-input {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.tb-detail__comment-field {
		flex: 1;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		color: var(--dt);
		font-size: 0.8rem;
		outline: none;
		transition: border-color 0.15s ease;
	}

	.tb-detail__comment-field:focus {
		border-color: #3b82f6;
	}

	.tb-detail__comment-field::placeholder {
		color: var(--dt3);
	}

	/* Activity Log */
	.tb-detail__activity {
		padding: 1rem 1.25rem;
	}

	.tb-detail__activity-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.tb-detail__activity-item {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.45rem 0;
		position: relative;
		padding-left: 1.25rem;
	}

	.tb-detail__activity-item::before {
		content: '';
		position: absolute;
		left: 4px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--dbd);
	}

	.tb-detail__activity-item:first-child::before {
		top: 50%;
	}

	.tb-detail__activity-item:last-child::before {
		bottom: 50%;
	}

	.tb-detail__activity-dot {
		position: absolute;
		left: 1px;
		top: 0.6rem;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--dt3);
		border: 2px solid var(--dbg);
		z-index: 1;
	}

	.tb-detail__activity-action {
		font-size: 0.78rem;
		color: var(--dt2);
		flex: 1;
	}

	.tb-detail__activity-time {
		font-size: 0.68rem;
		color: var(--dt3);
		white-space: nowrap;
	}

	/* ── 4. Priority Badges Row ──────────────────────────────── */
	.tb-priority-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1.25rem;
	}

	.tb-priority-cards {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.tb-priority-card {
		padding: 0.6rem 0.85rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-left: 4px solid var(--priority-color);
		border-radius: 8px;
	}

	.tb-priority-card__label {
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--dt);
		display: block;
	}

	.tb-priority-card__sub {
		font-size: 0.72rem;
		color: var(--dt3);
	}

	/* ── 5. Quick Filters ────────────────────────────────────── */
	.tb-filters {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.tb-filters__pills {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	.tb-filters__pill {
		padding: 0.35rem 0.75rem;
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		background: transparent;
		color: var(--dt2);
		font-size: 0.78rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.tb-filters__pill:hover {
		border-color: var(--dt2);
		color: var(--dt);
	}

	.tb-filters__pill--active {
		background: #3b82f6;
		border-color: #3b82f6;
		color: #fff;
	}

	.tb-filters__pill--active:hover {
		background: #2563eb;
		border-color: #2563eb;
		color: #fff;
	}

	.tb-filters__right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tb-filters__search {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.65rem;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		transition: border-color 0.15s ease;
	}

	.tb-filters__search:focus-within {
		border-color: #3b82f6;
	}

	.tb-filters__search-icon {
		color: var(--dt3);
		flex-shrink: 0;
	}

	.tb-filters__search-input {
		border: none;
		background: transparent;
		color: var(--dt);
		font-size: 0.78rem;
		outline: none;
		width: 140px;
	}

	.tb-filters__search-input::placeholder {
		color: var(--dt3);
	}

	/* ── Responsive ──────────────────────────────────────────── */
	@media (max-width: 768px) {
		.tb-kanban {
			grid-template-columns: 1fr;
		}

		.tb-detail__meta {
			grid-template-columns: 1fr 1fr;
		}

		.tb-filters {
			flex-direction: column;
			align-items: flex-start;
		}

		.tb-filters__right {
			flex-wrap: wrap;
		}
	}
</style>
