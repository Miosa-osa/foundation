<section class="ds-section">
	<h2 class="ds-title">Empty States</h2>
	<p class="ds-desc">Patterns for zero-data, search misses, onboarding, and first-run welcome — each centered, icon-led, and actionable.</p>

	<!-- No Data -->
	<div class="ds-card">
		<h3 class="ds-card__title">No Data</h3>
		<p class="ds-card__sub">Default empty collection — prompt the user to create their first item</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="width: 56px; height: 56px; border-radius: 16px; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--dt3);" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
					</svg>
				</div>
				<h4 style="font-size: 16px; font-weight: 600; color: var(--dt); margin: 0 0 8px; letter-spacing: -0.01em;">No items yet</h4>
				<p style="font-size: 13px; color: var(--dt2); margin: 0 0 24px; max-width: 260px; line-height: 1.6;">Create your first item to get started with your project.</p>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Create Item</button>
			</div>
		</div>
	</div>

	<!-- No Search Results -->
	<div class="ds-card">
		<h3 class="ds-card__title">No Search Results</h3>
		<p class="ds-card__sub">Query returned zero matches — guide the user to adjust their criteria</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="width: 56px; height: 56px; border-radius: 16px; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--dt3);" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"/>
						<path d="m21 21-4.35-4.35"/>
						<path d="M8 11h6M11 8v6" stroke-dasharray="2 2"/>
					</svg>
				</div>
				<h4 style="font-size: 16px; font-weight: 600; color: var(--dt); margin: 0 0 8px; letter-spacing: -0.01em;">No results found</h4>
				<p style="font-size: 13px; color: var(--dt2); margin: 0 0 8px; max-width: 280px; line-height: 1.6;">Try adjusting your search or filters to find what you're looking for.</p>
				<p style="font-size: 12px; color: var(--dt); margin: 0 0 24px;">Searching for <span style="color: var(--dt3); font-style: italic;">"design system"</span></p>
				<div style="display: flex; gap: 8px;">
					<button class="btn-pill btn-pill-secondary btn-pill-sm">Clear Filters</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm">Browse All</button>
				</div>
			</div>
		</div>
	</div>

	<!-- No Messages -->
	<div class="ds-card">
		<h3 class="ds-card__title">No Messages</h3>
		<p class="ds-card__sub">Empty conversation or inbox state — invite the first message</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="position: relative; margin-bottom: 20px;">
					<div style="width: 56px; height: 56px; border-radius: 16px; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center;">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--dt3);" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
						</svg>
					</div>
					<div style="position: absolute; top: -4px; right: -4px; width: 16px; height: 16px; border-radius: 50%; background: var(--dbg3); border: 2px solid var(--dbd2); display: flex; align-items: center; justify-content: center;">
						<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--dt2);" stroke-linecap="round">
							<path d="M5 12h14"/>
						</svg>
					</div>
				</div>
				<h4 style="font-size: 16px; font-weight: 600; color: var(--dt); margin: 0 0 8px; letter-spacing: -0.01em;">No messages</h4>
				<p style="font-size: 13px; color: var(--dt2); margin: 0 0 24px; max-width: 240px; line-height: 1.6;">Start a conversation to collaborate with your team.</p>
				<button class="btn-pill btn-pill-primary btn-pill-sm">New Message</button>
			</div>
		</div>
	</div>

	<!-- Onboarding -->
	<div class="ds-card">
		<h3 class="ds-card__title">Onboarding</h3>
		<p class="ds-card__sub">First-run welcome with numbered getting-started steps</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="width: 56px; height: 56px; border-radius: 16px; background: var(--dbg3); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--dt3);" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
					</svg>
				</div>
				<h4 style="font-size: 18px; font-weight: 700; color: var(--dt); margin: 0 0 8px; letter-spacing: -0.02em;">Welcome to MIOSA</h4>
				<p style="font-size: 13px; color: var(--dt2); margin: 0 0 28px; max-width: 300px; line-height: 1.6;">Your AI-powered workspace is ready. Follow these steps to get started.</p>
				<div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 320px; text-align: left; margin-bottom: 28px;">
					{#each [
						['Connect your first integration', 'Link your tools — GitHub, Slack, or Notion'],
						['Create your first project', 'Organize work into focused workspaces'],
						['Invite your team', 'Collaborate in real-time with teammates'],
					] as [title, desc], i}
						<div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px 14px; background: var(--dbg); border: 1px solid var(--dbd); border-radius: 10px;">
							<div style="width: 22px; height: 22px; border-radius: 50%; background: var(--dbg2); border: 1px solid var(--dbd); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;">
								<span style="font-size: 11px; font-weight: 700; color: var(--dt4);">{i + 1}</span>
							</div>
							<div>
								<div style="font-size: 13px; font-weight: 600; color: var(--dt4); margin-bottom: 2px;">{title}</div>
								<div style="font-size: 12px; color: var(--dt3); line-height: 1.4;">{desc}</div>
							</div>
						</div>
					{/each}
				</div>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Get Started</button>
			</div>
		</div>
	</div>

</section>
