import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditTravel = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [travel, settravel] = useState({
    employeeName: "",
    startDate: "",
    endDate: "",
    placeOfVisit: "",
  });

  useEffect(() => {
    loadtravel();
  }, []);

  const loadtravel = async () => {
    const result = await axios.get(
      `http://13.126.190.50:5000/travels/get/${id}`
    );
    settravel(result.data);
  };

  const handleInputChange = (e) => {
    settravel({
      ...travel,
      [e.target.name]: e.target.value,
    });
  };
  const updatetravel = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:5000/travels/update/${id}`, travel);
    navigate("/hr/employee/travel");
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
            <h2 className="mt-5"> Edit travel</h2>
            <form onSubmit={(e) => updatetravel(e)}>
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
                  value={travel.employeeName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  className="form-control col-sm-6"
                  type="data"
                  name="startDate"
                  id="startDate"
                  required
                  value={travel.startDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="endDate">
                  End Date
                </label>
                <input
                  className="form-control col-sm-6"
                  type="endDate"
                  name="endDate"
                  id="endDate"
                  required
                  value={travel.endDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="placeOfVisit">
                  Place Of Visit
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="placeOfVisit"
                  id="placeOfVisit"
                  required
                  value={travel.placeOfVisit}
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
                  onClick={() => navigate("/hr/employee/travel")}
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

export default EditTravel;
