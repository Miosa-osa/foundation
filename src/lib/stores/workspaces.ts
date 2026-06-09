import { writable } from 'svelte/store';

export type PermissionMap = Record<string, Record<string, boolean>>;

export interface RoleContext {
	role_name: string;
	role_display_name: string;
	hierarchy_level: number;
	permissions: PermissionMap;
	title?: string;
	department?: string;
	expertise_areas?: string[];
}

export interface WorkspaceSummary {
	id: string;
	name: string;
}

export const currentUserRoleContext = writable<RoleContext | null>({
	role_name: 'admin',
	role_display_name: 'Admin',
	hierarchy_level: 1,
	permissions: {
		components: {
			view: true,
			create: true,
			edit: true
		}
	}
});

export const currentWorkspace = writable<WorkspaceSummary | null>({
	id: 'foundation',
	name: 'MIOSA Foundation'
});
