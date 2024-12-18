import { Status } from '@/types/statusEnum';
import { Button } from 'react-bootstrap';

const ActionButtons = ({
  actionList = {},
  data = {},
  onToggleStatus = () => {},
}) => {
  console.log('Data, 0000000000', data);

  const handleStatusToggle = () => {
    const newStatus =
      data.status === Status.Active ? Status.InActive : Status.Active;
    onToggleStatus({ status: newStatus, _id: data._id });
  };

  return (
    <div>
      {actionList.status && (
        <Button
          variant={data.status === Status.InActive ? 'success' : 'secondary'}
          className="me-1"
          onClick={handleStatusToggle}
        >
          {data.status === Status.InActive ? 'Active' : 'Inactive'}
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
