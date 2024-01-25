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
import DebitForm from "../DebitForm";
import DebitTable from "../DebitTable";

import * as DebitApi from "../DebitApi";
import StateDebit from "../StateDebit";


const DebitView =() => {


  const {
    debit,genId,setGenId,file,toggle, setToggle,setFile,formVisible, setFormVisible,fileError,totalAmount, setTotalAmount, setFileError,dateError,setDateError,setDebit,open,setOpen,formData,setFormData,recDelete,setRecDelete
  } = StateDebit();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  

 
  
  useEffect(() => {
    handleDelete();
    loadDebit();
  }, []);

  const loadDebit = async () => {
    const result = await DebitApi.loadDebit()
    console.log("rec", result);
    setDebit(result);
  }

  const handleDelete = async () => {
   
    await DebitApi.deleteDebit(recDelete)
    loadDebit();
  };

  console.log(formData)
  
 


 

  

  


  useEffect(() => {
    loadDebit();
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
                  id='add-btn'                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD DEBIT
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
                    DEBIT
                  </h3>
                  <DialogContent>
                    <Card >
                      <CardContent>
                       <DebitForm   formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}/>
                        
                        
                      </CardContent>
                     
                    </Card>
                   
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <DebitTable debit={debit} setRecDelete={setRecDelete}/>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DebitView;
