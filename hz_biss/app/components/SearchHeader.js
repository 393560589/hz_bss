import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, TextInput, Image, Text } from 'react-native'
import { px2p } from '../utils'
import { StorageUtil } from '../utils/storage';


const styles = StyleSheet.create({
  container: {
    height: px2p(42),
    // paddingLeft: px2p(11),
    paddingRight: px2p(15),
    paddingLeft: px2p(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  // iconWrapper: {
  //   paddingLeft: px2p(11),
  // },
  backIcon: {
    width: px2p(21),
    height: px2p(15),
    paddingLeft: px2p(11),
    paddingRight: px2p(11),
    marginRight: px2p(15),
    backgroundColor: 'gray'
  }
})

const searchBarStyles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2p(15),
    height: px2p(33),
    width: px2p(300),
    marginRight: px2p(16),
    borderRadius: px2p(5),
    backgroundColor: '#F2F2F5'
  },
  icon: {
    width: px2p(14),
    height: px2p(14),
    marginRight: px2p(10),
    // backgroundColor: '#999'
  }
})

class SearchBar extends PureComponent {
  constructor() {
    super()
    this.state = {
      input: ''
    }
  }

  render() {
    return (
      <View style={searchBarStyles.container}>
        <Image style={searchBarStyles.icon} source={require('../image/search/icon.png')}/>
        <TextInput
          autoFocus
          ref={this.props.inputRef}
          flex={1}
          style={{padding: px2p(5)}}
          placeholder="eos"
          onSubmitEditing={this.props.onSubmit}
          clearButtonMode={'always'}
          returnKeyType={'search'}
        />
      </View>
    )
  }
}

class PhoneHeader extends PureComponent {
  // constructor() {
  //   super()
  //   this.setState = {
  //     history: []
  //   }
  // }

  goBack = () => {
    this.input.blur()
    this.props.navigation.goBack()
  }

  componentDidMount() {
    this.loadHistory()
  }

  loadHistory = async () => {
    const history = await StorageUtil.get('searchHistoty')
    this.history = history
    this.props.navigation.setParams({historyList: history})
  }

  onSubmit = ({nativeEvent}) => {
    const value = nativeEvent.text
    this.history = [value, ...this.history]
    this.props.navigation.setParams({historyList: [...this.history]})
    StorageUtil.save('searchHistoty', [...this.history])
    // 请求
  }

  render() {
    return (
      <SafeAreaView backgroundColor="#fff">
        <View style={styles.container}>
          <SearchBar navigation={this.props.navigation} inputRef={view => this.input = view} onSubmit={this.onSubmit}/>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={{fontSize: px2p(15), color: '#070002'}}>取消</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default PhoneHeader