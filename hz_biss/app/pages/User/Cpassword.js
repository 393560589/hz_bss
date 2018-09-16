import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { List,InputItem,Button } from 'antd-mobile-rn'
import { createForm } from 'rc-form'
import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";

class Cpassword extends PureComponent {
    componentDidMount(){
        console.log(deviceWidth)
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <View style={styles.container}>
                <View style={styles.f_input_wrap}>
                    <List>
                        <InputItem
                            {...getFieldProps('oldpwd')}
                            type="password"
                            clear
                            labelNumber={5}

                            placeholder="输入登录密码"
                        >旧密码</InputItem>

                        <InputItem
                            {...getFieldProps('pwd')}
                            type="password"
                            clear
                            labelNumber={5}

                            placeholder="输入登录密码"
                        >新密码</InputItem>
                        <InputItem
                            {...getFieldProps('pwdt')}
                            type="password"
                            clear
                            labelNumber={5}
                            placeholder="输入登录密码"
                        >再次输入</InputItem>
                    </List>
                    <View style={styles.f_tip_wrap}>
                        <Text style={styles.f_tip}>提示：长度在8位及以上,密码应包含数字、大小写字母、特殊字符中的两种或两种以上</Text>
                    </View>

                </View>
                <View style={commonStyle.btn_wrap}>
                    <Button type={'primary'} style={commonStyle.btn}>提交</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    f_input_wrap:{
        marginTop:px2dp(6),
    },
    f_tip_wrap:{
        alignItems:'center',
        marginVertical:px2dp(8)
    },
    f_tip:{
        lineHeight:px2dp(15),
        width:deviceWidth-20,
        color:common.theme,
        fontSize:px2dp(10),
    },
});
export default createForm()(Cpassword)