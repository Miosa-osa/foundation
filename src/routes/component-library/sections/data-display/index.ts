export const category = {
  label: "Data Display",
  sections: [
    { id: "badges", label: "Badges & Tags", file: "Badges.svelte" },
    { id: "avatars", label: "Avatars", file: "Avatars.svelte" },
    { id: "cards", label: "Cards & Panels", file: "Cards.svelte" },
    {
      id: "profile-cards",
      label: "Profile Cards",
      file: "ProfileCards.svelte",
    },
    { id: "tables", label: "Tables", file: "Tables.svelte" },
    { id: "data-display", label: "Lists & Stats", file: "DataDisplay.svelte" },
    { id: "accordions", label: "Accordions", file: "Accordions.svelte" },
    { id: "collapsibles", label: "Collapsibles", file: "Collapsibles.svelte" },
    { id: "dividers", label: "Dividers & Separators", file: "Dividers.svelte" },
    { id: "timeline", label: "Timeline", file: "Timeline.svelte" },
    { id: "carousel", label: "Carousel", file: "Carousel.svelte" },
    {
      id: "media-display",
      label: "Media & Images",
      file: "MediaDisplay.svelte",
    },
    { id: "keyboard", label: "Keyboard Shortcuts", file: "Keyboard.svelte" },
  ],
} as const;
