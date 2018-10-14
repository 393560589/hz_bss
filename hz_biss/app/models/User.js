import {px2dp} from "../utils";
import {Animated, Easing} from 'react-native'
import { Toast } from 'antd-mobile-rn'
import * as server from '../servers'
import {StorageUtil} from "../utils/storage";
export default {
    namespace: 'User',
    state: {
        userInfo:undefined,
        province:'',
        city:'',
        citylist:[],
        islogin:false,
        phone:'',
        server:[],
        erm:false,

        shareOpen:false,
        shareData:'',
        shareUrl:'',

        loading: false,
        coinDetail: '',
        codeSuccess: false,		//获取验证码是否成功
    },
    reducers: {
        /**
         * 处理同步的action
         */
        update(state,{payload}) {
            return { ...state, ...payload }
        },
        setNetDone(state, { payload }) {
            return {
                ...state,
                [payload.name]: payload.status
            }
        },
        setCoinDetail(state, { payload }) {
            return {
                ...state,
                coinDetail: payload
            }
        }
    },
    effects: {
        *getCoinDetail({payload,callback=()=>{}},{call,put}){
            const res = yield call(server.getCoinDetail, payload)
            console.log(res);

            if(res && res.status === 200) {
                yield put({
                    type: 'update',
                    payload: {
                        coinDetail:res.res
                    }
                });
                callback(res.res)
            }
        },
        *loading({callback=()=>{},payload},{put}){
            yield put({
                type:'update',
                payload:{
                    loading:true
                }
            })
        },
        *loadinghd({callback=()=>{},payload},{put}){
            yield put({
                type:'update',
                payload:{
                    loading:false
                }
            })
        },
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

            if(response.status !== 200 ) return Toast.fail(response.res);
            yield put({
                type: 'setNetDone',
                payload: {
                    name: 'codeSuccess',
                    status: true
                }
            });
            callback(response)
        },
        *trylogin({callback=()=>{},payload},{call,put}){
            const response = yield call(server.login,payload);
            if(response.status !== 200 ) return Toast.fail(response.res,2,null,false);
            console.log(response)
            callback(response)
        },
        *loginpass({callback=()=>{},payload},{call,put}){
            const response = yield call(server.loginpass,payload);
            if(response.status !== 200 ) return Toast.fail(response.res);
            //console.log(response)
            callback(response)
        },
        *sign({callback=()=>{},payload},{call,put}){
            const response = yield call(server.sign,payload);
            if(response.status !== 200 ) return Toast.fail(response.res,2,null,false);
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
            yield put({
                type:'userInfo',
                payload:{
                    phone:phone
                }
            });
            Toast.success('修改成功',2,null,false)
            callback(response);
        },
        *content({callback=()=>{},payload},{call,put}){
            yield put({type:'loading'});
            const response = yield call(server.content,payload);
            //yield put({type:'loadinghd'})
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);

            callback(response);
        },
        *invites({callback=()=>{},payload},{call}){
            const response = yield call(server.invite,payload);
            //let data = JSON.stringify(response)
            //console.log(data)
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            callback(response);

        },
        *findpass({callback=()=>{},payload},{call,put,select}){
            const response = yield call(server.findpass,payload);
            if(response.status !== 200 ) return Toast.fail(response.res,2,null,false);

           // console.log(response)
            callback(response)
        },
        *headerimg({callback=()=>{},payload},{call,put,select}){
            const response = yield call(server.headerimg,payload.image,payload.phone);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            yield put({
                type:'userInfo',
                payload:{
                    phone:payload.phone
                }
            });
            callback(response)
        },
        *setCity({callback=()=>{},payload},{call,put,select}){
            const { phone } = yield select(state => state.User);
            const response = yield call(server.setCity,payload);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            yield put({
                type:'userInfo',
                payload:{
                    phone:phone
                }
            });
            callback(response)
        },
        *signin({callback=()=>{},payload},{call,put,select}){
            const { phone } = yield select(state => state.User);
            const response = yield call(server.signin,payload);
            //console.log(response);
            yield put({
                type:'userInfo',
                payload:{
                    phone:phone
                }
            });
            callback(response)
        },
        *weixinInfo({callback=()=>{},payload},{call,put,select}){
            //const { phone } = yield select(state => state.User);
            //yield put({type:'loading'});
            const response = yield call(server.weixinInfo,payload);
            //yield put({type:'loadinghd'});
            //console.log(response);
            if(response.status !== 200 ) return Toast.fail(response.message,2,null,false);
            let arr=[];
            let erm
            for(let i in response.res){
                if(response.res[i].title !== '官方微信二维码'){
                    arr.push(response.res[i])
                }else{
                    erm = response.res[i].content
                }
            }
            yield put({
                type:'update',
                payload:{
                    server:arr,
                    erm:erm
                }
            });
            callback(response)
        },
    }

}