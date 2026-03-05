<script lang="ts">
	import '../../app.css';
	import '$lib/modules/theme/styles/bos-variables.css';
	import '$lib/modules/theme/styles/variables.css';
	import './styles.css';

	// Section components
	import Overview from './sections/Overview.svelte';
	import Colors from './sections/Colors.svelte';
	import Typography from './sections/Typography.svelte';
	import Icons from './sections/Icons.svelte';
	import Spacing from './sections/Spacing.svelte';
	import Shadows from './sections/Shadows.svelte';
	import Buttons from './sections/Buttons.svelte';
	import Inputs from './sections/Inputs.svelte';
	import Badges from './sections/Badges.svelte';
	import Cards from './sections/Cards.svelte';
	import Navigation from './sections/Navigation.svelte';
	import TabsSection from './sections/TabsSection.svelte';
	import Menus from './sections/Menus.svelte';
	import Dialogs from './sections/Dialogs.svelte';
	import Tooltips from './sections/Tooltips.svelte';
	import Feedback from './sections/Feedback.svelte';
	import Messages from './sections/Messages.svelte';
	import DataDisplay from './sections/DataDisplay.svelte';
	import AiChat from './sections/AiChat.svelte';
	import AiElements from './sections/AiElements.svelte';
	import Animations from './sections/Animations.svelte';
	import Modules from './sections/Modules.svelte';

	let activeSection = $state('overview');
	let isDark = $state(false);

	const sectionGroups = [
		{ label: 'Getting Started', items: [
			{ id: 'overview', label: 'Overview' },
		]},
		{ label: 'Foundation', items: [
			{ id: 'colors', label: 'Colors' },
			{ id: 'typography', label: 'Typography' },
			{ id: 'icons', label: 'Icons' },
			{ id: 'spacing', label: 'Spacing & Radius' },
			{ id: 'shadows', label: 'Shadows & Glass' },
		]},
		{ label: 'Components', items: [
			{ id: 'buttons', label: 'Buttons' },
			{ id: 'inputs', label: 'Inputs' },
			{ id: 'badges', label: 'Badges & Tags' },
			{ id: 'cards', label: 'Cards & Panels' },
			{ id: 'navigation', label: 'Navigation' },
			{ id: 'tabs', label: 'Tabs' },
			{ id: 'menus', label: 'Menus' },
			{ id: 'dialogs', label: 'Dialogs' },
			{ id: 'tooltips', label: 'Tooltips' },
			{ id: 'feedback', label: 'Feedback' },
			{ id: 'messages', label: 'Messages' },
			{ id: 'data-display', label: 'Data Display' },
		]},
		{ label: 'AI & Chat', items: [
			{ id: 'ai-chat', label: 'Chat Interface' },
			{ id: 'ai-elements', label: 'AI Primitives' },
		]},
		{ label: 'Patterns', items: [
			{ id: 'animations', label: 'Animations' },
			{ id: 'modules', label: 'Module Inventory' },
		]},
	];

	function toggleDark() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark');
	}

	const sectionMap: Record<string, any> = {
		'overview': Overview,
		'colors': Colors,
		'typography': Typography,
		'icons': Icons,
		'spacing': Spacing,
		'shadows': Shadows,
		'buttons': Buttons,
		'inputs': Inputs,
		'badges': Badges,
		'cards': Cards,
		'navigation': Navigation,
		'tabs': TabsSection,
		'menus': Menus,
		'dialogs': Dialogs,
		'tooltips': Tooltips,
		'feedback': Feedback,
		'messages': Messages,
		'data-display': DataDisplay,
		'ai-chat': AiChat,
		'ai-elements': AiElements,
		'animations': Animations,
		'modules': Modules,
	};
</script>

<div class="ds">
	<header class="ds-topbar">
		<div class="ds-topbar__left">
			<span class="ds-topbar__mark">MIOSA</span>
			<span class="ds-topbar__title">Foundation</span>
		</div>
		<div class="ds-topbar__right">
			<button class="ds-toggle" onclick={toggleDark}>
				{#if isDark}
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-width="2" stroke-linecap="round"/></svg>
				{:else}
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
				{/if}
			</button>
			<a href="/dashboard" class="btn-pill btn-pill-primary btn-pill-sm">Back to App</a>
		</div>
	</header>

	<div class="ds-layout">
		<aside class="ds-sidebar">
			{#each sectionGroups as group}
				<div class="ds-sidebar__group">{group.label}</div>
				{#each group.items as section}
					<button
						class="ds-sidebar__item"
						class:is-active={activeSection === section.id}
						onclick={() => activeSection = section.id}
					>{section.label}</button>
				{/each}
			{/each}
		</aside>

		<main class="ds-main">
			{#key activeSection}
				<svelte:component this={sectionMap[activeSection]} />
			{/key}
		</main>
	</div>
</div>
