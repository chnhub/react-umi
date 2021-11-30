import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';


const UsersModel: IndexModelType = {
  namespace: 'users',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
        const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
            },
          ];
          return data;
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'save',
          });
        }
      });
    },
  },
};

export default UsersModel;