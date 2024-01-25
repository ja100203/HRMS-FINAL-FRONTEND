import React, { useEffect,useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import * as api from "../api"
import StateLocation from "../StateLocation";
import LocationTable from "../LocationTable";
import LocationForm from "../LocationForm";

import { MdAdd } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Collapse from "@mui/material/Collapse";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import { Card } from "@mui/material";

const LocationView = () => {

 const {toggle,setToggle,formVisible,formData,setFormData,setFormVisible,location,setLocation,recDelete,setRecDelete} = StateLocation()

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const result = await api.loadLocation()
    setLocation(result);
  };

  const handleDelete = async () => {
    await api.deleteLocation(recDelete)
    loadLocation();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  // const [faxError, setFaxError] = useState(false);
  // const [addressError, setAddressError] = useState(false);

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
                      ADD LOCATION
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
                    Add Location
                  </h3>
                  <DialogContent>
                    <LocationForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
           <LocationTable location={location} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default LocationView;
