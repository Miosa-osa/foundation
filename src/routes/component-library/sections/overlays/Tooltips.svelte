<script lang="ts">
	import { Tooltip } from '$lib/ui';

	let richHovered = $state<string | null>(null);
	let delayHovered = $state<string | null>(null);
	let delayTimers = $state<Record<string, ReturnType<typeof setTimeout>>>({});

	function showDelayed(id: string, ms: number) {
		clearTimeout(delayTimers[id]);
		delayTimers[id] = setTimeout(() => {
			delayHovered = id;
		}, ms);
	}

	function hideDelayed(id: string) {
		clearTimeout(delayTimers[id]);
		delayHovered = null;
	}

	const toolbarTools = [
		{ id: 'bold',      label: 'Bold',      shortcut: '⌘B',   icon: 'M6 4h8a4 4 0 010 8H6z M6 12h9a4 4 0 010 8H6z' },
		{ id: 'italic',    label: 'Italic',    shortcut: '⌘I',   icon: 'M19 4h-9M14 20H5M14.7 4L9.3 20' },
		{ id: 'underline', label: 'Underline', shortcut: '⌘U',   icon: 'M6 3v7a6 6 0 0012 0V3M4 21h16' },
		{ id: 'link',      label: 'Link',      shortcut: '⌘K',   icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' },
		{ id: 'image',     label: 'Image',     shortcut: '⌘⇧I',  icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
		{ id: 'code',      label: 'Code',      shortcut: '⌘E',   icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
		{ id: 'quote',     label: 'Quote',     shortcut: '⌘⇧.',  icon: 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z' },
		{ id: 'list',      label: 'List',      shortcut: '⌘⇧8',  icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
	];

	const infoFields = [
		{
			id: 'workspace-slug',
			label: 'Workspace slug',
			placeholder: 'my-workspace',
			tip: 'Used in your workspace URL: app.miosa.dev/your-slug. Lowercase letters, numbers, and hyphens only. Cannot be changed after creation.',
		},
		{
			id: 'api-key',
			label: 'API key scope',
			placeholder: 'Select scope…',
			tip: 'Scopes limit what the API key can access. Use the narrowest scope required. Keys with write:all can modify any resource.',
		},
		{
			id: 'retention',
			label: 'Log retention',
			placeholder: '90 days',
			tip: 'Logs older than this period are permanently deleted. Changes apply from the next retention cycle, not retroactively.',
		},
	];
</script>

<style>
	/* ── Rich tooltip custom ───────────────────────────────── */
	.rt-trigger {
		position: relative;
		display: inline-block;
	}
	.rt-card {
		position: absolute;
		z-index: 60;
		background: rgba(14, 14, 14, 0.97);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		backdrop-filter: blur(20px);
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.55), 0 0 0 0.5px rgba(255, 255, 255, 0.03) inset;
		pointer-events: none;
		animation: rtIn 0.14s ease;
		top: calc(100% + 8px);
		left: 0;
	}
	.rt-card--right {
		top: 50%;
		left: calc(100% + 10px);
		transform: translateY(-50%);
	}
	@keyframes rtIn {
		from { opacity: 0; transform: translateY(3px) scale(0.98); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	/* ── Delay demo ─────────────────────────────────────────── */
	.delay-trigger {
		position: relative;
		display: inline-block;
	}
	.delay-tip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		background: #1a1a2e;
		border: 1px solid rgba(255,255,255,0.09);
		color: #f0f0f5;
		font-size: 11px;
		white-space: nowrap;
		padding: 4px 10px;
		border-radius: 6px;
		pointer-events: none;
		animation: dtIn 0.12s ease;
		z-index: 60;
	}
	.delay-tip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: var(--dbd, rgba(255,255,255,0.09));
	}
	@keyframes dtIn {
		from { opacity: 0; transform: translateX(-50%) translateY(3px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	/* ── Glass tooltip ──────────────────────────────────────── */
	.glass-trigger {
		position: relative;
		display: inline-block;
	}
	.glass-tip {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.14);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		color: rgba(255, 255, 255, 0.92);
		font-size: 12px;
		font-weight: 500;
		white-space: nowrap;
		padding: 6px 12px;
		border-radius: 8px;
		pointer-events: none;
		animation: glIn 0.14s ease;
		z-index: 60;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}
	.glass-tip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: rgba(255, 255, 255, 0.14);
	}
	@keyframes glIn {
		from { opacity: 0; transform: translateX(-50%) translateY(4px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	/* ── Info tooltip ───────────────────────────────────────── */
	.info-wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
	}
	.info-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 15px;
		height: 15px;
		border-radius: 9999px;
		border: 1px solid var(--dbd, rgba(255,255,255,0.15));
		color: var(--dt3, rgba(255,255,255,0.4));
		font-size: 9px;
		font-weight: 700;
		cursor: default;
		flex-shrink: 0;
		transition: border-color 0.15s, color 0.15s;
	}
	.info-icon:hover {
		border-color: var(--dt2, rgba(255,255,255,0.35));
		color: var(--dt, #fff);
	}
	.info-tip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		width: 220px;
		background: rgba(14, 14, 14, 0.97);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 9px 12px;
		font-size: 12px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.75);
		pointer-events: none;
		animation: infoIn 0.13s ease;
		z-index: 60;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
	}
	.info-tip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: rgba(255, 255, 255, 0.08);
	}
	@keyframes infoIn {
		from { opacity: 0; transform: translateX(-50%) translateY(3px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	/* ── Toolbar ────────────────────────────────────────────── */
	.toolbar-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		border: none;
		background: transparent;
		color: var(--dt2, rgba(255,255,255,0.5));
		cursor: pointer;
		transition: background 0.12s, color 0.12s;
	}
	.toolbar-btn:hover {
		background: rgba(255, 255, 255, 0.07);
		color: var(--dt, #fff);
	}
	.toolbar-divider {
		width: 1px;
		height: 20px;
		background: var(--dbd, rgba(255,255,255,0.08));
		margin: 0 2px;
	}

	/* ── Various elements section ───────────────────────────── */
	.notif-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		width: 14px;
		height: 14px;
		border-radius: 9999px;
		background: #dc2626;
		color: #fff;
		font-size: 8px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<section class="ds-section">
	<h2 class="ds-title">Tooltips</h2>
	<p class="ds-desc">Contextual hints on hover. Built on Bits UI Tooltip primitive with custom CSS variants for glass, delay, info, and rich patterns.</p>

	<!-- 1. Positions -->
	<div class="ds-card">
		<h3 class="ds-card__title">Positions</h3>
		<p class="ds-card__sub">All four placement sides — tooltip tracks the trigger and avoids viewport edges</p>
		<div class="ds-demo" style="gap: 10px; flex-wrap: wrap; justify-content: center; padding: 24px 16px;">
			<Tooltip content="Appears above the trigger" side="top">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Top tooltip demo">
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
					Top
				</button>
			</Tooltip>
			<Tooltip content="Appears below the trigger" side="bottom">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Bottom tooltip demo">
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
					Bottom
				</button>
			</Tooltip>
			<Tooltip content="Appears to the left" side="left">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Left tooltip demo">
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
					Left
				</button>
			</Tooltip>
			<Tooltip content="Appears to the right" side="right">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Right tooltip demo">
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					Right
				</button>
			</Tooltip>
		</div>
	</div>

	<!-- 2. With Keyboard Shortcuts -->
	<div class="ds-card">
		<h3 class="ds-card__title">With Keyboard Shortcuts</h3>
		<p class="ds-card__sub">Shortcut keys rendered inside the tooltip via the <code style="font-size: 11px; background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 4px;">shortcut</code> prop — uses <code style="font-size: 11px; background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 4px;">$mod</code> to resolve ⌘ on Mac and Ctrl on Windows</p>
		<div class="ds-demo" style="gap: 10px; flex-wrap: wrap;">
			<Tooltip content="Search everywhere" shortcut="$mod+K">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Search">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
					Search
				</button>
			</Tooltip>
			<Tooltip content="Save changes" shortcut="$mod+S">
				<button class="btn-pill btn-pill-primary btn-pill-sm" aria-label="Save">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
					Save
				</button>
			</Tooltip>
			<Tooltip content="Create new document" shortcut="$mod+N">
				<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm" aria-label="New document">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
				</button>
			</Tooltip>
			<Tooltip content="Delete selected" shortcut="$mod+Backspace">
				<button class="btn-pill btn-pill-icon btn-pill-danger btn-pill-sm" aria-label="Delete">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
				</button>
			</Tooltip>
		</div>
	</div>

	<!-- 3. On Various Elements -->
	<div class="ds-card">
		<h3 class="ds-card__title">On Various Elements</h3>
		<p class="ds-card__sub">Tooltips attach to any element — icon buttons, avatars, text links, badges, notification bells</p>
		<div class="ds-demo" style="gap: 20px; flex-wrap: wrap; align-items: center;">
			<!-- Icon button -->
			<Tooltip content="Settings" side="top">
				<button
					style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--dbd); background: var(--dbg); display: flex; align-items: center; justify-content: center; color: var(--dt2); cursor: pointer;"
					aria-label="Open settings"
				>
					<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
				</button>
			</Tooltip>

			<!-- Avatar -->
			<Tooltip content="R. Moreau — Design Lead" side="top">
				<div
					style="width: 38px; height: 38px; border-radius: 9999px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 700; cursor: pointer; flex-shrink: 0;"
					role="button"
					tabindex="0"
					aria-label="R. Moreau profile"
				>R</div>
			</Tooltip>

			<!-- Text link -->
			<Tooltip content="Opens the Svelte documentation site" side="top">
				<a
					href="https://svelte.dev"
					style="color: #7dd3fc; font-size: 14px; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(125,211,252,0.4);"
					aria-label="Visit svelte.dev"
				>svelte.dev</a>
			</Tooltip>

			<!-- Badge -->
			<Tooltip content="Pull request is waiting for review" side="top">
				<span
					style="display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 9999px; background: rgba(234,179,8,0.1); color: #ca8a04; border: 1px solid rgba(234,179,8,0.2); cursor: default;"
					role="status"
					aria-label="Pending review badge"
				>
					<span style="width: 6px; height: 6px; border-radius: 9999px; background: currentColor; flex-shrink: 0;"></span>
					Pending review
				</span>
			</Tooltip>

			<!-- Notification bell -->
			<Tooltip content="3 unread notifications" side="top">
				<div
					style="position: relative; cursor: pointer; color: var(--dt2);"
					role="button"
					tabindex="0"
					aria-label="Notifications"
				>
					<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
					<span class="notif-badge">3</span>
				</div>
			</Tooltip>
		</div>
	</div>

	<!-- 4. Rich Tooltips (Custom) -->
	<div class="ds-card">
		<h3 class="ds-card__title">Rich Tooltips</h3>
		<p class="ds-card__sub">Custom hover panels for complex content — user profile with avatar and status, notification summary with metadata. Built with CSS position relative.</p>
		<div class="ds-demo ds-preview-dark" style="gap: 32px; flex-wrap: wrap; align-items: flex-start; min-height: 200px; padding: 32px 20px;">

			<!-- User profile rich tooltip -->
			<div
				class="rt-trigger"
				role="group"
				onmouseenter={() => (richHovered = 'user')}
				onmouseleave={() => (richHovered = null)}
			>
				<div style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03);">
					<div style="width: 26px; height: 26px; border-radius: 9999px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;">A</div>
					<span style="font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 500;">A. Chen</span>
				</div>

				{#if richHovered === 'user'}
					<div class="rt-card" style="width: 260px; padding: 14px;">
						<div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
							<div style="display: flex; align-items: center; gap: 10px;">
								<div style="position: relative; flex-shrink: 0;">
									<div style="width: 42px; height: 42px; border-radius: 9999px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: #fff;">A</div>
									<span style="position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px; border-radius: 9999px; background: #22c55e; border: 2px solid #0e0e0e;"></span>
								</div>
								<div>
									<p style="font-size: 13px; font-weight: 600; color: #fff; margin: 0; letter-spacing: -0.01em;">A. Chen</p>
									<p style="font-size: 11px; color: rgba(255,255,255,0.35); margin: 2px 0 0;">Frontend engineer</p>
								</div>
							</div>
							<span style="font-size: 10px; font-weight: 500; padding: 2px 7px; border-radius: 9999px; background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); white-space: nowrap; flex-shrink: 0;">Online</span>
						</div>
						<p style="font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.6; margin: 0 0 12px;">Svelte, TypeScript, accessibility. Building in public. Open to consulting.</p>
						<div style="display: flex; justify-content: space-around; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06);">
							<div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
								<span style="font-size: 13px; font-weight: 700; color: #fff;">8.1k</span>
								<span style="font-size: 10px; color: rgba(255,255,255,0.3);">Followers</span>
							</div>
							<div style="width: 1px; background: rgba(255,255,255,0.06);"></div>
							<div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
								<span style="font-size: 13px; font-weight: 700; color: #fff;">522</span>
								<span style="font-size: 10px; color: rgba(255,255,255,0.3);">Following</span>
							</div>
							<div style="width: 1px; background: rgba(255,255,255,0.06);"></div>
							<div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
								<span style="font-size: 13px; font-weight: 700; color: #fff;">389</span>
								<span style="font-size: 10px; color: rgba(255,255,255,0.3);">Posts</span>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Notification rich tooltip -->
			<div
				class="rt-trigger"
				role="group"
				onmouseenter={() => (richHovered = 'notif')}
				onmouseleave={() => (richHovered = null)}
			>
				<div style="position: relative; cursor: pointer; padding: 6px;">
					<svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
					<span class="notif-badge">2</span>
				</div>

				{#if richHovered === 'notif'}
					<div class="rt-card rt-card--right" style="width: 280px; padding: 0; overflow: hidden;">
						<div style="padding: 12px 14px 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">
							<p style="font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); margin: 0; letter-spacing: 0.01em;">Notifications</p>
						</div>
						<!-- notif 1 -->
						<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.04);">
							<div style="width: 8px; height: 8px; border-radius: 9999px; background: #6366f1; flex-shrink: 0; margin-top: 4px;"></div>
							<div style="flex: 1;">
								<p style="font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.8); margin: 0 0 3px; line-height: 1.4;">R. Moreau left a comment on <em style="font-style: normal; color: #fff;">Token audit</em></p>
								<p style="font-size: 11px; color: rgba(255,255,255,0.25); margin: 0;">2 minutes ago</p>
							</div>
						</div>
						<!-- notif 2 -->
						<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px;">
							<div style="width: 8px; height: 8px; border-radius: 9999px; background: #22c55e; flex-shrink: 0; margin-top: 4px;"></div>
							<div style="flex: 1;">
								<p style="font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.8); margin: 0 0 3px; line-height: 1.4;">Deployment <em style="font-style: normal; color: #fff;">v2.4.1</em> completed successfully</p>
								<p style="font-size: 11px; color: rgba(255,255,255,0.25); margin: 0;">18 minutes ago</p>
							</div>
						</div>
						<div style="padding: 8px 14px 10px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
							<a href="/" style="font-size: 11px; color: rgba(255,255,255,0.35); text-decoration: none; letter-spacing: 0.01em;">View all notifications</a>
						</div>
					</div>
				{/if}
			</div>

		</div>
	</div>

	<!-- 5. Tooltip Delay -->
	<div class="ds-card">
		<h3 class="ds-card__title">Tooltip Delay</h3>
		<p class="ds-card__sub">Control how long the user must hover before the tooltip appears. Use instant for focused UI tools, longer delays for ambient hints.</p>
		<div class="ds-demo" style="gap: 12px; flex-wrap: wrap; justify-content: center; padding: 32px 16px;">

			<!-- Instant: delayDuration=0 via Tooltip component -->
			<Tooltip content="Instant — no delay" delayDuration={0} side="top">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="Instant tooltip demo">
					Instant
				</button>
			</Tooltip>

			<!-- 200ms: delayDuration=200 via Tooltip component -->
			<Tooltip content="200ms delay" delayDuration={200} side="top">
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="200ms tooltip demo">
					200ms
				</button>
			</Tooltip>

			<!-- 500ms (default): custom CSS for visual demo -->
			<div
				class="delay-trigger"
				onmouseenter={() => showDelayed('d500', 500)}
				onmouseleave={() => hideDelayed('d500')}
				role="group"
			>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="500ms tooltip demo">
					500ms
				</button>
				{#if delayHovered === 'd500'}
					<span class="delay-tip">500ms delay (default)</span>
				{/if}
			</div>

			<!-- 1000ms: custom CSS for visual demo -->
			<div
				class="delay-trigger"
				onmouseenter={() => showDelayed('d1000', 1000)}
				onmouseleave={() => hideDelayed('d1000')}
				role="group"
			>
				<button class="btn-pill btn-pill-secondary btn-pill-sm" aria-label="1000ms tooltip demo">
					1000ms
				</button>
				{#if delayHovered === 'd1000'}
					<span class="delay-tip">1000ms delay — hold to see</span>
				{/if}
			</div>

		</div>
		<p style="font-size: 12px; color: var(--dt3); text-align: center; margin: 0; padding-bottom: 4px;">Pass <code style="font-size: 11px; background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 4px;">delayDuration={'{0}'}</code> to the Tooltip component, or build custom timers for non-standard values.</p>
	</div>

	<!-- 6. Glass Tooltips -->
	<div class="ds-card">
		<h3 class="ds-card__title">Glass Tooltips</h3>
		<p class="ds-card__sub">Frosted glass style using <code style="font-size: 11px; background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 4px;">backdrop-filter: blur()</code> — pairs well with gradient hero sections and dark photography backgrounds</p>
		<div
			class="ds-demo ds-preview-dark"
			style="gap: 20px; flex-wrap: wrap; justify-content: center; align-items: center; padding: 40px 20px; background: linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(236,72,153,0.1) 100%);"
		>
			{#each [
				{ id: 'gl-1', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10' },
				{ id: 'gl-2', label: 'Analytics', icon: 'M18 20V10M12 20V4M6 20v-6' },
				{ id: 'gl-3', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
				{ id: 'gl-4', label: 'Profile', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z' },
				{ id: 'gl-5', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
			] as item}
				<div
					class="glass-trigger"
					role="group"
					onmouseenter={() => (richHovered = item.id)}
					onmouseleave={() => (richHovered = null)}
				>
					<button
						style="width: 44px; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 0.15s, border-color 0.15s;"
						aria-label="{item.label} navigation"
					>
						<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
							{#each item.icon.split(' M ').filter(Boolean) as path, i}
								<path stroke-linecap="round" stroke-linejoin="round" d="{i === 0 ? path : 'M ' + path}"/>
							{/each}
						</svg>
					</button>
					{#if richHovered === item.id}
						<span class="glass-tip">{item.label}</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- 7. Information Tooltips -->
	<div class="ds-card">
		<h3 class="ds-card__title">Information Tooltips</h3>
		<p class="ds-card__sub">Circled "i" icons next to form labels that explain the field on hover — reduces form clutter while keeping help text accessible</p>
		<div class="ds-demo" style="flex-direction: column; gap: 18px; align-items: stretch; max-width: 380px;">
			{#each infoFields as field}
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<!-- Label row with info icon -->
					<div style="display: flex; align-items: center; gap: 6px;">
						<label
							for={field.id}
							style="font-size: 13px; font-weight: 500; color: var(--dt); letter-spacing: -0.01em;"
						>{field.label}</label>
						<div
							class="info-wrap"
							onmouseenter={() => (richHovered = field.id)}
							onmouseleave={() => (richHovered = null)}
							role="group"
						>
							<span
								class="info-icon"
								role="img"
								aria-label="More information about {field.label}"
							>i</span>
							{#if richHovered === field.id}
								<div class="info-tip">{field.tip}</div>
							{/if}
						</div>
					</div>
					<!-- Input -->
					<input
						id={field.id}
						type="text"
						placeholder={field.placeholder}
						style="height: 36px; padding: 0 10px; border-radius: 7px; border: 1px solid var(--dbd); background: var(--dbg); color: var(--dt); font-size: 13px; outline: none; width: 100%;"
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- 8. In Context: Toolbar with Tooltips -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context: Toolbar with Tooltips</h3>
		<p class="ds-card__sub">Every toolbar button carries its action name and keyboard shortcut — users discover shortcuts without documentation</p>
		<div class="ds-demo" style="justify-content: center; flex-direction: column; align-items: center; gap: 20px; padding: 24px 16px;">

			<!-- Text formatting mock area -->
			<div style="width: 100%; max-width: 520px; border: 1px solid var(--dbd); border-radius: 10px; overflow: hidden;">
				<!-- Toolbar -->
				<div style="display: flex; align-items: center; gap: 1px; padding: 6px 8px; border-bottom: 1px solid var(--dbd); background: var(--dbg); flex-wrap: wrap; gap: 2px;">
					{#each toolbarTools as tool, i}
						{#if i === 3 || i === 5}
							<div class="toolbar-divider"></div>
						{/if}
						<Tooltip content={tool.label} shortcut={tool.shortcut} side="top" delayDuration={300}>
							<button
								class="toolbar-btn"
								aria-label="{tool.label} ({tool.shortcut})"
							>
								<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" d={tool.icon}/>
								</svg>
							</button>
						</Tooltip>
					{/each}
				</div>
				<!-- Editor area -->
				<div
					contenteditable="true"
					role="textbox"
					aria-multiline="true"
					aria-label="Rich text editor"
					style="min-height: 80px; padding: 12px 14px; font-size: 14px; color: var(--dt2); line-height: 1.7; outline: none; background: transparent;"
				>
					Hover any toolbar button to see its action name and keyboard shortcut.
				</div>
			</div>

			<p style="font-size: 12px; color: var(--dt3); text-align: center; margin: 0;">
				<code style="font-size: 11px; background: rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 4px;">delayDuration={'{300}'}</code> — short enough to feel responsive, long enough to avoid noise during fast cursor movement
			</p>
		</div>
	</div>

</section>
