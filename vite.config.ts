import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      // output only index.js and index.d.ts
        output: {
            entryFileNames: 'index.js',
            assetFileNames: 'index.[ext]',
        }
    },
    
  }
})
