export const category = {
  label: "Navigation",
  sections: [
    { id: "navigation", label: "Nav & Breadcrumbs", file: "Navigation.svelte" },
    { id: "tabs", label: "Tabs", file: "TabsSection.svelte" },
    { id: "menus", label: "Menus & Dropdowns", file: "Menus.svelte" },
    {
      id: "context-menus",
      label: "Context Menus",
      file: "ContextMenus.svelte",
    },
    { id: "pagination", label: "Pagination", file: "Pagination.svelte" },
    { id: "stepper", label: "Stepper & Wizard", file: "Stepper.svelte" },
    {
      id: "command-palette",
      label: "Command Palette",
      file: "CommandPalette.svelte",
    },
  ],
} as const;
