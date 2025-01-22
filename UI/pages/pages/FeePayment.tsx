import { Container } from 'react-bootstrap';

import FeePayment from '@/sub-components/Fee/FeePayment';
import { PageHeading } from '../../widgets';

const FeeStructurePage = () => {
  return (
    <Container fluid className="p-6">
      <PageHeading heading="Fee Payment" />

      <FeePayment />
    </Container>
  );
};

export default FeeStructurePage;

FeeStructurePage.auth = true;
