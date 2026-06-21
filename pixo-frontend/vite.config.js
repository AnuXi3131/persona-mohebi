import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [[tailwindcss(), qrcode()]],
  server: {
    port: 5000,
  },
  build: {
    outDir: "dist",
  },
});
