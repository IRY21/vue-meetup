import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import AppSpinner from './components/shared/AppSpinner'

import moment from "moment"

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner', AppSpinner)

Vue.use(vuelidate)

Vue.filter('capitalize', (val) => {
  if (val && typeof val === "string") {
    return val.charAt(0).toUpperCase() + val.slice(1)
  }

  return ''
})

Vue.filter('formatDate', (val, formatType = 'LL') => {
  if (!val) return ''
  
  return moment(val).format(formatType)
})

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')
