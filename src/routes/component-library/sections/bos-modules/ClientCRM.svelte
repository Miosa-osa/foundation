<script lang="ts">
	// ── 1. Client Card View ───────────────────────────────────────
	type ClientStatus = 'Active' | 'Prospect' | 'Churned';

	const clients: {
		initials: string;
		logoColor: string;
		company: string;
		contact: string;
		email: string;
		role: string;
		status: ClientStatus;
		value: string;
		lastContact: string;
	}[] = [
		{ initials: 'AC', logoColor: '#6366f1', company: 'Acme Corp',        contact: 'Dana Reeves',   email: 'dana@acmecorp.com',       role: 'VP of Product',    status: 'Active',   value: '$48,000',  lastContact: '2 days ago' },
		{ initials: 'SK', logoColor: '#0ea5e9', company: 'Skyline KG',        contact: 'Marco Velez',   email: 'marco@skylinekg.de',      role: 'Head of Ops',      status: 'Prospect', value: '$12,500',  lastContact: '1 week ago' },
		{ initials: 'NV', logoColor: '#22c55e', company: 'Nova Ventures',     contact: 'Priya Shah',    email: 'priya@novavc.com',        role: 'CEO',              status: 'Active',   value: '$92,000',  lastContact: 'Today' },
		{ initials: 'BL', logoColor: '#f59e0b', company: 'Bloom Labs',        contact: 'Tyler Kim',     email: 'tyler@bloomlabs.io',      role: 'CTO',              status: 'Churned',  value: '$7,200',   lastContact: '3 months ago' },
		{ initials: 'OR', logoColor: '#ec4899', company: 'Orbit Retail',      contact: 'Sofia Nguyen',  email: 'sofia@orbitretail.com',   role: 'Director, Sales',  status: 'Active',   value: '$31,000',  lastContact: 'Yesterday' },
		{ initials: 'PX', logoColor: '#8b5cf6', company: 'Proxima Health',    contact: 'James Carter',  email: 'james@proximah.com',      role: 'Procurement Mgr',  status: 'Prospect', value: '$22,750',  lastContact: '4 days ago' },
	];

	// ── 2. Kanban Pipeline ───────────────────────────────────────
	type PipelineStage = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

	const pipeline: { stage: PipelineStage; color: string; total: string; cards: { name: string; value: string; probability: number; contact: string }[] }[] = [
		{
			stage: 'Lead',
			color: '#6b7280',
			total: '$12.2k',
			cards: [
				{ name: 'Bloom Labs', value: '$7.2k', probability: 10, contact: 'Tyler Kim' },
				{ name: 'Peak Media', value: '$5.0k', probability: 15, contact: 'Ava Torres' },
			],
		},
		{
			stage: 'Qualified',
			color: '#8b5cf6',
			total: '$32.2k',
			cards: [
				{ name: 'Proxima Health', value: '$22.8k', probability: 30, contact: 'James Carter' },
				{ name: 'Dune Studio', value: '$9.4k', probability: 25, contact: 'Leo Park' },
			],
		},
		{
			stage: 'Proposal',
			color: '#f59e0b',
			total: '$43.5k',
			cards: [
				{ name: 'Skyline KG', value: '$12.5k', probability: 50, contact: 'Marco Velez' },
				{ name: 'Orbit Retail', value: '$31.0k', probability: 60, contact: 'Sofia Nguyen' },
			],
		},
		{
			stage: 'Negotiation',
			color: '#0ea5e9',
			total: '$48.0k',
			cards: [
				{ name: 'Acme Corp', value: '$48.0k', probability: 80, contact: 'Dana Reeves' },
			],
		},
		{
			stage: 'Closed Won',
			color: '#22c55e',
			total: '$92.0k',
			cards: [
				{ name: 'Nova Ventures', value: '$92.0k', probability: 100, contact: 'Priya Shah' },
			],
		},
		{
			stage: 'Closed Lost',
			color: '#ef4444',
			total: '$18.0k',
			cards: [
				{ name: 'Lumen AI', value: '$18.0k', probability: 0, contact: 'Raj Mehta' },
			],
		},
	];

	// ── 3. Table View ─────────────────────────────────────────────
	type SortKey = 'contact' | 'company' | 'status' | 'value' | 'lastActivity' | 'owner';

	const tableClients = [
		{ contact: 'Dana Reeves',   company: 'Acme Corp',      status: 'Active'   as ClientStatus, value: 48000,  stage: 'Negotiation',  lastActivity: '2 days ago',    owner: 'M. Anders' },
		{ contact: 'Marco Velez',   company: 'Skyline KG',     status: 'Prospect' as ClientStatus, value: 12500,  stage: 'Proposal',     lastActivity: '1 week ago',    owner: 'J. Lowe' },
		{ contact: 'Priya Shah',    company: 'Nova Ventures',  status: 'Active'   as ClientStatus, value: 92000,  stage: 'Closed Won',   lastActivity: 'Today',         owner: 'M. Anders' },
		{ contact: 'Tyler Kim',     company: 'Bloom Labs',     status: 'Churned'  as ClientStatus, value: 7200,   stage: 'Lead',         lastActivity: '3 months ago',  owner: 'S. Romero' },
		{ contact: 'Sofia Nguyen',  company: 'Orbit Retail',   status: 'Active'   as ClientStatus, value: 31000,  stage: 'Proposal',     lastActivity: 'Yesterday',     owner: 'J. Lowe' },
	];

	let sortKey = $state<SortKey>('company');
	let sortAsc = $state(true);

	function toggleSort(key: SortKey) {
		if (sortKey === key) {
			sortAsc = !sortAsc;
		} else {
			sortKey = key;
			sortAsc = true;
		}
	}

	const sortedClients = $derived(
		[...tableClients].sort((a, b) => {
			let av: string | number = a[sortKey] as string | number;
			let bv: string | number = b[sortKey] as string | number;
			if (typeof av === 'number' && typeof bv === 'number') {
				return sortAsc ? av - bv : bv - av;
			}
			return sortAsc
				? String(av).localeCompare(String(bv))
				: String(bv).localeCompare(String(av));
		})
	);

	let openRowMenu = $state<string | null>(null);
	function toggleRowMenu(contact: string) {
		openRowMenu = openRowMenu === contact ? null : contact;
	}

	// ── 4. View Switcher ─────────────────────────────────────────
	type ViewMode = 'cards' | 'list' | 'pipeline' | 'map';
	let activeView = $state<ViewMode>('cards');

	// ── 5. Deal Detail Panel ─────────────────────────────────────
	let detailOpen = $state(true);

	const dealStages: PipelineStage[] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
	const currentStageIndex = 3; // Negotiation
</script>

<section class="ds-section">
	<h2 class="ds-title">Client &amp; CRM</h2>
	<p class="ds-desc">Client cards, pipeline kanban, table views, view switcher, and deal detail panels for BusinessOS CRM patterns.</p>

	<!-- ── 4. View Switcher ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">View Switcher</h3>
		<p class="ds-card__sub">Toggle between Cards, List, Pipeline, and Map views. Active state indicated by filled background.</p>
		<div class="cr-view-switcher" role="toolbar" aria-label="View mode switcher">
			<button
				class="btn-compact"
				class:btn-compact-primary={activeView === 'cards'}
				class:btn-compact-ghost={activeView !== 'cards'}
				onclick={() => (activeView = 'cards')}
				aria-pressed={activeView === 'cards'}
				aria-label="Cards view"
			>
				<!-- Grid icon -->
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
					<rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
				</svg>
				<span>Cards</span>
			</button>
			<button
				class="btn-compact"
				class:btn-compact-primary={activeView === 'list'}
				class:btn-compact-ghost={activeView !== 'list'}
				onclick={() => (activeView = 'list')}
				aria-pressed={activeView === 'list'}
				aria-label="List view"
			>
				<!-- List icon -->
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
				</svg>
				<span>List</span>
			</button>
			<button
				class="btn-compact"
				class:btn-compact-primary={activeView === 'pipeline'}
				class:btn-compact-ghost={activeView !== 'pipeline'}
				onclick={() => (activeView = 'pipeline')}
				aria-pressed={activeView === 'pipeline'}
				aria-label="Pipeline view"
			>
				<!-- Columns icon -->
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<rect x="3" y="3" width="5" height="18"/><rect x="10" y="3" width="5" height="14"/>
					<rect x="17" y="3" width="4" height="10"/>
				</svg>
				<span>Pipeline</span>
			</button>
			<button
				class="btn-compact"
				class:btn-compact-primary={activeView === 'map'}
				class:btn-compact-ghost={activeView !== 'map'}
				onclick={() => (activeView = 'map')}
				aria-pressed={activeView === 'map'}
				aria-label="Map view"
			>
				<!-- Map pin icon -->
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
				</svg>
				<span>Map</span>
			</button>
		</div>

		<!-- Mini preview of each view mode -->
		<div class="cr-view-preview">
			{#if activeView === 'cards'}
				<div class="cr-preview-cards">
					<div class="cr-preview-card"></div>
					<div class="cr-preview-card"></div>
					<div class="cr-preview-card"></div>
				</div>
			{:else if activeView === 'list'}
				<div class="cr-preview-list">
					<div class="cr-preview-row"></div>
					<div class="cr-preview-row"></div>
					<div class="cr-preview-row"></div>
					<div class="cr-preview-row"></div>
				</div>
			{:else if activeView === 'pipeline'}
				<div class="cr-preview-pipeline">
					<div class="cr-preview-col"><div class="cr-preview-col-card"></div><div class="cr-preview-col-card"></div></div>
					<div class="cr-preview-col"><div class="cr-preview-col-card"></div></div>
					<div class="cr-preview-col"><div class="cr-preview-col-card"></div><div class="cr-preview-col-card"></div></div>
					<div class="cr-preview-col"><div class="cr-preview-col-card"></div></div>
				</div>
			{:else}
				<div class="cr-preview-map">
					<div class="cr-preview-map-bg">
						<div class="cr-preview-pin" style="top:20%;left:30%;"></div>
						<div class="cr-preview-pin" style="top:45%;left:60%;"></div>
						<div class="cr-preview-pin" style="top:70%;left:25%;"></div>
						<div class="cr-preview-pin" style="top:35%;left:75%;"></div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- ── 1. Client Card View ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Client Cards</h3>
		<p class="ds-card__sub">Grid of contact cards with avatar, company name, contact info, deal value badge, last contact date, status pill, and quick actions.</p>
		<div class="cr-card-grid" role="list" aria-label="Client cards">
			{#each clients as client (client.company)}
				<article class="cr-client-card" role="listitem" aria-label="{client.company} client">
					<!-- Header: logo + company + status -->
					<div class="cr-client-card__header">
						<div class="cr-logo" style="background:{client.logoColor}22; border-color:{client.logoColor}33;" aria-hidden="true">
							<span class="cr-logo__initials" style="color:{client.logoColor};">{client.initials}</span>
						</div>
						<div class="cr-client-card__header-info">
							<div class="cr-client-card__company">{client.company}</div>
							<span
								class="cr-status-pill cr-status-pill--{client.status.toLowerCase()}"
								aria-label="Status: {client.status}"
							>{client.status}</span>
						</div>
					</div>

					<!-- Contact -->
					<div class="cr-client-card__contact">
						<div class="cr-client-card__contact-name">{client.contact}</div>
						<div class="cr-client-card__contact-role">{client.role}</div>
						<div class="cr-client-card__contact-email">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
							<span>{client.email}</span>
						</div>
					</div>

					<!-- Meta row -->
					<div class="cr-client-card__meta">
						<div class="cr-deal-badge" aria-label="Deal value: {client.value}">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
							<span>{client.value}</span>
						</div>
						<div class="cr-client-card__last-contact" aria-label="Last contact: {client.lastContact}">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							<span>{client.lastContact}</span>
						</div>
					</div>

					<!-- Quick actions -->
					<div class="cr-client-card__actions" role="toolbar" aria-label="Quick actions for {client.company}">
						<button class="btn-compact btn-compact-ghost btn-compact-icon cr-quick-btn-flex" aria-label="Email {client.contact}">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
							<span>Email</span>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon cr-quick-btn-flex" aria-label="Call {client.contact}">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
							<span>Call</span>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon cr-quick-btn-flex" aria-label="Add note for {client.company}">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
							<span>Note</span>
						</button>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 2. Kanban Pipeline ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Kanban Pipeline</h3>
		<p class="ds-card__sub">Deal stages: Lead, Qualified, Proposal, Negotiation, Closed Won, Closed Lost. Cards show company, deal value, probability %, and contact. Column header includes total value.</p>
		<div class="cr-kanban" role="region" aria-label="CRM pipeline kanban">
			{#each pipeline as col (col.stage)}
				<div class="cr-kanban-col" role="group" aria-label="{col.stage} stage, {col.cards.length} deals">
					<div class="cr-kanban-col__header">
						<span class="cr-kanban-col__dot" style="background:{col.color};" aria-hidden="true"></span>
						<span class="cr-kanban-col__stage">{col.stage}</span>
						<span class="cr-kanban-col__count" aria-label="{col.cards.length} cards">{col.cards.length}</span>
					</div>
					<div class="cr-kanban-col__total" aria-label="Total: {col.total}">{col.total}</div>
					<div class="cr-kanban-col__cards" role="list">
						{#each col.cards as card (card.name)}
							<div class="cr-kanban-card" role="listitem" aria-label="{card.name}, {card.value}">
								<!-- Drag handle -->
								<div class="cr-kanban-card__drag" aria-hidden="true">
									<svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
										<circle cx="2" cy="2" r="1.2"/><circle cx="6" cy="2" r="1.2"/>
										<circle cx="2" cy="7" r="1.2"/><circle cx="6" cy="7" r="1.2"/>
										<circle cx="2" cy="12" r="1.2"/><circle cx="6" cy="12" r="1.2"/>
									</svg>
								</div>
								<div class="cr-kanban-card__body">
									<div class="cr-kanban-card__name">{card.name}</div>
									<div class="cr-kanban-card__contact">{card.contact}</div>
									<div class="cr-kanban-card__meta">
										<span class="cr-kanban-card__value">{card.value}</span>
										<span class="cr-kanban-card__prob" aria-label="{card.probability}% probability">{card.probability}%</span>
									</div>
								</div>
								<div class="cr-kanban-card__bar" style="--stage-color:{col.color};" aria-hidden="true"></div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 3. Client Table View ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Client Table View</h3>
		<p class="ds-card__sub">CRM list with Company, Contact, Deal Value, Stage, Last Activity, and Owner columns. Click headers to sort. Row hover reveals quick actions. Pencil icon indicates inline editing.</p>
		<div class="cr-table-wrap" role="region" aria-label="Client table">
			<table class="cr-table" aria-label="Clients">
				<thead>
					<tr>
						{#each (
							[
								{ key: 'company' as SortKey, label: 'Company' },
								{ key: 'contact' as SortKey, label: 'Contact' },
								{ key: 'value' as SortKey, label: 'Deal Value' },
								{ key: 'status' as SortKey, label: 'Stage' },
								{ key: 'lastActivity' as SortKey, label: 'Last Activity' },
								{ key: 'owner' as SortKey, label: 'Owner' },
							]
						) as col (col.key)}
							<th
								class="cr-table__th"
								class:cr-table__th--active={sortKey === col.key}
								aria-sort={sortKey === col.key ? (sortAsc ? 'ascending' : 'descending') : 'none'}
							>
								<button
									class="cr-table__sort-btn"
									onclick={() => toggleSort(col.key)}
									aria-label="Sort by {col.label}"
								>
									{col.label}
									<svg
										class="cr-table__sort-icon"
										class:cr-table__sort-icon--asc={sortKey === col.key && sortAsc}
										class:cr-table__sort-icon--desc={sortKey === col.key && !sortAsc}
										width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
										aria-hidden="true"
									>
										<polyline points="6 9 12 15 18 9"/>
									</svg>
								</button>
							</th>
						{/each}
						<th class="cr-table__th cr-table__th--actions" aria-label="Actions column"></th>
					</tr>
				</thead>
				<tbody>
					{#each sortedClients as row (row.contact)}
						<tr class="cr-table__row">
							<td class="cr-table__td cr-table__td--name">
								{row.company}
								<span class="cr-inline-edit-icon" aria-label="Editable field">
									<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
								</span>
							</td>
							<td class="cr-table__td">{row.contact}</td>
							<td class="cr-table__td cr-table__td--num">${row.value.toLocaleString()}</td>
							<td class="cr-table__td">
								<span class="cr-status-pill cr-status-pill--{row.status.toLowerCase()}">{row.stage}</span>
							</td>
							<td class="cr-table__td cr-table__td--muted">{row.lastActivity}</td>
							<td class="cr-table__td cr-table__td--muted">{row.owner}</td>
							<td class="cr-table__td cr-table__td--actions">
								<div class="cr-row-actions">
									<button class="btn-compact btn-compact-ghost btn-compact-icon cr-row-action-fade" aria-label="Email {row.contact}">
										<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
									</button>
									<div class="cr-row-menu-wrap">
										<button
											class="btn-compact btn-compact-ghost btn-compact-icon"
											aria-label="Actions for {row.contact}"
											aria-expanded={openRowMenu === row.contact}
											onclick={() => toggleRowMenu(row.contact)}
										>
											<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
												<circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
											</svg>
										</button>
										{#if openRowMenu === row.contact}
											<div class="cr-dropdown" role="menu" aria-label="Row actions">
												<button class="cr-dropdown__item" role="menuitem">View profile</button>
												<button class="cr-dropdown__item" role="menuitem">Edit</button>
												<button class="cr-dropdown__item" role="menuitem">Add note</button>
												<div class="cr-dropdown__divider" aria-hidden="true"></div>
												<button class="cr-dropdown__item cr-dropdown__item--danger" role="menuitem">Archive</button>
											</div>
										{/if}
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ── 5. Deal Detail Panel ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Deal Detail Panel</h3>
		<p class="ds-card__sub">Slide-over panel with deal name, value, probability, stage progress bar, contact info, activity timeline, notes, files/attachments, and next action reminder.</p>
		<div class="cr-deal-panel" class:cr-deal-panel--open={detailOpen} role="region" aria-label="Deal detail panel">
			<!-- Panel header -->
			<div class="cr-deal-panel__header">
				<div class="cr-deal-panel__header-left">
					<div class="cr-logo cr-logo--lg" style="background:#6366f122; border-color:#6366f133;" aria-hidden="true">
						<span class="cr-logo__initials" style="color:#6366f1;">AC</span>
					</div>
					<div>
						<div class="cr-deal-panel__name">Enterprise License -- Acme Corp</div>
						<div class="cr-deal-panel__sub">Acme Corp &middot; Dana Reeves</div>
					</div>
				</div>
				<div class="cr-deal-panel__header-actions">
					<button class="btn-rounded btn-rounded-ghost btn-rounded-sm" aria-label="Edit deal">Edit</button>
					<button class="btn-rounded btn-rounded-primary btn-rounded-sm" aria-label="Move to next stage">Advance</button>
				</div>
			</div>

			<!-- Deal metrics -->
			<div class="cr-deal-panel__metrics" role="list" aria-label="Deal metrics">
				<div class="cr-metric" role="listitem">
					<div class="cr-metric__label">Deal Value</div>
					<div class="cr-metric__value">$48,000</div>
				</div>
				<div class="cr-metric" role="listitem">
					<div class="cr-metric__label">Probability</div>
					<div class="cr-metric__value">80%</div>
				</div>
				<div class="cr-metric" role="listitem">
					<div class="cr-metric__label">Expected Close</div>
					<div class="cr-metric__value cr-metric__value--sm">Mar 31, 2026</div>
				</div>
			</div>

			<!-- Stage progress bar -->
			<div class="cr-stage-progress" role="progressbar" aria-label="Deal stage: Negotiation" aria-valuenow={4} aria-valuemin={1} aria-valuemax={6}>
				<div class="cr-stage-progress__label">Stage Progress</div>
				<div class="cr-stage-progress__track">
					{#each dealStages as stage, i (stage)}
						<div
							class="cr-stage-progress__step"
							class:cr-stage-progress__step--completed={i < currentStageIndex}
							class:cr-stage-progress__step--current={i === currentStageIndex}
							class:cr-stage-progress__step--lost={stage === 'Closed Lost'}
						>
							<div class="cr-stage-progress__dot" aria-hidden="true">
								{#if i < currentStageIndex}
									<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
								{/if}
							</div>
							<span class="cr-stage-progress__name">{stage}</span>
						</div>
						{#if i < dealStages.length - 1}
							<div
								class="cr-stage-progress__connector"
								class:cr-stage-progress__connector--filled={i < currentStageIndex}
								aria-hidden="true"
							></div>
						{/if}
					{/each}
				</div>
			</div>

			<div class="cr-deal-panel__body">
				<!-- Contact info -->
				<div class="cr-deal-panel__section">
					<div class="cr-deal-panel__section-title">Contact</div>
					<div class="cr-contact-row">
						<div class="cr-contact-row__avatar" aria-hidden="true">DR</div>
						<div class="cr-contact-row__info">
							<div class="cr-contact-row__name">Dana Reeves</div>
							<div class="cr-contact-row__role">VP of Product &middot; Acme Corp</div>
							<div class="cr-contact-row__links">
								<a href="#email" class="cr-contact-row__link" aria-label="Email Dana Reeves">
									<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
									dana@acmecorp.com
								</a>
								<a href="#phone" class="cr-contact-row__link" aria-label="Call Dana Reeves">
									<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
									+1 (415) 555-0142
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Activity timeline -->
				<div class="cr-deal-panel__section">
					<div class="cr-deal-panel__section-title">Activity</div>
					<div class="cr-activity-list" role="list" aria-label="Activity timeline">
						{#each [
							{ type: 'email', label: 'Email', text: 'Sent proposal deck v2', time: '2 days ago', color: '#6366f1' },
							{ type: 'call', label: 'Call', text: '30-min discovery call with Dana', time: '5 days ago', color: '#0ea5e9' },
							{ type: 'note', label: 'Note', text: 'Client interested in 3-year contract', time: '1 week ago', color: '#f59e0b' },
							{ type: 'meeting', label: 'Meeting', text: 'On-site demo at Acme HQ', time: '2 weeks ago', color: '#22c55e' },
						] as activity, i}
							<div class="cr-activity-item" role="listitem">
								<div class="cr-activity-item__dot-col" aria-hidden="true">
									<div class="cr-activity-item__dot" style="background:{activity.color}22; border-color:{activity.color}44;">
										<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="{activity.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
											{#if activity.type === 'email'}
												<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
											{:else if activity.type === 'call'}
												<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
											{:else if activity.type === 'note'}
												<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
											{:else}
												<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
											{/if}
										</svg>
									</div>
									{#if i < 3}
										<div class="cr-activity-item__line" aria-hidden="true"></div>
									{/if}
								</div>
								<div class="cr-activity-item__content">
									<div class="cr-activity-item__label">{activity.label}</div>
									<div class="cr-activity-item__text">{activity.text}</div>
									<div class="cr-activity-item__time">{activity.time}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Notes section -->
			<div class="cr-deal-panel__notes-section">
				<div class="cr-deal-panel__section-title">Notes</div>
				<div class="cr-note-block" role="note">
					<p class="cr-note-block__text">Dana confirmed budget approval from the board last Thursday. Looking for a 3-year contract with quarterly billing. Follow up after March 15 to finalize the proposal terms.</p>
					<div class="cr-note-block__meta">
						<span>M. Anders</span>
						<span aria-hidden="true">&middot;</span>
						<span>2 days ago</span>
					</div>
				</div>
				<div class="cr-note-block" role="note">
					<p class="cr-note-block__text">Legal team reviewing contract template. Need to address indemnity clause before next meeting.</p>
					<div class="cr-note-block__meta">
						<span>J. Lowe</span>
						<span aria-hidden="true">&middot;</span>
						<span>1 week ago</span>
					</div>
				</div>
			</div>

			<!-- Files / Attachments -->
			<div class="cr-deal-panel__files-section">
				<div class="cr-deal-panel__section-title">Files &amp; Attachments</div>
				<div class="cr-file-list" role="list" aria-label="Attached files">
					{#each [
						{ name: 'Proposal_v2.pdf', size: '2.4 MB', icon: 'pdf', color: '#ef4444' },
						{ name: 'Contract_Template.docx', size: '186 KB', icon: 'doc', color: '#2563eb' },
						{ name: 'Meeting_Notes_Mar5.md', size: '12 KB', icon: 'txt', color: '#6b7280' },
						{ name: 'Product_Demo.mp4', size: '48 MB', icon: 'vid', color: '#8b5cf6' },
					] as file}
						<div class="cr-file-item" role="listitem" aria-label="{file.name}, {file.size}">
							<div class="cr-file-item__icon" style="background:{file.color}15; color:{file.color};" aria-hidden="true">
								<span class="cr-file-item__ext">{file.icon}</span>
							</div>
							<div class="cr-file-item__info">
								<div class="cr-file-item__name">{file.name}</div>
								<div class="cr-file-item__size">{file.size}</div>
							</div>
							<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Download {file.name}">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
							</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- Next Action Reminder -->
			<div class="cr-deal-panel__reminder">
				<div class="cr-reminder" role="alert" aria-label="Next action reminder">
					<div class="cr-reminder__icon" aria-hidden="true">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
					</div>
					<div class="cr-reminder__content">
						<div class="cr-reminder__title">Next Action</div>
						<div class="cr-reminder__text">Follow up with Dana on contract terms</div>
						<div class="cr-reminder__due">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							<span>Due: Mar 15, 2026</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Status Pills ───────────────────────────────────────────── */
	.cr-status-pill {
		display: inline-flex;
		align-items: center;
		height: 18px;
		padding: 0 7px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.01em;
		flex-shrink: 0;
	}
	.cr-status-pill--active {
		background: rgba(34, 197, 94, 0.12);
		color: #16a34a;
	}
	.cr-status-pill--prospect {
		background: rgba(59, 130, 246, 0.12);
		color: #2563eb;
	}
	.cr-status-pill--churned {
		background: rgba(239, 68, 68, 0.12);
		color: #ef4444;
	}
	:global(.dark) .cr-status-pill--active { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
	:global(.dark) .cr-status-pill--prospect { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
	:global(.dark) .cr-status-pill--churned { background: rgba(239, 68, 68, 0.15); color: #f87171; }

	/* ─── Logo Placeholder ───────────────────────────────────────── */
	.cr-logo {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		border: 1.5px solid transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.cr-logo--lg {
		width: 48px;
		height: 48px;
		border-radius: 12px;
	}
	.cr-logo__initials {
		font-size: 13px;
		font-weight: 800;
		letter-spacing: -0.01em;
		line-height: 1;
	}
	.cr-logo--lg .cr-logo__initials { font-size: 15px; }

	/* ─── Shared Buttons ─────────────────────────────────────────── */
	/* ─── View Switcher ──────────────────────────────────────────── */
	.cr-view-switcher {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
	}
	/* View preview container */
	.cr-view-preview {
		margin-top: 14px;
		padding: 16px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		min-height: 80px;
	}
	.cr-preview-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}
	.cr-preview-card {
		height: 48px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
	}
	.cr-preview-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.cr-preview-row {
		height: 14px;
		border-radius: 4px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
	}
	.cr-preview-pipeline {
		display: flex;
		gap: 6px;
	}
	.cr-preview-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.cr-preview-col-card {
		height: 24px;
		border-radius: 6px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
	}
	.cr-preview-map {
		position: relative;
		height: 80px;
	}
	.cr-preview-map-bg {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		overflow: hidden;
	}
	.cr-preview-pin {
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50% 50% 50% 0;
		background: #2563eb;
		transform: rotate(-45deg);
		box-shadow: 0 1px 4px rgba(37, 99, 235, 0.3);
	}

	/* ─── 1. Client Card Grid ────────────────────────────────────── */
	.cr-card-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		max-width: 780px;
	}
	.cr-client-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px;
		border-radius: 14px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.13s, box-shadow 0.13s;
	}
	.cr-client-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 3px 14px rgba(0, 0, 0, 0.06);
	}
	.cr-client-card__header {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}
	.cr-client-card__header-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.cr-client-card__company {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-client-card__contact {
		border-top: 1px solid var(--dbd);
		padding-top: 10px;
	}
	.cr-client-card__contact-name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
	}
	.cr-client-card__contact-role {
		font-size: 11px;
		color: var(--dt3);
		margin-top: 1px;
	}
	.cr-client-card__contact-email {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 10px;
		color: var(--dt3);
		margin-top: 4px;
	}
	.cr-client-card__contact-email svg { flex-shrink: 0; }
	.cr-client-card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}
	.cr-deal-badge {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		padding: 2px 8px;
		border-radius: 9999px;
		background: rgba(34, 197, 94, 0.08);
		border: 1px solid rgba(34, 197, 94, 0.15);
		font-size: 11px;
		font-weight: 700;
		color: #16a34a;
	}
	:global(.dark) .cr-deal-badge {
		background: rgba(34, 197, 94, 0.12);
		border-color: rgba(34, 197, 94, 0.2);
		color: #4ade80;
	}
	.cr-client-card__last-contact {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
	}
	.cr-client-card__actions {
		display: flex;
		align-items: center;
		gap: 4px;
		border-top: 1px solid var(--dbd);
		padding-top: 10px;
	}
	/* cr-quick-btn-flex: stretches foundation compact buttons equally across card action row */
	.cr-quick-btn-flex { flex: 1; }

	/* ─── 2. Kanban Pipeline ─────────────────────────────────────── */
	.cr-kanban {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding-bottom: 4px;
	}
	.cr-kanban-col {
		flex-shrink: 0;
		width: 170px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cr-kanban-col__header {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 2px;
	}
	.cr-kanban-col__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.cr-kanban-col__stage {
		flex: 1;
		font-size: 10px;
		font-weight: 700;
		color: var(--dt3);
		letter-spacing: 0.01em;
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-kanban-col__count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 10px;
		font-weight: 700;
		color: var(--dt3);
	}
	.cr-kanban-col__total {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		padding: 0 2px 4px;
		letter-spacing: -0.01em;
	}
	.cr-kanban-col__cards {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cr-kanban-card {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 6px;
		padding: 10px 10px 10px 6px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
		transition: border-color 0.12s, box-shadow 0.12s;
		cursor: grab;
	}
	.cr-kanban-card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}
	.cr-kanban-card__drag {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 12px;
		flex-shrink: 0;
		color: var(--dt3);
		opacity: 0.4;
		cursor: grab;
		padding-top: 2px;
	}
	.cr-kanban-card:hover .cr-kanban-card__drag { opacity: 0.7; }
	.cr-kanban-card__body {
		flex: 1;
		min-width: 0;
	}
	.cr-kanban-card__bar {
		position: absolute;
		top: 0;
		left: 0;
		width: 3px;
		height: 100%;
		background: var(--stage-color, var(--dbd2));
		border-radius: 3px 0 0 3px;
	}
	.cr-kanban-card__name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-kanban-card__contact {
		font-size: 10px;
		color: var(--dt3);
		margin-top: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-kanban-card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
		margin-top: 6px;
	}
	.cr-kanban-card__value {
		font-size: 11px;
		font-weight: 700;
		color: var(--dt);
	}
	.cr-kanban-card__prob {
		font-size: 10px;
		font-weight: 600;
		color: var(--dt3);
		padding: 1px 5px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
	}

	/* ─── 3. Table ───────────────────────────────────────────────── */
	.cr-table-wrap {
		overflow-x: auto;
		border-radius: 12px;
		border: 1px solid var(--dbd);
	}
	.cr-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}
	.cr-table__th {
		padding: 0;
		text-align: left;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		white-space: nowrap;
	}
	.cr-table__th:first-child .cr-table__sort-btn { border-radius: 12px 0 0 0; }
	.cr-table__th--actions { width: 70px; }
	.cr-table__th--active .cr-table__sort-btn { color: var(--dt); }
	.cr-table__sort-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		width: 100%;
		padding: 9px 12px;
		border: none;
		background: transparent;
		color: var(--dt3);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition: color 0.12s;
		white-space: nowrap;
	}
	.cr-table__sort-btn:hover { color: var(--dt); }
	.cr-table__sort-icon {
		opacity: 0.3;
		transition: opacity 0.12s, transform 0.15s;
	}
	.cr-table__sort-icon--asc { opacity: 1; transform: rotate(0deg); }
	.cr-table__sort-icon--desc { opacity: 1; transform: rotate(180deg); }
	.cr-table__row {
		transition: background 0.1s;
	}
	.cr-table__row:hover { background: var(--dbg2); }
	.cr-table__row:not(:last-child) .cr-table__td { border-bottom: 1px solid var(--dbd); }
	.cr-table__td {
		padding: 10px 12px;
		color: var(--dt);
		vertical-align: middle;
		white-space: nowrap;
	}
	.cr-table__td--name {
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.cr-table__td--num { font-variant-numeric: tabular-nums; font-weight: 600; }
	.cr-table__td--muted { color: var(--dt3); }
	.cr-table__td--actions { text-align: center; }
	.cr-inline-edit-icon {
		display: inline-flex;
		opacity: 0;
		color: var(--dt3);
		transition: opacity 0.12s;
	}
	.cr-table__row:hover .cr-inline-edit-icon { opacity: 0.6; }

	/* Row actions */
	.cr-row-actions {
		display: flex;
		align-items: center;
		gap: 2px;
		justify-content: center;
	}
	/* cr-row-action-fade: fade-in row action on table row hover */
	.cr-row-action-fade { opacity: 0; transition: opacity 0.12s; }
	.cr-table__row:hover .cr-row-action-fade { opacity: 1; }
	.cr-row-menu-wrap { position: relative; display: inline-flex; }
	.cr-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		z-index: 10;
		min-width: 140px;
		border-radius: 10px;
		border: 1px solid var(--dbd2);
		background: var(--dbg);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
		overflow: hidden;
		padding: 4px;
	}
	.cr-dropdown__item {
		display: block;
		width: 100%;
		padding: 7px 10px;
		border: none;
		background: transparent;
		color: var(--dt);
		font-size: 12px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		border-radius: 7px;
		transition: background 0.1s;
	}
	.cr-dropdown__item:hover { background: var(--dbg2); }
	.cr-dropdown__item--danger { color: #ef4444; }
	.cr-dropdown__item--danger:hover { background: rgba(239, 68, 68, 0.08); }
	.cr-dropdown__divider { height: 1px; background: var(--dbd); margin: 3px 0; }

	/* ─── 5. Deal Detail Panel ───────────────────────────────────── */
	.cr-deal-panel {
		max-width: 680px;
		border-radius: 16px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
	}
	.cr-deal-panel__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 16px;
		border-bottom: 1px solid var(--dbd);
		flex-wrap: wrap;
	}
	.cr-deal-panel__header-left {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}
	.cr-deal-panel__name {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.cr-deal-panel__sub {
		font-size: 12px;
		color: var(--dt3);
		margin-top: 2px;
	}
	.cr-deal-panel__header-actions {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	/* Metrics strip */
	.cr-deal-panel__metrics {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-bottom: 1px solid var(--dbd);
	}
	.cr-metric {
		padding: 12px 16px;
		border-right: 1px solid var(--dbd);
	}
	.cr-metric:last-child { border-right: none; }
	.cr-metric__label {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		margin-bottom: 5px;
	}
	.cr-metric__value {
		font-size: 16px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.02em;
	}
	.cr-metric__value--sm {
		font-size: 13px;
	}

	/* Stage progress bar */
	.cr-stage-progress {
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.cr-stage-progress__label {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		margin-bottom: 10px;
	}
	.cr-stage-progress__track {
		display: flex;
		align-items: center;
	}
	.cr-stage-progress__step {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		flex-shrink: 0;
	}
	.cr-stage-progress__dot {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid var(--dbd2);
		background: var(--dbg);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, border-color 0.15s;
	}
	.cr-stage-progress__step--completed .cr-stage-progress__dot {
		background: #22c55e;
		border-color: #22c55e;
		color: #fff;
	}
	.cr-stage-progress__step--current .cr-stage-progress__dot {
		background: #2563eb;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
	}
	.cr-stage-progress__step--lost .cr-stage-progress__dot {
		border-color: var(--dbd);
		opacity: 0.5;
	}
	.cr-stage-progress__name {
		font-size: 9px;
		font-weight: 600;
		color: var(--dt3);
		text-align: center;
		max-width: 60px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-stage-progress__step--current .cr-stage-progress__name {
		color: #2563eb;
		font-weight: 700;
	}
	.cr-stage-progress__step--completed .cr-stage-progress__name {
		color: #16a34a;
	}
	.cr-stage-progress__connector {
		flex: 1;
		height: 2px;
		background: var(--dbd);
		margin: 0 2px;
		margin-bottom: 18px;
		border-radius: 9999px;
	}
	.cr-stage-progress__connector--filled {
		background: #22c55e;
	}

	/* Body layout */
	.cr-deal-panel__body {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.cr-deal-panel__section {
		padding: 14px 16px;
		border-right: 1px solid var(--dbd);
		border-bottom: 1px solid var(--dbd);
	}
	.cr-deal-panel__section:nth-child(2n) { border-right: none; }
	.cr-deal-panel__section-title {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		margin-bottom: 10px;
	}

	/* Contact row */
	.cr-contact-row {
		display: flex;
		gap: 10px;
	}
	.cr-contact-row__avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(99, 102, 241, 0.12);
		border: 1.5px solid rgba(99, 102, 241, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 800;
		color: #6366f1;
		flex-shrink: 0;
	}
	.cr-contact-row__info { flex: 1; min-width: 0; }
	.cr-contact-row__name {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		margin-bottom: 1px;
	}
	.cr-contact-row__role {
		font-size: 11px;
		color: var(--dt3);
		margin-bottom: 6px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-contact-row__links {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.cr-contact-row__link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
		text-decoration: none;
		transition: color 0.12s;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-contact-row__link:hover { color: var(--dt); }

	/* Activity list */
	.cr-activity-list {
		display: flex;
		flex-direction: column;
	}
	.cr-activity-item {
		display: flex;
		gap: 8px;
	}
	.cr-activity-item__dot-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 22px;
	}
	.cr-activity-item__dot {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1.5px solid transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		z-index: 1;
	}
	.cr-activity-item__line {
		width: 1px;
		flex: 1;
		min-height: 8px;
		background: var(--dbd);
		margin: 2px 0;
	}
	.cr-activity-item__content {
		flex: 1;
		padding-bottom: 10px;
		padding-top: 2px;
	}
	.cr-activity-item__label {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		margin-bottom: 1px;
	}
	.cr-activity-item__text {
		font-size: 11px;
		color: var(--dt);
		font-weight: 500;
		margin-bottom: 1px;
	}
	.cr-activity-item__time {
		font-size: 10px;
		color: var(--dt3);
	}

	/* Notes section */
	.cr-deal-panel__notes-section {
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.cr-note-block {
		padding: 10px 12px;
		border-radius: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
	}
	.cr-note-block__text {
		margin: 0 0 6px;
		font-size: 12px;
		color: var(--dt);
		line-height: 1.55;
	}
	.cr-note-block__meta {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* Files / Attachments */
	.cr-deal-panel__files-section {
		padding: 14px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.cr-file-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.cr-file-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		border-radius: 8px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.12s;
	}
	.cr-file-item:hover { border-color: var(--dbd2); }
	.cr-file-item__icon {
		width: 32px;
		height: 32px;
		border-radius: 7px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.cr-file-item__ext {
		font-size: 9px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}
	.cr-file-item__info {
		flex: 1;
		min-width: 0;
	}
	.cr-file-item__name {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cr-file-item__size {
		font-size: 10px;
		color: var(--dt3);
		margin-top: 1px;
	}

	/* Next Action Reminder */
	.cr-deal-panel__reminder {
		padding: 14px 16px;
	}
	.cr-reminder {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 14px;
		border-radius: 10px;
		background: rgba(37, 99, 235, 0.06);
		border: 1px solid rgba(37, 99, 235, 0.15);
	}
	:global(.dark) .cr-reminder {
		background: rgba(37, 99, 235, 0.1);
		border-color: rgba(37, 99, 235, 0.2);
	}
	.cr-reminder__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: rgba(37, 99, 235, 0.1);
		color: #2563eb;
		flex-shrink: 0;
	}
	:global(.dark) .cr-reminder__icon { color: #60a5fa; background: rgba(37, 99, 235, 0.15); }
	.cr-reminder__content {
		flex: 1;
		min-width: 0;
	}
	.cr-reminder__title {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #2563eb;
		margin-bottom: 3px;
	}
	:global(.dark) .cr-reminder__title { color: #60a5fa; }
	.cr-reminder__text {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt);
		margin-bottom: 4px;
	}
	.cr-reminder__due {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
		font-weight: 500;
	}
</style>
