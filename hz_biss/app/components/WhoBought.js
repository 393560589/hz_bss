import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { px2p } from '../utils'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  item: {
    width: px2p(24),
    height: px2p(24),
    borderRadius: px2p(12),
  }
})

 // An - An-1 = (0.8 - 0.2 * n)

//  0. 0
//  1. 24 - 0.2 * 24
//  2. 24 + 24 - 0.4 * 24     

export default class Accordion extends Component {
  constructor() {
    super()
    this.state = {
      // positionRight: new Animated.Value()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.data.map((item, index) => {
            const right = index !== 0
              ? px2p(24 * index - (0.2 * index * 24))
              : 0
            return (
              <Image
                key={item.key}
                style={[styles.item, item.style, {right}]}
                source={item.image}
              />
            )
          })
        }
      </View>
    )
  }
}