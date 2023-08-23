import config from './config'
import crypto from './crypto'
export class Storage {
    constructor(){
        this.prefix = config.prefix || 'RX_DATA_'
    }
    getName(name){
        return this.prefix + name.toUpperCase()
    }
    set(name,value){
        if(value){
            value = JSON.stringify(value)
            if(config.secret){
                value = crypto.encrypt(value)
            }
        }
        window.localStorage.setItem(this.getName(name),value)
    }
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
    remove(name){
        window.localStorage.removeItem(this.getName(name))
    }
}
export default new Storage()