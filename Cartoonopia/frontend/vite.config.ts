import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    port: 3030,
  },
  preview: {
    port: 3030,
    cors: true,
  },
  plugins: [react()],
})
