<script lang="ts">
	// ── 1. Table with Toolbar ────────────────────────────────────────
	let searchQuery = $state('');
	let activeView = $state<'table' | 'grid' | 'list'>('table');
	let currentPage = $state(1);
	const totalItems = 86;
	const perPage = 10;

	// ── 2. Column Types (no extra state needed) ─────────────────────

	// ── 3. Filter Builder ───────────────────────────────────────────
	let filterConjunction = $state<'AND' | 'OR'>('AND');
	let appliedFilters = $state<string[]>(['Status is Active', 'Priority is High']);

	// ── 4. Row Expand ───────────────────────────────────────────────
	let expandedRow = $state<number | null>(1);
	let expandTab = $state<'details' | 'activity' | 'files'>('details');

	// ── 5. Template Gallery ─────────────────────────────────────────
	let selectedTemplate = $state<string | null>(null);
</script>

<section class="ds-section">
	<h2 class="ds-title">Data Tables</h2>
	<p class="ds-desc">Advanced Airtable-like table patterns with toolbars, filter builders, column renderers, expandable rows, and pre-built templates.</p>

	<!-- ─── 1. Table with Toolbar ─────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Table with Toolbar</h3>
		<p class="ds-card__sub">Full data table with search, filters, sorting, view toggle, and pagination</p>

		<div class="dt2-toolbar">
			<div class="dt2-toolbar__left">
				<div class="dt2-search">
					<svg class="dt2-search__icon" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke-width="2"/><path stroke-linecap="round" stroke-width="2" d="m21 21-4.35-4.35"/></svg>
					<input class="dt2-search__input" type="text" placeholder="Search records..." bind:value={searchQuery} />
				</div>
				<button class="dt2-toolbar__btn">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
					Filter
				</button>
				<button class="dt2-toolbar__btn">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>
					Sort
				</button>
				<button class="dt2-toolbar__btn">
					<svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
					Columns
				</button>
			</div>
			<div class="dt2-toolbar__right">
				<div class="dt2-view-toggle">
					<button class="dt2-view-toggle__btn" class:dt2-view-toggle__btn--active={activeView === 'table'} onclick={() => activeView = 'table'}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M3 10h18M3 14h18M3 6h18v12H3z"/></svg>
					</button>
					<button class="dt2-view-toggle__btn" class:dt2-view-toggle__btn--active={activeView === 'grid'} onclick={() => activeView = 'grid'}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>
					</button>
					<button class="dt2-view-toggle__btn" class:dt2-view-toggle__btn--active={activeView === 'list'} onclick={() => activeView = 'list'}>
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
					</button>
				</div>
			</div>
		</div>

		<div class="dt2-table-wrap">
			<div class="dt2-sticky-hint">Sticky header active</div>
			<table class="dt2-table">
				<thead>
					<tr>
						<th class="dt2-th dt2-th--check"><span class="dt2-checkbox"></span></th>
						<th class="dt2-th">Name <span class="dt2-sort-arrow">&#9650;</span></th>
						<th class="dt2-th">Status</th>
						<th class="dt2-th">Assignee</th>
						<th class="dt2-th">Due Date</th>
						<th class="dt2-th dt2-th--num">Amount</th>
						<th class="dt2-th dt2-th--action"></th>
					</tr>
				</thead>
				<tbody>
					<tr class="dt2-row">
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox dt2-checkbox--checked"></span></td>
						<td class="dt2-td dt2-td--primary">Website Redesign</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--green">Active</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#6366f1;">AC</span> Alex Chen</span></td>
						<td class="dt2-td dt2-td--muted">Mar 15, 2026</td>
						<td class="dt2-td dt2-td--num">$12,400</td>
						<td class="dt2-td dt2-td--action"><span class="dt2-dots">&#8943;</span></td>
					</tr>
					<tr class="dt2-row">
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox"></span></td>
						<td class="dt2-td dt2-td--primary">API Integration</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--yellow">In Review</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#f59e0b;">SR</span> Sam Rivera</span></td>
						<td class="dt2-td dt2-td--muted">Apr 02, 2026</td>
						<td class="dt2-td dt2-td--num">$8,750</td>
						<td class="dt2-td dt2-td--action"><span class="dt2-dots">&#8943;</span></td>
					</tr>
					<tr class="dt2-row">
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox"></span></td>
						<td class="dt2-td dt2-td--primary">Database Migration</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--blue">Planning</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#22c55e;">JL</span> Jordan Lee</span></td>
						<td class="dt2-td dt2-td--muted">May 20, 2026</td>
						<td class="dt2-td dt2-td--num">$21,000</td>
						<td class="dt2-td dt2-td--action"><span class="dt2-dots">&#8943;</span></td>
					</tr>
					<tr class="dt2-row">
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox"></span></td>
						<td class="dt2-td dt2-td--primary">Auth Service v2</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--red">Blocked</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#ef4444;">TK</span> Taylor Kim</span></td>
						<td class="dt2-td dt2-td--muted">Feb 28, 2026</td>
						<td class="dt2-td dt2-td--num">$5,200</td>
						<td class="dt2-td dt2-td--action"><span class="dt2-dots">&#8943;</span></td>
					</tr>
					<tr class="dt2-row">
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox dt2-checkbox--checked"></span></td>
						<td class="dt2-td dt2-td--primary">Mobile App Launch</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--green">Active</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#a855f7;">MS</span> Morgan Singh</span></td>
						<td class="dt2-td dt2-td--muted">Jun 10, 2026</td>
						<td class="dt2-td dt2-td--num">$34,600</td>
						<td class="dt2-td dt2-td--action"><span class="dt2-dots">&#8943;</span></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="dt2-pagination">
			<span class="dt2-pagination__info">Showing 1-{perPage} of {totalItems}</span>
			<div class="dt2-pagination__pages">
				<button class="dt2-pagination__btn dt2-pagination__btn--disabled">&lsaquo;</button>
				<button class="dt2-pagination__btn dt2-pagination__btn--active" onclick={() => currentPage = 1}>1</button>
				<button class="dt2-pagination__btn" onclick={() => currentPage = 2}>2</button>
				<button class="dt2-pagination__btn" onclick={() => currentPage = 3}>3</button>
				<span class="dt2-pagination__ellipsis">...</span>
				<button class="dt2-pagination__btn" onclick={() => currentPage = 9}>9</button>
				<button class="dt2-pagination__btn">&rsaquo;</button>
			</div>
		</div>
	</div>

	<!-- ─── 2. Column Types ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Column Types</h3>
		<p class="ds-card__sub">Different cell renderers for various data types</p>

		<div class="dt2-table-wrap">
			<table class="dt2-table">
				<thead>
					<tr>
						<th class="dt2-th">Text</th>
						<th class="dt2-th dt2-th--num">Number</th>
						<th class="dt2-th">Status</th>
						<th class="dt2-th">User</th>
						<th class="dt2-th">Date</th>
						<th class="dt2-th">Progress</th>
						<th class="dt2-th">Rating</th>
						<th class="dt2-th">Link</th>
						<th class="dt2-th">Tags</th>
						<th class="dt2-th">Select</th>
					</tr>
				</thead>
				<tbody>
					<tr class="dt2-row">
						<td class="dt2-td">Project Alpha</td>
						<td class="dt2-td dt2-td--num">2,847</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--green">Active</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#6366f1;">AC</span> Alex Chen</span></td>
						<td class="dt2-td dt2-td--muted">Mar 6, 2026</td>
						<td class="dt2-td">
							<div class="dt2-progress"><div class="dt2-progress__bar" style="width:72%;background:#6366f1;"></div></div>
							<span class="dt2-progress__label">72%</span>
						</td>
						<td class="dt2-td"><span class="dt2-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span></td>
						<td class="dt2-td"><a class="dt2-link" href="#table">docs.miosa.dev</a></td>
						<td class="dt2-td">
							<span class="dt2-tag dt2-tag--purple">Svelte</span>
							<span class="dt2-tag dt2-tag--blue">TypeScript</span>
						</td>
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox dt2-checkbox--checked"></span></td>
					</tr>
					<tr class="dt2-row">
						<td class="dt2-td">API Gateway</td>
						<td class="dt2-td dt2-td--num">14,203</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--yellow">Pending</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#f59e0b;">SR</span> Sam Rivera</span></td>
						<td class="dt2-td dt2-td--muted">Feb 14, 2026</td>
						<td class="dt2-td">
							<div class="dt2-progress"><div class="dt2-progress__bar" style="width:45%;background:#f59e0b;"></div></div>
							<span class="dt2-progress__label">45%</span>
						</td>
						<td class="dt2-td"><span class="dt2-stars">&#9733;&#9733;&#9733;&#9734;&#9734;</span></td>
						<td class="dt2-td"><a class="dt2-link" href="#table">api.miosa.dev</a></td>
						<td class="dt2-td">
							<span class="dt2-tag dt2-tag--green">Go</span>
							<span class="dt2-tag dt2-tag--orange">REST</span>
						</td>
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox"></span></td>
					</tr>
					<tr class="dt2-row">
						<td class="dt2-td">ML Pipeline</td>
						<td class="dt2-td dt2-td--num">891</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--red">Error</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#ef4444;">TK</span> Taylor Kim</span></td>
						<td class="dt2-td dt2-td--muted">Jan 30, 2026</td>
						<td class="dt2-td">
							<div class="dt2-progress"><div class="dt2-progress__bar" style="width:18%;background:#ef4444;"></div></div>
							<span class="dt2-progress__label">18%</span>
						</td>
						<td class="dt2-td"><span class="dt2-stars">&#9733;&#9733;&#9734;&#9734;&#9734;</span></td>
						<td class="dt2-td"><a class="dt2-link" href="#table">ml.miosa.dev</a></td>
						<td class="dt2-td">
							<span class="dt2-tag dt2-tag--yellow">Python</span>
						</td>
						<td class="dt2-td dt2-td--check"><span class="dt2-checkbox"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- ─── 3. Filter Builder ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Filter Builder</h3>
		<p class="ds-card__sub">Advanced filter UI with field/operator/value rows, groups, and applied filter chips</p>

		<!-- Applied filter chips -->
		<div class="dt2-filter-chips">
			{#each appliedFilters as chip, i}
				<span class="dt2-filter-chip">
					{chip}
					<button class="dt2-filter-chip__remove" onclick={() => { appliedFilters = appliedFilters.filter((_, idx) => idx !== i); }}>&times;</button>
				</span>
			{/each}
		</div>

		<div class="dt2-filter-builder">
			<div class="dt2-filter-group">
				<div class="dt2-filter-conjunction">
					<button class="dt2-conj-btn" class:dt2-conj-btn--active={filterConjunction === 'AND'} onclick={() => filterConjunction = 'AND'}>AND</button>
					<button class="dt2-conj-btn" class:dt2-conj-btn--active={filterConjunction === 'OR'} onclick={() => filterConjunction = 'OR'}>OR</button>
				</div>

				<div class="dt2-filter-row">
					<select class="dt2-filter-select">
						<option>Status</option>
						<option>Priority</option>
						<option>Assignee</option>
						<option>Due Date</option>
						<option>Amount</option>
					</select>
					<select class="dt2-filter-select">
						<option>is</option>
						<option>is not</option>
						<option>contains</option>
						<option>starts with</option>
						<option>is empty</option>
					</select>
					<input class="dt2-filter-input" type="text" value="Active" />
					<button class="dt2-filter-remove">&times;</button>
				</div>

				<div class="dt2-filter-row">
					<select class="dt2-filter-select">
						<option>Priority</option>
						<option>Status</option>
						<option>Assignee</option>
						<option>Due Date</option>
						<option>Amount</option>
					</select>
					<select class="dt2-filter-select">
						<option>is</option>
						<option>is not</option>
						<option>contains</option>
						<option>starts with</option>
					</select>
					<input class="dt2-filter-input" type="text" value="High" />
					<button class="dt2-filter-remove">&times;</button>
				</div>

				<div class="dt2-filter-row">
					<select class="dt2-filter-select">
						<option>Assignee</option>
						<option>Status</option>
						<option>Priority</option>
						<option>Due Date</option>
					</select>
					<select class="dt2-filter-select">
						<option>contains</option>
						<option>is</option>
						<option>is not</option>
					</select>
					<input class="dt2-filter-input" type="text" placeholder="Enter value..." />
					<button class="dt2-filter-remove">&times;</button>
				</div>
			</div>

			<button class="dt2-filter-add">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M12 5v14m-7-7h14"/></svg>
				Add filter
			</button>
		</div>
	</div>

	<!-- ─── 4. Row Expand ─────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Row Expand</h3>
		<p class="ds-card__sub">Click a row to reveal a detail panel with tabs</p>

		<div class="dt2-table-wrap">
			<table class="dt2-table">
				<thead>
					<tr>
						<th class="dt2-th dt2-th--expand"></th>
						<th class="dt2-th">Project</th>
						<th class="dt2-th">Status</th>
						<th class="dt2-th">Owner</th>
						<th class="dt2-th dt2-th--num">Budget</th>
					</tr>
				</thead>
				<tbody>
					<!-- Row 1 -->
					<tr class="dt2-row dt2-row--expandable" class:dt2-row--expanded={expandedRow === 0} onclick={() => expandedRow = expandedRow === 0 ? null : 0}>
						<td class="dt2-td"><span class="dt2-expand-icon" class:dt2-expand-icon--open={expandedRow === 0}>&#9654;</span></td>
						<td class="dt2-td dt2-td--primary">Design System v3</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--green">Active</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#6366f1;">AC</span> Alex Chen</span></td>
						<td class="dt2-td dt2-td--num">$48,000</td>
					</tr>
					{#if expandedRow === 0}
						<tr class="dt2-row-detail">
							<td colspan="5" class="dt2-td-detail">
								<div class="dt2-detail-tabs">
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'details'} onclick={() => expandTab = 'details'}>Details</button>
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'activity'} onclick={() => expandTab = 'activity'}>Activity</button>
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'files'} onclick={() => expandTab = 'files'}>Files</button>
								</div>
								<div class="dt2-detail-grid">
									<div class="dt2-detail-field"><span class="dt2-detail-label">Created</span><span class="dt2-detail-value">Jan 12, 2026</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Deadline</span><span class="dt2-detail-value">Jun 30, 2026</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Priority</span><span class="dt2-detail-value"><span class="dt2-badge dt2-badge--red">Critical</span></span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Team Size</span><span class="dt2-detail-value">6 members</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Sprint</span><span class="dt2-detail-value">Sprint 14</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Repository</span><span class="dt2-detail-value"><a class="dt2-link" href="#table">github.com/miosa/ds</a></span></div>
								</div>
							</td>
						</tr>
					{/if}

					<!-- Row 2 (expanded by default) -->
					<tr class="dt2-row dt2-row--expandable" class:dt2-row--expanded={expandedRow === 1} onclick={() => expandedRow = expandedRow === 1 ? null : 1}>
						<td class="dt2-td"><span class="dt2-expand-icon" class:dt2-expand-icon--open={expandedRow === 1}>&#9654;</span></td>
						<td class="dt2-td dt2-td--primary">Mobile App Rewrite</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--yellow">In Review</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#f59e0b;">SR</span> Sam Rivera</span></td>
						<td class="dt2-td dt2-td--num">$72,500</td>
					</tr>
					{#if expandedRow === 1}
						<tr class="dt2-row-detail">
							<td colspan="5" class="dt2-td-detail">
								<div class="dt2-detail-tabs">
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'details'} onclick={() => expandTab = 'details'}>Details</button>
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'activity'} onclick={() => expandTab = 'activity'}>Activity</button>
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'files'} onclick={() => expandTab = 'files'}>Files</button>
								</div>
								<div class="dt2-detail-grid">
									<div class="dt2-detail-field"><span class="dt2-detail-label">Created</span><span class="dt2-detail-value">Nov 5, 2025</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Deadline</span><span class="dt2-detail-value">Apr 15, 2026</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Priority</span><span class="dt2-detail-value"><span class="dt2-badge dt2-badge--yellow">High</span></span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Team Size</span><span class="dt2-detail-value">4 members</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Sprint</span><span class="dt2-detail-value">Sprint 11</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Repository</span><span class="dt2-detail-value"><a class="dt2-link" href="#table">github.com/miosa/mobile</a></span></div>
								</div>
							</td>
						</tr>
					{/if}

					<!-- Row 3 -->
					<tr class="dt2-row dt2-row--expandable" class:dt2-row--expanded={expandedRow === 2} onclick={() => expandedRow = expandedRow === 2 ? null : 2}>
						<td class="dt2-td"><span class="dt2-expand-icon" class:dt2-expand-icon--open={expandedRow === 2}>&#9654;</span></td>
						<td class="dt2-td dt2-td--primary">CI/CD Overhaul</td>
						<td class="dt2-td"><span class="dt2-badge dt2-badge--blue">Planning</span></td>
						<td class="dt2-td"><span class="dt2-user"><span class="dt2-avatar" style="background:#22c55e;">JL</span> Jordan Lee</span></td>
						<td class="dt2-td dt2-td--num">$15,000</td>
					</tr>
					{#if expandedRow === 2}
						<tr class="dt2-row-detail">
							<td colspan="5" class="dt2-td-detail">
								<div class="dt2-detail-tabs">
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'details'} onclick={() => expandTab = 'details'}>Details</button>
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'activity'} onclick={() => expandTab = 'activity'}>Activity</button>
									<button class="dt2-detail-tab" class:dt2-detail-tab--active={expandTab === 'files'} onclick={() => expandTab = 'files'}>Files</button>
								</div>
								<div class="dt2-detail-grid">
									<div class="dt2-detail-field"><span class="dt2-detail-label">Created</span><span class="dt2-detail-value">Feb 20, 2026</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Deadline</span><span class="dt2-detail-value">Aug 1, 2026</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Priority</span><span class="dt2-detail-value"><span class="dt2-badge dt2-badge--green">Medium</span></span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Team Size</span><span class="dt2-detail-value">3 members</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Sprint</span><span class="dt2-detail-value">Sprint 16</span></div>
									<div class="dt2-detail-field"><span class="dt2-detail-label">Repository</span><span class="dt2-detail-value"><a class="dt2-link" href="#table">github.com/miosa/infra</a></span></div>
								</div>
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ─── 5. Template Gallery ───────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Template Gallery</h3>
		<p class="ds-card__sub">Pre-built table templates to get started quickly</p>

		<div class="dt2-templates">
			<button class="dt2-template-card" class:dt2-template-card--selected={selectedTemplate === 'project'} onclick={() => selectedTemplate = selectedTemplate === 'project' ? null : 'project'}>
				<div class="dt2-template-icon" style="background:rgba(99,102,241,0.12);color:#818cf8;">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
				</div>
				<span class="dt2-template-category">Project</span>
				<span class="dt2-template-name">Project Tracker</span>
				<span class="dt2-template-desc">Tasks, milestones, owners, deadlines, and status tracking</span>
				<span class="dt2-template-meta">12 columns</span>
				<span class="dt2-template-action">Use Template</span>
			</button>

			<button class="dt2-template-card" class:dt2-template-card--selected={selectedTemplate === 'crm'} onclick={() => selectedTemplate = selectedTemplate === 'crm' ? null : 'crm'}>
				<div class="dt2-template-icon" style="background:rgba(34,197,94,0.12);color:#4ade80;">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
				</div>
				<span class="dt2-template-category">CRM</span>
				<span class="dt2-template-name">Sales Pipeline</span>
				<span class="dt2-template-desc">Contacts, deals, stages, revenue, and follow-ups</span>
				<span class="dt2-template-meta">10 columns</span>
				<span class="dt2-template-action">Use Template</span>
			</button>

			<button class="dt2-template-card" class:dt2-template-card--selected={selectedTemplate === 'inventory'} onclick={() => selectedTemplate = selectedTemplate === 'inventory' ? null : 'inventory'}>
				<div class="dt2-template-icon" style="background:rgba(249,115,22,0.12);color:#fb923c;">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
				</div>
				<span class="dt2-template-category">Inventory</span>
				<span class="dt2-template-name">Stock Manager</span>
				<span class="dt2-template-desc">Products, SKUs, quantities, suppliers, and reorder levels</span>
				<span class="dt2-template-meta">14 columns</span>
				<span class="dt2-template-action">Use Template</span>
			</button>

			<button class="dt2-template-card" class:dt2-template-card--selected={selectedTemplate === 'hr'} onclick={() => selectedTemplate = selectedTemplate === 'hr' ? null : 'hr'}>
				<div class="dt2-template-icon" style="background:rgba(236,72,153,0.12);color:#f472b6;">
					<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
				</div>
				<span class="dt2-template-category">HR</span>
				<span class="dt2-template-name">Employee Directory</span>
				<span class="dt2-template-desc">People, departments, roles, start dates, and reviews</span>
				<span class="dt2-template-meta">11 columns</span>
				<span class="dt2-template-action">Use Template</span>
			</button>
		</div>
	</div>
</section>

<style>
	/* ── Toolbar ─────────────────────────────────────────────────── */
	.dt2-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 10px 0 14px;
		flex-wrap: wrap;
	}
	.dt2-toolbar__left {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.dt2-toolbar__right {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.dt2-search {
		position: relative;
		display: flex;
		align-items: center;
	}
	.dt2-search__icon {
		position: absolute;
		left: 10px;
		color: var(--dt3);
		pointer-events: none;
	}
	.dt2-search__input {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 7px 10px 7px 30px;
		color: var(--dt);
		font-size: 12px;
		width: 200px;
		outline: none;
		transition: border-color 0.15s;
	}
	.dt2-search__input:focus {
		border-color: var(--dbd2);
	}
	.dt2-search__input::placeholder {
		color: var(--dt3);
	}
	.dt2-toolbar__btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 7px;
		padding: 7px 12px;
		color: var(--dt2);
		font-size: 12px;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.dt2-toolbar__btn:hover {
		background: var(--dbg3);
		border-color: var(--dbd2);
	}

	/* ── View Toggle ─────────────────────────────────────────────── */
	.dt2-view-toggle {
		display: flex;
		border: 1px solid var(--dbd);
		border-radius: 7px;
		overflow: hidden;
	}
	.dt2-view-toggle__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 30px;
		background: var(--dbg2);
		border: none;
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.dt2-view-toggle__btn:not(:last-child) {
		border-right: 1px solid var(--dbd);
	}
	.dt2-view-toggle__btn:hover {
		background: var(--dbg3);
		color: var(--dt2);
	}
	.dt2-view-toggle__btn--active {
		background: var(--dbg3);
		color: var(--dt);
	}

	/* ── Table Wrapper ───────────────────────────────────────────── */
	.dt2-table-wrap {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		background: var(--dbg);
		position: relative;
	}
	.dt2-sticky-hint {
		position: absolute;
		top: 0;
		right: 12px;
		font-size: 9px;
		color: var(--dt3);
		background: var(--dbg2);
		padding: 2px 8px;
		border-radius: 0 0 5px 5px;
		border: 1px solid var(--dbd);
		border-top: none;
		opacity: 0.6;
	}

	/* ── Table ───────────────────────────────────────────────────── */
	.dt2-table {
		width: 100%;
		border-collapse: collapse;
		table-layout: auto;
	}
	.dt2-th {
		text-align: left;
		padding: 11px 16px;
		color: var(--dt2);
		font-weight: 500;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		white-space: nowrap;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		user-select: none;
	}
	.dt2-th--num {
		text-align: right;
	}
	.dt2-th--check {
		width: 40px;
		text-align: center;
	}
	.dt2-th--action {
		width: 40px;
	}
	.dt2-th--expand {
		width: 36px;
	}
	.dt2-sort-arrow {
		font-size: 8px;
		color: var(--dt3);
		margin-left: 4px;
	}
	.dt2-td {
		padding: 12px 16px;
		color: var(--dt);
		font-size: 13px;
		border-bottom: 1px solid var(--dbd);
	}
	.dt2-td--primary {
		font-weight: 500;
		color: var(--dt);
	}
	.dt2-td--muted {
		color: var(--dt3);
		font-size: 12px;
	}
	.dt2-td--num {
		text-align: right;
		font-variant-numeric: tabular-nums;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 12px;
	}
	.dt2-td--check {
		text-align: center;
		width: 40px;
	}
	.dt2-td--action {
		text-align: center;
		width: 40px;
	}

	/* ── Row ──────────────────────────────────────────────────────── */
	.dt2-row {
		transition: background 0.12s;
	}
	.dt2-row:hover {
		background: var(--dbg2);
	}
	.dt2-row:last-child .dt2-td {
		border-bottom: none;
	}
	.dt2-row--expandable {
		cursor: pointer;
	}
	.dt2-row--expanded {
		background: var(--dbg2);
	}

	/* ── Checkbox ────────────────────────────────────────────────── */
	.dt2-checkbox {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 1.5px solid var(--dbd2);
		border-radius: 4px;
		background: transparent;
		vertical-align: middle;
		position: relative;
		transition: border-color 0.15s, background 0.15s;
	}
	.dt2-checkbox--checked {
		background: #6366f1;
		border-color: #6366f1;
	}
	.dt2-checkbox--checked::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 5px;
		width: 4px;
		height: 8px;
		border: solid #fff;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	/* ── Badge ───────────────────────────────────────────────────── */
	.dt2-badge {
		display: inline-block;
		padding: 3px 10px;
		border-radius: 99px;
		font-size: 11px;
		font-weight: 500;
		white-space: nowrap;
	}
	.dt2-badge--green {
		background: rgba(34, 197, 94, 0.12);
		color: #4ade80;
	}
	.dt2-badge--yellow {
		background: rgba(234, 179, 8, 0.12);
		color: #facc15;
	}
	.dt2-badge--red {
		background: rgba(239, 68, 68, 0.12);
		color: #f87171;
	}
	.dt2-badge--blue {
		background: rgba(59, 130, 246, 0.12);
		color: #60a5fa;
	}

	/* ── User Cell ───────────────────────────────────────────────── */
	.dt2-user {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
	}
	.dt2-avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		font-size: 10px;
		font-weight: 600;
		color: #fff;
		flex-shrink: 0;
	}

	/* ── Action Dots ─────────────────────────────────────────────── */
	.dt2-dots {
		color: var(--dt3);
		font-size: 16px;
		cursor: pointer;
		padding: 2px 4px;
		border-radius: 4px;
		transition: color 0.15s, background 0.15s;
	}
	.dt2-dots:hover {
		color: var(--dt);
		background: var(--dbg3);
	}

	/* ── Pagination ──────────────────────────────────────────────── */
	.dt2-pagination {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0 4px;
	}
	.dt2-pagination__info {
		color: var(--dt3);
		font-size: 12px;
	}
	.dt2-pagination__pages {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.dt2-pagination__btn {
		min-width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		border-radius: 6px;
		background: transparent;
		color: var(--dt2);
		font-size: 12px;
		cursor: pointer;
		transition: background 0.12s, border-color 0.12s;
	}
	.dt2-pagination__btn:hover:not(.dt2-pagination__btn--disabled) {
		background: var(--dbg2);
		border-color: var(--dbd);
	}
	.dt2-pagination__btn--active {
		background: var(--dbg3);
		border-color: var(--dbd2);
		color: var(--dt);
		font-weight: 600;
	}
	.dt2-pagination__btn--disabled {
		color: var(--dt3);
		opacity: 0.4;
		cursor: default;
	}
	.dt2-pagination__ellipsis {
		color: var(--dt3);
		font-size: 12px;
		padding: 0 4px;
	}

	/* ── Progress Cell ───────────────────────────────────────────── */
	.dt2-progress {
		width: 60px;
		height: 6px;
		background: var(--dbg3);
		border-radius: 3px;
		overflow: hidden;
		display: inline-block;
		vertical-align: middle;
	}
	.dt2-progress__bar {
		height: 100%;
		border-radius: 3px;
		transition: width 0.3s;
	}
	.dt2-progress__label {
		color: var(--dt3);
		font-size: 11px;
		margin-left: 6px;
	}

	/* ── Stars ───────────────────────────────────────────────────── */
	.dt2-stars {
		color: #f59e0b;
		font-size: 13px;
		letter-spacing: 1px;
	}

	/* ── Link Cell ───────────────────────────────────────────────── */
	.dt2-link {
		color: #60a5fa;
		font-size: 12px;
		text-decoration: underline;
		text-underline-offset: 2px;
		cursor: pointer;
	}
	.dt2-link:hover {
		color: #93bbfd;
	}

	/* ── Tags ────────────────────────────────────────────────────── */
	.dt2-tag {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 500;
		margin-right: 4px;
	}
	.dt2-tag--purple {
		background: rgba(139, 92, 246, 0.14);
		color: #a78bfa;
	}
	.dt2-tag--blue {
		background: rgba(59, 130, 246, 0.14);
		color: #60a5fa;
	}
	.dt2-tag--green {
		background: rgba(34, 197, 94, 0.14);
		color: #4ade80;
	}
	.dt2-tag--orange {
		background: rgba(249, 115, 22, 0.14);
		color: #fb923c;
	}
	.dt2-tag--yellow {
		background: rgba(234, 179, 8, 0.14);
		color: #facc15;
	}

	/* ── Filter Chips (applied) ──────────────────────────────────── */
	.dt2-filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding-bottom: 12px;
	}
	.dt2-filter-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.25);
		border-radius: 6px;
		color: #a5b4fc;
		font-size: 11px;
		font-weight: 500;
	}
	.dt2-filter-chip__remove {
		background: none;
		border: none;
		color: #a5b4fc;
		cursor: pointer;
		font-size: 14px;
		line-height: 1;
		padding: 0;
		opacity: 0.6;
		transition: opacity 0.15s;
	}
	.dt2-filter-chip__remove:hover {
		opacity: 1;
	}

	/* ── Filter Builder ──────────────────────────────────────────── */
	.dt2-filter-builder {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		padding: 14px;
	}
	.dt2-filter-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.dt2-filter-conjunction {
		display: flex;
		gap: 0;
		margin-bottom: 4px;
	}
	.dt2-conj-btn {
		padding: 4px 12px;
		border: 1px solid var(--dbd);
		background: transparent;
		color: var(--dt3);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.05em;
		cursor: pointer;
		transition: background 0.12s, color 0.12s, border-color 0.12s;
	}
	.dt2-conj-btn:first-child {
		border-radius: 5px 0 0 5px;
	}
	.dt2-conj-btn:last-child {
		border-radius: 0 5px 5px 0;
		border-left: none;
	}
	.dt2-conj-btn--active {
		background: rgba(99, 102, 241, 0.15);
		color: #a5b4fc;
		border-color: rgba(99, 102, 241, 0.3);
	}
	.dt2-filter-row {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.dt2-filter-select {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 6px 10px;
		color: var(--dt);
		font-size: 12px;
		outline: none;
		min-width: 110px;
		cursor: pointer;
	}
	.dt2-filter-select:focus {
		border-color: var(--dbd2);
	}
	.dt2-filter-input {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		padding: 6px 10px;
		color: var(--dt);
		font-size: 12px;
		flex: 1;
		min-width: 100px;
		outline: none;
	}
	.dt2-filter-input:focus {
		border-color: var(--dbd2);
	}
	.dt2-filter-input::placeholder {
		color: var(--dt3);
	}
	.dt2-filter-remove {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 6px;
		color: var(--dt3);
		font-size: 16px;
		cursor: pointer;
		transition: background 0.12s, color 0.12s;
		flex-shrink: 0;
	}
	.dt2-filter-remove:hover {
		background: rgba(239, 68, 68, 0.1);
		color: #f87171;
	}
	.dt2-filter-add {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: transparent;
		border: 1px dashed var(--dbd);
		border-radius: 7px;
		padding: 7px 14px;
		color: var(--dt3);
		font-size: 12px;
		cursor: pointer;
		margin-top: 8px;
		transition: background 0.12s, color 0.12s, border-color 0.12s;
	}
	.dt2-filter-add:hover {
		background: var(--dbg2);
		color: var(--dt2);
		border-color: var(--dbd2);
	}

	/* ── Expand Icon ─────────────────────────────────────────────── */
	.dt2-expand-icon {
		display: inline-block;
		font-size: 10px;
		color: var(--dt3);
		transition: transform 0.2s;
	}
	.dt2-expand-icon--open {
		transform: rotate(90deg);
		color: var(--dt2);
	}

	/* ── Row Detail Panel ────────────────────────────────────────── */
	.dt2-row-detail {
		background: var(--dbg2);
	}
	.dt2-td-detail {
		padding: 0 16px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.dt2-detail-tabs {
		display: flex;
		gap: 2px;
		padding: 10px 0 14px;
		border-bottom: 1px solid var(--dbd);
		margin-bottom: 14px;
	}
	.dt2-detail-tab {
		padding: 5px 14px;
		border: none;
		border-radius: 6px;
		background: transparent;
		color: var(--dt3);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.12s, color 0.12s;
	}
	.dt2-detail-tab:hover {
		background: var(--dbg3);
		color: var(--dt2);
	}
	.dt2-detail-tab--active {
		background: var(--dbg3);
		color: var(--dt);
	}
	.dt2-detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px 24px;
	}
	.dt2-detail-field {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.dt2-detail-label {
		color: var(--dt3);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 500;
	}
	.dt2-detail-value {
		color: var(--dt);
		font-size: 13px;
	}

	/* ── Template Gallery ────────────────────────────────────────── */
	.dt2-templates {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
		gap: 12px;
	}
	.dt2-template-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		padding: 16px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.15s, background 0.15s;
	}
	.dt2-template-card:hover {
		border-color: var(--dbd2);
		background: var(--dbg3);
	}
	.dt2-template-card--selected {
		border-color: rgba(99, 102, 241, 0.5);
		background: rgba(99, 102, 241, 0.04);
	}
	.dt2-template-icon {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		margin-bottom: 2px;
	}
	.dt2-template-category {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
	}
	.dt2-template-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
	}
	.dt2-template-desc {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.4;
	}
	.dt2-template-meta {
		font-size: 11px;
		color: var(--dt3);
		opacity: 0.7;
	}
	.dt2-template-action {
		display: inline-block;
		margin-top: 4px;
		padding: 4px 12px;
		border-radius: 6px;
		background: rgba(99, 102, 241, 0.1);
		color: #a5b4fc;
		font-size: 11px;
		font-weight: 500;
		transition: background 0.15s;
	}
	.dt2-template-card:hover .dt2-template-action {
		background: rgba(99, 102, 241, 0.2);
	}
</style>
