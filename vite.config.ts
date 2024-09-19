import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
    root: "src/",
  }
})
