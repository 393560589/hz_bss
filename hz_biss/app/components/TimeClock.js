import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, TextInput, Image, Text } from 'react-native'
import {checkPhone, px2dp, px2p} from '../utils'
import { StorageUtil } from '../utils/storage';
import {connect} from "../utils/dva";
import {Toast} from "antd-mobile-rn/lib/index.native";



let timer = null;
@connect(({User,loading})=>({
    codeLoading: loading.effects['User/getcode'],
    ...User

}))
class IndexPage extends PureComponent {
    constructor() {
        super()
        this.state = {
            phone:'',
            code:'',
            pass:'',
            time: 60,
            pwdf:'',
            timeTxt:'60s',
            btnTxt: '获取验证码'
        }
    }
    componentWillUnmount(){
        timer && clearInterval(timer);
    }
    getCode(phone){
        const {dispatch} = this.props;
        const that = this;
        //console.log(phone);
        if(!checkPhone(phone) ){
            Toast.info('请输入正确的手机号码',2,null,false);
            return
        }
        dispatch({
            type:'User/getcode',
            payload:{
                phone:phone,
            },
            callback:(data)=>{
                console.log(data);
                const { codeSuccess } = that.props;

                if(codeSuccess)
                    that.setTimeDown();
            }
        })
    }
    setTimeDown = () => {
        const that = this;
        const { time } = that.state;
        const { dispatch } = that.props;
        let count = time;

        timer && clearInterval(timer);
        timer = setInterval(function() {
            if(count <= 0) {
                that.setState({
                    timeTxt: '60s'
                });
                dispatch({
                    type: 'User/setNetDone',
                    payload: {
                        name: 'codeSuccess',
                        status: false
                    }
                });
                clearInterval(timer);
            }
            else{
                count--;
                that.setState({
                    timeTxt: `${count}s`
                });
            }
        }, 1000);
    }
    render() {
        const { codeLoading, codeSuccess,phone } = this.props;
        //console.log(this.props);
        //let phone= 18042317468;
        console.log(phone);
        return (
            <View style={{
                alignItems:'center',
                flexDirection:'row',
                width:px2dp(80),
                justifyContent:'space-between'
            }}>
                <Text style={{color:'#666'}}>| </Text>
                {
                    codeLoading ? <Text>加载中...</Text> :
                        (
                            codeSuccess ?
                                <Text>{`${this.state.timeTxt}`}</Text>:
                                <Text
                                    onPress={()=>this.getCode(phone)}
                                    style={{fontSize:px2dp(12),color:'#666'}}>{`${this.state.btnTxt}`}</Text>

                        )
                }
            </View>
        )
    }
}



export default IndexPage