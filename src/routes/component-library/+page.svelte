<script lang="ts">
	import '../../app.css';
	import './styles.css';
	import type { Component } from 'svelte';

	let activeSection = $state('overview');
	let isDark = $state(true);
	let sidebarCollapsed = $state(false);
	let openGroups = $state<Set<string>>(new Set(['Getting Started']));
	let ActiveComponent = $state<Component | null>(null);
	let loadingSection = $state(false);

	// Dynamic import map — only loads the active section on demand
	const importMap: Record<string, () => Promise<{ default: Component }>> = {
		'overview': () => import('./sections/getting-started/Overview.svelte'),
		'colors': () => import('./sections/foundation/Colors.svelte'),
		'typography': () => import('./sections/foundation/Typography.svelte'),
		'icons': () => import('./sections/foundation/Icons.svelte'),
		'spacing': () => import('./sections/foundation/Spacing.svelte'),
		'shadows': () => import('./sections/foundation/Shadows.svelte'),
		'buttons': () => import('./sections/actions/Buttons.svelte'),
		'toggle-groups': () => import('./sections/actions/ToggleGroups.svelte'),
		'inputs': () => import('./sections/inputs-forms/Inputs.svelte'),
		'form-controls': () => import('./sections/inputs-forms/FormControls.svelte'),
		'selects': () => import('./sections/inputs-forms/Selects.svelte'),
		'combobox': () => import('./sections/inputs-forms/Combobox.svelte'),
		'sliders': () => import('./sections/inputs-forms/Sliders.svelte'),
		'tag-input': () => import('./sections/inputs-forms/TagInput.svelte'),
		'date-picker': () => import('./sections/inputs-forms/DatePicker.svelte'),
		'file-upload': () => import('./sections/inputs-forms/FileUpload.svelte'),
		'file-browser': () => import('./sections/inputs-forms/FileBrowser.svelte'),
		'labels': () => import('./sections/inputs-forms/Labels.svelte'),
		'forms': () => import('./sections/inputs-forms/Forms.svelte'),
		'badges': () => import('./sections/data-display/Badges.svelte'),
		'avatars': () => import('./sections/data-display/Avatars.svelte'),
		'profile-cards': () => import('./sections/data-display/ProfileCards.svelte'),
		'cards': () => import('./sections/data-display/Cards.svelte'),
		'app-cards': () => import('./sections/patterns/AppCards.svelte'),
		'tables': () => import('./sections/data-display/Tables.svelte'),
		'data-tables': () => import('./sections/data-display/DataTables.svelte'),
		'data-display': () => import('./sections/data-display/DataDisplay.svelte'),
		'accordions': () => import('./sections/data-display/Accordions.svelte'),
		'collapsibles': () => import('./sections/data-display/Collapsibles.svelte'),
		'dividers': () => import('./sections/data-display/Dividers.svelte'),
		'media-display': () => import('./sections/data-display/MediaDisplay.svelte'),
		'timeline': () => import('./sections/data-display/Timeline.svelte'),
		'carousel': () => import('./sections/data-display/Carousel.svelte'),
		'keyboard': () => import('./sections/data-display/Keyboard.svelte'),
		'navigation': () => import('./sections/navigation/Navigation.svelte'),
		'tabs': () => import('./sections/navigation/TabsSection.svelte'),
		'menus': () => import('./sections/navigation/Menus.svelte'),
		'context-menus': () => import('./sections/navigation/ContextMenus.svelte'),
		'pagination': () => import('./sections/navigation/Pagination.svelte'),
		'stepper': () => import('./sections/navigation/Stepper.svelte'),
		'command-palette': () => import('./sections/navigation/CommandPalette.svelte'),
		'search-patterns': () => import('./sections/patterns/SearchPatterns.svelte'),
		'dialogs': () => import('./sections/overlays/Dialogs.svelte'),
		'drawers': () => import('./sections/overlays/Drawers.svelte'),
		'tooltips': () => import('./sections/overlays/Tooltips.svelte'),
		'hover-cards': () => import('./sections/overlays/HoverCards.svelte'),
		'alerts': () => import('./sections/overlays/Alerts.svelte'),
		'toasts': () => import('./sections/overlays/Toasts.svelte'),
		'progress': () => import('./sections/feedback/ProgressBars.svelte'),
		'feedback': () => import('./sections/feedback/Feedback.svelte'),
		'messages': () => import('./sections/feedback/Messages.svelte'),
		'empty-states': () => import('./sections/feedback/EmptyStates.svelte'),
		'error-states': () => import('./sections/feedback/ErrorStates.svelte'),
		'loading-patterns': () => import('./sections/feedback/LoadingPatterns.svelte'),
		'ai-conversation': () => import('./sections/ai/AiChat.svelte'),
		'ai-message': () => import('./sections/ai/MessageDisplay.svelte'),
		'ai-prompt-input': () => import('./sections/ai/ChatInputPatterns.svelte'),
		'ai-model-selector': () => import('./sections/ai/ModelSelector.svelte'),
		'ai-reasoning': () => import('./sections/ai/Reasoning.svelte'),
		'ai-suggestions': () => import('./sections/ai/AiSuggestions.svelte'),
		'ai-attachments': () => import('./sections/ai/Attachments.svelte'),
		'ai-sources': () => import('./sections/ai/AiSources.svelte'),
		'ai-tool-calls': () => import('./sections/ai/ToolCallCards.svelte'),
		'ai-elements': () => import('./sections/ai/AiElements.svelte'),
		'ai-agent-cards': () => import('./sections/ai/AiAgentCards.svelte'),
		'ai-generation': () => import('./sections/ai/AiGenerationForms.svelte'),
		'api-store': () => import('./sections/platform/ApiStoreBrowser.svelte'),
		'usage-dashboard': () => import('./sections/platform/UsageDashboard.svelte'),
		'task-projects': () => import('./sections/platform/TaskProjectCards.svelte'),
		'share-referral': () => import('./sections/platform/ShareReferral.svelte'),
		'app-publish': () => import('./sections/platform/AppPublishForm.svelte'),
		'meeting-people': () => import('./sections/platform/MeetingPeopleCards.svelte'),
		'compute-usage': () => import('./sections/platform/ComputeUsage.svelte'),
		'dashboard-widgets': () => import('./sections/bos-modules/DashboardWidgets.svelte'),
		'task-board': () => import('./sections/bos-modules/TaskBoard.svelte'),
		'team-directory': () => import('./sections/bos-modules/TeamDirectory.svelte'),
		'knowledge-base': () => import('./sections/bos-modules/KnowledgeBase.svelte'),
		'client-crm': () => import('./sections/bos-modules/ClientCRM.svelte'),
		'calendar-schedule': () => import('./sections/bos-modules/CalendarSchedule.svelte'),
		'notification-center': () => import('./sections/bos-modules/NotificationCenter.svelte'),
		'onboarding-wizard': () => import('./sections/bos-modules/OnboardingWizard.svelte'),
		'communication-hub': () => import('./sections/bos-modules/CommunicationHub.svelte'),
		'workspace-manager': () => import('./sections/bos-modules/WorkspaceManager.svelte'),
		'agent-builder': () => import('./sections/bos-modules/AgentBuilder.svelte'),
		'node-graph': () => import('./sections/bos-modules/NodeGraphEditor.svelte'),
		'daily-log': () => import('./sections/bos-modules/DailyLog.svelte'),
		'voice-notes': () => import('./sections/bos-modules/VoiceNotes.svelte'),
		'profile-account': () => import('./sections/bos-modules/ProfileAccount.svelte'),
		'app-marketplace': () => import('./sections/bos-modules/AppMarketplace.svelte'),
		'content-os': () => import('./sections/bos-modules/ContentOS.svelte'),
		'content-generation': () => import('./sections/bos-modules/ContentOSGeneration.svelte'),
		'content-studio': () => import('./sections/bos-modules/ContentOSStudio.svelte'),
		'content-batch': () => import('./sections/bos-modules/ContentOSBatch.svelte'),
		'content-prompts': () => import('./sections/bos-modules/ContentOSPrompts.svelte'),
		'dev-workflows': () => import('./sections/devos-modules/DevWorkflows.svelte'),
		'code-review-dash': () => import('./sections/devos-modules/CodeReviewDash.svelte'),
		'repo-manager': () => import('./sections/devos-modules/RepoManager.svelte'),
		'cicd-pipeline': () => import('./sections/devos-modules/CICDPipeline.svelte'),
		'code-quality': () => import('./sections/devos-modules/CodeQuality.svelte'),
		'dev-agent-scheduler': () => import('./sections/devos-modules/DevAgentScheduler.svelte'),
		'osa-agent': () => import('./sections/bos-modules/OsaAgent.svelte'),
		'system-settings': () => import('./sections/bos-modules/SystemSettings.svelte'),
		'integration-hub': () => import('./sections/bos-modules/IntegrationHub.svelte'),
		'terminal-interface': () => import('./sections/bos-modules/TerminalInterface.svelte'),
		'project-manager': () => import('./sections/bos-modules/ProjectManager.svelte'),
		'usage-analytics': () => import('./sections/platform/UsageAnalytics.svelte'),
		'help-center': () => import('./sections/bos-modules/HelpCenter.svelte'),
		'desktop-dock': () => import('./sections/bos-modules/DesktopDock.svelte'),
		'desktop-3d': () => import('./sections/bos-modules/Desktop3D.svelte'),
		'chat-module': () => import('./sections/bos-modules/ChatModule.svelte'),
		'layouts': () => import('./sections/patterns/Layouts.svelte'),
		'glass-surfaces': () => import('./sections/surfaces-effects/GlassSurfaces.svelte'),
		'floating-elements': () => import('./sections/surfaces-effects/FloatingElements.svelte'),
		'animations': () => import('./sections/surfaces-effects/Animations.svelte'),
		'animated-borders': () => import('./sections/surfaces-effects/AnimatedBorders.svelte'),
		'filter-chips': () => import('./sections/patterns/FilterChips.svelte'),
		'selection-cards': () => import('./sections/surfaces-effects/SelectionCards.svelte'),
		'modules': () => import('./sections/reference/Modules.svelte'),
		'social': () => import('./sections/bos-modules/SocialComponents.svelte'),
		'integrations': () => import('./sections/platform/IntegrationCards.svelte'),
		'onboarding-flows': () => import('./sections/bos-modules/OnboardingFlows.svelte'),
		'auth-patterns': () => import('./sections/patterns/AuthPatterns.svelte'),
		'balance-credits': () => import('./sections/platform/BalanceCredits.svelte'),
		'settings-patterns': () => import('./sections/patterns/SettingsPatterns.svelte'),
	};

	const groupIcons: Record<string, string> = {
		'Getting Started': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
		'Foundation': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
		'Actions': 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
		'Inputs & Forms': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
		'Data Display': 'M4 6h16M4 10h16M4 14h16M4 18h16',
		'Navigation': 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
		'Overlays': 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
		'Feedback & States': 'M13 10V3L4 14h7v7l9-11h-7z',
		'OS Shell': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		'Core Modules': 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
		'BusinessOS Modules': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
		'ContentOS Modules': 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
		'DevOS Modules': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
		'3D Desktop': 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
		'Surfaces & Effects': 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
		'Patterns': 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
		'AI — Chatbot': 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
		'AI — Code & Agents': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
		'Billing & Usage': 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
		'Reference': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
	};

	// Start in dark mode on mount
	$effect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	const sectionGroups = [
		{ label: 'Getting Started', items: [
			{ id: 'overview', label: 'Overview' },
		]},
		{ label: 'Foundation', items: [
			{ id: 'colors', label: 'Colors' },
			{ id: 'typography', label: 'Typography' },
			{ id: 'icons', label: 'Icons' },
			{ id: 'spacing', label: 'Spacing & Radius' },
			{ id: 'shadows', label: 'Shadows & Elevation' },
		]},
		{ label: 'Actions', items: [
			{ id: 'buttons', label: 'Buttons' },
			{ id: 'toggle-groups', label: 'Toggle Groups' },
			{ id: 'filter-chips', label: 'Chips & Filters' },
			{ id: 'selection-cards', label: 'Selection Cards' },
		]},
		{ label: 'Inputs & Forms', items: [
			{ id: 'inputs', label: 'Text Inputs' },
			{ id: 'form-controls', label: 'Toggle / Check / Radio' },
			{ id: 'selects', label: 'Select & Dropdown' },
			{ id: 'combobox', label: 'Combobox & Autocomplete' },
			{ id: 'sliders', label: 'Sliders & Range' },
			{ id: 'tag-input', label: 'Tag Input' },
			{ id: 'date-picker', label: 'Date & Time Picker' },
			{ id: 'file-upload', label: 'File Upload' },
			{ id: 'labels', label: 'Labels & Fields' },
			{ id: 'forms', label: 'Form Patterns' },
		]},
		{ label: 'Data Display', items: [
			{ id: 'badges', label: 'Badges & Tags' },
			{ id: 'avatars', label: 'Avatars' },
			{ id: 'cards', label: 'Cards & Panels' },
			{ id: 'profile-cards', label: 'Profile Cards' },
			{ id: 'app-cards', label: 'App Cards' },
			{ id: 'tables', label: 'Tables' },
			{ id: 'data-display', label: 'Lists & Stats' },
			{ id: 'accordions', label: 'Accordions' },
			{ id: 'collapsibles', label: 'Collapsibles' },
			{ id: 'dividers', label: 'Dividers & Separators' },
			{ id: 'timeline', label: 'Timeline' },
			{ id: 'carousel', label: 'Carousel' },
			{ id: 'media-display', label: 'Media & Images' },
			{ id: 'file-browser', label: 'File Browser' },
		]},
		{ label: 'Navigation', items: [
			{ id: 'navigation', label: 'Nav & Breadcrumbs' },
			{ id: 'tabs', label: 'Tabs' },
			{ id: 'menus', label: 'Menus & Dropdowns' },
			{ id: 'context-menus', label: 'Context Menus' },
			{ id: 'pagination', label: 'Pagination' },
			{ id: 'stepper', label: 'Stepper & Wizard' },
			{ id: 'command-palette', label: 'Command Palette' },
			{ id: 'search-patterns', label: 'Search Patterns' },
			{ id: 'keyboard', label: 'Keyboard Shortcuts' },
		]},
		{ label: 'Overlays', items: [
			{ id: 'dialogs', label: 'Dialogs & Modals' },
			{ id: 'drawers', label: 'Drawers & Sheets' },
			{ id: 'tooltips', label: 'Tooltips & Popovers' },
			{ id: 'hover-cards', label: 'Hover Cards' },
			{ id: 'alerts', label: 'Alerts & Banners' },
			{ id: 'toasts', label: 'Toast Notifications' },
		]},
		{ label: 'Feedback & States', items: [
			{ id: 'progress', label: 'Progress Bars' },
			{ id: 'loading-patterns', label: 'Loading Patterns' },
			{ id: 'feedback', label: 'Spinners & Skeletons' },
			{ id: 'messages', label: 'Messages' },
			{ id: 'empty-states', label: 'Empty States' },
			{ id: 'error-states', label: 'Error States' },
		]},
		{ label: 'OS Shell', items: [
			{ id: 'desktop-dock', label: 'Desktop & Dock' },
			{ id: 'terminal-interface', label: 'Terminal Interface' },
			{ id: 'osa-agent', label: 'OSA Agent' },
			{ id: 'system-settings', label: 'System Settings' },
			{ id: 'app-marketplace', label: 'Module Market' },
			{ id: 'api-store', label: 'API Store' },
			{ id: 'app-publish', label: 'App Publish' },
		]},
		{ label: 'Core Modules', items: [
			{ id: 'chat-module', label: 'Chat Module' },
			{ id: 'dashboard-widgets', label: 'Dashboard Widgets' },
			{ id: 'task-board', label: 'Task Board' },
			{ id: 'task-projects', label: 'Task & Project Cards' },
			{ id: 'project-manager', label: 'Project Manager' },
			{ id: 'node-graph', label: 'Node Graph Editor' },
			{ id: 'notification-center', label: 'Notification Center' },
			{ id: 'daily-log', label: 'Daily Log' },
			{ id: 'voice-notes', label: 'Voice Notes' },
			{ id: 'profile-account', label: 'Profile & Account' },
			{ id: 'agent-builder', label: 'Agent Builder' },
			{ id: 'workspace-manager', label: 'Workspace Manager' },
			{ id: 'onboarding-wizard', label: 'Onboarding Wizard' },
			{ id: 'help-center', label: 'Help Center' },
			{ id: 'usage-analytics', label: 'Usage Analytics' },
		]},
		{ label: 'BusinessOS Modules', items: [
			{ id: 'team-directory', label: 'Team Directory' },
			{ id: 'knowledge-base', label: 'Knowledge Base' },
			{ id: 'data-tables', label: 'Data Tables' },
			{ id: 'client-crm', label: 'Client CRM' },
			{ id: 'calendar-schedule', label: 'Calendar & Schedule' },
			{ id: 'communication-hub', label: 'Communication Hub' },
			{ id: 'integration-hub', label: 'Integration Hub' },
		]},
		{ label: 'ContentOS Modules', items: [
			{ id: 'content-os', label: 'Content Management' },
			{ id: 'content-generation', label: 'AI Generation' },
			{ id: 'content-studio', label: 'Character Studio' },
			{ id: 'content-batch', label: 'Batch & Orders' },
			{ id: 'content-prompts', label: 'Prompts & Pricing' },
		]},
		{ label: 'DevOS Modules', items: [
			{ id: 'dev-workflows', label: 'AI Dev Workflows' },
			{ id: 'code-review-dash', label: 'Code Review Dashboard' },
			{ id: 'repo-manager', label: 'Repository Manager' },
			{ id: 'cicd-pipeline', label: 'CI/CD Pipeline' },
			{ id: 'code-quality', label: 'Code Quality Metrics' },
			{ id: 'dev-agent-scheduler', label: 'Agent Scheduler' },
		]},
		{ label: '3D Desktop', items: [
			{ id: 'desktop-3d', label: '3D Spatial Desktop' },
		]},
		{ label: 'Surfaces & Effects', items: [
			{ id: 'layouts', label: 'Layouts' },
			{ id: 'glass-surfaces', label: 'Glass Surfaces' },
			{ id: 'floating-elements', label: 'Floating Elements' },
			{ id: 'animations', label: 'Animations' },
			{ id: 'animated-borders', label: 'Animated Borders & Glow' },
		]},
		{ label: 'Patterns', items: [
			{ id: 'settings-patterns', label: 'Settings Patterns' },
			{ id: 'auth-patterns', label: 'Auth Patterns' },
			{ id: 'onboarding-flows', label: 'Onboarding Flows' },
			{ id: 'social', label: 'Social Components' },
			{ id: 'meeting-people', label: 'Meeting & People Cards' },
			{ id: 'integrations', label: 'Integration Cards' },
		]},
		{ label: 'AI — Chatbot', items: [
			{ id: 'ai-conversation', label: 'Conversation' },
			{ id: 'ai-message', label: 'Message' },
			{ id: 'ai-prompt-input', label: 'Prompt Input' },
			{ id: 'ai-model-selector', label: 'Model Selector' },
			{ id: 'ai-reasoning', label: 'Reasoning' },
			{ id: 'ai-suggestions', label: 'Suggestions' },
			{ id: 'ai-attachments', label: 'Attachments' },
			{ id: 'ai-sources', label: 'Sources & Citations' },
			{ id: 'ai-tool-calls', label: 'Tool Calls' },
		]},
		{ label: 'AI — Code & Agents', items: [
			{ id: 'ai-elements', label: 'Code & Artifacts' },
			{ id: 'ai-agent-cards', label: 'Agent Cards' },
			{ id: 'ai-generation', label: 'Generation Forms' },
		]},
		{ label: 'Billing & Usage', items: [
			{ id: 'usage-dashboard', label: 'Usage & Credits' },
			{ id: 'compute-usage', label: 'Compute & Sandboxes' },
			{ id: 'balance-credits', label: 'Balance & Credits' },
			{ id: 'share-referral', label: 'Share & Referral' },
		]},
		{ label: 'Reference', items: [
			{ id: 'modules', label: 'Module Inventory' },
		]},
	];

	function toggleDark() {
		isDark = !isDark;
	}

	function toggleGroup(label: string) {
		const next = new Set(openGroups);
		if (next.has(label)) next.delete(label);
		else next.add(label);
		openGroups = next;
	}

	// Auto-open the group containing the active section
	$effect(() => {
		for (const group of sectionGroups) {
			if (group.items.some(item => item.id === activeSection)) {
				if (!openGroups.has(group.label)) {
					const next = new Set(openGroups);
					next.add(group.label);
					openGroups = next;
				}
				break;
			}
		}
	});

	// Lazy-load the active section component
	$effect(() => {
		const section = activeSection;
		const loader = importMap[section];
		if (!loader) {
			ActiveComponent = null;
			return;
		}
		loadingSection = true;
		ActiveComponent = null;
		loader().then((mod) => {
			if (activeSection === section) {
				ActiveComponent = mod.default;
				loadingSection = false;
			}
		});
	});
</script>

<div class="ds" class:dark={isDark}>
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
		</div>
	</header>

	<div class="ds-layout">
		<aside class="ds-sidebar" class:is-collapsed={sidebarCollapsed}>
			<!-- Collapse toggle -->
			<button class="ds-sidebar__toggle" onclick={() => sidebarCollapsed = !sidebarCollapsed} title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
				<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
					<path d="M15 18l-6-6 6-6"/>
				</svg>
			</button>

			<!-- Nav groups -->
			<div class="ds-sidebar__nav">
				{#each sectionGroups as group}
					<button
						class="ds-sidebar__group"
						class:is-open={openGroups.has(group.label)}
						onclick={() => { if (sidebarCollapsed) { sidebarCollapsed = false; } toggleGroup(group.label); }}
						title={sidebarCollapsed ? group.label : ''}
					>
						<svg class="ds-sidebar__group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d={groupIcons[group.label] || 'M4 6h16M4 12h16M4 18h16'}/>
						</svg>
						<span class="ds-sidebar__group-label">{group.label}</span>
						<svg class="ds-sidebar__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M4 4.5L6 6.5L8 4.5"/>
						</svg>
					</button>
					{#if openGroups.has(group.label)}
						<div class="ds-sidebar__items">
							{#each group.items as section}
								<button
									class="ds-sidebar__item"
									class:is-active={activeSection === section.id}
									onclick={() => activeSection = section.id}
								>{section.label}</button>
							{/each}
						</div>
					{/if}
				{/each}
			</div>

			<!-- Profile footer -->
			<div class="ds-sidebar__profile" onclick={() => activeSection = 'profile-account'}>
				<div class="ds-sidebar__profile-img">M</div>
				<div class="ds-sidebar__profile-info">
					<div class="ds-sidebar__profile-name">MIOSA User</div>
					<div class="ds-sidebar__profile-role">Admin</div>
				</div>
			</div>
		</aside>

		<main class="ds-main">
			{#if loadingSection}
				<div style="display: flex; align-items: center; justify-content: center; height: 200px; color: var(--dt3); font-size: 13px;">
					Loading...
				</div>
			{:else if ActiveComponent}
				{#key activeSection}
					<ActiveComponent />
				{/key}
			{/if}
		</main>
	</div>
</div>
