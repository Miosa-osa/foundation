export const category = {
  label: "Feedback & States",
  sections: [
    { id: "progress", label: "Progress Bars", file: "ProgressBars.svelte" },
    {
      id: "loading-patterns",
      label: "Loading Patterns",
      file: "LoadingPatterns.svelte",
    },
    { id: "feedback", label: "Spinners & Skeletons", file: "Feedback.svelte" },
    { id: "messages", label: "Messages", file: "Messages.svelte" },
    { id: "empty-states", label: "Empty States", file: "EmptyStates.svelte" },
    { id: "error-states", label: "Error States", file: "ErrorStates.svelte" },
  ],
} as const;
