import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import Button from "@mui/material/Button";

const EditTransfer = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [transfer, setTransfer] = useState({
    employeeName: "",
    departmentName: "",
    locationName: "",
  });

  const { employeeName, departmentName, locationName } =
    transfer;

  useEffect(() => {
    loadTransfer();
  }, []);

  const loadTransfer = async () => {
    const result = await axios.get(`http://13.126.190.50:8082/transfers/get/${id}`);
    setTransfer(result.data);
  };

  const handleInputChange = (e) => {
    setTransfer({
      ...transfer,
      [e.target.name]: e.target.value,
    });
  };
  const updateTransfer = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:8082/transfers/update/${id}`, transfer);
    navigate("/hr/employee/transfer");
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
        <div className="head-foot-part" style={{ padding: "0" }}>
          <div className="col-sm-8 py-2 px-5 shadow">
            <h2 className="mt-5"> Edit Transfer</h2>
            <form onSubmit={(e) => updateTransfer(e)}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="employeeName">
                  Employee Name
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
                <label
                  className="input-group-text"
                  htmlFor="transferToDepartment"
                >
                  Transfer To Department
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="departmentName"
                  id="departmentName"
                  required
                  value={departmentName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label
                  className="input-group-text"
                  htmlFor="transferToLocation"
                >
                  Transfer To Location
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="locationName"
                  id="locationName"
                  required
                  value={locationName}
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
                  onClick={() => navigate("/hr/employee/transfer")}
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

export default EditTransfer;
