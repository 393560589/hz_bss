import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native'
import { Button } from 'antd-mobile-rn'
import {connect} from "../../utils/dva";
import {px2dp} from "../../utils";
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {createForm} from 'rc-form'
import { ListItem,List } from '../../components/ListItem'
import Switch from 'react-native-switch-pro'
@connect()
class DataPush extends PureComponent{
    state={
        value:'2'
    }
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
                       <View style={styles.bt}>
                           <Text>
                               是否需要推送
                           </Text>
                           <Switch
                               label={2}
                               value={this.state.value}
                               onSyncPress={(value) => this.setState({value})} />
                       </View>
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
    },
    bt:{
        marginTop:px2dp(10),
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:px2dp(14),
        paddingRight:px2dp(14),
        height:px2dp(44),
        alignItems:'center'
    }
})
export default createForm()(DataPush)