import {px2dp} from "../utils";
import {Animated, Easing} from 'react-native'
import { Toast } from 'antd-mobile-rn'
import * as server from '../servers'
import {StorageUtil} from "../utils/storage";
export default {
    namespace: 'User',
    state: {
        userInfo:undefined,
        citylist:[],
        islogin:false,
        phone:'',
    },
    reducers: {
        /**
         * 处理同步的action
         */
        update(state,{payload}) {
            return { ...state, ...payload }
        },

    },
    effects: {
        *logout({callback=()=>{},payload},{put}){
            yield put({
                type:'update',
                payload:payload
            })
            callback()
        },
        *userInfo({callback=()=>{},payload},{call,put}){
            const response = yield call(server.user,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            yield put({
                type:'update',
                payload:{
                    userInfo:response && response.res,
                    islogin:true
                }
            });
            callback(response)
        },
        *getcode({callback=()=>{},payload},{call,put}){
            const response = yield call(server.code,payload);
            //if(response.status !== 200 ) return Toast.fail(response.message);
            callback(response)
        },
        *trylogin({callback=()=>{},payload},{call,put}){
            const response = yield call(server.login,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            callback(response)
        },
        *loginpass({callback=()=>{},payload},{call,put}){
            const response = yield call(server.loginpass,payload);
            //if(response.status !== 200 ) return Toast.fail(response.message);
            callback(response)
        },
        *sign({callback=()=>{},payload},{call,put}){
            const response = yield call(server.sign,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            callback(response)
        },
        *sex({callback=()=>{},payload},{call,put,select}){
            const { phone } = yield select(state => state.User);
            const response = yield call(server.sexc,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            Toast.info('修改成功',2,null,false);
            yield put({
                type:'userInfo',
                payload:{
                    phone:phone
                }
            })
        },
        *setname({callback=()=>{},payload},{call,put,select}){
            const { phone } = yield select(state => state.User);
            const response = yield call(server.setname,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            //console.log(response);
            yield put({
                type:'userInfo',
                payload:{
                    phone:phone
                }
            });
            Toast.success('修改成功',2,null,false)
            callback(response);
        },
        *content({callback=()=>{},payload},{call}){
            const response = yield call(server.content,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            Toast.info('已提提交您的反馈',2,null,false);
            callback(response);
        },
        *invites({callback=()=>{},payload},{call}){
            const response = yield call(server.invite,payload);
            //let data = JSON.stringify(response)
            //console.log(data)
            //if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            callback(response);

        },
        *findpass({callback=()=>{},payload},{call,put,select}){
            const response = yield call(server.findpass,payload);
            console.log(response)
            callback(response)
        }
    }

}