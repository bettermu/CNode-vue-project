import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content/Content'
import Article from '../components/Article/Article'
import Login from '../components/Login/Login'
import UserDetail from '../components/UserDetail/UserDetail'
import Publish from '../components/Publish/Publish'
import MyCollect from '../components/MyCollect/MyCollect'
import Notification from '../components/Notification/Notification'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'content',
      component: Content
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: UserDetail
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/collect/:loginname',
      name: 'collect',
      component: MyCollect
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    }
  ]
})
