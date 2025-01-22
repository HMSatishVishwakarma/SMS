import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const FeeCategories = () => {
  const [feeCategory, setFeeCategory] = useState('');
  const [description, setDescription] = useState('');
  const [defaultAmount, setDefaultAmount] = useState('');
  const [lateFeeAmount, setLateFeeAmount] = useState('');
  const [feeCategories, setFeeCategories] = useState([]);

  const handleAddFeeCategory = () => {
    const newCategory = {
      name: feeCategory,
      description,
      defaultAmount,
      lateFeeAmount,
    };
    setFeeCategories([...feeCategories, newCategory]);
    setFeeCategory('');
    setDescription('');
    setDefaultAmount('');
    setLateFeeAmount('');
  };

  return (
    <Container>
      <h2 className="my-4">Manage Fee Categories</h2>
      <Form>
        <Row className="mb-3">
          <Col sm={4}>
            <Form.Group controlId="formFeeCategory">
              <Form.Label>Fee Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={feeCategory}
                onChange={(e) => setFeeCategory(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formDefaultAmount">
              <Form.Label>Default Amount</Form.Label>
              <Form.Control
                type="number"
                value={defaultAmount}
                onChange={(e) => setDefaultAmount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formLateFeeAmount">
              <Form.Label>Late Fee Amount</Form.Label>
              <Form.Control
                type="number"
                value={lateFeeAmount}
                onChange={(e) => setLateFeeAmount(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleAddFeeCategory}>
          Add Fee Category
        </Button>
      </Form>

      <div className="mt-5">
        <h4>Fee Categories List</h4>
        <Row>
          {feeCategories.map((category, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {category.description}
                    <br />
                    <strong>Amount:</strong> ${category.defaultAmount}
                    <br />
                    <strong>Late Fee:</strong> ${category.lateFeeAmount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default FeeCategories;
