import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import chalk from "chalk";
import pages from './pages.json' assert { type: 'json' }

const ENV = process.env.NODE_ENV

const npm_page = process.env.npm_config_page || "";

const errorLog = (error) => console.log(chalk.red(`${error}`));

const getEnterPages = () => {
  const pagesArr = pages.filter(
    (item) => item.key.toLowerCase() == npm_page.toLowerCase()
  );
  if (npm_page && !pagesArr.length)
    errorLog(
      "-----------------------不存在此页面，请检查页面名称！-------------------------"
    );
    //开发环境运行根目录项目（main）
    let entry = npm_page === 'main' && ENV === 'development' ? 'src/Projects/index.html' : `src/Projects/${npm_page}/index.html`
  return {
    [npm_page]: path.resolve(__dirname, entry),
  };
  
};
//项目打包输入文件  main 设为根目录项目
const getOutDir = () => {
  if (npm_page === "main") {
    return path.resolve(__dirname, `dist`);
  } else {
    return path.resolve(__dirname, `dist/${npm_page}`);
  } 
};

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname, `./src/Projects/${npm_page}`),
  base: ENV === 'development' ? '/' : "./",
  envDir: path.resolve(__dirname),
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@Projects': path.join(__dirname, './src/Projects')
    }
  },
  build: {
    outDir: getOutDir(),
    emptyOutDir:true,
    rollupOptions: {
      input: getEnterPages(),
      output: {
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        compact: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString(); 
          }
        },
      },
    },
  },
  server: {
    // 运行端口
    host:"0.0.0.0",
    port: 1648,
  },
});
