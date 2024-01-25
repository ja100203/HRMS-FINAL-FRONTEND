import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import Button from "@mui/material/Button";

const EditTermination = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [termination, setTermination] = useState({
    employeeName: "",
    terminateDate: "",
    reasonForTermination: "",
    terminatedBy: "",
  });
  const { employeeName, terminateDate, reasonForTermination, terminatedBy } =
    termination;

  useEffect(() => {
    loadTermination();
  }, []);

  const loadTermination = async () => {
    const result = await axios.get(
      `http://13.126.190.50:5000/terminations/get/${id}`
    );
    setTermination(result.data);
  };

  const handleInputChange = (e) => {
    setTermination({
      ...termination,
      [e.target.name]: e.target.value,
    });
  };
  const updateTermination = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://13.126.190.50:5000/terminations/update/${id}`,
      termination
    );
    navigate("/hr/employee/termination");
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
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
          <h2 className="mt-5"> Edit Termination</h2>
          <form onSubmit={(e) => updateTermination(e)}>
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
              <label className="input-group-text" htmlFor="terminationType">
                Terminate Date
              </label>
              <input
                className="form-control col-sm-6"
                type="date"
                name="terminateDate"
                id="terminateDate"
                required
                value={terminateDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="input-group mb-5">
              <label
                className="input-group-text"
                htmlFor="reasonForTermination"
              >
                Reason For Termination
              </label>
              <input
                className="form-control col-sm-6"
                type="text"
                name="reasonForTermination"
                id="reasonForTermination"
                required
                value={reasonForTermination}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="terminatedBy">
                Terminated By
              </label>
              <input
                className="form-control col-sm-6"
                type="text"
                name="terminatedBy"
                id="terminatedBy"
                required
                value={terminatedBy}
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
                  onClick={() => navigate("/hr/employee/termination")}
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

export default EditTermination;
