const ROOT_URL = process.env.VUE_APP_ROOT_PATH;

const routes = [
  { path: ROOT_URL, component: () => import('./views/Home.vue') },
];

export default routes;