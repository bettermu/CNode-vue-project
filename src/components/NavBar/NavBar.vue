<template>
  <div class="nav-bar">
    <div class="nav-bar-wrap">
      <a href="/">
        <img src="./cnodejs_light.svg" alt="CNode" class="logo" width="120" height="28"> </a>
  
      <div class="user" @click="showUserDetail">
        <i class="iconfont icon-user" v-show="!isLogin"></i>
        <img v-show="isLogin" class="user-avatar" :src="userData.avatar_url" alt="">
      </div>
      <div class="notification" @click="toNotification">
        <i class="iconfont icon-notification"></i>
        <div class="count" v-if="isLogin && messageCount">{{messageCount}}</div>
      </div>
      <div class="info" @click="changeAboutMeShow">
        <i class="iconfont icon-about"></i>
      </div>
      <transition name="pulldown">
        <ul class="user-menu" v-show="isUserMenuShow">
          <li>
            <i class="iconfont icon-home"></i>
            <span @click="toRouter(`/user/${userData.loginname}`)">我的主页</span>
          </li>
          <li>
            <i class="iconfont icon-edit"></i>
            <span @click="toRouter({path:'publish',query:{update:false,topic_id:''}})">发布文章</span>
          </li>
          <li>
            <i class="iconfont icon-collected"></i>
            <span>我的收藏</span>
          </li>
          <li>
            <i class="iconfont icon-exit"></i>
            <span @click="loginOut">退出登录</span>
          </li>
        </ul>
      </transition>
  
    </div>
    <about-me v-show="isAboutMeShow"></about-me>
  </div>
</template>

<script type="text/ecmascript-6">
import AboutMe from '../AboutMe/AboutMe'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isUserMenuShow: false
    }
  },

  mounted() {
    if (this.isLogin) {
      this.axios.get(`https://cnodejs.org/api/v1/message/count?accesstoken=${this.userData.accesstoken}`)
        .then(res => {
          this.$store.dispatch('get_message_count', res.data.data)
        })
    }
  },

  computed: {
    ...mapGetters([
      'isAboutMeShow',
      'isLogin',
      'userData',
      'messageCount'
    ])
  },
  methods: {
    changeAboutMeShow() {
      this.$store.dispatch('changeAboutMeShow')

      //关于我时自动收起个人信息栏
      if (this.isUserMenuShow === true) {

        this.isUserMenuShow = false
      }

    },
    toNotification() {
      if (this.isLogin) {
        this.$router.push('/notification')
      } else {
        this.$store.dispatch('add_warn', { content: '请登录后使用！' })
      }
    },
    showUserDetail() {
      //如果未登陆  则前去登陆页面
      //console.log(this.isLogin)
      if (!this.isLogin) {
        this.$router.push({ name: 'login' })

      } else {
        this.isUserMenuShow = !this.isUserMenuShow
      }

    },
    toRouter(route) {
      this.isUserMenuShow = !this.isUserMenuShow
      this.$router.push(route)
    },
    loginOut() {
      this.$store.dispatch('add_success', { content: '退出成功' })
      this.$store.dispatch('loginOut')
      this.isUserMenuShow = !this.isUserMenuShow
    }
  },
  components: {
    AboutMe
  }
}

</script>

<style lang="scss">
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: rgba(7, 17, 27, .8);
  -webkit-backdrop-filter: blur(8px);
  padding: 10px;
  z-index: 100;
  /*屏幕宽度小于450px的设备*/
  @media screen and (max-width: 1200px) {
    .nav-bar-wrap {
      width: 100%;
      margin: 0 auto;
    }
  }
  /*屏幕宽度大于1200px的设备*/
  @media screen and (min-width: 1200px) {
    .nav-bar-wrap {
      width: 1200px;
      margin: 0 auto;
    }
  }
  .nav-bar-wrap {
    .info,
    .notification,
    .user {
      position: absolute;
      top: 0;
      color: #ffffff;
      height: 50px;
      padding: 12px;
      .icon-about,
      .icon-notification,
      .icon-user {
        font-size: 26px;
        &:active {
          color: #58B7FF;
        }
      }
      .user-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      &.info {
        right: 100px;
      }
      &.notification {
        right: 50px;
        .count {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 16px;
          height: 16px;
          background-color: #FF4949;
          color: #ffffff;
          border-radius: 50%;
          text-align: center;
          font-size: 10px;
          line-height: 16px;
          z-index: 1000;
        }
      }
      &.user {
        right: 0;
      }
    }
    .user-menu {
      position: absolute;
      top: 51px;
      right: 0;
      width: 100%;
      list-style: none;
      background-color: rgba(7, 17, 27, .8);
      -webkit-backdrop-filter: blur(8px);
      overflow: hidden;
      z-index: 200;
      li {
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        margin: 0 30px;
        text-align: center;
        border-bottom: 1px solid #475669;
        color: #ffffff;
        a {
          color: #ffffff;
        }
        .iconfont {
          font-size: 20px;
          padding-right: 5px;
        }
        span {
          vertical-align: top;
        }
      }
    }
  }
}
</style>
