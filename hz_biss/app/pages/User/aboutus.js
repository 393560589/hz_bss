import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native'

import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import {set, user} from "../../config/image";
import {common} from "../../styles";
import {commonStyle,deviceWidth} from "../../styles/common";
import { List,ListItem } from '../../components/ListItem'

import { AndroidBackHandler } from 'react-navigation-backhandler'
@connect(({User})=>({...User}))
export default class AboutUS extends PureComponent{
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    };
    componentDidMount(){
        const {dispatch,phone} = this.props;
        dispatch({
            type:'User/weixinInfo',
            payload:{
                phone:phone
            }
        })
    }
    render(){
        const {server,erm} = this.props;
        return (
            <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
                <SafeAreaView style={{flex:1}}>
                    {
                        server.map((item,index)=>{
                            return (
                                <List
                                    key={index}
                                    border={false}
                                    styles={{marginBottom:px2dp(6),marginTop:index === 0 ? px2dp(6):0}}>
                                    <ListItem extra={item.content}>
                                        {item.title}
                                    </ListItem>
                                </List>
                            )
                        })
                    }
                    <View style={styles.Icon_wrap}>

                        {erm && <Image source={{uri:`${erm}`}} style={{height:px2dp(160),width:px2dp(160)}}/>}
                        <Text style={[styles.yutext,common.font_h2]}>官方微信二维码</Text>
                    </View>
                </SafeAreaView>
            </AndroidBackHandler>

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