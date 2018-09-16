import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
    Platform,
    WebView,
  SafeAreaView
} from 'react-native';
import {px2dp, px2p} from '../../utils';
import { common,deviceWidth } from '../../styles';

export default class Recommend extends React.Component {
  constructor() {
      super()
  }

  render() {
    return (
        <View style={{flex:1,marginTop:Platform.OS === 'ios' ? px2dp(24):px2dp(0)}}>
            <WebView
                source={{uri: 'https://github.com'}}
                style={{width:deviceWidth}}
            />
        </View>

    )
  }
}
