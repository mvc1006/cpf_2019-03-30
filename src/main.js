// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 引入自己的公共css
import '../src/assets/CommentCss/Comment.css'
import '../static/css/reset.css'

import store from './store'
import router from './router'
//过滤字数
import filter from './filter';
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));



import axios from "axios"
axios.defaults.baseURL = ''
Vue.prototype.$api = axios
window.axios = axios

//关闭console.log()  方法
// window['console']['log'] = function() {}; //关闭默认设置
// 配置url地址
axios.defaults.baseURL = process.env.API_ROOT
window.HOST= process.env.API_ROOT
Vue.config.productionTip = false
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
