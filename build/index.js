
import pages from '../pages.json' assert { type: 'json' }
import cprocess from 'child_process'

// 命令行参数
const args = process.argv.splice(2);

// 构建命令
const runBuild = function (page) {
  cprocess.execSync('npm install', {
    stdio: [0, 1, 2],
  });
  cprocess.execSync(`npm run build --page=${page}`, {
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
