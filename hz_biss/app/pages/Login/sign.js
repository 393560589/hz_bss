import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { InputItem,Button,WhiteSpace,Checkbox,Toast } from 'antd-mobile-rn'
import {List } from '../../components/ListItem'
import { createForm } from 'rc-form'
import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";
import {connect} from "../../utils/dva";
const AgreeItem = Checkbox.AgreeItem;
@connect(({User})=>({...User}))

class Sign extends PureComponent {
    state={
        phone:'',
        code:'',
        pass:''
    }
    componentDidMount(){

    }
    dosign(){
       // console.log(this.state);
        const {dispatch} = this.props;
        dispatch({
            type:'User/sign',
            payload:{
                phone:this.state.phone,
                code:this.state.code,
                pass:this.state.pwd
            },
            callback:(data)=>{
               Toast.info(data.res);
            }
        })
    }
    getCode(){
        const {dispatch} = this.props;
        //const { getFieldProps } = this.props.form;
        //console.log(this.state.phone)
        dispatch({
            type:'User/getcode',
            payload:{
                phone:this.state.phone,
            },
            callback:(data)=>{
                console.log(data)
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.f_input_wrap}>
                    <WhiteSpace/>
                    <List border={false}>
                        <InputItem
                            type="number"
                            clear
                            labelNumber={3}
                            placeholder="输入手机号"
                            onChange={(text)=>this.setState({phone:text})}
                        ><Text style={{color:'#666'}}>+86 |</Text> </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="number"
                            placeholder="输入四位数字验证码"
                            extra={<Text style={{fontSize:px2dp(12),color:'#666'}}>| 获取验证码</Text>}
                            onExtraClick={()=>this.getCode()}
                            onChange={(text)=>this.setState({code:text})}
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
                            onChange={(text)=>this.setState({pwd:text})}
                        />
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <AgreeItem onChange={e => console.log('checkbox', e)}>
                        <Text style={{color:'#666'}}>
                            我已阅读并接受
                        </Text>
                        <Text
                            style={{color:'#F29600'}}
                            onPress={(e) => { e.preventDefault(); alert('agree it'); }}>币搜索服务条款</Text>
                    </AgreeItem>
                    <View style={commonStyle.btn_wrap}>
                        <Button style={styles.setbtn} onClick={()=>this.dosign()}>
                            <Text style={{color:'#fff',fontSize:px2dp(18)}}>
                                注册
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
        marginTop:px2dp(40),
        width:deviceWidth-180
    }
});
export default Sign