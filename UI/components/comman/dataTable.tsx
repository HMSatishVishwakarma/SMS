import useDebounce from '@/hooks/useDebounce';
import axiosInstance from '@/lib/axios-instance';
import ActionButtons from '@/pages/components/common/actionButtons';
import ConfirmBox from '@/pages/components/common/confirmModalBox';
import PaginationComponent from '@/pages/components/common/Pagination';
import OverlayLoader from '@/pages/components/OverlayModal';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast'; // If you're using react-hot-toast for notifications
import { apiResponseType } from './interface';

interface Header {
  name: string;
  select: string;
  visible: boolean;
}

interface File {
  [key: string]: any;
  id: number;
  name: string;
  status: number;
  createdAt: string;
}

interface Action {
  name: string;
}

interface DataTableProps {
  appConfigURL: string;
  addButtonName: string;
  pageDataURL: string;
  modalShow: boolean;
  handleSearchBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddClassBtn: () => void;
  handleAction: (action: string, data: File) => void;
  modelProps: object;
  hideModal: () => void;
  onConfirm: (actionType: number) => void;
  refresh: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  appConfigURL,
  pageDataURL,
  modelProps,
  handleSearchBox,
  handleAddClassBtn,
  handleAction,
  modalShow,
  onConfirm,
  addButtonName,
  refresh = false,
  hideModal,
}) => {
  const [headers, setHeaders] = useState([]); // Store headers data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [pageLimit, setPageLimit] = useState<number>(0);
  const [actions, setActions] = useState([]); // Store headers data
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // const [modelProps, setModelProps] = useState<DialogOptions>({});
  // const [modalShow, setModalShow] = useState(false);

  const [files, setFiles] = useState<apiResponseType>({
    data: [],
    totalCount: 0,
  });
  const debouncedSearchText = useDebounce(searchText, 500);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageData = async (limit: number, data = '') => {
    const classesResponse = await axiosInstance.get(
      `${pageDataURL}?limit=${limit}&page=${currentPage}&filter=${searchText}`,
    );

    setFiles(classesResponse.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchData();
    }
  }, [refresh]);

  const fetchData = async () => {
    try {
      setLoading(true);

      axiosInstance.get(appConfigURL).then(async (headerResponse) => {
        setPageLimit(headerResponse.data[0].pageLimit);
        getPageData(headerResponse.data[0].pageLimit);

        console.log(
          headerResponse.data[0].headers,
          'headerResponse.data[0].headers',
        );

        setHeaders(headerResponse.data[0].headers || []);
        setActions(headerResponse.data[0].actionList || []);
      });
    } catch (error: any) {
      toast.error(error?.message);
      console.error('Error fetching data:', error);
    } finally {
      // handleRefreshEvent(refresh);

      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <OverlayLoader loading={loading} />

      <div className="d-flex justify-content-between w-100">
        {/* Search Form */}
        <div className="ms-lg-3 d-none d-md-none d-lg-block">
          <Form className="d-flex align-items-center">
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={handleSearchBox}
            />
          </Form>
        </div>

        {/* Add Class Button */}
        <div className="fw-semi-bold mb-1">
          <Button onClick={handleAddClassBtn} variant="primary">
            {addButtonName}
          </Button>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Table */}
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
              {files.data &&
                files.data.map((file, index) => (
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

          {/* Pagination */}
          <PaginationComponent
            totalRecords={files?.totalCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            recordsPerPage={pageLimit}
          />
        </Container>

        {JSON.stringify(modalShow)}

        {/* Confirm Box (Modal) */}
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

export default DataTable;
