// import node module libraries
import Link from 'next/link';
import { Card, Col, Image, ProgressBar, Row, Table } from 'react-bootstrap';

// import required data files
import ActiveProjectsData from '@/data/dashboard/ActiveProjectsData';

const ActiveProjects = () => {
  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white  py-4">
            <h4 className="mb-0">Active Projects</h4>
          </Card.Header>
          <Table responsive className="mb-0 text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Project name</th>
                <th>Hours</th>
                <th>priority</th>
                <th>Members</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {ActiveProjectsData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div>
                          <div
                            className={`icon-shape icon-md rounded-1 border p-4 ${item.brandLogoBg}`}
                          >
                            <Image src={item.brandLogo} alt="" />
                          </div>
                        </div>
                        <div className="lh-1 ms-3">
                          <h5 className=" mb-1">
                            <Link href="#" className="text-inherit">
                              {item.projectName}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{item.hours}</td>
                    <td className="align-middle">
                      <span className={`badge bg-${item.priorityBadgeBg}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="align-middle">
                      <div className="avatar-group">
                        {item.members.map((avatar, avatarIndex) => {
                          return (
                            <span
                              className="avatar avatar-sm"
                              key={avatarIndex}
                            >
                              <Image
                                alt="avatar"
                                src={avatar.image}
                                className="rounded-circle"
                              />
                            </span>
                          );
                        })}
                        <span className="avatar avatar-sm avatar-primary">
                          <span className="avatar-initials rounded-circle fs-6">
                            +5
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="text-dark align-middle">
                      <div className="float-start me-3">{item.progress}%</div>
                      <div className="mt-2">
                        <ProgressBar
                          now={item.progress}
                          style={{ height: '5px' }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="bg-white text-center">
            <Link href="#" className="link-primary">
              View All Projects
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default ActiveProjects;
