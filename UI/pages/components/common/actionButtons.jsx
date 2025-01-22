import { Status } from '@/types/statusEnum';
import PropTypes from 'prop-types';
import {
  FaCheckCircle,
  FaEdit,
  FaEye,
  FaTimesCircle,
  FaTrashAlt,
} from 'react-icons/fa'; // Importing the new icons

const ActionButtons = ({ data, actionList, onAction }) => {
  // Combined handler to manage icon clicks
  const handleActionClick = (actionType) => {
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
      case 'view':
        onAction({ type: 'view', _id: data._id });
        break;
      default:
        console.warn('Unknown action');
    }
  };

  return (
    <div className="action-buttons">
      {actionList.view && (
        <FaEye
          className="action-icon"
          onClick={() => handleActionClick('view')}
          size={20}
          style={{ cursor: 'pointer', color: '#17a2b8' }}
          title="View"
        />
      )}

      {actionList.status &&
        (data.status === Status.InActive ? (
          <FaCheckCircle
            className="action-icon"
            onClick={() => handleActionClick('status')}
            size={20}
            style={{
              cursor: 'pointer',
              color: '#28a745', // Green for active
            }}
            title="Activate"
          />
        ) : (
          <FaTimesCircle
            className="action-icon"
            onClick={() => handleActionClick('status')}
            size={20}
            style={{
              cursor: 'pointer',
              color: '#dc3545', // Red for inactive
            }}
            title="Deactivate"
          />
        ))}

      {actionList.edit && (
        <FaEdit
          className="action-icon"
          onClick={() => handleActionClick('edit')}
          size={20}
          style={{ cursor: 'pointer', color: '#ffc107' }}
          title="Edit"
        />
      )}

      {actionList.delete && (
        <FaTrashAlt
          className="action-icon"
          onClick={() => handleActionClick('delete')}
          size={20}
          style={{ cursor: 'pointer', color: '#dc3545' }}
          title="Delete"
        />
      )}
    </div>
  );
};

// PropTypes (for JavaScript)
ActionButtons.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  actionList: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    delete: PropTypes.bool.isRequired,
    view: PropTypes.bool.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ActionButtons;
