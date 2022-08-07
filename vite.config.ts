import { resolve } from 'path'
import { defineConfig } from 'vite'
import typescriptDts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [typescriptDts({ insertTypesEntry: true })],
  build: {
    lib: {
      name: 'Matrix',
      formats: [
        'es',
        'cjs',
        'umd'
      ],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `index.${format}.js`
    }
  }
})
