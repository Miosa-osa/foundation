<script lang="ts">
	import { Button } from '$lib/ui';
</script>

<section class="ds-section">
	<h2 class="ds-title">Buttons</h2>
	<p class="ds-desc">Four shape systems for different contexts. Full radius (pill), standard radius (rounded), tight radius (compact), and frosted glass (glassmorphic). Each shape has its own variant, size, and state system.</p>

	<!-- ═══ FULL RADIUS (PILL) ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Full Radius — Pill Shape</h3>
		<p class="ds-card__sub">9999px radius. The hero shape — CTAs, primary actions, onboarding. Dark monochrome gradient is the primary variant.</p>

		<h4 class="ds-card__h4">Core Variants</h4>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary">Primary</button>
			<button class="btn-pill btn-pill-secondary">Secondary</button>
			<button class="btn-pill btn-pill-ghost">Ghost</button>
			<button class="btn-pill btn-pill-outline">Outline</button>
			<button class="btn-pill btn-pill-soft">Soft</button>
		</div>

		<h4 class="ds-card__h4">Semantic Variants</h4>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-danger">Danger</button>
			<button class="btn-pill btn-pill-success">Success</button>
			<button class="btn-pill btn-pill-warning">Warning</button>
			<button class="btn-pill btn-pill-link">Link Style</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Sizes</h3>
		<p class="ds-card__sub">All sizes auto-scale text, padding, and icon proportionally</p>

		<h4 class="ds-card__h4">Primary Scale</h4>
		<div class="ds-demo" style="align-items: flex-end;">
			<button class="btn-pill btn-pill-primary btn-pill-xs">Extra Small</button>
			<button class="btn-pill btn-pill-primary btn-pill-sm">Small</button>
			<button class="btn-pill btn-pill-primary">Default</button>
			<button class="btn-pill btn-pill-primary btn-pill-lg">Large</button>
			<button class="btn-pill btn-pill-primary btn-pill-xl">Extra Large</button>
		</div>

		<h4 class="ds-card__h4">Secondary Scale</h4>
		<div class="ds-demo" style="align-items: flex-end;">
			<button class="btn-pill btn-pill-secondary btn-pill-xs">Extra Small</button>
			<button class="btn-pill btn-pill-secondary btn-pill-sm">Small</button>
			<button class="btn-pill btn-pill-secondary">Default</button>
			<button class="btn-pill btn-pill-secondary btn-pill-lg">Large</button>
			<button class="btn-pill btn-pill-secondary btn-pill-xl">Extra Large</button>
		</div>

		<h4 class="ds-card__h4">Ghost Scale</h4>
		<div class="ds-demo" style="align-items: flex-end;">
			<button class="btn-pill btn-pill-ghost btn-pill-xs">Extra Small</button>
			<button class="btn-pill btn-pill-ghost btn-pill-sm">Small</button>
			<button class="btn-pill btn-pill-ghost">Default</button>
			<button class="btn-pill btn-pill-ghost btn-pill-lg">Large</button>
			<button class="btn-pill btn-pill-ghost btn-pill-xl">Extra Large</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Icon Buttons</h3>
		<p class="ds-card__sub">Square pill icons at 3 sizes</p>

		<div class="ds-demo" style="gap: 16px;">
			<!-- Small icons -->
			<div style="display: flex; gap: 6px; align-items: center;">
				<button class="btn-pill btn-pill-icon btn-pill-primary btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-secondary btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-danger btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				</button>
				<span style="font-size: 12px; color: #999; margin-left: 4px;">sm</span>
			</div>

			<!-- Default icons -->
			<div style="display: flex; gap: 6px; align-items: center;">
				<button class="btn-pill btn-pill-icon btn-pill-primary">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-secondary">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-ghost">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-outline">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
				</button>
				<span style="font-size: 12px; color: #999; margin-left: 4px;">default</span>
			</div>

			<!-- Large icons -->
			<div style="display: flex; gap: 6px; align-items: center;">
				<button class="btn-pill btn-pill-icon btn-pill-primary btn-pill-lg">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-secondary btn-pill-lg">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-lg">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
				</button>
				<span style="font-size: 12px; color: #999; margin-left: 4px;">lg</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">States</h3>

		<h4 class="ds-card__h4">Disabled</h4>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary" disabled>Disabled Primary</button>
			<button class="btn-pill btn-pill-secondary" disabled>Disabled Secondary</button>
			<button class="btn-pill btn-pill-danger" disabled>Disabled Danger</button>
		</div>

		<h4 class="ds-card__h4">Loading</h4>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary btn-pill-loading">Loading</button>
			<button class="btn-pill btn-pill-secondary btn-pill-loading">Loading</button>
			<button class="btn-pill btn-pill-danger btn-pill-loading">Loading</button>
			<button class="btn-pill btn-pill-success btn-pill-loading">Loading</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Button Groups</h3>
		<p class="ds-card__sub">Segmented control pattern</p>
		<div class="ds-demo">
			<div class="btn-pill-group">
				<button class="btn-pill btn-pill-primary">Day</button>
				<button class="btn-pill btn-pill-ghost">Week</button>
				<button class="btn-pill btn-pill-ghost">Month</button>
			</div>
			<div class="btn-pill-group">
				<button class="btn-pill btn-pill-ghost">List</button>
				<button class="btn-pill btn-pill-primary">Grid</button>
				<button class="btn-pill btn-pill-ghost">Board</button>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Full Width</h3>
		<div style="max-width: 400px; display: flex; flex-direction: column; gap: 10px;">
			<button class="btn-pill btn-pill-primary btn-pill-block btn-pill-lg">Create New Project</button>
			<button class="btn-pill btn-pill-outline btn-pill-block btn-pill-lg">Import from Template</button>
			<button class="btn-pill btn-pill-ghost btn-pill-block">Cancel</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Common Patterns</h3>

		<h4 class="ds-card__h4">Confirm / Cancel</h4>
		<div class="ds-demo">
			<div style="display: flex; gap: 8px;">
				<button class="btn-pill btn-pill-ghost btn-pill-sm">Cancel</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Confirm</button>
			</div>
			<div style="display: flex; gap: 8px;">
				<button class="btn-pill btn-pill-secondary">Decline</button>
				<button class="btn-pill btn-pill-primary">Accept</button>
			</div>
			<div style="display: flex; gap: 8px;">
				<button class="btn-pill btn-pill-ghost btn-pill-sm">Cancel</button>
				<button class="btn-pill btn-pill-danger btn-pill-sm">Delete</button>
			</div>
		</div>

		<h4 class="ds-card__h4">Toolbar</h4>
		<div class="ds-demo">
			<div style="display: flex; gap: 4px; padding: 4px; background: rgba(0,0,0,0.02); border-radius: 9999px; border: 1px solid rgba(0,0,0,0.04);">
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
				</button>
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				</button>
			</div>
		</div>

		<h4 class="ds-card__h4">With Icons</h4>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary btn-pill-sm">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				New Project
			</button>
			<button class="btn-pill btn-pill-secondary btn-pill-sm">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
				Upload
			</button>
			<button class="btn-pill btn-pill-ghost btn-pill-sm">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
				Filters
			</button>
			<button class="btn-pill btn-pill-outline btn-pill-sm">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
				Share
			</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Variant x Size Matrix</h3>
		<p class="ds-card__sub">Every pill variant at every size</p>
		<div style="overflow-x: auto;">
			<div class="ds-matrix ds-matrix--5">
				<div></div><div class="ds-matrix__h">XS</div><div class="ds-matrix__h">SM</div><div class="ds-matrix__h">Default</div><div class="ds-matrix__h">LG</div><div class="ds-matrix__h">XL</div>
				{#each [
					['primary', 'btn-pill-primary'],
					['secondary', 'btn-pill-secondary'],
					['ghost', 'btn-pill-ghost'],
					['outline', 'btn-pill-outline'],
					['soft', 'btn-pill-soft'],
					['danger', 'btn-pill-danger'],
					['success', 'btn-pill-success'],
					['warning', 'btn-pill-warning'],
				] as [label, cls]}
					<div class="ds-matrix__label">{label}</div>
					<div><button class="btn-pill {cls} btn-pill-xs">Button</button></div>
					<div><button class="btn-pill {cls} btn-pill-sm">Button</button></div>
					<div><button class="btn-pill {cls}">Button</button></div>
					<div><button class="btn-pill {cls} btn-pill-lg">Button</button></div>
					<div><button class="btn-pill {cls} btn-pill-xl">Button</button></div>
				{/each}
			</div>
		</div>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══ BOS SVELTE BUTTON COMPONENT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">BOS Button Component</h3>
		<p class="ds-card__sub">Svelte component from <code>$lib/ui</code> — rectangular style for inline/form use</p>

		<h4 class="ds-card__h4">Variants</h4>
		<div class="ds-demo">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="plain">Plain</Button>
			<Button variant="error">Destructive</Button>
			<Button variant="success">Success</Button>
		</div>

		<h4 class="ds-card__h4">Sizes</h4>
		<div class="ds-demo" style="align-items: flex-end;">
			<Button variant="primary" size="default">Default 28px</Button>
			<Button variant="primary" size="large">Large 32px</Button>
			<Button variant="primary" size="extraLarge">XL 40px</Button>
		</div>

		<h4 class="ds-card__h4">States</h4>
		<div class="ds-demo">
			<Button variant="primary">Normal</Button>
			<Button variant="primary" disabled>Disabled</Button>
			<Button variant="primary" loading>Loading</Button>
		</div>

		<h4 class="ds-card__h4">Full Width</h4>
		<div style="max-width: 380px; display: flex; flex-direction: column; gap: 8px;">
			<Button variant="primary" size="extraLarge" block>Create Project</Button>
			<Button variant="secondary" size="large" block>Cancel</Button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">CSS Class Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Class</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td><code>.btn-pill</code></td><td>Base — required on every pill button</td></tr>
				<tr><td><code>.btn-pill-primary</code></td><td>Dark monochrome gradient — the signature style</td></tr>
				<tr><td><code>.btn-pill-secondary</code></td><td>White / glass with subtle border</td></tr>
				<tr><td><code>.btn-pill-ghost</code></td><td>Transparent glass with light border</td></tr>
				<tr><td><code>.btn-pill-outline</code></td><td>Dark border only, fills on hover</td></tr>
				<tr><td><code>.btn-pill-soft</code></td><td>Subtle gray tint</td></tr>
				<tr><td><code>.btn-pill-danger</code></td><td>Red gradient</td></tr>
				<tr><td><code>.btn-pill-success</code></td><td>Green gradient</td></tr>
				<tr><td><code>.btn-pill-warning</code></td><td>Yellow gradient</td></tr>
				<tr><td><code>.btn-pill-link</code></td><td>Underlined text only</td></tr>
				<tr><td><code>.btn-pill-xs</code></td><td>Extra small size</td></tr>
				<tr><td><code>.btn-pill-sm</code></td><td>Small size</td></tr>
				<tr><td><code>.btn-pill-lg</code></td><td>Large size</td></tr>
				<tr><td><code>.btn-pill-xl</code></td><td>Extra large size</td></tr>
				<tr><td><code>.btn-pill-icon</code></td><td>Icon-only square pill</td></tr>
				<tr><td><code>.btn-pill-loading</code></td><td>Loading spinner state</td></tr>
				<tr><td><code>.btn-pill-block</code></td><td>Full width</td></tr>
				<tr><td><code>.btn-pill-group</code></td><td>Segmented control wrapper</td></tr>
				<tr><td colspan="2" style="padding-top: 12px; font-weight: 600; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Glass Family</td></tr>
				<tr><td><code>.btn-glass</code></td><td>Base — required on every glass button</td></tr>
				<tr><td><code>.btn-glass-pill</code></td><td>Full-radius glass shape (9999px)</td></tr>
				<tr><td><code>.btn-glass-rounded</code></td><td>Rounded glass shape (8px)</td></tr>
				<tr><td><code>.btn-glass-compact</code></td><td>Compact glass shape (6px)</td></tr>
				<tr><td><code>.btn-glass-light</code></td><td>Light frosted glass surface</td></tr>
				<tr><td><code>.btn-glass-dark</code></td><td>Dark frosted glass surface</td></tr>
				<tr><td><code>.btn-glass-frosted</code></td><td>Subtle frosted glass</td></tr>
				<tr><td><code>.btn-glass-subtle</code></td><td>Barely-there glass tint</td></tr>
				<tr><td><code>.btn-glass-accent</code></td><td>Gradient glass with inner glow</td></tr>
				<tr><td colspan="2" style="padding-top: 12px; font-weight: 600; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Gray Spectrum</td></tr>
				<tr><td><code>.btn-pill-gray-100</code> to <code>.btn-pill-gray-900</code></td><td>9-shade monochrome scale</td></tr>
			</tbody>
		</table>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══ STANDARD RADIUS (ROUNDED) ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Standard Radius — Rounded Shape</h3>
		<p class="ds-card__sub">8px radius. The workhorse — forms, cards, settings, inline actions. Structured but not dominant.</p>

		<h4 class="ds-card__h4">Core Variants</h4>
		<div class="ds-demo">
			<button class="btn-rounded btn-rounded-primary">Primary</button>
			<button class="btn-rounded btn-rounded-secondary">Secondary</button>
			<button class="btn-rounded btn-rounded-ghost">Ghost</button>
			<button class="btn-rounded btn-rounded-danger">Danger</button>
		</div>

		<h4 class="ds-card__h4">Sizes</h4>
		<div class="ds-demo" style="align-items: flex-end;">
			<button class="btn-rounded btn-rounded-primary btn-rounded-xs">Extra Small</button>
			<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Small</button>
			<button class="btn-rounded btn-rounded-primary">Default</button>
			<button class="btn-rounded btn-rounded-primary btn-rounded-lg">Large</button>
		</div>

		<h4 class="ds-card__h4">Secondary at All Sizes</h4>
		<div class="ds-demo" style="align-items: flex-end;">
			<button class="btn-rounded btn-rounded-secondary btn-rounded-xs">Extra Small</button>
			<button class="btn-rounded btn-rounded-secondary btn-rounded-sm">Small</button>
			<button class="btn-rounded btn-rounded-secondary">Default</button>
			<button class="btn-rounded btn-rounded-secondary btn-rounded-lg">Large</button>
		</div>

		<h4 class="ds-card__h4">Icon Buttons</h4>
		<div class="ds-demo" style="gap: 16px;">
			<!-- Small icon set -->
			<div style="display: flex; gap: 6px; align-items: center;">
				<button class="btn-rounded btn-rounded-primary btn-rounded-icon btn-rounded-sm" aria-label="Add">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
				<button class="btn-rounded btn-rounded-secondary btn-rounded-icon btn-rounded-sm" aria-label="Search">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				</button>
				<button class="btn-rounded btn-rounded-ghost btn-rounded-icon btn-rounded-sm" aria-label="Settings">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
				</button>
				<span style="font-size: 12px; color: #999; margin-left: 4px;">sm</span>
			</div>
			<!-- Default icon set -->
			<div style="display: flex; gap: 6px; align-items: center;">
				<button class="btn-rounded btn-rounded-primary btn-rounded-icon" aria-label="Add">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
				<button class="btn-rounded btn-rounded-secondary btn-rounded-icon" aria-label="Edit">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
				</button>
				<button class="btn-rounded btn-rounded-ghost btn-rounded-icon" aria-label="Delete">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				</button>
				<span style="font-size: 12px; color: #999; margin-left: 4px;">default</span>
			</div>
			<!-- Large icon set -->
			<div style="display: flex; gap: 6px; align-items: center;">
				<button class="btn-rounded btn-rounded-primary btn-rounded-icon btn-rounded-lg" aria-label="Add">
					<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
				<button class="btn-rounded btn-rounded-secondary btn-rounded-icon btn-rounded-lg" aria-label="Upload">
					<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
				</button>
				<button class="btn-rounded btn-rounded-ghost btn-rounded-icon btn-rounded-lg" aria-label="Share">
					<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
				</button>
				<span style="font-size: 12px; color: #999; margin-left: 4px;">lg</span>
			</div>
		</div>

		<h4 class="ds-card__h4">With Icons + Label</h4>
		<div class="ds-demo">
			<button class="btn-rounded btn-rounded-primary btn-rounded-sm">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				New Item
			</button>
			<button class="btn-rounded btn-rounded-secondary btn-rounded-sm">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
				Upload
			</button>
			<button class="btn-rounded btn-rounded-ghost btn-rounded-sm">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
				Filters
			</button>
			<button class="btn-rounded btn-rounded-danger btn-rounded-sm">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				Delete
			</button>
		</div>

		<h4 class="ds-card__h4">Disabled State</h4>
		<div class="ds-demo">
			<button class="btn-rounded btn-rounded-primary" disabled>Primary</button>
			<button class="btn-rounded btn-rounded-secondary" disabled>Secondary</button>
			<button class="btn-rounded btn-rounded-danger" disabled>Danger</button>
		</div>
	</div>

	<!-- ═══ TIGHT RADIUS (COMPACT) ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tight Radius — Compact Shape</h3>
		<p class="ds-card__sub">6px radius, tight padding. For toolbars, data tables, badge-like actions, and dense UIs where space is at a premium.</p>

		<h4 class="ds-card__h4">Core Variants</h4>
		<div class="ds-demo">
			<button class="btn-compact btn-compact-primary">Primary</button>
			<button class="btn-compact btn-compact-secondary">Secondary</button>
			<button class="btn-compact btn-compact-ghost">Ghost</button>
			<button class="btn-compact btn-compact-danger">Danger</button>
		</div>

		<h4 class="ds-card__h4">With Icons</h4>
		<div class="ds-demo">
			<button class="btn-compact btn-compact-primary">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				Add
			</button>
			<button class="btn-compact btn-compact-secondary">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
				Edit
			</button>
			<button class="btn-compact btn-compact-ghost">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
				Copy
			</button>
			<button class="btn-compact btn-compact-danger">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				Remove
			</button>
		</div>

		<h4 class="ds-card__h4">Icon-Only Compact</h4>
		<div class="ds-demo">
			<button class="btn-compact btn-compact-primary btn-compact-icon" aria-label="Add">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
			</button>
			<button class="btn-compact btn-compact-secondary btn-compact-icon" aria-label="Edit">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
			</button>
			<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="More options">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
			</button>
			<button class="btn-compact btn-compact-danger btn-compact-icon" aria-label="Delete">
				<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
			</button>
		</div>

		<h4 class="ds-card__h4">Toolbar Pattern</h4>
		<div class="ds-demo">
			<div style="display: flex; gap: 2px; padding: 3px; background: rgba(0,0,0,0.03); border-radius: 8px; border: 1px solid rgba(0,0,0,0.06);">
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Bold">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>
				</button>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Italic">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><line x1="19" y1="4" x2="10" y2="4" stroke-linecap="round" stroke-width="2"/><line x1="14" y1="20" x2="5" y2="20" stroke-linecap="round" stroke-width="2"/><line x1="15" y1="4" x2="9" y2="20" stroke-linecap="round" stroke-width="2"/></svg>
				</button>
				<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Link">
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
				</button>
			</div>
			<div style="display: flex; gap: 4px;">
				<button class="btn-compact btn-compact-ghost">Cancel</button>
				<button class="btn-compact btn-compact-primary">Save</button>
			</div>
			<div style="display: flex; gap: 4px;">
				<button class="btn-compact btn-compact-secondary">Duplicate</button>
				<button class="btn-compact btn-compact-danger">Delete</button>
			</div>
		</div>

		<h4 class="ds-card__h4">Table Row Actions Pattern</h4>
		<div style="border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; overflow: hidden;">
			{#each ['Alpha Project', 'Beta Dashboard', 'Gamma Module'] as project}
				<div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid rgba(0,0,0,0.05);">
					<span style="font-size: 13px; color: #333;">{project}</span>
					<div style="display: flex; gap: 4px;">
						<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Edit {project}">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
						</button>
						<button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Duplicate {project}">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
						</button>
						<button class="btn-compact btn-compact-danger btn-compact-icon" aria-label="Delete {project}">
							<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
						</button>
					</div>
				</div>
			{/each}
		</div>

		<h4 class="ds-card__h4">Disabled State</h4>
		<div class="ds-demo">
			<button class="btn-compact btn-compact-primary" disabled>Primary</button>
			<button class="btn-compact btn-compact-secondary" disabled>Secondary</button>
			<button class="btn-compact btn-compact-danger" disabled>Danger</button>
		</div>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══ GLASS BUTTONS (GLASSMORPHIC) ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Buttons — Glassmorphic</h3>
		<p class="ds-card__sub">Frosted glass with <code>backdrop-filter: blur(20px)</code>. Three shapes: pill, rounded, compact. Best on dark or image backgrounds.</p>

		<h4 class="ds-card__h4">Glass Variants (Pill Shape)</h4>
		<div class="ds-demo" style="background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #0a0a0a); padding: 32px; border-radius: 12px;">
			<button class="btn-glass btn-glass-pill btn-glass-light">Light Glass</button>
			<button class="btn-glass btn-glass-pill btn-glass-dark">Dark Glass</button>
			<button class="btn-glass btn-glass-pill btn-glass-frosted">Frosted</button>
			<button class="btn-glass btn-glass-pill btn-glass-subtle">Subtle</button>
			<button class="btn-glass btn-glass-pill btn-glass-accent">Accent</button>
		</div>

		<h4 class="ds-card__h4">Glass Variants (Rounded Shape)</h4>
		<div class="ds-demo" style="background: linear-gradient(135deg, #111, #222, #111); padding: 32px; border-radius: 12px;">
			<button class="btn-glass btn-glass-rounded btn-glass-light">Light Glass</button>
			<button class="btn-glass btn-glass-rounded btn-glass-dark">Dark Glass</button>
			<button class="btn-glass btn-glass-rounded btn-glass-frosted">Frosted</button>
			<button class="btn-glass btn-glass-rounded btn-glass-subtle">Subtle</button>
			<button class="btn-glass btn-glass-rounded btn-glass-accent">Accent</button>
		</div>

		<h4 class="ds-card__h4">Glass Variants (Compact Shape)</h4>
		<div class="ds-demo" style="background: linear-gradient(135deg, #0d0d0d, #1a1a1a); padding: 24px; border-radius: 12px;">
			<button class="btn-glass btn-glass-compact btn-glass-light">Light</button>
			<button class="btn-glass btn-glass-compact btn-glass-dark">Dark</button>
			<button class="btn-glass btn-glass-compact btn-glass-frosted">Frosted</button>
			<button class="btn-glass btn-glass-compact btn-glass-subtle">Subtle</button>
			<button class="btn-glass btn-glass-compact btn-glass-accent">Accent</button>
		</div>

		<h4 class="ds-card__h4">Glass Sizes</h4>
		<div class="ds-demo" style="align-items: flex-end; background: linear-gradient(135deg, #0a0a0a, #1a1a2e); padding: 32px; border-radius: 12px;">
			<button class="btn-glass btn-glass-pill btn-glass-light btn-glass-xs">Extra Small</button>
			<button class="btn-glass btn-glass-pill btn-glass-light btn-glass-sm">Small</button>
			<button class="btn-glass btn-glass-pill btn-glass-light">Default</button>
			<button class="btn-glass btn-glass-pill btn-glass-light btn-glass-lg">Large</button>
			<button class="btn-glass btn-glass-pill btn-glass-light btn-glass-xl">Extra Large</button>
		</div>

		<h4 class="ds-card__h4">Glass Icon Buttons</h4>
		<div class="ds-demo" style="background: linear-gradient(135deg, #111, #1a1a2e); padding: 24px; border-radius: 12px;">
			<button class="btn-glass btn-glass-pill btn-glass-light btn-glass-icon btn-glass-sm" aria-label="Add">
				<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
			</button>
			<button class="btn-glass btn-glass-pill btn-glass-frosted btn-glass-icon" aria-label="Search">
				<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
			</button>
			<button class="btn-glass btn-glass-pill btn-glass-accent btn-glass-icon btn-glass-lg" aria-label="Settings">
				<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
			</button>
			<button class="btn-glass btn-glass-rounded btn-glass-dark btn-glass-icon" aria-label="Menu">
				<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
			</button>
		</div>

		<h4 class="ds-card__h4">Glass Patterns — Real-World</h4>
		<div class="ds-demo" style="background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #0a0a0a); padding: 32px; border-radius: 12px; flex-direction: column; gap: 20px;">
			<!-- Nav bar -->
			<div style="display: flex; gap: 4px; padding: 4px; background: rgba(255,255,255,0.04); border-radius: 9999px; border: 1px solid rgba(255,255,255,0.06);">
				<button class="btn-glass btn-glass-pill btn-glass-light btn-glass-sm">Dashboard</button>
				<button class="btn-glass btn-glass-pill btn-glass-subtle btn-glass-sm">Projects</button>
				<button class="btn-glass btn-glass-pill btn-glass-subtle btn-glass-sm">Settings</button>
			</div>
			<!-- Card actions -->
			<div style="display: flex; gap: 8px;">
				<button class="btn-glass btn-glass-pill btn-glass-accent">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
					New Project
				</button>
				<button class="btn-glass btn-glass-pill btn-glass-frosted">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
					Import
				</button>
				<button class="btn-glass btn-glass-pill btn-glass-subtle">Cancel</button>
			</div>
		</div>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══ GRAY SPECTRUM ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Gray Spectrum</h3>
		<p class="ds-card__sub">9 shades from near-white to near-black. Use the spectrum for subtle hierarchies without introducing color.</p>

		<h4 class="ds-card__h4">Full Spectrum (Pill Shape)</h4>
		<div class="ds-demo" style="flex-wrap: wrap;">
			<button class="btn-pill btn-pill-gray-100">Gray 100</button>
			<button class="btn-pill btn-pill-gray-200">Gray 200</button>
			<button class="btn-pill btn-pill-gray-300">Gray 300</button>
			<button class="btn-pill btn-pill-gray-400">Gray 400</button>
			<button class="btn-pill btn-pill-gray-500">Gray 500</button>
			<button class="btn-pill btn-pill-gray-600">Gray 600</button>
			<button class="btn-pill btn-pill-gray-700">Gray 700</button>
			<button class="btn-pill btn-pill-gray-800">Gray 800</button>
			<button class="btn-pill btn-pill-gray-900">Gray 900</button>
		</div>

		<h4 class="ds-card__h4">Use Cases</h4>
		<div class="ds-demo" style="flex-direction: column; gap: 16px;">
			<div style="display: flex; gap: 8px; align-items: center;">
				<button class="btn-pill btn-pill-gray-900 btn-pill-sm">Primary Action</button>
				<button class="btn-pill btn-pill-gray-300 btn-pill-sm">Secondary</button>
				<button class="btn-pill btn-pill-gray-100 btn-pill-sm">Tertiary</button>
				<span style="font-size: 11px; color: #999; margin-left: 8px;">Action hierarchy</span>
			</div>
			<div style="display: flex; gap: 4px; align-items: center;">
				<button class="btn-pill btn-pill-gray-800 btn-pill-xs">Active</button>
				<button class="btn-pill btn-pill-gray-400 btn-pill-xs">Visited</button>
				<button class="btn-pill btn-pill-gray-200 btn-pill-xs">Default</button>
				<span style="font-size: 11px; color: #999; margin-left: 8px;">State progression</span>
			</div>
		</div>
	</div>

	<div class="ds-divider"></div>

	<!-- ═══ SHAPE SYSTEM REFERENCE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Shape System Reference</h3>
		<p class="ds-card__sub">Four shape families, each for a different context. Shape communicates hierarchy and density.</p>

		<table class="ds-table">
			<thead>
				<tr>
					<th>Shape</th>
					<th>Class</th>
					<th>Radius</th>
					<th>Best For</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>Full Radius</strong></td>
					<td><code>.btn-pill</code></td>
					<td>9999px</td>
					<td>Primary CTAs, hero actions, navigation, onboarding</td>
				</tr>
				<tr>
					<td><strong>Standard Radius</strong></td>
					<td><code>.btn-rounded</code></td>
					<td>8px</td>
					<td>Forms, settings, cards, inline actions, dialog footers</td>
				</tr>
				<tr>
					<td><strong>Tight Radius</strong></td>
					<td><code>.btn-compact</code></td>
					<td>6px</td>
					<td>Toolbars, data tables, badge-style actions, dense UIs</td>
				</tr>
				<tr>
					<td><strong>Glassmorphic</strong></td>
					<td><code>.btn-glass</code></td>
					<td>Inherits</td>
					<td>Overlays, hero sections, dark/image backgrounds, glass surfaces</td>
				</tr>
			</tbody>
		</table>

		<h4 class="ds-card__h4">Side-by-Side Comparison</h4>
		<div class="ds-demo" style="align-items: center; gap: 24px; flex-wrap: wrap;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-pill btn-pill-primary btn-pill-sm">Save Changes</button>
				<span style="font-size: 11px; color: #999;">.btn-pill — hero CTA</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-rounded btn-rounded-primary btn-rounded-sm">Save Changes</button>
				<span style="font-size: 11px; color: #999;">.btn-rounded — form action</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
				<button class="btn-compact btn-compact-primary">Save</button>
				<span style="font-size: 11px; color: #999;">.btn-compact — toolbar</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 8px; background: linear-gradient(135deg, #111, #1a1a2e); padding: 16px 20px; border-radius: 12px;">
				<button class="btn-glass btn-glass-pill btn-glass-accent btn-glass-sm">Save Changes</button>
				<span style="font-size: 11px; color: #666;">.btn-glass — overlay</span>
			</div>
		</div>
	</div>
</section>
