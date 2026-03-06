<section class="ds-section">
	<h2 class="ds-title">Shadows & Elevation</h2>
	<p class="ds-desc">Layered elevation system creating depth hierarchy. From subtle card lift to floating overlays.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Elevation Levels</h3>
		<p class="ds-card__sub">Progressive shadow intensity for visual hierarchy</p>
		<div class="ds-demo" style="gap: 28px; padding: 16px 0;">
			{#each [
				['Level 0', 'none', 'Flat / inline', 'Background elements'],
				['Level 1', '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)', 'Subtle', 'Cards, list items'],
				['Level 2', '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)', 'Medium', 'Panels, hovering cards'],
				['Level 3', '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)', 'Elevated', 'Floating elements'],
				['Level 4', '0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)', 'Overlay', 'Modals, popovers'],
			] as [label, shadow, intensity, usage]}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
					<div style="width: 120px; height: 80px; background: #fff; border-radius: 12px; box-shadow: {shadow}; border: 1px solid rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center;">
						<span style="font-size: 12px; font-weight: 600; color: var(--dt);">{intensity}</span>
					</div>
					<div style="text-align: center;">
						<div style="font-size: 13px; font-weight: 600;">{label}</div>
						<div style="font-size: 11px; color: var(--dt3);">{usage}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Design Token Shadows</h3>
		<p class="ds-card__sub">BOS CSS custom property shadows</p>
		<div class="ds-demo" style="gap: 24px; padding: 8px 0;">
			{#each [
				['Shadow 1', '--bos-shadow-1', 'Cards, resting'],
				['Shadow 2', '--bos-shadow-2', 'Panels, hovered'],
				['Shadow 3', '--bos-shadow-3', 'Floating, active'],
				['Popover', '--bos-popover-shadow', 'Dropdown menus'],
			] as [label, token, usage]}
				<div class="ds-shadow-card" style="box-shadow: var({token}, 0 2px 8px rgba(0,0,0,0.08));">
					<strong style="font-size: 14px;">{label}</strong>
					<code style="font-size: 11px; color: var(--dt4);">{token}</code>
					<span style="font-size: 12px; color: var(--dt3);">{usage}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Pill Button Shadows</h3>
		<p class="ds-card__sub">Special composite shadows on pill variants</p>
		<div class="ds-demo" style="gap: 16px;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-pill btn-pill-primary">Primary</button>
				<span style="font-size: 11px; color: var(--dt3);">Inner glow + drop</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-pill btn-pill-secondary">Secondary</button>
				<span style="font-size: 11px; color: var(--dt3);">Subtle border shadow</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-pill btn-pill-danger">Danger</button>
				<span style="font-size: 11px; color: var(--dt3);">Red glow</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-pill btn-pill-success">Success</button>
				<span style="font-size: 11px; color: var(--dt3);">Green glow</span>
			</div>
		</div>
	</div>

</section>
