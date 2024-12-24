import { Button, Modal } from 'react-bootstrap';

const ConfirmBox = (props: any) => {
  const {
    cancelText = 'Cancel',
    okText = 'Confirm',
    title = 'Confirm',
    body = 'Are you sure you want to delete?',
    actionType = 'delete',
    showFooter = true,
  } = props;

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>

      {showFooter && (
        <Modal.Footer>
          <Button onClick={props.onHide}>{cancelText}</Button>
          <Button onClick={() => props.onConfirm(actionType)}>{okText}</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ConfirmBox;
