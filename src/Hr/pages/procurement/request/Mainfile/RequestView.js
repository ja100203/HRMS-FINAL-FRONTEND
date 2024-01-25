import React, { useEffect } from 'react'
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
import * as RequestApi from "../RequestApi";
import RequestState from "../RequestState";
import RequestForm from "../RequestForm";
import RequestTable from "../RequestTable";

const RequestView = () => {

    const {
        genId,setGenId,file,toggle, setToggle,setFile,request,setRequest,formVisible, setFormVisible, fileError,totalAmount, setTotalAmount, setFileError,dateError,setDateError,setCredit,open,setOpen,recDelete,setRecDelete, formData,setFormData
      } = RequestState();
    
      const handleButtonClick = () => {
        setFormVisible((prev) => !prev);
      };

      useEffect(() => {
        handleDelete();
        loadRequest();
      }, []);
    
      const loadRequest = async () => {
        const result = await RequestApi.loadRequest()
        console.log("rec", result);
        setRequest(result);
      }
    
      const handleDelete = async () => {
        await RequestApi.deleteRequest(recDelete)
        loadRequest();
      };
    
      console.log(formData)
      useEffect(() => {
         loadRequest();
      }, []);
      
  return (
    <div><div>
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
                       ADD REQUEST
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
                 Add Request
                   </h3>
                   <DialogContent>
                     <Card style={{ margin: "20px" }}>
                       <CardContent>
                        <RequestForm formData={formData}
                       setFormData={setFormData}
                       setFormVisible={setFormVisible}
                       setToggle={setToggle} /> 
                       </CardContent>
                     </Card>
                    
                   </DialogContent>
                 </div>
               </Card>
             </Collapse>
             <RequestTable request={request} setRecDelete={setRecDelete}/>
             <div></div>
           </section>
         </div>
       </div>
     </div></div>
  )
}

export default RequestView


