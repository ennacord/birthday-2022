import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import App from './App.vue';
import './registerServiceWorker';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';
import './plugins/mobile';

Vue.use(VueMasonryPlugin);

Vue.config.devtools = false;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
