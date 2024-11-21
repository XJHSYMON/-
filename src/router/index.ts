import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import(/* webpackChunkName: "MainLayout" */ '../pages/Login.vue')
  },
  {
    redirect:"/CustomerManage",
    path:"/CustomerManage",
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: "MainLayout" */ '../layouts/MainLayout.vue'),
    children:[
      {
        path: "/Home",
        name: "Home.vue",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/Home.vue"),
      },{
        path: "/WebSocketTest",
        name: "WebSocketTest",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/WebSocketTest.vue"),
      },
      {
        path: "/TableData",
        name: "TableData",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/TableData.vue"),
      },
        {
        path: "/MultiAuctionGameAlgorithm",
        name: "珠澳协同智能多属性拍卖博弈算法",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/MultiAuctionGameAlgorithm.vue"),
      },
        {
        path: "/UserManage",
        name: "用户管理",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/UserManage.vue"),
      },
        {
        path: "/CustomerService",
        name: "客服",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/CustomerService.vue"),
      },
        {
        path: "/SystemLogs",
        name: "系统日志",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/SystemLogs.vue"),
      },
      {
        path: "/IpLogs",
        name: "系统访问日志",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/IpLogs.vue"),
      },
      {
        path: "/SystemNotification",
        name: "系统通知",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/SystemNotification.vue"),
      },
      {
        path: "/Map",
        name: "Map",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/Map.vue"),
      },
      {
        path: "/CustomMap",
        name: "CustomMap",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/CustomMap.vue"),
      },
      {
        path: "/CustomSVGMap",
        name: "CustomSVGMap",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/CustomSVGMap.vue"),
      },
      {
        path: "/AirQualityInfo",
        name: "系统通知",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/AirQualityInfo.vue"),
      },


    ]
  },
  {
    path: "/demo",
    name: "系统通知",
    component: () =>
        import(/* webpackChunkName: "HomePage" */ "../pages/Demo.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router