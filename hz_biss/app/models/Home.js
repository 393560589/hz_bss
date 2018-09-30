import * as server from '../servers/index'
export default {
    namespace: 'home',
    state: {
        name: 'homeplay', // 名字
        play:'ffff',
        hotKey: [],
        nav: [],
        newsList: [],
        x: false,
        webviewUrl:''
    },
    reducers: {
        /**
         * 处理同步的action
         */
        play(state) {
            return { ...state }
        },
        update(state, {payload}) {
            return {...state, ...payload}
        },
        updateNewsList(state, { payload }) {
            return {...state, newsList: [...state.newsList].concat(...payload.newsList)}
        }
        
    },
    effects: {
        /**
         * 处理异步的action
         * 主要使用redux-saga
         * 语法就是 es6 generator
         */
        *getBanner({ payload,callback=()=>{} }, { call, put, select }) {
            const response = yield call(server.swiper,payload);
            callback(response)
        },
        *ToWebview({callback=()=>{},payload}, { put}) {
            yield put({
                type:'update',
                payload:payload
            })
            callback()
        },
        *getNavigation({callback=()=>{}}, {call, put}) {
            const res = yield call(server.navigatioin);
            console.log(res);
            if (res.status === 200) {
                yield put({
                    type: 'update',
                    payload: {
                        hotKey: res.res.hotWords,
                        nav: res.res.nav
                    }
                })
                callback(res);
                // yield put({
                //     type: 'update',
                //     payload: res.res.nav
                // })
            }
        },

        *getNews ({payload}, {call, put}) {
            const res = yield call(server.indexNews, payload);
            //console.log(res);
            if (res.status === 200) {
                yield put({
                    type: 'updateNewsList',
                    payload: {
                        newsList: res.res
                    }
                })
            }
        },
        *refreshNews ({payload}, {call, put}) {
            const res = yield call(server.indexNews)
        }
    }
}