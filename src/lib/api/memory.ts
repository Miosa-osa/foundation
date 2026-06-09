export type MemoryType =
	| 'fact'
	| 'preference'
	| 'decision'
	| 'event'
	| 'learning'
	| 'context'
	| 'relationship';

export interface MemoryListItem {
	id: string;
	title: string;
	content: string;
	summary?: string;
	memory_type: MemoryType;
	importance_score: number;
	is_pinned: boolean;
	access_count: number;
	created_at: string;
	updated_at: string;
	last_accessed_at?: string | null;
	tags?: string[];
	metadata?: Record<string, unknown>;
}

export interface MemoryQuery {
	query?: string;
	memory_type?: MemoryType;
	project_id?: string;
	node_id?: string;
	is_pinned?: boolean;
	limit?: number;
}
