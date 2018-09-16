import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { InputItem,Button,WhiteSpace } from 'antd-mobile-rn'
import {List } from '../../components/ListItem'
import { createForm } from 'rc-form'
import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";

class Fpassword extends PureComponent {
    componentDidMount(){
        console.log(deviceWidth)
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <View style={styles.container}>
                <View style={styles.f_input_wrap}>

                    <WhiteSpace/>

                    <List border={false}>
                        <InputItem
                            {...getFieldProps('phone')}
                            type="phone"
                            clear
                            labelNumber={3}
                            placeholder="输入手机号"
                        ><Text style={{color:'#666'}}>+86 |</Text> </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            {...getFieldProps('code')}
                            type="number"
                            placeholder="验证码"
                            extra={<Text style={{fontSize:px2dp(12),color:'#666'}}>| 获取验证码</Text>}
                            onExtraClick={()=>this.getCode()}

                        />
                        <WhiteSpace/>
                        <InputItem
                            {...getFieldProps('pwd')}
                            type="password"

                            placeholder="请输入新密码"
                        />
                        <WhiteSpace/>
                        <InputItem
                            {...getFieldProps('pwdt')}
                            type="password"
                            clear

                            placeholder="确认密码"
                        />
                    </List>
                    <View style={commonStyle.btn_wrap}>
                        <Button style={styles.setbtn}>
                            <Text style={{color:'#fff',fontSize:px2dp(18)}}>
                                完成
                            </Text>
                        </Button>
                    </View>
                </View>

            </View>
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
        color:'#fff',
        marginTop:px2dp(40),
        width:deviceWidth-180
    }
});
export default createForm()(Fpassword)