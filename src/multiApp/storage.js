import config from '@/config'
import crypto from './crypto'
import event from './event'
export class Storage {
    constructor(){
        this.prefix = config.prefix || 'RX_DATA_'
    }
    getName(name){
        return this.prefix + name.toUpperCase()
    }
    //存储本地
    set(name,value){
        if(value){
            value = JSON.stringify(value)
            if(config.secret){
                value = crypto.encrypt(value)
            }
        }
        window.localStorage.setItem(this.getName(name),value)
        event.dispatch('storageEvent',name,value)
    }
    //获取本地数据
    get(name){
        let data = window.localStorage.getItem(this.getName(name))
        if(data){
            if(config.secret){
                data = crypto.decrypt(data)
            }
            data = JSON.parse(data)
        }
        return data
    }
    //删除数据
    remove(name){
        window.localStorage.removeItem(this.getName(name))
    }
}
export default new Storage()