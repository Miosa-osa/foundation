<script lang="ts">
	// Basic tag input
	let basicTags = $state(['Design', 'Frontend', 'Svelte']);
	let basicInput = $state('');

	function basicAdd() {
		const val = basicInput.trim();
		if (val && !basicTags.includes(val)) {
			basicTags = [...basicTags, val];
			basicInput = '';
		}
	}

	function basicRemove(index: number) {
		basicTags = basicTags.filter((_, i) => i !== index);
	}

	function basicKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			basicAdd();
		} else if (e.key === 'Backspace' && basicInput === '' && basicTags.length > 0) {
			basicTags = basicTags.slice(0, -1);
		}
	}

	// Tag input with suggestions
	const allSuggestions = ['TypeScript', 'Go', 'Rust', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'REST'];
	let suggestTags = $state(['TypeScript', 'Go']);
	let suggestInput = $state('');
	let showDropdown = $state(false);
	let filteredSuggestions = $derived(
		suggestInput.trim().length === 0
			? allSuggestions.filter(s => !suggestTags.includes(s)).slice(0, 5)
			: allSuggestions.filter(s => s.toLowerCase().includes(suggestInput.toLowerCase()) && !suggestTags.includes(s))
	);

	function suggestAdd(val: string) {
		if (val.trim() && !suggestTags.includes(val.trim())) {
			suggestTags = [...suggestTags, val.trim()];
			suggestInput = '';
			showDropdown = false;
		}
	}

	function suggestRemove(index: number) {
		suggestTags = suggestTags.filter((_, i) => i !== index);
	}

	function suggestKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (suggestInput.trim()) suggestAdd(suggestInput.trim());
		} else if (e.key === 'Escape') {
			showDropdown = false;
		} else if (e.key === 'Backspace' && suggestInput === '' && suggestTags.length > 0) {
			suggestTags = suggestTags.slice(0, -1);
		}
	}

	// Max tags
	const MAX_TAGS = 4;
	let maxTags = $state(['Urgent', 'Backend']);
	let maxInput = $state('');

	function maxAdd() {
		const val = maxInput.trim();
		if (val && !maxTags.includes(val) && maxTags.length < MAX_TAGS) {
			maxTags = [...maxTags, val];
			maxInput = '';
		}
	}

	function maxRemove(index: number) {
		maxTags = maxTags.filter((_, i) => i !== index);
	}

	function maxKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			maxAdd();
		} else if (e.key === 'Backspace' && maxInput === '' && maxTags.length > 0) {
			maxTags = maxTags.slice(0, -1);
		}
	}

	// Validated tag input
	let validTags = $state(['react', 'svelte']);
	let validInput = $state('');
	let validError = $state('');

	function validAdd() {
		const val = validInput.trim().toLowerCase();
		if (!val) return;
		if (val.length < 2) {
			validError = 'Tags must be at least 2 characters.';
			return;
		}
		if (validTags.includes(val)) {
			validError = `"${val}" is already added.`;
			return;
		}
		validTags = [...validTags, val];
		validInput = '';
		validError = '';
	}

	function validRemove(index: number) {
		validTags = validTags.filter((_, i) => i !== index);
		validError = '';
	}

	function validKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			validAdd();
		} else if (e.key === 'Backspace' && validInput === '' && validTags.length > 0) {
			validTags = validTags.slice(0, -1);
			validError = '';
		} else {
			validError = '';
		}
	}

	// Colored / categorized tags
	const coloredPresets: { label: string; bg: string; border: string; text: string }[] = [
		{ label: 'bug', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', text: '#ef4444' },
		{ label: 'feature', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
		{ label: 'docs', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.25)', text: '#eab308' },
		{ label: 'performance', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', text: '#22c55e' },
		{ label: 'security', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', text: '#a855f7' },
	];
	type ColoredTag = (typeof coloredPresets)[number];
	let coloredTags = $state<ColoredTag[]>([coloredPresets[0], coloredPresets[1], coloredPresets[3]]);
	let coloredInput = $state('');
	let nextColor = $state(2);

	const colorPalette = [
		{ bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', text: '#ef4444' },
		{ bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
		{ bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.25)', text: '#eab308' },
		{ bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', text: '#22c55e' },
		{ bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', text: '#a855f7' },
		{ bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.25)', text: '#14b8a6' },
	];

	function coloredAdd() {
		const val = coloredInput.trim();
		if (val && !coloredTags.find(t => t.label === val)) {
			const color = colorPalette[nextColor % colorPalette.length];
			coloredTags = [...coloredTags, { label: val, ...color }];
			coloredInput = '';
			nextColor += 1;
		}
	}

	function coloredRemove(index: number) {
		coloredTags = coloredTags.filter((_, i) => i !== index);
	}

	function coloredKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') { e.preventDefault(); coloredAdd(); }
		else if (e.key === 'Backspace' && coloredInput === '' && coloredTags.length > 0) coloredTags = coloredTags.slice(0, -1);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Tag Input</h2>
	<p class="ds-desc">
		Interactive tag / chip input patterns. Type and press Enter to add, click X to remove.
		Variants include suggestions, max limits, validation, colored categories, and read-only displays.
	</p>

	<!-- Basic tag input -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Tag Input</h3>
		<p class="ds-card__sub">Press Enter to add a tag, Backspace on empty input to remove the last tag</p>
		<div style="max-width: 480px;">
			<!-- Input container -->
			<div style="
				display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
				padding: 8px 10px; border-radius: 8px;
				background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
				cursor: text; min-height: 42px;
				transition: border-color 0.15s;
			"
			role="group"
			aria-label="Tag input"
			>
				{#each basicTags as tag, i}
					<span style="
						display: inline-flex; align-items: center; gap: 5px;
						padding: 3px 8px 3px 10px; border-radius: 9999px;
						background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
						font-size: 12px; font-weight: 500; color: #ddd; white-space: nowrap;
					">
						{tag}
						<button
							onclick={() => basicRemove(i)}
							style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; cursor: pointer; padding: 0; color: #888; flex-shrink: 0;"
							aria-label="Remove tag {tag}"
						>
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</span>
				{/each}
				<input
					type="text"
					bind:value={basicInput}
					onkeydown={basicKeydown}
					placeholder={basicTags.length === 0 ? 'Add tags…' : ''}
					style="
						flex: 1; min-width: 80px; border: none; background: transparent;
						font-size: 13px; color: #ccc; outline: none; padding: 2px 0;
					"
					aria-label="New tag"
				/>
			</div>
			<div style="margin-top: 6px; font-size: 11px; color: #444;">
				{basicTags.length} tag{basicTags.length !== 1 ? 's' : ''} · Press Enter to add
			</div>
		</div>
	</div>

	<!-- Tag input with suggestions dropdown -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tag Input with Suggestions</h3>
		<p class="ds-card__sub">Dropdown appears as you type, click to select, or press Enter to add custom</p>
		<div style="max-width: 480px; position: relative;">
			<div style="
				display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
				padding: 8px 10px; border-radius: 8px;
				background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
				min-height: 42px;
			"
			role="group"
			aria-label="Tag input with suggestions"
			>
				{#each suggestTags as tag, i}
					<span style="
						display: inline-flex; align-items: center; gap: 5px;
						padding: 3px 8px 3px 10px; border-radius: 9999px;
						background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
						font-size: 12px; font-weight: 500; color: #ddd; white-space: nowrap;
					">
						{tag}
						<button
							onclick={() => suggestRemove(i)}
							style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; cursor: pointer; padding: 0; color: #888;"
							aria-label="Remove {tag}"
						>
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</span>
				{/each}
				<input
					type="text"
					bind:value={suggestInput}
					onkeydown={suggestKeydown}
					onfocus={() => showDropdown = true}
					onblur={() => setTimeout(() => { showDropdown = false; }, 150)}
					placeholder="Search or add…"
					style="flex: 1; min-width: 100px; border: none; background: transparent; font-size: 13px; color: #ccc; outline: none; padding: 2px 0;"
					aria-label="Search tags"
					aria-expanded={showDropdown}
					aria-haspopup="listbox"
				/>
			</div>
			<!-- Dropdown -->
			{#if showDropdown && filteredSuggestions.length > 0}
				<div style="
					position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 50;
					background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
					box-shadow: 0 8px 32px rgba(0,0,0,0.6); overflow: hidden;
				" role="listbox" aria-label="Suggestions">
					{#each filteredSuggestions as suggestion}
						<button
							onclick={() => suggestAdd(suggestion)}
							style="
								display: block; width: 100%; text-align: left;
								padding: 9px 14px; background: transparent; border: none;
								font-size: 13px; color: #bbb; cursor: pointer;
								border-bottom: 1px solid rgba(255,255,255,0.04);
							"
							onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
							onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
							role="option"
							aria-selected="false"
						>
							{suggestion}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Max tags limit -->
	<div class="ds-card">
		<h3 class="ds-card__title">Max Tags Limit</h3>
		<p class="ds-card__sub">Enforces a cap of {MAX_TAGS} tags — input disables when the limit is reached</p>
		<div style="max-width: 480px;">
			<div style="
				display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
				padding: 8px 10px; border-radius: 8px;
				background: rgba(255,255,255,0.03);
				border: 1px solid {maxTags.length >= MAX_TAGS ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)'};
				min-height: 42px; opacity: 1; transition: border-color 0.2s;
			"
			role="group"
			>
				{#each maxTags as tag, i}
					<span style="
						display: inline-flex; align-items: center; gap: 5px;
						padding: 3px 8px 3px 10px; border-radius: 9999px;
						background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
						font-size: 12px; font-weight: 500; color: #ddd;
					">
						{tag}
						<button
							onclick={() => maxRemove(i)}
							style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; cursor: pointer; padding: 0; color: #888;"
							aria-label="Remove {tag}"
						>
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</span>
				{/each}
				{#if maxTags.length < MAX_TAGS}
					<input
						type="text"
						bind:value={maxInput}
						onkeydown={maxKeydown}
						placeholder="Add tag…"
						style="flex: 1; min-width: 80px; border: none; background: transparent; font-size: 13px; color: #ccc; outline: none; padding: 2px 0;"
						aria-label="New tag"
					/>
				{:else}
					<span style="font-size: 12px; color: #444; padding: 2px 4px;">Max {MAX_TAGS} reached</span>
				{/if}
			</div>
			<div style="margin-top: 6px;">
				<div style="display: flex; gap: 3px;">
					{#each Array(MAX_TAGS) as _, i}
						<div style="height: 2px; flex: 1; border-radius: 1px; background: {i < maxTags.length ? '#fff' : 'rgba(255,255,255,0.08)'}; transition: background 0.2s;"></div>
					{/each}
				</div>
				<div style="font-size: 11px; color: #444; margin-top: 4px;">{maxTags.length} / {MAX_TAGS} tags used</div>
			</div>
		</div>
	</div>

	<!-- Validated tag input -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tag Input with Validation</h3>
		<p class="ds-card__sub">Rejects duplicates and tags shorter than 2 characters</p>
		<div style="max-width: 480px;">
			<div style="
				display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
				padding: 8px 10px; border-radius: 8px;
				background: rgba(255,255,255,0.03);
				border: 1px solid {validError ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.1)'};
				min-height: 42px; transition: border-color 0.15s;
			"
			role="group"
			>
				{#each validTags as tag, i}
					<span style="
						display: inline-flex; align-items: center; gap: 5px;
						padding: 3px 8px 3px 10px; border-radius: 9999px;
						background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
						font-size: 12px; font-weight: 500; color: #ccc;
					">
						{tag}
						<button
							onclick={() => validRemove(i)}
							style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; cursor: pointer; padding: 0; color: #777;"
							aria-label="Remove {tag}"
						>
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</span>
				{/each}
				<input
					type="text"
					bind:value={validInput}
					onkeydown={validKeydown}
					placeholder="Add tag…"
					style="flex: 1; min-width: 80px; border: none; background: transparent; font-size: 13px; color: #ccc; outline: none; padding: 2px 0;"
					aria-label="New tag"
					aria-invalid={!!validError}
					aria-describedby={validError ? 'valid-tag-error' : undefined}
				/>
			</div>
			{#if validError}
				<div id="valid-tag-error" style="margin-top: 6px; font-size: 12px; color: #ef4444; display: flex; align-items: center; gap: 5px;" role="alert">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
					{validError}
				</div>
			{:else}
				<div style="margin-top: 6px; font-size: 11px; color: #444;">{validTags.length} tag{validTags.length !== 1 ? 's' : ''}</div>
			{/if}
		</div>
	</div>

	<!-- Colored / categorized tags -->
	<div class="ds-card">
		<h3 class="ds-card__title">Colored Category Tags</h3>
		<p class="ds-card__sub">Each new tag cycles through a color palette — useful for categorized labels</p>
		<div style="max-width: 480px;">
			<!-- Preset swatches -->
			<div style="display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap;">
				{#each coloredPresets as preset}
					<button
						onclick={() => {
							if (!coloredTags.find(t => t.label === preset.label)) {
								coloredTags = [...coloredTags, preset];
							}
						}}
						style="
							display: inline-flex; align-items: center; gap: 5px;
							padding: 4px 10px; border-radius: 9999px;
							background: {preset.bg}; border: 1px solid {preset.border};
							font-size: 12px; font-weight: 500; color: {preset.text}; cursor: pointer;
							opacity: {coloredTags.find(t => t.label === preset.label) ? 0.35 : 1};
						"
						aria-label="Add preset tag {preset.label}"
						disabled={!!coloredTags.find(t => t.label === preset.label)}
					>
						{preset.label}
					</button>
				{/each}
			</div>
			<!-- Input container -->
			<div style="
				display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
				padding: 8px 10px; border-radius: 8px;
				background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
				min-height: 42px;
			"
			role="group"
			>
				{#each coloredTags as tag, i}
					<span style="
						display: inline-flex; align-items: center; gap: 5px;
						padding: 3px 8px 3px 10px; border-radius: 9999px;
						background: {tag.bg}; border: 1px solid {tag.border};
						font-size: 12px; font-weight: 500; color: {tag.text}; white-space: nowrap;
					">
						{tag.label}
						<button
							onclick={() => coloredRemove(i)}
							style="display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: none; background: {tag.bg}; border-radius: 50%; cursor: pointer; padding: 0; color: {tag.text}; opacity: 0.7;"
							aria-label="Remove tag {tag.label}"
						>
							<svg width="8" height="8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</span>
				{/each}
				<input
					type="text"
					bind:value={coloredInput}
					onkeydown={coloredKeydown}
					placeholder="Custom tag…"
					style="flex: 1; min-width: 80px; border: none; background: transparent; font-size: 13px; color: #ccc; outline: none; padding: 2px 0;"
					aria-label="New custom tag"
				/>
			</div>
		</div>
	</div>

	<!-- Read-only tag displays -->
	<div class="ds-card">
		<h3 class="ds-card__title">Read-Only Tag Displays</h3>
		<p class="ds-card__sub">Static tag groups for display contexts — table cells, cards, profile pages</p>

		<h4 class="ds-card__h4">Monochrome (default)</h4>
		<div style="display: flex; flex-wrap: wrap; gap: 6px; max-width: 480px;">
			{#each ['Svelte 5', 'TypeScript', 'SvelteKit 2', 'Tailwind', 'PostgreSQL', 'Redis', 'Docker'] as tag}
				<span style="
					display: inline-flex; align-items: center;
					padding: 4px 12px; border-radius: 9999px;
					background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
					font-size: 12px; font-weight: 500; color: #bbb;
				">{tag}</span>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Outlined minimal</h4>
		<div style="display: flex; flex-wrap: wrap; gap: 6px; max-width: 480px;">
			{#each ['Frontend', 'Backend', 'DevOps', 'Security', 'QA'] as tag}
				<span style="
					display: inline-flex; align-items: center;
					padding: 3px 10px; border-radius: 9999px;
					background: transparent; border: 1px solid rgba(255,255,255,0.15);
					font-size: 12px; color: #777;
				">{tag}</span>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">Semantic colors (read-only)</h4>
		<div style="display: flex; flex-wrap: wrap; gap: 6px; max-width: 480px;">
			{#each [
				{ label: 'bug', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', text: '#ef4444' },
				{ label: 'feature', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
				{ label: 'docs', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)', text: '#ca8a04' },
				{ label: 'performance', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', text: '#22c55e' },
				{ label: 'security', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)', text: '#a855f7' },
				{ label: 'breaking', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', text: '#f97316' },
			] as tag}
				<span style="
					display: inline-flex; align-items: center;
					padding: 4px 12px; border-radius: 9999px;
					background: {tag.bg}; border: 1px solid {tag.border};
					font-size: 12px; font-weight: 600; color: {tag.text};
				">{tag.label}</span>
			{/each}
		</div>

		<h4 class="ds-card__h4" style="margin-top: 18px;">In a card context</h4>
		<div style="max-width: 360px; padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07);">
			<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
				<h5 style="margin: 0; font-size: 14px; font-weight: 600; color: #fff;">Auth Refactor</h5>
				<span style="font-size: 10px; color: #444;">Mar 9</span>
			</div>
			<p style="margin: 0 0 12px; font-size: 12px; color: #666; line-height: 1.5;">Migrate session handling from cookies to JWTs with short-lived access tokens and refresh rotation.</p>
			<div style="display: flex; flex-wrap: wrap; gap: 5px;">
				{#each [
					{ label: 'security', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)', text: '#a855f7' },
					{ label: 'breaking', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', text: '#f97316' },
				] as tag}
					<span style="display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 9999px; background: {tag.bg}; border: 1px solid {tag.border}; font-size: 11px; font-weight: 600; color: {tag.text};">{tag.label}</span>
				{/each}
				{#each ['Backend', 'Go'] as tag}
					<span style="display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 9999px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); font-size: 11px; color: #888;">{tag}</span>
				{/each}
			</div>
		</div>
	</div>
</section>
