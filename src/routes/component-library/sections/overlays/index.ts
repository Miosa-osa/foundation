export const category = {
  label: "Overlays",
  sections: [
    { id: "dialogs", label: "Dialogs & Modals", file: "Dialogs.svelte" },
    { id: "drawers", label: "Drawers & Sheets", file: "Drawers.svelte" },
    { id: "tooltips", label: "Tooltips & Popovers", file: "Tooltips.svelte" },
    { id: "hover-cards", label: "Hover Cards", file: "HoverCards.svelte" },
    { id: "alerts", label: "Alerts & Banners", file: "Alerts.svelte" },
    { id: "toasts", label: "Toast Notifications", file: "Toasts.svelte" },
  ],
} as const;
