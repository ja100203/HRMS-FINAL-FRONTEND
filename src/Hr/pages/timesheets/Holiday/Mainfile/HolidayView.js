import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import * as api from "../api";
import StateHoliday from "../StateHoliday";
import HolidayTable from "../HolidayTable";
import HolidayForm from "../HolidayForm";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const HolidayView = () => {
  const {
    holiday,
    setHoliday,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    recDelete,
    setRecDelete,
    formData,
    setFormData,
  } = StateHoliday();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadHoliday();
  }, []);

  const loadHoliday = async () => {
    const result = await api.loadHoliday();
    setHoliday(result);
  };

  const handleDelete = async () => {
    await api.deleteHoliday(recDelete);
    loadHoliday();
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
                      ADD HOLIDAY
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    <h3> HOLIDAY FORM</h3>
                  </h3>
                  <DialogContent>
                    <HolidayForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <HolidayTable holiday={holiday} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};
export default HolidayView;
