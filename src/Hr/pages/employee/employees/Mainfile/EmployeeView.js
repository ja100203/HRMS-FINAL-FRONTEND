import React, { useEffect,useState } from "react";
import {  useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { styled } from "@mui/material/styles";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import * as api from "../api"; 
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import StateEmployee from "../StateEmployee";
import EmployeeForm from "../EmployeeForm";
import EmployeeTable from "../EmployeeTable";
const EmployeeView = () => {
  const {
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    employeeData,
    setEmployeeData,
    employee,
    setemployees,
    formData,recDelete,setRecDelete,
    setFormData
    
  } = StateEmployee();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };



  const handleDelete = async () => {
    await api.deleteEmployee(recDelete)
    loademployees();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  //const formRef = useRef()

  const loademployees = async () => {
    const result = await api.loademployees();
    setEmployeeData(result);

  };

  useEffect(() => {
    loademployees();
  }, []);
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
              {/* <Search search={search} setSearch={setSearch} /> */}
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
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD EMPLOYEE
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <EmployeeForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
            </Collapse>
            <br />
            <EmployeeTable employee={employeeData} setRecDelete={setRecDelete}/>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
