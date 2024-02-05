import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

import Button from "@mui/material/Button";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditBank = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [loan, setLoan] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    accountType: "",
    branchName: "",
  });


  useEffect(() => {
    loadLoan();
  }, []);
  const loadLoan = async () => {
    const result = await axios.get(
        `http://13.126.190.50:8092/addbank/get/${id}`
    );
    setLoan(result.data);
};

  const handleInputChange = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value,
    });
  };
const updateLoan = async (e) => {
    e.preventDefault();
    await axios.put(
        `http://13.126.190.50:8092/addbank/update/${id}`,
      loan
    );
    navigate("/hr/bank/add-bank");
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
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 shadow">
      <h2 className="mt-5">Edit Bank</h2>
      <form onSubmit={(e) => updateLoan(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanName">
            Bank Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="bankName"
            id="bankName"
            required
            value={loan.bankName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanType">
           Account Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="accountName"
            id="accountName"
            required
            value={loan.accountName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text">Account Number</label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="accountNumber"
            id="accountNumber"
            required
            value={loan.accountNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="data-buttons">
                <Button id="input-btn-submit" variant="outlined" type="submit">
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/hr/bank/add-bank")}
                >
                  Back
                </Button>
              </div>
      </form>
    </div>
      </div>
    </div>
  </div>
  
  );
};

export default EditBank;
