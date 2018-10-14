import React from 'react';
import {
  View,SafeAreaView, Text,Image,StyleSheet
} from 'react-native';

import { deviceWidth,deviceHeight } from '../../styles';
import { AndroidBackHandler } from 'react-navigation-backhandler'
import {connect} from "../../utils/dva";

import WebView from 'react-native-webview-plugin'

import * as wechat from 'react-native-wechat'
import {formatData, px2dp} from "../../utils";
import ShareBox from "../../components/sharebox";
//import { captureRef } from "react-native-view-shot";
var ReactNative = require('react-native');

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
      this.state={
          goback:false,
          loading:true,
          open:true,
          previewSource:{},

      }
      wechat.registerApp('wxbf4343a91db60bba');
  }
   /* static navigationOptions = ({ navigation }) => {
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
    };*/
    componentDidMount(){
        this.props.navigation.setParams({//给导航中增加监听事件
            goBackPage: this._goBackPage
        });
    }
    _goBackPage = () => {
        this.webView.goBack();
    };
    getSource() {
       return 'http://192.168.124.13:8000'
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
    //发送给朋友
    onShare(data){
       // console.log(data);
        this.thisShareData(data);
      /*  const { dispatch } = this.props;
        dispatch({
            type: 'User/getCoinDetail',
            payload: {
                id:data
            },
            callback:(item)=>{
               //console.log(captureRef)
                setTimeout(()=>{
                    this.onImageLoad();
                },2000)

            }
        })*/
    }
    onImageLoad = () => {

        ReactNative.takeSnapshot(this.sharePic, {format: 'png', quality: 1})
            .then( (uri) => {
                //alert(uri);
                this.thisShareData(uri)
            })
            .catch( (error) => alert(error) );

    };
    thisShareData(data){
        const { dispatch } = this.props;
        dispatch({
            type:'User/update',
            payload:{
                shareOpen:true,
                shareUrl:data,
            }
        })
    }
    //分享到朋友圈

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
    renderRange = (range) => {
        let length = parseInt(range, 10);
        let data = [];

        for(let i = 0; i < length; i++) {
            data.push(<Image key={i} style={{ width:px2dp(13),height:px2dp(12),marginRight: px2dp(5) }} source={require('../../image/coin/star.png')} alt="" />)
        }

        return data;
    };
  render() {
      const { coinDetail } = this.props;
/*
      const coinView =

          <View style={styles.shot_page} ref={sharePic=>this.sharePic=sharePic}>
              <View>
                  <Image source={require('../../image/coin/banner.png')} style={styles.shot_banner}/>
              </View>
              {
                  coinDetail &&coinDetail.title && (
                      <View style={[styles.shot_title,styles.pd_lr]}>
                          <Text style={styles.shot_title_text}>{coinDetail.title}</Text>
                      </View>
                  )
              }
              {
                  coinDetail &&coinDetail.created_at && (
                      <View style={[styles.shot_time,styles.pd_lr]}>
                          <Text style={styles.shot_time_text}>{formatData(coinDetail.created_at)}</Text>
                      </View>
                  )
              }
              {
                  coinDetail && coinDetail.content && (
                      <View style={[styles.shot_content,styles.pd_lr]}>
                          <Text style={styles.shot_content_text}>
                              { coinDetail.content }
                          </Text>
                      </View>
                  )
              }
              <View style={[styles.pd_lr,styles.shot_stars]}>
                  <Text>重要程度:</Text>{ coinDetail && coinDetail.grade && this.renderRange(coinDetail.grade) }
              </View>

              <View>
                  <Image source={require('../../image/coin/yay.jpg')} style={styles.shot_btm_yay}/>
              </View>
          </View>
*/


    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            <SafeAreaView style={{flex:1}}>
                <WebView
                    onMessage={this.onMessage}
                    source={{ uri: this.getSource() }}
                    style={styles.webViews}
                    ref={(webView)=> this.webView = webView}
                    onNavigationStateChange={this.onNavigationStateChange}
                    injectedJavaScript={patchPostMessageJsCode}
                />

                <ShareBox />
            </SafeAreaView>

        </AndroidBackHandler>
    )
  }
}
const styles = StyleSheet.create({
    webViews:{
        width:deviceWidth,
        backgroundColor:'#fff',
        flex:1,
        zIndex:99,
        height:deviceHeight,
        position:'absolute',
        left:0,
        top:0,
    },
    pd_lr:{
        paddingLeft:px2dp(20),
        paddingRight:px2dp(20),
    },
    shot_content:{
        marginTop:px2dp(14),
        minHeight:px2dp(260),
        marginBottom:px2dp(10),
    },
    shot_content_text:{
        fontSize:px2dp(14),
        color:'#333',
        letterSpacing:1,
        lineHeight:px2dp(18)
    },
    shot_title:{
        marginTop:px2dp(16),
        marginBottom:px2dp(12),
    },
    shot_title_text:{
        fontSize:px2dp(18),
        color:'#333',
        fontWeight:'900'
    },
    shot_stars:{
        flexDirection:'row',
        marginBottom:px2dp(14),
    },
    shot_time:{
        marginTop:px2dp(10),
        height:px2dp(40),
        borderStyle:'solid',
        borderColor:'#eee',
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        justifyContent:'center'
    },
    shot_time_text:{
        fontSize:px2dp(12),
        color:'#999',

    },
    shot_page:{
        zIndex:2,
        top:deviceHeight,
        position:'absolute',
        backgroundColor:'#fff'
    },
    shot_banner:{
        width:deviceWidth,
        height:px2dp(132),
    },
    shot_btm_yay:{
        width:deviceWidth,
        height:px2dp(125),
    }
})