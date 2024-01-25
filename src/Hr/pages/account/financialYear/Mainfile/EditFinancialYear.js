import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";

const EditFinancialYear = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [financial, setFinancial] = useState({
    financialYear:"",
    startDate:"",
    endDate:""
  });

  const {
    financialYear, startDate, endDate
  } = financial;

  useEffect(() => {
    loadFinancialYear();
  }, []);

  const loadFinancialYear = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/financialYear/get/${id}`);
    setFinancial(result.data);
  };

  const handleInputChange = (e) => {
    setFinancial({
      ...financial,
      [e.target.name]: e.target.value,
    });
  };

  const updateFinancialYear = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:5000/financialYear/update/${id}`, financial);
    navigate("/hr/account/financial-year");
  };

  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <SideBar />
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Financial Year</h2>
      <form onSubmit={(e) => updateFinancialYear(e)}>
        

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="financialYear">
            Financial Year
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="financialYear"
            id="financialYear"
            required
            value={financialYear}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="startDate">
           Start Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="startDate"
            id="startDate"
            required
            value={startDate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="endDate">
            End Date 
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="endDate"
            id="endDate"
            required
            value={endDate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg"
            >
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Button
              id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/hr/account/financial-year")}
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
      </div>
    </div>
  </div>
    
  );
};

export default EditFinancialYear;
