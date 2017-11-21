import { routerRedux } from 'dva/router';
import { query as queryUsers, queryCurrent } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    currentUser: {},
  },

  effects: {
    // *fetch(_, { call, put }) {
    //   yield put({
    //     type: 'changeLoading',
    //     payload: true,
    //   });
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   yield put({
    //     type: 'changeLoading',
    //     payload: false,
    //   });
    // },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = {};
      response.name = sessionStorage.name?sessionStorage.name:'匿名用户';
      response.avatar = sessionStorage.avatar?sessionStorage.avatar:'http://img.mabylove.cn/rootImg/logo/logoP100.png';
      if(sessionStorage.name) {
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      } else {
        yield put(routerRedux.push('/user/login'));
      }
      
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
