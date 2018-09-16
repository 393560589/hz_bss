import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-swiper'
import Entires from './components/Entries'
import { connect } from '../../utils/dva';
import { px2p } from '../../utils';
import { common } from '../../styles';
import {StorageUtil} from "../../utils/storage";
// import SearchBar from './components/SearchBar'

@connect(({home}) => ({...home}))
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      swipers: [],
      entries: [],
      pageIndex: 1
    },
    this.testHomeData = [
      {
        name: '路印协议',
        image: require('../../image/home/Icon_jfrw.png'),
        tag: require('../../image/home/img_bq_hot.png')
      },
      {
        name: '比特币',
        image: require('../../image/home/Icon_jfrw.png'),
        // tag: require('../../image/home/img_bq_hot.png')
      },
      {
        name: 'Achcin',
          image: require('../../image/home/Icon_jfrw.png'),
        // tag: require('../../image/home/img_bq_hot.png')
      },
      {
        name: 'CoinMeet',
          image: require('../../image/home/Icon_jfrw.png'),
        // tag: require('../../image/home/img_bq_hot.png')
      },
      {
        name: 'ANT',
          image: require('../../image/home/Icon_jfrw.png'),
        tag: require('../../image/home/img_bq_new.png')
      }
    ],
    this.searchItems = [
      {
        text: '录音协议',
        isPrimary: true
      },
      {
        text: '比特币',
        isPrimary: true
      },
      {
        text: '录音协议',
        isPrimary: true
      },
      {
        text: '录音协议'
      },
      {
        text: '录音协议'
      },
      {
        text: '录音协议'
      },
      {
        text: '录音协议'
      }
    ],
    this.newsList = [
      {
        title: 'test',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      },
      {
        title: '【Moses热点】腾讯独家回应：已完成所有使用商户号进行虚拟dsbfiabsfissiudfbs',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      },
      {
        title: 'test',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      },
      {
        title: 'test',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      },
      {
        title: 'test',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      },
      {
        title: 'test',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      },
      {
        title: 'test',
        author: '联想财经',
        time: '2018.8.15',
        image: require('../../image/home/news.png')
      }
    ]
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
        type:'home/getBanner',
        callback:(data)=>{
          console.log(data)
          if (data.status === 200) {
            this.setState({swipers: data.res})
          }
        }
    })
      StorageUtil.get('phone').then(res=>{
          res &&
          dispatch({
              type:'User/userInfo',
              payload:{
                  phone:res
              },
              callback:(data)=>{
                  dispatch({
                      type:'User/update',
                      payload:{
                          phone:res
                      }
                  })
              }
          })
      })
    dispatch({
        type: 'home/getNavigation'
    })

    dispatch({
      type: 'home/getNews',
      payload: {
        page: this.state.pageIndex
      }
    })
  }

  fetchNews = () => {
    console.log(this.props.loading, 'loading')
    this.props.dispatch({
      type: 'home/getNews',
      payload: this.state.pageIndex
    })
  }

  fetchMore = () => {
    this.setState((prev) => ({pageIndex: prev.pageIndex + 1}), this.fetchNews)
  }

  // renderStaticSearchBar = () => {
  //   return (
  //     <View style={styles.staticSearchBar}>
  //       {this.renderSearchBar()}
  //       {this.renderSearchItems()}
  //     </View>
  //   )
  // }

  renderSearchBar = () => {
    return (
      <TouchableOpacity
          style={styles.searchBarContainer}
          activeOpacity={1}
          onPress={() => this.props.navigation.navigate('Search')}>
        <View style={styles.searchBar}>
          <Image source={require('../../image/home/search.png')} style={{width: px2p(22), height: px2p(22), margin: px2p(10)}}/>
          <View style={{width: px2p(1), height: px2p(15), backgroundColor: '#D2D2D2', marginRight: px2p(9)}}></View>
          <Text style={{fontSize: px2p(12), color: '#CCC'}}>搜一下区块链资讯、交易所、项目、百科</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSearchItems = () => {
    return (
      <View style={styles.searchItems}>
        {
          this.props.hotKey.map((searchItem,index) => (
                <TouchableOpacity
                    key={searchItem.hot_keyword}
                    onPress={() => this.props.navigation.navigate('EditPost', {title: searchItem.hot_keyword})}>
                    {/* // onPress={() => this.props.navigation.navigate('Search', {key: searchItem.hot_keyword})}> */}
                    <View
                    style={{borderRadius: px2p(11), height: px2p(22), backgroundColor: '#F2F2F5', marginRight: px2p(10), marginBottom: px2p(5)}}>
                    <Text style={[styles.searchItem, index < 3 && {color: '#F29600'}]}>{searchItem.hot_keyword}</Text>
                    </View>
                </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  renderNewsCell = ({title, resource, time_num, thubmnail}) => {
    return (
      <View style={styles.newsCellContainer}>
        <View flex={1} style={{justifyContent: 'space-between'}}>
          <Text numberOfLines={2} style={{fontSize: px2p(15), color: '#070002'}}>{title}</Text>
          <View style={{flexDirection: 'row', opacity: 0.6}}>
            <Text>{resource} · </Text>
            <Text>{time_num}</Text>
          </View>
        </View>
        {thubmnail && <Image source={thubmnail} style={{width: 101, height: 64, resizeMode: 'contain', marginLeft: px2p(20)}}/>}
      </View>
    )
  }

  renderNews = () => {
    return (
      this.props.newsList.map((news,index) => (
        <View key={index}>
          {this.renderNewsCell({...news})}
        </View>
      ))
    )
    
  }
  
  render() {
    return (
      <SafeAreaView backgroundColor='#fff'>
        <ScrollView backgroundColor={common.gray_bg}>
          <View style={{zIndex: 99}}>
            <Swiper
              autoplay
              // height={px2p(211)}
              style={styles.swiper}
              activeDotColor={common.theme}
              paginationStyle={{bottom: px2p(7)}}>
              {
                this.state.swipers.map((swiper,index) => (
                  <Image source={{uri: `http://${swiper.img_url}`}} style={{width: px2p(375), height: px2p(211)}} key={swiper.img_url} resizeMode={'cover'}/>
                ))
              }
            </Swiper>
            {/* {this.renderStaticSearchBar()} */}
            {this.renderSearchBar()}
            {this.renderSearchItems()}
          </View>
          <Entires data={this.props.nav} style={{top: px2p(-50)}}/>
          {this.renderNews()}
          <View style={styles.loadMoreView}>
            {this.props.loading
              ? <ActivityIndicator animating={this.props.loading}/>
              : <Text style={styles.loadMoreText} onPress={this.fetchMore}>点击查看更多</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  swiper: {
    height: px2p(211)
  },
  banner: {
    width: px2p(375),
    height: px2p(125),
    marginTop: px2p(8),
    marginBottom: px2p(8)
  },
  // staticSearchBar: {
  //   height: px2p(105),
  //   padding: px2p(15),
  //   paddingTop: px2p(38),
  //   backgroundColor: '#fff'
  // },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // alignSelf: 'center',
    flex: 1,
    elevation: 4,
  },
  searchBarContainer: {
    // position: 'absolute',
    top: px2p(-25),
    width: px2p(355),
    height: px2p(44),
    alignSelf: 'center',
    shadowColor: 'rgb(23, 22, 72)',
    shadowOpacity: 0.2,
    shadowRadius: px2p(5),
    zIndex: 20,
    elevation: 4
  },
  searchItems: {
    // flex: 1,
    top: px2p(-50),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'space-between',
    // justifyContent: 'space-around',
    backgroundColor: '#fff',
    // height: px2p(105),
    padding: px2p(15),
    paddingTop: px2p(38),
  },
  searchItem: {
    fontSize: px2p(12),
    padding: px2p(5),
    paddingLeft: px2p(10),
    paddingRight: px2p(10),
    textAlign: 'center',
    // marginBottom: px2p(10)
  },
  newsCellContainer: {
    top: px2p(-50),
    flexDirection: 'row',
    alignItems:'stretch',
    padding: px2p(15),
    height: px2p(90),
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EEE'
  },
  loadMoreText: {
    // lineHeight: px2p(39),
    fontSize: px2p(12),
    color: '#999',
    textAlign: 'center'
  },
  loadMoreView: {
    // top: px2p(-50),
    width: '100%',
    height: px2p(39),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: px2p(-50)
    marginTop: px2p(-50)
  }
})

export default Home
