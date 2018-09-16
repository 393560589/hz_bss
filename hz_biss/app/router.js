import React from 'react'
import {TouchableOpacity,Text,Image} from 'react-native'
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

export default {
    Login: {
        screen: Login,
        navigationOptions: Object.assign({},common.defaultHeader,
            {
                title: '登录',
        },)
    },
    SetName: {
        screen: SetName,
        navigationOptions: Object.assign({},common.defaultHeader, {
            title: '设置姓名',

        })
    },
    AboutUS: {
        screen: AboutUS,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '联系我们'})
    },
    FeedBack: {
        screen: FeedBack,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '意见反馈'})
    },
    Sign:{
        screen:Sign,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '注册'})
    },
    DataPush:{
        screen:DataPush,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '推送设置'})
    },
    Fpassword:{
        screen:Fpassword,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '找回密码'})
    },
    Settings:{
        screen:Settings,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '设置',mode:'card'})
    },
    SetUser:{
        screen:SetUser,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '个人资料',mode:'card'})
    },
    Setpwd:{
        screen:Setpwd,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '密码设置',mode:'card'})
    },
    Cpassword:{
        screen:Cpassword,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '修改密码',mode:'card'})
    },
    ProAddress:{
        screen:ProAddress,
        navigationOptions: Object.assign({},common.defaultHeader, {title: '城市选择',mode:'card'})
    },
    CityAddress:{
        screen:CityAddress,
        navigationOptions:Object.assign({},common.defaultHeader, {title: '设置地址',mode:'card'})
    },
    Invoice:{
        screen:Invoice,
        navigationOptions:Object.assign({},common.defaultHeader, {title: '发票助手',mode:'card'})
    },
    Search: {
        screen: Search
    },
    EditPost: {
        screen: EditPost
    }
}
/*
User:{screen:User},
Home:{screen:Home},
Cart:{screen:Cart},
Recommend:{screen:Recommend},
Integral:{screen:Integral},*/
