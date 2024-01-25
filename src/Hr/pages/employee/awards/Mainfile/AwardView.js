import React, { useEffect ,useState} from "react";

//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { MdAdd } from "react-icons/md";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

import * as api from "../api"
import StateAward from "../StateAward";
import AwardTable from "../AwardTable";
import AwardForm from "../AwardForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const AwardsView = () => {

  const { setRecDelete,recDelete,award,setAward,open,setOpen,formData,setFormData } = StateAward();
 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    loadAward();
  }, []);

  const loadAward = async () => {
    const result = await api.loadAward();
    setAward(result);
    console.log(result);
  };

  const handleDelete = async () => {
    await api.deleteAward(recDelete);
    loadAward()
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

  console.log(formData)
  const [menu, setMenu] = useState(false);

  return (
    <div>
       <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="head-foot-part" >
        <section>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  
                  id="add-btn"
                >
                  <MdAdd  />
                  ADD AWARDS
                </Button>
              </div>
            </div>
            <AwardTable award={award} setRecDelete={setRecDelete}/>
            <div>
              <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">
                  AWARD FORM
                  </DialogTitle>
                <DialogContent>
                 <AwardForm formData={formData} setFormData={setFormData} setOpen={setOpen}/>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>

  );
};

export default AwardsView;

