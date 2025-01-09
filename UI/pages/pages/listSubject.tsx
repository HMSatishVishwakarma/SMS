import { Container } from 'react-bootstrap';

import { ListClasses } from '@/sub-components';
import { PageHeading } from '../../widgets';

const ListSubjectPage = () => {
  return (
    <Container fluid className="p-6">
      <PageHeading heading="Classes" />
      <ListClasses />
    </Container>
  );
};

export default ListSubjectPage;

ListSubjectPage.auth = true;
