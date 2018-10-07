import React from 'react';
import {
  View,SafeAreaView,
    TouchableOpacity, Text,Image
} from 'react-native';
import { ActionSheet } from 'antd-mobile-rn'
import { common,deviceWidth } from '../../styles';
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {connect} from "../../utils/dva";

import WebView from 'react-native-webview-plugin'
import {Toast} from "antd-mobile-rn/lib/index.native";

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
      this.dataList = [
          { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
          { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
          { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
          { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
          { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
      ].map(obj => ({
          icon: <Image alt={obj.title} style={{ width: 36 }} />,
          title: obj.title,
      }));
      this.state={
          goback:false,
          loading:true
      }
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
        return 'http://192.168.2.222:8000'
       //return 'http://bitss.pro/dist/'
    }
    onNavigationStateChange = navState => {
        //console.log(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    // 监听原生返回键事件
    onBackButtonPressAndroid=()=>{
       this.webView.goBack()
        return true
    }
    onShare(data){
        console.log(data)
        ActionSheet.showShareActionSheetWithOptions({
                options: this.dataList,
                title: '邀请好友',
                message: data,
            },
            (buttonIndex) => {
                this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
                // also support Promise
                return new Promise((resolve) => {
                    Toast.info('closed after 1000ms');
                    setTimeout(resolve, 1000);
                });
            });
    }
    onMessage = ({nativeEvent}) => {
        const res = JSON.parse(nativeEvent.data);
       // console.log('数据源',res)
        switch (res.type) {
            case 'leave':
                this.props.navigation.setParams({headerType: 1, keyword: ''});
                break
            case 'enter':
                this.props.navigation.setParams({headerType: 0, keyword: ''});
                break
            case 'share':
                this.onShare(res.data);
                break;
            case 'search':
                this.openSearchPage();
                break;

        }
    };
    openSearchPage(){
        this.props.navigation.navigate('Search')
    }
  render() {
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <SafeAreaView style={{flex:1}}>
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
            </SafeAreaView>
        </AndroidBackHandler>
    )
  }
}
