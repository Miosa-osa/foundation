export const category = {
  label: "Patterns",
  sections: [
    { id: "layouts", label: "Layouts", file: "Layouts.svelte" },
    {
      id: "filter-chips",
      label: "Chips & Filters",
      file: "FilterChips.svelte",
    },
    { id: "app-cards", label: "App Cards", file: "AppCards.svelte" },
    {
      id: "search-patterns",
      label: "Search Patterns",
      file: "SearchPatterns.svelte",
    },
    {
      id: "settings-patterns",
      label: "Settings Patterns",
      file: "SettingsPatterns.svelte",
    },
    {
      id: "auth-patterns",
      label: "Auth Patterns",
      file: "AuthPatterns.svelte",
    },
  ],
} as const;
