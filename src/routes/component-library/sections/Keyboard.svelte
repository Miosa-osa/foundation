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
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1; white-space: nowrap;">{key}</kbd>
			{/each}
		</div>
	</div>

	<!-- ═══ KEY SIZES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sizes</h3>
		<p class="ds-card__sub">Small (20px), default (28px), large (36px)</p>
		<div class="ds-demo" style="gap: 20px; align-items: flex-end;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; font-size: 10px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #888; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.03); line-height: 1;">Cmd</kbd>
				<span style="font-size: 11px; color: #555;">sm</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Cmd</kbd>
				<span style="font-size: 11px; color: #555;">default</span>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 12px; font-size: 14px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #bbb; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13); border-radius: 6px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.4); line-height: 1;">Cmd</kbd>
				<span style="font-size: 11px; color: #555;">lg</span>
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
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">⌘</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">K</kbd>
			</span>
			<!-- Ctrl+C -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Ctrl</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">C</kbd>
			</span>
			<!-- Ctrl+Shift+P -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Ctrl</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Shift</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">P</kbd>
			</span>
			<!-- Alt+F4 -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Alt</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">F4</kbd>
			</span>
			<!-- Cmd+Shift+Z -->
			<span style="display: inline-flex; align-items: center; gap: 3px;">
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">⌘</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Shift</kbd>
				<span style="font-size: 11px; color: #444;">+</span>
				<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; padding: 0 8px; font-size: 12px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -2px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.3); line-height: 1;">Z</kbd>
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
				<div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 7px;">
					<span style="font-size: 13px; color: #999;">{item.label}</span>
					<span style="display: inline-flex; align-items: center; gap: 3px;">
						{#each (platform === 'mac' ? item.mac : item.win) as part, i}
							{#if i > 0}
								<span style="font-size: 10px; color: #444;">+</span>
							{/if}
							<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #999; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1;">{part}</kbd>
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
		<div style="max-width: 280px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; padding: 4px;">
			{#each [
				{ label: 'New File', icon: '📄', keys: ['⌘', 'N'] },
				{ label: 'Open...', icon: '📂', keys: ['⌘', 'O'] },
				{ label: 'Save', icon: '💾', keys: ['⌘', 'S'] },
				{ label: 'Save As...', icon: '💾', keys: ['⌘', 'Shift', 'S'] },
				{ label: null, icon: null, keys: [] },
				{ label: 'Undo', icon: '↩', keys: ['⌘', 'Z'] },
				{ label: 'Redo', icon: '↪', keys: ['⌘', 'Shift', 'Z'] },
				{ label: null, icon: null, keys: [] },
				{ label: 'Find', icon: '🔍', keys: ['⌘', 'F'] },
				{ label: 'Replace', icon: '🔄', keys: ['⌘', 'H'] },
			] as item}
				{#if item.label === null}
					<div style="height: 1px; background: rgba(255,255,255,0.06); margin: 3px 0;"></div>
				{:else}
					<button style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; background: transparent; border: none; border-radius: 6px; cursor: pointer; color: #ccc; font-size: 13px; text-align: left;" onmouseenter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'} onmouseleave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
						<span style="display: flex; align-items: center; gap: 8px;">
							<span style="font-size: 14px; opacity: 0.7;">{item.icon}</span>
							{item.label}
						</span>
						<span style="display: inline-flex; align-items: center; gap: 2px;">
							{#each item.keys as part, i}
								{#if i > 0}
									<span style="font-size: 9px; color: #444;">+</span>
								{/if}
								<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px; padding: 0 4px; font-size: 10px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #666; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.03); line-height: 1;">{part}</kbd>
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
		<div style="display: flex; gap: 2px; padding: 6px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; width: fit-content;">
			{#each [
				{ label: 'Bold', icon: 'B', keys: ['⌘', 'B'] },
				{ label: 'Italic', icon: 'I', keys: ['⌘', 'I'] },
				{ label: 'Underline', icon: 'U', keys: ['⌘', 'U'] },
				{ label: 'Link', icon: '🔗', keys: ['⌘', 'K'] },
				{ label: 'Code', icon: '<>', keys: ['⌘', 'E'] },
			] as action}
				<button style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 12px; background: transparent; border: none; border-radius: 7px; cursor: pointer; color: #aaa;" onmouseenter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'} onmouseleave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'} aria-label="{action.label}">
					<span style="font-size: 14px; font-weight: 700; font-family: 'SF Mono', monospace; line-height: 1; color: #ccc;">{action.icon}</span>
					<span style="font-size: 10px; color: #555;">{action.label}</span>
					<span style="display: inline-flex; align-items: center; gap: 1px;">
						{#each action.keys as part, i}
							{#if i > 0}
								<span style="font-size: 8px; color: #333;">+</span>
							{/if}
							<kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 14px; height: 14px; padding: 0 3px; font-size: 9px; font-family: 'SF Mono', monospace; font-weight: 500; color: #555; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 3px; line-height: 1;">{part}</kbd>
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
			<p style="font-size: 13px; color: #999; line-height: 1.7; margin: 0;">
				Press <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">⌘</kbd> <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">K</kbd> to open the command palette, or <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">Esc</kbd> to dismiss.
			</p>
			<p style="font-size: 13px; color: #999; line-height: 1.7; margin: 0;">
				Use <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">↑</kbd> <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">↓</kbd> to navigate results, <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">Enter</kbd> to select.
			</p>
			<p style="font-size: 13px; color: #999; line-height: 1.7; margin: 0;">
				Hold <kbd style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 22px; padding: 0 6px; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; font-weight: 500; color: #aaa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.04); line-height: 1; vertical-align: middle;">Shift</kbd> and click to select a range of items.
			</p>
		</div>
	</div>
</section>
