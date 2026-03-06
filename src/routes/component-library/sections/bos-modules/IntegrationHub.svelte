<script lang="ts">
	// ── Section 1: Integration Catalog ────────────────────────────
	type Category = 'All' | 'Communication' | 'Storage' | 'Analytics' | 'Payment' | 'CRM' | 'DevOps';

	interface Integration {
		id: string;
		name: string;
		category: Exclude<Category, 'All'>;
		connected: boolean;
		description: string;
		color: string;
		initials: string;
	}

	const integrations: Integration[] = [
		{ id: 'slack',      name: 'Slack',          category: 'Communication', connected: true,  description: 'Team messaging, channels, and real-time collaboration.',      color: '#4a154b', initials: 'SL' },
		{ id: 'gmail',      name: 'Gmail',           category: 'Communication', connected: true,  description: 'Send and receive emails directly from your workspace.',        color: '#ea4335', initials: 'GM' },
		{ id: 'discord',    name: 'Discord',         category: 'Communication', connected: false, description: 'Community servers, voice channels, and bot integrations.',     color: '#5865f2', initials: 'DC' },
		{ id: 's3',         name: 'Amazon S3',       category: 'Storage',       connected: true,  description: 'Object storage for files, backups, and media assets.',         color: '#ff9900', initials: 'S3' },
		{ id: 'drive',      name: 'Google Drive',    category: 'Storage',       connected: false, description: 'Cloud file storage with real-time doc collaboration.',         color: '#0f9d58', initials: 'GD' },
		{ id: 'dropbox',    name: 'Dropbox',         category: 'Storage',       connected: false, description: 'File sync, sharing, and backup across all your devices.',      color: '#0061ff', initials: 'DB' },
		{ id: 'segment',    name: 'Segment',         category: 'Analytics',     connected: true,  description: 'Customer data platform — collect, unify, and activate data.',  color: '#52bd95', initials: 'SG' },
		{ id: 'mixpanel',   name: 'Mixpanel',        category: 'Analytics',     connected: false, description: 'Product analytics to understand user behavior and funnels.',    color: '#7856ff', initials: 'MX' },
		{ id: 'stripe',     name: 'Stripe',          category: 'Payment',       connected: true,  description: 'Payment processing, subscriptions, and billing automation.',   color: '#635bff', initials: 'ST' },
		{ id: 'paddle',     name: 'Paddle',          category: 'Payment',       connected: false, description: 'Revenue delivery platform for SaaS billing and tax.',          color: '#00c897', initials: 'PD' },
		{ id: 'salesforce', name: 'Salesforce',      category: 'CRM',           connected: false, description: 'Customer relationship management and sales pipeline.',         color: '#00a1e0', initials: 'SF' },
		{ id: 'hubspot',    name: 'HubSpot',         category: 'CRM',           connected: true,  description: 'Marketing, sales, and service hub for growing businesses.',    color: '#ff7a59', initials: 'HS' },
		{ id: 'github',     name: 'GitHub',          category: 'DevOps',        connected: true,  description: 'Code repositories, pull requests, and CI/CD pipelines.',       color: '#24292f', initials: 'GH' },
		{ id: 'datadog',    name: 'Datadog',         category: 'DevOps',        connected: false, description: 'Infrastructure monitoring, APM, and log management.',          color: '#632ca6', initials: 'DD' },
		{ id: 'pagerduty',  name: 'PagerDuty',       category: 'DevOps',        connected: false, description: 'Incident management and on-call scheduling for dev teams.',    color: '#06ac38', initials: 'PG' },
	];

	const categories: Category[] = ['All', 'Communication', 'Storage', 'Analytics', 'Payment', 'CRM', 'DevOps'];
	let activeCategory = $state<Category>('All');

	const filteredIntegrations = $derived(
		activeCategory === 'All'
			? integrations
			: integrations.filter(i => i.category === activeCategory)
	);

	// ── Section 2: Connection Wizard ──────────────────────────────
	type WizardStep = 1 | 2 | 3 | 4;

	const wizardServices = [
		{ id: 'slack',   name: 'Slack',    color: '#4a154b', initials: 'SL' },
		{ id: 'stripe',  name: 'Stripe',   color: '#635bff', initials: 'ST' },
		{ id: 'github',  name: 'GitHub',   color: '#24292f', initials: 'GH' },
		{ id: 'segment', name: 'Segment',  color: '#52bd95', initials: 'SG' },
	];

	const fieldMappings = [
		{ source: 'user.email',     target: 'contact.email_address' },
		{ source: 'user.name',      target: 'contact.full_name' },
		{ source: 'account.plan',   target: 'contact.subscription_tier' },
		{ source: 'account.mrr',    target: 'deal.amount' },
	];

	let wizardStep = $state<WizardStep>(1);
	let selectedWizardService = $state('slack');
	let oauthLoading = $state(false);
	let oauthDone = $state(false);
	let testLoading = $state(false);
	let testResult = $state<'idle' | 'success' | 'fail'>('idle');

	function handleOAuth() {
		oauthLoading = true;
		setTimeout(() => {
			oauthLoading = false;
			oauthDone = true;
		}, 1800);
	}

	function handleTestConnection() {
		testLoading = true;
		testResult = 'idle';
		setTimeout(() => {
			testLoading = false;
			testResult = 'success';
		}, 2000);
	}

	function wizardNext() {
		if (wizardStep < 4) wizardStep = (wizardStep + 1) as WizardStep;
	}

	function wizardPrev() {
		if (wizardStep > 1) wizardStep = (wizardStep - 1) as WizardStep;
	}

	function wizardReset() {
		wizardStep = 1;
		oauthDone = false;
		oauthLoading = false;
		testResult = 'idle';
		testLoading = false;
		selectedWizardService = 'slack';
	}

	const wizardStepLabels = ['Select Service', 'Authorize', 'Configure', 'Test'];

	// ── Section 3: Active Connections Dashboard ────────────────────
	type SyncStatus = 'synced' | 'syncing' | 'error';

	interface ActiveConnection {
		id: string;
		name: string;
		initials: string;
		color: string;
		status: SyncStatus;
		lastSync: string;
		direction: 'in' | 'out' | 'both';
		throughput: string;
		enabled: boolean;
	}

	let activeConnections = $state<ActiveConnection[]>([
		{ id: 'slack',    name: 'Slack',        initials: 'SL', color: '#4a154b', status: 'synced',   lastSync: '2 min ago',   direction: 'both', throughput: '1.2K msg/day', enabled: true  },
		{ id: 'stripe',   name: 'Stripe',       initials: 'ST', color: '#635bff', status: 'syncing',  lastSync: 'Syncing…',    direction: 'in',   throughput: '340 events/hr', enabled: true  },
		{ id: 'github',   name: 'GitHub',       initials: 'GH', color: '#24292f', status: 'synced',   lastSync: '18 min ago',  direction: 'out',  throughput: '87 commits/day', enabled: true  },
		{ id: 'hubspot',  name: 'HubSpot',      initials: 'HS', color: '#ff7a59', status: 'error',    lastSync: '3 hours ago', direction: 'both', throughput: '—',             enabled: false },
		{ id: 'segment',  name: 'Segment',      initials: 'SG', color: '#52bd95', status: 'synced',   lastSync: '5 min ago',   direction: 'out',  throughput: '8.4K events/hr', enabled: true  },
		{ id: 's3',       name: 'Amazon S3',    initials: 'S3', color: '#ff9900', status: 'synced',   lastSync: '1 hour ago',  direction: 'out',  throughput: '24 GB/day',     enabled: true  },
	]);

	function toggleConnection(id: string) {
		activeConnections = activeConnections.map(c =>
			c.id === id ? { ...c, enabled: !c.enabled, status: c.enabled ? 'error' : 'synced' } : c
		);
	}

	// ── Section 4: Webhook Manager ────────────────────────────────
	interface Webhook {
		id: string;
		url: string;
		events: string[];
		status: 'active' | 'paused';
		successCount: number;
		failCount: number;
		secretMasked: string;
	}

	let webhooks = $state<Webhook[]>([
		{
			id: 'wh1',
			url: 'https://api.acme.co/webhooks/payments',
			events: ['payment.succeeded', 'payment.failed'],
			status: 'active',
			successCount: 1842,
			failCount: 3,
			secretMasked: 'whsec_••••••••••••3f7a',
		},
		{
			id: 'wh2',
			url: 'https://hooks.zapier.com/hooks/catch/abc123/xyz',
			events: ['user.created', 'user.deleted', 'plan.upgraded'],
			status: 'active',
			successCount: 5401,
			failCount: 12,
			secretMasked: 'whsec_••••••••••••9b2c',
		},
		{
			id: 'wh3',
			url: 'https://data.internal.io/receive',
			events: ['report.generated'],
			status: 'paused',
			successCount: 204,
			failCount: 0,
			secretMasked: 'whsec_••••••••••••1da8',
		},
	]);

	let showAddWebhook = $state(false);
	let newWebhookUrl = $state('');
	let newWebhookEvents = $state('');

	function toggleWebhookStatus(id: string) {
		webhooks = webhooks.map(w =>
			w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
		);
	}

	function addWebhook() {
		if (!newWebhookUrl.trim()) return;
		const evts = newWebhookEvents.split(',').map(e => e.trim()).filter(Boolean);
		webhooks = [...webhooks, {
			id: `wh${Date.now()}`,
			url: newWebhookUrl,
			events: evts.length ? evts : ['*'],
			status: 'active',
			successCount: 0,
			failCount: 0,
			secretMasked: `whsec_••••••••••••${Math.random().toString(36).slice(2, 6)}`,
		}];
		newWebhookUrl = '';
		newWebhookEvents = '';
		showAddWebhook = false;
	}

	// ── Section 5: API Key Management ─────────────────────────────
	interface ApiKey {
		id: string;
		name: string;
		keyMasked: string;
		keyFull: string;
		created: string;
		lastUsed: string;
		permissions: string[];
		expiry: string | null;
		revealed: boolean;
		revoking: boolean;
	}

	let apiKeys = $state<ApiKey[]>([
		{
			id: 'k1',
			name: 'Production API',
			keyMasked: 'msa_live_••••••••••••••••••••••••4f9d',
			keyFull:   'msa_live_sk_x8Rk2mNpQdLwJeUvYcBhAzTsOf4f9d',
			created:   'Jan 12, 2025',
			lastUsed:  '2 hours ago',
			permissions: ['read', 'write', 'webhooks'],
			expiry:    'Jan 12, 2026',
			revealed:  false,
			revoking:  false,
		},
		{
			id: 'k2',
			name: 'Analytics Read-Only',
			keyMasked: 'msa_live_••••••••••••••••••••••••a312',
			keyFull:   'msa_live_sk_pC9nQ7rMkZxWyLsUbAjTdVeHa312',
			created:   'Mar 3, 2025',
			lastUsed:  '4 days ago',
			permissions: ['read'],
			expiry:    null,
			revealed:  false,
			revoking:  false,
		},
		{
			id: 'k3',
			name: 'CI/CD Pipeline',
			keyMasked: 'msa_test_••••••••••••••••••••••••c88e',
			keyFull:   'msa_test_sk_gD4hF2kPzRwNmYcTaLqVeXsJc88e',
			created:   'Feb 20, 2025',
			lastUsed:  'Yesterday',
			permissions: ['read', 'deploy'],
			expiry:    'Aug 20, 2025',
			revealed:  false,
			revoking:  false,
		},
	]);

	function toggleReveal(id: string) {
		apiKeys = apiKeys.map(k => k.id === id ? { ...k, revealed: !k.revealed } : k);
	}

	function startRevoke(id: string) {
		apiKeys = apiKeys.map(k => k.id === id ? { ...k, revoking: true } : k);
	}

	function cancelRevoke(id: string) {
		apiKeys = apiKeys.map(k => k.id === id ? { ...k, revoking: false } : k);
	}

	function confirmRevoke(id: string) {
		apiKeys = apiKeys.filter(k => k.id !== id);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Integration Hub</h2>
	<p class="ds-desc">
		Integration catalog, connection wizard, active connections dashboard, webhook manager, and API key management — full integration lifecycle patterns.
	</p>

	<!-- ══ 1. Integration Catalog ════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Integration Catalog</h3>
		<p class="ds-card__sub">Browse and connect third-party services. Filter by category — cards show icon, name, category badge, status, and description.</p>

		<div class="ih-catalog">
			<!-- Filter pills -->
			<div class="ih-catalog__filters" role="group" aria-label="Filter by category">
				{#each categories as cat}
					<button
						class="btn-pill btn-pill-sm {activeCategory === cat ? 'btn-pill-primary' : 'btn-pill-ghost'}"
						onclick={() => { activeCategory = cat; }}
						aria-pressed={activeCategory === cat}
					>
						{cat}
					</button>
				{/each}
			</div>

			<!-- Grid -->
			<div class="ih-catalog__grid">
				{#each filteredIntegrations as integration (integration.id)}
					<div class="ih-catalog__card">
						<div class="ih-catalog__card-top">
							<div
								class="ih-catalog__icon"
								style="background: {integration.color};"
								aria-hidden="true"
							>
								{integration.initials}
							</div>
							<div class="ih-catalog__meta">
								<span class="ih-catalog__name">{integration.name}</span>
								<span class="ih-catalog__category">{integration.category}</span>
							</div>
							<span class="ih-catalog__status {integration.connected ? 'ih-catalog__status--connected' : 'ih-catalog__status--available'}">
								{integration.connected ? 'Connected' : 'Available'}
							</span>
						</div>
						<p class="ih-catalog__desc">{integration.description}</p>
						<div class="ih-catalog__card-footer">
							{#if integration.connected}
								<button class="btn-pill btn-pill-sm btn-pill-ghost ih-btn-manage" aria-label="Manage {integration.name}">
									Manage
								</button>
							{:else}
								<button class="btn-pill btn-pill-sm btn-pill-primary" aria-label="Connect {integration.name}">
									Connect
								</button>
							{/if}
						</div>
					</div>
				{/each}

				{#if filteredIntegrations.length === 0}
					<div class="ih-catalog__empty">No integrations in this category yet.</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ══ 2. Connection Wizard ═══════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Connection Wizard</h3>
		<p class="ds-card__sub">Multi-step setup flow: select service → authorize via OAuth → configure field mapping → test connection. Stepper shows active / complete / pending states.</p>

		<div class="ih-wizard">
			<!-- Stepper -->
			<div class="ih-wizard__stepper" aria-label="Setup progress">
				{#each wizardStepLabels as label, i}
					{@const stepNum = (i + 1) as WizardStep}
					{@const isDone = stepNum < wizardStep}
					{@const isActive = stepNum === wizardStep}
					<div class="ih-wizard__step {isDone ? 'ih-wizard__step--done' : ''} {isActive ? 'ih-wizard__step--active' : ''}">
						<div class="ih-wizard__step-bubble" aria-hidden="true">
							{#if isDone}
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
									<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							{:else}
								{stepNum}
							{/if}
						</div>
						<span class="ih-wizard__step-label">{label}</span>
					</div>
					{#if i < wizardStepLabels.length - 1}
						<div class="ih-wizard__step-line {stepNum < wizardStep ? 'ih-wizard__step-line--done' : ''}" aria-hidden="true"></div>
					{/if}
				{/each}
			</div>

			<!-- Step content -->
			<div class="ih-wizard__body">
				<!-- Step 1: Select service -->
				{#if wizardStep === 1}
					<div class="ih-wizard__panel">
						<h4 class="ih-wizard__panel-title">Select a service to connect</h4>
						<div class="ih-wizard__service-grid" role="radiogroup" aria-label="Select service">
							{#each wizardServices as svc}
								<button
									class="ih-wizard__service-card {selectedWizardService === svc.id ? 'ih-wizard__service-card--selected' : ''}"
									role="radio"
									aria-checked={selectedWizardService === svc.id}
									onclick={() => { selectedWizardService = svc.id; }}
								>
									<div class="ih-wizard__service-icon" style="background: {svc.color};" aria-hidden="true">{svc.initials}</div>
									<span class="ih-wizard__service-name">{svc.name}</span>
								</button>
							{/each}
						</div>
					</div>

				<!-- Step 2: Authorize -->
				{:else if wizardStep === 2}
					{@const svc = wizardServices.find(s => s.id === selectedWizardService)}
					<div class="ih-wizard__panel">
						<h4 class="ih-wizard__panel-title">Authorize with {svc?.name}</h4>
						<p class="ih-wizard__panel-desc">
							You'll be redirected to {svc?.name} to grant read and write permissions. Your credentials are never stored by MIOSA.
						</p>
						<div class="ih-wizard__oauth-area">
							{#if oauthDone}
								<div class="ih-wizard__oauth-success">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<circle cx="10" cy="10" r="9" stroke="#22c55e" stroke-width="1.5"/>
										<path d="M6 10l3 3 5-5" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									<span>Authorization successful</span>
								</div>
							{:else}
								<button
									class="btn-pill btn-pill-primary"
									onclick={handleOAuth}
									disabled={oauthLoading}
									aria-busy={oauthLoading}
								>
									{#if oauthLoading}
										<span class="ih-wizard__spinner" aria-hidden="true"></span>
										Connecting…
									{:else}
										Connect with {svc?.name}
									{/if}
								</button>
							{/if}
						</div>
					</div>

				<!-- Step 3: Configure -->
				{:else if wizardStep === 3}
					<div class="ih-wizard__panel">
						<h4 class="ih-wizard__panel-title">Configure field mapping</h4>
						<p class="ih-wizard__panel-desc">Map your MIOSA data fields to the service's fields. Drag rows to reorder.</p>
						<div class="ih-wizard__mapping">
							<div class="ih-wizard__mapping-header">
								<span>MIOSA Field</span>
								<span></span>
								<span>Service Field</span>
							</div>
							{#each fieldMappings as row}
								<div class="ih-wizard__mapping-row">
									<span class="ih-wizard__mapping-field ih-wizard__mapping-field--source">{row.source}</span>
									<svg class="ih-wizard__mapping-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
										<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									<span class="ih-wizard__mapping-field ih-wizard__mapping-field--target">{row.target}</span>
								</div>
							{/each}
						</div>
					</div>

				<!-- Step 4: Test connection -->
				{:else if wizardStep === 4}
					<div class="ih-wizard__panel">
						<h4 class="ih-wizard__panel-title">Test your connection</h4>
						<p class="ih-wizard__panel-desc">Send a test payload to verify everything is working correctly.</p>
						<div class="ih-wizard__test-area">
							{#if testResult === 'idle' && !testLoading}
								<button class="btn-pill btn-pill-primary" onclick={handleTestConnection}>
									Run Connection Test
								</button>
							{:else if testLoading}
								<div class="ih-wizard__test-running">
									<span class="ih-wizard__spinner ih-wizard__spinner--lg" aria-hidden="true"></span>
									<span>Sending test payload…</span>
								</div>
							{:else if testResult === 'success'}
								<div class="ih-wizard__test-result ih-wizard__test-result--success">
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
										<circle cx="11" cy="11" r="10" stroke="#22c55e" stroke-width="1.5"/>
										<path d="M7 11l3 3 5-5" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									<div>
										<span class="ih-wizard__test-result-title">Connection verified</span>
										<span class="ih-wizard__test-result-sub">Response time: 124ms · Status: 200 OK</span>
									</div>
								</div>
								<button class="btn-pill btn-pill-primary" onclick={wizardReset}>
									Finish Setup
								</button>
							{:else if testResult === 'fail'}
								<div class="ih-wizard__test-result ih-wizard__test-result--fail">
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
										<circle cx="11" cy="11" r="10" stroke="#ef4444" stroke-width="1.5"/>
										<path d="M8 8l6 6M14 8l-6 6" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round"/>
									</svg>
									<div>
										<span class="ih-wizard__test-result-title">Connection failed</span>
										<span class="ih-wizard__test-result-sub">Error: 401 Unauthorized — check your credentials</span>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- Wizard nav -->
			<div class="ih-wizard__nav">
				<button
					class="btn-pill btn-pill-ghost btn-pill-sm"
					onclick={wizardPrev}
					disabled={wizardStep === 1}
					aria-label="Previous step"
				>
					Back
				</button>
				<div class="ih-wizard__step-counter" aria-live="polite">Step {wizardStep} of 4</div>
				{#if wizardStep < 4}
					<button
						class="btn-pill btn-pill-primary btn-pill-sm"
						onclick={wizardNext}
						disabled={wizardStep === 2 && !oauthDone}
						aria-label="Next step"
					>
						Next
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- ══ 3. Active Connections Dashboard ═══════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Active Connections Dashboard</h3>
		<p class="ds-card__sub">Live view of connected integrations — sync status, last sync time, data flow direction, throughput metrics, and enable/disable toggle.</p>

		<div class="ih-dash">
			{#each activeConnections as conn (conn.id)}
				<div class="ih-dash__row {!conn.enabled ? 'ih-dash__row--disabled' : ''}">
					<!-- Icon -->
					<div class="ih-dash__icon" style="background: {conn.color};" aria-hidden="true">{conn.initials}</div>

					<!-- Name + status -->
					<div class="ih-dash__info">
						<span class="ih-dash__name">{conn.name}</span>
						<div class="ih-dash__status-row">
							<span class="ih-dash__status-dot ih-dash__status-dot--{conn.status}" aria-hidden="true"></span>
							<span class="ih-dash__status-label">
								{#if conn.status === 'synced'}Synced{:else if conn.status === 'syncing'}Syncing{:else}Error{/if}
							</span>
							<span class="ih-dash__sep" aria-hidden="true">·</span>
							<span class="ih-dash__last-sync">{conn.lastSync}</span>
						</div>
					</div>

					<!-- Direction -->
					<div class="ih-dash__direction" aria-label="Data flow: {conn.direction}">
						{#if conn.direction === 'in'}
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M14 9H4M8 5l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
						{:else if conn.direction === 'out'}
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
						{:else}
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M13 6H5M5 6l3-3M5 6l3 3M5 12h8M13 12l-3-3M13 12l-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
						{/if}
					</div>

					<!-- Throughput -->
					<span class="ih-dash__throughput">{conn.throughput}</span>

					<!-- Toggle -->
					<button
						role="switch"
						aria-checked={conn.enabled}
						aria-label="{conn.enabled ? 'Disable' : 'Enable'} {conn.name} integration"
						class="ih-dash__toggle {conn.enabled ? 'ih-dash__toggle--on' : 'ih-dash__toggle--off'}"
						onclick={() => toggleConnection(conn.id)}
					>
						<span class="ih-dash__toggle-thumb"></span>
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- ══ 4. Webhook Manager ═════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Webhook Manager</h3>
		<p class="ds-card__sub">Table of configured webhooks: endpoint URL, subscribed events, status, delivery counts, and masked secret. Add new webhook via inline form.</p>

		<div class="ih-wh">
			<!-- Add webhook button -->
			<div class="ih-wh__toolbar">
				<button
					class="btn-pill btn-pill-primary btn-pill-sm"
					onclick={() => { showAddWebhook = !showAddWebhook; }}
					aria-expanded={showAddWebhook}
				>
					{showAddWebhook ? 'Cancel' : '+ Add Webhook'}
				</button>
			</div>

			<!-- Add form -->
			{#if showAddWebhook}
				<div class="ih-wh__form" role="form" aria-label="Add new webhook">
					<div class="ih-wh__form-fields">
						<div class="ih-wh__form-group">
							<label class="ih-wh__form-label" for="wh-url">Endpoint URL</label>
							<input
								id="wh-url"
								class="ih-wh__form-input"
								type="url"
								placeholder="https://your-server.com/webhook"
								bind:value={newWebhookUrl}
								aria-required="true"
							/>
						</div>
						<div class="ih-wh__form-group">
							<label class="ih-wh__form-label" for="wh-events">Events (comma-separated)</label>
							<input
								id="wh-events"
								class="ih-wh__form-input"
								type="text"
								placeholder="payment.succeeded, user.created"
								bind:value={newWebhookEvents}
							/>
						</div>
					</div>
					<div class="ih-wh__form-actions">
						<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={addWebhook}>
							Add Webhook
						</button>
					</div>
				</div>
			{/if}

			<!-- Table -->
			<div class="ih-wh__table-wrap" role="region" aria-label="Webhooks list">
				<table class="ih-wh__table">
					<thead>
						<tr>
							<th class="ih-wh__th">Endpoint</th>
							<th class="ih-wh__th">Events</th>
							<th class="ih-wh__th">Status</th>
							<th class="ih-wh__th">Deliveries</th>
							<th class="ih-wh__th">Secret</th>
							<th class="ih-wh__th ih-wh__th--action">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each webhooks as wh (wh.id)}
							<tr class="ih-wh__tr">
								<td class="ih-wh__td">
									<span class="ih-wh__url" title={wh.url}>{wh.url}</span>
								</td>
								<td class="ih-wh__td">
									<div class="ih-wh__events">
										{#each wh.events as evt}
											<span class="ih-wh__event-badge">{evt}</span>
										{/each}
									</div>
								</td>
								<td class="ih-wh__td">
									<span class="ih-wh__status ih-wh__status--{wh.status}">
										{wh.status === 'active' ? 'Active' : 'Paused'}
									</span>
								</td>
								<td class="ih-wh__td">
									<div class="ih-wh__deliveries">
										<span class="ih-wh__delivery ih-wh__delivery--ok" title="Successful deliveries">
											<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="#22c55e" opacity="0.2"/><path d="M3 5l1.5 1.5L7 3.5" stroke="#22c55e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
											{wh.successCount.toLocaleString()}
										</span>
										<span class="ih-wh__delivery ih-wh__delivery--fail" title="Failed deliveries">
											<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="#ef4444" opacity="0.2"/><path d="M3.5 3.5l3 3M6.5 3.5l-3 3" stroke="#ef4444" stroke-width="1.2" stroke-linecap="round"/></svg>
											{wh.failCount}
										</span>
									</div>
								</td>
								<td class="ih-wh__td">
									<code class="ih-wh__secret">{wh.secretMasked}</code>
								</td>
								<td class="ih-wh__td ih-wh__td--action">
									<button
										class="btn-pill btn-pill-ghost btn-pill-sm"
										onclick={() => toggleWebhookStatus(wh.id)}
										aria-label="{wh.status === 'active' ? 'Pause' : 'Activate'} webhook"
									>
										{wh.status === 'active' ? 'Pause' : 'Activate'}
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- ══ 5. API Key Management ══════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">API Key Management</h3>
		<p class="ds-card__sub">List of API keys with masked values, reveal toggle, permissions, expiry, and revoke confirmation state.</p>

		<div class="ih-keys">
			<div class="ih-keys__toolbar">
				<button class="btn-pill btn-pill-primary btn-pill-sm" aria-label="Create new API key">
					+ New API Key
				</button>
			</div>

			<div class="ih-keys__list">
				{#each apiKeys as key (key.id)}
					<div class="ih-keys__item {key.revoking ? 'ih-keys__item--revoking' : ''}">
						<!-- Top row: name + permissions + expiry -->
						<div class="ih-keys__item-header">
							<div class="ih-keys__item-meta">
								<span class="ih-keys__item-name">{key.name}</span>
								<div class="ih-keys__perms">
									{#each key.permissions as perm}
										<span class="ih-keys__perm-badge">{perm}</span>
									{/each}
								</div>
							</div>
							{#if key.expiry}
								<span class="ih-keys__expiry">Expires {key.expiry}</span>
							{:else}
								<span class="ih-keys__expiry ih-keys__expiry--never">No expiry</span>
							{/if}
						</div>

						<!-- Key value row -->
						<div class="ih-keys__key-row">
							<code class="ih-keys__key-value">{key.revealed ? key.keyFull : key.keyMasked}</code>
							<button
								class="btn-pill btn-pill-ghost btn-pill-sm"
								onclick={() => toggleReveal(key.id)}
								aria-label="{key.revealed ? 'Hide' : 'Reveal'} API key for {key.name}"
							>
								{#if key.revealed}
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M5.5 5.74A2 2 0 009.26 9.5M2.35 3.65A6.5 6.5 0 001 7s2.5 5 6 5a5.9 5.9 0 003.65-1.35M5 2.18A5.9 5.9 0 017 2c3.5 0 6 5 6 5a11 11 0 01-1.35 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
									Hide
								{:else}
									<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="7" cy="7" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
									Reveal
								{/if}
							</button>
						</div>

						<!-- Bottom row: dates + revoke -->
						<div class="ih-keys__item-footer">
							<div class="ih-keys__dates">
								<span class="ih-keys__date-item">Created {key.created}</span>
								<span class="ih-keys__date-sep" aria-hidden="true">·</span>
								<span class="ih-keys__date-item">Last used {key.lastUsed}</span>
							</div>

							{#if key.revoking}
								<div class="ih-keys__revoke-confirm" role="alert" aria-live="assertive">
									<span class="ih-keys__revoke-confirm-text">Revoke this key permanently?</span>
									<button
										class="btn-pill btn-pill-sm ih-btn-danger"
										onclick={() => confirmRevoke(key.id)}
										aria-label="Confirm revoke {key.name}"
									>
										Yes, revoke
									</button>
									<button
										class="btn-pill btn-pill-ghost btn-pill-sm"
										onclick={() => cancelRevoke(key.id)}
										aria-label="Cancel revoke"
									>
										Cancel
									</button>
								</div>
							{:else}
								<button
									class="btn-pill btn-pill-ghost btn-pill-sm ih-btn-revoke"
									onclick={() => startRevoke(key.id)}
									aria-label="Revoke {key.name}"
								>
									Revoke
								</button>
							{/if}
						</div>
					</div>
				{/each}

				{#if apiKeys.length === 0}
					<div class="ih-keys__empty">No API keys. Create one to get started.</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  SHARED                                                       */
	/* ══════════════════════════════════════════════════════════════ */
	/* ── small inline spinner ─────────────────────────────────── */
	.ih-wizard__spinner {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: #fff;
		border-radius: 50%;
		animation: ih-spin 0.7s linear infinite;
		flex-shrink: 0;
	}
	.ih-wizard__spinner--lg {
		width: 22px;
		height: 22px;
	}
	@keyframes ih-spin {
		to { transform: rotate(360deg); }
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  1. INTEGRATION CATALOG                                       */
	/* ══════════════════════════════════════════════════════════════ */
	.ih-catalog {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* ── Filter pills row ─────────────────────────────────────── */
	.ih-catalog__filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	/* ── Card grid ────────────────────────────────────────────── */
	.ih-catalog__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}
	@media (max-width: 768px) {
		.ih-catalog__grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 480px) {
		.ih-catalog__grid { grid-template-columns: 1fr; }
	}

	.ih-catalog__card {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.ih-catalog__card:hover {
		border-color: var(--dbd2);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.ih-catalog__card-top {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.ih-catalog__icon {
		width: 36px;
		height: 36px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
		letter-spacing: -0.02em;
	}

	.ih-catalog__meta {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.ih-catalog__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1.3;
	}

	.ih-catalog__category {
		font-size: 11px;
		color: var(--dt3);
		font-weight: 400;
	}

	.ih-catalog__status {
		font-size: 10px;
		font-weight: 600;
		padding: 3px 8px;
		border-radius: 9999px;
		flex-shrink: 0;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.ih-catalog__status--connected {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.25);
	}
	.ih-catalog__status--available {
		background: var(--dbg3);
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.ih-catalog__desc {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.5;
		flex: 1;
		margin: 0;
	}

	.ih-catalog__card-footer {
		display: flex;
		justify-content: flex-end;
	}

	.ih-catalog__empty {
		grid-column: 1 / -1;
		text-align: center;
		padding: 40px 16px;
		color: var(--dt3);
		font-size: 14px;
	}

	.ih-btn-manage {
		opacity: 0.7;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  2. CONNECTION WIZARD                                         */
	/* ══════════════════════════════════════════════════════════════ */
	.ih-wizard {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 16px;
		overflow: hidden;
	}

	/* ── Stepper ──────────────────────────────────────────────── */
	.ih-wizard__stepper {
		display: flex;
		align-items: center;
		padding: 20px 24px 16px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
		gap: 0;
	}

	.ih-wizard__step {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.ih-wizard__step-bubble {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		flex-shrink: 0;
		background: var(--dbg);
		border: 1.5px solid var(--dbd);
		color: var(--dt3);
		transition: background 0.2s, border-color 0.2s, color 0.2s;
	}
	.ih-wizard__step--done .ih-wizard__step-bubble {
		background: #22c55e;
		border-color: #22c55e;
		color: #fff;
	}
	.ih-wizard__step--active .ih-wizard__step-bubble {
		background: var(--dt);
		border-color: var(--dt);
		color: var(--dbg);
	}

	.ih-wizard__step-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
		white-space: nowrap;
	}
	.ih-wizard__step--active .ih-wizard__step-label {
		color: var(--dt);
		font-weight: 600;
	}
	.ih-wizard__step--done .ih-wizard__step-label {
		color: var(--dt2);
	}

	.ih-wizard__step-line {
		flex: 1;
		height: 1.5px;
		background: var(--dbd);
		margin: 0 8px;
		transition: background 0.2s;
	}
	.ih-wizard__step-line--done {
		background: #22c55e;
	}

	/* ── Panel body ───────────────────────────────────────────── */
	.ih-wizard__body {
		padding: 24px;
		min-height: 220px;
	}

	.ih-wizard__panel {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.ih-wizard__panel-title {
		font-size: 15px;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
	}

	.ih-wizard__panel-desc {
		font-size: 13px;
		color: var(--dt3);
		line-height: 1.55;
		margin: 0;
	}

	/* Step 1: service grid */
	.ih-wizard__service-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}
	@media (max-width: 480px) {
		.ih-wizard__service-grid { grid-template-columns: repeat(2, 1fr); }
	}

	.ih-wizard__service-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 14px 10px;
		background: var(--dbg);
		border: 1.5px solid var(--dbd);
		border-radius: 12px;
		cursor: pointer;
		font-family: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.ih-wizard__service-card:hover {
		border-color: var(--dt3);
	}
	.ih-wizard__service-card--selected {
		border-color: var(--dt);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
	}

	.ih-wizard__service-icon {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.02em;
	}

	.ih-wizard__service-name {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2);
	}

	/* Step 2: OAuth area */
	.ih-wizard__oauth-area {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32px 16px;
		background: var(--dbg3);
		border: 1px dashed var(--dbd);
		border-radius: 12px;
	}

	.ih-wizard__oauth-success {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 14px;
		font-weight: 500;
		color: #22c55e;
	}

	/* Step 3: Field mapping */
	.ih-wizard__mapping {
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
	}

	.ih-wizard__mapping-header {
		display: grid;
		grid-template-columns: 1fr 20px 1fr;
		gap: 8px;
		align-items: center;
		padding: 8px 14px;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.ih-wizard__mapping-row {
		display: grid;
		grid-template-columns: 1fr 20px 1fr;
		gap: 8px;
		align-items: center;
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd2);
	}
	.ih-wizard__mapping-row:last-child {
		border-bottom: none;
	}

	.ih-wizard__mapping-field {
		font-size: 12px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		padding: 4px 8px;
		border-radius: 6px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ih-wizard__mapping-field--source {
		background: rgba(99, 91, 255, 0.08);
		color: #635bff;
		border: 1px solid rgba(99, 91, 255, 0.18);
	}
	.ih-wizard__mapping-field--target {
		background: rgba(34, 197, 94, 0.08);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.18);
	}

	.ih-wizard__mapping-arrow {
		color: var(--dt4);
		flex-shrink: 0;
		justify-self: center;
	}

	/* Step 4: Test */
	.ih-wizard__test-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 32px 16px;
		background: var(--dbg3);
		border: 1px dashed var(--dbd);
		border-radius: 12px;
	}

	.ih-wizard__test-running {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		color: var(--dt2);
	}

	.ih-wizard__test-result {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		max-width: 380px;
		padding: 14px 16px;
		border-radius: 10px;
	}
	.ih-wizard__test-result--success {
		background: rgba(34, 197, 94, 0.08);
		border: 1px solid rgba(34, 197, 94, 0.22);
	}
	.ih-wizard__test-result--fail {
		background: rgba(239, 68, 68, 0.08);
		border: 1px solid rgba(239, 68, 68, 0.22);
	}
	.ih-wizard__test-result > div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.ih-wizard__test-result-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
	}
	.ih-wizard__test-result-sub {
		font-size: 12px;
		color: var(--dt3);
	}

	/* ── Wizard nav bar ───────────────────────────────────────── */
	.ih-wizard__nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 24px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg3);
	}

	.ih-wizard__step-counter {
		font-size: 12px;
		color: var(--dt3);
		font-weight: 500;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  3. ACTIVE CONNECTIONS DASHBOARD                              */
	/* ══════════════════════════════════════════════════════════════ */
	.ih-dash {
		display: flex;
		flex-direction: column;
		gap: 1px;
		background: var(--dbd);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
	}

	.ih-dash__row {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 16px;
		background: var(--dbg2);
		transition: background 0.12s;
	}
	.ih-dash__row:hover {
		background: var(--dbg3);
	}
	.ih-dash__row--disabled {
		opacity: 0.5;
	}

	.ih-dash__icon {
		width: 36px;
		height: 36px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
		letter-spacing: -0.02em;
	}

	.ih-dash__info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.ih-dash__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		line-height: 1.2;
	}

	.ih-dash__status-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ih-dash__status-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.ih-dash__status-dot--synced  { background: #22c55e; }
	.ih-dash__status-dot--syncing { background: #f59e0b; animation: ih-pulse 1.2s ease-in-out infinite; }
	.ih-dash__status-dot--error   { background: #ef4444; }

	@keyframes ih-pulse {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0.4; }
	}

	.ih-dash__status-label {
		font-size: 12px;
		color: var(--dt3);
		font-weight: 400;
	}

	.ih-dash__sep {
		font-size: 12px;
		color: var(--dt4);
	}

	.ih-dash__last-sync {
		font-size: 12px;
		color: var(--dt3);
	}

	.ih-dash__direction {
		color: var(--dt3);
		flex-shrink: 0;
	}

	.ih-dash__throughput {
		font-size: 12px;
		color: var(--dt2);
		font-weight: 500;
		min-width: 100px;
		text-align: right;
		flex-shrink: 0;
	}

	/* ── Dash toggle ──────────────────────────────────────────── */
	.ih-dash__toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 42px;
		height: 24px;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		padding: 0;
	}
	.ih-dash__toggle--on  { background: #22c55e; }
	.ih-dash__toggle--off { background: var(--dbd); }
	.ih-dash__toggle-thumb {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		left: 2px;
		top: 2px;
	}
	.ih-dash__toggle--on  .ih-dash__toggle-thumb { transform: translateX(18px); }
	.ih-dash__toggle--off .ih-dash__toggle-thumb { transform: translateX(0); }
	.ih-dash__toggle:focus-visible {
		outline: 2px solid var(--dt);
		outline-offset: 2px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  4. WEBHOOK MANAGER                                           */
	/* ══════════════════════════════════════════════════════════════ */
	.ih-wh {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ih-wh__toolbar {
		display: flex;
		justify-content: flex-end;
	}

	/* ── Add form ─────────────────────────────────────────────── */
	.ih-wh__form {
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ih-wh__form-fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	@media (max-width: 600px) {
		.ih-wh__form-fields { grid-template-columns: 1fr; }
	}

	.ih-wh__form-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.ih-wh__form-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
	}

	.ih-wh__form-input {
		padding: 8px 12px;
		font-size: 13px;
		font-family: inherit;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		color: var(--dt);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}
	.ih-wh__form-input::placeholder { color: var(--dt4); }
	.ih-wh__form-input:focus {
		border-color: var(--dt3);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
	}

	.ih-wh__form-actions {
		display: flex;
		justify-content: flex-end;
	}

	/* ── Table ────────────────────────────────────────────────── */
	.ih-wh__table-wrap {
		overflow-x: auto;
		border: 1px solid var(--dbd);
		border-radius: 12px;
	}

	.ih-wh__table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}

	.ih-wh__th {
		padding: 10px 14px;
		text-align: left;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		background: var(--dbg3);
		border-bottom: 1px solid var(--dbd);
		white-space: nowrap;
	}
	.ih-wh__th--action { text-align: right; }

	.ih-wh__tr {
		border-bottom: 1px solid var(--dbd2);
		transition: background 0.1s;
	}
	.ih-wh__tr:last-child { border-bottom: none; }
	.ih-wh__tr:hover { background: var(--dbg3); }

	.ih-wh__td {
		padding: 12px 14px;
		color: var(--dt);
		vertical-align: middle;
	}
	.ih-wh__td--action {
		text-align: right;
		white-space: nowrap;
	}

	.ih-wh__url {
		font-size: 12px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt2);
		display: block;
		max-width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ih-wh__events {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.ih-wh__event-badge {
		font-size: 10px;
		font-weight: 500;
		font-family: 'SF Mono', 'Fira Code', monospace;
		padding: 2px 7px;
		border-radius: 9999px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		color: var(--dt2);
		white-space: nowrap;
	}

	.ih-wh__status {
		font-size: 11px;
		font-weight: 600;
		padding: 3px 8px;
		border-radius: 9999px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}
	.ih-wh__status--active {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.22);
	}
	.ih-wh__status--paused {
		background: var(--dbg3);
		color: var(--dt3);
		border: 1px solid var(--dbd);
	}

	.ih-wh__deliveries {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.ih-wh__delivery {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 500;
	}
	.ih-wh__delivery--ok   { color: #22c55e; }
	.ih-wh__delivery--fail { color: #ef4444; }

	.ih-wh__secret {
		font-size: 11px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt3);
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		padding: 3px 8px;
		border-radius: 6px;
		white-space: nowrap;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  5. API KEY MANAGEMENT                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.ih-keys {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ih-keys__toolbar {
		display: flex;
		justify-content: flex-end;
	}

	.ih-keys__list {
		display: flex;
		flex-direction: column;
		gap: 1px;
		background: var(--dbd);
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
	}

	.ih-keys__item {
		background: var(--dbg2);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition: background 0.12s;
	}
	.ih-keys__item:hover {
		background: var(--dbg3);
	}
	.ih-keys__item--revoking {
		background: rgba(239, 68, 68, 0.04);
		border-left: 3px solid rgba(239, 68, 68, 0.4);
	}

	/* ── Item header ──────────────────────────────────────────── */
	.ih-keys__item-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
	}

	.ih-keys__item-meta {
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 0;
	}

	.ih-keys__item-name {
		font-size: 14px;
		font-weight: 600;
		color: var(--dt);
	}

	.ih-keys__perms {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.ih-keys__perm-badge {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		background: rgba(99, 91, 255, 0.1);
		color: #635bff;
		border: 1px solid rgba(99, 91, 255, 0.2);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.ih-keys__expiry {
		font-size: 12px;
		color: var(--dt3);
		white-space: nowrap;
		flex-shrink: 0;
	}
	.ih-keys__expiry--never {
		color: var(--dt4);
	}

	/* ── Key value row ────────────────────────────────────────── */
	.ih-keys__key-row {
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 8px 12px;
	}

	.ih-keys__key-value {
		flex: 1;
		min-width: 0;
		font-size: 12px;
		font-family: 'SF Mono', 'Fira Code', monospace;
		color: var(--dt2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ── Item footer ──────────────────────────────────────────── */
	.ih-keys__item-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	.ih-keys__dates {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ih-keys__date-item {
		font-size: 12px;
		color: var(--dt3);
	}

	.ih-keys__date-sep {
		font-size: 12px;
		color: var(--dt4);
	}

	/* ── Revoke confirm inline ────────────────────────────────── */
	.ih-keys__revoke-confirm {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.ih-keys__revoke-confirm-text {
		font-size: 12px;
		font-weight: 500;
		color: #ef4444;
	}

	.ih-keys__empty {
		padding: 40px 16px;
		text-align: center;
		font-size: 14px;
		color: var(--dt3);
		background: var(--dbg2);
	}

	/* ── Danger / revoke button modifiers ─────────────────────── */
	.ih-btn-danger {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border-color: rgba(239, 68, 68, 0.3);
	}
	.ih-btn-danger:hover {
		background: rgba(239, 68, 68, 0.18);
		border-color: rgba(239, 68, 68, 0.5);
	}
	.ih-btn-revoke {
		color: var(--dt3);
	}
	.ih-btn-revoke:hover {
		color: #ef4444;
		border-color: rgba(239, 68, 68, 0.3);
	}
</style>
