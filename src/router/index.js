import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=> import("@/views/login.vue"),
      meta: {
        title: '登陆',
        hidden: true,
      }
    },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      name: 'home',
      meta: {
        title: '首页',
        icon: 'icon-shouye'
      },
      children: [
        {
          path: '/home',
          component: ()=> import("@/views/home.vue"),
          name: 'home',
          meta: {
            title: '首页概况',
            keepAlive: true,
            auth: true
          }
        }
      ]
    },
    {
      path: '/staff',
      redirect: '/staff/staffList',
      component: Layout,
      name: 'staff',
      meta: {
        title: '员工管理',
        icon: 'icon-yuangongguanli'
      },
      children: [
        {
          path: '/staff/staffList',
          component: ()=> import("@/views/staff/staffList.vue"),
          name: 'staff',
          meta: {
            title: '员工列表',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: '/staff/staffCreate',
          component: ()=> import("@/views/staff/staffEdit.vue"),
          name: 'staffCreate',
          meta: {
            title: '新增员工',
            keepAlive: true,
            auth: true,
            hidden: true,
          }
        },
        {
          path: '/staff/staffUpdate',
          component: ()=> import("@/views/staff/staffEdit.vue"),
          name: 'staffUpdate',
          meta: {
            title: '修改员工',
            keepAlive: true,
            auth: true,
            hidden: true,
          }
        },
      ]
    }
  ]
})

export default router;