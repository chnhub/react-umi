import React from 'react'
import { Modal, Tag } from 'antd'

//注意默认export default 名称需要与文件一致负责报错
const DModal = ({
  modalVisible,
  hideModal,
  modalData
}: { modalVisible: any, hideModal: any, modalData: [] }) => {
  return (
    <div>
      <Modal
        visible={modalVisible}
        onCancel={() => { hideModal(); }}
        focusTriggerAfterClose={false}
      >
        <Tag>{JSON.stringify(modalData)}</Tag>
      </Modal>
    </div>
  )
}

export default DModal;
