import dynamic from 'next/dynamic';
import { Container, Form, Row, Table } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

const LoadingSpinner = dynamic(() => import('@/components/comman/loader'), {
  ssr: false,
});

const ListClasses = () => {
  const headers: Header[] = [
    {
      text: 'Profile',
      dataField: 'profileImage',
    },
    {
      text: 'First Name',
      dataField: 'firstName',
    },
    {
      text: 'Last Name',
      dataField: 'lastName',
    },
    {
      text: 'Father Name',
      dataField: 'fatherName',
    },
    {
      text: 'Mother Name',
      dataField: 'motherName',
    },
    { text: 'Class', dataField: 'class' },
    {
      text: 'Status',
      dataField: 'statusLabel',
    },
    {
      text: 'Action',
      dataField: 'action',
      styles: {
        textAlign: 'right',
        fontWeight: 'bold',
      },
    },
  ];

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
                <th>Class Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filesData.map((file, index) => (
                <tr key={index}>
                  <td>{file.className}</td>
                  <td>{file.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td>{file.createdAt.toLocaleString()}</td>
                  <td>{file.updatedAt.toLocaleString()}</td>
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
function useDebounce(getStudentList: any, arg1: number) {
  throw new Error('Function not implemented.');
}
