import Vue from 'vue';
import cssVars from 'css-vars-ponyfill';
import App from './App.vue';

cssVars({});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
