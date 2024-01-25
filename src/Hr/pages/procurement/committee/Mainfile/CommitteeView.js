import React, { useEffect } from "react";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import StateCommittee from "../StateCommittee";
import CommitteeTable from "../CommitteeTable";
import * as api from "../CommitteeApi"
import Committeeform from "../CommiteeForm";

const CommitteeView = () => {
  const {
   formData,setFormData,
    committee,
    setCommittee,
    open,
    setOpen,
    recDelete,
    setRecDelete,
    
  } = StateCommittee();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadCommittee();
  }, []);

  const loadCommittee = async () => {
    const response = await api.loadCommittee()
      setCommittee(response);
  };


  const handleDelete = async () => {
    await api.deleteCommittee(recDelete)
    loadCommittee()
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
                ADD COMMITTEE
              </Button>
            </div>
          </div>
          <CommitteeTable committee={committee} setRecDelete={setRecDelete}/>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">
                Add Committee
              </DialogTitle>
              <DialogContent>
               <Committeeform formData={formData} setFormData={setFormData} setOpen={setOpen}/>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

export default CommitteeView;
