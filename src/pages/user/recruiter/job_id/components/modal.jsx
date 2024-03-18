import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Btn } from "../../../../../AbstractElements";

const WorkFlowModal = (props) => {
  const saveBtnFun = () => {
    if (props.saveType === "url") {
      window.location.replace(props.redection_url);
    }
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggler}
      size={props.size}
      centered
    >
      <ModalHeader toggle={props.toggler}>{props.title}</ModalHeader>
      <ModalBody className={props.bodyClass}>{props.children}</ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "secondary", onClick: props.toggler }}>
          {props.cancel}
        </Btn>
        <Btn attrBtn={{ color: "primary", onClick: saveBtnFun }}>
          {props.save}
        </Btn>
      </ModalFooter>
    </Modal>
  );
};
export default WorkFlowModal;
