<template>
  <div class="content-wrap">
    <nav-bar></nav-bar>
    <div class="content-tab-wrap">
      <div class="content-tab">
        <a href="/" :class="{'selected':selectedTab==='all'}" @click.prevent="changeTab('all')">全部</a>
        <a href="/" :class="{'selected':selectedTab==='good'}" @click.prevent="changeTab('good')">精华</a>
        <a href="/" :class="{'selected':selectedTab==='share'}" @click.prevent="changeTab('share')">分享</a>
        <a href="/" :class="{'selected':selectedTab==='ask'}" @click.prevent="changeTab('ask')">问答</a>
        <a href="/" :class="{'selected':selectedTab==='job'}" @click.prevent="changeTab('job')">招聘</a>
        <a href="/" :class="{'selected':selectedTab==='dev'}" @click.prevent="changeTab('dev')">客户端测试</a>
      </div>
    </div>
    <div class="content">
      <ul class="content-list">
        <li v-for="(item,index) in articleLists" class="article">
          <article-card :article="item"></article-card>
        </li>
      </ul>
      <div class="back-to-top" v-show="isTopShow" @click="backToTop">
        <i class="iconfont icon-back-to-top"></i>
        <p class="text">回到顶部</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import NavBar from '../NavBar/NavBar'
import ArticleCard from '../ArticleCard/ArticleCard'

export default {
  computed: {
    ...mapGetters([
      'articleLists',
      'selectedTab',
      'isLoading',
      'pageCount',
      'isRequesting',
      'homeScrollTop',
      'isTopShow'
    ])
  },

  methods: {

    //导航切换
    changeTab(tabType) {

      //加载中loading
      this.$store.dispatch('add_loading')
      this.axios.get(`https://cnodejs.org/api/v1/topics/?tab=${tabType}&page=1`)
        .then(res => {
          this.$store.dispatch('delete_message')
          this.$store.dispatch('changeTab', tabType)
          this.$store.dispatch('changeTabData', res.data.data)

          //页面回到顶部
          window.scrollTo(0, 0)
        }, res => {
          this.$store.dispatch('delete_message')
          this.$store.dispatch('connect_fail')
        })
    },

    //滚动加载
    loadMoreData(tabType, pageCount) {
      this.axios.get(`https://cnodejs.org/api/v1/topics/?tab=${tabType}&page=${pageCount + 1}`)
        .then(res => {
          //console.log(res.data.data);
          this.$store.dispatch('delete_message')
          this.$store.dispatch('loadMoreData', res.data.data)
          this.$store.dispatch('async_request_data', false)
        }, () => {
          this.$store.dispatch('delete_message')
          this.$store.dispatch('connect_fail')
        })
    },

    //返回顶部
    backToTop(){
      //将返回顶部设置为250ms的动画
      let scrollPiece=window.scrollY/50
      let topInterval=window.setInterval(()=>{
        if(window.scrollY<=0){
          window.clearInterval(topInterval)
        }else {
          window.scrollTo(0,window.scrollY-scrollPiece)
        }
      },5)
    },

    //滚动状态控制
    scrollFunc() {
      
      this.$store.dispatch('record_scroll_top', window.scrollY)
      if (!this.isRequesting && document.documentElement.offsetHeight - window.scrollY <= window.screen.height) {
        this.$store.dispatch('async_request_data', true)
        this.$store.dispatch('add_loading')
        //console.log(111)
        this.loadMoreData(this.selectedTab, this.pageCount)
      }

      if(window.scrollY>200){
        if(this.isTopShow===false){
          this.$store.dispatch('backToTop',true)
        }
        
      }else{
        if(this.isTopShow===true){
          this.$store.dispatch('backToTop',false)
        }
      }
    },

  },

  //页面创建函数
  created() {
    this.$store.dispatch('changeLoadingStatus', true)
    this.axios.get('https://cnodejs.org/api/v1/topics/?tab=all&page=1')
      .then(res => {

        this.$store.dispatch('changeLoadingStatus', false)
        this.$store.dispatch('changeTabData', res.data.data);
      })
  },


  beforeRouteEnter(to, from, next) {

    next(vm => {
      
      window.scrollTo(0, vm.homeScrollTop)

      window.setTimeout(() => {
        //console.log(111);
        //滚动监听
        window.addEventListener('scroll', vm.scrollFunc)
      }, 100)
    })
  },
  beforeRouteLeave(to, from, next) {

    //监听事件卸载
    window.removeEventListener('scroll', this.scrollFunc)
    next()

  },


  components: {
    NavBar,
    ArticleCard
  }
}

</script>


<style lang="scss">
.content-wrap {
  background-color: #eff2f7;
  width: 100%;
  padding-top: 86px;
  .content-tab-wrap {
    width: 100%;
    height: 36px;
    line-height: 36px;
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 99;
    background: rgba(7, 17, 27, .8);
    -webkit-backdrop-filter: blur(8px);
    color: #fff;
    border-top: 1px solid rgba(255, 255, 255, .8);
    .content-tab {
      padding-left: 10px;
      a {
        color: #fff;
        text-decoration: none;
        margin-right: 2px;
        font-size: 14px;
        padding: 2px 5px;
        text-align: center;
        &.selected {
          background-color: #fff;
          color: #1f2d3d;
          border-radius: 5px;
        }
      }
    }
    /*屏幕宽度小于1200px的设备*/
    @media screen and (max-width: 1200px) {
      .content-tab {
        width: 100%;
        margin: 0 auto;
      }
    }
    /*屏幕宽度大于1200px的设备*/
    @media screen and (min-width: 1200px) {
      .content-tab {
        width: 1200px;
        margin: 0 auto;
        padding-left: 0;
      }
    }
  }

  .content {
    width: 100%;
    .back-to-top {
      position: fixed;
      right: 10px;
      bottom: 20px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      background-color: rgba(7, 17, 27, .5);
      padding: 5px;
      border-radius: 10px;
      .iconfont {
        font-size: 36px;
      }
    }
  }
}
</style>
