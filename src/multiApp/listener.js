class Listener {
  constructor(channel) {
    this.bc = new BroadcastChannel(channel);
  }
  //接收消息
  onmessage(key, fun) {
    this.bc.onmessage = (event) => {
      if (event.data.prop === key) {
        fun(event.data.value);
      }else if(key === 'data'){
        fun(rx.store.data);
      }
    };
  }
  //发送消息
  postmessage(data) {
    this.bc.postMessage(data);
  }
}
export default Listener

