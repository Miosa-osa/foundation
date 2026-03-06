<section class="ds-section">
	<h2 class="ds-title">Spacing & Radius</h2>
	<p class="ds-desc">The spatial foundation of the design system. Consistent spacing creates visual rhythm.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Spacing Scale</h3>
		<p class="ds-card__sub">4px base unit, powers-of-2 progression</p>
		<div class="ds-spacing">
			{#each [['4px','--space-1','Inline icon gap'],['8px','--space-2','Tight element gap'],['12px','--space-3','Button padding-y'],['16px','--space-4','Card padding, section gap'],['20px','--space-5','Component gap'],['24px','--space-6','Card padding (large)'],['32px','--space-8','Section margin'],['40px','--space-10','Page padding'],['48px','--space-12','Major section break']] as [px, token, usage]}
				<div class="ds-spacing__row">
					<code class="ds-spacing__token">{token}</code>
					<div class="ds-spacing__bar" style="width: {px};"></div>
					<span class="ds-spacing__val">{px}</span>
					<span style="font-size: 11px; color: var(--dt4); margin-left: 8px;">{usage}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Border Radius</h3>
		<p class="ds-card__sub">From subtle corners to full pills</p>
		<div class="ds-demo" style="gap: 20px;">
			{#each [['4px','xs','Badges'],['6px','sm','Tags, chips'],['8px','md','Inputs, BOS Button'],['12px','lg','Cards, panels'],['16px','xl','Modals, large cards'],['9999px','full','Pill buttons, avatars']] as [r, label, usage]}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
					<div class="ds-radius" style="border-radius: {r};">
						<span>{label}</span>
						<span style="font-size: 11px; opacity: 0.4;">{r}</span>
					</div>
					<span style="font-size: 11px; color: var(--dt3); text-align: center; max-width: 80px;">{usage}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Component Heights</h3>
		<p class="ds-card__sub">Standard heights for interactive elements</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 400px;">
			{#each [['24px','btn-pill-xs','Extra small button'],['28px','btn-pill-sm / BOS default','Small button'],['36px','btn-pill (default)','Default button / input'],['40px','btn-pill-lg / BOS extraLarge','Large button'],['44px','btn-pill-xl','Extra large button']] as [h, token, desc]}
				<div style="display: flex; align-items: center; gap: 12px;">
					<div style="width: 60px; height: {h}; background: var(--dt); border-radius: 9999px; flex-shrink: 0;"></div>
					<div>
						<div style="font-size: 13px; font-weight: 600;">{h}</div>
						<div style="font-size: 11px; color: var(--dt3);">{token} — {desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
