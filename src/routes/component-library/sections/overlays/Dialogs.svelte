<script lang="ts">
	// ── 1. Basic Dialog ────────────────────────────────────────────────────────
	let basicOpen = $state(false);

	// ── 2. Dialog Sizes ────────────────────────────────────────────────────────
	type DialogSize = 'sm' | 'default' | 'lg' | 'full';
	let sizesOpen  = $state(false);
	let activeSize = $state<DialogSize>('default');
	const sizeWidths: Record<DialogSize, string> = {
		sm:      '360px',
		default: '480px',
		lg:      '640px',
		full:    'calc(100vw - 48px)',
	};
	function openSize(s: DialogSize) { activeSize = s; sizesOpen = true; }

	// ── 3. Confirmation Dialog ─────────────────────────────────────────────────
	let confirmOpen       = $state(false);
	let confirmDestructive = $state(false);
	function openConfirm(destructive: boolean) {
		confirmDestructive = destructive;
		confirmOpen = true;
	}

	// ── 4. Form Dialog ─────────────────────────────────────────────────────────
	let formOpen     = $state(false);
	let formName     = $state('');
	let formEmail    = $state('');
	let formRole     = $state('viewer');
	let formSubmitted = $state(false);
	function submitForm() {
		formSubmitted = true;
		setTimeout(() => { formOpen = false; formSubmitted = false; formName = ''; formEmail = ''; formRole = 'viewer'; }, 800);
	}

	// ── 5. Alert Dialog (non-dismissible) ──────────────────────────────────────
	let alertOpen = $state(false);

	// ── 6. Nested Dialogs ──────────────────────────────────────────────────────
	let nestedL1Open = $state(false);
	let nestedL2Open = $state(false);

	// ── 7. Custom Header/Footer Dialog ────────────────────────────────────────
	let customOpen = $state(false);

	// ── 8. Delete Confirmation ─────────────────────────────────────────────────
	const resourceName  = 'miosa-production-db';
	let deleteOpen      = $state(false);
	let deleteInput     = $state('');
	let deleteConfirmed = $state(false);
	const deleteMatch   = $derived(deleteInput.trim() === resourceName);
	function triggerDelete() {
		deleteConfirmed = true;
		setTimeout(() => { deleteOpen = false; deleteConfirmed = false; deleteInput = ''; }, 900);
	}
</script>

<style>
	/* ── Keyframes ─────────────────────────────────────────────────────────── */
	@keyframes dlg-backdrop-in  { from { opacity: 0; }            to { opacity: 1; }            }
	@keyframes dlg-content-in   { from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
	@keyframes dlg-content-out  { from { opacity: 1; transform: translate(-50%, -50%) scale(1); }   to { opacity: 0; transform: translate(-50%, -48%) scale(0.96); } }
	@keyframes spin-once        { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

	/* ── Overlay & Backdrop ────────────────────────────────────────────────── */
	.dlg-overlay {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dlg-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.72);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		animation: dlg-backdrop-in 0.18s ease;
	}

	/* ── Dialog Panel ──────────────────────────────────────────────────────── */
	.dlg-panel {
		position: relative;
		background: var(--dbg);
		border: 1px solid var(--dbd);
		border-radius: 14px;
		box-shadow:
			0 0 0 1px var(--dbd2) inset,
			0 24px 64px rgba(0,0,0,0.7),
			0 8px 24px rgba(0,0,0,0.4);
		width: 100%;
		max-height: calc(100vh - 80px);
		display: flex;
		flex-direction: column;
		animation: dlg-content-in 0.2s cubic-bezier(0.22, 1, 0.36, 1);
		/* Glassmorphism overlay */

	}

	/* ── Header ────────────────────────────────────────────────────────────── */
	.dlg-header {
		padding: 20px 24px 16px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		flex-shrink: 0;
		border-bottom: 1px solid var(--dbd2);
	}
	.dlg-header--no-border {
		border-bottom: none;
		padding-bottom: 0;
	}
	.dlg-title {
		font-size: 15px;
		font-weight: 600;
		color: var(--dt);
		margin: 0;
		letter-spacing: -0.015em;
		line-height: 1.3;
	}
	.dlg-subtitle {
		font-size: 12px;
		color: var(--dt3);
		margin: 3px 0 0;
		line-height: 1.4;
	}
	.dlg-desc {
		font-size: 13px;
		color: var(--dt3);
		margin: 6px 0 0;
		line-height: 1.6;
	}

	/* ── Close Button ──────────────────────────────────────────────────────── */
	.dlg-close {
		width: 28px;
		height: 28px;
		border-radius: 7px;
		border: 1px solid var(--dbd);
		background: var(--dbg2);
		color: var(--dt3);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: background 0.14s, color 0.14s;
		margin-top: 1px;
	}
	.dlg-close:hover {
		background: var(--dbg3);
		color: var(--dt2);
	}

	/* ── Body ──────────────────────────────────────────────────────────────── */
	.dlg-body {
		flex: 1;
		overflow-y: auto;
		padding: 20px 24px;
	}
	.dlg-body::-webkit-scrollbar { width: 4px; }
	.dlg-body::-webkit-scrollbar-track { background: transparent; }
	.dlg-body::-webkit-scrollbar-thumb { background: var(--dbd); border-radius: 2px; }
	/* ── Footer ────────────────────────────────────────────────────────────── */
	.dlg-footer {
		padding: 14px 24px;
		border-top: 1px solid var(--dbd2);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		flex-shrink: 0;
	}
	.dlg-footer--spread {
		justify-content: space-between;
	}

	/* ── Form fields ───────────────────────────────────────────────────────── */
	.dlg-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 16px;
	}
	.dlg-field:last-child { margin-bottom: 0; }
	.dlg-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt3);
	}
	.dlg-input {
		width: 100%;
		padding: 9px 12px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		border-radius: 8px;
		color: var(--dt);
		font-size: 13px;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.15s, background 0.15s;
		font-family: inherit;
	}
	.dlg-input:focus {
		border-color: var(--dt3);
		background: var(--dbg3);
	}
	.dlg-input::placeholder { color: var(--dt4); }
	.dlg-select {
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23666' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 12px center;
		padding-right: 32px;
		color-scheme: dark;
	}

	/* ── Destructive button ────────────────────────────────────────────────── */
	.btn-destructive {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		border-radius: 9999px;
		border: 1px solid rgba(239, 68, 68, 0.35);
		background: rgba(239, 68, 68, 0.12);
		color: #f87171;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
		white-space: nowrap;
	}
	.btn-destructive:hover:not(:disabled) {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.5);
	}
	.btn-destructive:disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}

	/* ── Alert Dialog icon ─────────────────────────────────────────────────── */
	.dlg-icon-wrap {
		width: 44px;
		height: 44px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.dlg-icon-wrap--warn {
		background: rgba(251, 191, 36, 0.1);
		border: 1px solid rgba(251, 191, 36, 0.18);
	}
	.dlg-icon-wrap--danger {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.18);
	}
	.dlg-icon-wrap--info {
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.18);
	}

	/* ── Delete confirm input highlight ───────────────────────────────────── */
	.dlg-input--match {
		border-color: rgba(239, 68, 68, 0.4) !important;
		background: rgba(239, 68, 68, 0.04) !important;
	}
	.dlg-input--matched {
		border-color: rgba(34, 197, 94, 0.4) !important;
		background: rgba(34, 197, 94, 0.04) !important;
	}

	/* ── Nested stacking depth indicator ──────────────────────────────────── */
	.dlg-depth-badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 11px;
		font-weight: 500;
		color: var(--dt3);
		padding: 3px 8px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
	}

	/* ── Success spinner ───────────────────────────────────────────────────── */
	.dlg-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid var(--dbd);
		border-top-color: var(--dt);
		border-radius: 50%;
		animation: spin-once 0.7s linear infinite;
		display: inline-block;
	}

	/* ── Info row in custom header ─────────────────────────────────────────── */
	.dlg-info-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
		border-bottom: 1px solid var(--dbd2);
	}
	.dlg-info-row:last-child { border-bottom: none; }

	/* ── Section header inside body ────────────────────────────────────────── */
	.dlg-section-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--dt3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin: 0 0 10px;
	}
</style>

<section class="ds-section">
	<h2 class="ds-title">Dialogs</h2>
	<p class="ds-desc">Modal overlays for focused interactions. Built with native CSS and the Modal component from Bits UI. All variants support keyboard navigation and focus trapping.</p>

	<!-- ─── 1. Basic Dialog ──────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Dialog</h3>
		<p class="ds-card__sub">Standard open/close dialog with title, description, body content, and a close button. Click the backdrop or press Escape to dismiss.</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (basicOpen = true)}>
				Open dialog
			</button>
		</div>
	</div>

	<!-- ─── 2. Dialog Sizes ──────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dialog Sizes</h3>
		<p class="ds-card__sub">Four widths — Small (360px) for quick prompts, Default (480px) for most use-cases, Large (640px) for richer content, Full-width for complex layouts.</p>
		<div class="ds-demo" style="gap: 10px;">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => openSize('sm')}>Small 360px</button>
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => openSize('default')}>Default 480px</button>
			<button class="btn-pill btn-pill-primary btn-pill-sm"   onclick={() => openSize('lg')}>Large 640px</button>
			<button class="btn-pill btn-pill-ghost btn-pill-sm"     onclick={() => openSize('full')}>Full-width</button>
		</div>
	</div>

	<!-- ─── 3. Confirmation Dialog ──────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Confirmation Dialog</h3>
		<p class="ds-card__sub">Two-action prompt with Cancel and Confirm. The destructive variant uses a red Confirm button for irreversible actions.</p>
		<div class="ds-demo" style="gap: 10px;">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => openConfirm(false)}>Confirm action</button>
			<button class="btn-destructive" onclick={() => openConfirm(true)}>Destructive confirm</button>
		</div>
	</div>

	<!-- ─── 4. Form Dialog ───────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Form Dialog</h3>
		<p class="ds-card__sub">Dialog containing a form with text inputs, a select, and Submit/Cancel actions. Demonstrates inline data collection without a full page navigation.</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (formOpen = true)}>
				<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
				Invite member
			</button>
		</div>
	</div>

	<!-- ─── 5. Alert Dialog ──────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Alert Dialog</h3>
		<p class="ds-card__sub">Non-dismissible overlay — backdrop clicks and Escape are blocked. For session expiry, critical errors, or forced decision checkpoints.</p>
		<div class="ds-demo" style="gap: 10px;">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (alertOpen = true)}>
				<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-linejoin="round"/><path d="M12 9v4M12 17h.01" stroke-linecap="round"/></svg>
				Trigger alert
			</button>
		</div>
	</div>

	<!-- ─── 6. Nested Dialogs ────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Nested / Stacked Dialogs</h3>
		<p class="ds-card__sub">A button inside a first dialog opens a second dialog layered on top, each with independent close controls and z-index stacking.</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (nestedL1Open = true)}>Open first dialog</button>
		</div>
	</div>

	<!-- ─── 7. Custom Header Dialog ─────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Custom Header &amp; Footer</h3>
		<p class="ds-card__sub">Dialog with an icon badge, title, and subtitle in the header. Footer carries multiple actions with different weights.</p>
		<div class="ds-demo">
			<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (customOpen = true)}>
				<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>
				Workspace info
			</button>
		</div>
	</div>

	<!-- ─── 8. Delete Confirmation ───────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context — Delete Confirmation</h3>
		<p class="ds-card__sub">Full delete flow: a button triggers the dialog, the user must type the resource name exactly to enable the Confirm button. The submit remains disabled until the strings match.</p>
		<div class="ds-demo" style="align-items: center; gap: 14px;">
			<div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 9px; border: 1px solid var(--dbd2); background: var(--dbg2);">
				<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" style="color: var(--dt3); flex-shrink: 0;"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke-linecap="round" stroke-linejoin="round"/></svg>
				<span style="font-size: 13px; color: var(--dt2); font-family: ui-monospace, monospace;">{resourceName}</span>
			</div>
			<button
				class="btn-destructive"
				onclick={() => (deleteOpen = true)}
				aria-label="Delete database"
			>
				<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v6M14 11v6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6V4h6v2" stroke-linecap="round" stroke-linejoin="round"/></svg>
				Delete database
			</button>
		</div>
	</div>

	<!-- ─── Props Reference ──────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Modal Component Props</h3>
		<table class="ds-table">
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td><code>open</code></td><td>boolean</td><td>false</td><td>Controls dialog visibility</td></tr>
				<tr><td><code>size</code></td><td>'sm' | 'default' | 'lg' | 'xl' | 'full'</td><td>'default'</td><td>Max-width variant</td></tr>
				<tr><td><code>title</code></td><td>string</td><td>—</td><td>Dialog heading text</td></tr>
				<tr><td><code>description</code></td><td>string</td><td>—</td><td>Subtitle below the heading</td></tr>
				<tr><td><code>showClose</code></td><td>boolean</td><td>true</td><td>Render the X close button</td></tr>
				<tr><td><code>closeOnOutsideClick</code></td><td>boolean</td><td>true</td><td>Dismiss on backdrop click</td></tr>
				<tr><td><code>closeOnEscape</code></td><td>boolean</td><td>true</td><td>Dismiss on Escape key</td></tr>
				<tr><td><code>children</code></td><td>Snippet</td><td>—</td><td>Dialog body content</td></tr>
				<tr><td><code>footer</code></td><td>Snippet?</td><td>—</td><td>Optional custom footer slot</td></tr>
				<tr><td><code>onOpenChange</code></td><td>(open: boolean) =&gt; void</td><td>—</td><td>Callback on open state change</td></tr>
			</tbody>
		</table>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════════════
     DIALOG OVERLAYS
     ══════════════════════════════════════════════════════════════════════════ -->

<!-- ─── 1. Basic Dialog ──────────────────────────────────────────────────── -->
{#if basicOpen}
	<div
		class="dlg-overlay"
		onclick={() => (basicOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (basicOpen = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Basic dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: 480px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header">
				<div>
					<h2 class="dlg-title">Dialog title</h2>
					<p class="dlg-desc">This is a standard dialog. It can hold any content — a description, a list, or richer UI.</p>
				</div>
				<button class="dlg-close" onclick={() => (basicOpen = false)} aria-label="Close dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="dlg-body">
				<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0 0 16px;">
					Use dialogs sparingly — they interrupt the user flow. Reserve them for actions that need explicit confirmation, or for forms that don't warrant a full page.
				</p>
				<div style="display: flex; gap: 10px; flex-wrap: wrap;">
					{#each ['Keyboard navigation', 'Focus trapped', 'ARIA compliant', 'Glassmorphism'] as tag}
						<span style="font-size: 11px; color: var(--dt3); padding: 3px 9px; border-radius: 9999px; border: 1px solid var(--dbd2); background: var(--dbg2);">{tag}</span>
					{/each}
				</div>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (basicOpen = false)}>Cancel</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (basicOpen = false)}>Got it</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 2. Sizes Dialog ───────────────────────────────────────────────────── -->
{#if sizesOpen}
	<div
		class="dlg-overlay"
		onclick={() => (sizesOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (sizesOpen = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Size demo dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: {sizeWidths[activeSize]};"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header">
				<div>
					<h2 class="dlg-title">Dialog — {activeSize}</h2>
					<p class="dlg-subtitle">max-width: {sizeWidths[activeSize]}</p>
				</div>
				<button class="dlg-close" onclick={() => (sizesOpen = false)} aria-label="Close dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="dlg-body">
				<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0 0 16px;">
					{#if activeSize === 'sm'}
						Small dialogs (360px) are best for single-action prompts, quick confirmations, or 1–2 field forms. Keep copy concise.
					{:else if activeSize === 'default'}
						Default dialogs (480px) suit the majority of use-cases — invite flows, settings panels, and multi-field forms all fit comfortably here.
					{:else if activeSize === 'lg'}
						Large dialogs (640px) work well for richer content: preview panes, complex forms, or embedded tables that need more horizontal breathing room.
					{:else}
						Full-width dialogs span nearly the entire viewport and are suited to document editors, media pickers, or any experience that would otherwise require a separate page.
					{/if}
				</p>
				<div style="display: flex; gap: 8px; flex-wrap: wrap;">
					{#each (['sm', 'default', 'lg', 'full'] as const) as s}
						<button
							class="btn-pill btn-pill-sm"
							style="border-radius: 9999px; border: 1px solid {s === activeSize ? 'var(--dbd)' : 'var(--dbd2)'}; background: {s === activeSize ? 'var(--dbg3)' : 'transparent'}; color: {s === activeSize ? 'var(--dt)' : 'var(--dt3)'}; padding: 5px 12px; font-size: 12px; cursor: pointer; transition: all 0.14s;"
							onclick={() => (activeSize = s)}
							aria-pressed={s === activeSize}
						>
							{s}
						</button>
					{/each}
				</div>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (sizesOpen = false)}>Close</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 3. Confirmation Dialog ───────────────────────────────────────────── -->
{#if confirmOpen}
	<div
		class="dlg-overlay"
		onclick={() => (confirmOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (confirmOpen = false)}
		role="alertdialog"
		aria-modal="true"
		aria-label="Confirmation dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: 440px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header dlg-header--no-border" style="padding-bottom: 12px;">
				<div style="display: flex; align-items: flex-start; gap: 14px;">
					<div class="dlg-icon-wrap {confirmDestructive ? 'dlg-icon-wrap--danger' : 'dlg-icon-wrap--info'}">
						{#if confirmDestructive}
							<svg width="18" height="18" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6V4h6v2" stroke-linecap="round" stroke-linejoin="round"/></svg>
						{:else}
							<svg width="18" height="18" fill="none" stroke="#6366f1" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
						{/if}
					</div>
					<div style="flex: 1;">
						<h2 class="dlg-title">{confirmDestructive ? 'Delete project?' : 'Publish changes?'}</h2>
						<p class="dlg-desc" style="margin-top: 5px;">
							{#if confirmDestructive}
								This will permanently delete <strong style="color: var(--dt2);">MIOSA Platform</strong> and all its data. This action <em>cannot</em> be undone.
							{:else}
								Your changes will go live immediately and be visible to all team members. You can revert at any time from the history panel.
							{/if}
						</p>
					</div>
				</div>
				<button class="dlg-close" onclick={() => (confirmOpen = false)} aria-label="Close dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (confirmOpen = false)}>Cancel</button>
				{#if confirmDestructive}
					<button class="btn-destructive" onclick={() => (confirmOpen = false)}>
						<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
						Delete project
					</button>
				{:else}
					<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (confirmOpen = false)}>Publish now</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- ─── 4. Form Dialog ────────────────────────────────────────────────────── -->
{#if formOpen}
	<div
		class="dlg-overlay"
		onclick={() => (formOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (formOpen = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Invite member dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: 480px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header">
				<div>
					<h2 class="dlg-title">Invite team member</h2>
					<p class="dlg-subtitle">They will receive an email with a join link.</p>
				</div>
				<button class="dlg-close" onclick={() => (formOpen = false)} aria-label="Close dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="dlg-body">
				<div class="dlg-field">
					<label class="dlg-label" for="dlg-name">Full name</label>
					<input
						id="dlg-name"
						class="dlg-input"
						type="text"
						placeholder="Alex Chen"
						bind:value={formName}
					/>
				</div>
				<div class="dlg-field">
					<label class="dlg-label" for="dlg-email">Email address</label>
					<input
						id="dlg-email"
						class="dlg-input"
						type="email"
						placeholder="alex@company.io"
						bind:value={formEmail}
					/>
				</div>
				<div class="dlg-field">
					<label class="dlg-label" for="dlg-role">Role</label>
					<select id="dlg-role" class="dlg-input dlg-select" bind:value={formRole}>
						<option value="viewer">Viewer — read-only access</option>
						<option value="editor">Editor — can edit all projects</option>
						<option value="admin">Admin — full workspace control</option>
					</select>
				</div>
				<div style="padding: 12px 14px; border-radius: 9px; border: 1px solid var(--dbd2); background: var(--dbg2); margin-top: 4px;">
					<p style="font-size: 12px; color: var(--dt3); line-height: 1.55; margin: 0;">
						<strong style="color: var(--dt2);">Role permissions:</strong>
						{#if formRole === 'viewer'}
							Can view all projects and leave comments, but cannot edit or create content.
						{:else if formRole === 'editor'}
							Can create, edit, and delete projects. Cannot manage billing or remove members.
						{:else}
							Full access including billing, member management, and workspace settings.
						{/if}
					</p>
				</div>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (formOpen = false)}>Cancel</button>
				<button
					class="btn-pill btn-pill-primary btn-pill-sm"
					onclick={submitForm}
					disabled={!formName.trim() || !formEmail.trim() || formSubmitted}
					style="min-width: 110px;"
					aria-label="Send invite"
				>
					{#if formSubmitted}
						<span class="dlg-spinner"></span>
						Sending…
					{:else}
						Send invite
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 5. Alert Dialog (non-dismissible) ────────────────────────────────── -->
{#if alertOpen}
	<div
		class="dlg-overlay"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.key === 'Escape' && e.preventDefault()}
		role="alertdialog"
		aria-modal="true"
		aria-label="Session expired alert"
		tabindex="-1"
	>
		<!-- Backdrop does NOT close on click — intentionally no onclick handler -->
		<div class="dlg-backdrop" style="cursor: not-allowed;"></div>
		<div
			class="dlg-panel"
			style="max-width: 420px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header dlg-header--no-border" style="padding-bottom: 12px;">
				<div style="display: flex; align-items: flex-start; gap: 14px; flex: 1;">
					<div class="dlg-icon-wrap dlg-icon-wrap--warn">
						<svg width="18" height="18" fill="none" stroke="#fbbf24" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-linejoin="round"/><path d="M12 9v4M12 17h.01" stroke-linecap="round"/></svg>
					</div>
					<div>
						<h2 class="dlg-title">Session expired</h2>
						<p class="dlg-desc" style="margin-top: 5px;">
							Your session has timed out due to inactivity. Please sign in again to continue. Unsaved work may have been preserved in your draft.
						</p>
					</div>
				</div>
				<!-- No close button — non-dismissible -->
			</div>
			<div style="padding: 0 24px 14px;">
				<div style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 8px; background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.15);">
					<svg width="12" height="12" fill="none" stroke="#fbbf24" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/></svg>
					<span style="font-size: 12px; color: rgba(251,191,36,0.8);">This dialog cannot be dismissed by clicking outside or pressing Escape.</span>
				</div>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (alertOpen = false)}>Continue as guest</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (alertOpen = false)}>Sign in again</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 6. Nested Dialogs — Layer 1 ──────────────────────────────────────── -->
{#if nestedL1Open}
	<div
		class="dlg-overlay"
		style="z-index: 300;"
		onclick={() => { if (!nestedL2Open) nestedL1Open = false; }}
		onkeydown={(e) => { if (e.key === 'Escape' && !nestedL2Open) nestedL1Open = false; }}
		role="dialog"
		aria-modal="true"
		aria-label="First dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: 480px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header">
				<div>
					<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
						<h2 class="dlg-title">First dialog</h2>
						<span class="dlg-depth-badge">Layer 1</span>
					</div>
					<p class="dlg-subtitle">This is the base layer. The button below opens a second dialog on top.</p>
				</div>
				<button class="dlg-close" onclick={() => (nestedL1Open = false)} aria-label="Close first dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="dlg-body">
				<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0 0 18px;">
					Nesting dialogs is occasionally necessary — for example, a confirmation prompt that appears within a complex form dialog, or a detail view that spawns a sub-action overlay.
				</p>
				<p style="font-size: 12px; color: var(--dt3); line-height: 1.6; margin: 0 0 18px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--dbd2); background: var(--dbg2);">
					Tip: keep nesting to at most two levels. Deeper stacking creates disorientation. Prefer inline state or slide-over panels for more complex flows.
				</p>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" onclick={() => (nestedL2Open = true)}>
					<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8" stroke-linecap="round"/></svg>
					Open second dialog
				</button>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (nestedL1Open = false)}>Close</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 6. Nested Dialogs — Layer 2 ──────────────────────────────────────── -->
{#if nestedL2Open}
	<div
		class="dlg-overlay"
		style="z-index: 350;"
		onclick={() => (nestedL2Open = false)}
		onkeydown={(e) => e.key === 'Escape' && (nestedL2Open = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Second dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop" style="background: rgba(0,0,0,0.5);"></div>
		<div
			class="dlg-panel"
			style="max-width: 380px; border-color: var(--dbd);"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header">
				<div>
					<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
						<h2 class="dlg-title">Second dialog</h2>
						<span class="dlg-depth-badge" style="border-color: rgba(99,102,241,0.3); color: rgba(99,102,241,0.8);">Layer 2</span>
					</div>
					<p class="dlg-subtitle">Stacked on top of the first dialog at z-index 350.</p>
				</div>
				<button class="dlg-close" onclick={() => (nestedL2Open = false)} aria-label="Close second dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>
			<div class="dlg-body">
				<p style="font-size: 13px; color: var(--dt3); line-height: 1.7; margin: 0;">
					This second dialog sits at <code style="font-size: 12px; padding: 1px 5px; border-radius: 4px; background: var(--dbg3);">z-index: 350</code> while the first is at <code style="font-size: 12px; padding: 1px 5px; border-radius: 4px; background: var(--dbg3);">300</code>. Closing this returns focus to the layer below.
				</p>
			</div>
			<div class="dlg-footer">
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (nestedL2Open = false)}>Close this layer</button>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 7. Custom Header & Footer Dialog ─────────────────────────────────── -->
{#if customOpen}
	<div
		class="dlg-overlay"
		onclick={() => (customOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (customOpen = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Workspace info dialog"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: 520px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<!-- Custom header: icon badge + title + subtitle -->
			<div class="dlg-header" style="padding: 22px 24px 18px; align-items: center; gap: 14px;">
				<div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0;">
					<div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 100%); border: 1px solid rgba(99,102,241,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
						<svg width="18" height="18" fill="none" stroke="#a78bfa" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22V12h6v10" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</div>
					<div style="min-width: 0;">
						<h2 class="dlg-title">MIOSA Platform</h2>
						<p class="dlg-subtitle">Workspace · Pro plan · 8 members</p>
					</div>
				</div>
				<button class="dlg-close" onclick={() => (customOpen = false)} aria-label="Close dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>

			<div class="dlg-body">
				<p class="dlg-section-label">Workspace details</p>
				{#each [
					['Created', 'Jan 12, 2025'],
					['Owner', 'R. Moreau'],
					['Plan', 'Pro · $49 / month'],
					['Storage used', '2.4 GB of 50 GB'],
					['Active projects', '14'],
					['Last activity', '2 minutes ago'],
				] as [label, value]}
					<div class="dlg-info-row">
						<span style="font-size: 13px; color: var(--dt3);">{label}</span>
						<span style="font-size: 13px; color: var(--dt2); font-weight: 500;">{value}</span>
					</div>
				{/each}

				<p class="dlg-section-label" style="margin-top: 20px;">Members (8)</p>
				<div style="display: flex; align-items: center; gap: 10px; padding: 10px 0;">
					<div style="display: flex;">
						{#each ['R', 'A', 'M', 'J', 'K'] as initial, i}
							<div style="width: 28px; height: 28px; border-radius: 9999px; background: var(--dbg3); border: 2px solid var(--dbg); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--dt2); margin-left: {i > 0 ? '-8px' : '0'};">{initial}</div>
						{/each}
					</div>
					<span style="font-size: 12px; color: var(--dt3);">+3 more</span>
				</div>
			</div>

			<!-- Custom footer: three-action layout -->
			<div class="dlg-footer dlg-footer--spread">
				<button
					class="btn-pill btn-pill-ghost btn-pill-sm"
					style="color: #f87171; border-color: rgba(239,68,68,0.2);"
					onclick={() => (customOpen = false)}
					aria-label="Leave workspace"
				>Leave workspace</button>
				<div style="display: flex; gap: 8px;">
					<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => (customOpen = false)}>Cancel</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => (customOpen = false)}>Manage workspace</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- ─── 8. Delete Confirmation Dialog ────────────────────────────────────── -->
{#if deleteOpen}
	<div
		class="dlg-overlay"
		onclick={() => (deleteOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (deleteOpen = false)}
		role="alertdialog"
		aria-modal="true"
		aria-label="Delete database confirmation"
		tabindex="-1"
	>
		<div class="dlg-backdrop"></div>
		<div
			class="dlg-panel"
			style="max-width: 460px;"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="dlg-header dlg-header--no-border" style="padding-bottom: 4px;">
				<div style="display: flex; align-items: flex-start; gap: 14px; flex: 1;">
					<div class="dlg-icon-wrap dlg-icon-wrap--danger">
						<svg width="18" height="18" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v6M14 11v6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6V4h6v2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</div>
					<div>
						<h2 class="dlg-title">Delete database</h2>
						<p class="dlg-desc" style="margin-top: 5px;">
							This will permanently destroy <strong style="color: #f87171; font-family: ui-monospace, monospace; font-size: 12px; padding: 1px 5px; background: rgba(239,68,68,0.08); border-radius: 4px;">{resourceName}</strong> including all tables, indexes, and backups. This action is irreversible.
						</p>
					</div>
				</div>
				<button class="dlg-close" onclick={() => { deleteOpen = false; deleteInput = ''; }} aria-label="Close dialog">
					<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
				</button>
			</div>

			<div class="dlg-body" style="padding-top: 16px;">
				<div style="padding: 12px 14px; border-radius: 8px; background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.15); margin-bottom: 18px;">
					<ul style="font-size: 12px; color: rgba(248,113,113,0.85); line-height: 1.7; margin: 0; padding-left: 16px;">
						<li>All database tables and schema migrations</li>
						<li>All stored records and binary data</li>
						<li>All automated backups and point-in-time snapshots</li>
						<li>All active connections will be terminated</li>
					</ul>
				</div>

				<div class="dlg-field">
					<label class="dlg-label" for="dlg-delete-confirm">
						Type <code style="font-size: 11px; padding: 1px 5px; border-radius: 4px; background: var(--dbg3); font-family: ui-monospace, monospace;">{resourceName}</code> to confirm
					</label>
					<input
						id="dlg-delete-confirm"
						class="dlg-input {deleteInput.length > 0 ? (deleteMatch ? 'dlg-input--matched' : 'dlg-input--match') : ''}"
						type="text"
						placeholder={resourceName}
						bind:value={deleteInput}
						autocomplete="off"
						spellcheck="false"
					/>
					{#if deleteInput.length > 0 && !deleteMatch}
						<span style="font-size: 11px; color: rgba(248,113,113,0.7);">Name does not match — keep typing.</span>
					{:else if deleteMatch}
						<span style="font-size: 11px; color: rgba(74,222,128,0.8); display: flex; align-items: center; gap: 4px;">
							<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
							Name confirmed — you may proceed.
						</span>
					{/if}
				</div>
			</div>

			<div class="dlg-footer">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => { deleteOpen = false; deleteInput = ''; }}>Cancel</button>
				<button
					class="btn-destructive"
					disabled={!deleteMatch || deleteConfirmed}
					onclick={triggerDelete}
					aria-label="Permanently delete database"
					style="min-width: 130px;"
				>
					{#if deleteConfirmed}
						<span class="dlg-spinner" style="border-top-color: #f87171; border-color: rgba(239,68,68,0.3) rgba(239,68,68,0.3) rgba(239,68,68,0.3) #f87171;"></span>
						Deleting…
					{:else}
						<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
						Delete forever
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
