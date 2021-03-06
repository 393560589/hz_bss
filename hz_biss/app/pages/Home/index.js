import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
    BackHandler,
    NativeModules,
  RefreshControl
} from 'react-native';
import Swiper from 'react-native-swiper'
import {Modal} from 'antd-mobile-rn'
//import Entires from './components/Entries'
import { connect } from '../../utils/dva';
import {chunk, px2dp, px2p, formatData} from '../../utils';
import { common,deviceWidth } from '../../styles';
import {StorageUtil} from "../../utils/storage";
import SplashScreen from "rn-splash-screen";
import { BoxShadow } from 'react-native-shadow'

import { AndroidBackHandler } from 'react-navigation-backhandler'
const alert = Modal.alert;

@connect(({home, loading}) => ({...home, isLoading: loading}))
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isLoading: false,
      swipers: [],
      entries: [],
      pageIndex: 1,
      refreshing: true,
        isRefreshing:false,
    }
  }

  componentDidMount(){
      setTimeout(() => {
          SplashScreen.hide();
      }, 2000);
    const {dispatch} = this.props;
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
    const history = StorageUtil.get('searchHistory')
        .then(() => {})
        .catch(e => {
            StorageUtil.save('searchHistory', [])
        });

    //console.log(history, 'history')
    dispatch({
        type:'home/getBanner',
        callback:(data)=>{
          if (data.status === 200) {
            this.setState({swipers: data.res})
          }
        }
    });

    dispatch({
        type: 'home/getNavigation',
        callback:(data)=>{
            StorageUtil.get('version').then(res=>{
                console.log(res);
                if(res !== data.version) {
                    alert('有版本更新', '下载最新版', [
                        { text: '取消', onPress: () => console.log('已取消') },
                        { text: '下载', onPress: () => console.log('下载啦')},
                    ])
                }
            })
        }
    })
    this.fetchNews()
   // console.log(this.props.isLoading)
  }

  fetchNews = (page) => {
      //console.log(this.state.pageIndex);
    this.props.dispatch({
      type: 'home/getNews',
      payload: {
        page: page ? page : this.state.pageIndex
      }
    })
  }

  fetchMore = () => {
   // console.log(this.props.isLoading)
    this.setState((prev) => ({pageIndex: prev.pageIndex + 1}), this.fetchNews)
  }

  _onMomentumScrollEnd = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height > nativeEvent.contentSize.height - 400) {
      this.fetchMore()
    }
  }

  renderSearchBar = () => {
      const shadowOpt = {
          width: px2p(355),
          height: px2p(44),
          color:'#eee',
          border:1,
          radius:2,
          opacity:Platform.OS === 'ios' ? 0.3:0.1,
          x:1,
          y:4,

      }
    return (
        <TouchableOpacity
            style={styles.searchBarContainer}
            activeOpacity={1}
            onPress={() => this.props.navigation.navigate('Search')}>
            <BoxShadow setting={shadowOpt}>
              <View style={styles.searchBar}>
                <Image source={require('../../image/home/search.png')} style={{width: px2p(22), height: px2p(22),margin: px2p(10)}}/>
                <View style={{width: px2p(1), height: px2p(15), backgroundColor: '#D2D2D2', marginRight: px2p(9)}}/>
                <Text style={{fontSize: px2p(12), color: '#CCC'}}>搜资讯、交易所、项目、币种</Text>
              </View>
            </BoxShadow>
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
                    onPress={() => this.props.navigation.navigate('Search', {keyword: searchItem.hot_keyword, autoFocus: false})}>
                    <View
                        style={{
                            borderRadius: px2p(11),
                            height: px2p(22),
                            backgroundColor: '#F2F2F5',
                            marginRight: px2p(10),
                            alignItems:'center',
                            flexDirection:'row',
                            marginBottom: px2p(5)}}>
                    <Text style={[styles.searchItem, index < 3 && {color: '#F29600'}]}>{searchItem.hot_keyword}</Text>
                    </View>
                </TouchableOpacity>
          ))
        }
      </View>
    )
  }
    openWebView(url){
        this.props.dispatch({
            type:'home/ToWebview',
            payload:{
                  webviewUrl:url
            },
            callback:()=>{
            this.props.navigation.navigate('WebViews')
        }
          });

          }
          renderNewsCell = ({item : {title, resource, time_num, thumbnail , url}}) => {
         // console.log(thumbnail);
          return (
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>this.openWebView(url)}
          style={styles.newsCellContainer}>
            <View flex={1} style={{justifyContent: 'space-between'}}>
              <Text numberOfLines={2} style={{fontSize: px2p(14),lineHeight:px2dp(18) ,color: '#070002'}}>{title}</Text>
              <View style={{flexDirection: 'row', opacity: 0.6,marginTop:px2dp(8)}}>
                <Text style={{fontSize:px2dp(10)}}>{resource} · </Text>
                <Text style={{fontSize:px2dp(10)}}>{formatData(time_num)}</Text>
              </View>
            </View>
        { thumbnail && <Image source={{uri:thumbnail}} style={{width: px2dp(101), height: px2dp(64), resizeMode: 'contain', marginLeft: px2p(20)}}/>}
      </TouchableOpacity>
    )
  }

  renderNews = () => {
    return (
      <FlatList
        renderItem={this.renderNewsCell}
        data={this.props.newsList}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.props.isLoading.effects['home/getNews']}
        //     onRefresh={this.fetchNews}
        //   />
        // }
      />
    )

  }
    onRefresh(){
        this.setState({isRefreshing: true});
        //console.log("开始新的刷新方法");
        this.props.dispatch({
            type:'home/update',
            payload:{
                newsList:[]
            }
        })
        setTimeout(() => {
            //你的刷新逻辑
            //逻辑执行完之后，修改刷新状态为false

            this.fetchNews(1);
            this.setState({isRefreshing: false});
        }, 1);
    }
    onBackButtonPressAndroid(){
        BackHandler.exitApp();
        return true
    }
  render() {
      const {nav} = this.props;
      let navarr = chunk(nav,5);
     // console.log(navarr)
    return (
        <AndroidBackHandler onBackPress={()=>this.onBackButtonPressAndroid()}>
      <SafeAreaView backgroundColor='#fff'>
        <ScrollView
         /*   bouncesZoom={true}
            bounces={true}
            maximumZoomScale={1.2}
            minimumZoomScale={1}*/
            stickyHeaderIndices={[1]}
            backgroundColor={common.gray_bg}
            //alwaysBounceVertical={true}
            onScroll={this._onMomentumScrollEnd}
            refreshControl={  //设置下拉刷新组件
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
                    tintColor='#333'
                    titleColor="#333"
                    title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                />
            }
        >

          <View>
              {
                  this.state.swipers &&  <Swiper
                      autoplay
                      key={this.state.swipers.length}
                      // height={px2p(211)}
                      style={styles.swiper}
                      activeDotColor={common.theme}
                      paginationStyle={{bottom: px2p(4)}}>
                      {
                          this.state.swipers.map((swiper,index) => (
                              <TouchableOpacity onPress={()=>this.openWebView(swiper.url)}>
                                <Image source={{uri: swiper.img_url}} style={{width: px2p(375), height: px2p(211)}} key={swiper.img_url} resizeMode={'cover'}/>
                              </TouchableOpacity>
                          ))
                      }
                  </Swiper>
              }


            {/* {this.renderStaticSearchBar()} */}
          </View>
            {this.renderSearchBar()}
            {this.renderSearchItems()}
        <View style={{height:px2dp(100),marginBottom:px2dp(8),zIndex:2}}>
            {
                navarr && <Swiper
                    key={navarr.length}
                    style={styles.wrapper}
                    //showsButtons
                    showsPagination={true}
                    activeDotColor={common.theme}
                    paginationStyle={{bottom: px2p(7)}}
                    loop={false}
                    //autoplayTimeout={2}
                    //autoplay={true}
                >
                    {
                        navarr && navarr.map((nav,index) => {
                            return (
                                <View style={styles.entries} key={index}>
                                    {

                                        nav.map((item)=>{
                                            return (
                                                <View style={styles.entriesBlock}>
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={()=>this.openWebView(item.url)}
                                                    >
                                                        <Image
                                                            style={[styles.image]}
                                                            source={{uri:item.logo}}/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        style={{marginTop:px2dp(2)}}
                                                        onPress={()=>this.openWebView(item.url)}
                                                    >
                                                        <Text style={{fontSize:px2dp(12)}}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        } )
                    }
                </Swiper>
            }

        </View>

          {this.renderNews()}
          <View style={styles.loadMoreView}>
            {this.props.isLoading.effects['home/getNews']
              ? <ActivityIndicator/>
              : <Text style={styles.loadMoreText}>上拉加载更多新闻～</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
        </AndroidBackHandler>
    )
  }
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        alignItems:'flex-start',
        height:px2dp(100),
        backgroundColor:'#fff',
    },
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
    elevation: 3,
  },
  searchBarContainer: {
    // position: 'absolute',
    borderRadius:px2p(2),
    //top: px2p(-25),
    width: px2p(355),
    height: px2p(50),
    alignSelf: 'center',
    zIndex: 20,
      marginTop:px2dp(-25)
    //elevation: 4
  },
  searchItems: {
    // flex: 1,
    //top: px2p(-50),
      marginTop:px2dp(-30),
      marginBottom:px2dp(8),
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
    paddingLeft: px2p(10),
    paddingRight: px2p(10),
    textAlign: 'center',
    // marginBottom: px2p(10)
  },
  newsCellContainer: {
    // top: px2p(-50),
    flexDirection: 'row',
    alignItems:'stretch',
    padding: px2p(15),
    minHeight: px2p(90),
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

  },
    entries:{
        paddingLeft:px2dp(15),
        paddingRight:px2dp(15),
        height:px2dp(88),
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
    },
    image: {
        marginBottom:px2p(4),
        width: px2dp(44),
        height: px2dp(44),
        borderRadius:px2dp(22),
    },
    entriesBlock:{
        width:((deviceWidth-30)/5),
        justifyContent:'center',
        height:px2dp(88),
        alignItems:'center'
    }
})

export default Home
