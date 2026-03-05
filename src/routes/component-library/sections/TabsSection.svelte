<script lang="ts">
	import { Separator } from '$lib/ui';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/ui/tabs';
</script>

<section class="ds-section">
	<h2 class="ds-title">Tabs</h2>
	<p class="ds-desc">Segmented view switching with Bits UI primitives. Pill-styled triggers with smooth transitions.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Standard Tabs</h3>
		<p class="ds-card__sub">Default tab navigation with content panels</p>
		<Tabs value="overview">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<div style="padding: 20px 0; font-size: 14px; display: flex; flex-direction: column; gap: 12px;">
					<div style="display: flex; gap: 12px;">
						<div style="flex: 1; padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px;">
							<div style="font-size: 24px; font-weight: 700;">2,847</div>
							<div style="font-size: 12px; color: #999;">Active Users</div>
						</div>
						<div style="flex: 1; padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px;">
							<div style="font-size: 24px; font-weight: 700;">94.2%</div>
							<div style="font-size: 12px; color: #999;">Uptime</div>
						</div>
						<div style="flex: 1; padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px;">
							<div style="font-size: 24px; font-weight: 700;">1.2s</div>
							<div style="font-size: 12px; color: #999;">Avg Response</div>
						</div>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="activity">
				<div style="padding: 20px 0; font-size: 14px; display: flex; flex-direction: column; gap: 8px;">
					{#each [['Deploy v2.4.1', '2 minutes ago'],['Database migration', '15 minutes ago'],['Config update', '1 hour ago']] as [action, time]}
						<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(0,0,0,0.02); border-radius: 8px;">
							<span style="font-size: 13px; font-weight: 500;">{action}</span>
							<span style="font-size: 12px; color: #999;">{time}</span>
						</div>
					{/each}
				</div>
			</TabsContent>
			<TabsContent value="settings">
				<div style="padding: 20px 0; font-size: 14px; display: flex; flex-direction: column; gap: 12px;">
					<div style="display: flex; justify-content: space-between; align-items: center;">
						<span style="font-size: 13px;">Email notifications</span>
						<button class="btn-pill btn-pill-outline btn-pill-xs">Enabled</button>
					</div>
					<Separator />
					<div style="display: flex; justify-content: space-between; align-items: center;">
						<span style="font-size: 13px;">Two-factor auth</span>
						<button class="btn-pill btn-pill-primary btn-pill-xs">Configure</button>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Pill Button Group as Tabs</h3>
		<p class="ds-card__sub">Using <code>.btn-pill-group</code> for segmented tab controls</p>
		<div class="btn-pill-group" style="margin-bottom: 16px;">
			<button class="btn-pill btn-pill-primary btn-pill-sm">All</button>
			<button class="btn-pill btn-pill-ghost btn-pill-sm">Active</button>
			<button class="btn-pill btn-pill-ghost btn-pill-sm">Archived</button>
		</div>
		<div style="padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px; font-size: 13px; color: #666;">
			Showing <strong>all items</strong> — 42 results
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Tabs with Icons</h3>
		<Tabs value="code">
			<TabsList>
				<TabsTrigger value="code">
					<span style="display: flex; align-items: center; gap: 6px;">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
						Code
					</span>
				</TabsTrigger>
				<TabsTrigger value="preview">
					<span style="display: flex; align-items: center; gap: 6px;">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
						Preview
					</span>
				</TabsTrigger>
				<TabsTrigger value="diff">
					<span style="display: flex; align-items: center; gap: 6px;">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
						Changes
					</span>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="code"><div style="padding: 16px 0; font-size: 13px; font-family: monospace; color: #666;">const app = createApp();</div></TabsContent>
			<TabsContent value="preview"><div style="padding: 16px 0; font-size: 14px; color: #666;">Live preview of the component</div></TabsContent>
			<TabsContent value="diff"><div style="padding: 16px 0; font-size: 13px;"><span style="color: #22c55e;">+ 3 additions</span> &nbsp; <span style="color: #ef4444;">- 1 deletion</span></div></TabsContent>
		</Tabs>
	</div>
</section>
