import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  resolve: {
    conditions: ["browser"],
  },
  test: {
    environment: "jsdom",
  },
  server: {
    fs: {
      allow: [
        fileURLToPath(new URL(".", import.meta.url)),
        fileURLToPath(new URL("../../..", import.meta.url)),
      ],
    },
  },
});
