import React from "react";
import RoutingOrganisation from "../pages/oganisation/RoutingOrganisation";
import RoutingPerformance from "../pages/performance/RoutingPerformance";
import RoutingSingleModules from "../pages/singleModules/RoutingSingleModules";
import RoutingPayroll from "../pages/payroll/RoutingPayroll";
import RoutingEmployee from "../pages/employee/RoutingEmployee";
import RoutingTimesheets from "../pages/timesheets/RoutingTimesheets";
import RoutingRecruitment from "../pages/recruitment/RoutingRecruitment";
import RoutingAccount from "../pages/account/RoutingAccount";
import RoutingProcurement from "../pages/procurement/RoutingProcurement";
import "../styles.css";

const MainRouting = () => {
  return (
    <div className="main-container">
      <RoutingOrganisation />
      <RoutingPerformance />
      <RoutingSingleModules />
      <RoutingPayroll />
      <RoutingEmployee />
      <RoutingTimesheets />
      <RoutingRecruitment />
      <RoutingAccount />
      <RoutingProcurement />
    </div>
  );
};

export default MainRouting;
