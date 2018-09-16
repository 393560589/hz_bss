import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import WhoBought from './WhoBought';
import { Button } from 'antd-mobile-rn'
import { px2p } from '../utils';
import { common } from '../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: common.fff,
    paddingLeft: px2p(10),
    paddingRight: px2p(10),
    paddingBottom: px2p(10),
    marginBottom: px2p(6)
  },
  goodImage: {
    height: px2p(175),
    width: px2p(375)
  },
  activityImage: {
    position: 'absolute',
    top: px2p(17),
    left: px2p(25),
    width: px2p(33),
    height: px2p(33)
  },
  goodName: {
    marginTop: px2p(14),
    marginBottom: px2p(15),
    fontWeight: '500',
    fontSize: px2p(13),
    color: '#111',
    width: px2p(300)
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  goodPrice: {
    color: common.theme,
    fontSize: px2p(17),
    fontWeight: '700',
    marginRight: px2p(20)
  },
  goodAmount: {
    color: common.gary_9,
    fontSize: px2p(11),
  },
  button: {
    height: px2p(32),
    backgroundColor: common.theme,
    borderWidth: 0,
    paddingLeft: px2p(25),
    paddingRight: px2p(25),
    marginLeft: px2p(15)
  },
  btnText: {
    color: common.fff
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    width: px2p(24),
    height: px2p(24),
    borderRadius: px2p(12),
    backgroundColor: 'blue'
  }
})

export default function({ item }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={item.onBtnPress}>
        <Image style={styles.goodImage} source={item.goodImage}/>
      </TouchableOpacity>
      <Image style={styles.activityImage} source={item.activityImage}/>
      <Text style={styles.goodName}>{item.name}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomItem}>
          <Text style={styles.goodPrice}>¥{item.price}</Text>
          <Text style={styles.goodAmount}>已售{item.sold}</Text>
        </View>
        <View style={styles.bottomItem}>
          <WhoBought data={item.people}/>
          <Button
            style={[styles.button, styles.bottomItem]}
            onClick={item.onBtnPress}>
            <Text style={styles.btnText}>{item.btnText}</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}