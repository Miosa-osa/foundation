<section class="ds-section">
	<h2 class="ds-title">Colors</h2>
	<p class="ds-desc">Semantic color tokens from the BOS design token system. All components reference these for consistent theming.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Brand & Action</h3>
		<div class="ds-palette">
			{#each [
				['Primary', '--bos-v2-button-primary', '#1e96eb'],
				['Secondary', '--bos-v2-button-secondary', '#f4f4f5'],
				['Error', '--bos-v2-button-error', '#eb4335'],
				['Success', '--bos-v2-button-success', '#10b981'],
				['Warning', '--bos-v2-button-warning', '#f59e0b'],
			] as [label, token, fallback]}
				<div class="ds-color">
					<div class="ds-color__swatch" style="background: var({token}, {fallback}); {fallback === '#f4f4f5' ? 'box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08)' : ''}"></div>
					<span class="ds-color__name">{label}</span>
					<span class="ds-color__token">{token}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Text</h3>
		<div class="ds-palette">
			{#each [
				['Primary', '--bos-v2-text-primary', '#121212'],
				['Secondary', '--bos-v2-text-secondary', '#8e8d91'],
				['Tertiary', '--bos-v2-text-tertiary', '#bfbfc3'],
				['Emphasis', '--bos-v2-text-emphasis', '#1e96eb'],
				['Disabled', '--bos-v2-text-disable', '#c0bfc1'],
			] as [label, token, fallback]}
				<div class="ds-color">
					<div class="ds-color__swatch" style="background: var({token}, {fallback});"></div>
					<span class="ds-color__name">{label}</span>
					<span class="ds-color__token">{token}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Surfaces</h3>
		<div class="ds-palette">
			{#each [
				['Background', '--bos-v2-layer-background-primary', '#ffffff'],
				['Secondary', '--bos-v2-layer-background-secondary', '#f4f4f5'],
				['Tertiary', '--bos-v2-layer-background-tertiary', '#eeeef0'],
				['Overlay', '--bos-v2-layer-background-overlayPanel', '#fbfbfc'],
				['Code', '--bos-v2-layer-background-codeBlock', '#fafafa'],
			] as [label, token, fallback]}
				<div class="ds-color">
					<div class="ds-color__swatch" style="background: var({token}, {fallback}); box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);"></div>
					<span class="ds-color__name">{label}</span>
					<span class="ds-color__token">{token}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Tags</h3>
		<p class="ds-card__sub">Semantic tag colors with <code>--bos-tag-*</code> tokens</p>
		<div class="ds-tags-row">
			{#each [
				['Blue','--bos-tag-blue','#e8f4ff','--bos-tag-blue-text','#1a7fd4'],
				['Green','--bos-tag-green','#e6f6eb','--bos-tag-green-text','#0e8345'],
				['Purple','--bos-tag-purple','#f3edff','--bos-tag-purple-text','#7c3aed'],
				['Red','--bos-tag-red','#ffeded','--bos-tag-red-text','#dc2626'],
				['Yellow','--bos-tag-yellow','#fefae8','--bos-tag-yellow-text','#b45309'],
				['Orange','--bos-tag-orange','#fff4e8','--bos-tag-orange-text','#c2410c'],
				['Teal','--bos-tag-teal','#e0f5f4','--bos-tag-teal-text','#0d9488'],
				['Pink','--bos-tag-pink','#fff0f5','--bos-tag-pink-text','#db2777'],
				['Gray','--bos-tag-gray','#f5f5f5','--bos-tag-gray-text','#6b7280'],
			] as [label, bg, bgFallback, text, textFallback]}
				<span class="ds-semantic-tag" style="background: var({bg}, {bgFallback}); color: var({text}, {textFallback});">{label}</span>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Accent Colors</h3>
		<p class="ds-card__sub">Platform accent palette — <code>--accent-*</code></p>
		<div class="ds-palette">
			{#each [
				['Blue', '--accent-blue', '#4A90E2'],
				['Purple', '--accent-purple', '#A855F7'],
				['Pink', '--accent-pink', '#EC4899'],
				['Orange', '--accent-orange', '#FF6B35'],
				['Green', '--accent-green', '#10B981'],
				['Indigo', '--accent-indigo', '#667eea'],
				['Violet', '--accent-violet', '#764ba2'],
			] as [label, token, fallback]}
				<div class="ds-color">
					<div class="ds-color__swatch" style="background: var({token}, {fallback}); border-radius: 10px;"></div>
					<span class="ds-color__name">{label}</span>
					<span class="ds-color__token">{token}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Gradients</h3>
		<p class="ds-card__sub">iOS-inspired gradient backgrounds — <code>.gradient-*</code></p>
		<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
			{#each [
				['Welcome', 'var(--gradient-welcome)', 'gradient-welcome'],
				['Sign In', 'var(--gradient-signin)', 'gradient-signin'],
				['Personalization', 'var(--gradient-personalization)', 'gradient-personalization'],
				['Apps', 'var(--gradient-apps-showcase)', 'gradient-apps-showcase'],
				['Ready', 'var(--gradient-ready)', 'gradient-ready'],
				['Builder', 'var(--gradient-builder)', 'gradient-builder'],
			] as [label, gradient, cls]}
				<div style="background: {gradient}; border-radius: 12px; padding: 20px 16px; display: flex; flex-direction: column; gap: 2px;">
					<span style="font-size: 13px; font-weight: 600;">{label}</span>
					<code style="font-size: 10px; color: var(--dt3); font-family: var(--bos-font-code-family, monospace);">.{cls}</code>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Monochrome Scale</h3>
		<p class="ds-card__sub">The foundation — black to white through grays</p>
		<div style="display: flex; gap: 0; border-radius: 12px; overflow: hidden;">
			{#each [['#000','Black'],['#111','900'],['#1a1a1a','850'],['#2c2c2e','800'],['#3a3a3c','700'],['#48484a','600'],['#6e6e73','500'],['#8e8e93','400'],['#a1a1a6','300'],['#d1d1d6','200'],['#e5e5ea','100'],['#f5f5f7','50'],['#fff','White']] as [color, label]}
				<div style="flex: 1; height: 48px; background: {color};" title="{label}: {color}"></div>
			{/each}
		</div>
		<div style="display: flex; justify-content: space-between; padding: 6px 2px 0;">
			<span style="font-size: 10px; color: var(--dt3);">Black</span>
			<span style="font-size: 10px; color: var(--dt3);">White</span>
		</div>
	</div>
</section>
