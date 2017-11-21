import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component: () => component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user'], import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '文件上传',
        icon: 'cloud-upload-o',
        path: 'upload',
        children: [
          {
            name: '资源上传',
            path: 'cloud',
            component: dynamicWrapper(app, ['upload'], import('../routes/Upload/UploadCloud')),
          },
          {
            name: '图片信息',
            path: 'image',
            component: dynamicWrapper(app, ['upload'], import('../routes/Upload/ImageCloud')),
          },
          {
            name: '文件信息',
            path: 'file',
            component: dynamicWrapper(app, ['upload'], import('../routes/Upload/FileCloud')),
          },
          {
            name: '声音信息',
            path: 'music',
            component: dynamicWrapper(app, ['upload'], import('../routes/Upload/VoiceCloud')),
          },
          {
            name: '视频信息',
            path: 'video',
            component: dynamicWrapper(app, ['upload'], import('../routes/Upload/VideoCloud')),
          },
          {
            name: '资源信息',
            path: 'res',
            component: dynamicWrapper(app, ['upload'], import('../routes/Upload/ResCloud')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], import('../routes/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
];
