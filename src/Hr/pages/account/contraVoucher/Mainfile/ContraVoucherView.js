import React, { useEffect } from "react";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import ContraVoucherForm from "../ContraVoucherForm";
import ContraVoucherTable from "../ContraVoucherTable";

import * as ContraVoucherApi from "../ContraVoucherApi";
import StateContraVoucher from "../StateContraVoucher";


const ContraVoucherView = ( ) => {
  const {
   setContraVoucher,contraVoucher,toggle,recDelete,setRecDelete,setToggle,setFormVisible,formVisible,formData,setFormData,
  } = StateContraVoucher();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  

 
  
  useEffect(() => {
    handleDelete();
    loadContraVoucher();
  }, []);

  const loadContraVoucher = async () => {
    const result = await ContraVoucherApi.loadContraVoucher()
    console.log("rec", result);
    setContraVoucher(result);
  }

  const handleDelete = async () => {
   
    await ContraVoucherApi.deleteContraVoucher(recDelete)
    loadContraVoucher();
  };

  console.log(contraVoucher)
  console.log(formData)
  
  useEffect(() => {
    loadContraVoucher();
  }, []);

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
                      ADD CONTRAVOUCHER
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
                    Contra Voucher
                  </h3>
                  <DialogContent>
                    <Card style={{ margin: "20px" }}>
                      <CardContent>
                       <ContraVoucherForm formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle} />
                        
                        
                      </CardContent>
                     
                    </Card>
                   
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <ContraVoucherTable contraVoucher={contraVoucher} setRecDelete={setRecDelete}/>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContraVoucherView;
