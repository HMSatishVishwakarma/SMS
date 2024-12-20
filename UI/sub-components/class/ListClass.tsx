import { DialogOptions } from '@/components/comman/interface';
import axiosInstance from '@/lib/axios-instance';
import ActionButtons from '@/pages/components/common/actionButtons';
import ConfirmBox from '@/pages/components/common/confirmModalBox';
import { getStatusKeyByValue } from '@/utils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container, Form, Row, Table } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
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

      fetchData();
      setModalShow(false);
    } catch (error: any) {
      // toast.error(error?.message);
    }
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const fetchData = async () => {
    try {
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

  const handleAction = (actionData: {
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
        setModelProps({
          okText: 'Submit',

          title: 'Edit Class',
          body: <AddClass />,
          actionType: actionData.value,
        });
        setModalShow(true);
        break;

      default:
        console.warn('Unknown action');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between w-100">
        <div className="ms-lg-3 d-none d-md-none d-lg-block">
          {/* Search Form */}
          <Form className="d-flex align-items-center">
            <Form.Control
              type="search"
              // onChange={handleSearchBox}
              placeholder="Search"
            />
          </Form>
        </div>
        <div className="fw-semi-bold mb-1"> Add Classes</div>
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
