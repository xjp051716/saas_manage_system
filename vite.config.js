import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入Vue等相关函数
      imports: ['vue','vue-router','vuex','@vueuse/head', '@vueuse/core'],
      resolvers: [
        // 自动导入element相关函数
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    Components({
      // 指定组件位置，默认src/components
      dirs: ['src/components','src/layout'],
      resolvers: [
        // 自动导入element组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      // 配置文件生成位置
      // dts: 'src/components.d.js'
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    }
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 初始化tailwindcss文件，放入至main.js中路径一致
          if (id.includes("assets/css/index.css")) {
            return "tailwindcss";
          }
          if (id.includes("element-plus/theme-chalk/")) { // 当然也可以优化下这个判断，不过目前这样写足矣了。
            return "element-plus";
          }
        },
      },
    },
    target: 'modules',
    outDir: 'dist', //输出路径
    assetsDir: 'assets', // 静态资源存放路径
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true, //服务器启动自动在浏览器打开
    cors: true, //默认启用并允许任何源
    proxy: {
      '/api': {
        target: "",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
