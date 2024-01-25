import React, { useEffect } from "react";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import { MdAdd } from "react-icons/md";
import * as api from "../UnitApi"
import StateUnit from "../StateUnit";
import UnitForm from "../UnitForm";

import UnitTable from "../UnitTable";





const UnitView = () => {
  const {
   formData,setFormData,
   unit,
    setUnit,
    open,
    setOpen,
    recDelete,
    setRecDelete,
    
  } = StateUnit();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadUnit();
  }, []);

  const loadUnit = async () => {
    const response = await api.loadUnit()
      setUnit(response);
  };


  const handleDelete = async () => {
    await api.deleteUnit(recDelete)
    loadUnit()
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  console.log(formData)

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
                ADD UNIT
              </Button>
            </div>
          </div>
          <UnitTable unit={unit} setRecDelete={setRecDelete}/>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">
                Add Unit
              </DialogTitle>
              <DialogContent>
               <UnitForm formData={formData} setFormData={setFormData} setOpen={setOpen}/>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

export default UnitView;
