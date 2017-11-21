import { stringify } from 'qs';
import { config,request,request2 } from '../utils';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeMobileLogin(params) {
  return request('/api/login/mobile', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

/*
 * 文件上传平台
 */
 //获取文件列表
export async function getFileList(params) {
  return request2(config.host+'/upload/getFileList', {
    method: 'post',
    body: stringify(params),
    data:params,
  })
}

//删除文件
export async function deleteFile(params) {
  return request2(config.host+'/upload/deleteFile', {
    method: 'post',
    body: stringify(params),
    data:params,
  })
}

//获取评论信息
export async function getComment(params) {
  return request2(config.host+'/upload/getComment', {
    method: 'post',
    body: stringify(params),
    data:params,
  })
}

//保存评论信息
export async function saveComment(params) {
  return request2(config.host+'/upload/saveComment', {
    method: 'post',
    body: stringify(params),
    data:params,
  })
}

/*
 * 登录平台
 */
 //获取文件列表
export async function login(params) {
  return request2(config.mabyHost+'/userInfo/userlogin', {
    method: 'post',
    body: stringify(params),
    data:params,
  })
}