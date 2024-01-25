import React, { useEffect } from "react";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import { MdAdd } from "react-icons/md";

import StateSubType from "../StateSubType";
import SubTypeTable from "../SubTypeTable";
import * as api from "../api"
import SubTypeForm from "../SubTypeForm";

const SubTypeView = () => {
  const {
    subType, setSubType, open, setOpen,recDelete, setRecDelete, formData, setFormData
  } = StateSubType();

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadSubType();
  }, []);

  const loadSubType = async () => {
    const response = await api.loadSubType()
      setSubType(response);
  };


  const handleDelete = async () => {
    await api.deleteSubType(recDelete)
    loadSubType()
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  return (
    <div>
    <div id="header-container" className="header-container">
 <CompanyLogoFile />
   <Header />
   </div>
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part">
          <section>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  id="add-btn"
                >
                  <MdAdd/>
                  ADD SUBTYPE
                </Button>
              </div>
            </div>
            <SubTypeTable subType={subType} setRecDelete={setRecDelete}/>
            <div>
              <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">
                  SUBTYPE FORM
                  </DialogTitle>
                <DialogContent>
                 <SubTypeForm formData={formData} setFormData={setFormData} setOpen={setOpen}/>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SubTypeView;
