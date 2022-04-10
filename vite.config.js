import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  server: {
    port: 8080,
    host: '0.0.0.0',
    hmr: {
      clientPort: 80,
    }
  }
}
