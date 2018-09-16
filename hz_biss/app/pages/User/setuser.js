import React,{PureComponent} from 'react'
import {
    View,Text,
    Animated,
    StyleSheet,
    Image,ScrollView
} from 'react-native'
import { Modal,Picker,ActionSheet } from 'antd-mobile-rn'
import { List,ListItem } from '../../components/ListItem'
import {connect} from "../../utils/dva"
import {px2dp} from "../../utils";
import {common, deviceWidth} from '../../styles'
import {user} from "../../config/image"

import ImagePicker from 'react-native-image-picker'
import {StorageUtil} from "../../utils/storage";
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
                    console.log(response)
                });
            }
            if(buttonIndex === 1){
                ImagePicker.launchImageLibrary(options, (response)  => {
                    // Same code as in above section!
                    console.log(response)
                });
            }

                //this.setState({ clicked: BUTTONS[buttonIndex] });
            });



    }
    render(){
        const {dispatch,userInfo} = this.props;
        //const { getFieldProps } = this.props.form;
        return (
            <View>
                <View>
                    <List styles={{marginTop:px2dp(6)}}>
                        <ListItem
                            Icons={'arrow'}
                            styles={{paddingTop:px2dp(4),paddingBottom:px2dp(4)}}
                              extra={ <Image style={{width:px2dp(46),height:px2dp(46)}} source={user.tx}/>}
                              onClick={() => {this.chooseAction()}}>
                           头像
                        </ListItem>
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
                            extra={'无'}
                            hasborder
                            onClick={()=>this.onPushPage('CityAddress')}>
                            <Text style={common.font_h2}>地址设置</Text>
                        </ListItem>
                    </List>
                </View>

            </View>
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
    }
})

export default SetUser