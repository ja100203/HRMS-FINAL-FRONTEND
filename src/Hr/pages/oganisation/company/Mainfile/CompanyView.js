import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import * as api from "../api";
import StateCompany from "../StateCompany";
import CompanyTable from "../CompanyTable";
import CompanyForm from "../CompanyForm";
// import CircularProgress from "@mui/material-next/CircularProgress";

const CompanyView = () => {
  const {
    formData,
    setFormData,
    setFormVisible,
    recDelete,
    setRecDelete,
    setToggle,
    toggle,
    formVisible,
    company,
    setCompany,
  } = StateCompany();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const loadCompany = async () => {
    const result = await api.loadCompany();
    setCompany(result);
  };

  useEffect(() => {
    loadCompany();
  }, []);

  const handleDelete = async () => {
    await api.deleteCompany(recDelete);
    console.log(recDelete);
    loadCompany();
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
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD COMPANY
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3 className="form-header">Add Company</h3>
                  <DialogContent>
                    <CompanyForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <CompanyTable company={company} setRecDelete={setRecDelete} />
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
