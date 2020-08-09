// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import store from './_StoreData';
import App from './App';
import router from './components/router';

import 'bootstrap';

import * as Axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

import Fragment from 'vue-fragment';

import './components/event/bus';

import currencyFilter from './components/filters/currency';
import dateFilter from './components/filters/date';
import timeStampFilter from './components/filters/timeStamp';
import stockFilter from './components/filters/stock';

Axios.defaults.withCredentials = true;

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zhTW', zhTW);

Vue.use(Vuex);
Vue.use(VueAxios, Axios);
Vue.use(Fragment.Plugin);
Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
Vue.filter('timeStamp', timeStampFilter);
Vue.filter('stock', stockFilter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;

    Axios.post(api).then((res) => {
      if (res.data.success) {
        next();
      } else {
        next({
          path: '/signin',
        });
      }
    });
  } else {
    next();
  }
});
