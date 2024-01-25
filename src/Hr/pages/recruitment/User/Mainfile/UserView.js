import React, { useEffect,useState} from "react";

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
import StateUser from "../StateUser";
import UserTable from "../UserTable";
import UserForm from "../UserForm";

const UserView = () => {

  const { formData, setFormData, user, setUser, formVisible, setFormVisible, toggle, setToggle, recDelete, setRecDelete
  } = StateUser()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadUser();
  }, );

  const loadUser= async () => {
    const result = await api.loadUser()
    console.log("rec", result);
    setUser(result);
  };



  const handleDelete = async () => {
    await api.deleteUser(recDelete)
    loadUser();
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
                      ADD USER
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
                    <h3 className="form-header">Add User</h3>
                  <DialogContent>
                    
                    <UserForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <UserTable user={user} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserView;
