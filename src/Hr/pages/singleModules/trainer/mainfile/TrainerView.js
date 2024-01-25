import React, { useEffect, useState} from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import * as api from "../api";
import StateTrainer from "../StateTrainer";
import TrainerForm from "../TrainerForm";
import TrainerTable from "../TrainerTable";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const TrainerView = () => {
  const {
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    trainer,
    setTrainer,
    recDelete,
    setRecDelete,
    formData,
    setFormData
  } = StateTrainer();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadTrainer();
  }, []);

  const loadTrainer = async () => {
    const result = await api.loadTrainer();
    setTrainer(result);
  };

  const handleDelete = async () => {
    await api.deleteTrainer(recDelete);
    loadTrainer();
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
                  id= "add-btn"
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD TRAINER
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
                    <h3> TRAINER FORM</h3>
                  </h3>
                  <DialogContent>
                    <TrainerForm formData={formData} setFormData={setFormData} setFormVisible={setFormVisible} setToggle={setToggle}/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <TrainerTable trainer={trainer} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TrainerView;
