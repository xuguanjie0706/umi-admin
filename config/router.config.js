export default [
  {
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        path: 'forget',
        component: '@/layouts/Login/Forget',
      },
      {
        path: 'login',
        component: '@/layouts/Login/Register',
      },
      {
        path: '/',
        component: '@/layouts/index',
        routes: [
          {
            path: '/',
            name: "首页",
            authority: 'home',
            component: '@/pages/Home',
          },
          {
            path: 'system',
            name: "系统管理",
            authority: 'manage',
            routes: [{
              path: "menuList",
              authority: 'menu',
              name: "菜单管理",
              component: "@/pages/System/Menu"
            },
            {
              path: "roleList",
              authority: 'role',
              name: "角色管理",
              component: "@/pages/System/Role"
            },
            {
              path: "userList",
              authority: 'user',
              name: "用户管理",
              component: "@/pages/System/User"
            },
            {
              path: "merchantList",
              authority: 'merchant',
              name: "商户管理",
              component: "@/pages/System/Merchant"
            },
            ]
          },
          {
            path: 'setting',
            name: "配置管理",
            authority: 'setting',
            routes: [{
              path: "configList",
              authority: 'config',
              name: "参数配置",
              component: "@/pages/SettingManage/SettingView"
            },
              // {
              //   path: "pictureList",
              //   authority: 'picture',
              //   name: "图片配置",
              //   component: "@/pages/SettingManage/PictureView"
              // },
            ]
          },
          {
            path: 'product',
            name: "产品中心",
            authority: 'Product',
            routes: [{
              path: "goodsList",
              authority: 'Goods',
              name: "商品列表",
              component: "@/pages/Product/Goods"
            },
            {
              path: "typeList",
              authority: 'Type',
              name: "分类列表",
              component: "@/pages/Product/Type"
            },
            {
              path: "CardStatistics",
              authority: 'CardStatistics',
              name: "卡片分类",
              component: "@/pages/Product/CardStatistics"
            },
            {
              path: "ExchangeCard",
              authority: 'ExchangeCard',
              name: "卡片管理",
              component: "@/pages/Product/ExchangeCard"
            },
            {
              path: "ticketView",
              authority: 'TicketView',
              name: "卡券管理",
              component: "@/pages/Product/TicketView"
            },
            ]
          },
          {
            path: 'order',
            name: "订单中心",
            authority: 'order',
            routes: [{
              path: "OrderList",
              authority: 'OrderList',
              name: "订单列表",
              component: "@/pages/Order/OrderList"
            }, {
              path: "memberPay",
              authority: 'memberPay',
              name: "会员续费",
              component: "@/pages/Order/MemberPay"
            },
            ]
          },
          {
            path: 'MemberCenter',
            name: "用户中心",
            authority: 'memberCenter',
            routes: [{
              path: "NewStudy",
              authority: 'study',
              name: "新手教程",
              component: "@/pages/MemberCenter/NewStudy"
            },
            {
              path: "MakeMoney",
              authority: 'money',
              name: "充值",
              component: "@/pages/MemberCenter/MakeMoney"
            },
            {
              path: "MemberSetting",
              authority: 'custom',
              name: "个性化配置",
              component: "@/pages/MemberCenter/MemberSetting"
            },
            ]
          },
          {
            component: '@/layouts/404',
          },
        ],
      },
      {
        component: '@/layouts/404',
      },
    ],
  },
  {
    component: '@/layouts/404',
  },
];
