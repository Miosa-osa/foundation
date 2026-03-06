export const category = {
  label: "BOS Modules",
  sections: [
    // BOS Modules
    { id: "desktop-dock", label: "Desktop & Dock", file: "DesktopDock.svelte" },
    {
      id: "dashboard-widgets",
      label: "Dashboard Widgets",
      file: "DashboardWidgets.svelte",
    },
    { id: "task-board", label: "Task Board", file: "TaskBoard.svelte" },
    {
      id: "team-directory",
      label: "Team Directory",
      file: "TeamDirectory.svelte",
    },
    {
      id: "knowledge-base",
      label: "Knowledge Base",
      file: "KnowledgeBase.svelte",
    },
    { id: "data-tables", label: "Data Tables", file: "DataTables.svelte" },
    { id: "client-crm", label: "Client CRM", file: "ClientCRM.svelte" },
    {
      id: "calendar-schedule",
      label: "Calendar & Schedule",
      file: "CalendarSchedule.svelte",
    },
    {
      id: "notification-center",
      label: "Notification Center",
      file: "NotificationCenter.svelte",
    },
    {
      id: "onboarding-wizard",
      label: "Onboarding Wizard",
      file: "OnboardingWizard.svelte",
    },
    {
      id: "communication-hub",
      label: "Communication Hub",
      file: "CommunicationHub.svelte",
    },
    {
      id: "workspace-manager",
      label: "Workspace Manager",
      file: "WorkspaceManager.svelte",
    },
    {
      id: "agent-builder",
      label: "Agent Builder",
      file: "AgentBuilder.svelte",
    },
    {
      id: "node-graph",
      label: "Node Graph Editor",
      file: "NodeGraphEditor.svelte",
    },
    { id: "daily-log", label: "Daily Log", file: "DailyLog.svelte" },
    { id: "voice-notes", label: "Voice Notes", file: "VoiceNotes.svelte" },
    {
      id: "profile-account",
      label: "Profile & Account",
      file: "ProfileAccount.svelte",
    },
    {
      id: "app-marketplace",
      label: "App Marketplace",
      file: "AppMarketplace.svelte",
    },
    { id: "osa-agent", label: "OSA Agent", file: "OsaAgent.svelte" },
    {
      id: "system-settings",
      label: "System Settings",
      file: "SystemSettings.svelte",
    },
    {
      id: "integration-hub",
      label: "Integration Hub",
      file: "IntegrationHub.svelte",
    },
    {
      id: "terminal-interface",
      label: "Terminal Interface",
      file: "TerminalInterface.svelte",
    },
    {
      id: "project-manager",
      label: "Project Manager",
      file: "ProjectManager.svelte",
    },
    {
      id: "usage-analytics",
      label: "Usage Analytics",
      file: "UsageAnalytics.svelte",
    },
    { id: "help-center", label: "Help Center", file: "HelpCenter.svelte" },
    // ContentOS Modules
    { id: "content-os", label: "Content Management", file: "ContentOS.svelte" },
    {
      id: "content-generation",
      label: "AI Generation",
      file: "ContentOSGeneration.svelte",
    },
    // Patterns (cross-module)
    {
      id: "onboarding-flows",
      label: "Onboarding Flows",
      file: "OnboardingFlows.svelte",
    },
    {
      id: "social",
      label: "Social Components",
      file: "SocialComponents.svelte",
    },
  ],
} as const;
