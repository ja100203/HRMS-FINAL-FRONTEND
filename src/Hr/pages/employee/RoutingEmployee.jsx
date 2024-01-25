import React from "react";
import { Route, Routes } from "react-router-dom";
import AwardsView from "./awards/Mainfile/AwardView";
import EditAward from "./awards/Mainfile/EditAward";
import ComplaintView from "./complaints/Mainfile/ComplaintView";
import EmployeeExitView from "./employeeexit/Mainfile/EmployeeExitView";
import EditEmployeeExit from "./employeeexit/Mainfile/EditEmployeeExit";
import EmployeeView from "./employees/Mainfile/EmployeeView";
import PromotionView from "./promotions/Mainfile/PromotionView";
import ResignationView from "./resignation/mainfile/ResignationView";
import EditResignation from "./resignation/mainfile/EditResignation";
import TerminationView from "./termination/mainfile/TerminationView";
import EditTermination from "./termination/mainfile/EditTermination";
import TransferView from "./transfers/mainfile/TransferView";
import EditTransfer from "./transfers/mainfile/EditTransfer";
import TravelView from "./travels/mainfile/TravelView";
import WarningView from "./warnings/Mainfile/WarningView";
import EditComplaint from "./complaints/Mainfile/EditComplaint";
import Editemployee from "./employees/Mainfile/EditEmployee";
import EditTravel from "./travels/mainfile/EditTravel";
import EmployeeProfile from "./employees/Mainfile/EmployeeProfile";
import TransferProfile from "./transfers/mainfile/TransferPofile";
import EditPromotion from "./promotions/Mainfile/EditPromotion";
import EditWarning from "./warnings/Mainfile/EditWarning";

const routesData = [
  { path: "/hr/employee/awards", element: <AwardsView /> },
  { path: "/employee/edit-awards/:id", element: <EditAward /> },
  { path: "/hr/employee/complaints", element: <ComplaintView /> },
  { path: "/employee/edit-complaints/:id", element: <EditComplaint /> },
  { path: "/hr/employee/employee-exit", element: <EmployeeExitView /> },
  { path: "/employee/edit-employee-exit/:id", element: <EditEmployeeExit /> },
  { path: "/hr/employee/employee", element: <EmployeeView /> },
  { path: "/employee/edit-employee/:id", element: <Editemployee /> },
  { path: "/employee/employee-profile/:id", element: <EmployeeProfile /> },
  { path: "/hr/employee/promotions", element: <PromotionView /> },
  { path: "/employee/edit-promotions/:id", element: <EditPromotion /> },
  { path: "/hr/employee/resignation", element: <ResignationView /> },
  { path: "/employee/edit-resignation/:id", element: <EditResignation /> },
  { path: "/hr/employee/termination", element: <TerminationView /> },
  { path: "/employee/edit-termination/:id", element: <EditTermination /> },
  { path: "/hr/employee/transfer", element: <TransferView /> },
  { path: "/employee/edit-transfer/:id", element: <EditTransfer /> },
  { path: "/employee/transfer-profile/:id", element: <TransferProfile /> },
  { path: "/hr/employee/travel", element: <TravelView /> },
  { path: "/employee/edit-travel/:id", element: <EditTravel /> },
  { path: "/hr/employee/warning", element: <WarningView /> },
  { path: "/employee/edit-warning/:id", element: <EditWarning /> },
];

const RoutingOrganisation = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          {routesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default RoutingOrganisation;
