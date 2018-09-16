import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { px2p } from '../utils';
import { deviceWidth, deviceHeight, common } from '../styles/common';
const styles = StyleSheet.create({
  headerRightWrapper: {
    width: deviceWidth,
    height: deviceHeight,
    // position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    zIndex: 99
  },
  headerRight: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: px2p(34),
    right: px2p(15),
    width: px2p(125),
    // height: px2p(217),
    paddingLeft: px2p(8),
    paddingRight: px2p(8),
    paddingTop: px2p(5),
    
  },
  headerRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: common.gary_6
  },
  headerIcon: {
    width: px2p(15),
    height: px2p(15),
    resizeMode: Image.resizeMode.contain,
    marginLeft: px2p(14),
    marginRight: px2p(11)
  },
  headerItemText: {
    lineHeight: px2p(37),
    color: common.fff,
    fontSize: px2p(14)
  }
})

export default function HeaderRightDot(props) {
  const data = [
    {
      icon: require('../image/headerRight/Icon_sy.png'),
      name: '首页',
      onPress: () => {
        props.navigation.navigate('Home')
      }
    },
    {
      icon: require('../image/headerRight/Icon_spsc.png'),
      name: '商品收藏'
    },
    {
      icon: require('../image/headerRight/Icon_yljl.png'),
      name: '游览记录'
    }
  ]

  function hideHeaderRight() {
    props.navigation.setParams({isMenuVisible: false})
  }

  return (
    <TouchableWithoutFeedback onPress={hideHeaderRight}>
      <View style={[styles.headerRightWrapper]}>
      <ImageBackground source={require('../image/headerRight/bg_pptc.png')} style={[styles.headerRight, props.style]} resizeMode='cover'>
        <View>
          {
            data.map((item, index) => (
              <TouchableOpacity style={styles.headerRightItem} onPress={item.onPress} key={item.name}>
                <Image source={item.icon} style={styles.headerIcon}/>
                <Text style={styles.headerItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}
    // )
  // }
// }