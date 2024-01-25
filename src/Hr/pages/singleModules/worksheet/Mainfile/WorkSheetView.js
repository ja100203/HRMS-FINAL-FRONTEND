import React, { useEffect,useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import * as api from "../api";
import StateWorksheet from "../StateWorksheet";
import WorksheetTable from "../WorksheetTable";
import WorkSheetForm from "../WorksheetForm";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const WorksheetView = () => {
  const {
    worksheet,
    setWorksheet,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    recDelete,
    setRecDelete,
    formData,
    setFormData,
  } = StateWorksheet();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadWorksheet();
  }, []);

  const loadWorksheet = async () => {
    const result = await api.loadWorksheet();
    setWorksheet(result);
  };

  const handleDelete = async () => {
    await api.deleteWorksheet(recDelete);
    loadWorksheet();
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
                      ADD WORKSHEET
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3 className="form-header">Add Worksheet</h3>
                  <DialogContent>
                    <WorkSheetForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <WorksheetTable worksheet={worksheet} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorksheetView;
