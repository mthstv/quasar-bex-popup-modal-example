import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/popup',
    component: () => import('pages/PopupPage.vue'),
  },
  {
    name: 'modal',
    path: '/modal',
    component: () => import('pages/ModalPage.vue'),
  },
];

export default routes;
