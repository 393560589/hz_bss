import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { common } from '../styles';
import { px2p } from '../utils';
const styles = StyleSheet.create({
  bottomItems: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  bottomIcon: {
    flex: 37,
    backgroundColor: common.fff,
    alignItems: 'center'
  },
  icon: {
    width: px2p(16),
    height: px2p(13),
    marginBottom: px2p(6),
    marginTop: px2p(8),
    resizeMode: Image.resizeMode.contain
  },
  iconText: {
    textAlign: 'center',
    fontSize: px2p(11),
    color: common.gray6
  },
  bottomBtn: {
    flex: 57,
    borderWidth: 0,
    backgroundColor: common.theme,
  },
  bottomBtnText: {
    textAlign: 'center',
    color: common.fff,
    fontWeight: 'bold',
    fontSize: px2p(15),
    lineHeight: px2p(43)
  },
  bottomEmpty: {
    backgroundColor: 'red',
    height: px2p(20),
    width: px2p(375)
  }
})

export default function() {
  return (
    <View style={styles.bottomItems}>
      <View style={styles.bottomIcon}>
        <Image style={styles.icon} source={require('../image/common/Icon_kf.png')}/>
        <Text style={styles.iconText}>客服</Text>
      </View>
      <View style={styles.bottomIcon}>
        <Image style={styles.icon} source={require('../image/common/Icon_gz.png')}/>
        <Text style={styles.iconText}>收藏</Text>
      </View>
      <View style={styles.bottomIcon}>
        <Image style={styles.icon} source={require('../image/common/Icon_gwc.png')}/>
        <Text style={styles.iconText}>购物车</Text>
      </View>
      <TouchableOpacity style={styles.bottomBtn}><Text style={[styles.bottomBtnText, {backgroundColor: '#F24A5C'}]}>加入购物车</Text></TouchableOpacity>
      <TouchableOpacity style={styles.bottomBtn}><Text style={styles.bottomBtnText}>立即购买</Text></TouchableOpacity>
    </View>
  )
}