import React, { useEffect,useState} from "react";
import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import * as api from "../api"
import StateAttendance from "../StateAttendance";
import AttendanceTable from "../AttendanceTable";
import AttendanceForm from "../AttendanceForm";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";


const  AttendanceView = () => {

  const {formVisible, setFormVisible,toggle,setToggle,recDelete,attendance,setAttendance, setRecDelete,formData,setFormData
  } = StateAttendance()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    const result = await api.loadAttendance()
    console.log("rec",result);
    setAttendance(result);
  };



  const handleDelete = async () => {
    await api.deleteAttendance(recDelete)
    loadAttendance();
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
                      ADD ATTENDANCE
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
                    <h3>ATTENDANCE FORM</h3>
                  </h3>
                  <DialogContent>
                   
                    <AttendanceForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <AttendanceTable attendance={attendance} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;