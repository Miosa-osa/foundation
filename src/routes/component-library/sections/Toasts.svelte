<script lang="ts">
	// Toast position demo state
	let activePosition = $state<'top-right' | 'top-left' | 'bottom-right' | 'bottom-center'>('top-right');

	const positions = [
		{ id: 'top-right' as const, label: 'Top Right' },
		{ id: 'top-left' as const, label: 'Top Left' },
		{ id: 'bottom-right' as const, label: 'Bottom Right' },
		{ id: 'bottom-center' as const, label: 'Bottom Center' },
	];

	const positionStyles: Record<string, string> = {
		'top-right': 'top: 12px; right: 12px;',
		'top-left': 'top: 12px; left: 12px;',
		'bottom-right': 'bottom: 12px; right: 12px;',
		'bottom-center': 'bottom: 12px; left: 50%; transform: translateX(-50%);',
	};

	// Base toast style shared across demos
	const toastBase =
		'display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); min-width: 300px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);';
</script>

<section class="ds-section">
	<h2 class="ds-title">Toasts</h2>
	<p class="ds-desc">
		Notification toast patterns — dark glassmorphism style, semantic types, positions, actions,
		and progress indicators. All mockups; no live toast system required.
	</p>

	<!-- Toast Types -->
	<div class="ds-card">
		<h3 class="ds-card__title">Toast Types</h3>
		<p class="ds-card__sub">Semantic feedback — success, error, warning, and info variants</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 380px;">

			<!-- Success -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#22c55e" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">Changes saved</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">Your changes have been saved successfully.</div>
				</div>
				<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0; line-height: 1; font-size: 18px;" aria-label="Dismiss">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Error -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#ef4444" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">Upload failed</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">File exceeds the 10 MB size limit.</div>
				</div>
				<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Warning -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#eab308" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">Session expiring soon</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">You'll be signed out in 5 minutes.</div>
				</div>
				<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Info -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">New release available</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">v2.4.0 includes performance improvements.</div>
				</div>
				<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

		</div>
	</div>

	<!-- Toast with Action -->
	<div class="ds-card">
		<h3 class="ds-card__title">Toast with Action</h3>
		<p class="ds-card__sub">Inline action buttons — "Undo", "Retry", "View" patterns</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 380px;">

			<!-- Undo action -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#888" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">Task deleted</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">"API redesign" has been removed.</div>
				</div>
				<button style="padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: #ccc; font-size: 12px; font-weight: 500; cursor: pointer; white-space: nowrap; flex-shrink: 0;">
					Undo
				</button>
			</div>

			<!-- View action -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#22c55e" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">Deployment complete</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">v2.4.0 is live on production.</div>
				</div>
				<button style="padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: #ccc; font-size: 12px; font-weight: 500; cursor: pointer; white-space: nowrap; flex-shrink: 0;">
					View
				</button>
			</div>

			<!-- Retry action -->
			<div style="{toastBase}">
				<svg width="18" height="18" fill="none" stroke="#ef4444" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<div style="flex: 1;">
					<div style="font-size: 13px; font-weight: 600; color: #fff;">Connection lost</div>
					<div style="font-size: 12px; color: #888; margin-top: 2px;">Unable to reach the server.</div>
				</div>
				<button style="padding: 5px 12px; border-radius: 6px; border: none; background: #ef4444; color: #fff; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; flex-shrink: 0;">
					Retry
				</button>
			</div>

		</div>
	</div>

	<!-- Toast with Progress Bar -->
	<div class="ds-card">
		<h3 class="ds-card__title">Toast with Timeout Progress</h3>
		<p class="ds-card__sub">A thin progress bar at the bottom shows auto-dismiss countdown</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 380px;">

			<!-- Success with progress -->
			<div style="border-radius: 10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); overflow: hidden;">
				<div style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;">
					<svg width="18" height="18" fill="none" stroke="#22c55e" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
					</svg>
					<div style="flex: 1;">
						<div style="font-size: 13px; font-weight: 600; color: #fff;">Profile updated</div>
						<div style="font-size: 12px; color: #888; margin-top: 2px;">Closing in 4 seconds…</div>
					</div>
					<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				</div>
				<!-- Progress bar at 75% (= 1.5s elapsed of 4s) -->
				<div style="height: 3px; background: rgba(255,255,255,0.06);">
					<div style="height: 100%; width: 75%; background: #22c55e; border-radius: 0 2px 2px 0;"></div>
				</div>
			</div>

			<!-- Info with progress -->
			<div style="border-radius: 10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); overflow: hidden;">
				<div style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;">
					<svg width="18" height="18" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<div style="flex: 1;">
						<div style="font-size: 13px; font-weight: 600; color: #fff;">Syncing data</div>
						<div style="font-size: 12px; color: #888; margin-top: 2px;">Closing in 2 seconds…</div>
					</div>
					<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				</div>
				<!-- Progress bar at 40% -->
				<div style="height: 3px; background: rgba(255,255,255,0.06);">
					<div style="height: 100%; width: 40%; background: #3b82f6; border-radius: 0 2px 2px 0;"></div>
				</div>
			</div>

		</div>
	</div>

	<!-- Toast Positions -->
	<div class="ds-card">
		<h3 class="ds-card__title">Toast Positions</h3>
		<p class="ds-card__sub">Select a corner to preview where the toast container anchors</p>

		<!-- Position picker -->
		<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
			{#each positions as pos}
				<button
					onclick={() => activePosition = pos.id}
					style="padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid {activePosition === pos.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}; background: {activePosition === pos.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)'}; color: {activePosition === pos.id ? '#fff' : '#888'}; transition: all 0.15s;"
				>
					{pos.label}
				</button>
			{/each}
		</div>

		<!-- Viewport mockup -->
		<div style="position: relative; width: 100%; max-width: 480px; height: 200px; border-radius: 12px; background: rgba(10,10,10,0.6); border: 1px solid rgba(255,255,255,0.06); overflow: hidden;">
			<!-- Browser chrome hint -->
			<div style="height: 28px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 6px; padding: 0 10px;">
				<span style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.08);"></span>
				<span style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.08);"></span>
				<span style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.08);"></span>
				<span style="font-size: 10px; color: #444; margin-left: 6px;">your-app.com</span>
			</div>
			<!-- Positioned toast -->
			<div style="position: absolute; {positionStyles[activePosition]}">
				<div style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 8px; background: rgba(20,20,20,0.98); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); box-shadow: 0 8px 24px rgba(0,0,0,0.5); min-width: 220px;">
					<svg width="14" height="14" fill="none" stroke="#22c55e" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
					</svg>
					<div style="flex: 1;">
						<div style="font-size: 11px; font-weight: 600; color: #fff;">Saved!</div>
						<div style="font-size: 10px; color: #666; margin-top: 1px;">Changes persisted.</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Toast Stack -->
	<div class="ds-card">
		<h3 class="ds-card__title">Stacked Toasts</h3>
		<p class="ds-card__sub">Multiple notifications queued vertically in the same corner</p>
		<div style="position: relative; width: 100%; max-width: 380px; height: 200px; background: rgba(10,10,10,0.5); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
			<div style="position: absolute; top: 12px; right: 12px; display: flex; flex-direction: column; gap: 8px; width: 300px;">

				<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: 9px; background: rgba(20,20,20,0.97); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 6px 24px rgba(0,0,0,0.4);">
					<svg width="15" height="15" fill="none" stroke="#22c55e" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					<span style="font-size: 12px; font-weight: 600; color: #fff; flex: 1;">Changes saved</span>
					<svg width="12" height="12" fill="none" stroke="#555" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</div>

				<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: 9px; background: rgba(20,20,20,0.97); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 6px 24px rgba(0,0,0,0.4);">
					<svg width="15" height="15" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
					<span style="font-size: 12px; font-weight: 600; color: #fff; flex: 1;">Deploy queued</span>
					<svg width="12" height="12" fill="none" stroke="#555" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</div>

				<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: 9px; background: rgba(20,20,20,0.97); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 6px 24px rgba(0,0,0,0.4);">
					<svg width="15" height="15" fill="none" stroke="#eab308" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
					<span style="font-size: 12px; font-weight: 600; color: #fff; flex: 1;">Rate limit: 80%</span>
					<svg width="12" height="12" fill="none" stroke="#555" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</div>

			</div>
		</div>
	</div>

	<!-- Toast Anatomy -->
	<div class="ds-card">
		<h3 class="ds-card__title">Toast Anatomy</h3>
		<p class="ds-card__sub">Breakdown of the component structure and optional slots</p>
		<div style="display: flex; flex-direction: column; gap: 16px; max-width: 380px;">

			<!-- Minimal — icon + title only -->
			<div>
				<h4 class="ds-card__h4">Minimal</h4>
				<div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,0.4);">
					<svg width="16" height="16" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
					</svg>
					<span style="font-size: 13px; font-weight: 600; color: #fff; flex: 1;">Saved successfully</span>
					<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
						<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				</div>
			</div>

			<!-- Full — icon + title + description + action + progress -->
			<div>
				<h4 class="ds-card__h4">Full (all slots)</h4>
				<div style="border-radius: 10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); overflow: hidden;">
					<div style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px 12px;">
						<svg width="18" height="18" fill="none" stroke="#3b82f6" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
						<div style="flex: 1;">
							<div style="font-size: 13px; font-weight: 600; color: #fff;">New version ready</div>
							<div style="font-size: 12px; color: #888; margin-top: 3px; line-height: 1.5;">v2.5.0 is available with new AI features and bug fixes.</div>
							<div style="margin-top: 10px; display: flex; gap: 8px;">
								<button style="padding: 5px 12px; border-radius: 6px; border: none; background: #fff; color: #000; font-size: 12px; font-weight: 600; cursor: pointer;">
									Update now
								</button>
								<button style="padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #888; font-size: 12px; font-weight: 500; cursor: pointer;">
									Later
								</button>
							</div>
						</div>
						<button style="background: none; border: none; color: #555; cursor: pointer; padding: 0;" aria-label="Dismiss">
							<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
						</button>
					</div>
					<div style="height: 3px; background: rgba(255,255,255,0.06);">
						<div style="height: 100%; width: 60%; background: #3b82f6; border-radius: 0 2px 2px 0;"></div>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	/* No additional styles needed — all inline for portability */
</style>
