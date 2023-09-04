import axios from "axios";
import ErrorHandler from "./error";

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = [];
    this.cancelToken = axios.CancelToken; //axios内置的中断ajax的方法
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'content-type': "application/json",
        token: rx.store.token,
      },
    };
    console.log(config,'config')
    return config;
  }
  //自定义接口标识
  identify(config) {
    return `${config.url}_${config.method}`;
  }
  //删除队列
  removeQueue(config) {
    for (let i = 0, size = this.queue.length; i < size; i++) {
      const task = this.queue[i];
      if (task.identify === this.identify(config)) {
        task.cancel();
        this.queue.splice(i, 1);
      }
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        this.removeQueue(config); // 中断之前的同名请求
        // 添加cancelToken
        config.cancelToken = new this.cancelToken((c) => {
          this.queue.push({ identify: this.identify(config), cancel: c });
        });
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use((res) => {
      // 在请求完成后，自动移出队列
      this.removeQueue(res.config);
      const { data, status } = res;
      return { data, status };
    }, ErrorHandler);
  }
  request(options) {
    const instance = axios.create();
    if (!options.method) {
      options.method = "post";
    }
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
