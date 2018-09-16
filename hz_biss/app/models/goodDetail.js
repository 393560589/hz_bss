export default {
  namespace: 'goodDetail',
  state: {
    goodActivity: [
      {
        name: '活动活动',
        detail: '活动简介'
      },
      {
        name: '满额包邮',
        detail: '满¥88包邮'
      }
    ],
    buyList: [
      {
        user: '18968979900',
        time: '2018-05-28 12:11:48',
        text: '我买了一份商品，成功获得1231个娱乐宝'
      },
      {
        user: '18968979901',
        time: '2018-05-28 12:11:48',
        text: '我买了一份商品，成功获得1231个娱乐宝'
      },
      {
        user: '18968979902',
        time: '2018-05-28 12:11:48',
        text: '我买了一份商品，成功获得1231个娱乐宝'
      }
    ]
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