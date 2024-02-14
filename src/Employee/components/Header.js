import React, { useEffect, useState } from "react";
import Notificationlogo from "../asset/24px/Notification.png";
import MessageLogo from "../asset/24px/message.png";
import UserLogo from "../asset/24px/User.png";
import AttendanceLogo from "../asset/40px/calendar (1) 1.png";
import ApproveLogo from "../asset/40px/Approve.png";
import date from "date-and-time";
import { Watch } from "react-loader-spinner";
import axios from "axios";

import EmployeeDetails from "./sidebarComponent/EmployeeDetails";
import Modal from "react-modal";
const Header = ({ menu, setMenu }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");

  window.navigator.geolocation.getCurrentPosition((data) =>
    setLongitude(data.coords.longitude)
  );
  window.navigator.geolocation.getCurrentPosition((data) =>
    setLatitude(data.coords.latitude)
  );

  const handleConvertClick = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b418e0df311d4707ab363a1a1252123d`
      );

      if (response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted;
        setAddress(formattedAddress);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  const now = new Date();
  let todayDate = date.format(now, "YYYY-MM-DD");
  let todayTime = date.format(now, "hh:mm:ss A ");
  const handleMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCheckInOpen, setModalCheckInOpen] = useState(false);
  const [modalCheckOutOpen, setModalCheckOutOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
    handleConvertClick();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonOutClicked, setButtonOutClicked] = useState(false);

  const [empData, setEmpData] = useState([]);
  // const loadEmployee = async () => {
  //   try {
  //     const result = await api.loadEmployee();
  //     setEmpData(result.data);
  //   } catch (error) {
  //     console.error("Error loading employee data:", error);
  //   }
  // };

  // useEffect(() => {
  //   loadEmployee();
  // }, []);

  // console.log(empData[0]?.employeeName);

  const handleButtonClick = async () => {
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem("lastClickedDate", currentDate);
    console.log(address);
    setIsButtonDisabled(true);
    setButtonClicked(true);
    setModalIsOpen(false);

    await axios.post("http://localhost:8084/attendance/create/attendance", {
      employeeName: "Praveen",
      clockIn: date.format(new Date(), "hh:mm:ss A "),
      date: todayDate,
      clockInLocation: address,
    });
    setTimeout(() => {
      setModalCheckInOpen(true);
    }, 1500);
  };
  const empName = "Praveen";
  const handleOutButtonClick = async () => {
    setButtonOutClicked(true);
    setModalIsOpen(false);

    handleConvertClick();

    await axios.put(
      `http://localhost:8084/attendance/update/${empName}/${todayDate}`,
      {
        clockOut: date.format(new Date(), "hh:mm:ss A "),
        date: todayDate,
        clockOutLocation: address,
      }
    );

    setTimeout(() => {
      setModalCheckOutOpen(true);
    }, 1500);
  };

  const closeCheckIn = () => {
    setModalCheckInOpen(false);
    setButtonClicked(false);
  };

  const closeCheckOut = () => {
    setModalCheckOutOpen(false);
    setButtonOutClicked(false);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const lastClickedDate = localStorage.getItem("lastClickedDate");
    const currentDate = new Date().toLocaleDateString();

    if (lastClickedDate === currentDate) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, []);

  return (
    <>
      <div id="header-part" className="section-body top_dark">
        <div className="container-fluid" id="container-fluid">
          <div id="page-header" className="page-header">
            <div className="left">
              <h1 className="page-title">Employee Dashboard</h1>
              <div className="input-group xs-hide">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="mobile-right">
              <i
                class="menu-icon bx bx-menu"
                style={{ fontSize: "24px" }}
                onClick={handleMenu}
              ></i>
            </div>
            <div className="right">
              <div className="notification d-flex align-items-center">
                <button className="emp-header-check-btn" onClick={openModal}>
                  Check IN / OUT
                </button>
                <div className="dropdown d-flex">
                  <a
                    href={"#"}
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                    data-toggle="dropdown"
                  >
                    <img src={Notificationlogo} />
                    <span className="badge badge-success nav-unread" />
                  </a>
                </div>
                <div className="dropdown d-flex">
                  <a
                    href={"#"}
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                    data-toggle="dropdown"
                  >
                    <img src={MessageLogo} />
                    <span className="badge badge-primary nav-unread" />
                  </a>
                </div>
                <div className="dropdown d-flex">
                  <a
                    href={"#"}
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                    data-toggle="dropdown"
                  >
                    <img src={UserLogo} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Event Modal"
          className={"check-modal"}
          style={{
            content: {
              margin: "auto",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
          }}
        >
          <img src={AttendanceLogo} alt="attendance" />
          <i class="modal-cross bx bx-x-circle" onClick={closeModal}></i>
          <h2>Mark Your Attendance</h2>
          <div className="check-in-out-btn">
            <button
              className="check-in-btn"
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            >
              Check In
            </button>
            <button className="check-out-btn" onClick={handleOutButtonClick}>
              Check Out
            </button>
          </div>
        </Modal>

        <div>
          {buttonClicked && (
            <div className="check-modal-overlay">
              <Watch
                visible={true}
                height="150"
                width="150"
                color="#f2711c"
                ariaLabel="watch-loading"
                wrapperStyle={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  margin: "auto",
                  zIndex: 1000,
                }}
                wrapperClass=""
              />
            </div>
          )}

          {modalCheckInOpen && (
            <Modal
              isOpen={modalCheckInOpen}
              onRequestClose={closeCheckIn}
              className={"check-modal check-ok-modal"}
              style={{
                content: {
                  margin: "auto",
                },
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
                },
              }}
            >
              <img src={ApproveLogo} alt="Approve" />
              <i
                className="modal-cross bx bx-x-circle"
                onClick={closeCheckIn}
              ></i>
              <div style={{ textAlign: "center" }}>
                <h2>Checked In</h2>
                <p>{`Date: ${todayDate}, Time: ${todayTime}`}</p>
              </div>
              <div className="check-in-out-btn">
                <button className="check-ok-btn" onClick={closeCheckIn}>
                  Ok
                </button>
              </div>
            </Modal>
          )}
        </div>

        <div>
          {buttonOutClicked && (
            <div className="check-modal-overlay">
              <Watch
                visible={true}
                height="120"
                width="120"
                color="#f2711c"
                ariaLabel="watch-loading"
                wrapperStyle={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  margin: "auto",
                  zIndex: 1000,
                }}
                wrapperClass=""
              />
            </div>
          )}
          {modalCheckOutOpen && (
            <Modal
              isOpen={modalCheckOutOpen}
              onRequestClose={closeCheckOut}
              className={"check-modal check-ok-modal"}
              style={{
                content: {
                  margin: "auto",
                },
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
                },
              }}
            >
              <img src={ApproveLogo} alt="Approve" />
              <i class="modal-cross bx bx-x-circle" onClick={closeCheckOut}></i>
              <div style={{ textAlign: "center" }}>
                <h2>Checked Out</h2>
                <p>{`Date: ${todayDate}, Time: ${todayTime}`}</p>
              </div>
              <div className="check-in-out-btn">
                <button className="check-ok-btn" onClick={closeCheckOut}>
                  Ok
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
