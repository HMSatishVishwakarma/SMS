import DataTable from '@/components/comman/dataTable';
import axiosInstance from '@/lib/axios-instance';
import { getStatusKeyByValue } from '@/utils';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ListSubjects = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [files, setFiles] = useState({ data: [], totalCount: 0 });
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [modelProps, setModelProps] = useState({});
  const [actions, setActions] = useState([]);

  const [rowId, setRowId] = useState('');

  const handleSearchBox = (e) => {
    console.log(e.target.value);
  };

  const handleAddClassBtn = () => {
    console.log('Add Class Button Clicked');
  };

  const handleAction = async (actionData: {
    type: string;
    _id: string;
    value: string;
  }) => {
    switch (actionData.type) {
      case 'delete':
      case 'status':
        const title = getStatusKeyByValue(actionData.value);
        console.log(title, '--------------sfd');
        setModelProps({
          body: `Are you sure you want to be ${title}?`,
          actionType: actionData.value,
        });

        setRowId(actionData._id);
        setModalShow(true);
        break;
      case 'edit':
        /*  const response: any = await getClassById(actionData._id);

        const data = response.data;

        setRowId(actionData._id);
        setModelProps({
          okText: 'Submit',

          title: 'Edit Class',
          body: <AddClass initialValues={data} onClick={addFormSubmit} />,
          actionType: actionData.value,
          showFooter: false,
        });
        setModalShow(true); */
        break;

      default:
        console.warn('Unknown action');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onConfirm = async (actionType: number) => {
    try {
      await axiosInstance.put('subject/updateStatus/' + rowId, {
        status: actionType,
      });

      if (actionType === 0) {
        toast.success('Data deleted successFully');
      } else {
        toast.success('Status updated successfully.');
      }

      // fetchData();
      setModalShow(false);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setRefresh(true);
    }
  };

  useEffect(() => {
    return () => {
      setRefresh(false);
    };
  }, [refresh]);

  return (
    <div>
      <DataTable
        appConfigURL="app-configuration/getHeaderConfig?tableName=subjectHeaderConfig"
        pageDataURL="subject"
        // loading={loading}
        // currentPage={currentPage}
        // pageLimit={pageLimit}
        handleSearchBox={handleSearchBox}
        handleAddClassBtn={handleAddClassBtn}
        handleAction={handleAction}
        // handlePageChange={handlePageChange}
        modalShow={modalShow}
        modelProps={modelProps}
        onConfirm={onConfirm}
        refresh={refresh}

        // actions={actions}
      />
    </div>
  );
};

export default ListSubjects;
