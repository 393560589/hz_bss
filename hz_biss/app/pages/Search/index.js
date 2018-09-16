import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  WebView
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
    return (
      { header: <Header navigation={navigation}/>}
    )
  }

  constructor() {
    super()
    this.state = {
      historyList: [],
      isInputFocus: true
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({initHistory: this.initHistory})
  }

 initHistory = (historyList) => {
    this.setState({historyList})
  }

  toggleInputState = () => {
    this.setState((prev) => ({isInputFocus: !prev.isInputFocus}))
  }

  clearHistory = () => {
    StorageUtil.save('searchHistoty', [])
    this.setState({historyList: []})
  }

  renderHistoryCell = (item) => (
    <View style={styles.cellContainer}>
      <Text style={{fontSize: px2p(14), color: '#666'}}>{item}</Text>
      <TouchableWithoutFeedback>
        <Image source={require('../../image/search/close.png')} style={{width: px2p(10), height: px2p(10)}}/>
      </TouchableWithoutFeedback>
    </View>
  )

  render() {
    return (
      <View flex={1} backgroundColor={'white'}>
        <View style={styles.container}>
          <Text style={{fontSize: px2p(12), color: '#999'}}>搜索历史</Text>
          {this.state.historyList.map(item => (
            <TouchableOpacity key={item}>
              {this.renderHistoryCell(item)}
            </TouchableOpacity>
          ))}
          <Text style={styles.clear} onPress={this.clearHistory}>清空搜索历史</Text>
        </View>
        {/* <WebView 
          onLoadStart={() => console.log('start laod')}
          source={{uri: 'https://www.baidu.com'}}
        /> */}
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