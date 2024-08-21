import { createRouter, createWebHashHistory } from "vue-router";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component:() => import("@/login/loginIndex.vue"),
      meta: { 
        //切换页面动画
        transition: 'slide-right',
        //是否需要登录
        requireAuth:false
      }
    },
    {
      path:"/indexDashboard",
      component:() => import("@/index/indexDashboard.vue"),
      meta: { 
        transition: 'slide-left',
        requireAuth:true 
      }
    },
    {
      path:"/indexDashboardView",
      component:() => import("@/view/indexDashboardView.vue"),
      meta: { 
        requireAuth:true 
      }
    }
  ],
});

export default router

