import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRouterPlugin from 'vite-plugin-next-react-router';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        reactRouterPlugin({
            pageDir: 'src/pages',
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            layout: '_layout',
        }),
    ],
});
