export interface CustomAgent {
	id: string;
	name: string;
	display_name: string;
	description?: string;
	system_prompt?: string;
	welcome_message?: string;
	suggested_prompts?: string[];
	category?: string;
	avatar?: string;
	temperature?: number;
	max_tokens?: number;
}
