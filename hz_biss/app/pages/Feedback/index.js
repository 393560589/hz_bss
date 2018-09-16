import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import { TextareaItem, InputItem, List, Button, Toast } from 'antd-mobile-rn'
import Tags from './components/Tags'
import { px2p, validatePhoneNumber } from '../../utils/index'
import { common, deviceWidth } from '../../styles'
import ImagePicker from 'react-native-image-picker'
import { createForm } from 'rc-form'


class Feedback extends Component {
  constructor() {
    super()
    this.tagData= [
      {
        label: '功能异常'
      },
      {
        label: '体验问题'
      },
      {
        label: '新功能建议'
      },
      {
        label: '其他'
      }
    ],
    this.state = {
      phone: '',
      feedback: '',
      selectedItem: this.tagData[0].label
    }
  }

  onTagClick = (selectedItem) => {
    this.setState({selectedItem})
  }

  pickImg() {
    const options = {
      title: 'test'
    }
    ImagePicker.showImagePicker(options, res => console.log(res))
  }

  onTextChange = feedback => {
    this.setState({feedback})
  }

  onPhoneChange = phone => {
    const { setFieldsValue, validateFields } = this.props.form
    setFieldsValue({phone})
    validateFields()
  }

  onErrorClick = (type) => {
    const { getFieldError } = this.props.form
    Toast.info(getFieldError(type)[0])
  }

  submit = () => {
    this.props.form.setFieldsValue({textInput: 'test'})
    // console.log(this.props.form.getFieldValue('textInput'), 'get')
    // console.log('field', this.props.form.getFieldsValue())
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { selectedItem } = this.state
    const Pattern = /^1(3[0-9]|4[579]|5[0-3,5-9]|7[013,5-9]|8[0-9])\d{8}$/
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title} onPress={this.submit}>反馈问题类型</Text>
        <Tags
          data={this.tagData}
          selectedItem={selectedItem}
          onTagClick={this.onTagClick}
        />
        <List style={styles.textInput}>
          <TextareaItem
            {...getFieldProps('textInput')}
            // onChange={this.onTextChange}
            placeholder={'请输入您的反馈意见'}
            count={100}
            rows={5}
          />
        </List>
        <TouchableOpacity
          style={styles.imgPicker}
          onPress={this.pickImg.bind(this)}>
          <View style={styles.addImg}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
        <List style={styles.phoneInputContainer}>
          <InputItem
            {...getFieldProps('phone', {
              validateTrigger: 'onChange',
              rules: [function(rule, value, callback, source, options) {
                const errors = []
                if (!Pattern.test(value)) {
                  errors.push(
                    new Error('请输入正确的手机号码')
                  )
                }
                callback(errors)
              }]
            })}
            error={getFieldError('phone')}
            onErrorClick={() => this.onErrorClick('phone')}
            placeholder='请输入手机号码'
            style={styles.phoneInput}
            clear
            type='tel'
            onChange={this.onPhoneChange}
          />
        </List>
        <Button style={styles.button}><Text style={{color: '#fff'}}>提交</Text></Button>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: px2p(10),
    lineHeight: px2p(30)
  },
  type: {
    height: px2p(40),
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textInput: {
    marginTop: px2p(6),
    marginBottom: px2p(6)
  },
  imgPicker: {
    paddingTop: px2p(15),
    paddingBottom: px2p(15),
    paddingLeft: px2p(10),
    backgroundColor: '#fff'
  },
  addImg: {
    width: px2p(78),
    height: px2p(78),
    borderWidth: 1,
    borderColor: '#eee'
  },
  addIcon: {
    fontSize: px2p(48),
    lineHeight: px2p(78),
    textAlign: 'center',
    color: '#ccc',
    fontWeight: '100'
  },
  phoneInputContainer: {
    backgroundColor: '#fff',
    marginTop: px2p(6)
  },
  phoneInput: {
     
  },
  button: {
    width: deviceWidth,
    position: 'absolute',
    bottom: 0,
    backgroundColor: common.theme,
  }
})

export default createForm()(Feedback)