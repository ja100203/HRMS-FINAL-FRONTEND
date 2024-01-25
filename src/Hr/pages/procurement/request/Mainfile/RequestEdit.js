import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

import * as api from "../api";
import StateRequest from "../StateRequest";
import { Link, useNavigate, useParams } from "react-router-dom";

const RequestEdit = () => {
  let navigation = useNavigate();
  const { id } = useParams();

  const { request, setRequest } = StateRequest();

  const { requestingPerson, requestingDepartment, reasonForRequesting} = Request;

  useEffect(() => {
    loadRequestById();
  }, []);

  const loadRequestById = async () => {
    const result = await api.loadRequestById(id);
    setRequest(result);
    console.log("data", result);
  };

  const handleInputChange = (e) => {
    if (e.target.name != "file") {
      setRequest({
        ...request,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateRequest = async (e) => {
    e.preventDefault();
    await axios.patch(`http://13.126.190.50:5000/Request/update/${id}`, Request);
    navigation("/hr/procurement/Request");
  };

  const handleSubmit = () => {
    loadRequestById();
  };

  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header />
      </div>
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>
          <div className="col-sm-8 py-2 px-5 shadow">
            <h2 className="mt-5"> Edit Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="requestDepartment">
                  Requesting Person
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="requestingPerson"
                  id="requestingPerson"
                  required
                  value={requestingPerson}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="requestingDepartment">
                Requesting Department
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="requestingDepartment"
                  id="requestingDepartment"
                  required
                  value={requestingDepartment}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="reasonForRequesting">
                Reason For Requesting
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="reasonForRequesting"
                  id="reasonForRequesting"
                  required
                  value={reasonForRequesting}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

             

              <div className="data-buttons">
                <Button
                  id="input-btn-submit"
                  className="submit"
                  type="submit"
                  onClick={updateRequest}
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  className="cancel"
                  onClick={() => navigation("/hr/procurement/Request")}
                  variant="outlined"
                >
                  Back
                </Button>
              </div>
            </form>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default RequestEdit;
