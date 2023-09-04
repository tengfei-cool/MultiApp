import Sandbox from "./sandbox";
import page from "./page";
import store from "./store";
import crypto from "./crypto";
import storage from "./storage";
import http from "./http";

export default {
  rx: {
    page,
    store,
    Sandbox,
    crypto,
    storage,
    http
  },
  sandbox: new Sandbox("diff沙箱"),
  
  initSandbox() {
    this.sandbox.activeSandbox();
    if (!window.rx) {
      window.rx = {};
    }
  },
  //注册插件
  install(app) {
    this.initSandbox();
    Object.assign(window.rx, this.rx);
  },
  //自定义插件
  use(name, fun) {
    this.initSandbox();
    if(this.rx[name]) throw RangeError('内置插件不允许修改') 
    if(window.rx[name])  throw RangeError(`${name}插件已存在`) 
    let obj = new Object();
    obj[name] = fun;
    Object.assign(window.rx, obj);
  },
};
