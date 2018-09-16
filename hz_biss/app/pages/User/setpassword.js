import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { InputItem,Button,WhiteSpace,Toast } from 'antd-mobile-rn'
import {List } from '../../components/ListItem'
import { createForm } from 'rc-form'
import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";
import {connect} from "../../utils/dva";
@connect(({User})=>({...User}))
class SetPassword extends PureComponent {
    state={
        phone:'',
        code:'',
        pass:''
    }

    order(){
        const { dispatch,navigation } = this.props;
        dispatch({
            type:'User/findpass',
            payload:{
                phone:this.state.phone,
                pass:this.state.pass,
                code:this.state.code
            },
            callback:()=>{
                Toast.info('修改成功',2,null,false)
                navigation.pop();
            }
        })
    }
    getCode(){
        const {dispatch} = this.props;
        dispatch({
            type:'User/getcode',
            payload:{
                phone:this.state.phone,
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.f_input_wrap}>
                    <View style={styles.f_tip_wrap}>
                        <Text style={styles.f_tip}>
                            <Text style={{fontWeight:'bold'}}>
                                温馨提示：
                            </Text>
                            请设置密码,密码长度至少为6个字符,最长为19个字符,为了您的密码安全,建议使用数字字母组合排列,区分大小写。</Text>
                    </View>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <List border={false}>
                        <InputItem
                            type="number"
                            clear
                            value={this.state.phone}
                            onChange={(phone)=>{this.setState({phone})}}
                            labelNumber={3}
                            placeholder="输入手机号"
                        >
                            <Text style={{color:'#666'}}>+86 |</Text>
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="number"
                            value={this.state.code}
                            placeholder="输入四位数字验证码"
                            extra={<Text style={{fontSize:px2dp(12),color:'#666'}}>| 获取验证码</Text>}
                            onExtraClick={()=>this.getCode()}
                            onChange={code=>this.setState({code})}
                        />
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            clear
                            placeholder="输入登录密码"
                        />
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            clear
                            value={this.state.pass}
                            onChange={pass=>this.setState({pass})}
                            placeholder="再次确认密码"
                        />
                    </List>
                    <View style={commonStyle.btn_wrap}>
                        <Button style={styles.setbtn}
                            onClick={()=>this.order()}
                        >
                            <Text style={{color:'#fff',fontSize:px2dp(18)}}>
                                确认
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
export default SetPassword