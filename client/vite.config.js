import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // if react makes an api request, for example api/movies
      // then we will not need to do fetch('htpp...localhost:5000/api/movies)
      // it will be accesible by just doing a simple fetch('api/movies') ; just a shorthand
    }
  }
})