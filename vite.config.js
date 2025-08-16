import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    // Configuração base
    base: './',
    publicDir: 'public',
    
    // Plugins
    plugins: [react()],
    
    // Configuração do servidor de desenvolvimento
    server: {
      port: 3000,         // Porta inicial
      open: '/index.html',  // Garante que o app.html seja aberto por padrão
      host: true,         // Permite acesso em rede local
      strictPort: false,  // Tenta portas alternativas se a 3000 estiver ocupada
    },

    // Resolução de módulos e aliases
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@components': resolve(__dirname, 'src/components'),
        '@styles': resolve(__dirname, 'src'), // Moved to src since we don't have a styles directory
      },
      extensions: ['.js', '.jsx', '.json'], // Added common extensions
    },
    
    // Configuração de CSS
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";` // Se você usar SCSS
        }
      }
    },
    
    // Configuração de build // adicionando i18n 
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isProduction ? false : 'inline', // Melhora a performance em produção
      minify: isProduction ? 'terser' : false,   // Minifica apenas em produção
      assetsInlineLimit:0,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length -1];
            if (['json'].includes(ext)) {
              return `locales/[name].[ext]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      },

      // Otimizações para produção
      ...(isProduction && {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
        chunkSizeWarningLimit: 1000, // Aumenta o limite de aviso de tamanho de chunk
      }),
    },
    
    // Configuração de preview (npm run preview)
    preview: {
      port: 3000,
      open: true,
    },
  };
});
