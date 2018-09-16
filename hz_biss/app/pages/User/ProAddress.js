import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View
} from 'react-native';
import { Radio,List } from 'antd-mobile-rn'

import {px2dp} from "../../utils";
//import {commonStyle} from "../../styles/common";
//import { pc } from 'antd-mobile-area-data'
//import { ,ListItem } from '../../components/ListItem'

import {connect} from "../../utils/dva";
const RadioItem = Radio.RadioItem;
@connect(({User})=>({...User}))
export default class ProAddress extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            value:''
        }
    }
    componentDidMount(){
        //console.log(this.state.data)
    }
    ChooseCity(item){

    }
    onPushPage(page){
        this.props.navigation.navigate(page)
    }
    render() {
        //const { getFieldProps } = this.props.form;
       const { value } = this.state;
       const { citylist } = this.props;
        return (
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
