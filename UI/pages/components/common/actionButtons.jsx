import { Status } from '@/types/statusEnum';
import { Button } from 'react-bootstrap';

const ActionButtons = ({
  actionList = {},
  status = Status.Inactive, // Default to Inactive
  onToggleStatus = () => {},
}) => {
  const handleStatusToggle = () => {
    const newStatus =
      status === Status.Active ? Status.Inactive : Status.Active;
    onToggleStatus(newStatus);
  };

  return (
    <div>
      {actionList.status && (
        <Button
          variant={status === Status.Active ? 'success' : 'secondary'}
          className="me-1"
          onClick={handleStatusToggle}
        >
          {status === Status.Active ? 'Active' : 'Inactive'}
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
