function updateWindowProps (prop, value, isDelete) {
    if(value === undefined || isDelete){
        // 删除属性
        delete window[prop];
    } else {
        // 更新属性
        window[prop] = value;
    }
}
export default class sandbox {
	constructor(name) {
        // 代理沙箱名称
        this.name = name;
        // 沙箱全局对象
        const sandboxWindow = Object.create(null);
        // sandboxWindow 代理
        this.proxy = null;
        // 记录新增加的属性
        this.addedPropsMap = new Map();
        // 记录更新的属性
        this.updatedPropsMap = new Map();
        // 记录所有有更改记录的属性（新增/修改）
        this.allChangedPropsMap = new Map()
        
        const proxy = new Proxy(sandboxWindow, {
            get(target, prop) {
                return window[prop]
            },
            set(target, prop, value){
                if(!window.hasOwnProperty(prop)) {
                    // window 对象上没有属性，记录新增
                    this.addedPropsMap.set(prop, value);
                } else if(!this.updatedPropsMap.has(prop)) {
                    // window 对像上已经存在的值，但是还没有更新，记录更新
                    const orgVal = window[prop]
                    this.updatedPropsMap.set(prop, orgVal);
                }
                // 记录所有变更的对象
                this.allChangedPropsMap.set(prop, value);
                // 更改window对象
                updateWindow(prop, value);
                return true;
            }
        });
        
        this.proxy = proxy
    }
    
    // 激活沙箱
    active() {
        // 更新当前记录的所有属性
        this.allChangedPropsMap.forEach((val, prop) => updateWindow(prop, val));
    }
    
    // 关闭沙箱
    inactive() {
        // 还原所有更新过的属性
        this.updatedPropsMap.forEach((val, prop) => updateWindow(prop, val));
        // 删除所有沙箱内新添加的属性
        this.addedPropsMap.forEach((_, prop) => updateWindow(prop, undefined, true))
    }
}