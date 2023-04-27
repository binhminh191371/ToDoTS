import React from "react";
import { Button, Input } from "antd";
import { PropsModal } from "../type";

const ModalShow: React.FC<PropsModal> = ({
  show,
  setShow,
  modifyingTask,
  setModifyingTask,
  handleUpdate,
}) => {
  return (
    <div className={show ? "modify-form" : "deactive"}>
      <i className=' close-btn bx bx-x' onClick={() => setShow(!show)}></i>
      <p className='form-label'>Edit User</p>
      <Input
        value={modifyingTask}
        type='text'
        onChange={(e) => setModifyingTask(e.target.value)}
      />
      <Button
        type='primary'
        className='Btn_save'
        onClick={handleUpdate}
        disabled={!modifyingTask}
      >
        Save
      </Button>
    </div>
  );
};

export default ModalShow;
