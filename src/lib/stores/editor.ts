export type BlockType =
	| 'heading1'
	| 'heading2'
	| 'heading3'
	| 'bulletList'
	| 'numberedList'
	| 'todo'
	| 'quote'
	| 'code'
	| 'divider'
	| 'callout'
	| 'paragraph';

export interface EditorBlock {
	id: string;
	type: BlockType;
	content: string;
	properties?: Record<string, unknown>;
}
