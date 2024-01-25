import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { MdAdd } from "react-icons/md";
import DialogTitle from "@mui/material/DialogTitle";

import * as api from "../api";
import StateEmployeeExit from "../StateEmployeeExit";
import EmployeeExitTable from "../EmployeeExitTable";
import EmployeeExitForm from "../EmployeeExitForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EmployeeExitView = () => {
  const {
    employeeExit,
    setEmployeeExit,
    open,
    setOpen,
    recDelete,
    setRecDelete,
    formData,
    setFormData,
  } = StateEmployeeExit();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadEmployeeExit();
  }, []);

  const loadEmployeeExit = async () => {
    const result = await api.loadEmployeeExit();
    setEmployeeExit(result);
  };

  const handleDelete = async () => {
    await api.deleteEmployeeExit(recDelete);
    loadEmployeeExit();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

  console.log(employeeExit);
  console.log(formData);
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
              <Button variant="outlined" onClick={handleOpen} id="add-btn">
                <MdAdd className="add" />
                Add Employee exit
              </Button>
              </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
              <h3 className="form-header">Add Employee Exit</h3>
              <DialogContent>
                <EmployeeExitForm
                  formData={formData}
                  setFormData={setFormData}
                  setOpen={setOpen}
                />
              </DialogContent>
            </Dialog>
            <EmployeeExitTable
              employeeExit={employeeExit}
              setRecDelete={setRecDelete}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExitView;
