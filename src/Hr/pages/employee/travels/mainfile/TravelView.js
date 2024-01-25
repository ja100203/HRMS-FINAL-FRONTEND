import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import * as api from "../api"
import StateTravel from '../StateTravel';

import TravelTable from "../TravelTable";
import TravelForm  from "../TravelForm"; 

const TravelView = () => {

  const {formData,setFormData,travel, setTravel, formVisible,setFormVisible,toggle,setToggle,purposeOfVisit,setPurposeOfVisit,placeOfVisit,setPlaceOfVisit,purposeError, setPurposeError,placeError, setPlaceError,error, open,setOpen,setError,recDelete,setRecDelete,dateError,setDateError

} = StateTravel()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


 

  useEffect(() => {
    loadTravel();
  }, []);

  const loadTravel = async () => {
    const result = await api.loadTravel()
    console.log("rec", result);
    setTravel(result);
  };



  const handleDelete = async () => {
    await api.deleteTravel(recDelete)
    loadTravel();
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
                      ADD TRAVEL
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
                    <h3> TRAVEL FORM</h3>
                  </h3>
                  <DialogContent>
                    <TravelForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <TravelTable travel={travel} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TravelView;


