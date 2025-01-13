import { Container } from 'react-bootstrap';

import { ListSubjects } from '@/sub-components';
import { PageHeading } from '../../widgets';

const ListSubjectPage = () => {
  return (
    <Container fluid className="p-6">
      <PageHeading heading="Subjects" />
      <ListSubjects />
    </Container>
  );
};

export default ListSubjectPage;

ListSubjectPage.auth = true;
