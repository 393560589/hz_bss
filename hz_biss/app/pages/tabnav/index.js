import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    BackHandler
} from 'react-native';

import {Toast} from 'antd-mobile-rn'
import {
    createStackNavigator, createBottomTabNavigator
} from 'react-navigation'

import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers'

import {connect} from 'react-redux'
import Loading from '../../components/loading'
//import { tabs } from '../../config/image'
import {common} from '../../styles'
import {px2dp} from '../../utils'
import Recommend from '../Recommend'   // 推荐
import Home from '../Home' // 首页
import User from '../User' // 用户

import  Page from '../../router'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";



const YuTab = createBottomTabNavigator(
    {
        Recommend:{
            screen:Recommend,
            navigationOptions:({navigation})=>({
                headerTitle: "推荐",
                header:'币讯',
                tabBarLabel: "币讯",
                //headerBackTitle: null,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        style={{width:px2dp(14),height:px2dp(17)}}
                        source={
                            tintColor !== common.theme ?
                                require('../../image/user/bixun_defalut.png'):
                                require('../../image/user/bixun_select.png')
                        }
                    />
                )
            })
        },
        Home:{
            screen:Home,
            navigationOptions: {
                header: {
                    visible: false
                },
                title: "首页",
                headerBackTitle: null,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        style={{width:px2dp(17),height:px2dp(17)}}
                        source={
                            tintColor !== common.theme ?
                                require("../../image/user/home_defalut.png")
                                : require("../../image/user/home_select.png")
                        }
                    />
                )
            }
        },
       /* Integral:{
            screen:Intergral,
            navigationOptions:({navigation})=>({
                header:null,
                headerTitle: "积分应用",
                tabBarLabel: "积分应用",
                headerBackTitle: null,
                headerPressColorAndroid:true,
                 tabBarIcon: ({ tintColor }) => (
                     <Image
                         style={{width:px2dp(25),height:px2dp(25)}}
                         source={
                             tintColor !== common.theme ?
                                 require("../../image/tab/Icon_yyjf.png")
                                 : require("../../image/tab/Icon_yyjf.png")
                         }
                     />
                 )
            })
        },*/
        /*Cart:{
            screen: createStackNavigator({
                Cart: {
                    screen: Cart,
                    navigationOptions: Object.assign({},common.defaultHeader, {title: '购物车'})
                }
            }),
            navigationOptions:({navigation})=>({
                // header:null,
                title: '购物车',
                headerTitle: "购物车",
                tabBarLabel: "购物车",
                headerBackTitle: null,
                 tabBarIcon: ({ tintColor }) => (
                     <Image
                         style={{width:px2dp(18),height:px2dp(17)}}
                         source={
                             tintColor !== common.theme ? require("../../image/tab/Icon_gwc.png")
                                 : require("../../image/tab/Icon_gwc_mr.png")
                         }
                     />
                 )
            })
        },*/
        User:{
            screen:User,
            navigationOptions:({navigation})=>({
                header:null,
                headerTitle: "账户中心",
                tabBarLabel: "账户中心",
                headerBackTitle: null,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        style={{width:px2dp(17),height:px2dp(17)}}
                        source={
                            tintColor !== common.theme ? require("../../image/user/my_defalut.png")
                                : require("../../image/user/my_select.png")
                        }
                    />
                )
            })
        },
    },{
        initialRouteName: 'Home',
        // tabBarComponent:TabBarBottom,
        // tabBarPosition:'bottom',  // 位置 底部
        swipeEnabled:true,  //  是否允许在标签页之间滑动
        animationEnabled:true, // 是否在更改标签时显示动画
        lazy:true , // 懒加载  默认false

        tabBarOptions:{
            activeTintColor:common.theme, // label和icon的前景色
            activeBackgroundColor:common.fff, // label和icon活跃下的背景色,
            inactiveTintColor:common.gary_3, // 不活跃颜色，
            showLabel:true, // 默认显示
            showIcon:true, // android默认不显示。主动开启icon显示
            style:{
                height:px2dp(50),
                backgroundColor:common.fff,
                paddingBottom:px2dp(4),
                borderTopWidth:1,
                borderTopColor:common.gary_e,
            }, // tabbar的颜色样式
            labelStyle:{
                fontSize:px2dp(10)
            }
        }
    }
)
export const AppNavigator = createStackNavigator(
    {
        Main:{
            screen:YuTab,
            navigationOptions: {
                header: null
            }
        },
        ...Page
    },
    {
        initialRouteName:'Main',
        headerMode:'screen',
        mode:'card',
        transitionConfig: (() => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })),
        navigationOptions:{
            cardStack:{
                gestruesEnabled: true  // ios 上为true， 安卓 false 手势关此屏幕
            }
        }
    }
)




export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

@connect(({ app, router }) => ({ app, router }))


class Main extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            bg: '#ffffff',
            appkey: '40790a474d7c7e530b1bd57e',
            imei: 'IMEI',
            package: 'PackageName',
            deviceId: 'DeviceId',
            version: '1.0.0',
            pushMsg: 'PushMessage',
            registrationId: 'registrationId',
            tag: '',
            alias: ''
        }


    }
    jumpSecondActivity () {
        console.log('jump to SecondActivity')
        // JPushModule.jumpToPushActivityWithParams('SecondActivity', {
        //   hello: 'world'
        // })
        this.props.navigation.navigate('Push')
    }





    componentWillMount () {}

    componentDidMount () {

        return;
     /*   if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.getInfo(map => {
                this.setState({
                    appkey: map.myAppKey,
                    imei: map.myImei,
                    package: map.myPackageName,
                    deviceId: map.myDeviceId,
                    version: map.myVersion
                })
            })
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        } else {
            JPushModule.setupPush()
        }

        this.receiveCustomMsgListener = map => {
            this.setState({
                pushMsg: map.content
            })
            console.log('extras: ' + map.extras)
        }

        JPushModule.addReceiveCustomMsgListener(this.receiveCustomMsgListener)
        this.receiveNotificationListener = map => {
            console.log('alertContent: ' + map.alertContent)
            console.log('extras: ' + map.extras)
        }
        JPushModule.addReceiveNotificationListener(this.receiveNotificationListener)

        this.openNotificationListener = map => {
            console.log('Opening notification!')
            console.log('map.extra: ' + map.extras)
            this.jumpSecondActivity()
        }
        JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener)

        this.getRegistrationIdListener = registrationId => {
            console.log('Device register succeed, registrationId ' + registrationId)
        }
        JPushModule.addGetRegistrationIdListener(this.getRegistrationIdListener)*/
    }

    componentWillUnmount () {
/*        JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgListener)
        JPushModule.removeReceiveNotificationListener(this.receiveNotificationListener)
        JPushModule.removeReceiveOpenNotificationListener(this.openNotificationListener)
        JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdListener)
        console.log('Will clear all notifications')
        JPushModule.clearAllNotifications()*/
    }

    render() {
        const { app, dispatch, router } = this.props;
        //if (app.loading) return <Loading />;
        return (
            <App dispatch={dispatch} state={router}/>

        );
    }
}


export default Main