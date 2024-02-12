import HRDashboard from "../components/Dashboard"
import EmployeeDashboard from "../../Employee/components/Dashboard"
import useAuth from "../hooks/useAuth"

const LoginSignup = () => {

   const {isHR, isEmployee } = useAuth();

   return (
      <div>
        {isHR && <p><HRDashboard /></p>}
        {isEmployee && <p><EmployeeDashboard /></p>}
      </div>
    );

};

export default LoginSignup;
