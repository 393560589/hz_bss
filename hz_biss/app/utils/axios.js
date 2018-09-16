/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import React,{Component} from 'react'
import {
    Platform
} from 'react-native';
var DeviceInfo = require('react-native-device-info');

import axios from 'axios';
import { StorageUtil } from "./storage";
import { StringName } from '../config/keyword'

//var Buffer = require('buffer').Buffer;
/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
const MOCK_AUTH_ADMIN = 'http://bitss.vip/mobile/';
//http://bitss.vip/mobile/
/*

const Tool = {
    projectName: '1',   //2
    projectVersion: '1.0.0',
    bundleVersion: '1',
    APIVersion: 'API0',
    platform: Platform.OS === 'ios' ? 'iphone' : 'android',
    deviceId:DeviceInfo.getUniqueID(),
};

Tool.ua = Tool.projectName + ';'+ Tool.projectVersion +';'+ Tool.bundleVersion +';'+ Tool.APIVersion +';'+ Tool.platform +';' + Tool.deviceId;
*/

const instance = axios.create({
    withCredentials:true,
    timeout:100000,
    baseURL:MOCK_AUTH_ADMIN,

})

//添加请求拦截器

instance.interceptors.request.use(
    async config => {
        //let data = await StorageUtil.get(StringName.USER_INFO);
        //if(!data) return config;
        //let base = new Buffer(data.tokenId+':'+data.token).toString('base64');
        //config.headers.Authorization ='Basic ' + base;
        return config;
    },
    err => {
        return Promise.reject(err);
    });


instance.interceptors.response.use(response=>{

    try{
        return response.data
    }catch (e) {
        console.log(e)
    }

});


export {
    instance
}
