import React, { PureComponent } from 'react'
import {
    View,
    TextInput,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    WebView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    SafeAreaView
} from 'react-native'
import Header from '../../components/SearchHeader'
import { px2p } from '../../utils';
import { StorageUtil } from '../../utils/storage';
import { connect } from 'dva'
import {deviceWidth} from "../../styles";
import { AndroidBackHandler } from 'react-navigation-backhandler'

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


@connect(({User}) => ({...User}))
export default class Search extends PureComponent {
    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state
        // if (params && params.history && params.shouldHistoryUpdate && params.updateHistory) {
        //   params.updateHistory(params.historyList)
        //   params.shouldHistoryUpdate = false
        // }
        if (params && params.keyword && params.search) {
          // console.log('search', params.keyword)
          params.search(params.keyword)
        }
        // if (params && params.isHistoryVisiable && params.showHistory) {
        //   console.log('showHistory')
        //   params.showHistory()
        // }
        return (
            { header: <Header
                navigation={navigation}
                onSearch={navigation.getParam('onSearch', null)}/>}
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            historyList: [],
            // isInputFocus: true,
            isWebViewVisiable: false,
            keyword: '',
            goback:false
            // isHistoryVisiable: true
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({search: this.search, showHistory: this.showHistory, headerType: 0, backAction: this.webViewBack})
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.initHistoryList()
    }

    componentWillUnmount() {
        this.syncHistoryToLocalStorage()
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    _keyboardDidShow = () => {
        this.props.navigation.isFocused() && this.setState({isWebViewVisiable: false})
    }

    _keyboardDidHide = () => {
        if (this.state.keyword) {
            this.setState({isWebViewVisiable: true})
        }
    }

    webViewBack = () => {
        this.webView.goBack()
    }

    initHistoryList = () => {
        StorageUtil.get('searchHistory')
            .then(historyList => {
               if(!historyList) return;
                const { keyword } = this.state
                    if (keyword) {
                        this.updateHistory(historyList, keyword)
                    } else {
                        this.setState({historyList})
                    }
            })
       
    }

    updateHistory = (historyList, keyword) => {
        const index = historyList.findIndex(h => h === keyword)
        const _history = [keyword].concat(historyList.slice(0, index), historyList.slice(index + 1)).slice(0, 6)
        this.setState({historyList: _history})
    }

    syncHistoryToLocalStorage = () => {
        StorageUtil.save('searchHistory', this.state.historyList)
    }

    clearOneHistory = (_index) => {
        const { historyList } = this.state
        const _history = historyList.filter((_, index) => index !== _index)
        this.setState({historyList: _history})
    }

    clearHistory = () => {
        this.setState({historyList: []})
    }

    search = (keyword) => {
        let { historyList } = this.state

        //console.log(keyword, 'keyword')
        if (keyword !== '' || keyword !== undefined) {
            Keyboard.dismiss()
            // input = this.props.navigation.state.params.inputRef
            // input && input.blur()
            const index = historyList.findIndex(h => h === keyword)
            const _history = [keyword].concat(historyList.slice(0, index), historyList.slice(index + 1)).slice(0, 6)

            this.setState({isWebViewVisiable: true, keyword}, () => this.updateHistory(_history, keyword))
            this.props.navigation.setParams({keyword: ''})
        }
    }

    showHistory = () => {
        this.setState({isWebViewVisiable: false})
    }

    onMessage = ({nativeEvent}) => {
        const res = JSON.parse(nativeEvent.data)
        switch (res.type) {
            case 'post':
                if (!this.props.isLogin) { //gai
                    this.props.navigation.push('EditPost', {id: res.id})
                } else {
                    this.props.navigation.navigate('Login')
                }
                break
            case 'leave':
                this.props.navigation.setParams({headerType: 1, keyword: ''})
                break
            case 'enter':
                this.props.navigation.setParams({headerType: 0, keyword: ''})
                break
        }
    }

    renderHistoryCell = (item, index) => (
        <View style={styles.cellContainer}>
            <Text
                style={{fontSize: px2p(14), color: '#666'}}
                onPress={() => this.search(item)}
            >{item}</Text>
            <TouchableWithoutFeedback
                onPress={() => this.clearOneHistory(index)}
            >
                <Image source={require('../../image/search/close.png')} style={{width: px2p(10), height: px2p(10)}}/>
            </TouchableWithoutFeedback>
        </View>
    )

    renderHistory = () => {
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={Platform.select({ios: 90, android: 50})}>
                <View style={styles.container}>
                    <Text style={{fontSize: px2p(12), color: '#999'}}>搜索历史</Text>
                    {this.state.historyList && this.state.historyList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={item + index}>
                            {this.renderHistoryCell(item, index)}
                        </TouchableOpacity>
                    ))}
                    <Text style={styles.clear} onPress={this.clearHistory}>清空搜索历史</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
    onNavigationStateChange(nav){

        this.setState({
            goback:nav.canGoBack
        })
    }
    renderWebView = () => {
        const { keyword } = this.state;
        return (
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99}}>
                <WebView
                    onNavigationStateChange={(nav)=>this.onNavigationStateChange(nav)}
                    ref={view => this.webView = view}
                    source={{uri: `http://bitss.pro/dist/SearchResult?keyword=${keyword}`}}
                    onMessage={this.onMessage}
                    style={{width:deviceWidth,backgroundColor:'#fff'}}
                    injectedJavaScript={patchPostMessageJsCode}
                />

            </View>
        )
    }
    onBackButtonPressAndroid=()=>{
        this.webView.goBack()
        return true;
    }
    render() {
        return (
            <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
            {/* <SafeAreaView> */}
                {/* <PhoneHeader navigation={this.props.navigation}/> */}
                <View flex={1} backgroundColor={'white'}>
                    {this.state.isWebViewVisiable && this.renderWebView()}
                    {this.renderHistory()}
                </View>
            {/* </SafeAreaView> */}
            </AndroidBackHandler>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: px2p(15),
        paddingTop: px2p(20)
    },
    cellContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#DCDCDC',
        padding: px2p(20),
        paddingBottom: px2p(15)
    },
    clear: {
        marginTop: px2p(40),
        fontSize: px2p(14),
        color: '#666',
        textAlign: 'center'
    }
})