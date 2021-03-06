import React,{ PureComponent } from 'react'
import dva from '../../utils/dva'
import Home from '../../models/Home'
import Login from '../../models/login'
import SetUser from '../../models/setuser'
import User from '../../models/User'
// import search from '../../models/search'
import Router, { routerMiddleware, routerReducer } from './'
import { StorageUtil } from '../../utils/storage';
// import cart from '../../models/cart';


const app = dva({
    models:[Home,Login,SetUser,User],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    onError(e){
        console.log('Error',e)
    }
});
const App = app.start(<Router />);
export default App;