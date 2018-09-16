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
import {set, user} from "../../config/image";
import {common} from "../../styles";
import {WhiteSpace,Button} from 'antd-mobile-rn'
import {commonStyle,deviceWidth} from "../../styles/common";
//import User from "../../models/User";


@connect(({User})=>({...User}))
export default class FeedBack extends PureComponent{
    state={
        text:''
    }
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    order(){
        const { dispatch,phone,navigation } = this.props;
        console.log(phone);
        phone && dispatch({
            type:'User/content',
            payload:{
                phone:phone,
                content:this.state.text,
            },
            callback:(data)=>{
                navigation.pop()
            }
        })
    }
    render(){
        return (
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
                        padding:px2dp(6)
                    }}
                    multiline = {true}
                    onChangeText={text => this.setState({text})}
                    value={this.state.text}
                />
                <Button type={'primary'} onClick={()=>this.order()}>提交</Button>
            </View>
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