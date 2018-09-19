import * as server from '../servers/index'
export default {
    namespace: 'home',
    state: {
        name: 'homeplay', // 名字
        play:'ffff',
        hotKey: [],
        nav: [],
        newsList: [],
        loading: false
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

        *getNavigation({}, {call, put}) {
            const res = yield call(server.navigatioin);
           //console.log(res.res);
            if (res.status === 200) {
                yield put({
                    type: 'update',
                    payload: {
                        hotKey: res.res.hotWords,
                        nav: res.res.nav
                    }
                })
                // yield put({
                //     type: 'update',
                //     payload: res.res.nav
                // })
            }
        },

        *getNews ({payload}, {call, put}) {
            yield put({
                type: 'update',
                payload: {
                    loading: true
                }
            })
            const res = yield call(server.indexNews, payload);
            yield put({
                type: 'update',
                payload: {
                    loading: false
                }
            })
            //console.log(res.res);
            if (res.status === 200) {
                yield put({
                    type: 'updateNewsList',
                    payload: {
                        newsList: res.res
                    }
                })
            }
        }
    }
}