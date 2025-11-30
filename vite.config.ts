import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === 'library';

  return {
    plugins: [react()],
    base: '/react-pivot/',
    build: isLibraryMode ? {
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ReactPivot',
        formats: ['es', 'umd'],
        fileName: (format) => `react-pivot.${format === 'es' ? 'js' : 'umd.cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
    } : undefined,
  };
})
