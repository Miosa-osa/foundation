export const category = {
  label: "Inputs & Forms",
  sections: [
    { id: "inputs", label: "Text Inputs", file: "Inputs.svelte" },
    {
      id: "form-controls",
      label: "Toggle / Check / Radio",
      file: "FormControls.svelte",
    },
    { id: "selects", label: "Select & Dropdown", file: "Selects.svelte" },
    {
      id: "combobox",
      label: "Combobox & Autocomplete",
      file: "Combobox.svelte",
    },
    { id: "sliders", label: "Sliders & Range", file: "Sliders.svelte" },
    { id: "tag-input", label: "Tag Input", file: "TagInput.svelte" },
    {
      id: "date-picker",
      label: "Date & Time Picker",
      file: "DatePicker.svelte",
    },
    { id: "file-upload", label: "File Upload", file: "FileUpload.svelte" },
    { id: "file-browser", label: "File Browser", file: "FileBrowser.svelte" },
    { id: "labels", label: "Labels & Fields", file: "Labels.svelte" },
    { id: "forms", label: "Form Patterns", file: "Forms.svelte" },
  ],
} as const;
