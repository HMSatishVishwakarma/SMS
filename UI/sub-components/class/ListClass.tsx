import axiosInstance from '@/lib/axios-instance';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container, Form, Row, Table } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

const LoadingSpinner = dynamic(() => import('@/components/comman/loader'), {
  ssr: false,
});

const ListClasses = () => {
  const [headers, setHeaders] = useState([]); // Store headers data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerResponse, classesResponse] = await Promise.all([
          axiosInstance.get(
            'app-configuration/getHeaderConfig?tableName=classHeaderConfig',
          ),
          axiosInstance.get('classes'),
        ]);

        setHeaders(headerResponse.data[0].headers || []);
        setFiles(classesResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchData();
  }, []);

  const iconCursor = { cursor: 'pointer', marginLeft: '10px' };

  // const debouncedSearch = useDebounce(filesData, 1000);

  // const handleSearchBox = (event: any) => {
  //   const { value }: any = event.target;

  //   debouncedSearch(value);
  // };

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
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <Row>
        <Container fluid>
          <Table responsive>
            <thead>
              <tr>
                {headers.map(
                  (header: any, index) =>
                    header.visible && <th key={index}>{header.name}</th>,
                )}
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  {headers.map(
                    (header, headerIndex) =>
                      header.visible && (
                        <td key={headerIndex}>
                          {header.select === 'status'
                            ? file.status === 1
                              ? 'Active'
                              : 'Inactive'
                            : header.select === 'createdAt' ||
                                header.fieldselectName === 'updatedAt'
                              ? new Date(file[header.select])?.toLocaleString()
                              : file[header.select]}
                        </td>
                      ),
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Row>
    </>
  );
};

export default ListClasses;
