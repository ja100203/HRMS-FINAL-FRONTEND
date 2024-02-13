import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import DashboardFile from "./sidebarComponent/DashboardFile";
import PerformanceFile from "./sidebarComponent/PerformanceFile";
import ProjectsFile from "./sidebarComponent/ProjectsFile";
import TicketsFile from "./sidebarComponent/TicketsFile";
import WorksheetsFile from "./sidebarComponent/Worksheetsfile";
import Trainingfile from "./sidebarComponent/Trainingfile";
import AttendanceFile from "./sidebarComponent/AttendanceFile";
import MyFinanceFile from "./sidebarComponent/MyFinanceFile";
import EmployeeDetails from "./sidebarComponent/EmployeeDetails";
import { useNavigate } from "react-router-dom/dist";
const SideBar = ({ menu,logout }) => {
  const [empData, setEmpData] = useState([]);
  // const loadEmployee = async () => {
  //   try {
  //     const result = await api.loadEmployee();
  //     setEmpData(result.data);
  //   } catch (error) {
  //     console.error("Error loading employee data:", error);
  //   }
  // };

  // useEffect(() => {
  //   loadEmployee();
  // }, []);
  
  const handleLogout = () => {
    logout()
  };

  console.log(EmployeeDetails().employeeData[0]);
  return (
    <>
      <div className="sidebar-btn-container">
        <div className="sidebar-container">
          <DashboardFile />
          <AttendanceFile />
          <ProjectsFile />
          <TicketsFile />
          <WorksheetsFile />
          <PerformanceFile />
          <MyFinanceFile />
          {/* <Trainingfile /> */}
        </div>
        <button id="logout-hrms-btn" onClick={handleLogout} >
        Logout<i class="bx bx-log-out"></i>
      </button>
      </div>
    </>
  );
};

export default SideBar;
