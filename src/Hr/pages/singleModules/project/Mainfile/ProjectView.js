import React, { useEffect,useState } from "react";


import Button from "@mui/material/Button";

import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import { Card } from "@mui/material";

import * as api from "../api"
import StateProject from "../StateProject";
import ProjectTable from "../ProjectTable";
import ProjectForm from "../ProjectForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const ProjectView = () => {

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  }; 

  useEffect(() => {
    loadProject();
  }, []);
 
  const {
    project,formVisible,toggle,setToggle,setRecDelete,setProject,recDelete,setFormVisible,formData,setFormData

 } = StateProject();

  const loadProject = async () => {
    const result = await api.loadProject()
    console.log("rec", result);
    setProject(result);
  };

  const handleDelete = async () => {
    await api.deleteProject(recDelete)
    loadProject();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })
  const [menu, setMenu] = useState(false);


  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="head-foot-part" >

          <section>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >

              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  id="add-btn"                 >
                  {toggle ? (
                    <div companyName="hide">
                      <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                      ADD PROJECT
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3
                  className="form-header"
                  >
                    PROJECT FORM
                  </h3>
                  <DialogContent>
                    <ProjectForm   formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />
            <ProjectTable project={project} setRecDelete={setRecDelete}/>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;