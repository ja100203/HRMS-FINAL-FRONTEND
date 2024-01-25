import React, { useEffect, useState } from "react";

//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { MdAdd } from "react-icons/md";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

import * as api from "../api";
import StateOfficeShift from "../StateOfficeShift";
import OfficeShiftTable from "../OfficeShiftTable";
import OfficeShiftForm from "../OfficeShiftForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const OfficeShiftView = () => {
  const {
    setRecDelete,
    recDelete,
    officeShift,
    setOfficeShift,
    open,
    setOpen,
    formData,
    setFormData,
  } = StateOfficeShift();

  const handleOpen = () => {
    officeShift.length > 0
      ? alert("Time already exist, please update in below table")
      : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadOfficeShift();
  }, []);

  const loadOfficeShift = async () => {
    const result = await api.loadOfficeShift();
    setOfficeShift(result);
    console.log(result);
  };

  const handleDelete = async () => {
    await api.deleteOfficeShift(recDelete);
    loadOfficeShift();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

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
                  <MdAdd />
                  Add Office Shift
                </Button>
              </div>
            </div>
            <OfficeShiftTable
              officeShift={officeShift}
              setRecDelete={setRecDelete}
            />
            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-header-popup">Office Shift</DialogTitle>
                <DialogContent>
                  <OfficeShiftForm
                    formData={formData}
                    setFormData={setFormData}
                    setOpen={setOpen}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OfficeShiftView;
