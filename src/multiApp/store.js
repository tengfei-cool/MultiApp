import config from '@/config'
import Storage from './storage'
import event from './event'
import Listener from './listener'
const storeName = `STORE_${config.appName || 'DATA'}`
const listener = new Listener('store-channel')
//清除数据
function clear (...args) {
    if(args.length){
        args.map(item=>{
            this[item] = null
            delete this[item]
        })        
        setStore()
    }
}
//清除所有数据
function clearAll () {
    for(let key in this.data){
        this[key] = null
        delete this[key]
    }
    Storage.remove(storeName)
}
//设置单个数据
function setData (key,value) {
    this.data[key] = value
    setStore()
}

const Store = {
    data:{},
    clear,
    clearAll,
    setData
}
//保存数据到本地
const setStore = () => {
    Storage.set(storeName, Store.data)
}
//获取本地数据
const getStore = () => {
    return Storage.get(storeName)
}
//刷新前自动保存数据，防止本地数据丢失
(()=>{
    let storeData = getStore()
    if(storeData){
        for(let key in storeData){
            Store.data[key] = storeData[key]
        }
    }
    window.addEventListener('beforeunload',()=>{
        setStore()
    })
})(this)

export default new Proxy(Store,{
    deleteProperty(target, prop){
        if(target[prop]){
            throw SyntaxError(`${prop}为内置变量，禁止删除`)
        }
        delete target['data'][prop]
        return true
    },
    set(target,prop,value){
        if(target[prop]){
            throw SyntaxError(`${prop}为内置变量，不允许修改`)
        }
        target['data'][prop] = value
        setStore()
        event.dispatch('storeEvent',prop,value)
        listener.postmessage({prop,value})
        return true
    },
    get(target,prop){
        let storeData = getStore()
        if(storeData){
            for(let key in storeData){
                target.data[key] = storeData[key]
            }
        }
        if(target[prop]){
            return target[prop]
        }else{
            return target.data[prop]
        }
    },
})
