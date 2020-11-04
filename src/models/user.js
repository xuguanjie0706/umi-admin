import api from '@/api';
import { history } from 'umi';

const Model = {
  namespace: 'user',
  state: {
    status: false,
    roles: [],
    _id: null,
    data: {}
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(api.User.login, payload);
      if (response) {
        yield put({
          type: 'changeStatus',
          payload: true,
          key: 'status',
        });
        yield put({
          type: 'changeStatus',
          payload: response,
          key: 'data',
        });
        yield put({
          type: 'changeStatus',
          payload: response._id,
          key: '_id',
        });
        let RoleArr = [];
        response._role.forEach(item => {
          RoleArr = [...RoleArr, ...item.content];
        });
        yield put({
          type: 'changeStatus',
          payload: RoleArr,
          key: 'roles',
        });
        localStorage.setItem('hl-token', response.token);
        return response;
      } else {
        return false;
      }
    },
    *addbyself({ payload }, { call, put }) {
      const response = yield call(api.User.addbyself, payload);
      if (response) {
        return true;
      } else {
        return false;
      }
    },
    *check({ payload }, { call, put }) {
      const response = yield call(api.User.check, payload);
      if (response) {
        yield put({
          type: 'changeStatus',
          payload: true,
          key: 'status',
        });
        yield put({
          type: 'changeStatus',
          payload: response,
          key: 'data',
        });
        yield put({
          type: 'changeStatus',
          payload: response._id,
          key: '_id',
        });
        let RoleArr = [];
        response._role.forEach(item => {
          RoleArr = [...RoleArr, ...item.content];
        });
        // console.log(RoleArr);
        yield put({
          type: 'changeStatus',
          payload: RoleArr,
          key: 'roles',
        });
        // localStorage.setItem('hl-token', response.token);
        return response;
      } else {
        return false;
      }
    },
    *loginOut(_, { put }) {
      yield put({
        type: 'changeStatus',
        payload: false,
        key: 'status',
      });
      localStorage.removeItem('hl-token');
      history.push('/login');
    },


  },
  reducers: {
    changeStatus(state, { payload, key }) {
      return { ...state, [key]: payload };
    },
  },
};
export default Model;
