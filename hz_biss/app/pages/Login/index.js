import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { InputItem,Button,WhiteSpace,Toast } from 'antd-mobile-rn'
import {List } from '../../components/ListItem'

import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";
import {connect} from "../../utils/dva";
import {StorageUtil} from "../../utils/storage";
import TimeClock from '../../components/TimeClock'
import { AndroidBackHandler } from 'react-navigation-backhandler'
@connect(({User})=>({...User}))
class Login extends PureComponent {
    state={
        codelogin:true,
        pass:'',
        code:'',
    }
    login(){
        const { dispatch,phone } = this.props;
        dispatch({
            type:'User/trylogin',
            payload:{
                phone:phone,
                code:this.state.code
            },
            callback:(data)=>{
                console.log(data);
                dispatch({
                    type:'User/update',
                    payload:{
                        phone:phone
                    }
                })
                StorageUtil.save('phone',phone);
                this.getUser()
            }
        })
    }
    loginpass(){
        const { dispatch,phone }=this.props;
        dispatch({
            type:'User/loginpass',
            payload:{
                phone:phone,
                pass:this.state.pass
            },
            callback:(item)=>{
                dispatch({
                    type:'User/update',
                    payload:{
                        phone:phone
                    }
                })
                StorageUtil.save('phone',phone);
                this.getUser()
            }
        })
    }
    getUser(){
        const { dispatch,navigation} = this.props;
        dispatch({
            type:'User/userInfo',
            payload:{
                phone:this.props.phone,
            },
            callback:(data)=>{
                console.log(data);
                Toast.success('登录成功',2,null,false)
                navigation.pop();
            }
        })
    }
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    render() {

        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
            <View style={styles.container}>
                {
                    this.state.codelogin ? (<View style={styles.f_input_wrap}>
                        <View style={styles.f_tip_wrap}>
                            <Text style={styles.f_tip}>
                                验证即可登录，未注册用户将根据手机号自动创建账号
                            </Text>
                        </View>
                        <WhiteSpace/>
                        <WhiteSpace/>

                        <List border={false}>
                            <InputItem
                                type="number"
                                clear
                                labelNumber={3}
                                placeholder="请输入手机号码"
                                onChange={text=>this.props.dispatch({
                                    type:'User/update',
                                    payload:{
                                        phone:text
                                    }
                                })}
                            >
                                <Text style={{color:'#666'}}>+86&nbsp;|</Text>
                            </InputItem>
                            <WhiteSpace/>
                            <InputItem
                                type="number"
                                placeholder="请输入6位验证码"
                                extra={
                                    <TimeClock />
                                }
                                onChange={text=>this.setState({code:text})}
                            />
                        </List>
                        <WhiteSpace/>
                        <Text
                            onPress={()=>this.setState({codelogin:!this.state.codelogin})}
                            style={{color:common.theme,paddingLeft:px2dp(12)}}>账号密码登录</Text>
                        <View style={commonStyle.btn_wrap}>
                            <Button style={styles.setbtn}
                                    onClick={()=>{
                                        this.login()
                                    }}
                            >
                                <Text style={{color:'#fff',fontSize:px2dp(18)}}>
                                    登录
                                </Text>
                            </Button>
                        </View>
                    </View>) :(<View style={styles.f_input_wrap}>

                        <WhiteSpace/>

                        <List border={false}>
                            <InputItem
                                type="number"
                                clear
                                labelNumber={3}
                                placeholder="手机号"
                                onChange={text=>this.props.dispatch({
                                    type:'User/update',
                                    payload:{
                                        phone:text
                                    }
                                })}
                            >
                                <Text style={{color:'#666'}}>+86&nbsp;|</Text>
                            </InputItem>
                            <WhiteSpace/>
                            <InputItem
                                type="password"
                                clear
                                placeholder="密码"
                                onChange={(text)=>this.setState({pass:text})}
                            />
                        </List>
                        <WhiteSpace/>
                        <Text
                            onPress={()=>this.setState({codelogin:!this.state.codelogin})}
                            style={{color:common.theme,paddingLeft:px2dp(12)}}>
                            快捷登录
                        </Text>
                        <View style={commonStyle.btn_wrap}>
                            <Button style={styles.setbtn}
                                onClick={()=>{
                                    this.loginpass()
                                }}
                            >
                                <Text style={{color:'#fff',fontSize:px2dp(18)}}>
                                    登录
                                </Text>
                            </Button>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                marginTop:px2dp(20),
                            }}>
                                <Text
                                    onPress={()=>this.onPushPage('Fpassword')}
                                    style={{color:'#666'}}>忘记密码&nbsp;&nbsp;|</Text>
                                <Text
                                    onPress={()=>this.onPushPage('Sign')}
                                    style={{color:'#666'}}>&nbsp;&nbsp;注册账号</Text>
                            </View>

                        </View>
                    </View>)
                }


            </View>
            </AndroidBackHandler>
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
        marginVertical:px2dp(8),

    },
    f_tip:{
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10),
        lineHeight:px2dp(15),
        //color:'#333',
        fontSize:px2dp(12),
    },
    setbtn:{
        borderWidth:0,
        backgroundColor:'#F29600',
       // color:'#fff',
        marginTop:px2dp(40),
        width:deviceWidth-180
    }
});
export default Login