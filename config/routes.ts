export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    // name: 'edit',
    // hideInMenu: 'true',
    // path: '/basic-list/api/models/model-design/*',
    path: '/basic-list/api/models/model-design/*',
    component: './ModelDesign',
  },
  {
    // name: 'basic-list.edit',
    // hideInMenu: 'true',
    path: '/basic-list/api/*/*',
    component: './BasicList/component/Page',
  },
  {
    name: 'single-page',
    icon: 'table',
    // path: '/single-page',
    path: '/basic-list/api/admins/1501',
    component: './BasicList/component/Page',
  },
  {
    name: 'basic-list',
    icon: 'table',
    path: '/basic-list/api/*',
    component: './BasicList',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'ModelDesign',
    icon: 'smile',
    path: '/model-design',
    component: './ModelDesign',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
