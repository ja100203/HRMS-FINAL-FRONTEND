import React, { useEffect, useState } from "react";

import DashboardFile from "./sidebarComponent/DashboardFile";
import PerformanceFile from "./sidebarComponent/PerformanceFile";
import ProjectsFile from "./sidebarComponent/ProjectsFile";
import TicketsFile from "./sidebarComponent/TicketsFile";
import WorksheetsFile from "./sidebarComponent/Worksheetsfile";
import Trainingfile from "./sidebarComponent/Trainingfile";
import AttendanceFile from "./sidebarComponent/AttendanceFile";
import MyFinanceFile from "./sidebarComponent/MyFinanceFile";
import { useNavigate } from "react-router-dom";
import EmployeeDetails from "./sidebarComponent/EmployeeDetails";

const SideBar = () => {
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
        return (
        <div
          id="logout-hrms-btn"
          className="logout-hrms-btn"
          style={{
            background: "rgba(111, 111, 111, 0.1)",
            cursor: "pointer",
            padding: "10px",
            width: "100%",
          }}
        >
          {/* <button id="logout-hrms-btn" onClick={() => navigation("/")}>Logout<i class='bx bx-log-out'></i></button>
          <button id="icon-logout-hrms-btn" onClick={() => navigation("/")}><i class='bx bx-log-out'></i></button> */}
          <img src={""} alt="Profile" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
              {"Praveen"}
            </h3>
            <p style={{ fontSize: "14px", fontWeight: "400" }}>{"Developer"}</p>
          </div>
        </div>
        );
      </div>
    </>
  );
};

export default SideBar;
