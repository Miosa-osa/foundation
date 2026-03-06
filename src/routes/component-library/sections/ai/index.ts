export const category = {
  label: "AI",
  sections: [
    // AI — Chatbot
    { id: "ai-conversation", label: "Conversation", file: "AiChat.svelte" },
    { id: "ai-message", label: "Message", file: "MessageDisplay.svelte" },
    {
      id: "ai-prompt-input",
      label: "Prompt Input",
      file: "ChatInputPatterns.svelte",
    },
    {
      id: "ai-model-selector",
      label: "Model Selector",
      file: "ModelSelector.svelte",
    },
    { id: "ai-reasoning", label: "Reasoning", file: "Reasoning.svelte" },
    {
      id: "ai-suggestions",
      label: "Suggestions",
      file: "AiSuggestions.svelte",
    },
    { id: "ai-attachments", label: "Attachments", file: "Attachments.svelte" },
    {
      id: "ai-sources",
      label: "Sources & Citations",
      file: "AiSources.svelte",
    },
    { id: "ai-tool-calls", label: "Tool Calls", file: "ToolCallCards.svelte" },
    // AI — Code & Display
    { id: "ai-elements", label: "Code & Artifacts", file: "AiElements.svelte" },
    // AI — Agents & Generation
    { id: "ai-agent-cards", label: "Agent Cards", file: "AiAgentCards.svelte" },
    {
      id: "ai-generation",
      label: "Generation Forms",
      file: "AiGenerationForms.svelte",
    },
  ],
} as const;
