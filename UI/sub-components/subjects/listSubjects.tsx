import DataTable from '@/components/comman/dataTable';
import { ModelProps } from '@/components/comman/interface';
import axiosInstance from '@/lib/axios-instance';
import { getStatusKeyByValue } from '@/utils';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddSubject from './AddSubject';

const ListSubjects = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [files, setFiles] = useState({ data: [], totalCount: 0 });
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [modelProps, setModelProps] = useState<ModelProps>({});
  const [actions, setActions] = useState([]);

  const [rowId, setRowId] = useState('');

  const handleSearchBox = (e) => {
    // console.log(e.target.value);
  };

  const addFormSubmit = (response: any) => {
    if (response.status) {
      toast.success(response.data);
      setModalShow(false);
      setRefresh(true);
    } else {
      toast.error('Error');
    }
  };

  const handleAddClassBtn = () => {
    setModelProps({
      okText: 'Submit',
      title: 'Add Subject',
      body: <AddSubject onClick={addFormSubmit} />,
      actionType: 'addSubject',
      showFooter: false,
    });
    setModalShow(true);
  };

  const handleAction = async (actionData: {
    type: string;
    _id: string;
    value: string;
  }) => {
    console.log('handleAction');

    switch (actionData.type) {
      case 'delete':
      case 'status':
        const title = getStatusKeyByValue(actionData.value);

        setModelProps({
          body: `Are you sure you want to be ${title}?`,
          actionType: actionData.value,
        });

        setRowId(actionData._id);
        setModalShow(true);
        break;
      case 'edit':
        const response: any = { data: { name: 'Sfs' } };

        const data = response.data;

        setRowId(actionData._id);
        setModelProps({
          okText: 'Submit',

          title: 'Edit Class',
          body: <AddSubject initialValues={data} />,
          actionType: actionData.value,
          showFooter: false,
        });
        setModalShow(true);
        break;

      default:
        console.warn('Unknown action');
    }
  };

  const onConfirm = async (actionType: number) => {
    try {
      console.log(
        `Model confirm event trigged , Data : ${JSON.stringify(actionType)} `,
      );

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

  const hideModal = () => {
    setRowId('');

    delete modelProps.body;
    delete modelProps.actionType;

    setModalShow(false);
  };

  return (
    <div>
      <DataTable
        appConfigURL="app-configuration/getHeaderConfig?tableName=subjectHeaderConfig"
        pageDataURL="subject"
        addButtonName="Add Subject"
        // loading={loading}
        // currentPage={currentPage}
        // pageLimit={pageLimit}
        handleSearchBox={handleSearchBox}
        handleAddClassBtn={handleAddClassBtn}
        handleAction={handleAction}
        // handlePageChange={handlePageChange}
        hideModal={hideModal}
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
