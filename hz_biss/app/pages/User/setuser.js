import React,{PureComponent} from 'react'
import {
    View,Text,
    TouchableOpacity,
    StyleSheet,
    Image,ScrollView,
    Platform
} from 'react-native'
import { Modal,Picker,ActionSheet } from 'antd-mobile-rn'
import { List,ListItem } from '../../components/ListItem'
import {connect} from "../../utils/dva"
import {px2dp} from "../../utils";
import {common, deviceWidth} from '../../styles'
import {user} from "../../config/image"

import ImagePicker from 'react-native-image-picker'
import {AndroidBackHandler} from 'react-navigation-backhandler'
import {headerimg} from "../../servers";
const prompt = Modal.prompt;
const operation = Modal.operation;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

@connect(({User})=>({...User}))

class SetUser extends PureComponent{

    componentDidMount(){
        console.log(this.props)
    }
    onPushPage(page){
       this.props.navigation.navigate(page)
    }
    changeSex(sex){
        const {dispatch,phone} = this.props;
        phone && dispatch({
            type:'User/sex',
            payload:{
                sex:sex,
                phone:phone
            }
        })

    }
    chooseAction = () => {
        const {dispatch,phone} = this.props;
        const options = {
            title: '选择方式',
            quality:0.5,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                // waitUntilSaved: true,
                // cameraRoll: true,
            },
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '打开相册',
            chooseFromLibraryButtonTitle: '打开相机',
        };
        const BUTTONS = ['拍照', '相册', '取消'];
        let parmas = new FormData()
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                //destructiveButtonIndex: BUTTONS.length - 1,
                title: '选择方式',
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },
            (buttonIndex) => {
                console.log(buttonIndex)
            if(buttonIndex === 0){
                ImagePicker.launchCamera(options, (response)  => {
                    // Same code as in above section!
                    console.log(response);
                    this.takeImage(response,phone,dispatch)
                });
            }
            if(buttonIndex === 1){
                ImagePicker.launchImageLibrary(options, (response)  => {
                    // Same code as in above section
                    this.takeImage(response,phone,dispatch)

                });
            }

                //this.setState({ clicked: BUTTONS[buttonIndex] });
            });



    };
    takeImage(response,phone,dispatch){

        if (response.didCancel || response.error) return
        // const _images = [response.uri, ...images].slice(0, 3)
        let type
        Platform.OS === 'ios' ?type = /.*ext=(.*)/g.exec(response.origURL)[1].toLocaleLowerCase():
            type=response.type;

        // this.setState({images: _images})
       // console.log(response, 'response picker')
        const formData = new FormData()
        formData.append('image', {uri: response.uri, name: response.fileName, type})
        headerimg(formData,phone)
            .then(res => {
                console.log(res)
                dispatch({
                    type:'User/userInfo',
                    payload:{
                        phone
                    }
                })
            })
            .catch(e => console.warn(e))
    }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    }
    render(){
        const {dispatch,userInfo} = this.props;
        //const { getFieldProps } = this.props.form;
        let headers =false ;
        headers = userInfo && userInfo.headimgurl
        return (
            <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
                <View>
                    <List styles={{marginTop:px2dp(6)}}>
                       <TouchableOpacity
                           activeOpacity={0.9}
                           style={styles.bt} onPress={()=>this.chooseAction()}>
                           <Text>头像</Text>
                           <Image style={{width:px2dp(60),height:px2dp(60),borderRadius:px2dp(30)}}
                                  source={ headers ? { uri:`${userInfo.headimgurl}` }:user.header }/>
                       </TouchableOpacity>
                    </List>

                    <List border={false}>
                        <ListItem
                            extra={'八九十月'}
                            hasborder>
                            <Text style={common.font_h2}>用户名</Text>
                        </ListItem>
                        <ListItem
                            hasborder
                            Icons={'arrow'}
                              extra={userInfo.sex == 1 ?'男':'女'}
                            onClick={() => operation([
                                { text: '男', onPress: () =>this.changeSex(1)},
                                { text: '女', onPress: () =>this.changeSex(2)},
                            ])}>
                            <Text style={common.font_h2}>性别</Text>
                        </ListItem>
                        <ListItem
                            Icons={'arrow'}
                            extra={ userInfo.username ? userInfo.username:'无'}
                            hasborder
                            onClick={()=>this.onPushPage('SetName')}>
                            <Text style={common.font_h2}>昵称</Text>
                        </ListItem>
                        <ListItem
                            Icons={'arrow'}
                            extra={`${userInfo && userInfo.province && userInfo.province}/${userInfo && userInfo.city && userInfo.city}`}
                            hasborder
                            onClick={()=>this.onPushPage('CityAddress')}>
                            <Text style={common.font_h2}>地址设置</Text>
                        </ListItem>
                    </List>
                </View>

            </AndroidBackHandler>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    imgbox:{
        paddingVertical:px2dp(8),
        minWidth:deviceWidth,
        flexWrap:'nowrap',
        flexDirection:'row'
    },
    bt:{
        marginTop:px2dp(10),
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10),
        height:px2dp(70),
        alignItems:'center'
    }
})

export default SetUser