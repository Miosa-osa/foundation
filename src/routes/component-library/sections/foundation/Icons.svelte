<section class="ds-section">
	<h2 class="ds-title">Icons</h2>
	<p class="ds-desc">Icon sizing system and usage patterns. All icons are inline SVG — no icon font dependency.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Icon Size Scale</h3>
		<p class="ds-card__sub">CSS custom properties <code>--icon-xs</code> through <code>--icon-4xl</code></p>
		<div class="ds-demo" style="gap: 28px; align-items: flex-end;">
			{#each [['xs','16','w-4 h-4'],['sm','20','w-5 h-5'],['md','24','w-6 h-6'],['lg','32','w-8 h-8'],['xl','48','w-12 h-12']] as [label, size, tw]}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<div style="width: {size}px; height: {size}px; display: flex; align-items: center; justify-content: center;">
						<svg style="width: {size}px; height: {size}px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
					</div>
					<div style="text-align: center;">
						<div style="font-size: 13px; font-weight: 600;">{label}</div>
						<div style="font-size: 11px; color: var(--dt3);">{size}px · {tw}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Icons in Pill Buttons</h3>
		<p class="ds-card__sub">Monochrome icon buttons at all sizes</p>
		<div class="ds-demo" style="gap: 12px;">
			{#each ['btn-pill-primary','btn-pill-secondary','btn-pill-ghost','btn-pill-outline','btn-pill-danger'] as variant}
				<button class="btn-pill btn-pill-icon {variant} btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
			{/each}
		</div>
		<div class="ds-demo" style="gap: 12px; margin-top: 12px;">
			{#each ['btn-pill-primary','btn-pill-secondary','btn-pill-ghost','btn-pill-outline','btn-pill-danger'] as variant}
				<button class="btn-pill btn-pill-icon {variant}">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
			{/each}
		</div>
		<div class="ds-demo" style="gap: 12px; margin-top: 12px;">
			{#each ['btn-pill-primary','btn-pill-secondary','btn-pill-ghost','btn-pill-outline','btn-pill-danger'] as variant}
				<button class="btn-pill btn-pill-icon {variant} btn-pill-lg">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Common Icon Set</h3>
		<p class="ds-card__sub">Frequently used icons across the platform</p>
		<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 4px;">
			{#each [
				['Add', 'M12 4v16m8-8H4'],
				['Search', 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'],
				['Close', 'M6 18L18 6M6 6l12 12'],
				['Check', 'M5 13l4 4L19 7'],
				['Edit', 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'],
				['Delete', 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'],
				['Copy', 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'],
				['Settings', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'],
				['Upload', 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'],
				['Share', 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'],
				['Menu', 'M4 6h16M4 12h16M4 18h16'],
				['Arrow R', 'M9 5l7 7-7 7'],
			] as [label, path]}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; border-radius: 8px; cursor: default; transition: background 0.12s;" class="hover:bg-gray-50">
					<svg class="w-5 h-5" style="color: var(--dt);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={path}/></svg>
					<span style="font-size: 10px; color: var(--dt3); text-align: center;">{label}</span>
				</div>
			{/each}
		</div>
	</div>

</section>
