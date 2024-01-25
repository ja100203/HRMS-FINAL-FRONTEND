import React, { useEffect, useState } from "react";
import Notificationlogo from "../asset/24px/Notification.png";
import MessageLogo from "../asset/24px/message.png";
import UserLogo from "../asset/24px/User.png";

const Header = ({ menu, setMenu }) => {
  const handleMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  return (
    <>
      <div id="header-part" className="section-body top_dark">
        <div className="container-fluid" id="container-fluid">
          <div id="page-header" className="page-header">
            <div className="left">
              <h1 className="page-title">ORIVE Dashboard</h1>
              <div className="input-group xs-hide">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="mobile-right">
              <i
                class="menu-icon bx bx-menu"
                style={{ fontSize: "24px" }}
                onClick={handleMenu}
              ></i>
            </div>
            <div className="right">
              <div className="notification d-flex">
                <div className="dropdown d-flex">
                  <a
                    href={"#"}
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                    data-toggle="dropdown"
                  >
                    {/* <i className="fa fa-envelope" /> */}
                    <img src={Notificationlogo} />
                    <span className="badge badge-success nav-unread" />
                  </a>
                </div>
                <div className="dropdown d-flex">
                  <a
                    href={"#"}
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                    data-toggle="dropdown"
                  >
                    <img src={MessageLogo} />
                    <span className="badge badge-primary nav-unread" />
                  </a>
                </div>
                <div className="dropdown d-flex">
                  <a
                    href={"#"}
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                    data-toggle="dropdown"
                  >
                    <img src={UserLogo} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;