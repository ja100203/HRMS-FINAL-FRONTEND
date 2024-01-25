import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";


import * as api from "../api"
import ResignationForm from "../ResignationForm";
import ResignationTable from "../ResignationTable";
import StateResignation from "../StateResignation";

const ResignationView = () => {

  const {formData,setFormData, formVisible,formErrors,setFormerrors,open, setOpen,setFormVisible,toggle,setToggle,resignation, setResignation,recDelete,setRecDelete

} = StateResignation()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadResignation();
  }, []);

  const  loadResignation = async () => {
    const result = await api.loadResignation()
    console.log("rec", result);
    setResignation(result);
  };



  const handleDelete = async () => {
    await api.deleteResignation(recDelete)
    loadResignation();
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
        <div className="head-foot-part">
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
                  id="add-btn"
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide
                      />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD RESIGNATION
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card
                variant="outlined"
                
              >
                <div style={{ marginTop: "20px" }}>
                  <h3
                    className="form-header"
                  >
                    <h3> RESIGNATION FORM</h3>
                  </h3>
                  <DialogContent>
                     <ResignationForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <ResignationTable resignation={resignation} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResignationView;



