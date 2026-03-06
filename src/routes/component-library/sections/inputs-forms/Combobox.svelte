<script lang="ts">
	// ── 1. Basic Combobox ──────────────────────────────────────────────
	const countries = [
		'Argentina', 'Australia', 'Brazil', 'Canada', 'Chile',
		'Denmark', 'Egypt', 'Finland', 'France', 'Germany',
		'Greece', 'Hungary', 'India', 'Indonesia', 'Ireland',
		'Italy', 'Japan', 'Kenya', 'Mexico', 'Netherlands',
		'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Peru',
		'Poland', 'Portugal', 'South Africa', 'Spain', 'Sweden',
		'Switzerland', 'Thailand', 'Turkey', 'Ukraine', 'United Kingdom',
		'United States', 'Vietnam',
	];
	let basicQuery = $state('');
	let basicOpen = $state(false);
	let basicSelected = $state('');
	const basicFiltered = $derived(
		basicQuery.trim() === ''
			? countries
			: countries.filter((c) => c.toLowerCase().includes(basicQuery.toLowerCase()))
	);
	function basicSelect(c: string) {
		basicSelected = c;
		basicQuery = c;
		basicOpen = false;
	}
	function basicFocus() {
		basicOpen = true;
		if (basicSelected) basicQuery = '';
	}
	function basicBlur() {
		setTimeout(() => { basicOpen = false; if (!basicSelected || basicQuery !== basicSelected) { basicQuery = basicSelected; } }, 150);
	}

	// ── 2. Combobox with Icons ─────────────────────────────────────────
	const iconOptions = [
		{ label: 'React',      color: '#60a5fa', abbr: 'Re' },
		{ label: 'Svelte',     color: '#f97316', abbr: 'Sv' },
		{ label: 'Vue',        color: '#4ade80', abbr: 'Vu' },
		{ label: 'Angular',    color: '#f43f5e', abbr: 'An' },
		{ label: 'Solid',      color: '#818cf8', abbr: 'So' },
		{ label: 'Astro',      color: '#e879f9', abbr: 'As' },
		{ label: 'Next.js',    color: '#e2e8f0', abbr: 'Nx' },
		{ label: 'Nuxt',       color: '#34d399', abbr: 'Nu' },
		{ label: 'Remix',      color: '#fb923c', abbr: 'Rm' },
		{ label: 'Qwik',       color: '#a78bfa', abbr: 'Qw' },
	];
	let iconQuery = $state('');
	let iconOpen = $state(false);
	let iconSelected = $state<typeof iconOptions[0] | null>(null);
	const iconFiltered = $derived(
		iconQuery.trim() === ''
			? iconOptions
			: iconOptions.filter((o) => o.label.toLowerCase().includes(iconQuery.toLowerCase()))
	);
	function iconSelect(o: typeof iconOptions[0]) {
		iconSelected = o;
		iconQuery = o.label;
		iconOpen = false;
	}
	function iconFocus() {
		iconOpen = true;
		if (iconSelected) iconQuery = '';
	}
	function iconBlur() {
		setTimeout(() => {
			iconOpen = false;
			if (iconSelected) iconQuery = iconSelected.label;
			else iconQuery = '';
		}, 150);
	}

	// ── 3. Multi-Select Combobox ───────────────────────────────────────
	const techOptions = [
		'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust',
		'PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'SQLite',
		'Docker', 'Kubernetes', 'Terraform', 'AWS', 'GCP',
		'GraphQL', 'REST', 'gRPC', 'WebSocket', 'SSE',
	];
	let multiQuery = $state('');
	let multiOpen = $state(false);
	let multiSelected = $state<string[]>(['TypeScript', 'PostgreSQL']);
	const multiFiltered = $derived(
		multiQuery.trim() === ''
			? techOptions.filter((t) => !multiSelected.includes(t))
			: techOptions.filter((t) => t.toLowerCase().includes(multiQuery.toLowerCase()) && !multiSelected.includes(t))
	);
	function multiAdd(t: string) {
		multiSelected = [...multiSelected, t];
		multiQuery = '';
	}
	function multiRemove(t: string) {
		multiSelected = multiSelected.filter((s) => s !== t);
	}
	function multiKeydown(e: KeyboardEvent) {
		if (e.key === 'Backspace' && multiQuery === '' && multiSelected.length > 0) {
			multiSelected = multiSelected.slice(0, -1);
		}
		if (e.key === 'Escape') multiOpen = false;
	}
	function multiFocus() { multiOpen = true; }
	function multiBlur() { setTimeout(() => { multiOpen = false; }, 150); }

	// ── 4. Combobox States ─────────────────────────────────────────────
	const stateOptions = ['Option Alpha', 'Option Beta', 'Option Gamma', 'Option Delta'];
	let stateActiveOpen = $state(true);
	let stateActiveQuery = $state('');
	const stateFiltered = $derived(
		stateActiveQuery.trim() === ''
			? stateOptions
			: stateOptions.filter((o) => o.toLowerCase().includes(stateActiveQuery.toLowerCase()))
	);

	// ── 5. Combobox Sizes ─────────────────────────────────────────────
	const sizeOptions = ['Design System', 'Component Library', 'Pattern Library', 'Style Guide', 'Token Set'];
	let smQuery = $state(''); let smOpen = $state(false); let smSelected = $state('');
	let mdQuery = $state(''); let mdOpen = $state(false); let mdSelected = $state('');
	let lgQuery = $state(''); let lgOpen = $state(false); let lgSelected = $state('');
	function makeFilterFn(q: string) {
		return q.trim() === '' ? sizeOptions : sizeOptions.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
	}
	const smFiltered = $derived(makeFilterFn(smQuery));
	const mdFiltered = $derived(makeFilterFn(mdQuery));
	const lgFiltered = $derived(makeFilterFn(lgQuery));
	function sizeSelect(which: 'sm'|'md'|'lg', val: string) {
		if (which === 'sm') { smSelected = val; smQuery = val; smOpen = false; }
		if (which === 'md') { mdSelected = val; mdQuery = val; mdOpen = false; }
		if (which === 'lg') { lgSelected = val; lgQuery = val; lgOpen = false; }
	}
	function sizeBlur(which: 'sm'|'md'|'lg') {
		setTimeout(() => {
			if (which === 'sm') { smOpen = false; if (!smSelected || smQuery !== smSelected) smQuery = smSelected; }
			if (which === 'md') { mdOpen = false; if (!mdSelected || mdQuery !== mdSelected) mdQuery = mdSelected; }
			if (which === 'lg') { lgOpen = false; if (!lgSelected || lgQuery !== lgSelected) lgQuery = lgSelected; }
		}, 150);
	}

	// ── 6. Combobox with Groups ────────────────────────────────────────
	const groupedOptions = [
		{ group: 'Frontend',  label: 'React',       value: 'react' },
		{ group: 'Frontend',  label: 'Svelte',      value: 'svelte' },
		{ group: 'Frontend',  label: 'Vue',         value: 'vue' },
		{ group: 'Frontend',  label: 'Angular',     value: 'angular' },
		{ group: 'Backend',   label: 'Go',          value: 'go' },
		{ group: 'Backend',   label: 'Node.js',     value: 'node' },
		{ group: 'Backend',   label: 'Rust',        value: 'rust' },
		{ group: 'Backend',   label: 'Python',      value: 'python' },
		{ group: 'Database',  label: 'PostgreSQL',  value: 'postgres' },
		{ group: 'Database',  label: 'Redis',       value: 'redis' },
		{ group: 'Database',  label: 'MongoDB',     value: 'mongo' },
		{ group: 'Database',  label: 'SQLite',      value: 'sqlite' },
	];
	let groupQuery = $state('');
	let groupOpen = $state(false);
	let groupSelected = $state('');
	const groupFiltered = $derived(
		groupQuery.trim() === ''
			? groupedOptions
			: groupedOptions.filter((o) => o.label.toLowerCase().includes(groupQuery.toLowerCase()) || o.group.toLowerCase().includes(groupQuery.toLowerCase()))
	);
	const groupedMap = $derived(() => {
		const map = new Map<string, typeof groupedOptions>();
		for (const o of groupFiltered) {
			if (!map.has(o.group)) map.set(o.group, []);
			map.get(o.group)!.push(o);
		}
		return [...map.entries()];
	});
	function groupSelect(label: string) {
		groupSelected = label;
		groupQuery = label;
		groupOpen = false;
	}
	function groupFocus() { groupOpen = true; if (groupSelected) groupQuery = ''; }
	function groupBlur() { setTimeout(() => { groupOpen = false; if (groupSelected) groupQuery = groupSelected; else groupQuery = ''; }, 150); }

	// ── 7. Combobox with Create ────────────────────────────────────────
	let createOptions = $state(['Dashboard', 'Analytics', 'Settings', 'Profile', 'Billing']);
	let createQuery = $state('');
	let createOpen = $state(false);
	let createSelected = $state('');
	const createFiltered = $derived(
		createQuery.trim() === ''
			? createOptions
			: createOptions.filter((o) => o.toLowerCase().includes(createQuery.toLowerCase()))
	);
	const showCreate = $derived(
		createQuery.trim() !== '' &&
		!createOptions.some((o) => o.toLowerCase() === createQuery.toLowerCase()) &&
		createFiltered.length === 0
	);
	function createSelect(val: string) {
		createSelected = val;
		createQuery = val;
		createOpen = false;
	}
	function handleCreate() {
		const val = createQuery.trim();
		if (val) {
			createOptions = [...createOptions, val];
			createSelected = val;
			createQuery = val;
			createOpen = false;
		}
	}
	function createFocus() { createOpen = true; if (createSelected) createQuery = ''; }
	function createBlur() { setTimeout(() => { createOpen = false; if (createSelected) createQuery = createSelected; else createQuery = ''; }, 150); }

	// ── 8. User Search ─────────────────────────────────────────────────
	const users = [
		{ name: 'Alice Chen',     email: 'alice@acme.io',    role: 'Admin',     initials: 'AC', color: '#818cf8' },
		{ name: 'Ben Foster',     email: 'ben@acme.io',      role: 'Engineer',  initials: 'BF', color: '#34d399' },
		{ name: 'Clara Diaz',     email: 'clara@acme.io',    role: 'Designer',  initials: 'CD', color: '#f97316' },
		{ name: 'David Kim',      email: 'david@acme.io',    role: 'Engineer',  initials: 'DK', color: '#60a5fa' },
		{ name: 'Eva Müller',     email: 'eva@acme.io',      role: 'Manager',   initials: 'EM', color: '#f43f5e' },
		{ name: 'Felix Okafor',   email: 'felix@acme.io',    role: 'Engineer',  initials: 'FO', color: '#a78bfa' },
		{ name: 'Grace Liu',      email: 'grace@acme.io',    role: 'Analyst',   initials: 'GL', color: '#2dd4bf' },
		{ name: 'Henry Park',     email: 'henry@acme.io',    role: 'DevOps',    initials: 'HP', color: '#fb923c' },
	];
	let userQuery = $state('');
	let userOpen = $state(false);
	let userSelected = $state<typeof users[0] | null>(null);
	const userFiltered = $derived(
		userQuery.trim() === ''
			? users
			: users.filter(
				(u) =>
					u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
					u.email.toLowerCase().includes(userQuery.toLowerCase()) ||
					u.role.toLowerCase().includes(userQuery.toLowerCase())
			)
	);
	const roleBadgeColor: Record<string, string> = {
		Admin: '#818cf8', Engineer: '#34d399', Designer: '#f97316',
		Manager: '#60a5fa', Analyst: '#2dd4bf', DevOps: '#fb923c',
	};
	function userSelect(u: typeof users[0]) {
		userSelected = u;
		userQuery = u.name;
		userOpen = false;
	}
	function userFocus() { userOpen = true; if (userSelected) userQuery = ''; }
	function userBlur() {
		setTimeout(() => {
			userOpen = false;
			if (userSelected) userQuery = userSelected.name;
			else userQuery = '';
		}, 150);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Combobox</h2>
	<p class="ds-desc">
		Autocomplete input with dropdown selection. Supports filtering, grouping, multi-select,
		on-the-fly creation, and rich result layouts. All demos are fully interactive.
	</p>

	<!-- ── 1. Basic Combobox ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Combobox</h3>
		<p class="ds-card__sub">Type to filter the list. Click or press Enter to select.</p>
		<div class="demo-row">
			<div class="cb-wrap">
				<div class="cb-field" class:cb-field--open={basicOpen}>
					<input
						class="cb-input"
						type="text"
						placeholder="Search countries…"
						bind:value={basicQuery}
						onfocus={basicFocus}
						onblur={basicBlur}
						oninput={() => { basicOpen = true; basicSelected = ''; }}
						aria-autocomplete="list"
					/>
					<span class="cb-chevron" class:cb-chevron--up={basicOpen}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
				{#if basicOpen && basicFiltered.length > 0}
					<ul class="cb-dropdown" role="listbox">
						{#each basicFiltered.slice(0, 8) as country}
							<li
								class="cb-option"
								class:cb-option--selected={basicSelected === country}
								role="option"
								aria-selected={basicSelected === country}
								onmousedown={() => basicSelect(country)}
							>
								{#if basicSelected === country}
									<svg class="cb-check" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
										<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								{:else}
									<span class="cb-check"></span>
								{/if}
								{country}
							</li>
						{/each}
						{#if basicFiltered.length > 8}
							<li class="cb-count">{basicFiltered.length - 8} more results…</li>
						{/if}
					</ul>
				{/if}
				{#if basicOpen && basicFiltered.length === 0}
					<div class="cb-empty">No countries match "{basicQuery}"</div>
				{/if}
			</div>
			{#if basicSelected}
				<div class="demo-result">
					Selected: <strong>{basicSelected}</strong>
				</div>
			{/if}
		</div>
	</div>

	<!-- ── 2. Combobox with Icons ─────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Combobox with Icons</h3>
		<p class="ds-card__sub">Each option carries an icon. The selected item renders its icon inside the input.</p>
		<div class="demo-row">
			<div class="cb-wrap">
				<div class="cb-field" class:cb-field--open={iconOpen}>
					{#if iconSelected && iconQuery === iconSelected.label}
						<span class="cb-icon-badge" style="background:{iconSelected.color}22; color:{iconSelected.color}">
							{iconSelected.abbr}
						</span>
					{/if}
					<input
						class="cb-input"
						class:cb-input--with-icon={iconSelected && iconQuery === iconSelected.label}
						type="text"
						placeholder="Pick a framework…"
						bind:value={iconQuery}
						onfocus={iconFocus}
						onblur={iconBlur}
						oninput={() => { iconOpen = true; iconSelected = null; }}
						aria-autocomplete="list"
					/>
					<span class="cb-chevron" class:cb-chevron--up={iconOpen}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
				{#if iconOpen}
					<ul class="cb-dropdown" role="listbox">
						{#each iconFiltered as opt}
							<li
								class="cb-option cb-option--icon"
								class:cb-option--selected={iconSelected?.label === opt.label}
								role="option"
								aria-selected={iconSelected?.label === opt.label}
								onmousedown={() => iconSelect(opt)}
							>
								<span class="cb-icon-pill" style="background:{opt.color}22; color:{opt.color}">
									{opt.abbr}
								</span>
								{opt.label}
								{#if iconSelected?.label === opt.label}
									<svg class="cb-check-right" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
										<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								{/if}
							</li>
						{:else}
							<li class="cb-empty-inline">No results</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 3. Multi-Select Combobox ───────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Multi-Select Combobox</h3>
		<p class="ds-card__sub">Type to search, click to add chips. Backspace removes the last chip. Already-selected items are excluded.</p>
		<div class="demo-row">
			<div class="cb-wrap" style="max-width: 480px;">
				<div
					class="cb-multi-field"
					class:cb-multi-field--open={multiOpen}
					role="combobox"
					aria-expanded={multiOpen}
					aria-haspopup="listbox"
					aria-controls="multi-listbox"
				>
					{#each multiSelected as tag}
						<span class="cb-chip">
							{tag}
							<button
								class="cb-chip__remove"
								aria-label="Remove {tag}"
								onmousedown={(e) => { e.preventDefault(); multiRemove(tag); }}
							>
								<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
									<path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
							</button>
						</span>
					{/each}
					<input
						class="cb-multi-input"
						type="text"
						placeholder={multiSelected.length === 0 ? 'Add technologies…' : ''}
						bind:value={multiQuery}
						onfocus={multiFocus}
						onblur={multiBlur}
						onkeydown={multiKeydown}
						oninput={() => { multiOpen = true; }}
						aria-autocomplete="list"
					/>
				</div>
				{#if multiOpen && multiFiltered.length > 0}
					<ul class="cb-dropdown" role="listbox" id="multi-listbox">
						{#each multiFiltered.slice(0, 8) as opt}
							<li
								class="cb-option"
								role="option"
								aria-selected={false}
								onmousedown={(e) => { e.preventDefault(); multiAdd(opt); }}
							>
								<span class="cb-check"></span>
								{opt}
							</li>
						{/each}
					</ul>
				{/if}
				{#if multiOpen && multiFiltered.length === 0 && multiQuery.trim() !== ''}
					<div class="cb-empty">No more options match "{multiQuery}"</div>
				{/if}
			</div>
		</div>
		{#if multiSelected.length > 0}
			<p class="demo-caption">{multiSelected.length} selected: {multiSelected.join(', ')}</p>
		{/if}
	</div>

	<!-- ── 4. Combobox States ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Combobox States</h3>
		<p class="ds-card__sub">Default, Active/Focused with open dropdown, Disabled, and Error.</p>
		<div class="states-grid">
			<!-- Default -->
			<div class="state-item">
				<span class="state-label">Default</span>
				<div class="cb-field">
					<input class="cb-input" type="text" placeholder="Select an option…" readonly />
					<span class="cb-chevron">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
			</div>
			<!-- Active -->
			<div class="state-item">
				<span class="state-label">Active / Open</span>
				<div class="cb-wrap">
					<div class="cb-field cb-field--open cb-field--focused">
						<input
							class="cb-input"
							type="text"
							bind:value={stateActiveQuery}
							placeholder="Select an option…"
							onfocus={() => stateActiveOpen = true}
							onblur={() => setTimeout(() => stateActiveOpen = false, 150)}
							oninput={() => stateActiveOpen = true}
							aria-autocomplete="list"
						/>
						<span class="cb-chevron cb-chevron--up">
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
								<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</div>
					{#if stateActiveOpen}
						<ul class="cb-dropdown" role="listbox">
							{#each stateFiltered as opt}
								<li class="cb-option" role="option" aria-selected={false} onmousedown={() => stateActiveQuery = opt}>
									<span class="cb-check"></span>{opt}
								</li>
							{:else}
								<li class="cb-empty-inline">No results</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
			<!-- Disabled -->
			<div class="state-item">
				<span class="state-label">Disabled</span>
				<div class="cb-field cb-field--disabled">
					<input class="cb-input" type="text" placeholder="Not available" disabled />
					<span class="cb-chevron">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
			</div>
			<!-- Error -->
			<div class="state-item">
				<span class="state-label">Error</span>
				<div class="cb-field cb-field--error">
					<input class="cb-input" type="text" value="Invalid selection" aria-invalid="true" />
					<span class="cb-chevron">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
				<p class="cb-error-msg">Please select a valid option from the list.</p>
			</div>
		</div>
	</div>

	<!-- ── 5. Combobox Sizes ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Combobox Sizes</h3>
		<p class="ds-card__sub">Small (32px), Default (40px), and Large (48px) height variants.</p>
		<div class="sizes-col">
			<!-- Small -->
			<div class="size-row">
				<span class="size-badge">sm</span>
				<div class="cb-wrap" style="width: 240px;">
					<div class="cb-field cb-field--sm" class:cb-field--open={smOpen}>
						<input
							class="cb-input cb-input--sm"
							type="text"
							placeholder="Small combobox…"
							bind:value={smQuery}
							onfocus={() => smOpen = true}
							onblur={() => sizeBlur('sm')}
							oninput={() => { smOpen = true; smSelected = ''; }}
						/>
						<span class="cb-chevron" class:cb-chevron--up={smOpen}>
							<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
								<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</div>
					{#if smOpen}
						<ul class="cb-dropdown cb-dropdown--sm" role="listbox">
							{#each smFiltered as opt}
								<li class="cb-option cb-option--sm" role="option" aria-selected={smSelected===opt} onmousedown={() => sizeSelect('sm', opt)}>
									<span class="cb-check"></span>{opt}
								</li>
							{:else}
								<li class="cb-empty-inline">No results</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
			<!-- Default -->
			<div class="size-row">
				<span class="size-badge">md</span>
				<div class="cb-wrap" style="width: 280px;">
					<div class="cb-field" class:cb-field--open={mdOpen}>
						<input
							class="cb-input"
							type="text"
							placeholder="Default combobox…"
							bind:value={mdQuery}
							onfocus={() => mdOpen = true}
							onblur={() => sizeBlur('md')}
							oninput={() => { mdOpen = true; mdSelected = ''; }}
						/>
						<span class="cb-chevron" class:cb-chevron--up={mdOpen}>
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
								<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</div>
					{#if mdOpen}
						<ul class="cb-dropdown" role="listbox">
							{#each mdFiltered as opt}
								<li class="cb-option" role="option" aria-selected={mdSelected===opt} onmousedown={() => sizeSelect('md', opt)}>
									<span class="cb-check"></span>{opt}
								</li>
							{:else}
								<li class="cb-empty-inline">No results</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
			<!-- Large -->
			<div class="size-row">
				<span class="size-badge">lg</span>
				<div class="cb-wrap" style="width: 320px;">
					<div class="cb-field cb-field--lg" class:cb-field--open={lgOpen}>
						<input
							class="cb-input cb-input--lg"
							type="text"
							placeholder="Large combobox…"
							bind:value={lgQuery}
							onfocus={() => lgOpen = true}
							onblur={() => sizeBlur('lg')}
							oninput={() => { lgOpen = true; lgSelected = ''; }}
						/>
						<span class="cb-chevron" class:cb-chevron--up={lgOpen}>
							<svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
								<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</div>
					{#if lgOpen}
						<ul class="cb-dropdown cb-dropdown--lg" role="listbox">
							{#each lgFiltered as opt}
								<li class="cb-option cb-option--lg" role="option" aria-selected={lgSelected===opt} onmousedown={() => sizeSelect('lg', opt)}>
									<span class="cb-check"></span>{opt}
								</li>
							{:else}
								<li class="cb-empty-inline">No results</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- ── 6. Combobox with Groups ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Combobox with Groups</h3>
		<p class="ds-card__sub">Options divided by category headers. Group labels are non-selectable.</p>
		<div class="demo-row">
			<div class="cb-wrap">
				<div class="cb-field" class:cb-field--open={groupOpen}>
					<input
						class="cb-input"
						type="text"
						placeholder="Select a technology…"
						bind:value={groupQuery}
						onfocus={groupFocus}
						onblur={groupBlur}
						oninput={() => { groupOpen = true; groupSelected = ''; }}
						aria-autocomplete="list"
					/>
					<span class="cb-chevron" class:cb-chevron--up={groupOpen}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
				{#if groupOpen}
					{#if groupFiltered.length > 0}
						<ul class="cb-dropdown" role="listbox">
							{#each groupedMap() as [group, items]}
								<li class="cb-group-header" role="presentation">{group}</li>
								{#each items as opt}
									<li
										class="cb-option cb-option--indented"
										class:cb-option--selected={groupSelected === opt.label}
										role="option"
										aria-selected={groupSelected === opt.label}
										onmousedown={() => groupSelect(opt.label)}
									>
										{#if groupSelected === opt.label}
											<svg class="cb-check" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
												<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										{:else}
											<span class="cb-check"></span>
										{/if}
										{opt.label}
									</li>
								{/each}
							{/each}
						</ul>
					{:else}
						<div class="cb-empty">No technologies match "{groupQuery}"</div>
					{/if}
				{/if}
			</div>
			{#if groupSelected}
				<div class="demo-result">Selected: <strong>{groupSelected}</strong></div>
			{/if}
		</div>
	</div>

	<!-- ── 7. Combobox with Create ────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Combobox with Create</h3>
		<p class="ds-card__sub">When no options match, a "Create" action appears at the bottom of the dropdown.</p>
		<div class="demo-row">
			<div class="cb-wrap">
				<div class="cb-field" class:cb-field--open={createOpen}>
					<input
						class="cb-input"
						type="text"
						placeholder="Search or create a page…"
						bind:value={createQuery}
						onfocus={createFocus}
						onblur={createBlur}
						oninput={() => { createOpen = true; createSelected = ''; }}
						aria-autocomplete="list"
					/>
					<span class="cb-chevron" class:cb-chevron--up={createOpen}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</div>
				{#if createOpen}
					{#if createFiltered.length > 0 || showCreate}
						<ul class="cb-dropdown" role="listbox">
							{#each createFiltered as opt}
								<li
									class="cb-option"
									class:cb-option--selected={createSelected === opt}
									role="option"
									aria-selected={createSelected === opt}
									onmousedown={() => createSelect(opt)}
								>
									{#if createSelected === opt}
										<svg class="cb-check" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
											<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									{:else}
										<span class="cb-check"></span>
									{/if}
									{opt}
								</li>
							{/each}
							{#if showCreate}
								<li class="cb-create-option" role="option" aria-selected={false} onmousedown={handleCreate}>
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
										<path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									</svg>
									Create "<strong>{createQuery}</strong>"
								</li>
							{/if}
						</ul>
					{:else}
						<div class="cb-empty">
							No results.
							<button class="cb-create-inline" onmousedown={(e) => { e.preventDefault(); handleCreate(); }}>
								Create "{createQuery}"
							</button>
						</div>
					{/if}
				{/if}
			</div>
			{#if createSelected}
				<div class="demo-result">Selected: <strong>{createSelected}</strong></div>
			{/if}
		</div>
		<p class="demo-caption">Available pages: {createOptions.join(', ')}</p>
	</div>

	<!-- ── 8. In Context: User Search ────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: User Search</h3>
		<p class="ds-card__sub">Full composition with avatar, name, email, and role badge per result row.</p>
		<div class="demo-row">
			<div class="cb-wrap" style="max-width: 420px;">
				<div class="cb-field cb-field--user" class:cb-field--open={userOpen}>
					{#if userSelected && userQuery === userSelected.name}
						<span class="cb-avatar-sm" style="background:{userSelected.color}22; color:{userSelected.color}">
							{userSelected.initials}
						</span>
					{:else}
						<span class="cb-search-icon" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
								<circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
								<path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</span>
					{/if}
					<input
						class="cb-input cb-input--with-icon"
						type="text"
						placeholder="Search by name, email, or role…"
						bind:value={userQuery}
						onfocus={userFocus}
						onblur={userBlur}
						oninput={() => { userOpen = true; userSelected = null; }}
						aria-autocomplete="list"
					/>
					{#if userSelected && userQuery === userSelected.name}
						<button
							class="cb-clear"
							aria-label="Clear selection"
							onmousedown={(e) => { e.preventDefault(); userSelected = null; userQuery = ''; userOpen = false; }}
						>
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
								<path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							</svg>
						</button>
					{/if}
				</div>
				{#if userOpen}
					{#if userFiltered.length > 0}
						<ul class="cb-dropdown cb-dropdown--user" role="listbox">
							{#each userFiltered as user}
								<li
									class="cb-user-option"
									class:cb-user-option--selected={userSelected?.email === user.email}
									role="option"
									aria-selected={userSelected?.email === user.email}
									onmousedown={() => userSelect(user)}
								>
									<span class="cb-avatar" style="background:{user.color}22; color:{user.color}">
										{user.initials}
									</span>
									<span class="cb-user-info">
										<span class="cb-user-name">{user.name}</span>
										<span class="cb-user-email">{user.email}</span>
									</span>
									<span class="cb-role-badge" style="background:{roleBadgeColor[user.role] ?? '#fff'}15; color:{roleBadgeColor[user.role] ?? 'var(--dt2)'}; border-color:{roleBadgeColor[user.role] ?? '#fff'}30">
										{user.role}
									</span>
									{#if userSelected?.email === user.email}
										<svg class="cb-user-check" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
											<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									{/if}
								</li>
							{/each}
						</ul>
					{:else}
						<div class="cb-empty">No users match "{userQuery}"</div>
					{/if}
				{/if}
			</div>
			{#if userSelected}
				<div class="demo-result">
					<span class="cb-avatar-result" style="background:{userSelected.color}22; color:{userSelected.color}">{userSelected.initials}</span>
					<span><strong>{userSelected.name}</strong><br><small>{userSelected.email}</small></span>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* ── Layout helpers ─────────────────────────────────────────── */
	.demo-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.demo-result {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 6px;
		font-size: 0.8125rem;
		color: var(--dt2);
		align-self: center;
	}
	.demo-result strong { color: var(--dt); }
	.demo-caption {
		margin-top: 0.75rem;
		font-size: 0.75rem;
		color: var(--dt4);
	}

	/* ── Combobox wrapper (position context) ────────────────────── */
	.cb-wrap {
		position: relative;
		width: 300px;
	}

	/* ── Field shell ────────────────────────────────────────────── */
	.cb-field {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0 0.75rem;
		height: 40px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.cb-field:focus-within,
	.cb-field--open {
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--dt) 6%, transparent);
	}
	.cb-field--focused {
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--dt) 6%, transparent);
	}
	.cb-field--disabled {
		opacity: 0.45;
		cursor: not-allowed;
		pointer-events: none;
	}
	.cb-field--error {
		border-color: #ef4444;
		box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
	}
	.cb-field--error:focus-within {
		border-color: #ef4444;
		box-shadow: 0 0 0 3px rgba(239,68,68,0.18);
	}
	.cb-field--sm { height: 32px; padding: 0 0.625rem; border-radius: 6px; }
	.cb-field--lg { height: 48px; padding: 0 0.875rem; border-radius: 10px; }
	.cb-field--user { padding: 0 0.625rem; }

	/* ── Input ──────────────────────────────────────────────────── */
	.cb-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.875rem;
		color: var(--dt);
		font-family: inherit;
	}
	.cb-input::placeholder { color: var(--dt4); }
	.cb-input--sm { font-size: 0.8125rem; }
	.cb-input--lg { font-size: 1rem; }
	.cb-input--with-icon { padding-left: 0.25rem; }

	/* ── Chevron icon ───────────────────────────────────────────── */
	.cb-chevron {
		flex-shrink: 0;
		color: var(--dt3);
		display: flex;
		align-items: center;
		transition: transform 0.15s;
		pointer-events: none;
	}
	.cb-chevron--up { transform: rotate(180deg); }

	/* ── Clear button ───────────────────────────────────────────── */
	.cb-clear {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		background: transparent;
		border: none;
		color: var(--dt3);
		cursor: pointer;
		transition: color 0.12s, background 0.12s;
		padding: 0;
	}
	.cb-clear:hover { color: var(--dt); background: var(--dbg3); }

	/* ── Dropdown list ──────────────────────────────────────────── */
	.cb-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.18);
		list-style: none;
		margin: 0;
		padding: 4px;
		max-height: 240px;
		overflow-y: auto;
	}
	.cb-dropdown--sm { border-radius: 6px; }
	.cb-dropdown--lg { border-radius: 10px; max-height: 280px; }
	.cb-dropdown--user { max-height: 320px; }

	/* Custom scrollbar */
	.cb-dropdown::-webkit-scrollbar { width: 4px; }
	.cb-dropdown::-webkit-scrollbar-track { background: transparent; }
	.cb-dropdown::-webkit-scrollbar-thumb { background: var(--dbd); border-radius: 2px; }

	/* ── Option row ─────────────────────────────────────────────── */
	.cb-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.5rem;
		border-radius: 5px;
		font-size: 0.875rem;
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.1s, color 0.1s;
		user-select: none;
	}
	.cb-option:hover { background: var(--dbg3); color: var(--dt); }
	.cb-option--selected { color: var(--dt); }
	.cb-option--selected:hover { background: var(--dbg3); }
	.cb-option--sm { font-size: 0.8125rem; padding: 0.3rem 0.5rem; }
	.cb-option--lg { font-size: 0.9375rem; padding: 0.5rem 0.625rem; }
	.cb-option--indented { padding-left: 1.25rem; }
	.cb-option--icon { gap: 0.625rem; }

	/* ── Check mark placeholder ─────────────────────────────────── */
	.cb-check {
		width: 12px;
		height: 12px;
		flex-shrink: 0;
		color: var(--dt);
	}
	.cb-check-right {
		width: 12px;
		height: 12px;
		flex-shrink: 0;
		color: var(--dt);
		margin-left: auto;
	}

	/* ── Count / overflow hint ──────────────────────────────────── */
	.cb-count {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		color: var(--dt4);
		list-style: none;
	}

	/* ── Empty state ────────────────────────────────────────────── */
	.cb-empty {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--dbg2);
		border: 1px solid var(--dbd2);
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.32);
		padding: 0.75rem 1rem;
		font-size: 0.8125rem;
		color: var(--dt3);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.cb-empty-inline {
		padding: 0.375rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--dt3);
		list-style: none;
	}

	/* ── Error message ──────────────────────────────────────────── */
	.cb-error-msg {
		margin-top: 0.375rem;
		font-size: 0.75rem;
		color: #ef4444;
	}

	/* ── Icon badge (in input) ──────────────────────────────────── */
	.cb-icon-badge {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.cb-icon-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		font-size: 0.6rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	/* ── Group headers ──────────────────────────────────────────── */
	.cb-group-header {
		padding: 0.5rem 0.5rem 0.25rem;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt4);
		list-style: none;
	}
	.cb-group-header:not(:first-child) {
		border-top: 1px solid var(--dbd);
		margin-top: 0.25rem;
	}

	/* ── Create option ──────────────────────────────────────────── */
	.cb-create-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.5rem;
		border-radius: 5px;
		font-size: 0.875rem;
		color: var(--dt3);
		cursor: pointer;
		border-top: 1px solid var(--dbd);
		margin-top: 4px;
		transition: background 0.1s, color 0.1s;
		list-style: none;
	}
	.cb-create-option:hover { background: var(--dbg3); color: var(--dt); }
	.cb-create-option strong { color: var(--dt); font-weight: 500; }
	.cb-create-option svg { flex-shrink: 0; }
	.cb-create-inline {
		background: transparent;
		border: none;
		padding: 0;
		color: var(--dt2);
		font-size: 0.8125rem;
		cursor: pointer;
		font-family: inherit;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.cb-create-inline:hover { color: var(--dt); }

	/* ── Multi-select field ─────────────────────────────────────── */
	.cb-multi-field {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.3rem;
		min-height: 40px;
		padding: 0.3rem 0.75rem;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		transition: border-color 0.15s, box-shadow 0.15s;
		cursor: text;
	}
	.cb-multi-field:focus-within,
	.cb-multi-field--open {
		border-color: var(--dbd2);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--dt) 6%, transparent);
	}
	.cb-multi-input {
		flex: 1;
		min-width: 80px;
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.875rem;
		color: var(--dt);
		font-family: inherit;
		padding: 0;
	}
	.cb-multi-input::placeholder { color: var(--dt4); }

	/* ── Chip ───────────────────────────────────────────────────── */
	.cb-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.125rem 0.4rem 0.125rem 0.5rem;
		background: var(--dbg3);
		border: 1px solid var(--dbd2);
		border-radius: 5px;
		font-size: 0.75rem;
		color: var(--dt2);
		white-space: nowrap;
	}
	.cb-chip__remove {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border-radius: 3px;
		background: transparent;
		border: none;
		color: var(--dt3);
		cursor: pointer;
		padding: 0;
		transition: color 0.1s, background 0.1s;
		flex-shrink: 0;
	}
	.cb-chip__remove:hover { color: var(--dt); background: color-mix(in srgb, var(--dt) 10%, transparent); }

	/* ── States grid ────────────────────────────────────────────── */
	.states-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.25rem 1.5rem;
		align-items: start;
	}
	.state-item { display: flex; flex-direction: column; gap: 0.375rem; }
	.state-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--dt4);
		letter-spacing: 0.04em;
	}

	/* ── Sizes column ───────────────────────────────────────────── */
	.sizes-col { display: flex; flex-direction: column; gap: 0.875rem; }
	.size-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.size-badge {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--dt4);
		text-transform: uppercase;
		width: 20px;
		text-align: right;
		flex-shrink: 0;
	}

	/* ── Search icon in user field ──────────────────────────────── */
	.cb-search-icon {
		display: flex;
		align-items: center;
		color: var(--dt3);
		flex-shrink: 0;
	}

	/* ── Small avatar in input ──────────────────────────────────── */
	.cb-avatar-sm {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		font-size: 0.6rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	/* ── User dropdown option ───────────────────────────────────── */
	.cb-user-option {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.5rem;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.1s;
		list-style: none;
		user-select: none;
	}
	.cb-user-option:hover { background: var(--dbg3); }
	.cb-user-option--selected { background: color-mix(in srgb, var(--dt) 5%, transparent); }
	.cb-user-option--selected:hover { background: var(--dbg3); }

	.cb-avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		font-size: 0.6875rem;
		font-weight: 700;
		flex-shrink: 0;
	}
	.cb-user-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}
	.cb-user-name {
		font-size: 0.875rem;
		color: var(--dt);
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cb-user-email {
		font-size: 0.75rem;
		color: var(--dt3);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cb-role-badge {
		flex-shrink: 0;
		font-size: 0.675rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		border: 1px solid transparent;
	}
	.cb-user-check {
		flex-shrink: 0;
		color: var(--dt);
		width: 12px;
		height: 12px;
	}
	.cb-avatar-result {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		font-size: 0.65rem;
		font-weight: 700;
		flex-shrink: 0;
	}
</style>
