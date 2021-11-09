import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 在main.js => node 會自行尋找node_modules包，所以不必寫node_modules
import 'normalize.css';
import '@/assets/css/base.scss';
import '@/assets/css/main.scss';
// import './assets/main.scss';
// 套件裡的相對路徑會在node_modules包尋找，不必修改，而scss檔main.scss尋找，要修改
// import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
// import '@fortawesome/fontawesome-free/scss/solid.scss';

// 需要才載入，效能比較好
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faShoppingCart,
    faFileAlt,
    faUser,
    faMapMarkerAlt,
    faSearch,
    faChevronLeft,
    faChevronRight,
    faCheckCircle as fasFaCircle
} from '@fortawesome/free-solid-svg-icons';

import {
    faBell,
    faCheckCircle as farFaCircle
} from '@fortawesome/free-regular-svg-icons';

// We are only using the user-astronaut icon
library.add(
    faHome,
    faShoppingCart,
    faFileAlt,
    faUser,
    faMapMarkerAlt,
    faBell,
    faSearch,
    faChevronLeft,
    fasFaCircle,
    farFaCircle,
    faChevronRight
);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
