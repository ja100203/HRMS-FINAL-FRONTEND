import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import * as api from "../api";
import StateVendor from "../StateVendor";
import VendorTable from "../VendorTable";
import VendorForm from "../VendorForm";
import CircularProgress from "@mui/material-next/CircularProgress";

const VendorView = () => {
  const {
    formData,
    setFormData,
    setFormVisible,
    recDelete,
    setRecDelete,
    setToggle,
    toggle,
    formVisible,
    vendor,
    setVendor,
  } = StateVendor();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const loadVendor = async () => {
    const result = await api.loadVendor();
    console.log("rec", result);
    setVendor(result);
  };

  useEffect(() => {
    loadVendor();
  }, []);

  const handleDelete = async () => {
    console.log(recDelete);
    await api.deleteVendor(recDelete);
    loadVendor();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

  console.log("comp", vendor);
  console.log(formData);

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
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  id="add-btn"
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD VENDOR
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3 className="form-header">Add Vendor</h3>
                  <DialogContent>
                    <VendorForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <VendorTable vendor={vendor} setRecDelete={setRecDelete} />
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VendorView;
