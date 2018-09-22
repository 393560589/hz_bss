import React, { PureComponent } from 'react'
import {
  WebView
} from 'react-native'
import {deviceWidth} from "../../styles";
import {connect} from "../../utils/dva";
import { AndroidBackHandler } from 'react-navigation-backhandler'
@connect(({home})=>({...home}))
export default class IndexPage extends PureComponent {
    getSource(){
      return this.props.webviewUrl
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.navigate('Home')
        return true;
    }
  render() {
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <WebView
                source={{ uri: this.getSource() }}
                style={{width:deviceWidth,backgroundColor:'#fff'}}
                ref={(webView)=> this.webView = webView}
                startInLoadingState={true}
            />
        </AndroidBackHandler>
    )
  }
}