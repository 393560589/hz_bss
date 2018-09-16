import {instance} from '../utils/axios'
import { API } from '../config/keyword'
//http://bitss.vip/mobile/MobileInterface/broadcast_img
export const code=(params)=>{
    return instance.post(API.code,params)
};//发送验证码 123456
export const login=(params)=>{
    return instance.post(API.login,params)
}//登录
export const loginpass=(params)=>{
    return instance.post(API.loginpass,params)
}
export const swiper=(params)=>{
    return instance.post(API.banner,params)
}//首页轮播
export const sign=(params)=>{
    return instance.post(API.sign,params)
} // 注册
export const user=(params)=>{
    return instance.post(API.user,params)

}
export const navigatioin = (params) => {
    return instance.get(API.navigation, params)
}
export const sexc=(params)=> {
    return instance.post(API.sexc, params)
}
export const indexNews = (params) => {
    return instance.get(API.indexNews, {params})
}
export const setname = (params) =>{
    return instance.post(API.setname,params)
}
export const content=(params)=>{
    return instance.post(API.content,params)
}
export const invite = (params) =>{
    return instance.post(API.invite,params)
}
export const findpass=(params)=>{
    return instance.post(API.findpass,params)
}