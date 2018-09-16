import React, { PureComponent } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { px2p } from '../../utils';
import ImagePicker from 'react-native-image-picker'

const styles = StyleSheet.create({
  headerRight: {
    fontSize: px2p(18),
    fontWeight: '500',
  },
  title: {
    fontSize: px2p(18),
    paddingVertical: px2p(8),
    margin: px2p(10),
    marginVertical: px2p(20)
  },
  content: {
    fontSize: px2p(15),
    height: px2p(200),
    padding: px2p(25)
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  imageUploadContainer: {
    paddingLeft: px2p(17)
  },
  imageUpload: {
    width: px2p(80),
    height: px2p(80),
    borderColor: '#cccccc',
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})

const HeaderRight = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text style={[styles.headerRight, {color: disabled ? '#999' : '#4E8CEE'}]}>发布</Text>
    </TouchableOpacity>
  )
}

export default class EditPost extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params
    return {
      headerStyle: {paddingLeft: px2p(12), paddingRight: px2p(17)},
      headerTitleStyle: {fontSize: px2p(20)},
      title: params.title || '发帖',
      headerBackImage: <Image source={require('../../image/editPost/close.png')}/>,
      headerBackTitle: null,
      headerRight: <HeaderRight onPress={params && params.post}/>
    }
  }

  render() {
    return (
      <SafeAreaView flex={1}>
      <KeyboardAvoidingView behavior="padding" style={[styles.container]}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View>
            <TextInput
              style={styles.title}
              autoFocus={true}
              placeholder="加个标题哟～"
            />
            <TextInput
              style={styles.content}
              placeholder="来吧，尽情发挥吧..."
              multiline={true}
            />
          </View>
          <View style={styles.imageUploadContainer}>
            <View style={styles.imageUpload}>
              <Image
                source={require('../../image/editPost/add.png')}
              />
            </View>
            <Text style={{color: '#999', fontSize: px2p(12)}}>(您最多可以上传3张图片哟)</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}