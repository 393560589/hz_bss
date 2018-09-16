import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native'

import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import {set, user} from "../../config/image";
import {common} from "../../styles";
import {commonStyle,deviceWidth} from "../../styles/common";
import { List,ListItem } from '../../components/ListItem'

@connect()
export default class AboutUS extends PureComponent{
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    render(){
        return (
            <View style={{flex:1}}>
                <List
                    border={false}
                    styles={{marginBottom:px2dp(6),marginTop:px2dp(6)}}>
                    <ListItem extra={'qukexingqiu888'} onClick={() => {this.onPushPage('SetAddress')}}>
                       商务合作微信号
                    </ListItem>
                </List>
                <List
                    border={false}
                    styles={{marginBottom:px2dp(6)}}>
                    <ListItem extra={'coinsousuo'} onClick={() => {this.onPushPage('SetAddress')}}>
                        官方客服微信号
                    </ListItem>
                </List>
                <List
                    border={false}
                    styles={{marginBottom:px2dp(6)}}>
                    <ListItem extra={'bitsszx'} onClick={() => {this.onPushPage('SetAddress')}}>
                        官方微信公众号
                    </ListItem>
                </List>
                <View style={styles.Icon_wrap}>
                    <Image source={set.Icons} style={{height:px2dp(160),width:px2dp(160)}}/>
                    <Text style={[styles.yutext,common.font_h2]}>进社区群扫管理员二维码</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    Icon_wrap:{
        width:deviceWidth,
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    yutext:{
        marginTop:px2dp(15),
        marginBottom:px2dp(10)
    }
})