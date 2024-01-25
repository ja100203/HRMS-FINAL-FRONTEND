import React, { useEffect,useState } from "react";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

import Button from "@mui/material/Button";

import DialogContent from "@mui/material/DialogContent";

import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import * as api from "../announcementapi";
import AnnouncementTable from "../AnnouncementTable";

import StateAnnouncement from "../StateAnnouncement";
import AnnouncementForm from "../AnnouncementForm";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const AnnouncementsView = () => {
  const {
    formData,
    setFormData,
    recDelete,
    setRecDelete,

    announcements,
    setAnnouncements,
    company,

    department,

    location,

    formVisible,
    setFormVisible,
    toggle,
    setToggle,
  } = StateAnnouncement();

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const result = await api.loadAnnouncements();
    setAnnouncements(result);
  };
  console.log(formData);
  const handleDelete = async () => {
    await api.deleteAnnouncement(recDelete);
    loadAnnouncements();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

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
                      ADD ANNOUNCEMENTS
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div>
                  <h3 className="form-header">Add Announcement</h3>
                  <DialogContent>
                    <AnnouncementForm
                      formData={formData}
                      setFormData={setFormData}
                      setFormVisible={setFormVisible}
                      setToggle={setToggle}
                    />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />
            <AnnouncementTable
              announcements={announcements}
              setRecDelete={setRecDelete}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsView;
