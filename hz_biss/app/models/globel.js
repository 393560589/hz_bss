export default {
    namespace: 'g',
    state: {

    },
    reducers: {
        /**
         * 处理同步的action
         */
        update(state,{payload}) {
            return { ...state,...payload }
        }
    },
    effects: {

    },
}