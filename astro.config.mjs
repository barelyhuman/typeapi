import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'server',
  adapter: vercel(),
})
