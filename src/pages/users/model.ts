import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList } from './service';
interface UserModelType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users',
  state: {},
  reducers: {
    // getList(state, action){
    getList(state, { payload }) {
      // return DataCue;
      console.log('model');
      console.log(payload);
      return payload;
    },
  },
  effects: {
    //     fun({type, payLoad}, effects){
    //         //yield put()
    //     },
    *getRemote(action, { put, call }) {
      // 注意要用yield等待异步
      const data = yield call(getRemoteList);
      yield put({
        type: 'getList',
        // payload: data,
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};
export default UserModel;
