<script lang="ts">
	// ── Section 1: Service Integration Rows ───────────────────────
	type ConnectionStatus = 'connected' | 'disconnected' | 'error' | 'pending';

	interface Service {
		id: string;
		icon: string;
		name: string;
		description: string;
		status: ConnectionStatus;
		enabled: boolean;
	}

	let services = $state<Service[]>([
		{ id: 'slack',   icon: '#', name: 'Slack',   description: 'Team messaging and notifications',    status: 'connected',    enabled: true  },
		{ id: 'github',  icon: '⬡', name: 'GitHub',  description: 'Code repositories and CI triggers',   status: 'connected',    enabled: true  },
		{ id: 'google',  icon: 'G', name: 'Google',  description: 'Calendar, Drive, and Workspace sync',  status: 'disconnected', enabled: false },
		{ id: 'stripe',  icon: '$', name: 'Stripe',  description: 'Payment processing and subscriptions', status: 'connected',    enabled: true  },
		{ id: 'notion',  icon: 'N', name: 'Notion',  description: 'Docs, wikis, and project databases',   status: 'error',        enabled: false },
		{ id: 'linear',  icon: '◈', name: 'Linear',  description: 'Issue tracking and sprint planning',   status: 'pending',      enabled: false },
	]);

	function toggleService(id: string) {
		services = services.map(s =>
			s.id === id
				? { ...s, enabled: !s.enabled, status: s.enabled ? 'disconnected' : 'connected' }
				: s
		);
	}

	function connectService(id: string) {
		services = services.map(s =>
			s.id === id ? { ...s, status: 'pending', enabled: false } : s
		);
		setTimeout(() => {
			services = services.map(s =>
				s.id === id ? { ...s, status: 'connected', enabled: true } : s
			);
		}, 1200);
	}

	// ── Section 2: API Key Cards ───────────────────────────────────
	interface ApiKey {
		id: string;
		name: string;
		service: string;
		maskedKey: string;
		suffix: string;
		lastUsed: string;
		created: string;
		permissions: string[];
		copied: boolean;
	}

	let apiKeys = $state<ApiKey[]>([
		{
			id: 'openai',
			name: 'OpenAI Production',
			service: 'OpenAI',
			maskedKey: '••••••••••••••••••••••••',
			suffix: 'a4f2',
			lastUsed: '2 hours ago',
			created: 'Jan 12, 2025',
			permissions: ['read', 'write'],
			copied: false,
		},
		{
			id: 'anthropic',
			name: 'Anthropic Claude',
			service: 'Anthropic',
			maskedKey: '••••••••••••••••••••••••',
			suffix: '9c1e',
			lastUsed: '5 minutes ago',
			created: 'Feb 3, 2025',
			permissions: ['read', 'write', 'admin'],
			copied: false,
		},
		{
			id: 'sendgrid',
			name: 'SendGrid Email',
			service: 'SendGrid',
			maskedKey: '••••••••••••••••••••••••',
			suffix: '3b7d',
			lastUsed: 'Yesterday',
			created: 'Dec 1, 2024',
			permissions: ['send'],
			copied: false,
		},
	]);

	function copyKey(id: string) {
		apiKeys = apiKeys.map(k => k.id === id ? { ...k, copied: true } : k);
		setTimeout(() => {
			apiKeys = apiKeys.map(k => k.id === id ? { ...k, copied: false } : k);
		}, 1500);
	}

	// ── Section 3: Webhook Configuration ──────────────────────────
	type WebhookStatus = 'active' | 'paused' | 'failing';

	interface Webhook {
		id: string;
		name: string;
		url: string;
		events: string[];
		status: WebhookStatus;
		lastTriggered: string;
		deliveryRate: number;
	}

	let webhooks = $state<Webhook[]>([
		{
			id: 'wh1',
			name: 'Order Events',
			url: 'https://api.myapp.com/hooks/orders',
			events: ['order.created', 'order.updated', 'order.cancelled'],
			status: 'active',
			lastTriggered: '3 min ago',
			deliveryRate: 99.8,
		},
		{
			id: 'wh2',
			name: 'User Lifecycle',
			url: 'https://api.myapp.com/hooks/users',
			events: ['user.signup', 'user.deleted'],
			status: 'paused',
			lastTriggered: '2 days ago',
			deliveryRate: 97.2,
		},
		{
			id: 'wh3',
			name: 'Payment Alerts',
			url: 'https://staging.myapp.com/hooks/pay',
			events: ['payment.success', 'payment.failed', 'refund.issued'],
			status: 'failing',
			lastTriggered: '1 hour ago',
			deliveryRate: 41.5,
		},
	]);

	function toggleWebhook(id: string) {
		webhooks = webhooks.map(w =>
			w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
		);
	}

	// ── Section 4: Integration Categories ─────────────────────────
	interface CategoryIntegration {
		id: string;
		icon: string;
		name: string;
		status: 'connected' | 'available';
	}
	interface IntegrationCategory {
		id: string;
		label: string;
		icon: string;
		count: number;
		connected: number;
		integrations: CategoryIntegration[];
		expanded: boolean;
	}

	let categories = $state<IntegrationCategory[]>([
		{
			id: 'communication',
			label: 'Communication',
			icon: '◌',
			count: 4,
			connected: 2,
			expanded: true,
			integrations: [
				{ id: 'slack2',    icon: '#', name: 'Slack',        status: 'connected' },
				{ id: 'discord',   icon: '◉', name: 'Discord',      status: 'connected' },
				{ id: 'teams',     icon: 'T', name: 'MS Teams',     status: 'available' },
				{ id: 'telegram',  icon: '▲', name: 'Telegram',     status: 'available' },
			],
		},
		{
			id: 'development',
			label: 'Development',
			icon: '⬡',
			count: 5,
			connected: 3,
			expanded: false,
			integrations: [
				{ id: 'github2',  icon: '⬡', name: 'GitHub',     status: 'connected' },
				{ id: 'gitlab',   icon: '◈', name: 'GitLab',     status: 'connected' },
				{ id: 'jira',     icon: 'J', name: 'Jira',       status: 'connected' },
				{ id: 'sentry',   icon: 'S', name: 'Sentry',     status: 'available' },
				{ id: 'datadog',  icon: 'D', name: 'Datadog',    status: 'available' },
			],
		},
		{
			id: 'analytics',
			label: 'Analytics',
			icon: '◎',
			count: 3,
			connected: 1,
			expanded: false,
			integrations: [
				{ id: 'mixpanel',  icon: 'M', name: 'Mixpanel',    status: 'connected' },
				{ id: 'amplitude', icon: 'A', name: 'Amplitude',   status: 'available' },
				{ id: 'segment',   icon: '◍', name: 'Segment',     status: 'available' },
			],
		},
		{
			id: 'payment',
			label: 'Payment',
			icon: '$',
			count: 3,
			connected: 1,
			expanded: false,
			integrations: [
				{ id: 'stripe2',  icon: '$', name: 'Stripe',       status: 'connected' },
				{ id: 'paypal',   icon: 'P', name: 'PayPal',       status: 'available' },
				{ id: 'square',   icon: '▪', name: 'Square',       status: 'available' },
			],
		},
	]);

	function toggleCategory(id: string) {
		categories = categories.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c);
	}

	// ── Section 5: OAuth Connection Cards ─────────────────────────
	interface OAuthApp {
		id: string;
		name: string;
		avatar: string;
		scopes: string[];
		connectedDate: string;
		lastActive: string;
		disconnecting: boolean;
	}

	let oauthApps = $state<OAuthApp[]>([
		{
			id: 'figma',
			name: 'Figma',
			avatar: 'F',
			scopes: ['Read files', 'Read projects', 'Read user'],
			connectedDate: 'Jan 20, 2025',
			lastActive: '1 day ago',
			disconnecting: false,
		},
		{
			id: 'vercel',
			name: 'Vercel',
			avatar: '▲',
			scopes: ['Deployments', 'Projects', 'Environment vars'],
			connectedDate: 'Nov 5, 2024',
			lastActive: '2 hours ago',
			disconnecting: false,
		},
		{
			id: 'netlify',
			name: 'Netlify',
			avatar: 'N',
			scopes: ['Sites', 'Deploys'],
			connectedDate: 'Oct 15, 2024',
			lastActive: '5 days ago',
			disconnecting: false,
		},
	]);

	function disconnectOAuth(id: string) {
		oauthApps = oauthApps.map(a => a.id === id ? { ...a, disconnecting: true } : a);
		setTimeout(() => {
			oauthApps = oauthApps.filter(a => a.id !== id);
		}, 600);
	}

	// ── Section 6: Integration Status Dashboard ───────────────────
	type HealthStatus = 'healthy' | 'degraded' | 'down';

	interface IntegrationHealth {
		id: string;
		name: string;
		category: string;
		status: HealthStatus;
		uptime: string;
		latency: string;
		lastChecked: string;
	}

	const healthData: IntegrationHealth[] = [
		{ id: 'h1', name: 'Slack',      category: 'Communication', status: 'healthy',  uptime: '99.9%', latency: '42ms',  lastChecked: '1m ago'  },
		{ id: 'h2', name: 'GitHub',     category: 'Development',   status: 'healthy',  uptime: '99.7%', latency: '88ms',  lastChecked: '1m ago'  },
		{ id: 'h3', name: 'Stripe',     category: 'Payment',       status: 'degraded', uptime: '97.2%', latency: '340ms', lastChecked: '2m ago'  },
		{ id: 'h4', name: 'SendGrid',   category: 'Email',         status: 'healthy',  uptime: '99.8%', latency: '61ms',  lastChecked: '1m ago'  },
		{ id: 'h5', name: 'Datadog',    category: 'Analytics',     status: 'healthy',  uptime: '99.5%', latency: '120ms', lastChecked: '3m ago'  },
		{ id: 'h6', name: 'PagerDuty',  category: 'Alerting',      status: 'down',     uptime: '83.1%', latency: '—',     lastChecked: '5m ago'  },
		{ id: 'h7', name: 'Mixpanel',   category: 'Analytics',     status: 'healthy',  uptime: '99.6%', latency: '55ms',  lastChecked: '2m ago'  },
		{ id: 'h8', name: 'Twilio',     category: 'SMS',           status: 'degraded', uptime: '95.4%', latency: '210ms', lastChecked: '4m ago'  },
	];

	const totalHealthy  = $derived(healthData.filter(h => h.status === 'healthy').length);
	const totalDegraded = $derived(healthData.filter(h => h.status === 'degraded').length);
	const totalDown     = $derived(healthData.filter(h => h.status === 'down').length);
</script>

<section class="ds-section">
	<h2 class="ds-title">Integration Cards</h2>
	<p class="ds-desc">Patterns for connecting services, managing API keys, configuring webhooks, and monitoring integration health.</p>

	<!-- ── 1. Service Integration Rows ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Service Integration Rows</h3>
		<p class="ds-card__sub">List of services with connection status badge and connect/toggle action</p>
		<ul class="int-list" role="list" aria-label="Service integrations">
			{#each services as svc (svc.id)}
				<li class="int-row" aria-label="{svc.name} integration">
					<div class="int-row__icon" aria-hidden="true">{svc.icon}</div>
					<div class="int-row__info">
						<span class="int-row__name">{svc.name}</span>
						<span class="int-row__desc">{svc.description}</span>
					</div>
					<span class="int-status-badge int-status-badge--{svc.status}" aria-label="Status: {svc.status}">
						<span class="int-status-dot" aria-hidden="true"></span>
						{svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
					</span>
					{#if svc.status === 'disconnected' || svc.status === 'error'}
						<button
							class="int-btn int-btn--outline"
							aria-label="Connect {svc.name}"
							onclick={() => connectService(svc.id)}
						>
							Connect
						</button>
					{:else if svc.status === 'pending'}
						<button class="int-btn int-btn--ghost" disabled aria-label="Connecting {svc.name}">
							<span class="int-spinner" aria-hidden="true"></span>
							Connecting
						</button>
					{:else}
						<button
							class="int-toggle"
							class:int-toggle--on={svc.enabled}
							role="switch"
							aria-checked={svc.enabled}
							aria-label="{svc.enabled ? 'Disable' : 'Enable'} {svc.name}"
							onclick={() => toggleService(svc.id)}
						>
							<span class="int-toggle__thumb" aria-hidden="true"></span>
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<!-- ── 2. API Key Cards ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">API Key Cards</h3>
		<p class="ds-card__sub">Masked key display with copy, regenerate actions, and last-used metadata</p>
		<div class="apikey-list" role="list" aria-label="API keys">
			{#each apiKeys as key (key.id)}
				<article class="apikey-card" role="listitem" aria-label="{key.name} API key">
					<div class="apikey-card__header">
						<div class="apikey-card__title-row">
							<span class="apikey-card__name">{key.name}</span>
							<div class="apikey-card__perms" aria-label="Permissions: {key.permissions.join(', ')}">
								{#each key.permissions as perm}
									<span class="apikey-perm-pill">{perm}</span>
								{/each}
							</div>
						</div>
						<span class="apikey-card__service">{key.service}</span>
					</div>
					<div class="apikey-card__key-row">
						<code class="apikey-card__masked" aria-label="API key ending in {key.suffix}">
							{key.maskedKey}<span class="apikey-card__suffix">{key.suffix}</span>
						</code>
						<div class="apikey-card__actions">
							<button
								class="apikey-icon-btn"
								aria-label="Copy API key for {key.name}"
								onclick={() => copyKey(key.id)}
							>
								{#if key.copied}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
								{:else}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
								{/if}
							</button>
							<button
								class="apikey-icon-btn"
								aria-label="Regenerate API key for {key.name}"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
							</button>
						</div>
					</div>
					<div class="apikey-card__meta">
						<span class="apikey-card__meta-item">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
							Last used {key.lastUsed}
						</span>
						<span class="apikey-card__meta-sep" aria-hidden="true">·</span>
						<span class="apikey-card__meta-item">Created {key.created}</span>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 3. Webhook Configuration ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Webhook Configuration</h3>
		<p class="ds-card__sub">Endpoint cards with URL, event subscriptions, delivery health, and pause toggle</p>
		<div class="webhook-list" role="list" aria-label="Webhook endpoints">
			{#each webhooks as wh (wh.id)}
				<article
					class="webhook-card"
					class:webhook-card--failing={wh.status === 'failing'}
					role="listitem"
					aria-label="{wh.name} webhook"
				>
					<div class="webhook-card__header">
						<div class="webhook-card__title-group">
							<div class="webhook-card__title-row">
								<span class="webhook-card__name">{wh.name}</span>
								<span class="webhook-status webhook-status--{wh.status}" aria-label="Status: {wh.status}">
									<span class="webhook-status__dot" aria-hidden="true"></span>
									{wh.status.charAt(0).toUpperCase() + wh.status.slice(1)}
								</span>
							</div>
							<code class="webhook-card__url">{wh.url}</code>
						</div>
						<button
							class="int-toggle"
							class:int-toggle--on={wh.status === 'active'}
							role="switch"
							aria-checked={wh.status === 'active'}
							aria-label="{wh.status === 'active' ? 'Pause' : 'Activate'} {wh.name} webhook"
							onclick={() => toggleWebhook(wh.id)}
						>
							<span class="int-toggle__thumb" aria-hidden="true"></span>
						</button>
					</div>
					<div class="webhook-card__events" aria-label="Subscribed events">
						{#each wh.events as event}
							<span class="webhook-event-pill">{event}</span>
						{/each}
					</div>
					<div class="webhook-card__footer">
						<span class="webhook-card__meta-item">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
							Last triggered {wh.lastTriggered}
						</span>
						<span class="webhook-card__delivery" aria-label="Delivery rate {wh.deliveryRate}%">
							<span
								class="webhook-card__delivery-bar"
								aria-hidden="true"
								style="--rate: {wh.deliveryRate}%; --clr: {wh.deliveryRate > 95 ? '#22c55e' : wh.deliveryRate > 70 ? '#f59e0b' : '#ef4444'};"
							></span>
							{wh.deliveryRate}%
						</span>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- ── 4. Integration Categories ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Integration Categories</h3>
		<p class="ds-card__sub">Grouped integrations by domain with expand/collapse and connection count summary</p>
		<div class="intcat-list" role="list" aria-label="Integration categories">
			{#each categories as cat (cat.id)}
				<div class="intcat-group" role="listitem">
					<button
						class="intcat-header"
						aria-expanded={cat.expanded}
						aria-controls="intcat-body-{cat.id}"
						onclick={() => toggleCategory(cat.id)}
					>
						<span class="intcat-header__icon" aria-hidden="true">{cat.icon}</span>
						<span class="intcat-header__label">{cat.label}</span>
						<span class="intcat-header__count" aria-label="{cat.connected} of {cat.count} connected">
							<span class="intcat-connected-dot" aria-hidden="true"></span>
							{cat.connected}/{cat.count}
						</span>
						<svg
							class="intcat-chevron"
							class:intcat-chevron--open={cat.expanded}
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M6 9l6 6 6-6"/>
						</svg>
					</button>
					{#if cat.expanded}
						<ul
							class="intcat-body"
							id="intcat-body-{cat.id}"
							role="list"
							aria-label="{cat.label} integrations"
						>
							{#each cat.integrations as item (item.id)}
								<li class="intcat-item" aria-label="{item.name}">
									<div class="intcat-item__icon" aria-hidden="true">{item.icon}</div>
									<span class="intcat-item__name">{item.name}</span>
									{#if item.status === 'connected'}
										<span class="intcat-item__badge intcat-item__badge--connected" aria-label="Connected">Connected</span>
									{:else}
										<button class="int-btn int-btn--outline int-btn--xs" aria-label="Add {item.name}">Add</button>
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- ── 5. OAuth Connection Cards ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">OAuth Connection Cards</h3>
		<p class="ds-card__sub">Connected OAuth apps with avatar, granted permissions, connection date, and disconnect action</p>
		<div class="oauth-list" role="list" aria-label="Connected OAuth apps">
			{#each oauthApps as app (app.id)}
				<article
					class="oauth-card"
					class:oauth-card--disconnecting={app.disconnecting}
					role="listitem"
					aria-label="{app.name} OAuth connection"
				>
					<div class="oauth-card__avatar" aria-hidden="true">{app.avatar}</div>
					<div class="oauth-card__info">
						<div class="oauth-card__header-row">
							<span class="oauth-card__name">{app.name}</span>
							<span class="oauth-card__active" aria-label="Last active {app.lastActive}">
								<span class="oauth-card__active-dot" aria-hidden="true"></span>
								{app.lastActive}
							</span>
						</div>
						<div class="oauth-card__scopes" aria-label="Permissions granted: {app.scopes.join(', ')}">
							{#each app.scopes as scope}
								<span class="oauth-scope-pill">{scope}</span>
							{/each}
						</div>
						<span class="oauth-card__date">Connected {app.connectedDate}</span>
					</div>
					<button
						class="int-btn int-btn--danger-outline int-btn--sm"
						aria-label="Disconnect {app.name}"
						disabled={app.disconnecting}
						onclick={() => disconnectOAuth(app.id)}
					>
						{app.disconnecting ? 'Disconnecting…' : 'Disconnect'}
					</button>
				</article>
			{/each}
			{#if oauthApps.length === 0}
				<div class="oauth-empty" role="status" aria-live="polite">
					<span class="oauth-empty__icon" aria-hidden="true">◻</span>
					<p class="oauth-empty__msg">No connected OAuth apps</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- ── 6. Integration Status Dashboard ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Integration Status Dashboard</h3>
		<p class="ds-card__sub">Health overview grid showing uptime, latency, and green/yellow/red status for all connected services</p>

		<!-- Summary row -->
		<div class="health-summary" role="region" aria-label="Integration health summary">
			<div class="health-summary__stat">
				<span class="health-summary__dot health-summary__dot--healthy" aria-hidden="true"></span>
				<span class="health-summary__count" aria-label="{totalHealthy} healthy">{totalHealthy}</span>
				<span class="health-summary__label">Healthy</span>
			</div>
			<div class="health-summary__divider" aria-hidden="true"></div>
			<div class="health-summary__stat">
				<span class="health-summary__dot health-summary__dot--degraded" aria-hidden="true"></span>
				<span class="health-summary__count" aria-label="{totalDegraded} degraded">{totalDegraded}</span>
				<span class="health-summary__label">Degraded</span>
			</div>
			<div class="health-summary__divider" aria-hidden="true"></div>
			<div class="health-summary__stat">
				<span class="health-summary__dot health-summary__dot--down" aria-hidden="true"></span>
				<span class="health-summary__count" aria-label="{totalDown} down">{totalDown}</span>
				<span class="health-summary__label">Down</span>
			</div>
		</div>

		<!-- Health grid -->
		<div class="health-grid" role="list" aria-label="Integration health status">
			{#each healthData as item (item.id)}
				<div
					class="health-tile"
					class:health-tile--degraded={item.status === 'degraded'}
					class:health-tile--down={item.status === 'down'}
					role="listitem"
					aria-label="{item.name}: {item.status}"
				>
					<div class="health-tile__header">
						<span class="health-tile__name">{item.name}</span>
						<span
							class="health-tile__dot"
							class:health-tile__dot--healthy={item.status === 'healthy'}
							class:health-tile__dot--degraded={item.status === 'degraded'}
							class:health-tile__dot--down={item.status === 'down'}
							aria-hidden="true"
						></span>
					</div>
					<span class="health-tile__category">{item.category}</span>
					<div class="health-tile__stats">
						<div class="health-tile__stat">
							<span class="health-tile__stat-label">Uptime</span>
							<span class="health-tile__stat-value">{item.uptime}</span>
						</div>
						<div class="health-tile__stat">
							<span class="health-tile__stat-label">Latency</span>
							<span class="health-tile__stat-value">{item.latency}</span>
						</div>
					</div>
					<span class="health-tile__checked">Checked {item.lastChecked}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* ── Shared: Toggle Switch ───────────────────────────────────── */
	.int-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 36px;
		height: 20px;
		border-radius: 9999px;
		background: var(--dbd2);
		border: none;
		cursor: pointer;
		transition: background 0.2s;
		flex-shrink: 0;
		padding: 0;
	}
	.int-toggle--on {
		background: #22c55e;
	}
	.int-toggle__thumb {
		position: absolute;
		left: 2px;
		width: 16px;
		height: 16px;
		border-radius: 9999px;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
		transition: transform 0.2s;
	}
	.int-toggle--on .int-toggle__thumb {
		transform: translateX(16px);
	}

	/* ── Shared: Buttons ─────────────────────────────────────────── */
	.int-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		height: 30px;
		padding: 0 14px;
		border-radius: 7px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
		flex-shrink: 0;
		transition: background 0.15s, border-color 0.15s, color 0.15s, opacity 0.15s;
	}
	.int-btn--outline {
		background: transparent;
		border: 1px solid var(--dbd2);
		color: var(--dt2);
	}
	.int-btn--outline:hover {
		background: var(--dbg2);
		color: var(--dt);
		border-color: var(--dt3);
	}
	.int-btn--ghost {
		background: transparent;
		border: 1px solid var(--dbd);
		color: var(--dt3);
		cursor: default;
	}
	.int-btn--xs {
		height: 24px;
		padding: 0 10px;
		font-size: 11px;
		border-radius: 6px;
	}
	.int-btn--sm {
		height: 28px;
		padding: 0 12px;
		font-size: 11px;
	}
	.int-btn--danger-outline {
		background: transparent;
		border: 1px solid rgba(239, 68, 68, 0.25);
		color: #ef4444;
	}
	.int-btn--danger-outline:hover:not(:disabled) {
		background: rgba(239, 68, 68, 0.08);
		border-color: rgba(239, 68, 68, 0.5);
	}
	.int-btn--danger-outline:disabled {
		opacity: 0.5;
		cursor: default;
	}

	/* ── Shared: Spinner ─────────────────────────────────────────── */
	.int-spinner {
		width: 12px;
		height: 12px;
		border-radius: 9999px;
		border: 2px solid var(--dbd2);
		border-top-color: var(--dt3);
		animation: int-spin 0.7s linear infinite;
		flex-shrink: 0;
	}
	@keyframes int-spin {
		to { transform: rotate(360deg); }
	}

	/* ── Section 1: Service Integration Rows ─────────────────────── */
	.int-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		max-width: 580px;
	}
	.int-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 4px;
		border-bottom: 1px solid var(--dbd);
		transition: background 0.12s;
	}
	.int-row:last-child {
		border-bottom: none;
	}
	.int-row__icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: 700;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.int-row__info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.int-row__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.int-row__desc {
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.int-status-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		height: 22px;
		padding: 0 8px;
		border-radius: 9999px;
		font-size: 11px;
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
		border: 1px solid transparent;
	}
	.int-status-dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		flex-shrink: 0;
	}
	.int-status-badge--connected {
		color: #16a34a;
		background: rgba(22, 163, 74, 0.1);
		border-color: rgba(22, 163, 74, 0.2);
	}
	.int-status-badge--connected .int-status-dot {
		background: #22c55e;
	}
	.int-status-badge--disconnected {
		color: var(--dt3);
		background: var(--dbg2);
		border-color: var(--dbd);
	}
	.int-status-badge--disconnected .int-status-dot {
		background: var(--dt4);
	}
	.int-status-badge--error {
		color: #dc2626;
		background: rgba(220, 38, 38, 0.08);
		border-color: rgba(220, 38, 38, 0.2);
	}
	.int-status-badge--error .int-status-dot {
		background: #ef4444;
	}
	.int-status-badge--pending {
		color: #d97706;
		background: rgba(217, 119, 6, 0.08);
		border-color: rgba(217, 119, 6, 0.2);
	}
	.int-status-badge--pending .int-status-dot {
		background: #f59e0b;
		animation: int-pulse 1.2s ease-in-out infinite;
	}
	@keyframes int-pulse {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0.4; }
	}

	/* ── Section 2: API Key Cards ────────────────────────────────── */
	.apikey-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 560px;
	}
	.apikey-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px 16px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.15s;
	}
	.apikey-card:hover {
		border-color: var(--dbd2);
	}
	.apikey-card__header {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.apikey-card__title-row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.apikey-card__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.apikey-card__perms {
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}
	.apikey-perm-pill {
		display: inline-flex;
		align-items: center;
		height: 18px;
		padding: 0 6px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: 600;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
		text-transform: lowercase;
	}
	.apikey-card__service {
		font-size: 11px;
		color: var(--dt3);
	}
	.apikey-card__key-row {
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		padding: 8px 10px;
	}
	.apikey-card__masked {
		flex: 1;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 12px;
		color: var(--dt3);
		letter-spacing: 0.04em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.apikey-card__suffix {
		color: var(--dt);
		font-weight: 700;
		letter-spacing: 0.08em;
	}
	.apikey-card__actions {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
	}
	.apikey-icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		color: var(--dt3);
		cursor: pointer;
		transition: background 0.12s, color 0.12s, border-color 0.12s;
	}
	.apikey-icon-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
		border-color: var(--dbd2);
	}
	.apikey-card__meta {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.apikey-card__meta-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
	}
	.apikey-card__meta-sep {
		color: var(--dt4);
		font-size: 11px;
	}

	/* ── Section 3: Webhook Configuration ───────────────────────── */
	.webhook-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 560px;
	}
	.webhook-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px 16px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.15s;
	}
	.webhook-card--failing {
		border-color: rgba(239, 68, 68, 0.25);
		background: rgba(239, 68, 68, 0.02);
	}
	.webhook-card__header {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}
	.webhook-card__title-group {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.webhook-card__title-row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.webhook-card__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.webhook-status {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		height: 20px;
		padding: 0 7px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 600;
		border: 1px solid transparent;
	}
	.webhook-status__dot {
		width: 5px;
		height: 5px;
		border-radius: 9999px;
		flex-shrink: 0;
	}
	.webhook-status--active {
		color: #16a34a;
		background: rgba(22, 163, 74, 0.1);
		border-color: rgba(22, 163, 74, 0.2);
	}
	.webhook-status--active .webhook-status__dot { background: #22c55e; }
	.webhook-status--paused {
		color: var(--dt3);
		background: var(--dbg2);
		border-color: var(--dbd);
	}
	.webhook-status--paused .webhook-status__dot { background: var(--dt4); }
	.webhook-status--failing {
		color: #dc2626;
		background: rgba(220, 38, 38, 0.08);
		border-color: rgba(220, 38, 38, 0.2);
	}
	.webhook-status--failing .webhook-status__dot {
		background: #ef4444;
		animation: int-pulse 1s ease-in-out infinite;
	}
	.webhook-card__url {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 11px;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
	}
	.webhook-card__events {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
	}
	.webhook-event-pill {
		display: inline-flex;
		align-items: center;
		height: 20px;
		padding: 0 7px;
		border-radius: 5px;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 10px;
		font-weight: 500;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
	}
	.webhook-card__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.webhook-card__meta-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
	}
	.webhook-card__delivery {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt2);
		font-variant-numeric: tabular-nums;
	}
	.webhook-card__delivery-bar {
		width: 48px;
		height: 4px;
		border-radius: 9999px;
		background: var(--dbd);
		position: relative;
		overflow: hidden;
	}
	.webhook-card__delivery-bar::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: var(--rate);
		background: var(--clr);
		border-radius: 9999px;
		transition: width 0.4s ease;
	}

	/* ── Section 4: Integration Categories ──────────────────────── */
	.intcat-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: 480px;
	}
	.intcat-group {
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
		transition: border-color 0.15s;
	}
	.intcat-group:has(.intcat-body) {
		border-color: var(--dbd2);
	}
	.intcat-header {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 12px 14px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s;
	}
	.intcat-header:hover {
		background: var(--dbg2);
	}
	.intcat-header__icon {
		font-size: 14px;
		color: var(--dt2);
		width: 20px;
		text-align: center;
		flex-shrink: 0;
	}
	.intcat-header__label {
		flex: 1;
		font-size: 13px;
		font-weight: 600;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.intcat-header__count {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		color: var(--dt3);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}
	.intcat-connected-dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: #22c55e;
		flex-shrink: 0;
	}
	.intcat-chevron {
		color: var(--dt3);
		transition: transform 0.2s;
		flex-shrink: 0;
	}
	.intcat-chevron--open {
		transform: rotate(180deg);
	}
	.intcat-body {
		list-style: none;
		margin: 0;
		padding: 0 14px 10px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		border-top: 1px solid var(--dbd);
	}
	.intcat-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 6px;
		border-radius: 8px;
		transition: background 0.1s;
	}
	.intcat-item:hover {
		background: var(--dbg2);
	}
	.intcat-item__icon {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.intcat-item__name {
		flex: 1;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}
	.intcat-item__badge {
		display: inline-flex;
		align-items: center;
		height: 20px;
		padding: 0 8px;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 600;
		flex-shrink: 0;
	}
	.intcat-item__badge--connected {
		color: #16a34a;
		background: rgba(22, 163, 74, 0.1);
		border: 1px solid rgba(22, 163, 74, 0.2);
	}

	/* ── Section 5: OAuth Connection Cards ──────────────────────── */
	.oauth-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 520px;
	}
	.oauth-card {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		padding: 14px 16px;
		border-radius: 12px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.15s, opacity 0.3s;
	}
	.oauth-card--disconnecting {
		opacity: 0.4;
		pointer-events: none;
	}
	.oauth-card__avatar {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		font-weight: 800;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.oauth-card__info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.oauth-card__header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.oauth-card__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.oauth-card__active {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--dt3);
	}
	.oauth-card__active-dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: #22c55e;
		flex-shrink: 0;
	}
	.oauth-card__scopes {
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}
	.oauth-scope-pill {
		display: inline-flex;
		align-items: center;
		height: 20px;
		padding: 0 7px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 500;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		color: var(--dt3);
	}
	.oauth-card__date {
		font-size: 11px;
		color: var(--dt4);
	}
	.oauth-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 32px 20px;
		text-align: center;
		border-radius: 12px;
		border: 1px dashed var(--dbd2);
	}
	.oauth-empty__icon {
		font-size: 24px;
		color: var(--dt4);
		line-height: 1;
	}
	.oauth-empty__msg {
		margin: 0;
		font-size: 13px;
		color: var(--dt3);
	}

	/* ── Section 6: Integration Status Dashboard ─────────────────── */
	.health-summary {
		display: flex;
		align-items: center;
		gap: 0;
		padding: 12px 16px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		margin-bottom: 12px;
		max-width: 560px;
	}
	.health-summary__stat {
		display: flex;
		align-items: center;
		gap: 7px;
		flex: 1;
		justify-content: center;
	}
	.health-summary__divider {
		width: 1px;
		height: 28px;
		background: var(--dbd);
		flex-shrink: 0;
	}
	.health-summary__dot {
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		flex-shrink: 0;
	}
	.health-summary__dot--healthy  { background: #22c55e; }
	.health-summary__dot--degraded { background: #f59e0b; }
	.health-summary__dot--down     { background: #ef4444; }
	.health-summary__count {
		font-size: 18px;
		font-weight: 800;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.03em;
		line-height: 1;
	}
	.health-summary__label {
		font-size: 12px;
		color: var(--dt3);
		font-weight: 500;
	}
	.health-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
		max-width: 560px;
	}
	@media (min-width: 500px) {
		.health-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.health-tile {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 12px;
		border-radius: 10px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		transition: border-color 0.15s;
	}
	.health-tile:hover {
		border-color: var(--dbd2);
	}
	.health-tile--degraded {
		border-color: rgba(245, 158, 11, 0.25);
		background: rgba(245, 158, 11, 0.02);
	}
	.health-tile--down {
		border-color: rgba(239, 68, 68, 0.25);
		background: rgba(239, 68, 68, 0.02);
	}
	.health-tile__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}
	.health-tile__name {
		font-size: 12px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.health-tile__dot {
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		flex-shrink: 0;
	}
	.health-tile__dot--healthy  { background: #22c55e; }
	.health-tile__dot--degraded {
		background: #f59e0b;
		animation: int-pulse 1.5s ease-in-out infinite;
	}
	.health-tile__dot--down {
		background: #ef4444;
		animation: int-pulse 0.9s ease-in-out infinite;
	}
	.health-tile__category {
		font-size: 10px;
		color: var(--dt4);
		font-weight: 500;
	}
	.health-tile__stats {
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-top: 3px;
	}
	.health-tile__stat {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4px;
	}
	.health-tile__stat-label {
		font-size: 10px;
		color: var(--dt3);
	}
	.health-tile__stat-value {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt);
		font-variant-numeric: tabular-nums;
	}
	.health-tile__checked {
		font-size: 10px;
		color: var(--dt4);
		margin-top: 2px;
	}
</style>
