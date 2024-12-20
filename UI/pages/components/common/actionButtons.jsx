import { Status } from '@/types/statusEnum';
import { Button } from 'react-bootstrap';

const ActionButtons = ({ data, actionList, onAction }) => {
  // Combined handler to manage button clicks
  const handleActionClick = (actionType) => {
    console.log('--------------->', actionType === 'status');

    switch (actionType) {
      case 'status':
        const newStatus =
          data.status === Status.Active ? Status.InActive : Status.Active;
        onAction({ type: 'status', value: newStatus, _id: data._id });
        break;
      case 'edit':
        onAction({ type: 'edit', _id: data._id });
        break;
      case 'delete':
        onAction({ value: 0, type: 'delete', _id: data._id });
        break;
      default:
        console.warn('Unknown action---->');
    }
  };

  return (
    <div>
      {actionList.status && (
        <Button
          variant={data.status === Status.InActive ? 'success' : 'secondary'}
          className="me-1"
          onClick={() => handleActionClick('status')}
        >
          {data.status === Status.InActive ? 'Active' : 'Inactive'}
        </Button>
      )}
      {actionList.edit && (
        <Button
          variant="warning"
          className="me-1"
          onClick={() => handleActionClick('edit')}
        >
          Edit
        </Button>
      )}
      {actionList.delete && (
        <Button
          variant="danger"
          className="me-1"
          onClick={() => handleActionClick('delete')}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
