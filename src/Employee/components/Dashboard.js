import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import CompanyLogoFile from "./CompanyLogoFile";
import MainFile from "./MainFile";
import axios from "axios";

const Dashboard = () => {
  const [menu, setMenu] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:8082/employee/byId/11`);
    setEmployeeData(result);
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  console.log(employeeData);
  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="head-foot-part">
          <MainFile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
