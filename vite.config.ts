import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [["@swc-jotai/react-refresh", {}]],
    }),
    tsconfigPaths(),
  ],
});
