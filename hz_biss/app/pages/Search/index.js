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
  Platform
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


@connect(({User, search}) => ({...User, ...search}))
export default class Search extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state
    // if (params && params.history && params.shouldHistoryUpdate && params.updateHistory) {
    //   params.updateHistory(params.historyList)
    //   params.shouldHistoryUpdate = false
    // }
    if (params && params.keyword && params.search && !params.isHistoryVisiable) {
      // console.log('search', params.keyword)
      params.search(params.keyword)
    }
    if (params && params.isHistoryVisiable && params.showHistory) {
      // console.log('showHistory')
      params.showHistory()
    }
    console.log(params, 'parmas')
    return (
      { header: <Header navigation={navigation}/>}
    )
  }

  constructor() {
    super()
    this.state = {
      historyList: [],
      isInputFocus: true,
      isWebViewVisiable: false,
      keyword: ''
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'search/updateHistory'
    })
    // this.props.navigation.setParams({updateHistory: this.updateHistory, search: this.search, showHistory: this.showHistory, headerType: 0, backAction: this.webViewBack})
    this.props.navigation.setParams({search: this.search, showHistory: this.showHistory, headerType: 0, backAction: this.webViewBack})
    // this.initHistory()
  }

  webViewBack = () => {
    this.webView.goBack()
  }

  // updateHistory = (history) => {
  //   console.log(history, 'update state')
  //   this.setState({historyList: history})
  // }
  // loadHistory = async () => {
  //   const history = await StorageUtil.get('searchHistory')
  // }

//  initHistory = async () => {
//   const history = await StorageUtil.get('searchHistory')
//     this.setState({historyList: history})
//   }

  toggleInputState = () => {
    this.setState((prev) => ({isInputFocus: !prev.isInputFocus}))
  }

  clearOneHistory = (_index) => {
    const { historyList } = this.state
    const _history = historyList.filter((_, index) => index !== _index)
   StorageUtil.save('searchHistory', _history)
    this.props.dispatch({
      type: 'search/updateHistory'
    })
    // this.setState({historyList: _history})
  }

  clearHistory = () => {
    StorageUtil.save('searchHistory', [])
    this.props.dispatch({
      type: 'search/updateHistory'
    })
    // this.setState({historyList: []})
  }

  search =(keyword) => {
    const { history } = this.props
    if (keyword !== '' || keyword !== undefined) {
      input = this.props.navigation.state.params.inputRef
      input && input.blur()
      this.setState({isWebViewVisiable: true, keyword})
      const index = history.findIndex(h => h === keyword)
      const _history = [keyword].concat(history.slice(0, index), history.slice(index + 1)).slice(0, 6)
      this.props.navigation.setParams({isHistoryVisiable: false, keyword: ''})
      StorageUtil.save('searchHistory', [..._history])
      this.props.dispatch({
        type: 'search/updateHistory'
      })
    }
  }

  showHistory = () => {
    this.setState({isWebViewVisiable: false})
  }

  onMessage = ({nativeEvent}) => {

    const res = JSON.parse(nativeEvent.data)
    // if (res.type === 'post') {
    //   if (!this.props.isLogin) { //gai
    //     this.props.navigation.navigate('EditPost', {id: res.id})
    //   } else {
    //     this.props.navigation.navigate('Login')
    //   }
    // }

    switch (res.type) {
      case 'post':
        if (!this.props.isLogin) { //gai
          this.props.navigation.navigate('EditPost', {id: res.id})
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
          {this.props.history && this.props.history.map((item, index) => (
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

  renderWebView = () => {
    const { keyword } = this.state;
    return (
      <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99}}>
        <WebView
          ref={view => this.webView = view}
          source={{uri: `http://bitss.vip/dist/SearchResult?keyword=${keyword}`}}
          onMessage={this.onMessage}
          style={{width:deviceWidth,backgroundColor:'#fff'}}
          injectedJavaScript={patchPostMessageJsCode}
          // onLoadStart={() => console.log('start load')}
        />

      </View>
    )
  }
    onBackButtonPressAndroid=()=>{
        this.props.navigation.pop()
        return true
    }
  render() {
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
          <View flex={1} backgroundColor={'white'}>
            {this.state.isWebViewVisiable && this.renderWebView()}
            {this.renderHistory()}
          </View>
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