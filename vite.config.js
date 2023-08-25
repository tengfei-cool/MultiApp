import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import chalk from "chalk";
import pages from "./pages.json" assert { type: "json" };

//基础配置
const config = {
  main: "main", //主程序项目（根目录下）
  outDirName: "dist", //打包输出文件夹名称
};

const ENV = process.env.NODE_ENV;

const npm_page = process.env.npm_config_page || "";

const errorLog = (error) => console.log(chalk.red(`${error}`));

const getEnters = () => {
  const pagesArr = pages.filter(
    (item) => item.key.toLowerCase() == npm_page.toLowerCase()
  );
  if (npm_page && !pagesArr.length)
    errorLog(
      "-----------------------不存在此页面，请检查页面名称！-------------------------"
    );

  if (!npm_page) {
    //打包所有 (npm run build)
    let options = {};
    pages.map((item) => {
      let entry =
        item.key === config.main ? "src/Projects/index.html" : item.entry;
      options[item.key] = path.resolve(__dirname, entry);
    });
    return options;
  } else {
    //开发环境运行根目录项目（main）
    let entry =
      npm_page === config.main && ENV === "development"
        ? "src/Projects/index.html"
        : `src/Projects/${npm_page}/index.html`;
    return {
      [npm_page]: path.resolve(__dirname, entry),
    };
  }
};
//项目打包输入文件  main 设为根目录项目
const getOutDir = () => {
  if (npm_page === config.main) {
    return path.resolve(__dirname, `${config.outDirName}`);
  } else {
    return path.resolve(__dirname, `${config.outDirName}/${npm_page}`);
  }
};

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname, `./src/Projects/${npm_page}`),
  base: ENV === "development" ? "/" : "./",
  envDir: path.resolve(__dirname),
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "@Projects": path.join(__dirname, "./src/Projects"),
    },
  },
  build: {
    outDir: getOutDir(),
    emptyOutDir: true,
    rollupOptions: {
      input: getEnters(),
      output: {
        // 输出文件区分到 css、js、assets 文件夹下
        assetFileNames: (file)=>{
          if(file.name.includes('.css')){
            return "css/[name]-[hash].[ext]"
          }else{
            return "assets/[name]-[hash].[ext]"
          }
        },
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
    host: "0.0.0.0",
    port: 1648,
  },
});
