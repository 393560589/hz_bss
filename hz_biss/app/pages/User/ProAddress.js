import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import { Radio,List } from 'antd-mobile-rn'

import {px2dp} from "../../utils";
import { AndroidBackHandler } from 'react-navigation-backhandler'

import {connect} from "../../utils/dva";
import {common} from "../../styles";
const RadioItem = Radio.RadioItem;
@connect(({User})=>({...User}))
export default class ProAddress extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            value:this.props.userInfo.city
        }
    }
    static navigationOptions =({navigation}) =>{
        return {
            headerTitle: '市选择',
            headerRight: (
                <TouchableOpacity
                    onPress={navigation.getParam('setCity')}
                    style={{marginRight:px2dp(20)}}>
                    <Text style={[common.font_h2,{color:common.theme}]}>保存</Text>
                </TouchableOpacity>
            ),
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({ setCity: this._setCity.bind(this) });
    }
    _setCity(){
        const { dispatch,phone,navigation,province } = this.props;

        dispatch({
            type:'User/setCity',
            payload:{
                phone:phone,
                province:province,
                city:this.state.value
            },
            callback:(data)=>{
                //console.log(data);
                navigation.pop(2);
            }
        })
    }
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    }
    render() {
        //const { getFieldProps } = this.props.form;
       const { value } = this.state;
       const { citylist } = this.props;
        return (
            <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <ScrollView style={styles.container}>
                <List renderHeader={()=>'全部'}>
                    {
                        citylist.children.map((i)=>{
                            return (
                                <RadioItem
                                    key={i.value}
                                    checked={value === i.label}
                                    onChange={()=>this.setState({
                                        value:i.label
                                    })}
                                >
                                    {i.label}
                                </RadioItem>
                            )
                        })
                    }
                </List>
            </ScrollView>
            </AndroidBackHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle:{
        marginTop:px2dp(20),
        marginBottom:px2dp(5),
        fontSize:px2dp(10),
        color:'#666',
        marginLeft:px2dp(10),
    }
});
