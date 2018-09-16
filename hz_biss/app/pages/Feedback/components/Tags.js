import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { px2p } from '../../../utils';
import { common } from '../../../styles';


export default function Tags(props) {
  return (
    <View style={styles.container}>
      {
        props.data.map(tag => {
          const isSelected = props.selectedItem === tag.label
          return (
            <Text
              key={tag.label}
              style={[styles.tag, isSelected?styles.selectedTag:{}]}
              onPress={() => props.onTagClick(tag.label)}>
              {tag.label}
            </Text>
          )})
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: px2p(5),
    paddingRight: px2p(5),
    paddingTop: px2p(8),
    paddingBottom: px2p(8),
    backgroundColor: '#fff'
  },
  tag: {
    flex: 1,
    textAlign: 'center',
    marginLeft: px2p(5),
    marginRight: px2p(5),
    lineHeight: px2p(25),
    fontSize: px2p(12),
    color: '#666',
    fontWeight: '500',
    borderRadius: px2p(2),
    borderWidth: 1,
    borderColor: '#eee'
  },
  selectedTag: {
    borderColor: '#ff0000',
    color: common.theme
  }
})