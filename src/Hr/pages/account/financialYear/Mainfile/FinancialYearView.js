import React, { useEffect } from "react";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import DialogContent from "@mui/material/DialogContent";

import { MdAdd } from "react-icons/md";

import StateFinancialYear from "../StateFinancialYear";
import FinancialYearTable from "../FinancialYearTable";
import * as api from "../api"
import FinancialYearForm from "../FinancialYearForm";

const FinancialYearView = () => {
  const {
   
    financialYearSection,
    setFinancialYearSection,
    open,
    setOpen,
    recDelete,
    setRecDelete,
    formData,
    setFormData,
    
  } = StateFinancialYear();

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadFinancialYear();
  }, []);

  const loadFinancialYear = async () => {
    const response = await api.loadFinancialYear()
      setFinancialYearSection(response);
  };


  const handleDelete = async () => {
    await api.deleteFinancialYear(recDelete)
    loadFinancialYear()
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
                  id='add-btn'
                >
                  <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                  ADD FINANCIAL YEAR
                </Button>
              </div>
            </div>
            <FinancialYearTable financialYearSection={financialYearSection} setRecDelete={setRecDelete}/>
            <div>
              <Dialog open={open} onClose={handleClose}>
                <h3 className="form-header">
                  Add Financial Year
                </h3>
                <DialogContent>
                 <FinancialYearForm formData={formData}
                      setFormData={setFormData} setOpen={setOpen}/>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FinancialYearView;
