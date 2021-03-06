import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//引入css
import './assets/css/global.css'
//引入iconfont文件
import './assets/fonts/iconfont.css'
import axios from 'axios';
Vue.config.productionTip = false
axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
Vue.prototype.$http = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
