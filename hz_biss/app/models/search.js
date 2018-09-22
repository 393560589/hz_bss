import { StorageUtil } from "../utils/storage";


export default {
    namespace: 'search',
    state: {
        history: []
    },
    reducers: {
        /**
         * 处理同步的action
         */
        play(state) {
            return { ...state }
        },
        update(state, {payload}) {
          console.log(...state, ...payload, 'state history')
            return {...state, ...payload}
        },
        
    },
    effects: {
        /**
         * 处理异步的action
         * 主要使用redux-saga
         * 语法就是 es6 generator
         */
        *updateHistory({ payload,callback=()=>{} }, { call, put, select }) {
            console.log('updateHistory')
            const history = yield StorageUtil.get('searchHistory');
            console.log(history, 'updateHistory histttt')
            yield put({
              type: 'update',
              payload: {
                history
              }
            })
        },

        *saveHistory({payload,callback=()=>{}}, {put, select, call}) {
          const { history } = yield select(state => state.search);
          const index = history.findIndex(h => h === payload)
          const _history = [payload].concat(history.slice(0, index), history.slice(index + 1)).slice(0, 6)
          yield StorageUtil.save('searchHistory', [..._history].slice(0, 6))
            callback()
        }
    }
}