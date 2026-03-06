<script lang="ts">
	// ── Help Search ───────────────────────────────────────────────────
	let searchQuery = $state('');
	let recentSearches = $state(['API authentication', 'billing cycle', 'team permissions']);

	type Topic = { icon: string; label: string; color: string };
	const popularTopics: Topic[] = [
		{ icon: '🔑', label: 'Authentication',     color: '#3b82f6' },
		{ icon: '💳', label: 'Billing & Plans',    color: '#8b5cf6' },
		{ icon: '👥', label: 'Team Management',    color: '#06b6d4' },
		{ icon: '🔌', label: 'API Reference',      color: '#f59e0b' },
		{ icon: '⚙️', label: 'Settings',           color: '#22c55e' },
		{ icon: '🛡️', label: 'Security',           color: '#ef4444' },
		{ icon: '📊', label: 'Analytics',          color: '#f97316' },
		{ icon: '🚀', label: 'Getting Started',    color: '#a855f7' },
	];

	function addRecent(q: string) {
		if (!q.trim()) return;
		recentSearches = [q, ...recentSearches.filter(s => s !== q)].slice(0, 5);
		searchQuery = '';
	}

	// ── FAQ Accordion ─────────────────────────────────────────────────
	type FaqCategory = 'General' | 'Billing' | 'Technical' | 'Account';
	let faqCategory = $state<FaqCategory>('General');
	let openFaqId = $state<string | null>(null);

	type FaqItem = { id: string; q: string; a: string; category: FaqCategory };
	const faqs: FaqItem[] = [
		{ id: 'g1', category: 'General',   q: 'What is MIOSA and how does it work?',           a: 'MIOSA is an AI-powered workspace platform that connects multiple AI models and tools in a unified interface. It routes your requests to the best model for each task, managing credits, context, and integrations automatically.' },
		{ id: 'g2', category: 'General',   q: 'Which AI models are available?',                 a: 'MIOSA provides access to GPT-4o, Claude 3.5 Sonnet, Claude 3.7, Gemini Pro, and more. The available models depend on your plan. Pro and Enterprise plans unlock all models including early-access releases.' },
		{ id: 'g3', category: 'General',   q: 'How does the credit system work?',               a: 'Credits are consumed per API call, weighted by model cost and token count. Free plans receive 1,000 credits/month. Unused credits do not roll over. API credits (pay-as-you-go) are separate from your monthly allocation.' },
		{ id: 'b1', category: 'Billing',   q: 'When will I be charged?',                        a: 'Subscriptions are billed on the same date each month starting from your upgrade date. Pay-as-you-go API charges are billed at the end of each calendar month. You can view upcoming charges in Settings → Billing.' },
		{ id: 'b2', category: 'Billing',   q: 'Can I downgrade or cancel my plan?',             a: 'Yes. You can downgrade or cancel at any time from Settings → Billing. Changes take effect at the end of your current billing period. No partial refunds are issued for mid-cycle cancellations.' },
		{ id: 'b3', category: 'Billing',   q: 'Do you offer discounts for annual billing?',     a: 'Yes. Annual billing provides a 20% discount compared to monthly billing. You can switch to annual billing in Settings → Billing → Payment Schedule.' },
		{ id: 't1', category: 'Technical', q: 'What are the API rate limits?',                  a: 'Rate limits depend on your plan. Free: 60 req/min, 1,000 req/hr. Pro: 200 req/min, 5,000 req/hr. Enterprise: custom. Rate limit headers are included in every API response: X-RateLimit-Remaining and X-RateLimit-Reset.' },
		{ id: 't2', category: 'Technical', q: 'How do I authenticate API requests?',            a: 'All API requests require a Bearer token in the Authorization header. Generate API keys in Settings → API Keys. Keys are scoped to read, write, or admin — always use the minimum required scope.' },
		{ id: 'a1', category: 'Account',   q: 'How do I reset my password?',                   a: 'Go to the login page and click "Forgot password". Enter your email address and you will receive a reset link within 5 minutes. Links expire after 1 hour. If you use SSO, contact your workspace admin.' },
		{ id: 'a2', category: 'Account',   q: 'How do I enable two-factor authentication?',    a: 'Go to Settings → Security → Two-Factor Authentication and toggle it on. Scan the QR code with any TOTP app (Google Authenticator, Authy, 1Password). Save your backup codes in a safe location.' },
	];

	const filteredFaqs = $derived(faqs.filter(f => f.category === faqCategory));

	function toggleFaq(id: string) {
		openFaqId = openFaqId === id ? null : id;
	}

	// ── Contact Support ───────────────────────────────────────────────
	type Priority = 'low' | 'medium' | 'high' | 'urgent';
	let supportSubject = $state('');
	let supportCategory = $state('general');
	let supportPriority = $state<Priority>('medium');
	let supportMessage = $state('');
	let supportSubmitted = $state(false);

	function submitSupport() {
		if (supportSubject.trim() && supportMessage.trim()) {
			supportSubmitted = true;
		}
	}

	// ── Documentation Browser ─────────────────────────────────────────
	type DocPage = { id: string; label: string };
	type DocSection = { id: string; label: string; expanded: boolean; pages: DocPage[] };

	let docSections = $state<DocSection[]>([
		{
			id: 'start',
			label: 'Getting Started',
			expanded: true,
			pages: [
				{ id: 'intro',    label: 'Introduction' },
				{ id: 'install',  label: 'Installation' },
				{ id: 'quickstart', label: 'Quick Start' },
			],
		},
		{
			id: 'guides',
			label: 'Guides',
			expanded: true,
			pages: [
				{ id: 'auth-guide',  label: 'Authentication' },
				{ id: 'api-keys',    label: 'API Keys' },
				{ id: 'webhooks',    label: 'Webhooks' },
				{ id: 'rate-limits', label: 'Rate Limits' },
			],
		},
		{
			id: 'reference',
			label: 'API Reference',
			expanded: false,
			pages: [
				{ id: 'endpoints',  label: 'Endpoints' },
				{ id: 'errors',     label: 'Error Codes' },
				{ id: 'sdks',       label: 'SDKs' },
			],
		},
		{
			id: 'advanced',
			label: 'Advanced',
			expanded: false,
			pages: [
				{ id: 'fine-tuning',  label: 'Fine-Tuning' },
				{ id: 'embeddings',   label: 'Embeddings' },
				{ id: 'streaming',    label: 'Streaming' },
			],
		},
	]);

	let activeDocId = $state('install');

	function toggleDocSection(id: string) {
		docSections = docSections.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s);
	}

	function setActivePage(id: string) {
		activeDocId = id;
		// Expand parent if collapsed
		docSections = docSections.map(s => ({
			...s,
			expanded: s.pages.some(p => p.id === id) ? true : s.expanded,
		}));
	}

	const activeDocPage = $derived(
		docSections.flatMap(s => s.pages).find(p => p.id === activeDocId)
	);

	const activeDocSection = $derived(
		docSections.find(s => s.pages.some(p => p.id === activeDocId))
	);

	const allPages = $derived(docSections.flatMap(s => s.pages));
	const activeIndex = $derived(allPages.findIndex(p => p.id === activeDocId));
	const prevPage = $derived(activeIndex > 0 ? allPages[activeIndex - 1] : null);
	const nextPage = $derived(activeIndex < allPages.length - 1 ? allPages[activeIndex + 1] : null);
</script>

<section class="ds-section">
	<h2 class="ds-title">Help Center</h2>
	<p class="ds-desc">
		Search, FAQ accordion, support form, and documentation browser patterns.
	</p>

	<!-- ══════════════════════════════════════════════════════════════
	     1. Help Search
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Help Search</h3>
		<p class="ds-card__sub">Search bar with recent history and popular topic cards</p>

		<div class="hc-search-section">
			<!-- Search bar -->
			<div class="hc-search-wrap">
				<svg class="hc-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				<input
					class="hc-search-input"
					type="search"
					placeholder="Search help articles, guides, FAQs…"
					bind:value={searchQuery}
					onkeydown={(e) => { if (e.key === 'Enter') addRecent(searchQuery); }}
					aria-label="Search help center"
				/>
				{#if searchQuery}
					<button
						class="btn-pill btn-pill-sm btn-pill-ghost"
						onclick={() => addRecent(searchQuery)}
						aria-label="Search"
					>Search</button>
				{/if}
			</div>

			<!-- Recent searches -->
			{#if recentSearches.length > 0}
				<div class="hc-recents">
					<div class="hc-recents__label">Recent searches</div>
					<div class="hc-recents__list">
						{#each recentSearches as s}
							<button
								class="hc-recent-tag"
								onclick={() => { searchQuery = s; }}
								aria-label="Search for: {s}"
							>
								<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
								{s}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Popular topics -->
			<div class="hc-topics">
				<div class="hc-topics__label">Popular topics</div>
				<div class="hc-topics__grid">
					{#each popularTopics as topic}
						<button class="hc-topic-card" aria-label="Browse {topic.label}">
							<span class="hc-topic-card__icon" aria-hidden="true">{topic.icon}</span>
							<span class="hc-topic-card__label">{topic.label}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     2. FAQ Accordion
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">FAQ Accordion</h3>
		<p class="ds-card__sub">Expandable Q&A items with category tab navigation</p>

		<div class="hc-faq-section">
			<!-- Category tabs -->
			<div class="hc-faq-tabs" role="tablist" aria-label="FAQ categories">
				{#each (['General', 'Billing', 'Technical', 'Account'] as FaqCategory[]) as cat}
					<button
						class="hc-faq-tab {faqCategory === cat ? 'hc-faq-tab--active' : ''}"
						role="tab"
						aria-selected={faqCategory === cat}
						aria-controls="faq-panel"
						onclick={() => { faqCategory = cat; openFaqId = null; }}
					>{cat}</button>
				{/each}
			</div>

			<!-- FAQ items -->
			<div class="hc-faq-list" id="faq-panel" role="tabpanel" aria-label="{faqCategory} FAQs">
				{#each filteredFaqs as item}
					<div class="hc-faq-item" class:hc-faq-item--open={openFaqId === item.id}>
						<button
							class="hc-faq-item__trigger"
							onclick={() => toggleFaq(item.id)}
							aria-expanded={openFaqId === item.id}
							aria-controls="faq-answer-{item.id}"
						>
							<span class="hc-faq-item__q">{item.q}</span>
							<svg
								class="hc-faq-item__chevron"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
								style="transform: rotate({openFaqId === item.id ? 180 : 0}deg); transition: transform 0.2s ease;"
							>
								<polyline points="6 9 12 15 18 9"/>
							</svg>
						</button>
						{#if openFaqId === item.id}
							<div class="hc-faq-item__answer" id="faq-answer-{item.id}">
								<p>{item.a}</p>
								<div class="hc-faq-item__footer">
									<span class="hc-faq-item__helpful">Was this helpful?</span>
									<button class="btn-pill btn-pill-xs btn-pill-ghost" aria-label="Mark as helpful">Yes</button>
									<button class="btn-pill btn-pill-xs btn-pill-ghost" aria-label="Mark as not helpful">No</button>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     3. Contact Support
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Contact Support</h3>
		<p class="ds-card__sub">Support ticket form with priority selector and quick-action cards</p>

		<div class="hc-contact-layout">
			<!-- Form -->
			{#if !supportSubmitted}
				<div class="hc-support-form">
					<div class="hc-field">
						<label class="hc-label" for="sup-subject">Subject</label>
						<input
							id="sup-subject"
							class="hc-input"
							type="text"
							placeholder="Brief description of your issue"
							bind:value={supportSubject}
							aria-required="true"
						/>
					</div>

					<div class="hc-field">
						<label class="hc-label" for="sup-category">Category</label>
						<select id="sup-category" class="hc-select" bind:value={supportCategory} aria-label="Support category">
							<option value="general">General Question</option>
							<option value="billing">Billing & Payments</option>
							<option value="technical">Technical Issue</option>
							<option value="account">Account & Access</option>
							<option value="feature">Feature Request</option>
							<option value="bug">Bug Report</option>
						</select>
					</div>

					<fieldset class="hc-priority-fieldset">
						<legend class="hc-label">Priority</legend>
						<div class="hc-priority-row">
							{#each (['low', 'medium', 'high', 'urgent'] as Priority[]) as p}
								<label class="hc-priority-option {supportPriority === p ? 'hc-priority-option--active hc-priority-option--' + p : ''}">
									<input type="radio" name="priority" value={p} bind:group={supportPriority} class="hc-radio-hidden" />
									<span class="hc-priority-option__dot hc-priority-option__dot--{p}"></span>
									<span class="hc-priority-option__label">{p.charAt(0).toUpperCase() + p.slice(1)}</span>
								</label>
							{/each}
						</div>
					</fieldset>

					<div class="hc-field">
						<label class="hc-label" for="sup-message">Message</label>
						<textarea
							id="sup-message"
							class="hc-textarea"
							placeholder="Describe your issue in detail. Include steps to reproduce if applicable."
							bind:value={supportMessage}
							rows="4"
							aria-required="true"
						></textarea>
					</div>

					<div class="hc-form-footer">
						<button class="btn-pill btn-pill-ghost btn-pill-sm hc-attach-btn" aria-label="Attach file">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
							Attach File
						</button>
						<button
							class="btn-pill btn-pill-primary btn-pill-sm"
							onclick={submitSupport}
							disabled={!supportSubject.trim() || !supportMessage.trim()}
							aria-label="Submit support ticket"
						>Submit Ticket</button>
					</div>
				</div>
			{:else}
				<div class="hc-submitted">
					<div class="hc-submitted__icon" aria-hidden="true">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					</div>
					<div class="hc-submitted__title">Ticket submitted</div>
					<div class="hc-submitted__sub">We'll respond within 1-2 business days. Check your email for a confirmation.</div>
					<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => { supportSubmitted = false; supportSubject = ''; supportMessage = ''; }} aria-label="Submit another ticket">Submit Another</button>
				</div>
			{/if}

			<!-- Quick actions -->
			<div class="hc-quick-actions">
				<div class="hc-quick-actions__label">Quick Actions</div>
				<button class="hc-action-card" aria-label="Start live chat">
					<div class="hc-action-card__icon hc-action-card__icon--blue" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
					</div>
					<div class="hc-action-card__info">
						<span class="hc-action-card__title">Live Chat</span>
						<span class="hc-action-card__sub">Avg. response: 2 min</span>
					</div>
					<div class="hc-action-card__online" aria-label="Online" title="Support online"></div>
				</button>

				<button class="hc-action-card" aria-label="Email support">
					<div class="hc-action-card__icon hc-action-card__icon--purple" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					</div>
					<div class="hc-action-card__info">
						<span class="hc-action-card__title">Email Support</span>
						<span class="hc-action-card__sub">support@miosa.dev</span>
					</div>
				</button>

				<button class="hc-action-card" aria-label="Browse documentation">
					<div class="hc-action-card__icon hc-action-card__icon--amber" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
					</div>
					<div class="hc-action-card__info">
						<span class="hc-action-card__title">Documentation</span>
						<span class="hc-action-card__sub">docs.miosa.dev</span>
					</div>
					<svg class="hc-action-card__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ══════════════════════════════════════════════════════════════
	     4. Documentation Browser
	     ══════════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Documentation Browser</h3>
		<p class="ds-card__sub">Sidebar tree navigation with content area, breadcrumb, code blocks, and prev/next</p>

		<div class="hc-docs-layout">
			<!-- Sidebar -->
			<nav class="hc-docs-sidebar" aria-label="Documentation navigation">
				{#each docSections as section}
					<div class="hc-docs-sidebar__section">
						<button
							class="hc-docs-sidebar__group-btn"
							onclick={() => toggleDocSection(section.id)}
							aria-expanded={section.expanded}
							aria-label="Toggle {section.label} section"
						>
							<svg
								class="hc-docs-sidebar__chevron"
								width="10" height="10"
								viewBox="0 0 24 24" fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
								style="transform: rotate({section.expanded ? 90 : 0}deg); transition: transform 0.18s ease;"
							>
								<polyline points="9 18 15 12 9 6"/>
							</svg>
							<span class="hc-docs-sidebar__group-label">{section.label}</span>
						</button>
						{#if section.expanded}
							<ul class="hc-docs-sidebar__pages" role="list">
								{#each section.pages as page}
									<li>
										<button
											class="hc-docs-sidebar__page-btn {activeDocId === page.id ? 'hc-docs-sidebar__page-btn--active' : ''}"
											onclick={() => setActivePage(page.id)}
											aria-current={activeDocId === page.id ? 'page' : undefined}
										>{page.label}</button>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</nav>

			<!-- Content -->
			<div class="hc-docs-content">
				<!-- Breadcrumb -->
				<nav class="hc-breadcrumb" aria-label="Page location">
					<span class="hc-breadcrumb__item">Docs</span>
					<span class="hc-breadcrumb__sep" aria-hidden="true">/</span>
					<span class="hc-breadcrumb__item">{activeDocSection?.label ?? ''}</span>
					<span class="hc-breadcrumb__sep" aria-hidden="true">/</span>
					<span class="hc-breadcrumb__item hc-breadcrumb__item--active">{activeDocPage?.label ?? ''}</span>
				</nav>

				<!-- Article -->
				<article class="hc-docs-article">
					<h1 class="hc-docs-article__h1">{activeDocPage?.label ?? ''}</h1>
					<p class="hc-docs-article__p">This guide covers everything you need to know about <strong>{activeDocPage?.label?.toLowerCase()}</strong> in MIOSA. Follow the steps below to get started quickly and avoid common pitfalls.</p>

					<h2 class="hc-docs-article__h2">Prerequisites</h2>
					<p class="hc-docs-article__p">Before you begin, ensure you have the following in place:</p>
					<ul class="hc-docs-article__ul">
						<li>A MIOSA account with at least the <code class="hc-code-inline">Pro</code> plan</li>
						<li>Node.js 18+ or Python 3.10+ installed</li>
						<li>An API key generated in <strong>Settings → API Keys</strong></li>
					</ul>

					<!-- Callout -->
					<div class="hc-callout" role="note">
						<svg class="hc-callout__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
						<span>Keep your API keys secret. Never commit them to version control or expose them in client-side code.</span>
					</div>

					<h2 class="hc-docs-article__h2">Quick Example</h2>
					<p class="hc-docs-article__p">Here is a minimal example to make your first authenticated request:</p>

					<!-- Code block -->
					<div class="hc-code-block">
						<div class="hc-code-block__head">
							<span class="hc-code-block__lang">TypeScript</span>
							<button class="btn-pill btn-pill-xs btn-pill-ghost" aria-label="Copy code snippet">Copy</button>
						</div>
						<pre class="hc-code-block__body"><code>import &#123; MiosaClient &#125; from '@miosa/sdk';

const client = new MiosaClient(&#123;
  apiKey: process.env.MIOSA_API_KEY,
&#125;);

const response = await client.chat.complete(&#123;
  model: 'gpt-4o',
  messages: [&#123;
    role: 'user',
    content: 'Hello, MIOSA!',
  &#125;],
&#125;);

console.log(response.content);</code></pre>
					</div>

					<p class="hc-docs-article__p">The client handles authentication, retries, and rate limiting automatically. See the <button class="hc-link hc-link-btn" onclick={() => setActivePage('endpoints')} aria-label="Navigate to API Reference">API Reference</button> for the full list of available options.</p>
				</article>

				<!-- Prev / Next navigation -->
				<div class="hc-docs-nav">
					{#if prevPage}
						<button
							class="hc-docs-nav__btn hc-docs-nav__btn--prev"
							onclick={() => setActivePage(prevPage.id)}
							aria-label="Previous page: {prevPage.label}"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
							<div class="hc-docs-nav__btn-info">
								<span class="hc-docs-nav__btn-label">Previous</span>
								<span class="hc-docs-nav__btn-page">{prevPage.label}</span>
							</div>
						</button>
					{:else}
						<div></div>
					{/if}
					{#if nextPage}
						<button
							class="hc-docs-nav__btn hc-docs-nav__btn--next"
							onclick={() => setActivePage(nextPage.id)}
							aria-label="Next page: {nextPage.label}"
						>
							<div class="hc-docs-nav__btn-info">
								<span class="hc-docs-nav__btn-label">Next</span>
								<span class="hc-docs-nav__btn-page">{nextPage.label}</span>
							</div>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
						</button>
					{:else}
						<div></div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════════ */
	/*  HELP SEARCH                                                  */
	/* ══════════════════════════════════════════════════════════════ */
	.hc-search-section {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 640px;
	}

	.hc-search-wrap {
		display: flex;
		align-items: center;
		gap: 8px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		padding: 0 12px;
		background: var(--dbg);
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.hc-search-wrap:focus-within {
		border-color: rgba(59, 130, 246, 0.5);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.hc-search-icon {
		color: var(--dt4);
		flex-shrink: 0;
	}

	.hc-search-input {
		flex: 1;
		padding: 12px 0;
		font-size: 14px;
		font-family: inherit;
		border: none;
		background: transparent;
		color: var(--dt);
		outline: none;
	}
	.hc-search-input::placeholder { color: var(--dt4); }

	/* Recents */
	.hc-recents__label,
	.hc-topics__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
		margin-bottom: 8px;
	}

	.hc-recents__list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.hc-recent-tag {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		padding: 5px 11px;
		border: 1px solid var(--dbd);
		border-radius: 9999px;
		background: var(--dbg2);
		color: var(--dt2);
		cursor: pointer;
		font-family: inherit;
		transition: background 0.13s, color 0.13s, border-color 0.13s;
	}
	.hc-recent-tag:hover {
		background: var(--dbg3);
		color: var(--dt);
		border-color: var(--dbd2);
	}

	/* Topics grid */
	.hc-topics__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}

	@media (max-width: 600px) {
		.hc-topics__grid { grid-template-columns: repeat(2, 1fr); }
	}

	.hc-topic-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 16px 10px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		cursor: pointer;
		font-family: inherit;
		transition: background 0.13s, border-color 0.13s, transform 0.13s;
	}
	.hc-topic-card:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
		transform: translateY(-1px);
	}

	.hc-topic-card__icon {
		font-size: 22px;
		line-height: 1;
	}

	.hc-topic-card__label {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt2);
		text-align: center;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  FAQ ACCORDION                                                */
	/* ══════════════════════════════════════════════════════════════ */
	.hc-faq-section {
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 680px;
	}

	.hc-faq-tabs {
		display: flex;
		gap: 0;
		border-bottom: 1px solid var(--dbd);
		margin-bottom: 12px;
	}

	.hc-faq-tab {
		padding: 9px 16px;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt3);
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		font-family: inherit;
		transition: color 0.15s, border-color 0.15s;
		margin-bottom: -1px;
	}
	.hc-faq-tab:hover { color: var(--dt2); }
	.hc-faq-tab--active {
		color: var(--dt);
		border-bottom-color: #3b82f6;
	}

	.hc-faq-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.hc-faq-item {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		margin-bottom: 6px;
		overflow: hidden;
		background: var(--dbg);
	}
	.hc-faq-item--open {
		border-color: rgba(59, 130, 246, 0.3);
	}

	.hc-faq-item__trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 100%;
		padding: 14px 16px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: background 0.13s;
	}
	.hc-faq-item__trigger:hover { background: var(--dbg2); }

	.hc-faq-item__q {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
		line-height: 1.4;
	}

	.hc-faq-item__chevron {
		flex-shrink: 0;
		color: var(--dt3);
	}

	.hc-faq-item__answer {
		padding: 0 16px 14px;
		border-top: 1px solid var(--dbd);
	}
	.hc-faq-item__answer p {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.65;
		margin: 12px 0 10px;
	}

	.hc-faq-item__footer {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 8px;
	}

	.hc-faq-item__helpful {
		font-size: 11px;
		color: var(--dt3);
		margin-right: 4px;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  CONTACT SUPPORT                                              */
	/* ══════════════════════════════════════════════════════════════ */
	.hc-contact-layout {
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 24px;
		align-items: start;
	}

	@media (max-width: 700px) {
		.hc-contact-layout { grid-template-columns: 1fr; }
	}

	.hc-support-form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.hc-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.hc-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2);
	}

	.hc-input,
	.hc-select,
	.hc-textarea {
		padding: 9px 12px;
		font-size: 13px;
		font-family: inherit;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg2);
		color: var(--dt);
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
		width: 100%;
	}
	.hc-input:focus,
	.hc-select:focus,
	.hc-textarea:focus {
		border-color: rgba(59, 130, 246, 0.5);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}
	.hc-input::placeholder,
	.hc-textarea::placeholder { color: var(--dt4); }

	.hc-select {
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 10px center;
		padding-right: 28px;
	}

	.hc-textarea {
		resize: vertical;
		min-height: 100px;
	}

	/* Priority radio */
	.hc-priority-fieldset {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.hc-priority-row {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.hc-radio-hidden {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.hc-priority-option {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 7px 12px;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg2);
		cursor: pointer;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2);
		transition: background 0.13s, border-color 0.13s, color 0.13s;
	}
	.hc-priority-option:hover {
		background: var(--dbg3);
		color: var(--dt);
	}
	.hc-priority-option--active {
		background: var(--dbg);
		color: var(--dt);
		border-color: var(--dbd2);
	}

	.hc-priority-option__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.hc-priority-option__dot--low    { background: #22c55e; }
	.hc-priority-option__dot--medium { background: #f59e0b; }
	.hc-priority-option__dot--high   { background: #f97316; }
	.hc-priority-option__dot--urgent { background: #ef4444; }

	.hc-priority-option__label {
		text-transform: capitalize;
	}

	/* Form footer */
	.hc-form-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.hc-attach-btn {
		gap: 6px;
	}

	/* Submitted state */
	.hc-submitted {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 32px 20px;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		background: var(--dbg);
		text-align: center;
	}

	.hc-submitted__icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.25);
		color: #22c55e;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hc-submitted__title {
		font-size: 15px;
		font-weight: 600;
		color: var(--dt);
	}

	.hc-submitted__sub {
		font-size: 12px;
		color: var(--dt3);
		line-height: 1.5;
		max-width: 280px;
	}

	/* Quick actions */
	.hc-quick-actions {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.hc-quick-actions__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt3);
		margin-bottom: 2px;
	}

	.hc-action-card {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px;
		border: 1px solid var(--dbd);
		border-radius: 10px;
		background: var(--dbg);
		cursor: pointer;
		font-family: inherit;
		width: 100%;
		text-align: left;
		transition: background 0.13s, border-color 0.13s;
	}
	.hc-action-card:hover {
		background: var(--dbg2);
		border-color: var(--dbd2);
	}

	.hc-action-card__icon {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.hc-action-card__icon--blue   { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
	.hc-action-card__icon--purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
	.hc-action-card__icon--amber  { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

	.hc-action-card__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.hc-action-card__title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dt);
	}

	.hc-action-card__sub {
		font-size: 11px;
		color: var(--dt3);
	}

	.hc-action-card__online {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #22c55e;
		flex-shrink: 0;
	}

	.hc-action-card__arrow {
		color: var(--dt4);
		flex-shrink: 0;
	}

	/* ══════════════════════════════════════════════════════════════ */
	/*  DOCUMENTATION BROWSER                                        */
	/* ══════════════════════════════════════════════════════════════ */
	.hc-docs-layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 0;
		border: 1px solid var(--dbd);
		border-radius: 12px;
		overflow: hidden;
		min-height: 500px;
	}

	@media (max-width: 700px) {
		.hc-docs-layout { grid-template-columns: 1fr; }
	}

	/* Sidebar */
	.hc-docs-sidebar {
		border-right: 1px solid var(--dbd);
		background: var(--dbg2);
		padding: 12px 0;
		overflow-y: auto;
	}

	.hc-docs-sidebar__section {
		margin-bottom: 4px;
	}

	.hc-docs-sidebar__group-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: 7px 14px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt3);
		text-align: left;
		transition: color 0.13s;
	}
	.hc-docs-sidebar__group-btn:hover { color: var(--dt2); }

	.hc-docs-sidebar__chevron {
		flex-shrink: 0;
		color: inherit;
	}

	.hc-docs-sidebar__group-label {
		flex: 1;
	}

	.hc-docs-sidebar__pages {
		list-style: none;
		padding: 0;
		margin: 0 0 6px;
	}

	.hc-docs-sidebar__page-btn {
		display: block;
		width: 100%;
		padding: 6px 14px 6px 28px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 12px;
		color: var(--dt3);
		text-align: left;
		transition: color 0.13s, background 0.13s;
		border-radius: 0;
	}
	.hc-docs-sidebar__page-btn:hover {
		color: var(--dt2);
		background: var(--dbg3);
	}
	.hc-docs-sidebar__page-btn--active {
		color: #3b82f6;
		font-weight: 600;
		background: rgba(59, 130, 246, 0.08);
	}

	/* Content area */
	.hc-docs-content {
		display: flex;
		flex-direction: column;
		background: var(--dbg);
		overflow: hidden;
	}

	/* Breadcrumb */
	.hc-breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 20px;
		border-bottom: 1px solid var(--dbd);
		background: var(--dbg2);
		flex-shrink: 0;
	}

	.hc-breadcrumb__item {
		font-size: 12px;
		color: var(--dt3);
	}
	.hc-breadcrumb__item--active {
		color: var(--dt2);
		font-weight: 500;
	}

	.hc-breadcrumb__sep {
		color: var(--dt4);
		font-size: 11px;
	}

	/* Article */
	.hc-docs-article {
		flex: 1;
		padding: 20px 24px;
		overflow-y: auto;
	}

	.hc-docs-article__h1 {
		font-size: 20px;
		font-weight: 700;
		color: var(--dt);
		margin: 0 0 12px;
		line-height: 1.25;
	}

	.hc-docs-article__h2 {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		margin: 20px 0 8px;
		padding-bottom: 6px;
		border-bottom: 1px solid var(--dbd);
	}

	.hc-docs-article__p {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.65;
		margin: 0 0 10px;
	}

	.hc-docs-article__ul {
		padding: 0 0 0 18px;
		margin: 0 0 12px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.hc-docs-article__ul li {
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.5;
	}

	.hc-code-inline {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 12px;
		padding: 1px 5px;
		border-radius: 4px;
		background: var(--dbg3);
		border: 1px solid var(--dbd);
		color: var(--dt);
	}

	.hc-callout {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 12px 14px;
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 8px;
		background: rgba(59, 130, 246, 0.05);
		margin-bottom: 14px;
	}

	.hc-callout__icon {
		color: #3b82f6;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.hc-callout span {
		font-size: 12px;
		color: var(--dt2);
		line-height: 1.5;
	}

	.hc-code-block {
		border: 1px solid var(--dbd);
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 14px;
	}

	.hc-code-block__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 12px;
		background: var(--dbg2);
		border-bottom: 1px solid var(--dbd);
	}

	.hc-code-block__lang {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
	}

	.hc-code-block__body {
		margin: 0;
		padding: 14px 16px;
		background: var(--dbg);
		overflow-x: auto;
	}
	.hc-code-block__body code {
		font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
		font-size: 12px;
		line-height: 1.7;
		color: var(--dt);
		white-space: pre;
	}

	.hc-link {
		color: #3b82f6;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.hc-link-btn {
		background: none;
		border: none;
		padding: 0;
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
	}

	/* Prev / Next nav */
	.hc-docs-nav {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 20px;
		border-top: 1px solid var(--dbd);
		background: var(--dbg2);
		flex-shrink: 0;
	}

	.hc-docs-nav__btn {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border: 1px solid var(--dbd);
		border-radius: 8px;
		background: var(--dbg);
		cursor: pointer;
		font-family: inherit;
		color: var(--dt2);
		transition: background 0.13s, border-color 0.13s, color 0.13s;
		max-width: 200px;
	}
	.hc-docs-nav__btn:hover {
		background: var(--dbg3);
		border-color: var(--dbd2);
		color: var(--dt);
	}
	.hc-docs-nav__btn--next {
		margin-left: auto;
		text-align: right;
	}

	.hc-docs-nav__btn-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.hc-docs-nav__btn-label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt4);
	}

	.hc-docs-nav__btn-page {
		font-size: 12px;
		font-weight: 500;
		color: inherit;
	}
</style>
