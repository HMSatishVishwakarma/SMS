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

  useEffect(() => {
    const fetchHeaderConfig = async () => {
      try {
        console.log('Fetching header config...');
        const { data } = await axiosInstance.get(
          'app-configuration/getHeaderConfig?tableName=classHeaderConfig',
        );

        console.log('Received headers:', data[0].headers); // Log the headers data

        setHeaders(data[0].headers || []); // Set the headers in state
      } catch (error) {
        console.error('Error fetching headers:', error);
        setError('Failed to load headers'); // Set error message in case of failure
      } finally {
        setLoading(false); // Set loading to false once the fetch completes
      }
    };

    fetchHeaderConfig();
  }, []);

  const iconCursor = { cursor: 'pointer', marginLeft: '10px' };

  const filesData = [
    {
      className: 'KG',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 1',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 2',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 3',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 4',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 5',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 6',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 7',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      className: 'Class 8',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const dataWithCellStyles: DataRow[] = [
    {
      profileImage: { value: 'John Doe' },
      firstName: { value: 'Jane' },
      lastName: { value: 'Smith' },
      fatherName: { value: 'Mike' },
      motherName: { value: 'Emily' },
      class: { value: '10A' },
      statusLabel: { value: 'Active' },
      action: {
        value: 'Actions',
        components: [
          <i
            className="fa fa-eye fs-3 icon"
            title="View"
            style={iconCursor}
          ></i>,

          // Add more components for other actions as needed
        ],
      },
    },
    // Add more data rows as needed
  ];

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
              {filesData.map((file: any, index) => (
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
                                header.select === 'updatedAt'
                              ? file[header.select]?.toLocaleString() // Corrected here
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
