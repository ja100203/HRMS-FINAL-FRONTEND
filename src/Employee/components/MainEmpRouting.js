import React from "react";
// import RoutingEvent from "../pages/cardCode/RoutingEvent";
import RoutingEmployee from "../pages/RoutingEmployee";
import RoutingProjects from "../pages/projects/RoutingProjects";
import "../styles.css";

const MainRouting = () => {
  return (
    <div className="main-container">
      <RoutingEmployee />
      <RoutingProjects />
      {/* <RoutingEvent /> */}
    </div>
  );
};

export default MainRouting;
