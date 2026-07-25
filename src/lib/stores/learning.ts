import { writable } from 'svelte/store';
import type { FeedbackHistoryItem, FeedbackInput, LearningItem } from '$lib/api/learning';

interface LearningState {
	loading: boolean;
	learnings: LearningItem[];
	feedbackHistory: FeedbackHistoryItem[];
}

const store = writable<LearningState>({
	loading: false,
	learnings: [],
	feedbackHistory: []
});

export const learning = {
	subscribe: store.subscribe,
	async recordFeedback(input: FeedbackInput): Promise<void> {
		store.update((state) => ({
			...state,
			feedbackHistory: [
				{
					id: crypto.randomUUID(),
					created_at: new Date().toISOString(),
					was_processed: false,
					...input
				},
				...state.feedbackHistory
			]
		}));
	},
	async loadLearnings(_agentType?: string): Promise<void> {
		store.update((state) => ({ ...state, loading: false }));
	},
	async detectPatterns(): Promise<void> {
		return;
	}
};
