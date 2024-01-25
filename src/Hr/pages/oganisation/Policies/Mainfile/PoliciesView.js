import React, { useEffect,useState} from "react";


import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";


import DialogContent from "@mui/material/DialogContent";

import { MdAdd } from "react-icons/md";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";


import StatePolicies from "../StatePolicies";
import PoliciesTable from "../PoliciesTable";
import * as api from "../PoliciesApi"
import Policiesform from "../PoliciesForm";

const PoliciesView = () => {
  const {
   formData,setFormData,
    policies,
    setPolicies,
    open,
    setOpen,
    recDelete,
    setRecDelete,
    
  } = StatePolicies();

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    const response = await api.loadPolicies()
      setPolicies(response);
  };


  const handleDelete = async () => {
    await api.deletePolicies(recDelete)
    loadPolicies()
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

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
      <div className="head-foot-part">
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
                <MdAdd/>
                ADD POLICIES
              </Button>
            </div>
          </div>
          <PoliciesTable policies={policies} setRecDelete={setRecDelete}/>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-header-popup">
                Add Policies
              </DialogTitle>
              <DialogContent>
               <Policiesform formData={formData} setFormData={setFormData} setOpen={setOpen}/>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

export default PoliciesView;
