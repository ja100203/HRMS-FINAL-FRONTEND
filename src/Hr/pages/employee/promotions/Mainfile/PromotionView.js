import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";
import Collapse from "@mui/material/Collapse";
import { Card } from "@mui/material";
import { BiSolidHide } from "react-icons/bi";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";



import * as api from "../api"
import StatePromotion from "../StatePromotion";
import PromotionTable from "../PromotionTable";
import PromotionForm from "../PromotionForm";



const PromotionView = () => {


  const { promotion, setPromotion, formVisible, setFormVisible, toggle, setToggle,recDelete, setRecDelete,formData,setFormData
  } = StatePromotion()
 
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadpromotion();
  }, []);

  const loadpromotion = async () => {
    const result = await api.loadPromotion()
    setPromotion(result);
    console.log(result);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await api.deletePromotion(recDelete)
    loadpromotion();
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
                      ADD PROMOTION  </div>
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
                    <h3> PROMOTION FORM</h3>
                  </h3>
                  <DialogContent>
                    
                    <PromotionForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle} />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <PromotionTable promotion={promotion} setRecDelete={setRecDelete} />
          </section>
          </div>
      </div>
    </div>
  );
};

export default PromotionView;
