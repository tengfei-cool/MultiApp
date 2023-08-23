import CryptoJS from "crypto-js";
import config from './config'
export class Crypto {
    constructor(){
        this.secretKey = config.secretKey || 'rx_123'
    }
    /**
     * 获取key
     * @param keyStr key字符串
     */
    getKey() {
        return CryptoJS.enc.Utf8.parse(this.secretKey);
    }

    /**
     * 获取iv
     * @returns {*}
     */
    getIv() {
        return CryptoJS.enc.Utf8.parse(this.secretKey);
    }
     /**
     * 加密
     * @param {*} data   加密前字符串
     * @return 加密后内容
     */
     encrypt(data) {
        let key = this.getKey();
        let iv = this.getIv();
        if(typeof data == 'object'){
            try{
                data = JSON.stringify(data)
            } catch (error){
                throw SyntaxError("encrypt error:", error)
            }
        }
        let srcs = CryptoJS.enc.Utf8.parse(data);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    }
    /**
     * 加密
     * @param {*} data   解密前字符串
     * @return 解密后内容
     */
    decrypt(data) {
        let key = this.getKey();
        let iv = this.getIv();
        let base64 = CryptoJS.enc.Base64.parse(data);
        let src = CryptoJS.enc.Base64.stringify(base64);
        let decrypt = CryptoJS.AES.decrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}
export default new Crypto()