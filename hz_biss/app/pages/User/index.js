import React,{PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    RefreshControl,
    ScrollView,

} from 'react-native';
import axios from 'axios'
import {ActionSheet,Toast} from 'antd-mobile-rn'
import {deviceWidth} from '../../styles/common'
import {user} from '../../config/image'
import {px2dp} from "../../utils";
import {common} from '../../styles'
import {connect} from "../../utils/dva";
import { ListItem,List } from '../../components/ListItem'
import Geolocation from 'Geolocation';
import {StorageUtil} from "../../utils/storage";



@connect(({User})=>({...User}))
export default class Users extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,
        }
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
    }


    componentDidMount(){
        const {dispatch} = this.props;
        StorageUtil.get('phone').then(res=>{
            res &&
           dispatch({
               type:'User/userInfo',
               payload:{
                   phone:res
               },
               callback:(data)=>{
                   dispatch({
                       type:'User/update',
                       payload:{
                           phone:res
                       }
                   })
               }
           })
        })
        this.getlocal()
    }
    getlocal() {
        Geolocation.getCurrentPosition(
            val => {
                let ValInfo =
                    '速度：' +
                    val.coords.speed +
                    '\n经度：' +
                    val.coords.longitude +
                    '\n纬度：' +
                    val.coords.latitude +
                    '\n准确度：' +
                    val.coords.accuracy +
                    '\n行进方向：' +
                    val.coords.heading +
                    '\n海拔：' +
                    val.coords.altitude +
                    '\n海拔准确度：' +
                    val.coords.altitudeAccuracy +
                    '\n时间戳：' +
                    val.timestamp;
                this.setState({ LocalPosition: ValInfo });
               // console.log("打印地理位置："+`${val.coords.longitude},${val.coords.latitude}`)

            },
            val => {
                let ValInfo = '获取坐标失败：' + val;
                this.setState({ LocalPosition: ValInfo }); //如果为空的话 没允许开启定位服务

            },
        );
    }
    onRefresh(){
        this.setState({isRefreshing: true});
        //console.log("开始新的刷新方法");
        setTimeout(() => {
            //你的刷新逻辑
            //逻辑执行完之后，修改刷新状态为false
            this.setState({isRefreshing: false});
        }, 2000);
    }
    onPushPage(page){
        const { islogin } = this.props;
        islogin ? this.props.navigation.navigate(page):this.props.navigation.navigate('Login')
    }

    showShareActionSheet = () => {
        this.invites();

    }
    invites(){
        const { dispatch,phone } = this.props;
        dispatch({
            type:'User/invites',
            payload:{
                phone:phone
            },
            callback:(data)=>{
                //console.log()
                ActionSheet.showShareActionSheetWithOptions({
                        options: this.dataList,
                        title: '邀请好友',
                        message: `http://bitss.vip${data.res}`,
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
        })
    }
    render() {
        const {islogin,userInfo} = this.props;
        return (
            <ScrollView style = {{flex:1,backgroundColor:'#f1f1f1'}}
                        refreshControl={  //设置下拉刷新组件
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
                                tintColor='#333'
                                titleColor="#333"
                                title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                            />
                        }
            >
                <View style={styles.container}>
                    <ImageBackground
                        style={[{width:deviceWidth,height:px2dp(270),paddingTop:px2dp(50)}]}
                        source={user.topbanner}
                    >
                        <View style={styles.User_top}>
                            <TouchableOpacity
                                onPress={()=>this.onPushPage('SetUser')}
                                activeOpacity={0.9}
                            >
                                <Image
                                    style={{width:px2dp(90),height:px2dp(90)}}
                                    source={user.tx}
                                />
                            </TouchableOpacity>

                            <View style={styles.User_top_view}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.onPushPage('SetUser')
                                    }}
                                >
                                    <Text style={{
                                        color:common.fff,
                                        textAlign:'center',
                                        marginTop:px2dp(10),
                                        fontSize:px2dp(18),
                                        marginBottom:px2dp(6)
                                    }}>
                                        {
                                           islogin ? userInfo.username : '点击登录'
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {
                                    !islogin &&  <Text style={[common.font_h3,{color:common.fff}]}>
                                        登陆后可享受更多服务
                                    </Text>
                                }

                            </View>
                        </View>
                        <View style={styles.top_list}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.top_item]}>
                               <Text style={[styles.top_text,{fontSize:px2dp(14), marginBottom:px2dp(4),}]}>签到</Text>
                              <Image source={user.qd} style={styles.Iconstyle}/>
                           </TouchableOpacity>
                            <Line/>
                            <View style={styles.top_item}>
                                <Text style={[styles.top_text,{fontSize:px2dp(14), marginBottom:px2dp(4),}]}>搜索令牌</Text>
                                <Text style={styles.top_text}>{ userInfo ? userInfo.integral :0}</Text>
                            </View>
                            <Line />
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={()=>this.showShareActionSheet()}
                                style={styles.top_item}>
                                <Text style={[styles.top_text,{fontSize:px2dp(14), marginBottom:px2dp(4),}]}>邀请好友</Text>
                                <Image source={user.fx} style={styles.Iconstyle}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <List
                        border={false}
                        styles={{marginTop:px2dp(10)}}>
                        <ListItem
                            thumb={<Image style={styles.Iconstyle} source={user.contact}/>}
                            hasborder
                            onClick={()=>this.onPushPage('AboutUS')}
                            Icons={'arrow'}>
                            联系我们
                        </ListItem>
                        <ListItem
                            thumb={<Image style={styles.Iconstyle} source={user.feedback}/>}
                            Icons={'arrow'}
                            onClick={()=>this.onPushPage('FeedBack')}
                        >
                            意见反馈
                        </ListItem>
                    </List>
                    <List
                        border={false}
                        styles={{marginTop:px2dp(10)}}>
                        <ListItem
                            thumb={<Image style={styles.Iconstyle} source={user.sz}/>}
                            Icons={'arrow'}
                            onClick={()=>this.onPushPage('Settings')}
                        >
                            设置
                        </ListItem>
                    </List>

                </View>
            </ScrollView>
        );
    }

}

const Line = (props)=>{
    return (
        <View style={{width:0.4,height:px2dp(22),backgroundColor:'#eee',marginTop:px2dp(10)}}/>
    )
}
const styles = StyleSheet.create({
    Iconstyle:{
        width:px2dp(22),
        height:px2dp(22),
    },
    container: {
        paddingBottom:px2dp(30),
        alignItems:'center',
        //backgroundColor: '#fff',
    },

    User_top_img:{
        position:'absolute',
        right:px2dp(27),
        top:px2dp(25),

    },
    top_list:{
        paddingTop:px2dp(20),
        flexDirection:'row',
        paddingLeft:px2dp(20),
        paddingRight:px2dp(20),
        justifyContent:'space-between',
        height:px2dp(76),
       // alignItems:'center',
    },
    top_item:{
        flex:1,
        //justifyContent:'center',
        alignItems:'center',
        //height:px2dp(76)
    },
    top_text:{
      color:'#fff',
      textAlign:'center',
        fontSize:px2dp(15)
    },
    User_top:{
        marginLeft:px2dp(25),
        flexDirection:'column',
        alignItems:'center'
    },
    User_top_view:{
        justifyContent:'center'
        //justifyContent:'space-around',
    }
});