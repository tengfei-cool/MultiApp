import chalk from "chalk";
import path from "path";
import fs from "fs";

// 命令行参数
const args = process.argv.splice(2);

const resolve = (__dirname, ...file) => path.resolve(__dirname, ...file);
const log = (message) => console.log(chalk.green(`${message}`));
const successLog = (message) => console.log(chalk.blue(`${message}`));
const errorLog = (error) => console.log(chalk.red(`${error}`));

// 判断文件夹是否存在，不存在创建一个
const isExist = (path) => {
  return fs.existsSync(path);
};

if (!args.length) {
  log("请输入要删除的项目");
  process.stdin.on("data", async (chunk) => {
    const projectName = String(chunk).trim().toString();
    const path = `./src/Projects/${projectName}`;
    if (isExist(path)) {
      remove(path,projectName);
    } else {
      errorLog("项目不存在");
    }
  });
  process.stdin.on("end", () => {
    console.log("exit");
    process.exit();
  });
} else {
  const projectName = args[0];
  const path = `./src/Projects/${projectName}`;
  if (isExist(path)) {
    remove(path,projectName);
  } else {
    errorLog("项目不存在");
  }
}
async function remove(path,name) {
  try {
    if (fs.existsSync(path)) {
      await fs.readdirSync(path).forEach((file, index) => {
        const curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          remove(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  } catch (error) {
    setTimeout(()=>{
      fs.rmdirSync(path);
    },1000)
  }
  
  process.stdin.emit("end");
  readPages(name)
}
function setFile(datas) {
  // 通过writeFile改变数据内容
  fs.writeFile(
    path.resolve('./', 'pages.json'),
    JSON.stringify(datas),
    'utf-8',
    (err) => {
      if (err) throw err
    }
  )
}

function readPages (name) {
// pages.json文件内容，获取当前已有的页面集合
fs.readFile(
  path.resolve('./', 'pages.json'),
  'utf-8',
  (err, data) => {
    if (err) throw err
    let datas = JSON.parse(data)
    let index = datas.findIndex((ele) => {
      return ele.key == name
    })
    if (index !== -1) {
      datas.splice(index,1)
      setFile(datas)
    }
  }
)
}