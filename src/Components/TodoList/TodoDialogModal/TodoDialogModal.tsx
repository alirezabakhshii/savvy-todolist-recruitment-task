import React from "react";
import { Modal } from "../../SharedComponents/Modal";
import { Form } from "../Form/Form";

export const TodoDialogModal: React.FC = () => {
  return (
    <Modal modalName="TodoDialogModal">
      <div className="p-[32px]">
        <Form />
      </div>
    </Modal>
  );
};
