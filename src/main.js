import Vue from 'vue';
import VueSVGIcon from 'vue-svgicon';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App.vue';
import './assets/scss/main.scss';

Vue.use(VueSVGIcon);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
