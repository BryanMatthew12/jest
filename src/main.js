import Vue from 'vue'
import App from './App.vue'
import store from './store'


import  VueFormGenerator  from 'vue-form-generator';
import "vue-form-generator/dist/vfg-core.css"

Vue.config.productionTip = false
Vue.use(VueFormGenerator)


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
