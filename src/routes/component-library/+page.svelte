<script lang="ts">
	import '../../app.css';
	import './styles.css';

	// Getting Started
	import Overview from './sections/Overview.svelte';

	// Design Tokens
	import Colors from './sections/Colors.svelte';
	import Typography from './sections/Typography.svelte';
	import Icons from './sections/Icons.svelte';
	import Spacing from './sections/Spacing.svelte';
	import Shadows from './sections/Shadows.svelte';

	// Actions
	import Buttons from './sections/Buttons.svelte';
	import ToggleGroups from './sections/ToggleGroups.svelte';

	// Inputs & Forms
	import Inputs from './sections/Inputs.svelte';
	import FormControls from './sections/FormControls.svelte';
	import Selects from './sections/Selects.svelte';
	import Sliders from './sections/Sliders.svelte';
	import TagInput from './sections/TagInput.svelte';
	import Labels from './sections/Labels.svelte';
	import Forms from './sections/Forms.svelte';

	// Data Display
	import Badges from './sections/Badges.svelte';
	import Avatars from './sections/Avatars.svelte';
	import Cards from './sections/Cards.svelte';
	import Tables from './sections/Tables.svelte';
	import Accordions from './sections/Accordions.svelte';
	import Collapsibles from './sections/Collapsibles.svelte';
	import DataDisplay from './sections/DataDisplay.svelte';
	import Timeline from './sections/Timeline.svelte';
	import Carousel from './sections/Carousel.svelte';
	import Keyboard from './sections/Keyboard.svelte';

	// Navigation
	import Navigation from './sections/Navigation.svelte';
	import TabsSection from './sections/TabsSection.svelte';
	import Menus from './sections/Menus.svelte';
	import ContextMenus from './sections/ContextMenus.svelte';
	import Pagination from './sections/Pagination.svelte';
	import Stepper from './sections/Stepper.svelte';
	import CommandPalette from './sections/CommandPalette.svelte';

	// Overlays
	import Dialogs from './sections/Dialogs.svelte';
	import Drawers from './sections/Drawers.svelte';
	import Tooltips from './sections/Tooltips.svelte';
	import HoverCards from './sections/HoverCards.svelte';
	import Alerts from './sections/Alerts.svelte';
	import Toasts from './sections/Toasts.svelte';

	// Feedback
	import ProgressBars from './sections/ProgressBars.svelte';
	import Feedback from './sections/Feedback.svelte';
	import Messages from './sections/Messages.svelte';

	// AI & Chat
	import AiChat from './sections/AiChat.svelte';
	import AiElements from './sections/AiElements.svelte';

	// Patterns
	import Layouts from './sections/Layouts.svelte';
	import Animations from './sections/Animations.svelte';
	import EmptyStates from './sections/EmptyStates.svelte';
	import ErrorStates from './sections/ErrorStates.svelte';
	import Modules from './sections/Modules.svelte';

	let activeSection = $state('overview');
	let isDark = $state(false);

	const sectionGroups = [
		{ label: 'Getting Started', items: [
			{ id: 'overview', label: 'Overview' },
		]},
		{ label: 'Design Tokens', items: [
			{ id: 'colors', label: 'Colors' },
			{ id: 'typography', label: 'Typography' },
			{ id: 'icons', label: 'Icons' },
			{ id: 'spacing', label: 'Spacing & Radius' },
			{ id: 'shadows', label: 'Shadows & Glass' },
		]},
		{ label: 'Actions', items: [
			{ id: 'buttons', label: 'Buttons' },
			{ id: 'toggle-groups', label: 'Toggle Groups' },
		]},
		{ label: 'Inputs & Forms', items: [
			{ id: 'inputs', label: 'Text Inputs' },
			{ id: 'form-controls', label: 'Toggle / Check / Radio' },
			{ id: 'selects', label: 'Select & Dropdown' },
			{ id: 'sliders', label: 'Sliders & Range' },
			{ id: 'tag-input', label: 'Tag Input' },
			{ id: 'labels', label: 'Labels & Fields' },
			{ id: 'forms', label: 'Form Patterns' },
		]},
		{ label: 'Data Display', items: [
			{ id: 'badges', label: 'Badges & Tags' },
			{ id: 'avatars', label: 'Avatars' },
			{ id: 'cards', label: 'Cards & Panels' },
			{ id: 'tables', label: 'Tables' },
			{ id: 'accordions', label: 'Accordions' },
			{ id: 'collapsibles', label: 'Collapsibles' },
			{ id: 'data-display', label: 'Lists & Stats' },
			{ id: 'timeline', label: 'Timeline' },
			{ id: 'carousel', label: 'Carousel' },
			{ id: 'keyboard', label: 'Keyboard Shortcuts' },
		]},
		{ label: 'Navigation', items: [
			{ id: 'navigation', label: 'Nav & Breadcrumbs' },
			{ id: 'tabs', label: 'Tabs' },
			{ id: 'menus', label: 'Menus & Dropdowns' },
			{ id: 'context-menus', label: 'Context Menus' },
			{ id: 'pagination', label: 'Pagination' },
			{ id: 'stepper', label: 'Stepper & Wizard' },
			{ id: 'command-palette', label: 'Command Palette' },
		]},
		{ label: 'Overlays', items: [
			{ id: 'dialogs', label: 'Dialogs & Modals' },
			{ id: 'drawers', label: 'Drawers & Sheets' },
			{ id: 'tooltips', label: 'Tooltips & Popovers' },
			{ id: 'hover-cards', label: 'Hover Cards' },
			{ id: 'alerts', label: 'Alerts & Banners' },
			{ id: 'toasts', label: 'Toast Notifications' },
		]},
		{ label: 'Feedback', items: [
			{ id: 'progress', label: 'Progress Bars' },
			{ id: 'feedback', label: 'Spinners & Skeletons' },
			{ id: 'messages', label: 'Messages' },
		]},
		{ label: 'AI & Chat', items: [
			{ id: 'ai-chat', label: 'Chat Interface' },
			{ id: 'ai-elements', label: 'AI Primitives' },
		]},
		{ label: 'Patterns', items: [
			{ id: 'layouts', label: 'Layouts' },
			{ id: 'animations', label: 'Animations' },
			{ id: 'empty-states', label: 'Empty States' },
			{ id: 'error-states', label: 'Error States' },
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
		'toggle-groups': ToggleGroups,
		'inputs': Inputs,
		'form-controls': FormControls,
		'selects': Selects,
		'sliders': Sliders,
		'tag-input': TagInput,
		'labels': Labels,
		'forms': Forms,
		'badges': Badges,
		'avatars': Avatars,
		'cards': Cards,
		'tables': Tables,
		'accordions': Accordions,
		'collapsibles': Collapsibles,
		'data-display': DataDisplay,
		'timeline': Timeline,
		'carousel': Carousel,
		'keyboard': Keyboard,
		'navigation': Navigation,
		'tabs': TabsSection,
		'menus': Menus,
		'context-menus': ContextMenus,
		'pagination': Pagination,
		'stepper': Stepper,
		'command-palette': CommandPalette,
		'dialogs': Dialogs,
		'drawers': Drawers,
		'tooltips': Tooltips,
		'hover-cards': HoverCards,
		'alerts': Alerts,
		'toasts': Toasts,
		'progress': ProgressBars,
		'feedback': Feedback,
		'messages': Messages,
		'ai-chat': AiChat,
		'ai-elements': AiElements,
		'layouts': Layouts,
		'animations': Animations,
		'empty-states': EmptyStates,
		'error-states': ErrorStates,
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
