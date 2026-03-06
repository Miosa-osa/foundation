<script lang="ts">
	type JobStatus = 'queued' | 'running' | 'paused' | 'complete' | 'failed';
	type OrderStatus = 'pending' | 'generating' | 'awaiting_approval' | 'complete' | 'failed';

	// ── Batch Job Creator state ────────────────────────────────────
	let jobName = $state('Spring Fashion Campaign');
	let jobType = $state<'image' | 'video'>('image');
	let jobCharacter = $state('Aria');
	let jobModel = $state('flux-pro');
	let jobRatio = $state('4:3');
	let jobRefToggle = $state(false);
	let jobPrompts = $state('Aria in a sunlit cafe, golden hour, editorial fashion\nAria walking through Tokyo streets, neon signs, cinematic\nAria on rooftop at sunset, luxury fashion, moody atmosphere\nAria in a botanical garden, natural light, lifestyle photography\nAria in minimalist studio, white background, commercial fashion');

	const imageModels = ['Flux Pro', 'FLUX 2 Max', 'FLUX Kontext Pro', 'Seedream 3', 'NanoBanana Pro'];
	const videoModels = ['Veo 3', 'Sora 2 Pro', 'Runway Gen-3', 'Kling', 'Luma Dream Machine'];
	const characters = ['Aria', 'Nova', 'Zara', 'Luna', 'Sage'];
	const imageRatios = ['1:1', '4:3', '3:4', '16:9', '9:16'];
	const videoRatios = ['16:9', '9:16', '1:1', '4:3'];

	let activeModels = $derived(jobType === 'image' ? imageModels : videoModels);
	let activeRatios = $derived(jobType === 'image' ? imageRatios : videoRatios);

	let promptLines = $derived(jobPrompts.split('\n').filter(l => l.trim()).length);
	let costEstimate = $derived((promptLines * (jobType === 'image' ? 0.08 : 0.45)).toFixed(2));

	// ── Batch Jobs Dashboard state ─────────────────────────────────
	const batchJobs: {
		id: string; name: string; type: 'image' | 'video';
		character: string; model: string; total: number; done: number;
		status: JobStatus; created: string;
	}[] = [
		{ id: 'bj1', name: 'Spring Fashion Campaign', type: 'image', character: 'Aria',  model: 'Flux Pro',        total: 20, done: 13, status: 'running',  created: '2h ago' },
		{ id: 'bj2', name: 'Lifestyle Video Series',  type: 'video', character: 'Nova',  model: 'Runway Gen-3',    total: 8,  done: 8,  status: 'complete', created: '5h ago' },
		{ id: 'bj3', name: 'Tokyo Street Shoot',      type: 'image', character: 'Zara',  model: 'Seedream 3',      total: 15, done: 0,  status: 'queued',   created: '1d ago' },
		{ id: 'bj4', name: 'Brand Reel Collection',   type: 'video', character: 'Aria',  model: 'Veo 3',           total: 5,  done: 2,  status: 'paused',   created: '2d ago' },
		{ id: 'bj5', name: 'Product Showcase',        type: 'image', character: 'Luna',  model: 'FLUX Kontext Pro', total: 12, done: 4,  status: 'failed',   created: '3d ago' },
	];

	const jobStatusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
		queued:   { label: 'Queued',   color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
		running:  { label: 'Running',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
		paused:   { label: 'Paused',   color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
		complete: { label: 'Complete', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
		failed:   { label: 'Failed',   color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
	};

	// ── Orders state ───────────────────────────────────────────────
	let orderFilter = $state<'all' | 'pending' | 'generating' | 'awaiting_approval' | 'complete' | 'failed'>('all');
	let selectedOrder = $state<string | null>('ord1');

	const orders: {
		id: string; name: string; status: OrderStatus;
		items: number; character: string; created: string; cost: string;
	}[] = [
		{ id: 'ord1', name: 'Campaign Pack #47',    status: 'awaiting_approval', items: 12, character: 'Aria', created: 'Today 2:14pm', cost: '$4.20' },
		{ id: 'ord2', name: 'Nova Brand Set',        status: 'generating',        items: 8,  character: 'Nova', created: 'Today 11:30am', cost: '$2.80' },
		{ id: 'ord3', name: 'Lifestyle March Batch', status: 'complete',          items: 24, character: 'Zara', created: 'Yesterday',    cost: '$8.64' },
		{ id: 'ord4', name: 'Studio Portraits Q1',   status: 'pending',           items: 6,  character: 'Luna', created: 'Mar 4',        cost: '$2.16' },
		{ id: 'ord5', name: 'Tokyo Collab Series',   status: 'failed',            items: 10, character: 'Aria', created: 'Mar 3',        cost: '$3.50' },
	];

	const orderItems = [
		{ id: 1, prompt: 'Aria in golden hour sunlight, editorial fashion, cinematic', approved: true },
		{ id: 2, prompt: 'Aria walking Tokyo streets at night, neon bokeh, moody', approved: false },
		{ id: 3, prompt: 'Aria on rooftop, luxury brand, dramatic sky', approved: true },
		{ id: 4, prompt: 'Aria in minimalist studio, white backdrop, commercial', approved: null },
		{ id: 5, prompt: 'Aria at botanical garden, soft natural light, lifestyle', approved: null },
		{ id: 6, prompt: 'Aria beachside at sunrise, warm tones, travel influencer', approved: null },
	];

	let approvalState = $state<Record<number, boolean | null>>(
		Object.fromEntries(orderItems.map(i => [i.id, i.approved]))
	);

	const orderStatusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
		pending:           { label: 'Pending',           color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
		generating:        { label: 'Generating',        color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
		awaiting_approval: { label: 'Awaiting Approval', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
		complete:          { label: 'Complete',          color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
		failed:            { label: 'Failed',            color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
	};

	let filteredOrders = $derived(
		orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)
	);

	let selectedOrderData = $derived(orders.find(o => o.id === selectedOrder));

	const orderWorkflowSteps: OrderStatus[] = ['pending', 'generating', 'awaiting_approval', 'complete'];

	function workflowStepIdx(status: OrderStatus) {
		return orderWorkflowSteps.indexOf(status);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">ContentOS Batch &amp; Orders</h2>
	<p class="ds-desc">Batch job creation, job dashboard with live progress, and an order management system with per-item approval workflow.</p>

	<!-- ═══ 1. BATCH JOB CREATOR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Batch Job Creator</h3>
		<p class="ds-card__sub">Create bulk generation jobs — set type, character, model, aspect ratio, and enter one prompt per line.</p>

		<div class="cob-creator-layout">
			<div class="cob-creator-form">
				<!-- Job name -->
				<div class="cob-field">
					<label class="cob-label" for="cob-job-name">Job Name</label>
					<input id="cob-job-name" class="cob-input" type="text" bind:value={jobName} placeholder="e.g. Spring Campaign, Tokyo Shoot…" aria-label="Job name" />
				</div>

				<!-- Type toggle -->
				<div class="cob-field">
					<label class="cob-label">Generation Type</label>
					<div class="cob-seg">
						{#each (['image', 'video'] as const) as t}
							<button
								class="cob-seg-btn"
								class:cob-seg-btn--active={jobType === t}
								onclick={() => { jobType = t; jobModel = activeModels[0]; jobRatio = activeRatios[0]; }}
								aria-pressed={jobType === t}
							>
								{#if t === 'image'}
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
								{:else}
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
								{/if}
								{t.charAt(0).toUpperCase() + t.slice(1)}
							</button>
						{/each}
					</div>
				</div>

				<div class="cob-row">
					<!-- Character -->
					<div class="cob-field">
						<label class="cob-label" for="cob-character">Character</label>
						<select id="cob-character" class="cob-select" bind:value={jobCharacter} aria-label="Select character">
							{#each characters as c}<option value={c}>{c}</option>{/each}
						</select>
					</div>

					<!-- Model -->
					<div class="cob-field">
						<label class="cob-label" for="cob-model">Model</label>
						<select id="cob-model" class="cob-select" bind:value={jobModel} aria-label="Select model">
							{#each activeModels as m}<option value={m}>{m}</option>{/each}
						</select>
					</div>
				</div>

				<div class="cob-row">
					<!-- Aspect ratio -->
					<div class="cob-field">
						<label class="cob-label">Aspect Ratio</label>
						<div class="cob-pills">
							{#each activeRatios as r}
								<button class="cob-pill" class:cob-pill--active={jobRatio === r} onclick={() => jobRatio = r}>{r}</button>
							{/each}
						</div>
					</div>

					<!-- Reference -->
					<div class="cob-field">
						<label class="cob-label">Character Ref</label>
						<button
							class="cob-toggle"
							class:cob-toggle--on={jobRefToggle}
							onclick={() => jobRefToggle = !jobRefToggle}
							aria-pressed={jobRefToggle}
						>
							<span class="cob-toggle-knob"></span>
							<span>{jobRefToggle ? 'Enabled' : 'Disabled'}</span>
						</button>
					</div>
				</div>

				<!-- Prompt list -->
				<div class="cob-field">
					<div class="cob-field-row">
						<label class="cob-label" for="cob-prompts">Prompts <span class="cob-label-hint">(one per line)</span></label>
						<span class="cob-line-count">{promptLines} prompt{promptLines !== 1 ? 's' : ''}</span>
					</div>
					<textarea
						id="cob-prompts"
						class="cob-textarea"
						bind:value={jobPrompts}
						rows="6"
						placeholder="Enter one prompt per line…&#10;e.g. Aria in golden hour, editorial fashion&#10;Aria on rooftop at sunset, dramatic sky"
					></textarea>
				</div>

				<!-- Create + Cost -->
				<div class="cob-submit-row">
					<button class="btn-pill btn-pill-primary cob-create-btn" disabled={!jobName.trim() || promptLines === 0} aria-label="Create batch job">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
						Create Batch Job
					</button>
					<div class="cob-cost-estimate">
						<span class="cob-cost-label">Estimated cost</span>
						<span class="cob-cost-value">${costEstimate}</span>
						<span class="cob-cost-detail">{promptLines} × {jobType === 'image' ? '$0.08' : '$0.45'}</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 2. BATCH JOBS DASHBOARD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Batch Jobs Dashboard</h3>
		<p class="ds-card__sub">Live job list with progress bars, status badges, and Pause / Resume / Cancel / View Results actions.</p>

		<div class="cob-jobs-list">
			{#each batchJobs as job}
				{@const cfg = jobStatusConfig[job.status]}
				{@const pct = Math.round((job.done / job.total) * 100)}
				<div class="cob-job-row">
					<div class="cob-job-left">
						<div class="cob-job-type-icon" aria-hidden="true">
							{#if job.type === 'image'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
							{:else}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
							{/if}
						</div>
						<div class="cob-job-info">
							<div class="cob-job-header">
								<span class="cob-job-name">{job.name}</span>
								<span class="cob-job-status-badge" style="color:{cfg.color};background:{cfg.bg}">{cfg.label}</span>
							</div>
							<div class="cob-job-meta">
								<span>{job.character}</span>
								<span class="cob-meta-sep">·</span>
								<span>{job.model}</span>
								<span class="cob-meta-sep">·</span>
								<span>{job.type}</span>
								<span class="cob-meta-sep">·</span>
								<span>{job.created}</span>
							</div>
							<div class="cob-job-progress-row">
								<div class="cob-progress-track">
									<div
										class="cob-progress-fill"
										style="width:{pct}%;background:{cfg.color}"
									></div>
								</div>
								<span class="cob-progress-label">{job.done}/{job.total}</span>
							</div>
						</div>
					</div>

					<div class="cob-job-actions">
						{#if job.status === 'running'}
							<button class="btn-compact btn-compact-ghost" aria-label="Pause job {job.name}">Pause</button>
						{/if}
						{#if job.status === 'paused'}
							<button class="btn-compact btn-compact-ghost" aria-label="Resume job {job.name}">Resume</button>
						{/if}
						{#if job.status === 'failed'}
							<button class="btn-compact btn-compact-danger" aria-label="Retry job {job.name}">Retry</button>
						{/if}
						{#if job.status !== 'complete'}
							<button class="btn-compact btn-compact-ghost" aria-label="Cancel job {job.name}">Cancel</button>
						{/if}
						{#if job.status === 'complete'}
							<button class="btn-compact btn-compact-primary" aria-label="View results for {job.name}">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
								View Results
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ 3. ORDERS SYSTEM ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Orders System</h3>
		<p class="ds-card__sub">Order lifecycle — Pending → Generating → Awaiting Approval → Complete/Failed — with per-item approve/reject actions.</p>

		<div class="cob-orders-layout">
			<!-- Left: order list -->
			<div class="cob-orders-sidebar">
				<div class="cob-orders-header">
					<span class="cob-orders-title">Orders</span>
					<button class="btn-compact btn-compact-ghost" aria-label="New order">
						<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
						New
					</button>
				</div>

				<!-- Status filter pills -->
				<div class="cob-order-filters">
					{#each ([
						['all', 'All'],
						['pending', 'Pending'],
						['generating', 'Generating'],
						['awaiting_approval', 'Approval'],
						['complete', 'Complete'],
						['failed', 'Failed'],
					] as [typeof orderFilter, string][]) as [id, label]}
						<button
							class="cob-filter-pill"
							class:cob-filter-pill--active={orderFilter === id}
							onclick={() => orderFilter = id}
						>{label}</button>
					{/each}
				</div>

				<div class="cob-order-list">
					{#each filteredOrders as ord}
						{@const cfg = orderStatusConfig[ord.status]}
						<button
							class="cob-order-item"
							class:cob-order-item--selected={selectedOrder === ord.id}
							onclick={() => selectedOrder = ord.id}
							aria-label="View order {ord.name}"
						>
							<div class="cob-order-item-header">
								<span class="cob-order-name">{ord.name}</span>
								<span class="cob-order-cost">{ord.cost}</span>
							</div>
							<div class="cob-order-item-meta">
								<span>{ord.character}</span>
								<span class="cob-meta-sep">·</span>
								<span>{ord.items} items</span>
							</div>
							<span class="cob-order-status-chip" style="color:{cfg.color};background:{cfg.bg}">{cfg.label}</span>
						</button>
					{/each}
					{#if filteredOrders.length === 0}
						<div class="cob-orders-empty">No orders</div>
					{/if}
				</div>
			</div>

			<!-- Right: order detail -->
			<div class="cob-order-detail">
				{#if selectedOrderData}
					{@const cfg = orderStatusConfig[selectedOrderData.status]}
					<!-- Header -->
					<div class="cob-detail-header">
						<div>
							<div class="cob-detail-name">{selectedOrderData.name}</div>
							<div class="cob-detail-meta">{selectedOrderData.character} · {selectedOrderData.items} items · {selectedOrderData.created}</div>
						</div>
						<span class="cob-detail-status" style="color:{cfg.color};background:{cfg.bg};border-color:{cfg.color}40">{cfg.label}</span>
					</div>

					<!-- Workflow steps -->
					{#if selectedOrderData.status !== 'failed'}
						<div class="cob-workflow">
							{#each orderWorkflowSteps as step, i}
								{@const currentIdx = workflowStepIdx(selectedOrderData.status)}
								{@const stepCfg = orderStatusConfig[step]}
								<div class="cob-workflow-step" class:cob-workflow-step--done={i < currentIdx} class:cob-workflow-step--active={i === currentIdx}>
									<div class="cob-workflow-dot">
										{#if i < currentIdx}
											<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
										{:else if i === currentIdx}
											<div class="cob-workflow-pulse" aria-hidden="true"></div>
										{/if}
									</div>
									<span class="cob-workflow-label">{stepCfg.label}</span>
								</div>
								{#if i < orderWorkflowSteps.length - 1}
									<div class="cob-workflow-line" class:cob-workflow-line--done={i < currentIdx}></div>
								{/if}
							{/each}
						</div>
					{:else}
						<div class="cob-failed-banner">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
							Order failed — some items could not be generated. Retry failed items or cancel.
						</div>
					{/if}

					<!-- Items grid -->
					<div class="cob-items-grid">
						{#each orderItems as item}
							<div class="cob-item-card" class:cob-item-card--approved={approvalState[item.id] === true} class:cob-item-card--rejected={approvalState[item.id] === false}>
								<div class="cob-item-thumb" aria-label="Generated image placeholder">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
									{#if approvalState[item.id] === true}
										<div class="cob-item-status-overlay cob-item-status-overlay--approved" aria-hidden="true">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
										</div>
									{:else if approvalState[item.id] === false}
										<div class="cob-item-status-overlay cob-item-status-overlay--rejected" aria-hidden="true">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
										</div>
									{/if}
								</div>
								<div class="cob-item-body">
									<p class="cob-item-prompt">{item.prompt}</p>
									{#if selectedOrderData.status === 'awaiting_approval'}
										<div class="cob-item-approve-row">
											<button
												class="btn-compact btn-compact-success cob-approve-btn"
												class:cob-approve-btn--active={approvalState[item.id] === true}
												onclick={() => approvalState = {...approvalState, [item.id]: true}}
												aria-label="Approve item {item.id}"
												aria-pressed={approvalState[item.id] === true}
											>
												<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
												Approve
											</button>
											<button
												class="btn-compact btn-compact-danger cob-reject-btn"
												class:cob-reject-btn--active={approvalState[item.id] === false}
												onclick={() => approvalState = {...approvalState, [item.id]: false}}
												aria-label="Reject item {item.id}"
												aria-pressed={approvalState[item.id] === false}
											>
												<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
												Reject
											</button>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					<!-- Order actions -->
					{#if selectedOrderData.status === 'awaiting_approval'}
						<div class="cob-detail-actions">
							<button class="btn-pill btn-pill-primary cob-create-btn" aria-label="Approve all items in this order">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
								Approve All
							</button>
							<button class="btn-rounded btn-rounded-ghost" aria-label="Reject all items in this order">Reject All</button>
						</div>
					{:else if selectedOrderData.status === 'failed'}
						<div class="cob-detail-actions">
							<button class="btn-pill btn-pill-primary cob-create-btn" aria-label="Retry failed items">Retry Failed</button>
							<button class="btn-rounded btn-rounded-ghost" aria-label="Cancel order">Cancel Order</button>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Batch creator ───────────────────────────────────────────────── */
	.cob-creator-layout { display: flex; }
	.cob-creator-form { display: flex; flex-direction: column; gap: 14px; max-width: 560px; width: 100%; }
	.cob-field { display: flex; flex-direction: column; gap: 6px; }
	.cob-field-row { display: flex; align-items: center; justify-content: space-between; }
	.cob-row { display: flex; gap: 10px; }
	.cob-row .cob-field { flex: 1; }
	.cob-label { font-size: 11px; font-weight: 700; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.07em; }
	.cob-label-hint { font-weight: 400; text-transform: none; letter-spacing: 0; font-size: 11px; }
	.cob-line-count { font-size: 11px; font-weight: 600; color: var(--dt3); background: var(--dbg2); padding: 2px 7px; border-radius: 5px; border: 1px solid var(--dbd); }
	.cob-input { border: 1.5px solid var(--dbd); border-radius: 9px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 8px 12px; outline: none; width: 100%; box-sizing: border-box; }
	.cob-input:focus { border-color: var(--dt3); }
	.cob-input::placeholder { color: var(--dt4); }
	.cob-textarea { border: 1.5px solid var(--dbd); border-radius: 10px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 10px 12px; resize: vertical; outline: none; line-height: 1.55; width: 100%; box-sizing: border-box; }
	.cob-textarea:focus { border-color: var(--dt3); }
	.cob-textarea::placeholder { color: var(--dt4); }
	.cob-select { border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg); color: var(--dt); font-size: 13px; font-family: inherit; padding: 7px 10px; outline: none; cursor: pointer; width: 100%; }
	.cob-select:focus { border-color: var(--dt3); }
	.cob-seg { display: flex; border: 1.5px solid var(--dbd); border-radius: 9px; overflow: hidden; width: fit-content; }
	.cob-seg-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 16px; border: none; border-right: 1.5px solid var(--dbd); background: transparent; color: var(--dt3); font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.1s; }
	.cob-seg-btn:last-child { border-right: none; }
	.cob-seg-btn:hover { background: var(--dbg2); color: var(--dt2); }
	.cob-seg-btn--active { background: var(--dt); color: #fff; }
	:global(.dark) .cob-seg-btn--active { background: #e5e5e5; color: #111; }
	.cob-pills { display: flex; gap: 4px; flex-wrap: wrap; }
	.cob-pill { padding: 4px 10px; border: 1.5px solid var(--dbd); border-radius: 16px; background: transparent; color: var(--dt3); font-size: 11.5px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.cob-pill:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cob-pill--active { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cob-pill--active { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cob-toggle { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border: 1.5px solid var(--dbd); border-radius: 8px; background: var(--dbg); cursor: pointer; font-size: 12.5px; font-weight: 500; font-family: inherit; color: var(--dt3); transition: all 0.15s; }
	.cob-toggle:hover { border-color: var(--dbd2); background: var(--dbg2); }
	.cob-toggle--on { border-color: #22c55e; color: #16a34a; }
	.cob-toggle-knob { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--dbd); background: transparent; transition: all 0.15s; flex-shrink: 0; }
	.cob-toggle--on .cob-toggle-knob { border-color: #22c55e; background: #22c55e; }
	.cob-submit-row { display: flex; align-items: center; gap: 16px; }
	.cob-cost-estimate { display: flex; align-items: baseline; gap: 6px; }
	.cob-cost-label { font-size: 11px; color: var(--dt4); }
	.cob-cost-value { font-size: 18px; font-weight: 800; color: var(--dt); letter-spacing: -0.02em; }
	.cob-cost-detail { font-size: 11px; color: var(--dt4); }

	/* ── Jobs list ──────────────────────────────────────────────────── */
	.cob-jobs-list { display: flex; flex-direction: column; gap: 1px; }
	.cob-job-row { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--dbd); }
	.cob-job-row:last-child { border-bottom: none; }
	.cob-job-left { display: flex; align-items: flex-start; gap: 12px; flex: 1; min-width: 0; }
	.cob-job-type-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--dbg2); border: 1.5px solid var(--dbd); display: flex; align-items: center; justify-content: center; color: var(--dt3); flex-shrink: 0; }
	.cob-job-info { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
	.cob-job-header { display: flex; align-items: center; gap: 8px; }
	.cob-job-name { font-size: 13.5px; font-weight: 700; color: var(--dt); }
	.cob-job-status-badge { display: inline-flex; padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: 700; }
	.cob-job-meta { font-size: 11.5px; color: var(--dt3); display: flex; align-items: center; gap: 4px; }
	.cob-meta-sep { color: var(--dt4); }
	.cob-job-progress-row { display: flex; align-items: center; gap: 8px; }
	.cob-progress-track { flex: 1; max-width: 240px; height: 5px; background: var(--dbg3); border-radius: 3px; overflow: hidden; }
	.cob-progress-fill { height: 100%; border-radius: 3px; transition: width 0.3s; }
	.cob-progress-label { font-size: 11px; font-weight: 600; color: var(--dt4); white-space: nowrap; }
	.cob-job-actions { display: flex; gap: 6px; flex-shrink: 0; }

	/* ── Orders layout ──────────────────────────────────────────────── */
	.cob-orders-layout { display: grid; grid-template-columns: 240px 1fr; gap: 16px; }
	.cob-orders-sidebar { display: flex; flex-direction: column; gap: 8px; }
	.cob-orders-header { display: flex; align-items: center; justify-content: space-between; }
	.cob-orders-title { font-size: 12px; font-weight: 700; color: var(--dt2); text-transform: uppercase; letter-spacing: 0.05em; }
	.cob-order-filters { display: flex; flex-wrap: wrap; gap: 3px; }
	.cob-filter-pill { padding: 3px 8px; border: 1.5px solid var(--dbd); border-radius: 12px; background: transparent; color: var(--dt4); font-size: 11px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.cob-filter-pill:hover { border-color: var(--dbd2); color: var(--dt3); }
	.cob-filter-pill--active { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cob-filter-pill--active { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cob-order-list { display: flex; flex-direction: column; gap: 4px; }
	.cob-order-item { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border: 1.5px solid var(--dbd); border-radius: 9px; background: var(--dbg); cursor: pointer; text-align: left; transition: all 0.12s; font-family: inherit; }
	.cob-order-item:hover { border-color: var(--dbd2); background: var(--dbg2); }
	.cob-order-item--selected { border-color: var(--dt); background: var(--dbg2); }
	.cob-order-item-header { display: flex; align-items: center; justify-content: space-between; gap: 4px; }
	.cob-order-name { font-size: 12.5px; font-weight: 700; color: var(--dt); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.cob-order-cost { font-size: 11.5px; font-weight: 600; color: var(--dt2); flex-shrink: 0; }
	.cob-order-item-meta { font-size: 11px; color: var(--dt4); display: flex; align-items: center; gap: 3px; }
	.cob-order-status-chip { display: inline-flex; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 700; align-self: flex-start; }
	.cob-orders-empty { font-size: 12.5px; color: var(--dt4); text-align: center; padding: 20px 0; }

	/* ── Order detail ───────────────────────────────────────────────── */
	.cob-order-detail { display: flex; flex-direction: column; gap: 14px; }
	.cob-detail-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--dbd); }
	.cob-detail-name { font-size: 15px; font-weight: 700; color: var(--dt); }
	.cob-detail-meta { font-size: 12px; color: var(--dt3); margin-top: 2px; }
	.cob-detail-status { display: inline-flex; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; border: 1.5px solid transparent; }

	/* ── Workflow ────────────────────────────────────────────────────── */
	.cob-workflow { display: flex; align-items: center; gap: 0; }
	.cob-workflow-step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
	.cob-workflow-dot { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--dbd); background: var(--dbg); display: flex; align-items: center; justify-content: center; color: var(--dt4); transition: all 0.2s; }
	.cob-workflow-step--done .cob-workflow-dot { border-color: #22c55e; background: #22c55e; color: #fff; }
	.cob-workflow-step--active .cob-workflow-dot { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cob-workflow-step--active .cob-workflow-dot { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cob-workflow-pulse { width: 8px; height: 8px; border-radius: 50%; background: #fff; animation: cob-pulse 1.2s ease-in-out infinite; }
	:global(.dark) .cob-workflow-pulse { background: #111; }
	@keyframes cob-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
	.cob-workflow-label { font-size: 10px; font-weight: 600; color: var(--dt4); white-space: nowrap; text-transform: uppercase; letter-spacing: 0.04em; }
	.cob-workflow-step--done .cob-workflow-label { color: #16a34a; }
	.cob-workflow-step--active .cob-workflow-label { color: var(--dt2); }
	.cob-workflow-line { flex: 1; height: 2px; background: var(--dbd); margin: 0 2px; margin-bottom: 18px; }
	.cob-workflow-line--done { background: #22c55e; }
	.cob-failed-banner { display: flex; align-items: flex-start; gap: 8px; padding: 10px 14px; border-radius: 8px; background: rgba(239,68,68,0.06); border: 1.5px solid rgba(239,68,68,0.2); color: #dc2626; font-size: 12.5px; line-height: 1.5; }

	/* ── Items grid ─────────────────────────────────────────────────── */
	.cob-items-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
	.cob-item-card { display: flex; flex-direction: column; border: 1.5px solid var(--dbd); border-radius: 9px; overflow: hidden; transition: border-color 0.15s; }
	.cob-item-card--approved { border-color: rgba(34,197,94,0.4); }
	.cob-item-card--rejected { border-color: rgba(239,68,68,0.3); opacity: 0.7; }
	.cob-item-thumb { position: relative; aspect-ratio: 4/3; background: var(--dbg3); display: flex; align-items: center; justify-content: center; color: var(--dt4); }
	.cob-item-status-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
	.cob-item-status-overlay--approved { background: rgba(34,197,94,0.15); color: #16a34a; }
	.cob-item-status-overlay--rejected { background: rgba(239,68,68,0.15); color: #dc2626; }
	.cob-item-body { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
	.cob-item-prompt { font-size: 11px; color: var(--dt3); margin: 0; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
	.cob-item-approve-row { display: flex; gap: 4px; }

	.cob-detail-actions { display: flex; gap: 8px; padding-top: 12px; border-top: 1px solid var(--dbd); }

	/* foundation btn overrides */
	.cob-create-btn:disabled { opacity: 0.4; cursor: not-allowed; }
	.cob-approve-btn { flex: 1; }
	.cob-reject-btn { flex: 1; }
</style>
