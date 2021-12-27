import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    base: process.env.ELECTRON == "true" ? './' : ".",
    plugins: [vue()]
  }
})