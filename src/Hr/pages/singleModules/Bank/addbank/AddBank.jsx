import React, { useEffect,useState} from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import BankState from "../BankState";
import BankTable from "../BankTable";
import BankForm from "../BankForm";
import * as bankapi from "../bankapi";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const AddBankView = () => {
  const {
    formData,
    setFormData,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    addbank,
    setAddBank,
    open,
    setOpen,
    bankNameError,
    setBankNameError,
    accountNameError,
    setAccountNameError,
    setAccountNumberError,
    branchNameError,
    setBranchNameError,
    recDelete,
    setRecDelete,
  } = BankState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadAddbank();
  }, []);

  const loadAddbank = async () => {
    const result = await bankapi.loadAddbank();
    console.log("rec", result);
    setAddBank(result);
  };

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const handleDelete = async () => {
    await bankapi.deleteBank(recDelete);
    loadAddbank();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });
  console.log(bankNameError);
  const [menu, setMenu] = useState(false);

  return (
    <div>
  <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div
          className="head-foot-part"
          // style={{ padding: "0", marginTop: "10px" }}
        >
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
                      ADD BANK
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3 className="form-header">ADD BANK FORM</h3>
                  <DialogContent>
                    <BankForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <BankTable addbank={addbank} setRecDelete={setRecDelete} />
            <br />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddBankView;
