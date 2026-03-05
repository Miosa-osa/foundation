<section class="ds-section">
	<h2 class="ds-title">Typography</h2>
	<p class="ds-desc">Type scale, font families, weights, and spacing. Inter for UI text, SF Mono for code.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Font Families</h3>
		<div style="display: flex; flex-direction: column; gap: 20px;">
			<div style="padding: 20px; background: rgba(0,0,0,0.02); border-radius: 10px; border: 1px solid rgba(0,0,0,0.04);">
				<div style="font-size: 22px; font-weight: 500; letter-spacing: -0.02em;">Inter — The quick brown fox jumps over the lazy dog</div>
				<div style="display: flex; gap: 12px; margin-top: 8px;">
					<code style="font-size: 11px; color: #999; background: rgba(0,0,0,0.04); padding: 2px 8px; border-radius: 4px;">--bos-font-family</code>
					<span style="font-size: 12px; color: #aaa;">UI text, headings, labels</span>
				</div>
			</div>
			<div style="padding: 20px; background: rgba(0,0,0,0.02); border-radius: 10px; border: 1px solid rgba(0,0,0,0.04);">
				<div style="font-family: var(--bos-font-code-family, 'SF Mono', monospace); font-size: 15px;">SF Mono — const result = await fetch('/api/data');</div>
				<div style="display: flex; gap: 12px; margin-top: 8px;">
					<code style="font-size: 11px; color: #999; background: rgba(0,0,0,0.04); padding: 2px 8px; border-radius: 4px;">--bos-font-code-family</code>
					<span style="font-size: 12px; color: #aaa;">Code blocks, model badges, inline code</span>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Type Scale</h3>
		<p class="ds-card__sub">Heading and body sizes with recommended weights</p>
		<div style="display: flex; flex-direction: column; gap: 0;">
			{#each [
				['H1', '28px', '700', '-0.02em', 'Page titles'],
				['H2', '24px', '700', '-0.02em', 'Section headings'],
				['H3', '20px', '600', '-0.01em', 'Card titles'],
				['H4', '17px', '600', '-0.01em', 'Sub-headings'],
				['Body', '15px', '400', '-0.01em', 'Default text'],
				['Small', '13px', '400', '0', 'Labels, captions'],
				['XS', '11px', '500', '0.02em', 'Badges, metadata'],
			] as [label, size, weight, spacing, usage]}
				<div style="display: flex; align-items: baseline; gap: 16px; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
					<div style="width: 44px; flex-shrink: 0;">
						<span style="font-size: 11px; font-weight: 600; color: #999;">{label}</span>
					</div>
					<div style="flex: 1;">
						<span style="font-size: {size}; font-weight: {weight}; letter-spacing: {spacing};">The quick brown fox jumps over the lazy dog</span>
					</div>
					<div style="width: 110px; flex-shrink: 0; text-align: right;">
						<span style="font-size: 11px; color: #bbb;">{size} / {weight}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Font Weights</h3>
		<p class="ds-card__sub">Available weights for Inter</p>
		<div style="display: flex; flex-direction: column; gap: 0;">
			{#each [
				['400', 'Regular', 'Body text, paragraphs'],
				['500', 'Medium', 'Labels, input values, buttons'],
				['600', 'Semibold', 'Sub-headings, card titles, emphasis'],
				['700', 'Bold', 'Page titles, hero text, metrics'],
			] as [weight, name, usage]}
				<div style="display: flex; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
					<span style="font-size: 18px; font-weight: {weight}; width: 200px;">Aa Bb Cc 123</span>
					<code style="font-size: 11px; color: #999; background: rgba(0,0,0,0.04); padding: 2px 8px; border-radius: 4px; flex-shrink: 0;">{weight}</code>
					<span style="font-size: 13px; font-weight: 600; width: 80px;">{name}</span>
					<span style="font-size: 12px; color: #999;">{usage}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Letter Spacing</h3>
		<div style="display: flex; flex-direction: column; gap: 0;">
			{#each [
				['-0.02em', 'Tight', 'H1, H2 — large headings'],
				['-0.01em', 'Default', 'H3, H4, body text'],
				['0', 'Normal', 'Small text, labels'],
				['0.02em', 'Wide', 'XS text, badges, all-caps'],
				['0.05em', 'Extra Wide', 'Sidebar group labels, section titles'],
			] as [spacing, name, usage]}
				<div style="display: flex; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
					<span style="font-size: 15px; letter-spacing: {spacing}; width: 220px;">ABCDEFGHIJKLM</span>
					<code style="font-size: 11px; color: #999; background: rgba(0,0,0,0.04); padding: 2px 8px; border-radius: 4px; flex-shrink: 0;">{spacing}</code>
					<span style="font-size: 13px; font-weight: 600; width: 90px;">{name}</span>
					<span style="font-size: 12px; color: #999;">{usage}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Code Typography</h3>
		<p class="ds-card__sub">Monospace styles for code and technical content</p>
		<div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
			<pre style="padding: 16px; background: rgba(0,0,0,0.03); border-radius: 8px; font-family: var(--bos-font-code-family, 'SF Mono', monospace); font-size: 14px; margin: 0; line-height: 1.6; overflow-x: auto;"><code><span style="color: #666;">const</span> <span style="color: #333;">config</span> = &#123;
  <span style="color: #666;">theme:</span> <span style="color: #22863a;">&quot;dark-monochrome&quot;</span>,
  <span style="color: #666;">radius:</span> <span style="color: #005cc5;">&quot;pill&quot;</span>,
  <span style="color: #666;">glass:</span> <span style="color: #005cc5;">true</span>,
&#125;;</code></pre>
			<div style="display: flex; gap: 8px; flex-wrap: wrap;">
				<code style="font-size: 13px; padding: 4px 10px; background: rgba(0,0,0,0.05); border-radius: 6px; border: 1px solid rgba(0,0,0,0.06);">inline code</code>
				<code style="font-size: 11px; padding: 2px 8px; background: rgba(0,0,0,0.04); border-radius: 6px; color: #777;">model badge</code>
				<code style="font-size: 12px; padding: 3px 8px; background: rgba(0,0,0,0.05); border-radius: 5px; font-weight: 500;">token name</code>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">CSS Token Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
			<tbody>
				<tr><td><code>--bos-font-family</code></td><td>Inter, system-ui, sans-serif</td><td>All UI text</td></tr>
				<tr><td><code>--bos-font-code-family</code></td><td>'SF Mono', monospace</td><td>Code, badges</td></tr>
				<tr><td><code>--text-xs</code></td><td>0.75rem (12px)</td><td>Badges, metadata</td></tr>
				<tr><td><code>--text-sm</code></td><td>0.8125rem (13px)</td><td>Labels, captions</td></tr>
				<tr><td><code>--text-base</code></td><td>0.9375rem (15px)</td><td>Body text</td></tr>
				<tr><td><code>--text-lg</code></td><td>1.0625rem (17px)</td><td>Sub-headings</td></tr>
				<tr><td><code>--text-xl</code></td><td>1.25rem (20px)</td><td>Card titles</td></tr>
				<tr><td><code>--font-medium</code></td><td>500</td><td>Buttons, labels</td></tr>
				<tr><td><code>--font-semibold</code></td><td>600</td><td>Headings, emphasis</td></tr>
				<tr><td><code>--font-bold</code></td><td>700</td><td>Page titles</td></tr>
			</tbody>
		</table>
	</div>
</section>
