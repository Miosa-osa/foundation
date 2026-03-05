<script lang="ts">
	// ── View mode (single-select) ──────────────────────────────────
	let viewMode = $state<'list' | 'grid' | 'board'>('grid');

	// ── Time range (single-select) ─────────────────────────────────
	let timeRange = $state<'day' | 'week' | 'month' | 'year'>('week');

	// ── Size demo (single-select) ──────────────────────────────────
	let sizeSm = $state('b');
	let sizeDef = $state('b');
	let sizeLg = $state('b');

	// ── Text alignment (single-select) ────────────────────────────
	let textAlign = $state<'left' | 'center' | 'right' | 'justify'>('left');

	// ── Font style (multi-select) ──────────────────────────────────
	let fontStyles = $state(new Set<string>(['bold']));

	function toggleFontStyle(val: string) {
		const next = new Set(fontStyles);
		next.has(val) ? next.delete(val) : next.add(val);
		fontStyles = next;
	}

	// ── Multi-select filters ───────────────────────────────────────
	let activeFilters = $state(new Set<string>(['frontend', 'backend']));

	function toggleFilter(val: string) {
		const next = new Set(activeFilters);
		next.has(val) ? next.delete(val) : next.add(val);
		activeFilters = next;
	}

	// ── Variant demos (single-select) ─────────────────────────────
	let variantOutline = $state('b');
	let variantFilled = $state('b');
	let variantGhost = $state('b');

	// ── Vertical orientation ───────────────────────────────────────
	let verticalSel = $state('option2');
</script>

<section class="ds-section">
	<h2 class="ds-title">Toggle Groups</h2>
	<p class="ds-desc">
		Segmented button groups for switching views, filtering content, and toggling formatting
		options. Support single-select and multi-select modes, three sizes, three variants, and both
		horizontal and vertical orientations.
	</p>

	<!-- ═══ SINGLE SELECT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Single Select</h3>
		<p class="ds-card__sub">Only one item active at a time — mutually exclusive choices</p>

		<h4 class="ds-card__h4">View Mode</h4>
		<div class="ds-demo">
			<div role="group" aria-label="View mode" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each [
					{ val: 'list', icon: '☰', label: 'List' },
					{ val: 'grid', icon: '⊞', label: 'Grid' },
					{ val: 'board', icon: '⊟', label: 'Board' },
				] as item}
					<button
						onclick={() => viewMode = item.val as typeof viewMode}
						aria-pressed={viewMode === item.val}
						style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 13px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {viewMode === item.val ? '#fff' : 'transparent'}; color: {viewMode === item.val ? '#000' : '#666'};"
					>
						<span style="font-size: 14px;">{item.icon}</span>
						{item.label}
					</button>
				{/each}
			</div>
			<span style="font-size: 12px; color: #555;">Selected: <strong style="color: #999;">{viewMode}</strong></span>
		</div>

		<h4 class="ds-card__h4">Time Range</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Time range" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each ['day', 'week', 'month', 'year'] as range}
					<button
						onclick={() => timeRange = range as typeof timeRange}
						aria-pressed={timeRange === range}
						style="padding: 6px 14px; font-size: 13px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {timeRange === range ? '#fff' : 'transparent'}; color: {timeRange === range ? '#000' : '#666'}; text-transform: capitalize;"
					>
						{range}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ MULTI SELECT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Multi Select</h3>
		<p class="ds-card__sub">Multiple items can be active simultaneously</p>

		<h4 class="ds-card__h4">Font Style (Bold / Italic / Underline / Strikethrough)</h4>
		<div class="ds-demo" style="gap: 16px; align-items: center;">
			<div role="group" aria-label="Font style" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each [
					{ val: 'bold', icon: 'B', style: 'font-weight: 700;' },
					{ val: 'italic', icon: 'I', style: 'font-style: italic;' },
					{ val: 'underline', icon: 'U', style: 'text-decoration: underline;' },
					{ val: 'strike', icon: 'S', style: 'text-decoration: line-through;' },
				] as item}
					<button
						onclick={() => toggleFontStyle(item.val)}
						aria-pressed={fontStyles.has(item.val)}
						style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 32px; font-size: 14px; font-family: serif; {item.style} border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {fontStyles.has(item.val) ? 'rgba(255,255,255,0.12)' : 'transparent'}; color: {fontStyles.has(item.val) ? '#fff' : '#555'}; outline: {fontStyles.has(item.val) ? '1px solid rgba(255,255,255,0.15)' : 'none'}; outline-offset: 0;"
					>
						{item.icon}
					</button>
				{/each}
			</div>
			<div style="font-size: 14px; color: #aaa; padding: 6px 12px; background: rgba(255,255,255,0.03); border-radius: 6px; {fontStyles.has('bold') ? 'font-weight: 700;' : ''} {fontStyles.has('italic') ? 'font-style: italic;' : ''} {fontStyles.has('underline') ? 'text-decoration: underline;' : ''} {fontStyles.has('strike') ? 'text-decoration: line-through;' : ''}">
				Sample text
			</div>
		</div>

		<h4 class="ds-card__h4">Category Filters</h4>
		<div class="ds-demo" style="flex-wrap: wrap; gap: 6px;">
			<div role="group" aria-label="Category filters" style="display: inline-flex; flex-wrap: wrap; gap: 4px;">
				{#each ['frontend', 'backend', 'database', 'devops', 'security', 'design'] as filter}
					<button
						onclick={() => toggleFilter(filter)}
						aria-pressed={activeFilters.has(filter)}
						style="padding: 5px 12px; font-size: 12px; font-weight: 500; border: 1px solid {activeFilters.has(filter) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}; border-radius: 9999px; cursor: pointer; transition: background 0.12s, color 0.12s, border-color 0.12s; background: {activeFilters.has(filter) ? 'rgba(255,255,255,0.12)' : 'transparent'}; color: {activeFilters.has(filter) ? '#fff' : '#666'}; text-transform: capitalize;"
					>
						{filter}
					</button>
				{/each}
			</div>
		</div>
		{#if activeFilters.size > 0}
			<p style="margin: 8px 0 0; font-size: 12px; color: #555;">
				Active: {[...activeFilters].join(', ')}
			</p>
		{/if}
	</div>

	<!-- ═══ SIZES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sizes</h3>
		<p class="ds-card__sub">Small (26px), default (32px), large (40px)</p>

		<h4 class="ds-card__h4">Small</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Small toggle group" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 7px; padding: 2px; gap: 2px;">
				{#each ['A', 'B', 'C'] as opt}
					<button
						onclick={() => sizeSm = opt}
						aria-pressed={sizeSm === opt}
						style="padding: 3px 10px; font-size: 12px; font-weight: 500; border: none; border-radius: 5px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {sizeSm === opt ? '#fff' : 'transparent'}; color: {sizeSm === opt ? '#000' : '#666'};"
					>
						Option {opt}
					</button>
				{/each}
			</div>
			<span style="font-size: 11px; color: #555;">sm — 26px height</span>
		</div>

		<h4 class="ds-card__h4">Default</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Default toggle group" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each ['A', 'B', 'C'] as opt}
					<button
						onclick={() => sizeDef = opt}
						aria-pressed={sizeDef === opt}
						style="padding: 6px 14px; font-size: 13px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {sizeDef === opt ? '#fff' : 'transparent'}; color: {sizeDef === opt ? '#000' : '#666'};"
					>
						Option {opt}
					</button>
				{/each}
			</div>
			<span style="font-size: 11px; color: #555;">default — 32px height</span>
		</div>

		<h4 class="ds-card__h4">Large</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Large toggle group" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 11px; padding: 4px; gap: 2px;">
				{#each ['A', 'B', 'C'] as opt}
					<button
						onclick={() => sizeLg = opt}
						aria-pressed={sizeLg === opt}
						style="padding: 9px 18px; font-size: 14px; font-weight: 500; border: none; border-radius: 8px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {sizeLg === opt ? '#fff' : 'transparent'}; color: {sizeLg === opt ? '#000' : '#666'};"
					>
						Option {opt}
					</button>
				{/each}
			</div>
			<span style="font-size: 11px; color: #555;">lg — 40px height</span>
		</div>
	</div>

	<!-- ═══ VARIANTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Variants</h3>
		<p class="ds-card__sub">Outline, filled, and ghost surface treatments</p>

		<h4 class="ds-card__h4">Outline</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Outline variant" style="display: inline-flex; gap: 4px;">
				{#each ['Left', 'Center', 'Right'] as opt}
					<button
						onclick={() => variantOutline = opt}
						aria-pressed={variantOutline === opt}
						style="padding: 6px 14px; font-size: 13px; font-weight: 500; border: 1px solid {variantOutline === opt ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s, border-color 0.12s; background: {variantOutline === opt ? 'rgba(255,255,255,0.1)' : 'transparent'}; color: {variantOutline === opt ? '#fff' : '#666'};"
					>
						{opt}
					</button>
				{/each}
			</div>
		</div>

		<h4 class="ds-card__h4">Filled</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Filled variant" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each ['Left', 'Center', 'Right'] as opt}
					<button
						onclick={() => variantFilled = opt}
						aria-pressed={variantFilled === opt}
						style="padding: 6px 14px; font-size: 13px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {variantFilled === opt ? '#fff' : 'transparent'}; color: {variantFilled === opt ? '#000' : '#666'};"
					>
						{opt}
					</button>
				{/each}
			</div>
		</div>

		<h4 class="ds-card__h4">Ghost</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Ghost variant" style="display: inline-flex; gap: 2px;">
				{#each ['Left', 'Center', 'Right'] as opt}
					<button
						onclick={() => variantGhost = opt}
						aria-pressed={variantGhost === opt}
						style="padding: 6px 14px; font-size: 13px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {variantGhost === opt ? 'rgba(255,255,255,0.08)' : 'transparent'}; color: {variantGhost === opt ? '#ddd' : '#555'};"
					>
						{opt}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ WITH ICONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">With Icons</h3>
		<p class="ds-card__sub">Icon-only and icon + label combinations</p>

		<h4 class="ds-card__h4">Text Alignment (Icon + Label)</h4>
		<div class="ds-demo">
			<div role="group" aria-label="Text alignment" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each [
					{ val: 'left', label: 'Left', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="15" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/></svg>' },
					{ val: 'center', label: 'Center', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="12" x2="18" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="4" y1="18" x2="20" y2="18" stroke-width="2" stroke-linecap="round"/></svg>' },
					{ val: 'right', label: 'Right', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/></svg>' },
					{ val: 'justify', label: 'Justify', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/></svg>' },
				] as item}
					<button
						onclick={() => textAlign = item.val as typeof textAlign}
						aria-pressed={textAlign === item.val}
						aria-label="{item.label} align"
						style="display: inline-flex; align-items: center; gap: 5px; padding: 6px 10px; font-size: 12px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {textAlign === item.val ? '#fff' : 'transparent'}; color: {textAlign === item.val ? '#000' : '#666'};"
					>
						{@html item.svg}
						{item.label}
					</button>
				{/each}
			</div>
		</div>

		<h4 class="ds-card__h4">Icon-Only View Toggle</h4>
		<div class="ds-demo">
			<div role="group" aria-label="View mode icon toggle" style="display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each [
					{ val: 'list', label: 'List view', svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="6" x2="3.01" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="3.01" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="3.01" y2="18" stroke-width="2" stroke-linecap="round"/></svg>' },
					{ val: 'grid', label: 'Grid view', svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>' },
					{ val: 'board', label: 'Board view', svg: '<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="5" height="18" rx="1" stroke-width="2"/><rect x="10" y="3" width="5" height="12" rx="1" stroke-width="2"/><rect x="17" y="3" width="4" height="15" rx="1" stroke-width="2"/></svg>' },
				] as item}
					<button
						onclick={() => viewMode = item.val as typeof viewMode}
						aria-pressed={viewMode === item.val}
						aria-label={item.label}
						style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 32px; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {viewMode === item.val ? '#fff' : 'transparent'}; color: {viewMode === item.val ? '#000' : '#666'};"
					>
						{@html item.svg}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ VERTICAL ORIENTATION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Vertical Orientation</h3>
		<p class="ds-card__sub">Stacked layout for sidebar or settings panel use</p>
		<div class="ds-demo" style="align-items: flex-start; gap: 32px;">
			<div role="group" aria-label="Vertical toggle" style="display: inline-flex; flex-direction: column; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px; gap: 2px;">
				{#each ['Option 1', 'Option 2', 'Option 3', 'Option 4'] as opt, i}
					<button
						onclick={() => verticalSel = `option${i + 1}`}
						aria-pressed={verticalSel === `option${i + 1}`}
						style="padding: 7px 20px; font-size: 13px; font-weight: 500; text-align: left; border: none; border-radius: 6px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {verticalSel === `option${i + 1}` ? '#fff' : 'transparent'}; color: {verticalSel === `option${i + 1}` ? '#000' : '#666'}; white-space: nowrap;"
					>
						{opt}
					</button>
				{/each}
			</div>

			<!-- Vertical icon+label navigation-style -->
			<div role="group" aria-label="Vertical nav toggle" style="display: inline-flex; flex-direction: column; gap: 2px; width: 160px;">
				{#each [
					{ val: 'overview', label: 'Overview', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>' },
					{ val: 'analytics', label: 'Analytics', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>' },
					{ val: 'settings', label: 'Settings', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' },
					{ val: 'members', label: 'Members', svg: '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>' },
				] as item}
					<button
						onclick={() => verticalSel = item.val}
						aria-pressed={verticalSel === item.val}
						style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; font-size: 13px; font-weight: 500; text-align: left; border: none; border-radius: 7px; cursor: pointer; transition: background 0.12s, color 0.12s; background: {verticalSel === item.val ? 'rgba(255,255,255,0.1)' : 'transparent'}; color: {verticalSel === item.val ? '#ddd' : '#666'}; width: 100%;"
					>
						{@html item.svg}
						{item.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>
