// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000
//   },
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });





import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the crucial part for local proxying
    proxy: {
      '/api': { // Any request starting with /api will be proxied
        target: 'http://localhost:8080', // Your Spring Boot backend URL
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite /api to /api (optional, but good for clarity)
        // secure: false, // Only if your backend is HTTPS and you're having issues with self-signed certs (unlikely for localhost)
      },
      // You can add other proxy rules if needed, e.g., for /auth
      // '/auth': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/auth/, '/auth'),
      // },
    },
    // Ensure your Vite dev server runs on port 3000
    port: 3000,
  },
});


