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


import AccountBalanceForm from "../AccountBalanceForm";
import AccountBalanceTable from "../AccountBalanceTable";

import * as AccountBalanceApi from "../AccountBalanceApi";
import StateAccountBalance from "../StateAccountBalance";


const AccountBalanceView = () => {
  const {
   setAccountBalance,accountBalance,toggle, setToggle,setFormVisible,formVisible,formData,setFormData,recDelete,setRecDelete
  } = StateAccountBalance();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  

 
  
  useEffect(() => {
    handleDelete();
    loadAccountBalance();
  }, []);

  const loadAccountBalance = async () => {
    const result = await AccountBalanceApi.loadAccountBalance()
    console.log("rec", result);
    setAccountBalance(result);
  }

  const handleDelete = async () => {
   
    await AccountBalanceApi.deleteAccountBalance(recDelete)
    loadAccountBalance();
  };

  console.log(accountBalance)
  console.log(formData)
  
 


 

  

  


  useEffect(() => {
    loadAccountBalance();
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
                      ADD Account Balance
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
                   Account Balance
                  </h3>
                  <DialogContent>
                    <Card style={{ margin: "20px" }}>
                      <CardContent>
                       <AccountBalanceForm  formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle} />
                        
                        
                      </CardContent>
                     
                    </Card>
                   
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <AccountBalanceTable accountBalance={accountBalance} setRecDelete={setRecDelete}/>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountBalanceView;
