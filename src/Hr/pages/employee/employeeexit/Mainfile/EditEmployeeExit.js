import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import Button from "@mui/material/Button";

const EditEmployeeExit = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [employeeExit, setemployeeExit] = useState({
    employeeToExit: "",
    typeOfExit: "",
    email: "",
    exitDate: "",
  });

  const { employeeToExit, typeOfExit, email, exitDate } = employeeExit;

  useEffect(() => {
    loademployeeExit();
  }, []);

  const loademployeeExit = async () => {
    const result = await axios.get(
      `http://13.126.190.50:8082/employee_exit/get/${id}`
    );
    setemployeeExit(result.data);
	console.log(employeeExit);
  };


  const handleInputChange = (e) => {
    setemployeeExit({
      ...employeeExit,
      [e.target.name]: e.target.value,
    });
  };
  const updateemployeeExit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://13.126.190.50:8082/employee_exit/update/${id}`,
      employeeExit
    );
    navigate("/hr/employee/employee-exit");
  };
  const [menu, setMenu] = useState(false);

  return (
    <div>
     <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="col-sm-8 py-2 px-5 shadow">
          <h2 className="mt-5"> Edit employeeExit</h2>
          <form onSubmit={(e) => updateemployeeExit(e)}>
            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="employeeExitName">
                EmployeeExit Name
              </label>
              <input
                className="form-control col-sm-6"
                type="text"
                name="employeeToExit"
                id="employeeToExit"
                value={employeeToExit}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="employeeExitType">
                employeeExit Type
              </label>
              <input
                className="form-control col-sm-6"
                type="text"
                name="typeOfExit"
                id="typeOfExit"
                value={typeOfExit}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="email">
                Your Email
              </label>
              <input
                className="form-control col-sm-6"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="website">
                Website
              </label>
              <input
                className="form-control col-sm-6"
                type="date"
                name="exitDate"
                id="exitDate"
                value={exitDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="data-buttons">
                <Button id="input-btn-submit" variant="outlined" type="submit">
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/hr/employee/employeeexit")}
                >
                  Back
                </Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  
  );
};

export default EditEmployeeExit;
