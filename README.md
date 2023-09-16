## Vue 3 + Vite 多页面开发

#### 1. 目录结构

```js
    |-- dist       项目打包文件
         └── 根目录项目文件 （例：main 打包的静态文件）
         └── 项目1
         └── 项目2
    |-- public     静态资源
    |-- multiApp   多页面公用插件
        |--config.js         插件配置
        |--sandbox.js        js沙箱
        |--page.js           页面跳转       //内置插件
        |--store.js          数据存贮通信   //内置插件
        |--event.js          事件监听       //内置插件
        |--crypto.js         加密插件       //内置插件
        |--http              axios请求      //内置插件
        |--storage.js        本地存储       //内置插件
        |-- ···              自定义插件
    |-- build      项目脚本
        |-- template       新建项目模板
              └── ···
        |-- index          项目打包脚本
        |-- create.mjs     创建项目运行脚本
        |-- remove.mjs     删除项目运行脚本
    |-- src        项目资源目录
        |-- assets         全局项目静态资源
        |-- common         全局方法公共库
        |-- components     全局公用组件
        |-- style          公共样式模块
        |-- Projects       项目文件夹
             └── 项目1
                  └── assets        子项目静态文件
                  └── components    子项目组件
                  └── App.vue       入口根节点
                  └── index.html    入口页面
                  └── main.js       入口页面文件
                  └── ···           其他配置
             └── 项目2
                  └── ···
             └──index.html     根目录项目入口文件（开发环境）
    |-- .gitignore         gitignore配置
    |-- pages.json         子项目项目配置
    |-- Conponents.md      项目公共组件使用说明
    |-- vite.config.ts     项目打包配置文件

```

#### 2. 创建子项目

```js
   //项目生成在指定文件 src/Projects 下

   npm run new:page 项目名称:项目描述
```

或

```js
   1. npm run new:page

   //请输入要生成的" 项目名称:项目描述 "、会生成在 /src/Projects 目录下

   2. 项目名称:项目描述
```

#### 3. 运行项目

- ##### 运行单个项目

```js
   npm run dev --page=项目名称
```

- ##### 运行所有项目

```js
   npm run dev

   注：本地运行所有项目,访问路径需要输入对应项目地址 （如：'http://127.0.0.1:1648/main/'）
```

#### 4. 项目打包

- ##### 打包单个项目

```js
   npm run build --page=项目名称

   或

   node build 项目名称
```

- ##### 打包多个项目

```js
   node build 项目1 项目2
```

- ##### 打包所有项目

```js
   node build   // 分开打包，静态资源生成在各自的文件夹下

   或

   npm run build  // 所有静态资源都输出在一起,公用资源去重 (推荐使用)
```

#### 5. 删除项目

```js
   npm run remove:page 项目名称
```

#### 6. multiApp 插件的使用

```js
//main.js
import multiApp from "@/multiApp";
const app = createApp(App);

//注册插件
app.use(multiApp);

//使用
rx.插件名称;
```

- ##### sandbox ( diff 沙箱 )

  ```js
  let sandbox = new rx.Sandbox();

  sandbox.activeSandbox(); // 激活沙箱

  window.city = "上海";

  sandbox.inactiveSandbox(); //卸载沙箱
  ```

- ##### page ( 页面跳转 )

  - aLink

  ```js
  //使用 （params 参数 target 是否当前窗口打开）

  rx.page.aLink("http://www.baidu.com", "_blank");
  ```

  - push

  ```js
     //使用 （params 参数 target 是否当前窗口打开）

     rx.page.push('http://www.baidu.com','_blank')  //同aLink

     rx.page.push('/admin/','_blank')  // 跳转 admin 项目并打开新的窗口

     rx.page.push({ path:"/admin/", query:{···}},'_self')   // 跳转 admin 项目并传参

  ```

  - back 

  ```js
  //页面返回(新窗口打开无效)

  rx.page.back();
  ```

  - go

  ```js
  //同 history.go()

  rx.page.go(n);
  ```

  
* ##### event （监听事件）
   ```js
    const count = ref(0)

    //点击触发count变化
    const submit = () => {
      count.value ++
      //触发监听事件
      rx.event.dispatch('storeEvent','count',count.value)
    }


    //监听事件变化
    onMounted(() =>{
      rx.event.listener('storeEvent',(e)=>{
         console.log(e)
      })
    })

    //删除监听事件
    rx.event.remove('storeEvent')

    storeEvent // 内置监听事件

    storageEvent // 内置监听事件

   ```

* ##### store （数据存储通信）

  1. 数据存储 ( 所有项目共用 )

  ```js
  //保存
  rx.store.token = "123";

  rx.store.userInfo = { name: "内容" };

  rx.store.setData("token", "123");

  //获取单个数据
  let token = rx.store.token;
  console.log(token); // 123

  //获取所有数据
  let data = rx.store.data;
  console.log(data); // {token:'123',userInfo:{name:'内容'}}
  ```

  2. setData()

  ```js
  //保存数据
  rx.store.setData("token", "123");
  ```

  3. clear()

  ```js
  //清除单个数据
  rx.store.clear("token");

  //清除多个数据
  rx.store.clear("token", "userInfo");
  ```

  4. clearAll()

  ```js
  //清除所有数据
  rx.store.clearAll();
  ```

  5. 数据监听 listener

  ```js
   import {ref} from 'vue'
   import {listener} from '@multiApp'

   //监听store中count的变化
   listener("count",(val)=>{
      num.value = val
   })

   //监听store中所有数据的变化
   listener("data",(val)=>{
      data.value = val
   })
  ```

* ##### crypto

  ```js
  let str = "内容";
  //加密
  let encryptData = rx.crypto.encrypt(str);
  console.log(encryptData); //  sD9mfmXS7ggy1aFO2TBk0Q==

  //解密
  let decryptData = rx.crypto.decrypt(encryptData);
  console.log(decryptData); // 内容
  ```

* ##### storage

  ```js
  //存储
  rx.storage.set("name", "内容");

  //获取
  let data = rx.storage.get("name");
  console.log(data); // 内容

  //删除
  rx.storage.remove("name");
  ```

* ##### http

  ```js
  //请求/返回拦截、鉴权等，根据业务需求自行配置

  //使用
  export const login = (data) => {
    return rx.http.request({
      url: "web/login", //接口配置
      data, //请求参数
      method: "post", //请求方法（默认post请求）
    });
  };
  ```

- ##### 注册自定义插件

  ```js
     //main.js
     import multiApp from '@/multiApp'

     multiApp.use( pluginName, function);

     //例
     multiApp.use('test',()=>{
         console.log('this is test plugin ！！')
     });
     //使用
     rx.test()    // this is test plugin ！！

  ```

#### 7. vite.config.js

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import chalk from "chalk";
import pages from "./pages.json" assert { type: "json" };
import config from './src/config.js'

//环境
const ENV = process.env.NODE_ENV;
//项目名称
const npm_page = process.env.npm_config_page || "";
const errorLog = (error) => console.log(chalk.red(`${error}`));
//获取打包运行入口
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
      "@multiApp": path.join(__dirname, "./src/multiApp"),
      "@services": path.join(__dirname, "./src/services"),
    },
  },
  build: {
    outDir: getOutDir(),
    emptyOutDir: true, //清空文件夹
    rollupOptions: {
      input: getEnters(),
      output: {
        // 输出文件区分到 css、js、assets 文件夹下
        assetFileNames: (file) => {
          if (file.name.includes(".css")) {
            return "css/[name]-[hash].[ext]";
          } else {
            return "assets/[name]-[hash].[ext]";
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
  // 运行服务端口
  server: {
    host: "0.0.0.0",
    port: 2000,
  },
});
```
