import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
const Editemployee = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [employee, setemployee] = useState({
    employeeName: "",
    employeeType: "",
    email: "",
    website: "",
  });
  const { employeeName, employeeType, email, website } = employee;

  useEffect(() => {
    loademployee();
  }, []);
  const [menu, setMenu] = useState(false);
  const loademployee = async () => {
    const result = await axios.get(
      `http://13.126.190.50:5000/employee/get/${id}`
    );
    setemployee(result.data);
  };

  const handleInputChange = (e) => {
    setemployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };
  const updateemployee = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://13.126.190.50:5000/employee/update/${id}`,
      employee
    );
    navigate("hr/employee/view-employee");
  };

  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="head-foot-part" style={{ padding: "0" }}>
          <div className="col-sm-8 py-2 px-5 shadow">
            <h2 className="mt-5"> Edit employee</h2>
            <form onSubmit={(e) => updateemployee(e)}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="employeeName">
                  employee Name
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="employeeName"
                  id="employeeName"
                  required
                  value={employeeName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="employeeType">
                  employee Type
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="employeeType"
                  id="employeeType"
                  required
                  value={employeeType}
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
                  required
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
                  type="text"
                  name="website"
                  id="website"
                  required
                  value={website}
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
                  onClick={() => navigate("hr/employee/view-employee")}
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editemployee;
