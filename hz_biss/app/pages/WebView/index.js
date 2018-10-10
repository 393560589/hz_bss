import React, { PureComponent } from 'react'
import {
  WebView,
    SafeAreaView
} from 'react-native'
import {deviceWidth} from "../../styles";
import {connect} from "../../utils/dva";
import { AndroidBackHandler } from 'react-navigation-backhandler'
@connect(({home})=>({...home}))
export default class IndexPage extends PureComponent {
    state={
        goback:false
    }
    getSource(){
      return this.props.webviewUrl
    }
    onBackButtonPressAndroid=()=>{
        this.state.goback ? this.webView.goBack(): this.props.navigation.pop()
        return true;
    }
    onNavigationStateChange(nav){
        this.setState({
            goback:nav.canGoBack
        })
    }
  render() {
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <SafeAreaView style={{flex:1}}>
                <WebView
                    // renderLoading={(re)=>console.log(re)}
                    source={{ uri: this.getSource() }}
                    onNavigationStateChange={(nav)=>this.onNavigationStateChange(nav)}
                    style={{width:deviceWidth,backgroundColor:'#fff'}}
                    ref={(webView)=> this.webView = webView}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    renderError={ (e) => {if (e === 'WebKitErrorDomain') {return}}}
                />
            </SafeAreaView>
        </AndroidBackHandler>
    )
  }
}