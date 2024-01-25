import React, { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import axios from "axios";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EmployeeProfile = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    employeeName: "",
    employeeType: "",
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/employee/get/${id}`);
    setEmployee(result.data);
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
      <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {`${employee.employeeName} ${employee.employeeType}`}
                </h5>
                <div className="d-flex justify-content-center mb-2">
                        <Link to="/employee/employee">
                          <button
                            type="button"
                            className="btn btn-outline-secondary ms-1"
                          >
                            Back
                          </button>
                        </Link>
                      </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card mb-4">
              <div className="card-body">
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">employee Name</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.employeeName}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">employee Type</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.employeeType}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Email</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.email}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Website</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{employee.website}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
    </div>
  </div>

  );
};

export default EmployeeProfile;
