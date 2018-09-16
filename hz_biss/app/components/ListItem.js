import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import {img} from '../config/image'
import {px2dp} from '../utils'
//import {Icon } from 'antd-mobile-rn'
import {deviceWidth} from '../styles/common'
import {user} from '../config/image'

export const List =(props)=>{
    const { styles,border,renderHeader } = props;
    return (
        <View style={[{
            borderTopWidth:border ? 1 :0,
            borderBottomWidth:border ? 1:0,
            borderColor:'#eee',
        },styles]}>
            {
                renderHeader &&
                <View style={{
                    paddingLeft:px2dp(10),
                    paddingRight:px2dp(10),
                    justifyContent:'center',
                    minHeight:px2dp(40),backgroundColor:'#fff'}}>
                    <Text style={{ color: '#4E8CEE'}}>{renderHeader}</Text>
                </View>

            }
            { props.children }
        </View>
    )
};
List.defaultProps={
    border:true,
    renderHeader:false
};

export const ListItem =(props)=>{
   // console.info(props);
    const { Icons,thumb,extra,styles,onClick,hasborder } = props;
    let ico = Icons === 'arrow' ? img.leftarrow : Icons;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[Styles.viewwrap,styles,{borderBottomColor:'#eee',borderBottomWidth:hasborder ? 1:0}]} onPress={ onClick }>
            <View style={{flexDirection:'row',alignItems:'center'}}>

                {
                    thumb && <View style={{marginRight:px2dp(10)}}>
                        { thumb }
                    </View>
                }
                <View>
                    <Text style={{fontSize:px2dp(15)}}>{props.children}</Text>
                </View>
            </View>
            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                <Text style={{fontSize:px2dp(13),color:'#999'}}>{ extra }</Text>
                {
                    ico && <Image source={ ico } style={{width:px2dp(20),height:px2dp(20)}}/>
                }
            </View>
        </TouchableOpacity>
    )
};
ListItem.defaultProps={
    Icons:false,
    extra:'',
    thumb:false,
    hasborder:false,
    onClick:()=>{}
}
const Styles = StyleSheet.create({

    viewwrap:{
        backgroundColor:'#fff',
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10),
        width:deviceWidth,
        flexDirection:'row',
        justifyContent:'space-between',
        minHeight:px2dp(44),
        alignItems:'center',
    }

});