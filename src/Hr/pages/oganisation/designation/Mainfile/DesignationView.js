import React, { useEffect,useState} from "react";
import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { MdAdd } from "react-icons/md";


import StateDesignation from "../StateDesignation";
import * as api from "../DesignationApi"
import DesignationTable from "../DesignationTable";
import Designationform from "../Designationform";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const DesignationView = () => {
 
  const {designation,setDesignation,open,setOpen,recDelete,setRecDelete, formData, setFormData} = StateDesignation()

  


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  useEffect(() => {
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    const result = await api.loadDesignation()
    setDesignation(result);
  };

 

  console.log(designation)

  const handleDelete = async () => {
    await api.deleteDesignation(recDelete)
    loadDesignation();
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
                  // handleButtonClick();
                  handleOpen();
                }}
                id='add-btn'
              >
                <div className="add">
                  <MdAdd />
                  ADD DESIGNATION
                </div>
              </Button>
            </div>
          </div>
         <DesignationTable designation={designation} setRecDelete={setRecDelete}/>

          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">
                Add Designation
              </DialogTitle>
              <DialogContent>
                <Designationform formData={formData} setFormData={setFormData} setOpen={setOpen}/>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

export default DesignationView;
