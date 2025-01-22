import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const FeeStructure = () => {
  const [classGrade, setClassGrade] = useState('');
  const [feeCategory, setFeeCategory] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [installments, setInstallments] = useState(1);
  const [feeStructures, setFeeStructures] = useState([]);

  const handleAddFeeStructure = () => {
    const newStructure = {
      classGrade,
      feeCategory,
      feeAmount,
      installments,
    };
    setFeeStructures([...feeStructures, newStructure]);
    setClassGrade('');
    setFeeCategory('');
    setFeeAmount('');
    setInstallments(1);
  };

  return (
    <Container>
      <h2 className="my-4">Manage Fee Structure</h2>
      <Form>
        <Row className="mb-3">
          <Col sm={4}>
            <Form.Group controlId="formClassGrade">
              <Form.Label>Class/Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Class/Grade"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="formFeeCategory">
              <Form.Label>Fee Category</Form.Label>
              <Form.Control
                as="select"
                value={feeCategory}
                onChange={(e) => setFeeCategory(e.target.value)}
              >
                <option value="tuition">Tuition Fee</option>
                <option value="library">Library Fee</option>
                <option value="transport">Transport Fee</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formFeeAmount">
              <Form.Label>Fee Amount</Form.Label>
              <Form.Control
                type="number"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formInstallments">
              <Form.Label>Installments</Form.Label>
              <Form.Control
                type="number"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleAddFeeStructure}>
          Add Fee Structure
        </Button>
      </Form>

      <div className="mt-5">
        <h4>Fee Structures List</h4>
        <Row>
          {feeStructures.map((structure, index) => (
            <Col md={4} key={index} className="mb-4">
              <div className="card p-3">
                <h5>{structure.classGrade}</h5>
                <p>
                  <strong>Fee Category:</strong> {structure.feeCategory}
                </p>
                <p>
                  <strong>Amount:</strong> ${structure.feeAmount}
                </p>
                <p>
                  <strong>Installments:</strong> {structure.installments}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default FeeStructure;
