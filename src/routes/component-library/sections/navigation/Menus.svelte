<script lang="ts">
	import { Popover } from '$lib/ui';
	import { Menu, MenuItem, MenuSeparator, MenuLabel } from '$lib/ui/menu';

	// ── 1. Model Selector ────────────────────────────────────────
	interface ModelOption {
		id: string;
		name: string;
		provider: string;
		badge?: string;
	}

	const models: ModelOption[] = [
		{ id: 'auto',    name: 'Auto',               provider: "We'll pick the best model for your task", badge: 'Recommended' },
		{ id: 'gpt5',    name: 'OpenAI GPT5.2 Chat', provider: "OpenAI's latest chat model" },
		{ id: 'gemini3', name: 'Gemini 3 Pro',        provider: "Google's latest advanced model" },
		{ id: 'claude',  name: 'Claude Sonnet 4.5',   provider: "Latest model from Anthropic" },
	];

	let selectedModel = $state('auto');
	let modelMenuOpen = $state(false);

	const selectedModelObj = $derived(models.find((m) => m.id === selectedModel) ?? models[0]);

	// ── 2. Nested Context Menu ───────────────────────────────────
	let nestedSubmenuOpen = $state<string | null>(null);
	let nestedLog         = $state('');

	function logNested(action: string) {
		nestedLog = action;
		nestedSubmenuOpen = null;
		setTimeout(() => { nestedLog = ''; }, 2000);
	}

	// ── 3. API Store Menu ────────────────────────────────────────
	interface ApiItem {
		id: string;
		icon: string;
		name: string;
		category: string;
		description: string;
		color: string;
	}

	const apiItems: ApiItem[] = [
		{ id: 'sora',    icon: 'film',    name: 'Sora 2 Pro',    category: 'Video Generation', description: 'Image-to-video & text-to-video at scale',  color: '#6366f1' },
		{ id: 'spotify', icon: 'music',   name: 'Spotify API',   category: 'Music',            description: 'Playback, playlists, and music metadata',   color: '#22c55e' },
		{ id: 'dalle',   icon: 'image',   name: 'DALL·E 4',      category: 'Image Gen',        description: 'Photorealistic image generation from text',  color: '#f97316' },
		{ id: 'maps',    icon: 'map',     name: 'Google Maps',   category: 'Geo',              description: 'Places, directions, and geocoding API',      color: '#3b82f6' },
		{ id: 'stripe',  icon: 'credit',  name: 'Stripe API',    category: 'Payments',         description: 'Accept and manage payments globally',        color: '#8b5cf6' },
	];

	let apiMenuOpen = $state(false);
	let apiMenuLog  = $state('');

	function openApi(name: string) {
		apiMenuLog = `Opened: ${name}`;
		apiMenuOpen = false;
		setTimeout(() => { apiMenuLog = ''; }, 2000);
	}

	// ── 4. Standard Dropdown (Menu component) ───────────────────
	let dropdownLog = $state('');

	function logDropdown(a: string) {
		dropdownLog = a;
		setTimeout(() => { dropdownLog = ''; }, 1500);
	}

	// ── 5. Filter Popover ────────────────────────────────────────
	let filterStatus  = $state({ active: true, archived: false, draft: true });
	let filterSort    = $state('newest');
	let filterApplied = $state(false);

	function applyFilters() {
		filterApplied = true;
		setTimeout(() => { filterApplied = false; }, 1500);
	}

	function resetFilters() {
		filterStatus = { active: true, archived: false, draft: true };
		filterSort   = 'newest';
	}

	// ── 7. User Account Menu ─────────────────────────────────────
	let accountMenuOpen = $state(false);
	let accountLog      = $state('');

	function logAccount(a: string) {
		accountLog = a;
		accountMenuOpen = false;
		setTimeout(() => { accountLog = ''; }, 1500);
	}


</script>

<section class="ds-section">
	<h2 class="ds-title">Menus &amp; Popovers</h2>
	<p class="ds-desc">Floating action lists and rich content panels. Menu and Popover components from Bits UI, plus custom CSS-driven patterns custom CSS-driven patterns.</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 1. MODEL SELECTOR DROPDOWN                                   -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Model Selector</h3>
		<p class="ds-card__sub">AI model switcher from TheOSApp — sparkle icon for "Auto", provider subtitle on each option, recommended badge, "Other models" chevron link at the bottom.</p>
		<div class="ds-demo">
			<div class="mn-mdl-wrap">
				<button
					class="mn-mdl-trigger"
					class:mn-mdl-trigger--open={modelMenuOpen}
					onclick={() => (modelMenuOpen = !modelMenuOpen)}
					aria-haspopup="listbox"
					aria-expanded={modelMenuOpen}
				>
					{#if selectedModel === 'auto'}
						<svg class="mn-mdl-trigger__sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
					{:else}
						<span class="mn-mdl-trigger__dot" aria-hidden="true"></span>
					{/if}
					<span class="mn-mdl-trigger__name">{selectedModelObj.name}</span>
					<svg class="mn-mdl-trigger__caret" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
				</button>

				{#if modelMenuOpen}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="mn-backdrop"
						onclick={() => (modelMenuOpen = false)}
						onkeydown={(e) => { if (e.key === 'Escape') modelMenuOpen = false; }}
					></div>
					<div class="mn-mdl-panel" role="listbox" aria-label="Select AI model">
						<div class="mn-mdl-panel__header">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
							Model
						</div>
						{#each models as model}
							<button
								class="mn-mdl-item"
								class:mn-mdl-item--selected={selectedModel === model.id}
								role="option"
								aria-selected={selectedModel === model.id}
								onclick={() => { selectedModel = model.id; modelMenuOpen = false; }}
							>
								<span class="mn-mdl-item__radio" aria-hidden="true">
									{#if selectedModel === model.id}<span class="mn-mdl-item__dot"></span>{/if}
								</span>
								<span class="mn-mdl-item__body">
									<span class="mn-mdl-item__row">
										{#if model.id === 'auto'}
											<svg class="mn-mdl-item__sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
										{/if}
										<span class="mn-mdl-item__name">{model.name}</span>
										{#if model.badge}
											<span class="mn-mdl-item__badge">{model.badge}</span>
										{/if}
									</span>
									<span class="mn-mdl-item__provider">{model.provider}</span>
								</span>
							</button>
						{/each}
						<div class="mn-sep"></div>
						<button class="mn-mdl-item mn-mdl-item--link" onclick={() => (modelMenuOpen = false)}>
							<span class="mn-mdl-item__radio" aria-hidden="true"></span>
							<span class="mn-mdl-item__body">
								<span class="mn-mdl-item__link-row">
									Other models
									<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
								</span>
							</span>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 2. NESTED CONTEXT MENU                -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Nested Context Menu</h3>
		<p class="ds-card__sub">Navigation sidebar — highlighted active item with blue background, chevron arrows for expandable submenus, hover reveals fly-out sub-panel.</p>
		<div class="ds-demo" style="gap: 12px; flex-wrap: wrap; align-items: flex-start;">
			<div class="mn-ctx-card">
				<button
					class="mn-ctx-item mn-ctx-item--active"
					onclick={() => logNested('Files & Folders')}
				>
					<svg class="mn-ctx-item__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
					Files &amp; Folders
				</button>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					class="mn-ctx-item mn-ctx-item--sub"
					role="button"
					tabindex="0"
					onmouseenter={() => (nestedSubmenuOpen = 'apis')}
					onmouseleave={() => (nestedSubmenuOpen = null)}
					onclick={() => logNested('APIs')}
					onkeydown={(e) => { if (e.key === 'Enter') logNested('APIs'); }}
				>
					<svg class="mn-ctx-item__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
					APIs
					<svg class="mn-ctx-item__chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					{#if nestedSubmenuOpen === 'apis'}
						<div class="mn-submenu">
							<button class="mn-submenu__item" onclick={() => logNested('REST APIs')}>REST APIs</button>
							<button class="mn-submenu__item" onclick={() => logNested('GraphQL')}>GraphQL</button>
							<button class="mn-submenu__item" onclick={() => logNested('WebSocket')}>WebSocket</button>
							<div class="mn-submenu__sep"></div>
							<button class="mn-submenu__item mn-submenu__item--add" onclick={() => logNested('New API')}>
								<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
								New API
							</button>
						</div>
					{/if}
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					class="mn-ctx-item mn-ctx-item--sub"
					role="button"
					tabindex="0"
					onmouseenter={() => (nestedSubmenuOpen = 'app')}
					onmouseleave={() => (nestedSubmenuOpen = null)}
					onclick={() => logNested('App')}
					onkeydown={(e) => { if (e.key === 'Enter') logNested('App'); }}
				>
					<svg class="mn-ctx-item__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
					App
					<svg class="mn-ctx-item__chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					{#if nestedSubmenuOpen === 'app'}
						<div class="mn-submenu">
							<button class="mn-submenu__item" onclick={() => logNested('Settings')}>Settings</button>
							<button class="mn-submenu__item" onclick={() => logNested('Extensions')}>Extensions</button>
							<button class="mn-submenu__item" onclick={() => logNested('Plugins')}>Plugins</button>
						</div>
					{/if}
				</div>
				<div class="mn-ctx-sep"></div>
				<button class="mn-ctx-item" onclick={() => logNested('New Chat')}>
					<svg class="mn-ctx-item__icon mn-ctx-item__icon--muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
					New Chat
				</button>
			</div>
			{#if nestedLog}
				<div class="mn-feedback">{nestedLog}</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 3. API STORE MENU                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">API Store Menu</h3>
		<p class="ds-card__sub">Scrollable list — emoji icon + bold name + colour-coded category badge + description. "APIs Store" link and "+ New Chat" action pinned to the bottom.</p>
		<div class="ds-demo">
			<div class="mn-api-wrap">
				<button
					class="mn-api-trigger"
					class:mn-api-trigger--open={apiMenuOpen}
					onclick={() => (apiMenuOpen = !apiMenuOpen)}
					aria-haspopup="true"
					aria-expanded={apiMenuOpen}
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
					API Store
					<svg class="mn-api-trigger__caret" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
				</button>

				{#if apiMenuOpen}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="mn-backdrop"
						onclick={() => (apiMenuOpen = false)}
						onkeydown={(e) => { if (e.key === 'Escape') apiMenuOpen = false; }}
					></div>
					<div class="mn-api-panel">
						<div class="mn-api-panel__header">
							<span>APIs</span>
							<span class="mn-api-panel__count">{apiItems.length}</span>
						</div>
						<div class="mn-api-list">
							{#each apiItems as api}
								<button class="mn-api-item" onclick={() => openApi(api.name)}>
									<span class="mn-api-item__icon" style="background: {api.color}18; color: {api.color};" aria-hidden="true">
										{#if api.icon === 'film'}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
										{:else if api.icon === 'music'}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
										{:else if api.icon === 'image'}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
										{:else if api.icon === 'map'}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
										{:else if api.icon === 'credit'}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
										{/if}
									</span>
									<span class="mn-api-item__body">
										<span class="mn-api-item__row">
											<span class="mn-api-item__name">{api.name}</span>
											<span class="mn-api-item__badge" style="background: {api.color}14; color: {api.color};">{api.category}</span>
										</span>
										<span class="mn-api-item__desc">{api.description}</span>
									</span>
								</button>
							{/each}
						</div>
						<div class="mn-sep" style="margin: 0;"></div>
						<button class="mn-api-panel__store-link" onclick={() => (apiMenuOpen = false)}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
							APIs Store
						</button>
						<div class="mn-sep" style="margin: 0;"></div>
						<button class="mn-api-panel__new-chat" onclick={() => openApi('New Chat')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
							+ New Chat
						</button>
					</div>
				{/if}
			</div>
			{#if apiMenuLog}
				<div class="mn-feedback">{apiMenuLog}</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 4. STANDARD DROPDOWN MENU (Menu component)                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dropdown Menu</h3>
		<p class="ds-card__sub">Built on the Menu Bits UI primitive — labels, icons, keyboard shortcuts, separators, disabled state, destructive items. Three trigger styles: text, icon-only, and vertical-dots.</p>
		<div class="ds-demo" style="gap: 10px; flex-wrap: wrap;">

			<Menu>
				{#snippet trigger()}
					<button class="btn-pill btn-pill-secondary btn-pill-sm">
						Actions
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
					</button>
				{/snippet}
				<MenuLabel>Document</MenuLabel>
				<MenuItem onSelect={() => logDropdown('Renamed')}>
					{#snippet prefix()}<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>{/snippet}
					Rename
				</MenuItem>
				<MenuItem onSelect={() => logDropdown('Duplicated')} shortcut="⌘D">
					{#snippet prefix()}<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>{/snippet}
					Duplicate
				</MenuItem>
				<MenuItem onSelect={() => logDropdown('Moved')}>
					{#snippet prefix()}<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>{/snippet}
					Move to…
				</MenuItem>
				<MenuItem onSelect={() => logDropdown('Shared')} shortcut="⌘⇧S">
					{#snippet prefix()}<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>{/snippet}
					Share
				</MenuItem>
				<MenuSeparator />
				<MenuItem onSelect={() => {}} disabled>Lock (no permission)</MenuItem>
				<MenuSeparator />
				<MenuLabel>Danger Zone</MenuLabel>
				<MenuItem onSelect={() => logDropdown('Deleted')} destructive shortcut="⌫">
					{#snippet prefix()}<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>{/snippet}
					Delete
				</MenuItem>
			</Menu>

			<Menu>
				{#snippet trigger()}
					<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm" aria-label="More options">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
					</button>
				{/snippet}
				<MenuItem onSelect={() => logDropdown('View details')}>View Details</MenuItem>
				<MenuItem onSelect={() => logDropdown('Edited')} shortcut="⌘E">Edit</MenuItem>
				<MenuItem onSelect={() => logDropdown('Assigned')}>Assign to…</MenuItem>
				<MenuSeparator />
				<MenuItem onSelect={() => logDropdown('Removed')} destructive>Remove</MenuItem>
			</Menu>

			<Menu>
				{#snippet trigger()}
					<button class="btn-pill btn-pill-icon btn-pill-outline btn-pill-sm" aria-label="Status options">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
					</button>
				{/snippet}
				<MenuLabel>Status</MenuLabel>
				<MenuItem onSelect={() => logDropdown('Marked active')}>Mark as Active</MenuItem>
				<MenuItem onSelect={() => logDropdown('Marked paused')}>Mark as Paused</MenuItem>
				<MenuItem onSelect={() => logDropdown('Archived')}>Archive</MenuItem>
			</Menu>

			{#if dropdownLog}
				<div class="mn-feedback">{dropdownLog}</div>
			{/if}
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 5. POPOVER FILTER PANEL                                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Popover — Filter Panel</h3>
		<p class="ds-card__sub">Popover component wrapping a form — checkbox status filters, radio sort order, active filter count badge on the trigger, Apply and Reset controls.</p>
		<div class="ds-demo">
			<Popover align="start">
				{#snippet trigger()}
					<button class="btn-pill btn-pill-secondary btn-pill-sm">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
						Filters
						{#if filterStatus.active || filterStatus.draft}
							<span class="mn-filter-badge">
								{[filterStatus.active, filterStatus.draft].filter(Boolean).length}
							</span>
						{/if}
					</button>
				{/snippet}
				<div class="mn-pop-form">
					<div class="mn-pop-form__header">
						<span>Filters</span>
						<button class="btn-pill btn-pill-ghost btn-pill-xs" onclick={resetFilters}>Reset</button>
					</div>
					<div class="mn-pop-form__section">
						<div class="mn-pop-form__label">Status</div>
						<label class="mn-pop-form__check">
							<input type="checkbox" bind:checked={filterStatus.active} />
							<span>Active</span>
						</label>
						<label class="mn-pop-form__check">
							<input type="checkbox" bind:checked={filterStatus.archived} />
							<span>Archived</span>
						</label>
						<label class="mn-pop-form__check">
							<input type="checkbox" bind:checked={filterStatus.draft} />
							<span>Draft</span>
						</label>
					</div>
					<div class="mn-pop-form__section">
						<div class="mn-pop-form__label">Sort by</div>
						<label class="mn-pop-form__radio">
							<input type="radio" name="mn-sort" value="newest" bind:group={filterSort} />
							<span>Newest first</span>
						</label>
						<label class="mn-pop-form__radio">
							<input type="radio" name="mn-sort" value="oldest" bind:group={filterSort} />
							<span>Oldest first</span>
						</label>
						<label class="mn-pop-form__radio">
							<input type="radio" name="mn-sort" value="alpha" bind:group={filterSort} />
							<span>Alphabetical</span>
						</label>
					</div>
					<div class="mn-pop-form__footer">
						{#if filterApplied}
							<span class="mn-pop-form__success">Applied!</span>
						{/if}
						<button class="btn-pill btn-pill-primary btn-pill-sm" style="margin-left: auto;" onclick={applyFilters}>
							Apply
						</button>
					</div>
				</div>
			</Popover>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 6. POPOVER — RICH USER PROFILE                               -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Popover — Rich Content</h3>
		<p class="ds-card__sub">Avatar trigger opens a Popover with name, email, role badge, stat summary row (Tasks / Projects / Teams), and contextual action buttons.</p>
		<div class="ds-demo">
			<Popover align="start" sideOffset={8}>
				{#snippet trigger()}
					<button class="mn-avatar-btn" aria-label="Open profile">
						<span class="mn-avatar-btn__initials">JL</span>
					</button>
				{/snippet}
				<div class="mn-profile">
					<div class="mn-profile__header">
						<div class="mn-profile__avatar" aria-hidden="true">JL</div>
						<div class="mn-profile__info">
							<div class="mn-profile__name">Jamie Lin</div>
							<div class="mn-profile__email">jamie@company.com</div>
							<span class="mn-profile__role">Admin</span>
						</div>
					</div>
					<div class="mn-profile__sep"></div>
					<div class="mn-profile__stats">
						<div class="mn-profile__stat">
							<span class="mn-profile__stat-val">142</span>
							<span class="mn-profile__stat-lbl">Tasks</span>
						</div>
						<div class="mn-profile__stat-div"></div>
						<div class="mn-profile__stat">
							<span class="mn-profile__stat-val">8</span>
							<span class="mn-profile__stat-lbl">Projects</span>
						</div>
						<div class="mn-profile__stat-div"></div>
						<div class="mn-profile__stat">
							<span class="mn-profile__stat-val">3</span>
							<span class="mn-profile__stat-lbl">Teams</span>
						</div>
					</div>
					<div class="mn-profile__sep"></div>
					<div class="mn-profile__actions">
						<button class="mn-profile__action">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
							Settings
						</button>
						<button class="mn-profile__action">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
							Notifications
						</button>
						<button class="mn-profile__action mn-profile__action--danger">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
							Sign Out
						</button>
					</div>
				</div>
			</Popover>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- 7. USER ACCOUNT MENU                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<div class="ds-card">
		<h3 class="ds-card__title">User Account Menu</h3>
		<p class="ds-card__sub">Pill-shaped avatar + name trigger opens a custom dropdown — profile header, account management, support links with keyboard shortcut hint, and a destructive sign-out.</p>
		<div class="ds-demo">
			<div class="mn-acct-wrap">
				<button
					class="mn-acct-trigger"
					class:mn-acct-trigger--open={accountMenuOpen}
					onclick={() => (accountMenuOpen = !accountMenuOpen)}
					aria-haspopup="true"
					aria-expanded={accountMenuOpen}
				>
					<span class="mn-acct-trigger__avatar" aria-hidden="true">SR</span>
					<span class="mn-acct-trigger__name">Sam Rivera</span>
					<svg class="mn-acct-trigger__caret" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
				</button>

				{#if accountMenuOpen}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="mn-backdrop"
						onclick={() => (accountMenuOpen = false)}
						onkeydown={(e) => { if (e.key === 'Escape') accountMenuOpen = false; }}
					></div>
					<div class="mn-acct-panel">
						<div class="mn-acct-profile">
							<div class="mn-acct-profile__avatar" aria-hidden="true">SR</div>
							<div class="mn-acct-profile__info">
								<div class="mn-acct-profile__name">Sam Rivera</div>
								<div class="mn-acct-profile__email">sam@example.com</div>
							</div>
						</div>
						<div class="mn-sep"></div>
						<button class="mn-acct-item" onclick={() => logAccount('Account Settings')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
							Account Settings
						</button>
						<button class="mn-acct-item" onclick={() => logAccount('Billing')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
							Billing
						</button>
						<button class="mn-acct-item" onclick={() => logAccount('Team Management')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
							Team Management
						</button>
						<div class="mn-sep"></div>
						<button class="mn-acct-item" onclick={() => logAccount('Help & Support')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
							Help &amp; Support
						</button>
						<button class="mn-acct-item" onclick={() => logAccount('Keyboard Shortcuts')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
							Keyboard Shortcuts
							<span class="mn-acct-item__shortcut">?</span>
						</button>
						<div class="mn-sep"></div>
						<button class="mn-acct-item mn-acct-item--danger" onclick={() => logAccount('Signed out')}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
							Sign Out
						</button>
					</div>
				{/if}
			</div>
			{#if accountLog}
				<div class="mn-feedback">{accountLog}</div>
			{/if}
		</div>
	</div>

</section>

<style>
	/* ── Shared: feedback chip ───────────────────────────────────── */
	.mn-feedback {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 500;
		color: var(--dt2);
		background: var(--dbg2, rgba(0,0,0,0.04));
		border: 1px solid var(--dbd, rgba(0,0,0,0.08));
		animation: mn-fade-in 0.15s ease-out;
	}

	@keyframes mn-fade-in {
		from { opacity: 0; transform: translateY(2px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* Shared: separator line */
	.mn-sep {
		height: 1px;
		background: var(--dbd, rgba(0,0,0,0.07));
		margin: 4px 0;
	}

	/* Shared: click-away backdrop */
	.mn-backdrop {
		position: fixed;
		inset: 0;
		z-index: 990;
	}

	/* Shared: panel entrance animation */
	@keyframes mn-panel-in {
		from { opacity: 0; transform: scale(0.96) translateY(-4px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  1. MODEL SELECTOR                                           */
	/* ═══════════════════════════════════════════════════════════ */
	.mn-mdl-wrap {
		position: relative;
		display: inline-block;
	}

	.mn-mdl-trigger {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 12px 7px 10px;
		border-radius: 8px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.12));
		background: var(--dbg, #fff);
		box-shadow: 0 1px 2px rgba(0,0,0,0.06);
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.mn-mdl-trigger:hover {
		border-color: var(--dbd2, rgba(0,0,0,0.2));
		box-shadow: 0 2px 6px rgba(0,0,0,0.08);
	}

	.mn-mdl-trigger--open {
		border-color: var(--dt, #121212);
		box-shadow: 0 0 0 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.06);
	}

	.mn-mdl-trigger__sparkle {
		width: 14px;
		height: 14px;
		color: #8b5cf6;
		flex-shrink: 0;
	}

	.mn-mdl-trigger__dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dt3, rgba(0,0,0,0.35));
		flex-shrink: 0;
	}

	.mn-mdl-trigger__name {
		flex: 1;
		white-space: nowrap;
	}

	.mn-mdl-trigger__caret {
		width: 14px;
		height: 14px;
		color: var(--dt3, rgba(0,0,0,0.35));
		transition: transform 0.15s;
		flex-shrink: 0;
	}

	.mn-mdl-trigger--open .mn-mdl-trigger__caret {
		transform: rotate(180deg);
	}

	.mn-mdl-panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 1000;
		min-width: 300px;
		padding: 6px;
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
		animation: mn-panel-in 0.12s ease-out;
	}

	.mn-mdl-panel__header {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt4, rgba(0,0,0,0.3));
		padding: 4px 10px 6px;
	}

	.mn-mdl-panel__header svg {
		width: 12px;
		height: 12px;
	}

	.mn-mdl-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border-radius: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background 0.1s;
	}

	.mn-mdl-item:hover         { background: var(--dbg2, rgba(0,0,0,0.04)); }
	.mn-mdl-item--selected     { background: var(--dbg3, rgba(0,0,0,0.06)); }

	.mn-mdl-item__radio {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1.5px solid var(--dbd2, rgba(0,0,0,0.2));
		flex-shrink: 0;
	}

	.mn-mdl-item--selected .mn-mdl-item__radio { border-color: var(--dt, #121212); }

	.mn-mdl-item__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--dt, #121212);
	}

	.mn-mdl-item__body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.mn-mdl-item__row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.mn-mdl-item__sparkle {
		width: 12px;
		height: 12px;
		color: #8b5cf6;
		flex-shrink: 0;
	}

	.mn-mdl-item__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #121212);
	}

	.mn-mdl-item__badge {
		display: inline-flex;
		align-items: center;
		padding: 1px 7px;
		border-radius: 20px;
		font-size: 10px;
		font-weight: 600;
		background: rgba(0,120,255,0.1);
		color: #0070d8;
		letter-spacing: 0.01em;
		white-space: nowrap;
	}

	.mn-mdl-item__provider {
		font-size: 12px;
		color: var(--dt3, rgba(0,0,0,0.45));
		line-height: 1.4;
	}

	.mn-mdl-item--link .mn-mdl-item__link-row {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		font-weight: 500;
		color: #0070d8;
	}

	.mn-mdl-item--link .mn-mdl-item__link-row svg {
		width: 12px;
		height: 12px;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  2. NESTED CONTEXT MENU                                      */
	/* ═══════════════════════════════════════════════════════════ */
	.mn-ctx-card {
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 10px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);
		padding: 4px;
		min-width: 200px;
	}

	.mn-ctx-sep {
		height: 1px;
		background: var(--dbd, rgba(0,0,0,0.07));
		margin: 4px 0;
	}

	.mn-ctx-item {
		position: relative;
		display: flex;
		align-items: center;
		gap: 9px;
		width: 100%;
		padding: 7px 10px;
		border-radius: 7px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		text-align: left;
		transition: background 0.1s;
		user-select: none;
	}

	.mn-ctx-item:hover               { background: var(--dbg2, rgba(0,0,0,0.04)); }
	.mn-ctx-item--active             { background: rgba(59,130,246,0.1); color: #2563eb; }
	.mn-ctx-item--active:hover       { background: rgba(59,130,246,0.14); }
	.mn-ctx-item--sub                { padding-right: 8px; }

	.mn-ctx-item__icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		color: currentColor;
	}

	.mn-ctx-item__icon--muted { color: var(--dt3, rgba(0,0,0,0.4)); }

	.mn-ctx-item__chevron {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		margin-left: auto;
		color: var(--dt3, rgba(0,0,0,0.35));
	}

	.mn-submenu {
		position: absolute;
		top: -4px;
		left: calc(100% + 4px);
		z-index: 1001;
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 10px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
		padding: 4px;
		min-width: 160px;
		animation: mn-panel-in 0.1s ease-out;
	}

	.mn-submenu__item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 7px 10px;
		border-radius: 6px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		text-align: left;
		transition: background 0.1s;
	}

	.mn-submenu__item:hover { background: var(--dbg2, rgba(0,0,0,0.04)); }

	.mn-submenu__item svg {
		width: 14px;
		height: 14px;
		color: var(--dt3, rgba(0,0,0,0.4));
	}

	.mn-submenu__item--add { color: var(--dt2, rgba(0,0,0,0.6)); }

	.mn-submenu__sep {
		height: 1px;
		background: var(--dbd, rgba(0,0,0,0.07));
		margin: 4px 0;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  3. API STORE MENU                                           */
	/* ═══════════════════════════════════════════════════════════ */
	.mn-api-wrap {
		position: relative;
		display: inline-block;
	}

	.mn-api-trigger {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 12px;
		border-radius: 8px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.12));
		background: var(--dbg, #fff);
		box-shadow: 0 1px 2px rgba(0,0,0,0.06);
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.mn-api-trigger svg {
		width: 15px;
		height: 15px;
		color: var(--dt3, rgba(0,0,0,0.4));
		flex-shrink: 0;
	}

	.mn-api-trigger:hover {
		border-color: var(--dbd2, rgba(0,0,0,0.2));
		box-shadow: 0 2px 6px rgba(0,0,0,0.08);
	}

	.mn-api-trigger--open { border-color: var(--dt, #121212); }

	.mn-api-trigger__caret {
		width: 14px;
		height: 14px;
		color: var(--dt3, rgba(0,0,0,0.35));
		transition: transform 0.15s;
		flex-shrink: 0;
	}

	.mn-api-trigger--open .mn-api-trigger__caret { transform: rotate(180deg); }

	.mn-api-panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 1000;
		min-width: 320px;
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
		animation: mn-panel-in 0.12s ease-out;
		overflow: hidden;
	}

	.mn-api-panel__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px 8px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt3, rgba(0,0,0,0.4));
	}

	.mn-api-panel__count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9px;
		font-size: 10px;
		font-weight: 700;
		background: var(--dbg2, rgba(0,0,0,0.05));
		color: var(--dt3);
	}

	.mn-api-list {
		max-height: 240px;
		overflow-y: auto;
		padding: 2px 6px;
	}

	.mn-api-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		width: 100%;
		padding: 8px;
		border-radius: 8px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		transition: background 0.1s;
	}

	.mn-api-item:hover { background: var(--dbg2, rgba(0,0,0,0.04)); }

	.mn-api-item__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 9px;
		font-size: 16px;
		flex-shrink: 0;
		line-height: 1;
	}

	.mn-api-item__body {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;
		min-width: 0;
	}

	.mn-api-item__row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.mn-api-item__name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #121212);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mn-api-item__badge {
		display: inline-flex;
		align-items: center;
		padding: 1px 7px;
		border-radius: 20px;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.01em;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.mn-api-item__desc {
		font-size: 12px;
		color: var(--dt3, rgba(0,0,0,0.45));
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mn-api-panel__store-link {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 10px 14px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 600;
		color: #0070d8;
		transition: background 0.1s;
		text-align: left;
	}

	.mn-api-panel__store-link svg {
		width: 15px;
		height: 15px;
		flex-shrink: 0;
	}

	.mn-api-panel__store-link:hover { background: rgba(0,112,216,0.04); }

	.mn-api-panel__new-chat {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 10px 14px;
		border: none;
		background: var(--dbg2, rgba(0,0,0,0.02));
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #121212);
		transition: background 0.1s;
		text-align: left;
	}

	.mn-api-panel__new-chat svg {
		width: 15px;
		height: 15px;
		color: var(--dt3, rgba(0,0,0,0.4));
		flex-shrink: 0;
	}

	.mn-api-panel__new-chat:hover { background: var(--dbg3, rgba(0,0,0,0.05)); }

	/* ═══════════════════════════════════════════════════════════ */
	/*  5. POPOVER FILTER FORM                                      */
	/* ═══════════════════════════════════════════════════════════ */
	.mn-filter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		border-radius: 8px;
		font-size: 10px;
		font-weight: 700;
		background: var(--dt, #121212);
		color: var(--dbg, #fff);
		line-height: 1;
	}

	.mn-pop-form {
		display: flex;
		flex-direction: column;
		gap: 0;
		min-width: 220px;
	}

	.mn-pop-form__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		font-size: 14px;
		font-weight: 600;
		color: var(--dt, #121212);
	}

	.mn-pop-form__section {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 12px;
	}

	.mn-pop-form__label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--dt4, rgba(0,0,0,0.3));
		margin-bottom: 2px;
	}

	.mn-pop-form__check,
	.mn-pop-form__radio {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: var(--dt, #121212);
		cursor: pointer;
		user-select: none;
	}

	.mn-pop-form__check input,
	.mn-pop-form__radio input {
		accent-color: var(--dt, #121212);
		cursor: pointer;
	}

	.mn-pop-form__footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		padding-top: 4px;
		border-top: 1px solid var(--dbd, rgba(0,0,0,0.07));
		margin-top: 4px;
	}

	.mn-pop-form__success {
		font-size: 12px;
		font-weight: 500;
		color: #16a34a;
		margin-right: auto;
	}

	/* ═══════════════════════════════════════════════════════════ */
	/*  6. PROFILE POPOVER                                          */
	/* ═══════════════════════════════════════════════════════════ */
	.mn-avatar-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
		font-size: 13px;
		font-weight: 700;
		border: none;
		cursor: pointer;
		box-shadow: 0 0 0 2px var(--dbg, #fff), 0 0 0 4px rgba(102,126,234,0.3);
		transition: box-shadow 0.15s;
	}

	.mn-avatar-btn:hover {
		box-shadow: 0 0 0 2px var(--dbg, #fff), 0 0 0 4px rgba(102,126,234,0.5);
	}

	.mn-avatar-btn__initials {
		pointer-events: none;
		user-select: none;
	}

	.mn-profile {
		min-width: 240px;
		display: flex;
		flex-direction: column;
	}

	.mn-profile__header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-bottom: 12px;
	}

	.mn-profile__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
		font-size: 13px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.mn-profile__info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }

	.mn-profile__name {
		font-size: 14px;
		font-weight: 700;
		color: var(--dt, #121212);
	}

	.mn-profile__email {
		font-size: 12px;
		color: var(--dt3, rgba(0,0,0,0.45));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mn-profile__role {
		display: inline-flex;
		align-items: center;
		padding: 1px 7px;
		border-radius: 20px;
		font-size: 10px;
		font-weight: 700;
		background: rgba(102,126,234,0.12);
		color: #5b6fd6;
		letter-spacing: 0.02em;
		align-self: flex-start;
	}

	.mn-profile__sep {
		height: 1px;
		background: var(--dbd, rgba(0,0,0,0.07));
		margin: 4px 0;
	}

	.mn-profile__stats {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
	}

	.mn-profile__stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1px;
		flex: 1;
	}

	.mn-profile__stat-val {
		font-size: 16px;
		font-weight: 700;
		color: var(--dt, #121212);
		line-height: 1;
	}

	.mn-profile__stat-lbl {
		font-size: 11px;
		color: var(--dt4, rgba(0,0,0,0.3));
	}

	.mn-profile__stat-div {
		width: 1px;
		height: 28px;
		background: var(--dbd, rgba(0,0,0,0.07));
	}

	.mn-profile__actions {
		display: flex;
		flex-direction: column;
		gap: 1px;
		padding-top: 4px;
	}

	.mn-profile__action {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 4px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		border-radius: 6px;
		text-align: left;
		transition: background 0.1s;
	}

	.mn-profile__action:hover { background: var(--dbg2, rgba(0,0,0,0.04)); }

	.mn-profile__action svg {
		width: 16px;
		height: 16px;
		color: var(--dt3, rgba(0,0,0,0.4));
		flex-shrink: 0;
	}

	.mn-profile__action--danger            { color: #eb4335; }
	.mn-profile__action--danger svg        { color: rgba(235,67,53,0.7); }
	.mn-profile__action--danger:hover      { background: rgba(235,67,53,0.06); }

	/* ═══════════════════════════════════════════════════════════ */
	/*  7. USER ACCOUNT MENU                                        */
	/* ═══════════════════════════════════════════════════════════ */
	.mn-acct-wrap {
		position: relative;
		display: inline-block;
	}

	.mn-acct-trigger {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 5px 10px 5px 5px;
		border-radius: 20px;
		border: 1px solid var(--dbd, rgba(0,0,0,0.12));
		background: var(--dbg, #fff);
		box-shadow: 0 1px 2px rgba(0,0,0,0.06);
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.mn-acct-trigger:hover {
		border-color: var(--dbd2, rgba(0,0,0,0.2));
		box-shadow: 0 2px 6px rgba(0,0,0,0.08);
	}

	.mn-acct-trigger--open {
		border-color: var(--dt, #121212);
		box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
	}

	.mn-acct-trigger__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.mn-acct-trigger__name   { flex: 1; white-space: nowrap; }

	.mn-acct-trigger__caret {
		width: 14px;
		height: 14px;
		color: var(--dt3, rgba(0,0,0,0.35));
		transition: transform 0.15s;
		flex-shrink: 0;
	}

	.mn-acct-trigger--open .mn-acct-trigger__caret { transform: rotate(180deg); }

	.mn-acct-panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 1000;
		min-width: 240px;
		padding: 6px;
		background: var(--dbg, #fff);
		border: 1px solid var(--dbd, rgba(0,0,0,0.1));
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
		animation: mn-panel-in 0.12s ease-out;
	}

	.mn-acct-profile {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 8px 10px;
	}

	.mn-acct-profile__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.mn-acct-profile__info  { display: flex; flex-direction: column; gap: 1px; }

	.mn-acct-profile__name {
		font-size: 13px;
		font-weight: 700;
		color: var(--dt, #121212);
	}

	.mn-acct-profile__email {
		font-size: 12px;
		color: var(--dt3, rgba(0,0,0,0.45));
	}

	.mn-acct-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 7px 10px;
		border-radius: 7px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		color: var(--dt, #121212);
		text-align: left;
		transition: background 0.1s;
	}

	.mn-acct-item:hover { background: var(--dbg2, rgba(0,0,0,0.04)); }

	.mn-acct-item svg {
		width: 15px;
		height: 15px;
		color: var(--dt3, rgba(0,0,0,0.4));
		flex-shrink: 0;
	}

	.mn-acct-item__shortcut {
		margin-left: auto;
		font-size: 11px;
		font-weight: 600;
		color: var(--dt4, rgba(0,0,0,0.3));
		background: var(--dbg2, rgba(0,0,0,0.05));
		border-radius: 4px;
		padding: 1px 6px;
	}

	.mn-acct-item--danger              { color: #eb4335; }
	.mn-acct-item--danger svg          { color: rgba(235,67,53,0.65); }
	.mn-acct-item--danger:hover        { background: rgba(235,67,53,0.06); }

	/* ─── Dark mode overrides for inverted elements ─────────────── */
	:global(.dark) .mn-mdl-item__dot {
		background: #e5e5e5;
	}
</style>
