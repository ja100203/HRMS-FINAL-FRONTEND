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

import BalanceForm from "../BalanceForm";
import BalanceTable from "../BalanceTable";

import * as BalanceApi from "../BalanceApi";
import StateBalance from "../StateBalance";


const BalanceView = () => {


  const {
    Balance,genId,setGenId,file,toggle, setToggle,setFile,formVisible, setFormVisible,fileError,totalAmount, setTotalAmount, setFileError,dateError,setDateError,setBalance,open,setOpen,formData,setFormData,recDelete,setRecDelete
  } = StateBalance();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  

 
  
  useEffect(() => {
    handleDelete();
    loadBalance();
  }, []);

  const loadBalance = async () => {
    const result = await BalanceApi.loadBalance()
    console.log("rec", result);
    setBalance(result);
  }

  const handleDelete = async () => {
   
    await BalanceApi.deleteBalance(recDelete)
    loadBalance();
  };

  console.log(Balance)
  console.log(formData)
  
 


 

  

  


  useEffect(() => {
    loadBalance();
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
                 id='add-btn'
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD Balance
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
                    Add Balance
                  </h3>
                  <DialogContent>
                    <Card style={{ margin: "20px"}}>
                      <CardContent>
                       <BalanceForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                        
                        
                      </CardContent>
                     
                    </Card>
                   
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <BalanceTable Balance={Balance} setRecDelete={setRecDelete}/>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BalanceView;
