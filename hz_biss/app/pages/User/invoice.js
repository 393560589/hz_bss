import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native'
import { List,Button,Radio,TextareaItem,InputItem } from 'antd-mobile-rn'
import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import {createForm} from 'rc-form'
import {common} from "../../styles";
import {set} from "../../config/image";



const Item = List.Item;
const RadioItem = Radio.RadioItem;
@connect()
class Invoice extends PureComponent{
    state = {
        value: 0,
        value2: 0,
        value3: 0,
        value4: 0,
    };
    onChange = (value) => {
        console.log('checkbox');
        this.setState({
            value,
        });
    };
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    render(){
        const { getFieldProps } = this.props.form;
        return (
            <ScrollView style={{flex:1}}>
                <View style={{flex:1,paddingTop:px2dp(6)}}>
                    <List renderHeader={()=>null}>
                        <Item extra={<Image style={{width:px2dp(15),height:px2dp(15)}} source={set.nocheck}/>}
                              onClick={() => {this.onPushPage('SetAddress')}}>
                            <Text style={common.font_h2}>需要发票</Text>
                        </Item>
                        <Item
                            extra={<Image style={{width:px2dp(15),height:px2dp(15)}} source={set.checked}/>}
                            onClick={() => {this.onPushPage('Invoice')}}>
                            <Text style={common.font_h2}>不需要发票</Text>
                        </Item>
                    </List>
                    <List style={{marginBottom:px2dp(6)}} renderHeader={()=>'发票类型'}>
                        <Item
                            extra={<Image style={{width:px2dp(15),height:px2dp(15)}} source={set.checked}/>}
                            onClick={() => {this.onPushPage('SetAddress')}}>
                            <Text style={common.font_h2}>公司</Text>
                        </Item>
                        <Item
                            extra={<Image style={{width:px2dp(15),height:px2dp(15)}} source={set.nocheck}/>}
                            onClick={() => {this.onPushPage('Invoice')}}>
                            <Text style={common.font_h2}>个人</Text>
                        </Item>
                    </List>

                    <View style={{marginTop:px2dp(6)}}>>
                        <List>
                            <InputItem
                                {...getFieldProps('name')}
                                type="text"
                                placeholder="请输入发票抬头名称"
                            />
                        </List>
                    </View>
                    <View style={{marginTop:px2dp(6)}}>>
                        <List>
                            <InputItem
                                {...getFieldProps('company_name')}
                                type="text"
                                placeholder="请输入公司抬头名称(必填)"
                            />
                            <InputItem
                                {...getFieldProps('name')}
                                type="text"
                                placeholder="请输入税号或社会信用代码(必填)"
                            />
                        </List>
                        <List style={{marginTop:px2dp(6)}}>
                            <InputItem
                                {...getFieldProps('company_phone')}
                                type="tel"
                                placeholder="请输入单位电话号码"
                            />
                            <InputItem
                                {...getFieldProps('company_address')}
                                type="text"
                                placeholder="请输入单位注册地址信息"
                            />
                            <InputItem
                                {...getFieldProps('bank_name')}
                                type="text"
                                placeholder="请输入单位开户行名称"
                            />
                            <InputItem
                                {...getFieldProps('bankcard')}
                                type="bankCard"
                                placeholder="请输入单位银行账号"
                            />
                        </List>
                    </View>
                    <List renderHeader={()=>'备注'}>
                        <TextareaItem
                            {...getFieldProps('count', {
                                initialValue: '计数功能,我的意见是...',
                            })}
                            rows={5}
                            count={100}
                        />
                    </List>
                </View>
                <View style={{height:45}}>
                    <Button type={'primary'}>确定</Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
export default createForm()(Invoice)
