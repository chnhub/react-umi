import moment from 'moment';

//提交数据转换
export const submitFieldsAdaptor = (formValues: []) => {
  const _formValues = formValues;
  Object.keys(formValues).forEach((key) => {
    if (moment.isMoment(formValues[key])) {
      _formValues[key] = moment(formValues[key]).format();
    }
  });
  return _formValues;
};

//编辑弹框数据展示
export const setFieldsAdaptor = (data: BasicListApi.PageData) => {
  // return { create_time: moment("2021-12-09T11:22:28+08:00") };
  const newData = {};
  if (data.layout.tabs && data.dataSource) {
    data.layout.tabs.forEach((tab) => {
      tab.data.forEach((item) => {
        switch (item.type) {
          case 'datetime':
            newData[item.key] = moment(data.dataSource[item.key]);
            break;
          case 'switch':
            newData[item.key] = Number(data.dataSource[item.key]);
            break;
          // case "tree":
          //   break;
          default:
            newData[item.key] = data.dataSource[item.key];
            break;
        }
      });
    });
    return newData;
  } else {
    return {};
  }
  console.log('newData', newData);
};
