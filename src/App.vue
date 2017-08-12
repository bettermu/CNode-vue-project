<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <loading></loading>
    <messages></messages>
  </div>
</template>

<script>
import './common/style/icon.scss'
import Loading from './components/Loading/Loading'
import Messages from './components/Messages/Messages'
export default {
  name: 'app',
  components:{
    Loading,
    Messages
  }
}
</script>

<style lang="scss">
  @import "./common/style/base";
  @import "./common/style/animation";
</style>

