import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";



import * as api from "../api"
import StateTransfer from '../StateTransfer';

import TransferTable from "../TransferTable";
import TransferForm from "../TransferForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const TransferView = () => {

  const {formData,setFormData, formVisible,formErrors,setFormerrors,setFormVisible,toggle,setToggle,open,setOpen,employee,transfer, setTransfer, formControl,setFormControl,setEmployee,recDelete,setRecDelete
} = StateTransfer()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadTransfer();
  }, []);

  const loadTransfer = async () => {
    const result = await api.loadTransfer()
    console.log("rec", result);
    setTransfer(result);
  };



  const handleDelete = async () => {
    await api.deleteTransfer(recDelete)
    loadTransfer();
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
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  id="add-btn"
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide
                      />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD TRANSFER
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card
                variant="outlined"
                
              >
                <div style={{ marginTop: "20px" }}>
                  <h3
                     className="form-header"
                  >
                    <h3> TRANSFER FORM</h3>
                  </h3>
                  <DialogContent>
                   
                    <TransferForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <TransferTable transfer={transfer} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TransferView;

