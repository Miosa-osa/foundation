<script lang="ts">
	import { currentUserRoleContext, currentWorkspace } from '$lib/stores/workspaces';

	interface Props {
		showLabel?: boolean;
		size?: 'sm' | 'md';
		showTooltip?: boolean;
	}

	let { showLabel = true, size = 'sm', showTooltip = true }: Props = $props();

	// Role configuration - dark glassmorphic theme
	const roleConfig: Record<string, { dotColor: string }> = {
		owner: { dotColor: '#a855f7' },
		admin: { dotColor: '#3b82f6' },
		editor: { dotColor: '#10b981' },
		member: { dotColor: '#eab308' },
		viewer: { dotColor: '#6b7280' },
		guest: { dotColor: '#9ca3af' }
	};

	// Derive current role configuration
	const currentRole = $derived($currentUserRoleContext?.role_name || 'guest');
	const config = $derived(roleConfig[currentRole] || roleConfig.guest);
	const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

	// Build tooltip text
	const tooltipText = $derived(() => {
		if (!$currentUserRoleContext) return 'No role context';

		const permissions = Object.entries($currentUserRoleContext.permissions || {})
			.flatMap(([resource, perms]) =>
				Object.entries(perms)
					.filter(([_, value]) => value === true)
					.map(([perm]) => `${resource}.${perm}`)
			);

		return `Role: ${$currentUserRoleContext.role_display_name}\nLevel: ${$currentUserRoleContext.hierarchy_level}\nPermissions: ${permissions.length}`;
	});

	// Show/hide tooltip
	let showTooltipPopup = $state(false);
</script>

{#if $currentUserRoleContext}
	{#if showLabel}
		<div class="relative inline-flex">
			<button
				onmouseenter={() => showTooltip && (showTooltipPopup = true)}
				onmouseleave={() => showTooltipPopup = false}
				onclick={() => showTooltipPopup = !showTooltipPopup}
				class="role-badge {sizeClasses}"
				style="--dot-color: {config.dotColor}"
			>
				<span class="role-dot"></span>
				<span class="role-name">{$currentUserRoleContext.role_display_name}</span>
				{#if $currentWorkspace}
					<span class="workspace-name">in {$currentWorkspace.name}</span>
				{/if}
			</button>

			{#if showTooltip && showTooltipPopup}
				<div
					class="absolute top-full left-0 mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg shadow-lg p-3 z-50 pointer-events-none"
				>
					<div class="font-semibold mb-2">{$currentUserRoleContext.role_display_name}</div>
					<div class="space-y-1 text-gray-300">
						<div>Hierarchy Level: {$currentUserRoleContext.hierarchy_level}</div>
						{#if $currentUserRoleContext.title}
							<div>Title: {$currentUserRoleContext.title}</div>
						{/if}
						{#if $currentUserRoleContext.department}
							<div>Department: {$currentUserRoleContext.department}</div>
						{/if}
					</div>

					<div class="mt-3 pt-3 border-t border-gray-700">
						<div class="font-semibold mb-2">Key Permissions</div>
						<div class="space-y-1 text-gray-300">
							{#each Object.entries($currentUserRoleContext.permissions || {}) as [resource, perms]}
								{#each Object.entries(perms) as [perm, value]}
									{#if value === true}
										<div class="flex items-center gap-1">
											<span class="w-1 h-1 rounded-full bg-green-400"></span>
											<span>{resource}.{perm}</span>
										</div>
									{/if}
								{/each}
							{/each}
						</div>
					</div>

					{#if $currentUserRoleContext.expertise_areas && $currentUserRoleContext.expertise_areas.length > 0}
						<div class="mt-3 pt-3 border-t border-gray-700">
							<div class="font-semibold mb-2">Expertise Areas</div>
							<div class="flex flex-wrap gap-1">
								{#each $currentUserRoleContext.expertise_areas as area}
									<span class="px-2 py-0.5 bg-gray-800 rounded text-[10px]">{area}</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		<span
			class="w-2.5 h-2.5 rounded-full"
			style="background-color: {config.dotColor}"
			title={tooltipText()}
		></span>
	{/if}
{/if}

<style>
	.role-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		background: rgba(28, 28, 30, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		backdrop-filter: blur(20px);
		cursor: pointer;
		transition: all 0.2s;
	}

	.role-badge:hover {
		background: rgba(28, 28, 30, 1);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.role-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--dot-color);
		flex-shrink: 0;
	}

	.role-name {
		font-weight: 500;
		font-size: 0.813rem;
		color: rgba(255, 255, 255, 0.9);
		white-space: nowrap;
	}

	.workspace-name {
		font-size: 0.688rem;
		color: rgba(255, 255, 255, 0.5);
		font-weight: 400;
		white-space: nowrap;
	}
</style>
