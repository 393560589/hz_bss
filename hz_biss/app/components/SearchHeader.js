import React, { PureComponent, Component } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, TextInput, Image, Text, Platform } from 'react-native'
import { px2p } from '../utils'
import { StorageUtil } from '../utils/storage';


const styles = StyleSheet.create({
  container: {
    height: px2p(42),
    // paddingLeft: px2p(11),
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

class FuckInput extends Component {
  shouldComponentUpdate (nextProps){
    return Platform.OS !== 'ios'
      || (this.props.value === nextProps.value && (nextProps.defaultValue == undefined || nextProps.defaultValue == '' ))
      || (this.props.defaultValue === nextProps.defaultValue && (nextProps.value == undefined || nextProps.value == '' ));
  }

  render() {
    return (
      <TextInput {...this.props} ref={this.props.inputRef}/>
    )
  }
}
class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({updateKValue: this.updateKValue})
  }

  updateKValue = value => {
    this.setState({value})
  }

  render() {
    const autoFocus = this.props.navigation.getParam('autoFocus', true)
    return (
      <View style={searchBarStyles.container}>
        <Image style={searchBarStyles.icon} source={require('../image/search/icon.png')}/>
        {/* <TextInput
          autoFocus={autoFocus}
          ref={this.props.inputRef}
          flex={1}
          style={{padding: px2p(5)}}
          placeholder="eos"
          onSubmitEditing={this.props.onSubmit}
          // onFocus={this.props.onFocus}
          clearButtonMode={'always'}
          returnKeyType={'search'}
          // onBlur={this.props.onBlur}
          underlineColorAndroid='transparent'
        /> */}
        <FuckInput
          flex={1}
          style={{padding: px2p(5)}}
          autoFocus={autoFocus}
          inputRef={this.props.inputRef}
          value={this.state.value}
          onChangeText={text => this.setState({value: text})}
          clearButtonMode={'always'}
          returnKeyType={'search'}
          onSubmitEditing={this.props.onSubmit}
          underlineColorAndroid='transparent'
          placeholder="eos"
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </View>
    )
  }
}

class PhoneHeader extends PureComponent {

  // componentDidMount() {
  //   // this.props.navigation.setParams({inputRef: this.input})
  //   // this.props.onFocus()
  // }

  goBack = () => {
    this.input.blur()
    this.props.navigation.goBack()
  }

  onSubmit = ({nativeEvent}) => {
    const value = nativeEvent.text
    if (value) {
      // let _history = []
      //  StorageUtil.get('searchHistory').then(history=>{
      //    console.log(history, 'history')
      //      const index = history.findIndex(h => h === value)
      //      if (index !== -1) {
      //          _history = [value].concat(history.slice(0, index), history.slice(index + 1)).slice(0, 6)
      //      } else {
      //          _history = [value, ...history].slice(0, 6)
      //      }
           this.props.navigation.setParams({keyword: value})
           this.input.blur()
          //  StorageUtil.save('searchHistory', [..._history])
      //  }
    } else {
      // 搜索默认词 && 设置state为默认词。
      this.props.navigation.setParams({keyword: 'eos'})
      this.input.blur()
    }
  }
  
  onFocus = () => {
    this.props.navigation.setParams({isHistoryVisiable: true})
  }

  onBlur = () => {
    this.props.navigation.setParams({isHistoryVisiable: false})
  }

  render() {
    const headerType = this.props.navigation.getParam('headerType', 1)
    const backAction = this.props.navigation.getParam('backAction', null)
    const Back = (<TouchableOpacity style={{paddingRight: px2p(14), paddingLeft: px2p(14)}} onPress={backAction}><Image source={require('../image/search/back.png')}/></TouchableOpacity>)
    return (
      <SafeAreaView backgroundColor="#fff">
        <View style={[styles.container, {paddingLeft: headerType === 1 ? 0 : px2p(15)}]}>
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