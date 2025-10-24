import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';

// Vite configuration for React using SWC for fast TS/JSX transforms
export default defineConfig({
  plugins: [mdx(), react(), tailwindcss()],
});
