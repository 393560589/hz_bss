import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native'
import { Button,Toast } from 'antd-mobile-rn'
import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import {user} from "../../config/image";
import {common} from "../../styles";
import {commonStyle} from "../../styles/common";
import AboutUS from "./aboutus";
import Invoice from "./invoice";
import { ListItem,List } from '../../components/ListItem'
import {StorageUtil} from "../../utils/storage";

@connect(({User})=>({...User}))
export default class Setting extends PureComponent{
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    logout(){
        const { dispatch,navigation } = this.props;

        dispatch({
            type:'User/logout',
            payload:{
                userInfo:undefined,
                islogin:false
            },
            callback:()=>{
                Toast.success('登出账号了...');
                StorageUtil.delete('phone');
                setTimeout(()=>{
                    navigation.pop()
                },500)
            }
        })
    }
    render(){
        return (
            <View style={{flex:1}}>
                <View>

                        {/*<List style={{marginBottom:px2dp(6)}} renderHeader={()=>null}>
                            <Item arrow="horizontal" multipleLine onClick={() => {this.onPushPage('SetUser')}}>
                                <Image style={{width:px2dp(46),height:px2dp(46)}} source={user.tx}/>
                            </Item>
                        </List>*/}
                        <List styles={{marginTop:px2dp(6)}} border={false} renderHeader={'账号设置'}>
                            <ListItem hasborder onClick={() => {this.onPushPage('Setpwd')}}>
                                密码设置
                            </ListItem>
                            <ListItem onClick={() => {this.onPushPage('DataPush')}}>
                                推送设置
                            </ListItem>
                        </List>
                        <List border={false}  styles={{marginTop:px2dp(6),marginBottom:px2dp(6)}}renderHeader={'其他'}>
                           {/* <Item arrow="horizontal" onClick={() => {this.onPushPage('SetAddress')}}>
                                <Text style={common.font_h2}>地址管理</Text>
                            </Item>*/}
                            <ListItem extra={'v1.0.1'} onClick={() => {this.onPushPage('Setpwd')}}>
                                版本更新
                            </ListItem>
                        </List>
                       {/* <List renderHeader={()=>null}>
                            <Item arrow="horizontal" multipleLine onClick={() => {this.onPushPage('AboutUS')}}>
                                <Text style={common.font_h2}>关于我们</Text>
                            </Item>
                        </List>*/}
                </View>
                <View style={{height:45}}>
                    <Button
                        onClick={()=>this.logout()}
                    >
                        <Text style={{color:'red'}}>
                            退出账号
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})