import React from "react";
import { Route, Routes } from "react-router-dom";
import CommitteeView from "./committee/Mainfile/CommitteeView";
import EditCommittee from "./committee/Mainfile/EditCommitte";
import UnitView from "./unit/Mainfile/UnitView";
import VendorView from "./vendor/Mainfile/VendorView";
import RequestView from "./request/Mainfile/RequestView";
import BidAnalysis from "./bidAnalysis/mainfile/BidAnalysisView";
import PurchaseOrderView from "./purchase/Mainfile/PurchaseOrderView";

const routesData = [
  { path: "/hr/procurement/committee", element: <CommitteeView /> },
  { path: "/procurement/edit-committee/:id", element: <EditCommittee /> },
  { path: "/hr/procurement/unit", element: <UnitView /> },
  { path: "/hr/procurement/vendor", element: <VendorView /> },
  // { path: "/hr/procurement/purchase-order", element: <PurchaseOrder /> },
  { path: "/hr/procurement/request", element: <RequestView /> },
  { path: "/hr/procurement/bidAnalysis", element: <BidAnalysis /> },
  { path: "/hr/procurement/purchase", element: <PurchaseOrderView /> },
];

const RoutingProcurement = () => {
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

export default RoutingProcurement;
