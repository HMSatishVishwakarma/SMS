import { FormValues, Option } from '@/interface';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icon imports for active/inactive status

interface ViewClassProps {
  data: FormValues;
  subjects: Option[]; // Subjects passed as a prop
}

const ViewClass: React.FC<ViewClassProps> = ({ data }) => {
  // Map subjects to get the names to display as a comma-separated list
  const selectedSubjects = data.subjects.map((i) => i.name).join(', ');

  // Formatting the created and updated dates
  const formattedCreatedAt = new Date(data.createdAt).toLocaleString();
  const formattedUpdatedAt = new Date(data.updatedAt).toLocaleString();

  return (
    <Row className="justify-content-center mb-4">
      <Col xl={8} lg={9} md={12} xs={12}>
        <Card className="p-4 shadow-sm">
          <Card.Body>
            {/* <h3 className="mb-4 text-center">Class Details</h3> */}
            <Form>
              {/* Class Name */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label font-weight-bold">
                  Class Name:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <div className="form-control-plaintext">{data.className}</div>
                </Col>
              </Row>

              {/* Subjects */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label font-weight-bold">
                  Subjects:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <div className="form-control-plaintext">
                    {selectedSubjects}
                  </div>
                </Col>
              </Row>

              {/* Status */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label font-weight-bold">
                  Status:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <div className="d-flex align-items-center">
                    {data.status === 1 ? (
                      <FaCheckCircle className="text-success me-2" />
                    ) : (
                      <FaTimesCircle className="text-danger me-2" />
                    )}
                    <div className="form-control-plaintext">
                      {data.status === 1 ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Created At */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label font-weight-bold">
                  Created At:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <div className="form-control-plaintext bg-light rounded p-2">
                    {formattedCreatedAt}
                  </div>
                </Col>
              </Row>

              {/* Updated At */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label font-weight-bold">
                  Updated At:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <div className="form-control-plaintext bg-light rounded p-2">
                    {formattedUpdatedAt}
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewClass;
