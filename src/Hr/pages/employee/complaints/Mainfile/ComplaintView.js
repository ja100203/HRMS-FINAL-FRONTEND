import React, { useEffect ,useState} from "react";
//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from '@mui/material/DialogTitle';
import { BiSolidHide } from "react-icons/bi";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import { MdAdd } from "react-icons/md";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";
import Collapse from "@mui/material/Collapse";
import { Card } from "@mui/material";

import * as api from "../api";
import StateComplaint from "../StateComplaint";
import ComplaintTable from "../ComplaintTable";
import ComplaintForm from "../ComplaintForm";

const ComplaintView = () => {
  const {
    setComplaint,
    complaint,
    setRecDelete,
    recDelete,
    formVisible,
    toggle,
    setToggle,
    setFormVisible,
    formData,setFormData
   
  } = StateComplaint();
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadcomplaint();
  }, []);

  const loadcomplaint = async () => {
    const result = await api.loadComplaint();
    setComplaint(result);
  };


  const handleDelete = async () => {
    await api.deleteProject(recDelete);
    loadcomplaint();
  };
  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });
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
                    <div>
                      <MdAdd />
                      ADD COMPLAINTS
                    </div>
                  )}
                </Button>
              </div>
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
                    <h3>COMPLAINT FORM</h3>
                  </h3>
                  <DialogContent>
                    <ComplaintForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>

            <ComplaintTable complaint={complaint} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComplaintView;
