import React, { useState, useRef, useCallback, useEffect } from "react";
import CompanyLogoFile from "../../components/CompanyLogoFile";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import pro from "../../asset/images/pro.png";
import appl from "../../asset/images/appl.png";
import burger from "../../asset/images/burger.png";
import filter from "../../asset/images/filter.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

import Webcam from "react-webcam";
import axios from "axios";

const Ticket = () => {
  const WebcamComponent = () => <Webcam />;
  const [cardClick, setCardClick] = useState(false);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const cardData = [
    {
      profileImg: "",
      name: "Subham Parida",
      time: "2min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Open",
      priority: "Low Priority",
    },
    {
      profileImg: "",
      name: "Praveen Kumar",
      time: "5min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "In Progress",
      priority: "Low Priority",
    },
    {
      profileImg: "",
      name: "Pritam Behera",
      time: "1min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Closed",
      priority: "High Priority",
    },
    {
      profileImg: "",
      name: "Subham Parida",
      time: "2min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Open",
      priority: "Low Priority",
    },
    {
      profileImg: "",
      name: "Subham Parida",
      time: "2min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Open",
      priority: "Low Priority",
    },
    {
      profileImg: "",
      name: "Subham Parida",
      time: "2min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Open",
      priority: "Low Priority",
    },
    {
      profileImg: "",
      name: "Subham Parida",
      time: "2min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Open",
      priority: "Low Priority",
    },
  ];
  const myCardData = [
    {
      profileImg: "",
      name: "Subham Parida",
      time: "2min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "Open",
      priority: "Low Priority",
    },
    {
      profileImg: "",
      name: "Praveen Kumar",
      time: "5min ago",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, reiciendis!",
      status: "In Progress",
      priority: "Low Priority",
    },
  ];

  const getCardBgColor = (cardData) => {
    switch (cardData.status) {
      case "Open":
        return "rgba(21, 112, 239, 0.2)";
      case "In Progress":
        return "rgba(229, 229, 229, 1)";
      case "Closed":
        return "rgba(15, 147, 13, 0.2)";
      default:
        return "black";
    }
  };

  const getCardColor = (cardData) => {
    switch (cardData.status) {
      case "Open":
        return "rgba(21, 112, 239, 1)";
      case "In Progress":
        return "rgba(111, 111, 111, 1)";
      case "Closed":
        return "rgba(15, 147, 13, 1)";
      default:
        return "black";
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statuses = [
    {
      label: "Low Priority",
      value: "Low Priority",
    },
    {
      label: "High Priority",
      value: "High Priority",
    },
  ];

  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  //   const capture = useCallback(() => {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     setImg(imageSrc);
  //   }, [webcamRef]);
  // console.log(img)
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    date: "",
    priority: "",
    description: "",
    createdBy: "Praveen Kumar",
    projectTitle: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveTicket = async () => {
    try {
      await axios.post(
        "http://13.126.190.50:8088/tickets/create/tickets",
        formData
      );
    } catch (error) {
      console.error("saveTicket", error);
    }
  };

  const [ticketData, setTicketData] = useState([]);

  const loadTicket = async () => {
    await axios
      .get("http://13.126.190.50:8088/tickets/12")
      .then((result) => setTicketData(result.data))
      .catch(() => setTicketData([]));
  };

  useEffect(() => {
    loadTicket();
  }, []);
  console.log("hi", ticketData);

  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="head-foot-part">
          <div className="ticket-part">
            <div className="tickets-heading-head">
              <div className="ticket-header">
                <p className="ticket-header-title mt-3">MY TICKETS</p>
              </div>
              <div className="ticket-heading-head-then">
                <div className="ticket-top-head">
                  <div className="side-icons" style={{ padding: "0 20px" }}>
                    <img src={appl} style={{ cursor: "pointer" }} alt="" />
                    <img
                      src={burger}
                      style={{ cursor: "pointer", margin: "0 10px" }}
                      alt=""
                    />
                    <img src={filter} style={{ cursor: "pointer" }} alt="" />
                  </div>
                </div>
                <div
                  id="add-btn"
                  style={{
                    width: "max-content",
                    padding: "10px",
                    fontSize: "15px",
                    cursor: "pointer",
                    marginRight: "20px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                  onClick={handleOpen}
                >
                  Raise Ticket
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {ticketData.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="ticket-cards"
                    style={{ marginLeft: "20px" }}
                  >
                    <div
                      id="card"
                      className="card"
                      style={{ width: "340px", height: "185px" }}
                    >
                      <div
                        className="card-top d-flex align-items-center justify-content-between"
                        style={{
                          padding: "15px 15px",
                        }}
                      >
                        <div className="card-top-left d-flex align-items-center">
                          <div className="profile-img ">
                            <img
                              src={pro}
                              style={{
                                transform: "scale(1.5)",
                                margin: "5px",
                              }}
                              alt=""
                            />
                          </div>
                          <div
                            className="profile-name"
                            style={{ marginLeft: "20px" }}
                          >
                            {data.employeeName}
                          </div>
                        </div>
                        {/* <div className="card-top-right">{data.time}</div> */}
                      </div>
                      <div className="ticket-desc" style={{ margin: "0 20px" }}>
                        {data.description}
                      </div>
                      <div className="card-bottom d-flex justify-content-between">
                        <div
                          className="ticket-status"
                          style={{
                            backgroundColor: "#502a51",
                            color: "white",
                          }}
                        >
                          {data.projectTitle}
                        </div>
                        <div
                          className="ticket-priority"
                          style={{
                            backgroundColor:
                              data.priority === "Low Priority"
                                ? "rgba(72, 3, 75, 0.2)"
                                : "rgba(247, 108, 36, 0.2)",
                            color:
                              data.priority === "Low Priority"
                                ? "rgba(72, 3, 75, 1)"
                                : "rgba(247, 108, 36, 1)",
                          }}
                        >
                          {data.priority}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-header-popup">Raise Ticket</DialogTitle>
                <DialogContent>
                  <form>
                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Employee Id*"
                        type="text"
                        fullWidth
                        name="employeeId"
                        id="employeeId"
                        required
                        value={formData.employeeId}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Employee Name*"
                        type="text"
                        fullWidth
                        name="employeeName"
                        id="employeeName"
                        value={formData.employeeName}
                        required
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        name="date"
                        id="date"
                        required
                        value={formData.date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Project"
                        type="text"
                        fullWidth
                        name="projectTitle"
                        id="projectTitle"
                        required
                        value={formData.projectTitle}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div className="data-input-fields">
                      <FormControl fullWidth style={{ marginTop: "5px" }}>
                        <InputLabel id="demo-priority-select-label">
                          Priority Status
                        </InputLabel>
                        <Select
                          labelId="demo-priority-select-label"
                          id="selectedPriority"
                          value={formData.priority}
                          name="priority"
                          label="Priority"
                          onChange={(e) => handleInputChange(e)}
                        >
                          {statuses &&
                            statuses.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange(e)}
                        required
                      />
                    </div>

                    <div className="data-buttons">
                      <Button
                        id="input-btn-submit"
                        variant="outlined"
                        type="submit"
                        onClick={saveTicket}
                      >
                        Submit
                      </Button>
                      <Button
                        id="input-btn-cancel"
                        variant="outlined"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
