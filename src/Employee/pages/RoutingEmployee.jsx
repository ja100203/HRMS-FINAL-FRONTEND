import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Tickets from "../pages/tickets/Ticket";
import Attendance from "../pages/attendance/Attendance";
import Worksheets from "../pages/worksheets/Worksheets";
import Performance from "./performance/Performance";
import LeaveView from "../../Hr/pages/timesheets/leave/Mainfile/LeaveView";
import EventCalender from "./cardCode/events/EventCalender";

const routesData = [
  { path: "/Employee-Dashboard", element: <Dashboard /> },
  { path: "/employee/worksheets", element: <Worksheets /> },
  { path: "/employee/tickets", element: <Tickets /> },
  { path: "/employee/attendance-log", element: <Attendance /> },
  { path: "/employee/performance", element: <Performance /> },
  { path: "/employee/leave", element: <LeaveView /> },
  { path: "/employee/events", element: <EventCalender /> },
];

const RoutingWorksheets = () => {
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
export default RoutingWorksheets;
