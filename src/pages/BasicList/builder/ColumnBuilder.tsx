import { Space, Tag } from 'antd';
import moment from 'moment';
import ActionBuiler from './ActionBuilder';

//列表字段渲染
const ColumnsBuilder = (
  tableColumn: BasicListApi.Field[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
) => {
  const newColumn: BasicListApi.Field[] = [];
  // const actionHandler = () => { };
  (tableColumn || []).forEach((column) => {
    if (column.hideInColumn !== true) {
      switch (column.type) {
        case 'datetime':
          column.render = (value: string) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          };
          column.sorter = true;
          break;

        case 'switch':
          column.render = (value: string) => {
            const option = (column.data || []).find((params: any) => {
              return params.value === value;
            });
            return <Tag color={value ? 'blue' : 'red'}>{option?.title}</Tag>;
          };
          break;

        case 'actions':
          column.render = (t, record) => {
            // console.log("🚀 ~ file: ColumnBuilder.tsx ~ line 30 ~ value", record)
            // debugger
            return <Space>{ActionBuiler(column.actions, actionHandler, record)}</Space>;
          };
          break;

        default:
          break;
      }
      newColumn.push(column);
    }
  });

  const idCol: BasicListApi.Field[] = [{ title: 'ID', dataIndex: 'id', key: 'id', sorter: true }];
  return idCol.concat(newColumn || []);
  // return [{ title: 'ID', dataIndex: 'id', key: 'id' }].concat(
  //   init?.data?.layout?.tableColumn.filter((item) => item.hideInColumn !== true) || [],
  // )
};

export default ColumnsBuilder;
