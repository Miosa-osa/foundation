<script lang="ts">
	import { Loading, Separator, Skeleton, ScrollArea } from '$lib/ui';
</script>

<section class="ds-section">
	<h2 class="ds-title">Feedback</h2>
	<p class="ds-desc">Loading states, content placeholders, separators, and scroll containers.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Spinner Sizes</h3>
		<p class="ds-card__sub">BOS <code>&lt;Loading /&gt;</code> component — xs through lg</p>
		<div class="ds-demo" style="gap: 32px;">
			{#each [{ size: 'xs' as const, px: '12px' }, { size: 'sm' as const, px: '16px' }, { size: 'default' as const, px: '20px' }, { size: 'lg' as const, px: '24px' }] as { size, px }}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
					<div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.02); border-radius: 12px;">
						<Loading {size} />
					</div>
					<div style="text-align: center;">
						<div style="font-size: 13px; font-weight: 600;">{size}</div>
						<div style="font-size: 11px; color: #999;">{px}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Spinner in Buttons</h3>
		<p class="ds-card__sub">Loading state integrated with pill buttons</p>
		<div class="ds-demo" style="gap: 12px;">
			<button class="btn-pill btn-pill-primary btn-pill-loading" disabled>
				<span class="btn-pill-spinner"></span>
				Saving...
			</button>
			<button class="btn-pill btn-pill-secondary btn-pill-loading" disabled>
				<span class="btn-pill-spinner"></span>
				Loading
			</button>
			<button class="btn-pill btn-pill-outline btn-pill-loading btn-pill-sm" disabled>
				<span class="btn-pill-spinner"></span>
				Processing
			</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Skeleton Patterns</h3>
		<p class="ds-card__sub">Content placeholders for loading states</p>
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
			<div>
				<h4 class="ds-card__h4">Text Block</h4>
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<Skeleton class="h-4 w-3/4" />
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-1/2" />
				</div>
			</div>
			<div>
				<h4 class="ds-card__h4">Card Skeleton</h4>
				<div style="display: flex; flex-direction: column; gap: 10px;">
					<Skeleton class="h-32 w-full rounded-xl" />
					<Skeleton class="h-4 w-2/3" />
					<Skeleton class="h-3 w-1/2" />
				</div>
			</div>
			<div>
				<h4 class="ds-card__h4">Avatar + Text</h4>
				<div style="display: flex; gap: 12px; align-items: center;">
					<Skeleton class="h-10 w-10 rounded-full" />
					<div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
						<Skeleton class="h-4 w-full" />
						<Skeleton class="h-3 w-2/3" />
					</div>
				</div>
			</div>
			<div>
				<h4 class="ds-card__h4">List Items</h4>
				<div style="display: flex; flex-direction: column; gap: 8px;">
					{#each Array(3) as _}
						<div style="display: flex; gap: 10px; align-items: center;">
							<Skeleton class="h-8 w-8 rounded-lg" />
							<Skeleton class="h-4 flex-1" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Separator</h3>
		<p class="ds-card__sub">Horizontal divider between content sections</p>
		<div style="max-width: 400px; display: flex; flex-direction: column; gap: 0;">
			<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
				<div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
					<svg class="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
				</div>
				<div>
					<div style="font-size: 14px; font-weight: 600;">Quick Setup</div>
					<div style="font-size: 12px; color: #999;">Get started in seconds</div>
				</div>
			</div>
			<Separator />
			<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
				<div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center;">
					<svg class="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
				</div>
				<div>
					<div style="font-size: 14px; font-weight: 600;">Security</div>
					<div style="font-size: 12px; color: #999;">Enterprise-grade protection</div>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Scroll Area</h3>
		<p class="ds-card__sub">Bits UI scroll container with custom scrollbars</p>
		<div style="display: flex; gap: 24px;">
			<div>
				<h4 class="ds-card__h4">Vertical</h4>
				<ScrollArea class="h-48 w-72 rounded-lg border border-gray-200">
					<div style="padding: 12px 16px;">
						{#each Array(20) as _, i}
							<div style="display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.03);">
								<div style="width: 28px; height: 28px; border-radius: 8px; background: hsl({i * 18}, 60%, 93%); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: hsl({i * 18}, 50%, 40%);">{i + 1}</div>
								<span style="font-size: 13px;">Item {i + 1}</span>
							</div>
						{/each}
					</div>
				</ScrollArea>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Toast / Alert Patterns</h3>
		<p class="ds-card__sub">Feedback notifications using pill button styling</p>
		<div style="display: flex; flex-direction: column; gap: 10px; max-width: 420px;">
			<div style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px;">
				<svg class="w-4 h-4" fill="none" stroke="#16a34a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
				<span style="font-size: 13px; font-weight: 500; color: #15803d; flex: 1;">Changes saved successfully</span>
				<button class="btn-pill btn-pill-ghost btn-pill-xs" style="color: #16a34a;">Dismiss</button>
			</div>
			<div style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px;">
				<svg class="w-4 h-4" fill="none" stroke="#dc2626" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
				<span style="font-size: 13px; font-weight: 500; color: #991b1b; flex: 1;">Failed to save changes</span>
				<button class="btn-pill btn-pill-ghost btn-pill-xs" style="color: #dc2626;">Retry</button>
			</div>
			<div style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px;">
				<svg class="w-4 h-4" fill="none" stroke="#d97706" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
				<span style="font-size: 13px; font-weight: 500; color: #92400e; flex: 1;">API rate limit approaching</span>
				<button class="btn-pill btn-pill-ghost btn-pill-xs" style="color: #d97706;">Details</button>
			</div>
			<div style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px;">
				<svg class="w-4 h-4" fill="none" stroke="#2563eb" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				<span style="font-size: 13px; font-weight: 500; color: #1e40af; flex: 1;">New version available</span>
				<button class="btn-pill btn-pill-primary btn-pill-xs">Update</button>
			</div>
		</div>
	</div>
</section>
