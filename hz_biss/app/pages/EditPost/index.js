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
  ScrollView,
  Platform
} from 'react-native';
import { px2p } from '../../utils';
import ImagePicker from 'react-native-image-picker'
import { postArticle, uploadImage} from '../../servers'
import { connect } from 'dva'

const styles = StyleSheet.create({
  headerRight: {
    fontSize: px2p(16),
    fontWeight: '500',
  },
  title: {
      textAlignVertical: 'top',
    fontSize: px2p(18),
    paddingVertical: px2p(8),
    margin: px2p(10),
    marginVertical: px2p(20)
  },
  content: {
      textAlignVertical: 'top',
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
    paddingLeft: px2p(17),
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageUpload: {
    width: px2p(80),
    height: px2p(80),
    borderColor: '#cccccc',
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const HeaderRight = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{marginRight: px2p(12), padding: px2p(5)}}
    >
      <Text style={[styles.headerRight, {color: disabled ? '#999' : '#4E8CEE'}]}>发布</Text>
    </TouchableOpacity>
  )
}

@connect(({User}) => ({...User}))
export default class EditPost extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params
    return {
      // headerStyle: { paddingLeft: px2p(12), paddingRight: px2p(17) },
      headerTitleStyle: {fontSize: px2p(18)},
      title: params.title || '发帖',
      headerBackImage: <Image source={require('../../image/editPost/close.png')} style={{marginLeft: px2p(12)}}/>,
      headerBackTitle: null,
      headerRight: <HeaderRight onPress={params && params.post}/>
    }
  }

  constructor() {
    super()
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({post: this.postArticle})
  }

  selectImage = () => {
    const { images } = this.state
    ImagePicker.showImagePicker({title: '选择图片', quality: 0.05}, response => {
      console.log(response, 'response')
      if (response.didCancel || response.error) return
      // const _images = [response.uri, ...images].slice(0, 3)
      let type = ''
      Platform.OS === 'ios'
        ? 'image' + /.*ext=(.*)/g.exec(response.origURL)[1].toLocaleLowerCase()
        : response.type
      // const type = Platform.select({
      //   ios: 'image' + /.*ext=(.*)/g.exec(response.origURL)[1].toLocaleLowerCase(),
      //   android: response.type
      // })
      // this.setState({images: _images})
      //console.log(response, 'response picker')
      const formData = new FormData()
      formData.append('file[]', {uri: response.uri, name: response.fileName, type})
      uploadImage(formData)
        .then(res => {
          console.log(res)
          const i = res.split('**')
          this.setState({images: [...images].concat({thumbnail: i[1], uri: i[0]}).slice(0, 4)})
        })
        .catch(e => console.warn(e))
    })
  }

  postArticle = () => {
    const { images } = this.state
    // console.log(this.title._lastNativeText, 12312321)
    const post_title = this.title._lastNativeText
    const post_content = this.content._lastNativeText
    const {id} = this.props.navigation.state.params
    const post_phone = this.props.phone || 13888888888
    let post_image = ''
    images.length > 0 && images.forEach(image => {
      post_image += image.uri + '**'
    })
    postArticle({post_content, post_title, post_image, post_phone, id})
      .then(res => console.log(res, '发帖res'))
    // image.append
    // uploadImage
  }

  render() {
    return (
      <SafeAreaView flex={1}>
      <KeyboardAvoidingView style={[styles.container]} keyboardVerticalOffset={Platform.select({ios: 90, android: 0})}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View>
            <TextInput
                underlineColorAndroid='transparent'
              ref={view => this.title = view}
              style={styles.title}
              autoFocus={true}
              placeholder="加个标题哟～"
            />
            <TextInput
                underlineColorAndroid='transparent'
              ref={view => this.content = view}
              style={styles.content}
              placeholder="来吧，尽情发挥吧..."
              multiline={true}
            />
          </View>
        </ScrollView>
        <View>
          <View style={styles.imageUploadContainer}>
            <View style={styles.imagesContainer}>
              {this.state.images.map(image => <Image key={image.thumbnail} source={{uri: `http://bitss.vip/static/${image.thumbnail}`}} style={{width: 80, height: 80, marginRight: 10}}/>)}
            </View>
            <View>
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={this.selectImage}
                >
                  <Image
                    source={require('../../image/editPost/add.png')}
                  />
                </TouchableOpacity>
            </View>
          </View>
          <Text style={{color: '#999', fontSize: px2p(12)}}>(您最多可以上传3张图片哟)</Text>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}