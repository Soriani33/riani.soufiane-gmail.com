import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (système et .env)
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Remplacement sécurisé des variables
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
      // Important pour éviter "process is not defined" dans certaines libs
      'process.env': {}
    },
    build: {
      target: 'esnext'
    }
  };
});