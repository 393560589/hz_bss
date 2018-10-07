import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { InputItem,Button,WhiteSpace } from 'antd-mobile-rn'
import { List } from '../../components/ListItem'
import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";
import TimeClock from '../../components/TimeClock'
import {connect} from "../../utils/dva";
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {Toast} from "antd-mobile-rn/lib/index.native";

@connect(({User})=>({
    ...User
}))
class Fpassword extends PureComponent {
    state={
        phone:'',
        code:'',
        pwd:'',
        pwdf:'',
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    };
    dochange(){
        const { pwd,pwdf } = this.state;
        const {dispatch,navigation} = this.props;
        if(pwd !== pwdf){
            return Toast.info('两次输入密码不一致')
        }
        dispatch({
            type:'User/findpass',
            payload:{
                phone:this.props.phone,
                code:this.state.code,
                pass:this.state.pwd
            },
            callback:(data)=>{
                Toast.info(data.res,2,null,false);
                navigation.pop();
            }
        })
    }
    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
            <View style={styles.container}>
                <View style={styles.f_input_wrap}>

                    <WhiteSpace/>

                    <List border={false}>
                        <InputItem
                            type="number"
                            clear
                            labelNumber={3}
                            placeholder="输入手机号"
                            onChange={(text)=>this.props.dispatch({
                                type:'User/update',
                                payload:{
                                    phone:text
                                }
                            })}
                        >
                            <Text style={{color:'#666'}}>+86 |</Text>
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="number"
                            placeholder="验证码"
                            extra={
                                <TimeClock />
                            }
                            //onExtraClick={()=>this.getCode()}

                        />
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            clear
                            placeholder="请输入新密码"
                        />
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            clear
                            placeholder="确认密码"
                        />
                    </List>
                    <View style={commonStyle.btn_wrap}>
                        <Button style={styles.setbtn} onClick={()=>this.dochange()}>
                            <Text style={{color:'#fff',fontSize:px2dp(18)}}>
                                完成
                            </Text>
                        </Button>
                    </View>
                </View>

            </View>
            </AndroidBackHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //

    },
    f_input_wrap:{
        flex:1,
        backgroundColor:'#fff',
        paddingLeft:px2dp(20),
        paddingRight:px2dp(20),
        marginTop:px2dp(6),
    },
    f_tip_wrap:{
        alignItems:'flex-start',
        marginVertical:px2dp(8)
    },
    f_tip:{
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10),
        lineHeight:px2dp(15),
        color:'#333',
        fontSize:px2dp(13),
    },
    setbtn:{
        borderWidth:0,
        backgroundColor:'#F29600',
        //color:'#fff',
        marginTop:px2dp(40),
        width:deviceWidth-180
    }
});
export default Fpassword