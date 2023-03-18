/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname + "/src"),
    },
  },
  define: {
    "import.meta.vitest": false,
  },
  test: {
    globals: true,
    includeSource: ["./src/**/*.ts"],
    deps: {
      interopDefault: true,
    },
    setupFiles: ["./src/libs/vitest/setup.ts"],
  },
});
