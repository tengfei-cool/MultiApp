export default class Sandbox {
    constructor(name) {
        this.name = name
        this.modifiedProps = {}
        this.windowSnapshot = {}
    }
    //激活沙箱
    activeSandbox() {
        this.windowSnapshot = {}
        for (let key in window) {
            this.windowSnapshot[key] = window[key]
        }

        Object.keys(this.modifiedProps).forEach(propName => {
            window[propName] = this.modifiedProps[propName]
        })
    }
    //关闭沙箱
    inactiveSandbox() {
        for (let key in window) {
            if (this.windowSnapshot[key] !== window[key]) {
                this.modifiedProps[key] = window[key]
                window[key] = this.windowSnapshot[key]
            }
        }
    }
}