import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import Button from "@mui/material/Button";


const EditDesignation = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [designation, setDesignation] = useState({
    designationName: "",
  });

  const { designationName } = designation;

  useEffect(() => {
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    const result = await axios.get(
      `http://13.126.190.50:8081/designation/get/${id}`
    );
    setDesignation(result.data);
  };

  const handleInputChange = (e) => {
    setDesignation({
      ...designation,
      [e.target.name]: e.target.value,
    });
  };

  const updateDesignation = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://13.126.190.50:8081/designation/update/${id}`,
      designation
    );
    navigate("/hr/organisation/designation");
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
            <h2 className="mt-5">Edit Designation</h2>
            <form onSubmit={(e) => updateDesignation(e)}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="designationName">
                  Designation Name
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="designationName"
                  id="designationName"
                  required
                  value={designationName}
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
                  onClick={() => navigate("/hr/organisation/designation")}
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

export default EditDesignation;
