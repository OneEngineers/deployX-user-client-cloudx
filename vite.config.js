import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['cloudx-testing.domrey.online']
  },
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core framework and Vue-based libraries
            if (
              id.includes('vue') ||
              id.includes('vue-router') ||
              id.includes('pinia') ||
              id.includes('element-plus') ||
              id.includes('vuetify')
            )
              return 'vue'

            // Charts
            if (id.includes('apexcharts') || id.includes('vue3-apexcharts')) return 'apexcharts'
            if (id.includes('chart.js') || id.includes('vue-chartjs')) return 'chartjs'

            // Utilities
            if (
              id.includes('axios') ||
              id.includes('dayjs') ||
              id.includes('lodash') ||
              id.includes('js-cookie') ||
              id.includes('zod') ||
              id.includes('vee-validate')
            )
              return 'utils'

            // Other vendor
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000 // Increase limit to 2MB to suppress warnings for large UI library chunks
  }
})
