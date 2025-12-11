import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (système et .env)
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // On rend accessible la clé via process.env pour la compatibilité, 
      // mais on préférera import.meta.env.VITE_API_KEY dans le code moderne.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY)
    },
    build: {
      target: 'esnext'
    }
  };
});