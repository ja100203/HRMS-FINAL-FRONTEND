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

import * as api from "../api";
import StatePayslipGenerator from "../StatePayslipGenerator";
import PayslipGeneratorForm from "../PayslipGeneratorForm";

const PayslipGeneratorView = () => {

  const {
    formData,
    setFormData,
    recDelete,
    setRecDelete,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    salary,
    setSalary,
    grossSal,
    setGrossSal,
  } = StatePayslipGenerator();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadPayslipGenerator();
  }, []);

  const loadPayslipGenerator = async () => {
    const result = await api.loadPayslipGenerator();
    setSalary(result);
  };

  const handleDelete = async () => {
    await api.deletePayslipGenerator(recDelete);
    loadPayslipGenerator();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

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
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD PAYSLIP
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h3 className="form-header">Payslip Generator</h3>
                  </div>
                  <DialogContent>
                    <PayslipGeneratorForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                      grossSal={grossSal}
                      setGrossSal={setGrossSal}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            {/* <PayslipGeneratorTable salary={salary} setRecDelete={setRecDelete} /> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PayslipGeneratorView;
