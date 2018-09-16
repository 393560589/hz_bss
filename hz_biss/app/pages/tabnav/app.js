import React,{ PureComponent } from 'react'
import dva from '../../utils/dva'
import createLoading from 'dva-loading'
import Home from '../../models/Home'
import Login from '../../models/login'
import SetUser from '../../models/setuser'
import User from '../../models/User'
import Router, { routerMiddleware, routerReducer } from './'
import { StorageUtil } from '../../utils/storage';
// import cart from '../../models/cart';

(async () => {
    const history = await StorageUtil.get('searchHistoty')
    console.log(history, 'history')
    if (!history) {
        StorageUtil.save('searchHistoty', [])
    }
})()


const app = dva({
    models:[Home,Login,SetUser,User],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    onError(e){
        console.log('Error',e)
    }
});
app.use(createLoading())
const App = app.start(<Router />);
export default App;