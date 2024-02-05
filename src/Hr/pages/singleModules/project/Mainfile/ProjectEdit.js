import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import Button from "@mui/material/Button";

const EditProject = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [project, setProject] = useState({
    projectTitle: "",
    clientName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    projectManagers: "",
    priority: "",
    description: "",
    summary: "",
  });

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    const result = await axios.get(`http://13.126.190.50:8086/projects/get/${id}`);
    setProject(result.data);
  };

  const handleInputChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const updateProject = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:8086/projects/update/${id}`, project);
    navigate("/hr/project");
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
            <h2 className="mt-5"> Edit Project</h2>
            <form onSubmit={(e) => updateProject(e)}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="Budget">
                  Budget
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="budget"
                  id="budget"
                  required
                  value={project.budget}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="clientName">
                  Client Name
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="clientName"
                  id="clientName"
                  required
                  value={project.clientName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>


              <div className="input-group mb-5">
                <label className="input-group-text">Start Date</label>
                <input
                  className="form-control col-sm-6"
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  value={project.startDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="input-group mb-5">
                <label className="input-group-text">End Date</label>
                <input
                  className="form-control col-sm-6"
                  type="date"
                  name="endDate"
                  id="endDate"
                  required
                  value={project.endDate}
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
                  onClick={() => navigate("/hr/project")}
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

export default EditProject;
