import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const FeePayment = () => {
  const [studentName, setStudentName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleRecordPayment = () => {
    const newPayment = {
      studentName,
      paymentAmount,
      paymentMode,
      paymentDate,
    };
    setPaymentHistory([...paymentHistory, newPayment]);
    setStudentName('');
    setPaymentAmount('');
    setPaymentMode('');
    setPaymentDate('');
  };

  return (
    <Container>
      <h2 className="my-4">Record Fee Payment</h2>
      <Form>
        <Row className="mb-3">
          <Col sm={4}>
            <Form.Group controlId="formStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="formPaymentAmount">
              <Form.Label>Payment Amount</Form.Label>
              <Form.Control
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formPaymentMode">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Control
                as="select"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="bankTransfer">Bank Transfer</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formPaymentDate">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleRecordPayment}>
          Record Payment
        </Button>
      </Form>

      <div className="mt-5">
        <h4>Payment History</h4>
        <Row>
          {paymentHistory.map((payment, index) => (
            <Col md={4} key={index} className="mb-4">
              <div className="card p-3">
                <h5>{payment.studentName}</h5>
                <p>
                  <strong>Amount:</strong> ${payment.paymentAmount}
                </p>
                <p>
                  <strong>Mode:</strong> {payment.paymentMode}
                </p>
                <p>
                  <strong>Date:</strong> {payment.paymentDate}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default FeePayment;
