import React from 'react';
import {
  View,
    TouchableOpacity,
    WebView,Text
} from 'react-native';
import {px2dp, px2p} from '../../utils';
import { common,deviceWidth } from '../../styles';
import { AndroidBackHandler } from 'react-navigation-backhandler'
export default class Recommend extends React.Component {
  constructor() {
      super()
  }
    state={
      loading:false
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '币讯',   //导航标题
            headerLeft: (
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
            headerRight: <View style={{ paddingRight: 20 }} />
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
       return 'http://192.168.2.185:8000'
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
            return false;
        }
    }
  render() {
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <View style={{flex:1}}>
                <WebView
                    onLoadStart={()=>{this.setState({loading:true})}}
                    onLoadEnd={()=>this.setState({loading:false})}
                    startInLoadingState={this.state.loading}
                    source={{ uri: this.getSource() }}
                    style={{width:deviceWidth,backgroundColor:'#fff'}}
                    ref={(webView)=> this.webView = webView}
                    onNavigationStateChange={this.onNavigationStateChange}
                    //onShouldStartLoadWithRequest={(ev)=>console.log(ev)}
                />
            </View>
        </AndroidBackHandler>

        //192.168.2.185

    )
  }
}
