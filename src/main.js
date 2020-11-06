import Vue from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import App from './App.vue';

gsap.registerPlugin(ScrollTrigger);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
