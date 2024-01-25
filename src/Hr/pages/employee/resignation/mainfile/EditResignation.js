import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditResignation = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [resignation, setResignation] = useState({
    employeeName: "",
    noticeDate: "",
    resignationDate: "",
  });

  useEffect(() => {
    loadResignation();
  }, []);

  const loadResignation = async () => {
    const result = await axios.get(
      `http://13.126.190.50:5000/resignations/get/${id}`
    );
    setResignation(result.data);
  };

  const handleInputChange = (e) => {
    setResignation({
      ...resignation,
      [e.target.name]: e.target.value,
    });
  };
  const updateResignation = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://13.126.190.50:5000/resignations/update/${id}`,
      resignation
    );
    navigate("/hr/employee/resignation");
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
		  
    <div className="col-sm-8 py-2 px-5  shadow">
      <h2 className="mt-5"> Edit Resignation</h2>
      <form onSubmit={(e) => updateResignation(e)}>
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
            value={resignation.employeeName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="noticeDate">
            Notice Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="noticeDate"
            id="noticeDate"
            required
            value={resignation.noticeDate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="resignationDate">
            Resignation Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="resignationDate"
            id="resignationDate"
            required
            value={resignation.resignationDate}
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
                  onClick={() => navigate("/hr/employee/resignation")}
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

export default EditResignation;
