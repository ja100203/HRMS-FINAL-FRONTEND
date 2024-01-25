import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import * as api from "../api"
import StateTalent from "../StateTalent";
import TalentTable from "../TalentTable";
import TalentForm from "../TalentForm";

const TalentView = () => {

  const {formData, setFormData, talent, setTalent, formVisible, setFormVisible, toggle, setToggle,  recDelete, setRecDelete
  } = StateTalent()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadTalent();
  }, []);

  const loadTalent= async () => {
    const result = await api.loadTalent()
    console.log("rec", result);
    setTalent(result);
  };


  const handleDelete = async () => {
    await api.deleteTalent(recDelete)
    loadTalent();
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
                      ADD Talent
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
                    <h3 className="form-header"> Talent FORM</h3>
                  <DialogContent>
                    
                    <TalentForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle} />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <TalentTable talent={talent} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TalentView;
