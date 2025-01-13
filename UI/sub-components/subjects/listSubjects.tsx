import DataTable from '@/components/comman/dataTable';
import { useState } from 'react';

const ListSubjects = () => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState({ data: [], totalCount: 0 });
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [modelProps, setModelProps] = useState({});
  const [actions, setActions] = useState([]);

  const handleSearchBox = (e) => {
    console.log(e.target.value);
  };

  const handleAddClassBtn = () => {
    console.log('Add Class Button Clicked');
  };

  const handleAction = (action, data) => {
    console.log('Action:', action, 'Data:', data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onConfirm = (confirmed) => {
    if (confirmed) {
      console.log('Action confirmed');
    }
    setModalShow(false);
  };

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
        // modalShow={modalShow}
        // modelProps={modelProps}
        onConfirm={onConfirm}
        // actions={actions}
      />
    </div>
  );
};

export default ListSubjects;
