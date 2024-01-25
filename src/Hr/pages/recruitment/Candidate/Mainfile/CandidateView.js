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
import StateCandidate from "../StateCandidate";
import CandidateTable from "../CandidateTable";
import CandidateForm from "../CandidateForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";


const CandidateView = () => {
 
  const {
    candidate,setCandidate,formVisible,setFormVisible,toggle,setToggle,recDelete,setRecDelete,dateError,setDateError,open,setOpen,search,setSearch,formControl,setFormControl,formErrors,setFormerrors,formData,setFormData
  } =StateCandidate();
 

 const handleButtonClick = () => {
  setFormVisible((prev) => !prev);
};


useEffect(() => {
  loadCandidate();
}, []);

const loadCandidate = async () => {
  const result = await api.loadCandidate()
  setCandidate(result);
};



const handleDelete = async () => {
  await api.deleteCandidate(recDelete)
  loadCandidate();
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
                    <BiSolidHide
                    />
                    HIDE
                  </div>
                ) : (
                  <div className="add">
                    <MdAdd />
                    ADD CANDIDATE
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
                  style={{
                    textAlign: "center",
                    marginTop: "25px",
                    fontWeight: "600",
                  }}
                >
                  <h3> CANDIDATE FORM</h3>
                </h3>
                <DialogContent>
                
                  <CandidateForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                </DialogContent>
              </div>
            </Card>
          </Collapse>
          <CandidateTable candidate={candidate} setRecDelete={setRecDelete} />
        </section>
      </div>
    </div>
  </div>
);
}; 
export default CandidateView;
