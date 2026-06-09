export type SearchStrategy = 'semantic' | 'keyword' | 'hybrid' | 'agentic';

export interface HybridSearchResult {
	context_id: string;
	context_name: string;
	context_type: string;
	block_id: string;
	block_type: string;
	content: string;
	search_strategy: SearchStrategy;
	hybrid_score: number;
	semantic_score: number;
	keyword_score: number;
	created_at?: string;
}

export interface HybridSearchRequest {
	query: string;
	semantic_weight?: number;
	keyword_weight?: number;
	max_results?: number;
	min_similarity?: number;
	project_id?: string;
	workspace_id?: string;
}

export interface AgenticRAGRequest {
	query: string;
	max_results?: number;
	min_quality_score?: number;
	project_id?: string;
	use_personalization?: boolean;
	workspace_id?: string;
}

export interface AgenticRAGResult {
	results: HybridSearchResult[];
	query_intent: string;
	strategy_used: SearchStrategy;
	strategy_reasoning: string;
	quality_score: number;
	processing_time_ms: number;
}

export async function hybridSearch(
	_request: HybridSearchRequest
): Promise<{ results: HybridSearchResult[] }> {
	return { results: [] };
}

export async function agenticRAG(_request: AgenticRAGRequest): Promise<AgenticRAGResult> {
	return {
		results: [],
		query_intent: 'demo',
		strategy_used: 'hybrid',
		strategy_reasoning: 'Foundation demo adapter returned empty results.',
		quality_score: 0,
		processing_time_ms: 0
	};
}
