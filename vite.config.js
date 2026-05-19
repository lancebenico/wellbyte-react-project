import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** 1×1 transparent PNG — Chrome still probes /favicon.ico; serve this so it won't reuse an old cached icon. */
const FAVICON_ICO_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO2p4JkAAAAASUVORK5CYII=',
  'base64',
)

function faviconIcoNoStore() {
  return {
    name: 'favicon-ico-transparent',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = req.url?.split('?')[0]
        if (urlPath === '/favicon.ico') {
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Cache-Control', 'no-store')
          res.end(FAVICON_ICO_PNG)
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = req.url?.split('?')[0]
        if (urlPath === '/favicon.ico') {
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Cache-Control', 'no-store')
          res.end(FAVICON_ICO_PNG)
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), faviconIcoNoStore()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
