import React from 'react'
import {TouchableOpacity,Text,Image,View} from 'react-native'
import Login from './pages/Login/index'
import {common} from "./styles";
//import {px2dp, px2p} from "./utils";
//import {img} from './config/image'
import Sign from "./pages/Login/sign";
import Fpassword from './pages/Login/fpassword'
import Cpassword from './pages/User/Cpassword'
import Settings from './pages/User/setting'
import SetUser from "./pages/User/setuser";
import Setpwd from "./pages/User/setpassword";
import ProAddress from "./pages/User/ProAddress";
import CityAddress from './pages/User/cityaddress'
import AboutUS from "./pages/User/aboutus";
import Invoice from "./pages/User/invoice";
import FeedBack from "./pages/User/feedback";
import DataPush from "./pages/User/datapush";
import Search from './pages/Search'
import SetName from './pages/User/setname'
import EditPost from './pages/EditPost'
import {px2dp} from "./utils";
import WebViews from './pages/WebView'
import Entries from './pages/Home/components/Entries'
export default {
    Login: {
        screen: Login,
        navigationOptions: Object.assign({},common.defaultHeader,
            {
                headerRight:(<View/>),
                title: '登录',
        },)
    },
    SetName: {
        screen: SetName,
        navigationOptions: Object.assign({},common.defaultHeader, {
            title: '设置姓名',
        }),

    },
    AboutUS: {
        screen: AboutUS,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '联系我们', headerRight:(<View/>),})
    },
    FeedBack: {
        screen: FeedBack,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '意见反馈', headerRight:(<View/>),})
    },
    Sign:{
        screen:Sign,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '注册', headerRight:(<View/>),})
    },
    DataPush:{
        screen:DataPush,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '推送设置', headerRight:(<View/>),})
    },
    Fpassword:{
        screen:Fpassword,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '找回密码', headerRight:(<View/>),})
    },
    Settings:{
        screen:Settings,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '设置',mode:'card', headerRight:(<View/>),})
    },
    SetUser:{
        screen:SetUser,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '个人资料',mode:'card', headerRight:(<View/>),})
    },
    Setpwd:{
        screen:Setpwd,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '密码设置',mode:'card', headerRight:(<View/>),})
    },
    Cpassword:{
        screen:Cpassword,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '修改密码',mode:'card', headerRight:(<View/>),})
    },
    ProAddress:{
        screen:ProAddress,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '城市选择',mode:'card'})
    },
    WebViews:{
        screen:WebViews,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '热讯',mode:'card', headerRight:(<View/>)})
    },
    CityAddress:{
        screen:CityAddress,
        navigationOptions:Object.assign({},common.defaultHeader, {title: '设置地址',mode:'card', headerRight:(<View/>),})
    },
    Invoice:{
        screen:Invoice,
        navigationOptions:Object.assign({},common.defaultHeader, {title: '发票助手',mode:'card'})
    },
    Search: {
        screen: Search,
        navigationOptions:Object.assign({},common.defaultHeader, {title: '搜索',mode:'card', headerRight:(<View/>),})
    },
    EditPost: {
        screen: EditPost,
        navigationOptions:Object.assign({},common.defaultHeader, {title: '发帖',mode:'card', headerRight:(<View/>),})
    },
    Entries: {
        screen: Entries,
    }
}
/*
User:{screen:User},
Home:{screen:Home},
Cart:{screen:Cart},
Recommend:{screen:Recommend},
Integral:{screen:Integral},*/
