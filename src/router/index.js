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
      path: '/customer',
      redirect: '/customer/customerList',
      component: Layout,
      name: 'customer',
      meta: {
        title: '客户关系管理',
        icon: 'icon-kehuguanxiguanli'
      },
      children: [
        {
          path: '/customer/customerList',
          component: ()=> import("@/views/customer/customerList.vue"),
          name: 'customer',
          meta: {
            title: '客户列表',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: '/customer/customerCreate',
          component: ()=> import("@/views/customer/customerEdit.vue"),
          name: 'customerCreate',
          meta: {
            title: '新增客户',
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
        {
          path: '/customer/customerUpdate',
          component: ()=> import("@/views/customer/customerEdit.vue"),
          name: 'customerUpdate',
          meta: {
            title: '修改客户',
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
      ]
    },
    {
      path: '/module',
      redirect: '/module/moduleList',
      component: Layout,
      name: 'module',
      meta: {
        title: '模块管理',
        icon: 'icon-mokuailiebiao'
      },
      children: [
        {
          path: '/module/moduleList',
          component: ()=> import("@/views/module/moduleList.vue"),
          name: 'module',
          meta: {
            title: '模块列表',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: '/module/moduleCreate',
          component: ()=> import("@/views/module/moduleEdit.vue"),
          name: 'moduleCreate',
          meta: {
            title: '新增模块',
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
        {
          path: '/module/moduleUpdate',
          component: ()=> import("@/views/module/moduleEdit.vue"),
          name: 'moduleUpdate',
          meta: {
            title: '修改模块',
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
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
            keepAlive: false,
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
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
      ]
    },
    {
      path: '/applet',
      redirect: '/applet/appletManagement',
      component: Layout,
      name: 'applet',
      meta: {
        title: '模板小程序管理',
        icon: 'icon-xiaochengxumoban'
      },
      children: [
        {
          path: '/applet/appletManagement',
          component: ()=> import("@/views/applet/appletManagement.vue"),
          name: 'appletManagement',
          meta: {
            title: '模板小程序管理',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: '/applet/clubCardManagement',
          component: ()=> import("@/views/applet/clubCardManagement.vue"),
          name: 'clubCardManagement',
          meta: {
            title: '会员卡模板管理',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: '/applet/clubCardCreate',
          component: ()=> import("@/views/applet/clubCardEdit.vue"),
          name: 'clubCardCreate',
          meta: {
            title: '新增会员卡模板',
            keepAlive: false,
            auth: true,
            hidden: true
          }
        },
        {
          path: '/applet/clubCardUpdate',
          component: ()=> import("@/views/applet/clubCardEdit.vue"),
          name: 'clubCardUpdate',
          meta: {
            title: '修改会员卡模板',
            keepAlive: false,
            auth: true,
            hidden: true
          }
        },
      ]
    },
    {
      path: '/system',
      redirect: '/system/noticeManagement',
      component: Layout,
      name: 'system',
      meta: {
        title: '系统管理',
        icon: 'icon-xitongguanli'
      },
      children: [
        {
          path: '/system/noticeManagement',
          component: ()=> import("@/views/system/noticeManagement.vue"),
          name: 'noticeManagement',
          meta: {
            title: '公告管理',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: '/system/noticeCreate',
          component: ()=> import("@/views/system/noticeEdit.vue"),
          name: 'noticeCreate',
          meta: {
            title: '新增公告',
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
        {
          path: '/system/noticeUpdate',
          component: ()=> import("@/views/system/noticeEdit.vue"),
          name: 'noticeUpdate',
          meta: {
            title: '修改公告',
            keepAlive: false,
            auth: true,
            hidden: true,
          }
        },
      ]
    }
  ]
})

router.beforeEach((to,from,next)=> {
  let token = localStorage.getItem('token')
  if(to.name == 'login') {
    if(token) next({ name: 'home' })
    else next()
  }else {
    if(token) next()
    else next({ name: 'login' })
  }
})

export default router;