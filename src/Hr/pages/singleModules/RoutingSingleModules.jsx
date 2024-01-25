import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBank from "../singleModules/Bank/addbank/AddBank";
import EditBank from "../singleModules/Bank/addbank/EditBank";
import GrantLoanView from "../singleModules/Loan/grantloan/GrantLoanView";
import EditGrantLoan from "../singleModules/Loan/grantloan/EditGrantLoan";
import GrantLoanProfile from "../singleModules/Loan/grantloan/GrantLoanProfile";
import ProjectView from "./project/Mainfile/ProjectView";
import ProjectEdit from "./project/Mainfile/ProjectEdit";
import TicketView from "./tickets/mainfile/TicketView";
import EditTicket from "./tickets/mainfile/EditTicket";
import TrainerView from "./trainer/mainfile/TrainerView";
import EditTrainer from "./trainer/mainfile/EditTrainer";
import WorkSheetView from "./worksheet/Mainfile/WorkSheetView";

const routesData = [
  { path: "/hr/bank/add-bank", element: <AddBank /> },
  { path: "/bank/edit-bank/:id", element: <EditBank /> },
  { path: "/hr/loan/grant-loan", element: <GrantLoanView /> },
  { path: "/loan/edit-grant-loan/:id", element: <EditGrantLoan /> },
  { path: "/loan/grant-loan-profile/:id", element: <GrantLoanProfile /> },
  { path: "/hr/project", element: <ProjectView /> },
  { path: "/edit-project/:id", element: <ProjectEdit /> },
  { path: "/edit-ticket/:id", element: <EditTicket /> },
  { path: "/hr/ticket", element: <TicketView /> },
  { path: "/hr/trainer", element: <TrainerView /> },
  { path: "/edit-trainer/:id", element: <EditTrainer /> },
  { path: "/hr/worksheets", element: <WorkSheetView /> },
];

const RoutingSingleModules = () => {
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

export default RoutingSingleModules;
