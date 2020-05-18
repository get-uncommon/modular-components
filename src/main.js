import Vue from 'vue';
import VueSVGIcon from 'vue-svgicon';
import App from './App.vue';
import './assets/scss/main.scss';

Vue.use(VueSVGIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
