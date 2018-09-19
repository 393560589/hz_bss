import React from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import { px2p } from '../../../utils'
import { common } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: px2p(16),
    paddingBottom: px2p(20),
    paddingLeft: px2p(17),
    paddingRight: px2p(17),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: common.fff,
    marginTop: px2p(8),
    marginBottom: px2p(8)
  },
  entry: {
    alignItems: 'center'
  },
  image: {
    width: px2p(30),
    height: px2p(30),
    marginBottom: px2p(13),
      backgroundColor:'#f1f1f1'
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    color: common.gary_6,
    fontSize: px2p(12)
  }
})

export default function Entries(props) {
  console.log(props)
  return (
    <View style={[styles.container, props.style]}>
      {
        props.data && props.data.map(entry => (
          <TouchableOpacity
              activeOpacity={0.8}
              style={styles.entry} key={entry.title}>
            <View>
              <Image style={styles.image} source={{uri:`http://bitss.vip${entry.logo}`}} resizeMode='contain'/>
            </View>
            <Text style={styles.text}>{entry.title}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}