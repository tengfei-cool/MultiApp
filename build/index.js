
import cprocess from 'child_process'
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const pages = require("../pages.json") 
// import pages from '../pages.json' assert { type: 'json' }  ndoe 16.16 + 版本可使用

// 命令行参数
const args = process.argv.splice(2);

// 构建命令
const runBuild = function (page) {
  cprocess.execSync('cnpm install', {
    stdio: [0, 1, 2],
  });
  cprocess.execSync(`cnpm run build --page=${page}`, {
    stdio: [0, 1, 2],
  });
};
// 项目打包
const gorun = function () {
  if (args.length == 0) {
    pages.forEach((element) => {
      runBuild(element.key);
    });
  }else{
    args.map(item=>{
      runBuild(item);
    })
  }
};

// 主程序
gorun();
