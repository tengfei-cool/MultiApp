class Listener {
  constructor(channel) {
    this.bc = new BroadcastChannel(channel);
  }
  onmessage(key, fun) {
    this.bc.onmessage = (event) => {
      if (event.data.prop === key) {
        fun(event.data.value);
      }else if(key === 'data'){
        fun(rx.store.data);
      }
    };
  }
  postmessage(data) {
    this.bc.postMessage(data);
  }
}
export default Listener

