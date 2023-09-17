class EventObj {
    constructor(){
        this.events = []
    }
    //发送事件
    dispatch(eventName,key,value){
        if(!this.events.includes(eventName)){
            this.events.push(eventName)
        }
        let setEvent = new Event(eventName);
        setEvent.key = key
        setEvent.value = value
        window.dispatchEvent(setEvent)
    }
    //监听事件
    listener(eventName,fun){
        window.addEventListener(eventName, function (e) {
            return fun(e);
        });
    }
    //删除事件
    remove(eventName){
        if(this.events.includes(eventName)){
            window.removeEventListener(eventName)
        }
    }

}
export default new EventObj()

