import * as servers from '../servers'
import { StorageUtil } from '../utils/storage'
import {StringName} from '../config/keyword'
import { NavigationActions,StackActions } from '../utils'




export default {
    namespace: 'login',
    state: {
        data:{},
        isPassword:true,
        islogin:false,
    },
    reducers: {
        /**
         * 处理同步的action
         */
        updateState(state,{payload}) {
          return {...state,...payload}
        },
    },
    effects: {
       *getcode({payload},{call}){
           console.log(payload);
           const res = yield call(servers.getcode,payload.phone);
           if (!res) return;
           console.log(res);
       },
       *dologin({payload},{call,put}){
           const res = yield call(servers.login,payload);
           console.log(res)
           if (!res) return;

           if(res.code == 0){
               StorageUtil.save(StringName.USER_INFO,res.data);
               yield put(StackActions.pop({
                  n:1
               }))
           }

       }
    },
}