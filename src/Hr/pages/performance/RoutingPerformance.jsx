import React from "react";
import { Route, Routes } from "react-router-dom";
import PerformanceIndicatorView from "./PerformanceIndicator/PerformanceIndicatorView";
import PerformancesAppraisalView from "./PerformanceAppraisal/Mainfile/PerformancesAppraisalView";

const performanceRoutesData = [
  {
    path: "/hr/performance/Performance-Indicator",
    element: <PerformanceIndicatorView />,
  },
  {
    path: "/hr/performance/Performance-Appraisal",
    element: <PerformancesAppraisalView />,
  },
];

const RoutingPerformance = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          {performanceRoutesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default RoutingPerformance;
