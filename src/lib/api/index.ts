export type { MemoryListItem, MemoryQuery, MemoryType } from './memory';
import type { MemoryListItem, MemoryQuery } from './memory';

const emptyMemories: MemoryListItem[] = [];

export const api = {
	async getMemories(_query: MemoryQuery = {}): Promise<MemoryListItem[]> {
		return emptyMemories;
	},
	async searchMemories(_query: MemoryQuery = {}): Promise<MemoryListItem[]> {
		return emptyMemories;
	},
	async pinMemory(_id: string, _isPinned: boolean): Promise<void> {
		return;
	},
	async deleteMemory(_id: string): Promise<void> {
		return;
	}
};
