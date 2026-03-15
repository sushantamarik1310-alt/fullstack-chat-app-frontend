// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4173'),
    strictPort: false,
    allowedHosts: [
      'localhost',
      'fullstack-chat-app-frontend-4gtu.onrender.com',
      '.onrender.com',
    ],
  },
})
