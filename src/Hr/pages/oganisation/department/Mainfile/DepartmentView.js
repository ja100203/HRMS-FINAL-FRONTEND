import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";



import * as api from "../DepartmentApi"
import StateDepartment from "../StateDepartment";
import DepartmentTable from "../DepartmentTable";
import DepartmentForm from "../DepartmentForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
const DepartmentView = () => {

  const { formData,setFormData,department, setDepartment, formVisible, setFormVisible, toggle, setToggle, recDelete, setRecDelete
  } = StateDepartment()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = async () => {
    const result = await api.loadDepartment()
    console.log("rec", result);
    setDepartment(result);
  };



  const handleDelete = async () => {
    await api.deleteDepartment(recDelete)
    loadDepartment();
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
                    ADD DEPARTMENT
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
                  <h3>Add Department</h3>
                </h3>
                <DialogContent>
                  <DepartmentForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                </DialogContent>
              </div>
            </Card>
          </Collapse>
          <DepartmentTable department={department} setRecDelete={setRecDelete} />
        </section>
      </div>
    </div>
  </div>
  );
};

export default DepartmentView;
