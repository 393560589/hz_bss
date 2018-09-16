import {px2dp} from "../utils";
import {Animated, Easing} from 'react-native'
export default {
    namespace: 'SetUser',
    state: {
        isShow:false,
       imageheight:new Animated.Value(0),
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
        *animaed({payload},{call,put}){
            console.log('动画开始')
            yield Animated.timing(payload.imageheight, {
                toValue:payload.isShow ? px2dp(81):px2dp(0),
                duration: 400,
                easing: Easing.spring,// 线性的渐变函数
            }).start();
            yield put({
                type:'update',
                payload:{
                    isShow:payload.isShow,
                    imageheight:payload.imageheight
                }
            })
        },
    },

}