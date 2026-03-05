<section class="ds-section">
	<h2 class="ds-title">Cards</h2>
	<p class="ds-desc">Content containers with standard, elevated, glass, and artifact styles.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Standard Cards</h3>
		<p class="ds-card__sub">Clean white containers with subtle borders</p>
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 600px;">
			<div class="ds-showcase-card">
				<h4 style="margin: 0 0 6px; font-weight: 600; font-size: 15px;">Project Alpha</h4>
				<p style="margin: 0 0 12px; font-size: 13px; color: #888;">Modernize the core platform architecture.</p>
				<div style="display: flex; gap: 6px;">
					<span class="badge badge-active">Active</span>
					<span class="ds-mono-tag">Backend</span>
				</div>
			</div>
			<div class="ds-showcase-card">
				<h4 style="margin: 0 0 6px; font-weight: 600; font-size: 15px;">Design System</h4>
				<p style="margin: 0 0 12px; font-size: 13px; color: #888;">Component library and documentation.</p>
				<div style="display: flex; gap: 6px; justify-content: space-between; align-items: center;">
					<div style="display: flex; gap: 6px;">
						<span class="badge badge-active">Active</span>
						<span class="ds-mono-tag">Frontend</span>
					</div>
					<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-sm">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Elevated Cards</h3>
		<p class="ds-card__sub">Progressive shadow depth for visual hierarchy</p>
		<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; max-width: 700px;">
			<div class="ds-showcase-card ds-showcase-card--elevated-1">
				<div style="font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">2,847</div>
				<div style="font-size: 12px; color: #999; margin-top: 2px;">Active Users</div>
			</div>
			<div class="ds-showcase-card ds-showcase-card--elevated-2">
				<div style="font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">94.2%</div>
				<div style="font-size: 12px; color: #999; margin-top: 2px;">Uptime</div>
			</div>
			<div class="ds-showcase-card ds-showcase-card--elevated-3">
				<div style="font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">$45K</div>
				<div style="font-size: 12px; color: #999; margin-top: 2px;">Revenue</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Glass Cards</h3>
		<p class="ds-card__sub">Glassmorphism on gradient backgrounds — <code>.glass-card</code></p>
		<div style="display: flex; gap: 16px; padding: 32px; border-radius: 16px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
			<div class="glass-card" style="padding: 20px; flex: 1; color: #fff;">
				<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
					<div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center;">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
					</div>
					<span style="font-weight: 600; font-size: 14px;">Analytics</span>
				</div>
				<div style="font-size: 28px; font-weight: 700;">12.4K</div>
				<div style="font-size: 12px; opacity: 0.6; margin-top: 2px;">Daily active users</div>
			</div>
			<div class="glass-card" style="padding: 20px; flex: 1; color: #fff;">
				<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
					<div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center;">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
					</div>
					<span style="font-weight: 600; font-size: 14px;">Growth</span>
				</div>
				<div style="font-size: 28px; font-weight: 700;">+23%</div>
				<div style="font-size: 12px; opacity: 0.6; margin-top: 2px;">Month over month</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Artifact Card</h3>
		<p class="ds-card__sub">Used for AI-generated content like documents, code, and diagrams</p>
		<div style="max-width: 480px;">
			<div class="ds-artifact-card">
				<div class="ds-artifact-card__header">
					<div style="display: flex; align-items: center; gap: 8px;">
						<svg class="w-4 h-4" style="color: #666;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
						<span style="font-size: 13px; font-weight: 600;">project-spec.md</span>
					</div>
					<div style="display: flex; gap: 4px;">
						<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-xs">
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
						</button>
						<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-xs">
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
						</button>
					</div>
				</div>
				<div class="ds-artifact-card__body">
					<div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Project Specification</div>
					<p style="font-size: 13px; color: #666; margin: 0 0 12px; line-height: 1.6;">This document outlines the technical requirements and architecture for the MIOSA platform rebuild.</p>
					<div style="display: flex; gap: 6px;">
						<span class="ds-mono-tag">Markdown</span>
						<span class="ds-mono-tag">2.4K words</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Panel Card</h3>
		<p class="ds-card__sub">Sidebar-style panel with header and scrollable content</p>
		<div style="display: flex; gap: 16px; max-width: 640px;">
			<div class="ds-panel-card" style="flex: 1;">
				<div class="ds-panel-card__header">
					<span style="font-size: 13px; font-weight: 600;">Context</span>
					<button class="btn-pill btn-pill-icon btn-pill-ghost btn-pill-xs">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
					</button>
				</div>
				<div class="ds-panel-card__body">
					{#each ['Project requirements', 'API documentation', 'Design system guide', 'User research notes'] as item}
						<div class="ds-panel-card__item">
							<svg class="w-3.5 h-3.5" style="color: #999; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
							<span style="font-size: 13px;">{item}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="ds-panel-card" style="flex: 1;">
				<div class="ds-panel-card__header">
					<span style="font-size: 13px; font-weight: 600;">History</span>
					<span style="font-size: 11px; color: #999;">4 items</span>
				</div>
				<div class="ds-panel-card__body">
					{#each [['Chat: API design review', '2m ago'], ['Doc: auth spec v2', '15m ago'], ['Code: login.ts', '1h ago'], ['Chat: onboarding flow', '3h ago']] as [title, time]}
						<div class="ds-panel-card__item" style="justify-content: space-between;">
							<span style="font-size: 13px;">{title}</span>
							<span style="font-size: 11px; color: #bbb; flex-shrink: 0;">{time}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
