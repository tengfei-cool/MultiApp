import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

// 命令行参数
const args = process.argv.splice(2);

const resolve = (__dirname, ...file) => path.resolve(__dirname, ...file)
const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const errorLog = (error) => console.log(chalk.red(`${error}`))
if(args.length){
  let content = args[0]
  createProject(content)
}else{
  log('请输入要生成的" 项目名称:项目描述 "、会生成在 /src/Projects 目录下')
  process.stdin.on('data', async (chunk) => {
    const content = String(chunk).trim().toString()
    const inputSearch = content.search(':')
    if (inputSearch == -1) {
      errorLog('格式错误，请重新输入')
      return
    }
    createProject(content)

  })
  process.stdin.on('end', () => {
    console.log('exit')
    process.exit()
  })
}

// 判断文件夹是否存在，不存在创建一个
const isExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

//递归复制模版文件夹内的文件
const copyFile = (sourcePath, targetPath,projectName) => {
  const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })
  sourceFile.forEach((file) => {
    const newSourcePath = path.resolve(sourcePath, file.name)
    const newTargetPath = path.resolve(targetPath, file.name)
    //isDirectory() 判断这个文件是否是文件夹，是就继续递归复制其内容
    if (file.isDirectory()) {
      isExist(newTargetPath)
      copyFile(newSourcePath, newTargetPath,projectName)
    } else {
      fs.copyFileSync(newSourcePath, newTargetPath)

      //更改路由配置数据
      if(file.name === 'routes.js'){
        fs.readFile(
          path.resolve(newTargetPath),
          'utf-8',
          (err, data) => {
            // 正则匹配
            let datas = JSON.stringify(data).replace(/页面名称/g,projectName)
            fs.writeFile(
              path.resolve(newTargetPath),
              JSON.parse(datas),
              'utf-8',
              (err) => {
                if (err) throw err
              }
            )
          }
        )
      }
      if(file.name === 'index.vue'){
        fs.readFile(
          path.resolve(newTargetPath),
          'utf-8',
          (err, data) => {
            // 正则匹配
            let datas = JSON.stringify(data).replace(/首页/g,`这是${projectName}首页`)
            fs.writeFile(
              path.resolve(newTargetPath),
              JSON.parse(datas),
              'utf-8',
              (err) => {
                if (err) throw err
              }
            )
          }
        )
      }

    }
  })
}
  /**
   * 改变pages.json
   */
  function setFile(datas,targetPath,inputName) {
    // 通过writeFile改变数据内容
    fs.writeFile(
      path.resolve('./', 'pages.json'),
      JSON.stringify(datas),
      'utf-8',
      (err) => {
        if (err) throw err
        // 在Projects中建立新的目录
        fs.mkdirSync(targetPath)
        const sourcePath = resolve('./build/template')
        copyFile(sourcePath, targetPath,inputName)
        process.stdin.emit('end')
      }
    )
  }

 function readPages (inputName,inputDesc,targetPath) {
  // pages.json文件内容，获取当前已有的页面集合
  fs.readFile(
    path.resolve('./', 'pages.json'),
    'utf-8',
    (err, data) => {
      if (err) throw err
      //获取老数据
      let datas = JSON.parse(data)
      //和老数据去重
      let index = datas.findIndex((ele) => {
        return ele.chunk == inputName
      })
      if (index == -1) {
        //写入新页面的信息
        let obj = {
          key: inputName,
          entry:`src/Projects/${inputName}/index.html`,
          desc: inputDesc
        }
        datas.push(obj)
        setFile(datas,targetPath,inputName)
      }
    }
  )
}
//创建项目
function createProject(content){
  //项目名称
  const inputName = content.split(':')[0]
  //项目描述
  const inputDesc = content.split(':')[1] || inputName
  successLog(`将在 /src/Projects 目录下创建 ${inputName} 文件夹`)
  const targetPath = resolve('./src/Projects', inputName)
  // 判断同名文件夹是否存在
  const pageExists = fs.existsSync(targetPath)
  if (pageExists) {
    errorLog('项目已经存在，请重新输入')
    return
  }
  readPages(inputName,inputDesc,targetPath)
}