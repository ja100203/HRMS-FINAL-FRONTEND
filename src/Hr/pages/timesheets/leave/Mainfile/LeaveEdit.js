import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import { useNavigate, useParams } from "react-router-dom";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditLeave = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [leave, setLeave] = useState({
    approval: "",
  });

  useEffect(() => {
    loadLeave();
  });

  const loadLeave = async () => {
    const result = await axios.get(
      `http://13.126.190.50:8084/leaves/get/${id}`
    );
    setLeave(result.data);
  };

  const handleInputChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });
  };
  const updateLeave = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:8084/leaves/update/${id}`, leave);
    navigate("/hr/timesheets/leaves");
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
        <div className="head-foot-part">
          <div className="col-sm-8 py-2 px-5 shadow">
            <h2 className="mt-5"> Edit Leave</h2>
            <form onSubmit={(e) => updateLeave(e)}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="departmentName">
                  Approval
                </label>
                <select
                  className="form-control col-sm-6"
                  name="approval"
                  id="approval"
                  required
                  value={leave.approval}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="data-buttons">
                <Button id="input-btn-submit" variant="outlined" type="submit">
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/hr/timesheets/leaves")}
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

export default EditLeave;
