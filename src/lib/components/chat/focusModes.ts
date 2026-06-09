export interface FocusModeChoice {
	label: string;
	value: string;
	tooltip?: string;
}

export interface FocusModeOption {
	id: string;
	label: string;
	type: 'segment' | 'toggle';
	defaultValue: string;
	choices?: FocusModeChoice[];
}

export interface FocusMode {
	id: string;
	name: string;
	icon: string;
	options: FocusModeOption[];
}

export const FOCUS_MODES: FocusMode[] = [
	{
		id: 'research',
		name: 'Research',
		icon: 'magnifying-glass-chart',
		options: [
			{
				id: 'depth',
				label: 'Depth',
				type: 'segment',
				defaultValue: 'balanced',
				choices: [
					{ label: 'Fast', value: 'fast' },
					{ label: 'Balanced', value: 'balanced' },
					{ label: 'Deep', value: 'deep' }
				]
			},
			{ id: 'sources', label: 'Include sources', type: 'toggle', defaultValue: 'on' }
		]
	},
	{
		id: 'analyze',
		name: 'Analyze',
		icon: 'chart-bar',
		options: [
			{
				id: 'format',
				label: 'Format',
				type: 'segment',
				defaultValue: 'summary',
				choices: [
					{ label: 'Summary', value: 'summary' },
					{ label: 'Table', value: 'table' },
					{ label: 'Risks', value: 'risks' }
				]
			}
		]
	},
	{
		id: 'draft',
		name: 'Draft',
		icon: 'document-text',
		options: [
			{
				id: 'tone',
				label: 'Tone',
				type: 'segment',
				defaultValue: 'direct',
				choices: [
					{ label: 'Direct', value: 'direct' },
					{ label: 'Polished', value: 'polished' },
					{ label: 'Technical', value: 'technical' }
				]
			}
		]
	},
	{
		id: 'build',
		name: 'Build',
		icon: 'cube',
		options: [
			{ id: 'includePlan', label: 'Include plan', type: 'toggle', defaultValue: 'on' }
		]
	}
];

export function getDefaultOptions(mode: FocusMode): Record<string, string> {
	return Object.fromEntries(mode.options.map((option) => [option.id, option.defaultValue]));
}
