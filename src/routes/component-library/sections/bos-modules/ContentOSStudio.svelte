<script lang="ts">
	// ── Character Creator wizard ───────────────────────────────────
	let wizardStep = $state(1);
	const totalSteps = 5;

	// Step 1: Creator Type
	const creatorTypes = [
		'Fitness', 'Fashion', 'Lifestyle', 'Glamour', 'Cosplay', 'Streetwear',
		'Gamer', 'E-Girl', 'Gothic', 'Punk', 'Vintage', 'Bohemian',
		'Minimalist', 'Artsy', 'Alt', 'Kawaii',
	];
	let selectedTypes = $state<string[]>(['Lifestyle', 'Glamour']);

	// Step 2: Platform Focus
	const platforms: { id: string; label: string }[] = [
		{ id: 'instagram', label: 'Instagram' },
		{ id: 'tiktok',    label: 'TikTok' },
		{ id: 'onlyfans',  label: 'OnlyFans' },
		{ id: 'fansly',    label: 'Fansly' },
		{ id: 'twitter',   label: 'X / Twitter' },
		{ id: 'youtube',   label: 'YouTube' },
		{ id: 'twitch',    label: 'Twitch' },
		{ id: 'reddit',    label: 'Reddit' },
		{ id: 'patreon',   label: 'Patreon' },
	];
	let selectedPlatforms = $state<string[]>(['instagram', 'tiktok']);

	// Step 3: Physical Attributes
	let gender = $state('Female');
	let ethnicity = $state('Mixed');
	let ageRange = $state('22-28');
	let bodyType = $state('Athletic');
	let height = $state("5'6\"");
	let eyeColor = $state('Brown');
	let faceShape = $state('Oval');
	let eyeShape = $state('Almond');
	let browShape = $state('Arched');
	let noseType = $state('Straight');
	let jawline = $state('Soft');
	let lipShape = $state('Full');
	let facialHair = $state('None');
	let hairColor = $state('Dark Brown');
	let hairStyle = $state('Waves');
	let hairLength = $state('Long');
	let skinToneIdx = $state(2);
	let skinType = $state('Combination');
	let tattoos = $state('Minimal');
	let piercings = $state('Ears');
	let makeupStyle = $state('Glam');

	const skinTones = ['#FDDBB4','#F4C48E','#D4956A','#A9694A','#7D4E33','#4A2C1E'];
	const genderOpts = ['Female', 'Male', 'Non-binary'];
	const bodyOpts = ['Slim', 'Athletic', 'Curvy', 'Petite', 'Plus-size'];

	// Step 4: Style & Content
	const styleVibes = ['Dark Academia', 'Cottagecore', 'Y2K', 'Clean Girl', 'Grunge', 'Soft Glam', 'Minimalist', 'Maximalist', 'Preppy', 'Cyber'];
	let selectedVibes = $state<string[]>(['Clean Girl', 'Soft Glam']);
	let clothingStyle = $state('Contemporary');
	let voiceTone = $state('Warm & Playful');
	let contentRating = $state<'SFW' | 'Suggestive' | 'NSFW'>('SFW');
	let photoStyle = $state('Editorial');
	let mood = $state('Confident');
	let environment = $state('Urban / City');

	// Step 5: Review
	let characterName = $state('Aria');

	// ── Character Library ──────────────────────────────────────────
	let libFilter = $state<'all' | 'active' | 'draft'>('all');

	const libraryChars = [
		{ id: 'c1', name: 'Aria', type: 'Lifestyle', platforms: ['instagram', 'tiktok'], status: 'active', gens: 342 },
		{ id: 'c2', name: 'Nova', type: 'Fashion',   platforms: ['instagram', 'onlyfans', 'fansly'], status: 'active', gens: 891 },
		{ id: 'c3', name: 'Zara', type: 'Glamour',   platforms: ['twitter', 'reddit'],  status: 'active', gens: 127 },
		{ id: 'c4', name: 'Luna', type: 'E-Girl',    platforms: ['twitch', 'patreon'],  status: 'draft',  gens: 0 },
		{ id: 'c5', name: 'Sage', type: 'Fitness',   platforms: ['youtube', 'instagram'], status: 'draft', gens: 12 },
		{ id: 'c6', name: 'Mika', type: 'Cosplay',   platforms: ['twitter', 'patreon', 'reddit'],  status: 'active', gens: 58 },
	];

	let filteredChars = $derived(
		libFilter === 'all' ? libraryChars : libraryChars.filter(c => c.status === libFilter)
	);

	function toggleType(t: string) {
		selectedTypes = selectedTypes.includes(t)
			? selectedTypes.filter(x => x !== t)
			: [...selectedTypes, t];
	}

	function togglePlatform(p: string) {
		selectedPlatforms = selectedPlatforms.includes(p)
			? selectedPlatforms.filter(x => x !== p)
			: [...selectedPlatforms, p];
	}

	function toggleVibe(v: string) {
		selectedVibes = selectedVibes.includes(v)
			? selectedVibes.filter(x => x !== v)
			: [...selectedVibes, v];
	}

	const ratingColors: Record<string, string> = {
		SFW: '#22c55e',
		Suggestive: '#f59e0b',
		NSFW: '#ef4444',
	};
</script>

<section class="ds-section">
	<h2 class="ds-title">ContentOS Studio</h2>
	<p class="ds-desc">Character Studio — the platform's killer feature. A multi-step wizard for AI character creation with detailed physical attributes, platform targeting, and style configuration. Plus a character library to manage all characters.</p>

	<!-- ═══ 1. CHARACTER CREATOR WIZARD ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Character Creator</h3>
		<p class="ds-card__sub">5-step wizard: Creator Type → Platform Focus → Physical Attributes → Style &amp; Content → Review &amp; Generate.</p>

		<!-- Step indicator -->
		<div class="cos-steps">
			{#each Array(totalSteps) as _, i}
				<button
					class="cos-step"
					class:cos-step--active={wizardStep === i + 1}
					class:cos-step--done={wizardStep > i + 1}
					onclick={() => wizardStep = i + 1}
					aria-label="Go to step {i + 1}: {['Creator Type', 'Platforms', 'Attributes', 'Style', 'Review'][i]}"
					aria-current={wizardStep === i + 1 ? 'step' : undefined}
				>
					<div class="cos-step-circle">
						{#if wizardStep > i + 1}
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
						{:else}
							{i + 1}
						{/if}
					</div>
					<span class="cos-step-label">{['Type', 'Platforms', 'Attributes', 'Style', 'Review'][i]}</span>
				</button>
				{#if i < totalSteps - 1}
					<div class="cos-step-line" class:cos-step-line--done={wizardStep > i + 1}></div>
				{/if}
			{/each}
		</div>

		<!-- Step content -->
		<div class="cos-wizard-body">

			{#if wizardStep === 1}
				<div class="cos-step-section">
					<h4 class="cos-step-title">What type of creator is this character?</h4>
					<p class="cos-step-desc">Select all that apply — this shapes generated content styles, prompts, and aesthetics.</p>
					<div class="cos-type-grid">
						{#each creatorTypes as type}
							<button
								class="cos-type-chip"
								class:cos-type-chip--selected={selectedTypes.includes(type)}
								onclick={() => toggleType(type)}
								aria-pressed={selectedTypes.includes(type)}
							>{type}</button>
						{/each}
					</div>
					{#if selectedTypes.length > 0}
						<p class="cos-selection-note">{selectedTypes.length} selected: {selectedTypes.join(', ')}</p>
					{/if}
				</div>

			{:else if wizardStep === 2}
				<div class="cos-step-section">
					<h4 class="cos-step-title">Which platforms will this character post on?</h4>
					<p class="cos-step-desc">Platform selection tailors content format, aspect ratios, caption style, and tone.</p>
					<div class="cos-platform-grid">
						{#each platforms as p}
							<button
								class="btn-compact btn-compact-ghost cos-platform-btn"
								class:cos-platform-btn--selected={selectedPlatforms.includes(p.id)}
								onclick={() => togglePlatform(p.id)}
								aria-pressed={selectedPlatforms.includes(p.id)}
							>
								<span class="cos-platform-dot" class:cos-platform-dot--on={selectedPlatforms.includes(p.id)}></span>
								<span>{p.label}</span>
							</button>
						{/each}
					</div>
					{#if selectedPlatforms.length > 0}
						<p class="cos-selection-note">{selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected</p>
					{/if}
				</div>

			{:else if wizardStep === 3}
				<div class="cos-step-section">
					<h4 class="cos-step-title">Physical Attributes</h4>
					<p class="cos-step-desc">Define the character's appearance — used to generate consistent visuals across all content.</p>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Basic</div>
						<div class="cos-attr-grid">
							<div class="cos-attr-field cos-attr-field--wide">
								<label class="cos-attr-label">Gender</label>
								<div class="cos-pills-sm">
									{#each genderOpts as g}
										<button class="cos-pill-sm" class:cos-pill-sm--active={gender === g} onclick={() => gender = g}>{g}</button>
									{/each}
								</div>
							</div>
							<div class="cos-attr-field">
								<label class="cos-attr-label">Ethnicity</label>
								<select class="cos-select" bind:value={ethnicity} aria-label="Ethnicity">
									{#each ['Mixed', 'Asian', 'Black', 'Latina', 'White', 'Middle Eastern', 'South Asian'] as e}
										<option value={e}>{e}</option>
									{/each}
								</select>
							</div>
							<div class="cos-attr-field">
								<label class="cos-attr-label">Age Range</label>
								<select class="cos-select" bind:value={ageRange} aria-label="Age range">
									{#each ['18-21', '22-28', '29-35', '36-44'] as a}
										<option value={a}>{a}</option>
									{/each}
								</select>
							</div>
							<div class="cos-attr-field cos-attr-field--wide">
								<label class="cos-attr-label">Body Type</label>
								<div class="cos-pills-sm">
									{#each bodyOpts as b}
										<button class="cos-pill-sm" class:cos-pill-sm--active={bodyType === b} onclick={() => bodyType = b}>{b}</button>
									{/each}
								</div>
							</div>
							<div class="cos-attr-field">
								<label class="cos-attr-label">Height</label>
								<select class="cos-select" bind:value={height} aria-label="Height">
									{#each ["5'0\"","5'2\"","5'4\"","5'6\"","5'8\"","5'10\"","6'0\""] as h}
										<option value={h}>{h}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Face</div>
						<div class="cos-attr-grid">
							{#each [
								{ label: 'Eye Color',   bind: eyeColor,   set: (v: string) => eyeColor = v,   opts: ['Brown', 'Blue', 'Green', 'Hazel', 'Grey', 'Amber'] },
								{ label: 'Face Shape',  bind: faceShape,  set: (v: string) => faceShape = v,  opts: ['Oval', 'Round', 'Square', 'Heart', 'Diamond'] },
								{ label: 'Eye Shape',   bind: eyeShape,   set: (v: string) => eyeShape = v,   opts: ['Almond', 'Round', 'Hooded', 'Monolid', 'Upturned'] },
								{ label: 'Brow Shape',  bind: browShape,  set: (v: string) => browShape = v,  opts: ['Arched', 'Straight', 'Rounded', 'Bushy', 'Thin'] },
								{ label: 'Nose Type',   bind: noseType,   set: (v: string) => noseType = v,   opts: ['Straight', 'Button', 'Snub', 'Roman', 'Wide'] },
								{ label: 'Jawline',     bind: jawline,    set: (v: string) => jawline = v,    opts: ['Soft', 'Defined', 'Sharp', 'Round'] },
								{ label: 'Lip Shape',   bind: lipShape,   set: (v: string) => lipShape = v,   opts: ['Full', 'Thin', 'Bow', 'Wide', 'Pouty'] },
								{ label: 'Facial Hair', bind: facialHair, set: (v: string) => facialHair = v, opts: ['None', 'Stubble', 'Beard', 'Mustache'] },
							] as f}
								<div class="cos-attr-field">
									<label class="cos-attr-label">{f.label}</label>
									<select class="cos-select" value={f.bind} onchange={(e) => f.set((e.target as HTMLSelectElement).value)} aria-label={f.label}>
										{#each f.opts as o}<option value={o}>{o}</option>{/each}
									</select>
								</div>
							{/each}
						</div>
					</div>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Hair</div>
						<div class="cos-attr-grid">
							{#each [
								{ label: 'Color',  bind: hairColor, set: (v: string) => hairColor = v, opts: ['Black', 'Dark Brown', 'Brown', 'Blonde', 'Red', 'Pink', 'Silver', 'Blue'] },
								{ label: 'Style',  bind: hairStyle, set: (v: string) => hairStyle = v, opts: ['Straight', 'Waves', 'Curly', 'Coils', 'Braids', 'Locs'] },
								{ label: 'Length', bind: hairLength, set: (v: string) => hairLength = v, opts: ['Pixie', 'Bob', 'Shoulder', 'Long', 'Extra Long'] },
							] as h}
								<div class="cos-attr-field">
									<label class="cos-attr-label">{h.label}</label>
									<select class="cos-select" value={h.bind} onchange={(e) => h.set((e.target as HTMLSelectElement).value)} aria-label="Hair {h.label}">
										{#each h.opts as o}<option value={o}>{o}</option>{/each}
									</select>
								</div>
							{/each}
						</div>
					</div>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Skin</div>
						<div class="cos-attr-field">
							<label class="cos-attr-label">Skin Tone</label>
							<div class="cos-skin-row">
								{#each skinTones as tone, i}
									<button
										class="cos-skin-swatch"
										class:cos-skin-swatch--active={skinToneIdx === i}
										style="background:{tone}"
										onclick={() => skinToneIdx = i}
										aria-label="Skin tone {i + 1} of {skinTones.length}"
										aria-pressed={skinToneIdx === i}
									></button>
								{/each}
								<span class="cos-skin-preview" style="background:{skinTones[skinToneIdx]}" aria-hidden="true"></span>
							</div>
						</div>
						<div class="cos-attr-field" style="margin-top:8px">
							<label class="cos-attr-label">Skin Type</label>
							<div class="cos-pills-sm">
								{#each ['Oily', 'Dry', 'Combination', 'Normal'] as s}
									<button class="cos-pill-sm" class:cos-pill-sm--active={skinType === s} onclick={() => skinType = s}>{s}</button>
								{/each}
							</div>
						</div>
					</div>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Body Details</div>
						<div class="cos-attr-grid">
							{#each [
								{ label: 'Tattoos',      bind: tattoos,    set: (v: string) => tattoos = v,    opts: ['None', 'Minimal', 'Moderate', 'Heavy'] },
								{ label: 'Piercings',    bind: piercings,  set: (v: string) => piercings = v,  opts: ['None', 'Ears', 'Nose', 'Multiple'] },
								{ label: 'Makeup Style', bind: makeupStyle, set: (v: string) => makeupStyle = v, opts: ['Natural', 'Minimal', 'Glam', 'Editorial', 'Gothic'] },
							] as d}
								<div class="cos-attr-field">
									<label class="cos-attr-label">{d.label}</label>
									<select class="cos-select" value={d.bind} onchange={(e) => d.set((e.target as HTMLSelectElement).value)} aria-label={d.label}>
										{#each d.opts as o}<option value={o}>{o}</option>{/each}
									</select>
								</div>
							{/each}
						</div>
					</div>
				</div>

			{:else if wizardStep === 4}
				<div class="cos-step-section">
					<h4 class="cos-step-title">Style &amp; Content Preferences</h4>
					<p class="cos-step-desc">Define the character's visual aesthetic, voice, and content boundaries.</p>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Style Vibes</div>
						<div class="cos-type-grid">
							{#each styleVibes as v}
								<button
									class="cos-type-chip"
									class:cos-type-chip--selected={selectedVibes.includes(v)}
									onclick={() => toggleVibe(v)}
									aria-pressed={selectedVibes.includes(v)}
								>{v}</button>
							{/each}
						</div>
					</div>

					<div class="cos-attr-group">
						<div class="cos-attr-grid">
							{#each [
								{ label: 'Clothing Style',     bind: clothingStyle, set: (v: string) => clothingStyle = v, opts: ['Casual', 'Contemporary', 'Luxury', 'Streetwear', 'Bohemian'] },
								{ label: 'Voice Tone',         bind: voiceTone,     set: (v: string) => voiceTone = v,     opts: ['Warm & Playful', 'Professional', 'Edgy', 'Soft', 'Bold'] },
								{ label: 'Photography Style',  bind: photoStyle,    set: (v: string) => photoStyle = v,    opts: ['Editorial', 'Candid', 'Studio', 'Lifestyle', 'Fine Art'] },
								{ label: 'Mood',               bind: mood,          set: (v: string) => mood = v,          opts: ['Confident', 'Playful', 'Mysterious', 'Elegant', 'Fierce'] },
								{ label: 'Environment Prefs',  bind: environment,   set: (v: string) => environment = v,   opts: ['Urban / City', 'Nature', 'Studio', 'Luxury Interior', 'Beach'] },
							] as s}
								<div class="cos-attr-field">
									<label class="cos-attr-label">{s.label}</label>
									<select class="cos-select" value={s.bind} onchange={(e) => s.set((e.target as HTMLSelectElement).value)} aria-label={s.label}>
										{#each s.opts as o}<option value={o}>{o}</option>{/each}
									</select>
								</div>
							{/each}
						</div>
					</div>

					<div class="cos-attr-group">
						<div class="cos-attr-group-title">Content Rating</div>
						<p class="cos-step-desc" style="margin:0 0 8px">Sets the type of content that can be generated for this character.</p>
						<div class="cos-rating-row">
							{#each (['SFW', 'Suggestive', 'NSFW'] as const) as r}
								<button
									class="cos-rating-btn"
									class:cos-rating-btn--active={contentRating === r}
									style={contentRating === r ? `border-color:${ratingColors[r]};background:${ratingColors[r]}18;color:${ratingColors[r]}` : ''}
									onclick={() => contentRating = r}
									aria-pressed={contentRating === r}
								>
									<span class="cos-rating-dot" style={contentRating === r ? `background:${ratingColors[r]}` : ''}></span>
									{r}
								</button>
							{/each}
						</div>
					</div>
				</div>

			{:else if wizardStep === 5}
				<div class="cos-step-section">
					<h4 class="cos-step-title">Review &amp; Generate</h4>

					<div class="cos-review-layout">
						<div class="cos-review-avatar" aria-label="Character avatar placeholder">
							<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
						</div>

						<div class="cos-review-body">
							<div class="cos-attr-field" style="margin-bottom:14px">
								<label class="cos-attr-label" for="cos-char-name">Character Name</label>
								<input id="cos-char-name" class="cos-name-input" type="text" bind:value={characterName} placeholder="e.g. Aria, Nova, Zara…" aria-label="Character name" />
							</div>

							<div class="cos-review-grid">
								<div class="cos-review-section">
									<div class="cos-review-section-title">Creator Types</div>
									<div class="cos-review-chips">
										{#if selectedTypes.length}
											{#each selectedTypes as t}<span class="cos-review-chip">{t}</span>{/each}
										{:else}<span class="cos-empty-note">None selected</span>{/if}
									</div>
								</div>
								<div class="cos-review-section">
									<div class="cos-review-section-title">Platforms</div>
									<div class="cos-review-chips">
										{#if selectedPlatforms.length}
											{#each selectedPlatforms as pid}<span class="cos-review-chip">{platforms.find(x => x.id === pid)?.label ?? pid}</span>{/each}
										{:else}<span class="cos-empty-note">None selected</span>{/if}
									</div>
								</div>
								<div class="cos-review-section">
									<div class="cos-review-section-title">Physical</div>
									<div class="cos-review-attrs">
										<span>{gender} · {ethnicity} · {ageRange}</span>
										<span>{bodyType} · {height}</span>
										<span>{hairColor} {hairStyle} hair ({hairLength})</span>
										<span>{eyeColor} eyes · {faceShape} face</span>
									</div>
								</div>
								<div class="cos-review-section">
									<div class="cos-review-section-title">Style &amp; Content</div>
									<div class="cos-review-attrs">
										{#if selectedVibes.length}<span>{selectedVibes.slice(0,3).join(', ')}</span>{/if}
										<span>{clothingStyle} · {photoStyle} photography</span>
										<span>{mood} mood · {environment}</span>
										<span class="cos-rating-tag" style="color:{ratingColors[contentRating]}">{contentRating}</span>
									</div>
								</div>
							</div>

							<button class="btn-pill btn-pill-primary btn-pill-sm cos-create-btn" disabled={!characterName.trim()} aria-label="Generate character {characterName}">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
								Generate {characterName.trim() || 'Character'}
							</button>
						</div>
					</div>
				</div>
			{/if}

			<!-- Wizard nav -->
			<div class="cos-wizard-nav">
				<button class="btn-compact btn-compact-ghost" onclick={() => wizardStep = Math.max(1, wizardStep - 1)} disabled={wizardStep === 1} aria-label="Previous step">
					Back
				</button>
				{#if wizardStep < totalSteps}
					<button class="btn-compact btn-compact-primary" onclick={() => wizardStep = Math.min(totalSteps, wizardStep + 1)} aria-label="Next step">
						Continue
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- ═══ 2. CHARACTER LIBRARY ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Character Library</h3>
		<p class="ds-card__sub">Manage all created characters — view status, platform targets, and generation counts.</p>

		<div class="cos-lib-header">
			<div style="display:flex;gap:5px;">
				{#each (['all', 'active', 'draft'] as const) as f}
					<button
						class="cos-pill-sm"
						class:cos-pill-sm--active={libFilter === f}
						onclick={() => libFilter = f}
					>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
				{/each}
			</div>
			<button class="btn-compact btn-compact-primary" aria-label="Create new character">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
				New Character
			</button>
		</div>

		{#if filteredChars.length === 0}
			<div class="cos-lib-empty">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
				<p>No {libFilter === 'all' ? '' : libFilter + ' '}characters yet</p>
			</div>
		{:else}
			<div class="cos-char-grid">
				{#each filteredChars as char}
					<div class="cos-char-card">
						<div class="cos-char-avatar" aria-label="{char.name} avatar">
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
						</div>
						<div class="cos-char-info">
							<div class="cos-char-header">
								<span class="cos-char-name">{char.name}</span>
								<span class="cos-char-status cos-char-status--{char.status}">{char.status}</span>
							</div>
							<span class="cos-char-type">{char.type}</span>
							<div class="cos-char-platforms">
								{#each char.platforms.slice(0, 4) as pid}
									<span class="cos-char-platform-badge">{platforms.find(p => p.id === pid)?.label ?? pid}</span>
								{/each}
								{#if char.platforms.length > 4}
									<span class="cos-char-platform-more">+{char.platforms.length - 4}</span>
								{/if}
							</div>
							<span class="cos-char-gens">{char.gens.toLocaleString()} generations</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	/* ── Steps ──────────────────────────────────────────────────────── */
	.cos-steps { display: flex; align-items: center; margin-bottom: 20px; }
	.cos-step { display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; }
	.cos-step-circle { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--dbd); background: var(--dbg); color: var(--dt4); font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
	.cos-step--active .cos-step-circle { border-color: var(--dt); background: var(--dt); color: #fff; }
	.cos-step--done .cos-step-circle { border-color: #22c55e; background: #22c55e; color: #fff; }
	:global(.dark) .cos-step--active .cos-step-circle { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cos-step-label { font-size: 10px; font-weight: 600; color: var(--dt4); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
	.cos-step--active .cos-step-label { color: var(--dt2); }
	.cos-step--done .cos-step-label { color: #16a34a; }
	.cos-step-line { flex: 1; height: 2px; background: var(--dbd); margin: 0 4px; margin-bottom: 18px; transition: background 0.2s; }
	.cos-step-line--done { background: #22c55e; }

	/* ── Wizard body ────────────────────────────────────────────────── */
	.cos-wizard-body { display: flex; flex-direction: column; gap: 16px; }
	.cos-step-section { display: flex; flex-direction: column; gap: 14px; }
	.cos-step-title { font-size: 15px; font-weight: 700; margin: 0; color: var(--dt); letter-spacing: -0.01em; }
	.cos-step-desc { font-size: 13px; color: var(--dt3); margin: -6px 0 0; line-height: 1.5; }

	/* ── Creator type chips ─────────────────────────────────────────── */
	.cos-type-grid { display: flex; flex-wrap: wrap; gap: 6px; }
	.cos-type-chip { display: inline-flex; align-items: center; padding: 5px 13px; border: 1.5px solid var(--dbd); border-radius: 20px; background: transparent; color: var(--dt3); font-size: 12.5px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; }
	.cos-type-chip:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cos-type-chip--selected { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cos-type-chip--selected { border-color: #e5e5e5; background: #e5e5e5; color: #111; }
	.cos-selection-note { font-size: 11.5px; color: var(--dt3); margin: 0; }

	/* ── Platform grid ──────────────────────────────────────────────── */
	.cos-platform-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
	.cos-platform-dot { width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid var(--dbd); background: transparent; transition: all 0.12s; flex-shrink: 0; }
	.cos-platform-dot--on { border-color: #22c55e; background: #22c55e; }

	/* ── Attribute groups ───────────────────────────────────────────── */
	.cos-attr-group { display: flex; flex-direction: column; gap: 10px; padding: 14px; background: var(--dbg2); border-radius: 10px; border: 1px solid var(--dbd); }
	.cos-attr-group-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--dt3); }
	.cos-attr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
	.cos-attr-field { display: flex; flex-direction: column; gap: 5px; }
	.cos-attr-field--wide { grid-column: span 2; }
	.cos-attr-label { font-size: 11px; font-weight: 700; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; }
	.cos-select { border: 1.5px solid var(--dbd); border-radius: 7px; background: var(--dbg); color: var(--dt); font-size: 12.5px; font-family: inherit; padding: 6px 8px; outline: none; cursor: pointer; width: 100%; }
	.cos-select:focus { border-color: var(--dt3); }

	/* ── Small pills ────────────────────────────────────────────────── */
	.cos-pills-sm { display: flex; flex-wrap: wrap; gap: 4px; }
	.cos-pill-sm { display: inline-flex; align-items: center; padding: 4px 10px; border: 1.5px solid var(--dbd); border-radius: 16px; background: transparent; color: var(--dt3); font-size: 11.5px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; white-space: nowrap; }
	.cos-pill-sm:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cos-pill-sm--active { border-color: var(--dt); background: var(--dt); color: #fff; }
	:global(.dark) .cos-pill-sm--active { border-color: #e5e5e5; background: #e5e5e5; color: #111; }

	/* ── Skin tone ──────────────────────────────────────────────────── */
	.cos-skin-row { display: flex; align-items: center; gap: 6px; }
	.cos-skin-swatch { width: 24px; height: 24px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: all 0.12s; flex-shrink: 0; }
	.cos-skin-swatch:hover { transform: scale(1.15); }
	.cos-skin-swatch--active { box-shadow: 0 0 0 2px var(--dbg), 0 0 0 4px var(--dt); }
	.cos-skin-preview { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid var(--dbd); margin-left: 8px; flex-shrink: 0; }

	/* ── Rating ─────────────────────────────────────────────────────── */
	.cos-rating-row { display: flex; gap: 8px; }
	.cos-rating-btn { display: inline-flex; align-items: center; gap: 7px; padding: 7px 16px; border: 1.5px solid var(--dbd); border-radius: 8px; background: transparent; color: var(--dt3); font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.15s; }
	.cos-rating-btn:hover { border-color: var(--dbd2); color: var(--dt2); background: var(--dbg2); }
	.cos-rating-btn--active { font-weight: 700; }
	.cos-rating-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--dbd); transition: background 0.15s; }

	/* ── Review layout ──────────────────────────────────────────────── */
	.cos-review-layout { display: grid; grid-template-columns: 80px 1fr; gap: 20px; align-items: start; }
	.cos-review-avatar { width: 80px; height: 80px; background: var(--dbg3); border-radius: 16px; border: 1.5px dashed var(--dbd); display: flex; align-items: center; justify-content: center; color: var(--dt4); }
	.cos-review-body { display: flex; flex-direction: column; gap: 14px; }
	.cos-name-input { padding: 8px 12px; border: 1.5px solid var(--dbd); border-radius: 9px; background: var(--dbg); color: var(--dt); font-size: 14px; font-family: inherit; outline: none; width: 100%; box-sizing: border-box; font-weight: 600; }
	.cos-name-input:focus { border-color: var(--dt3); }
	.cos-name-input::placeholder { color: var(--dt4); font-weight: 400; }
	.cos-review-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
	.cos-review-section { display: flex; flex-direction: column; gap: 6px; padding: 12px; background: var(--dbg2); border-radius: 9px; border: 1px solid var(--dbd); }
	.cos-review-section-title { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--dt3); }
	.cos-review-chips { display: flex; flex-wrap: wrap; gap: 4px; }
	.cos-review-chip { display: inline-flex; padding: 2px 8px; border-radius: 5px; font-size: 11px; font-weight: 500; background: var(--dbg3); color: var(--dt2); border: 1px solid var(--dbd); }
	.cos-review-attrs { display: flex; flex-direction: column; gap: 2px; font-size: 12px; color: var(--dt2); }
	.cos-rating-tag { font-weight: 700; font-size: 12px; }
	.cos-empty-note { font-size: 11.5px; color: var(--dt4); font-style: italic; }

	/* ── Wizard nav ─────────────────────────────────────────────────── */
	.cos-wizard-nav { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--dbd); }

	/* ── Character library ──────────────────────────────────────────── */
	.cos-lib-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
	.cos-lib-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 48px 20px; color: var(--dt4); text-align: center; border: 1.5px dashed var(--dbd); border-radius: 12px; }
	.cos-lib-empty p { font-size: 13px; margin: 0; }
	.cos-char-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
	.cos-char-card { display: flex; align-items: flex-start; gap: 12px; padding: 14px; border: 1.5px solid var(--dbd); border-radius: 11px; background: var(--dbg); transition: border-color 0.15s; }
	.cos-char-card:hover { border-color: var(--dbd2); }
	.cos-char-avatar { width: 44px; height: 44px; border-radius: 12px; background: var(--dbg3); display: flex; align-items: center; justify-content: center; color: var(--dt4); flex-shrink: 0; border: 1.5px solid var(--dbd); }
	.cos-char-info { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
	.cos-char-header { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
	.cos-char-name { font-size: 14px; font-weight: 700; color: var(--dt); }
	.cos-char-status { display: inline-flex; padding: 2px 7px; border-radius: 5px; font-size: 10.5px; font-weight: 600; }
	.cos-char-status--active { background: rgba(34,197,94,0.1); color: #16a34a; }
	.cos-char-status--draft { background: var(--dbg3); color: var(--dt3); }
	.cos-char-type { font-size: 12px; color: var(--dt3); font-weight: 500; }
	.cos-char-platforms { display: flex; flex-wrap: wrap; gap: 3px; }
	.cos-char-platform-badge { display: inline-flex; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; background: var(--dbg2); color: var(--dt3); border: 1px solid var(--dbd); }
	.cos-char-platform-more { font-size: 10px; color: var(--dt4); padding: 1px 4px; }
	.cos-char-gens { font-size: 11px; color: var(--dt4); }
</style>
