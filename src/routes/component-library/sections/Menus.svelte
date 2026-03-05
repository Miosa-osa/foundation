<script lang="ts">
	import { Popover } from '$lib/ui';
	import { Menu, MenuItem, MenuSeparator, MenuLabel } from '$lib/ui/menu';
</script>

<section class="ds-section">
	<h2 class="ds-title">Menus & Popovers</h2>
	<p class="ds-desc">Floating action lists and content panels. Built on Bits UI.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Dropdown Menu</h3>
		<p class="ds-card__sub">Click to open — supports labels, separators, shortcuts, destructive items</p>
		<div class="ds-demo" style="gap: 12px;">
			<Menu>
				{#snippet trigger()}
					<button class="btn-pill btn-pill-secondary btn-pill-sm">
						Actions
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
					</button>
				{/snippet}
				<MenuLabel>Edit</MenuLabel>
				<MenuItem onSelect={() => {}}>Rename</MenuItem>
				<MenuItem onSelect={() => {}} shortcut="$mod+D">Duplicate</MenuItem>
				<MenuItem onSelect={() => {}}>Move to...</MenuItem>
				<MenuSeparator />
				<MenuLabel>Danger Zone</MenuLabel>
				<MenuItem onSelect={() => {}} destructive>Delete</MenuItem>
			</Menu>

			<Menu>
				{#snippet trigger()}
					<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
					</button>
				{/snippet}
				<MenuItem onSelect={() => {}}>View Details</MenuItem>
				<MenuItem onSelect={() => {}} shortcut="$mod+E">Edit</MenuItem>
				<MenuItem onSelect={() => {}}>Share</MenuItem>
				<MenuSeparator />
				<MenuItem onSelect={() => {}} destructive>Remove</MenuItem>
			</Menu>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Popover</h3>
		<p class="ds-card__sub">Arbitrary floating content</p>
		<div class="ds-demo">
			<Popover>
				{#snippet trigger()}
					<button class="btn-pill btn-pill-secondary btn-pill-sm">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
						Filters
					</button>
				{/snippet}
				<div style="padding: 4px; min-width: 200px;">
					<p style="font-weight: 600; margin: 0 0 8px; font-size: 14px;">Filters</p>
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
							<input type="checkbox" checked /> Active projects
						</label>
						<label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
							<input type="checkbox" /> Archived
						</label>
						<label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
							<input type="checkbox" checked /> High priority
						</label>
					</div>
					<div style="margin-top: 12px; display: flex; gap: 6px; justify-content: flex-end;">
						<button class="btn-pill btn-pill-ghost btn-pill-xs">Reset</button>
						<button class="btn-pill btn-pill-primary btn-pill-xs">Apply</button>
					</div>
				</div>
			</Popover>
		</div>
	</div>
</section>
