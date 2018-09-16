export default {
  namespace: 'cart',
  state: {
    goods: [ // 购物车商品列表
      {
        id: 1,
        name: '商品名字',
        price: 100,
        amount: 1,
        isChecked: true,
        type: 1 // 平价好货
      },
      {
        id: 1,
        name: '商品名字',
        price: 100,
        amount: 1,
        isChecked: true,
        type: 2 // 活动精选
      }
    ]
  },
  reducers: {
    /**
     * 处理同步的action
     */
    updateGoods(state, { payload }) {
      return { ...state, ...payload }
    },
    updateGoodAmount(state, { id, amount = 1}) {
      const goods = state.goods.map(good => {
        if (good.id === id) {
          good.amount = amount
        }
        return good
      })
      return {...state, goods}
    },
    increaseGoodAmount(state, { id }) {
      const goods = state.goods.map(good => {
        if (good.id === id) {
          good.amount++
        }
        return good
      })
      return {...state, goods}
    },
    decreaseGoodAmount(state, { id }) {
      const goods = state.goods.map(good => {
        if (good.id === id) {
          good.amount--
        }
        return good
      })
      return {...state, goods}
    },
    changeGoodCheckStatus(state, { id }) {
      const goods = state.goods.map(good => {
        if (good.id === id) {
          good.isChecked = !good.isChecked
        }
        return good
      })
      return {...state, goods}
    }
  },
  effects: {
    /**
     * 处理异步的action
     * 主要使用redux-saga
     * 语法就是 es6 generator
     */
      * forplay({ payload }, { call, put, select }) {
      /**
       * call 调用自己定义的业务方法
       * put 发起action
       * select 选择某个namespace的state
       */
      //const name = yield call(fetchHomeName);
      const name =1;
      console.log(name);
      yield put({
        // type: SET_HOME_NAME,
        payload: { name },
      })
    }
  },
}