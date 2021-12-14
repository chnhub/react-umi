import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

//列表操作按钮
const ActionBuiler = (
  actions: BasicListApi.Action[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
  record?: any,
  loading?: boolean,
) => {
  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return (
        <Button
          key={action.text}
          type={action.type as ButtonType}
          loading={loading}
          onClick={() => {
            // eve.currentTarget.setAttribute("loading", String(loading));
            actionHandler(action, record);
          }}
        >
          {action.text}
        </Button>
      );
    }
    return null;
  });
};
export default ActionBuiler;
