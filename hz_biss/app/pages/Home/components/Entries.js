import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import { px2p } from '../../../utils'
import { common } from '../../../styles';
import {connect} from "../../../utils/dva";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: px2p(12),
    paddingBottom: px2p(14),
    paddingLeft: px2p(17),
    paddingRight: px2p(17),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: common.fff,
    marginTop: px2p(8),
    marginBottom: px2p(8)
  },
  entry: {
    alignItems: 'center'
  },
  image: {
      marginBottom:px2p(4),
    width: px2p(30),
    height: px2p(30),
      borderRadius:1000,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    color: common.gary_6,
    fontSize: px2p(12)
  }
})
@connect(({home})=>({...home}))
export default class Entries extends Component {

    openWebView(url){
        this.props.dispatch({
            type:'home/ToWebview',
            payload:{
                webviewUrl:url
            },
            callback:()=>{
                this.props.navigation.navigate('WebViews')
            }
        });

    }
   render(){
     const {data,style} = this.props;
       return (
           <View style={[styles.container,style]}>
               {
                   data && data.map(entry => (
                       <View
                           style={styles.entry}
                           key={entry.title}>
                           <TouchableOpacity
                               activeOpacity={0.7}
                               onPress={()=>this.openWebView(entry.url)}
                           >
                               <Image style={styles.image}
                                      source={{uri:entry.logo}}/>
                           </TouchableOpacity>
                           <TouchableOpacity
                               onPress={()=>this.openWebView(entry.url)}
                               activeOpacity={0.7}
                           >
                                <Text style={styles.text}>{entry.title}</Text>
                           </TouchableOpacity>
                       </View>
                   ))
               }
           </View>
       )
   }

}