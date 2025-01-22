import { Container } from 'react-bootstrap';

import FeeStructure from '@/sub-components/Fee/FeeStructure';
import { PageHeading } from '../../widgets';

const FeeStructurePage = () => {
  return (
    <Container fluid className="p-6">
      <PageHeading heading="Fee Categories" />

      <FeeStructure />
    </Container>
  );
};

export default FeeStructurePage;

FeeStructurePage.auth = true;
