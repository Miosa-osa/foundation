export type { CustomAgent } from './types';
import type { CustomAgent } from './types';

export async function getCustomAgents(): Promise<{ agents: CustomAgent[] }> {
	return { agents: [] };
}
