//获取拼接
function setQuery(path, query = {}) {
  let arr = [];
  for (let key in query) {
    arr.push(`${key}=${query[key]}`);
  }
  let url = `${path}?${arr.join("&")}`;
  if (!path.includes("http")) {
    url = url.replace(/\/\//g, "/");
    url = window.location.origin + url;
  } else {
    url = window.location.origin + url;
  }
  return url;
}
export class Page {
  //创建a标签实现跳转
  aLink(path, target) {
    let a = document.createElement("a");
    let id = "id_a_" + new Date().getTime();
    a.setAttribute("href", path);
    a.setAttribute("id", id);
    a.setAttribute("target", target);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(document.getElementById(id));
  }

  push(params, target = "_self") {
    if (params.constructor == String) {
      if (params.includes("http")) {
        this.aLink(params, target);
      } else {
        this.aLink(window.location.origin + params, target);
      }
    } else if (params.constructor === Object) {
      if (params.path) {
        this.aLink(setQuery(params.path, params.query), target);
      } else {
        throw SyntaxError("未检测到path地址");
      }
    } else {
      throw TypeError("请输入正确路由信息");
    }
  }
  //返回
  back() {
    window.history.go(-1);
  }
  go(n) {
    window.history.go(n);
  }
}

export default new Page()
