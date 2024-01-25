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
import StateSalaryTemplate from "../StateSalaryTemplate";
import SalaryTemplateTable from "../SalaryTemplateTable";
import SalaryTemplateForm from "../SalaryTemplateForm";

const SalaryTemplateView = () => {

  const { formData,
    setFormData,recDelete, setRecDelete,formVisible, setFormVisible,toggle, setToggle,salary, setSalary,grossSal,setGrossSal
  } = StateSalaryTemplate()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadsalaryTemplate();
  }, []);

  const loadsalaryTemplate = async () => {
    const result = await api.loadSalaryTemplate()
    setSalary(result);
  };



  const handleDelete = async () => {
    await api.deleteSalaryTemplate(recDelete)
    loadsalaryTemplate();
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
                      ADD SALARY TEMPLATE
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
                    <h3 className="form-header">Add Salary Template</h3>
                  <DialogContent>
                    <SalaryTemplateForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle} grossSal={grossSal} setGrossSal={setGrossSal}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <SalaryTemplateTable salary={salary} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default SalaryTemplateView;
