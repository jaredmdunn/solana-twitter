const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/about', component: () => import('./views/About.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('./views/PageNotFound.vue') }
];

export default routes;