import { Container } from 'react-bootstrap';

import FeeCategories from '@/sub-components/Fee/feeCategories';
import { PageHeading } from '../../widgets';

const FeeCategoriesPage = () => {
  return (
    <Container fluid className="p-6">
      <PageHeading heading="Fee Categories" />

      <FeeCategories />
    </Container>
  );
};

export default FeeCategoriesPage;

FeeCategoriesPage.auth = true;
