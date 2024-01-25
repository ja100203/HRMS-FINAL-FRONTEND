import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditLoan = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [loan, setLoan] = useState({
    employeeName: "",
    permittedBy: "",
    loanDetails: "",
    approveDate: "",
    repaymentForm: "",
    amount: "",
    interestPersentage: "",
    installmentPeriod: "",
    repaymentTotal: "",
    installment: "",
    status: "",
  });

  useEffect(() => {
    loadLoan();
  }, []);

  const loadLoan = async () => {
  const result = await axios.get(
        `http://13.126.190.50:5000/grantloan/get/${id}`
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
        `http://13.126.190.50:5000/grantloan/update/${id}`,
      loan
    );
    navigate("/hr/loan/grant-loan");
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
      <h2 className="mt-5">Edit Loan</h2>
      <form onSubmit={(e) => updateLoan(e)}>
       
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
          Amount
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="amount"
            id="amount"
            required
            value={loan.amount}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
          Installment Period
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="installmentPeriod"
            id="installmentPeriod"
            required
            value={loan.installmentPeriod}
            onChange={(e) => handleInputChange(e)}
          />
          </div>
         <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
          Interest Persentage
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="interestPersentage"
            id="interestPersentage"
            required
            value={loan.interestPersentage}
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
                  onClick={() => navigate("/hr/loan/grant-loan")}
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

export default EditLoan;
