## Vue 3 + Vite 多页面开发

#### 1. 目录结构
``` js
    |-- dist       项目打包文件
         └── 根目录项目文件 （例：main 打包的静态文件）
         └── 项目1
         └── 项目2
    |-- public     静态资源
    |-- multiApp   多页面公用文件    
        |--sandbox        js沙箱  
        |--store.js       数据存贮通信 
        |--page           页面跳转 
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
   npm run new:page 项目名称:项目描述
```
 或
```js
   1. npm run new:page 

   //请输入要生成的" 项目名称:项目描述 "、会生成在 /src/Projects 目录下

   2. 项目名称:项目描述
```
#### 3. 运行项目
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a. 运行单个项目
```js
   npm run dev --page=项目名称
```
 ##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b. 运行所有项目
```js
   npm run dev 

   注：本地运行所有项目,访问路径需要输入对应项目地址 （如：'http://127.0.0.1:1648/main/'）
```

#### 4. 项目打包
注：打包生成dist文件，
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a. 打包单个项目
```js
   npm run build --page=项目名称

   或

   node build 项目名称
```
 ##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b. 打包多个项目

```js
   node build 项目1 项目2
```
 ##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c. 打包所有项目
```js
   node build
```
#### 5. 删除项目
```js
   npm run remove:page 项目名称
```