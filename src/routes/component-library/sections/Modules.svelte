<section class="ds-section">
	<h2 class="ds-title">Module Components</h2>
	<p class="ds-desc">Domain-specific components organized by platform module. Each module has its own component directory at <code>$lib/components/</code>.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Chat & AI</h3>
		<p class="ds-card__sub">25 components — <code>$lib/components/chat/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['AssistantMessage','BlockRenderer','ChatInput','ContextPanel','ConversationListItem','ConversationListPanel','DocumentPreview','DocumentUploadModal','EmptyState','FeedbackPanel','FocusCard','FocusModeSelector','HybridSearchPanel','MemoryCard','MemoryDetailModal','MemoryFilters','MemoryPanel','MemoryStats','PermissionGate','ProgressPanel','RoleContextBadge','SearchResultCard','ThinkingPanel','TypingIndicator','UserMessage'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">AI Elements</h3>
		<p class="ds-card__sub">8 components — <code>$lib/components/ai-elements/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['Artifact','CodeBlock','Conversation','Loader','Message','MessageActions','PromptInput','Suggestion'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Tasks</h3>
		<p class="ds-card__sub">6 components — <code>$lib/components/tasks/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['TaskBoardView','TaskBoardCard','TaskCalendarView','TaskGroupHeader','TaskCheckbox','PriorityBadge'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Team</h3>
		<p class="ds-card__sub">5 components — <code>$lib/components/team/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['TeamDirectoryView','TeamOrgChartView','TeamViewSwitcher','StatusBadge','CapacityBar'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Tables & Data</h3>
		<p class="ds-card__sub">7+ components — <code>$lib/components/tables/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['TableCardView','TableCard','RowExpandModal','FilterBar','ColumnTypeSelector','FieldsPanel','TablesSidebar'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Knowledge Base</h3>
		<p class="ds-card__sub">15+ components — <code>$lib/components/kb/</code> + <code>$lib/components/knowledge/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['CommandPalette','KBSidebar','SidebarPageItem','SidebarSection','KnowledgeGraphView','NewPageWelcome','InlineDocumentEditor','PageMenu','HomeView','GraphControls','IntegrationsModal','KnowledgeDocumentPanel','MemoryBubble','KnowledgeScene','KnowledgeGraph'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Editor & Documents</h3>
		<p class="ds-card__sub"><code>$lib/components/editor/</code> + <code>$lib/components/artifacts/</code></p>
		<div style="display: flex; flex-wrap: wrap; gap: 6px;">
			{#each ['DocumentEditor','Block','BlockMenu','ArtifactEditor'] as name}
				<code class="ds-chip">{name}</code>
			{/each}
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Other Modules</h3>
		<div style="display: flex; flex-direction: column; gap: 12px;">
			{#each [
				['Onboarding', 'onboarding/', 'MultiSelectCard, SelectionCard, ChatInput, CompletionScreen, FileUpload, FloatingChatScreen, MessageBubble, TypewriterText, PurpleOrb, ThemeToggle, ToolPicker'],
				['Auth', 'auth/', 'AuthLayout, PasswordInput, FormInput'],
				['Notifications', 'notifications/', 'NotificationDropdown, NotificationList'],
				['Desktop', 'desktop/', 'AnimatedBackground, FileBrowser, Window'],
				['Agents', 'agents/', 'SystemPromptEditor'],
				['Settings', 'settings/', 'OutputStyleSelector'],
				['Search', 'search/', 'ImageSearchModal'],
				['Projects', 'projects/', 'RoleSelector'],
				['Forms', 'forms/', 'FormSection'],
				['Nodes', 'nodes/', 'NodeBuildingView, NodeBuilding3D, NodeGraphView'],
			] as [module, path, components]}
				<div style="display: flex; align-items: baseline; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
					<span style="font-size: 13px; font-weight: 600; width: 120px; flex-shrink: 0;">{module}</span>
					<code style="font-size: 11px; color: #999; width: 100px; flex-shrink: 0; font-family: var(--bos-font-code-family, monospace);">{path}</code>
					<span style="font-size: 12px; color: #666;">{components}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
