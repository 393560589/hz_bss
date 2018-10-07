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

//  return 'http://192.168.124.13:8000'

const baseUrl = 'http://192.168.2.222:8000/SearchResult?keyword=';
const postDetailUrl = 'http://192.168.2.222:8000/BiBaDetail?id=';

// const baseUrl = 'http://bitss.pro/dist/SearchResult?keyword=';
// const postDetailUrl = 'http://bitss.pro/dist/BiBaDetail?id=';


const patchPostMessageFunction = function() {
    let originalPostMessage = window.postMessage;

    let patchedPostMessage = function(message, targetOrigin, transfer) {
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
        //   console.log('search', params.keyword)
          params.search(params.keyword)
        }
        if (params && params.toggleHistory) {
        //   console.log('toggleHistory', params.isHistoryVisiable)
          params.toggleHistory(params.isHistoryVisiable)
        }
        return (
            { header: <Header
                navigation={navigation}
                onSearch={navigation.getParam('onSearch', null)}/>}
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            historyList: new Set(),
            // isInputFocus: true,
            isWebViewVisiable: false,
            keyword: '',
            goback:false,
            uri: '',
            isInSearch:false,
            // isHistoryVisiable: true
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            search: this.search,
            toggleHistory: this.toggleHistory,
            headerType: 0,
            backAction: this.webViewBack,
            reload: this.webViewreload
        })
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.initHistoryList()
    }

    componentWillUnmount() {

        this.syncHistoryToLocalStorage()

        // this.keyboardDidShowListener.remove()
        // this.keyboardDidHideListener.remove()
    }

    _keyboardDidShow = () => {
        this.props.navigation.isFocused() && this.setState({isWebViewVisiable: false})
    }

    _keyboardDidHide = () => {
        if (this.state.keyword && this.props.navigation.isFocused()) {
            this.setState({isWebViewVisiable: true})
        }
    }

    webViewBack = () => {
        this.webView.goBack()
    }

    goPostDetail = (id) => {
        this.setState({uri: `${postDetailUrl}${id}`})
    }

    initHistoryList = () => {
        StorageUtil.get('searchHistory')
            .then(historyList => {
               if(!historyList) return;
                const { keyword } = this.state
                    if (keyword) {
                        this.updateHistory(new Set(historyList), keyword)
                    } else {
                        this.setState({historyList: new Set(historyList)})
                    }
            })
       
    }

    updateHistory = (historyList, keyword) => {
        if (historyList.has(keyword)) {
            historyList.delete(keyword) 
        }
        historyList.add(keyword)
        // const history = new Set(historyList).add(keyword)
        const _history = historyList.size > 6
            ? [...historyList].slice(1, 7)
            : [...historyList]
        // const index = historyList.findIndex(h => h === keyword)
        // const _history = [keyword].concat(historyList.slice(0, index), historyList.slice(index + 1)).slice(0, 6)
        this.setState({historyList: new Set(_history)})
    }

    syncHistoryToLocalStorage = () => {
        StorageUtil.save('searchHistory', [...this.state.historyList])
    }

    clearOneHistory = (item) => {
        const { historyList } = this.state
        historyList.delete(item)
        // const _history = historyList.filter((_, index) => index !== _index)
        this.setState({historyList: new Set([...historyList])})
    }

    clearHistory = () => {
        this.setState({historyList: new Set()})
    }

    search = (keyword) => {
        let { historyList } = this.state

        //console.log(keyword, 'keyword')
        if (keyword !== '' || keyword !== undefined) {
            Keyboard.dismiss()
            // input = this.props.navigation.state.params.inputRef
            // input && input.blur()
            // const index = historyList.findIndex(h => h === keyword)
            // const _history = [keyword].concat(historyList.slice(0, index), historyList.slice(index + 1)).slice(0, 6)
            // const _history = historyList.add(keyword)
            const cb = this.props.navigation.getParam('updateKValue', null);
            cb && cb(keyword);
            this.setState({isWebViewVisiable: true, keyword, uri: `${baseUrl}${keyword}&phone=${this.props.phone}`}, () => this.updateHistory(historyList, keyword))
            this.props.navigation.setParams({keyword: ''})
        }
    }

    toggleHistory = (isHistoryVisiable = false) => {
        this.setState({isWebViewVisiable: !isHistoryVisiable})
    }

    onMessage = ({nativeEvent}) => {
        const res = JSON.parse(nativeEvent.data);

        switch (res.type) {
            case 'post':
                if (this.props.islogin) { // 修改
                    this.props.navigation.push('EditPost', {id: res.id, title: res.title, successCb: this.goPostDetail})
                } else {
                    this.props.navigation.navigate('Login')
                }
                break
            case 'leave':
                this.setState({
                    isInSearch:true
                })
                this.props.navigation.setParams({headerType: 1, keyword: ''})
                break
            case 'enter':
                this.setState({
                    isInSearch:false
                })
                this.props.navigation.setParams({headerType: 0, keyword: ''})
                break
        }
    }

    renderHistoryCell = item => (
        <View style={styles.cellContainer}>
            <TouchableOpacity activeOpacity={1} style={{flex:1}} onPress={() => this.search(item)}>
                <Text
                    style={{fontSize: px2p(14), color: '#666'}}
                >{item}</Text>
            </TouchableOpacity>

            <TouchableWithoutFeedback
                onPress={() => this.clearOneHistory(item)}
            >
                <Image source={require('../../image/search/close.png')} style={{width: px2p(10), height: px2p(10)}}/>
            </TouchableWithoutFeedback>
        </View>
    )

    renderHistory = () => {
      //  console.log(this.state.historyList, 'historyList')
        const _history = ([...this.state.historyList])
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={Platform.select({ios: 90, android: 50})}>
                <View style={styles.container}>
                    <Text style={{fontSize: px2p(12), color: '#999'}}>搜索历史</Text>
                    {this.state.historyList && _history.reverse().map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={item + index}>
                            {this.renderHistoryCell(item)}
                        </TouchableOpacity>
                    ))}
                    <Text style={styles.clear} onPress={this.clearHistory}>清空搜索历史</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
    onNavigationStateChange(nav){
     //   console.log(nav)
        if (nav.canGoBack) {
            this.props.navigation.setParams({headerType: 1, keyword: ''})
        } else {
            this.props.navigation.setParams({headerType: 0, keyword: ''})
        }
        this.setState({
            goback:nav.canGoBack
        })
    }
    renderWebView = () => {
        const { uri } = this.state;
        return (
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99}}>
                <WebView
                    onNavigationStateChange={(nav)=>this.onNavigationStateChange(nav)}
                    ref={view => this.webView = view}
                    //source={{uri: `http://bitss.pro/dist/SearchResult?keyword=${keyword}`}}

                    source={{uri}}

                    onMessage={this.onMessage}
                    style={{width:deviceWidth,backgroundColor:'#fff'}}
                    injectedJavaScript={patchPostMessageJsCode}
                />

            </View>
        )
    }
    onBackButtonPressAndroid=()=>{
       const { isInSearch, goback } = this.state;
       if(!isInSearch && !goback){
           this.props.navigation.pop()
       }else{
           this.webView.goBack();
       }


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