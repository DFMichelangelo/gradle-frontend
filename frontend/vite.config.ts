import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import checker from 'vite-plugin-checker'
import { generateGitInfoPlugin } from './generateGitInfoPlugin'
import { excludedFiles, includedFiles } from './coverageProperties'

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react(),
  ],
  build: {
    outDir: 'build',
  },
  test: {
    css: true,
    api: true,
    environment: 'jsdom',
    restoreMocks: true,
    // browser: {
    //   enabled: true,
    //   name: 'chrome',
    //   headless: true,
    // },
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['html', 'lcov'],
      all: true,
      exclude: excludedFiles,
      include: includedFiles,
    },
    reporters: ['default',
      ['vitest-sonar-reporter', {
         outputFile: 'coverage/sonar-report.xml',
         onWritePath(path: string) {
          // Prefix all paths with root directory
          // e.g. '<file path="test/math.ts">' to '<file path="frontend/test/math.ts">'
          return `.\\frontend\\${path}`.replace("\\","/");
      }
        }],
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
