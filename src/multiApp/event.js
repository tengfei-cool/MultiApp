class EventObj {
    constructor(){
        this.events = []
    }
    dispatch(eventName,key,value){
        if(!this.events.includes(eventName)){
            this.events.push(eventName)
        }
        let setEvent = new Event(eventName);
        setEvent.key = key
        setEvent.newValue = value
        window.dispatchEvent(setEvent)
    }
    listener(eventName,fun){
        window.addEventListener(eventName, function (e) {
            return fun(e);
        });
    }
    remove(eventName){
        if(this.events.includes(eventName)){
            window.removeEventListener(eventName)
        }
    }

}
export default new EventObj()

