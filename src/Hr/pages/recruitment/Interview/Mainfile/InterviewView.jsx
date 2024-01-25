import React, { useEffect,useState } from "react";
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
import StateInterview from "../StateInterview";
import InterviewTable from "../InterviewTable";
import InterviewForm from "../InterviewForm";

const InterviewView = () => {

  const { interview, setInterview, formVisible, setToggle, toggle, formData, setFormData,company, setCompany, location, setLocation, recDelete, setRecDelete, setFormVisible
  } = StateInterview()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadInterview();
  }, []);

  const loadInterview = async () => {
    const result = await api.loadInterview()
    console.log("rec", result);
    setInterview(result);
  };

  const handleDelete = async () => {
    await api.deleteInterview(recDelete)
    loadInterview();
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
                      ADD Interview
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
                    <h3 className="form-header">INTERVIEW FORM</h3>
                  <DialogContent>
                    <InterviewForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle} />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <InterviewTable interview={interview} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default InterviewView;
