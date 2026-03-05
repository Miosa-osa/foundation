<script lang="ts">
	import { Tooltip } from '$lib/ui';
</script>

<section class="ds-section">
	<h2 class="ds-title">Tooltips</h2>
	<p class="ds-desc">Contextual hints on hover. Built on Bits UI Tooltip primitive.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Positions</h3>
		<div class="ds-demo" style="gap: 12px;">
			<Tooltip content="Top tooltip" side="top">
				<button class="btn-pill btn-pill-secondary btn-pill-sm">Top</button>
			</Tooltip>
			<Tooltip content="Bottom tooltip" side="bottom">
				<button class="btn-pill btn-pill-secondary btn-pill-sm">Bottom</button>
			</Tooltip>
			<Tooltip content="Left tooltip" side="left">
				<button class="btn-pill btn-pill-secondary btn-pill-sm">Left</button>
			</Tooltip>
			<Tooltip content="Right tooltip" side="right">
				<button class="btn-pill btn-pill-secondary btn-pill-sm">Right</button>
			</Tooltip>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">With Keyboard Shortcuts</h3>
		<div class="ds-demo" style="gap: 12px;">
			<Tooltip content="Search everywhere" shortcut="$mod+K">
				<button class="btn-pill btn-pill-secondary btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					Search
				</button>
			</Tooltip>
			<Tooltip content="Save changes" shortcut="$mod+S">
				<button class="btn-pill btn-pill-primary btn-pill-sm">Save</button>
			</Tooltip>
			<Tooltip content="Create new" shortcut="$mod+N">
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
			</Tooltip>
			<Tooltip content="Delete item" shortcut="$mod+Backspace">
				<button class="btn-pill btn-pill-icon btn-pill-danger btn-pill-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				</button>
			</Tooltip>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">On Icons & Text</h3>
		<div class="ds-demo" style="gap: 16px;">
			<Tooltip content="User profile">
				<div style="width: 36px; height: 36px; border-radius: 9999px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600; cursor: pointer;">R</div>
			</Tooltip>
			<Tooltip content="3 notifications">
				<div style="position: relative; cursor: pointer;">
					<svg class="w-5 h-5" style="color: #666;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
					<span style="position: absolute; top: -4px; right: -4px; width: 14px; height: 14px; border-radius: 9999px; background: #dc2626; color: white; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center;">3</span>
				</div>
			</Tooltip>
		</div>
	</div>
</section>
