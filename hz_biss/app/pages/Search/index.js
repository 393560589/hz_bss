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


export default class Search extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state
    if (params && params.historyList) {
      params.initHistory(params.historyList)
    }
    if (params && params.keyword && params.search && !params.isHistoryVisiable) {
      params.search(params.keyword)
    }
    if (params && params.isHistoryVisiable && params.showHistory) {
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
    this.props.navigation.setParams({initHistory: this.initHistory, search: this.search, showHistory: this.showHistory, headerType: 0})
  }

 initHistory = (historyList) => {
    this.setState({historyList})
  }

  toggleInputState = () => {
    this.setState((prev) => ({isInputFocus: !prev.isInputFocus}))
  }

  clearOneHistory = (_index) => {
    const { historyList } = this.state
    const _history = historyList.filter((_, index) => index !== _index)
    StorageUtil.save('searchHistoty', _history)
    this.setState({historyList: _history})
  }

  clearHistory = () => {
    StorageUtil.save('searchHistoty', [])
    this.setState({historyList: []})
  }

  search = (keyword) => {
    if (keyword !== '' || keyword !== undefined) {
      input = this.props.navigation.state.params.inputRef
      input.blur()
      this.setState({isWebViewVisiable: true, keyword})
    }
  }

  showHistory = () => {
    this.setState({isWebViewVisiable: false})
  }

  onMessage = ({nativeEvent}) => {
    console.log(nativeEvent)
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
          {this.state.historyList.map((item, index) => (
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

  renderWebView = ()=> {
    const { keyword } = this.state;
    return (
      <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99}}>
        <WebView
          source={{uri: `http://192.168.2.185:8000/SearchResult?keyword=${keyword}`}}
          onMessage={this.onMessage}
        >
        </WebView>
      </View>
    )
  }

  render() {
    return (
      <View flex={1} backgroundColor={'white'}>
         {this.state.isWebViewVisiable && this.renderWebView()}
        {this.renderHistory()}
      </View>
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