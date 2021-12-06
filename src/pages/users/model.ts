import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, updtaUser, deleteUser, addUser } from './service';
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
    getList(state, action) {
      return action.userdata;
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
        userdata: {
          tabdata: data,
        },
      });
    },
    *edituser(action, { put, call }) {
      const { id, values } = action.rowdata;
      // 注意要用yield等待异步         
      const data = yield call(updtaUser, { id, values });
      yield put({ type: 'getRemote', })
    },
    *deleteuser(action, { put, call }) {
      const { id, values } = action.rowdata;
      // 注意要用yield等待异步         
      const data = yield call(deleteUser, { id });
      yield put({ type: 'getRemote', })
    },
    *adduser(action, { put, call }) {
      const { values } = action.rowdata;
      // 注意要用yield等待异步         
      const data = yield call(addUser, { values });
      yield put({ type: 'getRemote', })
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
