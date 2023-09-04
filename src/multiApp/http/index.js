import HttpRequest from './axios'
const baseUrl = import.meta.env.VITE_BASE_API
const http = new HttpRequest(baseUrl)
export default http