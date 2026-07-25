export interface ThinkingStep {
	type: string;
	content: string;
	duration?: number;
}

export interface ThinkingTrace {
	id?: string;
	thinking_content?: string;
	content?: string;
	steps?: ThinkingStep[];
	thinking_tokens?: number;
	model_used?: string;
	duration_ms?: number;
	metadata?: {
		tokenCount?: number;
		duration?: number;
		model?: string;
	};
}
