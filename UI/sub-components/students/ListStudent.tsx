import axiosInstance from '@/lib/axios-instance';
import ConfirmBox from '@/pages/components/common/confirmModalBox';
import { CSSProperties, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

import PaginationComponent from '@/pages/components/common/Pagination';

import Container from 'react-bootstrap/Container';

import { DialogOptions } from '@/components/comman/interface';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

type CallbackFunction<T> = (...args: T[]) => void;

const LoadingSpinner = dynamic(() => import('@/components/comman/loader'), {
  ssr: false,
});

function useDebounce<T>(
  callback: CallbackFunction<T>,
  delay: number,
): CallbackFunction<T> {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const debounceFunction: CallbackFunction<T> = (...args: T[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      callback(...args);
    }, delay);
    setTimerId(newTimerId);
  };

  return debounceFunction;
}

const StudentList = () => {
  const [listStudent, setStudentList] = useState<any>([]);

  const [selectedId, setSelectedId] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modelProps, setModelProps] = useState<DialogOptions>({});

  const [loading, setLoading] = useState(true);

  const limit = 5;

  const getStudentList = async (value: any = '') => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `students?limit=${limit}&page=${currentPage}&searchText=${value}`,
      );
      setStudentList(response.data);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getStudentList();
  }, [currentPage]);

  const deleteStudent = (id: string) => {
    setSelectedId(id);
    setModalShow(true);
  };

  const activeAndInActiveHandle = (e: any, id: string) => {
    const { title } = e.target;

    setModelProps({
      body: `Are you sure you want to be ${title}?`,
      actionType: title.toLowerCase(),
    });
    setSelectedId(id);
    setModalShow(true);
  };

  const iconCursor = { cursor: 'pointer', marginLeft: '10px' };

  const onConfirm = async (actionType: string) => {
    try {
      setLoading(true);
      let response: any = '';
      switch (actionType.toLowerCase()) {
        case 'active':
          response = await axiosInstance.put('students/' + selectedId, {
            status: 1,
          });
          break;
        case 'inactive':
          response = await axiosInstance.put('students/' + selectedId, {
            status: 2,
          });
          break;
        case 'delete':
          response = await axiosInstance.delete('students/' + selectedId);
          break;
      }

      toast.success(response.data);
      setModalShow(false);
      getStudentList();
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const hideModal = () => {
    setSelectedId('');

    delete modelProps.body;
    delete modelProps.actionType;

    setModalShow(false);
  };

  const router = useRouter();

  const handleEditEvent = (id: any) => {
    router.push({
      pathname: '/pages/addStudent',
      query: { type: 'edit', id: id },
    });
  };

  const divStyle = {
    marginLeft: '10px',
  };

  const tableCellStyle: CSSProperties = {
    textAlign: 'right',
  };

  const debouncedSearch = useDebounce(getStudentList, 1000);

  const handleSearchBox = (event: any) => {
    const { value }: any = event.target;

    debouncedSearch(value);
  };

  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-between w-100">
          <div className="ms-lg-3 d-none d-md-none d-lg-block">
            {/* Search Form */}
            <Form className="d-flex align-items-center">
              <Form.Control
                type="search"
                onChange={handleSearchBox}
                placeholder="Search"
              />
            </Form>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />

        <Row>
          <Table responsive>
            <thead>
              <tr>
                <th scope="col">Profile</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">FatherName</th>
                <th scope="col">MotherName</th>
                <th scope="col">Class</th>
                <th scope="col">Status</th>
                <th scope="col" style={tableCellStyle} align="right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listStudent.data ? (
                listStudent?.data.map((student: any, index: number) => (
                  <tr key={index}>
                    <th scope="row">
                      <img
                        className="rounded-circle avatar-md"
                        alt={student?.firstName}
                        src={student.profileImage}
                        height="30"
                        width="30"
                      />
                    </th>
                    <td>{student?.firstName}</td>
                    <td>{student?.lastName}</td>
                    <td>{student?.fatherName}</td>
                    <td>{student?.motherName}</td>
                    <td>{student?.class}</td>
                    <td>{student?.statusLabel}</td>
                    <td align="right">
                      <i
                        className="fa fa-eye fs-3 icon"
                        title="View"
                        style={iconCursor}
                      ></i>{' '}
                      <i
                        className="fa-regular fa-pen-to-square fs-3 pl3-l icon"
                        title="Edit"
                        style={iconCursor}
                        onClick={(i) => handleEditEvent(student._id)}
                      ></i>
                      {student?.status === 1 ? (
                        <i
                          className="fa-regular fa-eye-slash fs-3 icon mr-2"
                          title="Inactive"
                          onClick={(i) =>
                            activeAndInActiveHandle(i, student._id)
                          }
                          style={iconCursor}
                        ></i>
                      ) : (
                        <i
                          className="fa-regular fa-eye fs-3 pl3-l icon"
                          title="Active"
                          onClick={(i) =>
                            activeAndInActiveHandle(i, student._id)
                          }
                          style={iconCursor}
                        ></i>
                      )}
                      <i
                        className="fa fa-trash fs-3 icon mb-3 pt-2"
                        onClick={() => deleteStudent(student._id)}
                        title="Delete"
                        style={iconCursor}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <LoadingSpinner />
              )}
            </tbody>
          </Table>

          <PaginationComponent
            totalRecords={listStudent?.totalRow}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            recordsPerPage={limit}
          />
        </Row>

        <ConfirmBox
          {...modelProps}
          show={modalShow}
          onHide={hideModal}
          onConfirm={onConfirm}
        />
      </Container>
    </>
  );
};

export default StudentList;
