<script lang="ts">
  // ── Section 1: Browse & Discover ─────────────────────────────────────
  type ModuleCategory = 'All' | 'Productivity' | 'Communication' | 'Finance' | 'Analytics' | 'Automation' | 'Integration' | 'Utilities' | 'Custom';
  type ModuleVisibility = 'private' | 'workspace' | 'public';
  type SortOption = 'Popular' | 'Newest' | 'Most Installed' | 'A-Z';

  let searchQuery = $state('');
  let activeCategory = $state<ModuleCategory>('All');
  let sortOption = $state<SortOption>('Popular');
  let installedModules = $state<Set<string>>(new Set(['Pipeline Tracker', 'Slack Notifier']));

  const categories: ModuleCategory[] = ['All', 'Productivity', 'Communication', 'Finance', 'Analytics', 'Automation', 'Integration', 'Utilities', 'Custom'];
  const sortOptions: SortOption[] = ['Popular', 'Newest', 'Most Installed', 'A-Z'];

  const categoryColors: Record<string, string> = {
    Productivity: '#3b82f6',
    Communication: '#a855f7',
    Finance: '#10b981',
    Analytics: '#f97316',
    Automation: '#ec4899',
    Integration: '#6366f1',
    Utilities: '#6b7280',
    Custom: '#06b6d4',
  };

  interface ModuleItem {
    name: string;
    author: string;
    description: string;
    category: string;
    installs: number;
    stars: number;
    version: string;
    visibility: ModuleVisibility;
    icon: string;
    featured?: boolean;
  }

  const allModules: ModuleItem[] = [
    { name: 'Pipeline Tracker',   author: 'CRM Suite',       category: 'Productivity', description: 'Visual pipeline stages with drag-and-drop deal management, forecasting, and win/loss analytics.', installs: 128400, stars: 4820, version: '2.4.1', visibility: 'public',    icon: 'PT', featured: true },
    { name: 'Revenue Reports',    author: 'Analytics Pro',   category: 'Finance',      description: 'Automated revenue reporting with MRR, ARR, churn, and cohort analysis across billing periods.', installs: 84200,  stars: 3190, version: '1.9.0', visibility: 'public',    icon: 'RR', featured: true },
    { name: 'Slack Notifier',     author: 'CommLink',        category: 'Communication',description: 'Push workspace events to Slack channels with rich formatting, buttons, and thread replies.', installs: 210000, stars: 6540, version: '3.1.2', visibility: 'public',    icon: 'SN', featured: true },
    { name: 'Lead Scoring',       author: 'CRM Suite',       category: 'Automation',   description: 'ML-powered lead scoring based on firmographic data, engagement signals, and CRM activity.', installs: 62100,  stars: 2880, version: '1.5.0', visibility: 'workspace', icon: 'LS' },
    { name: 'Invoice Generator',  author: 'Finance Hub',     category: 'Finance',      description: 'Generate branded PDF invoices, send via email, and auto-reconcile payments in your ledger.', installs: 98700,  stars: 4110, version: '2.0.3', visibility: 'public',    icon: 'IG' },
    { name: 'API Connector',      author: 'DevTools',        category: 'Integration',  description: 'Connect any REST or GraphQL API with OAuth2, webhooks, and automatic schema mapping.', installs: 74500,  stars: 3760, version: '1.8.0', visibility: 'public',    icon: 'AC' },
    { name: 'Custom Dashboard',   author: 'Internal',        category: 'Custom',       description: 'Build bespoke dashboards with your own widgets, data sources, and layout configurations.', installs: 3400,   stars: 210,  version: '0.9.2', visibility: 'private',   icon: 'CD' },
    { name: 'Data Export',        author: 'Utilities Co.',   category: 'Utilities',    description: 'Export any module data to CSV, Excel, JSON, or Parquet with field selection and scheduling.', installs: 56200,  stars: 2400, version: '1.3.1', visibility: 'public',    icon: 'DE' },
    { name: 'Funnel Analytics',   author: 'Analytics Pro',   category: 'Analytics',    description: 'Visualise conversion funnels across all touchpoints with cohort comparison and A/B analysis.', installs: 41800,  stars: 1920, version: '1.2.0', visibility: 'workspace', icon: 'FA' },
  ];

  function fmtNum(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return String(n);
  }

  let filteredModules = $derived(() => {
    let list = allModules;
    if (activeCategory !== 'All') list = list.filter(m => m.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    if (sortOption === 'A-Z') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === 'Most Installed') list = [...list].sort((a, b) => b.installs - a.installs);
    else if (sortOption === 'Newest') list = [...list].sort((a, b) => b.version.localeCompare(a.version));
    else list = [...list].sort((a, b) => b.stars - a.stars);
    return list;
  });

  const featuredModules = allModules.filter(m => m.featured);

  function toggleInstall(name: string) {
    const next = new Set(installedModules);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    installedModules = next;
  }

  // ── Section 2: Module Detail View ────────────────────────────────────
  let detailTab = $state<'overview' | 'versions' | 'reviews' | 'actions'>('overview');
  let detailStarred = $state(false);

  // ── Section 3: Module Builder ─────────────────────────────────────────
  let builderStep = $state(1);
  let builderName = $state('');
  let builderDesc = $state('');
  let builderCategory = $state('Productivity');
  let builderVisibility = $state<ModuleVisibility>('workspace');
  let builderIcon = $state('');

  interface ActionDef { name: string; type: 'function' | 'api' | 'workflow'; description: string; params: string; }
  let builderActions = $state<ActionDef[]>([
    { name: 'create_record', type: 'function', description: 'Create a new record in this module', params: 'data: object' },
  ]);

  function addAction() {
    builderActions = [...builderActions, { name: '', type: 'function', description: '', params: '' }];
  }
  function removeAction(i: number) {
    builderActions = builderActions.filter((_, idx) => idx !== i);
  }

  // ── Section 4: Installed Dashboard ───────────────────────────────────
  type InstalledFilter = 'All' | 'Active' | 'Inactive';
  let installedFilter = $state<InstalledFilter>('All');
  const installedFilters: InstalledFilter[] = ['All', 'Active', 'Inactive'];

  interface InstalledModule { name: string; icon: string; category: string; version: string; active: boolean; hasUpdate: boolean; }
  let installedList = $state<InstalledModule[]>([
    { name: 'Pipeline Tracker', icon: 'PT', category: 'Productivity', version: '2.4.1', active: true,  hasUpdate: false },
    { name: 'Slack Notifier',   icon: 'SN', category: 'Communication', version: '3.0.1', active: true,  hasUpdate: true  },
    { name: 'Invoice Generator',icon: 'IG', category: 'Finance',       version: '1.9.0', active: false, hasUpdate: false },
    { name: 'Data Export',      icon: 'DE', category: 'Utilities',     version: '1.2.0', active: true,  hasUpdate: true  },
  ]);

  let visibleInstalled = $derived(() => {
    if (installedFilter === 'Active') return installedList.filter(m => m.active);
    if (installedFilter === 'Inactive') return installedList.filter(m => !m.active);
    return installedList;
  });

  function toggleModuleActive(i: number) {
    installedList = installedList.map((m, idx) => idx === i ? { ...m, active: !m.active } : m);
  }
  function uninstallModule(i: number) {
    installedList = installedList.filter((_, idx) => idx !== i);
  }
  function updateModule(i: number) {
    installedList = installedList.map((m, idx) => idx === i ? { ...m, hasUpdate: false } : m);
  }

  // ── Section 5: Sharing & Permissions ─────────────────────────────────
  type SharePermission = 'view' | 'install' | 'modify' | 'reshare';
  let shareInput = $state('');
  let sharePermission = $state<SharePermission>('install');
  let linkCopied = $state(false);

  interface ShareEntry { name: string; role: string; permission: SharePermission; }
  let shareList = $state<ShareEntry[]>([
    { name: 'Jordan Reeves',  role: 'Member',    permission: 'install' },
    { name: 'Marketing Team', role: 'Workspace', permission: 'view'    },
    { name: 'Dev Ops',        role: 'Team',      permission: 'modify'  },
  ]);

  function revokeShare(i: number) {
    shareList = shareList.filter((_, idx) => idx !== i);
  }
  function addShare() {
    if (!shareInput.trim()) return;
    shareList = [...shareList, { name: shareInput.trim(), role: 'Member', permission: sharePermission }];
    shareInput = '';
  }
  function copyLink() {
    linkCopied = true;
    setTimeout(() => { linkCopied = false; }, 2000);
  }

  // ── Section 6: Architecture diagram state ────────────────────────────
  let archHover = $state<string | null>(null);
</script>

<section class="ds-section">
  <h2 class="ds-section__title">Module Market</h2>
  <p class="ds-section__desc">
    The installable-module marketplace for MIOSA platforms. Covers browse & discovery, module detail view,
    module builder wizard, installed-modules dashboard, sharing & permissions, and a system architecture diagram
    explaining the OS → App → Module → Section → Component hierarchy.
  </p>

  <!-- ═══════════════════════════════════════════════════════════════════
       1. BROWSE & DISCOVER
  ═══════════════════════════════════════════════════════════════════ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Module Market — Browse &amp; Discover</h3>
    <p class="ds-card__sub">
      Featured banner, search, category filter chips, sort options, and a 3-column module grid with
      install/installed states, visibility badges, and category colours.
    </p>

    <!-- Featured banner -->
    <div class="am-featured-banner">
      <div class="am-featured-banner__label">Featured Modules</div>
      <div class="am-featured-banner__row">
        {#each featuredModules as mod}
          <div class="am-featured-card">
            <div class="am-featured-card__icon" style="background:{categoryColors[mod.category]}">
              {mod.icon}
            </div>
            <div class="am-featured-card__body">
              <div class="am-featured-card__name">{mod.name}</div>
              <div class="am-featured-card__author">by {mod.author}</div>
              <div class="am-featured-card__desc">{mod.description}</div>
            </div>
            <button
              class="am-btn {installedModules.has(mod.name) ? 'am-btn--installed' : 'am-btn--install'}"
              onclick={() => toggleInstall(mod.name)}
              aria-label="{installedModules.has(mod.name) ? 'Uninstall' : 'Install'} {mod.name}"
            >
              {installedModules.has(mod.name) ? '✓ Installed' : '+ Install'}
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- Search + sort row -->
    <div class="am-search-row">
      <div class="am-search-wrap">
        <svg class="am-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          class="am-search-input"
          type="search"
          placeholder="Search modules…"
          bind:value={searchQuery}
          aria-label="Search modules"
        />
      </div>
      <div class="am-sort-wrap">
        <span class="am-sort-label">Sort:</span>
        {#each sortOptions as sort}
          <button
            class="am-sort-chip {sortOption === sort ? 'am-sort-chip--active' : ''}"
            onclick={() => sortOption = sort}
          >{sort}</button>
        {/each}
      </div>
    </div>

    <!-- Category filter chips -->
    <div class="am-cat-row">
      {#each categories as cat}
        <button
          class="am-cat-chip {activeCategory === cat ? 'am-cat-chip--active' : ''}"
          onclick={() => activeCategory = cat}
          style={activeCategory === cat && cat !== 'All' ? `background:${categoryColors[cat]}22;border-color:${categoryColors[cat]};color:${categoryColors[cat]}` : ''}
          aria-pressed={activeCategory === cat}
        >{cat}</button>
      {/each}
    </div>

    <!-- Module grid -->
    <div class="am-module-grid">
      {#each filteredModules() as mod (mod.name)}
        <div class="am-module-card">
          <div class="am-module-card__header">
            <div class="am-module-card__icon" style="background:{categoryColors[mod.category]}">
              {mod.icon}
            </div>
            <div class="am-module-card__meta">
              <div class="am-module-card__name">{mod.name}</div>
              <div class="am-module-card__author">by {mod.author}</div>
            </div>
            <span class="am-visibility-badge am-visibility-badge--{mod.visibility}">{mod.visibility}</span>
          </div>
          <p class="am-module-card__desc">{mod.description}</p>
          <div class="am-module-card__footer">
            <span class="am-cat-badge" style="background:{categoryColors[mod.category]}22;color:{categoryColors[mod.category]}">{mod.category}</span>
            <span class="am-stat">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 15V3M7 10l5 5 5-5M21 19H3"/></svg>
              {fmtNum(mod.installs)}
            </span>
            <span class="am-stat">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {fmtNum(mod.stars)}
            </span>
            <button
              class="am-install-btn {installedModules.has(mod.name) ? 'am-install-btn--installed' : ''}"
              onclick={() => toggleInstall(mod.name)}
              aria-label="{installedModules.has(mod.name) ? 'Uninstall' : 'Install'} {mod.name}"
            >
              {installedModules.has(mod.name) ? '✓ Installed' : '+ Install'}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       2. MODULE DETAIL VIEW
  ═══════════════════════════════════════════════════════════════════ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Module Detail View</h3>
    <p class="ds-card__sub">
      Full module page with header, action row, tab navigation (Overview / Versions / Reviews / Actions),
      description, manifest info, action list, and config schema.
    </p>

    <div class="am-detail">
      <!-- Detail header -->
      <div class="am-detail__header">
        <div class="am-detail__icon" style="background:{categoryColors['Finance']}">RR</div>
        <div class="am-detail__info">
          <h4 class="am-detail__name">Revenue Reports</h4>
          <div class="am-detail__sub">
            <span>by Analytics Pro</span>
            <span class="am-dot">·</span>
            <span>v1.9.0</span>
            <span class="am-dot">·</span>
            <span class="am-cat-badge" style="background:{categoryColors['Finance']}22;color:{categoryColors['Finance']}">Finance</span>
            <span class="am-visibility-badge am-visibility-badge--public">public</span>
          </div>
          <div class="am-detail__stats">
            <span class="am-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 15V3M7 10l5 5 5-5M21 19H3"/></svg>
              84.2K installs
            </span>
            <span class="am-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              3.19K stars
            </span>
          </div>
        </div>
      </div>

      <!-- Action row -->
      <div class="am-detail__actions">
        <button class="am-btn am-btn--install" aria-label="Install Revenue Reports">+ Install Module</button>
        <button
          class="am-icon-btn {detailStarred ? 'am-icon-btn--active' : ''}"
          onclick={() => detailStarred = !detailStarred}
          aria-label="{detailStarred ? 'Unstar' : 'Star'} module"
          aria-pressed={detailStarred}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={detailStarred ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          {detailStarred ? 'Starred' : 'Star'}
        </button>
        <button class="am-icon-btn" aria-label="Share module">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share
        </button>
        <button class="am-icon-btn" aria-label="Export module">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Export
        </button>
      </div>

      <!-- Tab nav -->
      <div class="am-tabs" role="tablist">
        {#each (['overview', 'versions', 'reviews', 'actions'] as const) as tab}
          <button
            class="am-tab {detailTab === tab ? 'am-tab--active' : ''}"
            role="tab"
            aria-selected={detailTab === tab}
            onclick={() => detailTab = tab}
          >{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        {/each}
      </div>

      <!-- Tab content -->
      <div class="am-tab-content">
        {#if detailTab === 'overview'}
          <p class="am-body-text">
            Automated revenue reporting with MRR, ARR, churn, and cohort analysis across billing periods.
            Connects directly to your Finance data sources and renders interactive charts with drill-down
            capability. Export to PDF, CSV, or push to Slack on a schedule.
          </p>
          <div class="am-screenshot-row">
            {#each [1,2,3] as n}
              <div class="am-screenshot" aria-label="Module screenshot {n}">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <circle cx="7" cy="9" r="1.5"/>
                  <path d="M22 13l-4-4-5 5-3-3-4 4"/>
                </svg>
                <span>Screenshot {n}</span>
              </div>
            {/each}
          </div>
          <div class="am-manifest">
            <div class="am-manifest__title">Module Manifest</div>
            <div class="am-manifest__grid">
              <span class="am-manifest__key">Module ID</span><span class="am-manifest__val">com.analyticspr.revenue-reports</span>
              <span class="am-manifest__key">Min Platform</span><span class="am-manifest__val">BusinessOS 3.0+</span>
              <span class="am-manifest__key">Runtime</span><span class="am-manifest__val">Node 20 / WASM</span>
              <span class="am-manifest__key">Sections</span><span class="am-manifest__val">MRR Chart, ARR Chart, Churn Table, Cohort Grid</span>
              <span class="am-manifest__key">Permissions</span><span class="am-manifest__val">finance:read, reports:write, export:pdf</span>
            </div>
          </div>

        {:else if detailTab === 'versions'}
          <div class="am-versions">
            {#each [
              { v: '1.9.0', date: '2026-02-18', note: 'Added cohort comparison; improved PDF export.' },
              { v: '1.8.1', date: '2026-01-07', note: 'Bug fix: MRR calculation for multi-currency plans.' },
              { v: '1.8.0', date: '2025-11-20', note: 'ARR forecasting with confidence intervals.' },
              { v: '1.7.0', date: '2025-09-05', note: 'Initial public release.' },
            ] as ver}
              <div class="am-version-row">
                <span class="am-version-tag">v{ver.v}</span>
                <span class="am-version-date">{ver.date}</span>
                <span class="am-version-note">{ver.note}</span>
              </div>
            {/each}
          </div>

        {:else if detailTab === 'reviews'}
          <div class="am-reviews">
            {#each [
              { author: 'Priya M.', rating: 5, text: 'Saved us hours every month. The cohort drill-down is exactly what we needed.' },
              { author: 'Lucas T.', rating: 4, text: 'Solid module. Would love a webhook trigger for the scheduled exports.' },
              { author: 'Dana K.', rating: 5, text: 'Integrates perfectly with Finance Hub. No config needed out of the box.' },
            ] as r}
              <div class="am-review-card">
                <div class="am-review-header">
                  <span class="am-review-author">{r.author}</span>
                  <span class="am-stars-row">
                    {#each [1,2,3,4,5] as s}
                      <span class="am-star-sm {s <= r.rating ? 'am-star-sm--on' : ''}">★</span>
                    {/each}
                  </span>
                </div>
                <p class="am-review-text">{r.text}</p>
              </div>
            {/each}
          </div>

        {:else if detailTab === 'actions'}
          <div class="am-actions-list">
            {#each [
              { name: 'get_mrr_snapshot',    type: 'api',      desc: 'Fetch current MRR with period breakdown.',         params: 'period: string, currency?: string' },
              { name: 'generate_pdf_report', type: 'function', desc: 'Render and return a signed PDF report URL.',        params: 'template: string, range: DateRange' },
              { name: 'schedule_export',     type: 'workflow', desc: 'Create a recurring export workflow at a cron schedule.', params: 'cron: string, destination: string' },
            ] as action}
              <div class="am-action-row">
                <div class="am-action-name">{action.name}</div>
                <span class="am-action-type am-action-type--{action.type}">{action.type}</span>
                <div class="am-action-desc">{action.desc}</div>
                <code class="am-action-params">{action.params}</code>
              </div>
            {/each}
          </div>
          <div class="am-config-schema">
            <div class="am-config-schema__title">Config Schema</div>
            <pre class="am-code-block">{`{
  "currency": { "type": "string", "default": "USD" },
  "fiscalYearStart": { "type": "number", "min": 1, "max": 12 },
  "exportFormat": { "type": "enum", "values": ["pdf","csv","json"] },
  "slackChannel": { "type": "string", "optional": true }
}`}</pre>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       3. MODULE BUILDER
  ═══════════════════════════════════════════════════════════════════ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Module Builder</h3>
    <p class="ds-card__sub">
      4-step wizard: Basic Info → Actions → Config Schema → Review &amp; Publish.
      Uses a glass-card stepper layout.
    </p>

    <div class="am-builder">
      <!-- Stepper -->
      <div class="am-stepper" role="list">
        {#each [
          { n: 1, label: 'Basic Info' },
          { n: 2, label: 'Actions' },
          { n: 3, label: 'Config Schema' },
          { n: 4, label: 'Publish' },
        ] as step}
          <div
            class="am-stepper__item {builderStep === step.n ? 'am-stepper__item--active' : ''} {builderStep > step.n ? 'am-stepper__item--done' : ''}"
            role="listitem"
          >
            <div class="am-stepper__dot" aria-hidden="true">
              {#if builderStep > step.n}✓{:else}{step.n}{/if}
            </div>
            <span class="am-stepper__label">{step.label}</span>
          </div>
          {#if step.n < 4}<div class="am-stepper__line" aria-hidden="true"></div>{/if}
        {/each}
      </div>

      <!-- Step content -->
      <div class="am-builder__body">
        {#if builderStep === 1}
          <div class="am-builder__step">
            <h4 class="am-builder__step-title">Basic Info</h4>
            <div class="am-form-grid">
              <div class="am-field">
                <label class="am-label" for="bld-name">Module Name</label>
                <input id="bld-name" class="am-input" type="text" bind:value={builderName} placeholder="e.g. Invoice Tracker" />
              </div>
              <div class="am-field">
                <label class="am-label" for="bld-icon">Icon Initials</label>
                <input id="bld-icon" class="am-input" type="text" bind:value={builderIcon} placeholder="e.g. IT" maxlength="2" />
              </div>
              <div class="am-field am-field--full">
                <label class="am-label" for="bld-desc">Description</label>
                <textarea id="bld-desc" class="am-textarea" bind:value={builderDesc} placeholder="Describe what this module does…" rows="3"></textarea>
              </div>
              <div class="am-field">
                <label class="am-label" for="bld-cat">Category</label>
                <div class="am-select-wrap">
                  <select id="bld-cat" class="am-select" bind:value={builderCategory}>
                    {#each ['Productivity','Communication','Finance','Analytics','Automation','Integration','Utilities','Custom'] as cat}
                      <option value={cat}>{cat}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="am-field">
                <label class="am-label" for="bld-vis">Visibility</label>
                <div class="am-select-wrap">
                  <select id="bld-vis" class="am-select" bind:value={builderVisibility}>
                    <option value="private">Private — only me</option>
                    <option value="workspace">Workspace — members</option>
                    <option value="public">Public — everyone</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        {:else if builderStep === 2}
          <div class="am-builder__step">
            <h4 class="am-builder__step-title">Actions</h4>
            <p class="am-builder__step-hint">Define the callable actions this module exposes. Each action can be a <strong>function</strong> (synchronous), <strong>api</strong> (HTTP endpoint), or <strong>workflow</strong> (async trigger).</p>
            <div class="am-actions-builder">
              {#each builderActions as action, i}
                <div class="am-action-builder-row">
                  <div class="am-form-grid am-form-grid--action">
                    <div class="am-field">
                      <label class="am-label" for="act-name-{i}">Action Name</label>
                      <input id="act-name-{i}" class="am-input am-input--sm" type="text" bind:value={action.name} placeholder="e.g. create_record" />
                    </div>
                    <div class="am-field">
                      <label class="am-label" for="act-type-{i}">Type</label>
                      <div class="am-select-wrap">
                        <select id="act-type-{i}" class="am-select am-select--sm" bind:value={action.type}>
                          <option value="function">function</option>
                          <option value="api">api</option>
                          <option value="workflow">workflow</option>
                        </select>
                      </div>
                    </div>
                    <div class="am-field am-field--full">
                      <label class="am-label" for="act-desc-{i}">Description</label>
                      <input id="act-desc-{i}" class="am-input am-input--sm" type="text" bind:value={action.description} placeholder="What this action does" />
                    </div>
                    <div class="am-field am-field--full">
                      <label class="am-label" for="act-params-{i}">Parameters</label>
                      <input id="act-params-{i}" class="am-input am-input--sm" type="text" bind:value={action.params} placeholder="e.g. data: object, id?: string" />
                    </div>
                  </div>
                  <button class="am-remove-btn" onclick={() => removeAction(i)} aria-label="Remove action {i + 1}">✕</button>
                </div>
              {/each}
              <button class="am-add-action-btn" onclick={addAction}>+ Add Action</button>
            </div>
          </div>

        {:else if builderStep === 3}
          <div class="am-builder__step">
            <h4 class="am-builder__step-title">Config Schema</h4>
            <p class="am-builder__step-hint">Define the JSON schema for module configuration. This is shown to users when they configure an installed instance.</p>
            <div class="am-schema-editor">
              <div class="am-schema-field-row">
                <div class="am-schema-field">
                  <span class="am-schema-key">apiEndpoint</span>
                  <span class="am-schema-type">string</span>
                  <span class="am-schema-required">required</span>
                  <span class="am-schema-note">Base URL of the target API</span>
                </div>
                <div class="am-schema-field">
                  <span class="am-schema-key">refreshInterval</span>
                  <span class="am-schema-type">number</span>
                  <span class="am-schema-optional">optional</span>
                  <span class="am-schema-note">Poll interval in seconds (default: 60)</span>
                </div>
                <div class="am-schema-field">
                  <span class="am-schema-key">notifyOnError</span>
                  <span class="am-schema-type">boolean</span>
                  <span class="am-schema-optional">optional</span>
                  <span class="am-schema-note">Send alert on error</span>
                </div>
              </div>
              <button class="am-add-action-btn">+ Add Config Field</button>
            </div>
            <pre class="am-code-block am-code-block--sm">{`{
  "apiEndpoint": { "type": "string", "required": true },
  "refreshInterval": { "type": "number", "default": 60 },
  "notifyOnError": { "type": "boolean", "default": false }
}`}</pre>
          </div>

        {:else if builderStep === 4}
          <div class="am-builder__step">
            <h4 class="am-builder__step-title">Review &amp; Publish</h4>
            <div class="am-review-grid">
              <div class="am-review-item">
                <span class="am-review-key">Name</span>
                <span class="am-review-val">{builderName || '—'}</span>
              </div>
              <div class="am-review-item">
                <span class="am-review-key">Category</span>
                <span class="am-review-val">
                  <span class="am-cat-badge" style="background:{categoryColors[builderCategory]}22;color:{categoryColors[builderCategory]}">{builderCategory}</span>
                </span>
              </div>
              <div class="am-review-item">
                <span class="am-review-key">Visibility</span>
                <span class="am-review-val">
                  <span class="am-visibility-badge am-visibility-badge--{builderVisibility}">{builderVisibility}</span>
                </span>
              </div>
              <div class="am-review-item am-review-item--full">
                <span class="am-review-key">Description</span>
                <span class="am-review-val">{builderDesc || '—'}</span>
              </div>
              <div class="am-review-item am-review-item--full">
                <span class="am-review-key">Actions</span>
                <span class="am-review-val">{builderActions.length} action{builderActions.length !== 1 ? 's' : ''} defined</span>
              </div>
            </div>
            <div class="am-publish-row">
              <button class="am-btn am-btn--install" aria-label="Publish module">Publish Module</button>
              <button class="am-btn am-btn--ghost" aria-label="Save as draft">Save Draft</button>
            </div>
          </div>
        {/if}
      </div>

      <!-- Stepper nav -->
      <div class="am-builder__nav">
        <button
          class="am-btn am-btn--ghost"
          onclick={() => builderStep = Math.max(1, builderStep - 1)}
          disabled={builderStep === 1}
          aria-label="Previous step"
        >← Back</button>
        <span class="am-builder__progress">Step {builderStep} of 4</span>
        <button
          class="am-btn am-btn--install"
          onclick={() => builderStep = Math.min(4, builderStep + 1)}
          disabled={builderStep === 4}
          aria-label="Next step"
        >Next →</button>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       4. INSTALLED MODULES DASHBOARD
  ═══════════════════════════════════════════════════════════════════ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Installed Modules Dashboard</h3>
    <p class="ds-card__sub">
      Manage your installed modules: active/inactive toggle, update notification, config and uninstall,
      plus bulk actions and filter tabs.
    </p>

    <div class="am-installed">
      <!-- Filter + bulk -->
      <div class="am-installed__topbar">
        <div class="am-tab-mini" role="tablist">
          {#each installedFilters as f}
            <button
              class="am-tab-mini__btn {installedFilter === f ? 'am-tab-mini__btn--active' : ''}"
              role="tab"
              aria-selected={installedFilter === f}
              onclick={() => installedFilter = f}
            >{f}</button>
          {/each}
        </div>
        <div class="am-bulk-actions">
          <button class="am-ghost-sm" aria-label="Update all modules">Update All</button>
          <button class="am-ghost-sm" aria-label="Deactivate all modules">Deactivate All</button>
        </div>
      </div>

      <div class="am-installed__grid">
        {#each visibleInstalled() as mod, i}
          <div class="am-installed-card {!mod.active ? 'am-installed-card--inactive' : ''}">
            <div class="am-installed-card__top">
              <div class="am-installed-card__icon" style="background:{categoryColors[mod.category]}">{mod.icon}</div>
              <div class="am-installed-card__info">
                <div class="am-installed-card__name">{mod.name}</div>
                <div class="am-installed-card__meta">
                  <span class="am-cat-badge" style="background:{categoryColors[mod.category]}22;color:{categoryColors[mod.category]}">{mod.category}</span>
                  <span class="am-version-pill">{mod.version}</span>
                  {#if mod.hasUpdate}<span class="am-update-pill">Update available</span>{/if}
                </div>
              </div>
              <!-- Active toggle -->
              <button
                class="am-toggle {mod.active ? 'am-toggle--on' : ''}"
                onclick={() => toggleModuleActive(i)}
                aria-label="{mod.active ? 'Deactivate' : 'Activate'} {mod.name}"
                aria-checked={mod.active}
                role="switch"
              >
                <span class="am-toggle__thumb"></span>
              </button>
            </div>
            <div class="am-installed-card__actions">
              {#if mod.hasUpdate}
                <button class="am-sm-btn am-sm-btn--primary" onclick={() => updateModule(i)} aria-label="Update {mod.name}">Update</button>
              {/if}
              <button class="am-sm-btn" aria-label="Configure {mod.name}">Config</button>
              <button class="am-sm-btn am-sm-btn--danger" onclick={() => uninstallModule(i)} aria-label="Uninstall {mod.name}">Uninstall</button>
            </div>
          </div>
        {/each}
        {#if visibleInstalled().length === 0}
          <div class="am-empty">No {installedFilter.toLowerCase()} modules.</div>
        {/if}
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       5. MODULE SHARING & PERMISSIONS
  ═══════════════════════════════════════════════════════════════════ -->
  <div class="ds-card">
    <h3 class="ds-card__title">Module Sharing &amp; Permissions</h3>
    <p class="ds-card__sub">
      Share a module with users or workspaces, set permission levels (view / install / modify / reshare),
      generate a share link, and manage existing shares with revoke.
    </p>

    <div class="am-share">
      <!-- Add share row -->
      <div class="am-share__add">
        <input
          class="am-input am-input--grow"
          type="text"
          placeholder="User name or workspace…"
          bind:value={shareInput}
          aria-label="User or workspace to share with"
        />
        <div class="am-select-wrap">
          <select class="am-select" bind:value={sharePermission} aria-label="Share permission level">
            <option value="view">View</option>
            <option value="install">Install</option>
            <option value="modify">Modify</option>
            <option value="reshare">Reshare</option>
          </select>
        </div>
        <button class="am-btn am-btn--install" onclick={addShare} aria-label="Add share">Share</button>
      </div>

      <!-- Permission legend -->
      <div class="am-perm-legend">
        {#each [
          { key: 'view',    label: 'View',    note: 'Can see module info' },
          { key: 'install', label: 'Install', note: 'Can install in their workspace' },
          { key: 'modify',  label: 'Modify',  note: 'Can edit module config & actions' },
          { key: 'reshare', label: 'Reshare', note: 'Can share with others' },
        ] as p}
          <div class="am-perm-item">
            <span class="am-perm-badge am-perm-badge--{p.key}">{p.label}</span>
            <span class="am-perm-note">{p.note}</span>
          </div>
        {/each}
      </div>

      <!-- Share link -->
      <div class="am-share-link-row">
        <div class="am-share-link-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          <span class="am-share-link-url">https://bos.app/modules/revenue-reports?share=abc123…</span>
        </div>
        <button class="am-btn {linkCopied ? 'am-btn--installed' : 'am-btn--ghost'}" onclick={copyLink} aria-label="Copy share link">
          {linkCopied ? '✓ Copied' : 'Copy Link'}
        </button>
      </div>

      <!-- Current shares list -->
      <div class="am-share-list">
        <div class="am-share-list__header">Current Shares</div>
        {#each shareList as share, i}
          <div class="am-share-row">
            <div class="am-share-avatar">{share.name.charAt(0)}</div>
            <div class="am-share-info">
              <span class="am-share-name">{share.name}</span>
              <span class="am-share-role">{share.role}</span>
            </div>
            <span class="am-perm-badge am-perm-badge--{share.permission}">{share.permission}</span>
            <button class="am-revoke-btn" onclick={() => revokeShare(i)} aria-label="Revoke access for {share.name}">Revoke</button>
          </div>
        {/each}
        {#if shareList.length === 0}
          <div class="am-empty">No active shares.</div>
        {/if}
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       6. SYSTEM ARCHITECTURE DIAGRAM
  ═══════════════════════════════════════════════════════════════════ -->
  <div class="ds-card">
    <h3 class="ds-card__title">System Architecture Diagram</h3>
    <p class="ds-card__sub">
      Visual hierarchy: OS → Apps → Modules → Sections → Components.
      How modules are versioned, installed, communicate (function / api / workflow),
      and progress through their lifecycle.
    </p>

    <div class="am-arch">
      <!-- Main hierarchy -->
      <div class="am-arch__tree">
        {#each [
          { level: 'OS',         label: 'Operating System',  examples: 'BusinessOS · ContentOS · DevOS · CustomOS',    color: '#6366f1', note: 'The platform shell. Hosts Apps and manages workspace context.' },
          { level: 'App',        label: 'App (Platform)',     examples: 'CRM Suite · Analytics Pro · Finance Hub',      color: '#3b82f6', note: 'A full platform product. An App bundles many related Modules.' },
          { level: 'Module',     label: 'Module',             examples: 'Pipeline Tracker · Revenue Reports · Notifier', color: '#10b981', note: 'The installable unit in the Module Market. Versioned with semver, installed workspace-wide.' },
          { level: 'Section',    label: 'Section (View)',     examples: 'Pipeline · Contacts · Reports · Inbox',        color: '#f97316', note: 'A named view inside a Module. Routed by the OS shell.' },
          { level: 'Component',  label: 'Component (UI)',     examples: 'Table · Form · Chart · Card · Modal',          color: '#a855f7', note: 'Leaf-level UI piece rendered within a Section.' },
        ] as row, i}
          <div
            class="am-arch-row {archHover === row.level ? 'am-arch-row--hover' : ''}"
            role="listitem"
            onmouseenter={() => archHover = row.level}
            onmouseleave={() => archHover = null}
          >
            <div class="am-arch-row__connector" aria-hidden="true">
              {#if i > 0}<div class="am-arch-row__line"></div>{/if}
              <div class="am-arch-row__dot" style="background:{row.color};box-shadow:0 0 0 4px {row.color}33"></div>
            </div>
            <div class="am-arch-row__card" style="border-color:{row.color}44">
              <div class="am-arch-row__header">
                <span class="am-arch-level-badge" style="background:{row.color}22;color:{row.color};border-color:{row.color}44">{row.level}</span>
                <span class="am-arch-row__title">{row.label}</span>
              </div>
              <div class="am-arch-row__examples">{row.examples}</div>
              <div class="am-arch-row__note">{row.note}</div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Side panels -->
      <div class="am-arch__panels">
        <!-- Versioning -->
        <div class="am-arch-panel">
          <div class="am-arch-panel__title">Module Versioning (semver)</div>
          <div class="am-arch-panel__body">
            <div class="am-semver-row"><span class="am-semver-part am-semver-part--major">2</span><span class="am-semver-dot">.</span><span class="am-semver-part am-semver-part--minor">4</span><span class="am-semver-dot">.</span><span class="am-semver-part am-semver-part--patch">1</span></div>
            <div class="am-semver-labels">
              <span style="color:#ef4444">MAJOR — breaking</span>
              <span style="color:#f97316">MINOR — additive</span>
              <span style="color:#10b981">PATCH — fix</span>
            </div>
            <div class="am-arch-panel__note">Workspace installs pin to a version. Auto-update is opt-in.</div>
          </div>
        </div>

        <!-- Action types -->
        <div class="am-arch-panel">
          <div class="am-arch-panel__title">Module Action Types</div>
          <div class="am-arch-panel__body">
            {#each [
              { type: 'function', color: '#3b82f6', desc: 'Synchronous call, returns a value inline.' },
              { type: 'api',      color: '#10b981', desc: 'Async HTTP endpoint exposed by the module runtime.' },
              { type: 'workflow', color: '#a855f7', desc: 'Async trigger that starts a multi-step workflow.' },
            ] as at}
              <div class="am-action-type-row">
                <span class="am-action-type am-action-type--{at.type}" style="background:{at.color}22;color:{at.color};border-color:{at.color}44">{at.type}</span>
                <span class="am-action-type-desc">{at.desc}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Lifecycle -->
        <div class="am-arch-panel am-arch-panel--lifecycle">
          <div class="am-arch-panel__title">Module Lifecycle</div>
          <div class="am-lifecycle">
            {#each [
              { step: 'Create', color: '#6366f1', icon: '✦' },
              { step: 'Publish', color: '#3b82f6', icon: '↑' },
              { step: 'Install', color: '#10b981', icon: '⊕' },
              { step: 'Configure', color: '#f97316', icon: '⚙' },
              { step: 'Execute', color: '#ec4899', icon: '▶' },
              { step: 'Update', color: '#a855f7', icon: '⟳' },
            ] as s, idx}
              <div class="am-lifecycle__item">
                <div class="am-lifecycle__dot" style="background:{s.color}" aria-hidden="true">{s.icon}</div>
                <div class="am-lifecycle__label">{s.step}</div>
              </div>
              {#if idx < 5}<div class="am-lifecycle__arrow" aria-hidden="true">→</div>{/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

</section>

<style>
  /* ── BROWSE & DISCOVER ──────────────────────────────────────────── */

  .am-featured-banner {
    background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.08) 100%);
    border: 1px solid var(--dbd);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
  }
  .am-featured-banner__label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--dt3);
    margin-bottom: 12px;
  }
  .am-featured-banner__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  @media (max-width: 780px) {
    .am-featured-banner__row { grid-template-columns: 1fr; }
  }
  .am-featured-card {
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(20px);
    border: 1px solid var(--dbd2);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform .15s, box-shadow .15s;
  }
  .am-featured-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,.12);
  }
  .am-featured-card__icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .02em;
    flex-shrink: 0;
  }
  .am-featured-card__body { flex: 1; }
  .am-featured-card__name {
    font-size: 14px;
    font-weight: 600;
    color: var(--dt);
    margin-bottom: 2px;
  }
  .am-featured-card__author {
    font-size: 12px;
    color: var(--dt3);
    margin-bottom: 6px;
  }
  .am-featured-card__desc {
    font-size: 12px;
    color: var(--dt2);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Search row */
  .am-search-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .am-search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
  }
  .am-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--dt3);
    pointer-events: none;
  }
  .am-search-input {
    width: 100%;
    padding: 9px 12px 9px 34px;
    border: 1px solid var(--dbd);
    border-radius: 10px;
    background: var(--dbg2);
    color: var(--dt);
    font-size: 13px;
    outline: none;
    transition: border-color .15s;
  }
  .am-search-input:focus { border-color: #6366f1; }
  .am-sort-wrap { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .am-sort-label { font-size: 12px; color: var(--dt3); }
  .am-sort-chip {
    padding: 5px 11px;
    border-radius: 999px;
    border: 1px solid var(--dbd);
    background: transparent;
    color: var(--dt2);
    font-size: 12px;
    cursor: pointer;
    transition: all .15s;
  }
  .am-sort-chip:hover { border-color: #6366f1; color: #6366f1; }
  .am-sort-chip--active { background: #6366f1; border-color: #6366f1; color: #fff; }

  /* Category chips */
  .am-cat-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .am-cat-chip {
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid var(--dbd);
    background: transparent;
    color: var(--dt2);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s;
  }
  .am-cat-chip:hover { border-color: #6366f1; color: #6366f1; }
  .am-cat-chip--active { background: #6366f111; border-color: #6366f1; color: #6366f1; }

  /* Module grid */
  .am-module-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  @media (max-width: 860px) {
    .am-module-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .am-module-grid { grid-template-columns: 1fr; }
  }
  .am-module-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    border: 1px solid var(--dbd);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform .15s, box-shadow .15s;
  }
  .am-module-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,.1);
    border-color: var(--dbd2);
  }
  .am-module-card__header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .am-module-card__icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .am-module-card__meta { flex: 1; min-width: 0; }
  .am-module-card__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--dt);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .am-module-card__author { font-size: 11px; color: var(--dt3); }
  .am-module-card__desc {
    font-size: 12px;
    color: var(--dt2);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
  .am-module-card__footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
  }

  /* Shared atoms */
  .am-cat-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }
  .am-visibility-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .04em;
    flex-shrink: 0;
  }
  .am-visibility-badge--public  { background: #10b98122; color: #10b981; }
  .am-visibility-badge--workspace { background: #6366f122; color: #6366f1; }
  .am-visibility-badge--private { background: #6b728022; color: #6b7280; }

  .am-stat {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: var(--dt3);
  }
  .am-dot { margin: 0 4px; color: var(--dt4); }

  /* Install buttons */
  .am-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 16px;
    border-radius: 999px;
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all .18s;
    white-space: nowrap;
    gap: 6px;
  }
  .am-btn--install {
    background: #6366f1;
    color: #fff;
  }
  .am-btn--install:hover { background: #4f46e5; transform: translateY(-1px); }
  .am-btn--installed {
    background: #10b98122;
    color: #10b981;
    border: 1px solid #10b98144;
  }
  .am-btn--ghost {
    background: transparent;
    color: var(--dt2);
    border: 1px solid var(--dbd);
  }
  .am-btn--ghost:hover { border-color: #6366f1; color: #6366f1; }
  .am-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }

  .am-install-btn {
    margin-left: auto;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid #6366f1;
    background: transparent;
    color: #6366f1;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
    white-space: nowrap;
  }
  .am-install-btn:hover { background: #6366f1; color: #fff; }
  .am-install-btn--installed {
    border-color: #10b981;
    color: #10b981;
    background: #10b98110;
  }

  /* ── DETAIL VIEW ────────────────────────────────────────────────── */

  .am-detail { display: flex; flex-direction: column; gap: 16px; }
  .am-detail__header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--dbd2);
  }
  .am-detail__icon {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .am-detail__info { flex: 1; }
  .am-detail__name { font-size: 20px; font-weight: 700; color: var(--dt); margin-bottom: 6px; }
  .am-detail__sub {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 13px;
    color: var(--dt2);
    margin-bottom: 8px;
  }
  .am-detail__stats { display: flex; gap: 12px; }

  .am-detail__actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
  .am-icon-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 999px;
    border: 1px solid var(--dbd);
    background: transparent;
    color: var(--dt2);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s;
  }
  .am-icon-btn:hover { border-color: #6366f1; color: #6366f1; }
  .am-icon-btn--active { border-color: #f59e0b; color: #f59e0b; background: #f59e0b11; }

  /* Tabs */
  .am-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--dbd);
    overflow-x: auto;
  }
  .am-tab {
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: var(--dt3);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all .15s;
    white-space: nowrap;
  }
  .am-tab:hover { color: var(--dt); }
  .am-tab--active { color: #6366f1; border-bottom-color: #6366f1; }

  .am-tab-content { padding-top: 16px; }
  .am-body-text { font-size: 14px; color: var(--dt2); line-height: 1.7; margin-bottom: 16px; }

  .am-screenshot-row { display: flex; gap: 10px; margin-bottom: 16px; }
  .am-screenshot {
    flex: 1;
    aspect-ratio: 16/9;
    border: 1px dashed var(--dbd);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--dt4);
    font-size: 11px;
    background: var(--dbg2);
    min-height: 80px;
  }

  .am-manifest {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 12px;
    padding: 14px;
  }
  .am-manifest__title { font-size: 12px; font-weight: 600; color: var(--dt3); margin-bottom: 10px; letter-spacing: .04em; text-transform: uppercase; }
  .am-manifest__grid { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; }
  .am-manifest__key { font-size: 12px; font-weight: 600; color: var(--dt3); }
  .am-manifest__val { font-size: 12px; color: var(--dt2); }

  /* Versions */
  .am-versions { display: flex; flex-direction: column; gap: 8px; }
  .am-version-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 10px 14px;
    background: var(--dbg2);
    border-radius: 10px;
    border: 1px solid var(--dbd2);
  }
  .am-version-tag {
    font-size: 12px;
    font-weight: 700;
    color: #6366f1;
    font-family: monospace;
    min-width: 52px;
  }
  .am-version-date { font-size: 11px; color: var(--dt3); min-width: 90px; }
  .am-version-note { font-size: 12px; color: var(--dt2); }

  /* Reviews */
  .am-reviews { display: flex; flex-direction: column; gap: 10px; }
  .am-review-card {
    padding: 12px 14px;
    background: var(--dbg2);
    border: 1px solid var(--dbd2);
    border-radius: 12px;
  }
  .am-review-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .am-review-author { font-size: 13px; font-weight: 600; color: var(--dt); }
  .am-stars-row { display: flex; gap: 1px; }
  .am-star-sm { font-size: 13px; color: var(--dt4); }
  .am-star-sm--on { color: #f59e0b; }
  .am-review-text { font-size: 13px; color: var(--dt2); line-height: 1.5; }

  /* Actions list */
  .am-actions-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .am-action-row {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--dbg2);
    border: 1px solid var(--dbd2);
    border-radius: 10px;
  }
  .am-action-name { font-size: 12px; font-weight: 700; color: var(--dt); font-family: monospace; }
  .am-action-type {
    display: inline-flex;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    border: 1px solid transparent;
  }
  .am-action-type--function { background: #3b82f622; color: #3b82f6; border-color: #3b82f633; }
  .am-action-type--api      { background: #10b98122; color: #10b981; border-color: #10b98133; }
  .am-action-type--workflow  { background: #a855f722; color: #a855f7; border-color: #a855f733; }
  .am-action-desc { font-size: 12px; color: var(--dt2); }
  .am-action-params { font-size: 11px; color: var(--dt3); font-family: monospace; white-space: nowrap; }

  .am-config-schema__title { font-size: 12px; font-weight: 600; color: var(--dt3); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .04em; }
  .am-code-block {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 10px;
    padding: 14px;
    font-size: 12px;
    color: var(--dt2);
    font-family: monospace;
    overflow-x: auto;
    line-height: 1.6;
    margin: 0;
    white-space: pre;
  }
  .am-code-block--sm { font-size: 11px; padding: 10px 12px; }

  /* ── MODULE BUILDER ─────────────────────────────────────────────── */

  .am-builder { display: flex; flex-direction: column; gap: 20px; }

  .am-stepper {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .am-stepper__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    position: relative;
  }
  .am-stepper__dot {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid var(--dbd);
    background: var(--dbg2);
    color: var(--dt3);
    transition: all .2s;
  }
  .am-stepper__item--active .am-stepper__dot {
    border-color: #6366f1;
    background: #6366f1;
    color: #fff;
    box-shadow: 0 0 0 4px #6366f122;
  }
  .am-stepper__item--done .am-stepper__dot {
    border-color: #10b981;
    background: #10b981;
    color: #fff;
  }
  .am-stepper__label {
    font-size: 11px;
    font-weight: 500;
    color: var(--dt3);
    white-space: nowrap;
  }
  .am-stepper__item--active .am-stepper__label { color: #6366f1; font-weight: 600; }
  .am-stepper__item--done .am-stepper__label { color: #10b981; }
  .am-stepper__line {
    flex: 1;
    height: 2px;
    background: var(--dbd);
    margin: 0 4px;
    margin-bottom: 18px;
    min-width: 20px;
  }

  .am-builder__body {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    border: 1px solid var(--dbd);
    border-radius: 16px;
    padding: 24px;
  }
  .am-builder__step { display: flex; flex-direction: column; gap: 16px; }
  .am-builder__step-title { font-size: 16px; font-weight: 700; color: var(--dt); margin: 0; }
  .am-builder__step-hint { font-size: 13px; color: var(--dt2); line-height: 1.5; margin: 0; }

  .am-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .am-form-grid--action {
    grid-template-columns: 1fr 1fr;
    flex: 1;
  }
  .am-field { display: flex; flex-direction: column; gap: 5px; }
  .am-field--full { grid-column: 1 / -1; }
  .am-label { font-size: 12px; font-weight: 600; color: var(--dt2); }
  .am-input {
    padding: 8px 12px;
    border: 1px solid var(--dbd);
    border-radius: 10px;
    background: var(--dbg);
    color: var(--dt);
    font-size: 13px;
    outline: none;
    transition: border-color .15s;
  }
  .am-input:focus { border-color: #6366f1; }
  .am-input--sm { padding: 6px 10px; font-size: 12px; }
  .am-input--grow { flex: 1; min-width: 0; }
  .am-textarea {
    padding: 8px 12px;
    border: 1px solid var(--dbd);
    border-radius: 10px;
    background: var(--dbg);
    color: var(--dt);
    font-size: 13px;
    outline: none;
    resize: vertical;
    transition: border-color .15s;
    font-family: inherit;
  }
  .am-textarea:focus { border-color: #6366f1; }
  .am-select-wrap { position: relative; }
  .am-select {
    width: 100%;
    padding: 8px 30px 8px 12px;
    border: 1px solid var(--dbd);
    border-radius: 10px;
    background: var(--dbg);
    color: var(--dt);
    font-size: 13px;
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: border-color .15s;
  }
  .am-select--sm { padding: 6px 28px 6px 10px; font-size: 12px; }
  .am-select:focus { border-color: #6366f1; }
  .am-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--dt3);
    pointer-events: none;
    font-size: 11px;
  }

  /* Actions builder */
  .am-actions-builder { display: flex; flex-direction: column; gap: 10px; }
  .am-action-builder-row {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 12px;
    padding: 12px;
  }
  .am-remove-btn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--dt4);
    cursor: pointer;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 20px;
    transition: all .15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .am-remove-btn:hover { background: #ef444422; color: #ef4444; }
  .am-add-action-btn {
    align-self: flex-start;
    padding: 7px 16px;
    border-radius: 999px;
    border: 1px dashed var(--dbd);
    background: transparent;
    color: var(--dt3);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
  }
  .am-add-action-btn:hover { border-color: #6366f1; color: #6366f1; }

  /* Schema editor */
  .am-schema-editor { display: flex; flex-direction: column; gap: 10px; }
  .am-schema-field-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
  .am-schema-field {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    background: var(--dbg2);
    border: 1px solid var(--dbd2);
    border-radius: 10px;
    flex-wrap: wrap;
  }
  .am-schema-key { font-size: 12px; font-weight: 700; color: var(--dt); font-family: monospace; }
  .am-schema-type {
    padding: 1px 7px;
    border-radius: 999px;
    background: #3b82f622;
    color: #3b82f6;
    font-size: 10px;
    font-weight: 700;
    font-family: monospace;
  }
  .am-schema-required {
    padding: 1px 7px;
    border-radius: 999px;
    background: #ef444422;
    color: #ef4444;
    font-size: 10px;
    font-weight: 700;
  }
  .am-schema-optional {
    padding: 1px 7px;
    border-radius: 999px;
    background: #6b728022;
    color: #6b7280;
    font-size: 10px;
    font-weight: 700;
  }
  .am-schema-note { font-size: 11px; color: var(--dt3); flex: 1; }

  /* Review step */
  .am-review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .am-review-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 14px;
    background: var(--dbg2);
    border: 1px solid var(--dbd2);
    border-radius: 10px;
  }
  .am-review-item--full { grid-column: 1 / -1; }
  .am-review-key { font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: .04em; }
  .am-review-val { font-size: 13px; color: var(--dt); }
  .am-publish-row { display: flex; gap: 10px; }

  .am-builder__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .am-builder__progress { font-size: 12px; color: var(--dt3); }

  /* ── INSTALLED DASHBOARD ────────────────────────────────────────── */

  .am-installed { display: flex; flex-direction: column; gap: 16px; }
  .am-installed__topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
  .am-tab-mini {
    display: flex;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 10px;
    padding: 3px;
    gap: 2px;
  }
  .am-tab-mini__btn {
    padding: 5px 14px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--dt2);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s;
  }
  .am-tab-mini__btn--active { background: var(--dbg3); color: var(--dt); font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
  .am-bulk-actions { display: flex; gap: 6px; }
  .am-ghost-sm {
    padding: 5px 12px;
    border-radius: 8px;
    border: 1px solid var(--dbd);
    background: transparent;
    color: var(--dt2);
    font-size: 12px;
    cursor: pointer;
    transition: all .15s;
  }
  .am-ghost-sm:hover { border-color: #6366f1; color: #6366f1; }

  .am-installed__grid { display: flex; flex-direction: column; gap: 8px; }
  .am-installed-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    border: 1px solid var(--dbd);
    border-radius: 14px;
    padding: 14px 16px;
    transition: all .15s;
  }
  .am-installed-card--inactive { opacity: .6; }
  .am-installed-card__top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  .am-installed-card__icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .am-installed-card__info { flex: 1; min-width: 0; }
  .am-installed-card__name { font-size: 13px; font-weight: 600; color: var(--dt); margin-bottom: 4px; }
  .am-installed-card__meta { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }
  .am-version-pill {
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    font-size: 10px;
    font-weight: 600;
    color: var(--dt3);
    font-family: monospace;
  }
  .am-update-pill {
    padding: 2px 7px;
    border-radius: 999px;
    background: #f59e0b22;
    border: 1px solid #f59e0b44;
    font-size: 10px;
    font-weight: 600;
    color: #f59e0b;
  }

  /* Toggle */
  .am-toggle {
    width: 36px;
    height: 20px;
    border-radius: 999px;
    background: var(--dbd);
    border: none;
    cursor: pointer;
    position: relative;
    transition: background .2s;
    flex-shrink: 0;
    padding: 0;
  }
  .am-toggle--on { background: #10b981; }
  .am-toggle__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.2);
    transition: left .2s;
  }
  .am-toggle--on .am-toggle__thumb { left: 18px; }

  .am-installed-card__actions { display: flex; gap: 6px; padding-top: 6px; border-top: 1px solid var(--dbd2); }
  .am-sm-btn {
    padding: 5px 12px;
    border-radius: 8px;
    border: 1px solid var(--dbd);
    background: transparent;
    color: var(--dt2);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
  }
  .am-sm-btn:hover { border-color: #6366f1; color: #6366f1; }
  .am-sm-btn--primary { border-color: #6366f1; color: #6366f1; }
  .am-sm-btn--danger:hover { border-color: #ef4444; color: #ef4444; }

  .am-empty {
    text-align: center;
    padding: 24px;
    font-size: 13px;
    color: var(--dt4);
  }

  /* ── SHARING & PERMISSIONS ──────────────────────────────────────── */

  .am-share { display: flex; flex-direction: column; gap: 16px; }
  .am-share__add { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

  .am-perm-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 14px;
    background: var(--dbg2);
    border: 1px solid var(--dbd2);
    border-radius: 12px;
  }
  .am-perm-item { display: flex; align-items: center; gap: 6px; }
  .am-perm-badge {
    display: inline-flex;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .am-perm-badge--view    { background: #6b728022; color: #6b7280; }
  .am-perm-badge--install { background: #3b82f622; color: #3b82f6; }
  .am-perm-badge--modify  { background: #f97316 22; color: #f97316; background: #f9731622; }
  .am-perm-badge--reshare { background: #a855f722; color: #a855f7; }
  .am-perm-note { font-size: 11px; color: var(--dt3); }

  .am-share-link-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 12px;
  }
  .am-share-link-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--dt3);
    overflow: hidden;
  }
  .am-share-link-url {
    font-size: 12px;
    color: var(--dt2);
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .am-share-list { display: flex; flex-direction: column; gap: 2px; }
  .am-share-list__header { font-size: 12px; font-weight: 600; color: var(--dt3); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .04em; }
  .am-share-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    transition: background .15s;
  }
  .am-share-row:hover { background: var(--dbg2); }
  .am-share-avatar {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .am-share-info { flex: 1; min-width: 0; }
  .am-share-name { font-size: 13px; font-weight: 500; color: var(--dt); }
  .am-share-role { font-size: 11px; color: var(--dt3); margin-left: 6px; }
  .am-revoke-btn {
    padding: 4px 10px;
    border-radius: 8px;
    border: 1px solid var(--dbd);
    background: transparent;
    color: var(--dt3);
    font-size: 11px;
    cursor: pointer;
    transition: all .15s;
    white-space: nowrap;
  }
  .am-revoke-btn:hover { border-color: #ef4444; color: #ef4444; background: #ef444411; }

  /* ── ARCHITECTURE DIAGRAM ───────────────────────────────────────── */

  .am-arch {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 860px) {
    .am-arch { grid-template-columns: 1fr; }
  }

  .am-arch__tree { display: flex; flex-direction: column; }
  .am-arch-row {
    display: flex;
    align-items: stretch;
    gap: 0;
    cursor: default;
  }
  .am-arch-row__connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48px;
    flex-shrink: 0;
  }
  .am-arch-row__line {
    width: 2px;
    flex: 0 0 16px;
    background: var(--dbd);
    border-radius: 1px;
    margin-bottom: 0;
  }
  .am-arch-row__dot {
    width: 14px;
    height: 14px;
    border-radius: 999px;
    flex-shrink: 0;
    margin: 0 0 0 0;
    transition: transform .15s;
  }
  .am-arch-row--hover .am-arch-row__dot { transform: scale(1.3); }
  .am-arch-row__card {
    flex: 1;
    border: 1px solid var(--dbd);
    border-radius: 14px;
    padding: 12px 16px;
    margin-bottom: 8px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(12px);
    transition: all .15s;
    margin-left: 10px;
  }
  .am-arch-row--hover .am-arch-row__card {
    background: rgba(255,255,255,0.07);
    transform: translateX(4px);
  }
  .am-arch-row__header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .am-arch-level-badge {
    display: inline-flex;
    padding: 2px 9px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid transparent;
    text-transform: uppercase;
    letter-spacing: .05em;
    font-family: monospace;
  }
  .am-arch-row__title { font-size: 14px; font-weight: 600; color: var(--dt); }
  .am-arch-row__examples { font-size: 12px; color: var(--dt3); margin-bottom: 4px; font-style: italic; }
  .am-arch-row__note { font-size: 12px; color: var(--dt2); line-height: 1.5; }

  /* Side panels */
  .am-arch__panels { display: flex; flex-direction: column; gap: 14px; }
  .am-arch-panel {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    border: 1px solid var(--dbd);
    border-radius: 14px;
    padding: 16px;
  }
  .am-arch-panel__title { font-size: 12px; font-weight: 700; color: var(--dt3); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 12px; }
  .am-arch-panel__body { display: flex; flex-direction: column; gap: 8px; }
  .am-arch-panel__note { font-size: 11px; color: var(--dt3); margin-top: 6px; }

  /* Semver */
  .am-semver-row { display: flex; align-items: center; gap: 2px; font-family: monospace; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
  .am-semver-dot { color: var(--dt4); }
  .am-semver-part { padding: 2px 8px; border-radius: 8px; }
  .am-semver-part--major { background: #ef444422; color: #ef4444; }
  .am-semver-part--minor { background: #f9731622; color: #f97316; }
  .am-semver-part--patch { background: #10b98122; color: #10b981; }
  .am-semver-labels { display: flex; flex-direction: column; gap: 3px; font-size: 11px; font-weight: 600; }

  /* Action type rows */
  .am-action-type-row { display: flex; align-items: flex-start; gap: 8px; }
  .am-action-type-desc { font-size: 12px; color: var(--dt2); line-height: 1.4; padding-top: 1px; }

  /* Lifecycle */
  .am-lifecycle {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px 0;
  }
  .am-lifecycle__item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .am-lifecycle__dot {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
  .am-lifecycle__label { font-size: 10px; color: var(--dt3); font-weight: 600; white-space: nowrap; }
  .am-lifecycle__arrow { font-size: 14px; color: var(--dt4); margin-bottom: 14px; }
</style>
