// import node module libraries
import { useState } from 'react';

// import sub components
import { Col, Row } from 'react-bootstrap';
import NavbarTop from './navbars/NavbarTop';
import NavbarVertical from './navbars/NavbarVertical';

const DefaultDashboardLayout = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  return (
    <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <div id="page-content">
        <div className="header">
          <NavbarTop
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        {props.children}
        <div className="border-top px-6 py-3">
          <Row>
            <Col sm={6} className="text-sm-start mb-sm-0 mb-2 text-center">
              <p className="m-0">
                Made by{' '}
                <a href="https://codescandy.com/" target="_blank">
                  Codescandy
                </a>
              </p>
            </Col>
            <Col sm={6} className="text-sm-end text-center">
              <p className="m-0">
                Destributed by{' '}
                <a href="https://themewagon.com/" target="_blank">
                  ThemeWagon
                </a>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default DefaultDashboardLayout;
