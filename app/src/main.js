import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// CSS
import './main.css';
import 'solana-wallets-vue/styles.css';

import routes from './routes';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
