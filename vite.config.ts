import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,  // Open the visualization after build
      gzipSize: true,
      brotliSize: true,
      filename: "analyze.html"  // Output file
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000
  },
  build: {
    sourcemap: true,  // Enable source maps for better analysis
  }
})