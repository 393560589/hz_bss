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
  ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-swiper'
import Entires from './components/Entries'
import { connect } from '../../utils/dva';
import { px2p } from '../../utils';
import { common } from '../../styles';
import {StorageUtil} from "../../utils/storage";
// import SearchBar from './components/SearchBar'
import {BoxShadow} from 'react-native-shadow'
import Jush from "jpush-react-native";

@connect(({home}) => ({...home}))
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      swipers: [],
      entries: [],
      pageIndex: 1
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;

    console.log(Jush)
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

    this.fetchNews()
  }

  fetchNews = () => {
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
                  <Image source={require('../../image/home/search.png')} style={{width: px2p(22), height: px2p(22), margin: px2p(10)}}/>
                  <View style={{width: px2p(1), height: px2p(15), backgroundColor: '#D2D2D2', marginRight: px2p(9)}}></View>
                  <Text style={{fontSize: px2p(12), color: '#CCC'}}>搜一下区块链资讯、交易所、项目、百科</Text>
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
    elevation: 3,
  },
  searchBarContainer: {
    // position: 'absolute',
    borderRadius:px2p(2),
    top: px2p(-25),
    width: px2p(355),
    height: px2p(50),
    alignSelf: 'center',
    zIndex: 20,
    //elevation: 4
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
