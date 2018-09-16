import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,TouchableOpacity,
    //TextInput,
    Image,
    View
} from 'react-native';
import { Radio,List,InputItem,Button } from 'antd-mobile-rn'

import {px2dp} from "../../utils";
//import {commonStyle} from "../../styles/common";
//import { pc } from 'antd-mobile-area-data'
//import { ,ListItem } from '../../components/ListItem'

import {connect} from "../../utils/dva";
import {common} from "../../styles";

@connect(({User})=>({...User}))
export default class Index extends PureComponent {

    state={
        value:''
    }
    static navigationOptions =({navigation}) =>{
        return {
            headerTitle: '设置姓名',
            headerRight: (
                <TouchableOpacity
                    onPress={navigation.getParam('setName')}
                    style={{marginRight:px2dp(20)}}>
                    <Text style={[common.font_h2,{color:common.theme}]}>保存</Text>
                </TouchableOpacity>
            ),
        }
    }
    _setName(){
        const { dispatch,phone,navigation } = this.props;
        dispatch({
            type:'User/setname',
            payload:{
                phone:phone,
                username:this.state.value
            },
            callback:(data)=>{
                navigation.pop();
            }
        })
    }
    componentDidMount(){
        this.props.navigation.setParams({ setName: this._setName.bind(this) });
        const {userInfo} = this.props;
        userInfo && this.setState({
            value:userInfo.username
        })
    }
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    render() {

        return (
           <View>
               <List renderHeader={()=>'好名字可以让你的朋友更容易记住你'}>
                   <InputItem
                     clear={true}
                     defaultValue={'平'}
                     value={this.state.value}
                     onChange={(text)=>{this.setState({
                         value:text
                     })}}
                   />
               </List>
           </View>
        );
    }
}
