## Vue 3 + Vite 多页面开发

#### 1. 目录结构

```js
    |-- dist       项目打包文件
         └── 根目录项目文件 （例：main 打包的静态文件）
         └── 项目1
         └── 项目2
    |-- public     静态资源
    |-- multiApp   多页面公用插件
        |--config.js         共有插件配置
        |--sandbox.js        js沙箱
        |--page.js           页面跳转       //内置插件
        |--store.js          数据存贮通信   //内置插件
        |--crypto.js         加密插件       //内置插件
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
    |-- vite.config.ts     项目打包配置文件

```

#### 2. 创建子项目

```js
   //项目生成咋指定文件 src/Projects 下

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
   node build

   或

   npm run build  //不推荐使用（所有静态资源都输出在一起）
```

#### 5. 删除项目

```js
   npm run remove:page 项目名称
```

#### 6. multiApp 插件的使用
```js
   //main.js
   import multiApp from '@/multiApp'
   const app = createApp(App)

   //注册插件
   app.use(multiApp)

   //使用 
   rx.plugin
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

     rx.page.aLink('http://www.baidu.com','_blank')
  ```

  - push
  ```js
     //使用 （params 参数 target 是否当前窗口打开）

     rx.page.push('http://www.baidu.com','_blank')  //同aLink

     rx.page.push('/admin/','_blank')  // 跳转 admin 项目并打开新的窗口

     rx.page.push({ path:"/admin/", query:{···}},'_self_')   // 跳转 admin 项目并传参

  ```
  - back
  ```js
     //页面返回

     rx.page.back()
  ```
  - go
  ```js
     //同 history.go()

     rx.page.go(n)
  ```
* ##### store （数据存储通信）
  1. 数据存储 ( 所有项目均可使用 )
  ```js
     //保存 
     rx.store.token = '123'

     rx.store.userInfo = {name:'融象数科'}

     rx.store.setData('token','123')

     //获取单个数据
     let token = rx.store.token
     console.log(token)   // 123

     //获取所有数据
     let data = rx.store.data
     console.log(data) // {token:'123',userInfo:{name:'融象数科'}}
  ```

  2. setData()
  ```js
    //保存数据
    rx.store.setData('token','123')
  ```
  3. clear()
  ```js
    //清除单个数据
    rx.store.clear('token')
  ```
  4. clearAll()
  ```js
    //清除所有数据
    rx.store.clearAll()
  ```

* ##### crypto

* ##### storage
* ##### http

* ##### 注册自定义插件
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