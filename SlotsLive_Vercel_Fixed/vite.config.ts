import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom Vite config to ensure correct root paths
export default defineConfig({
  plugins: [react()],
});
