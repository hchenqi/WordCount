import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        'name': 'Word Count',
        'short_name': 'Word Count',
        'start_url': '.',
        'display': 'standalone',
        'theme_color': '#0055aa',
        'background_color': '#0055aa',
        'icons': [
          {
            'sizes': '192x192',
            'src': 'android-chrome-192x192.png',
            'type': 'image/png'
          },
          {
            'sizes': '512x512',
            'src': 'android-chrome-512x512.png',
            'type': 'image/png'
          }
        ]
      },
    })
  ],
  base: '',
})
