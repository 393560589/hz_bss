import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View
} from 'react-native';
import { InputItem,Button,Picker,Switch } from 'antd-mobile-rn'
import { createForm } from 'rc-form'
import {common,deviceWidth} from "../../styles";
import {px2dp} from "../../utils";
import {commonStyle} from "../../styles/common";

import { pc } from 'antd-mobile-area-data'

import { List,ListItem } from '../../components/ListItem'
import {user} from "../../config/image";
import {connect} from "../../utils/dva";

@connect(({User})=>({...User}))
class Cityaddress extends PureComponent {
    state={
        data:pc
    }
    componentDidMount(){
       console.log(this.state.data)
    }
    ChooseCity(item){
        console.log(item);
        const { dispatch } = this.props;
        dispatch({
            type:'User/update',
            payload:{
                citylist:item
            },
        })
        this.onPushPage('ProAddress')
    }
    onPushPage(page){
     this.props.navigation.navigate(page)
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <ScrollView style={styles.container}>
               <Text style={styles.textStyle}>
                   定位得到位置
               </Text>
                <List>
                    <ListItem
                        thumb={<Image style={{width:px2dp(22),height:px2dp(22)}} source={user.gps}/>}
                    >
                        浙江 杭州
                    </ListItem>
                </List>
                <Text style={styles.textStyle}>
                    全部
                </Text>
                <List>
                    {
                        this.state.data.map((item,index)=>{
                            return (
                                <ListItem
                                    key={index}
                                    Icons={'arrow'}
                                    hasborder
                                    onClick={()=>this.ChooseCity(item)}
                                >
                                    {item.label}
                                </ListItem>
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
export default createForm()(Cityaddress)