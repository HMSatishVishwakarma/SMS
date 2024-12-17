import { Button } from 'react-bootstrap';

const ActionButtons = ({ actionList = {}, status = 0, onToggleStatus }) => {
  const handleStatusToggle = () => {
    const newStatus = status === 1 ? 0 : 1;
    onToggleStatus(newStatus);
  };

  return (
    <div>
      {actionList.status && (
        <Button
          variant={status === 0 ? 'success' : 'secondary'}
          className="me-1"
          onClick={handleStatusToggle}
        >
          {status === 0 ? 'Active' : 'Inactive'}
        </Button>
      )}
      {actionList.edit && (
        <Button variant="warning" className="me-1">
          Edit
        </Button>
      )}
      {actionList.delete && (
        <Button variant="danger" className="me-1">
          Delete
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
