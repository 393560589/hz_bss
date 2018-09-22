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
          onFocus={this.props.onFocus}
          clearButtonMode={'always'}
          returnKeyType={'search'}
          onBlur={this.props.onBlur}
          underlineColorAndroid='transparent'
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
    // this.history = history
    this.props.navigation.setParams({historyList: history})
  }

  onSubmit = async ({nativeEvent}) => {
    const value = nativeEvent.text
    if (value) {
      let _history = []
      const history = await StorageUtil.get('searchHistoty')
      const index = history.findIndex(h => h === value)
      if (index !== -1) {
        _history = [value].concat(history.slice(0, index), history.slice(index + 1)).slice(0, 6)
      } else {
        _history = [value, ...history].slice(0, 6)
      }
      this.props.navigation.setParams({historyList: [..._history], keyword: value, isHistoryVisiable: false})
      StorageUtil.save('searchHistoty', [..._history])
    }
  }
  
  onFocus = () => {
    this.props.navigation.setParams({isHistoryVisiable: true, inputRef: this.input})
  }

  onBlur = () => {
    this.props.navigation.setParams({isHistoryVisiable: false})
  }

  render() {
    const headerType = this.props.navigation.getParam('headerType', 1)
    const backAction = this.props.navigation.getParam('backAction', null)
    const Back = (<TouchableOpacity style={{marginRight: px2p(14)}} onPress={backAction}><Image source={require('../image/search/back.png')}/></TouchableOpacity>)
    return (
      <SafeAreaView backgroundColor="#fff">
        <View style={styles.container}>
          {headerType === 1 && Back}
          <SearchBar
            navigation={this.props.navigation}
            inputRef={view => this.input = view}
            onSubmit={this.onSubmit}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {headerType === 0 && <TouchableOpacity onPress={this.goBack}>
            <Text style={{fontSize: px2p(15), color: '#070002'}}>取消</Text>
          </TouchableOpacity>}
        </View>
      </SafeAreaView>
    )
  }
}

export default PhoneHeader