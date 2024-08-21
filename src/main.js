import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from "element-plus"
import router from './router'
import axios from 'axios';
import cookies from "js-cookie";
const app = createApp(App)
app.use(elementPlus).use(router).mount('#app')

const axiosInstance = axios.create({
// axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
// 超时
  timeout: 40000
});
app.config.globalProperties.$axios = axiosInstance;
    
// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 取出cookie里面缓存的用户信息
    let token = cookies.get("token")
    config.headers['Authorization'] = 'Bearer '+token;  // 设置请求头
    
    return config
}, error => {
    return Promise.reject(error)
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
        if (cookies.get("token")) {  // 判断当前的token是否存在 ； 登录存入的token
            next();
        }
        else {
            next({
                path: '/',
                query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});