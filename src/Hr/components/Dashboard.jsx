import React, { useState,useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import CompanyLogoFile from "./CompanyLogoFile";
import MainFile from "./MainFile";

const Dashboard = ({logout}) => {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu}  />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} logout={logout}/>
        <div className="head-foot-part">
          <MainFile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;