import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/craigs-world/",
  server: {
    open: true,
    port: 3000
  }
})
