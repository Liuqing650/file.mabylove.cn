import { routerRedux } from 'dva/router';
import {message} from 'antd';
import { fakeAccountLogin, login, fakeMobileLogin } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
        yield put({
            type: 'changeSubmitting',
            payload: true,
        });
        const data = yield call(login, payload);
        console.log(loginMsg);
        const loginMsg = data.loginMsg;
        if(loginMsg&&loginMsg.length>0) {
          if(loginMsg[0].state==1) {
              message.success('登陆成功')
              sessionStorage.setItem('id', loginMsg[0].id);
              sessionStorage.setItem('name', loginMsg[0].nick_name);
              sessionStorage.setItem('avatar',loginMsg[0].avatar?loginMsg[0].avatar:null);
              let response = { "status": "ok", "type": "account" };
              yield put({
                  type: 'changeLoginStatus',
                  payload: response,
              });
          } else if(loginMsg[0].state==2) {
              message.warning('您的账号已被封')
          } else {
              message.warning('登陆失败,您的账号或者密码错误!')
          }
        } else {
            message.error('登陆失败,您的账号或者密码错误!')
        }
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
    },
    *mobileSubmit(_, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeMobileLogin);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout(_, { put }) {
        console.log("=============");
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
