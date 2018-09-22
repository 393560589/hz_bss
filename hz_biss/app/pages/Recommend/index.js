import React from 'react';
import {
  View,
    TouchableOpacity, Text
} from 'react-native';
import {px2dp, px2p} from '../../utils';
import Loading from '../../components/loading'
import { common,deviceWidth } from '../../styles';
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {connect} from "../../utils/dva";

import WebView from 'react-native-webview-plugin'
const patchPostMessageFunction = function() {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

@connect(({User})=>({...User}))
export default class Recommend extends React.Component {
  constructor() {
      super()
  }
    state={
      loading:true
    }
    static navigationOptions = ({ navigation }) => {
        const HeaderType= navigation.state.params && navigation.state.params.headerType;
        return {
            headerTitle: '币讯',   //导航标题
            headerLeft: HeaderType === 1 &&(
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        navigation.state.params.goBackPage();
                    }}
                >
                    <View style={{ paddingLeft: 20 }}>
                     <Text>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            //导航左与导航右是为了让导航标题居中(Why?)
            headerRight: HeaderType === 1 && (<View style={{ paddingRight: 20 }} />)
        };
    };
    componentDidMount(){
        this.props.navigation.setParams({//给导航中增加监听事件
            goBackPage: this._goBackPage
        });
    }
    _goBackPage = () => {
        this.webView.goBack();
    };
    getSource() {
       return 'http://bitss.vip/dist/'
    }
    onNavigationStateChange = navState => {
        //console.log(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    // 监听原生返回键事件
    onBackButtonPressAndroid=()=>{
        if (this.state.backButtonEnabled) {
            this.webView.goBack();
            return true;
        } else {
            this.props.navigation.navigate('Home')
            return true;
        }
    }
    startloading=()=>{
        console.log('开始处理')
    };
    onMessage = ({nativeEvent}) => {
        const res = JSON.parse(nativeEvent.data);
        switch (res.type) {
            case 'leave':
                this.props.navigation.setParams({headerType: 1, keyword: ''})
                break
            case 'enter':
                this.props.navigation.setParams({headerType: 0, keyword: ''})
                break
        }

    }
  render() {
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <View style={{flex:1}}>
               {/* <Loading/>*/}
                <WebView
                    //startInLoadingState={this.state.loading}
                    onMessage={this.onMessage}
                    source={{ uri: this.getSource() }}
                    style={{width:deviceWidth,backgroundColor:'#fff'}}
                    ref={(webView)=> this.webView = webView}
                    onNavigationStateChange={this.onNavigationStateChange}
                    injectedJavaScript={patchPostMessageJsCode}
                    //onShouldStartLoadWithRequest={(ev)=>console.log(ev)}
                />
            </View>
        </AndroidBackHandler>

        //192.168.2.185

    )
  }
}
