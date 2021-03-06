# 概述

## 一、项目使用技术栈

* Vue2.0：构建项目，属于底层框架。
* Vue-Router：通过hash值的变化，从而改变页面结构的路由。
* Vuex：Vue官方提供的状态管理模式。
* Axios,Vue-Axios：http请求模块。
* ES6：应用于生产环境，普遍度较高的新Javascript语法。
* Sass：CSS预编译器。
* Webpack：用于打包项目。

## 二、项目初始化
利用Vue-cli提供的初始化工具，运行以下代码：
* npm isntall --global vue-cli
* vue init webpack my-project
* cd my-project
* npm install
* npm run dev
此时打开 http://localhost:8080/ 就可以访问初始化后的页面了

## 三、项目编写

完成初始化之后，可以开始编写项目了。
代码分为四块，分别是*components(组件)*、*vue-router(路由)*、*vuex(状态管理模式)*和*common(放置公共样式，字体和通用的功能代码)*。

项目编写前，需要安装依赖：
* npm install vuex vue-router axios vue-axios --save
* npm install node-sass sass-loader --save-dev

### 1.common公共文件
包括样式(style),字体(fonts)还有工具函数(utils,包括时间格式化还有cookie存储功能)。

### 2.Components组件
目前一共有14个组件，如下：
* AboutMe  项目介绍
* Article  文章详情模块
* ArticleCard  文章列表卡片样式
* BackBar 返回栏公用组件
* BottomBar  底部评论组件
* Content 主页(文章列表模块)
* Loading 公用加载效果组件
* Login 登录模块
* MessageCard 消息公用模块
* MyCollect 我的收藏
* NavBar 导航栏模块
* Notification 我的通知模块
* Publish 我的发布文章模块
* UserDetail 用户详情模块

### 3.Vue-Router路由配置

通过路由，分为以下七个页面：
① 主页
② 文章详情页
③ 用户详情页
④ 用户登录页
⑤ 发布文章页
⑥ 用户收藏页
⑦ 我的通知页

### 4.Vuex：状态管理模式
状态管理分为六个模块：*content(主页)*、*article(文章页)*、*navbar(导航)*、*user(用户详情状态)*、*login(用户登录状态)*、*notification(通知)*。


## 四、开发过程中遇到的问题

### 1.第二次进入文章详情时，会残留上一次的渲染结果

解决办法：通过路由的钩子函数beforeRouterEnter，在页面渲染之前就获取到数据。获取数据前，显示Loading页面，加载完成后，显示文章详情页。

### 2.回到首页时，不能保留原来的状态
解决办法：
* 此方法为容易固定高度的解决办法：用vuex和vue-router的钩子函数来解决这个问题，通过scroll事件动态保存此时的scrollTop值，当路由的beforerRouteEnter触发时，恢复其scrollTop的值。
* 如果没有固定高度，直接通过Vue自带的keep-alive组件，保留组件状态。

### 3. 如何实现主页文章的懒加载
解决办法：判断  滑动的总高度-滑动距离顶部的距离<=屏幕可用高度
document.documentElement.offsetHeight-window.scrollY<=window.screen.height

当满足条件的时候，继续滑动，会加载多次列表数据，此时可以加入一个正在加载的状态，显示此时正在加载，即可解决问题。

### 4.如何设置登录功能
解决办法：因为官方只提供的access-token，所以可以将此值和一些用户相关的数值，存入document.cookie中，其中存入和取出的方法，参照utils 下面的cookie.js文件。
* 设置过期时间为30天
* 第一次登录进行存值操作，后面登录时会检查cookie是否有值，有，则自动登录
* 注销或者更换access-token登录时，均会触发cookie注销或是更新的状态。


### 5.如何将API中的时间，转换成..年前..月前..天前
解决方法：可参考utils下面的timeFormat.js文件
根据多次判断分别return 对应的数据格式，并在vue里以filter过滤器的形式填入

### 6.当进入其他路由时，仍然会触发主页的scroll事件
解决方法：将路由生命钩子改成beforeRouterEnter和beforeRouterLeave 分别实现载入路由时的scroll事件挂载以及离开路由时的scoll事件卸载。从而防止主页内容的懒加载一直触发。


## 六、注意事项
不要使用过高的Node版本，不然会npm install出错，本人使用6.9.2的，但不久使用7.6的版本再install运行，直接就版本出错。切换回去，一切正常。

