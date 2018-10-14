
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import { deviceWidth } from '../styles';

import {connect} from "../utils/dva";

import {px2dp} from '../utils'
import {Toast} from "antd-mobile-rn/lib/index.native";
import * as wechat from 'react-native-wechat'

import Modal from "react-native-modal";

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

        }
        wechat.registerApp('wxbf4343a91db60bba');
    }



    //发送给朋友
    closeDispatch(){
        const {dispatch} = this.props;
        dispatch({
            type:'User/update',
            payload:{
                shareOpen:false,
                shareData:'',
                shareUrl:''
            }
        })
    }
    onWechatFriend(){

        const {shareData,shareUrl} = this.props;


        wechat.isWXAppInstalled()
            .then(isInstalled=>{
                if(isInstalled){
                    shareData &&
                    wechat.shareToSession({
                        type: 'imageUrl',
                        title: '邀请好友',
                        description: '币搜索',
                        mediaTagName: shareData,
                        messageAction: undefined,
                        messageExt: undefined,
                        thumbImage:shareData,
                        imageUrl: shareData
                    });
                    shareUrl &&
                    wechat.shareToSession({
                        type: 'news',
                        title: shareUrl.title,
                        description: shareUrl.content,
                        thumbImage: `https://bitss.pro/static/img/index/logo_1.png`,
                        webpageUrl:`https://bitss.pro/dist/coinMessageShare/?id=${shareUrl.id}`
                    });

                   this.closeDispatch()
                }else{
                   // Toast.info('请安装微信')
                }
            })
    }
    //分享到朋友圈
    onWechatLine(){
        const {shareData,shareUrl,dispatch} = this.props;

        wechat.isWXAppInstalled()
            .then(isInstalled=>{
                if(isInstalled){
                    shareData &&
                    wechat.shareToTimeline({
                        type: 'imageUrl',
                        title: '邀请好友',
                        description: '币搜索',
                        mediaTagName: shareData,
                        messageAction: undefined,
                        messageExt: undefined,
                        thumbImage:shareData,
                        imageUrl: shareData
                    });
                    shareUrl &&
                    wechat.shareToTimeline({
                        type: 'news',
                        title: shareUrl.title,
                        description: shareUrl.content,
                        thumbImage: `https://bitss.pro/static/img/index/logo_1.png`,
                        webpageUrl:`https://bitss.pro/dist/coinMessageShare/?id=${shareUrl.id}`
                    });
                    this.closeDispatch()

                }else{
                   // Toast.info('请安装微信')
                }
            })
    }
    render() {
        return (
            <Modal
                style={styles.bottomModal}
                isVisible={this.props.shareOpen}>
                <View style={styles.share_box}>
                    <View style={styles.share_icon}>
                        <TouchableOpacity style={styles.share_icon_box}
                            onPress={()=>this.onWechatFriend()}
                                          activeOpacity={1}
                        >
                            <Image style={styles.img1} source={require('../image/coin/wechat.png')} alt='' />
                            <Text style={styles.share_span}>微信</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.share_icon_box}
                                          activeOpacity={1}
                              onPress={()=>this.onWechatLine()}
                        >
                            <Image style={styles.img2} source={require('../image/coin/friend.png')} alt='' />
                            <Text style={styles.share_span}>朋友圈</Text>
                        </TouchableOpacity>
                        {/* <View className={styles.share_icon_box}>
                                <Image style={styles.img3} source={require('../../image/coin/weibo.png')} alt='' />
                            <Text>微博</Text>
                        </View>*/}
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=>{this.props.dispatch({type:'User/update',payload:{shareOpen:false}})}}
                        style={styles.share_cancel}>
                        <Text style={styles.share_cancel_text}>取消</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles= StyleSheet.create({
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    share_box:{
        width: deviceWidth,
        height:px2dp(130),
        backgroundColor: '#fff',
    },
    share_cancel:{
        height:px2dp(48),
        alignItems:'center',
        justifyContent:'center',
    },
    share_cancel_text:{
        fontSize:px2dp(16),
        color:'#888'
    },
    share_icon:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        height:px2dp(80),
    },
    share_icon_box:{
        alignItems:'center',
        justifyContent:'center',
        marginLeft:px2dp(65),
        flexDirection:'column',
    },
    share_span:{
        fontSize:px2dp(14),
        color:'#333',
        paddingTop:px2dp(11),
    },
    img1:{
        width:px2dp(34),
        height:px2dp(28)
    },
    img2:{
        width:px2dp(28),
        height:px2dp(28)
    },
    img3:{
        width:px2dp(26),
        height:px2dp(30)
    }
})