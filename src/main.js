import Vue from 'vue';
import { install as api } from '@/config/api';
import { i18n } from '@/lang/i18n';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(api);

new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
