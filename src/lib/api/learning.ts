export type FeedbackType = 'thumbs_up' | 'thumbs_down' | 'correction' | 'rating';

export interface FeedbackInput {
	target_type: string;
	target_id: string;
	feedback_type: FeedbackType;
	conversation_id?: string;
	agent_type?: string;
	original_content?: string;
	feedback_value?: string;
}

export interface LearningItem {
	id: string;
	learning_type: string;
	learning_content: string;
	learning_summary?: string;
	confidence_score: number;
	times_applied: number;
}

export interface FeedbackHistoryItem extends FeedbackInput {
	id: string;
	created_at: string;
	was_processed?: boolean;
}
