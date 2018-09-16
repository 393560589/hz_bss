import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


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

import Page from '../../router'



const YuTab = createBottomTabNavigator(
    {
        Recommend:{
            screen:Recommend,
            navigationOptions:({navigation})=>({
                headerTitle: "推荐",
                header:'币讯',
                //tabBarLabel: "币讯",
                //headerBackTitle: null,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        style={{width:px2dp(14),height:px2dp(17)}}
                        source={
                            tintColor !== common.theme ?
                                require('../../image/tab/Icon_tj.png'):
                                require('../../image/tab/Icon_tj_mr.png')
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
                                require("../../image/tab/Icon_sy.png")
                                : require("../../image/tab/Icon_sy_mr.png")
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
                            tintColor !== common.theme ? require("../../image/tab/Icon_wd.png")
                                : require("../../image/tab/Icon_wd_mr.png")
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
    render() {
        const { app, dispatch, router } = this.props;
        //if (app.loading) return <Loading />;
        return (
            <App dispatch={dispatch} state={router}/>

        );
    }
}


export default Main