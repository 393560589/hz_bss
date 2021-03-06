import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,TextInput
} from 'react-native'

import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {WhiteSpace,Button,Modal} from 'antd-mobile-rn'
import {commonStyle,deviceWidth} from "../../styles/common";
import {Toast} from "antd-mobile-rn/lib/index.native";
//import User from "../../models/User";

const alert =Modal.alert;
@connect(({User})=>({...User}))
export default class FeedBack extends PureComponent{
    state={
        text:''
    }
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    componentDidMount(){
        this.props.dispatch({
            type:'User/update',
            payload:{
                loading:true
            }
        })
    }
    order(){
        const { dispatch,phone,navigation } = this.props;
        dispatch({
            type:'User/content',
            payload:{
                phone:phone,
                content:this.state.text,
            },
            callback:(data)=>{
                alert('感谢您的意见', '继续提交反馈?', [
                    { text: '返回', onPress: () => navigation.pop() },
                    { text: '确定', onPress: () => this.setState({text:''}) },
                ])
            }
        })
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    }
    render(){

        return (
            <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>

            <View style={styles.container}>
                <Text style={{fontSize:px2dp(14),lineHeight:px2dp(16)}}>请在下面填写您遇到的问题或意见建议，我们将为您提供更好的产品和服务。</Text>
                <WhiteSpace/>
                <WhiteSpace/>
                <Text>请详细描述您的问题或建议 <Text style={{color:'red'}}>*</Text></Text>
                <WhiteSpace/>
                <TextInput
                    style={{
                        justifyContent:'flex-start',
                        alignItems:'flex-start',
                        height:px2dp(120),
                        borderWidth:1,
                        marginBottom:px2dp(20),
                        borderColor:'#eee',
                        padding:px2dp(6),
                        textAlignVertical: 'top'
                    }}
                    underlineColorAndroid='transparent'
                    multiline = {true}

                    onChangeText={text => this.setState({text})}
                    value={this.state.text}
                />
                <Button type={'primary'} onClick={()=>this.order()}>提交</Button>
            </View>
            </AndroidBackHandler>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingTop:px2dp(10),
        flex:1,marginTop:px2dp(6),paddingLeft:px2dp(10),paddingRight:px2dp(10)
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