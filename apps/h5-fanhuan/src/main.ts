import './styles.scss';

import router from './router';

import { createApp } from 'vue';
import App from './app/app'
// 开发环境初始化eruda调试工具
if(import.meta.env.MODE === 'development') {
  import('eruda').then((eruda) => {
    eruda.default.init();
  });
}

import 'intersection-observer';

const app = createApp(App);

app.use(router);

app.mount('#root');

router.beforeEach((to, from, next) => {
  /* 路由发生变化时，遍历修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.matched.length == 0) {
      router.push(to.path);
  }
  next()
})
