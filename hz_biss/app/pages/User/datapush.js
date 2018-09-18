import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native'
import { Button,Switch } from 'antd-mobile-rn'
import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {createForm} from 'rc-form'
import { ListItem,List } from '../../components/ListItem'

@connect()
class DataPush extends PureComponent{
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    }
    render(){
        const { getFieldProps } = this.props.form;
        return (
            <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <View style={{flex:1}}>
                <View>
                    <List styles={{marginTop:px2dp(6)}} border={false}>
                        <ListItem
                            extra={
                                <Switch
                                {...getFieldProps('Switch2', {
                                    initialValue: false,
                                    valuePropName: 'checked',
                                })}
                                onClick={(checked) => { console.log(checked); }}
                            />}
                            hasborder>
                            @我的
                        </ListItem>
                    </List>
                    <List styles={{marginTop:px2dp(6)}} border={false}>
                        <ListItem
                            extra={
                                <Switch
                                    {...getFieldProps('wdts', {
                                        initialValue: false,
                                        valuePropName: 'checked',
                                    })}
                                    onClick={(checked) => { console.log(checked); }}
                                />}
                            hasborder>
                            问答消息推送
                        </ListItem>
                    </List>
                    <List styles={{marginTop:px2dp(6)}} border={false}>
                        <ListItem
                            extra={
                                <Switch
                                    {...getFieldProps('rbts', {
                                        initialValue: false,
                                        valuePropName: 'checked',
                                    })}
                                    onClick={(checked) => { console.log(checked); }}
                                />}
                            hasborder>
                            热吧消息推送
                        </ListItem>
                    </List>
                    <List styles={{marginTop:px2dp(6)}} border={false}>
                        <ListItem
                            extra={
                                <Switch
                                    {...getFieldProps('dnts', {
                                        initialValue: false,
                                        valuePropName: 'checked',
                                    })}
                                    onClick={(checked) => { console.log(checked); }}
                                />}
                            hasborder>
                            大牛观点消息推送
                        </ListItem>
                    </List>
                </View>
            </View>
            </AndroidBackHandler>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
export default createForm()(DataPush)