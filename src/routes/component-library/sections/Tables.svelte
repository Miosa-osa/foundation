<script lang="ts">
	type SortDir = 'asc' | 'desc' | null;

	// Sortable table state
	let sortCol = $state<string | null>('name');
	let sortDir = $state<SortDir>('asc');

	function setSort(col: string) {
		if (sortCol === col) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortCol = col;
			sortDir = 'asc';
		}
	}

	type User = { id: number; name: string; email: string; role: string; status: string; joined: string; lastActive: string; projects: number };

	const users: User[] = [
		{ id: 1,  name: 'Alex Chen',      email: 'alex@miosa.dev',    role: 'Developer',      status: 'active',   joined: 'Jan 2024', lastActive: '2m ago',  projects: 7  },
		{ id: 2,  name: 'Sam Rivera',     email: 'sam@miosa.dev',     role: 'Designer',       status: 'active',   joined: 'Mar 2024', lastActive: '1h ago',  projects: 4  },
		{ id: 3,  name: 'Jordan Lee',     email: 'jordan@miosa.dev',  role: 'Product',        status: 'away',     joined: 'Nov 2023', lastActive: '3h ago',  projects: 12 },
		{ id: 4,  name: 'Taylor Kim',     email: 'taylor@miosa.dev',  role: 'Developer',      status: 'active',   joined: 'Feb 2024', lastActive: '5m ago',  projects: 9  },
		{ id: 5,  name: 'Morgan Singh',   email: 'morgan@miosa.dev',  role: 'DevOps',         status: 'offline',  joined: 'Apr 2023', lastActive: '2d ago',  projects: 3  },
		{ id: 6,  name: 'Casey Park',     email: 'casey@miosa.dev',   role: 'QA Engineer',    status: 'active',   joined: 'Jun 2024', lastActive: '30m ago', projects: 5  },
	];

	let sortedUsers = $derived.by(() => {
		if (!sortCol || !sortDir) return users;
		return [...users].sort((a, b) => {
			const av = a[sortCol as keyof User];
			const bv = b[sortCol as keyof User];
			const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
			return sortDir === 'asc' ? cmp : -cmp;
		});
	});

	type Project = { name: string; team: string; status: string; priority: string; progress: number; due: string };

	const projects: Project[] = [
		{ name: 'MIOSA Foundation',  team: 'Frontend',  status: 'active',    priority: 'high',     progress: 68,  due: 'Aug 2025'  },
		{ name: 'API Gateway v3',    team: 'Backend',   status: 'active',    priority: 'critical', progress: 42,  due: 'Jul 2025'  },
		{ name: 'Auth Overhaul',     team: 'Security',  status: 'completed', priority: 'critical', progress: 100, due: 'Jun 2025'  },
		{ name: 'Analytics Board',   team: 'Frontend',  status: 'paused',    priority: 'medium',   progress: 31,  due: 'Sep 2025'  },
		{ name: 'CI/CD Pipelines',   team: 'DevOps',    status: 'active',    priority: 'low',      progress: 85,  due: 'Jul 2025'  },
		{ name: 'DB Migration v2',   team: 'Backend',   status: 'archived',  priority: 'medium',   progress: 100, due: 'May 2025'  },
	];

	const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
		active:    { bg: 'rgba(34,197,94,0.1)',  text: '#4ade80', dot: '#22c55e' },
		away:      { bg: 'rgba(234,179,8,0.1)',  text: '#facc15', dot: '#eab308' },
		offline:   { bg: 'rgba(120,120,140,0.1)', text: '#888',   dot: '#666'    },
		completed: { bg: 'rgba(34,197,94,0.1)',  text: '#4ade80', dot: '#22c55e' },
		paused:    { bg: 'rgba(234,179,8,0.1)',  text: '#facc15', dot: '#eab308' },
		archived:  { bg: 'rgba(120,120,140,0.1)', text: '#888',   dot: '#555'    },
	};

	const priorityColors: Record<string, { bg: string; text: string }> = {
		critical: { bg: 'rgba(239,68,68,0.1)',   text: '#f87171' },
		high:     { bg: 'rgba(249,115,22,0.1)',  text: '#fb923c' },
		medium:   { bg: 'rgba(234,179,8,0.1)',   text: '#facc15' },
		low:      { bg: 'rgba(34,197,94,0.1)',   text: '#4ade80' },
	};

	const thStyle = 'text-align: left; padding: 11px 16px; color: #666; font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap;';
	const tdStyle = 'padding: 12px 16px; color: #ccc; font-size: 13px;';
	const tdStyleCompact = 'padding: 7px 12px; color: #ccc; font-size: 12px;';
	const thStyleCompact = 'text-align: left; padding: 7px 12px; color: #666; font-weight: 500; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;';
	const rowBorder = 'border-bottom: 1px solid rgba(255,255,255,0.04);';
	const tableWrap = 'border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; background: rgba(255,255,255,0.01);';
</script>

<section class="ds-section">
	<h2 class="ds-title">Tables</h2>
	<p class="ds-desc">Data table patterns for lists, reports, and admin views. Dark monochrome with status badges, action columns, compact variants, and sortable headers.</p>

	<!-- Basic table -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Table</h3>
		<p class="ds-card__sub">Standard header and rows — the foundational table pattern</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							<th style={thStyle}>Name</th>
							<th style={thStyle}>Email</th>
							<th style={thStyle}>Role</th>
							<th style={thStyle}>Joined</th>
							<th style={thStyle}>Projects</th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, i}
							<tr style="{i < users.length - 1 ? rowBorder : ''}">
								<td style="{tdStyle} color: #fff; font-weight: 500;">{user.name}</td>
								<td style="{tdStyle} color: #888;">{user.email}</td>
								<td style={tdStyle}>{user.role}</td>
								<td style="{tdStyle} color: #777;">{user.joined}</td>
								<td style={tdStyle}>{user.projects}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Striped rows -->
	<div class="ds-card">
		<h3 class="ds-card__title">Striped Rows</h3>
		<p class="ds-card__sub">Alternating row backgrounds improve scannability for wide data sets</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							<th style={thStyle}>Project</th>
							<th style={thStyle}>Team</th>
							<th style={thStyle}>Priority</th>
							<th style={thStyle}>Progress</th>
							<th style={thStyle}>Due</th>
						</tr>
					</thead>
					<tbody>
						{#each projects as project, i}
							{@const pc = priorityColors[project.priority]}
							<tr style="background: {i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent'};">
								<td style="{tdStyle} color: #fff; font-weight: 500;">{project.name}</td>
								<td style={tdStyle}>{project.team}</td>
								<td style={tdStyle}>
									<span style="display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: capitalize; background: {pc.bg}; color: {pc.text};">
										{project.priority}
									</span>
								</td>
								<td style={tdStyle}>
									<div style="display: flex; align-items: center; gap: 8px;">
										<div style="flex: 1; height: 4px; background: rgba(255,255,255,0.07); border-radius: 9999px; min-width: 80px;">
											<div style="height: 4px; background: {project.progress === 100 ? '#22c55e' : 'rgba(255,255,255,0.35)'}; border-radius: 9999px; width: {project.progress}%;"></div>
										</div>
										<span style="font-size: 12px; color: #777; width: 28px; text-align: right;">{project.progress}%</span>
									</div>
								</td>
								<td style="{tdStyle} color: #777;">{project.due}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Hoverable rows with status badges -->
	<div class="ds-card">
		<h3 class="ds-card__title">Hoverable Rows with Status Badges</h3>
		<p class="ds-card__sub">Rows highlight on hover — status rendered as inline badge with dot indicator</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							<th style={thStyle}>Name</th>
							<th style={thStyle}>Status</th>
							<th style={thStyle}>Role</th>
							<th style={thStyle}>Last Active</th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, i}
							{@const sc = statusColors[user.status]}
							<tr
								style="{i < users.length - 1 ? rowBorder : ''} transition: background 0.1s;"
								onmouseenter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
								onmouseleave={(e) => (e.currentTarget.style.background = 'transparent')}
							>
								<td style="{tdStyle} color: #fff; font-weight: 500;">
									<div style="display: flex; align-items: center; gap: 10px;">
										<div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #aaa; flex-shrink: 0;">
											{user.name.charAt(0)}
										</div>
										<div>
											<div style="font-size: 13px; font-weight: 500; color: #fff;">{user.name}</div>
											<div style="font-size: 11px; color: #666;">{user.email}</div>
										</div>
									</div>
								</td>
								<td style={tdStyle}>
									<span style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500; text-transform: capitalize; background: {sc.bg}; color: {sc.text};">
										<span style="width: 5px; height: 5px; border-radius: 50%; background: {sc.dot}; flex-shrink: 0;"></span>
										{user.status}
									</span>
								</td>
								<td style={tdStyle}>{user.role}</td>
								<td style="{tdStyle} color: #666;">{user.lastActive}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Compact table -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact Variant</h3>
		<p class="ds-card__sub">Reduced padding for dense data — useful in sidebars and dashboards</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 12px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							<th style={thStyleCompact}>Name</th>
							<th style={thStyleCompact}>Role</th>
							<th style={thStyleCompact}>Projects</th>
							<th style={thStyleCompact}>Status</th>
							<th style={thStyleCompact}>Joined</th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, i}
							{@const sc = statusColors[user.status]}
							<tr style="{i < users.length - 1 ? 'border-bottom: 1px solid rgba(255,255,255,0.03);' : ''}">
								<td style="{tdStyleCompact} color: #e0e0e0; font-weight: 500;">{user.name}</td>
								<td style="{tdStyleCompact} color: #888;">{user.role}</td>
								<td style="{tdStyleCompact} color: #aaa;">{user.projects}</td>
								<td style={tdStyleCompact}>
									<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 500; color: {sc.text}; text-transform: capitalize;">
										<span style="width: 4px; height: 4px; border-radius: 50%; background: {sc.dot}; flex-shrink: 0;"></span>
										{user.status}
									</span>
								</td>
								<td style="{tdStyleCompact} color: #666;">{user.joined}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Table with actions column -->
	<div class="ds-card">
		<h3 class="ds-card__title">Table with Actions Column</h3>
		<p class="ds-card__sub">Row-level edit and delete controls — icon buttons keep the layout clean</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							<th style={thStyle}>Project</th>
							<th style={thStyle}>Team</th>
							<th style={thStyle}>Status</th>
							<th style={thStyle}>Due</th>
							<th style="{thStyle} text-align: right;">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each projects as project, i}
							{@const sc = statusColors[project.status]}
							<tr
								style="{i < projects.length - 1 ? rowBorder : ''} transition: background 0.1s;"
								onmouseenter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
								onmouseleave={(e) => (e.currentTarget.style.background = 'transparent')}
							>
								<td style="{tdStyle} color: #fff; font-weight: 500;">{project.name}</td>
								<td style={tdStyle}>{project.team}</td>
								<td style={tdStyle}>
									<span style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500; text-transform: capitalize; background: {sc.bg}; color: {sc.text};">
										<span style="width: 5px; height: 5px; border-radius: 50%; background: {sc.dot}; flex-shrink: 0;"></span>
										{project.status}
									</span>
								</td>
								<td style="{tdStyle} color: #777;">{project.due}</td>
								<td style="{tdStyle} text-align: right;">
									<div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
										<button
											aria-label="Edit {project.name}"
											style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: #888; cursor: pointer; transition: background 0.1s, color 0.1s;"
											onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#ccc'; }}
											onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#888'; }}
										>
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
										<button
											aria-label="Delete {project.name}"
											style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: #888; cursor: pointer; transition: background 0.1s, color 0.1s;"
											onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)'; (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.25)'; }}
											onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#888'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
										>
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Sortable table -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sortable Headers</h3>
		<p class="ds-card__sub">Click any column header to sort — active column shows direction indicator</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							{#each [['name','Name'],['role','Role'],['projects','Projects'],['joined','Joined'],['lastActive','Last Active']] as [col, label]}
								{@const isActive = sortCol === col}
								<th style="{thStyle} cursor: pointer; user-select: none; color: {isActive ? '#fff' : '#666'}; transition: color 0.15s;">
									<button
										onclick={() => setSort(col)}
										style="display: inline-flex; align-items: center; gap: 5px; background: none; border: none; color: inherit; font: inherit; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; padding: 0;"
									>
										{label}
										<span style="display: inline-flex; flex-direction: column; gap: 1px; opacity: {isActive ? 1 : 0.3};">
											<svg width="8" height="5" viewBox="0 0 8 5" fill="none" style="opacity: {isActive && sortDir === 'asc' ? 1 : 0.4};">
												<path d="M4 0l4 5H0L4 0z" fill="currentColor"/>
											</svg>
											<svg width="8" height="5" viewBox="0 0 8 5" fill="none" style="opacity: {isActive && sortDir === 'desc' ? 1 : 0.4};">
												<path d="M4 5L0 0h8L4 5z" fill="currentColor"/>
											</svg>
										</span>
									</button>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each sortedUsers as user, i}
							<tr style="{i < sortedUsers.length - 1 ? rowBorder : ''}">
								<td style="{tdStyle} color: #fff; font-weight: 500;">{user.name}</td>
								<td style={tdStyle}>{user.role}</td>
								<td style={tdStyle}>{user.projects}</td>
								<td style="{tdStyle} color: #777;">{user.joined}</td>
								<td style="{tdStyle} color: #777;">{user.lastActive}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Empty state -->
	<div class="ds-card">
		<h3 class="ds-card__title">Empty State</h3>
		<p class="ds-card__sub">Table with no rows — provides a clear zero-data message and call to action</p>
		<div class="ds-demo" style="display: block;">
			<div style={tableWrap}>
				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<thead>
						<tr style="border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02);">
							<th style={thStyle}>Name</th>
							<th style={thStyle}>Role</th>
							<th style={thStyle}>Status</th>
							<th style={thStyle}>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan={4} style="padding: 48px 16px; text-align: center;">
								<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
									<div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center;">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: #555;"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
									</div>
									<div>
										<p style="margin: 0; font-size: 14px; font-weight: 500; color: #ddd;">No members found</p>
										<p style="margin: 4px 0 0; font-size: 13px; color: #666;">Get started by inviting your first team member.</p>
									</div>
									<button style="margin-top: 4px; padding: 7px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); color: #ccc; font-size: 13px; font-weight: 500; cursor: pointer;">
										Invite member
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
