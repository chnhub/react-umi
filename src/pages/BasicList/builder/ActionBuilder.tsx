import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';
import { useState } from 'react';


//列表操作按钮
const ActionBuiler = (
  actions: BasicListApi.Action[] | undefined,
  actionHandler: BasicListApi.ActionHandler,
  record?: any,
  loading?: boolean,
  btnName?: string
) => {
  // const [active, setActive] = useState("");

  return (actions || []).map((action) => {
    if (action.component === 'button') {
      return (
        <Button
          key={action.text}
          type={action.type as ButtonType}
          loading={btnName === action.text ? loading : false}
          // loading={false}
          onClick={() => {
            // setActive(action.text)
            // eve.currentTarget.setAttribute("loading", String(loading));
            actionHandler(action, record, action.text);
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
