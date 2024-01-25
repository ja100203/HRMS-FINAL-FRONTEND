import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd, MdApi } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";


import * as loanapi from "../loanapi"; 
import GrantLoanState from "../GrantLoanState";
import GrantLoanTable from "../GrantLoanTable";
import GrantLoanForm from "../GrantLoanForm";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";


const GrantLoanView = () => {
  const {
    formData, setFormData ,recDelete, setRecDelete,formVisible, setFormVisible,toggle, setToggle,loan, setLoan,permittedByError, setPermittedByError,loanDetailsByError, setLoanDetailsByError,pay,setPay,emiPay, setEmiPay,emiClear, setEmiClear 
} = GrantLoanState();


  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
  }, []);

 
  const loadLoan= async () => {
    const result = await loanapi.loadLoan()
    console.log("rec", result);
    setLoan(result);
  };

  const handleDelete = async () => {
    await loanapi.deleteLoan(recDelete)
    loadLoan();
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
        <div className="head-foot-part" >
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
            id="add-btn"          >
            {toggle ? (
              <div>
                <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                HIDE
              </div>
            ) : (
              <div>
                <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                ADD LOAN
              </div>
            )}
          </Button>
        </div>
      </div>
      <Collapse in={formVisible}>
        <Card variant="outlined" >
          <div style={{ marginTop: "20px" }}>
            <h3
                                  className="form-header"

            >
              GRANT LOAN FORM
            </h3>
            <DialogContent>
            <GrantLoanForm formData={formData} setFormData={setFormData}/>
            </DialogContent>
          </div>
        </Card>
      </Collapse>
      <br />

      <GrantLoanTable loan={loan} setRecDelete={setRecDelete}/>
      
    </section>
        </div>
      </div>
    </div>
    
  );
};

export default GrantLoanView;
