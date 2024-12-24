import { DialogOptions } from '@/components/comman/interface';
import axiosInstance from '@/lib/axios-instance';
import ActionButtons from '@/pages/components/common/actionButtons';
import ConfirmBox from '@/pages/components/common/confirmModalBox';
import OverlayLoader from '@/pages/components/OverlayModal';
import { getStatusKeyByValue } from '@/utils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import AddClass from './addClass';

const LoadingSpinner = dynamic(() => import('@/components/comman/loader'), {
  ssr: false,
});

const ListClasses = () => {
  const [headers, setHeaders] = useState([]); // Store headers data
  const [actions, setActions] = useState([]); // Store headers data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const [modelProps, setModelProps] = useState<DialogOptions>({});

  const [modalShow, setModalShow] = useState(false);

  const [rowId, setRowId] = useState('');

  const [files, setFiles] = useState([]);

  const onConfirm = async (actionType: number) => {
    try {
      await axiosInstance.put('classes/updateStatus/' + rowId, {
        status: actionType,
      });

      if (actionType === 0) {
        toast.success('Data deleted successFully');
      } else {
        toast.success('Status updated successfully.');
      }

      fetchData();
      setModalShow(false);
    } catch (error: any) {
      // toast.error(error?.message);
    }
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const getClassById = async (id: string): Promise<any> => {
    return await axiosInstance.get(`classes/${id}`);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [headerResponse, classesResponse] = await Promise.all([
        axiosInstance.get(
          'app-configuration/getHeaderConfig?tableName=classHeaderConfig',
        ),
        axiosInstance.get('classes'),
      ]);

      setHeaders(headerResponse.data[0].headers || []);
      setActions(headerResponse.data[0].actionList || []);
      setFiles(classesResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (actionData: {
    type: string;
    _id: string;
    value: string;
  }) => {
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
        const response: any = await getClassById(actionData._id);

        const data = response.data;

        setRowId(actionData._id);
        setModelProps({
          okText: 'Submit',

          title: 'Edit Class',
          body: <AddClass initialValues={data} onClick={addFormSubmit} />,
          actionType: actionData.value,
          showFooter: false,
        });
        setModalShow(true);
        break;

      default:
        console.warn('Unknown action');
    }
  };

  const addFormSubmit = (response: any) => {
    if (response.status) {
      fetchData();
      toast.success(response.data);
      setModalShow(false);
    } else {
      toast.error('Error');
    }
  };

  const handleAddClassBtn = () => {
    setModelProps({
      okText: 'Submit',

      title: 'Add Class',
      body: <AddClass onClick={addFormSubmit} />,
      actionType: 'addClass',
      showFooter: false,
    });
    setModalShow(true);
  };

  return (
    <>
      <OverlayLoader loading={loading} />
      <div className="d-flex justify-content-between w-100">
        {/* Search Form */}
        <div className="ms-lg-3 d-none d-md-none d-lg-block">
          <Form className="d-flex align-items-center">
            <Form.Control
              type="search"
              placeholder="Search"
              // onChange={handleSearchBox}
            />
          </Form>
        </div>

        {/* Using <a> Tag for Navigation */}
        <div className="fw-semi-bold mb-1">
          <a>
            <Button onClick={handleAddClassBtn} variant="primary">
              Add Class
            </Button>
          </a>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <Row>
        <Container fluid>
          <Table responsive>
            <thead>
              <tr>
                {headers.map((header, index) =>
                  header.visible ? <th key={index}>{header.name}</th> : null,
                )}
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  {headers.map((header, headerIndex) =>
                    header.visible ? (
                      <td key={headerIndex}>
                        {header.select === 'status' ? (
                          file.status === 1 ? (
                            'Active'
                          ) : (
                            'Inactive'
                          )
                        ) : header.select === 'createdAt' ||
                          header.select === 'updatedAt' ? (
                          new Date(file[header.select]).toLocaleString()
                        ) : header.select === 'actions' ? (
                          // Add Action Buttons for this row
                          <ActionButtons
                            actionList={actions}
                            data={file}
                            onAction={handleAction}
                          />
                        ) : (
                          file[header.select]
                        )}
                      </td>
                    ) : null,
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <ConfirmBox
          {...modelProps}
          show={modalShow}
          onHide={hideModal}
          onConfirm={onConfirm}
        />
      </Row>
    </>
  );
};

export default ListClasses;
