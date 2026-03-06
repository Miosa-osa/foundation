<script lang="ts">
	let platform = $state<'mac' | 'win'>('mac');
</script>

<section class="ds-section">
	<h2 class="ds-title">Keyboard Shortcuts</h2>
	<p class="ds-desc">
		<code>&lt;kbd&gt;</code> elements for displaying keyboard shortcuts, hotkeys, and modifier
		combinations. Monospace font, subtle elevation, consistent sizing across sm / default / lg.
	</p>

	<!-- ═══ SINGLE KEYS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Single Keys</h3>
		<p class="ds-card__sub">Modifier, navigation, and control keys at default size</p>
		<div class="ds-demo" style="gap: 8px; flex-wrap: wrap;">
			{#each ['Shift', 'Ctrl', 'Alt', 'Cmd', 'Enter', 'Esc', 'Tab', 'Space', '↑', '↓', '←', '→', 'Del', 'Backspace'] as key}
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1; white-space: nowrap;">{key}</kbd>
			{/each}
		</div>
	</div>

	<!-- ═══ KEY SIZES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sizes</h3>
		<p class="ds-card__sub">Small (20px), default (28px), large (36px)</p>
		<div class="ds-demo" style="gap: 20px; align-items: flex-end;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; font-size: 10px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 4px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1;">Cmd</kbd>
				<span style="font-size: 11px; color: var(--dt3);">sm</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Cmd</kbd>
				<span style="font-size: 11px; color: var(--dt3);">default</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 12px; font-size: 14px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 6px; box-shadow: inset 0 -2px 0 var(--dbd), 0 2px 4px rgba(0,0,0,0.4); line-height: 1;">Cmd</kbd>
				<span style="font-size: 11px; color: var(--dt3);">lg</span>
			</div>
		</div>
	</div>

	<!-- ═══ KEY COMBINATIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Key Combinations</h3>
		<p class="ds-card__sub">Modifier + key pairs separated by a <code>+</code> glyph</p>
		<div class="ds-demo" style="gap: 16px; flex-wrap: wrap;">
			<!-- Cmd+K -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">⌘</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">K</kbd>
			</span>
			<!-- Ctrl+C -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Ctrl</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">C</kbd>
			</span>
			<!-- Ctrl+Shift+P -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Ctrl</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Shift</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">P</kbd>
			</span>
			<!-- Alt+F4 -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Alt</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">F4</kbd>
			</span>
			<!-- Cmd+Shift+Z -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">⌘</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Shift</kbd>
				<span style="font-size: 11px; color: var(--dt4);">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -2px 0 var(--dbd), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Z</kbd>
			</span>
		</div>
	</div>

	<!-- ═══ PLATFORM TOGGLE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Platform-Aware Variants</h3>
		<p class="ds-card__sub">Switch between Mac and Windows key notation</p>

		<div style="display: flex; gap: 6px; margin-bottom: 20px;">
			<button
				onclick={() => platform = 'mac'}
				class="btn-pill btn-pill-sm"
				class:btn-pill-primary={platform === 'mac'}
				class:btn-pill-secondary={platform !== 'mac'}
			>
				Mac
			</button>
			<button
				onclick={() => platform = 'win'}
				class="btn-pill btn-pill-sm"
				class:btn-pill-primary={platform === 'win'}
				class:btn-pill-secondary={platform !== 'win'}
			>
				Windows
			</button>
		</div>

		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 380px;">
			{#each [
				{ label: 'Command Palette', mac: ['⌘', 'Shift', 'P'], win: ['Ctrl', 'Shift', 'P'] },
				{ label: 'Save', mac: ['⌘', 'S'], win: ['Ctrl', 'S'] },
				{ label: 'Undo', mac: ['⌘', 'Z'], win: ['Ctrl', 'Z'] },
				{ label: 'Find', mac: ['⌘', 'F'], win: ['Ctrl', 'F'] },
				{ label: 'New Tab', mac: ['⌘', 'T'], win: ['Ctrl', 'T'] },
				{ label: 'Close Window', mac: ['⌘', 'W'], win: ['Alt', 'F4'] },
			] as item}
				<div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 7px;">
					<span style="font-size: 13px; color: var(--dt3);">{item.label}</span>
					<span style="display: inline-flex; align-items: center; gap: 3px;">
						{#each (platform === 'mac' ? item.mac : item.win) as part, i}
							{#if i > 0}
								<span style="font-size: 10px; color: var(--dt4);">+</span>
							{/if}
							<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 4px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1;">{part}</kbd>
						{/each}
					</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ IN CONTEXT: MENU ITEMS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Menu Items</h3>
		<p class="ds-card__sub">Shortcuts aligned to the right edge of a dropdown menu</p>
		<div style="max-width: 280px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 10px; overflow: hidden; padding: 4px;">
			{#each [
				{ label: 'New File', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', keys: ['⌘', 'N'] },
				{ label: 'Open...', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>', keys: ['⌘', 'O'] },
				{ label: 'Save', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>', keys: ['⌘', 'S'] },
				{ label: 'Save As...', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>', keys: ['⌘', 'Shift', 'S'] },
				{ label: null, icon: null, keys: [] },
				{ label: 'Undo', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/></svg>', keys: ['⌘', 'Z'] },
				{ label: 'Redo', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 014-4h12"/></svg>', keys: ['⌘', 'Shift', 'Z'] },
				{ label: null, icon: null, keys: [] },
				{ label: 'Find', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>', keys: ['⌘', 'F'] },
				{ label: 'Replace', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>', keys: ['⌘', 'H'] },
			] as item}
				{#if item.label === null}
					<div style="height: 1px; background: var(--dbd); margin: 3px 0;"></div>
				{:else}
					<button style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; background: transparent; border: none; border-radius: 6px; cursor: pointer; color: var(--dt2); font-size: 13px; text-align: left;" onmouseenter={e => (e.currentTarget as HTMLElement).style.background = 'var(--dbg2)'} onmouseleave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
						<span style="display: flex; align-items: center; gap: 8px;">
							<span style="opacity: 0.7; display: inline-flex; align-items: center;">{@html item.icon}</span>
							{item.label}
						</span>
						<span style="display: inline-flex; align-items: center; gap: 2px;">
							{#each item.keys as part, i}
								{#if i > 0}
									<span style="font-size: 9px; color: var(--dt4);">+</span>
								{/if}
								<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px; padding: 0 4px; font-size: 10px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 3px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1;">{part}</kbd>
							{/each}
						</span>
					</button>
				{/if}
			{/each}
		</div>
	</div>

	<!-- ═══ IN CONTEXT: TOOLBAR HINTS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Toolbar Hints</h3>
		<p class="ds-card__sub">Keyboard shortcut hints below toolbar action labels</p>
		<div style="display: flex; gap: 2px; padding: 6px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 10px; width: fit-content;">
			{#each [
				{ label: 'Bold', icon: 'B', keys: ['⌘', 'B'] },
				{ label: 'Italic', icon: 'I', keys: ['⌘', 'I'] },
				{ label: 'Underline', icon: 'U', keys: ['⌘', 'U'] },
				{ label: 'Link', icon: 'link', keys: ['⌘', 'K'] },
				{ label: 'Code', icon: '<>', keys: ['⌘', 'E'] },
			] as action}
				<button style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 12px; background: transparent; border: none; border-radius: 7px; cursor: pointer; color: var(--dt3);" onmouseenter={e => (e.currentTarget as HTMLElement).style.background = 'var(--dbg2)'} onmouseleave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'} aria-label="{action.label}">
					<span style="font-size: 14px; font-weight: 700; font-family: 'SF Mono', monospace; line-height: 1; color: var(--dt2); display: inline-flex; align-items: center;">
						{#if action.icon === 'link'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
						{:else}
							{action.icon}
						{/if}
					</span>
					<span style="font-size: 10px; color: var(--dt3);">{action.label}</span>
					<span style="display: inline-flex; align-items: center; gap: 1px;">
						{#each action.keys as part, i}
							{#if i > 0}
								<span style="font-size: 8px; color: var(--dt4);">+</span>
							{/if}
							<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 14px; height: 14px; padding: 0 3px; font-size: 9px; font-family: 'SF Mono', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 3px; line-height: 1;">{part}</kbd>
						{/each}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ═══ IN CONTEXT: INLINE PROSE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Inline Prose</h3>
		<p class="ds-card__sub">Shortcuts embedded in help text and documentation</p>
		<div style="display: flex; flex-direction: column; gap: 14px; max-width: 480px;">
			<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0;">
				Press <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">⌘</kbd> <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">K</kbd> to open the command palette, or <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">Esc</kbd> to dismiss.
			</p>
			<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0;">
				Use <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">↑</kbd> <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">↓</kbd> to navigate results, <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">Enter</kbd> to select.
			</p>
			<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0;">
				Hold <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: var(--dt3); background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 5px; box-shadow: inset 0 -1px 0 var(--dbd); line-height: 1; vertical-align: middle;">Shift</kbd> and click to select a range of items.
			</p>
		</div>
	</div>
</section>
