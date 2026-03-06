<script lang="ts">
	// Bottom Nav active tab
	let activeNavTab = $state<'home' | 'search' | 'create' | 'inbox' | 'profile'>('home');

	// FAB expand
	let fabExpanded = $state(false);

	// Floating Chat
	let chatExpanded = $state(false);

	// Speed Dial
	let speedDialOpen = $state(false);

	// Notification badge count (simulated)
	let notifCount = $state(4);
</script>

<style>
	/* ── Demo container ─────────────────────────────────────────── */
	.float-demo {
		position: relative;
		width: 100%;
		height: 300px;
		background: var(--dbg2, #f5f5f5);
		border-radius: 12px;
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.08));
		overflow: hidden;
	}
	:global(.dark) .float-demo {
		background: var(--dbg2, #1a1a1a);
		border-color: var(--dbd, rgba(255, 255, 255, 0.08));
	}

	.float-demo-label {
		position: absolute;
		top: 14px;
		left: 16px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt3, #aaa);
		pointer-events: none;
		z-index: 0;
	}

	/* ── Glass utility ──────────────────────────────────────────── */
	.glass {
		background: rgba(255, 255, 255, 0.72);
		backdrop-filter: blur(14px) saturate(1.4);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
		border: 1px solid rgba(255, 255, 255, 0.55);
	}
	:global(.dark) .glass {
		background: rgba(20, 20, 20, 0.72);
		border-color: rgba(255, 255, 255, 0.1);
	}

	/* ══ 1. BOTTOM NAVIGATION BAR ═══════════════════════════════ */
	.bottom-nav {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 64px;
		display: flex;
		align-items: stretch;
		justify-content: space-around;
		padding: 0 8px;
		box-shadow: 0 -1px 0 var(--dbd, rgba(0, 0, 0, 0.08)),
		            0 -8px 24px rgba(0, 0, 0, 0.06);
		z-index: 10;
	}

	.bottom-nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		flex: 1;
		border: none;
		background: transparent;
		cursor: pointer;
		color: var(--dt3, #aaa);
		font-size: 10px;
		font-weight: 500;
		padding: 8px 4px;
		position: relative;
		transition: color 0.18s ease;
		font-family: inherit;
	}
	.bottom-nav-item:hover {
		color: var(--dt2, #666);
	}
	.bottom-nav-item.active {
		color: var(--dt, #111);
	}
	:global(.dark) .bottom-nav-item.active {
		color: var(--dt, #f0f0f0);
	}

	.bottom-nav-item svg {
		width: 22px;
		height: 22px;
		flex-shrink: 0;
		transition: transform 0.18s ease;
	}
	.bottom-nav-item.active svg {
		transform: translateY(-1px);
	}

	/* Active indicator pill at top */
	.bottom-nav-item.active::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 50%;
		transform: translateX(-50%);
		width: 32px;
		height: 3px;
		border-radius: 0 0 3px 3px;
		background: var(--dt, #111);
		transition: width 0.2s ease;
	}
	:global(.dark) .bottom-nav-item.active::before {
		background: var(--dt, #f0f0f0);
	}

	/* Create button - special pill */
	.bottom-nav-item.create-tab {
		flex: 0 0 56px;
	}
	.bottom-nav-item.create-tab .nav-create-icon {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		background: var(--dt, #111);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 2px;
		transition: transform 0.18s ease, box-shadow 0.18s ease;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}
	:global(.dark) .bottom-nav-item.create-tab .nav-create-icon {
		background: #e5e5e5;
		color: #111;
	}
	.bottom-nav-item.create-tab:hover .nav-create-icon {
		transform: scale(1.08);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
	}

	/* ══ 2. FLOATING ACTION BUTTON ═══════════════════════════════ */
	.fab-container {
		position: absolute;
		bottom: 20px;
		right: 20px;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-end;
		gap: 10px;
		z-index: 10;
	}

	.fab-main {
		width: 52px;
		height: 52px;
		border-radius: 16px;
		background: var(--dt, #111);
		color: #fff;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
		transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
		flex-shrink: 0;
		font-family: inherit;
	}
	:global(.dark) .fab-main {
		background: #e5e5e5;
		color: #111;
	}
	.fab-main:hover {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.34);
	}
	.fab-main svg {
		width: 22px;
		height: 22px;
		transition: transform 0.22s ease;
	}
	.fab-main.open svg {
		transform: rotate(45deg);
	}

	.fab-mini-actions {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: flex-end;
	}

	.fab-mini-item {
		display: flex;
		align-items: center;
		gap: 8px;
		animation: fabItemIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
	}
	@keyframes fabItemIn {
		from { opacity: 0; transform: translateY(10px) scale(0.9); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	.fab-mini-label {
		font-size: 12px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 8px;
		background: var(--dbg, #fff);
		color: var(--dt, #111);
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		white-space: nowrap;
	}
	:global(.dark) .fab-mini-label {
		background: var(--dbg, #111);
		color: var(--dt, #f0f0f0);
		border-color: var(--dbd, rgba(255, 255, 255, 0.12));
	}

	.fab-mini-btn {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		background: var(--dbg, #fff);
		color: var(--dt, #111);
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.16s ease;
		flex-shrink: 0;
		font-family: inherit;
	}
	:global(.dark) .fab-mini-btn {
		background: var(--dbg, #111);
		color: var(--dt, #f0f0f0);
		border-color: var(--dbd, rgba(255, 255, 255, 0.12));
	}
	.fab-mini-btn:hover { transform: scale(1.1); }
	.fab-mini-btn svg { width: 16px; height: 16px; }

	/* ══ 3. DOCK BAR ═════════════════════════════════════════════ */
	.dock-wrapper {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.dock {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		border-radius: 18px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18), 0 1px 0 rgba(255, 255, 255, 0.08) inset;
	}

	.dock-item {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		border: none;
		background: transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2, #555);
		transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
		            background 0.15s ease,
		            color 0.15s ease;
		position: relative;
		font-family: inherit;
	}
	.dock-item:hover {
		transform: scale(1.28) translateY(-4px);
		background: rgba(0, 0, 0, 0.06);
		color: var(--dt, #111);
	}
	:global(.dark) .dock-item:hover {
		background: rgba(255, 255, 255, 0.08);
		color: var(--dt, #f0f0f0);
	}
	.dock-item svg { width: 22px; height: 22px; }

	.dock-item.active { color: var(--dt, #111); }
	:global(.dark) .dock-item.active { color: var(--dt, #f0f0f0); }

	/* Active dot below icon */
	.dock-item.active::after {
		content: '';
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--dt, #111);
	}
	:global(.dark) .dock-item.active::after {
		background: var(--dt, #f0f0f0);
	}

	.dock-divider {
		width: 1px;
		height: 28px;
		background: var(--dbd, rgba(0, 0, 0, 0.12));
		margin: 0 2px;
		flex-shrink: 0;
	}
	:global(.dark) .dock-divider {
		background: var(--dbd, rgba(255, 255, 255, 0.12));
	}

	/* ══ 4. NOTIFICATION BADGE WIDGET ════════════════════════════ */
	.notif-widget {
		position: absolute;
		top: 16px;
		right: 16px;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
	}

	.notif-bell-btn {
		position: relative;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		background: var(--dbg, #fff);
		color: var(--dt2, #555);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
		transition: transform 0.16s ease, box-shadow 0.16s ease;
		font-family: inherit;
	}
	:global(.dark) .notif-bell-btn {
		background: var(--dbg2, #1a1a1a);
		border-color: var(--dbd, rgba(255, 255, 255, 0.1));
		color: var(--dt2, #999);
	}
	.notif-bell-btn:hover {
		transform: scale(1.06);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
	}
	.notif-bell-btn svg { width: 20px; height: 20px; }

	.notif-badge {
		position: absolute;
		top: -5px;
		right: -5px;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9999px;
		background: #ef4444;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--dbg2, #f5f5f5);
		line-height: 1;
		animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	:global(.dark) .notif-badge {
		border-color: #1a1a1a;
	}
	@keyframes badgePop {
		from { transform: scale(0); }
		to   { transform: scale(1); }
	}

	.notif-demo-btns {
		display: flex;
		gap: 6px;
	}

	.notif-demo-btn {
		font-size: 11px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 8px;
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		background: var(--dbg, #fff);
		color: var(--dt2, #555);
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s;
	}
	.notif-demo-btn:hover { background: var(--dbg2, #f0f0f0); }
	:global(.dark) .notif-demo-btn {
		background: var(--dbg2, #1a1a1a);
		color: var(--dt2, #999);
		border-color: var(--dbd2, rgba(255, 255, 255, 0.08));
	}
	:global(.dark) .notif-demo-btn:hover { background: rgba(255, 255, 255, 0.06); }

	/* ══ 5. FLOATING CHAT BUBBLE ═════════════════════════════════ */
	.fchat-bubble-container {
		position: absolute;
		bottom: 20px;
		right: 20px;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 10px;
	}

	.fchat-window {
		width: 240px;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		background: var(--dbg, #fff);
		animation: chatWindowIn 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: bottom right;
	}
	:global(.dark) .fchat-window {
		background: var(--dbg, #111);
		border-color: var(--dbd, rgba(255, 255, 255, 0.1));
	}
	@keyframes chatWindowIn {
		from { opacity: 0; transform: scale(0.85) translateY(10px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.fchat-win-header {
		padding: 10px 14px;
		border-bottom: 1px solid var(--dbd, rgba(0, 0, 0, 0.08));
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--dbg2, #f7f7f7);
	}
	:global(.dark) .fchat-win-header {
		background: var(--dbg2, #1a1a1a);
		border-color: var(--dbd, rgba(255, 255, 255, 0.08));
	}

	.fchat-win-avatar {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		background: var(--dt, #111);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		flex-shrink: 0;
	}
	:global(.dark) .fchat-win-avatar {
		background: #e5e5e5;
		color: #111;
	}

	.fchat-win-name {
		font-size: 13px;
		font-weight: 600;
		color: var(--dt, #111);
		flex: 1;
	}
	:global(.dark) .fchat-win-name { color: var(--dt, #f0f0f0); }

	.fchat-win-online {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #22c55e;
		flex-shrink: 0;
	}

	.fchat-win-messages {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.fchat-msg {
		max-width: 80%;
		padding: 6px 10px;
		border-radius: 10px;
		font-size: 12px;
		line-height: 1.4;
	}
	.fchat-msg.them {
		background: var(--dbg2, #f0f0f0);
		color: var(--dt, #111);
		align-self: flex-start;
		border-radius: 10px 10px 10px 2px;
	}
	:global(.dark) .fchat-msg.them {
		background: var(--dbg2, #1a1a1a);
		color: var(--dt, #f0f0f0);
	}
	.fchat-msg.me {
		background: var(--dt, #111);
		color: #fff;
		align-self: flex-end;
		border-radius: 10px 10px 2px 10px;
	}
	:global(.dark) .fchat-msg.me {
		background: #e5e5e5;
		color: #111;
	}

	.fchat-win-input {
		padding: 8px 12px;
		border-top: 1px solid var(--dbd, rgba(0, 0, 0, 0.08));
		display: flex;
		align-items: center;
		gap: 6px;
	}
	:global(.dark) .fchat-win-input {
		border-color: var(--dbd, rgba(255, 255, 255, 0.08));
	}

	.fchat-input-field {
		flex: 1;
		height: 28px;
		border-radius: 8px;
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		background: var(--dbg2, #f5f5f5);
		color: var(--dt, #111);
		font-size: 11px;
		padding: 0 8px;
		outline: none;
		font-family: inherit;
	}
	:global(.dark) .fchat-input-field {
		background: var(--dbg2, #1a1a1a);
		color: var(--dt, #f0f0f0);
		border-color: var(--dbd, rgba(255, 255, 255, 0.1));
	}

	.fchat-send-btn {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		border: none;
		background: var(--dt, #111);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
		font-family: inherit;
	}
	:global(.dark) .fchat-send-btn {
		background: #e5e5e5;
		color: #111;
	}
	.fchat-send-btn svg { width: 13px; height: 13px; }

	.fchat-bubble-btn {
		width: 52px;
		height: 52px;
		border-radius: 16px;
		background: var(--dt, #111);
		color: #fff;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
		transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
		position: relative;
		flex-shrink: 0;
		font-family: inherit;
	}
	:global(.dark) .fchat-bubble-btn {
		background: #e5e5e5;
		color: #111;
	}
	.fchat-bubble-btn:hover {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.34);
	}
	.fchat-bubble-btn svg { width: 22px; height: 22px; }

	.fchat-unread-dot {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ef4444;
		border: 2px solid var(--dbg2, #f5f5f5);
	}
	:global(.dark) .fchat-unread-dot {
		border-color: #1a1a1a;
	}

	/* ══ 6. STICKY HEADER ════════════════════════════════════════ */
	.sticky-header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 52px;
		display: flex;
		align-items: center;
		padding: 0 18px;
		gap: 12px;
		z-index: 10;
		box-shadow: 0 1px 0 var(--dbd, rgba(0, 0, 0, 0.08)),
		            0 4px 16px rgba(0, 0, 0, 0.06);
	}
	.sticky-header.scrolled {
		box-shadow: 0 1px 0 var(--dbd, rgba(0, 0, 0, 0.08)),
		            0 8px 32px rgba(0, 0, 0, 0.12);
	}

	.sticky-header-logo {
		font-size: 13px;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--dt, #111);
	}
	:global(.dark) .sticky-header-logo { color: var(--dt, #f0f0f0); }

	.sticky-header-nav {
		display: flex;
		gap: 2px;
		flex: 1;
	}

	.sticky-nav-item {
		font-size: 13px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 8px;
		border: none;
		background: transparent;
		color: var(--dt3, #aaa);
		cursor: pointer;
		transition: background 0.14s, color 0.14s;
		font-family: inherit;
	}
	.sticky-nav-item:hover { background: rgba(0, 0, 0, 0.05); color: var(--dt2, #666); }
	:global(.dark) .sticky-nav-item:hover { background: rgba(255, 255, 255, 0.06); color: var(--dt2, #999); }
	.sticky-nav-item.active {
		color: var(--dt, #111);
		background: rgba(0, 0, 0, 0.06);
	}
	:global(.dark) .sticky-nav-item.active {
		color: var(--dt, #f0f0f0);
		background: rgba(255, 255, 255, 0.08);
	}

	.sticky-header-actions {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.sticky-icon-btn {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.08));
		background: transparent;
		color: var(--dt2, #666);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.14s;
		position: relative;
		font-family: inherit;
	}
	.sticky-icon-btn:hover { background: rgba(0, 0, 0, 0.05); }
	:global(.dark) .sticky-icon-btn {
		border-color: var(--dbd, rgba(255, 255, 255, 0.1));
		color: var(--dt2, #999);
	}
	:global(.dark) .sticky-icon-btn:hover { background: rgba(255, 255, 255, 0.06); }
	.sticky-icon-btn svg { width: 16px; height: 16px; }

	.sticky-avatar {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		background: var(--dt, #111);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		cursor: pointer;
		flex-shrink: 0;
	}
	:global(.dark) .sticky-avatar {
		background: #e5e5e5;
		color: #111;
	}

	.sticky-scroll-hint {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		pointer-events: none;
	}

	.sticky-hint-text {
		font-size: 11px;
		color: var(--dt3, #bbb);
		white-space: nowrap;
	}

	.sticky-hint-lines {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 160px;
	}

	.sticky-hint-line {
		height: 8px;
		border-radius: 4px;
		background: var(--dbd, rgba(0, 0, 0, 0.08));
	}
	:global(.dark) .sticky-hint-line { background: var(--dbd, rgba(255, 255, 255, 0.08)); }

	/* ══ 7. SPEED DIAL ═══════════════════════════════════════════ */
	.speed-dial-container {
		position: absolute;
		bottom: 20px;
		right: 20px;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-end;
		gap: 10px;
		z-index: 10;
	}

	.speed-dial-trigger {
		width: 52px;
		height: 52px;
		border-radius: 16px;
		background: var(--dt, #111);
		color: #fff;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
		transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
		flex-shrink: 0;
		font-family: inherit;
	}
	:global(.dark) .speed-dial-trigger {
		background: #e5e5e5;
		color: #111;
	}
	.speed-dial-trigger:hover {
		transform: scale(1.08);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.34);
	}
	.speed-dial-trigger svg {
		width: 22px;
		height: 22px;
		transition: transform 0.22s ease;
	}
	.speed-dial-trigger.open svg {
		transform: rotate(45deg);
	}

	.speed-dial-items {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: flex-end;
	}

	.speed-dial-item {
		display: flex;
		align-items: center;
		gap: 10px;
		animation: sdItemIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
	}
	@keyframes sdItemIn {
		from { opacity: 0; transform: translateY(12px) scale(0.88); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	.speed-dial-label {
		font-size: 12px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 8px;
		background: var(--dbg, #fff);
		color: var(--dt2, #555);
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		white-space: nowrap;
	}
	:global(.dark) .speed-dial-label {
		background: var(--dbg, #111);
		color: var(--dt2, #aaa);
		border-color: var(--dbd, rgba(255, 255, 255, 0.1));
	}

	.speed-dial-btn {
		width: 42px;
		height: 42px;
		border-radius: 12px;
		background: var(--dbg, #fff);
		color: var(--dt, #111);
		border: 1px solid var(--dbd, rgba(0, 0, 0, 0.1));
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		transition: transform 0.16s ease, box-shadow 0.16s ease;
		flex-shrink: 0;
		font-family: inherit;
	}
	:global(.dark) .speed-dial-btn {
		background: var(--dbg2, #1a1a1a);
		color: var(--dt, #f0f0f0);
		border-color: var(--dbd, rgba(255, 255, 255, 0.12));
	}
	.speed-dial-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
	}
	.speed-dial-btn svg { width: 17px; height: 17px; }
</style>

<section class="ds-section">
	<h2 class="ds-title">Floating Elements</h2>
	<p class="ds-desc">
		Fixed and floating UI patterns — bottom navs, FABs, docks, and overlays — demonstrated
		inside contained bounds so they don't escape the page layout.
	</p>

	<!-- 1. Bottom Navigation Bar -->
	<div class="ds-card">
		<h3 class="ds-card__title">Bottom Navigation Bar</h3>
		<p class="ds-card__sub">Mobile-style tab bar with top-edge active indicator and a special create action button</p>
		<div class="float-demo">
			<span class="float-demo-label">Mobile Viewport</span>

			<!-- Placeholder content -->
			<div style="position: absolute; top: 48px; left: 24px; right: 24px; display: flex; flex-direction: column; gap: 10px; pointer-events: none;">
				{#each [80, 60, 70, 50] as w}
					<div style="height: 9px; border-radius: 5px; width: {w}%; background: var(--dbd, rgba(0,0,0,0.08));"></div>
				{/each}
			</div>

			<nav class="bottom-nav glass">
				<button
					class="bottom-nav-item {activeNavTab === 'home' ? 'active' : ''}"
					onclick={() => activeNavTab = 'home'}
					aria-label="Home"
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
					</svg>
					Home
				</button>

				<button
					class="bottom-nav-item {activeNavTab === 'search' ? 'active' : ''}"
					onclick={() => activeNavTab = 'search'}
					aria-label="Search"
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
					Search
				</button>

				<button
					class="bottom-nav-item create-tab {activeNavTab === 'create' ? 'active' : ''}"
					onclick={() => activeNavTab = 'create'}
					aria-label="Create"
				>
					<span class="nav-create-icon">
						<svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
						</svg>
					</span>
					Create
				</button>

				<button
					class="bottom-nav-item {activeNavTab === 'inbox' ? 'active' : ''}"
					onclick={() => activeNavTab = 'inbox'}
					aria-label="Inbox"
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
					</svg>
					Inbox
				</button>

				<button
					class="bottom-nav-item {activeNavTab === 'profile' ? 'active' : ''}"
					onclick={() => activeNavTab = 'profile'}
					aria-label="Profile"
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
					</svg>
					Profile
				</button>
			</nav>
		</div>
	</div>

	<!-- 2. Floating Action Button -->
	<div class="ds-card">
		<h3 class="ds-card__title">Floating Action Button (FAB)</h3>
		<p class="ds-card__sub">Round FAB with expand animation revealing contextual mini action buttons with labels</p>
		<div class="float-demo">
			<span class="float-demo-label">Content Area</span>

			<div style="position: absolute; top: 48px; left: 24px; right: 24px; display: flex; flex-direction: column; gap: 10px; pointer-events: none;">
				{#each [75, 55, 65] as w}
					<div style="height: 9px; border-radius: 5px; width: {w}%; background: var(--dbd, rgba(0,0,0,0.08));"></div>
				{/each}
			</div>

			<div class="fab-container">
				{#if fabExpanded}
					<div class="fab-mini-actions">
						{#each [
							{ label: 'New Project', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', delay: 60 },
							{ label: 'New Task',    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', delay: 30 },
							{ label: 'Upload File', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', delay: 0 },
						] as action}
							<div class="fab-mini-item" style="animation-delay: {action.delay}ms;">
								<span class="fab-mini-label">{action.label}</span>
								<button class="fab-mini-btn" aria-label={action.label}>
									<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d={action.icon}/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}

				<button
					class="fab-main {fabExpanded ? 'open' : ''}"
					onclick={() => fabExpanded = !fabExpanded}
					aria-label={fabExpanded ? 'Collapse actions' : 'Expand actions'}
					aria-expanded={fabExpanded}
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- 3. Dock Bar -->
	<div class="ds-card">
		<h3 class="ds-card__title">Dock Bar</h3>
		<p class="ds-card__sub">macOS-style glass dock centered at bottom, scale-on-hover magnification effect</p>
		<div class="float-demo">
			<span class="float-demo-label">Desktop App</span>

			<div style="position: absolute; top: 48px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; gap: 10px; align-items: center; pointer-events: none; width: 200px;">
				{#each [70, 50, 60] as w}
					<div style="height: 9px; border-radius: 5px; width: {w}%; background: var(--dbd, rgba(0,0,0,0.08));"></div>
				{/each}
			</div>

			<div class="dock-wrapper">
				<div class="dock glass">
					{#each [
						{ label: 'Home',   icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true },
						{ label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', active: false },
						{ label: 'Tasks',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', active: false },
					] as item}
						<button class="dock-item {item.active ? 'active' : ''}" aria-label={item.label} title={item.label}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d={item.icon}/>
							</svg>
						</button>
					{/each}

					<div class="dock-divider" role="separator"></div>

					{#each [
						{ label: 'Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
						{ label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
					] as item}
						<button class="dock-item" aria-label={item.label} title={item.label}>
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d={item.icon}/>
							</svg>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- 4. Notification Badge Widget -->
	<div class="ds-card">
		<h3 class="ds-card__title">Notification Badge Widget</h3>
		<p class="ds-card__sub">Bell icon with live count badge — increment or clear with the demo controls</p>
		<div class="float-demo" style="height: 180px;">
			<span class="float-demo-label">App Corner</span>

			<div class="notif-widget">
				<button class="notif-bell-btn" aria-label="Notifications">
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
					</svg>
					{#if notifCount > 0}
						<span class="notif-badge" aria-label="{notifCount} notifications">
							{notifCount > 99 ? '99+' : notifCount}
						</span>
					{/if}
				</button>
				<div class="notif-demo-btns">
					<button class="notif-demo-btn" onclick={() => notifCount++} aria-label="Add notification">+1</button>
					<button class="notif-demo-btn" onclick={() => notifCount = 0} aria-label="Clear notifications">Clear</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 5. Floating Chat Bubble -->
	<div class="ds-card">
		<h3 class="ds-card__title">Floating Chat Bubble</h3>
		<p class="ds-card__sub">Support widget that expands into a mini chat window with message thread</p>
		<div class="float-demo">
			<span class="float-demo-label">Page Content</span>

			<div style="position: absolute; top: 48px; left: 24px; right: 100px; display: flex; flex-direction: column; gap: 10px; pointer-events: none;">
				{#each [80, 60, 70] as w}
					<div style="height: 9px; border-radius: 5px; width: {w}%; background: var(--dbd, rgba(0,0,0,0.08));"></div>
				{/each}
			</div>

			<div class="fchat-bubble-container">
				{#if chatExpanded}
					<div class="fchat-window">
						<div class="fchat-win-header">
							<div class="fchat-win-avatar" role="img" aria-label="Support avatar">M</div>
							<span class="fchat-win-name">MIOSA Support</span>
							<div class="fchat-win-online" title="Online"></div>
						</div>
						<div class="fchat-win-messages">
							<div class="fchat-msg them">Hey! How can I help you today?</div>
							<div class="fchat-msg me">Hi, I have a question.</div>
							<div class="fchat-msg them">Of course, go ahead!</div>
						</div>
						<div class="fchat-win-input">
							<input class="fchat-input-field" placeholder="Type a message..." aria-label="Chat message" />
							<button class="fchat-send-btn" aria-label="Send message">
								<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
								</svg>
							</button>
						</div>
					</div>
				{/if}

				<button
					class="fchat-bubble-btn"
					onclick={() => chatExpanded = !chatExpanded}
					aria-label={chatExpanded ? 'Close chat' : 'Open chat'}
					aria-expanded={chatExpanded}
				>
					{#if chatExpanded}
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					{:else}
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
						</svg>
						<span class="fchat-unread-dot" aria-hidden="true"></span>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- 6. Sticky Header -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sticky Header</h3>
		<p class="ds-card__sub">App bar in its scrolled "stuck" state — glassmorphism blur, elevated shadow, condensed layout</p>
		<div class="float-demo">
			<header class="sticky-header glass scrolled">
				<span class="sticky-header-logo">MIOSA</span>
				<nav class="sticky-header-nav">
					{#each [['Dashboard', true], ['Projects', false], ['Tasks', false], ['Docs', false]] as [label, active]}
						<button class="sticky-nav-item {active ? 'active' : ''}" aria-label={String(label)} aria-current={active ? 'page' : undefined}>
							{label}
						</button>
					{/each}
				</nav>
				<div class="sticky-header-actions">
					<button class="sticky-icon-btn" aria-label="Search">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
						</svg>
					</button>
					<button class="sticky-icon-btn" aria-label="Notifications, 1 unread">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
						</svg>
						<span style="position: absolute; top: 7px; right: 7px; width: 6px; height: 6px; border-radius: 50%; background: #ef4444;" aria-hidden="true"></span>
					</button>
					<div class="sticky-avatar" role="img" aria-label="User avatar: MK">MK</div>
				</div>
			</header>

			<div class="sticky-scroll-hint">
				<span class="sticky-hint-text">Page content below header</span>
				<div class="sticky-hint-lines">
					{#each [100, 80, 90, 65] as w}
						<div class="sticky-hint-line" style="width: {w}%;" aria-hidden="true"></div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- 7. Speed Dial -->
	<div class="ds-card">
		<h3 class="ds-card__title">Speed Dial</h3>
		<p class="ds-card__sub">FAB that fans upward to reveal stagger-animated labeled action items</p>
		<div class="float-demo">
			<span class="float-demo-label">Content Area</span>

			<div style="position: absolute; top: 48px; left: 24px; right: 90px; display: flex; flex-direction: column; gap: 10px; pointer-events: none;">
				{#each [75, 55, 65, 45] as w}
					<div style="height: 9px; border-radius: 5px; width: {w}%; background: var(--dbd, rgba(0,0,0,0.08));"></div>
				{/each}
			</div>

			<div class="speed-dial-container">
				{#if speedDialOpen}
					<div class="speed-dial-items">
						{#each [
							{ label: 'Share',     icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', delay: 60 },
							{ label: 'Duplicate', icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z', delay: 30 },
							{ label: 'Archive',   icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', delay: 10 },
							{ label: 'Delete',    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', delay: 0 },
						] as action}
							<div class="speed-dial-item" style="animation-delay: {action.delay}ms;">
								<span class="speed-dial-label">{action.label}</span>
								<button class="speed-dial-btn" aria-label={action.label}>
									<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d={action.icon}/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}

				<button
					class="speed-dial-trigger {speedDialOpen ? 'open' : ''}"
					onclick={() => speedDialOpen = !speedDialOpen}
					aria-label={speedDialOpen ? 'Close speed dial' : 'Open speed dial'}
					aria-expanded={speedDialOpen}
				>
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</section>
