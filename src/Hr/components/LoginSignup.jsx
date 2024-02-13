import React from "react";
import "../LoginSignup.scss";
import HRDashboard from "../components/Dashboard"
import EmployeeDashboard from "../../Employee/components/Dashboard"
import useAuth from "../hooks/useAuth"


const LoginSignup = () => {

  const {isHR, isEmployee, client, logout } = useAuth();
  return (
     <div>
       {isHR && <p><HRDashboard logout={logout}/></p>}
       {isEmployee && <p><EmployeeDashboard logout={logout}/></p>}
     </div>
   );

};

export default LoginSignup;