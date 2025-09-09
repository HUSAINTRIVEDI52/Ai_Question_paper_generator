import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on the mode (development, production)
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Expose the API key from VITE_API_KEY in the .env file
      // to the app, making it available as process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  }
})
