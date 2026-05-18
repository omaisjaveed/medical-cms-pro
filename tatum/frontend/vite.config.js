import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
    // Improve dev performance
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    }
  },
  optimizeDeps: {
    // Pre-bundle these dependencies to speed up dev start
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'gsap', 
      'gsap/ScrollTrigger', 
      'react-hot-toast', 
      'react-quill',
      'swiper',
      'swiper/modules',
      '@fortawesome/react-fontawesome',
      '@fortawesome/free-solid-svg-icons'
    ]
  },
  build: {
    // Optimize build
    minify: false,
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 2000
  }
})
