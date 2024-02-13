import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import * as api from "../api";
import StateAdvanceSalary from "../StateAdvanceSalary";
import AdvanceSalaryTable from "../AdvanceSalaryTable";
import AdvanceSalaryForm from "../AdvanceSalaryForm";

const AdvanceSalaryView = () => {
  const {
    advanceSalary,
    recDelete,
    setDueSalary,
    setRecDelete,
    setAdvanceSalary,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
  } = StateAdvanceSalary();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    createdDate: " ",
    employeeName: " ",
    salary: " ",
    advanceAmount: " ",
    salaryDue: " ",
    monthAndYear: " ",
  });

  const CalculateDueSalary = () => {
    let Duesalary =
      parseInt(formData.salary) - parseInt(formData.advanceAmount);
    setDueSalary(Duesalary);
  };

  const handleDelete = async () => {
    await api.deleteAdvanceSalary(recDelete);
    loadAdvanceSalary();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    CalculateDueSalary();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

  useEffect(() => {
    loadAdvanceSalary();
  }, []);

  useEffect(() => {
    CalculateDueSalary();
  });

  const loadAdvanceSalary = async () => {
    const result = await api.loadAdvanceSalary();
    console.log("rec", result);
    setAdvanceSalary(result);
    loadAdvanceSalary();
  };

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
                      ADD ADVANCE SALARY
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3 className="form-header">Add Advance Salary</h3>
                  <DialogContent>
                    <AdvanceSalaryForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />

            <AdvanceSalaryTable
              advanceSalary={advanceSalary}
              setRecDelete={setRecDelete}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSalaryView;
