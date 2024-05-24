import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api/":"http://localhost:5000",
      "/uploads/": "http://localhost:5000",
      // "/api/category/": "http://localhost:5000",
      // "/api/products/": "http://localhost:5000",



    }
  }
})
